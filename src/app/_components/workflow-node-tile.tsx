import Image from "next/image";

type WorkflowNodeTileProps = {
  name: string;
};

type NodeKind = "ai" | "data" | "decision" | "integration" | "trigger" | "webhook";

const NODE_DOCUMENTATION_URLS = {
  webhook: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook",
  editFields: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.set",
  respondToWebhook:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook",
  telegramTrigger:
    "https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger",
  httpRequest:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest",
  trello: "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.trello",
  telegram: "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram",
  formTrigger:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger",
  form: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.form",
  if: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.if",
  dataTable:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable",
  scheduleTrigger:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger",
  splitOut:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitout",
  wait: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait",
  errorTrigger:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger",
  filter:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.filter",
  removeDuplicates:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates",
  sort: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.sort",
  limit: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.limit",
  aggregate:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.aggregate",
  firecrawl: "https://n8n.io/integrations/firecrawl/",
  aiAgent:
    "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent",
  openRouterChatModel:
    "https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenrouter",
  mcpClientTool:
    "https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp",
  mcpServerTrigger:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger",
  calculator:
    "https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcalculator",
  chatTrigger:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger",
  basicLlmChain:
    "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm",
  openAiChatModel:
    "https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai",
  structuredOutputParser:
    "https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured",
  manualTrigger:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.manualworkflowtrigger",
  googleDrive:
    "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googledrive",
  loopOverItems:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches",
  defaultDataLoader:
    "https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentdefaultdataloader",
  recursiveCharacterTextSplitter:
    "https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.textsplitterrecursivecharactertextsplitter",
  embeddingsOpenAi:
    "https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsopenai",
  simpleVectorStore:
    "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory",
  switch: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.switch",
  sendEmail: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.sendemail",
  resend: "https://n8n.io/integrations/resend/",
} as const;

function getNodeDocumentationUrl(name: string): string | undefined {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("google drive")) {
    return NODE_DOCUMENTATION_URLS.googleDrive;
  }

  if (normalizedName.includes("default data loader")) {
    return NODE_DOCUMENTATION_URLS.defaultDataLoader;
  }

  if (normalizedName.includes("recursive character text splitter")) {
    return NODE_DOCUMENTATION_URLS.recursiveCharacterTextSplitter;
  }

  if (normalizedName.includes("embeddings openai")) {
    return NODE_DOCUMENTATION_URLS.embeddingsOpenAi;
  }

  if (normalizedName.includes("simple vector store")) {
    return NODE_DOCUMENTATION_URLS.simpleVectorStore;
  }

  if (normalizedName.includes("mcp server trigger")) {
    return NODE_DOCUMENTATION_URLS.mcpServerTrigger;
  }

  if (normalizedName.includes("mcp client tool")) {
    return NODE_DOCUMENTATION_URLS.mcpClientTool;
  }

  if (normalizedName.includes("openrouter chat model")) {
    return NODE_DOCUMENTATION_URLS.openRouterChatModel;
  }

  if (normalizedName.includes("ai agent")) {
    return NODE_DOCUMENTATION_URLS.aiAgent;
  }

  if (normalizedName.includes("calculator")) {
    return NODE_DOCUMENTATION_URLS.calculator;
  }

  if (normalizedName.includes("chat trigger")) {
    return NODE_DOCUMENTATION_URLS.chatTrigger;
  }

  if (normalizedName.includes("telegram trigger")) {
    return NODE_DOCUMENTATION_URLS.telegramTrigger;
  }

  if (normalizedName.includes("http request")) {
    return NODE_DOCUMENTATION_URLS.httpRequest;
  }

  if (normalizedName === "trello") {
    return NODE_DOCUMENTATION_URLS.trello;
  }

  if (normalizedName === "telegram") {
    return NODE_DOCUMENTATION_URLS.telegram;
  }

  if (normalizedName.includes("form trigger")) {
    return NODE_DOCUMENTATION_URLS.formTrigger;
  }

  if (normalizedName === "n8n form") {
    return NODE_DOCUMENTATION_URLS.form;
  }

  if (normalizedName.includes("manual trigger")) {
    return NODE_DOCUMENTATION_URLS.manualTrigger;
  }

  if (normalizedName.includes("schedule trigger")) {
    return NODE_DOCUMENTATION_URLS.scheduleTrigger;
  }

  if (normalizedName === "split out") {
    return NODE_DOCUMENTATION_URLS.splitOut;
  }

  if (normalizedName.includes("loop over items")) {
    return NODE_DOCUMENTATION_URLS.loopOverItems;
  }

  if (normalizedName === "wait") {
    return NODE_DOCUMENTATION_URLS.wait;
  }

  if (normalizedName.includes("error trigger")) {
    return NODE_DOCUMENTATION_URLS.errorTrigger;
  }

  if (normalizedName === "filter") {
    return NODE_DOCUMENTATION_URLS.filter;
  }

  if (normalizedName.includes("remove duplicates")) {
    return NODE_DOCUMENTATION_URLS.removeDuplicates;
  }

  if (normalizedName === "sort") {
    return NODE_DOCUMENTATION_URLS.sort;
  }

  if (normalizedName === "limit") {
    return NODE_DOCUMENTATION_URLS.limit;
  }

  if (normalizedName === "aggregate") {
    return NODE_DOCUMENTATION_URLS.aggregate;
  }

  if (normalizedName.includes("firecrawl")) {
    return NODE_DOCUMENTATION_URLS.firecrawl;
  }

  if (normalizedName === "if") {
    return NODE_DOCUMENTATION_URLS.if;
  }

  if (normalizedName.includes("data table")) {
    return NODE_DOCUMENTATION_URLS.dataTable;
  }

  if (normalizedName.includes("basic llm chain")) {
    return NODE_DOCUMENTATION_URLS.basicLlmChain;
  }

  if (normalizedName.includes("openai chat model")) {
    return NODE_DOCUMENTATION_URLS.openAiChatModel;
  }

  if (normalizedName.includes("structured output parser")) {
    return NODE_DOCUMENTATION_URLS.structuredOutputParser;
  }

  if (normalizedName === "switch") {
    return NODE_DOCUMENTATION_URLS.switch;
  }

  if (normalizedName.includes("send email")) {
    return NODE_DOCUMENTATION_URLS.sendEmail;
  }

  if (normalizedName.includes("resend")) {
    return NODE_DOCUMENTATION_URLS.resend;
  }

  if (
    normalizedName.includes("respond to webhook") ||
    normalizedName.includes("responder a webhook") ||
    normalizedName.includes("responder al webhook")
  ) {
    return NODE_DOCUMENTATION_URLS.respondToWebhook;
  }

  if (
    normalizedName.includes("edit fields") ||
    normalizedName.includes("editar campos") ||
    normalizedName === "set"
  ) {
    return NODE_DOCUMENTATION_URLS.editFields;
  }

  if (normalizedName.includes("webhook")) {
    return NODE_DOCUMENTATION_URLS.webhook;
  }

  return undefined;
}

