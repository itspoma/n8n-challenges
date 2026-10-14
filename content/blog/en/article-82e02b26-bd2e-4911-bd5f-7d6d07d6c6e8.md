---
{
  "id": "opp_82e02b26-bd2e-4911-bd5f-7d6d07d6c6e8",
  "locale": "en",
  "slug": "article-82e02b26-bd2e-4911-bd5f-7d6d07d6c6e8",
  "urlSlug": "n8n-shared-workflow-credential-check-gap-advisory-ghsa-r6g9-5cpp-ppwr",
  "publishedAt": "2026-10-14T05:01:13.359Z",
  "title": "n8n Shared Workflow Credential Check Gap: Advisory GHSA-r6g9-5cpp-ppwr",
  "subtitle": "What the n8n shared workflow credential check advisory says about nested and tool inline sub-workflows, who is affected, and what to do now.",
  "description": "What the n8n shared workflow credential check advisory says about nested and tool inline sub-workflows, who is affected, and what to do now.",
  "date": "2026-10-14",
  "sourcesCheckedAt": "2026-10-13T18:01:11.997Z",
  "tags": [
    "n8n",
    "Production readiness",
    "Updates"
  ],
  "coverImage": "/blog/en/article-82e02b26-bd2e-4911-bd5f-7d6d07d6c6e8/7cdfe56e9b10d47269c230e431f55add85b0faa1333f02e15335e442882cbeee.png",
  "coverAlt": "Top-down view of keys, a shallow tray and nested boxes on a pink desk with a balloon.",
  "seo": {
    "title": "n8n Shared Workflow Credential Check Gap: Advisory GHSA-r6g9-5cpp-ppwr",
    "description": "What the n8n shared workflow credential check advisory says about nested and tool inline sub-workflows, who is affected, and what to do now.",
    "keywords": [
      "n8n shared workflow credential check",
      "n8n nested sub-workflow credentials",
      "n8n tool inline sub-workflow",
      "n8n credential sharing sub-workflows"
    ]
  },
  "revision": "479e96d35fc2b05a0816572bc6ea76c9974d19f6de2ccdc20110c02c07bdbdaa"
}
---

## What n8n announced on 30 September 2026

An n8n shared workflow credential check did not cover every case, according to advisory GHSA-r6g9-5cpp-ppwr. n8n published it on GitHub in the n8n-io/n8n repository for the n8n npm package on 30 September 2026, and it is rated High.

