/* =============================================
   JS/VERIFY.JS
   Drives pages/verify.html?id=<certificateId>

   HONESTY NOTE: this checks localStorage on the CURRENT device
   only. A certificate earned on one device cannot be verified from
   another until a real backend (e.g. Supabase) exists. The UI says
   exactly that — it never implies global verification it can't
   actually perform. The data shape here matches what a future
   backend-verification endpoint would return, so wiring one in
   later is a data-source swap, not a rewrite.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { getCertificateById, formatCompletionDate } from './academy-certificate.js';

const root = document.getElementById('verify-root');
const params = new URLSearchParams(window.location.search);
const certId = params.get('id');

function render() {
  if (!certId) {
    root.innerHTML = `<div class="ac-empty-state">Enter a certificate ID to check it.
      <form id="lookup-form" style="margin-top:1rem;"><input class="ac-name-input" id="lookup-input" placeholder="HDP-XXXX-2026-XXXXXX"><button class="btn btn-primary" type="submit">Check Certificate</button></form>
    </div>`;
    document.getElementById('lookup-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('lookup-input').value.trim();
      if (val) window.location.href = `verify.html?id=${encodeURIComponent(val)}`;
    });
    return;
  }

  const certificate = getCertificateById(certId);
  if (!certificate) {
    root.innerHTML = `
      <div class="ac-empty-state">
        <h2 style="font-family:var(--font-display);">Certificate Not Found</h2>
        <p>We couldn't find a certificate matching that ID <strong>on this device</strong>.</p>
        <p class="pg-disclaimer">Certificate verification is currently local-only — it checks this browser's saved records, not a global database. Verifying from a different device isn't possible yet.</p>
      </div>`;
    return;
  }

  root.innerHTML = `
    <div class="ac-assessment-result passed" style="text-align:left;">
      <p style="text-align:center;font-size:1.5rem;">✓ VALID (on this device)</p>
      <table class="ac-rubric-table" style="margin-top:1rem;">
        <tr><td><strong>Learner</strong></td><td>${certificate.learnerName}</td></tr>
        <tr><td><strong>Course</strong></td><td>${certificate.courseTitle}</td></tr>
        <tr><td><strong>Awarded By</strong></td><td>Her Digital Playbook — The Playbook Academy</td></tr>
        <tr><td><strong>Completion Date</strong></td><td>${formatCompletionDate(certificate.completionDate)}</td></tr>
        <tr><td><strong>Certificate ID</strong></td><td>${certificate.certificateId}</td></tr>
      </table>
      <p class="pg-disclaimer" style="margin-top:1rem;">This check was performed against records saved on this device, not a public database. A future backend-verified version of this page can confirm a certificate from any device.</p>
    </div>`;
}

async function init() {
  await Promise.all([
    loadComponent('header-placeholder', '../components/header.html'),
    loadComponent('footer-placeholder', '../components/footer.html'),
  ]);
  await loadComponent('nav-placeholder', '../components/nav.html');
  rewriteRootLinks(document);
  initNav();
  initSearch();
  optimizeImages(document);
  render();
}

document.addEventListener('DOMContentLoaded', init);
