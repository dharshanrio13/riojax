// ============================================================
// CONTACT FORM HANDLER
// Netlify Forms compatible + LocalStorage backup + honeypot
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successEl = document.getElementById('form-success');
  const submitBtn = document.getElementById('form-submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot check — bots fill hidden fields
    const honeypot = form.querySelector('[name="bot-field"]');
    if (honeypot && honeypot.value !== '') {
      // Silently drop — pretend success to not tip off bots
      showFormSuccess();
      form.reset();
      return;
    }

    // Basic validation
    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    const data = {
      name,
      email,
      phone: form.querySelector('[name="phone"]')?.value.trim() || '',
      subject: form.querySelector('[name="subject"]')?.value.trim() || '(No Subject)',
      message
    };

    // Save to localStorage so admin can view it
    RioJax.addContact(data);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Attempt Netlify Forms submission (works if deployed on Netlify with form detection)
    try {
      const formData = new FormData(form);
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
    } catch (err) {
      // Netlify endpoint unavailable (e.g. Cloudflare Pages) — localStorage backup already saved
      console.log('Form submission to host endpoint skipped:', err.message);
    }

    showFormSuccess();
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  });

  function showFormSuccess() {
    form.style.display = 'none';
    successEl?.classList.add('show');
    setTimeout(() => {
      form.style.display = '';
      successEl?.classList.remove('show');
    }, 4000);
  }
});
