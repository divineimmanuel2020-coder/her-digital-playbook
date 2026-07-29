/* =============================================
   MAIN.JS
   Orchestrates the homepage: loads every component and
   section into its placeholder, then renders the cards
   and wires up the splash/nav/newsletter interactions.
   ============================================= */

import { loadComponent } from '/js/include.js';
import { initSplash } from '/js/splash.js';
import { initNav } from '/js/nav.js';
import { renderFeatured, renderCategories, renderLatest, renderTools } from '/js/render.js';

async function init() {
  await Promise.all([
    loadComponent('splash-placeholder', '/components/splash.html'),
    loadComponent('header-placeholder', '/components/header.html'),
    loadComponent('hero-placeholder', '/sections/hero.html'),
    loadComponent('featured-placeholder', '/sections/featured-stories.html'),
    loadComponent('categories-placeholder', '/sections/categories.html'),
    loadComponent('latest-placeholder', '/sections/latest-articles.html'),
    loadComponent('tools-placeholder', '/sections/free-tools.html'),
    loadComponent('newsletter-placeholder', '/sections/newsletter.html'),
    loadComponent('footer-placeholder', '/components/footer.html'),
    loadComponent('card-templates-placeholder', '/components/card-template.html'),
  ]);

  // nav.html injects into a placeholder that only exists once header.html
  // has landed in the DOM, so it's loaded as its own step right after.
  await loadComponent('nav-placeholder', '/components/nav.html');

  initSplash();
  initNav();

  renderFeatured();
  renderCategories((category) => renderLatest(category));
  renderLatest();
  renderTools();

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
  
