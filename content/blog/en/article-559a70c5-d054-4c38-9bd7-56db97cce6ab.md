---
{
  "id": "opp_559a70c5-d054-4c38-9bd7-56db97cce6ab",
  "locale": "en",
  "slug": "article-559a70c5-d054-4c38-9bd7-56db97cce6ab",
  "urlSlug": "n8n-environment-variables-and-credentials-shared-instance-checklist",
  "title": "n8n Environment Variables and Credentials: Shared Instance Checklist",
  "subtitle": "A checklist for moving a practice workflow to a shared n8n instance: the encryption key, n8n credentials, sharing, project moves and n8n environment variables.",
  "description": "A checklist for moving a practice workflow to a shared n8n instance: the encryption key, n8n credentials, sharing, project moves and n8n environment variables.",
  "date": "2026-09-21",
  "sourcesCheckedAt": "2026-09-21T16:28:33.708Z",
  "tags": [
    "n8n",
    "Self-hosting",
    "Production readiness",
    "Checklist"
  ],
  "coverImage": "/blog/en/article-559a70c5-d054-4c38-9bd7-56db97cce6ab/50a2f5f3a183b4fd6bbd2c16eed689418d45a532636a73f4e2a9e57826ecda98.png",
  "coverAlt": "A key being handed from a laptop to a shared server cabinet, showing an n8n encryption key moving to a shared instance",
  "seo": {
    "title": "n8n Environment Variables and Credentials: Shared Instance Checklist",
    "description": "A checklist for moving a practice workflow to a shared n8n instance: the encryption key, n8n credentials, sharing, project moves and n8n environment variables.",
    "keywords": [
      "n8n environment variables",
      "n8n credentials"
    ]
  },
  "revision": "0015b795c974158979b0be130b93cfdee28361ce2eb57faaa365d4baad10a444"
}
---

## Before you start: what moves and what doesn't

