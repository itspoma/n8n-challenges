---
{
  "id": "opp_87bd8c80-96f7-49ac-aed4-a3e00882f2f5",
  "locale": "en",
  "slug": "article-87bd8c80-96f7-49ac-aed4-a3e00882f2f5",
  "urlSlug": "n8n-rbac-a-recurring-access-review-checklist",
  "publishedAt": "2026-10-16T18:09:40.074Z",
  "title": "n8n RBAC: A Recurring Access Review Checklist",
  "subtitle": "Review n8n RBAC against current team responsibilities, include workflow-derived credential access, and track permission changes to verified closure.",
  "description": "Review n8n RBAC against current team responsibilities, include workflow-derived credential access, and track permission changes to verified closure.",
  "date": "2026-10-16",
  "sourcesCheckedAt": "2026-10-16T18:02:42.170Z",
  "tags": [
    "n8n",
    "Checklist"
  ],
  "coverImage": "/blog/en/article-87bd8c80-96f7-49ac-aed4-a3e00882f2f5/d3305cd308436ba865810898a02e82921918dd3900a67248d32d6b249eb702b3.webp",
  "coverAlt": "Keys sorted into resource compartments represent an n8n RBAC review of current team responsibilities.",
  "seo": {
    "title": "n8n RBAC: A Recurring Access Review Checklist",
    "description": "Review n8n RBAC against current team responsibilities, include workflow-derived credential access, and track permission changes to verified closure.",
    "keywords": [
      "n8n rbac"
    ]
  },
  "revision": "7508a1971ad8d758e37e772ca20a113831b8d0b5980595e9563bb53e787b764a"
}
---

## Define the n8n RBAC review

