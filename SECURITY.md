# Security

This is a static personal site: no backend, no user accounts, no forms, and no
secrets in the bundle. The hardening below is what is possible on GitHub Pages.

## In place

- **Content-Security-Policy** injected at build time (`scripts/static-site.ts`):
  scripts only from this origin and Google Tag Manager, no inline scripts, no
  `eval`, no framing of other sites, no form submissions, `object-src 'none'`.
- **No inline JavaScript.** Theme bootstrapping and analytics live in
  `public/theme-init.js` and `public/analytics.js` so the CSP needs no
  `'unsafe-inline'`. ESLint blocks `dangerouslySetInnerHTML`.
- **Self-hosted fonts** (no Google Fonts request, no third-party CSS).
- **External links** always use `rel="noopener noreferrer"` (enforced by a test).
- **Email address** is assembled on click rather than shipped as a plain
  `mailto:` in the HTML, to cut down on scraping.
- **CI** (`.github/workflows/deploy.yml`): `npm audit`, typecheck, lint, tests
  and build must pass before anything deploys. Actions are pinned to commit
  SHAs, tokens are least-privilege, and checkout does not persist credentials.
- **CodeQL** (security-extended) on every push and weekly; **Dependency Review**
  on pull requests; **Dependabot** for npm and Actions.
- **Pages deploys via OIDC** (`actions/deploy-pages`), so no deploy keys or
  personal tokens exist anywhere.

## Known limits of GitHub Pages

GitHub Pages cannot send custom response headers, so `frame-ancestors`
(clickjacking), HSTS preload and `Permissions-Policy` cannot be set. Moving to
Cloudflare Pages or Netlify would allow a `_headers` file if that ever matters.

## Reporting

Please email the address on the site rather than opening a public issue.
