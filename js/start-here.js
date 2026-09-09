/* =============================================
   JS/START-HERE.JS
   Drives /pages/start-here.html. Picking a pathway reveals its
   real recommendations (mixing existing articles/tools with
   Playground pages) plus a fixed "Your First 3 Moves" block to
   reduce overwhelm.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initGirlGangPopup } from './girlgang-popup.js';
import { maybeShowJoinReminder } from './notifications.js';
import { START_HERE_PATHS } from '../data/playground.js';
import { findItemById } from '../data/store.js';
import { articleHref } from './playground.js';

const pathGrid = document.getElementById('path-grid');
const detailRoot = document.getElementById('path-detail');

function recToCard(rec) {
  if (rec.articleId) {
    const item = findItemById(rec.articleId);
    if (!item) return '';
    return `<li><a href="${articleHref(item.id)}">${item.type === 'tool' ? '🧰' : '📖'} ${item.title}</a></li>`;
  }
  return `<li><a href="${rec.href}">${rec.icon || '🎀'} ${rec.title}</a></li>`;
}

function showPath(id) {
  const path = START_HERE_PATHS.find((p) => p.id === id);
  if (!path) return;
  document.querySelectorAll('.pg-path-card').forEach((c) => c.classList.toggle('active', c.dataset.path === id));
  detailRoot.hidden = false;
  detailRoot.innerHTML = `
    <h3>${path.icon} ${path.label}</h3>
    <p>${path.blurb}</p>
    <ul>${path.recommendations.map(recToCard).join('')}</ul>
    <div class="pg-first-moves">
      <h3>Your First 3 Moves 🎀</h3>
      <ol>
        <li>Choose one direction from the list above.</li>
        <li>Learn one useful skill from it this week.</li>
        <li>Take one small action — even a tiny one — before you close this tab.</li>
      </ol>
    </div>`;
  rewriteRootLinks(detailRoot);
  detailRoot.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function renderPaths() {
  pathGrid.innerHTML = START_HERE_PATHS.map((p) => `
    <button class="pg-path-card" data-path="${p.id}" type="button">
      <span class="pg-path-icon">${p.icon}</span>
      <strong>${p.label}</strong>
    </button>`).join('');
  pathGrid.querySelectorAll('.pg-path-card').forEach((btn) => {
    btn.addEventListener('click', () => showPath(btn.dataset.path));
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
  renderPaths();
}

document.addEventListener('DOMContentLoaded', init);
