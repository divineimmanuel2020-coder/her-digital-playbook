/* =============================================
   ARTICLE.JS
   Brings a pre-rendered article/tool page to life.

   The page itself (/blog/<id>.html, /tools/<id>.html) is built
   ahead of time by `node scripts/build.mjs` — the headline, every
   chapter, every paragraph, the sidebars and the related links are
   already sitting in the HTML that the server sends. Crawlers (and
   readers with JavaScript off) get all of it without running a
   single script.

   This file only adds behaviour on top: XP / levels / badges /
   streaks, chapter tracking, checklists, quizzes, the Dream Board,
   save-for-later, and the interactive tool widgets. Progress is real
   and persists per-browser via localStorage.

   It never fetches article content and never reads window.location
   to decide what to show. The small #article-data JSON block the
   build writes into each page tells it which article it's on.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { renderTool } from './tools.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { awardXP, getXP, getLevelProgress, getEarnedBadges, BADGES, recordVisitAndGetStreak, getDreamBoard, toggleDream, DREAM_ITEMS } from './gamify.js';
import { initGirlGangPopup } from './girlgang-popup.js';
import { maybeShowJoinReminder } from './notifications.js';

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

/* =============================================
   DIGITAL SKILLS PASSPORT
   A checklist that doubles as a progress tracker: check off each
   skill, watch the counter and progress bar move, unlock a badge
   when every skill on the passport is checked.
   ============================================= */
function initPassports(container) {
  container.querySelectorAll('[data-passport-id]').forEach((card) => {
    const total = Number(card.dataset.passportTotal) || 0;
    const xpEach = Number(card.dataset.passportXp) || 5;
    const badgeId = card.dataset.passportBadge || undefined;
    const boxes = card.querySelectorAll('input[data-passport-item]');
    const countNum = card.querySelector('.passport-count-num');
    const fill = card.querySelector('.passport-progress-fill');
    const complete = card.querySelector('.passport-complete');

    const refresh = () => {
      const done = [...boxes].filter((b) => b.checked).length;
      if (countNum) countNum.textContent = done;
      if (fill) fill.style.width = total ? `${Math.round((done / total) * 100)}%` : '0%';
      if (complete) complete.hidden = done < total || total === 0;
    };

    boxes.forEach((box) => {
      const key = `hdp-passport-${box.dataset.passportItem}`;
      box.checked = localStorage.getItem(key) === '1';
      box.addEventListener('change', () => {
        localStorage.setItem(key, box.checked ? '1' : '0');
        const xpKey = `${key}-xp`;
        if (box.checked && localStorage.getItem(xpKey) !== '1') {
          localStorage.setItem(xpKey, '1');
          grantXP(xpEach);
        }
        const done = [...boxes].filter((b) => b.checked).length;
        if (done === total && total > 0) {
          playUnlock();
          grantXP(0, { badgeId });
        }
        refresh();
      });
    });
    refresh();
  });
}

/* =============================================
   STAGE BUILDER
   A row of tappable stage pills for build-along processes (idea
   -> audience -> product -> price -> platform -> launch). Each
   pill toggles complete; finishing every stage unlocks a badge.
   ============================================= */
function initStages(container) {
  container.querySelectorAll('[data-stages-id]').forEach((card) => {
    const total = Number(card.dataset.stagesTotal) || 0;
    const xpEach = Number(card.dataset.stagesXp) || 15;
    const badgeId = card.dataset.stagesBadge || undefined;
    const pills = card.querySelectorAll('.stage-pill');
    const countNum = card.querySelector('.stages-count-num');
    const fill = card.querySelector('.stages-progress-fill');
    const complete = card.querySelector('.stages-complete');

    const refresh = () => {
      const done = [...pills].filter((p) => p.classList.contains('done')).length;
      if (countNum) countNum.textContent = done;
      if (fill) fill.style.width = total ? `${Math.round((done / total) * 100)}%` : '0%';
      if (complete) complete.hidden = done < total || total === 0;
    };

    pills.forEach((pill) => {
      const key = `hdp-stage-${pill.dataset.stageKey}`;
      if (localStorage.getItem(key) === '1') pill.classList.add('done');
      pill.addEventListener('click', () => {
        const wasDone = pill.classList.contains('done');
        const done = pill.classList.toggle('done');
        localStorage.setItem(key, done ? '1' : '0');
        if (done && !wasDone) grantXP(xpEach);
        const doneCount = [...pills].filter((p) => p.classList.contains('done')).length;
        if (doneCount === total && total > 0) {
          playUnlock();
          grantXP(0, { badgeId });
        }
        refresh();
      });
    });
    refresh();
  });
}

/* =============================================
   CLIENT SCENARIO SIMULATOR
   Realistic client situations with several plausible responses —
   no single "correct" answer, just honest feedback on the
   trade-offs of the one she picks.
   ============================================= */
