/* =============================================
   JS/GAME-ROOM.JS
   Drives /pages/game-room.html. Six mini-games share three
   generic round renderers (choice, binary, price) rather than
   six bespoke implementations. XP is awarded once per round and
   once per game completion, gated by localStorage flags, so
   replaying a game or refreshing the page can't farm XP.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initGirlGangPopup } from './girlgang-popup.js';
import { maybeShowJoinReminder } from './notifications.js';
import { GAME_MONEY_MOVES, GAME_RED_FLAG, GAME_SKILL_MATCH, GAME_INBOX_BOSS, GAME_PRICE_THIS, GAME_REAL_OR_SCAM } from '../data/playground.js';
import { findItemById } from '../data/store.js';
import { pgGrantXP, pgMarkDone, pgHasDone, pgCheckQueenBadge, renderKeepExploring, articleHref } from './playground.js';

const gaEvent = (name, params = {}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };

const ROUND_XP = 5;
const GAME_COMPLETE_XP = 20;

const GAMES = [
  { id: 'money-moves', icon: '💰', title: 'Money Moves', desc: 'Financial decision scenarios', kind: 'choice', data: GAME_MONEY_MOVES },
  { id: 'red-flag', icon: '🚩', title: 'Client or Red Flag?', desc: 'Spot the warning signs', kind: 'binary', data: GAME_RED_FLAG, flagField: 'isRedFlag', labels: ['Client 💗', 'Red Flag 🚩'] },
  { id: 'skill-match', icon: '🎯', title: 'Skill Match', desc: 'Match the problem to the skill', kind: 'skill', data: GAME_SKILL_MATCH },
  { id: 'inbox-boss', icon: '📥', title: 'Inbox Boss', desc: 'Handle real client messages', kind: 'choice', data: GAME_INBOX_BOSS },
  { id: 'price-this', icon: '💵', title: 'Price This Project', desc: 'Practice your pricing instincts', kind: 'price', data: GAME_PRICE_THIS },
  { id: 'real-scam', icon: '🕵️', title: 'Real or Scam?', desc: 'Sharpen your scam radar', kind: 'binary', data: GAME_REAL_OR_SCAM, flagField: 'isScam', labels: ['Real ✅', 'Scam 🚫'] },
];

const tabsRoot = document.getElementById('game-tabs');
const stageRoot = document.getElementById('game-stage');

let activeGame = null;
let roundIndex = 0;

function gameKey(id) { return `game-${id}`; }
function roundKey(id, i) { return `game-${id}-round-${i}`; }

function renderTabs() {
  tabsRoot.innerHTML = GAMES.map((g) => `
    <button class="pg-game-tab ${activeGame?.id === g.id ? 'active' : ''}" data-game="${g.id}" type="button">
      ${pgHasDone(gameKey(g.id) + '-done') ? '<span class="pg-game-check">✅</span>' : ''}
      <span class="pg-card-icon">${g.icon}</span>
      <strong>${g.title}</strong>
    </button>`).join('');
  tabsRoot.querySelectorAll('.pg-game-tab').forEach((btn) => {
    btn.addEventListener('click', () => startGame(btn.dataset.game));
  });
}

function startGame(id) {
  activeGame = GAMES.find((g) => g.id === id);
  roundIndex = 0;
  renderTabs();
  gaEvent('game_started', { game: id });
  renderRound();
}

function awardRoundXP(game, idx) {
  if (!pgHasDone(roundKey(game.id, idx))) {
    pgMarkDone(roundKey(game.id, idx));
    pgGrantXP(ROUND_XP);
  }
}

function finishGame(game) {
  if (!pgHasDone(gameKey(game.id) + '-done')) {
    pgMarkDone(gameKey(game.id) + '-done');
    pgGrantXP(GAME_COMPLETE_XP);
    gaEvent('game_completed', { game: game.id });
  }
  renderTabs();
  const allDone = GAMES.every((g) => pgHasDone(gameKey(g.id) + '-done'));
  if (allDone && !pgHasDone('game-room-done')) {
    pgMarkDone('game-room-done');
    pgGrantXP(0, { badgeId: 'game-girl' });
    pgCheckQueenBadge();
  }
  renderGameComplete(game, allDone);
}

function renderGameComplete(game, allDone) {
  if (allDone) {
    stageRoot.innerHTML = `
      <div class="pg-completion-card">
        <h3>🎀 Digital Girl Game Room Complete</h3>
        <p>You've finished every game in the room — that's real practice in money decisions, client judgment, pricing, and spotting scams.</p>
        <div class="pg-completion-stats">
          <div><strong>${GAMES.length}/${GAMES.length}</strong><span>GAMES DONE</span></div>
        </div>
        <div class="pg-template-actions" style="justify-content:center;">
          <a class="btn btn-primary" href="/pages/client-simulator.html">Try the Client Simulator →</a>
          <a class="btn btn-secondary" href="/pages/playground.html">Back to Playground</a>
        </div>
      </div>`;
  } else {
    stageRoot.innerHTML = `
      <div class="pg-completion-card">
        <h3>${game.icon} ${game.title} Complete</h3>
        <p>Nice work — pick another game below, or come back any time. Your progress is saved.</p>
      </div>`;
  }
  rewriteRootLinks(stageRoot);
  const keep = ['best-money-making-skills-2026', 'how-to-get-your-first-freelance-client', 'making-money-online-things-beginners-need-to-know']
    .map((id) => findItemById(id)).filter(Boolean)
    .map((item) => ({ href: articleHref(item.id), title: item.title, subtitle: item.readTime, icon: '📖' }));
  renderKeepExploring(document.getElementById('keep-exploring'), keep);
}

function nextRound(game) {
  roundIndex++;
  if (roundIndex >= game.data.length) finishGame(game);
  else renderRound();
}

function renderRound() {
  const game = activeGame;
  const round = game.data[roundIndex];
  const counterHtml = `<p class="pg-round-counter">${game.title} — Round ${roundIndex + 1} of ${game.data.length}</p>`;

  if (game.kind === 'choice') {
    const prompt = round.situation || round.message;
    stageRoot.innerHTML = `
      ${counterHtml}
      <div class="pathquiz-card">
        <p class="quiz-label">${game.icon} ${prompt}</p>
        <div class="pathquiz-options" id="round-options">
          ${round.options.map((o, i) => `<button class="pathquiz-option" data-index="${i}" type="button"><span class="pathquiz-icon">→</span>${o.label}</button>`).join('')}
        </div>
        <p class="scenario-feedback" id="round-feedback" hidden></p>
        <div class="pg-game-nav" id="round-nav" hidden><button class="btn btn-primary" id="next-round" type="button">Next →</button></div>
      </div>`;
    stageRoot.querySelectorAll('.pathquiz-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        stageRoot.querySelectorAll('.pathquiz-option').forEach((b) => { b.disabled = true; });
        btn.classList.add('selected');
        const feedback = document.getElementById('round-feedback');
        feedback.textContent = round.options[Number(btn.dataset.index)].feedback;
        feedback.hidden = false;
        document.getElementById('round-nav').hidden = false;
        awardRoundXP(game, roundIndex);
      });
    });
    document.getElementById('next-round')?.addEventListener('click', () => nextRound(game));
  }

  if (game.kind === 'binary') {
    stageRoot.innerHTML = `
      ${counterHtml}
      <div class="pathquiz-card">
        <p class="quiz-label">${game.icon} "${round.situation}"</p>
        <div class="pg-binary-options">
          <button class="pg-binary-btn" data-value="false" type="button">${game.labels[0]}</button>
          <button class="pg-binary-btn" data-value="true" type="button">${game.labels[1]}</button>
        </div>
        <p class="scenario-feedback" id="round-feedback" hidden></p>
        <div class="pg-game-nav" id="round-nav" hidden><button class="btn btn-primary" id="next-round" type="button">Next →</button></div>
      </div>`;
    stageRoot.querySelectorAll('.pg-binary-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        const chosen = btn.dataset.value === 'true';
        const correct = round[game.flagField];
        stageRoot.querySelectorAll('.pg-binary-btn').forEach((b) => { b.disabled = true; });
        btn.classList.add(chosen === correct ? 'correct' : 'incorrect');
        const feedback = document.getElementById('round-feedback');
        feedback.textContent = (chosen === correct ? '✅ Right — ' : '💭 Not quite — ') + round.explanation;
        feedback.hidden = false;
        document.getElementById('round-nav').hidden = false;
        awardRoundXP(game, roundIndex);
      });
    });
    document.getElementById('next-round')?.addEventListener('click', () => nextRound(game));
  }

  if (game.kind === 'skill') {
    stageRoot.innerHTML = `
      ${counterHtml}
      <div class="pathquiz-card">
        <p class="quiz-label">${game.icon} ${round.problem}</p>
        <div class="pathquiz-options" id="round-options">
          ${round.options.map((label, i) => `<button class="pathquiz-option" data-index="${i}" type="button"><span class="pathquiz-icon">→</span>${label}</button>`).join('')}
        </div>
        <p class="scenario-feedback" id="round-feedback" hidden></p>
        <div class="pg-game-nav" id="round-nav" hidden><button class="btn btn-primary" id="next-round" type="button">Next →</button></div>
      </div>`;
    stageRoot.querySelectorAll('.pathquiz-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        const idx = Number(btn.dataset.index);
        stageRoot.querySelectorAll('.pathquiz-option').forEach((b) => { b.disabled = true; });
        if (idx === round.correctIndex) btn.classList.add('selected');
        const feedback = document.getElementById('round-feedback');
        feedback.textContent = (idx === round.correctIndex ? '✅ Exactly — ' : '💭 Close — ') + round.explanation;
        feedback.hidden = false;
        document.getElementById('round-nav').hidden = false;
        awardRoundXP(game, roundIndex);
      });
    });
    document.getElementById('next-round')?.addEventListener('click', () => nextRound(game));
  }

  if (game.kind === 'price') {
    stageRoot.innerHTML = `
      ${counterHtml}
      <div class="pathquiz-card">
        <p class="quiz-label">${game.icon} ${round.project}</p>
        <p style="font-weight:700;margin-top:1rem;">Think about:</p>
        <ul class="pg-considerations">${round.considerations.map((c) => `<li>${c}</li>`).join('')}</ul>
        <p style="font-weight:700;margin-top:1rem;">Where would you price this?</p>
        <div class="pg-price-options" id="round-options">
          ${round.ranges.map((r, i) => `<button class="pg-price-btn" data-index="${i}" type="button">${r}</button>`).join('')}
        </div>
        <p class="scenario-feedback" id="round-feedback" hidden></p>
        <div class="pg-game-nav" id="round-nav" hidden><button class="btn btn-primary" id="next-round" type="button">Next →</button></div>
      </div>`;
    stageRoot.querySelectorAll('.pg-price-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('selected')) return;
        stageRoot.querySelectorAll('.pg-price-btn').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        const feedback = document.getElementById('round-feedback');
        feedback.textContent = "There's no single correct price here — this is an educational exercise. What matters is that your number honestly accounts for the considerations above, not just a guess.";
        feedback.hidden = false;
        document.getElementById('round-nav').hidden = false;
        awardRoundXP(activeGame, roundIndex);
      });
    });
    document.getElementById('next-round')?.addEventListener('click', () => nextRound(game));
  }
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
  renderTabs();
  stageRoot.innerHTML = '<p class="pg-empty-state">Pick a game above to get started. 🎮</p>';
}

document.addEventListener('DOMContentLoaded', init);
