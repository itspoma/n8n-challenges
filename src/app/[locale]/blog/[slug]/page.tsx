import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  blogLabels,
  blogMetadata,
  dateLabel,
  exactTimeTitle,
  posts,
  publishedTime,
  relatedPosts,
  tagPath,
  type Post,
} from "@/lib/blog";
import { relevantChallenge } from "@/lib/blog-challenges";
import { currentCtas } from "@/lib/blog-ctas";
import { displayImage, imageSize, socialImage } from "@/lib/blog-images";
import {
  blogCitations,
  blogImages,
  blogLinks,
  inlineText,
  parseBlogMarkdown,
  sitePath,
  type BlogBlock,
} from "@/lib/blog-markdown";
import type { Locale } from "@/lib/home-copy";
import { maintainer } from "@/lib/people";
import {
  absoluteUrl,
  blogFeedAlternates,
  openGraphLocaleFields,
  SITE_AUTHOR,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-metadata";
import { SiteHeader } from "@/app/_components/site-header";
import { FooterMeta } from "@/app/_components/footer-meta";
import { BlogMarkdown } from "@/app/_components/blog-markdown";
import { BlogAuthor } from "@/app/_components/blog-author";
import { BlogNextSteps } from "@/app/_components/blog-next-steps";
import { BlogRelated } from "@/app/_components/blog-related";

export const dynamicParams = false;

const articleLabels = {
  en: {
    by: "By",
    published: "Published",
    updated: "Updated",
    checkedDocs: "Checked against the n8n documentation on",
    checkedSources: "Checked against the cited sources on",
  },
  es: {
    by: "Por",
    published: "Publicado el",
    updated: "Actualizado el",
    checkedDocs: "Comprobado con la documentación de n8n el",
    checkedSources: "Comprobado con las fuentes citadas el",
  },
  uk: {
    by: "Автор:",
    published: "Опубліковано",
    updated: "Оновлено",
    checkedDocs: "Перевірено за документацією n8n",
    checkedSources: "Перевірено за наведеними джерелами",
  },
} satisfies Record<Locale, Record<string, string>>;

// Every article is about n8n; other tools count when the title, tags or keywords name them.
const otherSoftware = [{ pattern: /\bzapier\b/i, name: "Zapier", url: "https://zapier.com" }];

function softwareApplication(name: string, url: string, sameAs?: string[]) {
  return {
    "@type": "SoftwareApplication",
    name,
    url,
    applicationCategory: "BusinessApplication",
    ...(sameAs ? { sameAs } : {}),
  };
}

function articleSubjects(post: Post) {
  const text = [post.title, ...post.tags, ...post.seo.keywords].join("\n");
  return [
    softwareApplication("n8n", "https://n8n.io", ["https://github.com/n8n-io/n8n"]),
    ...otherSoftware.filter(({ pattern }) => pattern.test(text)).map(({ name, url }) => softwareApplication(name, url)),
  ];
}

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
function articleJsonLd(post: Post, blocks: BlogBlock[]) {
  const url = articleUrl(post);
  const images = [socialImage(post.coverImage), { url: post.coverImage, ...imageSize(post.coverImage) }]
    .filter((image, index, all) => all.findIndex((other) => other.url === image.url) === index)
    .map(({ url: imageUrl, width, height }) => ({
      "@type": "ImageObject",
      url: absoluteUrl(imageUrl),
      width,
      height,
    }));
  // Illustrations in the text; the cover above stays the article's representative image.
  const figures = blogImages(blocks).map((image) => ({
    "@type": "ImageObject",
    contentUrl: absoluteUrl(image.src),
    ...imageSize(image.src),
    description: image.alt,
    ...(image.caption ? { caption: inlineText(image.caption) } : {}),
  }));
  const citations = blogCitations(blocks).map((href) => ({ "@type": "CreativeWork", url: href }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: post.sourcesCheckedAt
          ? { "@type": "WebPage", "@id": url, lastReviewed: post.sourcesCheckedAt }
          : url,
        url,
        headline: post.title,
        description: post.seo.description,
        image: images,
        ...(figures.length ? { associatedMedia: figures } : {}),
        datePublished: publishedTime(post),
        dateModified: modifiedTime(post),
        inLanguage: post.locale,
        keywords: post.seo.keywords.join(", "),
        about: articleSubjects(post),
        ...(citations.length ? { citation: citations } : {}),
        author: {
          "@type": "Person",
          "@id": absoluteUrl("/#author"),
          name: SITE_AUTHOR.name,
          url: SITE_AUTHOR.url,
          jobTitle: maintainer.jobTitle[post.locale],
          description: maintainer.bio[post.locale],
          image: {
            "@type": "ImageObject",
            url: absoluteUrl(maintainer.photo.src),
            width: maintainer.photo.width,
            height: maintainer.photo.height,
          },
          knowsAbout: maintainer.expertise[post.locale],
          sameAs: [...SITE_AUTHOR.sameAs, maintainer.experienceUrl],
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
      types: blogFeedAlternates(post.locale),
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
  const parsed = parseBlogMarkdown(post.body);
  const challenge = relevantChallenge(post, blogLinks(parsed));
  const blocks = currentCtas(parsed, post.locale, challenge);
  const linkedPaths = new Set(blogLinks(blocks).flatMap((href) => sitePath(href) ?? []));
  const published = dateLabel(publishedTime(post), post.locale);
  // The byline skips an update made on the publication day, which would repeat the same date.
  const updated = post.modifiedAt ? dateLabel(post.modifiedAt, post.locale) : undefined;
  const citations = blogCitations(blocks);
  const onlyN8nDocs = citations.every((href) => new URL(href).hostname === "docs.n8n.io");

  return (
    <main>
      <SiteHeader locale={post.locale} languagePaths={languagePaths} />

      <article className="shell blog-content">
        {/* Escape "<" so article text cannot close the JSON-LD script element. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd(post, blocks)).replace(/</g, "\\u003c"),
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
          <span>
            {labels.published}{" "}
            <time dateTime={publishedTime(post)} title={exactTimeTitle(publishedTime(post))}>
              {published}
            </time>
          </span>
          {post.modifiedAt && updated !== published ? (
            <>
              <span aria-hidden="true">·</span>
              <span>
                {labels.updated}{" "}
                <time dateTime={post.modifiedAt} title={exactTimeTitle(post.modifiedAt)}>
                  {updated}
                </time>
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
        {post.sourcesCheckedAt && citations.length ? (
          <p className="blog-checked">
            {onlyN8nDocs ? labels.checkedDocs : labels.checkedSources}{" "}
            <time dateTime={post.sourcesCheckedAt} title={exactTimeTitle(post.sourcesCheckedAt)}>
              {dateLabel(post.sourcesCheckedAt, post.locale)}
            </time>
            .
          </p>
        ) : null}
        <BlogMarkdown blocks={blocks} />
        <BlogNextSteps locale={post.locale} challenge={challenge} />
        <BlogRelated locale={post.locale} items={relatedPosts(post, linkedPaths)} />
        <BlogAuthor locale={post.locale} />
      </article>

      <footer className="shell">
        <FooterMeta locale={post.locale} />
      </footer>
    </main>
  );
}
