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

## Pull-request checklist

- The content is public and contains no personal or secret information.
- English, Spanish, and Ukrainian challenge sections remain aligned.
- Challenge metadata uses a unique number and slug.
- Each challenge lists its required n8n nodes and preparation steps in all three languages.
- Challenge content never includes API keys, access tokens, or other credentials.
- Each challenge still contains exactly five tips per language.
- Links use HTTPS.
- `npm run lint`, `npm run typecheck`, and `npm run build` pass.
