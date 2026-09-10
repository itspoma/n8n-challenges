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
      "notes": "Starts the workflow whenever the bot receives a Telegram message."
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
              "value": "={{ Object.fromEntries($json.metadata.map(({ colName, colIndex }) => [colName, $json.resultset.find(row => row[$json.metadata.find(column => column.colName === 'address').colIndex] === 'VALÈNCIA CENTRE')[colIndex]])) }}",
              "type": "object"
            }
          ]
        },
        "options": {}
      },
      "id": "76b9f2ea-63de-4bf8-89ce-9183f7af4a89",
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
        "text": "={{ 'Air quality at ' + $json.station.address + '\nObserved: ' + $json.station.dateobserved + '\nStatus: ' + $json.station.calidad_ambiental + '\nNO₂: ' + ($json.station.no2value ?? 'N/A') + '\nPM10: ' + ($json.station.pm10value ?? 'N/A') + '\nPM2.5: ' + ($json.station.pm25value ?? 'N/A') }}",
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
  "versionId": "32a63f29-ad20-4b9b-a73c-1d633571f4fb",
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
      "notes": "Starts the workflow whenever the bot receives a Telegram message."
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
        "text": "={{ (['Buena', 'Razonablemente Buena'].includes($json.station.calidad_ambiental) ? '✅' : '⚠️') + ' Air quality at ' + $json.station.address + '\nObserved: ' + $json.station.dateobserved + '\nStatus: ' + $json.station.calidad_ambiental + '\nNO₂: ' + ($json.station.no2value ?? 'N/A') + '\nPM10: ' + ($json.station.pm10value ?? 'N/A') + '\nPM2.5: ' + ($json.station.pm25value ?? 'N/A') }}",
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
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "91632c01-14c6-40e2-b2aa-10bf5b05ea67",
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
Reply to a Telegram message with the latest air-quality reading for VALÈNCIA CENTRE.

## Concept
Chat triggers, HTTP requests, and data filtering

## Scenario
- A resident wants to check the latest air quality in central Valencia without searching it on Google.
- An event organizer wants to check local air quality before choosing an outdoor meetup spot.
- A neighborhood group wants a quick Telegram air-quality update it can share with community members.
- Residents could use the same workflow pattern to request information from Valencia Open Data's nearly 300 public datasets through a familiar messaging app such as Telegram or WhatsApp.

## Task
Create a Telegram bot that answers the question: **“What is the air quality in central Valencia right now?”**

Whenever someone sends the bot a text message, fetch the latest reading for the **VALÈNCIA CENTRE** monitoring station. Reply in the same chat with the station’s address, the date of the reading, its air-quality rating and all available NO₂, PM10 and PM2.5 measurements. Check the data again for every new message.

## Bonus Task
Add ✅ when the rating is **Buena** or **Razonablemente Buena**, and ⚠️ for any other rating.

## Nodes
- Telegram Trigger
- HTTP Request
- Edit Fields (Set)
- Telegram

