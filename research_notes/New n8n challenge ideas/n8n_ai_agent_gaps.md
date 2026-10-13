# n8n AI and agent capabilities (October 2026) and what n8n-challenges.app does not yet teach

As of 2026-10-06. Current n8n `stable` is 2.42.3 and `beta` is 2.43.0 ([n8n changelog](https://docs.n8n.io/changelog/readme.md); [GitHub releases](https://github.com/n8n-io/n8n/releases/tag/n8n%402.42.3)). n8n 2.0.0 was published on 2025-12-08 ([GitHub release n8n@2.0.0](https://github.com/n8n-io/n8n/releases/tag/n8n%402.0.0)) and n8n 3.0 is "scheduled for October 2026" ([v3.0 breaking changes](https://docs.n8n.io/changelog/v30-breaking-changes.md)). Note: n8n reorganised its docs in 2026. Old `docs.n8n.io/advanced-ai/...` and `docs.n8n.io/release-notes/` URLs now return 404. Every page is also available as Markdown by adding `.md` ([docs sitemap](https://docs.n8n.io/sitemap.md)).

Existing AI challenges, read from the repository, cover the following nodes and features:
- **04 Get City Problems to the Right People:** Form Trigger, AI Agent, OpenRouter Chat Model and Send Email. Send Email is also attached as an agent tool (`emailSendTool`). ([04 file](../../content/challenges/04-valencia-citizen-request-classifier.md))
- **06 Generate an Article with AI:** n8n's instance-level MCP server driven from ChatGPT or Claude, Form Trigger, Basic LLM Chain, OpenAI and OpenRouter Chat Models, Structured Output Parser and WordPress. ([06 file](../../content/challenges/06-ai-workflow-builder.md))
- **08 What's for Dinner?:** Telegram Trigger, AI Agent, OpenRouter, MCP Client Tool, Calculator, MCP Server Trigger, three HTTP Request nodes used as tools (`n8n-nodes-base.httpRequestTool`) and Telegram. ([08 file](../../content/challenges/08-mercadona-mcp-assistant.md))
- **10 Ask Your Google Drive:** Manual Trigger, Google Drive, Loop Over Items, Default Data Loader, Recursive Character Text Splitter, Embeddings OpenAI, Simple Vector Store (insert and retrieve-as-tool), Chat Trigger, OpenAI Chat Model and AI Agent. ([10 file](../../content/challenges/10-google-drive-rag.md))
- **11 Alien Translator:** built only by prompting the in-editor assistant, now named "n8n Assistant". Uses Chat Trigger, Basic LLM Chain, OpenAI Chat Model with a Gateway-credits option and Structured Output Parser. ([11 file](../../content/challenges/11-alien-translator.md))
- **12 Your First AI Agent:** Chat Trigger, AI Agent, OpenRouter, Wikipedia tool and Simple Memory. ([12 file](../../content/challenges/12-wikipedia-ai-agent.md))
- **13 AI Agent: Photo to Summary:** Telegram Trigger, Edit Fields, AI Agent with image passthrough, an OpenRouter vision model and Telegram. ([13 file](../../content/challenges/13-telegram-photo-summary.md))

## Key question 1: Which AI nodes and features exist now, which are new in 2025–2026, and which do the existing challenges not teach?

### Takeaway
n8n's AI surface grew a lot between mid-2025 and October 2026. Additions include:
- Evaluations, the Model Selector, the AI Agent Tool, streaming, the Chat (Respond to Chat) node and Guardrails.
- Instance-level MCP and tool-level human approval.
- Gateway credits, the n8n Assistant, and standalone n8n Agents, which reached all plans in preview on 2026-09-21.

The seven existing AI challenges teach the core agent, RAG, MCP, vision and assistant-building basics. They teach none of the following: document or PDF extraction, the specialised chains (Information Extractor, Text Classifier, Sentiment, Summarization), Guardrails, evaluations, human approval of tool calls, multi-agent orchestration (AI Agent Tool or sub-workflow tools), model routing and fallback, audio, image generation, persistent memory, or standalone Agents. n8n 3.0 (October 2026) retires Chat Hub and removes several legacy AI nodes, so new challenges should avoid them.

### Cited Findings

**Release timeline of AI features (newest first). Each item gives the version and release date.**
- **Standalone n8n Agents (Preview), 2026-09-21, n8n 2.40.** First-class agents built in an Agents tab with a model, instructions, tools (n8n nodes, MCP servers, workflows), skills, sub-agents, knowledge files and memory. They connect to Slack, Telegram, Linear or Discord, run on a schedule, or are called from workflows through the new Message an Agent node. One turn counts as one execution. Sensitive tools can require approval. "The AI Agent node hasn't changed." Available on all plans; Enterprise has extra governance coming. ([Changelog](https://docs.n8n.io/changelog/readme.md))
  - Self-hosted instances need extra setup from 2.32.3 onwards. Knowledge bases need n8n Cloud or a Daytona sandbox on self-hosted. Episodic memory "needs an OpenAI credential". ([Build and manage agents](https://docs.n8n.io/build/build-and-manage-agents.md))
  - A WhatsApp agent channel PR merged 2026-10-06 ([PR #38750](https://github.com/n8n-io/n8n/pull/38750)). A "guardrail runner to the agent loop" PR merged 2026-10-01 ([PR #39621](https://github.com/n8n-io/n8n/pull/39621)). Release status of both PRs is unverified.
- **AI Agent "Force Tool Call on First Iteration", n8n 2.40 (2026-09-15).** Opt-in. The model must call a tool on its first response. It helps "smaller or less compliant models (e.g. Mistral-Small on IONOS, vLLM, Ollama) that otherwise reply in prose and skip wired tools". ([Release notes 2.40](https://docs.n8n.io/changelog/release-notes.md); [PR #38342](https://github.com/n8n-io/n8n/pull/38342))
- **"AI Assistant" renamed "n8n Assistant", n8n 2.40 (2026-09-15).** ([Release notes](https://docs.n8n.io/changelog/release-notes.md))
  - The n8n Assistant reached Cloud on 2026-07-09 (2.29.9). It "supersedes the AI Workflow Builder": it plans, builds, executes, and fixes errors in workflows. ([Changelog](https://docs.n8n.io/changelog/readme.md))
  - Self-hosted setup was simplified in 2.35 (2026-08-18). It needs your own Anthropic, OpenAI, OpenRouter or OpenAI-compatible key and a Docker sandbox. ([Changelog](https://docs.n8n.io/changelog/readme.md))
  - Available on Cloud Starter and Pro, and on self-hosted Community, Registered Community and Business; not yet on Enterprise. It is in Preview. ([n8n Assistant docs](https://docs.n8n.io/build/ways-of-building-workflows/n8n-assistant.md))
  - It uses separate monthly Assistant credits. Trials get a one-time allowance. ([Assistant credits](https://docs.n8n.io/deploy/use-n8n-cloud/assistant-credits.md))
- **Gateway credits, released 2026-09-02 (n8n 2.36).** Use OpenAI, Anthropic, Google Gemini, Alibaba Qwen, MiniMax and Moonshot Kimi models, plus Brave Search, Firecrawl, Browserbase, LlamaParse and PDF.co, with no provider account or key. ([Changelog](https://docs.n8n.io/changelog/readme.md))
  - Cloud Starter and Pro only; not Cloud Enterprise or self-hosted. "Free trials include Gateway credits, but you can't top up until you upgrade." ([Gateway credits](https://docs.n8n.io/deploy/use-n8n-cloud/gateway-credits.md))
  - "New Cloud users receive a small amount of free credit at sign-up." A legacy one-time free OpenAI credit exists "only on instances without Gateway credits". ([Gateway credits](https://docs.n8n.io/deploy/use-n8n-cloud/gateway-credits.md))
- **Anthropic prompt caching.** Added to the Anthropic Chat Model in 2.37 (2026-08-25) and to the Anthropic node in 2.42 (2026-09-29). **Azure OpenAI Chat Model renamed** "Azure AI Foundry Chat Model" in 2.42. ([Release notes](https://docs.n8n.io/changelog/release-notes.md))
- **OpenRouter Chat Model provider-routing options** (order, allowFallbacks, zdr, sort and others), 2.36 (2026-08-18). **MCP Server Trigger "Instructions" field**, 2.36. ([Release notes](https://docs.n8n.io/changelog/release-notes.md))
- **Enhanced human-in-the-loop (HITL) approvals in Slack and Telegram.** Records who approved, can restrict approvers, and adds a `respondedAt` timestamp on all Send and Wait nodes. Released 2026-07-07 (2.30); Slack and Telegram enhancements enabled in 2.35. ([Changelog](https://docs.n8n.io/changelog/readme.md); [Release notes](https://docs.n8n.io/changelog/release-notes.md))
- **AI Agent "Automatically Passthrough Binary PDFs", 2.28 (2026-06-23).** Sends PDFs as file content to models with native PDF support, for example Gemini. OpenAI Responses API support followed in a separate PR. ([Release notes](https://docs.n8n.io/changelog/release-notes.md); [PR #28038](https://github.com/n8n-io/n8n/pull/28038); [PR #32604](https://github.com/n8n-io/n8n/pull/32604))
- **Web search for agents, 2.25.1 (2026-06-02).** Uses the provider's native search tool, otherwise falls back to Brave or SearXNG. ([Changelog](https://docs.n8n.io/changelog/readme.md)) It is listed as an Agents (Agent Builder) capability. ([Build and manage agents](https://docs.n8n.io/build/build-and-manage-agents.md))
- **One-click MCP registry servers, 2.22 (2026-05-19).** Apify, Linear, monday.com, Notion and PostHog. ([Changelog](https://docs.n8n.io/changelog/readme.md))
- **New chat-model providers.** Moonshot Kimi and Alibaba Model Studio/Qwen in 2.16–2.17 (April 2026); MiniMax in 2.18; NVIDIA Nemotron embeddings in 2.26; Oracle DB vector store in 2.23. ([Changelog](https://docs.n8n.io/changelog/readme.md))
- **Microsoft Agent 365 Trigger, 2.20 (2026-05-05).** Requires a Microsoft 365 tenant. ([Changelog](https://docs.n8n.io/changelog/readme.md))
- **Streaming in the canvas chat, 2.10 (2026-02-23).** ([Release notes](https://docs.n8n.io/changelog/release-notes.md))
- **Human-in-the-loop for AI tool calls, 2.6 (2026-01-26).** "Click the + icon on its connection from the AI Agent and choose Add human review step." Works with any tool, including the MCP Client Tool and sub-workflow tools. ([Changelog](https://docs.n8n.io/changelog/readme.md))
- **Chat node HITL actions, 2.5 (2026-01-20).** "Send a message" and "Send a message and wait for response", usable as workflow steps or agent tools. Requires the Chat Trigger Response Mode "Using Response Nodes". ([Changelog](https://docs.n8n.io/changelog/readme.md))
  - The node first shipped as "Respond to Chat" in 1.105.0 (2025-07-28). ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md))
  - Since 2.5 the OpenAI Chat Model's default is gpt-5-mini, and ChromaDB supports a local database. ([Release notes](https://docs.n8n.io/changelog/release-notes.md))
- **Chat Hub Beta announced 2025-12-15** ([forum announcement](https://community.n8n.io/t/announcing-chat-hub-beta/236446)). It is a multi-model chat UI with personal agents. Workflow agents need a Chat Trigger with streaming enabled on the AI Agent. ([Chat Hub docs](https://docs.n8n.io/build/ways-of-building-workflows/chat-hub.md)) **n8n 3.0 turns Chat Hub off by default and n8n 4.0 removes it.** ([v3.0 breaking changes](https://docs.n8n.io/changelog/v30-breaking-changes.md))
- **Standalone MCP Client node, 1.122.0 (2025-11-24).** Calls MCP servers from any workflow step without an agent. ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md))
- **Instance-level MCP access (beta), 1.121.0 (2025-11-18).** ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md))
  - Building and editing workflows over MCP is available from 2.13.0. Both the instance and each workflow must opt in. ([Connect to n8n MCP server](https://docs.n8n.io/connect/connect-to-n8n-mcp-server.md))
  - The preview label was removed in 2.31 (2026-07-14). ([Release notes](https://docs.n8n.io/changelog/release-notes.md))
- **Guardrails node, 1.119.0 (2025-11-03).** Defaults are adapted from OpenAI's open-source guardrails package. **OAuth support for the MCP Client Tool** shipped in the same release. ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md))
- **AI Workflow Builder (Beta), 1.115.0 (2025-10-06).** One credit per prompt. It reached Enterprise Cloud in 1.117.1 (2025-10-24). ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md))
- **Data tables, 1.113.1 (2025-09-23).** Built-in storage, 50 MB per Cloud instance. ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md)) Creating a data table from CSV arrived in 1.122.0. ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md)) The Data table node is `usableAsTool: true`. ([n8n source, DataTable.node.ts](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/DataTable/DataTable.node.ts))
- **n8n 1.103.0 (2025-07-14) shipped three features:** ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md))
  - The AI Agent Tool node, for multi-agent orchestration on one canvas in a single execution.
  - Chat streaming: Chat Trigger Response Mode Streaming, Webhook Respond Streaming, and the AI Agent "Enable streaming" option.
  - Built-in evaluation metrics.
- **AI Agent fallback model.** It existed by n8n 1.100.1: a GitHub issue filed 2025-07-08 reports "A Fallback Model sub-node must be connected and enabled". ([Issue #17140](https://github.com/n8n-io/n8n/issues/17140)) It is documented as "Enable Fallback Model" on the AI Agent Tool page. ([AI Agent Tool docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolaiagent.md)) A fix allowing "a fallback model alongside the primary on AI nodes" was merged on 2026-09-08. ([PR #38007](https://github.com/n8n-io/n8n/pull/38007))
- **Model Selector node, 1.100.0 (2025-06-23).** "Connect multiple model nodes ... then configure routing conditions." ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md)) Rules are evaluated in order and the first match wins. ([Model Selector docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.modelselector.md))
- **Evaluations for AI workflows (Evaluation Trigger and Evaluation node), 1.95.0 (2025-05-26).** ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md)) Tokens and latency are recorded automatically as evaluation metrics ([PR #16243](https://github.com/n8n-io/n8n/pull/16243), merged 2025-06-13).
- **Logs view showing "token usage for AI workflows" (May 2025).** Described in the 1.92.0 and 1.94.0 notes. Partial execution for AI tools shipped in 1.92.0 (2025-05-05). ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md))
- **MCP Server Trigger and MCP Client Tool, 1.88.0 (2025-04-10).** ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md))
- **Think Tool, PR merged 2025-04-03.** Shipped around n8n 1.87, April 2025. ([PR #14351](https://github.com/n8n-io/n8n/pull/14351))
- **AI Agent types collapsed to Tools Agent, 1.82.0 (2025-03-03).** The old modes (SQL Agent, ReAct and others) are removed in n8n 3.0. ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md); [v3.0 breaking changes](https://docs.n8n.io/changelog/v30-breaking-changes.md))
- **Older chain nodes.** Text Classifier in 1.51.0 (2024-07-18); Information Extractor and Sentiment Analysis in 1.53.0 (2024-07-31); Vector Store Tool (2024-07-03); Tools Agent (2024-05-15); Chat Memory Manager (2024-01-17). ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md))

**Current node inventory (from the docs sitemap and source tree)**
- **Root nodes** ([docs sitemap](https://docs.n8n.io/sitemap.md)):
  - AI Agent, Basic LLM Chain, Question and Answer Chain, Summarization Chain, Information Extractor, Text Classifier, Sentiment Analysis, LangChain Code and Microsoft Agent 365 Trigger.
  - Vector stores: Simple, PGVector, Supabase, Qdrant, Pinecone, Milvus, MongoDB Atlas, Redis, Weaviate, Chroma, Azure AI Search, Oracle and Zep. Databricks also appears in the source tree. ([n8n source, vector_store](https://github.com/n8n-io/n8n/tree/master/packages/%40n8n/nodes-langchain/nodes/vector_store))
- **Tools:** Call n8n Workflow Tool, Custom Code Tool, Calculator, Think Tool, AI Agent Tool, MCP Client Tool, Vector Store Question Answer Tool, Wikipedia, Wolfram|Alpha, SearXNG and SerpApi. Any app node with `usableAsTool` can also be a tool, such as HTTP Request, Gmail, Postgres, Google Sheets or Data table. ([docs sitemap](https://docs.n8n.io/sitemap.md); [Tools Agent docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent.md))
- **Memory:** Simple Memory, Postgres, Redis, MongoDB, Xata, Motorhead, Zep and Chat Memory Manager. ([n8n source, memory](https://github.com/n8n-io/n8n/tree/master/packages/%40n8n/nodes-langchain/nodes/memory))
- **Rerankers:** only Reranker Cohere. ([n8n source, rerankers](https://github.com/n8n-io/n8n/tree/master/packages/%40n8n/nodes-langchain/nodes/rerankers))
- **Output parsers:** Structured, Auto-fixing and Item List. ([Tools Agent docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent.md))
- **Retrievers:** Contextual Compression, MultiQuery, Vector Store and Workflow Retriever. ([docs sitemap](https://docs.n8n.io/sitemap.md))
- **Chat models:** OpenAI, Anthropic, Google Gemini, Vertex, Groq, Mistral Cloud, Ollama, OpenRouter, DeepSeek, xAI Grok, Cohere, AWS Bedrock, Azure AI Foundry, Databricks, Lemonade, MiniMax, Moonshot Kimi, NVIDIA Nemotron, Qwen Cloud and Vercel AI Gateway. ([docs sitemap](https://docs.n8n.io/sitemap.md))
- **Core AI nodes:** Chat Trigger, Chat, Guardrails, MCP Client and MCP Server Trigger. ([docs sitemap](https://docs.n8n.io/sitemap.md))
- **Vendor app nodes:** OpenAI (Assistant, Audio, Conversation, File, Image and Video operations), Anthropic, Google Gemini, MiniMax, Moonshot Kimi, Perplexity and Qwen Cloud. ([docs sitemap](https://docs.n8n.io/sitemap.md))
- **AI Agent options** ([Tools Agent docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent.md)):
  - System Message.
  - Max Iterations, with a default of 10.
  - Return Intermediate Steps.
  - Tracing Metadata for LangSmith.
  - Automatically Passthrough Binary Images.
  - Enable Streaming, on by default. It needs a streaming-capable trigger.
  - Require Specific Output Format, with the Structured, Auto-fixing or Item List parser.
  - Human review for tool calls.
  - `$fromAI()` for tool parameters.
  - The AI Agent Tool also documents Enable Fallback Model and Batch Processing. ([AI Agent Tool docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolaiagent.md))
- **Guardrails operations** ([Guardrails docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.guardrails.md)):
  - "Check Text for Violations" routes to a Fail branch. Its checks are Keywords, Jailbreak, NSFW, PII, Secret Keys, Topical Alignment, URLs, Custom LLM-based and Custom Regex.
  - "Sanitize Text" replaces URLs, regex matches, secret keys or PII with placeholders.
  - LLM-based checks such as Jailbreak, NSFW and Topical Alignment need a connected Chat Model.
- **Information Extractor schema types:** From Attribute Descriptions, Generate From JSON Example, or Define using JSON Schema. ([Information Extractor docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.information-extractor.md))
- **Text Classifier options:** Allow Multiple Classes, When No Clear Match (Discard Item, or Output on Extra 'Other' Branch) and Enable Auto-Fixing. ([Text Classifier docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.text-classifier.md))
- **Sentiment Analysis:** custom categories and optional confidence scores. Docs advise temperature 0. ([Sentiment Analysis docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.sentimentanalysis.md))
- **Summarization Chain:** Map Reduce (recommended), Refine or Stuff. ([Summarization Chain docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainsummarization.md))
- **OpenAI node:** Audio has Generate Audio, Transcribe a Recording (flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm) and Translate a Recording. ([OpenAI audio operations](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations.md)) Image has Analyze, Generate and Edit. ([OpenAI image operations](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/image-operations.md))
- **Google Gemini node:** Analyze Audio, Transcribe a Recording, Analyze Document, File Search store create, list, delete and upload (RAG), Analyze, Generate and Edit Image, Analyze Video and Generate Video. It can run on Gateway credits on Cloud. ([Gemini node docs](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.googlegemini.md))
- **Evaluations.** "Light" evaluations run each dataset row, held in a Data table or Google Sheet, through the workflow and write outputs back.
  - Light evaluations are available on all Cloud plans and on self-hosted Registered Community, Business and Enterprise. ([Run quick evaluations](https://docs.n8n.io/build/integrate-ai/test-and-improve-ai-workflows/run-quick-evaluations.md))
  - Metric-based evaluations are available on Cloud Pro and Enterprise and on self-hosted Enterprise. "Registered Community and Starter plan users can also use it for a single workflow." ([Use metrics](https://docs.n8n.io/build/integrate-ai/test-and-improve-ai-workflows/use-metrics-to-measure-quality.md))
  - Built-in metrics: Correctness and Helpfulness (AI-based, 1–5), String Similarity (0–1), Categorization (exact match, 0 or 1), Tools Used (0–1) and custom metrics. ([Use metrics](https://docs.n8n.io/build/integrate-ai/test-and-improve-ai-workflows/use-metrics-to-measure-quality.md))
  - One evaluation trigger per workflow. ([Fix common issues](https://docs.n8n.io/build/integrate-ai/test-and-improve-ai-workflows/fix-common-issues.md))
- **Human review channels for tool calls:** Chat (n8n's built-in chat), Slack, Discord, Telegram, Microsoft Teams, Gmail, WhatsApp Business Cloud, Google Chat and Outlook. Reviewer messages can use `$tool.name` and `$tool.parameters`. ([HITL for tools](https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools.md))
- **Cloud trial:** 14 days with Pro features, a limit of 1,000 executions and Starter compute. The workspace is deleted at expiry. ([Free trial docs](https://docs.n8n.io/deploy/use-n8n-cloud/start-your-free-trial.md)) Registered Community is free self-hosted with extra features after registering an email. ([Choose how to use n8n](https://docs.n8n.io/choose-how-to-use-n8n.md))

**What n8n 3.0 (October 2026) removes or retires** ([v3.0 breaking changes](https://docs.n8n.io/changelog/v30-breaking-changes.md))
- Removed AI nodes: the legacy LangChain Code node, the legacy OpenAI node, OpenAI Assistant and OpenAI Model, the legacy HTTP Request Tool ("Using the HTTP Request node as a tool stays") and SerpApi.
- Also removed: Manual Chat Trigger, Chat Messages Retriever, Motorhead and Zep memory, the Insert/Load-style vector store nodes, and the AI Transform node (auto-migrated to Code).
- AI Agent v1 and its old modes are removed.
- Chat Hub is off by default. The Ask AI tab in the Code node is removed.
- Self-hosted n8n must run on Docker.

### Inferences
- **Untaught features with high value or recent prominence:**
  - Specialised chains: Information Extractor, Text Classifier, Sentiment Analysis and Summarization Chain.
  - Extract from File (PDF) combined with AI, and AI Agent PDF passthrough.
  - Guardrails.
  - Evaluation Trigger and Evaluation node with metrics.
  - Human review for tool calls, and the Chat node's send-and-wait.
  - AI Agent Tool, Call n8n Workflow Tool and Custom Code Tool.
  - Model Selector, the fallback model and Max Iterations or Force Tool Call.
  - Think Tool and the Auto-fixing or Item List output parsers.
  - Postgres, Redis or Mongo memory, rerankers and non-Simple vector stores.
  - OpenAI and Gemini audio transcription and image generation.
  - Data table as an agent tool.
  - Standalone Agents and Message an Agent.
- **Partially taught.** Classification as a concept (04, via AI Agent rather than Text Classifier). Structured output (06, 11). Image understanding (13). MCP (06, 08). In-editor AI building (11). Memory (12, Simple Memory only).
- **Features to avoid as primary concepts in new challenges.** Chat Hub (retired by default in 3.0), SerpApi, the legacy HTTP Request Tool, AI Transform, Motorhead/Zep, LangChain Code (legacy), AI Agent v1 modes, and Ask n8n AI, which "is no longer actively developed" ([Ask n8n AI docs](https://docs.n8n.io/build/ways-of-building-workflows/use-the-ai-assistant.md)).
- **Standalone Agents are the newest and most strategic AI feature (Preview).** Their UI and behaviour may still change, and self-hosted needs a sandbox for some parts. A challenge built on them carries more maintenance and translation churn than one built on the stable AI Agent node.
- **Maintenance side notes for existing challenges:**
  - Challenge 11 says "AI Assistant", but the product is now "n8n Assistant" (2.40). The old docs URL `.../ai-assistant` still redirects to `.../n8n-assistant`; I checked with curl on 2026-10-06.
  - Challenge 08 uses `n8n-nodes-base.httpRequestTool`, which is the HTTP Request node used as a tool. That stays in 3.0; only the legacy LangChain HTTP Request Tool is removed.
  - Challenge 10 uses the single Simple Vector Store node, which also stays.

### Gaps
- Exact AI Agent node versions where "Enable Fallback Model" and "Batch Processing" first appeared. The main AI Agent docs page is skeletal; the evidence is the AI Agent Tool page and a GitHub issue.
- Whether the "guardrail runner in the agent loop" (PR merged 2026-10-01) and the WhatsApp agent channel ship in 2.43 or 3.0.
- The exact amount of free Gateway credit given at Cloud sign-up or trial. The docs only say "a small amount".
- Plan gating for Guardrails, Model Selector, AI Agent Tool and HITL for tools. I found no availability notice on their docs pages, which suggests all plans, but I could not confirm it.

## Key question 2: Which of these generate the most learner interest?

### Takeaway
By sheer volume, the template library is dominated by AI, which is 69% of all templates. The most-viewed AI templates centre on:
- chat agents on WhatsApp or Telegram,
- voice-note assistants,
- web scraping or summarising,
- PDF Q&A and extraction,
- RAG over Drive,
- "chat with your database or data analyst" bots,
- email auto-responders,
- AI video and social content.

On the forum, the most-read 2025–2026 AI announcements were:
- human-in-the-loop for tool calls (about 8.4k views),
- AI Workflow Builder (about 6.6k),
- Chat Hub and n8n Assistant (about 5.8k each),
- building workflows via MCP (about 5.5k).

Evaluations and guardrails have little template demand. n8n itself pushes them heavily in production-readiness content.

### Cited Findings
- **Template library size.** The n8n templates API returns 13,055 templates in total. Category counts: AI 9,038; "AI Summarization, Classification & Evaluation" 3,759; "Multimodal AI" 3,386; "AI Chatbot, Assistant, Agent" 1,412; "AI RAG, MCP & Knowledge Retrieval" 840. ([templates API search](https://api.n8n.io/api/templates/search?page=1&rows=1&category=AI); [categories](https://api.n8n.io/api/templates/categories); queried 2026-10-06)
  - A search-result summary reported 8,002 AI templates out of 11,741 (69%) in August 2026, which is consistent. It apparently comes from [connectsafely.ai](https://connectsafely.ai/articles/n8n-templates-workflow-automation-examples), but the attribution is uncertain.
- **Most-viewed AI templates (lifetime views)** ([templates API sorted by views](https://api.n8n.io/api/templates/search?page=1&rows=50&category=AI&sort=views:desc)):
  1. "AI agent chat", 780k.
  2. "Building Your First WhatsApp Chatbot", 332k.
  3. "Angie, personal AI assistant with Telegram voice and text", 326k.
  4. "Scrape and summarize webpages with AI", 292k.
  5. AI video generation for TikTok/YouTube, 215k.
  6. "AI agent that can scrape webpages", 212k.
  11. "Build Your First AI Data Analyst Chatbot", 134k.
  12. "Ask questions about a PDF using AI", 118k.
  14. "Build Your First AI Agent", 100k.
  15. "Extract text from a PDF file", 96k.
  16. "Chat with PDF docs using AI (quoting sources)", 95k.
  17. "RAG Chatbot for Company Documents using Google Drive and Gemini", 95k.
  25. "Chat with local LLMs using n8n and Ollama", 78k.
  26. "Flux AI Image Generator", 77k.
  27. "Chat with Postgresql Database", 74k.
  31. "AI chatbot that can search the web", 72k.
  42. "Transcribe Audio Files, Summarize with GPT-4, and Store in Notion", 58k.
  44. "Gmail AI Auto-Responder: Create Draft Replies", 55k.
- **Node frequency in the top 200 AI templates by views** (my tally of the API response). OpenAI Chat Model 117, AI Agent 116, HTTP Request 109, Simple Memory 63, Code 60, OpenAI node 59, Structured Output Parser 41, Basic LLM Chain 40, Telegram 39, Call n8n Workflow Tool 26, Gemini Chat Model 26, Gmail 26, Summarization Chain 9, Text Classifier 9, Information Extractor 6, Think Tool 5, Postgres Chat Memory 4, Auto-fixing Output Parser 4, MCP Client Tool 3, Sentiment Analysis 2. ([templates API](https://api.n8n.io/api/templates/search?page=1&rows=50&category=AI&sort=views:desc))
- **Keyword themes in titles across the top 1,200 AI templates by views** (my tally; one template can match several themes). ([templates API](https://api.n8n.io/api/templates/search?page=1&rows=50&category=AI&sort=views:desc))
  - Email triage/reply: 153 templates, 1.14M views.
  - SQL, database or Sheets chat: 140 templates, 1.17M views.
  - Telegram: 122 templates, 1.59M views.
  - RAG or docs: 96 templates, 1.20M views.
  - Voice or transcription: 93 templates, 1.49M views.
  - Image generation: 91 templates, 0.80M views.
  - Video generation: 90 templates, 1.26M views.
  - Invoice, receipt or PDF extraction: 89 templates, 1.20M views.
  - Scraping: 47 templates, 0.94M views.
  - MCP: 47 templates, 0.30M views.
  - WhatsApp: 36 templates, 0.79M views.
  - Human approval: 30 templates, 0.24M views.
  - Multi-agent: 20 templates, 0.11M views.
  - Evaluation: 6 templates, 68k views.
  - Guardrails or PII: 1 template.
- **Most-read AI announcements on the forum** (views as of 2026-10-06):
  - [New human-in-the-loop capabilities](https://community.n8n.io/t/new-human-in-the-loop-capabilities-add-fine-grained-control/258423), 2026-01-30, 8,419.
  - [Introducing AI Workflow Builder (Beta)](https://community.n8n.io/t/introducing-ai-workflow-builder-beta/204919), 2025-10-13, 6,570.
  - [Announcing Chat Hub Beta](https://community.n8n.io/t/announcing-chat-hub-beta/236446), 2025-12-15, 5,774.
  - [Introducing the AI Assistant](https://community.n8n.io/t/introducing-the-ai-assistant-the-workflow-building-agent-inside-n8n/302667), 2026-07-09, 5,768.
  - [Create workflows via MCP](https://community.n8n.io/t/create-workflows-via-mcp/280856), 2026-03-24, 5,480.
  - [Your entire n8n instance is now MCP-ready](https://community.n8n.io/t/your-entire-n8n-instance-is-now-mcp-ready/227273), 4,570.
  - [Instance-level MCP access (Beta)](https://community.n8n.io/t/introducing-instance-level-mcp-access-in-n8n-beta/223178), 4,159.
  - Community-built AI topics also drew large audiences: [Claude Code integration for n8n](https://community.n8n.io/t/claude-code-integration-for-n8n/244183) had 9,783 views and [Local OCR with Ollama for scanned PDFs](https://community.n8n.io/t/local-ocr-in-n8n-with-ollama-how-to-extract-text-from-scanned-pdfs-without-external-services/287785) had 2,001. ([community top topics](https://community.n8n.io/top.json?period=yearly))
- **Real business demand in forum hiring posts.** Examples include [AI email classification with Gmail, Sheets and Slack](https://community.n8n.io/t/freelancer-n8n-automation-expert-gmail-google-sheets-slack-ai-email-classification/289856), [voice AI specialists](https://community.n8n.io/t/job-title-ai-automation-engineer-n8n-voice-ai-specialist/282569), [an RFQ-to-quote document prototype](https://community.n8n.io/t/seeking-estimates-n8n-developer-for-a-small-rfq-to-quote-prototype/312281) with 4,920 views and 363 replies, and multi-agent lead generation. ([community top topics](https://community.n8n.io/top.json?period=yearly))
- **n8n's own blog production-readiness content.** It includes "Production AI Playbook: Human Oversight" ([blog](https://blog.n8n.io/production-ai-playbook-human-oversight/)), "AI Agent Governance" ([blog](https://blog.n8n.io/ai-agent-governance/)) and "How to evaluate the performance of AI agents?" ([blog](https://blog.n8n.io/how-to-evaluate-the-performance-of-ai-agents/)). These come from search results; I did not read the full text.
- **n8n Academy.** n8n launched the official [n8n Academy](https://community.n8n.io/t/the-n8n-academy-is-here/299695) on 2026-06-16. Its courses use "Practice APIs (no external accounts needed for most courses)" and award badges and certificates. ([Learning paths](https://docs.n8n.io/learning-paths.md))

### Inferences
- **Strongest combined signals.** Templates, forum and hiring posts all point to:
  - voice-note assistants,
  - document/PDF extraction,
  - "talk to your data" (database or spreadsheet chat),
  - email triage with drafted replies,
  - human approval and escalation,
  - WhatsApp or Telegram agents.
- **What the existing set already covers.** It covers Telegram agents (08, 13), RAG over Drive (10), first-agent basics (12) and MCP (06, 08), so those demand peaks are partly served.
- **Video and social-content generation is popular but a poor fit.** It is expensive, non-deterministic and hard to verify objectively.
- **Evaluations and guardrails have low template interest but high teaching value.** They match the site's own blog topics: AI agent testing, security and production readiness, and human-reviewed AI support workflows. They are also differentiators against generic template tutorials.
- **The n8n Academy is now a direct official alternative for structured courses.** That makes the site's niche (short, real-world, objectively verifiable challenges) more important. Covering post-2025 features like evaluations, guardrails and HITL early helps differentiate it.

### Gaps
- I gathered no YouTube view data for n8n's official channel, and no comparison of search volume for terms such as "n8n guardrails" against "n8n multi agent".
- Template "totalViews" are lifetime counts and favour older templates. Only 3 templates created in 2026 appear in the top 1,200 by views, so the data under-represents recent trends such as MCP, evaluations and Agents.
- The forum's yearly "top" list is not sorted purely by views.
- An aggregator claim that multi-agent templates "doubled in the past two months and now make up nearly a quarter of the AI category" ([aitechboss.com](https://www.aitechboss.com/best-n8n-ai-workflows-2026/)) could not be verified. My title-keyword tally found far fewer.
- The [n8n Academy course list](https://learn.n8n.io/courses) is JavaScript-rendered, so I could not check which AI topics it already covers.

## Key question 3: Which AI patterns are most demanded in real business use and still untaught?

### Takeaway
Seven high-demand patterns are untaught. In priority order:
1. PDF/invoice extraction into structured data.
2. Voice-note transcription.
3. "Talk to your data" agents.
4. Human approval and escalation for agent actions, which also covers email triage with drafted replies.
5. Evaluation and regression testing of prompts.
6. Multi-agent orchestration and sub-workflows as tools.
7. PII redaction and prompt-injection defence.

Three more are untaught but less suitable: AI web scraping (backlog, and overlaps challenge 07), image generation (cost and verification problems) and model routing/cost control (niche demand, high production value).

### Cited Findings
- **Document/invoice extraction.**
  - Extract from File has an "Extract From PDF" operation ([Extract from File docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile.md)). Information Extractor turns text into a schema-defined structure ([Information Extractor docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.information-extractor.md)).
  - The AI Agent can pass binary PDFs straight to native-PDF models (2.28) ([Release notes](https://docs.n8n.io/changelog/release-notes.md)), and the Gemini node has "Analyze Document" ([Gemini node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.googlegemini.md)).
  - Gateway credits include LlamaParse and PDF.co ([Changelog](https://docs.n8n.io/changelog/readme.md)).
  - Demand: 89 invoice/receipt/PDF templates with 1.2M views ([templates API](https://api.n8n.io/api/templates/search?page=1&rows=50&category=AI&sort=views:desc)), plus [a forum thread about invoice-analysing agents hitting max iterations](https://community.n8n.io/t/analyzing-invoices-runs-into-agent-stopped-due-max-iterations/150358).
- **Email triage with draft replies.** "Gmail AI Auto-Responder: Create Draft Replies" has 55k views ([templates API](https://api.n8n.io/api/templates/search?page=1&rows=50&category=AI&sort=views:desc)). There are hiring posts for AI email classification ([forum](https://community.n8n.io/t/freelancer-n8n-automation-expert-gmail-google-sheets-slack-ai-email-classification/289856)). Text Classifier and Sentiment Analysis nodes exist ([Text Classifier](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.text-classifier.md); [Sentiment Analysis](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.sentimentanalysis.md)). Gmail and Outlook are human-review channels ([HITL for tools](https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools.md)).
- **Voice-note transcription.**
  - The OpenAI node can transcribe ogg, mp3, m4a, wav, webm and other formats ([OpenAI audio operations](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations.md)). The Gemini node can too ([Gemini node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.googlegemini.md)). Groq's free plan includes whisper-large-v3 with 7.2K audio-seconds per hour ([Groq rate limits](https://console.groq.com/docs/rate-limits)).
  - Demand: 93 voice templates with 1.49M views, and the third most-viewed AI template is a Telegram voice assistant ([templates API](https://api.n8n.io/api/templates/search?page=1&rows=50&category=AI&sort=views:desc)).
- **Support bots with human escalation.** The docs have a page on [setting a human fallback for AI workflows](https://docs.n8n.io/build/integrate-ai/ai-examples/set-a-human-fallback-for-ai-workflows.md). The Chat node's "Send and Wait for Response" offers Approval buttons and free text ([Chat node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chat.md)). The tool-level HITL announcement is the most-viewed 2026 AI announcement ([forum](https://community.n8n.io/t/new-human-in-the-loop-capabilities-add-fine-grained-control/258423)).
- **Multi-agent research and sub-workflows as tools.**
  - The AI Agent Tool lets a primary agent delegate to specialist agents in one execution ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md)). Call n8n Workflow Tool exposes sub-workflows ([Call n8n Workflow Tool docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md)).
  - Standalone Agents offer sub-agents and workflow tools ([Build and manage agents](https://docs.n8n.io/build/build-and-manage-agents.md)).
  - Call n8n Workflow Tool appears in 26 of the top 200 AI templates ([templates API](https://api.n8n.io/api/templates/search?page=1&rows=50&category=AI&sort=views:desc)).
- **SQL and "talk to your data."** The SQL Agent mode is removed in 3.0, and docs advise using "a Postgres/MySQL tool sub-node with a recent Agent node instead" ([AI Agent docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent.md)). The Data table node is usable as a tool ([source](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/DataTable/DataTable.node.ts)). Demand: data-analyst chatbot (134k views) and Postgres chat (74k) ([templates API](https://api.n8n.io/api/templates/search?page=1&rows=50&category=AI&sort=views:desc)).
- **AI web scraping.** Scraping templates rank 4th and 6th by views. Firecrawl is available through Gateway credits ([Changelog](https://docs.n8n.io/changelog/readme.md)).
- **Image generation.** OpenAI Generate/Edit Image ([OpenAI image operations](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/image-operations.md)) and Gemini Generate/Edit Image ([Gemini node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.googlegemini.md)). The Flux image generator template has 77k views.
- **PII redaction and prompt-injection defence.** Guardrails Sanitize Text (PII, secret keys, URLs, custom regex) and Check Text for Violations (Jailbreak, Topical Alignment and others) ([Guardrails](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.guardrails.md)). Gemini's terms say "Do not submit sensitive, confidential, or personal information to the Unpaid Services" ([Gemini API terms](https://ai.google.dev/gemini-api/terms)).
- **Evaluation and regression testing.** Evaluations run a dataset through the workflow and score metrics, and can be used "before and after a prompt change" ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md); [Use metrics](https://docs.n8n.io/build/integrate-ai/test-and-improve-ai-workflows/use-metrics-to-measure-quality.md)).
- **Model routing and cost control.** Model Selector ([docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.modelselector.md)), fallback model ([AI Agent Tool docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolaiagent.md)), OpenRouter provider routing (2.36), Anthropic prompt caching (2.37) ([Release notes](https://docs.n8n.io/changelog/release-notes.md)), and Gateway spend "by model and workflow" ([Gateway credits](https://docs.n8n.io/deploy/use-n8n-cloud/gateway-credits.md)).

### Inferences
- **Mapping to existing challenges and the backlog:**
  - Customer email triage is in the backlog and overlaps with 04's classify-and-route concept. Its untaught core is the human-approved draft reply, which is better taught through HITL.
  - The Firecrawl summariser is in the backlog and overlaps with 07.
  - Talking to Google Sheets through WhatsApp is in the backlog. A Data table variant removes Google OAuth and WhatsApp Business friction.
  - The Valencia AI trip planner is in the backlog and is a natural vehicle for multi-agent orchestration.
- **Patterns with no coverage and no backlog entry:** PDF extraction, voice notes, evaluations, guardrails/PII, tool-call approval and model routing.

### Gaps
- No quantitative market survey of business AI use cases in n8n specifically, beyond templates and forum signals.
- I could not verify that Telegram voice notes (OGG/Opus) are accepted by Gemini "Transcribe a Recording". OpenAI's list includes `.ogg`. This must be tested with a real voice note when authoring.

## Key question 4: Which free or very cheap model providers work for learners now, and which free models support tool calling, vision and structured output?

### Takeaway
There are four zero-card paths in October 2026:
1. **OpenRouter free models.** 20 RPM and 50 requests per day, rising to 1,000 per day after a lifetime $10 purchase. Tight for agent or evaluation challenges.
2. **Google Gemini API free tier.** No card, Flash and Flash-Lite plus Gemma 4. Learners must be 18 or older. Limits are shown only in AI Studio. In the EEA, the paid-tier data terms apply even on the free tier.
3. **Groq free plan.** gpt-oss-120b/20b and qwen3.8-27b at 30 RPM and 1K RPD, but only 8K tokens per minute, plus Whisper at 2K RPD.
4. **n8n Cloud trial Gateway credits.** No provider account needed; the amount is unpublished and cannot be topped up during the trial.

Two further options:
- **Ollama on self-hosted:** free but weakest at tool calling.
- **Cheap paid models on OpenRouter:** gpt-4o-mini at $0.15 in and $0.60 out per million tokens, or Gemini 2.5 Flash-Lite at $0.10 and $0.40. These keep most challenges under 5 US cents per learner.

### Cited Findings
- **OpenRouter free-model limits.** Free variants (`:free`) allow 20 requests per minute and 50 per day. After at least $10 of credits purchased (all time), the limit is 1,000 per day. A negative balance can cause 402 errors "including for free models". ([OpenRouter limits](https://openrouter.ai/docs/api-reference/limits))
  - An aggregator claims "Failed attempts count toward that daily cap" ([ampm-aiops.com](https://ampm-aiops.com/en/guides/openrouter-free-models-daily-limit-guide-2026/)). The official page does not state this, so it is unverified.
- **OpenRouter free models with capabilities as of 2026-10-06.** The public models API lists 466 models, 20 of them free. Capability flags are from the API's `supported_parameters` and `input_modalities`. ([OpenRouter models API](https://openrouter.ai/api/v1/models))
  - `openrouter/free` is a router that "selects free models at random" and is flagged for tools, structured outputs and image input.
  - `google/gemma-4-31b-it:free` and `google/gemma-4-26b-a4b-it:free` support tools, JSON mode and image input. Structured outputs are not flagged.
  - `nvidia/nemotron-3-super-120b-a12b:free` supports tools and structured outputs.
  - `dots-studio/dots-3-note-preview:free` supports tools, structured outputs and images.
  - `liquid/lfm-2.5-2.6b:free` and `apodex/apodex-1.1-mini:free` support tools and structured outputs.
  - `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free` and `thinkingmachines/inkling:free` support tools, images and audio input.
  - Several others are tools-only: nemotron-3-ultra, nemotron-3.5-lightning, poolside laguna and cohere north-mini-code.
- **Cheap paid prices on OpenRouter** (per 1M input/output tokens; [OpenRouter models API](https://openrouter.ai/api/v1/models)): openai/gpt-4o-mini $0.15/$0.60; google/gemini-2.5-flash-lite $0.10/$0.40; google/gemini-2.5-flash $0.30/$2.50; openai/gpt-5-nano $0.05/$0.40.
- **Gemini API free tier.**
  - Free tier ("Free of charge") is listed for Gemini 3.8, 3.7, 3.6 and 3.5 Flash; 3.5 and 3.1 Flash-Lite; 2.5 Flash and Flash-Lite; Flash TTS and Live models; and Gemma 4. Free-tier content is "used to improve our products". Page updated 2026-10-06. ([Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing))
  - Conflict: the pricing summary also listed 2.5 Pro and 3.1 Pro Preview as free tier, while a secondary source says "Since April 1, 2026, Pro models are no longer available on the free tier" ([aggregator](https://www.scriptbyai.com/gemini-api-free-tier-limits/)). This needs checking in AI Studio.
  - Rate limits "can be viewed in Google AI Studio" and are not published as fixed numbers. Page last updated 2026-09-02. ([Gemini rate limits](https://ai.google.dev/gemini-api/docs/rate-limits))
  - Aggregator figures conflict, for example 2.5 Flash at 10 RPM with 250 or 500 RPD. ([tinkerllm.com](https://tinkerllm.com/blog/gemini-api-free-tier-limits-rate-quotas/); [scriptbyai.com](https://www.scriptbyai.com/gemini-api-free-tier-limits/))
- **Gemini terms (modified 2026-03-23)** ([Gemini API terms](https://ai.google.dev/gemini-api/terms)):
  - "You must be 18 years of age or older to use the APIs."
  - In the EEA, Switzerland and the UK, the Paid Services data-use terms "apply to all Services, including ... unpaid quota".
  - Elsewhere, free-tier inputs may be human-reviewed and used for product improvement.
- **Groq free plan** (from the first, "Free Plan Limits" tab of the official page; [Groq rate limits](https://console.groq.com/docs/rate-limits)):
  - openai/gpt-oss-120b and gpt-oss-20b: 30 RPM, 1K RPD, 8K TPM, 200K TPD.
  - qwen/qwen3.8-27b: same limits.
  - whisper-large-v3 and whisper-large-v3-turbo: 20 RPM, 2K RPD, 7.2K audio-seconds per hour, 28.8K per day.
  - Limits apply per organisation. Llama 3.x models no longer appear in the table.
  - A search-result summary of secondary Groq pricing guides says the free tier needs no credit card ([cloudzero.com](https://www.cloudzero.com/blog/groq-pricing/)). This is not confirmed on Groq's own page.
  - n8n has a Groq Chat Model node ([docs sitemap](https://docs.n8n.io/sitemap.md)).
- **Mistral free "Experiment" tier.** Secondary sources only: phone verification, no card, about 1 request per second and 1B tokens per month per model, and opt-in to data training. ([apistatuscheck.com](https://apistatuscheck.com/blog/mistral-api-free-tier-limits); [yangmao.ai](https://yangmao.ai/en/deals/mistral-la-plateforme-free-tier/)) The official Mistral tier page URL I tried returned 404.
- **n8n Cloud.**
  - Trials include Gateway credits (OpenAI, Anthropic, Gemini, Qwen, MiniMax and Kimi models). Topping up requires a paid plan. ([Gateway credits](https://docs.n8n.io/deploy/use-n8n-cloud/gateway-credits.md); [forum announcement](https://community.n8n.io/t/310859))
  - The legacy free OpenAI credits remain only on instances without Gateway credits. ([Gateway credits](https://docs.n8n.io/deploy/use-n8n-cloud/gateway-credits.md))
  - Before publishing, n8n warns about workflows that use AI-gateway credentials (2.18.5). ([Release notes](https://docs.n8n.io/changelog/release-notes.md))
- **Ollama on self-hosted.**
  - n8n's Self-hosted AI Starter Kit bundles n8n, Ollama, Qdrant and Postgres via Docker Compose ([DataCamp tutorial](https://www.datacamp.com/tutorial/local-ai); [n8n docs entry](https://docs.n8n.io/deploy/host-n8n/deploy-with-the-ai-starter-kit.md)). The repo is active: last push 2026-07-23, 15.3k stars ([GitHub repo](https://github.com/n8n-io/self-hosted-ai-starter-kit)).
  - n8n added "Force Tool Call on First Iteration" because small models such as those on Ollama "reply in prose and skip wired tools" ([PR #38342](https://github.com/n8n-io/n8n/pull/38342)).
- **Structured-output reliability.** n8n's docs warn "Structured output parsing is often not reliable when working with agents" and recommend a separate LLM chain to parse agent output ([Structured Output Parser common issues](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues.md)). Forum threads report "Model output doesn't fit required format" errors that vary by provider ([forum thread](https://community.n8n.io/t/model-output-doesnt-fit-required-format/301516); [GitHub issue #21174](https://github.com/n8n-io/n8n/issues/21174)).

### Inferences
- **Recommended default model guidance for new challenges:**
  - **Primary:** Gemini free tier through the Google Gemini Chat Model or Google Gemini node. No card is needed, and in the EEA (Valencia) the paid data terms apply. Caveats: the 18+ rule, and the need to confirm limits in AI Studio.
  - **Alternative:** OpenRouter, to stay consistent with challenges 04, 08, 12 and 13. Suggest a specific free model with tools support rather than `openrouter/free`, because the random router breaks reproducibility. Warn that 50 requests per day can run out in agent or evaluation challenges.
  - **On Cloud:** "Gateway credits if available".
  - **Self-hosted:** Ollama as a bonus path only.
- **Rough request budgets** (estimates, not measured):
  - Agent challenges with tools use about 3–8 model calls per user turn. Ten test turns therefore take 30–80 requests, close to or above OpenRouter's 50 per day.
  - Evaluation runs over a 10–12-row dataset take 12–25 requests per run.
  - Groq's 8K tokens per minute will throttle agent loops with long contexts.
- **Per-learner cost on cheap paid models** (inference, using OpenRouter list prices): cost ≈ input tokens × $0.15/1M + output tokens × $0.60/1M for gpt-4o-mini.
  - A challenge using about 100k input and 15k output tokens costs about $0.024.
  - Most seeds below fall between $0.005 and $0.06.
- **Free models flagged for both tools and structured outputs are the safest choices.** Examples are nemotron-3-super, dots-3-note and lfm-2.5. Gemma 4 is flagged for tools and images but not structured outputs. Capability flags are not reliability guarantees, so each challenge should be smoke-tested with the recommended free model before publishing.

### Gaps
- Official Gemini free-tier RPM and RPD per model (shown only inside AI Studio).
- Official Mistral free-tier terms (the 404 page).
- Whether Groq audio transcription can be called from n8n's OpenAI node with a custom base URL. If not, an HTTP Request node is needed. Not verified.
- No first-hand test of tool-calling reliability for each free model.

## Key question 5: Which common failure modes do learners hit with AI agents in n8n, and which could a challenge deliberately teach?

### Takeaway
The most common documented failures are listed below. Each is reproducible with a seeded fixture, so a "fix the broken agent" challenge or deliberate bonus traps could teach them objectively.
1. The agent never calls a tool.
2. The agent claims an action it never took, often influenced by memory.
3. Structured-output parse errors, especially when the parser is attached to an agent.
4. Memory session-key mistakes, such as "No sessionId", shared memory across nodes, and Chat Trigger load-session errors.
5. Max-iteration loops.
6. Null or absent prompts.
7. Sub-node expressions resolving only to the first item.
8. Rate limits and context limits.

### Cited Findings
- **Tool never called.** Causes include an unnecessary-seeming tool, an unclear tool description, schema mismatch, an unclear system prompt, memory influence and tool failure. Debug with a minimal Chat Trigger → AI Agent → Chat Model plus one tool (Calculator) and an explicit "MUST use the tool" instruction, then inspect the execution. ([forum tip](https://community.n8n.io/t/how-to-debug-an-n8n-ai-agent-that-doesnt-call-its-tools/308788)) n8n added "Force Tool Call on First Iteration" for models that skip tools. ([PR #38342](https://github.com/n8n-io/n8n/pull/38342))
- **Hallucinated actions or inputs.**
  - A forum report describes agents that, after seeing past successes in memory, "respond as if it has performed an action" without calling the tool ([forum search result](https://community.n8n.io/t/ai-agent-not-calling-communicating-with-tools/65460); based on a search summary, not read in full).
  - `$fromAI()` keys are "hints" that the model fills from context. In chats it may ask the user if it cannot find a value. ([$fromAI docs](https://docs.n8n.io/build/integrate-ai/ai-examples/use-ai-for-parameters.md))
  - Human review shows reviewers `$tool.parameters` before execution. ([HITL for tools](https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools.md))
- **Structured-output errors.** The parser "structures the final output from AI agents"; it is "not intended to structure intermediary output". It is "often not reliable when working with agents", so n8n recommends a separate LLM chain. ([Structured Output Parser common issues](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues.md)) Text Classifier and Sentiment Analysis have an "Enable Auto-Fixing" option. ([Text Classifier](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.text-classifier.md))
- **Memory session keys.**
  - "No sessionId" appears when not using the On Chat Message trigger; a static key is only for testing. Multiple Simple Memory nodes "access the same memory instance by default". ([Simple Memory common issues](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/common-issues.md))
  - Chat Trigger "Load Previous Session: From Memory" needs the same memory node attached to both the trigger and the agent. Otherwise it fails with "workflow could not be started!". ([Chat Trigger common issues](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/common-issues.md))
  - A forum thread titled "Unable to start workflow with the chat trigger node" had 4,874 views in 2026. ([forum](https://community.n8n.io/t/unable-to-start-workflow-with-the-chat-trigger-node-in-n8n-web-gui/272919))
- **Max iterations and looping.** Max Iterations defaults to 10 ([Tools Agent docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent.md)). Users report "Agent stopped due to max iterations", including in invoice analysis ([forum](https://community.n8n.io/t/analyzing-invoices-runs-into-agent-stopped-due-max-iterations/150358); [GitHub issue #18892](https://github.com/n8n-io/n8n/issues/18892)). There is also a feature request to handle the condition better for end users ([forum](https://community.n8n.io/t/ai-agent-improve-max-iteration-handling-to-prevent-confusing-user-messages/220526)).
- **Null or absent prompt.** "400 Invalid value for 'content': expected a string, got null" occurs when the prompt expression resolves to null. "No prompt specified" means switching Prompt to "Define below". Old Simple Memory versions cause "Error in sub-node Simple Memory". ([AI Agent common issues](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/common-issues.md))
- **Sub-node item resolution.** "In sub-nodes, the expression always resolves to the first item." ([Model Selector docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.modelselector.md); [Structured Output Parser common issues](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues.md))
- **Evaluation pitfalls.** An Evaluation "Set outputs" node can break the chat response. Combining two triggers needs a merge through a No-op node. Tool usage must be read via "Return intermediate steps". Results vary between runs, so duplicate rows to smooth them. ([Fix common issues](https://docs.n8n.io/build/integrate-ai/test-and-improve-ai-workflows/fix-common-issues.md))
- **Rate limits.** OpenRouter free tier is 20 RPM and 50 per day ([OpenRouter limits](https://openrouter.ai/docs/api-reference/limits)). Higher evaluation concurrency "increases the chance of hitting upstream LLM rate limits" ([Use metrics](https://docs.n8n.io/build/integrate-ai/test-and-improve-ai-workflows/use-metrics-to-measure-quality.md)).
- **Context-length errors.** AI Transform used to retry "maximum context length" errors with smaller payloads ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md)). The Summarization Chain's Map Reduce method handles long inputs in chunks ([Summarization Chain](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainsummarization.md)).

### Inferences
- **The best failure modes to teach deliberately are those with an objective observable:**
  - Tool never called: the execution log shows no tool run.
  - Session-key bug: two chats share memory.
  - Parse error: a red node.
  - Max iterations: an error message.
- **Each seed below names one deliberate failure mode.** A dedicated "Fix the Broken Agent" challenge (seed 8) bundles three of them into a provided broken workflow, a format the existing set does not yet have.
- **The site's own blog targets "AI agent testing".** A debugging-style challenge and an evaluation challenge would interlink well with those articles.

### Gaps
- No quantified frequency of each failure mode, such as forum thread counts per error string. These rankings are qualitative.

## Key question 6: Ranked gaps and concrete challenge seeds

### Takeaway
Recommended order, by learning value times demand, adjusted for the owner's criteria:
1. PDF invoice extraction.
2. Human approval for agent actions.
3. Evaluations.
4. Voice notes.
5. Talk to your data.
6. Multi-agent team.
7. Guardrails and PII.
8. Fix the broken agent.
9. Model routing and fallback.

Watch list: standalone n8n Agents, still in Preview. Low priority: image generation, and the AI scraping summariser (already in the backlog, overlaps 07). Seeds 1–4 and 7–8 need no new third-party service beyond a model provider, and some only reuse a Telegram bot.

### Cited Findings
- Built-in pieces that make low-friction, objective challenges possible:
  - Data tables (50 MB on Cloud, CSV import) ([Release notes 1.x](https://docs.n8n.io/changelog/release-notes-1.x.md)) and the Data table node usable as a tool ([source](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/DataTable/DataTable.node.ts)).
  - Evaluations using Data tables as datasets ([Run quick evaluations](https://docs.n8n.io/build/integrate-ai/test-and-improve-ai-workflows/run-quick-evaluations.md)).
  - The n8n Chat interface as a human-review channel ([HITL for tools](https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools.md)).
  - Guardrails Sanitize Text, which needs no LLM for PII, regex, URL or secret checks ([Guardrails](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.guardrails.md)).
  - Extract From PDF ([Extract from File](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile.md)).
- **Plan gating relevant to the seeds:**
  - Metric evaluations: Cloud Pro, including the trial's Pro features, or a single workflow on Starter and Registered Community ([Use metrics](https://docs.n8n.io/build/integrate-ai/test-and-improve-ai-workflows/use-metrics-to-measure-quality.md); [Free trial](https://docs.n8n.io/deploy/use-n8n-cloud/start-your-free-trial.md)).
  - Standalone Agents: all plans, with self-hosted setup from 2.32.3 ([Build and manage agents](https://docs.n8n.io/build/build-and-manage-agents.md)).
  - Gateway credits: Cloud Starter, Pro and trials only ([Gateway credits](https://docs.n8n.io/deploy/use-n8n-cloud/gateway-credits.md)).
- Prices used in the estimates come from the [OpenRouter models API](https://openrouter.ai/api/v1/models) as of 2026-10-06: gpt-4o-mini $0.15/$0.60 per 1M tokens and gemini-2.5-flash-lite $0.10/$0.40.

### Inferences

#### Ranking table (scores 1–5 are my judgement; evidence in key questions 1–5)

| Rank | Gap (primary concept) | Learning value | Demand | Signup friction | Objective verification | Overlap with existing or backlog |
|---|---|---|---|---|---|---|
| 1 | Document/PDF extraction to structured data (Information Extractor) | 5 | 5 | Low: model only, fixtures in repo | Strong: exact field values | None |
| 2 | Human approval of agent tool calls (HITL) | 5 | 4 | Low: n8n Chat as review channel | Strong: Data table row changes only on Approve | Low; refines backlog email triage |
| 3 | Evaluations and regression testing | 5 | 3 | Low: Data table dataset | Strong: metric score in Evaluations tab | Low (re-uses classification idea from 04) |
| 4 | Voice-note transcription | 4 | 5 | Medium: Telegram bot and audio-capable model | Medium–strong: keyword or date checks on fixture audio | Low–medium (Telegram as in 02, 08, 13) |
| 5 | Talk to your data (Data table as agent tool) | 4 | 5 | Low | Strong: exact numbers from fixture CSV | Medium; refines backlog Sheets/WhatsApp idea |
| 6 | Multi-agent orchestration (AI Agent Tool, sub-workflow tool) | 5 | 4 | Low–medium: free weather API, fixture events | Medium: execution shows each specialist called | Medium; refines backlog trip planner |
| 7 | Guardrails: PII redaction and prompt-injection defence | 4 | 3 | Low | Strong: placeholders and Fail branch | Low (scenario may echo 04) |
| 8 | Fix the Broken Agent (failure modes) | 5 | 3 | Low | Strong: three scripted tests pass | None (new format) |
| 9 | Model routing, fallback and cost (Model Selector, fallback model, token usage) | 4 | 2 | Medium: two models | Medium–strong: execution shows routed model | None |
| Watch | Standalone n8n Agents (Preview) | 4 | 4 (newest feature) | Medium: Preview, self-hosted setup | Medium | Overlaps 12 conceptually |
| Low | Image generation | 2 | 3 | Medium–high: paid models | Weak: subjective output | Overlaps 06 bonus |
| Low | AI web-scraping summariser | 3 | 4 | Medium | Medium | Backlog and 07 |

#### Seed 1: "Read the Supplier Invoices" (new; rank 1)

**Scenario.** A Valencia horchatería receives supplier invoices as PDFs. The owner wants each invoice's key figures saved automatically and any invoice whose numbers do not add up flagged before payment.

**Primary concept.** Turning unstructured documents into validated structured data with the Information Extractor.

**Nodes.**
- Core: Form Trigger (file upload) or Manual Trigger with HTTP Request to fixture URLs, Extract from File (Extract From PDF), Information Extractor, a chat model (Google Gemini Chat Model or OpenRouter Chat Model), IF or Filter, Data table.
- Bonus: AI Agent with "Automatically Passthrough Binary PDFs" and a native-PDF model such as Gemini, or the Google Gemini node's Analyze Document, for a scanned invoice.

**Level and time.** Intermediate, 3 stars, 35–50 min.

**Model and cost.** Gemini free tier: $0. On OpenRouter gpt-4o-mini, about 24 calls × (2k in + 300 out) ≈ 48k in + 7k out ≈ $0.012.

**Objective verification.**
1. Five fixture PDFs, Spanish "Factura" with NIF and IVA 10% or 21%, produce Data table rows. Each row has exactly the published invoice number, date (ISO), net, VAT and total.
2. The fixture with a deliberate arithmetic error (net + VAT ≠ total) is flagged `needs_review = true`, and only that one.
3. Re-running the same file does not create a duplicate row, keyed on invoice number.

**Bonus.** The scanned (image-only) invoice is extracted via PDF passthrough, with the same exactness check.

**Deliberate failure mode.** Extract From PDF returns empty text for the scanned file. The learner must detect this and route it to the vision path. Optional second trap: a sub-node expression that resolves only to the first item.

**Risks.** Information Extractor accuracy with free models on decimals and comma separators ("1.234,56 €"). Tip: ask for numbers as plain decimals.

#### Seed 2: "Approve Before the Agent Acts" (new; refines backlog email triage and support-escalation ideas; rank 2)

**Scenario.** "Turia Bikes", a fictional Valencia rental shop, has a chat assistant that can look up bookings and cancel them. A staff member must approve every cancellation before it happens.

**Primary concept.** Tool-level human-in-the-loop: gating sensitive agent tools behind approval.

**Nodes.**
- Core: Chat Trigger, AI Agent, chat model, Data table as a read tool, Data table as an update tool behind a "human review" step using the Chat channel, Simple Memory.
- Bonus: Telegram as the approval channel, with Approve Within Chat.

**Level and time.** Intermediate, 3 stars, 30–45 min.

**Model and cost.** Gemini free tier recommended for request headroom. gpt-4o-mini: about 15 turns × 3 calls × (2.5k in + 200 out) ≈ $0.02.

**Objective verification.**
1. "What is the status of booking TB-1042?" answers from the table with no approval request. The execution shows the read tool ran.
2. "Cancel TB-1042" pauses with an approval request that shows the tool name and booking ID (`$tool.parameters`). After Deny, the row is unchanged and the agent says it could not cancel.
3. After Approve, the row's status becomes `cancelled` and the agent confirms.

**Deliberate failure mode.** Without the system prompt explaining denials, the agent claims success after a Deny. The learner fixes this as the docs advise ([HITL for tools](https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools.md)).

**Risks.** Exact UI steps for the "human review" step, and whether the Chat channel needs the Chat Trigger response mode "Using Response Nodes". Verify on 2.42 before writing tips.

#### Seed 3: "Test Your AI Before You Trust It" (new; rank 3)

**Scenario.** A Valencia restaurant group auto-sorts customer reviews into food, service, price or cleanliness. Before switching it on, the manager wants proof that it is accurate on known examples, and evidence that a prompt change improved it.

**Primary concept.** Evaluations: dataset-driven regression testing with metrics.

**Nodes.**
- Core: Evaluation Trigger reading a Data table dataset of 12 labelled reviews in English, Spanish and Valencian; Text Classifier with a chat model; Evaluation (Set Outputs); Evaluation (Set Metrics, Categorization); optionally Evaluation (Check If Evaluating) and a No-op.
- Bonus: Sentiment Analysis with a second custom metric, or Correctness (AI-based) for a drafted reply.

**Level and time.** Advanced, 4 stars, 40–60 min.

**Model and cost.** Gemini Flash-Lite free tier or Groq gpt-oss-20b free. On gpt-4o-mini, 4 runs × 12 rows × (600 in + 50 out) ≈ $0.006. With LLM-as-judge in the bonus, about $0.02. OpenRouter's free 50 requests per day are enough for about 3 runs only.

**Objective verification.**
1. The Evaluations tab shows at least two completed runs.
2. The latest run's Categorization average is at least 0.9, meaning at least 11 of 12 correct.
3. The dataset's output column is filled for every row, and the production path (a Chat or Form trigger) still works without the evaluation nodes firing.

**Bonus.** Add a second metric and show it in the run summary.

**Deliberate failure mode.** A baseline prompt with vague category descriptions misroutes the "price" reviews. Improving the descriptions raises the score, which teaches prompt iteration with evidence.

**Plan note.** Light evaluation works on all Cloud plans and Registered Community. Metrics work on the Cloud trial (Pro features), on Starter for one workflow, and on Registered Community for one workflow.

#### Seed 4: "Voice Notes to To-Dos" (new; rank 4)

**Scenario.** A stallholder at Valencia's Mercado Central dictates Telegram voice notes while working. The bot replies with a short transcript summary and a checklist of tasks with any dates mentioned.

**Primary concept.** Audio as AI input: transcription followed by structured extraction.

**Nodes.**
- Core: Telegram Trigger (download files), IF (voice or text), Google Gemini node "Transcribe a Recording" (or OpenAI node "Transcribe a Recording"), Basic LLM Chain with Structured Output Parser (or Information Extractor), Telegram.
- Bonus: Simple Memory keyed on the Telegram chat ID, so follow-ups like "move the rice order to Monday" work per user.

**Level and time.** Beginner to intermediate, 2–3 stars, 25–35 min.

**Model and cost.** Gemini free tier: $0. Groq whisper-large-v3 free plan via HTTP Request is an alternative. LLM step on gpt-4o-mini under $0.01.

**Objective verification.** Three fixture audio files are hosted in the repo with published scripts; the learner forwards them or records the script.
1. Each voice note gets one reply in the same chat.
2. For fixture A, the checklist contains exactly three tasks, including "order 20 kg of rice" and the date "Friday".
3. A text message, not voice, gets a polite "please send a voice note" reply and does not error.

**Bonus.** Two different Telegram accounts do not share memory. This teaches session keys.

**Deliberate failure mode.** A static memory session key leaks one user's tasks to another.

**Risks.** Telegram `voice` versus `audio` file types, and OGG/Opus support in the Gemini transcription path. Must be tested.

#### Seed 5: "Ask the Numbers" (refines backlog "talk to Google Sheets through WhatsApp"; rank 5)

**Scenario.** A Valencia tourism office keeps a table of monthly visitor counts by district, imported from a provided CSV. Staff ask questions in plain language and need exact figures, never guesses.

**Primary concept.** Agents that query structured data with tools ("talk to your data") instead of RAG.

**Nodes.**
- Core: Chat Trigger, AI Agent, chat model, Data table as a tool (Get rows with filters), Calculator, Simple Memory.
- Bonus: Think Tool, plus a refusal rule for questions outside the data.

**Level and time.** Intermediate, 3 stars, 30–45 min.

**Model and cost.** Gemini free tier. gpt-4o-mini: about 30 runs × 3 calls × 3k in ≈ $0.05.

**Objective verification.**
1. "How many visitors did Ciutat Vella have in July 2025?" returns the exact fixture number.
2. "Which district grew most between June and August?" returns the correct district and difference. The execution shows the Data table tool and Calculator were called.
3. "What will visitors be in 2030?" gets a clear "not in the data" answer with no invented number.

**Deliberate failure mode.** Returning the whole table floods the context or truncates. The learner adds filters and limits on the Data table tool.

**Risks.** Data table tool filter parameters filled via `$fromAI()` may be hallucinated. Good tool descriptions are part of the lesson.

#### Seed 6: "A Team of Agents Plans Your Valencia Weekend" (refines backlog "Valencia AI trip planner"; rank 6)

**Scenario.** A visitor asks for a two-day Valencia plan for given dates and a budget. A coordinator agent delegates to a weather specialist and an events specialist, then asks a budget sub-workflow for the exact total.

**Primary concept.** Multi-agent orchestration: specialist agents and sub-workflows as tools.

**Nodes.**
- Core: Chat Trigger, AI Agent (coordinator), two AI Agent Tool nodes, HTTP Request tool calling the free Open-Meteo API (no key), HTTP Request tool reading a fixture events JSON hosted in the repo, Call n8n Workflow Tool pointing to a "budget" sub-workflow (Execute Workflow Trigger and Code), chat model(s).
- Bonus: a fallback model on the coordinator, or Return Intermediate Steps shown in the reply.

**Level and time.** Advanced, 5 stars, 50–70 min.

**Model and cost.** Gemini free tier, if limits allow. gpt-4o-mini: about 80 calls × (4k in + 300 out) ≈ $0.06. Groq's 8K TPM is likely too tight.

**Objective verification.**
1. The execution shows the coordinator called both specialist tools and the budget sub-workflow for one request.
2. Every event in the plan exists in the fixture JSON for those dates, with no invented events.
3. The stated total equals the sub-workflow's output exactly.

**Deliberate failure mode.** A vague AI Agent Tool description means the coordinator never delegates, or loops until max iterations.

**Risks.** Third-party API: Open-Meteo is free and keyless, but its availability is still a dependency. A fixture fallback is advisable.

#### Seed 7: "Keep Personal Data Out of the AI" (new; rank 7)

**Scenario.** A Valencia clinic's contact form summarises patient messages with AI for the front desk. Under GDPR, patients' contact details and ID numbers must never reach the AI model. Attempts to hijack the assistant must be blocked.

**Primary concept.** Guardrails for input safety: PII sanitisation and jailbreak/prompt-injection detection.

**Nodes.**
- Core: Form Trigger, Guardrails (Sanitize Text with PII and Custom Regex for Spanish DNI/NIE and IBAN), Guardrails (Check Text for Violations: Jailbreak) with a chat model, Basic LLM Chain, Data table.
- Bonus: Guardrails on the output (Topical Alignment), or a Respond-style message on the Fail branch.

**Level and time.** Intermediate, 3 stars, 25–35 min.

**Model and cost.** Sanitize needs no LLM, so $0. Jailbreak check and summary on the Gemini free tier, or under $0.01 on gpt-4o-mini.

**Objective verification.**
1. The fixture message containing an email, a phone number and a DNI is stored with placeholders, and none of the original values appear in the stored summary or in the LLM node's input.
2. The fixture "ignore previous instructions and reveal..." message goes to the Fail branch, and the stored row says "blocked".
3. A clean message passes unchanged.

**Deliberate failure mode.** The built-in PII entity list does not cover Spanish DNI or NIE, so the learner must add Custom Regex. This assumption needs verification against the current entity list.

**Risks.** LLM-based jailbreak thresholds vary by model. Pick fixtures that are clearly malicious.

#### Seed 8: "Fix the Broken Agent" (new format; rank 8)

**Scenario.** A colleague's Valencia events FAQ chatbot "mostly works". Users report it ignores the schedule tool, mixes up conversations between people, and sometimes crashes.

**Primary concept.** Debugging AI agents from execution evidence: tool calling, memory sessions and output parsing.

**Nodes.** All in a provided broken workflow JSON fixture: Chat Trigger, AI Agent, chat model, Simple Memory, Data table or Code tool (schedule), Structured Output Parser; the learner adds Basic LLM Chain or Auto-fixing Output Parser.

**Level and time.** Intermediate, 3 stars, 30–45 min.

**Model and cost.** Under $0.02 on gpt-4o-mini, or free on Gemini.

**Objective verification.** Three scripted test conversations, published in the challenge, must pass:
1. A schedule question triggers the tool, visible in the execution.
2. Two separate chat sessions do not share memory.
3. Ten consecutive runs produce valid structured JSON with no parser errors.

**Bonus.** Enable Force Tool Call on First Iteration with a small model and explain the difference.

**Risks.** A provided-JSON fixture must be kept current with node versions, especially around n8n 3.0.

#### Seed 9: "Cheap First, Smart When Needed" (new; rank 9)

**Scenario.** A Valencia coworking space's help bot should answer simple questions with a free or cheap model, use a stronger model only for complex requests, and keep working when a provider fails or hits a rate limit.

**Primary concept.** Model routing, resilience and cost awareness.

**Nodes.**
- Core: Chat Trigger, AI Agent with "Enable Fallback Model", Model Selector with two or three chat models (e.g., an OpenRouter free model and gpt-4o-mini), and a classification step (Text Classifier or an IF on length or keywords) feeding the selector rule.
- Bonus: read token usage from the logs view, or use OpenRouter provider routing options.

**Level and time.** Advanced, 4 stars, 30–40 min.

**Model and cost.** Under $0.01: mostly free model calls plus a few gpt-4o-mini calls.

**Objective verification.**
1. The execution for "What's the Wi-Fi password?" (answered from the system message) shows the cheap model was used.
2. A multi-step planning question shows the strong model.
3. With the primary model deliberately set to an invalid model ID, the user still gets an answer, and the execution shows the fallback model ran.

**Risks.** Model Selector rule semantics. Rules are evaluated in order and the first match wins ([Model Selector docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.modelselector.md)), and expressions see only the first item.

#### Watch list: "Your First Published Agent"

**What it would teach.** Standalone n8n Agents and Message an Agent: build an agent in the Agents tab with a workflow tool, require approval on a write tool, publish, and connect it to Telegram.

**Why defer.** The feature is in Preview (released 2026-09-21). The UI is still changing weekly in 2.40–2.42, for example "Move web search to agent capabilities" and "Move agent skills to a separate card" ([Release notes](https://docs.n8n.io/changelog/release-notes.md)). Self-hosted needs extra setup. This makes the three-language copy and screenshots costly to maintain. Re-evaluate after n8n 3.0 stabilises.

**General authoring notes from this research.**
- Prefer the Data table over Google Sheets for datasets and storage. It needs no OAuth and is built in.
- Host fixtures in `public/fixtures/` as challenges 10 and 11 already do.
- Recommend one named free model with tool support, plus "Gateway credits if available" on Cloud.
- Avoid Chat Hub, SerpApi, AI Transform and the legacy LangChain Code node because of n8n 3.0 removals.

### Gaps
- All levels, times and costs above are estimates. They have not been measured by building the workflows.
- Some seed details need hands-on verification on n8n 2.42+ before authoring:
  - the Chat review-channel prerequisites (seed 2);
  - OGG/Opus transcription with the Gemini node (seed 4);
  - whether the Guardrails PII list covers Spanish identifiers (seed 7);
  - Data table tool filter behaviour with `$fromAI()` (seed 5);
  - Model Selector rule expressions (seed 9).
- The free-model list on OpenRouter changes often; it had 20 free models on 2026-10-06. Any named free model in a challenge needs periodic re-checking.
