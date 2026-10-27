/* =============================================
   JS/START-HERE.JS
   Drives /pages/start-here.html: four questions (goal, stage, weekly
   time, learning style) -> a route through the Playground built by
   step is there, lets the person change any answer, and is saved on this
   device only (localStorage, validated before use).
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initGirlGangPopup } from './girlgang-popup.js';
import { maybeShowJoinReminder } from './notifications.js';
import { findItemById } from '../data/store.js';
import { articleHref, pgGet, pgSet, pgMarkDone, pgHasDone } from './playground.js';


/* ---------- Rules and content (pure data and functions) ---------- */
const QUESTIONS = [
  { id: 'goal', text: 'What do you want to do next?', options: [
    { id: 'freelance', label: 'Start freelancing' },
    { id: 'earn', label: 'Make my first money online' },
    { id: 'career', label: 'Move forward in my career' },
    { id: 'business', label: 'Build a business or digital product' },
    { id: 'creator', label: 'Grow as a creator' },
    { id: 'learn', label: 'Learn a digital skill' },
    { id: 'unsure', label: "I honestly don't know yet" },
  ] },
  { id: 'stage', text: 'Where are you with this right now?', options: [
    { id: 'new', label: "Brand new: I haven't really started" },
    { id: 'some', label: "I've tried a little or read a lot" },
    { id: 'pro', label: "I've done this before and want to do it better" },
  ] },
  { id: 'time', text: 'How much time can you give this each week?', options: [
    { id: 'light', label: 'Under 3 hours' },
    { id: 'steady', label: '3 to 7 hours' },
    { id: 'deep', label: '8 hours or more' },
  ] },
  { id: 'style', text: 'How do you learn best?', options: [
    { id: 'try', label: 'By trying things and getting feedback' },
    { id: 'read', label: 'By understanding it first' },
    { id: 'tools', label: 'With ready-made tools I can fill in' },
  ] },
];

const STEPS_PER_TIME = { light: 2, steady: 3, deep: 4 };

/* Every step a route can contain. kind: practise | learn | tool | explore */
const STEPS = {
  'money-path': { title: 'Money Path', href: '/pages/money-path.html', minutes: 10, kind: 'explore' },
  'client-sim': { title: 'Client Simulator', href: '/pages/client-simulator.html', minutes: 15, kind: 'practise' },
  glossary: { title: 'Digital Girl Glossary', href: '/pages/glossary.html', minutes: 10, kind: 'learn' },
  templates: { title: 'Free Girlie Templates', href: '/pages/templates.html', minutes: 15, kind: 'tool' },
  'game:money-moves': { title: 'Game Room: Money Moves', href: '/pages/game-room.html?game=money-moves', minutes: 8, kind: 'practise' },
  'game:red-flag': { title: 'Game Room: Client or Red Flag?', href: '/pages/game-room.html?game=red-flag', minutes: 8, kind: 'practise' },
  'game:skill-match': { title: 'Game Room: Skill Match', href: '/pages/game-room.html?game=skill-match', minutes: 8, kind: 'practise' },
  'game:inbox-boss': { title: 'Game Room: Inbox Boss', href: '/pages/game-room.html?game=inbox-boss', minutes: 10, kind: 'practise' },
  'game:price-this': { title: 'Game Room: Price This Project', href: '/pages/game-room.html?game=price-this', minutes: 8, kind: 'practise' },
  'game:real-scam': { title: 'Game Room: Real or Scam?', href: '/pages/game-room.html?game=real-scam', minutes: 8, kind: 'practise' },
};

const ALL = ['new', 'some', 'pro'];

/* Candidate steps per goal, in default order. `tpl` names the real
   template(s) in the library to open once on the Templates page. */
