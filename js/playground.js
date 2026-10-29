// js/playground.js
import { awardXP, unlockBadge, getLevelProgress, getXP, getEarnedBadges, BADGES, recordVisitAndGetStreak } from "./gamify.js";
import { itemRelPath } from "./routes.js";
import { findItemById } from "../data/store.js";
import { EXPERIENCES } from "../data/playground.js";
[
  { id: "route-planner", icon: "\u{1F9ED}", label: "Route Planner", desc: "Got your personal route through the Playground" },
  { id: "scam-spotter", icon: "\u{1F575}\uFE0F", label: "Scam Spotter", desc: "Spotted the warning signs in a scam message" },
  { id: "smart-negotiator", icon: "\u{1F5E3}\uFE0F", label: "Smart Negotiator", desc: "Handled a client case with a strong result" },
  { id: "daily-player", icon: "\u{1F4C5}", label: "Daily Player", desc: "Finished the Game Room daily challenge" }
].forEach((b) => {
  if (!BADGES.some((x) => x.id === b.id)) BADGES.push(b);
});
var $ = (sel, root = document) => root.querySelector(sel);
var $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
function h(tag, props = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v === false || v == null) continue;
    if (k === "class") el.className = v;
    else if (k === "text") el.textContent = v;
    else if (k === "dataset") Object.assign(el.dataset, v);
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v === true) el.setAttribute(k, "");
    else el.setAttribute(k, String(v));
  }
  append(el, kids);
  return el;
}
function append(el, kids) {
  for (const kid of kids.flat(Infinity)) {
    if (kid === false || kid == null) continue;
    el.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
  }
}
function mount(el, ...kids) {
  el.replaceChildren();
  append(el, kids);
  return el;
}
var clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
var pct = (a, b) => b ? Math.round(a / b * 100) : 0;
var money = (n) => `$${Math.round(n).toLocaleString("en-US")}`;
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = a + 1831565813 >>> 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function seedFrom(str) {
  let hsh = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hsh ^= str.charCodeAt(i);
    hsh = Math.imul(hsh, 16777619);
  }
  return hsh >>> 0;
}
function shuffle(list2, rng = Math.random) {
  const a = list2.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function todayKey(d = /* @__PURE__ */ new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
var liveRegion;
function announce(message) {
  if (!liveRegion) {
    liveRegion = h("div", { class: "pgx-sr", role: "status", "aria-live": "polite", "aria-atomic": "true" });
    document.body.append(liveRegion);
  }
  liveRegion.textContent = "";
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 40);
}
function focusHeading(root) {
  const t = root && (root.matches?.("[data-focus]") ? root : $("[data-focus]", root));
  if (!t) return;
  t.setAttribute("tabindex", "-1");
  t.focus({ preventScroll: true });
}
function scrollToEl(el) {
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
var KEY = "hdp-playground-v2";
var LEGACY = "hdp-playground-";
var memory = null;
var storageOK = true;
function emptyState() {
  return { v: 2, profile: {}, done: {}, awarded: {}, money: {}, sim: {}, games: {}, daily: {}, templates: { drafts: {}, used: {} }, glossary: { seen: [], saved: [], box: {} }, start: {} };
}
function migrateLegacy(s) {
  const flags = { "money-path": "money-path-done", "game-room": "game-room-done", "client-sim": "client-sim-done", templates: "templates-used", glossary: "glossary-explored", "start-here": "start-here-done" };
  try {
    for (const [id, old] of Object.entries(flags)) {
      if (localStorage.getItem(LEGACY + old) === "1") s.done[id] = s.done[id] || Date.now();
    }
  } catch {
  }
  return s;
}
function load() {
  if (memory) return memory;
  let raw = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    storageOK = false;
  }
  let s;
  try {
    s = raw ? JSON.parse(raw) : null;
  } catch {
    s = null;
  }
  if (!s || typeof s !== "object" || s.v !== 2) s = migrateLegacy(emptyState());
  const base = emptyState();
  for (const k of Object.keys(base)) if (s[k] == null) s[k] = base[k];
  memory = s;
  return memory;
}
function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(memory));
    storageOK = true;
  } catch {
    storageOK = false;
  }
}
var canSave = () => {
  load();
  return storageOK;
};
var state = {
  /** state.get('games.red-flag.best', 0) */
  get(path, fallback) {
    let cur = load();
    for (const k of path.split(".")) {
      if (cur == null || typeof cur !== "object") return fallback;
      cur = cur[k];
    }
    return cur === void 0 ? fallback : cur;
  },
  set(path, value) {
    const root = load();
    const keys = path.split(".");
    let cur = root;
    for (let i = 0; i < keys.length - 1; i++) {
      if (cur[keys[i]] == null || typeof cur[keys[i]] !== "object") cur[keys[i]] = {};
      cur = cur[keys[i]];
    }
    if (value === void 0) delete cur[keys[keys.length - 1]];
    else cur[keys[keys.length - 1]] = value;
    persist();
    return value;
  },
  update(path, fn, fallback) {
    return state.set(path, fn(state.get(path, fallback)));
  },
  reset(path) {
    state.set(path, void 0);
  }
};
function track(name, params = {}) {
  try {
    if (typeof window.gtag === "function") window.gtag("event", name, params);
  } catch {
  }
}
function toast(cls, inner, ms) {
  const el = h("div", { class: cls, role: "status" }, inner);
  document.body.append(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 400);
  }, ms);
}
var xpToast = (n) => n > 0 && toast("xp-toast", `+${n} XP`, 1700);
var badgeToast = (b) => toast("badge-toast", [h("span", { class: "badge-toast-icon" }, b.icon), h("span", {}, "New badge!", h("br"), h("strong", {}, b.label))], 2800);
function grantXP(amount, badgeId) {
  try {
    awardXP(amount, { badgeId, onXP: () => xpToast(amount), onNewBadge: (b) => {
      badgeToast(b);
      announce(`New badge: ${b.label}`);
    } });
  } catch {
  }
}
function pgUnlock(badgeId) {
  try {
    unlockBadge(badgeId, badgeToast);
  } catch {
  }
}
function grantOnce(id, amount, badgeId) {
  if (state.get(`awarded.${id}`, false)) {
    if (badgeId) pgUnlock(badgeId);
    return false;
  }
  state.set(`awarded.${id}`, Date.now());
  grantXP(amount, badgeId);
  return true;
}
var EXP_IDS = EXPERIENCES.map((e) => e.id);
var isDone = (id) => !!state.get(`done.${id}`, false);
var doneCount = () => EXP_IDS.filter(isDone).length;
function markDone(id) {
  if (!isDone(id)) {
    state.set(`done.${id}`, Date.now());
    track("playground_completed", { experience: id });
  }
  if (doneCount() >= 3) pgUnlock("playground-queen");
}
function nextExperiences(excludeId, limit = 3) {
  const route2 = state.get("start.route", []);
  const order = [...route2, ...EXP_IDS].filter((id, i, a) => a.indexOf(id) === i && id !== excludeId);
  const ranked = order.filter((id) => !isDone(id)).concat(order.filter(isDone));
  return ranked.slice(0, limit).map((id) => EXPERIENCES.find((e) => e.id === id)).filter(Boolean);
}
var getProfile = () => state.get("profile", {});
var setProfile = (patch) => state.update("profile", (p) => ({ ...p || {}, ...patch }), {});
function articleCards(ids) {
  return ids.map((id) => findItemById(id)).filter(Boolean).map((item) => ({ id: item.id, href: `../${itemRelPath(item)}`, title: item.title, kind: item.type === "tool" ? "Free tool" : "Read" }));
}
function arrowIcon() {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  for (const [k, v] of Object.entries({ viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round", focusable: "false" })) svg.setAttribute(k, v);
  const p = document.createElementNS(ns, "path");
  p.setAttribute("d", "M5 12h14M13 6l6 6-6 6");
  svg.append(p);
  return svg;
}
function experienceRow(e, { status = true } = {}) {
  const done = isDone(e.id);
  return h(
    "li",
    {},
    h(
      "a",
      { class: "pgh-row", "data-tone": e.tone, href: e.href },
      h("span", { class: "pgh-brush", "aria-hidden": "true" }),
      h(
        "span",
        { class: "pgh-row-text" },
        h("span", { class: "pgh-row-title" }, e.title, status && done && h("span", { class: "pgx-done-tag" }, " \u2713")),
        h("span", { class: "pgh-row-desc" }, e.short)
      ),
      h("span", { class: "pgh-arrow", "aria-hidden": "true" }, arrowIcon())
    )
  );
}
function renderNextUp(container, { current, articles = [], heading = "Keep going" } = {}) {
  if (!container) return;
  const exps = nextExperiences(current, 3);
  const reads = articleCards(articles).slice(0, 3);
  mount(
    container,
    h("h2", { class: "pgx-h2" }, heading),
    h("ul", { class: "pgh-list pgx-next" }, exps.map((e) => experienceRow(e))),
    reads.length > 0 && h(
      "div",
      { class: "pgx-reads" },
      h("h3", { class: "pgx-h3" }, "Read next"),
      h("ul", { class: "pgx-reads-list" }, reads.map((r) => h("li", {}, h("a", { href: r.href }, r.title), h("span", { class: "pgx-meta" }, ` \xB7 ${r.kind}`))))
    )
  );
}
var PLAYGROUND_BADGES = ["pathfinder", "route-planner", "game-girl", "scam-spotter", "daily-player", "client-boss", "smart-negotiator", "resource-girl", "digital-dictionary", "playground-queen"];
function levelInfo() {
  try {
    return getLevelProgress();
  } catch {
    return { level: 1, into: 0, needed: 250, pct: 0 };
  }
}
function renderPassport(container) {
  if (!container) return;
  const lv = levelInfo();
  const done = doneCount();
  let streak = { streak: 0 };
  try {
    streak = recordVisitAndGetStreak();
  } catch {
  }
  const earned = (() => {
    try {
      return new Set(getEarnedBadges());
    } catch {
      return /* @__PURE__ */ new Set();
    }
  })();
  const badges = PLAYGROUND_BADGES.map((id) => BADGES.find((b) => b.id === id)).filter(Boolean);
  const next = nextExperiences(null, 1)[0];
  mount(
    container,
    h(
      "div",
      { class: "pgx-pass-top" },
      h(
        "div",
        {},
        h("p", { class: "pgh-eyebrow" }, "Your passport"),
        h("p", { class: "pgx-pass-big" }, `Level ${lv.level}`, h("span", {}, ` \xB7 ${getXP()} XP`))
      ),
      h("p", { class: "pgx-pass-stat" }, h("strong", {}, `${done}/${EXP_IDS.length}`), " experiences done")
    ),
    progressBar(lv.into, lv.needed, "Progress to next level"),
    h("p", { class: "pgx-meta" }, `${lv.needed - lv.into} XP to level ${lv.level + 1}`, streak.streak > 1 ? ` \xB7 \u{1F525} ${streak.streak}-day streak` : ""),
    h("ul", { class: "pgx-badges", "aria-label": "Playground badges" }, badges.map((b) => h(
      "li",
      { class: earned.has(b.id) ? "got" : "locked", title: `${b.label}: ${b.desc}` },
      h("span", { "aria-hidden": "true" }, b.icon),
      h("span", { class: "pgx-sr" }, `${b.label}, ${earned.has(b.id) ? "earned" : "not yet earned"}`)
    ))),
    next && h("a", { class: "pgx-btn pgx-btn-soft", href: next.href }, done === 0 ? "Begin with " : "Up next: ", h("strong", {}, next.title), " \u2192"),
    !canSave() && h("p", { class: "pgx-note" }, "This browser is blocking storage, so progress will reset when you leave. Everything still works.")
  );
}
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = h("textarea", { "aria-hidden": "true", tabindex: "-1", style: "position:fixed;opacity:0;top:0;left:0" });
    ta.value = text;
    document.body.append(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  }
}
function downloadText(filename, text, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }));
  const a = h("a", { href: url, download: filename, style: "display:none" });
  document.body.append(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 500);
}
function progressBar(value, max, label) {
  return h(
    "div",
    { class: "pgx-bar", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": value, "aria-label": label },
    h("span", { style: `width:${clamp(pct(value, max), 0, 100)}%` })
  );
}
function actions(...btns) {
  return h("div", { class: "pgx-actions" }, btns);
}
function button(label, onclick, kind = "primary", extra = {}) {
  return h("button", { type: "button", class: `pgx-btn pgx-btn-${kind}`, onclick, ...extra }, label);
}

// js/playground-hub.js
import { EXPERIENCES as EXPERIENCES2 } from "../data/playground.js";
var SUGGESTIONS = [
  "I want to earn extra money",
  "I need to price my work",
  "A client has not paid me",
  "I keep falling for scams",
  "I do not understand the jargon",
  "I need a CV or interview help",
  "I am not sure where to begin"
];
var STOP = /* @__PURE__ */ new Set(["i", "a", "an", "the", "to", "of", "and", "or", "my", "me", "is", "am", "are", "it", "in", "on", "for", "with", "want", "need", "how", "do", "can", "some", "get", "be", "that", "this", "about", "have", "has", "not", "what", "when", "help"]);
var stem = (w) => w.replace(/(ing|ed|es|s)$/, "");
var words = (text) => text.toLowerCase().replace(/[^a-z0-9'\s-]/g, " ").split(/\s+/).filter(Boolean);
function withinOne(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (a.length < b.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}
function scoreExperiences(text) {
  const clean = text.toLowerCase();
  const toks = words(text).filter((w) => !STOP.has(w));
  const stems = toks.map(stem);
  return EXPERIENCES2.map((exp) => {
    let score = 0;
    const matched = /* @__PURE__ */ new Set();
    for (const kw of exp.keywords) {
      const k = kw.toLowerCase();
      if (k.includes(" ")) {
        if (clean.includes(k)) {
          score += 4;
          matched.add(kw);
        }
        continue;
      }
      const ks = stem(k);
      toks.forEach((t, i) => {
        if (t === k) {
          score += 3;
          matched.add(kw);
        } else if (stems[i] === ks && ks.length > 2) {
          score += 2;
          matched.add(kw);
        } else if (t.length >= 5 && k.length >= 5 && withinOne(t, k)) {
          score += 1;
          matched.add(kw);
        }
      });
    }
    for (const tw of words(exp.title)) if (toks.includes(tw) && !STOP.has(tw)) score += 3;
    return { exp, score, matched: [...matched] };
  }).sort((a, b) => b.score - a.score || EXP_IDS.indexOf(a.exp.id) - EXP_IDS.indexOf(b.exp.id));
}
function renderResult(box, text) {
  const trimmed = text.trim();
  if (!trimmed) {
    box.hidden = true;
    return;
  }
  const ranked = scoreExperiences(trimmed);
  const [first, second] = ranked;
  box.hidden = false;
  if (!first || first.score === 0) {
    mount(
      box,
      h("p", {}, "I could not match that to one experience. ", h("a", { class: "pgh-result-link", href: "/pages/start-here.html" }, "Start Here"), " asks a few quick questions and builds a route for you.")
    );
    announce("No direct match. Try Start Here.");
    track("playground_finder", { matched: "none" });
    return;
  }
  const why = first.matched.length ? ` You mentioned: ${first.matched.slice(0, 4).join(", ")}.` : "";
  mount(
    box,
    h("p", {}, h("span", { class: "pgh-result-lead" }, "Try "), h("a", { class: "pgh-result-link", href: first.exp.href }, first.exp.title), ` because ${first.exp.why}${why}`),
    second && second.score >= first.score * 0.6 && second.score > 0 && h("p", { class: "pgh-result-alt" }, "Also worth a look: ", h("a", { class: "pgh-result-link", href: second.exp.href }, second.exp.title), ".")
  );
  announce(`Suggested: ${first.exp.title}`);
  track("playground_finder", { matched: first.exp.id });
}
function init() {
  if (!$("#pgh-finder")) return;
  const form = $("#pgh-finder");
  const input = $("#pgh-finder-input");
  const result = $("#pgh-finder-result");
  const chips = $("#pgh-chips");
  if (chips) {
    mount(chips, SUGGESTIONS.map((s) => h("button", { type: "button", class: "pgh-chip", onclick: () => {
      input.value = s;
      renderResult(result, s);
      input.focus();
    } }, s)));
  }
  if (form && input && result) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      renderResult(result, input.value);
    });
    let t;
    input.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (input.value.trim().length >= 3) renderResult(result, input.value);
        else result.hidden = true;
      }, 250);
    });
    const q = new URLSearchParams(location.search).get("q");
    if (q) {
      input.value = q.slice(0, 80);
      renderResult(result, input.value);
    }
  }
  renderPassport($("#pg-passport"));
  document.querySelectorAll(".pgh-list .pgh-row").forEach((row) => {
    const exp = EXPERIENCES2.find((e) => row.getAttribute("href") === e.href);
    if (exp && isDone(exp.id)) row.querySelector(".pgh-row-title")?.append(h("span", { class: "pgx-done-tag" }, " \u2713"));
  });
  const prof = getProfile();
  const hint = $("#pg-welcome-back");
  if (hint && prof.topPath) hint.hidden = false;
}
if (typeof document !== "undefined") init();

