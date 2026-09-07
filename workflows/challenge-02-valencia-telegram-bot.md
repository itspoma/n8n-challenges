# Challenge 2 example solution

These are reference n8n workflows for the **Valencia Air Quality Telegram Bot** challenge. Both variants are kept here for future visualization and solution work:

- **Core solution:** returns all required air-quality fields.
- **Bonus solution:** also prefixes the reply with ✅ or ⚠️ based on the air-quality status.

The workflow shape is:

`Telegram Trigger → Get Valencia Air Quality → Extract VALÈNCIA CENTRE → Reply with Air Quality`

The example deliberately contains no Telegram credential IDs or secrets. Add a Telegram credential in n8n before running it.

## Core solution JSON

```json
{
  "name": "Challenge 2 — Valencia Air Quality Telegram Bot",
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

## Bonus solution JSON

```json
{
  "name": "Challenge 2 — Valencia Air Quality Telegram Bot (Bonus)",
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
