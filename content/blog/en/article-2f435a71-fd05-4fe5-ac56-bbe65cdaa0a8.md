---
{
  "id": "opp_2f435a71-fd05-4fe5-ac56-bbe65cdaa0a8",
  "locale": "en",
  "slug": "article-2f435a71-fd05-4fe5-ac56-bbe65cdaa0a8",
  "urlSlug": "n8n-loop-over-items-pagination-debugging-paginated-api-pulls",
  "publishedAt": "2026-09-27T09:04:44.585Z",
  "title": "n8n Loop Over Items Pagination: Debugging Paginated API Pulls",
  "subtitle": "A practical tutorial on n8n loop over items pagination: check built-in pagination, build a manual Loop Over Items pattern, and debug missed pages or infinite loops.",
  "description": "A practical tutorial on n8n loop over items pagination: check built-in pagination, build a manual Loop Over Items pattern, and debug missed pages or infinite loops.",
  "date": "2026-09-27",
  "sourcesCheckedAt": "2026-09-27T08:38:36.333Z",
  "tags": [
    "n8n",
    "API integration",
    "Workflow debugging",
    "Tutorial"
  ],
  "coverImage": "/blog/en/article-2f435a71-fd05-4fe5-ac56-bbe65cdaa0a8/c481844ae0dcb33a13908d94c557d1270b9183f0f3f5d99a7a7e50a717c7043a.png",
  "coverAlt": "A hand moves numbered page tiles around a looping track toward an open exit gate.",
  "seo": {
    "title": "n8n Loop Over Items Pagination: Debugging Paginated API Pulls",
    "description": "A practical tutorial on n8n loop over items pagination: check built-in pagination, build a manual Loop Over Items pattern, and debug missed pages or infinite loops.",
    "keywords": [
      "n8n loop over items pagination"
    ]
  },
  "revision": "837ac8ef229bdc1dd6fe91e3a69148af40c1e4bb1df244c2c2a5d94e7b13d9b3"
}
---

## Prerequisites and the Goal: n8n Loop Over Items Pagination in Practice

n8n loop over items pagination shows up as a recurring problem for developers integrating with APIs that don't return everything in one response. This tutorial walks through building a reliable paginated pull, using n8n's Loop Over Items node when the HTTP Request node's built-in pagination doesn't fit, and explains why pages get missed, or looped forever.

Before you start, you should already be comfortable building and running a workflow in n8n, wiring nodes together and reading their output data. You also need to know your target API's pagination style: a cursor, a next-page URL, or a plain page number you increment yourself. n8n's own documentation notes that the HTTP Request node does not paginate automatically; when a call returns paginated results, the workflow itself must create a loop to walk through each page.

Sources: [Loop | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/loop>)

If you don't yet have an n8n workspace to try this pagination pattern in, you can sign up for n8n Cloud through this partner link, which opens n8n's own sign-up page, and follow along with your own paginated API.

