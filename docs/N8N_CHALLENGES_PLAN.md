# n8n Balloon Challenges — Static MVP Plan

Status: active implementation plan

Primary UI languages: English and Spanish

Deployment target: static hosting, including GitHub Pages

## 1. Product summary

n8n Balloon Challenges is a small bilingual learning website for a practical community workshop. Participants choose from 10 challenges, build workflows in their own n8n environment, reveal progressive tips when needed, and show completed work directly to an in-person mentor. The mentor awards the matching physical balloon.

The website is intentionally content-only. It does not identify participants, record progress, transmit submissions, notify mentors, or depend on a backend service. A challenge page may show a UI-only review confirmation to support the in-room mentor flow, but it does not send or store anything.

## 2. Event format

- Approximately 120 participants working around 16 tables.
- Approximately 2–2.5 hours of challenge time.
- Ten challenges available from the start.
- Four beginner, three intermediate, and three advanced challenges.
- Teams choose freely and do not need to finish all ten.
- Each challenge teaches one primary n8n concept.
- Each challenge is represented by one distinct physical balloon.
- Five tips are revealed sequentially on the challenge page.
- Mentors verify completed workflows in person; the website is not part of approval.
- Participants use their own n8n Cloud or local n8n environment.

## 3. Current pages and functionality

All public routes use `/en` or `/es`. The language switch always displays `EN / ES` in that order.

### Landing page — `/[locale]`

Purpose: explain the challenge format and make every challenge easy to reach.

Functionality:

- n8n Balloon Challenges branding.
- Dark and light themes, with the chosen theme stored locally in the browser.
- English and Spanish navigation.
- Short introduction and event summary.
- Compact **How it works** sequence:
  1. Sign up for n8n Cloud.
  2. Choose a challenge.
  3. Build a workflow.
  4. Show a mentor.
  5. Collect a balloon.
- Ten clickable balloon cards leading directly to challenge details.
- A three-level explanation for beginner, intermediate, and advanced challenges.
- Up to three event cards whose dates fall within seven days before or after the static build date.
- GitHub repository and organizer contact links in the footer.

### Events directory — `/[locale]/events`

Purpose: list public community events without introducing a backend or organizer account system.

Functionality:

- English and Spanish page chrome.
- One card per event loaded from `content/events/*.md` during the static build.
- Event title, description, date, location, language, organizer, and public event link.
- A contribution panel linking to the GitHub pull-request instructions.
- No event signup, team creation, participant data, live availability, or runtime API calls.

### Challenge detail — `/[locale]/challenges/[slug]`

Purpose: provide everything a participant needs to solve one challenge.

Functionality:

- Challenge number, balloon, title, summary, level, and complexity indicator.
- Exact task on the left and example use case on the right.
- A numbered workflow-requirements checklist.
- Exactly five localized tips, initially hidden.
- Tips reveal one at a time; the next tip cannot be skipped ahead to.
- A UI-only **Ready to submit?** card opens a localized confirmation dialog; it does not transmit a request or save completion state.
- A next-challenge link and a return link to all challenge cards.
- No timer, real online submission, mentor notification, or completion state.

## 4. Active challenge set

| Balloon | Challenge | Level | Primary concept |
| --- | --- | --- | --- |
| White | Webhook Welcome | Beginner | GET webhooks and browser responses |
| Yellow | Valencia Noise Telegram Bot | Beginner | Chat triggers, HTTP requests, and data mapping |
| Light blue | Form to Follow-up | Beginner | Forms, validation, and Data Tables |
| Green | Valencia Citizen Request Classifier | Intermediate | Structured AI output, routing, and email |
| Orange | Google Drive RAG | Advanced | Document ingestion and vector retrieval |
| Pink | Trello Morning Brief | Intermediate | Schedules, ranking, and messaging |
| Purple | Alien Translator | Beginner | Prompt design and structured AI output |
| Red | Valencia Helpful Contacts MCP Server | Advanced | MCP servers and workflow tools |
| Silver | Idealista Morning Apartment Brief | Advanced | Persistent state and deduplication |
| Black | Mercadona MCP Shopping Assistant | Intermediate | MCP clients, agents, and grounded tools |