const GOAL_ROUTES = {
  freelance: {
    label: 'freelancing',
    articlesFrom: 'freelance',
    steps: [
      { id: 'glossary', stages: ['new'], why: 'Freelancing has its own vocabulary (scope, deposit, retainer). Knowing it makes every later step easier.' },
      { id: 'game:red-flag', stages: ['new', 'some'], why: 'Spotting a bad-fit client early protects your time before you have much to protect.' },
      { id: 'client-sim', stages: ALL, why: 'Scope, pricing and payment conversations are where new freelancers lose money. Practise them first, for free.' },
      { id: 'game:price-this', stages: ['some', 'pro'], why: 'Pricing is the skill freelancers most often get wrong in the same direction: too low.' },
      { id: 'templates', stages: ALL, tpl: 'Freelance Proposal Structure, Scope of Work Checklist and Client Onboarding Checklist', why: 'Written scope and a clear proposal prevent most client disputes before they start.' },
      { id: 'game:inbox-boss', stages: ['pro'], why: 'Harder, faster client messages once the basics are second nature.' },
    ],
    first: {
      new: 'Write one sentence: "I help [who] with [what]." Then run the Client Simulator once, without looking anything up.',
      some: 'Open the Freelance Proposal Structure template and fill it in for an imaginary client. Notice which part you could not answer.',
      pro: 'Run Client Simulator and aim for the stronger option every time. Then check your last real quote against the Scope of Work Checklist.',
    },
  },
  earn: {
    label: 'earning online',
    articlesFrom: 'make-money',
    steps: [
      { id: 'money-path', stages: ['new', 'some'], why: 'It compares income directions against your time, budget and skills, so you do not pick one at random.' },
      { id: 'glossary', stages: ['new'], why: 'Online income comes with jargon that makes beginners feel behind. A few terms clear that up fast.' },
      { id: 'game:real-scam', stages: ['new', 'some'], why: 'Beginners are the main target for fake opportunities. Learn the patterns before you go looking.' },
      { id: 'game:money-moves', stages: ALL, why: 'Practise what to do with early income so one good month does not disappear.' },
      { id: 'templates', stages: ALL, tpl: 'Side-Hustle Income Tracker and Income Tracker', why: 'You cannot improve income you are not tracking.' },
      { id: 'client-sim', stages: ['some', 'pro'], why: 'Most online income eventually involves a client. Practise handling one.' },
    ],
    first: {
      new: 'Take Money Path, then pick the one direction that needs the least money to test. Spend 30 minutes this week looking at real examples of it.',
      some: 'Take Money Path again with your honest constraints. Compare your top two directions and choose one to test for two weeks.',
      pro: 'Open the Income Tracker and record the last three months. Decide which source to grow rather than adding a new one.',
    },
  },
  career: {
    label: 'your career',
    articlesFrom: 'career',
    steps: [
      { id: 'money-path', stages: ['new'], why: 'If your direction is unclear, exploring options first saves months of effort in the wrong place.' },
      { id: 'templates', stages: ALL, tpl: 'Career Planning Worksheet, LinkedIn Profile Checklist and Interview Preparation Worksheet', why: 'These turn "I want to grow" into specific actions you can complete this month.' },
      { id: 'glossary', stages: ['new', 'some'], why: 'Knowing the digital terms in job posts helps you judge which roles fit you.' },
      { id: 'game:money-moves', stages: ['some', 'pro'], why: 'Career moves are money decisions too: offers, raises, and when to leave.' },
      { id: 'client-sim', stages: ['pro'], why: 'The negotiation and boundary-setting practice carries over to managers and stakeholders.' },
    ],
    first: {
      new: 'Fill in the first half of the Career Planning Worksheet. Do not worry about the answers being perfect.',
      some: 'Update your LinkedIn profile using the checklist, then book one conversation with someone in the role you want.',
      pro: 'Use the Interview Preparation Worksheet on the next role you want, even if you are not applying yet. It shows your gaps.',
    },
  },
  business: {
    label: 'building a business',
    articlesFrom: 'business',
    steps: [
      { id: 'money-path', stages: ['new'], why: 'Choosing a direction that suits your time and budget comes before choosing a product.' },
      { id: 'glossary', stages: ['new', 'some'], why: 'Offer, niche, funnel and audience are the terms every business decision uses.' },
      { id: 'templates', stages: ALL, tpl: 'Business Idea Worksheet, Offer Builder and Customer Research Worksheet', why: 'They force the questions that decide whether an idea can sell.' },
      { id: 'game:price-this', stages: ['some', 'pro'], why: 'Pricing is a business decision before it is a number. Practise weighing the factors.' },
      { id: 'game:real-scam', stages: ['new'], why: 'New business owners get targeted by "guaranteed" growth offers. Learn the warning signs.' },
      { id: 'client-sim', stages: ['pro'], why: 'If you sell services, how you handle scope and payment decides your margin.' },
    ],
    first: {
      new: 'Write down one specific person you want to help and one problem they already pay to solve. Use the Business Idea Worksheet.',
      some: 'Use the Offer Builder to write your offer in plain words, then ask two real people whether they understand it.',
      pro: 'Run your current offer through the Customer Research Worksheet. Find what your best customers have in common.',
    },
  },
  creator: {
    label: 'growing as a creator',
    articlesFrom: 'creator',
    steps: [
      { id: 'glossary', stages: ['new', 'some'], why: 'Niche, audience, engagement and funnel decide what you post and why.' },
      { id: 'templates', stages: ALL, tpl: 'Content Pillar Worksheet, 30-Day Content Planner and Content Idea Bank', why: 'A plan removes the daily "what do I post?" decision, which is where most creators stall.' },
      { id: 'money-path', stages: ['new', 'some'], why: 'Creator income comes from several directions. This helps you see which fits your time and budget.' },
      { id: 'client-sim', stages: ['some', 'pro'], why: 'Brand deals are client work. Practise pricing and boundaries before you are offered one.' },
      { id: 'game:real-scam', stages: ALL, why: 'Creators receive many fake collaboration offers. Learn what separates real from fake.' },
    ],
    first: {
      new: 'Use the Content Pillar Worksheet to choose three topics you can talk about for a year.',
      some: 'Fill in the 30-Day Content Planner for next month, then post the first three items before you open it again.',
      pro: 'Run the Client Simulator with brand-deal pricing in mind, then set a minimum rate you will not go below.',
    },
  },
  learn: {
    label: 'learning a digital skill',
    articlesFrom: 'learn-skill',
    steps: [
      { id: 'money-path', stages: ['new', 'some'], why: 'It shows which skills match your interests and constraints, so you commit to one you can finish.' },
      { id: 'game:skill-match', stages: ALL, why: 'Matching real problems to the skills that solve them shows you what each skill is for.' },
      { id: 'glossary', stages: ['new', 'some'], why: 'You learn faster when the vocabulary stops getting in the way.' },
      { id: 'templates', stages: ALL, tpl: 'Career Planning Worksheet and Goal Tracker', why: 'A written goal and a weekly check-in are what turn learning into a finished skill.' },
      { id: 'client-sim', stages: ['pro'], why: 'Applying a skill for someone else is the fastest test of whether you really have it.' },
    ],
    first: {
      new: 'Play Skill Match, then pick one skill and spend 30 minutes this week trying it in a free tool.',
      some: 'Choose one skill and set a four-week goal in the Goal Tracker. Make the goal a finished piece of work.',
      pro: 'Pick a small real problem and solve it with your skill. Then practise explaining the result in the Client Simulator.',
    },
  },
  unsure: {
    label: 'finding a direction',
    articlesFrom: 'unsure',
    steps: [
      { id: 'money-path', stages: ALL, why: 'Not knowing is exactly what it is for. It starts from your time, budget and interests.' },
      { id: 'glossary', stages: ['new'], why: 'A few key terms make everything else you read make sense.' },
      { id: 'game:skill-match', stages: ['new', 'some'], why: 'Seeing which skills solve which problems helps you notice what appeals to you.' },
      { id: 'game:real-scam', stages: ['new', 'some'], why: 'While you are exploring, you are the ideal target for fake opportunities. This protects you.' },
      { id: 'templates', stages: ALL, tpl: 'Career Planning Worksheet and Goal Tracker', why: 'Writing down what you want, even roughly, makes the next choice clearer.' },
    ],
    first: {
      new: 'Take Money Path. There is no wrong answer, and you can change your answers and see how the results move.',
      some: 'Take Money Path and compare your top two directions. Pick the one you would be curious about even if it paid less at first.',
      pro: 'Use the Career Planning Worksheet to name what you want more of and less of in your work.',
    },
  },
};

