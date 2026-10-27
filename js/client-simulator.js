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


/* ---------- Story content ---------- */
const SKILLS = {
  clarity: 'Clarity',
  boundaries: 'Scope and boundaries',
  negotiation: 'Negotiation',
  relationship: 'Client relationship',
  risk: 'Risk awareness',
  commercial: 'Commercial judgement',
};

const STORY = {
  id: 'brand-kit',
  title: 'The Brand Kit Project',
  intro: 'Maya runs a small candle shop and wants a brand kit. Five moments, one client. What you say early changes what she says later.',
  start: 'brief',
  nodes: {
    brief: {
      title: 'The first message',
      message: 'Hi! I run a small candle shop and need a brand kit: logo, colours, the works. My budget is around $300. Can you start this week?',
      next: 'quote',
      options: [
        { label: "Absolutely, I'll start this week!", effects: { relationship: 1, clarity: -2, risk: -1 }, flags: ['noscope'],
          feedback: "Warm and fast, but you agreed to start without knowing what \"the works\" means. That gap is where scope creep begins." },
        { label: 'Great! Before I quote, could I ask what is included, when you need it, and who signs off?', effects: { clarity: 2, risk: 1, relationship: 1 }, flags: ['scoped'], best: true,
          feedback: 'Questions at the start help the client too: they show you are thorough and turn "the works" into a list you can price.' },
        { label: 'My brand kits start at $900. Let me know if you want to go ahead.', effects: { commercial: 1, clarity: -1, relationship: -1 }, flags: ['coldquote'],
          feedback: 'Knowing your price is good, but quoting before you understand the job makes the client compare numbers instead of value.' },
      ],
      sample: 'Thanks for reaching out! To quote accurately, could you tell me which pieces you need (logo, colours, fonts, social templates?), your deadline, and who gives final approval?',
    },

    quote: {
      title: 'Agreeing the scope and price',
      next: 'terms',
      variants: [
        { when: 'scoped',
          message: "Logo, colour palette and two fonts would be perfect. Social media templates would be a bonus if there's room. I need it in two weeks, and $300 is my firm budget.",
          options: [
            { label: "Here's what $300 covers: logo, palette and two fonts, with two rounds of revisions. Social templates can be added for an extra fee.", effects: { clarity: 1, boundaries: 2, negotiation: 2, commercial: 1 }, flags: ['packageClear'], best: true,
              feedback: 'You turned a budget limit into a clear package and priced the bonus separately. Both of you now know what "done" means.' },
            { label: "Sure, I'll include the social templates too for $300.", effects: { boundaries: -2, commercial: -2, negotiation: -1 }, flags: ['overpromised'],
              feedback: 'Adding the bonus feels generous, but it quietly cuts your effective rate and teaches the client that extras are free.' },
            { label: 'I can do $200 for the same package.', effects: { negotiation: -2, commercial: -2, boundaries: -1 }, flags: ['discounted'],
              feedback: 'She had already offered $300. Lowering your own price unprompted gives away money nobody asked you to.' },
          ],
          sample: 'For $300 I can deliver your logo, a colour palette and two fonts, with two rounds of revisions, in two weeks. Social media templates would be an optional extra at $X.' },
        { when: 'noscope',
          message: "Wonderful! I'm picturing the logo, a website banner, social posts, business cards and packaging labels. All for the $300, right?",
          options: [
            { label: "That's a lot of pieces. Let's start with phase one: logo, colours and fonts for $300, and I'll quote the rest separately.", effects: { clarity: 2, boundaries: 2, negotiation: 1, commercial: 1 }, flags: ['packageClear'], best: true,
              feedback: 'You caught the gap before it grew. Splitting the work into phases protects your time and still gets her started.' },
            { label: 'Yes, all of it for $300!', effects: { boundaries: -3, commercial: -3 }, flags: ['overpromised'],
              feedback: "Five deliverables for the price of one is a classic way to end up resenting a client, and you've now said it in writing." },
            { label: "That's not possible. I'll pass.", effects: { relationship: -1, negotiation: -1, risk: 1 }, flags: ['declined'], next: 'debrief',
              feedback: 'Protecting your time is valid, but a flat no skipped the easy fix: re-scoping to what her budget covers. The project ends here.' },
          ],
          sample: "That's a great list! Within $300 I can do the logo, colours and fonts first. Banner, social posts, cards and labels can follow as separate quotes once phase one is approved." },
        { when: 'coldquote',
          message: "Oh. That's a lot more than I expected. My budget is $300.",
          options: [
            { label: "Fair point. Here is what's in my price, plus a smaller package that fits $300: logo, palette and fonts.", effects: { negotiation: 2, relationship: 1, clarity: 1, commercial: 1 }, flags: ['packageClear'], best: true,
              feedback: 'You kept your value, explained it, and offered a smaller scope instead of a smaller price. That is how you negotiate without undercutting yourself.' },
            { label: 'Okay, $300 for everything I quoted.', effects: { commercial: -2, negotiation: -2, boundaries: -1 }, flags: ['discounted', 'overpromised'],
              feedback: 'A 66% discount for the same work, given in one message. The scope stayed the same and your rate did not.' },
            { label: "That's my rate. Take it or leave it.", effects: { relationship: -2, boundaries: 1 }, flags: ['cold'],
              feedback: 'Holding a price can be right, but with no explanation it ends the conversation instead of testing whether a smaller scope would work.' },
          ],
          sample: 'I understand $300 is your limit. My full kit includes X, Y and Z. For $300 I can offer a focused package: logo, colour palette and fonts. Would that work?' },
      ],
    },

    terms: {
      title: 'Payment terms',
      message: "Sounds good. How do we handle payment? I've never hired a designer before.",
      next: 'creep',
      options: [
        { label: 'I take 50% upfront and the other 50% before I send final files. I will put the scope, revisions and dates in a short written agreement.', effects: { risk: 2, boundaries: 1, clarity: 1 }, flags: ['deposit'], best: true,
          feedback: 'A deposit proves commitment on both sides, and the written agreement is what you will point to if anything is disputed.' },
        { label: "Don't worry about it, pay me when you're happy.", effects: { risk: -3, commercial: -1, clarity: -1 }, flags: ['nodeposit'],
          feedback: 'It sounds relaxed, but you now work with no payment guarantee and no written terms. "Happy" is also impossible to define.' },
        { label: 'I need full payment upfront before I start.', effects: { risk: 1, relationship: -1 }, flags: ['fullupfront'],
          feedback: 'Protective, and sometimes right for small jobs. For a first-time client, a deposit plus a balance before final files feels fairer and protects you almost as well.' },
      ],
      sample: 'My process is a 50% deposit to start and the balance before I send final files. I will send a short agreement covering scope, revisions and dates for you to sign.',
    },

    creep: {
      title: 'Halfway through',
      message: 'I love the logo! Quick one: could you also design a packaging label? Should only take a minute.',
      variants: [
        { when: 'overpromised', message: "The logo's lovely! Can you also do the business cards and packaging labels now? You did say everything was included." },
      ],
      next: 'payment',
      options: [
        { label: 'Happy to help. Let me check that against our agreement and send you a separate quote for anything outside it.', effects: { boundaries: 2, negotiation: 1, relationship: 1, commercial: 1 }, flags: ['heldScope'], best: true,
          feedback: { overpromised: "Because you earlier promised more than the budget covered, this is harder. Acknowledge it honestly, reset to clear terms, and the relationship can survive it. This is the cost of that earlier yes.", default: 'You said yes to the idea and set the boundary in the same breath. She is more likely to see a quote as normal than as a refusal.' } },
        { label: "Sure, no problem, I'll squeeze it in.", effects: { boundaries: -2, commercial: -1, risk: -1 }, flags: ['creep'],
          feedback: 'One free favour is rarely just one. It shows her the boundary is flexible, and "a minute" usually is not.' },
        { label: "That's out of scope. No.", effects: { boundaries: 1, relationship: -2 }, flags: ['abrupt'],
          feedback: 'You are right that it is out of scope, but a flat no turns a sales opportunity into a conflict. A quote gets you the same boundary with a better relationship.' },
      ],
      sample: "I'd love to help with that. Packaging labels aren't part of the current package, so I'll send a quick quote for them as a separate item. Do you want me to go ahead?",
    },

    payment: {
      title: 'Final delivery and payment',
      next: 'debrief',
      variants: [
        { when: 'fullupfront',
          message: "These are lovely, thank you. I'll be honest: I nearly hired someone else because paying everything upfront made me nervous.",
          options: [
            { label: 'Thank her, send the final files, and ask if she would leave a short testimonial. Offer milestone payments next time.', effects: { relationship: 2, commercial: 1 }, flags: ['paidHappy'], best: true,
              feedback: 'You acknowledged her concern without apologising for your terms, and turned a finished job into a testimonial and a repeat-work offer.' },
            { label: 'Send the files and move on.', effects: { relationship: 0 }, flags: ['paidNeutral'],
              feedback: 'Perfectly professional. You missed the easy chance to ask for a testimonial and to reduce her nervousness for next time.' },
            { label: "Tell her you were right to ask for it upfront.", effects: { relationship: -2 }, flags: ['paidRude'],
              feedback: 'Even if true, being right is not the goal. It costs you the testimonial and the repeat client.' },
          ],
          sample: "Thank you, I'm so glad you love them! If you're happy, a short testimonial would mean a lot. For future projects I'm happy to split payments into milestones." },
      ],
      message: "Everything looks perfect, thank you! I'll send the rest of the payment sometime next week.",
      options: [
        { label: "Thank her, send the invoice with a due date, and release the final files once it's paid.", effects: { risk: 2, clarity: 1, relationship: 1 }, flags: ['paidProtected'], best: true,
          feedback: { nodeposit: 'This is still the right call, but notice how much weaker your position is without a deposit. The invoice is your only protection.', default: 'It follows exactly what you both agreed, and "sometime next week" becomes a date.' } },
        { label: 'Send all the files now and trust her to pay.', effects: { risk: -3, commercial: -1 }, flags: ['trustedUnpaid'],
          feedback: { nodeposit: 'With no deposit and no agreement, you have delivered everything and have no leverage. If she delays or disappears, there is little you can do.', default: 'You had a payment structure and gave up its protection at the last step. The balance is now a favour, not a condition.' } },
        { label: "Tell her that people who don't pay on time are unprofessional.", effects: { relationship: -2 }, flags: ['angry'],
          feedback: 'The frustration is understandable, but she has not actually refused. A calm invoice with a date does the job without burning the relationship.' },
      ],
      sample: "I'm so glad you love it! Here's the invoice for the balance, due [date]. As agreed, I'll send the final editable files as soon as it's paid.",
    },
  },
};

