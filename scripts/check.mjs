#!/usr/bin/env node
/* =============================================
   scripts/check.mjs
   "Crawler's-eye view" test. Reads the generated pages as RAW HTML —
   no browser, no JavaScript, no fetch — the way a crawler that
   doesn't run scripts sees them, and fails if anything is missing.

   Checks, for every article and tool page:
     • exactly one <h1>, a <title>, a meta description, a self-canonical
     • every "## chapter" from data/store.js is present as a real <h2>
     • the readable text is really in the file (word count reported)
     • no "Loading…" placeholder, no leftover ?id= links
   And for the site as a whole:
     • every root-absolute link in every page points at a file that exists
     • the homepage's raw HTML links to every article and tool
     • every URL in sitemap.xml exists on disk

   USAGE   node scripts/check.mjs
   ============================================= */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { ALL_ITEMS } = await import(pathToFileURL(path.join(ROOT, 'data/store.js')).href);
const { SITE_URL, itemPath, itemRelPath } = await import(pathToFileURL(path.join(ROOT, 'js/routes.js')).href);

const problems = [];
const fail = (where, msg) => problems.push(`${where}: ${msg}`);
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

function visibleText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
const count = (re, s) => (s.match(re) || []).length;
const words = (s) => (s.match(/\S+/g) || []).length;

function pathToFile(href) {
  let p = href.split('#')[0].split('?')[0];
  if (p === '' || p === '/') return 'index.html';
  p = p.replace(/^\//, '');
  return p;
}

const rows = [];

for (const item of ALL_ITEMS) {
  const rel = itemRelPath(item);
  const where = rel;
  if (!exists(rel)) { fail(where, 'file is missing — run node scripts/build.mjs'); continue; }
  const html = read(rel);
  const main = (html.match(/<main class="article-page">[\s\S]*<\/main>/) || [''])[0];
  const text = visibleText(main);

  if (count(/<h1[\s>]/g, html) !== 1) fail(where, `expected exactly one <h1>, found ${count(/<h1[\s>]/g, html)}`);
  if (!/<title>[^<]+<\/title>/.test(html)) fail(where, 'missing <title>');
  if (!/<meta name="description" content="[^"]+">/.test(html)) fail(where, 'missing meta description');
  if (!html.includes(`<link rel="canonical" href="${SITE_URL}${itemPath(item)}">`)) fail(where, 'canonical is not self-referencing');
  if (/Loading…/.test(main)) fail(where, 'still contains a "Loading…" placeholder');
  if (/article\.html\?id=/.test(html)) fail(where, 'contains an old ?id= link');
  if (!html.includes('id="article-data"')) fail(where, 'missing #article-data block for the hydration script');

  const chapterTitles = (item.content.match(/^## .+$/gm) || []).map((l) => l.slice(3).replace(/\*\*/g, '').trim());
  const h2s = [...main.matchAll(/<h2 class="article-h2">[\s\S]*?<\/span>([\s\S]*?)<\/h2>/g)].map((m) => visibleText(m[1]));
  for (const t of chapterTitles) {
    if (!h2s.some((h) => h === t.replace(/&/g, '&amp;') || h === t)) fail(where, `chapter heading not in raw HTML: "${t}"`);
  }

  // The last plain paragraph of the article must be present too (catches truncation).
  const paras = item.content.split('\n\n').map((b) => b.trim()).filter((b) => b && !/^(##|%%|- |> |###)/.test(b) && !/^\p{Extended_Pictographic}/u.test(b));
  const lastPara = paras[paras.length - 1];
  if (lastPara) {
    const probe = lastPara.replace(/\*\*/g, '').slice(0, 40);
    if (!text.includes(visibleText(probe))) fail(where, 'end of the article text was not found in raw HTML');
  }

  rows.push({ page: rel, words: words(text), h2: h2s.length, type: item.type });
}

// --- links on every generated/inlined page ---
const pages = ['index.html', ...fs.readdirSync(path.join(ROOT, 'pages')).filter((f) => f.endsWith('.html')).map((f) => `pages/${f}`),
  ...ALL_ITEMS.map(itemRelPath)];
for (const rel of pages) {
  const html = read(rel);
  for (const m of html.matchAll(/\bhref="(\/[^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith('//')) continue;
    const target = pathToFile(href);
    if (target === 'sitemap.xml' || target === 'blog' || target === 'tools') continue;
    if (!exists(target)) fail(rel, `broken internal link ${href}`);
  }
}

// --- homepage raw HTML lists every article and tool ---
const home = read('index.html');
for (const item of ALL_ITEMS) {
  if (!home.includes(`href="${itemPath(item)}"`)) fail('index.html', `no raw-HTML link to ${itemPath(item)}`);
}
if (!/<header class="header">/.test(home)) fail('index.html', 'header is not in the raw HTML');
if (!/<footer class="footer">/.test(home)) fail('index.html', 'footer is not in the raw HTML');

// --- sitemap ---
const sm = read('sitemap.xml');
if (!sm.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) fail('sitemap.xml', 'wrong XML namespace');
for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const u = m[1];
  if (!u.startsWith(SITE_URL)) { fail('sitemap.xml', `foreign URL ${u}`); continue; }
  if (u.includes('?')) fail('sitemap.xml', `query-string URL still listed: ${u}`);
  if (!exists(pathToFile(u.slice(SITE_URL.length) || '/'))) fail('sitemap.xml', `URL has no file: ${u}`);
}

/* ---------- report ---------- */
console.log('\nRaw-HTML view (JavaScript never runs):\n');
console.log('  words  h2  page');
for (const r of rows.sort((a, b) => b.words - a.words)) {
  console.log(`  ${String(r.words).padStart(5)}  ${String(r.h2).padStart(2)}  ${r.page}${r.type === 'tool' ? '   (tool)' : ''}`);
}
const arts = rows.filter((r) => r.type !== 'tool');
if (arts.length) console.log(`\n  articles: ${arts.length}, smallest ${Math.min(...arts.map((r) => r.words))} words, largest ${Math.max(...arts.map((r) => r.words))} words`);

if (problems.length) {
  console.error(`\n✖ ${problems.length} problem(s):\n  ` + problems.join('\n  '));
  process.exit(1);
}
console.log('\n✔ Every page is fully readable in the raw HTML.\n');
