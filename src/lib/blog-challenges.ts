/** Chooses the challenge an article's closing card recommends. */
import type { Post } from "./blog";
import { articleBackfill } from "./blog-backfill";
import { sitePath } from "./blog-markdown";
import { challenges } from "./challenges";

for (const [id, entry] of Object.entries(articleBackfill)) {
  const challenge = entry?.challenge;
  if (challenge !== undefined && !challenges.some(({ slug }) => slug === challenge)) {
    throw new Error(`Unknown challenge "${challenge}" for ${id} in content/blog/article-backfill.json`);
  }
}

/**
 * The first challenge the article text links to, otherwise the one saved for the article ID
 * in content/blog/article-backfill.json, otherwise none.
 */
export function relevantChallenge(post: Post, links: string[]) {
  const linked = links
    .map((href) => /^\/[a-z]{2}\/challenges\/([a-z0-9-]+)$/.exec(sitePath(href) ?? "")?.[1])
    .find((slug) => challenges.some((challenge) => challenge.slug === slug));
  const slug = linked ?? articleBackfill[post.id]?.challenge;
  return challenges.find((challenge) => challenge.slug === slug);
}
