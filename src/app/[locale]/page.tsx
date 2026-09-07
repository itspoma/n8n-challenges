import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { HomePage } from "@/app/_components/home-page";
import { isLocale, locales } from "@/lib/home-copy";
import { createLocalizedMetadata, getHomeMetadata } from "@/lib/site-metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const copy = getHomeMetadata(locale);

  return createLocalizedMetadata({
    locale,
    title: copy.title,
    description: copy.description,
    images: (await parent).openGraph?.images,
  });
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale} />;
}
