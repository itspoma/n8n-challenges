---
number: 2
slug: valencia-telegram-bot
difficulty: beginner
time: 20–30 min
complexity: 2
color: #f7cb55
ink: #1b2427
---

# Solution Data

Internal reference for solution rendering and workflow comparison. This section is not displayed on the challenge page.

## Core Workflow JSON (without bonus)

```json
{
  "name": "Challenge 2 – Valencia Air Quality Telegram Bot",
  "nodes": [
    {
      "parameters": {
        "updates": [
          "message"
        ],
        "additionalFields": {}
      },
      "id": "b20b363a-3cfa-462d-ad63-f56de3fa6c9e",
      "name": "Telegram Trigger",
      "type": "n8n-nodes-base.telegramTrigger",
      "typeVersion": 1.2,
      "position": [
        0,
        0
      ],
      "webhookId": "c900b467-258e-4b04-afd0-6a3726132521",
      "notesInFlow": true,
      "notes": "Responds to any incoming message, including text, photos, and stickers. Message content is not inspected or parsed."
    },
    {
      "parameters": {
        "url": "https://www.valencia.es/web/guest/valenciaalminut/calidadaire.cors",
        "options": {}
      },
      "id": "0a2df19f-1ef6-4f10-8194-6e72ae86e897",
      "name": "Get Valencia Air Quality",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        300,
        0
      ],
      "notesInFlow": true,
      "notes": "Fetches the latest readings from Valencia City Council Open Data."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "b6b11a6e-b5e0-420f-b400-b435572b416b",
              "name": "station",
              "value": "={{ Object.fromEntries($json.metadata.map(({ colName, colIndex }) => [colName, $json.resultset[0][colIndex]])) }}",
              "type": "object"
            }
          ]
        },
        "options": {}
      },
      "id": "76b9f2ea-63de-4bf8-89ce-9183f7af4a89",
      "name": "Select any station",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        600,
        0
      ],
      "notesInFlow": true,
      "notes": "Uses the first available station row. The core task does not require a specific station or parsing the incoming message."
    },
    {
      "parameters": {
        "chatId": "={{ $('Telegram Trigger').first().json.message.chat.id }}",
        "text": "={{ 'Air quality at ' + $json.station.address + '\\nObserved: ' + $json.station.dateobserved + '\\nStatus: ' + $json.station.calidad_ambiental + '\\nNO₂: ' + ($json.station.no2value ?? 'N/A') + '\\nPM10: ' + ($json.station.pm10value ?? 'N/A') + '\\nPM2.5: ' + ($json.station.pm25value ?? 'N/A') }}",
        "additionalFields": {
          "appendAttribution": false
        }
      },
      "id": "1ab5d87c-399b-4562-887b-5fda877f386c",
      "name": "Reply with Air Quality",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [
        900,
        0
      ],
      "notesInFlow": true,
      "notes": "Replies to the originating chat with the required air-quality fields."
    }
  ],
  "pinData": {},
  "connections": {
    "Telegram Trigger": {
      "main": [
        [
          {
            "node": "Get Valencia Air Quality",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Valencia Air Quality": {
      "main": [
        [
          {
            "node": "Select any station",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Select any station": {
      "main": [
        [
          {
            "node": "Reply with Air Quality",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "7dd22f23-dca7-4d7a-996a-fcdb69efb6ba",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "tags": []
}
```

## Bonus Workflow JSON

