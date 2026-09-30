---
{
  "id": "opp_8ab3094d-f740-4fae-811c-bcd7858d04d0",
  "locale": "en",
  "slug": "article-8ab3094d-f740-4fae-811c-bcd7858d04d0",
  "urlSlug": "hetzner-vs-digitalocean-for-self-hosting-n8n",
  "publishedAt": "2026-09-30T11:56:38.532Z",
  "title": "Hetzner vs DigitalOcean for Self-Hosting n8n",
  "subtitle": "Hetzner vs DigitalOcean compared on server specs, pricing and documented setup effort for teams self-hosting n8n, plus what official docs leave out.",
  "description": "Hetzner vs DigitalOcean compared on server specs, pricing and documented setup effort for teams self-hosting n8n, plus what official docs leave out.",
  "date": "2026-09-30",
  "sourcesCheckedAt": "2026-09-30T11:30:49.704Z",
  "tags": [
    "Self-hosting",
    "Production readiness",
    "n8n",
    "Comparison"
  ],
  "coverImage": "/blog/en/article-8ab3094d-f740-4fae-811c-bcd7858d04d0/9cf7b1f1255810e880789c4bf117a786063053dce8ea1f696de78625851c8705.png",
  "coverAlt": "Two open toolboxes representing a choice between two self-hosting providers for an automation server.",
  "seo": {
    "title": "Hetzner vs DigitalOcean for Self-Hosting n8n",
    "description": "Hetzner vs DigitalOcean compared on server specs, pricing and documented setup effort for teams self-hosting n8n, plus what official docs leave out.",
    "keywords": [
      "hetzner vs digitalocean"
    ]
  },
  "revision": "4ee9772130902925b3b5c93205177a02984ae2bbc864e89f456fa3ec1c7702de"
}
---

## Server specs at a glance: Hetzner Cloud vs DigitalOcean Droplets

![Side-by-side server boxes comparing Hetzner vs DigitalOcean specifications for self-hosting n8n.](/blog/en/article-8ab3094d-f740-4fae-811c-bcd7858d04d0/d1f60c01302bc02c26add9ba22e9040d05320a0e603718f69ed6633642289c39.png)

A conceptual comparison of comparable server tiers from two hosting providers.

When a team compares Hetzner vs DigitalOcean for self-hosting n8n, the first question is usually simple: what does a comparable server actually include. Hetzner's Cloud Regular Performance line lists a CPX22 tier with 2 AMD vCPUs, 4 GB of RAM and 80 GB of NVMe storage, according to Hetzner's own pricing page. On DigitalOcean's side, a Basic Droplet with a matching 4 GiB of RAM and 2 vCPUs sits on the Regular CPU tier, per DigitalOcean's documentation.

Bandwidth is bundled differently. Hetzner's documentation states that EU-region cloud servers, including its Falkenstein, Nuremberg and Helsinki locations, include at least 20 TB of outbound traffic before extra charges apply. DigitalOcean positions its shared-CPU Basic Droplets as the lower-cost option for workloads that do not need guaranteed dedicated compute, according to DigitalOcean's own sizing guidance dated 2026 — a description that fits a typical single-instance n8n setup.

**Comparable server tiers for self-hosting n8n**

| Criterion | Hetzner CPX22 | DigitalOcean Basic (4 GiB / 2 vCPU) |
| --- | --- | --- |
| vCPUs | 2 AMD vCPUs | 2 vCPUs |
| RAM | 4 GB | 4 GiB |
| Storage | 80 GB NVMe | 80 GiB |
| Included outbound transfer | At least 20 TB in EU locations | Not documented in the sources used for this comparison |
| Source | Hetzner's own pricing documentation | DigitalOcean's own pricing documentation |

