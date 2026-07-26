/**
 * navigation.js – Navigation Controller
 * ------------------------------------------------------------
 * Manages sticky header, mobile hamburger menu, active link
 * highlighting, smooth scrolling, and accessibility for the
 * Her Digital Playbook website.
 */

'use strict';

(function() {
    // =============================================
    // PRIVATE VARIABLES (cached DOM elements)
    // =============================================

    let header = null;
    let hamburger = null;
    let navList = null;
    let navLinks = [];
    let searchBtn = null;
    let newsletterBtn = null;
    let menuOpen = false;
    let sections = [];
    let sectionObserver = null;

    // =============================================
    // PUBLIC INITIALIZATION
    // =============================================

    /**
     * Initialize the navigation module.
     * Called by main.js when the DOM is ready.
     */
    window.initNavigation = function() {
        // Cache DOM elements
        header = document.getElementById('header');
        hamburger = document.querySelector('.hamburger');
        navList = document.querySelector('.nav-list');
        if (navList) {
            navLinks = Array.from(navList.querySelectorAll('a'));
        }
        searchBtn = document.querySelector('.search-btn');
        newsletterBtn = document.querySelector('.btn-newsletter');

        // If critical elements are missing, exit gracefully
        if (!header || !hamburger || !navList) {
            console.warn('Navigation: Required DOM elements missing.');
            return;
        }

        // 1. Sticky header
        setupStickyHeader();

        // 2. Mobile menu
        setupMobileMenu();

        // 3. Active link highlighting (using Intersection Observer)
        setupActiveLinkObserver();

        // 4. Smooth scrolling for all navigation links
        setupSmoothScrolling();

        // 5. Search button placeholder
        setupSearchButton();

        // 6. Newsletter button scroll
        setupNewsletterButton();

        // 7. Keyboard accessibility
        setupKeyboardAccessibility();

        // 8. Handle window resize (close menu if needed)
        window.addEventListener('resize', handleResize, { passive: true });
    };

    // =============================================
    // 1. STICKY HEADER
    // =============================================

    /**
     * Adds a 'scrolled' class to the header when the user scrolls past
     * the top of the page. Uses requestAnimationFrame for performance.
     */
    function setupStickyHeader() {
        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrollY > 10) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // =============================================
    // 2. MOBILE MENU
    // =============================================

    /**
     * Controls the mobile hamburger menu: open/close, outside click,
     * link selection, and scroll prevention.
     */
    function setupMobileMenu() {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', toggleMenu);

        // Close menu when a nav link is clicked
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close menu when clicking outside the menu area
        document.addEventListener('click', function(e) {
            if (menuOpen && !navList.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        });

        // Keyboard: Escape closes the menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuOpen) {
                closeMenu();
                hamburger.focus();
            }
        });
    }

    /**
     * Toggles the mobile menu state.
     */
    function toggleMenu() {
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    /**
     * Opens the mobile menu.
     */
    function openMenu() {
        if (menuOpen) return;
        hamburger.classList.add('open');
        navList.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        menuOpen = true;

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    }

    /**
     * Closes the mobile menu.
     */
    function closeMenu() {
        if (!menuOpen) return;
        hamburger.classList.remove('open');
        navList.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        menuOpen = false;

        // Restore background scrolling
        document.body.style.overflow = '';
    }

    // =============================================
    // 3. ACTIVE LINK HIGHLIGHTING (Intersection Observer)
    // =============================================

    /**
     * Uses Intersection Observer to detect which section is currently
     * in view and updates the corresponding nav link with an 'active' class.
     */
    function setupActiveLinkObserver() {
        // Collect all sections that are linked to from the nav
        sections = [];
        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                const section = document.querySelector(href);
                if (section) {
                    sections.push({
                        link: link,
                        section: section
                    });
                }
            }
        });

        if (sections.length === 0) return;

        // Use Intersection Observer if supported
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -20% 0px', // trigger when section enters viewport
                threshold: 0.1
            };

            sectionObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const sectionId = '#' + entry.target.id;
                        // Find the matching link
                        navLinks.forEach(function(link) {
                            const href = link.getAttribute('href');
                            if (href === sectionId) {
                                setActiveLink(link);
                            }
                        });
                    }
                });
            }, observerOptions);

            sections.forEach(function(item) {
                sectionObserver.observe(item.section);
            });
        } else {
            // Fallback: simple scroll-based highlighting (throttled)
            let ticking = false;
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    window.requestAnimationFrame(function() {
                        updateActiveLinkOnScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
            // Initial call
            updateActiveLinkOnScroll();
        }
    }

    /**
     * Sets a specific link as active and removes active from others.
     * @param {HTMLElement} activeLink - The link to mark as active.
     */
    function setActiveLink(activeLink) {
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page');
        }
    }

    /**
     * Fallback method to find the current section based on scroll position.
     */
    function updateActiveLinkOnScroll() {
        let currentSectionId = '';
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(function(item) {
            const rect = item.section.getBoundingClientRect();
            const offsetTop = rect.top + scrollPos;
            const offsetBottom = offsetTop + rect.height;

            // If the section's top is near the viewport top, consider it active
            if (offsetTop <= scrollPos + 100 && offsetBottom > scrollPos) {
                currentSectionId = '#' + item.section.id;
            }
        });

        if (currentSectionId) {
            navLinks.forEach(function(link) {
                if (link.getAttribute('href') === currentSectionId) {
                    setActiveLink(link);
                }
            });
        }
    }

    // =============================================
    // 4. SMOOTH SCROLLING FOR NAVIGATION LINKS
    // =============================================

    /**
     * Enables smooth scrolling for all internal anchor links.
     * Uses native scrollIntoView with smooth behavior.
     */
    function setupSmoothScrolling() {
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#') && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // =============================================
    // 5. SEARCH BUTTON PLACEHOLDER
    // =============================================

    /**
     * Sets up a placeholder event handler for the search button.
     * Future implementation can be added without breaking existing code.
     */
    function setupSearchButton() {
        if (!searchBtn) return;
        searchBtn.addEventListener('click', function() {
            // Placeholder: future search functionality
            console.log('Search feature coming soon.');
        });
    }

    // =============================================
    // 6. NEWSLETTER BUTTON SCROLL
    // =============================================

    /**
     * Makes the newsletter button scroll to the newsletter section.
     */
    function setupNewsletterButton() {
        if (!newsletterBtn) return;
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const newsletterSection = document.getElementById('newsletter');
            if (newsletterSection) {
                newsletterSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // =============================================
    // 7. KEYBOARD ACCESSIBILITY
    // =============================================

    /**
     * Ensures the navigation is fully keyboard accessible.
     * Focus management, tab order, and ARIA attributes are handled.
     */
    function setupKeyboardAccessibility() {
        // Ensure hamburger has proper ARIA attributes (already in HTML)
        // Set tabindex for interactive elements if needed
        hamburger.setAttribute('tabindex', '0');

        // Keyboard navigation for hamburger (Enter/Space)
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        // When menu opens, focus the first link
        const menuOpenHandler = function() {
            if (menuOpen && navLinks.length > 0) {
                navLinks[0].focus();
            }
        };

        // We'll observe the menu open state via mutation or custom event.
        // Since we already have openMenu/closeMenu, we can add focus there.
        // Let's override openMenu/closeMenu to include focus management.
        const originalOpenMenu = openMenu;
        const originalCloseMenu = closeMenu;

        openMenu = function() {
            originalOpenMenu();
            // Focus first link after a short delay to allow menu to render
            setTimeout(function() {
                if (menuOpen && navLinks.length > 0) {
                    navLinks[0].focus();
                }
            }, 100);
        };

        closeMenu = function() {
            originalCloseMenu();
            // Return focus to hamburger if it was the trigger
            if (document.activeElement && navList.contains(document.activeElement)) {
                hamburger.focus();
            }
        };

        // Update toggleMenu to use new functions
        toggleMenu = function() {
            if (menuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        };
    }

    // =============================================
    // 8. RESIZE HANDLER
    // =============================================

    /**
     * Closes the mobile menu when the viewport width exceeds the
     * mobile breakpoint (768px).
     */
    function handleResize() {
        const mobileBreakpoint = 768; // matches CSS media query
        if (window.innerWidth >= mobileBreakpoint && menuOpen) {
            closeMenu();
        }
    }

})();
