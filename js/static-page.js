/* =============================================
   STATIC-PAGE.JS
   Shared bootstrap for pages that don't need the data
   store — About, Contact, Privacy, Terms, 404. Loads the
   header + nav + footer and wires up nav interactions.

   Paths here are relative to this script's callers, which
   all live one folder down in /pages/.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';

async function init() {
  await Promise.all([
    loadComponent('header-placeholder', '../components/header.html'),
    loadComponent('footer-placeholder', '../components/footer.html'),
  ]);
  await loadComponent('nav-placeholder', '../components/nav.html');

  // Fixes header/nav/footer links, and any other "/"-prefixed
  // link already present in this page's own markup (e.g. 404's
  // "Back to Home" link).
  rewriteRootLinks(document);

  initNav();
  initSearch();
}

document.addEventListener('DOMContentLoaded', init);
