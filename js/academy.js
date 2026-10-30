// js/ac-pages.js
import { getEnrolledCourseIds, getProgress as getProgress2, courseProgressPct, computeCompletion, getNextLesson, getCourseState, COURSE_STATE_LABELS } from "./academy-engine.js";

// js/ac-util.js
import { ACADEMY_COURSES, findCourse } from "../data/academy.js";
var $ = (s, r = document) => r.querySelector(s);
var $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
function h(tag, props = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v === false || v == null) continue;
    if (k === "class") el.className = v;
    else if (k === "dataset") Object.assign(el.dataset, v);
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v === true) el.setAttribute(k, "");
    else el.setAttribute(k, String(v));
  }
  add(el, kids);
  return el;
}
function add(el, kids) {
  for (const k of kids.flat(Infinity)) {
    if (k === false || k == null) continue;
    el.append(k instanceof Node ? k : document.createTextNode(String(k)));
  }
}
var mount = (el, ...kids) => {
  el.replaceChildren();
  add(el, kids);
  return el;
};
var clamp = (n, a, b) => Math.min(b, Math.max(a, n));
var pct = (a, b) => b ? Math.round(a / b * 100) : 0;
var plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
function bringIntoView(el, { focus = true } = {}) {
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  requestAnimationFrame(() => {
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    if (focus) {
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    }
  });
}
var live;
function say(msg) {
  if (!live) {
    live = h("div", { class: "ac-sr", role: "status", "aria-live": "polite" });
    document.body.append(live);
  }
  live.textContent = "";
  setTimeout(() => {
    live.textContent = msg;
  }, 30);
}
var NS = "hdp-academy-x-";
var mem = {};
function load(key, fb) {
  try {
    const r = localStorage.getItem(NS + key);
    return r == null ? key in mem ? mem[key] : fb : JSON.parse(r);
  } catch {
    return key in mem ? mem[key] : fb;
  }
}
function save(key, val) {
  mem[key] = val;
  try {
    localStorage.setItem(NS + key, JSON.stringify(val));
    return true;
  } catch {
    return false;
  }
}
var allLessons = (c) => c.modules.flatMap((m) => m.lessons.map((l) => ({ m, l })));
var lessonsOnly = (c) => allLessons(c).filter(({ l }) => l.type !== "assessment" && l.type !== "capstone");
function courseHours(c) {
  const t = parseFloat(c.duration?.total);
  return Number.isFinite(t) ? t : Math.round(c.lessonCount * 0.25);
}
function courseStats(c) {
  return { modules: c.modules.length, lessons: lessonsOnly(c).length, assessments: c.modules.filter((m) => m.lessons.some((l) => l.type === "assessment")).length, projects: (c.projects || []).length, capstone: !!c.capstone, hours: courseHours(c) };
}
var LEVEL_ORDER = { Beginner: 1, Intermediate: 2, Advanced: 3 };
var getNote = (cid, lid) => load("notes", {})[`${cid}:${lid}`] || "";
function setNote(cid, lid, text) {
  const n = load("notes", {});
  if (text.trim()) n[`${cid}:${lid}`] = text;
  else delete n[`${cid}:${lid}`];
  save("notes", n);
}
var getBookmarks = () => load("bookmarks", []);
var isBookmarked = (cid, lid) => getBookmarks().some((b) => b.c === cid && b.l === lid);
function toggleBookmark(cid, lid) {
  const b = getBookmarks();
  const i = b.findIndex((x) => x.c === cid && x.l === lid);
  if (i >= 0) b.splice(i, 1);
  else b.push({ c: cid, l: lid, at: Date.now() });
  save("bookmarks", b);
  return i < 0;
}
var getMissed = () => load("missed", []);
function recordQuestion(cid, lid, qi, q, correct) {
  const id = `${cid}:${lid}:${qi}`;
  let deck = getMissed().filter((x) => x.id !== id);
  if (!correct) deck.push({ id, c: cid, l: lid, q: q.q, options: q.options, correct: q.correct, at: Date.now() });
  save("missed", deck.slice(-120));
}
var dayKey = (d = /* @__PURE__ */ new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
function logStudy(minutes = 1) {
  const log = load("studylog", {});
  const k = dayKey();
  log[k] = (log[k] || 0) + minutes;
  const keys = Object.keys(log).sort().slice(-120);
  const out = {};
  keys.forEach((x) => {
    out[x] = log[x];
  });
  save("studylog", out);
}
function studyStreak() {
  const log = load("studylog", {});
  let n = 0;
  const d = /* @__PURE__ */ new Date();
  if (!log[dayKey(d)]) d.setDate(d.getDate() - 1);
  while (log[dayKey(d)]) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
var minutesStudied = () => Object.values(load("studylog", {})).reduce((a, b) => a + b, 0);
function lastDays(n = 7) {
  const log = load("studylog", {});
  const out = [];
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() - (n - 1));
  for (let i = 0; i < n; i++) {
    out.push({ day: dayKey(d), label: d.toLocaleDateString(void 0, { weekday: "narrow" }), min: log[dayKey(d)] || 0 });
    d.setDate(d.getDate() + 1);
  }
  return out;
}
var link = {
  course: (id, extra = {}) => `course.html?${new URLSearchParams({ id, ...extra })}`,
  cert: (id) => `certificate.html?id=${encodeURIComponent(id)}`
};
var fmtDate = (iso, opts = { day: "numeric", month: "long", year: "numeric" }) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", opts);
};

// js/ac-pages.js
import { CAREER_GOALS, LEARNING_PATHS, START_ROUTES } from "../data/academy.js";

