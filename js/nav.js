/* =============================================
   NAV.JS
   - Slide-in menu (drawer): open / close, focus, Esc, backdrop
   - Smart header: stays reachable everywhere. It tucks away while
     you read down the page and comes back the moment you reach for
     it (scroll up, touch the top edge, tap the little tab, or reach
     the end of the page).
   - Reading progress bar on articles
   - Remembers where you stopped reading (see resume.js)
   Every page already calls initNav(), so all of this works site-wide.
   ============================================= */

import { initResume } from './resume.js';

const root = document.documentElement;
const byId = (id) => document.getElementById(id);

let overlayOpen = false; // menu or search is open: keep the header put

export function initNav() {
  if (window.__hdpNavReady) return;
  window.__hdpNavReady = true;
  initDrawer();
  initHeaderBehaviour();
  initProgress();
  initResume();
}

/* ---------- menu drawer ---------- */

function initDrawer() {
  const burger = byId('hamburger');
  const drawer = byId('site-drawer');
  const backdrop = byId('drawer-backdrop');
  const closeBtn = byId('drawer-close');
  if (!burger || !drawer) return;

  let lastFocus = null;

  function setOpen(open) {
    drawer.classList.toggle('open', open);
    if (backdrop) backdrop.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.setAttribute('aria-hidden', String(!open));
    root.classList.toggle('hdr-lock', open);
    overlayOpen = open || isSearchOpen();
    window.dispatchEvent(new CustomEvent('hdr:overlay'));
    if (open) {
      lastFocus = document.activeElement;
      window.setTimeout(() => closeBtn && closeBtn.focus({ preventScroll: true }), 60);
    } else if (lastFocus && lastFocus.focus) {
      lastFocus.focus({ preventScroll: true });
      lastFocus = null;
    }
  }

  burger.addEventListener('click', () => setOpen(!drawer.classList.contains('open')));
  if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));
  if (backdrop) backdrop.addEventListener('click', () => setOpen(false));
  drawer.addEventListener('click', (e) => {
    if (e.target.closest('a[href]')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (!drawer.classList.contains('open')) return;
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'Tab') { // keep keyboard focus inside the open menu
      const items = [...drawer.querySelectorAll('a[href], button')].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Highlight the page you are on (page links only, not in-page anchors).
  const here = cleanPath(location.pathname);
  drawer.querySelectorAll('#nav-list a[data-nav]').forEach((a) => {
    const href = a.getAttribute('href') || '';
    if (href.includes('#')) return;
    let path = '';
    try { path = cleanPath(new URL(href, location.href).pathname); } catch (_) { return; }
    if (path && path === here) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });
}

function cleanPath(p) {
  return (p || '').replace(/index\.html$/, '').replace(/\/$/, '') || '/';
}

function isSearchOpen() {
  const s = byId('search-overlay');
  return !!(s && s.classList.contains('open'));
}

/* Search tells the header when it opens / closes. */
window.addEventListener('hdr:search', () => {
  overlayOpen = isSearchOpen() || !!(byId('site-drawer') && byId('site-drawer').classList.contains('open'));
  window.dispatchEvent(new CustomEvent('hdr:overlay'));
});

/* ---------- smart header ---------- */

function initHeaderBehaviour() {
  const header = byId('site-header');
  if (!header) return;
  const peek = byId('hdr-peek');

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DOWN_TO_HIDE = 36;  // px scrolled down before the header tucks away
  const UP_TO_SHOW = 10;    // px scrolled up before it returns
  const TOP_ZONE = 24;      // always visible this close to the top
  const END_ZONE = 140;     // always visible this close to the end of the page

  let hidden = false;
  let lastY = window.scrollY;
  let travelled = 0;        // scroll distance in the current direction
  let ticking = false;
  let quietUntil = 0;       // ignore scroll while the page restores your place

  function setHidden(next) {
    if (next === hidden) return;
    hidden = next;
    header.classList.toggle('is-hidden', hidden);
    root.classList.toggle('hdr-hidden', hidden);
    if (peek) peek.setAttribute('aria-hidden', String(!hidden));
  }
  const show = () => { travelled = 0; setHidden(false); };

  function update() {
    ticking = false;
    const y = Math.max(0, window.scrollY);
    const dy = y - lastY;
    lastY = y;

    header.classList.toggle('is-stuck', y > 6);

    const doc = Math.max(document.body.scrollHeight, root.scrollHeight);
    const nearEnd = y + window.innerHeight >= doc - END_ZONE;

    if (overlayOpen || y <= TOP_ZONE || nearEnd) { show(); return; }
    if (performance.now() < quietUntil) return;

    if ((dy > 0) === (travelled > 0)) travelled += dy; else travelled = dy;

    if (travelled > DOWN_TO_HIDE) setHidden(true);
    else if (travelled < -UP_TO_SHOW) setHidden(false);
  }

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }, { passive: true });

  // Reaching for it brings it back: touch / hover the top edge, tap the tab, or focus into it.
  window.addEventListener('touchstart', (e) => {
    const t = e.touches && e.touches[0];
    if (t && t.clientY < 90) show();
  }, { passive: true });
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'mouse' && e.clientY < 56) show();
  }, { passive: true });
  header.addEventListener('focusin', show);
  if (peek) peek.addEventListener('click', show);
  window.addEventListener('hdr:overlay', () => { if (overlayOpen) show(); });
  window.addEventListener('hdr:restored', () => { quietUntil = performance.now() + 900; lastY = window.scrollY; travelled = 0; });
  window.addEventListener('resize', update, { passive: true });

  if (reduceMotion) header.classList.add('no-motion');
  update();
}

/* ---------- reading progress (articles only) ---------- */

function initProgress() {
  const bar = byId('hdr-progress');
  const body = document.querySelector('.article-body');
  if (!bar || !body) return;
  const fill = bar.firstElementChild;
  root.classList.add('has-progress');

  let ticking = false;
  function paint() {
    ticking = false;
    const rect = body.getBoundingClientRect();
    const total = rect.height - window.innerHeight * 0.6;
    const done = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    fill.style.transform = `scaleX(${done.toFixed(4)})`;
  }
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(paint);
  }, { passive: true });
  window.addEventListener('resize', paint, { passive: true });
  paint();
}
