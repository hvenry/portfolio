# Styling and theme

Tailwind CSS on top of a small set of CSS-variable design tokens, switched between dark and light by `next-themes`.

## Why

Every colour in the site comes from a handful of tokens, so a theme is one block of variables rather than per-component overrides.
The theme is a `data-theme` attribute on `<html>`, so CSS can swap things (like project images) before hydration.

## How it works

- Tokens are RGB triplets in `app/globals.css`: `--foreground`, `--background`, `--muted`, `--subtle`, `--line`, `--line-alpha`, `--nav-dim`.
- `:root` holds dark mode (the default); `[data-theme="light"]` overrides them.
- `tailwind.config.ts` exposes them as colours (`text-foreground`, `border-line`, `bg-background/85`), so opacity modifiers work.
- `ThemeProvider` in `app/layout.tsx` sets `attribute="data-theme"`, defaults to the system theme, and disables transitions on change.
- The navbar toggle flips `resolvedTheme`, and follows live `prefers-color-scheme` changes.

### Type and layout scale

- Fonts: Oswald (`font-display`, headings and nav) and Inter (`font-sans`, body), loaded with `next/font`.
- `xs` through `2xl` text sizes run one step larger than Tailwind's defaults; `3xl` and up keep the defaults.
- Breakpoints are tuned for wide screens: `sm 640px`, `md 1024px`, `lg 1600px`, `xl 2600px`.
- The reading column is `w-full md:w-2/3 lg:w-1/2 xl:w-1/3`.

### Shared classes

| Class                                                | Use                                            |
| ---------------------------------------------------- | ---------------------------------------------- |
| `.body-copy`                                         | Body paragraph under headings and cards        |
| `.link`, `.link-quiet`, `.link-title`, `.link-hover` | Link styles                                    |
| `.rule-dotted`                                       | Dotted hairline after section headings         |
| `.panel-ticks`                                       | Corner crop marks on a `Panel`                 |
| `.glow`                                              | Soft halo on hover                             |
| `.theme-dark-only`, `.theme-light-only`              | Show an element in one theme only              |
| `.icon-invert`                                       | Invert a dark-background icon in light mode    |
| `.reveal-1` to `.reveal-3`                           | Staggered fade-in, only without reduced motion |

## Tech

- Tailwind CSS with `@tailwindcss/typography`
- `next-themes`
- `next/font/google` (Oswald, Inter)

## Key files

- `app/globals.css` - tokens, shared classes, prose and Mermaid overrides
- `tailwind.config.ts` - colours, font sizes, fonts, breakpoints, shake animation
- `components/Panel.tsx` - bordered surface primitive (`ticks`, `interactive`)
- `components/SectionHeading.tsx`, `components/PageHeader.tsx` - heading primitives
- `components/ProjectImage.tsx` - dark/light image pair swapped by CSS

## Decisions and gotchas

- Light mode needs darker hairlines (`--line-alpha: 0.35`) and gentler nav dimming to stay legible.
- Theme-swapped images use CSS, not `useTheme`, so the right image shows on first paint.
- Code blocks use their own `--code-*` variables (dark and light sets in `globals.css`); Mermaid diagrams carry hex palettes in `Mermaid.tsx`. Keep both in step with the tokens.
- `<html>` has `suppressHydrationWarning` because `next-themes` writes `data-theme` before React hydrates.

## Related

- [Layout and navigation](layout-and-navigation.md)
- [Markdown rendering](markdown-rendering.md)
