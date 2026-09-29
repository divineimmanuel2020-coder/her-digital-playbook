/* =============================================
   /api/playbook-live-maintenance.js
   Daily housekeeping, run by the Vercel cron in vercel.json. Needs the
   CRON_SECRET environment variable (Vercel sends it automatically as
   "Authorization: Bearer <CRON_SECRET>"); without it the endpoint refuses.

     1. Re-sends owner notification emails that failed the first time.
     2. Deletes uploaded videos that never became an application (older than 48h).
     3. Clears old rate-limit rows.
     4. RETENTION — only if PLAYBOOK_LIVE_RETENTION_DAYS is set (e.g. 180):
        deletes applications (and their videos) older than that. Off by default,
        so nothing is ever auto-deleted unless you choose a number.
   ============================================= */

import crypto from 'node:crypto';
import {
  TABLE, RATE_TABLE, config, isConfigured, dbRequest, notifyOwner, listObjects, deleteObjects,
} from './_playbook-live.js';

function authorised(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const given = Buffer.from(String(req.headers?.authorization || ''));
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && crypto.timingSafeEqual(given, expected);
}

const isoAgo = (ms) => encodeURIComponent(new Date(Date.now() - ms).toISOString());
const HOUR = 3600 * 1000;
const DAY = 24 * HOUR;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!process.env.CRON_SECRET) return res.status(503).json({ ok: false, error: 'cron-secret-not-set' });
  if (!authorised(req)) return res.status(401).json({ ok: false, error: 'unauthorised' });

  const c = config();
  if (!isConfigured(c)) return res.status(500).json({ ok: false, error: 'server-misconfigured' });

  const summary = { emailsRetried: 0, orphansDeleted: 0, retentionDeleted: 0 };

  try {
    // 1. unsent notifications (older than 10 minutes, newer than 7 days)
    const unsent = await dbRequest(c, 'GET',
      `${TABLE}?select=*&email_sent_at=is.null&created_at=lt.${isoAgo(10 * 60 * 1000)}&created_at=gt.${isoAgo(7 * DAY)}&limit=20`);
    for (const row of (unsent.ok && Array.isArray(unsent.data) ? unsent.data : [])) {
      if (await notifyOwner(c, row)) summary.emailsRetried++;
    }

    // 2. orphaned uploads
    const cutoff = Date.now() - 48 * HOUR;
    const orphans = [];
    for (const folder of ['host', 'team']) {
      for (const obj of await listObjects(c, folder)) {
        if (!obj.id || !obj.name) continue; // folders have no id
        if (new Date(obj.created_at).getTime() > cutoff) continue;
        const path = `${folder}/${obj.name}`;
        const used = await dbRequest(c, 'GET', `${TABLE}?select=id&video_path=eq.${encodeURIComponent(path)}&limit=1`);
        if (used.ok && Array.isArray(used.data) && used.data.length === 0) orphans.push(path);
      }
    }
    if (orphans.length && (await deleteObjects(c, orphans))) summary.orphansDeleted = orphans.length;

    // 3. rate-limit housekeeping
    await dbRequest(c, 'DELETE', `${RATE_TABLE}?created_at=lt.${isoAgo(2 * DAY)}`, { prefer: 'return=minimal' });

    // 4. optional retention
    if (c.retentionDays > 0) {
      const old = await dbRequest(c, 'GET',
        `${TABLE}?select=application_id,video_path&created_at=lt.${isoAgo(c.retentionDays * DAY)}&limit=200`);
      const rows = old.ok && Array.isArray(old.data) ? old.data : [];
      const paths = rows.map((r) => r.video_path).filter(Boolean);
      if (paths.length) await deleteObjects(c, paths);
      for (const r of rows) {
        await dbRequest(c, 'DELETE', `${TABLE}?application_id=eq.${encodeURIComponent(r.application_id)}`, { prefer: 'return=minimal' });
        summary.retentionDeleted++;
      }
    }
  } catch (err) {
    console.error('[api/playbook-live-maintenance] error', err?.message);
    return res.status(500).json({ ok: false, error: 'maintenance-failed', summary });
  }

  return res.status(200).json({ ok: true, summary });
}
