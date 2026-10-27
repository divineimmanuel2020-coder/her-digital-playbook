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
let query = '';

/* Plain-language guidance for each template, written to match what the
   template actually contains. `terms` link to Glossary entries; `next` links to
   the Playground experience where the skill can be practised. */
const GUIDE = {
  'job-application-tracker': { who: 'Anyone applying to several roles at once.', when: 'From your first application, and every time you send another.', customise: 'Add each role, company, date applied and a follow-up date.', result: 'No missed follow-ups and a clear view of where each application stands.', terms: ['Applicant Tracking System'] },
  'interview-prep-worksheet': { who: 'Anyone with an interview coming up.', when: 'The day you get the invitation, then again the evening before.', customise: 'Use the real job post and company: your examples, your questions.', result: 'Prepared answers, stories and questions instead of improvising.', terms: ['Soft Skills', 'Transferable Skills'] },
  'linkedin-profile-checklist': { who: 'Job seekers, freelancers and anyone who wants to be found.', when: 'Before you apply, pitch or network, and every few months.', customise: 'Tick off each item and rewrite the parts you cannot tick.', result: 'A profile that explains what you do and who you help.', terms: ['Personal Branding', 'Networking'] },
  'career-planning-worksheet': { who: 'Anyone unsure what they want next in their career.', when: 'At a turning point: a new job, a layoff, or a feeling of being stuck.', customise: 'Answer honestly rather than impressively: nobody else has to read it.', result: 'A written picture of where you are and the next one or two moves.', terms: ['Transferable Skills', 'Portfolio'] },
  'client-outreach-template': { who: 'Freelancers looking for their first or next client.', when: 'When you have a specific business in mind and one real observation about it.', customise: 'Replace every bracket with details about that business. Never send it unchanged.', result: 'A short message that earns a reply instead of looking like spam.', terms: ['Client Acquisition', 'Niche'], next: ['Practise with the Client Simulator', '/pages/client-simulator.html'] },
  'follow-up-template': { who: 'Freelancers whose first message went unanswered.', when: 'A few days after your first message, once.', customise: 'Reference your earlier message and add one new useful detail.', result: 'A polite nudge that keeps the door open.', terms: ['Client Acquisition'] },
  'freelance-proposal-structure': { who: 'Freelancers about to quote a project.', when: 'After a discovery conversation, before you send a price.', customise: 'Fill each section with that client\'s goals, your deliverables, timeline and price.', result: 'A clear proposal that sets expectations and reduces later disputes.', terms: ['Proposal', 'Scope of Work', 'Milestone'], next: ['Practise quoting in the Client Simulator', '/pages/client-simulator.html'] },
  'client-onboarding-checklist': { who: 'Freelancers who just won a client.', when: 'The moment a client says yes.', customise: 'Add any steps specific to your service, such as access to accounts.', result: 'Every client starts the same way: agreement, deposit, access and a kickoff.', terms: ['Scope of Work', 'Deposit'] },
  'scope-of-work-checklist': { who: 'Freelancers writing down what a project includes.', when: 'Before any work starts, and whenever the project changes.', customise: 'List deliverables, revision limits, dates and what is not included.', result: 'A written boundary you can point to if the project grows.', terms: ['Scope of Work', 'Revision', 'Deposit'], next: ['Practise handling scope creep', '/pages/client-simulator.html'] },
  'payment-reminder-template': { who: 'Freelancers with an overdue invoice.', when: 'The day after the due date, then again if there is no reply.', customise: 'Add the invoice number, amount, original due date and payment details.', result: 'A calm, professional message that prompts payment without damaging the relationship.', terms: ['Invoice', 'Deposit'] },
  'client-discovery-questions': { who: 'Freelancers preparing for a first client call.', when: 'Before you quote anything.', customise: 'Pick the questions that fit the project and add any specific to your service.', result: 'You understand the real goal, budget and deadline before you price.', terms: ['Scope of Work', 'Client Acquisition'], next: ['See why in the Client Simulator story', '/pages/client-simulator.html'] },
  '30-day-content-planner': { who: 'Creators and small businesses posting regularly.', when: 'At the end of each month, for the month ahead.', customise: 'Fill in a topic, format and post date for each day. Remove days you will not post.', result: 'A month of content decided in one sitting.', terms: ['Content Marketing', 'Engagement Rate'] },
  'content-pillar-worksheet': { who: 'Anyone whose content feels random.', when: 'When you start, or when you feel stuck on what to post.', customise: 'Choose three to five topics you can talk about for a year.', result: 'A repeatable structure so you never start from zero.', terms: ['Content Marketing', 'Niche'] },
  'content-idea-bank': { who: 'Creators who run out of ideas.', when: 'Keep it open and add ideas the moment you have them.', customise: 'Add the idea, the format and the pillar it belongs to.', result: 'A running list so planning day is quick.', terms: ['Content Marketing'] },
  'caption-planning-template': { who: 'Anyone writing social captions.', when: 'Before you post.', customise: 'Replace the placeholders with your hook, point and call to action.', result: 'Captions that hold attention and say what to do next.', terms: ['CTA', 'Engagement Rate'] },
  'business-idea-worksheet': { who: 'Anyone with an idea they have not tested.', when: 'Before you spend time or money building it.', customise: 'Answer honestly, especially the questions about who will pay.', result: 'A clear view of whether the idea has a real customer and a real problem.', terms: ['Business Model', 'Target Audience'], next: ['Explore directions in Money Path', '/pages/money-path.html'] },
  'offer-builder': { who: 'Anyone selling a service or product.', when: 'When people understand what you do but do not buy.', customise: 'Be specific about who it is for, the result, and what is included.', result: 'A sellable offer you can describe in a sentence.', terms: ['Offer', 'Niche'] },
  'customer-research-worksheet': { who: 'Anyone building for an audience they have not defined.', when: 'Before you create content, offers or products.', customise: 'Use real conversations and comments, not guesses.', result: 'A specific picture of who you serve and what they struggle with.', terms: ['Customer Persona', 'Target Audience'] },
  'digital-product-planner': { who: 'Anyone planning a template, guide or course.', when: 'Before you build anything.', customise: 'Fill in the problem, audience, format and how you will deliver it.', result: 'A plan for a product you can finish.', terms: ['Digital Product', 'Lead Magnet'] },
  'monthly-money-check-in': { who: 'Anyone who wants to see where their money went.', when: 'Once a month, on the same day.', customise: 'Add your own categories and the real figures from that month.', result: 'A short monthly snapshot so nothing sneaks up on you.', terms: ['Cash Flow', 'Budget', 'Expense'], next: ['Practise money decisions in Game Room', '/pages/game-room.html?game=money-moves'] },
  'income-tracker': { who: 'Anyone earning from more than one place.', when: 'Every time money comes in.', customise: 'Record the date, source and amount.', result: 'A clear total by month and source.', terms: ['Gross Income', 'Net Income', 'Active Income'] },
  'side-hustle-income-tracker': { who: 'Anyone with a side hustle or freelance work.', when: 'After each client or gig.', customise: 'Add the client, the money earned and the hours worked.', result: 'Your real hourly rate by client, so you know what is worth keeping.', terms: ['Active Income', 'Revenue', 'Profit'], next: ['Practise pricing in Price This Project', '/pages/game-room.html?game=price-this'] },
  'goal-tracker': { who: 'Anyone with a goal that feels fuzzy.', when: 'When you set a goal, and each week to update it.', customise: 'Turn the goal into something with a date and a status.', result: 'A goal you can see progress on.', terms: [] },
};

