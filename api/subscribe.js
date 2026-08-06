/* =============================================
   /api/subscribe.js
   Vercel Serverless Function — replaces Pipedream entirely.

     Browser (fetch POST JSON)
       -> this function
         -> Supabase (insert subscriber, service_role key, server-side only)
         -> Resend (send personalized welcome email)
       -> JSON response back to the browser

   SECURITY
   This file runs ONLY on Vercel's servers, never in the browser.
   It reads secrets from process.env — those values live in Vercel
   Project Settings -> Environment Variables and are NEVER bundled
   into any file the browser downloads. Nothing in this file, and
   nothing it returns, ever includes RESEND_API_KEY or
   SUPABASE_SERVICE_ROLE_KEY.

   No npm packages are required — this uses the native fetch()
   that's built into Vercel's Node.js runtime, so there is nothing
   to `npm install` and no package.json is required for this
   function to work. That matters because this project is edited
   entirely from GitHub's mobile web UI with no local terminal.
   ============================================= */

import { WELCOME_EMAIL_TEMPLATE } from './welcome-email-template.js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
// Optional — falls back to a sensible default if not set in Vercel.
const SITE_URL = process.env.SITE_URL || 'https://herdigitalplaybook.com';

function isValidName(name) {
  return typeof name === 'string' && name.trim().length >= 2;
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/* =============================================
   SUPABASE — insert the subscriber using the service_role key.
   This talks to Supabase's REST API (PostgREST) directly over
   fetch, so no @supabase/supabase-js dependency is needed here.
   ============================================= */
async function insertSubscriber(name, email) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/subscribers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ name, email, status: 'active' }),
  });

  if (res.status === 201) {
    return { ok: true };
  }

  let body = null;
  try {
    body = await res.json();
  } catch (_) {
    // response body wasn't JSON — fall through with body = null
  }

  // Postgres unique_violation, surfaced by PostgREST as HTTP 409
  // with code 23505 — this is our "already subscribed" case.
  if (res.status === 409 || (body && body.code === '23505')) {
    return { ok: false, kind: 'duplicate' };
  }

  console.error('[api/subscribe] Supabase insert error', res.status, body);
  return { ok: false, kind: 'supabase-error', detail: body };
}

/* =============================================
   RESEND — send the personalized welcome email.
   Talks to Resend's REST API directly over fetch, so no `resend`
   npm package is required either.
   ============================================= */
async function sendWelcomeEmail(name, email) {
  const personalizedHtml = WELCOME_EMAIL_TEMPLATE
    .replaceAll('{{SUBSCRIBER_NAME}}', name)
    .replaceAll('{{UNSUBSCRIBE_URL}}', `${SITE_URL}/pages/contact.html?unsubscribe=${encodeURIComponent(email)}`);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: email,
      subject: '✨ Welcome to Her Digital Playbook ✨',
      html: personalizedHtml,
    }),
  });

  if (!res.ok) {
    let detail = null;
    try {
      detail = await res.json();
    } catch (_) {
      // ignore — Resend didn't return JSON
    }
    console.error('[api/subscribe] Resend send error', res.status, detail);
    return { ok: false, detail };
  }

  return { ok: true };
}

/* =============================================
   HANDLER
   ============================================= */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'method-not-allowed' });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !RESEND_API_KEY || !FROM_EMAIL) {
    console.error('[api/subscribe] Missing required environment variables.');
    return res.status(500).json({ success: false, error: 'server-misconfigured' });
  }

  let body = req.body;
  // Vercel usually parses JSON bodies automatically, but this
  // guards against the rare case where it arrives as a raw string.
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (_) {
      return res.status(400).json({ success: false, error: 'invalid-json' });
    }
  }

  const name = (body && body.name ? String(body.name) : '').trim();
  const email = (body && body.email ? String(body.email) : '').trim();

  if (!isValidName(name)) {
    return res.status(400).json({ success: false, error: 'missing-name' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'missing-email' });
  }

  let insertResult;
  try {
    insertResult = await insertSubscriber(name, email);
  } catch (err) {
    console.error('[api/subscribe] Supabase request failed', err);
    return res.status(502).json({ success: false, error: 'supabase-unreachable' });
  }

  if (!insertResult.ok) {
    if (insertResult.kind === 'duplicate') {
      return res.status(409).json({ success: false, error: 'duplicate' });
    }
    return res.status(502).json({ success: false, error: 'supabase-error' });
  }

  // The subscriber is saved at this point no matter what happens
  // next — a Resend hiccup should never make the signup itself
  // look like it failed to the person filling out the form.
  try {
    const emailResult = await sendWelcomeEmail(name, email);
    if (!emailResult.ok) {
      return res.status(200).json({ success: true, emailSent: false });
    }
  } catch (err) {
    console.error('[api/subscribe] Resend request failed', err);
    return res.status(200).json({ success: true, emailSent: false });
  }

  return res.status(200).json({ success: true, emailSent: true });
  }
    
