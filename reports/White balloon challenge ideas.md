# White balloon challenge ideas – October 2026

Built on 10 October 2026 as challenges 14–16: #1 Who's in Space Right Now? (`who-is-in-space`), #7 Build the League Table (`league-table`) and #15 Has My Password Leaked? (`password-leak-check`).

26 new ideas for the "Need more challenges?" collection (`collection: more`, white balloon `#fffdf6`), plus a bench of runners-up. None is tied to Spain: they are global, US- or EU-flavoured. Researched on 9 October 2026.

## How the list was built

- **What people want to automate.** IFTTT applet user counts, Hacker News "what have you automated" threads, Lemmy (Reddit was unreachable), GitHub stars of self-hosted tools, Home Assistant install counts and n8n template views.
- **Surveys.** Business and AI-adoption surveys from the US and EU (see the surveys section).
- **Other challenge sites.** roadmap.sh projects, freeCodeCamp, the Cloud Resume Challenge, rpachallenge.com, Automation Anywhere Pathfinder, Ruby Quiz, Tally/Typeform quiz templates, SQL Murder Mystery and practice sandboxes such as toscrape.com. We adopt the idea, never the text or data.
- **Live checks.** Every API named below was called on 9 October 2026 without a key, and the n8n mechanics were checked against n8n 2.42.6 (stable) and the 3.0 notes.

Rules applied: no account beyond n8n except, at most, one free AI model key; no Google/Microsoft OAuth or WhatsApp; the learner can check the result alone (printed answer, exact count, visible behaviour); and each idea teaches something the 13 current challenges don't. Ideas already proposed in `reports/New n8n challenge ideas.md` (6 Oct) are not repeated, except where noted.

Levels: ★ beginner … ★★★ intermediate. The current white balloons (11–13) are all ★★ beginner, so if white balloons should stay beginner-only, start with the ★ and ★★ ideas.

---

## A. Just for fun

### 1. Who's in Space Right Now? · ★ · 15–20 min
- **Task:** "Every morning, send me the names of everyone in space right now, grouped by space agency. Only count people."
- **Bonus:** message only when someone arrives or leaves, by comparing with yesterday's list stored in a Data Table.
- **Teaches:** HTTP Request, Split Out, Filter, Summarize; bonus Compare Datasets.
- **Data:** Launch Library 2, keyless: `https://ll.thespacedevs.com/2.3.0/astronauts/?in_space=true&mode=list`. Anonymous calls are rate-limited, so pin the response while building.
- **The twist:** on 9 Oct 2026 the API listed 11 "astronauts in space", one of them **Starman** – SpaceX's mannequin, type `Non-Human`. The right answer was 10 people: NASA 3, Roscosmos 3, CNSA 3, CSA 1. A gentle first lesson in not trusting data blindly.
- **Self-check:** the count equals the API's list minus non-humans; names match.
- **Why:** IFTTT's space applets have 366k, 266k and 74.3k users (the last is an "astronauts in space" alert).

### 2. Northern Lights Tonight? · ★★ · 25–35 min
- **Task:** "Text me only on evenings when the northern lights could be visible from my city and the sky is clear enough to see them."
- **Bonus:** replay the great storm of 10–11 May 2024 (Kp reached 9.0) and prove the alert would have fired.
- **Teaches:** two HTTP Requests merged into one decision (Merge), IF with two conditions, Schedule, a notification (ntfy.sh or Telegram send, neither needs a trigger).
- **Data:** NOAA SWPC Kp JSON (its format changed in March 2026, so older tutorials break) or GFZ Potsdam's Kp API for history (`https://kp.gfz.de/app/json/?start=…&end=…&index=Kp`, CC BY 4.0); Open-Meteo cloud cover. All keyless.
- **Self-check:** 10 May 2024 → alert; a quiet date → no alert.
- **Why:** an aurora dashboard is the top reply in a Lemmy "What are you using n8n for?" thread; Home Assistant's aurora integration has 3,375 installs; n8n has no aurora template at all.

