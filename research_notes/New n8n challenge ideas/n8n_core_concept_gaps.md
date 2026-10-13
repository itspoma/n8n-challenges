# Fundamental (non-AI) n8n concepts the n8n-challenges.app set does not yet teach (as of 2026-10-06)

Conventions used below. Coverage codes: **P** = the challenge's primary concept, **S** = taught in the core task, requirements or tips, **B** = taught only in the bonus, **I** = incidental (it appears only in the stored solution JSON and is never explained to the learner). Repository sources are local files in `/Users/romanr/Development/n8n-challenges/` (read-only). Web sources were fetched on 2026-10-06. Forum tag counts are cumulative, all-time numbers of tagged topics from `community.n8n.io/tags`. Tags are optional, so treat them as relative demand signals, not absolute frequencies.

## Q1. Coverage matrix: which n8n concepts and node types do the 13 existing challenges teach?

### Takeaway
The set teaches a narrow but solid non-AI core:
- a GET webhook with a text response
- Schedule, Form, Telegram and Tally triggers
- the list-processing nodes (Split Out, Filter, Sort, Limit, Aggregate, Remove Duplicates) and IF
- Data Table inserts
- HTTP GET with pagination and Retry On Fail
- Loop Over Items with Wait-based throttling, and one Error Trigger workflow

Seven of the 13 challenges have AI as their primary concept. Nothing teaches Merge, Switch, Summarize, Compare Datasets, the Code node, sub-workflows, error outputs or Stop and Error, binary-file conversion, webhook authentication or status codes, human approvals, Luxon dates, polling triggers, databases, or the debugging toolkit (pinned data, partial executions, Debug in editor).

### Cited Findings

**Table A – the 13 challenges, from each file's metadata and `# English` section**

| # | Title (level · time · complexity) | Stated concept | Listed nodes | Non-AI techniques actually taught | Source |
|---|---|---|---|---|---|
| 01 | Valencia Greeting (beginner · 10–15 min · 1) | Webhook triggers, query parameters and browser responses | Webhook, Edit Fields (Set), Respond to Webhook | GET method and path; Respond set to "Using Respond to Webhook Node"; Text response; an expression that reads `?name=` with a fallback (bonus); Test URL vs Production URL after publishing | [01](/Users/romanr/Development/n8n-challenges/content/challenges/01-webhook-welcome.md) |
| 02 | Air Quality in Valencia (beginner · 20–30 · 2) | Chat triggers, HTTP requests and mapping response data | Telegram Trigger, HTTP Request, Edit Fields (Set), Schedule Trigger, Telegram | GET on Valencia open data; mapping by column positions; bonus: select a row by address, conditional emoji, 6-hour schedule to a fixed chat ID, workflow timezone, publish | [02](/Users/romanr/Development/n8n-challenges/content/challenges/02-valencia-telegram-bot.md) |
| 03 | Don't Miss a New Contact (beginner · 20–30 · 2) | n8n Forms and Data Tables; Tally and validation for the bonus | Form Trigger, Tally Trigger, Edit Fields (Set), IF, Data Table, n8n Form, Resend | Single-page form; Data Table insert (automatic `createdAt`); Form Ending; bonus: third-party trigger, IF validation of missing values and email format, Resend notification | [03](/Users/romanr/Development/n8n-challenges/content/challenges/03-form-to-follow-up.md) |
| 04 | Get City Problems to the Right People (intermediate · 30–40 · 3) | AI agents, request routing and email delivery | Form Trigger, AI Agent, OpenRouter Chat Model, Send Email | Routing is done by an AI agent choosing among Send Email tools, not by Switch; SMTP credential through Resend | [04](/Users/romanr/Development/n8n-challenges/content/challenges/04-valencia-citizen-request-classifier.md) |
| 05 | Your Morning Brief (intermediate · 30–40 · 3) | Schedules, list processing and messaging | Schedule Trigger, Trello, Filter, Edit Fields (Set), Sort, Limit, Aggregate, Telegram | Weekday 09:00 Europe/Madrid schedule; chaining Trello list → cards with a mapped ID; Filter, Limit, Aggregate into one message; empty-board message; bonus: rank and due-date sort | [05](/Users/romanr/Development/n8n-challenges/content/challenges/05-trello-morning-brief.md) |
| 06 | Generate an Article with AI Without Opening n8n (intermediate · 30–45 · 3) | Building and running a workflow through an external AI assistant (MCP) | Form Trigger, Basic LLM Chain, OpenAI and OpenRouter Chat Models, Structured Output Parser, WordPress | No manual node work; WordPress OAuth2 | [06](/Users/romanr/Development/n8n-challenges/content/challenges/06-ai-workflow-builder.md) |
| 07 | Find Your Valencia Apartment (intermediate · 45–60 · 4) | Scheduled structured web extraction, filtering and cross-run deduplication | Schedule Trigger, Firecrawl, Split Out, Filter, Remove Duplicates, If, Sort, Limit, Aggregate, Telegram | Remove Duplicates across executions on `listingId`; Always Output Data; static day-1 and day-2 fixture pages | [07](/Users/romanr/Development/n8n-challenges/content/challenges/07-idealista-morning-brief.md) |
| 08 | What's for Dinner? (advanced · 60–75 · 5) | Custom MCP servers, agent tool orchestration, catalog grounding | Telegram Trigger, AI Agent, OpenRouter, MCP Client Tool, Calculator, Telegram, MCP Server Trigger, HTTP Request Tool ×3 | Inspecting execution evidence of tool calls | [08](/Users/romanr/Development/n8n-challenges/content/challenges/08-mercadona-mcp-assistant.md) |
| 09 | Keep Restaurant Orders Moving (advanced · 45–60 · 5) | Pagination, retries, batching, validation, rejected records, resilient error handling | Manual Trigger, HTTP Request, Split Out, IF, Edit Fields (Set), Loop Over Items, Wait, Data Table, Error Trigger | HTTP pagination with a completion expression on `hasNext`; Retry On Fail (solution uses 5 tries, 2,000 ms); IF validation into two Data Tables; bonus: Loop Over Items with batch size 1 plus Wait, a sum over all items, and a separate Error Trigger workflow | [09](/Users/romanr/Development/n8n-challenges/content/challenges/09-unstable-restaurant-orders.md) |
| 10 | Ask Your Google Drive (advanced · 45–60 · 5) | Document ingestion and semantic retrieval | Manual Trigger, Google Drive ×2, Loop Over Items, Default Data Loader, Recursive Character Text Splitter, Embeddings OpenAI, Simple Vector Store ×2, Chat Trigger, OpenAI Chat Model, AI Agent | Google OAuth; a binary `data` field passed into the loader | [10](/Users/romanr/Development/n8n-challenges/content/challenges/10-google-drive-rag.md) |
| 11 | Alien Translator (beginner, "more" collection · 15–25 · 2) | Prompt design, AI-assisted building and structured output | Chat Trigger, Basic LLM Chain, OpenAI Chat Model, Structured Output Parser | Built only through AI Assistant prompts | [11](/Users/romanr/Development/n8n-challenges/content/challenges/11-alien-translator.md) |
| 12 | Your First AI Agent (beginner, "more" · 15–25 · 2) | AI agents, tools and memory | Chat Trigger, AI Agent, OpenRouter Chat Model, Wikipedia, Simple Memory | — | [12](/Users/romanr/Development/n8n-challenges/content/challenges/12-wikipedia-ai-agent.md) |
| 13 | AI Agent: Photo to Summary (beginner, "more" · 20–30 · 2) | Image understanding, AI Agent and translation | Telegram Trigger, Edit Fields (Set), AI Agent, OpenRouter Chat Model, Telegram | Download Images/Files (binary); Include Other Input Fields; Strip Binary Data turned off | [13](/Users/romanr/Development/n8n-challenges/content/challenges/13-telegram-photo-summary.md) |

**Table B – concept coverage status**