/* Some storage can be blocked (private mode, strict settings). These keep the
   templates usable for the visit even when nothing can be saved. */
const safeGet = (key, fallback) => { try { return pgGet(key, fallback); } catch { return fallback; } };
const safeSet = (key, value) => { try { pgSet(key, value); } catch { /* not saved on this device */ } };

const usedThisVisit = new Set();

function matchesQuery(t) {
  if (!query) return true;
  const g = GUIDE[t.id] || {};
  const haystack = `${t.title} ${t.description} ${t.category} ${g.who || ''} ${g.when || ''} ${(g.terms || []).join(' ')}`.toLowerCase();
  return query.toLowerCase().split(/\s+/).filter(Boolean).every((w) => haystack.includes(w));
}

function seedRows(t) {
  const rows = Array.from({ length: t.seedRows || 3 }, () => t.columns.map(() => ''));
  if (t.id === '30-day-content-planner') rows.forEach((r, i) => { r[0] = `Day ${i + 1}`; });
  return rows;
}

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

/* action 'download' = a real copy/download/export; anything else = the person is
   filling it in. Analytics for editing fire once per template per visit. */
function markUsed(templateId, action = 'edit') {
  if (action === 'download') gaEvent('template_downloaded', { template: templateId });
  else if (!usedThisVisit.has(templateId)) { usedThisVisit.add(templateId); gaEvent('template_used', { template: templateId }); }
  try {
    if (!pgHasDone('templates-used')) {
      pgMarkDone('templates-used');
      pgGrantXP(10, { badgeId: 'resource-girl' });
      pgCheckQueenBadge();
    }
  } catch { /* progress could not be saved */ }
}

