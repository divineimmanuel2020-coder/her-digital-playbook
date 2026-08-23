/* =============================================
   NEWSLETTER.JS
   The full "Join Our Girl Gang" experience: validation, a
   POST to /api/subscribe (which handles Supabase + the Resend
   welcome email server-side), and warm, branded UI for every
   outcome — success, duplicate email, network failure, or an
   unexpected error. Never a browser alert(), never a raw
   database error shown to the reader.

   Architecture (kept deliberately separated so future features
   don't require rewriting this file):
     - VALIDATION   — pure functions, no DOM, no network
     - DATA LAYER   — talks to /api/subscribe only, never directly
                      to Supabase from the browser
     - UI RENDERING — one function per visual state, all working
                      against the same #newsletter-panel container
     - WIRING       — initNewsletter() ties the above together
   ============================================= */

import { BASE } from './base.js';
import { markSubscribed } from './subscription-state.js';
import { showWelcomeNotification } from './notifications.js';

/* =============================================
   VALIDATION
   ============================================= */

function isValidName(name) {
  return name.trim().length >= 2;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/* =============================================
   DATA LAYER
   Talks to our own /api/subscribe serverless function — never
   directly to Supabase or Resend from the browser. That function
   saves the subscriber AND sends the welcome email server-side,
   where the Resend API key and Supabase service_role key can stay
   hidden in Vercel's environment variables.

   Throws a small, typed error so the UI layer can decide what to
   show without knowing anything about HTTP status codes itself.
   ============================================= */

async function insertSubscriber(name, email) {
  let res;
  try {
    res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
  } catch (networkErr) {
    // fetch() throws a TypeError when the network itself fails
    // (offline, DNS, CORS-from-nowhere) — before our function ever
    // gets a chance to return a structured error.
    console.error('[newsletter] network error', networkErr);
    const err = new Error('network failure');
    err.kind = 'network';
    throw err;
  }

  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    // ignore — handled by the res.ok / status checks below
  }

  if (res.ok && data && data.success) {
    return;
  }

  if (res.status === 409 || (data && data.error === 'duplicate')) {
    const err = new Error('duplicate subscriber');
    err.kind = 'duplicate';
    throw err;
  }

  console.error('[newsletter] /api/subscribe error', res.status, data);
  const err = new Error('unexpected subscribe error');
  err.kind = 'unexpected';
  throw err;
}

/* =============================================
   FX — confetti, floating hearts, sparkles
   Self-cleaning: every piece removes itself after its animation.
   ============================================= */

function launchConfetti(layer) {
  if (!layer) return;
  const colors = ['#ec5c82', '#f6c9d6', '#c9a253', '#fbe0e8', '#ffffff'];
  for (let i = 0; i < 26; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${(Math.random() * 0.3).toFixed(2)}s`;
    piece.style.setProperty('--rot', `${Math.floor(Math.random() * 360)}deg`);
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 1800);
  }
}

function launchFloatingHearts(layer) {
  if (!layer) return;
  const hearts = ['💗', '💕', '💖'];
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement('span');
    heart.className = 'fx-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = `${10 + Math.random() * 80}%`;
    heart.style.animationDelay = `${(Math.random() * 0.6).toFixed(2)}s`;
    heart.style.fontSize = `${14 + Math.random() * 14}px`;
    layer.appendChild(heart);
    setTimeout(() => heart.remove(), 2600);
  }
}

function launchSparkles(layer) {
  if (!layer) return;
  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'fx-sparkle';
    sparkle.textContent = '✦';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${(Math.random() * 1).toFixed(2)}s`;
    layer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
  }
}

function celebrate(layer) {
  launchConfetti(layer);
  launchFloatingHearts(layer);
  launchSparkles(layer);
}

/* =============================================
   UI RENDERING
   Every render* function replaces #newsletter-panel's content
   and returns nothing — event wiring for whatever it rendered
   happens in the WIRING section below, right after each call.
   ============================================= */

function renderFormState(panel) {
  panel.innerHTML = `
    <h2 class="newsletter-title">Join Our Girl Gang 🎀</h2>
    <p class="newsletter-desc newsletter-desc-glow">Get beautiful Big Sis Letters straight to your inbox — career advice, AI tips, freelancing opportunities, online business ideas, motivation, and practical guidance, girl to girl.</p>
    <ul class="newsletter-perks">
      <li>♡ Expert insights</li>
      <li>✎ Practical tips</li>
      <li>✦ Exclusive resources</li>
      <li>🎁 Free tools &amp; templates</li>
    </ul>
    <form class="newsletter-form" id="newsletter-form" novalidate>
      <div class="newsletter-field">
        <label for="newsletter-name" class="sr-only">Your name</label>
        <input type="text" id="newsletter-name" placeholder="Your name" autocomplete="name" aria-describedby="newsletter-name-error">
        <span class="newsletter-field-error" id="newsletter-name-error" role="alert"></span>
      </div>
      <div class="newsletter-field">
        <label for="newsletter-email" class="sr-only">Your email address</label>
        <input type="email" id="newsletter-email" placeholder="Your email address" autocomplete="email" aria-describedby="newsletter-email-error">
        <span class="newsletter-field-error" id="newsletter-email-error" role="alert"></span>
      </div>
      <button class="btn btn-primary" id="newsletter-submit" type="submit">Join The Girl Gang 🎀</button>
    </form>
    <p class="newsletter-note">No spam. Just good things for your inbox. Pinky promise. ♡</p>
  `;
}

