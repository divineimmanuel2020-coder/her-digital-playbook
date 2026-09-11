/* =============================================
   JS/COURSE.JS
   Drives pages/course.html?id=<courseId>[&lesson=<id> |
   &assessment=<moduleId> | &project=<id> | &capstone=1 | &claim=1]

   This is the "ONE Course engine, ONE Lesson engine, ONE
   Assessment engine, ONE Project engine, ONE Capstone engine" the
   brief asked for — every one of the 20 courses renders through
   these same functions, driven entirely by data/academy.js.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initGirlGangPopup } from './girlgang-popup.js';
import { maybeShowJoinReminder } from './notifications.js';
import { findCourse, findLesson } from '../data/academy.js';
import {
  getProgress, markLessonComplete, recordAssessment, markProjectComplete, recordCapstone,
  computeCompletion, getCourseState, COURSE_STATE_LABELS, courseProgressPct, getNextLesson,
  enrollCourse, getLearnerName, setLearnerName,
} from './academy-engine.js';
import { createCertificate } from './academy-certificate.js';

const gaEvent = (name, params = {}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };

const root = document.getElementById('course-root');
const params = new URLSearchParams(window.location.search);
const courseId = params.get('id');
const course = findCourse(courseId);

function setUrl(extra) {
  const p = new URLSearchParams({ id: courseId, ...extra });
  window.history.pushState({}, '', `course.html?${p.toString()}`);
}
function go(extra) {
  setUrl(extra);
  render();
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* =============================================
   OVERVIEW
   ============================================= */

function lessonStatusIcon(progress, lesson) {
  if (progress.completedLessons.includes(lesson.id)) return '✅';
  return '○';
}

function renderCurriculum(progress) {
  return `
    <div class="ac-curriculum">
      ${course.modules.map((m, i) => {
        const total = m.lessons.length;
        const done = m.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
        return `
        <div class="ac-module" data-module="${m.id}">
          <div class="ac-module-header" data-toggle="${m.id}">
            <div>
              <div class="ac-module-title">Module ${i + 1} · ${escapeHtml(m.title)}</div>
              <div class="ac-module-objective">${escapeHtml(m.objective)}</div>
            </div>
            <span class="ac-module-progress">${done}/${total}</span>
          </div>
          <ul class="ac-lesson-list">
            ${m.lessons.map((l) => {
              if (l.type === 'assessment') {
                const a = progress.assessments[m.id];
                const statusIcon = a?.passed ? '✅' : '○';
                return `<li><a class="ac-lesson-row" href="course.html?id=${courseId}&assessment=${m.id}"><span class="ac-lesson-status">${statusIcon}</span>${escapeHtml(l.title)}<span class="ac-lesson-type-tag">${a?.passed ? `Passed ${a.score}%` : 'Assessment'}</span></a></li>`;
              }
              if (l.type === 'capstone') {
                return `<li><a class="ac-lesson-row" href="course.html?id=${courseId}&capstone=1"><span class="ac-lesson-status">${progress.capstone.completed ? '✅' : '○'}</span>${escapeHtml(l.title)}<span class="ac-lesson-type-tag">Capstone</span></a></li>`;
              }
              return `<li><a class="ac-lesson-row ${progress.currentLessonId === l.id ? 'current' : ''}" href="course.html?id=${courseId}&lesson=${l.id}"><span class="ac-lesson-status">${lessonStatusIcon(progress, l)}</span>${escapeHtml(l.title)}<span class="ac-lesson-type-tag">${l.type}${l.content ? '' : ' · coming soon'}</span></a></li>`;
            }).join('')}
          </ul>
        </div>`;
      }).join('')}
    </div>`;
}

