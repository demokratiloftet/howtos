import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

export const SITE_NAME = "Demokratiløftet – dokumentasjon";

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

// Remove fenced code blocks so `# comments` inside them are never
// mistaken for headings or paragraphs.
function withoutCodeBlocks(markdown: string): string {
  return markdown.replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, "");
}

function titleFrom(markdown: string, fallback: string): string {
  const match = withoutCodeBlocks(markdown).match(/^#[ \t]+(\S.*)$/m);
  return match ? match[1].trim() : fallback;
}

const LINK = /\[([^\]]*)\]\([^)]*\)/g;

// First plain paragraph, stripped of Markdown syntax. Headings, lists,
// quotes, code, HTML and paragraphs that are only a link are skipped.
function excerptFrom(markdown: string): string {
  const paragraph =
    withoutCodeBlocks(markdown)
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .find(
        (block) =>
          block &&
          !/^(#|[-*+] |\d+\.|>|<|\|)/.test(block) &&
          block.replace(LINK, "").trim() !== "",
      ) ?? "";

  const text = paragraph
    .replace(LINK, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > 160 ? `${text.slice(0, 157).trimEnd()} …` : text;
}

// Anything but letters (incl. æøå), digits, whitespace, "_" and "-".
// Built with the constructor since tsconfig targets ES2017 (\p{} is ES2018).
const NOT_SLUG_CHAR = new RegExp("[^\\p{L}\\p{N}\\s_-]", "gu");

// GitHub-style heading ids, so `page.md#bytte-handle` links work on the site
// too. Ids only contain letters, digits, "-" and "_", so they are safe in HTML.
function addHeadingIds(html: string): string {
  const used = new Map<string, number>();
  return html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (_m, level: string, inner: string) => {
    const base =
      inner
        .replace(/<[^>]+>/g, "")
        .replace(/&[#\w]+;/g, "")
        .toLowerCase()
        .replace(NOT_SLUG_CHAR, "")
        .trim()
        .replace(/\s/g, "-") || "section";
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
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

// Wrapped in React cache() so the content folder is read once per render,
// even though metadata, page and section lookups all call it.
export const getSections = cache((): Section[] => {
  const known = Object.keys(SECTIONS);
  const rank = (id: string) => (known.includes(id) ? known.indexOf(id) : known.length);

  return sectionIds()
    .map((id) => ({ id, title: SECTIONS[id] ?? id, howtos: howtosIn(id) }))
    .filter((section) => section.howtos.length > 0)
    .sort((a, b) => rank(a.id) - rank(b.id) || a.title.localeCompare(b.title, "nb"));
});

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

  const rendered = String(remark().use(gfm).use(html).processSync(readMarkdown(section, slug)));

  // Let authors link to other howtos as `brukedomene.md` (works on GitHub)
  // or `brukedomene` (works on the site); both resolve to the site page.
  const contentHtml = addHeadingIds(
    rendered.replace(
      /href="(?![a-z]+:|\/\/|#)([^"]+?)\.md(#[^"]*)?"/gi,
      (_m, target: string, hash = "") => `href="${target}${hash}"`,
    ),
  );

  return { ...howto, contentHtml };
}