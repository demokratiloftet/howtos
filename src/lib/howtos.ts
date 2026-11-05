import fs from "node:fs";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";

export const SITE_NAME = "Demokratiløftet – veiledninger";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Display names for category folders, in the order they are shown.
// Folders not listed here are shown after these, using the folder name.
const SECTIONS: Record<string, string> = {
  bruker: "For brukere",
  admin: "For administratorer",
};

export type Howto = {
  section: string;
  slug: string;
  title: string;
  excerpt: string;
};

export type Section = {
  id: string;
  title: string;
  howtos: Howto[];
};

function titleFrom(markdown: string, fallback: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

// First plain paragraph after the title, stripped of Markdown syntax.
function excerptFrom(markdown: string): string {
  const paragraph =
    markdown
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .find((block) => block && !/^(#|[-*+] |\d+\.|>|```|\[TL;DR\])/i.test(block)) ?? "";

  const text = paragraph
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > 160 ? `${text.slice(0, 157).trimEnd()} …` : text;
}

function readMarkdown(section: string, slug: string): string {
  return fs.readFileSync(path.join(CONTENT_DIR, section, `${slug}.md`), "utf-8");
}

function sectionIds(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name);
}

function howtosIn(section: string): Howto[] {
  return fs
    .readdirSync(path.join(CONTENT_DIR, section))
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const markdown = readMarkdown(section, slug);
      return { section, slug, title: titleFrom(markdown, slug), excerpt: excerptFrom(markdown) };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "nb"));
}

export function getSections(): Section[] {
  const known = Object.keys(SECTIONS);
  const rank = (id: string) => (known.includes(id) ? known.indexOf(id) : known.length);

  return sectionIds()
    .map((id) => ({ id, title: SECTIONS[id] ?? id, howtos: howtosIn(id) }))
    .filter((section) => section.howtos.length > 0)
    .sort((a, b) => rank(a.id) - rank(b.id) || a.title.localeCompare(b.title, "nb"));
}

export function getSection(id: string): Section | null {
  return getSections().find((section) => section.id === id) ?? null;
}

export function getAllHowtos(): Howto[] {
  return getSections().flatMap((section) => section.howtos);
}

// Returns null when the howto does not exist. Only slugs found on disk are
// accepted, so URL input is never used to build an arbitrary file path.
export function getHowto(section: string, slug: string) {
  const howto = getAllHowtos().find((h) => h.section === section && h.slug === slug);
  if (!howto) return null;

  const rendered = String(remark().use(html).processSync(readMarkdown(section, slug)));

  // Let authors link to other howtos as `brukedomene.md` (works on GitHub)
  // or `brukedomene` (works on the site); both resolve to the site page.
  const contentHtml = rendered.replace(
    /href="(?![a-z]+:|\/\/|#)([^"]+?)\.md(#[^"]*)?"/gi,
    (_m, target: string, hash = "") => `href="${target}${hash}"`,
  );

  return { ...howto, contentHtml };
}