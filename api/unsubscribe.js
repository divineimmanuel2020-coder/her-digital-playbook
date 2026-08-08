/* =============================================
   /api/unsubscribe.js
   One-click unsubscribe, reached from the link in the welcome
   email (and any future newsletter emails):

     Email link (GET, plain <a href>)
       -> this function
         -> Supabase (mark subscriber as unsubscribed)
       -> a small branded confirmation page, rendered directly
          by this function — no separate frontend page needed.

   Runs entirely on Vercel's servers. Uses the same
   SUPABASE_SERVICE_ROLE_KEY as /api/subscribe.js, read from
   environment variables only — never exposed to the browser.
   ============================================= */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function page({ title, message, emoji }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} — Her Digital Playbook</title>
<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #FFE4EC;
    font-family: Helvetica, Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  .card {
    max-width: 420px;
    width: 90%;
    background-color: #FFF5F7;
    border-radius: 28px;
    box-shadow: 0 20px 50px rgba(200,140,150,0.15);
    padding: 40px 28px;
    text-align: center;
  }
  .emoji { font-size: 40px; margin-bottom: 12px; }
  h1 {
    font-family: Georgia, 'Playfair Display', serif;
    font-size: 22px;
    color: #B55467;
    margin: 0 0 10px;
  }
  p {
    font-size: 15px;
    line-height: 1.6;
    color: #4B383C;
    margin: 0 0 20px;
  }
  a.btn {
    display: inline-block;
    padding: 14px 32px;
    background-color: #D4677A;
    background-image: linear-gradient(135deg, #E88A9D, #D4677A, #C14D63);
    border-radius: 50px;
    color: #FFFFFF;
    font-weight: 600;
    text-decoration: none;
    font-size: 15px;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="emoji">${emoji}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a class="btn" href="https://herdigitalplaybook.com">Back to Her Digital Playbook</a>
  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send(
      page({
        emoji: '💗',
        title: 'One moment',
        message: "This link only works from an email — please use the unsubscribe link exactly as it appears in your inbox.",
      })
    );
  }

  const email = typeof req.query.email === 'string' ? req.query.email.trim() : '';

  if (!isValidEmail(email)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(400).send(
      page({
        emoji: '🌸',
        title: "That link looks incomplete",
        message: "We couldn't find a valid email address in this link. If you'd still like to unsubscribe, reach out to us directly and we'll take care of it.",
      })
    );
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[api/unsubscribe] Missing required environment variables.');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(500).send(
      page({
        emoji: '☕',
        title: 'Something went wrong',
        message: "We hit a snag processing this just now. Please try the link again in a little while.",
      })
    );
  }

  try {
    const url = `${SUPABASE_URL}/rest/v1/subscribers?email=eq.${encodeURIComponent(email)}`;
    const supaRes = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({ status: 'unsubscribed' }),
    });

    if (!supaRes.ok) {
      const detail = await supaRes.text().catch(() => null);
      console.error('[api/unsubscribe] Supabase update error', supaRes.status, detail);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(502).send(
        page({
          emoji: '☕',
          title: 'Something went wrong',
          message: "We couldn't process your request just now. Please try the link again in a little while.",
        })
      );
    }

    const updated = await supaRes.json().catch(() => []);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (Array.isArray(updated) && updated.length === 0) {
      // No row matched this email — either already removed, or the
      // link is stale. Either way, show a graceful, non-alarming page.
      return res.status(200).send(
        page({
          emoji: '💕',
          title: "You're all set",
          message: "We couldn't find an active subscription for this email — you may have already unsubscribed. No further emails will be sent.",
        })
      );
    }

    return res.status(200).send(
      page({
        emoji: '🎀',
        title: "You've been unsubscribed",
        message: "No hard feelings, gorgeous. You've been removed from Her Digital Playbook emails and won't hear from us again unless you sign up again yourself.",
      })
    );
  } catch (err) {
    console.error('[api/unsubscribe] Unexpected error', err);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(500).send(
      page({
        emoji: '☕',
        title: 'Something went wrong',
        message: "We hit a snag processing this just now. Please try the link again in a little while.",
      })
    );
  }
}