function renderGrid() {
  const visible = TEMPLATES.filter((t) => (activeCategory === 'All' || t.category === activeCategory) && matchesQuery(t));
  const count = document.getElementById('template-count');
  if (count) count.textContent = `${visible.length} template${visible.length === 1 ? '' : 's'}`;
  if (!visible.length) {
    gridRoot.innerHTML = '<p class="pg-empty-state">No templates match that yet. <button class="pg-link-button" id="tpl-clear" type="button">Show all templates</button></p>';
    document.getElementById('tpl-clear').addEventListener('click', () => { query = ''; activeCategory = 'All'; const i = document.getElementById('template-search-input'); if (i) i.value = ''; renderFilters(); renderGrid(); });
    return;
  }
  gridRoot.innerHTML = visible.map((t) => `
    <div class="pg-template-card" id="card-${t.id}">
      <p class="pg-template-category">${t.category}</p>
      <h3>${t.title}</h3>
      <p>${t.description}</p>
      ${GUIDE[t.id] ? `<p class="pg-template-who"><strong>Best for:</strong> ${GUIDE[t.id].who}</p>` : ''}
      <button class="btn btn-primary pg-template-open" data-id="${t.id}" type="button" aria-label="Open ${escapeHtml(t.title)}">Open Template</button>
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

function guideHtml(t) {
  const g = GUIDE[t.id];
  if (!g) return '';
  const terms = (g.terms || []).map((term) => `<a href="/pages/glossary.html?term=${encodeURIComponent(term)}">${escapeHtml(term)}</a>`).join(', ');
  return `
    <dl class="pg-template-guide">
      <div><dt>Who it is for</dt><dd>${g.who}</dd></div>
      <div><dt>When to use it</dt><dd>${g.when}</dd></div>
      <div><dt>What to customise</dt><dd>${g.customise}</dd></div>
      <div><dt>What you get</dt><dd>${g.result}</dd></div>
    </dl>
    ${terms ? `<p class="pg-template-links"><strong>Terms in this template:</strong> ${terms}</p>` : ''}
    ${g.next ? `<p class="pg-template-links"><a href="${g.next[1]}">${g.next[0]} →</a></p>` : ''}`;
}

function openTemplate(id, { fromHash = false } = {}) {
  const t = TEMPLATES.find((x) => x.id === id);
  if (!t) return;
  workspaceRoot.hidden = false;
  workspaceRoot.innerHTML = `
    <div class="pg-template-workspace" id="${t.id}" role="region" aria-labelledby="workspace-title">
      <div class="pg-template-workspace-head">
        <div>
          <p class="pg-template-category">${t.category}</p>
          <h2 id="workspace-title" tabindex="-1">${t.title}</h2>
        </div>
        <button class="btn btn-secondary" id="close-workspace" type="button">Close</button>
      </div>
      ${guideHtml(t)}
      <div id="workspace-body"></div>
      <p class="pg-template-status" id="workspace-status" role="status" aria-live="polite"></p>
      <div class="pg-template-actions" id="workspace-actions"></div>
    </div>`;
  document.getElementById('close-workspace').addEventListener('click', () => {
    workspaceRoot.hidden = true;
    workspaceRoot.innerHTML = '';
    history.replaceState(null, '', location.pathname + location.search);
    document.querySelector(`.pg-template-open[data-id="${id}"]`)?.focus();
  });

  if (t.type === 'text') renderTextTemplate(t);
  if (t.type === 'checklist') renderChecklistTemplate(t);
  if (t.type === 'worksheet') renderWorksheetTemplate(t);
  if (t.type === 'tracker') renderTrackerTemplate(t);

  if (!fromHash) history.replaceState(null, '', `#${t.id}`);
  workspaceRoot.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('workspace-title').focus({ preventScroll: true });
}

function say(message) {
  const el = document.getElementById('workspace-status');
  if (el) el.textContent = message;
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
      say('Copied to your clipboard.');
      setTimeout(() => { document.getElementById('copy-btn').textContent = 'Copy'; }, 1800);
      markUsed(t.id, 'download');
    } catch {
      // Clipboard blocked: select the text so a manual copy is one step.
      const block = document.querySelector('#workspace-body .pg-text-block');
      if (block) { const range = document.createRange(); range.selectNodeContents(block); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range); }
      say('Your browser blocked automatic copying. The text is selected: press Ctrl+C (or Cmd+C) to copy it, or use Download.');
    }
  });
  document.getElementById('download-btn').addEventListener('click', () => {
    downloadFile(`${t.id}.txt`, t.body);
    say('Downloaded as a text file.');
    markUsed(t.id, 'download');
  });
}

