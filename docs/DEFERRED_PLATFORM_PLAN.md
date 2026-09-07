# Deferred n8n Challenge Event Platform — Archived Product Plan

Status: deferred on 2026-09-06; retained for possible restoration

This document preserves the earlier dynamic-platform design. It is not the current MVP. The active plan is [N8N_CHALLENGES_PLAN.md](N8N_CHALLENGES_PLAN.md).

## Removed implementation snapshot

The following pages and integrations existed before the static-MVP decision. Their source was removed from the active application so the deployed site has no backend or unused product flows.

### Events directory — `/[locale]/events`

The dynamic implementation described below remains archived. A simpler static Events directory has since been restored using `content/events/*.md`; it does not include teams, submissions, creation modals, webhooks, or email.

- English and Spanish routes with an event-directory hero.
- One ungrouped card per event.
- Each card showed only the event title, date, location with country flag, number of teams, and number of submissions.
- Active-event cards offered **Create a team** and **Join a team** actions; these actions disappeared after the event date.
- Empty and upstream-unavailable states were localized.
- A large organizer panel offered **Create a new event**.
- The creation modal requested organizer email, event name, one event date, location, and event language.
- Client and server validation covered email format, a 250-character event-name limit, date not earlier than today, a 100-character location limit, and event-language length.
- Successful creation showed an email-sent confirmation state.

### Events backend and email integration

- The event directory fetched data from a read-only n8n webhook using a short-lived HS256 JWT.
- Server results were cached for five minutes.
- The creation route accepted a POST request, validated it, signed a JWT, and forwarded the event payload—including location—to an n8n webhook.
- Resend sent the organizer confirmation email.
- Environment variables held both webhook URLs, both webhook secrets, the Resend key, and sender identity.
- A Markdown-and-pull-request events directory is the preferred design if event discovery returns later; see the active plan.

### Leaderboard — `/[locale]/leaderboard`

- English and Spanish routes with the heading **Learn n8n by building together.**
- Hero summary for participant, team, and submission totals.
- Responsive table containing rank, participant, team, event, balloons, and submissions.
- Visual balloon-progress indicators and emphasized top rows.
- The implemented page used mocked participants only.

### Team access

- A homepage panel titled **Your table is your team.**
- Disabled team-code input and join action prepared for a future QR/code flow.
- Proposed production flow used one pre-created team per table, a short join code, a QR link, and a signed team session without individual participant accounts.

### Challenge submission

- The UI-only card and confirmation dialog have since been restored to support the in-room mentor flow; real submission delivery remains deferred.
- A challenge-page card titled **Ready to submit?**
- **Submit as solved** opened a localized confirmation dialog.
- The dialog stated that a mentor had received the request and encouraged the team to start the next challenge.
- No real persistence or mentor notification had been connected yet.

### Live challenge chat

- Ably was selected as the possible future provider.
- The intended model used event-and-challenge-scoped rooms, server-issued scoped tokens, team identities, short retention, and mentor moderation.
- Chat was never implemented in the active UI.

### Restoration boundary

Restoring any of these features requires an explicit product decision. Team access, real submission delivery, leaderboards, email, n8n webhooks, JWT signing, server caching, database records, and Ably must remain outside the static deployment until then. The detailed product, data, security, and operational proposals below are retained as reference.

Primary UI languages: English and Spanish

Target format: reusable event platform inspired by NodeSchool

## 1. Product summary

Build a small event website for an n8n challenge session with approximately 120 participants seated at 16 tables. Each table acts as one team of roughly 7–8 people.

The website gives every team immediate access to 10 challenges. Teams choose challenges freely rather than completing a fixed sequence. After a mentor verifies a workflow in person, the team receives the physical balloon assigned to that challenge. The website records the verified completion and updates a live projector screen.

The core product is the challenge experience: clear tasks, starter data, progressive hints, fast mentor verification, and visible team progress. AI-based workflow verification, live challenge chat, a full admin interface, and the n8n survey are later additions.

## 2. Confirmed event constraints

- Approximately 120 participants.
- Approximately 16 tables and, initially, one team per table.
- Expected team size: 7–8 people.
- Audience mix:
  - 43% / 52 people: almost no n8n experience.
  - 37% / 44 people: have built a few workflows.
  - 20% / 24 people: regular or expert users.
- Challenge time: approximately 2–2.5 hours, excluding or in addition to the main introduction.
- All 10 challenges are available from the start.
- Teams choose challenges appropriate to their level.
- A team is not expected to finish every challenge.
- Each challenge awards one unique physical balloon.
- Balloon type/color represents the challenge, not a numerical score.
- Mentors verify workflows manually in the MVP.
- The website must store teams, challenge status, hints, and verified completions.
- A live projector screen is part of the MVP.
- Participants normally use their own n8n Cloud accounts; local n8n is allowed.
- No credentials are preconfigured for participants.
- External services may be used only when signup is simple, does not require payment-card details, and does not require identity verification.
- The product must be reusable for future events.

## 3. Product principles

1. **Challenges before platform complexity.** The event must still work if optional automations are unavailable.
2. **One primary concept per challenge.** Participants should leave having practiced 10 recognizable n8n concepts.
3. **No linear progression.** Beginners and experienced users must be able to work simultaneously.
4. **Manual approval remains authoritative in the MVP.** The physical balloon and mentor check are the source of truth.
5. **No participant account system in the MVP.** Team access is sufficient.
6. **Hints support learning, not punishment.** Hint usage is recorded but does not reduce balloons or rank.
7. **The projector encourages progress without embarrassing teams.** Default presentation emphasizes collections and recent wins, not a harsh numerical leaderboard.
8. **n8n can enhance the platform without becoming a critical runtime dependency.** Event data remains available even if an optional n8n automation fails.

