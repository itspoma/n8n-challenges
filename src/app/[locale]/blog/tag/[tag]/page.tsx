import { notFound } from "next/navigation";
import { BlogTagPage } from "@/app/_components/blog-tag-page";
import { blogTags, findBlogTag, pageCount, tagPath, tagPosts, tagSlug } from "@/lib/blog";
import { isLocale } from "@/lib/home-copy";
import { listingPageMetadata } from "@/lib/site-metadata";

export const dynamicParams = false;
type Props = { params: Promise<{ locale: string; tag: string }> };
export function generateStaticParams() {
  return blogTags().map(({ locale, tag }) => ({ locale, tag: tagSlug(tag) }));
}
export async function generateMetadata({ params }: Props) {
  const { locale, tag } = await params;
  const entry = findBlogTag(locale, tag);
  if (!entry) return {};
  return listingPageMetadata({
    locale: entry.locale,
    title: `${entry.label} · Blog`,
    path: tagPath(entry.locale, entry.tag),
    page: 1,
    pageCount: pageCount(tagPosts(entry.locale, entry.tag).length),
  });
}
export default async function TagPage({ params }: Props) {
  const { locale, tag } = await params;
  if (!isLocale(locale)) notFound();
  const entry = findBlogTag(locale, tag);
  if (!entry) notFound();
  return <BlogTagPage locale={locale} entry={entry} page={1} />;
}
