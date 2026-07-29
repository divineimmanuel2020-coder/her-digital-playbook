/* =============================================
   INCLUDE.JS
   Loads an HTML partial (header, footer, nav, a section...)
   and drops it in place of its placeholder <div>.

   NOTE: fetch() cannot read local files over file:// — this
   requires a local server for development. Run one of:
     npx serve .
     python3 -m http.server
   It works automatically once deployed on Vercel.
   ============================================= */

export async function loadComponent(placeholderId, url) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return false;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    placeholder.outerHTML = await res.text();
    return true;
  } catch (err) {
    placeholder.innerHTML = `
      <p style="padding:24px;text-align:center;color:#b00020;">
        Couldn't load <code>${url}</code>. If you opened this file directly
        (file://), run a local server instead — e.g. <code>npx serve .</code> —
        browsers block fetch() of local files for security reasons.
      </p>`;
    console.error('[include]', err);
    return false;
  }
  }
