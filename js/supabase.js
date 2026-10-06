/* =============================================
   SUPABASE.JS
   Central Supabase configuration for Her Digital Playbook.

   This is the ONLY place the Supabase client is created.
   Every other script on the site reads it from
   window.hdpSupabase — nothing else should call
   createClient() again.

   Loading order on every page (see the <script> tags in
   index.html / pages/*.html):
     1. Supabase SDK (CDN, UMD build)  -> window.supabase
     2. This file                       -> window.hdpSupabase
     3. The page's own module script    -> main.js / article.js / etc.

   This file is intentionally a plain classic <script>, not an
   ES module — that's what makes window.hdpSupabase reachable
   from literally any other script on the site, module or not,
   without every consumer needing its own import.
   ============================================= */

/* =============================================
   ANONYMOUS ANALYTICS TRACKER (feeds the private admin dashboard)
   Sits BEFORE the Supabase client on purpose: it is wrapped in try/catch and
   has no dependencies, so it can never break — or be broken by — the code below.
   Sends only: page path + title, a random visitor id, a random session id,
   the referring site's hostname, and how long the page was visible.
   No names, emails, form contents or IP addresses. Country is worked out on
   the server. Stores two random ids in localStorage (no cookies).
   Owner opt-out: open any page with ?notrack=1 on a device to stop counting
   that device; ?notrack=0 turns it back on.
   ============================================= */
try {
  (function () {
    if (!/(^|\.)herdigitalplaybook\.com$/i.test(location.hostname)) return;
    var ls = window.localStorage;
    var flag = new URLSearchParams(location.search).get('notrack');
    if (flag === '1') ls.setItem('hdp_notrack', '1');
    else if (flag === '0') ls.removeItem('hdp_notrack');
    if (ls.getItem('hdp_notrack') === '1' || navigator.webdriver) return;

    var rnd = function () {
      return (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16);
          });
    };
    var send = function (o) {
      var body = JSON.stringify(o);
      try { if (navigator.sendBeacon && navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }))) return; } catch (e) {}
      try { fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true, credentials: 'omit' }).catch(function () {}); } catch (e) {}
    };

    var vid = ls.getItem('hdp_v');
    if (!vid) { vid = rnd(); ls.setItem('hdp_v', vid); }
    var now = Date.now(), sess = null;
    try { sess = JSON.parse(ls.getItem('hdp_s') || 'null'); } catch (e) {}
    if (!sess || !sess.id || now - sess.t > 30 * 60 * 1000) sess = { id: rnd(), t: now };   // new session after 30 min idle
    sess.t = now; ls.setItem('hdp_s', JSON.stringify(sess));

    var id = rnd(), isArticle = 0, ref = '';
    try { isArticle = JSON.parse(document.getElementById('article-data').textContent).type === 'article' ? 1 : 0; } catch (e) {}
    try { ref = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) {}

    var shownAt = document.visibilityState === 'visible' ? Date.now() : 0, acc = 0, last = 0;
    var flush = function () {
      if (shownAt) { acc += Date.now() - shownAt; shownAt = 0; }
      var s = Math.round(acc / 1000);
      if (s > 0 && s !== last) {
        last = s; send({ k: 'e', id: id, s: s });
        try { sess.t = Date.now(); ls.setItem('hdp_s', JSON.stringify(sess)); } catch (e) {}
      }
    };
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') flush(); else if (!shownAt) shownAt = Date.now();
    });
    window.addEventListener('pagehide', flush);

    var start = function () {
      send({ k: 'v', id: id, vid: vid, sid: sess.id, p: location.pathname, t: document.title, r: ref, a: isArticle, tp: navigator.maxTouchPoints || 0 });
    };
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
  })();
} catch (e) { /* analytics must never affect the site */ }

(function () {
  // -----------------------------------------------------------------
  // 1. CONFIGURATION
  // -----------------------------------------------------------------
  // Find these in your Supabase dashboard under
  // Project Settings -> API. Use the "Project URL" and the
  // "anon" / "public" key ONLY.
  //
  // Never put the service_role key here or in any file that ships
  // to the browser — it bypasses Row Level Security entirely and
  // must only ever live on a server you control.
  var SUPABASE_URL = 'https://fkggtxqsncubogospsmn.supabase.co'; // e.g. https://abcdefgh.supabase.co
  var SUPABASE_ANON_KEY = 'sb_publishable_0BvhJNmzNyxSVTha2JQLxA_8vu29Poi';

  // -----------------------------------------------------------------
  // 2. GUARD RAILS
  // -----------------------------------------------------------------
  // If the placeholders above haven't been filled in yet, or the
  // CDN script failed to load, fail loudly in the console instead
  // of throwing a confusing error deep inside some other feature.
  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    console.error(
      '[supabase.js] The Supabase SDK did not load. Check that the ' +
      'CDN <script> tag appears BEFORE supabase.js in the HTML.'
    );
    return;
  }

  if (SUPABASE_URL.indexOf('YOUR_SUPABASE') === 0 || SUPABASE_ANON_KEY.indexOf('YOUR_SUPABASE') === 0) {
    console.warn(
      '[supabase.js] Using placeholder credentials — replace ' +
      'SUPABASE_URL and SUPABASE_ANON_KEY at the top of this file ' +
      'with your real Project URL and anon/public key.'
    );
  }

  // -----------------------------------------------------------------
  // 3. INITIALIZE (once, here, and only here)
  // -----------------------------------------------------------------
  window.hdpSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // -----------------------------------------------------------------
  // 4. WHAT THIS WILL GROW INTO
  // -----------------------------------------------------------------
  // window.hdpSupabase is a normal Supabase client. Future features
  // all read/write through it, e.g.:
  //
  //   window.hdpSupabase.from('subscribers').insert({ email })
  //   window.hdpSupabase.auth.signUp({ email, password })
  //   window.hdpSupabase.from('reading_progress').upsert({...})
  //
  // Keep any feature-specific query logic in its OWN file
  // (e.g. js/newsletter.js) that reads window.hdpSupabase — don't
  // add more createClient() calls anywhere else in the project.
})();
