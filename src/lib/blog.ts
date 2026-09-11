/** Reads the static blog at build time. JSON front matter is followed by safe Markdown. */
import fs from "node:fs";
import path from "node:path";

import { locales, type Locale } from "./home-copy";

export type Post = {
  id: string;
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  subtitle: string;
  coverImage: string;
  coverAlt: string;
  seo: { title: string; description: string; keywords: string[] };
  date: string;
  tags: string[];
  revision: string;
  body: string;
};

export const blogLabels = {
  en: "Blog",
  es: "Blog",
  uk: "Блог",
};

export const emptyLabels = {
  en: "Articles are coming soon.",
  es: "Próximamente publicaremos artículos.",
  uk: "Статті незабаром з’являться.",
};

export function posts(): Post[] {
  const result: Post[] = [];

  for (const locale of locales) {
    const directory = path.join(process.cwd(), "content/blog", locale);

    if (!fs.existsSync(directory)) {
      continue;
    }

    for (const fileName of fs
      .readdirSync(directory)
      .filter((fileName) => fileName.endsWith(".md"))) {
      const fileContents = fs.readFileSync(
        path.join(directory, fileName),
        "utf8",
      );
      // Each file starts with JSON metadata between two Markdown delimiters.
      const frontMatterMatch =
        /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(fileContents);

      if (!frontMatterMatch) {
        throw new Error(`Invalid blog front matter: ${fileName}`);
      }

      const metadata = JSON.parse(frontMatterMatch[1]);

      // Reject metadata that disagrees with the file path or publisher schema.
      if (
        metadata.locale !== locale ||
        !/^[a-z0-9-]+$/.test(metadata.slug) ||
        fileName !== `${metadata.slug}.md` ||
        ![
          metadata.id,
          metadata.title,
          metadata.description,
          metadata.revision,
        ].every((value) => typeof value === "string" && value.length > 0) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(metadata.date) ||
        !Array.isArray(metadata.tags) ||
        !metadata.tags.every((tag: unknown) => typeof tag === "string")
      ) {
        throw new Error(`Invalid blog metadata: ${fileName}`);
      }

      if (
        result.some((post) => post.locale === locale && post.id === metadata.id)
      ) {
        throw new Error(`Duplicate blog ID: ${metadata.id}`);
      }

      // Older posts retain sensible defaults; explicitly supplied fields must be valid.
      const subtitle = metadata.subtitle ?? metadata.description;
      const coverImage = metadata.coverImage ?? "/blog/placeholder.svg";
      const coverAlt =
        metadata.coverAlt ?? "Blog article placeholder illustration";
      const seo = metadata.seo ?? {
        title: metadata.title,
        description: metadata.description,
        keywords: metadata.tags,
      };
      if (
        ![subtitle, coverAlt, seo.title, seo.description].every(
          (value) => typeof value === "string" && value.trim(),
        ) ||
        typeof coverImage !== "string" ||
        !/^\/blog\/[a-zA-Z0-9_./-]+$/.test(coverImage) ||
        coverImage.includes("..") ||
        !fs.existsSync(path.join(process.cwd(), "public", coverImage)) ||
        !Array.isArray(seo.keywords) ||
        !seo.keywords.every((value: unknown) => typeof value === "string")
      ) {
        throw new Error(
          `Invalid blog presentation or SEO metadata: ${fileName}`,
        );
      }
      result.push({
        ...metadata,
        subtitle,
        coverImage,
        coverAlt,
        seo,
        body: frontMatterMatch[2],
      });
    }
  }

  // ISO date strings sort chronologically, with the newest articles first.
  return result.sort((first, second) => second.date.localeCompare(first.date));
}
