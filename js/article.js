/* =============================================
   ARTICLE.JS
   Powers /pages/article.html?id=<id> — the shared masterclass
   dashboard for every Featured Story, Latest Article, and Free
   Tool. Reads the id from the URL, looks it up in data/store.js,
   and renders the full interactive experience: chapter sidebar,
   progress tracking, XP/levels/badges/streaks, Dream Board,
   scenario quizzes, checklists, and callouts.

   Note on scope: the XP/level/badge/streak/dream-board system
   here is real and persists per-browser via localStorage — it
   is not decorative. What's intentionally NOT built is a top
   nav with Community/Resources tabs or a notifications/avatar
   system, since those imply accounts and pages that don't exist
   — every control on this page does something real.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { findItemById, ALL_ITEMS } from '../data/store.js';
import { rewriteRootLinks, BASE } from './base.js';
import { renderTool } from './tools.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { awardXP, getXP, getLevelProgress, getEarnedBadges, BADGES, recordVisitAndGetStreak, getDreamBoard, toggleDream, DREAM_ITEMS } from './gamify.js';

/* =============================================
   CONTENT MARKUP -> HTML
   "## Heading"                -> chapter subhead (TOC + anchor + mark-read)
   "- item"                    -> bullet list
   "- [ ] item"                -> interactive checklist
   "> quote"                   -> pull quote
   "### Q: question\nanswer"   -> FAQ accordion item
   "%%QUIZ\nQ:..\nA:..\nWHY:.." -> interactive scenario/quiz card
   "**bold**"                  -> <strong>
   emoji-prefixed line          -> Big Sis callout
   anything else                -> plain paragraph
   ============================================= */

const CALLOUTS = {
  '💖': { cls: 'callout-bigsis', label: 'Big Sis Note' },
  '👀': { cls: 'callout-reality', label: 'Reality Check' },
  '✨': { cls: 'callout-hidden', label: 'Tiny Win' },
  '🚀': { cls: 'callout-challenge', label: 'Next Challenge' },
  '🌸': { cls: 'callout-pause', label: 'Pause For A Second' },
  '☕': { cls: 'callout-coffee', label: 'Coffee Break' },
  '💅': { cls: 'callout-hotgirl', label: 'Hot Girl Reminder' },
  '🎉': { cls: 'callout-celebrate', label: 'Celebrate Yourself' },
  '🚨': { cls: 'callout-mistake', label: 'Common Mistake' },
  '🧠': { cls: 'callout-didyouknow', label: 'Did You Know?' },
  '💡': { cls: 'callout-protip', label: 'Pro Tip' },
};

function applyBold(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function formatArticleBody(content, articleId) {
  const blocks = content.split('\n\n');
  const chapters = [];
  let chapterIndex = 0;
  let checklistIndex = 0;
  let quizIndex = 0;

  const html = blocks
    .map((block) => {
      const trimmed = block.trim();

      if (trimmed.startsWith('## ')) {
        const title = applyBold(trimmed.slice(3));
        const plainTitle = trimmed.slice(3).replace(/\*\*/g, '');
        const id = `chapter-${slugify(plainTitle)}-${chapterIndex}`;
        chapters.push({ id, title: plainTitle });
        const chapterNum = ++chapterIndex;
        return `
          <div class="chapter-head" id="${id}">
            <h2 class="article-h2"><span class="chapter-num">${chapterNum}</span>${title}</h2>
            <button class="chapter-complete-btn" data-chapter="${articleId}-${chapterIndex - 1}" type="button">
              <span class="check-icon">✓</span> Mark chapter complete
            </button>
          </div>`;
      }

      if (trimmed.startsWith('%%QUIZ')) {
        const lines = trimmed.split('\n').slice(1);
        let question = '';
        let why = '';
        const options = [];
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('Q:')) question = l.slice(2).trim();
          else if (l.startsWith('WHY:')) why = l.slice(4).trim();
          else if (/^[A-Z]:/.test(l)) {
            const correct = /\*\s*$/.test(l);
            const text = l.slice(2).replace(/\*\s*$/, '').trim();
            options.push({ text, correct });
          }
        });
        const qId = `${articleId}-quiz-${quizIndex++}`;
        return `
          <div class="quiz-card" data-quiz-id="${qId}">
            <p class="quiz-label">🎮 Mini Scenario</p>
            <p class="quiz-question">${applyBold(question)}</p>
            <div class="quiz-options">
              ${options.map((o, i) => `<button class="quiz-option" data-correct="${o.correct}" data-letter="${String.fromCharCode(65 + i)}" type="button"><span class="quiz-letter">${String.fromCharCode(65 + i)}</span>${applyBold(o.text)}</button>`).join('')}
            </div>
            <p class="quiz-why" hidden>${applyBold(why)}</p>
          </div>`;
      }

      if (trimmed.startsWith('- [ ]')) {
        const items = trimmed
          .split('\n')
          .map((line) => line.replace(/^-\s*\[\s*\]\s*/, '').trim())
          .filter(Boolean);
        const listHtml = items
          .map((label) => {
            const key = `${articleId}-check-${checklistIndex++}`;
            return `<li><label><input type="checkbox" data-persist-check="${key}"><span>${applyBold(label)}</span></label></li>`;
          })
          .join('');
        return `<ul class="article-checklist" data-checklist>${listHtml}</ul>`;
      }

      if (trimmed.startsWith('- ')) {
        const items = trimmed
          .split('\n')
          .map((line) => line.replace(/^-\s*/, '').trim())
          .filter(Boolean);
        return `<ul class="article-list">${items.map((i) => `<li>${applyBold(i)}</li>`).join('')}</ul>`;
      }

      if (trimmed.startsWith('> ')) {
        return `<blockquote class="pull-quote">${applyBold(trimmed.slice(2))}</blockquote>`;
      }

      if (trimmed.startsWith('### ')) {
        const lines = trimmed.split('\n');
        const question = lines[0].replace(/^###\s*Q:\s*/, '').trim();
        const answer = lines.slice(1).join(' ').trim();
        return `
          <details class="faq-item">
            <summary>${applyBold(question)}</summary>
            <p>${applyBold(answer)}</p>
          </details>`;
      }

      const emoji = [...trimmed][0];
      const callout = CALLOUTS[emoji];
      if (callout) {
        return `
          <div class="big-sis-box ${callout.cls}">
            <span class="callout-label">${callout.label}</span>
            ${applyBold(trimmed)}
          </div>`;
      }

      return `<p>${applyBold(trimmed)}</p>`;
    })
    .join('');

  return { html, chapters };
}

