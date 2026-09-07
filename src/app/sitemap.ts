import type { MetadataRoute } from "next";

import { challenges } from "@/lib/challenges";
import { locales } from "@/lib/home-copy";
import {
  absoluteUrl,
  languageAlternates,
  localizedPath,
} from "@/lib/site-metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const suffixes = [
    "",
    "/events",
    ...challenges.map((challenge) => `/challenges/${challenge.slug}`),
  ];

  return suffixes.flatMap((suffix) => {
    const languages = languageAlternates(suffix);

    return locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, suffix)),
      alternates: { languages },
    }));
  });
}
