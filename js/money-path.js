/* =============================================
   JS/MONEY-PATH.JS
   Drives /pages/money-path.html. Five interest questions (reusing the
   existing question bank) plus four practical constraints (time, budget,
   client comfort, speed). Pathways are ranked by rankPathways() in
   side-by-side comparison, a four-week starter plan, and a "what if"
   panel so changing a constraint visibly changes the ranking.
   Answers are saved on this device only and validated before use.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initGirlGangPopup } from './girlgang-popup.js';
import { maybeShowJoinReminder } from './notifications.js';
import { MONEY_PATH_QUESTIONS } from '../data/playground.js';
import { findItemById } from '../data/store.js';
import { pgGrantXP, pgMarkDone, pgHasDone, pgCheckQueenBadge, pgGet, pgSet, renderKeepExploring, articleHref } from './playground.js';


/* ---------- Pathways and scoring rules (pure data and functions) ---------- */
const WEIGHTS = { interest: 0.4, time: 0.2, budget: 0.15, clients: 0.15, speed: 0.1 };

/* Which of the existing 10 interest questions we ask (indexes into
   MONEY_PATH_QUESTIONS). Five is enough: each covers most types. */
const INTEREST_QUESTION_INDEXES = [0, 1, 3, 8, 9];

const CONSTRAINT_QUESTIONS = [
  { id: 'time', text: 'How much time can you give this each week?', options: [
    { id: 'light', label: 'Under 3 hours', value: 1 },
    { id: 'steady', label: '3 to 7 hours', value: 2 },
    { id: 'deep', label: '8 hours or more', value: 3 },
  ] },
  { id: 'budget', text: 'What can you spend to get started (tools, courses)?', options: [
    { id: 'none', label: 'Nothing right now', value: 0 },
    { id: 'small', label: 'A small amount if it is worth it', value: 1 },
    { id: 'some', label: 'A comfortable amount', value: 2 },
  ] },
  { id: 'clients', text: 'How do you feel about working directly with clients?', options: [
    { id: 'avoid', label: 'I would rather not', value: 0 },
    { id: 'okay', label: 'Fine, with some practice', value: 1 },
    { id: 'love', label: 'I enjoy it', value: 2 },
  ] },
  { id: 'speed', text: 'How soon do you hope to see a first opportunity?', options: [
    { id: 'fast', label: 'Within a month or two if possible', value: 0 },
    { id: 'patient', label: 'I can build for three to six months', value: 1 },
  ] },
];

/* learn: weekly time realistically needed to make progress (1 light, 2 steady, 3 deep)
   cost: 0 = can start free, 1 = needs a small spend (tools/course)
   clientFacing: 0 none, 1 some, 2 a lot
   firstOpp: 1 = often within weeks, 2 = a month or two, 3 = usually longer (portfolio or audience first) */
