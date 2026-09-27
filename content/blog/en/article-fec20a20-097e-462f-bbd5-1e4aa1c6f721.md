---
{
  "id": "opp_fec20a20-097e-462f-bbd5-1e4aa1c6f721",
  "locale": "en",
  "slug": "article-fec20a20-097e-462f-bbd5-1e4aa1c6f721",
  "urlSlug": "n8n-code-node-javascript-debugging-tutorial",
  "publishedAt": "2026-09-27T20:09:49.351Z",
  "title": "n8n Code Node JavaScript: Debugging Tutorial",
  "subtitle": "A tutorial on n8n code node JavaScript: execution modes, item data access, async code, console.log debugging, and production item-linking pitfalls.",
  "description": "A tutorial on n8n code node JavaScript: execution modes, item data access, async code, console.log debugging, and production item-linking pitfalls.",
  "date": "2026-09-27",
  "sourcesCheckedAt": "2026-09-27T15:15:57.545Z",
  "tags": [
    "n8n",
    "Workflow debugging",
    "API integration",
    "Tutorial"
  ],
  "coverImage": "/blog/en/article-fec20a20-097e-462f-bbd5-1e4aa1c6f721/3d51a5571b1a4e32d8b0d13826bc38f2d5e436a7bf456653f4a599723c997c1f.png",
  "coverAlt": "A single test balloon under a magnifying glass sits before a rising cluster of production balloons.",
  "seo": {
    "title": "n8n Code Node JavaScript: Debugging Tutorial",
    "description": "A tutorial on n8n code node JavaScript: execution modes, item data access, async code, console.log debugging, and production item-linking pitfalls.",
    "keywords": [
      "n8n code node javascript"
    ]
  },
  "revision": "5ae70e85d6ce5fa3afc68cc78e11084e6ff0be3dad7780ce98fc0f0a779eb530"
}
---

## Getting Started with n8n Code Node JavaScript

A well-built script in the n8n Code node JavaScript environment can replace several ordinary nodes with a few lines of logic, but small mistakes in how items are counted or returned can be easy to miss until the workflow runs against real data. This tutorial covers setting up a Code node, choosing the right execution mode, reading item data safely, handling asynchronous code, and debugging with console.log — then what changes once that same script has to run against production API data.

To follow along you need an existing n8n workflow with at least one node producing sample output, plus a Code node placed after it and set to run in JavaScript rather than Python mode. This tutorial assumes basic familiarity with adding nodes to the canvas and treats that as ordinary navigation rather than a debugging step. The goal below is a small script that reads incoming item data, transforms it, and logs its own progress — first against one sample item, then against a realistic multi-item response.

If you don't have an n8n workspace yet, you can follow these Code node steps in a fresh one instead of a shared instance. This is a partner link that opens n8n's own sign-up page, not a page on this site.