/* ---- CHECKLIST templates: persistent checkboxes, reuses .article-checklist ---- */
function renderChecklistTemplate(t) {
  const key = `tpl-checklist-${t.id}`;
  const saved = safeGet(key, []);
  document.getElementById('workspace-body').innerHTML = `
    <ul class="article-checklist">
      ${t.items.map((item, i) => `<li><label><input type="checkbox" data-i="${i}" ${saved.includes(i) ? 'checked' : ''}><span>${item}</span></label></li>`).join('')}
    </ul>`;
  const boxes = [...document.querySelectorAll('#workspace-body input[type="checkbox"]')];
  const persist = () => {
    safeSet(key, boxes.filter((b) => b.checked).map((b) => Number(b.dataset.i)));
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
  const saved = safeGet(key, {});
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
    safeSet(key, values);
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
    say('Downloaded as a text file.');
    markUsed(t.id, 'download');
  });
  document.getElementById('print-btn').addEventListener('click', () => printWorkspace());
  document.getElementById('reset-btn').addEventListener('click', () => {
    if (!window.confirm('Clear everything you have written in this worksheet?')) return;
    inputs.forEach((el) => { el.value = ''; });
    safeSet(key, {});
    say('Worksheet cleared.');
  });
}

/* ---- TRACKER templates: add/remove rows, reuses a plain table ---- */
function renderTrackerTemplate(t) {
  const key = `tpl-tracker-${t.id}`;
  let rows = safeGet(key, null);
  if (!Array.isArray(rows)) rows = seedRows(t);

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
        safeSet(key, rows);
        markUsed(t.id);
      });
    });
    document.querySelectorAll('.pg-tracker-row-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        rows.splice(Number(btn.dataset.r), 1);
        safeSet(key, rows);
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
    safeSet(key, rows);
    renderTable();
  });
  document.getElementById('download-csv-btn').addEventListener('click', () => {
    const csv = [t.columns.join(','), ...rows.map((r) => r.map((cell) => `"${(cell || '').replace(/"/g, '""')}"`).join(','))].join('\n');
    downloadFile(`${t.id}.csv`, csv, 'text/csv');
    say('Downloaded as a CSV file.');
    markUsed(t.id, 'download');
  });
  document.getElementById('print-btn').addEventListener('click', () => printWorkspace());
  document.getElementById('reset-btn').addEventListener('click', () => {
    if (!window.confirm('Clear every row in this tracker?')) return;
    rows = seedRows(t);
    safeSet(key, rows);
    renderTable();
    say('Tracker cleared.');
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

  // Search sits above the category filters; it combines with them.
  filterRoot.insertAdjacentHTML('beforebegin', `
    <div class="pg-glossary-search">
      <label class="pgh-sr" for="template-search-input">Search templates</label>
      <input type="search" id="template-search-input" placeholder="Search templates, e.g. invoice, interview, budget" autocomplete="off" maxlength="60">
    </div>`);
  filterRoot.insertAdjacentHTML('afterend', '<p class="pg-glossary-count" id="template-count" aria-live="polite"></p>');
  document.getElementById('template-search-input').addEventListener('input', (e) => { query = e.target.value.trim(); renderGrid(); });

  renderFilters();
  renderGrid();

  const openFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (TEMPLATES.some((x) => x.id === id)) {
      activeCategory = 'All'; query = '';
      openTemplate(id, { fromHash: true });
    }
  };
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  const keep = ['personal-branding-for-beginners', 'how-to-get-your-first-freelance-client', 'resume-review-checklist']
    .map((id) => findItemById(id)).filter(Boolean)
    .map((item) => ({ href: articleHref(item.id), title: item.title, subtitle: item.readTime || 'Free tool', icon: item.type === 'tool' ? '📋' : '📖' }));
  renderKeepExploring(document.getElementById('keep-exploring'), keep);
}

document.addEventListener('DOMContentLoaded', init);
