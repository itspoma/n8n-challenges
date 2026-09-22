---
{
  "id": "opp_8fd5c0ad-feea-45df-8edf-8ea55c749272",
  "locale": "en",
  "slug": "article-8fd5c0ad-feea-45df-8edf-8ea55c749272",
  "urlSlug": "n8n-schedule-trigger-wrong-time-fix-time-zone-and-dst",
  "title": "n8n Schedule Trigger Wrong Time? Fix Time Zone and DST",
  "subtitle": "n8n Schedule Trigger wrong time? See which time zone n8n uses, set GENERIC_TIMEZONE or the Cloud setting, and plan for daylight saving time.",
  "description": "n8n Schedule Trigger wrong time? See which time zone n8n uses, set GENERIC_TIMEZONE or the Cloud setting, and plan for daylight saving time.",
  "date": "2026-09-22",
  "sourcesCheckedAt": "2026-09-21T21:28:03.483Z",
  "tags": [
    "n8n",
    "Workflow debugging",
    "Production readiness",
    "Tutorial"
  ],
  "coverImage": "/blog/en/article-8fd5c0ad-feea-45df-8edf-8ea55c749272/ebfd3aabe41f6bb28d5225312009a5cba3ad17b9d370a508aba70dd291b6bec0.png",
  "coverAlt": "Two clocks one hour apart being adjusted, showing an n8n Schedule Trigger wrong time fix",
  "seo": {
    "title": "n8n Schedule Trigger Wrong Time? Fix Time Zone and DST",
    "description": "n8n Schedule Trigger wrong time? See which time zone n8n uses, set GENERIC_TIMEZONE or the Cloud setting, and plan for daylight saving time.",
    "keywords": [
      "n8n schedule trigger wrong time",
      "n8n timezone setting",
      "n8n daylight saving time",
      "n8n GENERIC_TIMEZONE"
    ]
  },
  "revision": "a947ed5fe917c606719ac64f81159d8abc4a1fca54e98c8667f96e348b0ce267"
}
---

## Goal, prerequisites and how n8n picks a time zone

![Workflow time zone layered above the instance time zone for the n8n Schedule Trigger](/blog/en/article-8fd5c0ad-feea-45df-8edf-8ea55c749272/fba4cd71faf376697963b8d2bfee6145a9cf15b7432653dc1b25ac01236a193a.png)

An illustrative view of workflow settings taking priority over the instance.

Seeing an n8n Schedule Trigger wrong time problem, where runs fire hours away from what you set? One common cause, according to the n8n docs, is the time zone setting n8n uses. By the end of this tutorial, your scheduled workflow should run at the local time you meant, and you will know what to check around daylight saving time changes.

