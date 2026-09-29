/* =============================================
   /api/playbook-live-apply.js
   Final step of every Playbook Live application (Host, Talent Team,
   Sub-Agent).

     Browser (fetch POST JSON)
       -> this function
         -> validates EVERYTHING again (never trusts the browser)
         -> confirms the video really arrived in the private bucket
         -> Supabase: stores the application (service_role key, server-side only)
         -> Resend: emails herdigitalplaybook2@gmail.com with a private video link
       -> { success, applicationId }

   If the email can't be sent the application is still saved (the applicant
   should never lose theirs); the daily maintenance job retries the email.
   ============================================= */

import {
  TABLE, TYPES, HOURS, ROLES, HOST_RANGES, MONTHLY_RANGES, MAX_VIDEO_BYTES, VIDEO_TYPES,
  config, isConfigured, readJson, looksLikeBot, rateLimited, ipHash, cleanLine, cleanText,
  newApplicationId, objectHead, deleteObjects, dbRequest, notifyOwner,
} from './_playbook-live.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VIDEO_PATH_RE = /^(host|team)\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(mp4|mov|webm)$/;
const YES_NO = ['Yes', 'No'];

function fail(res, status, error, extra = {}) {
  return res.status(status).json({ success: false, error, ...extra });
}

function oneOf(value, list) {
  return list.includes(value) ? value : null;
}

