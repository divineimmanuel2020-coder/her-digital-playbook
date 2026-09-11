/* =============================================
   JS/ACADEMY-ENGINE.JS
   Shared, reusable logic for The Playbook Academy: progress
   persistence, completion calculation, and XP integration. No
   course-specific code lives here — this is the "ONE engine"
   the brief asked for, used by every course via data/academy.js.

   Namespace: every key starts with 'hdp-academy-' so nothing here
   can collide with article, tool, or Playground localStorage keys.
   ============================================= */

import { awardXP, unlockBadge } from './gamify.js';

const NS = 'hdp-academy-';
const k = (...parts) => `${NS}${parts.join('-')}`;

/* Same toast pattern as js/playground.js — duplicated in full since
   article.js (which owns the original) is only ever loaded on
   pages/article.html and isn't meant to be a shared dependency. */
function showXPToast(amount) {
  if (!amount) return;
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
  awardXP(amount, { ...opts, onXP: () => showXPToast(amount), onNewBadge: (b) => showBadgeToast(b) });
}
function grantBadge(id) {
  unlockBadge(id, (b) => showBadgeToast(b));
}

function getJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    // Corrupted localStorage value — fail safe to the default
    // rather than throwing and breaking the whole page.
    return fallback;
  }
}
function setJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/* =============================================
   LEARNER NAME
   ============================================= */

export function getLearnerName() {
  return localStorage.getItem(k('learner-name')) || '';
}
export function setLearnerName(name) {
  localStorage.setItem(k('learner-name'), name.trim());
}

/* =============================================
   ENROLLMENT
   ============================================= */

export function getEnrolledCourseIds() {
  return getJSON(k('enrolled'), []);
}
export function enrollCourse(courseId) {
  const enrolled = getEnrolledCourseIds();
  const isFirstEver = enrolled.length === 0;
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
    setJSON(k('enrolled'), enrolled);
  }
  if (isFirstEver) grantBadge('academy-enrolled');
}

/* =============================================
   PER-COURSE PROGRESS
   Shape: { completedLessons: [ids], knowledgeChecks: {lessonId: pct},
            assessments: {moduleId: {score, passed, attempts}},
            projectsCompleted: [ids], capstone: {completed, score},
            currentLessonId }
   ============================================= */

function progressKey(courseId) { return k('progress', courseId); }

export function getProgress(courseId) {
  return getJSON(progressKey(courseId), {
    completedLessons: [],
    knowledgeChecks: {},
    assessments: {},
    projectsCompleted: [],
    capstone: { completed: false, score: 0 },
    currentLessonId: null,
  });
}

function saveProgress(courseId, progress) {
  setJSON(progressKey(courseId), progress);
}

export function markLessonComplete(courseId, lessonId, knowledgeCheckPct = null) {
  const progress = getProgress(courseId);
  const isFirstTime = !progress.completedLessons.includes(lessonId);
  if (isFirstTime) progress.completedLessons.push(lessonId);
  if (knowledgeCheckPct !== null) progress.knowledgeChecks[lessonId] = knowledgeCheckPct;
  progress.currentLessonId = lessonId;
  saveProgress(courseId, progress);
  if (isFirstTime) grantXP(5); // small, meaningful, capped by "first time only"
  return progress;
}

export function recordAssessment(courseId, moduleId, scorePct) {
  const progress = getProgress(courseId);
  const prior = progress.assessments[moduleId] || { attempts: 0 };
  const passed = scorePct >= 70;
  const alreadyPassed = prior.passed;
  progress.assessments[moduleId] = { score: scorePct, passed, attempts: (prior.attempts || 0) + 1 };
  saveProgress(courseId, progress);
  if (passed && !alreadyPassed) grantXP(10);
  return progress.assessments[moduleId];
}

export function markProjectComplete(courseId, projectId, notes = '') {
  const progress = getProgress(courseId);
  const isFirstTime = !progress.projectsCompleted.some((p) => p.id === projectId);
  if (isFirstTime) {
    progress.projectsCompleted.push({ id: projectId, notes, completedDate: new Date().toISOString() });
  } else {
    progress.projectsCompleted = progress.projectsCompleted.map((p) => (p.id === projectId ? { ...p, notes } : p));
  }
  saveProgress(courseId, progress);
  if (isFirstTime) grantXP(15);
  return progress;
}

export function recordCapstone(courseId, scorePct, reflectionAnswers = []) {
  const progress = getProgress(courseId);
  const alreadyPassed = progress.capstone.completed && progress.capstone.score >= 70;
  progress.capstone = { completed: true, score: scorePct, reflectionAnswers, completedDate: new Date().toISOString() };
  saveProgress(courseId, progress);
  if (scorePct >= 70 && !alreadyPassed) grantXP(30);
  return progress.capstone;
}

/* =============================================
   COMPLETION CALCULATION
   This is the core rule the brief is strict about: a course is
   NEVER complete just because every lesson page was visited.
   ============================================= */