/* =============================================
   POST-SUBSCRIBE CELEBRATION POPUP
   A separate, dedicated on-site popup shown the moment a
   subscription actually succeeds — distinct from the inline
   success card in the form itself, and distinct from the browser
   Notification API welcome ping. Built entirely inline (no
   component file needed) since it only ever needs to exist for
   the few seconds right after a real success.

   Built display:none by default with pointer-events:none as a
   baseline safety habit — the earlier Girl Gang reminder popup
   once shipped with an always-rendered invisible overlay that
   silently blocked every click on the site, so every popup here
   on out starts from "impossible to accidentally cover the page."
   ============================================= */
function showSubscribedPopup() {
  let overlay = document.getElementById('subscribed-popup-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'subscribed-popup-overlay';
    overlay.className = 'subscribed-popup-overlay';
    overlay.innerHTML = `
      <div class="subscribed-popup" role="dialog" aria-modal="true" aria-labelledby="subscribed-popup-title">
        <button class="subscribed-popup-close" id="subscribed-popup-close" type="button" aria-label="Close">✕</button>
        <p class="subscribed-popup-emoji">🎀</p>
        <h2 class="subscribed-popup-title" id="subscribed-popup-title">Hey Beautiful, you're part of the Girl Gang! 🙈</h2>
        <p class="subscribed-popup-text">Girl if you don't find our email, check promotions tab in your Gmail app, Tap the three dots menu at the top right, click on <strong>MOVE TO</strong>, then move us to <strong>Primary</strong> to keep receiving more beautiful emails. Don't miss the life-changing opportunities we've got for you. ✨</p>
      </div>`;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('#subscribed-popup-close');
    const hide = () => {
      overlay.classList.remove('visible');
      window.setTimeout(() => { overlay.hidden = true; }, 250);
    };
    closeBtn.addEventListener('click', hide);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) hide();
    });
  }

  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add('visible'));
}

function renderSuccess(panel, fxLayer) {
  markSubscribed();
  showWelcomeNotification();
  showSubscribedPopup();
  // GA4: record the successful signup itself — never the subscriber's
  // name or email, and nothing else identifying. window.gtag is only
  // ever absent if a page hasn't loaded the GA snippet at all, so this
  // stays a safe no-op rather than throwing if that's ever the case.
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'newsletter_signup');
  }
  panel.innerHTML = `
    <div class="newsletter-result-card success" tabindex="-1" id="newsletter-result-heading">
      <p class="newsletter-result-emoji">🎉</p>
      <h2 class="newsletter-result-title">Welcome to the Girl Gang!</h2>
      <p class="newsletter-result-text">Girl... I'm genuinely so excited you're here.</p>
      <p class="newsletter-result-text">Every week you'll receive practical digital skills, AI tips, online income ideas, beautiful resources, and exclusive content designed to help you build your dream life.</p>
      <p class="newsletter-result-text">This isn't spam. It's your digital glow-up journey. Welcome home. 🎀🫂</p>
      <p class="newsletter-result-text newsletter-result-next-step">Girl if you don't find our email, check promotions tab in your Gmail app, Tap the three dots menu at the top right, click on <strong>MOVE TO</strong>, then move us to <strong>Primary</strong> to keep receiving more beautiful emails. Don't miss the life-changing opportunities we've got for you. ✨</p>
      <div class="newsletter-result-actions">
        <a class="btn btn-secondary" href="${BASE}index.html#articles">✨ Explore Articles</a>
        <a class="btn btn-secondary" href="${BASE}index.html#tools">✨ Try A Free Tool</a>
      </div>
    </div>
  `;
  celebrate(fxLayer);
  panel.querySelector('#newsletter-result-heading')?.focus();
}

