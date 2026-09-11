/* =============================================
   JS/MY-ACADEMY.JS
   Drives pages/my-academy.html — the learner dashboard: My
   Learning, My Projects, My Certificates, all as anchor-navigated
   sections of one page (matching the homepage's own pattern).
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initGirlGangPopup } from './girlgang-popup.js';
import { maybeShowJoinReminder } from './notifications.js';
import { findCourse } from '../data/academy.js';
import { getEnrolledCourseIds, getProgress, computeCompletion, courseProgressPct, getCourseState, COURSE_STATE_LABELS, getNextLesson } from './academy-engine.js';
import { getCertificates, formatCompletionDate } from './academy-certificate.js';

function renderLearning() {
  const enrolled = getEnrolledCourseIds().map((id) => findCourse(id)).filter(Boolean);
  const root = document.getElementById('learning-grid');

  if (!enrolled.length) {
    root.innerHTML = `<p class="ac-empty-state">Your next skill starts here. <a href="academy.html">Browse the Academy →</a></p>`;
    rewriteRootLinks(root);
    return;
  }

  root.innerHTML = enrolled.map((course) => {
    const progress = getProgress(course.id);
    const pct = courseProgressPct(course, progress);
    const state = getCourseState(course, progress);
    const next = getNextLesson(course, progress);
    const moduleIdx = next ? course.modules.findIndex((m) => m.id === next.module.id) : -1;
    const href = next ? `course.html?id=${course.id}&lesson=${next.lesson.id}` : `course.html?id=${course.id}&claim=1`;
    return `
      <div class="ac-dash-course-card">
        <h3>${course.title}</h3>
        <div class="ac-course-progress-track"><div class="ac-course-progress-fill" style="width:${pct}%"></div></div>
        <div class="ac-dash-stat-row"><span>${pct}% complete</span><span>${COURSE_STATE_LABELS[state]}</span></div>
        ${moduleIdx >= 0 ? `<div class="ac-dash-stat-row"><span>Module ${moduleIdx + 1} of ${course.moduleCount}</span></div>` : ''}
        <a class="btn btn-primary" style="width:100%;margin-top:10px;" href="${href}">${state >= 6 ? 'Claim Certificate →' : 'Continue Learning →'}</a>
      </div>`;
  }).join('');
  rewriteRootLinks(root);
}

function renderProjects() {
  const root = document.getElementById('projects-list');
  const enrolled = getEnrolledCourseIds().map((id) => findCourse(id)).filter(Boolean);
  const allDone = [];
  enrolled.forEach((course) => {
    const progress = getProgress(course.id);
    (course.projects || []).forEach((p) => {
      const done = progress.projectsCompleted.find((d) => d.id === p.id);
      if (done) allDone.push({ course, project: p, done });
    });
  });

  if (!allDone.length) {
    root.innerHTML = `<p class="ac-empty-state">Your portfolio is waiting for its first proof of work.</p>`;
    return;
  }

  root.innerHTML = allDone.map(({ course, project, done }) => `
    <div class="ac-project-list-item">
      <p style="font-size:var(--body-xsmall);color:var(--color-accent-dark);font-weight:700;">${course.title}</p>
      <strong>${project.title}</strong>
      <p style="font-size:var(--body-xsmall);color:var(--color-text-secondary);">Completed ${new Date(done.completedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      ${done.notes ? `<p style="font-size:var(--body-small);margin-top:6px;">${done.notes}</p>` : ''}
    </div>`).join('');
}

function renderCertificates() {
  const root = document.getElementById('certificates-grid');
  const certs = getCertificates();
  if (!certs.length) {
    root.innerHTML = `<p class="ac-empty-state">Complete your first course to unlock your certificate.</p>`;
    return;
  }
  root.innerHTML = certs.map((c) => `
    <div class="ac-dash-cert-card">
      <span class="ac-cert-icon">🎀</span>
      <h3 style="font-family:var(--font-display);margin:6px 0;">${c.courseTitle}</h3>
      <p style="font-size:var(--body-xsmall);color:var(--color-text-secondary);">Completed: ${formatCompletionDate(c.completionDate)}</p>
      <p style="font-size:var(--body-xsmall);color:var(--color-text-secondary);">ID: ${c.certificateId}</p>
      <a class="btn btn-primary" style="width:100%;margin-top:10px;" href="certificate.html?id=${c.certificateId}">View Certificate →</a>
    </div>`).join('');
  rewriteRootLinks(root);
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

  renderLearning();
  renderProjects();
  renderCertificates();
}

document.addEventListener('DOMContentLoaded', init);
