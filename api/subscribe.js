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
import { WELCOME_EMAIL_TEMPLATE_PLAIN } from './welcome-email-template-plain.js';
import {
  issueToken,
  verifyToken,
  clientIp,
  tooManyAttempts,
  validateName,
  validateEmail,
  domainCanReceiveMail,
} from './_antispam.js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
// Optional — falls back to a sensible default if not set in Vercel.
const SITE_URL = process.env.SITE_URL || 'https://herdigitalplaybook.com';
// Set WELCOME_EMAIL_VARIANT to "plain" in Vercel's environment
// variables to test the plain, text-first version instead of the
// fully styled one — no code changes needed to switch back and
// forth while you compare Gmail inbox placement.
const EMAIL_VARIANT = (process.env.WELCOME_EMAIL_VARIANT || 'styled').toLowerCase();
// Signs the anti-bot form token. Uses SUBSCRIBE_TOKEN_SECRET if you add one in
// Vercel; otherwise it safely reuses your existing service-role key, so no
// new setting is required.
const TOKEN_SECRET = process.env.SUBSCRIBE_TOKEN_SECRET || SUPABASE_SERVICE_ROLE_KEY;

// Name and email checks live in ./_antispam.js (validateName / validateEmail).

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
  const template = EMAIL_VARIANT === 'plain' ? WELCOME_EMAIL_TEMPLATE_PLAIN : WELCOME_EMAIL_TEMPLATE;
  const personalizedHtml = template
    .replaceAll('{{SUBSCRIBER_NAME}}', name)
    .replaceAll('{{UNSUBSCRIBE_URL}}', `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}`);

  // Emoji-laden, exclamation-heavy subject lines are one of the
  // strongest Promotions-tab triggers Gmail's classifier checks —
  // so the plain variant gets a genuinely plain, conversational
  // subject instead of the branded one.
  const subject = EMAIL_VARIANT === 'plain' ? `Welcome, ${name}` : '✨ Welcome to Her Digital Playbook ✨';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `Princess from Her Digital Playbook <${FROM_EMAIL}>`,
      to: email,
      // A real, monitored reply-to address (rather than a bare
      // "noreply") signals a genuine sender-recipient relationship
      // to Gmail — and lets people actually write back to you.
      reply_to: FROM_EMAIL,
      subject,
      html: personalizedHtml,
      headers: {
        // One-click unsubscribe headers, expected by Gmail/Yahoo's
        // bulk-sender rules and generally good for sender trust.
        'List-Unsubscribe': `<${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
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
  res.setHeader('Cache-Control', 'no-store');

  // The signup form asks for a short-lived signed token as it loads. A bot
  // that posts straight to this endpoint never gets one, so it is turned away.
  if (req.method === 'GET') {
    if (!TOKEN_SECRET) {
      return res.status(500).json({ success: false, error: 'server-misconfigured' });
    }
    return res.status(200).json({ success: true, ...issueToken(TOKEN_SECRET) });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
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
  body = body && typeof body === 'object' ? body : {};

  // 1. Honeypot. The form has a hidden field that people never see or fill
  //    in, but bots fill in every field. We act as if it worked, so the bot
  //    learns nothing, and we do not save anything or send any email.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(200).json({ success: true, emailSent: true });
  }

  // 2. Slow down anyone hammering the form from one place.
  if (tooManyAttempts(clientIp(req))) {
    return res.status(429).json({ success: false, error: 'too-many-attempts' });
  }

  // 3. Must carry a genuine, not-too-fresh, not-too-old form token.
  if (!TOKEN_SECRET || !verifyToken(TOKEN_SECRET, body.t, body.sig)) {
    return res.status(400).json({ success: false, error: 'verification-failed' });
  }

  // 4. A real-looking name.
  const nameCheck = validateName(body.name);
  if (!nameCheck.ok) {
    return res.status(400).json({ success: false, error: 'invalid-name' });
  }

  // 5. A real-looking email, on a domain that can actually receive mail.
  const emailCheck = validateEmail(body.email);
  if (!emailCheck.ok) {
    return res.status(400).json({ success: false, error: 'invalid-email' });
  }
  if (!(await domainCanReceiveMail(emailCheck.domain))) {
    return res.status(400).json({ success: false, error: 'invalid-email' });
  }

  const name = nameCheck.name;
  const email = emailCheck.email;

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
