# Cookie consent banner + policy page

## Goal

The site loads Google Analytics (gtag.js) unconditionally today, setting
cookies before any consent is given. This is non-compliant with both GDPR
(prior opt-in required for non-essential/analytics cookies) and Turkish
KVKK (Law No. 6698 — requires an Aydınlatma Metni / clarification notice
and consent, with additional scrutiny on transferring data to a
US-based processor like Google). Add a consent banner that fully gates
GA loading, plus a bilingual privacy/cookie policy page.

Scope: only GA4 is in use today (confirmed — no Meta Pixel, no other
trackers). Architecture should be easy to extend with more categories
later, but only "Necessary" (informational only, no cookies actually set)
and "Analytics" (GA4) exist now.

**Not legal advice.** All policy-page copy is a starter draft. It must be
reviewed by a lawyer/consultant qualified in Turkish KVKK and GDPR before
the business relies on it. This is flagged via an HTML comment in the
policy page source, not shown to site visitors.

## Consent gating behavior

Chosen approach: **fully block GA until explicit Accept.** The gtag.js
`<script>` tag is removed from static HTML entirely. A small consent
script checks `localStorage` on page load:

- No stored choice → show the banner, do nothing else.
- Stored choice = accepted → dynamically inject the gtag.js script tag
  and run `gtag('js', ...)` / `gtag('config', ...)`.
- Stored choice = rejected → do nothing. No network request to Google
  ever happens.

This means zero Google network requests or cookies before consent —
simpler to defend under KVKK's stricter cross-border-transfer reading
than Google's Consent Mode v2 (which still contacts Google's servers
pre-consent for modeled/cookieless pings). Trade-off: no analytics
data at all for users who decline, which is the intended, compliant
behavior for this size of business.

Consent is stored under a versioned key (e.g. `sb_consent_v1`) so a
future policy change can invalidate old consent and re-prompt everyone.

## Banner UI

- Bottom-anchored bar, not a full-screen modal.
- Palette/type: matches the site's paper/ink/stamp/Fraunces/Work Sans
  system — paper background, ink text, pill-shaped buttons (consistent
  with nav-cta/tab-btn/form-submit elsewhere).
- Three actions: **Kabul Et / Accept All** (stamp-filled pill),
  **Reddet / Reject All** (outlined pill), **Yönet / Manage** (plain
  text link, expands a small panel).
- Manage panel: a toggle for "Analytics" (off by default, user can
  turn on then confirm), and "Necessary" shown as always-on/disabled
  with a note that it's informational only since this site does not
  currently set any strictly-necessary cookies.
- Short explanatory copy + a link to the full policy page.
- A permanent **"Çerez Ayarları" / "Cookie Settings"** link in the
  footer reopens the manage panel at any time — consent must be
  genuinely revocable, not a one-time popup.

## Policy page

One combined bilingual page (simpler to maintain than splitting privacy
vs. cookies into two):

- `gizlilik-politikasi.html` (TR, root) and
  `en/gizlilik-politikasi.html` (EN) — same two-file pattern as the
  rest of the site.
- Linked from: the banner's "learn more," the footer, and added to
  `sitemap.xml` + matching `hreflang`/canonical tags like other pages.
- Content covers: what's collected (GA4 only), purpose, legal basis,
  that data goes to Google in the US and what that implies under KVKK,
  retention, how to withdraw consent (pointing at "Çerez Ayarları"),
  and Sekreter Büro's contact info as data controller (data sorumlusu)
  — reusing the address/phone/email already in the LocalBusiness
  JSON-LD.

## What does NOT change

- No other trackers are being added as part of this work.
- Existing SEO tags, sitemap structure, and other pages' content stay
  as they are aside from the new policy-page entries.
- `build.sh` / Cloudflare env-var substitution mechanism for
  `GA_MEASUREMENT_ID` is unaffected — the consent script still uses the
  same substituted ID, just injects the script conditionally instead of
  unconditionally.

## Technical approach

- New `src/assets/js/consent.js`, loaded on every page (both languages).
- Remove the eager gtag `<script>` tags from `<head>` in both
  `index.html` and `en/index.html`; consent.js becomes solely
  responsible for ever loading gtag.js.
- New CSS in `main.css` for `.consent-banner` and its manage panel,
  reusing existing tokens/pill patterns rather than introducing new
  ones.
- Footer gets one new link per language page.