// js/pg-wizard.js
function runWizard({ root, questions, answers = {}, startAt = 0, onChange = () => {
}, onFinish, finishLabel = "See my result", canAdvance }) {
  let index = Math.min(Math.max(startAt, 0), questions.length - 1);
  const data = { ...answers };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timer = null;
  function isAnswered(q) {
    if (q.optional) return true;
    const v = data[q.id];
    if (q.type === "multi") return Array.isArray(v) && v.length > 0;
    return v !== void 0 && v !== null && v !== "";
  }
  function go(next, focus = true) {
    clearTimeout(timer);
    index = next;
    render(focus);
    onChange({ ...data }, index);
  }
  function advance() {
    if (index < questions.length - 1) go(index + 1);
    else onFinish({ ...data });
  }
  function choose2(q, opt, optionEls) {
    if (q.type === "multi") {
      const cur = Array.isArray(data[q.id]) ? data[q.id].slice() : [];
      const at = cur.indexOf(opt.value);
      if (at >= 0) cur.splice(at, 1);
      else if (cur.length < (q.max || 99)) cur.push(opt.value);
      else {
        announce(`You can pick up to ${q.max}. Untick one first.`);
        return;
      }
      data[q.id] = cur;
      optionEls.forEach((el, i) => {
        el.setAttribute("aria-checked", String(cur.includes(q.options[i].value)));
        el.disabled = !cur.includes(q.options[i].value) && cur.length >= (q.max || 99);
      });
      onChange({ ...data }, index);
      const countEl = document.getElementById("wiz-count");
      if (countEl) countEl.textContent = `${cur.length}/${q.max} chosen`;
      refreshNext();
    } else {
      data[q.id] = opt.value;
      optionEls.forEach((el, i) => el.setAttribute("aria-checked", String(q.options[i].value === opt.value)));
      onChange({ ...data }, index);
      refreshNext();
      clearTimeout(timer);
      timer = setTimeout(advance, reduce ? 0 : 280);
    }
  }
  let nextBtn;
  function refreshNext() {
    if (!nextBtn) return;
    const q = questions[index];
    const ok = isAnswered(q) && (!canAdvance || canAdvance(q, data));
    nextBtn.disabled = !ok;
    nextBtn.setAttribute("aria-disabled", String(!ok));
  }
  function render(focus) {
    const q = questions[index];
    const last = index === questions.length - 1;
    const isMulti = q.type === "multi";
    const optionEls = q.options.map((opt) => {
      const checked = isMulti ? (data[q.id] || []).includes(opt.value) : data[q.id] === opt.value;
      return h(
        "button",
        { type: "button", class: `pgx-choice${isMulti ? " multi" : ""}`, role: isMulti ? "checkbox" : "radio", "aria-checked": String(checked), disabled: isMulti && !checked && (data[q.id] || []).length >= (q.max || 99) },
        h("span", { class: "dot", "aria-hidden": "true" }),
        h("span", {}, h("span", { class: "lbl" }, opt.label), opt.hint && h("span", { class: "hint" }, opt.hint))
      );
    });
    optionEls.forEach((el, i) => {
      el.addEventListener("click", () => choose2(q, q.options[i], optionEls));
      el.addEventListener("keydown", (e) => {
        if (isMulti) return;
        const move = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (!move) return;
        e.preventDefault();
        const t = optionEls[(i + move + optionEls.length) % optionEls.length];
        t.focus();
      });
    });
    nextBtn = h("button", { type: "button", class: "pgx-btn pgx-btn-primary", onclick: () => {
      clearTimeout(timer);
      advance();
    } }, last ? finishLabel : "Continue");
    const group = h("div", { class: `pgx-choices${q.options.length === 4 || q.options.length === 8 ? " two" : ""}`, role: isMulti ? "group" : "radiogroup", "aria-labelledby": "wiz-q" }, optionEls);
    mount(
      root,
      h("div", { class: "pgx-stephead" }, h("span", {}, `Question ${index + 1} of ${questions.length}`), isMulti && h("span", { id: "wiz-count" }, `${(data[q.id] || []).length}/${q.max} chosen`)),
      progressBar(index + 1, questions.length, "Quiz progress"),
      h("h2", { class: "pgx-q", id: "wiz-q", "data-focus": true }, q.title),
      q.help && h("p", { class: "pgx-help" }, q.help),
      group,
      h(
        "div",
        { class: "pgx-actions" },
        index > 0 && h("button", { type: "button", class: "pgx-btn pgx-btn-ghost", onclick: () => go(index - 1) }, "Back"),
        nextBtn
      )
    );
    refreshNext();
    if (focus) {
      focusHeading(root);
      announce(`Question ${index + 1} of ${questions.length}: ${q.title}`);
    }
  }
  render(false);
  return { restart() {
    Object.keys(data).forEach((k) => delete data[k]);
    go(0);
  }, get answers() {
    return { ...data };
  } };
}

// js/start-here.js
import { EXPERIENCES as EXPERIENCES3, START_QUESTIONS, ROUTE_RULES, TEMPLATES, GLOSSARY } from "../data/playground.js";
import { ROUTE_EXTRAS } from "../data/playground.js";
var slugOf = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
var HOURS_FOR_TIME = { tiny: 3, some: 7, lots: 12 };
var MONEY_GOAL = { income: 800, build: 1500 };
function matches(rule, a) {
  return Object.entries(rule.when).every(([key, wanted]) => {
    const v = a[key];
    return Array.isArray(v) ? v.some((x) => wanted.includes(x)) : wanted.includes(v);
  });
}
function buildRoute(a) {
  const totals = /* @__PURE__ */ new Map();
  for (const rule of ROUTE_RULES) {
    if (!matches(rule, a)) continue;
    const cur = totals.get(rule.exp) || { points: 0, why: [] };
    cur.points += rule.points;
    cur.why.push(rule.why);
    totals.set(rule.exp, cur);
  }
  let steps = [...totals.entries()].map(([id, t]) => ({ exp: EXPERIENCES3.find((e) => e.id === id), points: t.points, why: t.why })).filter((s) => s.exp).sort((x, y) => y.points - x.points || EXPERIENCES3.indexOf(x.exp) - EXPERIENCES3.indexOf(y.exp));
  for (const e of EXPERIENCES3) {
    if (steps.length >= 3) break;
    if (!steps.some((s) => s.exp.id === e.id) && e.id !== "start-here") steps.push({ exp: e, points: 0, why: ["A good all-round next step."] });
  }
  steps = steps.slice(0, 5);
  const minutes = steps.reduce((sum, s) => sum + s.exp.minutes, 0);
  return { steps, minutes };
}
function pacing(a, minutes) {
  const weekly = { tiny: 100, some: 220, lots: 420 }[a.time] || 150;
  const weeks = Math.max(1, Math.ceil(minutes / weekly));
  return weeks === 1 ? "You can finish this route in a single week." : `At your pace this takes about ${weeks} weeks, and that is perfectly fine. One step at a time.`;
}
function renderResult2(root, a, { fresh }) {
  const { steps, minutes } = buildRoute(a);
  const extras = ROUTE_EXTRAS[a.goal] || ROUTE_EXTRAS.income;
  const tpl = extras.templates.map((id) => TEMPLATES.find((t) => t.id === id)).filter(Boolean);
  const terms = extras.terms.map((t) => GLOSSARY.find((g) => g.term === t)).filter(Boolean);
  const reads = articleCards(extras.articles).slice(0, 3);
  const summary = `My Playground route:
${steps.map((s, i) => `${i + 1}. ${s.exp.title}`).join("\n")}

First week:
${extras.week.map((w) => `- ${w}`).join("\n")}`;
  mount(
    root,
    h("p", { class: "pgh-eyebrow" }, "Your route"),
    h("h2", { class: "pgx-big", "data-focus": true }, `${steps.length} steps, about ${minutes} minutes`),
    h("p", { class: "pgx-lede" }, pacing(a, minutes)),
    h("ol", { class: "pgx-cards single", style: "margin-top:1.25rem;padding:0;list-style:none" }, steps.map((s, i) => h("li", {}, h(
      "a",
      { class: "pgx-card", href: s.exp.href },
      h("span", { class: "icon", "aria-hidden": "true" }, s.exp.icon),
      h("h3", {}, `${i + 1}. ${s.exp.title}`),
      h("p", {}, s.why[0]),
      s.why[1] && h("p", {}, s.why[1]),
      h("div", { class: "row" }, h("span", { class: "pgx-pill" }, `~${s.exp.minutes} min`), i === 0 && h("span", { class: "pgx-pill good" }, "Start here"))
    )))),
    h("h3", { class: "pgx-h3" }, "Your first week"),
    h("ol", { class: "pgx-prose", style: "padding-left:1.2rem;line-height:1.8" }, extras.week.map((w) => h("li", {}, w))),
    tpl.length > 0 && [h("h3", { class: "pgx-h3" }, "Templates that fit"), h("ul", { class: "pgx-reads-list" }, tpl.map((t) => h("li", {}, h("a", { href: `templates.html#${t.id}` }, t.title))))],
    terms.length > 0 && [h("h3", { class: "pgx-h3" }, "Words worth knowing"), h("ul", { class: "pgx-reads-list" }, terms.map((t) => h("li", {}, h("a", { href: `glossary.html#${slugOf(t.term)}` }, t.term), h("span", { class: "pgx-meta" }, ` \xB7 ${t.girlie}`))))],
    reads.length > 0 && [h("h3", { class: "pgx-h3" }, "Read next"), h("ul", { class: "pgx-reads-list" }, reads.map((r) => h("li", {}, h("a", { href: r.href }, r.title))))],
    actions(
      button("Copy my route", async (e) => {
        const el = e.currentTarget;
        const ok = await copyText(summary);
        el.textContent = ok ? "Copied \u2713" : "Copy not available";
        setTimeout(() => {
          el.textContent = "Copy my route";
        }, 1800);
      }, "soft"),
      button("Retake", () => {
        state.reset("start.answers");
        state.reset("start.step");
        state.reset("start.result");
        begin();
      }, "ghost")
    )
  );
  if (fresh) {
    focusHeading(root);
    announce(`Your route is ready: ${steps.length} steps.`);
  }
}
function begin() {
  const root = $("#sh-app");
  $("#sh-intro")?.removeAttribute("hidden");
  runWizard({
    root,
    questions: START_QUESTIONS,
    answers: state.get("start.answers", {}),
    startAt: state.get("start.step", 0),
    onChange: (answers, step) => {
      state.set("start.answers", answers);
      state.set("start.step", step);
    },
    onFinish: (answers) => finish(answers),
    finishLabel: "Build my route"
  });
}
function finish(a) {
  const root = $("#sh-app");
  const { steps } = buildRoute(a);
  state.set("start.route", steps.map((s) => s.exp.id));
  state.set("start.result", a);
  setProfile({ goal: a.goal, stage: a.stage, time: a.time, hours: HOURS_FOR_TIME[a.time], moneyGoal: MONEY_GOAL[a.goal], blockers: a.blockers || [] });
  markDone("start-here");
  grantOnce("start-here", 30, "route-planner");
  pgUnlock("route-planner");
  track("start_here_completed", { goal: a.goal, stage: a.stage });
  $("#sh-intro")?.setAttribute("hidden", "");
  renderResult2(root, a, { fresh: true });
  scrollToEl(root);
}
function init2() {
  const root = $("#sh-app");
  if (!root) return;
  $("#sh-noscript")?.remove();
  const done = state.get("start.result");
  if (done && state.get("start.route")) {
    $("#sh-intro")?.setAttribute("hidden", "");
    renderResult2(root, done, { fresh: false });
  } else begin();
}
if (typeof document !== "undefined") init2();