function renderOverview() {
  const progress = getProgress(course.id);
  const state = getCourseState(course, progress);
  const pct = courseProgressPct(course, progress);
  const next = getNextLesson(course, progress);
  const ctaHref = next ? `course.html?id=${courseId}&lesson=${next.lesson.id}` : (course.capstone ? `course.html?id=${courseId}&capstone=1` : '#');
  const ctaLabel = pct === 0 ? 'Start Course' : pct === 100 ? 'Review Course' : 'Continue Learning';

  root.innerHTML = `
    <section class="ac-section">
      <div class="container">
        <a class="back-link" href="academy.html">← Back to Academy</a>
        <div class="ac-overview-header">
          <span class="ac-eyebrow">${course.category} · ${course.difficulty}</span>
          <h1>${escapeHtml(course.title)}</h1>
          <p>${escapeHtml(course.description)}</p>
          <div class="ac-overview-meta-grid">
            <div class="ac-overview-meta-item"><strong>${course.moduleCount}</strong><span>MODULES</span></div>
            <div class="ac-overview-meta-item"><strong>${course.lessonCount}</strong><span>LESSONS</span></div>
            <div class="ac-overview-meta-item"><strong>${course.projectCount}</strong><span>PROJECTS</span></div>
            <div class="ac-overview-meta-item"><strong>${course.duration.total}</strong><span>EST. TIME</span></div>
            <div class="ac-overview-meta-item"><strong>🎓</strong><span>FREE CERTIFICATE</span></div>
          </div>
          ${pct > 0 ? `<div class="ac-course-progress-track" style="max-width:400px;margin:0 auto;"><div class="ac-course-progress-fill" style="width:${pct}%"></div></div><p style="font-size:var(--body-xsmall);color:var(--color-text-secondary);margin-top:6px;">${pct}% complete · ${COURSE_STATE_LABELS[state]}</p>` : ''}
          <div style="margin-top:var(--spacing-lg);"><a class="btn btn-primary" id="course-cta" href="${ctaHref}">${ctaLabel} →</a></div>
        </div>

        <div class="ac-overview-grid">
          <div class="ac-overview-card"><h3>What You'll Learn</h3><ul>${course.learningOutcomes.map((o) => `<li>${escapeHtml(o)}</li>`).join('')}</ul></div>
          <div class="ac-overview-card"><h3>Tools You May Use</h3><ul>${course.tools.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul></div>
          <div class="ac-overview-card"><h3>Certificate Requirements</h3><ul><li>Complete required lessons</li><li>Pass module assessments (70%+)</li><li>Complete course projects</li><li>Pass the final capstone (70%+)</li></ul></div>
        </div>

        <p style="font-size:var(--body-small);color:var(--color-text-secondary);margin-bottom:var(--spacing-md);"><strong>Prerequisites:</strong> ${escapeHtml(course.prerequisites)}</p>

        <h2 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:var(--spacing-md);">Curriculum</h2>
        ${renderCurriculum(progress)}

        ${course.projects?.length ? `
          <h2 style="font-family:var(--font-display);font-size:1.5rem;margin:var(--spacing-xl) 0 var(--spacing-md);">Projects</h2>
          <div class="ac-curriculum">
            ${course.projects.map((p) => `<a class="ac-lesson-row" style="border-radius:var(--radius-lg);border:1.5px solid var(--color-border-light);" href="course.html?id=${courseId}&project=${p.id}"><span class="ac-lesson-status">${progress.projectsCompleted.some((d) => d.id === p.id) ? '✅' : '○'}</span>${escapeHtml(p.title)}</a>`).join('')}
          </div>` : ''}

        ${!course.hasFullContent ? `<p class="pg-disclaimer" style="margin-top:var(--spacing-xl);text-align:center;">This course's curriculum structure is complete — some individual lesson pages are still being written and will show a "coming soon" note until they're ready.</p>` : ''}
      </div>
    </section>`;

  root.querySelectorAll('[data-toggle]').forEach((header) => {
    header.addEventListener('click', () => header.closest('.ac-module').classList.toggle('open'));
  });
  document.getElementById('course-cta')?.addEventListener('click', () => {
    enrollCourse(course.id);
    gaEvent('course_start', { course_id: course.id });
  });
  rewriteRootLinks(root);
}

/* =============================================
   LESSON VIEWER
   ============================================= */

function renderLessonSidebar(progress, currentLessonId) {
  return `<div class="ac-lesson-sidebar">${renderCurriculum(progress).replace(new RegExp(`href="course.html\\?id=${courseId}&lesson=${currentLessonId}"`), `href="course.html?id=${courseId}&lesson=${currentLessonId}" style="pointer-events:none;"`)}</div>`;
}

