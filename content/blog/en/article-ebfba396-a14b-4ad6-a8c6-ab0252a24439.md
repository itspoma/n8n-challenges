---
{
  "id": "opp_ebfba396-a14b-4ad6-a8c6-ab0252a24439",
  "locale": "en",
  "slug": "article-ebfba396-a14b-4ad6-a8c6-ab0252a24439",
  "urlSlug": "chat-hub-chat-only-users-n8ns-october-14-security-advisory",
  "publishedAt": "2026-10-18T14:22:23.421Z",
  "title": "Chat Hub chat-only users: n8n’s October 14 security advisory",
  "subtitle": "What n8n’s October 14, 2026 advisory says about Chat Hub chat-only users, affected versions, published fixes and temporary mitigation.",
  "description": "What n8n’s October 14, 2026 advisory says about Chat Hub chat-only users, affected versions, published fixes and temporary mitigation.",
  "date": "2026-10-18",
  "sourcesCheckedAt": "2026-10-18T14:16:20.098Z",
  "tags": [
    "n8n",
    "Production readiness",
    "Updates"
  ],
  "coverImage": "/blog/en/article-ebfba396-a14b-4ad6-a8c6-ab0252a24439/f65dce4f3b7859ffb4a0858f0056f07f096bf159bb7fd08308ce581110ae2560.webp",
  "coverAlt": "A chat-shaped key opens a tool gate, representing the permissions issue affecting Chat Hub chat-only users.",
  "seo": {
    "title": "Chat Hub chat-only users: n8n’s October 14 security advisory",
    "description": "What n8n’s October 14, 2026 advisory says about Chat Hub chat-only users, affected versions, published fixes and temporary mitigation.",
    "keywords": [
      "Chat Hub chat-only users",
      "Chat Hub announcement",
      "Chat Hub tool types",
      "Chat Hub sandbox"
    ]
  },
  "revision": "c0eb0d1302f9d3d3d5a51b92ea9fcb9ec8781df289889775acb797862a7c9606"
}
---

## What the Chat Hub announcement disclosed

Chat Hub chat-only users are the subject of n8n’s October 14, 2026 security advisory, GHSA-43v8-hjhm-chjp. The announcement discloses a permissions vulnerability and published fixes; it does not introduce an intended capability for these users. The advisory does not state when the vulnerable behavior began.

The issue concerns users with the chat user role, who cannot create or edit workflows but could exceed their role’s limits through tools. We think the key distinction is permission: a restricted chat role should be assessed by what it can invoke, as well as what it can edit.

Sources: [Chat Hub: chat-only users can register tool types the product already tries to sandbox · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-43v8-hjhm-chjp>)

## Chat Hub tool types and the sandbox boundary

![An open tool drawer sits beside a contained tool and folder, separating Chat Hub permissions from sandbox boundaries.](/blog/en/article-ebfba396-a14b-4ad6-a8c6-ab0252a24439/421c2181bf031f70ff186633fe5d82ff621f8f09062bfec2e06ca8008f3010ca.webp)

An open drawer and an intact enclosure distinguish tool access from execution containment.

According to the advisory, Chat Hub chat-only users could add and run tools that execute code in the task runner sandbox, access files within n8n-allowed directories, or use instance workflows, Data Tables and agents. These are the capabilities described in the disclosure, rather than evidence that customers experienced those actions.

The Chat Hub sandbox disclosure does not establish a sandbox escape or give exploitation frequency.

Sources: [Chat Hub: chat-only users can register tool types the product already tries to sandbox · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-43v8-hjhm-chjp>)

Lead a team reviewing agent and tool permissions? Our AI Agents with n8n program is the best practical training for developing that understanding together, using your team’s own tools, data and n8n instance. The link opens the For companies page on this site.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Published fixes and what administrators should do now

For teams administering instances with chat users, n8n recommends upgrading to a fixed version or later. Its October 14, 2026 advisory lists the following affected-version expressions and fixes without assigning release-channel labels to them.

**Version expressions and corresponding fixes listed in n8n’s advisory**

| Affected expression | Published fix |
| --- | --- |
| < 1.123.85 | 1.123.85 |
| < 2.43.5 | 2.43.5 |
| < 2.44.1 | 2.44.1 |

If administrators cannot upgrade immediately, the advisory includes temporarily disabling Chat Hub when it is unnecessary. It explicitly warns that its workarounds do not fully remediate the risk. This article covers that one temporary measure, rather than the full workaround list.

Our practical recommendation is to give an administrator ownership of comparing the deployed version with the published fixes and [arranging the upgrade](<https://n8n-challenges.app/en/blog/n8n-current-version-when-and-how-should-a-self-hosted-team-upgrade>). As an additional editorial suggestion, review which tool capabilities the team intends chat users to have; that review is separate from the advisory’s remediation.

Sources: [Chat Hub: chat-only users can register tool types the product already tries to sandbox · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-43v8-hjhm-chjp>)

## What the advisory leaves unspecified

The announcement does not state edition coverage, handling for other editions or hosted plans, n8n Cloud patch status, or deployment-specific handling. It also provides no upgrade commands, verification procedures or procedure for disabling Chat Hub. Those details should not be inferred from the version list.

As an additional editorial suggestion, ask [how upgrade completion will be checked](<https://n8n-challenges.app/en/blog/n8n-security-news-a-recurring-patch-checklist>).

Sources: [Chat Hub: chat-only users can register tool types the product already tries to sandbox · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-43v8-hjhm-chjp>)

For hands-on help reviewing your team’s setup and permission boundaries, choose our Workflow Audit: a review of your n8n instance and workflows for reliability, security and maintainability. The link opens the For companies page on this site, describing programs run with your own tools, data and n8n instance.

**[Review your team’s n8n setup](https://n8n-challenges.app/en/companies)**

Tags: n8n, Production readiness, Updates
