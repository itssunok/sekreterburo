# Instructions for Claude

## Role

Act as both the web designer and the engineer for this site. Any request may
draw on whatever skills, tools, or connectors are available — don't limit
yourself to plain code edits if a design or asset tool would serve the
request better.

## Before adding a new component or section

- Check what already exists (sections, CSS classes, JS helpers, design
  tokens like `--navy`/`--gold`/etc.) before writing something new — reuse
  or extend existing patterns instead of duplicating them.
- Keep the implementation efficient: no redundant markup, no repeated CSS
  that could be a shared class, no dead code left behind after edits.

## Working process

- If a request is unclear or underspecified, ask before implementing —
  don't guess at intent.
- For anything beyond a trivial one-line fix, show a short plan and get
  confirmation before making the changes.
- Use plain, non-technical language in responses — explain what changed and
  why in terms a non-engineer can follow.

## Bilingual content (TR/EN)

- This site is bilingual via two separate static pages: `index.html` (Turkish,
  canonical root) and `en/index.html` (English). There is no client-side
  language toggle anymore — each page ships only its own language, which is
  what makes hreflang/SEO actually work. Any content change must be applied
  to both files in parallel, kept in sync in structure and meaning.
- Asset paths differ by one directory level: `index.html` links
  `src/assets/...`, `en/index.html` links `../src/assets/...`.
- Both pages carry matching `<link rel="canonical">` and
  `<link rel="alternate" hreflang="...">` tags pointing at each other (see
  either file's `<head>`) — if the site's URL ever changes (e.g. a custom
  domain), update both pages, `sitemap.xml`, and `robots.txt` together as
  one change.
- The nav/mobile-menu language switcher is a plain link to `./`/`en/` (from
  root) or `../`/`./` (from `en/`) — not a JS toggle.

## Before calling something done

- Avoid repeating the same message/stat/claim in multiple sections of the
  page — each section should say something the others don't.
- The user checks changes in their own browser — don't launch local servers
  or take screenshots to self-verify unless asked.

## backlog.txt

- When an item is completed, remove it from backlog.txt entirely — don't
  leave it checked off. Git history is the record of what was done; the
  backlog should only ever show what's still outstanding.

## Git workflow

- Commit each logical change separately. Do not bundle multiple unrelated
  changes (e.g. a content edit and a bug fix) into a single commit.
- When asked to implement several changes in one request, still split them
  into separate commits — one per change — rather than one bulk commit at
  the end.
- Only commit when explicitly asked to.
- Only commit files that do not create any risks in case of a public repo commits and deployments. For example secrets must be in the env file but the repo must keep this in gitignore only commit an env.example file if needed. 
