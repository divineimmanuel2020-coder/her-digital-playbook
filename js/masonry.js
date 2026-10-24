/* =============================================
   MASONRY.JS
   Pinterest-style layout for the homepage article feed.

   Why JavaScript instead of CSS columns?
   CSS `column-count` fills the first column top-to-bottom before
   starting the second, so the newest articles would all stack in
   the LEFT column and the right column would start with article #15.
   This places each card (in its original order) into whichever
   column is currently shortest, so the reading order flows left to
   right like Pinterest.

   Notes
   - Cards keep their DOM order, so tab order and screen-reader order
     match the visual flow (no CSS `order`, no reshuffled DOM).
   - Images are never cropped: each card's height comes from the image's
     natural aspect ratio at the column width. We only measure; we never
     set an image height.
   - Without JS the feed falls back to plain CSS columns (css/style.css).
   - Column count and gaps come from CSS custom properties on the grid
     (--feed-cols, --feed-gap-x, --feed-gap-y), so breakpoints live in CSS.
   ============================================= */

const CARD = ':scope > .feed-card';

export function initMasonry(grid) {
  if (!grid) return null;

  // Already initialised (e.g. the category filter re-rendered the cards).
  if (grid._hdpMasonry) {
    grid._hdpMasonry.refresh();
    return grid._hdpMasonry;
  }

  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(layout);
  };

  // One observer for the grid (width changes) and every card (a card's
  // height changes when its image loads, fonts swap in, text re-wraps).
  const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : null;

  function settings() {
    const cs = getComputedStyle(grid);
    return {
      cols: Math.max(1, parseInt(cs.getPropertyValue('--feed-cols'), 10) || 2),
      gapX: parseFloat(cs.getPropertyValue('--feed-gap-x')) || 12,
      gapY: parseFloat(cs.getPropertyValue('--feed-gap-y')) || 24,
    };
  }

  function layout() {
    const cards = Array.from(grid.querySelectorAll(CARD));
    if (!cards.length) {
      grid.style.height = '';
      return;
    }

    const width = grid.clientWidth;
    if (width <= 0) return; // hidden (display:none) — try again when it resizes

    const { cols, gapX, gapY } = settings();
    const colWidth = (width - gapX * (cols - 1)) / cols;

    // Write every width first, then read every height (one reflow).
    cards.forEach((card) => { card.style.width = `${colWidth}px`; });

    const heights = new Array(cols).fill(0);
    cards.forEach((card) => {
      const height = card.getBoundingClientRect().height;
      let col = 0;
      for (let i = 1; i < cols; i += 1) {
        // 0.5px tolerance: near-ties go to the leftmost column.
        if (heights[i] < heights[col] - 0.5) col = i;
      }
      card.style.transform = `translate3d(${col * (colWidth + gapX)}px, ${heights[col]}px, 0)`;
      heights[col] += height + gapY;
    });

    grid.style.height = `${Math.max(...heights) - gapY}px`;
  }

  // Images: swap the placeholder for the real (uncropped) image once it
  // has loaded, or show a graceful fallback if it fails.
  function watchImage(card) {
    const img = card.querySelector('img');
    const cover = card.querySelector('.feed-cover');
    if (!img || !cover || img._hdpWatched) return;
    img._hdpWatched = true;

    const loaded = () => { cover.classList.add('is-loaded'); schedule(); };
    const failed = () => { cover.classList.add('is-loaded', 'is-error'); schedule(); };

    if (img.complete) {
      if (img.naturalWidth > 0) loaded();
      else if (img.getAttribute('src')) failed();
    } else {
      img.addEventListener('load', loaded, { once: true });
      img.addEventListener('error', failed, { once: true });
    }
  }

  function refresh() {
    if (observer) {
      observer.disconnect();
      observer.observe(grid);
    }
    grid.querySelectorAll(CARD).forEach((card) => {
      if (observer) observer.observe(card);
      watchImage(card);
    });
    layout();
    grid.classList.add('is-ready');
  }

  const api = { layout, refresh };
  grid._hdpMasonry = api;

  grid.classList.add('is-masonry');
  refresh();

  // Web fonts change text heights; bfcache restores / late loads re-measure.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  window.addEventListener('load', schedule);
  window.addEventListener('pageshow', schedule);
  if (!observer) window.addEventListener('resize', schedule); // very old browsers

  return api;
}
