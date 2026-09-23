---
{
  "id": "opp_d1fcf84c-28fe-4e14-b7f1-a7365bf18814",
  "locale": "en",
  "slug": "article-d1fcf84c-28fe-4e14-b7f1-a7365bf18814",
  "urlSlug": "how-to-use-n8n-build-test-and-publish-your-first-webhook-workflow",
  "title": "How to use n8n: build, test and publish your first Webhook workflow",
  "subtitle": "Learn how to use n8n by building a greeting endpoint with Webhook, Edit Fields and Respond to Webhook, then test, publish, troubleshoot and share it with a team.",
  "description": "Learn how to use n8n by building a greeting endpoint with Webhook, Edit Fields and Respond to Webhook, then test, publish, troubleshoot and share it with a team.",
  "date": "2026-09-23",
  "sourcesCheckedAt": "2026-09-21T16:00:05.207Z",
  "tags": [
    "n8n",
    "Webhooks",
    "Tutorial"
  ],
  "coverImage": "/blog/en/article-d1fcf84c-28fe-4e14-b7f1-a7365bf18814/ebd905ab0b1deb39f0b9033632573e1314705c2d52e81a71f7d67e0e61deb7f8.png",
  "coverAlt": "A mailbox takes in a request and returns a greeting, showing how to use n8n for a webhook workflow",
  "seo": {
    "title": "How to use n8n: build, test and publish your first Webhook workflow",
    "description": "Learn how to use n8n by building a greeting endpoint with Webhook, Edit Fields and Respond to Webhook, then test, publish, troubleshoot and share it with a team.",
    "keywords": [
      "how to use n8n",
      "what is n8n workflow",
      "n8n meaning"
    ]
  },
  "revision": "8cd9fae0dd2cde51696f1c5ac35d0c2ee5df0b76755170835b7515d1ef0ed7e7"
}
---

## How to use n8n: what you'll build and what you need

The quickest way to learn how to use n8n is to build something small. In this tutorial you'll make an API-like endpoint: someone sends a request to a web address, and your workflow sends back a short greeting. It uses three nodes, Webhook, Edit Fields (Set) and Respond to Webhook. You then test it, publish it and prepare it for a team.

A common beginner question is what is n8n workflow in practice, and the n8n meaning of the term is straightforward. It's a chain of nodes. A trigger starts a run, the middle nodes shape the data and a final node does something with it. Here, the trigger is an incoming HTTP request, and the result goes back to the caller.

You need an n8n instance, either n8n Cloud or self-hosted. The n8n docs say that if you self-host on localhost, you have to run n8n in tunnel mode before the Webhook node can receive requests. This tutorial doesn't cover the tunnel commands; see n8n's self-hosting documentation for them. You'll also need a terminal with curl, or another HTTP client, to send test requests.

One note before you start: these steps come from n8n's official documentation. They haven't been tested firsthand for this article.

Sources: [Workflow development | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/workflow-development>), [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/common-issues>)

Want to follow along from scratch? You can build this workflow in a new n8n Cloud workspace. This is a partner link that opens n8n's own sign-up page.

