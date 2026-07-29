/* =============================================
   STATIC-PAGE.JS
   Shared bootstrap for pages that don't need the data
   store — About, Contact, Privacy, Terms, 404. Loads the
   header + nav + footer and wires up nav interactions.
   ============================================= */

import { loadComponent } from '/js/include.js';
import { initNav } from '/js/nav.js';

async function init() {
  await Promise.all([
    loadComponent('header-placeholder', '/components/header.html'),
    loadComponent('footer-placeholder', '/components/footer.html'),
  ]);
  await loadComponent('nav-placeholder', '/components/nav.html');
  initNav();
}

document.addEventListener('DOMContentLoaded', init);