/* Existing article-id lists, reused for "Read next" so we do not duplicate content. */
const READ_NEXT = {
  freelance: ['how-to-get-your-first-freelance-client', 'how-to-get-paid-as-a-freelancer', 'freelance-rate-calculator'],
  'make-money': ['how-to-make-your-first-1000-online', 'making-money-online-things-beginners-need-to-know'],
  career: ['how-to-choose-a-career', 'resume-review-checklist', 'salary-negotiation-calculator'],
  business: ['how-to-create-and-sell-a-digital-product', 'business-idea-validator'],
  creator: ['personal-branding-for-beginners', 'instagram-pays-too-sis'],
  'learn-skill': ['digital-skills-for-beginners', 'best-money-making-skills-2026'],
  unsure: ['digital-skills-for-beginners', 'best-money-making-skills-2026'],
};

/* Pure function: answers -> route. Exported so it can be tested without a browser. */
function buildRoute(answers) {
  const goal = GOAL_ROUTES[answers.goal];
  if (!goal) return null;
  const preferred = { try: 'practise', read: 'learn', tools: 'tool' }[answers.style];
  const limit = STEPS_PER_TIME[answers.time] || 3;

  const candidates = goal.steps
    .map((s, index) => ({ ...s, index, step: STEPS[s.id] }))
    .filter((s) => s.step && s.stages.includes(answers.stage));

  candidates.sort((a, b) => {
    const bonusA = a.step.kind === preferred ? 1 : 0;
    const bonusB = b.step.kind === preferred ? 1 : 0;
    return bonusB - bonusA || a.index - b.index;
  });

  const chosen = candidates.slice(0, limit);
  const leftOut = candidates.slice(limit);
  return {
    goal,
    steps: chosen,
    leftOut,
    first: goal.first[answers.stage] || goal.first.new,
    totalMinutes: chosen.reduce((sum, s) => sum + s.step.minutes, 0),
  };
}

