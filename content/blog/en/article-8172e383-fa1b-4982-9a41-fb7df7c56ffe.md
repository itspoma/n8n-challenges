---
{
  "id": "opp_8172e383-fa1b-4982-9a41-fb7df7c56ffe",
  "locale": "en",
  "slug": "article-8172e383-fa1b-4982-9a41-fb7df7c56ffe",
  "urlSlug": "api-rate-limit-exceeded-in-n8n-fix-429s-without-duplicate-writes",
  "title": "API rate limit exceeded in n8n: fix 429s without duplicate writes",
  "subtitle": "Fix API rate limit exceeded errors in n8n: read the 429, batch requests, retry after the limit window and use idempotency keys to avoid duplicate writes.",
  "description": "Fix API rate limit exceeded errors in n8n: read the 429, batch requests, retry after the limit window and use idempotency keys to avoid duplicate writes.",
  "date": "2026-09-21",
  "sourcesCheckedAt": "2026-09-21T22:16:53.959Z",
  "tags": [
    "n8n",
    "API integration",
    "Workflow debugging",
    "Tutorial"
  ],
  "coverImage": "/blog/en/article-8172e383-fa1b-4982-9a41-fb7df7c56ffe/89f9c55a9aa9c9f00d4e899fe615e5b8738a7af82bf176cd91455cce15c1f2be.png",
  "coverAlt": "Pink balloons waiting in evenly spaced groups at a toll gate with an hourglass on the barrier arm",
  "seo": {
    "title": "API rate limit exceeded in n8n: fix 429s without duplicate writes",
    "description": "Fix API rate limit exceeded errors in n8n: read the 429, batch requests, retry after the limit window and use idempotency keys to avoid duplicate writes.",
    "keywords": [
      "api rate limit exceeded"
    ]
  },
  "revision": "549f3daebb3d86e784f56d7f29d60b46b34146e515d63f030cf6262b5e986041"
}
---

## Prerequisites and goal

An "API rate limit exceeded" error means the service you're calling wants you to send fewer requests. In n8n, it can show up as an HTTP 429 response from an HTTP Request node. In this tutorial, you'll build a workflow that handles those 429s and doesn't send the same write twice when it retries.

Before you start, have these ready:

- [ ] An n8n workspace
- [ ] A workflow with an HTTP Request node that calls the target API
- [ ] The target API's rate-limit documentation
- [ ] A test endpoint or sandbox, so repeated calls don't touch real data

Sources: [Handle rate limits | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/handle-rate-limits>), [429 Too Many Requests - HTTP | MDN](<https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429>)

Don't have an n8n account yet? You can follow these steps in a new n8n Cloud workspace. This is a partner link, and it opens n8n's own sign-up page.

**[Sign up for n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Step-by-step: handle API rate limit exceeded errors

![Five objects in a row for the steps to handle an API rate limit exceeded error in n8n, from 429 to sealed write](/blog/en/article-8172e383-fa1b-4982-9a41-fb7df7c56ffe/9e8ac5ec8df11db919c1329a02e7d9cfedf1088916aafc76b137b4c7caa33f2f.png)

Illustrative sequence of the five tutorial steps.

Work through the steps in order. After each one, run the workflow again and check the result before you add the next change. That way you'll know which change made the difference.

**Fix the 429s one step at a time**

1. **Reproduce**: Trigger the 429 and read the error in the node's output panel.
2. **Inspect**: Return the status code and headers, and look for Retry-After.
3. **Batch**: Set Items per Batch and Batch Interval to fit the API's limits.
4. **Retry**: Turn on Retry On Fail with a wait longer than the rate-limit window.
5. **Protect writes**: Add an idempotency key to POST requests when the API supports one.

First, reproduce the API rate limit exceeded error. According to the n8n docs, when a service returns error 429, the node fails with a message saying the service is receiving too many requests. You can read that message in the node's output panel.

Next, turn on the HTTP Request node's Include Response Headers and Status response option. The n8n docs say it returns the status code and headers along with the body. MDN says a 429 response may include a Retry-After header that tells the client how long to wait. The header is optional, though, and each server sets its own rules. The n8n docs don't explain how to act on Retry-After automatically, so for now, treat it as information you read yourself.

Then space out your requests. In the HTTP Request node's Batching option, Items per Batch sets how many items go out together, and Batch Interval sets the wait between batches in milliseconds. Choose values that fit within the limits the API documents.

After that, open the node's Settings and [turn on Retry On Fail](<https://n8n-challenges.app/en/blog/retrying-failed-n8n-http-requests-safely>). The n8n docs say to set Wait Between Tries to longer than the rate-limit window. Those docs don't document a maximum number of tries or exponential waits.

Sources: [Handle rate limits | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/handle-rate-limits>), [HTTP Request | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest>), [429 Too Many Requests - HTTP | MDN](<https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429>)

If your developers keep running into rate limits and retry problems, n8n Advanced / Developer Training is the listed program closest to this topic. It is prepared for one team and runs on your own n8n instance. The link opens our For companies page, where you can send an enquiry through LinkedIn.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Protect retried writes with idempotency keys

Finally, protect your writes. In Stripe's API, all POST requests accept idempotency keys. Repeating a request with the same key returns the saved first result instead of running the operation again. This behavior is specific to Stripe. Here's our editorial suggestion: send the key in the way your API documents, and only when it documents support for idempotency keys. Build it from a stable business ID, such as an order number, rather than a random value that changes on every retry.

Sources: [Idempotent requests | Stripe API Reference](<https://docs.stripe.com/api/idempotent_requests>)

## Expected results and troubleshooting

![Duplicate receipts beside a single stamped receipt, contrasting retried writes with and without an idempotency key](/blog/en/article-8172e383-fa1b-4982-9a41-fb7df7c56ffe/632bc0863955e4afac5f56a8c82e3f727ec9c494b9d58612cc2c413a9d40725b.png)

Conceptual comparison of retries with and without idempotency keys.

Once batching and retries are set up, you should see fewer 429 errors. If an API rate limit exceeded error still appears, retries with a wait longer than the rate-limit window give a later attempt a chance to succeed, but a 429 can still stop the node if the limit persists. If something still goes wrong, find the symptom below.

**Common symptoms and what to check**

| Symptom | Likely cause | What to check |
| --- | --- | --- |
| 429s continue | Batches are too large or too close together | Lower Items per Batch or raise Batch Interval |
| 429s continue after retries | Wait Between Tries is shorter than the window | Set the wait longer than the rate-limit window |
| Duplicate records | Retried POST requests have no idempotency key | Check whether the API supports idempotency keys |
| Duplicates even with a key | The key changes on each retry | Build the key from a stable business ID |

If retries keep firing at the same moment, look at an older piece of general guidance. In a 2017 post on its engineering blog, Stripe recommended exponential backoff, where the wait doubles after each failure, plus random jitter so that many clients don't retry at once. That post is several years old, and none of this is a built-in n8n feature. Any n8n version of it is a pattern you design yourself.

Sources: [Handle rate limits | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/handle-rate-limits>), [HTTP Request | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest>), [Idempotent requests | Stripe API Reference](<https://docs.stripe.com/api/idempotent_requests>), [Designing robust and predictable APIs with idempotency](<https://stripe.com/blog/idempotency>)

Worried that your team's workflows might retry into duplicate records? A Workflow Audit reviews your n8n instance and workflows for reliability, security and maintainability. The link opens our For companies page, where you can send an enquiry through LinkedIn.

**[Audit your team's retry handling](https://n8n-challenges.app/en/companies)**

Tags: n8n, API integration, Workflow debugging, Tutorial