function initScenarios(container) {
  container.querySelectorAll('[data-scenario-id]').forEach((card) => {
    const dataScript = card.nextElementSibling;
    if (!dataScript || !dataScript.classList.contains('scenario-data')) return;
    const options = JSON.parse(dataScript.textContent);
    const buttons = card.querySelectorAll('.scenario-option');
    const feedback = card.querySelector('.scenario-feedback');
    const key = `hdp-scenario-${card.dataset.scenarioId}`;

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
          playChime();
          grantXP(10, { badgeId: 'client-ready' });
        }
      });
    });
  });
}

/* =============================================
   30-DAY CHALLENGE TRACKER
   Every day is a real, individually-checkable mission with its
   own XP reward, grouped into weeks, with a running total and a
   final badge for finishing all 30 days. Genuinely persists via
   localStorage — nothing here is decorative.
   ============================================= */
function initChallenges(container) {
  container.querySelectorAll('[data-challenge-id]').forEach((card) => {
    const total = Number(card.dataset.challengeTotal) || 0;
    const badgeId = card.dataset.challengeBadge || undefined;
    const dayBoxes = card.querySelectorAll('input[data-challenge-day]');
    const countNum = card.querySelector('.challenge-count-num');
    const xpNum = card.querySelector('.challenge-xp-num');
    const fill = card.querySelector('.challenge-progress-fill');
    const complete = card.querySelector('.challenge-complete');

    const dayXP = (box) => Number(box.closest('.challenge-day')?.dataset.dayXp) || 15;

    const refresh = () => {
      const doneBoxes = [...dayBoxes].filter((b) => b.checked);
      const done = doneBoxes.length;
      const xpTotal = doneBoxes.reduce((sum, b) => sum + dayXP(b), 0);
      if (countNum) countNum.textContent = done;
      if (xpNum) xpNum.textContent = xpTotal;
      if (fill) fill.style.width = total ? `${Math.round((done / total) * 100)}%` : '0%';
      if (complete) complete.hidden = done < total || total === 0;
    };

    dayBoxes.forEach((box) => {
      const key = `hdp-challenge-${box.dataset.challengeDay}`;
      box.checked = localStorage.getItem(key) === '1';
      box.addEventListener('change', () => {
        localStorage.setItem(key, box.checked ? '1' : '0');
        const xpKey = `${key}-xp`;
        if (box.checked && localStorage.getItem(xpKey) !== '1') {
          localStorage.setItem(xpKey, '1');
          grantXP(dayXP(box));
        }
        const done = [...dayBoxes].filter((b) => b.checked).length;
        if (done === total && total > 0) {
          playUnlock();
          grantXP(50, { badgeId });
        }
        refresh();
      });
    });
    refresh();
  });
}

/* =============================================
   MYTH VS REALITY
   A soft reveal: read the myth, tap to see the honest reality
   underneath. Awards a small XP the first time each one is
   revealed, and a badge once every myth on the page is revealed.
   ============================================= */
function initMyths(container) {
  const cards = container.querySelectorAll('.myth-card');
  const totalMyths = cards.length;

  const checkAllRevealed = () => {
    const revealedCount = [...cards].filter((c) => localStorage.getItem(`hdp-myth-${c.dataset.mythId}`) === '1').length;
    if (revealedCount === totalMyths && totalMyths > 0) {
      grantXP(0, { badgeId: 'myth-buster' });
    }
  };

  cards.forEach((card) => {
    const key = `hdp-myth-${card.dataset.mythId}`;
    const btn = card.querySelector('.myth-reveal-btn');
    const reality = card.querySelector('.myth-reality');

    if (localStorage.getItem(key) === '1') {
      reality.hidden = false;
      if (btn) btn.hidden = true;
    }

    btn?.addEventListener('click', () => {
      reality.hidden = false;
      btn.hidden = true;
      const isFirst = localStorage.getItem(key) !== '1';
      localStorage.setItem(key, '1');
      if (isFirst) {
        playSparkle();
        grantXP(5);
        checkAllRevealed();
      }
    });
  });
  checkAllRevealed();
}

/* =============================================
   $0 -> GOAL PROGRESS SIMULATOR
   Turns a flat income goal into a concrete, editable equation:
   pick a route, set an offer price, log sales so far, watch the
   real math and progress bar update live. Persists per device.
   ============================================= */
