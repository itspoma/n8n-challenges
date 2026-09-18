---
{
  "id": "opp_00dd01b3-c3fc-4c84-aa98-5b5776b2ba9f",
  "locale": "en",
  "slug": "article-00dd01b3-c3fc-4c84-aa98-5b5776b2ba9f",
  "urlSlug": "n8n-io-pricing-what-a-team-actually-pays-in-production",
  "title": "n8n io pricing: What a Team Actually Pays in Production",
  "subtitle": "A practical guide to n8n io pricing: when the free self-hosted Community edition is enough, when n8n Cloud fits, and what triggers a Business or Enterprise licence.",
  "description": "A practical guide to n8n io pricing: when the free self-hosted Community edition is enough, when n8n Cloud fits, and what triggers a Business or Enterprise licence.",
  "date": "2026-09-18",
  "sourcesCheckedAt": "2026-09-18T22:04:31.337Z",
  "tags": [
    "n8n",
    "Self-hosting",
    "Tool comparison",
    "Guide"
  ],
  "coverImage": "/blog/en/article-00dd01b3-c3fc-4c84-aa98-5b5776b2ba9f/90e9acdac7bfe7dca5686ef65d600c5c82036d6f69787515f71638875dee4065.png",
  "coverAlt": "Scales weighing self-hosted server blocks against a licence key, illustrating n8n io pricing choices",
  "seo": {
    "title": "n8n io pricing: What a Team Actually Pays in Production",
    "description": "A practical guide to n8n io pricing: when the free self-hosted Community edition is enough, when n8n Cloud fits, and what triggers a Business or Enterprise licence.",
    "keywords": [
      "n8n io pricing",
      "n8n pricing enterprise",
      "n8n enterprise license cost",
      "n8n self hosted free"
    ]
  },
  "revision": "421015b4f9abef2fdd5ec393b3699963eedf51c5155b11d22e52bb431f3d114c"
}
---

## Two decisions, in order

Most confusion about n8n io pricing comes from mixing two separate questions. n8n's documentation frames them sequentially: first choose a deployment, Cloud (fully managed) or self-hosted, and only then choose a plan or edition. Its own decision table says both routes support production use, and that self-hosting the Community edition is the route for teams that want to run n8n without a licence cost.

