/* =============================================
   /api/playbook-live-upload-url.js
   Step 1 of a Host / Talent Team application: the browser asks for
   permission to upload ONE introduction video straight to the private
   Supabase Storage bucket (so the video never passes through Vercel's
   request-size limits).

   This endpoint checks the file's declared type + size, applies spam
   protection and rate limiting, then returns a single-use signed upload
   token for a brand-new random path. The bucket itself has no public or
   anonymous access at all — this token is the only way in — and it also
   enforces the size limit and allowed video types on its own.
   ============================================= */

import crypto from 'node:crypto';
import {
  MAX_VIDEO_BYTES, VIDEO_TYPES, TYPES, config, isConfigured, readJson, looksLikeBot,
  rateLimited, createSignedUploadUrl,
} from './_playbook-live.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'method-not-allowed' });
  }

  const c = config();
  if (!isConfigured(c)) {
    console.error('[api/playbook-live-upload-url] Missing required environment variables.');
    return res.status(500).json({ success: false, error: 'server-misconfigured' });
  }

  const body = readJson(req);
  if (!body) return res.status(400).json({ success: false, error: 'invalid-json' });

  // Bots get a believable-looking answer so they don't learn what tripped them.
  if (looksLikeBot(body)) {
    console.warn('[api/playbook-live-upload-url] Blocked a likely bot request');
    return res.status(200).json({ success: true, path: `host/${crypto.randomUUID()}.mp4`, token: crypto.randomUUID(), maxBytes: MAX_VIDEO_BYTES });
  }

  const type = String(body.applicationType || '');
  if (!TYPES[type] || !TYPES[type].needsVideo) {
    return res.status(400).json({ success: false, error: 'invalid-type' });
  }

  const fileType = String(body.fileType || '').toLowerCase();
  const fileSize = Number(body.fileSize);
  if (!VIDEO_TYPES[fileType]) {
    return res.status(400).json({ success: false, error: 'invalid-file-type' });
  }
  if (!Number.isFinite(fileSize) || fileSize <= 0) {
    return res.status(400).json({ success: false, error: 'invalid-file-size' });
  }
  if (fileSize > MAX_VIDEO_BYTES) {
    return res.status(413).json({ success: false, error: 'file-too-large', maxBytes: MAX_VIDEO_BYTES });
  }

  if (await rateLimited(req, 'upload-url', 8, 3600, c)) {
    return res.status(429).json({ success: false, error: 'rate-limited' });
  }

  const path = `${type}/${crypto.randomUUID()}.${VIDEO_TYPES[fileType]}`;
  const signed = await createSignedUploadUrl(c, path);
  if (!signed) return res.status(502).json({ success: false, error: 'upload-unavailable' });

  return res.status(200).json({ success: true, path: signed.path, token: signed.token, maxBytes: MAX_VIDEO_BYTES });
}
