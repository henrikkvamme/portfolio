# Henrik Kvamme - Portfolio

> Full-Stack Developer, AI Engineer & Creative Technologist

Interactive portfolio showcasing a decade of development experience, featuring 3D graphics (ray marching, metaballs), parallax tilt cards, and a Mapbox location bento card.

## About Me

I'm Henrik Kvamme, a passionate developer with **10 years of experience** starting from age 10. Currently working as a **consultant at Texicon** while taking on exciting freelance projects.

### What I Do

- **Full-Stack Development** — Crafting complete web applications from frontend to backend
- **Mobile Development** — Building native and cross-platform mobile apps
- **AI Engineering** — Implementing machine learning and AI solutions
- **Algorithm Design** — Competitive programming and optimization

### Current Tech Stack

- **Go-To Stack**: TanStack Start + oRPC + PostgreSQL + Drizzle
- **Frontend**: React, TanStack Router/Query, TypeScript
- **Backend**: Rust, Python (FastAPI/Django), Hono, Java Spring Boot
- **Databases**: PostgreSQL, SQLite, MySQL, Prisma/Drizzle
- **AI/ML**: Python, TensorFlow, PyTorch

## Tech

- **TanStack Start** + Vite + Nitro — full-stack React framework
- **TypeScript** with strict mode
- **TailwindCSS v4**
- **shadcn/ui** components
- **Bun** as package manager and runtime
- **oxlint** + **oxfmt** — Rust-based linting and formatting
- **Husky** + **lint-staged** for pre-commit checks

## Getting Started

```bash
bun install
bun run dev          # → http://localhost:3000
```

## Available Scripts

| Command               | What it does                                |
| --------------------- | ------------------------------------------- |
| `bun run dev`         | Start the web app in development mode       |
| `bun run build`       | Build every workspace package (brand → web) |
| `bun run build:web`   | Build only the web app                      |
| `bun run check-types` | Run `tsc --noEmit` across all workspaces    |
| `bun run lint`        | Run oxlint                                  |
| `bun run lint:fix`    | Run oxlint with autofix                     |
| `bun run format`      | Check formatting with oxfmt                 |
| `bun run format:fix`  | Apply formatting with oxfmt                 |
| `bun run check`       | Lint + format check (CI gate)               |

## Project Structure

```
portfolio/
├── apps/
│   └── web/              # TanStack Start app (Vite + Nitro)
└── packages/
    └── brand/            # Shared brand components (Logo, Footer)
```

## Environment Variables

Copy `apps/web/.env.example` to `apps/web/.env.local` and fill in:

- `VITE_POSTHOG_KEY` — PostHog project key (optional)
- `VITE_MAPBOX_ACCESS_TOKEN` — Mapbox public token for the location card
- `VITE_DISABLE_THREEJS` — set to `true` to skip the hero three.js scene during dev

## Deployment

Configured for Dokploy via `nixpacks.toml` (and `railpack.toml` as backup). The build emits `apps/web/.output/server/index.mjs`, started with `node apps/web/.output/server/index.mjs`.

---

## Let's Connect

I'm always open for **freelance opportunities** and interesting challenges. Whether you have a project in mind, want to collaborate, or just want to chat about tech — let's build something amazing together!

_Ready to create exceptional user experiences that users love._
