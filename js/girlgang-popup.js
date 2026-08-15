/* =============================================
   GIRLGANG-POPUP.JS
   The on-site "you're missing out" popup for unsubscribed
   visitors. Rules, matching the spec exactly:
     - Never appears during the splash screen — waits for the
       'hdp:splash-hidden' event splash.js dispatches.
     - Appears for first-time AND returning visitors, every
       visit, for as long as the visitor hasn't subscribed.
     - A close/"not right now" dismiss hides it for THIS visit
       only (sessionStorage) — it comes back next time she opens
       the site, exactly as specified.
     - Stops permanently, forever, the moment she subscribes
       (checked via subscription-state.js).
     - Reuses the existing newsletter form/backend — the CTA
       just closes the popup and scrolls to the real #newsletter
       section rather than duplicating a second subscribe flow.
   ============================================= */

import { isSubscribed } from './subscription-state.js';
import { requestNotificationPermissionOnce } from './notifications.js';

const DISMISSED_KEY = 'hdp-girlgang-popup-dismissed-session';
const SHOW_DELAY_MS = 1800; // "shortly after" the homepage loads, not instantly

function scrollToNewsletter() {
  const target = document.getElementById('newsletter');
  if (!target) return;
  const header = document.querySelector('.header');
  const offset = (header ? header.offsetHeight : 0) + 16;
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function initGirlGangPopup() {
  const overlay = document.getElementById('girlgang-popup-overlay');
  if (!overlay) return;

  const closeBtn = document.getElementById('girlgang-popup-close');
  const dismissBtn = document.getElementById('girlgang-popup-dismiss');
  const cta = document.getElementById('girlgang-popup-cta');

  function hidePopup() {
    overlay.classList.remove('visible');
    window.setTimeout(() => { overlay.hidden = true; }, 250);
  }

  function dismissForSession() {
    sessionStorage.setItem(DISMISSED_KEY, '1');
    hidePopup();
  }

  function showPopup() {
    if (isSubscribed()) return;
    if (sessionStorage.getItem(DISMISSED_KEY) === '1') return;
    overlay.hidden = false;
    // Next frame, so the 'hidden' removal and the transition
    // don't collapse into one instant jump.
    requestAnimationFrame(() => overlay.classList.add('visible'));
  }

  closeBtn?.addEventListener('click', dismissForSession);
  dismissBtn?.addEventListener('click', dismissForSession);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) dismissForSession();
  });

  cta?.addEventListener('click', () => {
    requestNotificationPermissionOnce();
    dismissForSession();
    scrollToNewsletter();
  });

  // Stop instantly and permanently the moment she subscribes,
  // even if the popup is already open in this same session.
  window.addEventListener('hdp:subscribed', hidePopup);

  function scheduleShow() {
    window.setTimeout(showPopup, SHOW_DELAY_MS);
  }

  // The splash may have already hidden (or been skipped on a repeat
  // visit) before this script even runs. Checking a flag splash.js
  // sets — rather than the #splash element's presence/class — avoids
  // a race where the splash component simply hasn't loaded into the
  // DOM yet at the moment this runs.
  if (window.__hdpSplashHidden) {
    scheduleShow();
  } else {
    window.addEventListener('hdp:splash-hidden', scheduleShow, { once: true });
  }
                  }
