/* =============================================
   BASE.JS
   header.html / nav.html / footer.html are shared components
   injected at two different folder depths: the homepage at
   the project root, everything else one level down in
   /pages/. A single hardcoded link in those files can't point
   "home" correctly from both depths at once — so those three
   files write their links with a leading single "/" (meaning
   "from the site's root"), and rewriteRootLinks() below turns
   that into a real URL at runtime.

   BASE is computed from where this very script was loaded
   from, so it's automatically correct whether the site sits
   at a domain root (Vercel) or a GitHub Pages project subpath
   like /her-digital-playbook/ — nothing here is hardcoded.
   ============================================= */

export const BASE = new URL('..', import.meta.url).href; // e.g. https://user.github.io/repo-name/

export function rewriteRootLinks(scope = document) {
  const root = BASE.replace(/\/$/, '');
  scope.querySelectorAll('a[href^="/"], link[href^="/"], script[src^="/"], img[src^="/"]').forEach((el) => {
    const attr = el.hasAttribute('href') ? 'href' : 'src';
    const value = el.getAttribute(attr);
    if (value.startsWith('//')) return; // protocol-relative URL — leave alone
    el.setAttribute(attr, root + value);
  });
}