### 3. Never Miss an Episode · ★★ · 20–30 min
- **Task:** "Each morning, tell me which of my favourite shows have a new episode today, and what time it airs where I live."
- **Variant:** race weekends (Formula 1 via the keyless Jolpica API) – same skill, different fans.
- **Bonus:** attach a calendar file (Convert to File → ICS).
- **Teaches:** time zones and dates – converting a UTC `airstamp` to local time, filtering by "today".
- **Data:** TVmaze, keyless (CC BY-SA; summaries contain HTML).
- **Self-check:** a pinned past date with the expected list on the page.
- **Why:** media trackers are popular self-hosted apps (Ryot 3.6k★), but n8n TV templates have 0 views – open ground.

### 4. Why Do I Keep Losing? · ★★★ · 30–40 min
- **Task:** "Look at my last 100 online chess games and tell me which openings and which colour lose me the most."
- **Bonus:** an AI coach writes three sentences of advice from the numbers.
- **Teaches:** NDJSON (one JSON per line) into items, Summarize by two fields, computed win rates, Sort.
- **Data:** Lichess game export (keyless; one request at a time) or Chess.com monthly archives. A fixture file makes the answer exact; learners can then try their own account.
- **Self-check:** the expected table for the fixture is printed on the page.
- **Why:** chess is one of the biggest online hobbies, and the only n8n Chess.com review template has 2 views.

