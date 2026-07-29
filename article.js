/* =============================================
   ARTICLE.JS
   Powers /pages/article.html?id=<id> — the shared detail
   page for every Featured Story, Latest Article, and Free
   Tool. Reads the id carried in the URL's query string,
   looks it up in data/store.js, and renders its full
   properties (image, title, category, body, etc).
   ============================================= */

import { loadComponent } from '/js/include.js';
import { initNav } from '/js/nav.js';
import { findItemById } from '/data/store.js';

async function init() {
  await Promise.all([
    loadComponent('header-placeholder', '/components/header.html'),
    loadComponent('footer-placeholder', '/components/footer.html'),
  ]);
  await loadComponent('nav-placeholder', '/components/nav.html');
  initNav();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const item = findItemById(id);
  const container = document.getElementById('article-content');
  if (!container) return;

  if (!item) {
    container.innerHTML = `
      <div class="article-empty">
        <h1 class="section-title">We couldn't find that page</h1>
        <p class="section-sub">It might have moved, or the link is off.</p>
        <a class="btn btn-primary mt-lg" href="/index.html">Back to Home</a>
      </div>`;
    return;
  }

  document.title = `${item.title} — Her Digital Playbook`;

  const isTool = item.type === 'tool';
  const backHref = isTool ? '/index.html#tools' : '/index.html#articles';
  const paragraphs = item.content
    .split('\n\n')
    .map((p) => `<p>${p}</p>`)
    .join('');

  container.innerHTML = `
    <a class="back-link" href="${backHref}">← Back</a>
    <span class="card-category">${item.category}</span>
    <h1 class="article-title">${item.title}</h1>
    ${item.readTime ? `<p class="read-time">${item.readTime}</p>` : ''}
    <div class="article-hero-img"><img src="${item.image}" alt="${item.title}"></div>
    <div class="article-body">${paragraphs}</div>
    ${isTool ? `<a class="btn btn-primary mt-lg" href="#">Try ${item.title}</a>` : ''}
  `;
}

document.addEventListener('DOMContentLoaded', init);
                                     
