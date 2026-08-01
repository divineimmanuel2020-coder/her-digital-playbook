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
