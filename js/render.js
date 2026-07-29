/* =============================================
   RENDER.JS
   Maps data/store.js into the card templates from
   components/card-template.html, and injects the result
   into the homepage grids. This is the "mapping" layer —
   nothing here is hardcoded HTML.
   ============================================= */

import { CATEGORIES, FEATURED_STORIES, LATEST_ARTICLES, FREE_TOOLS } from '/data/store.js';

function cloneCard(templateId) {
  const tpl = document.getElementById(templateId);
  if (!tpl) {
    console.error(`[render] missing template #${templateId} — is card-template.html loaded?`);
    return null;
  }
  return tpl.content.firstElementChild.cloneNode(true);
}

function fillStoryCard(item) {
  const card = cloneCard('tpl-story-card');
  if (!card) return null;

  const detailUrl = `/pages/article.html?id=${item.id}`;
  const img = card.querySelector('img');
  img.src = item.image;
  img.alt = item.title;
  card.querySelector('.card-img-link').href = detailUrl;
  card.querySelector('.card-category').textContent = item.category;
  card.querySelector('.card-title').textContent = item.title;
  card.querySelector('.card-desc').textContent = item.excerpt;
  card.querySelector('.read-time').textContent = item.readTime || '';
  card.querySelector('.read-more').href = detailUrl;
  return card;
}

function fillToolCard(item) {
  const card = cloneCard('tpl-tool-card');
  if (!card) return null;

  const detailUrl = `/pages/article.html?id=${item.id}`;
  const img = card.querySelector('img');
  img.src = item.image;
  img.alt = item.title;
  card.querySelector('.card-img-link').href = detailUrl;
  card.querySelector('.card-title').textContent = item.title;
  card.querySelector('.card-desc').textContent = item.excerpt;
  card.querySelector('.btn-tool').href = detailUrl;
  return card;
}

export function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  FEATURED_STORIES.forEach((item) => {
    const card = fillStoryCard(item);
    if (card) grid.appendChild(card);
  });
}

export function renderCategories(onSelect) {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const allPill = document.createElement('button');
  allPill.type = 'button';
  allPill.className = 'category-pill active';
  allPill.dataset.category = 'all';
  allPill.innerHTML = '<span class="category-icon">✦</span><span class="category-label">All</span>';
  grid.appendChild(allPill);

  CATEGORIES.forEach((cat) => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'category-pill';
    pill.dataset.category = cat.label;
    pill.innerHTML = `<span class="category-icon">${cat.icon}</span><span class="category-label">${cat.label}</span>`;
    grid.appendChild(pill);
  });

  grid.querySelectorAll('.category-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      grid.querySelectorAll('.category-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      onSelect(pill.dataset.category);
    });
  });
}

export function renderLatest(filterCategory = 'all') {
  const grid = document.getElementById('latest-grid');
  const sub = document.getElementById('latest-sub');
  if (!grid) return;

  grid.innerHTML = '';
  const items = filterCategory === 'all'
    ? LATEST_ARTICLES
    : LATEST_ARTICLES.filter((a) => a.category === filterCategory);

  if (sub) {
    sub.textContent = filterCategory === 'all'
      ? 'Fresh reads from the Playbook'
      : `Showing articles in ${filterCategory}`;
  }

  if (items.length === 0) {
    grid.innerHTML = '<p class="section-sub">No articles here yet — check back soon!</p>';
    return;
  }

  items.forEach((item) => {
    const card = fillStoryCard(item);
    if (card) grid.appendChild(card);
  });
}

export function renderTools() {
  const grid = document.getElementById('tools-grid');
  if (!grid) return;
  FREE_TOOLS.forEach((item) => {
    const card = fillToolCard(item);
    if (card) grid.appendChild(card);
  });
}
