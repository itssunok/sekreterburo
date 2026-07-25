# Sekreter Büro — 2026 visual redesign

Branch: `redesign-2026`

## Goal

Full visual/UI redesign of the existing one-page site (and its `en/`
counterpart). All copy, structure of information, form fields, and
functional behavior (language pages, service tabs, quote form, language
carousel) stay exactly as they are — this is styling and layout only, not
a content or IA change.

Reference inspiration: two consultancy-site screenshots showing an
editorial, minimal, warm-neutral aesthetic — floating pill nav, oversized
serif/sans headlines, generous whitespace, rounded photo blocks, olive/cream
color blocking. Current site reads dated (navy/gold corporate-template look,
boxed stat cards, emoji-in-squares icons) despite already being well-built
functionally.

## Design tokens

### Color

```
--paper:      #F5F1E9   /* background, warm off-white (aged paper) */
--paper-dim:  #ECE6D6   /* card/section layering, slightly deeper paper */
--ink:        #16140F   /* near-black, warm not pure black — headlines, dark sections */
--stamp:      #B8452C   /* terracotta/stamp-red — signature accent color */
--stamp-dim:  #B8452C1a /* stamp color at low opacity, for tints/washes */
--sage:       #6E7458   /* secondary accent — olive/sage */
--taupe:      #8C8474   /* muted body/caption text, borders */
--white:      #FFFFFF   /* pure white, used sparingly (form fields, etc.) */
```

Rationale: derived from the business itself, not a generic palette. Sekreter
Büro's actual services include notarization and apostille — official
document stamps — so a stamp-red accent is subject-specific, not
decorative. Sage is the calming secondary tone (echoes the olive-toned
inspiration image). No navy/gold carried forward.

### Type

- **Display:** Fraunces (variable serif) — headlines, large numerals, pull
  quotes. Used boldly at large sizes (clamp up to ~72px), restrained
  elsewhere. Replaces Playfair Display.
- **Body:** Work Sans — paragraph text, nav, buttons, form labels. Replaces
  Inter.
- **Utility/mono:** JetBrains Mono — small eyebrow labels only, styled like
  dictionary pronunciation guides (see Signature below).

Load via Google Fonts, same pattern as today (`<link>` in `<head>`,
`font-display: swap`).

### Signature elements

1. **Dictionary-entry eyebrows.** Every section's small label above the
   heading is styled like a dictionary headword + phonetic transcription,
   in JetBrains Mono, e.g.:
   `HAKKIMIZDA /haˈkːɯmɯzda/` — small caps main word, phonetic-style
   bracket in `--taupe`, `--stamp` colon/divider accent.
2. **Ink-stamp graphic.** An inline SVG, circular, roughly hand-stamped
   look (slightly rotated, subtle rough edge via SVG filter or dasharray
   border), reading "EST. 1980 · ANKARA" around the rim with "40" centered.
   In `--stamp` color at ~85% opacity over paper backgrounds, or paper-tint
   over dark backgrounds. Used near: the founder quote (About), and as the
   primary visual in Confidentiality (replacing the old lock-emoji panel).

### Photography (of the 6 images in `/assets`)

Only 3 of 6 are used — each earns its place, none repeated:

| Image | Section | Treatment |
|---|---|---|
| `saj-shafique-...` (flags) | Hero | Full-bleed, large rounded-corner block, duotone paper/ink/stamp-red |
| `romain-vignes-...` (dictionary macro) | About | Rounded block, same duotone treatment, paired with the story text |
| `kyle-glenn-...` (globe) | Languages | Smaller circular inset next to the heading, duotone |

Not used: `leon-hu` (neon "Bonjour/Hola" wall), `zhendong-wang` (welcome
speech-bubbles), `sunday-choi` ("thanks" checklist) — all more colorful/
playful, harder to duotone cleanly into the quieter palette, and 3 well-
placed photos read stronger than 6 forced ones.

Services, Confidentiality, and Contact carry no photography — Services
stays type/icon-driven (tabs preserved), Confidentiality gets the ink-stamp
graphic instead, Contact stays text + map only.

**Image prep required:** source files are raw Unsplash downloads (1–4.6MB
each, full camera resolution). Before use: crop/resize to the actual
display dimensions needed (roughly 1200px wide max for the hero block, less
for the smaller insets), export as compressed JPG or WebP, and apply the
duotone treatment (either pre-baked in the exported file, or via CSS
`filter`/blend-mode over a `--stamp`/`--ink` overlay div — CSS approach
preferred so the treatment is themeable and the file stays small). This is
in-scope for this task since an unoptimized multi-MB hero image would
undercut the "modern 2026 site" goal; a full site-wide performance/image
pipeline audit stays in `backlog.txt`.

