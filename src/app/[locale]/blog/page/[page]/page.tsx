import { notFound } from "next/navigation";

import { BlogIndexPage } from "@/app/_components/blog-index-page";
import { blogMetadata, pageCount, pageNumber, paginationLabels, posts } from "@/lib/blog";
import { isLocale, locales } from "@/lib/home-copy";
import { listingPageMetadata, localizedPath } from "@/lib/site-metadata";

export const dynamicParams = false;

type Props = { params: Promise<{ locale: string; page: string }> };

const blogPageCount = (locale: string) => pageCount(posts().filter((post) => post.locale === locale).length);

// The first page lives at /blog, so this generates pages 2 and up. A static export rejects a route that
// generates nothing, which is what a blog of one page would do, so then it gets page 1 as a stand-in: a copy
// of /blog that names /blog as its canonical URL.
export function generateStaticParams() {
  const params = locales.flatMap((locale) =>
    Array.from({ length: blogPageCount(locale) - 1 }, (_, index) => ({ locale, page: String(index + 2) })),
  );
  return params.length ? params : [{ locale: locales[0], page: "1" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale, page: segment } = await params;
  const page = pageNumber(segment);
  if (!isLocale(locale) || !page) return {};

  return listingPageMetadata({
    locale,
    title: `${blogMetadata[locale].title} · ${paginationLabels[locale].page} ${page}`,
    path: localizedPath(locale, "/blog"),
    page,
    pageCount: blogPageCount(locale),
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale, page: segment } = await params;
  const page = pageNumber(segment);
  if (!isLocale(locale) || !page || page > blogPageCount(locale)) notFound();

  return <BlogIndexPage locale={locale} page={page} />;
}
