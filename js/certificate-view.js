/* =============================================
   JS/CERTIFICATE-VIEW.JS
   Drives pages/certificate.html?id=<certificateId>
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';
import { optimizeImages } from './images.js';
import { initGirlGangPopup } from './girlgang-popup.js';
import { maybeShowJoinReminder } from './notifications.js';
import { getCertificateById, formatCompletionDate, downloadCertificatePDF, buildShareText } from './academy-certificate.js';

const gaEvent = (name, params = {}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };

const root = document.getElementById('certificate-root');
const params = new URLSearchParams(window.location.search);
const certId = params.get('id');
const certificate = getCertificateById(certId);

function renderCertificateHtml(c) {
  return `
    <div class="ac-certificate">
      <div class="ac-certificate-inner">
        <p class="ac-cert-brand">Her Digital Playbook</p>
        <p class="ac-cert-academy">THE PLAYBOOK ACADEMY</p>
        <p class="ac-cert-title">✦ Certificate of Course Completion ✦</p>
        <p class="ac-cert-sub">This certificate is proudly awarded to</p>
        <p class="ac-cert-name">${c.learnerName}</p>
        <p class="ac-cert-sub">for successfully completing</p>
        <p class="ac-cert-course">${c.courseTitle}</p>
        <p class="ac-cert-desc">The learner successfully completed the required lessons, practical assignments, assessments, and final course requirements through the curriculum of The Playbook Academy.</p>
        ${c.skills?.length ? `<p class="ac-cert-skills">${c.skills.join(' &nbsp;•&nbsp; ')}</p>` : ''}
        <div class="ac-cert-footer-row">
          <span><strong>COMPLETION DATE</strong>${formatCompletionDate(c.completionDate)}</span>
          <span><strong>AWARDED BY</strong>HER DIGITAL PLAYBOOK</span>
          <span><strong>CERTIFICATE ID</strong>${c.certificateId}</span>
        </div>
        <p class="ac-cert-tagline">Learn. Build. Earn. Elevate.</p>
      </div>
    </div>`;
}

function render() {
  if (!certificate) {
    root.innerHTML = `
      <section class="ac-section"><div class="container" style="max-width:600px;text-align:center;">
        <h1 style="font-family:var(--font-display);">Certificate Not Found</h1>
        <p>We couldn't find a certificate matching that ID on this device. Certificates are currently stored locally on the device where they were earned.</p>
        <a class="btn btn-primary" href="my-academy.html">Back to My Academy</a>
      </div></section>`;
    return;
  }

  root.innerHTML = `
    <section class="ac-section">
      <div class="container ac-cert-page-wrap">
        <div class="ac-section-head">
          <span class="ac-eyebrow">THE PLAYBOOK ACADEMY</span>
          <h1>My Certificate</h1>
        </div>
        ${renderCertificateHtml(certificate)}
        <div class="ac-cert-actions">
          <button class="btn btn-primary" id="download-btn" type="button">Download Certificate</button>
          <button class="btn btn-secondary" id="print-btn" type="button">Print / Save as PDF</button>
          <button class="btn btn-secondary" id="share-btn" type="button">Share My Achievement</button>
        </div>
        <div class="ac-share-menu" id="share-menu" hidden>
          <button class="btn btn-secondary" data-platform="linkedin" type="button">Copy LinkedIn Post</button>
          <button class="btn btn-secondary" data-platform="whatsapp" type="button">Copy WhatsApp Message</button>
        </div>
        <div style="text-align:center;margin-top:2rem;display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
          <span><strong>Course:</strong> ${certificate.courseTitle}</span>
          <span><strong>Learner:</strong> ${certificate.learnerName}</span>
          <span><strong>Status:</strong> Valid (verifiable on this device)</span>
        </div>
        <div class="ac-cert-actions">
          <a class="btn btn-secondary" href="my-academy.html#projects">View My Projects</a>
          <a class="btn btn-secondary" href="my-academy.html">Back to My Academy</a>
        </div>
      </div>
    </section>`;

  document.getElementById('download-btn').addEventListener('click', async () => {
    const btn = document.getElementById('download-btn');
    btn.disabled = true;
    btn.textContent = 'Preparing your PDF…';
    try {
      await downloadCertificatePDF(certificate);
      gaEvent('certificate_download', { course_id: certificate.courseId, certificate_id: certificate.certificateId });
      btn.textContent = 'Certificate Downloaded 🎀';
    } catch {
      btn.textContent = "We couldn't download it — try Print / Save as PDF instead";
    } finally {
      setTimeout(() => { btn.disabled = false; btn.textContent = 'Download Certificate'; }, 2500);
    }
  });

  document.getElementById('print-btn').addEventListener('click', () => {
    document.body.classList.add('ac-printing');
    window.print();
    setTimeout(() => document.body.classList.remove('ac-printing'), 500);
  });

  document.getElementById('share-btn').addEventListener('click', () => {
    document.getElementById('share-menu').hidden = !document.getElementById('share-menu').hidden;
  });

  document.querySelectorAll('#share-menu [data-platform]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = buildShareText(certificate, btn.dataset.platform);
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied! 💗';
        setTimeout(() => { btn.textContent = btn.dataset.platform === 'linkedin' ? 'Copy LinkedIn Post' : 'Copy WhatsApp Message'; }, 1800);
      } catch { /* clipboard unavailable in this context — nothing else to do */ }
    });
  });

  rewriteRootLinks(root);
}

async function init() {
  await Promise.all([
    loadComponent('header-placeholder', '../components/header.html'),
    loadComponent('footer-placeholder', '../components/footer.html'),
    loadComponent('girlgang-popup-placeholder', '../components/girlgang-popup.html'),
  ]);
  await loadComponent('nav-placeholder', '../components/nav.html');
  rewriteRootLinks(document);
  initNav();
  initSearch();
  optimizeImages(document);
  initGirlGangPopup();
  maybeShowJoinReminder();
  if (certificate) gaEvent('certificate_view', { certificate_id: certificate.certificateId });
  render();
}

document.addEventListener('DOMContentLoaded', init);