function renderDuplicate(panel) {
  markSubscribed();
  panel.innerHTML = `
    <div class="newsletter-result-card duplicate" tabindex="-1" id="newsletter-result-heading">
      <p class="newsletter-result-emoji">💖</p>
      <h2 class="newsletter-result-title">Hey Queen!</h2>
      <p class="newsletter-result-text">Looks like you're already part of the Girl Gang. Check your inbox, because exciting things are already on their way.</p>
      <p class="newsletter-result-text newsletter-result-next-step">Girl if you don't find our email, check promotions tab in your Gmail app, Tap the three dots menu at the top right, click on <strong>MOVE TO</strong>, then move us to <strong>Primary</strong> to keep receiving more beautiful emails. Don't miss the life-changing opportunities we've got for you. ✨</p>
      <div class="newsletter-result-actions">
        <a class="btn btn-secondary" href="${BASE}index.html#articles">Go To Articles</a>
        <a class="btn btn-secondary" href="${BASE}pages/article.html?id=first-2000-online">Read Latest Guide</a>
      </div>
    </div>
  `;
}

function renderNetworkError(panel, onRetry) {
  panel.innerHTML = `
    <div class="newsletter-result-card error" tabindex="-1" id="newsletter-result-heading">
      <p class="newsletter-result-emoji">☕</p>
      <h2 class="newsletter-result-title">Oops...</h2>
      <p class="newsletter-result-text">Looks like your internet took a little coffee break. Let's try again in a moment.</p>
      <div class="newsletter-result-actions">
        <button class="btn btn-primary" id="newsletter-retry-btn" type="button">Try Again</button>
      </div>
    </div>
  `;
  panel.querySelector('#newsletter-retry-btn')?.addEventListener('click', onRetry);
  panel.querySelector('#newsletter-result-heading')?.focus();
}

function renderUnexpectedError(panel, onRetry) {
  panel.innerHTML = `
    <div class="newsletter-result-card error" tabindex="-1" id="newsletter-result-heading">
      <p class="newsletter-result-emoji">💗</p>
      <h2 class="newsletter-result-title">Something unexpected happened.</h2>
      <p class="newsletter-result-text">Don't worry — your dreams are still safe. Let's try again.</p>
      <div class="newsletter-result-actions">
        <button class="btn btn-primary" id="newsletter-retry-btn" type="button">Retry</button>
      </div>
    </div>
  `;
  panel.querySelector('#newsletter-retry-btn')?.addEventListener('click', onRetry);
  panel.querySelector('#newsletter-result-heading')?.focus();
}

/* =============================================
   WIRING
   ============================================= */

export function initNewsletter() {
  const panel = document.getElementById('newsletter-panel');
  const fxLayer = document.getElementById('newsletter-fx');
  if (!panel) return;

  // Remembers the last submitted name/email so "Try Again" / "Retry"
  // can re-attempt the same submission without making the reader
  // retype anything.
  let lastAttempt = null;

  function bindFormEvents() {
    const form = document.getElementById('newsletter-form');
    const nameInput = document.getElementById('newsletter-name');
    const emailInput = document.getElementById('newsletter-email');
    const nameError = document.getElementById('newsletter-name-error');
    const emailError = document.getElementById('newsletter-email-error');
    const submitBtn = document.getElementById('newsletter-submit');
    if (!form) return;

    function setLoading(isLoading) {
      submitBtn.disabled = isLoading;
      submitBtn.setAttribute('aria-busy', String(isLoading));
      submitBtn.innerHTML = isLoading
        ? '<span class="btn-spinner" aria-hidden="true"></span> Joining the Girl Gang... 🎀'
        : 'Join The Girl Gang 🎀';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      nameError.textContent = '';
      emailError.textContent = '';

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      let valid = true;

      if (!isValidName(name)) {
        nameError.textContent = "Girl, don't forget to tell me your name. 💕";
        valid = false;
      }
      if (!isValidEmail(email)) {
        emailError.textContent = "That email doesn't look quite right. Let's fix it together. 🎀";
        valid = false;
      }
      if (!valid) return;

      lastAttempt = { name, email };
      setLoading(true);
      try {
        await insertSubscriber(name, email);
        renderSuccess(panel, fxLayer);
      } catch (err) {
        handleSubmitError(err);
      }
    });
  }

  function handleSubmitError(err) {
    if (err.kind === 'duplicate') {
      renderDuplicate(panel);
    } else if (err.kind === 'network') {
      renderNetworkError(panel, retryLastAttempt);
    } else {
      renderUnexpectedError(panel, retryLastAttempt);
    }
  }

  async function retryLastAttempt() {
    if (!lastAttempt) {
      renderFormState(panel);
      bindFormEvents();
      return;
    }
    const retryBtn = document.getElementById('newsletter-retry-btn');
    if (retryBtn) {
      retryBtn.disabled = true;
      retryBtn.textContent = 'Trying again...';
    }
    try {
      await insertSubscriber(lastAttempt.name, lastAttempt.email);
      renderSuccess(panel, fxLayer);
    } catch (err) {
      handleSubmitError(err);
    }
  }

  bindFormEvents();
}