## 4. Recommended event mechanic

### 4.1 Team model

Use one pre-created team per table for the first event.

- Create 16 teams before the event: `Table 01` through `Table 16`.
- Generate one short join code and one QR link for each table.
- Place the QR code physically on the table.
- Any participant at the table can scan the link and access the same team.
- Let the team choose a display name after joining; keep the table number visible to organizers.
- Save the team session in a signed HTTP-only cookie.
- Allow recovery by entering the table's join code again.
- Do not collect names or email addresses.

This is simpler and faster than magic-link authentication, avoids 120 email deliveries at event start, and still supports shared team progress across multiple devices.

### 4.2 Challenge lifecycle

Each team/challenge pair has one of these states:

1. `not_started`
2. `in_progress`
3. `ready_for_review`
4. `completed`

Expected flow:

1. A team opens a challenge and selects **Start challenge**.
2. The app records the start time, enabling “teams working on this” metrics.
3. The team builds the workflow in its own n8n account.
4. The team may reveal hints one at a time.
5. The team selects **Ready for mentor review**.
6. A mentor checks the workflow using the short checklist on the page.
7. The mentor approves the result on the team's device with a staff PIN.
8. The app records a timestamped completion, shows a balloon celebration, and updates the projector.
9. The mentor gives the matching physical balloon to the team.

No separate mentor page is required. The approval control lives on the challenge page and requires a staff PIN that is validated only on the server.

### 4.3 Balloon and difficulty model

Keep three difficulty levels because they map naturally to the measured audience:

| Level | Audience | Challenge count | Expected time | Balloon colors |
| --- | --- | ---: | ---: | --- |
| Beginner | Little or no n8n experience | 4 | 10–20 min | White, Yellow, Light Blue, Green |
| Intermediate | Has built a few workflows | 3 | 15–30 min | Orange, Pink, Purple |
| Advanced | Regular or expert user | 3 | 25–40 min | Red, Silver, Black |

The physical balloon colors must be confirmed against what can actually be sourced. The final black balloon is reserved for the hardest challenge.

There is no score multiplier in the MVP: one verified challenge equals one balloon. If a prize is offered, support a simple event-specific rule such as “first team to earn the black balloon” rather than introducing a complex scoring system.

### 4.4 Hint model

Every challenge contains five progressive hints:

1. **Direction:** clarifies the concept or first decision.
2. **Nodes:** identifies the relevant family of nodes.
3. **Flow:** describes the expected workflow shape.
4. **Configuration:** gives concrete field, expression, or node-setting help.
5. **Near-solution:** gives an almost complete sequence while still requiring the team to finish it.

Rules:

- Hints unlock in order.
- The user must deliberately reveal each hint.
- Record `team`, `challenge`, `hint_number`, and `revealed_at`.
- Hints do not reduce balloons or change completion status.
- Do not show hint counts on the public projector by default.
- Full solution workflows remain hidden until the event ends or the organizer changes an event setting.

## 5. Information architecture and pages

All participant routes use a locale prefix: `/en/...` and `/es/...`.

### 5.1 Event home — `/[locale]`

Purpose: explain the event in under one minute and get a team into the challenge board.

Functionality:

- Event name, short description, venue/date, and n8n branding.
- English/Spanish language switch.
- Event countdown or time remaining.
- Short “How it works” section:
  1. Join your table team.
  2. Choose any challenge.
  3. Build it in n8n.
  4. Ask a mentor to check it.
  5. Collect the matching balloon.
- Difficulty explanation.
- **Join with team code** action.
- Preserve a returning team's session and show **Continue as {team}**.
- Link to concise event rules and setup help on the same page; no separate rules page is required.

### 5.2 Join team — `/[locale]/join`

Purpose: connect a browser to one pre-created table team.

Functionality:

- Automatically join when opened from a valid table QR link.
- Manual fallback for entering a short join code.
- Display table number and current team name before confirmation.
- Allow a one-time team display-name edit or require the table PIN for later edits.
- Store the returned signed team session in an HTTP-only cookie.
- Friendly recovery for expired or invalid codes.
- No email, personal profile, password, or participant list.
- Redirect to the challenge board after joining.

### 5.3 Challenge board — `/[locale]/challenges`

Purpose: let teams understand and choose among all 10 challenges.

Functionality:

- Show all 10 challenge cards immediately.
- Each card contains:
  - Unique balloon illustration/color.
  - Challenge number and title.
  - Difficulty.
  - Expected time.
  - One-sentence outcome.
  - Primary n8n concept.
  - Team status.
  - Number of teams currently working on it.
  - Number of teams that have completed it.
- Filter by difficulty; default is **All**.
- Never lock a challenge because another challenge is incomplete.
- Clearly distinguish `in progress`, `ready for review`, and `completed`.
- Show the team's collected balloons in a compact header strip.
- Show time remaining without forcing a page refresh.
- Provide a direct link to team progress.

### 5.4 Challenge detail — `/[locale]/challenges/[slug]`

Purpose: provide everything needed to complete and verify one challenge.

Functionality:

