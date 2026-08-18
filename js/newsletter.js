/* =============================================
   NEWSLETTER.JS
   Her Digital Playbook — Join The Girl Gang

   FLOW:
   Browser
      ↓
   POST /api/subscribe
      ↓
   Vercel Serverless Function
      ↓
   Supabase + Resend

   IMPORTANT:
   This file does NOT talk directly to Supabase.
   The secure server-side /api/subscribe endpoint handles
   both the database insert and the welcome email.
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
   Sends the signup to the Vercel API.

   The API then:
   1. Saves the subscriber to Supabase.
   2. Sends the welcome email through Resend.

   We deliberately do NOT call Supabase directly
   from the browser anymore.
   ============================================= */

async function subscribeToGirlGang(name, email) {
  let response;

  try {
    response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        email
      })
    });
  } catch (networkError) {
    console.error('[newsletter] API network error:', networkError);

    const error = new Error('Unable to reach the subscription server.');
    error.kind = 'network';
    throw error;
  }

  let data = null;

  try {
    data = await response.json();
  } catch (jsonError) {
    console.error('[newsletter] Invalid API response:', jsonError);

    const error = new Error('The server returned an invalid response.');
    error.kind = 'unexpected';
    throw error;
  }

  console.log('[newsletter] /api/subscribe response:', response.status, data);

  /* ---------------------------------------------
     ALREADY SUBSCRIBED
     --------------------------------------------- */

  if (response.status === 409 || data?.error === 'duplicate') {
    const error = new Error('This email is already subscribed.');
    error.kind = 'duplicate';
    throw error;
  }

  /* ---------------------------------------------
     VALIDATION ERRORS
     --------------------------------------------- */

  if (response.status === 400) {
    const error = new Error(data?.error || 'Invalid signup information.');
    error.kind = 'validation';
    throw error;
  }

  /* ---------------------------------------------
     SERVER CONFIGURATION / SUPABASE ERRORS
     --------------------------------------------- */

  if (response.status >= 500) {
    console.error('[newsletter] Server error:', data);

    const error = new Error(data?.error || 'The subscription server encountered an error.');
    error.kind = 'server';
    throw error;
  }

  /* ---------------------------------------------
     OTHER NON-SUCCESS RESPONSES
     --------------------------------------------- */

  if (!response.ok || data?.success !== true) {
    console.error('[newsletter] Unexpected API response:', data);

    const error = new Error(data?.error || 'Something went wrong.');
    error.kind = 'unexpected';
    throw error;
  }

  /* ---------------------------------------------
     SUCCESS

     emailSent tells us whether Resend successfully
     accepted the welcome email.

     The subscriber itself has already been saved
     successfully when success === true.
     --------------------------------------------- */

  return {
    success: true,
    emailSent: data.emailSent === true
  };
}

/* =============================================
   FX — CONFETTI
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

/* =============================================
   FX — FLOATING HEARTS
   ============================================= */

function launchFloatingHearts(layer) {
  if (!layer) return;

  const hearts = ['💗', '💕', '💖'];

  for (let i = 0; i < 8; i++) {
    const heart = document.createElement('span');

    heart.className = 'fx-heart';

    heart.textContent =
      hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left =
      `${10 + Math.random() * 80}%`;

    heart.style.animationDelay =
      `${(Math.random() * 0.6).toFixed(2)}s`;

    heart.style.fontSize =
      `${14 + Math.random() * 14}px`;

    layer.appendChild(heart);

    setTimeout(() => heart.remove(), 2600);
  }
}

/* =============================================
   FX — SPARKLES
   ============================================= */

function launchSparkles(layer) {
  if (!layer) return;

  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement('span');

    sparkle.className = 'fx-sparkle';

    sparkle.textContent = '✦';

    sparkle.style.left =
      `${Math.random() * 100}%`;

    sparkle.style.top =
      `${Math.random() * 100}%`;

    sparkle.style.animationDelay =
      `${(Math.random() * 1).toFixed(2)}s`;

    layer.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 2000);
  }
}

/* =============================================
   CELEBRATION
   ============================================= */

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
    <h2 class="newsletter-title">
      Join Our Girl Gang 🎀
    </h2>

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

    <form
      class="newsletter-form"
      id="newsletter-form"
      novalidate
    >

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
   SUCCESS STATE

   This happens after the API confirms that the
   subscriber was successfully saved.

   IMPORTANT:
   We show the Gmail/Promotions instruction whether
   Resend reports emailSent true or false, because
   the signup itself succeeded.

   The console also tells us the exact emailSent
   value during testing.
   ============================================= */

