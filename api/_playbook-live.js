/* =============================================
   api/_playbook-live.js
   Shared helpers for the Playbook Live application endpoints:

     api/playbook-live-upload-url.js   hands out a one-time signed upload URL
     api/playbook-live-apply.js        validates + stores + emails an application
     api/playbook-live-video.js        expiring "view video" links used in the emails
     api/playbook-live-maintenance.js  daily cron: retry emails, clear orphaned uploads

   The leading underscore keeps Vercel from exposing this file as a URL.

   Like /api/subscribe.js and /api/contact.js this uses only fetch() against
   Supabase (PostgREST + Storage) and Resend — no npm packages, no package.json.

   Server-side only. Nothing in here is ever sent to the browser except the
   short-lived signed upload token.

   ENVIRONMENT VARIABLES (Vercel -> Project Settings -> Environment Variables)
     SUPABASE_URL                  already set (used by /api/subscribe)
     SUPABASE_SERVICE_ROLE_KEY     already set (used by /api/subscribe)
     RESEND_API_KEY                already set
     FROM_EMAIL                    already set (must be a Resend-verified sender)
     APPLICATION_RECEIVER_EMAIL    optional — defaults to herdigitalplaybook2@gmail.com
     PLAYBOOK_LIVE_LINK_SECRET     optional — signs the "view video" links.
                                   Falls back to SUPABASE_SERVICE_ROLE_KEY.
     CRON_SECRET                   needed for the daily maintenance job (any long random string)
     PLAYBOOK_LIVE_RETENTION_DAYS  optional — if set (e.g. 180), the maintenance job
                                   deletes applications + videos older than that
     SITE_URL                      optional — defaults to https://herdigitalplaybook.com
   ============================================= */

import crypto from 'node:crypto';

export const BUCKET = 'playbook-live-applications';
export const TABLE = 'playbook_live_applications';
export const RATE_TABLE = 'playbook_live_rate_limit';

export const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50 MB — also enforced by the bucket itself
export const VIDEO_TYPES = { 'video/mp4': 'mp4', 'video/quicktime': 'mov', 'video/webm': 'webm' };
export const VIDEO_LINK_DAYS = 30;

export const TYPES = {
  host: { prefix: 'PL-HOST', label: 'Host', emoji: '🎀', needsVideo: true },
  team: { prefix: 'PL-TEAM', label: 'Talent Team', emoji: '💼', needsVideo: true },
  subagent: { prefix: 'PL-SUB', label: 'Sub-Agent', emoji: '🌎', needsVideo: false },
};

export const HOURS = ['Under 5 hours', '5–10 hours', '10–20 hours', '20+ hours'];
export const ROLES = ['Recruiter', 'Virtual Assistant'];
export const HOST_RANGES = ['1–5', '6–10', '11–25', '25+'];
export const MONTHLY_RANGES = ['1–2', '3–5', '6–10', '10+'];

export function config() {
  const supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return {
    supabaseUrl,
    serviceKey,
    resendKey: process.env.RESEND_API_KEY || '',
    fromEmail: process.env.FROM_EMAIL || '',
    receiver: process.env.APPLICATION_RECEIVER_EMAIL || 'herdigitalplaybook2@gmail.com',
    siteUrl: (process.env.SITE_URL || 'https://herdigitalplaybook.com').replace(/\/$/, ''),
    linkSecret: process.env.PLAYBOOK_LIVE_LINK_SECRET || serviceKey,
    retentionDays: Number(process.env.PLAYBOOK_LIVE_RETENTION_DAYS || 0),
    resendBase: process.env.RESEND_API_BASE || 'https://api.resend.com',
  };
}

export function isConfigured(c = config()) {
  return !!(c.supabaseUrl && c.serviceKey && c.resendKey && c.fromEmail);
}

/* ---------- request helpers ---------- */

export function readJson(req) {
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return null; }
  }
  return body && typeof body === 'object' ? body : null;
}

export function clientIp(req) {
  const fwd = String(req.headers?.['x-forwarded-for'] || '').split(',')[0].trim();
  return fwd || String(req.headers?.['x-real-ip'] || '') || req.socket?.remoteAddress || 'unknown';
}

