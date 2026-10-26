/* =============================================
   TOOLS.JS
   The six Free Tools. Every tool here works the same way:
     1. It asks for the real numbers (or honest answers) that decide
        the result, not just two or three.
     2. It does the thinking: ranges, trade-offs, "what if" tables and
        warnings, not one number and a pat on the head.
     3. It ends with exact next steps and words you can copy.

   Everything runs in the visitor's own browser. Nothing typed into
   a tool is sent anywhere. Answers are remembered on the device
   (localStorage) so a visitor can come back and carry on.

   article.js calls renderTool(id, container) for any item of
   type 'tool'. The calculation functions are plain functions with no
   page code inside, exported at the bottom so they can be tested.
   ============================================= */

import { findItemById } from '../data/store.js';
import { BASE } from './base.js';
import { itemPath } from './routes.js';

/* =============================================
   SMALL HELPERS
   ============================================= */

const store = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (_) {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      /* private mode or storage full: the tool still works */
    }
  },
};

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

const CURRENCIES = [
  ['USD', '$ US dollar'],
  ['GBP', '£ British pound'],
  ['EUR', '€ Euro'],
  ['CAD', 'C$ Canadian dollar'],
  ['AUD', 'A$ Australian dollar'],
  ['NGN', '₦ Nigerian naira'],
  ['GHS', 'GH₵ Ghanaian cedi'],
  ['KES', 'KSh Kenyan shilling'],
  ['ZAR', 'R South African rand'],
  ['INR', '₹ Indian rupee'],
  ['PHP', '₱ Philippine peso'],
  ['AED', 'AED UAE dirham'],
];

let activeCurrency = store.get('hdp-currency') || 'USD';

function setCurrency(code) {
  activeCurrency = code;
  store.set('hdp-currency', code);
}

function money(n, cents = false) {
  const value = Number.isFinite(n) ? n : 0;
  const digits = cents && Math.abs(value) < 100 ? 2 : 0;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: activeCurrency,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value);
  } catch (_) {
    return Math.round(value).toLocaleString('en-US');
  }
}

// Round to a number a human would actually say out loud.
function cleanRound(n) {
  if (!Number.isFinite(n)) return 0;
  const a = Math.abs(n);
  const step = a >= 100000 ? 1000 : a >= 10000 ? 500 : a >= 1000 ? 100 : a >= 200 ? 10 : a >= 20 ? 5 : 1;
  return Math.round(n / step) * step;
}

const pct = (n) => `${Math.round(n)}%`;

function readNum(container, id, fallback = 0) {
  const el = container.querySelector(`#${id}`);
  if (!el) return fallback;
  const cleaned = String(el.value).replace(/,/g, '').trim();
  if (cleaned === '') return fallback;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : fallback;
}

function readVal(container, id, fallback = '') {
  const el = container.querySelector(`#${id}`);
  return el ? el.value.trim() : fallback;
}

