/* =============================================
   /api/_antispam.js
   Shared anti-bot helpers for the signup form. The leading
   underscore keeps Vercel from turning this file into a public
   endpoint (same convention as _playbook-live.js).

   Why this exists: bots were calling /api/subscribe directly,
   skipping the form entirely, so every fake signup also triggered
   a real Resend welcome email and used up email credits. Checks
   that only live in the browser can be skipped by a bot, so every
   check here runs on the server.

   The layers, cheapest first, so a bot is stopped before it can
   cost you a Supabase write or a Resend email:
     1. Honeypot field      (handled in subscribe.js)
     2. Signed form token   (the bot has to load the form first,
                             and wait a few seconds like a person)
     3. Rate limit per IP   (best-effort, see note below)
     4. Real-looking name
     5. Real-looking email  (format, disposable domains, Gmail
                             dot-spam, and the domain must exist)

   No npm packages, only Node built-ins, so nothing to install.
   ============================================= */

import { createHmac, timingSafeEqual } from 'node:crypto';
import { resolveMx, resolve4 } from 'node:dns/promises';

/* =============================================
   2. SIGNED FORM TOKEN
   The form asks the server for a token when it loads. The token
   is just a timestamp plus an HMAC signature made with a secret
   only the server knows (SUBSCRIBE_TOKEN_SECRET if you set it,
   otherwise your existing SUPABASE_SERVICE_ROLE_KEY). A signup
   is only accepted if the token is genuine, at least a couple of
   seconds old (people take time to type) and not too old.
   ============================================= */

const TOKEN_MIN_AGE_MS = 2000;
const TOKEN_MAX_AGE_MS = 3 * 60 * 60 * 1000; // 3 hours

function sign(secret, t) {
  return createHmac('sha256', secret).update(`subscribe|${t}`).digest('hex');
}

export function issueToken(secret) {
  const t = Date.now();
  return { t, sig: sign(secret, t), minAgeMs: TOKEN_MIN_AGE_MS };
}

export function verifyToken(secret, t, sig) {
  const ts = Number(t);
  if (!Number.isFinite(ts) || typeof sig !== 'string' || sig.length !== 64) return false;
  const expected = Buffer.from(sign(secret, ts), 'hex');
  let given;
  try {
    given = Buffer.from(sig, 'hex');
  } catch (_) {
    return false;
  }
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return false;
  const age = Date.now() - ts;
  return age >= TOKEN_MIN_AGE_MS && age <= TOKEN_MAX_AGE_MS;
}

/* =============================================
   3. RATE LIMIT PER IP (best-effort)
   Kept in memory, so each warm serverless instance keeps its own
   count. It will not stop a large, distributed attack on its own,
   but together with the other layers it slows down a single
   machine hammering the form.
   ============================================= */

const attempts = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 6;

