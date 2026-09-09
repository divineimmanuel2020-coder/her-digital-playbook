/* =============================================
   JS/TEMPLATES.JS
   Drives /pages/templates.html. One generic renderer per template
   `type` (text / checklist / worksheet / tracker) instead of 23
   bespoke implementations. Every action here is real: copy uses
   the Clipboard API, download builds an actual Blob file, print
   uses a scoped print stylesheet, and all fill-in state persists
   to localStorage under this template's own namespaced key.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initGirlGangPopup } from './girlgang-popup.js';
import { maybeShowJoinReminder } from './notifications.js';
import { TEMPLATES } from '../data/playground.js';
import { findItemById } from '../data/store.js';
import { pgGrantXP, pgMarkDone, pgHasDone, pgCheckQueenBadge, pgGet, pgSet, renderKeepExploring, articleHref } from './playground.js';

const gaEvent = (name, params = {}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };

const gridRoot = document.getElementById('template-grid');
const filterRoot = document.getElementById('template-filters');
const workspaceRoot = document.getElementById('template-workspace');

const CATEGORIES = ['All', ...new Set(TEMPLATES.map((t) => t.category))];
let activeCategory = 'All';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function downloadFile(filename, content, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function markUsed(templateId) {
  gaEvent('template_downloaded', { template: templateId });
  if (!pgHasDone('templates-used')) {
    pgMarkDone('templates-used');
    pgGrantXP(10, { badgeId: 'resource-girl' });
    pgCheckQueenBadge();
  }
}

function renderGrid() {
  const visible = activeCategory === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.category === activeCategory);
  gridRoot.innerHTML = visible.map((t) => `
    <div class="pg-template-card" id="card-${t.id}">
      <p class="pg-template-category">${t.category}</p>
      <h3>${t.title}</h3>
      <p>${t.description}</p>
      <button class="btn btn-primary pg-template-open" data-id="${t.id}" type="button">Open Template</button>
    </div>`).join('');
  gridRoot.querySelectorAll('.pg-template-open').forEach((btn) => {
    btn.addEventListener('click', () => openTemplate(btn.dataset.id));
  });
}

function renderFilters() {
  filterRoot.innerHTML = CATEGORIES.map((c) => `<button class="pg-filter-pill ${c === activeCategory ? 'active' : ''}" data-cat="${c}" type="button">${c}</button>`).join('');
  filterRoot.querySelectorAll('.pg-filter-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      renderFilters();
      renderGrid();
    });
  });
}

function openTemplate(id) {
  const t = TEMPLATES.find((x) => x.id === id);
  if (!t) return;
  workspaceRoot.hidden = false;
  workspaceRoot.innerHTML = `
    <div class="pg-template-workspace" id="${t.id}">
      <div class="pg-template-workspace-head">
        <div>
          <p class="pg-template-category">${t.category}</p>
          <h2>${t.title}</h2>
        </div>
        <button class="btn btn-secondary" id="close-workspace" type="button">Close</button>
      </div>
      <div id="workspace-body"></div>
      <div class="pg-template-actions" id="workspace-actions"></div>
    </div>`;
  document.getElementById('close-workspace').addEventListener('click', () => { workspaceRoot.hidden = true; workspaceRoot.innerHTML = ''; });

  if (t.type === 'text') renderTextTemplate(t);
  if (t.type === 'checklist') renderChecklistTemplate(t);
  if (t.type === 'worksheet') renderWorksheetTemplate(t);
  if (t.type === 'tracker') renderTrackerTemplate(t);

  workspaceRoot.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---- TEXT templates: copy + download ---- */
function renderTextTemplate(t) {
  document.getElementById('workspace-body').innerHTML = `<div class="pg-text-block">${t.body}</div>`;
  document.getElementById('workspace-actions').innerHTML = `
    <button class="btn btn-primary" id="copy-btn" type="button">Copy</button>
    <button class="btn btn-secondary" id="download-btn" type="button">Download .txt</button>`;
  document.getElementById('copy-btn').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(t.body);
      document.getElementById('copy-btn').textContent = 'Copied! 💗';
      setTimeout(() => { document.getElementById('copy-btn').textContent = 'Copy'; }, 1800);
      markUsed(t.id);
    } catch { /* clipboard unavailable — download still works */ }
  });
  document.getElementById('download-btn').addEventListener('click', () => {
    downloadFile(`${t.id}.txt`, t.body);
    markUsed(t.id);
  });
}

/* ---- CHECKLIST templates: persistent checkboxes, reuses .article-checklist ---- */
function renderChecklistTemplate(t) {
  const key = `tpl-checklist-${t.id}`;
  const saved = pgGet(key, []);
  document.getElementById('workspace-body').innerHTML = `
    <ul class="article-checklist">
      ${t.items.map((item, i) => `<li><label><input type="checkbox" data-i="${i}" ${saved.includes(i) ? 'checked' : ''}><span>${item}</span></label></li>`).join('')}
    </ul>`;
  const boxes = [...document.querySelectorAll('#workspace-body input[type="checkbox"]')];
  const persist = () => {
    pgSet(key, boxes.filter((b) => b.checked).map((b) => Number(b.dataset.i)));
  };
  boxes.forEach((b) => b.addEventListener('change', () => { persist(); markUsed(t.id); }));
  document.getElementById('workspace-actions').innerHTML = `
    <button class="btn btn-secondary" id="reset-btn" type="button">Reset</button>
    <button class="btn btn-secondary" id="print-btn" type="button">Print</button>`;
  document.getElementById('reset-btn').addEventListener('click', () => {
    boxes.forEach((b) => { b.checked = false; });
    persist();
  });
  document.getElementById('print-btn').addEventListener('click', () => printWorkspace());
}

