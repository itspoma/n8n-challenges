---
number: 6
slug: trello-morning-brief
difficulty: intermediate
time: 30–40 min
complexity: 3
color: #e84d49
ink: #ffffff
---

# Solution Data

Internal reference for solution rendering and workflow comparison. This section is not displayed on the challenge page.

## Core Workflow JSON (without bonus)

```json
{
  "name": "Challenge 6 – Trello Morning Brief (Core)",
  "nodes": [
    {
      "parameters": { "rule": { "interval": [{ "field": "weeks", "triggerAtDay": [1, 2, 3, 4, 5], "triggerAtHour": 9, "triggerAtMinute": 0 }] } },
      "id": "29a55f79-1f62-44b7-a451-323877b7eeca",
      "name": "Weekdays at 09:00",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [0, 0],
      "notesInFlow": true,
      "notes": "Runs Monday through Friday at 09:00 using the workflow timezone."
    },
    {
      "parameters": { "authentication": "apiKey", "resource": "list", "operation": "getAll", "id": "YOUR_TRELLO_BOARD_ID", "returnAll": true, "additionalFields": { "fields": "all" } },
      "id": "52cb71c9-14ef-4415-bced-7c105fd7f40a",
      "name": "Get board lists",
      "type": "n8n-nodes-base.trello",
      "typeVersion": 1,
      "position": [260, 0],
      "notesInFlow": true,
      "notes": "Replace the placeholder with the ID of the Trello board created for this challenge."
    },
    {
      "parameters": { "authentication": "apiKey", "resource": "list", "operation": "getCards", "id": "={{ $json.id }}", "returnAll": true, "additionalFields": { "fields": "all" } },
      "id": "a73c353c-f196-4502-a47a-4310b629ce48",
      "name": "Get cards from each list",
      "type": "n8n-nodes-base.trello",
      "typeVersion": 1,
      "position": [520, 0],
      "alwaysOutputData": true,
      "notesInFlow": true,
      "notes": "Uses each incoming list ID and preserves an empty result so the workflow can report an empty board."
    },
    {
      "parameters": {
        "conditions": {
          "options": { "caseSensitive": true, "leftValue": "", "typeValidation": "strict", "version": 2 },
          "conditions": [{ "id": "bb760297-12d5-41f4-af89-27a228af7986", "leftValue": "={{ $json.closed }}", "rightValue": "", "operator": { "type": "boolean", "operation": "false", "singleValue": true } }],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "8947c463-bb89-44a8-bee6-564289d48fa3",
      "name": "Keep open cards",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [780, 0],
      "alwaysOutputData": true,
      "notesInFlow": true,
      "notes": "Keeps cards whose Trello closed field is false and emits one empty item if none remain."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            { "id": "6e38de8a-aa6b-4bdc-bda8-f4c9180ee3d1", "name": "isCard", "value": "={{ Boolean($json.id) }}", "type": "boolean" },
            { "id": "b9ce982c-f3ba-49b2-af2a-00c8ea5e5f4e", "name": "redPriority", "value": "={{ ($json.labels || []).some(label => label.color === 'red') ? 0 : 1 }}", "type": "number" },
            { "id": "0ed7392f-5025-4af9-86f1-5fe259d53b9d", "name": "dueSort", "value": "={{ $json.due ? Date.parse($json.due) : 8640000000000000 }}", "type": "number" },
            { "id": "34a140aa-54aa-448d-bc6a-b34b429e6750", "name": "nameSort", "value": "={{ ($json.name || '').toLowerCase() }}", "type": "string" },
            { "id": "8616b9ae-8c02-4aad-9ea8-aa3d60a43361", "name": "isUrgent", "value": "={{ Boolean($json.id) && (($json.labels || []).some(label => label.color === 'red') || Boolean($json.due && $json.dueComplete !== true && Date.parse($json.due) < Date.now())) }}", "type": "boolean" }
          ]
        },
        "includeOtherFields": true,
        "options": {}
      },
      "id": "2b6e8a21-b381-4a64-a968-93ee14e11f3b",
      "name": "Add ranking fields",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [1040, 0],
      "notesInFlow": true,
      "notes": "Creates stable fields for red-label priority, due date, card name, and urgency."
    },
    {
      "parameters": {
        "type": "simple",
        "sortFieldsUi": { "sortField": [{ "fieldName": "isCard", "order": "descending" }, { "fieldName": "redPriority", "order": "ascending" }, { "fieldName": "dueSort", "order": "ascending" }, { "fieldName": "nameSort", "order": "ascending" }] },
        "options": {}
      },
      "id": "201a22c0-dc72-4e83-b464-43ec43a0e029",
      "name": "Rank cards",
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [1300, 0],
      "notesInFlow": true,
      "notes": "Sorts real cards first, then red labels, due dates, and names. Cards without a due date sort last."
    },
    {
      "parameters": { "maxItems": 3, "keep": "firstItems" },
      "id": "1ef80584-f19c-488e-8dd3-4f48154094d1",
      "name": "Keep top three",
      "type": "n8n-nodes-base.limit",
      "typeVersion": 1,
      "position": [1560, 0],
      "notesInFlow": true,
      "notes": "Keeps at most the first three ranked cards."
    },
    {
      "parameters": { "aggregate": "aggregateAllItemData", "destinationFieldName": "cards", "include": "specifiedFields", "fieldsToInclude": "name,due,url,isCard,isUrgent", "options": {} },
      "id": "b20699e7-7e2b-4574-9407-21e0cd7ced37",
      "name": "Bundle cards",
      "type": "n8n-nodes-base.aggregate",
      "typeVersion": 1,
      "position": [1820, 0],
      "notesInFlow": true,
      "notes": "Combines the selected cards into one item so Telegram sends exactly one message."
    },
    {
      "parameters": {
        "assignments": { "assignments": [{ "id": "71f1d94f-0553-4cef-b67b-2718ab82679c", "name": "text", "value": "={{ (() => { const cards = $json.cards.filter(card => card.isCard); if (cards.length === 0) return 'No open cards today.'; return 'Trello morning brief\\n\\n' + cards.map((card, index) => (index + 1) + '. ' + card.name + '\\nDue: ' + (card.due || 'No due date') + '\\n' + card.url).join('\\n\\n'); })() }}", "type": "string" }] },
        "options": {}
      },
      "id": "e06ee98d-d636-487f-a66d-f9ca8b95d128",
      "name": "Build digest",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [2080, 0],
      "notesInFlow": true,
      "notes": "Builds one readable digest or a clear no-open-cards message."
    },
    {
      "parameters": { "chatId": "YOUR_TELEGRAM_CHAT_ID", "text": "={{ $json.text }}", "additionalFields": { "appendAttribution": false } },
      "id": "e45630df-d71f-46aa-bc6a-98dbdc22782c",
      "name": "Send morning brief",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [2340, 0],
      "notesInFlow": true,
      "notes": "Replace the placeholder with the test chat ID, then publish the workflow."
    }
  ],
  "pinData": {},
  "connections": {
    "Weekdays at 09:00": { "main": [[{ "node": "Get board lists", "type": "main", "index": 0 }]] },
    "Get board lists": { "main": [[{ "node": "Get cards from each list", "type": "main", "index": 0 }]] },
    "Get cards from each list": { "main": [[{ "node": "Keep open cards", "type": "main", "index": 0 }]] },
    "Keep open cards": { "main": [[{ "node": "Add ranking fields", "type": "main", "index": 0 }]] },
    "Add ranking fields": { "main": [[{ "node": "Rank cards", "type": "main", "index": 0 }]] },
    "Rank cards": { "main": [[{ "node": "Keep top three", "type": "main", "index": 0 }]] },
    "Keep top three": { "main": [[{ "node": "Bundle cards", "type": "main", "index": 0 }]] },
    "Bundle cards": { "main": [[{ "node": "Build digest", "type": "main", "index": 0 }]] },
    "Build digest": { "main": [[{ "node": "Send morning brief", "type": "main", "index": 0 }]] }
  },
  "active": false,
  "settings": { "executionOrder": "v1", "timezone": "Europe/Madrid" },
  "versionId": "9233b12a-e9c0-40a1-9b60-5909169fd17d",
  "meta": { "templateCredsSetupCompleted": false },
  "tags": []
}
```

