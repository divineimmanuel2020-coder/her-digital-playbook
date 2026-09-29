/* =============================================
   PLAYBOOK-LIVE.JS
   Behaviour for /playbook-live. The page's content is already in the
   HTML (nothing here is needed to read it); this script adds:

     - smooth scrolling from the hero / cards to each section
     - revealing each application form when its "Apply" button is pressed
     - client-side validation (the server re-checks everything)
     - the two-step submit:
         1. video (Host + Talent Team only): ask /api/playbook-live-upload-url
            for a one-time signed upload token, then upload the file straight
            to the PRIVATE Supabase Storage bucket
         2. POST the answers + the video's storage path to
            /api/playbook-live-apply, which stores them and emails the owner
     - non-personal analytics events (never names, emails, numbers or answers)

   No secrets live here: the Supabase key on this page is the public anon
   key that js/supabase.js already ships, and it can do nothing with the
   private bucket without a token issued by our own server.
   ============================================= */

import { loadComponent } from './include.js';
import { initNav } from './nav.js';
import { rewriteRootLinks } from './base.js';
import { initSearch } from './search.js';

const BUCKET = 'playbook-live-applications';
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;
const VIDEO_TYPES = { mp4: 'video/mp4', mov: 'video/quicktime', webm: 'video/webm' };
const MIN_SECONDS = 25; // "30–60 seconds" with a little tolerance either side
const MAX_SECONDS = 65;

const EVENT_PREFIX = { host: 'host', team: 'talent', subagent: 'subagent' };

const MESSAGES = {
  generic: 'Something went wrong while submitting your application. Please check your connection and try again.',
  underage: 'Playbook Live opportunities are available only to adults aged 18 and over.',
  'rate-limited': "You've sent several applications recently. Please try again a little later.",
  'file-too-large': 'Your video is over the 50 MB limit. Please record a shorter or lower-resolution video and try again.',
  'invalid-file-type': 'Please upload an MP4, MOV or WebM video.',
  'video-missing': "We couldn't confirm your video upload. Please try again.",
  'video-invalid': "We couldn't accept that video file. Please upload an MP4, MOV or WebM video under 50 MB.",
  'video-already-used': "That video has already been submitted. Please choose your video again.",
  upload: "We couldn't upload your video. Please check your connection and try again.",
};

/* ---------- analytics (non-personal only) ---------- */

function track(name, params) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
}

/* ---------- small helpers ---------- */

const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function scrollToEl(el) {
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

function pfxOf(form) { return form.id.replace(/-form$/, ''); }

function inferVideoType(file) {
  if (Object.values(VIDEO_TYPES).includes(file.type)) return file.type;
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  return VIDEO_TYPES[ext] || null;
}

function formatBytes(n) { return `${(n / (1024 * 1024)).toFixed(1)} MB`; }
function formatTime(s) { return `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`; }

/** Video length in seconds, or null if the browser can't read it (e.g. some HEVC files). */
function readDuration(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const v = document.createElement('video');
    const done = (val) => { URL.revokeObjectURL(url); v.removeAttribute('src'); v.load(); resolve(val); };
    const timer = setTimeout(() => done(null), 4000);
    v.preload = 'metadata';
    v.muted = true;
    v.onloadedmetadata = () => { clearTimeout(timer); done(Number.isFinite(v.duration) ? v.duration : null); };
    v.onerror = () => { clearTimeout(timer); done(null); };
    v.src = url;
  });
}

/* ---------- per-form error display ---------- */

function inputsNamed(form, name) { return [...form.querySelectorAll(`[name="${name}"]`)]; }

function setError(form, name, message) {
  const pfx = pfxOf(form);
  const el = document.getElementById(`${pfx}-${name}-error`);
  if (el) el.textContent = message || '';
  inputsNamed(form, name).forEach((input) => {
    const holder = input.type === 'radio' ? input.closest('fieldset') : input;
    if (!holder) return;
    if (message) holder.setAttribute('aria-invalid', 'true');
    else holder.removeAttribute('aria-invalid');
  });
}

