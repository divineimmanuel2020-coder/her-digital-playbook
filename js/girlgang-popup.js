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
import { BASE } from './base.js';

const DISMISSED_KEY = 'hdp-girlgang-popup-dismissed-session';
const SHOW_DELAY_MS = 1800; // "shortly after" the homepage loads, not instantly

function goToNewsletter() {
  const target = document.getElementById('newsletter');
  if (target) {
    // Already on the homepage — smooth-scroll, header-offset-aware.
    const header = document.querySelector('.header');
    const offset = (header ? header.offsetHeight : 0) + 16;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  } else {
    // On an article or static page — #newsletter doesn't exist here
    // at all, so this has to be a real navigation back to the
    // homepage's newsletter section, not a scroll attempt.
    window.location.href = `${BASE}index.html#newsletter`;
  }
}

export function initGirlGangPopup() {
  const overlay = document.getElementById('girlgang-popup-overlay');
  if (!overlay) return;

  // Never interrupt the trust pages, the 404 page or the invite page itself.
  const QUIET_PAGES = /^\/(pages\/(about|contact|privacy|terms|404|article)\.html|join-our-girl-gang(\.html)?)\/?$/;
  if (QUIET_PAGES.test(window.location.pathname)) { overlay.hidden = true; return; }

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

  cta?.addEventListener('click', (event) => {
    event.preventDefault();
    requestNotificationPermissionOnce();
    dismissForSession();
    goToNewsletter();
  });

  // Stop instantly and permanently the moment she subscribes,
  // even if the popup is already open in this same session.
  window.addEventListener('hdp:subscribed', hidePopup);

  // Homepage: a few seconds after the splash. Articles: only once the reader
  // is really reading (40% down the page, or one minute on it).
  function scheduleShow() {
    if (hasSplash) { window.setTimeout(showPopup, 8000); return; }
    let shown = false;
    const go = () => { if (shown) return; shown = true; window.removeEventListener('scroll', onScroll); showPopup(); };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.4) go();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.setTimeout(go, 60000);
  }

  // Only the homepage has a splash screen — article pages and static
  // pages (About, Contact, Privacy, Terms, 404) never load one, so
  // waiting for a 'hdp:splash-hidden' event on those pages would mean
  // waiting forever for something that will never fire. Checking for
  // the placeholder's existence tells us which situation we're in.
  const hasSplash = !!document.getElementById('splash-placeholder');

  if (!hasSplash || window.__hdpSplashHidden) {
    scheduleShow();
  } else {
    window.addEventListener('hdp:splash-hidden', scheduleShow, { once: true });
  }
}