/** Returns { row } or { error, field }. Everything is re-validated here. */
function validate(type, b) {
  const name = cleanLine(b.name, 100);
  const email = cleanLine(b.email, 200).toLowerCase();
  const whatsapp = cleanLine(b.whatsapp, 30);
  const country = cleanLine(b.country, 80);

  if (name.length < 2) return { error: 'invalid-name', field: 'name' };
  if (!EMAIL_RE.test(email)) return { error: 'invalid-email', field: 'email' };
  const digits = whatsapp.replace(/\D/g, '');
  if (!/^[+\d][\d\s().-]*$/.test(whatsapp) || digits.length < 7 || digits.length > 16) {
    return { error: 'invalid-whatsapp', field: 'whatsapp' };
  }
  if (country.length < 2) return { error: 'invalid-country', field: 'country' };
  if (b.consentPrivacy !== true) return { error: 'consent-required', field: 'consentPrivacy' };
  if (b.confirm18 !== true) return { error: 'confirm-18-required', field: 'confirm18' };

  const row = {
    application_type: type,
    applicant_name: name,
    email,
    whatsapp,
    country,
    age: null,
    role: null,
    answers: {},
    consent_privacy: true,
    confirmed_18_plus: true,
  };

  if (type === 'host') {
    const age = Number(b.age);
    if (!Number.isInteger(age) || age < 1 || age > 99) return { error: 'invalid-age', field: 'age' };
    if (age < 18) return { error: 'underage', field: 'age' };
    const priorExperience = oneOf(b.priorExperience, YES_NO);
    const hours = oneOf(b.hours, HOURS);
    const about = cleanText(b.about, 1500);
    if (!priorExperience) return { error: 'invalid-experience', field: 'priorExperience' };
    if (!hours) return { error: 'invalid-hours', field: 'hours' };
    if (about.length < 10) return { error: 'invalid-about', field: 'about' };
    row.age = age;
    row.answers = { priorExperience, hours, about };
  } else if (type === 'team') {
    const role = oneOf(b.role, ROLES);
    const hours = oneOf(b.hours, HOURS);
    const experience = cleanText(b.experience, 2000);
    const expectedPay = cleanLine(b.expectedPay, 80);
    const note = cleanText(b.note, 1000);
    if (!role) return { error: 'invalid-role', field: 'role' };
    if (experience.length < 10) return { error: 'invalid-experience-text', field: 'experience' };
    if (!hours) return { error: 'invalid-hours', field: 'hours' };
    if (!expectedPay) return { error: 'invalid-pay', field: 'expectedPay' };
    row.role = role;
    row.answers = { experience, hours, expectedPay, note };
  } else {
    const accessToHosts = oneOf(b.accessToHosts, YES_NO);
    const hostsRange = oneOf(b.hostsRange, HOST_RANGES);
    const monthlyRange = oneOf(b.monthlyRange, MONTHLY_RANGES);
    const network = cleanText(b.network, 1500);
    let socialUrl = cleanLine(b.socialUrl, 300);
    if (!accessToHosts) return { error: 'invalid-access', field: 'accessToHosts' };
    if (!hostsRange) return { error: 'invalid-hosts-range', field: 'hostsRange' };
    if (!monthlyRange) return { error: 'invalid-monthly-range', field: 'monthlyRange' };
    if (network.length < 10) return { error: 'invalid-network', field: 'network' };
    if (socialUrl) {
      try {
        const u = new URL(/^https?:\/\//i.test(socialUrl) ? socialUrl : `https://${socialUrl}`);
        if (!['http:', 'https:'].includes(u.protocol) || !u.hostname.includes('.')) throw new Error('bad');
        socialUrl = u.href;
      } catch {
        return { error: 'invalid-url', field: 'socialUrl' };
      }
    }
    row.answers = { accessToHosts, hostsRange, monthlyRange, network, socialUrl };
  }
  return { row };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return fail(res, 405, 'method-not-allowed');
  }

  const c = config();
  if (!isConfigured(c)) {
    console.error('[api/playbook-live-apply] Missing required environment variables.');
    return fail(res, 500, 'server-misconfigured');
  }

  const body = readJson(req);
  if (!body) return fail(res, 400, 'invalid-json');

  // Same believable "success" for bots as the contact form — nothing is stored or emailed.
  if (looksLikeBot(body)) {
    console.warn('[api/playbook-live-apply] Blocked a likely bot submission');
    return res.status(200).json({ success: true, applicationId: 'PL-RECEIVED' });
  }

  const type = String(body.applicationType || '');
  if (!TYPES[type]) return fail(res, 400, 'invalid-type');

  const checked = validate(type, body);
  if (checked.error) return fail(res, 400, checked.error, { field: checked.field });
  const row = checked.row;

  if (await rateLimited(req, 'apply', 6, 3600, c)) return fail(res, 429, 'rate-limited');

  // ---- video: must be a path we issued, and really be in the private bucket ----
  if (TYPES[type].needsVideo) {
    const path = String(body.videoPath || '');
    if (!VIDEO_PATH_RE.test(path) || !path.startsWith(`${type}/`)) return fail(res, 400, 'video-missing');
    const head = await objectHead(c, path);
    if (!head.exists) return fail(res, 400, 'video-missing');
    if (head.size > MAX_VIDEO_BYTES || (head.contentType && !VIDEO_TYPES[head.contentType])) {
      await deleteObjects(c, [path]);
      return fail(res, 400, 'video-invalid');
    }
    row.video_path = path;
    row.video_size_bytes = head.size || null;
    row.video_content_type = head.contentType || null;
  }

  // ---- gentle duplicate protection: same email + same path within 10 minutes ----
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const dup = await dbRequest(c, 'GET',
    `${TABLE}?select=application_id&email=eq.${encodeURIComponent(row.email)}&application_type=eq.${type}&created_at=gte.${encodeURIComponent(since)}&limit=1`);
  if (dup.ok && Array.isArray(dup.data) && dup.data.length) {
    return res.status(200).json({ success: true, applicationId: dup.data[0].application_id, duplicate: true });
  }

  row.ip_hash = ipHash(req, c);

  // ---- store (retry a couple of times in the astronomically unlikely event of an ID clash) ----
  let saved = null;
  for (let attempt = 0; attempt < 3 && !saved; attempt++) {
    row.application_id = newApplicationId(type);
    const ins = await dbRequest(c, 'POST', TABLE, { body: row, prefer: 'return=representation' });
    if (ins.ok && Array.isArray(ins.data) && ins.data[0]) {
      saved = ins.data[0];
    } else if (ins.status === 409 && ins.data && /video_path/.test(JSON.stringify(ins.data))) {
      return fail(res, 409, 'video-already-used');
    } else if (ins.status !== 409) {
      console.error('[api/playbook-live-apply] Supabase insert error', ins.status, ins.data);
      return fail(res, 502, 'storage-failed');
    }
  }
  if (!saved) return fail(res, 502, 'storage-failed');

  // ---- notify the owner (the application is safe even if this fails; cron retries) ----
  const notified = await notifyOwner(c, saved).catch((err) => {
    console.error('[api/playbook-live-apply] notify error', err?.message);
    return false;
  });

  return res.status(200).json({ success: true, applicationId: saved.application_id, notified });
}
