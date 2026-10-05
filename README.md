# andrewsaifnoorian.github.io

Personal site of Andrew Saifnoorian: software engineer at JPMorganChase, M.S. in
Artificial Intelligence (Johns Hopkins), and Doctor of Engineering researcher.

**Live:** https://andrewsaifnoorian.github.io

## Stack

React 19, TypeScript, Vite 8, React Router 8. Plain CSS with design tokens (no
CSS framework), self-hosted Geist and Geist Mono, `react-icons`. No animation
library: motion is CSS plus one small canvas.

## Features

- **Case-study pages** for every project at `/work/<slug>`, each with its own
  pre-rendered HTML, title, description and canonical URL.
- **Command menu** (Ctrl/Cmd + K) to jump to any section, project or paper.
- **Light and dark themes** that follow the system and remember a manual choice,
  with no flash on load.
- **Hero graph** drawn on canvas: three node types stand in for the graph,
  vector and analytics sources of the G-RAG research, and a retrieval path lights
  up every few seconds. Pauses off-screen and respects reduced motion.
- **Accessible by default:** skip link, visible focus rings, native `<dialog>`
  for modals, semantic landmarks, reduced-motion support.

## Development

```bash
npm install
npm run dev        # local dev server
npm run check      # typecheck + lint + tests + production build
npm run format     # prettier
```

Content lives in `src/data/*.ts`; components never hard-code copy. Adding a
project means adding an entry to `src/data/projects.ts` (with a unique `slug`)
and a `.webp` thumbnail in `src/assets/`. The build creates its page and adds it
to the sitemap automatically.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`: audit, format check,
typecheck, lint, tests and build, then deploys `dist/` to GitHub Pages with OIDC.
There is no manual deploy step.

## Layout

```
src/
  data/            content (projects, Kaggle, lab, research, writing, ...)
  components/
    layout/        header, footer
    sections/      one component per home-page section
    ui/            dialog, command menu, theme toggle, hero graph, ...
  pages/           Home, CaseStudy, Certifications, Resume, NotFound
  hooks/           theme, reveal-on-scroll, active section, document meta
  styles/          global tokens and base styles
scripts/
  static-site.ts   build plugin: CSP, per-route HTML, 404 page, sitemap
```

See [SECURITY.md](SECURITY.md) for the hardening details.
