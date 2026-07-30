/* =============================================
   TOOLS.JS
   Real, working logic for each Free Tool — not just a
   calculator spitting out a number, but a short "Big Sis"
   breakdown with a score, what's working, what to watch for,
   and 2–3 real articles to read next. article.js calls
   renderTool(id, container) for any item of type 'tool'.
   ============================================= */

import { findItemById } from '../data/store.js';
import { BASE } from './base.js';

function currency(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function scoreBlock(label, score) {
  const tier = score >= 80 ? 'Strong' : score >= 55 ? 'Building' : 'Early days';
  return `
    <div class="tool-score">
      <div class="tool-score-ring" style="--pct:${Math.max(0, Math.min(100, score))}">
        <span>${score}<small>/100</small></span>
      </div>
      <div>
        <p class="tool-score-label">${label}</p>
        <p class="tool-score-tier">${tier}</p>
      </div>
    </div>`;
}

function listBlock(title, icon, items) {
  if (!items.length) return '';
  return `
    <div class="tool-list-block">
      <p class="tool-list-title">${icon} ${title}</p>
      <ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>
    </div>`;
}

function bigSis(text) {
  return `<div class="big-sis-box">💖 <strong>Big Sis Advice:</strong> ${text}</div>`;
}

function recommendations(ids) {
  const items = ids.map((id) => findItemById(id)).filter(Boolean);
  if (!items.length) return '';
  return `
    <div class="tool-recs">
      <p class="tool-list-title">📚 Your Recommended Reading</p>
      <div class="tool-recs-grid">
        ${items.map((item) => `
          <a class="tool-rec-card" href="${BASE}pages/article.html?id=${item.id}">
            <img src="${item.image}" alt="">
            <span>
              <strong>${item.title}</strong>
              <em>${item.readTime || 'Quick read'}</em>
            </span>
          </a>`).join('')}
      </div>
    </div>`;
}

const TOOLS = {
  'salary-negotiation-calculator'(container) {
    container.innerHTML = `
      <form class="tool-widget" id="tool-form">
        <label>Current offer ($/year)
          <input type="number" id="t-offer" min="0" step="1000" placeholder="60000" required>
        </label>
        <label>Market rate for this role ($/year)
          <input type="number" id="t-market" min="0" step="1000" placeholder="68000" required>
        </label>
        <label>Years of experience
          <input type="number" id="t-years" min="0" max="40" placeholder="4" required>
        </label>
        <label>Demand for this role right now
          <select id="t-demand">
            <option value="1.02">Low — few openings</option>
            <option value="1.08" selected>Steady — normal hiring</option>
            <option value="1.15">High — companies are competing for talent</option>
          </select>
        </label>
        <button class="btn btn-primary" type="submit">Calculate Counter-Offer</button>
      </form>
      <div class="tool-result" id="tool-result" hidden></div>
    `;
    container.querySelector('#tool-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const offer = Number(container.querySelector('#t-offer').value);
      const market = Number(container.querySelector('#t-market').value);
      const years = Number(container.querySelector('#t-years').value);
      const demandMult = Number(container.querySelector('#t-demand').value);

      const base = Math.max(offer, market);
      const low = Math.round(base * 1.05 * demandMult);
      const high = Math.round(base * 1.14 * demandMult);

      const belowMarket = market > offer ? Math.round(((market - offer) / offer) * 100) : 0;
      let confidence = 55 + Math.min(years, 10) * 3 + Math.round((demandMult - 1) * 150);
      confidence = Math.max(30, Math.min(97, confidence));

      const strengths = [];
      const watch = [];
      if (years >= 5) strengths.push(`${years} years of experience gives you real leverage to negotiate.`);
      if (demandMult >= 1.15) strengths.push('Demand for this role is high right now — that works in your favor.');
      if (belowMarket >= 8) watch.push(`Your current offer sits about ${belowMarket}% below market — worth addressing directly.`);
      if (years < 2) watch.push("With under 2 years' experience, anchor your ask in specific wins rather than years alone.");
      if (!strengths.length) strengths.push("You're walking in with real market data — that alone puts you ahead of most candidates.");
      if (!watch.length) watch.push('Have 2–3 concrete recent wins ready in case they ask "why should we pay more?"');

      const result = container.querySelector('#tool-result');
      result.hidden = false;
      result.innerHTML = `
        ${scoreBlock('Negotiation Confidence', confidence)}
        <p class="tool-result-label">Suggested counter-offer range</p>
        <p class="tool-result-figure">${currency(low)} – ${currency(high)}</p>
        ${listBlock("What's working for you", '✨', strengths)}
        ${listBlock('Watch out for this', '👀', watch)}
        ${bigSis('Anchor near the top of your range, say it out loud with confidence, then stop talking — let them respond first.')}
        ${recommendations(['linkedin-international-opportunity', 'first-2000-online', 'budget-like-a-queen'])}
      `;
    });
  },

  'freelance-rate-calculator'(container) {
    container.innerHTML = `
      <form class="tool-widget" id="tool-form">
        <label>Target annual income ($)
          <input type="number" id="t-income" min="0" step="1000" placeholder="60000" required>
        </label>
        <label>Billable hours per week
          <input type="number" id="t-hours" min="1" max="80" placeholder="25" required>
        </label>
        <label>Working weeks per year
          <input type="number" id="t-weeks" min="1" max="52" placeholder="46" required>
        </label>
        <label>Business costs &amp; taxes buffer
          <select id="t-buffer">
            <option value="0.2">20% — lean setup</option>
            <option value="0.3" selected>30% — typical freelancer</option>
            <option value="0.4">40% — higher taxes/overhead</option>
          </select>
        </label>
        <button class="btn btn-primary" type="submit">Calculate My Rate</button>
      </form>
      <div class="tool-result" id="tool-result" hidden></div>
    `;
    container.querySelector('#tool-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const income = Number(container.querySelector('#t-income').value);
      const hours = Number(container.querySelector('#t-hours').value);
      const weeks = Number(container.querySelector('#t-weeks').value);
      const buffer = Number(container.querySelector('#t-buffer').value);
      const totalHours = hours * weeks;
      const grossNeeded = income / (1 - buffer);
      const rate = totalHours > 0 ? grossNeeded / totalHours : 0;

      const strengths = [];
      const watch = [];
      if (hours <= 30) strengths.push('Keeping billable hours under 30/week leaves room for admin, marketing, and rest.');
      if (weeks <= 46) strengths.push("You're budgeting in real time off — that's sustainable, not burnout pricing.");
      if (rate < 25) watch.push('This rate is on the lower end — consider whether it truly covers your costs and skill level.');
      if (!watch.length) watch.push('Round this up to a clean number, and revisit it every 6 months as your skills grow.');
      if (!strengths.length) strengths.push("You're pricing with real numbers instead of guessing — that's already a win.");

      const result = container.querySelector('#tool-result');
      result.hidden = false;
      result.innerHTML = `
        <p class="tool-result-label">Your target hourly rate</p>
        <p class="tool-result-figure">${currency(rate)}/hr</p>
        <p class="tool-result-note">Daily rate (8hr): ${currency(rate * 8)} · Monthly retainer (4 days/week): ${currency(rate * 8 * 4 * 4.3)}</p>
        ${listBlock("What's working for you", '✨', strengths)}
        ${listBlock('Watch out for this', '👀', watch)}
        ${bigSis("Quote your rate once, clearly, then stay quiet. Don't apologize for the number — it's the number that lets you do this sustainably.")}
        ${recommendations(['virtual-assistant-pretty-paid-booked', 'first-2000-online', 'build-your-online-empire'])}
      `;
    });
  },

  'resume-review-checklist'(container) {
    const items = [
      'Contact info, LinkedIn, and portfolio link are current',
      'Summary states your role + biggest win in 2 lines',
      'Every bullet leads with an action verb',
      'At least one number (%, $, or time saved) per role',
      'Keywords from the job description appear naturally',
      'No typos — read it out loud once',
      'Consistent formatting (dates, fonts, spacing)',
      'Fits on one page (or two, for 10+ years experience)',
    ];
    container.innerHTML = `
      <div class="tool-widget checklist-widget">
        <ul class="checklist">
          ${items.map((label, i) => `
            <li>
              <label>
                <input type="checkbox" data-check="${i}">
                <span>${label}</span>
              </label>
            </li>`).join('')}
        </ul>
        <div class="checklist-progress">
          <div class="checklist-progress-bar" id="checklist-bar" style="width:0%"></div>
        </div>
      </div>
      <div class="tool-result" id="tool-result" hidden></div>
    `;
    const boxes = container.querySelectorAll('input[type="checkbox"]');
    const bar = container.querySelector('#checklist-bar');
    const result = container.querySelector('#tool-result');

    boxes.forEach((box) => {
      box.addEventListener('change', () => {
        const checked = container.querySelectorAll('input[type="checkbox"]:checked').length;
        const pct = Math.round((checked / boxes.length) * 100);
        bar.style.width = `${pct}%`;

        if (checked === 0) {
          result.hidden = true;
          return;
        }

        result.hidden = false;
        const missing = items.filter((_, i) => !boxes[i].checked);
        result.innerHTML = `
          ${scoreBlock('Recruiter-Friendliness', pct)}
          ${pct === 100
            ? bigSis("All 8 done — your resume is ready to send. Go get 'em. 🎉")
            : listBlock('Still worth fixing', '📝', missing.slice(0, 4))}
          ${recommendations(['linkedin-international-opportunity', 'virtual-assistant-pretty-paid-booked'])}
        `;
      });
    });
  },

  'ai-prompt-builder'(container) {
    container.innerHTML = `
      <form class="tool-widget" id="tool-form">
        <label>Category
          <select id="t-category">
            <option>Writing</option>
            <option>Marketing</option>
            <option>Career</option>
            <option>Business</option>
            <option>Content creation</option>
            <option>Personal finance</option>
            <option>Side hustles</option>
          </select>
        </label>
        <label>What do you want help with?
          <input type="text" id="t-goal" placeholder="e.g. a LinkedIn post about my career change" required>
        </label>
        <label>Tone
          <select id="t-tone">
            <option>Warm and conversational</option>
            <option>Confident and professional</option>
            <option>Playful and bold</option>
            <option>Calm and reassuring</option>
          </select>
        </label>
        <label>Audience
          <input type="text" id="t-audience" placeholder="e.g. women considering a career pivot" required>
        </label>
        <button class="btn btn-primary" type="submit">Build My Prompt</button>
      </form>
      <div class="tool-result" id="tool-result" hidden></div>
    `;
    container.querySelector('#tool-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const category = container.querySelector('#t-category').value;
      const goal = container.querySelector('#t-goal').value.trim();
      const tone = container.querySelector('#t-tone').value;
      const audience = container.querySelector('#t-audience').value.trim();

      const prompt = `Act as an experienced ${category.toLowerCase()} specialist. Write ${goal}. Use a ${tone.toLowerCase()} tone, written for ${audience}. Keep it concise, concrete, and free of clichés. End with one clear next step for the reader.`;
      const followUp = `Now rewrite that same piece to be 30% shorter, and suggest one alternative headline or opening line.`;

      const result = container.querySelector('#tool-result');
      result.hidden = false;
      result.innerHTML = `
        <p class="tool-result-label">Your ready-to-use prompt</p>
        <p class="tool-result-prompt" id="prompt-text">${prompt}</p>
        <button class="btn btn-secondary mt-md" type="button" id="copy-prompt">Copy Prompt</button>
        <p class="tool-result-label mt-lg">Good follow-up prompt</p>
        <p class="tool-result-prompt">${followUp}</p>
        ${bigSis('Paste the first prompt in, read the result out loud, then use the follow-up to tighten it. Two passes almost always beats one.')}
        ${recommendations(['build-your-online-empire', 'profitable-digital-product-business', 'instagram-pays-too-sis'])}
      `;
      result.querySelector('#copy-prompt').addEventListener('click', () => {
        navigator.clipboard?.writeText(prompt);
        result.querySelector('#copy-prompt').textContent = 'Copied ✓';
      });
    });
  },

  'business-idea-validator'(container) {
    const questions = [
      'I can name 5 real people who would pay for this today',
      'This solves a problem people already spend money to fix',
      'I could launch a basic version within 30 days',
      'I understand who my competitors are and how I differ',
      'I have a way to reach my first 10 customers directly',
    ];
    container.innerHTML = `
      <form class="tool-widget" id="tool-form">
        ${questions.map((q, i) => `
          <label class="tool-radio-group">
            ${q}
            <span class="tool-radio-row">
              <label><input type="radio" name="q${i}" value="1" required> Yes</label>
              <label><input type="radio" name="q${i}" value="0"> Not yet</label>
            </span>
          </label>`).join('')}
        <button class="btn btn-primary" type="submit">See My Score</button>
      </form>
      <div class="tool-result" id="tool-result" hidden></div>
    `;
    container.querySelector('#tool-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const answers = questions.map((_, i) => Number(data.get(`q${i}`)));
      const score = Math.round((answers.reduce((a, b) => a + b, 0) / questions.length) * 100);

      const strengths = questions.filter((_, i) => answers[i] === 1);
      const gaps = questions.filter((_, i) => answers[i] === 0);

      let verdict;
      if (score >= 80) verdict = "Strong signal — you're ready to build a first version and start selling.";
      else if (score >= 40) verdict = 'Promising, but validate the gaps below before investing heavily.';
      else verdict = 'Early days — talk to more potential customers before building anything.';

      const result = container.querySelector('#tool-result');
      result.hidden = false;
      result.innerHTML = `
        ${scoreBlock('Validation Score', score)}
        <p class="tool-result-note">${verdict}</p>
        ${listBlock("What you're already doing well", '✨', strengths)}
        ${listBlock('Your biggest opportunity', '🚀', gaps.slice(0, 2))}
        ${bigSis('Before spending a dollar building anything, get 5 real people to say "yes, I would pay for that" out loud.')}
        ${recommendations(['profitable-digital-product-business', 'build-your-online-empire', 'soft-girl-passive-income'])}
      `;
    });
  },

  'personal-budget-planner'(container) {
    container.innerHTML = `
      <form class="tool-widget" id="tool-form">
        <label>Monthly take-home income ($)
          <input type="number" id="t-income" min="0" step="50" placeholder="3200" required>
        </label>
        <label>Do you have an emergency fund?
          <select id="t-emergency">
            <option value="0">Not yet</option>
            <option value="1">Some, but less than 3 months of expenses</option>
            <option value="2">Yes, 3+ months covered</option>
          </select>
        </label>
        <button class="btn btn-primary" type="submit">Build My Plan</button>
      </form>
      <div class="tool-result" id="tool-result" hidden></div>
    `;
    container.querySelector('#tool-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const income = Number(container.querySelector('#t-income').value);
      const emergency = Number(container.querySelector('#t-emergency').value);
      const needs = income * 0.5;
      const goals = income * 0.3;
      const wants = income * 0.2;

      const health = 40 + emergency * 25 + (income > 0 ? 10 : 0);
      const strengths = [];
      const watch = [];
      if (emergency === 2) strengths.push("You've already got 3+ months covered — that's real financial stability.");
      if (emergency === 0) watch.push('No emergency fund yet — even $500 tucked away changes how safe unexpected costs feel.');
      strengths.push('Giving every dollar a job (needs, goals, guilt-free spending) is the whole game.');

      const result = container.querySelector('#tool-result');
      result.hidden = false;
      result.innerHTML = `
        ${scoreBlock('Budget Health', Math.min(95, health))}
        <div class="budget-rows">
          <div class="budget-row"><span>Needs (50%)</span><strong>${currency(needs)}</strong></div>
          <div class="budget-row"><span>Savings &amp; goals (30%)</span><strong>${currency(goals)}</strong></div>
          <div class="budget-row"><span>Guilt-free spending (20%)</span><strong>${currency(wants)}</strong></div>
        </div>
        ${listBlock("What's working for you", '✨', strengths)}
        ${listBlock('Watch out for this', '👀', watch)}
        ${bigSis('Adjust the percentages as your goals change — the point is that every dollar has a job before the month starts, not after.')}
        ${recommendations(['budget-like-a-queen', 'soft-girl-passive-income', 'first-2000-online'])}
      `;
    });
  },
};

export function renderTool(id, container) {
  const fn = TOOLS[id];
  if (!fn) return false;
  fn(container);
  return true;
          }
       
