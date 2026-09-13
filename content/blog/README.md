# Blog publication timestamps

Add `publishedAt` to each article’s JSON front matter using an ISO 8601 timestamp with a timezone, for example `2026-09-13T09:53:57+02:00`. Keep `date` as the publication date (`YYYY-MM-DD`) for compatibility with existing publishers.

Listings and article pages show the timestamp as a date and 24-hour hours/minutes in Europe/Madrid. Articles without a timestamp show only their date; no time is invented. The publishing integration should supply `publishedAt` when it first publishes a translation and preserve it on later edits.

Existing articles were backfilled from their first Git commit timestamps. These record publication to the repository, not the exact time GitHub Pages finished deploying.