function getNodeKind(name: string): NodeKind {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("webhook")) return "webhook";
  if (normalizedName.includes("trigger") || normalizedName.includes("schedule")) return "trigger";
  if (
    normalizedName.includes("ai") ||
    normalizedName.includes("llm") ||
    normalizedName.includes("chat model") ||
    normalizedName.includes("embedding") ||
    normalizedName.includes("vector")
  ) {
    return "ai";
  }
  if (
    normalizedName === "if" ||
    normalizedName.includes("switch") ||
    normalizedName.includes("filter") ||
    normalizedName.includes("limit") ||
    normalizedName.includes("sort")
  ) {
    return "decision";
  }
  if (
    normalizedName.includes("data") ||
    normalizedName.includes("fields") ||
    normalizedName.includes("file") ||
    normalizedName.includes("parser")
  ) {
    return "data";
  }

  return "integration";
}

function getNodeIcon(name: string) {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("manual trigger")) {
    return {
      light: "/nodes/manual-trigger.svg",
      dark: "/nodes/manual-trigger-dark.svg",
    };
  }

  if (normalizedName.includes("google drive")) {
    return { light: "/nodes/google-drive.svg" };
  }

  if (normalizedName.includes("loop over items")) {
    return {
      light: "/nodes/loop-over-items.svg",
      dark: "/nodes/loop-over-items-dark.svg",
    };
  }

  if (normalizedName.includes("default data loader")) {
    return {
      light: "/nodes/default-data-loader.svg",
      dark: "/nodes/default-data-loader-dark.svg",
    };
  }

  if (normalizedName.includes("recursive character text splitter")) {
    return {
      light: "/nodes/recursive-character-text-splitter.svg",
      dark: "/nodes/recursive-character-text-splitter-dark.svg",
    };
  }

  if (normalizedName.includes("embeddings openai")) {
    return {
      light: "/nodes/openai.svg",
      dark: "/nodes/openai-dark.svg",
    };
  }

  if (normalizedName.includes("simple vector store")) {
    return {
      light: "/nodes/simple-vector-store.svg",
      dark: "/nodes/simple-vector-store-dark.svg",
    };
  }

  if (
    normalizedName.includes("mcp server trigger") ||
    normalizedName.includes("mcp client tool")
  ) {
    return {
      light: "/nodes/mcp.svg",
      dark: "/nodes/mcp-dark.svg",
    };
  }

  if (normalizedName.includes("openrouter chat model")) {
    return {
      light: "/nodes/openrouter.svg",
      dark: "/nodes/openrouter-dark.svg",
    };
  }

  if (normalizedName.includes("ai agent")) {
    return {
      light: "/nodes/ai-agent.svg",
      dark: "/nodes/ai-agent-dark.svg",
    };
  }

  if (normalizedName.includes("calculator")) {
    return {
      light: "/nodes/calculator.svg",
      dark: "/nodes/calculator-dark.svg",
    };
  }

  if (normalizedName.includes("chat trigger")) {
    return {
      light: "/nodes/chat-trigger-light.svg",
      dark: "/nodes/chat-trigger-dark.svg",
    };
  }

  if (normalizedName === "trello") {
    return { light: "/nodes/trello.svg" };
  }

  if (normalizedName.includes("telegram")) {
    return { light: "/nodes/telegram.svg" };
  }

  if (normalizedName.includes("http request")) {
    return {
      light: "/nodes/http-request.svg",
      dark: "/nodes/http-request-dark.svg",
    };
  }

  if (
    normalizedName.includes("edit fields") ||
    normalizedName.includes("editar campos") ||
    normalizedName === "set"
  ) {
    return {
      light: "/nodes/edit-fields.svg",
      dark: "/nodes/edit-fields.svg",
    };
  }

  if (normalizedName.includes("form trigger")) {
    return { light: "/nodes/form-trigger.svg" };
  }

  if (normalizedName === "n8n form") {
    return { light: "/nodes/form-trigger.svg" };
  }

  if (normalizedName.includes("schedule trigger")) {
    return {
      light: "/nodes/schedule-trigger.svg",
      dark: "/nodes/schedule-trigger-dark.svg",
    };
  }

  if (normalizedName === "split out") {
    return {
      light: "/nodes/split-out.svg",
      dark: "/nodes/split-out-dark.svg",
    };
  }

  if (normalizedName === "wait") {
    return {
      light: "/nodes/wait-light.svg",
      dark: "/nodes/wait-dark.svg",
    };
  }

  if (normalizedName.includes("error trigger")) {
    return {
      light: "/nodes/error-trigger-light.svg",
      dark: "/nodes/error-trigger-dark.svg",
    };
  }

  if (normalizedName === "filter") {
    return {
      light: "/nodes/filter.svg",
      dark: "/nodes/filter-dark.svg",
    };
  }

  if (normalizedName.includes("remove duplicates")) {
    return {
      light: "/nodes/remove-duplicates.svg",
      dark: "/nodes/remove-duplicates-dark.svg",
    };
  }

  if (normalizedName === "sort") {
    return {
      light: "/nodes/sort.svg",
      dark: "/nodes/sort-dark.svg",
    };
  }

  if (normalizedName === "limit") {
    return {
      light: "/nodes/limit.svg",
      dark: "/nodes/limit-dark.svg",
    };
  }

  if (normalizedName === "aggregate") {
    return {
      light: "/nodes/aggregate.svg",
      dark: "/nodes/aggregate-dark.svg",
    };
  }

  if (normalizedName === "if") {
    return {
      light: "/nodes/if.svg",
      dark: "/nodes/if-dark.svg",
    };
  }

  if (normalizedName.includes("firecrawl")) {
    return { light: "/nodes/firecrawl.svg" };
  }

  if (normalizedName.includes("data table")) {
    return {
      light: "/nodes/data-table.svg",
      dark: "/nodes/data-table-dark.svg",
    };
  }

  if (normalizedName.includes("resend")) {
    return {
      light: "/nodes/resend-black.svg",
      dark: "/nodes/resend-white.svg",
    };
  }

  if (normalizedName.includes("basic llm chain")) {
    return {
      light: "/nodes/basic-llm-chain-light.svg",
      dark: "/nodes/basic-llm-chain-dark.svg",
    };
  }

  if (normalizedName.includes("openai chat model")) {
    return {
      light: "/nodes/openai-chat-model-light.svg",
      dark: "/nodes/openai-chat-model-dark.svg",
    };
  }

  if (normalizedName.includes("structured output parser")) {
    return {
      light: "/nodes/structured-output-parser-light.svg",
      dark: "/nodes/structured-output-parser-dark.svg",
    };
  }

  if (normalizedName === "switch") {
    return {
      light: "/nodes/switch-light.svg",
      dark: "/nodes/switch-dark.svg",
    };
  }

  if (normalizedName.includes("send email")) {
    return {
      light: "/nodes/send-email-light.svg",
      dark: "/nodes/send-email-dark.svg",
    };
  }

  return undefined;
}

