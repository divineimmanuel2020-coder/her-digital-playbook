/* =============================================
   NEWSLETTER.JS
   Join The Girl Gang newsletter experience.

   FLOW:
     Browser
       ↓
     /api/subscribe
       ↓
     Supabase
       ↓
     Resend
       ↓
     Welcome email

   IMPORTANT:
   This file does NOT talk directly to Supabase.
   The secure Vercel API function /api/subscribe.js
   handles both the Supabase insertion and Resend email.
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
   API DATA LAYER
   Sends the subscriber to Vercel.

   DO NOT connect directly to Supabase here.
   /api/subscribe.js handles:
     1. Supabase
     2. Resend
   ============================================= */

async function subscribe(name, email) {
  let response;

  try {
    response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email
      })
    });
  } catch (networkError) {
    console.error('[newsletter] API network error:', networkError);

    const error = new Error('Network failure');
    error.kind = 'network';
    throw error;
  }

  let data = null;

  try {
    data = await response.json();
  } catch (_) {
    // The server returned something that wasn't JSON.
  }

  console.log('[newsletter] /api/subscribe response:', response.status, data);

  /*
   * Already subscribed.
   */
  if (response.status === 409 || data?.error === 'duplicate') {
    const error = new Error('Duplicate subscriber');
    error.kind = 'duplicate';
    throw error;
  }

  /*
   * Server-side failure.
   */
  if (!response.ok) {
    console.error('[newsletter] API error:', response.status, data);

    const error = new Error(
      data?.error || 'Newsletter subscription failed'
    );

    error.kind = 'unexpected';
    throw error;
  }

  /*
   * The API returns:
   *
   * {
   *   success: true,
   *   emailSent: true
   * }
   *
   * OR
   *
   * {
   *   success: true,
   *   emailSent: false
   * }
   *
   * In both cases the subscriber was successfully saved.
   */
  return {
    success: true,
    emailSent: data?.emailSent === true
  };
}

/* =============================================
   FX
   ============================================= */

