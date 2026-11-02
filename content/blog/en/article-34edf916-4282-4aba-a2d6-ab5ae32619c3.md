---
{
  "id": "opp_34edf916-4282-4aba-a2d6-ab5ae32619c3",
  "locale": "en",
  "slug": "article-34edf916-4282-4aba-a2d6-ab5ae32619c3",
  "urlSlug": "hr-offboarding-automation-in-n8n-approvals-and-audit-trail",
  "publishedAt": "2026-11-02T09:55:40.269Z",
  "title": "HR Offboarding Automation in n8n: Approvals and Audit Trail",
  "subtitle": "HR offboarding automation in n8n: pause for approvals with the Wait node, revoke sessions and tokens, keep an external audit record and prepare for production.",
  "description": "HR offboarding automation in n8n: pause for approvals with the Wait node, revoke sessions and tokens, keep an external audit record and prepare for production.",
  "date": "2026-11-02",
  "sourcesCheckedAt": "2026-11-02T09:47:24.990Z",
  "tags": [
    "n8n",
    "Production readiness",
    "Guide"
  ],
  "coverImage": "/blog/en/article-34edf916-4282-4aba-a2d6-ab5ae32619c3/c5ea0be5a22839b18b76abf6a8be2db5f2a775712863582db362ece6ce63f5a9.webp",
  "coverAlt": "Key ring, paused hourglass and ledger on a desk, showing HR offboarding automation",
  "seo": {
    "title": "HR Offboarding Automation in n8n: Approvals and Audit Trail",
    "description": "HR offboarding automation in n8n: pause for approvals with the Wait node, revoke sessions and tokens, keep an external audit record and prepare for production.",
    "keywords": [
      "hr offboarding automation"
    ]
  },
  "revision": "46293b14f75a8626628da4450d9808c005bf7ce296bf2849d407a6a560e23946"
}
---

## HR offboarding automation: what the workflow must cover

HR offboarding automation in n8n is easiest to design against a control baseline. This guide combines n8n documentation, control text and vendor API pages, and the composition is our editorial design. Nothing here was run in an n8n instance. Account-disable endpoints for Entra, Google, Slack, Okta, GitHub and SAP need checking in each vendor's docs, and legal or retention rules for leaver records vary by jurisdiction and are not covered.

The NIST SP 800-53 Rev 5.2.0 control PS-4, as reproduced by the independent site CSF Tools, covers disabling system access, revoking credentials, retrieving property and retaining access to information the person controlled. The time period is left to each organization. An enhancement refers to automated mechanisms that notify personnel and disable access, which supports automating the process.

For terminations for cause, the same guidance says timely action is essential and organizations may disable accounts before notifying the individual. That affects how you order approvals and notifications. The diagram below is our suggested flow, not a validated standard.

![Suggested offboarding flow (editorial): 1. Trigger; 2. System checklist; 3. Notify owners; 4. Approval wait; 5. Revoke per system; 6. Write the record; 7. Error workflow](/blog/en/article-34edf916-4282-4aba-a2d6-ab5ae32619c3/3faad2808a4b5454df71449b003f26b33c16272462a745fd3d50833ff90544b0.webp)

