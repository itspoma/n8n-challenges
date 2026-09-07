---
number: 2
slug: valencia-telegram-bot
difficulty: beginner
time: 20–30 min
complexity: 2
color: #f7cb55
ink: #1b2427
---

# English

## Title
Valencia Noise Telegram Bot

## Summary
Reply to a Telegram message with the latest noise reading from Valencia Open Data.

## Concept
Chat triggers, HTTP requests, and data mapping

## Scenario
- A resident wants the latest available noise measurement in Russafa without searching an open-data portal.
- An event organizer wants to check local noise levels before choosing an outdoor meetup spot.
- A neighborhood group wants a quick Telegram reply it can share with community members.

## Task
Build a Telegram bot that reacts to any text message, requests the latest event-provided Valencia Open Data record for the Puerto Rico 21 noise sensor, and replies with the location, observation date, and LAeq value in dBA.

## Nodes
- Telegram Trigger
- HTTP Request
- Telegram

## Preparation
- Create a Telegram bot with BotFather and add its token as an n8n credential.
- Ask a mentor for the event-provided noise-data endpoint and its sample response.

## Requirements
- Trigger the workflow when the bot receives a text message.
- Fetch the measurement through HTTP Request instead of copying it into the workflow.
- Select the latest returned record dynamically.
- Reply to the same chat with the location, observation date, and LAeq value in dBA.
- Demonstrate that two messages receive replies without hard-coding the measurement.

## Tips
- Send your new bot a message after activating Telegram Trigger so n8n receives sample data.
- Use the event endpoint in an HTTP Request node and inspect the returned fields.
- If the endpoint returns several records, sort by observation date and keep the newest one.
- Map the chat ID from Telegram Trigger into the Telegram send-message operation.
- As an optional bonus, replace Telegram with WhatsApp Business Cloud after the core workflow works.

# Spanish

## Title
Bot de Telegram sobre el ruido en Valencia

## Summary
Responde a un mensaje de Telegram con la última medición de ruido de Valencia Open Data.

## Concept
Triggers de chat, peticiones HTTP y mapeo de datos

## Scenario
- Una persona residente quiere consultar la última medición de ruido de Russafa sin buscar en un portal de datos abiertos.
- La organización de un evento quiere revisar el ruido local antes de elegir un lugar de encuentro al aire libre.
- Un grupo vecinal quiere una respuesta rápida por Telegram que pueda compartir con la comunidad.

## Task
Crea un bot de Telegram que reaccione a cualquier mensaje de texto, solicite el último registro del sensor de ruido de Puerto Rico 21 mediante el endpoint de Valencia Open Data proporcionado por el evento y responda con la ubicación, la fecha de observación y el valor LAeq en dBA.

## Nodes
- Telegram Trigger
- HTTP Request
- Telegram

## Preparation
- Crea un bot de Telegram con BotFather y añade su token como credencial de n8n.
- Pide a un mentor el endpoint de datos de ruido proporcionado por el evento y su respuesta de ejemplo.

## Requirements
- Inicia el workflow cuando el bot reciba un mensaje de texto.
- Obtén la medición con HTTP Request en lugar de copiarla dentro del workflow.
- Selecciona dinámicamente el registro devuelto más reciente.
- Responde al mismo chat con la ubicación, la fecha de observación y el valor LAeq en dBA.
- Demuestra que dos mensajes reciben respuesta sin fijar manualmente la medición.

## Tips
- Envía un mensaje a tu bot después de activar Telegram Trigger para que n8n reciba datos de ejemplo.
- Usa el endpoint del evento en un nodo HTTP Request e inspecciona los campos devueltos.
- Si el endpoint devuelve varios registros, ordénalos por fecha de observación y conserva el más reciente.
- Mapea el chat ID de Telegram Trigger en la operación de envío del nodo Telegram.
- Como bonus opcional, sustituye Telegram por WhatsApp Business Cloud cuando funcione el workflow principal.
