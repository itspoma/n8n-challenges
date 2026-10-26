---
{
  "id": "opp_29ad0e7c-fe96-4f6e-9397-de9289af2e42",
  "locale": "en",
  "slug": "article-29ad0e7c-fe96-4f6e-9397-de9289af2e42",
  "urlSlug": "sap-idoc-integration-n8n-receipt-and-reconciliation-components",
  "publishedAt": "2026-10-26T18:15:07.549Z",
  "title": "SAP IDoc integration: n8n receipt and reconciliation components",
  "subtitle": "Configure the documented n8n Webhook components for SAP IDoc integration, then define how your intermediary will distinguish receipt from SAP processing outcomes.",
  "description": "Configure the documented n8n Webhook components for SAP IDoc integration, then define how your intermediary will distinguish receipt from SAP processing outcomes.",
  "date": "2026-10-26",
  "sourcesCheckedAt": "2026-10-26T18:01:11.985Z",
  "tags": [
    "SAP integration",
    "Webhooks",
    "Tutorial"
  ],
  "coverImage": "/blog/en/article-29ad0e7c-fe96-4f6e-9397-de9289af2e42/966ec07a570c4ac43fe70fbc2d34b9d1d8c1dc2560c7474b3b9465f733ca1d72.webp",
  "coverAlt": "An envelope and receipt slip in a pink tray sit apart from a stamp and finished document.",
  "seo": {
    "title": "SAP IDoc integration: n8n receipt and reconciliation components",
    "description": "Configure the documented n8n Webhook components for SAP IDoc integration, then define how your intermediary will distinguish receipt from SAP processing outcomes.",
    "keywords": [
      "sap idoc integration"
    ]
  },
  "revision": "6d4d9531ceb9cdb68d6533efada2b91e9a440df779d406ce418d7dd2f0b28beb"
}
---

## Set the SAP IDoc integration boundary

For SAP IDoc integration through an existing intermediary, an HTTP receipt and a SAP processing outcome must be treated separately. n8n documents an immediate Webhook response mode that returns HTTP 200 while execution continues; that response alone establishes neither persistence nor SAP business completion.

The goal here is to configure the documented n8n receipt components and prepare a reconciliation contract. This is a component tutorial, not a complete executable SAP integration: the supplied documentation does not establish the intermediary bridge, outcome endpoint, ledger schema, duplicate guarantees or failure-response implementation.

Before following the steps, identify your actual SAP product, release and deployment, the already configured intermediary, its authenticated HTTP delivery contract, and its authoritative outcome interface. You also need an n8n workspace and, if using the proposed ledger, a configured Postgres connection. Treat these as prerequisites to resolve with your integration owner.

In our view, agreeing what counts as receipt and what counts as business completion is the most useful first decision.

Sources: [skills/skills/n8n-node-configuration-official/references/WEBHOOK_NODES.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-node-configuration-official/references/WEBHOOK_NODES.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md>), [skills/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md>)

## 1. Define the message and ledger contract

![An open ledger separates envelope tokens from document tokens, with matching notches on one pair.](/blog/en/article-29ad0e7c-fe96-4f6e-9397-de9289af2e42/311f68f39e2ba57968ca764afb825599522046ca122b3c0b466cf31ce986523a.webp)

The proposed ledger keeps receipts and processing outcomes separate while preserving their correlation.

Use the following as an editorial example contract, not a standard SAP payload or a ready-made database schema. Have the intermediary owner confirm which identifiers remain stable across delivery attempts and how outcomes correlate to receipts.

**Suggested fields to agree with the intermediary owner**

| Field | Proposed purpose |
| --- | --- |
| source_system | Identify the originating system |
| idoc_number | Carry the source IDoc reference |
| business_reference | Identify the related order |
| correlation_id | Match receipt and outcome |
| receipt_state | Record local receipt separately |
| processing_outcome | Store the authoritative result |
| outcome_timestamp | Record when that result applies |

n8n's Postgres node documents select, insert and update operations. We would keep receipt state and processing state separate so an accepted delivery cannot silently become a completed business operation.

Sources: [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md>)

## 2. Configure the n8n Webhook components

Follow these documented component steps once the intermediary's delivery contract is agreed. Exact authentication parameter shapes depend on the n8n version; the supplied references specify no applicable release or plan.

1. Add a Webhook trigger and select built-in Basic or Header authentication with credentials matching the caller.
2. Set the Webhook response mode to use the Respond to Webhook node.
3. Add a Respond to Webhook node after the nodes that supply its response data.
4. Register the test webhook using Listen for Test Event or Execute workflow, then send the agreed test message from the intermediary.
5. Publish the workflow to register its production webhook when the implementation is ready.

