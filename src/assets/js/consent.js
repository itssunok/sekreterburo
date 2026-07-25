/* ── Cookie consent ──
   Gates Google Analytics behind explicit opt-in. Nothing is requested
   from Google's servers, and no analytics cookie is set, until the
   visitor accepts. See
   docs/superpowers/specs/2026-07-25-cookie-consent-design.md. */
(function () {
  var CONSENT_KEY = 'sb_consent_v1';

  var banner   = document.getElementById('consentBanner');
  if (!banner) return;

  var panel           = document.getElementById('consentPanel');
  var acceptBtn        = document.getElementById('consentAcceptBtn');
  var rejectBtn        = document.getElementById('consentRejectBtn');
  var manageBtn        = document.getElementById('consentManageBtn');
  var saveBtn          = document.getElementById('consentSaveBtn');
  var analyticsToggle  = document.getElementById('consentAnalyticsToggle');

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  }

  function loadAnalytics() {
    var id = window.GA_MEASUREMENT_ID;
    if (!id || id.indexOf('__') === 0) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', id);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(s);
  }

  function hideBanner() {
    banner.hidden = true;
    panel.hidden = true;
  }

  function applyConsent(value) {
    setConsent(value);
    if (value === 'accepted') loadAnalytics();
    hideBanner();
  }

  var stored = getConsent();
  if (stored === 'accepted') {
    loadAnalytics();
  } else if (stored !== 'rejected') {
    banner.hidden = false;
  }

  acceptBtn.addEventListener('click', function () { applyConsent('accepted'); });
  rejectBtn.addEventListener('click', function () { applyConsent('rejected'); });
  manageBtn.addEventListener('click', function () {
    panel.hidden = !panel.hidden;
    analyticsToggle.checked = getConsent() === 'accepted';
  });
  saveBtn.addEventListener('click', function () {
    applyConsent(analyticsToggle.checked ? 'accepted' : 'rejected');
  });

  /* Reopened from the footer's "Çerez Ayarları" / "Cookie Settings" link */
  window.openConsentManager = function () {
    banner.hidden = false;
    panel.hidden = false;
    analyticsToggle.checked = getConsent() === 'accepted';
  };
})();
