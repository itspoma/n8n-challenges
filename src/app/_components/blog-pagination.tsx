import Link from "next/link";

import { pagePath, paginationLabels } from "@/lib/blog";
import type { Locale } from "@/lib/home-copy";

/** Pages to link: the first, the last, the current one and its neighbours. `null` stands for skipped pages. */
function pageNumbers(page: number, total: number) {
  const shown = [...new Set([1, page - 1, page, page + 1, total])]
    .filter((value) => value >= 1 && value <= total)
    .sort((first, second) => first - second);

  return shown.flatMap((value, index) => {
    const gap = index ? value - shown[index - 1] : 1;
    // A single skipped page takes less room as a link than as an ellipsis.
    return gap === 1 ? [value] : gap === 2 ? [value - 1, value] : [null, value];
  });
}

/** Links to the other pages of a listing whose first page is `path`. Renders nothing for a single page. */
export function BlogPagination({
  locale,
  path,
  page,
  pageCount,
}: {
  locale: Locale;
  path: string;
  page: number;
  pageCount: number;
}) {
  if (pageCount < 2) return null;
  const labels = paginationLabels[locale];
  // The link and the placeholder that stands in for it share their content, so both take the same width.
  const previous = <><span aria-hidden="true">←</span> {labels.previous}</>;
  const next = <>{labels.next} <span aria-hidden="true">→</span></>;

  return (
    <nav className="blog-pagination" aria-label={labels.nav}>
      {page > 1 ? (
        <Link className="blog-page-link" href={pagePath(path, page - 1)} rel="prev">{previous}</Link>
      ) : (
        <span className="blog-page-link blog-page-link-off" aria-hidden="true">{previous}</span>
      )}
      <ol className="blog-page-numbers">
        {pageNumbers(page, pageCount).map((value, index) =>
          value === null ? (
            <li key={`gap-${index}`} className="blog-page-gap" aria-hidden="true">…</li>
          ) : (
            <li key={value}>
              <Link
                className="blog-page-link"
                href={pagePath(path, value)}
                aria-label={`${labels.page} ${value}`}
                aria-current={value === page ? "page" : undefined}
              >
                {value}
              </Link>
            </li>
          ),
        )}
      </ol>
      {page < pageCount ? (
        <Link className="blog-page-link" href={pagePath(path, page + 1)} rel="next">{next}</Link>
      ) : (
        <span className="blog-page-link blog-page-link-off" aria-hidden="true">{next}</span>
      )}
    </nav>
  );
}
