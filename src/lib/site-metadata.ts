import type { Metadata } from "next";

import { locales, type Locale } from "@/lib/home-copy";

export const SITE_NAME = "n8n Balloon Challenges";
export const SITE_DESCRIPTION =
  "Choose an n8n challenge, build a working automation, and collect a balloon with your team.";
export const SITE_URL = new URL("https://n8n-challenges.app");

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

export function getHomeMetadata(locale: Locale) {
  return homeMetadata[locale] ?? homeMetadata.en;
}

export function createLocalizedMetadata({
  locale,
  suffix = "",
  title,
  description,
  images,
}: {
  locale: Locale;
  suffix?: string;
  title: string;
  description: string;
  images?: NonNullable<Metadata["openGraph"]>["images"];
}): Metadata {
  const pathname = localizedPath(locale, suffix);
  const brandedTitle = `${title} · ${SITE_NAME}`;
  const openGraphLocale = openGraphLocales[locale] ?? openGraphLocales.en;

  return {
    metadataBase: SITE_URL,
    title: { absolute: brandedTitle },
    description,
    alternates: {
      canonical: pathname,
      languages: languageAlternates(suffix),
    },
    openGraph: {
      type: "website",
      url: pathname,
      siteName: SITE_NAME,
      title: brandedTitle,
      description,
      images,
      locale: openGraphLocale,
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale] ?? openGraphLocales.en),
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images,
    },
  };
}