- Balloon, number, title, difficulty, expected time, and concept learned.
- Scenario explaining why the workflow is useful.
- Exact task statement.
- Required input and expected output.
- Acceptance checklist written for both the team and mentor.
- Suggested test cases.
- Downloadable starter JSON/CSV data when needed.
- Copy buttons for sample payloads and fixture URLs.
- Links to only the relevant official n8n documentation.
- **Start challenge** action.
- Five progressive hint controls.
- **Ready for mentor review** action.
- Compact mentor checklist.
- **Mentor approve** modal with server-validated staff PIN.
- Successful-completion state with balloon animation and link back to the board.
- Prevent duplicate awards for the same team/challenge.
- Allow a team to move back from `ready_for_review` to `in_progress` if changes are required.

The challenge page must not embed an n8n editor in the MVP. Participants build in their own n8n account in a separate browser tab.

### 5.5 Team collection — `/[locale]/team`

Purpose: give a team a satisfying view of its progress and a reliable way to reconnect.

Functionality:

- Team name and table number.
- Grid of 10 balloon slots in challenge order.
- Filled balloon for every verified completion.
- Current in-progress and awaiting-review challenges.
- Completion timestamps.
- Number of hints used per challenge, visible only to that team.
- Copyable team join code/link for other people at the same table.
- Continue buttons for active challenges.
- No individual participant records.
- No public numerical score in the MVP.

### 5.6 Projector dashboard — `/screen`

Purpose: create a live shared event view suitable for a 16:9 projector.

Functionality:

- Full-screen layout with no participant navigation.
- Event name and large countdown/time remaining.
- Summary metrics:
  - Teams joined.
  - Active teams.
  - Total verified balloons awarded.
  - Total challenges currently in progress.
- A 16-row team matrix showing the 10 balloon slots for every table/team.
- Per-challenge completion counts.
- Recent balloon awards as a subtle activity feed.
- Special celebration when the first black balloon is verified.
- Auto-refresh approximately every 5 seconds using polling.
- Recover automatically from a failed request and keep the last valid snapshot visible.
- Do not display participant names, email addresses, hint counts, or failed attempts.
- Hide ordering/rank by default; enable a ranked mode later behind an event feature flag if desired.

### 5.7 Pages explicitly excluded from the MVP

- Participant registration/profile pages.
- Email magic-link authentication.
- Separate mentor dashboard.
- Full organizer/admin CMS.
- AI workflow submission and verification page.
- Live challenge chat.
- n8n experience survey.
- Public historical results page.

For the first event, organizers configure the event, 16 teams, mentor PIN, time window, challenge version, and solution visibility through seed/configuration files and environment variables.

## 6. Challenge candidate pool and working set

The final top 10 has not been selected. The original ten concepts below remain a working set, while section 6.4 records the wider candidate backlog for later evaluation. Names, scenarios, difficulty assignments, and ordering are provisional. Final content must be written in English first and then translated to Spanish.

### 6.1 Beginner challenges

#### 1. White balloon — Webhook Welcome

- Expected time: 10–15 minutes.
- Primary concept: triggers, expressions, and webhook responses.
- Task: accept a POST request containing a person's name and language, then return a personalized JSON response.
- Required behavior:
  - Use a Webhook trigger.
  - Read values from the request body rather than hard-coding them.
  - Return a valid JSON response with `message`, `language`, and `team` fields.
- Mentor check:
  - Send two different sample payloads.
  - Confirm the response changes with the input.
  - Confirm the workflow completes successfully.

#### 2. Yellow balloon — API Treasure Hunt

- Expected time: 10–20 minutes.
- Primary concept: HTTP Request and data mapping.
- Task: request a list from an event-provided public fixture API, select the record matching a given ID, and return only the required fields.
- Required behavior:
  - Use HTTP Request.
  - Use a dynamic input ID.
  - Return a clean object instead of the full upstream response.
- Mentor check:
  - Test at least two IDs.
  - Confirm only the requested fields remain.
  - Confirm no credential is required.

#### 3. Light-blue balloon — Smart Router

- Expected time: 15–20 minutes.
- Primary concept: IF/Switch branching.
- Task: accept a request with `priority` and `amount`, then route it to `standard`, `urgent`, or `manual_review`.
- Required behavior:
  - Use branching rather than a single hard-coded result.
  - High-value requests always go to manual review.
  - Every branch returns a normalized result.
- Mentor check:
  - Run one payload for each branch.
  - Confirm the result includes the selected route and original request ID.

#### 4. Green balloon — Shape the Data

- Expected time: 15–20 minutes.
- Primary concept: expressions and field transformation.
- Task: transform a messy contact/order payload into a clean schema ready for another application.
- Required behavior:
  - Rename and remove fields.
  - Combine first and last name.
  - Normalize one date or currency value.
  - Produce the exact requested output structure without using a Code node.
- Mentor check:
  - Compare the result to the expected schema.
  - Test a second input to prove values are mapped dynamically.

### 6.2 Intermediate challenges

#### 5. Orange balloon — Duplicate Detective

- Expected time: 15–25 minutes.
- Primary concept: list processing, deduplication, sorting, and aggregation.
- Task: combine two customer lists, remove duplicates by email, sort the result, and calculate a category summary.
- Required behavior:
  - Preserve one record per normalized email address.
  - Produce both the clean list and a summary count.
  - Handle an empty list without failure.
