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
  let checkinIndex = 0;
  let builderIndex = 0;
  let bossIndex = 0;

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

      if (trimmed.startsWith('%%CHECKIN')) {
        const lines = trimmed.split('\n').slice(1);
        let title = 'Girl, What Are We Working On Today?';
        let question = '';
        const options = [];
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('TITLE:')) title = l.slice(6).trim();
          else if (l.startsWith('QUESTION:')) question = l.slice(9).trim();
          else if (l.startsWith('OPTION:')) {
            const [label, feedback] = l.slice(7).split('|').map((s) => s.trim());
            options.push({ label, feedback });
          }
        });
        const id = `${articleId}-checkin-${checkinIndex++}`;
        return `
          <div class="checkin-card" data-checkin-id="${id}">
            <p class="quiz-label">💗 ${title}</p>
            <p class="checkin-question">${applyBold(question)}</p>
            <div class="checkin-options">
              ${options.map((o, i) => `<button class="checkin-option" data-index="${i}" type="button">${applyBold(o.label)}</button>`).join('')}
            </div>
            <p class="checkin-feedback" hidden></p>
          </div>
          <script type="application/json" class="checkin-data">${JSON.stringify(options)}</script>`;
      }

      if (trimmed.startsWith('%%MAP')) {
        const lines = trimmed.split('\n').slice(1);
        let title = 'Your Money Mission';
        let cta = '';
        const items = [];
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('TITLE:')) title = l.slice(6).trim();
          else if (l.startsWith('CTA:')) cta = l.slice(4).trim();
          else if (l.startsWith('ITEM:')) items.push(l.slice(5).trim());
        });
        return `
          <div class="money-map-card">
            <p class="quiz-label">💎 ${title}</p>
            <ul class="money-map-list">
              ${items.map((i) => `<li><span class="map-check">✓</span>${applyBold(i)}</li>`).join('')}
            </ul>
            ${cta ? `<button class="btn btn-primary hero-lets-go" type="button">${cta} →</button>` : ''}
          </div>`;
      }

      if (trimmed.startsWith('%%BUILDER') || trimmed.startsWith('%%FINALBOSS')) {
        const isBoss = trimmed.startsWith('%%FINALBOSS');
        const lines = trimmed.split('\n').slice(1);
        let boxId = '';
        let title = isBoss ? 'Your Final Money Mission' : 'Build Your Money Idea';
        let skills = [];
        let badgeId = '';
        let xp = isBoss ? 250 : 25;
        let nextId = '';
        const fields = [];
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('ID:')) boxId = l.slice(3).trim();
          else if (l.startsWith('TITLE:')) title = l.slice(6).trim();
          else if (l.startsWith('SKILLS:')) skills = l.slice(7).split(',').map((s) => s.trim()).filter(Boolean);
          else if (l.startsWith('BADGE:')) badgeId = l.slice(6).trim();
          else if (l.startsWith('XP:')) xp = Number(l.slice(3).trim()) || xp;
          else if (l.startsWith('NEXT:')) nextId = l.slice(5).trim();
          else if (l.startsWith('FIELD:')) {
            const [label, placeholder] = l.slice(6).split('|').map((s) => s.trim());
            fields.push({ label, placeholder: placeholder || '' });
          }
        });
        const idx = isBoss ? bossIndex++ : builderIndex++;
        const uid = `${articleId}-${isBoss ? 'boss' : 'builder'}-${boxId || idx}`;
        const fieldsHtml = fields
          .map((f, i) => `
            <label class="builder-field">
              <span>${applyBold(f.label)}</span>
              <textarea data-field-index="${i}" data-field-label="${f.label.replace(/"/g, '&quot;')}" placeholder="${(f.placeholder || '').replace(/"/g, '&quot;')}" rows="2"></textarea>
            </label>`)
          .join('');

        if (isBoss) {
          return `
            <div class="final-boss-card" data-boss-id="${uid}">
              <p class="quiz-label">👑 FINAL MONEY MISSION</p>
              <p class="final-boss-title">${applyBold(title)}</p>
              <div class="builder-fields">${fieldsHtml}</div>
              <button class="btn btn-primary final-boss-submit" type="button">Submit My Money Plan</button>
              <div class="final-boss-complete" hidden>
                <p class="completion-title">🎀 You Did It, Girl!</p>
                <p class="completion-sub">MONEY MISSION COMPLETE 💎</p>
                <p class="completion-xp">+${xp} XP EARNED</p>
                ${skills.length ? `<p class="completion-skills-title">SKILLS UNLOCKED</p><div class="completion-skills">${skills.map((s) => `<span class="skill-chip">${s}</span>`).join('')}</div>` : ''}
                <p class="completion-next-title">YOUR NEXT MONEY MOVE</p>
                <p class="completion-next-text"></p>
                <div class="completion-actions">
                  ${nextId ? `<a class="btn btn-primary" href="${BASE}pages/article.html?id=${nextId}">Start My Next Mission →</a>` : ''}
                </div>
              </div>
            </div>
            <script type="application/json" class="final-boss-data">${JSON.stringify({ skills, badgeId, xp, nextId })}</script>`;
        }

        return `
          <div class="builder-card" data-builder-id="${uid}">
            <p class="quiz-label">🎀 ${applyBold(title)}</p>
            <div class="builder-fields">${fieldsHtml}</div>
            <div class="builder-summary">
              <p class="builder-summary-title">✨ Your Money Idea</p>
              <ul class="builder-summary-list"></ul>
            </div>
          </div>`;
      }

      if (trimmed.startsWith('%%PATHQUIZ')) {
        const lines = trimmed.split('\n').slice(1);
        let title = 'Choose Your Path';
        let subtitle = '';
        const options = [];
        const results = {};
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('TITLE:')) title = l.slice(6).trim();
          else if (l.startsWith('SUBTITLE:')) subtitle = l.slice(9).trim();
          else if (l.startsWith('OPTION:')) {
            const [label, icon] = l.slice(7).split('|').map((s) => s.trim());
            options.push({ label, icon });
          } else if (l.startsWith('RESULT:')) {
            const [label, icon, headline, desc, tags] = l.slice(7).split('|').map((s) => s.trim());
            results[label] = { icon, headline, desc, tags: tags ? tags.split(',').map((t) => t.trim()) : [] };
          }
        });
        const pathId = `path-${slugify(title)}-${articleId}`;
        return `
          <div class="pathquiz-grid" data-pathquiz-id="${pathId}">
            <div class="pathquiz-card">
              <p class="quiz-label">🌟 ${title}</p>
              <p class="pathquiz-sub">${subtitle}</p>
              <div class="pathquiz-options">
                ${options.map((o) => `<button class="pathquiz-option" data-label="${o.label}" type="button"><span class="pathquiz-icon">${o.icon}</span>${o.label}</button>`).join('')}
              </div>
            </div>
            <div class="pathquiz-result" hidden>
              <p class="quiz-label">🎉 Niche Match Result</p>
              <p class="pathquiz-result-sub">Based on your answer...</p>
              <div class="pathquiz-result-body">
                <span class="pathquiz-result-icon"></span>
                <p class="pathquiz-result-headline"></p>
                <p class="pathquiz-result-desc"></p>
                <div class="pathquiz-tags"></div>
              </div>
            </div>
          </div>
          <script type="application/json" class="pathquiz-data">${JSON.stringify(results)}</script>`;
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
            <p class="quiz-reassure">Choose wisely, Queen! There's no wrong answer here — just learning. 💕</p>
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
      refreshTodaysGoal(articleId, chapters);
      checkLevelComplete(chapters);
      if (done && !wasDone) {
        const total = countCompletedChaptersGlobally();
        playUnlock();
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
  if (badge) badge.textContent = `${done} of ${buttons.length} money moves complete`;

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

function initChecklistPersistence(container, articleId, chapters) {
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
        refreshTodaysGoal(articleId, chapters);
      });
    });
  });
}

