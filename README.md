# henryvendittelli.com

My personal portfolio and blog, designed and built from scratch.

![CI](https://github.com/hvenry/portfolio/actions/workflows/ci.yml/badge.svg) ![Smoke](https://github.com/hvenry/portfolio/actions/workflows/smoke.yml/badge.svg)

Live at **[henryvendittelli.com](https://henryvendittelli.com)**

![henryvendittelli.com: Henry Vendittelli, Software Developer, Toronto, Canada](app/opengraph-image.png)

## Why

A portfolio should show how I build, not just list what I built.
Projects and posts are plain markdown files with diagrams, math, and code, prerendered into static pages.
It ships like production software: every change goes through a PR with lint, type, and build checks, plus Playwright smoke tests against a live preview that has its own database branch.

## Quick start

```bash
pnpm install                  # install deps (also runs prisma generate)
cp .env.example .env.local    # Clerk keys and DATABASE_URL, used by the /rock guestbook
pnpm dev                      # http://localhost:3000
```

## Docs

- [Content system](docs/content-system.md) - how projects and posts go from markdown to static pages
- [Markdown rendering](docs/markdown-rendering.md) - code blocks, Mermaid diagrams, and LaTeX
- [Styling and theme](docs/styling-and-theme.md) - design tokens, fonts, and light/dark switching
- [Guestbook](docs/guestbook.md) - the `/rock` page, Clerk sign-in, and the comments API
- [CI/CD](docs/ci-cd.md) - PR checks, preview smoke tests, and deploys

## Status

Active and live at [henryvendittelli.com](https://henryvendittelli.com).
Contact: hvendittelli@gmail.com