function clearErrors(form) {
  form.querySelectorAll('.pl-error').forEach((el) => { el.textContent = ''; });
  form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
  const top = document.getElementById(`${pfxOf(form)}-form-error`);
  if (top) top.textContent = '';
}

function focusField(form, name) {
  const first = inputsNamed(form, name)[0];
  if (!first) return;
  first.focus({ preventScroll: true });
  first.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
}

/* ---------- reading + validating a form ---------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readForm(form) {
  const v = (name) => (form.elements[name]?.value ?? '').toString().trim();
  const radio = (name) => form.querySelector(`input[name="${name}"]:checked`)?.value || '';
  const type = form.dataset.type;
  const base = {
    applicationType: type,
    name: v('name'), email: v('email'), whatsapp: v('whatsapp'), country: v('country'),
    confirm18: !!form.elements.confirm18?.checked,
    consentPrivacy: !!form.elements.consentPrivacy?.checked,
  };
  if (type === 'host') {
    return { ...base, age: v('age'), priorExperience: radio('priorExperience'), hours: radio('hours'), about: v('about') };
  }
  if (type === 'team') {
    return { ...base, role: radio('role'), experience: v('experience'), hours: radio('hours'), expectedPay: v('expectedPay'), note: v('note') };
  }
  return {
    ...base, accessToHosts: radio('accessToHosts'), hostsRange: radio('hostsRange'), monthlyRange: radio('monthlyRange'),
    network: v('network'), socialUrl: v('socialUrl'),
  };
}

/** Returns [{ field, message }] — empty when the form is OK. */
function validate(form, data, videoState) {
  const problems = [];
  const need = (field, ok, message) => { if (!ok) problems.push({ field, message }); };

  need('name', data.name.length >= 2, 'Please enter your full name.');
  need('email', EMAIL_RE.test(data.email), 'Please enter a valid email address.');
  const digits = data.whatsapp.replace(/\D/g, '');
  need('whatsapp', /^[+\d][\d\s().-]*$/.test(data.whatsapp) && digits.length >= 7 && digits.length <= 16,
    'Please enter a valid WhatsApp number, including your country code.');
  need('country', data.country.length >= 2, 'Please tell us your country.');

  if (data.applicationType === 'host') {
    const age = Number(data.age);
    if (!/^\d{1,2}$/.test(data.age) || age < 1) need('age', false, 'Please enter your age.');
    else need('age', age >= 18, MESSAGES.underage);
    need('priorExperience', !!data.priorExperience, 'Please choose an answer.');
    need('hours', !!data.hours, 'Please choose your weekly availability.');
    need('about', data.about.length >= 10, 'Please tell us a little about yourself.');
  } else if (data.applicationType === 'team') {
    need('role', !!data.role, 'Please choose a role.');
    need('experience', data.experience.length >= 10, 'Please tell us about your experience.');
    need('hours', !!data.hours, 'Please choose your weekly availability.');
    need('expectedPay', data.expectedPay.length >= 1, 'Please tell us your expected monthly pay.');
  } else {
    need('accessToHosts', !!data.accessToHosts, 'Please choose an answer.');
    need('hostsRange', !!data.hostsRange, 'Please choose a range.');
    need('monthlyRange', !!data.monthlyRange, 'Please choose a range.');
    need('network', data.network.length >= 10, 'Please tell us briefly about your network.');
    if (data.socialUrl) {
      try {
        const u = new URL(/^https?:\/\//i.test(data.socialUrl) ? data.socialUrl : `https://${data.socialUrl}`);
        if (!u.hostname.includes('.')) throw new Error('bad');
      } catch { need('socialUrl', false, 'Please enter a valid link, or leave this blank.'); }
    }
  }

  if (form.dataset.video === '1') need('video', !!videoState.file && !videoState.error, videoState.error || 'Please add your introduction video.');
  // 18+ applies to every Playbook Live path, not just Hosts — see the page's
  // "18+ ONLY" badge and footer, so every form (Host, Talent Team, Sub-Agent)
  // carries this same checkbox, even though only the Host field list in the
  // spec calls it out explicitly.
  need('confirm18', data.confirm18, 'Please confirm that you are 18 or older.');
  need('consentPrivacy', data.consentPrivacy, 'Please give your consent so we can review your application.');
  return problems;
}

/* ---------- network ---------- */

async function postJson(url, payload) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let data = null;
  try { data = await res.json(); } catch { /* non-JSON error page */ }
  return { ok: res.ok && data && data.success, status: res.status, data: data || {} };
}