| Area | Concept or node | Status | Where |
|---|---|---|---|
| Triggers | Manual Trigger | Covered | 09 S, 10 S |
| | Webhook – GET, path, query parameters | Covered | 01 P |
| | Webhook – POST/JSON body, Basic/Header/JWT authentication, Only Run If, IP allowlist, CORS | **Missing** | — |
| | Respond to Webhook – Text | Covered | 01 P |
| | Respond to Webhook – JSON, status codes, headers, redirect, binary | **Missing** | 09 I (organizer provider workflow only) |
| | Schedule Trigger – intervals and weekdays, workflow timezone, publish | Covered | 02 B, 05 P, 07 S |
| | Schedule Trigger – Custom (Cron), DST behaviour, "If Execution Is Missed" | **Missing** | — |
| | n8n Form Trigger + single-page Form Ending | Covered | 03 P, 04 S (06 via chatbot) |
| | Multi-page n8n Forms, form branching, form authentication, query-parameter prefill | **Missing** | — |
| | App webhook triggers (Telegram Trigger, Tally Trigger) | Covered | 02, 08, 13; 03 B |
| | Chat Trigger (in-editor chat) | Covered (AI context) | 10, 11, 12 |
| | Embedded or public chat | **Missing** | — |
| | Error Trigger + error-workflow setting | Partial | 09 B |
| | Polling triggers (RSS Feed Trigger, Email Trigger (IMAP), Gmail Trigger, Google Sheets Trigger) | **Missing** | — |
| | Execute Sub-workflow Trigger, n8n Trigger, Local File Trigger | **Missing** | — |
| Data | Edit Fields (Set) mapping | Covered | 01, 02, 03, 05, 09, 13 |
| | Expressions: `$json` paths and simple formulas | Partial | 01 B tip, 02, 05 B, 09 |
| | Referencing other nodes (`$('Node').item`, `.first()`, `.all()`), `$input`, item linking and paired items | **Missing as a concept** | I: `$('…').item` in 03, 04, 11, 13; `.first()` in 02, 08, 09; `$input.all()` in 09 |
| | Luxon dates and the Date & Time node | **Missing** | I: `$now` in 09 bonus |
| | JMESPath | **Missing** | — |
| | Split Out | Covered | 07 S, 09 S |
| | Filter, Sort, Limit, Aggregate | Covered | 05, 07 |
| | Remove Duplicates (including across executions) | Covered | 07 P |
| | IF | Covered | 03 B, 07 B, 09 |
| | Switch, Merge, Summarize, Compare Datasets, Rename Keys | **Missing** | — |
| | Code node (JavaScript or Python) | **Missing for learners** | 09 I (organizer provider workflow only) |
| | Crypto, HTML, XML, Markdown, JWT, TOTP | **Missing** | — |
| | Extract from File, Convert to File, Compression, Edit Image, Read/Write Files from Disk | **Missing** | Binary passthrough only: 10, 13 |
| | Data Table – insert | Covered | 03 P, 09 S |
| | Data Table – get, update, upsert, If Row (Does Not) Exist, delete; using a table as state for idempotency | **Missing** | — |
| | Always Output Data | Covered | 07 B (05 I) |
| Flow and reliability | Loop Over Items | Covered | 09 B, 10 S |
| | Wait – time interval | Covered | 09 B |
| | Wait – On Webhook Call or On Form Submitted (`$execution.resumeUrl`) | **Missing** | — |
| | Retry On Fail | Covered | 09 S |
| | HTTP pagination | Covered | 09 P |
| | On Error → Continue / Continue (using error output) | **Missing** | — |
| | Stop and Error, sub-workflows, Send and Wait for Response (human approval), execution order | **Missing** | — |
| Integration | HTTP Request – GET on a public JSON API | Covered | 02 P, 09 |
| | HTTP Request – POST/PUT/PATCH/DELETE, generic credentials (Header, Basic, Query, OAuth2), cURL import, Include Response Headers and Status, Never Error | **Missing** | — |
| | App-node credentials (bot tokens, API keys, OAuth2) | Covered | Telegram 02/05/07/08/13; Trello 05; SMTP/Resend 03 B/04; Google 10; WordPress OAuth2 06; Firecrawl 07; Tally 03 B; OpenRouter/OpenAI 04, 06, 08, 10–13 |
| | Databases (Postgres, MySQL, MongoDB, Redis, Supabase) | **Missing** | — |
| | n8n API / n8n node | **Missing** | 06 uses the instance MCP server, which is AI-driven |
| | SSH, FTP, Execute Command | **Missing** | — |
| Development and operations | Test vs Production URL; publishing | Covered lightly | 01 tip, 02 B, 05, 08 |
| | Workflow timezone setting | Covered | 02 B, 05, 07 |
| | Inspecting past executions | Partial | 08 requirement, 09 tip, 12 tip |
| | Pinned or mock data, partial executions, dirty nodes, Debug in editor | **Missing** | — |
| | Import/export of workflow JSON | **Missing** | — |
| | Sticky notes, Canvas Groups, naming | **Missing** | I: sticky notes in the 08 and 09 solutions |
| | Workflow history and rollback; variables; workflow static data; custom execution data; source control and environments | **Missing** | — |

Sources for Table B: the 13 challenge files above (English sections plus the `# Solution Data` JSON).

**Further findings**
- In challenge 09, the Webhook, Code and Respond to Webhook nodes sit under `## Organizer Provider Workflow JSON`, not under the learner's core or bonus solution. — [09](/Users/romanr/Development/n8n-challenges/content/challenges/09-unstable-restaurant-orders.md)
- Level distribution:
  - Beginner: 01, 02, 03, 11, 12 and 13. Only 01, 02 and 03 are non-AI.
  - Intermediate: 04, 05, 06 and 07.
  - Advanced: 08, 09 and 10.

  Challenges 11–13 use `collection: more`. — [README](/Users/romanr/Development/n8n-challenges/content/challenges/README.md) and the challenge front matter
- Challenge format constraints:
  - exactly 3 requirements, exactly 5 progressive tips, a bonus task, a full node list and a preparation list
  - all workflow JSON is embedded in the challenge Markdown, and standalone `.json` files are forbidden
  - organizer provider workflows must not be exposed to learners

  — [README](/Users/romanr/Development/n8n-challenges/content/challenges/README.md)
- The MVP plan still describes a 10-challenge, mentor-verified event, and its table names challenge 2 "Valencia Noise Telegram Bot". The current title is "Air Quality in Valencia", so the plan is partly outdated. — [N8N_CHALLENGES_PLAN.md](/Users/romanr/Development/n8n-challenges/docs/N8N_CHALLENGES_PLAN.md)
- The backlog (C01–C21) is the source of the known ideas listed in the brief:
  - C04 n8n to-do backend
  - C10 Hello n8n
  - C11 smart contact form
  - C12 daily weather
  - C19 calendar meeting-slot assistant

  — [CHALLENGE_IDEA_BACKLOG.md](/Users/romanr/Development/n8n-challenges/docs/CHALLENGE_IDEA_BACKLOG.md)

### Inferences
- **AI-heavy:** 7 of 13 challenges are AI-first (04, 06, 08, 10, 11, 12, 13). A self-paced learner who skips AI has only six non-AI challenges, and just three of them are beginner level.
- **Happy-path only:** most covered nodes are taught on the happy path. IF is used for validation, but nothing teaches multi-way routing, combining data streams, reusable building blocks or per-node failure handling – the skills the Academy's N8N102 course treats as the "technical core" (see Q5).
- **Expressions are used, not taught:** expressions appear throughout the solutions (`$('Node').item`, `.first()`, `$input.all()`), but no challenge explains item linking. That is the subject of the site's own "Tracing n8n Item Linking Errors" article (see Q6).

### Gaps
- Only the English sections were read, as the brief instructed. Spanish and Ukrainian parity was assumed, not checked.
- The solution PNGs were not inspected. The coverage codes come from the text and the embedded JSON.

## Q2. What is the current n8n version, and what changed in 2025–2026 that a challenge must respect?

### Takeaway
The current stable line is **n8n 2.x**, latest **2.42 (released 2026-09-29)**. **n8n 3.0 is scheduled for October 2026** and had not been released as of 2026-10-06.

New challenges must be written for:
- publish/unpublish with autosave, not activate/deactivate
- Code-node task runners and their restrictions
- self-hosted Execute Command and Local File Trigger being disabled by default
- current node names and versions (Execute Sub-workflow, Merge 3.2, If 2.3, Switch 3.4)

Content should also stay forward-compatible with 3.0:
- Docker-only self-hosting
- removal of legacy nodes and of `$getPairedItem`
- removal of the Execute Sub-workflow Local File and URL sources
- the changed Always Output Data behaviour on multi-output nodes

### Cited Findings

