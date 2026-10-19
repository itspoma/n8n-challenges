---
{
  "id": "opp_3623684a-e764-491c-aadf-ce5ea4ed3896",
  "locale": "en",
  "slug": "article-3623684a-e764-491c-aadf-ce5ea4ed3896",
  "urlSlug": "n8n-worker-concurrency-a-repeatable-tuning-and-rollback-guide",
  "publishedAt": "2026-10-19T10:45:14.767Z",
  "title": "n8n Worker Concurrency: A Repeatable Tuning and Rollback Guide",
  "subtitle": "Compare n8n worker concurrency settings under a controlled webhook workload, measure queue and dependency pressure, and define acceptance and rollback criteria.",
  "description": "Compare n8n worker concurrency settings under a controlled webhook workload, measure queue and dependency pressure, and define acceptance and rollback criteria.",
  "date": "2026-10-19",
  "sourcesCheckedAt": "2026-10-19T10:30:56.396Z",
  "tags": [
    "Self-hosting",
    "Production readiness",
    "Long-form guide"
  ],
  "coverImage": "/blog/en/article-3623684a-e764-491c-aadf-ce5ea4ed3896/a4c76dd55ee0d7de23ffd372bfca85110d3bfd13064f0509c6b60b1b9f8df2d5.webp",
  "coverAlt": "Adjustable worker slots pass job parcels toward a narrow pipe representing n8n worker concurrency and dependency capacity.",
  "seo": {
    "title": "n8n Worker Concurrency: A Repeatable Tuning and Rollback Guide",
    "description": "Compare n8n worker concurrency settings under a controlled webhook workload, measure queue and dependency pressure, and define acceptance and rollback criteria.",
    "keywords": [
      "n8n worker concurrency"
    ]
  },
  "revision": "d240d0d37e136aefe55833f6a027b08fa839f628316c8ff5b9c01688764238bd"
}
---

**Contents**

