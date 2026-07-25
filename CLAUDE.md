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

- This site is bilingual via `data-lang="tr"` / `data-lang="en"` pairs. Any
  content change must update both languages, kept in sync in meaning.
- Never nest `data-lang` spans inside `<option>` tags — browsers strip
  nested markup there and show both languages concatenated. Use separate
  per-language `<select>` elements instead (see the contact form for the
  pattern).

## Before calling something done

- Avoid repeating the same message/stat/claim in multiple sections of the
  page — each section should say something the others don't.
- The user checks changes in their own browser — don't launch local servers
  or take screenshots to self-verify unless asked.

## Git workflow

- Commit each logical change separately. Do not bundle multiple unrelated
  changes (e.g. a content edit and a bug fix) into a single commit.
- When asked to implement several changes in one request, still split them
  into separate commits — one per change — rather than one bulk commit at
  the end.
- Only commit when explicitly asked to.
