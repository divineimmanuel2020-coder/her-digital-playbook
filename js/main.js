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

async function init() {
  await Promise.all([
    loadComponent('splash-placeholder', 'components/splash.html'),
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

  initSplash();
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

  const form = document.getElementById('newsletter-form');
  const note = document.getElementById('newsletter-note');
  if (form && note) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      note.textContent = "Yay — you're on the list! 🎉";
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
                          
