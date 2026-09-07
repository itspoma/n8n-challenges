# n8n Balloon Challenges

A bilingual static learning website with 10 practical n8n automation challenges and five progressive tips per challenge. Participants build in their own n8n environment, show their work to an in-person mentor, and collect the matching physical balloon.

## Current scope

- English and Spanish landing pages: `/en` and `/es`
- Static English and Spanish Events directories generated from Markdown
- Ten clickable challenge cards
- Twenty statically generated localized challenge pages
- Five tips revealed one at a time on every challenge
- Dark and light themes
- Manual, in-person mentor verification
- No database, authentication, teams, transmitted submissions, leaderboard, email, webhooks, or live chat
- UI-only mentor review confirmation; no request is sent or stored
- Challenge copy loaded from version-controlled Markdown
- Event listings loaded from version-controlled Markdown

`/` opens the English version.

## Documentation

- [Active static MVP plan](docs/N8N_CHALLENGES_PLAN.md)
- [Deferred platform plan and removed-feature reference](docs/DEFERRED_PLATFORM_PLAN.md)
- [Content contribution guide](CONTRIBUTING.md)

Future product notes, challenge specifications, event operations guides, and architecture decisions belong in the `docs/` directory.

## Local development

Requirements:

- Node.js
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000/en](http://localhost:3000/en).

## Commands

```bash
npm run dev        # Start the local development server
npm run build      # Generate the static site in out/
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript checks
```

## Project structure

```text
docs/                 Active and deferred product documentation
content/challenges/   Active bilingual challenge Markdown
content/events/       Active public event listings and contribution template
public/brand/         n8n brand assets
src/app/              Next.js App Router pages and global styles
src/app/_components/  Shared page components
src/lib/              Build-time Markdown loaders and localized page copy
```

The production build is a static export and does not require environment variables or a Node.js server.

Pull requests run linting, type checks, Markdown validation, and a full static build. Merges to `main` also build and deploy the `out/` artifact through GitHub Pages. Enable **GitHub Actions** as the publishing source in the repository's Pages settings before the first deployment.
