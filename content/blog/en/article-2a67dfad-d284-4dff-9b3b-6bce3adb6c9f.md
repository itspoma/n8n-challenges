---
{
  "id": "opp_2a67dfad-d284-4dff-9b3b-6bce3adb6c9f",
  "locale": "en",
  "slug": "article-2a67dfad-d284-4dff-9b3b-6bce3adb6c9f",
  "urlSlug": "n8n-backup-and-restore-an-isolated-recovery-exercise",
  "publishedAt": "2026-10-16T08:56:29.740Z",
  "title": "n8n Backup and Restore: An Isolated Recovery Exercise",
  "subtitle": "Practise n8n backup and restore with a same-version SQLite recovery exercise that checks inventory, stored credentials and required files in an isolated target.",
  "description": "Practise n8n backup and restore with a same-version SQLite recovery exercise that checks inventory, stored credentials and required files in an isolated target.",
  "date": "2026-10-16",
  "sourcesCheckedAt": "2026-10-16T08:46:15.946Z",
  "tags": [
    "Self-hosting",
    "Production readiness",
    "Exercise"
  ],
  "coverImage": "/blog/en/article-2a67dfad-d284-4dff-9b3b-6bce3adb6c9f/db5dde646a6e1f30fa3b0c3b32117383c8ffb713cd728169a85a59d8f270c961.webp",
  "coverAlt": "A recovery case holds automation parts and a key beside an isolated workbench for n8n backup and restore.",
  "seo": {
    "title": "n8n Backup and Restore: An Isolated Recovery Exercise",
    "description": "Practise n8n backup and restore with a same-version SQLite recovery exercise that checks inventory, stored credentials and required files in an isolated target.",
    "keywords": [
      "n8n backup and restore"
    ]
  },
  "revision": "1be6ea6b6eb5f80a700d9205cb6a6ba122ca4c277865e4bdd622e7fc39218fec"
}
---

## Your n8n backup and restore task

![An isolated n8n recovery target connects only to a test service behind a barrier from production.](/blog/en/article-2a67dfad-d284-4dff-9b3b-6bce3adb6c9f/d5cbfec9891f8c898e69180a036dfb114c724f52459102b4e08fb4da445e3cec.webp)

The enclosure illustrates the exercise’s required isolation and designated test-service access.

This editorial exercise asks you to rehearse n8n backup and restore: recover a stopped instance into a separate target, then check its inventory, a stored test credential and required files. The proposed procedure has not been executed or validated.

The worked scope is self-hosted, single-instance SQLite, using the publish/unpublish controls documented for n8n 2.0. PostgreSQL restore commands, queue recovery, external-storage configuration and cross-version migrations are outside this exercise. n8n documents that startup applies pending database migrations; matching versions is our exercise constraint, not a compatibility guarantee. The cited official documentation is undated and reflects its state when checked; the source-check dates displayed with the citations are not publication dates.

Start only with an administrator-prepared target meeting the prerequisites below. Network isolation depends on your infrastructure; implementing it is outside the supplied documentation. We think recovery practice is most useful when containment is a prerequisite rather than something participants must improvise.

- [ ] Use separate target storage and the source instance’s exact n8n version.
- [ ] Establish no production ingress and block outbound access to production.
- [ ] Permit only the designated test service for network verification.
- [ ] Prepare access to the backup, deployment settings and original encryption key.

Sources: [n8n-docs/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/use-the-command-line.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/use-the-command-line.md>), [n8n/.agents/skills/db-migrations/SKILL.md at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/.agents/skills/db-migrations/SKILL.md>)

## Prepare the fixture and backup inventory

![A tray holds the folder, encryption key, configuration and dependencies for an n8n backup.](/blog/en/article-2a67dfad-d284-4dff-9b3b-6bce3adb6c9f/35322712a09acec4abb4034a05ef00df4020d3c8985e8dcba67491b0eec8b584.webp)

The separate objects illustrate the artifacts an administrator inventories before capture.

Before stopping the source, prepare a harmless workflow that uses an HTTP Request node with a stored credential for an administrator-provided test service. Explicitly select its authentication mode and credential. Define the expected response and ensure unauthenticated requests are rejected. These are suggested exercise inputs, not a validated test instrument.

Record workflow and user inventories, the n8n version, storage paths and deployment settings. If filesystem data is in scope, choose a known file and record its expected contents. Use the inventory below to distinguish the worked SQLite backup from additional artifacts your deployment may require.

**Backup inventory based on n8n’s self-hosted documentation**

