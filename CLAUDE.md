# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this project is

Personal portfolio site for Daniel Macedo Figueroa, built as an interactive terminal emulator in the browser. Deployed to GitHub Pages at [danielfigueroa.dev](https://danielfigueroa.dev).

Stack: React 18 + TypeScript + Vite. No router, no state library, no backend — everything is a single client-side page.

## Commands

```bash
npm run dev      # dev server with HMR
npm run build    # tsc type-check + vite build
npm run lint     # eslint, --max-warnings 0
npm run preview  # serve the production build
```

There is no test suite. `npm run build` is the verification step — it runs `tsc` before bundling, so a type error fails the build.

## Architecture

- `src/commands/index.ts` — the content of the site. Exports `COMMAND_NAMES` (the canonical ordered list, which also feeds autocomplete and "did you mean") plus two registries, `commandsPt` and `commandsEn`, each mapping a command name to a handler returning an HTML string. The `help` output is generated from `COMMAND_NAMES`, so **adding a command means adding it to `COMMAND_NAMES` and to both registries** — the help text updates itself.
- `src/commands/matching.ts` — pure matching helpers used by the terminal: `getCompletions`, `longestCommonPrefix` and `findClosestCommand` (Levenshtein, suggestion capped at distance 2). They take the command list as a parameter and know nothing about content.
- `src/components/Terminal.tsx` — the shell. Owns input, history, arrow-key navigation, Tab completion, the inline ghost suggestion, the `lang` toggle and command dispatch. `clear` and `lang` are handled inline here, not in the registry.
- `src/index.css` — the whole visual theme: CSS variables, terminal chrome, scanlines, responsive breakpoints.
- `public/CNAME` — custom domain. Lives in `public/` so Vite copies it into `dist/`; moving it out breaks the domain on deploy.

Command output is injected with `dangerouslySetInnerHTML`, which is why handlers return HTML strings. Content is authored by hand and trusted — no user input reaches this path.

### Styling classes available inside command output

`.label` (section heading), `.company` (company or project name), `.tech-category` (stack grouping), plus `<strong>` and `<em>`. Reuse these instead of inline styles so entries stay visually consistent.

### Navigation affordances

The site is a terminal on purpose — navigation is solved with real shell affordances rather than added UI chrome (no nav bar, no clickable chips). Keep it that way:

- `Tab` completes; with several matches it fills the longest common prefix and then lists the options. Empty input + `Tab` lists everything.
- A dimmed ghost suggestion trails the cursor; `→` accepts it when the caret is at the end.
- Unknown commands get a "did you mean" suggestion instead of dead-ending.
- Language is auto-detected from `navigator.language` and shown in the header; `lang` toggles it.

Command lookup is case-insensitive — `executeCommand` normalizes once into `normalized` and every comparison and registry lookup must use it.

### Content conventions

- Every command must exist in both `commandsPt` and `commandsEn` with equivalent content.
- Every user-facing string in `Terminal.tsx` belongs in the `translations` object, in both languages.
- Entries follow a fixed shape: emoji + name, dash-prefixed bullet lines, then a `📋 <em>Stack:</em>` line with technologies separated by ` · `.
- External links always carry `target="_blank" rel="noopener noreferrer"`.

## Deployment

Push to `main` → `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages. `npm run deploy` does the same thing manually via `gh-pages`.

## Git conventions

When asked to commit:

- **Split the work into as many small, focused commits as possible.** One logical change per commit — don't bundle unrelated edits. Prefer staging by hunk when a single file contains changes belonging to different commits.
- Use **Conventional Commits**: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`, `build:`, `ci:`, `test:`. Add a scope when it clarifies (`feat(commands): ...`).
- **Never add Claude as an author.** No `Co-Authored-By: Claude` trailer, no "Generated with Claude Code" footer, no mention of AI assistance in the commit message.
- Commit messages describe the change, not the process.
