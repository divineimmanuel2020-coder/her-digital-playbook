/* =============================================
   /api/sitemap.js
   Generates sitemap.xml on request, built directly from the
   live data/store.js — not a static file someone has to
   remember to update. Add a new article or tool to store.js
   and it appears in the sitemap on the very next request,
   automatically, with its own correct canonical URL.

   Served at the real /sitemap.xml path via the rewrite rule in
   vercel.json — search engines and validators fetch exactly the
   URL they expect, with no idea a function generated it.
   ============================================= */

import { ALL_ITEMS } from '../data/store.js';

const SITE_URL = 'https://herdigitalplaybook.com';

// Fixed, non-dynamic pages that aren't part of store.js.
const STATIC_PAGES = [
  '/',
  '/pages/about.html',
  '/pages/contact.html',
  '/pages/privacy.html',
  '/pages/terms.html',
];

export default function handler(req, res) {
  const urls = [
    ...STATIC_PAGES.map((path) => `${SITE_URL}${path}`),
    ...ALL_ITEMS.map((item) => `${SITE_URL}/pages/article.html?id=${item.id}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n')}
</urlset>
`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  // Cache at the edge for an hour — new articles show up within an
  // hour without needing a full redeploy to refresh the sitemap.
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).send(body);
}
  
