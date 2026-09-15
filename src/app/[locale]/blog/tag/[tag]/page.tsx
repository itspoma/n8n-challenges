import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/app/_components/site-header";
import { FooterMeta } from "@/app/_components/footer-meta";
import { BlogPostList } from "@/app/_components/blog-post-list";
import { blogTags, normalizeTag, posts, tagPath, tagSlug } from "@/lib/blog";
import { isLocale } from "@/lib/home-copy";
import { absoluteUrl, projectPreviewImage } from "@/lib/site-metadata";

export const dynamicParams = false;
type Props = { params: Promise<{ locale: string; tag: string }> };
export function generateStaticParams() {
  return blogTags().map(({ locale, tag }) => ({ locale, tag: tagSlug(tag) }));
}
export async function generateMetadata({ params }: Props) {
  const { locale, tag } = await params;
  const entry = blogTags().find((item) => item.locale === locale && tagSlug(item.tag) === tag);
  if (!entry) return {};
  const title = `${entry.label} · Blog`;
  const url = absoluteUrl(tagPath(entry.locale, entry.tag));
  const images = [projectPreviewImage(entry.locale)];
  return {
    title,
    alternates: { canonical: url },
    openGraph: { type: "website", title, url, images },
    twitter: { card: "summary_large_image", title, images },
  };
}
export default async function TagPage({ params }: Props) {
  const { locale, tag } = await params;
  if (!isLocale(locale)) notFound();
  const entry = blogTags().find((item) => item.locale === locale && tagSlug(item.tag) === tag);
  if (!entry) notFound();
  const items = posts().filter((post) => post.locale === locale && post.tags.some((value) => normalizeTag(value) === entry.tag));
  const labels = { en: ["All articles", "Articles tagged"], es: ["Todos los artículos", "Artículos con la etiqueta"], uk: ["Усі статті", "Статті з тегом"] }[locale];
  return <main>
    <SiteHeader locale={locale} languagePath="/blog" />
    <section className="shell blog-content">
      <Link className="blog-back" href={`/${locale}/blog`}>← {labels[0]}</Link>
      <p className="section-kicker">{labels[1]}</p>
      <h1>{entry.label}</h1>
      <BlogPostList items={items} />
    </section>
    <footer className="shell"><FooterMeta locale={locale} /></footer>
  </main>;
}
