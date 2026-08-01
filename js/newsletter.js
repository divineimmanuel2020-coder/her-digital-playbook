/* =============================================
   NEWSLETTER.JS
   Powers the "Join Our Girl Gang" subscription form.
   Validates input, checks for an existing subscriber, inserts
   into the Supabase `subscribers` table, and shows a premium
   success modal (with confetti) or an inline error/duplicate
   message — all without a single browser alert().

   Reads window.hdpSupabase, created once in js/supabase.js.
   Designed so later features (double opt-in, tags, welcome
   emails, referral rewards) can build on top of these same
   small functions instead of rewriting this file.
   ============================================= */

// --- Validation ------------------------------------------------------

function isValidName(name) {
  return name.trim().length >= 2;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// --- Supabase calls ---------------------------------------------------
// Kept as a small, single-purpose function so future features (tags,
// double opt-in, referral source, etc.) can extend the insert payload
// without touching the form-handling logic below.
//
// There is deliberately no separate "does this email already exist"
// SELECT here: the subscribers table's RLS policy only allows anon
// to INSERT, not SELECT, so a pre-check query would always come back
// empty. Instead, the `subscribers_email_unique` constraint in the
// database is the single source of truth — a duplicate email fails
// the insert with Postgres error code 23505, which insertSubscriber()
// turns into a small, typed error the UI can recognize.

async function insertSubscriber(supabase, name, email) {
  const { error } = await supabase
    .from('subscribers')
    .insert({ name, email, status: 'active' });

  if (error) {
    if (error.code === '23505') {
      const duplicateError = new Error('duplicate_subscriber');
      duplicateError.isDuplicate = true;
      throw duplicateError;
    }
    throw error;
  }
}

// --- Confetti (small, elegant, self-cleaning) -------------------------

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

// --- Main wiring -------------------------------------------------------

export function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  const nameInput = document.getElementById('newsletter-name');
  const emailInput = document.getElementById('newsletter-email');
  const nameError = document.getElementById('newsletter-name-error');
  const emailError = document.getElementById('newsletter-email-error');
  const submitBtn = document.getElementById('newsletter-submit');
  const feedback = document.getElementById('newsletter-feedback');
  const modal = document.getElementById('newsletter-modal');
  const modalClose = document.getElementById('newsletter-modal-close');
  const confettiLayer = document.getElementById('newsletter-confetti');

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.classList.toggle('is-loading', isLoading);
    submitBtn.innerHTML = isLoading
      ? '<span class="btn-spinner" aria-hidden="true"></span> Joining...'
      : 'Join The Girl Gang 🎀';
  }

  function clearMessages() {
    nameError.textContent = '';
    emailError.textContent = '';
    feedback.hidden = true;
    feedback.className = 'newsletter-feedback';
    feedback.innerHTML = '';
  }

  function showFeedback(type, html) {
    feedback.hidden = false;
    feedback.className = `newsletter-feedback ${type}`;
    feedback.innerHTML = html;
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    launchConfetti(confettiLayer);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) closeModal();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    let valid = true;

    if (!isValidName(name)) {
      nameError.textContent = 'Please enter your name, love.';
      valid = false;
    }
    if (!isValidEmail(email)) {
      emailError.textContent = "Hmm, that email doesn't look quite right.";
      valid = false;
    }
    if (!valid) return;

    const supabase = window.hdpSupabase;
    if (!supabase) {
      showFeedback('error', '<p>Something went wrong. Please try again in a moment.</p>');
      console.error('[newsletter] window.hdpSupabase is not available — check that supabase.js loaded before this script.');
      return;
    }

    setLoading(true);
    try {
      await insertSubscriber(supabase, name, email);
      form.reset();
      openModal();
    } catch (err) {
      if (err.isDuplicate) {
        showFeedback('info', "<p>💌 Girl... you're already part of the Girl Gang. We're so happy you're here.</p>");
      } else {
        console.error('[newsletter]', err);
        showFeedback('error', '<p>Something went wrong. Please try again in a moment.</p>');
      }
    } finally {
      setLoading(false);
    }
  });
                                           }
        
