import Image from "next/image";
import Link from "next/link";
import { tagPath, publicationLabel, type Post } from "@/lib/blog";

export function BlogPostList({ items }: { items: Post[] }) {
  return <div className="blog-grid">
          {items.map((post) => (
            <article key={post.id} className="blog-card">
              <Link
                href={`/${post.locale}/blog/${post.slug}`}
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
                <Link href={`/${post.locale}/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <time dateTime={post.publishedAt ?? post.date} title="Europe/Madrid">{publicationLabel(post)}</time>
              <p>{post.subtitle}</p>
              <ul className="blog-tags">
                {post.tags.map((tag) => (
                  <li key={tag}><Link href={tagPath(post.locale, tag)}>{tag}</Link></li>
                ))}
              </ul>
            </article>
          ))}
  </div>;
}