function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`;
}

/* =============================================
   SHARED STYLES
   Injected once, so a tool page needs no extra CSS file. Uses the
   site's own colours and fonts (Anton, Caveat, Plus Jakarta Sans).
   ============================================= */

function injectToolStyles() {
  if (document.getElementById('hdp-tools-css')) return;
  const css = `
  .tx-wide{max-width:760px !important;width:100%}
  .tx-intro{background:var(--color-pink-light);border:1px solid var(--color-border-light);border-radius:var(--radius-lg);padding:1.1rem 1.25rem;margin-bottom:1.25rem;max-width:760px}
  .tx-intro h3{font-family:var(--font-display);font-weight:400;letter-spacing:.03em;text-transform:uppercase;font-size:1.25rem;margin:0 0 .5rem;color:var(--color-text-primary)}
  .tx-intro ul{margin:.25rem 0 0;padding-left:1.1rem;color:var(--color-text-secondary);font-size:var(--body-small);line-height:1.55}
  .tx-intro li{margin:.2rem 0}
  .tx-privacy{font-size:.8rem;color:var(--color-text-muted);margin-top:.6rem}
  .tx-section-title{font-family:var(--font-display);font-weight:400;font-size:1.05rem;letter-spacing:.06em;text-transform:uppercase;color:var(--color-accent-dark);margin:1.1rem 0 .1rem;padding-top:.9rem;border-top:1px dashed var(--color-border-medium)}
  .tx-section-title:first-of-type{border-top:0;margin-top:0;padding-top:0}
  .tx-hint{display:block;font-weight:400;font-size:.78rem;color:var(--color-text-muted);line-height:1.4}
  .tx-row{display:grid;grid-template-columns:1fr 1fr;gap:.9rem}
  @media (max-width:560px){.tx-row{grid-template-columns:1fr}}
  .tool-widget textarea{padding:.7rem 1rem;border:1px solid var(--color-border-light);border-radius:var(--radius-sm);font-family:var(--font-body);font-size:var(--body-size);background:var(--color-warm-white);min-height:96px;resize:vertical}
  .tool-widget input[type="text"],.tool-widget input[type="number"],.tool-widget select,.tool-widget textarea{width:100%;box-sizing:border-box}
  .tx-checks{display:flex;flex-wrap:wrap;gap:.45rem}
  .tx-checks label{flex-direction:row !important;align-items:center;gap:.4rem !important;font-weight:500 !important;background:var(--color-warm-white);border:1px solid var(--color-border-light);border-radius:999px;padding:.4rem .8rem;cursor:pointer}
  .tx-checks input{accent-color:var(--color-accent)}
  .tx-stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(128px,1fr));gap:.7rem;margin:.9rem 0}
  .tx-stat{background:var(--color-pink-light);border:1px solid var(--color-border-light);border-radius:var(--radius-md);padding:.8rem .9rem}
  .tx-stat span{display:block;font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--color-text-secondary)}
  .tx-stat strong{display:block;font-family:var(--font-display);font-weight:400;font-size:1.65rem;line-height:1.15;color:var(--color-accent);margin-top:.15rem}
  .tx-stat em{display:block;font-style:normal;font-size:.76rem;color:var(--color-text-muted);margin-top:.15rem;line-height:1.35}
  .tx-hero-figure{font-family:var(--font-display);font-weight:400;font-size:clamp(2.6rem,11vw,4.2rem);line-height:1;color:var(--color-accent);margin:.15rem 0 .35rem}
  .tx-table{width:100%;border-collapse:collapse;font-size:.88rem;margin:.5rem 0 1rem}
  .tx-table th{text-align:left;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--color-text-secondary);padding:.45rem .5rem;border-bottom:2px solid var(--color-border-medium)}
  .tx-table td{padding:.5rem;border-bottom:1px solid var(--color-border-light);vertical-align:top}
  .tx-table td:last-child,.tx-table th:last-child{text-align:right}
  .tx-table tr.tx-good td{background:rgba(76,175,80,.07)}
  .tx-table tr.tx-bad td{background:rgba(229,115,115,.10)}
  .tx-bar{height:12px;border-radius:99px;background:var(--color-border-light);overflow:hidden;position:relative;margin:.25rem 0 .1rem}
  .tx-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--color-baby-pink),var(--color-accent))}
  .tx-bar i.tx-warn{background:linear-gradient(90deg,#f6d27a,var(--color-warning))}
  .tx-bar i.tx-danger{background:linear-gradient(90deg,#f1a5a5,var(--color-error))}
  .tx-bar-row{margin:.7rem 0}
  .tx-bar-row div.tx-bar-head{display:flex;justify-content:space-between;gap:.5rem;font-size:.85rem;font-weight:600}
  .tx-bar-row small{color:var(--color-text-muted);font-size:.76rem}
  .tx-callout{border-left:4px solid var(--color-accent);background:var(--color-pink-light);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:.8rem 1rem;margin:.9rem 0;font-size:.9rem;line-height:1.55}
  .tx-callout.tx-alert{border-left-color:var(--color-warning);background:#fff8e8}
  .tx-callout.tx-danger{border-left-color:var(--color-error);background:#fff0f0}
  .tx-callout strong{color:var(--color-text-primary)}
  .tx-script{background:#fff;border:1px dashed var(--color-border-medium);border-radius:var(--radius-md);padding:.9rem 1rem;font-size:.9rem;line-height:1.6;white-space:pre-wrap;color:var(--color-text-primary);margin:.4rem 0}
  .tx-actions{display:flex;flex-wrap:wrap;gap:.5rem;margin:.6rem 0}
  .tx-btn-small{font-family:var(--font-body);font-size:.8rem;font-weight:700;border:1px solid var(--color-border-medium);background:#fff;color:var(--color-text-primary);border-radius:999px;padding:.45rem .95rem;cursor:pointer}
  .tx-btn-small:hover{background:var(--color-accent);color:#fff;border-color:var(--color-accent)}
  .tx-details{border:1px solid var(--color-border-light);border-radius:var(--radius-md);background:#fff;margin:.45rem 0;overflow:hidden}
  .tx-details summary{cursor:pointer;padding:.7rem .9rem;font-weight:600;font-size:.9rem;list-style:none}
  .tx-details summary::-webkit-details-marker{display:none}
  .tx-details summary::after{content:'+';float:right;color:var(--color-accent);font-weight:800}
  .tx-details[open] summary::after{content:'−'}
  .tx-details > div{padding:0 .9rem .85rem;font-size:.86rem;color:var(--color-text-secondary);line-height:1.55}
  .tx-tabs{display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1rem}
  .tx-tab{font-family:var(--font-body);font-weight:700;font-size:.85rem;border:1px solid var(--color-border-medium);background:#fff;border-radius:999px;padding:.5rem 1rem;cursor:pointer;color:var(--color-text-secondary)}
  .tx-tab[aria-selected="true"]{background:var(--color-accent);color:#fff;border-color:var(--color-accent)}
  .tx-pill{display:inline-block;font-size:.72rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;border-radius:999px;padding:.2rem .6rem;background:var(--color-blush-pink);color:var(--color-accent-dark)}
  .tx-pill.tx-ok{background:rgba(76,175,80,.15);color:#2e7d32}
  .tx-pill.tx-miss{background:rgba(229,115,115,.18);color:#b23a3a}
  .tx-chips{display:flex;flex-wrap:wrap;gap:.35rem;margin:.4rem 0 .8rem}
  .tx-chips .tx-pill{text-transform:none;letter-spacing:0;font-size:.8rem;font-weight:700}
  .tx-steps{counter-reset:s;list-style:none;padding:0;margin:.5rem 0}
  .tx-steps li{counter-increment:s;position:relative;padding:.5rem 0 .5rem 2.4rem;font-size:.9rem;line-height:1.5;border-bottom:1px solid var(--color-border-light)}
  .tx-steps li::before{content:counter(s);position:absolute;left:0;top:.45rem;width:1.7rem;height:1.7rem;border-radius:50%;background:var(--color-accent);color:#fff;font-weight:800;font-size:.8rem;display:grid;place-items:center}
  .tx-result-h{font-family:var(--font-display);font-weight:400;font-size:1.3rem;letter-spacing:.04em;text-transform:uppercase;margin:1.4rem 0 .3rem;color:var(--color-text-primary)}
  .tool-result{animation:txin .35s ease both}
  @keyframes txin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion:reduce){.tool-result{animation:none}}

  /* ---- Giant typography that replaces the old tool pictures ---- */
  .tool-type{--n:12;container-type:inline-size;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;gap:.1em;padding:1.4rem 1.3rem 1.3rem;min-height:15rem;border-radius:inherit;background:radial-gradient(circle at 85% 12%,#fff 0%,rgba(255,255,255,0) 38%),linear-gradient(150deg,#fff5f8 0%,#fbe0e8 55%,#f6c9d6 100%);color:var(--color-text-primary)}
  .tool-type::before{content:'';position:absolute;inset:.7rem;border:1.5px solid rgba(201,162,83,.55);border-radius:calc(var(--radius-lg,24px) - .4rem);pointer-events:none}
  .tool-type-kicker{position:relative;font-family:var(--font-body);font-weight:800;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--color-gold-dark);margin-bottom:.35rem}
  .tool-type-line{position:relative;font-family:var(--font-display);font-weight:400;text-transform:uppercase;line-height:.92;letter-spacing:.01em;font-size:clamp(2.1rem,13vw,3.6rem);font-size:min(25cqw,calc(188cqw / var(--n)));white-space:nowrap;color:var(--color-text-primary)}
  .tool-type-line.is-accent{color:var(--color-accent)}
  .tool-type-line.is-small{color:var(--color-text-primary);opacity:.92}
  .tool-type-script{position:relative;font-family:var(--font-script);font-size:clamp(1.3rem,6vw,1.8rem);color:var(--color-accent-dark);margin-top:.5rem;line-height:1.1}
  .card-img .tool-type,.card-img-link .tool-type{border-radius:0}
  .tool-type-hero{border-radius:0;min-height:13rem;margin:0;max-width:none}
  .article-hero-img .tool-type{display:flex}
  `;
  const style = document.createElement('style');
  style.id = 'hdp-tools-css';
  style.textContent = css;
  document.head.appendChild(style);
}

/* The giant-type "picture" for a tool. The same markup is written
   into the homepage cards by scripts/build.mjs. */
function typeBlockHtml(typo, extraClass = '') {
  if (!typo || !Array.isArray(typo.lines)) return '';
  const longest = Math.max(...typo.lines.map((l) => l.length));
  return `
    <div class="tool-type ${extraClass}" style="--n:${longest}" aria-hidden="true">
      <span class="tool-type-kicker">${esc(typo.kicker || 'Free tool')}</span>
      ${typo.lines
        .map((line, i) => {
          const cls = i === typo.accent ? 'is-accent' : i === typo.lines.length - 1 && typo.lines.length > 2 ? 'is-small' : '';
          return `<span class="tool-type-line ${cls}" style="--n:${Math.max(line.length, 5)}">${esc(line)}</span>`;
        })
        .join('')}
      ${typo.script ? `<span class="tool-type-script">${esc(typo.script)}</span>` : ''}
    </div>`;
}

// Replace the picture at the top of a tool page with the big typography.
function swapHeroForTypography(item) {
  if (!item || !item.typo) return;
  const hero = document.querySelector('.article-hero-img, .editorial-cover');
  if (!hero) return;
  hero.innerHTML = typeBlockHtml(item.typo, 'tool-type-hero');
  hero.setAttribute('data-typo', 'true');
}

/* =============================================
   SHARED BUILDING BLOCKS
   ============================================= */

function scoreBlock(label, score, tierLabels) {
  const s = clamp(Math.round(score), 0, 100);
  const tiers = tierLabels || ['Early days', 'Building', 'Strong'];
  const tier = s >= 80 ? tiers[2] : s >= 55 ? tiers[1] : tiers[0];
  return `
    <div class="tool-score">
      <div class="tool-score-ring" style="--pct:${s}">
        <span>${s}<small>/100</small></span>
      </div>
      <div>
        <p class="tool-score-label">${label}</p>
        <p class="tool-score-tier">${tier}</p>
      </div>
    </div>`;
}

function listBlock(title, icon, items) {
  if (!items || !items.length) return '';
  return `
    <div class="tool-list-block">
      <p class="tool-list-title">${icon} ${title}</p>
      <ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>
    </div>`;
}

function bigSis(text) {
  return `<div class="big-sis-box">💖 <strong>Big Sis Advice:</strong> ${text}</div>`;
}

function callout(html, kind = '') {
  return `<div class="tx-callout ${kind}">${html}</div>`;
}

function statGrid(stats) {
  return `<div class="tx-stat-grid">${stats
    .map((s) => `<div class="tx-stat"><span>${s.label}</span><strong>${s.value}</strong>${s.note ? `<em>${s.note}</em>` : ''}</div>`)
    .join('')}</div>`;
}

function barRow(label, valueText, pctWidth, note = '', tone = '') {
  return `
    <div class="tx-bar-row">
      <div class="tx-bar-head"><span>${label}</span><span>${valueText}</span></div>
      <div class="tx-bar"><i class="${tone}" style="width:${clamp(pctWidth, 0, 100)}%"></i></div>
      ${note ? `<small>${note}</small>` : ''}
    </div>`;
}

function recommendations(ids) {
  const items = ids.map((id) => findItemById(id)).filter(Boolean);
  if (!items.length) return '';
  return `
    <div class="tool-recs">
      <p class="tool-list-title">📚 Your Recommended Reading</p>
      <div class="tool-recs-grid">
        ${items
          .map(
            (item) => `
          <a class="tool-rec-card" href="${BASE}${itemPath(item).slice(1)}">
            <img src="${item.image}" alt="" loading="lazy">
            <span>
              <strong>${esc(item.title)}</strong>
              <em>${esc(item.readTime || 'Quick read')}</em>
            </span>
          </a>`
          )
          .join('')}
      </div>
    </div>`;
}

function introBlock(title, bullets) {
  return `
    <div class="tx-intro">
      <h3>${title}</h3>
      <ul>${bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
      <p class="tx-privacy">🔒 Everything you type stays in your own browser. Nothing is sent or saved on our side.</p>
    </div>`;
}

function currencyField() {
  return `
    <label>Your currency
      <select id="t-currency">
        ${CURRENCIES.map(([code, label]) => `<option value="${code}" ${code === activeCurrency ? 'selected' : ''}>${label}</option>`).join('')}
      </select>
    </label>`;
}

function numberField(id, label, { placeholder = '', hint = '', min = 0, max = '', step = 'any', required = false } = {}) {
  return `
    <label>${label}${hint ? `<span class="tx-hint">${hint}</span>` : ''}
      <input type="number" inputmode="decimal" id="${id}" min="${min}" ${max !== '' ? `max="${max}"` : ''} step="${step}" placeholder="${placeholder}" ${required ? 'required' : ''}>
    </label>`;
}

function selectField(id, label, options, selected, hint = '') {
  return `
    <label>${label}${hint ? `<span class="tx-hint">${hint}</span>` : ''}
      <select id="${id}">
        ${options.map(([value, text]) => `<option value="${esc(value)}" ${String(value) === String(selected) ? 'selected' : ''}>${esc(text)}</option>`).join('')}
      </select>
    </label>`;
}

function textField(id, label, { placeholder = '', hint = '', required = false } = {}) {
  return `
    <label>${label}${hint ? `<span class="tx-hint">${hint}</span>` : ''}
      <input type="text" id="${id}" placeholder="${esc(placeholder)}" ${required ? 'required' : ''}>
    </label>`;
}

function textAreaField(id, label, { placeholder = '', hint = '' } = {}) {
  return `
    <label>${label}${hint ? `<span class="tx-hint">${hint}</span>` : ''}
      <textarea id="${id}" placeholder="${esc(placeholder)}"></textarea>
    </label>`;
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  }
  fallbackCopy(text);
  return Promise.resolve();
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
  } catch (_) {
    /* nothing more we can do */
  }
  ta.remove();
}

// Any element with data-copy="<text>" or data-copy-target="#id" becomes a copy button.
function wireCopyButtons(root) {
  root.querySelectorAll('[data-copy-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = root.querySelector(btn.getAttribute('data-copy-target'));
      if (!target) return;
      copyText(target.textContent.trim());
      const original = btn.textContent;
      btn.textContent = 'Copied ✓';
      setTimeout(() => (btn.textContent = original), 1800);
    });
  });
}

// Remember what was typed, restore it next visit.
function persistForm(form, key) {
  const saved = store.get(key) || {};
  const fields = form.querySelectorAll('input[id], select[id], textarea[id]');
  fields.forEach((el) => {
    if (el.type === 'checkbox' || el.type === 'radio') return;
    if (saved[el.id] !== undefined && saved[el.id] !== null) el.value = saved[el.id];
  });
  form.querySelectorAll('input[type="checkbox"][id]').forEach((el) => {
    if (saved[el.id] !== undefined) el.checked = !!saved[el.id];
  });
  form.querySelectorAll('input[type="radio"]').forEach((el) => {
    if (saved[`radio:${el.name}`] !== undefined) el.checked = String(el.value) === String(saved[`radio:${el.name}`]);
  });
  const save = () => {
    const data = {};
    fields.forEach((el) => {
      if (el.type === 'checkbox') data[el.id] = el.checked;
      else if (el.type === 'radio') {
        if (el.checked) data[`radio:${el.name}`] = el.value;
      } else data[el.id] = el.value;
    });
    store.set(key, data);
  };
  form.addEventListener('input', save);
  form.addEventListener('change', save);
  return save;
}

// Wire the currency picker so a change re-runs the tool's last result.
function wireCurrency(container, rerun) {
  const select = container.querySelector('#t-currency');
  if (!select) return;
  select.addEventListener('change', () => {
    setCurrency(select.value);
    const result = container.querySelector('#tool-result');
    if (result && !result.hidden) rerun();
  });
}

function showResult(container, html) {
  const result = container.querySelector('#tool-result');
  result.hidden = false;
  result.classList.add('tx-wide');
  result.innerHTML = html;
  wireCopyButtons(result);
  return result;
}

function scrollToResult(container) {
  const result = container.querySelector('#tool-result');
  if (result && result.scrollIntoView) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* =============================================
   TOOL 1: FREELANCE RATE CALCULATOR
   Works backwards from the money you want to KEEP, through tax,
   fees, costs, time off and unbillable time, to the hourly rate
   you must charge. Then shows what happens if you sell less than
   you plan to, and prices real projects and retainers.
   ============================================= */

const RAMP = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.9];

function rateParts(i) {
  return {
    tax: clamp(i.taxPct, 0, 60) / 100,
    fee: clamp(i.feePct, 0, 30) / 100,
    costsYear: Math.max(0, i.costsMonthly) * 12,
    weeks: clamp(52 - Math.max(0, i.weeksOff), 1, 52),
    hoursPerWeek: clamp(i.hoursPerWeek, 1, 80),
    billableShare: clamp(i.billablePct, 10, 100) / 100,
  };
}

// The lowest hourly rate that still pays you your take-home goal.
function floorRate(i) {
  const p = rateParts(i);
  const takeHomeYear = Math.max(0, i.takeHomeMonthly) * 12;
  const hours = p.weeks * p.hoursPerWeek * p.billableShare;
  const gross = (takeHomeYear / (1 - p.tax) + p.costsYear) / (1 - p.fee);
  return gross / hours;
}

export function computeRate(i) {
  const p = rateParts(i);
  const takeHomeYear = Math.max(0, i.takeHomeMonthly) * 12;
  const billableHoursYear = p.weeks * p.hoursPerWeek * p.billableShare;
  const profitNeeded = takeHomeYear / (1 - p.tax);
  const grossNeeded = (profitNeeded + p.costsYear) / (1 - p.fee);
  const minRate = grossNeeded / billableHoursYear;
  const recommended = Math.max(cleanRound(minRate * 1.1), Math.ceil(minRate));

  const scenario = (rate, sold) => {
    const revenue = rate * billableHoursYear * sold;
    const afterFees = revenue * (1 - p.fee);
    const profit = afterFees - p.costsYear;
    const keep = profit > 0 ? profit * (1 - p.tax) : profit;
    return { revenue, profit, takeHomeMonthly: keep / 12 };
  };

  const out = {
    takeHomeYear,
    costsYear: p.costsYear,
    weeks: p.weeks,
    billableHoursYear,
    billableHoursWeek: p.hoursPerWeek * p.billableShare,
    grossNeeded,
    minRate,
    recommended,
    dayRate: recommended * 6,
    halfDay: recommended * 3,
    monthlyHoursToSell: grossNeeded / recommended / 12,
    scenarios: [1, 0.75, 0.5].map((sold) => ({ sold, ...scenario(recommended, sold) })),
    planned: null,
    project: null,
  };

  if (i.plannedRate > 0) {
    out.planned = {
      rate: i.plannedRate,
      belowMin: i.plannedRate < minRate,
      full: scenario(i.plannedRate, 1),
      sevenFive: scenario(i.plannedRate, 0.75),
    };
  }

  const baseHours = i.projectHours > 0 ? i.projectHours : 10;
  if (i.projectHours > 0) {
    const price = recommended * i.projectHours * 1.2;
    out.project = { hours: i.projectHours, price, floor: minRate * i.projectHours * 1.2 };
    if (i.clientBudget > 0) {
      const effective = i.clientBudget / (i.projectHours * 1.2);
      out.project.budget = i.clientBudget;
      out.project.effective = effective;
      out.project.verdict = effective >= recommended ? 'great' : effective >= minRate ? 'ok' : 'low';
      out.project.fitHours = Math.floor((i.clientBudget / recommended / 1.2) * 2) / 2;
    }
  }

  // 1. A realistic first year: clients do not appear on day one.
  const goal = Math.max(0, i.takeHomeMonthly);
  const months = RAMP.map((sold, idx) => ({ month: idx + 1, sold, keep: scenario(recommended, 1).takeHomeMonthly * sold - (1 - sold) * 0 }));
  months.forEach((m) => {
    const revenue = recommended * (billableHoursYear / 12) * m.sold;
    const profit = revenue * (1 - p.fee) - p.costsYear / 12;
    m.keep = profit > 0 ? profit * (1 - p.tax) : profit;
  });
  let shortfall = 0;
  let reach = null;
  months.forEach((m) => {
    shortfall += Math.max(0, goal - m.keep);
    if (reach === null && m.keep >= goal * 0.98) reach = m.month;
  });
  out.ramp = { months, shortfall, reach, savings: Math.max(0, i.savings || 0) };
  out.ramp.covered = out.ramp.savings >= shortfall;
  out.ramp.monthsCovered = goal > 0 && out.ramp.savings > 0 ? Math.floor(out.ramp.savings / goal) : 0;

  // 2. Which levers lower the rate you need to charge?
  const base = { takeHomeMonthly: i.takeHomeMonthly, costsMonthly: i.costsMonthly, taxPct: i.taxPct, feePct: i.feePct, weeksOff: i.weeksOff, hoursPerWeek: i.hoursPerWeek, billablePct: i.billablePct };
  const lever = (label, change, over) => {
    const r = floorRate({ ...base, ...over });
    return { label, change, rate: r, saves: minRate - r };
  };
  out.levers = [
    lever('Bill 10 points more of your time', '+10% billable', { billablePct: Math.min(95, i.billablePct + 10) }),
    lever('Cut business costs by 20%', '-20% costs', { costsMonthly: i.costsMonthly * 0.8 }),
    lever('Aim for 10% less take-home', '-10% goal', { takeHomeMonthly: i.takeHomeMonthly * 0.9 }),
    lever('Work 5 more hours a week', '+5 hours', { hoursPerWeek: Math.min(80, i.hoursPerWeek + 5) }),
  ]
    .filter((l) => l.saves > 0.005)
    .sort((a, b) => b.saves - a.saves);

  // 3. Three packages anyone can say yes to.
  const tiers = [
    { name: 'Starter', hours: Math.max(1, Math.round(baseHours * 0.6)), scope: 'The essentials. One round of changes.' },
    { name: 'Standard', hours: baseHours, scope: 'Full scope. Two rounds of changes.' },
    { name: 'Premium', hours: Math.max(2, Math.round(baseHours * 1.6)), scope: 'Full scope plus extras. Three rounds. Priority turnaround.' },
  ];
  out.packages = tiers.map((t) => ({ ...t, price: cleanRound(recommended * t.hours * 1.2) }));

  // 4. Why fixed prices beat hourly billing as you get faster.
  out.speed = [0, 0.25, 0.5].map((faster) => ({
    faster,
    hourlyIncome: recommended * baseHours * (1 - faster),
    fixedIncome: recommended * baseHours * 1.2,
    effective: (recommended * baseHours * 1.2) / (baseHours * (1 - faster)),
  }));
  out.baseHours = baseHours;

  // 5. A raise ladder tied to proof, not to the calendar.
  out.ladder = [
    { when: 'Now', rise: 0, trigger: 'Start here and quote it with confidence' },
    { when: 'After 3 happy clients', rise: 0.1, trigger: 'You have testimonials and a clear niche' },
    { when: 'After 6 months, or when you are 80% booked', rise: 0.2, trigger: 'If nobody blinks at your price, it is too low' },
    { when: 'After a year of results', rise: 0.35, trigger: 'You have case studies and referrals' },
  ].map((s) => ({ ...s, rate: cleanRound(recommended * (1 + s.rise)) }));

  // 6. Against the market, if you know it.
  if (i.marketLow > 0 && i.marketHigh >= i.marketLow) {
    const span = i.marketHigh - i.marketLow || 1;
    const pos = ((recommended - i.marketLow) / span) * 100;
    out.market = { low: i.marketLow, high: i.marketHigh, pos, where: recommended < i.marketLow ? 'below' : recommended > i.marketHigh ? 'above' : pos < 40 ? 'lower' : pos < 75 ? 'middle' : 'upper' };
  }

  // 7. Cash-flow cushion for late payers.
  out.reserve = goal + Math.max(0, i.costsMonthly);
  return out;
}

function freelanceRateTool(container) {
  container.innerHTML = `
    ${introBlock('Freelance Rate Calculator', [
      '<strong>Who it is for:</strong> anyone pricing a service for the first time, or anyone who suspects they are undercharging.',
      '<strong>What you get:</strong> the minimum rate you can afford, the rate to actually quote, day and retainer prices, a project price check and a reality table for slow months.',
      '<strong>What it will not do:</strong> tell you what the market pays. Use it to know your floor, then compare with what clients in your market pay.',
    ])}
    <form class="tool-widget tx-wide" id="tool-form">
      ${currencyField()}
      <p class="tx-section-title">1. The life you are paying for</p>
      ${numberField('t-takehome', 'Money you want to KEEP each month', { placeholder: '2000', required: true, hint: 'After tax and business costs. This is your take-home pay.' })}
      ${numberField('t-costs', 'Business costs each month', { placeholder: '80', hint: 'Software, data and internet, equipment, workspace, courses, insurance. Add them up, even the small ones.' })}
      <div class="tx-row">
        ${numberField('t-tax', 'Tax to set aside (%)', { placeholder: '20', max: 60, hint: 'Rules differ by country. Check yours. 15 to 30 is a common starting guess.' })}
        ${numberField('t-fees', 'Platform and payment fees (%)', { placeholder: '3', max: 30, hint: 'Marketplace cuts, card or transfer fees, currency conversion.' })}
      </div>
      <p class="tx-section-title">2. The time you really have</p>
      <div class="tx-row">
        ${numberField('t-weeksoff', 'Weeks off per year', { placeholder: '6', max: 30, hint: 'Holidays, sick days, public holidays, slow weeks.' })}
        ${numberField('t-hours', 'Hours you will work per week', { placeholder: '30', max: 80, required: true })}
      </div>
      ${selectField(
        't-billable',
        'How much of that time can you bill to clients?',
        [
          ['50', '50%: just starting, lots of admin and finding clients'],
          ['60', '60%: usual for the first year'],
          ['70', '70%: steady client flow'],
          ['80', '80%: very efficient, rarely realistic early on'],
        ],
        '60',
        'Replying to messages, invoicing, pitching and learning are real work that nobody pays for.'
      )}
      <p class="tx-section-title">3. Optional checks</p>
      <div class="tx-row">
        ${numberField('t-planned', 'A rate you are charging or considering', { placeholder: '15', hint: 'Per hour. We will test it against your goal.' })}
        ${numberField('t-projhours', 'A project you want to price: hours it takes', { placeholder: '10' })}
      </div>
      ${numberField('t-budget', 'What the client says they can pay for that project', { placeholder: '200', hint: 'Leave empty if you have no budget yet.' })}
      <p class="tx-section-title">4. Your runway and your market</p>
      ${numberField('t-savings', 'Savings you can live on while clients start to arrive', { placeholder: '3000', hint: 'Clients do not appear overnight. We will show how much cushion the first months need.' })}
      <div class="tx-row">
        ${numberField('t-mlow', 'What similar freelancers charge: low (per hour)', { placeholder: '20', hint: 'From job posts, marketplaces, other freelancers.' })}
        ${numberField('t-mhigh', 'What similar freelancers charge: high (per hour)', { placeholder: '45' })}
      </div>
      <button class="btn btn-primary" type="submit">Work Out My Rate</button>
    </form>
    <div class="tool-result" id="tool-result" hidden></div>
  `;

  const form = container.querySelector('#tool-form');
  persistForm(form, 'hdp-tool-freelance-rate');

  const compute = () => {
    const input = {
      takeHomeMonthly: readNum(container, 't-takehome'),
      costsMonthly: readNum(container, 't-costs'),
      taxPct: readNum(container, 't-tax', 20),
      feePct: readNum(container, 't-fees', 3),
      weeksOff: readNum(container, 't-weeksoff', 6),
      hoursPerWeek: readNum(container, 't-hours', 30),
      billablePct: readNum(container, 't-billable', 60),
      plannedRate: readNum(container, 't-planned'),
      projectHours: readNum(container, 't-projhours'),
      clientBudget: readNum(container, 't-budget'),
      savings: readNum(container, 't-savings'),
      marketLow: readNum(container, 't-mlow'),
      marketHigh: readNum(container, 't-mhigh'),
    };
    return { input, out: computeRate(input) };
  };

  const render = () => {
    const { input, out } = compute();
    const strengths = [];
    const watch = [];

    if (input.billablePct <= 65) strengths.push('You are planning for unbillable time. That is what keeps freelancers from quietly underpricing themselves.');
    if (input.weeksOff >= 4) strengths.push(`Budgeting ${input.weeksOff} weeks off means your price already pays for rest.`);
    if (input.billablePct >= 80) watch.push('80% billable is very hard to hit, especially in your first year. Test the numbers with 60% before you rely on them.');
    if (input.weeksOff < 3) watch.push('Under 3 weeks off a year is a burnout setting. You will take the time off anyway, so price it in.');
    if (input.taxPct < 10) watch.push('Under 10% set aside for tax is risky in many countries. Check your local rules so a tax bill never surprises you.');
    if (input.costsMonthly === 0) watch.push('Zero business costs is unusual. Internet, data, software and a laptop all count, so even a small number is more honest.');
    if (out.billableHoursWeek > 35) watch.push(`Your plan needs ${out.billableHoursWeek.toFixed(0)} billable hours a week. That is a full-time load with no room for finding clients.`);
    if (!strengths.length) strengths.push('You are building the price from your real life, not from a guess. That already puts you ahead.');
    if (!watch.length) watch.push('Revisit this every 3 to 6 months. Your speed and skill grow, and your rate should grow with them.');

    let plannedHtml = '';
    if (out.planned) {
      const p = out.planned;
      const gap = input.takeHomeMonthly - p.full.takeHomeMonthly;
      plannedHtml = `
        <h4 class="tx-result-h">Your rate: ${money(p.rate, true)} per hour</h4>
        ${
          p.belowMin
            ? callout(`<strong>That rate is below your floor.</strong> If you sell every billable hour, you would keep about <strong>${money(p.full.takeHomeMonthly)}</strong> a month, which is <strong>${money(gap)}</strong> short of your goal. At 75% of hours sold it drops to ${money(p.sevenFive.takeHomeMonthly)}. Raise the rate, cut costs or work more billable hours.`, 'tx-danger')
            : callout(`<strong>That rate covers your goal on paper.</strong> Selling every billable hour you would keep about ${money(p.full.takeHomeMonthly)} a month. If you only sell 75% of your hours, that becomes ${money(p.sevenFive.takeHomeMonthly)}. Check the table below for slower months.`)
        }`;
    }

    let projectHtml = '';
    if (out.project) {
      const pr = out.project;
      projectHtml = `
        <h4 class="tx-result-h">Pricing your ${pr.hours}-hour project</h4>
        <p class="tool-result-note">Quote <strong>${money(cleanRound(pr.price))}</strong>. That is ${money(out.recommended)} an hour for ${pr.hours} hours, plus 20% for revisions, back and forth and the unexpected. Never quote only the hours you think it will take. Projects almost always run over.</p>`;
      if (pr.budget) {
        const tone = pr.verdict === 'great' ? '' : pr.verdict === 'ok' ? 'tx-alert' : 'tx-danger';
        const text =
          pr.verdict === 'great'
            ? `Their budget of <strong>${money(pr.budget)}</strong> works out to about <strong>${money(pr.effective, true)} an hour</strong>, at or above your recommended rate. Say yes.`
            : pr.verdict === 'ok'
            ? `Their budget of <strong>${money(pr.budget)}</strong> works out to about <strong>${money(pr.effective, true)} an hour</strong>. That covers your floor but is under your recommended rate. Fine for a first client or a good portfolio piece, not as a habit.`
            : `Their budget of <strong>${money(pr.budget)}</strong> works out to only <strong>${money(pr.effective, true)} an hour</strong>, below the ${money(out.minRate, true)} you need. Offer a smaller scope (about ${pr.fitHours} hours of work fits their budget) instead of lowering your rate.`;
        projectHtml += callout(text, tone);
      }
    }

    let marketHtml = '';
    if (out.market) {
      const m = out.market;
      const text = {
        below: `Your rate of <strong>${money(out.recommended)}</strong> is <strong>below</strong> the ${money(m.low)} to ${money(m.high)} range you gave. Most likely your goal, costs or time are in line with what freelancers here can sustain only if you charge more elsewhere, or you are not yet counting the time you will really bill. Revisit your take-home goal or your billable hours.`,
        lower: `Your rate sits in the <strong>lower part</strong> of the market range (${money(m.low)} to ${money(m.high)}). That is a sensible place to start while you build proof.`,
        middle: `Your rate sits in the <strong>middle</strong> of the market range (${money(m.low)} to ${money(m.high)}). A fair, confident place to be.`,
        upper: `Your rate sits in the <strong>upper part</strong> of the range (${money(m.low)} to ${money(m.high)}). You will need proof, a clear niche and strong results to justify it. Lead with those.`,
        above: `Your rate of <strong>${money(out.recommended)}</strong> is <strong>above</strong> the ${money(m.low)} to ${money(m.high)} range. Either your goal is high for this market, or you need a more specialised, higher-paying service or client type. Check the levers below.`,
      }[m.where];
      marketHtml = `<h4 class="tx-result-h">Against the market</h4>` + callout(text, m.where === 'below' || m.where === 'above' ? 'tx-alert' : '') + barRow('Where your rate sits in the range you gave', `${Math.round(clamp(m.pos, 0, 100))}%`, clamp(m.pos, 0, 100));
    }

    const r = out.ramp;
    const rampRows = [1, 2, 3, 6, 9, 12]
      .map((n) => {
        const mo = r.months[n - 1];
        const ok = mo.keep >= input.takeHomeMonthly * 0.98;
        return `<tr class="${ok ? 'tx-good' : mo.keep < input.takeHomeMonthly * 0.4 ? 'tx-bad' : ''}"><td>Month ${n}</td><td>${pct(mo.sold * 100)}</td><td>${money(mo.keep)}</td></tr>`;
      })
      .join('');
    const rampText = r.reach
      ? `With a realistic climb, you reach your goal around <strong>month ${r.reach}</strong>. Until then you will earn less than you need, and the gap adds up to about <strong>${money(r.shortfall)}</strong> that must come from savings, a part-time job or a partner.`
      : `Even at a steady climb you do not reach your goal inside the first year. Raise the rate, cut costs or lower the goal before you start.`;
    const rampCheck = r.savings > 0
      ? r.covered
        ? `<strong>Your ${money(r.savings)} in savings covers the ramp-up.</strong> That is a real advantage: you can say no to bad clients.`
        : `<strong>Your ${money(r.savings)} in savings is ${money(r.shortfall - r.savings)} short of what the ramp-up needs.</strong> Keep part of your current income while you build, or plan a smaller first goal.`
      : 'Tell us how much savings or other income you have to see whether you can afford the first months.';
    const rampHtml = `
      <h4 class="tx-result-h">Your first year, honestly</h4>
      <p class="tool-result-note">New freelancers do not sell every hour from week one. This assumes you sell 10% of your billable hours in month one and climb to 90% by month eleven.</p>
      <table class="tx-table"><thead><tr><th>When</th><th>Hours sold</th><th>You keep</th></tr></thead><tbody>${rampRows}</tbody></table>
      ${callout(rampText + '<br><br>' + rampCheck, r.covered || !r.savings ? '' : 'tx-alert')}`;

    const leversHtml = out.levers.length
      ? `<h4 class="tx-result-h">What lowers the rate you need</h4>
         <p class="tool-result-note">Your floor is ${money(out.minRate, true)} an hour. Here is what each change does to it:</p>
         <table class="tx-table"><thead><tr><th>Change</th><th>New floor</th></tr></thead><tbody>${out.levers.map((l) => `<tr><td>${l.label}</td><td>${money(l.rate, true)} <small>(${money(-l.saves, true)})</small></td></tr>`).join('')}</tbody></table>`
      : '';

    const packagesHtml = `
      <h4 class="tx-result-h">Three packages to offer</h4>
      <p class="tool-result-note">People say yes more easily when they can choose. Prices include a 20% cushion for revisions.</p>
      <table class="tx-table"><thead><tr><th>Package</th><th>Hours</th><th>Price</th></tr></thead><tbody>${out.packages
        .map((t) => `<tr class="${t.name === 'Standard' ? 'tx-good' : ''}"><td><strong>${t.name}</strong><br><small>${t.scope}</small></td><td>${t.hours}</td><td>${money(t.price)}</td></tr>`)
        .join('')}</tbody></table>`;

    const speedHtml = `
      <h4 class="tx-result-h">Why fixed prices beat hourly billing</h4>
      <p class="tool-result-note">For a ${out.baseHours}-hour job, here is what you earn per hour actually worked as you get faster:</p>
      <table class="tx-table"><thead><tr><th>You work</th><th>Hourly billing earns</th><th>A fixed price earns</th></tr></thead><tbody>${out.speed
        .map((s) => `<tr><td>${s.faster === 0 ? 'At your normal speed' : pct(s.faster * 100) + ' faster'}</td><td>${money(s.hourlyIncome)} total</td><td>${money(s.effective)} an hour</td></tr>`)
        .join('')}</tbody></table>
      <p class="tool-result-note">Hourly billing punishes you for improving. Quote a fixed price, based on this hourly rate, and your speed becomes profit.</p>`;

    const ladderHtml = `
      <h4 class="tx-result-h">When to raise your rate</h4>
      <table class="tx-table"><thead><tr><th>When</th><th>Rate</th></tr></thead><tbody>${out.ladder
        .map((s) => `<tr><td><strong>${s.when}</strong><br><small>${s.trigger}</small></td><td>${money(s.rate)}</td></tr>`)
        .join('')}</tbody></table>
      <p class="tool-result-note">Raise your rate for new clients first. If nobody says "that is too expensive" for a while, your price is too low.</p>`;

    const scenarioRows = out.scenarios
      .map((s) => {
        const ok = s.takeHomeMonthly >= input.takeHomeMonthly * 0.98;
        return `<tr class="${ok ? 'tx-good' : s.takeHomeMonthly < input.takeHomeMonthly * 0.6 ? 'tx-bad' : ''}"><td>${pct(s.sold * 100)} of billable hours sold</td><td>${money(s.takeHomeMonthly)}</td></tr>`;
      })
      .join('');

    const html = `
      <p class="tool-result-label">Your recommended hourly rate</p>
      <p class="tx-hero-figure">${money(out.recommended, true)}<small style="font-size:.4em"> / hour</small></p>
      <p class="tool-result-note">Your absolute floor is <strong>${money(out.minRate, true)}</strong> an hour. Below that you lose money against your goal. The recommended rate adds a 10% cushion for late payments and slow weeks.</p>
      ${statGrid([
        { label: 'Day rate', value: money(out.dayRate), note: 'Based on 6 billable hours' },
        { label: 'Half-day rate', value: money(out.halfDay), note: '3 billable hours' },
        { label: 'Billable hours / week', value: out.billableHoursWeek.toFixed(1), note: `${out.weeks} working weeks a year` },
        { label: 'Revenue you must earn', value: money(out.grossNeeded), note: 'Per year, before fees, costs and tax' },
      ])}
      ${plannedHtml}
      <h4 class="tx-result-h">What if you sell less than you hope?</h4>
      <p class="tool-result-note">At ${money(out.recommended)} an hour, your take-home each month looks like this:</p>
      <table class="tx-table"><thead><tr><th>Scenario</th><th>You keep per month</th></tr></thead><tbody>${scenarioRows}</tbody></table>
      <h4 class="tx-result-h">What a month needs to look like</h4>
      <p class="tool-result-note">To hit your goal you need to sell about <strong>${out.monthlyHoursToSell.toFixed(0)} billable hours a month</strong>. That is roughly:</p>
      <ul>
        <li><strong>${Math.ceil(out.monthlyHoursToSell / 10)}</strong> clients on a 10-hour monthly retainer (${money(out.recommended * 10)} each), or</li>
        <li><strong>${Math.ceil(out.monthlyHoursToSell / 20)}</strong> clients on a 20-hour retainer (${money(out.recommended * 20)} each), or</li>
        <li><strong>${Math.ceil(out.monthlyHoursToSell / 5)}</strong> small 5-hour projects (${money(cleanRound(out.recommended * 5 * 1.2))} each).</li>
      </ul>
      ${projectHtml}
      ${marketHtml}
      ${rampHtml}
      ${leversHtml}
      ${packagesHtml}
      ${speedHtml}
      ${ladderHtml}
      ${callout(`<strong>Keep one month ahead.</strong> Clients often pay 15 to 30 days late. Hold about <strong>${money(out.reserve)}</strong> (a month of your goal plus costs) as a cushion so a late invoice never becomes a crisis. Ask for a 50% deposit and set payment due within 7 days.`)}
      ${listBlock("What's working for you", '✨', strengths)}
      ${listBlock('Watch out for this', '👀', watch)}
      <h4 class="tx-result-h">How to say your price</h4>
      <div class="tx-script" id="tx-rate-script">"My rate for this is ${money(out.recommended)} an hour, or ${money(cleanRound(out.recommended * 10 * 1.2))} for the whole project, which includes up to two rounds of revisions. I can start on [date]."</div>
      <div class="tx-actions"><button type="button" class="tx-btn-small" data-copy-target="#tx-rate-script">Copy this script</button></div>
      ${bigSis("Say your number once, clearly, then stop talking. Do not apologise for it and do not explain your rent. If a client cannot afford you, offer less work for the same hourly rate, not the same work for less.")}
      ${recommendations(['how-to-get-your-first-freelance-client', 'virtual-assistant-pretty-paid-booked', 'first-2000-online'])}
    `;
    showResult(container, html);
  };

  wireCurrency(container, render);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    render();
    scrollToResult(container);
  });
}

/* =============================================
   TOOL 2: SALARY NEGOTIATION CALCULATOR
   Places an offer inside a market range, adjusts for experience,
   demand, competing offers and proof of results, and returns an
   opening ask, a target, a floor, words to say and answers to the
   common "no" replies.
   ============================================= */

function negBase(i, over = {}) {
  const x = { ...i, ...over };
  let base = x.years < 2 ? 0.4 : x.years < 5 ? 0.55 : x.years < 10 ? 0.65 : 0.75;
  let adj = 0;
  if (x.demand === 'high') adj += 0.05;
  if (x.demand === 'low') adj -= 0.05;
  if (x.competing) adj += 0.07;
  if (x.evidence === 'strong') adj += 0.05;
  if (x.evidence === 'little') adj -= 0.05;
  return clamp(base + adj, 0.25, 0.95);
}

// Total yearly value and the real hourly rate once unpaid time is counted.
export function totalComp(x) {
  const base = Math.max(0, x.base || 0);
  const bonus = (base * Math.max(0, x.bonusPct || 0)) / 100;
  const benefits = Math.max(0, x.benefits || 0);
  const total = base + bonus + benefits;
  const weekHours = Math.max(0, x.hours || 0) + Math.max(0, x.commute || 0);
  const hourly = weekHours > 0 ? total / (weekHours * 46) : 0;
  return { base, bonus, benefits, total, weekHours, hourly };
}

export function computeNegotiation(i) {
  const annual = (x) => (i.period === 'monthly' ? x * 12 : x);
  const offer = annual(i.offer);
  let low = annual(i.low);
  let high = annual(i.high);
  if (!(high > low)) {
    const mid0 = low > 0 ? low : high;
    low = mid0 * 0.94;
    high = mid0 * 1.06;
  }
  const range = high - low;
  const mid = (low + high) / 2;

  const targetPct = negBase(i);
  const target = cleanRound(low + range * targetPct);
  let anchor = cleanRound(Math.min(high * 1.1, target + range * 0.15));
  if (anchor <= target) anchor = cleanRound(target * 1.05);
  const walk = i.walk > 0 ? annual(i.walk) : 0;
  const floor = cleanRound(Math.max(walk, offer * 1.02, low + range * 0.3));

  const position = ((offer - low) / range) * 100;
  const gap = target - offer;
  const gapPct = offer > 0 ? (gap / offer) * 100 : 0;
  const fiveYearOf = (g) => {
    let s = 0;
    if (g > 0) for (let k = 0; k < 5; k++) s += g * Math.pow(1.03, k);
    return s;
  };
  const fiveYear = fiveYearOf(gap);

  let state = 'ask';
  if (offer >= anchor) state = 'above';
  else if (offer >= target) state = 'good';
  else if (gapPct < 3) state = 'close';

  // What would raise your leverage, and by how much?
  const levers = [];
  const tryLever = (label, over, how) => {
    const t = cleanRound(low + range * negBase(i, over));
    if (t > target) levers.push({ label, delta: t - target, how });
  };
  if (!i.competing) tryLever('Have a second offer or a real interview process going', { competing: true }, 'Apply to 3 to 5 similar roles this week. Even interviews change how confident, and how credible, you sound.');
  if (i.evidence !== 'strong') tryLever('Turn your results into numbers', { evidence: 'strong' }, 'Write 3 wins as "I did X, which produced Y". Use money, time saved, volume or percentages. Estimates are fine if honest.');
  if (i.demand !== 'high') tryLever('Target employers that are actively hiring', { demand: 'high' }, 'Look for roles that have been reposted, teams that are growing, or companies that just raised money.');

  // Did they already counter? Say exactly what to do.
  let counter = null;
  if (i.counter > 0) {
    const c = annual(i.counter);
    const gain = c - offer;
    let verdict;
    let reply = null;
    if (c >= anchor * 0.99) verdict = 'excellent';
    else if (c >= target) verdict = 'good';
    else if (c >= floor) {
      verdict = 'middle';
      reply = cleanRound((c + target) / 2);
    } else verdict = 'low';
    counter = { value: c, gain, gainFiveYear: fiveYearOf(gain), verdict, reply };
  }

  // Trade-offs when salary is stuck.
  const yearGap = Math.max(0, target - offer);
  const trades = {
    signOn: cleanRound(yearGap * 1.0),
    review: cleanRound(yearGap * 0.5),
    note: 'A sign-on bonus is paid once. A higher base keeps paying every year and raises every future raise, so always ask for base first.',
  };

  // Package comparison.
  let offerPackage = null;
  let currentPackage = null;
  if (i.offerPackage) offerPackage = totalComp({ ...i.offerPackage, base: i.offerPackage.base ? annual(i.offerPackage.base) : offer });
  if (i.currentPackage && (i.currentPackage.base || 0) > 0) currentPackage = totalComp({ ...i.currentPackage, base: annual(i.currentPackage.base) });

  return { offer, low, high, mid, range, targetPct, target, anchor, floor, position, gap, gapPct, fiveYear, state, leverage: Math.round(targetPct * 100), levers, counter, trades, offerPackage, currentPackage };
}

function salaryTool(container) {
  container.innerHTML = `
    ${introBlock('Salary Negotiation Calculator', [
      '<strong>Who it is for:</strong> anyone with a job offer in hand, or about to ask for a raise.',
      '<strong>What you get:</strong> where your offer sits in the market, the number to open with, your realistic target, your floor, words to say, and replies to the usual "no".',
      '<strong>Before you start:</strong> find the market range from at least three places: job posts that show pay, salary surveys for your country, and people doing similar work.',
    ])}
    <form class="tool-widget tx-wide" id="tool-form">
      ${currencyField()}
      <div class="tx-row">
        ${selectField('t-period', 'You are thinking in', [['annual', 'Pay per year'], ['monthly', 'Pay per month']], 'annual')}
        ${selectField('t-situation', 'This is', [['offer', 'A new job offer'], ['raise', 'A raise at my current job']], 'offer')}
      </div>
      <p class="tx-section-title">1. The numbers</p>
      ${numberField('t-offer', 'The offer (or what you earn now)', { placeholder: '60000', required: true })}
      <div class="tx-row">
        ${numberField('t-low', 'Market range: low end', { placeholder: '56000', required: true, hint: 'What people with less experience in this role are paid.' })}
        ${numberField('t-high', 'Market range: high end', { placeholder: '74000', required: true, hint: 'What strong, experienced people are paid.' })}
      </div>
      ${numberField('t-walk', 'The lowest you would accept (optional)', { placeholder: '', hint: 'Your walk-away number. If you leave this empty we will suggest one.' })}
      <p class="tx-section-title">2. Your leverage</p>
      <div class="tx-row">
        ${numberField('t-years', 'Years of experience in this kind of work', { placeholder: '4', max: 45, required: true })}
        ${selectField('t-demand', 'Demand for this role right now', [['low', 'Low: few openings'], ['steady', 'Steady: normal hiring'], ['high', 'High: companies compete for people']], 'steady')}
      </div>
      <div class="tx-row">
        ${selectField('t-competing', 'Do you have another offer or a real alternative?', [['no', 'No'], ['yes', 'Yes']], 'no')}
        ${selectField('t-evidence', 'How strong is your proof of results?', [['strong', 'I have numbers: money saved or made, time cut, targets hit'], ['some', 'I have good examples but few numbers'], ['little', 'Not much yet']], 'some')}
      </div>
      <p class="tx-section-title">3. If the salary will not move, what else would you value?</p>
      <div class="tx-checks" id="t-perks">
        <label><input type="checkbox" id="perk-remote"> Remote or flexible hours</label>
        <label><input type="checkbox" id="perk-leave"> Extra leave</label>
        <label><input type="checkbox" id="perk-train"> Training budget</label>
        <label><input type="checkbox" id="perk-bonus"> Sign-on bonus</label>
        <label><input type="checkbox" id="perk-review"> Pay review in 6 months</label>
        <label><input type="checkbox" id="perk-title"> A better job title</label>
        <label><input type="checkbox" id="perk-kit"> Equipment or data allowance</label>
      </div>
      <p class="tx-section-title">4. Your proof</p>
      ${textAreaField('t-wins', 'Your biggest wins, one per line', { placeholder: 'Cut customer reply time from 2 days to 4 hours\nOnboarded 30 new clients in my first quarter', hint: 'Use numbers where you can. We will check how strong each one sounds and use the best in your email.' })}
      <p class="tx-section-title">5. Optional: has the employer already countered?</p>
      ${numberField('t-counter', 'What they offered back', { placeholder: '', hint: 'Same pay period as above. We will tell you exactly how to respond.' })}
      <details class="tx-details">
        <summary>Compare the whole package, not just the pay (optional)</summary>
        <div>
          <p class="tx-hint" style="margin-top:0">Total pay is more than salary. A job that pays less but needs 10 fewer hours a week, with no commute, can pay more per hour.</p>
          <div class="tx-row">
            ${numberField('t-bonus', 'Offer: yearly bonus (% of pay)', { placeholder: '5', max: 100 })}
            ${numberField('t-benefits', 'Offer: yearly value of benefits', { placeholder: '2000', hint: 'Health cover, pension match, allowances, per year.' })}
          </div>
          <div class="tx-row">
            ${numberField('t-hours', 'Offer: working hours per week', { placeholder: '40', max: 80 })}
            ${numberField('t-commute', 'Offer: commute hours per week', { placeholder: '5', max: 40, hint: 'Round trip, all days combined.' })}
          </div>
          <p class="tx-section-title">Your current job, to compare</p>
          <div class="tx-row">
            ${numberField('t-cbase', 'Current pay (same period)', { placeholder: '' })}
            ${numberField('t-cbonus', 'Current bonus (%)', { placeholder: '0', max: 100 })}
          </div>
          <div class="tx-row">
            ${numberField('t-cbenefits', 'Current benefits (per year)', { placeholder: '' })}
            ${numberField('t-chours', 'Current hours per week', { placeholder: '45', max: 80 })}
          </div>
          ${numberField('t-ccommute', 'Current commute hours per week', { placeholder: '8', max: 40 })}
        </div>
      </details>
      <button class="btn btn-primary" type="submit">Build My Negotiation Plan</button>
    </form>
    <div class="tool-result" id="tool-result" hidden></div>
  `;

  const form = container.querySelector('#tool-form');
  persistForm(form, 'hdp-tool-salary');

  const render = () => {
    const input = {
      period: readVal(container, 't-period', 'annual'),
      situation: readVal(container, 't-situation', 'offer'),
      offer: readNum(container, 't-offer'),
      low: readNum(container, 't-low'),
      high: readNum(container, 't-high'),
      walk: readNum(container, 't-walk'),
      years: readNum(container, 't-years'),
      demand: readVal(container, 't-demand', 'steady'),
      competing: readVal(container, 't-competing', 'no') === 'yes',
      evidence: readVal(container, 't-evidence', 'some'),
      counter: readNum(container, 't-counter'),
      offerPackage: {
        base: 0,
        bonusPct: readNum(container, 't-bonus'),
        benefits: readNum(container, 't-benefits'),
        hours: readNum(container, 't-hours'),
        commute: readNum(container, 't-commute'),
      },
      currentPackage: {
        base: readNum(container, 't-cbase'),
        bonusPct: readNum(container, 't-cbonus'),
        benefits: readNum(container, 't-cbenefits'),
        hours: readNum(container, 't-chours'),
        commute: readNum(container, 't-ccommute'),
      },
    };
    const r = computeNegotiation(input);
    const wins = readVal(container, 't-wins').split('\n').map(analyzeBullet).filter(Boolean).sort((a, z) => z.score - a.score);
    const bestWin = wins.length ? wins[0].text : '';
    const monthly = input.period === 'monthly';
    const d = (x) => money(monthly ? x / 12 : x);
    const per = monthly ? 'per month' : 'per year';
    const isRaise = input.situation === 'raise';

    const perks = [
      ['perk-remote', 'Remote or flexible hours', 'Ask for a set number of remote days, or flexible start and finish times. It costs the company little and can be worth a lot to you.'],
      ['perk-leave', 'Extra leave', 'Ask for 3 to 5 more days. Companies often say yes to leave faster than to salary.'],
      ['perk-train', 'Training budget', 'Name a real course or certificate, with its price, that makes you better at the job.'],
      ['perk-bonus', 'Sign-on bonus', 'Often easier to approve than a higher base because it is paid once. Ask for it to cover the gap between the offer and your target.'],
      ['perk-review', 'Pay review in 6 months', 'Ask for it in writing, with the result they would need to see from you.'],
      ['perk-title', 'A better job title', 'A stronger title raises your next salary. Ask whether the level, not just the title, can change.'],
      ['perk-kit', 'Equipment or data allowance', 'Ask for a laptop, a phone allowance or a home internet stipend. It is real money back in your pocket every month.'],
    ];
    const chosen = perks.filter(([id]) => container.querySelector(`#${id}`)?.checked);
    const perkList = (chosen.length ? chosen : perks.slice(0, 3)).map(([, name, how]) => `<li><strong>${name}.</strong> ${how}</li>`).join('');

    const stateText = {
      above: `<strong>This offer is already above the number we would open with.</strong> It sits at ${Math.round(r.position)}% of the market range. Say yes warmly, and spend your effort on the extras below, a pay review date and anything that is not salary.`,
      good: `<strong>This offer already meets your realistic target.</strong> You could still ask for a small bump toward ${d(r.anchor)}, but you are negotiating from comfort, not need.`,
      close: `<strong>You are within about ${Math.max(1, Math.round(r.gapPct))}% of your target.</strong> Asking for ${d(r.anchor)} is reasonable, and a small yes is likely. Do not burn goodwill over a very small gap.`,
      ask: `<strong>There is room to ask.</strong> Your offer is ${d(r.gap)} (${Math.round(r.gapPct)}%) under your realistic target, and ${Math.max(0, Math.round(r.position))}% of the way up the market range.`,
    }[r.state];

    const target = d(r.target);
    const anchor = d(r.anchor);
    const emailScript = isRaise
      ? `Hi [Manager],\n\nThank you for making time to talk about my role. Over the past [time], I have ${bestWin ? bestWin.replace(/^./, (c) => c.toLowerCase()) : '[your strongest result, with a number]'}. I have also taken on [extra responsibility].\n\nBased on this and on what comparable roles currently pay in our market, I would like to move my pay to ${anchor} ${per}. I would also like to agree what a further review would look like in 6 months.\n\nCould we find a time this week to talk it through?\n\nThank you,\n[Name]`
      : `Hi [Name],\n\nThank you again for the offer. I am genuinely excited about the role and the team.\n\nBased on my ${input.years || 'X'} years of experience, ${bestWin ? bestWin.replace(/^./, (c) => c.toLowerCase()) : '[your strongest result, with a number]'} and what comparable roles pay, I was hoping for a base of ${anchor} ${per}. Is there flexibility to get closer to that?\n\nIf we can agree the number, I am ready to accept.\n\nThank you,\n[Name]`;
    const spoken = `"I'm really keen on this. Based on my experience and what similar roles pay, I was expecting something closer to ${anchor}. Is there room to get there?"\n\nThen stop talking and let them answer first.`;

    const pushbacks = [
      ['"The budget is fixed."', `"I understand. Could we look at other parts of the package, like a sign-on bonus, extra leave, or a pay review in 6 months with clear targets?"`],
      ['"We pay everyone at this level the same."', `"That makes sense. Could my level or title reflect my experience, or could we agree a review date once I have delivered [result]?"`],
      ['"That is above our range."', `"Thank you for being open about that. What is the top of the range for this role, and what would I need to show to reach it?"`],
      ['"Let me check and get back to you."', `"Of course. Could you tell me when I can expect to hear? I would like to decide by [date]."`],
      ['"What is your current salary?"', `"I would rather focus on what this role is worth and what I would bring to it. My target for this position is ${target}." (In some places employers are not allowed to ask. Check local rules.)`],
    ];

    const chat = `Hi [Name], thanks again for the offer. I'm excited about the role. Based on my experience${bestWin ? ' and ' + bestWin.replace(/^./, (c) => c.toLowerCase()) : ''}, and what similar roles pay, I was hoping for around ${anchor} ${per}. Is there any flexibility on that?`;

    let counterHtml = '';
    if (r.counter) {
      const c = r.counter;
      const m = { excellent: 'tx-callout', good: 'tx-callout', middle: 'tx-callout tx-alert', low: 'tx-callout tx-danger' }[c.verdict];
      const text = {
        excellent: `<strong>This counter is at or above your opening ask.</strong> It adds ${d(c.gain)} ${per} to the original offer. Accept it warmly, and ask for the final terms in writing.`,
        good: `<strong>This counter reaches your realistic target.</strong> It is ${d(c.gain)} ${per} above the original offer (about ${money(c.gainFiveYear)} over five years). Accept, or make one small ask for a perk.`,
        middle: `<strong>This counter is between your floor and your target.</strong> It is a real move (${d(c.gain)} ${per} more), but there is room. Reply once with a number near <strong>${d(c.reply)}</strong>, and give them an easy yes: "If we can get to ${d(c.reply)}, I am ready to accept today."`,
        low: `<strong>This counter is below your floor.</strong> Do not accept yet. Thank them, say it is a bit below what you need, and ask for the best number they can reach, or a pay review in 6 months with clear targets.`,
      }[c.verdict];
      counterHtml = `<h4 class="tx-result-h">Their counter, decoded</h4><div class="${m}">${text}</div>`;
    }

    const leverHtml = r.levers.length
      ? `<h4 class="tx-result-h">How to raise your leverage first</h4>
         <p class="tool-result-note">If you have a few days, these change your target the most:</p>
         <table class="tx-table"><thead><tr><th>Do this</th><th>Target rises by</th></tr></thead><tbody>${r.levers
           .map((l) => `<tr><td><strong>${esc(l.label)}</strong><br><small>${esc(l.how)}</small></td><td>about ${d(l.delta)}</td></tr>`)
           .join('')}</tbody></table>`
      : '';

    const winsHtml = wins.length
      ? `<h4 class="tx-result-h">Your proof, scored</h4>
         ${wins.map((w) => `<div class="tx-details" style="padding:.6rem .9rem"><div style="display:flex;justify-content:space-between;gap:.6rem"><strong style="font-size:.9rem;line-height:1.4">${esc(w.text)}</strong><span class="tx-pill ${w.score >= 75 ? 'tx-ok' : w.score < 45 ? 'tx-miss' : ''}">${w.score}</span></div>${w.tips.length ? `<ul style="margin:.35rem 0 0;padding-left:1.1rem;font-size:.82rem;color:var(--color-text-secondary)">${w.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}</div>`).join('')}
         <p class="tool-result-note">We used your strongest line in the scripts above.</p>`
      : '';

    const tradeHtml = r.gap > 0
      ? `<h4 class="tx-result-h">If they cannot move the base</h4>
         <ul>
           <li><strong>Sign-on bonus:</strong> ask for about <strong>${money(r.trades.signOn)}</strong> to cover your first-year gap.</li>
           <li><strong>Pay review in 6 months:</strong> worth about <strong>${money(r.trades.review)}</strong> of extra pay in year one if it lands at your target.</li>
         </ul>
         <p class="tool-result-note">${r.trades.note}</p>`
      : '';

    const pkgHtml = (() => {
      const o = r.offerPackage;
      if (!o || (!o.bonus && !o.benefits && !o.weekHours)) return '';
      const c = r.currentPackage;
      const row = (label, a, b2) => `<tr><td>${label}</td><td>${a}</td><td>${b2}</td></tr>`;
      const hourlyOf = (p) => (p && p.hourly ? money(p.hourly, true) : 'add hours');
      return `<h4 class="tx-result-h">The whole package</h4>
        <table class="tx-table"><thead><tr><th></th><th>This offer</th><th>${c ? 'Current job' : ''}</th></tr></thead><tbody>
          ${row('Base pay', money(o.base), c ? money(c.base) : '')}
          ${row('Bonus', money(o.bonus), c ? money(c.bonus) : '')}
          ${row('Benefits', money(o.benefits), c ? money(c.benefits) : '')}
          ${row('<strong>Total a year</strong>', `<strong>${money(o.total)}</strong>`, c ? `<strong>${money(c.total)}</strong>` : '')}
          ${row('Hours incl. commute, per week', o.weekHours || 'n/a', c ? c.weekHours || 'n/a' : '')}
          ${row('<strong>Real pay per hour</strong>', `<strong>${hourlyOf(o)}</strong>`, c ? `<strong>${hourlyOf(c)}</strong>` : '')}
        </tbody></table>
        <p class="tool-result-note">Real pay per hour counts unpaid commute and assumes about 46 working weeks. A job that pays less on paper can win here.</p>`;
    })();

    const timeline = [
      ['Today', 'Say thank you, ask for the offer in writing and ask for 2 to 3 days to review it.'],
      ['Day 1', 'Gather your numbers and your three best wins. Fix any red flags in this plan.'],
      ['Day 2', 'Send your ask by email, then follow up by phone or video if they prefer to talk.'],
      ['Day 3', 'Expect a reply, a counter or a "let me check". Silence for 48 hours is normal. Follow up once, politely.'],
      ['After', 'Get the final terms in writing before you resign from anything, then say yes with real enthusiasm.'],
    ];

    const html = `
      ${scoreBlock('Your leverage', r.leverage, ['Limited', 'Solid', 'Strong'])}
      ${callout(stateText, r.state === 'ask' ? '' : r.state === 'close' ? 'tx-alert' : '')}
      ${statGrid([
        { label: 'Open with', value: anchor, note: `Your first ask, ${per}` },
        { label: 'Realistic target', value: target, note: 'Where you will likely land' },
        { label: 'Your floor', value: d(r.floor), note: 'Do not accept less without a good reason' },
        { label: 'Market middle', value: d(r.mid), note: `Range ${d(r.low)} to ${d(r.high)}` },
      ])}
      ${barRow('Where the offer sits in the market range', `${Math.round(r.position)}%`, clamp(r.position, 0, 100), `Offer ${d(r.offer)} · Low ${d(r.low)} · High ${d(r.high)}`, r.position < 35 ? 'tx-danger' : r.position < 55 ? 'tx-warn' : '')}
      ${r.gap > 0 ? callout(`<strong>Why it matters:</strong> closing a gap of ${d(r.gap)} ${per} is worth about <strong>${money(r.fiveYear)}</strong> over five years, if your pay rises 3% a year from a higher base. The first number you accept sets the base for every raise after it.`) : ''}
      ${counterHtml}
      ${leverHtml}
      <h4 class="tx-result-h">Say it by email</h4>
      <div class="tx-script" id="tx-sal-email">${esc(emailScript)}</div>
      <div class="tx-actions"><button type="button" class="tx-btn-small" data-copy-target="#tx-sal-email">Copy email</button></div>
      <h4 class="tx-result-h">Say it out loud</h4>
      <div class="tx-script" id="tx-sal-spoken">${esc(spoken)}</div>
      <div class="tx-actions"><button type="button" class="tx-btn-small" data-copy-target="#tx-sal-spoken">Copy script</button></div>
      <h4 class="tx-result-h">Or send it as a short message</h4>
      <div class="tx-script" id="tx-sal-chat">${esc(chat)}</div>
      <div class="tx-actions"><button type="button" class="tx-btn-small" data-copy-target="#tx-sal-chat">Copy message</button></div>
      ${winsHtml}
      <h4 class="tx-result-h">If they say no</h4>
      ${pushbacks.map(([q, a]) => `<details class="tx-details"><summary>${esc(q)}</summary><div>${esc(a)}</div></details>`).join('')}
      ${tradeHtml}
      <h4 class="tx-result-h">If the salary will not move, ask for these</h4>
      <ul>${perkList}</ul>
      ${pkgHtml}
      <h4 class="tx-result-h">Your next five days</h4>
      <ol class="tx-steps">${timeline.map(([when, what]) => `<li><strong>${when}.</strong> ${what}</li>`).join('')}</ol>
      <h4 class="tx-result-h">Before you hit send</h4>
      <ol class="tx-steps">
        <li>Write down 2 or 3 results with numbers, and say them in the first sentence of your ask.</li>
        <li>Ask for the offer in writing, and do not accept on the call. "Thank you, may I confirm by [date]?" is a complete sentence.</li>
        <li>Negotiate the whole package, but only after you have a number on the table.</li>
        <li>Stay warm. You are asking to work out a fair deal, not to win a fight.</li>
        <li>Get the final agreement in writing before you resign from anything.</li>
      </ol>
      ${listBlock('Honest limits', '👀', ['This tool estimates from the range you give it. If the range is wrong, the answer is wrong, so check at least three sources.', 'Pay norms and what employers may ask you differ by country. Check local rules.'])}
      ${bigSis('Anchor near the top of your range, say it out loud with confidence, then stop talking. The next person to speak usually concedes something.')}
      ${recommendations(['linkedin-international-opportunity', 'how-to-choose-a-career', 'budget-like-a-queen'])}
    `;
    showResult(container, html);
  };

  wireCurrency(container, render);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    render();
    scrollToResult(container);
  });
}

/* =============================================
   TOOL 3: PERSONAL BUDGET PLANNER
   Starts from what you actually spend, not a fixed 50/30/20.
   Compares you with that rule of thumb, builds a split that fits
   your real costs, sizes your emergency fund, times your debt
   payoff and gives the order to do things in.
   ============================================= */

export function computeBudget(i) {
  const income = Math.max(0, i.income);
  const needs = i.housing + i.food + i.transport + i.debtMin + i.insurance + i.otherEssentials;
  const wants = i.wants;
  const saving = i.saving;
  const lumpyMonthly = Math.max(0, i.lumpy || 0) / 12;
  const spent = needs + wants + saving + lumpyMonthly;
  const leftover = income - spent;
  const needsPct = income > 0 ? (needs / income) * 100 : 0;
  const wantsPct = income > 0 ? (wants / income) * 100 : 0;
  const savePct = income > 0 ? (saving / income) * 100 : 0;

  // A split that fits the real cost of living, not an ideal one.
  let tWants;
  let tSave;
  if (needsPct <= 50) {
    tWants = i.goal === 'debt' || i.goal === 'fund' ? 25 : 30;
    tSave = 100 - needsPct - tWants;
    tSave = Math.max(tSave, 20);
  } else if (needsPct <= 70) {
    tSave = Math.max(10, Math.min(20, 100 - needsPct - 10));
    tWants = Math.max(0, 100 - needsPct - tSave);
  } else if (needsPct < 100) {
    tSave = Math.max(0, Math.min(5, 100 - needsPct));
    tWants = Math.max(0, 100 - needsPct - tSave);
  } else {
    tSave = 0;
    tWants = 0;
  }

  const monthsTarget = i.variable ? 6 : 3;
  const essentialsForFund = Math.max(needs, 1);
  const fundTarget = needs * monthsTarget;
  const fundMonthsHave = needs > 0 ? i.emergency / essentialsForFund : 0;
  const starterTarget = needs; // one month of essentials
  const plannedSave = Math.max(saving, (income * tSave) / 100);
  const monthsToStarter = i.emergency >= starterTarget ? 0 : plannedSave > 0 ? Math.ceil((starterTarget - i.emergency) / plannedSave) : null;
  const monthsToFund = i.emergency >= fundTarget ? 0 : plannedSave > 0 ? Math.ceil((fundTarget - i.emergency) / plannedSave) : null;

  // Debt: months to clear at the minimum payment, and with extra.
  const debt = { balance: Math.max(0, i.debt), apr: Math.max(0, i.apr), pay: Math.max(0, i.debtMin) };
  const payoff = (balance, apr, pay) => {
    if (balance <= 0) return { months: 0, interest: 0, never: false };
    const r = apr / 100 / 12;
    if (pay <= 0) return { months: null, interest: null, never: true };
    if (r === 0) {
      const m = Math.ceil(balance / pay);
      return { months: m, interest: 0, never: false };
    }
    if (pay <= balance * r) return { months: null, interest: null, never: true };
    const n = Math.ceil(-Math.log(1 - (r * balance) / pay) / Math.log(1 + r));
    return { months: n, interest: pay * n - balance, never: false };
  };
  const extra = Math.max(0, Math.min(leftover > 0 ? leftover : 0, (income * tSave) / 100) * 0.5);
  const base = payoff(debt.balance, debt.apr, debt.pay);
  const faster = debt.balance > 0 ? payoff(debt.balance, debt.apr, debt.pay + extra) : base;

  // Several debts? Compare the two famous strategies against paying minimums only.
  const debtRows = (i.debts || []).filter((d) => d.balance > 0);
  let debtPlan = null;
  if (debtRows.length) {
    const extraPay = i.extraDebt > 0 ? i.extraDebt : extra;
    const rows = debtRows.map((d, idx) => ({ name: d.name || `Debt ${idx + 1}`, balance: d.balance, apr: d.apr, min: d.min }));
    debtPlan = {
      extra: extraPay,
      minimum: simulateDebts(rows, 0, 'avalanche'),
      avalanche: simulateDebts(rows, extraPay, 'avalanche'),
      snowball: simulateDebts(rows, extraPay, 'snowball'),
      totalBalance: rows.reduce((s, d) => s + d.balance, 0),
    };
  }

  // What if income drops, and what is the fastest fix?
  const stressIncome = income * 0.8;
  const stress = {
    leftover: stressIncome - spent,
    drop: income * 0.2,
    fundMonthsFullLoss: needs > 0 ? i.emergency / needs : 0,
  };
  const cut = (label, amount, how) => ({ label, amount, how });
  const levers = [
    cut('Trim wants by 20%', wants * 0.2, 'Pick the 3 biggest "wants" and pause one of them for a month.'),
    cut('Lower your housing cost by 5%', i.housing * 0.05, 'Ask your landlord, a flatmate or your provider. Even small cuts repeat every month.'),
    cut('Cut food spending by 10%', i.food * 0.1, 'Plan meals, buy staples in bulk and shop with a list.'),
    cut('Cut transport by 10%', i.transport * 0.1, 'Share rides, combine trips or switch route or mode.'),
    cut('Cancel two unused subscriptions', Math.min(wants * 0.08, 30), 'Check your bank or mobile money statement for anything you have not used in 60 days.'),
  ].filter((l) => l.amount > 0).sort((a, z) => z.amount - a.amount);

  // A savings goal with a date.
  let goalPlan = null;
  if (i.goalAmount > 0 && i.goalMonths > 0) {
    const monthly = i.goalAmount / i.goalMonths;
    goalPlan = { monthly, amount: i.goalAmount, months: i.goalMonths, fits: leftover >= monthly, fromLeftover: Math.max(0, leftover) , shortBy: Math.max(0, monthly - Math.max(0, leftover)), monthsAtLeftover: leftover > 0 ? Math.ceil(i.goalAmount / leftover) : null };
  }

  // Health score: cash flow, savings rate, emergency cover, debt load.
  const cash = leftover >= 0 ? 35 : clamp(35 + (leftover / Math.max(income, 1)) * 100, 0, 35);
  const savingsScore = clamp((savePct / 15) * 25, 0, 25);
  const fundScore = clamp((fundMonthsHave / monthsTarget) * 25, 0, 25);
  const debtLoad = income > 0 ? ((debt.balance || debtPlan?.totalBalance || 0) / (income * 12)) * 100 : 0;
  const debtScore = debt.balance <= 0 && !debtPlan ? 15 : clamp(15 - debtLoad / 4 - (debt.apr > 20 ? 3 : 0), 0, 15);
  const health2 = Math.round(cash + savingsScore + fundScore + debtScore);

  return {
    income, needs, wants, saving, spent, leftover, needsPct, wantsPct, savePct, lumpyMonthly,
    tWants, tSave, tNeeds: needsPct,
    monthsTarget, fundTarget, fundMonthsHave, starterTarget, monthsToStarter, monthsToFund, plannedSave,
    debt, base, faster, extra, health: health2, debtPlan, stress, levers, goalPlan,
  };
}

// Month-by-month payoff of several debts. Strategy 'avalanche' pays the highest
// interest first (cheapest). 'snowball' pays the smallest balance first (fastest wins).
export function simulateDebts(list, extra, strategy) {
  const debts = list.map((d) => ({ name: d.name, bal: d.balance, r: Math.max(0, d.apr) / 100 / 12, apr: d.apr, min: Math.max(0, d.min), done: false }));
  let month = 0;
  let interest = 0;
  const order = [];
  while (debts.some((d) => d.bal > 0.005) && month < 600) {
    month++;
    debts.forEach((d) => {
      if (d.bal > 0) {
        const add = d.bal * d.r;
        d.bal += add;
        interest += add;
      }
    });
    let pool = extra;
    debts.forEach((d) => {
      if (d.bal > 0) {
        const pay = Math.min(d.min, d.bal);
        d.bal -= pay;
      }
    });
    const targets = debts.filter((d) => d.bal > 0.005).sort(strategy === 'snowball' ? (a, z) => a.bal - z.bal : (a, z) => z.apr - a.apr);
    for (const t of targets) {
      if (pool <= 0) break;
      const pay = Math.min(pool, t.bal);
      t.bal -= pay;
      pool -= pay;
    }
    debts.forEach((d) => {
      if (d.bal <= 0.005 && !d.done) {
        d.done = true;
        order.push({ name: d.name, month });
      }
    });
  }
  const stuck = debts.some((d) => d.bal > 0.005);
  return { months: stuck ? null : month, interest, order, stuck };
}

function budgetTool(container) {
  container.innerHTML = `
    ${introBlock('Personal Budget Planner', [
      '<strong>Who it is for:</strong> anyone who wants their money to make sense, whether you are in debt, saving, or just surviving the month.',
      '<strong>What you get:</strong> where your money goes, a split that fits your real costs, an emergency fund target, a debt payoff timeline and the order to do things in.',
      '<strong>Tip:</strong> use real numbers from your bank or mobile money history, not guesses. Round up what you are unsure about.',
    ])}
    <form class="tool-widget tx-wide" id="tool-form">
      ${currencyField()}
      <p class="tx-section-title">1. Money coming in</p>
      ${numberField('t-income', 'Monthly take-home income', { placeholder: '3200', required: true, hint: 'After tax. If it changes month to month, use your lowest month from the last six.' })}
      ${selectField('t-incometype', 'Is your income', [['steady', 'Steady: the same most months'], ['variable', 'Variable: freelance, commission or seasonal']], 'steady')}
      <p class="tx-section-title">2. Essentials you must pay</p>
      <div class="tx-row">
        ${numberField('t-housing', 'Housing and utilities', { placeholder: '1100', hint: 'Rent or mortgage, power, water, gas.' })}
        ${numberField('t-food', 'Food and groceries', { placeholder: '400' })}
      </div>
      <div class="tx-row">
        ${numberField('t-transport', 'Transport', { placeholder: '150' })}
        ${numberField('t-debtmin', 'Debt payments (minimums)', { placeholder: '120', hint: 'Cards, loans, buy-now-pay-later.' })}
      </div>
      <div class="tx-row">
        ${numberField('t-insurance', 'Insurance and health', { placeholder: '80' })}
        ${numberField('t-other', 'Other essentials', { placeholder: '200', hint: 'Phone and data, childcare, school fees, family support.' })}
      </div>
      <p class="tx-section-title">3. Wants and saving</p>
      <div class="tx-row">
        ${numberField('t-wants', 'Wants: eating out, fun, subscriptions, shopping', { placeholder: '350' })}
        ${numberField('t-saving', 'What you save or invest each month', { placeholder: '200' })}
      </div>
      <p class="tx-section-title">4. Where you stand</p>
      <div class="tx-row">
        ${numberField('t-emergency', 'Emergency savings you have right now', { placeholder: '500', hint: 'Money you could reach within a day.' })}
        ${numberField('t-debt', 'Total debt (not counting a mortgage)', { placeholder: '4000' })}
      </div>
      <div class="tx-row">
        ${numberField('t-apr', 'Average yearly interest on that debt (%)', { placeholder: '22', hint: 'Check your statement. If unsure, 20 is a cautious guess for cards.' })}
        ${selectField('t-goal', 'Your main goal right now', [['stay', 'Stay afloat and stop stressing'], ['fund', 'Build an emergency fund'], ['debt', 'Clear my debt'], ['goal', 'Save for something big'], ['invest', 'Start investing or a business']], 'stay')}
      </div>
      ${numberField('t-lumpy', 'Yearly costs that arrive in lumps (total for the year)', { placeholder: '1200', hint: 'School fees, insurance, repairs, gifts, holidays, renewals. We spread them across 12 months so they never ambush you.' })}
      <details class="tx-details">
        <summary>Have more than one debt? Add them here for a payoff strategy (optional)</summary>
        <div>
          <p class="tx-hint" style="margin-top:0">Enter up to three. We compare the two famous strategies and show you which saves more money.</p>
          ${[1, 2, 3]
            .map(
              (n) => `<p class="tx-section-title" style="margin-top:.6rem">Debt ${n}</p>
          <div class="tx-row">
            ${textField(`t-d${n}name`, 'Name', { placeholder: n === 1 ? 'Credit card' : n === 2 ? 'Phone loan' : 'Family loan' })}
            ${numberField(`t-d${n}bal`, 'Balance', { placeholder: '' })}
          </div>
          <div class="tx-row">
            ${numberField(`t-d${n}apr`, 'Yearly interest (%)', { placeholder: '20' })}
            ${numberField(`t-d${n}min`, 'Minimum payment per month', { placeholder: '' })}
          </div>`
            )
            .join('')}
          ${numberField('t-extradebt', 'Extra you could put toward debt each month', { placeholder: '', hint: 'Leave empty and we will suggest an amount from your budget.' })}
        </div>
      </details>
      <details class="tx-details">
        <summary>Saving for something specific? (optional)</summary>
        <div>
          <div class="tx-row">
            ${numberField('t-goalamt', 'How much do you need?', { placeholder: '2500' })}
            ${numberField('t-goalmonths', 'In how many months?', { placeholder: '10', max: 240 })}
          </div>
        </div>
      </details>
      <button class="btn btn-primary" type="submit">Build My Money Plan</button>
    </form>
    <div class="tool-result" id="tool-result" hidden></div>
  `;

  const form = container.querySelector('#tool-form');
  persistForm(form, 'hdp-tool-budget');

  const render = () => {
    const input = {
      income: readNum(container, 't-income'),
      variable: readVal(container, 't-incometype', 'steady') === 'variable',
      housing: readNum(container, 't-housing'),
      food: readNum(container, 't-food'),
      transport: readNum(container, 't-transport'),
      debtMin: readNum(container, 't-debtmin'),
      insurance: readNum(container, 't-insurance'),
      otherEssentials: readNum(container, 't-other'),
      wants: readNum(container, 't-wants'),
      saving: readNum(container, 't-saving'),
      emergency: readNum(container, 't-emergency'),
      debt: readNum(container, 't-debt'),
      apr: readNum(container, 't-apr', 20),
      goal: readVal(container, 't-goal', 'stay'),
      lumpy: readNum(container, 't-lumpy'),
      extraDebt: readNum(container, 't-extradebt'),
      goalAmount: readNum(container, 't-goalamt'),
      goalMonths: readNum(container, 't-goalmonths'),
      debts: [1, 2, 3].map((n) => ({ name: readVal(container, `t-d${n}name`), balance: readNum(container, `t-d${n}bal`), apr: readNum(container, `t-d${n}apr`, 20), min: readNum(container, `t-d${n}min`) })),
    };
    const r = computeBudget(input);
    const strengths = [];
    const watch = [];

    if (r.leftover >= 0) strengths.push(`You are not overspending: ${money(r.leftover)} a month is unassigned. Give it a job before the month starts.`);
    if (r.savePct >= 15) strengths.push(`You already save ${pct(r.savePct)} of your income, which is a strong habit.`);
    if (r.fundMonthsHave >= r.monthsTarget) strengths.push('Your emergency fund already covers your target. That is real stability.');
    if (input.debt <= 0) strengths.push('No consumer debt means your future income is not pre-spent.');
    if (r.leftover < 0) watch.push(`You are spending ${money(-r.leftover)} more than you earn each month. That gap is being paid by debt or savings, and it needs fixing first.`);
    if (r.needsPct > 60) watch.push(`Essentials take ${pct(r.needsPct)} of your income. That is common when rent is high, and it means the biggest wins are on the income side or the housing side, not the coffee.`);
    if (r.wantsPct > 35) watch.push(`Wants take ${pct(r.wantsPct)} of your income. Trimming this one category is the fastest lever you control.`);
    if (r.fundMonthsHave < 1 && r.needs > 0) watch.push('You have under one month of essentials saved. One bad week could force you into debt.');
    if (input.debt > 0 && input.apr >= 20) watch.push(`Debt at ${input.apr}% a year costs about ${money((input.debt * input.apr) / 100 / 12)} in interest every month. That is your money going to someone else.`);
    if (!strengths.length) strengths.push('You wrote the real numbers down. Most people never do, and it is where every plan starts.');
    if (!watch.length) watch.push('Review this once a month, and again whenever your income or rent changes.');

    const tone = (p, good, warn) => (p > warn ? 'tx-danger' : p > good ? 'tx-warn' : '');
    const bars = [
      barRow('Essentials', `${money(r.needs)} · ${pct(r.needsPct)}`, r.needsPct, 'A common guide is about 50% or less. High-cost areas often run higher.', tone(r.needsPct, 50, 70)),
      barRow('Wants', `${money(r.wants)} · ${pct(r.wantsPct)}`, r.wantsPct, 'A common guide is about 30% or less.', tone(r.wantsPct, 30, 45)),
      barRow('Saving', `${money(r.saving)} · ${pct(r.savePct)}`, r.savePct * 2.5, 'A common guide is 20%. Anything above zero is a start.', ''),
    ].join('');

    const splitRows = `
      <tr><td>Essentials</td><td>${pct(r.needsPct)}</td><td>${money(r.needs)}</td></tr>
      <tr class="tx-good"><td>Saving and goals</td><td>${pct(r.tSave)}</td><td>${money((r.income * r.tSave) / 100)}</td></tr>
      <tr class="tx-good"><td>Wants</td><td>${pct(r.tWants)}</td><td>${money((r.income * r.tWants) / 100)}</td></tr>`;

    // Plan the order of operations to the person's own situation.
    const steps = [];
    if (r.leftover < 0) steps.push(`<strong>Close the gap.</strong> List every recurring charge, cancel or pause 3 you will not miss, and find ${money(-r.leftover)} a month to cut or earn.`);
    if (r.fundMonthsHave < 1) steps.push(`<strong>Build a starter buffer of ${money(r.starterTarget)}</strong> (one month of essentials)${r.monthsToStarter ? `. At ${money(r.plannedSave)} a month, that takes about ${plural(r.monthsToStarter, 'month', 'months')}` : ''}.`);
    if (input.debt > 0) steps.push(`<strong>Pay every debt minimum, on time.</strong> Missed payments add fees and damage your record.`);
    if (input.debt > 0 && input.apr >= 15) steps.push(`<strong>Attack the highest-interest debt next.</strong> Debt at ${input.apr}% grows faster than almost any saving earns.`);
    if (r.fundMonthsHave < r.monthsTarget) steps.push(`<strong>Grow your emergency fund to ${money(r.fundTarget)}</strong> (${r.monthsTarget} months${input.variable ? ', because your income varies' : ''})${r.monthsToFund ? `. About ${plural(r.monthsToFund, 'month', 'months')} at your current pace` : ''}.`);
    steps.push(`<strong>Then fund your goals.</strong> ${input.goal === 'invest' ? 'Learn before you invest, and only invest money you can leave alone. Speak to a licensed adviser for investing decisions.' : 'Automate a transfer on payday so saving happens before you can spend it.'}`);

    // Debt section.
    let debtHtml = '';
    if (input.debt > 0) {
      const b = r.base;
      const f = r.faster;
      if (b.never) {
        debtHtml = callout(`<strong>Your debt payment does not cover the interest.</strong> At ${input.apr}% a year, ${money(input.debt)} generates about ${money((input.debt * input.apr) / 100 / 12)} in interest each month, so paying ${money(input.debtMin)} means the balance never shrinks. Increase the payment above the interest, or ask your lender about a lower rate or a repayment plan.`, 'tx-danger');
      } else {
        const years = (b.months / 12).toFixed(1);
        debtHtml = `
          <h4 class="tx-result-h">Your debt</h4>
          <p class="tool-result-note">Paying only the ${money(input.debtMin)} minimum, you are debt-free in about <strong>${plural(b.months, 'month', 'months')}</strong> (${years} years), paying roughly <strong>${money(b.interest)}</strong> in interest.</p>
          ${r.extra > 0 && f.months ? `<p class="tool-result-note">Add ${money(r.extra)} a month and it is gone in <strong>${plural(f.months, 'month', 'months')}</strong>, saving about <strong>${money(Math.max(0, b.interest - f.interest))}</strong> in interest.</p>` : ''}`;
      }
    }

    let strategyHtml = '';
    if (r.debtPlan) {
      const dp = r.debtPlan;
      const line = (label, s) => (s.stuck ? `<tr class="tx-bad"><td>${label}</td><td colspan="2">Never clears</td></tr>` : `<tr><td>${label}</td><td>${plural(s.months, 'month', 'months')}</td><td>${money(s.interest)}</td></tr>`);
      const saved = !dp.avalanche.stuck && !dp.snowball.stuck ? dp.snowball.interest - dp.avalanche.interest : 0;
      const winner = dp.avalanche.stuck || dp.snowball.stuck ? '' : saved > 5
        ? `<strong>Avalanche saves about ${money(saved)}</strong> over snowball by attacking the highest interest first. Snowball clears your smallest debt sooner, which can feel good. Both beat the minimums by a wide margin. Pick the one you will actually stick to.`
        : '<strong>The two strategies cost almost the same here.</strong> Choose snowball if quick wins keep you motivated.';
      strategyHtml = `
        <h4 class="tx-result-h">Your debts: two ways to win</h4>
        <p class="tool-result-note">Total owed ${money(dp.totalBalance)}. Putting ${money(dp.extra)} a month on top of the minimums:</p>
        <table class="tx-table"><thead><tr><th>Strategy</th><th>Debt-free in</th><th>Interest paid</th></tr></thead><tbody>
          ${line('Minimums only', dp.minimum)}${line('Avalanche (highest interest first)', dp.avalanche)}${line('Snowball (smallest balance first)', dp.snowball)}
        </tbody></table>
        ${winner ? callout(winner) : ''}
        ${dp.avalanche.order.length ? `<p class="tool-result-note"><strong>Avalanche order:</strong> ${dp.avalanche.order.map((o) => `${esc(o.name)} (month ${o.month})`).join(', then ')}.</p>` : ''}`;
    }

    const stressHtml = `
      <h4 class="tx-result-h">Stress test: what if income drops?</h4>
      ${r.stress.leftover >= 0
        ? callout(`If your income fell by 20% (${money(r.stress.drop)} less a month), you would still stay afloat with ${money(r.stress.leftover)} to spare. That is real resilience.`)
        : callout(`If your income fell by 20% (${money(r.stress.drop)} less a month), you would be <strong>${money(-r.stress.leftover)} short</strong> each month. Your emergency fund of ${money(input.emergency)} would cover about <strong>${(input.emergency / Math.max(1, -r.stress.leftover)).toFixed(1)} months</strong> of that gap. If income stopped completely it would cover about ${r.stress.fundMonthsFullLoss.toFixed(1)} months of essentials.`, 'tx-alert')}`;

    const leversHtml = r.levers.length
      ? `<h4 class="tx-result-h">Your fastest wins</h4>
         <table class="tx-table"><thead><tr><th>Move</th><th>Frees up</th></tr></thead><tbody>${r.levers.slice(0, 4).map((l) => `<tr><td><strong>${l.label}</strong><br><small>${l.how}</small></td><td>${money(l.amount)} / month</td></tr>`).join('')}</tbody></table>
         <p class="tool-result-note">Together these free about <strong>${money(r.levers.slice(0, 4).reduce((s, l) => s + l.amount, 0))}</strong> a month, or ${money(r.levers.slice(0, 4).reduce((s, l) => s + l.amount, 0) * 12)} a year.</p>`
      : '';

    const lumpyHtml = r.lumpyMonthly > 0
      ? callout(`<strong>Your lump-sum costs need ${money(r.lumpyMonthly)} a month.</strong> Put that into a separate pot on payday, so school fees, repairs or renewals are paid from savings you already made, not from your credit card. It is already counted in the numbers above.`)
      : callout('<strong>No yearly costs planned.</strong> Most households have some: insurance, repairs, school fees, gifts, holidays, renewals. List last year\'s and divide by 12 to find a monthly set-aside.', 'tx-alert');

    let goalHtml = '';
    if (r.goalPlan) {
      const g = r.goalPlan;
      goalHtml = `
        <h4 class="tx-result-h">Your savings goal</h4>
        <p class="tool-result-note">To save <strong>${money(g.amount)}</strong> in ${plural(g.months, 'month', 'months')} you need <strong>${money(g.monthly)} a month</strong>.</p>
        ${g.fits
          ? callout(`<strong>It fits.</strong> You have ${money(r.leftover)} unassigned each month, enough to hit it on time.`)
          : callout(`<strong>You are ${money(g.shortBy)} a month short.</strong> ${g.monthsAtLeftover ? `At your current leftover of ${money(Math.max(0, r.leftover))} you would reach it in about ${plural(g.monthsAtLeftover, 'month', 'months')}. ` : ''}Use the fastest wins above, or give the goal more time.`, 'tx-alert')}`;
    }

    const summary = `Budget summary\nIncome ${money(r.income)} | Essentials ${money(r.needs)} (${pct(r.needsPct)}) | Wants ${money(r.wants)} (${pct(r.wantsPct)}) | Saving ${money(r.saving)} (${pct(r.savePct)}) | Left over ${money(r.leftover)}\nEmergency fund target ${money(r.fundTarget)}, current ${money(input.emergency)}`;

    const html = `
      ${scoreBlock('Money Health', r.health, ['Needs attention', 'Getting there', 'Strong'])}
      ${statGrid([
        { label: 'Money in', value: money(r.income) },
        { label: 'Spending plus saving', value: money(r.spent), note: r.leftover >= 0 ? `${money(r.leftover)} left over` : `${money(-r.leftover)} OVER your income` },
        { label: 'Emergency cover', value: `${r.fundMonthsHave.toFixed(1)} months`, note: `Target ${r.monthsTarget} months = ${money(r.fundTarget)}` },
        { label: 'Debt', value: input.debt > 0 ? money(input.debt) : 'None', note: input.debt > 0 ? `${input.apr}% a year` : '' },
      ])}
      ${bars}
      ${r.leftover < 0 ? callout(`<strong>You are spending more than you earn.</strong> The gap is ${money(-r.leftover)} a month. Fixing this comes before any saving plan.`, 'tx-danger') : ''}
      <h4 class="tx-result-h">A split that fits your real life</h4>
      <p class="tool-result-note">The famous 50/30/20 rule assumes essentials under 50%. Yours are ${pct(r.needsPct)}. Here is a split built from your real costs:</p>
      <table class="tx-table"><thead><tr><th>Bucket</th><th>Share</th><th>Per month</th></tr></thead><tbody>${splitRows}</tbody></table>
      ${lumpyHtml}
      ${debtHtml}
      ${strategyHtml}
      ${stressHtml}
      ${leversHtml}
      ${goalHtml}
      <h4 class="tx-result-h">What to do, in this order</h4>
      <ol class="tx-steps">${steps.map((s) => `<li>${s}</li>`).join('')}</ol>
      ${listBlock("What's working for you", '✨', strengths)}
      ${listBlock('Watch out for this', '👀', watch)}
      <div class="tx-actions"><button type="button" class="tx-btn-small" id="tx-copy-budget">Copy my summary</button></div>
      <div hidden id="tx-budget-summary">${esc(summary)}</div>
      ${bigSis('Adjust the percentages as your life changes. The point is that every unit of money has a job before the month starts, not after it ends. I am not a financial adviser, so for big money decisions please speak to a qualified one.')}
      ${recommendations(['budget-like-a-queen', 'soft-girl-passive-income', 'first-2000-online'])}
    `;
    const result = showResult(container, html);
    const copyBtn = result.querySelector('#tx-copy-budget');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        copyText(summary);
        copyBtn.textContent = 'Copied ✓';
        setTimeout(() => (copyBtn.textContent = 'Copy my summary'), 1800);
      });
    }
  };

  wireCurrency(container, render);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    render();
    scrollToResult(container);
  });
}
/* =============================================
   TOOL 4: AI PROMPT BUILDER
   Turns a rough request into a structured prompt, then goes
   further: it critiques what you wrote (vague words, unfilled
   brackets), learns your writing style from a sample, scores how
   complete the prompt is, and produces four versions: full,
   compact, reusable system instructions, and a 5-step chain for
   big jobs.
   ============================================= */

const PROMPT_CATEGORIES = {
  Writing: {
    role: 'a professional writer and editor',
    bar: 'Use plain, specific language. Cut filler. Show, do not tell. No clichés such as "in today\'s fast-paced world".',
  },
  Marketing: {
    role: 'a practical marketing strategist and copywriter',
    bar: 'Lead with the customer\'s problem, not the product. Be specific about benefits. End with one clear call to action. Do not make claims I cannot back up.',
  },
  Career: {
    role: 'an experienced career coach and hiring manager',
    bar: 'Be honest and concrete. Never invent experience, qualifications or results for me. Mark anything I need to fill in with [square brackets].',
  },
  Business: {
    role: 'a pragmatic small-business advisor',
    bar: 'Give realistic, low-cost steps first. Point out the main risks. Where costs, laws or taxes matter, tell me what to verify for my country instead of guessing.',
  },
  'Content creation': {
    role: 'a social media and content strategist',
    bar: 'Open with a strong hook in the first line. Keep it skimmable. Match the style of the platform. Give me options, not one answer.',
  },
  'Personal finance': {
    role: 'a plain-spoken financial educator (not a licensed adviser)',
    bar: 'Educational only. Do not give personal investment advice. Explain trade-offs, show simple numbers, and tell me what to check with a qualified professional in my country.',
  },
  'Side hustles': {
    role: 'a startup mentor who helps beginners earn their first income',
    bar: 'Be realistic about time and money. Start with the cheapest test. Do not promise income. Warn me about common scams in this space.',
  },
  Learning: {
    role: 'a patient teacher who explains from zero',
    bar: 'Explain in simple words with one everyday example per idea. Check my understanding with a short question at the end. Say if you are unsure.',
  },
};

const PROMPT_MODES = {
  draft: { verb: 'Write', label: 'Write something new for me' },
  improve: { verb: 'Improve and rewrite', label: 'Improve a draft I already have' },
  plan: { verb: 'Create a step-by-step plan for', label: 'Make me a plan or give me advice' },
  learn: { verb: 'Teach me', label: 'Teach me something' },
};

// One-tap starting points. They fill the form; every field stays editable.
const PROMPT_RECIPES = {
  linkedin: { label: 'A LinkedIn post', category: 'Writing', mode: 'draft', goal: 'a LinkedIn post about [what I learned or achieved]', audience: 'people in my field who might hire, hire from or work with me', tone: 'Confident and professional', format: 'Short paragraphs', length: 'about 200 words', include: 'one specific result with a number, one lesson, and a question at the end', avoid: 'buzzwords, hashtag spam, bragging' },
  coldemail: { label: 'A cold email to a small business', category: 'Marketing', mode: 'draft', goal: 'a short cold email offering [my service] to [type of business]', audience: 'a busy small-business owner who does not know me', tone: 'Warm and conversational', format: 'An email with a subject line', length: 'under 100 words', include: 'one specific compliment, one clear offer, and an easy next step', avoid: 'long introductions, pressure, exaggeration' },
  product: { label: 'A product description', category: 'Marketing', mode: 'draft', goal: 'a product description for [my product]', audience: 'a shopper deciding whether to buy', tone: 'Warm and conversational', format: 'Short paragraphs', length: 'about 200 words', include: 'who it is for, the main benefit, and what is included', avoid: 'clichés and claims I cannot prove' },
  study: { label: 'A study plan', category: 'Learning', mode: 'plan', goal: 'a study plan to learn [subject] in [number] weeks', audience: 'a beginner with about [hours] hours a week', tone: 'Calm and reassuring', format: 'A step-by-step plan', length: 'about 400 words', include: 'weekly goals, free resources and a way to test myself', avoid: 'paid courses and jargon' },
  calendar: { label: 'A 30-day content calendar', category: 'Content creation', mode: 'plan', goal: 'a 30-day content calendar for [my niche] on [platform]', audience: '[my ideal follower]', tone: 'Playful and bold', format: 'A table', length: 'about 800 words', include: 'a hook idea, a format and a call to action for each day', avoid: 'trends that need expensive equipment' },
  cv: { label: 'Rewrite my CV bullets', category: 'Career', mode: 'improve', goal: 'my CV bullet points for a [job title] application', audience: 'a recruiter who spends 6 seconds on each CV', tone: 'Confident and professional', format: 'A bullet list', length: '', include: 'a strong action verb, a number and a result in every bullet', avoid: 'inventing facts, "responsible for", passive voice' },
  hustle: { label: 'A side-hustle plan', category: 'Side hustles', mode: 'plan', goal: 'a 30-day plan to test [my idea] with no money', audience: 'a beginner with about [hours] hours a week', tone: 'Direct and no-nonsense', format: 'A step-by-step plan', length: 'about 400 words', include: 'the cheapest test, who to talk to first, and how I will know it is working', avoid: 'spending money, promises of income' },
  explain: { label: 'Explain a hard idea', category: 'Learning', mode: 'learn', goal: '[the idea] from zero, with one everyday example', audience: 'a smart beginner with no background', tone: 'Calm and reassuring', format: 'Short paragraphs', length: 'about 400 words', include: 'a simple analogy and a quick check question at the end', avoid: 'jargon' },
  difficult: { label: 'Reply to a difficult message', category: 'Business', mode: 'draft', goal: 'a calm, professional reply to a client who [what happened]', audience: 'a client who is frustrated', tone: 'Calm and reassuring', format: 'An email with a subject line', length: 'about 200 words', include: 'acknowledge the problem, say what I will do, and set a clear next step', avoid: 'defensiveness, blame, over-apologising' },
  money: { label: 'Understand a money question', category: 'Personal finance', mode: 'learn', goal: 'how [money topic] works, with simple numbers', audience: 'a beginner in [country]', tone: 'Calm and reassuring', format: 'Short paragraphs', length: 'about 400 words', include: 'pros and cons, a worked example and what to verify locally', avoid: 'personal investment advice, hype' },
};

const VAGUE_WORDS = ['good', 'nice', 'better', 'great', 'amazing', 'awesome', 'best', 'professional', 'engaging', 'interesting', 'compelling', 'impactful', 'something', 'stuff', 'things', 'various', 'cool', 'a lot'];

// Learn how the user writes, so the AI can copy the style instead of guessing.
export function styleFingerprint(text) {
  const t = (text || '').trim();
  if (t.length < 40) return null;
  const sentences = t.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
  const words = t.split(/\s+/).filter(Boolean);
  const avg = Math.round(words.length / Math.max(1, sentences.length));
  const short = sentences.filter((s) => s.split(/\s+/).length <= 8).length / Math.max(1, sentences.length);
  const contractions = (t.match(/\b\w+['’](s|re|ve|ll|d|t|m)\b/gi) || []).length;
  const questions = (t.match(/\?/g) || []).length;
  const exclaim = (t.match(/!/g) || []).length;
  const emoji = /\p{Extended_Pictographic}/u.test(t);
  const firstPerson = (t.match(/\b(I|my|me|I'm|I've)\b/g) || []).length;
  const notes = [`sentences average about ${avg} words${short > 0.4 ? ', with plenty of short punchy lines' : ''}`];
  notes.push(contractions >= 2 ? 'uses contractions (don\'t, it\'s) so it sounds spoken' : 'avoids contractions and sounds more formal');
  notes.push(firstPerson >= 2 ? 'speaks in the first person' : 'rarely uses "I"');
  if (questions) notes.push('asks the reader questions');
  notes.push(exclaim > 1 ? 'uses exclamation marks for energy' : 'uses exclamation marks sparingly');
  notes.push(emoji ? 'uses emojis' : 'uses no emojis');
  return `Match the style of my sample: ${notes.join('; ')}.`;
}

export function critiquePrompt(i) {
  const notes = [];
  const text = `${i.goal} ${i.audience} ${i.context || ''}`.toLowerCase();
  const found = VAGUE_WORDS.filter((w) => new RegExp(`\\b${w}\\b`).test(text));
  if (found.length) {
    notes.push(`Vague words: "${found.slice(0, 4).join('", "')}". The AI cannot see what you picture. Say what you mean instead, such as "under 150 words", "one story and one question", or "sounds like a friend, not an advert".`);
  }
  const brackets = [i.goal, i.audience, i.context, i.include, i.avoid].join(' ').match(/\[[^\]]+\]/g) || [];
  if (brackets.length) {
    notes.push(`Fill in ${brackets.length === 1 ? 'this placeholder' : 'these placeholders'} before you send it: ${brackets.slice(0, 4).join(' ')}.`);
  }
  if (i.goal.trim().split(/\s+/).length > 45) notes.push('Your task is very long. Split it into steps and use the chain below instead.');
  if (!/\d/.test(`${i.goal} ${i.length || ''} ${i.include || ''}`) && !i.length) notes.push('Add a number somewhere: a word count, how many options, how many days. Numbers make results predictable.');
  return notes;
}

export function buildPrompts(i) {
  const cat = PROMPT_CATEGORIES[i.category] || PROMPT_CATEGORIES.Writing;
  const mode = PROMPT_MODES[i.mode] || PROMPT_MODES.draft;
  const style = styleFingerprint(i.example);
  const goal = i.goal.trim();
  const goalSentence = `${goal}${/[.!?]$/.test(goal) ? '' : '.'}`;
  const lines = [];
  lines.push(`ROLE: Act as ${cat.role}.`);
  lines.push(`TASK: ${mode.verb} ${goalSentence}`);
  if (i.mode === 'improve') {
    lines.push(`MY DRAFT:\n"""\n${i.draft ? i.draft.trim() : '[paste your draft here]'}\n"""`);
  }
  lines.push(`CONTEXT: ${i.context ? i.context.trim() : 'If you need facts about me or my situation to do this well, ask me before you start. Do not guess.'}`);
  lines.push(`AUDIENCE: ${i.audience.trim()}.`);
  lines.push(`TONE: ${i.tone}.`);
  if (i.format) lines.push(`FORMAT: ${i.format}.`);
  if (i.length) lines.push(`LENGTH: ${i.length}.`);
  if (i.include) lines.push(`MUST INCLUDE: ${i.include.trim()}`);
  if (i.avoid) lines.push(`AVOID: ${i.avoid.trim()}`);
  if (i.example && i.example.trim()) lines.push(`STYLE SAMPLE:\n"""\n${i.example.trim()}\n"""${style ? `\n${style}` : ''}`);
  lines.push(`QUALITY BAR: ${cat.bar}`);
  lines.push('ACCURACY: Do not invent facts, statistics, quotes or sources. If you are not sure of something, say so and mark it "[verify]".');
  lines.push('FINISH WITH: One clear next step for me, and one thing you would improve if I gave you more detail.');
  const main = lines.join('\n\n');

  const compact = `Act as ${cat.role}. ${mode.verb} ${goalSentence} For: ${i.audience.trim()}. Tone: ${i.tone.toLowerCase()}.${i.format ? ` Format: ${i.format.toLowerCase()}.` : ''}${i.length ? ` Length: ${i.length}.` : ''}${i.include ? ` Include: ${i.include.trim()}.` : ''}${i.avoid ? ` Avoid: ${i.avoid.trim()}.` : ''} ${cat.bar} Do not invent facts; mark anything unsure as [verify].`;

  const interview = `I want help with this: ${goal}.\n\nBefore you write anything, interview me. Ask me up to 5 short questions, one at a time, about the things that would make the result genuinely good: ${i.audience.trim() ? 'my audience, ' : ''}my situation, my goal and anything you would normally have to guess. Wait for my answer to each one. When you have enough, tell me, then do the task as ${cat.role} in a ${i.tone.toLowerCase()} tone.`;

  const system = `You are ${cat.role} working with me over many conversations.\n\nAbout me and my work: ${i.context ? i.context.trim() : '[add a few lines about you, your work and your goals]'}\n\nMy usual audience: ${i.audience.trim()}.\nMy usual tone: ${i.tone}.${i.avoid ? `\nAlways avoid: ${i.avoid.trim()}.` : ''}${style ? `\n${style}` : ''}\n\nStandards: ${cat.bar}\nNever invent facts, numbers or sources. If you are unsure, say so and mark it "[verify]". When my request is unclear, ask one short question before you start.`;

  const chain = [
    ['Step 1: Research the angle', `Act as ${cat.role}. I want to ${mode.verb.toLowerCase()} ${goalSentence} The audience is ${i.audience.trim()}. List the 7 questions this audience most wants answered, the 3 common mistakes, and 3 angles that would feel fresh. Do not write the piece yet.`],
    ['Step 2: Build the outline', 'Using the angles above, give me the 3 strongest outlines. For each, give a working title, the main point of each section in one line, and why it would work. Recommend one.'],
    ['Step 3: Write the first draft', `Write the full draft of the recommended outline. Tone: ${i.tone.toLowerCase()}.${i.length ? ` Length: ${i.length}.` : ''}${i.format ? ` Format: ${i.format.toLowerCase()}.` : ''}${i.context ? ` Use these facts about me: ${i.context.trim()}` : ' Ask me for any facts about me you need before you write.'}`],
    ['Step 4: Critique it', 'Act as a tough but fair editor. List the 5 weakest parts of the draft, say exactly why each is weak, and suggest the fix. Check for anything that sounds generic, vague, or unsupported.'],
    ['Step 5: Final polish', `Apply every fix above and give me the final version.${style ? ` ${style}` : ''} Then list anything I should verify myself before I publish or send it.`],
  ];

  const checks = [
    { ok: goal.split(/\s+/).length >= 6, tip: 'Make the task more specific. Aim for at least 6 words: what, for whom and what for.' },
    { ok: i.audience.trim().split(/\s+/).length >= 3, tip: 'Describe the audience in more detail: who they are and what they care about.' },
    { ok: !!(i.context && i.context.trim().length >= 40), tip: 'Add context about you or your situation. This is the single biggest quality jump.' },
    { ok: !!i.format, tip: 'Pick an output format so you do not get a wall of text.' },
    { ok: !!i.length, tip: 'Say how long it should be.' },
    { ok: !!(i.include && i.include.trim()), tip: 'List the points that must appear.' },
    { ok: !!(i.avoid && i.avoid.trim()), tip: 'Say what to avoid (for example buzzwords, jargon, or a topic).' },
    { ok: !!(i.example && i.example.trim().length > 40), tip: 'Paste a short sample of the style you like (40+ characters). AI copies style very well, and we will describe it for you.' },
  ];
  const weights = [18, 12, 22, 10, 6, 12, 8, 12];
  const penalty = critiquePrompt(i).length ? 4 : 0;
  const score = clamp(Math.round(checks.reduce((sum, c, idx) => sum + (c.ok ? weights[idx] : 0), 0)) - penalty, 0, 100);
  const missing = checks.filter((c) => !c.ok).map((c) => c.tip);

  const followUps = [
    ['Tighten it', 'Rewrite your answer 30% shorter without losing the key points. Keep my tone.'],
    ['Make it sound like me', 'Rewrite this so it sounds like a real person wrote it: shorter sentences, plain words, a little personality. Remove any phrase that sounds like a corporate template.'],
    ['Give me options', 'Give me 5 different opening lines (or headlines) for this, each with a different angle. Label the angles.'],
    ['Find the weak spots', 'Act as a critical reader. List the 5 weakest parts of this and say how to fix each one. Do not rewrite it yet.'],
    ['Check the facts', 'List every factual claim, number or name in your answer in a table, and mark how confident you are in each. Tell me exactly what I should verify myself.'],
    ['Adapt it', 'Adapt this for [platform or situation]. Keep the same message and change the length, format and style to suit.'],
    ['Add proof', 'Where would a specific example, number or story make this stronger? Ask me for those details one at a time.'],
    ['Remove AI-sounding phrases', 'Find every phrase in this that sounds like generic AI writing ("delve", "unlock", "in today\'s world", "game-changer", "it is important to note") and replace each with something plain and specific.'],
  ];

  const words = main.split(/\s+/).length;
  return { main, compact, interview, system, chain, score, missing, followUps, critique: critiquePrompt(i), style, words, tokens: Math.round(words * 1.35) };
}

function promptBuilderTool(container) {
  container.innerHTML = `
    ${introBlock('AI Prompt Builder', [
      '<strong>Who it is for:</strong> anyone who gets generic answers from ChatGPT, Claude or any other AI assistant.',
      '<strong>What you get:</strong> a complete prompt, a compact version, reusable system instructions, a 5-step chain for big jobs, a critique of what you wrote and a completeness score.',
      '<strong>The big idea:</strong> AI answers are only as specific as the question. Context, audience and a quality bar turn a bland answer into a useful one.',
    ])}
    <form class="tool-widget tx-wide" id="tool-form">
      ${selectField('t-recipe', 'Start from a recipe (optional)', [['', 'Choose one to fill the form for you'], ...Object.entries(PROMPT_RECIPES).map(([k, v]) => [k, v.label])], '', 'Pick one, then edit anything in [brackets].')}
      <div class="tx-row">
        ${selectField('t-category', 'Category', Object.keys(PROMPT_CATEGORIES).map((k) => [k, k]), 'Writing')}
        ${selectField('t-mode', 'What do you need?', Object.entries(PROMPT_MODES).map(([k, v]) => [k, v.label]), 'draft')}
      </div>
      ${textField('t-goal', 'What do you want help with?', { placeholder: 'e.g. a LinkedIn post about changing careers into marketing', required: true, hint: 'Be specific. "A LinkedIn post about my career change" beats "a post".' })}
      <div id="t-draft-wrap" hidden>
        ${textAreaField('t-draft', 'Paste your draft', { placeholder: 'Paste the text you want improved. Remove names and private details first.' })}
      </div>
      ${textField('t-audience', 'Who is it for?', { placeholder: 'e.g. women in their late 20s who feel stuck in admin jobs', required: true })}
      ${textAreaField('t-context', 'Context about you or the situation (the biggest quality boost)', { placeholder: 'e.g. I worked 4 years in customer support, finished a free marketing course, and I want to sound confident but not boastful.', hint: 'Include facts the AI could not guess. Leave out passwords, ID numbers and anything private.' })}
      <div class="tx-row">
        ${selectField('t-tone', 'Tone', [['Warm and conversational', 'Warm and conversational'], ['Confident and professional', 'Confident and professional'], ['Playful and bold', 'Playful and bold'], ['Calm and reassuring', 'Calm and reassuring'], ['Direct and no-nonsense', 'Direct and no-nonsense']], 'Warm and conversational')}
        ${selectField('t-format', 'Format', [['', 'Let the AI decide'], ['Short paragraphs', 'Short paragraphs'], ['A bullet list', 'A bullet list'], ['A step-by-step plan', 'A step-by-step plan'], ['An email with a subject line', 'An email with a subject line'], ['A table', 'A table'], ['A script I can read aloud', 'A script I can read aloud']], '')}
      </div>
      ${selectField('t-length', 'Length', [['', 'No preference'], ['under 100 words', 'Very short (under 100 words)'], ['about 200 words', 'Short (about 200 words)'], ['about 400 words', 'Medium (about 400 words)'], ['about 800 words', 'Long (about 800 words)']], '')}
      ${textField('t-include', 'Must include (optional)', { placeholder: 'e.g. my 4 years in support, one specific result, a question at the end' })}
      ${textField('t-avoid', 'Avoid (optional)', { placeholder: 'e.g. buzzwords, exclamation marks, sounding salesy' })}
      ${textAreaField('t-example', 'Paste a sample of writing you like or have written (optional)', { placeholder: 'Paste 3 or 4 sentences in the style you want.', hint: 'We will read it for sentence length, contractions, questions and emojis, and tell the AI how to copy your voice.' })}
      <button class="btn btn-primary" type="submit">Build My Prompt</button>
    </form>
    <div class="tool-result" id="tool-result" hidden></div>
  `;

  const form = container.querySelector('#tool-form');
  persistForm(form, 'hdp-tool-prompt');
  const modeSel = container.querySelector('#t-mode');
  const draftWrap = container.querySelector('#t-draft-wrap');
  const syncMode = () => (draftWrap.hidden = modeSel.value !== 'improve');
  modeSel.addEventListener('change', syncMode);
  syncMode();

  container.querySelector('#t-recipe').addEventListener('change', (e) => {
    const r = PROMPT_RECIPES[e.target.value];
    if (!r) return;
    const set = (id, v) => {
      const el = container.querySelector(`#${id}`);
      if (el) el.value = v;
    };
    set('t-category', r.category);
    set('t-mode', r.mode);
    set('t-goal', r.goal);
    set('t-audience', r.audience);
    set('t-tone', r.tone);
    set('t-format', r.format);
    set('t-length', r.length);
    set('t-include', r.include);
    set('t-avoid', r.avoid);
    syncMode();
    form.dispatchEvent(new Event('change', { bubbles: true }));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const out = buildPrompts({
      category: readVal(container, 't-category', 'Writing'),
      mode: readVal(container, 't-mode', 'draft'),
      goal: readVal(container, 't-goal'),
      draft: readVal(container, 't-draft'),
      audience: readVal(container, 't-audience'),
      context: readVal(container, 't-context'),
      tone: readVal(container, 't-tone', 'Warm and conversational'),
      format: readVal(container, 't-format'),
      length: readVal(container, 't-length'),
      include: readVal(container, 't-include'),
      avoid: readVal(container, 't-avoid'),
      example: readVal(container, 't-example'),
    });

    const html = `
      ${scoreBlock('Prompt completeness', out.score, ['Too vague', 'Good start', 'Excellent'])}
      <p class="tool-result-note">About ${out.words} words, roughly ${out.tokens} tokens. That is well within what any assistant can handle.</p>
      ${out.critique.length ? listBlock('We noticed', '🔎', out.critique) : ''}
      ${out.missing.length ? listBlock('Add these to get a better answer', '🎯', out.missing.slice(0, 4)) : callout('<strong>Nicely detailed.</strong> That is the kind of prompt that gets a specific, useful answer.')}
      ${out.style ? callout(`<strong>Your writing style, decoded:</strong> ${esc(out.style.replace('Match the style of my sample: ', '').replace(/\.$/, ''))}. We added this to your prompt so the AI copies your voice.`) : ''}
      <h4 class="tx-result-h">1. Your ready-to-paste prompt</h4>
      <div class="tx-script" id="tx-prompt-main">${esc(out.main)}</div>
      <div class="tx-actions"><button type="button" class="tx-btn-small" data-copy-target="#tx-prompt-main">Copy prompt</button></div>
      <h4 class="tx-result-h">2. The quick version</h4>
      <p class="tool-result-note">Same instructions, one paragraph, for a fast chat.</p>
      <div class="tx-script" id="tx-prompt-compact">${esc(out.compact)}</div>
      <div class="tx-actions"><button type="button" class="tx-btn-small" data-copy-target="#tx-prompt-compact">Copy quick version</button></div>
      <h4 class="tx-result-h">3. Let the AI interview you first</h4>
      <p class="tool-result-note">Use this when you are not sure what details matter. The AI asks, you answer, and the result is far more personal.</p>
      <div class="tx-script" id="tx-prompt-interview">${esc(out.interview)}</div>
      <div class="tx-actions"><button type="button" class="tx-btn-small" data-copy-target="#tx-prompt-interview">Copy interview prompt</button></div>
      <h4 class="tx-result-h">4. Save it as permanent instructions</h4>
      <p class="tool-result-note">Paste this into your assistant's custom instructions, a custom assistant or a project, so you never have to repeat yourself.</p>
      <div class="tx-script" id="tx-prompt-system">${esc(out.system)}</div>
      <div class="tx-actions"><button type="button" class="tx-btn-small" data-copy-target="#tx-prompt-system">Copy instructions</button></div>
      <h4 class="tx-result-h">5. A five-step chain for big jobs</h4>
      <p class="tool-result-note">Send these one at a time and read each answer before the next. Chains beat one giant prompt for anything long or important.</p>
      ${out.chain.map(([name, text], idx) => `<details class="tx-details"><summary>${esc(name)}</summary><div><div class="tx-script" id="tx-chain-${idx}">${esc(text)}</div><div class="tx-actions"><button type="button" class="tx-btn-small" data-copy-target="#tx-chain-${idx}">Copy</button></div></div></details>`).join('')}
      <h4 class="tx-result-h">6. Follow-ups that fix common problems</h4>
      ${out.followUps.map(([name, text], idx) => `<details class="tx-details"><summary>${esc(name)}</summary><div><div class="tx-script" id="tx-fu-${idx}">${esc(text)}</div><div class="tx-actions"><button type="button" class="tx-btn-small" data-copy-target="#tx-fu-${idx}">Copy</button></div></div></details>`).join('')}
      ${listBlock('Use AI safely', '👀', ['Do not paste passwords, ID numbers, bank details or other people\'s private information.', 'Check every fact, number, name and link. AI can sound sure and still be wrong.', 'Read the answer out loud and change anything that does not sound like you.', 'If it is for work or school, check the rules about using AI.'])}
      ${bigSis('Two passes beat one. Paste the first prompt, read the answer out loud, then use a follow-up to tighten it. The first answer is a draft, never the finished thing.')}
      ${recommendations(['build-your-online-empire', 'how-to-use-chatgpt-and-claude-to-build-income-streams', 'instagram-pays-too-sis'])}
    `;
    showResult(container, html);
    scrollToResult(container);
  });
}


/* =============================================
   TOOL 5: BUSINESS IDEA VALIDATOR
   Scores an idea on eight weighted dimensions, then tests the
   money: worst, likely and best case, payback time, the value of a
   customer against what they cost to win, and how much you would
   risk. It ends with pass or fail numbers for your first tests,
   and the questions to ask real customers.
   ============================================= */

const IDEA_DIMENSIONS = [
  { id: 'demand', weight: 20, q: 'I have talked to real potential customers (not friends or family) about this problem', hint: 'Five real conversations counts as a yes. Chatting with people who like you does not.', test: 'Message 10 people who match your customer. Ask only: "How do you handle [problem] now?" and "What is the most annoying part?" Do not mention your idea until the end.' },
  { id: 'pain', weight: 12, q: 'This problem is urgent or costly enough that people already spend money or time fixing it', hint: 'If people do nothing about it today, they probably will not pay you either.', test: 'List 5 things people currently use to solve this (including free and manual ways). If you cannot find any, the pain may be too small.' },
  { id: 'pay', weight: 20, q: 'At least one person has said yes to my price, or has paid or pre-paid', hint: '"That sounds nice" is not a yes. Money or a clear commitment is.', test: 'Offer the first 3 customers a founding-member price and ask for payment before you build. Even a small deposit is real evidence.' },
  { id: 'reach', weight: 14, q: 'I know exactly where my first 10 customers are and can message them directly', hint: 'Name the groups, places or people. "Social media" is not an answer.', test: 'Write the names of 20 specific people, groups or places where your customers already are, then message 5 of them this week.' },
  { id: 'edge', weight: 10, q: 'I can say in one sentence why someone would pick me over every alternative, including free ones', hint: 'Faster, cheaper, simpler, more local, more trusted, or made for one specific group.', test: 'Fill in: "Unlike [alternative], I [difference] for [specific person] who [specific problem]." Test it on 3 people and see if they get it.' },
  { id: 'speed', weight: 8, q: 'I can launch a basic version within 30 days with what I already have', hint: 'A first version can be a spreadsheet, a message, or doing it by hand.', test: 'Cut your idea to the one thing that delivers the result. Do it manually for 3 people before you build anything.' },
  { id: 'money', weight: 10, q: 'The numbers work: I keep healthy profit on each sale (calculated from your numbers)', hint: 'Worked out automatically from the price and cost you enter.', test: 'Raise the price, cut the cost to deliver, or change the offer until each sale leaves a healthy profit.', auto: true },
  { id: 'fit', weight: 6, q: 'I can keep working on this for 6 months even if it grows slowly', hint: 'Interest fades. Honest answer only.', test: 'Decide how many hours a week you can truly give and for how long. Write a date to review. If you cannot, shrink the idea.' },
];

const MOM_TEST = [
  'Tell me about the last time you had this problem. What happened?',
  'What did you try to fix it, and what did that cost you in time or money?',
  'What is the most frustrating part?',
  'If this problem vanished tomorrow, what would change for you?',
  'Who else is involved when this comes up, and who decides what to buy?',
  'What have you already paid for to solve it, and what did you think of it?',
  'If I made something that did X, what would worry you about it?',
  'Is there anyone else I should talk to?',
];

export function scoreIdea(answers, price, cost, fixed) {
  const unit = price - cost;
  const margin = price > 0 ? (unit / price) * 100 : 0;
  const moneyVal = price > 0 ? (margin >= 60 ? 1 : margin >= 30 ? 0.5 : 0) : 0;
  const rows = IDEA_DIMENSIONS.map((d) => {
    const raw = d.auto ? moneyVal : Number(answers[d.id] ?? 0);
    return { ...d, value: raw, points: d.weight * raw, gap: d.weight * (1 - raw) };
  });
  const score = Math.round(rows.reduce((s, r) => s + r.points, 0));
  const sorted = [...rows].sort((a, b) => b.gap - a.gap);
  const breakEven = unit > 0 ? Math.ceil(fixed / unit) : null;
  return { rows, score, risks: sorted.filter((r) => r.gap > 0).slice(0, 3), strengths: rows.filter((r) => r.value === 1), unit, margin, breakEven };
}

// The money behind an idea: three futures, payback, customer value and risk.
export function ideaEconomics(x) {
  const conv = clamp(x.conv, 0, 100) / 100;
  const run = (priceMult, costMult, convMult, label) => {
    const price = x.price * priceMult;
    const cost = x.cost * costMult;
    const unit = price - cost;
    const sales = x.reach * Math.min(1, conv * convMult);
    const profit = sales * unit - x.fixed;
    return { label, price, unit, sales, profit, revenue: sales * price };
  };
  const scenarios = [run(0.85, 1.2, 0.5, 'Slower'), run(1, 1, 1, 'Likely'), run(1.1, 0.9, 1.5, 'Better')];
  const likely = scenarios[1];
  const payback = x.startup > 0 && likely.profit > 0 ? Math.ceil(x.startup / likely.profit) : x.startup > 0 ? null : 0;
  const ltv = (x.price - x.cost) * Math.max(1, x.repeats || 1);
  const ratio = x.cac > 0 ? ltv / x.cac : null;
  const exposure = x.startup + 3 * x.fixed;
  const risk = x.savings > 0 ? exposure / x.savings : null;
  // Customers you would need before you recover the launch cost and fixed costs.
  const unit = x.price - x.cost;
  const breakEvenAll = unit > 0 ? Math.ceil((x.startup + x.fixed * 3) / unit) : null;
  return { scenarios, payback, ltv, ratio, exposure, risk, breakEvenAll };
}

// Concrete pass or fail numbers, so you know what to do after each test.
export function ideaTests(conv, reach) {
  const talk = 10;
  const pitch = Math.max(10, Math.min(30, Math.round(reach / 4) || 20));
  const needYes = Math.max(1, Math.round(pitch * (conv / 100)));
  return [
    { name: 'Test 1: Talk', do: `Have ${talk} real conversations about the problem (not your idea).`, pass: `At least 6 of the ${talk} describe the problem unprompted and say they have tried to solve it.`, fail: 'If fewer than 3 care, change the customer or the problem before you build anything.' },
    { name: 'Test 2: Pre-sell', do: `Offer a founding-customer price to ${pitch} people who match your customer. Ask for payment or a deposit.`, pass: `At least ${needYes} pay or commit. That matches the ${conv}% you hoped for.`, fail: `Fewer than ${Math.max(1, Math.floor(needYes / 2))}? Change the offer or price, not the product.` },
    { name: 'Test 3: Deliver by hand', do: 'Serve your first 3 customers manually, with no new software or equipment.', pass: 'They are happy, and they say they would pay again or tell a friend.', fail: 'If they are lukewarm, ask exactly what was missing and fix that first.' },
  ];
}

function ideaTool(container) {
  container.innerHTML = `
    ${introBlock('Business Idea Validator', [
      '<strong>Who it is for:</strong> anyone with a business or side-hustle idea who has not yet spent real money on it.',
      '<strong>What you get:</strong> a score across 8 things that decide whether ideas work, three money scenarios, payback time, the value of a customer, how much you would risk, pass or fail tests and questions to ask real customers.',
      '<strong>Be honest:</strong> a low score is good news. It tells you where to look before you spend money.',
    ])}
    <form class="tool-widget tx-wide" id="tool-form">
      ${currencyField()}
      <p class="tx-section-title">1. Your idea in plain words</p>
      ${textField('t-idea', 'What is the idea?', { placeholder: 'e.g. a weekly meal-prep plan for busy students', required: true })}
      ${textField('t-customer', 'Who exactly is it for?', { placeholder: 'e.g. university students in shared housing', required: true })}
      <p class="tx-section-title">2. Your numbers</p>
      <div class="tx-row">
        ${numberField('t-price', 'What you would charge per sale', { placeholder: '15', required: true })}
        ${numberField('t-cost', 'What it costs you to deliver each sale', { placeholder: '3', hint: 'Materials, fees, delivery, your helpers. Not your own time.' })}
      </div>
      <div class="tx-row">
        ${numberField('t-fixed', 'Fixed costs per month', { placeholder: '40', hint: 'Tools, hosting, ads, rent. What you pay even with zero sales.' })}
        ${numberField('t-startup', 'One-off cost to get started', { placeholder: '200', hint: 'Equipment, stock, set-up, a course.' })}
      </div>
      <div class="tx-row">
        ${numberField('t-reach', 'People you can realistically reach each month', { placeholder: '200', hint: 'Talk to, message, or show your offer to.' })}
        ${numberField('t-conv', 'Of 100 of those people, how many buy?', { placeholder: '5', max: 100, hint: 'Be cautious. 2 to 10 is typical for warm, direct outreach.' })}
      </div>
      <div class="tx-row">
        ${numberField('t-repeats', 'How many times does a customer buy in total?', { placeholder: '1', hint: '1 for one-off, 6 for monthly over half a year.' })}
        ${numberField('t-cac', 'What you spend to win one customer', { placeholder: '2', hint: 'Ads, free samples, discounts. Zero if it is only your time.' })}
      </div>
      ${numberField('t-savings', 'Money you could lose without it hurting you', { placeholder: '500', hint: 'Only what you can truly afford to lose.' })}
      <p class="tx-section-title">3. Your honest answers</p>
      ${IDEA_DIMENSIONS.filter((d) => !d.auto)
        .map(
          (d) => `
        <fieldset class="tool-radio-group" style="border:0;padding:0;margin:0 0 .4rem">
          <legend style="font-weight:600;font-size:var(--body-small);padding:0">${d.q}</legend>
          <span class="tx-hint" style="margin:.15rem 0 .3rem">${d.hint}</span>
          <span class="tool-radio-row">
            <label><input type="radio" name="q-${d.id}" value="1" required> Yes</label>
            <label><input type="radio" name="q-${d.id}" value="0.5"> Partly</label>
            <label><input type="radio" name="q-${d.id}" value="0"> Not yet</label>
          </span>
        </fieldset>`
        )
        .join('')}
      <button class="btn btn-primary" type="submit">Score My Idea</button>
    </form>
    <div class="tool-result" id="tool-result" hidden></div>
  `;

  const form = container.querySelector('#tool-form');
  persistForm(form, 'hdp-tool-idea');

  const render = () => {
    const answers = {};
    IDEA_DIMENSIONS.filter((d) => !d.auto).forEach((d) => {
      const chosen = form.querySelector(`input[name="q-${d.id}"]:checked`);
      answers[d.id] = chosen ? Number(chosen.value) : 0;
    });
    const price = readNum(container, 't-price');
    const cost = readNum(container, 't-cost');
    const fixed = readNum(container, 't-fixed');
    const conv = clamp(readNum(container, 't-conv', 5), 1, 100);
    const reach = readNum(container, 't-reach', 100);
    const idea = readVal(container, 't-idea');
    const customer = readVal(container, 't-customer');
    const r = scoreIdea(answers, price, cost, fixed);
    const eco = ideaEconomics({
      price, cost, fixed, conv, reach,
      startup: readNum(container, 't-startup'),
      repeats: readNum(container, 't-repeats', 1),
      cac: readNum(container, 't-cac'),
      savings: readNum(container, 't-savings'),
    });
    const tests = ideaTests(conv, reach);

    const verdict =
      r.score >= 75
        ? ['Strong signal', 'You have real evidence behind this. Build the smallest version and sell it to your first customers.']
        : r.score >= 50
        ? ['Promising, test it cheaply', 'There is something here, but a few gaps could sink it. Close the top risks below before you spend money.']
        : ['Talk to people before you build', 'The gaps are mostly about proof. That is fixable, and it costs you conversations, not money.'];

    const peopleNeeded = r.breakEven ? Math.ceil(r.breakEven / (conv / 100)) : null;
    const marginTone = r.margin >= 60 ? '' : r.margin >= 30 ? 'tx-warn' : 'tx-danger';

    const scenarioRows = eco.scenarios
      .map((s) => `<tr class="${s.profit > 0 ? 'tx-good' : 'tx-bad'}"><td><strong>${s.label}</strong></td><td>${s.sales.toFixed(1)}</td><td>${s.profit >= 0 ? '' : '-'}${money(Math.abs(s.profit))}</td></tr>`)
      .join('');

    const moneyBlock = `
      <h4 class="tx-result-h">Your numbers</h4>
      ${statGrid([
        { label: 'Profit per sale', value: price > 0 ? money(r.unit, true) : 'n/a', note: price > 0 ? `${Math.round(r.margin)}% margin` : '' },
        { label: 'Break-even', value: r.breakEven ? `${r.breakEven} sales` : 'No profit', note: r.breakEven ? `a month, to cover ${money(fixed)}` : 'Price must beat cost' },
        { label: 'People to reach', value: peopleNeeded ? `${peopleNeeded}` : 'n/a', note: peopleNeeded ? `at ${conv} in 100 buying` : '' },
        { label: 'First 10 customers', value: money(price * 10), note: 'Revenue, before costs' },
      ])}
      ${barRow('Margin', `${Math.round(r.margin)}%`, clamp(r.margin, 0, 100), 'Above 60% is healthy for digital or service ideas. Physical products are often lower.', marginTone)}
      ${r.unit <= 0 && price > 0 ? callout('<strong>You lose money on every sale.</strong> Raise the price, cut the cost, or change what you sell before anything else.', 'tx-danger') : ''}
      ${r.breakEven && r.breakEven > 40 ? callout(`<strong>That is a lot of sales just to break even.</strong> ${r.breakEven} a month means you need either a higher price, lower fixed costs, or a smaller start. Many successful beginners begin with almost no fixed costs.`, 'tx-alert') : ''}
      <h4 class="tx-result-h">Three possible months</h4>
      <p class="tool-result-note">Reaching ${reach} people a month, with the sales rate you gave. "Slower" cuts price 15%, raises costs 20% and halves your sales rate. "Better" does the opposite.</p>
      <table class="tx-table"><thead><tr><th>Case</th><th>Sales</th><th>Profit per month</th></tr></thead><tbody>${scenarioRows}</tbody></table>
      ${eco.scenarios[0].profit < 0 && eco.scenarios[1].profit > 0 ? callout('<strong>The idea survives the likely case, but not the slower one.</strong> Run your first test small, so a slow start costs you little.', 'tx-alert') : ''}
      ${eco.scenarios[1].profit <= 0 && price > 0 ? callout('<strong>In the likely case, you do not make a profit.</strong> Raise your reach, price or sales rate, or lower fixed costs, before you commit money.', 'tx-danger') : ''}`;

    const deepStats = [
      { label: 'Payback on set-up', value: eco.payback === 0 ? 'None needed' : eco.payback ? plural(eco.payback, 'month', 'months') : 'Never, yet', note: eco.payback ? 'At the likely monthly profit' : 'No monthly profit to pay it back' },
      { label: 'Value of a customer', value: money(eco.ltv, true), note: `Profit over ${Math.max(1, readNum(container, 't-repeats', 1))} purchase(s)` },
    ];
    if (eco.ratio) deepStats.push({ label: 'Value vs cost to win', value: `${eco.ratio.toFixed(1)} to 1`, note: eco.ratio >= 3 ? 'Healthy (3 to 1 or more)' : 'Below the usual 3 to 1 goal' });
    if (eco.risk) deepStats.push({ label: 'Your risk', value: `${Math.round(eco.risk * 100)}%`, note: `of your ${money(readNum(container, 't-savings'))} risk money` });

    const riskText = eco.risk
      ? eco.risk > 1
        ? callout(`<strong>This could cost more than you said you can afford to lose.</strong> Launch cost plus 3 months of fixed costs is ${money(eco.exposure)}. Cut the start-up costs or test for free first.`, 'tx-danger')
        : eco.risk > 0.6
        ? callout(`<strong>You would be risking ${Math.round(eco.risk * 100)}% of your safe-to-lose money.</strong> Run the free tests below first.`, 'tx-alert')
        : callout(`<strong>The risk is small compared with what you can afford.</strong> Launch cost plus 3 months of fixed costs is ${money(eco.exposure)}.`)
      : '';

    const rowsHtml = r.rows
      .map((d) => {
        const label = d.value === 1 ? 'Yes' : d.value === 0.5 ? 'Partly' : 'Not yet';
        return `<tr class="${d.value === 1 ? 'tx-good' : d.value === 0 ? 'tx-bad' : ''}"><td>${esc(d.q.replace(' (calculated from your numbers)', ''))}</td><td>${label}</td></tr>`;
      })
      .join('');

    const html = `
      ${scoreBlock('Validation score', r.score, ['Early days', 'Promising', 'Strong signal'])}
      <p class="tool-result-label">${esc(verdict[0])}</p>
      <p class="tool-result-note">${esc(idea ? `"${idea}"${customer ? ` for ${customer}` : ''}. ` : '')}${esc(verdict[1])}</p>
      ${moneyBlock}
      <h4 class="tx-result-h">Is a customer worth it?</h4>
      ${statGrid(deepStats)}
      ${riskText}
      <h4 class="tx-result-h">Your biggest risks</h4>
      ${r.risks.length
        ? r.risks.map((d, idx) => `<details class="tx-details" ${idx === 0 ? 'open' : ''}><summary>${idx + 1}. ${esc(d.q.replace(' (calculated from your numbers)', ''))}</summary><div><strong>Cheapest test:</strong> ${esc(d.test)}</div></details>`).join('')
        : callout('<strong>No weak spots.</strong> That is rare. Move on to building and selling, and keep testing as you learn.')}
      <h4 class="tx-result-h">Three tests with pass or fail numbers</h4>
      <p class="tool-result-note">Decide the pass mark before you run a test, so hope cannot move the goalposts.</p>
      ${tests.map((t, idx) => `<details class="tx-details" ${idx === 0 ? 'open' : ''}><summary>${esc(t.name)}</summary><div><strong>Do:</strong> ${esc(t.do)}<br><strong>Pass:</strong> ${esc(t.pass)}<br><strong>If not:</strong> ${esc(t.fail)}</div></details>`).join('')}
      <h4 class="tx-result-h">Questions to ask real customers</h4>
      <p class="tool-result-note">These ask about their past, not your idea, which is how you hear the truth. Never ask "would you buy this?", because people say yes to be kind.</p>
      <ol class="tx-steps">${MOM_TEST.map((q) => `<li>${esc(q)}</li>`).join('')}</ol>
      <h4 class="tx-result-h">Your answers</h4>
      <table class="tx-table"><thead><tr><th>Question</th><th>Answer</th></tr></thead><tbody>${rowsHtml}</tbody></table>
      <h4 class="tx-result-h">Your next 14 days</h4>
      <ol class="tx-steps">
        <li>Run the cheapest test for your top risk (above). Write what happened, even if it hurts.</li>
        <li>Talk to ${r.rows.find((x) => x.id === 'demand').value < 1 ? '10' : '5 more'} real people in your target group. Record their exact words, not your interpretation.</li>
        <li>Ask for money, or a clear commitment, from at least 3 people. Silence is an answer too.</li>
        <li>Decide your stop rule in advance. Example: "If I cannot get ${Math.max(1, tests[1] ? Math.round(conv / 100 * 20) : 1)} people to pre-pay in 30 days, I change the offer or the customer."</li>
        <li>Only then build the smallest possible version.</li>
      </ol>
      ${bigSis('Before you spend a single coin building anything, get 5 real people to say "yes, I would pay for that" out loud, and 1 to actually pay.')}
      ${recommendations(['profitable-digital-product-business', 'build-your-online-empire', 'how-to-create-and-sell-a-digital-product'])}
    `;
    showResult(container, html);
  };

  wireCurrency(container, render);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    render();
    scrollToResult(container);
  });
}


/* =============================================
   TOOL 6: RESUME REVIEW CHECKLIST
   Three tools in one, all private and all in the browser:
     - a weighted checklist that changes with your situation
     - a bullet-point checker that spots weak lines
     - a keyword matcher that compares your resume to a job post
   ============================================= */

const RESUME_ITEMS = [
  { id: 'contact', cat: 'First impression', w: 3, text: 'Name, phone, professional email, city and country, and a LinkedIn or portfolio link are at the top', why: 'If a recruiter cannot reach you in 5 seconds, nothing else matters.', fix: 'Use a simple email with your name. Test every link on your phone.' },
  { id: 'format', cat: 'First impression', w: 3, text: 'One clean font at a readable size (10 to 12 pt), with consistent dates and spacing', why: 'Messy formatting reads as messy work.', fix: 'Pick one font, one date style (for example "Mar 2024 to Jan 2026") and use it everywhere.' },
  { id: 'file', cat: 'First impression', w: 2, text: 'Saved as a PDF (unless they ask otherwise) named "Firstname-Lastname-Resume"', why: 'PDFs keep their layout, and a clear file name looks organised.', fix: 'Export as PDF and rename the file before you attach it.' },
  { id: 'length', cat: 'First impression', w: 2, text: 'One page, or two at most if you have 10+ years of relevant experience', why: 'Recruiters skim. Long resumes bury your best points.', fix: 'Cut old or irrelevant roles to one line. Keep the strongest 3 to 5 bullets per role.' },
  { id: 'summary', cat: 'Summary', w: 3, text: 'A 2 to 3 line summary says who you are, your strongest proof and the role you want', why: 'It is the first thing read. It decides whether the rest gets attention.', fix: '"[Role] with [X years or main skill] who [biggest result]. Looking for [target role]."' },
  { id: 'tailor', cat: 'Summary', w: 4, text: 'It is tailored to this job: the title and top skills from the post show up near the top', why: 'Generic resumes lose to specific ones, and filters look for the post\'s words.', fix: 'Copy the job title into your headline and mirror the top 3 skills, but only the ones that are true.' },
  { id: 'verbs', cat: 'Experience', w: 3, text: 'Every bullet starts with a strong action verb', why: 'Verbs show what you did, not just where you were.', fix: 'Start with Led, Built, Reduced, Launched, Trained, Negotiated, Increased, Organised, Delivered.' },
  { id: 'numbers', cat: 'Experience', w: 5, text: 'Each role has at least one number: money, percentage, time saved, people, volume', why: 'Numbers are proof. They are the difference between "helped customers" and "resolved 40 tickets a day".', fix: 'Estimate honestly if you do not have exact figures: "about 30 customers a day".' },
  { id: 'results', cat: 'Experience', w: 4, text: 'Bullets show results, not just duties', why: 'Employers hire for outcomes, not job descriptions.', fix: 'Use: Action + what you did + how + result. "Cut reply time from 2 days to 4 hours by creating reply templates."' },
  { id: 'weak', cat: 'Experience', w: 2, text: 'No bullets that start with "Responsible for", "Helped with", "Worked on" or "Duties included"', why: 'These phrases say nothing about how well you did the work.', fix: 'Replace them with what you actually changed or delivered.' },
  { id: 'order', cat: 'Experience', w: 2, text: 'Recent and relevant roles get the most space; older or unrelated roles are short', why: 'Space tells the reader what matters.', fix: 'Give your latest role 4 to 5 bullets and older ones 1 to 2.' },
  { id: 'keywords', cat: 'Keywords and ATS', w: 4, text: 'Skills, tools and terms from the job post appear naturally in my resume', why: 'Many companies use software to filter resumes before a person sees them.', fix: 'Use the keyword matcher tab below to find what is missing, and add only what is true.' },
  { id: 'ats', cat: 'Keywords and ATS', w: 3, text: 'Simple layout: no tables, columns, text boxes, icons or images holding key information', why: 'Filtering software can scramble or skip fancy layouts.', fix: 'Use plain headings and bullet points. Keep design for your portfolio, not your resume.' },
  { id: 'headings', cat: 'Keywords and ATS', w: 2, text: 'Standard headings: Experience, Education, Skills', why: 'Software and humans both look for these exact labels.', fix: 'Rename "My Journey" to "Experience".' },
  { id: 'skills', cat: 'Skills and proof', w: 3, text: 'A skills section lists real, relevant tools and abilities, not "hard-working" or "team player"', why: 'Vague traits prove nothing. Tools and skills are searchable.', fix: 'List software, languages, certificates and skills the job post names.' },
  { id: 'projects', cat: 'Skills and proof', w: 4, only: ['entry', 'change'], text: 'Projects, volunteering, courses or a portfolio show my skills when job experience is limited', why: 'Proof counts, even without a job title.', fix: 'Add 2 or 3 projects with the result and a link.' },
  { id: 'transfer', cat: 'Skills and proof', w: 5, only: ['change'], text: 'My past experience is translated into the new field\'s language', why: 'A career change fails when the reader has to do the translating.', fix: 'Describe old work with the new role\'s words: "managed 12 accounts" becomes "managed client relationships and renewals".' },
  { id: 'edu', cat: 'Education', w: 2, text: 'Education and certificates are listed, with the most relevant first', why: 'It confirms your basics and shows you keep learning.', fix: 'Add online certificates for skills the job needs. Keep it to one line each.' },
  { id: 'gaps', cat: 'Education', w: 1, text: 'Any gap in my history is explained briefly or filled with courses, volunteering or projects', why: 'Unexplained gaps invite assumptions.', fix: 'One honest line is enough: "Career break to care for family, completed [course]".' },
  { id: 'typos', cat: 'Final checks', w: 4, text: 'No spelling or grammar errors: I read it out loud, and someone else checked it', why: 'A typo is the easiest reason to reject a resume.', fix: 'Read it out loud, then backwards, line by line. Ask a friend.' },
  { id: 'accuracy', cat: 'Final checks', w: 3, text: 'Dates, job titles, names and numbers are accurate and consistent', why: 'Employers verify. A small exaggeration can cost you the offer later.', fix: 'Check every date and figure against your records.' },
  { id: 'norms', cat: 'Final checks', w: 2, text: 'It follows the norms of the country I am applying in (photo, age, personal details)', why: 'Norms differ. Some places expect a photo, many discourage it.', fix: 'Search "resume norms in [country]". Never include ID numbers.' },
  { id: 'links', cat: 'Final checks', w: 1, text: 'My email address, phone number and links all work', why: 'A dead link wastes a good application.', fix: 'Click every link and email yourself from a different account.' },
];

export function scoreResume(checkedIds, role) {
  const items = RESUME_ITEMS.filter((it) => !it.only || it.only.includes(role));
  const totalW = items.reduce((s, it) => s + it.w, 0);
  const doneW = items.reduce((s, it) => s + (checkedIds.has(it.id) ? it.w : 0), 0);
  const score = Math.round((doneW / totalW) * 100);
  const missing = items.filter((it) => !checkedIds.has(it.id)).sort((a, b) => b.w - a.w);
  const cats = {};
  items.forEach((it) => {
    cats[it.cat] = cats[it.cat] || { total: 0, done: 0 };
    cats[it.cat].total += it.w;
    if (checkedIds.has(it.id)) cats[it.cat].done += it.w;
  });
  return { items, score, missing, cats };
}

const WEAK_STARTS = ['responsible for', 'helped with', 'helped', 'worked on', 'assisted with', 'assisted', 'duties included', 'in charge of', 'involved in', 'participated in', 'was part of', 'tasked with', 'handled'];
const STRONG_VERBS = ['led', 'built', 'created', 'launched', 'reduced', 'increased', 'grew', 'improved', 'delivered', 'designed', 'trained', 'managed', 'negotiated', 'organised', 'organized', 'saved', 'cut', 'streamlined', 'developed', 'wrote', 'sold', 'won', 'automated', 'resolved', 'coordinated', 'taught', 'mentored', 'secured', 'generated', 'opened', 'planned', 'produced'];

export function analyzeBullet(line) {
  const text = line.replace(/^[\s\-•*·]+/, '').trim();
  if (!text) return null;
  const lower = text.toLowerCase();
  const words = text.split(/\s+/);
  const first = words[0].toLowerCase().replace(/[^a-z]/g, '');
  const weak = WEAK_STARTS.find((w) => lower.startsWith(w));
  const startsStrong = STRONG_VERBS.includes(first);
  const hasNumber = /\d/.test(text) || /\b(one|two|three|four|five|six|seven|eight|nine|ten|dozens?|hundreds?|thousands?)\b/i.test(text);
  const hasOutcome = /\b(by|from|to|resulting|result|so that|which|saving|saved|increas|reduc|grew|growth|improv|cut|faster|higher|lower|more|less)\b/i.test(text);
  const len = words.length;
  let score = 0;
  const tips = [];
  if (startsStrong) score += 30;
  else if (weak) tips.push(`Starts with "${weak}", which says what you were given, not what you did. Start with a verb like Led, Built, Reduced or Launched.`);
  else tips.push('Start with a strong action verb (Led, Built, Reduced, Launched, Trained).');
  if (hasNumber) score += 30;
  else tips.push('Add a number: how many, how much, how often, how fast. A honest estimate beats none.');
  if (hasOutcome) score += 25;
  else tips.push('Show the result. What improved, got faster, saved money or made someone\'s job easier?');
  if (len >= 10 && len <= 28) score += 15;
  else if (len < 10) tips.push('Too short to prove anything. Say how you did it and what changed.');
  else tips.push('Too long. Aim for under 28 words, or split it into two bullets.');
  return { text, score: clamp(score, 0, 100), tips, len };
}

const STOP_WORDS = new Set(('a,about,above,after,again,all,also,am,an,and,any,are,as,at,be,because,been,before,being,between,both,but,by,can,could,did,do,does,doing,down,during,each,few,for,from,further,had,has,have,having,he,her,here,hers,him,his,how,i,if,in,into,is,it,its,just,me,more,most,my,no,nor,not,now,of,off,on,once,only,or,other,our,ours,out,over,own,same,she,should,so,some,such,than,that,the,their,theirs,them,then,there,these,they,this,those,through,to,too,under,until,up,us,very,was,we,were,what,when,where,which,while,who,whom,why,will,with,would,you,your,yours,able,ability,across,add,apply,based,experience,including,include,looking,must,need,new,part,provide,required,requirements,responsibilities,responsible,role,strong,team,work,working,years,year,join,opportunity,candidate,etc,well,using,use,within,ensure,support,help,good,great,high,make,best,like,job,will,may,day,per,get,one,two').split(','));

export function extractKeywords(jobText, limit = 25) {
  const tokens = (jobText.toLowerCase().match(/[a-z][a-z0-9+#.\-]{1,}/g) || []).map((t) => t.replace(/[.\-]+$/g, ''));
  const counts = new Map();
  const add = (k, w = 1) => counts.set(k, (counts.get(k) || 0) + w);
  const clean = tokens.filter((t) => t.length > 2 && !STOP_WORDS.has(t));
  clean.forEach((t) => add(t));
  for (let k = 0; k < tokens.length - 1; k++) {
    const a = tokens[k];
    const b = tokens[k + 1];
    if (a.length > 2 && b.length > 2 && !STOP_WORDS.has(a) && !STOP_WORDS.has(b)) add(`${a} ${b}`, 1.5);
  }
  return [...counts.entries()]
    .filter(([k, n]) => n >= 2 || k.includes('+') || k.includes('#'))
    .sort((x, y) => y[1] - x[1])
    .slice(0, limit)
    .map(([k, n]) => ({ word: k, n }));
}

export function matchKeywords(jobText, resumeText) {
  const resume = ` ${resumeText.toLowerCase().replace(/[^a-z0-9+#. \-]/g, ' ')} `;
  const stem = (w) => w.replace(/(ing|ed|es|s)$/g, '');
  const present = (k) => resume.includes(` ${k} `) || resume.includes(k) || stem(k).length > 3 && resume.includes(stem(k));
  const keys = extractKeywords(jobText);
  // Drop single words that are already part of a kept two-word phrase.
  const phrases = keys.filter((k) => k.word.includes(' ')).map((k) => k.word);
  const filtered = keys.filter((k) => k.word.includes(' ') || !phrases.some((p) => p.split(' ').includes(k.word)));
  const matched = filtered.filter((k) => present(k.word));
  const missing = filtered.filter((k) => !present(k.word));
  const score = filtered.length ? Math.round((matched.length / filtered.length) * 100) : 0;
  return { score, matched, missing, total: filtered.length };
}

const BUZZWORDS = ['hard-working', 'hard working', 'team player', 'detail-oriented', 'detail oriented', 'passionate', 'self-motivated', 'results-driven', 'results driven', 'go-getter', 'think outside the box', 'synergy', 'dynamic', 'highly motivated', 'people person', 'excellent communication skills', 'fast learner', 'proven track record', 'self-starter', 'strong work ethic'];

const VERB_UPGRADES = {
  'responsible for': ['Led', 'Owned', 'Managed', 'Ran'],
  'helped with': ['Supported', 'Enabled', 'Contributed to', 'Strengthened'],
  helped: ['Supported', 'Enabled', 'Strengthened'],
  'worked on': ['Built', 'Developed', 'Delivered', 'Improved'],
  'assisted with': ['Supported', 'Coordinated', 'Prepared'],
  assisted: ['Supported', 'Coordinated', 'Prepared'],
  'duties included': ['Delivered', 'Completed', 'Managed'],
  'in charge of': ['Led', 'Directed', 'Oversaw'],
  'involved in': ['Contributed to', 'Drove', 'Delivered'],
  'participated in': ['Contributed to', 'Presented at', 'Took part in'],
  handled: ['Resolved', 'Processed', 'Managed', 'Coordinated'],
  'was part of': ['Contributed to', 'Collaborated on'],
  'tasked with': ['Delivered', 'Completed', 'Led'],
};

export function verbUpgrades(line) {
  const lower = line.replace(/^[\s\-•*·]+/, '').toLowerCase();
  const key = Object.keys(VERB_UPGRADES).find((k) => lower.startsWith(k));
  return key ? { from: key, to: VERB_UPGRADES[key] } : null;
}

// Audit a whole pasted resume, with no uploads and nothing sent anywhere.
export function auditResume(text) {
  const t = (text || '').replace(/\r/g, '');
  const lower = t.toLowerCase();
  const words = (t.match(/\S+/g) || []).length;
  const lines = t.split('\n').map((l) => l.trim()).filter(Boolean);
  const marked = lines.filter((l) => /^[-•*·▪●–]/.test(l)).map((l) => l.replace(/^[-•*·▪●–]\s*/, ''));
  const bulletLines = marked.length >= 3 ? marked : lines.filter((l) => {
    const n = l.split(/\s+/).length;
    return n >= 8 && n <= 40;
  });
  const bullets = bulletLines.map(analyzeBullet).filter(Boolean);

  const noRanges = t.replace(/(19|20)\d{2}\s*[-–—to]+\s*((19|20)\d{2}|present|current|now)/gi, ' ');
  const phone = (noRanges.match(/\+?\d[\d\s().-]{7,}\d/g) || []).some((m) => m.replace(/\D/g, '').length >= 9 && m.replace(/\D/g, '').length <= 15);
  const email = /[\w.+-]+@[\w-]+\.[\w.-]+/.test(t);
  const link = /(linkedin\.com|github\.com|behance\.net|dribbble\.com|portfolio|https?:\/\/|www\.)/i.test(t);

  const sectionDefs = {
    Summary: /(^|\n)\s*(professional\s+)?(summary|profile|objective|about me)\b/i,
    Experience: /(^|\n)\s*(work\s+|professional\s+)?(experience|employment|work history)\b/i,
    Education: /(^|\n)\s*(education|qualifications|academic)\b/i,
    Skills: /(^|\n)\s*(key\s+|technical\s+|core\s+)?skills\b/i,
    Projects: /(^|\n)\s*(projects|portfolio|volunteering|volunteer)\b/i,
    Certifications: /(^|\n)\s*(certifications?|certificates?|courses|training)\b/i,
  };
  const sections = Object.fromEntries(Object.entries(sectionDefs).map(([k, re]) => [k, re.test(t)]));

  const buzz = BUZZWORDS.filter((b) => lower.includes(b));
  const firstPerson = (t.match(/\b(I|my|me|myself)\b/g) || []).length;
  const passive = (t.match(/\b(was|were)\s+(responsible|tasked|assigned|given|asked)\b|\bresponsible for\b/gi) || []).length;
  const withNumber = bullets.filter((b) => /\d/.test(b.text)).length;
  const strong = bullets.filter((b) => b.score >= 55).length;
  const long = bullets.filter((b) => b.len > 28).length;

  const starts = {};
  bullets.forEach((b) => {
    const w = b.text.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, '');
    if (w) starts[w] = (starts[w] || 0) + 1;
  });
  const repeated = Object.entries(starts).filter(([, n]) => n >= 3).sort((a, z) => z[1] - a[1]).slice(0, 3);

  const dateTypes = new Set();
  if (/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(19|20)\d{2}/i.test(t)) dateTypes.add('Month YYYY');
  if (/\b\d{1,2}\/(19|20)\d{2}\b|\b\d{1,2}\/\d{1,2}\/(19|20)?\d{2}\b/.test(t)) dateTypes.add('MM/YYYY');
  if (/(^|[^/\w])(19|20)\d{2}\s*[-–—]\s*((19|20)\d{2}|present|current)/i.test(t) && !dateTypes.has('Month YYYY')) dateTypes.add('YYYY to YYYY');
  const mixedDates = dateTypes.size > 1;

  let score = 0;
  const fixes = [];
  const add = (pts, got, fix) => {
    score += got;
    if (got < pts && fix) fixes.push({ lost: pts - got, text: fix });
  };
  add(5, email ? 5 : 0, 'Add a professional email address near the top.');
  add(5, phone ? 5 : 0, 'Add a phone number near the top, with the country code if you apply abroad.');
  add(5, link ? 5 : 0, 'Add a LinkedIn or portfolio link so people can see more of your work.');
  add(8, sections.Experience ? 8 : 0, 'Add a clearly labelled "Experience" section. Software and recruiters both look for it.');
  add(4, sections.Education ? 4 : 0, 'Add an "Education" section, even a short one with a certificate.');
  add(6, sections.Skills ? 6 : 0, 'Add a "Skills" section listing real tools and abilities.');
  add(2, sections.Summary ? 2 : 0, 'Add a 2 to 3 line summary at the top.');
  const lenOk = words >= 250 && words <= 750 ? 10 : words >= 150 && words <= 950 ? 6 : 2;
  add(10, lenOk, words < 250 ? `Your text is only ${words} words. Add proof: results, tools and projects.` : `Your text is ${words} words, about ${(words / 450).toFixed(1)} pages. Aim for 300 to 700 words, which is one page for most people.`);
  const numShare = bullets.length ? withNumber / bullets.length : 0;
  add(20, Math.round(clamp(numShare / 0.5, 0, 1) * 20), `Only ${withNumber} of ${bullets.length} bullets have a number. Aim for half: how many, how much, how fast, how often.`);
  const strongShare = bullets.length ? strong / bullets.length : 0;
  add(15, Math.round(clamp(strongShare / 0.7, 0, 1) * 15), `${bullets.length - strong} bullets are weak: they start with a duty, skip the result or are too short. Use the bullet checker to fix them.`);
  add(5, buzz.length === 0 ? 5 : buzz.length <= 2 ? 3 : 0, `Cut empty buzzwords (${buzz.slice(0, 4).join(', ')}). Show the trait with proof instead.`);
  add(5, firstPerson <= 2 ? 5 : 2, `You use "I" or "my" ${firstPerson} times. Resumes read stronger without first-person words. Start bullets with the verb.`);
  add(5, mixedDates ? 0 : 5, `Your dates use mixed styles (${[...dateTypes].join(' and ')}). Pick one style and use it everywhere.`);
  add(5, bullets.length ? (long / bullets.length <= 0.15 ? 5 : 2) : 5, `${long} bullets run over 28 words. Cut each to one idea.`);

  if (words < 150) score = Math.min(score, 65);
  return {
    score: clamp(Math.round(score), 0, 100),
    words, pages: words / 450, email, phone, link, sections, buzz, firstPerson, passive,
    bulletCount: bullets.length, withNumber, strong, long, repeated, dateTypes: [...dateTypes], mixedDates,
    fixes: fixes.sort((a, z) => z.lost - a.lost),
  };
}

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const endDot = (s) => (s ? s.replace(/[\s.]+$/, '') + '.' : s);

export function buildSummaries(x) {
  const skills = (x.skills || '').split(',').map((s) => s.trim()).filter(Boolean).slice(0, 3);
  const skillText = skills.length > 1 ? `${skills.slice(0, -1).join(', ')} and ${skills[skills.length - 1]}` : skills[0] || '[your top skills]';
  const role = x.role || '[target role]';
  const yrs = x.years > 0 ? `${x.years}+ years` : '';
  const proof = x.proof ? endDot(cap(x.proof.trim())) : '[Add your strongest result, with a number.]';
  const closing = x.tone === 'warm' ? 'I enjoy turning messy problems into clear, calm solutions for the people I work with.' : 'I bring a focus on results and a steady, reliable way of working.';
  return [
    ['Result first', `${proof} ${cap(role)}${yrs ? ` with ${yrs} in` : ' skilled in'} ${skillText}. ${closing}`],
    ['Skills first', `${cap(role)} skilled in ${skillText}${yrs ? `, with ${yrs} of hands-on experience` : ''}. ${proof} ${closing}`],
    ['Early career or career change', `Early-career ${role} who has built ${skillText} through ${x.proof ? endDot(x.proof.trim().replace(/^./, (c) => c.toLowerCase())).replace(/\.$/, '') : '[projects, courses or volunteering]'}. Ready to apply those skills to a ${role} role and keep learning fast. ${closing}`],
  ];
}

export function buildStar(x) {
  const s = (x.situation || '').trim();
  const t = (x.task || '').trim();
  const a = (x.action || '').trim();
  const r = (x.result || '').trim();
  const lowerFirst = (z) => z.replace(/^./, (ch) => ch.toLowerCase());
  const stripI = (z) => z.replace(/^i\s+(had to|was asked to|needed to|was tasked with|was responsible for|wanted to|was supposed to|was told to)\s+/i, '').replace(/^to\s+/i, '');
  const taskCore = stripI(t).replace(/[.]+$/, '');
  const taskSentence = !t ? '[Task]' : taskCore !== t.replace(/[.]+$/, '') ? `My responsibility was to ${lowerFirst(taskCore)}.` : endDot(cap(t));
  const actionSentence = !a ? '[Action]' : `Here is what I did. ${endDot(cap(a))}`;
  const resultSentence = !r ? '[Result]' : `As a result, ${lowerFirst(r.replace(/[.]+$/, ''))}.`;
  const spoken = `${s ? endDot(cap(s)) : '[Situation]'} ${taskSentence} ${actionSentence} ${resultSentence}${r ? ' That is the kind of outcome I aim for in this role.' : ''}`.trim();
  const actionCore = a.replace(/^i\s+/i, '').replace(/[.]+$/, '');
  const bullet = a && r ? `${cap(actionCore)}, so that ${lowerFirst(r).replace(/[.]+$/, '').replace(/^(it\s+)?(resulted in|led to)\s+/i, 'it resulted in ')}` : '';
  const words = spoken.split(/\s+/).length;
  const tips = [];
  if (!/\d/.test(r)) tips.push('Put a number in the result: how much, how many, how fast. It is what interviewers remember.');
  if (a && !/\bI\b/.test(a)) tips.push('Say "I" when you describe the action. Interviewers want to hear what YOU did, not what the team did.');
  if (a && a.split(/\s+/).length < 12) tips.push('Your action is short. Describe 2 or 3 concrete things you did, in order.');
  if (words > 160) tips.push('This runs over about a minute. Cut the situation to one sentence.');
  if (s && s.split(/\s+/).length > 35) tips.push('Your situation is long. Interviewers need only the minimum context to understand the problem.');
  const checks = [!!s, !!t, a.split(/\s+/).length >= 12, /\d/.test(r), words <= 160 && words >= 40];
  const score = Math.round((checks.filter(Boolean).length / checks.length) * 100);
  return { spoken, bullet: bullet && endDot(bullet), words, tips, score };
}

function resumeTool(container) {
  container.innerHTML = `
    ${introBlock('Resume Review Checklist', [
      '<strong>Who it is for:</strong> anyone about to send a resume, from first job to career change.',
      '<strong>What you get:</strong> a weighted checklist, an instant audit of your pasted resume, a bullet checker with stronger verbs, a keyword matcher, a summary builder and an interview story builder.',
      '<strong>Private:</strong> your text never leaves your browser. Nothing is uploaded or stored on our side.',
    ])}
    <div class="tx-tabs" role="tablist">
      <button class="tx-tab" role="tab" id="tab-check" aria-selected="true" type="button">1. Checklist</button>
      <button class="tx-tab" role="tab" id="tab-audit" aria-selected="false" type="button">2. Audit my resume</button>
      <button class="tx-tab" role="tab" id="tab-bullet" aria-selected="false" type="button">3. Bullets</button>
      <button class="tx-tab" role="tab" id="tab-keys" aria-selected="false" type="button">4. Keywords</button>
      <button class="tx-tab" role="tab" id="tab-summary" aria-selected="false" type="button">5. Summary</button>
      <button class="tx-tab" role="tab" id="tab-star" aria-selected="false" type="button">6. Interview story</button>
    </div>
    <div id="pane-check">
      <div class="tool-widget tx-wide">
        ${selectField('t-role', 'Which sounds most like you?', [['entry', 'First job or early career'], ['mid', 'Experienced, same field'], ['change', 'Changing careers']], 'mid')}
        <div id="rc-list"></div>
      </div>
    </div>
    <div id="pane-audit" hidden>
      <div class="tool-widget tx-wide">
        ${textAreaField('t-fullresume', 'Paste your whole resume as text', { placeholder: 'Copy everything from your resume and paste it here.', hint: 'We check contact details, sections, length, numbers, verbs, buzzwords, dates and more, in seconds.' })}
        <button class="btn btn-primary" type="button" id="audit-go">Audit My Resume</button>
      </div>
    </div>
    <div id="pane-bullet" hidden>
      <div class="tool-widget tx-wide">
        ${textAreaField('t-bullets', 'Paste your resume bullets, one per line', { placeholder: 'Responsible for answering customer emails\nLed a team of 4 and cut reply time from 2 days to 4 hours', hint: 'Check one role at a time. We flag weak starts, missing numbers and missing results, and offer stronger verbs.' })}
        <button class="btn btn-primary" type="button" id="bullet-go">Check My Bullets</button>
      </div>
    </div>
    <div id="pane-keys" hidden>
      <div class="tool-widget tx-wide">
        ${textAreaField('t-job', 'Paste the job post', { placeholder: 'Paste the full job description here.' })}
        ${textAreaField('t-resumetext', 'Paste your resume text', { placeholder: 'Paste the text of your resume here.' })}
        <button class="btn btn-primary" type="button" id="keys-go">Match Keywords</button>
      </div>
    </div>
    <div id="pane-summary" hidden>
      <div class="tool-widget tx-wide">
        ${textField('t-sumrole', 'The role you are applying for', { placeholder: 'e.g. Customer Success Specialist' })}
        <div class="tx-row">
          ${numberField('t-sumyears', 'Years of experience', { placeholder: '3', hint: 'Leave empty if you are starting out.' })}
          ${selectField('t-sumtone', 'Voice', [['confident', 'Confident and results-focused'], ['warm', 'Warm and people-focused']], 'confident')}
        </div>
        ${textField('t-sumskills', 'Your top 3 skills, separated by commas', { placeholder: 'e.g. customer onboarding, Zendesk, written communication' })}
        ${textField('t-sumproof', 'Your strongest proof, with a number', { placeholder: 'e.g. cut reply time from 2 days to 4 hours across 400 tickets a month' })}
        <button class="btn btn-primary" type="button" id="summary-go">Write My Summary</button>
      </div>
    </div>
    <div id="pane-star" hidden>
      <div class="tool-widget tx-wide">
        <p class="tx-hint" style="margin-top:0">Interviewers ask "tell me about a time when...". Fill in these four boxes and get a clear one-minute answer plus a matching resume bullet.</p>
        ${textAreaField('t-star-s', 'Situation: what was happening?', { placeholder: 'Our support inbox had a 2-day backlog and customers were complaining.' })}
        ${textAreaField('t-star-t', 'Task: what was your responsibility?', { placeholder: 'I was asked to fix the response time without adding staff.' })}
        ${textAreaField('t-star-a', 'Action: what did YOU do, step by step?', { placeholder: 'I sorted tickets by urgency, wrote 15 reply templates for the most common questions and trained two colleagues to use them.' })}
        ${textAreaField('t-star-r', 'Result: what changed? Use numbers.', { placeholder: 'Reply time fell from 2 days to 4 hours and complaints dropped by 60%.' })}
        <button class="btn btn-primary" type="button" id="star-go">Build My Answer</button>
      </div>
    </div>
    <div class="tool-result" id="tool-result" hidden></div>
  `;

  const result = container.querySelector('#tool-result');
  const names = ['check', 'audit', 'bullet', 'keys', 'summary', 'star'];
  const showTab = (name) => {
    names.forEach((k) => {
      container.querySelector(`#pane-${k}`).hidden = k !== name;
      container.querySelector(`#tab-${k}`).setAttribute('aria-selected', String(k === name));
    });
    result.hidden = true;
    if (name === 'check') renderChecklist();
  };
  names.forEach((k) => container.querySelector(`#tab-${k}`).addEventListener('click', () => showTab(k)));

  const savedChecks = new Set(store.get('hdp-tool-resume-checks') || []);
  const roleSel = container.querySelector('#t-role');
  const savedRole = store.get('hdp-tool-resume-role');
  if (savedRole) roleSel.value = savedRole;

  function renderChecklist() {
    const role = roleSel.value;
    const items = RESUME_ITEMS.filter((it) => !it.only || it.only.includes(role));
    const cats = [...new Set(items.map((it) => it.cat))];
    container.querySelector('#rc-list').innerHTML = cats
      .map(
        (cat) => `
      <p class="tx-section-title">${esc(cat)}</p>
      ${items
        .filter((it) => it.cat === cat)
        .map(
          (it) => `
        <div class="tx-details" style="padding:.1rem .1rem">
          <label style="flex-direction:row;align-items:flex-start;gap:.6rem;padding:.7rem .9rem;font-weight:600;cursor:pointer">
            <input type="checkbox" data-check="${it.id}" ${savedChecks.has(it.id) ? 'checked' : ''} style="margin-top:.25rem;accent-color:var(--color-accent)">
            <span>${esc(it.text)}</span>
          </label>
          <details style="padding:0 .9rem .6rem"><summary style="padding:.1rem 0;font-size:.8rem;color:var(--color-accent-dark)">Why it matters and how to fix it</summary><div style="padding:.3rem 0 0"><strong>Why:</strong> ${esc(it.why)}<br><strong>Fix:</strong> ${esc(it.fix)}</div></details>
        </div>`
        )
        .join('')}`
      )
      .join('');
    container.querySelectorAll('#rc-list input[type="checkbox"]').forEach((box) => box.addEventListener('change', updateChecklist));
    updateChecklist();
  }

  function updateChecklist() {
    const role = roleSel.value;
    const ids = new Set([...container.querySelectorAll('#rc-list input:checked')].map((b) => b.getAttribute('data-check')));
    RESUME_ITEMS.forEach((it) => {
      if (it.only && !it.only.includes(role) && savedChecks.has(it.id)) ids.add(it.id);
    });
    store.set('hdp-tool-resume-checks', [...ids]);
    store.set('hdp-tool-resume-role', role);
    savedChecks.clear();
    ids.forEach((id) => savedChecks.add(id));

    const r = scoreResume(ids, role);
    if (!ids.size) {
      result.hidden = true;
      return;
    }
    const catBars = Object.entries(r.cats)
      .map(([name, c]) => barRow(esc(name), `${Math.round((c.done / c.total) * 100)}%`, (c.done / c.total) * 100, '', c.done / c.total < 0.4 ? 'tx-danger' : c.done / c.total < 0.75 ? 'tx-warn' : ''))
      .join('');
    const fixFirst = r.missing.slice(0, 4);
    showResult(
      container,
      `
      ${scoreBlock('Recruiter-friendliness', r.score, ['Needs work', 'Getting there', 'Ready to send'])}
      ${catBars}
      ${
        r.missing.length
          ? `<h4 class="tx-result-h">Fix these first</h4><p class="tool-result-note">Sorted by how much they matter, not by order on the list.</p>
         <ol class="tx-steps">${fixFirst.map((it) => `<li><strong>${esc(it.text)}.</strong> ${esc(it.fix)}</li>`).join('')}</ol>`
          : bigSis('Every box is ticked. Read it out loud one last time, then send it. 🎉')
      }
      ${listBlock('Remember', '👀', ['A resume gets about 6 seconds on the first look, so the top third of page one does most of the work.', 'Tailor it for every application. One generic resume rarely wins.'])}
      ${recommendations(['linkedin-international-opportunity', 'how-to-choose-a-career', 'virtual-assistant-pretty-paid-booked'])}`
    );
  }
  roleSel.addEventListener('change', renderChecklist);
  renderChecklist();

  // 2. Whole-resume audit
  container.querySelector('#audit-go').addEventListener('click', () => {
    const text = readVal(container, 't-fullresume');
    if (text.length < 120) {
      showResult(container, callout('Paste your whole resume as text, at least a few lines, so there is enough to check.', 'tx-alert'));
      return;
    }
    const a = auditResume(text);
    const chip = (label, ok) => `<span class="tx-pill ${ok ? 'tx-ok' : 'tx-miss'}">${ok ? '✓' : '✕'} ${label}</span>`;
    showResult(
      container,
      `
      ${scoreBlock('Resume audit', a.score, ['Needs work', 'Getting there', 'Strong'])}
      <h4 class="tx-result-h">What we found</h4>
      <div class="tx-chips">
        ${chip('Email', a.email)}${chip('Phone', a.phone)}${chip('Link', a.link)}
        ${Object.entries(a.sections).map(([k, v]) => chip(k, v)).join('')}
      </div>
      ${statGrid([
        { label: 'Length', value: `${a.words} words`, note: `About ${a.pages.toFixed(1)} page${a.pages > 1.15 ? 's' : ''}` },
        { label: 'Bullets with numbers', value: `${a.withNumber} of ${a.bulletCount}`, note: 'Aim for half or more' },
        { label: 'Strong bullets', value: `${a.strong} of ${a.bulletCount}`, note: 'Verb, proof and result' },
        { label: 'Empty buzzwords', value: String(a.buzz.length), note: a.buzz.length ? a.buzz.slice(0, 3).join(', ') : 'None found' },
      ])}
      ${a.repeated.length ? callout(`<strong>You repeat the same opening word.</strong> ${a.repeated.map(([w, n]) => `"${w}" ${n} times`).join(', ')}. Vary your verbs: Led, Built, Cut, Launched, Trained, Negotiated.`, 'tx-alert') : ''}
      ${a.fixes.length ? `<h4 class="tx-result-h">Fix these, biggest first</h4><ol class="tx-steps">${a.fixes.slice(0, 6).map((f) => `<li>${esc(f.text)} <span class="tx-pill">+${f.lost} pts</span></li>`).join('')}</ol>` : bigSis('Nothing major to fix. Read it out loud one last time, then send it. 🎉')}
      ${listBlock('How this works', '👀', ['It reads the text you pasted. It cannot see your layout, fonts or colours, so also tick the format items in the checklist.', 'It is a guide. Your story and proof matter more than any score.'])}
      ${recommendations(['linkedin-international-opportunity', 'how-to-choose-a-career'])}`
    );
    scrollToResult(container);
  });

  // 3. Bullet checker, with verb upgrades
  container.querySelector('#bullet-go').addEventListener('click', () => {
    const lines = readVal(container, 't-bullets').split('\n').map(analyzeBullet).filter(Boolean);
    if (!lines.length) return;
    const avg = Math.round(lines.reduce((s, l) => s + l.score, 0) / lines.length);
    const withNumbers = lines.filter((l) => /\d/.test(l.text)).length;
    showResult(
      container,
      `
      ${scoreBlock('Bullet strength', avg, ['Weak', 'Decent', 'Strong'])}
      <p class="tool-result-note">${withNumbers} of ${lines.length} bullets have a number. Aim for at least half.</p>
      ${lines
        .map((l) => {
          const up = verbUpgrades(l.text);
          return `
        <div class="tx-details" style="padding:.7rem .9rem">
          <div style="display:flex;justify-content:space-between;gap:.6rem;align-items:flex-start"><strong style="font-size:.92rem;line-height:1.4">${esc(l.text)}</strong><span class="tx-pill ${l.score >= 75 ? 'tx-ok' : l.score < 45 ? 'tx-miss' : ''}">${l.score}</span></div>
          ${up ? `<p style="margin:.4rem 0 0;font-size:.84rem">Replace "${esc(up.from)}" with: ${up.to.map((v) => `<span class="tx-pill tx-ok">${esc(v)}</span>`).join(' ')}</p>` : ''}
          ${l.tips.length ? `<ul style="margin:.4rem 0 0;padding-left:1.1rem;font-size:.84rem;color:var(--color-text-secondary)">${l.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : '<p style="margin:.4rem 0 0;font-size:.84rem;color:#2e7d32">Strong: action verb, proof and a result.</p>'}
        </div>`;
        })
        .join('')}
      ${callout('<strong>The pattern that works:</strong> Action verb + what you did + how + result with a number.<br>Example: <em>"Cut reply time from 2 days to 4 hours by building a library of 15 reply templates."</em><br>Only use numbers that are true. An honest estimate ("about 30 a day") is fine.')}
      <div class="tx-chips">${STRONG_VERBS.slice(0, 18).map((v) => `<span class="tx-pill">${v[0].toUpperCase()}${v.slice(1)}</span>`).join('')}</div>
      ${recommendations(['how-to-choose-a-career', 'linkedin-international-opportunity'])}`
    );
    scrollToResult(container);
  });

  // 4. Keyword match
  container.querySelector('#keys-go').addEventListener('click', () => {
    const job = readVal(container, 't-job');
    const cv = readVal(container, 't-resumetext');
    if (job.length < 40 || cv.length < 40) {
      showResult(container, callout('Paste a full job post and your resume text, at least a few sentences each, so there is enough to compare.', 'tx-alert'));
      return;
    }
    const m = matchKeywords(job, cv);
    showResult(
      container,
      `
      ${scoreBlock('Keyword match', m.score, ['Low', 'Fair', 'Strong'])}
      <p class="tool-result-note">${m.matched.length} of ${m.total} important words and phrases from the job post appear in your resume.</p>
      <h4 class="tx-result-h">Missing from your resume</h4>
      ${m.missing.length ? `<div class="tx-chips">${m.missing.map((k) => `<span class="tx-pill tx-miss">${esc(k.word)} · ${Math.round(k.n)}×</span>`).join('')}</div>` : '<p class="tool-result-note">Nothing important is missing.</p>'}
      <h4 class="tx-result-h">Already in your resume</h4>
      ${m.matched.length ? `<div class="tx-chips">${m.matched.map((k) => `<span class="tx-pill tx-ok">${esc(k.word)}</span>`).join('')}</div>` : '<p class="tool-result-note">No matches yet.</p>'}
      ${callout('<strong>Add only what is true.</strong> If you really have a skill on the missing list, work it into a bullet with proof. If you do not, leave it out. Honesty protects you in the interview.')}
      ${listBlock('How this works', '👀', ['It counts the words and phrases the job post repeats most, then checks whether your resume contains them.', 'It is a guide, not a verdict. Hiring teams use their own filters and judgment.'])}
      ${recommendations(['how-to-choose-a-career', 'linkedin-international-opportunity'])}`
    );
    scrollToResult(container);
  });

  // 5. Summary builder
  container.querySelector('#summary-go').addEventListener('click', () => {
    const options = buildSummaries({
      role: readVal(container, 't-sumrole'),
      years: readNum(container, 't-sumyears'),
      tone: readVal(container, 't-sumtone', 'confident'),
      skills: readVal(container, 't-sumskills'),
      proof: readVal(container, 't-sumproof'),
    });
    showResult(
      container,
      `
      <h4 class="tx-result-h" style="margin-top:0">Three summaries to choose from</h4>
      <p class="tool-result-note">Pick the one that sounds most like you, then change any word that does not. Replace anything in [square brackets].</p>
      ${options.map(([label, text], idx) => `<p class="tool-result-label">${esc(label)}</p><div class="tx-script" id="tx-sum-${idx}">${esc(text)}</div><div class="tx-actions"><button type="button" class="tx-btn-small" data-copy-target="#tx-sum-${idx}">Copy</button></div>`).join('')}
      ${listBlock('Make it yours', '✨', ['Keep it to 2 or 3 lines. Anything longer will not be read.', 'Use words from the job post for the role and skills.', 'Only claim what you can explain in an interview.'])}
      ${recommendations(['how-to-choose-a-career', 'linkedin-international-opportunity'])}`
    );
    scrollToResult(container);
  });

  // 6. Interview story (STAR)
  container.querySelector('#star-go').addEventListener('click', () => {
    const x = buildStar({
      situation: readVal(container, 't-star-s'),
      task: readVal(container, 't-star-t'),
      action: readVal(container, 't-star-a'),
      result: readVal(container, 't-star-r'),
    });
    showResult(
      container,
      `
      ${scoreBlock('Story strength', x.score, ['Needs more', 'Good', 'Interview-ready'])}
      <h4 class="tx-result-h">Your answer, ready to say</h4>
      <p class="tool-result-note">About ${x.words} words, or ${Math.max(1, Math.round(x.words / 130))} minute${x.words > 190 ? 's' : ''} out loud. Practise it twice and it will sound natural.</p>
      <div class="tx-script" id="tx-star-spoken">${esc(x.spoken)}</div>
      <div class="tx-actions"><button type="button" class="tx-btn-small" data-copy-target="#tx-star-spoken">Copy answer</button></div>
      ${x.bullet ? `<h4 class="tx-result-h">The same story as a resume bullet</h4><div class="tx-script" id="tx-star-bullet">${esc(x.bullet)}</div><div class="tx-actions"><button type="button" class="tx-btn-small" data-copy-target="#tx-star-bullet">Copy bullet</button></div>` : ''}
      ${x.tips.length ? listBlock('Make it stronger', '🎯', x.tips) : callout('<strong>That is a strong story.</strong> Practise it out loud until it feels easy.')}
      ${recommendations(['how-to-choose-a-career', 'linkedin-international-opportunity'])}`
    );
    scrollToResult(container);
  });
}


/* =============================================
   ENTRY POINT
   ============================================= */

const TOOLS = {
  'freelance-rate-calculator': freelanceRateTool,
  'salary-negotiation-calculator': salaryTool,
  'personal-budget-planner': budgetTool,
  'ai-prompt-builder': promptBuilderTool,
  'business-idea-validator': ideaTool,
  'resume-review-checklist': resumeTool,
};

export function renderTool(id, container) {
  const fn = TOOLS[id];
  if (!fn) return false;
  injectToolStyles();
  swapHeroForTypography(findItemById(id));
  fn(container);
  return true;
}
