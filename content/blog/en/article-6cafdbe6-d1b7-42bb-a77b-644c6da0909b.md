---
{
  "id": "opp_6cafdbe6-d1b7-42bb-a77b-644c6da0909b",
  "locale": "en",
  "slug": "article-6cafdbe6-d1b7-42bb-a77b-644c6da0909b",
  "urlSlug": "n8n-expense-tracker-an-editorial-exercise-in-capture-and-review",
  "publishedAt": "2026-10-23T16:24:43.304Z",
  "title": "n8n Expense Tracker: An Editorial Exercise in Capture and Review",
  "subtitle": "Build a test-mode n8n expense tracker with a form, Google Drive receipts, a shared Google Sheet and synthetic records to compare.",
  "description": "Build a test-mode n8n expense tracker with a form, Google Drive receipts, a shared Google Sheet and synthetic records to compare.",
  "date": "2026-10-23",
  "sourcesCheckedAt": "2026-10-23T16:16:01.645Z",
  "tags": [
    "n8n",
    "Data transformation",
    "Hands-on learning",
    "Exercise"
  ],
  "coverImage": "/blog/en/article-6cafdbe6-d1b7-42bb-a77b-644c6da0909b/1f1ebec369c593ac165f964ffde0989c3c3db51323b039eea5156fcbb9f8fb4c.webp",
  "coverAlt": "A tray holds receipts and currency tokens while a hand moves one receipt toward a separate review tray.",
  "seo": {
    "title": "n8n Expense Tracker: An Editorial Exercise in Capture and Review",
    "description": "Build a test-mode n8n expense tracker with a form, Google Drive receipts, a shared Google Sheet and synthetic records to compare.",
    "keywords": [
      "n8n expense tracker",
      "n8n expense tracker template",
      "n8n spending tracker"
    ]
  },
  "revision": "a2da7dcee5c09988641da713825d7aebc8d0db53551c621a1563511b530a3eba"
}
---

## Editorial exercise: define your n8n expense tracker

Build an n8n expense tracker that captures synthetic expenses, uploads dummy receipts to Google Drive and records amounts and currencies in a shared Google Sheet. Route explicitly uncertain entries to a named reviewer, then compare the log with an independent reference tab. This is an editorial exercise: the proposed workflow has not been executed or validated.

Use only the Form Trigger Test URL. Credential setup, production deployment, OCR, currency conversion, automated approvals and bank reconciliation are outside scope. This exercise does not establish accounting, tax or regulatory compliance, transaction safety, duplicate prevention or reliable recovery from partial failures.

We think a useful finance practice project should make uncertainty visible before it tries to automate more decisions.

Sources: [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md>)

Need a workspace for this exercise? Our partner link opens n8n's own sign-up page, where you can sign up for n8n Cloud.

