import Image from "next/image";
import Link from "next/link";

import { dateLabel, exactTimeTitle, publishedTime, type Post } from "@/lib/blog";
import { displayImage } from "@/lib/blog-images";
import type { Locale } from "@/lib/home-copy";

const relatedTitles = {
  en: "Related articles",
  es: "Artículos relacionados",
  uk: "Схожі статті",
} satisfies Record<Locale, string>;

/** Other articles on the same topics, shown before the author box. */
export function BlogRelated({ locale, items }: { locale: Locale; items: Post[] }) {
  if (!items.length) return null;

  return (
    <section className="blog-related" aria-labelledby="blog-related-title">
      <h2 id="blog-related-title">{relatedTitles[locale]}</h2>
      <ul>
        {items.map((post) => (
          <li key={post.id}>
            <Image
              className="blog-related-cover"
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${displayImage(post.coverImage)}`}
              alt=""
              width={1200}
              height={675}
              unoptimized
            />
            <div>
              <Link href={`/${post.locale}/blog/${post.slug}`}>{post.title}</Link>
              <time dateTime={publishedTime(post)} title={exactTimeTitle(publishedTime(post))}>
                {dateLabel(publishedTime(post), locale)}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
