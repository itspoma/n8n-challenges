import { posts } from "@/lib/blog";
import { locales, type Locale } from "@/lib/home-copy";
import { absoluteUrl } from "@/lib/site-metadata";

export const dynamic = "force-static";

const articleHeadings = {
  en: "English articles",
  es: "Spanish articles",
  uk: "Ukrainian articles",
} satisfies Record<Locale, string>;

// Keep brackets in article titles from ending the Markdown link text early.
const linkText = (text: string) => text.replace(/[[\]]/g, "\\$&");

function articleSection(locale: Locale) {
  const links = posts()
    .filter((post) => post.locale === locale)
    .map((post) => `- [${linkText(post.title)}](${absoluteUrl(`/${locale}/blog/${post.slug}`)}): ${post.description}`);

  return links.length ? [`## ${articleHeadings[locale]}`, "", ...links, ""] : [];
}

/** llms.txt for AI assistants, generated at build time so every published article is listed. */
export function GET() {
  const lines = [
    "# n8n Balloon Challenges",
    "",
    "> Hands-on n8n automation challenges for people learning by building working workflows, available in English, Spanish, and Ukrainian.",
    "",
    "The site contains automation challenges, learning articles, and community events. Challenge pages include scenarios, tasks, preparation, requirements, tips, and bonus tasks. Use the language version that matches the reader's preference.",
    "",
    "## Main content",
    "",
    `- [English homepage and challenge catalog](${absoluteUrl("/en")}): Browse the challenges and learn how the balloon challenge format works.`,
    `- [Blog](${absoluteUrl("/en/blog")}): Articles about n8n and automation.`,
    `- [Events](${absoluteUrl("/en/events")}): Community events and hackathons.`,
    `- [About](${absoluteUrl("/en/about")}): Why the project exists, how mentors and community events use it, how to contribute, and who maintains it.`,
    "",
    ...articleSection("en"),
    "## Other languages",
    "",
    `- [Spanish homepage and challenge catalog](${absoluteUrl("/es")})`,
    `- [Spanish blog](${absoluteUrl("/es/blog")})`,
    `- [Spanish events](${absoluteUrl("/es/events")})`,
    `- [Spanish about page](${absoluteUrl("/es/about")})`,
    `- [Ukrainian homepage and challenge catalog](${absoluteUrl("/uk")})`,
    `- [Ukrainian blog](${absoluteUrl("/uk/blog")})`,
    `- [Ukrainian events](${absoluteUrl("/uk/events")})`,
    `- [Ukrainian about page](${absoluteUrl("/uk/about")})`,
    "",
    ...locales.filter((locale) => locale !== "en").flatMap((locale) => articleSection(locale)),
    "## Optional",
    "",
    `- [Sitemap](${absoluteUrl("/sitemap.xml")}): Complete URL listing for localized pages, individual challenges, articles, and blog tags.`,
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
