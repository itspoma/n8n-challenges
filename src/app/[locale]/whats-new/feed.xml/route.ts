import { isLocale, locales } from "@/lib/home-copy";
import { absoluteUrl, localizedPath, SITE_NAME } from "@/lib/site-metadata";
import { whatsNew, whatsNewCopy, type WhatsNewEntry } from "@/lib/whats-new";

export const dynamic = "force-static";

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

function feedItem(locale: string, entry: WhatsNewEntry) {
  return [
    "<item>",
    `<title>${xml(entry.title)}</title>`,
    `<link>${xml(absoluteUrl(`/${locale}${entry.path}`))}</link>`,
    `<guid isPermaLink="false">${xml(entry.id)}</guid>`,
    `<pubDate>${rssDate(entry.addedAt)}</pubDate>`,
    `<description>${xml(entry.text)}</description>`,
    "</item>",
  ];
}

/**
 * RSS 2.0 feed of one language's new challenges and events (src/lib/whats-new.ts), newest first,
 * generated at build time like the blog's feed.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return new Response("Not found", { status: 404 });
  }

  const copy = whatsNewCopy[locale];
  const items = whatsNew(locale);
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `<title>${xml(`${copy.title} · ${SITE_NAME}`)}</title>`,
    `<link>${xml(absoluteUrl(localizedPath(locale)))}</link>`,
    `<description>${xml(copy.description)}</description>`,
    `<language>${locale}</language>`,
    `<atom:link href="${xml(absoluteUrl(localizedPath(locale, "/whats-new/feed.xml")))}" rel="self" type="application/rss+xml"/>`,
    // Dated by the newest addition, not the build, so rebuilds produce the same feed.
    ...(items.length ? [`<lastBuildDate>${rssDate(items[0].addedAt)}</lastBuildDate>`] : []),
    ...items.flatMap((entry) => feedItem(locale, entry)),
    "</channel>",
    "</rss>",
  ];
  // Plain application/xml, as GitHub Pages serves .xml files.
  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
