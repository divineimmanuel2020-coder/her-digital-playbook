/* =============================================
   JS/CLIENT-SIMULATOR.JS
   Drives /pages/client-simulator.html. Walks through all 7
   CLIENT_SIM_SCENARIOS in order; each option carries a 1-3 "tier"
   (risky / reasonable / strong) which is averaged at the end into
   an educational "Client Boss Level" — explicitly framed as
   practice, not a certification.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initGirlGangPopup } from './girlgang-popup.js';
import { maybeShowJoinReminder } from './notifications.js';
import { CLIENT_SIM_SCENARIOS } from '../data/playground.js';
import { findItemById } from '../data/store.js';
import { pgGrantXP, pgMarkDone, pgHasDone, pgCheckQueenBadge, renderKeepExploring, articleHref } from './playground.js';

const gaEvent = (name, params = {}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };

const stageRoot = document.getElementById('sim-stage');
const meterRoot = document.getElementById('sim-meter');

let index = 0;
const tiersEarned = [];

const LEVELS = [
  { max: 1.7, icon: '🌱', label: 'Beginner' },
  { max: 2.3, icon: '💻', label: 'Getting Serious' },
  { max: 2.8, icon: '💼', label: 'Freelancer Ready' },
  { max: Infinity, icon: '👑', label: 'Client Boss' },
];

function currentLevel() {
  if (!tiersEarned.length) return LEVELS[0];
  const avg = tiersEarned.reduce((a, b) => a + b, 0) / tiersEarned.length;
  return LEVELS.find((l) => avg <= l.max) || LEVELS[LEVELS.length - 1];
}

function renderMeter() {
  const avg = tiersEarned.length ? tiersEarned.reduce((a, b) => a + b, 0) / tiersEarned.length : 1;
  const pct = Math.max(0, Math.min(100, ((avg - 1) / 2) * 100));
  const level = currentLevel();
  meterRoot.innerHTML = `
    <div class="pg-level-track"><div class="pg-level-fill" style="width:${pct}%"></div></div>
    <span class="pg-level-badge">${level.icon} ${level.label}</span>`;
}

function renderScenario() {
  const s = CLIENT_SIM_SCENARIOS[index];
  stageRoot.innerHTML = `
    <p class="pg-round-counter">Scenario ${index + 1} of ${CLIENT_SIM_SCENARIOS.length} — ${s.title}</p>
    <div class="scenario-card">
      <p class="quiz-label">💬 Client Message</p>
      <p class="scenario-situation">"${s.message}"</p>
      <p style="font-weight:700;margin-bottom:0.75rem;">What do you do?</p>
      <div class="scenario-options" id="sim-options">
        ${s.options.map((o, i) => `<button class="scenario-option" data-index="${i}" type="button">${o.label}</button>`).join('')}
      </div>
      <p class="scenario-feedback" id="sim-feedback" hidden></p>
      <div class="pg-game-nav" id="sim-nav" hidden><button class="btn btn-primary" id="sim-next" type="button">Next Scenario →</button></div>
    </div>`;

  stageRoot.querySelectorAll('.scenario-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      const opt = s.options[Number(btn.dataset.index)];
      stageRoot.querySelectorAll('.scenario-option').forEach((b) => { b.disabled = true; });
      btn.classList.add('selected');
      const feedback = document.getElementById('sim-feedback');
      feedback.textContent = opt.feedback;
      feedback.hidden = false;
      document.getElementById('sim-nav').hidden = false;
      tiersEarned.push(opt.tier);
      renderMeter();
      if (!pgHasDone(`client-sim-round-${index}`)) {
        pgMarkDone(`client-sim-round-${index}`);
        pgGrantXP(10);
      }
    });
  });

  document.getElementById('sim-next')?.addEventListener('click', () => {
    index++;
    if (index < CLIENT_SIM_SCENARIOS.length) renderScenario();
    else finishSimulator();
  });
}

function finishSimulator() {
  const level = currentLevel();
  gaEvent('simulator_completed', { level: level.label });
  if (!pgHasDone('client-sim-done')) {
    pgMarkDone('client-sim-done');
    pgGrantXP(50, { badgeId: 'client-boss' });
    pgCheckQueenBadge();
  }
  stageRoot.innerHTML = `
    <div class="pg-completion-card">
      <h3>🎀 Client Boss Level: ${level.icon} ${level.label}</h3>
      <p>You worked through all ${CLIENT_SIM_SCENARIOS.length} scenarios — real practice for the situations every freelancer eventually faces.</p>
      <p class="pg-disclaimer">This simulator is educational practice, not a professional certification.</p>
      <div class="pg-template-actions" style="justify-content:center;">
        <button class="btn btn-secondary" id="sim-restart" type="button">Run It Again</button>
        <a class="btn btn-primary" href="/pages/game-room.html">Try the Game Room →</a>
      </div>
    </div>`;
  rewriteRootLinks(stageRoot);
  document.getElementById('sim-restart')?.addEventListener('click', () => {
    index = 0;
    tiersEarned.length = 0;
    renderMeter();
    renderScenario();
  });

  const keep = ['how-to-get-your-first-freelance-client', 'how-to-get-paid-as-a-freelancer', 'virtual-assistant-pretty-paid-booked']
    .map((id) => findItemById(id)).filter(Boolean)
    .map((item) => ({ href: articleHref(item.id), title: item.title, subtitle: item.readTime, icon: '📖' }));
  keep.push({ href: '/pages/templates.html', title: 'Free Girlie Templates', subtitle: 'Scope of Work & onboarding checklists', icon: '🎀' });
  renderKeepExploring(document.getElementById('keep-exploring'), keep);
  rewriteRootLinks(document.getElementById('keep-exploring'));
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
  gaEvent('simulator_started');
  renderMeter();
  renderScenario();
}

document.addEventListener('DOMContentLoaded', init);
