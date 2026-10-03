---
{
  "id": "opp_d35f15c4-bbd7-4b2e-99db-a0463dff09ea",
  "locale": "en",
  "slug": "article-d35f15c4-bbd7-4b2e-99db-a0463dff09ea",
  "urlSlug": "cross-user-agent-chat-resume-what-the-september-2026-advisory-says",
  "publishedAt": "2026-10-03T08:36:31.765Z",
  "title": "Cross-User Agent Chat Resume: What the September 2026 Advisory Says",
  "subtitle": "What the September 30, 2026 GitHub advisory says about the cross-user agent chat resume vulnerability: what changed, who's affected, and what to do now.",
  "description": "What the September 30, 2026 GitHub advisory says about the cross-user agent chat resume vulnerability: what changed, who's affected, and what to do now.",
  "date": "2026-10-03",
  "sourcesCheckedAt": "2026-10-03T08:23:55.844Z",
  "tags": [
    "n8n",
    "AI automation",
    "Updates"
  ],
  "coverImage": "/blog/en/article-d35f15c4-bbd7-4b2e-99db-a0463dff09ea/8b193cda7b3d9a5ae0bf27e1f7f96d96c840d60891e8d7c74b1026cc43e92b06.png",
  "coverAlt": "A second hand stamps approval on someone else's paused chat ticket, illustrating the cross-user agent chat resume vulnerability.",
  "seo": {
    "title": "Cross-User Agent Chat Resume: What the September 2026 Advisory Says",
    "description": "What the September 30, 2026 GitHub advisory says about the cross-user agent chat resume vulnerability: what changed, who's affected, and what to do now.",
    "keywords": [
      "cross-user agent chat resume",
      "hijacking pending tool approval",
      "agent chat security vulnerability",
      "AI agent chat resume flaw"
    ]
  },
  "revision": "bd8f12ea9e73a2e16a7b2cca8594e8d14d268c1e06dc86f4a7801ec9ebe5a168"
}
---

## Updates

On September 30, 2026, a GitHub security advisory announced a cross-user agent chat resume vulnerability affecting the n8n npm package. The advisory, titled "Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval," is the primary source for everything this article states about the issue.

We cover only what the advisory itself says about this agent chat security vulnerability: what changed, who it affects by version number, and what the advisory states as the fix and the temporary workarounds. Where the advisory stays silent, for example on n8n Cloud or other hosted plans, we say so plainly rather than guessing.

Sources: [Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-p3pg-xw4f-m72c>)

## What Was Announced and When

The advisory was published on github.com on September 30, 2026, under the title naming the cross-user agent chat resume problem directly. It describes a flaw in how a shared n8n project handles a paused agent conversation that is waiting for a human to approve a tool call.

The advisory documents this AI agent chat resume flaw as an authorization gap: the system does not verify that the user resuming a chat is the same user who started it, in a project shared by multiple people.

Sources: [Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-p3pg-xw4f-m72c>)

## How the Vulnerability Enables Hijacking Pending Tool Approval

![A second hand reaches for a paused chat note waiting on someone else's tool approval.](/blog/en/article-d35f15c4-bbd7-4b2e-99db-a0463dff09ea/577e7d1b64c0336fb34485228357712e7154fecfd7c76403c5ac005eb887a2af.png)

This image shows a shared conversation note being picked up by someone other than the person who started it.

According to the advisory, an attacker who has access to a shared project can read another user's private agent conversation in full. Once inside that conversation, the attacker can answer a pending approval on the victim's behalf, letting the tool run and writing its result back into the victim's own conversation thread.

We think this is a useful reminder that a human-approval step is only as strong as the identity check around it; an approval gate that anyone in a shared workspace can click is not really a gate. The advisory itself frames the exposure as [hijacking pending tool approval](<https://n8n-challenges.app/en/blog/n8n-human-in-the-loop-adding-an-approval-step-to-an-ai-agent>) that was never meant to be answered by anyone but the original requester.

Sources: [Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-p3pg-xw4f-m72c>)

If your team is building agent workflows with human approval steps, our AI Agents with n8n program trains your team, on your own n8n instance, to design approvals, tool access and shared-project boundaries so a gap like this one is easier to spot before it ships.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Who and Which Versions Are Affected

The advisory lists the n8n npm package as affected before version 2.42.0 and before version 2.41.4. This cross-user agent chat resume issue therefore applies to anyone running one of those earlier builds with multiple users sharing project-level access to agents that use tool approval.

**Affected and fixed n8n npm package versions, per the advisory**

| Status | Version range | What the advisory says |
| --- | --- | --- |
| Affected | Before 2.42.0 and before 2.41.4 | Listed as vulnerable to the cross-user chat resume issue |
| Fixed | 2.42.0 and 2.41.4 | Listed as the versions where the issue is fixed |

Sources: [Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-p3pg-xw4f-m72c>)

## What to Do Now: Patching and Temporary Workarounds

![Upgrading n8n and restricting shared access are checked off as steps against the vulnerability.](/blog/en/article-d35f15c4-bbd7-4b2e-99db-a0463dff09ea/406a04b690aacf925802f3044050185aea5dcf4bee576b65ec4b55683682dada.png)

This image shows the upgrade and access steps the advisory lists as fixes and temporary mitigations.

The advisory states that the issue has been fixed in n8n versions 2.42.0 and 2.41.4, and it tells users to upgrade to one of those versions or later. That upgrade is the one remediation the advisory actually recommends.

For teams that cannot upgrade immediately, the advisory lists several temporary mitigations: disabling the Agents module through the N8N_ENABLED_MODULES setting, restricting instance access to trusted users, limiting who belongs to [a shared project](<https://n8n-challenges.app/en/blog/n8n-security-checklist-for-a-shared-self-hosted-instance>), and avoiding tools with "Require approval" enabled on agents that multiple people can reach.

- [ ] Upgrade to n8n 2.42.0, 2.41.4, or a later version
- [ ] If you cannot upgrade yet, disable the Agents module via N8N_ENABLED_MODULES
- [ ] Restrict instance access to trusted users only
- [ ] Limit who belongs to each shared project
- [ ] Avoid enabling "Require approval" on agents shared by multiple people

In our view, the advisory's own caution matters here: it says plainly that these workarounds do not fully remediate the risk, so we would not rely on any single one of them and would treat the upgrade as the real fix rather than a nice-to-have.

Sources: [Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-p3pg-xw4f-m72c>)

## What the Announcement Does Not State

The advisory does not say whether n8n Cloud or other hosted plans are affected; that question is simply not addressed in the text we reviewed. It also does not explain how long the issue existed before discovery, how many instances were exposed, or whether anyone exploited it before the fix.

- Whether n8n Cloud or other hosted plans are affected
- Whether Community and Enterprise editions differ in exposure
- How long the flaw existed before it was found
- Whether it was exploited before the fix shipped

The advisory does not state whether a CVE identifier has been assigned to this issue or give a numeric severity score; those specifics are not addressed in the findings we reviewed. In our view, not having a CVE on hand is a minor friction point for vulnerability trackers rather than a sign the issue is less serious, so teams that rely on CVE feeds should still track this one by its advisory title for now.

Sources: [Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-p3pg-xw4f-m72c>)

Patching is the advisory's own fix, but knowing whether your shared projects, approval settings and module configuration are safe today is a separate question. Our Workflow Audit reviews a team's n8n instance and workflows for exactly these reliability and security gaps.

**[Audit your shared agent setup](https://n8n-challenges.app/en/companies)**

Tags: n8n, AI automation, Updates
