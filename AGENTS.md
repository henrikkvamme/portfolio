# Agent Instructions

This project uses **Vite+** (the `vp` CLI) as its unified toolchain and **Bun** as
the package manager. Prefer `vp` commands over invoking vite / oxlint / oxfmt /
vitest directly.

## Commands

- `vp check` — format + lint + **type-check** in one pass. Run this to validate;
  it must be clean before considering work done.
- `vp check --fix` — auto-fix formatting and lint issues.
- `vp dev` — dev server (web app runs on port 3000).
- `vp build` — production build.
- `vp test` — run tests (Vitest).
- `vp install` / `vp add <pkg>` / `vp remove <pkg>` — dependency management
  (delegates to Bun).

## Conventions

- **Bun** is the package manager (`packageManager: bun@…`). Never use npm/yarn/pnpm.
- Tooling config (`lint`, `fmt`, `staged`) lives in the **root `vite.config.ts`**,
  not in separate `.oxlintrc`/`.oxfmtrc` files.
- Linting is **type-aware** — `vp check` runs full type-checking. Fix type errors;
  don't suppress them.
- Avoid `as` type assertions. The one sanctioned exception is the trusted JSON
  data boundary in `apps/web/src/data/projects.ts`.
- Pre-commit runs `vp staged` (configured in the `staged` block of
  `vite.config.ts`); hooks live in `.vite-hooks/`.

## Structure

- `apps/web` — TanStack Start + Nitro app (React 19, Tailwind v4, Three.js).
- `packages/brand` — shared brand components (`@henrikkvamme/brand`, built with Rollup).
