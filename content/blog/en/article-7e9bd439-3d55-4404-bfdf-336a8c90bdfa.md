---
{
  "id": "opp_7e9bd439-3d55-4404-bfdf-336a8c90bdfa",
  "locale": "en",
  "slug": "article-7e9bd439-3d55-4404-bfdf-336a8c90bdfa",
  "urlSlug": "n8n-webflow-trigger-vulnerability-what-the-advisory-says",
  "publishedAt": "2026-09-29T15:10:43.709Z",
  "title": "n8n Webflow Trigger Vulnerability: What the Advisory Says",
  "subtitle": "A plain-language look at the n8n Webflow Trigger vulnerability disclosed on GitHub on September 16, 2026, covering what changed, who is affected, and what to do now.",
  "description": "A plain-language look at the n8n Webflow Trigger vulnerability disclosed on GitHub on September 16, 2026, covering what changed, who is affected, and what to do now.",
  "date": "2026-09-29",
  "sourcesCheckedAt": "2026-09-29T14:50:55.441Z",
  "tags": [
    "Updates",
    "n8n",
    "Webhooks",
    "Production readiness"
  ],
  "coverImage": "/blog/en/article-7e9bd439-3d55-4404-bfdf-336a8c90bdfa/de3069a3a6e8b49463526ff62bbbfedde93cd695206ceb4e4053abc536acc0e8.png",
  "coverAlt": "A gate accepting a forged key represents the n8n Webflow Trigger vulnerability from an unchecked signature.",
  "seo": {
    "title": "n8n Webflow Trigger Vulnerability: What the Advisory Says",
    "description": "A plain-language look at the n8n Webflow Trigger vulnerability disclosed on GitHub on September 16, 2026, covering what changed, who is affected, and what to do now.",
    "keywords": [
      "n8n webflow trigger vulnerability",
      "n8n webflow trigger security advisory",
      "webhook signature verification n8n",
      "n8n webhook signature bypass fix"
    ]
  },
  "revision": "2632a0e7c6927df4e1ff87585f3e69285453374f2e0e3606c723279c38a6d4aa"
}
---

## What Changed: The n8n Webflow Trigger Vulnerability

The n8n Webflow Trigger vulnerability, described in a GitHub security advisory identified as GHSA-hwv9-jhc7-f7c4, concerns a missing check in how the Webflow Trigger node validated incoming events. According to the advisory, the node accepted webhook requests without checking the x-webflow-signature HMAC that Webflow normally attaches to its event deliveries. That gap meant an unauthenticated attacker could send a forged request carrying fake, attacker-controlled data and have it trigger the workflow as though it had genuinely come from Webflow.