**Versions and dates**
- **2.42 is the newest release:** the release-notes log lists `n8n 2.42` as the newest entry, released 2026-09-29. The log also links to an official RSS feed of entries. — [Release notes](https://docs.n8n.io/changelog/release-notes); [feed](https://raw.githubusercontent.com/n8n-io/n8n-docs/main/feeds/release-notes.xml), whose newest items are dated Tue, 29 Sep 2026
- **3.0 is scheduled for October 2026:** the 3.0 page describes "the upcoming transition to n8n 3.0, scheduled for October 2026" and says the page will be updated "as n8n 3.0 approaches its release." — [v3.0 Breaking changes](https://docs.n8n.io/changelog/v30-breaking-changes)
- **2.0 release dates:** n8n announced 2.0.0 beta for Dec 8 and 2.0.x stable for Dec 15, 2025. The announcement says the changes apply to everyone, including free self-hosted Community Edition. — [Forum: Announcing n8n version 2.0](https://community.n8n.io/t/226475)
- **Release log for 2.0–2.3:**
  - 2.0: "Workflow activation now requires a trigger node", released 2025-12-08
  - 2.1: 2025-12-15
  - 2.2: 2025-12-22
  - 2.3: "Data Table node gains full CRUD operations", 2026-01-05

  — [Release notes](https://docs.n8n.io/changelog/release-notes)

**2.0 changes that affect challenge design** — all from [v2.0 Breaking changes](https://docs.n8n.io/changelog/v20-breaking-changes) unless noted:
- **Publish replaces activate:** "Activate/Deactivate" toggles became "Publish/Unpublish". Edits autosave as drafts (typically within 1–5 seconds) and go live only when published. Publishing switches webhook and form triggers to their production URLs and starts schedules. — [Save and publish](https://docs.n8n.io/build/understand-workflows/save-and-publish-workflows); autosave shipped in 2.4 ([Release notes](https://docs.n8n.io/changelog/release-notes))
- **Start node removed:** use Manual Trigger for manual runs, or the Execute Workflow Trigger for sub-workflows.
- **Code node runs on task runners:**
  - Code nodes run on task runners by default.
  - Environment-variable access from the Code node is blocked by default (`N8N_BLOCK_ENV_ACCESS_IN_NODE=true`).
  - `$evaluateExpression()` no longer works inside the Code node.
- **Python changes:**
  - The Pyodide Python Code node was removed.
  - Self-hosted Python needs task runners in external mode (the separate `n8nio/runners` image).
  - Native Python supports only `_items`/`_item` and bracket notation.
  - On n8n Cloud, the Python option cannot import any library.
  - On Cloud, JavaScript cannot import external npm modules; only `crypto` and `moment` are provided.

  — [Code node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code)
- **Risky nodes disabled:** ExecuteCommand and LocalFileTrigger are disabled by default through `NODES_EXCLUDE`. Both nodes are also unavailable on n8n Cloud. — [Execute Command](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executecommand); [Local File Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.localfiletrigger)
- **File access restricted:** `N8N_RESTRICT_FILE_ACCESS_TO` now defaults to `~/.n8n-files` for the file nodes. Since 2.32, the Read/Write File node shows a notice on n8n Cloud that it can only access paths under `/home/node/`. — [Release notes 2.32](https://docs.n8n.io/changelog/release-notes)
- **Sub-workflows after a wait:** when a child workflow enters a waiting state (a Wait longer than 65 seconds, a webhook or form wait, or a human-in-the-loop node), the parent now receives the child's final output. This "allows using human-in-the-loop nodes in the sub-workflow".
- **Other 2.0 changes:**
  - OAuth callback URLs require authentication by default.
  - The in-memory binary mode was removed (`filesystem` by default, `database` in queue mode).
  - MySQL/MariaDB are no longer supported as n8n's own database; the MySQL node remains.
  - **`n8n --tunnel` was removed**; use ngrok, localtunnel or Cloudflare Tunnel instead.
  - Release channels were renamed to `stable` and `beta`.

**2.x additions relevant to fundamentals** — from the [Release notes](https://docs.n8n.io/changelog/release-notes) unless noted:
- **Data Tables:**
  - The Data Table node gained full CRUD in 2.3. Row operations: Delete, Get, If Row Exists, If Row Does Not Exist, Insert, Update, Upsert. — [Data Table node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable)
  - In 2.30 the table operation "Update" was renamed "Rename", and a "Clear" operation was added.
- **Webhooks:**
  - The Webhook node gained "Only Run If" in 2.28.
  - The Webhook node offers n8n User Auth with a "Require Workflow Execute Permission" toggle (2.34).
  - Webhook signature verification was added to many app trigger nodes in 2.20–2.22.
- **Crypto:** Encrypt/Decrypt arrived in 2.22 and HMAC-SHA1 in 2.25.1. Hmac, Sign, Encrypt and Decrypt now use a Crypto credential. — [Crypto](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto)
- **Sub-workflows:**
  - Execute Sub-workflow Trigger v1.2 returns items from every run of the last node (2.23).
  - The Execute Workflow "Local File" and "URL" sources were deprecated in 2.34.
  - The "Any workflow" caller policy was deprecated in 2.37 ahead of removal in v3.
- **Schedule Trigger:** "If Execution Is Missed" (node v1.4) and a per-node "Missed Execution Grace Period" arrived in 2.36.
- **Forms:**
  - Form Trigger gained n8n User Auth (2.25.1) and "Show Headers" (2.31).
  - The Form node can return several files (2.31).
- **Merge:** the SQL Query mode gained `?` query parameters (2.31). Merge can now be found by searching "Append" and "Combine" (2.35).
- **Human approval:** enhanced HITL approval options for Slack and Telegram, such as restricting who can respond and capturing who approved (2.35). Forum posts describe HITL additions in 2.5/2.6. — [Forum: New human-in-the-loop capabilities](https://community.n8n.io/t/258423)
- **HTTP Request:** a "Simplified Custom Auth" generic credential (2.34/2.35).
- **Workflow history:** side-by-side compare (2.11), switching versions in the diff (2.12) and a Publish Timeline tab (2.22).
- **Editor and organisation:**
  - Canvas Groups rolled out from 2.28 and are on all instances from 2.31. — [Canvas Groups](https://docs.n8n.io/build/understand-workflows/workflow-components/canvas-groups)
  - Variables and data tables can be created from the "+" menu (2.27).
  - `$getPairedItem` is flagged as deprecated in the editor (2.30).
  - The Code node's "Ask AI" tab was removed (2.39).
  - "AI Assistant" was renamed "n8n Assistant" (2.40).

**Current node versions** (the versioned-nodes table): If 2.3, Switch 3.4, Merge 3.2, Execute Sub-workflow 1.4, Execute Sub-workflow Trigger 1.2, HTTP Request 4.5, Webhook 2.1, Respond to Webhook 1.5, Wait 1.1, Schedule Trigger 1.4, n8n Form 2.5, n8n Form Trigger 2.6, Code 2, Date & Time 2, Compare Datasets 2.3, Filter 2.3, Summarize 1.1, Convert to File 1.1, Crypto 2, HTML 1.2, Email Trigger (IMAP) 2.2, Gmail Trigger 1.4, Telegram 1.2, Send Email 2.1, Remove Duplicates 2, Chat Trigger 1.5, Postgres 2.7. Deprecated nodes listed there include HTTP Request Tool (final version 1.1), Item Lists (3.1), Spreadsheet File (2), Function, Cron and Interval. — [Deprecated nodes](https://docs.n8n.io/integrations/builtin/deprecated-nodes)

**Planned 3.0 changes** — all from [v3.0 Breaking changes](https://docs.n8n.io/changelog/v30-breaking-changes):
- **Docker-only self-hosting:** self-hosted n8n will require Docker; `npm`/`npx n8n` installs are no longer supported.
- **Removed nodes:**
  - Function, Function Item, Item Lists, Cron, Interval
  - HTML Extract (use HTML → Extract HTML Content), iCalendar (use Convert to File → ICS)
  - Convert to/from binary data, Read/Write Binary File(s), Read PDF (use Extract from File)
  - Workflow Trigger (use n8n Trigger), Manual Chat Trigger
  - the legacy HTTP Request Tool. "Using the HTTP Request node as a tool stays."
  - AI Transform is auto-migrated to Code.
- **`$getPairedItem` removed:** use `pairedItem` or `$("<node>").item`.
- **Execute Sub-workflow:** the Local File and URL sources are removed.
- **Always Output Data:** on nodes with several outputs (If, Switch), an empty item is now added only when *every* output is empty.
- **Other changes:**
  - Task runner timeout default falls from 300 s to 60 s.
  - Unverified community packages are off by default (`N8N_UNVERIFIED_PACKAGES_ENABLED=false`).
  - Workflow import from URL in the editor is removed; copy-paste, Import from File, the CLI and the API remain.
  - Chat Trigger WebSocket frames become JSON (`@n8n/chat` ≥ 1.31.0).
  - Compression limits fall to 256 MiB and 1,000 entries.
  - AI Agent v1 modes are removed.

**Side impacts on the existing set**
- Challenge 11 says "AI Assistant" throughout, but the feature was renamed "n8n Assistant" in 2.40. — [11](/Users/romanr/Development/n8n-challenges/content/challenges/11-alien-translator.md); [Release notes 2.40](https://docs.n8n.io/changelog/release-notes)
- Challenge 08's solution uses `n8n-nodes-base.httpRequestTool` with `typeVersion: 4.5`. The deprecated "HTTP Request Tool" ends at version 1.1, and 3.0 keeps "the HTTP Request node as a tool". — [08](/Users/romanr/Development/n8n-challenges/content/challenges/08-mercadona-mcp-assistant.md); [Deprecated nodes](https://docs.n8n.io/integrations/builtin/deprecated-nodes); [v3.0](https://docs.n8n.io/changelog/v30-breaking-changes)
- Challenge 03's bonus uses the community package `n8n-nodes-tallyforms`. — [03](/Users/romanr/Development/n8n-challenges/content/challenges/03-form-to-follow-up.md)

### Inferences
- **Self-hosted setup copy:** any "self-hosted" preparation text should say Docker, not npm, to survive 3.0. Learners on localhost cannot rely on `n8n --tunnel` for third-party webhooks such as Telegram, so challenges that only call the learner's own webhook from curl or a browser are friendlier to self-hosters.
- **Code-node seeds:** they should use JavaScript. Python needs extra runner setup on self-hosted, and on Cloud it cannot import libraries.
- **Seeds that use If or Switch with Always Output Data** should be written to the 3.0 semantics.
- **Existing challenge checks:**
  - Challenge 08 is most likely unaffected by the 3.0 removal of the legacy HTTP Request Tool, since it uses the v4.5 tool variant. Re-test it after 3.0 ships.
  - Challenge 11 needs a terminology update.
  - Self-hosted learners on 3.0 may need `N8N_UNVERIFIED_PACKAGES_ENABLED=true` to install the Tally node in challenge 03, if that package is unverified.

### Gaps
- The 3.0 page is pre-release ("n8n will update this page…"), so the final removals and the release date may change.
- I could not confirm whether `n8n-nodes-tallyforms` is a *verified* community package.
- I did not test whether Telegram "Send and Wait" approval links work for a self-hosted localhost learner without a public URL.

## Q3. Which data-handling skills are untaught?

### Takeaway
Almost the whole "Work with data" half of n8n is untaught:
- the item model and node referencing (item linking)
- Luxon dates and the Date & Time node
- the Code node
- Merge, Switch, Summarize and Compare Datasets
- every file and binary conversion node
- the format nodes: HTML, XML, Markdown, Crypto

The covered list nodes are the exception. Evidence of importance is strongest for data transformation and expressions, Code, Merge and binary files.

### Cited Findings

**Item model, expressions and item linking** (`$json`, `$('Node').item` vs `.first()`/`.last()`/`.all()`, `$input`) — status: **missing**, used incidentally.
- `.item` fails when the item thread is broken or points to several items. Summarize, Aggregate and Merge can create the "Multiple matching items" error.
- Code nodes must return pairing information, otherwise you get "Info for expressions missing from previous node".

Evidence of importance:
- N8N101 teaches "Map, transform, and merge data between nodes". — [N8N101](https://learn.n8n.io/courses/course-v1:n8n+N8N101+2026H2/about)
- Forum tags: data-transformation 1,981 and expressions 336. — [community tags](https://community.n8n.io/tags)
- The site's own articles: [item linking](/Users/romanr/Development/n8n-challenges/content/blog/en/article-630cee15-f31a-4e34-be1c-fb4015601bd9.md) and [nested JSON](/Users/romanr/Development/n8n-challenges/content/blog/en/article-b0999045-95ca-4925-b7e8-40f4bfbe4cdb.md).
- Docs: [Item linking errors](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/item-linking-errors). `$getPairedItem` is removed in 3.0.

**Dates and time zones** (Luxon in expressions; the Date & Time node with Add, Subtract, Format, Extract Part, Get Current Date, Get Time Between Dates, Round) — status: **missing**; only the workflow timezone is covered.
- If neither the workflow nor the instance timezone is set, n8n defaults to New York time. — [Date & Time](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datetime); [Workflow settings](https://docs.n8n.io/build/manage-workflows/configure-workflow-settings)
- Forum tags: date-time 77, schedule-trigger 77, cron 43, transform-date 22, luxon 14, timezone 10. — [tags](https://community.n8n.io/tags)
- The site has an article on time zones and DST. — [blog](/Users/romanr/Development/n8n-challenges/content/blog/en/article-8fd5c0ad-feea-45df-8edf-8ea55c749272.md)

**JMESPath** (`$jmespath`) — status: **missing**.
- Docs page: [Query JSON data](https://docs.n8n.io/build/work-with-data/handle-special-data-types/query-json-data). Forum jmespath tag: 14 (low).

**Code node (JavaScript)** — status: **missing for learners**.
- Two modes: Run Once for All Items (default) and Run Once for Each Item. — [Code](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code)
- Forum tags: code 372, javascript 105. N8N102 includes the Code node (JS/Python). — [N8N102](https://learn.n8n.io/courses/course-v1:n8n+N8N102+2026H2/about)
- Site article: [Code debugging](/Users/romanr/Development/n8n-challenges/content/blog/en/article-fec20a20-097e-462f-bbd5-1e4aa1c6f721.md).
- Constraints are listed in Q2. In 3.0 the task timeout falls to 60 s.

**Merge (v3.2)** — status: **missing**.
- Modes:
  - Append
  - Combine by Matching Fields (Keep Matches, Keep Non-Matches, Keep Everything, Enrich Input 1, Enrich Input 2), by Position, or by All Possible Combinations
  - SQL Query
  - Choose Branch
- Options include Fuzzy Compare and Clash Handling. — [Merge](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.merge)
- Forum merge tag: 202. Merging is in N8N101, N8N102 and QS101. — [QS101](https://learn.n8n.io/courses/course-v1:n8n+QS101+2026H2/about)
- Site article: [Merge](/Users/romanr/Development/n8n-challenges/content/blog/en/article-ac9d26c4-8b42-4332-9b67-ffed8e320b2d.md).

**Switch (v3.4)** — status: **missing**.
- Rules or Expression mode, with a Fallback Output. — [Switch](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.switch)
- Forum tags: switch 49, if 168. Switch is in N8N102. Site article: [Switch](/Users/romanr/Development/n8n-challenges/content/blog/en/article-fb7e0789-2f09-4ee0-80a5-4bc869a9b6e1.md).

**Summarize and Compare Datasets** — status: **missing**.
- Summarize aggregates fields, optionally split by other fields. — [Summarize](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.summarize)
- Compare Datasets outputs four branches: In A only, Same, Different, In B only. — [Compare Datasets](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.comparedatasets)
- Summarize is in N8N102 and QS101 ("summarizing"). Forum compare-datasets tag: 23.

**Rename Keys** — status: **missing**.
- Forum rename-keys tag: 5 (low). — [Rename Keys](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.renamekeys)

**Files and binary data** — status: **missing**; only binary passthrough appears in 10 and 13.
- Extract from File reads CSV, HTML, JSON, ICS, ODS, PDF, RTF, text, XLS and XLSX, and can move a file to base64. — [Extract from File](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile)
- Convert to File writes CSV, HTML, ICS, JSON, ODS, RTF, text, XLS and XLSX, and can turn base64 into a file. — [Convert to File](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.converttofile)
- Compression handles Zip, Gzip, Tar and Tar (Gzip). — [Compression](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.compression)
- Forum tags, current plus legacy node names: spreadsheet-file 85, move-binary-data 61, write-binary-file 54, read-binary-file 47, read-pdf 46, extract-from-file 29, compression 12, binary-data 12.
- N8N101 covers "binary data handling" and QS101 covers "file operations". The 3.0 removals listed in Q2 make the legacy file nodes obsolete.

**HTML, XML and Markdown** — status: **missing**.
- HTML: Extract HTML Content with CSS selectors, plus HTML-table options. XML: JSON ↔ XML. Markdown: Markdown ↔ HTML. — [HTML](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.html); [XML](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.xml); [Markdown](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.markdown)
- Forum tags: html-extract 50, html 48, xml 45, markdown 18.

**Crypto and JWT** — status: **missing**.
- Crypto: Hash, Hmac, Sign, Generate, Encrypt and Decrypt. Hmac, Sign, Encrypt and Decrypt need a Crypto credential. — [Crypto](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto); [JWT](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.jwt)
- Forum crypto tag: 25. Webhook signature verification is a 2026 product theme (Q2).

**Data Table beyond insert** (get, upsert, If Row Does Not Exist; using a table as state for idempotency) — status: **missing**; only insert is taught.
- Default total storage is 200 MiB per instance. Warnings appear at 80%, and exceeding the limit causes execution errors. — [Data tables](https://docs.n8n.io/build/work-with-data/data-tables)
- N8N102 covers "Data Tables for workflow data storage and reuse". Site articles: [idempotent webhook](/Users/romanr/Development/n8n-challenges/content/blog/en/article-1bcc50d4-01fe-44dd-a5c0-9325c275c2ec.md) and [duplicate prevention](/Users/romanr/Development/n8n-challenges/content/blog/en/article-079e1c10-36b0-4b31-8b6d-02264aa2e2e3.md).

**Docs structure:** the "Build" docs group these fundamentals under "Work with data": expressions vs data nodes, item linking, the expression reference, files and images, dates and times, JMESPath, data tables, and pin and mock data. — [docs sitemap](https://docs.n8n.io/sitemap.md)

### Inferences
- **Two most valuable data challenges:**
  - expressions and item linking, a beginner–intermediate bridge
  - Merge with Compare Datasets
- **Binary files** are the third: they map to common real-world requests (CSV/XLSX/PDF) and to N8N101 content, and the 3.0 node removals make up-to-date guidance valuable.
- **Fold the low-demand nodes into larger seeds:** Rename Keys, JMESPath, XML and Markdown are better as small parts of bigger challenges than as stand-alone challenges.

### Gaps
- Forum tag counts are all-time and optional, and some tag names appear twice in the tag list (two "http-request" and "data-transformation" entries; I used the larger main entries). No per-year question frequency was available.
- I did not measure how often each node appears in n8n's template gallery.

## Q4. Which workflow-architecture and reliability skills are untaught, and which are self-hosted-only or plan-gated?

### Takeaway
Architecture and reliability gaps:
- error outputs ("try/catch") and Stop and Error
- sub-workflows
- webhook authentication, status codes and idempotency
- human approval (send-and-wait, or Wait on a webhook or form)
- generic HTTP authentication and the non-GET methods
- polling triggers
- the debugging toolkit (pinned data, partial executions, Debug in editor)

All of these work on a Cloud trial and on free Community Edition, with two exceptions: **Debug in editor** needs Cloud or a free *Registered* CE, and **custom execution data** needs Cloud Pro or the trial, or Registered CE.

Several "operations" features cannot be required in a challenge:
- **Variables:** Cloud Pro/Enterprise or self-hosted Business/Enterprise; not plain CE.
- **The n8n API:** not on the Cloud free trial.
- **Source control, environments, log streaming and workflow reviews:** Business/Enterprise only.
- **Execute Command and Local File Trigger:** self-hosted only, and disabled by default.

### Cited Findings

| Concept | Status in set | Availability | Key facts | Source |
|---|---|---|---|---|
| Error outputs: On Error → Stop Workflow / Continue / **Continue (using error output)** | Missing | All plans | A node setting next to Always Output Data, Execute Once and Retry On Fail | [Work with nodes](https://docs.n8n.io/build/understand-workflows/workflow-components/work-with-nodes) |
| Stop and Error | Missing | All | Throws an Error Message or Error Object; can feed error workflows | [Stop and Error](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.stopanderror) |
| Error workflow (Error Trigger) | Partial (09 B) | All | Set per workflow in Workflow Settings; one handler can serve many workflows; payload includes `execution.url`, `lastNodeExecuted`, `workflow.name`. **The handler needs no publishing, but you "can't test error workflows when running workflows manually"** – only automatic executions trigger it | [Handle errors](https://docs.n8n.io/build/flow-logic/handle-errors-gracefully); [Error Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger) |
| Sub-workflows: Execute Sub-workflow + Execute Sub-workflow Trigger ("When Executed by Another Workflow") | Missing | All | Input data modes: Define using fields below, Define using JSON example, Accept all data. Parent mode: Run once with all items or once for each item. Option: Wait For Sub-Workflow Completion. "This workflow can be called by" setting; editor "Convert to sub-workflow" | [Execute Sub-workflow](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow); [Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger); [Convert to sub-workflows](https://docs.n8n.io/build/flow-logic/convert-to-sub-workflows) |
| Wait: On Webhook Call or On Form Submitted | Missing (only the time interval is taught, in 09) | All | `$execution.resumeUrl` is unique per execution; Limit Wait Time; waiting executions are offloaded to the database | [Wait](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait) |
| Human approval: "Send and Wait for Response" | Missing | All (needs the channel's credential) | Telegram response types: Approval, Free Text, Custom Form; custom button labels; Limit Wait Time. The SMTP Send Email node also offers Send and Wait. Slack has an Approvals guide | [Telegram message ops](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations); [Send Email](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.sendemail) |
| Webhook security and responses | Missing (01 covers GET/text only) | All | Auth: Basic, Header, JWT (n8n User Auth also exists; its "Require Workflow Execute Permission" toggle arrived in 2.34). Options: Allowed Origins (CORS, default `*`), IP allowlist, Only Run If, Raw Body, Response Headers; maximum payload 16 MB. Respond to Webhook can return all items, binary, first item, JSON, a JWT token, no data, a redirect or text, with Response Code and Headers. An error before Respond to Webhook returns **500**; finishing without it returns a standard **200** | [Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook); [Respond to Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook) |
| HTTP Request: methods and generic credentials | Missing (GET only) | All | Import cURL. Generic credentials: Basic, Custom, Digest, Header, OAuth1, OAuth2, Query, Simplified Custom Auth. Options: Batching, Include Response Headers and Status, Never Error | [HTTP Request](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest) |
| Workflow static data | Missing | All, but **production only** | "Static data isn't available when testing workflows"; JavaScript Code node only; the docs suggest Data Tables instead | [getWorkflowStaticData](https://docs.n8n.io/build/code-in-n8n/cookbook/built-in-methods-and-variables-examples/getworkflowstaticdata) |
| Pinned and mock data; partial executions ("Execute step"); dirty nodes | Missing | All | Pinning is ignored in production executions; Execute step runs a node plus the predecessors it needs | [Pin and mock data](https://docs.n8n.io/build/work-with-data/pin-and-mock-data); [Types of executions](https://docs.n8n.io/build/understand-workflows/understand-executions/types-of-executions); [Dirty nodes](https://docs.n8n.io/build/understand-workflows/understand-executions/understand-dirty-nodes) |
| **Debug in editor** (load a past execution into the editor) | Missing | **Cloud: all plans; self-hosted: Registered Community, Business, Enterprise** | Plain unregistered CE lacks it; registration is free | [Debug executions](https://docs.n8n.io/build/understand-workflows/understand-executions/debug-executions); [Compare editions](https://docs.n8n.io/deploy/host-n8n/community-edition-features) |
| Custom execution data (Execution Data node) | Missing | **Cloud Pro/Enterprise; self-hosted Registered CE/Enterprise** | — | [Execution Data](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executiondata) |
| Workflow history and rollback | Missing | 24 h of versions for everyone; 5 days on Cloud Pro; full history on Enterprise. Named versions: Cloud Pro/Enterprise, self-hosted Business/Enterprise | — | [View change history](https://docs.n8n.io/build/manage-workflows/view-change-history); [Save and publish](https://docs.n8n.io/build/understand-workflows/save-and-publish-workflows) |
| Custom variables (`$vars`) | Missing | **Cloud Pro/Enterprise; self-hosted Business/Enterprise; not CE** | Keys up to 50 characters, values up to 1,000 | [Custom variables](https://docs.n8n.io/build/code-in-n8n/define-custom-variables) |
| n8n API / n8n node | Missing | **Cloud Starter, Pro, Enterprise; all self-hosted editions; not on the Cloud free trial** | The n8n node does not support SSL; use HTTP Request against the API in that case | [n8n API](https://docs.n8n.io/connect/n8n-api); [n8n node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.n8n) |
| Polling triggers | Missing | All; polling runs only when published | RSS Feed Trigger needs only a feed URL and poll times; Email Trigger (IMAP) needs an IMAP credential | [RSS Feed Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger); [Email Trigger (IMAP)](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.emailimap) |
| Schedule Trigger extras | Missing | All | Intervals from seconds to months plus Custom (Cron); requires publishing; uses the workflow timezone, else the instance timezone (self-hosted default America/New York) | [Schedule Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger) |
| Multi-step forms | Missing | All | The n8n Form node builds multi-step forms with branching and a Form Ending. Form Trigger offers Basic or n8n User Auth. Query-parameter prefill works **only in production mode** | [n8n Form](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.form); [Form Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger) |
| Execute Command | Missing | **Self-hosted only; disabled by default since 2.0; not on Cloud** | — | [Execute Command](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executecommand) |
| Local File Trigger | Missing | **Self-hosted only; disabled by default** | — | [Local File Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.localfiletrigger) |
| Read/Write Files from Disk | Missing | Self-hosted access limited to `~/.n8n-files` by default; Cloud limited to `/home/node/` | — | [v2.0](https://docs.n8n.io/changelog/v20-breaking-changes); [Release notes 2.32](https://docs.n8n.io/changelog/release-notes) |
| Source control/Git, environments, log streaming, external secrets, projects, sharing, SSO | Missing | **Not in CE**; Business/Enterprise (Cloud: Enterprise) | — | [Compare editions](https://docs.n8n.io/deploy/host-n8n/community-edition-features); [Cloud trial](https://docs.n8n.io/deploy/use-n8n-cloud/start-your-free-trial) |
| Workflow reviews | Missing | **Enterprise only**, from 2.37 | — | [Workflow reviews](https://docs.n8n.io/build/manage-workflows/workflow-reviews) |
| Sticky notes; Canvas Groups | Missing (incidental in 08/09) | All; Canvas Groups on every instance from 2.31 | — | [Notes](https://docs.n8n.io/build/understand-workflows/workflow-components/add-notes-and-documentation); [Canvas Groups](https://docs.n8n.io/build/understand-workflows/workflow-components/canvas-groups) |

**Cloud trial:** 14 days of Pro-plan features (global variables, Insights dashboard, execution search, five days of workflow history), limited to 1,000 executions on Starter-level compute. The workspace is deleted when the trial ends, and workflows can be downloaded for 90 days afterwards. — [Try free then choose a plan](https://docs.n8n.io/deploy/use-n8n-cloud/start-your-free-trial)

**Community Edition:** excludes custom variables, environments, external secrets, external binary storage, log streaming, multi-main, projects, SSO, sharing and Git version control. Free registration unlocks folders, Debug in editor and custom execution data. — [Compare editions](https://docs.n8n.io/deploy/host-n8n/community-edition-features)

### Inferences
- **Safe to require** (work on both a Cloud trial and plain CE): error outputs, Stop and Error, error workflows, sub-workflows, Wait resume modes, Send-and-Wait approvals, webhook auth and status codes, generic HTTP auth, pinned data and partial executions, multi-step forms, Schedule Cron, polling triggers.
- **Bonus or optional only:**
  - Debug in editor: ask CE users to register for free.
  - Custom execution data.
  - Variables: Cloud trial only, within this audience.
  - The n8n API: CE or paid Cloud only, not the trial.
- **Avoid:** source control, environments, log streaming, reviews, Execute Command and Local File Trigger.
- **Testing error workflows:** because they cannot be tested with manual runs, an error-handling challenge must have the learner publish a Webhook- or Schedule-triggered workflow and force a failure (for example with curl). This matches the site's own article on testing error workflows. — [blog](/Users/romanr/Development/n8n-challenges/content/blog/en/article-b825d186-b948-43c6-a7c0-c15a8d0185bf.md)

### Gaps
- No plan-gating statement was found for sub-workflows, Send-and-Wait, Wait or webhook authentication. I assume they are ungated because the node docs show no availability box.
- Cloud Starter's exact feature list after the trial was not checked; the docs defer to n8n.io/pricing.

## Q5. What do n8n's official courses teach, and which of those concepts are absent from the user's set?

### Takeaway
n8n retired its docs-hosted Level 1 and Level 2 text courses. Official learning is now the free **n8n Academy** (learn.n8n.io):
- **QS101 Quickstart**
- the **Foundations** program: N8N101 Essentials, N8N102 Integrations, N8N103 In Practice

All four use hosted practice APIs and are graded 10% quizzes, 55% hands-on exercises and 35% final exam, with a 70% pass mark.

Missing from the user's set: almost all of N8N102's technical core and N8N103's debugging and organisation content. Covered: N8N101's triggers and basic mapping, and N8N103's AI unit.

### Cited Findings
- **Launch and retirement:**
  - The Academy soft-launched on 2026-06-16 with four courses. QS101 is "based on our original text courses, now updated with a new AI section".
  - "The old text courses and community badges are being retired."
  - Badges are issued through Accredible. A "completion certificate is not a certification". — [Forum: The n8n Academy is here!](https://community.n8n.io/t/299695)
- **Old URL redirects:** on 2026-10-06, `https://docs.n8n.io/courses/level-one/` redirects to `https://learn.n8n.io/`. The docs "Learning paths" page points to the Academy: hands-on exercises, quizzes, final exam, badges and certificates (70% pass), practice APIs that need no external accounts. — [Learning paths](https://docs.n8n.io/learning-paths)
- **QS101 Quickstart (3–5 h):**
  - Module 1: triggers, scheduling, HTTP requests, expressions, API credentials
  - Module 2: data structure, splitting, merging, filtering, summarizing, error workflows, file operations
  - Module 3: AI Agent, chat models, memory and tools, building a customer-service chatbot

  It requires a chat-model API key. — [QS101](https://learn.n8n.io/courses/course-v1:n8n+QS101+2026H2/about)
- **N8N101 Essentials (2–4 h):** Manual, Schedule and Webhook triggers; credentials; data structure; transformations; expressions; binary data; "Map, transform, and merge data between nodes". — [N8N101](https://learn.n8n.io/courses/course-v1:n8n+N8N101+2026H2/about)
- **N8N102 Integrations: APIs & Connected Workflows (4–6 h):**
  - sequential and parallel execution paths
  - sub-workflows (Execute Sub-workflow)
  - IF, Switch, Loop Over Items, Wait
  - Error Trigger and Stop and Error
  - Merge, Split Out, Aggregate, Filter, Summarize, Code (JS/Python)
  - HTTP Request with GET/POST/PUT/PATCH/DELETE
  - API keys, OAuth2 and Bearer tokens; pagination
  - Webhook Trigger and Respond to Webhook; credential management
  - Data Tables

  "All exercises use practice APIs hosted by the n8n Academy". — [N8N102](https://learn.n8n.io/courses/course-v1:n8n+N8N102+2026H2/about)
- **N8N103 In Practice: AI, Testing & Best Practices (3–4 h):**
  - AI Agent, tools, memory, chains vs agents
  - execution logs and debuggers; "Try/Catch" error-handling patterns
  - naming conventions, folders and tags, sub-workflows, documentation, version control, templates
  - publishing, scheduling, monitoring, recovery

  — [N8N103](https://learn.n8n.io/courses/course-v1:n8n+N8N103+2026H2/about)
- **Certification:** n8n's education page lists the four courses as free, with course and program certificates. A formal timed certification exam is "coming soon", valid for two years. — [n8n.io/education](https://n8n.io/education/)

**Mapping of Academy topics to the user's set**

| Academy topic | Course(s) | In the n8n-challenges set? |
|---|---|---|
| Manual, Schedule and Webhook triggers; credentials | QS101, 101 | Covered (01, 02, 05, 09) |
| Data structure, mapping, expressions | QS101, 101 | Partial (mapping yes; item model and linking no) |
| Transform and merge data; Merge | QS101, 101, 102 | **Missing (Merge)** |
| Binary data / file operations | QS101, 101 | **Missing** |
| IF / Filter / Split Out / Aggregate | 102 | Covered |
| Switch, Summarize | 102, QS101 | **Missing** |
| Loop Over Items, Wait | 102 | Covered (09, 10; time-based Wait only) |
| Sequential vs parallel execution | 102 | **Missing** |
| Sub-workflows | 102, 103 | **Missing** |
| Error Trigger | QS101, 102 | Partial (09 bonus) |
| Stop and Error; Try/Catch patterns | 102, 103 | **Missing** |
| Code node (JS/Python) | 102 | **Missing** |
| HTTP Request beyond GET; API keys/OAuth2/Bearer | 102 | **Missing** (GET with app credentials only) |
| Pagination | 102 | Covered (09) |
| Webhook + Respond to Webhook | 102 | Partial (01: GET/text; no auth or status codes) |
| Data Tables | 102 | Partial (insert only) |
| Execution logs / debugger | 103 | Partial (inspecting executions only) |
| Naming, folders/tags, documentation, version control, templates | 103 | **Missing** |
| Publishing, scheduling, monitoring, recovery | 103 | Partial (publish and schedule yes; monitoring/recovery no) |
| AI Agent, tools, memory, chains | QS101, 103 | Covered extensively (04, 06, 08, 10–13) |

### Inferences
- **Positioning:** the user's set over-indexes on the AI unit that is one third of N8N103, and under-covers N8N102, which n8n calls "the technical core".
- **Same-day upsell risk:** a learner arriving from search can take N8N102 for free with hosted practice APIs. To stay distinctive, the site's next fundamentals challenges should be short, single-concept and outcome-verified, with local Valencia scenarios, rather than duplicating Academy coursework.
- **Bridge, not competition:** framing challenges as "practice after N8N101/N8N102" turns the Academy into a bridge rather than a competitor.

### Gaps
- The Academy's lesson pages require login, so lesson-level detail and the exact exercises were not inspected.
- I could not confirm third-party claims that the old courses were retired on a specific date (2026-06-30) or that formal certification launches in Q3 2026. The official sources say only "being retired" and "coming soon".

## Q6. Which missing concepts matter most for becoming production-capable?

### Takeaway
By combined evidence – Academy emphasis, the docs' Flow-logic and Work-with-data sections, forum demand and the site's own production-readiness articles – the most important missing fundamentals, in order:
1. the data model, expressions and item linking
2. webhooks as secure, idempotent APIs
3. error-handling patterns (error outputs, Stop and Error, alerting error workflows)
4. combining data (Merge and Compare Datasets)
5. HTTP authentication and non-GET methods
6. sub-workflows
7. the debugging toolkit

Next come the Code node, binary files, human approvals and dates/time zones.

### Cited Findings
- **Forum tag counts** (all-time topics): data-transformation 1,981; http-request 1,443; credentials 972; webhook 667; code 372; expressions 336; oauth2 298; external-api 258; postgres 216; merge 202; rest-api 197; execute-workflow 192; looping 189; if 168; error-trigger 146; loop-over-items 139; mysql 131; executions 130; n8n-form-trigger 120; wait 115; imap-email 112; transform-array 109; javascript 105; respond-to-webhook 97; spreadsheet-file 85; date-time 77; schedule-trigger 77; switch 49; pagination 49; xml 45; cron 43; ssh 42; rss-read 36; execute-command 35; stop-and-error 30; crypto 25; variables 25; compare-datasets 23; data-pinning 19; luxon 14; jmespath 14; paired-item 10; environments 10; sticky-notes 9. — [community.n8n.io/tags](https://community.n8n.io/tags)
- **Forum top topics are not usable as question-frequency evidence:** last year's most-viewed topics are dominated by announcements (n8n 2.0, MCP, AI Workflow Builder, autosave, the Academy) and hiring posts. — [Top topics (yearly)](https://community.n8n.io/top?period=yearly)
- **Official curriculum:** N8N102 is described as "the technical core": HTTP requests, webhooks, authentication, pagination, flow logic, execution order, sub-workflows, Data Tables and error handling. N8N103 is "the production-ready course". — [Forum: Academy](https://community.n8n.io/t/299695)
- **Docs structure:** the "Flow logic" docs cover splitting with If/Switch, merging data, Wait, converting to sub-workflows and handling errors gracefully. — [docs sitemap](https://docs.n8n.io/sitemap.md)
- **The owner's own view:** the site's article on what courses must teach before production lists error handling as "the non-negotiable baseline", then credentials and access control, version control/staging/rollbacks, "naming, modularity and idempotency", and monitoring. — [blog](/Users/romanr/Development/n8n-challenges/content/blog/en/article-54bc6674-c42b-4d0f-a2b9-d1b4ba98591e.md)
- **Search-demand articles on the site:**
  - [webhook not working](/Users/romanr/Development/n8n-challenges/content/blog/en/article-c346bc11-4089-4bed-8b60-47885ae5f754.md)
  - [404s after publishing](/Users/romanr/Development/n8n-challenges/content/blog/en/article-d99a625c-cc54-4611-995a-d99e2868cb2e.md)
  - [missing webhook field](/Users/romanr/Development/n8n-challenges/content/blog/en/article-00b1ca23-6c47-4a3d-9aac-6a9ed116bcd0.md)
  - [idempotent webhook](/Users/romanr/Development/n8n-challenges/content/blog/en/article-1bcc50d4-01fe-44dd-a5c0-9325c275c2ec.md)
  - [error workflow](/Users/romanr/Development/n8n-challenges/content/blog/en/article-c06d02cf-b653-48a1-bb17-7e09c017b8bf.md)
  - [team error-handling standard](/Users/romanr/Development/n8n-challenges/content/blog/en/article-1bd61916-5372-4311-b57b-b28eca7b983c.md)
  - [debug before blaming the integration](/Users/romanr/Development/n8n-challenges/content/blog/en/article-072abd13-4a93-43ec-9f64-3883d9a191d2.md)
  - [testing checklist](/Users/romanr/Development/n8n-challenges/content/blog/en/article-1678c5c1-885f-495d-b6fe-34533c78efdc.md)
  - [human-reviewed workflow](/Users/romanr/Development/n8n-challenges/content/blog/en/article-9ce712f6-663f-4d83-b4cf-a187025bbf23.md)
- **Product investment:** n8n kept investing in human-in-the-loop (2.5/2.6 additions; enhanced Slack/Telegram approvals in 2.35) and in webhook signature verification (2.20–2.22). — [Forum HITL](https://community.n8n.io/t/258423); [Release notes](https://docs.n8n.io/changelog/release-notes)

### Inferences
**Priority ranking**, weighting production impact × demand × Academy emphasis:
1. Expressions and item linking (largest demand, prerequisite for everything)
2. Webhook API security, status codes and idempotency
3. Error outputs, Stop and Error and alerting
4. Merge and Compare Datasets
5. HTTP authentication and methods
6. Sub-workflows
7. Debugging toolkit
8. Code node
9. Binary files
10. Human approvals
11. Dates and time zones
12. Switch plus multi-step forms
13. Polling triggers
14. Databases
15. n8n API

**Lower-value items:** source control, environments and variables are production-relevant but plan-gated, so they belong in articles rather than challenges. Static data is superseded by Data Tables in n8n's own docs.

### Gaps
- No official n8n statistic on which concepts learners fail at most often.
- Tag counts cannot be normalised by tag age; for example, extract-from-file is newer than read-binary-file.

## Q7. Ranked list of missing non-AI concepts with concrete challenge seeds

### Takeaway
The 15 seeds below are ranked by importance and by fit with the site's selection criteria: low signup friction, objective self-verification, reasonable time and translation effort, and little overlap.

The first seven need no third-party account except where noted. They can be verified with:
- deterministic static fixtures on n8n-challenges.app
- curl status codes
- Data Table states, execution-list evidence or published expected values

Seeds that refine an existing backlog idea are labelled **[known: Cxx]**.

### Cited Findings (facts the seeds rely on)
- **Static fixtures:** the site already serves them (for example `https://n8n-challenges.app/fixtures/valencia-apartments-day-1.html` → HTTP 200). A non-existent path returns a real **HTTP 404**, checked 2026-10-06, so deterministic "missing record" failures need no backend. — [07](/Users/romanr/Development/n8n-challenges/content/challenges/07-idealista-morning-brief.md); live check of `https://n8n-challenges.app/fixtures/does-not-exist-INV-1013.json`
- **Dynamic fixtures:** the owner already runs an organizer provider workflow on n8n Cloud for a deterministic, misbehaving API (09), with hidden scenario controls. — [09](/Users/romanr/Development/n8n-challenges/content/challenges/09-unstable-restaurant-orders.md); [README](/Users/romanr/Development/n8n-challenges/content/challenges/README.md)
- **Browser-based testing:** the Webhook node's Allowed Origins (CORS) default is `*`, so a browser page could call a learner's webhook. But the site's client-side JavaScript is limited by plan to theme, tips and the review dialog. — [Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook); [Plan](/Users/romanr/Development/n8n-challenges/docs/N8N_CHALLENGES_PLAN.md)
- **Error workflows** run only on automatic executions, not manual test runs. — [Error Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger)
- **Form prefill:** query-parameter prefill works only in production mode. — [Form Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger)
- **Release-notes RSS feed:** n8n publishes an official, live feed. — [Release notes](https://docs.n8n.io/changelog/release-notes)
- **3.0 import change:** 3.0 removes editor import from URL; copy-paste and Import from File remain. — [v3.0](https://docs.n8n.io/changelog/v30-breaking-changes)
- **No standalone JSON:** challenge files may not ship standalone workflow `.json` files. — [README](/Users/romanr/Development/n8n-challenges/content/challenges/README.md)

### Inferences (the seeds)

General verification devices, usable on a static site with no mentor:
- (a) **Expected values** for fixed fixtures printed on the page: counts, totals, IDs, exact strings.
- (b) **Hash check:** a published SHA-256 of the canonical expected output, which the learner computes with the Crypto node's Hash action. Learners compare hashes without the answer being revealed.
- (c) **curl scripts** in Preparation, each with an expected HTTP status and JSON.
- (d) **Execution-list or Data Table evidence:** statuses Success, Error or Waiting; row values.

Each seed below lists: scenario, primary concept, likely nodes, level and time, verification, plus friction, flags and overlap.

#### 1. "Fix the Festival Program" – data model, expressions and item linking
- **Scenario:** Valencia's festival office publishes a nested JSON program (a site fixture) of events with venue objects, performer arrays and UTC timestamps. Comms needs one clean row per event: title, venue, district, local start time ("dd/MM HH:mm", Europe/Madrid), duration in minutes, performer count, and a free/paid flag. Bonus: add the program's top-level `version` and the total event count to every row, then explain and fix a planted ".item after Aggregate" error by switching to `.first()`/`.all()`.
- **Concept:** items and `$json`; nested paths; array/string methods; Luxon (`DateTime.fromISO(...).setZone('Europe/Madrid').toFormat(...)`); `$('Node').item` vs `.first()`/`.all()`; item-linking errors.
- **Nodes:** Manual Trigger, HTTP Request, Split Out, Edit Fields (Set), Date & Time, Filter, Aggregate (bonus).
- **Level:** beginner, 20–30 min, complexity 2.
- **Verification:**
  - Exact expected rows for two named events.
  - Exactly N rows after filtering free events.
  - Include events on both sides of a daylight-saving change, so a wrong time zone fails visibly.
  - Optional SHA-256 hash check.
- **Friction:** none (no account).
- **Overlap:** low; touches 01's bonus expression. Partly refines [known: C10 "Hello n8n" date/time output].

#### 2. "Door Check-in API That Never Double-Counts" – webhook as a secure, idempotent API
**[known: C04 refined]**
- **Scenario:** door scanners POST `{ticketCode}` to n8n over flaky Wi-Fi that retries. The API must:
  - return 401 without a valid header token
  - return 400 for a missing code
  - return 201 `{"status":"checked_in"}` on the first scan
  - return 200 `{"status":"already_checked_in","firstSeenAt":…}` on repeats
  - store exactly one row per ticket
- **Bonus:** reject requests whose `X-Signature` header doesn't match an HMAC-SHA256 of the body (Crypto → Hmac with a Crypto credential), or add a custom response header.
- **Concept:** Webhook POST with Header Auth; Respond to Webhook with JSON, status codes and headers; idempotency through Data Table "If Row Does Not Exist" or Upsert; an IF/Switch validation branch.
- **Nodes:** Webhook, IF (or Switch), Data Table, Edit Fields (Set), Respond to Webhook (several), Crypto (bonus).
- **Level:** intermediate, 30–45 min, complexity 3.
- **Verification:**
  - Five copy-paste curl commands, each with its expected status and body.
  - The final Data Table holds exactly two rows for the test set.
- **Friction:** none. It works on localhost CE without a tunnel, because curl runs on the same machine, and on Cloud after publishing (production URL).
- **Overlap:** extends 01 (GET/text).

#### 3. "One Bad Invoice Shouldn't Stop the Batch" – error outputs, Stop and Error, alerting error workflow
- **Scenario:** a nightly job fetches 12 invoices from site fixtures (`/fixtures/invoices/INV-1001.json` …). Two IDs deliberately 404, and one has a negative amount. Requirements:
  - Valid invoices are saved.
  - Failures go to a `needs_review` table with a reason.
  - If more than 25% of a batch fails (a second fixture batch), Stop and Error ends the run, and an error workflow sends a Telegram or email alert containing the workflow name and execution URL.
- **Concept:** On Error → Continue (using error output) as try/catch; Stop and Error for business rules; Error Trigger workflows and their limits (no manual testing).
- **Nodes:** Webhook (to trigger the published run on demand), HTTP Request, IF, Data Table, Summarize, Stop and Error, Error Trigger, Telegram or Send Email.
- **Level:** intermediate–advanced, 40–50 min, complexity 4.
- **Verification:**
  - 9 saved rows and 3 review rows with the expected reasons.
  - Calling the published webhook with `?batch=b` produces an Error execution plus a handler execution and the alert.
- **Friction:** none beyond Telegram, already used on the site, or SMTP.
- **Overlap:** moderate with 09 (Retry On Fail, Error Trigger), but distinct: per-item error branches and intentional failures.

#### 4. "Who Changed Their Booking?" – Merge and Compare Datasets
- **Scenario:** yesterday's and today's attendee exports plus a ticket-type list (fixtures). The workflow must:
  - (a) enrich attendees with their ticket type: Merge → Combine by Matching Fields on email, Enrich Input 1
  - (b) classify bookings as new, cancelled, changed or unchanged with Compare Datasets
  - (c) send one summary with the counts
- **Bonus:** reproduce (a) with Merge's SQL Query mode, and handle a case-mismatched email using Fuzzy Compare or lower-casing.
- **Nodes:** Manual Trigger, HTTP Request ×3, Merge, Compare Datasets, Summarize, Edit Fields (Set), Aggregate, Telegram (or no channel).
- **Level:** intermediate, 30–45 min, complexity 3.
- **Verification:** exact counts and IDs for each Compare Datasets branch, published on the page.
- **Friction:** none for the core.
- **Overlap:** low (07 dedups across runs by a different mechanism).

#### 5. "Talk to a Protected Booking API" – HTTP Request beyond GET
- **Scenario:** a partner API (an organizer provider workflow, like 09) requires `POST /login` to obtain a Bearer token, then supports POST, PATCH, GET and DELETE on `/bookings`. The learner:
  - imports a provided cURL
  - completes the full create → update → read → delete cycle with a Header Auth credential
  - branches on 401 and 422 using Include Response Headers and Status, or Never Error
- **Bonus:** auto re-login on 401.
- **Nodes:** Manual Trigger, HTTP Request (several), IF or Switch, Edit Fields (Set).
- **Level:** intermediate, 40–50 min, complexity 3–4.
- **Verification:** the provider returns a deterministic receipt code only after a valid complete sequence; a GET shows the booking history.
- **Friction:** none for learners. The cost is that the owner must build and host the provider (operational burden like 09).
- **Overlap:** extends 02/09 (GET only).

#### 6. "Write It Once, Call It Everywhere" – sub-workflows
- **Scenario:** a form intake and a nightly import both need the same "normalise contact" logic: trim and title-case names, `+34` phone format, euro formatting. Build one sub-workflow with typed inputs (Define using fields below) that returns normalised fields, and call it from both parents.
- **Bonus:** use the editor's "Convert to sub-workflow" on a selection, or a fire-and-forget call with Wait For Sub-Workflow Completion off.
- **Nodes:** n8n Form Trigger, Schedule or Manual Trigger, Execute Sub-workflow, Execute Sub-workflow Trigger, Edit Fields (Set), n8n Form, Data Table (optional).
- **Level:** intermediate, 30–40 min, complexity 3.
- **Verification:**
  - Both parents produce identical, published outputs for three messy fixture contacts.
  - The sub-workflow's executions show two callers.
  - A one-line change in the sub-workflow changes both outputs.
- **Flags:**
  - Use the Database ("From list") source, since Local File and URL are gone in 3.0.
  - Avoid the deprecated "Any workflow" caller policy.
  - Mention the 2.0 parent-receives-final-output rule.
- **Friction:** none.

#### 7. "The Workflow That Worked Yesterday" – debugging toolkit
- **Scenario:** import (copy-paste) a broken workflow whose JSON includes pinned data, so it runs with no accounts. Three planted bugs:
  - an item-linking error after Aggregate
  - an unset workflow timezone (defaults to New York)
  - a Filter type mismatch, string vs number

  Fix them using Execute step, editing pinned data and reading dirty-node markers.
- **Bonus:** publish a scheduled copy, let one run fail, then use Debug in editor on that failed execution.
- **Nodes:** Manual Trigger, Schedule Trigger, HTTP Request (pinned), Split Out, Filter, Aggregate, Edit Fields (Set), Date & Time.
- **Level:** intermediate, 30–40 min, complexity 3.
- **Verification:** the final output matches a published three-line summary, with no error banners.
- **Flags:**
  - Debug in editor needs Cloud or a free Registered CE.
  - Requires a new "starter workflow" block in the challenge format, because standalone `.json` files are not allowed. Keep it copy-paste, since 3.0 drops editor import from URL.
- **Friction:** none.

#### 8. "When No Node Fits" – Code node (JavaScript)
- **Scenario:** a ticket export packs seats as `"VLC|2026-10-12|A3:2;B1:4"`. Parse it in a Code node (Run Once for All Items) into one item per seat block, compute totals, and return `pairedItem`, so a later Edit Fields can read `$('HTTP Request').item` without an item-linking error.
- **Bonus:** solve it again without Code (Split Out plus string methods) and compare the outputs.
- **Nodes:** Manual Trigger, HTTP Request, Code, Edit Fields (Set), Sort.
- **Level:** intermediate, 25–35 min, complexity 3.
- **Verification:** exact JSON for the fixture rows, and the downstream expression succeeds.
- **Flags:**
  - JavaScript only: Python needs external runners on self-hosted and cannot import on Cloud.
  - No environment-variable access and no `$evaluateExpression`.
  - 60 s task timeout in 3.0.
- **Friction:** none.

#### 9. "Monthly Spending Report" – binary files
- **Scenario:** download a month of volunteer expenses as CSV (fixture), total them per category, and deliver an XLSX to the finance lead (a Telegram document or an email attachment).
- **Bonus:** extract the total from a PDF receipt fixture and flag a mismatch; zip the CSV and XLSX together.
- **Nodes:** Manual or Schedule Trigger, HTTP Request (file response), Extract from File, Summarize, Convert to File, Telegram or Send Email, Compression (bonus).
- **Level:** intermediate, 30–40 min, complexity 3.
- **Verification:** published per-category totals; the XLSX opens with the expected columns and row count; the PDF value matches.
- **Flags:** avoid Read/Write Files from Disk (path restrictions) and legacy file nodes (removed in 3.0).
- **Friction:** low.

#### 10. "Approve Before It's Spent" – human approval
- **Scenario:** a volunteer submits a reimbursement form. Requests of €50 or less auto-approve. Larger ones send a Telegram "Send and Wait for Response" (Approval) to the manager (the learner), with Limit Wait Time. The outcome (approved, declined or expired) is stored and shown to the requester.
- **Bonus:** the same flow without Telegram, using a Wait node (On Webhook Call) and an emailed `$execution.resumeUrl` link, or a Custom Form that captures a decline reason.
- **Nodes:** n8n Form Trigger, IF, Telegram, Data Table, n8n Form, Wait (bonus), Send Email (bonus).
- **Level:** intermediate, 30–40 min, complexity 3.
- **Verification:** four test requests produce `auto_approved`, `approved`, `declined` and `expired` rows; while pending, the execution list shows "Waiting".
- **Flags:** no plan gating. Self-hosted approval links need a reachable n8n URL (unverified; see Gaps).
- **Overlap:** none (09 uses Wait only for throttling).

#### 11. "Open on the Right Day, at the Right Hour" – dates, time zones and Cron
**[known: related to C19]**
- **Scenario:** a GET webhook answers "open now?" and "next opening" for an office open Monday–Friday 09:00–14:00 Europe/Madrid, skipping holidays from a fixture. An `?at=` override lets learners test fixed instants.
- **Bonus:** a Custom (Cron) Schedule Trigger posts "We're open" at 09:00 on working days only.
- **Nodes:** Webhook, Edit Fields (Luxon), Date & Time, IF or Switch, Respond to Webhook, Schedule Trigger.
- **Level:** intermediate, 30–40 min, complexity 3.
- **Verification:** six published test instants, two on either side of a DST change, each with its expected JSON.
- **Friction:** none.

#### 12. "Volunteer Sign-up Wizard" – Switch and multi-step n8n Forms
**[known: adjacent to C11]**
- **Scenario:** volunteers pick a role (Door, Kitchen, Tech, Other) and see role-specific questions on page 2; each branch ends with a role-specific message, and the answers are stored.
- **Bonus:** a role pre-selected via a query-parameter link (production only).
- **Nodes:** n8n Form Trigger, Switch (with Fallback Output), n8n Form, Edit Fields (Set), Data Table.
- **Level:** beginner, 20–30 min, complexity 2.
- **Verification:** three runs produce three correct rows and three correct endings.
- **Friction:** none.
- **Overlap:** moderate with 03; this could instead be a 03 follow-up.

#### 13. "What's New in n8n This Week?" – polling triggers
- **Scenario:** an RSS Feed Trigger on n8n's official release-notes feed sends a Telegram line for new entries that mention chosen keywords.
- **Bonus:** an Email Trigger (IMAP) variant.
- **Nodes:** RSS Feed Trigger, Filter, Edit Fields (Set), Telegram.
- **Level:** beginner, 15–20 min, complexity 2.
- **Verification:** weak – "Fetch Test Event" output, then one published poll execution. Results depend on new items, which is why this seed ranks low.
- **Flags:** check that the feed (served as `text/plain`) parses.
- **Friction:** low; the IMAP bonus has app-password friction.

#### 14. "Move the Leads into Postgres" – databases (advanced)
- **Scenario:** take the Data Table leads from 03 and upsert them into Postgres with parameterised queries.
- **Nodes:** Postgres plus core nodes.
- **Level:** advanced, 45–60 min.
- **Verification:** a published `SELECT count(*)` and a checksum.
- **Friction:** **high** – needs an external database signup. Forum demand is postgres 216 and mysql 131.

#### 15. "Audit Your Own n8n" – n8n API / n8n node
- **Scenario:** a weekly list of published workflows with no error workflow set and no description.
- **Nodes:** n8n node, Filter, Aggregate, Telegram.
- **Level:** intermediate, 25–35 min.
- **Verification:** counts match the learner's own instance.
- **Flags:** **not available on the Cloud free trial**; fine on CE and paid Cloud.

**Not recommended as challenges:**
- **Execute Command and Local File Trigger:** not on Cloud and disabled by default on self-hosted.
- **SSH and FTP:** need an external server.
- **Variables, source control, environments, log streaming and workflow reviews:** plan-gated.
- **Workflow static data:** production-only and JavaScript-only; the docs prefer Data Tables.
- **Custom execution data:** plan-gated.
- **Embedded chat (`@n8n/chat`):** AI-adjacent.
- **Sticky notes and Canvas Groups:** better added as a cross-cutting requirement, such as one note per section, than as a stand-alone challenge.

**Packaging options** if fewer challenges are wanted:
- Fold Switch into seed 2.
- Fold Luxon into seed 1.
- Fold Compare Datasets into seed 4.
- Fold the HMAC check into seed 2's bonus.
- Fold Debug in editor into seed 3's bonus.

### Gaps
- Fixture files, provider workflows and expected values were not built. All counts in the seeds are design targets to be fixed when fixtures are authored.
- I did not verify whether Telegram "Send and Wait" approval buttons work for self-hosted localhost instances.
- I did not test whether the RSS Feed Trigger accepts the GitHub raw feed's `text/plain` content type.
- Translation effort was estimated, not measured. Seeds with numeric or JSON fixtures (1, 2, 4, 5, 8, 11) should translate most cheaply; form-heavy seeds (10, 12) need localized field labels.
