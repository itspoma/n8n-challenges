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

The document body must contain `# English`, `# Spanish`, and `# Ukrainian`. Each language must have these second-level sections in this exact order:

```markdown
# English

## Title
Example Challenge

## Summary
One short sentence.

## Concept
The primary n8n concept

## Scenario
- First realistic use case for this workflow.
- Second realistic use case for this workflow.
- Third realistic use case for this workflow.

## Task
The exact result participants must build.

## Bonus Task
One optional extension that builds on the completed core task.

## Nodes
- First required n8n node.
- Second required n8n node.

## Preparation
- Account, installation, API key, event fixture, or other setup needed before building.
- Another concrete preparation step.

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

Repeat the same structure below `# Spanish` and `# Ukrainian`. Every challenge must include one `Bonus Task` in each language. `Scenario` must contain at least two example use cases. `Nodes` lists the n8n nodes participants should use. `Preparation` lists anything they need to sign up for, install, obtain, or prepare before building and supports inline links written as `[label](https://example.com)`. Never put API keys or other credentials in these files. Every challenge must have exactly five tips in each language. The build rejects missing fields, empty lists, invalid metadata, duplicate numbers/slugs, filename mismatches, missing translations, and an incorrect number of active challenges.

See [CONTRIBUTING.md](../../CONTRIBUTING.md#edit-a-challenge) for the pull-request workflow.
