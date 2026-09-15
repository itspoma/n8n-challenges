---
{
  "id": "opp_1bcc50d4-01fe-44dd-a5c0-9325c275c2ec",
  "locale": "en",
  "slug": "article-1bcc50d4-01fe-44dd-a5c0-9325c275c2ec",
  "urlSlug": "build-an-idempotent-n8n-webhook-that-skips-retried-requests",
  "title": "Build an idempotent n8n webhook that skips retried requests",
  "subtitle": "Learn to store idempotency keys in an n8n data table, skip retries that arrive one after another, test in Executions, and understand the concurrency limit.",
  "description": "Learn to store idempotency keys in an n8n data table, skip retries that arrive one after another, test in Executions, and understand the concurrency limit.",
  "date": "2026-09-15",
  "tags": [
    "n8n",
    "Webhooks",
    "Production readiness",
    "Tutorial"
  ],
  "coverImage": "/blog/en/article-1bcc50d4-01fe-44dd-a5c0-9325c275c2ec/188e3232f8b17b6e3b7684e2aa4b2444034a028207ef0deeb7c850000cda6a76.png",
  "coverAlt": "Two identical envelopes come through a mail slot. One lands in a tray and the duplicate is stopped by a checkmark stamp.",
  "seo": {
    "title": "Build an idempotent n8n webhook that skips retried requests",
    "description": "Learn to store idempotency keys in an n8n data table, skip retries that arrive one after another, test in Executions, and understand the concurrency limit.",
    "keywords": [
      "idempotency meaning",
      "n8n",
      "Webhooks",
      "Production readiness"
    ]
  },
  "revision": "86a16543cbd2d7004e63103f4cd0344c8bc28e6843126c814bb6cbb1445a6c38"
}
---

## What idempotency means for a webhook, and what you need