**[Sign up for n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Prepare the workspace and synthetic inputs

You need an existing n8n workspace, configured Google Drive and Google Sheets credentials, a practice-only Drive folder, and a spreadsheet shared with you and a designated reviewer. Prepare dummy receipt files. The supplied documentation is undated and does not establish compatibility with every installed release; check your available operations before starting.

Use these suggested log columns: expense_id, amount, currency, receipt_file_id, review_required, review_owner and review_status. Keep amounts and currencies separate, and never combine different currencies into one spending total. These fields and the review policy are editorial design choices.

Create an independent reference tab containing only expense_id, amount and currency. The following synthetic fixture deliberately includes matching, changed, missing and extra records. All currencies here are EUR; supply one dummy receipt per submitted expense.

**Suggested synthetic fixture; amounts are exercise inputs, not measured results.**

| Expense ID | Reference amount | Submit amount | Uncertain? |
| --- | --- | --- | --- |
| EXP-01 | 12.50 | 12.50 | No |
| EXP-02 | 8.00 | 9.00 | Yes |
| EXP-03 | 5.00 | Do not submit | Not applicable |
| EXP-04 | Absent | 7.00 | No |

Sources: [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md>)

## Build the capture and manual-review path

![A slip, receipt folder and flagged ledger represent the n8n expense tracker capture and review path.](/blog/en/article-6cafdbe6-d1b7-42bb-a77b-644c6da0909b/a3f70059934778ce574b8cc6d6dc95d80a70a8f5d5a39ab047c57ea60de78b28.webp)

The objects represent submission, receipt storage and a reviewable spreadsheet record.

Form Trigger supports File and Number elements and passes submitted data into the workflow. Google Drive documents uploading a binary input to a chosen folder, while Google Sheets supports Append Row with manual column mapping. Follow this suggested build sequence.

1. Create form fields for expense_id, numeric amount, currency, receipt upload and an explicit uncertainty choice.
2. Select Execute Workflow and submit through the Test URL; inspect the output to find the receipt's actual binary field.
3. Configure Google Drive Upload with your credentials, that binary field and the practice folder.
4. Preserve the submitted expense values alongside the returned file identifier for the row-writing paths.
5. Manually map each expense value, receipt_file_id and review field into Google Sheets Append Row.

Use If comparisons for the explicit uncertainty choice. On the uncertain branch, set review_required to true, review_owner to your designated person's name and review_status to pending before appending the row. On the other branch, use false, a blank owner and not_requested. These are suggested labels, not a validated financial policy.

Have the reviewer inspect pending entries and update their status manually in the sheet. Check receipt access separately: sharing the spreadsheet does not establish receipt access. Google Drive supports adding permissions for specific users or groups.

Sources: [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md>), [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.if.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.if.md>)

Leading a team learning capture, mapping and manual-review workflows? Our n8n Corporate Fundamentals program brings custom training to your team's own tools, data and n8n instance. This link opens the For companies page on this site.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Compare your n8n spending tracker with the reference

![Two stacks of expense slips show matching, changed and unmatched records in the log and reference.](/blog/en/article-6cafdbe6-d1b7-42bb-a77b-644c6da0909b/b4f367563eab31e9179d5d9375d99059c34873bfc74f885952edd8eface6e91d.webp)

Paired and unmatched slips illustrate the synthetic comparison cases.

Read both tabs using Google Sheets Get Row(s), without filters. Prepare both comparison inputs with only expense_id, amount and currency, using matching field types. Exclude receipt identifiers and review metadata so they do not create irrelevant differences.

The supplied repository implementation declares Compare Datasets node versions 1, 2, 2.1, 2.2 and 2.3, matching fields and four comparison outputs.

For this suggested solution, connect the practice log as input A and the reference as input B, matching on expense_id. The fixture should yield EXP-01 as Same, EXP-02 as Different, EXP-03 as In B only and EXP-04 as In A only. Explain each discrepancy before correcting it and rerunning the comparison.

Sources: [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md>), [n8n/packages/nodes-base/nodes/CompareDatasets/CompareDatasets.node.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/CompareDatasets/CompareDatasets.node.ts>)

## Check completion and diagnose mismatches

Your n8n expense tracker is complete for this exercise only when you observe the checks below. Reset the practice log between full capture runs.

- [ ] Submitted amounts and currencies are preserved in the log.
- [ ] The designated reviewer can open each uploaded receipt.
- [ ] Uncertain entries have a named owner and pending status before review.
- [ ] The unchanged, changed, missing and extra fixtures reach their expected outputs.

If a check fails, inspect the submitted binary field and upload destination first, then the manual column mappings. Check receipt permissions as the reviewer. For comparison mismatches, inspect matching identifiers and field types on both inputs.

Sources: [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md>), [n8n/packages/nodes-base/nodes/CompareDatasets/CompareDatasets.node.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/CompareDatasets/CompareDatasets.node.ts>)

## Reflect before reusing an n8n expense tracker template

Treat this design as a practice specification when assessing an n8n expense tracker template. Suggested reflection questions: Who takes over when a reviewer is absent? Who should access receipts? How would duplicate submissions and an upload followed by a failed append be handled?

In our view, a team should settle [ownership and recovery rules](<https://n8n-challenges.app/en/blog/n8n-workflow-best-practices-for-teams-practice-to-production>) before connecting a practice workflow to real financial information.

Get hands-on help reviewing your team's receipt access, review ownership and workflow maintainability with our Workflow Audit. It reviews your n8n instance and workflows for reliability, security and maintainability; this link opens the For companies page on this site.

**[Audit your expense workflows](https://n8n-challenges.app/en/companies)**

Tags: n8n, Data transformation, Hands-on learning, Exercise
