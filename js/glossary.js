/* =============================================
   JS/GLOSSARY.JS
   Drives /pages/glossary.html. Client-side instant search over
   the full GLOSSARY array. Search text, category and starting letter
   combine (AND). Search ranks term matches above definition matches and
   also reads examples and related terms. Entries are real buttons
   (keyboard and screen-reader friendly), can be deep-linked with
   ?term=Name or #term-slug, and each one points to a relevant place to
   practise it (rules in PRACTICE below).
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
import { itemPath } from './routes.js';
import { pgGrantXP, pgMarkDone, pgHasDone, pgCheckQueenBadge } from './playground.js';

const gaEvent = (name, params = {}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };

const searchInput = document.getElementById('glossary-search-input');
const filterRoot = document.getElementById('glossary-category-filters');
const letterRoot = document.getElementById('glossary-letter-filters');
const countRoot = document.getElementById('glossary-count');
const gridRoot = document.getElementById('glossary-grid');

const CATEGORIES = ['All', ...new Set(GLOSSARY.map((g) => g.category))];
const LETTERS = [...new Set(GLOSSARY.map((g) => g.term[0].toUpperCase()))].sort();

const DEFAULT_STATE = { query: '', category: 'All', letter: 'All' };
let state = { ...DEFAULT_STATE };
let returnPoint = null; // where "Back" goes after jumping to a related term
let searchDebounce;

function bySlug(term) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/* ---- search: every word must appear somewhere; where it appears sets the rank ---- */
function scoreEntry(entry, words) {
  const term = entry.term.toLowerCase();
  let total = 0;
  for (const w of words) {
    let best = 0;
    if (term === w) best = 100;
    else if (term.startsWith(w)) best = 80;
    else if (term.includes(w)) best = 60;
    else if ((entry.related || []).some((r) => r.toLowerCase().includes(w))) best = 30;
    else if (`${entry.def} ${entry.girlie} ${entry.example} ${entry.why}`.toLowerCase().includes(w)) best = 10;
    if (!best) return 0; // a word with no match anywhere rules the entry out
    total += best;
  }
  return total;
}

