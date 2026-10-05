import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import type { Plugin } from "vite";

/**
 * Build-time helpers for hosting a SPA on GitHub Pages, which cannot set
 * response headers or rewrite routes:
 *
 * 1. Injects a Content-Security-Policy <meta> (production only; the dev server
 *    needs inline scripts for HMR).
 * 2. Writes a real index.html for every route so deep links return 200 with
 *    route-specific <title>, description, canonical and Open Graph tags, instead
 *    of relying on a 404.html redirect.
 * 3. Emits 404.html (noindex) and sitemap.xml.
 */

const SITE = "https://andrewsaifnoorian.github.io";

export const CSP = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com",
  "style-src 'self'",
  "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "manifest-src 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "worker-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "upgrade-insecure-requests",
].join("; ");

interface Route {
  path: string;
  title: string;
  description: string;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Reads slug/title/description from the projects data without importing image modules. */
const readProjectRoutes = (root: string): Route[] => {
  const src = readFileSync(join(root, "src/data/projects.ts"), "utf8");
  const re = /slug: "([^"]+)",[\s\S]*?title: "([^"]+)",[\s\S]*?description:\s*"((?:[^"\\]|\\.)*)"/g;
  const routes: Route[] = [];
  for (const m of src.matchAll(re)) {
    routes.push({ path: `/work/${m[1]}/`, title: m[2], description: m[3] });
  }
  if (routes.length === 0) throw new Error("static-site: no project routes found");
  return routes;
};

const withMeta = (html: string, route: Route, extraHead = "") => {
  const url = `${SITE}${route.path}`;
  const title = escapeHtml(`${route.title} | Andrew Saifnoorian`);
  const desc = escapeHtml(route.description);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
    .replace("</head>", `${extraHead}</head>`);
};

export const staticSite = (): Plugin => {
  let root = process.cwd();
  let outDir = "dist";

  return {
    name: "static-site",
    configResolved(config) {
      root = config.root;
      outDir = resolve(config.root, config.build.outDir);
    },
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (ctx.server) return html;
        return html.replace(
          /<meta charset="utf-8" \/>/,
          `<meta charset="utf-8" />\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`,
        );
      },
    },
    closeBundle() {
      const indexPath = join(outDir, "index.html");
      const html = readFileSync(indexPath, "utf8");

      const routes: Route[] = [
        ...readProjectRoutes(root),
        {
          path: "/certifications/",
          title: "Certifications",
          description:
            "Certifications earned by Andrew Saifnoorian, including Anthropic's Model Context Protocol courses and ServiceNow Certified Application Developer.",
        },
        {
          path: "/resume/",
          title: "Resume",
          description: "Get in touch with Andrew Saifnoorian.",
        },
      ];

      for (const route of routes) {
        const file = join(outDir, route.path, "index.html");
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, withMeta(html, route));
      }

      writeFileSync(
        join(outDir, "404.html"),
        withMeta(
          html,
          { path: "/404", title: "Page not found", description: "This page does not exist." },
          '    <meta name="robots" content="noindex" />\n  ',
        ),
      );

      const today = new Date().toISOString().slice(0, 10);
      const urls = ["/", ...routes.filter((r) => r.path !== "/resume/").map((r) => r.path)];
      const sitemap =
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        urls
          .map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`)
          .join("\n") +
        "\n</urlset>\n";
      writeFileSync(join(outDir, "sitemap.xml"), sitemap);
    },
  };
};
