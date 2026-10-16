---
{
  "id": "opp_7aa694ea-1bee-4bc2-afac-10dd1a56e749",
  "locale": "en",
  "slug": "article-7aa694ea-1bee-4bc2-afac-10dd1a56e749",
  "urlSlug": "n8n-execution-data-retention-a-self-hosted-ops-checklist",
  "publishedAt": "2026-10-16T10:39:40.784Z",
  "title": "n8n execution data retention: a self-hosted ops checklist",
  "subtitle": "Configure n8n execution data retention, verify saving and pruning with synthetic payloads, and assign owners to storage exceptions.",
  "description": "Configure n8n execution data retention, verify saving and pruning with synthetic payloads, and assign owners to storage exceptions.",
  "date": "2026-10-16",
  "sourcesCheckedAt": "2026-10-16T10:30:58.253Z",
  "tags": [
    "Self-hosting",
    "Production readiness",
    "Checklist"
  ],
  "coverImage": "/blog/en/article-7aa694ea-1bee-4bc2-afac-10dd1a56e749/a271bb48f50f04f781b70c16b3a8c443e4ce343bc47bcfd2fb1ccfe850596687.webp",
  "coverAlt": "An archive drawer, hourglass and held-aside slips represent n8n execution data retention decisions.",
  "seo": {
    "title": "n8n execution data retention: a self-hosted ops checklist",
    "description": "Configure n8n execution data retention, verify saving and pruning with synthetic payloads, and assign owners to storage exceptions.",
    "keywords": [
      "n8n execution data retention"
    ]
  },
  "revision": "c2569fc5d024ffa109bf74a3a4348062a38d04f948cef207ae4d13c329310539"
}
---

## Define your n8n execution data retention policy

For a self-hosted team, n8n execution data retention starts with deciding what investigation history you need, then checking what actually remains stored. This checklist covers saving controls, pruning, synthetic verification and retention exceptions. It excludes Cloud plan retention, storage migration and a complete deployment tutorial.

The supporting n8n documentation is undated and reflects what was retrieved on 2026-10-16; it does not establish compatibility with every installed release. Confirm applicability to your installation before changing settings. The checks and completion criteria below are editorial recommendations, not mandatory standards or reported test results.

We think retention should start with a named investigation need, rather than a duration copied from another deployment. Use these opening checks; this section is complete when each workflow category has an owner and a reason for its retention window.

- [ ] Record the installed release and applicable storage features.
- [ ] Choose an investigation window for each workflow category.
- [ ] Assign an owner for settings and each relevant storage location.
- [ ] Document why failures need retaining and who approves exceptions.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/manage-execution-data.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/manage-execution-data.md>)

## Choose which execution data to save

For self-hosted n8n, the execution-variable reference documents four separate saving controls. Saving failures does not guarantee that sensitive payloads are excluded. Use the table to record an explicit decision for each control.

**Documented saving controls with suggested policy questions**

| Data category | Control | Suggested question |
| --- | --- | --- |
| Failed executions | EXECUTIONS_DATA_SAVE_ON_ERROR | What failure evidence do we need? |
| Successful executions | EXECUTIONS_DATA_SAVE_ON_SUCCESS | Why retain successful payloads? |
| Manual executions | EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS | Should manual test data persist? |
| Per-node progress | EXECUTIONS_DATA_SAVE_ON_PROGRESS | Do we need saved progress? |

Our practical preference is to retain failures where investigation needs justify it and disable unnecessary successful, manual and progress data. This section is complete when all four choices are documented and ready for verification.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md>)

## Record pruning thresholds and exceptions

![Loose and clipped execution slips show pruning eligibility and retained exceptions in self-hosted n8n.](/blog/en/article-7aa694ea-1bee-4bc2-afac-10dd1a56e749/690bedeae5ea17c0ccd83bab9f6e2dbe1d2e1c2d6d46fde638c2c9ae6cd241a2.webp)

Separated slips illustrate why some executions remain outside scheduled pruning.

For self-hosted n8n, EXECUTIONS_DATA_PRUNE controls pruning, alongside an age threshold in hours, a maximum execution count, a hard-delete buffer and separate soft-delete and hard-delete intervals. Eligibility and deletion scheduling are distinct: these settings do not establish an exact deletion deadline for your deployment.