function initGoalSims(container) {
  container.querySelectorAll('[data-goalsim-id]').forEach((card) => {
    const goal = Number(card.dataset.goalsimGoal) || 1000;
    const id = card.dataset.goalsimId;
    const route = card.querySelector('.goalsim-route');
    const priceInput = card.querySelector('.goalsim-price');
    const completedInput = card.querySelector('.goalsim-completed');
    const targetNum = card.querySelector('.goalsim-target-num');
    const fill = card.querySelector('.goalsim-progress-fill');
    const amountLabel = card.querySelector('.goalsim-progress-amount');
    const complete = card.querySelector('.goalsim-complete');
    let awarded = localStorage.getItem(`hdp-goalsim-${id}-awarded`) === '1';

    const keyFor = (field) => `hdp-goalsim-${id}-${field}`;
    if (localStorage.getItem(keyFor('route'))) route.value = localStorage.getItem(keyFor('route'));
    if (localStorage.getItem(keyFor('price'))) priceInput.value = localStorage.getItem(keyFor('price'));
    if (localStorage.getItem(keyFor('completed'))) completedInput.value = localStorage.getItem(keyFor('completed'));

    const refresh = () => {
      const price = Number(priceInput.value) || 0;
      const completed = Number(completedInput.value) || 0;
      const earned = price * completed;
      const pct = price > 0 ? Math.min(100, Math.round((earned / goal) * 100)) : 0;
      if (targetNum) targetNum.textContent = price > 0 ? Math.ceil(goal / price) : '—';
      if (fill) fill.style.width = `${pct}%`;
      if (amountLabel) amountLabel.textContent = `$${earned.toLocaleString('en-US')}`;
      if (complete) {
        const hit = price > 0 && earned >= goal;
        complete.hidden = !hit;
        if (hit && !awarded) {
          awarded = true;
          localStorage.setItem(`hdp-goalsim-${id}-awarded`, '1');
          playUnlock();
          grantXP(30, { badgeId: 'goal-getter' });
        }
      }
    };

    route.addEventListener('change', () => { localStorage.setItem(keyFor('route'), route.value); });
    priceInput.addEventListener('input', () => { localStorage.setItem(keyFor('price'), priceInput.value); refresh(); });
    completedInput.addEventListener('input', () => { localStorage.setItem(keyFor('completed'), completedInput.value); refresh(); });
    refresh();
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

function refreshTodaysGoal(articleId, chapters) {
  const anyChapterDone = chapters.some((c, i) => localStorage.getItem(`hdp-chapter-${articleId}-${i}`) === '1');
  const anyChecklistDone = Object.keys(localStorage).some((k) => k.startsWith(`hdp-check-xp-${articleId}-`));
  const interactivePrefixes = ['hdp-quiz-', 'hdp-passport-', 'hdp-stage-', 'hdp-scenario-', 'hdp-challenge-', 'hdp-myth-', 'hdp-goalsim-'];
  const anyQuizDone = Object.keys(localStorage).some((k) => interactivePrefixes.some((p) => k.startsWith(`${p}${articleId}-`)));

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

function checkLevelComplete(chapters) {
  const card = document.getElementById('level-complete-card');
  if (!card || !chapters.length) return;
  const done = document.querySelectorAll('.chapter-complete-btn.done').length;
  if (done === chapters.length) {
    card.hidden = false;
  }
}

async function init() {
  const container = document.getElementById('article-content');
  const dataEl = document.getElementById('article-data');
  if (!container || !dataEl) return;

  let page;
  try {
    page = JSON.parse(dataEl.textContent);
  } catch (err) {
    console.error('[article] could not read #article-data', err);
    return;
  }
  const { id, type } = page;
  const chapters = Array.isArray(page.chapters) ? page.chapters : [];

  // Header / footer / popup are already inlined in the static HTML, so these
  // are no-ops (loadComponent returns early when the placeholder is gone).
  // They stay as a safety net for a page that was saved without them.
  await Promise.all([
    loadComponent('header-placeholder', '../components/header.html'),
    loadComponent('footer-placeholder', '../components/footer.html'),
    loadComponent('girlgang-popup-placeholder', '../components/girlgang-popup.html'),
  ]);
  await loadComponent('nav-placeholder', '../components/nav.html');
  rewriteRootLinks(document);
  initNav();
  initSearch();
  initGirlGangPopup();
  maybeShowJoinReminder();

  if (type === 'tool') {
    const toolContainer = document.getElementById('tool-container');
    if (toolContainer) {
      const rendered = renderTool(id, toolContainer);
      if (!rendered) {
        toolContainer.innerHTML = `<p class="section-sub">This tool is coming soon — check back shortly!</p>`;
      }
    }
    optimizeImages(document);
    return;
  }

  initChapterTracking(container, id, chapters);
  initChecklistPersistence(container, id, chapters);
  initQuizzes(container, id, chapters);
  initPathQuizzes(container);
  initCheckins(container);
  initBuilders(container);
  initFinalBoss(container);
  initPassports(container);
  initStages(container);
  initScenarios(container);
  initChallenges(container);
  initMyths(container);
  initGoalSims(container);
  initSoundToggle();
  initSaveForLater({ id });
  refreshLevelUI();
  refreshBadgesUI();
  renderStreak();
  renderDreamBoard();
  refreshTodaysGoal(id, chapters);
  checkLevelComplete(chapters);

  const letsGoButtons = container.querySelectorAll('.hero-lets-go');
  if (letsGoButtons.length && chapters.length) {
    letsGoButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        document.getElementById(chapters[0].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  const startChallenge = document.getElementById('start-challenge-btn');
  if (startChallenge) {
    startChallenge.addEventListener('click', () => {
      const firstInteractive = container.querySelector(
        '.quiz-card, .pathquiz-grid, .checkin-card, .builder-card, .money-map-card, .passport-card, .stages-card, .scenario-card, .challenge-card, .myth-card, .goalsim-card'
      );
      firstInteractive?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  optimizeImages(document);
}

document.addEventListener('DOMContentLoaded', init);