- [What does n8n worker concurrency control?](#cf-section-1)
  - [Which setting actually determines worker concurrency?](#cf-section-2)
  - [Which prerequisites should already be working?](#cf-section-3)
- [How do you build a repeatable comparison workload?](#cf-section-4)
  - [What should stay constant between candidates?](#cf-section-5)
  - [How do you verify that the intended load actually arrived?](#cf-section-6)
- [What should you measure during each run?](#cf-section-7)
  - [How do you separate queue waiting, worker processing and HTTP response time?](#cf-section-8)
  - [How do you collect queue and resource signals safely?](#cf-section-9)
- [How do you identify dependency pressure before increasing concurrency?](#cf-section-10)
  - [What should you do when downstream requests are rate-limited?](#cf-section-11)
  - [What should you inspect when PostgreSQL becomes the constraint?](#cf-section-12)
- [How do you compare candidates and define acceptance criteria?](#cf-section-13)
  - [How would a hypothetical comparison lead to acceptance and rollback?](#cf-section-14)
  - [What makes a run pass, fail or inconclusive?](#cf-section-15)
- [How do you roll back and confirm recovery?](#cf-section-16)
  - [What belongs in the final operating record?](#cf-section-17)

<a id="cf-section-1"></a>

## What does n8n worker concurrency control?

n8n worker concurrency controls how many jobs a queue-mode worker can process simultaneously. For teams operating an existing self-hosted deployment, the useful question is which setting meets their workload requirements while keeping queues, resources and dependencies within agreed limits. This guide proposes a repeatable operating experiment for answering that question.

n8n documents a default worker concurrency of 10 and recommends 5 or higher. Those values are configuration guidance, not evidence of an optimal setting for your workflows. Parallel jobs and request rate are different quantities: a worker setting does not specify how many API requests your workflows will make over time.

The method below compares configurations against the same offered workload, separates response behavior from business completion, and preserves a configuration to restore. It assumes [queue mode](<https://n8n-challenges.app/en/blog/n8n-queue-mode-redis-when-to-leave-single-instance-mode>) already works; installation, monitoring-stack deployment and platform-specific deployment commands are outside its scope.

In our view, a concurrency experiment is worth doing only when another operator can explain and repeat it. Clear measurement boundaries matter as much as the setting being compared.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md>), [API load testing](<https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/?pg=dash5309>)

<a id="cf-section-2"></a>

### Which setting actually determines worker concurrency?

For self-hosted n8n queue mode, N8N_CONCURRENCY_PRODUCTION_LIMIT supplies the worker concurrency when its value differs from -1. Otherwise, n8n falls back to the --concurrency flag or its default. Do not treat the environment variable as an additional fleet-wide ceiling layered over each worker's flag.

Before changing anything, record the installed n8n version, worker count, startup command, environment override and resource limits. Preserve the last acceptable configuration as a complete deployment revision. A record containing only the flag can miss the environment value that actually determines concurrency.

The inspected master-branch implementation logs resolved concurrency during worker startup. That evidence comes from mutable master without a release identifier, so match the implementation to your installed release before relying on its output. The same release-matching limitation applies to the implementation and schema observations used later in this guide.

As editorial practice, verify each worker after deployment and retain the relevant startup output with the run record. If your release does not expose equivalent output, establish another release-appropriate verification method before interpreting a comparison.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md>), [n8n/packages/cli/src/commands/worker.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/cli/src/commands/worker.ts>)

<a id="cf-section-3"></a>

### Which prerequisites should already be working?

n8n documents that queue-mode workers need access to Redis and the n8n database, and that their encryption keys must match the main instance's key. Establish those prerequisites before treating a [stalled execution](<https://n8n-challenges.app/en/blog/n8n-queue-mode-not-working-a-troubleshooting-checklist>) as a concurrency problem.

For this experiment, use a deployment that already completes representative executions. As suggested preparation, retain one known working request and its expected business result, confirm access to operational observations, and identify who can stop the test and restore the previous configuration.

Sources: [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-4"></a>

## How do you build a repeatable comparison workload?

![Two testing benches hold matching webhook payloads and arrival timers beside differently divided worker trays.](/blog/en/article-3623684a-e764-491c-aadf-ce5ea4ed3896/e4db5efd1bab48af374d6f80b7fec7b6f79710cb83102f393884627805462791.webp)

Matching payloads and arrival schedules make the changed worker setting the focus of the comparison.

Use a representative production-webhook workload with controlled inputs and a fixed arrival schedule. Grafana's k6 documentation describes constant-arrival-rate scenarios as starting iterations at a constant rate, which supports this comparison design. An iteration can contain multiple requests, so record iteration rate and request count separately.

Define the [webhook's response contract](<https://n8n-challenges.app/en/blog/n8n-respond-to-webhook-exercise-in-predictable-json-responses>) before writing assertions. Grafana recommends response checks and performance thresholds, but an accepted webhook request may not establish business completion. Decide what observable result proves that the workflow performed its intended work.

As a suggested workload design, prepare a repeatable payload set covering the important request shapes, plus an expected result for each case. Use an isolated destination or another locally approved approach for writes, and specify how test records will be identified and reconciled.

Sources: [Scenarios](<https://grafana.com/docs/k6/latest/using-k6/scenarios/>), [API load testing](<https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/?pg=dash5309>)

<a id="cf-section-5"></a>

### What should stay constant between candidates?

Change n8n worker concurrency alone in the initial comparison. Alex Cinovoj's 2026 vendor operating guide recommends testing a sizing change against the same workload; it supplies operating advice rather than a controlled comparative result. The experiment record below is our suggested way to make that advice reviewable.

Complete this record before the baseline.

**Suggested controls for a concurrency-only experiment**

| Control | Record and hold constant |
| --- | --- |
| Workflow | Revision and relevant configuration |
| Payloads | Cases, proportions and expected results |
| Workers | Count and resource limits |
| Dependencies | Environment and test destinations |
| Requests | Arrival schedule and requests per iteration |
| Retries | Attempts, pauses and batching |
| Observation | Load duration and recovery window |
| Preparation | Initial queue and dependency conditions |

Sources: [Self-Hosting n8n at Scale, A Real Runbook | Alex Cinovoj](<https://alexcinovoj.com/blog/self-hosting-n8n-at-scale>)

<a id="cf-section-6"></a>

### How do you verify that the intended load actually arrived?

Inspect the generator before attributing an outcome to n8n. Grafana defines k6 dropped_iterations as iterations that did not start because arrival-rate executors lacked virtual users, or because iteration-based executors ran out of allowed time. This is a load-generator signal.

As an editorial decision rule, mark a run inconclusive when the intended arrival schedule was not delivered closely enough for the planned comparison. Retain scheduled iterations, started iterations, actual requests and dropped iterations, and compare them with ingress observations where available.

k6 supports scenario-specific environment variables and metric tags. Use them to identify candidate runs and payload groups, while remembering that a tag does not prove equivalent environments. Suggested identifiers include a run name and workflow revision; keep their interpretation consistent across records.

Sources: [Scenarios](<https://grafana.com/docs/k6/latest/using-k6/scenarios/>), [Built-in metrics](<https://grafana.com/docs/k6/latest/using-k6/metrics/reference/>)

<a id="cf-section-7"></a>

## What should you measure during each run?

For n8n worker concurrency comparisons, combine queue observations with execution outcomes, container resources and dependency evidence. n8n exposes waiting and active job counts, plus completed and failed job counters across workers. Completed and failed counters run from instance startup, so compare interval changes and account for restarts.

The following is a suggested measurement contract, not a native n8n report.

**Suggested measurement contract**

| Dimension | Observation | Interpretation boundary |
| --- | --- | --- |
| Correctness | Expected business result | Not established by completion counts |
| HTTP | Response checks and latency | Depends on response contract |
| Queue | Waiting and active jobs | Counts are not per-job delay |
| Completion | Completed and failed deltas | Account for restarts |
| Resources | CPU and memory over time | Not isolated to one workflow |
| Dependencies | API errors and database activity | Correlate before diagnosing |

Capture both the load period and recovery after arrivals stop.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md>), [Enable Prometheus metrics | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics>), [Runtime metrics](<https://docs.docker.com/engine/containers/runmetrics/>), [API load testing](<https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/?pg=dash5309>)

<a id="cf-section-8"></a>

### How do you separate queue waiting, worker processing and HTTP response time?

![A ribbon-marked webhook parcel links ingress, worker start and worker finish stations with separate clocks.](/blog/en/article-3623684a-e764-491c-aadf-ce5ea4ed3896/909a3b6645360fe3c7a89e779530778bc25fcb4464b781eba9cbf4e5f8cedfef.webp)

Correlated observations separate dispatch-to-start delay, worker elapsed time and the HTTP response path.

Use custom instrumentation if you need execution-level timing. As an editorial method, attach a correlation identifier and ingress timestamp to each test request, associate that identifier with its execution, and correlate timestamped worker-start and worker-finish observations. Use a consistent clock basis across components and report unmatched observations.

The inspected master-branch worker implementation emits start and finish messages containing execution and job identifiers. Its start message occurs after initial execution-data retrieval. Therefore, call ingress-to-start elapsed time dispatch-to-start delay: it includes dispatch and preflight overhead and is not exact Redis queue residence time.

Treat start-to-finish log elapsed time as a worker-processing proxy, not a universal execution-duration metric. Measure HTTP response time separately at the generator. The generated execution schema includes createdAt, startedAt and stoppedAt, but field presence alone does not establish semantics or a supported queue-delay calculation.

The cited documentation does not document a native per-execution queue-delay histogram. If correlation coverage or clock consistency is inadequate, retain the measurements you can defend and mark the affected timing comparison inconclusive.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md>), [n8n/packages/cli/src/scaling/job-processor.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/cli/src/scaling/job-processor.ts>), [n8n/docs/generated/postgres-schema/public.execution_data.md at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/docs/generated/postgres-schema/public.execution_data.md>)

<a id="cf-section-9"></a>

### How do you collect queue and resource signals safely?

For self-hosted n8n, enable metrics with N8N_METRICS=true and queue metrics with N8N_METRICS_INCLUDE_QUEUE_METRICS=true. n8n exposes queue metrics on main instances and instructs operators to expose the metrics endpoint only to internal services consuming Prometheus data.

For containerized deployments, Docker documents docker stats as a source of CPU, memory usage, memory limit and network I/O observations. Keep the collection method consistent: on Linux, the Docker CLI subtracts cache from memory usage, while the API reports total memory and cache separately.

As suggested collection practice, align queue and resource observations on the run timeline and preserve instance restart information. Container observations do not identify which dependency caused a slowdown.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md>), [Enable Prometheus metrics | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics>), [Runtime metrics](<https://docs.docker.com/engine/containers/runmetrics/>), [docker container stats](<https://docs.docker.com/reference/cli/docker/container/stats/>)

Help your team design and interpret concurrency experiments with our n8n Advanced / Developer Training. This link opens the For companies page on this site, describing custom programs using your team's own tools, data and n8n instance.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

<a id="cf-section-10"></a>

## How do you identify dependency pressure before increasing concurrency?

Inspect external-service errors and database observations alongside queue behavior. n8n documents service rate-limit responses and cautions that excessive PostgreSQL connections may degrade performance. A growing queue is a reason to investigate these signals before choosing a higher setting.

As editorial diagnostic advice, compare when queue growth begins with changes in API errors, database activity and resource use. Look for repeated patterns across comparable runs rather than assigning a cause from one coincident spike.

We think a concurrency increase that merely shifts pressure into a dependency is a poor operating trade. The decision should reward acceptable end-to-end behavior, including recovery, rather than a shorter queue at one moment.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/database.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/database.md>), [PostgreSQL: Documentation: 18: 27.2. The Cumulative Statistics System](<https://www.postgresql.org/docs/current/monitoring-stats.htm>), [PostgreSQL: Documentation: 18: 27.3. Viewing Locks](<https://www.postgresql.org/docs/current/monitoring-locks.html>), [n8n-docs/docs/integrations/builtin/handle-rate-limits.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/handle-rate-limits.md>)

<a id="cf-section-11"></a>

### What should you do when downstream requests are rate-limited?

n8n identifies HTTP 429 in node errors as a service rate-limit response. Inspect those errors and obtain applicable quotas from your provider's own documentation.

n8n documents Retry On Fail as adding a pause between attempts, and Loop Over Items with Wait as a way to batch and pause requests. These controls do not establish a coordinated rate limit across all workers.

If the evidence suggests changing retries or batching, create a separate retry-policy experiment with its own baseline. Otherwise, any observed difference would combine a concurrency change with a changed request pattern.

Sources: [n8n-docs/docs/integrations/builtin/handle-rate-limits.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/handle-rate-limits.md>)

<a id="cf-section-12"></a>

### What should you inspect when PostgreSQL becomes the constraint?

For self-hosted n8n PostgreSQL connections, DB_POSTGRESDB_POOL_SIZE controls parallel open connections. n8n warns that excessive connections may degrade performance; the documentation does not supply a workload-specific sizing formula.

PostgreSQL 18 documents pg_stat_activity for observing current server-process activity, including state and query, and pg_locks for examining outstanding locks and investigating contention. Use those observations to investigate the database during the same run window as queue measurements.

PostgreSQL 18 observation has boundaries: cumulative statistics can lag or remain cached within a transaction, and visibility into other sessions depends on privileges. Outstanding locks alone do not prove that concurrency caused a regression. As editorial advice, involve the database owner in interpreting activity and contention before changing the pool.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/database.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/database.md>), [PostgreSQL: Documentation: 18: 27.2. The Cumulative Statistics System](<https://www.postgresql.org/docs/current/monitoring-stats.htm>), [PostgreSQL: Documentation: 18: 27.3. Viewing Locks](<https://www.postgresql.org/docs/current/monitoring-locks.html>)

<a id="cf-section-13"></a>

## How do you compare candidates and define acceptance criteria?

Define acceptance criteria before running candidates. Grafana's k6 guidance recommends pass/fail criteria tied to service-level objectives or other important metrics. Your team must supply the workload requirement, latency targets, recovery allowance and resource budgets; this guide proposes no universal thresholds.

Use the blank results table below as an editorial comparison template. Enter observations rather than an overall impression, and retain underlying time series where a summary could hide growing backlog or a brief resource peak.

**Blank candidate comparison template**

| Observation | Baseline | Candidate A | Candidate B |
| --- | --- | --- | --- |
| Effective concurrency per worker | Not recorded | Not recorded | Not recorded |
| Delivered load | Not recorded | Not recorded | Not recorded |
| Successful business outcomes | Not recorded | Not recorded | Not recorded |
| HTTP response latency | Not recorded | Not recorded | Not recorded |
| Dispatch-to-start delay | Not recorded | Not recorded | Not recorded |
| Worker elapsed-time proxy | Not recorded | Not recorded | Not recorded |
| Queue recovery | Not recorded | Not recorded | Not recorded |
| CPU | Not recorded | Not recorded | Not recorded |
| Memory | Not recorded | Not recorded | Not recorded |
| Downstream errors | Not recorded | Not recorded | Not recorded |
| Database observations | Not recorded | Not recorded | Not recorded |

Our recommendation is to choose the least aggressive candidate that passes every required criterion. If the baseline already meets the agreed need, keeping it is a valid outcome; tuning does not require accepting a change.

Sources: [API load testing](<https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/?pg=dash5309>)

<a id="cf-section-14"></a>

### How would a hypothetical comparison lead to acceptance and rollback?

The following worked example is hypothetical editorial guidance. Every workload, threshold and observation here is invented to demonstrate the decision process, not a measured result or a recommended target. Suppose a team compares two workers at effective concurrency 5 against the same two workers at 10, keeping the installed version, workflow revision, resource limits, database pool, payload mix, retries and dependency environment unchanged.

For each run, schedule one webhook request per iteration at two iterations per second for five minutes: 600 requests. Allow a further 60 seconds for recovery and reconcile every expected destination record. Before testing, set local criteria: all 600 results correct, no dropped iterations, HTTP response p95 below 500 milliseconds, dispatch-to-start p95 below two seconds, queue recovery within 60 seconds, peak worker memory below 75% of its limit, no API errors and no observed database blocking. The table shows fictional observations.

**Hypothetical editorial example: invented observations, not benchmark results or universal targets**

| Dimension | Baseline: 5 | Candidate: 10 |
| --- | --- | --- |
| Delivered requests / dropped iterations | 600 / 0 | 600 / 0 |
| Correct destination results | 600 | 596 |
| HTTP response p95 | 300 ms | 280 ms |
| Dispatch-to-start p95 | 1.5 s | 0.8 s |
| Queue recovery | 30 s | 45 s |
| Peak worker memory / limit | 55% | 70% |
| API errors | 0 | 4 HTTP 429 responses |
| Database blocking observed | None | None |
| Decision | Pass | Fail |

Under these invented criteria, the baseline passes and the candidate fails despite its shorter dispatch-to-start delay. Retain the baseline. Before the candidate run, save its complete deployment revision as configuration A: two workers, --concurrency=5 and N8N_CONCURRENCY_PRODUCTION_LIMIT=-1, together with all unchanged settings. Candidate configuration B uses --concurrency=10 with that same environment value.

For this example, predeclare any HTTP 429 response as an immediate rollback trigger. When the first fictional 429 appears, stop arrivals and follow the planned shutdown procedure. Restore configuration A through the team's deployment mechanism, verify effective concurrency 5 on both workers, and reconcile uncertain writes. Replay the baseline workload; fictional recovery observations of 600 correct results, zero API errors and a 30-second queue recovery would satisfy these example recovery criteria. Preserve both the failed candidate record and the recovery evidence.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md>), [n8n/packages/cli/src/commands/worker.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/cli/src/commands/worker.ts>), [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-15"></a>

### What makes a run pass, fail or inconclusive?

Separate correctness checks from test thresholds. Grafana notes that failed k6 checks do not fail or abort a test by default. Configure the intended pass/fail behavior explicitly.

As a suggested decision rule, pass only when delivered load, business correctness, latency, queue recovery, resources and dependency failures all satisfy the predeclared criteria. Fail when a valid comparison breaches a required criterion. Mark the result inconclusive when workloads differ, observations are insufficient or the generator misses the required schedule.

Keep stop conditions distinct from final acceptance. Suggested stop conditions include an agreed error boundary, unacceptable dependency impact or inability to observe the system adequately. Assign an operator who can act on those conditions while the run is underway.

Sources: [Built-in metrics](<https://grafana.com/docs/k6/latest/using-k6/metrics/reference/>), [API load testing](<https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/?pg=dash5309>)

<a id="cf-section-16"></a>

## How do you roll back and confirm recovery?

![A closed arrival gate, finishing worker tray, restored divider and baseline parcels show the concurrency rollback sequence.](/blog/en/article-3623684a-e764-491c-aadf-ce5ea4ed3896/3e0c9327f9c1c70a40894d32fd1bca46c2731fc6838c5b06f61f5b69c2dcf287.webp)

Rollback includes controlled shutdown, restored configuration and a repeat of the baseline workload.

Restore the complete previous effective configuration, including any environment override, through your established deployment mechanism. n8n documents N8N_GRACEFUL_SHUTDOWN_TIMEOUT as the time allowed for executing worker jobs to finish before termination. Coordinate the surrounding shutdown allowance with that window.

Docker Compose documents stopping services without removing their containers and provides a shutdown timeout option. That stopping behavior is not a complete configuration-update procedure: starting an existing stopped container is not evidence that changed configuration has been applied.

A shutdown allowance does not guarantee that every execution finishes or that external writes happen exactly once. Include outcome reconciliation in your recovery plan. The sequence below is suggested editorial practice, to be adapted to your deployment.

1. Stop test arrivals when a rollback trigger is reached.
2. Use the planned shutdown procedure and observe executing work.
3. Restore the preserved deployment revision and effective override.
4. Verify each worker's applied configuration.
5. Reconcile unfinished or uncertain business outcomes.
6. Repeat the baseline workload and assess recovery criteria.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md>), [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>), [docker compose stop](<https://docs.docker.com/reference/cli/docker/compose/stop/>)

<a id="cf-section-17"></a>

### What belongs in the final operating record?

Keep the accepted configuration, workload definition, delivered-load evidence, measurement coverage, acceptance decision, rollback trigger and recovery observations together. As a suggested handover practice, include the owner and the circumstances that should prompt another comparison, such as a changed workflow mix.

The result supports an operating choice for the tested workload and environment. Preserve enough detail for another operator to repeat the comparison and assess whether the decision still fits.

Get hands-on help reviewing queue behavior, dependency pressure and rollback readiness through our Workflow Audit, covering your team's n8n instance and workflows for reliability, security and maintainability. This link opens the For companies page on this site.

**[Audit your worker setup](https://n8n-challenges.app/en/companies)**

Tags: Self-hosting, Production readiness, Long-form guide
