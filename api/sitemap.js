/* =============================================
   /api/sitemap.js
   Generates sitemap.xml on request, built directly from the
   live data/store.js — not a static file someone has to
   remember to update. Add a new article or tool to store.js
   and it appears in the sitemap on the very next request,
   with its own static path (/blog/<id>.html or /tools/<id>.html).

   scripts/build.mjs also writes an identical static sitemap.xml
   at the project root; the two always list the same URLs.

   Academy course pages (/pages/course.html?id=...) are left out
   until they are pre-rendered too — they still build their content
   in the browser, so a crawler that doesn't run JavaScript would
   only find an empty shell there.
   ============================================= */

import { ALL_ITEMS } from '../data/store.js';
import { SITE_URL, STATIC_PAGES, itemPath } from '../js/routes.js';

export default function handler(req, res) {
  const urls = [
    ...STATIC_PAGES.map((path) => `${SITE_URL}${path}`),
    ...ALL_ITEMS.map((item) => `${SITE_URL}${itemPath(item)}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n')}
</urlset>
`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  // Cache at the edge for an hour — new articles show up within an
  // hour without needing a full redeploy to refresh the sitemap.
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).send(body);
}
