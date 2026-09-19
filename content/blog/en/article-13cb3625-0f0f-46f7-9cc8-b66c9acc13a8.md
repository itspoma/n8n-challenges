---
{
  "id": "opp_13cb3625-0f0f-46f7-9cc8-b66c9acc13a8",
  "locale": "en",
  "slug": "article-13cb3625-0f0f-46f7-9cc8-b66c9acc13a8",
  "urlSlug": "n8n-deployment-options-self-hosting-and-queue-mode",
  "title": "n8n Deployment Options: Self-Hosting and Queue Mode",
  "subtitle": "A practical guide to n8n deployment options for a team: choosing an installation method and database, and knowing when to move from main mode to queue mode.",
  "description": "A practical guide to n8n deployment options for a team: choosing an installation method and database, and knowing when to move from main mode to queue mode.",
  "date": "2026-09-19",
  "sourcesCheckedAt": "2026-09-19T12:40:59.381Z",
  "tags": [
    "n8n",
    "Self-hosting",
    "Production readiness",
    "Long-form guide"
  ],
  "coverImage": "/blog/en/article-13cb3625-0f0f-46f7-9cc8-b66c9acc13a8/6799b2ec85db24ca57941a990a354d85d2a4152322824b6d8f92fa028e54a630.png",
  "coverAlt": "Illustration of n8n deployment options as one main container passing work through a hub to three worker crates",
  "seo": {
    "title": "n8n Deployment Options: Self-Hosting and Queue Mode",
    "description": "A practical guide to n8n deployment options for a team: choosing an installation method and database, and knowing when to move from main mode to queue mode.",
    "keywords": [
      "n8n deployment options",
      "n8n queue mode docs"
    ]
  },
  "revision": "86ca77a8eb901d69170e3d54072eb7747ed2862075d8ec8377e2061277b84ac8"
}
---

**Contents**