const PATHWAYS = [
  { id: 'va', title: 'Virtual assistance', types: { organized: 1, people: 0.8, builder: 0.2 },
    learn: 1, cost: 0, clientFacing: 2, firstOpp: 1, uncertainty: 'Medium. Client work can be irregular until you have repeat clients.', growth: 'Medium. Grows by raising rates or specialising.',
    summary: 'Handling inboxes, scheduling, research and admin for busy founders and small businesses.',
    skills: ['Email and calendar management', 'Clear written updates', 'Basic spreadsheets and project tools'],
    challenges: ['Finding the first client without a track record', 'Pricing by hour can cap income'],
    plan: ['Pick two services you can do well and write them down.', 'Practise with a friend or family business and ask for a short testimonial.', 'Draft your one-sentence offer and a simple scope.', 'Message 10 small businesses with a specific offer.'],
    articles: ['virtual-assistant-pretty-paid-booked', 'how-to-get-your-first-freelance-client'] },
  { id: 'community', title: 'Customer support and community', types: { people: 1, organized: 0.6 },
    learn: 1, cost: 0, clientFacing: 2, firstOpp: 1, uncertainty: 'Lower. Often paid roles or retainers rather than one-off projects.', growth: 'Lower to medium. Typically grows through promotion or specialising.',
    summary: 'Answering customers, moderating communities and helping people get value from a product.',
    skills: ['Calm written communication', 'Problem solving', 'Using help-desk and chat tools'],
    challenges: ['Roles can be repetitive', 'Emotionally demanding when customers are upset'],
    plan: ['Learn one help-desk tool from its free documentation.', 'Write sample replies to three difficult customer messages.', 'Apply to five support or community roles and note what they ask for.', 'Adjust your samples to match those requirements.'],
    articles: ['digital-skills-for-beginners'] },
  { id: 'social', title: 'Social media management', types: { people: 0.7, creative: 0.8, strategist: 0.5 },
    learn: 2, cost: 0, clientFacing: 2, firstOpp: 2, uncertainty: 'Medium. Usually monthly retainers, but clients can leave quickly.', growth: 'Medium to high. Grows through packages and results.',
    summary: 'Planning, creating and scheduling content for a business, and reporting what worked.',
    skills: ['Content planning', 'Basic design in free tools', 'Reading simple analytics'],
    challenges: ['Results depend on things you do not control', 'Scope creep around "just one more post"'],
    plan: ['Pick one industry and study five accounts in it.', 'Make a one-week content plan for an imaginary client.', 'Offer a free first month to one small business in exchange for a case study.', 'Turn that into a package with a clear scope.'],
    articles: ['instagram-pays-too-sis', 'personal-branding-for-beginners'] },
  { id: 'design', title: 'Graphic and visual design', types: { creative: 1, builder: 0.4 },
    learn: 3, cost: 1, clientFacing: 2, firstOpp: 3, uncertainty: 'Medium to high. You usually need a portfolio before the first paid job.', growth: 'High. Specialising (brand, web, product) raises what you can charge.',
    summary: 'Logos, social graphics, brand kits and layouts for businesses and creators.',
    skills: ['Layout and typography', 'A design tool such as Canva or Figma', 'Taking a brief and presenting options'],
    challenges: ['Building a portfolio before you have clients', 'Revision loops without a clear limit'],
    plan: ['Learn one tool through a free tutorial.', 'Make three practice projects for imaginary brands.', 'Publish them as a small portfolio page.', 'Offer one fixed-price package and set a revision limit up front.'],
    articles: ['best-money-making-skills-2026', 'personal-branding-for-beginners'] },
  { id: 'writing', title: 'Copywriting and content writing', types: { strategist: 1, creative: 0.6 },
    learn: 2, cost: 0, clientFacing: 1, firstOpp: 2, uncertainty: 'Medium to high. Project-based, so income can swing month to month.', growth: 'High. Specialising in a niche or in conversion copy raises rates.',
    summary: 'Words that sell or explain: web pages, emails, product descriptions and articles.',
    skills: ['Clear, persuasive writing', 'Research', 'Understanding what the reader needs'],
    challenges: ['Low-paid generic work is easy to find, well-paid work needs a niche', 'Samples needed before the first client'],
    plan: ['Choose one industry you understand.', 'Write three samples: a web page, an email, a product description.', 'Edit them against a checklist and ask someone to read them cold.', 'Pitch five small businesses with a specific improvement to their copy.'],
    articles: ['best-money-making-skills-2026', 'digital-skills-for-beginners'] },
  { id: 'marketing', title: 'Email marketing and SEO', types: { strategist: 1, organized: 0.6, builder: 0.3 },
    learn: 3, cost: 1, clientFacing: 1, firstOpp: 3, uncertainty: 'Medium. Often ongoing work, but you need to show results first.', growth: 'High. Marketing skills are in demand and pay more with experience.',
    summary: 'Helping a business get found and stay in touch: search visibility and email campaigns.',
    skills: ['Keyword research', 'Email platforms', 'Reading and explaining basic metrics'],
    challenges: ['Results take time and are hard to promise', 'A lot to learn before you can charge confidently'],
    plan: ['Complete one free beginner course in either email or SEO.', 'Run a small project on your own site or a friend\'s.', 'Write up what you did and what changed.', 'Offer an audit to three small businesses.'],
    articles: ['best-money-making-skills-2026', 'digital-skills-for-beginners'] },
  { id: 'nocode', title: 'Website building and automation', types: { builder: 1, strategist: 0.5, organized: 0.4 },
    learn: 3, cost: 1, clientFacing: 2, firstOpp: 3, uncertainty: 'Medium. Project-based, with a chance of repeat maintenance work.', growth: 'High. Technical skills command higher rates.',
    summary: 'Building simple sites and automating repetitive tasks with no-code tools.',
    skills: ['A site builder or no-code tool', 'Thinking through a process step by step', 'Basic design sense'],
    challenges: ['Steep early learning curve', 'Clients expect ongoing support after launch'],
    plan: ['Pick one tool and build a simple one-page site.', 'Automate one real task of your own.', 'Document both as case studies.', 'Offer one small fixed-scope project to a local business.'],
    articles: ['digital-skills-for-beginners', 'best-money-making-skills-2026'] },
  { id: 'products', title: 'Digital products', types: { entrepreneurial: 1, creative: 0.6, organized: 0.5 },
    learn: 2, cost: 1, clientFacing: 0, firstOpp: 3, uncertainty: 'High. No sales are guaranteed, and an audience usually has to come first.', growth: 'High. One product can sell repeatedly once it works.',
    summary: 'Templates, guides and planners you make once and sell many times.',
    skills: ['Identifying a real problem to solve', 'Making a clear, useful resource', 'Simple marketing'],
    challenges: ['Selling to people who do not know you yet', 'Easy to build something nobody wants'],
    plan: ['Write the one problem you want to solve and for whom.', 'Ask five people in that group what they have already tried.', 'Make a small version and give it to a few people for feedback.', 'Decide, from their reactions, whether to build the full version.'],
    articles: ['how-to-create-and-sell-a-digital-product'] },
  { id: 'creator', title: 'Content creation', types: { creative: 1, entrepreneurial: 0.7, people: 0.4 },
    learn: 2, cost: 1, clientFacing: 0, firstOpp: 3, uncertainty: 'High. Audience growth is slow and income can be irregular.', growth: 'High, but uneven. Depends on audience and consistency.',
    summary: 'Building an audience around a topic and earning through partnerships, products or ads.',
    skills: ['Consistent publishing', 'Storytelling', 'Basic editing and analytics'],
    challenges: ['It can take many months before income appears', 'Burnout from posting consistently'],
    plan: ['Choose three topics you can talk about for a year.', 'Plan and post ten pieces over four weeks.', 'Note which ones people respond to.', 'Double down on the best two topics.'],
    articles: ['soft-girl-youtube-creator', 'instagram-pays-too-sis'] },
];