function renderSuccess(panel, fxLayer, emailSent) {
  markSubscribed();
  showWelcomeNotification();

  const emailMessage = emailSent
    ? `
      <p class="newsletter-result-text newsletter-result-next-step">
        You're in, girl! 💕 Go to your Gmail app and check your
        <strong>Promotions tab</strong> — your welcome email is
        already waiting for you there. Open it up and let's
        get started. ✨
      </p>
    `
    : `
      <p class="newsletter-result-text newsletter-result-next-step">
        You're officially in, girl! 💕 We saved your spot in
        the Girl Gang. If you don't see your welcome email
        yet, check your Gmail <strong>Promotions</strong>,
        <strong>Spam</strong>, or <strong>Updates</strong>
        folders.
      </p>
    `;

  panel.innerHTML = `
    <div
      class="newsletter-result-card success"
      tabindex="-1"
      id="newsletter-result-heading"
    >

      <p class="newsletter-result-emoji">
        🎉
      </p>

      <h2 class="newsletter-result-title">
        Welcome to the Girl Gang!
      </h2>

      <p class="newsletter-result-text">
        Girl... I'm genuinely so excited you're here.
      </p>

      <p class="newsletter-result-text">
        Every week you'll receive practical digital skills,
        AI tips, online income ideas, beautiful resources,
        and exclusive content designed to help you build
        your dream life.
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
   DUPLICATE STATE
   ============================================= */

function renderDuplicate(panel) {
  markSubscribed();

  panel.innerHTML = `
    <div
      class="newsletter-result-card duplicate"
      tabindex="-1"
      id="newsletter-result-heading"
    >

      <p class="newsletter-result-emoji">
        💖
      </p>

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

      <p class="newsletter-result-emoji">
        ☕
      </p>

      <h2 class="newsletter-result-title">
        Oops...
      </h2>

      <p class="newsletter-result-text">
        Looks like your internet took a little coffee
        break. Let's try again in a moment.
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
   SERVER ERROR
   ============================================= */

function renderServerError(panel, onRetry) {
  panel.innerHTML = `
    <div
      class="newsletter-result-card error"
      tabindex="-1"
      id="newsletter-result-heading"
    >

      <p class="newsletter-result-emoji">
        💗
      </p>

      <h2 class="newsletter-result-title">
        Something went wrong...
      </h2>

      <p class="newsletter-result-text">
        Your signup couldn't be completed just yet.
        Please try again in a moment.
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

      <p class="newsletter-result-emoji">
        💗
      </p>

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
   VALIDATION ERROR
   ============================================= */

function renderValidationError(panel, message) {
  const existingError =
    document.getElementById('newsletter-email-error');

  if (existingError) {
    existingError.textContent = message;
  }
}

/* =============================================
   WIRING
   ============================================= */

export function initNewsletter() {
  const panel =
    document.getElementById('newsletter-panel');

  const fxLayer =
    document.getElementById('newsletter-fx');

  if (!panel) return;

  /*
   * Keeps the most recent valid submission so that
   * Retry can resend it without asking the visitor
   * to type everything again.
   */
  let lastAttempt = null;

  /* ---------------------------------------------
     BIND FORM
     --------------------------------------------- */

  function bindFormEvents() {
    const form =
      document.getElementById('newsletter-form');

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
      console.error(
        '[newsletter] Newsletter form elements could not be found.'
      );
      return;
    }

    /* -------------------------------------------
       LOADING STATE
       ------------------------------------------- */

    function setLoading(isLoading) {
      submitBtn.disabled = isLoading;

      submitBtn.setAttribute(
        'aria-busy',
        String(isLoading)
      );

      submitBtn.innerHTML = isLoading
        ? '<span class="btn-spinner" aria-hidden="true"></span> Joining the Girl Gang... 🎀'
        : 'Join The Girl Gang 🎀';
    }

    /* -------------------------------------------
       SUBMIT
       ------------------------------------------- */

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      nameError.textContent = '';
      emailError.textContent = '';

      const name =
        nameInput.value.trim();

      const email =
        emailInput.value.trim();

      let valid = true;

      /* Name validation */

      if (!isValidName(name)) {
        nameError.textContent =
          "Girl, don't forget to tell me your name. 💕";

        valid = false;
      }

      /* Email validation */

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
         * THIS is the important change.
         *
         * We now call:
         *
         *     /api/subscribe
         *
         * instead of calling Supabase directly.
         */

        const result =
          await subscribeToGirlGang(
            name,
            email
          );

        console.log(
          '[newsletter] Subscription successful.',
          result
        );

        renderSuccess(
          panel,
          fxLayer,
          result.emailSent
        );

      } catch (error) {
        console.error(
          '[newsletter] Subscription failed:',
          error
        );

        handleSubmitError(error);

      } finally {
        /*
         * If an error rendered a retry state,
         * the button is no longer the original
         * submit button. So only restore this
         * button if it still exists.
         */

        const currentSubmitBtn =
          document.getElementById(
            'newsletter-submit'
          );

        if (currentSubmitBtn) {
          currentSubmitBtn.disabled = false;

          currentSubmitBtn.removeAttribute(
            'aria-busy'
          );

          currentSubmitBtn.innerHTML =
            'Join The Girl Gang 🎀';
        }
      }
    });
  }

  /* ---------------------------------------------
     ERROR HANDLER
     --------------------------------------------- */

  function handleSubmitError(error) {
    if (error.kind === 'duplicate') {
      renderDuplicate(panel);
      return;
    }

    if (error.kind === 'network') {
      renderNetworkError(
        panel,
        retryLastAttempt
      );
      return;
    }

    if (error.kind === 'validation') {
      renderFormState(panel);
      return;
    }

    if (error.kind === 'server') {
      renderServerError(
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
     RETRY
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
      retryBtn.textContent =
        'Trying again...';
    }

    try {
      const result =
        await subscribeToGirlGang(
          lastAttempt.name,
          lastAttempt.email
        );

      console.log(
        '[newsletter] Retry successful.',
        result
      );

      renderSuccess(
        panel,
        fxLayer,
        result.emailSent
      );

    } catch (error) {
      console.error(
        '[newsletter] Retry failed:',
        error
      );

      handleSubmitError(error);
    }
  }

  /* ---------------------------------------------
     INITIALISE
     --------------------------------------------- */

  renderFormState(panel);
  bindFormEvents();
}
