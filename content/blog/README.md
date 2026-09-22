# Blog publication timestamps

Add `publishedAt` to each article’s JSON front matter using an ISO 8601 timestamp with a timezone, for example `2026-09-13T09:53:57+02:00`. Keep `date` as the publication date (`YYYY-MM-DD`) for compatibility with existing publishers.

Listings and article pages show the publication date in the reader's language and the Europe/Madrid time zone, for example `16 Sep 2026`, `16 sept 2026` or `16 вер. 2026 р.`. The article byline labels it: "Published 16 Sep 2026 · Updated 17 Sep 2026". Hovering a date shows the exact time (`2026-09-16 · 17:27 Europe/Madrid`), and the `datetime` attribute keeps the full timestamp. Articles without a timestamp show only their date; no time is invented. The publishing integration should supply `publishedAt` when it first publishes a translation and preserve it on later edits.

Existing articles were backfilled from their first Git commit timestamps. These record publication to the repository, not the exact time GitHub Pages finished deploying.

## When the sources were checked

The publisher adds `sourcesCheckedAt` to the front matter: the earliest time it retrieved one of the article's cited sources, as an ISO 8601 timestamp. The article shows it above the text, for example "Checked against the n8n documentation on 16 Sep 2026" when every cited source is on docs.n8n.io and "Checked against the cited sources on…" otherwise. The date is also the `lastReviewed` date of the page in the JSON-LD and appears in `llms.txt`. Articles published before the publisher supplied the field take it from `article-backfill.json`, which was filled from the publisher's saved research. An article without the date or without cited sources shows no note.

## Readable article URLs

Set `urlSlug` in JSON front matter to a short, descriptive lowercase slug with hyphens, such as `tracing-a-missing-n8n-webhook-field`. Choose a localized slug for each translation (use Latin transliteration for Ukrainian). Preserve it when updating the article so published URLs stay stable.

Keep `slug`, the Markdown filename, and image paths unchanged for compatibility with the publisher. The public listing, sitemap, canonical URL, and language links use `urlSlug`; the original `slug` remains a working static alias with the same canonical URL. GitHub Pages does not provide server redirects here. If `urlSlug` is omitted, the original `slug` is used. Duplicate public routes fail the build.

Article text may still link to an alias saved before the article got its readable URL. The site renders those links with the readable URL, so the Markdown does not need editing.

## Tag pages

Tag URLs are generated from the tag text: accents are removed and Ukrainian is transliterated the same way the publisher transliterates article URLs, followed by a short hash that keeps different tags apart, for example `/es/blog/tag/preparacion-para-produccion-bd48f2d7`. Tag pages only repeat article cards, so they are marked `noindex, follow` and left out of the sitemap.

## Pagination

The blog and each tag page list 12 articles per page, newest first (`POSTS_PER_PAGE` in `src/lib/blog.ts`). The first page keeps the plain listing URL, `/en/blog` or `/en/blog/tag/<slug>`, so a listing has one first-page address. Later pages live at `/en/blog/page/2` and `/en/blog/tag/<slug>/page/2`; a page that does not exist is a 404. A listing that fits on one page shows no page links.

Pages after the first only repeat article cards, so like tag pages they are marked `noindex, follow` and left out of the sitemap. Publishing an article moves every older one down a place, so listing them would give every page a new `<lastmod>` and an IndexNow submission with each publication. Each page keeps its own canonical URL and links to its neighbours with `rel="prev"` and `rel="next"`. The language switcher opens the first page of the other language, because the languages can have different numbers of pages.

## Preserve publication history across publisher updates

`publication-history.json` stores established public slugs and first-publication timestamps keyed by `locale/id`. Existing timestamps come from the original article's first Git commit, not its latest revision or deployment. This file is separate from generated Markdown so republishing does not remove them. A saved URL takes precedence over `urlSlug` in front matter; a saved timestamp is used when `publishedAt` is missing. Add new articles here if the publisher cannot yet provide these fields. Never invent a publication time from a date-only value.

Articles are sorted by publication timestamp, newest first.