const TYPES = ['creative', 'people', 'strategist', 'builder', 'organized', 'entrepreneurial'];

/* typeCounts: { creative: 2, ... } from the interest questions. */
function interestFit(pathway, typeCounts) {
  const max = Math.max(1, ...TYPES.map((t) => typeCounts[t] || 0));
  let num = 0;
  let den = 0;
  Object.entries(pathway.types).forEach(([t, w]) => { num += w * ((typeCounts[t] || 0) / max); den += w; });
  return den ? num / den : 0;
}

const clamp01 = (n) => Math.max(0, Math.min(1, n));

/* c = { time: 1-3, budget: 0-2, clients: 0-2, speed: 0|1 } */
function scoreParts(pathway, typeCounts, c) {
  const interest = interestFit(pathway, typeCounts);
  const time = clamp01(1 - 0.35 * Math.max(0, pathway.learn - c.time));
  const budget = pathway.cost <= c.budget ? 1 : 0.2;
  const clients = clamp01(1 - 0.4 * Math.max(0, pathway.clientFacing - c.clients) - (c.clients === 2 && pathway.clientFacing === 0 ? 0.15 : 0));
  const speed = c.speed === 1 ? 1 : clamp01(1 - 0.3 * (pathway.firstOpp - 1));
  const total = Math.round(100 * (WEIGHTS.interest * interest + WEIGHTS.time * time + WEIGHTS.budget * budget + WEIGHTS.clients * clients + WEIGHTS.speed * speed));
  return { interest, time, budget, clients, speed, total };
}

