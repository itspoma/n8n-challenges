# What n8n learners and businesses want to build, and where learners struggle (2025–2026)

Data note: I pulled every live figure on 2026-10-06 from public endpoints:
- the n8n template API, which lists 13,055 templates. Its `totalViews` is a lifetime total, and it exposes no recent-views metric.
- community.n8n.io Discourse JSON: category stats, tag counts, and top and latest topic lists.
- YouTube search result pages, using view counts as displayed.
- the web pages cited inline.

I could not reach Reddit (r/n8n). Direct fetches got an HTML block page, and the search tool refuses reddit.com. Reddit coverage therefore rests on one third-party stats page. I sorted forum titles into topic buckets with my own keyword regexes. A title can land in more than one bucket and the matching is approximate, so treat the shares as rough, not exact counts. YouTube "tutorial index" numbers add up views of relevance-ranked results whose titles mention the topic. They are a rough signal and depend on locale.

## 1. Which templates and use-case categories on n8n.io are most viewed?

### Takeaway
AI dominates both what gets published and what gets viewed: 69% of the 13,055 templates are tagged AI. The most-viewed templates fall into a few groups:
- AI chat agents
- WhatsApp and Telegram assistants
- AI web scraping and summarization
- chat with PDF or Drive documents (RAG)
- AI social-media and video content factories
- Google Maps lead scraping
- "Build your first X" starter templates

Marketing is the second-largest category. Document ops, sales and lead generation, IT ops and support follow. Personal productivity is small.

