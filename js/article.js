/* =============================================
   ARTICLE.JS
   Powers /pages/article.html?id=<id> — the shared detail
   page for every Featured Story, Latest Article, and Free
   Tool. Reads the id carried in the URL's query string,
   looks it up in data/store.js, and renders its full
   properties (image, title, category, body, etc). Tools get
   a live interactive widget from js/tools.js when one exists.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { findItemById } from '../data/store.js';
import { rewriteRootLinks } from './base.js';
import { renderTool } from './tools.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';

// Turns the lightweight markup used in data/store.js into real HTML:
//   "## Heading"        -> subhead
//   "- one\n- two"      -> bullet list
//   "**bold**"          -> <strong>bold</strong> (works inside any block)
//   "💖 Big Sis..."     -> Big Sis Advice callout
//   "👀 Reality..."     -> Reality Check callout
//   "✨ Hidden..."       -> Hidden Opportunity callout
//   "🚀 Next..."        -> Next Challenge callout
//   anything else        -> plain paragraph
const CALLOUTS = {
  '💖': 'callout-bigsis',
  '👀': 'callout-reality',
  '✨': 'callout-hidden',
  '🚀': 'callout-challenge',
};

function applyBold(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function formatArticleBody(content) {
  const blocks = content.split('\n\n');
  return blocks
    .map((block) => {
      const trimmed = block.trim();

      if (trimmed.startsWith('## ')) {
        return `<h2 class="article-h2">${applyBold(trimmed.slice(3))}</h2>`;
      }

      if (trimmed.startsWith('- ')) {
        const items = trimmed
          .split('\n')
          .map((line) => line.replace(/^-\s*/, '').trim())
          .filter(Boolean);
        return `<ul class="article-list">${items.map((i) => `<li>${applyBold(i)}</li>`).join('')}</ul>`;
      }

      const calloutClass = CALLOUTS[[...trimmed][0]];
      if (calloutClass) {
        return `<div class="big-sis-box ${calloutClass}">${applyBold(trimmed)}</div>`;
      }

      return `<p>${applyBold(trimmed)}</p>`;
    })
    .join('');
}

async function init() {
  await Promise.all([
    loadComponent('header-placeholder', '../components/header.html'),
    loadComponent('footer-placeholder', '../components/footer.html'),
  ]);
  await loadComponent('nav-placeholder', '../components/nav.html');
  rewriteRootLinks(document);
  initNav();
  initSearch();

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
        <a class="btn btn-primary mt-lg" href="../index.html">Back to Home</a>
      </div>`;
    return;
  }

  document.title = `${item.title} — Her Digital Playbook`;

  const isTool = item.type === 'tool';
  const backHref = isTool ? '../index.html#tools' : '../index.html#articles';
  const paragraphs = formatArticleBody(item.content);

  container.innerHTML = `
    <a class="back-link" href="${backHref}">← Back</a>
    <span class="card-category card-category-static">${item.category}</span>
    <h1 class="article-title">${item.title}</h1>
    ${item.readTime ? `<p class="read-time">${item.readTime}</p>` : ''}
    <div class="article-hero-img"><img src="${item.image}" alt="${item.title}"></div>
    <div class="article-body">${paragraphs}</div>
    ${isTool ? '<div id="tool-container" class="mt-lg"></div>' : ''}
  `;

  if (isTool) {
    const toolContainer = document.getElementById('tool-container');
    const rendered = renderTool(item.id, toolContainer);
    if (!rendered) {
      toolContainer.innerHTML = `<p class="section-sub">This tool is coming soon — check back shortly!</p>`;
    }
  }

  optimizeImages(document);
}

document.addEventListener('DOMContentLoaded', init);
   