/* Plain-language consequences, shown in the debrief in this order. */
const CONSEQUENCES = [
  { flag: 'packageClear', text: 'You agreed a clear package, so you and Maya both knew what "done" meant.' },
  { flag: 'overpromised', text: 'You promised more than the budget covered, which put pressure on every later decision.' },
  { flag: 'discounted', text: 'You lowered your price without being asked, which reduced what you earned for the same work.' },
  { flag: 'noscope', text: 'You started without asking what was included, so the scope had to be repaired later.' },
  { flag: 'cold', text: 'A firm price with no explanation closed the conversation instead of opening a smaller option.' },
  { flag: 'declined', text: 'You walked away early. That protects your time but ended any chance of a smaller, workable project.' },
  { flag: 'deposit', text: 'A deposit and written terms meant you were never working for free.' },
  { flag: 'nodeposit', text: 'With no payment terms, you worked without any guarantee of being paid.' },
  { flag: 'fullupfront', text: 'Full payment upfront protected you, but made a first-time client nervous.' },
  { flag: 'heldScope', text: 'You turned an out-of-scope request into a quote, protecting your time and the relationship.' },
  { flag: 'creep', text: 'You did extra work for free, which teaches clients that the boundary is negotiable.' },
  { flag: 'abrupt', text: 'A flat refusal protected your scope but strained the relationship.' },
  { flag: 'paidProtected', text: 'You released the final files only after payment, as agreed.' },
  { flag: 'trustedUnpaid', text: 'You delivered everything before the balance was paid and gave up your leverage.' },
  { flag: 'paidHappy', text: 'You finished with a happy client, a testimonial request and the door open for repeat work.' },
  { flag: 'angry', text: 'An angry message risked a relationship over a payment that had not actually been refused.' },
];

