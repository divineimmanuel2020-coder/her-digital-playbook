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

/* =============================================
   HEADER-AWARE IN-PAGE SCROLLING
   The site header is sticky, so a plain scrollIntoView/anchor
   jump lands the target's top edge right where the header then
   slides back over it — which looks exactly like "the link does
   nothing." This measures the header's REAL height at the moment
   of the click (not a hardcoded number) and scrolls with that
   offset baked in, so it works no matter what.
   ============================================= */
function scrollToSectionId(id) {
  const target = document.getElementById(id);
  if (!target) return false;
  const header = document.querySelector('.header');
  const offset = (header ? header.offsetHeight : 0) + 16;
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
  return true;
}

function initInPageAnchorScrolling() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href').slice(1);
    if (!id) return;
    if (scrollToSectionId(id)) {
      event.preventDefault();
      history.pushState(null, '', `#${id}`);
    }
  });
}

/* =============================================
   HERO TYPEWRITER EFFECT
   Fast, plays once when the hero loads, respects
   prefers-reduced-motion by just showing the full text instantly.
   ============================================= */
function initHeroTypewriter() {
  const el = document.getElementById('hero-typewriter');
  if (!el) return;
  const fullText = el.dataset.typewriter || el.textContent;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    el.textContent = fullText;
    return;
  }

  el.textContent = '';
  el.classList.add('typewriter-active');
  let i = 0;
  const speed = 12; // fast — ms per character

  function typeNext() {
    if (i <= fullText.length) {
      el.textContent = fullText.slice(0, i);
      i += 1;
      window.setTimeout(typeNext, speed);
    } else {
      el.classList.remove('typewriter-active');
    }
  }

  typeNext();
}

async function init() {
  // Works immediately — uses event delegation, so it correctly
  // handles the hero buttons, nav links, and any other in-page
  // anchor even though those elements haven't loaded yet.
  initInPageAnchorScrolling();

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
  initHeroTypewriter();

  renderFeatured();
  renderCategories((category) => {
    renderLatest(category);
    scrollToSectionId('articles');
  });
  renderLatest();
  renderTools();

  optimizeImages(document);
  initNewsletter();
}

document.addEventListener('DOMContentLoaded', init);
     
