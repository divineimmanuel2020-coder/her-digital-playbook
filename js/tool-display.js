/* =============================================
   TOOL-DISPLAY.JS
   Markup for the homepage "Free Tools" list — one typographic row per
   tool. Shared by scripts/build.mjs (static HTML written into index.html)
   and js/render.js (browser fallback), so both always produce the same HTML.

   Per-tool wording lives in TOOL_COPY below, keyed by tool id. A tool in
   data/store.js may also carry its own `display: { main, sub }` and `short`,
   which win over TOOL_COPY. With neither, the title is split after its first
   word and the full excerpt is used.
   ============================================= */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

/* Tiny line-art ornaments. Purely decorative: aria-hidden, never clickable. */
const SVG_OPEN = '<svg class="tool-orn tool-orn--KIND" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">';
const ORNAMENT_PATHS = {
  heart: '<path d="M14 23.5C7 18.8 3.5 15 3.5 10.8 3.5 8 5.6 6 8.2 6c2.2 0 4.2 1.3 5.8 3.4C15.6 7.3 17.6 6 19.8 6c2.6 0 4.7 2 4.7 4.8 0 4.2-3.5 8-10.5 12.7z"/>',
  sparkles: '<path d="M11 3c.7 6 3 8.3 9 9-6 .7-8.3 3-9 9-.7-6-3-8.3-9-9 6-.7 8.3-3 9-9z"/><path d="M22 17c.3 2.4 1.2 3.300 3.5 3.6-2.300.3-3.2 1.2-3.5 3.6-.3-2.400-1.2-3.300-3.5-3.6 2.300-.3 3.2-1.2 3.5-3.6z"/>',
  crown: '<path d="M4.5 21h19M5.5 21 4 9l5.5 5L14 6l4.5 8L24 9l-1.500 12"/>',
};
const ORNAMENT_CYCLE = ['crown', 'heart', 'heart', 'sparkles', 'heart', 'sparkles'];

function ornament(index) {
  const kind = ORNAMENT_CYCLE[index % ORNAMENT_CYCLE.length];
  return SVG_OPEN.replace('KIND', kind) + ORNAMENT_PATHS[kind] + '</svg>';
}

const ARROW =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const TOOL_COPY = {
  'salary-negotiation-calculator': { main: 'Salary', sub: 'Negotiation Calculator', short: 'Turn your offer into an opening ask, a target and a floor, with the words to say.' },
  'freelance-rate-calculator': { main: 'Freelance', sub: 'Rate Calculator', short: 'Find the hourly rate that covers your tax, costs and time off.' },
  'resume-review-checklist': { main: 'Resume', sub: 'Review Checklist', short: "Audit your resume, fix weak bullets and match a job post's keywords." },
  'ai-prompt-builder': { main: 'AI Prompt', sub: 'Builder', short: 'Turn a rough idea into a detailed prompt, with a five-step chain for big jobs.' },
  'business-idea-validator': { main: 'Business', sub: 'Idea Validator', short: 'Score your idea and test the money in three scenarios before you build.' },
  'personal-budget-planner': { main: 'Personal', sub: 'Budget Planner', short: 'See where your money really goes and get a split that fits your costs.' },
};

export function toolDisplay(item) {
  const copy = TOOL_COPY[item.id] || {};
  const d = item.display || copy;
  const words = String(item.title || '').trim().split(/\s+/);
  return {
    main: d.main || words[0] || '',
    sub: d.sub || words.slice(1).join(' '),
    short: item.short || copy.short || item.excerpt || '',
  };
}

/** One <li> for the list. `url` is whatever href the caller needs. */
export function toolRowHtml(item, index, url) {
  const { main, sub, short } = toolDisplay(item);
  const n = Math.max(main.length + 1, 6); // +1 leaves room for the ornament
  const num = String(index + 1).padStart(2, '0');
  return (
    `<li class="tool-row">` +
    `<a class="tool-link" href="${esc(url)}">` +
    `<span class="tool-num" aria-hidden="true">${num}</span>` +
    `<h3 class="tool-name" style="--n:${n}">` +
    `<span class="tool-name-main">${esc(main)}${ornament(index)}</span>` +
    (sub ? ` <span class="tool-name-sub">${esc(sub)}</span>` : '') +
    `</h3>` +
    `<p class="tool-blurb">${esc(short)}</p>` +
    `<span class="tool-arrow" aria-hidden="true">${ARROW}</span>` +
    `</a></li>`
  );
}
