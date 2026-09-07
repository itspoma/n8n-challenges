# n8n Challenge Idea Backlog

Status: idea history and preserved alternatives

The static MVP uses the selected challenge set in [N8N_CHALLENGES_PLAN.md](N8N_CHALLENGES_PLAN.md#4-active-challenge-set). This file preserves the ideas considered during selection. C03, C07, C10, C11, C13, C14, C16, and C20 now contribute to the active set; the remaining ideas are available for future events, substitutions, or later challenge packs.

Backlog IDs are stable discussion references, not final challenge numbers or balloon assignments.

| Backlog ID | Working title | Suggested level | Idea | Dependencies and open questions |
| --- | --- | --- | --- | --- |
| C01 | OpenRouter | To define | Configure and use an OpenRouter-hosted model from n8n. | Define an outcome beyond provider setup; validate signup, model availability, free-credit requirements, and rate limits. OpenRouter is still usable as the provider inside active challenge 7. |
| C02 | Firecrawl Webpage Summarizer | To define | Scrape webpages with Firecrawl and summarize their contents with AI. | Adapt or reference [Scrape and summarize webpages with AI](https://n8n.io/workflows/1951-scrape-and-summarize-webpages-with-ai/); confirm credential and quota requirements. |
| C03 | RAG with Google Drive | To define | Index selected Google Drive documents and answer questions with source-grounded retrieval. | Define the vector store, document fixture, permissions, ingestion time, and fallback when Google credentials are unavailable. |
| C04 | n8n To-do Backend | To define | Use n8n as the backend for creating and storing to-do items through a form, webhook, API, or small client. | Define storage, authentication, and whether the scope is create-only or full CRUD. |
| C05 | AI Assistant in n8n | To define | Build an AI assistant that answers questions or completes a useful task in n8n. | Narrow the scenario, allowed knowledge, tools, and acceptance criteria to avoid duplicating other AI challenges. |
| C06 | Ahrefs-to-Landing-Page Pipeline | To define | Get Ahrefs keywords, generate a landing page, and publish or upload it to ChatGPT Websites. | Confirm that “keys” means keywords, clarify the publishing destination, and provide a fallback because Ahrefs may require a paid account. |
| C07 | Valencia API Challenge | To define | Build a workflow around a useful Valencia public API. | Select a stable API, participant scenario, output, credential requirements, and event-owned fallback fixture. |
| C08 | Customer Email Triage | To define | Receive a customer email, analyze sentiment, assign priority and team, create a Trello card, and send an automatic reply. | Define routing rules, email and Trello setup, safe reply copy, and test fixtures that do not contact real people. |
| C09 | WhatsApp Calendar Bot | To define | Build a WhatsApp bot that reads or manages calendar availability. | Define commands and whether it only checks availability or may create and reschedule events; confirm sandbox credentials. |
| C10 | Hello n8n — Hello Valencia | Beginner | Use a Manual Trigger and return “Hello Valencia” with the current date and time. | Define the output fields and timezone; suitable as a very short onboarding exercise. |
| C11 | Smart Contact Form | Beginner | Receive name, email, company, and message from an n8n Form or Webhook; store the lead; send confirmation email; and notify Slack. Bonus: handle missing fields safely. | Choose Google Sheets or Airtable and provide safe email, Slack, and storage test access or fallbacks. |
| C12 | Daily Weather Notification | Beginner | Run each morning, fetch city weather, format a briefing, and send it by Slack, Telegram, or email. Bonus: warn about rain or extreme temperatures. | Choose a no-card weather API and define warning thresholds and the primary delivery channel. |
| C13 | Alien Translator | Intermediate | Receive an alien message such as “blorp 42 banana Valencia zzzrrtt” through n8n Form or Chat and decode it with AI. | Define a repeatable language rule or rubric so mentor verification is objective. |
| C14 | Valencia Citizen Request Classifier | Intermediate | Classify a submitted citizen request into category, urgency, location, and summary, then save it to a spreadsheet. | Define allowed categories, urgency levels, location handling, ambiguous-input behavior, and a spreadsheet fixture. |
| C15 | Valencia AI Trip Planner | Intermediate | Generate a personalized daily Valencia itinerary from trip length, selected interests, and custom interests. | Decide whether it uses live place data, supplied knowledge, or both; define expectations for travel time and opening hours. |
| C16 | Valencia Helpful Contacts MCP Server | Advanced | Create an MCP server, connect it to Claude or ChatGPT, and expose a tool that returns relevant public contacts such as an Ayuntamiento phone number. | Define the authoritative dataset, supported intents, hosting/setup path, client, and no-result behavior. |
| C17 | Valencian Food by Your Taste | Advanced | Suggest Valencian dishes from freely entered ingredients or preferences and recommend a restaurant with a Google Maps link. | Define dietary-safety wording, restaurant data source, stale venue handling, and whether live search is required. |
| C18 | Talk to Google Sheets through WhatsApp | Advanced | Query or update a Google Sheet from WhatsApp using natural language. | Define permissions, allowed operations, mutation confirmation, row identification, and sandbox credentials. |
| C19 | Calendar Meeting-Slot Assistant | Intermediate | Read calendar availability and suggest meeting slots that satisfy attendee constraints. | Define provider, timezones, working hours, duration, conflicts, and whether the workflow proposes only or also books. |
| C20 | Idealista Morning Apartment Brief | Advanced | Send a daily briefing with newly listed apartments matching the user's preferences. | Confirm a permitted stable data source; define deduplication, ranking, delivery channel, and a fixture fallback. |

## Future selection criteria

Before promoting an idea into a future challenge set, assess:

- Learning value and concept coverage.
- Expected completion time.
- Credential and signup friction.
- Third-party reliability and availability of event-owned fixtures.
- Speed and objectivity of mentor verification.
- English and Spanish content effort.
- Overlap with challenges already in the active set.