/* Where to practise the weakest skill. */
const NEXT_FOR_SKILL = {
  clarity: { title: 'Client Discovery Questions template', href: '/pages/templates.html', note: 'Questions to ask before you quote.' },
  boundaries: { title: 'Scope of Work Checklist template', href: '/pages/templates.html', note: 'Write down what is and is not included.' },
  negotiation: { title: 'Game Room: Price This Project', href: '/pages/game-room.html?game=price-this', note: 'Practise weighing price against scope.' },
  relationship: { title: 'Game Room: Inbox Boss', href: '/pages/game-room.html?game=inbox-boss', note: 'Practise replying to tricky client messages.' },
  risk: { title: 'Payment Reminder Template', href: '/pages/templates.html', note: 'Polite, firm wording for late payments.' },
  commercial: { title: 'Game Room: Price This Project', href: '/pages/game-room.html?game=price-this', note: 'Practise protecting your rate.' },
};


/* ---------- Story engine and UI ---------- */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function newState() {
  return { nodeId: STORY.start, skills: Object.fromEntries(Object.keys(SKILLS).map((k) => [k, 0])), flags: [], history: [] };
}

/* The client's message and options for this node, given earlier flags. */
function resolveNode(nodeId, flags) {
  const node = STORY.nodes[nodeId];
  // A node with no default message falls back to its first variant, so no flag combination can leave it empty.
  const variant = (node.variants || []).find((v) => flags.includes(v.when)) || (node.message ? null : (node.variants || [])[0]);
  return {
    id: nodeId,
    title: node.title,
    message: (variant && variant.message) || node.message,
    options: (variant && variant.options) || node.options,
    sample: (variant && variant.sample) || node.sample,
    next: node.next,
  };
}