The execution-data guide describes scheduled pruning that marks eligible finished executions before permanent deletion. New, running and waiting executions are excluded, and annotated executions, such as those with tags or ratings, are never pruned. The count threshold does not guarantee an exact remaining count; account for count-based eligibility potentially shortening your investigation history.

Use these checks to make the schedule and exceptions reviewable. Completion means the configured values and every identified exception have been recorded.

- [ ] Record pruning enablement, age threshold and maximum count.
- [ ] Record both deletion intervals and the hard-delete buffer.
- [ ] Identify new, running, waiting and annotated executions.
- [ ] Assign an owner to each retention exception.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/manage-execution-data.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/manage-execution-data.md>)

Train your team to work through retention verification with our n8n Advanced / Developer Training, using your own tools, data and n8n instance. The link opens the For companies page on this site.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Verify saving and cleanup with synthetic payloads

![Dummy tokens, a magnifying glass and an inspected drawer depict synthetic execution retention checks.](/blog/en/article-7aa694ea-1bee-4bc2-afac-10dd1a56e749/c8e4b8bc33c689fee0c06d570ece368e033a7e6d2c5804c30de9c2791cd629d9.webp)

Dummy tokens and storage inspection illustrate the proposed synthetic verification exercise.

Verify n8n execution data retention in [an isolated test environment](<https://n8n-challenges.app/en/blog/setting-up-an-n8n-staging-environment>) using invented sensitive fields, never real personal or company secrets. Completion means observed saving and cleanup match your recorded policy, with discrepancies captured for review.

1. Create synthetic successful, failed and manual executions with recognizable dummy fields.
2. Record execution identifiers and inspect which payloads are saved against your four saving decisions.
3. Select finished, unannotated executions that meet the configured pruning eligibility.
4. Observe them across the deletion intervals and buffer, checking relevant storage as well as history visibility.
5. For mismatches, inspect saving settings, execution status, annotations and applicable external-storage policies.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/manage-execution-data.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/manage-execution-data.md>)

## Separate external storage cleanup from redaction

![A screen hiding stored tokens contrasts with an emptied container to distinguish redaction from deletion.](/blog/en/article-7aa694ea-1bee-4bc2-afac-10dd1a56e749/0a5b762ff23f45e81a275ee056420495f948804f728e9146f9506f7c9203841a.webp)

Hidden tokens remain present, illustrating why redaction does not demonstrate deletion.

For self-hosted Business and Enterprise n8n, external-storage documentation distinguishes binary data from execution data. Apply the documented cleanup mechanism to each storage type in the table; completion means each applicable mechanism has an owner. The cited S3 execution-data documentation does not establish Azure execution-data cleanup behavior.

**External-storage cleanup distinctions for self-hosted Business and Enterprise**

| Stored data | Documented cleanup | Suggested check |
| --- | --- | --- |
| S3 binary data | Bucket lifecycle configuration | Identify lifecycle owner |
| Azure binary data | Lifecycle policy unless retaining indefinitely | Record policy or intentional exception |
| S3 execution data | Standard execution pruning | Avoid execution-data lifecycle rules |

For self-hosted Enterprise and Cloud Enterprise, n8n documents redaction as a visibility control that leaves stored execution data unchanged. Availability depends on version. This checklist does not cover configuring redaction. In our view, a hidden payload is insufficient evidence for closing a deletion check.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/use-external-storage.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/use-external-storage.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/security/redact-execution-data.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/security/redact-execution-data.md>)

## Close discrepancies with a named owner

An S3 execution-data lifecycle rule could delete data n8n still references, according to its external-storage guide for self-hosted Business and Enterprise. Treat a conflicting rule as a discrepancy to resolve before approving the review.

Close your n8n execution data retention review with the checks below. This checklist does not establish deletion from backups, replicas, external recipients or independent logging systems, or provide an organization-wide erasure guarantee. Physical disk-space reclamation and database maintenance are outside scope; successful cleanup need not mean a smaller database file.

- [ ] Attach configured values, test identifiers and observed outcomes.
- [ ] Give each unresolved discrepancy an owner and next action.
- [ ] Record accepted exceptions and the person approving them.
- [ ] Approve completion only within the storage boundaries actually checked.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/use-external-storage.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/use-external-storage.md>)

Get hands-on help reviewing execution retention through our Workflow Audit, covering your team's n8n instance and workflows for reliability, security and maintainability. The link opens the For companies page on this site.

**[Review your team's retention](https://n8n-challenges.app/en/companies)**

Tags: Self-hosting, Production readiness, Checklist
