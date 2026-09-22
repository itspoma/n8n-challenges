import Link from "next/link";

import { BlogPagination } from "@/app/_components/blog-pagination";
import { BlogPostList } from "@/app/_components/blog-post-list";
import { FooterMeta } from "@/app/_components/footer-meta";
import { SiteHeader } from "@/app/_components/site-header";
import { pageCount, postsOnPage, tagPath, tagPosts } from "@/lib/blog";
import type { Locale } from "@/lib/home-copy";

const labels = {
  en: { all: "All articles", tagged: "Articles tagged" },
  es: { all: "Todos los artículos", tagged: "Artículos con la etiqueta" },
  uk: { all: "Усі статті", tagged: "Статті з тегом" },
} satisfies Record<Locale, { all: string; tagged: string }>;

/** One page of the articles carrying a tag: the first at the tag's URL, later ones at <tag URL>/page/<n>. */
export function BlogTagPage({ locale, entry, page }: { locale: Locale; entry: { tag: string; label: string }; page: number }) {
  const items = tagPosts(locale, entry.tag);

  return (
    <main>
      <SiteHeader locale={locale} languagePath="/blog" />
      <section className="shell blog-content">
        <Link className="blog-back" href={`/${locale}/blog`}>← {labels[locale].all}</Link>
        <p className="section-kicker">{labels[locale].tagged}</p>
        <h1>{entry.label}</h1>
        <BlogPostList items={postsOnPage(items, page)} />
        <BlogPagination locale={locale} path={tagPath(locale, entry.tag)} page={page} pageCount={pageCount(items.length)} />
      </section>
      <footer className="shell"><FooterMeta locale={locale} /></footer>
    </main>
  );
}