You need a scheduled workflow you can edit and access to its workflow settings. To change the instance-wide default, you also need either the n8n Cloud dashboard or access to the [environment variables of a self-hosted instance](<https://n8n-challenges.app/en/blog/n8n-environment-variables-and-credentials-shared-instance-checklist>).

According to the n8n docs, the Schedule Trigger takes its time zone from the settings in the table below, and the defaults may not match your location, so a workflow with no explicit setting can run hours away from where you expect.

**Where the Schedule Trigger gets its time zone**

| Setting | Where to change it | Default |
| --- | --- | --- |
| Workflow Timezone | Workflow settings | Not set: the instance time zone is used |
| Instance time zone (Cloud) | Dashboard, Manage, Timezone | Detected at sign-up, otherwise GMT |
| Instance time zone (self-hosted) | GENERIC_TIMEZONE variable | America/New_York |

Sources: [Schedule Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger>), [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/common-issues>)

Following along from scratch? You can try these steps in a new n8n Cloud workspace. This is a partner link that opens n8n's own sign-up page.

**[Sign up for n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Steps to fix the n8n timezone setting

To fix an n8n Schedule Trigger wrong time problem, the n8n docs say you can change the time zone for a single workflow or for the whole instance. Follow the steps in order. Setting the workflow time zone first makes sense because it overrides the instance default (see the table above).

**Fixing the schedule's time zone**

1. **Open workflow settings**: Open the workflow on the canvas, select the three-dots icon in the upper right, then Settings.
2. **Set Timezone**: Pick a named zone such as Europe/London and select Save.
3. **Set instance default**: On Cloud, select Manage on the dashboard and change Timezone; self-hosted, set GENERIC_TIMEZONE.
4. **Republish**: Unpublish the workflow and publish it again so the schedule uses the new settings.
5. **Confirm**: Check that the next execution happens at the local time you intended.

On n8n Cloud, the docs say the dashboard Timezone setting affects both the Schedule Trigger and the Date & Time node. The Cloud docs do not say which plans this applies to. On self-hosted n8n, the docs give an example of exporting the n8n GENERIC_TIMEZONE environment variable with the value Europe/Berlin. They do not say whether you need to restart afterwards. As our editorial advice, plan a restart to be safe.

The docs say a change to the trigger interval only takes effect after you unpublish the workflow and publish a new version. The new schedule then counts from the time you publish. The docs do not say whether a time zone change also needs republishing. Republishing anyway is our editorial advice, not documented behavior. UI labels may also differ between versions.

Sources: [Schedule Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger>), [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/common-issues>), [Set the timezone | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-the-timezone>), [Set your timezone | Deploy | n8n Docs](<https://docs.n8n.io/deploy/use-n8n-cloud/configure-cloud/set-your-timezone>)

If your team keeps running into scheduling and settings problems like this one, n8n Corporate Fundamentals is a training program for a team, run on your own n8n instance. The link opens our For companies page, where you can send an enquiry through LinkedIn.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## n8n daylight saving time: pick the right kind of zone

![Region-based time zone clock shifting for daylight saving beside a fixed UTC clock](/blog/en/article-8fd5c0ad-feea-45df-8edf-8ea55c749272/ea425c090248dcd9782a1daf4da7d321b80b83ff451566d22f1cd5cdbe959d4b.png)

A conceptual comparison of region-based and fixed time zones.

Choose your zone based on what should stay constant: the local clock time, or the UTC time. As editorial guidance, a named, region-based zone such as Europe/London is the natural choice if you care about local clock time, and a fixed GMT option without daylight saving if you want the run tied to UTC.

The n8n docs don't describe this; one community forum thread from 2024 on n8n 1.38.2 in Docker does, so treat it as an anecdote, not documented behavior. In that thread, a user set a workflow to London time but expected GMT. During British Summer Time the trigger ran one hour off from GMT. A responder said it had correctly followed London time and suggested the GMT option without daylight saving if the run should stay aligned with a UTC server.

The n8n documentation doesn't explain what happens to runs scheduled inside the hour that is skipped or repeated when clocks change. Our editorial suggestion: avoid scheduling important jobs in that window.

Sources: [Schedule Trigger and Confusion Over Time Zone Settings in n8n Workflow - Questions - n8n Community](<https://community.n8n.io/t/schedule-trigger-and-confusion-over-time-zone-settings-in-n8n-workflow/45401>)

## Expected results and troubleshooting

After you republish and the next scheduled time passes, check that the run happened at the local time you set in the workflow's Timezone. If you still see an n8n Schedule Trigger wrong time result, work through these checks.

- [ ] The workflow has been saved and published; the docs say the trigger only runs after both.
- [ ] Variables in a cron expression are evaluated only at publish time, so republish after they change.
- [ ] The workflow Timezone is set, so the instance default does not apply.
- [ ] Missed runs: with the default in-memory scheduler, missed executions never run. Catch-up options exist from n8n 2.36, only on Schedule Trigger nodes added from that version and only when the instance runs the durable scheduler.

As an editorial recommendation, teams can adopt a shared rule: every scheduled workflow gets an explicit named time zone, and your [workflow standards](<https://n8n-challenges.app/en/blog/n8n-workflow-review-checklist-what-to-check-before-go-live>) record the instance time zone, whether that is GENERIC_TIMEZONE or the Cloud dashboard setting.

Sources: [Schedule Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger>), [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/common-issues>), [Set the timezone | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-the-timezone>), [Set your timezone | Deploy | n8n Docs](<https://docs.n8n.io/deploy/use-n8n-cloud/configure-cloud/set-your-timezone>)

Not sure which of your team's scheduled workflows depend on the instance default? A Workflow Audit reviews your n8n instance and workflows for reliability, security and maintainability. The link opens our For companies page, where enquiries go through LinkedIn.

**[Audit your workflow schedules](https://n8n-challenges.app/en/companies)**

Tags: n8n, Workflow debugging, Production readiness, Tutorial