- Mentor check:
  - Use the provided fixture containing duplicates.
  - Confirm expected unique and category counts.

#### 6. Pink balloon — Form to Follow-up

- Expected time: 20–30 minutes.
- Primary concept: Form Trigger, validation, branching, and persistent data.
- Task: create a small request form, validate the submission, and save valid requests to an n8n Data Table or an event-approved equivalent.
- Required behavior:
  - Required fields cannot be blank.
  - Invalid input receives a useful response.
  - Valid input is stored with a timestamp and generated status.
- Mentor check:
  - Submit one valid and one invalid request.
  - Confirm only the valid request is stored.
- Fallback: if the participant's n8n edition does not expose Data Tables, use a provided Google Sheet or another explicitly documented temporary store.

#### 7. Purple balloon — AI Triage Desk

- Expected time: 20–30 minutes after AI credentials are configured.
- Primary concept: LLM use with structured output and deterministic routing.
- Task: classify support tickets into a fixed category and priority, then route critical tickets separately.
- Required behavior:
  - Connect an OpenAI-compatible model; OpenRouter can be the event's recommended setup.
  - Return structured fields rather than prose only.
  - Restrict categories to the supplied list.
  - Route critical results to a separate branch.
  - Provide a safe `unknown` result for ambiguous input.
- Mentor check:
  - Test one normal, one critical, and one ambiguous ticket.
  - Confirm the output is parseable and uses only allowed categories.

### 6.3 Advanced challenges

#### 8. Red balloon — Tool-Using Research Agent

- Expected time: 25–35 minutes.
- Primary concept: AI Agent with a tool.
- Task: build an agent that answers event questions by calling a provided workshop-information API/tool instead of inventing answers.
- Required behavior:
  - Use an AI Agent and at least one tool.
  - Call the tool for event-specific facts.
  - Say that information is unavailable when the tool has no matching data.
  - Return the answer and the retrieved source identifier.
- Mentor check:
  - Ask one known, one multi-step, and one unknown question.
  - Confirm the agent uses the tool and does not fabricate the unknown answer.

#### 9. Silver balloon — Human Approval Gate

- Expected time: 25–35 minutes.
- Primary concept: wait/resume and human-in-the-loop approval.
- Task: create a workflow where high-risk or high-value actions pause for a human decision before continuing.
- Required behavior:
  - Low-risk requests proceed automatically.
  - High-risk requests pause and expose an approval decision.
  - Approval continues the action.
  - Rejection stops it and records a reason.
- Mentor check:
  - Demonstrate the automatic, approved, and rejected paths.
  - Confirm the workflow genuinely waits rather than simulating approval with a fixed value.

#### 10. Black balloon — Resilient Automation

- Expected time: 30–40 minutes.
- Primary concept: retries, error paths, idempotency, and operational reliability.
- Task: process a batch through a deliberately unreliable event fixture endpoint without losing successful items or creating duplicate results.
- Required behavior:
  - Retry transient failures with a bounded retry policy.
  - Capture unrecoverable failures in an error/log path.
  - Continue processing valid items.
  - Prevent duplicate processing when the same request ID is received twice.
  - Produce a final success/failure summary.
- Mentor check:
  - Run the provided failure scenario.
  - Retry the same batch.
  - Confirm completed items are not duplicated and failures are visible.
- Optional prize rule: the first mentor-verified completion receives a book. The server timestamp, not a self-reported time, determines the winner.

### 6.4 Additional challenge candidates — archived snapshot

