import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  blogLabels,
  blogMetadata,
  posts,
  publicationLabel,
  tagPath,
  timestampLabel,
  type Post,
} from "@/lib/blog";
import { displayImage, imageSize, socialImage } from "@/lib/blog-images";
import type { Locale } from "@/lib/home-copy";
import {
  absoluteUrl,
  openGraphLocaleFields,
  SITE_AUTHOR,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-metadata";
import { SiteHeader } from "@/app/_components/site-header";
import { FooterMeta } from "@/app/_components/footer-meta";
import { BlogMarkdown } from "@/app/_components/blog-markdown";
import { BlogAuthor } from "@/app/_components/blog-author";

export const dynamicParams = false;

const articleLabels = {
  en: { by: "By", updated: "Updated" },
  es: { by: "Por", updated: "Actualizado" },
  uk: { by: "Автор:", updated: "Оновлено" },
} satisfies Record<Locale, { by: string; updated: string }>;

export function generateStaticParams() {
  const allPosts = posts();

  // Keep a placeholder route when no articles have been published yet.
  return allPosts.length
    ? allPosts.flatMap(({ locale, slug, legacySlug }) =>
        [...new Set([slug, legacySlug])].map((slug) => ({ locale, slug })))
    : [{ locale: "en", slug: "empty-blog" }];
}

type BlogArticlePageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function articleUrl(post: Post) {
  return absoluteUrl(`/${post.locale}/blog/${post.slug}`);
}

// The shared article ID connects translations even when their slugs differ.
function translationsOf(post: Post) {
  return posts().filter((translation) => translation.id === post.id);
}

function modifiedTime(post: Post) {
  return post.modifiedAt ?? post.publishedAt ?? post.date;
}

/** Schema.org article and breadcrumb data for search engines and AI assistants. */
function articleJsonLd(post: Post) {
  const url = articleUrl(post);
  const images = [socialImage(post.coverImage), { url: post.coverImage, ...imageSize(post.coverImage) }]
    .filter((image, index, all) => all.findIndex((other) => other.url === image.url) === index)
    .map(({ url: imageUrl, width, height }) => ({
      "@type": "ImageObject",
      url: absoluteUrl(imageUrl),
      width,
      height,
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: url,
        url,
        headline: post.title,
        description: post.seo.description,
        image: images,
        datePublished: post.publishedAt ?? post.date,
        dateModified: modifiedTime(post),
        inLanguage: post.locale,
        keywords: post.seo.keywords.join(", "),
        author: {
          "@type": "Person",
          name: SITE_AUTHOR.name,
          url: SITE_AUTHOR.url,
          sameAs: SITE_AUTHOR.sameAs,
        },
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL.href },
        isPartOf: {
          "@type": "Blog",
          name: blogMetadata[post.locale].title,
          url: absoluteUrl(`/${post.locale}/blog`),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl(`/${post.locale}`) },
          { "@type": "ListItem", position: 2, name: blogLabels[post.locale], item: absoluteUrl(`/${post.locale}/blog`) },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = posts().find(
    (post) => post.locale === locale && (post.slug === slug || post.legacySlug === slug),
  );

  if (!post) {
    return {};
  }

  const url = articleUrl(post);
  const translations = translationsOf(post);
  const english = translations.find((translation) => translation.locale === "en");
  const preview = socialImage(post.coverImage);
  const images = [{ ...preview, url: absoluteUrl(preview.url), alt: post.coverAlt }];

  return {
    title: { absolute: post.seo.title },
    description: post.seo.description,
    keywords: post.seo.keywords,
    authors: [{ name: SITE_AUTHOR.name, url: SITE_AUTHOR.url }],
    openGraph: {
      type: "article",
      ...openGraphLocaleFields(
        post.locale,
        translations.map((translation) => translation.locale),
      ),
      title: post.seo.title,
      description: post.seo.description,
      url,
      publishedTime: post.publishedAt ?? post.date,
      modifiedTime: modifiedTime(post),
      authors: [SITE_AUTHOR.url],
      tags: post.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images,
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          translations.map((translation) => [translation.locale, articleUrl(translation)]),
        ),
        // Readers whose language has no version get the English original.
        ...(english ? { "x-default": articleUrl(english) } : {}),
      },
    },
    other: { "content-revision": post.revision },
  };
}

export default async function Article({ params }: BlogArticlePageProps) {
  const { locale, slug } = await params;
  const post = posts().find(
    (post) => post.locale === locale && (post.slug === slug || post.legacySlug === slug),
  );

  if (!post) {
    notFound();
  }

  // Only offer languages that have a published Markdown version of this article.
  const languagePaths = Object.fromEntries(
    translationsOf(post).map((translation) => [translation.locale, `/blog/${translation.slug}`]),
  );
  const labels = articleLabels[post.locale];

  return (
    <main>
      <SiteHeader locale={post.locale} languagePaths={languagePaths} />

      <article className="shell blog-content">
        {/* Escape "<" so article text cannot close the JSON-LD script element. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd(post)).replace(/</g, "\\u003c"),
          }}
        />
        <Link className="blog-back" href={`/${post.locale}/blog`}>
          ←{" "}
          {post.locale === "es"
            ? "Volver al blog"
            : post.locale === "uk"
              ? "Назад до блогу"
              : "Back to blog"}
        </Link>
        <h1>{post.title}</h1>
        <p className="blog-byline">
          <span>
            {labels.by}{" "}
            <a href={SITE_AUTHOR.url} rel="author">
              {SITE_AUTHOR.name}
            </a>
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.publishedAt ?? post.date} title="Europe/Madrid">{publicationLabel(post)}</time>
          {post.modifiedAt ? (
            <>
              <span aria-hidden="true">·</span>
              <span>
                {labels.updated}{" "}
                <time dateTime={post.modifiedAt} title="Europe/Madrid">{timestampLabel(post.modifiedAt)}</time>
              </span>
            </>
          ) : null}
        </p>
        <p className="blog-subtitle">{post.subtitle}</p>
        <ul className="blog-tags">
          {post.tags.map((tag) => (
            <li key={tag}><Link href={tagPath(post.locale, tag)}>{tag}</Link></li>
          ))}
        </ul>
        <Image
          className="blog-cover"
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${displayImage(post.coverImage)}`}
          alt={post.coverAlt}
          width={1200}
          height={675}
          unoptimized
          preload
        />
        <BlogMarkdown body={post.body} />
        <BlogAuthor locale={post.locale} />
      </article>

      <footer className="shell">
        <FooterMeta locale={post.locale} />
      </footer>
    </main>
  );
}