[GitHub's advisory listing, published September 16, 2026](<https://github.com/n8n-io/n8n/security/advisories>), rated the issue Moderate severity, one of several n8n advisories posted the same day.

Sources: [Missing Webhook Signature Verification in Webflow Trigger Node Allows Forged Event Injection · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-hwv9-jhc7-f7c4>), [Security Advisories · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories>)

## Who Is Affected: Versions Before the Patch and the n8n Webflow Trigger Security Advisory

![Two gears on a workbench represent the older and newer versions of the n8n Webflow Trigger node.](/blog/en/article-7e9bd439-3d55-4404-bfdf-336a8c90bdfa/34d8b8151e4b8b92306f1ac01b3ce5e9145686fe67b88e1e9b1b0564f47678eb.png)

Conceptual comparison contrasting the Webflow Trigger node's two versions referenced in the advisory.

According to the advisory, the fix applies to n8n instances running versions before 1.123.80, 2.39.6 and 2.40.1. n8n states the issue is fixed in these versions and instructs users to upgrade to one of them or later to remediate it. Any [self-hosted instance](<https://n8n-challenges.app/en/blog/self-hosted-n8n-production-readiness-checklist>) on an older release, and any workflow that uses the Webflow Trigger node, falls within the scope the advisory describes.

**n8n versions the advisory lists as fixed**

| n8n release line | Patched version |
| --- | --- |
| 1.x branch | 1.123.80 |
| 2.x branch (2.39 series) | 2.39.6 |
| 2.x branch (2.40 series) | 2.40.1 |

The advisory also states that the signature-verification fix was applied to version 2 of the Webflow Trigger node specifically. n8n's own source code confirms the node is implemented as two separate versions, a version 1 class and a version 2 class, coexisting in the same node package.

Sources: [Missing Webhook Signature Verification in Webflow Trigger Node Allows Forged Event Injection · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-hwv9-jhc7-f7c4>), [n8n/packages/nodes-base/nodes/Webflow/WebflowTrigger.node.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Webflow/WebflowTrigger.node.ts>)

## What the Fix Covers and What to Do Now

For most teams, resolving the n8n Webflow Trigger vulnerability comes down to running a patched release chosen from the version table above. The patch adds the webhook signature verification the node was missing, checking the x-webflow-signature header before a workflow runs. Checking your current version against the patched releases and upgrading is the most direct way to get the webhook signature verification n8n added in this patch, and this article prioritizes it based on the versions the advisory names.

If an immediate upgrade is not possible, the advisory itself recommends interim workarounds: deactivating unused Webflow Trigger workflows, restricting network access to Webflow's published IP ranges, and [limiting n8n instance access to fully trusted users](<https://n8n-challenges.app/en/blog/n8n-security-checklist-for-a-shared-self-hosted-instance>). The advisory states these measures do not fully remediate the risk and are meant only as short-term mitigation until you can upgrade.

This article calls this update the n8n webhook signature bypass fix, since it closes the specific gap the advisory reported. The checklist below separates the advisory's own instructions from suggestions this article adds for teams standardizing how they run n8n.

- [ ] Check your n8n version against 1.123.80, 2.39.6 and 2.40.1 and upgrade if you are below the patched release for your line
- [ ] If you cannot upgrade immediately, apply the advisory's individual workarounds: deactivate unused Webflow Trigger workflows, restrict access to Webflow's published IP ranges, and limit instance access to trusted users; applying all three together is this article's own suggested approach, not a bundled instruction from the advisory
- [ ] After upgrading, audit workflows for Webflow Trigger nodes still configured on version 1, since the advisory's fix names version 2 — this check is the article's own suggestion, not something the advisory itself states
- [ ] Consider adding validation in downstream nodes that act on Webflow event data as a general defense-in-depth habit, beyond what the advisory itself covers

Sources: [Missing Webhook Signature Verification in Webflow Trigger Node Allows Forged Event Injection · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-hwv9-jhc7-f7c4>)

If your team wants to build the habit of checking advisories like this one and keeping n8n current, n8n Office Hours / Coaching on the For companies page gives teams recurring, hands-on sessions built around your own n8n instance to review upgrades and workflow risk.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## What the Advisory Doesn't Say

The advisory is silent on several points readers may want answered. It does not state whether n8n Cloud users need to take any action themselves, or whether cloud instances were already upgraded automatically; this is simply not addressed in the published text. The advisory also records no known CVE ID for this n8n Webflow Trigger vulnerability at the time of publication.

Separately from this advisory, Cornelius Suermann, n8n's VP of Engineering, has written on the n8n Blog about how the company approaches vulnerability disclosure in general terms. His post does not describe this particular advisory, but it explains why an absence of headline-grabbing reports is not, by itself, reassuring:

> “A codebase that receives few vulnerability reports is not a sign of security. It is more often a sign that nobody is looking.”
>
> — Cornelius Suermann, VP of Engineering at n8n · Source: [How n8n Handles Vulnerability Disclosure - and Why We Do It This Way – n8n Blog](<https://blog.n8n.io/how-n8n-handles-vulnerability-disclosure-and-why-we-do-it-this-way/>)

The advisory likewise does not clarify whether Webflow Trigger node version 1 remains vulnerable after an instance upgrade, or how to migrate an existing workflow from version 1 to version 2. Readers who rely on this node should treat that gap as unresolved rather than assume either answer.

Sources: [Missing Webhook Signature Verification in Webflow Trigger Node Allows Forged Event Injection · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-hwv9-jhc7-f7c4>)

## Background: What the Webflow Trigger Node Does

For context, n8n's own documentation describes Webflow as a browser-based website-building platform, and the Webflow Trigger node as the way an n8n workflow listens for events from a connected Webflow site, such as form submissions or content changes. This description covers the node's general purpose and makes no mention of the vulnerability, the affected versions, or the fix; it is background only.

Sources: [Webflow Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.webflowtrigger>)

For teams that want an outside check on whether upgrades like this one are being tracked and applied consistently, the Workflow Audit on the For companies page reviews your n8n instance and workflows for reliability, security and maintainability using your own tools and data.

**[Audit your Webflow trigger security](https://n8n-challenges.app/en/companies)**

Tags: Updates, n8n, Webhooks, Production readiness
