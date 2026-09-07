# Challenge content

The website reads every numbered Markdown file in this folder during `next build`. Challenge copy is not duplicated in application code.

## File format

The active MVP has exactly ten challenges, so normally edit one of the existing
numbered files. If the event format is intentionally expanded later, use a filename
such as `11-example-challenge.md`. The metadata block must contain:

```yaml
---
number: 11
slug: example-challenge
difficulty: beginner
time: 15–20 min
complexity: 2
color: #ea4b71
ink: #ffffff
---
```

The document body must contain both `# English` and `# Spanish`. Each language must have these second-level sections in this exact order:

```markdown
# English

## Title
Example Challenge

## Summary
One short sentence.

## Concept
The primary n8n concept

## Scenario
Why this workflow is useful.

## Task
The exact result participants must build.

## Requirements
- Requirement one.
- Requirement two.

## Tips
- First, broadest tip.
- Second tip.
- Third tip.
- Fourth tip.
- Fifth, most specific tip.
```

Repeat the same structure below `# Spanish`. Every challenge must have exactly five tips in each language. The build rejects missing fields, invalid metadata, duplicate numbers/slugs, filename mismatches, missing translations, and an incorrect number of active challenges.

See [CONTRIBUTING.md](../../CONTRIBUTING.md#edit-a-challenge) for the pull-request workflow.
