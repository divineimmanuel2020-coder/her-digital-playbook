/* =============================================
   SEARCH.JS
   The search sheet behind the magnifier in the header.
   - Searches titles, categories, summaries AND the full text of every
     guide and tool, ranked by how well they match
   - Tabs (All / Articles / Tools / Playground) with live counts
   - Shows the matching words highlighted, with a short snippet
   - Empty state: recent searches, ideas to try, popular reads, free tools
   - Keyboard friendly: "/" or Ctrl/Cmd+K opens, arrows move, Enter opens, Esc closes
   ============================================= */

import { ALL_ITEMS, LATEST_ARTICLES, FREE_TOOLS } from '../data/store.js';
import { PLAYGROUND_PAGES } from '../data/playground.js';
import { BASE } from './base.js';
import { itemPath } from './routes.js';
import { readingTime } from './feed-utils.js';

const root = document.documentElement;
const RECENT_KEY = 'hdp-recent-searches';
const IDEAS = ['make money online', 'freelancing', 'passive income', 'digital skills', 'budget', 'ChatGPT'];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const recent = {
  get() { try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch (_) { return []; } },
  add(q) {
    q = q.trim();
    if (q.length < 2) return;
    try {
      const list = [q, ...recent.get().filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, 5);
      localStorage.setItem(RECENT_KEY, JSON.stringify(list));
    } catch (_) { /* storage blocked */ }
  },
  clear() { try { localStorage.removeItem(RECENT_KEY); } catch (_) { /* storage blocked */ } },
};

/* ---------- the searchable index (built the first time search opens) ---------- */

let DOCS = null;

