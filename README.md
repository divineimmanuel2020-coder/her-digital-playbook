# her-digital-playbook
Her Digital Playbook — A premium digital magazine helping women build wealth, grow their careers, learn digital skills, and create more opportunities through beautifully designed articles and free tools.

## How pages are built (static, crawler-readable)

Every article and tool is a real file with all of its text inside the raw HTML — no JavaScript, query string or API call is needed to read it.

| What | Where |
| --- | --- |
| Stories + articles | `/blog/<id>.html` |
| Free tools | `/tools/<id>.html` |
| Homepage cards, header, footer | written into `index.html` |
| Header, nav, footer on inner pages | written into `pages/*.html` |
| Old `/pages/article.html?id=<id>` links | 301 → new path (`vercel.json`), JS fallback in `pages/article.html` |

**The content still lives in `data/store.js`.** The `/blog` and `/tools` files are generated from it:

```bash
node scripts/build.mjs           # regenerate pages, sitemap.xml, redirects
node scripts/build.mjs --check   # exit 1 if any generated file is stale
node scripts/check.mjs           # "crawler's-eye" test: reads the raw HTML, no JS
```

Workflow for a new article: add it to `data/store.js` → `node scripts/build.mjs` → `node scripts/check.mjs` → commit everything (including the new `blog/*.html`) → deploy. Needs Node 20.19+ or 22.7+.

`js/article.js` no longer renders anything. It only adds behaviour (XP, quizzes, checklists, tool widgets) to the pre-rendered page. `js/article-render.js` is the build-time renderer.

Edited `components/*.html`, `sections/*.html` or `data/store.js`? Re-run the build — the header, footer and cards are copied into each page.

Not pre-rendered yet: Academy course pages (`/pages/course.html?id=…`) still build in the browser, so they are left out of the sitemap.
