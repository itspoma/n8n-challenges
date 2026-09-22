import type { MetadataRoute } from "next";

import { posts, type Post } from "@/lib/blog";
import { challengeFileName, challenges } from "@/lib/challenges";
import { lastCommitTime } from "@/lib/content-dates";
import { locales, type Locale } from "@/lib/home-copy";
import {
  absoluteUrl,
  languageAlternates,
  localizedPath,
} from "@/lib/site-metadata";

export const dynamic = "force-static";

// Files that hold each page's text, metadata and structured data; list a new page's files here.
// Dates come from Git, so rebuilds without content changes keep every <lastmod> and
// scripts/indexnow.mjs only submits pages whose date changed.
const pageSources = {
  "": [
    "src/lib/home-copy.ts",
    "src/lib/site-metadata.ts",
    "src/lib/recommended-books.ts",
    "src/app/[locale]/page.tsx",
    "src/app/_components/home-page.tsx",
    // The home page lists every challenge.
    "content/challenges",
  ],
  "/events": ["src/lib/events.ts", "src/app/[locale]/events/page.tsx", "content/events"],
  "/organizers": ["src/lib/organizers.ts", "src/app/[locale]/organizers/page.tsx"],
  "/companies": ["src/lib/companies.ts", "src/app/[locale]/companies/page.tsx"],
  "/about": ["src/lib/about.ts", "src/lib/people.ts", "src/app/[locale]/about/page.tsx"],
};

// posts() lists the newest publication first, so a listing's date changes when an article is added.
function newestPublication(items: Post[]) {
  const [newest] = items;
  return newest ? newest.publishedAt ?? newest.date : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = posts();
  const sections: Array<{ suffix: string; lastModified: (locale: Locale) => string | undefined }> = [
    ...Object.entries(pageSources).map(([suffix, files]) => ({
      suffix,
      lastModified: () => lastCommitTime(files),
    })),
    {
      suffix: "/blog",
      lastModified: (locale) => newestPublication(allPosts.filter((post) => post.locale === locale)),
    },
    ...challenges.map((challenge) => ({
      suffix: `/challenges/${challenge.slug}`,
      lastModified: () => lastCommitTime([`content/challenges/${challengeFileName(challenge.number, challenge.slug)}`]),
    })),
  ];

  const pages = sections.flatMap(({ suffix, lastModified }) => {
    const languages = languageAlternates(suffix);

    return locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, suffix)),
      lastModified: lastModified(locale),
      alternates: { languages },
    }));
  });

  // Tag pages and the blog pages after the first are noindex, so they stay out of the sitemap.
  return [
    ...pages,
    ...allPosts.map((p) => ({
      url: absoluteUrl(`/${p.locale}/blog/${p.slug}`),
      lastModified: p.modifiedAt ?? p.publishedAt ?? p.date,
    })),
  ];
}