// js/money-engine.js
import { PATHS, SKILLS, TIMELINE_WEEKS } from "../data/playground.js";
var WEEKS_PER_MONTH = 4.3;
var clamp01 = (n) => Math.max(0, Math.min(1, n));
var mid = (r) => (r[0] + r[1]) / 2;
var skillLabel = (id) => (SKILLS.find((s) => s.id === id)?.label || id).toLowerCase();
var list = (arr) => arr.length < 2 ? arr.join("") : `${arr.slice(0, -1).join(", ")} and ${arr[arr.length - 1]}`;
var usd = (n) => `$${Math.round(n).toLocaleString("en-US")}`;
var DEFAULT_ANSWERS = Object.freeze({ goal: 800, hours: 7, budget: 50, timeline: "soon", strengths: [], people: "balanced", camera: "maybe", income: "project", experience: "none" });
function normaliseAnswers(raw = {}) {
  const a = { ...DEFAULT_ANSWERS, ...raw || {} };
  a.goal = Number(a.goal) > 0 ? Number(a.goal) : DEFAULT_ANSWERS.goal;
  a.hours = Number(a.hours) > 0 ? Number(a.hours) : DEFAULT_ANSWERS.hours;
  a.budget = Number(a.budget) >= 0 ? Number(a.budget) : DEFAULT_ANSWERS.budget;
  if (!(a.timeline in TIMELINE_WEEKS)) a.timeline = DEFAULT_ANSWERS.timeline;
  const known = new Set(SKILLS.map((s) => s.id));
  a.strengths = Array.isArray(a.strengths) ? [...new Set(a.strengths)].filter((s) => known.has(s)).slice(0, 3) : [];
  if (!["solo", "balanced", "people"].includes(a.people)) a.people = DEFAULT_ANSWERS.people;
  if (!["yes", "maybe", "no"].includes(a.camera)) a.camera = DEFAULT_ANSWERS.camera;
  if (!["steady", "project", "compound"].includes(a.income)) a.income = DEFAULT_ANSWERS.income;
  if (!["none", "some", "solid"].includes(a.experience)) a.experience = DEFAULT_ANSWERS.experience;
  return a;
}
function projection(path, hours) {
  const efficiency = hours >= path.minHours ? 1 : Math.pow(hours / path.minHours, 1.2);
  return {
    low: Math.round(hours * WEEKS_PER_MONTH * path.perHour[0] * efficiency),
    high: Math.round(hours * WEEKS_PER_MONTH * path.perHour[1] * efficiency)
  };
}
function hoursForGoal(path, goal) {
  const m = mid(path.perHour);
  return m <= 0.5 ? Infinity : Math.ceil(goal / (WEEKS_PER_MONTH * m));
}
function skillFit(path, a) {
  if (a.strengths.length === 0) return 0.5;
  const avg = a.strengths.reduce((sum, s) => sum + (path.skills[s] || 0), 0) / (a.strengths.length * 3);
  return clamp01(avg + (a.experience === "solid" && avg >= 0.5 ? 0.1 : 0));
}
function hoursFit(path, a) {
  const r = a.hours / path.minHours;
  return r >= 1 ? 1 : Math.pow(r, 1.5);
}
function budgetFit(path, a) {
  return path.cost <= a.budget ? 1 : clamp01(a.budget / path.cost);
}
function timelineFit(path, a) {
  const target = TIMELINE_WEEKS[a.timeline];
  const [fast, slow] = path.ramp;
  if (slow <= target) return 1;
  if (fast > target) return 0.1;
  return 0.35 + 0.65 * ((target - fast) / (slow - fast));
}
var PEOPLE_PREF = { solo: 0, balanced: 1.5, people: 3 };
function peopleFit(path, a) {
  return 1 - Math.abs(PEOPLE_PREF[a.people] - path.people) / 3;
}
function cameraFit(path, a) {
  if (a.camera === "yes") return 1;
  if (a.camera === "maybe") return path.camera === 2 ? 0.25 : path.camera === 1 ? 0.85 : 1;
  return path.camera === 0 ? 1 : path.camera === 1 ? 0.7 : 0;
}
var SHAPE_FIT = {
  steady: { steady: 1, project: 0.6, compounding: 0.15 },
  project: { steady: 0.75, project: 1, compounding: 0.35 },
  compound: { steady: 0.4, project: 0.6, compounding: 1 }
};
function shapeFit(path, a) {
  const key = path.shape === "compound" ? "compounding" : path.shape;
  return SHAPE_FIT[a.income][key];
}
function goalFit(path, a) {
  const p = projection(path, a.hours);
  const ratio = clamp01((p.low + p.high) / 2 / a.goal);
  const needCeiling = a.goal >= 3e3 ? 5 : a.goal >= 1500 ? 4 : a.goal >= 800 ? 3 : 2;
  const ceilingFit = path.ceiling >= needCeiling ? 1 : path.ceiling / needCeiling * 0.8;
  return 0.6 * ratio + 0.4 * ceilingFit;
}
function fitLabel(score) {
  if (score >= 75) return "Strong fit";
  if (score >= 60) return "Good fit";
  if (score >= 45) return "Possible fit";
  return "A stretch right now";
}
function explain(path, a, parts) {
  const reasons = [];
  const cautions = [];
  const matched = a.strengths.filter((s) => (path.skills[s] || 0) >= 2);
  if (matched.length) reasons.push(`It leans on your strengths in ${list(matched.map(skillLabel))}.`);
  else if (a.strengths.length && parts.skill < 0.35) cautions.push(`It does not use ${list(a.strengths.map(skillLabel))} much, so you would be learning its core skills from scratch.`);
  if (a.hours >= path.minHours) reasons.push(`${a.hours} hours a week is enough (it usually needs about ${path.minHours}).`);
  else cautions.push(`It usually needs about ${path.minHours} hours a week and you have ${a.hours}, so progress will be slower.`);
  if (path.cost <= a.budget) reasons.push(path.cost === 0 ? "You can start with free tools." : `Starting costs about ${usd(path.cost)}, which fits your budget.`);
  else cautions.push(`Starting usually costs about ${usd(path.cost)}; you could begin with free versions of the tools first.`);
  const target = TIMELINE_WEEKS[a.timeline];
  const [fast, slow] = path.ramp;
  if (slow <= target) reasons.push(`First paid work usually lands within ${slow} weeks.`);
  else if (fast > target) cautions.push(`First money usually takes ${fast} to ${slow} weeks or more, which is longer than you wanted.`);
  else cautions.push(`First money usually takes ${fast} to ${slow} weeks, so it could land after your target.`);
  if (a.camera === "no" && path.camera > 0) cautions.push(path.camera === 2 ? "It relies on being on camera." : "It can be done faceless, but being on camera helps.");
  if (parts.people >= 0.85 && a.people !== "balanced") reasons.push(a.people === "solo" ? "It is mostly independent work." : "It involves plenty of people contact, which you wanted.");
  else if (parts.people < 0.45) cautions.push(a.people === "solo" ? "It involves more talking to people than you wanted." : "It is quite solo, and you wanted more people contact.");
  if (parts.shape >= 0.99) reasons.push(path.shape === "steady" ? "Income tends to be predictable." : path.shape === "compound" ? "It rewards slow, steady building." : "It pays by the project, which suits you.");
  else if (parts.shape < 0.4) cautions.push(path.shape === "compound" ? "Income is slow to start, which is not the shape you asked for." : "Income shape may not match what you wanted.");
  const proj = projection(path, a.hours);
  const need = hoursForGoal(path, a.goal);
  if ((proj.low + proj.high) / 2 < a.goal * 0.6) {
    cautions.push(need === Infinity ? `Early earnings are usually small here, so a ${usd(a.goal)} goal is a long-term target rather than a first-quarter one.` : `At ${a.hours} hours a week, early earnings are likely to fall short of ${usd(a.goal)}. Reaching it would take roughly ${need} hours a week at typical early rates, or time to grow your rates.`);
  } else reasons.push(`At ${a.hours} hours a week, early earnings of ${usd(proj.low)} to ${usd(proj.high)} a month are plausible.`);
  return { reasons, cautions };
}
function scorePaths(rawAnswers, paths = PATHS) {
  const a = normaliseAnswers(rawAnswers);
  const ranked = paths.map((path) => {
    const parts = {
      skill: skillFit(path, a),
      hours: hoursFit(path, a),
      budget: budgetFit(path, a),
      timeline: timelineFit(path, a),
      people: peopleFit(path, a),
      camera: cameraFit(path, a),
      shape: shapeFit(path, a),
      goal: goalFit(path, a)
    };
    parts.practical = 0.4 * parts.hours + 0.25 * parts.budget + 0.35 * parts.timeline;
    parts.preference = 0.4 * parts.people + 0.3 * parts.camera + 0.3 * parts.shape;
    let score = 100 * (0.34 * parts.skill + 0.3 * parts.practical + 0.2 * parts.preference + 0.16 * parts.goal);
    if (a.experience === "none") score -= (path.difficulty - 1) * 2.5;
    else if (a.experience === "some" && path.difficulty > 2) score -= (path.difficulty - 2) * 1.5;
    if (a.camera === "no" && path.camera === 2) score *= 0.4;
    score = Math.round(Math.max(0, Math.min(100, score)));
    const { reasons, cautions } = explain(path, a, parts);
    return { path, score, label: fitLabel(score), parts, reasons, cautions, projection: projection(path, a.hours), hoursNeeded: hoursForGoal(path, a.goal) };
  });
  ranked.sort((x, y) => y.score - x.score || x.path.difficulty - y.path.difficulty || x.path.id.localeCompare(y.path.id));
  return ranked;
}
function pairingAdvice(ranked, rawAnswers) {
  const a = normaliseAnswers(rawAnswers);
  const [first] = ranked;
  if (!first) return null;
  const slow = first.path.ramp[0] > TIMELINE_WEEKS.soon / 2 || first.path.shape === "compound";
  if (!slow || a.timeline === "long") return null;
  const quick = ranked.slice(1, 7).filter((r) => r.path.ramp[1] <= 10 && r.score >= 45).sort((x, y) => x.path.ramp[0] - y.path.ramp[0])[0];
  if (!quick) return null;
  return { slow: first.path, quick: quick.path };
}
function closeCall(ranked) {
  return ranked.length > 1 && ranked[0].score - ranked[1].score <= 3;
}
function whatIf(rawAnswers, changes) {
  const before = scorePaths(rawAnswers);
  const after = scorePaths({ ...normaliseAnswers(rawAnswers), ...changes });
  const rank = (list2, id) => list2.findIndex((r) => r.path.id === id) + 1;
  const moves = after.slice(0, 5).map((r) => ({ id: r.path.id, name: r.path.name, score: r.score, from: rank(before, r.path.id), to: rank(after, r.path.id), delta: r.score - before.find((b) => b.path.id === r.path.id).score }));
  return { before, after, moves };
}
function summaryText(rawAnswers, ranked) {
  const a = normaliseAnswers(rawAnswers);
  const top = ranked.slice(0, 3);
  const lines = ["My Money Path (Her Digital Playbook)", "", `Goal: ${usd(a.goal)}/month \xB7 Time: ${a.hours} hrs/week \xB7 Budget: ${usd(a.budget)}`, ""];
  top.forEach((r, i) => {
    lines.push(`${i + 1}. ${r.path.name} (${r.score}/100, ${r.label})`);
    lines.push(`   First step: ${r.path.firstStep}`);
  });
  lines.push("", "Early income ranges are illustrations for beginners, not promises.");
  return lines.join("\n");
}

