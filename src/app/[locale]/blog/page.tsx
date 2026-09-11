import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/app/_components/site-header";
import { FooterMeta } from "@/app/_components/footer-meta";
import { posts, blogLabels, emptyLabels } from "@/lib/blog";
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
    title: blogLabels[locale],
    description: emptyLabels[locale],
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
          items.map((post) => (
            <article key={post.id} className="blog-card">
              <Link
                href={`/${locale}/blog/${post.slug}`}
                aria-label={post.title}
              >
                <Image
                  className="blog-cover"
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${post.coverImage}`}
                  alt={post.coverAlt}
                  width={1200}
                  height={675}
                  unoptimized
                />
              </Link>
              <h2>
                <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <time dateTime={post.date}>{post.date}</time>
              <p>{post.subtitle}</p>
              <ul className="blog-tags">
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))
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
