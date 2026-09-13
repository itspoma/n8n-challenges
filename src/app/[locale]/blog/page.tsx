import { BlogPostList } from "@/app/_components/blog-post-list";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/app/_components/site-header";
import { FooterMeta } from "@/app/_components/footer-meta";
import { posts, blogLabels, blogMetadata, emptyLabels } from "@/lib/blog";
import { locales, isLocale } from "@/lib/home-copy";
import { createLocalizedMetadata } from "@/lib/site-metadata";

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

  return createLocalizedMetadata({
    locale,
    suffix: "/blog",
    title: blogMetadata[locale].title,
    description: blogMetadata[locale].description,
  });
}

export default async function Blog({ params }: BlogPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const items = posts().filter((post) => post.locale === locale);

  return (
    <main>
      <SiteHeader locale={locale} languagePath="/blog" />

      <section className="shell blog-content">
        <h1>{blogLabels[locale]}</h1>
        {items.length ? (
          <BlogPostList items={items} />
        ) : (
          <p>{emptyLabels[locale]}</p>
        )}
      </section>

      <footer className="shell">
        <FooterMeta />
      </footer>
    </main>
  );
}
