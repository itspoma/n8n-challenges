type WorkflowNodeTileProps = {
  name: string;
};

type NodeKind = "ai" | "data" | "decision" | "integration" | "trigger" | "webhook";

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
        <path d="M18 30a8 8 0 1 1 0-12l8-8a8 8 0 1 1 8 12l-3 3" />
        <path d="M30 18a8 8 0 1 1 0 12H18" />
        <circle cx="18" cy="24" r="2.5" />
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

  return (
    <li className="challenge-node-item">
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
    </li>
  );
}
