---
{
  "id": "opp_f275ab72-42e3-40eb-8518-baee224cd01d",
  "locale": "en",
  "slug": "article-f275ab72-42e3-40eb-8518-baee224cd01d",
  "urlSlug": "n8n-2-45-announcement-changes-and-limits-for-teams",
  "publishedAt": "2026-10-23T08:46:24.953Z",
  "title": "n8n 2.45 announcement: changes and limits for teams",
  "subtitle": "Read the n8n 2.45 announcement for integration changes, agent publishing updates and team review features, with clear limits on availability and dates.",
  "description": "Read the n8n 2.45 announcement for integration changes, agent publishing updates and team review features, with clear limits on availability and dates.",
  "date": "2026-10-23",
  "sourcesCheckedAt": "2026-10-23T06:48:07.454Z",
  "tags": [
    "n8n",
    "Production readiness",
    "Updates"
  ],
  "coverImage": "/blog/en/article-f275ab72-42e3-40eb-8518-baee224cd01d/687d985b1ba2fcb9baa65cba10917597ca5e9ac9bc34fd1878f31f1699c4351b.webp",
  "coverAlt": "Hands inspect branching workflow blocks and a replacement component for the n8n 2.45 announcement.",
  "seo": {
    "title": "n8n 2.45 announcement: changes and limits for teams",
    "description": "Read the n8n 2.45 announcement for integration changes, agent publishing updates and team review features, with clear limits on availability and dates.",
    "keywords": [
      "n8n 2.45 announcement",
      "n8n 2.45 changes",
      "n8n 2.45 release notes",
      "n8n 2.45 update"
    ]
  },
  "revision": "aab044492d896394278c523a4253f935082feedc72563a2daedcd6c5e853efc2"
}
---

## The n8n 2.45 announcement and its release date

The n8n 2.45 announcement is recorded in the official release notes with a release date of October 20, 2026. It covers integration versions, agent publishing, AI run visibility and team review tools. The entry does not separately state an announcement publication date, so October 20 should be described as the release date.

The changes affect users of the specific nodes and interfaces described below. The announcement does not establish edition-specific eligibility, hosted-plan coverage or universal availability. We think teams should read this as a feature-by-feature review rather than assume every change applies to their setup.

Sources: [Release notes](<https://docs.n8n.io/changelog/release-notes.md>)

## n8n 2.45 changes for integrations

![Two workflow assemblies sit side by side as a hand fits a new component into one.](/blog/en/article-f275ab72-42e3-40eb-8518-baee224cd01d/81e7a9f57cd1573643ed632e0b977b1c3781d743c42189938400a13e5312c516.webp)

Separate assemblies illustrate the distinction between existing workflows and newly added integration nodes.

The integration changes distinguish newly added nodes from existing workflows. This table summarizes the behavior stated in the n8n 2.45 release notes.

**Integration behavior described in the official n8n 2.45 entry**

| Area | New behavior | Existing workflows |
| --- | --- | --- |
| Monday.com | New nodes default to V2 with resource locators | Remain on V1 |
| Monday.com resources | V2 has V1 resource parity and fixes Column creation with a blank Column ID | Remain on V1 |
| Kafka version | New nodes and triggers default to V2 using librdkafka | Retain saved versions |
| Kafka compression | V2 adds Snappy, LZ4 and Zstd support | Retain saved versions |
| Kafka V2 output | Producers emit one item per input record | Retain saved versions |
| Kafka V2 Acks | Maps to all in-sync replicas | Retain saved versions |

For Azure OpenAI Chat Model users in n8n 2.45, Microsoft Foundry API Key and Entra ID credentials gain an optional Project field when Endpoint Type is Microsoft Foundry. Deployment listing uses the credential project when the node Project is empty; a populated node Project takes precedence.

Our suggested review is to check downstream Kafka output handling and the intended Foundry Project selection before adopting those changes. The announcement does not provide a migration procedure for existing Kafka workflows.

Sources: [Release notes](<https://docs.n8n.io/changelog/release-notes.md>)

## Agent publishing and AI feedback

![An agent mechanism waits behind a gate while a workflow tool is secured.](/blog/en/article-f275ab72-42e3-40eb-8518-baee224cd01d/8bd3cf35cd97477570aa56ac578fa06eec19581a6572512ea43f3b6b4b9baccb.webp)

A closed gate stands beside an agent mechanism while a hand secures a smaller tool connection.

For teams publishing agents, n8n 2.45 adds a confirmation explaining that later changes require republishing. Unpublished workflow tools appear with publication links and block agent publication. The announcement does not supply a broader agent deployment or rollback procedure.

For users inspecting AI runs, the AI log header shows the answering model in Rendered and JSON views when run data contains a model name. That model can differ from the node’s configured model. In Agent builder, Settings refreshes monthly budget usage after a turn finishes; if refresh fails, it keeps the last known value. The sub-agent selector also gains each agent’s personalized icon and gradient.

Text Classifier users can optionally include the category, its model confidence score and a category-score map. In n8n 2.45, the option defaults off and preserves existing output when disabled, without a node version bump. These scores do not establish classification accuracy or calibrated probabilities.

In our view, publication state deserves a place in a team’s change review, while confidence output deserves caution before anyone treats it as a quality verdict.

Sources: [Release notes](<https://docs.n8n.io/changelog/release-notes.md>)

Lead a team reviewing changed node behavior? Our n8n Advanced / Developer Training helps your team work through APIs, error handling and architecture using your own tools, data and n8n instance. The link opens the For companies page on this site.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Migration notifications and workflow reviews

For admins reviewing migration rules, the n8n 2.45 announcement adds individual and bulk owner-email notifications. Individual notifications require configured SMTP and an owner email. Bulk notifications require SMTP and the breakingChanges:migrate scope. Notified findings still need resolution; skipped bulk rows produce a warning explaining why they were skipped.

For teams reviewing multiple workflows in the Inbox, n8n 2.45 lists each workflow’s name and pinned version in a collapsible item. Only one item opens and renders its diff at a time, and selection persists between Activity and Changes. The announcement supplies no performance benchmark.

Sources: [Release notes](<https://docs.n8n.io/changelog/release-notes.md>)

## What to review before using the update

The n8n 2.45 announcement describes changed behavior rather than a [complete upgrade procedure](<https://n8n-challenges.app/en/blog/n8n-current-version-when-and-how-should-a-self-hosted-team-upgrade>). Deployment commands and troubleshooting instructions are not provided here. The checklist below is our editorial suggestion for reviewing the n8n 2.45 update, not an action plan issued by n8n.

- [ ] Identify which announced nodes and interfaces your team uses.
- [ ] Assign an owner to coordinate the team’s review.
- [ ] Record questions that need answers before adoption.
- [ ] Document the team’s adoption decision and its reasons.

Sources: [Release notes](<https://docs.n8n.io/changelog/release-notes.md>)

Need hands-on help assessing your team’s affected workflows? Our Workflow Audit reviews your n8n instance and workflows for reliability, security and maintainability. The link opens the For companies page on this site, which describes our custom training and automation programs.

**[Audit workflows affected by 2.45](https://n8n-challenges.app/en/companies)**

Tags: n8n, Production readiness, Updates