const gaEvent = (name, params = {}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };

const root = document.getElementById('path-grid');
const detailRoot = document.getElementById('path-detail');
const STORE_KEY = 'start-here-answers';

let answers = {};
let step = 0;

/* ---- storage (never throws; validates what it reads) ---- */
function loadSaved() {
  try {
    const saved = pgGet(STORE_KEY);
    if (!saved || typeof saved !== 'object') return null;
    const ok = QUESTIONS.every((q) => q.options.some((o) => o.id === saved[q.id]));
    return ok ? Object.fromEntries(QUESTIONS.map((q) => [q.id, saved[q.id]])) : null;
  } catch { return null; }
}
function save() { try { pgSet(STORE_KEY, answers); } catch { /* storage unavailable: the result still works */ } }

const labelFor = (qid, oid) => QUESTIONS.find((q) => q.id === qid).options.find((o) => o.id === oid).label;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function focusHeading() {
  const h = root.querySelector('[data-focus]');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: false }); }
}

/* ---- questions ---- */
function renderQuestion() {
  detailRoot.hidden = true;
  const q = QUESTIONS[step];
  root.innerHTML = `
    <p class="pg-round-counter">Question ${step + 1} of ${QUESTIONS.length}</p>
    <div class="pathquiz-card">
      <p class="quiz-label" data-focus>${esc(q.text)}</p>
      <div class="pathquiz-options" role="group" aria-label="${esc(q.text)}">
        ${q.options.map((o) => `<button class="pathquiz-option${answers[q.id] === o.id ? ' selected' : ''}" data-id="${o.id}" type="button" aria-pressed="${answers[q.id] === o.id}"><span class="pathquiz-icon" aria-hidden="true">✦</span>${esc(o.label)}</button>`).join('')}
      </div>
      ${step > 0 ? '<div class="pg-game-nav"><button class="btn btn-secondary" id="sh-back" type="button">← Back</button></div>' : ''}
    </div>`;
  root.querySelectorAll('.pathquiz-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      answers[q.id] = btn.dataset.id;
      if (step < QUESTIONS.length - 1) { step += 1; renderQuestion(); focusHeading(); }
      else finish();
    });
  });
  document.getElementById('sh-back')?.addEventListener('click', () => { step -= 1; renderQuestion(); focusHeading(); });
}

