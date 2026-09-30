---
{
  "id": "opp_8e9e88be-5d7d-4cfa-944e-85c2ea5c5063",
  "locale": "en",
  "slug": "article-8e9e88be-5d7d-4cfa-944e-85c2ea5c5063",
  "urlSlug": "how-to-install-n8n-a-team-pre-commitment-checklist",
  "publishedAt": "2026-09-30T12:57:00.584Z",
  "title": "How to Install n8n: A Team Pre-Commitment Checklist",
  "subtitle": "A practical checklist for how to install n8n as a team: cloud vs self-hosted, license terms, npm vs Docker vs Compose, and infrastructure sizing.",
  "description": "A practical checklist for how to install n8n as a team: cloud vs self-hosted, license terms, npm vs Docker vs Compose, and infrastructure sizing.",
  "date": "2026-09-30",
  "sourcesCheckedAt": "2026-09-30T12:12:00.692Z",
  "tags": [
    "n8n",
    "Self-hosting",
    "Production readiness",
    "Tool comparison",
    "Checklist"
  ],
  "coverImage": "/blog/en/article-8e9e88be-5d7d-4cfa-944e-85c2ea5c5063/3ae46f26b221be2f857ed909d4d9f570c07d82c6d2f15b0c5a33b056494466c0.png",
  "coverAlt": "A person at a fork between a cloud doorway and a server rack, representing the decision behind how to install n8n.",
  "seo": {
    "title": "How to Install n8n: A Team Pre-Commitment Checklist",
    "description": "A practical checklist for how to install n8n as a team: cloud vs self-hosted, license terms, npm vs Docker vs Compose, and infrastructure sizing.",
    "keywords": [
      "how to install n8n"
    ]
  },
  "revision": "ecc7af2093e29b855849bcd8f010f6e0f860d8c7a09bff1c87f06b4ca490bf97"
}
---

## How to Install n8n: Cloud vs Self-Hosted Decision Checks

![Two keys shaped like a cloud and a server tower beside a checklist, symbolizing the n8n cloud versus self-hosted decision.](/blog/en/article-8e9e88be-5d7d-4cfa-944e-85c2ea5c5063/a12179610dfd42c997259f6faaffd28faafb7db953ab3572fa27f8d11cd7618a.png)

A conceptual illustration of the first decision a team makes before installing n8n.

Before anyone opens a terminal or a sign-up form, the real question behind how to install n8n isn't npm versus Docker. It's cloud versus self-hosted, and n8n's own documentation frames it exactly that way: n8n Cloud as the fully managed option, and self-hosting as running the platform on your own infrastructure.

That framing matters because every install-tool decision downstream only makes sense once this one is settled. A team that picks self-hosting inherits ongoing responsibility for updates, uptime and security; a team that picks Cloud hands that responsibility to n8n and focuses on building workflows instead.

- [ ] Who owns updates, patching and uptime if something breaks at 2am
- [ ] Whether data residency or network isolation rules apply to your workflows
- [ ] Whether the team already has someone comfortable running a database and a web server
- [ ] Whether you need this decision reversible later, or are comfortable committing