// js/ac-cert.js
import { computeOverallScore, getProgress, checkAcademyBadges } from "./academy-engine.js";
var CERTS_KEY = "hdp-academy-certificates";
var NAME_KEY = "hdp-academy-x-name";
var SALT = "hdp-academy-v2";
var rd = (k, fb) => {
  try {
    const r = localStorage.getItem(k);
    return r == null ? fb : JSON.parse(r);
  } catch {
    return fb;
  }
};
var wr = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
    return true;
  } catch {
    return false;
  }
};
var getCertificates = () => rd(CERTS_KEY, []);
var getCertificateForCourse = (cid) => getCertificates().find((c) => c.courseId === cid) || null;
var getCertificateById = (id) => getCertificates().find((c) => c.certificateId === id) || null;
function getLockedName() {
  const saved = rd(NAME_KEY, null);
  if (saved?.name) return saved;
  const first = getCertificates().find((c) => c.learnerName);
  if (first) return { name: first.learnerName, lockedAt: first.issuedAt || first.completionDate || null, inherited: true };
  return null;
}
function validateName(raw) {
  const name = String(raw || "").replace(/\s+/g, " ").trim();
  const bad = ["undefined", "null", "[object object]", "learner name", "your name", "name"];
  if (name.length < 2) return { ok: false, name, reason: "Please enter the name you want on your certificate." };
  if (name.length > 60) return { ok: false, name, reason: "Please keep the name to 60 characters or fewer." };
  if (bad.includes(name.toLowerCase())) return { ok: false, name, reason: "Please enter your real name." };
  if (!/[A-Za-z\u00C0-\u024F\u0400-\u04FF\u0600-\u06FF\u4E00-\u9FFF]/.test(name)) return { ok: false, name, reason: "The name needs at least one letter." };
  if (/[<>{}[\]\\|^~`]/.test(name)) return { ok: false, name, reason: "Please remove special symbols from the name." };
  return { ok: true, name, reason: null };
}
function lockName(raw) {
  if (getLockedName()) return { ok: false, reason: "Your certificate name is already set and cannot be changed." };
  const v = validateName(raw);
  if (!v.ok) return v;
  wr(NAME_KEY, { name: v.name, lockedAt: (/* @__PURE__ */ new Date()).toISOString() });
  return { ok: true, name: v.name };
}
var CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function randomCode(n = 6) {
  const a = new Uint32Array(n);
  (window.crypto || {}).getRandomValues ? crypto.getRandomValues(a) : a.forEach((_, i) => {
    a[i] = Math.floor(Math.random() * 4e9);
  });
  return [...a].map((x) => CHARS[x % CHARS.length]).join("");
}
var gradeFor = (s) => s >= 90 ? "Distinction" : s >= 80 ? "Merit" : "Pass";
function tzLabel(date = /* @__PURE__ */ new Date()) {
  const off = -date.getTimezoneOffset();
  const sign = off >= 0 ? "+" : "-";
  const a = Math.abs(off);
  const hh = String(Math.floor(a / 60)).padStart(2, "0");
  const mm = String(a % 60).padStart(2, "0");
  let name = "";
  try {
    name = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
  }
  return `UTC${sign}${hh}:${mm}${name ? ` (${name})` : ""}`;
}
function formatIssued(cert) {
  if (!cert.issuedAt) return cert.completionDate ? new Date(cert.completionDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
  const d = new Date(cert.issuedAt);
  const date = d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  return `${date}, ${time} ${cert.tz || tzLabel(d)}`;
}
var formatIssuedUTC = (cert) => cert.issuedAt ? `${new Date(cert.issuedAt).toISOString().replace("T", " ").slice(0, 19)} UTC` : "";
function issueCertificate(course2, courseHours2) {
  const existing = getCertificateForCourse(course2.id);
  if (existing) return { ok: true, cert: existing, created: false };
  const locked = getLockedName();
  if (!locked) return { ok: false, reason: "name-required" };
  const score = computeOverallScore(course2, getProgress(course2.id));
  const now = /* @__PURE__ */ new Date();
  const cert = {
    certificateId: `HDP-${course2.code}-${now.getFullYear()}-${randomCode()}`,
    courseId: course2.id,
    courseTitle: course2.title,
    learnerName: locked.name,
    skills: course2.certificateSkills || [],
    level: course2.difficulty,
    hours: courseHours2,
    score,
    grade: gradeFor(score),
    issuedAt: now.toISOString(),
    tz: tzLabel(now),
    completionDate: now.toISOString().slice(0, 10)
  };
  const all = getCertificates();
  all.push(cert);
  if (!wr(CERTS_KEY, all)) return { ok: false, reason: "storage" };
  try {
    checkAcademyBadges();
  } catch {
  }
  return { ok: true, cert, created: true };
}
function cyrb(str) {
  let h1 = 3735928559, h2 = 1103547991;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36).padStart(11, "0");
}
var b64 = (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
var unb64 = (s) => decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))));
function verifyPayload(c) {
  const body = JSON.stringify({ i: c.certificateId, n: c.learnerName, c: c.courseTitle, t: c.issuedAt || c.completionDate, s: c.score ?? null, g: c.grade || null });
  return `${b64(body)}.${cyrb(body + SALT)}`;
}
function verifyUrl(c) {
  const base = new URL("verify.html", location.href);
  base.hash = `v=${verifyPayload(c)}`;
  return base.href;
}
function parseVerify(hash) {
  const m = String(hash || "").match(/v=([A-Za-z0-9_-]+)\.([a-z0-9]+)/);
  if (!m) return { ok: false, reason: "No certificate details found in this link." };
  let body;
  try {
    body = unb64(m[1]);
  } catch {
    return { ok: false, reason: "This link is damaged." };
  }
  if (cyrb(body + SALT) !== m[2]) return { ok: false, reason: "The details in this link do not match its checksum, so they may have been changed." };
  try {
    return { ok: true, data: JSON.parse(body) };
  } catch {
    return { ok: false, reason: "This link is damaged." };
  }
}
var esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
var W = 1123;
var H = 794;
function sealPath(cx, cy, r1, r2, n) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const a = Math.PI * i / n - Math.PI / 2;
    const r = i % 2 ? r2 : r1;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}
function fit(text, base, max) {
  const n = text.length;
  return n <= max ? base : Math.max(34, Math.floor(base * (max / n)));
}
function certificateSVG(cert) {
  const name = esc(cert.learnerName), title = esc(cert.courseTitle);
  const nameSize = fit(cert.learnerName, 64, 22), titleSize = fit(cert.courseTitle, 38, 34);
  const skills = (cert.skills || []).slice(0, 6).join("   \u2022   ");
  const issued = formatIssued(cert);
  const verify = `herdigitalplaybook.com/pages/verify.html`;
  const grade = cert.grade ? esc(cert.grade.toUpperCase()) : "";
  const serif = "Georgia, 'Times New Roman', 'Noto Serif', serif";
  const sans = "'Helvetica Neue', Arial, 'Noto Sans', sans-serif";
  const orn = (x, y, fx, fy) => `<g transform="translate(${x} ${y}) scale(${fx} ${fy})" fill="none" stroke="url(#gold)" stroke-width="2"><path d="M0 0 H54 M0 0 V54"/><path d="M10 10 H34 M10 10 V34" stroke-width="1.2"/><circle cx="4" cy="4" r="4" fill="url(#gold)" stroke="none"/></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Certificate of completion for ${name}, ${title}">
<defs>
<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9cf8e"/><stop offset=".5" stop-color="#b8893c"/><stop offset="1" stop-color="#f0dca4"/></linearGradient>
<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf8"/><stop offset="1" stop-color="#fdf1ee"/></linearGradient>
<linearGradient id="plum" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a0f33"/><stop offset="1" stop-color="#7a1a4b"/></linearGradient>
<radialGradient id="sealg" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#f7e4a8"/><stop offset=".6" stop-color="#c89a45"/><stop offset="1" stop-color="#8c6422"/></radialGradient>
<pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#d43e68" opacity=".07"/></pattern>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#dots)"/>
<rect x="26" y="26" width="${W - 52}" height="${H - 52}" fill="none" stroke="url(#plum)" stroke-width="6"/>
<rect x="42" y="42" width="${W - 84}" height="${H - 84}" fill="none" stroke="url(#gold)" stroke-width="2"/>
<rect x="52" y="52" width="${W - 104}" height="${H - 104}" fill="none" stroke="#d43e68" stroke-width=".8" opacity=".5"/>
${orn(60, 60, 1, 1)}${orn(W - 60, 60, -1, 1)}${orn(60, H - 60, 1, -1)}${orn(W - 60, H - 60, -1, -1)}
<text x="${W / 2}" y="112" text-anchor="middle" font-family="${sans}" font-size="15" letter-spacing="7" fill="#7a1a4b" font-weight="700">THE PLAYBOOK ACADEMY</text>
<text x="${W / 2}" y="136" text-anchor="middle" font-family="${sans}" font-size="11" letter-spacing="4" fill="#9b7a86">BY HER DIGITAL PLAYBOOK</text>
<line x1="${W / 2 - 60}" y1="152" x2="${W / 2 + 60}" y2="152" stroke="url(#gold)" stroke-width="2"/>
<text x="${W / 2}" y="214" text-anchor="middle" font-family="${serif}" font-size="50" font-style="italic" fill="#3b0d2a">Certificate of Completion</text>
<text x="${W / 2}" y="268" text-anchor="middle" font-family="${sans}" font-size="14" letter-spacing="3" fill="#8a6b77">THIS IS TO CERTIFY THAT</text>
<text x="${W / 2}" y="352" text-anchor="middle" font-family="${serif}" font-size="${nameSize}" font-style="italic" font-weight="700" fill="#d43e68">${name}</text>
<line x1="${W / 2 - 280}" y1="376" x2="${W / 2 + 280}" y2="376" stroke="url(#gold)" stroke-width="1.5"/>
<text x="${W / 2}" y="418" text-anchor="middle" font-family="${sans}" font-size="15" fill="#6b5560">has successfully completed all lessons, assessments, projects and the capstone of</text>
<text x="${W / 2}" y="472" text-anchor="middle" font-family="${serif}" font-size="${titleSize}" font-weight="700" fill="#3b0d2a">${title}</text>
${grade ? `<g transform="translate(${W / 2} 508)"><rect x="-96" y="-17" width="192" height="30" rx="15" fill="url(#plum)"/><text y="4" text-anchor="middle" font-family="${sans}" font-size="12" letter-spacing="3" fill="#f6e3b0" font-weight="700">${grade}${cert.score != null ? ` \xB7 ${cert.score}%` : ""}</text></g>` : ""}
${skills ? `<text x="${W / 2}" y="552" text-anchor="middle" font-family="${sans}" font-size="13" fill="#7a1a4b" font-weight="600">${esc(skills)}</text>` : ""}
<text x="${W / 2}" y="574" text-anchor="middle" font-family="${sans}" font-size="11.5" fill="#9b8590">${esc(cert.level || "")}${cert.hours ? ` \xB7 approx. ${esc(cert.hours)} hours of learning` : ""}</text>
<g transform="translate(${W / 2} 665)">
 <polygon points="${sealPath(0, 0, 62, 55, 28)}" fill="url(#sealg)"/>
 <circle r="46" fill="none" stroke="#fdf0c8" stroke-width="2"/><circle r="40" fill="none" stroke="#8c6422" stroke-width=".8"/>
 <path d="M-22 40 L-34 92 L-18 80 L-8 98 L2 44Z" fill="#7a1a4b"/><path d="M22 40 L34 92 L18 80 L8 98 L-2 44Z" fill="#d43e68"/>
 <polygon points="${sealPath(0, -4, 20, 8, 5)}" fill="#fdf0c8" opacity=".9"/>
 <text y="26" text-anchor="middle" font-family="${sans}" font-size="9" letter-spacing="2" fill="#4a0f33" font-weight="800">HDP ACADEMY</text>
</g>
<g font-family="${sans}">
 <text x="120" y="652" font-size="10.5" letter-spacing="2" fill="#9b8590">ISSUED</text>
 <text x="120" y="674" font-size="13.5" fill="#3b0d2a" font-weight="600">${esc(issued)}</text>
 <text x="120" y="696" font-size="10.5" fill="#9b8590">${esc(cert.issuedAt ? formatIssuedUTC(cert) : "")}</text>
 <text x="${W - 120}" y="652" text-anchor="end" font-size="10.5" letter-spacing="2" fill="#9b8590">CERTIFICATE ID</text>
 <text x="${W - 120}" y="674" text-anchor="end" font-size="15" fill="#3b0d2a" font-weight="700" letter-spacing="1">${esc(cert.certificateId)}</text>
 <text x="${W - 120}" y="696" text-anchor="end" font-size="10.5" fill="#9b8590">Verify at ${verify}</text>
</g>
<path d="M${W / 2 + 190} 700 C ${W / 2 + 230} 676, ${W / 2 + 250} 724, ${W / 2 + 290} 690 S ${W / 2 + 340} 700, ${W / 2 + 360} 694" fill="none" stroke="#7a1a4b" stroke-width="1.6" opacity=".0"/>
</svg>`;
}
var svgDataUrl = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
function svgToCanvas(svg, scale = 2) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = W * scale;
      c.height = H * scale;
      const x = c.getContext("2d");
      x.fillStyle = "#fffdf8";
      x.fillRect(0, 0, c.width, c.height);
      x.drawImage(img, 0, 0, c.width, c.height);
      resolve(c);
    };
    img.onerror = () => reject(new Error("Could not draw the certificate image."));
    img.src = svgDataUrl(svg);
  });
}
var canvasBlob = (canvas, type, q) => new Promise((res, rej) => canvas.toBlob((b) => b ? res(b) : rej(new Error("Could not create the file.")), type, q));
function fileBase(cert) {
  const safe = (s) => String(s).replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `Playbook-Academy-${safe(cert.courseTitle)}-${safe(cert.learnerName)}`;
}
function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.append(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 800);
}
async function pngBlob(cert) {
  return canvasBlob(await svgToCanvas(certificateSVG(cert), 2), "image/png");
}
function svgBlob(cert) {
  return new Blob([certificateSVG(cert)], { type: "image/svg+xml" });
}
async function pdfBlob(cert) {
  const canvas = await svgToCanvas(certificateSVG(cert), 2.4);
  const jpg = new Uint8Array(await (await canvasBlob(canvas, "image/jpeg", 0.95)).arrayBuffer());
  const enc = new TextEncoder();
  const parts = [];
  const offsets = [];
  let len = 0;
  const push = (d) => {
    const b = typeof d === "string" ? enc.encode(d) : d;
    parts.push(b);
    len += b.length;
  };
  const obj = (n, fn) => {
    offsets[n] = len;
    push(`${n} 0 obj
`);
    fn();
    push("\nendobj\n");
  };
  const pw = 841.89, ph = 595.28;
  const stamp = (cert.issuedAt ? new Date(cert.issuedAt) : /* @__PURE__ */ new Date()).toISOString().replace(/[-:T]/g, "").slice(0, 14);
  const pdfStr = (s) => `(${String(s).replace(/[\\()]/g, "\\$&").replace(/[^\x20-\x7E]/g, "?")})`;
  push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  obj(1, () => push("<< /Type /Catalog /Pages 2 0 R >>"));
  obj(2, () => push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>"));
  obj(3, () => push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pw} ${ph}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`));
  obj(4, () => {
    push(`<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>
stream
`);
    push(jpg);
    push("\nendstream");
  });
  const content = `q ${pw} 0 0 ${ph} 0 0 cm /Im0 Do Q`;
  obj(5, () => push(`<< /Length ${content.length} >>
stream
${content}
endstream`));
  obj(6, () => push(`<< /Title ${pdfStr(`${cert.courseTitle} - Certificate of Completion`)} /Author ${pdfStr("The Playbook Academy by Her Digital Playbook")} /Subject ${pdfStr(`${cert.learnerName} - ${cert.certificateId}`)} /Creator ${pdfStr("Her Digital Playbook")} /CreationDate (D:${stamp}Z) >>`));
  const xref = len;
  push(`xref
0 7
0000000000 65535 f 
${[1, 2, 3, 4, 5, 6].map((n) => `${String(offsets[n]).padStart(10, "0")} 00000 n 
`).join("")}`);
  push(`trailer
<< /Size 7 /Root 1 0 R /Info 6 0 R >>
startxref
${xref}
%%EOF`);
  return new Blob(parts, { type: "application/pdf" });
}
function shareText(cert, url) {
  return `I just earned my certificate in ${cert.courseTitle} from The Playbook Academy by Her Digital Playbook${cert.grade ? ` (${cert.grade})` : ""}. \u{1F393}

Certificate ID: ${cert.certificateId}
Verify it: ${url}`;
}
function shareLinks(cert, url) {
  const t = shareText(cert, url);
  const q = encodeURIComponent;
  const d = new Date(cert.issuedAt || Date.now());
  return [
    { id: "linkedin-profile", label: "Add to LinkedIn profile", href: `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${q(cert.courseTitle)}&organizationName=${q("The Playbook Academy by Her Digital Playbook")}&issueYear=${d.getFullYear()}&issueMonth=${d.getMonth() + 1}&certId=${q(cert.certificateId)}&certUrl=${q(url)}` },
    { id: "linkedin", label: "Post on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${q(url)}` },
    { id: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${q(t)}` },
    { id: "x", label: "X (Twitter)", href: `https://twitter.com/intent/tweet?text=${q(t.split("\n\n")[0])}&url=${q(url)}` },
    { id: "facebook", label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${q(url)}` },
    { id: "telegram", label: "Telegram", href: `https://t.me/share/url?url=${q(url)}&text=${q(t.split("\n\n")[0])}` },
    { id: "email", label: "Email", href: `mailto:?subject=${q(`My ${cert.courseTitle} certificate`)}&body=${q(t)}` }
  ];
}
async function nativeShare(cert, url) {
  if (!navigator.share) return { ok: false, reason: "unsupported" };
  try {
    const data = { title: `${cert.courseTitle} certificate`, text: shareText(cert, url).split("\n\n")[0], url };
    try {
      const file = new File([await pngBlob(cert)], `${fileBase(cert)}.png`, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) data.files = [file];
    } catch {
    }
    await navigator.share(data);
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e?.name === "AbortError" ? "cancelled" : "failed" };
  }
}
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;opacity:0;top:0";
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

// js/ac-pages.js
var catColor = (cat) => ({ "Digital & Tech": "c1", "Marketing": "c2", "Creative": "c3", "Business": "c4", "Career": "c5" })[cat] || `c${cat.length % 5 + 1}`;
var CAT_ICON = (cat) => /tech/i.test(cat) ? "\u{1F4BB}" : /market/i.test(cat) ? "\u{1F4C8}" : /creat|design/i.test(cat) ? "\u{1F3A8}" : /business|money|freelanc/i.test(cat) ? "\u{1F4BC}" : /career|work/i.test(cat) ? "\u{1F680}" : "\u{1F393}";
function courseCard(c, mode = "catalog") {
  const st = courseStats(c), pr = getProgress2(c.id), enrolled = getEnrolledCourseIds().includes(c.id), p = courseProgressPct(c, pr);
  const state = COURSE_STATE_LABELS[getCourseState(c, pr)];
  return h(
    "a",
    { class: `ac-ccard ${catColor(c.category)}`, href: link.course(c.id) },
    h("div", { class: "ac-ccard-top" }, h("span", { class: "ac-ccard-icon", "aria-hidden": "true" }, CAT_ICON(c.category)), h("span", { class: "ac-pill" }, c.difficulty)),
    h(
      "div",
      { class: "ac-ccard-body" },
      h("span", { class: "ac-eyebrow" }, c.category),
      h("h3", {}, c.title),
      h("p", {}, c.description),
      h("ul", { class: "ac-chips ac-chips-sm" }, (c.certificateSkills || []).slice(0, 3).map((s) => h("li", {}, s)))
    ),
    h("div", { class: "ac-ccard-foot" }, h("span", {}, `${st.hours} hrs \xB7 ${st.lessons} lessons`), enrolled ? h("span", { class: "ac-pill good" }, p ? `${p}% \xB7 ${state}` : state) : h("span", { class: "ac-ccard-go" }, "Start free \u2192"))
  );
}
function initCatalog() {
  const root2 = $("#ac-catalog");
  if (!root2) return;
  const cats = ["All", ...new Set(ACADEMY_COURSES.map((c) => c.category))];
  const levels = ["All levels", "Beginner", "Intermediate", "Advanced"];
  const q = { text: "", cat: "All", level: "All levels", sort: "recommended" };
  const grid = $("#ac-grid"), count = $("#ac-count"), empty = $("#ac-empty");
  const enrolled = getEnrolledCourseIds();
  const cont = $("#ac-continue");
  if (cont && enrolled.length) {
    const items = enrolled.map((id) => findCourse(id)).filter(Boolean).map((c) => ({ c, pr: getProgress2(c.id), p: 0 })).map((x) => ({ ...x, p: courseProgressPct(x.c, x.pr) })).filter((x) => x.p < 100).slice(0, 3);
    if (items.length) {
      cont.hidden = false;
      mount($("#ac-continue-list"), items.map(({ c, pr, p }) => {
        const n = getNextLesson(c, pr);
        const href = n ? link.course(c.id, n.lesson.type === "assessment" ? { assessment: n.module.id } : n.lesson.type === "capstone" ? { capstone: 1 } : { lesson: n.lesson.id }) : link.course(c.id, { claim: 1 });
        return h("li", {}, h("a", { class: "ac-resume", href }, h("span", { class: "ac-eyebrow" }, "Resume"), h("strong", {}, c.title), h("span", { class: "ac-muted ac-small" }, n ? n.lesson.title : "Ready for your certificate"), h("div", { class: "ac-bar" }, h("span", { style: `width:${p}%` })), h("span", { class: "ac-small" }, `${p}% complete`)));
      }));
    }
  }
  const apply = () => {
    const t = q.text.trim().toLowerCase();
    let list = ACADEMY_COURSES.filter((c) => (q.cat === "All" || c.category === q.cat) && (q.level === "All levels" || c.difficulty === q.level) && (!t || `${c.title} ${c.description} ${c.category} ${(c.certificateSkills || []).join(" ")} ${(c.tools || []).join(" ")} ${(c.learningOutcomes || []).join(" ")}`.toLowerCase().includes(t)));
    if (q.sort === "level") list = list.sort((a, b) => LEVEL_ORDER[a.difficulty] - LEVEL_ORDER[b.difficulty] || a.title.localeCompare(b.title));
    else if (q.sort === "short") list = list.sort((a, b) => courseStats(a).hours - courseStats(b).hours);
    else if (q.sort === "az") list = list.sort((a, b) => a.title.localeCompare(b.title));
    mount(grid, list.map((c) => h("li", {}, courseCard(c))));
    count.textContent = `${plural(list.length, "course")}${q.text || q.cat !== "All" || q.level !== "All levels" ? " match" : ""}`;
    empty.hidden = list.length > 0;
  };
  const search = $("#ac-search");
  let st;
  search.addEventListener("input", () => {
    clearTimeout(st);
    st = setTimeout(() => {
      q.text = search.value;
      apply();
    }, 150);
  });
  mount($("#ac-cats"), cats.map((c) => h("button", { type: "button", class: "ac-chip", "aria-pressed": String(c === q.cat), onclick: (e) => {
    q.cat = c;
    $$("#ac-cats .ac-chip").forEach((b) => b.setAttribute("aria-pressed", String(b === e.currentTarget)));
    apply();
  } }, c)));
  const lv = $("#ac-level");
  mount(lv, levels.map((l) => h("option", { value: l }, l)));
  lv.addEventListener("change", () => {
    q.level = lv.value;
    apply();
  });
  const so = $("#ac-sort");
  so.addEventListener("change", () => {
    q.sort = so.value;
    apply();
  });
  $("#ac-clear")?.addEventListener("click", () => {
    q.text = "";
    q.cat = "All";
    q.level = "All levels";
    search.value = "";
    lv.value = "All levels";
    $$("#ac-cats .ac-chip").forEach((b, i) => b.setAttribute("aria-pressed", String(i === 0)));
    apply();
  });
  apply();
  mount($("#ac-goals"), CAREER_GOALS.map((g) => h("li", {}, h("button", { type: "button", class: "ac-goal", onclick: () => showGoal(g) }, h("span", { "aria-hidden": "true" }, g.icon), h("strong", {}, g.label), h("small", {}, `${g.courseIds.length} courses`)))));
  const goalOut = $("#ac-goal-out");
  function showGoal(g) {
    const total = g.courseIds.map((id) => findCourse(id)).filter(Boolean);
    const hrs = total.reduce((a, c) => a + courseStats(c).hours, 0);
    goalOut.hidden = false;
    mount(goalOut, h("div", { class: "ac-card" }, h("p", { class: "ac-eyebrow" }, "Your route"), h("h3", { class: "ac-h3", "data-top": true }, `${g.icon} ${g.label}`), h("p", { class: "ac-muted" }, `${plural(total.length, "course")} in this order, about ${Math.round(hrs)} hours in total.`), h("ol", { class: "ac-route" }, total.map((c, i) => h("li", {}, h("a", { href: link.course(c.id) }, h("span", { class: "ac-route-n" }, i + 1), h("span", {}, h("strong", {}, c.title), h("small", {}, `${c.difficulty} \xB7 ${courseStats(c).hours} hrs`))))))));
    bringIntoView(goalOut, { focus: false });
  }
  mount($("#ac-paths"), LEARNING_PATHS.map((p) => {
    const cs = p.courseIds.map((id) => findCourse(id)).filter(Boolean);
    const done = cs.filter((c) => courseProgressPct(c, getProgress2(c.id)) >= 100).length;
    return h("li", {}, h("div", { class: "ac-path" }, h("span", { class: "ac-path-i", "aria-hidden": "true" }, p.icon), h("h3", {}, p.label), h("p", { class: "ac-muted ac-small" }, `${plural(cs.length, "course")} \xB7 ${done} complete`), h("div", { class: "ac-bar" }, h("span", { style: `width:${pct(done, cs.length)}%` })), h("a", { class: "ac-link", href: link.course(cs[0].id) }, "Start this path \u2192")));
  }));
  mount($("#ac-routes"), START_ROUTES.map((r) => h("li", {}, h("button", { type: "button", class: "ac-chip", onclick: () => showGoal({ icon: "\u{1F9ED}", label: r.label.replace(/\.$/, ""), courseIds: r.courseIds }) }, r.label))));
  const stats = $("#ac-stats");
  if (stats) {
    const L = ACADEMY_COURSES.reduce((a, c) => a + courseStats(c).lessons, 0);
    const hrs = ACADEMY_COURSES.reduce((a, c) => a + courseStats(c).hours, 0);
    mount(stats, [[ACADEMY_COURSES.length, "free courses"], [L, "lessons"], [Math.round(hrs), "hours of learning"], ["100%", "free certificates"]].map(([n, l]) => h("li", {}, h("strong", {}, n), h("span", {}, l))));
  }
}
function initDashboard() {
  const root2 = $("#ac-dash");
  if (!root2) return;
  const ids = getEnrolledCourseIds(), certs = getCertificates(), name = getLockedName()?.name;
  const rows = ids.map((id) => findCourse(id)).filter(Boolean).map((c) => {
    const pr = getProgress2(c.id);
    return { c, pr, p: courseProgressPct(c, pr), comp: computeCompletion(c, pr), n: getNextLesson(c, pr) };
  });
  const lessonsDone = rows.reduce((a, r) => a + r.pr.completedLessons.length, 0);
  const days = lastDays(7), max = Math.max(10, ...days.map((d) => d.min));
  const next = rows.filter((r) => r.p < 100).sort((a, b) => b.p - a.p)[0];
  const missed = getMissed(), marks = getBookmarks();
  mount(
    root2,
    h("header", { class: "ac-hero ac-hero-sm" }, h("div", { class: "ac-wrap" }, h("p", { class: "ac-eyebrow" }, "My Academy"), h("h1", { class: "ac-h1", "data-top": true }, name ? `Welcome back, ${name.split(" ")[0]}` : "Your learning"), h("p", { class: "ac-lede" }, rows.length ? "Pick up where you left off." : "Enrol in a course to start building your learning record."))),
    h(
      "div",
      { class: "ac-wrap ac-block" },
      h("ul", { class: "ac-stats ac-stats-dash" }, [[studyStreak(), "day streak \u{1F525}"], [Math.round(minutesStudied() / 6) / 10, "hours studied"], [lessonsDone, "lessons completed"], [certs.length, "certificates"]].map(([n, l]) => h("li", {}, h("strong", {}, n), h("span", {}, l)))),
      next && h(
        "div",
        { class: "ac-card ac-hero-card2" },
        h("p", { class: "ac-eyebrow" }, "Continue learning"),
        h("h2", { class: "ac-h2" }, next.c.title),
        h("p", { class: "ac-muted" }, next.n ? `Next: ${next.n.lesson.title}` : "You have finished everything. Time to claim your certificate."),
        h("div", { class: "ac-bar" }, h("span", { style: `width:${next.p}%` })),
        h("a", { class: "ac-btn ac-btn-primary", href: next.n ? link.course(next.c.id, next.n.lesson.type === "assessment" ? { assessment: next.n.module.id } : next.n.lesson.type === "capstone" ? { capstone: 1 } : { lesson: next.n.lesson.id }) : link.course(next.c.id, { claim: 1 }) }, next.n ? "Resume \u2192" : "Claim certificate \u2192")
      ),
      h("section", { class: "ac-block" }, h("h2", { class: "ac-h2" }, "This week"), h("div", { class: "ac-week", role: "img", "aria-label": `Minutes studied per day this week: ${days.map((d) => d.min).join(", ")}` }, days.map((d) => h("div", {}, h("span", { class: "ac-week-bar", style: `height:${Math.max(4, d.min / max * 100)}%` }), h("small", {}, d.label))))),
      h("section", { class: "ac-block" }, h("h2", { class: "ac-h2" }, "My courses"), rows.length ? h("ul", { class: "ac-cgrid" }, rows.map((r) => h("li", {}, courseCard(r.c)))) : h("div", { class: "ac-card" }, h("p", {}, "You have not started a course yet."), h("a", { class: "ac-btn ac-btn-primary", href: "academy.html#courses" }, "Browse courses"))),
      h("section", { class: "ac-block" }, h("h2", { class: "ac-h2" }, "My certificates"), certs.length ? h("ul", { class: "ac-cgrid" }, certs.map((c) => h("li", {}, h("a", { class: "ac-certcard", href: link.cert(c.certificateId) }, h("img", { src: svgDataUrl(certificateSVG(c)), alt: `Certificate: ${c.courseTitle}`, loading: "lazy" }), h("strong", {}, c.courseTitle), h("small", {}, `${c.grade ? `${c.grade} \xB7 ` : ""}Issued ${fmtDate(c.issuedAt || c.completionDate)}`))))) : h("p", { class: "ac-muted" }, "Finish a course to earn your first certificate.")),
      h(
        "section",
        { class: "ac-block ac-two-col" },
        h("div", { class: "ac-card" }, h("h2", { class: "ac-h3" }, `Review deck (${missed.length})`), missed.length ? [h("p", { class: "ac-muted ac-small" }, "Questions you missed. Answer them again to lock them in."), h("button", { type: "button", class: "ac-btn ac-btn-primary", onclick: () => startReview(missed) }, "Start a quick review")] : h("p", { class: "ac-muted ac-small" }, "Nothing to review. Questions you miss will appear here."), h("div", { id: "ac-review" })),
        h("div", { class: "ac-card" }, h("h2", { class: "ac-h3" }, `Saved lessons (${marks.length})`), marks.length ? h("ul", { class: "ac-rows" }, marks.slice().reverse().slice(0, 8).map((b) => {
          const c = findCourse(b.c);
          const l = c && allLessons(c).find((x) => x.l.id === b.l);
          return c && l ? h("li", {}, h("a", { class: "ac-row", href: link.course(c.id, { lesson: b.l }) }, h("span", { class: "ac-row-i" }, "\u2605"), h("span", { class: "ac-row-t" }, l.l.title), h("span", { class: "ac-row-m" }, c.title))) : null;
        })) : h("p", { class: "ac-muted ac-small" }, 'Tap "Save for later" inside any lesson.'))
      )
    )
  );
}
function startReview(deck) {
  const host = $("#ac-review");
  const qs = deck.slice(-10).reverse();
  let i = 0, ok = 0;
  const ask = () => {
    if (i >= qs.length) {
      mount(host, h("p", { class: "ac-note" }, `${ok} of ${qs.length} correct this round.`));
      return;
    }
    const q = qs[i];
    const fb = h("div", { "aria-live": "polite" });
    const opts = q.options.map((o, idx) => h("button", { type: "button", class: "ac-opt", onclick: (e) => {
      opts.forEach((b, k) => {
        b.disabled = true;
        if (k === q.correct) b.classList.add("right");
      });
      if (idx === q.correct) {
        ok++;
        const m = getMissed().filter((x) => x.id !== q.id);
        save("missed", m);
      } else e.currentTarget.classList.add("wrong");
      mount(fb, h("button", { type: "button", class: "ac-btn ac-btn-primary", onclick: () => {
        i++;
        ask();
      } }, i === qs.length - 1 ? "Finish" : "Next \u2192"));
      bringIntoView(fb, { focus: false });
    } }, h("span", { class: "ac-opt-dot", "aria-hidden": "true" }), o));
    mount(host, h("p", { class: "ac-small ac-muted" }, `Question ${i + 1} of ${qs.length}`), h("p", { class: "ac-q", "data-q": true }, q.q), h("div", { class: "ac-opts" }, opts), fb);
    bringIntoView($("[data-q]", host));
  };
  ask();
}
function initCertificate() {
  const root2 = $("#ac-cert");
  if (!root2) return;
  const p = new URLSearchParams(location.search);
  const cert = getCertificateById(p.get("id")) || p.get("course") && getCertificateForCourse(p.get("course"));
  if (!cert) {
    mount(root2, h("div", { class: "ac-wrap ac-claim" }, h("h1", { class: "ac-h1", "data-top": true }, "Certificate not found"), h("p", { class: "ac-lede" }, "This certificate is not saved on this device. Certificates are stored in the browser you earned them in. If you have a verification link, you can check it here."), h("div", { class: "ac-actions" }, h("a", { class: "ac-btn ac-btn-primary", href: "my-academy.html" }, "My Academy"), h("a", { class: "ac-btn ac-btn-ghost", href: "verify.html" }, "Verify a certificate"))));
    return;
  }
  const url = verifyUrl(cert), svg = certificateSVG(cert), src = svgDataUrl(svg);
  const status = h("p", { class: "ac-status", role: "status", "aria-live": "polite" });
  const flash = (m) => {
    status.textContent = m;
    say(m);
  };
  const run = async (label, fn) => {
    flash(`${label}\u2026`);
    try {
      await fn();
      flash(`${label} \u2713`);
    } catch (e) {
      flash(`Sorry, that did not work (${e.message}). Try the Print option instead.`);
    }
  };
  const name = fileBase(cert);
  const links = shareLinks(cert, url);
  const share = h("div", { class: "ac-share" }, links.map((l) => h("a", { class: "ac-sharebtn", href: l.href, target: "_blank", rel: "noopener noreferrer" }, l.label)));
  const nat = navigator.share ? h("button", { type: "button", class: "ac-btn ac-btn-ghost", onclick: async () => {
    const r = await nativeShare(cert, url);
    if (!r.ok && r.reason === "failed") flash("Sharing did not work here. Use one of the buttons below.");
  } }, "Share\u2026") : null;
  mount(
    root2,
    h(
      "div",
      { class: "ac-page ac-certpage" },
      p.get("new") && h("div", { class: "ac-confetti", role: "status" }, h("strong", {}, "\u{1F389} Congratulations!"), " Your certificate has been issued."),
      h(
        "div",
        { class: "ac-wrap" },
        h("a", { class: "ac-back", href: "my-academy.html" }, "\u2190 My Academy"),
        h("p", { class: "ac-eyebrow" }, "Certificate of completion"),
        h("h1", { class: "ac-h1 ac-h1-sm", "data-top": true }, cert.courseTitle),
        h("div", { class: "ac-certframe", id: "cert-print" }, h("img", { src, alt: `Certificate of completion awarded to ${cert.learnerName} for ${cert.courseTitle}, issued ${formatIssued(cert)}, ID ${cert.certificateId}`, width: 1123, height: 794 })),
        h("div", { class: "ac-card ac-certmeta" }, h("dl", {}, [["Awarded to", cert.learnerName], ["Course", cert.courseTitle], ["Result", cert.grade ? `${cert.grade} (${cert.score}%)` : "\u2014"], ["Issued", formatIssued(cert)], ["Issued (UTC)", formatIssuedUTC(cert) || "\u2014"], ["Certificate ID", cert.certificateId]].map(([k, v]) => h("div", {}, h("dt", {}, k), h("dd", {}, v))))),
        h("h2", { class: "ac-h2" }, "Get your certificate"),
        h(
          "div",
          { class: "ac-dl" },
          h("button", { type: "button", class: "ac-btn ac-btn-primary", onclick: () => run("Preparing PDF", async () => saveBlob(await pdfBlob(cert), `${name}.pdf`)) }, "\u2B07 Download PDF"),
          h("button", { type: "button", class: "ac-btn ac-btn-soft", onclick: () => run("Preparing image", async () => saveBlob(await pngBlob(cert), `${name}.png`)) }, "\u{1F5BC} Download image (PNG)"),
          h("button", { type: "button", class: "ac-btn ac-btn-soft", onclick: () => run("Preparing SVG", async () => saveBlob(svgBlob(cert), `${name}.svg`)) }, "Download SVG"),
          h("button", { type: "button", class: "ac-btn ac-btn-soft", onclick: () => {
            flash("Opening print\u2026");
            window.print();
          } }, "\u{1F5A8} Print")
        ),
        h("h2", { class: "ac-h2" }, "Share your achievement"),
        nat,
        share,
        h("div", { class: "ac-linkrow" }, h("input", { class: "ac-input", readonly: true, value: url, "aria-label": "Verification link", onfocus: (e) => e.target.select() }), h("button", { type: "button", class: "ac-btn ac-btn-ghost", onclick: async () => flash(await copyText(url) ? "Link copied \u2713" : "Copy failed. Select the link and copy it.") }, "Copy link"), h("button", { type: "button", class: "ac-btn ac-btn-ghost", onclick: async () => flash(await copyText(shareText(cert, url)) ? "Post text copied \u2713" : "Copy failed.") }, "Copy post text")),
        status,
        h("p", { class: "ac-muted ac-small" }, "Anyone with your verification link can check the details on your certificate. ", h("a", { href: "verify.html" }, "How verification works"))
      )
    )
  );
  bringIntoView($("[data-top]", root2), { focus: false });
  document.title = `${cert.courseTitle} Certificate | The Playbook Academy`;
}
function initVerify() {
  const root2 = $("#ac-verify");
  if (!root2) return;
  const show = () => {
    const hash = location.hash;
    const r = hash ? parseVerify(hash) : null;
    const local = (() => {
      const m = hash.match(/id=([A-Z0-9-]+)/i);
      return m ? getCertificateById(m[1]) : null;
    })();
    const input = h("input", { class: "ac-input", placeholder: "Paste a verification link here", "aria-label": "Verification link" });
    mount(root2, h(
      "div",
      { class: "ac-wrap ac-claim" },
      h("p", { class: "ac-eyebrow" }, "Certificate verification"),
      h("h1", { class: "ac-h1", "data-top": true }, "Verify a certificate"),
      r?.ok ? h("div", { class: "ac-card ac-verified" }, h("p", { class: "ac-pill good" }, "\u2713 Details match the checksum"), h("dl", {}, [["Awarded to", r.data.n], ["Course", r.data.c], ["Result", r.data.g ? `${r.data.g}${r.data.s != null ? ` (${r.data.s}%)` : ""}` : "\u2014"], ["Issued", r.data.t && r.data.t.length > 10 ? `${new Date(r.data.t).toLocaleString("en-GB", { dateStyle: "long", timeStyle: "medium" })} (${Intl.DateTimeFormat().resolvedOptions().timeZone})` : r.data.t], ["Certificate ID", r.data.i]].map(([k, v]) => h("div", {}, h("dt", {}, k), h("dd", {}, v)))), h("p", { class: "ac-muted ac-small" }, "This confirms the details in the link have not been edited since the certificate was issued. Certificates are issued by The Playbook Academy and saved in the learner's own browser, so this check cannot confirm the issuer on a server.")) : r ? h("div", { class: "ac-card" }, h("p", { class: "ac-pill bad" }, "\u2717 Could not verify"), h("p", {}, r.reason)) : [h("p", { class: "ac-lede" }, "Paste a certificate's verification link below, or open the link the learner shared with you. We check that the details (name, course, date, ID) have not been changed."), h("div", { class: "ac-linkrow" }, input, h("button", { type: "button", class: "ac-btn ac-btn-primary", onclick: () => {
        const m = input.value.match(/#(v=[^\s]+)/);
        if (m) {
          location.hash = m[1];
        } else say("That does not look like a verification link.");
      } }, "Verify"))]
    ));
    void local;
  };
  window.addEventListener("hashchange", show);
  show();
}

// js/ac-course.js
import { enrollCourse, getEnrolledCourseIds as getEnrolledCourseIds2, getProgress as getProgress3, markLessonComplete, recordAssessment, markProjectComplete, recordCapstone, computeCompletion as computeCompletion2, computeOverallScore as computeOverallScore2, courseProgressPct as courseProgressPct2, getNextLesson as getNextLesson2, getCourseState as getCourseState2, COURSE_STATE_LABELS as COURSE_STATE_LABELS2 } from "./academy-engine.js";
import { LEARNING_PATHS as LEARNING_PATHS2 } from "../data/academy.js";
var root = () => $("#ac-course");
var ICON = { concept: "\u{1F4D6}", "how-to": "\u{1F6E0}\uFE0F", workshop: "\u{1F9EA}", troubleshooting: "\u{1F527}", assessment: "\u{1F9E0}", capstone: "\u{1F3C6}", project: "\u{1F3AF}" };
var TYPE_LABEL = { concept: "Concept", "how-to": "How-to", workshop: "Workshop", troubleshooting: "Troubleshooting", assessment: "Assessment", capstone: "Capstone", project: "Project" };
var course;
var params;
var timer;
function sequence(c) {
  const seq = [];
  c.modules.forEach((m) => m.lessons.forEach((l) => {
    if (l.type === "capstone") return;
    if (l.type === "assessment") seq.push({ kind: "assessment", id: m.id, title: `${m.title}: Assessment`, module: m, lesson: l, duration: l.duration });
    else seq.push({ kind: "lesson", id: l.id, title: l.title, module: m, lesson: l, duration: l.duration });
  }));
  (c.projects || []).forEach((p) => seq.push({ kind: "project", id: p.id, title: p.title, project: p }));
  if (c.capstone) seq.push({ kind: "capstone", id: c.capstone.id, title: c.capstone.title });
  return seq;
}
var hrefFor = (it) => link.course(course.id, { [it.kind === "capstone" ? "capstone" : it.kind]: it.kind === "capstone" ? 1 : it.id });
function isDone(it, pr) {
  if (it.kind === "lesson") return pr.completedLessons.includes(it.id);
  if (it.kind === "assessment") return !!pr.assessments[it.id]?.passed;
  if (it.kind === "project") return pr.projectsCompleted.some((p) => p.id === it.id);
  return !!(pr.capstone.completed && pr.capstone.score >= 70);
}
var nextOf = (seq, it) => seq[seq.findIndex((s) => s.kind === it.kind && s.id === it.id) + 1] || null;
var prevOf = (seq, it) => seq[seq.findIndex((s) => s.kind === it.kind && s.id === it.id) - 1] || null;
function navigate(url, { replace = false } = {}) {
  history[replace ? "replaceState" : "pushState"]({}, "", url);
  render();
}
function onLink(e) {
  const a = e.target.closest("a[data-nav]");
  if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
  e.preventDefault();
  navigate(a.getAttribute("href"));
}
function render() {
  clearInterval(timer);
  params = new URLSearchParams(location.search);
  const pr = getProgress3(course.id);
  const seq = sequence(course);
  let view;
  if (params.get("lesson")) {
    const it = seq.find((s) => s.kind === "lesson" && s.id === params.get("lesson"));
    view = it ? lessonView(it, seq, pr) : overview(pr, seq);
  } else if (params.get("assessment")) {
    const it = seq.find((s) => s.kind === "assessment" && s.id === params.get("assessment"));
    view = it ? assessmentView(it, seq, pr) : overview(pr, seq);
  } else if (params.get("project")) {
    const it = seq.find((s) => s.kind === "project" && s.id === params.get("project"));
    view = it ? projectView(it, seq, pr) : overview(pr, seq);
  } else if (params.get("capstone")) view = course.capstone ? capstoneView(seq, pr) : overview(pr, seq);
  else if (params.get("claim")) view = claimView(pr);
  else view = overview(pr, seq);
  mount(root(), view);
  const heading = $("[data-top]", root());
  bringIntoView(heading);
  document.title = `${heading?.textContent || course.title} | ${course.title} | The Playbook Academy`;
  if (params.get("lesson") || params.get("assessment") || params.get("project") || params.get("capstone")) {
    let mins = 0;
    timer = setInterval(() => {
      if (!document.hidden) {
        mins++;
        logStudy(1);
      }
    }, 6e4);
  }
}
var crumb = () => h("nav", { class: "ac-crumb", "aria-label": "Breadcrumb" }, h("a", { href: "academy.html" }, "Academy"), " / ", h("a", { href: link.course(course.id), "data-nav": true }, course.title));
function ring(p, size = 64) {
  const r = (size - 8) / 2, c = 2 * Math.PI * r, ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${p}% complete`);
  svg.innerHTML = `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="currentColor" stroke-opacity=".15" stroke-width="6"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p / 100)}" transform="rotate(-90 ${size / 2} ${size / 2})"/><text x="50%" y="54%" text-anchor="middle" font-size="${size / 4.2}" font-weight="800" fill="currentColor">${p}%</text>`;
  const wrap = h("span", { class: "ac-ring" });
  wrap.append(svg);
  return wrap;
}
var bar = (v, label) => h("div", { class: "ac-bar", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": v, "aria-label": label }, h("span", { style: `width:${clamp(v, 0, 100)}%` }));
var btn = (label, onclick, kind = "primary", extra = {}) => h("button", { type: "button", class: `ac-btn ac-btn-${kind}`, onclick, ...extra }, label);
var navBtn = (label, href, kind = "primary") => h("a", { class: `ac-btn ac-btn-${kind}`, href, "data-nav": true }, label);
function overview(pr, seq) {
  const enrolled = getEnrolledCourseIds2().includes(course.id);
  const st = courseStats(course);
  const done = pct(seq.filter((s) => isDone(s, pr)).length, seq.length);
  const comp = computeCompletion2(course, pr);
  const cert = getCertificateForCourse(course.id);
  const next = getNextLesson2(course, pr);
  const state = COURSE_STATE_LABELS2[getCourseState2(course, pr)];
  const nextIt = seq.find((s) => !isDone(s, pr));
  const cta = cert ? navBtn("View my certificate", link.cert(cert.certificateId).replace(/^/, ""), "primary") : comp.isComplete ? navBtn("Claim my certificate \u{1F393}", link.course(course.id, { claim: 1 })) : enrolled && nextIt ? navBtn(done > 0 ? "Continue learning" : "Start the first lesson", hrefFor(nextIt)) : btn("Enroll for free", () => {
    enrollCourse(course.id);
    const first = seq[0];
    navigate(hrefFor(first));
  }, "primary");
  if (cert) cta.setAttribute("href", link.cert(cert.certificateId)), cta.removeAttribute("data-nav");
  const req = [
    ["Finish every lesson", comp.requiredLessonsCompleted, `${pr.completedLessons.length} of ${st.lessons} lessons`],
    ["Pass every module assessment (70%+)", comp.moduleAssessmentsPassed, `${Object.values(pr.assessments).filter((a) => a.passed).length} of ${st.assessments} passed`],
    st.projects ? ["Complete the projects", comp.projectsCompleted, `${pr.projectsCompleted.length} of ${st.projects} done`] : null,
    st.capstone ? ["Pass the capstone (70%+)", comp.capstonePassed, pr.capstone.completed ? `scored ${pr.capstone.score}%` : "not started"] : null,
    ["Overall score of 70% or more", comp.overallScore >= 70, `currently ${comp.overallScore}%`]
  ].filter(Boolean);
  return h(
    "div",
    { class: "ac-page" },
    h("header", { class: "ac-hero" }, h(
      "div",
      { class: "ac-wrap ac-hero-grid" },
      h(
        "div",
        {},
        crumb(),
        h("p", { class: "ac-eyebrow" }, `${course.category} \xB7 ${course.difficulty}`),
        h("h1", { class: "ac-h1", "data-top": true }, course.title),
        h("p", { class: "ac-lede" }, course.description),
        h(
          "ul",
          { class: "ac-facts" },
          h("li", {}, h("strong", {}, `${st.hours}`), " hours"),
          h("li", {}, h("strong", {}, st.modules), " modules"),
          h("li", {}, h("strong", {}, st.lessons), " lessons"),
          st.projects > 0 && h("li", {}, h("strong", {}, st.projects), plural(st.projects, " project").slice(1)),
          h("li", {}, "Free certificate")
        ),
        h("div", { class: "ac-cta-row" }, cta, enrolled && h("span", { class: "ac-pill" }, state))
      ),
      h(
        "aside",
        { class: "ac-hero-card", "aria-label": "Your progress" },
        h("p", { class: "ac-eyebrow" }, enrolled ? "Your progress" : "This course includes"),
        enrolled ? [h("div", { class: "ac-hero-ring" }, ring(done, 84), h("div", {}, h("strong", {}, `${pr.completedLessons.length}/${st.lessons} lessons`), h("span", {}, comp.overallScore ? `Overall score ${comp.overallScore}%` : "Score builds as you go"))), bar(done, "Course progress")] : h("ul", { class: "ac-includes" }, [`${st.lessons} lessons with knowledge checks`, `${st.assessments} module assessments`, st.projects ? `${plural(st.projects, "hands-on project")}` : null, st.capstone ? "A capstone you present your work in" : null, "Notes, bookmarks and a review deck", "Certificate with Pass, Merit or Distinction"].filter(Boolean).map((t) => h("li", {}, t)))
      )
    )),
    h(
      "div",
      { class: "ac-wrap ac-two" },
      h(
        "div",
        { class: "ac-main" },
        h(
          "section",
          { class: "ac-block" },
          h("h2", { class: "ac-h2" }, "What you will learn"),
          h("ul", { class: "ac-outcomes" }, (course.learningOutcomes || []).map((o) => h("li", {}, o)))
        ),
        h(
          "section",
          { class: "ac-block", id: "syllabus" },
          h("h2", { class: "ac-h2" }, "Syllabus"),
          h("p", { class: "ac-muted" }, `${st.modules} modules. Open a module to see its lessons.`),
          course.modules.map((m, mi) => {
            const lessons = m.lessons.filter((l) => l.type !== "capstone");
            const mDone = lessons.filter((l) => l.type === "assessment" ? pr.assessments[m.id]?.passed : pr.completedLessons.includes(l.id)).length;
            return h(
              "details",
              { class: "ac-mod", open: mi === 0 && !enrolled || nextIt?.module?.id === m.id || void 0 },
              h("summary", {}, h("span", { class: "ac-mod-n" }, mi + 1), h("span", { class: "ac-mod-t" }, m.title, h("small", {}, `${lessons.length} items`)), h("span", { class: "ac-mod-d" }, `${mDone}/${lessons.length}`)),
              h("p", { class: "ac-muted ac-mod-obj" }, m.objective),
              h("ul", { class: "ac-rows" }, lessons.map((l) => {
                const it = l.type === "assessment" ? { kind: "assessment", id: m.id } : { kind: "lesson", id: l.id };
                const d = isDone(it, pr);
                return h("li", {}, h("a", { class: `ac-row${d ? " done" : ""}`, href: hrefFor(it), "data-nav": true }, h("span", { class: "ac-row-i", "aria-hidden": "true" }, d ? "\u2713" : ICON[l.type] || "\u{1F4D6}"), h("span", { class: "ac-row-t" }, l.title), h("span", { class: "ac-row-m" }, `${TYPE_LABEL[l.type] || ""}${l.duration ? ` \xB7 ${l.duration} min` : ""}`)));
              }))
            );
          })
        ),
        (course.projects || []).length > 0 && h(
          "section",
          { class: "ac-block" },
          h("h2", { class: "ac-h2" }, "Projects"),
          h("p", { class: "ac-muted" }, "You will build real work, not just answer questions."),
          h("ul", { class: "ac-rows" }, course.projects.map((p) => {
            const d = isDone({ kind: "project", id: p.id }, pr);
            return h("li", {}, h("a", { class: `ac-row${d ? " done" : ""}`, href: link.course(course.id, { project: p.id }), "data-nav": true }, h("span", { class: "ac-row-i" }, d ? "\u2713" : "\u{1F3AF}"), h("span", { class: "ac-row-t" }, p.title), h("span", { class: "ac-row-m" }, p.brief)));
          }))
        ),
        course.capstone && h("section", { class: "ac-block ac-capstone-card" }, h("p", { class: "ac-eyebrow" }, "Final challenge"), h("h2", { class: "ac-h2" }, `\u{1F3C6} ${course.capstone.title}`), h("p", {}, course.capstone.objective), h("a", { class: "ac-btn ac-btn-ghost", href: link.course(course.id, { capstone: 1 }), "data-nav": true }, "Preview the capstone")),
        (course.tools || []).length > 0 && h("section", { class: "ac-block" }, h("h2", { class: "ac-h2" }, "Tools you will use"), h("ul", { class: "ac-chips" }, course.tools.map((t) => h("li", {}, t))))
      ),
      h(
        "aside",
        { class: "ac-side" },
        h(
          "div",
          { class: "ac-card" },
          h("h3", { class: "ac-h3" }, "How you earn the certificate"),
          h("ul", { class: "ac-req" }, req.map(([t, ok, note]) => h("li", { class: ok ? "ok" : "" }, h("span", { class: "ac-req-i", "aria-hidden": "true" }, ok ? "\u2713" : "\u25CB"), h("span", {}, t, h("small", {}, note))))),
          h("p", { class: "ac-muted ac-small" }, "Your overall score is 20% lesson checks, 40% assessments and 40% capstone. 90% earns Distinction, 80% Merit, 70% Pass.")
        ),
        (course.certificateSkills || []).length > 0 && h("div", { class: "ac-card" }, h("h3", { class: "ac-h3" }, "Skills you will gain"), h("ul", { class: "ac-chips" }, course.certificateSkills.map((s) => h("li", {}, s)))),
        h("div", { class: "ac-card" }, h("h3", { class: "ac-h3" }, "Before you start"), h("p", { class: "ac-small" }, `Prerequisites: ${course.prerequisites || "None"}.`), h("p", { class: "ac-small ac-muted" }, `Typical time: ${course.duration?.total || `${st.hours} hours`} in total. Your progress saves on this device.`))
      )
    ),
    related()
  );
}
function related() {
  const paths = LEARNING_PATHS2.filter((p) => p.courseIds.includes(course.id));
  const ids = [.../* @__PURE__ */ new Set([...paths.flatMap((p) => p.courseIds), ...ACADEMY_COURSES.filter((c) => c.category === course.category).map((c) => c.id)])].filter((id) => id !== course.id).slice(0, 3);
  const list = ids.map((id) => findCourse(id)).filter(Boolean);
  if (!list.length) return null;
  return h("section", { class: "ac-wrap ac-block" }, h("h2", { class: "ac-h2" }, "Keep building"), h("ul", { class: "ac-grid" }, list.map((c) => h("li", {}, h("a", { class: "ac-mini", href: `course.html?id=${c.id}` }, h("span", { class: "ac-eyebrow" }, c.category), h("strong", {}, c.title), h("span", { class: "ac-muted ac-small" }, `${c.difficulty} \xB7 ${courseStats(c).hours} hrs`))))));
}
function frame(seq, current, pr, body) {
  const doneCount = seq.filter((s) => isDone(s, pr)).length;
  const idx = seq.findIndex((s) => s.kind === current.kind && s.id === current.id);
  const side = h(
    "nav",
    { class: "ac-side-nav", id: "ac-drawer", "aria-label": "Course contents" },
    h("div", { class: "ac-side-head" }, h("a", { href: link.course(course.id), "data-nav": true, class: "ac-side-title" }, course.title), bar(pct(doneCount, seq.length), "Course progress"), h("small", {}, `${doneCount} of ${seq.length} complete`)),
    course.modules.map((m) => {
      const items = seq.filter((s) => s.module?.id === m.id);
      return h(
        "details",
        { class: "ac-side-mod", open: items.some((s) => s.kind === current.kind && s.id === current.id) || void 0 },
        h("summary", {}, m.title),
        h("ul", {}, items.map((s) => h("li", {}, h("a", { href: hrefFor(s), "data-nav": true, class: `ac-side-row${isDone(s, pr) ? " done" : ""}`, "aria-current": s.kind === current.kind && s.id === current.id ? "page" : void 0 }, h("span", { "aria-hidden": "true" }, isDone(s, pr) ? "\u2713" : ICON[s.kind === "lesson" ? s.lesson.type : s.kind]), h("span", {}, s.title)))))
      );
    }),
    seq.some((s) => s.kind === "project" || s.kind === "capstone") && h("div", { class: "ac-side-mod ac-side-final" }, h("p", { class: "ac-eyebrow" }, "Apply it"), h("ul", {}, seq.filter((s) => s.kind === "project" || s.kind === "capstone").map((s) => h("li", {}, h("a", { href: hrefFor(s), "data-nav": true, class: `ac-side-row${isDone(s, pr) ? " done" : ""}`, "aria-current": s.kind === current.kind && s.id === current.id ? "page" : void 0 }, h("span", { "aria-hidden": "true" }, isDone(s, pr) ? "\u2713" : ICON[s.kind]), h("span", {}, s.title))))))
  );
  const toggle = h("button", { type: "button", class: "ac-btn ac-btn-ghost ac-drawer-btn", "aria-expanded": "false", "aria-controls": "ac-drawer", onclick: (e) => {
    const open = $(".acx").classList.toggle("ac-drawer-open");
    e.currentTarget.setAttribute("aria-expanded", String(open));
  } }, "\u2630 Course contents");
  return h(
    "div",
    { class: "ac-page ac-player" },
    h("div", { class: "ac-topbar" }, h("div", { class: "ac-wrap ac-topbar-in" }, crumb(), h("span", { class: "ac-topbar-meta" }, `Step ${idx + 1} of ${seq.length}`), toggle)),
    h("div", { class: "ac-wrap ac-player-grid" }, side, h("div", { class: "ac-lesson-col" }, body))
  );
}
function stepNav(seq, it, canNext, nextLabel = "Next") {
  const p = prevOf(seq, it), n = nextOf(seq, it);
  return h("div", { class: "ac-stepnav" }, p ? h("a", { class: "ac-btn ac-btn-ghost", href: hrefFor(p), "data-nav": true }, `\u2190 ${p.title.slice(0, 40)}`) : h("span"), n ? h("a", { class: `ac-btn ac-btn-${canNext ? "primary" : "ghost"}`, href: hrefFor(n), "data-nav": true }, `${nextLabel}: ${n.title.slice(0, 40)} \u2192`) : h("a", { class: "ac-btn ac-btn-primary", href: link.course(course.id, { claim: 1 }), "data-nav": true }, "Finish \u2713"));
}
function lessonView(it, seq, pr) {
  const l = it.lesson, c = l.content;
  const done = pr.completedLessons.includes(l.id);
  $(".acx")?.classList.remove("ac-drawer-open");
  const enrolledNow = getEnrolledCourseIds2().includes(course.id);
  if (!enrolledNow) enrollCourse(course.id);
  const saveCurrent = () => {
    const p = getProgress3(course.id);
    p.currentLessonId = l.id;
    localStorage.setItem(`hdp-academy-progress-${course.id}`, JSON.stringify(p));
  };
  saveCurrent();
  const stepsKey = `steps:${course.id}:${l.id}`;
  const ticked = new Set(load(stepsKey, []));
  const takeaways = [c.successCriteria, c.concept.split(/(?<=[.!?])\s/)[0], c.commonMistakes && `Avoid this: ${c.commonMistakes.split(/(?<=[.!?])\s/)[0]}`].filter(Boolean);
  const noteBox = h("textarea", { class: "ac-input", rows: 5, maxlength: 4e3, placeholder: "Your notes, your attempt, or your answer to the practice task. It saves as you type.", "aria-label": "Your notes for this lesson" });
  noteBox.value = getNote(course.id, l.id);
  let nt;
  const noteStatus = h("small", { class: "ac-muted", "aria-live": "polite" });
  noteBox.addEventListener("input", () => {
    clearTimeout(nt);
    nt = setTimeout(() => {
      setNote(course.id, l.id, noteBox.value);
      noteStatus.textContent = "Saved \u2713";
    }, 400);
    noteStatus.textContent = "Saving\u2026";
  });
  const bm = h("button", { type: "button", class: "ac-btn ac-btn-ghost ac-bm", "aria-pressed": String(isBookmarked(course.id, l.id)), onclick: (e) => {
    const on = toggleBookmark(course.id, l.id);
    e.currentTarget.setAttribute("aria-pressed", String(on));
    e.currentTarget.textContent = on ? "\u2605 Saved" : "\u2606 Save for later";
    say(on ? "Lesson saved" : "Bookmark removed");
  } }, isBookmarked(course.id, l.id) ? "\u2605 Saved" : "\u2606 Save for later");
  const checkHost = h("section", { class: "ac-block ac-check", id: "ac-check" });
  runCheck(checkHost, it, c.knowledgeCheck || [], pr, seq);
  const prog = h("div", { class: "ac-lesson-progress" });
  const sections = [["learn", "Learn"], ["steps", "Do it"], ["example", "See it"], ["practice", "Practise"], ["check", "Check"]];
  const body = h(
    "article",
    { class: "ac-lesson" },
    h("p", { class: "ac-eyebrow" }, `${it.module.title} \xB7 ${TYPE_LABEL[l.type] || "Lesson"}${l.duration ? ` \xB7 ${l.duration} min` : ""}`),
    h("h1", { class: "ac-h1 ac-h1-sm", "data-top": true }, l.title),
    h("p", { class: "ac-muted" }, it.module.objective),
    h("div", { class: "ac-lesson-tools" }, bm, done && h("span", { class: "ac-pill good" }, "\u2713 Completed")),
    h("ol", { class: "ac-jump", "aria-label": "On this page" }, sections.map(([id, label]) => h("li", {}, h("a", { href: `#ac-s-${id}`, onclick: (e) => {
      e.preventDefault();
      bringIntoView($(`#ac-s-${id}`));
    } }, label)))),
    h(
      "section",
      { class: "ac-block", id: "ac-s-learn" },
      h("h2", { class: "ac-h2" }, "Learn"),
      c.concept.split(/\n+/).map((p) => h("p", { class: "ac-prose" }, p)),
      h("aside", { class: "ac-callout" }, h("strong", {}, "Why this matters"), h("p", {}, c.whyItMatters))
    ),
    h(
      "section",
      { class: "ac-block", id: "ac-s-steps" },
      h("h2", { class: "ac-h2" }, "Do it, step by step"),
      h("p", { class: "ac-muted ac-small" }, "Tick each step as you do it. Your ticks are saved."),
      h("ol", { class: "ac-steps" }, (c.howTo || []).map((s, i) => {
        const cb = h("input", { type: "checkbox", checked: ticked.has(i) || void 0, id: `st-${i}` });
        cb.addEventListener("change", () => {
          if (cb.checked) ticked.add(i);
          else ticked.delete(i);
          save(stepsKey, [...ticked]);
        });
        return h("li", {}, h("label", { for: `st-${i}` }, cb, h("span", {}, s)));
      }))
    ),
    h("section", { class: "ac-block", id: "ac-s-example" }, h("h2", { class: "ac-h2" }, "See it in action"), h("div", { class: "ac-example" }, h("span", { class: "ac-eyebrow" }, "Worked example"), h("p", {}, c.example))),
    h(
      "section",
      { class: "ac-block", id: "ac-s-practice" },
      h("h2", { class: "ac-h2" }, "Practise"),
      h("div", { class: "ac-practice" }, h("span", { class: "ac-eyebrow" }, "Your task"), h("p", {}, c.practice)),
      noteBox,
      noteStatus,
      h("div", { class: "ac-reflect" }, h("strong", {}, "Reflect before you move on"), h("p", {}, `Without looking back, explain "${l.title}" in two sentences, as if to a friend. Then say one place you could use it this week. Writing it in your notes makes it far more likely to stick.`))
    ),
    h("section", { class: "ac-block ac-recap" }, h("h2", { class: "ac-h2" }, "Key takeaways"), h("ul", {}, takeaways.map((t) => h("li", {}, t))), c.commonMistakes && h("aside", { class: "ac-callout warn" }, h("strong", {}, "Common mistakes"), h("p", {}, c.commonMistakes))),
    h("div", { id: "ac-s-check" }, checkHost),
    h("div", { id: "ac-after" }),
    prog
  );
  setTimeout(() => {
    if (done) renderAfter(it, seq, getProgress3(course.id));
  }, 0);
  return frame(seq, it, pr, [body, stepNav(seq, it, done)]);
}
function runCheck(host, it, qs, pr, seq) {
  const l = it.lesson;
  const best = pr.knowledgeChecks[l.id];
  let i = 0, right = 0;
  const wrong = [];
  const intro = () => mount(
    host,
    h("h2", { class: "ac-h2" }, "Knowledge check"),
    h("p", { class: "ac-muted" }, `${plural(qs.length, "question")}. You get feedback after each one. ${best != null ? `Your best score so far: ${best}%.` : ""}`),
    btn(best != null ? "Retake the check" : "Start the check", ask, "primary")
  );
  const ask = () => {
    if (i >= qs.length) return end();
    const q = qs[i];
    const order = q.options.map((o, idx) => ({ o, ok: idx === q.correct })).sort(() => Math.random() - 0.5);
    const fb = h("div", { class: "ac-fb", "aria-live": "polite" });
    const opts = order.map((x) => h("button", { type: "button", class: "ac-opt", onclick: (e) => pick(x, e.currentTarget, opts, q, fb, order) }, h("span", { class: "ac-opt-dot", "aria-hidden": "true" }), x.o));
    mount(host, h("div", { class: "ac-qhead" }, h("h2", { class: "ac-h2" }, "Knowledge check"), h("span", { class: "ac-pill" }, `Question ${i + 1} of ${qs.length}`)), bar(pct(i, qs.length), "Check progress"), h("p", { class: "ac-q", "data-q": true }, q.q), h("div", { class: "ac-opts", role: "group", "aria-label": "Choose an answer" }, opts), fb);
    bringIntoView($("[data-q]", host), { focus: true });
  };
  const pick = (x, el, opts, q, fb, order) => {
    opts.forEach((b, idx) => {
      b.disabled = true;
      if (order[idx].ok) b.classList.add("right");
    });
    if (!x.ok) el.classList.add("wrong");
    if (x.ok) right++;
    else wrong.push(q);
    recordQuestion(course.id, l.id, i, q, x.ok);
    mount(
      fb,
      h("p", { class: x.ok ? "good" : "bad" }, x.ok ? "\u2713 Correct." : `\u2717 Not quite. The best answer is: ${q.options[q.correct]}`),
      h("button", { type: "button", class: "ac-btn ac-btn-primary", onclick: () => {
        i++;
        ask();
      } }, i === qs.length - 1 ? "See my result" : "Next question \u2192")
    );
    say(x.ok ? "Correct" : "Not quite");
    bringIntoView(fb, { focus: false });
    requestAnimationFrame(() => $(".ac-btn", fb)?.focus({ preventScroll: true }));
  };
  const end = () => {
    const score = qs.length ? Math.round(right / qs.length * 100) : 100;
    const p = getProgress3(course.id);
    markLessonComplete(course.id, l.id, Math.max(score, p.knowledgeChecks[l.id] ?? 0));
    logStudy(Math.max(2, l.duration || 3));
    const res = h(
      "div",
      { class: "ac-result", "data-q": true },
      h("div", { class: "ac-result-score" }, `${score}%`),
      h("div", {}, h("h2", { class: "ac-h2" }, score >= 80 ? "Strong work \u{1F389}" : score >= 60 ? "Good, nearly there" : "Worth another look"), h("p", {}, `${right} of ${qs.length} correct. ${score < 70 ? "Re-read the lesson, then retake the check to lift your score. Your best score counts." : "This lesson is marked complete."}`)),
      h("div", { class: "ac-actions" }, btn("Retake the check", () => {
        i = 0;
        right = 0;
        wrong.length = 0;
        ask();
      }, "ghost"))
    );
    mount(host, res);
    renderAfter(it, seq, getProgress3(course.id));
    bringIntoView(res);
  };
  if (!qs.length) {
    markLessonComplete(course.id, l.id, 100);
    mount(host, h("p", { class: "ac-muted" }, "No check for this lesson."));
    return;
  }
  intro();
}
function renderAfter(it, seq, pr) {
  const host = $("#ac-after");
  if (!host) return;
  const n = nextOf(seq, it);
  mount(host, h("div", { class: "ac-next" }, h("div", {}, h("span", { class: "ac-eyebrow" }, "Lesson complete"), h("strong", {}, n ? `Up next: ${n.title}` : "You reached the end of the course content")), n ? navBtn("Continue \u2192", hrefFor(n)) : navBtn("Finish the course \u2713", link.course(course.id, { claim: 1 }))));
}
function assessmentView(it, seq, pr) {
  const a = it.lesson.assessment, prior = pr.assessments[it.id];
  const host = h("div", { class: "ac-block" });
  const intro = () => mount(
    host,
    h("p", { class: "ac-eyebrow" }, `${it.module.title}`),
    h("h1", { class: "ac-h1 ac-h1-sm", "data-top": true }, "Module assessment"),
    h("div", { class: "ac-card" }, h("ul", { class: "ac-includes" }, [`${plural(a.questions.length, "question")}`, `You need ${a.passScore || 70}% to pass`, "Questions and answers are shuffled every attempt", "No time limit, and you can retake it as often as you like", "You will see every answer at the end"].map((t) => h("li", {}, t)))),
    prior && h("p", { class: "ac-note" }, `Previous attempts: ${prior.attempts}. Best result: ${prior.score}% (${prior.passed ? "passed" : "not yet passed"}).`),
    h("div", { class: "ac-actions" }, btn(prior ? "Start a new attempt" : "Start the assessment", () => run(), "primary"))
  );
  function run() {
    const qs = a.questions.map((q, qi) => ({ ...q, qi, order: q.options.map((o, idx) => ({ o, ok: idx === q.correct })).sort(() => Math.random() - 0.5) })).sort(() => Math.random() - 0.5);
    let i = 0, right = 0;
    const log = [];
    const ask = () => {
      if (i >= qs.length) return end();
      const q = qs[i];
      const fb = h("div", { class: "ac-fb", "aria-live": "polite" });
      const opts = q.order.map((x) => h("button", { type: "button", class: "ac-opt", onclick: (e) => {
        opts.forEach((b, idx) => {
          b.disabled = true;
          if (q.order[idx].ok) b.classList.add("right");
        });
        if (!x.ok) e.currentTarget.classList.add("wrong");
        if (x.ok) right++;
        log.push({ q, picked: x.o, ok: x.ok });
        recordQuestion(course.id, `assess-${it.id}`, q.qi, q, x.ok);
        mount(fb, h("p", { class: x.ok ? "good" : "bad" }, x.ok ? "\u2713 Correct." : `\u2717 Not quite. Correct: ${q.options[q.correct]}`), h("button", { type: "button", class: "ac-btn ac-btn-primary", onclick: () => {
          i++;
          ask();
        } }, i === qs.length - 1 ? "Finish assessment" : "Next question \u2192"));
        bringIntoView(fb, { focus: false });
        requestAnimationFrame(() => $(".ac-btn", fb)?.focus({ preventScroll: true }));
      } }, h("span", { class: "ac-opt-dot", "aria-hidden": "true" }), x.o));
      mount(host, h("div", { class: "ac-qhead" }, h("h1", { class: "ac-h2", "data-top": true }, "Module assessment"), h("span", { class: "ac-pill" }, `${i + 1} of ${qs.length}`)), bar(pct(i, qs.length), "Assessment progress"), h("p", { class: "ac-q", "data-q": true }, q.q), h("div", { class: "ac-opts" }, opts), fb);
      bringIntoView($("[data-q]", host));
    };
    const end = () => {
      const score = Math.round(right / qs.length * 100);
      const res = recordAssessment(course.id, it.id, score);
      logStudy(Math.max(5, it.duration || 8));
      const n = nextOf(seq, it);
      mount(
        host,
        h("div", { class: "ac-result", "data-q": true }, h("div", { class: `ac-result-score${res.passed ? " pass" : ""}` }, `${score}%`), h("div", {}, h("h1", { class: "ac-h2", "data-top": true }, res.passed ? "You passed \u2713" : "Not passed yet"), h("p", {}, res.passed ? `Great work. You answered ${right} of ${qs.length} correctly.` : `You need ${a.passScore || 70}%. Review the module lessons and try again. Your best score is kept.`))),
        h("div", { class: "ac-actions" }, res.passed && n && navBtn("Continue \u2192", hrefFor(n)), res.passed && !n && navBtn("Finish the course \u2713", link.course(course.id, { claim: 1 })), btn("Try again", run, res.passed ? "ghost" : "primary"), !res.passed && navBtn("Review the lessons", link.course(course.id), "ghost")),
        h("h2", { class: "ac-h3" }, "Review your answers"),
        h("ol", { class: "ac-review" }, log.map((x) => h("li", { class: x.ok ? "ok" : "no" }, h("strong", {}, x.q.q), h("span", {}, x.ok ? `\u2713 ${x.picked}` : `\u2717 You chose: ${x.picked}`), !x.ok && h("span", { class: "good" }, `Correct: ${x.q.options[x.q.correct]}`))))
      );
      bringIntoView($("[data-q]", host));
      say(res.passed ? "Assessment passed" : "Assessment not passed");
    };
    ask();
  }
  intro();
  return frame(seq, it, pr, [host, stepNav(seq, it, !!prior?.passed)]);
}
function projectView(it, seq, pr) {
  const p = it.project, done = pr.projectsCompleted.find((d) => d.id === p.id);
  const key = `proj:${course.id}:${p.id}`;
  const ticked = new Set(load(key, []));
  const reqs = [...(p.requirements || []).map((t) => ["r", t]), ...(p.successCriteria || []).map((t) => ["s", t])];
  const notes = h("textarea", { class: "ac-input", rows: 6, maxlength: 4e3, placeholder: "Paste a link to your work, or describe what you built and what you learned." });
  notes.value = done?.notes || load(`${key}:notes`, "");
  notes.addEventListener("input", () => save(`${key}:notes`, notes.value));
  const msg = h("p", { class: "ac-note", hidden: true, role: "alert" });
  const finish = () => {
    const missing = reqs.filter((_, i) => !ticked.has(i)).length;
    if (missing) {
      msg.hidden = false;
      msg.textContent = `Tick every requirement and success criterion first (${missing} left). This is a self-check, so be honest with yourself.`;
      bringIntoView(msg, { focus: false });
      return;
    }
    if (notes.value.trim().length < 20) {
      msg.hidden = false;
      msg.textContent = "Add a short note or a link to your work (at least a sentence).";
      bringIntoView(msg, { focus: false });
      return;
    }
    markProjectComplete(course.id, p.id, notes.value.trim());
    logStudy(20);
    const n = nextOf(seq, it);
    say("Project completed");
    mount($("#ac-pfinish"), h("div", { class: "ac-next" }, h("div", {}, h("span", { class: "ac-eyebrow" }, "Project complete \u{1F389}"), h("strong", {}, n ? `Up next: ${n.title}` : "All done")), n ? navBtn("Continue \u2192", hrefFor(n)) : navBtn("Finish the course \u2713", link.course(course.id, { claim: 1 }))));
    bringIntoView($("#ac-pfinish"), { focus: false });
  };
  const list = (title, arr) => arr?.length ? h("div", { class: "ac-block" }, h("h2", { class: "ac-h3" }, title), h("ul", { class: "ac-bullets" }, arr.map((t) => h("li", {}, t)))) : null;
  const body = h(
    "article",
    { class: "ac-lesson" },
    h("p", { class: "ac-eyebrow" }, "\u{1F3AF} Project"),
    h("h1", { class: "ac-h1 ac-h1-sm", "data-top": true }, p.title),
    h("p", { class: "ac-prose" }, p.brief),
    h("aside", { class: "ac-callout" }, h("strong", {}, "The scenario"), h("p", {}, p.scenario)),
    h(
      "div",
      { class: "ac-block" },
      h("h2", { class: "ac-h3" }, "Your checklist"),
      h("p", { class: "ac-muted ac-small" }, "Tick each item when your work meets it."),
      h("ul", { class: "ac-steps" }, reqs.map(([kind, t], i) => {
        const cb = h("input", { type: "checkbox", id: `pr-${i}`, checked: ticked.has(i) || !!done || void 0 });
        cb.addEventListener("change", () => {
          if (cb.checked) ticked.add(i);
          else ticked.delete(i);
          save(key, [...ticked]);
        });
        return h("li", {}, h("label", { for: `pr-${i}` }, cb, h("span", {}, kind === "s" ? `Success: ${t}` : t)));
      }))
    ),
    list("Constraints", p.constraints),
    p.deliverable && h("div", { class: "ac-block" }, h("h2", { class: "ac-h3" }, "Deliverable"), h("p", {}, p.deliverable)),
    list("Tools", p.tools),
    h("div", { class: "ac-block" }, h("h2", { class: "ac-h3" }, "Show your work"), notes, msg, h("div", { class: "ac-actions" }, btn(done ? "Update my project notes" : "Mark project complete", finish, "primary"))),
    h("div", { id: "ac-pfinish" })
  );
  if (done) setTimeout(() => finish(), 0);
  return frame(seq, it, pr, [body, stepNav(seq, it, !!done)]);
}
function capstoneView(seq, pr) {
  const cap = course.capstone, it = seq.find((s) => s.kind === "capstone"), prior = pr.capstone;
  const rubric = Object.entries(cap.rubric || {});
  const total = rubric.reduce((a, [, w]) => a + w, 0) || 100;
  const rate = {};
  rubric.forEach(([k]) => {
    rate[k] = prior.rubric?.[k] || 3;
  });
  const refl = (cap.reflectionQuestions || []).map((_, i) => prior.reflectionAnswers?.[i] || "");
  const label = (k) => k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
  const out = h("div", { id: "ac-cap-out" });
  const submit = () => {
    const short = refl.findIndex((r) => r.trim().length < 40);
    if (short >= 0) {
      mount(out, h("p", { class: "ac-note", role: "alert" }, `Please give a thoughtful answer to reflection question ${short + 1} (at least a couple of sentences).`));
      bringIntoView(out, { focus: false });
      return;
    }
    const raw = rubric.reduce((a, [k, w]) => a + w * rate[k] / 5, 0) / total * 100;
    const score = Math.round(raw);
    const saved = recordCapstone(course.id, score, refl);
    const p2 = getProgress3(course.id);
    p2.capstone.rubric = { ...rate };
    localStorage.setItem(`hdp-academy-progress-${course.id}`, JSON.stringify(p2));
    logStudy(30);
    const comp = computeCompletion2(course, getProgress3(course.id));
    const pass = score >= (cap.passScore || 70);
    mount(
      out,
      h("div", { class: "ac-result", "data-q": true }, h("div", { class: `ac-result-score${pass ? " pass" : ""}` }, `${score}%`), h("div", {}, h("h2", { class: "ac-h2" }, pass ? "Capstone passed \u{1F3C6}" : "Not passed yet"), h("p", {}, pass ? comp.isComplete ? "Everything is complete. Your certificate is ready to claim." : "Finish the remaining items to unlock your certificate." : `You need ${cap.passScore || 70}%. Improve the weakest areas and submit again.`))),
      h("div", { class: "ac-actions" }, pass && comp.isComplete && navBtn("Claim my certificate \u{1F393}", link.course(course.id, { claim: 1 })), pass && !comp.isComplete && navBtn("See what is left", link.course(course.id), "primary"), !pass && h("span"))
    );
    bringIntoView(out, { focus: false });
    say(pass ? "Capstone passed" : "Capstone not passed");
    void saved;
  };
  const list = (t, a) => a?.length ? h("div", { class: "ac-block" }, h("h2", { class: "ac-h3" }, t), h("ul", { class: "ac-bullets" }, a.map((x) => h("li", {}, x)))) : null;
  const body = h(
    "article",
    { class: "ac-lesson" },
    h("p", { class: "ac-eyebrow" }, "\u{1F3C6} Capstone"),
    h("h1", { class: "ac-h1 ac-h1-sm", "data-top": true }, cap.title),
    h("aside", { class: "ac-callout" }, h("strong", {}, "The scenario"), h("p", {}, cap.scenario)),
    h("p", { class: "ac-prose" }, cap.objective),
    list("Requirements", cap.requirements),
    list("Constraints", cap.constraints),
    list("Deliverables", cap.deliverables),
    list("Tools", cap.tools),
    h(
      "div",
      { class: "ac-block" },
      h("h2", { class: "ac-h2" }, "Assess your work"),
      h("p", { class: "ac-muted" }, "Rate your finished work against each area. Be honest: a strong reflection is part of the score."),
      rubric.map(([k, w]) => {
        const o = h("output", {}, `${rate[k]}/5`);
        const r = h("input", { type: "range", min: 1, max: 5, step: 1, value: rate[k], class: "ac-range", id: `rb-${k}`, "aria-label": label(k) });
        r.addEventListener("input", () => {
          rate[k] = +r.value;
          o.textContent = `${r.value}/5`;
        });
        return h("div", { class: "ac-rubric" }, h("label", { for: `rb-${k}` }, h("strong", {}, label(k)), h("small", {}, `${w}% of the capstone`)), r, o);
      }),
      h("h3", { class: "ac-h3" }, "Reflect"),
      (cap.reflectionQuestions || []).map((q, i) => {
        const t = h("textarea", { class: "ac-input", rows: 4, maxlength: 3e3, "aria-label": q, placeholder: "Write a few sentences\u2026" });
        t.value = refl[i];
        t.addEventListener("input", () => {
          refl[i] = t.value;
        });
        return h("label", { class: "ac-field" }, h("span", {}, q), t);
      }),
      h("div", { class: "ac-actions" }, btn(prior.completed ? "Submit again" : "Submit my capstone", submit, "primary")),
      out
    )
  );
  return frame(seq, it, pr, [body, stepNav(seq, it, !!(prior.completed && prior.score >= 70))]);
}
function claimView(pr) {
  const comp = computeCompletion2(course, pr), cert = getCertificateForCourse(course.id), locked = getLockedName(), st = courseStats(course);
  const wrap = (...k) => h("div", { class: "ac-page" }, h("div", { class: "ac-wrap ac-claim" }, crumb(), ...k));
  if (cert) return wrap(h("h1", { class: "ac-h1", "data-top": true }, "You already earned this certificate \u{1F393}"), h("div", { class: "ac-actions" }, h("a", { class: "ac-btn ac-btn-primary", href: link.cert(cert.certificateId) }, "View my certificate")));
  if (!comp.isComplete) {
    const left = [];
    if (!comp.requiredLessonsCompleted) left.push("finish all lessons");
    if (!comp.moduleAssessmentsPassed) left.push("pass every module assessment");
    if (!comp.projectsCompleted) left.push("complete the projects");
    if (!comp.capstonePassed) left.push("pass the capstone");
    if (comp.overallScore < 70 && !left.length) left.push("raise your overall score to 70%");
    return wrap(h("h1", { class: "ac-h1", "data-top": true }, "Almost there"), h("p", { class: "ac-lede" }, `To earn this certificate you still need to ${left.join(", ")}.`), h("div", { class: "ac-actions" }, navBtn("Back to the course", link.course(course.id))));
  }
  const nameInput = h("input", { class: "ac-input ac-name", id: "ac-name", type: "text", maxlength: 60, autocomplete: "name", placeholder: "Full name as it should appear", "aria-describedby": "ac-name-help" });
  const confirm = h("input", { type: "checkbox", id: "ac-confirm" });
  const err = h("p", { class: "ac-note", role: "alert", hidden: true });
  const live2 = h("strong", {}, "");
  const tick = () => {
    live2.textContent = (/* @__PURE__ */ new Date()).toLocaleString("en-GB", { dateStyle: "long", timeStyle: "medium" }) + ` ${tzLabel()}`;
  };
  tick();
  const clock = setInterval(() => {
    if (!document.body.contains(live2)) clearInterval(clock);
    else tick();
  }, 1e3);
  const issue = () => {
    err.hidden = true;
    if (!locked) {
      const v = validateName(nameInput.value);
      if (!v.ok) {
        err.hidden = false;
        err.textContent = v.reason;
        nameInput.focus();
        return;
      }
      if (!confirm.checked) {
        err.hidden = false;
        err.textContent = "Please tick the box to confirm your name. It cannot be changed afterwards.";
        confirm.focus();
        return;
      }
      const r = lockName(v.name);
      if (!r.ok) {
        err.hidden = false;
        err.textContent = r.reason;
        return;
      }
    }
    const res = issueCertificate(course, st.hours);
    if (!res.ok) {
      err.hidden = false;
      err.textContent = res.reason === "storage" ? "Your browser is blocking storage, so the certificate could not be saved. Allow site storage and try again." : "Please enter your name first.";
      return;
    }
    location.href = link.cert(res.cert.certificateId) + "&new=1";
  };
  return wrap(
    h("p", { class: "ac-eyebrow" }, "\u{1F389} Course complete"),
    h("h1", { class: "ac-h1", "data-top": true }, `Claim your ${course.title} certificate`),
    h("p", { class: "ac-lede" }, `You finished everything with an overall score of ${comp.overallScore}%, which earns a ${comp.overallScore >= 90 ? "Distinction" : comp.overallScore >= 80 ? "Merit" : "Pass"}.`),
    h(
      "div",
      { class: "ac-card ac-claim-card" },
      locked ? [h("p", { class: "ac-eyebrow" }, "Name on your certificate"), h("p", { class: "ac-big-name" }, locked.name), h("p", { class: "ac-muted ac-small" }, "You chose this name earlier and it is used on all your certificates.")] : [h("label", { for: "ac-name", class: "ac-eyebrow" }, "Your name on the certificate"), nameInput, h("p", { class: "ac-note", id: "ac-name-help" }, "\u26A0\uFE0F You can set this only once. It will be printed on every certificate you earn and cannot be edited later, so check the spelling."), h("label", { class: "ac-check-row", for: "ac-confirm" }, confirm, h("span", {}, "I have checked my name and understand it cannot be changed."))],
      h("p", { class: "ac-small ac-muted" }, "Issued at: ", live2, " (the exact time you claim it is printed on the certificate)"),
      err,
      h("div", { class: "ac-actions" }, btn("Issue my certificate \u{1F393}", issue, "primary"))
    )
  );
}
function initCourse() {
  if (!root()) return;
  course = findCourse(new URLSearchParams(location.search).get("id"));
  if (!course) {
    mount(root(), h("div", { class: "ac-wrap ac-claim" }, h("h1", { class: "ac-h1", "data-top": true }, "Course not found"), h("p", { class: "ac-lede" }, "That link does not match a course."), h("a", { class: "ac-btn ac-btn-primary", href: "academy.html" }, "Browse all courses")));
    return;
  }
  document.addEventListener("click", onLink);
  window.addEventListener("popstate", render);
  window.addEventListener("keydown", (e) => {
    if (e.target.closest("input,textarea,select")) return;
    if (!params.get("lesson")) return;
    const seq = sequence(course);
    const it = seq.find((s) => s.kind === "lesson" && s.id === params.get("lesson"));
    if (!it) return;
    const t = e.key === "ArrowRight" ? nextOf(seq, it) : e.key === "ArrowLeft" ? prevOf(seq, it) : null;
    if (t && e.altKey) navigate(hrefFor(t));
  });
  render();
}

// js/ac-main.js
if (typeof document !== "undefined") {
  initCatalog();
  initDashboard();
  initCourse();
  initCertificate();
  initVerify();
}
