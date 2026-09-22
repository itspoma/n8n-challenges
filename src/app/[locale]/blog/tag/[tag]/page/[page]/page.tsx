import { notFound } from "next/navigation";
import { BlogTagPage } from "@/app/_components/blog-tag-page";
import { blogTags, findBlogTag, pageCount, pageNumber, paginationLabels, posts, tagPath, tagPosts, tagSlug } from "@/lib/blog";
import { isLocale } from "@/lib/home-copy";
import { listingPageMetadata } from "@/lib/site-metadata";

export const dynamicParams = false;
type Props = { params: Promise<{ locale: string; tag: string; page: string }> };
// The first page lives at the tag's own URL, so this generates pages 2 and up. When no tag has a second page,
// page 1 of the first tag stands in, as the blog's page route explains.
export function generateStaticParams() {
  const all = posts();
  const tags = blogTags();
  const params = tags.flatMap(({ locale, tag }) =>
    Array.from({ length: pageCount(tagPosts(locale, tag, all).length) - 1 }, (_, index) => ({
      locale,
      tag: tagSlug(tag),
      page: String(index + 2),
    })),
  );
  return params.length ? params : tags.slice(0, 1).map(({ locale, tag }) => ({ locale, tag: tagSlug(tag), page: "1" }));
}
export async function generateMetadata({ params }: Props) {
  const { locale, tag, page: segment } = await params;
  const entry = findBlogTag(locale, tag);
  const page = pageNumber(segment);
  if (!entry || !page) return {};
  return listingPageMetadata({
    locale: entry.locale,
    title: `${entry.label} · Blog · ${paginationLabels[entry.locale].page} ${page}`,
    path: tagPath(entry.locale, entry.tag),
    page,
    pageCount: pageCount(tagPosts(entry.locale, entry.tag).length),
  });
}
export default async function TagPagesPage({ params }: Props) {
  const { locale, tag, page: segment } = await params;
  if (!isLocale(locale)) notFound();
  const entry = findBlogTag(locale, tag);
  const page = pageNumber(segment);
  if (!entry || !page || page > pageCount(tagPosts(locale, entry.tag).length)) notFound();
  return <BlogTagPage locale={locale} entry={entry} page={page} />;
}