const label = (v) => (v >= 0.8 ? 'Strong' : v >= 0.55 ? 'Fair' : 'Stretch');

/* answers = { interest: ['creative', ...], time:'light', budget:'none', clients:'okay', speed:'fast' } */
function constraintValues(answers) {
  const out = {};
  CONSTRAINT_QUESTIONS.forEach((q) => {
    const o = q.options.find((x) => x.id === answers[q.id]);
    out[q.id] = o ? o.value : null;
  });
  return out;
}

function isValidAnswers(a) {
  if (!a || typeof a !== 'object' || !Array.isArray(a.interest)) return false;
  if (a.interest.length !== INTEREST_QUESTION_INDEXES.length || !a.interest.every((t) => TYPES.includes(t))) return false;
  return CONSTRAINT_QUESTIONS.every((q) => q.options.some((o) => o.id === a[q.id]));
}

function rankPathways(answers) {
  const typeCounts = {};
  answers.interest.forEach((t) => { typeCounts[t] = (typeCounts[t] || 0) + 1; });
  const c = constraintValues(answers);
  return PATHWAYS
    .map((pathway) => ({ pathway, parts: scoreParts(pathway, typeCounts, c) }))
    .sort((a, b) => b.parts.total - a.parts.total || a.pathway.title.localeCompare(b.pathway.title));
}

/* Plain-language reasons built only from the parts that actually scored well/poorly. */
function explain(pathway, parts, answers) {
  const good = [];
  const watch = [];
  if (parts.interest >= 0.7) good.push('It lines up with what you said you enjoy.');
  else if (parts.interest < 0.4) watch.push('It is not a strong match for the interests you chose, so it would need extra motivation.');
  if (parts.time >= 0.99) good.push('The weekly time you have is enough to make steady progress.');
  else watch.push('It usually needs more weekly time than you have, so expect it to take longer.');
  if (pathway.cost === 0) good.push('You can start without spending anything.');
  else if (parts.budget < 0.5) watch.push('It normally needs a small spend (a tool or course), which you said you would rather avoid for now.');
  if (parts.clients >= 0.99 && pathway.clientFacing > 0) good.push('The amount of client contact suits how you feel about it.');
  else if (parts.clients < 0.8) watch.push('It involves more client contact than you are comfortable with. Client Simulator can help you practise.');
  if (answers.speed === 'fast' && pathway.firstOpp === 1) good.push('A first opportunity can come relatively quickly.');
  else if (answers.speed === 'fast' && pathway.firstOpp === 3) watch.push('A first opportunity usually takes longer here (you need a portfolio or audience first).');
  return { good, watch };
}

const gaEvent = (name, params = {}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };

const quizRoot = document.getElementById('money-path-quiz');
const resultRoot = document.getElementById('money-path-result');
const STORE_KEY = 'money-path-v2';

const INTEREST_QS = INTEREST_QUESTION_INDEXES.map((i) => MONEY_PATH_QUESTIONS[i]);
const TOTAL = INTEREST_QS.length + CONSTRAINT_QUESTIONS.length;

let step = 0;
let answers = { interest: [] };

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function load() {
  try { const saved = pgGet(STORE_KEY); return isValidAnswers(saved) ? saved : null; } catch { return null; }
}
function save() { try { pgSet(STORE_KEY, answers); } catch { /* storage unavailable: results still work this visit */ } }

function focusLabel() {
  const el = document.querySelector('[data-focus]');
  if (el) { el.setAttribute('tabindex', '-1'); el.focus(); }
}

