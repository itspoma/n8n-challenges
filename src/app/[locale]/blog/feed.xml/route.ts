import fs from "node:fs";
import path from "node:path";

import { blogFeedPath, blogMetadata, posts, type Post } from "@/lib/blog";
import { socialImage } from "@/lib/blog-images";
import { isLocale, locales } from "@/lib/home-copy";
import { absoluteUrl, SITE_AUTHOR, SITE_NAME } from "@/lib/site-metadata";

export const dynamic = "force-static";

// Feed readers and automations only need the recent articles.
const maxItems = 50;

const imageTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

const xmlEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Escape text for XML element content and attribute values. */
function xml(text: string) {
  return text.replace(/[&<>"']/g, (character) => xmlEntities[character]);
}

/** RFC 822 date, as RSS 2.0 requires. */
function rssDate(timestamp: string) {
  return new Date(timestamp).toUTCString();
}

/** Cover image as an enclosure; RSS requires its size in bytes. */
function coverEnclosure(post: Post) {
  const image = socialImage(post.coverImage);
  const type = imageTypes[path.extname(image.url)];
  const file = path.join(process.cwd(), "public", image.url);

  return type && fs.existsSync(file)
    ? [`<enclosure url="${xml(absoluteUrl(image.url))}" length="${fs.statSync(file).size}" type="${type}"/>`]
    : [];
}

function feedItem(post: Post) {
  const url = absoluteUrl(`/${post.locale}/blog/${post.slug}`);

  return [
    "<item>",
    `<title>${xml(post.title)}</title>`,
    `<link>${xml(url)}</link>`,
    `<guid isPermaLink="true">${xml(url)}</guid>`,
    `<pubDate>${rssDate(post.publishedAt ?? post.date)}</pubDate>`,
    `<dc:creator>${xml(SITE_AUTHOR.name)}</dc:creator>`,
    `<description>${xml(post.description)}</description>`,
    ...post.tags.map((tag) => `<category>${xml(tag)}</category>`),
    ...coverEnclosure(post),
    "</item>",
  ];
}

/** RSS 2.0 feed of one language's newest articles, generated at build time like llms.txt. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return new Response("Not found", { status: 404 });
  }

  const items = posts()
    .filter((post) => post.locale === locale)
    .slice(0, maxItems);
  // Date the channel by its newest content change, not the build, so rebuilds produce the same feed.
  const [lastChange] = items
    .map((post) => post.modifiedAt ?? post.publishedAt ?? post.date)
    .sort((first, second) => Date.parse(second) - Date.parse(first));
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "<channel>",
    `<title>${xml(`${blogMetadata[locale].title} · ${SITE_NAME}`)}</title>`,
    `<link>${xml(absoluteUrl(`/${locale}/blog`))}</link>`,
    `<description>${xml(blogMetadata[locale].description)}</description>`,
    `<language>${locale}</language>`,
    `<atom:link href="${xml(absoluteUrl(blogFeedPath(locale)))}" rel="self" type="application/rss+xml"/>`,
    ...(lastChange ? [`<lastBuildDate>${rssDate(lastChange)}</lastBuildDate>`] : []),
    ...items.flatMap(feedItem),
    "</channel>",
    "</rss>",
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
