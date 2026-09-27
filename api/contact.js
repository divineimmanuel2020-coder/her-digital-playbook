/* =============================================
   /api/contact.js
   Vercel Serverless Function — delivers contact form
   submissions to your inbox via Resend.

     Browser (fetch POST JSON)
       -> this function
         -> Resend (sends the message to you)
       -> JSON response back to the browser

   SECURITY
   Runs only on Vercel's servers, never in the browser. Reads
   RESEND_API_KEY, FROM_EMAIL, and CONTACT_EMAIL from
   process.env — none of these are ever sent to the browser.
   No npm packages required — uses native fetch(), same as
   api/subscribe.js.
   ============================================= */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
// Where contact messages actually land. Falls back to FROM_EMAIL
// if you don't set a separate one in Vercel.
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || process.env.FROM_EMAIL;

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'method-not-allowed' });
  }

  if (!RESEND_API_KEY || !FROM_EMAIL || !CONTACT_EMAIL) {
    console.error('[api/contact] Missing required environment variables.');
    return res.status(500).json({ success: false, error: 'server-misconfigured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (_) {
      return res.status(400).json({ success: false, error: 'invalid-json' });
    }
  }

  /* ---------- spam filtering ----------
     Two checks, both enforced here (not just in the browser), since a bot
     can always skip pages/contact.html's JS and POST straight to this
     endpoint with whatever payload it wants.

     1. Honeypot ("website"): a form field real visitors never see or
        fill in (see .contact-hp-field in css/style.css). A non-empty
        value means whatever submitted this didn't render the page like
        a browser does — it just filled in every field it found.

     2. Minimum elapsed time: "renderedAt" is the timestamp the contact
        page's JS captured the instant it loaded. A real person needs a
        few seconds to read the form and type a message; a script that
        fills and submits it in well under a second is the "classic
        automated bot" pattern you saw. A missing/invalid renderedAt
        (nothing this page's own JS would ever send) is treated the same
        way, since that means the request bypassed the page entirely.

     Either check failing returns the SAME 200 success response a real
     sender gets, without calling Resend. Bots that get an honest 4xx
     tend to notice and adapt their script; a fake success is more
     likely to make them think the submission "worked" and move on. */
  const MIN_SUBMIT_MS = 1500;
  const honeypot = body && body.website ? String(body.website).trim() : '';
  const renderedAt = body && body.renderedAt ? Number(body.renderedAt) : NaN;
  const elapsedMs = Date.now() - renderedAt;

  if (honeypot || !Number.isFinite(renderedAt) || elapsedMs < MIN_SUBMIT_MS) {
    console.warn('[api/contact] Blocked a likely bot submission', {
      honeypotFilled: !!honeypot,
      renderedAt: body?.renderedAt,
      elapsedMs: Number.isFinite(renderedAt) ? elapsedMs : null,
    });
    return res.status(200).json({ success: true });
  }

  const name = (body && body.name ? String(body.name) : '').trim();
  const email = (body && body.email ? String(body.email) : '').trim();
  const message = (body && body.message ? String(body.message) : '').trim();

  if (name.length < 2) {
    return res.status(400).json({ success: false, error: 'missing-name' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'missing-email' });
  }
  if (message.length < 5) {
    return res.status(400).json({ success: false, error: 'missing-message' });
  }

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #2b2b2b;">
      <p><strong>New message from the Her Digital Playbook contact form</strong></p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>`;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: CONTACT_EMAIL,
        // Reply-To is the sender's own address, so you can hit
        // "Reply" in your inbox and it goes straight back to her.
        reply_to: email,
        subject: `New contact form message from ${name}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text().catch(() => null);
      console.error('[api/contact] Resend send error', resendRes.status, detail);
      return res.status(502).json({ success: false, error: 'send-failed' });
    }
  } catch (err) {
    console.error('[api/contact] Resend request failed', err);
    return res.status(502).json({ success: false, error: 'send-failed' });
  }

  return res.status(200).json({ success: true });
                  }
                                 