[The advisory's overall score is 7.2 on the CVSS v4 scale, per the advisory published on 30 September 2026](<https://github.com/n8n-io/n8n/security/advisories/GHSA-r6g9-5cpp-ppwr>). That is a severity rating assigned by the publisher. It does not measure real-world exploitation.

A note on terms: this article is about the n8n platform and its security advisory. The n8n Balloon Challenges learning website is a separate thing, and it is not affected by or involved in this advisory.

Sources: [Shared-Workflow Credential Check Misses Nested and Tool Inline Sub-Workflows · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-r6g9-5cpp-ppwr>)

## n8n shared workflow credential check: what changed

On n8n 1.x, the n8n shared workflow credential check runs at save time and is meant to stop people with edit access to a shared workflow from adding credentials they may not use. The advisory says that check looked at only one node type, one level deep. It does not name that node type.

Two other nodes also accept an inline workflow, and inline workflows can nest. That makes n8n nested sub-workflow credentials the uncovered area. The advisory says an editor could save a workflow whose embedded nodes reference credentials the editor cannot use. At execution, those nodes run with the owner's credential values.

![How the gap works, as the advisory describes it: 1. Editor saves; 2. Check is shallow; 3. Credentials slip in; 4. Runs as owner](/blog/en/article-82e02b26-bd2e-4911-bd5f-7d6d07d6c6e8/769ebcf8e1a8681151f415d0d68f63c994263bec91fe9409e5dc20ed3254b256.png)

The advisory describes this impact in general terms. It lists no CVE ID or CWE. The n8n tool inline sub-workflow case and nesting are the two paths its title names.

Sources: [Shared-Workflow Credential Check Misses Nested and Tool Inline Sub-Workflows · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-r6g9-5cpp-ppwr>)

## Who is affected: n8n 1.x below 1.123.83

The advisory lists affected versions as n8n below 1.123.83, and the fix is in 1.123.83 or later. It tells users to upgrade. It words the scope as the 1.x line; the final section covers what it leaves unsaid.

Workflow sharing matters here, and so does n8n credential sharing in sub-workflows. The n8n documentation says workflow sharing is available on n8n Cloud on all plans and on self-hosted Business and Enterprise. The docs also say editors can use all credentials in a shared workflow, even ones not explicitly shared with them. In our own reading, that sits awkwardly beside the advisory's premise, and the docs do not explain the difference. We treat it as background only, so treat the advisory as the authority on this issue.

In our view, teams that rely on shared workflows should not wait for clarity on that point. We would rather upgrade than guess who can reach whose credentials.

Sources: [Shared-Workflow Credential Check Misses Nested and Tool Inline Sub-Workflows · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-r6g9-5cpp-ppwr>), [Share with others | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/share-with-others>)

If your team shares workflows and credentials, n8n Advanced / Developer Training is, in our view, the best practical fit: it covers sub-workflows, credentials and architecture. The link opens the For companies page on this site; enquiries go through the LinkedIn link there.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## What to do now

![Stepping stones to a checked box with a padlock, for the n8n shared workflow credential check.](/blog/en/article-82e02b26-bd2e-4911-bd5f-7d6d07d6c6e8/f6c520f14ba77f8f2e18b4d4abdf6b153897a989f637718917393e1a4b72b78b.png)

Stepping stones leading to a checked box with a padlock and a balloon.

The advisory directs users to upgrade to 1.123.83 or later. Everything below is our own editorial suggestion, not the announcement's recommendation.

We suggest you [confirm your self-hosted n8n version first](<https://n8n-challenges.app/en/blog/n8n-current-version-when-and-how-should-a-self-hosted-team-upgrade>). If it is 1.x below 1.123.83, plan the upgrade to 1.123.83 or later, the version with the fixed n8n shared workflow credential check. The advisory also lists temporary mitigations for administrators who cannot upgrade immediately, so read them on the advisory page.

- [ ] Check your self-hosted n8n version
- [ ] Plan an upgrade to 1.123.83 or later if on 1.x below it
- [ ] Read the advisory's temporary mitigations if you cannot upgrade yet
- [ ] Check 2.x advisories separately if you run 2.x
- [ ] Review shared workflows with tool inline sub-workflows after upgrading

If you run 2.x, check the 2.x advisories and patch levels separately. After upgrading, we suggest reviewing shared workflows that use an n8n tool inline sub-workflow, which the advisory's title names.

Sources: [Shared-Workflow Credential Check Misses Nested and Tool Inline Sub-Workflows · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-r6g9-5cpp-ppwr>)

## What the announcement does not state

The advisory does not state whether 2.x releases are affected, whether n8n Cloud or other hosted plans are affected, or whether the flaw was exploited. It also gives no detection guidance and no credential-rotation advice for this advisory.

We would be cautious: if you cannot rule out that someone with edit access misused the gap, treat credential rotation as a decision for your own security review, since nothing here tells you either way.

Sources: [Shared-Workflow Credential Check Misses Nested and Tool Inline Sub-Workflows · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-r6g9-5cpp-ppwr>)

For a hands-on review of who can edit what and which credentials your shared workflows touch, our Workflow Audit is the best way to get this right for your team. The link opens the For companies page on this site; enquiries go through the LinkedIn link there.

**[Audit shared workflow credential access](https://n8n-challenges.app/en/companies)**

Tags: n8n, Production readiness, Updates
