/* =============================================
   JOIN-INVITE.JS
   Entry script for join-our-girl-gang.html — the clean, shareable
   URL for the "Join Our Girl Gang" newsletter section.

   This page is intentionally NOT a new site destination: it's the
   header, the same newsletter section that lives on the homepage,
   and the footer. No hero, no article grid, nothing else — so the
   Girl Gang section is the very first (and only) thing a visitor
   sees, with the rest of the site one nav click away.

   scripts/build.mjs already bakes the header and footer straight into
   this page's raw HTML (same as every /blog and /tools page), so a
   crawler that never runs JavaScript still sees the full page. The
   loadComponent calls below are only a safety net for a copy of this
   file saved without that build step.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initNewsletter } from './newsletter.js';

async function init() {
  await Promise.all([
    loadComponent('header-placeholder', 'components/header.html'),
    loadComponent('footer-placeholder', 'components/footer.html'),
  ]);
  await loadComponent('nav-placeholder', 'components/nav.html');
  rewriteRootLinks(document);
  initNav();
  initSearch();
  initNewsletter();
  optimizeImages(document);
}

document.addEventListener('DOMContentLoaded', init);
