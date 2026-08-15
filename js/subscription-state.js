/* =============================================
   SUBSCRIPTION-STATE.JS
   The single source of truth for "has this browser already
   joined the Girl Gang." Both girlgang-popup.js and
   notifications.js read and react to this — when newsletter.js
   marks someone subscribed, both systems stop on their very next
   check, with nothing to keep in sync manually.
   ============================================= */

const SUBSCRIBED_KEY = 'hdp-subscribed';

export function isSubscribed() {
  return localStorage.getItem(SUBSCRIBED_KEY) === '1';
}

export function markSubscribed() {
  localStorage.setItem(SUBSCRIBED_KEY, '1');
  window.dispatchEvent(new CustomEvent('hdp:subscribed'));
}
