/* =============================================
   GAMIFY.JS
   The real, working gamification layer behind every article:
   XP, levels, badges, a daily streak, and the Dream Board.
   Everything here persists in the browser via localStorage —
   there's no account system, so progress is per-device, but
   it's genuinely tracked and genuinely rewarding, not decorative.
   ============================================= */

const XP_KEY = 'hdp-total-xp';
const BADGES_KEY = 'hdp-badges';
const VISITS_KEY = 'hdp-visit-dates';
const DREAMBOARD_KEY = 'hdp-dreamboard';

const XP_PER_LEVEL = 250;

export const BADGES = [
  { id: 'first-chapter', icon: '💗', label: 'First Money Move', desc: 'Completed your first chapter — the journey starts now' },
  { id: 'chapter-champion', icon: '👑', label: 'Business Babe', desc: 'Completed 10 chapters total — you\u2019re building real momentum' },
  { id: 'quiz-whiz', icon: '💎', label: 'Digital Girl', desc: 'Nailed your first money scenario' },
  { id: 'checklist-queen', icon: '💰', label: 'Income Explorer', desc: 'Finished a whole action checklist' },
  { id: 'dreamer', icon: '✨', label: 'Future Builder', desc: 'Added a goal to your Dream Board' },
  { id: 'consistency-queen', icon: '🔥', label: 'Career Glow-Up', desc: 'Showed up 3 days in a row' },
  { id: 'level-5', icon: '👑', label: 'CEO Energy', desc: 'Reached Level 5' },
  { id: 'offer-builder', icon: '🎀', label: 'Offer Builder', desc: 'Built your first money idea in a Builder tool' },
  { id: 'digital-bag-builder', icon: '📱', label: 'Digital Bag Builder', desc: 'Completed a Final Money Mission' },
];

export const DREAM_ITEMS = [
  { id: 'laptop', label: 'New laptop', icon: '💻' },
  { id: 'phone', label: 'New phone', icon: '📱' },
  { id: 'apartment', label: 'First apartment', icon: '🏠' },
  { id: 'camera', label: 'Dream camera', icon: '📷' },
  { id: 'travel', label: 'Passport & travel', icon: '✈️' },
  { id: 'savings', label: 'Emergency savings', icon: '💰' },
  { id: 'family', label: 'Help my family', icon: '💗' },
  { id: 'business', label: 'Build my business', icon: '🚀' },
  { id: 'invest', label: 'Invest in myself', icon: '🌱' },
  { id: 'quit-job', label: 'Quit a job I hate', icon: '🎉' },
];

function getJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getXP() {
  return Number(localStorage.getItem(XP_KEY) || 0);
}

export function getLevel(xp = getXP()) {
  return 1 + Math.floor(xp / XP_PER_LEVEL);
}

export function getLevelProgress(xp = getXP()) {
  const level = getLevel(xp);
  const levelFloor = (level - 1) * XP_PER_LEVEL;
  const into = xp - levelFloor;
  return { level, into, needed: XP_PER_LEVEL, pct: Math.round((into / XP_PER_LEVEL) * 100) };
}

export function getEarnedBadges() {
  return getJSON(BADGES_KEY, []);
}

function unlockBadge(id, onNewBadge) {
  const earned = getEarnedBadges();
  if (earned.includes(id)) return;
  earned.push(id);
  setJSON(BADGES_KEY, earned);
  const badge = BADGES.find((b) => b.id === id);
  if (badge && onNewBadge) onNewBadge(badge);
}

// Call this any time the reader does something worth rewarding.
// badgeId is optional — pass one of BADGES' ids to try to unlock it too.
export function awardXP(amount, { badgeId, onNewBadge, onXP } = {}) {
  const newXP = getXP() + amount;
  localStorage.setItem(XP_KEY, String(newXP));
  if (badgeId) unlockBadge(badgeId, onNewBadge);
  if (getLevel(newXP) >= 5) unlockBadge('level-5', onNewBadge);
  if (onXP) onXP(newXP, amount);
  return newXP;
}

// Records today's visit and returns the current consecutive-day streak.
export function recordVisitAndGetStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const dates = getJSON(VISITS_KEY, []);
  if (!dates.includes(today)) {
    dates.push(today);
    setJSON(VISITS_KEY, dates.slice(-30));
  }
  const sorted = [...new Set(getJSON(VISITS_KEY, []))].sort();
  let streak = 1;
  for (let i = sorted.length - 1; i > 0; i--) {
    const cur = new Date(sorted[i]);
    const prev = new Date(sorted[i - 1]);
    const diffDays = Math.round((cur - prev) / 86400000);
    if (diffDays === 1) streak++;
    else break;
  }
  if (sorted.length === 0) streak = 0;
  if (streak >= 3) unlockBadge('consistency-queen');
  return { streak, last7: getLast7Days(sorted) };
}

function getLast7Days(visitedDates) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    days.push({ label: d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1), visited: visitedDates.includes(iso) });
  }
  return days;
}

export function getDreamBoard() {
  return getJSON(DREAMBOARD_KEY, []);
}

export function toggleDream(id) {
  let checked = getDreamBoard();
  if (checked.includes(id)) {
    checked = checked.filter((d) => d !== id);
  } else {
    checked.push(id);
    unlockBadge('dreamer');
  }
  setJSON(DREAMBOARD_KEY, checked);
  return checked;
}

export { unlockBadge };

     