```json
{
  "name": "Challenge 2 – Valencia Air Quality Telegram Bot (Bonus)",
  "nodes": [
    {
      "parameters": {
        "updates": [
          "message"
        ],
        "additionalFields": {}
      },
      "id": "caf3b4cf-37c5-4fac-ab7f-51a2186606ae",
      "name": "Telegram Trigger",
      "type": "n8n-nodes-base.telegramTrigger",
      "typeVersion": 1.2,
      "position": [
        0,
        0
      ],
      "webhookId": "a54fdf81-34b2-4786-9a6c-6cfe66f30c54",
      "notesInFlow": true,
      "notes": "Responds to any incoming message, including text, photos, and stickers. Message content is not inspected or parsed."
    },
    {
      "parameters": {
        "url": "https://www.valencia.es/web/guest/valenciaalminut/calidadaire.cors",
        "options": {}
      },
      "id": "3c75a446-a9a8-43e1-9f36-1f218aef2e85",
      "name": "Get Valencia Air Quality",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        300,
        0
      ],
      "notesInFlow": true,
      "notes": "Fetches the latest readings from Valencia City Council Open Data."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "eef82536-ef40-45d1-8f35-a6f35c183ddf",
              "name": "station",
              "value": "={{ Object.fromEntries($json.metadata.map(({ colName, colIndex }) => [colName, $json.resultset.find(row => row[$json.metadata.find(column => column.colName === 'address').colIndex] === 'VALÈNCIA CENTRE')[colIndex]])) }}",
              "type": "object"
            }
          ]
        },
        "options": {}
      },
      "id": "b9a9ea09-93f5-4886-878d-63b4e0154948",
      "name": "Extract VALÈNCIA CENTRE",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        600,
        0
      ],
      "notesInFlow": true,
      "notes": "Uses metadata column indexes to find VALÈNCIA CENTRE without hard-coding a row number."
    },
    {
      "parameters": {
        "chatId": "={{ $('Telegram Trigger').first().json.message.chat.id }}",
        "text": "={{ (['Buena', 'Razonablemente Buena'].includes($json.station.calidad_ambiental) ? '✅' : '⚠️') + ' Air quality at ' + $json.station.address + '\\nObserved: ' + $json.station.dateobserved + '\\nStatus: ' + $json.station.calidad_ambiental + '\\nNO₂: ' + ($json.station.no2value ?? 'N/A') + '\\nPM10: ' + ($json.station.pm10value ?? 'N/A') + '\\nPM2.5: ' + ($json.station.pm25value ?? 'N/A') }}",
        "additionalFields": {
          "appendAttribution": false
        }
      },
      "id": "fd78be82-275a-42d5-974b-c25a028469f7",
      "name": "Reply with Status Icon",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [
        900,
        0
      ],
      "notesInFlow": true,
      "notes": "Replies with ✅ for Buena or Razonablemente Buena; otherwise it replies with ⚠️."
    },
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "hours",
              "hoursInterval": 6,
              "triggerAtMinute": 0
            }
          ]
        }
      },
      "id": "8b6d6a4b-f399-4aca-88e3-71455ab1edc1",
      "name": "Every 6 hours",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.3,
      "position": [
        0,
        300
      ],
      "notesInFlow": true,
      "notes": "Runs every six hours. Set the recipient chat ID below, choose the workflow timezone, then save and publish the workflow."
    },
    {
      "parameters": {
        "url": "https://www.valencia.es/web/guest/valenciaalminut/calidadaire.cors",
        "options": {}
      },
      "id": "dfb1fad3-b079-4cc6-bff7-cf144f008a25",
      "name": "Fetch scheduled air quality",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        300,
        300
      ],
      "notesInFlow": true,
      "notes": "Fetches the latest readings from Valencia City Council Open Data."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "eef82536-ef40-45d1-8f35-a6f35c183ddf",
              "name": "station",
              "value": "={{ Object.fromEntries($json.metadata.map(({ colName, colIndex }) => [colName, $json.resultset.find(row => row[$json.metadata.find(column => column.colName === 'address').colIndex] === 'VALÈNCIA CENTRE')[colIndex]])) }}",
              "type": "object"
            }
          ]
        },
        "options": {}
      },
      "id": "9ecfb63a-fcf5-447a-b251-438e138fda3d",
      "name": "Select scheduled VALÈNCIA CENTRE",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        600,
        300
      ],
      "notesInFlow": true,
      "notes": "Uses metadata column indexes to find VALÈNCIA CENTRE without hard-coding a row number."
    },
    {
      "parameters": {
        "chatId": "REPLACE_WITH_YOUR_TELEGRAM_CHAT_ID",
        "text": "={{ (['Buena', 'Razonablemente Buena'].includes($json.station.calidad_ambiental) ? '✅' : '⚠️') + ' Air quality at ' + $json.station.address + '\\nObserved: ' + $json.station.dateobserved + '\\nStatus: ' + $json.station.calidad_ambiental + '\\nNO₂: ' + ($json.station.no2value ?? 'N/A') + '\\nPM10: ' + ($json.station.pm10value ?? 'N/A') + '\\nPM2.5: ' + ($json.station.pm25value ?? 'N/A') }}",
        "additionalFields": {
          "appendAttribution": false
        }
      },
      "id": "eca00c3b-bb69-40f4-ad38-badef1a82951",
      "name": "Send scheduled update",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [
        900,
        300
      ],
      "notesInFlow": true,
      "notes": "Replace the placeholder with your own fixed private chat ID, captured after messaging the bot once. Each scheduled run sends fresh VALÈNCIA CENTRE data to this one user without depending on a Telegram Trigger execution."
    }
  ],
  "pinData": {},
  "connections": {
    "Telegram Trigger": {
      "main": [
        [
          {
            "node": "Get Valencia Air Quality",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Valencia Air Quality": {
      "main": [
        [
          {
            "node": "Extract VALÈNCIA CENTRE",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract VALÈNCIA CENTRE": {
      "main": [
        [
          {
            "node": "Reply with Status Icon",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Every 6 hours": {
      "main": [
        [
          {
            "node": "Fetch scheduled air quality",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Fetch scheduled air quality": {
      "main": [
        [
          {
            "node": "Select scheduled VALÈNCIA CENTRE",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Select scheduled VALÈNCIA CENTRE": {
      "main": [
        [
          {
            "node": "Send scheduled update",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1",
    "timezone": "Europe/Madrid"
  },
  "versionId": "f61d9ea5-d135-4831-b7c2-60c590a58ba1",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "tags": []
}
```