## Bonus Workflow JSON

```json
{
  "name": "Challenge 6 – Trello Morning Brief (Bonus)",
  "nodes": [
    {
      "parameters": { "rule": { "interval": [{ "field": "weeks", "triggerAtDay": [1, 2, 3, 4, 5], "triggerAtHour": 9, "triggerAtMinute": 0 }] } },
      "id": "bdcb13d4-9afd-4116-ad56-e363c50fbce7",
      "name": "Weekdays at 09:00",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [0, 0],
      "notesInFlow": true,
      "notes": "Runs Monday through Friday at 09:00 using the workflow timezone."
    },
    {
      "parameters": { "authentication": "apiKey", "resource": "list", "operation": "getAll", "id": "YOUR_TRELLO_BOARD_ID", "returnAll": true, "additionalFields": { "fields": "all" } },
      "id": "8595e32e-d9f7-4d79-8f8e-13af09d5a9bd",
      "name": "Get board lists",
      "type": "n8n-nodes-base.trello",
      "typeVersion": 1,
      "position": [260, 0],
      "notesInFlow": true,
      "notes": "Replace the placeholder with the ID of the Trello board created for this challenge."
    },
    {
      "parameters": { "authentication": "apiKey", "resource": "list", "operation": "getCards", "id": "={{ $json.id }}", "returnAll": true, "additionalFields": { "fields": "all" } },
      "id": "560242b2-2f87-45b5-af98-f10ef2aa2316",
      "name": "Get cards from each list",
      "type": "n8n-nodes-base.trello",
      "typeVersion": 1,
      "position": [520, 0],
      "alwaysOutputData": true,
      "notesInFlow": true,
      "notes": "Uses each incoming list ID and preserves an empty result so the workflow can report an empty board."
    },
    {
      "parameters": {
        "conditions": {
          "options": { "caseSensitive": true, "leftValue": "", "typeValidation": "strict", "version": 2 },
          "conditions": [{ "id": "52d4f91f-3127-4611-b0dd-09e2a6822039", "leftValue": "={{ $json.closed }}", "rightValue": "", "operator": { "type": "boolean", "operation": "false", "singleValue": true } }],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "47c35dae-8b63-4233-bf71-b14da5f8d972",
      "name": "Keep open cards",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [780, 0],
      "alwaysOutputData": true,
      "notesInFlow": true,
      "notes": "Keeps cards whose Trello closed field is false and emits one empty item if none remain."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            { "id": "1f80d18f-b70a-4948-937a-77394a01bceb", "name": "isCard", "value": "={{ Boolean($json.id) }}", "type": "boolean" },
            { "id": "35cf9e72-af43-4aa7-b5d7-d70534204b42", "name": "redPriority", "value": "={{ ($json.labels || []).some(label => label.color === 'red') ? 0 : 1 }}", "type": "number" },
            { "id": "df42f8d4-635c-4b94-b148-aa7b7da301d5", "name": "dueSort", "value": "={{ $json.due ? Date.parse($json.due) : 8640000000000000 }}", "type": "number" },
            { "id": "09b40b67-7fef-4739-bf4d-9414727aadac", "name": "nameSort", "value": "={{ ($json.name || '').toLowerCase() }}", "type": "string" },
            { "id": "63d45061-6a78-46db-a0e4-de893ba4139b", "name": "isUrgent", "value": "={{ Boolean($json.id) && (($json.labels || []).some(label => label.color === 'red') || Boolean($json.due && $json.dueComplete !== true && Date.parse($json.due) < Date.now())) }}", "type": "boolean" }
          ]
        },
        "includeOtherFields": true,
        "options": {}
      },
      "id": "560443f3-66ad-48a9-af09-b260d6c91cbd",
      "name": "Add ranking fields",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [1040, 0],
      "notesInFlow": true,
      "notes": "Creates stable fields for red-label priority, due date, card name, and urgency."
    },
    {
      "parameters": {
        "type": "simple",
        "sortFieldsUi": { "sortField": [{ "fieldName": "isCard", "order": "descending" }, { "fieldName": "redPriority", "order": "ascending" }, { "fieldName": "dueSort", "order": "ascending" }, { "fieldName": "nameSort", "order": "ascending" }] },
        "options": {}
      },
      "id": "6b40aed1-fe01-4acb-ac8d-e1ab4e4aa7af",
      "name": "Rank cards",
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [1300, 0],
      "notesInFlow": true,
      "notes": "Sorts real cards first, then red labels, due dates, and names. Cards without a due date sort last."
    },
    {
      "parameters": { "maxItems": 3, "keep": "firstItems" },
      "id": "5d576a65-e0f8-4dbe-88fd-6874175d6876",
      "name": "Keep top three",
      "type": "n8n-nodes-base.limit",
      "typeVersion": 1,
      "position": [1560, 0],
      "notesInFlow": true,
      "notes": "Keeps at most the first three ranked cards."
    },
    {
      "parameters": { "aggregate": "aggregateAllItemData", "destinationFieldName": "cards", "include": "specifiedFields", "fieldsToInclude": "name,due,url,isCard,isUrgent", "options": {} },
      "id": "72c5012d-e971-41e7-9688-08cb94b335d7",
      "name": "Bundle cards",
      "type": "n8n-nodes-base.aggregate",
      "typeVersion": 1,
      "position": [1820, 0],
      "notesInFlow": true,
      "notes": "Combines the selected cards into one item so Telegram sends exactly one message."
    },
    {
      "parameters": {
        "assignments": { "assignments": [{ "id": "db428df1-19ae-4329-adf4-8c302175e171", "name": "text", "value": "={{ (() => { const cards = $json.cards.filter(card => card.isCard); if (cards.length === 0) return 'No open cards today.'; const notice = cards.some(card => card.isUrgent) ? '' : 'No urgent cards today.\\n\\n'; return notice + 'Trello morning brief\\n\\n' + cards.map((card, index) => (index + 1) + '. ' + card.name + '\\nDue: ' + (card.due || 'No due date') + '\\n' + card.url).join('\\n\\n'); })() }}", "type": "string" }] },
        "options": {}
      },
      "id": "856b7238-8398-4f9f-bbac-3a75238347c3",
      "name": "Build bonus digest",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [2080, 0],
      "notesInFlow": true,
      "notes": "Adds the no-urgent notice when appropriate, while preserving a separate empty-board message."
    },
    {
      "parameters": { "chatId": "YOUR_TELEGRAM_CHAT_ID", "text": "={{ $json.text }}", "additionalFields": { "appendAttribution": false } },
      "id": "7716b190-705e-409f-ad1f-9313185d8b03",
      "name": "Send morning brief",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [2340, 0],
      "notesInFlow": true,
      "notes": "Replace the placeholder with the test chat ID, then publish the workflow."
    }
  ],
  "pinData": {},
  "connections": {
    "Weekdays at 09:00": { "main": [[{ "node": "Get board lists", "type": "main", "index": 0 }]] },
    "Get board lists": { "main": [[{ "node": "Get cards from each list", "type": "main", "index": 0 }]] },
    "Get cards from each list": { "main": [[{ "node": "Keep open cards", "type": "main", "index": 0 }]] },
    "Keep open cards": { "main": [[{ "node": "Add ranking fields", "type": "main", "index": 0 }]] },
    "Add ranking fields": { "main": [[{ "node": "Rank cards", "type": "main", "index": 0 }]] },
    "Rank cards": { "main": [[{ "node": "Keep top three", "type": "main", "index": 0 }]] },
    "Keep top three": { "main": [[{ "node": "Bundle cards", "type": "main", "index": 0 }]] },
    "Bundle cards": { "main": [[{ "node": "Build bonus digest", "type": "main", "index": 0 }]] },
    "Build bonus digest": { "main": [[{ "node": "Send morning brief", "type": "main", "index": 0 }]] }
  },
  "active": false,
  "settings": { "executionOrder": "v1", "timezone": "Europe/Madrid" },
  "versionId": "1d7c016e-08af-4b14-aa53-f1577d79d056",
  "meta": { "templateCredsSetupCompleted": false },
  "tags": []
}
```

