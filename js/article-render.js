/* =============================================
   ARTICLE-RENDER.JS
   Turns one entry from data/store.js into the finished HTML
   for its own static page (/blog/<id>.html or /tools/<id>.html).

   This runs at BUILD time, in Node — `node scripts/build.mjs`.
   The browser never runs it. That is the whole point: the full
   article text and headings are written into the page file
   itself, so a crawler that never executes JavaScript still
   sees every word.

   Content markup handled by formatArticleBody():
     "## Heading"                -> chapter subhead (TOC + anchor + mark-read)
     "- item"                    -> bullet list
     "- [ ] item"                -> interactive checklist
     "> quote"                   -> pull quote
     "### Q: question\nanswer"   -> FAQ accordion item
     "%%QUIZ / %%CHECKIN / ..."  -> interactive cards (wired up by js/article.js)
     "**bold**"                  -> <strong>
     emoji-prefixed line          -> Big Sis callout
     anything else                -> plain paragraph

   No DOM access in this file, so it is safe to import from Node.
   ============================================= */

import { BADGES } from './gamify.js';
import { itemPath, itemPathById } from './routes.js';

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Same Cloudinary optimisation js/images.js applies at runtime — done here
// so the raw HTML already points at the right-sized file.
export function optimizeCloudinaryUrl(url, width) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  if (url.includes('/upload/w_')) return url;
  return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto,dpr_auto/`);
}

const CALLOUTS = {
  '💖': { cls: 'callout-bigsis', label: 'Big Sis Note' },
  '👀': { cls: 'callout-reality', label: 'Reality Check' },
  '✨': { cls: 'callout-hidden', label: 'Tiny Win' },
  '🚀': { cls: 'callout-challenge', label: 'Next Challenge' },
  '🌸': { cls: 'callout-pause', label: 'Pause For A Second' },
  '☕': { cls: 'callout-coffee', label: 'Coffee Break' },
  '💅': { cls: 'callout-hotgirl', label: 'Hot Girl Reminder' },
  '🎉': { cls: 'callout-celebrate', label: 'Celebrate Yourself' },
  '🚨': { cls: 'callout-mistake', label: 'Common Mistake' },
  '🧠': { cls: 'callout-didyouknow', label: 'Did You Know?' },
  '💡': { cls: 'callout-protip', label: 'Pro Tip' },
};

export function applyBold(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

export function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function formatArticleBody(content, articleId) {
  const blocks = content.split('\n\n');
  const chapters = [];
  let chapterIndex = 0;
  let checklistIndex = 0;
  let quizIndex = 0;
  let checkinIndex = 0;
  let builderIndex = 0;
  let bossIndex = 0;
  let passportIndex = 0;
  let stagesIndex = 0;
  let scenarioIndex = 0;
  let challengeIndex = 0;
  let mythIndex = 0;
  let goalsimIndex = 0;

  const html = blocks
    .map((block) => {
      const trimmed = block.trim();

      if (trimmed.startsWith('## ')) {
        const title = applyBold(trimmed.slice(3));
        const plainTitle = trimmed.slice(3).replace(/\*\*/g, '');
        const id = `chapter-${slugify(plainTitle)}-${chapterIndex}`;
        chapters.push({ id, title: plainTitle });
        const chapterNum = ++chapterIndex;
        return `
          <div class="chapter-head" id="${id}">
            <h2 class="article-h2"><span class="chapter-num">${chapterNum}</span>${title}</h2>
            <button class="chapter-complete-btn" data-chapter="${articleId}-${chapterIndex - 1}" type="button">
              <span class="check-icon">✓</span> Mark chapter complete
            </button>
          </div>`;
      }

      if (trimmed.startsWith('%%CHECKIN')) {
        const lines = trimmed.split('\n').slice(1);
        let title = 'Girl, What Are We Working On Today?';
        let question = '';
        const options = [];
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('TITLE:')) title = l.slice(6).trim();
          else if (l.startsWith('QUESTION:')) question = l.slice(9).trim();
          else if (l.startsWith('OPTION:')) {
            const [label, feedback] = l.slice(7).split('|').map((s) => s.trim());
            options.push({ label, feedback });
          }
        });
        const id = `${articleId}-checkin-${checkinIndex++}`;
        return `
          <div class="checkin-card" data-checkin-id="${id}">
            <p class="quiz-label">💗 ${title}</p>
            <p class="checkin-question">${applyBold(question)}</p>
            <div class="checkin-options">
              ${options.map((o, i) => `<button class="checkin-option" data-index="${i}" type="button">${applyBold(o.label)}</button>`).join('')}
            </div>
            <p class="checkin-feedback" hidden></p>
          </div>
          <script type="application/json" class="checkin-data">${JSON.stringify(options)}</script>`;
      }

      if (trimmed.startsWith('%%MAP')) {
        const lines = trimmed.split('\n').slice(1);
        let title = 'Your Money Mission';
        let cta = '';
        const items = [];
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('TITLE:')) title = l.slice(6).trim();
          else if (l.startsWith('CTA:')) cta = l.slice(4).trim();
          else if (l.startsWith('ITEM:')) items.push(l.slice(5).trim());
        });
        return `
          <div class="money-map-card">
            <p class="quiz-label">💎 ${title}</p>
            <ul class="money-map-list">
              ${items.map((i) => `<li><span class="map-check">✓</span>${applyBold(i)}</li>`).join('')}
            </ul>
            ${cta ? `<button class="btn btn-primary hero-lets-go" type="button">${cta} →</button>` : ''}
          </div>`;
      }

      if (trimmed.startsWith('%%BUILDER') || trimmed.startsWith('%%FINALBOSS')) {
        const isBoss = trimmed.startsWith('%%FINALBOSS');
        const lines = trimmed.split('\n').slice(1);
        let boxId = '';
        let title = isBoss ? 'Your Final Money Mission' : 'Build Your Money Idea';
        let skills = [];
        let badgeId = '';
        let xp = isBoss ? 250 : 25;
        let nextId = '';
        const fields = [];
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('ID:')) boxId = l.slice(3).trim();
          else if (l.startsWith('TITLE:')) title = l.slice(6).trim();
          else if (l.startsWith('SKILLS:')) skills = l.slice(7).split(',').map((s) => s.trim()).filter(Boolean);
          else if (l.startsWith('BADGE:')) badgeId = l.slice(6).trim();
          else if (l.startsWith('XP:')) xp = Number(l.slice(3).trim()) || xp;
          else if (l.startsWith('NEXT:')) nextId = l.slice(5).trim();
          else if (l.startsWith('FIELD:')) {
            const [label, placeholder] = l.slice(6).split('|').map((s) => s.trim());
            fields.push({ label, placeholder: placeholder || '' });
          }
        });
        const idx = isBoss ? bossIndex++ : builderIndex++;
        const uid = `${articleId}-${isBoss ? 'boss' : 'builder'}-${boxId || idx}`;
        const fieldsHtml = fields
          .map((f, i) => `
            <label class="builder-field">
              <span>${applyBold(f.label)}</span>
              <textarea data-field-index="${i}" data-field-label="${f.label.replace(/"/g, '&quot;')}" placeholder="${(f.placeholder || '').replace(/"/g, '&quot;')}" rows="2"></textarea>
            </label>`)
          .join('');

        if (isBoss) {
          return `
            <div class="final-boss-card" data-boss-id="${uid}">
              <p class="quiz-label">👑 FINAL MONEY MISSION</p>
              <p class="final-boss-title">${applyBold(title)}</p>
              <div class="builder-fields">${fieldsHtml}</div>
              <button class="btn btn-primary final-boss-submit" type="button">Submit My Money Plan</button>
              <div class="final-boss-complete" hidden>
                <p class="completion-title">🎀 You Did It, Girl!</p>
                <p class="completion-sub">MONEY MISSION COMPLETE 💎</p>
                <p class="completion-xp">+${xp} XP EARNED</p>
                ${skills.length ? `<p class="completion-skills-title">SKILLS UNLOCKED</p><div class="completion-skills">${skills.map((s) => `<span class="skill-chip">${s}</span>`).join('')}</div>` : ''}
                <p class="completion-next-title">YOUR NEXT MONEY MOVE</p>
                <p class="completion-next-text"></p>
                <div class="completion-actions">
                  ${nextId ? `<a class="btn btn-primary" href="${itemPathById(nextId)}">Start My Next Mission →</a>` : ''}
                </div>
              </div>
            </div>
            <script type="application/json" class="final-boss-data">${JSON.stringify({ skills, badgeId, xp, nextId })}</script>`;
        }

        return `
          <div class="builder-card" data-builder-id="${uid}">
            <p class="quiz-label">🎀 ${applyBold(title)}</p>
            <div class="builder-fields">${fieldsHtml}</div>
            <div class="builder-summary">
              <p class="builder-summary-title">✨ Your Money Idea</p>
              <ul class="builder-summary-list"></ul>
            </div>
          </div>`;
      }

      if (trimmed.startsWith('%%PATHQUIZ')) {
        const lines = trimmed.split('\n').slice(1);
        let title = 'Choose Your Path';
        let subtitle = '';
        const options = [];
        const results = {};
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('TITLE:')) title = l.slice(6).trim();
          else if (l.startsWith('SUBTITLE:')) subtitle = l.slice(9).trim();
          else if (l.startsWith('OPTION:')) {
            const [label, icon] = l.slice(7).split('|').map((s) => s.trim());
            options.push({ label, icon });
          } else if (l.startsWith('RESULT:')) {
            const [label, icon, headline, desc, tags] = l.slice(7).split('|').map((s) => s.trim());
            results[label] = { icon, headline, desc, tags: tags ? tags.split(',').map((t) => t.trim()) : [] };
          }
        });
        const pathId = `path-${slugify(title)}-${articleId}`;
        return `
          <div class="pathquiz-grid" data-pathquiz-id="${pathId}">
            <div class="pathquiz-card">
              <p class="quiz-label">🌟 ${title}</p>
              <p class="pathquiz-sub">${subtitle}</p>
              <div class="pathquiz-options">
                ${options.map((o) => `<button class="pathquiz-option" data-label="${o.label}" type="button"><span class="pathquiz-icon">${o.icon}</span>${o.label}</button>`).join('')}
              </div>
            </div>
            <div class="pathquiz-result" hidden>
              <p class="quiz-label">🎉 Niche Match Result</p>
              <p class="pathquiz-result-sub">Based on your answer...</p>
              <div class="pathquiz-result-body">
                <span class="pathquiz-result-icon"></span>
                <p class="pathquiz-result-headline"></p>
                <p class="pathquiz-result-desc"></p>
                <div class="pathquiz-tags"></div>
              </div>
            </div>
          </div>
          <script type="application/json" class="pathquiz-data">${JSON.stringify(results)}</script>`;
      }

      if (trimmed.startsWith('%%QUIZ')) {
        const lines = trimmed.split('\n').slice(1);
        let question = '';
        let why = '';
        const options = [];
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('Q:')) question = l.slice(2).trim();
          else if (l.startsWith('WHY:')) why = l.slice(4).trim();
          else if (/^[A-Z]:/.test(l)) {
            const correct = /\*\s*$/.test(l);
            const text = l.slice(2).replace(/\*\s*$/, '').trim();
            options.push({ text, correct });
          }
        });
        const qId = `${articleId}-quiz-${quizIndex++}`;
        return `
          <div class="quiz-card" data-quiz-id="${qId}">
            <p class="quiz-label">🎮 Mini Scenario</p>
            <p class="quiz-question">${applyBold(question)}</p>
            <p class="quiz-reassure">Choose wisely, Queen! There's no wrong answer here — just learning. 💕</p>
            <div class="quiz-options">
              ${options.map((o, i) => `<button class="quiz-option" data-correct="${o.correct}" data-letter="${String.fromCharCode(65 + i)}" type="button"><span class="quiz-letter">${String.fromCharCode(65 + i)}</span>${applyBold(o.text)}</button>`).join('')}
            </div>
            <p class="quiz-why" hidden>${applyBold(why)}</p>
          </div>`;
      }

      if (trimmed.startsWith('%%PASSPORT')) {
        const lines = trimmed.split('\n').slice(1);
        let title = 'Your Digital Skills Passport';
        let badgeId = '';
        let xpEach = 5;
        const items = [];
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('TITLE:')) title = l.slice(6).trim();
          else if (l.startsWith('BADGE:')) badgeId = l.slice(6).trim();
          else if (l.startsWith('XP:')) xpEach = Number(l.slice(3).trim()) || xpEach;
          else if (l.startsWith('ITEM:')) items.push(l.slice(5).trim());
        });
        const pid = `${articleId}-passport-${passportIndex++}`;
        return `
          <div class="passport-card" data-passport-id="${pid}" data-passport-total="${items.length}" data-passport-xp="${xpEach}" data-passport-badge="${badgeId}">
            <p class="quiz-label">🎒 ${applyBold(title)}</p>
            <div class="passport-progress-track"><div class="passport-progress-fill"></div></div>
            <p class="passport-count"><span class="passport-count-num">0</span>/${items.length} skills unlocked</p>
            <ul class="passport-grid">
              ${items.map((label, i) => `<li><label><input type="checkbox" data-passport-item="${pid}-${i}"><span>${applyBold(label)}</span></label></li>`).join('')}
            </ul>
            <div class="passport-complete" hidden><p>🎉 Passport Complete! You've unlocked every skill on this list, girl.</p></div>
          </div>`;
      }

      if (trimmed.startsWith('%%STAGES')) {
        const lines = trimmed.split('\n').slice(1);
        let title = 'Build Your Idea';
        let badgeId = '';
        let xpEach = 15;
        let completeMsg = '🛠️ Built! Every stage is complete.';
        const stages = [];
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('TITLE:')) title = l.slice(6).trim();
          else if (l.startsWith('BADGE:')) badgeId = l.slice(6).trim();
          else if (l.startsWith('XP:')) xpEach = Number(l.slice(3).trim()) || xpEach;
          else if (l.startsWith('COMPLETE:')) completeMsg = l.slice(9).trim();
          else if (l.startsWith('STAGE:')) stages.push(l.slice(6).trim());
        });
        const sid = `${articleId}-stages-${stagesIndex++}`;
        return `
          <div class="stages-card" data-stages-id="${sid}" data-stages-total="${stages.length}" data-stages-xp="${xpEach}" data-stages-badge="${badgeId}">
            <p class="quiz-label">🎀 ${applyBold(title)}</p>
            <div class="stages-track">
              ${stages.map((label, i) => `<button class="stage-pill" data-stage-key="${sid}-${i}" type="button"><span class="stage-num">${i + 1}</span>${applyBold(label)}</button>`).join('')}
            </div>
            <div class="stages-progress-track"><div class="stages-progress-fill"></div></div>
            <p class="stages-count"><span class="stages-count-num">0</span>/${stages.length} stages complete</p>
            <div class="stages-complete" hidden><p>${completeMsg}</p></div>
          </div>`;
      }

      if (trimmed.startsWith('%%SCENARIO')) {
        const lines = trimmed.split('\n').slice(1);
        let situation = '';
        const options = [];
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('SITUATION:')) situation = l.slice(10).trim();
          else if (l.startsWith('OPTION:')) {
            const [label, icon, feedback] = l.slice(7).split('|').map((s) => s.trim());
            options.push({ label, icon: icon || '💬', feedback: feedback || '' });
          }
        });
        const scId = `${articleId}-scenario-${scenarioIndex++}`;
        return `
          <div class="scenario-card" data-scenario-id="${scId}">
            <p class="quiz-label">🎮 The Client Simulator</p>
            <p class="scenario-situation">${applyBold(situation)}</p>
            <div class="scenario-options">
              ${options.map((o, i) => `<button class="scenario-option" data-index="${i}" type="button"><span class="scenario-icon">${o.icon}</span>${applyBold(o.label)}</button>`).join('')}
            </div>
            <p class="scenario-feedback" hidden></p>
          </div>
          <script type="application/json" class="scenario-data">${JSON.stringify(options)}</script>`;
      }

      if (trimmed.startsWith('%%CHALLENGE')) {
        const lines = trimmed.split('\n').slice(1);
        let title = '30-Day Challenge';
        let badgeId = '';
        const weeks = [];
        let currentWeek = null;
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('TITLE:')) title = l.slice(6).trim();
          else if (l.startsWith('BADGE:')) badgeId = l.slice(6).trim();
          else if (l.startsWith('WEEK:')) {
            currentWeek = { label: l.slice(5).trim(), days: [] };
            weeks.push(currentWeek);
          } else if (l.startsWith('DAY:')) {
            const [label, mission, xp] = l.slice(4).split('|').map((s) => s.trim());
            if (!currentWeek) { currentWeek = { label: '', days: [] }; weeks.push(currentWeek); }
            currentWeek.days.push({ label, mission, xp: Number(xp) || 15 });
          }
        });
        const allDays = weeks.flatMap((w) => w.days);
        const cid = `${articleId}-challenge-${challengeIndex++}`;
        let dayCounter = 0;
        return `
          <div class="challenge-card" data-challenge-id="${cid}" data-challenge-total="${allDays.length}" data-challenge-badge="${badgeId}">
            <p class="quiz-label">🎀 ${applyBold(title)}</p>
            <div class="challenge-progress-track"><div class="challenge-progress-fill"></div></div>
            <p class="challenge-count"><span class="challenge-count-num">0</span>/${allDays.length} days complete · <span class="challenge-xp-num">0</span> Challenge XP</p>
            <div class="challenge-weeks">
              ${weeks.map((w) => `
                <div class="challenge-week">
                  ${w.label ? `<p class="challenge-week-title">${applyBold(w.label)}</p>` : ''}
                  <ul class="challenge-days">
                    ${w.days.map((d) => {
                      const dayKey = `${cid}-${dayCounter++}`;
                      return `
                        <li class="challenge-day" data-day-xp="${d.xp}">
                          <label><input type="checkbox" data-challenge-day="${dayKey}"><span class="challenge-day-title">${applyBold(d.label)}</span></label>
                          <p class="challenge-day-mission">${applyBold(d.mission || '')}</p>
                          <span class="challenge-day-xp">+${d.xp} XP</span>
                        </li>`;
                    }).join('')}
                  </ul>
                </div>`).join('')}
            </div>
            <div class="challenge-complete" hidden><p>🎀 Digital Girl Unlocked! You finished all 30 days.</p></div>
          </div>`;
      }

      if (trimmed.startsWith('%%MYTH')) {
        const lines = trimmed.split('\n').slice(1);
        let myth = '';
        let reality = '';
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('MYTH:')) myth = l.slice(5).trim();
          else if (l.startsWith('REALITY:')) reality = l.slice(8).trim();
        });
        const mid = `${articleId}-myth-${mythIndex++}`;
        return `
          <div class="myth-card" data-myth-id="${mid}">
            <p class="myth-label">❌ MYTH</p>
            <p class="myth-text">${applyBold(myth)}</p>
            <button class="myth-reveal-btn" type="button">See the Reality →</button>
            <div class="myth-reality" hidden>
              <p class="reality-label">✅ REALITY</p>
              <p class="reality-text">${applyBold(reality)}</p>
            </div>
          </div>`;
      }

      if (trimmed.startsWith('%%GOALSIM')) {
        const lines = trimmed.split('\n').slice(1);
        let title = '$0 → $1,000 Progress Simulator';
        let goal = 1000;
        lines.forEach((line) => {
          const l = line.trim();
          if (l.startsWith('TITLE:')) title = l.slice(6).trim();
          else if (l.startsWith('GOAL:')) goal = Number(l.slice(5).trim()) || goal;
        });
        const gid = `${articleId}-goalsim-${goalsimIndex++}`;
        const goalFmt = goal.toLocaleString('en-US');
        return `
          <div class="goalsim-card" data-goalsim-id="${gid}" data-goalsim-goal="${goal}">
            <p class="quiz-label">🎯 ${applyBold(title)}</p>
            <div class="goalsim-field-row">
              <label class="goalsim-field">
                <span>My income route</span>
                <select class="goalsim-route">
                  <option>Freelancing</option>
                  <option>Services</option>
                  <option>Digital products</option>
                  <option>Content</option>
                  <option>Affiliate marketing</option>
                  <option>Remote work</option>
                  <option>Selling templates</option>
                  <option>Consulting</option>
                </select>
              </label>
              <label class="goalsim-field">
                <span>My offer price ($)</span>
                <input type="number" class="goalsim-price" min="1" placeholder="e.g. 100">
              </label>
              <label class="goalsim-field">
                <span>Sales/clients so far</span>
                <input type="number" class="goalsim-completed" min="0" placeholder="0">
              </label>
            </div>
            <div class="goalsim-result">
              <p class="goalsim-target-text">Target: <strong class="goalsim-target-num">—</strong> sales to reach $${goalFmt}</p>
              <div class="goalsim-progress-track"><div class="goalsim-progress-fill"></div></div>
              <p class="goalsim-progress-label"><span class="goalsim-progress-amount">$0</span> / $${goalFmt}</p>
            </div>
            <div class="goalsim-complete" hidden><p>🎯 Goal Getter! That combination gets you to your target.</p></div>
          </div>`;
      }

      if (trimmed.startsWith('- [ ]')) {
        const items = trimmed
          .split('\n')
          .map((line) => line.replace(/^-\s*\[\s*\]\s*/, '').trim())
          .filter(Boolean);
        const listHtml = items
          .map((label) => {
            const key = `${articleId}-check-${checklistIndex++}`;
            return `<li><label><input type="checkbox" data-persist-check="${key}"><span>${applyBold(label)}</span></label></li>`;
          })
          .join('');
        return `<ul class="article-checklist" data-checklist>${listHtml}</ul>`;
      }

      if (trimmed.startsWith('- ')) {
        const items = trimmed
          .split('\n')
          .map((line) => line.replace(/^-\s*/, '').trim())
          .filter(Boolean);
        return `<ul class="article-list">${items.map((i) => `<li>${applyBold(i)}</li>`).join('')}</ul>`;
      }

      if (trimmed.startsWith('> ')) {
        return `<blockquote class="pull-quote">${applyBold(trimmed.slice(2))}</blockquote>`;
      }

      if (trimmed.startsWith('### ')) {
        const lines = trimmed.split('\n');
        const question = lines[0].replace(/^###\s*Q:\s*/, '').trim();
        const answer = lines.slice(1).join(' ').trim();
        return `
          <details class="faq-item">
            <summary>${applyBold(question)}</summary>
            <p>${applyBold(answer)}</p>
          </details>`;
      }

      const emoji = [...trimmed][0];
      const callout = CALLOUTS[emoji];
      if (callout) {
        return `
          <div class="big-sis-box ${callout.cls}">
            <span class="callout-label">${callout.label}</span>
            ${applyBold(trimmed)}
          </div>`;
      }

      return `<p>${applyBold(trimmed)}</p>`;
    })
    .join('');

  return { html, chapters };
}


/* =============================================
   PAGE CHROME (sidebars, hero card, related links)
   ============================================= */

function relatedCardsHtml(allItems, currentId, category) {
  const related = allItems
    .filter((i) => i.id !== currentId && i.type !== 'tool' && i.category === category)
    .slice(0, 3);
  const fallback = allItems.filter((i) => i.id !== currentId && i.type !== 'tool').slice(0, 3);
  const items = related.length ? related : fallback;

  return `
    <div class="tool-recs">
      <p class="tool-list-title">💕 More Money Moves</p>
      <div class="tool-recs-grid">
        ${items.map((i) => `
          <a class="tool-rec-card" href="${itemPath(i)}">
            <img src="${optimizeCloudinaryUrl(i.image, 700)}" alt="${esc(i.title)}" loading="lazy" decoding="async">
            <span><strong>${esc(i.title)}</strong><em>${esc(i.readTime || 'Quick read')}</em></span>
          </a>`).join('')}
      </div>
    </div>`;
}

const DIFFICULTY_XP = { 'Beginner Friendly': 100, Intermediate: 150, Advanced: 200 };
const DIFFICULTY_STARS = { 'Beginner Friendly': '✦✦✧', Intermediate: '✦✦✦', Advanced: '✦✦✦' };

function heroLevelCardHtml(item) {
  const xp = DIFFICULTY_XP[item.difficulty] || 100;
  const stars = DIFFICULTY_STARS[item.difficulty] || '✦✦✧';
  const missionTag = item.missionNumber
    ? `💎 MONEY MISSION #${String(item.missionNumber).padStart(2, '0')}${item.missionLabel ? ` · ${esc(item.missionLabel)}` : ''}`
    : '💎 MONEY MISSION';
  return `
    <div class="hero-level-card">
      <span class="level-pill">${missionTag}</span>
      <h1 class="hero-level-title">${esc(item.title)}</h1>
      <p class="hero-level-desc">${item.missionBrief ? `Your mission, girl: ${esc(item.missionBrief)}` : esc(item.excerpt)}</p>
      <div class="hero-level-chips">
        <span class="hero-chip">🕐 ${esc(item.readTime || 'Self-paced')}<br><small>Estimated Time</small></span>
        <span class="hero-chip">💰 +${xp} XP<br><small>Reward</small></span>
        <span class="hero-chip">${stars}<br><small>Difficulty</small></span>
        ${item.moneySkill ? `<span class="hero-chip">✨ ${esc(item.moneySkill)}<br><small>Money Skill</small></span>` : ''}
        <button class="btn btn-primary hero-lets-go" type="button">Let's Go! →</button>
      </div>
    </div>`;
}

const QUOTES = [
  'The life you want is on the other side of consistency.',
  "Progress, not perfection — that's the whole game.",
  'You are one brave message away from a different month.',
  'Small steps, done daily, build the life you keep dreaming about.',
  "Confidence isn't a feeling you wait for. It's a habit you build.",
];

function quoteCardHtml(seed) {
  let h = 0;
  for (const ch of String(seed)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const quote = QUOTES[h % QUOTES.length];
  return `
    <div class="quote-card">
      <p class="sidebar-card-title">Today's Quote ✨</p>
      <p class="quote-text">"${quote}"</p>
      <button class="btn btn-primary" id="start-challenge-btn" type="button">Start Challenge →</button>
    </div>`;
}

const REAL_TOOLS = [
  { id: 'ai-prompt-builder', icon: '🤖', label: 'AI Prompt Builder' },
  { id: 'freelance-rate-calculator', icon: '💵', label: 'Rate Calculator' },
  { id: 'resume-review-checklist', icon: '📄', label: 'Resume Review' },
  { id: 'business-idea-validator', icon: '💡', label: 'Idea Validator' },
  { id: 'personal-budget-planner', icon: '📊', label: 'Budget Planner' },
];

function quickToolsHtml() {
  return `
    <div class="quick-tools-card">
      <p class="sidebar-card-title">Quick Tools 🛠️</p>
      <div class="quick-tools-grid">
        ${REAL_TOOLS.map((t) => `
          <a class="quick-tool" href="${itemPathById(t.id)}">
            <span class="quick-tool-icon">${t.icon}</span>${t.label}
          </a>`).join('')}
      </div>
    </div>`;
}

function todaysGoalHtml() {
  return `
    <div class="sidebar-card">
      <p class="sidebar-card-title">Today's Goal <span id="todays-goal-count">0/3</span></p>
      <ul class="todays-goal-list" id="todays-goal-list">
        <li id="goal-chapter"><span class="goal-check">☐</span> Read a chapter</li>
        <li id="goal-checklist"><span class="goal-check">☐</span> Complete a checklist</li>
        <li id="goal-challenge"><span class="goal-check">☐</span> Try the mini scenario</li>
      </ul>
    </div>`;
}

function levelCompleteHtml(item, nextItem) {
  return `
    <div class="level-complete-card" id="level-complete-card" hidden>
      <p class="level-complete-badge">🎉 LEVEL COMPLETE!</p>
      <p class="level-complete-sub">You completed</p>
      <p class="level-complete-title">${esc(item.title)}</p>
      <ul class="level-complete-rewards">
        <li>+ XP earned this masterclass</li>
        <li>+ Confidence</li>
        <li>+ Knowledge</li>
        <li>+ Clarity</li>
      </ul>
      ${nextItem ? `<a class="btn btn-primary" href="${itemPath(nextItem)}">Continue to Next Level →</a>` : ''}
    </div>`;
}

function journeySidebarHtml(item, chapters) {
  return `
    <a class="back-link" href="/#articles">← Back to All Articles</a>
    <div class="journey-card">
      <img src="${optimizeCloudinaryUrl(item.image, 400)}" alt="" loading="lazy" decoding="async">
      <h3>${esc(item.title)}</h3>
      <div class="progress-track"><div class="progress-fill" id="sidebar-progress-fill"></div></div>
      <span id="sidebar-progress-label">0% complete</span>
    </div>
    <p class="journey-title">Your Journey <span>${chapters.length} Chapters</span></p>
    <ol class="journey-list" id="journey-list">
      ${chapters.map((c, i) => `<li><a href="#${c.id}" data-journey-link="${i}"><span class="journey-num">${i + 1}</span>${esc(c.title)}</a></li>`).join('')}
    </ol>`;
}

function statsSidebarHtml() {
  return `
    <div class="level-card">
      <p class="level-greeting">Hey, Queen! 👑</p>
      <div class="level-ring" id="level-ring" style="--pct:0"><span id="level-num">1</span></div>
      <p id="level-xp-label" class="level-xp-label">0 / 250 XP to Level 2</p>
    </div>
    ${todaysGoalHtml()}
    <div class="sidebar-card">
      <p class="sidebar-card-title">Badges <span id="badges-count">0/${BADGES.length}</span></p>
      <div class="badges-grid" id="badges-grid"></div>
    </div>
    <div class="sidebar-card">
      <p class="sidebar-card-title">🔥 <span id="streak-count">0</span> Day Streak</p>
      <div class="streak-days" id="streak-days"></div>
    </div>
    <div class="sidebar-card">
      <p class="sidebar-card-title">Dream Board</p>
      <ul class="dreamboard-list" id="dreamboard-list"></ul>
    </div>
    ${quickToolsHtml()}`;
}


/* =============================================
   PAGE BODY — what goes inside #article-content
   ============================================= */

export function renderArticleContent(item, allItems) {
  const isTool = item.type === 'tool';
  const { html: bodyHtml, chapters } = formatArticleBody(item.content, item.id);

  if (isTool) {
    return {
      isTool,
      chapters,
      layoutClass: '',
      html: `
      <a class="back-link" href="/#tools">← Back</a>
      <span class="card-category card-category-static">${esc(item.category)}</span>
      <h1 class="article-title">${esc(item.title)}</h1>
      <div class="article-hero-img"><img src="${optimizeCloudinaryUrl(item.image, 1200)}" alt="${esc(item.title)}" fetchpriority="high" decoding="async"></div>
      <div class="article-body">${bodyHtml}</div>
      <div id="tool-container" class="mt-lg"><noscript><p class="section-sub">This interactive tool needs JavaScript. The guide above explains how it works.</p></noscript></div>
    `,
    };
  }

  const related = allItems.filter((i) => i.id !== item.id && i.type !== 'tool' && i.category === item.category);
  const fallbackRelated = allItems.filter((i) => i.id !== item.id && i.type !== 'tool');
  const nextItem = (related.length ? related : fallbackRelated)[0];

  return {
    isTool,
    chapters,
    layoutClass: 'masterclass-layout',
    html: `
    <aside class="journey-sidebar">${journeySidebarHtml(item, chapters)}</aside>
    <article class="article-main">
      ${heroLevelCardHtml(item)}
      <div class="article-meta-row">
        <span class="card-category card-category-static">${esc(item.category)}</span>
        ${item.difficulty ? `<span class="difficulty-badge">${esc(item.difficulty)}</span>` : ''}
        ${chapters.length ? `<span id="chapters-complete-badge">0 of ${chapters.length} money moves complete</span>` : ''}
        <button class="save-btn" id="save-for-later-btn" type="button">♡ Save for later</button>
        <button class="save-btn" id="sound-toggle-btn" type="button">🔈 Sound Off</button>
      </div>
      <div class="article-hero-img"><img src="${optimizeCloudinaryUrl(item.image, 1200)}" alt="${esc(item.title)}" fetchpriority="high" decoding="async"></div>
      <div class="article-body">${bodyHtml}</div>
      ${levelCompleteHtml(item, nextItem)}
      ${quoteCardHtml(item.id)}
      ${relatedCardsHtml(allItems, item.id, item.category)}
    </article>
    <aside class="stats-sidebar">${statsSidebarHtml()}</aside>
  `,
  };
}
