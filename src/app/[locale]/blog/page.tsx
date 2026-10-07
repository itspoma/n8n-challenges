import { notFound } from "next/navigation";

import { BlogIndexPage } from "@/app/_components/blog-index-page";
import { blogMetadata, pageCount, posts } from "@/lib/blog";
import { locales, isLocale } from "@/lib/home-copy";
import {
  BLOG_SEARCH_LOCALE,
  createLocalizedMetadata,
  localizedPath,
  paginationLinks,
  translatedBlogRobots,
} from "@/lib/site-metadata";

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
    // Only the English blog is offered to search engines (BLOG_SEARCH_LOCALE): the other languages'
    // listings are noindex, and none names the others as hreflang alternates.
    ...createLocalizedMetadata({
      locale,
      suffix: "/blog",
      title: blogMetadata[locale].title,
      description: blogMetadata[locale].description,
      alternateLanguages: false,
    }),
    ...(locale === BLOG_SEARCH_LOCALE ? {} : { robots: translatedBlogRobots }),
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
