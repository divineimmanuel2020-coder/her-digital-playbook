/* =============================================
   TOOLS.JS
   Real, working logic for each Free Tool. article.js calls
   renderTool(id, container) for any item of type 'tool' —
   if an id below has a match, it renders a live interactive
   widget; otherwise article.js falls back to the plain
   description text.
   ============================================= */

function currency(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
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
        <button class="btn btn-primary" type="submit">Calculate Counter-Offer</button>
      </form>
      <div class="tool-result" id="tool-result" hidden></div>
    `;
    container.querySelector('#tool-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const offer = Number(container.querySelector('#t-offer').value);
      const market = Number(container.querySelector('#t-market').value);
      const low = Math.round(Math.max(offer, market) * 1.05);
      const high = Math.round(Math.max(offer, market) * 1.12);
      const result = container.querySelector('#tool-result');
      result.hidden = false;
      result.innerHTML = `
        <p class="tool-result-label">Suggested counter-offer range</p>
        <p class="tool-result-figure">${currency(low)} – ${currency(high)}</p>
        <p class="tool-result-note">Anchor near the top of this range, and be ready to explain your value using specific wins from your last 12 months.</p>
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
        <button class="btn btn-primary" type="submit">Calculate My Rate</button>
      </form>
      <div class="tool-result" id="tool-result" hidden></div>
    `;
    container.querySelector('#tool-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const income = Number(container.querySelector('#t-income').value);
      const hours = Number(container.querySelector('#t-hours').value);
      const weeks = Number(container.querySelector('#t-weeks').value);
      const totalHours = hours * weeks;
      const rate = totalHours > 0 ? income / totalHours : 0;
      const result = container.querySelector('#tool-result');
      result.hidden = false;
      result.innerHTML = `
        <p class="tool-result-label">Your target hourly rate</p>
        <p class="tool-result-figure">${currency(rate)}/hr</p>
        <p class="tool-result-note">That's based on ${totalHours.toLocaleString()} billable hours a year. Round up to a clean number and add 10–15% buffer for admin time and slow months.</p>
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
        <p class="tool-result-note" id="checklist-note">0 of ${items.length} checked</p>
      </div>
    `;
    const boxes = container.querySelectorAll('input[type="checkbox"]');
    const bar = container.querySelector('#checklist-bar');
    const note = container.querySelector('#checklist-note');
    boxes.forEach((box) => {
      box.addEventListener('change', () => {
        const checked = container.querySelectorAll('input[type="checkbox"]:checked').length;
        bar.style.width = `${(checked / boxes.length) * 100}%`;
        note.textContent = checked === boxes.length
          ? `All ${boxes.length} done — your resume is ready to send! 🎉`
          : `${checked} of ${boxes.length} checked`;
      });
    });
  },

  'ai-prompt-builder'(container) {
    container.innerHTML = `
      <form class="tool-widget" id="tool-form">
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
      const goal = container.querySelector('#t-goal').value.trim();
      const tone = container.querySelector('#t-tone').value;
      const audience = container.querySelector('#t-audience').value.trim();
      const prompt = `Write ${goal}. Use a ${tone.toLowerCase()} tone, written for ${audience}. Keep it concise, concrete, and free of clichés. End with one clear next step for the reader.`;
      const result = container.querySelector('#tool-result');
      result.hidden = false;
      result.innerHTML = `
        <p class="tool-result-label">Your ready-to-use prompt</p>
        <p class="tool-result-prompt" id="prompt-text">${prompt}</p>
        <button class="btn btn-secondary mt-md" type="button" id="copy-prompt">Copy Prompt</button>
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
      let score = 0;
      questions.forEach((_, i) => { score += Number(data.get(`q${i}`)); });
      const pct = Math.round((score / questions.length) * 100);
      let verdict;
      if (pct >= 80) verdict = "Strong signal — you're ready to build a first version and start selling.";
      else if (pct >= 40) verdict = "Promising, but validate the weak spots above before investing heavily.";
      else verdict = 'Early days — talk to more potential customers before building anything.';
      const result = container.querySelector('#tool-result');
      result.hidden = false;
      result.innerHTML = `
        <p class="tool-result-label">Validation score</p>
        <p class="tool-result-figure">${pct}%</p>
        <p class="tool-result-note">${verdict}</p>
      `;
    });
  },

  'personal-budget-planner'(container) {
    container.innerHTML = `
      <form class="tool-widget" id="tool-form">
        <label>Monthly take-home income ($)
          <input type="number" id="t-income" min="0" step="50" placeholder="3200" required>
        </label>
        <button class="btn btn-primary" type="submit">Build My Plan</button>
      </form>
      <div class="tool-result" id="tool-result" hidden></div>
    `;
    container.querySelector('#tool-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const income = Number(container.querySelector('#t-income').value);
      const needs = income * 0.5;
      const goals = income * 0.3;
      const wants = income * 0.2;
      const result = container.querySelector('#tool-result');
      result.hidden = false;
      result.innerHTML = `
        <p class="tool-result-label">Your suggested split</p>
        <div class="budget-rows">
          <div class="budget-row"><span>Needs (50%)</span><strong>${currency(needs)}</strong></div>
          <div class="budget-row"><span>Savings &amp; goals (30%)</span><strong>${currency(goals)}</strong></div>
          <div class="budget-row"><span>Guilt-free spending (20%)</span><strong>${currency(wants)}</strong></div>
        </div>
        <p class="tool-result-note">Adjust the percentages as your goals change — the point is that every dollar has a job.</p>
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