# English

## Title
Air Quality in Valencia

## Summary
Reply to any Telegram message with fresh air-quality data from any available station.

## Concept
Chat triggers, HTTP requests, and mapping response data

## Scenario
- A resident wants to check the latest air quality in central Valencia without searching it on Google.
- An event organizer wants to check local air quality before choosing an outdoor meetup spot.
- A neighborhood group wants a quick Telegram air-quality update it can share with community members.
- Residents could use the same workflow pattern to request information from Valencia Open Data's nearly 300 public datasets through a familiar messaging app such as Telegram or WhatsApp.

## Task
Create a Telegram bot that replies to any message with fresh air-quality data. Fetch the data each time and return the air-quality rating and all available NO₂, PM10 and PM2.5 measurements from any one station in the same chat. Any station is fine. The message can say anything or contain a photo or sticker; you do not need to read or parse its content.

## Bonus Task
Use the VALÈNCIA CENTRE station specifically. Add ✅ when its rating is Buena or Razonablemente Buena, and ⚠️ for any other rating. Keep replying to incoming messages, and also send a fresh update automatically every six hours to your own Telegram account using one fixed private chat ID, even when no one messages the bot.

## Nodes
- Telegram Trigger
- HTTP Request
- Edit Fields (Set)
- Schedule Trigger
- Telegram

