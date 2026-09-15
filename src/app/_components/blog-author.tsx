import type { Locale } from "@/lib/home-copy";
import { creditCopy, maintainer } from "@/lib/people";

// Shown after every article; matches the article byline and structured-data author.
export function BlogAuthor({ locale }: { locale: Locale }) {
  const labels = creditCopy[locale];

  return (
    <aside className="blog-author" aria-label={labels.aboutAuthor}>
      <p className="section-kicker">{labels.aboutAuthor}</p>
      <p className="blog-author-name">{maintainer.name}</p>
      <p className="blog-author-bio">{maintainer.bio[locale]}</p>
      <a
        className="blog-author-link"
        href={maintainer.linkedInUrl}
        target="_blank"
        rel="author noopener noreferrer"
      >
        LinkedIn <span aria-hidden="true">↗</span>
      </a>
    </aside>
  );
}