You probably built a practice workflow on your laptop, and now your team wants it on a [shared or self-hosted n8n instance](<https://n8n-challenges.app/en/blog/n8n-security-checklist-for-a-shared-self-hosted-instance>). This checklist covers the checks that matter most for that move: the encryption key, n8n credentials, sharing and project moves, and n8n environment variables that control access. It is written for technical leads and for teams running n8n at a company.

The scope is limited. This checklist doesn't cover n8n's Variables feature, external secret stores, or exporting and importing between instances. It covers instance configuration and moves between projects inside one instance. The n8n Docs pages it relies on carry no version numbers, so check the defaults and plan availability against the release you run.

As an editorial suggestion, list every credential the workflow uses before you move anything.

- [ ] List every credential the workflow uses
- [ ] Note which nodes or expressions read environment variables
- [ ] Decide which project on the shared instance will own the workflow
- [ ] Plan to recreate the credentials rather than copy the settings file

Most items below are editorial suggestions. The docs state only two of them as requirements, and the encryption key and credentials sections mark each one where it applies.

Sources: [Set a custom encryption key | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key>), [Credentials | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/credentials>)

## Encryption key checks

The n8n Docs say n8n creates a random encryption key the first time it launches. It stores the key in the ~/.n8n folder and uses it to encrypt credentials before they are saved. You can supply your own key with the N8N_ENCRYPTION_KEY environment variable, but only if no key is in the settings file yet. In queue mode, every worker must have that variable set.

The docs don't describe key rotation, recovery from a lost key or how to migrate to a new key. That is why it helps to decide on the key before the first launch.

The security settings include N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS, which defaults to false. When you set it to true, n8n tries to set 0600 permissions on the settings file that holds the key. The docs say it tries, so the result isn't guaranteed. This setting only applies to self-hosted instances.

Sensitive variables can take a _FILE suffix, which makes n8n read the value from a separate file. The docs don't list every variable that supports this suffix, so check the table in the docs for the key variable before you depend on it.

- [ ] Set N8N_ENCRYPTION_KEY before the instance first launches (suggestion)
- [ ] Keep the key in a secret store or a _FILE-based config (suggestion)
- [ ] Give the same key value to every queue-mode worker (required)
- [ ] Set N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS to true and confirm the file permissions (suggestion)

Sources: [Set a custom encryption key | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key>), [Credentials | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/credentials>), [Security | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/security>)

## n8n credentials checks

If you use credential overwrites, check CREDENTIALS_OVERWRITE_PERSISTENCE. It defaults to false. According to the n8n Docs, you need it in [multi-instance or queue mode](<https://n8n-challenges.app/en/blog/n8n-queue-mode-redis-when-to-leave-single-instance-mode>) so that overwrites reach the workers. If you don't use overwrites, you can skip it.

Once the workflow is on the shared instance, we suggest recreating each credential there. Give each one a clear name so teammates can tell which service and which account it connects to. The naming convention is an editorial suggestion, not something the docs require.

- [ ] Turn on overwrite persistence if you use overwrites in queue mode
- [ ] Recreate every listed credential on the shared instance
- [ ] Name each credential by service and account
- [ ] Remove any leftover test credentials

Sources: [Credentials | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/credentials>)

Is your team moving from practice workflows to a shared instance? The n8n Advanced / Developer Training is one option to consider. Company programs are prepared for one team and run on your own n8n instance, so training can be shaped around topics like these. The link opens our For companies page, where enquiries go through LinkedIn.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Sharing and project checks

![Credential cards moving between project folders with cut sharing threads, showing an n8n project move](/blog/en/article-559a70c5-d054-4c38-9bd7-56db97cce6ab/c7b2e1b20db34dbde3bd666600ec42f8defa8ac8623efa4a7cff4c836e66612a.png)

Conceptual diagram: credentials moving between project folders.

Before you rely on sharing, [confirm your plan supports it](<https://n8n-challenges.app/en/blog/n8n-enterprise-pricing-vs-community-whats-actually-gated>). Plan availability can change, so check it for your own edition.

**Feature availability by edition, according to the n8n Docs**

| Feature | n8n Cloud | Self-hosted |
| --- | --- | --- |
| Credential sharing | All plans | Business, Enterprise |
| Projects and RBAC | All plans | Registered Community, Business, Enterprise |
| Project and role limits | Vary by plan; numbers not documented | Vary by plan; numbers not documented |

A few rules from the n8n Docs matter here. Users can share credentials they own. For a credential owned by a project, only project admins can share it. Instance owners and admins can view and share every credential. A user who receives a shared credential can't view or edit its details. As an editorial suggestion, have a project own the credentials rather than one person.

Moving a workflow or a credential removes all of its existing sharing. A workflow may also stop working if the credentials it needs aren't available in the target project.

**A suggested order for a project move**

1. **Check the plan**: Confirm that your edition supports projects and sharing.
2. **Place the credentials**: Make sure the target project can use the credentials the workflow needs.
3. **Move**: Move the workflow into the target project.
4. **Re-share**: Share the workflow and credentials again.
5. **Re-run**: Run the workflow once to confirm it still works.

Sources: [Share credentials securely | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-credentials/share-credentials-securely>), [Organize work in projects | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects>)

## Environment variable and file access hardening

![A clipboard beside a locked cabinet, showing n8n environment variables access being hardened](/blog/en/article-559a70c5-d054-4c38-9bd7-56db97cce6ab/911b4e12de7d513404d3d958c185cebb955d30a0e2a28ccccd1bfa2ad9bff801.png)

Conceptual illustration of hardening checks.

N8N_BLOCK_ENV_ACCESS_IN_NODE defaults to false in the current n8n Docs. With that default, users can read n8n environment variables in expressions and in the Code node. On a shared instance, you might set it to true so users can't read them. Whether to block this access is an editorial choice.

If you block access, test every workflow that uses $env before you tell people it's live. Any workflow that reads n8n environment variables through $env stops getting those values once access is blocked.

- [ ] Decide whether to set N8N_BLOCK_ENV_ACCESS_IN_NODE to true
- [ ] Search the workflows for $env references
- [ ] Re-test every workflow that reads $env

Sources: [Security | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/security>)

## What done looks like, and troubleshooting

A section is done when you have ticked every item in its checklist and the workflow runs on the shared instance under its intended project. If a workflow stops working after a move, work through the causes in this table. They are suggestions for where to look first, not a complete diagnosis.

**Where to look first when a workflow fails after a move**

| Symptom | Checklist to revisit |
| --- | --- |
| Workflow stops working after a project move | Sharing and project checks: placing the credentials |
| Teammates lost access | Sharing and project checks: re-sharing step |
| Workers can't use credentials in queue mode | Encryption key checks: key on every worker |
| Overwrites ignored on workers | n8n credentials checks: overwrite persistence |
| Expressions or Code nodes can't read env values | Environment variable and file access hardening |

Sources: [Set a custom encryption key | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key>), [Credentials | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/credentials>), [Security | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/security>), [Organize work in projects | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects>)

If you're responsible for a shared n8n setup, a Workflow Audit reviews your instance and workflows for reliability, security and maintainability. That review can include how your team handles credentials and the encryption key. The link opens our For companies page, where enquiries go through LinkedIn.

**[Audit your credential setup](https://n8n-challenges.app/en/companies)**

Tags: n8n, Self-hosting, Production readiness, Checklist
