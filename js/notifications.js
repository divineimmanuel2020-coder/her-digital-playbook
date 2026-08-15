/* =============================================
   NOTIFICATIONS.JS
   Real browser Notification API — not a fake on-page banner.
   Two jobs:
     1. For unsubscribed visitors: an occasional, rate-limited
        nudge to join the Girl Gang, shown at most once a day.
     2. For a visitor who just subscribed: an immediate
        confirmation telling her to check Gmail's Promotions tab.

   This uses the foreground Notification API directly (new
   Notification(...)), which is the real browser notification
   system and works without any server-side push infrastructure.
   It fires while this tab/site is open and permission is
   granted — it is NOT a background push notification (that
   would require a service worker, a push server, and VAPID
   keys — a much bigger, separate backend project this site
   doesn't have hooks for). This is the correctly-scoped, honest
   version of "real browser notifications" for a static site.

   Permission is requested at most once ever per browser, and
   only from a genuine user gesture (a click), never
   automatically on page load — Chrome and most browsers ignore
   or block permission prompts that aren't tied to user
   interaction anyway.
   ============================================= */

import { isSubscribed } from './subscription-state.js';

const PERMISSION_ASKED_KEY = 'hdp-notif-permission-asked';
const LAST_NUDGE_KEY = 'hdp-notif-last-nudge';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function supported() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Requests notification permission. Must be called from a real
 * user gesture (e.g. inside a click handler) — browsers ignore
 * or auto-deny requests made otherwise. Only ever asks once per
 * browser; if the person dismissed or denied it before, this is
 * a silent no-op on every later call.
 */
export function requestNotificationPermissionOnce() {
  if (!supported()) return;
  if (localStorage.getItem(PERMISSION_ASKED_KEY) === '1') return;
  if (Notification.permission !== 'default') return;

  localStorage.setItem(PERMISSION_ASKED_KEY, '1');
  Notification.requestPermission().catch(() => {
    // Permission prompt dismissed/blocked — nothing else to do,
    // the on-site popup and inline success message still work.
  });
}

function showNotification(title, body) {
  if (!supported() || Notification.permission !== 'granted') return;
  try {
    new Notification(title, {
      body,
      icon: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_192,q_auto,f_auto/v1786286194/file_00000000bf7c821186b8c99e14d14dfa_j8vxfm.png',
      badge: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_96,q_auto,f_auto/v1786286194/file_00000000bf7c821186b8c99e14d14dfa_j8vxfm.png',
    });
  } catch (_) {
    // Some browsers/platforms restrict direct Notification()
    // construction — failing silently is correct here, this is
    // a nice-to-have layered on top of the on-site experience.
  }
}

/**
 * Shows the "come join the Girl Gang" nudge for an unsubscribed
 * visitor — at most once every 24 hours, and never once she's
 * subscribed.
 */
export function maybeShowJoinReminder() {
  if (isSubscribed()) return;
  if (!supported() || Notification.permission !== 'granted') return;

  const last = Number(localStorage.getItem(LAST_NUDGE_KEY) || 0);
  if (Date.now() - last < ONE_DAY_MS) return;

  localStorage.setItem(LAST_NUDGE_KEY, String(Date.now()));
  showNotification(
    'Hey girl, don\u2019t miss out! \ud83c\udf80',
    'Money tips, career glow-ups, and freelance opportunities are waiting in the Girl Gang. Come join us \ud83d\udc95'
  );
}

/**
 * Fires immediately after a successful subscribe. Safe to call
 * even without permission granted — it just no-ops.
 */
export function showWelcomeNotification() {
  showNotification(
    'You\u2019re in, girl! \ud83d\udc95',
    'Check your Gmail Promotions tab \u2014 your Her Digital Playbook welcome email is waiting for you. \u2728'
  );
}
