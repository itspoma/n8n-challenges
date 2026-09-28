---
{
  "id": "opp_c9a257a9-6dc5-4f6d-b7ac-714b3f9e127d",
  "locale": "en",
  "slug": "article-c9a257a9-6dc5-4f6d-b7ac-714b3f9e127d",
  "urlSlug": "n8n-agents-announcement-what-changed",
  "publishedAt": "2026-09-28T11:46:10.048Z",
  "title": "n8n Agents Announcement: What Changed",
  "subtitle": "A plain read of the n8n Agents announcement from n8n's blog: what changed, who it affects across Cloud, self-hosted and Enterprise, and what to do now.",
  "description": "A plain read of the n8n Agents announcement from n8n's blog: what changed, who it affects across Cloud, self-hosted and Enterprise, and what to do now.",
  "date": "2026-09-28",
  "sourcesCheckedAt": "2026-09-28T11:31:27.061Z",
  "tags": [
    "n8n",
    "AI automation",
    "Updates"
  ],
  "coverImage": "/blog/en/article-c9a257a9-6dc5-4f6d-b7ac-714b3f9e127d/6bbe0bd86de6439903c6095a0d872e6f3e13af34e752b15e58a86d639142aa27.png",
  "coverAlt": "A fixed track loop beside a figure choosing its own path, showing the n8n Agents announcement alongside existing workflows.",
  "seo": {
    "title": "n8n Agents Announcement: What Changed",
    "description": "A plain read of the n8n Agents announcement from n8n's blog: what changed, who it affects across Cloud, self-hosted and Enterprise, and what to do now.",
    "keywords": [
      "n8n Agents announcement",
      "n8n Agents feature update",
      "n8n Agents explained"
    ]
  },
  "revision": "2430a9fca23c3009376e0e61b028cb50c068093b05fea1e735ca4e3b47b313b7"
}
---

## The n8n Agents announcement: what changed and when

On September 25, 2026, n8n published a blog post titled "Introducing n8n Agents," and this n8n Agents announcement describes a new Agent capability arriving in the product. The post states that n8n now has Agents, adding this capability to the product alongside the workflow canvas already in use.

For anyone trying to understand this n8n Agents announcement, the starting fact is simple: it adds a new way to build automations in n8n. Later sections cover what changed, what stayed the same, and who the announcement says is affected.

