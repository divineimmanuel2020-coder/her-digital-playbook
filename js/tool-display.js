/* =============================================
   TOOL-DISPLAY.JS
   Markup for the homepage "Free Tools" grid — one card per
   tool. Shared by scripts/build.mjs (static HTML written into index.html)
   and js/render.js (browser fallback), so both always produce the same HTML.

   Per-tool wording lives in TOOL_COPY below, keyed by tool id. A tool in
   data/store.js may also carry its own `display: { main, sub }` and `short`,
   which win over TOOL_COPY. With neither, the title is split after its first
   word and the full excerpt is used.
   ============================================= */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

/* One simple line icon per tool. Decorative only (aria-hidden). */
const ICON_PATHS = {
  'salary-negotiation-calculator': '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  'freelance-rate-calculator': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  'resume-review-checklist': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="m9 14 2 2 4-4"/>',
  'ai-prompt-builder': '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  'business-idea-validator': '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  'personal-budget-planner': '<path d="M4 7a2 2 0 0 1 2-2h12v4"/><path d="M4 7v10a2 2 0 0 0 2 2h14V9H6a2 2 0 0 1-2-2z"/><circle cx="16.5" cy="14" r="1"/>',
};
const ICON_FALLBACK = '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>';

function icon(id) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICON_PATHS[id] || ICON_FALLBACK) + '</svg>';
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

/** One card for the grid. `url` is whatever href the caller needs. */
export function toolRowHtml(item, index, url) {
  const { main, sub, short } = toolDisplay(item);
  const title = item.title || [main, sub].filter(Boolean).join(' ');
  const mins = /(\d+)\s*min/i.exec((item.typo && item.typo.kicker) || '');
  return (
    `<li class="tcard">` +
    `<a class="tcard-link" href="${esc(url)}">` +
    `<span class="tcard-top">` +
    `<span class="tcard-ico">${icon(item.id)}</span>` +
    `<span class="tcard-meta">` +
    (item.category ? `<span class="tcard-tag">${esc(item.category)}</span>` : '') +
    (mins ? `<span class="tcard-time">${esc(mins[1])} min</span>` : '') +
    `</span></span>` +
    `<h3 class="tcard-title">${esc(title)}</h3>` +
    `<p class="tcard-desc">${esc(short)}</p>` +
    `<span class="tcard-cta">Open tool<span class="tcard-arrow">${ARROW}</span></span>` +
    `</a></li>`
  );
}
