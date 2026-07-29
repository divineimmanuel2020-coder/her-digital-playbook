/* =============================================
   SPLASH.JS
   Times the splash screen fade-out and scatters the
   floating sparkle dots (.sparkle-dot, styled in style.css).
   ============================================= */

export function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;

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
