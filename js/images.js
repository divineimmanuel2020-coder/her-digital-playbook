/* =============================================
   IMAGES.JS
   Two things, applied once per page after content loads:

   1. Rewrites every Cloudinary image URL to request an
      auto-optimized version — right-sized, auto format
      (WebP/AVIF where supported), auto quality. Same image,
      much smaller file, faster paint. No visual difference.

   2. Adds loading="lazy" + decoding="async" to every image
      that isn't the hero/logo, so only what's on-screen
      downloads immediately.
   ============================================= */

function optimizeCloudinaryUrl(url, width) {
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  if (url.includes('/upload/w_')) return url; // already optimized
  return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto,dpr_auto/`);
}

function markLoaded(img) {
  if (img.complete && img.naturalWidth > 0) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
    // If a broken/slow image never fires load, still reveal the frame after a
    // moment so the placeholder background doesn't hang around forever.
    img.addEventListener('error', () => img.classList.add('loaded'), { once: true });
  }
}

export function optimizeImages(scope = document) {
  const cardImgs = scope.querySelectorAll('.card-img img');

  scope.querySelectorAll('img').forEach((img) => {
    const isPriority = img.closest('.hero-img, .splash-logo-img, .logo') || img.classList.contains('hero-img');
    // The first 3 cards of each visible grid are on-screen without
    // scrolling on most devices, so they load eagerly too — only cards
    // further down stay lazy.
    const cardIndex = [...cardImgs].indexOf(img);
    const isAboveFold = cardIndex > -1 && cardIndex < 3;
    const src = img.getAttribute('src');

    if (src) {
      const width = img.closest('.card-img') ? 700 : img.closest('.newsletter-image, .page-hero') ? 900 : 1200;
      img.setAttribute('src', optimizeCloudinaryUrl(src, width));
    }

    if (isPriority || isAboveFold) {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', isPriority ? 'high' : 'auto');
      img.setAttribute('decoding', 'async');
    } else {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    }

    markLoaded(img);
  });
       }
   
