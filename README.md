# Sekreter Büro — Corporate Website

One-page marketing website for **Sekreter Büro**, an Ankara-based translation office founded in 1980.

🌐 **Live site:** [itssunok.github.io/sekreterburo](https://itssunok.github.io/sekreterburo)

---

## Structure

```
sekreterburo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deploys to GitHub Pages on push to main
├── public/
│   ├── favicon.ico             # Site favicon (replace with final logo)
│   └── robots.txt              # SEO crawl instructions
├── src/
│   └── assets/
│       ├── images/             # Logos, photos (add here)
│       ├── styles/
│       │   └── main.css        # All styles — variables, layout, responsive
│       └── js/
│           └── main.js         # Language switcher, tab logic, hamburger nav
├── index.html                  # Entry point — links to CSS and JS above
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

Pushes to `main` automatically deploy via GitHub Actions → GitHub Pages.

To enable: **Repo Settings → Pages → Source: GitHub Actions**

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