class SubmitError extends Error {
  constructor(code, field) { super(code); this.code = code; this.field = field; }
}

async function uploadVideo(form, state, extra) {
  const file = state.file;
  const type = inferVideoType(file);
  const key = `${file.name}|${file.size}|${file.lastModified}`;
  if (state.uploadedPath && state.uploadedKey === key) return state.uploadedPath; // already uploaded on a previous attempt

  const issued = await postJson('/api/playbook-live-upload-url', {
    applicationType: form.dataset.type, fileType: type, fileSize: file.size, ...extra,
  });
  if (!issued.ok) throw new SubmitError(issued.data.error || 'upload');

  const client = window.hdpSupabase;
  if (!client?.storage) throw new SubmitError('upload');
  const body = file.type === type ? file : new File([file], file.name, { type });
  const { error } = await client.storage.from(BUCKET).uploadToSignedUrl(issued.data.path, issued.data.token, body, { contentType: type });
  if (error) {
    track('application_video_upload_error', { application_type: form.dataset.type });
    throw new SubmitError('upload');
  }
  track('application_video_upload_success', { application_type: form.dataset.type });
  state.uploadedPath = issued.data.path;
  state.uploadedKey = key;
  return state.uploadedPath;
}

/* ---------- one form ---------- */

function setupForm(form) {
  const pfx = pfxOf(form);
  const type = form.dataset.type;
  const statusEl = document.getElementById(`${pfx}-status`);
  const successEl = document.getElementById(`${pfx}-success`);
  const submitBtn = form.querySelector('.pl-submit');
  const formError = document.getElementById(`${pfx}-form-error`);
  const videoInput = form.elements.video;
  const videoInfo = document.getElementById(`${pfx}-video-info`);
  const state = { file: null, error: '', uploadedPath: null, uploadedKey: null };
  let submitting = false;

  const status = (msg) => {
    statusEl.textContent = msg || '';
    statusEl.classList.toggle('is-active', !!msg);
  };

  // age: digits only, and tell under-18s immediately
  const ageInput = form.elements.age;
  if (ageInput) {
    const check = () => {
      ageInput.value = ageInput.value.replace(/\D/g, '');
      const n = Number(ageInput.value);
      setError(form, 'age', ageInput.value && n > 0 && n < 18 ? MESSAGES.underage : '');
    };
    ageInput.addEventListener('input', check);
    ageInput.addEventListener('blur', check);
  }

  // clear a field's error as soon as she changes it
  form.addEventListener('input', (e) => { if (e.target.name && e.target.name !== 'age') setError(form, e.target.name, ''); });
  form.addEventListener('change', (e) => { if (e.target.name && e.target.name !== 'video') setError(form, e.target.name, ''); });

  if (videoInput) {
    videoInput.addEventListener('change', async () => {
      const file = videoInput.files?.[0] || null;
      state.file = null; state.error = ''; state.uploadedPath = null; state.uploadedKey = null;
      videoInfo.textContent = ''; videoInfo.classList.remove('is-ok');
      setError(form, 'video', '');
      if (!file) return;

      const inferred = inferVideoType(file);
      if (!inferred) { state.error = MESSAGES['invalid-file-type']; setError(form, 'video', state.error); return; }
      if (file.size > MAX_VIDEO_BYTES) { state.error = MESSAGES['file-too-large']; setError(form, 'video', state.error); return; }

      videoInfo.textContent = 'Checking your video…';
      const seconds = await readDuration(file);
      if (seconds !== null && (seconds < MIN_SECONDS || seconds > MAX_SECONDS)) {
        state.error = `Your video is about ${Math.round(seconds)} seconds long. Please record between 30 and 60 seconds.`;
        videoInfo.textContent = '';
        setError(form, 'video', state.error);
        return;
      }
      state.file = file;
      videoInfo.textContent = `✓ ${file.name} · ${formatBytes(file.size)}${seconds !== null ? ` · ${formatTime(seconds)}` : ''}`;
      videoInfo.classList.add('is-ok');
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitting) return;
    clearErrors(form);

    const data = readForm(form);
    const problems = validate(form, data, state);
    if (problems.length) {
      problems.forEach((p) => setError(form, p.field, p.message));
      focusField(form, problems[0].field);
      return;
    }

    submitting = true;
    submitBtn.disabled = true;
    const label = submitBtn.textContent;
    submitBtn.textContent = 'SENDING…';

    const opened = Number(form.dataset.openedAt || performance.now());
    const guard = () => ({ website: form.elements.website.value, elapsedMs: Math.round(performance.now() - opened) });

    try {
      let videoPath;
      if (form.dataset.video === '1') {
        status('Uploading your video… please keep this page open.');
        videoPath = await uploadVideo(form, state, guard());
      }
      status('Sending your application…');
      const result = await postJson('/api/playbook-live-apply', { ...data, ...(videoPath ? { videoPath } : {}), ...guard() });
      if (!result.ok) {
        if (['video-missing', 'video-invalid', 'video-already-used'].includes(result.data.error)) {
          state.uploadedPath = null; state.uploadedKey = null; // force a fresh upload next time
        }
        throw new SubmitError(result.data.error || 'generic', result.data.field);
      }

      // success
      track(`${EVENT_PREFIX[type]}_application_submit`);
      status('');
      form.hidden = true;
      successEl.hidden = false;
      const idEl = document.getElementById(`${pfx}-success-id`);
      const appId = result.data.applicationId;
      idEl.textContent = appId && appId !== 'PL-RECEIVED' ? `Reference: ${appId}` : '';
      scrollToEl(successEl);
      successEl.focus({ preventScroll: true });
    } catch (err) {
      status('');
      const code = err instanceof SubmitError ? err.code : 'generic';
      const message = MESSAGES[code] || (code.startsWith('invalid-') || code.includes('required') ? 'Please check the highlighted answers and try again.' : MESSAGES.generic);
      if (err.field && inputsNamed(form, err.field).length) {
        setError(form, err.field, code === 'underage' ? MESSAGES.underage : message);
        focusField(form, err.field);
      }
      formError.textContent = code === 'underage' ? MESSAGES.underage : message;
      if (!(err instanceof SubmitError)) console.error('[playbook-live]', err);
    } finally {
      submitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = label;
    }
  });
}