For newly published articles without `publishedAt` or a saved history entry, the site now derives the timestamp automatically from the Markdown file's first Git commit (following renames). Later edits do not change that time. Both GitHub Actions workflows fetch full history (`fetch-depth: 0`) for this fallback; a shallow checkout fails clearly rather than guessing. Uncommitted drafts still show date only. Builds outside a Git checkout must supply timestamps through front matter or the history file.

## Author and updated dates

Article pages name the author from `SITE_AUTHOR` in `src/lib/site-metadata.ts` in the byline, the `author` meta tags and JSON-LD. The author box after the article and the JSON-LD `Person` share the job title, bio, photo and areas of expertise from `maintainer` in `src/lib/people.ts`. The photo, `public/people/roman-rodomansky.jpg`, is a square crop of `public/speaker/roman-1.jpg`; it lives outside `public/speaker` because every image there joins the photo mosaic on the For companies page.

The updated date comes from the latest Git commit that changed the visible article (title, subtitle, cover or body) after its first commit. Front-matter-only edits, such as SEO keywords or `publishedAt` backfills, do not count. Articles without such a change show no updated date, and `dateModified` falls back to the publication time. The byline also leaves out an update made on the publication day, since it would repeat the same date. Shallow checkouts omit updated dates rather than guessing.

`llms.txt` lists each article with its publication date and, when they exist, its updated date and the date its sources were checked, so AI assistants can tell how current it is.

## Article Markdown

`src/lib/blog-markdown.ts` parses the publisher's Markdown into blocks, and `src/app/_components/blog-markdown.tsx` renders them. Raw HTML is never rendered, and links only work when they use HTTPS or point at a heading on the same page. The parser understands:

- `##` and `###` headings. A preceding `<a id="cf-section-1"></a>` line becomes the heading's `id`, so a contents list can link to it.
- An image directly under a heading. The paragraph right after it is the image's caption, and the alt text stays alt text. This matches how the publisher places illustrations and their "Conceptual…" or "Illustrative…" captions.
- Bulleted, numbered and checklist (`- [ ]`) lists. Readers can tick checklist items; nothing is saved.
- Tables, with a bold line directly above as their caption. Wide tables scroll sideways inside their box.
- Blockquotes, which the publisher uses for key takeaways, and a bold title followed by a list of same-page links, which becomes a table of contents.
- A paragraph holding only a link, optionally bold, is a call to action: it renders as a button in a box together with the paragraph before it and, for lead magnets, the bold title before that.
- `**Related reading:** [Title](https://…)` renders as a highlighted link.
- `Sources:` lines stay visible and are listed as `citation` in the article's JSON-LD. Body images and their captions are listed as `associatedMedia`.
- The publisher's final `Tags: …` line is dropped, because the tags already appear under the title.

Anything else is shown as plain text. These rules run when the page is built, so published Markdown never needs editing, and editing it would count as a content update.

Calls to action in articles published before the current publisher settings are updated the same way (`src/lib/blog-ctas.ts`). One that sends readers to the author's LinkedIn profile becomes an invitation to the For companies page, with standard wording, because its own text mentions LinkedIn. One that links to the language home page points at the article's challenge instead (see below).

## After the article

Every article ends with a closing card, related articles and the author box.

The closing card offers a hands-on challenge and the For companies page. The challenge is the first `/challenges/<slug>` page the article text links to; the publisher's mid-article practice invitation links there. Otherwise it is the `challenge` saved for the article ID in `article-backfill.json`, which covers articles published before the publisher linked challenges. If neither exists, the card points at the challenge catalog. An unknown challenge slug in that file fails the build.

`article-backfill.json` holds values for articles published before the publisher supplied them, keyed by article ID and shared by all translations: `challenge` and `sourcesCheckedAt`. It is separate from the Markdown, so republishing an article keeps them.

Related articles are up to three other articles in the same language that share tags with the article. Tags that fewer articles carry count for more, so the `n8n` tag almost every article has adds almost nothing. Articles the text already links to come last.

## Image variants

`npm run dev` and `npm run build` first run `scripts/blog-images.mjs`. It writes Git-ignored variants next to each publisher PNG under `public/blog`: `<name>.webp` for pages and, for covers, `<name>.og.jpg` cropped to 1200×630 for social previews and JSON-LD. Commit only the PNG originals. Pages fall back to the PNG when a variant is missing.