**[Sign up for n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Step 1: Check Whether Built-in Pagination Already Covers Your API

Before building anything manual, open the HTTP Request node's Pagination options. n8n documents two built-in modes: Response Contains Next URL, which follows a next-page link returned by the API, and Update a Parameter in Each Request, which lets you increment a page number or offset on each call.

For page-number pagination, n8n exposes an expression variable, $pageCount, which starts at zero and counts how many pages the node has already fetched, so you can use it to compute the next page number without adding any extra loop node.

A community reply on the n8n forum noted that once this built-in pagination mechanism is configured correctly, it can remove the need for a manual loop entirely, so it is worth trying first even if your API's documentation looks unusual.

Sources: [Pagination | Build | n8n Docs](<https://docs.n8n.io/build/code-in-n8n/cookbook/http-request-node/pagination>), [Loop Over Items Bug? - #4 by ihortom - Questions - n8n Community](<https://community.n8n.io/t/loop-over-items-bug/62982/4>)

## Steps 2 and 3: Building a Manual Loop Over Items Pattern

![Shows the n8n loop over items pagination pattern moving a page through an exit gate check.](/blog/en/article-2f435a71-fd05-4fe5-ac56-bbe65cdaa0a8/cbab9be67cd95eeef13556cc3a0ae041ee581e4c3222116dd77d3943914b2a48.png)

An illustrative sequence of fetching a page, checking an exit condition, and looping or exiting.

Some APIs paginate in a shape that doesn't fit either built-in mode, for example when the page token has to live inside a specific [JSON body structure](<https://n8n-challenges.app/en/blog/transform-nested-json-into-simple-records-in-n8n>) rather than a URL parameter. This is exactly where manual n8n loop over items pagination comes in: n8n's documentation describes handling it with a Loop Over Items node that has its Reset option enabled, paired with an IF node that evaluates a clear exit condition on each pass.

The overall pattern follows a short sequence of steps:

1. Fetch one page: call the API for the current page inside the loop body with an HTTP Request node.
2. Carry page state: pass the next page token or page number forward as loop item data so the next iteration knows where to continue.
3. Check the exit condition: use an IF node to test whether the API signalled a last page, such as an empty results array or a missing next token.
4. Reset and repeat, or exit: route back into the loop with reset enabled while more pages remain, or let the loop's done output fire once the exit condition is true.

Getting that exit condition right matters more than it might seem: see Troubleshooting Infinite Loops and Premature Termination below for what happens when it never matches.

Sources: [Loop Over Items (Split in Batches) | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches>)

Teaching a whole team to build and debug paginated pulls consistently, rather than each developer improvising their own loop, is what an n8n Advanced / Developer Training session on this site is set up for, run on your own n8n instance and data. The link opens a page on this site describing the program.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Expected Results: Every Page Fetched Once, Loop Exits Through Done

When the pattern is wired correctly, each iteration should fetch exactly one new page, and the loop should keep re-entering its body until the IF node's exit condition is met. At that point execution should leave through the loop's done output exactly once, having touched every page a single time.

If you're testing this for the first time, [running the workflow manually](<https://n8n-challenges.app/en/blog/n8n-workflow-testing-checklist-what-to-verify-before-real-use>) with a small page size makes it easier to watch each iteration in the execution log before pointing the loop at a full production dataset.

Sources: [Loop Over Items (Split in Batches) | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches>)

## Troubleshooting Missed or Skipped Pages

![Neatly stacked pages beside jumbled overlapping pages illustrates a reset loop versus a skipped one.](/blog/en/article-2f435a71-fd05-4fe5-ac56-bbe65cdaa0a8/701415d212dbdff6bd2db41aec641353a31ad44abd69702c7de95d9bb5363eac.png)

A conceptual comparison of a correctly reset loop against one that drops or mixes pages.

Missed pages are usually a reset problem. A community member reported that a second batch of items would not iterate correctly until the Loop Over Items node was reset, meaning the reset setting mattered as much for correctness as for looping.

In one reported real-world workflow pulling a paginated travel API, an inner Loop Over Items node handling the second page immediately triggered its done branch, so that page's items were never processed, on n8n version 1.107.4.

Another community bug report described the opposite symptom: without reset configured correctly, items from earlier and later pages were all output together through the done branch only after the first batch finished, instead of page by page. These are individual forum reports rather than an [official troubleshooting guide](<https://n8n-challenges.app/en/blog/debug-n8n-workflows-before-blaming-the-integration>), so treat them as patterns to check rather than guaranteed causes.

Sources: [Loop Over Items Bug? - #4 by ihortom - Questions - n8n Community](<https://community.n8n.io/t/loop-over-items-bug/62982/4>), [Loop Over Items : “done” branch triggered too early when iterating paginated API - Questions - n8n Community](<https://community.n8n.io/t/loop-over-items-done-branch-triggered-too-early-when-iterating-paginated-api/175436>), [Reset loop over items expression - Help me Build my Workflow - n8n Community](<https://community.n8n.io/t/reset-loop-over-items-expression/125742>)

## Troubleshooting Infinite Loops and Premature Termination

n8n's documentation itself warns that an IF exit condition that never matches will leave the workflow stuck looping forever, so the first thing to check in a runaway loop is whether that condition can ever actually become true against real API responses.

Older community explanations, from 2024 and flagged here as more than two years old, described two further causes worth checking even though they may not reflect the current Loop Over Items implementation: a loop ending prematurely because the last node inside it returned an empty or missing value on some iteration, and a nested loop breaking because it shared the workflow's run-index counter with an outer loop built by manually linking a node back to a previous one.

Because n8n's Loop Over Items behavior can change across versions, getting n8n loop over items pagination right on your specific version means confirming each of these against your own installation before assuming a forum fix still applies.

Sources: [Loop Over Items (Split in Batches) | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches>), [Challenge understanding the Loop Over Items and how it works - Questions - n8n Community](<https://community.n8n.io/t/challenge-understanding-the-loop-over-items-and-how-it-works/53712>), [Issue in API Pagination with Loops - #6 by barn4k - Questions - n8n Community](<https://community.n8n.io/t/issue-in-api-pagination-with-loops/45821/6>)

If your team already has paginated workflows in production and you're unsure which ones are silently skipping pages or looping without an exit, a Workflow Audit on this site reviews your team's own n8n instance and workflows for exactly this kind of reliability risk. The link opens a page on this site describing the program.

**[Audit your team's pagination workflows](https://n8n-challenges.app/en/companies)**

Tags: n8n, API integration, Workflow debugging, Tutorial