/* ---------- page init ---------- */

function initOpenButtons() {
  const started = new Set();
  document.querySelectorAll('[data-open-form]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pfx = btn.dataset.openForm;
      const wrap = document.getElementById(`${pfx === 'subagent' ? 'sub' : pfx}-form-wrap`);
      const form = wrap?.querySelector('form');
      if (!wrap || !form) return;
      const firstOpen = wrap.hidden;
      wrap.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      if (firstOpen) form.dataset.openedAt = String(performance.now());
      if (!started.has(pfx)) {
        started.add(pfx);
        track(`${EVENT_PREFIX[form.dataset.type]}_application_start`);
      }
      scrollToEl(wrap);
      window.setTimeout(() => form.querySelector('input:not([type="hidden"])')?.focus({ preventScroll: true }), reduceMotion ? 0 : 450);
    });
  });
}

function initScrollLinks() {
  document.querySelectorAll('a[data-scroll], a[data-back-to-top]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      scrollToEl(target);
      history.replaceState(null, '', a.getAttribute('href'));
    });
  });
}

async function init() {
  // header/footer are already inlined into the page by scripts/build.mjs;
  // these calls are only a safety net for a copy saved without that step.
  await Promise.all([
    loadComponent('header-placeholder', 'components/header.html'),
    loadComponent('footer-placeholder', 'components/footer.html'),
  ]);
  await loadComponent('nav-placeholder', 'components/nav.html');
  rewriteRootLinks(document);
  initNav();
  initSearch();

  track('playbook_live_view');
  initScrollLinks();
  initOpenButtons();
  document.querySelectorAll('.pl-form').forEach(setupForm);
}

document.addEventListener('DOMContentLoaded', init);
