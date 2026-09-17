/**
 * Parses the publisher's Markdown subset into typed blocks. The article renderer and the
 * article's structured data both read these blocks, so captions, sources and links agree.
 * Unsupported syntax stays plain text, and raw HTML is never passed through.
 */
import { SITE_URL } from "./site-metadata";

export type ListItem = { text: string; checked?: boolean; children: ListItem[] };

export type BlogBlock =
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "paragraph"; text: string }
  | { type: "sources"; text: string }
  // A bold line that introduces the list or diagram after it.
  | { type: "title"; text: string }
  | { type: "list"; style: "bullets" | "numbered" | "checklist"; start?: number; items: ListItem[] }
  | { type: "table"; caption?: string; columns: string[]; rows: string[][] }
  // Blockquotes, which the publisher uses for key takeaways.
  | { type: "callout"; blocks: BlogBlock[] }
  | { type: "contents"; title: string; items: ListItem[] }
  // A paragraph holding only a link is a call to action; the text and title before it belong to it.
  | { type: "cta"; title?: string; text?: string; label: string; href: string }
  | { type: "related"; label: string; title: string; href: string };

export type InlineToken =
  | { type: "text"; text: string }
  | { type: "strong"; children: InlineToken[] }
  | { type: "link"; href: string; children: InlineToken[] };

