/* =============================================
   JS/ACADEMY.JS
   Drives pages/academy.html — the Academy homepage.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initGirlGangPopup } from './girlgang-popup.js';
import { maybeShowJoinReminder } from './notifications.js';
import { ACADEMY_COURSES, CAREER_GOALS, LEARNING_PATHS, START_ROUTES, findCourse } from '../data/academy.js';
import { getProgress, courseProgressPct } from './academy-engine.js';

const gaEvent = (name, params = {}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };

const CATEGORIES = ['All', ...new Set(ACADEMY_COURSES.map((c) => c.category))];
let state = { query: '', category: 'All' };

const courseGrid = document.getElementById('course-grid');
const filterRoot = document.getElementById('course-filters');
const searchInput = document.getElementById('course-search-input');

function courseCard(course, index) {
  const progress = getProgress(course.id);
  const pct = courseProgressPct(course, progress);
  return `
    <a class="ac-course-card" href="course.html?id=${course.id}">
      <span class="ac-course-number">${String(index + 1).padStart(2, '0')}</span>
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <span class="ac-course-difficulty">${course.difficulty}</span>
      <div class="ac-course-meta-row">
        <span class="ac-course-tag">${course.moduleCount} MODULES</span>
        <span class="ac-course-tag">${course.lessonCount} LESSONS</span>
        ${course.projectCount ? `<span class="ac-course-tag">${course.projectCount} PROJECTS</span>` : ''}
        <span class="ac-course-tag ac-course-cert-tag">FREE CERTIFICATE</span>
      </div>
      ${pct > 0 ? `<div class="ac-course-progress-track"><div class="ac-course-progress-fill" style="width:${pct}%"></div></div>` : ''}
      <span class="btn btn-primary ac-course-cta">${pct === 0 ? 'Start Course' : pct === 100 ? 'Review Course' : 'Continue →'}</span>
    </a>`;
}

function renderFilters() {
  filterRoot.innerHTML = CATEGORIES.map((c) => `<button class="ac-filter-pill ${c === state.category ? 'active' : ''}" data-cat="${c}" type="button">${c}</button>`).join('');
  filterRoot.querySelectorAll('.ac-filter-pill').forEach((btn) => {
    btn.addEventListener('click', () => { state.category = btn.dataset.cat; renderFilters(); renderGrid(); });
  });
}

function renderGrid() {
  const q = state.query.toLowerCase();
  const visible = ACADEMY_COURSES.filter((c) => {
    if (state.category !== 'All' && c.category !== state.category) return false;
    if (q) return c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.certificateSkills.some((s) => s.toLowerCase().includes(q));
    return true;
  });
  courseGrid.innerHTML = visible.length
    ? visible.map((c) => courseCard(c, ACADEMY_COURSES.indexOf(c))).join('')
    : `<p class="ac-empty-state">Hmm… we don't have a course for that yet.</p>`;
  rewriteRootLinks(courseGrid);
}

function renderCareerGoals() {
  const root = document.getElementById('career-goal-grid');
  root.innerHTML = CAREER_GOALS.map((g) => `
    <button class="ac-goal-card" data-goal="${g.id}" type="button">
      <span class="ac-goal-icon">${g.icon}</span>
      <strong>${g.label}</strong>
    </button>`).join('');
  root.querySelectorAll('.ac-goal-card').forEach((btn) => {
    btn.addEventListener('click', () => {
      const goal = CAREER_GOALS.find((g) => g.id === btn.dataset.goal);
      state.query = '';
      state.category = 'All';
      renderFilters();
      showRecommended(goal.label, goal.courseIds, 'goal-result');
    });
  });
}

function showRecommended(label, courseIds, targetId) {
  const target = document.getElementById(targetId);
  const courses = courseIds.map((id) => findCourse(id)).filter(Boolean);
  target.hidden = false;
  target.innerHTML = `
    <p class="ac-eyebrow">RECOMMENDED FOR "${label.toUpperCase()}"</p>
    <div class="ac-course-grid">${courses.map((c, i) => courseCard(c, i)).join('')}</div>`;
  rewriteRootLinks(target);
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function renderLearningPaths() {
  const root = document.getElementById('learning-path-grid');
  root.innerHTML = LEARNING_PATHS.map((p) => {
    const courses = p.courseIds.map((id) => findCourse(id)).filter(Boolean);
    return `
      <div class="ac-path-card">
        <h3>${p.icon} ${p.label}</h3>
        <div class="ac-path-chain">${courses.map((c, i) => `${i > 0 ? '<em>→</em>' : ''}<span>${c.title}</span>`).join('')}</div>
      </div>`;
  }).join('');
}

function renderStartRoutes() {
  const root = document.getElementById('start-route-grid');
  root.innerHTML = START_ROUTES.map((r) => `<button class="ac-goal-card" data-route="${r.id}" type="button"><strong>${r.label}</strong></button>`).join('');
  root.querySelectorAll('[data-route]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const route = START_ROUTES.find((r) => r.id === btn.dataset.route);
      showRecommended(route.label, route.courseIds, 'route-result');
    });
  });
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

  gaEvent('academy_view');
  renderFilters();
  renderGrid();
  renderCareerGoals();
  renderLearningPaths();
  renderStartRoutes();

  searchInput.addEventListener('input', () => {
    state.query = searchInput.value.trim();
    renderGrid();
  });
}

document.addEventListener('DOMContentLoaded', init);
