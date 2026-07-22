// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.style.display === 'flex';
  mainNav.style.display = isOpen ? 'none' : 'flex';
  mainNav.style.flexDirection = 'column';
  mainNav.style.position = 'absolute';
  mainNav.style.top = '100%';
  mainNav.style.left = '0';
  mainNav.style.right = '0';
  mainNav.style.background = '#FFF3F8';
  mainNav.style.padding = '20px 24px';
  mainNav.style.gap = '18px';
});

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
const formNote = document.getElementById('formNote');

newsletterForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector('input[type="email"]').value;
  if (email) {
    formNote.textContent = "You're in! Check your inbox for a welcome note. 🎀";
    newsletterForm.reset();
  }
});
                            
