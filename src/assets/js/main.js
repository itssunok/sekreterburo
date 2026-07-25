/* ── Language switcher ── */
  function setLang(lang) {
    // Hide all lang nodes
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.style.removeProperty('display');
      el.style.setProperty('display', 'none', 'important');
    });
    // Show target lang nodes
    document.querySelectorAll(`[data-lang="${lang}"]`).forEach(el => {
      el.style.removeProperty('display');
      const isInline = ['SPAN','A','STRONG','EM','CITE','LABEL'].includes(el.tagName);
      el.style.setProperty('display', isInline ? 'inline' : 'block', 'important');
    });
    // Toggle button states
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`).classList.add('active');
    document.documentElement.lang = lang;
  }

  /* ── Service tabs ── */
  function showTab(btn, id) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    btn.classList.add('active');
  }

  /* ── Init on load ── */
  window.addEventListener('DOMContentLoaded', () => setLang('tr'));

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
  function updateMobileLang(lang) {
    document.getElementById('ml-tr').classList.toggle('active', lang === 'tr');
    document.getElementById('ml-en').classList.toggle('active', lang === 'en');
  }

  /* Close drawer when viewport resizes above mobile breakpoint */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeMenu();
  });

  /* ── Quote form submit ──
     Placeholder only: this is a static site with no backend, so submissions
     currently go nowhere. Wire this to a real form service (Formspree,
     Netlify Forms, custom endpoint, etc.) that supports file uploads before
     launch — do not remove this comment until that's done. */
  function handleQuoteSubmit(e) {
    e.preventDefault();
    const lang = document.documentElement.lang === 'en' ? 'en' : 'tr';
    const msg = lang === 'en'
      ? 'This form is not yet connected to a server. Please email your request and documents to info@sekreterburo.com.'
      : 'Bu form henüz bir sunucuya bağlı değil. Lütfen talebinizi ve belgelerinizi info@sekreterburo.com adresine e-posta ile iletin.';
    alert(msg);
    return false;
  }