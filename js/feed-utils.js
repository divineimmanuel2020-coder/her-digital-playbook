/* =============================================
   FEED-UTILS.JS
   Tiny, dependency-free helpers for the homepage masonry feed.
   Imported by BOTH scripts/build.mjs (pre-rendered HTML) and
   js/render.js (category filter), so the two always agree.
   ============================================= */

/* Reading speed used ONLY when an article has no readTime of its own. */
export const WORDS_PER_MINUTE = 220;

/* The label shown under each card.
   1. Use the article's existing `readTime` field (e.g. "54 min read").
   2. Otherwise estimate it from the real article content.
   3. Otherwise return '' (the card simply hides the line). */
export function readingTime(item) {
  const given = typeof item.readTime === 'string' ? item.readTime.trim() : '';
  if (given) return given;
  const words = String(item.content || '').trim().split(/\s+/).filter(Boolean).length;
  if (!words) return '';
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

/* Cover images are always scaled by WIDTH only (Cloudinary `w_`),
   never cropped (`c_fill`/`c_crop` are never used), so the original
   aspect ratio is preserved at every size. */
const FEED_WIDTHS = [360, 540, 720];

/* Matches the layout in css/style.css: 2 columns on phones, 3 on
   tablets, 4 on desktop (~270px wide inside the 1140px container). */
export const FEED_SIZES = '(min-width: 1200px) 270px, (min-width: 640px) 33vw, 50vw';

function cloudinaryAt(url, width) {
  return url.replace(/\/upload\/(?:w_\d+,q_auto,f_auto,dpr_auto\/)?/, `/upload/w_${width},q_auto,f_auto/`);
}

export function feedImage(url) {
  const src = String(url || '');
  if (!src.includes('res.cloudinary.com') || !src.includes('/upload/')) {
    return { src, srcset: '', sizes: '' }; // not Cloudinary: use as-is
  }
  return {
    src: cloudinaryAt(src, FEED_WIDTHS[FEED_WIDTHS.length - 1]),
    srcset: FEED_WIDTHS.map((w) => `${cloudinaryAt(src, w)} ${w}w`).join(', '),
    sizes: FEED_SIZES,
  };
}
