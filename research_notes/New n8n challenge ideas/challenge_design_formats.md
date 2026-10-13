# Challenge formats, verification and learning design for self-paced n8n challenges

Scope note: research done on 2026-10-06. Sources fetched in this session are cited with their URL. A few well-known learning-science papers are cited by DOI from the established literature and were not re-fetched in this session; these are marked "(DOI, not re-fetched)". Repository context used for the recommendations: challenge Markdown already embeds the solution workflow JSON and Pixtex solution images, and `public/fixtures/` already hosts static fixtures (Valencia apartments day-1/day-2 HTML, Google Drive RAG text files, alien language guide). The archived event plan (`docs/DEFERRED_PLATFORM_PLAN.md`) already defines five hint types: Direction, Nodes, Flow, Configuration, Near-solution.

## Q1. Which challenge formats do successful hands-on platforms use, and which transfer to self-paced n8n challenges?

### Takeaway
Successful platforms use far more than "build this from a brief". They use per-learner puzzle inputs with one checkable answer (Advent of Code, and since September 2026 n8n's own Community Weekly Challenge), story-driven detective cases (SQL Murder Mystery), test-backed katas that reveal other people's solutions after you solve (Codewars, Exercism), guided-then-unguided labs scored on end state (AWS, Microsoft Applied Skills), constraint puzzles (Regex Crossword, and n8n's "native nodes only, no Code node" rule), and timed team jams where clues cost points (AWS Jam, CTFs). For a static site with no mentor, these transfer best: debug-and-fix, a data detective with one answer per learner, constraint remixes, Parsons-style "connect the dots" assembly, matching a target output, predict-run-modify on an imported workflow, make-it-production-ready or refactor, AI-evaluation challenges, and multi-part story campaigns. Speedruns, leaderboards and live weekly contests need a server and moderation. n8n already runs those, so the site should link to them rather than copy them.

### Cited Findings

**Advent of Code (AoC)**
- AoC says it suits "a variety of skill levels" and needs only a little programming knowledge. People use it for interview prep, company training, university coursework, practice problems and speed contests — [AoC 2025 About](https://adventofcode.com/2025/about)
- Each participant gets different input data and should produce a different correct answer. Part two of a puzzle appears only after part one is solved correctly, and each solved part earns one star — [Wikipedia: Advent of Code](https://en.wikipedia.org/wiki/Advent_of_Code)
- In 2025 AoC cut the event to puzzles that end mid-December (12 days) and removed the global leaderboard after ten years. The organizer called it one of the largest sources of stress and cited abuse such as DDoS attacks. Private leaderboards remain and can now be shared read-only — [AoC 2025 About](https://adventofcode.com/2025/about); [Wikipedia](https://en.wikipedia.org/wiki/Advent_of_Code)
- AoC asks people not to redistribute puzzle text or personal inputs. On AI use its FAQ says "No" and compares it to sending a friend to the gym for you — [AoC 2025 About](https://adventofcode.com/2025/about)
- Scale: AoC reached 1,000,000 registered users in December 2022 — [Wikipedia](https://en.wikipedia.org/wiki/Advent_of_Code)

**Exercism**
- The Python track has 146 exercises across 17 concepts, automatic code analysis, volunteer mentoring (6,708 mentors listed) and is free — [Exercism Python track](https://exercism.org/tracks/python)
- Learning Mode guides learners through a syllabus, which is a tree of concepts specific to each language. Test runners run tests against solutions written in the browser. Concept exercises get automated feedback and approval with no wait for a mentor — [Exercism blog: Analyzers, Representers & Syllabuses](https://exercism.org/blog/whats-new-in-v3-with-angelika) (wording reached via search snippets; page not fully fetched)

**Frontend Mentor**
- Five levels with typical times: Newbie (1–4 h), Junior (4–8 h), Intermediate (8–20 h), Advanced (20–40 h), Guru (40+ h). The suggested path is 5–10 Newbie, then 5–8 Junior, then 3–5 Intermediate, then 2–3 Advanced. Learners should move up when the current level "feels comfortable" — [Frontend Mentor: Difficulty levels](https://www.frontendmentor.io/guides/difficulty-levels)

**freeCodeCamp**
- For back-end projects the learner enters the URL of their own running project. The browser runs a stack of tests against it and shows which pass. The URL is saved with the learner's progress — [freeCodeCamp GitHub issue #10901](https://github.com/freeCodeCamp/freeCodeCamp/issues/10901)
- Back-end challenges can be done locally and submitted as a localhost link while the local server is running — [freeCodeCamp News: run back-end challenges locally](https://www.freecodecamp.org/news/how-to-run-the-freecodecamp-backend-challenges-locally/)
- Known weakness: forum and issue titles report that verification passed "with any URL" — [freeCodeCamp forum](https://forum.freecodecamp.org/t/project-solution-verification-works-with-any-url/423853); [GitHub issue #38397](https://github.com/freeCodeCamp/freeCodeCamp/issues/38397) (titles only, not fetched)

**Codewars**
- Ranks run from 8 kyu down to 1 kyu, then 1 dan up to 8 dan. Honor reflects activity and contributions; rank reflects skill — [Codewars docs: Rewards and Progress](https://docs.codewars.com/gamification/); [Codewars docs: Honor](https://docs.codewars.com/gamification/honor/)
- After completing a kata you see other people's solutions. A stuck learner can press "Unlock Solutions", which gives up the honor and rank progress for that kata — [Codewars docs: Solutions](https://docs.codewars.com/concepts/kata/solutions/)

**Kaggle**
- Kaggle Learn exercises call `q1.check()` (correct, incorrect or not attempted), `q1.hint()` with optional levels such as `hint(2)` and `hint(3)`, and `q1.solution()` — [Kaggle learntools README](https://github.com/Kaggle/learntools/blob/master/learntools/README.md)
- In competitions, the public leaderboard is scored on a sample of the test data and the private leaderboard on the rest, which decides final standings. Overfitting to the public leaderboard is a well-known problem — [DataCamp: Public vs Private leaderboard](https://campus.datacamp.com/courses/winning-a-kaggle-competition-in-python/kaggle-competitions-process?ex=8); [Blum & Hardt, "The Ladder" (ICML 2015)](https://proceedings.mlr.press/v37/blum15.pdf)

**CTFs (CTFd platform)**
- Hints can be free or cost points, and unlocking a paid hint lowers the score. Hints can depend on other hints and can show a title before they are unlocked — [CTFd docs: Hints](https://docs.ctfd.io/docs/challenges/hints/)
- Challenges can be unlockable, meaning prerequisites must be solved first — [CTFd tutorial: Creating an unlockable challenge](https://docs.ctfd.io/tutorials/challenges/creating-an-unlockable-challenge/)

**SQL Murder Mystery, SQLBolt and Regex Crossword**
- SQL Murder Mystery is both "a self-directed lesson" for SQL beginners and a game for experienced users. It offers separate beginner and expert prompts and a walkthrough. Learners check their answer by inserting a name into a `solution` table and selecting the result. Code is MIT-licensed and content is CC BY-SA 4.0 — [NUKnightLab/sql-mysteries](https://github.com/NUKnightLab/sql-mysteries)
- In SQLBolt each lesson introduces one concept and ends with an interactive exercise. Lessons are meant to be done in order, but skipping is allowed — [SQLBolt](https://sqlbolt.com/)
- Regex Crossword: every row and column of a grid must match its regex, so the constraints themselves act as the checker. It has a tutorial, difficulty tiers and achievements — [Hackaday](https://hackaday.com/2016/01/31/crosswords-help-you-learn-regular-expressions/); [GamingOnLinux](https://www.gamingonlinux.com/2020/04/struggling-with-regular-expressions-then-visit-regex-crossword-a-site-to-learn-them-through-a-sudoku-like-game/)

**Microsoft Learn and AWS Skill Builder**
- Microsoft Applied Skills are scenario-based lab assessments. They are scored on results, not methods: a scoring script checks the final state of the environment, and the pass mark is about 66% — [Microsoft Learn: assessment duration and lab experience](https://learn.microsoft.com/credentials/support/assessment-duration-lab-experience); [TechTarget](https://www.techtarget.com/searchwindowsserver/tip/Microsoft-Applied-Skills-program-puts-expertise-to-the-test). The sources conflict on timing: one describes 2 hours with 12–16 tasks, another 30 minutes (beginner) or 45 minutes (intermediate and expert). This may reflect a format change over time.
- AWS Jam is a gamified team event. Challenges differ in difficulty and point value, clues are available but reduce the score, and paths to a solution are open-ended inside a pre-built environment — [AWS Training blog: Gamify your cloud journey](https://aws.amazon.com/blogs/training-and-certification/gamify-your-cloud-journey-how-aws-jams-are-created-and-why-they-matter/); [Pluralsight on re:Invent Jams](https://www.pluralsight.com/resources/blog/cloud/aws-reinvent-jam-sessions)
- AWS Builder Labs give step-by-step instructions. Challenge-style labs give none and automatically check the state of the environment. They are aimed at more experienced learners — [Whizlabs comparison (third party)](https://www.whizlabs.com/blog/guided-lab-vs-lab-challenges/); [AWS immersive learning](https://aws.amazon.com/training/digital/immersive-learning/)

**Make (and Zapier)**
- Make Academy runs Foundation → Basics → Intermediate → Advanced. Earning a badge requires finishing all units plus a short assessment. A unit takes about 5–15 minutes — [Make Community: Make Academy course overview](https://community.make.com/t/make-academy-course-overview/29699); badges are issued through Credly — [Credly: Make Basics](https://www.credly.com/org/make/badge/make-basics)
- Zapier: no official primary source on its learning formats was found (see Gaps).

**n8n's own current formats (direct precedents)**
- n8n Academy (learn.n8n.io) has four free courses: Quickstart (QS101) and the Foundations program, N8N101 Essentials → N8N102 Integrations → N8N103 In Practice. N8N103 covers AI agents, testing, debugging, Try/Catch error patterns and production readiness — [n8n Education](https://n8n.io/education/); [n8n docs: Learning paths](https://docs.n8n.io/learning-paths.md)
- N8N102 takes about 4–6 hours. Its grade is section quizzes 10%, hands-on workflow exercises 55% and final exam 35%, with 70% needed to pass. Exercises use "practice APIs hosted by the n8n Academy", so no external accounts are needed — [learn.n8n.io N8N102](https://learn.n8n.io/courses/course-v1:n8n+N8N102+2026H2/about)
- n8n Community Weekly Challenge (announced 7 Sep 2026): a challenge opens every Monday and closes Saturday. Each participant gets a dataset generated from their username, and a starter workflow is optional. Ranking uses time measured from first data access. Solving earns 10 points plus a small bonus for a top finish, and participants get a permanent public profile — [n8n Community announcement](https://community.n8n.io/t/introducing-the-n8n-community-weekly-challenge-a-new-automation-problem-every-monday/311603)
- Challenge 01 "The Night Gate" (14–19 Sep 2026) required native n8n nodes, "with no Code nodes allowed". The challenge site itself runs on an n8n Cloud webhook — [Challenge 01 post](https://community.n8n.io/t/community-weekly-challenge-01-is-live-the-night-gate/313635); [CWC site](https://marketing.app.n8n.cloud/webhook/cwc/site)
- The CWC site says answers are checked automatically and scored at once, while workflow JSON is validated at season end before rewards. Challenges so far: 00 community pilot, 01 The Night Gate, 02 Photo Finish, 03 The Hour That Happened Twice, and 04 The Welcome Desk (data cleanup, native nodes; Season 2; closes 11 Oct 2026) — [CWC site](https://marketing.app.n8n.cloud/webhook/cwc/site); [Challenge 04 post](https://community.n8n.io/t/community-weekly-challenge-04-the-welcome-desk-is-live/318957). Two inconsistencies between sources: points are 10 + bonus in the intro but 11 per challenge in Season 2, and the intro names the first challenge "The Ledger Never Forgets" while the site lists "Challenge 00: The community pilot".

### Inferences

**Overview: recommended new formats and how they fit the owner's selection criteria**

| # | Format | Main precedent | Best level | Verification on a static site | Signup friction | Translation effort | Overlap risk |
|---|---|---|---|---|---|---|---|
| F1 | Fix the broken workflow (debug-and-fix) | Erroneous-examples research, AWS Jam troubleshooting, n8n Academy N8N103 | Beginner to advanced | Live browser test and/or workflow-JSON lint | None (import JSON) | Low | Low (no current debug challenge) |
| F2 | Case file: data detective with one answer | SQL Murder Mystery, AoC, n8n CWC | Intermediate | Hashed answer, per-learner variants | None (static fixtures) | Low (story only) | Medium (n8n CWC is similar, but timed and competitive) |
| F3 | Constraint remix of an existing challenge | Regex Crossword, n8n CWC "no Code node" | Intermediate to advanced | Workflow-JSON lint (node types, node count) | Same as original | Very low | None (reuses content on purpose) |
| F4 | Connect the dots (Parsons-style assembly) | Parsons problems (Ericson et al. 2017) | Beginner | Workflow-JSON lint (connections) | None | Low | None |
| F5 | Match the target output (reverse-engineer) | Frontend Mentor design-to-code, Kaggle checks | Beginner to intermediate | Paste output JSON → deep compare with a diff | None | Low | Low |
| F6 | Predict–Run–Modify (import and extend) | Use-Modify-Create, PRIMM, n8n template library | Beginner on-ramp | Prediction quiz + JSON lint + self-check | Depends on base workflow | Low to medium | Low (reuses existing solutions) |
| F7 | Make it production-ready, or refactor | AWS Jam ops tasks, N8N103, challenge 09 | Intermediate to advanced | JSON lint + golden-master output + optional checker | Low (reuse) | Medium | Low |
| F8 | AI evaluation ("beat the baseline") | Kaggle hidden test set, n8n Evaluations | Intermediate | Labels checked against hashed answers; accuracy threshold | One LLM credential | Medium (dataset is multilingual by design) | Low (extends 04 and 11) |
| F9 | Multi-part story campaign | AoC part 2, CTFd unlockable challenges, n8n monthly fictional-company briefs | Mixed (capstone) | One of the above per episode | Varies | Medium to high | Low |
| – | Speedruns, leaderboards, live weekly contests | AoC (global leaderboard now removed), n8n CWC | – | Needs server-side timing | – | High (weekly) | High (n8n CWC already does this) |

**Concrete n8n examples (one per format)**

- **F1 Fix the broken workflow: "The Greeting Is Broken"** (beginner, ★★, 15–20 min, no signup). The learner imports `fixtures/broken-greeting.json`, a 3-node Webhook → Edit Fields → Respond to Webhook workflow with three planted bugs, one per concept:
  1. The Webhook HTTP method is POST, but a browser opens links with GET.
  2. An expression reads the wrong query field because of a case mismatch, so the name comes out empty.
  3. The Webhook "Respond" mode is "Immediately", so the Respond to Webhook text is never returned.

  Three outcomes:
  1. `?name=Ana` returns the personalised greeting.
  2. Without `name`, the default greeting is returned.
  3. Still exactly 3 nodes, so no workaround nodes.

  Bonus: write one sentence per bug explaining the root cause (self-explanation).

  Intermediate variant, "Why did last night's run fail?" (★★★, 30–40 min): import a copy of 05 or 07 whose pinned data reproduces a failed or wrong run. Planted causes: pagination stops after page 1, a Filter compares the string "10" with a number, and Aggregate uses the wrong field. Pinned data is a development feature, so it fits a debugging exercise (see Q2).
- **F2 Case file: "The Paella That Never Arrived"** (intermediate, ★★★, 30–45 min, no signup).
  - Data: static JSON hosted on the site, paged as `orders-1.json`, `orders-2.json`, … with a `next` URL, plus `riders.json` and `complaints.json`. 16–32 seeded variants are generated at build time.
  - Story: a Ruzafa restaurant reports an order marked "delivered" before it was "picked up". Find the rider code responsible.
  - Nodes: Manual Trigger, HTTP Request with pagination, Split Out, Merge by key, Date & Time, Filter, Sort. Constraint: no Code node, following n8n CWC.
  - Answer: one string such as `R-4821`, checked in the browser against a salted SHA-256 per variant.
  - Part 2 (AoC-style) unlocks after a correct answer: list every affected order that week and send the restaurant a summary. Real email or Telegram is optional as a bonus.
- **F3 Constraint remix: "Apartment Watch: no Code, no Data Table"** (intermediate, ★★★, 20–30 min after 07). Same brief as 07, but deduplication across runs must use a native node feature, not Code or a Data Table. Another remix, "Morning Brief, native only": at most 7 nodes excluding sticky notes, no Code node, must use Aggregate or Summarize. A browser lint of the pasted workflow JSON checks both rules. (Check that Remove Duplicates' cross-execution mode exists in current n8n before authoring; see Gaps.)
- **F4 Connect the dots: "Contact Form, Unplugged"** (beginner, ★, 10–15 min). The imported JSON has these nodes placed but not connected: n8n Form Trigger, IF, Data Table, Send Email, plus two distractors (Schedule Trigger, Telegram). Two fields are left blank (the IF condition and one Data Table column mapping). The learner wires and completes it. The lint checks the connection graph (distractors stay unconnected), then the learner submits one test form entry (self-check).
- **F5 Match the target output: "Rebuild the Fallas Report"** (beginner/intermediate, ★★, 20–30 min, no signup).
  - Input: `fixtures/fallas-events.json`, with 40 events in UTC, a district and a category.
  - The page shows the exact target JSON: events grouped by district with a count and the next event time in Europe/Madrid, sorted by count.
  - Nodes: HTTP Request, Split Out, Date & Time, Summarize, Sort, Edit Fields.
  - Check: the learner pastes the last node's output and the site deep-compares it with the target and shows a diff of mismatches.
  - Anti-hand-editing variant: also run the same workflow on hidden-from-view `fallas-events-b.json` and submit a checksum field. This is Kaggle's private-leaderboard idea in miniature.
- **F6 Predict–Run–Modify: "Read Before You Build: the Wikipedia Agent"** (beginner, ★, 15–20 min).
  - Import the challenge 12 solution that already exists on the site.
  - Predict: three multiple-choice questions, for example "Will the agent call the Wikipedia tool for 'What is 2+2'?" and "What will memory contain after two messages?"
  - Run and compare.
  - Modify: add a second tool, such as an HTTP Request tool to Valencia's open-data API.
  - Make: a new agent for Valencia transport questions.
  - Check: prediction answers in the browser, plus a lint that the tool node is present.
- **F7a Make it production-ready: "Harden the Air-Quality Bot"** (advanced, ★★★★, 45–60 min). Import the challenge 02 solution. Requirements:
  1. A failing API call retries, and if it still fails, an Error Trigger workflow alerts the team.
  2. The bot never sends an empty or "undefined" message when the API returns no stations.
  3. Re-running the daily schedule cannot double-send, using a "sent today" record.

  Faults are injected by pointing the HTTP Request at the organizer's existing unstable API from challenge 09, with a scenario such as `timeout`, `500` or `empty`.

  **F7b Refactor: "Untangle the Notification Spaghetti"** (intermediate, ★★★, 30–45 min). Import a ~20-node workflow with three copy-pasted alert branches and turn it into one sub-workflow (Execute Workflow with defined inputs) of at most 10 nodes that gives the same outputs. Check: a golden-master comparison of the pasted output for 5 fixture incidents, plus a lint. After solving, show 2–3 reference refactors, as Codewars does.
- **F8 AI evaluation: "Beat the Baseline: City Problem Classifier"** (intermediate, ★★★, 40–60 min, one LLM credential; extends 04).
  - Provide 30 labelled citizen requests mixed across Spanish, English and Ukrainian, which turns the site's trilingual nature into a feature, as a Data Table import.
  - Run them through an n8n light evaluation (Evaluation Trigger → classifier → Set Outputs).
  - Requirement: at least 26/30 correct and every output valid JSON.
  - Then 10 unlabelled "hidden" requests on the site: the learner pastes the predicted labels and the browser checks them against per-item hashes, requiring at least 8/10. Use thresholds rather than exact matches because LLM output varies.
- **F9 Story campaign: "Fallas Week Ops"** (five episodes, 20–40 min each, crossing tracks). A fictional events company, in the style of n8n's monthly "Relay" briefs.
  1. Webhook volunteer sign-up.
  2. Data Table with deduplication.
  3. AI incident triage.
  4. Daily digest with Aggregate.
  5. Debug and harden.

  Each episode extends the learner's own workflow from the previous one (same credentials, less setup), and a "part 2 twist" is revealed after the first answer is accepted.

**Do not build (or only link out to)**
- Speedruns and global leaderboards: they need trusted server timing. AoC removed its global leaderboard because of stress and abuse, and n8n's CWC already offers time-ranked, per-user challenges.
- A weekly live contest: high maintenance and a translation burden. A static "featured remix of the month" without rankings would work, with a link to n8n's Weekly Challenge for people who want to compete.

### Gaps
- No official Zapier source on learning or challenge formats was found; search only returned third-party course listings.
- Frontend Mentor's community-feedback and solution-report features, and Microsoft Learn's in-module "check your work" sandboxes, were not verified in this session.
- Regex Crossword's official site did not render. Its format is described from secondary articles.
- Two n8n features used in the examples were not checked against current docs: a cross-execution mode on the Remove Duplicates node, and the HTTP Request node's "next URL from response" pagination mode. Both need a quick test before authoring F2 or F3.

## Q2. How do self-paced platforms verify solutions without a per-learner backend, and what fits a static GitHub Pages site plus at most one organizer-owned n8n checker workflow?

### Takeaway
Platforms verify in one of four ways:
- **A known answer checked mechanically.** AoC answers for per-user inputs, SQL Murder Mystery's in-database `solution` check, CTF flags, Kaggle Learn `check()`.
- **Tests run against the learner's artifact.** Exercism and Codewars test runners, and freeCodeCamp running tests from the browser against the learner's own URL.
- **End-state checks of an environment.** Microsoft Applied Skills, AWS challenge labs.
- **Human judgment.** Exercism mentors, Codewars solution reveal, hackathon juries.

For n8n-challenges.app, four objective checks need no backend and are cheap: hashed answers to fixture puzzles (with variants), a browser "lint" of pasted workflow JSON, a live browser test of the learner's production webhook (the n8n Webhook node allows CORS), and output pasting with a deep-compare diff. The single organizer checker workflow adds hidden tests, fault injection and signed completion codes. The browser verifies those codes with a public key, so no database is needed. A self-check rubric stays as the fallback for chat, Telegram and creative AI outcomes, but each requirement should name an observable test.

### Cited Findings
- AoC verifies answers to per-user inputs: each person gets different input and must produce a different correct answer — [Wikipedia: Advent of Code](https://en.wikipedia.org/wiki/Advent_of_Code)
- n8n's new Weekly Challenge works the same way with n8n: per-user datasets generated from usernames, automatic answer checks, and workflow JSON validated at season end — [n8n announcement](https://community.n8n.io/t/introducing-the-n8n-community-weekly-challenge-a-new-automation-problem-every-monday/311603); [CWC site](https://marketing.app.n8n.cloud/webhook/cwc/site)
- SQL Murder Mystery checks the answer inside the learner's own SQL environment (`INSERT INTO solution …; SELECT value FROM solution;`), with no server — [NUKnightLab/sql-mysteries](https://github.com/NUKnightLab/sql-mysteries)
- Kaggle Learn exercise checks report correct, incorrect or not attempted, alongside layered hints and a solution reveal — [Kaggle learntools README](https://github.com/Kaggle/learntools/blob/master/learntools/README.md)
- freeCodeCamp runs tests against a learner-supplied project URL and stores that URL in progress. Localhost works if the server is running. Forum and issue titles report false passes with arbitrary URLs — [GitHub issue #10901](https://github.com/freeCodeCamp/freeCodeCamp/issues/10901); [freeCodeCamp News](https://www.freecodecamp.org/news/how-to-run-the-freecodecamp-backend-challenges-locally/); [forum thread](https://forum.freecodecamp.org/t/project-solution-verification-works-with-any-url/423853)
- Microsoft Applied Skills labs are scored by a script that checks the environment's final state, judging results rather than methods — [Microsoft Learn](https://learn.microsoft.com/credentials/support/assessment-duration-lab-experience); [TechTarget](https://www.techtarget.com/searchwindowsserver/tip/Microsoft-Applied-Skills-program-puts-expertise-to-the-test)
- Exercism pairs automated test runners and analyzers with optional human mentoring — [Exercism Python track](https://exercism.org/tracks/python); [Exercism blog](https://exercism.org/blog/whats-new-in-v3-with-angelika)
- Kaggle's hidden private test split exists because people overfit to visible feedback — [DataCamp](https://campus.datacamp.com/courses/winning-a-kaggle-competition-in-python/kaggle-competitions-process?ex=8); [Blum & Hardt 2015](https://proceedings.mlr.press/v37/blum15.pdf)
- **n8n Webhook node** — [n8n docs: Webhook node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
  - It has an "Allowed Origins (CORS)" option for cross-origin non-preflight requests, and it defaults to `*`.
  - The test URL works only while "Listen for Test Event" is active. The production URL registers when the workflow is published.
  - Response modes include "Using 'Respond to Webhook' Node". Authentication can be Basic, Header or JWT.
  - Options include an IP allowlist and Ignore Bots.
- An n8n Cloud production webhook is a public HTTPS URL; the CWC site itself is served from one (`https://marketing.app.n8n.cloud/webhook/cwc/site`) — [CWC site](https://marketing.app.n8n.cloud/webhook/cwc/site)
- **Workflow import, export and copy-paste** — [n8n docs: Export and import](https://docs.n8n.io/build/manage-workflows/export-and-import.md)
  - Selected nodes can be copied and pasted with Ctrl/Cmd+C.
  - The editor offers "Import from URL" and "Import from File".
  - Exported JSON contains credential names and IDs but not secret values.
  - HTTP Request nodes may contain authentication headers when imported from cURL, and users should remove them before sharing.
- Pinned data is for development only and is not used in production executions. Data that includes binary content cannot be pinned, and pinning works only for nodes with a single main output — [n8n docs: Pin and mock data](https://docs.n8n.io/build/work-with-data/pin-and-mock-data.md)
- **n8n light evaluations** — [n8n docs: Run quick evaluations](https://docs.n8n.io/build/integrate-ai/test-and-improve-ai-workflows/run-quick-evaluations.md)
  - The Evaluation Trigger runs dataset rows (stored in a Data Table or Google Sheets) through a workflow, and the "Set Outputs" action writes results back next to the expected outputs.
  - Availability: all n8n Cloud plans, and self-hosted registered Community, Business and Enterprise editions.
- The n8n Crypto node can Hash (MD5, SHA256, SHA3-*, SHA384, SHA512), Hmac, Encrypt/Decrypt, Generate, and Sign ("Sign a string using a private key") — [n8n docs: Crypto node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/)
- The n8n JWT node supports Decode, Sign and Verify, with an "Override Algorithm" option. The algorithm list was not shown in the fetched text — [n8n docs: JWT node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.jwt.md)
- **Chrome Local Network Access.** Since Chrome 142 (28 Oct 2025), Chromium browsers ask the user's permission when a public website requests a loopback address (127.0.0.0/8, ::1) or a private-network address — [gHacks](https://www.ghacks.net/2025/10/29/google-chrome-142-restricts-local-network-access-and-changes-sync-on-desktop/); [OpenReplay explainer](https://blog.openreplay.com/chrome-local-network-access-lna-permission/)
- The browser Web Crypto API offers `digest()` (for example SHA-256) and `verify()` for signature schemes including RSASSA-PKCS1-v1_5, ECDSA and HMAC, which allows offline answer hashing and signature checks in static pages — [MDN: SubtleCrypto.digest](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest); [MDN: SubtleCrypto.verify](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify) (standard API reference, not re-fetched)
- The older n8n text courses had learners sign up for a unique ID, received by email, and enter it as a parameter value in the HTTP Request node so progress could be tied to the learner — [n8n Community thread](https://community.n8n.io/t/where-do-i-enter-my-unique-id-in-the-nathans-workflow-exercise-in-the-course/23679)
- Official badge pipelines are fragile too. On 5 Oct 2026 n8n staff said badges count submitted "workflows and quizzes", and that the Foundations program badge was "currently disabled due to a bug in our LMS" — [n8n Community thread](https://community.n8n.io/t/completed-all-three-academy-courses-but-n8n-foundations-badge-didnt-trigger/302632)
- Novices tend to overestimate their own performance; bottom-quartile participants grossly overestimated theirs — [Kruger & Dunning 1999](https://doi.org/10.1037/0022-3514.77.6.1121) (DOI, not re-fetched). A review found rubrics support formative self-assessment mainly by making criteria transparent and supporting self-regulation — [Panadero & Jonsson 2013](https://doi.org/10.1016/j.edurev.2013.01.002) (DOI, not re-fetched)

### Inferences

**A verification ladder for the site.** Levels 0–3 run entirely in the browser with localStorage; level 4 uses the one organizer workflow.

| Level | Method | How it works on n8n-challenges.app | Fits | Cheat resistance | Cost |
|---|---|---|---|---|---|
| 0 | Self-check rubric (the open proposal) | The 3 requirements become checkboxes, each with a concrete observable test ("open URL?name=Ana → you see 'Hola Ana'"). "Solved" is stored in localStorage. | Everything, especially Telegram, chat, vision and MCP | Honor only | Very low |
| 1 | Answer check | The answer is normalized (trimmed, lower-cased, NFKD with diacritics removed so "José" equals "Jose"), salted with challenge and variant ID, SHA-256'd with `crypto.subtle.digest`, then compared with hashes in the page. Variants are picked from a random learner seed in localStorage. | F2 detective, F5 hidden checksum, F8 hidden labels, 07 (new listings on day 2), 10 (answer + cited file) | Medium. Use compound answers (e.g. `orderId-total`) so small answer spaces can't be brute-forced. | Low (build-time generator) |
| 2 | Workflow-JSON lint | The learner pastes copied nodes or the exported workflow into a textarea. The page parses it locally (nothing is uploaded) and checks node types, node count, connections and selected settings. It warns about cURL auth headers. | F1, F3, F4, F6, F7: constraints ("no `n8n-nodes-base.code`", ≤ N nodes), wiring, required nodes (Error Trigger, Execute Workflow, AI tool) | Medium (JSON can be edited, but the effort teaches anyway) | Low |
| 3 | Live browser test (freeCodeCamp model) | The learner pastes their production webhook URL. The page sends 2–5 fixture requests and asserts on status and body. This needs the workflow published and the Webhook's Allowed Origins left at `*` or set to the site's origin. | 01, F1, form and webhook challenges, 11 if exposed through a webhook, 04 via a webhook variant | High for behaviour | Low, but must handle CORS, n8n Cloud vs self-hosted, and the Chrome 142+ Local Network Access prompt for localhost |
| 4 | Organizer checker workflow (one n8n workflow, reusing the 09 infrastructure) | (a) "Call me": the learner's workflow POSTs its result plus learner seed to the checker. (b) "I call you": the checker sends hidden test cases to the learner's URL. Either way, the checker answers with a signed completion code (JWT or Crypto "Sign" with the organizer's private key). The site verifies the code with the embedded public key via Web Crypto and stores it. | 09, F7a hardening with fault injection, hidden-test AI challenges, non-CORS endpoints | High | Medium: uptime, rate limits, abuse, privacy (log nothing personal) |
| 5 | Showcase and peer review | After solving, reveal reference solutions (Pixtex images and JSON already exist). Revealing before solving marks it as "solved with solution", in the style of Codewars "Unlock Solutions". Optional link to an n8n forum or GitHub Discussions thread per challenge. | Bonus tasks, creative AI outputs | Low | Moderation if hosted |

**Details that make the ladder work**
- **Portable progress without accounts.** Signed level 4 codes, and even level 1–2 results, can be exported as a small JSON "progress passport" and imported on another device. This fixes localStorage being tied to one device without adding a database. A signed code tied to the learner seed is self-verifying, so the checker stores nothing.
- **Keep browser tests as "simple" CORS requests**, such as GET with query parameters. The n8n docs describe Allowed Origins for non-preflight requests. Before relying on POST+JSON tests or on Respond to Webhook responses, prototype preflight handling and response headers on n8n Cloud and self-hosted.
- **Use per-learner variants to stop answer spoilers**, not to enforce security. Copied answers from blogs, forums or LLM chats then fail, because cheating on a self-paced site mostly costs the learner (AoC's gym comparison). Static variants (16–32 per puzzle, generated at build time from a seed) avoid needing the organizer workflow to create data, unlike n8n CWC, which generates data per username on its own backend.
- **Practice APIs.** n8n Academy hosts its own practice APIs to remove account friction. The site can do the same at zero cost with static JSON on GitHub Pages (path-based pages such as `orders-2.json`; GitHub Pages ignores query strings, which is an inference to confirm). Dynamic or faulty behaviour can stay in the one organizer workflow (09's unstable API).
- **Best objective check for each existing challenge** (to replace or supplement the mentor):
  - 01: level 3 (GET with and without `name`) plus level 2.
  - 02: level 0 plus level 2 (Schedule + HTTP + Telegram present), or level 1 by asking for the AQI value of a pinned fixture snapshot.
  - 03: level 2 plus level 0. A bonus IF-validation check could run as level 3 if a Webhook variant is allowed.
  - 04: level 1 (classify 10 given requests; hashed labels with a threshold) or F8.
  - 05: level 2 plus level 1 (brief built from a supplied Trello-like JSON fixture instead of live Trello).
  - 06: level 0, plus the WordPress draft title containing the learner seed (self-check).
  - 07: level 1. The day-1 and day-2 fixtures already exist, so the learner submits the IDs of new listings on day 2.
  - 08: level 0 or 3 (MCP over HTTP from the browser is unverified).
  - 09: level 4 (the checker validates the recovered order IDs and returns a signed code).
  - 10: level 1 (answers plus source file names over the three fixture documents).
  - 11: level 1 or 3 (translate 5 supplied messages; compare the structured JSON).
  - 12, 13: level 0 plus level 2.
- **Self-check rubric caveat.** Novices overestimate themselves, so every rubric item should name an observable artifact (a response text, an execution status, a row in a Data Table) rather than "it works".

### Gaps
- Not verified: whether the Webhook node's CORS option also answers OPTIONS preflight requests, and whether CORS headers are added when the "Using Respond to Webhook node" mode is used. Prototype before building level 3 tests.
- Not verified: whether "Import from URL" is fetched by the n8n server or the browser (this matters for hosting broken fixtures), and whether copied workflow JSON includes pinned data.
- JWT node algorithms (e.g. RS256 or ES256) and Crypto "Sign" algorithm names were not listed in the fetched docs. Browser compatibility with an n8n-generated signature needs a prototype.
- Safari and Firefox behaviour for a public HTTPS page calling `http://localhost:5678` (mixed content and local-network rules) was not researched. Only Chrome's Local Network Access change was verified.
- How n8n Academy technically grades the hands-on exercises (practice-API logs vs submitted JSON) was not found.

## Q3. What learning-science evidence applies (worked examples, faded guidance, cognitive load, hints, retrieval, interleaving, desirable difficulties, authentic tasks, transfer, motivation)?

### Takeaway
The evidence supports the site's short, authentic, hands-on tasks and its progressive tips, and suggests six improvements:
- Fade support within each track: worked example → completion problem → independent build → remix or debug. Worked examples help novices but become redundant or harmful as expertise grows (expertise reversal).
- Design hints against "click through to the bottom-out hint" behaviour.
- Add debug-and-fix (erroneous examples) and Parsons-style assembly, which work best with explanations and are time-efficient.
- Use mixed-review challenges with unnamed concepts for retrieval and interleaving.
- Let intermediate and advanced learners attempt before tips (productive failure), but give beginners examples first.
- Keep gamification light. Effects are small and less stable for motivation; badges can raise activity; broken streaks demotivate out of proportion.

### Cited Findings

**Worked examples, fading and cognitive load**
- Studying worked examples can replace part of problem solving for novices and speed later problem solving — [Sweller & Cooper 1985](https://doi.org/10.1207/s1532690xci0201_3) (DOI, not re-fetched); minimal guidance is less effective and efficient for novices — [Kirschner, Sweller & Clark 2006](https://doi.org/10.1207/s15326985ep4102_1) (DOI, not re-fetched)
- Worked examples work best early in skill acquisition and problem solving later. A "smooth" transition that fades worked-out steps one by one helps learning — [Renkl & Atkinson 2003, Educational Psychologist 38:15–22](https://www.semanticscholar.org/paper/Structuring-the-Transition-From-Example-Study-to-in-Renkl-Atkinson/03a9b918adff333db5d7d960f9b9a6b8128fe34f); [Atkinson, Renkl & Merrill 2003 (fading + self-explanation prompts)](https://www.semanticscholar.org/paper/Transitioning-From-Studying-Examples-to-Solving-of-Atkinson-Renkl/5057f7decd1e13fc2ab90cf65ca6cc1f79026a6a); [Renkl et al. 2004, "How fading worked solution steps works"](https://link.springer.com/article/10.1023/B:TRUC.0000021815.74806.f6)
- Expertise reversal: methods that help novices can lose their benefit or even hurt more experienced learners. For example, worked examples become redundant guidance that still costs working memory — [Kalyuga, Ayres, Chandler & Sweller 2003](https://www.scirp.org/reference/referencespapers?referenceid=747628) (DOI 10.1207/S15326985EP3801_4); [Wikipedia: Expertise reversal effect](https://en.wikipedia.org/wiki/Expertise_reversal_effect)

**Hints**
- In Geometry Cognitive Tutor logs, students often clicked through hint levels to reach the final "bottom-out" hint that gives the answer. They viewed 68% of the earlier hint levels for under a second, and were also reluctant to ask for help when they needed it. Help aids learning, but "only so much" — [Aleven, Roll, McLaren & Koedinger 2016, IJAIED](https://link.springer.com/article/10.1007/s40593-015-0089-1)
- Step-based tutoring systems reach effect sizes close to human tutoring (about d=0.76 vs 0.79) — [VanLehn 2011](https://doi.org/10.1080/00461520.2011.611369) (DOI, not re-fetched)
- Layered hints followed by a solution reveal are a standard self-paced pattern (Kaggle `hint(n)` then `solution()`). CTFd shows hint titles before unlocking — [Kaggle learntools](https://github.com/Kaggle/learntools/blob/master/learntools/README.md); [CTFd Hints](https://docs.ctfd.io/docs/challenges/hints/)

**Erroneous examples and Parsons problems**
- Erroneous ("find and fix the error") examples show mixed results. Some studies found no advantage, or a disadvantage, compared with correct examples. Others found gains when extra help or explanations were given — [Tsovaltzi et al. 2010, "Learning from erroneous examples: when and how do students benefit from them?"](https://link.springer.com/chapter/10.1007/978-3-642-16020-2_24); a 2022 study summary reports that self-explanation prompts or instructional explanations improve learning from erroneous examples, building on Große & Renkl (2007, Learning and Instruction) — [Frontiers in Psychology 2022](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.1032003/full)
- Programming-specific work on erroneous worked examples exists (Learning and Instruction 2021, "Which type of error is beneficial for learning?") — [ScienceDirect abstract page](https://www.sciencedirect.com/science/article/abs/pii/S0959475221000566) (not fetched; findings not extracted)
- Two-dimensional Parsons problems with distractors took significantly less time than fixing buggy code or writing code from scratch. Learning and one-week retention were not significantly different — [Ericson, Margulieux & Rick 2017, Koli Calling](https://www.researchgate.net/publication/320850846_Solving_parsons_problems_versus_fixing_and_writing_code) (DOI 10.1145/3141880.3141895)

**Progressions and authentic tasks**
- Use-Modify-Create: learners first use existing programs, then modify them, then create their own. PRIMM (Predict, Run, Investigate, Modify, Make) extends it, based on evidence that learners who can read code write it better — [PRIMM portal: research](https://primmportal.com/research/); [ResearchGate: Use, Modify, Create comparisons](https://www.researchgate.net/publication/334578175_Use_Modify_Create_Comparing_Computational_Thinking_Lesson_Progressions_for_STEM_Classes)
- Learning improves when learners work on real-world problems with activation, demonstration, application and integration phases — [Merrill 2002, First Principles of Instruction](https://doi.org/10.1007/BF02505024) (DOI, not re-fetched). 4C/ID sequences whole tasks from simple to complex classes, with support fading within each class — [van Merriënboer, Clark & de Croock 2002](https://doi.org/10.1007/BF02504993) (DOI, not re-fetched)
- Far transfer depends on how far the learning and use contexts differ (domain, physical, temporal, functional, social, modality) — [Barnett & Ceci 2002](https://doi.org/10.1037/0033-2909.128.4.612) (DOI, not re-fetched)

**Retrieval, interleaving and desirable difficulties**
- Taking a test improved long-term retention more than restudying — [Roediger & Karpicke 2006](https://doi.org/10.1111/j.1467-9280.2006.01693.x) (DOI, not re-fetched). A major review rated practice testing and distributed practice "high utility" and interleaved practice "moderate utility" — [Dunlosky et al. 2013](https://doi.org/10.1177/1529100612453266) (DOI, not re-fetched)
- Interleaving meta-analysis (59 studies, 238 effect sizes): the effect on mathematical tasks was about g=0.34. Interleaving helps more when categories look similar to each other and examples within a category differ, and it backfires for word learning — [Brunmair & Richter 2019, Psychological Bulletin](https://www.researchgate.net/publication/335004545_Similarity_matters_A_meta-analysis_of_interleaved_learning_and_its_moderators) (secondary summaries differ on the overall pooled g; check the paper)
- Productive failure meta-analysis (53 studies, 166 comparisons): problem solving before instruction beat instruction first, g=0.36 [0.20, 0.51], and g=0.37–0.58 when implemented with high fidelity. Effects favoured instruction first for younger learners (grades 2–5) and for domain-general skills — [Sinha & Kapur 2021, Review of Educational Research](https://eric.ed.gov/?id=EJ1308129); [PDF](https://janfasen.nl/wp-content/uploads/2023/05/Sinha-and-Kapur-PS-I.pdf)

**Doing and completion in self-paced settings**
- In a MOOC, interactive "doing" activities were associated with about six times more learning than watching videos or reading (the "doer effect") — [Koedinger et al. 2015, L@S](https://doi.org/10.1145/2724660.2724681) (DOI, not re-fetched)
- MOOC completion rates stayed low and did not improve over six years of data — [Reich & Ruipérez-Valiente 2019, Science](https://doi.org/10.1126/science.aav7958) (DOI, not re-fetched)

**Feedback, rewards and gamification**
- Feedback works best when it addresses the task, the process and self-regulation, and worst when it is about the learner as a person — [Hattie & Timperley 2007](https://doi.org/10.3102/003465430298487) (DOI, not re-fetched)
- Gamification meta-analysis: small significant effects on cognitive (g=.49), motivational (g=.36) and behavioural (g=.25) outcomes. Only the cognitive effect held up in methodologically rigorous studies — [Sailer & Homner 2020, Educational Psychology Review](https://eric.ed.gov/?id=EJ1245270); [full text](https://d-nb.info/1202307655/34)
- A two-year field experiment (N=1,410 before, 1,579 after) found that badges made users more active in a service — [Hamari 2017, Computers in Human Behavior](https://research.aalto.fi/en/publications/do-badges-increase-user-activity-a-field-experiment-on-the-effect/)
- Across seven studies, highlighting intact rather than broken streaks increased later engagement. A broken streak demotivates out of proportion to what was missed, and letting people "repair" a streak reduces the effect — [Silverman & Barasch 2023, Journal of Consumer Research](https://www.insead.edu/faculty-research/publications/journal-articles/or-track-how-broken-streaks-affect-consumer); [UDSpace record](https://udspace.udel.edu/items/42ce576b-8e1f-429a-8541-e29e48dbcfbb)
- Expected tangible rewards undermine intrinsic motivation, while informational and verbal feedback does not — [Deci, Koestner & Ryan 1999](https://doi.org/10.1037/0033-2909.125.6.627) (DOI, not re-fetched)

### Inferences

**Hints: keep five, add three things**
1. Label each tip with its type (Direction, Nodes, Flow, Configuration, Near-solution, as in the archived plan), like CTFd hint titles. Learners can then pick the hint they need.
2. Put a light "pause" before the near-solution tip, such as "Write down what you tried" or a 60-second wait. This counters bottom-out clicking (Aleven et al. 2016).
3. Record tip usage only in localStorage and show a private "solved with 0/5 tips" mark rather than a penalty. CTFd and AWS Jam point costs are for competition, not self-learning.

**Fading by design**
- Within each track, the first challenge should be a fully worked "follow along" (the existing solution JSON and Pixtex images can serve as the worked example).
- Next, a completion problem: import a half-built workflow and finish it.
- Then an independent build, a constraint remix (F3) and a debug or harden task (F1/F7).
- This applies Renkl & Atkinson's fading and 4C/ID's decreasing support within task classes.

**Expertise reversal → "challenge mode"**
- Offer a toggle that hides the "Nodes you'll use" list, the tips and "Before you start" for experienced learners, since that guidance is redundant for them.
- Default to full guidance for search arrivals marked beginner.

**Debug-and-fix needs explanation**
- Every F1 challenge should end with a short "why it broke" explanation and a self-explanation bonus. The erroneous-example evidence is positive mainly when help or explanation is provided.

**Parsons for beginners**
- F4 is quick and, per Ericson et al., as effective as writing from scratch. It lowers the novice's search through the node panel (extraneous load) while keeping the core concept (data flow) intact.

**Retrieval and interleaving**
- Add a "mixed review" checkpoint at the end of each level. Give it only a business task and three requirements, with no node list, and combine concepts from different tracks (e.g. Schedule + HTTP + Filter + Data Table).
- Add a few predict-the-output micro-questions on n8n expressions inside F6. These are retrieval practice.
- Interleave similar-looking but different concepts on purpose (Filter vs IF vs Switch; Aggregate vs Summarize; Merge modes). That is where the interleaving meta-analysis finds the largest gains.

**Productive failure: by level**
- For intermediate and advanced learners, encourage an attempt before opening tips ("try for 10 minutes first").
- For beginners, lead with the worked example. The meta-analysis found instruction first is better for younger learners and general skills, and Kirschner et al. warn about minimal guidance for novices.

**Authentic tasks and transfer**
- Keep business-style briefs and real services, but move practice of the core concept onto fixtures or practice APIs, as n8n Academy does. This keeps cognitive load and signup friction low.
- Use real services in bonuses and campaigns, where the transfer distance (to a real context) is larger.

**Motivation**
- Track badges and a progress map in localStorage are cheap and evidence-compatible.
- Avoid daily streaks. Weekly or "repairable" streaks are safer given Silverman & Barasch.
- Avoid leaderboards. AoC removed its global leaderboard, and gamification's motivational effects are fragile.
- Narrative campaigns (F9) and challenge give motivation without extrinsic rewards.

### Gaps
- The moderator findings in Sailer & Homner 2020 (e.g. whether game fiction or competition plus collaboration matter) were not verified in this session.
- No studies were found on learning workflow automation or low-code tools specifically. All evidence is borrowed from mathematics, programming, ITS and general education research, so how well it transfers to n8n is an inference.
- Several classic studies are cited by DOI from the established literature and were not re-fetched (marked above).

## Q4. Do n8n or its community run challenges, contests or hackathons, and what topics and judging approaches did they use?

### Takeaway
Yes. As of October 2026 n8n officially runs:
1. A monthly Community Challenge (listed from January 2025). Each one uses a fictional but realistic business brief, such as April 2026 "human-in-the-loop for Relay". Winners go into the n8n Template Library and appear on the monthly Community Livestream.
2. A Community Weekly Challenge (launched 7 Sep 2026). It uses per-user datasets, automatic answer checks, native nodes only with no Code node, points, seasons and public profiles.
3. n8n Academy, with practice APIs, quizzes, a final exam and badges.

Partner contests and hackathons use jury rubrics (technology use, user experience, business value, creativity, write-up quality), while the weekly challenge is objective and answer-based. Topics cluster around AI agents, human-in-the-loop, real-time web data, content and HR automation, and data cleanup.

### Cited Findings
- **Monthly Community Challenge**
  - Each month n8n launches a challenge built on a fictional but realistic use case, during a monthly Community Livestream that also announces previous winners — [createwith.com summary](https://www.createwith.com/tool/n8n/updates/n8n-hosts-monthly-community-livestream-featuring-new-challenge-and-demos); [Luma livestream listing](https://luma.com/ku9mklqr)
  - Winners "land in the n8n Template Library" and are featured on the livestream. n8n's post gave a 25 May deadline for the human-in-the-loop challenge, which appears to be the April 2026 "Relay" challenge below — [n8n on X](https://x.com/n8n_io/status/2057447599045509330)
  - April 2026 brief: as the Automation Specialist at the fictional company "Relay", build a human-in-the-loop workflow that helps a creative team produce more content faster while keeping people in control. Full rules live on a Notion page — [n8n Community announcement](https://community.n8n.io/t/n8n-community-challenge-april-2026-build-a-human-in-the-loop-automation-for-relay/294909)
  - A community-run tracker lists monthly challenges from January 2025 to July 2026 — [n8n Arena: Monthly Challenges](https://n8narena.com/challenges/)
  - A third-party community post reports an "NPM Package Intelligence Agent" as an April 2026 spotlight winner — [Skool: AI Automation Society](https://www.skool.com/ai-automation-society/n8n-community-challenge-winner-april-26) (seen in search results only)
- **Community Weekly Challenge (from Sep 2026)**: weekly cadence, per-username datasets, an optional starter workflow, time-based ranking, points and permanent profiles — [n8n announcement](https://community.n8n.io/t/introducing-the-n8n-community-weekly-challenge-a-new-automation-problem-every-monday/311603)
  - "No Code nodes allowed" — [Challenge 01](https://community.n8n.io/t/community-weekly-challenge-01-is-live-the-night-gate/313635)
  - Answers are auto-checked, workflow JSON is validated at season end, and AI reliance is discouraged. Topics so far: The Night Gate, Photo Finish, The Hour That Happened Twice, and The Welcome Desk (event check-ins and kit pickups, data cleanup) — [CWC site](https://marketing.app.n8n.cloud/webhook/cwc/site); [Challenge 04](https://community.n8n.io/t/community-weekly-challenge-04-the-welcome-desk-is-live/318957)
- **n8n Academy**
  - Free courses with hands-on exercises, quizzes, a final exam, practice APIs, and badges and certificates. A separate certification exam is "coming soon" and will be valid for two years — [n8n Education](https://n8n.io/education/); [N8N102 page](https://learn.n8n.io/courses/course-v1:n8n+N8N102+2026H2/about)
  - The older text courses date from 2021: Level 1 took "around two hours" and ended with a quiz and badge — [n8n blog, 28 Jul 2021](https://blog.n8n.io/announcing-the-n8n-certification-course-for-beginners-level-1/)
  - In this session the old docs URLs `docs.n8n.io/courses/level-one/`, `/workflows/export-import/` and `/advanced-ai/evaluations/overview/` returned 404. The docs now point to n8n Academy and a restructured `/build/...` tree — [n8n docs sitemap](https://docs.n8n.io/sitemap.md); [n8n docs: Learning paths](https://docs.n8n.io/learning-paths.md)
- **DEV × Bright Data "Real-Time AI Agents Challenge" (13–31 Aug 2025; winners 11 Sep 2025)**
  - Prompt: build an "Unstoppable Workflow" using n8n's AI Agent node and Bright Data's verified node.
  - Submission: a post with description, demo, workflow JSON (gist or repo) and technical details.
  - Judging criteria: utilization of the underlying technology; accessibility and UX; business value and use case; creativity and usability; writing quality.
  - Verification: the project had to be publicly accessible through n8n's chat interface (or another interaction layer), or include a demo video — [DEV challenge page](https://dev.to/challenges/brightdata-n8n-2025-08-13)
  - Prizes conflict: the DEV announcement says $5,000 across five winners, while the challenge page summary mentions gift cards and $250 Bright Data credits for participants — [DEV announcement](https://dev.to/devteam/join-the-real-time-ai-agents-challenge-powered-by-n8n-and-bright-data-5000-in-prizes-across-five-3nmb)
- **n8n AI Workflow Hackathon** (San Francisco, 31 May–1 Jun 2024): an official n8n community event, 2 days in person, teams of up to 5, $5,000 prize pool. Tracks: Autonomous Content Creator, Automated HR Onboarding and Engagement, Personal Health Coach, and Open Innovation. Judging criteria were not published on the event page — [Luma](https://luma.com/n8n-aiworkflow-hack)
- **Other events**
  - Devpost "Agents In The Loop Hackathon 2025" had an "n8n agent swarm" track, and n8n's community manager was on the judging panel — [Devpost](https://agents-in-the-loop-2025.devpost.com/) (search snippet)
  - Community-run n8n hackathons are listed for Budapest and Cluj-Napoca (2026) — [Luma: n8n Budapest Hackathon](https://luma.com/07k0nnqa); [createwith: Cluj Hackathon 2026](https://createwith.com/event/montreal-n8n-cluj-napoca-community-meetup-opens-cluj-hackathon-2026-may-2026) (search listings only)
  - A community member proposed a "Summer Workflow Design Challenge" in June 2025 about visual styling of workflows. Rules, judging and prizes were not defined — [n8n Community](https://community.n8n.io/t/n8n-summer-workflow-design-challenge/125673)

### Inferences
- **Position the site against n8n's own offer.**
  - n8n Academy covers fundamentals with practice APIs and exams.
  - The CWC covers timed, competitive data puzzles under a no-Code rule.
  - The monthly challenge covers open-ended, jury-judged showcase builds.
  - The site's natural niche: evergreen, untimed, trilingual (es, uk, en), Valencia-flavoured, business-style practice with tips, using real services where they add authenticity, and verified mostly in the browser.
- **Borrow the parts that work for self-paced use.**
  - From CWC: per-learner variants, single-answer checks, the no-Code constraint and starter workflows.
  - From the monthly challenge: fictional-company briefs for campaigns (F9).
  - From DEV/Bright Data: a 4-criterion self-review rubric for open bonus tasks (business value, UX, use of n8n features, clarity of explanation).
- **Avoid duplication with CWC.** Data-cleanup detective puzzles (F2) overlap in style, so the site should not copy CWC's competitive mechanics (time ranking, seasons, points). Link to CWC for learners who want competition.
- **Link maintenance.** n8n's docs restructure broke several old docs URLs. The site's README requires every node to link to docs; node pages under `/integrations/builtin/` still resolved in this session, but other deep links should be checked.

### Gaps
- The monthly challenge's official rules, judging criteria and weights (on n8n.notion.site/community-challenge) could not be fetched; the page did not render.
- The full list of monthly themes for 2025–2026 could not be extracted; n8n Arena loads its data dynamically.
- It is unclear how CWC validates workflow JSON at season end (manual or automated), and whether n8n Academy offers Spanish or Ukrainian content (not stated).
- Judging criteria for the 2024 San Francisco hackathon and the community hackathons were not found.

## Q5. How should a beginner→advanced path be sequenced (tracks, prerequisites, challenge count per level) for a catalog growing beyond 13 challenges?

### Takeaway
Use 4 topic tracks plus a short shared on-ramp, linked by soft prerequisites (concept tags, never hard locks, because learners arrive from search). Inside each track, use the same progression from guided to independent, with a mixed-review checkpoint at the end of each level and story campaigns as cross-track capstones. Weight the catalog toward more practice at lower levels, roughly 40% beginner, 35% intermediate and 25% advanced. This mirrors the shape of Frontend Mentor's recommended path and n8n Academy's Quickstart → Essentials → Integrations → In Practice. The current catalog is AI-heavy (7 of 13) and thin on data handling and reliability (1–2 each). New formats should fill those tracks first, and they need no signups.

### Cited Findings
- Frontend Mentor's recommended path is 5–10 Newbie, 5–8 Junior, 3–5 Intermediate, then 2–3 Advanced. Learners should advance when the current level feels comfortable and stay if core concepts are still a struggle — [Frontend Mentor: Difficulty levels](https://www.frontendmentor.io/guides/difficulty-levels)
- n8n's official path is Quickstart (QS101), then Foundations: N8N101 Essentials (canvas, nodes, executions, triggers, data mapping) → N8N102 Integrations (flow control, sub-workflows, errors, APIs, auth, webhooks, credentials) → N8N103 In Practice (AI agents, testing, debugging, Try/Catch, production readiness) — [n8n Education](https://n8n.io/education/)
- N8N102 expects comfort with the canvas, items and JSON, and expressions, and recommends N8N101 first otherwise — [N8N102 page](https://learn.n8n.io/courses/course-v1:n8n+N8N102+2026H2/about)
- Make Academy runs Foundation → Basics (data manipulation) → Intermediate (iterators, aggregators, webhooks) → Advanced — [Make Community: course overview](https://community.make.com/t/make-academy-course-overview/29699)
- Exercism's syllabus is a concept tree in which learning concepts unlocks exercises — [Exercism blog](https://exercism.org/blog/whats-new-in-v3-with-angelika); [Python track](https://exercism.org/tracks/python)
- Codewars ranks progress from 8 kyu to 1 kyu, then dan — [Codewars docs](https://docs.codewars.com/gamification/)
- AWS separates guided labs (beginners) from unguided challenge labs (experienced learners) — [Whizlabs](https://www.whizlabs.com/blog/guided-lab-vs-lab-challenges/)
- CTFd supports unlockable challenges with prerequisites — [CTFd tutorial](https://docs.ctfd.io/tutorials/challenges/creating-an-unlockable-challenge/)
- Fading of guidance and expertise reversal support moving from examples to independent problems as skill grows — [Renkl & Atkinson 2003](https://www.semanticscholar.org/paper/Structuring-the-Transition-From-Example-Study-to-in-Renkl-Atkinson/03a9b918adff333db5d7d960f9b9a6b8128fe34f); [Kalyuga et al. 2003](https://www.scirp.org/reference/referencespapers?referenceid=747628). Use-Modify-Create and PRIMM support use → modify → create — [PRIMM portal](https://primmportal.com/research/)

### Inferences

**Proposed structure (target ≈ 30 challenges)**

| Track | Concepts | Existing | Proposed additions (format) | Target |
|---|---|---|---|---|
| 0. Start here (on-ramp, no signups, ~45 min total) | Canvas, items/JSON, expressions, executions, test vs production URL | 01 Valencia Greeting | "Hola Valencia" (backlog C10, Manual Trigger, worked example); "Contact Form, Unplugged" (F4 Parsons); "Read Before You Build" (F6) | 3–4 |
| A. Integrations & APIs | HTTP Request, auth, pagination, webhooks, schedules, credentials | 02 (B), 05 (I), 07 (I), 09 (A) | "The Greeting Is Broken" (F1, B); "Case File: Paella" (F2, I); "Apartment Watch: no Code" (F3, I) | 6–7 |
| B. Data handling | Data Tables, Filter/IF/Switch, Sort/Limit, Aggregate/Summarize, Merge, dates and time zones, dedupe | 03 (B); 05 cross-listed | "Rebuild the Fallas Report" (F5, B); "Morning Brief, native only" (F3, I); "Why did last night's run fail?" (F1, I); a hidden-variant detective (F2, A) | 6 |
| C. AI | Structured output, agents, tools, memory, vision, RAG, MCP, evaluation | 11, 12, 13 (B); 04, 06 (I); 10, 08 (A) | "Beat the Baseline" (F8, I); an agent-tool debug task (F1, I) | 8–9 |
| D. Reliability & operations | Retries, Error Trigger, idempotency, sub-workflows, webhook security, refactoring | 09 (A), cross-listed | "Untangle the Notification Spaghetti" (F7b, I); "Harden the Air-Quality Bot" (F7a, A); "Lock the Door" (secure a webhook with Header auth and an IP allowlist; F1/F3 lint + live test, I) | 5–6 |
| Capstones | Interleaved review across tracks | – | "Fallas Week Ops" (F9, 5 episodes); one level-end "mixed review" checkpoint per level | 2–3 |

(B = beginner, I = intermediate, A = advanced.)

**Counts per level**
- Today: 6 beginner (01, 02, 03, 11, 12, 13), 4 intermediate (04, 05, 06, 07), 3 advanced (08, 09, 10).
- At about 30 challenges: about 12 beginner, 10–11 intermediate and 7–8 advanced. This follows the more-practice-low shape of Frontend Mentor's path.
- Rule of thumb: each track gets at least 2 beginner challenges before its first intermediate one, and at least one debug or hardening task before its advanced ones.

**Within-track sequence (the same pattern in every track)**
1. Worked or follow-along (solution visible).
2. Completion: import a partial workflow and finish it.
3. Independent build: today's standard format.
4. Constraint remix or match-the-output.
5. Debug, refactor or harden.
6. Advanced open build or campaign episode.

This applies fading, Use-Modify-Create and 4C/ID's decreasing support within task classes.

**Prerequisites**
- Tag each challenge with 1–3 concept tags (e.g. `webhook`, `expressions`, `http-pagination`, `data-table`, `ai-agent`, `structured-output`, `error-handling`) and list at most 2 "recommended before" challenges, in Exercism concept-tree style.
- Never hard-lock. Show a one-line "New to n8n? Do Start here 1–3 first (~45 min)" banner on any page reached from search.
- CTFd-style unlocking is used only inside campaigns (part 2 after part 1).

**Level definitions aligned with n8n Academy** (lets the site say "practice for course X" and complement rather than duplicate the Academy)
- Beginner: can do Quickstart/N8N101 skills.
- Intermediate: N8N102 skills (APIs, auth, pagination, webhooks, sub-workflows, errors).
- Advanced: N8N103 skills (agents, testing, debugging, production readiness).

**Mode and badges**
- "Challenge mode" (no node list, no tips) for experienced learners (expertise reversal).
- Track badges and a "Start here" completion badge in localStorage, made portable with the signed-code "progress passport" from Q2.
- No streaks or leaderboards.

**Translation-cost ordering for new work**
- Cheapest first: constraint remixes (F3) and predict-run-modify (F6), which reuse existing trilingual content.
- Then detective and match-the-output (F2/F5): short story, language-neutral data.
- Then debug and refactor (F1/F7): new JSON, but node names can stay English.
- Campaigns (F9) cost the most.

### Gaps
- No empirical source gives an optimal number of challenges per level for automation or low-code learning. The 40/35/25 split is an inference from Frontend Mentor's recommended counts and from expertise-reversal logic.
- The site's own completion and drop-off data per challenge and per tip (which would show where to add beginner practice) is not available to this research. Privacy-friendly aggregate analytics, or the localStorage "progress passport" exported voluntarily, would be needed.
- Whether n8n Academy course content overlaps specific site challenges (e.g. its webhook or error-handling exercises vs 01 and 09) could not be checked, because the course pages behind sign-in were not accessible.