function renderKnowledgeCheck(lesson, onDone) {
  const questions = lesson.content.knowledgeCheck;
  const answers = new Array(questions.length).fill(null);

  function renderQuestions() {
    return `
      <div class="ac-knowledge-check" id="kc-questions">
        ${questions.map((q, qi) => `
          <div class="ac-kc-question" data-qi="${qi}">
            <p>${qi + 1}. ${escapeHtml(q.q)}</p>
            <div class="ac-kc-options">
              ${q.options.map((opt, oi) => `<button class="ac-kc-option" data-qi="${qi}" data-oi="${oi}" type="button">${escapeHtml(opt)}</button>`).join('')}
            </div>
          </div>`).join('')}
        <button class="btn btn-primary" id="kc-submit" type="button" disabled>Check My Answers</button>
      </div>`;
  }

  const container = document.getElementById('kc-container');
  container.innerHTML = renderQuestions();

  const updateSubmitState = () => {
    document.getElementById('kc-submit').disabled = answers.includes(null);
  };

  container.querySelectorAll('.ac-kc-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const qi = Number(btn.dataset.qi);
      answers[qi] = Number(btn.dataset.oi);
      container.querySelectorAll(`.ac-kc-option[data-qi="${qi}"]`).forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      updateSubmitState();
    });
  });

  document.getElementById('kc-submit').addEventListener('click', () => {
    let correct = 0;
    questions.forEach((q, qi) => {
      const isRight = answers[qi] === q.correct;
      if (isRight) correct++;
      container.querySelectorAll(`.ac-kc-option[data-qi="${qi}"]`).forEach((b) => {
        const oi = Number(b.dataset.oi);
        b.disabled = true;
        if (oi === q.correct) b.classList.add('correct');
        else if (oi === answers[qi]) b.classList.add('incorrect');
      });
    });
    const pct = Math.round((correct / questions.length) * 100);
    document.getElementById('kc-submit').replaceWith(Object.assign(document.createElement('p'), {
      className: 'ac-kc-result', innerHTML: `You got <strong>${correct}/${questions.length}</strong> right (${pct}%).`,
    }));
    onDone(pct);
  });
}