On n8n Balloon Challenges, for example, the whole hands-on format assumes this decision is already made before a session starts: [sign up for n8n Cloud, choose a challenge, build a workflow, submit it for review, then collect a balloon](<https://n8n-challenges.app/en>). That sequencing is a useful model for a team's own rollout, too — settle the deployment question first, then let people practice.

Execution volume is one concrete way to pressure-test that decision. A team whose workflows will run only a few thousand times a month may find a managed starter plan simpler to reason about than standing up and maintaining its own infrastructure.

> “If you are under ~2,500 executions a month and do not care where the data sits, n8n Cloud Starter is genuinely simpler”
>
> — Dmitry Chervonyi, Self-described as a 'CMO who learned to ship,' co-founder of livemy.app, a managed hosting platform for n8n and similar tools; writes about deployment and self-hosting on DEV Community · Source: [Self-hosting n8n in 2026: three paths, the env vars that matter, and 5 things that quietly break - DEV Community](<https://dev.to/dmytro_chervonyi/self-hosting-n8n-in-2026-three-paths-the-env-vars-that-matter-and-5-things-that-quietly-break-47m1>)

Sources: [Choose how to use n8n | n8n Docs](<https://docs.n8n.io/choose-how-to-use-n8n>)

If your team is leaning toward n8n Cloud rather than self-hosting, you can follow the checks in this article inside a fresh n8n workspace. The sign-up link is a partner link that opens n8n's own Cloud sign-up page.

**[Sign up for n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Check Your Plan or Edition and Its License Terms

Once cloud versus self-hosted is settled, check what your chosen path actually gives you. n8n's documentation lists Community as the free self-hosted tier, describing it as carrying almost the complete feature set of the platform — worth verifying against your team's specific needs rather than assuming full parity with paid plans.

**Editions and plans referenced in n8n's own documentation**

| Edition/plan | Hosting | License or access notes |
| --- | --- | --- |
| Community | Self-hosted | Free; internal-business, non-commercial or personal use only, per license terms |
| Cloud (Starter and above) | Fully managed by n8n | Managed plans; feature and pricing details live on n8n's pricing page |
| Business | Self-hosted only (as documented) | Adds SSO, environments and Git version control; not offered on Cloud per that page |

The Community edition's license is not unrestricted. n8n's license terms state that the software may be used or modified only for your own internal business purposes, or for non-commercial or personal use. A team planning to resell n8n-based functionality to its own customers should read the full license FAQ before building on Community, rather than assuming it covers that case.

n8n's pricing page confirms Community is distributed through GitHub as the standard self-hosted version, and separately notes that the [Business plan](<https://n8n-challenges.app/en/blog/n8n-cost-cloud-plans-community-edition-and-enterprise-pricing>) — which adds SSO, environments and Git-based version control — is currently available only for self-hosted deployments, not on Cloud. Since no publication date accompanies that page, reconfirm current plan availability before finalizing a purchase.

Sources: [Choose how to use n8n | n8n Docs](<https://docs.n8n.io/choose-how-to-use-n8n>), [Community license | n8n Community license | n8n Docs](<https://docs.n8n.io/n8n-community-license>), [n8n Plans and Pricing - n8n.io](<https://n8n.io/pricing/>)

## Check Which Self-Hosted Install Method Fits (npm vs Docker vs Docker Compose) — and Why Desktop Is Off the Table

![Four objects representing npm, single Docker container, Docker Compose and a discontinued desktop app for installing n8n.](/blog/en/article-8e9e88be-5d7d-4cfa-944e-85c2ea5c5063/2f11c5bbe8d513a73fd2cf5378ce93089206036650c51e94221829ba1a7d85e6.png)

A conceptual comparison of self-hosted n8n install methods and their documented status.

If self-hosting is the path, how to install n8n on your own machines comes down to three realistic choices: npm, a single Docker container, or Docker Compose — plus one option to rule out.

**Self-hosted install methods compared**

| Method | Documented status | Best fit |
| --- | --- | --- |
| npm | Deprecated from n8n 3.0; not safe for production per n8n's docs | A five-minute look at the interface, not team use |
| Single-container Docker | n8n's docs mark the page outdated | A step toward Compose, not an end state |
| Docker Compose | n8n's currently recommended self-hosted method | Ongoing self-hosted team use |
| Desktop | Development stopped per a 2023 announcement | Not recommended for new team setups |

Start with what n8n's own docs say. The npm-based install is now marked deprecated starting with n8n 3.0, and the local/npm-style setup is explicitly described as unsafe for production use — it's positioned for local development and testing only. A community guide from 2026 echoes the same boundary in practice, suggesting npm only when someone wants to see the interface within five minutes, not for daily team use.

The single-container Docker page carries its own warning: n8n's docs mark that page as outdated and point readers to [Docker Compose](<https://n8n-challenges.app/en/blog/n8n-deployment-options-self-hosting-and-queue-mode>) as the recommended installation method instead. Self-hosting through either path still requires real technical knowledge, which n8n's documentation calls out directly as a prerequisite before a team commits.

Desktop deserves a firm no for new team setups. n8n announced in a 2023 community forum post that it was stopping development of the Desktop version; no more current official statement in the sources reviewed here reverses that, so Desktop should be treated as discontinued as of that 2023 announcement rather than as a live option.

Sources: [Install with npm | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/install-options/install-with-npm>), [Install with Docker | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/install-options/install-with-docker>), [Sunsetting Self-hosted Team Plan + Desktop Version - Announcements - n8n Community](<https://community.n8n.io/t/sunsetting-self-hosted-team-plan-desktop-version/25830>), [Install n8n Locally: Step-by-Step Guide 2026 - Alex Harte](<https://www.alexanderharte.com/install-n8n-locally/>)

Getting a whole team from 'which install method' to confidently building and reviewing workflows is exactly what n8n Corporate Fundamentals is built for. It's run on your own tools, data and n8n instance, and it's the practical starting point once your team has settled cloud versus self-hosted.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Check Infrastructure and Production-Readiness Prerequisites

![A server box connected to a database crate and an HTTPS sign, showing self-hosted n8n infrastructure prerequisites.](/blog/en/article-8e9e88be-5d7d-4cfa-944e-85c2ea5c5063/13a4703666f31f4b64c4a5685b547cd2906a1543a48b88294cf704744ffbb853.png)

A conceptual diagram of the infrastructure pieces a team checks before running n8n in production.

Before a self-hosted instance goes live, part of how to install n8n well is [sizing the infrastructure](<https://n8n-challenges.app/en/blog/self-hosted-n8n-production-readiness-checklist>) rather than guessing. n8n's own sizing guidance, built as an illustrative example based on n8n Cloud, recommends a dedicated database per n8n instance rather than sharing one across multiple instances.

The same guidance notes that a typical instance doesn't require large amounts of available memory at idle — but it's an example, not a guaranteed self-hosted minimum, and actual memory needs depend on workflow data volume, which can spike with data-heavy nodes like Code. Re-check sizing against your real workflows, not idle numbers alone.

- [ ] A dedicated database provisioned for this n8n instance, not shared with another instance
- [ ] A realistic estimate of workflow data volume, especially from Code or large-payload nodes
- [ ] A public HTTPS address if any workflow will receive webhooks
- [ ] A documented backup and restore process for the database

Sources: [Prerequisites | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/deploy-as-an-oem-integration/prerequisites>)

## Check the Cost Picture Before You Commit

Cost isn't only a Cloud-plan line item. A 2026 practitioner write-up on self-hosting describes the free, self-hosted Community edition as offering unlimited executions — a framing worth noting, though it comes from a community blog whose author discloses co-founding a competing managed-hosting product, so treat it as one practitioner's perspective rather than an independent benchmark.

Weigh that against what n8n's own pricing page confirms about the Community edition's free, GitHub-distributed status, alongside the Business plan's self-hosted-only availability noted above. The real cost of self-hosting also includes the infrastructure and the prerequisite technical skills already covered above — time and effort a managed Cloud plan absorbs on your behalf.

Sources: [Choose how to use n8n | n8n Docs](<https://docs.n8n.io/choose-how-to-use-n8n>), [Self-hosting n8n in 2026: three paths, the env vars that matter, and 5 things that quietly break - DEV Community](<https://dev.to/dmytro_chervonyi/self-hosting-n8n-in-2026-three-paths-the-env-vars-that-matter-and-5-things-that-quietly-break-47m1>), [n8n Plans and Pricing - n8n.io](<https://n8n.io/pricing/>)

## Editorial Recommendations

![A hand ticking checklist boxes with a cloud object and a server object nearby, representing final install recommendations.](/blog/en/article-8e9e88be-5d7d-4cfa-944e-85c2ea5c5063/69fa576a0454ef88831ca3c777314c0107a3573db3a2089cd892b84c0d83bdef.png)

A conceptual checklist illustrating the editorial recommendations for deciding how to install n8n.

These are editorial suggestions based on the checks above, not a mandatory standard — weigh them against your own team's constraints.

Once the cloud-versus-self-hosted decision and the self-hosted install-method checks above are settled, treat the following as a short final pass rather than a new set of criteria:

- [ ] Confirm the final decision and install method are written down somewhere the whole team can reference
- [ ] Assign one person on the team to own this decision and record why it was made

If your team has already self-hosted n8n and wants a second opinion on whether the setup is production-ready, a Workflow Audit reviews your instance and workflows for reliability, security and maintainability before something breaks in production.

**[Get a self-hosted setup audit](https://n8n-challenges.app/en/companies)**

Tags: n8n, Self-hosting, Production readiness, Tool comparison, Checklist