Sources: [PS-4: Personnel Termination – CSF Tools](<https://csf.tools/reference/nist-sp-800-53/r5/ps/ps-4/>)

## Pause for approvals with the Wait node

![Envelope pausing at a gate with an hourglass, representing the n8n Wait node approval step](/blog/en/article-34edf916-4282-4aba-a2d6-ab5ae32619c3/5e5b7b56a014577b562bb4675dacd79e9063dcca215aa54a65bcd16d57ef18d4.webp)

A run stops at the approval gate and either continues or follows a timeout path.

The [n8n Wait node](<https://n8n-challenges.app/en/blog/the-n8n-wait-node-handling-retries-and-rate-limited-apis>) can pause a workflow until a webhook call or a form submission arrives, which fits approval steps. While paused, it offloads the execution data to the database. The docs page does not state a version or edition for this behavior.

With the On Webhook Call option, each execution gets a unique resume URL through $execution.resumeUrl, which you can put in an email or message. In HR offboarding automation, one editorial way to notify owners is to send each system owner a message carrying that execution's URL, which fits the automated-notification enhancement in PS-4. Resume requests can use Basic, Header or JWT authentication and an IP allowlist, so you can limit who can approve. Partial executions change the resume URL, so test with full runs.

The Limit Wait Time setting resumes the workflow after an interval or at a set time, so you can follow it with an IF or Switch node to build a timeout or escalation branch; that pattern is our design choice, not a documented recipe. n8n's own January 2026 blog, written about AI human-in-the-loop rather than offboarding, recommends reviewing only at irreversible decision points and adding timeout, escalation and audit trails.

We think approvals belong on judgment calls such as exceptions or data handover, and routine account disabling should not wait for a manager to click a link.

Sources: [PS-4: Personnel Termination – CSF Tools](<https://csf.tools/reference/nist-sp-800-53/r5/ps/ps-4/>), [Wait | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait>), [Human in the loop automation: Build AI workflows that keep humans in control – n8n Blog](<https://blog.n8n.io/human-in-the-loop-automation/>)

## Revoke access: sessions, tokens and accounts

![Unplugged cable beside a locked door, contrasting session revocation with disabling an account in n8n](/blog/en/article-34edf916-4282-4aba-a2d6-ab5ae32619c3/4a03b408ebd2f5d6b7ce9faf2a8a6e2af4204c4414e318176f9a4c0584e0608e.webp)

Ending sessions and disabling the account are two separate actions.

Revoking access has two halves per system: ending live sessions or tokens, and disabling the account. The table below compares two documented session and token calls.

Microsoft Graph v1.0 revokeSignInSessions invalidates a user's refresh tokens and browser session cookies. It needs the User.RevokeSessions.All permission and may take a few minutes to take effect. External users are not covered. The page was last updated in July 2025.

The Google Workspace Admin SDK Directory API tokens.delete method deletes the access tokens a user issued for one application. It needs the admin.directory.user.security scope and works per client ID, so you need one call per app.

**What the two revoke calls do and do not do**

| API call | Permission or scope | Does not do |
| --- | --- | --- |
| Microsoft Graph v1.0 revokeSignInSessions | User.RevokeSessions.All | Disable the account; cover external users |
| Google Directory API tokens.delete | admin.directory.user.security | Suspend the user; cover more than one app per call |

Calling either from an n8n HTTP Request node is our inference, not something the pages describe. We'd be cautious about marking a leaver as done after a revoke call alone.

Sources: [user: revokeSignInSessions - Microsoft Graph v1.0 | Microsoft Learn](<https://learn.microsoft.com/en-us/graph/api/user-revokesigninsessions?view=graph-rest-1.0>), [Method: tokens.delete](<https://developers.google.com/workspace/admin/directory/reference/rest/v1/tokens/delete?hl=zh-tw>)

If a whole department will own this workflow, the Department Automation Bootcamp is, in our view, the best practical n8n training for it: your HR team builds real automations on your own tools and n8n instance. The link opens a page on this site, and enquiries go through the LinkedIn link there.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Keep an audit record and handle failures

![Fading paper stack beside a sturdy filing cabinet and alarm bell for the n8n audit record and error workflow](/blog/en/article-34edf916-4282-4aba-a2d6-ab5ae32619c3/522c5d71da30300ab80a4b97c4a3978d8f107cc6d20d2a76b75331fc08e2a500.webp)

Execution history fades by default, so the lasting record lives in an external store.

For HR offboarding automation, n8n's [execution history is a poor audit record](<https://n8n-challenges.app/en/blog/n8n-audit-trail-checklist-verifying-your-audit-log-coverage>). According to n8n's self-hosted environment-variable docs, finished executions are pruned by default after 336 hours (14 days) or above 10,000 executions, and annotated executions are never pruned. Execution saving can also be set to skip successes, so successful offboardings would not appear. Those docs do not state Cloud limits.

Write each decision and API result to an external store instead. n8n's January 2026 blog says to log every human decision in a datastore, naming Postgres, Notion and Airtable, and quotes a security leader, self-reported, who expects to need the record in a post-incident review. An n8n consultancy's June 2026 tutorial pairs a Slack approval, a Wait node and a PostgreSQL audit log for access requests; it is not about offboarding, so use it as a pattern reference only.

In n8n you can set an error workflow that starts with an Error Trigger and runs when an execution fails. The Stop And Error node forces a failure so that workflow runs, for example to alert on a failed revocation. If the failure is in the trigger node, the execution ID and URL are absent.

In our view, a failed revocation deserves an alert to a named human, not a silent retry.

Sources: [Human in the loop automation: Build AI workflows that keep humans in control – n8n Blog](<https://blog.n8n.io/human-in-the-loop-automation/>), [Buidling Self-Service IT Portal in n8n. Access Requests, Approvals & Auto Provisioning](<https://n8nlab.io/blog/n8n-workflow-automation-it-portal>), [Handle errors gracefully | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/handle-errors-gracefully>), [Manage execution data | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/manage-execution-data>), [Executions | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions>)

## Before it runs for real: access, secrets and error handling

![Clipboard with ticked rows beside a small vault, showing the n8n pre-launch checks for secrets and roles](/blog/en/article-34edf916-4282-4aba-a2d6-ab5ae32619c3/a7af3d41bdc1ff8e86ff5cde3640e8bc2400295091e3d17a7706d2b6e895bcf1.webp)

A suggested pre-launch checklist covering credentials, roles and failure paths.

n8n RBAC groups workflows and credentials into projects with per-project roles. It is available on n8n Cloud (all plans) and on self-hosted Registered Community, Business and Enterprise. Moving a workflow or credential removes existing sharing. Custom roles for least-privilege access are only on n8n Cloud Enterprise and self-hosted Enterprise, so other plans rely on built-in roles.

External secret stores such as AWS Secrets Manager, Azure Key Vault, GCP Secrets Manager, HashiCorp Vault, 1Password Connect and Infisical are available on n8n Cloud Enterprise and self-hosted Enterprise. Secrets resolve only in credential fields. Project-scoped vaults arrived in n8n 2.11.0, and behavior varies by version, so check what you run.

This pre-launch checklist for HR offboarding automation is our suggestion, not a validated instrument.

- [ ] Credentials restricted by project or held in an external secrets store
- [ ] Only named admins can view or edit the workflow
- [ ] Error workflow set and a forced failure tested
- [ ] Timeout and failure branches tested
- [ ] Dry run completed against a test user
- [ ] Decisions and API results land in an external store

Sources: [Handle errors gracefully | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/handle-errors-gracefully>), [Organize work in projects | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects>), [Custom roles | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/create-custom-roles>), [Use external secret stores | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-credentials/use-external-secret-stores>)

Want a second pair of eyes before leavers depend on it? Our Workflow Audit reviews your n8n instance and workflows for reliability, security and maintainability, and it is the best way for your team to get credentials, roles and failure handling right. The link opens a page on this site, and enquiries go through the LinkedIn link there.

**[Audit your offboarding workflows](https://n8n-challenges.app/en/companies)**

Tags: n8n, Production readiness, Guide
