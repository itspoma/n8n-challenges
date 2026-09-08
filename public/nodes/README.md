# Node icon sources

Challenge node tiles use official n8n assets. The source-tracked files below are copied from, or color-mapped directly from, these assets on the n8n `master` branch. Theme variants map upstream `currentColor` icons to n8n's official light and dark icon colors.

- `chat-trigger-light.svg` and `chat-trigger-dark.svg` map `currentColor` in `packages/frontend/@n8n/design-system/src/components/N8nIcon/nodes/chat-trigger.svg` to n8n's official light- and dark-theme icon colors.
- `basic-llm-chain-light.svg` and `basic-llm-chain-dark.svg` map `currentColor` in `packages/frontend/@n8n/design-system/src/components/N8nIcon/nodes/basic-llm-chain.svg` to the same theme colors.
- `structured-output-parser-light.svg` and `structured-output-parser-dark.svg` map `currentColor` in `packages/frontend/@n8n/design-system/src/components/N8nIcon/nodes/structured-output-parser.svg` to the same theme colors.
- `openai-chat-model-light.svg` and `openai-chat-model-dark.svg` map the fills in `packages/@n8n/nodes-langchain/nodes/llms/LMChatOpenAi/openAiLight.svg` and `openAiLight.dark.svg` to the same theme colors.
- `switch-light.svg` and `switch-dark.svg` map `currentColor` in `packages/frontend/@n8n/design-system/src/components/N8nIcon/nodes/switch.svg` to the same theme colors.
- `send-email-light.svg` and `send-email-dark.svg` map `currentColor` in `packages/frontend/@n8n/design-system/src/components/N8nIcon/nodes/send-mail.svg` to the same theme colors.
- `trello.svg` is copied from `packages/nodes-base/nodes/Trello/trello.svg`.

Challenge 8 uses these n8n design-system assets:

- `manual-trigger.svg` and `manual-trigger-dark.svg` map `manual-trigger.svg`.
- `loop-over-items.svg` and `loop-over-items-dark.svg` map `loop-over-items.svg`.
- `wait-light.svg` and `wait-dark.svg` map `wait.svg`.
- `error-trigger-light.svg` and `error-trigger-dark.svg` map `error-trigger.svg`.

Challenge 5 uses these upstream assets:

- `google-drive.svg` is copied from `packages/nodes-base/nodes/Google/Drive/googleDrive.svg`.
- `openai.svg` and `openai-dark.svg` are copied from `packages/@n8n/nodes-langchain/nodes/embeddings/EmbeddingsOpenAI/openAiLight.svg` and `openAiLight.dark.svg`.
- `default-data-loader.svg` and `default-data-loader-dark.svg` copy and theme-map `packages/@n8n/nodes-langchain/nodes/document_loaders/DocumentDefaultDataLoader/binary.svg`.
- `recursive-character-text-splitter.svg` and `recursive-character-text-splitter-dark.svg` map `packages/frontend/@n8n/design-system/src/components/N8nIcon/nodes/recursive-character-text-splitter.svg`.
- `simple-vector-store.svg` and `simple-vector-store-dark.svg` map `packages/frontend/@n8n/design-system/src/components/N8nIcon/nodes/simple-vector-store.svg`.
- `ai-agent.svg` and `ai-agent-dark.svg` map `packages/frontend/@n8n/design-system/src/components/N8nIcon/nodes/ai-agent.svg`.
- Manual Trigger, Loop Over Items, and Chat Trigger reuse the design-system assets identified above.

Other icons in this directory are repository-local copies of their matching integration assets.

Challenge 3 uses these upstream assets:

- `form-trigger.svg` is the official Form icon from `packages/nodes-base/nodes/Form/form.svg`; n8n Form Trigger and n8n Form share it upstream.
- `edit-fields.svg`, `if.svg`, `if-dark.svg`, `data-table.svg`, and `data-table-dark.svg` are copied or theme-color mapped from the matching files in `packages/frontend/@n8n/design-system/src/components/N8nIcon/nodes/`.
- `resend-black.svg` and `resend-white.svg` are the official `resend-icon-black.svg` and `resend-icon-white.svg` assets from the verified [`resend/n8n-nodes-resend`](https://github.com/resend/n8n-nodes-resend) package.