**[Sign up for n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Choose an Execution Mode and Access Item Data

![Two workbenches compare n8n Code node JavaScript running once for all items versus once for each item.](/blog/en/article-fec20a20-097e-462f-bbd5-1e4aa1c6f721/2fe5b67a6fc81ec5344f285ebe2b51361ac3e4e79a4f4d48d1334400219edb24.png)

An illustrative comparison of the Code node's two execution modes.

The Code node offers two execution modes. Run Once for All Items is the default: the script runs a single time regardless of how many items arrive, so it must loop over the input itself. Run Once for Each Item instead runs the script separately per item, which is easier to reason about while a script is still small.

1. Choose an execution mode: Run Once for All Items or Run Once for Each Item.
2. Access item data with $json, $input.item, $input.all(), or a reference to an earlier node.
3. Handle synchronous or asynchronous code, returning a Promise when needed.
4. Debug with console.log while the script is still small.

Inside the script, $json is shorthand for the current input item's JSON data, and $input.item returns that same current item explicitly. $input.all() returns every input item as an array, which is what a script in Run Once for All Items mode loops over. When a script needs a field from an earlier node rather than its immediate input, $('Node Name').item.json pulls that linked item's data directly.

**Item-data shortcuts inside the Code node**

| Shortcut | Returns | Typical use |
| --- | --- | --- |
| $json | Current input item's JSON | Quick reads inside Run Once for Each Item |
| $input.item | The item currently being processed | Explicit equivalent of $json |
| $input.all() | Array of every input item | Looping in Run Once for All Items |
| $('Node Name').item.json | Linked item's JSON from an earlier node | Pulling a field not present on the current item |

Sources: [Using the Code node | Build | n8n Docs](<https://docs.n8n.io/build/code-in-n8n/using-the-code-node>), [Reference previous nodes | Build | n8n Docs](<https://docs.n8n.io/build/work-with-data/reference-data/reference-previous-nodes>), [Nodeinputdata | Build | n8n Docs](<https://docs.n8n.io/build/work-with-data/transform-data/expression-reference/nodeinputdata>)

## Handle Asynchronous Code and Debug with console.log

Most short transformation scripts are synchronous, but the Code node also supports async JavaScript: instead of returning items directly, a script can return a Promise that n8n waits on and resolves before passing data downstream. This matters once n8n Code node JavaScript needs to wait on an operation rather than compute a result immediately.

For debugging, n8n's own documentation names console.log as a supported way to write to the console from inside the Code node, useful for checking a value or confirming a transformation step ran. Anthony Sidashin, a developer who wrote about using n8n from a developer's perspective, described this behavior from his own hands-on experience with the Code node.

> “Properly working console.log makes debugging code blocks even more pleasant.”
>
> — Anthony Sidashin, Developer and founder of ScrapeNinja, a bootstrapped SaaS API for web scraping, writing from a developer's perspective on using n8n · Source: [My experience using n8n, from a developer perspective](<https://pixeljets.com/blog/n8n/>)

Sources: [Using the Code node | Build | n8n Docs](<https://docs.n8n.io/build/code-in-n8n/using-the-code-node>), [My experience using n8n, from a developer perspective](<https://pixeljets.com/blog/n8n/>)

If your team regularly writes custom Code node JavaScript and needs to debug it reliably together, the For companies page on this site describes n8n Advanced / Developer Training, a program built around your own n8n instance and data.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Expected Results and Troubleshooting Common Code Node Errors

After running the node against a sample item, the output pane should show one or more items, each carrying a json key, matching how n8n passes data between nodes as an array of json-wrapped objects. If the script's return value doesn't match that shape — or returns nothing — the node raises a 'doesn't return items properly' error rather than silently passing bad data forward.

A few other errors show up repeatedly once a script grows beyond a single test item, summarized below.

**Common Code node errors and their causes**

| Error | Likely cause | Fix |
| --- | --- | --- |
| "Doesn't return items properly" | Return value isn't an array of json-wrapped objects | Return an array where each item has a json key |
| "Cannot find module" | Script imports an external npm package unavailable on that instance | Install and allow-list the module on self-hosted n8n, or avoid external imports on n8n Cloud |
| Code node can't read a credential | Code nodes cannot access stored credentials by design | Fetch authenticated data with an HTTP Request node and pass only its JSON into the Code node |

Sources: [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code/common-issues>), [Using the Code node | Build | n8n Docs](<https://docs.n8n.io/build/code-in-n8n/using-the-code-node>)

## From Test Data to Real Production API Data

![Threads connect each production balloon back to its original item, showing pairedItem linking in the Code node.](/blog/en/article-fec20a20-097e-462f-bbd5-1e4aa1c6f721/703e5cd6b2039233e0af70a499ff9ec86880f35df3589390cb6594c6013a10ec.png)

A conceptual diagram of item linking when production data creates new items.

Running n8n Code node JavaScript against real production API data changes an assumption that held fine for one sample item: n8n only handles item linking automatically when there is a single incoming item. Once a script processes a multi-item API response, or creates new items instead of passing the same ones through, that automatic linking no longer covers the result, and later nodes can lose track of which output came from which input.

The fix is to set [pairedItem](<https://n8n-challenges.app/en/blog/tracing-n8n-item-linking-errors-why-item-fails-and-how-to-fix-it>) explicitly on each item the script returns, so downstream nodes can still trace a result back to its source. The credential and module limits covered above matter even more here, since production scripts are exactly where a team reaches for an external package or forgets that authenticated calls belong in the HTTP Request node, not the Code node.

Sources: [Preserving linking in the Code node | Build | n8n Docs](<https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/preserving-linking-in-the-code-node>)

If your team already has Code node scripts running against production data and you're unsure how many rely on manual pairedItem handling or hidden module assumptions, the For companies page on this site describes a Workflow Audit, a review of your n8n instance and workflows for reliability and maintainability.

**[Get your Code node scripts audited](https://n8n-challenges.app/en/companies)**

Tags: n8n, Workflow debugging, API integration, Tutorial
