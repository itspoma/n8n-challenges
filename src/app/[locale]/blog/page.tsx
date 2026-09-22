import { notFound } from "next/navigation";

import { BlogIndexPage } from "@/app/_components/blog-index-page";
import { blogMetadata, pageCount, posts } from "@/lib/blog";
import { locales, isLocale } from "@/lib/home-copy";
import { createLocalizedMetadata, localizedPath, paginationLinks } from "@/lib/site-metadata";

type BlogPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return {
    ...createLocalizedMetadata({
      locale,
      suffix: "/blog",
      title: blogMetadata[locale].title,
      description: blogMetadata[locale].description,
    }),
    pagination: paginationLinks(
      localizedPath(locale, "/blog"),
      1,
      pageCount(posts().filter((post) => post.locale === locale).length),
    ),
  };
}

export default async function Blog({ params }: BlogPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <BlogIndexPage locale={locale} page={1} />;
}