// js/money-path.js
import { MONEY_QUESTIONS, GLOSSARY as GLOSSARY2, TEMPLATES as TEMPLATES2 } from "../data/playground.js";
import { TIMELINE_WEEKS as TIMELINE_WEEKS2 } from "../data/playground.js";
var slugOf2 = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
var TIMELINE_LABEL = { fast: "within a month", soon: "within 3 months", steady: "within 6 months", long: "no rush" };
var HOURS_STEPS = [2, 3, 5, 7, 10, 12, 15, 20, 30];
var BUDGET_STEPS = [0, 25, 50, 100, 200, 400, 600, 1e3];
var TIMELINES = ["fast", "soon", "steady", "long"];
function startingAnswers() {
  const saved2 = state.get("money.answers");
  if (saved2 && Object.keys(saved2).length) return saved2;
  const p = getProfile();
  const pre = {};
  if (p.hours) pre.hours = p.hours;
  if (p.moneyGoal) pre.goal = p.moneyGoal;
  return pre;
}
function listOf(items2) {
  return h("ul", {}, items2.map((t) => h("li", {}, t)));
}
function pathCard(r, i, answers, open) {
  const p = r.path;
  const terms = p.terms.map((t) => GLOSSARY2.find((g) => g.term === t)).filter(Boolean);
  const tpls = p.templates.map((id) => TEMPLATES2.find((t) => t.id === id)).filter(Boolean);
  const reads = articleCards(p.articles).slice(0, 3);
  const need = r.hoursNeeded;
  return h(
    "details",
    { class: "pgx-panel pgx-rank", open: open || void 0 },
    h(
      "summary",
      {},
      h(
        "div",
        { class: "pgx-rank-head" },
        h("span", { class: "pgx-rank-n", "aria-hidden": "true" }, i + 1),
        h("span", {}, h("span", { class: "pgx-rank-name" }, `${p.icon} ${p.name}`), h("span", { class: "pgx-meta", style: "display:block" }, r.label)),
        h("span", { class: "pgx-rank-score" }, `${r.score}/100`)
      )
    ),
    h(
      "div",
      { class: "pgx-rank-body" },
      h("p", { class: "pgx-lede", style: "margin-bottom:0.7rem" }, p.tagline),
      h("div", { class: "pgx-bar", role: "img", "aria-label": `Match score ${r.score} out of 100` }, h("span", { style: `width:${r.score}%` })),
      h("h3", { class: "pgx-h3" }, "Why it fits"),
      listOf(r.reasons.length ? r.reasons.slice(0, 4) : ["It scored reasonably across your answers, though nothing stands out strongly."]),
      r.cautions.length > 0 && [h("h3", { class: "pgx-h3" }, "Watch out for"), listOf([...r.cautions.slice(0, 3), p.watchOut])],
      r.cautions.length === 0 && [h("h3", { class: "pgx-h3" }, "Watch out for"), listOf([p.watchOut])],
      h(
        "div",
        { class: "pgx-money" },
        h("strong", {}, "Early income, illustrated: "),
        `${money(r.projection.low)} to ${money(r.projection.high)} a month at ${answers.hours} hours a week, around months 3 to 4. `,
        need === Infinity ? "This route usually pays little at first, so treat it as an investment." : `Reaching ${money(answers.goal)} a month at typical early rates would take roughly ${need} hours a week, or higher rates as you grow.`,
        h("span", { class: "pgx-meta", style: "display:block;margin-top:0.35rem" }, "These are cautious illustrations for beginners, not promises. Real results depend on your market, clients and consistency.")
      ),
      h("h3", { class: "pgx-h3" }, "Your first step this week"),
      h("p", { style: "margin:0" }, p.firstStep),
      h("h3", { class: "pgx-h3" }, "A 30-day plan"),
      h("ol", {}, p.plan.map((w, wi) => h("li", {}, h("strong", {}, `Week ${wi + 1}: `), w))),
      h("h3", { class: "pgx-h3" }, "Free tools to start with"),
      listOf(p.tools),
      tpls.length > 0 && [h("h3", { class: "pgx-h3" }, "Templates for this route"), h("ul", { class: "pgx-reads-list" }, tpls.map((t) => h("li", {}, h("a", { href: `templates.html#${t.id}` }, t.title))))],
      terms.length > 0 && [h("h3", { class: "pgx-h3" }, "Words to know"), h("ul", { class: "pgx-reads-list" }, terms.map((t) => h("li", {}, h("a", { href: `glossary.html#${slugOf2(t.term)}` }, t.term))))],
      reads.length > 0 && [h("h3", { class: "pgx-h3" }, "Read next"), h("ul", { class: "pgx-reads-list" }, reads.map((x) => h("li", {}, h("a", { href: x.href }, x.title))))]
    )
  );
}
function comparisonTable(ranked) {
  const cost = (n) => n === 0 ? "Free" : `~${money(n)}`;
  return h(
    "div",
    { class: "pgx-table-wrap", tabindex: "0", role: "region", "aria-label": "Comparison of all directions, scrolls sideways on small screens" },
    h(
      "table",
      { class: "pgx-table" },
      h("thead", {}, h("tr", {}, ["Direction", "Fit", "Start cost", "First money", "Min hrs/wk", "Ceiling"].map((t) => h("th", { scope: "col" }, t)))),
      h("tbody", {}, ranked.map((r) => h(
        "tr",
        {},
        h("th", { scope: "row" }, `${r.path.icon} ${r.path.name}`),
        h("td", {}, `${r.score}`),
        h("td", {}, cost(r.path.cost)),
        h("td", {}, `${r.path.ramp[0]}-${r.path.ramp[1]} wks`),
        h("td", {}, r.path.minHours),
        h("td", {}, "\u2605".repeat(r.path.ceiling) + "\u2606".repeat(5 - r.path.ceiling))
      )))
    )
  );
}
function whatIfPanel(answers) {
  const hrsIdx = Math.max(0, HOURS_STEPS.findIndex((v) => v >= answers.hours));
  const budIdx = Math.max(0, BUDGET_STEPS.findIndex((v) => v >= answers.budget));
  const tlIdx = TIMELINES.indexOf(answers.timeline);
  const out = h("div", { "aria-live": "polite" });
  const hrsOut = h("output", {}, `${HOURS_STEPS[hrsIdx]} hours`);
  const budOut = h("output", {}, money(BUDGET_STEPS[budIdx]));
  const tlOut = h("output", {}, TIMELINE_LABEL[answers.timeline]);
  const hrs = h("input", { type: "range", class: "pgx-range", min: 0, max: HOURS_STEPS.length - 1, step: 1, value: hrsIdx, id: "wi-h" });
  const bud = h("input", { type: "range", class: "pgx-range", min: 0, max: BUDGET_STEPS.length - 1, step: 1, value: budIdx, id: "wi-b" });
  const tl = h("input", { type: "range", class: "pgx-range", min: 0, max: 3, step: 1, value: tlIdx, id: "wi-t" });
  const update = () => {
    const ch = { hours: HOURS_STEPS[hrs.value], budget: BUDGET_STEPS[bud.value], timeline: TIMELINES[tl.value] };
    hrsOut.textContent = `${ch.hours} hours`;
    budOut.textContent = money(ch.budget);
    tlOut.textContent = TIMELINE_LABEL[ch.timeline];
    const w = whatIf(answers, ch);
    const same = ch.hours === answers.hours && ch.budget === answers.budget && ch.timeline === answers.timeline;
    mount(
      out,
      h("p", { class: "pgx-meta", style: "margin-top:1rem" }, same ? "Move a slider to see how your top five would change." : "With those changes, your top five would be:"),
      h("ol", { style: "margin:0.3rem 0 0;padding-left:1.2rem;line-height:1.9" }, w.moves.map((m) => h(
        "li",
        {},
        h("strong", {}, m.name),
        ` ${m.score}/100 `,
        !same && m.from !== m.to && h("span", { class: `pgx-pill ${m.to < m.from ? "good" : "warn"}` }, m.to < m.from ? `up from #${m.from}` : `down from #${m.from}`),
        !same && m.from === m.to && m.delta !== 0 && h("span", { class: "pgx-meta" }, `${m.delta > 0 ? "+" : ""}${m.delta}`)
      )))
    );
  };
  [hrs, bud, tl].forEach((el) => el.addEventListener("input", update));
  update();
  return h(
    "div",
    { class: "pgx-panel pgx-whatif" },
    h("h2", { class: "pgx-h2" }, "What if\u2026?"),
    h("p", { class: "pgx-help" }, "Small changes can open up different directions. Try a few."),
    h("label", { for: "wi-h" }, "Hours a week: ", hrsOut),
    hrs,
    h("label", { for: "wi-b" }, "Starting budget: ", budOut),
    bud,
    h("label", { for: "wi-t" }, "First money: ", tlOut),
    tl,
    out
  );
}
function renderResults(root, rawAnswers, { fresh }) {
  const answers = normaliseAnswers(rawAnswers);
  const ranked = scorePaths(answers);
  const top = ranked.slice(0, 3);
  const pair = pairingAdvice(ranked, answers);
  const close = closeCall(ranked);
  mount(
    root,
    h("p", { class: "pgh-eyebrow" }, "Your Money Path"),
    h("h2", { class: "pgx-big", "data-focus": true }, `${top[0].path.name} looks like your best fit`),
    h("p", { class: "pgx-lede" }, `Based on ${money(answers.goal)} a month, ${answers.hours} hours a week, ${money(answers.budget)} to start and first money ${TIMELINE_LABEL[answers.timeline]}.`),
    answers.strengths.length === 0 && h("p", { class: "pgx-note" }, "You did not pick any strengths, so skills counted as neutral. Retake and choose up to three for a sharper match."),
    close && h("p", { class: "pgx-note" }, `It is a close call between ${top[0].path.name} and ${top[1].path.name}. Either is a sound choice, so go with the one you are more curious about.`),
    pair && h("p", { class: "pgx-note" }, `${pair.slow.name} builds slowly. Because you want money sooner, consider pairing it with ${pair.quick.name}, which usually pays faster, while the slower one grows.`),
    h("div", { style: "margin-top:1rem" }, top.map((r, i) => pathCard(r, i, answers, i === 0))),
    h("h2", { class: "pgx-h2", style: "margin-top:1.5rem" }, "All directions compared"),
    comparisonTable(ranked),
    h("div", { style: "margin-top:1.25rem" }, whatIfPanel(answers)),
    actions(
      button("Copy my result", async (e) => {
        const el = e.currentTarget;
        const ok = await copyText(summaryText(answers, ranked));
        el.textContent = ok ? "Copied \u2713" : "Copy not available";
        setTimeout(() => {
          el.textContent = "Copy my result";
        }, 1800);
      }, "soft"),
      button("Change my answers", () => begin2(true), "ghost")
    )
  );
  if (fresh) {
    focusHeading(root);
    announce(`Your best fit is ${top[0].path.name}`);
  }
}
function begin2(editing = false) {
  const root = $("#mp-app");
  $("#mp-intro")?.removeAttribute("hidden");
  const answers = editing ? normaliseAnswers(state.get("money.answers", {})) : startingAnswers();
  const initial = editing ? answers : { ...DEFAULT_ANSWERS, ...answers };
  const seeded = editing ? initial : { ...answers };
  runWizard({
    root,
    questions: MONEY_QUESTIONS,
    answers: seeded,
    startAt: 0,
    onChange: (a) => state.set("money.draft", a),
    onFinish: (a) => finish2(a),
    finishLabel: "Show my Money Path"
  });
}
function finish2(a) {
  const answers = normaliseAnswers(a);
  const ranked = scorePaths(answers);
  state.set("money.answers", answers);
  state.set("money.top", ranked.slice(0, 3).map((r) => r.path.id));
  setProfile({ hours: answers.hours, moneyGoal: answers.goal, topPath: ranked[0].path.id });
  markDone("money-path");
  grantOnce("money-path", 50, "pathfinder");
  pgUnlock("pathfinder");
  track("money_path_completed", { top: ranked[0].path.id });
  $("#mp-intro")?.setAttribute("hidden", "");
  renderResults($("#mp-app"), answers, { fresh: true });
  scrollToEl($("#mp-app"));
  renderNextUp($("#mp-next"), { current: "money-path", articles: ["how-to-make-your-first-1000-online", "best-money-making-skills-2026"] });
}
function init3() {
  const root = $("#mp-app");
  if (!root) return;
  $("#mp-noscript")?.remove();
  const saved2 = state.get("money.answers");
  if (saved2 && saved2.hours) {
    $("#mp-intro")?.setAttribute("hidden", "");
    renderResults(root, saved2, { fresh: false });
    renderNextUp($("#mp-next"), { current: "money-path", articles: ["how-to-make-your-first-1000-online", "best-money-making-skills-2026"] });
  } else {
    begin2();
    renderNextUp($("#mp-next"), { current: "money-path" });
  }
}
if (typeof document !== "undefined") init3();

// js/client-simulator.js
import { CASES } from "../data/playground.js";
import { SKILL_LABELS, METERS } from "../data/playground.js";
import { TEMPLATES as TEMPLATES3, GLOSSARY as GLOSSARY3 } from "../data/playground.js";
var slugOf3 = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
var app = () => $("#cs-app");
var LEVELS = { 1: "Warm-up", 2: "Realistic", 3: "Tricky" };
var QLABEL = ["Costly mistake", "Risky", "Solid", "Pro move"];
function checkReply(text, rubric) {
  const t = String(text || "").trim();
  const items2 = rubric.map((c) => {
    const hit = c.rx.test(t);
    return { id: c.id, label: c.label, pass: c.neg ? !hit : hit };
  });
  const long = t.split(/\s+/).filter(Boolean).length >= 8;
  const passed = items2.filter((i) => i.pass).length;
  const ratio = long ? passed / items2.length : 0;
  const tier2 = ratio >= 0.75 ? 3 : ratio >= 0.5 ? 2 : ratio >= 0.25 ? 1 : 0;
  return { items: items2, tier: tier2, long, ratio };
}
function nearestOption(options, tier2) {
  return options.slice().sort((a, b) => Math.abs(a.q - tier2) - Math.abs(b.q - tier2) || a.q - b.q)[0];
}
function bestOf(id) {
  return state.get(`sim.${id}.best`, null);
}
function renderList(filter2 = "All") {
  const root = app();
  const tags = ["All", ...new Set(CASES.map((c) => c.tag))];
  const completed = CASES.filter((c) => bestOf(c.id) !== null).length;
  const avg = completed ? Math.round(CASES.reduce((s, c) => s + (bestOf(c.id) ?? 0), 0) / completed) : 0;
  const shown = CASES.filter((c) => filter2 === "All" || c.tag === filter2);
  mount(
    root,
    h(
      "div",
      { class: "pgx-pass-top" },
      h("div", {}, h("p", { class: "pgh-eyebrow" }, "Your practice"), h("p", { class: "pgx-pass-big" }, `${completed}/${CASES.length}`, h("span", {}, " cases played"))),
      completed > 0 && h("p", { class: "pgx-pass-stat" }, "Average best score ", h("strong", {}, `${avg}%`))
    ),
    progressBar(completed, CASES.length, "Cases played"),
    h("div", { class: "pgx-chips", role: "group", "aria-label": "Filter cases by topic", style: "margin-top:1rem" }, tags.map((t) => h("button", { type: "button", class: "pgx-chip", "aria-pressed": String(t === filter2), onclick: () => renderList(t) }, t))),
    h("ul", { class: "pgx-cards", "aria-label": "Cases" }, shown.map((c) => {
      const best = bestOf(c.id);
      return h("li", {}, h(
        "button",
        { type: "button", class: "pgx-card", onclick: () => play(c.id) },
        h("span", { class: "pgx-meta" }, `${c.tag} \xB7 ${LEVELS[c.level]} \xB7 ~${c.minutes} min`),
        h("h3", {}, c.title),
        h("p", {}, c.blurb),
        h("div", { class: "row" }, best === null ? h("span", { class: "pgx-pill" }, "Not played yet") : h("span", { class: `pgx-pill ${best >= 80 ? "good" : best >= 50 ? "warn" : "bad"}` }, `Best ${best}%`))
      ));
    }))
  );
}
function play(caseId) {
  const c = CASES.find((x) => x.id === caseId);
  const run = { c, meters: { money: 60, trust: 60, energy: 60 }, log: [], node: c.start, step: 0, mode: "tap" };
  scrollToEl(app());
  renderNode(run);
}
function meterBlock(run, deltas) {
  return h("div", { class: "pgx-meters", role: "group", "aria-label": "Your meters" }, METERS.map((m, i) => {
    const d = deltas ? deltas[i] : 0;
    return h(
      "div",
      { class: "pgx-meter" },
      h("b", {}, `${m.icon} ${m.label}`),
      h("output", {}, Math.round(run.meters[m.id])),
      d !== 0 && h("span", { class: `delta ${d > 0 ? "up" : "down"}` }, `${d > 0 ? "+" : ""}${d}`),
      progressBar(run.meters[m.id], 100, m.label)
    );
  }));
}
function header(run) {
  return [
    h("div", { class: "pgx-stephead" }, h("span", {}, run.c.title), h("span", {}, `Decision ${run.step + 1} of 2`)),
    progressBar(run.step, 2, "Case progress")
  ];
}
function nodeKey(run) {
  return run.node;
}
function renderNode(run) {
  const { c } = run;
  const node = c.nodes[nodeKey(run)];
  const isFirst = run.step === 0;
  const optionButtons = node.options.map((o, i) => h(
    "button",
    { type: "button", class: "pgx-choice", role: "button", onclick: () => choose(run, node, o) },
    h("span", { class: "dot", "aria-hidden": "true" }),
    h("span", {}, h("span", { class: "lbl" }, o.label))
  ));
  const typed = h("textarea", { class: "pgx-input", id: "cs-text", rows: 5, maxlength: 600, placeholder: "Write what you would actually say\u2026", "aria-describedby": "cs-text-help" });
  const typedBox = h(
    "div",
    { hidden: true },
    h("label", { class: "pgx-field", for: "cs-text" }, h("span", {}, "Your reply")),
    typed,
    h("p", { class: "pgx-meta", id: "cs-text-help" }, "A simple keyword check scores your reply. It runs on your device only and is practice feedback, not a judgement of your writing."),
    h("div", { class: "pgx-actions" }, button("Send reply", () => submitTyped(run, node, typed.value, typedBox), "primary"))
  );
  const tapBox = h("div", {}, h("div", { class: "pgx-choices", role: "group", "aria-label": "Choose your response" }, optionButtons));
  const toggle = isFirst && c.rubric ? h("button", { type: "button", class: "pgx-btn pgx-btn-ghost", style: "margin-top:0.9rem;width:100%", onclick: (e) => {
    const typedMode = typedBox.hidden;
    typedBox.hidden = !typedMode;
    tapBox.hidden = typedMode;
    e.currentTarget.textContent = typedMode ? "Pick from options instead" : "Write my own reply instead";
    if (typedMode) typed.focus();
  } }, "Write my own reply instead") : null;
  mount(
    app(),
    header(run),
    isFirst && h("p", { class: "pgx-scenario" }, c.setup),
    meterBlock(run),
    h("div", { class: "pgx-bubble" }, h("span", { class: "who" }, node.from), h("p", { "data-focus": true }, node.msg)),
    h("p", { class: "pgx-help", style: "margin-bottom:0.6rem" }, "What do you do?"),
    tapBox,
    typedBox,
    toggle,
    h("div", { class: "pgx-actions" }, button("Leave this case", () => renderList(), "ghost"))
  );
  focusHeading(app());
}
function submitTyped(run, node, text, box) {
  const res = checkReply(text, run.c.rubric);
  if (!res.long) {
    let warn = $("#cs-warn", box);
    if (!warn) {
      warn = h("p", { class: "pgx-note", id: "cs-warn", role: "alert" });
      box.append(warn);
    }
    warn.textContent = "Write at least a sentence or two (around 8 words) so there is something to check.";
    return;
  }
  const opt = nearestOption(node.options, res.tier);
  choose(run, node, opt, { typed: text, check: res });
}
function choose(run, node, opt, extra = {}) {
  const [dm, dt, de] = opt.fx;
  const before = { ...run.meters };
  run.meters.money = clamp(run.meters.money + dm, 0, 100);
  run.meters.trust = clamp(run.meters.trust + dt, 0, 100);
  run.meters.energy = clamp(run.meters.energy + de, 0, 100);
  const deltas = [run.meters.money - before.money, run.meters.trust - before.trust, run.meters.energy - before.energy];
  run.log.push({ step: run.step, q: opt.q, skill: opt.skill, label: extra.typed ? "Your own reply" : opt.label, fb: opt.fb });
  const last = run.step === 1;
  mount(
    app(),
    header({ ...run, step: run.step }),
    meterBlock(run, deltas),
    h("div", { class: "pgx-bubble" }, h("span", { class: "who" }, "You"), h("p", {}, extra.typed || opt.label)),
    h("div", { class: "pgx-bubble reply" }, h("span", { class: "who" }, "Their reply"), h("p", {}, opt.reply)),
    h("div", { class: `pgx-feedback q${opt.q}`, role: "status" }, h("strong", { "data-focus": true }, `${QLABEL[opt.q]} \xB7 ${SKILL_LABELS[opt.skill]}`), opt.fb),
    extra.check && h(
      "div",
      { class: "pgx-panel", style: "margin-top:0.9rem" },
      h("strong", {}, "Reply checker"),
      h("ul", { class: "pgx-check" }, extra.check.items.map((i) => h("li", {}, h("span", { class: i.pass ? "ok" : "no", "aria-hidden": "true" }, i.pass ? "\u2713" : "\u2717"), h("span", {}, i.label, h("span", { class: "pgx-sr" }, i.pass ? " (covered)" : " (missed)"))))),
      h("p", { class: "pgx-meta" }, "A strong reply might look like this:"),
      h("p", { style: "margin:0.3rem 0 0;font-style:italic;font-size:0.92rem;line-height:1.6" }, run.c.sample)
    ),
    actions(button(last ? "See my debrief" : "Continue", () => {
      if (last) return debrief(run);
      run.step = 1;
      run.node = opt.q >= 2 ? "n2good" : "n2bad";
      renderNode(run);
    }, "primary"))
  );
  focusHeading(app());
  announce(`${QLABEL[opt.q]}. ${opt.fb}`);
}
function debrief(run) {
  const { c } = run;
  const total = run.log.reduce((s, l) => s + l.q, 0);
  const score = Math.round(total / (run.log.length * 3) * 100);
  const grade = score >= 90 ? "A" : score >= 75 ? "B" : score >= 50 ? "C" : "D";
  const headline = { A: "Pro move, all the way.", B: "Strong instincts.", C: "Decent, with room to grow.", D: "A learning moment, and that is the point of practice." }[grade];
  const skills = {};
  run.log.forEach((l) => {
    skills[l.skill] = skills[l.skill] || { got: 0, max: 0 };
    skills[l.skill].got += l.q;
    skills[l.skill].max += 3;
  });
  const best = run.log.slice().sort((a, b) => b.q - a.q)[0];
  const worst = run.log.slice().sort((a, b) => a.q - b.q)[0];
  const prev = bestOf(c.id);
  const isBest = prev === null || score > prev;
  state.update(`sim.${c.id}`, (s) => ({ best: Math.max(score, s?.best ?? 0), runs: (s?.runs ?? 0) + 1, last: score }), {});
  const completed = CASES.filter((x) => bestOf(x.id) !== null).length;
  if (grantOnce(`case:${c.id}`, 30)) {
  } else if (prev !== null && score > prev) grantXP(10);
  if (completed >= 3) {
    markDone("client-sim");
    grantOnce("client-sim-3", 40, "client-boss");
    pgUnlock("client-boss");
  }
  if (score >= 85) pgUnlock("smart-negotiator");
  track("client_case_completed", { case: c.id, score });
  const tpls = c.templates.map((id) => TEMPLATES3.find((t) => t.id === id)).filter(Boolean);
  const terms = c.terms.map((t) => GLOSSARY3.find((g) => g.term === t)).filter(Boolean);
  const read = articleCards([c.article])[0];
  const nextCase = CASES.find((x) => x.id !== c.id && bestOf(x.id) === null) || CASES.find((x) => x.id !== c.id);
  mount(
    app(),
    h("p", { class: "pgh-eyebrow" }, `Debrief \xB7 ${c.title}`),
    h("h2", { class: "pgx-big", "data-focus": true }, `${score}% \xB7 Grade ${grade}`),
    h("p", { class: "pgx-lede" }, headline),
    isBest && prev !== null && h("p", { class: "pgx-note" }, `A new personal best. You were at ${prev}% before.`),
    meterBlock(run),
    h("h3", { class: "pgx-h3" }, "Your skills in this case"),
    h("ul", { class: "pgx-skills" }, Object.entries(skills).map(([k, v]) => h("li", {}, h("div", {}, h("span", {}, SKILL_LABELS[k]), h("span", {}, `${pct(v.got, v.max)}%`)), progressBar(v.got, v.max, SKILL_LABELS[k])))),
    best.q > worst.q && [
      h("div", { class: "pgx-feedback q3" }, h("strong", {}, "Your strongest moment"), best.fb),
      h("div", { class: `pgx-feedback q${worst.q}` }, h("strong", {}, "Worth another look"), worst.fb)
    ],
    h("h3", { class: "pgx-h3" }, "The takeaway"),
    h("p", { class: "pgx-prose" }, c.lesson),
    tpls.length > 0 && [h("h3", { class: "pgx-h3" }, "Handy templates"), h("ul", { class: "pgx-reads-list" }, tpls.map((t) => h("li", {}, h("a", { href: `templates.html#${t.id}` }, t.title))))],
    terms.length > 0 && [h("h3", { class: "pgx-h3" }, "Words to know"), h("ul", { class: "pgx-reads-list" }, terms.map((t) => h("li", {}, h("a", { href: `glossary.html#${slugOf3(t.term)}` }, t.term))))],
    read && h("p", { class: "pgx-meta", style: "margin-top:1rem" }, "Read more: ", h("a", { class: "pgx-link", href: read.href }, read.title)),
    actions(
      button("Try this case again", () => play(c.id), "soft"),
      nextCase && button(`Next: ${nextCase.title}`, () => play(nextCase.id), "primary"),
      button("All cases", () => renderList(), "ghost")
    )
  );
  focusHeading(app());
  announce(`Debrief: ${score} percent, grade ${grade}`);
  renderNextUp($("#cs-next"), { current: "client-sim", articles: ["how-to-get-paid-as-a-freelancer", "how-to-get-your-first-freelance-client"] });
}
function init4() {
  if (!app()) return;
  $("#cs-noscript")?.remove();
  const open = () => {
    const want2 = location.hash.slice(1);
    if (want2 && CASES.some((c) => c.id === want2)) play(want2);
    else if (!want2) renderList();
  };
  window.addEventListener("hashchange", open);
  renderList();
  renderNextUp($("#cs-next"), { current: "client-sim", articles: ["how-to-get-paid-as-a-freelancer"] });
  const want = location.hash.slice(1);
  if (want && CASES.some((c) => c.id === want)) play(want);
}
if (typeof document !== "undefined") init4();

