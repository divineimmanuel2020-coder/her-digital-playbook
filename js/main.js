/* =============================================
   MAIN.JS
   Orchestrates the homepage: loads every component and
   section into its placeholder, then renders the cards
   and wires up the splash/nav/newsletter interactions.

   All fetch paths here are relative to index.html itself
   (which this script only ever runs from), so they resolve
   correctly under any deploy root automatically.
   ============================================= */

import { loadComponent } from './include.js';
import { initSplash } from './splash.js';
import { initNav } from './nav.js';
import { renderFeatured, renderCategories, renderLatest, renderTools } from './render.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initNewsletter } from './newsletter.js';

async function init() {
  // The splash must appear the instant the page opens — it can't
  // wait behind header/hero/sections/footer/etc. loading, so it's
  // fetched and initialized on its own, in parallel with everything
  // else below rather than inside that Promise.all.
  loadComponent('splash-placeholder', 'components/splash.html').then((ok) => {
    if (ok) initSplash();
  });

  await Promise.all([
    loadComponent('header-placeholder', 'components/header.html'),
    loadComponent('hero-placeholder', 'sections/hero.html'),
    loadComponent('featured-placeholder', 'sections/featured-stories.html'),
    loadComponent('categories-placeholder', 'sections/categories.html'),
    loadComponent('latest-placeholder', 'sections/latest-articles.html'),
    loadComponent('tools-placeholder', 'sections/free-tools.html'),
    loadComponent('newsletter-placeholder', 'sections/newsletter.html'),
    loadComponent('footer-placeholder', 'components/footer.html'),
    loadComponent('card-templates-placeholder', 'components/card-template.html'),
  ]);

  // nav.html injects into a placeholder that only exists once
  // header.html has landed in the DOM, so it's its own step.
  await loadComponent('nav-placeholder', 'components/nav.html');

  // Fix up the "/"-prefixed links inside header/nav/footer BEFORE
  // nav.js reads them for active-link highlighting.
  rewriteRootLinks(document);

  initNav();
  initSearch();

  renderFeatured();
  renderCategories((category) => {
    renderLatest(category);
    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  renderLatest();
  renderTools();

  optimizeImages(document);
  initNewsletter();
}

document.addEventListener('DOMContentLoaded', init);
   
