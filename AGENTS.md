# henryvendittelli.com

Henry Vendittelli's personal portfolio and blog, live at henryvendittelli.com.
Projects and posts are markdown files, prerendered as static pages; the only dynamic feature is the `/rock` guestbook.
Every change ships through a PR into a protected `main`, and merging deploys to production on Vercel.
Stack: TypeScript, Next.js App Router, React, Tailwind CSS, Prisma + Neon PostgreSQL, Clerk, Playwright, Vercel.

## Commands

```bash
pnpm install                            # install deps (also runs prisma generate)
pnpm dev                                # dev server on http://localhost:3000
pnpm lint                               # eslint
pnpm lint:fix                           # eslint with autofix
pnpm type-check                         # route typegen, then tsc --noEmit
pnpm format                             # prettier, write
pnpm format:check                       # prettier, check only (what CI runs)
pnpm build                              # prisma generate + next build, no database access
pnpm test                               # unit tests (node --test, lib/**/*.test.ts)
node --test lib/fieldTable.test.ts      # run a single unit test file
pnpm test:e2e                           # Playwright smoke suite against :3000, or BASE_URL
pnpm test:e2e -g "theme toggle"         # run a single test by name
pnpm prisma migrate dev --name <name>   # create and apply a schema migration
```

## Repo map

```
app/                 routes, root layout, globals.css, api/comments
components/          UI, one component per file
lib/                 content loaders, Prisma client, small helpers
hooks/               client hooks
data/index.ts        static site content (nav, setup, workflow, contact)
content/projects/    project writeups; filename is the URL slug; _TEMPLATE.md is the shape
content/experience/  work, education and club cards, one file per role; _TEMPLATE.md is the shape
content/pages/       page copy (home-intro.md: intro on /), loaded by lib/pages.ts
content/blog/        blog posts; filename is the URL slug
prisma/              schema and committed migrations
e2e/                 Playwright smoke tests and Vercel bypass setup
docs/                concept docs, indexed below
```

## Conventions

- **Use pnpm only.** CI installs with `--frozen-lockfile`; another package manager drifts the lockfile.
- **Never commit, stage, or push.** The user handles all git operations.
- **Never kill port 3000.** It is the user's own dev server; run verification servers on another port and kill them by PID.
- **No em dashes in site content (`content/`, `data/index.ts`).** The user reads entries aloud, and em dashes read as machine-written.
- **Import Prisma only from `lib/db.ts`.** Extra `PrismaClient` instances exhaust connections during hot reload.
- **`pnpm build` never touches a database.** CI builds with a dummy `DATABASE_URL`; migrations run only in Vercel's build command.
- **Ship schema changes as committed migrations.** Previews and production apply them with `migrate deploy`; `db push` bypasses that history.
- **Keep `"use client"` on the smallest component that needs it.** Everything above it stays server-rendered and out of the client bundle.
- **Keep `/projects` static.** Read the `?tech=` filter on the client; reading `searchParams` on the server makes the route dynamic.
- **Run lint, type-check, format check, and build before calling a change done.** They are the required PR checks.
- **Update the matching doc in the same change as the code.** A doc that drifts from the code misleads the next agent.

## Docs

- Before adding or editing a project, blog post, experience card or page copy, or changing `lib/content.ts`, `lib/projects.ts`, `lib/posts.ts`, `lib/experience.ts` or `lib/pages.ts`, read `docs/content-system.md`.
- Before changing how markdown renders (code blocks, Mermaid, LaTeX, tables), read `docs/markdown-rendering.md`.
- Before changing tech badges, icons, or the `/projects` filter, read `docs/tech-filter.md`.
- Before changing the root layout, navbar, footer, page metadata, share cards (`lib/og.tsx`), or the `/random` canvas, read `docs/layout-and-navigation.md`.
- Before changing colours, fonts, breakpoints, or theme switching, read `docs/styling-and-theme.md`.
- Before changing the `/rock` guestbook, Clerk, or `proxy.ts`, read `docs/guestbook.md`.
- Before changing `prisma/schema.prisma` or anything touching the database, read `docs/database.md`.
- Before changing GitHub Actions, Playwright, or deploy settings, read `docs/ci-cd.md`.