Here's a plain definition, in our own words: a webhook is idempotent when getting the same request a second time doesn't create a second record or repeat a side effect. This matters because [many senders retry when they don't get a clean answer](<https://n8n-challenges.app/en/blog/retrying-failed-n8n-http-requests-safely>). How and when they retry depends on the sender, and the n8n docs used for this tutorial don't cover that.

Before you start, you need three things. First, your own n8n instance. Second, a workflow that starts with a Webhook trigger. Third, access to data tables. You also need a sender that includes its own idempotency key with each request, such as a header or a body field. We suggest you don't generate the key inside n8n. A key created per execution is different every time, so it can't tell you that two requests are really the same one.

The goal is one record per idempotency key, even when the sender retries. New keys run the side effect, like creating an order or sending an email. Repeated keys get a clear answer and nothing else happens. This guide is based on the official documentation. We haven't tested it firsthand.

Sources: [S1](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook), [S3](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable), [S4](https://docs.n8n.io/build/work-with-data/data-tables)

Want more practice with webhook triggers and branching logic? Try the hands-on n8n challenges and build each one in your own n8n instance.

[Explore n8n challenges](https://n8n-challenges.app/en)

## Steps 1 and 2: Secure the webhook and create the key table

Add a Webhook node. Under authentication, require callers to use Basic, Header or JWT auth. Our reasoning is simple: it limits who can call the webhook. Setting up the credentials is covered on a separate docs page. Next, set the Respond option to use a Respond to Webhook node. That lets you choose what the sender receives, including a custom response code. Keep in mind that the Respond to Webhook node runs only once and uses the first incoming item.

Also remember that the production URL goes live only after you publish the workflow.

Now create a data table for processed keys. A simple layout has a column for the key and, if you like, a column for when you received it. The n8n docs specifically list storing markers to prevent duplicate runs as a use for data tables, so this fits the intended purpose.

Sources: [S1](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook), [S2](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook), [S4](https://docs.n8n.io/build/work-with-data/data-tables)

## Steps 3 to 5: Check, record, act and respond

![Flow diagram in which the webhook checks the key, then new keys are recorded and processed while seen keys get an already-processed response.](/blog/en/article-1bcc50d4-01fe-44dd-a5c0-9325c275c2ec/6f2d92f21af0d9250e5db7f19d2c6ea5e88b22f0a3c42a4bcb5754c996baf686.png)

Editorial framework for the workflow's branches, not an n8n screenshot.

Step 3: Right after the webhook, add a Data Table node that splits incoming items by whether a matching row already exists. Match the key from the request against the key column. You now have two branches: new keys and keys you've already seen.

Step 4: On the new-key branch, insert the key with the Insert operation, then run your side effect. There's a tradeoff you should decide on purpose. If you record the key first, a crash during the side effect means a retry gets skipped, so the work may never happen. If you record the key after the side effect, a crash between the two can let a retry run it again. Upsert is also available, and it updates a row that already exists. The docs don't say it's safe when requests arrive at the same time, though.

Step 5: End both branches with a Respond to Webhook node. As an editorial suggestion, return a success-style status for duplicates too, with a message that says the request was already processed. That way senders have no reason to keep retrying. n8n doesn't require any particular status code. The choice is yours and your sender's.

Sources: [S3](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable), [S2](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook)

## Step 6: Test by sending the same request twice

Publish the workflow and send one request with a made-up key, using any HTTP client you like. Then send the exact same request again. What you should see: the first call runs the side effect and adds one row, and the second call gets your duplicate response without adding a row. Send a third request with a different key to confirm that new keys still go through.

Production runs don't show their data in the editor, so open the workflow's Executions tab to see which branch each run took. Then check the data table to confirm there's only one row for the repeated key.

Sources: [S1](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook)

## Alternative: the Remove Duplicates node

If you don't need a table you can look through, the Remove Duplicates node can drop items whose values showed up in earlier executions. It's available in n8n 1.64.0 and later. By default it stores 10,000 items, and you can change that size. Very old keys may eventually fall out of that history. The docs don't explain what happens to the oldest entries, so don't count on it for keys that need to be remembered for a long time. Its behavior when requests arrive at the same time isn't documented either.

Sources: [S5](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates)

## Troubleshooting and the known concurrency limit

![Comparison: retries in sequence are blocked, while two requests arriving at the same time can both get through.](/blog/en/article-1bcc50d4-01fe-44dd-a5c0-9325c275c2ec/24d075fa3ace8a48509fa46be79e2fe1aa64bb8eed0b8ca499c1276ae8abf6aa.png)

Conceptual comparison of retries in sequence versus the undocumented concurrent case.

The sender gets a 500 error: if the workflow fails before a Respond to Webhook node runs, n8n returns a 500. Some senders retry after that, so a bug here can create exactly the retries you're trying to handle. Open Executions to find the node that failed.

Inserts suddenly fail: data tables are meant for light to moderate storage. By default, all tables in an instance share a 200 MiB limit. Once you hit it, inserts fail and executions error out. Self-hosted instances can raise the limit with N8N_DATA_TABLES_MAX_SIZE_BYTES.

Nothing happens in production: [check that the workflow is published](<https://n8n-challenges.app/en/blog/n8n-webhook-not-working-a-step-by-step-debugging-checklist>).

The known limit: the docs used here don't promise that the check and the insert happen as one atomic step, and they don't mention unique constraints. Two identical requests that arrive at the same moment could both pass the check and both run the side effect. This setup is designed to catch retries that arrive one after another, but we haven't tested it firsthand, and it doesn't guarantee protection against requests that arrive at the same time. For payments or other critical side effects, [rely on a system that enforces a unique constraint at the database level](<https://n8n-challenges.app/en/blog/preventing-duplicate-api-actions-in-n8n-webhooks>).

Sources: [S2](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook), [S1](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook), [S4](https://docs.n8n.io/build/work-with-data/data-tables), [S3](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable)

Does your company rely on n8n webhooks where duplicates or race conditions really matter? Message the author on LinkedIn to ask about n8n maintenance, or about moving critical automations to custom software. The link opens a LinkedIn profile.

[Ask about n8n consulting on LinkedIn](https://www.linkedin.com/in/rodomansky/)

Tags: n8n, Webhooks, Production readiness, Tutorial