/* ---- WORKSHEET templates: labeled fields, reuses .builder-field ---- */
function renderWorksheetTemplate(t) {
  const key = `tpl-worksheet-${t.id}`;
  const saved = pgGet(key, {});
  document.getElementById('workspace-body').innerHTML = `
    <div class="builder-fields">
      ${t.fields.map((f, i) => `
        <label class="builder-field">
          <span>${f.label}</span>
          ${f.type === 'textarea'
            ? `<textarea data-i="${i}" rows="3">${escapeHtml(saved[i] || '')}</textarea>`
            : `<input type="text" data-i="${i}" value="${escapeHtml(saved[i] || '')}">`}
        </label>`).join('')}
    </div>`;
  const inputs = [...document.querySelectorAll('#workspace-body [data-i]')];
  const persistAndMark = () => {
    const values = {};
    inputs.forEach((el) => { values[el.dataset.i] = el.value; });
    pgSet(key, values);
    markUsed(t.id);
  };
  inputs.forEach((el) => el.addEventListener('input', persistAndMark));
  document.getElementById('workspace-actions').innerHTML = `
    <button class="btn btn-primary" id="download-btn" type="button">Download .txt</button>
    <button class="btn btn-secondary" id="print-btn" type="button">Print</button>
    <button class="btn btn-secondary" id="reset-btn" type="button">Reset</button>`;
  document.getElementById('download-btn').addEventListener('click', () => {
    const text = t.fields.map((f, i) => `${f.label}:\n${inputs[i].value || '(not filled in)'}\n`).join('\n');
    downloadFile(`${t.id}.txt`, `${t.title}\n\n${text}`);
    markUsed(t.id);
  });
  document.getElementById('print-btn').addEventListener('click', () => printWorkspace());
  document.getElementById('reset-btn').addEventListener('click', () => {
    inputs.forEach((el) => { el.value = ''; });
    pgSet(key, {});
  });
}

/* ---- TRACKER templates: add/remove rows, reuses a plain table ---- */
function renderTrackerTemplate(t) {
  const key = `tpl-tracker-${t.id}`;
  let rows = pgGet(key, null);
  if (!rows) {
    rows = Array.from({ length: t.seedRows || 3 }, () => t.columns.map(() => ''));
    if (t.id === '30-day-content-planner') {
      rows = rows.map((r, i) => { r[0] = `Day ${i + 1}`; return r; });
    }
  }

  function renderTable() {
    document.getElementById('workspace-body').innerHTML = `
      <div class="pg-tracker-table-wrap">
        <table class="pg-tracker-table">
          <thead><tr>${t.columns.map((c) => `<th>${c}</th>`).join('')}<th></th></tr></thead>
          <tbody>
            ${rows.map((row, r) => `
              <tr>
                ${row.map((cell, c) => `<td><input type="text" value="${escapeHtml(cell || '')}" data-r="${r}" data-c="${c}"></td>`).join('')}
                <td><button class="pg-tracker-row-remove" data-r="${r}" type="button" aria-label="Remove row">✕</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
    document.querySelectorAll('.pg-tracker-table input').forEach((input) => {
      input.addEventListener('input', () => {
        rows[Number(input.dataset.r)][Number(input.dataset.c)] = input.value;
        pgSet(key, rows);
        markUsed(t.id);
      });
    });
    document.querySelectorAll('.pg-tracker-row-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        rows.splice(Number(btn.dataset.r), 1);
        pgSet(key, rows);
        renderTable();
      });
    });
  }
  renderTable();

  document.getElementById('workspace-actions').innerHTML = `
    <button class="btn btn-primary" id="add-row-btn" type="button">+ Add Row</button>
    <button class="btn btn-secondary" id="download-csv-btn" type="button">Download CSV</button>
    <button class="btn btn-secondary" id="print-btn" type="button">Print</button>
    <button class="btn btn-secondary" id="reset-btn" type="button">Reset</button>`;
  document.getElementById('add-row-btn').addEventListener('click', () => {
    rows.push(t.columns.map(() => ''));
    pgSet(key, rows);
    renderTable();
  });
  document.getElementById('download-csv-btn').addEventListener('click', () => {
    const csv = [t.columns.join(','), ...rows.map((r) => r.map((cell) => `"${(cell || '').replace(/"/g, '""')}"`).join(','))].join('\n');
    downloadFile(`${t.id}.csv`, csv, 'text/csv');
    markUsed(t.id);
  });
  document.getElementById('print-btn').addEventListener('click', () => printWorkspace());
  document.getElementById('reset-btn').addEventListener('click', () => {
    rows = Array.from({ length: t.seedRows || 3 }, () => t.columns.map(() => ''));
    pgSet(key, rows);
    renderTable();
  });
}

function printWorkspace() {
  document.body.classList.add('pg-printing');
  window.print();
  setTimeout(() => document.body.classList.remove('pg-printing'), 500);
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

  const keep = ['personal-branding-for-beginners', 'how-to-get-your-first-freelance-client', 'resume-review-checklist']
    .map((id) => findItemById(id)).filter(Boolean)
    .map((item) => ({ href: articleHref(item.id), title: item.title, subtitle: item.readTime || 'Free tool', icon: item.type === 'tool' ? '📋' : '📖' }));
  renderKeepExploring(document.getElementById('keep-exploring'), keep);
}

document.addEventListener('DOMContentLoaded', init);