function results() {
  const filtered = GLOSSARY.filter((e) => (state.category === 'All' || e.category === state.category)
    && (state.letter === 'All' || e.term[0].toUpperCase() === state.letter));
  const words = state.query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return filtered;
  return filtered
    .map((entry) => ({ entry, score: scoreEntry(entry, words) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.term.localeCompare(b.entry.term))
    .map((r) => r.entry);
}

function learnMoreHref(link) {
  if (link.id) {
    const item = findItemById(link.id);
    return item ? itemPath(item) : null;
  }
  return link.href || null;
}

/* ---- where to practise a term: the first rule that matches wins (max 2 links) ---- */
const tpl = (id, label) => ({ label, href: `/pages/templates.html#${id}` });
const game = (id, label) => ({ label, href: `/pages/game-room.html?game=${id}` });
const tool = (id, label) => { const item = findItemById(id); return item ? { label, href: itemPath(item) } : null; };
const SIM = { label: 'Practise in the Client Simulator', href: '/pages/client-simulator.html' };

const PRACTICE = [
  { test: (e) => /scope of work|revision/i.test(e.term), links: () => [SIM, tpl('scope-of-work-checklist', 'Use the Scope of Work Checklist')] },
  { test: (e) => /proposal|milestone/i.test(e.term), links: () => [SIM, tpl('freelance-proposal-structure', 'Use the Proposal Structure')] },
  { test: (e) => /invoice|deposit/i.test(e.term), links: () => [SIM, tpl('payment-reminder-template', 'Use the Payment Reminder')] },
  { test: (e) => /client acquisition/i.test(e.term), links: () => [tpl('client-outreach-template', 'Use the Client Outreach Template'), SIM] },
  { test: (e) => e.category === 'Freelancing', links: () => [SIM, game('red-flag', 'Play Client or Red Flag?')] },
  { test: (e) => /budget|cash flow|expense|emergency fund/i.test(e.term), links: () => [tpl('monthly-money-check-in', 'Use the Monthly Money Check-In'), game('money-moves', 'Play Money Moves')] },
  { test: (e) => /income|revenue|profit/i.test(e.term), links: () => [tpl('income-tracker', 'Use the Income Tracker'), game('money-moves', 'Play Money Moves')] },
  { test: (e) => e.category === 'Money', links: () => [game('money-moves', 'Play Money Moves')] },
  { test: (e) => /cta/i.test(e.term), links: () => [tpl('caption-planning-template', 'Use the Caption Planning Template')] },
  { test: (e) => /content|engagement|social media/i.test(e.term), links: () => [tpl('30-day-content-planner', 'Use the 30-Day Content Planner')] },
  { test: (e) => /offer|niche/i.test(e.term), links: () => [tpl('offer-builder', 'Use the Offer Builder')] },
  { test: (e) => /audience|persona/i.test(e.term), links: () => [tpl('customer-research-worksheet', 'Use the Customer Research Worksheet')] },
  { test: (e) => /digital product|lead magnet/i.test(e.term), links: () => [tpl('digital-product-planner', 'Use the Digital Product Planner')] },
  { test: (e) => /resume|applicant tracking/i.test(e.term), links: () => [tool('resume-review-checklist', 'Run the Resume Review Checklist'), tpl('job-application-tracker', 'Use the Job Application Tracker')] },
  { test: (e) => /branding|networking/i.test(e.term), links: () => [tpl('linkedin-profile-checklist', 'Use the LinkedIn Profile Checklist')] },
  { test: (e) => e.category === 'Career', links: () => [tpl('career-planning-worksheet', 'Use the Career Planning Worksheet')] },
  { test: (e) => /prompt|generative ai/i.test(e.term), links: () => [tool('ai-prompt-builder', 'Try the AI Prompt Builder')] },
  { test: (e) => e.category === 'AI' || e.category === 'Website / Tech', links: () => [game('skill-match', 'Play Skill Match')] },
  { test: (e) => e.category === 'Digital Business' || e.category === 'Marketing' || e.category === 'Creator Economy', links: () => [{ label: 'Explore directions in Money Path', href: '/pages/money-path.html' }] },
];

function practiceLinks(entry) {
  const rule = PRACTICE.find((r) => r.test(entry));
  return rule ? rule.links().filter(Boolean).slice(0, 2) : [];
}

/* ---- filters ---- */
function renderFilters() {
  filterRoot.innerHTML = CATEGORIES.map((c) => `<button class="pg-filter-pill ${c === state.category ? 'active' : ''}" data-cat="${c}" type="button" aria-pressed="${c === state.category}">${c}</button>`).join('');
  filterRoot.querySelectorAll('.pg-filter-pill').forEach((btn) => {
    btn.addEventListener('click', () => { state.category = btn.dataset.cat; returnPoint = null; renderFilters(); renderGrid(); });
  });

  letterRoot.innerHTML = ['All', ...LETTERS].map((l) => `<button class="pg-filter-pill ${l === state.letter ? 'active' : ''}" data-letter="${l}" type="button" aria-pressed="${l === state.letter}">${l}</button>`).join('');
  letterRoot.querySelectorAll('.pg-filter-pill').forEach((btn) => {
    btn.addEventListener('click', () => { state.letter = btn.dataset.letter; returnPoint = null; renderFilters(); renderGrid(); });
  });
}

function markExplored() {
  if (!pgHasDone('glossary-explored')) {
    pgMarkDone('glossary-explored');
    pgGrantXP(10, { badgeId: 'digital-dictionary' });
    pgCheckQueenBadge();
  }
}

function resetFilters() {
  state = { ...DEFAULT_STATE };
  searchInput.value = '';
}

function openCard(card, open) {
  card.classList.toggle('open', open);
  const toggle = card.querySelector('.pg-term-toggle');
  if (toggle) toggle.setAttribute('aria-expanded', String(open));
  if (open) markExplored();
}

/* Jump to a term from anywhere (related-term chip, ?term=, #hash). */
function showTerm(slug, { remember = false } = {}) {
  if (remember) returnPoint = { state: { ...state }, y: window.scrollY };
  resetFilters();
  renderFilters();
  renderGrid();
  const target = document.getElementById(`term-${slug}`);
  if (!target) return false;
  openCard(target, true);
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  target.querySelector('.pg-term-toggle')?.focus({ preventScroll: true });
  return true;
}

function renderCount(list) {
  const filtersOn = state.query || state.category !== 'All' || state.letter !== 'All';
  countRoot.innerHTML = `<span>${list.length} term${list.length === 1 ? '' : 's'}</span>`
    + (returnPoint ? ' <button class="pg-link-button" id="gl-back" type="button">← Back to where I was</button>' : '')
    + (filtersOn ? ' <button class="pg-link-button" id="gl-clear" type="button">Clear search and filters</button>' : '');
  document.getElementById('gl-clear')?.addEventListener('click', () => { returnPoint = null; resetFilters(); renderFilters(); renderGrid(); searchInput.focus(); });
  document.getElementById('gl-back')?.addEventListener('click', () => {
    const point = returnPoint; returnPoint = null;
    state = { ...point.state }; searchInput.value = state.query;
    renderFilters(); renderGrid(); window.scrollTo({ top: point.y });
  });
}

function renderGrid() {
  const list = results();
  countRoot.setAttribute('aria-live', 'polite');
  renderCount(list);

  if (!list.length) {
    gridRoot.innerHTML = '<p class="pg-empty-state">Hmm… we couldn\'t find that one yet. 💗 Try a shorter word, or clear the filters.</p>';
    return;
  }

  gridRoot.innerHTML = list.map((entry) => {
    const slug = bySlug(entry.term);
    const practice = practiceLinks(entry);
    return `
    <div class="pg-term-card" id="term-${slug}" data-term="${entry.term}">
      <p class="pg-term-cat">${entry.category}</p>
      <h3><button class="pg-term-toggle" type="button" aria-expanded="false" aria-controls="body-${slug}">${entry.term} <span aria-hidden="true">+</span></button></h3>
      <p class="pg-term-def">${entry.def}</p>
      <div class="pg-term-body" id="body-${slug}">
        <p><strong>Girlie translation:</strong> ${entry.girlie}</p>
        <p><strong>Example:</strong> ${entry.example}</p>
        <p><strong>Why it matters:</strong> ${entry.why}</p>
        ${entry.related?.length ? `<div class="pg-term-related"><span class="pgh-sr">Related terms:</span>${entry.related.map((r) => `<button type="button" data-jump="${bySlug(r)}">${r}</button>`).join('')}</div>` : ''}
        ${practice.length ? `<div class="pg-term-related">${practice.map((l) => `<a href="${l.href}">🎯 ${l.label}</a>`).join('')}</div>` : ''}
        ${entry.learn?.length ? `<div class="pg-term-related">${entry.learn.map((l) => {
          const href = learnMoreHref(l);
          return href ? `<a href="${href}">📖 ${l.label}</a>` : '';
        }).join('')}</div>` : ''}
      </div>
    </div>`;
  }).join('');
  rewriteRootLinks(gridRoot);

  gridRoot.querySelectorAll('.pg-term-card').forEach((card) => {
    // The heading button is the keyboard control; clicking elsewhere on the card still works with a mouse.
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-jump]') || e.target.closest('a')) return;
      openCard(card, !card.classList.contains('open'));
    });
  });
  gridRoot.querySelectorAll('[data-jump]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showTerm(btn.dataset.jump, { remember: true });
    });
  });
}

function openFromUrl() {
  const params = new URLSearchParams(location.search);
  const wanted = params.get('term');
  const slug = wanted ? bySlug(wanted) : location.hash.startsWith('#term-') ? location.hash.slice(6) : '';
  if (slug && GLOSSARY.some((g) => bySlug(g.term) === slug)) showTerm(slug);
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

  searchInput.setAttribute('aria-label', 'Search the glossary');
  searchInput.setAttribute('type', 'search');

  renderFilters();
  renderGrid();
  openFromUrl();
  window.addEventListener('hashchange', openFromUrl);

  searchInput.addEventListener('input', () => {
    state.query = searchInput.value.trim();
    returnPoint = null;
    renderGrid();
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      if (state.query) gaEvent('glossary_search', { query: state.query });
    }, 600);
  });
}

document.addEventListener('DOMContentLoaded', init);
