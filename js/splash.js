/* =============================================
   SPLASH.JS
   Shows the splash animation once per device — never again
   on back/forward navigation or a repeat visit. Uses
   localStorage (not sessionStorage) specifically so this
   holds up regardless of how a given mobile browser handles
   back-navigation, tabs, or session boundaries.
   ============================================= */

const SPLASH_KEY = 'hdp-splash-shown';

function hideSplash(splash) {
  splash.classList.add('hidden');
  window.__hdpSplashHidden = true;
  window.dispatchEvent(new CustomEvent('hdp:splash-hidden'));
}

export function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;

  const alreadyShown = localStorage.getItem(SPLASH_KEY) === '1';

  if (alreadyShown) {
    // Skip the intro entirely and reveal the homepage instantly —
    // this is what makes Back/Forward and repeat visits feel normal.
    splash.classList.add('skip-intro');
    hideSplash(splash);
    return;
  }

  localStorage.setItem(SPLASH_KEY, '1');

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

  window.setTimeout(() => hideSplash(splash), 5000);
}

// If the browser restores this page from its back/forward cache
// (bfcache) — which is common when pressing Back — make sure the
// splash stays hidden rather than replaying.
window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return;
  const splash = document.getElementById('splash');
  if (splash) hideSplash(splash);
});
     