The organizers have selected the active top 10 documented in [N8N_CHALLENGES_PLAN.md](N8N_CHALLENGES_PLAN.md#4-active-challenge-set). The ideas below were not included in that set but remain available for future events or substitutions. The canonical, maintainable list is [CHALLENGE_IDEA_BACKLOG.md](CHALLENGE_IDEA_BACKLOG.md); this table is retained as a historical snapshot of the earlier plan.

| Backlog ID | Working title | Suggested level | Candidate scope | Dependencies and open questions |
| --- | --- | --- | --- | --- |
| C01 | OpenRouter | To define | Create a focused challenge around configuring and using an OpenRouter-hosted model from n8n. | Define the participant outcome beyond provider setup; validate signup, model availability, free-credit requirements, and rate limits shortly before the event. |
| C02 | Firecrawl Webpage Summarizer | To define | Scrape one or more webpages with Firecrawl and use AI to generate a useful summary. | Adapt or reference [Scrape and summarize webpages with AI](https://n8n.io/workflows/1951-scrape-and-summarize-webpages-with-ai/); confirm Firecrawl credential and quota requirements. |
| C03 | RAG with Google Drive | To define | Index selected Google Drive documents and answer questions using retrieval-augmented generation with source-grounded responses. | Define the vector store, document fixture, permissions, ingestion time, and fallback if Google credentials are unavailable. |
| C04 | n8n To-do Backend | To define | Use n8n as the backend for creating and storing to-do items, with a simple client, form, webhook, or API as the front end. | Define storage, authentication, and whether create-only or full CRUD behavior is expected. |
| C05 | AI Assistant in n8n | To define | Build an AI assistant inside n8n that can answer questions or complete a useful task. | Narrow the scenario, allowed knowledge, tools, and acceptance criteria so this does not overlap completely with other AI-agent challenges. |
| C06 | Ahrefs-to-Landing-Page Pipeline | To define | Get keywords from Ahrefs, generate a landing page, and publish or upload it to ChatGPT Websites. | Clarify whether “keys” means keywords, confirm the exact publishing destination, and provide a fixture/fallback because Ahrefs may require a paid account. |
| C07 | Valencia API Challenge | To define | Build a challenge around a useful Valencia public API. | Research and choose a stable API, participant scenario, expected output, credential requirements, and event-owned fallback fixture. |
| C08 | Customer Email Triage | To define | Receive a customer email, analyze sentiment, assign priority and team, create a Trello card, and send an automatic reply. | Define categories, routing rules, email/Trello credential setup, safe auto-reply copy, and a fixture path that avoids sending real messages during testing. |
| C09 | WhatsApp Calendar Bot | To define | Build a WhatsApp bot that reads or manages calendar availability. | Define supported commands and whether it only checks availability or may create/reschedule events; confirm WhatsApp and calendar sandbox credentials. |
| C10 | Hello n8n — Hello Valencia | Beginner | Use a Manual Trigger and return the message “Hello Valencia” with the current date and time. | Keep this as the shortest onboarding challenge and define the expected output fields and timezone. |
| C11 | Smart Contact Form | Beginner | Receive an n8n Form or Webhook submission containing name, email, company, and message; save it to Google Sheets or Airtable; send a confirmation email; and notify the team in Slack. Bonus: detect missing fields and skip actions that require them. | Covers webhooks, data mapping, integrations, and simple branching. Decide which storage and notification integrations are primary and provide safe test accounts or fallbacks. |
| C12 | Daily Weather Notification | Beginner | Run every morning, fetch weather for a selected city, extract temperature and conditions, format a readable briefing, and send it through Slack, Telegram, or email. Bonus: warn about rain or extreme temperatures. | Covers scheduling, API calls, JSON handling, and IF logic. Choose a no-card weather API and define warning thresholds. |
| C13 | Alien Translator | Intermediate | Receive a message such as “blorp 42 banana Valencia zzzrrtt” through n8n Form or n8n Chat and use AI to decode it. | Define a repeatable alien-language rule or rubric so mentor verification is objective rather than based only on creative model output. |
| C14 | Valencia Citizen Request Classifier | Intermediate | When a Valencia citizen submits a form, use AI to return structured fields such as `Category: Waste`, `Urgency: Medium`, `Location: Mislata`, and a concise summary, then write the result to a spreadsheet. | Define the allowed categories, urgency scale, location handling, ambiguous-input behavior, and spreadsheet fixture. |
| C15 | Valencia AI Trip Planner | Intermediate | Build an n8n agent that creates a personalized daily plan for tourists visiting Valencia from trip length and interests such as food, architecture, beaches, history, nightlife, art, nature, technology, shopping, family activities, or custom interests. | Define whether the plan must use live place data, a supplied knowledge source, or both; require realistic travel time and opening-hour handling if live data is used. |
| C16 | Valencia Helpful Contacts MCP Server | Advanced | Create an MCP server, connect it to Claude or ChatGPT, and add a tool that returns helpful contacts for a person, such as the relevant Ayuntamiento phone number. | Define the authoritative contact dataset, supported intents, MCP hosting/setup path, client choice, and behavior when no contact is found. |
| C17 | Valencian Food by Your Taste | Advanced | Build an agent that accepts freely entered ingredients or preferences, suggests suitable Valencian dishes, and recommends a restaurant with a Google Maps link. | Define dietary-safety wording, source of restaurant data, how closed/outdated venues are handled, and whether recommendations require live search. |
| C18 | Talk to Google Sheets through WhatsApp | Advanced | Build a WhatsApp interface that lets a user query or update a Google Sheet using natural language. | Define read/write permissions, allowed operations, confirmation before mutations, row identification, and sandbox credentials. |
| C19 | Calendar Meeting-Slot Assistant | Intermediate | Read calendar availability and suggest suitable meeting slots based on attendee constraints. | Define calendar provider, timezone handling, working hours, meeting duration, conflict rules, and whether the workflow proposes only or also books. |
| C20 | Idealista Morning Apartment Brief | Advanced | Send a morning briefing containing newly listed apartments that match a participant's preferences. | Confirm a permitted and stable data source; define deduplication, ranking, notification channel, and a fixture fallback if live Idealista access is unavailable. |

Before shortlisting, score every candidate against learning value, completion time, credential friction, reliability, mentor verification speed, bilingual content effort, and overlap with other candidates. Prefer event-owned fixtures when a third-party dependency could block participants.

## 7. Challenge content contract

Every challenge definition must include:

- Stable ID and slug.
- Challenge number.
- Difficulty.
- Balloon name and color token.
- English and Spanish title.
- English and Spanish description.
- Expected time.
- Primary learning concept.
- Prerequisites.
- Scenario.
- Exact task.
- Input schema and sample inputs.
- Expected output schema and sample outputs.
- Acceptance checklist.
- Mentor checklist that can be completed in about 60–90 seconds.
- Five progressive hints in both languages.
- Fixture/download references.
- Relevant official documentation links.
- A private reference solution or exported solution workflow.
- Version number so results remain tied to the challenge version used at the event.

Store challenge content in version-controlled typed files rather than a database CMS for the MVP. The application should fail its build when a challenge is missing a translation, balloon color, hint, or required metadata.

## 8. Event-owned fixtures

Avoid making core challenges dependent on fragile third-party services.

The platform should expose or host:

- Static JSON/CSV downloads for transformation challenges.
- A read-only public fixture API for challenge 2.
- A workshop-information API for challenge 8.
- A deterministic “flaky” endpoint for challenge 10 that fails according to documented request IDs.
- Sample webhook payloads for challenges 1 and 3.

Fixture endpoints must be rate-limited generously enough for the event, require no participant credential, and return deterministic data. Do not use services that require a payment card or identity verification.

AI challenges are the exception: participants may register for OpenRouter or use another compatible provider. Validate the recommended setup, model availability, signup flow, and rate limits shortly before each event. Keep at least seven non-AI challenges available so AI-provider problems cannot block the event.

## 9. Projector metrics and gamification

### 9.1 MVP metrics

- Teams joined.
- Teams active during the last five minutes.
- Total challenge starts.
- Challenges currently in progress.
- Verified completions and balloons awarded.
- Completion count for each challenge.
- Per-team balloon collection.
- Recent verified completions.
- First verified black-balloon completion.

### 9.2 Metrics intentionally omitted from the public screen

- Participant identities.
- Hint usage by team.
- Mentor rejections.
- Failed workflow attempts.
- A permanent “last place.”

### 9.3 Optional competitive mode

Add later behind an event setting:

- Sort teams by number of collected balloons.
- Use advanced-balloon count as the first tie-breaker.
- Use time of final verified completion as the second tie-breaker.
- Allow the projector to switch between collection view and ranked view.

Do not build a general scoring-rule editor in the MVP.

## 10. Data model

Challenge text stays in the codebase; event activity lives in a small relational database.

### `events`

- `id`
- `slug`
- `name`
- `starts_at`
- `ends_at`
- `default_locale`
- `challenge_version`
- `solutions_visible`
- `ranked_mode_enabled`
- `status`

### `teams`

- `id`
- `event_id`
- `table_number`
- `display_name`
- `join_code_hash`
- `created_at`
- `last_active_at`

### `team_challenges`

- `id`
- `event_id`
- `team_id`
- `challenge_id`
- `status`
- `started_at`
- `ready_for_review_at`
- `completed_at`
- `approved_by_label` (optional non-personal mentor label)
- `challenge_version`

Enforce a unique constraint on `(event_id, team_id, challenge_id)`.

### `hint_reveals`

- `id`
- `event_id`
- `team_id`
- `challenge_id`
- `hint_number`
- `revealed_at`

Enforce a unique constraint on `(event_id, team_id, challenge_id, hint_number)`.

### `activity_events`

- `id`
- `event_id`
- `team_id`
- `challenge_id` when applicable
- `type`
- `created_at`
- `metadata` with a small allow-listed JSON schema

Use this table for the recent projector feed and future analytics. Do not store exported participant workflows in the MVP.

## 11. Authentication and permissions

### Team access

- QR link or short code exchanges for a signed team session.
- Store only a hash of the join code in the database.
- Use an HTTP-only, secure, same-site cookie.
- A team session can start challenges, reveal hints, and request review.
- A team session cannot approve completion.

### Mentor approval

- **Mentor approve** requires a staff PIN entered on the team's device.
- Validate the PIN server-side against a hashed environment secret.
- Rate-limit failed PIN attempts.
- Never return the PIN or its hash to client JavaScript.
- Log approval timestamp and an optional mentor label.
- If meaningful prizes are introduced later, replace the shared PIN with individual mentor links or accounts.

### Organizer configuration

There is no organizer UI in the MVP. Provide scripts or documented commands to:

- Create an event.
- Generate 16 team records and printable QR codes.
- Set the event time window.
- Reset demo/event data safely.
- Export event results as CSV/JSON.
- Change solution visibility.

## 12. Recommended technical architecture

Keep the implementation conventional and small:

- Next.js App Router.
- React and TypeScript.
- Tailwind CSS or the project's existing lightweight component system.
- Deployment on Vercel.
- A managed PostgreSQL database compatible with Vercel deployment.
- A minimal typed query layer; avoid a large backend framework.
- Server Actions or route handlers for mutations.
- Schema validation for all incoming data.
- Server-rendered challenge content where practical.
- Five-second polling for the projector instead of a WebSocket/realtime dependency.
- Ably Chat for the future challenge-room feature; do not route chat messages through n8n or the projector polling API.
- Version-controlled English/Spanish dictionaries and challenge content.

Recommended content layout:

```text
src/
  app/
    [locale]/
      page.tsx
      join/page.tsx
      challenges/page.tsx
      challenges/[slug]/page.tsx
      team/page.tsx
    screen/page.tsx
    api/fixtures/...
  content/
    challenges/
      01-webhook-welcome.ts
      ...
      10-resilient-automation.ts
  lib/
    auth/
    challenges/
    db/
    events/
    i18n/
```

The exact database provider and query library can be chosen when implementation begins. The product behavior should not depend on provider-specific realtime features.

## 13. Optional n8n involvement in the platform

Use n8n as an asynchronous extension, not the only source of truth.

After important events, the application may send signed webhook events to an organizer-owned n8n workflow:

- `team.joined`
- `challenge.started`
- `hint.revealed`
- `challenge.ready_for_review`
- `challenge.completed`
- `event.finished`

Possible n8n workflow actions:

- Append an analytics row to Google Sheets.
- Send an organizer notification for the first black balloon.
- Generate a post-event summary.
- Export event results.
- Trigger the later AI Adoption Score invitation.

Requirements:

- Database writes happen before the webhook is sent.
- Webhook delivery is non-blocking from the participant's perspective.
- Failures are retried or logged but never remove a verified balloon.
- Sign outbound webhook payloads.

This makes the event platform itself a useful n8n demonstration without making the event dependent on one large workflow.

## 14. AI verification — later phase

Do not include AI verification in the MVP.

### Phase A: exported workflow JSON

1. Team uploads an exported n8n workflow JSON file.
2. The server validates file type, size, and JSON shape.
3. A deterministic checker inspects:
   - Required node types.
   - Connections and branch structure.
   - Required expressions/configuration patterns.
   - Missing or obviously hard-coded values.
4. AI explains likely issues and gives short learning feedback.
5. The submission receives `likely_pass`, `needs_changes`, or `needs_mentor_review`.
6. A mentor remains the final authority until automated tests are proven reliable.

Security requirements:

- Never execute an uploaded workflow in the production web application.
- Strip or redact credential identifiers and sensitive-looking fields before any model call.
- Never request credential secrets.
- Use strict file-size and rate limits.
- Store uploads only when explicitly needed, with a short retention period.
- Treat AI feedback as advisory, not as a prize-awarding decision.

### Phase B: screenshot/image analysis

Add only after JSON validation works well.

- Accept a screenshot of the full workflow.
- Use vision analysis to identify visible nodes and connections.
- Clearly state that hidden configuration cannot be verified from an image.
- Return feedback only; do not automatically award a balloon from a screenshot.

## 15. Live challenge chat — later phase

Use Ably Chat as the selected realtime provider. Chat is not part of the MVP and must remain an optional enhancement: challenge instructions, hints, submissions, and mentor review must continue working if Ably is unavailable.

### Room model

- Create one room for every event/challenge pair.
- Use a stable topic such as `event:{event_id}:challenge:{challenge_slug}`.
- Never reuse a challenge-only room across events; conversations from separate events must remain isolated.
- Connect a participant only when they open the chat panel, then detach when they close it or leave the challenge page.
- Make rooms read-only or unavailable after the organizer closes the event.

### Identity and access

- Issue Ably access tokens from a server-side Next.js route handler.
- Keep the Ably API secret exclusively on the server.
- Scope each token to the exact event/challenge room the participant may access.
- Derive a stable, non-email chat identity from the participant or team session.
- Display a participant nickname and team name with each message; do not expose email addresses.
- Require a valid event/team session before a participant can read or send messages.
- Give organizer and mentor sessions separate moderation capabilities.

### First chat experience

- Add a collapsed **Challenge chat** panel below the task and hints on every challenge page.
- Show message history, timestamps, participant nickname, and team name.
- Support text messages and emoji reactions in the first version.
- Show connection state and a small online-participant count.
- Do not support file uploads, voice messages, direct messages, or cross-room search initially.
- Limit message length and sending frequency to reduce accidental spam and abuse.
- Preserve unsent input during a temporary reconnect.

### Moderation and retention

- Allow organizers or mentors to delete messages, mute a participant, and freeze a room as read-only.
- Log moderation actions with event, room, actor label, target identity, and timestamp.
- Use short-lived message retention for the first version; do not create a permanent chat archive by default.
- If historical chat becomes valuable later, archive it asynchronously to an event-owned store through an Ably webhook. Archiving must not block live message delivery.
- Provide a visible code-of-conduct reminder and a way to identify the responsible team when moderation is needed.

### Reliability and acceptance criteria

- Test at least 120 simultaneous participant connections distributed across the 10 challenge rooms.
- Verify that a participant cannot subscribe to another event's rooms by editing a client-side topic.
- Verify reconnect behavior on unstable venue Wi-Fi.
- Ensure the challenge page remains usable when Ably is slow or unavailable.
- Do not send individual chat messages through n8n workflows; use n8n only for optional summaries, alerts, or post-event automation.

## 16. AI Adoption Score integration — separate later project

The n8n survey belongs to the existing AI Adoption Score product, not this MVP.

Future survey outline:

- Whether the respondent has used n8n.
- Self-assessed n8n expertise on a five-point scale:
  1. Never used it.
  2. Understand the basics.
  3. Can build with guidance.
  4. Can build independently.
  5. Can design reliable workflows and help others.
- Confidence across specific concepts such as triggers, APIs, branching, data transformation, AI nodes, approvals, and error handling.
- Topics the person wants to learn.
- Topics on which the person could help others.
- Intended n8n use in the next 30 days.

For impact measurement, collect the same short baseline before the event and follow-up after the event when possible. Challenge completions can be imported as event-level evidence, but should not be treated as an individual employee-performance score.

## 17. Delivery phases

### Phase 0 — Challenge and event contract

- Confirm event name, date, exact start/end time, and brand assets.
- Confirm one team per table and final number of tables.
- Confirm the 10 physical balloon colors.
- Approve the 10 challenge concepts.
- Write exact inputs, outputs, mentor checks, and five hints.
- Create and manually test reference workflows in n8n Cloud.
- Confirm Spanish translations with a human reviewer.
- Validate any OpenRouter signup/model assumptions shortly before the event.

### Phase 1 — Application foundation

- Bootstrap Next.js application.
- Add English/Spanish routing and dictionaries.
- Add database schema and migrations.
- Add event/team seed workflow.
- Generate table codes and printable QR cards.
- Implement signed team sessions.
- Add typed, validated challenge content.
- Add event-owned fixture files and APIs.

### Phase 2 — Participant experience

- Build home, join, challenge board, challenge detail, and team collection pages.
- Implement start, review-request, and hint-reveal actions.
- Implement responsive layouts for phones, tablets, and laptops.
- Add reconnect and invalid-code recovery.
- Add balloon illustrations and completion animation.

### Phase 3 — Verification and projector

- Add mentor PIN approval on the challenge page.
- Add completion idempotency and audit events.
- Build the projector dashboard and polling endpoint.
- Add first-black-balloon celebration and optional prize timestamp.
- Add event-result export command.
- Optionally emit signed events to an organizer n8n webhook.

### Phase 4 — Rehearsal and hardening

- Test all 10 challenges from fresh n8n Cloud accounts.
- Test both languages for content parity.
- Simulate 16 teams and at least 120 active browser sessions.
- Test projector recovery during database/network interruptions.
- Confirm mentor review can be completed in 60–90 seconds per challenge.
- Print QR cards, balloon map, and mentor check sheets.
- Run a full timed rehearsal.

### Later phases

- Ably-powered, event-scoped live chat inside each challenge.
- JSON-based deterministic and AI-assisted verification.
- Screenshot-based advisory feedback.
- Ranked competition mode.
- Individual mentor accounts.
- Organizer CMS and reusable event builder.
- Historical event analytics.
- AI Adoption Score n8n survey.

## 18. MVP acceptance criteria

The MVP is ready when:

- An organizer can seed a new event and 16 table teams without editing database rows manually.
- A participant can join a table by QR code without email or account creation.
- Multiple devices can join the same team and see shared progress.
- All 10 challenges are immediately visible in English and Spanish.
- Each challenge has complete inputs, outputs, mentor criteria, and five hints.
- A team can start any challenge and request mentor review.
- A mentor can approve on the team's device without a separate dashboard.
- Approval awards exactly one balloon and cannot create a duplicate completion.
- The projector reflects a verified completion within approximately 10 seconds.
- The projector displays all 16 teams legibly at 1920×1080.
- Event progress survives page refreshes and participant-device reconnects.
- The core event still works if the optional organizer n8n webhook is offline.
- No participant PII, credentials, or workflow exports are stored.
- All challenge reference solutions have been successfully tested in a clean n8n Cloud environment.

## 19. Testing plan

### Unit and contract tests

- Challenge IDs, slugs, numbers, and balloon colors are unique.
- Exactly 10 active challenges exist.
- Exactly five hints exist for each challenge in both languages.
- English and Spanish content have matching required fields.
- State transitions reject invalid moves.
- Completion is idempotent.
- Join-code and mentor-PIN validation never expose secrets.

### End-to-end tests

- Join by QR and by manual code.
- Rejoin from a second device.
- Start multiple challenges in parallel.
- Reveal all hints in order.
- Request review, return to work, request again, and approve.
- Verify projector and team collection update after approval.
- Attempt duplicate approval.
- Switch languages without losing the team session.
- Recover from expired/invalid join sessions.

### Event/load tests

- At least 120 concurrent participant sessions.
- Sixteen teams updating independent progress.
- Projector polling throughout the event window.
- Burst of completions after a mentor round.
- Fixture API traffic with safe rate limits.
- Optional n8n webhook unavailable or slow.

## 20. Operational checklist

Before each event:

- Create the event and verify timezone/start/end time.
- Generate team join codes and QR cards.
- Set and test the mentor PIN.
- Confirm balloon inventory and challenge-color mapping.
- Test each reference workflow against the live fixture endpoints.
- Test the recommended AI provider signup and model.
- Prepare a non-AI fallback if AI-provider capacity is insufficient.
- Open `/screen` on the projector and verify 1920×1080 readability.
- Export an empty baseline report.
- Keep printed challenge summaries and mentor checks as an offline fallback.

After the event:

- Export teams, starts, hint reveals, and verified completions.
- Disable mentor approval and new joins.
- Enable solution visibility if desired.
- Create the event summary through the optional n8n workflow.
- Reset or archive event data without deleting previous event results.

## 21. Remaining decisions before implementation

These do not block the product plan but must be settled during Phase 0:

- Final event name, date, and visual identity.
- Whether one table always equals one team.
- Exact physical balloon colors available from the supplier.
- Exact prize rule, if any.
- Number of mentors and whether one shared PIN is acceptable.
- Final challenge scenarios and fixture datasets.
- Managed PostgreSQL provider and query library.
- Whether solution workflows become visible immediately after the event or only by organizer action.
- Whether future chat history expires shortly after an event or is archived for organizers.

## 22. Current-scope summary

### Build now

- Reusable English/Spanish event site.
- Pre-created table teams with QR/code access.
- Ten selectable challenges in three difficulty levels.
- Five progressive hints per challenge.
- Manual mentor verification on the challenge page.
- Physical-balloon collection tracked digitally.
- Team progress page.
- Live projector dashboard.
- Small relational database.
- Event-owned fixture data/APIs.
- Optional non-blocking n8n event webhook.

### Build later

- Ably-powered, event-scoped live chat inside each challenge.
- Uploaded JSON and AI-assisted workflow verification.
- Screenshot analysis.
- Full leaderboard/ranked mode.
- Admin/mentor dashboards.
- Participant accounts or magic links.
- AI Adoption Score n8n survey.