/* ---- result ---- */
function stepHtml(s, i) {
  const st = s.step;
  const tpl = s.tpl ? `<span class="sh-tpl">Look for: ${esc(s.tpl)}.</span>` : '';
  return `
    <li class="sh-step">
      <a class="sh-step-link" href="${st.href}">
        <span class="sh-step-title">${esc(st.title)}</span>
        <span class="sh-step-meta">about ${st.minutes} min</span>
      </a>
      <p class="sh-step-why">${esc(s.why)} ${tpl}</p>
    </li>`;
}

function altGoalsHtml() {
  const others = Object.keys(GOAL_ROUTES).filter((g) => g !== answers.goal).slice(0, 3);
  return others.map((g) => `<button class="pg-filter-pill" data-goal="${g}" type="button">${esc(labelFor('goal', g))}</button>`).join('');
}

function finish() {
  const route = buildRoute(answers);
  if (!route) { step = 0; answers = {}; renderQuestion(); return; }
  save();
  if (!pgHasDone('start-here-done')) { pgMarkDone('start-here-done'); gaEvent('start_here_completed', { goal: answers.goal }); }

  const readIds = READ_NEXT[route.goal.articlesFrom] || [];
  const reads = readIds.map((id) => findItemById(id)).filter(Boolean)
    .map((item) => `<li><a href="${articleHref(item.id)}">${esc(item.title)}</a></li>`).join('');
  const paceNote = { light: 'Because you have under 3 hours a week, this is two small steps rather than a full programme.', steady: 'With 3 to 7 hours a week, this is three steps you can finish in a couple of weeks.', deep: 'With 8 hours or more, this is a four-step route you could finish in about a week.' }[answers.time];

  root.innerHTML = `
    <div class="pathquiz-result">
      <p class="quiz-label" data-focus>Your route for ${esc(route.goal.label)}</p>
      <p class="sh-answers">${QUESTIONS.map((q) => `<span class="pathquiz-tag">${esc(labelFor(q.id, answers[q.id]))}</span>`).join(' ')}</p>
      <p>${esc(paceNote)} Total: about ${route.totalMinutes} minutes of activity.</p>
      <ol class="sh-steps">${route.steps.map(stepHtml).join('')}</ol>
      <div class="pg-first-moves">
        <h3>Your first action</h3>
        <p>${esc(route.first)}</p>
      </div>
      ${reads ? `<p class="quiz-label" style="margin-top:1.5rem;">Read next</p><ul class="sh-reads">${reads}</ul>` : ''}
      ${route.leftOut.length ? `<p class="sh-leftout">Left out for now to match your time: ${route.leftOut.map((s) => esc(s.step.title)).join(', ')}.</p>` : ''}
      <p class="quiz-label" style="margin-top:1.5rem;">Different goal? Same answers, new route</p>
      <div class="pg-glossary-filters">${altGoalsHtml()}</div>
      <div class="pg-template-actions">
        <button class="btn btn-secondary" id="sh-change" type="button">Change my answers</button>
        <button class="btn btn-secondary" id="sh-restart" type="button">Start over</button>
      </div>
      <p class="pg-disclaimer">Routes are built from your four answers using fixed rules, not a prediction of results. Your answers are saved on this device only.</p>
    </div>`;
  rewriteRootLinks(root);

  root.querySelectorAll('[data-goal]').forEach((btn) => btn.addEventListener('click', () => { answers.goal = btn.dataset.goal; finish(); focusHeading(); }));
  document.getElementById('sh-change')?.addEventListener('click', () => { step = 0; renderQuestion(); focusHeading(); });
  document.getElementById('sh-restart')?.addEventListener('click', () => { answers = {}; step = 0; renderQuestion(); focusHeading(); });
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

  const heroP = document.querySelector('.page-hero p');
  if (heroP) heroP.textContent = "You don't need to know exactly what you're doing yet. Answer four quick questions and get a route through the Playground, built from your answers.";

  const saved = loadSaved();
  if (saved) { answers = saved; finish(); } else renderQuestion();
}

document.addEventListener('DOMContentLoaded', init);
