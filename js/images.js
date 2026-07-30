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

export function optimizeImages(scope = document) {
  scope.querySelectorAll('img').forEach((img) => {
    const isPriority = img.closest('.hero-img, .splash-logo-img, .logo') || img.classList.contains('hero-img');
    const src = img.getAttribute('src');

    if (src) {
      const width = img.closest('.card-img') ? 700 : img.closest('.newsletter-image, .page-hero') ? 900 : 1200;
      img.setAttribute('src', optimizeCloudinaryUrl(src, width));
    }

    if (!isPriority) {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    } else {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
      img.setAttribute('decoding', 'async');
    }
  });
        }
      
