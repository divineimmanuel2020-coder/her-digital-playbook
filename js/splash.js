/**
 * splash.js – Splash Screen Controller
 * ------------------------------------------------------------
 * Manages the luxurious splash screen experience for Her Digital Playbook.
 * Controls animation sequencing, timing, and removal.
 */

'use strict';

(function() {
    // =============================================
    // PRIVATE VARIABLES
    // =============================================

    const SPLASH_DURATION = 2800; // 2.8 seconds (within 2.5–3s range)
    const FADE_OUT_DURATION = 800; // ms for fade-out transition

    // DOM elements (cached)
    let splash = null;
    let logo = null;
    let title = null;
    let tagline = null;
    let sparklesContainer = null;

    // Track if splash has been shown in this session
    const SESSION_KEY = 'herDigitalPlaybook_splashShown';

    // =============================================
    // PUBLIC INITIALIZATION
    // =============================================

    /**
     * Initialize the splash screen controller.
     * Called by main.js when the DOM is ready.
     */
    window.initSplash = function() {
        // Check if splash has already been shown in this session
        if (sessionStorage.getItem(SESSION_KEY) === 'true') {
            // Splash already shown, remove it immediately
            removeSplashImmediately();
            return;
        }

        // Cache DOM elements
        splash = document.getElementById('splash');
        if (!splash) {
            console.warn('Splash: Splash element not found.');
            return;
        }

        logo = splash.querySelector('.splash-logo');
        title = splash.querySelector('.splash-title');
        tagline = splash.querySelector('.splash-tagline');
        sparklesContainer = splash.querySelector('.sparkles');

        // Ensure splash is visible (in case it was hidden from a previous session)
        splash.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // prevent scrolling

        // Start the splash sequence
        playSplashSequence();
    };

    // =============================================
    // SPLASH SEQUENCE
    // =============================================

    /**
     * Orchestrates the splash animation sequence using async timing.
     */
    async function playSplashSequence() {
        // Wait for DOM to be ready (already ensured by main.js)
        // Add necessary animation classes (CSS animations already defined)
        // The splash content fades in automatically via CSS keyframes,
        // but we can trigger additional effects if needed.

        // Trigger sparkle generation (if not already in CSS)
        if (sparklesContainer) {
            createSparkles();
        }

        // Wait for the main splash duration
        await delay(SPLASH_DURATION);

        // Fade out the splash screen
        hideSplash();
    }

    /**
     * Hides the splash screen with a smooth fade-out.
     */
    function hideSplash() {
        if (!splash) return;

        // Add hidden class to trigger CSS transition
        splash.classList.add('hidden');

        // Remove from interaction after transition ends
        setTimeout(function() {
            removeSplash();
            // Dispatch custom event for other modules
            window.dispatchEvent(new CustomEvent('splashComplete'));
            // Mark as shown in session
            sessionStorage.setItem(SESSION_KEY, 'true');
        }, FADE_OUT_DURATION);
    }

    /**
     * Removes the splash element from the DOM and re-enables scrolling.
     */
    function removeSplash() {
        if (splash && splash.parentNode) {
            splash.parentNode.removeChild(splash);
        }
        document.body.style.overflow = '';
    }

    /**
     * Immediately remove splash without animation (for reduced motion or pre-shown).
     */
    function removeSplashImmediately() {
        splash = document.getElementById('splash');
        if (splash) {
            splash.style.display = 'none';
            splash.parentNode && splash.parentNode.removeChild(splash);
        }
        document.body.style.overflow = '';
        // Dispatch event for consistency
        window.dispatchEvent(new CustomEvent('splashComplete'));
    }

    // =============================================
    // SPARKLE GENERATION
    // =============================================

    /**
     * Creates floating sparkle elements inside the sparkles container.
     * Uses CSS animations already defined.
     */
    function createSparkles() {
        if (!sparklesContainer) return;
        // Avoid regenerating if already has sparkles
        if (sparklesContainer.children.length > 0) return;

        const SPARKLE_COUNT = 30;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < SPARKLE_COUNT; i++) {
            const dot = document.createElement('div');
            dot.className = 'sparkle-dot';
            // Random position
            dot.style.left = Math.random() * 100 + '%';
            dot.style.top = Math.random() * 100 + '%';
            // Random size
            const size = 3 + Math.random() * 6;
            dot.style.width = size + 'px';
            dot.style.height = size + 'px';
            // Random animation delay and duration
            dot.style.animationDelay = Math.random() * 3 + 's';
            dot.style.animationDuration = (2 + Math.random() * 2) + 's';
            fragment.appendChild(dot);
        }

        sparklesContainer.appendChild(fragment);
    }

    // =============================================
    // UTILITY
    // =============================================

    /**
     * Promise-based delay.
     * @param {number} ms - Milliseconds to wait.
     * @returns {Promise} Resolves after ms.
     */
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // =============================================
    // ACCESSIBILITY: REDUCED MOTION
    // =============================================

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Skip animations and hide splash immediately
        // But we still need to wait a tiny moment to ensure DOM is ready
        // We'll override the init function to handle this.
        const originalInit = window.initSplash;
        window.initSplash = function() {
            // Immediately remove splash if already shown in session
            if (sessionStorage.getItem(SESSION_KEY) === 'true') {
                removeSplashImmediately();
                return;
            }
            // Otherwise, show splash briefly then remove
            splash = document.getElementById('splash');
            if (splash) {
                // Display splash for a short time (0.5s) to respect brand presence
                document.body.style.overflow = 'hidden';
                setTimeout(function() {
                    hideSplash();
                }, 500);
            } else {
                // No splash element, just dispatch event
                window.dispatchEvent(new CustomEvent('splashComplete'));
            }
        };
        // If init is called later, we need to ensure it uses the reduced motion path.
        // We'll also patch the playSplashSequence to skip.
        // Actually, we can just override initSplash as above.
        // Note: originalInit might be called if we don't override.
        // We'll overwrite it for reduced motion case.
        // However, we need to ensure that if initSplash is called, it uses the reduced motion behavior.
        // We'll set a flag.
        window.initSplash = function() {
            // Check session storage
            if (sessionStorage.getItem(SESSION_KEY) === 'true') {
                removeSplashImmediately();
                return;
            }
            splash = document.getElementById('splash');
            if (splash) {
                document.body.style.overflow = 'hidden';
                // Show splash briefly
                splash.classList.remove('hidden');
                setTimeout(function() {
                    hideSplash();
                }, 400); // short display
            } else {
                window.dispatchEvent(new CustomEvent('splashComplete'));
            }
        };
        // Also override hideSplash to use shorter fade if needed? It's fine.
    }

})();