function NodeGlyph({ kind }: { kind: NodeKind }) {
  if (kind === "webhook") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#37474f" stroke="none" d="M35 37c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4" />
        <path fill="#37474f" stroke="none" d="M35 43c-3 0-5.9-1.4-7.8-3.7l3.1-2.5c1.1 1.4 2.9 2.3 4.7 2.3 3.3 0 6-2.7 6-6s-2.7-6-6-6c-1 0-2 .3-2.9.7l-1.7 1L23.3 16l3.5-1.9 5.3 9.4c1-.3 2-.5 3-.5 5.5 0 10 4.5 10 10S40.5 43 35 43" />
        <path fill="#37474f" stroke="none" d="M14 43C8.5 43 4 38.5 4 33c0-4.6 3.1-8.5 7.5-9.7l1 3.9C9.9 27.9 8 30.3 8 33c0 3.3 2.7 6 6 6s6-2.7 6-6v-2h15v4H23.8c-.9 4.6-5 8-9.8 8" />
        <path fill="#e91e63" stroke="none" d="M14 37c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4" />
        <path fill="#37474f" stroke="none" d="M25 19c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4" />
        <path fill="#e91e63" stroke="none" d="m15.7 34-3.4-2 5.9-9.7c-2-1.9-3.2-4.5-3.2-7.3 0-5.5 4.5-10 10-10s10 4.5 10 10c0 .9-.1 1.7-.3 2.5l-3.9-1c.1-.5.2-1 .2-1.5 0-3.3-2.7-6-6-6s-6 2.7-6 6c0 2.1 1.1 4 2.9 5.1l1.7 1z" />
      </svg>
    );
  }

  if (kind === "trigger") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M27 5 13 27h10l-2 16 14-23H25l2-15Z" />
      </svg>
    );
  }

  if (kind === "ai") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 5c1.8 10.2 8.8 17.2 19 19-10.2 1.8-17.2 8.8-19 19C22.2 32.8 15.2 25.8 5 24 15.2 22.2 22.2 15.2 24 5Z" />
        <path d="M38 5c.6 3.1 2.9 5.4 6 6-3.1.6-5.4 2.9-6 6-.6-3.1-2.9-5.4-6-6 3.1-.6 5.4-2.9 6-6Z" />
      </svg>
    );
  }

  if (kind === "decision") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 13h23l7 7-7 7H8l7-7-7-7Z" />
        <path d="M24 27v15" />
      </svg>
    );
  }

  if (kind === "data") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <ellipse cx="24" cy="11" rx="14" ry="6" />
        <path d="M10 11v13c0 3.3 6.3 6 14 6s14-2.7 14-6V11" />
        <path d="M10 24v13c0 3.3 6.3 6 14 6s14-2.7 14-6V24" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="7" y="7" width="13" height="13" rx="3" />
      <rect x="28" y="7" width="13" height="13" rx="3" />
      <rect x="7" y="28" width="13" height="13" rx="3" />
      <rect x="28" y="28" width="13" height="13" rx="3" />
    </svg>
  );
}