function pickFeedback(fb, flags) {
  if (typeof fb === 'string') return fb;
  const key = Object.keys(fb).find((k) => k !== 'default' && flags.includes(k));
  return fb[key] || fb.default;
}

/* Applies one choice; returns a NEW state plus the feedback to show. */
function choose(state, optionIndex) {
  const node = resolveNode(state.nodeId, state.flags);
  const option = node.options[optionIndex];
  if (!option) return null;
  const skills = { ...state.skills };
  Object.entries(option.effects || {}).forEach(([k, v]) => { skills[k] += v; });
  const flags = [...new Set([...state.flags, ...(option.flags || [])])];
  const feedback = pickFeedback(option.feedback, flags);
  const best = node.options.find((o) => o.best);
  const next = option.next || node.next;
  return {
    state: { nodeId: next, skills, flags, history: [...state.history, { nodeId: node.id, title: node.title, chosen: option.label, wasBest: !!option.best, bestLabel: best && best.label, sample: node.sample, feedback }] },
    feedback,
    wasBest: !!option.best,
    // Verdict wording follows the real cost of the choice, so a damaging choice is never called "reasonable".
    verdict: option.best ? 'Strong choice.' : Object.values(option.effects || {}).reduce((a, b) => a + b, 0) <= -3 ? 'This one has a real cost.' : 'Reasonable, with trade-offs.',
    sample: node.sample,
  };
}

const rating = (n) => (n >= 2 ? 'Strong' : n >= 0 ? 'Developing' : 'Needs practice');

function summarise(state) {
  const entries = Object.entries(state.skills);
  const ordered = [...entries].sort((a, b) => a[1] - b[1]);
  const weakest = ordered[0][0];
  const strongest = ordered[ordered.length - 1][0];
  return {
    skills: entries.map(([k, v]) => ({ key: k, name: SKILLS[k], value: v, rating: rating(v) })),
    consequences: CONSEQUENCES.filter((c) => state.flags.includes(c.flag)).map((c) => c.text),
    weakest, strongest,
    next: NEXT_FOR_SKILL[weakest],
    bestCount: state.history.filter((h) => h.wasBest).length,
    total: state.history.length,
  };
}

