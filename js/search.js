/* =============================================
   SEARCH.JS
   Powers the search icon in the header: opens an overlay,
   live-filters data/store.js's ALL_ITEMS by title/category,
   and links each result to its real detail page.
   ============================================= */

import { ALL_ITEMS } from '../data/store.js';
import { PLAYGROUND_PAGES } from '../data/playground.js';
import { ACADEMY_COURSES } from '../data/academy.js';
import { BASE } from './base.js';

const ACADEMY_SEARCH_ITEMS = ACADEMY_COURSES.map((c) => ({
  id: c.id, title: c.title, category: c.category, icon: '🎓', url: `/pages/course.html?id=${c.id}`,
}));

const SEARCHABLE_ITEMS = [...ALL_ITEMS, ...PLAYGROUND_PAGES, ...ACADEMY_SEARCH_ITEMS];

export function initSearch() {
  const btn = document.getElementById('search-btn');
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const closeBtn = document.getElementById('search-close');
  const results = document.getElementById('search-results');
  if (!btn || !overlay || !input || !results) return;

  function open() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => input.focus(), 50);
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      results.innerHTML = '<p class="search-hint">Start typing to search everything on Her Digital Playbook.</p>';
      return;
    }

    const matches = SEARCHABLE_ITEMS.filter((item) =>
      item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      results.innerHTML = `<p class="search-hint">No results for "${query}" — try a different word.</p>`;
      return;
    }

    results.innerHTML = matches
      .slice(0, 8)
      .map((item) => {
        const href = item.url ? `${BASE}${item.url.replace(/^\//, '')}` : `${BASE}pages/article.html?id=${item.id}`;
        const thumb = item.image
          ? `<img src="${item.image}" alt="">`
          : `<span class="search-result-icon">${item.icon || '🎀'}</span>`;
        return `
        <a class="search-result" href="${href}">
          ${thumb}
          <span>
            <strong>${item.title}</strong>
            <em>${item.category}</em>
          </span>
        </a>`;
      })
      .join('');
  }

  btn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
  input.addEventListener('input', () => renderResults(input.value));
}
  