Sources: [Introducing n8n Agents – n8n Blog](<https://blog.n8n.io/introducing-n8n-agents/>)

If your team doesn't yet have an n8n account, you can follow along with n8n Cloud through this partner link, which opens n8n's own sign-up page, before checking how Agents behave on the latest stable version.

**[Sign up for n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## The core change and what stays the same

![One untouched toolbox beside another with a new compartment added, showing what changed and stayed the same in n8n.](/blog/en/article-c9a257a9-6dc5-4f6d-b7ac-714b3f9e127d/63addfc67bed274c034e01836c8b1dab22d681831e83e91f567e97864ce9fd22.png)

One closed toolbox beside another with a newly added compartment, arranged on a workbench.

According to the announcement, the core change is a distinct Agent capability in n8n, separate from the workflow canvas that already existed. The post does not quantify how many accounts or workflows this touches, or explain rollout mechanics beyond saying the capability is now part of the product.

The announcement is also explicit about what has not changed. It states that existing workflows built with the current AI Agent node are unaffected, saying plainly that nothing about it has changed. Teams that already rely on the AI Agent node inside a workflow are not asked to migrate anything because of this update.

- Changed: a new, distinct Agent capability now exists in n8n, alongside workflows
- Unchanged: the existing AI Agent node and any workflow already built with it
- Not stated by the announcement: user counts, migration steps, or a version number for the update

Sources: [Introducing n8n Agents – n8n Blog](<https://blog.n8n.io/introducing-n8n-agents/>)

## Who is affected: n8n Cloud, self-hosted and Enterprise timelines

![Three doorways in different states, representing n8n Cloud, self-hosted and Enterprise access to n8n Agents.](/blog/en/article-c9a257a9-6dc5-4f6d-b7ac-714b3f9e127d/bbcd485a67c690b5c862b1213b2b499622a06b87597004c8ebfef678be47995a.png)

Three doorways shown side by side: one fully open, one partly open, and one locked with a small clock nearby.

The announcement gives different availability for different editions, and this is the part ops and IT leads managing licensing should read closely. Agents are described as available now to everyone on [n8n Cloud](<https://n8n-challenges.app/en/blog/n8n-pricing-plans-for-teams-cloud-vs-self-hosted>) running the latest stable version, with no pricing tier named beyond that condition.

Self-hosted n8n also gets Agents, but the announcement notes it needs some additional setup compared with Cloud, without describing what that setup involves. [Self-hosted Enterprise support](<https://n8n-challenges.app/en/blog/n8n-enterprise-pricing-vs-community-whats-actually-gated>) is not yet available; the post describes it only as coming soon, with no date, version or timeline given. The announcement separately notes the feature is still in preview and may change.

**Agent availability as stated in the September 25, 2026 announcement**

| Edition | What the announcement states |
| --- | --- |
| n8n Cloud | Available now to everyone on the latest stable version |
| Self-hosted | Available now, with some additional setup not detailed in the post |
| Self-hosted Enterprise | Not yet available; described only as coming soon, no date given |

Sources: [Introducing n8n Agents – n8n Blog](<https://blog.n8n.io/introducing-n8n-agents/>)

Working out what this new Agent capability means for your team's editions, skills and rollout decisions is exactly the kind of session AI Agents with n8n is built for, run together on your own n8n instance and data.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Background: how agents differ from the chains and workflows n8n already had

n8n's documentation offers background that helps make sense of this n8n Agents feature update, even though it does not date the September 25 post itself. n8n's docs describe an agent generally as an autonomous, configurable assistant built inside n8n, distinct from a workflow that runs a fixed sequence of steps.

The docs also explain two supporting ideas the announcement builds on. A skill, in n8n's documentation, packages instructions together with the tools needed for a specific task. Publishing an agent takes a snapshot of the current draft, which is how a configured agent becomes the version that actually runs.

n8n's docs frame the distinction this way: one way to think of an agent is as a chain that knows how to make decisions, rather than following one predetermined path. That framing is useful background for readers who want n8n Agents explained in terms they already know from building chains or workflows.

**How an n8n agent is built and run, per n8n's documentation**

1. **Draft the agent**: Configure an autonomous assistant instead of a fixed sequence of steps.
2. **Add skills**: Bundle instructions with the tools the agent needs for a specific task.
3. **Publish**: Take a snapshot of the current draft to create the version that runs.
4. **Agent decides**: The published agent makes decisions rather than following one set path.

Sources: [Build and manage agents | Build | n8n Docs](<https://docs.n8n.io/build/build-and-manage-agents>), [What agents do | Build | n8n Docs](<https://docs.n8n.io/build/integrate-ai/understand-ai-components/what-agents-do>)

## What the announcement asks readers to do now, and what it leaves unstated

Beyond describing the change, the announcement's own statements about availability are the clearest guide to action: check whether you're on n8n Cloud, self-hosted, or self-hosted Enterprise, since each has different access today. Everything past that is this article's own suggestion, not the announcement's instruction.

- [ ] Confirm which edition your team runs: n8n Cloud, self-hosted, or self-hosted Enterprise
- [ ] If on Cloud, confirm you are running the latest stable version before expecting Agents to appear
- [ ] If self-hosted, expect to do some extra setup work the announcement does not itemize
- [ ] If on self-hosted Enterprise, treat Agents as not yet available and watch for a future update
- [ ] Our suggestion: before using Agents for anything customer-facing, try a low-stakes internal case first, since the post itself flags the feature as still in preview

The announcement does not state a version number or changelog entry for the update beyond its publish date, and it does not address pricing tiers, seat limits, or security and compliance implications of Agents. These are simply topics the post does not cover, not confirmed gaps in the feature itself.

Sources: [Introducing n8n Agents – n8n Blog](<https://blog.n8n.io/introducing-n8n-agents/>)

## Practical next steps for teams evaluating this change

For a team already running n8n, this n8n Agents announcement is worth a short internal review rather than an immediate rebuild. The open questions this announcement raises are about availability and setup across editions, not about whether current automations still work, since the announcement's own compatibility statement is covered earlier in this article.

Since the announcement's stated next step is simply to check which edition applies to a team, confirming that against current licensing and infrastructure plans is a reasonable starting point before any rollout planning begins for a team responsible for its own n8n setup.

Sources: [Introducing n8n Agents – n8n Blog](<https://blog.n8n.io/introducing-n8n-agents/>)

If your team needs to check how this update fits your current setup, tools and data before rolling anything out, a Workflow Audit reviews your n8n instance for reliability, security and maintainability on your own tools and data.

**[Audit your Agents readiness](https://n8n-challenges.app/en/companies)**

Tags: n8n, AI automation, Updates
