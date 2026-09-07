# Event content

This folder powers the static Events directory at `/en/events` and `/es/events`.

One merged Markdown file represents one public event. Event content is read and validated during `next build`, so the public directory does not need authentication, a database, email delivery, or webhooks.

Use [_template.md](_template.md) as the starting point and follow [CONTRIBUTING.md](../../CONTRIBUTING.md#add-an-event).

The filename must match the `slug`, the date must use `YYYY-MM-DD`, `countryCode` must contain two uppercase letters, and `eventUrl` must be a public HTTPS URL. The build fails when required metadata or the public description is missing.
