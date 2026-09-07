import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomePage } from "@/app/_components/home-page";
import { homeCopy, isLocale, locales } from "@/lib/home-copy";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (!isLocale(locale)) {
    return {};
  }

  return {
    title: locale === "en" ? "Welcome" : "Bienvenidos",
    description: homeCopy[locale].intro,
    alternates: {
      languages: {
        en: `${basePath}/en`,
        es: `${basePath}/es`,
      },
    },
  };
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale} />;
}
