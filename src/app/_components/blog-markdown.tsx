/** Render the publisher's Markdown subset as React nodes; raw HTML is never executed. */
import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\(<?[^)>]+>?\))/g).map((part, partIndex) => {
    const linkMatch = /^\[([^\]]+)\]\(<?([^)>]+)>?\)$/.exec(part);

    if (!linkMatch || !/^https:\/\//.test(linkMatch[2])) {
      return part;
    }

    return (
      <a key={partIndex} href={linkMatch[2]}>
        {linkMatch[1]}
      </a>
    );
  });
}

type BlogMarkdownProps = {
  body: string;
};

export function BlogMarkdown({ body }: BlogMarkdownProps) {
  return body.split(/\n\s*\n/).map((block, blockIndex) => {
    // Only publisher-owned image paths are rendered as figures.
    const image = /^!\[([^\]]*)\]\((\/blog\/[a-zA-Z0-9_./-]+)\)$/.exec(block.trim());

    if (image && !image[2].includes("..")) {
      return (
        <figure key={blockIndex}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${image[2]}`} alt={image[1]} />
          <figcaption>{image[1]}</figcaption>
        </figure>
      );
    }

    if (block.startsWith("### ")) {
      return <h3 key={blockIndex}>{renderInline(block.slice(4))}</h3>;
    }

    if (block.startsWith("## ")) {
      return <h2 key={blockIndex}>{renderInline(block.slice(3))}</h2>;
    }

    if (block.split("\n").every((line) => line.startsWith("- "))) {
      return (
        <ul key={blockIndex}>
          {block.split("\n").map((line, lineIndex) => (
            <li key={lineIndex}>{renderInline(line.slice(2))}</li>
          ))}
        </ul>
      );
    }

    return <p key={blockIndex}>{renderInline(block)}</p>;
  });
}
