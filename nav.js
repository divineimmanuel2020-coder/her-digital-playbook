/* =============================================
   NAV.JS
   Mobile hamburger toggle + active-link highlighting.
   Works for both the in-page anchors (Home/Articles/Categories/
   Free Tools) and the links to subsequent pages (About/Shop).
   ============================================= */

export function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');

  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight whichever nav link matches the current page
  const currentPath = window.location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.nav-list a[data-nav]').forEach((link) => {
    const linkPath = link.getAttribute('href').split('#')[0].replace(/index\.html$/, '');
    if (linkPath && linkPath === currentPath) {
      link.classList.add('active');
    }
  });
                            }
    