// Lessons that require a plain "mark complete" click — assessments
// and the capstone are tracked through their own dedicated records
// (progress.assessments / progress.capstone), not completedLessons.
function requiredLessonsFor(course) {
  return course.modules.flatMap((m) => m.lessons.filter((l) => l.type !== 'assessment' && l.type !== 'capstone'));
}
function assessmentModules(course) {
  return course.modules.filter((m) => m.lessons.some((l) => l.type === 'assessment'));
}

export function computeOverallScore(course, progress) {
  const checkScores = Object.values(progress.knowledgeChecks);
  const avgCheck = checkScores.length ? checkScores.reduce((a, b) => a + b, 0) / checkScores.length : 0;

  const assessmentScores = assessmentModules(course).map((m) => progress.assessments[m.id]?.score || 0);
  const avgAssessment = assessmentScores.length ? assessmentScores.reduce((a, b) => a + b, 0) / assessmentScores.length : 0;

  const capstoneScore = progress.capstone.score || 0;

  // Weighted: knowledge checks 20%, module assessments 40%, capstone 40%.
  return Math.round(avgCheck * 0.2 + avgAssessment * 0.4 + capstoneScore * 0.4);
}

export function computeCompletion(course, progress) {
  const requiredLessons = requiredLessonsFor(course);
  const requiredLessonsCompleted = requiredLessons.every((l) => progress.completedLessons.includes(l.id));

  const modulesNeedingAssessment = assessmentModules(course);
  const moduleAssessmentsPassed = modulesNeedingAssessment.every((m) => progress.assessments[m.id]?.passed);

  const requiredProjects = course.projects || [];
  const projectsCompleted = requiredProjects.every((p) => progress.projectsCompleted.some((done) => done.id === p.id));

  const capstonePassed = !course.capstone || (progress.capstone.completed && progress.capstone.score >= 70);

  const overallScore = computeOverallScore(course, progress);
  const isComplete = requiredLessonsCompleted && moduleAssessmentsPassed && projectsCompleted && capstonePassed && overallScore >= 70;

  return { requiredLessonsCompleted, moduleAssessmentsPassed, projectsCompleted, capstonePassed, overallScore, isComplete };
}

// The 8 states from the brief (0-7), derived from real progress —
// never set manually, always computed fresh from what's actually stored.
export function getCourseState(course, progress) {
  const enrolled = getEnrolledCourseIds().includes(course.id);
  if (!enrolled && progress.completedLessons.length === 0) return 0; // NOT_STARTED
  const completion = computeCompletion(course, progress);
  if (completion.isComplete) {
    return hasCertificateForCourse(course.id) ? 7 : 6; // CERTIFIED : COMPLETED
  }
  if (progress.capstone.completed || (course.capstone && completion.requiredLessonsCompleted && completion.moduleAssessmentsPassed && completion.projectsCompleted)) return 5; // CAPSTONE
  if (completion.requiredLessonsCompleted && !completion.moduleAssessmentsPassed) return 4; // ASSESSMENT_READY
  if (progress.completedLessons.length > 0 && progress.projectsCompleted.length === 0) return 2; // LEARNING
  if (progress.projectsCompleted.length > 0) return 3; // PRACTICING
  return 1; // ENROLLED
}

export const COURSE_STATE_LABELS = ['Not Started', 'Enrolled', 'Learning', 'Practicing', 'Assessment Ready', 'Capstone', 'Completed', 'Certified'];

/* =============================================
   CURRENT LESSON / RESUME
   ============================================= */

export function getNextLesson(course, progress) {
  for (const m of course.modules) {
    for (const l of m.lessons) {
      const isDone = l.type === 'assessment' ? !!progress.assessments[m.id]?.passed
        : l.type === 'capstone' ? !!(progress.capstone.completed && progress.capstone.score >= 70)
        : progress.completedLessons.includes(l.id);
      if (!isDone) return { module: m, lesson: l };
    }
  }
  return null; // everything done — learner is ready for the certificate
}

export function courseProgressPct(course, progress) {
  const required = requiredLessonsFor(course);
  if (!required.length) return 0;
  const done = required.filter((l) => progress.completedLessons.includes(l.id)).length;
  return Math.round((done / required.length) * 100);
}

/* =============================================
   MY ACADEMY LISTS
   ============================================= */

export function getInProgressCourseIds() {
  return getEnrolledCourseIds();
}

/* =============================================
   CERTIFICATES (lightweight local check used by engine —
   full CRUD lives in academy-certificate.js to keep this file
   free of certificate-ID-generation concerns)
   ============================================= */

export function hasCertificateForCourse(courseId) {
  const certs = getJSON(k('certificates'), []);
  return certs.some((c) => c.courseId === courseId);
}

/* =============================================
   ACADEMY-WIDE BADGES
   Deliberately just 3 — not one per course — per the brief's own
   "do not create unnecessary badges" instruction.
   ============================================= */

export function checkAcademyBadges() {
  const certs = getJSON(k('certificates'), []);
  if (certs.length >= 1) grantBadge('academy-graduate');
  if (certs.length >= 3) grantBadge('academy-scholar');
}