Answer the deployment question with your infrastructure appetite, not your budget spreadsheet. If nobody on the team wants to own upgrades, backups and scaling, Cloud is the honest answer. [If you already run containers and databases, self-hosting is a real option](<https://n8n-challenges.app/en/blog/n8n-self-hosted-vs-cloud-one-webhook-workflow-in-production>), though none of the supplied sources quantify the infrastructure, maintenance or staffing cost that comes with it, so estimate that yourself.

**How to sequence the licensing decision**

1. **Pick deployment**: Decide between n8n Cloud and self-hosted before looking at any price.
2. **List blockers**: Write down the features your team cannot work without, such as SSO or shared projects.
3. **Estimate executions**: Convert your trigger frequencies into an expected monthly run count.
4. **Match edition**: Choose the cheapest plan or edition that covers both the blockers and the volume.
5. **Review licence**: Check the Sustainable Use License terms against how you intend to use n8n.

Sources: [Choose how to use n8n | n8n Docs](<https://docs.n8n.io/choose-how-to-use-n8n>)

## n8n self hosted free: what Community gives you

![Two toolboxes side by side showing the free Community edition next to a paid edition feature set](/blog/en/article-00dd01b3-c3fc-4c84-aa98-5b5776b2ba9f/fe8422122867c9741d2862cd9977a77af7456b5d6511f1fc5e48a3d986c5df82.png)

Conceptual comparison of what each n8n edition puts in a team's toolbox.

The n8n self hosted free option is not a trial. Per n8n's docs, the Community edition is free indefinitely and includes almost the complete feature set. Registering an email address unlocks a free licence key that adds folders, debug in editor and custom execution data. For a small team building internal automations, that is often the whole story.

What Community leaves out is mostly collaboration and governance, not capability. The same docs list SSO via SAML or LDAP, projects, environments, external secrets, log streaming, multi-main mode, workflow and credential sharing, and Git version control as excluded. Notably, queue mode and standard logging are included, so scaling execution throughput is not by itself a reason to pay. n8n also notes that exact feature lists change and points to its pricing page as the source of truth.

- Included free: queue mode, standard logging, and almost the full node set
- Included after registering an email: folders, debug in editor, custom execution data
- Not included: SSO via SAML or LDAP, projects, environments, external secrets
- Not included: log streaming, multi-main mode, sharing of workflows and credentials, Git version control

Sources: [Compare editions | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/community-edition-features>)

## Cloud plans, executions and overages

The published side of n8n io pricing starts with n8n Cloud: its pricing page lists the entry Starter plan at 20€ per month billed annually, including 2,500 workflow executions with unlimited steps. The key detail is what counts: billing is per full workflow run rather than per step, which makes estimates predictable even for long workflows.

[To estimate volume, n8n suggests reasoning from trigger frequency](<https://n8n-challenges.app/en/blog/n8n-pricing-estimate-one-workflows-real-production-cost>). Its illustrative examples put a daily schedule at roughly 30 to 31 executions a month and a five-minute schedule at about 8,600 to 8,900. These are vendor examples rather than measured customer data, but the arithmetic transfers directly to your own triggers.

**Estimating monthly executions from trigger frequency, using n8n's illustrative examples, n8n pricing page, 2026**

| Trigger pattern | Approx. runs per month | Fits Starter's 2,500? |
| --- | --- | --- |
| Once daily schedule | 30–31 | Yes |
| Every five minutes | 8,600–8,900 | No |
| Webhook or event-driven | Depends on event volume | Unknown |

Budget for overages explicitly. Exceeding a paid quota does not stop your workflows; the excess may be invoiced instead. n8n states a Business plan overage rate of 4,000 EUR per additional bucket of 300,000 executions. The pricing page carries no publication date, so these figures reflect n8n's pricing page as seen on 18 September 2026 and should be reconfirmed.

Sources: [n8n Plans and Pricing - n8n.io](<https://n8n.io/pricing/>)

Before you price anything, make sure the team can build what it is licensing. In the Valencia Greeting challenge you create a web address that greets its visitor from Valencia, using Webhook, Edit Fields and Respond to Webhook nodes in your own n8n environment.

**[Try the Valencia Greeting challenge](https://n8n-challenges.app/en/challenges/webhook-welcome)**

## n8n pricing enterprise: what actually triggers a licence key

The n8n enterprise license cost conversation usually starts with one specific blocker rather than volume. SSO is the clearest example, and its availability depends on deployment: n8n's docs state SSO is Enterprise-only on n8n Cloud, but available on Business or Enterprise when self-hosted. A team whose only requirement is single sign-on may therefore reach it more cheaply self-hosted. If you configure SSO through environment variables instead of the UI, note that this option is available from n8n 2.18.0.

**Where SSO is available, by deployment, per n8n documentation, 2026**

| Deployment | SSO available on |
| --- | --- |
| n8n Cloud | Enterprise |
| Self-hosted | Business, Enterprise |

So when collaboration or governance is the blocker, such as shared projects, credential sharing, environments or Git version control, price a self-hosted Business licence rather than buying more Cloud executions. Adding executions never unlocks those features.

One more check belongs to your legal team, not your platform team. n8n's source is published under the Sustainable Use License, which permits use or modification only for your own internal business purposes or non-commercial use, and allows distribution only free of charge. Separately, files with ".ee." in the filename or ".ee" in the directory name are carved out of that licence and require a valid n8n Enterprise Licence. Have counsel read both before you embed or resell anything built on n8n.

Sources: [Configure SSO | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/configure-sso>), [n8n/LICENSE.md at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/LICENSE.md>)

## A decision checklist you can run this week

![A hand ticking items on a paper roll, representing the n8n licensing decision checklist](/blog/en/article-00dd01b3-c3fc-4c84-aa98-5b5776b2ba9f/6abd10032a2047879039fc183bd24a005037e33808c4eca192c2314d5462f831.png)

Conceptual illustration of the editorial decision checklist.

Work through the list below with your actual workflows open. Most teams find the answer is simpler than the pricing page suggests: stay on the free Community edition until a named person is blocked by a named missing feature.

- [ ] Count your triggers and convert them into expected monthly workflow runs
- [ ] List every feature a teammate is actually blocked by today
- [ ] Check whether any blocker sits in the Community exclusion list
- [ ] Compare a self-hosted Business licence against extra Cloud executions for that blocker
- [ ] Add a budget line for invoiced overages
- [ ] Send the Sustainable Use License and the .ee carve-out to counsel

When that day comes, the decision is no longer about n8n io pricing at all. It is about whether your team has the shared conventions, including naming, review, credential handling and environments, that make a paid edition worth its licence.

Sources: [Compare editions | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/community-edition-features>), [n8n Plans and Pricing - n8n.io](<https://n8n.io/pricing/>), [n8n/LICENSE.md at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/LICENSE.md>)

If you are the person signing off the edition, a Workflow Audit examines how your team currently builds and operates workflows on your own n8n instance, tools and data, which is the fastest way to see whether a paid licence solves a real gap. The For companies page on this site describes that program alongside the other custom training formats; enquiries go through the LinkedIn link there.

**[Audit your team's n8n setup](https://n8n-challenges.app/en/companies)**

Tags: n8n, Self-hosting, Tool comparison, Guide
