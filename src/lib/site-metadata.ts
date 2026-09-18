import type { Metadata } from "next";

import { blogFeedPath, blogMetadata } from "@/lib/blog";
import { locales, type Locale } from "@/lib/home-copy";

export const SITE_NAME = "n8n Balloon Challenges";
export const SITE_DESCRIPTION =
  "Choose an n8n challenge, build a working automation, and collect a balloon with your team.";
export const SITE_URL = new URL("https://n8n-challenges.app");
export const GA_MEASUREMENT_ID = "G-JVPX079WGB";
// Blog articles are written by the site's author; the profile matches the consulting CTA.
export const SITE_AUTHOR = {
  name: "Roman Rodomansky",
  url: "https://www.linkedin.com/in/rodomansky/",
  sameAs: ["https://www.linkedin.com/in/rodomansky/", "https://github.com/itspoma"],
};

const openGraphLocales = {
  en: "en_US",
  es: "es_ES",
  uk: "uk_UA",
} satisfies Record<string, string>;

const homeMetadata = {
  en: {
    title: "Hands-on n8n Automation Challenges",
    description:
      "Build 10 hands-on n8n automation challenges with webhooks, APIs, AI, and data. Available in English, Spanish, and Ukrainian.",
  },
  es: {
    title: "Retos prácticos de automatización con n8n",
    description:
      "Resuelve 10 retos prácticos de automatización con n8n, webhooks, APIs, IA y datos. Disponibles en inglés, español y ucraniano.",
  },
  uk: {
    title: "Практичні завдання з автоматизації в n8n",
    description:
      "Виконайте 10 практичних завдань з автоматизації в n8n із вебхуками, API, ШІ та даними. Доступно англійською, іспанською та українською.",
  },
} satisfies Record<string, { title: string; description: string }>;

export function localizedPath(locale: Locale, suffix = "") {
  return `/${locale}${suffix}`;
}

export function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export function languageAlternates(suffix = "") {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, absoluteUrl(localizedPath(locale, suffix))]),
    ),
    "x-default": absoluteUrl(localizedPath("en", suffix)),
  };
}

/** Advertises the locale's blog RSS feed to feed readers from any page. */
export function blogFeedAlternates(locale: Locale) {
  return {
    "application/rss+xml": [
      { url: absoluteUrl(blogFeedPath(locale)), title: blogMetadata[locale].title },
    ],
  };
}

export function getHomeMetadata(locale: Locale) {
  return homeMetadata[locale] ?? homeMetadata.en;
}

export function projectPreviewImage(locale: Locale) {
  return { url: absoluteUrl(`/${locale}/opengraph-image`), width: 1200, height: 630, alt: SITE_NAME };
}

/** Site name and Open Graph locales; pass only the locales that have this page. */
export function openGraphLocaleFields(locale: Locale, availableLocales: readonly Locale[] = locales) {
  return {
    siteName: SITE_NAME,
    locale: openGraphLocales[locale] ?? openGraphLocales.en,
    alternateLocale: availableLocales
      .filter((alternateLocale) => alternateLocale !== locale)
      .map((alternateLocale) => openGraphLocales[alternateLocale] ?? openGraphLocales.en),
  };
}

export function createLocalizedMetadata({
  locale,
  suffix = "",
  title,
  description,
  keywords,
  images,
}: {
  locale: Locale;
  suffix?: string;
  title: string;
  description: string;
  keywords?: string[];
  images?: NonNullable<Metadata["openGraph"]>["images"];
}): Metadata {
  const previewImages = images ?? [projectPreviewImage(locale)];
  const pathname = localizedPath(locale, suffix);
  const brandedTitle = `${title} · ${SITE_NAME}`;

  return {
    metadataBase: SITE_URL,
    title: { absolute: brandedTitle },
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: pathname,
      languages: languageAlternates(suffix),
      types: blogFeedAlternates(locale),
    },
    openGraph: {
      type: "website",
      url: pathname,
      title: brandedTitle,
      description,
      images: previewImages,
      ...openGraphLocaleFields(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: previewImages,
    },
  };
}
