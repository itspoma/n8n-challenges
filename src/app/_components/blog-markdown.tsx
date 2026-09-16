/** Render the publisher's Markdown subset as React nodes; raw HTML is never executed. */
import type { ReactNode } from "react";

import { posts } from "@/lib/blog";
import { displayImage, imageSize } from "@/lib/blog-images";
import { absoluteUrl } from "@/lib/site-metadata";

// Links saved before an article got its readable URL still use the ID-based alias.
// Point them at the canonical URL so crawlers are not sent through the alias.
function readableArticleUrls() {
  return new Map(
    posts()
      .filter((post) => post.legacySlug !== post.slug)
      .map((post): [string, string] => [
        absoluteUrl(`/${post.locale}/blog/${post.legacySlug}`),
        absoluteUrl(`/${post.locale}/blog/${post.slug}`),
      ]),
  );
}

function renderInline(text: string, articleUrls: Map<string, string>): ReactNode[] {
  return text.split(/(\[[^\]]+\]\(<?[^)>]+>?\))/g).map((part, partIndex) => {
    const linkMatch = /^\[([^\]]+)\]\(<?([^)>]+)>?\)$/.exec(part);

    if (!linkMatch || !/^https:\/\//.test(linkMatch[2])) {
      return part;
    }

    return (
      <a key={partIndex} href={articleUrls.get(linkMatch[2]) ?? linkMatch[2]}>
        {linkMatch[1]}
      </a>
    );
  });
}

type BlogMarkdownProps = {
  body: string;
};

export function BlogMarkdown({ body }: BlogMarkdownProps) {
  const articleUrls = readableArticleUrls();
  // Front matter can leave a leading newline before the first heading.
  const blocks = body.replace(/\r\n?/g, "\n").trim().split(/\n\s*\n/).filter(Boolean);

  return blocks.map((source, blockIndex) => {
    const block = source.trim();
    // Only publisher-owned image paths are rendered as figures.
    const image = /^!\[([^\]]*)\]\((\/blog\/[a-zA-Z0-9_./-]+)\)$/.exec(block.trim());

    if (image && !image[2].includes("..")) {
      const size = imageSize(image[2]);

      // Lazy loading also stops React from preloading below-the-fold images in <head>.
      return (
        <figure key={blockIndex}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${displayImage(image[2])}`}
            alt={image[1]}
            width={size?.width}
            height={size?.height}
            loading="lazy"
            decoding="async"
          />
          <figcaption>{image[1]}</figcaption>
        </figure>
      );
    }

    if (block.startsWith("### ")) {
      return <h3 key={blockIndex}>{renderInline(block.slice(4), articleUrls)}</h3>;
    }

    if (block.startsWith("## ")) {
      return <h2 key={blockIndex}>{renderInline(block.slice(3), articleUrls)}</h2>;
    }

    if (block.split("\n").every((line) => line.startsWith("- "))) {
      return (
        <ul key={blockIndex}>
          {block.split("\n").map((line, lineIndex) => (
            <li key={lineIndex}>{renderInline(line.slice(2), articleUrls)}</li>
          ))}
        </ul>
      );
    }

    return <p key={blockIndex}>{renderInline(block, articleUrls)}</p>;
  });
}
