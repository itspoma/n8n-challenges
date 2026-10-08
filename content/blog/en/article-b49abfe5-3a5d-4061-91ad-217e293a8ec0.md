---
{
  "id": "opp_b49abfe5-3a5d-4061-91ad-217e293a8ec0",
  "locale": "en",
  "slug": "article-b49abfe5-3a5d-4061-91ad-217e293a8ec0",
  "urlSlug": "n8n-chat-trigger-xss-what-the-advisory-says-to-do-now",
  "publishedAt": "2026-10-08T08:22:46.372Z",
  "title": "n8n Chat Trigger XSS: What the Advisory Says to Do Now",
  "subtitle": "A plain-language look at the n8n Chat Trigger XSS advisory for the customCss parameter: what the GitHub advisory says changed, who it affects, and what to do now.",
  "description": "A plain-language look at the n8n Chat Trigger XSS advisory for the customCss parameter: what the GitHub advisory says changed, who it affects, and what to do now.",
  "date": "2026-10-08",
  "sourcesCheckedAt": "2026-10-08T08:03:46.959Z",
  "tags": [
    "Updates",
    "n8n",
    "Production readiness"
  ],
  "coverImage": "/blog/en/article-b49abfe5-3a5d-4061-91ad-217e293a8ec0/8a48b8019aa31107bb407d7698048152df3ec0893011874c25d03c15c906adfe.png",
  "coverAlt": "A cracked chat kiosk beside a locked turnstile shows the n8n Chat Trigger XSS exposed versus secured setup.",
  "seo": {
    "title": "n8n Chat Trigger XSS: What the Advisory Says to Do Now",
    "description": "A plain-language look at the n8n Chat Trigger XSS advisory for the customCss parameter: what the GitHub advisory says changed, who it affects, and what to do now.",
    "keywords": [
      "n8n chat trigger xss",
      "n8n customCss vulnerability",
      "n8n hosted chat security advisory",
      "n8n chat trigger security update"
    ]
  },
  "revision": "1ffb50a71c994b93f7193dfbcbc498250b664685d2246e67c0cdb2fa510fd98b"
}
---

## What Changed: The n8n Chat Trigger XSS Advisory

