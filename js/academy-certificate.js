/* =============================================
   JS/ACADEMY-CERTIFICATE.JS
   One reusable certificate engine for all 20 courses. Handles:
   - stable certificate ID generation (never regenerated once made)
   - localStorage CRUD (namespace: hdp-academy-certificates)
   - a real, downloadable PDF via jsPDF (loaded via CDN script tag
     on certificate.html — same "no build step" pattern the site
     already uses for Supabase)
   - share text for LinkedIn / WhatsApp

   Certificate PDF is drawn with vector text and lines directly via
   jsPDF's own API — not a screenshot of the page — so it stays
   sharp at any zoom level and prints cleanly.
   ============================================= */

import { checkAcademyBadges } from './academy-engine.js';

const NS = 'hdp-academy-';
const CERTS_KEY = `${NS}certificates`;

function getJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function setJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function getCertificates() {
  return getJSON(CERTS_KEY, []);
}

export function getCertificateForCourse(courseId) {
  return getCertificates().find((c) => c.courseId === courseId) || null;
}

export function getCertificateById(id) {
  return getCertificates().find((c) => c.certificateId === id) || null;
}

function randomCode(length = 6) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous 0/O/1/I
  let out = '';
  for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function generateCertificateId(courseCode) {
  const year = new Date().getFullYear();
  return `HDP-${courseCode}-${year}-${randomCode()}`;
}

/**
 * Creates (or returns the existing) certificate for a course. This
 * is intentionally idempotent per the brief's stability rule: one
 * certificate = one permanent ID, and calling this again for a
 * course that already has one just returns the original record
 * rather than minting a new ID.
 */
export function createCertificate({ learnerName, course, score }) {
  const existing = getCertificateForCourse(course.id);
  if (existing) return existing;

  const certificate = {
    certificateId: generateCertificateId(course.code),
    learnerName: learnerName.trim(),
    courseId: course.id,
    courseTitle: course.title,
    courseCode: course.code,
    courseLevel: course.difficulty,
    courseScore: score,
    completionDate: new Date().toISOString().slice(0, 10),
    skills: course.certificateSkills || [],
    issuer: 'Her Digital Playbook',
    academy: 'The Playbook Academy',
    status: 'valid',
  };

  const certs = getCertificates();
  certs.push(certificate);
  setJSON(CERTS_KEY, certs);
  checkAcademyBadges();
  return certificate;
}

export function formatCompletionDate(isoDate) {
  const d = new Date(`${isoDate}T00:00:00`);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* =============================================
   FILENAME
   ============================================= */

export function certificateFilename(certificate) {
  const safe = (s) => s.trim().replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-');
  return `Her-Digital-Playbook-${safe(certificate.courseTitle)}-${safe(certificate.learnerName)}.pdf`;
}

/* =============================================
   SHARE TEXT
   ============================================= */

export function buildShareText(certificate, platform) {
  if (platform === 'linkedin') {
    return `I'm excited to share that I've successfully completed ${certificate.courseTitle} through The Playbook Academy by Her Digital Playbook.\n\nCertificate ID: ${certificate.certificateId}\n\nSkills covered included ${(certificate.skills || []).join(', ')}.\n\n#HerDigitalPlaybook #PlaybookAcademy`;
  }
  if (platform === 'whatsapp') {
    return `🎀 I did it!\n\nI just completed the ${certificate.courseTitle} course through The Playbook Academy by Her Digital Playbook.\n\nCertificate ID:\n${certificate.certificateId}\n\nLearn. Build. Earn. Elevate.`;
  }
  return `I just completed ${certificate.courseTitle} through The Playbook Academy by Her Digital Playbook. 🎀\n\nCertificate ID: ${certificate.certificateId}`;
}

/* =============================================
   PDF GENERATION
   Requires window.jspdf to be present (loaded via CDN script tag
   on certificate.html only — not loaded site-wide). Draws the
   certificate with vector text/lines so it stays sharp at any size.
   ============================================= */

export async function downloadCertificatePDF(certificate) {
  if (!window.jspdf) {
    throw new Error('PDF library not loaded');
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const midX = pageW / 2;

  // Soft blush background fill
  doc.setFillColor(253, 242, 245);
  doc.rect(0, 0, pageW, pageH, 'F');

  // Outer border
  doc.setDrawColor(214, 51, 108);
  doc.setLineWidth(0.8);
  doc.rect(8, 8, pageW - 16, pageH - 16);
  // Inner hairline
  doc.setLineWidth(0.2);
  doc.rect(12, 12, pageW - 24, pageH - 24);

  doc.setTextColor(40, 30, 35);

  // Brand
  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.text('Her Digital Playbook', midX, 26, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(160, 100, 120);
  doc.text('THE PLAYBOOK ACADEMY', midX, 32, { align: 'center' });

  doc.setTextColor(40, 30, 35);
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.text('Certificate of Course Completion', midX, 48, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('This certificate is proudly awarded to', midX, 60, { align: 'center' });

  doc.setFont('times', 'bolditalic');
  doc.setFontSize(30);
  doc.setTextColor(214, 51, 108);
  doc.text(certificate.learnerName.toUpperCase(), midX, 74, { align: 'center' });

  doc.setTextColor(40, 30, 35);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('for successfully completing', midX, 84, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.text(certificate.courseTitle.toUpperCase(), midX, 93, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(90, 80, 85);
  const wrapped = doc.splitTextToSize(
    'The learner successfully completed the required lessons, practical assignments, assessments, and final course requirements through the curriculum of The Playbook Academy.',
    pageW - 90
  );
  doc.text(wrapped, midX, 101, { align: 'center' });

  if (certificate.skills?.length) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(160, 100, 120);
    doc.text('COURSE FOCUS', midX, 116, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(90, 80, 85);
    doc.setFontSize(9.5);
    doc.text(certificate.skills.join('   •   '), midX, 121, { align: 'center' });
  }

  // Footer row: date / awarded by / certificate ID
  const footerY = pageH - 26;
  doc.setDrawColor(214, 51, 108);
  doc.setLineWidth(0.2);
  doc.line(24, footerY - 6, pageW - 24, footerY - 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(160, 100, 120);
  doc.text('COMPLETION DATE', 30, footerY);
  doc.text('AWARDED BY', midX, footerY, { align: 'center' });
  doc.text('CERTIFICATE ID', pageW - 30, footerY, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(40, 30, 35);
  doc.text(formatCompletionDate(certificate.completionDate), 30, footerY + 6);
  doc.setFont('helvetica', 'bold');
  doc.text('HER DIGITAL PLAYBOOK', midX, footerY + 6, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.text(certificate.certificateId, pageW - 30, footerY + 6, { align: 'right' });

  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(160, 100, 120);
  doc.text('Learn. Build. Earn. Elevate.', midX, pageH - 12, { align: 'center' });

  doc.save(certificateFilename(certificate));
}
