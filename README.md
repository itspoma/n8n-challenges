# n8n Balloon Challenges

A multilingual static learning website with 10 practical n8n automation challenges and five progressive tips per challenge. Participants build in their own n8n environment, show their work to an in-person mentor, and collect the matching physical balloon.

## Current scope

- English, Spanish, Ukrainian, and Indonesian landing pages: `/en`, `/es`, `/uk`, and `/id`
- Static English, Spanish, Ukrainian, and Indonesian Events directories generated from Markdown
- Ten clickable challenge cards
- Forty statically generated localized challenge pages
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

### Workflow solution images

Challenges may include a complete core and bonus workflow pair in Markdown. Generate their light- and dark-theme Pixtex images before previewing a changed solution:

```bash
PIXTEX_API_KEY=your_key npm run solutions:render
```

The renderer skips challenges without a complete pair and reuses images whose workflow and render settings have not changed. Commit the generated images and manifest in `public/solutions/` with the corresponding challenge change. GitHub Pages validates those committed files during deployment and never calls Pixtex. Workflow credentials and pinned execution data are removed before rendering.

## Commands

```bash
npm run dev        # Start the local development server
npm run build      # Generate the static site in out/
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript checks
npm run solutions:check   # Validate Markdown workflow solution pairs
npm run solutions:render  # Generate changed Pixtex light/dark solution images
```

## Project structure

```text
docs/                 Active and deferred product documentation
content/challenges/   Active multilingual challenge Markdown
content/events/       Active public event listings and contribution template
public/brand/         n8n brand assets
src/app/              Next.js App Router pages and global styles
src/app/_components/  Shared page components
src/lib/              Build-time Markdown loaders and localized page copy
```

The production build is a static export and does not require environment variables or a Node.js server.

Pull requests run linting, type checks, Markdown validation, and a full static build. Merges to `main` also build and deploy the `out/` artifact through GitHub Pages. Enable **GitHub Actions** as the publishing source in the repository's Pages settings before the first deployment.
