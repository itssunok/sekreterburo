# Sekreter Büro — Corporate Website

Marketing website for **Sekreter Büro Tercüme ve Tic. Ltd. Şti.**, an Ankara-based sworn-translation office founded in 1980.

🌐 **Live site:** deployed via Cloudflare Pages (auto-deploy on push to `main`). Custom domain `sekreterburo.com` planned but not yet configured — see `backlog.txt`.

---

## Structure

```
sekreterburo/
├── build.sh                    # Cloudflare Pages build command — substitutes
│                                # the GA_MEASUREMENT_ID env var into the pages
├── functions/
│   └── api/
│       └── quote.js            # Cloudflare Pages Function — handles the
│                                # quote form submission, emails the office
│                                # and auto-replies to the visitor via Resend
├── robots.txt                  # SEO crawl instructions
├── sitemap.xml
├── src/
│   └── assets/
│       ├── images/             # Photos used across both language pages
│       ├── styles/
│       │   └── main.css        # All styles — variables, layout, responsive
│       └── js/
│           ├── main.js         # Tab logic, hamburger nav, quote form submit
│           └── consent.js      # Cookie-consent banner, gates GA loading
├── index.html                  # TR entry point (canonical)
├── en/
│   └── index.html              # EN entry point
├── gizlilik-politikasi.html    # TR Privacy & Cookie Policy
├── en/
│   └── gizlilik-politikasi.html # EN Privacy & Cookie Policy
├── 404.html
├── backlog.txt                 # Outstanding work, prioritized
├── .env.example
├── .gitignore
└── README.md
```

---

## Sections

Each language page (`index.html` / `en/index.html`) is a single scrolling page with these sections, in order:

| Section | Description |
|---|---|
| **Hero** | Full-viewport dark hero — eyebrow, headline, CTA buttons, duotone photo, 2 stat numbers (years of experience, languages) |
| **Hakkımızda / About** | Founder story (ER OK, 1980), pull-quote, second-generation framing |
| **Hizmetler / Services** | Tabbed: Kurumsal (7 written-translation service cards, incl. Patent) · Bireysel (personal documents) · Sözlü (oral interpretation) |
| **Diller / Languages** | Scrolling pill carousel of featured languages, with copy noting the ~100-language network |
| **Değerlerimiz / Our Values** | Heading + intro left, 4 value cards right (Köklü Deneyim, Gizlilik ve Sınırlı Erişim, Güvenli Belge İletimi, Kalite Güvencesi) |
| **İletişim / Contact** | Address, phone, email, embedded map, and the quote request form |

There's also a standalone **Gizlilik ve Çerez Politikası / Privacy & Cookie Policy** page per language (`gizlilik-politikasi.html`), linked from the footer.

---

## Languages

Supports **Turkish (TR)** and **English (EN)** as two separate static pages — no client-side switcher. Each page ships only its own language (needed for hreflang/SEO to work correctly) and links to the other via the nav's language switcher. Any content change must be applied to both files in parallel.

---

## Quote form backend

The contact section's quote request form posts to `/api/quote`, a Cloudflare
Pages Function (`functions/api/quote.js`) that sends an office notification
and a visitor auto-reply via the [Resend](https://resend.com) API. It reads
`RESEND_API_KEY`, `QUOTE_NOTIFY_EMAIL`, and optionally `RESEND_FROM_EMAIL`
from Cloudflare Pages environment variables — see `.env.example` and
`backlog.txt` for current setup status (domain verification is still
pending, so it's running against a test recipient for now).

---

## Deployment

Pushes to `main` automatically deploy via **Cloudflare Pages**. Build
command is `sh build.sh` (see that file), which substitutes the
`GA_MEASUREMENT_ID` environment variable — set under the Cloudflare Pages
project's Settings → Environment variables — into the site's Google
Analytics snippet. See `.env.example` for details on all environment
variables the project uses.

---

## Adding images

Drop files into `src/assets/images/` and reference them in both language
pages — note the path differs by one directory level:

```html
<!-- index.html -->
<img src="src/assets/images/hero-photo.jpg" alt="...">

<!-- en/index.html -->
<img src="../src/assets/images/hero-photo.jpg" alt="...">
```

---

## Colors

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F5F1E9` | Page background |
| `--paper-dim` | `#ECE6D6` | Secondary/muted background |
| `--ink` | `#16140F` | Primary text, dark backgrounds (hero, footer) |
| `--stamp` | `#B8452C` | Accent — CTAs, highlights, links |
| `--sage` | `#6E7458` | Secondary accent |
| `--taupe` | `#8C8474` | Muted text |
| `--white` | `#FFFFFF` | Cards, form backgrounds |
| `--border` | `color-mix(in srgb, var(--taupe) 35%, var(--paper))` | Hairlines, card borders |
