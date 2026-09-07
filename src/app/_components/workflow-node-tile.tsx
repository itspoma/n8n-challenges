type WorkflowNodeTileProps = {
  name: string;
};

type NodeKind = "ai" | "data" | "decision" | "integration" | "trigger" | "webhook";

const NODE_DOCUMENTATION_URLS = {
  webhook: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook",
  editFields: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.set",
  respondToWebhook:
    "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook",
} as const;

function getNodeDocumentationUrl(name: string): string | undefined {
  const normalizedName = name.toLowerCase();

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
  const documentationUrl = getNodeDocumentationUrl(name);

  const nodeContent = (
    <>
      <span className={`n8n-node n8n-node-${kind}`} aria-hidden="true">
        <span className="n8n-node-port n8n-node-port-input" />
        <span className="n8n-node-glyph">
          <NodeGlyph kind={kind} />
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