/* ---------- UI ---------- */
function startStory(root, { onExit, onComplete }) {
  let state = newState();

  function renderNode() {
    if (state.nodeId === 'debrief') { renderDebrief(); return; }
    const node = resolveNode(state.nodeId, state.flags);
    const stepNo = state.history.length + 1;
    root.innerHTML = `
      <p class="pg-round-counter">${esc(STORY.title)}: moment ${stepNo}</p>
      <div class="scenario-card">
        <p class="quiz-label" data-focus>💬 ${esc(node.title)}</p>
        <p class="scenario-situation">“${esc(node.message)}”</p>
        <p style="font-weight:700;margin-bottom:0.75rem;">What do you do?</p>
        <div class="scenario-options" role="group" aria-label="Your options">
          ${node.options.map((o, i) => `<button class="scenario-option" data-index="${i}" type="button">${esc(o.label)}</button>`).join('')}
        </div>
        <div id="story-after" aria-live="polite"></div>
      </div>`;
    root.querySelectorAll('.scenario-option').forEach((btn) => btn.addEventListener('click', () => onPick(btn, node)));
    focusLabel();
  }

  function onPick(btn, node) {
    if (root.querySelector('.scenario-option[disabled]')) return;
    const result = choose(state, Number(btn.dataset.index));
    if (!result) return;
    root.querySelectorAll('.scenario-option').forEach((b) => { b.disabled = true; });
    btn.classList.add('selected');
    state = result.state;
    const stronger = result.wasBest ? '' : `<p class="story-sample"><strong>A stronger reply might read:</strong> ${esc(result.sample)}</p>`;
    const verdict = result.verdict;
    document.getElementById('story-after').innerHTML = `
      <div class="scenario-feedback"><strong>${verdict}</strong> ${esc(result.feedback)}</div>
      ${stronger}
      <div class="pg-game-nav"><button class="btn btn-primary" id="story-next" type="button">${state.nodeId === 'debrief' ? 'See my debrief →' : 'Continue →'}</button></div>`;
    document.getElementById('story-next').addEventListener('click', renderNode);
    document.getElementById('story-next').focus();
  }

  function renderDebrief() {
    const s = summarise(state);
    onComplete?.();
    root.innerHTML = `
      <div class="pg-completion-card story-debrief">
        <h3 data-focus>Debrief: ${esc(STORY.title)}</h3>
        <p>You chose the strongest option in ${s.bestCount} of ${s.total} moments. That is practice, not a certification, and different choices lead to different outcomes.</p>
        <h4>What happened because of your choices</h4>
        <ul class="mp-list">${s.consequences.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
        <h4>Your skills in this story</h4>
        <table class="mp-table story-skills"><thead><tr><th scope="col">Skill</th><th scope="col">Result</th></tr></thead>
          <tbody>${s.skills.map((k) => `<tr><th scope="row">${esc(k.name)}</th><td>${k.rating}</td></tr>`).join('')}</tbody></table>
        <h4>Your decisions</h4>
        <ol class="mp-list">${state.history.map((h) => `<li><strong>${esc(h.title)}:</strong> ${esc(h.chosen)}${h.wasBest ? ' (strongest option)' : `<br><em>Strongest option was:</em> ${esc(h.bestLabel)}`}</li>`).join('')}</ol>
        <div class="pg-first-moves"><h3>Best next step</h3>
          <p>Your most room to grow here is <strong>${esc(SKILLS[s.weakest])}</strong>. Try <a href="${s.next.href}">${esc(s.next.title)}</a>: ${esc(s.next.note)}</p></div>
        <div class="pg-template-actions" style="justify-content:center;">
          <button class="btn btn-primary" id="story-replay" type="button">Replay with different choices</button>
          <button class="btn btn-secondary" id="story-exit" type="button">Back to the simulator</button>
        </div>
      </div>`;
    document.getElementById('story-replay').addEventListener('click', () => { state = newState(); renderNode(); });
    document.getElementById('story-exit').addEventListener('click', () => onExit?.());
    focusLabel();
  }

  function focusLabel() {
    const el = root.querySelector('[data-focus]');
    if (el) { el.setAttribute('tabindex', '-1'); el.focus(); }
  }

  root.innerHTML = `
    <div class="pathquiz-card">
      <p class="quiz-label" data-focus>${esc(STORY.title)}</p>
      <p>${esc(STORY.intro)}</p>
      <div class="pg-template-actions">
        <button class="btn btn-primary" id="story-begin" type="button">Begin the story</button>
        <button class="btn btn-secondary" id="story-back" type="button">Back</button>
      </div>
    </div>`;
  document.getElementById('story-begin').addEventListener('click', renderNode);
  document.getElementById('story-back').addEventListener('click', () => onExit?.());
}

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

/* ---- mode chooser: branching story, or the seven quick drills ---- */
function renderModes() {
  meterRoot.hidden = true;
  stageRoot.innerHTML = `
    <div class="pathquiz-card">
      <p class="quiz-label" data-focus>Choose how to practise</p>
      <div class="pathquiz-options">
        <button class="pathquiz-option" id="mode-story" type="button"><span class="pathquiz-icon" aria-hidden="true">✦</span><span><strong>Story: The Brand Kit Project</strong><br><small>One client, five moments. Your choices change what happens next, with a debrief at the end (about 8 minutes).</small></span></button>
        <button class="pathquiz-option" id="mode-drills" type="button"><span class="pathquiz-icon" aria-hidden="true">✦</span><span><strong>Quick drills</strong><br><small>Seven single situations: low budget, scope creep, unpaid tests and more.</small></span></button>
      </div>
    </div>`;
  document.getElementById('mode-story').addEventListener('click', () => {
    startStory(stageRoot, {
      onExit: renderModes,
      onComplete: () => {
        if (!pgHasDone('client-sim-story-done')) {
          pgMarkDone('client-sim-story-done');
          pgGrantXP(30);
          gaEvent('simulator_story_completed');
        }
        if (!pgHasDone('client-sim-done')) { pgMarkDone('client-sim-done'); pgCheckQueenBadge(); }
      },
    });
  });
  document.getElementById('mode-drills').addEventListener('click', () => {
    index = 0;
    tiersEarned.length = 0;
    meterRoot.hidden = false;
    renderMeter();
    renderScenario();
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
  gaEvent('simulator_started');
  renderModes();
}

document.addEventListener('DOMContentLoaded', init);