- [What self-hosting n8n commits your team to](#cf-section-1)
- [Which n8n deployment options fit your team?](#cf-section-2)
  - [One-line setup, Docker and Docker Compose](#cf-section-3)
  - [Cloud providers, Kubernetes and the deprecated npm route](#cf-section-4)
- [Which database should back a team instance?](#cf-section-5)
  - [How SQLite and PostgreSQL differ for a team instance](#cf-section-6)
- [When does queue mode matter, and how does it work?](#cf-section-7)
  - [Setting the encryption key, executions mode and Redis](#cf-section-8)
  - [Workers, concurrency and scaling limits](#cf-section-9)
  - [What changes in day-to-day operations after the switch](#cf-section-10)
- [A staged path from single container to queue mode](#cf-section-11)

<a id="cf-section-1"></a>

## What self-hosting n8n commits your team to

Comparing n8n deployment options starts with an honest look at what you are taking on. n8n documents self-hosting on your own infrastructure through Docker Compose, a one-line setup script or other methods, and notes that every self-hosted installation runs the same core product. Without a license key it runs as the free Community edition; a key unlocks Business or Enterprise editions.

The documentation is direct about the trade-off: Docker is recommended for most self-hosting needs, but [self-hosting requires technical knowledge of servers, containers, scaling and security](<https://n8n-challenges.app/en/blog/self-hosted-n8n-production-readiness-checklist>), and n8n Cloud is recommended for people who are not experienced at managing servers. Treat that as a staffing question before it becomes an architecture question.

Release cadence matters too. n8n publishes a new minor version most weeks, with the stable line intended for production and beta possibly unstable. Pin a stable release rather than tracking beta. Version numbers move weekly, so check the current release yourself instead of trusting any number written in an article.

One operational detail is easy to miss and expensive later: even when you use PostgreSQL, n8n recommends keeping the .n8n directory persistent, because it holds [encryption keys, instance logs and source control assets](<https://n8n-challenges.app/en/blog/n8n-security-checklist-for-a-shared-self-hosted-instance>). That encryption key is the value you will later copy to every worker.

- [ ] Decide who on the team owns servers, containers and security.
- [ ] Choose Community or a licensed edition before you size infrastructure.
- [ ] Pin a stable n8n release for production.
- [ ] Mount the .n8n directory on persistent storage.
- [ ] Set the encryption key explicitly on the first run.

Sources: [Host n8n | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n>), [Install with Docker | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/install-options/install-with-docker>)

<a id="cf-section-2"></a>

## Which n8n deployment options fit your team?

![Comparison of a lightweight quick setup, a production Compose stack and a set-aside deprecated install route](/blog/en/article-13cb3625-0f0f-46f7-9cc8-b66c9acc13a8/cea1e5d56a2e0d916b69141a98aedc098768604a9daa4eca49845b17214b024e.png)

Illustrative contrast of the documented installation routes.

The documented installation methods are not interchangeable; each is positioned for a different situation, and picking the wrong one usually shows up as a migration later.

The table below summarises how n8n's own documentation positions the main routes.

**How n8n documentation positions each self-hosting route**

| Method | Documented purpose | Note |
| --- | --- | --- |
| Docker Compose | Production deployments with databases and additional services | Recommended production path |
| One-line setup script | Quick setup with minimal configuration on Linux or macOS | Minimal configuration |
| npm | Local development or testing | Deprecated from n8n 3.0 |
| Cloud providers | Deploy on managed infrastructure | Per-provider steps not covered here |

Sources: [Host n8n | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n>)

<a id="cf-section-3"></a>

### One-line setup, Docker and Docker Compose

The one-line setup is designed for quick setup with minimal configuration on Linux or macOS. That makes it a fine way to see n8n running, but a team instance needs a database, backups and a defined upgrade path, and those are exactly what Docker Compose is positioned for: production deployments with databases and additional services.

Practically, a team is best served by writing a Compose file it can commit and review, because the same file then documents the database connection, the persistent volume and the environment variables that queue mode will later need.

Sources: [Host n8n | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n>)

<a id="cf-section-4"></a>

### Cloud providers, Kubernetes and the deprecated npm route

n8n lists cloud deployment targets including AWS, Azure, Google Cloud Run and Google Kubernetes Engine, DigitalOcean, Hetzner, Heroku and OpenShift. These are options, not equivalents; per-provider requirements are outside what this guide covers, so read the provider page for the platform you pick.

What the list does tell you is that the n8n deployment options span very different operating models. A single droplet on DigitalOcean or a server at Hetzner gives you one machine you patch yourself. A container platform such as Cloud Run, Kubernetes Engine or OpenShift gives you scheduling and restarts, but asks your team for manifests, secrets handling and storage decisions that a single Compose file keeps in one place.

A useful way to choose is to ask which platform your team already operates in production. Running n8n beside systems you monitor and upgrade every week is usually less risky than introducing a new platform for one workload, because the knowledge n8n asks for, servers, containers, scaling and security, is the same knowledge your existing platform already demands.

The npm route deserves a clear verdict. It is documented as best for local development or testing and is deprecated from n8n 3.0, with Docker Compose or the one-line setup recommended instead. If a team instance is running on npm today, plan the move rather than waiting for an upgrade to force it.

Sources: [Host n8n | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n>)

<a id="cf-section-5"></a>

## Which database should back a team instance?

By default, self-hosted n8n uses SQLite, stored as a file at ~/.n8n/database.sqlite. PostgreSQL is optional and configured through environment variables such as DB_TYPE set to postgresdb, DB_POSTGRESDB_HOST and DB_POSTGRESDB_PORT, which defaults to 5432. n8n needs permission to create and modify its own table schemas, so grant that when you provision the database user.

- SQLite is the default and needs no configuration.
- PostgreSQL is enabled through DB_TYPE and connection environment variables.
- The n8n database user must be able to create and modify table schemas.

Version support is a moving target. n8n supports the latest two actively maintained PostgreSQL major versions, which were 17 and 18 as of July 2026, plus one older major, 16. Amazon Aurora PostgreSQL is experimental, and derivatives such as AlloyDB or CockroachDB are unsupported. Supported majors shift each November, so confirm the current list before provisioning.

The editorial recommendation is simple: start a team instance on PostgreSQL rather than SQLite. The next section explains why that choice is effectively a queue-mode prerequisite, and starting there avoids a database migration under pressure later.

Sources: [Choose n8n's database | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/choose-n8ns-database>), [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-6"></a>

### How SQLite and PostgreSQL differ for a team instance

The default database is not a placeholder: SQLite saves credentials, past executions and workflows just as PostgreSQL does, and a small team instance can run on it for a long time. The difference shows up in what each choice allows next rather than in any figure the documentation publishes, since n8n's pages describe support and configuration rather than comparative performance.

The decisive constraint is distribution. n8n states that queue execution mode with SQLite is not recommended and that a distributed setup over SQLite is not supported, because Redis brokers the messages while the database persists the data. A file-based database sitting inside one container has no role to play once several worker processes need to read and write the same execution records.

PostgreSQL also brings obligations that a file does not. You choose a supported major version, grant the n8n user permission to create and modify its table schemas, and decide how TLS is configured between n8n and the database. n8n supports the latest two actively maintained majors, 17 and 18 as of July 2026, plus 16, and asks readers to re-check because the range shifts each November.

**Database choices for a self-hosted n8n instance**

| Aspect | SQLite | PostgreSQL |
| --- | --- | --- |
| Configuration | Default, no variables needed | DB_TYPE and connection variables |
| Location | File at ~/.n8n/database.sqlite | External server, port 5432 by default |
| Queue mode | Not recommended, distributed setup unsupported | Supported |
| Version policy | Not documented here | Latest two majors plus one older major |

Two further points are easy to get wrong. Amazon Aurora PostgreSQL is experimental and n8n's version support does not extend to it, and PostgreSQL-compatible derivatives such as AlloyDB, CockroachDB or YugabyteDB are unsupported. If you want a managed database, choose one that presents upstream PostgreSQL at a supported major version.

Sources: [Choose n8n's database | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/choose-n8ns-database>), [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

Before you operate a queue-mode instance, practise the failure handling it makes visible: the Keep Restaurant Orders Moving challenge has you recover every valid order from a paginated API that rate-limits and fails unexpectedly, using retries, validation and an error workflow, built in your own n8n environment.

**[Try the restaurant orders challenge](https://n8n-challenges.app/en/challenges/unstable-restaurant-orders)**

<a id="cf-section-7"></a>

## When does queue mode matter, and how does it work?

![Objects in sequence showing a trigger creating an execution, a queue hub and workers writing results back](/blog/en/article-13cb3625-0f0f-46f7-9cc8-b66c9acc13a8/488d9670eed5cdb10ad7d4056385c62b73c33bed99bb48a42eeb2610ab1b6516.png)

Conceptual depiction of the queue mode execution path.

n8n documents that running at scale, with a large number of users, workflows or executions, requires configuration changes, that queue mode provides the best scalability, and that reviewing execution data saving and pruning can improve database performance. Reading the [n8n queue mode docs](<https://n8n-challenges.app/en/blog/n8n-queue-mode-redis-when-to-leave-single-instance-mode>) alongside the scaling page is worth the hour before you change anything.

No documented threshold defines when at scale begins, so the switch is a judgement call. The editorial signals we suggest watching are execution volume that queues behind itself, long-running workflows that block others, and a sluggish editor UI while executions run. Those are suggestions for framing the decision, not measured thresholds.

The architecture itself is straightforward. In queue mode, one main instance handles timers and webhook calls, generates an execution and passes the execution ID to Redis. A worker picks it up, reads the workflow data from the database, writes results back and notifies Redis. You scale by adding or removing workers.

**How an execution travels in queue mode**

1. **Trigger**: The main instance handles timers and incoming webhook calls.
2. **Create execution**: The main instance generates an execution for the triggered workflow.
3. **Enqueue**: The execution ID is passed to Redis.
4. **Pick up**: A worker takes the execution ID from Redis.
5. **Run**: The worker reads workflow data from the database and runs it.
6. **Report back**: The worker writes results to the database and notifies Redis.

Among n8n deployment options this is the one that changes your operating model rather than just your install command, so treat it as a staged step rather than a default.

Sources: [Scaling | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling>), [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-8"></a>

### Setting the encryption key, executions mode and Redis

Three prerequisites carry most of the risk, and the numbered list below puts them in the order you apply them. The executions mode has to match across processes, the encryption key has to be shared so workers can read credentials, and Redis has to be reachable at the host and port you configure; QUEUE_BULL_REDIS_HOST and QUEUE_BULL_REDIS_PORT default to localhost and 6379.

1. Set EXECUTIONS_MODE to queue on the main instance.
2. Set the same value on every worker.
3. Copy the main instance's encryption key to each worker and webhook processor node.
4. Point QUEUE_BULL_REDIS_HOST and QUEUE_BULL_REDIS_PORT at your Redis instance.
5. Confirm the instance is running on PostgreSQL, not SQLite.

Some queue-mode subtopics are documented in more detail than this guide covers, including webhook processor nodes with load balancer path routing, binary data storage constraints and webhook response size limits. If your workflows move binary data or return large webhook payloads, read those pages directly before you switch.

Sources: [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-9"></a>

### Workers, concurrency and scaling limits

Workers start with the n8n worker command, or the n8nio/n8n image with the worker argument under Docker. They can expose optional health and readiness endpoints, including /healthz, when QUEUE_HEALTH_CHECK_ACTIVE is enabled. Concurrency defaults to 10, and n8n recommends 5 or higher, because low concurrency spread across many workers can exhaust the database connection pool.

That pool is the practical ceiling most teams hit first. Size PostgreSQL connections against workers multiplied by concurrency before adding more workers, rather than after.

The optional endpoints are worth enabling early rather than during an incident. A readiness endpoint that reports whether a worker's database and Redis connections are up turns a vague slowdown into a specific answer, and it gives a load balancer or orchestrator something concrete to act on when a worker loses Redis.

Multi-main high availability is documented as available on self-hosted Enterprise and not on n8n Cloud. All mains must run queue mode on PostgreSQL and Redis, run the same n8n version, set N8N_MULTI_MAIN_SETUP_ENABLED to true and sit behind sticky sessions, with a leader running at-most-once tasks. Viewing running workers in Settings then Workers is likewise Enterprise-only. Reserve this for teams that genuinely need high availability and hold that licence; one main plus several workers is the simpler model.

Sources: [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-10"></a>

### What changes in day-to-day operations after the switch

Queue mode changes how work reaches the database and how you reason about a slow workflow. In a single main process, a trigger, an execution and its result all live in one place. Once workers are involved, a run touches the main instance, Redis and the database before it finishes, so an investigation starts by asking which of those three is unhappy.

Sources: [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-11"></a>

## A staged path from single container to queue mode

Put together, the n8n deployment options form a sequence rather than a menu. Start with Docker Compose and PostgreSQL on a supported major version, following the checklist at the top of this guide. That instance already meets every queue mode prerequisite except Redis.

When the single main process becomes the bottleneck, add Redis, set the executions mode on main and workers, and start with a small number of workers at concurrency of at least 5. Add workers only after checking the database connection pool. Keep webhook processor nodes in reserve for the case where inbound webhook volume, specifically, is the constraint.

**Suggested staged rollout for a team instance**

1. **Compose plus Postgres**: Run Docker Compose with PostgreSQL on a supported major version.
2. **Add Redis**: Introduce Redis and set the queue connection variables.
3. **Share the key**: Copy the main instance's encryption key to every worker.
4. **Switch mode**: Set the executions mode to queue on main and workers.
5. **Scale workers**: Add workers at concurrency of at least five, watching the connection pool.

One caveat frames all of the above: everything here comes from n8n's own documentation, which offers architecture and configuration guidance rather than independent benchmarks, cost figures or reliability data. Your own load testing remains the only way to know where your instance tips over.

Sources: [Host n8n | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n>), [Choose n8n's database | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/choose-n8ns-database>), [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

If you are responsible for the team that will run this instance, the For companies page on this site describes custom n8n programs delivered on your own n8n instance, tools and data; the n8n Advanced / Developer Training program fits groups taking on self-hosting and queue mode.

**[Train your team on self-hosted n8n](https://n8n-challenges.app/en/companies)**

Tags: n8n, Self-hosting, Production readiness, Long-form guide