| Artifact | What to preserve | Exercise scope |
| --- | --- | --- |
| .n8n folder | Entire folder, including default SQLite data | Worked procedure |
| Encryption key | Original config or matching N8N_ENCRYPTION_KEY | Required for credentials |
| Deployment settings | Configuration needed to recreate the deployment | Required input |
| Additional storage | Configured binary and execution storage locations | Include when configured |
| Custom nodes | Required custom-node directories | Include when configured |
| PostgreSQL database | Database backup alongside other artifacts | Outside worked procedure |

n8n documents that workflow and credential CLI exports omit users, roles, execution history, variables and instance settings. Treat those exports as a partial artifact, not a substitute for the instance backup.

Sources: [n8n-docs/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md>), [skills/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md>)

## Capture and restore the stopped instance

![A stopped n8n machine, an archive case and an enclosed recovery target show the restoration sequence.](/blog/en/article-2a67dfad-d284-4dff-9b3b-6bce3adb6c9f/bef2ad9040a58191bba5ad8942399288b255f1c5c5b324c4ee7f1a79ee34b1c8.webp)

The sequence illustrates moving a stopped instance’s artifacts into the prepared recovery target.

Follow this suggested sequence for the n8n backup and restore rehearsal.

1. Stop the source n8n instance before copying SQLite and the .n8n folder.
2. Copy the complete user folder and preserve the inventoried additional paths, custom-node directories, deployment settings and encryption key.
3. Restore those artifacts into the stopped, pre-isolated target using separate target storage.
4. Restore deployment configuration, adapting target paths and addresses while preserving the matching encryption key.
5. With the CLI configured against the restored target database, run n8n unpublish:workflow --all before starting the target.
6. Start the isolated target and proceed to the selected verification checks.

For the n8n 2.0 publish/unpublish model, unpublishing is an additional startup control: it does not provide network isolation or prevent deliberate manual execution. The CLI documentation also warns that importing previously active workflows on non-multi-main instances can leave cron triggers running until restart, so import deactivation is not a containment substitute.

Do not use decrypted credential exports for this exercise: they expose secrets in plaintext.

Sources: [n8n-docs/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/use-the-command-line.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/use-the-command-line.md>)

Lead a team practising recovery procedures? Our n8n Advanced / Developer Training helps teams work on credentials and architecture using their own tools, data and n8n instance. The link opens the For companies page on this site.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Check recovery and diagnose failures

![Reference and restored n8n artifacts sit side by side while a key is checked in a test lock.](/blog/en/article-2a67dfad-d284-4dff-9b3b-6bce3adb6c9f/760d8afed2a1731519f04f2702af4710ae04e51ad54c6aa5a0418371a77f82bf.webp)

Comparing artifacts and checking the test key illustrate the exercise’s selected recovery checks.

Use the following editorial completion criteria to assess the recovered instance. In our view, a visible workflow canvas is too weak a stopping point; the exercise should require evidence that the restored artifacts can actually be used.

- [ ] Compare restored workflows and users with the recorded inventory, allowing for deliberate unpublishing.
- [ ] Manually execute the harmless fixture using its restored test credential without re-entering the secret.
- [ ] Confirm the test service authenticates the request and returns the defined response.
- [ ] Read the known file and compare its contents, if filesystem data is in scope.
- [ ] Record each check’s evidence and each failure separately.

If authentication fails, check the [original encryption key](<https://n8n-challenges.app/en/blog/n8n-environment-variables-and-credentials-shared-instance-checklist>), HTTP Request authentication mode, credential type and selected credential. n8n documents that a credential can be ignored when authentication is not enabled. If files or nodes are missing, compare restored locations and custom-node directories with your inventory before changing the workflow.

Sources: [n8n-docs/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md>), [skills/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md>)

## Record what the rehearsal establishes

Finish your n8n backup and restore exercise with a recovery record: backup identity, source version, restored paths, check results and unresolved failures. Completion demonstrates only the selected checks; it does not establish coverage of every workflow, credential or external dependency.

Suggested reflection: which missing artifact would prevent another administrator from repeating the recovery? A useful response names the artifact, where it belongs in the backup procedure and how the next rehearsal will check it. Update that procedure before treating the exercise as complete.

Get hands-on help reviewing your team’s recovery setup with our Workflow Audit, which reviews your n8n instance and workflows for reliability, security and maintainability. The link opens the For companies page on this site, describing programs run on your own tools, data and n8n instance.

**[Review your team’s recovery readiness](https://n8n-challenges.app/en/companies)**

Tags: Self-hosting, Production readiness, Exercise
