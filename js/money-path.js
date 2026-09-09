/* =============================================
   JS/MONEY-PATH.JS
   Drives /pages/money-path.html. Reuses the existing .pathquiz-*
   CSS classes (already in style.css) for visual consistency with
   the single-question path quizzes inside articles, but drives a
   real multi-question, scored flow across all 10 questions.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initGirlGangPopup } from './girlgang-popup.js';
import { maybeShowJoinReminder } from './notifications.js';
import { MONEY_PATH_QUESTIONS, MONEY_PATH_RESULTS } from '../data/playground.js';
import { findItemById } from '../data/store.js';
import { pgGrantXP, pgMarkDone, pgHasDone, pgCheckQueenBadge, pgGet, pgSet, renderKeepExploring, articleHref } from './playground.js';

const gaEvent = (name, params = {}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };

const quizRoot = document.getElementById('money-path-quiz');
const resultRoot = document.getElementById('money-path-result');

let currentQ = 0;
let scores = {};

function renderQuestion() {
  const q = MONEY_PATH_QUESTIONS[currentQ];
  quizRoot.hidden = false;
  resultRoot.hidden = true;
  quizRoot.innerHTML = `
    <p class="pg-round-counter">Question ${currentQ + 1} of ${MONEY_PATH_QUESTIONS.length}</p>
    <div class="pathquiz-card">
      <p class="quiz-label">💸 ${q.question}</p>
      <div class="pathquiz-options">
        ${q.options.map((o, i) => `<button class="pathquiz-option" data-index="${i}" type="button"><span class="pathquiz-icon">✦</span>${o.label}</button>`).join('')}
      </div>
    </div>`;
  quizRoot.querySelectorAll('.pathquiz-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = q.options[Number(btn.dataset.index)].type;
      scores[type] = (scores[type] || 0) + 1;
      currentQ++;
      if (currentQ < MONEY_PATH_QUESTIONS.length) renderQuestion();
      else finishQuiz();
    });
  });
}

function pickResult() {
  const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return 'explorer';
  const [topType, topScore] = entries[0];
  const second = entries[1];
  // A clear win needs a real lead — otherwise we don't force an identity.
  if (topScore >= 3 && (!second || topScore - second[1] >= 2)) return topType;
  return 'explorer';
}

function finishQuiz() {
  const resultKey = pickResult();
  pgSet('money-path-result', resultKey);
  showResult(resultKey);
  gaEvent('money_path_completed', { result: resultKey });
  if (!pgHasDone('money-path-done')) {
    pgMarkDone('money-path-done');
    pgGrantXP(50, { badgeId: 'pathfinder' });
    pgCheckQueenBadge();
  }
}

function showResult(key) {
  const r = MONEY_PATH_RESULTS[key] || MONEY_PATH_RESULTS.explorer;
  quizRoot.hidden = true;
  resultRoot.hidden = false;
  resultRoot.innerHTML = `
    <div class="pathquiz-result">
      <p class="quiz-label">🎉 Your Digital Girl Profile</p>
      <div class="pathquiz-result-body">
        <span class="pathquiz-result-icon">${r.icon}</span>
        <p class="pathquiz-result-headline">${r.label}</p>
        <p class="pathquiz-result-desc">${r.desc}</p>
      </div>
      <p class="quiz-label" style="margin-top:1.5rem;">You May Enjoy</p>
      <div class="pathquiz-tags">${r.directions.map((d) => `<span class="pathquiz-tag">${d}</span>`).join('')}</div>
      <p class="quiz-label" style="margin-top:1.5rem;">Skills to Explore</p>
      <div class="pathquiz-tags">${r.skills.map((s) => `<span class="pathquiz-tag">${s}</span>`).join('')}</div>
      <div class="pg-first-moves">
        <h3>Your First Move</h3>
        <p>${r.firstMove}</p>
      </div>
      <div class="pg-template-actions">
        <button class="btn btn-secondary" id="retake-quiz" type="button">Retake the Quiz</button>
        <a class="btn btn-primary" href="${articleHref('30-day-digital-skills-challenge')}">Try the 30-Day Challenge →</a>
      </div>
      <p class="pg-disclaimer">This quiz is for exploration and educational purposes. It is not professional career counseling and does not guarantee career fit or income.</p>
    </div>`;

  document.getElementById('retake-quiz')?.addEventListener('click', () => {
    currentQ = 0;
    scores = {};
    renderQuestion();
  });

  const keepExploring = r.articles
    .map((id) => findItemById(id))
    .filter(Boolean)
    .map((item) => ({ href: articleHref(item.id), title: item.title, subtitle: item.readTime || 'Read this next', icon: '📖' }));
  renderKeepExploring(document.getElementById('keep-exploring'), keepExploring);
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

  gaEvent('money_path_started');

  const saved = pgGet('money-path-result');
  if (saved && MONEY_PATH_RESULTS[saved]) {
    showResult(saved);
  } else {
    renderQuestion();
  }
}

document.addEventListener('DOMContentLoaded', init);