Sources: [Hetzner Virtual Private Server: Best Price-Performance Ratio](<https://www.hetzner.com/cloud/regular-performance/>), [Choosing the Right CPU Droplet Plan | DigitalOcean Documentation](<https://docs.digitalocean.com/products/droplets/concepts/choosing-a-plan/>), [Droplet Pricing | DigitalOcean](<https://www.digitalocean.com/pricing/droplets>)

Before comparing servers, readers without an n8n account yet can sign up for n8n Cloud through this partner link, which opens n8n's own sign-up page, and follow along with a workspace of their own while reading the rest of this comparison.

**[Sign up for n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Pricing structure: Hetzner vs DigitalOcean billing, caps and bandwidth

Hetzner vs DigitalOcean pricing structures diverge more in billing mechanics than in headline numbers. Hetzner's own published rates do not include a monthly price for the CPX22 tier used in the specs comparison above. The closest documented figure is Hetzner's CX23 instance, a different Hetzner cloud tier with its own, separately priced specs, not the CPX22 line described above.

A mid-2026 price adjustment set the CX23 rate at $6.49 per month in US dollars, up from $4.99, effective for new orders from 15 June 2026, according to Hetzner's own published rates. That figure only illustrates how Hetzner's cloud pricing is structured and adjusted; it is not a like-for-like price against DigitalOcean's CPX22-equivalent tier, and it excludes VAT and any IPv4 add-on.

DigitalOcean's bundled Droplet plans start as low as $4 per month for its entry-level tier, per DigitalOcean's pricing page. The 4 GiB / 2 vCPU tier that matches Hetzner's CPX22 specs from the table above costs $24 per month on DigitalOcean's Regular CPU tier.

**How Hetzner and DigitalOcean structure their prices**

| Criterion | Hetzner | DigitalOcean |
| --- | --- | --- |
| Billing granularity | Hourly rate with a monthly price cap | Per-second billing, minimum 60 seconds or $0.01 |
| Entry-level monthly price | Not available for the CPX22 tier in these sources | $4 per month for the smallest Basic Droplet |
| Nearest documented comparable price | CX23 (a different tier): $6.49 per month as of a mid-2026 adjustment | $24 per month for the 4 GiB / 2 vCPU Basic Droplet |
| Bandwidth beyond the included allowance | Folded into a larger allowance bundled with the base EU price | $0.01 per GiB beyond the included allowance |

Billing granularity also differs. DigitalOcean bills bundled-plan Droplets per second, with a minimum charge of 60 seconds or $0.01, whichever is higher, according to DigitalOcean's documentation dated 25 August 2026. Beyond each Droplet's included transfer allowance, DigitalOcean charges $0.01 per GiB for outbound data, while inbound transfer stays free. Hetzner folds a larger transfer allowance into its base EU price instead, so the two providers push bandwidth costs into different parts of the bill. These figures reflect the dates stated above and may have changed since then, so a team should check each provider's current pricing page before deciding.

Sources: [Hetzner Virtual Private Server: Best Price-Performance Ratio](<https://www.hetzner.com/cloud/regular-performance/>), [Hetzner Price Adjustment 15 June 2026 - Hetzner Docs](<https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/>), [Droplet Pricing | DigitalOcean Documentation](<https://docs.digitalocean.com/products/droplets/details/pricing/>), [Droplet Pricing | DigitalOcean](<https://www.digitalocean.com/pricing/droplets>)

## Setup effort: firewall and network provisioning on each platform

![A sequence of gates illustrating the firewall provisioning steps for a self-hosted server.](/blog/en/article-8ab3094d-f740-4fae-811c-bcd7858d04d0/a65827ff96d658e52ac2e038006081b3a0d7212dfe3863c67e30d1160ef8b4c8.png)

An illustrative sequence for setting up default-deny network rules before exposing a server.

Both providers document a rule-based, default-deny firewall model, so the setup effort looks similar on paper. Hetzner Cloud Firewalls, created manually in the Console per documentation from 2021, support up to 500 effective inbound and outbound rules per firewall. DigitalOcean's Cloud Firewalls are a network-based, stateful service provided to Droplets at no additional cost, according to DigitalOcean's documentation dated 13 July 2026, and they default to blocking all traffic unless a rule explicitly allows it.

For a team exposing n8n's webhook endpoints, that default-deny posture matters more than the interface used to configure it. Neither provider's firewall documentation supplied here walks through combining these rules with [n8n's own webhook or reverse-proxy setup](<https://n8n-challenges.app/en/blog/self-hosted-n8n-production-readiness-checklist>), so a team should treat the general firewall docs as a starting point rather than an n8n-specific guide.

**A typical firewall provisioning sequence**

1. **Create the firewall**: Define a named firewall resource in the provider's console or CLI.
2. **Set default-deny**: Leave all inbound traffic blocked except rules that are explicitly added.
3. **Add explicit rules**: Open only the ports n8n and its reverse proxy actually need.
4. **Attach to the server**: Link the firewall to the running instance before exposing it publicly.

Sources: [Creating a Firewall - Hetzner Docs](<https://docs.hetzner.com/cloud/firewalls/getting-started/creating-a-firewall/>), [How to Create Firewalls | DigitalOcean Documentation](<https://docs.digitalocean.com/products/networking/firewalls/how-to/create/>)

Deciding when to move from a single instance to n8n's queue mode is an architecture decision, not just a server-sizing one. n8n Balloon Challenges' own n8n Advanced / Developer Training covers architecture, error handling and production setup on a team's own tools and instance, and can help a team make that call with confidence. It opens the For companies page on this site.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## What official docs leave out: installing n8n itself

Neither Hetzner's nor DigitalOcean's official documentation, as supplied for this comparison, covers installing n8n itself: no provider-specific steps for [Docker, database setup or reverse-proxy TLS](<https://n8n-challenges.app/en/blog/n8n-deployment-options-self-hosting-and-queue-mode>) appear in either provider's docs. That gap is worth planning for, because a bare VPS from either provider is just compute, storage and networking, not a running n8n instance.

Whichever provider a team picks, it still needs to follow n8n's own self-hosting installation guide separately from the VPS provider's docs. For readers who want to practice the workflow-building side of n8n before committing to server choices, n8n Balloon Challenges' hands-on exercises can be completed using either [n8n Cloud or a self-hosted n8n instance](<https://n8n-challenges.app/en/challenges/idealista-morning-brief>), so the same challenge works regardless of which hosting path a team eventually chooses.

## Sizing the server: what n8n's own scaling guidance says

![A single growing server box beside a cluster of worker boxes showing two ways to scale n8n.](/blog/en/article-8ab3094d-f740-4fae-811c-bcd7858d04d0/175e10218b7360de2bc3c7177c1491a169a02d50e0c18e744f7878f34583db1e.png)

A conceptual illustration of resizing one server versus adding worker processes in queue mode.

Rather than buying an ever-larger single box, n8n's own documentation recommends [queue mode](<https://n8n-challenges.app/en/blog/n8n-queue-mode-redis-when-to-leave-single-instance-mode>) as the way to scale n8n across multiple worker processes, calling it the setup that provides the best scalability. The same documentation states that running n8n at scale, with many users, workflows or executions, requires changing the default configuration for good performance.

n8n's documentation, as supplied here, does not give concrete CPU or RAM thresholds for a small-team production instance beyond that general statement. That makes a Hetzner CPX22 or a comparably sized DigitalOcean Basic Droplet a reasonable starting point for a handful of workflows, with queue mode as the documented next step once execution volume grows rather than a bigger single server.

Sources: [Scaling | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling>)

## Choosing between Hetzner and DigitalOcean for a team's n8n instance

![A clipboard with tags being checked off representing a team's checklist for choosing a hosting provider.](/blog/en/article-8ab3094d-f740-4fae-811c-bcd7858d04d0/b123fba0f650cf77b3e229c8d8c5952163ca5de96793e858215970ad0931c9fc.png)

An illustrative checklist for a team finalizing its provider and server choice.

After weighing Hetzner vs DigitalOcean on specs, pricing and setup effort, the two providers land close enough that the decision often comes down to how a team prefers to manage infrastructure rather than a clear price winner. Jonas, co-founder at Sliplane, put it plainly in his own comparison of cloud providers for self-hosting n8n:

> “If you prefer full control and don't mind doing the work, Hetzner and DigitalOcean are good choices.”
>
> — Jonas, Co-Founder at Sliplane, as stated on the page · Source: [What Cloud Provider Should You Use for Self-Hosted n8n? - DEV Community](<https://dev.to/code42cate/what-cloud-provider-should-you-use-for-self-hosted-n8n-2k8>)

That framing matches what the documentation shows: both providers require a team to configure its own firewall, size its own server and install n8n separately from the VPS itself.

- [ ] Confirm the comparable tier's real monthly cost, including VAT, IPv4 or backup add-ons on Hetzner and any bandwidth overage on DigitalOcean
- [ ] Start with a shared-CPU tier, such as Hetzner's CPX line or a DigitalOcean Basic Droplet, sized for a handful of workflows
- [ ] Plan the move to n8n's queue mode once execution volume grows, rather than resizing a single server indefinitely
- [ ] Set up a default-deny firewall on whichever provider is chosen before exposing n8n's webhook endpoints
- [ ] Budget separate time for n8n's own installation docs, since neither provider's docs cover installing n8n itself

Sources: [Hetzner Price Adjustment 15 June 2026 - Hetzner Docs](<https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/>), [Droplet Pricing | DigitalOcean Documentation](<https://docs.digitalocean.com/products/droplets/details/pricing/>), [Scaling | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling>)

Once a provider and server size are chosen, the safer next step is to have the actual instance checked rather than guessing. n8n Balloon Challenges' Workflow Audit reviews a team's n8n instance and workflows for reliability, security and maintainability on the team's own setup. It opens the For companies page on this site.

**[Review your team's n8n setup](https://n8n-challenges.app/en/companies)**

Tags: Self-hosting, Production readiness, n8n, Comparison