/* ---------- questions ---------- */
function currentQuestion() {
  if (step < INTEREST_QS.length) {
    const q = INTEREST_QS[step];
    return { text: q.question, options: q.options.map((o) => ({ id: o.type, label: o.label })), selected: answers.interest[step], set: (id) => { answers.interest[step] = id; } };
  }
  const q = CONSTRAINT_QUESTIONS[step - INTEREST_QS.length];
  return { text: q.text, options: q.options, selected: answers[q.id], set: (id) => { answers[q.id] = id; } };
}

function renderQuestion() {
  quizRoot.hidden = false;
  resultRoot.hidden = true;
  const q = currentQuestion();
  quizRoot.innerHTML = `
    <p class="pg-round-counter">Question ${step + 1} of ${TOTAL}</p>
    <div class="pathquiz-card">
      <p class="quiz-label" data-focus>${esc(q.text)}</p>
      <div class="pathquiz-options" role="group" aria-label="${esc(q.text)}">
        ${q.options.map((o, i) => `<button class="pathquiz-option${q.selected === o.id ? ' selected' : ''}" data-index="${i}" type="button" aria-pressed="${q.selected === o.id}"><span class="pathquiz-icon" aria-hidden="true">✦</span>${esc(o.label)}</button>`).join('')}
      </div>
      ${step > 0 ? '<div class="pg-game-nav"><button class="btn btn-secondary" id="mp-back" type="button">← Back</button></div>' : ''}
    </div>`;
  quizRoot.querySelectorAll('.pathquiz-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      q.set(q.options[Number(btn.dataset.index)].id);
      step += 1;
      if (step < TOTAL) { renderQuestion(); focusLabel(); } else finishQuiz();
    });
  });
  document.getElementById('mp-back')?.addEventListener('click', () => { step -= 1; renderQuestion(); focusLabel(); });
}

function finishQuiz() {
  save();
  showResult();
  gaEvent('money_path_completed', { top: rankPathways(answers)[0].pathway.id });
  if (!pgHasDone('money-path-done')) {
    pgMarkDone('money-path-done');
    pgGrantXP(50, { badgeId: 'pathfinder' });
    pgCheckQueenBadge();
  }
}

/* ---------- results ---------- */
const PART_ROWS = [['interest', 'Interest'], ['time', 'Weekly time'], ['budget', 'Budget'], ['clients', 'Client comfort'], ['speed', 'Speed to a first opportunity']];

function compareTable(top) {
  return `
    <div class="mp-table-wrap" tabindex="0" role="region" aria-label="Comparison of your top three pathways">
      <table class="mp-table">
        <caption class="pgh-sr">How your top three pathways compare on each factor</caption>
        <thead><tr><th scope="col">Factor</th>${top.map((r) => `<th scope="col">${esc(r.pathway.title)}</th>`).join('')}</tr></thead>
        <tbody>
          ${PART_ROWS.map(([k, name]) => `<tr><th scope="row">${name}</th>${top.map((r) => `<td>${label(r.parts[k])}</td>`).join('')}</tr>`).join('')}
          <tr><th scope="row">Overall fit</th>${top.map((r) => `<td><strong>${r.parts.total}</strong> / 100</td>`).join('')}</tr>
        </tbody>
      </table>
    </div>`;
}

function whatIfPanel() {
  return `
    <form class="mp-whatif" id="mp-whatif">
      <h3>What if your situation changes?</h3>
      <p>Change any answer and the ranking above updates.</p>
      ${CONSTRAINT_QUESTIONS.map((q) => `
        <fieldset>
          <legend>${esc(q.text)}</legend>
          ${q.options.map((o) => `<label><input type="radio" name="${q.id}" value="${o.id}"${answers[q.id] === o.id ? ' checked' : ''}> ${esc(o.label)}</label>`).join('')}
        </fieldset>`).join('')}
    </form>`;
}

