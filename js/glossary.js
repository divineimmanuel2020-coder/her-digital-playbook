/* =============================================
   JS/GLOSSARY.JS
   Drives /pages/glossary.html. Client-side instant search over
   the full GLOSSARY array — search text, category, and starting
   letter all combine (AND) so the three filter types work
   together rather than overriding each other.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initGirlGangPopup } from './girlgang-popup.js';
import { maybeShowJoinReminder } from './notifications.js';
import { GLOSSARY } from '../data/playground.js';
import { findItemById } from '../data/store.js';
import { pgGrantXP, pgMarkDone, pgHasDone, pgCheckQueenBadge } from './playground.js';

const gaEvent = (name, params = {}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };

const searchInput = document.getElementById('glossary-search-input');
const filterRoot = document.getElementById('glossary-category-filters');
const letterRoot = document.getElementById('glossary-letter-filters');
const countRoot = document.getElementById('glossary-count');
const gridRoot = document.getElementById('glossary-grid');

const CATEGORIES = ['All', ...new Set(GLOSSARY.map((g) => g.category))];
const LETTERS = [...new Set(GLOSSARY.map((g) => g.term[0].toUpperCase()))].sort();

let state = { query: '', category: 'All', letter: 'All' };
let searchDebounce;

function bySlug(term) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function matches(entry) {
  if (state.category !== 'All' && entry.category !== state.category) return false;
  if (state.letter !== 'All' && entry.term[0].toUpperCase() !== state.letter) return false;
  if (state.query) {
    const q = state.query.toLowerCase();
    return entry.term.toLowerCase().includes(q) || entry.def.toLowerCase().includes(q) || entry.girlie.toLowerCase().includes(q);
  }
  return true;
}

function learnMoreHref(link) {
  if (link.id) {
    const item = findItemById(link.id);
    return item ? `/pages/article.html?id=${item.id}` : null;
  }
  return link.href || null;
}

function renderFilters() {
  filterRoot.innerHTML = CATEGORIES.map((c) => `<button class="pg-filter-pill ${c === state.category ? 'active' : ''}" data-cat="${c}" type="button">${c}</button>`).join('');
  filterRoot.querySelectorAll('.pg-filter-pill').forEach((btn) => {
    btn.addEventListener('click', () => { state.category = btn.dataset.cat; renderFilters(); renderGrid(); });
  });

  letterRoot.innerHTML = ['All', ...LETTERS].map((l) => `<button class="pg-filter-pill ${l === state.letter ? 'active' : ''}" data-letter="${l}" type="button">${l}</button>`).join('');
  letterRoot.querySelectorAll('.pg-filter-pill').forEach((btn) => {
    btn.addEventListener('click', () => { state.letter = btn.dataset.letter; renderFilters(); renderGrid(); });
  });
}

function markExplored() {
  if (!pgHasDone('glossary-explored')) {
    pgMarkDone('glossary-explored');
    pgGrantXP(10, { badgeId: 'digital-dictionary' });
    pgCheckQueenBadge();
  }
}

function renderGrid() {
  const results = GLOSSARY.filter(matches);
  countRoot.textContent = `${results.length} term${results.length === 1 ? '' : 's'}`;

  if (!results.length) {
    gridRoot.innerHTML = `<p class="pg-empty-state">Hmm… we couldn't find that one yet. 💗</p>`;
    return;
  }

  gridRoot.innerHTML = results.map((entry) => `
    <div class="pg-term-card" id="term-${bySlug(entry.term)}" data-term="${entry.term}">
      <p class="pg-term-cat">${entry.category}</p>
      <h3>${entry.term} <span>+</span></h3>
      <p class="pg-term-def">${entry.def}</p>
      <div class="pg-term-body">
        <p><strong>Girlie translation:</strong> ${entry.girlie}</p>
        <p><strong>Example:</strong> ${entry.example}</p>
        <p><strong>Why it matters:</strong> ${entry.why}</p>
        ${entry.related?.length ? `<div class="pg-term-related">${entry.related.map((r) => `<button type="button" data-jump="${bySlug(r)}">${r}</button>`).join('')}</div>` : ''}
        ${entry.learn?.length ? `<div class="pg-term-related">${entry.learn.map((l) => {
          const href = learnMoreHref(l);
          return href ? `<a href="${href}">📖 ${l.label}</a>` : '';
        }).join('')}</div>` : ''}
      </div>
    </div>`).join('');
  rewriteRootLinks(gridRoot);

  gridRoot.querySelectorAll('.pg-term-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-jump]') || e.target.closest('a')) return;
      card.classList.toggle('open');
      if (card.classList.contains('open')) markExplored();
    });
  });
  gridRoot.querySelectorAll('[data-jump]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.query = '';
      state.category = 'All';
      state.letter = 'All';
      searchInput.value = '';
      renderFilters();
      renderGrid();
      const target = document.getElementById(`term-${btn.dataset.jump}`);
      if (target) {
        target.classList.add('open');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        markExplored();
      }
    });
  });
}

async function init() {
  await Promise.all([
    loadComponent('header-placeholder', '../components/header.html'),
    loadComponent('footer-placeholder', '../components/footer.html'),
    loadComponent('girlgang-popup-placeholder', '../components/girlgang-popup.html'),
  ]);
  await loadComponent('nav-placeholder', '../components/nav.html');
  rewriteRootLinks(document);
  initNav();
  initSearch();
  optimizeImages(document);
  initGirlGangPopup();
  maybeShowJoinReminder();

  renderFilters();
  renderGrid();

  searchInput.addEventListener('input', () => {
    state.query = searchInput.value.trim();
    renderGrid();
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      if (state.query) gaEvent('glossary_search', { query: state.query });
    }, 600);
  });
}

document.addEventListener('DOMContentLoaded', init);
