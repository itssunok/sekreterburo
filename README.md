# Sekreter Büro — Corporate Website

One-page marketing website for **Sekreter Büro**, an Ankara-based translation office founded in 1980.

🌐 **Live site:** deployed via Cloudflare Pages (auto-deploy on push to `main`). Custom domain `sekreterburo.com` planned but not yet configured.

---

## Structure

```
sekreterburo/
├── build.sh                    # Cloudflare Pages build command — substitutes
│                                # the GA_MEASUREMENT_ID env var into the pages
├── robots.txt                  # SEO crawl instructions
├── sitemap.xml
├── src/
│   └── assets/
│       ├── images/             # Logos, photos
│       ├── styles/
│       │   └── main.css        # All styles — variables, layout, responsive
│       └── js/
│           └── main.js         # Tab logic, hamburger nav, quote form
├── index.html                  # TR entry point (canonical)
├── en/
│   └── index.html              # EN entry point
├── .env.example
├── .gitignore
└── README.md
```

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Full-viewport dark hero, 4 stat cards, confidentiality badge |
| **Trust Bar** | 40+ yıl · 22+ dil · 5 sözlü tür · %100 gizlilik |
| **Hakkımızda** | Founder story, ER OK quote, 4 value cards |
| **Hizmetler** | Tabbed: Yazılı · Sözlü · Bireysel Belgeler |
| **Diller** | 22-language pill cloud |
| **Gizlilik** | Confidentiality principle + dark panel |
| **İletişim** | Contact info + quote request form |

---

## Languages

Currently supports **Turkish (TR)** and **English (EN)** via a client-side switcher.  
Spanish (ES) and German (DE) are next — copy is ready to slot in.

---

## Deployment

Pushes to `main` automatically deploy via **Cloudflare Pages**. Build
command is `sh build.sh` (see that file), which substitutes the
`GA_MEASUREMENT_ID` environment variable — set under the Cloudflare Pages
project's Settings → Environment variables — into the site's Google
Analytics snippet. See `.env.example` for details.

---

## Adding images

Drop files into `src/assets/images/` and reference them in `index.html`:

```html
<img src="src/assets/images/hero-photo.jpg" alt="...">
```

---

## Colors

| Token | Value | Use |
|---|---|---|
| `--navy` | `#0D1B3E` | Primary background, text |
| `--gold` | `#C4972A` | Accent, CTAs, highlights |
| `--cream` | `#F7F4EF` | Light section backgrounds |
