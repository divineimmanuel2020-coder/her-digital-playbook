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
                                 
