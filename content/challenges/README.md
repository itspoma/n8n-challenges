# Challenge content

The website reads every numbered Markdown file in this folder during `next build`. Challenge copy is not duplicated in application code.

## Authoring best practices

These rules apply to every challenge and every supported language.

### Explain technical language inline

- Do not show a standalone glossary section on the challenge page.
- Give every technical word or unfamiliar term an inline tooltip or hint where the learner encounters it.
- Common candidates include `webhook`, `route`, `RAG`, `ingestion path`, `vector store`, `API`, `token`, `credential`, `trigger`, `query parameter`, `expression`, and similar workflow-specific language. This list is not exhaustive: explain any term a beginner may not understand.
- Write each explanation in simple, beginner-friendly language. Explain what the term means in this workflow, not only its dictionary definition.
- Keep the challenge title (`## Title` in Markdown) clean and uninterrupted: never add tooltips or hints to individual words in the title. Explain unfamiliar title terms at their first suitable occurrence in the summary, task, scenario, requirements, or tips instead.

### Write “Your task” as a business request

- Make `Your task` (`## Task` in Markdown) short, easy to read, and easy to understand on the first pass.
- Prefer natural human language over technical language. Describe the result a person or business wants from the workflow, rather than prescribing its technical implementation.
- Keep node names, configuration fields, expressions, credentials, and implementation steps out of `Your task` unless a technical term is essential to understanding the outcome. Put implementation guidance in `Nodes you'll use`, `Before you start`, or `Need a tip?` instead.
- If an essential technical term appears, give it an inline plain-language tooltip or hint.

### Use spaced en dashes

- For a sentence break or explanatory aside, use an en dash with one space on each side: `Choose GET – the option a browser uses...`.
- Do not use an em dash (`—`) or attach a dash directly to the surrounding words.
- Keep en dashes in numeric and time ranges compact, such as `10–15 min`.

### Show difficulty with stars

- In the challenge header, `Complexity` may appear as a visible label followed by the star rating used by challenges 1 and 2.
- Do not display a numeric fraction such as `Complexity: 1/5`. The visible rating must use stars.
- Keep an accessible label that states the rating out of five for screen readers and other assistive technology.

### Make preparation complete

- In `Before you start` (`## Preparation` in Markdown), include every external service the learner must use.
- Ask the learner to sign up for each required service and link to its official signup page.
- If the workflow needs a key, API key, token, bot, OAuth connection, or another credential, link directly to the service's official instructions for creating it.
- Never include a real key, token, password, or other secret in a challenge file.
- If no external account or credential is needed, say so clearly instead of leaving the section empty.

### List every node with its official icon and documentation

- In `Nodes you'll use` (`## Nodes` in Markdown), list every node needed for the core workflow and the bonus task. A learner should not discover an unlisted required node halfway through the challenge.
- Use the node's official light- and dark-theme icon assets from the [n8n nodes source on GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes). Repository-local icon files are allowed, provided they are copied from or directly based on the official assets at that source. Do not substitute a generic or invented icon.
- When an official icon is stored locally, keep its filename and light/dark mapping clear enough that its upstream source can be verified later.
- Link every displayed node to its matching page in the [official n8n built-in integrations documentation](https://docs.n8n.io/integrations/builtin/).
- Verify the icon and documentation link against the exact n8n node named in the challenge.

### Limit the expected result

- `What the workflow must do` (`## Requirements` in Markdown) must contain exactly three outcome-focused expectations.
- Describe results the learner can demonstrate. Avoid turning configuration steps into additional expectations.

### Write progressive, node-first tips

- Keep exactly five tips for the existing progressive `Need a tip?` interaction.
- Start the first tip with the node the learner should begin with (or a choice such as “Start with node A or node B”) and explain in simple language why it helps.
- Start the second tip with the next node the learner will most likely need and explain what it contributes.
- Keep later tips action-oriented and increasingly specific. They may cover important node configuration, credentials, expressions, field mapping, testing, or another likely blocker.
- Name the relevant node whenever a tip concerns one. Do not write vague hints that make the learner guess which part of the workflow to change.

### Provide two Pixtex solution images

- Directly below `Need a tip?`, provide two workflow solution images generated with Pixtex.
- The first image must show the completed core workflow without the bonus task.
- The second image must show the completed workflow with the bonus task.
- Label the two versions clearly, make the node names and connections readable, and provide descriptive alt text in every supported language.
- Generate or update both images only after the core and bonus workflows are final, so the visuals match the challenge exactly.

### Keep workflow JSON inside the challenge Markdown

- Store the importable JSON for both the core workflow and the bonus workflow inside the matching challenge Markdown file.
- Put the JSON in fenced `json` code blocks under an internal `# Solution Data` section, following the pattern used by challenge 1. This internal section is not displayed on the challenge page.
- Do not create or commit separate workflow `.json` files anywhere in the repository.
- Keep the embedded JSON and both Pixtex solution images synchronized whenever a workflow changes.

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
A short, plain-language business request describing the result participants should produce.

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
- Requirement three.

## Tips
- Start with the first likely node and explain why it helps.
- Continue with the second likely node and explain what it contributes.
- Give a more specific node or configuration hint.
- Address a likely mapping, expression, credential, or testing blocker.
- Give the most specific node-focused hint.
```

Repeat the same structure below `# Spanish` and `# Ukrainian`. Keep all three translations aligned, including inline term explanations and solution-image alt text. Every challenge must include one `Bonus Task` in each language. `Scenario` must contain at least two example use cases. `Nodes` lists every n8n node required by the core and bonus workflows. `Preparation` lists anything learners need to sign up for, install, obtain, or prepare before building and supports inline links written as `[label](https://example.com)`. `Requirements` must contain exactly three observable outcomes. Never put API keys or other credentials in these files. Every challenge must have exactly five progressive tips in each language. The build rejects missing fields, empty lists, invalid metadata, duplicate numbers/slugs, filename mismatches, missing translations, and an incorrect number of active challenges.

See [CONTRIBUTING.md](../../CONTRIBUTING.md#edit-a-challenge) for the pull-request workflow.
