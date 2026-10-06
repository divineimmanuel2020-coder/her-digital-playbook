/* =============================================
   /api/track.js
   Receives the tiny anonymous analytics pings sent by the tracker at the
   top of js/supabase.js, and stores them in the analytics_pageviews table.
   The private admin dashboard (a separate project) reads that table.

   PRIVACY
   - The visitor's IP address is NEVER stored and never logged. The country
     comes from Vercel's own "x-vercel-ip-country" header (two letters only).
   - The device / browser are worked out here from the User-Agent and only the
     broad labels are saved (e.g. "Android", "Chrome") — never the raw string.
   - Only a random anonymous ID is saved. No names, emails or form contents.

   SECURITY
   - Runs only on Vercel's servers; uses the existing SUPABASE_URL and
     SUPABASE_SERVICE_ROLE_KEY environment variables. No new ones needed.
   - The table has Row Level Security on with no public policies, so the
     browser can never read or write it directly.
   - It always answers 204 and says nothing about why a ping was dropped.
   ============================================= */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TABLE = 'analytics_pageviews';

const OWN_HOST = /(^|\.)herdigitalplaybook\.com$/i;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ANON_ID = /^[A-Za-z0-9_-]{8,64}$/;
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|preview|headless|lighthouse|pagespeed|pingdom|uptime|monitor|curl|wget|python|axios|node-fetch|go-http|java\/|okhttp|scrapy|phantom|puppeteer|playwright/i;

/* Best-effort throttle (per warm server instance; it resets on cold start). */
const hits = new Map();
function throttled(ip) {
  const now = Date.now();
  if (hits.size > 2000) hits.clear();
  const h = hits.get(ip);
  if (!h || now > h.reset) { hits.set(ip, { n: 1, reset: now + 60000 }); return false; }
  h.n += 1;
  return h.n > 90;
}

function deviceOf(ua, touch) {
  if (/iPhone|iPod/i.test(ua)) return 'iPhone';
  if (/iPad/i.test(ua)) return 'iPad';
  if (/Android/i.test(ua)) return 'Android';
  if (/Macintosh|Mac OS X/i.test(ua)) return touch > 1 ? 'iPad' : 'Mac'; // iPadOS reports itself as a Mac
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Linux|X11|CrOS/i.test(ua)) return 'Linux';
  return 'Other';
}

function browserOf(ua) {
  if (/FBAN|FBAV|FB_IAB/i.test(ua)) return 'Facebook app';
  if (/Instagram/i.test(ua)) return 'Instagram app';
  if (/TikTok|musical_ly|BytedanceWebview/i.test(ua)) return 'TikTok app';
  if (/Edg(e|A|iOS)?\//i.test(ua)) return 'Edge';
  if (/OPR\/|Opera|OPT\//i.test(ua)) return 'Opera';
  if (/SamsungBrowser/i.test(ua)) return 'Samsung Internet';
  if (/FxiOS|Firefox/i.test(ua)) return 'Firefox';
  if (/CriOS|Chrome|Chromium/i.test(ua)) return 'Chrome';
  if (/Safari/i.test(ua)) return 'Safari';
  return 'Other';
}

function referrerOf(host) {
  let h = String(host || '').toLowerCase().replace(/^www\./, '').trim();
  if (!h || h.length > 100 || !/^[a-z0-9.-]+$/.test(h) || OWN_HOST.test(h)) return null;
  if (/(^|\.)facebook\.com$/.test(h) || h === 'fb.com') return 'facebook.com';
  if (/(^|\.)instagram\.com$/.test(h)) return 'instagram.com';
  if (h === 't.co' || h === 'x.com' || h === 'twitter.com') return 'x.com';
  if (/(^|\.)google\./.test(h)) return 'google';
  if (/(^|\.)pinterest\./.test(h) || h === 'pin.it') return 'pinterest.com';
  if (/(^|\.)tiktok\.com$/.test(h)) return 'tiktok.com';
  if (/(^|\.)linkedin\.com$/.test(h) || h === 'lnkd.in') return 'linkedin.com';
  if (h === 'youtube.com' || h === 'm.youtube.com' || h === 'youtu.be') return 'youtube.com';
  return h;
}

function cleanTitle(t) {
  return String(t || '')
    .replace(/[\u0000-\u001f\u007f<>]+/g, ' ')
    .replace(/\s*[|\u2013\u2014-]\s*Her Digital Playbook\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);
}

function cleanPath(p) {
  let s = String(p || '');
  if (s[0] !== '/' || s.length > 200) return null;
  s = s.split('?')[0].split('#')[0].replace(/[\u0000-\u001f\u007f<>"'\s]+/g, '');
  if (s === '/index.html') s = '/';
  if (s.length > 1) s = s.replace(/\/+$/, '');
  return s || '/';
}

function allowedOrigin(req) {
  const src = req.headers.origin || req.headers.referer || '';
  try {
    const host = new URL(src).hostname;
    return OWN_HOST.test(host) || host === 'localhost';
  } catch { return false; }
}

async function db(path, init) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      Prefer: 'return=minimal',
    },
  });
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.statusCode = 405; return res.end(); }

  try {
    const ua = String(req.headers['user-agent'] || '');
    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    if (!SUPABASE_URL || !SERVICE_KEY || !ua || BOT.test(ua) || !allowedOrigin(req) || throttled(ip)) {
      res.statusCode = 204; return res.end();
    }

    let b = req.body;
    if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = null; } }
    if (!b || typeof b !== 'object' || !UUID.test(String(b.id || ''))) { res.statusCode = 204; return res.end(); }

    if (b.k === 'e') {
      // Engagement update: total seconds the page was visible (capped at 30 min).
      const s = Math.min(1800, Math.max(0, Math.round(Number(b.s))));
      if (s > 0) await db(`${TABLE}?pv_id=eq.${b.id}&seconds=lt.${s}`, { method: 'PATCH', body: JSON.stringify({ seconds: s }) });
    } else if (b.k === 'v') {
      const path = cleanPath(b.p);
      if (path && ANON_ID.test(String(b.vid || '')) && ANON_ID.test(String(b.sid || ''))) {
        const country = String(req.headers['x-vercel-ip-country'] || '').toUpperCase();
        const row = {
          pv_id: b.id,
          visitor_id: b.vid,
          session_id: b.sid,
          path,
          title: cleanTitle(b.t) || null,
          kind: b.a === 1 ? 'article' : 'page',
          referrer: referrerOf(b.r),
          country: /^[A-Z]{2}$/.test(country) && country !== 'XX' ? country : null,
          device: deviceOf(ua, Number(b.tp) || 0),
          browser: browserOf(ua),
        };
        const r = await db(TABLE, { method: 'POST', body: JSON.stringify(row) });
        if (!r.ok && r.status !== 409) console.error('TRACK insert failed', r.status);
      }
    }
  } catch (err) {
    console.error('TRACK error', err && err.message);
  }
  res.statusCode = 204;
  return res.end();
}
