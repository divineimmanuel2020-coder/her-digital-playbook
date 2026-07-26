/**
 * animations.js – Animation Controller
 * ------------------------------------------------------------
 * Manages scroll reveal animations, floating elements, parallax
 * effects, and other motion enhancements for Her Digital Playbook.
 */

'use strict';

(function() {
    // =============================================
    // PRIVATE VARIABLES
    // =============================================

    // Cached DOM elements
    let revealElements = [];
    let floatingElements = [];
    let parallaxElements = [];
    let cardElements = [];
    let counters = [];

    // Observers
    let revealObserver = null;
    let floatingAnimationId = null;
    let parallaxAnimationId = null;

    // Configuration
    const MOBILE_BREAKPOINT = 768;
    const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // =============================================
    // PUBLIC INITIALIZATION
    // =============================================

    /**
     * Initialize the animations module.
     * Called by main.js when the DOM is ready.
     */
    window.initAnimations = function() {
        // Cache elements
        cacheElements();

        // Setup scroll reveal animations (Intersection Observer)
        setupScrollReveal();

        // Setup floating elements
        setupFloatingElements();

        // Setup parallax effects
        setupParallax();

        // Setup card enhancements (if any)
        setupCardEnhancements();

        // Setup counter support (available for future)
        window.animateCounter = animateCounter;

        // Log initialization
        console.log('Animations: Initialized.');
    };

    // =============================================
    // ELEMENT CACHING
    // =============================================

    /**
     * Cache all DOM elements needed for animations.
     */
    function cacheElements() {
        // Scroll reveal elements (with .reveal class and animation variations)
        revealElements = document.querySelectorAll('.reveal, .fade-in, .fade-up, .fade-down, .fade-left, .fade-right, .zoom-in, .scale-in, .slide-up');

        // Floating elements (with .float class)
        floatingElements = document.querySelectorAll('.hero-img, .newsletter-image img, .sparkle, .blob, .float-element');

        // Parallax elements (with .parallax class)
        parallaxElements = document.querySelectorAll('.parallax');

        // Card elements (with .card class)
        cardElements = document.querySelectorAll('.card');

        // Counters (with .counter class) – future
        counters = document.querySelectorAll('.counter');
    }

    // =============================================
    // 1. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // =============================================

    /**
     * Sets up Intersection Observer to reveal elements when they enter
     * the viewport. Adds a 'visible' class to trigger CSS transitions.
     */
    function setupScrollReveal() {
        if (revealElements.length === 0) return;

        // If reduced motion is preferred, reveal all immediately
        if (REDUCED_MOTION) {
            revealElements.forEach(function(el) {
                el.classList.add('visible');
            });
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px', // trigger slightly before element appears
            threshold: 0.1
        };

        revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally unobserve after reveal to reduce load
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(function(el) {
            revealObserver.observe(el);
        });
    }

    // =============================================
    // 2. FLOATING ELEMENTS
    // =============================================

    /**
     * Creates a gentle floating motion for decorative elements.
     * Uses CSS animations where possible, but provides JS-driven
     * floating for more complex scenarios (optional).
     */
    function setupFloatingElements() {
        if (floatingElements.length === 0) return;
        if (REDUCED_MOTION) {
            // Remove floating animations via CSS if they have inline styles
            floatingElements.forEach(function(el) {
                el.style.animation = 'none';
            });
            return;
        }

        // CSS already has floating animations via .float class and keyframes.
        // We can optionally add dynamic adjustments for staggered delays.
        floatingElements.forEach(function(el, index) {
            // If the element doesn't already have an animation, add a gentle float
            if (!el.style.animation || el.style.animation === 'none') {
                const duration = 4 + Math.random() * 2; // 4-6 seconds
                const delay = Math.random() * 2; // 0-2 seconds
                el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
            }
        });
    }

    // =============================================
    // 3. CARD ENHANCEMENTS
    // =============================================

    /**
     * Provides additional JavaScript enhancements for cards.
     * Currently, CSS handles hover effects, but we can add extra
     * interactivity or dynamic behaviors if needed.
     */
    function setupCardEnhancements() {
        if (cardElements.length === 0) return;

        // Example: Add a subtle tilt on mouse move (optional, not implemented)
        // This is a placeholder for future enhancements.
        // For now, we rely on CSS hover effects.
    }

    // =============================================
    // 4. PARALLAX EFFECTS (Subtle)
    // =============================================

    /**
     * Creates a very subtle parallax effect for decorative background
     * elements. Uses requestAnimationFrame for performance.
     * Disabled on mobile and reduced motion.
     */
    function setupParallax() {
        if (parallaxElements.length === 0) return;
        if (REDUCED_MOTION || window.innerWidth < MOBILE_BREAKPOINT) {
            // Disable parallax
            parallaxElements.forEach(function(el) {
                el.style.transform = 'none';
            });
            return;
        }

        let ticking = false;
        const scrollHandler = function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
        // Initial call
        updateParallax();

        // Store cleanup function
        window.__parallaxCleanup = function() {
            window.removeEventListener('scroll', scrollHandler);
        };
    }

    /**
     * Updates the transform of parallax elements based on scroll position.
     * The effect is very subtle – offset by a small factor.
     */
    function updateParallax() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const speed = 0.05; // very slow movement

        parallaxElements.forEach(function(el) {
            const rect = el.getBoundingClientRect();
            // Only apply parallax when element is roughly in viewport to avoid heavy computation
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (scrollY - rect.top) * speed;
                el.style.transform = `translateY(${offset}px)`;
            }
        });
    }

    // =============================================
    // 5. COUNTER / NUMBER ANIMATION SUPPORT
    // =============================================

    /**
     * Animates a numerical value from start to end over a duration.
     * @param {HTMLElement} element - The DOM element to update.
     * @param {number} start - Starting value.
     * @param {number} end - Ending value.
     * @param {number} duration - Duration in milliseconds.
     * @param {function} formatter - Optional function to format the number.
     */
    function animateCounter(element, start, end, duration, formatter) {
        if (!element) return;
        if (REDUCED_MOTION) {
            // Skip animation, directly set final value
            element.textContent = formatter ? formatter(end) : end;
            return;
        }

        const startTime = performance.now();
        const diff = end - start;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const currentValue = start + diff * ease;
            element.textContent = formatter ? formatter(currentValue) : Math.round(currentValue);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Ensure final value is exact
                element.textContent = formatter ? formatter(end) : end;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // =============================================
    // 6. BUTTON INTERACTION ENHANCEMENTS (Optional)
    // =============================================

    /**
     * Adds optional JavaScript enhancements to buttons.
     * Currently, CSS handles hover effects; this is a placeholder
     * for future enhancements (e.g., ripple effects, dynamic text).
     */
    // No implementation needed for now.

    // =============================================
    // 7. CLEANUP (for potential re-initialization)
    // =============================================

    /**
     * Clean up observers and animations when needed.
     * Can be called externally if required.
     */
    window.cleanupAnimations = function() {
        if (revealObserver) {
            revealObserver.disconnect();
        }
        if (window.__parallaxCleanup) {
            window.__parallaxCleanup();
        }
        if (floatingAnimationId) {
            cancelAnimationFrame(floatingAnimationId);
        }
        if (parallaxAnimationId) {
            cancelAnimationFrame(parallaxAnimationId);
        }
    };

    // =============================================
    // 8. ACCESSIBILITY: REDUCED MOTION
    // =============================================

    // Listen for changes in the reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', function(e) {
        if (e.matches) {
            // Disable animations
            disableAllAnimations();
        } else {
            // Re-enable animations (re-initialize)
            window.initAnimations();
        }
    });

    /**
     * Disables all active animations when reduced motion is preferred.
     */
    function disableAllAnimations() {
        // Remove visible class from reveal elements (they are already revealed)
        // For floating elements, set animation: none
        floatingElements.forEach(function(el) {
            el.style.animation = 'none';
        });
        // Remove parallax transforms
        parallaxElements.forEach(function(el) {
            el.style.transform = 'none';
        });
        // Cleanup observers
        if (revealObserver) {
            revealObserver.disconnect();
        }
        if (window.__parallaxCleanup) {
            window.__parallaxCleanup();
        }
    }

})();
