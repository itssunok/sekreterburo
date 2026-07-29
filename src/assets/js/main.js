/* ── Service tabs ── */
  function showTab(btn, id) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    btn.classList.add('active');
  }

  /* ── Sticky nav shadow on scroll ── */
  window.addEventListener('scroll', () => {
    document.querySelector('nav').style.boxShadow =
      window.scrollY > 60 ? '0 2px 24px rgba(0,0,0,0.3)' : 'none';
  });

  /* ── Hamburger menu ── */
  function toggleMenu() {
    const btn  = document.getElementById('hamburger');
    const menu = document.getElementById('mobileMenu');
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  function closeMenu() {
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
  }
  /* Close drawer when viewport resizes above mobile breakpoint */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeMenu();
  });

  /* ── Quote form submit ──
     Posts to the /api/quote Cloudflare Pages Function, which emails the
     office and sends the visitor an auto-reply (see functions/api/quote.js). */
  const QUOTE_MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // keep total attachments well under Resend's request size limit

  const QUOTE_TEXT = {
    tr: {
      sending: 'Gönderiliyor…',
      success: 'Teşekkürler! Talebiniz alındı, en kısa sürede size dönüş yapacağız.',
      tooLarge: 'Eklediğiniz belgeler çok büyük (15 MB üzeri). Lütfen daha küçük dosyalar yükleyin veya belgenizi e-posta ile gönderin.',
      error: 'Bir şeyler ters gitti. Lütfen tekrar deneyin ya da talebinizi info@sekreterburo.com adresine e-posta ile iletin.',
    },
    en: {
      sending: 'Sending…',
      success: 'Thank you! Your request has been received — we’ll get back to you shortly.',
      tooLarge: 'Your attached documents are too large (over 15 MB). Please upload smaller files or email your documents to us directly.',
      error: 'Something went wrong. Please try again, or email your request to info@sekreterburo.com.',
    },
  };

  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const lang = quoteForm.querySelector('[name="lang"]')?.value === 'en' ? 'en' : 'tr';
      const t = QUOTE_TEXT[lang];
      const submitBtn = quoteForm.querySelector('.form-submit');
      const status = quoteForm.querySelector('.form-status');

      const files = quoteForm.querySelector('[name="documents"]')?.files || [];
      const totalBytes = Array.from(files).reduce((sum, f) => sum + f.size, 0);
      if (totalBytes > QUOTE_MAX_UPLOAD_BYTES) {
        status.textContent = t.tooLarge;
        status.className = 'form-status is-error';
        return;
      }

      submitBtn.disabled = true;
      status.textContent = t.sending;
      status.className = 'form-status';

      try {
        const res = await fetch('/api/quote', { method: 'POST', body: new FormData(quoteForm) });
        if (!res.ok) throw new Error('request failed');
        status.textContent = t.success;
        status.className = 'form-status is-success';
        quoteForm.reset();
        quoteForm.querySelector('[name="lang"]').value = lang;
      } catch (err) {
        status.textContent = t.error;
        status.className = 'form-status is-error';
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  /* ── Footer copyright year ── */
  document.getElementById('copyright-year').textContent = new Date().getFullYear();