/* =============================================
   XP / LEVEL / BADGES / STREAK / DREAM BOARD UI
   ============================================= */

function refreshLevelUI() {
  const xp = getXP();
  const { level, into, needed, pct } = getLevelProgress(xp);
  const ring = document.getElementById('level-ring');
  const label = document.getElementById('level-xp-label');
  if (ring) ring.style.setProperty('--pct', pct);
  const numEl = document.getElementById('level-num');
  if (numEl) numEl.textContent = level;
  if (label) label.textContent = `${into} / ${needed} XP to Level ${level + 1}`;
}

function refreshBadgesUI() {
  const grid = document.getElementById('badges-grid');
  const count = document.getElementById('badges-count');
  if (!grid) return;
  const earned = getEarnedBadges();
  if (count) count.textContent = `${earned.length}/${BADGES.length}`;
  grid.innerHTML = BADGES.map((b) => {
    const has = earned.includes(b.id);
    return `<div class="badge-chip ${has ? 'earned' : 'locked'}" title="${b.label} — ${b.desc}">${b.icon}</div>`;
  }).join('');
}

function showXPToast(amount) {
  const toast = document.createElement('div');
  toast.className = 'xp-toast';
  toast.textContent = `+${amount} XP`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 1600);
}

function showBadgeToast(badge) {
  const toast = document.createElement('div');
  toast.className = 'badge-toast';
  toast.innerHTML = `<span class="badge-toast-icon">${badge.icon}</span><span>New badge!<br><strong>${badge.label}</strong></span>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2600);
}

function grantXP(amount, opts = {}) {
  awardXP(amount, {
    ...opts,
    onXP: () => {
      refreshLevelUI();
      showXPToast(amount);
    },
    onNewBadge: (badge) => {
      refreshBadgesUI();
      showBadgeToast(badge);
    },
  });
}

function renderStreak() {
  const { streak, last7 } = recordVisitAndGetStreak();
  const count = document.getElementById('streak-count');
  const days = document.getElementById('streak-days');
  if (count) count.textContent = streak;
  if (days) {
    days.innerHTML = last7
      .map((d) => `<span class="streak-day ${d.visited ? 'visited' : ''}">${d.label}</span>`)
      .join('');
  }
}

function renderDreamBoard() {
  const list = document.getElementById('dreamboard-list');
  if (!list) return;
  const checked = getDreamBoard();
  list.innerHTML = DREAM_ITEMS.map((d) => `
    <li>
      <label>
        <input type="checkbox" data-dream="${d.id}" ${checked.includes(d.id) ? 'checked' : ''}>
        <span>${d.icon} ${d.label}</span>
      </label>
    </li>`).join('');
  list.querySelectorAll('input[type="checkbox"]').forEach((box) => {
    box.addEventListener('change', () => {
      toggleDream(box.dataset.dream);
      refreshBadgesUI();
    });
  });
}

function countCompletedChaptersGlobally() {
  let count = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('hdp-chapter-') && localStorage.getItem(key) === '1') count++;
  }
  return count;
}

function initChapterTracking(container, articleId, chapters) {
  container.querySelectorAll('.chapter-complete-btn').forEach((btn) => {
    const key = `hdp-chapter-${btn.dataset.chapter}`;
    if (localStorage.getItem(key) === '1') btn.classList.add('done');

    btn.addEventListener('click', () => {
      const wasDone = btn.classList.contains('done');
      const done = btn.classList.toggle('done');
      localStorage.setItem(key, done ? '1' : '0');
      updateChapterProgress(container, chapters);
      updateSidebarProgress(chapters);
      if (done && !wasDone) {
        const total = countCompletedChaptersGlobally();
        grantXP(15, { badgeId: total <= 1 ? 'first-chapter' : total >= 10 ? 'chapter-champion' : undefined });
      }
    });
  });
  updateChapterProgress(container, chapters);
  updateSidebarProgress(chapters);
}

function updateChapterProgress(container, chapters) {
  const buttons = container.querySelectorAll('.chapter-complete-btn');
  if (!buttons.length) return;
  const done = [...buttons].filter((b) => b.classList.contains('done')).length;
  const badge = document.getElementById('chapters-complete-badge');
  if (badge) badge.textContent = `${done} of ${buttons.length} chapters complete`;

  chapters.forEach((c, i) => {
    const link = document.querySelector(`[data-journey-link="${i}"]`);
    const btn = [...buttons][i];
    if (link && btn) link.classList.toggle('done', btn.classList.contains('done'));
  });
}

function updateSidebarProgress(chapters) {
  const fill = document.getElementById('sidebar-progress-fill');
  const label = document.getElementById('sidebar-progress-label');
  if (!fill || !chapters.length) return;
  const done = document.querySelectorAll('.chapter-complete-btn.done').length;
  const pct = Math.round((done / chapters.length) * 100);
  fill.style.width = `${pct}%`;
  if (label) label.textContent = `${pct}% complete`;
}

function initChecklistPersistence(container) {
  container.querySelectorAll('[data-checklist]').forEach((list) => {
    const boxes = list.querySelectorAll('input[data-persist-check]');
    boxes.forEach((box) => {
      const key = `hdp-check-${box.dataset.persistCheck}`;
      box.checked = localStorage.getItem(key) === '1';

      box.addEventListener('change', () => {
        localStorage.setItem(key, box.checked ? '1' : '0');
        const xpKey = `hdp-check-xp-${box.dataset.persistCheck}`;
        if (box.checked && localStorage.getItem(xpKey) !== '1') {
          localStorage.setItem(xpKey, '1');
          grantXP(5);
        }
        const allChecked = [...boxes].every((b) => b.checked);
        if (allChecked) grantXP(0, { badgeId: 'checklist-queen' });
      });
    });
  });
}

function initQuizzes(container) {
  container.querySelectorAll('.quiz-card').forEach((card) => {
    const quizId = card.dataset.quizId;
    const answeredKey = `hdp-quiz-${quizId}`;
    const options = card.querySelectorAll('.quiz-option');
    const why = card.querySelector('.quiz-why');
    const alreadyAnswered = localStorage.getItem(answeredKey) === '1';

    if (alreadyAnswered) {
      options.forEach((o) => {
        o.disabled = true;
        if (o.dataset.correct === 'true') o.classList.add('correct');
      });
      why.hidden = false;
    }

    options.forEach((opt) => {
      opt.addEventListener('click', () => {
        if (opt.disabled) return;
        options.forEach((o) => {
          o.disabled = true;
          if (o.dataset.correct === 'true') o.classList.add('correct');
        });
        if (opt.dataset.correct !== 'true') opt.classList.add('selected-wrong');
        why.hidden = false;

        if (localStorage.getItem(answeredKey) !== '1') {
          localStorage.setItem(answeredKey, '1');
          grantXP(10, { badgeId: 'quiz-whiz' });
        }
      });
    });
  });
}

function initSaveForLater(item) {
  const btn = document.getElementById('save-for-later-btn');
  if (!btn) return;
  const SAVE_KEY = 'hdp-saved-articles';
  const getSaved = () => JSON.parse(localStorage.getItem(SAVE_KEY) || '[]');

  const refresh = () => {
    const saved = getSaved();
    const isSaved = saved.includes(item.id);
    btn.classList.toggle('saved', isSaved);
    btn.innerHTML = isSaved ? '♥ Saved' : '♡ Save for later';
  };

  btn.addEventListener('click', () => {
    let saved = getSaved();
    if (saved.includes(item.id)) {
      saved = saved.filter((id) => id !== item.id);
    } else {
      saved.push(item.id);
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(saved));
    refresh();
  });

  refresh();
}

function relatedCardsHtml(currentId, category) {
  const related = ALL_ITEMS
    .filter((i) => i.id !== currentId && i.type !== 'tool' && i.category === category)
    .slice(0, 3);
  const fallback = ALL_ITEMS.filter((i) => i.id !== currentId && i.type !== 'tool').slice(0, 3);
  const items = related.length ? related : fallback;

  return `
    <div class="tool-recs">
      <p class="tool-list-title">📚 Continue Learning</p>
      <div class="tool-recs-grid">
        ${items.map((i) => `
          <a class="tool-rec-card" href="${BASE}pages/article.html?id=${i.id}">
            <img src="${i.image}" alt="">
            <span><strong>${i.title}</strong><em>${i.readTime || 'Quick read'}</em></span>
          </a>`).join('')}
      </div>
    </div>`;
}

function journeySidebarHtml(item, chapters) {
  return `
    <a class="back-link" href="../index.html#articles">← Back to All Articles</a>
    <div class="journey-card">
      <img src="${item.image}" alt="">
      <h3>${item.title}</h3>
      <div class="progress-track"><div class="progress-fill" id="sidebar-progress-fill"></div></div>
      <span id="sidebar-progress-label">0% complete</span>
    </div>
    <p class="journey-title">Your Journey <span>${chapters.length} Chapters</span></p>
    <ol class="journey-list" id="journey-list">
      ${chapters.map((c, i) => `<li><a href="#${c.id}" data-journey-link="${i}"><span class="journey-num">${i + 1}</span>${c.title}</a></li>`).join('')}
    </ol>`;
}

function statsSidebarHtml() {
  return `
    <div class="level-card">
      <p class="level-greeting">Hey, Queen! 👑</p>
      <div class="level-ring" id="level-ring" style="--pct:0"><span id="level-num">1</span></div>
      <p id="level-xp-label" class="level-xp-label">0 / 250 XP to Level 2</p>
    </div>
    <div class="sidebar-card">
      <p class="sidebar-card-title">Badges <span id="badges-count">0/${BADGES.length}</span></p>
      <div class="badges-grid" id="badges-grid"></div>
    </div>
    <div class="sidebar-card">
      <p class="sidebar-card-title">🔥 <span id="streak-count">0</span> Day Streak</p>
      <div class="streak-days" id="streak-days"></div>
    </div>
    <div class="sidebar-card">
      <p class="sidebar-card-title">Dream Board</p>
      <ul class="dreamboard-list" id="dreamboard-list"></ul>
    </div>`;
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
  const { html: bodyHtml, chapters } = formatArticleBody(item.content, item.id);

  if (isTool) {
    container.innerHTML = `
      <a class="back-link" href="../index.html#tools">← Back</a>
      <span class="card-category card-category-static">${item.category}</span>
      <h1 class="article-title">${item.title}</h1>
      <div class="article-hero-img"><img src="${item.image}" alt="${item.title}"></div>
      <div class="article-body">${bodyHtml}</div>
      <div id="tool-container" class="mt-lg"></div>
    `;
    const toolContainer = document.getElementById('tool-container');
    const rendered = renderTool(item.id, toolContainer);
    if (!rendered) {
      toolContainer.innerHTML = `<p class="section-sub">This tool is coming soon — check back shortly!</p>`;
    }
    optimizeImages(document);
    return;
  }

  container.classList.add('masterclass-layout');
  container.innerHTML = `
    <aside class="journey-sidebar">${journeySidebarHtml(item, chapters)}</aside>
    <main class="article-main">
      <div class="article-meta-row">
        <span class="card-category card-category-static">${item.category}</span>
        ${item.difficulty ? `<span class="difficulty-badge">${item.difficulty}</span>` : ''}
        <button class="save-btn" id="save-for-later-btn" type="button">♡ Save for later</button>
      </div>
      <h1 class="article-title">${item.title}</h1>
      <div class="article-meta-sub">
        ${item.readTime ? `<span>${item.readTime}</span>` : ''}
        ${chapters.length ? `<span id="chapters-complete-badge">0 of ${chapters.length} chapters complete</span>` : ''}
      </div>
      <div class="article-hero-img"><img src="${item.image}" alt="${item.title}"></div>
      <div class="article-body">${bodyHtml}</div>
      ${relatedCardsHtml(item.id, item.category)}
    </main>
    <aside class="stats-sidebar">${statsSidebarHtml()}</aside>
  `;

  initChapterTracking(container, item.id, chapters);
  initChecklistPersistence(container);
  initQuizzes(container);
  initSaveForLater(item);
  refreshLevelUI();
  refreshBadgesUI();
  renderStreak();
  renderDreamBoard();
  optimizeImages(document);
}

document.addEventListener('DOMContentLoaded', init);
