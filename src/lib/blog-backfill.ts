/**
 * Values for articles published before the publisher supplied them, keyed by article ID and
 * shared by all translations. Kept apart from the Markdown so republishing does not remove them.
 */
import backfill from "../../content/blog/article-backfill.json";

export const articleBackfill: Record<string, { challenge?: string; sourcesCheckedAt?: string } | undefined> =
  backfill;