function initQuizzes(container, articleId, chapters) {
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
          playChime();
          grantXP(10, { badgeId: 'quiz-whiz' });
        }
        refreshTodaysGoal(articleId, chapters);
      });
    });
  });
}

function initPathQuizzes(container) {
  container.querySelectorAll('[data-pathquiz-id]').forEach((grid) => {
    const dataScript = grid.nextElementSibling;
    if (!dataScript || !dataScript.classList.contains('pathquiz-data')) return;
    const results = JSON.parse(dataScript.textContent);
    const options = grid.querySelectorAll('.pathquiz-option');
    const resultBox = grid.querySelector('.pathquiz-result');
    const answeredKey = `hdp-pathquiz-${grid.dataset.pathquizId}`;

    const reveal = (label) => {
      const r = results[label];
      if (!r) return;
      resultBox.hidden = false;
      resultBox.querySelector('.pathquiz-result-icon').textContent = r.icon;
      resultBox.querySelector('.pathquiz-result-headline').textContent = r.headline;
      resultBox.querySelector('.pathquiz-result-desc').textContent = r.desc;
      resultBox.querySelector('.pathquiz-tags').innerHTML = r.tags.map((t) => `<span class="pathquiz-tag">${t}</span>`).join('');
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    const savedLabel = localStorage.getItem(answeredKey);
    if (savedLabel) {
      options.forEach((o) => o.classList.toggle('selected', o.dataset.label === savedLabel));
      reveal(savedLabel);
    }

    options.forEach((opt) => {
      opt.addEventListener('click', () => {
        options.forEach((o) => o.classList.remove('selected'));
        opt.classList.add('selected');
        const isFirstAnswer = !localStorage.getItem(answeredKey);
        localStorage.setItem(answeredKey, opt.dataset.label);
        reveal(opt.dataset.label);
        if (isFirstAnswer) grantXP(10);
      });
    });
  });
}

/* =============================================
   OPTIONAL SOUND SYSTEM
   Off by default, always. A single toggle button controls it;
   preference persists in localStorage. No audio files — just a
   couple of soft synthesized tones via the Web Audio API, so
   there's nothing to load or host.
   ============================================= */
const SOUND_KEY = 'hdp-sound-enabled';
let audioCtx = null;

function isSoundOn() {
  return localStorage.getItem(SOUND_KEY) === '1';
}

function playTone(freq, duration) {
  if (!isSoundOn()) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (_) {
    // Web Audio unsupported or blocked — sound is a nice-to-have, never required.
  }
}

const playChime = () => playTone(880, 0.35);
const playSparkle = () => playTone(1200, 0.2);
const playUnlock = () => { playTone(660, 0.15); window.setTimeout(() => playTone(990, 0.25), 120); };

function initSoundToggle() {
  const btn = document.getElementById('sound-toggle-btn');
  if (!btn) return;
  const refresh = () => {
    const on = isSoundOn();
    btn.textContent = on ? '🔊 Sound On' : '🔈 Sound Off';
    btn.classList.toggle('on', on);
  };
  btn.addEventListener('click', () => {
    localStorage.setItem(SOUND_KEY, isSoundOn() ? '0' : '1');
    refresh();
    if (isSoundOn()) playChime();
  });
  refresh();
}

/* =============================================
   GIRL CHECK-IN
   A single-select question with instant, contextual feedback.
   Purely conversational — doesn't gate anything, just gives the
   reader a moment of "this thing is talking to me" before the
   lesson starts.
   ============================================= */
function initCheckins(container) {
  container.querySelectorAll('[data-checkin-id]').forEach((card) => {
    const dataScript = card.nextElementSibling;
    if (!dataScript || !dataScript.classList.contains('checkin-data')) return;
    const options = JSON.parse(dataScript.textContent);
    const buttons = card.querySelectorAll('.checkin-option');
    const feedback = card.querySelector('.checkin-feedback');
    const key = `hdp-checkin-${card.dataset.checkinId}`;

    const reveal = (index) => {
      const o = options[index];
      if (!o) return;
      feedback.textContent = o.feedback;
      feedback.hidden = false;
    };

    const saved = localStorage.getItem(key);
    if (saved !== null) {
      buttons.forEach((b) => b.classList.toggle('selected', b.dataset.index === saved));
      reveal(Number(saved));
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const isFirst = localStorage.getItem(key) === null;
        buttons.forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        localStorage.setItem(key, btn.dataset.index);
        reveal(Number(btn.dataset.index));
        if (isFirst) {
          playSparkle();
          grantXP(5);
        }
      });
    });
  });
}

