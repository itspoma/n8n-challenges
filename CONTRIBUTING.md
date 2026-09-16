# Contributing content

The website is designed so community organizers and n8n Ambassadors can improve its content through ordinary GitHub pull requests. You do not need access to a CMS or deployment account.

## Edit a challenge

1. Open [`content/challenges`](content/challenges) on GitHub.
2. Choose the numbered Markdown file for the challenge you want to improve.
3. Select the pencil icon (**Edit this file**).
4. Update the English, Spanish, and Ukrainian sections together. Keep the documented headings unchanged.
5. Keep exactly five tips per language, ordered from broad guidance to the nearest solution.
6. Select **Propose changes** and open a pull request.
7. Explain what changed and why in the pull-request description.
8. Wait for the automated checks and maintainer review. The public site updates after the pull request is merged.

The full challenge format is documented in [`content/challenges/README.md`](content/challenges/README.md).

## Add an event

The public Events directory is generated from the Markdown files in `content/events`.

1. Sign in to GitHub and fork this repository.
2. Copy [`content/events/_template.md`](content/events/_template.md).
3. Rename it to a stable lowercase filename such as `valencia-automation-day-2026.md`.
4. Complete every metadata field and replace the sample description.
5. Do not add email addresses, participant data, credentials, access tokens, or private event links.
6. Commit the file to a branch in your fork.
7. Open a pull request against this repository.
8. Explain who is organizing the event and link to its public registration or information page.
9. Wait for maintainer review. A submitted pull request does not publish an event; it appears in the Events directory after merge and deployment.

## Credit your work

The Events directory credits each event's organizers. Challenges can credit the people who create them too: in a challenge's metadata block, add `author: Your Name` and, optionally, `authorUrl: https://...` with a public HTTPS profile link. The name appears on the challenge page.

Only add names and links you are happy to publish, and never add an email address.

## Search engine notifications

Deployments triggered by a push to `main` notify IndexNow about changed pages only. Before deploying, the workflow compares the new `out/sitemap.xml` with the live sitemap and lists the URLs that are new, removed, or have a different `<lastmod>`. After the deployment succeeds, a separate job submits that list. Scheduled and manual deployments send nothing.

Each page's `<lastmod>` comes from the Git history of the files that hold its content: the article file for articles, the challenge Markdown for challenge pages, the newest article for blog listings and tag pages, and the files listed in `src/app/sitemap.ts` for the other pages. Rebuilding without content changes therefore keeps every date. When you add a page, list its content files there. A page that had no `<lastmod>` in the live sitemap is not resubmitted when it first gets one.

The public `public/indexnow-key.txt` file verifies ownership; no API secret is required. The script checks that the deployed key matches before submitting. HTTP 202 means key validation is pending, not that pages are indexed. A failed notification does not fail the workflow run, so the deployment still counts as successful. The job log lists the URLs; resubmit them with `npm run indexnow -- submit <url> ...`.

Run `npm run build` followed by `npm run indexnow -- changes` to print the URLs a deployment would submit, without sending anything. IndexNow notifies participating search engines and does not guarantee crawling or indexing.

## Blog feeds

Each language has an RSS 2.0 feed of its 50 newest articles at `/en/blog/feed.xml`, `/es/blog/feed.xml` and `/uk/blog/feed.xml`. Feed readers discover it from any page, and the footer links to it. Items carry the title, summary, tags and cover image, and link to the article for the full text.

## Pull-request checklist

- The content is public and contains no personal or secret information.
- English, Spanish, and Ukrainian challenge sections remain aligned.
- Challenge metadata uses a unique number and slug.
- Each challenge lists its required n8n nodes and preparation steps in all three languages.
- Challenge content never includes API keys, access tokens, or other credentials.
- A challenge solution contains both core and bonus workflow JSON, or neither.
- Each challenge still contains exactly five tips per language.
- Links use HTTPS.
- Credits contain only public names and HTTPS profile links, never email addresses.
- `npm run lint`, `npm run typecheck`, `npm run solutions:check`, and `npm run build` pass.
