/** Reads the static blog at build time. JSON front matter is followed by safe Markdown. */
import fs from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import publicationHistory from "../../content/blog/publication-history.json";
import { execFileSync } from "node:child_process";

import { isShallowRepository } from "./content-dates";
import { locales, type Locale } from "./home-copy";

const gitPublicationTimes = new Map<string, string>();
const gitContentUpdateTimes = new Map<string, string | undefined>();
const publicationHistoryById: Record<
  string,
  { publishedAt?: string; urlSlug?: string } | undefined
> = publicationHistory;

function firstPublicationTime(file: string): string | undefined {
  const cached = gitPublicationTimes.get(file);
  if (cached) return cached;
  // A shallow clone cannot reliably distinguish creation from a later edit.
  if (isShallowRepository()) {
    throw new Error(`Cannot determine publication time for ${file}: fetch full Git history or provide publishedAt.`);
  }
  const timestamps = execFileSync("git", ["log", "--follow", "--diff-filter=A", "--format=%cI", "--", file], { encoding: "utf8" }).trim().split("\n").filter(Boolean);
  const timestamp = timestamps.at(-1);
  if (timestamp) gitPublicationTimes.set(file, timestamp);
  // Uncommitted drafts have no publication timestamp yet.
  return timestamp;
}

// Reader-facing article content; front-matter-only publisher changes are not updates.
function visibleContent(fileContents: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(fileContents);
  if (!match) return fileContents;
  const metadata = JSON.parse(match[1]);
  return JSON.stringify([metadata.title, metadata.subtitle ?? metadata.description, metadata.coverImage, match[2].trim()]);
}

/** Time of the latest commit that changed the visible article after its first version. */
function lastContentUpdateTime(file: string): string | undefined {
  if (gitContentUpdateTimes.has(file)) return gitContentUpdateTimes.get(file);
  let timestamp: string | undefined;
  // A shallow clone lacks earlier versions; omit the update time rather than guess.
  if (!isShallowRepository()) {
    const commits = execFileSync("git", ["log", "--follow", "--name-only", "--format=%x00%H %cI", "--", file], { encoding: "utf8" })
      .split("\0")
      .map((entry) => {
        const [header = "", ...paths] = entry.trim().split("\n");
        const [sha, time] = header.split(" ");
        return { sha, time, path: paths.filter(Boolean).at(-1) };
      })
      // Merge commits list no changed paths.
      .filter((commit) => commit.sha && commit.path);
    const versions = commits.length > 1
      ? commits.map((commit) => visibleContent(execFileSync("git", ["show", `${commit.sha}:${commit.path}`], { encoding: "utf8" })))
      : [];
    // Commits are newest first; compare each version with the one before it.
    timestamp = commits.find((commit, index) => index + 1 < versions.length && versions[index] !== versions[index + 1])?.time;
  }
  gitContentUpdateTimes.set(file, timestamp);
  return timestamp;
}

export type Post = {
  id: string;
  locale: Locale;
  slug: string;
  legacySlug: string;
  title: string;
  description: string;
  subtitle: string;
  coverImage: string;
  coverAlt: string;
  seo: { title: string; description: string; keywords: string[] };
  date: string;
  publishedAt?: string;
  // Latest reader-facing content change after publication, from Git history.
  modifiedAt?: string;
  tags: string[];
  revision: string;
  body: string;
};

export const blogLabels = {
  en: "Blog",
  es: "Blog",
  uk: "Блог",
};

export const blogMetadata = {
  en: {
    title: "n8n Automation & AI Blog",
    description: "Learn n8n through practical tutorials, workflow debugging guides, and AI automation examples from the n8n Balloon Challenges community.",
  },
  es: {
    title: "Blog de automatización e IA con n8n",
    description: "Aprende n8n con tutoriales prácticos, guías para depurar workflows y ejemplos de automatización con IA de la comunidad n8n Balloon Challenges.",
  },
  uk: {
    title: "Блог про автоматизацію та ШІ з n8n",
    description: "Вивчай n8n за практичними посібниками, порадами з налагодження воркфлоу та прикладами автоматизації з ШІ від спільноти n8n Balloon Challenges.",
  },
} satisfies Record<Locale, { title: string; description: string }>;

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
      // Publisher updates may replace front matter. Preserve established URLs
      // and first-publication times independently of the generated article.
      const history = publicationHistoryById[`${locale}/${metadata.id}`];
      metadata.publishedAt ??= history?.publishedAt ?? firstPublicationTime(path.join(directory, fileName));

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
      if (metadata.publishedAt !== undefined &&
        (typeof metadata.publishedAt !== "string" ||
          !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(metadata.publishedAt) ||
          !Number.isFinite(Date.parse(metadata.publishedAt)))) {
        throw new Error(`Invalid publishedAt timestamp: ${fileName}`);
      }
      const urlSlug = history?.urlSlug ?? metadata.urlSlug ?? metadata.slug;
      if (typeof urlSlug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(urlSlug)) {
        throw new Error(`Invalid readable URL slug: ${fileName}`);
      }
      const updatedAt = lastContentUpdateTime(path.join(directory, fileName));
      result.push({
        ...metadata,
        slug: urlSlug,
        legacySlug: metadata.slug,
        subtitle,
        coverImage,
        coverAlt,
        seo,
        // Only content changes after publication count as updates.
        modifiedAt:
          updatedAt && metadata.publishedAt && Date.parse(updatedAt) > Date.parse(metadata.publishedAt)
            ? updatedAt
            : undefined,
        body: frontMatterMatch[2],
      });
    }
  }

  const routes = new Set<string>();
  for (const post of result) {
    for (const slug of new Set([post.slug, post.legacySlug])) {
      const route = `${post.locale}/${slug}`;
      if (routes.has(route)) throw new Error(`Duplicate blog route: ${route}`);
      routes.add(route);
    }
  }

  // Compare instants so timezone offsets do not affect publication order.
  return result.sort((first, second) => Date.parse(second.publishedAt ?? second.date) - Date.parse(first.publishedAt ?? first.date));
}

export const normalizeTag = (tag: string) => tag.trim().normalize("NFC").toLowerCase();

export function tagSlug(tag: string) {
  const normalized = normalizeTag(tag);
  const readable = normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "tag";
  return `${readable}-${createHash("sha256").update(normalized).digest("hex").slice(0, 8)}`;
}

export function tagPath(locale: Locale, tag: string) {
  return `/${locale}/blog/tag/${tagSlug(tag)}`;
}

/** RSS feed of one language's articles, generated by app/[locale]/blog/feed.xml. */
export function blogFeedPath(locale: Locale) {
  return `/${locale}/blog/feed.xml`;
}

export function blogTags() {
  const tags = new Map<string, { locale: Locale; tag: string; label: string }>();
  for (const post of posts()) {
    for (const label of post.tags) {
      const tag = normalizeTag(label);
      if (tag) tags.set(`${post.locale}:${tag}`, { locale: post.locale, tag, label });
    }
  }
  return [...tags.values()];
}

/** Format an ISO timestamp as `YYYY-MM-DD · HH:mm` in Europe/Madrid. */
export function timestampLabel(timestamp: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date(timestamp));
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day} · ${values.hour}:${values.minute}`;
}

export function publicationLabel(post: Post) {
  return post.publishedAt ? timestampLabel(post.publishedAt) : post.date;
}