function plain(text) {
  return String(text || '')
    .replace(/%%[A-Z]+[^\n]*/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`>|~\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildIndex() {
  if (DOCS) return DOCS;
  const makeUrl = (item) => (item.url ? `${BASE}${item.url.replace(/^\//, '')}` : `${BASE}${itemPath(item).slice(1)}`);
  DOCS = [
    ...ALL_ITEMS.map((item) => {
      const body = plain(item.content);
      return {
        kind: item.type === 'tool' ? 'tool' : 'article',
        item, url: makeUrl(item),
        title: item.title, cat: item.category || '', ex: item.excerpt || '',
        titleL: item.title.toLowerCase(), catL: (item.category || '').toLowerCase(),
        exL: (item.excerpt || '').toLowerCase(),
        body, bodyL: body.toLowerCase(),
        time: item.type === 'tool' ? 'Free tool' : readingTime(item),
        image: item.image || '',
      };
    }),
    ...PLAYGROUND_PAGES.map((item) => ({
      kind: 'play', item, url: makeUrl(item),
      title: item.title, cat: item.category || 'Playground', ex: '',
      titleL: item.title.toLowerCase(), catL: (item.category || '').toLowerCase(), exL: '',
      body: '', bodyL: '', time: 'Playground', image: '', icon: item.icon || '🎀',
    })),
  ];
  return DOCS;
}

function countOf(hay, needle, cap) {
  let n = 0;
  let i = hay.indexOf(needle);
  while (i !== -1 && n < cap) { n += 1; i = hay.indexOf(needle, i + needle.length); }
  return n;
}

function runSearch(query) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean).slice(0, 6);
  if (!tokens.length) return [];
  const phrase = tokens.join(' ');
  const out = [];
  buildIndex().forEach((d) => {
    let score = 0;
    for (const t of tokens) {
      let s = 0;
      if (d.titleL.includes(t)) s += d.titleL.startsWith(t) || d.titleL.includes(` ${t}`) ? 30 : 18;
      if (d.catL.includes(t)) s += 10;
      if (d.exL.includes(t)) s += 6;
      if (d.bodyL) s += countOf(d.bodyL, t, 8) * 1.5;
      if (!s) return; // every word has to match somewhere
      score += s;
    }
    if (tokens.length > 1 && d.titleL.includes(phrase)) score += 25;
    out.push({ d, score });
  });
  return out.sort((a, b) => b.score - a.score).map((r) => r.d);
}

/* ---------- rendering helpers ---------- */

function highlight(text, tokens) {
  const safe = esc(text);
  if (!tokens.length) return safe;
  const re = new RegExp(`(${tokens.map((t) => escRe(esc(t))).join('|')})`, 'gi');
  return safe.replace(re, '<mark>$1</mark>');
}

function snippetFor(d, tokens) {
  const lowEx = d.exL;
  if (d.ex && tokens.some((t) => lowEx.includes(t))) return d.ex.length > 150 ? `${d.ex.slice(0, 147)}…` : d.ex;
  if (d.body) {
    let at = -1;
    for (const t of tokens) { const i = d.bodyL.indexOf(t); if (i !== -1 && (at === -1 || i < at)) at = i; }
    if (at !== -1) {
      let start = Math.max(0, at - 60);
      let end = Math.min(d.body.length, at + 110);
      if (start > 0) { const sp = d.body.indexOf(' ', start); if (sp !== -1 && sp < at) start = sp + 1; }
      if (end < d.body.length) { const sp = d.body.lastIndexOf(' ', end); if (sp > at) end = sp; }
      return `${start > 0 ? '…' : ''}${d.body.slice(start, end).trim()}${end < d.body.length ? '…' : ''}`;
    }
  }
  return d.ex ? (d.ex.length > 150 ? `${d.ex.slice(0, 147)}…` : d.ex) : '';
}

function thumb(d) {
  if (d.image) {
    const src = d.image.includes('res.cloudinary.com') && d.image.includes('/upload/')
      ? d.image.replace(/\/upload\/(?:[^/]*\/)?/, '/upload/c_fill,w_144,h_144,q_auto,f_auto/')
      : d.image;
    return `<span class="sx-thumb"><img src="${esc(src)}" alt="" loading="lazy" decoding="async"></span>`;
  }
  return `<span class="sx-thumb sx-thumb-ico" aria-hidden="true">${esc(d.icon || '🎀')}</span>`;
}

function itemHtml(d, tokens, n) {
  const snip = snippetFor(d, tokens);
  return `
    <a class="sx-item" role="option" id="sx-opt-${n}" href="${esc(d.url)}" data-kind="${d.kind}">
      ${thumb(d)}
      <span class="sx-copy">
        <strong class="sx-title">${highlight(d.title, tokens)}</strong>
        <span class="sx-meta"><b>${esc(d.cat)}</b>${d.time ? `<i>·</i>${esc(d.time)}` : ''}</span>
        ${snip ? `<span class="sx-snip">${highlight(snip, tokens)}</span>` : ''}
      </span>
      <span class="sx-go" aria-hidden="true">›</span>
    </a>`;
}

/* ---------- the sheet ---------- */

export function initSearch() {
  const btn = document.getElementById('search-btn');
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear');
  const closeBtn = document.getElementById('search-close');
  const backdrop = document.getElementById('search-backdrop');
  const tabsEl = document.getElementById('search-tabs');
  const results = document.getElementById('search-results');
  if (!btn || !overlay || !input || !results) return;

  let tab = 'all';
  let active = -1;
  let timer = 0;

  const isOpen = () => overlay.classList.contains('open');

  function open() {
    if (isOpen()) return;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    root.classList.add('hdr-lock');
    window.dispatchEvent(new CustomEvent('hdr:search'));
    render();
    window.setTimeout(() => input.focus({ preventScroll: true }), 80);
  }

  function close() {
    if (!isOpen()) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    const drawer = document.getElementById('site-drawer');
    if (!drawer || !drawer.classList.contains('open')) root.classList.remove('hdr-lock');
    window.dispatchEvent(new CustomEvent('hdr:search'));
    btn.focus({ preventScroll: true });
  }

  function setActive(n) {
    const items = [...results.querySelectorAll('.sx-item')];
    if (!items.length) { active = -1; return; }
    active = (n + items.length) % items.length;
    items.forEach((el, i) => el.classList.toggle('is-active', i === active));
    input.setAttribute('aria-activedescendant', items[active].id);
    items[active].scrollIntoView({ block: 'nearest' });
  }

  function emptyState() {
    const list = recent.get();
    const pop = (LATEST_ARTICLES || []).slice(0, 4);
    const tools = (FREE_TOOLS || []).slice(0, 3);
    const docFor = (item) => buildIndex().find((d) => d.item === item || d.item.id === item.id);
    let n = 0;
    let html = '';
    if (list.length) {
      html += `<section class="sx-sec"><div class="sx-sec-head"><h3>Recent</h3><button type="button" class="sx-link" data-clear-recent>Clear</button></div><div class="sx-chips">${
        list.map((q) => `<button type="button" class="sx-chip" data-q="${esc(q)}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5M12 8v4l3 2"/></svg>${esc(q)}</button>`).join('')
      }</div></section>`;
    }
    html += `<section class="sx-sec"><div class="sx-sec-head"><h3>Try searching</h3></div><div class="sx-chips">${
      IDEAS.map((q) => `<button type="button" class="sx-chip" data-q="${esc(q)}">${esc(q)}</button>`).join('')
    }</div></section>`;
    const popDocs = pop.map(docFor).filter(Boolean);
    if (popDocs.length) {
      html += `<section class="sx-sec"><div class="sx-sec-head"><h3>Popular reads</h3></div>${popDocs.map((d) => itemHtml(d, [], n++)).join('')}</section>`;
    }
    const toolDocs = tools.map(docFor).filter(Boolean);
    if (toolDocs.length) {
      html += `<section class="sx-sec"><div class="sx-sec-head"><h3>Free tools</h3></div>${toolDocs.map((d) => itemHtml(d, [], n++)).join('')}</section>`;
    }
    return html;
  }

  function render() {
    const q = input.value.trim();
    clearBtn.hidden = !input.value;
    input.removeAttribute('aria-activedescendant');
    active = -1;

    if (!q) {
      tabsEl.hidden = true;
      tabsEl.innerHTML = '';
      results.innerHTML = emptyState();
      results.scrollTop = 0;
      return;
    }

    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean).slice(0, 6);
    const all = runSearch(q);
    const counts = { all: all.length, article: 0, tool: 0, play: 0 };
    all.forEach((d) => { counts[d.kind] += 1; });
    if (tab !== 'all' && !counts[tab]) tab = 'all';
    const shown = tab === 'all' ? all : all.filter((d) => d.kind === tab);

    const tabDefs = [['all', 'All'], ['article', 'Articles'], ['tool', 'Tools'], ['play', 'Playground']];
    tabsEl.hidden = false;
    tabsEl.innerHTML = tabDefs
      .filter(([k]) => k === 'all' || counts[k])
      .map(([k, label]) => `<button type="button" role="tab" class="sx-tab${tab === k ? ' on' : ''}" aria-selected="${tab === k}" data-tab="${k}">${label}<span>${counts[k]}</span></button>`)
      .join('');

    if (!shown.length) {
      results.innerHTML = `
        <div class="sx-empty">
          <span class="sx-empty-ico" aria-hidden="true">🔎</span>
          <strong>No matches for “${esc(q)}”</strong>
          <p>Try a shorter or simpler word, or start from one of these.</p>
          <div class="sx-chips">${IDEAS.map((i) => `<button type="button" class="sx-chip" data-q="${esc(i)}">${esc(i)}</button>`).join('')}</div>
        </div>`;
      return;
    }

    results.innerHTML = `<p class="sx-count">${counts.all} result${counts.all === 1 ? '' : 's'}</p>${
      shown.slice(0, 24).map((d, n) => itemHtml(d, tokens, n)).join('')
    }`;
    results.scrollTop = 0;
    setActive(0);
  }

  btn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  input.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(render, 70);
  });
  clearBtn.addEventListener('click', () => { input.value = ''; tab = 'all'; render(); input.focus(); });

  tabsEl.addEventListener('click', (e) => {
    const t = e.target.closest('[data-tab]');
    if (!t) return;
    tab = t.dataset.tab;
    render();
  });

  results.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-q]');
    if (chip) { input.value = chip.dataset.q; tab = 'all'; render(); input.focus(); return; }
    if (e.target.closest('[data-clear-recent]')) { recent.clear(); render(); return; }
    if (e.target.closest('.sx-item')) recent.add(input.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
    else if (e.key === 'Enter') {
      const items = results.querySelectorAll('.sx-item');
      const target = items[active >= 0 ? active : 0];
      if (target) { e.preventDefault(); recent.add(input.value); window.location.href = target.href; }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) { close(); return; }
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || '') || (e.target && e.target.isContentEditable);
    if ((e.key === '/' && !typing && !e.ctrlKey && !e.metaKey) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      open();
    }
  });
}