// js/game-room.js
import { GAMES } from "../data/playground.js";
import { INBOX_ACTIONS, dailyPool } from "../data/playground.js";
var app2 = () => $("#gr-app");
var tier = (best) => best >= 90 ? { n: "Gold", c: "good" } : best >= 70 ? { n: "Silver", c: "" } : best >= 50 ? { n: "Bronze", c: "warn" } : null;
var bestOf2 = (id) => state.get(`games.${id}.best`, null);
function dailyStreak() {
  const days = state.get("daily", {});
  let n = 0;
  const d = /* @__PURE__ */ new Date();
  if (!days[todayKey(d)]) d.setDate(d.getDate() - 1);
  while (days[todayKey(d)]) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
function lobby() {
  const dk = todayKey();
  const dailyDone = state.get(`daily.${dk}`);
  const streak = dailyStreak();
  mount(
    app2(),
    h(
      "div",
      { class: "pgx-panel", style: "margin-bottom:1rem" },
      h("p", { class: "pgh-eyebrow" }, "Daily challenge"),
      h("h2", { class: "pgx-h2" }, dailyDone ? `Done today: ${dailyDone.score}%` : "Five quick questions, same for everyone"),
      h("p", { class: "pgx-help", style: "margin-bottom:0.6rem" }, streak > 0 ? `\u{1F525} ${streak}-day streak. ${dailyDone ? "See you tomorrow." : "Keep it going!"}` : "Play today to start a streak."),
      !dailyDone && button("Play today\u2019s challenge", () => daily(), "primary")
    ),
    h("h2", { class: "pgx-h2" }, "Pick a game"),
    h("ul", { class: "pgx-cards", "aria-label": "Games" }, GAMES.map((g) => {
      const best = bestOf2(g.id);
      const t = tier(best);
      return h("li", {}, h(
        "button",
        { type: "button", class: "pgx-card", onclick: () => startGame(g.id) },
        h("span", { class: "icon", "aria-hidden": "true" }, g.icon),
        h("h3", {}, g.title),
        h("p", {}, g.blurb),
        h("div", { class: "row" }, best === null ? h("span", { class: "pgx-pill" }, `${g.rounds} rounds`) : [h("span", { class: "pgx-pill" }, `Best ${best}%`), t && h("span", { class: `pgx-pill ${t.c}` }, t.n)])
      ));
    }))
  );
}
var RUNNERS = { "money-moves": (g) => moneyMoves(g), "red-flag": (g) => redFlag(g), "skill-match": (g) => skillMatch(g), "inbox-boss": (g) => inboxBoss(g), "price-this": (g) => priceThis(g), "spot-scam": (g) => spotScam(g) };
function startGame(id) {
  const g = GAMES.find((x) => x.id === id);
  scrollToEl(app2());
  mount(
    app2(),
    h("p", { class: "pgh-eyebrow" }, g.title),
    h("h2", { class: "pgx-h2", "data-focus": true }, `${g.icon} ${g.blurb}`),
    h("p", { class: "pgx-prose" }, g.how),
    actions(button("Start", () => RUNNERS[id](g), "primary"), button("Back", lobby, "ghost"))
  );
  focusHeading(app2());
}
function topBar(g, i, n, extra) {
  return [h("div", { class: "pgx-stephead" }, h("span", {}, g.title), h("span", {}, `${Math.min(i + 1, n)} of ${n}`, extra ? ` \xB7 ${extra}` : "")), progressBar(i, n, `${g.title} progress`)];
}
function finishGame(g, score, review, extraNode) {
  const prev = bestOf2(g.id);
  const t = tier(score);
  state.update(`games.${g.id}`, (s) => ({ best: Math.max(score, s?.best ?? 0), plays: (s?.plays ?? 0) + 1, last: score }), {});
  if (!grantOnce(`game:${g.id}`, 25) && prev !== null && score > prev) grantXP(10);
  const played = GAMES.filter((x) => bestOf2(x.id) !== null).length;
  if (played >= 3) {
    markDone("game-room");
    grantOnce("game-room-3", 30, "game-girl");
    pgUnlock("game-girl");
  }
  if (g.id === "spot-scam" && score >= 80) pgUnlock("scam-spotter");
  track("game_completed", { game: g.id, score });
  mount(
    app2(),
    h("p", { class: "pgh-eyebrow" }, `${g.title} \xB7 finished`),
    h("h2", { class: "pgx-big", "data-focus": true }, `${score}%`),
    t ? h("p", { class: "pgx-lede" }, `${t.n} mastery.`, prev !== null && score > prev ? ` A new best, up from ${prev}%.` : "") : h("p", { class: "pgx-lede" }, "Keep practising. Reach 50% for Bronze mastery."),
    extraNode,
    review.length > 0 && [h("h3", { class: "pgx-h3" }, "Worth another look"), h("ul", { class: "pgx-prose", style: "padding-left:1.1rem" }, review.slice(0, 6).map((r) => h("li", {}, h("strong", {}, r.q), " ", r.why)))],
    review.length === 0 && h("p", { class: "pgx-note" }, "Nothing to review. A clean run!"),
    actions(button("Play again", () => RUNNERS[g.id](g), "primary"), button("All games", lobby, "ghost"))
  );
  focusHeading(app2());
  announce(`${g.title} finished with ${score} percent`);
  renderNextUp($("#gr-next"), { current: "game-room", articles: ["how-to-get-paid-as-a-freelancer"] });
}
function feedbackBlock(ok, text, label) {
  return h("div", { class: `pgx-feedback ${ok === 2 ? "q3" : ok === 1 ? "q2" : "q0"}`, role: "status" }, h("strong", { "data-focus": true }, label), text);
}
function moneyMoves(g) {
  const rounds = shuffle(g.pool).slice(0, g.rounds);
  const m = { safety: 50, growth: 50, calm: 50 };
  const labels = [["safety", "\u{1F6DF} Safety net"], ["growth", "\u{1F4C8} Growth"], ["calm", "\u{1F9D8} Calm"]];
  const dips = /* @__PURE__ */ new Set();
  let i = 0;
  const meters = (d) => h("div", { class: "pgx-meters" }, labels.map(([k, l], idx) => h("div", { class: "pgx-meter" }, h("b", {}, l), h("output", {}, m[k]), d && d[idx] !== 0 && h("span", { class: `delta ${d[idx] > 0 ? "up" : "down"}` }, `${d[idx] > 0 ? "+" : ""}${d[idx]}`), progressBar(m[k], 100, l))));
  function ask() {
    if (i >= rounds.length) return end();
    const r = rounds[i];
    mount(
      app2(),
      topBar(g, i, rounds.length),
      meters(),
      h("h2", { class: "pgx-q", "data-focus": true }, r.situation),
      h("div", { class: "pgx-choices" }, shuffle(r.options).map((o) => h("button", { type: "button", class: "pgx-choice", onclick: () => pick(r, o) }, h("span", { class: "dot", "aria-hidden": "true" }), h("span", { class: "lbl" }, o.label))))
    );
    focusHeading(app2());
  }
  function pick(r, o) {
    labels.forEach(([k], idx) => {
      m[k] = clamp(m[k] + o.fx[idx], 0, 100);
      if (m[k] <= 25) dips.add(k);
    });
    mount(app2(), topBar(g, i, rounds.length), meters(o.fx), h("p", { class: "pgx-bubble" }, o.label), feedbackBlock(2, o.fb, "What that did"), actions(button(i === rounds.length - 1 ? "See my result" : "Next", () => {
      i++;
      ask();
    }, "primary")));
    focusHeading(app2());
  }
  function end() {
    const avg = (m.safety + m.growth + m.calm) / 3;
    const min = Math.min(m.safety, m.growth, m.calm);
    const score = clamp(Math.round(avg * 0.7 + min * 0.3 + 12 - dips.size * 10), 0, 100);
    const sorted = labels.map(([k, l]) => [l, m[k]]).sort((a, b) => b[1] - a[1]);
    const type = min < 30 ? "Stretched thin" : m.safety >= 70 && m.growth < 55 ? "The Careful Saver" : m.growth >= 70 && m.safety < 55 ? "The Bold Builder" : m.calm >= 70 ? "The Steady One" : "The Balanced Builder";
    const advice = min < 30 ? `Your ${sorted[2][0].replace(/^\S+\s/, "").toLowerCase()} took a hit. Protect the thinnest meter first.` : m.safety >= 70 && m.growth < 55 ? "Safe, but consider putting a little more into growth." : m.growth >= 70 && m.safety < 55 ? "Great momentum. A bigger safety net would let you take risks with less worry." : "A healthy mix. Keep reviewing it each month.";
    finishGame(g, score, [], h("div", {}, meters(), h("p", { class: "pgx-big", style: "font-size:1.6rem" }, type), h("p", { class: "pgx-prose" }, advice)));
  }
  ask();
}
function redFlag(g) {
  const rounds = shuffle(g.pool).slice(0, g.rounds);
  let i = 0, points = 0, streak = 0, best = 0;
  const miss = [];
  function ask() {
    if (i >= rounds.length) return end();
    const r = rounds[i];
    mount(
      app2(),
      topBar(g, i, rounds.length, streak > 1 ? `\u{1F525} ${streak}` : ""),
      h("p", { class: "pgx-help", style: "margin-bottom:0.5rem" }, "A client sends this. Is it a green flag or a red flag?"),
      h("blockquote", { class: "pgx-quote", "data-focus": true }, `\u201C${r.text}\u201D`),
      h("div", { class: "pgx-flags" }, h("button", { type: "button", class: "pgx-flag green", onclick: () => answer(r, false) }, "\u{1F7E2} Green flag"), h("button", { type: "button", class: "pgx-flag red", onclick: () => answer(r, true) }, "\u{1F6A9} Red flag"))
    );
    focusHeading(app2());
  }
  function answer(r, said) {
    const ok = said === r.flag;
    if (ok) {
      streak++;
      best = Math.max(best, streak);
      points += 10 + Math.min(streak - 1, 4) * 2;
    } else {
      streak = 0;
      miss.push({ q: `\u201C${r.text.slice(0, 60)}${r.text.length > 60 ? "\u2026" : ""}\u201D`, why: r.why });
    }
    mount(app2(), topBar(g, i, rounds.length, streak > 1 ? `\u{1F525} ${streak}` : ""), h("blockquote", { class: "pgx-quote" }, `\u201C${r.text}\u201D`), feedbackBlock(ok ? 2 : 0, r.why, ok ? `Yes, it is a ${r.flag ? "red" : "green"} flag` : `Actually a ${r.flag ? "red" : "green"} flag`), actions(button(i === rounds.length - 1 ? "See my result" : "Next", () => {
      i++;
      ask();
    }, "primary")));
    focusHeading(app2());
  }
  function end() {
    const maxPts = rounds.length * 10 + (() => {
      let s = 0;
      for (let k = 1; k <= rounds.length; k++) s += Math.min(k - 1, 4) * 2;
      return s;
    })();
    finishGame(g, clamp(Math.round(points / maxPts * 100), 0, 100), miss, h("p", { class: "pgx-prose" }, `You got ${rounds.length - miss.length} of ${rounds.length} right. Longest streak: ${best}.`));
  }
  ask();
}
function skillMatch(g) {
  const rounds = shuffle(g.pool).slice(0, g.rounds).map((r) => {
    const opts = shuffle(r.options.map((t, idx) => ({ t, ok: idx === r.answer })));
    return { ...r, opts };
  });
  let i = 0, right = 0;
  const miss = [];
  function ask() {
    if (i >= rounds.length) return end();
    const r = rounds[i];
    mount(
      app2(),
      topBar(g, i, rounds.length),
      h("h2", { class: "pgx-q", "data-focus": true }, r.need),
      h("p", { class: "pgx-help" }, "Which skill fits best?"),
      h("div", { class: "pgx-choices" }, r.opts.map((o) => h("button", { type: "button", class: "pgx-choice", onclick: () => answer(r, o) }, h("span", { class: "dot", "aria-hidden": "true" }), h("span", { class: "lbl" }, o.t))))
    );
    focusHeading(app2());
  }
  function answer(r, o) {
    if (o.ok) right++;
    else miss.push({ q: r.need, why: `${r.opts.find((x) => x.ok).t}. ${r.why}` });
    mount(app2(), topBar(g, i, rounds.length), h("p", { class: "pgx-bubble" }, r.need), feedbackBlock(o.ok ? 2 : 0, r.why, o.ok ? "Correct" : `Best answer: ${r.opts.find((x) => x.ok).t}`), actions(button(i === rounds.length - 1 ? "See my result" : "Next", () => {
      i++;
      ask();
    }, "primary")));
    focusHeading(app2());
  }
  function end() {
    finishGame(g, Math.round(right / rounds.length * 100), miss, h("p", { class: "pgx-prose" }, `${right} of ${rounds.length} matched.`));
  }
  ask();
}
function inboxBoss(g) {
  const rounds = shuffle(g.pool).slice(0, g.rounds);
  let i = 0, pts = 0;
  const miss = [];
  const label = (id) => INBOX_ACTIONS.find((a) => a.id === id).label;
  function ask() {
    if (i >= rounds.length) return end();
    const r = rounds[i];
    mount(
      app2(),
      topBar(g, i, rounds.length),
      h("div", { class: "pgx-bubble" }, h("span", { class: "who" }, r.from), h("p", { "data-focus": true }, r.msg)),
      h("p", { class: "pgx-help", style: "margin-bottom:0.6rem" }, "How do you handle it?"),
      h("div", { class: "pgx-choices" }, INBOX_ACTIONS.map((a) => h("button", { type: "button", class: "pgx-choice", onclick: () => answer(r, a.id) }, h("span", { class: "dot", "aria-hidden": "true" }), h("span", { class: "lbl" }, a.label))))
    );
    focusHeading(app2());
  }
  function answer(r, id) {
    const got = id === r.best ? 2 : r.ok.includes(id) ? 1 : 0;
    pts += got;
    if (got < 2) miss.push({ q: `${r.from}: \u201C${r.msg.slice(0, 55)}\u2026\u201D`, why: `Best: ${label(r.best)}. ${r.why}` });
    mount(app2(), topBar(g, i, rounds.length), h("div", { class: "pgx-bubble" }, h("span", { class: "who" }, r.from), h("p", {}, r.msg)), feedbackBlock(got, r.why, got === 2 ? "Best move (+2)" : got === 1 ? `Acceptable (+1). Best was: ${label(r.best)}` : `Not quite. Best was: ${label(r.best)}`), actions(button(i === rounds.length - 1 ? "See my result" : "Next", () => {
      i++;
      ask();
    }, "primary")));
    focusHeading(app2());
  }
  function end() {
    finishGame(g, Math.round(pts / (rounds.length * 2) * 100), miss, h("p", { class: "pgx-prose" }, `${pts} of ${rounds.length * 2} points.`));
  }
  ask();
}
function priceAnswer(r) {
  return Math.round(r.hours * r.rate * (1 + r.buffer + r.rush + r.usage));
}
function priceScore(guess, answer) {
  const off = Math.abs(guess - answer) / answer;
  return off <= 0.15 ? 2 : off <= 0.3 ? 1 : 0;
}
function priceThis(g) {
  const rounds = shuffle(g.pool).slice(0, g.rounds);
  let i = 0, pts = 0;
  const miss = [];
  function ask() {
    if (i >= rounds.length) return end();
    const r = rounds[i];
    const ans = priceAnswer(r);
    const max = Math.max(200, Math.ceil(ans * 2 / 50) * 50);
    const out = h("output", { class: "pgx-price" }, money(Math.round(max / 2 / 5) * 5));
    const range = h("input", { type: "range", class: "pgx-range", min: 0, max, step: 5, value: Math.round(max / 2 / 5) * 5, id: "pt-r", "aria-label": "Your price in dollars" });
    range.addEventListener("input", () => {
      out.textContent = money(+range.value);
    });
    mount(
      app2(),
      topBar(g, i, rounds.length),
      h("h2", { class: "pgx-q", "data-focus": true }, r.project),
      h("div", { class: "pgx-panel" }, h("p", { style: "margin:0" }, h("strong", {}, `${r.hours} hours of work`), ` at your rate of ${money(r.rate)}/hour.`), h("p", { class: "pgx-meta" }, r.note)),
      h("p", { class: "pgx-help", style: "margin:1rem 0 0.2rem" }, "What price do you quote?"),
      out,
      range,
      h("p", { class: "pgx-meta", style: "text-align:center" }, `Slide between $0 and ${money(max)}`),
      actions(button("Lock it in", () => reveal(r, ans, +range.value), "primary"))
    );
    focusHeading(app2());
  }
  function reveal(r, ans, guess) {
    const got = priceScore(guess, ans);
    pts += got;
    const base = r.hours * r.rate;
    const parts = [`${r.hours} h \xD7 ${money(r.rate)} = ${money(base)}`, `+ ${Math.round(r.buffer * 100)}% buffer for admin, feedback and revisions = ${money(base * r.buffer)}`, r.rush ? `+ ${Math.round(r.rush * 100)}% rush fee = ${money(base * r.rush)}` : null, r.usage ? `+ ${Math.round(r.usage * 100)}% for usage rights = ${money(base * r.usage)}` : null].filter(Boolean);
    if (got < 2) miss.push({ q: r.project.slice(0, 60) + "\u2026", why: `A fair price was about ${money(ans)}. You quoted ${money(guess)}.` });
    mount(
      app2(),
      topBar(g, i, rounds.length),
      feedbackBlock(got, `You quoted ${money(guess)}. A fair price is about ${money(ans)}.`, got === 2 ? "Bullseye (+2)" : got === 1 ? "Close (+1)" : guess < ans ? "Too low" : "Too high"),
      h("div", { class: "pgx-formula" }, h("strong", {}, "The formula"), h("br"), parts.map((p) => [p, h("br")]), h("strong", {}, `Total \u2248 ${money(ans)}`)),
      actions(button(i === rounds.length - 1 ? "See my result" : "Next", () => {
        i++;
        ask();
      }, "primary"))
    );
    focusHeading(app2());
  }
  function end() {
    finishGame(g, Math.round(pts / (rounds.length * 2) * 100), miss, h("p", { class: "pgx-prose" }, "Rule of thumb: price = hours \xD7 rate, plus buffer, plus rush, plus usage. Never quote the pure work time alone."));
  }
  ask();
}
function scamScore(item, marked, verdictScam) {
  const signals = item.parts.map((p, idx) => p.s ? idx : -1).filter((x) => x >= 0);
  const verdictOK = verdictScam === item.scam;
  const hits = signals.filter((idx) => marked.has(idx)).length;
  const falseAlarms = [...marked].filter((idx) => !item.parts[idx].s).length;
  let pts = verdictOK ? 2 : 0;
  if (item.scam) pts += signals.length ? Math.max(0, (hits - falseAlarms * 0.5) / signals.length) * 2 : 0;
  else pts += falseAlarms === 0 ? 2 : Math.max(0, 2 - falseAlarms);
  return { pts: Math.min(4, pts), verdictOK, hits, falseAlarms, total: signals.length };
}
function scamChunks(item) {
  if (item.parts.length > 1) return item.parts.map((p) => ({ t: p.t, s: !!p.s }));
  return item.parts[0].t.split(/(?<=[.!?])\s+/).filter(Boolean).map((t) => ({ t: `${t} `, s: false }));
}
function spotScam(g) {
  const rounds = shuffle(g.pool).slice(0, g.rounds);
  let i = 0, pts = 0;
  const miss = [];
  function ask() {
    if (i >= rounds.length) return end();
    const r = rounds[i];
    const chunks = scamChunks(r);
    const marked = /* @__PURE__ */ new Set();
    const view = h("p", { class: "pgx-quote", "data-focus": true }, chunks.map((c, idx) => h("button", { type: "button", class: "pgx-mark", "aria-pressed": "false", onclick: (e) => {
      const el = e.currentTarget;
      if (marked.has(idx)) {
        marked.delete(idx);
        el.setAttribute("aria-pressed", "false");
      } else {
        marked.add(idx);
        el.setAttribute("aria-pressed", "true");
      }
    } }, c.t)));
    mount(
      app2(),
      topBar(g, i, rounds.length),
      h("p", { class: "pgx-help", style: "margin-bottom:0.5rem" }, "Tap any part that looks suspicious. Leave it alone if it looks fine. Then give your verdict."),
      view,
      h(
        "div",
        { class: "pgx-flags" },
        h("button", { type: "button", class: "pgx-flag green", onclick: () => verdict(r, chunks, marked, false) }, "\u2705 Looks legit"),
        h("button", { type: "button", class: "pgx-flag red", onclick: () => verdict(r, chunks, marked, true) }, "\u{1F6A8} Scam")
      )
    );
    focusHeading(app2());
  }
  function verdict(r, chunks, marked, saidScam) {
    const sc = scamScore({ scam: r.scam, parts: chunks }, marked, saidScam);
    pts += sc.pts;
    if (sc.pts < 3) miss.push({ q: `${chunks.map((c) => c.t).join("").slice(0, 60)}\u2026`, why: r.why });
    const reveal = h("p", { class: "pgx-quote" }, chunks.map((c, idx) => {
      const m = marked.has(idx);
      const cls = c.s ? m ? "hit" : "fa" : m ? "miss" : "";
      return cls ? h("span", { class: `pgx-mark ${cls}` }, c.t) : document.createTextNode(c.t);
    }));
    const showReveal = r.scam || sc.falseAlarms > 0;
    mount(
      app2(),
      topBar(g, i, rounds.length),
      feedbackBlock(sc.verdictOK ? 2 : 0, r.why, sc.verdictOK ? `Right: this is ${r.scam ? "a scam" : "legit"}` : `This one is ${r.scam ? "a scam" : "legit"}`),
      showReveal && h("p", { class: "pgx-meta", style: "margin-top:0.7rem" }, r.scam ? `You found ${sc.hits} of ${sc.total} warning signs. Green = caught, orange = missed, red = false alarm.` : "Red = a false alarm. Nothing in this message is a warning sign."),
      showReveal && reveal,
      actions(button(i === rounds.length - 1 ? "See my result" : "Next", () => {
        i++;
        ask();
      }, "primary"))
    );
    focusHeading(app2());
  }
  function end() {
    finishGame(g, Math.round(pts / (rounds.length * 4) * 100), miss, h("p", { class: "pgx-prose" }, "Common scam signs: fees to start, urgency, secrecy, asking for logins, overpayment, and leaving the platform."));
  }
  ask();
}
function daily() {
  const dk = todayKey();
  const rng = mulberry32(seedFrom(`hdp-${dk}`));
  const rounds = shuffle(dailyPool(), rng).slice(0, 5).map((q) => ({ ...q, opts: shuffle(q.choices.map((t, idx) => ({ t, ok: idx === q.correct })), rng) }));
  let i = 0, right = 0;
  const miss = [];
  const g = { id: "daily", title: "Daily challenge" };
  function ask() {
    if (i >= rounds.length) return end();
    const r = rounds[i];
    mount(
      app2(),
      topBar(g, i, rounds.length),
      h("p", { class: "pgx-meta" }, r.game),
      h("blockquote", { class: "pgx-quote", "data-focus": true }, r.prompt),
      h("div", { class: "pgx-choices" }, r.opts.map((o) => h("button", { type: "button", class: "pgx-choice", onclick: () => answer(r, o) }, h("span", { class: "dot", "aria-hidden": "true" }), h("span", { class: "lbl" }, o.t))))
    );
    focusHeading(app2());
  }
  function answer(r, o) {
    if (o.ok) right++;
    else miss.push({ q: r.prompt.slice(0, 60) + "\u2026", why: r.why });
    mount(app2(), topBar(g, i, rounds.length), h("blockquote", { class: "pgx-quote" }, r.prompt), feedbackBlock(o.ok ? 2 : 0, r.why, o.ok ? "Correct" : `Answer: ${r.opts.find((x) => x.ok).t}`), actions(button(i === rounds.length - 1 ? "See my result" : "Next", () => {
      i++;
      ask();
    }, "primary")));
    focusHeading(app2());
  }
  function end() {
    const score = Math.round(right / rounds.length * 100);
    state.set(`daily.${dk}`, { score, at: Date.now() });
    grantOnce(`daily:${dk}`, 15, "daily-player");
    pgUnlock("daily-player");
    track("daily_completed", { score });
    const streak = dailyStreak();
    mount(
      app2(),
      h("p", { class: "pgh-eyebrow" }, "Daily challenge \xB7 done"),
      h("h2", { class: "pgx-big", "data-focus": true }, `${right} of ${rounds.length}`),
      h("p", { class: "pgx-lede" }, `\u{1F525} ${streak}-day streak. Come back tomorrow for five new ones.`),
      miss.length > 0 && [h("h3", { class: "pgx-h3" }, "Worth another look"), h("ul", { class: "pgx-prose", style: "padding-left:1.1rem" }, miss.map((r) => h("li", {}, h("strong", {}, r.q), " ", r.why)))],
      actions(button("All games", lobby, "primary"))
    );
    focusHeading(app2());
  }
  ask();
}
function init5() {
  if (!app2()) return;
  $("#gr-noscript")?.remove();
  lobby();
  renderNextUp($("#gr-next"), { current: "game-room", articles: ["how-to-get-paid-as-a-freelancer"] });
  const want = location.hash.slice(1);
  if (want === "daily") daily();
  else if (GAMES.some((g) => g.id === want)) startGame(want);
}
if (typeof document !== "undefined") init5();

// js/templates.js
import { TEMPLATES as TEMPLATES4, TEMPLATE_CATEGORIES } from "../data/playground.js";
var app3 = () => $("#tp-app");
function fillParts(body, fields, values) {
  const byId = Object.fromEntries(fields.map((f) => [f.id, f]));
  return body.split(/(\{\{\w+\}\})/g).filter((x) => x !== "").map((chunk) => {
    const m = chunk.match(/^\{\{(\w+)\}\}$/);
    if (!m) return { text: chunk };
    const v = String(values[m[1]] ?? "").trim();
    return v ? { text: v } : { text: `[${byId[m[1]]?.label || m[1]}]`, gap: true };
  });
}
var fillText = (body, fields, values) => fillParts(body, fields, values).map((p) => p.text).join("");
function worksheetText(t, values) {
  const get = (id) => String(values[id] ?? "").trim();
  if (t.format === "bullets") {
    return t.sections.map((s, i) => {
      const [a, w, o] = ["a", "w", "o"].map((k) => get(`${k}${i + 1}`));
      return a || w || o ? `- ${[a, w].filter(Boolean).join(" ")}${o ? `, ${o}` : ""}.` : null;
    }).filter(Boolean).join("\n") || "(Fill in at least one bullet to see it here.)";
  }
  if (t.format === "offer") {
    const g = (id, label) => get(id) || `[${label}]`;
    return `I help ${g("who", "who you help")} who struggle with ${g("problem", "their problem")}.

What you get: ${g("outcome", "the outcome")}.
Included: ${g("includes", "what is included")}.
Price: ${g("price", "price")}.
Proof: ${g("proof", "proof")}.`;
  }
  const out = [t.title, ""];
  for (const s of t.sections) {
    out.push(s.title.toUpperCase());
    for (const f of s.fields) out.push(`${f.label}: ${get(f.id) || "(blank)"}`);
    out.push("");
  }
  const extra = goalPlan(t, values);
  if (extra) out.push(extra);
  return out.join("\n").trim();
}
function goalPlan(t, values) {
  if (t.calc !== "goal-90") return "";
  const target = Number(values.target) || 0;
  const have = Number(values.have) || 0;
  if (target <= 0) return "";
  const left = Math.max(0, target - have);
  if (left === 0) return "You have already reached this goal. Set a bigger one!";
  return `90-DAY MATH
Still to go: ${money(left)}
Per month: ${money(left / 3)}
Per week: ${money(left / 13)}`;
}
function trackerTotals(t, rows) {
  if (!t.totals) return null;
  const { by, amount, plus, minus } = t.totals;
  let inc = 0, exp = 0;
  rows.forEach((r) => {
    const n = Number(r[amount]) || 0;
    if (r[by] === plus) inc += n;
    else if (r[by] === minus) exp += n;
  });
  return { inc, exp, net: inc - exp };
}
function trackerCSV(t, rows) {
  const esc = (v) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [t.columns.map((c) => esc(c.label)).join(","), ...rows.map((r) => t.columns.map((c) => esc(r[c.id])).join(","))].join("\n");
}
function trackerPlain(t, rows) {
  const lines = rows.filter((r) => t.columns.some((c) => String(r[c.id] ?? "").trim())).map((r) => t.columns.map((c) => r[c.id] || "-").join(" | "));
  const tot = trackerTotals(t, rows);
  return [t.title, t.columns.map((c) => c.label).join(" | "), ...lines, tot ? `
Income ${money(tot.inc)} \xB7 Expenses ${money(tot.exp)} \xB7 Profit ${money(tot.net)}` : ""].join("\n");
}
function used(id, how) {
  state.set(`templates.used.${id}`, Date.now());
  const n = Object.keys(state.get("templates.used", {})).length;
  markDone("templates");
  grantOnce(`tpl:${id}`, 10);
  if (n >= 3) {
    grantOnce("tpl-3", 30, "resource-girl");
    pgUnlock("resource-girl");
  }
  track("template_used", { id, how });
}
var filter = "All";
var query = "";
function gallery() {
  const root = app3();
  const q = query.trim().toLowerCase();
  const shown = TEMPLATES4.filter((t) => (filter === "All" || t.category === filter) && (!q || `${t.title} ${t.blurb} ${t.category} ${t.type}`.toLowerCase().includes(q)));
  const usedCount = Object.keys(state.get("templates.used", {})).length;
  const list2 = h("ul", { class: "pgx-cards", "aria-label": "Templates" });
  const fill = () => {
    mount(list2, shown.length === 0 ? h("li", { class: "pgx-empty" }, "No templates match that search. Try a shorter word.") : shown.map((t) => h("li", {}, h(
      "a",
      { class: "pgx-card", href: `#${t.id}` },
      h("span", { class: "icon", "aria-hidden": "true" }, t.icon),
      h("h3", {}, t.title),
      h("p", {}, t.blurb),
      h("div", { class: "row" }, h("span", { class: "pgx-pill" }, t.category), h("span", { class: "pgx-pill" }, { text: "Script", checklist: "Checklist", tracker: "Tracker", worksheet: "Worksheet" }[t.type]), h("span", { class: "pgx-meta" }, t.time), state.get(`templates.used.${t.id}`) && h("span", { class: "pgx-pill good" }, "Used \u2713"))
    ))));
  };
  const search = h("input", { type: "search", class: "pgx-input", placeholder: "Search templates\u2026", "aria-label": "Search templates", value: query, maxlength: 60 });
  search.addEventListener("input", () => {
    query = search.value;
    const qq = query.trim().toLowerCase();
    shown.length = 0;
    shown.push(...TEMPLATES4.filter((t) => (filter === "All" || t.category === filter) && (!qq || `${t.title} ${t.blurb} ${t.category} ${t.type}`.toLowerCase().includes(qq))));
    fill();
  });
  mount(
    root,
    usedCount > 0 && h("p", { class: "pgx-meta", style: "margin-bottom:0.6rem" }, `You have used ${usedCount} of ${TEMPLATES4.length} templates.`),
    search,
    h("div", { class: "pgx-chips", role: "group", "aria-label": "Filter by category", style: "margin-top:0.8rem" }, ["All", ...TEMPLATE_CATEGORIES].map((c) => h("button", { type: "button", class: "pgx-chip", "aria-pressed": String(c === filter), onclick: () => {
      filter = c;
      gallery();
    } }, c))),
    list2
  );
  fill();
}
function shell(t, ...body) {
  return h(
    "div",
    { id: "tpl-print" },
    h("a", { class: "pgx-back", href: "#", onclick: (e) => {
      e.preventDefault();
      history.pushState("", document.title, location.pathname + location.search);
      route();
    } }, "\u2190 All templates"),
    h("p", { class: "pgh-eyebrow" }, `${t.category} \xB7 ${t.time}`),
    h("h2", { class: "pgx-title", style: "font-size:clamp(1.7rem,7vw,2.3rem)", "data-focus": true }, `${t.icon} ${t.title}`),
    h("p", { class: "pgx-lede" }, t.blurb),
    t.who && h("p", { class: "pgx-meta" }, `Best for: ${t.who}`),
    t.tips && h("ul", { class: "pgx-tips" }, t.tips.map((x) => h("li", {}, x))),
    ...body
  );
}
function field(f, value, onInput, idPrefix) {
  const id = `${idPrefix}-${f.id}`;
  const common = { class: "pgx-input", id, placeholder: f.ph || "", maxlength: 800 };
  const el = f.type === "textarea" ? h("textarea", { ...common, rows: 4 }) : h("input", { ...common, type: f.type === "number" ? "number" : "text", inputmode: f.type === "number" ? "decimal" : void 0 });
  el.value = value ?? "";
  el.addEventListener("input", () => onInput(f.id, el.value));
  return h("label", { class: `pgx-field${f.type === "textarea" ? " full" : ""}`, for: id }, h("span", {}, f.label), el);
}
function statusLine() {
  return h("p", { class: "pgx-status", role: "status", "aria-live": "polite" });
}
function flash(el, msg) {
  el.textContent = msg;
  setTimeout(() => {
    if (el.textContent === msg) el.textContent = "";
  }, 2200);
}
function openText(t) {
  const draft = state.get(`templates.drafts.${t.id}`, {});
  const preview = h("div", { class: "pgx-pre", "aria-live": "polite" });
  const st = statusLine();
  const redraw = () => mount(preview, fillParts(t.body, t.fields, draft).map((p) => p.gap ? h("span", { class: "gap" }, p.text) : p.text));
  const save = (id, v) => {
    draft[id] = v;
    state.set(`templates.drafts.${t.id}`, draft);
    redraw();
  };
  mount(app3(), shell(
    t,
    h("div", { class: "pgx-form-grid" }, t.fields.map((f) => field(f, draft[f.id], save, `f-${t.id}`))),
    h("h3", { class: "pgx-h3" }, "Preview"),
    preview,
    st,
    outputActions(t, () => fillText(t.body, t.fields, draft), st, () => {
      state.set(`templates.drafts.${t.id}`, {});
      Object.keys(draft).forEach((k) => delete draft[k]);
      openText(t);
    })
  ));
  redraw();
}
function outputActions(t, getText, st, reset) {
  return actions(
    button("Copy", async () => {
      const ok = await copyText(getText());
      flash(st, ok ? "Copied to your clipboard \u2713" : "Copy is not available here. Select the text and copy it.");
      if (ok) used(t.id, "copy");
    }, "primary"),
    button("Download", () => {
      downloadText(`${t.id}.txt`, getText());
      flash(st, "Downloaded \u2713");
      used(t.id, "download");
    }, "soft"),
    button("Print / PDF", () => {
      used(t.id, "print");
      window.print();
    }, "soft"),
    button("Clear", () => {
      if (confirm("Clear everything you typed in this template?")) reset();
    }, "ghost")
  );
}
function openChecklist(t) {
  const saved2 = new Set(state.get(`templates.drafts.${t.id}.checked`, []));
  const total = t.items.length;
  const prog = h("div", {});
  const st = statusLine();
  const redraw = () => mount(prog, h("p", { class: "pgx-meta" }, `${saved2.size} of ${total} done (${pct(saved2.size, total)}%)`), progressBar(saved2.size, total, "Checklist progress"));
  const persist2 = () => state.set(`templates.drafts.${t.id}`, { checked: [...saved2] });
  const groups = [...new Set(t.items.map((i) => i.group))];
  const text = () => `${t.title}

${groups.map((g) => `${g}
${t.items.map((it, idx) => ({ ...it, idx })).filter((it) => it.group === g).map((it) => `[${saved2.has(it.idx) ? "x" : " "}] ${it.text}`).join("\n")}`).join("\n\n")}`;
  mount(app3(), shell(
    t,
    prog,
    groups.map((g) => [h("p", { class: "pgx-group" }, g), h("ul", { class: "pgx-checks" }, t.items.map((it, idx) => ({ ...it, idx })).filter((it) => it.group === g).map((it) => {
      const cb = h("input", { type: "checkbox", checked: saved2.has(it.idx) || void 0 });
      cb.addEventListener("change", () => {
        if (cb.checked) saved2.add(it.idx);
        else saved2.delete(it.idx);
        persist2();
        redraw();
        if (saved2.size === total) {
          announce("Checklist complete!");
          used(t.id, "complete");
        }
      });
      return h("li", {}, h("label", {}, cb, h("span", {}, it.text)));
    }))]),
    st,
    outputActions(t, text, st, () => {
      saved2.clear();
      persist2();
      openChecklist(t);
    })
  ));
  redraw();
}
function openTracker(t) {
  const blank = () => Object.fromEntries(t.columns.map((c) => [c.id, ""]));
  let rows = state.get(`templates.drafts.${t.id}.rows`, null) || Array.from({ length: t.seedRows || 3 }, blank);
  const persist2 = () => state.set(`templates.drafts.${t.id}`, { rows });
  const tbody = h("tbody", {});
  const totals = h("div", { class: "pgx-money", "aria-live": "polite" });
  const st = statusLine();
  const drawTotals = () => {
    const tot = trackerTotals(t, rows);
    if (!tot) {
      totals.hidden = true;
      return;
    }
    totals.hidden = false;
    mount(totals, h("strong", {}, "Totals: "), `Income ${money(tot.inc)} \xB7 Expenses ${money(tot.exp)} \xB7 `, h("strong", {}, `Profit ${money(tot.net)}`));
  };
  const drawRows = () => {
    mount(tbody, rows.map((r, ri) => h(
      "tr",
      {},
      t.columns.map((c) => {
        const el = c.type === "select" ? h("select", { "aria-label": `${c.label}, row ${ri + 1}` }, [h("option", { value: "" }, "-"), ...c.options.map((o) => h("option", { value: o }, o))]) : h("input", { type: c.type === "number" ? "number" : c.type === "date" ? "date" : "text", inputmode: c.type === "number" ? "decimal" : void 0, "aria-label": `${c.label}, row ${ri + 1}`, maxlength: 120 });
        el.value = r[c.id] ?? "";
        el.addEventListener("input", () => {
          r[c.id] = el.value;
          persist2();
          drawTotals();
        });
        return h("td", {}, el);
      }),
      h("td", {}, h("button", { type: "button", class: "pgx-btn pgx-btn-ghost", style: "min-height:2.2rem;padding:0.2rem 0.7rem", "aria-label": `Delete row ${ri + 1}`, onclick: () => {
        rows.splice(ri, 1);
        if (!rows.length) rows.push(blank());
        persist2();
        drawRows();
        drawTotals();
      } }, "\u2715"))
    )));
  };
  mount(app3(), shell(
    t,
    h(
      "div",
      { class: "pgx-table-wrap", tabindex: "0", role: "region", "aria-label": `${t.title} table, scrolls sideways on small screens` },
      h("table", { class: "pgx-table" }, h("thead", {}, h("tr", {}, [...t.columns.map((c) => h("th", { scope: "col" }, c.label)), h("th", { scope: "col" }, h("span", { class: "pgx-sr" }, "Delete"))])), tbody)
    ),
    h("div", { class: "pgx-actions" }, button("+ Add a row", () => {
      rows.push(blank());
      persist2();
      drawRows();
    }, "soft")),
    totals,
    st,
    actions(
      button("Copy", async () => {
        const ok = await copyText(trackerPlain(t, rows));
        flash(st, ok ? "Copied \u2713" : "Copy is not available here.");
        if (ok) used(t.id, "copy");
      }, "primary"),
      button("Download CSV", () => {
        downloadText(`${t.id}.csv`, trackerCSV(t, rows), "text/csv");
        flash(st, "Downloaded \u2713 (opens in Excel or Sheets)");
        used(t.id, "download");
      }, "soft"),
      button("Print / PDF", () => {
        used(t.id, "print");
        window.print();
      }, "soft"),
      button("Clear", () => {
        if (confirm("Clear every row in this tracker?")) {
          rows = Array.from({ length: t.seedRows || 3 }, blank);
          persist2();
          openTracker(t);
        }
      }, "ghost")
    )
  ));
  drawRows();
  drawTotals();
}
function openWorksheet(t) {
  const draft = state.get(`templates.drafts.${t.id}`, {});
  const preview = h("div", { class: "pgx-pre", "aria-live": "polite" });
  const st = statusLine();
  const redraw = () => {
    preview.textContent = worksheetText(t, draft);
  };
  const save = (id, v) => {
    draft[id] = v;
    state.set(`templates.drafts.${t.id}`, draft);
    redraw();
  };
  mount(app3(), shell(
    t,
    t.sections.map((s, si) => h("div", { class: "pgx-panel", style: "margin-top:0.9rem" }, h("h3", { class: "pgx-h3", style: "margin-top:0" }, s.title), h("div", { class: "pgx-form-grid" }, s.fields.map((f) => field(f, draft[f.id], save, `w-${t.id}-${si}`))))),
    h("h3", { class: "pgx-h3" }, "Your summary"),
    preview,
    st,
    outputActions(t, () => worksheetText(t, draft), st, () => {
      state.set(`templates.drafts.${t.id}`, {});
      openWorksheet(t);
    })
  ));
  redraw();
}
function route() {
  const id = decodeURIComponent(location.hash.slice(1));
  const t = TEMPLATES4.find((x) => x.id === id);
  if (!t) {
    gallery();
    document.title = "Free Girlie Templates | Her Digital Playbook";
    return;
  }
  ({ text: openText, checklist: openChecklist, tracker: openTracker, worksheet: openWorksheet })[t.type](t);
  document.title = `${t.title} | Free Template | Her Digital Playbook`;
  focusHeading(app3());
  scrollToEl($("#tp-top") || app3());
  announce(`Opened ${t.title}`);
}
function init6() {
  if (!app3()) return;
  $("#tp-noscript")?.remove();
  window.addEventListener("hashchange", route);
  route();
  renderNextUp($("#tp-next"), { current: "templates", articles: ["how-to-get-paid-as-a-freelancer", "how-to-get-your-first-freelance-client"] });
}
if (typeof document !== "undefined") init6();

// js/glossary.js
import { GLOSSARY as GLOSSARY4, GLOSSARY_CATEGORIES } from "../data/playground.js";
var slugOf4 = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
var norm = (s) => String(s).toLowerCase();
function withinOne2(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, e = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++e > 1) return false;
    if (a.length > b.length) i++;
    else if (a.length < b.length) j++;
    else {
      i++;
      j++;
    }
  }
  return e + (a.length - i) + (b.length - j) <= 1;
}
function scoreTerm(entry, query2) {
  const q = norm(query2).trim();
  if (!q) return 1;
  const term = norm(entry.term);
  if (term === q) return 100;
  if (term.startsWith(q)) return 80;
  const termWords = term.split(/[^a-z0-9]+/).filter(Boolean);
  if (termWords.some((w) => w === q || w.startsWith(q))) return 60;
  if (term.includes(q)) return 50;
  if (norm(entry.category).includes(q)) return 30;
  const text = norm(`${entry.def} ${entry.girlie} ${entry.example} ${entry.why}`);
  if (text.includes(q)) return 20;
  const qs = q.split(/\s+/).filter((w) => w.length >= 5);
  if (qs.length && qs.every((w) => termWords.some((tw) => tw.length >= 5 && withinOne2(tw, w)))) return 10;
  const all = q.split(/\s+/).filter(Boolean);
  if (all.length > 1 && all.every((w) => text.includes(w) || term.includes(w))) return 15;
  return 0;
}
var seen = () => new Set(state.get("glossary.seen", []));
var saved = () => new Set(state.get("glossary.saved", []));
var ui = { q: "", cat: "All", letter: "", onlySaved: false };
var items = [];
function entryOf(li) {
  return GLOSSARY4.find((g) => slugOf4(g.term) === li.dataset.slug);
}
function applyFilter() {
  const list2 = $("#gl-list");
  const sv = saved();
  const scored = items.map((li, idx) => {
    const g = entryOf(li);
    const okCat = ui.cat === "All" || g.category === ui.cat;
    const okLetter = !ui.letter || g.term[0].toUpperCase() === ui.letter;
    const okSaved = !ui.onlySaved || sv.has(g.term);
    const s = scoreTerm(g, ui.q);
    return { li, idx, show: okCat && okLetter && okSaved && s > 0, s };
  });
  const ordered = ui.q.trim() ? scored.slice().sort((a, b) => b.s - a.s || a.idx - b.idx) : scored.slice().sort((a, b) => a.idx - b.idx);
  ordered.forEach(({ li, show }) => {
    li.hidden = !show;
    list2.append(li);
  });
  const n = scored.filter((x) => x.show).length;
  $("#gl-count").textContent = n === GLOSSARY4.length ? `${n} terms` : `${n} of ${GLOSSARY4.length} terms`;
  $("#gl-empty").hidden = n !== 0;
  $("#gl-empty-saved").hidden = !(n === 0 && ui.onlySaved && sv.size === 0);
  const letterPool = items.filter((li) => {
    const g = entryOf(li);
    return (ui.cat === "All" || g.category === ui.cat) && (!ui.onlySaved || sv.has(g.term)) && scoreTerm(g, ui.q) > 0;
  }).map((li) => entryOf(li).term[0].toUpperCase());
  $$("#gl-letters button").forEach((b) => {
    b.disabled = b.dataset.l !== "" && !letterPool.includes(b.dataset.l);
    b.setAttribute("aria-pressed", String(b.dataset.l === ui.letter));
  });
}
function buildTools() {
  const tools = $("#gl-tools");
  const search = h("input", { type: "search", class: "pgx-input", id: "gl-q", placeholder: "Search a term or a meaning\u2026", "aria-label": "Search the glossary", maxlength: 60, autocomplete: "off" });
  let t;
  search.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => {
      ui.q = search.value;
      ui.letter = "";
      applyFilter();
    }, 120);
  });
  const letters = [...new Set(GLOSSARY4.map((g) => g.term[0].toUpperCase()))].sort();
  mount(
    tools,
    h("label", { class: "pgx-sr", for: "gl-q" }, "Search the glossary"),
    search,
    h(
      "div",
      { class: "pgx-chips", role: "group", "aria-label": "Filter by category", style: "margin-top:0.8rem" },
      ["All", ...GLOSSARY_CATEGORIES].map((c) => h("button", { type: "button", class: "pgx-chip", dataset: { cat: c }, "aria-pressed": String(c === ui.cat), onclick: () => {
        ui.cat = c;
        ui.letter = "";
        $$("#gl-tools [data-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === c)));
        applyFilter();
      } }, c)),
      h("button", { type: "button", class: "pgx-chip", id: "gl-saved-btn", "aria-pressed": "false", onclick: (e) => {
        ui.onlySaved = !ui.onlySaved;
        e.currentTarget.setAttribute("aria-pressed", String(ui.onlySaved));
        applyFilter();
      } }, "\u2661 Saved")
    ),
    h("div", { class: "pgx-letters", id: "gl-letters", role: "group", "aria-label": "Jump to letter" }, [{ l: "", t: "A-Z" }, ...letters.map((l) => ({ l, t: l }))].map((x) => h("button", { type: "button", class: "pgx-chip", dataset: { l: x.l }, "aria-pressed": String(x.l === ui.letter), onclick: () => {
      ui.letter = ui.letter === x.l ? "" : x.l;
      applyFilter();
    } }, x.t))),
    h("p", { class: "pgx-meta", id: "gl-count", "aria-live": "polite" })
  );
}
function enhanceItem(li) {
  const g = entryOf(li);
  const det = $("details", li);
  const body = $(".pgx-term-body", li);
  const btn = h("button", { type: "button", class: "pgx-btn pgx-btn-ghost", style: "min-height:2.4rem;padding:0.3rem 1rem;font-size:0.85rem", "aria-pressed": String(saved().has(g.term)) }, saved().has(g.term) ? "\u2665 Saved" : "\u2661 Save");
  btn.addEventListener("click", () => {
    const sv = saved();
    if (sv.has(g.term)) sv.delete(g.term);
    else sv.add(g.term);
    state.set("glossary.saved", [...sv]);
    btn.setAttribute("aria-pressed", String(sv.has(g.term)));
    btn.textContent = sv.has(g.term) ? "\u2665 Saved" : "\u2661 Save";
    announce(sv.has(g.term) ? `Saved ${g.term}` : `Removed ${g.term}`);
    updateSavedBtn();
    if (ui.onlySaved) applyFilter();
  });
  body.append(btn);
  det.addEventListener("toggle", () => {
    if (!det.open) return;
    const s = seen();
    if (!s.has(g.term)) {
      s.add(g.term);
      state.set("glossary.seen", [...s]);
      progressNote();
      if (s.size >= 10) markDone("glossary");
      if (s.size >= 25) {
        grantOnce("gloss-25", 40, "digital-dictionary");
        pgUnlock("digital-dictionary");
      } else if (s.size === 5) grantOnce("gloss-5", 10);
    }
  });
}
function updateSavedBtn() {
  const b = $("#gl-saved-btn");
  if (b) b.textContent = `\u2661 Saved${saved().size ? ` (${saved().size})` : ""}`;
}
function progressNote() {
  const n = seen().size;
  const el = $("#gl-progress");
  if (!el) return;
  mount(el, h("p", { class: "pgx-meta" }, `You have opened ${n} of ${GLOSSARY4.length} terms.`, n < 25 ? ` Open ${25 - n} more to earn the Digital Dictionary badge.` : " Badge earned!"), progressBar(n, GLOSSARY4.length, "Terms explored"));
}
function termOfTheDay() {
  const box = $("#gl-tod");
  if (!box) return;
  const rng = mulberry32(seedFrom(`tod-${todayKey()}`));
  const g = GLOSSARY4[Math.floor(rng() * GLOSSARY4.length)];
  mount(box, h("p", { class: "pgh-eyebrow" }, "Term of the day"), h("h2", { class: "pgx-h2" }, g.term), h("p", { class: "pgx-prose", style: "margin:0 0 0.6rem" }, g.girlie), h("a", { class: "pgx-link", href: `#${slugOf4(g.term)}` }, "See the full explanation \u2192"));
}
function openFromHash() {
  const slug = decodeURIComponent(location.hash.slice(1));
  if (!slug) return;
  const li = items.find((x) => x.dataset.slug === slug);
  if (!li) return;
  ui = { q: "", cat: "All", letter: "", onlySaved: false };
  const s = $("#gl-q");
  if (s) s.value = "";
  $$("#gl-tools [data-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === "All")));
  $("#gl-saved-btn")?.setAttribute("aria-pressed", "false");
  applyFilter();
  const det = $("details", li);
  det.open = true;
  li.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  $("summary", li).focus({ preventScroll: true });
}
function nextBox(box, correct) {
  return correct ? Math.min(3, (box || 1) + 1) : 1;
}
function startCards() {
  const boxes = state.get("glossary.box", {});
  const pool = GLOSSARY4.map((g) => ({ g, box: boxes[g.term] || 1 }));
  const due = shuffle(pool.filter((p) => p.box < 3)).sort((a, b) => a.box - b.box).slice(0, 10);
  const deck = due.length ? due : shuffle(pool).slice(0, 10);
  let i = 0, got = 0;
  const again = [];
  const root = $("#gl-cards");
  $("#gl-browse").hidden = true;
  root.hidden = false;
  const mastered = pool.filter((p) => p.box >= 3).length;
  function ask() {
    if (i >= deck.length) return end();
    const { g } = deck[i];
    let flipped = false;
    const face = h("div", { class: "pgx-flash", "aria-live": "polite" }, g.term);
    const controls = h("div", { class: "pgx-actions" });
    const showFront = () => mount(controls, button("Show the meaning", flip, "primary"));
    function flip() {
      flipped = true;
      mount(face, h("span", {}, g.term, h("small", {}, g.girlie, h("br"), h("em", {}, `Example: ${g.example}`))));
      mount(controls, button("Still learning", () => grade(false), "soft"), button("Got it", () => grade(true), "primary"));
      announce(`${g.term}. ${g.girlie}`);
    }
    function grade(ok) {
      boxes[g.term] = nextBox(boxes[g.term], ok);
      state.set("glossary.box", boxes);
      if (ok) got++;
      else again.push(g);
      i++;
      ask();
    }
    mount(
      root,
      h("div", { class: "pgx-stephead" }, h("span", {}, "Flashcards"), h("span", {}, `${i + 1} of ${deck.length}`)),
      progressBar(i, deck.length, "Flashcard progress"),
      h("p", { class: "pgx-help", style: "margin:0.8rem 0 0.5rem" }, "What does this mean, in your own words?"),
      face,
      controls,
      h("p", {}, h("button", { type: "button", class: "pgx-btn pgx-btn-ghost", onclick: stopCards }, "Stop"))
    );
    showFront();
    void flipped;
  }
  function end() {
    grantOnce("gloss-cards", 20);
    track("glossary_cards", { got, total: deck.length });
    mount(
      root,
      h("p", { class: "pgh-eyebrow" }, "Flashcards \xB7 done"),
      h("h2", { class: "pgx-big", "data-focus": true }, `${got} of ${deck.length}`),
      h("p", { class: "pgx-lede" }, `${Object.values(state.get("glossary.box", {})).filter((b) => b >= 3).length} terms mastered so far. Terms you missed will come back sooner.`),
      again.length > 0 && [h("h3", { class: "pgx-h3" }, "Review these"), h("ul", { class: "pgx-reads-list" }, again.map((g) => h("li", {}, h("a", { href: `#${slugOf4(g.term)}`, onclick: stopCards }, g.term), h("span", { class: "pgx-meta" }, ` \xB7 ${g.girlie}`))))],
      actions(button("Another round", startCards, "primary"), button("Back to the glossary", stopCards, "ghost"))
    );
    focusHeading(root);
  }
  void mastered;
  ask();
}
function stopCards() {
  $("#gl-cards").hidden = true;
  $("#gl-browse").hidden = false;
}
function init7() {
  const list2 = $("#gl-list");
  if (!list2) return;
  $("#gl-noscript")?.remove();
  items = $$("li[data-slug]", list2);
  items.forEach(enhanceItem);
  buildTools();
  $("#gl-start-cards")?.addEventListener("click", startCards);
  $("#gl-tools").hidden = false;
  $("#gl-actions").hidden = false;
  applyFilter();
  updateSavedBtn();
  progressNote();
  termOfTheDay();
  window.addEventListener("hashchange", openFromHash);
  openFromHash();
  renderNextUp($("#gl-next"), { current: "glossary", articles: ["digital-skills-for-beginners"] });
}
if (typeof document !== "undefined") init7();