# English

## Title
Your Morning Brief

## Summary
Send the three most important open Trello cards to Telegram each weekday morning.

## Concept
Schedules, repeatable priority rules, list processing, and messaging

## Scenario
- A small team wants a predictable morning digest instead of checking every Trello card.
- Event organizers need the three most urgent tasks before their daily stand-up.
- A volunteer team wants overdue and red-labelled work surfaced automatically each weekday morning.

## Task
Every weekday at 09:00 Europe/Madrid, send one Telegram morning brief with up to three top open cards from the new Trello board you created. Put red-labelled cards first, then choose the nearest due dates.

## Bonus Task
If open cards exist but none is red-labelled or overdue, add "No urgent cards today" to the digest while still listing up to three cards. If there are no open cards, send "No open cards today" instead.

## Nodes
- Schedule Trigger
- Trello
- Filter
- Edit Fields (Set)
- Sort
- Limit
- Aggregate
- Telegram

## Preparation
- Sign up for [n8n Cloud](/n8n-sign-up) or open an existing n8n workspace, then create a new workflow.
- Sign in to [Trello](https://trello.com/) and [create any new board](https://support.atlassian.com/trello/docs/creating-a-new-board/). Add at least two lists and five open test cards: include a red-labelled card, cards with different due dates, one overdue card, and one card without a due date. Open the board, append `.json` to its URL, and copy the `id` value for the Trello nodes.
- [Create a new Trello app](https://trello.com/apps/admin/new), open its API Key tab, generate an API key, and then select Token and approve access to generate an API token – a private code that can access your Trello data. Add your n8n base URL as an allowed origin, store the key and token in an [n8n Trello credential](https://docs.n8n.io/integrations/builtin/credentials/trello/), and never share the token.
- Install [Telegram](https://telegram.org/), create a bot with [BotFather](https://t.me/botfather), and add the bot token to an [n8n Telegram credential](https://docs.n8n.io/integrations/builtin/credentials/telegram#using-api-bot-access-token). Send the bot a test message and note the chat ID that will receive the brief.

## Requirements
- At 09:00 Europe/Madrid each weekday, read the open cards from every list on the Trello board created for this challenge.
- Put red-labelled cards first, then sort by earliest due date, place cards without a due date last, break equal dates alphabetically by card name, and keep at most three cards.
- Send exactly one Telegram message containing each selected card's name, due date or "No due date", and URL; when no open cards exist, send "No open cards today".

## Tips
- Start with Schedule Trigger, choose a weekly interval for Monday through Friday at 09:00, and set the workflow timezone to Europe/Madrid. You can click Execute workflow to test it manually before publishing.
- Add Trello with List → Get Many for your board, then add a second Trello node with List → Get Cards and map the incoming list ID so every list is checked.
- Add Filter to keep cards whose closed field is false, then use Edit Fields (Set) to create values for red-label priority, due-date order, alphabetical name order, and whether a card is urgent.
- Add Sort to order the calculated fields, then use Limit with Max Items set to 3 and Keep set to First Items.
- Finish with Aggregate to combine the selected cards into one item, Edit Fields (Set) to build the digest and bonus notice, and Telegram to send one message. Test both no-urgent and no-open-card cases, then publish the workflow.

# Spanish

## Title
Tu resumen de la mañana

## Summary
Envía a Telegram las tres tarjetas abiertas más importantes de Trello cada mañana de lunes a viernes.

## Concept
Horarios, reglas de prioridad repetibles, procesamiento de listas y mensajería

## Scenario
- Un equipo pequeño quiere un resumen matinal predecible en lugar de revisar todas las tarjetas de Trello.
- La organización de un evento necesita las tres tareas más urgentes antes de su reunión diaria.
- Un equipo de voluntariado quiere ver automáticamente el trabajo vencido y con etiqueta roja cada mañana de lunes a viernes.

## Task
Cada día laborable a las 09:00 Europe/Madrid, envía un único resumen matinal de Telegram con un máximo de tres tarjetas abiertas prioritarias del nuevo tablero de Trello que hayas creado. Coloca primero las tarjetas con etiqueta roja y después elige las fechas de vencimiento más próximas.

## Bonus Task
Si hay tarjetas abiertas, pero ninguna tiene etiqueta roja ni está vencida, añade "No hay tarjetas urgentes hoy" al resumen y sigue mostrando un máximo de tres tarjetas. Si no hay tarjetas abiertas, envía "No hay tarjetas abiertas hoy".

## Nodes
- Schedule Trigger
- Trello
- Filter
- Edit Fields (Set)
- Sort
- Limit
- Aggregate
- Telegram

## Preparation
- Regístrate en [n8n Cloud](/n8n-sign-up) o abre un espacio de trabajo de n8n existente y crea un workflow nuevo.
- Inicia sesión en [Trello](https://trello.com/) y [crea cualquier tablero nuevo](https://support.atlassian.com/trello/docs/creating-a-new-board/). Añade al menos dos listas y cinco tarjetas de prueba abiertas: incluye una tarjeta con etiqueta roja, tarjetas con distintas fechas de vencimiento, una tarjeta vencida y una tarjeta sin fecha de vencimiento. Abre el tablero, añade `.json` al final de su URL y copia el valor `id` para los nodos de Trello.
- [Crea una nueva app de Trello](https://trello.com/apps/admin/new), abre la pestaña API Key, genera una clave de API y después selecciona Token y aprueba el acceso para generar un token de API – un código privado que permite acceder a tus datos de Trello. Añade la URL base de n8n como origen permitido, guarda la clave y el token en una [credencial de Trello de n8n](https://docs.n8n.io/integrations/builtin/credentials/trello/) y no compartas nunca el token.
- Instala [Telegram](https://telegram.org/), crea un bot con [BotFather](https://t.me/botfather) y añade el token del bot a una [credencial de Telegram de n8n](https://docs.n8n.io/integrations/builtin/credentials/telegram#using-api-bot-access-token). Envía un mensaje de prueba al bot y anota el chat ID que recibirá el resumen.

## Requirements
- Cada día laborable a las 09:00 Europe/Madrid, lee las tarjetas abiertas de todas las listas del tablero de Trello creado para este reto.
- Coloca primero las tarjetas con etiqueta roja, ordénalas después por la fecha de vencimiento más próxima, sitúa al final las que no tengan fecha, desempata alfabéticamente por el nombre de la tarjeta y conserva un máximo de tres tarjetas.
- Envía exactamente un mensaje de Telegram con el nombre, la fecha de vencimiento o "Sin fecha de vencimiento" y la URL de cada tarjeta seleccionada; si no hay tarjetas abiertas, envía "No hay tarjetas abiertas hoy".

## Tips
- Empieza con Schedule Trigger, elige un intervalo semanal de lunes a viernes a las 09:00 y configura la zona horaria del workflow como Europe/Madrid. Puedes seleccionar Execute workflow para probarlo manualmente antes de publicarlo.
- Añade Trello con List → Get Many para tu tablero y después añade un segundo nodo Trello con List → Get Cards; mapea el ID de la lista entrante para revisar todas las listas.
- Añade Filter para conservar las tarjetas cuyo campo closed sea false y después usa Edit Fields (Set) para crear valores para la prioridad de la etiqueta roja, el orden de vencimiento, el orden alfabético del nombre y si una tarjeta es urgente.
- Añade Sort para ordenar los campos calculados y después usa Limit con Max Items en 3 y Keep en First Items.
- Termina con Aggregate para combinar las tarjetas seleccionadas en un solo elemento, Edit Fields (Set) para crear el resumen y el aviso del bonus, y Telegram para enviar un único mensaje. Prueba los casos sin tarjetas urgentes y sin tarjetas abiertas y después publica el workflow.

# Ukrainian

## Title
Твій ранковий огляд

## Summary
Щоранку з понеділка по п’ятницю надсилайте в Telegram три найважливіші відкриті картки Trello.

## Concept
Розклади, повторювані правила пріоритету, обробка списків і повідомлення

## Scenario
- Невелика команда хоче отримувати передбачуваний ранковий огляд замість перевірки кожної картки Trello.
- Організаторам події перед щоденною зустріччю потрібні три найтерміновіші завдання.
- Волонтерська команда хоче автоматично бачити прострочені завдання й картки з червоною міткою щоранку з понеділка по п’ятницю.

## Task
Щодня з понеділка по п’ятницю о 09:00 за часовим поясом Europe/Madrid надсилайте одне ранкове повідомлення в Telegram зі щонайбільше трьома найважливішими відкритими картками з нової дошки Trello, яку ви створили. Спочатку розміщуйте картки з червоною міткою, а потім вибирайте картки з найближчими датами виконання.

## Bonus Task
Якщо відкриті картки є, але серед них немає карток із червоною міткою чи прострочених карток, додайте до огляду "Сьогодні немає термінових карток" і все одно покажіть щонайбільше три картки. Якщо відкритих карток немає, надішліть "Сьогодні немає відкритих карток".

## Nodes
- Schedule Trigger
- Trello
- Filter
- Edit Fields (Set)
- Sort
- Limit
- Aggregate
- Telegram

## Preparation
- Зареєструйтеся в [n8n Cloud](/n8n-sign-up) або відкрийте наявний воркспейс n8n, а потім створіть новий воркфлоу.
- Увійдіть у [Trello](https://trello.com/) і [створіть будь-яку нову дошку](https://support.atlassian.com/trello/docs/creating-a-new-board/). Додайте щонайменше два списки та п’ять відкритих тестових карток: одну картку з червоною міткою, картки з різними датами виконання, одну прострочену картку й одну картку без дати виконання. Відкрийте дошку, додайте `.json` у кінці її URL-адреси та скопіюйте значення `id` для нод Trello.
- [Створіть новий застосунок Trello](https://trello.com/apps/admin/new), відкрийте вкладку API Key, згенеруйте API-ключ, а потім виберіть Token і дозвольте доступ, щоб згенерувати API-токен – приватний код, який надає доступ до ваших даних Trello. Додайте базову URL-адресу n8n як дозволене джерело, збережіть ключ і токен в [облікових даних Trello у n8n](https://docs.n8n.io/integrations/builtin/credentials/trello/) і нікому не повідомляйте токен.
- Установіть [Telegram](https://telegram.org/), створіть бота за допомогою [BotFather](https://t.me/botfather) і додайте токен бота до [облікових даних Telegram у n8n](https://docs.n8n.io/integrations/builtin/credentials/telegram#using-api-bot-access-token). Надішліть боту тестове повідомлення й запишіть chat ID, куди надходитиме огляд.

## Requirements
- Щодня з понеділка по п’ятницю о 09:00 за часовим поясом Europe/Madrid отримуйте відкриті картки з усіх списків дошки Trello, створеної для цього завдання.
- Спочатку розміщуйте картки з червоною міткою, потім сортуйте за найближчою датою виконання, картки без дати розміщуйте наприкінці, однакові дати впорядковуйте за назвою картки в алфавітному порядку й залишайте щонайбільше три картки.
- Надсилайте рівно одне повідомлення Telegram із назвою, датою виконання або текстом "Без дати виконання" та URL-адресою кожної вибраної картки; якщо відкритих карток немає, надсилайте "Сьогодні немає відкритих карток".

## Tips
- Почніть із Schedule Trigger, виберіть щотижневий інтервал із понеділка по п’ятницю о 09:00 і встановіть для воркфлоу часовий пояс Europe/Madrid. До публікації ви можете вибрати Execute workflow, щоб протестувати його вручну.
- Додайте Trello з операцією List → Get Many для своєї дошки, а потім додайте другу ноду Trello з операцією List → Get Cards і передайте ID вхідного списку, щоб перевірити всі списки.
- Додайте Filter, щоб залишити картки, у яких поле closed має значення false, а потім використайте Edit Fields (Set), щоб створити значення для пріоритету червоної мітки, порядку дат виконання, алфавітного порядку назв і ознаки терміновості картки.
- Додайте Sort, щоб упорядкувати обчислені поля, а потім використайте Limit зі значенням 3 у Max Items і значенням First Items у Keep.
- Завершіть воркфлоу нодою Aggregate, щоб об’єднати вибрані картки в один елемент, нодою Edit Fields (Set), щоб створити огляд і додаткове повідомлення, та нодою Telegram, щоб надіслати одне повідомлення. Перевірте випадки без термінових і без відкритих карток, а потім опублікуйте воркфлоу.