### Cited Findings
- **Size and categories.** There are 13,055 templates in total. Category counts (a template can sit in several categories):

  | Category | Templates | Share |
  |---|---|---|
  | AI | 9,038 | 69% |
  | Marketing | 3,986 | 31% |
  | AI Summarization | 3,759 | |
  | Multimodal AI | 3,386 | |
  | Other | 2,031 | |
  | Sales | 1,952 | 15% |
  | Document Ops | 1,822 | 14% |
  | Content Creation | 1,799 | |
  | Market Research | 1,488 | |
  | AI Chatbot | 1,412 | |
  | IT Ops | 1,370 | |
  | Document Extraction | 1,216 | |
  | Support | 1,202 | |
  | Lead Generation | 932 | |
  | AI RAG | 840 | |
  | Social Media | 701 | |
  | Personal Productivity | 670 | |
  | Engineering | 595 | |
  | CRM | 573 | |
  | Support Chatbot | 517 | |
  | DevOps | 516 | |
  | Ticket Management | 494 | |
  | Lead Nurturing | 447 | |
  | Invoice Processing | 369 | |
  | HR | 322 | |
  | Crypto Trading | 311 | |
  | SecOps | 260 | |
  | Project Management | 253 | |
  | File Management | 236 | |
  | Internal Wiki | 190 | |

  Sources: [n8n template search API (facets)](https://api.n8n.io/api/templates/search?page=1&rows=100), [n8n template categories](https://api.n8n.io/api/templates/categories), and per-category queries of the form [search?category=Invoice%20Processing](https://api.n8n.io/api/templates/search?page=1&rows=1&category=Invoice%20Processing).
- **Node usage across all 13,055 templates.** Each figure is the number of templates using the node, with the share in brackets: Code 7,623 (58%), Edit Fields/Set 7,171, HTTP Request 6,708 (51%), If 6,442, Google Sheets 4,649 (36%), AI Agent 4,194 (32%), Schedule 4,060, Gmail 3,056, OpenAI Chat Model 3,035. — [n8n template search API facets](https://api.n8n.io/api/templates/search?page=1&rows=100)
- **Node usage in the 500 most-viewed templates.** HTTP Request 258, OpenAI Chat Model 207, AI Agent 204, Code 156, Google Sheets 108, Simple Memory 104, OpenAI 104, Telegram 80, Structured Output Parser 76, Basic LLM Chain 75, Google Drive 70, Gmail 60, Call n8n Workflow Tool 50, Default Data Loader 47, Gemini Chat 46, Embeddings OpenAI 35, Recursive Character Text Splitter 33, HTML 30, Text Classifier 17, Information Extractor 16, Google Calendar 16, OpenRouter 14, WhatsApp Business Cloud 13, Calculator 9. — [n8n template search API sorted by views](https://api.n8n.io/api/templates/search?page=1&rows=100&sort=views:desc)
- **Most-viewed templates of all time:**

  | Rank | Template | Views |
  |---|---|---|
  | 1 | [AI agent chat](https://n8n.io/workflows/1954) | 780,399 |
  | 2 | [Creating an API endpoint](https://n8n.io/workflows/1750) | 422,411 |
  | 3 | [Building Your First WhatsApp Chatbot](https://n8n.io/workflows/2465) | 331,713 |
  | 4 | [Angie, personal AI assistant with Telegram voice and text](https://n8n.io/workflows/2462) | 326,067 |
  | 5 | [Scrape and summarize webpages with AI](https://n8n.io/workflows/1951) | 291,546 |
  | 6 | [Very quick quickstart](https://n8n.io/workflows/1700) | 232,320 |
  | 7 | [Generate AI Viral Videos with Seedance and Upload to TikTok, YouTube & Instagram](https://n8n.io/workflows/5338) | 214,907 |
  | 8 | [AI agent that can scrape webpages](https://n8n.io/workflows/2006) | 211,623 |
  | 9 | [Automate Multi-Platform Social Media Content Creation with AI](https://n8n.io/workflows/3066) | 205,470 |
  | 10 | [Pulling data from services that n8n doesn't have a pre-built integration for](https://n8n.io/workflows/1748) | 194,346 |
  | 11 | [Fully Automated AI Video Generation & Multi-Platform Publishing](https://n8n.io/workflows/3442) | 191,045 |
  | 12 | [Telegram AI Chatbot](https://n8n.io/workflows/1934) | 168,542 |
  | 13 | [Veo3 videos to Drive and YouTube](https://n8n.io/workflows/4846) | 155,914 |
  | 14 | [Scrape business emails from Google Maps](https://n8n.io/workflows/2567) | 150,209 |
  | 15 | [Build Your First AI Data Analyst Chatbot](https://n8n.io/workflows/3050) | 133,537 |
  | 16 | [Joining different datasets](https://n8n.io/workflows/1747) | 122,191 |
  | 17 | [Ask questions about a PDF using AI](https://n8n.io/workflows/1960) | 118,063 |
  | 18 | [AI-Powered Social Media Content Generator & Publisher](https://n8n.io/workflows/2950) | 116,411 |
  | 19 | [Build Your First AI Agent](https://n8n.io/workflows/6270) | 99,862 |
  | 20 | [Automated Web Scraping: email a CSV, save to Sheets & Excel](https://n8n.io/workflows/2275) | 99,001 |
  | 21 | [Extract text from a PDF file](https://n8n.io/workflows/585) | 96,182 |
  | 22 | [Chat with PDF docs using AI (quoting sources)](https://n8n.io/workflows/2165) | 95,385 |
  | 23 | [RAG Chatbot for Company Documents using Google Drive and Gemini](https://n8n.io/workflows/2753) | 94,941 |
  | 25 | [Respond to WhatsApp Messages with AI](https://n8n.io/workflows/2466) | 91,062 |
  | 26 | [Create a Branded AI-Powered Website Chatbot](https://n8n.io/workflows/2786) | 88,237 |
  | 28 | [Conversational Telegram Bot with GPT for Text and Voice](https://n8n.io/workflows/4696) | 82,466 |
  | 29 | [Generate Leads with Google Maps](https://n8n.io/workflows/2605) | 82,097 |
  | 30 | [Back Up Your n8n Workflows To Github](https://n8n.io/workflows/1534) | 80,446 |
  | 31 | [AI-Powered YouTube Video Summarization](https://n8n.io/workflows/2679) | 80,442 |
  | 33 | [Suggest meeting slots using AI](https://n8n.io/workflows/1953) | 78,236 |
  | 34 | [Chat with local LLMs using Ollama](https://n8n.io/workflows/2384) | 77,672 |
  | 35 | [Flux AI Image Generator](https://n8n.io/workflows/2417) | 76,789 |
  | 36 | [Learn JSON Basics (interactive tutorial)](https://n8n.io/workflows/5170) | 74,178 |
  | 37 | [Chat with Postgresql Database](https://n8n.io/workflows/2859) | 73,534 |
  | 38 | [OpenAI company enrichment from website content](https://n8n.io/workflows/1862) | 72,240 |
  | 40 | [Personalize marketing emails using customer data and AI](https://n8n.io/workflows/1978) | 71,828 |

  Source: [n8n template API sorted by views](https://api.n8n.io/api/templates/search?page=1&rows=100&sort=views:desc)
- **Most-viewed templates created in 2025 or later.** 250 of the top 500 by views were created in 2025 or later:

  | Template | Views |
  |---|---|
  | Seedance viral videos | 214,907 |
  | Multi-platform social content | 205,470 |
  | AI video generation and publishing | 191,045 |
  | Veo3 videos | 155,914 |
  | First AI Data Analyst Chatbot | 133,537 |
  | Social content generator | 116,411 |
  | Build Your First AI Agent | 99,862 |
  | RAG chatbot over Google Drive + Gemini | 94,941 |
  | Short-form video generator | 92,907 |
  | Branded website chatbot | 88,237 |
  | [Clone viral TikToks with AI avatars](https://n8n.io/workflows/4110) | 84,076 |
  | Telegram text/voice bot | 82,466 |
  | Learn JSON Basics | 74,178 |
  | Chat with Postgres | 73,534 |
  | Instagram content from trends | 71,977 |
  | [WhatsApp chatbot (text, voice, images, PDFs) with memory](https://n8n.io/workflows/3586) | 71,396 |
  | [Veo3 + Blotato auto-post](https://n8n.io/workflows/5035) | 71,279 |
  | [RAG with Drive + Gemini + Qdrant](https://n8n.io/workflows/2982) | 65,428 |
  | [AI voice chatbot with ElevenLabs for customer service and restaurants](https://n8n.io/workflows/2846) | 62,222 |
  | [RSS personalized AI tech newsletter](https://n8n.io/workflows/3986) | 52,896 |
  | [Telegram agent with long-term memory](https://n8n.io/workflows/2872) | 51,670 |
  | [CV analysis and candidate evaluation](https://n8n.io/workflows/2860) | 50,878 |
  | [Google Calendar assistant agent](https://n8n.io/workflows/2703) | 49,291 |
  | [MCP Server with Google Calendar](https://n8n.io/workflows/3514) | 49,155 |
  | [AI Deep Research agent](https://n8n.io/workflows/2878) | 47,644 |
  | [WhatsApp chatbot with RAG](https://n8n.io/workflows/4827) | 46,989 |
  | [Build your own n8n Workflows MCP Server](https://n8n.io/workflows/3770) | 45,504 |
  | [SEO WordPress content with Perplexity](https://n8n.io/workflows/3291) | 45,170 |
  | [Private local Ollama assistant](https://n8n.io/workflows/2729) | 45,130 |
  | [Learn API Fundamentals](https://n8n.io/workflows/5171) | 44,218 |
  | [Scrape Google Maps leads with OpenAI + Sheets](https://n8n.io/workflows/3443) | 43,596 |
  | [AI Customer Support Assistant, WhatsApp ready](https://n8n.io/workflows/3859) | 43,454 |
  | [Email Summary Agent](https://n8n.io/workflows/2722) | 42,263 |
  | [Learn Code Node (JavaScript)](https://n8n.io/workflows/5407) | 39,490 |
  | [N8N for Beginners: Looping over Items](https://n8n.io/workflows/2896) | 38,818 |
  | [AI marketing report (GA, Ads, Meta Ads)](https://n8n.io/workflows/2783) | 36,102 |

  Source: [n8n template API sorted by views](https://api.n8n.io/api/templates/search?page=1&rows=100&sort=views:desc)
- **Most-viewed template in each category (created 2025 or later):**

  | Category | Top templates (views) |
  |---|---|
  | Support | AI Data Analyst Chatbot (133,537), Drive/Gemini RAG (94,941), website chatbot (88,237) |
  | Sales / Lead Generation | Google Maps leads (43,596), [cold-calling pipeline](https://n8n.io/workflows/5449) (33,663), [LinkedIn companies scored by AI](https://n8n.io/workflows/3904) (25,022), [Apollo/LinkedIn lead enrichment](https://n8n.io/workflows/3791) (18,110) |
  | Invoice Processing | [Invoices from Gmail to Drive and Sheets](https://n8n.io/workflows/3016) (27,090), [OCR invoice validator](https://n8n.io/workflows/4247) (13,688), [Telegram + GPT-4o invoice OCR](https://n8n.io/workflows/4849) (12,872) |
  | Document Extraction | [Mistral OCR documents/images](https://n8n.io/workflows/3102) (30,378), [5 ways to process images & PDFs with Gemini](https://n8n.io/workflows/3078) (20,677) |
  | CRM | Top 2025 template only 4,773 ([HubSpot onboarding](https://n8n.io/workflows/3958)) |
  | HR | CV analysis (50,878), [interview scheduling](https://n8n.io/workflows/3363) (9,332) |
  | Personal Productivity | Build Your First AI Agent (99,862), RSS newsletter (52,896) |

  Source: per-category queries such as [category=Support sorted by views](https://api.n8n.io/api/templates/search?page=1&rows=60&sort=views:desc&category=Support)
- **Interactive learning templates by Lucas Peyrin get real traffic:**
  - Learn JSON Basics: 74,178 views
  - Learn API Fundamentals: 44,218
  - Learn Code Node: 39,490
  - [Learn n8n Expressions](https://n8n.io/workflows/5271): 27,902
  - [Learn Workflow Logic with Merge, IF & Switch](https://n8n.io/workflows/5996): 4,967 by the single-workflow endpoint (3,812 in the search index)
  - [Test Your JSON Skills with Interactive Challenges](https://n8n.io/workflows/6232): 6,424 (4,345 in the search index)
  - [Progressive Expression Challenges](https://n8n.io/workflows/6236): 2,598 (47 in the search index)

  The search index and the single-workflow endpoint disagree on these counts. — [template search "learn"](https://api.n8n.io/api/templates/search?page=1&rows=12&sort=views:desc&search=learn), [workflow endpoint 5996](https://api.n8n.io/api/templates/workflows/5996)

### Inferences
- Lifetime view counts favour templates published in 2023 to H1 2025. In the 2025+ list, the newest template among the top 45 is from 22 Jul 2025. So the list shows durable interest, not this month's trends.
- "First ___" framing draws heavy traffic: Build Your First AI Agent, First WhatsApp Chatbot, First AI Data Analyst Chatbot, Very quick quickstart. The site's "build one real workflow" format fits how people already look for starter projects.
- The top templates are almost all AI-plus-messaging or AI-plus-content. The most-used nodes in popular templates are HTTP Request, AI Agent, Code, Google Sheets, Simple Memory, Telegram, Structured Output Parser and Google Drive. The site's existing set already covers most of these. Gaps: Google Sheets as a core node, Code, Information Extractor/Text Classifier, Call n8n Workflow Tool, and binary or PDF handling.
- Some categories have many templates but low views: CRM (573 templates, top 2025 template 4,773 views), HR and Project Management. Supply there exceeds what template browsers look for.

### Gaps
- The API exposes no recent-views or usage (import) metric, so I could not rank by 2026 popularity.
- Template "categories" are not returned per workflow in search results, so I could not compute a category mix for the top 500.

## 2. What do learners most often ask about and struggle with (community.n8n.io, r/n8n)?

### Takeaway
By volume and views, the biggest learner pains are about the environment, not workflow logic:
- self-hosting, deployment and upgrades (especially n8n 2.0): about 16% of questions
- AI agent, model and tool-calling errors: about 10–15%
- OAuth and credentials: about 10–12%
- executions stuck, slow or not triggering: about 10–12%

Next come binary files and PDFs, data transformation and JSON expressions, HTTP and APIs, webhooks, and email. Classic logic topics (loops, merge, item linking, scheduling) appear in only about 1–2% of 2025–26 question titles. They still rank high in all-time tag counts and in "help me build" threads. The forum has also shifted: recent "Questions" are mostly bug reports, and the volume of how-to questions has dropped.

### Cited Findings
- **Forum volume, past 12 months (Discourse category stats):**

  | Category | New topics, past year | All time |
  |---|---|---|
  | Questions | 7,316 | 36,731 |
  | Built with n8n | 1,094 | |
  | Feature Requests | 686 | |
  | Help me Build my Workflow | 597 | |
  | Jobs | 577 | |
  | Tips & Tricks | 260 | |
  | Tutorials | 205 | |
  | n8n Academy | 169 | |

  "Questions" got 201 new topics in the past month and 28 in the past week, well below the 12-month average of about 610 a month. — [community.n8n.io categories.json](https://community.n8n.io/categories.json)
- **All-time tag counts on the forum:** node 5,297; workflow-building 3,686; core 2,439; deployment 1,998; data-transformation 1,981; http-request 1,443; credentials 972; webhook 667; ai 628; google-sheets 618; code 372; openai 356; expressions 336; oauth2 298; telegram 272; gmail 224; whatsapp 211; docker 210; merge 202; execute-workflow 192; looping 189; if 168; error-trigger 146; loop-over-items 139; docker-compose 129; n8n-form-trigger 120; wait 115; transform-array 109; javascript 105; queue-mode 105; respond-to-webhook 97; out-of-memory 88; date-time 77; schedule-trigger 77; splitinbatches 75; rag 68; pagination 49; switch 49; read-pdf 46; embeddings 46. — [community.n8n.io tags.json](https://community.n8n.io/tags.json)
- **Keyword buckets for the 600 top "Questions" topics of the past year** (2025-10-06 to 2026-10-04, Discourse "top" ranking):

  | Bucket | Topics | Share | Views |
  |---|---|---|---|
  | Self-hosting, Docker, deploy, upgrade | 95 | 15.8% | 59,158 |
  | AI agent, tools, LLM | 88 | 14.7% | 65,112 |
  | OAuth, credentials, auth | 73 | 12.2% | 41,719 |
  | Execution stuck, slow, not triggering | 62 | 10.3% | |
  | Binary files, PDF, images | 47 | 7.8% | 27,216 |
  | Expressions, JSON, data transform | 46 | 7.7% | |
  | HTTP Request, API, pagination | 45 | 7.5% | |
  | Gmail and email | 31 | 5.2% | |
  | Webhooks | 28 | 4.7% | |
  | WhatsApp | 20 | 3.3% | 13,237 |
  | Code node / JS / Python | 18 | 3.0% | 38,675 |
  | Google Sheets | 18 | 3.0% | |
  | Data tables and databases | 18 | 3.0% | |
  | Rate limits, timeouts | 17 | 2.8% | 14,346 |
  | MCP | 11 | 1.8% | 7,310 |
  | Loops | 11 | 1.8% | |
  | Forms | 11 | 1.8% | |
  | Sub-workflows | 8 | 1.3% | |
  | Human-in-the-loop, wait | 7 | 1.2% | |
  | RAG | 7 | 1.2% | |
  | Schedule, time zone | 7 | 1.2% | |
  | Merge | 7 | 1.2% | |
  | Error handling | 6 | 1.0% | |
  | Memory | 4 | 0.7% | |

  Source: [Questions, top of year (JSON)](https://community.n8n.io/c/questions/12/l/top.json?period=yearly); my regex classification of titles.
- **Keyword buckets for the 750 newest "Questions" topics** (2026-07-07 to 2026-10-06):

  | Bucket | Topics | Share |
  |---|---|---|
  | Self-hosting, deploy | 124 | 16.5% |
  | Execution stuck | 86 | 11.5% |
  | OAuth, credentials | 78 | 10.4% |
  | AI agent, LLM | 75 | 10.0% |
  | HTTP, API | 68 | 9.1% |
  | Webhooks | 54 | 7.2% |
  | Expressions, JSON | 46 | 6.1% |
  | Data tables, databases | 43 | 5.7% |
  | Binary, files | 40 | 5.3% |
  | Email | 38 | 5.1% |
  | WhatsApp | 33 | 4.4% |
  | Rate limits, timeouts | 31 | 4.1% |
  | Code node | 31 | 4.1% |
  | MCP | 19 | 2.5% |
  | Loops | 14 | 1.9% |
  | Sub-workflows | 14 | 1.9% |
  | RAG | 12 | 1.6% |
  | Error handling | 11 | 1.5% |
  | Human-in-the-loop | 11 | 1.5% |
  | Merge | 4 | 0.5% |
  | Item linking | 3 | 0.4% |

  327 of the 750 (44%) carry the `bug:unconfirmed` tag. — [Questions, latest (JSON)](https://community.n8n.io/c/questions/12/l/latest.json?order=created)
- **Most-viewed questions of the past year:**

  | Question | Views | Detail |
  |---|---|---|
  | [Code Node wants Python 3 installed](https://community.n8n.io/t/n8n-code-node-wants-python-3-installed-on-the-system-i-have-it-but-n8n-does-not-see-it/241912) | 11,822 | |
  | [The best n8n skills for Claude Code/Antigravity](https://community.n8n.io/t/the-best-n8n-skills-for-claude-code-antigravity/271900) | 10,573 | |
  | [N8N_RESTRICT_FILE_ACCESS_TO in 2.0](https://community.n8n.io/t/n8n-restrict-file-access-to-in-2-0/227750) | 6,366 | |
  | [Libraries disallowed in Code node on n8n Cloud](https://community.n8n.io/t/libraries-desallowed-in-n8n-code-node-n8n-cloud/203666) | 4,883 | |
  | [Unable to start workflow with the chat trigger node](https://community.n8n.io/t/unable-to-start-workflow-with-the-chat-trigger-node-in-n8n-web-gui/272919) | 4,874 | 43 posts |
  | AI Agent outputs internal "Thinking Process" after upgrade | 3,434 | |
  | Gemini 3 tools "missing a thought_signature" | 3,197 | 2,610 for a second thread |
  | [Task request timed out after 60 seconds](https://community.n8n.io/t/task-request-timed-out-after-60-seconds/245289) | 3,096 | |
  | Read/Write Files from Disk "not writable" | 2,967 | 2,836 for a second thread |
  | [WhatsApp Trigger not receiving real messages](https://community.n8n.io/t/whatsapp-trigger-not-receiving-real-messages/239346) | 2,644 | |
  | [Telegram trigger not activating](https://community.n8n.io/t/telegram-trigger-not-activating/225589) | 2,571 | |
  | [Claude.ai MCP connector failing to connect to self-hosted n8n](https://community.n8n.io/t/claude-ai-mcp-connector-failing-to-connect-to-my-self-hosted-n8n/280766) | 2,396 | |
  | DeepSeek agent tools "reasoning_content must be passed back" | 2,092 | |
  | [Local OCR in n8n with Ollama: extract text from scanned PDFs](https://community.n8n.io/t/local-ocr-in-n8n-with-ollama-how-to-extract-text-from-scanned-pdfs-without-external-services/287785) | 2,001 | 25 likes |
  | [WhatsApp Trigger: Meta webhook requests blocked by Hostinger VPS](https://community.n8n.io/t/n8n-whatsapp-trigger-meta-webhook-requests-blocked-by-hostinger-vps-infrastructure-confirmed-via-traefik-logs/264956) | 1,632 | |
  | [Microsoft Outlook auth failed](https://community.n8n.io/t/microsoft-outlook-client-authentication-failed/228788) | 1,453 | |
  | [How do you monitor n8n workflows in production and detect failures early?](https://community.n8n.io/t/how-do-you-monitor-n8n-workflows-in-production-and-detect-failures-early/300723) | 1,447 | 25 replies |
  | [WhatsApp Cloud API webhooks delayed](https://community.n8n.io/t/whatsapp-cloud-api-webhooks-delayed-by-minutes-to-hours/265580) | 1,394 | |
  | [Google Drive OAuth2 redirect_uri_mismatch](https://community.n8n.io/t/n8n-cloud-google-drive-oauth2-failing-redirect-uri-mismatch-gmail-workspace/239845) | 1,353 | |
  | [Data Tables 50 MB limit](https://community.n8n.io/t/i-see-that-the-datatables-only-have-a-50mb-limit-is-there-a-way-to-offload-that-database-to-increase-storage-limits/233603) | 1,333 | |
  | [n8n doesn't give OAuth redirect URL](https://community.n8n.io/t/n8n-doesnt-give-oauth-redirect-url/240103) | 1,195 | |
  | [Data Table Filter](https://community.n8n.io/t/data-table-filter/201112) | 1,165 | |
  | [Create OAuth Client ID (Google)](https://community.n8n.io/t/help-connection-google-create-oauth-client-id/298202) | 919 | |
  | [Setting up error workflow upon AI agent tool failure](https://community.n8n.io/t/setting-up-error-workflow-upon-ai-agent-tool-failure/252743) | 891 | |

  Source for counts without a link: [Questions, top of year (JSON)](https://community.n8n.io/c/questions/12/l/top.json?period=yearly).
- **"Help me Build my Workflow" (top 250 of the past year).** These threads show logic problems that do not appear as often in titles elsewhere:

  | Thread | Views | Detail |
  |---|---|---|
  | [Loop Over Items can't handle multiple incoming lists?](https://community.n8n.io/t/loop-over-items-cant-handle-multiple-incoming-lists/234133) | 606 | 27 posts |
  | [Unable to parse JSON string in Set node expressions](https://community.n8n.io/t/unable-to-parse-json-string-in-set-node-expressions-n8n-cloud/208647) | 591 | |
  | [Split Out node: how to get data from array?](https://community.n8n.io/t/split-out-node-how-to-get-data-from-array/219321) | 482 | |
  | [Best practice for centralized error handling and retry-from-failed-step](https://community.n8n.io/t/best-practice-for-centralized-error-handling-and-retry-from-failed-step-in-production-workflows/300785) | 559 | |
  | [Pattern for triggering N sub-workflows in parallel and resuming](https://community.n8n.io/t/what-is-the-best-pattern-for-triggering-n-sub-workflows-in-parallel-and-resuming-main-workflow-when-all-complete/233446) | 499 | |
  | [How to get AI Agent to follow system prompt](https://community.n8n.io/t/how-to-get-ai-agent-to-follow-system-prompt/248180) | 734 | |
  | [How to get PDF from Google Drive](https://community.n8n.io/t/how-to-get-pdf-from-google-drive/264312) | 694 | |
  | [Send an Adaptive Card to Teams with a form and wait for reply](https://community.n8n.io/t/how-to-send-an-adaptive-card-to-teams-with-a-form-and-wait-for-form-reply/202840) | 865 | |
  | [Reliable structured JSON output from local LLMs (2026)](https://community.n8n.io/t/what-s-the-latest-way-2026-to-get-reliable-structured-json-output-from-local-llms-in-n8n/301153) | 413 | |
  | [Send to Telegram multiple photos](https://community.n8n.io/t/send-to-telegram-multiple-photos/235171) | 434 | |
  | [Send PDF brochure to WhatsApp Business user on request](https://community.n8n.io/t/send-pdf-brochure-to-whatsapp-business-end-user-on-request/224912) | 417 | |

  Domain mix of these 250 threads: AI agents 11.2%, social/content 7.6%, email 6.4%, database/Sheets sync 6.4%, documents/invoices 5.2%, e-commerce 4.8%, CRM 4.4%, WhatsApp 3.6%, Telegram 3.6%, support 3.6%. — [Help me Build, top of year (JSON)](https://community.n8n.io/c/help-me-build-my-workflow/36/l/top.json?period=yearly)
- **Tips & Tricks threads about reliability get attention:**
  - [AI Agent node finishes "green" even when its tool failed](https://community.n8n.io/t/ai-agent-node-finishes-green-even-when-its-tool-failed-how-i-catch-it-now/300885): 468 views, 10 likes
  - [Never let your automations silently fail](https://community.n8n.io/t/never-let-your-automations-silently-fail-the-error-handling-pattern-i-use-for-every-deployed-workflow/292351): 369 views
  - [How to update to 2.0 (self-hosted)](https://community.n8n.io/t/solved-how-to-update-to-2-0-self-hosted/234231): 2,639 views
  - [n8n Mastery Roadmap](https://community.n8n.io/t/n8n-mastery-roadmap-a-structured-path-to-automation-expertise/268141): 1,686 views

  Source: [Tips & Tricks, top of year (JSON)](https://community.n8n.io/c/tips-tricks/14/l/top.json?period=yearly)
- **Forum dynamics in 2026:**
  - n8n posted ["This forum is for humans, by humans"](https://community.n8n.io/t/this-forum-is-for-humans-by-humans/305091) on 27 Jul 2026: 1,828 views, 75 likes.
  - It ended its ["Answer & Earn" program](https://community.n8n.io/t/the-end-of-answer-earn/317940) on 30 Sep 2026.
  - It started [trying AI translation on the forum](https://community.n8n.io/t/trying-out-ai-translation-on-the-forum-expanding-to-more-languages/295674) in May 2026.
  - It launched an in-product [AI Assistant](https://community.n8n.io/t/introducing-the-ai-assistant-the-workflow-building-agent-inside-n8n/302667) on 9 Jul 2026 (5,768 views) and [AI Workflow Builder](https://community.n8n.io/t/introducing-ai-workflow-builder-beta/204919) in Oct 2025 (6,570 views).
- **r/n8n (third-party stats).** About 259,000 members, up 104,000 (+66.6%) in a year, data as of 1 Oct 2026. Most common flairs: "Help" and "Workflow - Github Included", then "Servers, Hosting, & Tech Stuff". Visible themes include requests for advanced courses, hiring for chatbot projects and a daily briefing bot built with Telegram. Recommended tools: Qdrant, Pinecone and Supabase for databases; Hetzner, DigitalOcean and Zeabur for VPS hosting. — [GummySearch r/n8n](https://gummysearch.com/r/n8n/). An earlier search-result snapshot gave 257k members and +109k (+73.9%). — [GummySearch (search snippet)](https://gummysearch.com/r/n8n/)

### Inferences
- The hardest blockers for self-paced learners without a mentor are environment and credentials: OAuth redirect URIs, Python and file access after 2.0, WhatsApp and Telegram webhooks not firing, provider-specific model errors. A mentor would normally fix these on the spot. Challenges should anticipate them in "before you start" and in the tips. A dedicated "setup" mini-challenge, such as Google OAuth, could carry real value.
- Logic topics (loops, merge, item linking, dates) rarely appear in 2025–26 titles. Help threads and all-time tag counts show they still trip people up. These are the concepts that only hands-on challenges teach well, and AI assistants are increasingly answering simple "how do I" questions.
- AI-agent questions are now about provider quirks (Gemini thought signatures, DeepSeek reasoning content, models leaking "thinking") and about silent tool failures. Challenge tips should pin a robust model through OpenRouter and teach how to check an agent's tool calls.
- The fall in forum question volume, the human-only forum stance and the AI Assistant launch suggest learners now generate workflows with AI and need skills to verify and debug them. This supports a "fix or verify the AI-built workflow" challenge type.

### Gaps
- No Reddit post-level data (upvotes, comments, top posts) could be retrieved. Reddit is blocked to both fetch and search tools here.
- Bucket shares come from a keyword classification of titles only, not post bodies. Item-linking and paired-item problems are probably under-counted because titles describe symptoms.
- The drop in "Questions" volume (201 in the last month against about 610 a month on average) could reflect a category restructure rather than less demand. I did not verify which.

## 3. Which n8n tutorial topics are most watched on YouTube, and what do popular courses build?

### Takeaway
The most-watched n8n videos are long "zero to hero / build & sell AI agents" courses (1–2M views each) and AI-agent quick starts (up to 4.3M). By topic, self-hosting, WhatsApp bots, MCP, AI video, RAG, local AI, scraping and Claude Code + n8n draw the most views. Core skills draw far fewer views per topic: webhooks, HTTP, errors, loops, expressions, Code node. Business integrations draw fewest: CRM, Shopify, customer support. A strong 2026 meta-trend is "Stop learning n8n, learn Claude Code / agentic workflows."

### Cited Findings
- **Most-viewed n8n videos of all time** (YouTube "n8n" sorted by view count):

  | Video | Creator | Views | Notes |
  |---|---|---|---|
  | [From Zero to Your First AI Agent in 25 Minutes](https://www.youtube.com/watch?v=EH5jx5qPabU) | Futurepedia | 4,326,547 | |
  | [You NEED to Use n8n RIGHT NOW!! (Free, Local, Private)](https://www.youtube.com/watch?v=ONgECvZNI3o) | NetworkChuck | 2,628,250 | |
  | [Build & Sell n8n AI Agents (8+ Hour Course)](https://www.youtube.com/watch?v=Ey18PDiaAYI) | Nate Herk | 1,954,147 | published 2025-05-23 |
  | [N8N FULL COURSE 6 HOURS](https://www.youtube.com/watch?v=2GZ2SNXWK-c) | Nick Saraev | 1,350,824 | |
  | [n8n will change your life as a developer](https://www.youtube.com/watch?v=bS9R6aCVEzw) | Fireship | 1,244,680 | |
  | [n8n Complete Course, WhatsApp Automation Project](https://www.youtube.com/watch?v=zQM2HgNTBCs) | Manish Digital Academy | 1,119,858 | |
  | [n8n Tutorial – Zero to Hero Course](https://www.youtube.com/watch?v=UIf-SlmMays) | freeCodeCamp | 1,067,145 | published 2025-12-11 |
  | [n8n Now Runs My ENTIRE Homelab](https://www.youtube.com/watch?v=budTmdQfXYU) | NetworkChuck | 1,063,764 | |
  | [n8n Quick Start Tutorial: Build Your First Workflow [2025]](https://www.youtube.com/watch?v=4cQWJViybAQ) | n8n & Flowgrammer | 1,021,915 | |
  | [I Built a Marketing Team with 1 AI Agent](https://www.youtube.com/watch?v=ldETapkr8Hg) | Nate Herk | 941,238 | |
  | [n8n Beginner Course (1/9)](https://www.youtube.com/watch?v=4BVTkqbn_tY) | official n8n | 883,578 | |
  | [Master 80% of n8n in 36 Minutes](https://www.youtube.com/watch?v=e3OV3LnrS7o) | Futurepedia | 787,877 | |
  | [Master n8n in 2 Hours](https://www.youtube.com/watch?v=AURnISajubk) | Jono Catliff | 674,847 | |

  Source: [YouTube search "n8n" by view count](https://www.youtube.com/results?search_query=n8n&sp=CAM%253D)
- **Most-viewed uploads under YouTube's "This year" filter** (videos were 2–11 months old):

  | Video | Creator | Views |
  |---|---|---|
  | freeCodeCamp Zero to Hero | freeCodeCamp | 1,067,145 |
  | [Build & Sell with Claude Code (10+ Hour Course)](https://www.youtube.com/watch?v=mpALXah_PBg) | Nate Herk | 1,113,834 |
  | [AI Agents Full Course 2026](https://www.youtube.com/watch?v=EsTrWCV0Ph4) | Nick Saraev | 870,825 |
  | [Build & Sell n8n AI Agents & Automation](https://www.youtube.com/watch?v=k4jKclPne9I) | Badar | 613,709 |
  | [n8n Quick Start: Build Your First AI Agent [2026]](https://www.youtube.com/watch?v=GuaKeDS6UKU) | n8n & Flowgrammer | 549,543 |
  | [Stop Learning n8n in 2026...Learn THIS Instead](https://www.youtube.com/watch?v=ZeJXI2MAhj0) | Nate Herk | 488,003 |
  | [DON'T Build n8n workflows, build Agentic Workflows! (Claude Code)](https://www.youtube.com/watch?v=JkrH3ftxPYc) | Samin Yasar | 391,957 |
  | [freeCodeCamp n8n course for beginners](https://www.youtube.com/watch?v=GIZzRGYpCbM) | Gavin Lon | 354,140 |
  | [How I'd Learn n8n if I had to Start Over in 2026](https://www.youtube.com/watch?v=Fqeo8q8-nJg) | Nate Herk | 327,213 |
  | [N8N Full Course (12 h)](https://www.youtube.com/watch?v=7_PeuTsx7UM) | Michele Torti | 318,534 |
  | [Stop Learning n8n in 2026...](https://www.youtube.com/watch?v=1d77LRUS-wc) | Michele Torti | 312,269 |
  | [Claude Code is Better at n8n than I am](https://www.youtube.com/watch?v=B6k_vAjndMo) | Nate Herk | 241,864 |

  Sources: [YouTube "n8n", this year, by views](https://www.youtube.com/results?search_query=n8n&sp=CAMSAggF); [YouTube "n8n ai agent", this year, by views](https://www.youtube.com/results?search_query=n8n+ai+agent&sp=CAMSAggF)
- **Tutorial index by topic.** Sum of views of relevance-ranked results (top ~20) whose titles match the topic:

  | Topic | Views | Top video |
  |---|---|---|
  | Self-hosting | 4,320,250 | NetworkChuck, 2.63M |
  | WhatsApp bot | 2,776,250 | |
  | MCP | 1,157,781 | official "One Click Connect n8n to AI Tools [Instance Level MCP]", 591,873 |
  | AI video / faceless YouTube | 989,604 | |
  | RAG / chat with docs | 842,460 | Cole Medin, 187,648 |
  | Local AI / Ollama | 737,556 | |
  | Web scraping | 724,675 | |
  | Claude Code + n8n | 679,304 | |
  | Google Sheets | 566,253 | |
  | Website chatbot | 495,086 | |
  | Voice agent | 456,139 | "AI Voice Receptionist with Vapi and n8n MCP", 165,071 |
  | Social media posting | 453,448 | |
  | Telegram bot | 412,544 | official "How to build a Telegram AI bot", 123,642 |
  | Multi-agent | 385,908 | official "New AI Agent Tool", 127,240 |
  | Lead generation | 385,907 | |
  | Webhooks | 381,527 | |
  | SEO / blog | 319,885 | |
  | Email / Gmail | 312,955 | |
  | HTTP / APIs | 218,874 | |
  | Error handling | 213,980 | official "Beginner Course (7/9) Error handling", 107,848 |
  | Calendar / appointments | 207,587 | |
  | Loops | 181,589 | |
  | Human-in-the-loop | 173,360 | |
  | Invoice / OCR | 170,236 | |
  | Data tables | 162,528 | |
  | Code node | 86,505 | |
  | Customer-support bot | 77,526 | |
  | Expressions / JSON | 72,943 | |
  | Shopify | 44,980 | |
  | CRM (HubSpot / GHL) | 30,679 | |

  Sources: e.g. [YouTube "n8n self host"](https://www.youtube.com/results?search_query=n8n+self+host), [YouTube "n8n whatsapp"](https://www.youtube.com/results?search_query=n8n+whatsapp), [YouTube "n8n mcp"](https://www.youtube.com/results?search_query=n8n+mcp), [YouTube "n8n invoice"](https://www.youtube.com/results?search_query=n8n+invoice), [YouTube "n8n crm hubspot gohighlevel"](https://www.youtube.com/results?search_query=n8n+crm+hubspot+gohighlevel)
- **Short videos.** [Build a WhatsApp AI Agent for appointment handling](https://www.youtube.com/watch?v=vcvRVlc_VFg) by Ed Hill (38-second Short) has 1,580,223 views. [AI Cold Calling Voice Agent](https://www.youtube.com/watch?v=_EH7KJnStMI) (16 seconds) has 478,010. — [YouTube "n8n tutorial" by views](https://www.youtube.com/results?search_query=n8n+tutorial&sp=CAM%253D)
- **What popular courses build (chapters from video descriptions):**
  - Nate Herk's 8-hour course (1.95M views): RAG pipeline and chatbot; customer support workflow; LinkedIn content creator; invoice processing; APIs (Perplexity, Firecrawl, Apify, image and video generation); first agent; Postgres and Supabase; multi-agent architectures; prompting; output parsing; human in the loop; error workflows; webhooks; voice email agent; Lovable front end; MCP and self-hosting. — [YouTube](https://www.youtube.com/watch?v=Ey18PDiaAYI)
  - Jono Catliff's 2-hour course (674,847 views): trigger and action, mapping, functions, filters, Switch, Merge, first AI agent, reporting workflow, data types, iterators, aggregator, Code, webhooks, HTTP requests, RAG over Google Drive PDFs. — [YouTube](https://www.youtube.com/watch?v=AURnISajubk)
  - Nick Saraev's 6-hour course: basics, foundational concepts, JavaScript functions, self-hosting, n8n vs Make. — [YouTube](https://www.youtube.com/watch?v=2GZ2SNXWK-c)
  - freeCodeCamp with Gavin Lon: four workflows, including an AI chatbot and an emergency WhatsApp notification system. — [YouTube](https://www.youtube.com/watch?v=GIZzRGYpCbM)
  - freeCodeCamp Zero to Hero: APIs and keys, complex data flows, RAG agents, multi-agent systems. — [YouTube](https://www.youtube.com/watch?v=UIf-SlmMays)
- **Official n8n learning.**
  - n8n Academy (free; certificates and badges; a professional certification is "coming soon"). It runs four courses, all with practice APIs:
    - qs101 Quickstart: triggers, scheduling, HTTP, transformation, error handling, and an AI agent that looks up customer records.
    - n8n101 Essentials (2–4 hours): canvas, data structures, transformations, expressions, binary data, merging.
    - n8n102 Integrations: APIs, webhooks, flow control, sub-workflows, error handling.
    - n8n103 In Practice: AI chains vs agents, memory, Try/Catch, testing and debugging.

    Sources: [n8n.io/education](https://n8n.io/education/), [n8n101 course page](https://learn.n8n.io/courses/course-v1:n8n+N8N101+2026H2/about)
  - Forum threads name hands-on exercises: "Sales Data Pipeline" (n8n101 Section 2), "SubmitRegistration" (n8n101), "Webhook-Driven Order Processing System" (n8n102), a feedback pipeline and an Error Workflow exercise (n8n103). — [forum search "exercises"](https://community.n8n.io/search?q=exercises)
  - The 2024 video Beginner Course loses forum views part by part. In 2024 the forum also listed "Advanced Course (1/8) – complex data flows" at 8,996 views. — [community.n8n.io top all-time (JSON)](https://community.n8n.io/top.json?period=all)

    | Part | Forum views |
    |---|---|
    | 1/9 | 47,660 |
    | 2/9 APIs & Webhooks | 15,921 |
    | 3/9 Nodes | 11,529 |
    | 4/9 Data | 8,921 |
    | 5/9 Core concepts | 5,812 |
- **Udemy enrolments (from a search-result summary; not verified, Udemy returned HTTP 403):**
  - "n8n – AI Agents, AI Automations & AI Voice Agents (No-code!)": about 50,234 students
  - "AI Automation: Build LLM Apps & AI-Agents with n8n & APIs": about 49,339
  - "AI Builder: Create Agents, Voice Agents & Automations in n8n": about 37,833
  - "Curso n8n. Crea Agentes de IA Sin Programar" (Spanish): about 21,893
  - "Master n8n AI Agents: Build & Sell": about 21,386
  - "Complete N8N and AI Automation Masterclass": about 13,472

  Sources: [Udemy course search results](https://www.udemy.com/course/n8n-course/), [Medium roundup](https://medium.com/javarevisited/i-tried-20-n8n-udemy-courses-here-are-my-top-5-recommendations-for-2026-9a0df86fd5bc)

### Inferences
- The topics with the most views (self-hosting, WhatsApp, MCP, RAG) partly match challenges the site already has: MCP (06, 08), RAG (10), Telegram (02, 13). Self-hosting and WhatsApp are the big uncovered topics, and both carry high setup friction.
- Core-skill topics are under-served by video relative to their forum pain: expressions and JSON (73k), Code node (87k), loops (182k), error handling (214k). Interactive challenges can win here because video is a poor way to learn data wrangling.
- Business integration topics are rare on YouTube (CRM 31k, Shopify 45k, customer support 78k) despite strong job demand (Q4). Few tutorials compete there.
- The 2026 "Claude Code / agentic workflows instead of n8n" narrative is large (videos at 1.1M, 488k, 392k and 312k). A free n8n learning site should lean into AI-assisted building and verification (challenge 06 already does) rather than ignore it.
- Large drop-off across multi-part official courses (47.7k down to 5.8k by part 5) suggests self-paced learners prefer standalone, finishable units, which is the site's format.

### Gaps
- YouTube does not publish per-topic search volumes. The index is biased to US/English results and to older videos with lifetime views.
- I could not retrieve Skool community sizes for the big creator communities (for example Nate Herk's), Udemy syllabi, or verified Udemy enrolment counts.

## 4. What do businesses and freelancers pay for (Upwork, Fiverr, forum Jobs, case studies)?

### Takeaway
Paid n8n work clusters in these areas, ordered by how often each shows up in 2026 job posts:
- AI agents and assistants
- syncing data between databases, Sheets and CRMs
- e-commerce and order automation
- lead generation, enrichment and qualification
- voice AI agents
- CRM pipelines (HubSpot, GoHighLevel)
- document, quote and invoice processing
- WhatsApp bots

Upwork n8n demand is growing while Zapier and Make demand falls. Budgets are small for one-off builds (around $100–$250 fixed) and higher for ongoing CRM or AI implementation roles. Enterprise case studies emphasise IT ops, support ticket automation, document and proposal generation, data entry and ERP imports.

### Cited Findings
- **Upwork volume (Vibeworker analysis of 252,697 postings, June–July 2026):**
  - n8n postings went from 625 in June to 656 in July 2026 (+5.0%).
  - Make went from 510 to 502 (−1.6%); Zapier from 856 to 798 (−6.8%).
  - "AI Agent Development" went from 1,049 to 1,142 (+8.9%), with a typical hourly range of $23–$48.
  - Lead Generation made up 6.8% of the July feed across all of Upwork.

  Source: [Vibeworker: Most in-demand Upwork skills 2026](https://tryvibeworker.com/blog/most-in-demand-upwork-skills)
- **Upwork listings.** Upwork's n8n jobs page showed 522 n8n jobs, per a search-result summary; a direct fetch returned HTTP 403. Sample jobs included AI lead qualification, RAG chatbots, CRM pipelines, and WordPress internal linking and tagging. — [Upwork n8n jobs](https://www.upwork.com/freelance-jobs/n8n/)
- **Fiverr.** Fiverr has dedicated gig categories for "n8n automation", "n8n agents", "n8n workflows" and "n8n AI automation". A search summary reported prices from $5, commonly $30–$90, and $300+ for premium gigs. Fiverr pages returned HTTP 403 to direct fetch, so these figures are unverified. — [Fiverr n8n automation gigs](https://www.fiverr.com/gigs/n8n-automation), [Fiverr n8n agents](https://www.fiverr.com/gigs/n8n-agents)
- **community.n8n.io Jobs, 360 newest topics (26 May to 6 Oct 2026).** Domain buckets by my title classification:

  | Domain | Share | Views |
  |---|---|---|
  | AI agents | 15.3% | 13,373 |
  | Database / Sheets sync | 10.0% | |
  | E-commerce / orders | 9.4% | |
  | Lead generation | 8.1% | 8,584 |
  | Voice agents | 6.4% | |
  | CRM | 6.1% | 9,097 |
  | Claude / LLM API | 6.1% | |
  | Documents / invoices / quotes | 5.6% | 7,584 |
  | WhatsApp | 4.7% | |
  | Scraping | 2.5% | |
  | RAG | 2.5% | |
  | Reporting | 2.2% | |
  | Calendar | 2.2% | |
  | Support | 2.2% | |
  | Social media | 1.9% | |

  Source: [Jobs, latest (JSON)](https://community.n8n.io/c/jobs/13/l/latest.json?order=created)
- **Example job posts:**

  | Job post | Views | Replies / budget |
  |---|---|---|
  | [Seeking estimates: small RFQ-to-quote prototype](https://community.n8n.io/t/seeking-estimates-n8n-developer-for-a-small-rfq-to-quote-prototype/312281) | 4,920 | 363 posts |
  | [n8n/GHL developer: insurance lead pipeline + AI agents](https://community.n8n.io/t/seeking-n8n-ghl-automation-developer-insurance-lead-pipeline-ai-agents-ongoing/307744) | 3,556 | 158 posts |
  | [n8n + AI automation for manufacturing](https://community.n8n.io/t/freelancer-required-n8n-ai-automation-for-manufacturing/308576) | 3,181 | |
  | [Sales Tech & Automation Specialist (CRM + databases)](https://community.n8n.io/t/hiring-sales-tech-automation-specialist-ongoing-remote-work-crm-databases/300286) | 2,612 | |
  | [PostgreSQL + email automation](https://community.n8n.io/t/hiring-n8n-specialist-postgresql-email-automation-project/294131) | 2,458 | |
  | [Gmail / Google Sheets / Slack / AI email classification](https://community.n8n.io/t/freelancer-n8n-automation-expert-gmail-google-sheets-slack-ai-email-classification/289856) | 2,354 | 60 posts |
  | [Automated B2B lead generation](https://community.n8n.io/t/hiring-n8n-specialist-for-automated-b2b-lead-generation-systems-ongoing-work/277583) | 2,253 | |
  | [AI Automation Engineer (n8n & Voice AI)](https://community.n8n.io/t/job-title-ai-automation-engineer-n8n-voice-ai-specialist/282569) | 1,498 | |
  | [Integrate ElevenLabs voice agents](https://community.n8n.io/t/willing-to-pay-for-guidance-to-refine-my-n8n-workflows-and-integrate-elevenlabs-voice-agents/302973) | 1,360 | |
  | [AI agent for real estate](https://community.n8n.io/t/ai-agent-for-real-estate/297960) | 1,035 | |
  | [Lead form → AI score → Slack in 72h](https://community.n8n.io/t/lead-form-ai-score-slack-in-72h-249-paid-after-you-see-it-run/309728) | | $249 |
  | [n8n + Looker Studio marketing reporting (Meta Ads, Google Ads, GA4)](https://community.n8n.io/t/hiring-n8n-looker-studio-builder-for-marketing-reporting-meta-ads-google-ads-ga4-paid-test-ongoing-india-ist/317595) | | |
  | [Integrations & Prompt Engineer](https://community.n8n.io/t/integrations-prompt-engineer-remote-uk-hours-20-50-hr/302688) | | $20–50/hr |
  | [AI and CRM Implementation Consultant](https://community.n8n.io/t/hiring-ai-and-crm-implementation-consultant-partner-coach-remote-6-000-mo/307267) | | $6,000/mo |
  | ["Household CTO": n8n + Notion + local LLM](https://community.n8n.io/t/hiring-part-time-household-cto-n8n-notion-local-llm-home-setup-la-remote/315978) | 1,170 | |

  Source for figures without a link: [Jobs, latest (JSON)](https://community.n8n.io/c/jobs/13/l/latest.json?order=created).
- **"Built with n8n" showcases (top 200 of the past year).** Domain mix: social/content/video 18.5%, AI agents 12.5%, Claude/LLM tooling 9.5% (17,804 views), lead generation 8.5%, email 7.5%, documents/invoices 7.0%, database/Sheets 5.5%, scraping 5.0%, support/Telegram 4.5% each, calendar, verticals, e-commerce and voice 4.0% each. Notable posts:
  - [n8n-claw: OpenClaw in n8n](https://community.n8n.io/t/n8n-claw-openclaw-in-n8n/271756): 13,781 views
  - [Claude Code integration for n8n](https://community.n8n.io/t/claude-code-integration-for-n8n/244183): 9,783
  - [Automate Instagram comment replies and DMs](https://community.n8n.io/t/automate-instagram-comment-replies-and-dms-with-n8n/257891): 1,016
  - [n8n-trace observability dashboard](https://community.n8n.io/t/n8n-trace-a-self-hosted-observability-dashboard-for-n8n-workflows/273899): 883
  - [Preventing duplicate webhook executions (idempotency gate)](https://community.n8n.io/t/preventing-duplicate-webhook-executions-in-n8n-idempotency-gate-workflow/275249): 559

  Source: [Built with n8n, top of year (JSON)](https://community.n8n.io/c/built-with-n8n/15/l/top.json?period=yearly)
- **n8n case studies:**
  - Vodafone: threat intelligence, £2.2M saved
  - Delivery Hero: IT ops, 200 hours a month saved
  - Deda.Tech: ITSM, 30 minutes instead of 2 days
  - Koralplay: 70% of payment-support tickets automated
  - Field Aerospace: proposal generation, 2 weeks to 25 minutes
  - System AI: data entry, 97% time reduction
  - iMi digital: Shopware ERP imports, 1 day to 10 minutes
  - XIBIX: AI answers to HR questions, 50% reduction
  - BeGlobal: commercial proposals, 10× scaling
  - Flow AI: real-estate AI voice outreach
  - Seguros Bolívar (Colombia): medical-request automation, 3,000 employees enabled
  - Icatu (Brazil): insurance

  Source: [n8n case studies](https://n8n.io/case-studies/)

### Inferences
- Paid work has three recurring patterns: capture or ingest, then enrich or classify with AI, then write to a CRM, Sheet or database and notify. Examples are leads, emails, RFQs and invoices. The site's "business-style task" format fits this well. Lead scoring, email triage, document or quote extraction and CRM upsert are the gaps.
- Voice agents and e-commerce show up much more in job posts (6.4% and 9.4%) than in tutorials or templates. Both are differentiation opportunities, but setup friction is high (voice platforms, store accounts).
- Many job threads draw 100 to 363 applicant replies, which suggests more builders than jobs. Learners motivated by freelancing need portfolio-grade, production-quality skills: error handling, idempotency, monitoring, human approval. Toy demos are not enough.

### Gaps
- I could not access Upwork or Fiverr pages directly (403). Their category sizes and prices come from secondary analyses or search snippets.
- A search snippet claimed n8n appeared in 3.6% of a 30-day sample of 11,541 Upwork postings (rank 29). I could not confirm which page published it.
- I did not check the n8n Expert partner directory.

## 5. What do Spanish-speaking (Spain, Latin America) and Ukrainian-speaking n8n communities focus on?

### Takeaway
Spanish-language n8n content is large and centres on "create and sell AI agents", WhatsApp chatbots and assistants, and calendar or appointment bots. Spain also has a meetup scene (Barcelona, Madrid) focused on production and architecture. Ukrainian-language n8n content is small. It centres on Telegram bots, beginner AI agents and Ukrainian business services (Nova Poshta, Monobank, Checkbox). Russian-language creators dominate the wider Cyrillic search results.

### Cited Findings
- **Spanish YouTube creators:**

  | Video | Creator | Views |
  |---|---|---|
  | [Curso Completo de N8N: Cómo Crear y Vender Agentes IA](https://www.youtube.com/watch?v=3IvcIPDGB1k) | Adrián Sáenz | 703,753 |
  | [Curso Completo de N8N: Cómo Crear y Vender Automatizaciones IA](https://www.youtube.com/watch?v=7Z-vRvIUqNs) | Adrián Sáenz & Juan Pe Navarro | 443,783 |
  | [Tutorial N8N: ¡Construir Chatbot en WhatsApp!](https://www.youtube.com/watch?v=M5ZSjBnACtM) | Virola | 547,985 |
  | [N8N curso completo 6 horas – Automatiza, crea y vende agentes IA](https://www.youtube.com/watch?v=SF8Ddp0RaF8) | Agustín Medina | 359,923 |
  | [Cómo crear un agente IA que trabaje por ti](https://www.youtube.com/watch?v=xGYFNcjy1lc) | SALVAJE | 275,555 |
  | [Curso de N8N desde cero](https://www.youtube.com/watch?v=4eRPQmzO_Nw) | Soy Dalto | 252,817 |
  | [Tutorial de n8n para principiantes 2026](https://www.youtube.com/watch?v=AJfd-eVf5eU) | Metics Media Español | 239,022 |
  | [Full course on AI agents in n8n (title shown auto-translated)](https://www.youtube.com/watch?v=9rM1QQIEhkg) | Migue Baena IA | 234,117 |
  | [Introduction to n8n (title shown auto-translated)](https://www.youtube.com/watch?v=yP0PM-fpnXo) | midudev | 194,187 |
  | [Curso N8N desde cero: asistente virtual con WhatsApp + Google Calendar + OpenAI](https://www.youtube.com/watch?v=p3gz4pFxL4U) | Píldoras de programación | 184,568 |

  Benjamín Cordero's [Claude Code 2026 course in Spanish](https://www.youtube.com/watch?v=h49d1-d_fYk) has 941,834 views; the Claude Code trend reaches Spanish audiences too. — [YouTube "n8n español" by views (gl=ES)](https://www.youtube.com/results?search_query=n8n+espa%C3%B1ol&sp=CAM%253D&gl=ES&hl=es)
- **What Spanish courses build.** Adrián Sáenz's course chapters cover: admin agent, calendar-manager agent, YouTube scriptwriter agent, Shopify-manager agent, video-creator agent, blog-creator agent, sales agent, how to get clients, and a lead-generator agent. — [YouTube](https://www.youtube.com/watch?v=3IvcIPDGB1k). Soy Dalto's course covers: itemised data flow, VPS hosting, expressions, credentials, webhooks, a first automation and debugging. — [YouTube](https://www.youtube.com/watch?v=4eRPQmzO_Nw)
- **Brazilian Portuguese (Latin America, not Spanish).** [N8N + WhatsApp FREE: create your AI agent](https://www.youtube.com/watch?v=KkKlfAb3TSI) by Guilherme Lazarotto has 897,184 views. — [YouTube "n8n tutorial" by views](https://www.youtube.com/results?search_query=n8n+tutorial&sp=CAM%253D)
- **Spanish paid offering.** n8n Camp runs from Spain and teaches in Spanish. It costs €390 (waitlist) or €540, runs for 8 weeks with 8 live 2-hour classes, caps cohorts at 15, and has run two editions, with the latest full. Its 15 corrected challenges include:
  - Despierta tus workflows
  - Mensajes de Telegram a Google Sheets
  - Clasificador de opiniones
  - El monitor de divisas
  - El consolidador de contactos
  - El informe de rendimiento
  - Gestor de solicitudes con prioridad y alertas
  - Panel de estado semanal
  - Bot interactivo de gestión con Telegram
  - El Centinela
  - El procesador en lote inteligente
  - El asistente de contenidos multimodal
  - El moderador automático
  - El agente de escapadas

  Source: [n8n.camp](https://n8n.camp/)
- **Spanish blog exercises.** Estrages published "Aprender n8n desde cero" on 27 Sep 2025 with 10 exercises: Hola n8n (Manual Trigger + Set), Eco Webhook, Normalizador (webhook → Sheets), Validador (IF + Gmail), Notificador (cron + HTTP + Telegram), Enriquecimiento (WHOIS API), Comparador (two HTTP calls + Merge), Archivero (Drive upload), Reporte diario (KPIs by email), Flujo real (ERP/CRM). — [Estrages](https://estrages.ai/aprender-n8n-desde-cero-guia-completa-ejercicios-y-mejores-practicas-2025/)
- **Spanish meetups.**
  - n8n Barcelona: its 5th meetup on 18 Mar 2026 had 30+ attendees and a talk on large-scale instance management, multi-environment setups and Grafana monitoring. The 30 Apr 2025 meetup covered "n8n as middleware" and a "virtual secretary in production". — [n8nbarcelona.com meetups](https://n8nbarcelona.com/category/meetups/)
  - A Spanish-language n8n meetup ran in Madrid. — [Luma Madrid meetup](https://luma.com/2025-march-madrid)
  - An "n8n Community Argentina" event, "Gestión de Procesos con Plataformas Visuales de Automatización + IA (de Excel a n8n)", was listed for 18 Apr 2026, per a search snippet. — [createwith.com n8n events](https://createwith.com/tool/n8n/events)
- **Spanish on the forum.**
  - Job posts: [[ESPAÑOL] n8n + AI Automation Builder](https://community.n8n.io/t/espanol-looking-for-an-n8n-ai-automation-builder-for-ongoing-freelance-work/314555) (1,583 views, 95 posts), [Buscamos AI Automation Engineer para sistema de soporte con IA](https://community.n8n.io/t/buscamos-ai-automation-engineer-para-construir-nuestro-sistema-de-soporte-con-ia/315655) (946), [Buscamos un automatizador IA junior](https://community.n8n.io/t/buscamos-un-automatizador-ia-junior/312900) (642).
  - Spanish build examples: [AI lead qualification for real-estate agencies](https://community.n8n.io/t/workflow-cualificacion-automatica-de-leads-para-inmobiliarias-con-ia/297950) (Jun 2026) and [an Evolution API (WhatsApp gateway) problem](https://community.n8n.io/t/problema-con-evolution-api-1-6-1-lid-en-vez-de-numero-real/270857) (562 views).
  - Among the 750 newest Questions, I counted about 14 Spanish-looking titles, about 6 Portuguese-looking titles and none in Cyrillic. — [Questions, latest (JSON)](https://community.n8n.io/c/questions/12/l/latest.json?order=created)
- **Ukrainian YouTube.**
  - Genuinely Ukrainian n8n videos found: [Мельник Костянтин – "Створюй що завгодно з AI-агентами"](https://www.youtube.com/watch?v=ncHoZlSbv1s) (71,106 views, May 2025); [KODARIK – "N8N для новачків"](https://www.youtube.com/watch?v=2dQ0pi0-DkA) (17,498 views; it builds a Telegram chat bot, using the HTTP Request node and credentials); [KODARIK – "Як створити AI Агента в n8n"](https://www.youtube.com/watch?v=cCOO5hVZuG4) (8,873).
  - Cyrillic results with `gl=UA&hl=uk` were mostly from Russian-language creators. The top result's original language is unclear because YouTube auto-translates titles. Example: [Владимир Карпухин's 5-hour guide](https://www.youtube.com/watch?v=tUufFo-JTZQ) at 176,318 views. — [YouTube "n8n українською" by views](https://www.youtube.com/results?search_query=n8n+%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%8E&sp=CAM%253D&gl=UA&hl=uk)
- **Ukrainian business focus.**
  - An airinex.com article (26 May 2026) recommends Telegram AI bots with RAG and human handoff at a 0.75 confidence threshold. It integrates Nova Poshta (delivery cost), Monobank Acquiring (QR payments), Checkbox (fiscal receipts) and KeyCRM/KeepinCRM. It estimates about $6.40 a month (Hetzner $4.90 plus about $1.50 for gpt-4o-mini at around 1,000 messages). — [airinex.com](https://airinex.com/blog/2026-05-26-telegram-ai-bot-n8n-rag-bez-rozrobnykiv)
  - An agency offers RAG + n8n bots for Telegram, WhatsApp and Viber. — [Avada Media](https://avada-media.com/expertise/ai-agents/messenger-bots-ai/)
  - The Ukrainian "Vibe Coding" community runs a Telegram chat and covers no-code Telegram bots in n8n. — [vibe-coding.com.ua](https://vibe-coding.com.ua/)
  - Ukrainian courses: fwdays "Базовий курс: проєктування та інтеграція AI-агентів" (18–29 Aug 2025, low-code n8n) — [fwdays](https://fwdays.com/event/basic-ai-agents-course); LearnToEarn "AI агенти для автоматизації" — [LearnToEarn](https://ua.learntoearn.global/course/ai-ahenty-dlia-avtomatyzatsii); a GoIT overview article — [GoIT](https://goit.global/ua/articles/ohliad-n8n-konstruktor-avtomatyzatsii-ta-intehratsii/).
  - A Ukrainian forum showcase: [TaxiUA Bot – Telegram bot for taxi drivers (Google Sheets, 59 nodes)](https://community.n8n.io/t/taxiua-bot-telegram-bot-for-taxi-drivers-google-sheets-59-nodes-no-coding/294318).

### Inferences
- Spanish and Latin American learners are motivated by WhatsApp and selling AI agents. A WhatsApp challenge would serve this audience best, despite Meta setup friction. Telegram-based challenges serve Ukrainian learners well: the site already uses Telegram in 02, 05, 07, 08 and 13.
- Localising stories with services learners know, as the site already does (Valencia open data, Mercadona, Idealista), is a differentiator. For Ukrainian learners, Nova Poshta, Monobank or Checkbox fixtures would be the analogue, if public, no-signup endpoints exist (unverified).
- The paid Spanish bootcamp (n8n Camp) shows that people will pay for "challenges with corrections". The free, self-paced, trilingual site competes on price and convenience, but has no human corrections. Progressive tips and objective checks are its substitute.

### Gaps
- I found no Ukrainian n8n meetups or official Ukrainian community channels, and no reliable counts of Telegram group sizes for Ukrainian or Spanish n8n communities.
- I found no Latin American meetup data beyond one Argentine event listing (from a search snippet). I did not determine creators' countries.
- Google Trends by country could not be queried.

## 6. Do other n8n challenge, exercise or "project ideas" sites exist, and what do they cover?

### Takeaway
Yes, and n8n itself now runs a free **Community Weekly Challenge**, launched on 7 Sep 2026. It offers auto-verified, leaderboard-ranked data-wrangling puzzles with per-user datasets and native nodes only. n8n Academy offers auto-graded fundamentals courses. Smaller players cover gamified lessons and drills: NodeBench, NodeQuest, Lucas Peyrin's interactive templates. Spanish paid and blog offerings exist. No competitor offers free, trilingual, self-paced, business-story challenges that use real third-party services and AI agents, MCP and RAG.

### Cited Findings
- **n8n Community Weekly Challenge (official, beta, free).** "A new automation challenge every Monday", built from forum-style messy-records problems:
  - Each participant gets a dataset generated from their username.
  - Ranking is by time taken from first data fetch.
  - A solve is worth 10 points, and points reset each season.
  - Every participant gets a permanent public profile.
  - The challenge is solvable with core nodes and comes with a starter workflow.
  - The challenge system itself is built entirely in n8n, with "no database, no hosting, no server".

  Source: [announcement, 7 Sep 2026](https://community.n8n.io/t/introducing-the-n8n-community-weekly-challenge-a-new-automation-problem-every-monday/311603) (994 views, 37 likes). Challenges so far:
  - Week 00 "The Ledger Never Forgets"
  - [01 "The Night Gate"](https://community.n8n.io/t/community-weekly-challenge-01-is-live-the-night-gate/313635): no Code nodes allowed (112 views)
  - [02 "Photo Finish"](https://community.n8n.io/t/official-community-weekly-challenge-02-photo-finish-is-live/315343): rebuild marathon results (132 views)
  - [03 "The Hour That Happened Twice"](https://community.n8n.io/t/community-weekly-challenge-03-the-hour-that-happened-twice-is-live/317214): DST, time zones and CSV (62 views)
  - [04 "The Welcome Desk"](https://community.n8n.io/t/community-weekly-challenge-04-the-welcome-desk-is-live/318957): Season 2, event check-ins with Split Out → Filter → Sort → Limit, 11 points after workflow verification (27 views)

  The portal includes "practice lessons" and results pages. — [challenge portal](https://marketing.app.n8n.cloud/webhook/cwc/challenge), [FAQ](https://marketing.app.n8n.cloud/webhook/cwc/faq)
- **Earlier official contests.**
  - A monthly challenge ran in H1 2026, e.g. the [April 2026 challenge: human-in-the-loop content pipeline for "Relay"](https://community.n8n.io/t/n8n-community-challenge-april-2026-build-a-human-in-the-loop-automation-for-relay/294909). Forum posts reference an "Inbox Inferno" challenge (Mar 2026) and a [monthly-challenge submission issue](https://community.n8n.io/t/submitted-monthly-challenge-but-didnt-receive-any-confirmation/280435).
  - The [Agentic Arena Community Contest](https://community.n8n.io/t/agentic-arena-community-contest-10k-in-prizes/184246) (Sep 2025) offered $10k across 200 prizes for rebuilding the workflow from the Nate Herk vs Jack Roberts arena: 4,700 views, 90 posts.
  - A forum thread [asking for practice use cases and datasets](https://community.n8n.io/t/use-cases-datasets-for-practice/295206) was pointed to the community challenge and the text courses.
- **n8n Academy.** Free courses with hands-on exercises against practice APIs, badges and certificates; see Q3. — [n8n.io/education](https://n8n.io/education/)
- **NodeBench.** A Chrome extension, described as "Duolingo for n8n". It validates your canvas live, offers a free intro lesson (30+ steps, about 30 minutes), and has 17 lessons across 4 sections. The website returned a Vercel "DEPLOYMENT_NOT_FOUND" error on 2026-10-06. — [Chrome Web Store](https://chromewebstore.google.com/detail/nodebench/oniejbfeaicipjlicnplkgajcgoiadjo), [node-bench.com](https://www.node-bench.com/)
- **NodeQuest.** A free browser game launched in Jul 2026: "Learn n8n by fixing broken workflows", 28 puzzle levels covering data mapping, conditions, HTTP and error handling, with no signup. — [forum post](https://community.n8n.io/t/nodequest-learn-n8n-by-fixing-broken-workflows-28-puzzle-levels/302950)
- **Lucas Peyrin's interactive templates.** JSON basics (74k views), API fundamentals (44k), Code node (39k), expressions (28k), Merge/IF/Switch, JSON and expression challenges with instant feedback; see Q1. The 5minAI Skool community (2.9k members) links them as "Mini n8n Exercises". — [Skool 5minAI](https://www.skool.com/5minai-2861/mini-n8n-exercises)
- **A fork of the user's own site.** GitHub `khmuhtadin/n8n-challenges` is a fork of `itspoma/n8n-challenges`. It describes 10 challenges, five tips each and mentor balloons, adds Indonesian (`/id`), and has 0 stars. — [GitHub](https://github.com/khmuhtadin/n8n-challenges)
- **Spanish.** n8n Camp (paid, 15 corrected challenges) and Estrages (10 exercises); see Q5.
- **Project-idea listicles.** These are lists without exercises or verification. Their ideas include:
  - Gmail attachments to Drive
  - email digest to Telegram
  - tweets to a Notion idea bank
  - Reddit to a newsletter
  - form to Sheets plus email
  - lead capture to a CRM
  - daily weather to Slack or Telegram
  - Notion to Airtable backup
  - GitHub star to a tweet
  - Stripe invoice-paid onboarding

  Sources: [ProjectPro](https://www.projectpro.io/article/n8n-projects/1148), [Medium](https://medium.com/@snehal_singh/13-n8n-projects-for-beginners-to-learn-no-code-automation-e1c1e88041de), [Hostinger](https://www.hostinger.com/tutorials/what-can-you-automate-with-n8n/), [Programming Valley](https://programmingvalley.com/best-n8n-workflow-templates-project-ideas-2026/)

### Inferences
- The official Weekly Challenge now owns "objective, auto-verified, leaderboard data puzzles in English". So far it avoids AI and third-party credentials (native nodes only), and interest per weekly thread is modest (27–132 views).
- The site can differentiate on:
  - realistic business tasks with real services
  - AI agents, RAG, MCP and human-in-the-loop
  - three languages
  - no registration or timing pressure
  - progressive tips that replace the mentor
- It can also link to the Weekly Challenge and n8n Academy as complementary practice rather than duplicate them.
- NodeQuest's "fix broken workflows" format and NodeBench's live validation show demand for instant feedback. A static site can approximate this with downloadable broken-workflow JSON and expected outputs: answers learners can check themselves, or hashes of the expected results.
- The khmuhtadin fork shows the site's format is reusable for other events and languages. This mentor/event use case still exists elsewhere.

### Gaps
- No participant counts exist for the Weekly Challenge, NodeBench installs or NodeQuest players.
- I did not review the Weekly Challenge "Learn" lessons in detail.

## 7. Ranked demand-backed challenge themes, with evidence and coverage by the user's existing challenges or backlog

### Takeaway
On demand alone, the strongest signals are:
- self-hosting
- WhatsApp assistants
- AI content and social pipelines
- document and invoice extraction
- AI agents
- lead generation
- data wrangling

After weighting for the site's criteria (learning value, signup friction, fixtures, objective verification, translation effort, overlap), the best new themes are document extraction, human-in-the-loop approval, joining datasets, debugging a broken workflow, and the backlogged CRUD API. WhatsApp, email triage and calendar assistants are strongly demand-backed but already sit in the backlog.

### Cited Findings
How well the 13 existing challenges already match high-demand areas:

| Existing challenge | Demand area it matches | Evidence |
|---|---|---|
| 12 Your First AI Agent | AI agents | AI Agent node in 4,194 templates; "AI agent chat" is template #1 at 780,399 views; "Build Your First AI Agent" 99,862 ([template API](https://api.n8n.io/api/templates/search?page=1&rows=100&sort=views:desc)) |
| 10 Ask Your Google Drive | RAG | "RAG Chatbot for Company Documents using Google Drive and Gemini" 94,941, "Ask questions about a PDF" 118,063 ([template API](https://api.n8n.io/api/templates/search?page=1&rows=100&sort=views:desc)) |
| 02, 05, 07, 13 | Telegram | "Telegram AI Chatbot" 168,542 ([template API](https://api.n8n.io/api/templates/search?page=1&rows=100&sort=views:desc)) |
| 06, 08 | MCP | MCP Client/Trigger launch 32,395 forum views ([forum](https://community.n8n.io/t/we-re-adding-mcp-client-tool-mcp-trigger-nodes-try-them-now/99338)); "Create workflows via MCP" 5,480 ([forum](https://community.n8n.io/t/create-workflows-via-mcp/280856)); official instance-level MCP video 591,873 ([YouTube](https://www.youtube.com/results?search_query=n8n+mcp)) |
| 07 | Scraping | "Scrape and summarize webpages" 291,546 ([template API](https://api.n8n.io/api/templates/search?page=1&rows=100&sort=views:desc)) |
| 03, 09 | Data Tables | "Data Tables Are Here!" 21,230 views ([forum](https://community.n8n.io/t/data-tables-are-here/192256)) |
| 06, 11 | Structured output | Structured Output Parser in 76 of the top 500 templates ([template API](https://api.n8n.io/api/templates/search?page=1&rows=100&sort=views:desc)) |
| 13 | Vision | Multimodal AI category has 3,386 templates ([category query](https://api.n8n.io/api/templates/search?page=1&rows=1&category=Multimodal%20AI)) |
| 09 | Pagination, rate limits, error trigger | Rate-limit/timeout bucket 2.8–4.1% of questions; error-trigger tag 146 ([tags.json](https://community.n8n.io/tags.json)) |

### Inferences
Below is my ranked list. It is a judgment that combines the cited signals in Q1–Q6. "Demand" weighs template views, forum share, YouTube index and job share. "Fit" weighs the site's criteria. "Coverage" says whether one of the 13 existing challenges or a backlog idea already covers the theme: NEW, PARTIAL (overlaps an existing challenge), or BACKLOG (already known to the owner).

1. **Turn supplier invoices into rows** (binary files and document extraction). Concept: n8n Form file upload (or email attachment) → Extract From File (PDF) or a vision model → Information Extractor / structured output → validate totals → Data Table or Sheets. Bonus: flag mismatches for review.
   - Evidence:
     - Document Ops has 1,822 templates, Document Extraction 1,216 and Invoice Processing 369.
     - Templates: "Extract text from a PDF file" 96,182; "Invoices from Gmail to Drive and Sheets" 27,090; Mistral OCR 30,378. ([template API](https://api.n8n.io/api/templates/search?page=1&rows=100&sort=views:desc))
     - Forum: binary/files/PDF is 7.8% of top questions (27,216 views) ([forum](https://community.n8n.io/c/questions/12/l/top.json?period=yearly)); the [local OCR thread](https://community.n8n.io/t/local-ocr-in-n8n-with-ollama-how-to-extract-text-from-scanned-pdfs-without-external-services/287785) has 2,001 views.
     - Jobs: documents/quotes are 5.6% of posts, plus the [RFQ-to-quote post](https://community.n8n.io/t/seeking-estimates-n8n-developer-for-a-small-rfq-to-quote-prototype/312281) (4,920 views, 363 replies).
     - YouTube invoice/OCR tutorials sum to only about 170k views ([YouTube](https://www.youtube.com/results?search_query=n8n+invoice)), so the topic is under-served.
     - Case studies: Field Aerospace, System AI ([n8n](https://n8n.io/case-studies/)).
   - Demand: high. Fit: high. Sample PDFs can be hosted on GitHub Pages, it needs only an OpenRouter key, and verification is objective (known totals).
   - Coverage: NEW. Challenge 13 does vision on a photo, and 06 and 11 use structured output, but nothing handles PDF or binary documents.

2. **"Nothing posts without a yes"** (human-in-the-loop approval). Concept: AI drafts a post or reply → Send and Wait for Response (Telegram, email or Form) → approve publishes to a Telegram channel or a WordPress draft; reject regenerates with feedback.
   - Evidence:
     - Marketing is the #2 category with 3,986 templates; top 2025 social templates have 205,470 and 116,411 views ([template API](https://api.n8n.io/api/templates/search?page=1&rows=100&sort=views:desc)).
     - Social/content/video is the largest showcase domain at 18.5% ([Built with n8n](https://community.n8n.io/c/built-with-n8n/15/l/top.json?period=yearly)).
     - n8n's own [April 2026 challenge](https://community.n8n.io/t/n8n-community-challenge-april-2026-build-a-human-in-the-loop-automation-for-relay/294909) was a human-in-the-loop content pipeline.
     - The [HITL feature announcement](https://community.n8n.io/t/new-human-in-the-loop-capabilities-add-fine-grained-control/258423) has 8,419 views.
     - HITL YouTube tutorials sum to about 173k views ([YouTube](https://www.youtube.com/results?search_query=n8n+human+in+the+loop)).
   - Demand: high. Fit: high. Telegram is already used on the site, and verification is objective: reject means nothing is published.
   - Coverage: NEW concept. Content generation overlaps 06 and the backlog's "Ahrefs keywords → landing page", so keep the primary concept as the human approval.

3. **"Which orders were never paid?"** (join and reconcile datasets). Concept: two JSON/CSV fixtures → Merge by key or Compare Datasets → type coercion (string vs number IDs) and date filtering → Summarize.
   - Evidence:
     - "Joining different datasets" has 122,191 views and "Learn JSON Basics" 74,178 ([template API](https://api.n8n.io/api/templates/search?page=1&rows=100&sort=views:desc)).
     - The data-transformation tag (1,981) is the 5th largest; merge has 202 ([tags.json](https://community.n8n.io/tags.json)).
     - Help threads: [Loop Over Items with multiple lists](https://community.n8n.io/t/loop-over-items-cant-handle-multiple-incoming-lists/234133), [parse JSON string](https://community.n8n.io/t/unable-to-parse-json-string-in-set-node-expressions-n8n-cloud/208647).
     - The official [Weekly Challenge](https://community.n8n.io/t/introducing-the-n8n-community-weekly-challenge-a-new-automation-problem-every-monday/311603) is built on this skill.
     - Expressions/JSON videos sum to only about 73k views.
   - Demand: medium-high. Fit: very high. No signup, a deterministic answer, and little translation.
   - Coverage: PARTIAL. Challenges 05 and 07 cover Filter/Sort/Limit/Aggregate/Split Out/Remove Duplicates; Merge, Compare Datasets and type and date handling are not covered.

4. **"Fix the workflow the AI built"** (debugging). Concept: import a provided JSON with 3–4 planted bugs (wrong expression path, a paired-item error, IF type mismatch, missing Respond to Webhook), then use executions, pinned data and debug-in-editor.
   - Evidence:
     - Execution-stuck questions are 10.3–11.5%, and 44% of recent Questions are tagged as bugs ([forum](https://community.n8n.io/c/questions/12/l/latest.json?order=created)).
     - AI-built workflows are rising: [AI Assistant](https://community.n8n.io/t/introducing-the-ai-assistant-the-workflow-building-agent-inside-n8n/302667), [Create workflows via MCP](https://community.n8n.io/t/create-workflows-via-mcp/280856), [best skills for Claude Code](https://community.n8n.io/t/the-best-n8n-skills-for-claude-code-antigravity/271900) (10,573 views).
     - "Stop Learning n8n in 2026" has 488,003 views ([YouTube](https://www.youtube.com/watch?v=ZeJXI2MAhj0)).
     - [NodeQuest](https://community.n8n.io/t/nodequest-learn-n8n-by-fixing-broken-workflows-28-puzzle-levels/302950) uses this format.
   - Demand: medium-high (pain-driven). Fit: very high.
   - Coverage: NEW. The site's blog covers item-linking errors and Code node debugging.

5. **Tiny REST API with Webhook + Data Table** (CRUD, status codes, validation).
   - Evidence:
     - "Creating an API endpoint" has 422,411 views, #2 of 13,055 templates ([template](https://n8n.io/workflows/1750)).
     - The webhook tag is 8th largest at 667 ([tags.json](https://community.n8n.io/tags.json)).
     - Webhook questions are 4.7–7.2% of the forum sample.
     - Webhook YouTube tutorials sum to about 382k views ([YouTube](https://www.youtube.com/results?search_query=n8n+webhook)).
     - n8n Academy uses a "Webhook-Driven Order Processing System" exercise ([forum search](https://community.n8n.io/search?q=exercises)).
   - Demand: high. Fit: very high. Verification is by curl.
   - Coverage: BACKLOG ("n8n as a to-do backend (CRUD API)"), strongly validated. Extends 01 and 03.

6. **WhatsApp assistant.**
   - Evidence:
     - Template #3, ["Building Your First WhatsApp Chatbot"](https://n8n.io/workflows/2465), has 331,713 views, plus WhatsApp templates at 91,062, 71,396 and 46,989.
     - WhatsApp is the #2 YouTube topic at about 2.78M views ([YouTube](https://www.youtube.com/results?search_query=n8n+whatsapp)); Spanish [Virola](https://www.youtube.com/watch?v=M5ZSjBnACtM) has 547,985 views.
     - Forum WhatsApp pains: [Trigger not receiving messages](https://community.n8n.io/t/whatsapp-trigger-not-receiving-real-messages/239346) (2,644), [webhooks delayed](https://community.n8n.io/t/whatsapp-cloud-api-webhooks-delayed-by-minutes-to-hours/265580) (1,394).
     - WhatsApp is 4.7% of job posts.
   - Demand: very high, and highest for the Spain and Latin America audience. Fit: low-medium. Setup needs a Meta developer app, business account, phone number, webhook verification and a public HTTPS URL.
   - Coverage: BACKLOG ("WhatsApp calendar bot", "talk to Google Sheets through WhatsApp").

7. **Customer email triage.**
   - Evidence:
     - Gmail is used in 3,056 templates; "Email Summary Agent" has 42,263 views ([template API](https://api.n8n.io/api/templates/search?page=1&rows=100&sort=views:desc)).
     - Job: [Gmail/Sheets/Slack AI email classification](https://community.n8n.io/t/freelancer-n8n-automation-expert-gmail-google-sheets-slack-ai-email-classification/289856) (2,354 views, 60 replies).
     - Email is about 5% of forum questions.
     - Email YouTube tutorials sum to about 313k views ([YouTube](https://www.youtube.com/results?search_query=n8n+email+automation+gmail)).
   - Demand: high. Fit: medium. Gmail OAuth is friction on self-hosted n8n; IMAP is an alternative.
   - Coverage: BACKLOG ("customer email triage"). It overlaps 04's classification and routing, so make the primary concept the email trigger, a draft (not send), and labels and threading.

8. **Appointment or meeting-slot assistant.**
   - Evidence:
     - Templates: ["Suggest meeting slots using AI"](https://n8n.io/workflows/1953) 78,236; [Google Calendar assistant agent](https://n8n.io/workflows/2703) 49,291; [MCP server with Google Calendar](https://n8n.io/workflows/3514) 49,155.
     - Calendar/appointment YouTube tutorials sum to about 208k views ([YouTube](https://www.youtube.com/results?search_query=n8n+appointment+booking+calendar)); the [WhatsApp appointment Short](https://www.youtube.com/watch?v=vcvRVlc_VFg) has 1.58M views.
     - Spanish [WhatsApp + Calendar assistant course](https://www.youtube.com/watch?v=p3gz4pFxL4U) has 184,568 views.
     - Calendar/booking is 2.2% of job posts and 4.0% of showcases.
   - Demand: medium-high. Fit: medium (Google OAuth).
   - Coverage: BACKLOG ("calendar meeting-slot assistant", "WhatsApp calendar bot").

9. **Orchestrator agent with sub-agents or sub-workflow tools.** Concept: Execute Workflow Trigger plus Call n8n Workflow Tool, or the AI Agent Tool.
   - Evidence:
     - The AI Agent node appears in 204 of the top 500 templates; Call n8n Workflow Tool in 50 ([template API](https://api.n8n.io/api/templates/search?page=1&rows=100&sort=views:desc)).
     - AI agents are the largest job bucket at 15.3% ([Jobs](https://community.n8n.io/c/jobs/13/l/latest.json?order=created)).
     - Help: [multi-agent architecture](https://community.n8n.io/t/multi-main-agent-multi-sub-agent-architecture-workflow/220790), [N sub-workflows in parallel](https://community.n8n.io/t/what-is-the-best-pattern-for-triggering-n-sub-workflows-in-parallel-and-resuming-main-workflow-when-all-complete/233446).
     - Multi-agent YouTube tutorials sum to about 386k views ([YouTube](https://www.youtube.com/results?search_query=n8n+multi+agent)).
   - Demand: high. Fit: high (OpenRouter only; tool calls are visible in the logs).
   - Coverage: PARTIAL with 12 and 08. The BACKLOG "Valencia AI trip planner" is a natural vehicle.

10. **Enrich and score inbound leads.** Concept: form → fetch the lead's company website (HTTP Request + HTML node, or Firecrawl) → scoring rubric via structured output → upsert to Sheets or a Data Table → alert on hot leads.
    - Evidence:
      - Google Maps lead templates have 150,209, 82,097 and 43,596 views; ["company enrichment from website"](https://n8n.io/workflows/1862) has 72,240.
      - Lead-generation job posts are 8.1% ([Jobs](https://community.n8n.io/c/jobs/13/l/latest.json?order=created)); one ["Lead form → AI score → Slack"](https://community.n8n.io/t/lead-form-ai-score-slack-in-72h-249-paid-after-you-see-it-run/309728) job pays $249.
      - Lead generation is 6.8% of all Upwork postings ([Vibeworker](https://tryvibeworker.com/blog/most-in-demand-upwork-skills)).
    - Demand: high. Fit: medium-high. Avoid Google Maps scraping because of terms of service and brittleness.
    - Coverage: PARTIAL with 04 (AI classify and route) and 03. Also BACKLOG ("smart contact form with Sheets and Slack").

11. **Test your agent** (Evaluations). Concept: build a Data Table of test questions with expected answers, run an evaluation, and reach a target score.
    - Evidence:
      - The AI agent/LLM bucket is the top question bucket by views, 65,112 ([forum](https://community.n8n.io/c/questions/12/l/top.json?period=yearly)).
      - Reliability threads: ["AI Agent finishes green even when its tool failed"](https://community.n8n.io/t/ai-agent-node-finishes-green-even-when-its-tool-failed-how-i-catch-it-now/300885), ["follow system prompt"](https://community.n8n.io/t/how-to-get-ai-agent-to-follow-system-prompt/248180).
      - The [AI Evaluation beta thread](https://community.n8n.io/t/help-us-test-the-new-ai-evaluation-feature/118962) has 3,878 views and 138 posts.
    - Demand: medium. Fit: high (objective score).
    - Coverage: NEW. Matches the blog topic "AI agent testing".

12. **Connect Google the right way** (OAuth2 credential setup).
    - Evidence:
      - OAuth/credentials is 12.2% of top questions (41,719 views).
      - Threads: [redirect_uri_mismatch](https://community.n8n.io/t/n8n-cloud-google-drive-oauth2-failing-redirect-uri-mismatch-gmail-workspace/239845) (1,353), [no redirect URL](https://community.n8n.io/t/n8n-doesnt-give-oauth-redirect-url/240103) (1,195), [Create OAuth Client ID](https://community.n8n.io/t/help-connection-google-create-oauth-client-id/298202) (919).
      - Google Sheets is used in 36% of templates.
    - Demand: high (pain). Fit: medium. Best as a short setup challenge.
    - Coverage: PARTIAL. It is a prerequisite for 10, and the BACKLOG "OpenRouter setup" is the analogous setup idea.

13. **Safe webhooks** (HMAC signature with the Crypto node, deduplicate event IDs, respond 200 fast).
    - Evidence:
      - The webhook tag has 667 topics; webhooks are 4.7–7.2% of questions.
      - Showcase: [idempotency gate](https://community.n8n.io/t/preventing-duplicate-webhook-executions-in-n8n-idempotency-gate-workflow/275249).
      - WhatsApp and Telegram delivery problems (see Q2).
    - Demand: medium. Fit: very high. Signed requests can be sent with a provided curl command.
    - Coverage: NEW. 01 is only a basic webhook. Matches the blog topics on idempotency and webhook 404s.

14. **Catch silent failures** (production monitoring). Concept: error outputs, Stop and Error, an error workflow with an alert linking to the execution, and a "no data today" heartbeat.
    - Evidence:
      - [Monitoring in production](https://community.n8n.io/t/how-do-you-monitor-n8n-workflows-in-production-and-detect-failures-early/300723): 1,447 views, 25 likes.
      - [Centralized error handling](https://community.n8n.io/t/best-practice-for-centralized-error-handling-and-retry-from-failed-step-in-production-workflows/300785): 559 views.
      - [Error workflow on agent tool failure](https://community.n8n.io/t/setting-up-error-workflow-upon-ai-agent-tool-failure/252743): 891 views.
      - Error-handling YouTube tutorials sum to about 214k views ([YouTube](https://www.youtube.com/results?search_query=n8n+error+handling)).
    - Demand: medium. Fit: high.
    - Coverage: PARTIAL with 09 (Error Trigger). Use a heartbeat or business-result angle to avoid overlap.

15. **Self-host n8n with Docker and receive a public webhook.**
    - Evidence:
      - Self-hosting is the #1 forum bucket: 15.8% of top questions, 59,158 views ([forum](https://community.n8n.io/c/questions/12/l/top.json?period=yearly)).
      - The deployment tag has 1,998 topics ([tags.json](https://community.n8n.io/tags.json)).
      - Self-hosting is the #1 YouTube topic at about 4.32M views ([YouTube](https://www.youtube.com/results?search_query=n8n+self+host)).
      - [Update-to-2.0 guide](https://community.n8n.io/t/solved-how-to-update-to-2-0-self-hosted/234231): 2,639 views.
    - Demand: very high. Fit: low. It is OS-specific, may need a paid VPS, is hard to verify, and needs heavy translation.
    - Coverage: NEW. Matches the blog topics on self-hosting and queue mode. Best as an optional setup track.

16. **Chat with your data** (an analyst agent over a Data Table, Sheets or Postgres).
    - Evidence:
      - Templates: ["Build Your First AI Data Analyst Chatbot"](https://n8n.io/workflows/3050) 133,537; ["Chat with Postgresql"](https://n8n.io/workflows/2859) 73,534.
      - Database/Sheets sync is 10% of job posts.
      - [Data Table filter](https://community.n8n.io/t/data-table-filter/201112) thread: 1,165 views.
    - Demand: medium-high. Fit: high.
    - Coverage: PARTIAL with 12. Also BACKLOG ("talk to Google Sheets through WhatsApp").

17. **Telegram voice-note assistant** (audio binary → transcription → agent → reply, with a Switch on message type).
    - Evidence:
      - Template #4, ["Angie" Telegram voice/text assistant](https://n8n.io/workflows/2462), has 326,067 views; the [Telegram text/voice bot](https://n8n.io/workflows/4696) has 82,466.
      - Telegram YouTube tutorials sum to about 413k views.
      - Telegram is the main channel for Ukrainian learners ([airinex](https://airinex.com/blog/2026-05-26-telegram-ai-bot-n8n-rag-bez-rozrobnykiv)).
    - Demand: high. Fit: medium (needs a transcription API).
    - Coverage: PARTIAL with 13 (photo binary) and 12. Could also be a bonus on 13.

18. **Website chat widget with lead capture and human handoff.**
    - Evidence:
      - ["Branded AI-Powered Website Chatbot"](https://n8n.io/workflows/2786): 88,237 views.
      - Website-chatbot YouTube tutorials sum to about 495k views ([YouTube](https://www.youtube.com/results?search_query=n8n+website+chatbot)).
      - Templates: Support 1,202, Support Chatbot 517, Ticket Management 494.
      - Koralplay automated 70% of tickets ([n8n](https://n8n.io/case-studies/)).
      - Spanish job: [AI support system](https://community.n8n.io/t/buscamos-ai-automation-engineer-para-construir-nuestro-sistema-de-soporte-con-ia/315655).
    - Demand: medium-high. Fit: medium.
    - Coverage: PARTIAL with 10 and 12. Also BACKLOG ("generic AI assistant"). Matches the blog topic on human-reviewed support.

19. **CRM upsert and sync** (free HubSpot account; search then create or update; no duplicates).
    - Evidence:
      - CRM is 6.1% of job posts (9,097 views) ([Jobs](https://community.n8n.io/c/jobs/13/l/latest.json?order=created)).
      - Help: [Meta Lead Ads → HubSpot](https://community.n8n.io/t/need-help-designing-n8n-architecture-for-meta-lead-ads-bebop-hubspot-automation/308747).
      - Tags: hubspot 129, highlevel 45.
      - CRM YouTube tutorials sum to only about 31k views ([YouTube](https://www.youtube.com/results?search_query=n8n+crm+hubspot+gohighlevel)), so the topic is under-served.
    - Demand: medium (job-driven). Fit: medium (account plus token).
    - Coverage: NEW.

20. **Absolute-beginner on-ramp** (Manual Trigger, Edit Fields, expressions, inspecting output).
    - Evidence:
      - ["Very quick quickstart"](https://n8n.io/workflows/1700): 232,320 views.
      - The official Beginner Course 1/9 has 883,578 YouTube views, with steep drop-off in later parts ([forum top](https://community.n8n.io/top.json?period=all)).
      - ["Learn n8n Expressions"](https://n8n.io/workflows/5271): 27,902 views.
    - Demand: high. Fit: very high.
    - Coverage: BACKLOG ("Hello n8n with Manual Trigger"). 01 is already beginner level.

21. **Voice receptionist** (an external voice agent calls n8n webhook tools, e.g. for a restaurant booking check).
    - Evidence:
      - Voice is 6.4% of job posts; [Voice AI specialist](https://community.n8n.io/t/job-title-ai-automation-engineer-n8n-voice-ai-specialist/282569) and [ElevenLabs](https://community.n8n.io/t/willing-to-pay-for-guidance-to-refine-my-n8n-workflows-and-integrate-elevenlabs-voice-agents/302973) jobs.
      - Voice YouTube tutorials sum to about 456k views ([YouTube](https://www.youtube.com/results?search_query=n8n+voice+agent)).
      - [ElevenLabs restaurant voice template](https://n8n.io/workflows/2846): 62,222 views.
    - Demand: medium-high. Fit: low (voice platform signup, credits, phone numbers).
    - Coverage: NEW. Related to 08 (tools) and the restaurant theme of 09.

22. **E-commerce order operations** (low-stock alert, order notifications).
    - Evidence:
      - E-commerce/orders is 9.4% of job posts, the #3 bucket.
      - Shopify YouTube tutorials sum to only about 45k views ([YouTube](https://www.youtube.com/results?search_query=n8n+shopify)).
      - Adrián Sáenz's Spanish course has a "Shopify manager agent" chapter ([YouTube](https://www.youtube.com/watch?v=3IvcIPDGB1k)).
    - Demand: medium. Fit: medium if built on a static fixture, low with a real store.
    - Coverage: PARTIAL with 09 (orders API).

23. **Poll a long-running AI job** (image or video generation: Wait + IF until done).
    - Evidence:
      - AI video templates have 214,907, 191,045 and 155,914 views; the [Flux image generator](https://n8n.io/workflows/2417) has 76,789.
      - AI-video YouTube tutorials sum to about 990k views.
    - Demand: high. Fit: low because of cost and terms of service. Use a cheap image-only variant.
    - Coverage: NEW concept.

24. **Webpage change monitor or summarizer.**
    - Evidence: ["Scrape and summarize webpages with AI"](https://n8n.io/workflows/1951) has 291,546 views; scraping YouTube tutorials sum to about 725k.
    - Demand: high. Fit: high.
    - Coverage: BACKLOG ("Firecrawl webpage summarizer") and 07 (Firecrawl + Remove Duplicates). Mostly covered already.

25. **Scheduled digest or report** (RSS newsletter, or a weekly KPI report with a chart).
    - Evidence:
      - Templates: [RSS AI newsletter](https://n8n.io/workflows/3986) 52,896; [AI marketing report](https://n8n.io/workflows/2783) 36,102.
      - Job: [Looker Studio reporting](https://community.n8n.io/t/hiring-n8n-looker-studio-builder-for-marketing-reporting-meta-ads-google-ads-ga4-paid-test-ongoing-india-ist/317595).
      - n8n Camp challenges "El informe de rendimiento" and "Panel de estado semanal" ([n8n.camp](https://n8n.camp/)).
    - Demand: medium. Fit: high (RSS needs no signup).
    - Coverage: PARTIAL with 05. Also BACKLOG ("daily weather notification").

Further judgments:
- Ranked purely by demand, without fit, the order would start: self-hosting (15), WhatsApp (6), AI content pipelines (2/23), document extraction (1), AI agents (9), lead generation (10).
- Self-hosting and WhatsApp drop in the overall ranking only because of setup friction and verification difficulty for self-paced learners.
- Concepts that clearly lack an existing challenge: binary/PDF handling, Wait or human-in-the-loop, Merge/Compare Datasets, debugging, Crypto/HMAC and idempotency, sub-workflows as tools, evaluations, and OAuth setup.

### Gaps
- There is no recency-weighted template popularity, no Reddit post data, and no Google Trends data. Upwork, Fiverr and Udemy figures are unverified secondary numbers.
- Fit judgments are mine, from the site's stated criteria. They were not tested with learners.
- I did not check whether specific fixtures exist or work without signup: public Ukrainian APIs (Nova Poshta, Monobank), a free WhatsApp Cloud API test number, or free transcription APIs.
