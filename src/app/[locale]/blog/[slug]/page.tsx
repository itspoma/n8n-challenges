import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { posts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site-metadata";
import { SiteHeader } from "@/app/_components/site-header";
import { FooterMeta } from "@/app/_components/footer-meta";
import { BlogMarkdown } from "@/app/_components/blog-markdown";

export const dynamicParams = false;

export function generateStaticParams() {
  const allPosts = posts();

  // Keep a placeholder route when no articles have been published yet.
  return allPosts.length
    ? allPosts.map(({ locale, slug }) => ({ locale, slug }))
    : [{ locale: "en", slug: "empty-blog" }];
}

type BlogArticlePageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = posts().find(
    (post) => post.locale === locale && post.slug === slug,
  );

  if (!post) {
    return {};
  }

  return {
    title: { absolute: post.seo.title },
    description: post.seo.description,
    keywords: post.seo.keywords,
    openGraph: {
      type: "article",
      title: post.seo.title,
      description: post.seo.description,
      url: absoluteUrl(`/${locale}/blog/${slug}`),
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: absoluteUrl(post.coverImage), alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images: [absoluteUrl(post.coverImage)],
    },
    alternates: { canonical: absoluteUrl(`/${locale}/blog/${slug}`) },
    other: { "content-factory-revision": post.revision },
  };
}

export default async function Article({ params }: BlogArticlePageProps) {
  const { locale, slug } = await params;
  const post = posts().find(
    (post) => post.locale === locale && post.slug === slug,
  );

  if (!post) {
    notFound();
  }

  return (
    <main>
      <SiteHeader locale={post.locale} languagePath="/blog" />

      <article className="shell blog-content">
        <Link className="blog-back" href={`/${post.locale}/blog`}>
          ←{" "}
          {post.locale === "es"
            ? "Volver al blog"
            : post.locale === "uk"
              ? "Назад до блогу"
              : "Back to blog"}
        </Link>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{post.date}</time>
        <p className="blog-subtitle">{post.subtitle}</p>
        <ul className="blog-tags">
          {post.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <Image
          className="blog-cover"
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${post.coverImage}`}
          alt={post.coverAlt}
          width={1200}
          height={675}
          unoptimized
          priority
        />
        <BlogMarkdown body={post.body} />
      </article>

      <footer className="shell">
        <FooterMeta />
      </footer>
    </main>
  );
}