function renderOut() {
  const ranked = rankPathways(answers);
  const best = ranked[0];
  const { good, watch } = explain(best.pathway, best.parts, answers);
  const p = best.pathway;
  const others = ranked.slice(1, 3);
  const out = document.getElementById('mp-out');
  out.innerHTML = `
    <p class="quiz-label" data-focus>Your best starting fit</p>
    <h2 class="mp-top">${esc(p.title)}</h2>
    <p class="mp-score">Fit ${best.parts.total} / 100 <span>(a way to compare options against your answers, not a prediction)</span></p>
    <p>${esc(p.summary)}</p>
    ${good.length ? `<h3>Why it fits you</h3><ul class="mp-list">${good.map((g) => `<li>${esc(g)}</li>`).join('')}</ul>` : ''}
    <h3>Watch-outs</h3>
    <ul class="mp-list">
      ${watch.map((w) => `<li>${esc(w)}</li>`).join('')}
      <li>Income uncertainty: ${esc(p.uncertainty)}</li>
      ${p.challenges.map((c) => `<li>${esc(c)}</li>`).join('')}
    </ul>
    <h3>Skills to build</h3>
    <div class="pathquiz-tags">${p.skills.map((s) => `<span class="pathquiz-tag">${esc(s)}</span>`).join('')}</div>
    <div class="pg-first-moves">
      <h3>Your first move</h3>
      <p>${esc(p.plan[0])}</p>
    </div>
    <h3>A four-week starter plan</h3>
    <ol class="mp-list">${p.plan.map((w, i) => `<li><strong>Week ${i + 1}:</strong> ${esc(w)}</li>`).join('')}</ol>
    <h3>Compare your top three</h3>
    ${compareTable(ranked.slice(0, 3))}
    <h3>Also worth considering</h3>
    <ul class="mp-list">${others.map((r) => `<li><strong>${esc(r.pathway.title)}</strong> (fit ${r.parts.total}): ${esc(r.pathway.summary)} Growth potential: ${esc(r.pathway.growth)}</li>`).join('')}</ul>
    <p class="pg-disclaimer">This tool compares directions using your answers and fixed rules. It does not predict income or guarantee success, and it is not career or financial advice.</p>`;

  const reads = p.articles.map((id) => findItemById(id)).filter(Boolean)
    .map((item) => ({ href: articleHref(item.id), title: item.title, subtitle: item.readTime || 'Read this next', icon: '📖' }));
  renderKeepExploring(document.getElementById('keep-exploring'), reads);
}

function showResult() {
  quizRoot.hidden = true;
  resultRoot.hidden = false;
  resultRoot.innerHTML = `
    <div class="pathquiz-result">
      <div id="mp-out" aria-live="polite"></div>
      ${whatIfPanel()}
      <div class="pg-template-actions">
        <a class="btn btn-primary" href="/pages/client-simulator.html">Practise client situations →</a>
        <button class="btn btn-secondary" id="mp-retake" type="button">Retake the interest questions</button>
        <button class="btn btn-secondary" id="mp-reset" type="button">Start over</button>
      </div>
    </div>`;
  rewriteRootLinks(resultRoot);
  renderOut();
  focusLabel();

  document.getElementById('mp-whatif').addEventListener('change', (e) => {
    const t = e.target;
    if (t && t.name && CONSTRAINT_QUESTIONS.some((q) => q.id === t.name)) {
      answers[t.name] = t.value;
      save();
      renderOut();
    }
  });
  document.getElementById('mp-retake').addEventListener('click', () => { answers.interest = []; step = 0; renderQuestion(); focusLabel(); });
  document.getElementById('mp-reset').addEventListener('click', () => { answers = { interest: [] }; step = 0; renderQuestion(); focusLabel(); });
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

  const heroP = document.querySelector('.page-hero p');
  if (heroP) heroP.textContent = 'Not every direction suits every girl. Answer nine quick questions about your interests and your real constraints, and compare the options that fit.';

  const saved = load();
  if (saved) { answers = saved; showResult(); } else renderQuestion();
}

document.addEventListener('DOMContentLoaded', init);