export function WorkflowNodeTile({ name }: WorkflowNodeTileProps) {
  const kind = getNodeKind(name);
  const nodeIcon = getNodeIcon(name);
  const documentationUrl = getNodeDocumentationUrl(name);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  const nodeContent = (
    <>
      <span className={`n8n-node n8n-node-${kind}`} aria-hidden="true">
        <span className="n8n-node-port n8n-node-port-input" />
        <span className="n8n-node-glyph">
          {nodeIcon ? (
            <>
              <Image
                className={nodeIcon.dark ? "n8n-node-image n8n-node-image-on-light" : "n8n-node-image"}
                src={`${basePath}${nodeIcon.light}`}
                width={48}
                height={48}
                alt=""
                unoptimized
              />
              {nodeIcon.dark ? (
                <Image
                  className="n8n-node-image n8n-node-image-on-dark"
                  src={`${basePath}${nodeIcon.dark}`}
                  width={48}
                  height={48}
                  alt=""
                  unoptimized
                />
              ) : null}
            </>
          ) : (
            <NodeGlyph kind={kind} />
          )}
        </span>
        <span className="n8n-node-port n8n-node-port-output" />
        <svg className="n8n-node-check" viewBox="0 0 24 24">
          <path d="m4 13 5 5L20 7" />
        </svg>
      </span>
      <strong>{name}</strong>
    </>
  );

  return (
    <li className="challenge-node-item">
      {documentationUrl ? (
        <a
          className="challenge-node-link"
          href={documentationUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${name} documentation`}
        >
          {nodeContent}
        </a>
      ) : (
        nodeContent
      )}
    </li>
  );
}