A recurring n8n RBAC review should answer [who has access, why they still need it](<https://n8n-challenges.app/en/blog/n8n-governance-what-a-growing-instance-needs>), and whether approved changes actually took effect. This checklist suggests a manual review process for engineering managers and IT leads; its cadence and completion criteria are editorial recommendations, not mandatory standards or proof of compliance.

Start by recording the review context below. n8n distinguishes [instance-wide permissions from project permissions](<https://n8n-challenges.app/en/blog/rbac-meaning-in-n8n-when-a-small-team-needs-it>), so review both. Feature availability depends on the subscription and installed version; apply only the checks supported for your setup.

- [ ] Record deployment type, subscription and installed n8n version.
- [ ] Name the review owner, reviewers and in-scope resources.
- [ ] Set the next review date and responsibility-change triggers.
- [ ] Agree where decisions and verification evidence will be retained.

Sources: [n8n-docs/docs/administer/manage-users-and-access/understand-instance-roles.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-users-and-access/understand-instance-roles.md>)

## Inventory every access route

Use one review row per user, resource and access route. Project membership matters: n8n documents that project workflows are shared with project members, with actions controlled by project roles. This workflow-sharing behavior applies to all n8n Cloud plans and self-hosted Business and Enterprise.

The following fields are our suggested review record. Completion means every in-scope row has an accountable reviewer. We think reviewing access routes is more useful than simply approving a list of usernames: it makes each permission decision specific.

**Suggested fields for a manual access review**

| Field | What to record |
| --- | --- |
| Identity and resource | User and affected project, workflow or credential |
| Access route | Instance role, project membership or sharing |
| Responsibility | Current task requiring access |
| Reviewer | Person accountable for the decision |
| Decision and reason | Retain, modify or revoke, with justification |
| Remediation | Implementer, due date and verification result |

Sources: [Share with others | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/share-with-others>)

## Justify instance-wide privileges

n8n documents that instance owners can see and edit all workflows, credentials and projects. Its Admin instance role is available on Cloud Pro and Enterprise and self-hosted Enterprise. Review elevated access separately from project assignments rather than treating project membership as the complete boundary.

Use these suggested checks to finish this part of the review. Completion means each elevated assignment has a recorded business justification or an assigned change.

- [ ] Identify every owner and instance administrator in scope.
- [ ] Confirm the person's current responsibility requires instance-wide access.
- [ ] Record retain, modify or revoke and the business reason.
- [ ] Assign an implementer and due date for each approved change.

Sources: [n8n-docs/docs/administer/manage-users-and-access/understand-instance-roles.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-users-and-access/understand-instance-roles.md>)

## Match project permissions to current work

Check the actions each person needs, including visibility, manual execution and editing. n8n's Project Viewer role is read-only and cannot manually execute workflows, but includes access to project workflows, credentials and executions; it is available on Cloud Enterprise and self-hosted Enterprise. Project Editors can view, create, update and delete project workflows, credentials and executions; n8n documents Editor availability on Cloud Pro and self-hosted Enterprise.

For Cloud Enterprise and self-hosted Enterprise, custom project roles are documented from n8n 1.122.0; individual scopes can require later versions. Editing a shared custom role affects its assigned users across projects. Inspect both its permissions and assignments before approving a definition change.

Our suggested n8n RBAC completion check is to compare each assignment with the person's current tasks, record mismatches, and identify everyone affected by a proposed custom-role edit.

Sources: [n8n-docs/docs/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md>), [n8n-docs/docs/administer/manage-users-and-access/set-permissions-and-roles-rbac/create-custom-project-roles.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-users-and-access/set-permissions-and-roles-rbac/create-custom-project-roles.md>)

Lead a team through permission decisions with our n8n Office Hours / Coaching, using your own tools, data and n8n instance. This link opens the For companies page on this site, where we describe the program.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Include workflow-derived credential use

![Two routes reach a credential cabinet, showing direct sharing and workflow-derived credential use in n8n.](/blog/en/article-87bd8c80-96f7-49ac-aed4-a3e00882f2f5/6c456eb6a9819be744f28fed5f96ef7661a64e0b8a45a6917aab37eb0f3f7dd1.webp)

The direct walkway and workshop route depict direct sharing and workflow-derived credential use.

For workflow sharing on all n8n Cloud plans and self-hosted Business and Enterprise, editors can use credentials embedded in shared workflows even when those credentials are not explicitly shared with them. n8n also restricts editing nodes using unshared credentials. Credential use is different from viewing secret values.

For [credential sharing](<https://n8n-challenges.app/en/blog/n8n-environment-variables-and-credentials-shared-instance-checklist>) on those same plans and editions, users using a shared credential cannot view or edit its details through that sharing route; elevated and project-role permissions need separate consideration. Removing a credential-sharing entry requires saving the change.

Use the following suggested checks before marking credential access reviewed. In our view, removing a sharing entry should start verification, rather than serve as the evidence that removal is complete.

- [ ] Identify shared workflows that use each in-scope credential.
- [ ] Review who can access those workflows through sharing or project membership.
- [ ] Record whether credential use remains justified for each route.
- [ ] Include all relevant routes in any removal decision.

Sources: [n8n-docs/docs/administer/manage-credentials/share-credentials-securely.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-credentials/share-credentials-securely.md>), [Share with others | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/share-with-others>)

## Verify decisions with safe permission checks

For n8n RBAC verification, we suggest authorized test accounts and non-destructive checks against an approved access matrix. Compare expected visibility and denied actions, including workflow-derived credential use. Do not reveal secret values or execute production workflows merely to demonstrate access.

Completion means observed permissions match the approved decision. If access persists unexpectedly, revisit instance privileges, project membership, direct sharing and embedded credential use before closing the change.

Sources: [n8n-docs/docs/administer/manage-users-and-access/understand-instance-roles.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-users-and-access/understand-instance-roles.md>), [n8n-docs/docs/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md>), [n8n-docs/docs/administer/manage-credentials/share-credentials-securely.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-credentials/share-credentials-securely.md>), [Share with others | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/share-with-others>)

## Close changes with evidence

IDPro's 2025 article by Vatsal Gupta, Optimizing Access Certifications, describes recording review results and checking that corrective actions occurred on time. It is professional guidance, not evidence that this checklist reduces incidents.

Our suggested closure checks below turn decisions into a reviewable record. Completion means verified changes are closed, while unresolved work remains visible.

- [ ] Retain the decision, justification and change evidence.
- [ ] Record the verification result and closure date.
- [ ] Keep unfinished remediation open with an owner and due date.
- [ ] Record approved exceptions with an approver and expiry date.

Sources: [Optimizing Access Certifications](<https://bok.idpro.org/article/119/galley/270/download/>)

Get hands-on help examining your team's access boundaries with our Workflow Audit, a review of your n8n instance and workflows for reliability, security and maintainability. This link opens the For companies page on this site.

**[Review your team’s access](https://n8n-challenges.app/en/companies)**

Tags: n8n, Checklist