function renderLesson(lessonId) {
  const found = findLesson(course, lessonId);
  if (!found) { renderOverview(); return; }
  const { module, lesson } = found;
  // Assessment/capstone entries live in the same lesson list for
  // curriculum-sidebar purposes, but they render through their own
  // dedicated views, not the standard lesson anatomy.
  if (lesson.type === 'assessment') { go({ assessment: module.id }); return; }
  if (lesson.type === 'capstone') { go({ capstone: 1 }); return; }
  const progress = getProgress(course.id);
  const c = lesson.content;

  const flatLessons = course.modules.flatMap((m) => m.lessons);
  const idx = flatLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = idx > 0 ? flatLessons[idx - 1] : null;
  const nextLesson = idx < flatLessons.length - 1 ? flatLessons[idx + 1] : null;

  root.innerHTML = `
    <section class="ac-section">
      <div class="container">
        <div class="ac-lesson-page">
          ${renderLessonSidebar(progress, lessonId)}
          <div class="ac-lesson-main">
            <div class="ac-lesson-header">
              <p class="ac-lesson-crumb">${escapeHtml(course.title)} · ${escapeHtml(module.title)}</p>
              <h1>${escapeHtml(lesson.title)}</h1>
              <div class="ac-lesson-meta"><span>${lesson.duration || 10} min</span><span>${lesson.type.toUpperCase()}</span></div>
            </div>

            ${!c ? `
              <div class="ac-lesson-pending">
                <h2>This lesson's full content is still being written 🎀</h2>
                <p>Here's what it will cover: <strong>${escapeHtml(module.objective)}</strong></p>
                <p class="pg-disclaimer">You can mark it as reviewed to keep moving through the curriculum, and come back once the full lesson is published.</p>
                <button class="btn btn-primary" id="mark-pending-done" type="button" style="margin-top:1rem;">Mark as Reviewed →</button>
              </div>
            ` : `
              <div class="ac-lesson-block"><h2>What You're Learning</h2><p>${escapeHtml(c.concept)}</p></div>
              <div class="ac-lesson-block"><h2>Why This Matters</h2><p>${escapeHtml(c.whyItMatters)}</p></div>
              ${c.howTo ? `<div class="ac-lesson-block"><h2>How To Do It</h2><ol>${c.howTo.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ol></div>` : ''}
              <div class="ac-lesson-block"><h2>Real Example</h2><div class="ac-example-box"><p>${escapeHtml(c.example)}</p></div></div>
              <div class="ac-lesson-block"><h2>Your Turn</h2><div class="ac-practice-box"><p>${escapeHtml(c.practice)}</p></div></div>
              <div class="ac-lesson-block"><h2>What Good Looks Like</h2><div class="ac-success-box"><p>${escapeHtml(c.successCriteria)}</p></div></div>
              <div class="ac-lesson-block"><h2>Common Mistakes</h2><div class="ac-mistakes-box"><p>${escapeHtml(c.commonMistakes)}</p></div></div>
              <div class="ac-lesson-block"><h2>Knowledge Check</h2><div id="kc-container"></div></div>
            `}

            <div class="ac-lesson-nav">
              ${prevLesson ? `<a class="btn btn-secondary" href="course.html?id=${courseId}&lesson=${prevLesson.id}">← Previous</a>` : `<a class="btn btn-secondary" href="course.html?id=${courseId}">← Overview</a>`}
              ${!c ? '' : `<button class="btn btn-primary" id="complete-lesson-btn" type="button" disabled>Complete the Knowledge Check to Continue</button>`}
              ${nextLesson ? `<a class="btn btn-secondary" id="next-link" href="course.html?id=${courseId}&lesson=${nextLesson.id}" hidden>Next →</a>` : ''}
            </div>
          </div>
        </div>
      </div>
    </section>`;

  rewriteRootLinks(root);

  root.querySelectorAll('[data-toggle]').forEach((header) => {
    header.addEventListener('click', () => header.closest('.ac-module').classList.toggle('open'));
  });
  root.querySelector(`.ac-module[data-module="${module.id}"]`)?.classList.add('open');

  document.getElementById('mark-pending-done')?.addEventListener('click', () => {
    markLessonComplete(course.id, lesson.id);
    go({ lesson: nextLesson ? nextLesson.id : lessonId });
  });

  if (c) {
    let kcScore = null;
    renderKnowledgeCheck(lesson, (pct) => {
      kcScore = pct;
      const completeBtn = document.getElementById('complete-lesson-btn');
      completeBtn.disabled = false;
      completeBtn.textContent = 'Complete Lesson →';
    });
    document.getElementById('complete-lesson-btn').addEventListener('click', () => {
      markLessonComplete(course.id, lesson.id, kcScore);
      gaEvent('lesson_complete', { course_id: course.id, lesson_id: lesson.id });
      if (nextLesson) go({ lesson: nextLesson.id });
      else go({});
    });
  }
}

/* =============================================
   MODULE ASSESSMENT
   ============================================= */