## Preparation
- Sign up for [n8n Cloud](/n8n-sign-up) or open an existing n8n workspace, then create a new workflow.
- Install [Telegram](https://telegram.org/), then create or sign in to a Telegram account.
- Create a Telegram bot with [BotFather](https://t.me/botfather), then [add its token as an n8n credential](https://docs.n8n.io/integrations/builtin/credentials/telegram#using-api-bot-access-token).
- The [Valencia City Council air-quality endpoint](https://www.valencia.es/web/guest/valenciaalminut/calidadaire.cors) provides real-time data. Keep it ready to use in your HTTP Request node.

## Requirements
- Every text message makes the bot look up the current VALÈNCIA CENTRE reading instead of relying on a fixed row position.
- The reply returns to the same Telegram chat with the address, observation date, air-quality status, and every available NO₂, PM10, and PM2.5 value.
- Two separate test messages each receive a new reply based on data fetched at that time.

## Tips
- Start with Telegram Trigger, which begins the workflow when your bot receives a message. Select Message as the event and add the Telegram credential that securely stores your bot's private access token.
- Add HTTP Request next, which asks a web address for data. Paste the provided Valencia City Council endpoint into its URL field and run the node once.
- In HTTP Request, inspect metadata, which describes the response columns, and resultset, which contains the station rows and their readings.
- Use Edit Fields (Set) with an expression – a small formula – to match each metadata column name to its position and select the resultset row whose address is exactly VALÈNCIA CENTRE.
- Finish with Telegram and choose Send Message. Map the chat ID – the number that identifies the conversation – from Telegram Trigger, include the selected readings, and add the bonus status icon when appropriate.

# Spanish

## Title
Calidad del aire en Valencia

## Summary
Responde a un mensaje de Telegram con la última medición de calidad del aire de VALÈNCIA CENTRE.

## Concept
Triggers de chat, peticiones HTTP y filtrado de datos

## Scenario
- Una persona residente quiere consultar la última calidad del aire en el centro de Valencia sin buscarla en Google.
- La organización de un evento quiere revisar la calidad del aire antes de elegir un lugar de encuentro al aire libre.
- Un grupo vecinal quiere una actualización rápida de la calidad del aire por Telegram que pueda compartir con la comunidad.
- El mismo patrón de workflow puede ofrecer información de cualquiera de los casi 300 conjuntos de datos públicos adecuados de Valencia Open Data mediante una aplicación de mensajería conocida, como Telegram o WhatsApp.

## Task
Crea un bot de Telegram que responda a la pregunta: **“¿Cuál es la calidad del aire en el centro de Valencia ahora mismo?”**

Cada vez que alguien envíe un mensaje de texto al bot, consulta la última medición de la estación **VALÈNCIA CENTRE**. Responde en el mismo chat con la dirección de la estación, la fecha de la medición, su valoración de calidad del aire y todas las mediciones disponibles de NO₂, PM10 y PM2.5. Vuelve a consultar los datos con cada mensaje nuevo.

## Bonus Task
Añade ✅ cuando la valoración sea **Buena** o **Razonablemente Buena**, y ⚠️ para cualquier otra valoración.

## Nodes
- Telegram Trigger
- HTTP Request
- Edit Fields (Set)
- Telegram

## Preparation
- Regístrate en [n8n Cloud](/n8n-sign-up) o abre un espacio de trabajo de n8n existente y crea un workflow nuevo.
- Instala [Telegram](https://telegram.org/) y después crea una cuenta de Telegram o inicia sesión en una existente.
- Crea un bot de Telegram con [BotFather](https://t.me/botfather) y después [añade su token como credencial de n8n](https://docs.n8n.io/integrations/builtin/credentials/telegram#using-api-bot-access-token).
- El [endpoint de calidad del aire del Ayuntamiento de Valencia](https://www.valencia.es/web/guest/valenciaalminut/calidadaire.cors) proporciona datos en tiempo real. Tenlo preparado para usarlo en tu nodo HTTP Request.

## Requirements
- Cada mensaje de texto hace que el bot consulte la medición actual de VALÈNCIA CENTRE sin depender de una posición de fila fija.
- La respuesta vuelve al mismo chat de Telegram con la dirección, la fecha de observación, el estado de calidad del aire y todos los valores disponibles de NO₂, PM10 y PM2.5.
- Dos mensajes de prueba distintos reciben cada uno una respuesta nueva basada en los datos obtenidos en ese momento.

## Tips
- Empieza con Telegram Trigger, que inicia el workflow cuando el bot recibe un mensaje. Selecciona Message como evento y añade la credencial de Telegram que guarda de forma segura el token de acceso privado de tu bot.
- Añade HTTP Request a continuación, que solicita datos a una dirección web. Pega el endpoint proporcionado por el Ayuntamiento de Valencia en el campo URL y ejecuta el nodo una vez.
- En HTTP Request, revisa metadata, que describe las columnas de la respuesta, y resultset, que contiene las filas de estaciones y sus mediciones.
- Usa Edit Fields (Set) con una expresión – una pequeña fórmula – para relacionar el nombre de cada columna de metadata con su posición y seleccionar la fila de resultset cuya dirección sea exactamente VALÈNCIA CENTRE.
- Termina con Telegram y elige Send Message. Mapea el chat ID – el número que identifica la conversación – desde Telegram Trigger, incluye las mediciones seleccionadas y añade el icono de estado de la tarea extra cuando corresponda.

# Ukrainian

## Title
Якість повітря у Валенсії

## Summary
Відповідайте на повідомлення в Telegram найсвіжішими даними про якість повітря для станції VALÈNCIA CENTRE.

## Concept
Чат-тригери, HTTP-запити та фільтрування даних

## Scenario
- Мешканець хоче дізнатися про найсвіжішу якість повітря в центрі Валенсії без пошуку в Google.
- Організатор події хоче перевірити місцеву якість повітря перед вибором місця для зустрічі просто неба.
- Районна спільнота хоче швидко отримувати в Telegram оновлення про якість повітря й ділитися ним з учасниками.
- За тим самим шаблоном воркфлоу мешканці могли б запитувати інформацію з майже 300 відкритих наборів даних Valencia Open Data через знайомий месенджер, як-от Telegram або WhatsApp.

## Task
Створіть Telegram-бота, який відповідає на запитання: **«Яка якість повітря в центрі Валенсії зараз?»**

Щоразу, коли хтось надсилає боту текстове повідомлення, отримуйте найсвіжіші дані станції моніторингу **VALÈNCIA CENTRE**. Відповідайте в тому самому чаті, вказуючи адресу станції, дату вимірювання, оцінку якості повітря та всі доступні вимірювання NO₂, PM10 і PM2.5. Перевіряйте дані заново для кожного нового повідомлення.

## Bonus Task
Додайте ✅, коли оцінка – **Buena** або **Razonablemente Buena**, і ⚠️ для будь-якої іншої оцінки.

## Nodes
- Telegram Trigger
- HTTP Request
- Edit Fields (Set)
- Telegram

## Preparation
- Зареєструйтеся в [n8n Cloud](/n8n-sign-up) або відкрийте наявний воркспейс n8n, а потім створіть новий воркфлоу.
- Установіть [Telegram](https://telegram.org/), а потім створіть обліковий запис Telegram або увійдіть до наявного.
- Створіть Telegram-бота за допомогою [BotFather](https://t.me/botfather), а потім [додайте його токен до облікових даних n8n](https://docs.n8n.io/integrations/builtin/credentials/telegram#using-api-bot-access-token).
- [Ендпоінт міської ради Валенсії з даними про якість повітря](https://www.valencia.es/web/guest/valenciaalminut/calidadaire.cors) надає інформацію в реальному часі. Підготуйте його для використання в ноді HTTP Request.

## Requirements
- Кожне текстове повідомлення спонукає бота запитати актуальні дані для VALÈNCIA CENTRE, не покладаючись на фіксовану позицію рядка.
- Відповідь повертається в той самий чат Telegram і містить адресу, дату спостереження, стан якості повітря й усі доступні значення NO₂, PM10 та PM2.5.
- Два окремі тестові повідомлення отримують нові відповіді на основі даних, отриманих у момент кожного запиту.

## Tips
- Почніть із Telegram Trigger, який запускає воркфлоу, коли бот отримує повідомлення. Виберіть Message як подію та додайте облікові дані Telegram, які безпечно зберігають приватний токен доступу вашого бота.
- Додайте далі HTTP Request, який запитує дані за вебадресою. Вставте наданий ендпоінт міської ради Валенсії в поле URL і виконайте ноду один раз.
- У HTTP Request перегляньте metadata, яка описує стовпці відповіді, і resultset, який містить рядки станцій та їхні вимірювання.
- Використайте Edit Fields (Set) з виразом – невеликою формулою – щоб зіставити назву кожного стовпця metadata з його позицією та вибрати з resultset рядок, адреса якого точно дорівнює VALÈNCIA CENTRE.
- Завершіть нодою Telegram і виберіть Send Message. Передайте chat ID – номер, який ідентифікує розмову, – з Telegram Trigger, додайте вибрані вимірювання та значок стану для додаткового завдання, коли він потрібен.
