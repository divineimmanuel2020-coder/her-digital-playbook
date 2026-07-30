/* =============================================
   SPLASH.JS
   Shows the splash animation once per browser session —
   never on back/forward navigation or a page you've already
   seen this visit. That's what makes the browser Back button
   return you to where you actually were, instead of replaying
   the intro like a first-time visit.
   ============================================= */

const SESSION_KEY = 'hdp-splash-shown';

export function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;

  const alreadyShown = sessionStorage.getItem(SESSION_KEY) === '1';

  if (alreadyShown) {
    // Skip the intro entirely and reveal the homepage instantly —
    // this is what makes Back/Forward and repeat visits feel normal.
    splash.classList.add('skip-intro');
    splash.classList.add('hidden');
    return;
  }

  sessionStorage.setItem(SESSION_KEY, '1');

  const sparkleLayer = document.getElementById('splashSparkles');
  if (sparkleLayer) {
    const DOT_COUNT = 16;
    for (let i = 0; i < DOT_COUNT; i++) {
      const dot = document.createElement('span');
      dot.className = 'sparkle-dot';
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.animationDelay = `${(Math.random() * 2.5).toFixed(2)}s`;
      sparkleLayer.appendChild(dot);
    }
  }

  window.setTimeout(() => splash.classList.add('hidden'), 2400);
}

// If the browser restores this page from its back/forward cache
// (bfcache) — which is common when pressing Back — make sure the
// splash stays hidden rather than replaying.
window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return;
  const splash = document.getElementById('splash');
  if (splash) splash.classList.add('hidden');
});
         
