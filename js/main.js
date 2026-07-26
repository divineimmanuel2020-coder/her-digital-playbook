/**
 * main.js – Core Application Entry Point
 * ------------------------------------------------------------
 * Initializes and coordinates all modules, provides global
 * utilities, and manages core interactions.
 */

'use strict';

/* =============================================
   SECTION 1: DOM READY & INITIALIZATION
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all independent modules
    initAllModules();

    // Set up smooth scrolling for internal anchor links
    setupSmoothAnchors();

    // Set up back-to-top button
    setupBackToTop();

    // Set up lazy loading for images
    setupLazyLoading();

    // Setup resize and scroll event listeners with throttling
    setupGlobalEvents();

    // Log successful initialization
    console.log('Her Digital Playbook – Core initialized.');
});

/**
 * Safely initializes all independent modules if they exist.
 * Each module should expose an init function on the window object.
 */
function initAllModules() {
    // Navigation module
    if (typeof window.initNavigation === 'function') {
        window.initNavigation();
    }

    // Splash screen module
    if (typeof window.initSplash === 'function') {
        window.initSplash();
    }

    // Scroll animations module
    if (typeof window.initAnimations === 'function') {
        window.initAnimations();
    }

    // Tools module (future)
    if (typeof window.initTools === 'function') {
        window.initTools();
    }
}

/* =============================================
   SECTION 2: SMOOTH SCROLLING FOR ANCHOR LINKS
   ============================================= */

/**
 * Sets up smooth scrolling for all internal anchor links.
 * Uses native scrollIntoView with smooth behavior.
 */
function setupSmoothAnchors() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* =============================================
   SECTION 3: BACK-TO-TOP BUTTON
   ============================================= */

/**
 * Controls visibility and behavior of the back-to-top button.
 */
function setupBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    // Throttled scroll handler for showing/hiding button
    const handleScroll = throttle(function() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }, 200);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Click handler to scroll to top
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initially hide the button
    backToTopBtn.style.display = 'none';
}

/* =============================================
   SECTION 4: LAZY LOADING IMAGES
   ============================================= */

/**
 * Uses Intersection Observer to lazy-load images with data-src.
 * Falls back to native loading="lazy" if supported.
 */
function setupLazyLoading() {
    // If IntersectionObserver is not supported, use native lazy loading as fallback
    if (!('IntersectionObserver' in window)) {
        // Native lazy loading is supported in modern browsers; fallback does nothing.
        return;
    }

    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                // Stop observing once loaded
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px' // load a bit before entering viewport
    });

    lazyImages.forEach(function(img) {
        imageObserver.observe(img);
    });
}

/* =============================================
   SECTION 5: GLOBAL EVENT HANDLERS
   ============================================= */

/**
 * Sets up resize and scroll event listeners with throttling
 * to improve performance.
 */
function setupGlobalEvents() {
    // Resize handler
    const handleResize = throttle(function() {
        // Perform any resize-dependent updates here
        // (e.g., recalculating layout or adjusting heights)
        // Currently no-op but ready for future use.
    }, 250);

    window.addEventListener('resize', handleResize, { passive: true });

    // Scroll handler (in addition to back-to-top, could be extended)
    const handleScroll = throttle(function() {
        // Additional scroll-dependent logic can be placed here.
        // (e.g., updating parallax effects, sticky header adjustments)
    }, 150);

    window.addEventListener('scroll', handleScroll, { passive: true });
}

/* =============================================
   SECTION 6: UTILITY FUNCTIONS
   ============================================= */

/**
 * Debounce – delays invoking a function until after a specified
 * wait time has elapsed since the last time it was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - Delay in milliseconds.
 * @param {boolean} immediate - If true, trigger the function on the leading edge.
 * @returns {Function} Debounced function.
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Throttle – ensures a function is called at most once in a specified
 * time period.
 * @param {Function} func - The function to throttle.
 * @param {number} limit - Time limit in milliseconds.
 * @returns {Function} Throttled function.
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * Checks if an element is currently visible in the viewport.
 * @param {HTMLElement} element - The DOM element to check.
 * @param {number} offset - Optional offset in pixels to adjust the detection.
 * @returns {boolean} True if element is in viewport.
 */
function isInViewport(element, offset) {
    offset = offset || 0;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    return (
        rect.top <= windowHeight - offset &&
        rect.bottom >= offset &&
        rect.left <= windowWidth - offset &&
        rect.right >= offset
    );
}

/* =============================================
   SECTION 7: DEVELOPMENT HELPERS (optional)
   ============================================= */

// Optionally expose utilities globally for debugging or module use
// (not recommended for production, but useful during development)
// if (process.env.NODE_ENV === 'development') {
//     window.debounce = debounce;
//     window.throttle = throttle;
//     window.isInViewport = isInViewport;
// }
