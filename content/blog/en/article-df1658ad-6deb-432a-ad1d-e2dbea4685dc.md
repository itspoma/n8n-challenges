---
{
  "id": "opp_df1658ad-6deb-432a-ad1d-e2dbea4685dc",
  "locale": "en",
  "slug": "article-df1658ad-6deb-432a-ad1d-e2dbea4685dc",
  "urlSlug": "n8n-load-testing-an-editorial-exercise-to-find-provisional-capacity",
  "publishedAt": "2026-10-16T14:31:12.276Z",
  "title": "n8n Load Testing: An Editorial Exercise to Find Provisional Capacity",
  "subtitle": "Practise n8n load testing on an isolated self-hosted workflow: increase synthetic webhook traffic, reconcile completed work and identify a repeatable passing rate.",
  "description": "Practise n8n load testing on an isolated self-hosted workflow: increase synthetic webhook traffic, reconcile completed work and identify a repeatable passing rate.",
  "date": "2026-10-16",
  "sourcesCheckedAt": "2026-10-16T14:16:27.570Z",
  "tags": [
    "Self-hosting",
    "Production readiness",
    "Exercise"
  ],
  "coverImage": "/blog/en/article-df1658ad-6deb-432a-ad1d-e2dbea4685dc/bca5a452ec9b01b719dcc681f7e730f33dc4a9a70ff7271c31459dd6578892b2.webp",
  "coverAlt": "Pink parcels travel along a gated conveyor toward a weighing tray beside a stopwatch for n8n load testing.",
  "seo": {
    "title": "n8n Load Testing: An Editorial Exercise to Find Provisional Capacity",
    "description": "Practise n8n load testing on an isolated self-hosted workflow: increase synthetic webhook traffic, reconcile completed work and identify a repeatable passing rate.",
    "keywords": [
      "n8n load testing",
      "n8n performance testing"
    ]
  },
  "revision": "a36d7b5faf9f372eceadece8f9a076a27efe3c57bc6252e1f43b263953025c2a"
}
---

## Your n8n load testing task

This editorial exercise asks your team to identify the highest tested webhook arrival rate that meets your latency, failure and completed-work requirements. The proposed n8n load testing drill has not been executed or validated. Its result is provisional: it applies only to the tested duration, workload, deployment, dependencies and completion contract.

