/**
 * Blog articles taken out of search, listed in content/blog-cleanup.json by article id (the title
 * there is only a reminder for people). A hidden article keeps its page in every language for anyone
 * with the link, but the page says noindex, and the article leaves every list, tag page, feed, the
 * sitemap, llms.txt and the related-reading cards (listedPosts() in blog.ts leaves it out). GitHub
 * Pages cannot answer with a redirect, so this site only hides. Taking an entry out of the file
 * brings the article back at the next deploy.
 */
import cleanup from "../../content/blog-cleanup.json";

const POST_ID = /^opp_[A-Za-z0-9_-]+$/;

function readHiddenPostIds() {
  const entries: unknown = (cleanup as { hidden?: unknown }).hidden;
  if (!Array.isArray(entries)) {
    throw new Error("content/blog-cleanup.json needs a `hidden` list.");
  }
  const ids = new Set<string>();
  for (const entry of entries) {
    const id: unknown = (entry as { id?: unknown } | null)?.id;
    if (typeof id !== "string" || !POST_ID.test(id) || ids.has(id)) {
      throw new Error(`content/blog-cleanup.json has an invalid or repeated entry: ${JSON.stringify(entry)}`);
    }
    ids.add(id);
  }
  return ids;
}

/** Ids of the hidden articles. */
export const hiddenPostIds: ReadonlySet<string> = readHiddenPostIds();