## Layout

### Navigation

Floating pill-shaped bar, inset from the viewport edges (not full-width
edge-to-edge like today), rounded corners, `--paper` background with subtle
shadow on scroll (replacing the current navy full-width bar). Logo left,
links center, lang-switcher + CTA right — same structure as today, new
skin. Mobile: hamburger opens a full-screen `--ink` drawer (dark, inverted
from the light nav).

### Hero

Two-column: left = eyebrow (dictionary-style) + oversized Fraunces
headline + supporting paragraph + two CTAs (unchanged copy/links). Right =
the flags photo, full-bleed rounded block, duotone. Below/beside the photo,
the two stat numbers (40+ years, 22+ languages) sit as plain oversized
Fraunces numerals with small mono labels — no boxed cards, just numbers in
space, echoing the reference site's number treatment.

```
┌─────────────────────────────────────────────┐
│  (pill nav, floating)                        │
│                                               │
│  EYEBROW /fəˈnɛtɪk/                          │
│  Kelimelerinizin        ┌───────────────┐    │
│  Arkasında               │   flags photo │    │
│  40 Yıllık Güven         │   (duotone)    │    │
│                          └───────────────┘    │
│  supporting text...        40+      22+      │
│  [Teklif Alın →] [Hizmetlerimiz ↓] Yıl  Dil  │
└─────────────────────────────────────────────┘
```

### About

Two-column, text left / dictionary photo right (reversed from hero's
image-right to vary rhythm), founder quote styled as a large pull-quote in
Fraunces italic with the ink-stamp graphic placed beside/behind it. Value
cards below become a simple horizontal-rule-separated list (no boxed
cards, no left gold border) — hairline dividers instead, matching the
editorial reference.

### Services

Structure and interaction unchanged (3 tabs: Written / Oral / Personal).
Tabs restyled: pill-shaped tab row matching the nav treatment, active tab
`--ink` background with `--paper` text. Service cards: drop the colored
icon squares in favor of a small mono index label (not numbered 01/02/03
since these aren't sequential — instead the existing emoji kept but shrunk
and desaturated to a supporting role, not the focal point) plus hairline
top border instead of a full bordered box. Badges (Kurumsal/Bireysel)
restyled as small pill outlines in `--sage`/`--stamp`.

### Languages

Eyebrow + heading + the globe photo as a circular inset to the right of the
heading text. Carousel mechanism unchanged (CSS marquee, pause on hover,
reduced-motion fallback) — pills restyled to flat outlined chips in
`--paper-dim` on the now-light section background (previously this section
was solid navy; it becomes `--paper` or `--ink` — leaning `--ink` to keep
one dark section for contrast rhythm, pills then light-on-dark).

### Confidentiality

Text column unchanged. Right panel: replace the lock-emoji dark panel with
the large ink-stamp graphic as the centerpiece visual, on an `--ink`
background panel, same supporting copy.

### Contact

Unchanged structure (info list + map + form). Restyle only: form fields
become underline-style inputs (bottom border only, no box/radius) on the
`--paper` panel background, matching the editorial reference's flatter
form treatment; submit button in `--ink`.

### Footer

Restyle to `--ink` background (already dark), same 4-column structure,
new type/color tokens.

## What does NOT change

- All TR/EN copy, exactly as-is in both `index.html` and `en/index.html`.
- Form fields, options, validation, `handleQuoteSubmit` placeholder logic.
- Service tab interaction (`showTab`), language carousel mechanism,
  mobile menu open/close behavior.
- URL structure, hreflang/canonical tags, JSON-LD, sitemap.
- Section IDs (`#hero`, `#about`, etc.) — nav anchors must keep working.

## Technical approach

- Full rewrite of `src/assets/styles/main.css` (new tokens, new component
  styles) — old navy/gold rules removed, not layered on top of.
- `index.html` / `en/index.html` structure mostly stays (same sections,
  same content), but class names and some wrapper markup will change to
  support the new layout (e.g. hero no longer uses `.stat-grid` boxed
  cards). Both files must be edited in parallel per `CLAUDE.md`.
- New: image prep (crop/compress the 3 chosen photos, duotone via CSS
  filter), ink-stamp SVG (hand-authored, not an external icon library),
  updated Google Fonts `<link>` (Fraunces, Work Sans, JetBrains Mono).
- No JS logic changes expected beyond what's needed for any new
  interaction (none currently planned — nav scroll-shadow, hamburger,
  tabs, carousel all stay as-is, just re-skinned).