Start with an existing working [self-hosted test instance](<https://n8n-challenges.app/en/blog/setting-up-an-n8n-staging-environment>), an isolated workflow, a working k6 installation and a controlled downstream service. Installation is outside this exercise. Use synthetic records and replace external side effects with stubs. WireMock supports request-matched responses and fixed delays; these do not establish real-service quotas, availability, business effects or the full distribution of downstream latency.

We think a useful capacity exercise should start with what counts as finished work, because a fast acknowledgement is too weak a basis for an operating decision.

Sources: [Stubbing | WireMock](<https://wiremock.org/docs/stubbing/>), [Simulating Faults | WireMock](<https://wiremock.org/docs/simulating-faults/>)

## Define inputs and completion evidence

![Shape-stamped tokens connect across three evidence layers with pink threads for n8n workflow completion checks.](/blog/en/article-df1658ad-6deb-432a-ad1d-e2dbea4685dc/3d65ab092b5e7179dd7c2f5b9e4ec28a80893d892899f64ac320642ebbfc43d9.webp)

Matching tokens and pink threads across three layers illustrate how identifiers connect submissions, receipts and completed outputs.

Prepare the following exercise inputs before sending traffic. Record the installed versions of n8n, k6 and WireMock. The limits are decisions for your team, not universal recommendations.

**Suggested exercise input sheet**

| Input | Record before testing |
| --- | --- |
| Configuration | Versions, execution mode, concurrency, hardware and workflow revision |
| Workload | Synthetic payload shape, rates and plateau duration |
| HTTP acceptance | Request-latency and transport-failure limits |
| Completed work | Expected output, required completion proportion and deadline |
| Stop limits | Resource ceilings and readiness conditions |
| Evidence | Submission ledger, receipts and accessible execution outcomes |

[Publishing an n8n workflow registers its production webhook](<https://n8n-challenges.app/en/blog/publish-an-n8n-webhook-trigger-from-test-url-to-fixing-404s>); use that URL inside the isolated deployment. An immediate response acknowledges startup, whereas last-node response mode waits for that node to finish. Neither acknowledgement nor a last-node response alone proves every intended business effect. Require the expected output, a final-operation receipt and a successful execution outcome within your drain deadline.

Design correlation IDs from a run identifier, scenario name and k6 scenario.iterationInTest, which is unique within its scenario. This composite is an editorial suggestion. Keep an actual submission ledger rather than inferring counts from the largest ID, since distributed iteration sequences may have gaps.

Sources: [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.webhook/README.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.webhook/README.md>), [k6/execution](<https://grafana.com/docs/k6/latest/javascript-api/k6-execution/>)

## Run increasing traffic plateaus

![Pink beads move through gated channels into bowls as a hand closes the last gate, depicting n8n traffic stages.](/blog/en/article-df1658ad-6deb-432a-ad1d-e2dbea4685dc/3d664153b4021b10e051d751e3b1c69a965155e6618fecefe987131a067c4fd2.webp)

Beads moving through gated channels into bowls illustrate separate traffic stages and the draining of already accepted work.

For this n8n performance testing exercise, define one webhook POST per k6 iteration. k6 supports JSON payloads with a Content-Type header; explicitly control redirects and check the intended endpoint response. Its constant-arrival-rate executor starts iterations independently of response time while virtual users remain available. Configure rate, timeUnit, duration, preAllocatedVUs and maxVUs for each separate plateau.

Follow this suggested sequence, retaining the same payload and downstream assumptions between stages.

1. Smoke-test a submission and verify ID propagation, expected output and accessible completion evidence.
2. Run a low arrival-rate plateau and record configured versus achieved submissions, latency and HTTP failures.
3. Stop submissions, allow draining and reconcile receipts with execution outcomes.
4. Increase the arrival rate only after a passing stage; record readiness, resource observations and execution states each time.
5. Repeat the highest passing stage with the same configuration to check repeatability.

On all self-hosted n8n editions, /metrics is disabled by default and enabled with N8N_METRICS=true; it is unavailable on n8n Cloud. Verify which measurements you can collect rather than assuming particular resource or backlog metrics exist. /healthz/readiness returns HTTP 200 when the database is connected and migrated; it does not prove workload capacity. /healthz establishes reachability without database status. Queue-mode worker health checks require QUEUE_HEALTH_CHECK_ACTIVE=true.

Stop escalation when an acceptance limit fails, readiness deteriorates, a resource ceiling is reached or the generator cannot deliver the intended load. k6 provides exec.test.abort(), after which teardown still runs. Stopping the generator does not cancel work already accepted by n8n; observe it through the agreed drain deadline.

Sources: [n8n-docs/docs/deploy/host-n8n/keep-n8n-running/monitor-n8n.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/keep-n8n-running/monitor-n8n.md>), [Constant arrival rate](<https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/constant-arrival-rate/>), [k6/execution](<https://grafana.com/docs/k6/latest/javascript-api/k6-execution/>), [HTTP Requests](<https://grafana.com/docs/k6/latest/using-k6/http-requests/>)

Lead a team practising load-test design and interpretation? Our n8n Advanced / Developer Training helps your team develop those skills using your own tools, data and n8n instance. The link opens the For companies page on this site.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Reconcile submissions with completed work

![Sorting trays show an empty recess, duplicate shapes and a partly placed object for n8n completion reconciliation.](/blog/en/article-df1658ad-6deb-432a-ad1d-e2dbea4685dc/35282250c9a63e95df48a350cc49f7db2cb87880641f0a5bd0eac92846a94457.webp)

Sorting trays with an empty recess, duplicate shapes and a partly placed object illustrate missing, duplicate and unfinished work.

For n8n load testing, reconcile identifiers after every plateau. WireMock exposes received requests through GET /__admin/requests and matching counts through POST /__admin/requests/count. Keep its in-memory journal enabled and intact until reconciliation; its memory use can affect the test. A journal receipt proves arrival at the stub, not successful business completion.

Use n8n execution filters for workflow, status and start time to investigate outcomes. Visibility depends on workflow access, and deleting the workflow deletes its execution history. Build the reconciliation process before applying load; do not assume these tools automatically connect submissions to completed work. Produce this suggested record from your ledger, receipts and execution evidence.

- [ ] Count actual submissions and unique IDs meeting the entire completion contract.
- [ ] List missing IDs and duplicate final-operation receipts.
- [ ] Separate HTTP failures from failed workflow executions and incorrect outputs.
- [ ] List executions still unfinished at the drain deadline.
- [ ] Mark unavailable or ambiguous evidence explicitly.

Sources: [View all executions | Build | n8n Docs](<https://docs.n8n.io/build/understand-workflows/understand-executions/view-all-executions>), [Verifying | WireMock](<https://wiremock.org/docs/verifying/>)

## Work through a hypothetical capacity decision

This worked example of n8n load testing uses invented exercise inputs and outcomes, not measured n8n results. Suppose a team chooses five-minute plateaus, HTTP response p95 at or below 500 milliseconds, HTTP failures at or below 1%, and 100% correct unique completions within 60 seconds after submissions stop, with no duplicate outputs. These are hypothetical team choices, not recommended limits.

Assume unchanged configuration, immediate webhook acknowledgements, intact evidence, stable readiness and no resource stop-limit breaches. Run the stages in the table's order, draining between them. Count a completion only when its ID has the expected output, final-operation receipt and successful execution outcome. The table separates acknowledgement latency from that completion contract.

**Invented exercise outcomes; each plateau lasts 300 seconds**

| Stage | Configured rate / total | Actual submissions / rate | HTTP p95 | HTTP failures | Completions by deadline |
| --- | --- | --- | --- | --- | --- |
| A | 10/s / 3,000 | 3,000 / 10/s | 200 ms | 0 / 3,000 = 0% | 3,000 / 3,000 = 100% |
| B | 20/s / 6,000 | 6,000 / 20/s | 400 ms | 0 / 6,000 = 0% | 6,000 / 6,000 = 100% |
| B repeat | 20/s / 6,000 | 6,000 / 20/s | 420 ms | 0 / 6,000 = 0% | 6,000 / 6,000 = 100% |
| C | 30/s / 9,000 | 9,000 / 30/s | 700 ms | 180 / 9,000 = 2% | 8,820 / 9,000 = 98% |

Calculate achieved rate as actual submissions divided by 300 seconds. For stage B, 6,000 divided by 300 gives 20 submissions per second; HTTP failures are 0 divided by 6,000, or 0%, and completions are 6,000 divided by 6,000, or 100%. Its repeat also passes. For stage C, 180 divided by 9,000 gives 2% HTTP failures, while 8,820 divided by 9,000 gives 98% completion. Its 700-millisecond p95 also exceeds the chosen limit.

The suggested decision is a provisional highest tested passing rate of 20 submissions per second, reproduced in stage B's repeat. Stage C fails despite achieving its configured traffic; stop escalation. Its 180 incomplete IDs require investigation, even though their count equals the HTTP failure count: matching totals do not establish matching IDs or a cause. Rates between 20 and 30 remain untested, and this example establishes no production operating limit.

## Finish with a bounded decision

Completion means documenting a repeatable highest tested passing plateau with its configuration and workload assumptions. If every stage passes, report only the highest tested passing rate; you have not established an upper boundary. If the generator or evidence collection limits the exercise, report an inconclusive result.

Suggested reflection: inspect generator virtual-user availability, stub matching, journal integrity and n8n execution states. For self-hosted n8n in regular mode, production concurrency control is disabled by default; N8N_CONCURRENCY_PRODUCTION_LIMIT limits concurrent production executions and queues excess work in FIFO order. It excludes manual, sub-workflow, error and CLI executions. [Queue mode uses a separate concurrency mechanism](<https://n8n-challenges.app/en/blog/n8n-queue-mode-vs-normal-mode-when-to-switch>).

Our practical recommendation is to change one suspected constraint and repeat the same workload before attributing an improvement to it. Treat a queue or latency spike as a clue to investigate, not a causal diagnosis.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md>), [View all executions | Build | n8n Docs](<https://docs.n8n.io/build/understand-workflows/understand-executions/view-all-executions>), [Constant arrival rate](<https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/constant-arrival-rate/>), [Verifying | WireMock](<https://wiremock.org/docs/verifying/>)

Get hands-on help reviewing the reliability and maintainability concerns your exercise exposes with our Workflow Audit of your team's n8n instance and workflows. The link opens the For companies page on this site; enquiries use that page's LinkedIn link.

**[Review your team's workflow reliability](https://n8n-challenges.app/en/companies)**

Tags: Self-hosting, Production readiness, Exercise