function renderAssessment(moduleId) {
  const mod = course.modules.find((m) => m.id === moduleId);
  const assessmentLesson = mod?.lessons.find((l) => l.type === 'assessment');
  if (!mod || !assessmentLesson?.assessment) {
    root.innerHTML = `
      <section class="ac-section">
        <div class="container" style="max-width:600px;">
          <a class="back-link" href="course.html?id=${courseId}">← Back to Course</a>
          <div class="ac-lesson-pending">
            <h2>This module's assessment is still being written 🎀</h2>
            <p>${mod ? `The assessment for "${escapeHtml(mod.title)}" isn't published yet.` : 'That module could not be found.'}</p>
          </div>
        </div>
      </section>`;
    rewriteRootLinks(root);
    return;
  }
  const { questions, passScore } = assessmentLesson.assessment;
  const answers = new Array(questions.length).fill(null);

  root.innerHTML = `
    <section class="ac-section">
      <div class="container" style="max-width:720px;">
        <a class="back-link" href="course.html?id=${courseId}">← Back to Course</a>
        <div class="ac-assessment-intro">
          <h1 style="font-family:var(--font-display);">Module Assessment: ${escapeHtml(mod.title)}</h1>
          <p>${questions.length} questions · ${passScore}% required to pass · Unlimited retries</p>
        </div>
        <div id="assessment-body">
          ${questions.map((q, qi) => `
            <div class="ac-kc-question" data-qi="${qi}">
              <p>${qi + 1}. ${escapeHtml(q.q)}</p>
              <div class="ac-kc-options">
                ${q.options.map((opt, oi) => `<button class="ac-kc-option" data-qi="${qi}" data-oi="${oi}" type="button">${escapeHtml(opt)}</button>`).join('')}
              </div>
            </div>`).join('')}
          <button class="btn btn-primary" id="assessment-submit" type="button" disabled style="width:100%;margin-top:1rem;">Submit Assessment</button>
        </div>
        <div id="assessment-result" hidden></div>
      </div>
    </section>`;

  const updateSubmit = () => { document.getElementById('assessment-submit').disabled = answers.includes(null); };
  document.querySelectorAll('.ac-kc-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const qi = Number(btn.dataset.qi);
      answers[qi] = Number(btn.dataset.oi);
      document.querySelectorAll(`.ac-kc-option[data-qi="${qi}"]`).forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      updateSubmit();
    });
  });

  document.getElementById('assessment-submit').addEventListener('click', () => {
    let correct = 0;
    questions.forEach((q, qi) => {
      if (answers[qi] === q.correct) correct++;
      document.querySelectorAll(`.ac-kc-option[data-qi="${qi}"]`).forEach((b) => {
        b.disabled = true;
        const oi = Number(b.dataset.oi);
        if (oi === q.correct) b.classList.add('correct');
        else if (oi === answers[qi]) b.classList.add('incorrect');
      });
    });
    const pct = Math.round((correct / questions.length) * 100);
    const passed = pct >= passScore;
    recordAssessment(course.id, mod.id, pct);
    gaEvent(passed ? 'assessment_pass' : 'assessment_fail', { course_id: course.id, module_id: mod.id, score: pct });
    document.getElementById('assessment-submit').hidden = true;
    const resultBox = document.getElementById('assessment-result');
    resultBox.hidden = false;
    resultBox.innerHTML = `
      <div class="ac-assessment-result ${passed ? 'passed' : 'failed'}">
        <p class="ac-assessment-score">${pct}%</p>
        <p>${passed ? '✅ Passed!' : `Not quite — you need ${passScore}% to pass. Review the module and try again any time.`}</p>
        <div class="ac-template-actions" style="justify-content:center;display:flex;gap:1rem;margin-top:1rem;">
          ${!passed ? `<a class="btn btn-secondary" href="course.html?id=${courseId}&assessment=${mod.id}">Try Again</a>` : ''}
          <a class="btn btn-primary" href="course.html?id=${courseId}">Back to Course</a>
        </div>
      </div>`;
    rewriteRootLinks(resultBox);
  });

  rewriteRootLinks(root);
}

/* =============================================
   PROJECT
   ============================================= */

function renderProject(projectId) {
  const project = course.projects?.find((p) => p.id === projectId);
  if (!project) { renderOverview(); return; }
  const progress = getProgress(course.id);
  const existing = progress.projectsCompleted.find((p) => p.id === projectId);

  root.innerHTML = `
    <section class="ac-section">
      <div class="container" style="max-width:760px;">
        <a class="back-link" href="course.html?id=${courseId}">← Back to Course</a>
        <div class="ac-project-card">
          <h3>${escapeHtml(project.title)}</h3>
          <div class="ac-project-field"><strong>Brief</strong><p>${escapeHtml(project.brief)}</p></div>
          <div class="ac-project-field"><strong>Scenario</strong><p>${escapeHtml(project.scenario)}</p></div>
          <div class="ac-project-field"><strong>Requirements</strong><ul>${project.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul></div>
          <div class="ac-project-field"><strong>Constraints</strong><ul>${project.constraints.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul></div>
          <div class="ac-project-field"><strong>Deliverable</strong><p>${escapeHtml(project.deliverable)}</p></div>
          <div class="ac-project-field"><strong>Tools</strong><p>${project.tools.join(', ')}</p></div>
          <div class="ac-project-field"><strong>Success Criteria</strong><ul>${project.successCriteria.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul></div>
          <div class="ac-project-field">
            <strong>Notes / Reflection (optional, saved to your Playbook Portfolio)</strong>
            <textarea class="ac-notes-textarea" id="project-notes" placeholder="Link to your work, or notes on what you built and learned...">${existing ? escapeHtml(existing.notes) : ''}</textarea>
          </div>
          <button class="btn btn-primary" id="complete-project-btn" type="button">${existing ? 'Update Notes' : 'Mark Project Complete'}</button>
          ${existing ? '<p style="color:var(--color-success);margin-top:0.5rem;">✅ Completed</p>' : ''}
        </div>
      </div>
    </section>`;

  document.getElementById('complete-project-btn').addEventListener('click', () => {
    const notes = document.getElementById('project-notes').value;
    markProjectComplete(course.id, project.id, notes);
    gaEvent('project_complete', { course_id: course.id, project_id: project.id });
    go({});
  });
  rewriteRootLinks(root);
}

/* =============================================
   CAPSTONE
   Honest self-assessment against the visible rubric — no fake
   auto-grading of open-ended creative work.
   ============================================= */

function renderCapstone() {
  const capstone = course.capstone;
  if (!capstone) {
    root.innerHTML = `
      <section class="ac-section">
        <div class="container" style="max-width:600px;">
          <a class="back-link" href="course.html?id=${courseId}">← Back to Course</a>
          <div class="ac-lesson-pending">
            <h2>This course's capstone is still being written 🎀</h2>
            <p>The full capstone brief and rubric for ${escapeHtml(course.title)} aren't published yet.</p>
          </div>
        </div>
      </section>`;
    rewriteRootLinks(root);
    return;
  }
  const progress = getProgress(course.id);
  const rubricEntries = Object.entries(capstone.rubric);

  root.innerHTML = `
    <section class="ac-section">
      <div class="container" style="max-width:760px;">
        <a class="back-link" href="course.html?id=${courseId}">← Back to Course</a>
        <div class="ac-capstone-card">
          <h2>🎓 ${escapeHtml(capstone.title)}</h2>
          <div class="ac-project-field"><strong>Scenario</strong><p>${escapeHtml(capstone.scenario)}</p></div>
          <div class="ac-project-field"><strong>Objective</strong><p>${escapeHtml(capstone.objective)}</p></div>
          <div class="ac-project-field"><strong>Requirements</strong><ul>${capstone.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul></div>
          <div class="ac-project-field"><strong>Constraints</strong><ul>${capstone.constraints.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul></div>
          <div class="ac-project-field"><strong>Deliverables</strong><ul>${capstone.deliverables.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul></div>

          <div class="ac-project-field">
            <strong>Self-Assessment Rubric</strong>
            <p style="font-size:var(--body-xsmall);color:var(--color-text-secondary);margin-bottom:8px;">Honestly check off each area you genuinely met. This is self-graded — there's no one watching but you, and your certificate is only meaningful if this reflects real work.</p>
            <table class="ac-rubric-table">
              ${rubricEntries.map(([key, weight]) => `
                <tr>
                  <td><label><input type="checkbox" data-rubric="${key}"> ${key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}</label></td>
                  <td>${weight}%</td>
                </tr>`).join('')}
            </table>
          </div>

          <div class="ac-project-field">
            <strong>Reflection</strong>
            ${capstone.reflectionQuestions.map((q, i) => `<p style="margin-top:8px;">${escapeHtml(q)}</p><textarea class="ac-notes-textarea" data-reflection="${i}" style="min-height:70px;"></textarea>`).join('')}
          </div>

          <button class="btn btn-primary" id="submit-capstone-btn" type="button" ${progress.capstone.completed ? 'disabled' : ''}>${progress.capstone.completed ? `Submitted — Score ${progress.capstone.score}%` : 'Submit Capstone'}</button>
        </div>
      </div>
    </section>`;

  document.getElementById('submit-capstone-btn')?.addEventListener('click', () => {
    const checked = [...document.querySelectorAll('[data-rubric]')].filter((c) => c.checked).map((c) => c.dataset.rubric);
    const score = Math.round(checked.reduce((sum, key) => sum + (capstone.rubric[key] || 0), 0));
    const reflections = [...document.querySelectorAll('[data-reflection]')].map((t) => t.value);
    recordCapstone(course.id, score, reflections);
    gaEvent(score >= 70 ? 'capstone_complete' : 'capstone_start', { course_id: course.id, score });
    go({});
  });
  rewriteRootLinks(root);
}

/* =============================================
   CERTIFICATE CLAIM FLOW
   ============================================= */

function renderClaim() {
  const progress = getProgress(course.id);
  const completion = computeCompletion(course, progress);

  if (!completion.isComplete) {
    root.innerHTML = `
      <section class="ac-section">
        <div class="container" style="max-width:600px;">
          <div class="ac-cert-locked">
            <h2 style="font-family:var(--font-display);">Your Certificate Isn't Unlocked Yet 🎀</h2>
            <p>Complete the remaining course requirements to unlock it.</p>
            <ul style="text-align:left;display:inline-block;margin-top:1rem;">
              <li>${completion.requiredLessonsCompleted ? '✅' : '○'} All required lessons</li>
              <li>${completion.moduleAssessmentsPassed ? '✅' : '○'} All module assessments passed (70%+)</li>
              <li>${completion.projectsCompleted ? '✅' : '○'} All projects completed</li>
              <li>${completion.capstonePassed ? '✅' : '○'} Capstone passed (70%+)</li>
              <li>${completion.overallScore >= 70 ? '✅' : '○'} Overall score 70%+ (currently ${completion.overallScore}%)</li>
            </ul>
            <div style="margin-top:1.5rem;"><a class="btn btn-primary" href="course.html?id=${courseId}">Continue Learning</a></div>
          </div>
        </div>
      </section>`;
    rewriteRootLinks(root);
    return;
  }

  root.innerHTML = `
    <section class="ac-section">
      <div class="container">
        <div class="ac-celebration">
          <h1>You Did It. 🎀</h1>
          <p>You completed <strong>${escapeHtml(course.title)}</strong> with a course score of <strong>${completion.overallScore}%</strong>.</p>
        </div>
        <div class="ac-name-form" style="margin-top:2rem;">
          <h2 style="font-family:var(--font-display);">Your Certificate Is Ready 🎀</h2>
          <p>What name should appear on your certificate?</p>
          <input type="text" class="ac-name-input" id="cert-name-input" value="${escapeHtml(getLearnerName())}" placeholder="Your full name">
          <button class="btn btn-primary" id="preview-cert-btn" type="button">Preview My Certificate</button>
        </div>
      </div>
    </section>`;

  document.getElementById('preview-cert-btn').addEventListener('click', () => {
    const name = document.getElementById('cert-name-input').value.trim();
    if (!name) { document.getElementById('cert-name-input').focus(); return; }
    setLearnerName(name);
    const cert = createCertificate({ learnerName: name, course, score: completion.overallScore });
    gaEvent('certificate_generated', { course_id: course.id, certificate_id: cert.certificateId });
    window.location.href = `certificate.html?id=${cert.certificateId}`;
  });
}

/* =============================================
   ROUTER
   ============================================= */

function render() {
  const p = new URLSearchParams(window.location.search);
  if (p.get('lesson')) return renderLesson(p.get('lesson'));
  if (p.get('assessment')) return renderAssessment(p.get('assessment'));
  if (p.get('project')) return renderProject(p.get('project'));
  if (p.get('capstone')) return renderCapstone();
  if (p.get('claim')) return renderClaim();
  return renderOverview();
}

async function init() {
  if (!course) {
    root.innerHTML = `<section class="ac-section"><div class="container"><div class="ac-empty-state">Course not found. <a href="academy.html">Back to the Academy →</a></div></div></section>`;
    return;
  }
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

  document.title = `${course.title} | The Playbook Academy`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', course.description);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', `https://herdigitalplaybook.com/pages/course.html?id=${course.id}`);

  gaEvent('course_view', { course_id: course.id });
  window.addEventListener('popstate', render);
  render();
}

document.addEventListener('DOMContentLoaded', init);