/* =============================================
   BUILDER
   Fill-in-the-blank fields that live-save to localStorage (so a
   refresh never wipes her answers) and generate a running summary
   card as she types. This is the "she BUILDS something" piece of
   the masterclass, not just reads and answers.
   ============================================= */
function wireBuilderFields(card, storagePrefix, onAllFilled) {
  const textareas = card.querySelectorAll('textarea[data-field-index]');
  const summaryList = card.querySelector('.builder-summary-list');
  let awarded = localStorage.getItem(`${storagePrefix}-awarded`) === '1';

  const refreshSummary = () => {
    if (!summaryList) return;
    const items = [...textareas]
      .filter((t) => t.value.trim())
      .map((t) => `<li><strong>${t.dataset.fieldLabel}:</strong> ${t.value.trim()}</li>`);
    summaryList.innerHTML = items.length
      ? items.join('')
      : '<li class="builder-summary-empty">Start filling in the fields above — your idea will build itself right here.</li>';
    const allFilled = [...textareas].every((t) => t.value.trim());
    if (allFilled && !awarded) {
      awarded = true;
      localStorage.setItem(`${storagePrefix}-awarded`, '1');
      if (onAllFilled) onAllFilled();
    }
  };

  textareas.forEach((t) => {
    const key = `${storagePrefix}-field-${t.dataset.fieldIndex}`;
    const saved = localStorage.getItem(key);
    if (saved) t.value = saved;
    t.addEventListener('input', () => {
      localStorage.setItem(key, t.value);
      refreshSummary();
    });
  });

  refreshSummary();
  return { textareas, refreshSummary };
}