export function clientIp(req) {
  const fwd = req.headers && req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

export function tooManyAttempts(ip) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((ts) => now - ts < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  if (attempts.size > 5000) {
    for (const [key, list] of attempts) {
      if (!list.some((ts) => now - ts < WINDOW_MS)) attempts.delete(key);
    }
  }
  return recent.length > MAX_ATTEMPTS;
}

/* =============================================
   4. REAL-LOOKING NAME
   Accepts letters in any language, plus spaces, apostrophes,
   hyphens and full stops (for initials). Rejects digits, symbols,
   web addresses, keyboard mashing and obvious placeholders.
   ============================================= */

const FAKE_NAMES = new Set([
  'test', 'testing', 'tester', 'asdf', 'asdfgh', 'qwerty', 'admin', 'user', 'username',
  'null', 'none', 'anonymous', 'anon', 'fake', 'abc', 'abcd', 'xxx', 'name', 'noname',
  'unknown', 'hello', 'hi', 'sample', 'example', 'spam', 'bot',
]);

export function validateName(rawName) {
  const name = String(rawName || '').replace(/\s+/g, ' ').trim();

  if (name.length < 2 || name.length > 60) return { ok: false };
  if (!/^[\p{L}\p{M}][\p{L}\p{M} '’.\-]*$/u.test(name)) return { ok: false }; // no digits or symbols
  if (/https?|www|\.com|\.net|\.org|@/i.test(name)) return { ok: false };
  if ((name.match(/\p{L}/gu) || []).length < 2) return { ok: false };

  const words = name.split(' ');
  if (words.length > 5) return { ok: false };
  if (FAKE_NAMES.has(name.toLowerCase())) return { ok: false };
  if (/(.)\1{3,}/iu.test(name)) return { ok: false }; // "aaaa"

  for (const word of words) {
    const letters = word.replace(/[^\p{L}]/gu, '');
    if (!letters.length) return { ok: false };

    // Latin-script words: a real word of 4+ letters has a vowel (or y),
    // and does not have a long run of consonants.
    if (/^[A-Za-z]+$/.test(letters)) {
      if (letters.length >= 4 && !/[aeiouy]/i.test(letters)) return { ok: false };
      if (/[bcdfghjklmnpqrstvwxz]{6,}/i.test(letters)) return { ok: false };
      // random capitals inside a word ("aBcDeFg"); McDonald and DeShawn are fine
      const upperAfterFirst = (letters.slice(1).match(/[A-Z]/g) || []).length;
      const allUpper = letters === letters.toUpperCase();
      if (!allUpper && upperAfterFirst > 2) return { ok: false };
    }
  }
  return { ok: true, name };
}

/* =============================================
   5. REAL-LOOKING EMAIL
   ============================================= */

// A short list of throwaway-mailbox domains. Not exhaustive, but it
// catches the common ones that bots and spammers reach for.
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org',
  'sharklasers.com', 'grr.la', '10minutemail.com', '10minutemail.net', 'tempmail.com',
  'temp-mail.org', 'temp-mail.io', 'tempmail.net', 'tempmailo.com', 'yopmail.com',
  'yopmail.net', 'trashmail.com', 'trashmail.net', 'getnada.com', 'nada.email',
  'dispostable.com', 'throwawaymail.com', 'maildrop.cc', 'fakeinbox.com', 'mailnesia.com',
  'mohmal.com', 'emailondeck.com', 'spamgourmet.com', 'mintemail.com', 'mytemp.email',
  'discard.email', 'moakt.com', 'burnermail.io', 'inboxkitten.com', 'mailcatch.com',
  'tmpmail.org', 'tmpmail.net', 'fakemail.net', 'emailfake.com', 'crazymailing.com',
  'tempinbox.com', 'spambox.us', 'dropmail.me', 'harakirimail.com', 'tempr.email',
]);

const GMAIL_DOMAINS = new Set(['gmail.com', 'googlemail.com']);

export function validateEmail(rawEmail) {
  const email = String(rawEmail || '').trim().toLowerCase();

  if (email.length < 6 || email.length > 254) return { ok: false };
  const at = email.lastIndexOf('@');
  if (at < 1 || at !== email.indexOf('@')) return { ok: false };

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);

  if (local.length > 64) return { ok: false };
  if (!/^[a-z0-9._%+\-]+$/.test(local)) return { ok: false };
  if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return { ok: false };

  if (!/^[a-z0-9]([a-z0-9\-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9\-]*[a-z0-9])?)*\.[a-z]{2,24}$/.test(domain)) {
    return { ok: false };
  }
  if (DISPOSABLE_DOMAINS.has(domain)) return { ok: false, reason: 'disposable' };

  // Gmail ignores dots, so bots take one real mailbox and invent endless
  // look-alikes ("b.eautyb.yc.alliep"). Real people rarely use 3+ dots.
  if (GMAIL_DOMAINS.has(domain)) {
    const base = local.split('+')[0];
    const dots = (base.match(/\./g) || []).length;
    const singles = base.split('.').filter((p) => p.length === 1).length;
    if (dots >= 3 || singles >= 3) return { ok: false, reason: 'dot-pattern' };
  }
  return { ok: true, email, domain };
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(Object.assign(new Error('timeout'), { code: 'ETIMEOUT' })), ms)),
  ]);
}

// True if the domain can receive email. If the lookup itself fails for
// any reason other than "this domain does not exist", we give the
// person the benefit of the doubt, so a DNS hiccup never blocks a
// real reader.
export async function domainCanReceiveMail(domain) {
  try {
    const records = await withTimeout(resolveMx(domain), 2500);
    return Array.isArray(records) && records.length > 0;
  } catch (err) {
    if (err && err.code === 'ENODATA') {
      try {
        const addrs = await withTimeout(resolve4(domain), 2500);
        return Array.isArray(addrs) && addrs.length > 0;
      } catch (_) {
        return false;
      }
    }
    if (err && err.code === 'ENOTFOUND') return false;
    return true;
  }
}
