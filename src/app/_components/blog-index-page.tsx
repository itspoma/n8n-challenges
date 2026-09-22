import { BlogPagination } from "@/app/_components/blog-pagination";
import { BlogPostList } from "@/app/_components/blog-post-list";
import { FooterMeta } from "@/app/_components/footer-meta";
import { SiteHeader } from "@/app/_components/site-header";
import { blogLabels, emptyLabels, pageCount, posts, postsOnPage } from "@/lib/blog";
import type { Locale } from "@/lib/home-copy";

/** One page of a language's blog: the first at /blog, later ones at /blog/page/<n>. */
export function BlogIndexPage({ locale, page }: { locale: Locale; page: number }) {
  const items = posts().filter((post) => post.locale === locale);

  return (
    <main>
      <SiteHeader locale={locale} languagePath="/blog" />

      <section className="shell blog-content">
        <h1>{blogLabels[locale]}</h1>
        {items.length ? (
          <>
            <BlogPostList items={postsOnPage(items, page)} />
            <BlogPagination locale={locale} path={`/${locale}/blog`} page={page} pageCount={pageCount(items.length)} />
          </>
        ) : (
          <p>{emptyLabels[locale]}</p>
        )}
      </section>

      <footer className="shell">
        <FooterMeta locale={locale} />
      </footer>
    </main>
  );
}