export function hmacHex(secret, data) {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

export function ipHash(req, c = config()) {
  return hmacHex(c.linkSecret || 'playbook-live', `ip:${clientIp(req)}`).slice(0, 32);
}

/** Text that is safe to drop in an email subject / single-line field. */
export function cleanLine(value, max = 200) {
  return String(value ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

/** Multi-line text (keeps newlines, drops other control characters). */
export function cleanText(value, max = 2000) {
  return String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').replace(/\r\n?/g, '\n').trim().slice(0, max);
}

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/**
 * Spam gate shared by the upload + apply endpoints. Returns true for a likely bot.
 *  - "website" is the honeypot field real visitors never see.
 *  - "elapsedMs" is measured in the browser from the moment the form was opened
 *    (so a wrong clock on the applicant's phone can't trip it). A script that fills
 *    in and submits in a couple of seconds, or skips the page entirely and posts
 *    straight to the API (no elapsedMs at all), is treated as a bot.
 */
export function looksLikeBot(body) {
  const honeypot = body && body.website ? String(body.website).trim() : '';
  const elapsed = Number(body && body.elapsedMs);
  return !!honeypot || !Number.isFinite(elapsed) || elapsed < 4000;
}

/* ---------- Supabase ---------- */

function sbHeaders(c, extra = {}) {
  return { apikey: c.serviceKey, Authorization: `Bearer ${c.serviceKey}`, ...extra };
}

const encPath = (p) => String(p).split('/').map(encodeURIComponent).join('/');

export async function dbRequest(c, method, pathAndQuery, { body, prefer, headers } = {}) {
  const res = await fetch(`${c.supabaseUrl}/rest/v1/${pathAndQuery}`, {
    method,
    headers: sbHeaders(c, {
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
      ...(headers || {}),
    }),
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let data = null;
  const text = await res.text();
  if (text) { try { data = JSON.parse(text); } catch { data = text; } }
  return { ok: res.ok, status: res.status, data, headers: res.headers };
}

/** Counts rows matching a PostgREST filter without downloading them. */
export async function dbCount(c, table, filter) {
  const r = await dbRequest(c, 'GET', `${table}?select=id&${filter}`, {
    prefer: 'count=exact',
    headers: { Range: '0-0', 'Range-Unit': 'items' },
  });
  if (!r.ok && r.status !== 206) return null;
  const range = r.headers.get('content-range') || '';
  const total = Number(range.split('/')[1]);
  return Number.isFinite(total) ? total : null;
}

/**
 * Allows `max` calls per IP per `windowSec` for one action.
 * Fails OPEN (allows the request, logs it) if the counter itself can't be reached,
 * so a hiccup never blocks a genuine applicant.
 */
export async function rateLimited(req, action, max, windowSec, c = config()) {
  try {
    const hash = ipHash(req, c);
    const since = new Date(Date.now() - windowSec * 1000).toISOString();
    const used = await dbCount(c, RATE_TABLE, `ip_hash=eq.${hash}&action=eq.${action}&created_at=gte.${encodeURIComponent(since)}`);
    if (used !== null && used >= max) return true;
    await dbRequest(c, 'POST', RATE_TABLE, { body: { ip_hash: hash, action }, prefer: 'return=minimal' });
  } catch (err) {
    console.error('[playbook-live] rate-limit check failed (allowing request):', err?.message);
  }
  return false;
}

export async function storageJson(c, method, path, body) {
  const res = await fetch(`${c.supabaseUrl}/storage/v1/${path}`, {
    method,
    headers: sbHeaders(c, { 'Content-Type': 'application/json' }),
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let data = null;
  const text = await res.text();
  if (text) { try { data = JSON.parse(text); } catch { data = text; } }
  return { ok: res.ok, status: res.status, data };
}

export async function createSignedUploadUrl(c, path) {
  const r = await storageJson(c, 'POST', `object/upload/sign/${BUCKET}/${encPath(path)}`);
  const rel = r.data && (r.data.url || r.data.signedURL);
  if (!r.ok || !rel) {
    console.error('[playbook-live] signed upload URL failed', r.status, typeof r.data === 'string' ? r.data.slice(0, 200) : r.data);
    return null;
  }
  const token = new URL(rel, 'https://x.invalid').searchParams.get('token');
  return token ? { path, token } : null;
}

export async function createSignedDownloadUrl(c, path, seconds = 300) {
  const r = await storageJson(c, 'POST', `object/sign/${BUCKET}/${encPath(path)}`, { expiresIn: seconds });
  const rel = r.data && (r.data.signedURL || r.data.signedUrl);
  if (!r.ok || !rel) {
    console.error('[playbook-live] signed download URL failed', r.status);
    return null;
  }
  return `${c.supabaseUrl}/storage/v1${rel.startsWith('/') ? '' : '/'}${rel}`;
}

/** HEAD the private object with the service key: { exists, size, contentType }. */
export async function objectHead(c, path) {
  const res = await fetch(`${c.supabaseUrl}/storage/v1/object/authenticated/${BUCKET}/${encPath(path)}`, {
    method: 'HEAD',
    headers: sbHeaders(c),
  });
  if (!res.ok) return { exists: false };
  return {
    exists: true,
    size: Number(res.headers.get('content-length')) || 0,
    contentType: String(res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase(),
  };
}

export async function deleteObjects(c, paths) {
  if (!paths.length) return true;
  const r = await storageJson(c, 'DELETE', `object/${BUCKET}`, { prefixes: paths });
  return r.ok;
}

export async function listObjects(c, prefix) {
  const r = await storageJson(c, 'POST', `object/list/${BUCKET}`, {
    prefix, limit: 1000, offset: 0, sortBy: { column: 'created_at', order: 'asc' },
  });
  return r.ok && Array.isArray(r.data) ? r.data : [];
}

/* ---------- ids + signed "view video" links ---------- */

const ID_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no O/0/I/1 to avoid mix-ups

export function newApplicationId(type) {
  const bytes = crypto.randomBytes(6);
  let suffix = '';
  for (const b of bytes) suffix += ID_ALPHABET[b % ID_ALPHABET.length];
  return `${TYPES[type].prefix}-${new Date().getUTCFullYear()}-${suffix}`;
}

export const APPLICATION_ID_RE = /^PL-(HOST|TEAM|SUB)-\d{4}-[A-Z2-9]{6}$/;

export function signVideoLink(c, applicationId, days = VIDEO_LINK_DAYS) {
  const exp = Math.floor(Date.now() / 1000) + days * 86400;
  const sig = hmacHex(c.linkSecret, `video:${applicationId}.${exp}`);
  return `${c.siteUrl}/api/playbook-live-video?id=${encodeURIComponent(applicationId)}&exp=${exp}&sig=${sig}`;
}

export function verifyVideoLink(c, id, exp, sig) {
  if (!APPLICATION_ID_RE.test(String(id))) return false;
  const expNum = Number(exp);
  if (!Number.isFinite(expNum) || expNum < Math.floor(Date.now() / 1000)) return false;
  const expected = Buffer.from(hmacHex(c.linkSecret, `video:${id}.${expNum}`));
  const given = Buffer.from(String(sig || ''));
  return expected.length === given.length && crypto.timingSafeEqual(expected, given);
}

/* ---------- owner notification email ---------- */

function displayTime(iso) {
  return new Date(iso).toLocaleString('en-GB', {
    timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }) + ' UTC';
}

function fieldsFor(row) {
  const a = row.answers || {};
  const rows = [
    ['Applicant', row.applicant_name],
    ['Email', row.email],
    ['WhatsApp', row.whatsapp],
    ['Country', row.country],
  ];
  if (row.application_type === 'host') {
    rows.push(
      ['Age', row.age],
      ['Previous one-on-one video experience', a.priorExperience],
      ['Weekly availability', a.hours],
      ['About the applicant', a.about],
    );
  } else if (row.application_type === 'team') {
    rows.push(
      ['Role', row.role],
      ['Experience', a.experience],
      ['Weekly availability', a.hours],
      ['Expected monthly pay', a.expectedPay],
      ['Optional note', a.note || '—'],
    );
  } else {
    rows.push(
      ['Access to potential hosts', a.accessToHosts],
      ['Qualified hosts they could introduce', a.hostsRange],
      ['Expected introductions per month', a.monthlyRange],
      ['Network description', a.network],
      ['Social / agency page', a.socialUrl || '—'],
    );
  }
  rows.push(['Submitted', displayTime(row.created_at)]);
  return rows;
}

export function buildOwnerEmail(c, row) {
  const t = TYPES[row.application_type];
  const name = cleanLine(row.applicant_name, 80);
  const subject = row.application_type === 'team'
    ? `${t.emoji} New Playbook Live ${cleanLine(row.role, 30)} Application — ${name}`
    : `${t.emoji} New Playbook Live ${t.label} Application — ${name}`;
  const heading = `NEW PLAYBOOK LIVE ${row.application_type === 'team' ? cleanLine(row.role, 30).toUpperCase() : t.label.toUpperCase()} APPLICATION ${t.emoji}`;
  const videoLink = row.video_path ? signVideoLink(c, row.application_id) : null;
  const fields = fieldsFor(row);

  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#fdeef2;font-family:Arial,Helvetica,sans-serif;color:#241219;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fdeef2;padding:24px 12px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;border:1px solid #f4dce3;">
<tr><td style="padding:28px 28px 8px;text-align:center;">
  <div style="font-size:12px;letter-spacing:2px;color:#a9823a;font-weight:bold;">PLAYBOOK LIVE · A DIVISION OF HER DIGITAL PLAYBOOK</div>
  <h1 style="font-size:20px;line-height:1.3;margin:14px 0 6px;color:#241219;">${esc(heading)}</h1>
  <div style="font-size:13px;color:#7a626a;">Application ID: <strong style="color:#241219;">${esc(row.application_id)}</strong></div>
</td></tr>
<tr><td style="padding:12px 28px 4px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  ${fields.map(([label, value]) => `<tr><td style="padding:10px 0;border-top:1px solid #f4dce3;">
    <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8f7a80;font-weight:bold;">${esc(label)}</div>
    <div style="font-size:15px;line-height:1.5;color:#241219;white-space:pre-wrap;">${esc(value ?? '—')}</div>
  </td></tr>`).join('')}
  </table>
</td></tr>
${videoLink ? `<tr><td style="padding:8px 28px 28px;text-align:center;">
  <a href="${esc(videoLink)}" style="display:inline-block;background:#ec5c82;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;letter-spacing:1px;padding:14px 28px;border-radius:50px;">VIEW SECURE VIDEO</a>
  <div style="font-size:12px;color:#8f7a80;margin-top:10px;">Private link — valid for ${VIDEO_LINK_DAYS} days. Please don't forward it.</div>
</td></tr>` : '<tr><td style="padding-bottom:24px;"></td></tr>'}
</table>
<div style="font-size:11px;color:#8f7a80;margin-top:14px;">Reply to this email to write to the applicant directly.</div>
</td></tr></table>
</body></html>`;

  const text = [
    heading,
    `Application ID: ${row.application_id}`,
    '',
    ...fields.map(([label, value]) => `${label}:\n${value ?? '—'}\n`),
    videoLink ? `Secure video (private, valid ${VIDEO_LINK_DAYS} days):\n${videoLink}\n` : '',
  ].join('\n');

  return { subject, html, text };
}

export async function sendOwnerEmail(c, row) {
  const { subject, html, text } = buildOwnerEmail(c, row);
  const res = await fetch(`${c.resendBase}/emails`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${c.resendKey}` },
    body: JSON.stringify({
      from: `Playbook Live <${c.fromEmail}>`,
      to: c.receiver,
      reply_to: row.email,
      subject,
      html,
      text,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('[playbook-live] Resend error', res.status, detail.slice(0, 300));
    return false;
  }
  return true;
}

/** Emails the owner, then stamps email_sent_at so the retry job skips it. */
export async function notifyOwner(c, row) {
  const sent = await sendOwnerEmail(c, row);
  if (sent) {
    await dbRequest(c, 'PATCH', `${TABLE}?application_id=eq.${encodeURIComponent(row.application_id)}`, {
      body: { email_sent_at: new Date().toISOString() },
      prefer: 'return=minimal',
    });
  }
  return sent;
}