function launchConfetti(layer) {
  if (!layer) return;

  const colors = [
    '#ec5c82',
    '#f6c9d6',
    '#c9a253',
    '#fbe0e8',
    '#ffffff'
  ];

  for (let i = 0; i < 26; i++) {
    const piece = document.createElement('span');

    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay =
      `${(Math.random() * 0.3).toFixed(2)}s`;

    piece.style.setProperty(
      '--rot',
      `${Math.floor(Math.random() * 360)}deg`
    );

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
    heart.textContent =
      hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = `${10 + Math.random() * 80}%`;
    heart.style.animationDelay =
      `${(Math.random() * 0.6).toFixed(2)}s`;
    heart.style.fontSize =
      `${14 + Math.random() * 14}px`;

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
    sparkle.style.animationDelay =
      `${(Math.random() * 1).toFixed(2)}s`;

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
   FORM STATE
   ============================================= */

function renderFormState(panel) {
  panel.innerHTML = `
    <h2 class="newsletter-title">Join Our Girl Gang 🎀</h2>

    <p class="newsletter-desc">
      Get beautiful Big Sis Letters straight to your inbox —
      career advice, AI tips, freelancing opportunities,
      online business ideas, motivation, and practical
      guidance, girl to girl.
    </p>

    <ul class="newsletter-perks">
      <li>♡ Expert insights</li>
      <li>✎ Practical tips</li>
      <li>✦ Exclusive resources</li>
      <li>🎁 Free tools &amp; templates</li>
    </ul>

    <form class="newsletter-form" id="newsletter-form" novalidate>

      <div class="newsletter-field">
        <label
          for="newsletter-name"
          class="sr-only"
        >
          Your name
        </label>

        <input
          type="text"
          id="newsletter-name"
          placeholder="Your name"
          autocomplete="name"
          aria-describedby="newsletter-name-error"
        >

        <span
          class="newsletter-field-error"
          id="newsletter-name-error"
          role="alert"
        ></span>
      </div>

      <div class="newsletter-field">
        <label
          for="newsletter-email"
          class="sr-only"
        >
          Your email address
        </label>

        <input
          type="email"
          id="newsletter-email"
          placeholder="Your email address"
          autocomplete="email"
          aria-describedby="newsletter-email-error"
        >

        <span
          class="newsletter-field-error"
          id="newsletter-email-error"
          role="alert"
        ></span>
      </div>

      <button
        class="btn btn-primary"
        id="newsletter-submit"
        type="submit"
      >
        Join The Girl Gang 🎀
      </button>

    </form>

    <p class="newsletter-note">
      No spam, ever. Unsubscribe anytime.
    </p>
  `;
}

/* =============================================
   SUCCESS
   ============================================= */

function renderSuccess(panel, fxLayer, emailSent) {
  /*
   * The API has successfully saved the subscriber.
   * Mark them as subscribed so the site's subscription
   * pop-ups stop appearing.
   */
  markSubscribed();

  /*
   * Show the browser/site welcome notification.
   */
  showWelcomeNotification();

  const emailMessage = emailSent
    ? `
      <p class="newsletter-result-text newsletter-result-next-step">
        You're in, girl! 💕
        Go to your Gmail app and check your
        <strong>Promotions tab</strong> —
        your welcome email is waiting for you there.
        Open it up and let's get started. ✨
      </p>
    `
    : `
      <p class="newsletter-result-text newsletter-result-next-step">
        You're officially in, girl! 💕
        We've saved your place in the Girl Gang.
        If your welcome email doesn't appear shortly,
        check your Gmail <strong>Promotions</strong>,
        <strong>Spam</strong>, or <strong>Junk</strong>
        folder.
      </p>
    `;

  panel.innerHTML = `
    <div
      class="newsletter-result-card success"
      tabindex="-1"
      id="newsletter-result-heading"
    >

      <p class="newsletter-result-emoji">🎉</p>

      <h2 class="newsletter-result-title">
        Welcome to the Girl Gang!
      </h2>

      <p class="newsletter-result-text">
        Girl... I'm genuinely so excited you're here.
      </p>

      <p class="newsletter-result-text">
        Every week you'll receive practical digital
        skills, AI tips, online income ideas, beautiful
        resources, and exclusive content designed to
        help you build your dream life.
      </p>

      <p class="newsletter-result-text">
        This isn't spam. It's your digital glow-up journey.
        Welcome home. 🎀🫂
      </p>

      ${emailMessage}

      <div class="newsletter-result-actions">

        <a
          class="btn btn-secondary"
          href="${BASE}index.html#articles"
        >
          ✨ Explore Articles
        </a>

        <a
          class="btn btn-secondary"
          href="${BASE}index.html#tools"
        >
          ✨ Try A Free Tool
        </a>

      </div>

    </div>
  `;

  celebrate(fxLayer);

  panel
    .querySelector('#newsletter-result-heading')
    ?.focus();
}

/* =============================================
   DUPLICATE
   ============================================= */

function renderDuplicate(panel) {
  markSubscribed();

  panel.innerHTML = `
    <div
      class="newsletter-result-card duplicate"
      tabindex="-1"
      id="newsletter-result-heading"
    >

      <p class="newsletter-result-emoji">💖</p>

      <h2 class="newsletter-result-title">
        Hey Queen!
      </h2>

      <p class="newsletter-result-text">
        Looks like you're already part of the Girl Gang.
        Check your inbox, because exciting things are
        already on their way.
      </p>

      <div class="newsletter-result-actions">

        <a
          class="btn btn-secondary"
          href="${BASE}index.html#articles"
        >
          Go To Articles
        </a>

        <a
          class="btn btn-secondary"
          href="${BASE}pages/article.html?id=first-2000-online"
        >
          Read Latest Guide
        </a>

      </div>

    </div>
  `;

  panel
    .querySelector('#newsletter-result-heading')
    ?.focus();
}

/* =============================================
   NETWORK ERROR
   ============================================= */

function renderNetworkError(panel, onRetry) {
  panel.innerHTML = `
    <div
      class="newsletter-result-card error"
      tabindex="-1"
      id="newsletter-result-heading"
    >

      <p class="newsletter-result-emoji">☕</p>

      <h2 class="newsletter-result-title">
        Oops...
      </h2>

      <p class="newsletter-result-text">
        Looks like your internet took a little coffee break.
        Let's try again in a moment.
      </p>

      <div class="newsletter-result-actions">

        <button
          class="btn btn-primary"
          id="newsletter-retry-btn"
          type="button"
        >
          Try Again
        </button>

      </div>

    </div>
  `;

  panel
    .querySelector('#newsletter-retry-btn')
    ?.addEventListener('click', onRetry);

  panel
    .querySelector('#newsletter-result-heading')
    ?.focus();
}

/* =============================================
   UNEXPECTED ERROR
   ============================================= */

function renderUnexpectedError(panel, onRetry) {
  panel.innerHTML = `
    <div
      class="newsletter-result-card error"
      tabindex="-1"
      id="newsletter-result-heading"
    >

      <p class="newsletter-result-emoji">💗</p>

      <h2 class="newsletter-result-title">
        Something unexpected happened.
      </h2>

      <p class="newsletter-result-text">
        Don't worry — your dreams are still safe.
        Let's try again.
      </p>

      <div class="newsletter-result-actions">

        <button
          class="btn btn-primary"
          id="newsletter-retry-btn"
          type="button"
        >
          Retry
        </button>

      </div>

    </div>
  `;

  panel
    .querySelector('#newsletter-retry-btn')
    ?.addEventListener('click', onRetry);

  panel
    .querySelector('#newsletter-result-heading')
    ?.focus();
}

/* =============================================
   WIRING
   ============================================= */

export function initNewsletter() {
  const panel = document.getElementById('newsletter-panel');
  const fxLayer = document.getElementById('newsletter-fx');

  if (!panel) return;

  let lastAttempt = null;

  /* ---------------------------------------------
     Bind the form
     --------------------------------------------- */

  function bindFormEvents() {
    const form = document.getElementById('newsletter-form');
    const nameInput =
      document.getElementById('newsletter-name');
    const emailInput =
      document.getElementById('newsletter-email');
    const nameError =
      document.getElementById('newsletter-name-error');
    const emailError =
      document.getElementById('newsletter-email-error');
    const submitBtn =
      document.getElementById('newsletter-submit');

    if (
      !form ||
      !nameInput ||
      !emailInput ||
      !nameError ||
      !emailError ||
      !submitBtn
    ) {
      return;
    }

    function setLoading(isLoading) {
      submitBtn.disabled = isLoading;

      submitBtn.setAttribute(
        'aria-busy',
        String(isLoading)
      );

      submitBtn.innerHTML = isLoading
        ? `
          <span
            class="btn-spinner"
            aria-hidden="true"
          ></span>
          Joining the Girl Gang... 🎀
        `
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
        nameError.textContent =
          "Girl, don't forget to tell me your name. 💕";

        valid = false;
      }

      if (!isValidEmail(email)) {
        emailError.textContent =
          "That email doesn't look quite right. Let's fix it together. 🎀";

        valid = false;
      }

      if (!valid) return;

      lastAttempt = {
        name,
        email
      };

      setLoading(true);

      try {
        /*
         * IMPORTANT:
         * This now calls /api/subscribe.
         *
         * That server function handles BOTH:
         *   Supabase insertion
         *   Resend welcome email
         */
        const result = await subscribe(name, email);

        renderSuccess(
          panel,
          fxLayer,
          result.emailSent
        );

      } catch (err) {
        handleSubmitError(err);
      }
    });
  }

  /* ---------------------------------------------
     Error handling
     --------------------------------------------- */

  function handleSubmitError(err) {
    if (err.kind === 'duplicate') {
      renderDuplicate(panel);
      return;
    }

    if (err.kind === 'network') {
      renderNetworkError(
        panel,
        retryLastAttempt
      );
      return;
    }

    renderUnexpectedError(
      panel,
      retryLastAttempt
    );
  }

  /* ---------------------------------------------
     Retry
     --------------------------------------------- */

  async function retryLastAttempt() {
    if (!lastAttempt) {
      renderFormState(panel);
      bindFormEvents();
      return;
    }

    const retryBtn =
      document.getElementById(
        'newsletter-retry-btn'
      );

    if (retryBtn) {
      retryBtn.disabled = true;
      retryBtn.textContent = 'Trying again...';
    }

    try {
      const result = await subscribe(
        lastAttempt.name,
        lastAttempt.email
      );

      renderSuccess(
        panel,
        fxLayer,
        result.emailSent
      );

    } catch (err) {
      handleSubmitError(err);
    }
  }

  /* ---------------------------------------------
     Initial form
     --------------------------------------------- */

  renderFormState(panel);
  bindFormEvents();
}