If you publish a chat widget using n8n's Chat Trigger node, the n8n Chat Trigger XSS advisory published on GitHub on September 30, 2026 is worth reading closely. Tracked as GHSA-x5cw-hm7v-q7mj, it describes a stored cross-site scripting bug in the Chat Trigger node's customCss parameter on hosted chat pages. GitHub's 2026 security overview for the n8n-io/n8n repository lists the same advisory as published September 30, 2026 by a researcher named Matsuuu, rated High severity. [The advisory's own CVSS v4 scoring, published Sep 30, 2026](<https://github.com/n8n-io/n8n/security/advisories/GHSA-x5cw-hm7v-q7mj>), puts the overall severity at 7.0.

According to the advisory, the vulnerability works through stored injection: a workflow editor's customCss value is saved against the Chat Trigger node and later rendered on the public hosted chat page. On a hosted chat page published without n8n user authentication, the advisory states the attacker's customCss content executes there for any visitor who loads the page. In effect, an unauthenticated hosted chat page becomes a delivery point for arbitrary script execution, because the browser treats the stored styling value as code rather than as plain CSS -- the core issue behind this n8n hosted chat security advisory.

Sources: [Overview · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security>), [n8n Chat Trigger Stored XSS via customCss Parameter on Hosted-Chat Page · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-x5cw-hm7v-q7mj>)

## Which n8n Chat Trigger Setups the customCss Vulnerability Affects

The advisory lists n8n versions below 1.123.83, 2.42.1, and 2.41.4 as affected by this n8n chat trigger xss issue, which the advisory also frames as the n8n customCss vulnerability on the hosted chat page, with versions at or above those numbers listed as patched. It does not say whether older legacy major versions outside that numbering carry the same flaw. As an editorial note, teams running unusual historical builds may want to check their own version against the cutoffs directly.

Impact also depends on how a given Chat Trigger page is published. The table below summarizes what the advisory states about each setup.

**What the advisory says about affected and unaffected Chat Trigger setups**

| Setup | Advisory's finding |
| --- | --- |
| Chat page with authentication set to None | Affected: injected customCss executes for any visitor who loads the page |
| Chat page with n8n User Auth enabled | Not affected, per the advisory |
| Instance below 1.123.83 / 2.42.1 / 2.41.4 | Affected |
| Instance at or above those versions | Patched |

The advisory names only n8n User Auth as the setting that is not affected. It does not state whether Basic Auth mode offers the same protection. We'd treat Basic Auth as unconfirmed rather than assume it blocks the same attack, since the advisory is specific about which setting it clears.

Sources: [n8n Chat Trigger Stored XSS via customCss Parameter on Hosted-Chat Page · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-x5cw-hm7v-q7mj>)

## Patch Now, Then Apply the Advisory's Temporary Mitigations

![A chain lock on a kiosk and a deadbolt being installed on a door depict temporary Chat Trigger mitigations.](/blog/en/article-b49abfe5-3a5d-4061-91ad-217e293a8ec0/76f0ca0c44eda0b89922fff42208cbb0d51320cb825cfdc23efb7181cb772c32.png)

A chain lock is fastened around a kiosk while a deadbolt is installed on a door in the background.

The fix is version-based: upgrading to n8n 1.123.83, 2.42.1, 2.41.4, or later installs the patch, per the advisory, as the core of this n8n chat trigger security update. Until you apply it, stored customCss content keeps executing for visitors to any affected hosted chat page. This article suggests treating the upgrade as the priority action, since the advisory itself lists patches and workarounds without ranking one above the other.

If you cannot upgrade immediately, the advisory lists several temporary mitigations, stating plainly that none of them fully remediates the risk until the instance is patched.

- [ ] Enable authentication on Chat Trigger nodes
- [ ] Restrict instance access to trusted users
- [ ] Audit existing customCss values for unexpected content
- [ ] Deactivate Chat Trigger workflows that are not in active use

In our view, applying these four mitigations together is the pragmatic move while you schedule the version upgrade, since the advisory itself says none of them closes the gap alone.

Sources: [n8n Chat Trigger Stored XSS via customCss Parameter on Hosted-Chat Page · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-x5cw-hm7v-q7mj>)

If your team manages multiple public-facing Chat Trigger workflows, now is a good moment to get everyone on the same page about secure configuration. Our n8n Advanced / Developer Training program, run on your own n8n instance and data, is the best practical way to train your team on credentials, authentication and workflow architecture decisions like this one. The link opens our For companies page on this site, where you can reach out through the LinkedIn link there.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Background: How n8n's Chat Trigger Authentication Setting Works

n8n's Chat Trigger node documentation states that selecting None for chat authentication means no login is required to use the chat. This is background product information, not advisory content, and it does not mention the customCss vulnerability at all.

The same documentation states that selecting n8n User Auth restricts the chat to users who are already logged in to an n8n account. It's useful context for understanding the setting the advisory names as unaffected, but the documentation itself offers no view on security.

Sources: [Chat Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger>)

## What the Advisory Does Not Say

The advisory records no CVE ID and no CWE classification for this n8n chat trigger xss issue, per the supplied text, so it is not yet cross-referenced in general vulnerability databases under a separate identifier. It also does not state whether n8n Cloud-hosted instances were patched automatically or whether self-hosted administrators must apply the upgrade themselves; the advisory simply does not address that question.

Nor does the advisory distinguish impact across n8n's Community and Enterprise editions beyond the version numbers it gives, and no source here confirms real-world exploitation; the advisory describes the flaw and its severity rating, not observed incidents. We think routinely auditing customCss fields is a good habit for any team publishing hosted chat pages, even after patching, because the field accepted unsafe input before this fix.

Sources: [n8n Chat Trigger Stored XSS via customCss Parameter on Hosted-Chat Page · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-x5cw-hm7v-q7mj>), [Overview · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security>)

Beyond this one advisory, it's worth knowing whether any of your team's hosted chat pages are still running loose authentication settings or unreviewed customCss values. Our Workflow Audit reviews a company's n8n instance and workflows for reliability, security and maintainability, and it's the best way for your team to get this right before the next advisory lands. The link opens our For companies page on this site, where enquiries go through the LinkedIn link there.

**[Audit your Chat Trigger security](https://n8n-challenges.app/en/companies)**

Tags: Updates, n8n, Production readiness