### 5. Secret Santa Draw · ★★ · 25–35 min
- **Task:** "Collect names for our office Secret Santa, draw who gives to whom – nobody gets themselves – and tell each person privately."
- **Bonus:** couples or families never draw each other; add the budget and wish list to the private message.
- **Teaches:** Form, Data Table, the Code node (shuffle with constraints), Crypto for private reveal links.
- **Data:** none.
- **Self-check:** with six test names, run it three times: everyone gives once, receives once and never draws themselves.
- **Why:** a classic programming puzzle (Ruby Quiz #2) and a tradition in all three site languages (Secret Santa, Amigo invisible, Таємний Санта). Publish in November.

### 6. Roll for It: an AI Game Master · ★★ · 25–35 min
- **Task:** "Run a short fantasy adventure in chat. Whenever the player tries something risky, the game master must roll real dice – no made-up rolls."
- **Bonus:** track health and inventory; the game ends at 0 HP.
- **Teaches:** giving an AI Agent a tool and making it actually use it, memory, and checking tool calls in the execution log.
- **Data:** one free model key.
- **Self-check:** the execution shows one dice call per risky action, and the narrated roll equals the tool's output.
- **Why:** agents inventing tool results is a top failure mode, and this teaches it through play – the same spirit as Alien Translator.

---

## B. Puzzles with one right answer

### 7. Build the League Table · ★★★ · 30–45 min
- **Task:** "Here are all 380 results of last season. Rebuild the final table – points, goal difference, goals scored – in the right order."
- **Bonus:** home-only and away-only tables.
- **Teaches:** turning one match into two team rows, Summarize, Sort with tie-breakers.
- **Data:** openfootball (public domain), e.g. `raw.githubusercontent.com/openfootball/football.json/master/2024-25/en.1.json`. Rebuilt on 9 Oct: Liverpool 84, Arsenal 74, Man City 71, Chelsea 69 … Southampton 12 – identical to the official table. Bundesliga, Serie A and others are in the same repo.
- **Self-check:** compare with the official final table.

### 8. The n8n Murder Mystery · ★★★ · 30–45 min
- **Task:** "Something went missing at a Lisbon hackathon. Use the witness statements, door-badge log and parking records to find who did it."
- **Bonus:** part two – who hired them?
- **Teaches:** Filter, Merge by matching fields, time-window filters; the answer is checked by hashing it with the Crypto node and comparing with the hash on the page, so nothing is spoiled.
- **Data:** our own fixture files.
- **Licence note:** SQL Murder Mystery's content is CC BY-SA 4.0, so adopt the format and write an original case; The Command Line Murders is MIT if adapting is preferred.

### 9. Who Owes Whom After the Trip? · ★★★ · 30–40 min
- **Task:** "Six friends paid for different things on a trip. Work out the fewest bank transfers that settle everything."
- **Bonus:** some costs were paid in dollars or pounds – convert them at that day's ECB rate first.
- **Teaches:** Summarize (paid vs. fair share), the Code node (settle-up), historical API dates.
- **Data:** fixture; Frankfurter for historical ECB rates (keyless, the same answer forever).
- **Self-check:** the exact transfers are printed.
- **Why:** Splitwise-style apps are everywhere (the open-source Spliit has 2,977★).

---

## C. Life admin

### 10. Find the Subscriptions You Forgot · ★★★ · 30–40 min
- **Task:** "Here's a year of bank transactions. Find every charge that repeats each month and tell me what each costs per year."
- **Bonus:** flag subscriptions whose price went up.
- **Teaches:** CSV with Extract from File, Summarize by merchant (count distinct months), Filter.
- **Data:** synthetic CSV fixture.
- **Why:** after Mint closed in 2024, people build their own budget tools: Actual 29.4k★, Firefly III 24.8k★, the subscription tracker Wallos 8.7k★. (The 6 Oct report's "Monthly Spending Report" converts CSV to XLSX; this one detects patterns.)

### 11. Birthdays You'll Never Forget · ★★ · 20–30 min
- **Task:** "Each morning, check our birthday list and send a warm message to anyone celebrating today – and don't forget Lea, born on 29 February."
- **Bonus:** an AI-written message using notes about each person, or a gift reminder three days ahead.
- **Teaches:** Schedule, Data Table, day-and-month date logic, the leap-year edge case.
- **Self-check:** test dates on the page (e.g. 28 Feb 2027 includes Lea).
- **Why:** IFTTT's birthday applet has 82k users and the personal CRM Monica 25.5k★, while the best n8n birthday template has 2,268 views.

### 12. Plan Your Long Weekends · ★★ · 25–35 min
- **Task:** "Show me next year's public holidays in my country and which single days off turn them into the longest breaks. Put them in my calendar."
- **Bonus:** avoid school holidays (OpenHolidays API, EU, keyless).
- **Teaches:** Form, HTTP Request, Convert to File → ICS, and a form that hands back the calendar file.
- **Data:** Nager.Date `LongWeekend` endpoint, keyless. For 2027: US 10 long weekends (2 need a bridge day), Germany 4 (1).
- **Caution:** under martial law Ukraine's public holidays are not days off, so Ukrainian-language examples should use another country.
- **Why:** Home Assistant's workday and holiday sensors have 29k and 13k installs; publishing in Q4 matches vacation planning.

### 13. Job Radar Without the Spam · ★★★ · 30–40 min
- **Task:** "Every morning, show me new jobs that match my skills – remote or in my city – and never the same job twice."
- **Bonus:** an AI score for each job against my CV, with one sentence of reasoning.
- **Teaches:** pagination, Filter, Remove Duplicates across executions, Aggregate.
- **Data:** Arbeitnow (EU jobs, keyless; large pages, so don't over-poll) or Hacker News "Who is hiring?" threads via Algolia (past threads never change). Avoid Remotive and RemoteOK as live sources: about 4 calls a day and strict credit rules.
- **Self-check:** the second run returns nothing new; for a fixed HN month, the page prints the expected count.
- **Why:** AIHawk 31.9k★, the n8n job-search template 9,776 views. A 969-point HN post about scraped cold outreach is why this stays alerts-only.

### 14. Delayed Flight? See What You're Owed · ★★★ · 30–40 min
- **Task:** "Travellers tell us their flight and how late they arrived. Tell them whether EU rules give them €250, €300, €400 or €600 – and draft the claim."
- **Bonus:** an AI-drafted claim letter.
- **Teaches:** Form, lookup in a Data Table, great-circle distance in an expression or Code node, Switch as a rule table.
- **Data:** a trimmed OurAirports fixture (public domain; the full CSV is 12.7 MB). Rules from Your Europe (checked 21 Sep 2026): 3+ hours late at arrival; €250 up to 1,500 km; €400 for longer flights inside the EU or 1,500–3,500 km; over 3,500 km €300 for 3–4 hours late and €600 for 4+ hours; 50% less if re-routed within 2/3/4 hours.
- **Self-check:** six test flights with expected amounts on the page.

### 15. Has My Password Leaked? · ★★ · 15–25 min
- **Task:** "Let staff check whether a password has appeared in a data breach – without the password ever leaving our n8n."
- **Bonus:** refuse breached passwords in a sign-up form; or check company emails against a (fixture) breach list.
- **Teaches:** Crypto (SHA-1 hash), splitting text into lines, k-anonymity – only the first 5 characters of the hash are sent. Also a real n8n lesson: execution logs store form input, so hash first and don't save successful executions.
- **Data:** Have I Been Pwned Pwned Passwords, keyless, no rate limit. On 9 Oct, "password" had been seen 52,372,427 times.
- **Self-check:** "password" → over 52 million; a random 30-character string → 0.
- **Source idea:** Automation Anywhere's "Cyber Loss Prevention" challenge.

### 16. Is It Recalled? (US) · ★★ · 15–25 min
- **Task:** "Enter a car's VIN and tell me if it has open safety recalls."
- **Bonus:** a weekly check of the family's cars plus baby products (CPSC recalls).
- **Teaches:** chaining HTTP Requests (decode the VIN, then look up recalls), IF, Aggregate.
- **Data:** NHTSA vPIC and Recalls APIs, keyless. Sample VIN `1HGCM82633A004352` → 2003 Honda Accord with 24 recall campaigns, mostly Takata airbag inflators.
- **Self-check:** the sample VIN's recall count and campaign numbers.

---

## D. Surveys and small business

The survey evidence behind these is summarised at the end of this file. One design rule came out of it. In Zapier's survey, 38% of firms keep a person in the loop for AI agents, and data-analysis output needs rework more often than anything else (55%). So these challenges compute numbers with ordinary nodes, let AI write only the words, and add an approval step wherever something leaves the building.

### 17. The NPS Survey That Follows Up · ★★ · 25–35 min
- **Task:** "Ask customers how likely they are to recommend us (0–10). Thank fans with a review link, ask the middle group what's missing, alert us within a minute about unhappy customers, and send the score every Monday."
- **Bonus:** attach a bar chart of the week's answers, made with the built-in QuickChart node (keyless).
- **Teaches:** Form rating field, Switch with three ranges, a different follow-up page per answer (multi-page form with branching), Summarize for the weekly score (NPS = % promoters − % detractors), sending an image.
- **Self-check:** ten test answers on the page give an exact NPS.
- **Why:** SurveyMonkey (2026, US): 83% of owners value feedback, but only 54% collect it more than once or twice a year. BrightLocal (2025): 63% of consumers expect a reply to their review within a week.

### 18. Chase Only Who Hasn't Answered · ★★ · 20–30 min
- **Task:** "We sent our team survey to 25 people. Every two days, remind only those who haven't answered – and stop when the survey closes."
- **Teaches:** Compare Datasets (who is on the team list but not in the responses), Schedule, IF on the deadline.
- **Self-check:** the page lists the seven non-responders in the fixture.
- **Why:** response rate decides whether a survey is worth anything, and chasing only non-responders is the polite way to raise it.

### 19. What Are People Actually Saying? · ★★★ · 30–40 min
- **Task:** "Sort 60 open-ended survey comments into themes, count each theme, and write a one-page summary that quotes real comments."
- **Teaches:** Text Classifier, Summarize, an LLM summary – and a check inside the workflow that every quote really exists word for word.
- **Data:** synthetic comments; one free model key.
- **Self-check:** theme counts within a small tolerance of the page; zero invented quotes.
- **Why:** text mining is the most-used kind of AI in EU firms (Eurostat 2025: 11.8% of all firms with 10+ staff).

### 20. Meeting Notes to Action Items · ★★★ · 30–40 min
- **Task:** "Turn this meeting transcript into a task list with an owner and a due date for each task, and send every person only their own tasks."
- **Teaches:** Information Extractor returning a list, resolving "next Friday" against the meeting date, Split Out, grouping by owner.
- **Data:** transcript fixture; one free model key.
- **Self-check:** the page prints the six expected tasks with owners and exact dates.
- **Why:** 80% of workers want AI to summarise meetings (Microsoft Work Trend Index, 31,000 people); Asana counts 3.6 hours a week lost to unnecessary meetings.

### 21. One Post, Three Languages · ★★★ · 30–40 min
- **Task:** "When we publish a blog post, draft a LinkedIn post, a short social post and a newsletter blurb in English, Spanish and Ukrainian – and nothing goes out until a person approves it."
- **Teaches:** RSS Read on the site's own feed (`/en/blog/feed.xml`), structured AI output, length rules checked with IF (and a retry when a post is too long), Send and Wait for Response for approval.
- **Data:** the site's RSS feed; one free model key.
- **Self-check:** every post respects its length limit, and nothing is saved as "published" without an approval.
- **Why:** marketing and sales is the top reason EU firms use AI (Eurostat 2025: 34.7% of AI users) and the top AI function in US firms (Census BTOS: 52% of AI users). "Multi-platform social media content" is one of n8n's ten most-viewed templates (205k views).

### 22. Get Paid On Time · ★★ · 25–35 min
- **Task:** "Every morning, remind clients about unpaid invoices – friendly after 1 day, firm after 14, final after 30 – and never send the same reminder twice."
- **Bonus (EU):** add the €40 late-payment fee and statutory interest to the final reminder. Your Europe (checked 5 Aug 2026): €40 per late invoice; 30 days by default; e.g. Germany 10.52% and France 12.40% for July–December 2026.
- **Teaches:** dates, Switch with ranges, Data Table update.
- **Self-check:** for the page's "today", the exact reminders per invoice.
- **Why:** Intuit QuickBooks (2025): 56% of US small businesses are owed money, $17.5K on average; owners most want expenses (69%) and invoicing (68%) automated.

### 23. Read a German E-Invoice · ★★★ · 30–40 min
- **Task:** "Since 2025 German businesses must accept electronic invoices. Turn each XML invoice into one clean row and flag any whose totals don't add up."
- **Teaches:** the XML node, namespaced fields (`cbc:…`), Split Out for invoice lines, Summarize, IF. Structured data needs no AI – a useful contrast to PDF extraction.
- **Data:** synthetic XRechnung (UBL) fixtures, one with a wrong total.
- **Why:** e-invoice mandates: Germany (receiving, since 1 Jan 2025), Belgium (B2B, 1 Jan 2026), Poland's KSeF (1 Feb 2026), France (receiving, 1 Sep 2026). In 2023 only 38.7% of EU firms sent machine-readable invoices (Eurostat).

---

## E. Websites and developer tools

### 24. Your Own URL Shortener · ★★★ · 30–40 min
- **Task:** "Make short links for our posters and count how many people click each one."
- **Bonus:** a stats page; protect link creation with Header Auth.
- **Teaches:** Webhook route parameters (`/:code`), Respond to Webhook → Redirect, Crypto for random codes, Data Table update. Trap worth a tip: Redirect defaults to 307, and adding the Response Code option pre-fills 200, which sends no redirect – set 302.
- **Self-check:** in the browser: the link redirects, the counter goes up, an unknown code shows 404.
- **Source idea:** roadmap.sh "URL Shortening Service".

### 25. Uptime Alerts That Don't Cry Wolf · ★★★ · 30–40 min
- **Task:** "Check our websites every 5 minutes. Alert us once when a site goes down and once when it's back – not every 5 minutes."
- **Bonus:** warn 21 days before a site's TLS certificate expires (crt.sh, keyless) – Let's Encrypt stopped sending expiry emails in June 2025.
- **Teaches:** HTTP Request that never errors and returns the full response, state in a Data Table, alerting only on change.
- **Data:** test endpoints that return 500/503 on purpose (The-Internet, httpbin). crt.sh showed n8n-challenges.app's certificate expiring on 6 Dec 2026.
- **Why:** Uptime Kuma 92.3k★; the n8n uptime template 21,003 views.

### 26. Scrape the Practice Bookshop · ★★ · 25–35 min
- **Task:** "Collect every 5-star book under £20 from the practice bookshop into a spreadsheet, with prices in euros."
- **Teaches:** pagination until a 404 (page 51), the HTML node with CSS selectors, Convert to File (CSV/XLSX), a currency call.
- **Data:** books.toscrape.com – a fake shop built for scraping practice, 1,000 books on 50 static pages, so the count never changes.
- **Why:** "Scrape and summarize webpages with AI" is n8n's fifth most-viewed template (291k views).

---

## Bench: also strong

- **Time Machine API** (freeCodeCamp Timestamp Microservice, BSD-3): a webhook that turns any date into Unix and UTC time, with a proper error for bad input. ★, 15 min – a good second webhook after challenge 01.
- **Escape the Server Room:** a multi-page form escape room where each lock code comes from a mini n8n task (a sunrise time, a scraped count, a hash). Needs a prototype: forms can branch, but looping back to an earlier page is unverified.
- **Pub Quiz Night / Which Traveller Are You?:** Open Trivia DB or a personality quiz in a multi-page form with scoring.
- **Guess the Number** (roadmap.sh): a chat game with no AI that keeps state between messages.
- **Robot Assembly Line / Conference Badge Maker:** Edit Image composites (Kenney's CC0 robot parts, or a name badge with a QR code from api.qrserver.com), returned as a download from the form.
- **Privacy Request Tracker:** log each "what data do you hold on me?" request and track its deadline – one month under GDPR, 45 days under California's CCPA. Merge records from three fixture tables into one export. (EU regulators found documented access-request procedures often missing in 2024.)
- **Translate With a Glossary:** translate support replies with fixed product terms, back-translate to check, then send to a reviewer. DeepL (2026): 35% of firms still translate fully by hand.
- **Time Off, Approved:** a manager approves from an email (Send and Wait for Response), then the employee gets an `.ics` file.
- **Meetup Sign-Up With a Waitlist:** capacity, cancellation links and automatic promotion from the waitlist.
- **Check EU VAT Numbers:** VIES is keyless but member states go offline, which makes it a natural retry-and-fallback lesson.
- **What's New in n8n?:** GitHub releases feed → plain-language summaries in English, Spanish and Ukrainian.
- **Vocabulary Coach:** EN/ES/UK flashcards with a Leitner box schedule.
- **Weather Wrapper With a Cache** (roadmap.sh): an `X-Cache: HIT/MISS` header teaches caching.

## Ruled out

| Idea | Why |
|---|---|
| n8n forum digest | community.n8n.io's terms forbid automated access |
| Flight price alerts | Amadeus shut its self-service APIs on 17 Jul 2026; no free source left |
| Spotify playlists | OAuth, and new apps lost access to algorithmic playlists in Nov 2024 |
| AI image postcards | Pollinations now needs a key; keyless image generation failed |
| Live remote-job feeds | Remotive allows about 4 calls a day; RemoteOK demands dofollow credit |
| German train departures | v6.db.transport.rest returned 503; its maintainer discourages automated use |
| WhatsApp anything | Meta business portfolio and short-lived test tokens (6 Oct report) |
| reqres.in practice API | 40 anonymous calls a day per IP |

## Things to settle before authoring

- Telegram send works for self-hosted learners, but Telegram rejects approval links that point to `localhost`; email links work.
- Remove Duplicates across executions throws an error when its history fills up (default 10,000), and manual test runs also record items – tips should say how to clear it.
- Edit Image: system fonts only, small images on the 320 MiB Cloud trial.
- n8n 3.0: the docs say it has shipped, but no 3.0.0 release existed on 9 Oct. Re-check node names after release.
- Webhook HTML pages run in a sandbox without cookies or localStorage.

## Surveys: what people and firms automate

No n8n or Make survey says which tasks people automate, so this draws on general business and AI-adoption surveys. [P] = number read on the publisher's page; [S] = from secondary coverage.

| Source | Region · sample | What it says |
|---|---|---|
| [Eurostat, AI in enterprises 2025](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Use_of_artificial_intelligence_in_enterprises) [P] | EU27 · 157,000 firms | 19.95% of firms use AI. Among them: marketing/sales 34.7%, business admin 31.0%, accounting 23.1%. Most-used type: text mining (11.8% of all firms) |
| [US Census BTOS working paper](https://www.census.gov/library/working-papers/2026/adrm/CES-WP-26-25.html) [P] | US · 117,000+ firms | 18% use AI. Among AI users: sales and marketing 52%, IT 41%. Generative AI is used for writing 85%, information search 50% |
| [Microsoft Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/will-ai-fix-work) [P] | 31 markets · 31,000 | Workers want AI to find information (86%), summarise meetings (80%), plan their day (77%) |
| [Zapier AI agents survey](https://zapier.com/blog/ai-agents-survey/) [P] | US enterprises · 525 | Agents used for data entry and extraction 47%, document analysis 41%, support triage 41%, reports 36%; data-analysis output needs the most rework (55%) |
| [Intuit QuickBooks](https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/) [P] | US small businesses · 1,000–2,487 | 56% are owed money (average $17.5K); owners want expenses (69%) and invoicing (68%) automated |
| [SurveyMonkey](https://www.surveymonkey.com/newsroom/surveymonkey-introduces-todays-surveymonkey/) [P] | US owners · 963 | 83% value feedback; 54% collect it more than once or twice a year |
| [BrightLocal](https://www.brightlocal.com/research/local-consumer-review-survey-2025/) [P] | US consumers · 1,026 | 63% expect a reply to a review within a week |
| [Asana Anatomy of Work](https://asana.com/resources/anatomy-of-work) / [Atlassian State of Teams](https://www.atlassian.com/blog/state-of-teams-2025) [P] | Global · 9,615 / 12,000 | 3.6 hours a week lost to unnecessary meetings; 25% of time spent searching for answers |
| [Stack Overflow 2025](https://survey.stackoverflow.co/2025/ai) [P] | Developers · ~49,000 | Developers' agent use beyond coding: data and analytics 24.9%, business process automation 17.6% |
| [Duckbill / Harris Poll](https://www.stocktitan.net/news/STGW/new-duckbill-research-reveals-americans-are-overwhelmed-out-of-time-y5o4508or0i6.html) [P, press release] | US adults · 2,069 | 76% want to hand off a life-admin task; only 9% do |
| [DeepL](https://en.prnasia.com/releases/apac/manual-translation-processes-still-stifling-enterprises-despite-surge-in-ai-spending-finds-deepl-research-524677.shtml) [P, press release] | US, UK, FR, DE, JP | 35% of firms translate fully by hand |

Themes, strongest evidence first: writing and email triage; finding information; marketing content; support triage; data entry and app sync; document extraction; finance admin (invoices, expenses); KPI reports; meetings; IT and security alerts; feedback and reviews; translation; HR onboarding; privacy requests; life admin. The first two are already covered by challenges 04, 10 and 12, and document extraction by the 6 Oct report's invoice challenge.

## Other sources used

- Demand: [IFTTT space applets](https://ifttt.com/space), [IFTTT weather](https://ifttt.com/weather), [Let's Encrypt ends expiry emails](https://letsencrypt.org/2025/06/26/expiration-notification-service-has-ended.html), [n8n uptime template](https://n8n.io/workflows/2327), [Spliit](https://github.com/spliit-app/spliit), [HN "what have you automated" thread](https://news.ycombinator.com/item?id=35122780).
- Challenge sources: [roadmap.sh backend projects](https://roadmap.sh/backend/projects), [freeCodeCamp Timestamp Microservice](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/timestamp-microservice), [rpachallenge.com](https://rpachallenge.com/), [Ruby Quiz #2 Secret Santas](http://rubyquiz.com/quiz2.html), [SQL Murder Mystery licence](https://github.com/NUKnightLab/sql-mysteries), [The Command Line Murders](https://github.com/veltman/clmystery), [toscrape.com](https://toscrape.com/).
- Rules and data: [EU air passenger rights](https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_en.htm), [EU late payment](https://europa.eu/youreurope/business/finance-and-tax/making-receiving-payments/late-payment/index_en.htm), [Launch Library 2](https://ll.thespacedevs.com/2.3.0/astronauts/?in_space=true&mode=list), [GFZ Kp index](https://kp.gfz.de/), [openfootball](https://github.com/openfootball/football.json), [Have I Been Pwned range API](https://haveibeenpwned.com/API/v3#PwnedPasswords), [NHTSA recalls](https://api.nhtsa.gov/recalls/recallsByVehicle?make=honda&model=accord&modelYear=2003), [Nager.Date](https://date.nager.at/Api), [crt.sh](https://crt.sh/).