function initBuilders(container) {
  container.querySelectorAll('[data-builder-id]').forEach((card) => {
    wireBuilderFields(card, `hdp-builder-${card.dataset.builderId}`, () => {
      playSparkle();
      grantXP(25, { badgeId: 'offer-builder' });
    });
  });
}

/* =============================================
   FINAL BOSS
   Same field-building experience as Builder, but styled as the
   masterclass's climactic challenge and ending in a real
   completion screen: XP total, skills unlocked, badge, and a
   "next move" line pulled straight from her own last answer.
   ============================================= */
function initFinalBoss(container) {
  container.querySelectorAll('[data-boss-id]').forEach((card) => {
    const dataScript = card.nextElementSibling;
    if (!dataScript || !dataScript.classList.contains('final-boss-data')) return;
    const { badgeId, xp, nextId } = JSON.parse(dataScript.textContent);
    const storagePrefix = `hdp-boss-${card.dataset.bossId}`;
    const submitBtn = card.querySelector('.final-boss-submit');
    const completeBox = card.querySelector('.final-boss-complete');
    const { textareas } = wireBuilderFields(card, storagePrefix, () => {});

    const alreadySubmitted = localStorage.getItem(`${storagePrefix}-submitted`) === '1';
    if (alreadySubmitted) {
      completeBox.hidden = false;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Money Plan Submitted ✓';
      const lastAnswer = [...textareas].reverse().find((t) => t.value.trim());
      const nextText = completeBox.querySelector('.completion-next-text');
      if (nextText && lastAnswer) nextText.textContent = lastAnswer.value.trim();
    }

    submitBtn?.addEventListener('click', () => {
      const filled = [...textareas].filter((t) => t.value.trim());
      if (!filled.length) {
        submitBtn.textContent = 'Fill in at least one field, girl 💗';
        window.setTimeout(() => { submitBtn.textContent = 'Submit My Money Plan'; }, 1800);
        return;
      }
      localStorage.setItem(`${storagePrefix}-submitted`, '1');
      completeBox.hidden = false;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Money Plan Submitted ✓';
      const lastAnswer = filled[filled.length - 1];
      const nextText = completeBox.querySelector('.completion-next-text');
      if (nextText) nextText.textContent = lastAnswer.value.trim();
      playUnlock();
      grantXP(xp, { badgeId: badgeId || undefined });
      completeBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      <p class="tool-list-title">💕 More Money Moves</p>
      <div class="tool-recs-grid">
        ${items.map((i) => `
          <a class="tool-rec-card" href="${BASE}pages/article.html?id=${i.id}">
            <img src="${i.image}" alt="">
            <span><strong>${i.title}</strong><em>${i.readTime || 'Quick read'}</em></span>
          </a>`).join('')}
      </div>
    </div>`;
}

const DIFFICULTY_XP = { 'Beginner Friendly': 100, Intermediate: 150, Advanced: 200 };
const DIFFICULTY_STARS = { 'Beginner Friendly': '✦✦✧', Intermediate: '✦✦✦', Advanced: '✦✦✦' };

function heroLevelCardHtml(item) {
  const xp = DIFFICULTY_XP[item.difficulty] || 100;
  const stars = DIFFICULTY_STARS[item.difficulty] || '✦✦✧';
  const missionTag = item.missionNumber
    ? `💎 MONEY MISSION #${String(item.missionNumber).padStart(2, '0')}${item.missionLabel ? ` · ${item.missionLabel}` : ''}`
    : '💎 MONEY MISSION';
  return `
    <div class="hero-level-card">
      <span class="level-pill">${missionTag}</span>
      <h1 class="hero-level-title">${item.title}</h1>
      <p class="hero-level-desc">${item.missionBrief ? `Your mission, girl: ${item.missionBrief}` : item.excerpt}</p>
      <div class="hero-level-chips">
        <span class="hero-chip">🕐 ${item.readTime || 'Self-paced'}<br><small>Estimated Time</small></span>
        <span class="hero-chip">💰 +${xp} XP<br><small>Reward</small></span>
        <span class="hero-chip">${stars}<br><small>Difficulty</small></span>
        ${item.moneySkill ? `<span class="hero-chip">✨ ${item.moneySkill}<br><small>Money Skill</small></span>` : ''}
        <button class="btn btn-primary hero-lets-go" type="button">Let's Go! →</button>
      </div>
    </div>`;
}

const QUOTES = [
  'The life you want is on the other side of consistency.',
  "Progress, not perfection — that's the whole game.",
  'You are one brave message away from a different month.',
  'Small steps, done daily, build the life you keep dreaming about.',
  "Confidence isn't a feeling you wait for. It's a habit you build.",
];

function quoteCardHtml() {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  return `
    <div class="quote-card">
      <p class="sidebar-card-title">Today's Quote ✨</p>
      <p class="quote-text">"${quote}"</p>
      <button class="btn btn-primary" id="start-challenge-btn" type="button">Start Challenge →</button>
    </div>`;
}

const REAL_TOOLS = [
  { id: 'ai-prompt-builder', icon: '🤖', label: 'AI Prompt Builder' },
  { id: 'freelance-rate-calculator', icon: '💵', label: 'Rate Calculator' },
  { id: 'resume-review-checklist', icon: '📄', label: 'Resume Review' },
  { id: 'business-idea-validator', icon: '💡', label: 'Idea Validator' },
  { id: 'personal-budget-planner', icon: '📊', label: 'Budget Planner' },
];

function quickToolsHtml() {
  return `
    <div class="quick-tools-card">
      <p class="sidebar-card-title">Quick Tools 🛠️</p>
      <div class="quick-tools-grid">
        ${REAL_TOOLS.map((t) => `
          <a class="quick-tool" href="${BASE}pages/article.html?id=${t.id}">
            <span class="quick-tool-icon">${t.icon}</span>${t.label}
          </a>`).join('')}
      </div>
    </div>`;
}

function todaysGoalHtml() {
  return `
    <div class="sidebar-card">
      <p class="sidebar-card-title">Today's Goal <span id="todays-goal-count">0/3</span></p>
      <ul class="todays-goal-list" id="todays-goal-list">
        <li id="goal-chapter"><span class="goal-check">☐</span> Read a chapter</li>
        <li id="goal-checklist"><span class="goal-check">☐</span> Complete a checklist</li>
        <li id="goal-challenge"><span class="goal-check">☐</span> Try the mini scenario</li>
      </ul>
    </div>`;
}

function refreshTodaysGoal(articleId, chapters) {
  const anyChapterDone = chapters.some((c, i) => localStorage.getItem(`hdp-chapter-${articleId}-${i}`) === '1');
  const anyChecklistDone = Object.keys(localStorage).some((k) => k.startsWith(`hdp-check-xp-${articleId}-`));
  const anyQuizDone = Object.keys(localStorage).some((k) => k.startsWith(`hdp-quiz-${articleId}-`) && localStorage.getItem(k) === '1');

  const goals = [
    ['goal-chapter', anyChapterDone],
    ['goal-checklist', anyChecklistDone],
    ['goal-challenge', anyQuizDone],
  ];
  let done = 0;
  goals.forEach(([id, isDone]) => {
    const li = document.getElementById(id);
    if (!li) return;
    li.classList.toggle('done', isDone);
    li.querySelector('.goal-check').textContent = isDone ? '✅' : '☐';
    if (isDone) done++;
  });
  const count = document.getElementById('todays-goal-count');
  if (count) count.textContent = `${done}/3`;
}

function levelCompleteHtml(item, nextItem) {
  return `
    <div class="level-complete-card" id="level-complete-card" hidden>
      <p class="level-complete-badge">🎉 LEVEL COMPLETE!</p>
      <p class="level-complete-sub">You completed</p>
      <p class="level-complete-title">${item.title}</p>
      <ul class="level-complete-rewards">
        <li>+ XP earned this masterclass</li>
        <li>+ Confidence</li>
        <li>+ Knowledge</li>
        <li>+ Clarity</li>
      </ul>
      ${nextItem ? `<a class="btn btn-primary" href="${BASE}pages/article.html?id=${nextItem.id}">Continue to Next Level →</a>` : ''}
    </div>`;
}

function checkLevelComplete(chapters) {
  const card = document.getElementById('level-complete-card');
  if (!card || !chapters.length) return;
  const done = document.querySelectorAll('.chapter-complete-btn.done').length;
  if (done === chapters.length) {
    card.hidden = false;
  }
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
    ${todaysGoalHtml()}
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
    </div>
    ${quickToolsHtml()}`;
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
  const related = ALL_ITEMS.filter((i) => i.id !== item.id && i.type !== 'tool' && i.category === item.category);
  const fallbackRelated = ALL_ITEMS.filter((i) => i.id !== item.id && i.type !== 'tool');
  const nextItem = (related.length ? related : fallbackRelated)[0];

  container.innerHTML = `
    <aside class="journey-sidebar">${journeySidebarHtml(item, chapters)}</aside>
    <main class="article-main">
      ${heroLevelCardHtml(item)}
      <div class="article-meta-row">
        <span class="card-category card-category-static">${item.category}</span>
        ${item.difficulty ? `<span class="difficulty-badge">${item.difficulty}</span>` : ''}
        ${chapters.length ? `<span id="chapters-complete-badge">0 of ${chapters.length} money moves complete</span>` : ''}
        <button class="save-btn" id="save-for-later-btn" type="button">♡ Save for later</button>
        <button class="save-btn" id="sound-toggle-btn" type="button">🔈 Sound Off</button>
      </div>
      <div class="article-hero-img"><img src="${item.image}" alt="${item.title}"></div>
      <div class="article-body">${bodyHtml}</div>
      ${levelCompleteHtml(item, nextItem)}
      ${quoteCardHtml()}
      ${relatedCardsHtml(item.id, item.category)}
    </main>
    <aside class="stats-sidebar">${statsSidebarHtml()}</aside>
  `;

  initChapterTracking(container, item.id, chapters);
  initChecklistPersistence(container, item.id, chapters);
  initQuizzes(container, item.id, chapters);
  initPathQuizzes(container);
  initCheckins(container);
  initBuilders(container);
  initFinalBoss(container);
  initSoundToggle();
  initSaveForLater(item);
  refreshLevelUI();
  refreshBadgesUI();
  renderStreak();
  renderDreamBoard();
  refreshTodaysGoal(item.id, chapters);
  checkLevelComplete(chapters);

  const letsGo = container.querySelector('.hero-lets-go');
  if (letsGo && chapters.length) {
    letsGo.addEventListener('click', () => {
      document.getElementById(chapters[0].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const startChallenge = document.getElementById('start-challenge-btn');
  if (startChallenge) {
    startChallenge.addEventListener('click', () => {
      const firstQuiz = container.querySelector('.quiz-card, .pathquiz-grid');
      firstQuiz?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  optimizeImages(document);
}

document.addEventListener('DOMContentLoaded', init);
