/* =============================================
   /api/playbook-live-video.js
   The "VIEW SECURE VIDEO" button in the owner's notification email points
   here. The link is signed (HMAC) and expires after 30 days. Each visit
   creates a fresh 5-minute signed URL for the private video and redirects
   to it — so there is never a permanent public link to any video, and a
   link that leaks stops working on its own.
   ============================================= */

import { TABLE, config, isConfigured, verifyVideoLink, dbRequest, createSignedDownloadUrl } from './_playbook-live.js';

function page(res, status, message) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(status).send(
    `<!DOCTYPE html><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">` +
    `<body style="font-family:Arial,sans-serif;background:#fdeef2;color:#241219;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:24px;text-align:center">` +
    `<p style="max-width:420px;line-height:1.5">${message}</p></body>`
  );
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Referrer-Policy', 'no-referrer');

  const c = config();
  if (!isConfigured(c)) return page(res, 500, 'This service is not configured yet.');

  const { id, exp, sig } = req.query || {};
  if (!verifyVideoLink(c, id, exp, sig)) {
    return page(res, 403, 'This link has expired or is invalid.');
  }

  const r = await dbRequest(c, 'GET', `${TABLE}?select=video_path&application_id=eq.${encodeURIComponent(id)}&limit=1`);
  const path = r.ok && Array.isArray(r.data) && r.data[0] ? r.data[0].video_path : null;
  if (!path) return page(res, 404, 'No video was found for this application.');

  const url = await createSignedDownloadUrl(c, path, 300);
  if (!url) return page(res, 502, 'The video could not be opened right now. Please try again in a moment.');

  res.setHeader('Location', url);
  return res.status(302).end();
}
