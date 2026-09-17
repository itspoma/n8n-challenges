/** Render parsed publisher Markdown as React nodes; raw HTML is never executed. */
import type { ReactNode } from "react";

import { posts } from "@/lib/blog";
import { displayImage, imageSize } from "@/lib/blog-images";
import { inlineText, inlineTokens, type BlogBlock, type InlineToken, type ListItem } from "@/lib/blog-markdown";
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

type Render = {
  inline: (source: string) => ReactNode[];
  href: (url: string) => string;
};

function renderTokens(tokens: InlineToken[], href: Render["href"]): ReactNode[] {
  return tokens.map((token, index) => {
    if (token.type === "text") return token.text;
    const children = renderTokens(token.children, href);
    return token.type === "strong" ? (
      <strong key={index}>{children}</strong>
    ) : (
      <a key={index} href={href(token.href)}>
        {children}
      </a>
    );
  });
}

function renderItems(items: ListItem[], render: Render): ReactNode[] {
  return items.map((item, index) => (
    <li key={index}>
      {item.checked === undefined ? (
        render.inline(item.text)
      ) : (
        // Readers can tick items off while they work; nothing is saved.
        <label>
          <input type="checkbox" defaultChecked={item.checked} /> <span>{render.inline(item.text)}</span>
        </label>
      )}
      {item.children.length ? <ul>{renderItems(item.children, render)}</ul> : null}
    </li>
  ));
}

function renderBlock(block: BlogBlock, key: number, render: Render): ReactNode {
  const { inline, href } = render;

  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 key={key} id={block.id}>
          {inline(block.text)}
        </h2>
      ) : (
        <h3 key={key} id={block.id}>
          {inline(block.text)}
        </h3>
      );
    case "image": {
      const size = imageSize(block.src);
      // Lazy loading also stops React from preloading below-the-fold images in <head>.
      return (
        <figure key={key}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${displayImage(block.src)}`}
            alt={block.alt}
            width={size?.width}
            height={size?.height}
            loading="lazy"
            decoding="async"
          />
          {block.caption ? <figcaption>{inline(block.caption)}</figcaption> : null}
        </figure>
      );
    }
    case "paragraph":
      return <p key={key}>{inline(block.text)}</p>;
    case "sources":
      return (
        <p key={key} className="blog-sources">
          {inline(block.text)}
        </p>
      );
    case "title":
      return (
        <p key={key} className="blog-block-title">
          <strong>{inline(block.text)}</strong>
        </p>
      );
    case "list":
      return block.style === "numbered" ? (
        <ol key={key} start={block.start}>
          {renderItems(block.items, render)}
        </ol>
      ) : (
        <ul key={key} className={block.style === "checklist" ? "blog-checklist" : undefined}>
          {renderItems(block.items, render)}
        </ul>
      );
    case "table":
      // Wide tables scroll inside a focusable region instead of widening the page.
      return (
        <div
          key={key}
          className="blog-table"
          tabIndex={0}
          {...(block.caption ? { role: "region", "aria-label": inlineText(block.caption) } : {})}
        >
          <table>
            {block.caption ? <caption>{inline(block.caption)}</caption> : null}
            <thead>
              <tr>
                {block.columns.map((cell, index) => (
                  <th key={index} scope="col">
                    {inline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, index) => (
                    <td key={index}>{inline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <aside key={key} className="blog-callout">
          {block.blocks.map((inner, index) => renderBlock(inner, index, render))}
        </aside>
      );
    case "contents":
      return (
        <nav key={key} className="blog-contents" aria-label={inlineText(block.title)}>
          <p className="blog-block-title">
            <strong>{inline(block.title)}</strong>
          </p>
          <ul>{renderItems(block.items, render)}</ul>
        </nav>
      );
    case "cta":
      return (
        <aside key={key} className="blog-cta">
          {block.title ? <p className="blog-cta-title">{inline(block.title)}</p> : null}
          {block.text ? <p>{inline(block.text)}</p> : null}
          <a className="button button-dark blog-cta-button" href={href(block.href)}>
            {inline(block.label)}
          </a>
        </aside>
      );
    case "related":
      return (
        <p key={key} className="blog-related-link">
          <strong>{inline(block.label)}:</strong> <a href={href(block.href)}>{inline(block.title)}</a>
        </p>
      );
  }
}

export function BlogMarkdown({ blocks }: { blocks: BlogBlock[] }) {
  const articleUrls = readableArticleUrls();
  const href = (url: string) => articleUrls.get(url) ?? url;
  const render: Render = {
    href,
    inline: (source) => renderTokens(inlineTokens(source), href),
  };

  return blocks.map((block, index) => renderBlock(block, index, render));
}
