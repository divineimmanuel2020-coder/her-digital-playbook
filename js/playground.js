/* =============================================
   JS/PLAYGROUND.JS
   Shared helpers for every Digital Playground page (Money Path,
   Game Room, Client Simulator, Templates, Glossary, Start Here,
   the Hub). Nothing here is a second gamification system — it
   calls straight into the real js/gamify.js engine (same XP
   counter, same badge list, same localStorage keys an article
   page would use) so a badge earned in the Playground shows up
   everywhere else too, and vice versa.

   All Playground-specific state uses the 'hdp-playground-' key
   prefix so it never collides with article/tool keys.
   ============================================= */

import { awardXP, unlockBadge } from './gamify.js';

export const PG_PREFIX = 'hdp-playground-';

export function pgKey(...parts) {
  return `${PG_PREFIX}${parts.join('-')}`;
}

export function pgGet(key, fallback = null) {
  const raw = localStorage.getItem(pgKey(key));
  if (raw === null) return fallback;
  try { return JSON.parse(raw); } catch { return raw; }
}

export function pgSet(key, value) {
  localStorage.setItem(pgKey(key), typeof value === 'string' ? value : JSON.stringify(value));
}

export function pgHasDone(flagKey) {
  return localStorage.getItem(pgKey(flagKey)) === '1';
}

export function pgMarkDone(flagKey) {
  localStorage.setItem(pgKey(flagKey), '1');
}

/* =============================================
   XP / BADGE FEEDBACK
   Same visual language as article.js's toasts (same .xp-toast /
   .badge-toast classes already in style.css), duplicated in full
   here rather than imported, since article.js is only ever loaded
   on pages/article.html and isn't meant to be a shared dependency.
   ============================================= */

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

// The one function every Playground page uses to award XP. Mirrors
// article.js's grantXP exactly, so the underlying engine call is
// identical — just re-declared here to avoid importing a page-heavy
// module into these lighter pages.
export function pgGrantXP(amount, opts = {}) {
  awardXP(amount, {
    ...opts,
    onXP: () => showXPToast(amount),
    onNewBadge: (badge) => showBadgeToast(badge),
  });
}

export function pgUnlockBadge(badgeId) {
  unlockBadge(badgeId, (badge) => showBadgeToast(badge));
}

// Checks whether enough distinct Playground experiences have been
// completed to award the umbrella "Playground Queen" badge. Called
// at the end of each experience — cheap, idempotent (unlockBadge
// already no-ops if already earned).
export function pgCheckQueenBadge() {
  const milestones = ['money-path-done', 'game-room-done', 'client-sim-done', 'templates-used', 'glossary-explored'];
  const completed = milestones.filter((m) => pgHasDone(m)).length;
  if (completed >= 3) pgUnlockBadge('playground-queen');
}

/* =============================================
   "KEEP EXPLORING" RESOURCE CARDS
   Reuses the same .tool-rec-card markup/styling article.js already
   uses for "More Money Moves", so related-resource cards look
   identical whether they appear on an article page or a Playground
   page. Accepts a mix of real articles (id) and direct URLs (url).
   ============================================= */

export function renderKeepExploring(container, items) {
  if (!container || !items?.length) return;
  container.innerHTML = `
    <p class="tool-list-title">🎀 Keep Exploring</p>
    <div class="tool-recs-grid">
      ${items.map((i) => `
        <a class="tool-rec-card playground-rec-card" href="${i.href}">
          <span class="playground-rec-icon">${i.icon || '🎀'}</span>
          <span><strong>${i.title}</strong><em>${i.subtitle || ''}</em></span>
        </a>`).join('')}
    </div>`;
}

// Small helper so pages can build a "Keep Exploring" href list from
// a mix of article ids and other Playground page ids without every
// page re-writing the same lookup logic.
// Every Playground page importing this lives in /pages/ itself,
// alongside article.html — so this is a same-folder reference, not
// a step up and back down.
export function articleHref(id) {
  return `article.html?id=${id}`;
}
