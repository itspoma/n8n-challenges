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

## Bonus Task
When LAeq is above 65 dBA, start the reply with ⚠️ and label the reading High; otherwise label it Normal.

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

## Bonus Task
Cuando LAeq supere los 65 dBA, empieza la respuesta con ⚠️ y marca la medición como Alta; en caso contrario, márcala como Normal.

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

# Ukrainian

## Title
Telegram-бот про рівень шуму у Валенсії

## Summary
Відповідайте на повідомлення в Telegram найсвіжішими даними про рівень шуму з Valencia Open Data.

## Concept
Чат-тригери, HTTP-запити та зіставлення даних

## Scenario
- Мешканець хоче дізнатися про найсвіжіший доступний рівень шуму в Руссафі без пошуку на порталі відкритих даних.
- Організатор події хоче перевірити місцевий рівень шуму перед вибором місця для зустрічі просто неба.
- Районна спільнота хоче швидко отримати відповідь у Telegram і поділитися нею з учасниками.

## Task
Створіть Telegram-бота, який реагує на будь-яке текстове повідомлення, запитує найсвіжіший наданий організаторами події запис Valencia Open Data для датчика шуму Puerto Rico 21 і відповідає, указуючи місце, дату спостереження та значення LAeq у дБА.

## Bonus Task
Якщо LAeq перевищує 65 дБА, починайте відповідь із ⚠️ і позначайте вимірювання як «Високе»; інакше позначайте його як «Нормальне».

## Nodes
- Telegram Trigger
- HTTP Request
- Telegram

## Preparation
- Створіть Telegram-бота за допомогою BotFather і додайте його токен як облікові дані n8n.
- Попросіть ментора надати ендпоінт даних про шум для події та приклад відповіді.

## Requirements
- Запускайте воркфлоу, коли бот отримує текстове повідомлення.
- Отримуйте вимірювання через HTTP Request, а не копіюйте його у воркфлоу.
- Динамічно вибирайте найсвіжіший із повернених записів.
- Відповідайте в тому самому чаті, указуючи місце, дату спостереження та значення LAeq у дБА.
- Продемонструйте, що два повідомлення отримують відповіді без жорстко заданого значення вимірювання.

## Tips
- Після активації Telegram Trigger надішліть новому боту повідомлення, щоб n8n отримав тестові дані.
- Використайте наданий організаторами ендпоінт у ноді HTTP Request і перегляньте повернені поля.
- Якщо ендпоінт повертає кілька записів, відсортуйте їх за датою спостереження та залиште найновіший.
- Передайте chat ID з Telegram Trigger в операцію надсилання повідомлення ноди Telegram.
- Як необов’язкове додаткове завдання замініть Telegram на WhatsApp Business Cloud після того, як основний воркфлоу запрацює.