## Preparation
- Sign up for [n8n Cloud](/n8n-sign-up) or open an existing n8n workspace, then create a new workflow.
- Install [Telegram](https://telegram.org/), then create or sign in to a Telegram account.
- Create a Telegram bot with [BotFather](https://t.me/botfather), then [add its token as an n8n credential](https://docs.n8n.io/integrations/builtin/credentials/telegram#using-api-bot-access-token).
- The [Valencia City Council air-quality endpoint](https://www.valencia.es/web/guest/valenciaalminut/calidadaire.cors) provides real-time data. Keep it ready to use in your HTTP Request node.
- For the bonus, send your bot a private message once and copy message.chat.id from Telegram Trigger. Use that fixed ID as the recipient of scheduled updates. Configure the [Schedule Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/) and publish the workflow to enable automatic runs.

## Requirements
- Any incoming message triggers a fresh request and a reply to the same chat, without checking its text or requiring a command. Test with two unrelated messages, such as a greeting and a sticker. Each must receive a reply based on newly fetched data.
- The core reply includes the air-quality rating and every available NO₂, PM10 and PM2.5 value from any one station; a missing measurement may be omitted or shown as unavailable.
- For the bonus, select VALÈNCIA CENTRE by its address rather than its row position and apply the rating emoji to both replies and scheduled updates. For the bonus, publish a six-hour schedule that fetches new data and sends it to one fixed private chat ID. Test the scheduled branch independently of an incoming message.

## Tips
- Start with Telegram Trigger and select Message as the event. It receives text, photos, stickers and other messages; no text filter or command parser is needed.
- Add HTTP Request, paste the provided Valencia City Council endpoint into its URL field, and run the node once. Inspect metadata for the column names and resultset for the station rows.
- For the core task, choose any row, such as the first one. Use Edit Fields (Set) to map its air-quality rating and available measurements using the column positions in metadata.
- Finish with Telegram → Send Message. Map the chat ID from Telegram Trigger so each reply returns to the sender. For the bonus, find the row whose address is VALÈNCIA CENTRE and add ✅ for Buena or Razonablemente Buena, otherwise ⚠️.
- For the bonus, add a separate Schedule Trigger branch set to Hours with 6 Hours Between Triggers. Fetch fresh data and send it to your fixed private chat ID; this branch must not read a Telegram Trigger execution. Test it manually, choose the workflow timezone, then save and publish.

# Spanish

## Title
Calidad del aire en Valencia

## Summary
Responde a cualquier mensaje de Telegram con datos actualizados de calidad del aire de cualquier estación disponible.

## Concept
Triggers de chat, peticiones HTTP y mapeo de datos de la respuesta

## Scenario
- Una persona residente quiere consultar la última calidad del aire en el centro de Valencia sin buscarla en Google.
- La organización de un evento quiere revisar la calidad del aire antes de elegir un lugar de encuentro al aire libre.
- Un grupo vecinal quiere una actualización rápida de la calidad del aire por Telegram que pueda compartir con la comunidad.
- El mismo patrón de workflow puede ofrecer información de cualquiera de los casi 300 conjuntos de datos públicos adecuados de Valencia Open Data mediante una aplicación de mensajería conocida, como Telegram o WhatsApp.

## Task
Crea un bot de Telegram que responda a cualquier mensaje con datos actualizados de calidad del aire. Consulta los datos cada vez y devuelve en el mismo chat la valoración de calidad del aire y todas las mediciones disponibles de NO₂, PM10 y PM2.5 de una estación cualquiera. Cualquier estación sirve. El mensaje puede decir cualquier cosa o contener una foto o un sticker; no necesitas leer ni analizar su contenido.

## Bonus Task
Utiliza específicamente la estación VALÈNCIA CENTRE. Añade ✅ cuando su valoración sea Buena o Razonablemente Buena, y ⚠️ para cualquier otra valoración. Sigue respondiendo a los mensajes entrantes y, además, envía una actualización nueva automáticamente cada seis horas a tu propia cuenta de Telegram mediante un único chat ID privado fijo, aunque nadie escriba al bot.

## Nodes
- Telegram Trigger
- HTTP Request
- Edit Fields (Set)
- Schedule Trigger
- Telegram

## Preparation
- Regístrate en [n8n Cloud](/n8n-sign-up) o abre un espacio de trabajo de n8n existente y crea un workflow nuevo.
- Instala [Telegram](https://telegram.org/) y después crea una cuenta de Telegram o inicia sesión en una existente.
- Crea un bot de Telegram con [BotFather](https://t.me/botfather) y después [añade su token como credencial de n8n](https://docs.n8n.io/integrations/builtin/credentials/telegram#using-api-bot-access-token).
- El [endpoint de calidad del aire del Ayuntamiento de Valencia](https://www.valencia.es/web/guest/valenciaalminut/calidadaire.cors) proporciona datos en tiempo real. Tenlo preparado para usarlo en tu nodo HTTP Request.
- Para la tarea extra, envía un mensaje privado a tu bot y copia message.chat.id desde Telegram Trigger. Usa ese ID fijo como destinatario de las actualizaciones programadas. Configura [Schedule Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/) y publica el workflow para activar las ejecuciones automáticas.

## Requirements
- Cualquier mensaje entrante inicia una consulta nueva y una respuesta al mismo chat, sin comprobar su texto ni exigir un comando. Prueba con dos mensajes distintos, como un saludo y un sticker. Cada uno debe recibir una respuesta basada en datos recién consultados.
- La respuesta principal incluye la valoración de calidad del aire y todos los valores disponibles de NO₂, PM10 y PM2.5 de una estación cualquiera; una medición ausente puede omitirse o indicarse como no disponible.
- Para la tarea extra, selecciona VALÈNCIA CENTRE por su dirección, no por su posición de fila, y aplica el emoji de valoración tanto a las respuestas como a las actualizaciones programadas. Para la tarea extra, publica una programación de seis horas que consulte datos nuevos y los envíe a un único chat ID privado fijo. Prueba la rama programada sin depender de un mensaje entrante.

## Tips
- Empieza con Telegram Trigger y selecciona Message como evento. Recibe texto, fotos, stickers y otros mensajes; no necesitas filtrar el texto ni analizar comandos.
- Añade HTTP Request, pega el endpoint proporcionado por el Ayuntamiento de Valencia en el campo URL y ejecuta el nodo una vez. Revisa metadata para ver los nombres de las columnas y resultset para ver las filas de estaciones.
- Para la tarea principal, elige cualquier fila, por ejemplo la primera. Usa Edit Fields (Set) para mapear la valoración de calidad del aire y las mediciones disponibles según las posiciones de las columnas en metadata.
- Termina con Telegram → Send Message. Mapea el chat ID desde Telegram Trigger para responder a quien envió el mensaje. Para la tarea extra, busca la fila cuya dirección sea VALÈNCIA CENTRE y añade ✅ para Buena o Razonablemente Buena; en caso contrario, ⚠️.
- Para la tarea extra, añade una rama independiente con Schedule Trigger configurado en Hours y 6 Hours Between Triggers. Consulta datos nuevos y envíalos a tu chat ID privado fijo; esta rama no debe leer una ejecución de Telegram Trigger. Pruébala manualmente, elige la zona horaria del workflow, guarda y publica.

# Ukrainian

## Title
Якість повітря у Валенсії

## Summary
Відповідайте на будь-яке повідомлення в Telegram свіжими даними про якість повітря з будь-якої доступної станції.

## Concept
Чат-тригери, HTTP-запити та зіставлення даних відповіді

## Scenario
- Мешканець хоче дізнатися про найсвіжішу якість повітря в центрі Валенсії без пошуку в Google.
- Організатор події хоче перевірити місцеву якість повітря перед вибором місця для зустрічі просто неба.
- Районна спільнота хоче швидко отримувати в Telegram оновлення про якість повітря й ділитися ним з учасниками.
- За тим самим шаблоном воркфлоу мешканці могли б запитувати інформацію з майже 300 відкритих наборів даних Valencia Open Data через знайомий месенджер, як-от Telegram або WhatsApp.

## Task
Створіть Telegram-бота, який відповідає на будь-яке повідомлення свіжими даними про якість повітря. Щоразу запитуйте дані та повертайте в той самий чат оцінку якості повітря й усі доступні вимірювання NO₂, PM10 та PM2.5 з будь-якої однієї станції. Підійде будь-яка станція. Повідомлення може містити довільний текст, фото чи стікер; читати або аналізувати його вміст не потрібно.

## Bonus Task
Використовуйте саме станцію VALÈNCIA CENTRE. Додавайте ✅, якщо її оцінка — Buena або Razonablemente Buena, і ⚠️ для будь-якої іншої оцінки. Продовжуйте відповідати на вхідні повідомлення, а також автоматично надсилайте свіже оновлення кожні шість годин у свій Telegram за одним фіксованим chat ID приватного чату, навіть коли ніхто не пише боту.

## Nodes
- Telegram Trigger
- HTTP Request
- Edit Fields (Set)
- Schedule Trigger
- Telegram

## Preparation
- Зареєструйтеся в [n8n Cloud](/n8n-sign-up) або відкрийте наявний воркспейс n8n, а потім створіть новий воркфлоу.
- Установіть [Telegram](https://telegram.org/), а потім створіть обліковий запис Telegram або увійдіть до наявного.
- Створіть Telegram-бота за допомогою [BotFather](https://t.me/botfather), а потім [додайте його токен до облікових даних n8n](https://docs.n8n.io/integrations/builtin/credentials/telegram#using-api-bot-access-token).
- [Ендпоінт міської ради Валенсії з даними про якість повітря](https://www.valencia.es/web/guest/valenciaalminut/calidadaire.cors) надає інформацію в реальному часі. Підготуйте його для використання в ноді HTTP Request.
- Для бонусу один раз напишіть боту в приватному чаті та скопіюйте message.chat.id з Telegram Trigger. Використайте цей фіксований ID як адресу отримувача запланованих оновлень. Налаштуйте [Schedule Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/) і опублікуйте воркфлоу для автоматичних запусків.

## Requirements
- Будь-яке вхідне повідомлення запускає новий запит даних і відповідь у той самий чат, без перевірки тексту чи обов’язкової команди. Перевірте два різні повідомлення, наприклад привітання та стікер. Кожне має отримати відповідь на основі щойно запитаних даних.
- Основна відповідь містить оцінку якості повітря та всі доступні значення NO₂, PM10 і PM2.5 з будь-якої однієї станції; відсутнє вимірювання можна пропустити або позначити як недоступне.
- Для бонусу вибирайте VALÈNCIA CENTRE за адресою, а не позицією рядка, та додавайте емодзі оцінки і до відповідей, і до запланованих оновлень. Для бонусу опублікуйте розклад із запуском кожні шість годин, який отримує свіжі дані та надсилає їх за одним фіксованим chat ID приватного чату. Перевірте гілку розкладу незалежно від вхідного повідомлення.

## Tips
- Почніть із Telegram Trigger та виберіть Message як подію. Він отримує текст, фото, стікери й інші повідомлення; фільтр тексту чи аналіз команд не потрібні.
- Додайте HTTP Request, вставте наданий ендпоінт міської ради Валенсії в поле URL і виконайте ноду один раз. Перегляньте metadata з назвами стовпців і resultset із рядками станцій.
- Для основного завдання виберіть будь-який рядок, наприклад перший. Через Edit Fields (Set) зіставте оцінку якості повітря та доступні вимірювання з позиціями стовпців у metadata.
- Завершіть нодою Telegram → Send Message. Передайте chat ID з Telegram Trigger, щоб відповісти відправнику. Для бонусу знайдіть рядок з адресою VALÈNCIA CENTRE та додайте ✅ для Buena або Razonablemente Buena, інакше ⚠️.
- Для бонусу додайте окрему гілку із Schedule Trigger: Hours та 6 у Hours Between Triggers. Отримуйте свіжі дані й надсилайте їх у свій приватний чат за фіксованим chat ID; ця гілка не має читати виконання Telegram Trigger. Перевірте її вручну, виберіть часовий пояс воркфлоу, збережіть і опублікуйте.