For SAP IDoc integration, our recommended design is to place receipt persistence before the explicit response. Implement and verify validation, [duplicate behavior](<https://n8n-challenges.app/en/blog/build-an-idempotent-n8n-webhook-that-skips-retried-requests>) and persistence-failure handling before relying on it.

For example, a proposed order-status message could carry correlation_id order-example-A. The intended acceptance evidence is a stored receipt with that identifier followed by the agreed receipt response; its processing outcome remains pending until authoritative evidence arrives.

Sources: [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.webhook/README.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.webhook/README.md>), [skills/skills/n8n-node-configuration-official/references/WEBHOOK_NODES.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-node-configuration-official/references/WEBHOOK_NODES.md>), [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md>)

Lead a team implementing authenticated receipt handling and correlation? Our n8n Advanced / Developer Training works with your team's own tools, data and n8n instance. This link opens the For companies page on this site.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## 3. Define the authoritative outcome and reconciliation

Do not substitute a legacy SAP status definition for your deployment's outcome contract. Legacy ALE/IDoc documentation under the SAP SNC 7.0 EHP4 help path describes periodic receiving-system confirmations requiring an ALEAUD message flow. That is communication between SAP systems, not an n8n HTTP callback; underlying ERP applicability is unspecified.

For SAP NetWeaver 7.0 EHP2 SPS25, the legacy IDoc Interface/ALE audit documentation assigns status 41 to completed processing with an application document created in the receiving system. That documentation explicitly says it is no longer updated.

Use the following editorial sequence to specify reconciliation with the intermediary owner. If its outcome interface uses HTTP, n8n documents creating an appropriate credential and configuring Authentication in HTTP Request, preferring a predefined credential type when available. The actual endpoint and permissions must come from your contract.

![Proposed reconciliation sequence: 1. Select pending receipts; 2. Obtain authoritative evidence; 3. Match identifiers; 4. Record or escalate](/blog/en/article-29ad0e7c-fe96-4f6e-9397-de9289af2e42/306b90f2fae9f86ddd0b0c660ec139cf4f6cb60820a8c1a240e759a46bc1494a.webp)

Sources: [skills/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md>), [Monitoring the Status of Inbound IDocs Using ALE Audit](<https://help.sap.com/saphelp_snc700_ehp04/helpdata/en/4a/b4abcc85376d61e10000000a42189c/content.htm?no_cache=true>), [Evaluating the Audit Database | SAP Help Portal](<https://help.sap.com/docs/SAP_NETWEAVER_702/8f3819b0c24149b5959ab31070b64058/4aa93def05e24458e10000000a42189b.html?version=7.02.25>)

## 4. Check responses and investigate failures

For SAP IDoc integration acceptance, distinguish documented HTTP behavior from the additional evidence your implementation must produce. Use this suggested test checklist before treating the workflow as operational.

- [ ] Send incorrect credentials: expect HTTP 401 before workflow execution.
- [ ] Send a valid message: require ledger evidence and the agreed explicit receipt response.
- [ ] Simulate persistence failure: verify the agreed failure response rather than assuming it.
- [ ] Repeat a delivery: verify the contract's duplicate behavior.
- [ ] Delay or fail a processing outcome: verify pending-state handling and escalation.

A further trap: n8n documents that a workflow finishing without executing [Respond to Webhook](<https://n8n-challenges.app/en/blog/n8n-respond-to-webhook-exercise-in-predictable-json-responses>) still returns HTTP 200. Inspect execution and receipt evidence rather than accepting the status code as proof that your intended response path ran.

For SAP-side failures, the legacy status-monitor documentation under the SAP SNC 7.0 EHP4 help path directs operators to examine status long text and correct the cause before reprocessing. Its underlying ERP release applicability is unspecified, and that procedure excludes communication errors.

Sources: [skills/skills/n8n-node-configuration-official/references/WEBHOOK_NODES.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-node-configuration-official/references/WEBHOOK_NODES.md>), [Respond to Webhook | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook>), [Status Monitor for ALE Messages](<https://help.sap.com/saphelp_snc700_ehp04/helpdata/en/4a/b7c1736dbe6d8be10000000a42189c/content.htm?no_cache=true>)

Get hands-on help reviewing your team's receipt handling and reconciliation with our Workflow Audit, which reviews your n8n instance and workflows for reliability, security and maintainability. This link opens the For companies page on this site.

**[Review your SAP receipt workflows](https://n8n-challenges.app/en/companies)**

Tags: SAP integration, Webhooks, Tutorial