**[Sign up for n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Steps 1–3: Build the Webhook, Edit Fields and Respond to Webhook chain

Learning how to use n8n starts with building the workflow in order, from the trigger, which here is the Webhook node that starts the workflow. Setting up credentials for the Webhook node's authentication options is covered on a separate docs page.

The Edit Fields step comes with a caveat. n8n's documented Edit Fields recipe for this uses the When Last Node Finishes response mode, not Respond to Webhook. The steps below apply the same field setup to this workflow, so treat that step as a suggestion and check the result when you test.

1. Add a Webhook node and choose an authentication option (Basic, Header, JWT or none).
2. In the Webhook node, set Respond to Using Respond to Webhook node.
3. Connect an Edit Fields (Set) node. Add a String field with a name and a greeting value, and turn on Keep Only Set.
4. Connect a Respond to Webhook node at the end. It runs once, on the first incoming item.

Sources: [Webhook | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook>), [Respond to Webhook | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook>), [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/common-issues>)

## Steps 4–5: Test with the test URL, then publish

![A stopwatch tag, a stamp pressing a seal and a drawer of run cards on a workbench.](/blog/en/article-d1fcf84c-28fe-4e14-b7f1-a7365bf18814/dc1af330ec2aa4460c83b30fa21662b5ea5d3fe798be0a8ac2a10c116a888d9c.png)

Illustrative sequence: test, publish, then review runs.

[Start with the test URL and publish only after you get back the response you expect](<https://n8n-challenges.app/en/blog/publish-an-n8n-webhook-trigger-from-test-url-to-fixing-404s>). The diagram shows the order to follow.

**From test request to live endpoint**

1. **Listen**: Select Listen for test event on the Webhook node.
2. **Send**: Call the test URL with curl within the 120-second window.
3. **Check**: Confirm the greeting comes back and the data appears in the editor.
4. **Publish**: Save and publish the workflow so n8n registers the production webhook.
5. **Monitor**: Call the production URL and review runs in the Executions tab.

Part of learning how to use n8n is knowing that production data doesn't appear in the editor, so check the Executions tab for live runs instead. If people outside your team will call the endpoint, we suggest turning on the authentication option from step 1 before you publish.

Sources: [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/common-issues>), [Webhook | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook>), [Workflow development | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/workflow-development>)

Onboarding a team that needs to build its first endpoints like this one? The Build Your First 5 Automations program trains a team on its own n8n instance and tools. The link opens a page on this site, where enquiries go through LinkedIn.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Troubleshooting common webhook problems

[Most problems at this stage come down to timing, errors or request size](<https://n8n-challenges.app/en/blog/n8n-webhook-not-working-a-step-by-step-debugging-checklist>). The table lists the documented causes, with our suggestions for what to try.

**Common webhook symptoms and documented causes**

| Symptom | Likely cause | What to try |
| --- | --- | --- |
| Test request not captured | The 120-second listening window closed | Select Listen for test event again, then resend |
| HTTP 500 response | Workflow errored before Respond to Webhook ran | Open the failed run and fix the node that errored |
| HTTP 524 on n8n Cloud | No response within 100 seconds (Cloudflare timeout) | Respond sooner or shorten the work before the response |
| Large request rejected | Payload above the 16MB default | Self-hosted: raise the limit with N8N_PAYLOAD_SIZE_MAX |

Sources: [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/common-issues>), [Respond to Webhook | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook>), [Webhook | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook>)

## When a team relies on it: projects, roles and credentials

![Shared project toolbox with workflows and credential keys accessed by teammates holding different n8n roles](/blog/en/article-d1fcf84c-28fe-4e14-b7f1-a7365bf18814/9e1c8a2cb76f4791e0db128a6015f1fca4fc4d552321ff71640b18b2c0eafc16.png)

Conceptual illustration of a shared n8n project with roles and credentials.

According to the n8n docs, RBAC and projects are available on all n8n Cloud plans and on the self-hosted Registered Community, Business and Enterprise editions. Projects group workflows and credentials and give each user a role in each project. The number of projects and roles you get depends on your plan.

We suggest building a shared workflow inside a team project rather than in a personal space. Take care when [moving workflows or credentials between projects](<https://n8n-challenges.app/en/blog/n8n-environment-variables-and-credentials-shared-instance-checklist>): the move removes all existing sharing. A workflow can also stop working if the credentials it needs aren't available in the new project.

- [ ] Create or choose a shared project for the workflow
- [ ] Give each teammate a role in that project
- [ ] Check that the workflow's credentials are available in the project before moving it
- [ ] Re-share anything that lost access after the move

Sources: [Organize work in projects | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects>)

Responsible for a team's n8n setup? A Workflow Audit reviews your instance and workflows for reliability, security and maintainability. The link opens a page on this site, where enquiries go through LinkedIn.

**[Audit your team's webhook workflows](https://n8n-challenges.app/en/companies)**

Tags: n8n, Webhooks, Tutorial
