# Blog publication timestamps

Add `publishedAt` to each article’s JSON front matter using an ISO 8601 timestamp with a timezone, for example `2026-09-13T09:53:57+02:00`. Keep `date` as the publication date (`YYYY-MM-DD`) for compatibility with existing publishers.

Listings and article pages show the timestamp as a date and 24-hour hours/minutes in Europe/Madrid. Articles without a timestamp show only their date; no time is invented. The publishing integration should supply `publishedAt` when it first publishes a translation and preserve it on later edits.

Existing articles were backfilled from their first Git commit timestamps. These record publication to the repository, not the exact time GitHub Pages finished deploying.

## Readable article URLs

Set `urlSlug` in JSON front matter to a short, descriptive lowercase slug with hyphens, such as `tracing-a-missing-n8n-webhook-field`. Choose a localized slug for each translation (use Latin transliteration for Ukrainian). Preserve it when updating the article so published URLs stay stable.

Keep `slug`, the Markdown filename, and image paths unchanged for compatibility with the publisher. The public listing, sitemap, canonical URL, and language links use `urlSlug`; the original `slug` remains a working static alias with the same canonical URL. GitHub Pages does not provide server redirects here. If `urlSlug` is omitted, the original `slug` is used. Duplicate public routes fail the build.

## Preserve publication history across publisher updates

`publication-history.json` stores established public slugs and first-publication timestamps keyed by `locale/id`. Existing timestamps come from the original article's first Git commit, not its latest revision or deployment. This file is separate from generated Markdown so republishing does not remove them. A saved URL takes precedence over `urlSlug` in front matter; a saved timestamp is used when `publishedAt` is missing. Add new articles here if the publisher cannot yet provide these fields. Never invent a publication time from a date-only value.

Articles are sorted by publication timestamp, newest first. All dated articles with known timestamps display `YYYY-MM-DD · HH:mm` in Europe/Madrid, on both cards and article pages.

For newly published articles without `publishedAt` or a saved history entry, the site now derives the timestamp automatically from the Markdown file's first Git commit (following renames). Later edits do not change that time. Both GitHub Actions workflows fetch full history (`fetch-depth: 0`) for this fallback; a shallow checkout fails clearly rather than guessing. Uncommitted drafts still show date only. Builds outside a Git checkout must supply timestamps through front matter or the history file.

## Author and updated dates

Article pages name the author from `SITE_AUTHOR` in `src/lib/site-metadata.ts` in the byline, the `author` meta tags and JSON-LD. The updated date comes from the latest Git commit that changed the visible article (title, subtitle, cover or body) after its first commit. Front-matter-only edits, such as SEO keywords or `publishedAt` backfills, do not count. Articles without such a change show no updated date, and `dateModified` falls back to the publication time. Shallow checkouts omit updated dates rather than guessing.

## Image variants

`npm run dev` and `npm run build` first run `scripts/blog-images.mjs`. It writes Git-ignored variants next to each publisher PNG under `public/blog`: `<name>.webp` for pages and, for covers, `<name>.og.jpg` cropped to 1200×630 for social previews and JSON-LD. Commit only the PNG originals. Pages fall back to the PNG when a variant is missing.