const linkSource = String.raw`\[((?:\\.|[^\]\\])+)\]\((?:<([^<>\s]+)>|([^()\s]+))\)`;
const leadingLink = new RegExp(`^${linkSource}`);
const linkOnly = new RegExp(`^(\\*\\*)?${linkSource}(\\*\\*)?$`);
const relatedLink = new RegExp(`^\\*\\*((?:\\\\.|[^*\\\\])+?):\\*\\* ${linkSource}$`);
const boldOnly = /^\*\*((?:\\.|[^*\\])+)\*\*$/;
const anchorBlock = /^<a id="([A-Za-z][\w-]*)"><\/a>$/;
const imageBlock = /^!\[((?:\\.|[^\]\\])*)\]\((\/blog\/[a-zA-Z0-9_./-]+)\)$/;
const tableSeparator = /^\|(?:\s*:?-{3,}:?\s*\|)+$/;
const listLine = /^( *)(?:(-) \[([ xX])\] |(-) |(\d+)\. )(.*)$/;
const escapable = /[\\`*_{}[\]()#+\-.!|>]/;

/** Only HTTPS links and links to a heading on the same page are rendered. */
function safeHref(href: string) {
  if (href.startsWith("#")) return /^#[A-Za-z][\w-]*$/.test(href) ? href : undefined;
  try {
    const url = new URL(href);
    return url.protocol === "https:" && !url.username && !url.password ? href : undefined;
  } catch {
    return undefined;
  }
}

// Index of the "**" that closes a bold run opened just before `from`, or -1.
function closingStrong(source: string, from: number) {
  for (let index = from; index < source.length - 1; index++) {
    if (source[index] === "\\") index++;
    else if (source.startsWith("**", index)) return index > from ? index : -1;
  }
  return -1;
}

export function inlineTokens(source: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let text = "";
  const flush = () => {
    if (text) tokens.push({ type: "text", text });
    text = "";
  };

  for (let index = 0; index < source.length; ) {
    if (source[index] === "\\" && escapable.test(source[index + 1] ?? "")) {
      text += source[index + 1];
      index += 2;
      continue;
    }
    const link = source[index] === "[" ? leadingLink.exec(source.slice(index)) : null;
    if (link) {
      const href = safeHref(link[2] ?? link[3]);
      const children = inlineTokens(link[1]);
      flush();
      // A link to an unsupported destination keeps its text and drops the URL.
      tokens.push(...(href ? [{ type: "link" as const, href, children }] : children));
      index += link[0].length;
      continue;
    }
    const end = source.startsWith("**", index) ? closingStrong(source, index + 2) : -1;
    if (end !== -1) {
      flush();
      tokens.push({ type: "strong", children: inlineTokens(source.slice(index + 2, end)) });
      index = end + 2;
      continue;
    }
    text += source[index];
    index++;
  }
  flush();
  return tokens;
}

/** Visible text without Markdown syntax, for alt text, captions and structured data. */
export function inlineText(source: string): string {
  const text = (tokens: InlineToken[]): string =>
    tokens.map((token) => (token.type === "text" ? token.text : text(token.children))).join("");
  return text(inlineTokens(source));
}

function inlineLinks(source: string): string[] {
  const links = (tokens: InlineToken[]): string[] =>
    tokens.flatMap((token) =>
      token.type === "text" ? [] : [...(token.type === "link" ? [token.href] : []), ...links(token.children)],
    );
  return links(inlineTokens(source));
}

function splitCells(line: string) {
  const cells: string[] = [];
  let cell = "";
  // Escaped pipes stay inside the cell; inline parsing removes the backslash later.
  for (let index = 1; index < line.length; index++) {
    if (line[index] === "\\" && index + 1 < line.length) {
      cell += line[index] + line[index + 1];
      index++;
    } else if (line[index] === "|") {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += line[index];
    }
  }
  return cells;
}

type ListBlock = Extract<BlogBlock, { type: "list" }>;

function parseList(lines: string[]): ListBlock | undefined {
  const matches = lines.map((line) => listLine.exec(line));
  if (matches.some((match) => !match)) return undefined;
  const [first] = matches as RegExpExecArray[];
  const style: ListBlock["style"] =
    first[3] !== undefined ? "checklist" : first[5] !== undefined ? "numbered" : "bullets";
  const items: ListItem[] = [];
  const stack: Array<{ indent: number; item: ListItem }> = [];

  for (const match of matches as RegExpExecArray[]) {
    if ((match[5] !== undefined) !== (style === "numbered")) return undefined;
    const item: ListItem = {
      text: match[6],
      ...(match[3] !== undefined ? { checked: match[3] !== " " } : {}),
      children: [],
    };
    const indent = match[1].length;
    while (stack.length && stack.at(-1)!.indent >= indent) stack.pop();
    (stack.at(-1)?.item.children ?? items).push(item);
    stack.push({ indent, item });
  }
  const start = style === "numbered" ? Number(first[5]) : 1;
  return { type: "list", style, ...(start !== 1 ? { start } : {}), items };
}

const wholeLink = new RegExp(`^${linkSource}$`);
const onlyAnchorLinks = (items: ListItem[]): boolean =>
  items.every((item) => {
    const link = wholeLink.exec(item.text);
    return Boolean((link?.[2] ?? link?.[3])?.startsWith("#")) && onlyAnchorLinks(item.children);
  });

// The publisher places an image directly under its heading and writes its caption as the next paragraph.
function isCaption(source: string | undefined) {
  return (
    source !== undefined &&
    !source.includes("\n") &&
    source.length <= 300 &&
    !/^(?:[#!>|<-]|\d+\. |\*\*|Sources:)/.test(source) &&
    !source.includes("](")
  );
}

function parseBlocks(sources: string[]): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  let anchor: string | undefined;

  for (let index = 0; index < sources.length; index++) {
    let lines = sources[index].split("\n");
    const previous = blocks.at(-1);
    // An anchor line names the heading that follows it.
    const anchorMatch = anchorBlock.exec(lines[0]);
    if (anchorMatch) {
      anchor = anchorMatch[1];
      lines = lines.slice(1);
      if (!lines.length) continue;
    }
    const source = lines.join("\n");

    const heading = lines.length === 1 ? /^(#{1,6}) (.+)$/.exec(source) : null;
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length <= 2 ? 2 : 3,
        text: heading[2],
        ...(anchor ? { id: anchor } : {}),
      });
      anchor = undefined;
      continue;
    }
    anchor = undefined;

    const image = imageBlock.exec(source);
    if (image && !image[2].includes("..")) {
      const caption = previous?.type === "heading" && isCaption(sources[index + 1]) ? sources[++index] : undefined;
      blocks.push({ type: "image", src: image[2], alt: inlineText(image[1]), ...(caption ? { caption } : {}) });
      continue;
    }

    if (lines.length >= 2 && lines.every((line) => line.startsWith("|")) && tableSeparator.test(lines[1])) {
      const caption = previous?.type === "title" ? (blocks.pop(), previous.text) : undefined;
      blocks.push({
        type: "table",
        ...(caption ? { caption } : {}),
        columns: splitCells(lines[0]),
        rows: lines.slice(2).map(splitCells),
      });
      continue;
    }

    if (lines.every((line) => line.startsWith(">"))) {
      blocks.push({
        type: "callout",
        blocks: parseBlocks(splitBlocks(lines.map((line) => line.replace(/^> ?/, "")).join("\n"))),
      });
      continue;
    }

    const list = parseList(lines);
    if (list) {
      if (previous?.type === "title" && onlyAnchorLinks(list.items)) {
        blocks.pop();
        blocks.push({ type: "contents", title: previous.text, items: list.items });
      } else {
        blocks.push(list);
      }
      continue;
    }

    const text = lines.join(" ");
    const cta = linkOnly.exec(text);
    const ctaHref = cta && Boolean(cta[1]) === Boolean(cta[5]) ? safeHref(cta[3] ?? cta[4]) : undefined;
    if (cta && ctaHref && !ctaHref.startsWith("#")) {
      // Publisher calls to action are introduced by the paragraph before them, and lead magnets by a bold title.
      const intro = previous?.type === "paragraph" ? (blocks.pop(), previous.text) : undefined;
      const beforeIntro = blocks.at(-1);
      const title = intro && beforeIntro?.type === "title" ? (blocks.pop(), beforeIntro.text) : undefined;
      blocks.push({
        type: "cta",
        ...(title ? { title } : {}),
        ...(intro ? { text: intro } : {}),
        label: cta[2],
        href: ctaHref,
      });
      continue;
    }

    const related = relatedLink.exec(text);
    const relatedHref = related ? safeHref(related[3] ?? related[4]) : undefined;
    if (related && relatedHref && !relatedHref.startsWith("#")) {
      blocks.push({ type: "related", label: related[1], title: related[2], href: relatedHref });
      continue;
    }

    const title = boldOnly.exec(text);
    if (title) blocks.push({ type: "title", text: title[1] });
    else if (text.startsWith("Sources:")) blocks.push({ type: "sources", text });
    else blocks.push({ type: "paragraph", text });
  }
  return blocks;
}

function splitBlocks(markdown: string) {
  return markdown
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n/)
    .map((source) => source.trim())
    .filter(Boolean);
}

export function parseBlogMarkdown(body: string): BlogBlock[] {
  const sources = splitBlocks(body);
  // The publisher ends each article with a "Tags:" line; the page already shows the tags.
  if (/^Tags: [^\n]*$/.test(sources.at(-1) ?? "")) sources.pop();
  return parseBlocks(sources);
}

function flatten(blocks: BlogBlock[]): BlogBlock[] {
  return blocks.flatMap((block) => (block.type === "callout" ? flatten(block.blocks) : [block]));
}

const itemTexts = (items: ListItem[]): string[] =>
  items.flatMap((item) => [item.text, ...itemTexts(item.children)]);

/** Images in the article text with their alt text and captions. */
export function blogImages(blocks: BlogBlock[]) {
  return flatten(blocks).filter((block) => block.type === "image");
}

/** HTTPS pages the article cites in its "Sources:" lines, in order of first use. */
export function blogCitations(blocks: BlogBlock[]) {
  return [
    ...new Set(flatten(blocks).flatMap((block) => (block.type === "sources" ? inlineLinks(block.text) : []))),
  ].filter((href) => !href.startsWith("#"));
}

/** Every HTTPS link in the article text, including calls to action. */
export function blogLinks(blocks: BlogBlock[]) {
  return [
    ...new Set(
      flatten(blocks).flatMap((block) => {
        switch (block.type) {
          case "paragraph":
          case "sources":
            return inlineLinks(block.text);
          case "list":
          case "contents":
            return itemTexts(block.items).flatMap(inlineLinks);
          case "table":
            return [...block.columns, ...block.rows.flat()].flatMap(inlineLinks);
          case "cta":
            return [block.href, ...inlineLinks(block.text ?? "")];
          case "related":
            return [block.href];
          default:
            return [];
        }
      }),
    ),
  ].filter((href) => !href.startsWith("#"));
}

/** Pathname of a link to this site, or undefined for other sites. */
export function sitePath(href: string) {
  const url = new URL(href);
  return url.origin === SITE_URL.origin ? url.pathname.replace(/\/$/, "") : undefined;
}
