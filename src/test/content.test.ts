import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "../data/projects";
import { competitions } from "../data/kaggle";
import { labEntries } from "../data/lab";
import { papers } from "../data/writing";
import { certifications } from "../data/certifications";

const ROOT = join(__dirname, "..", "..");
const EM_DASH = new RegExp(String.fromCharCode(0x2014));
const EMOJI = /\p{Extended_Pictographic}/u;

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

describe("content", () => {
  it("project slugs are unique and URL-safe", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("every case study has an overview, steps and a result", () => {
    for (const item of [...projects, ...competitions, ...labEntries]) {
      expect(item.expandedContent.overview.length).toBeGreaterThan(40);
      expect(item.expandedContent.approach.length).toBeGreaterThan(0);
      expect(item.expandedContent.result.length).toBeGreaterThan(40);
    }
  });

  it("linked PDFs exist in public/", () => {
    const hrefs = [
      ...papers.map((p) => p.href),
      ...projects.flatMap((p) => (p.paper ? [p.paper] : [])),
    ];
    for (const href of hrefs) expect(existsSync(join(ROOT, "public", href))).toBe(true);
  });

  it("external links use https", () => {
    const urls = [
      ...projects.flatMap((p) => (p.repo ? [p.repo] : [])),
      ...certifications.map((c) => c.credentialUrl).filter((u) => u !== "#"),
    ];
    for (const u of urls) expect(u).toMatch(/^https:\/\//);
  });

  it("source files contain no em dashes or emoji", () => {
    const files = walk(join(ROOT, "src")).filter(
      (f) => /\.(tsx?|css)$/.test(f) && !f.includes("test"),
    );
    files.push(join(ROOT, "index.html"));
    const offenders = files.filter((f) => {
      const text = readFileSync(f, "utf8");
      return EM_DASH.test(text) || EMOJI.test(text);
    });
    expect(offenders).toEqual([]);
  });

  it("source never opens new tabs without noopener", () => {
    const files = walk(join(ROOT, "src")).filter((f) => f.endsWith(".tsx"));
    for (const f of files) {
      const text = readFileSync(f, "utf8");
      const blanks = text.match(/target="_blank"/g)?.length ?? 0;
      const safe = text.match(/rel="noopener noreferrer"/g)?.length ?? 0;
      expect(safe, f).toBeGreaterThanOrEqual(blanks);
    }
  });
});