The current top 10 is the selected challenge set for the static MVP. Alternative ideas and the source ideas promoted into this set are preserved in [CHALLENGE_IDEA_BACKLOG.md](CHALLENGE_IDEA_BACKLOG.md). Historical detailed definitions from the earlier platform plan remain in [DEFERRED_PLATFORM_PLAN.md](DEFERRED_PLATFORM_PLAN.md#6-challenge-candidate-pool-and-working-set). The implemented bilingual copy lives in `content/challenges/*.md` and is validated by `src/lib/challenges.ts`.

## 5. Content requirements

Every active challenge must contain:

- Stable number and slug.
- Difficulty and complexity.
- Balloon color and readable text color.
- English and Spanish title, summary, multiple example use cases, task, required nodes, preparation checklist, and requirements.
- A preparation checklist that identifies any account, installation, credential, fixture, or organizer-provided resource needed before building.
- Exactly five progressive tips in both languages.
- Content parity between translations.

The build should fail when required challenge content or a translation is missing.

## 6. Technical architecture

- Next.js App Router with React and TypeScript.
- Fully static export generated by `next build` into `out/`.
- No route handlers, server actions, database clients, runtime fetches, authentication, email provider, webhook integration, or realtime provider.
- Challenge content is version-controlled in `content/challenges/*.md` and loaded during the build.
- Event listings are version-controlled in `content/events/*.md`, validated by `src/lib/events.ts`, and rendered during the build.
- A daily scheduled GitHub Pages build keeps the landing-page seven-day event window current without a runtime API.
- Client-side JavaScript is limited to theme selection, progressive tip disclosure, and the local review-confirmation dialog.
- Every locale and challenge route is generated at build time.

## 7. Deployment and contribution model

The deployment uses GitHub Pages because the application produces static files. Pull requests run content validation and a full build. A merge to `main` triggers a second workflow that publishes the `out/` artifact. The landing page links directly to the repository's **Add an event** instructions, and every challenge page links directly to its editable Markdown source.

The public event directory uses version-controlled content rather than database records:

1. An organizer copies an event Markdown template.
2. They add one event file and open a GitHub pull request.
3. Automated checks validate the event metadata and build the website.
4. A maintainer reviews and merges the pull request.
5. The static site rebuilds and publishes the event.

The public site updates after a pull request is merged, not merely opened. No organizer email, magic link, or event-management account is required.

## 8. Explicitly excluded from the static MVP

- Individual event detail pages hosted by this website; cards link to the organizer's public event page.
- Event-creation form and organizer onboarding flow.
- Team creation, team joining, QR codes, and team sessions.
- Participant records and team relationships.
- Challenge start/progress/completion tracking.
- Online challenge submissions and mentor notifications.
- Leaderboard and projector dashboard.
- Website-owned Resend email integration; participant challenge workflows may use event-provided test credentials.
- n8n read/write webhooks, JWT authentication, and five-minute backend cache.
- A website database or website-managed n8n Data Tables; participants may use Data Tables inside their own challenge workflows.
- Ably live chat.
- AI workflow verification.
- AI Adoption Score integration.

Design and implementation notes for these capabilities are preserved in [DEFERRED_PLATFORM_PLAN.md](DEFERRED_PLATFORM_PLAN.md).

## 9. Acceptance criteria

- `/en` and `/es` render successfully as static pages.
- `/en/events` and `/es/events` render all validated event Markdown files.
- All 10 challenge cards are visible and clickable.
- All 20 localized challenge routes are generated at build time.
- Every challenge has exactly five sequential tips.
- Language switching preserves the current challenge route.
- Theme switching works on landing and challenge pages.
- The site is responsive and keyboard-accessible.
- `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- The production output contains no API route and requires no environment variables.

## 10. Future interface TODOs

- [ ] Make every n8n-style node tile on a challenge page clickable and open an accessible details modal. The modal should explain what the node does, why the challenge uses it, any important setup or credentials, and link to the official node documentation. Keep the node information in version-controlled content so contributors can update it through pull requests.

## 11. Deferred product archive

The earlier full-platform plan—including the removed dynamic events implementation, leaderboard, team access, real submission handling, Resend/n8n integration, database model, projector, AI verification, and Ably chat—is intentionally retained in [DEFERRED_PLATFORM_PLAN.md](DEFERRED_PLATFORM_PLAN.md). It is reference material, not committed roadmap scope.
