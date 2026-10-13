---
number: 18
slug: new-episode-today
collection: more
difficulty: beginner
time: 20–30 min
complexity: 2
color: #fffdf6
ink: #1b2427
---

# Solution Data

Internal reference for the solution viewer. This section is not displayed on the challenge page.

## Core Workflow JSON (without bonus)

```json
{
  "name": "Never Miss an Episode – Core",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "days",
              "triggerAtHour": 8,
              "triggerAtMinute": 0
            }
          ]
        }
      },
      "id": "b41e7a25-9c36-5f80-ae13-6d029f4c7b51",
      "name": "Every morning",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "7c0d5b93-4e81-52a7-b6f9-18c3047ae265",
              "name": "shows",
              "value": "={{ [\"The Simpsons\", \"Saturday Night Live\", \"Doctor Who\"] }}",
              "type": "array"
            }
          ]
        },
        "options": {}
      },
      "id": "e95b2c08-3a74-51d6-9f27-40b8e1a65c73",
      "name": "My favourite shows",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "Put your own shows here, written the way TVmaze spells them."
    },
    {
      "parameters": {
        "fieldToSplitOut": "shows",
        "options": {}
      },
      "id": "2a6f84d1-7b50-5e39-8c04-f31d7609ba48",
      "name": "One item per show",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        480,
        0
      ]
    },
    {
      "parameters": {
        "url": "=https://api.tvmaze.com/singlesearch/shows?q={{ encodeURIComponent($json.shows) }}&embed=nextepisode",
        "options": {}
      },
      "id": "6b30e7c9-5142-5a8b-bd96-7e0c48f2a139",
      "name": "Ask TVmaze about each show",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        720,
        0
      ],
      "notesInFlow": true,
      "notes": "TVmaze needs no key. The embed parameter adds the next episode to the answer."
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "9d471f62-8c05-53ba-a710-25e6b9c04f8d",
              "leftValue": "={{ DateTime.fromISO($json._embedded?.nextepisode?.airstamp ?? '1970-01-01T00:00:00+00:00').setZone($now.zoneName).toFormat('yyyy-MM-dd') }}",
              "rightValue": "={{ $now.toFormat('yyyy-MM-dd') }}",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "cb5a9d12-5347-4181-b43e-f523e3e73547",
      "name": "Airing today where I live",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        960,
        0
      ],
      "notesInFlow": true,
      "notes": "airstamp is UTC, so convert it to the workflow time zone before comparing dates."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "1e8b4059-2f67-5c41-ad93-7b06c2e84f15",
              "name": "show",
              "value": "={{ $json.name }}",
              "type": "string"
            },
            {
              "id": "7411af7c-2b15-47d3-a5f4-96a2779b8a2d",
              "name": "episode",
              "value": "={{ $json._embedded.nextepisode.season + 'x' + String($json._embedded.nextepisode.number).padStart(2, '0') + ' ' + $json._embedded.nextepisode.name }}",
              "type": "string"
            },
            {
              "id": "c231983b-ba5b-42b3-b5f8-e7251bde9e88",
              "name": "time",
              "value": "={{ DateTime.fromISO($json._embedded.nextepisode.airstamp).setZone($now.zoneName).toFormat('HH:mm') }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "38664f26-fbec-40d6-bc38-49171db8d399",
      "name": "Show, episode and local time",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1200,
        0
      ]
    },
    {
      "parameters": {
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "time",
              "order": "ascending"
            }
          ]
        },
        "options": {}
      },
      "id": "5a09c3e8-7142-5bf6-9d38-26b01e7c4a90",
      "name": "Earliest first",
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [
        1440,
        0
      ]
    },
    {
      "parameters": {
        "aggregate": "aggregateAllItemData",
        "destinationFieldName": "episodes",
        "options": {}
      },
      "id": "012f2558-1a10-499b-907a-4cd82103293a",
      "name": "All in one item",
      "type": "n8n-nodes-base.aggregate",
      "typeVersion": 1,
      "position": [
        1680,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "e81c190f-af9d-45d0-a85f-1ec1d676037a",
              "name": "message",
              "value": "={{ 'On tonight:\\n\\n' + $json.episodes.map(episode => episode.time + '  ' + episode.show + ' – ' + episode.episode).join('\\n') }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "41d2aa83-6145-4220-abd8-9eede7667185",
      "name": "Write the message",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1920,
        0
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://ntfy.sh/n8n-tv-REPLACE-ME",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Title",
              "value": "New episodes today"
            },
            {
              "name": "Tags",
              "value": "tv"
            }
          ]
        },
        "sendBody": true,
        "contentType": "raw",
        "rawContentType": "text/plain",
        "body": "={{ $json.message }}",
        "options": {}
      },
      "id": "603d9b8f-e1e3-4deb-bdf5-f1c1276b38c4",
      "name": "Send to your phone",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        2160,
        0
      ],
      "notesInFlow": true,
      "notes": "Replace the topic with your own hard-to-guess name, then open https://ntfy.sh/<topic> in a browser or the ntfy app."
    }
  ],
  "connections": {
    "Every morning": {
      "main": [
        [
          {
            "node": "My favourite shows",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "My favourite shows": {
      "main": [
        [
          {
            "node": "One item per show",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One item per show": {
      "main": [
        [
          {
            "node": "Ask TVmaze about each show",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Ask TVmaze about each show": {
      "main": [
        [
          {
            "node": "Airing today where I live",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Airing today where I live": {
      "main": [
        [
          {
            "node": "Show, episode and local time",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Show, episode and local time": {
      "main": [
        [
          {
            "node": "Earliest first",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Earliest first": {
      "main": [
        [
          {
            "node": "All in one item",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "All in one item": {
      "main": [
        [
          {
            "node": "Write the message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Write the message": {
      "main": [
        [
          {
            "node": "Send to your phone",
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
  "pinData": {}
}
```

## Bonus Workflow JSON

```json
{
  "name": "Never Miss an Episode – Bonus",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "days",
              "triggerAtHour": 8,
              "triggerAtMinute": 0
            }
          ]
        }
      },
      "id": "b41e7a25-9c36-5f80-ae13-6d029f4c7b51",
      "name": "Every morning",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "7c0d5b93-4e81-52a7-b6f9-18c3047ae265",
              "name": "shows",
              "value": "={{ [\"The Simpsons\", \"Saturday Night Live\", \"Doctor Who\"] }}",
              "type": "array"
            }
          ]
        },
        "options": {}
      },
      "id": "e95b2c08-3a74-51d6-9f27-40b8e1a65c73",
      "name": "My favourite shows",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "Put your own shows here, written the way TVmaze spells them."
    },
    {
      "parameters": {
        "fieldToSplitOut": "shows",
        "options": {}
      },
      "id": "2a6f84d1-7b50-5e39-8c04-f31d7609ba48",
      "name": "One item per show",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        480,
        0
      ]
    },
    {
      "parameters": {
        "url": "=https://api.tvmaze.com/singlesearch/shows?q={{ encodeURIComponent($json.shows) }}&embed=nextepisode",
        "options": {}
      },
      "id": "6b30e7c9-5142-5a8b-bd96-7e0c48f2a139",
      "name": "Ask TVmaze about each show",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        720,
        0
      ],
      "notesInFlow": true,
      "notes": "TVmaze needs no key. The embed parameter adds the next episode to the answer."
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "9d471f62-8c05-53ba-a710-25e6b9c04f8d",
              "leftValue": "={{ DateTime.fromISO($json._embedded?.nextepisode?.airstamp ?? '1970-01-01T00:00:00+00:00').setZone($now.zoneName).toFormat('yyyy-MM-dd') }}",
              "rightValue": "={{ $now.toFormat('yyyy-MM-dd') }}",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "fa5c8017-6d29-54e3-9b84-0c17e5a37620",
      "name": "Airing today where I live",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        960,
        0
      ],
      "notesInFlow": true,
      "notes": "airstamp is UTC, so convert it to the workflow time zone before comparing dates."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "1e8b4059-2f67-5c41-ad93-7b06c2e84f15",
              "name": "show",
              "value": "={{ $json.name }}",
              "type": "string"
            },
            {
              "id": "47c91de6-0a35-5b82-9174-f3e8c05b7a29",
              "name": "episode",
              "value": "={{ $json._embedded.nextepisode.season + 'x' + String($json._embedded.nextepisode.number).padStart(2, '0') + ' ' + $json._embedded.nextepisode.name }}",
              "type": "string"
            },
            {
              "id": "72dcd911-531c-4ae6-9a48-1935696b2e54",
              "name": "time",
              "value": "={{ DateTime.fromISO($json._embedded.nextepisode.airstamp).setZone($now.zoneName).toFormat('HH:mm') }}",
              "type": "string"
            },
            {
              "id": "b60e9147-3d82-5c05-a719-48f0b2e63c5d",
              "name": "start",
              "value": "={{ $json._embedded.nextepisode.airstamp }}",
              "type": "string"
            },
            {
              "id": "7f24c0a9-8e51-53b6-9074-c1a8d35e62f7",
              "name": "end",
              "value": "={{ DateTime.fromISO($json._embedded.nextepisode.airstamp).plus({ minutes: $json._embedded.nextepisode.runtime ?? 60 }).toISO() }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "c2714a8f-6b93-50de-8f05-3a9c7e14b706",
      "name": "Show, episode and local time",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1200,
        0
      ]
    },
    {
      "parameters": {
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "time",
              "order": "ascending"
            }
          ]
        },
        "options": {}
      },
      "id": "5a09c3e8-7142-5bf6-9d38-26b01e7c4a90",
      "name": "Earliest first",
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [
        1440,
        0
      ]
    },
    {
      "parameters": {
        "aggregate": "aggregateAllItemData",
        "destinationFieldName": "episodes",
        "options": {}
      },
      "id": "d8130b47-9e56-5a02-bc71-4f82e9d10a63",
      "name": "All in one item",
      "type": "n8n-nodes-base.aggregate",
      "typeVersion": 1,
      "position": [
        1680,
        -120
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "0f6c28b5-4a71-539e-8d24-7b51c0e9a386",
              "name": "message",
              "value": "={{ 'On tonight:\\n\\n' + $json.episodes.map(episode => episode.time + '  ' + episode.show + ' – ' + episode.episode).join('\\n') }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "9c45e701-2b38-5d6a-af90-18e6b047c2d3",
      "name": "Write the message",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1920,
        -120
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://ntfy.sh/n8n-tv-REPLACE-ME",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Title",
              "value": "New episodes today"
            },
            {
              "name": "Tags",
              "value": "tv"
            }
          ]
        },
        "sendBody": true,
        "contentType": "raw",
        "rawContentType": "text/plain",
        "body": "={{ $json.message }}",
        "options": {}
      },
      "id": "4e82f1a6-7c05-5c31-9a07-6b14d2e58f93",
      "name": "Send to your phone",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        2160,
        -120
      ],
      "notesInFlow": true,
      "notes": "Replace the topic with your own hard-to-guess name, then open https://ntfy.sh/<topic> in a browser or the ntfy app."
    },
    {
      "parameters": {
        "operation": "iCal",
        "title": "={{ $json.show + ' – ' + $json.episode }}",
        "start": "={{ $json.start }}",
        "end": "={{ $json.end }}",
        "additionalFields": {
          "fileName": "={{ $json.show.toLowerCase().replaceAll(' ', '-') }}.ics",
          "description": "={{ 'Airs at ' + $json.time + ' your time.' }}"
        }
      },
      "id": "a3e0674c-1b95-5782-b4d6-50c9f28a7e41",
      "name": "One calendar file per episode",
      "type": "n8n-nodes-base.convertToFile",
      "typeVersion": 1.1,
      "position": [
        1680,
        140
      ],
      "notesInFlow": true,
      "notes": "Download the .ics from the output panel and open it to add the episode to your calendar."
    }
  ],
  "connections": {
    "Every morning": {
      "main": [
        [
          {
            "node": "My favourite shows",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "My favourite shows": {
      "main": [
        [
          {
            "node": "One item per show",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One item per show": {
      "main": [
        [
          {
            "node": "Ask TVmaze about each show",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Ask TVmaze about each show": {
      "main": [
        [
          {
            "node": "Airing today where I live",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Airing today where I live": {
      "main": [
        [
          {
            "node": "Show, episode and local time",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Show, episode and local time": {
      "main": [
        [
          {
            "node": "Earliest first",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Earliest first": {
      "main": [
        [
          {
            "node": "All in one item",
            "type": "main",
            "index": 0
          },
          {
            "node": "One calendar file per episode",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "All in one item": {
      "main": [
        [
          {
            "node": "Write the message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Write the message": {
      "main": [
        [
          {
            "node": "Send to your phone",
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
  "pinData": {}
}
```

# English

## Title
Never Miss an Episode

## Summary
Every morning, get one message listing which of your favourite shows air today and at what time where you live.

## Concept
Working with time zones by turning a UTC timestamp into a local date and time

## Glossary
- API: A web address that returns data for programs instead of a page for people. This one answers questions about television shows.
- UTC: The world's reference clock. Broadcast times usually arrive in UTC, so they have to be converted before they mean anything locally.
- time zone: The offset your city runs at compared to UTC. In n8n it is a workflow setting, and expressions read it as $now.zoneName.
- embed: A query parameter that asks the API to include extra data in the same answer – here the show's next episode, so you need only one request per show.
- ICS file: The standard calendar file that Apple Calendar, Google Calendar and Outlook all understand. Opening one adds the event to your calendar.
- ntfy.sh: A free notification service. Send a message to a topic name, and every phone or browser subscribed to that topic gets it.

## Scenario
- Someone who follows four shows on four different channels and keeps missing the one that moved night.
- A family that wants one morning message instead of three streaming apps full of notifications.
- Any daily reminder built from a public catalogue – matches, concerts, rocket launches or release dates.

## Task
Each morning, tell me which of my favourite shows have a new episode today, and what time it airs where I live. Put the earliest one first and send it as a single message.

## Bonus Task
Turn each of today's episodes into a calendar file you can open, so the episode lands in your own calendar with its real start and end time.

## Nodes
- Schedule Trigger
- Edit Fields (Set)
- Split Out
- HTTP Request
- Filter
- Sort
- Aggregate
- Convert to File

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account is needed.
- The data comes from the free [TVmaze API](https://www.tvmaze.com/api), which needs no key. Its data is licensed CC BY-SA, and show summaries contain HTML tags, so do not paste them straight into a message.
- To receive the message, use [ntfy.sh](https://ntfy.sh/): pick a hard-to-guess topic name and open https://ntfy.sh/your-topic in a browser or [install the ntfy app](https://docs.ntfy.sh/subscribe/phone/). No account is needed. A Telegram bot from challenge 2 works just as well.
- Set the workflow's time zone in its Settings. Everything in this challenge depends on it being right.

## Requirements
- The message lists only shows that have a new episode today, each with its season and episode number and the local start time, earliest first.
- A show whose next episode is weeks away, or which has ended, never appears in the message.
- The workflow is published and runs by itself every morning. Bonus: each of today's episodes also produces a calendar file with the correct start and end time.

## Tips
- Start with Schedule Trigger at 08:00 every day, then Edit Fields (Set) with one array field called shows holding your favourite titles – that keeps the list in one place instead of scattered through the workflow.
- Add Split Out on the shows field so each title becomes its own item, then HTTP Request to https://api.tvmaze.com/singlesearch/shows?q={{ encodeURIComponent($json.shows) }}&embed=nextepisode – the embed part saves you a second request per show.
- The answer carries airstamp inside _embedded.nextepisode, and it is in UTC. In Filter, compare DateTime.fromISO($json._embedded?.nextepisode?.airstamp ?? '1970-01-01T00:00:00+00:00').setZone($now.zoneName).toFormat('yyyy-MM-dd') with $now.toFormat('yyyy-MM-dd'). The fallback date keeps shows without a next episode from breaking the run.
- Add Edit Fields (Set) for show, episode and a time field built with .setZone($now.zoneName).toFormat('HH:mm'), then Sort by time ascending and Aggregate (All Item Data) into one item so a final Edit Fields (Set) can build the whole message with map() and join('\n').
- Finish with HTTP Request, POST to https://ntfy.sh/your-topic, Body Content Type Raw. For the bonus, branch off Sort into Convert to File with the operation Convert to ICS, start set to the airstamp and end set to DateTime.fromISO(airstamp).plus({ minutes: runtime ?? 60 }).toISO() – runtime is missing for some shows, so always give it a fallback.

# Spanish

## Title
No te pierdas ningún capítulo

## Summary
Cada mañana recibe un único mensaje con las series favoritas que estrenan hoy y a qué hora se ven donde vives.

## Concept
Trabajar con zonas horarias convirtiendo una marca de tiempo UTC en fecha y hora locales

## Glossary
- API: Una dirección web que devuelve datos para programas en lugar de una página para personas. Esta responde preguntas sobre series de televisión.
- UTC: El reloj de referencia mundial. Las horas de emisión suelen llegar en UTC, así que hay que convertirlas para que signifiquen algo donde vives.
- zona horaria: La diferencia a la que va tu ciudad respecto a UTC. En n8n es un ajuste del workflow y las expresiones la leen como $now.zoneName.
- embed: Un parámetro de consulta que pide a la API incluir datos extra en la misma respuesta: aquí el próximo capítulo, de modo que basta una petición por serie.
- archivo ICS: El archivo de calendario estándar que entienden Apple Calendar, Google Calendar y Outlook. Al abrirlo se añade el evento a tu calendario.
- ntfy.sh: Un servicio gratuito de notificaciones. Envías un mensaje a un nombre de tema y lo reciben todos los móviles o navegadores suscritos a ese tema.

## Scenario
- Alguien que sigue cuatro series en cuatro canales distintos y siempre se pierde la que cambió de día.
- Una familia que prefiere un mensaje por la mañana a tres apps de streaming llenas de notificaciones.
- Cualquier recordatorio diario hecho a partir de un catálogo público: partidos, conciertos, lanzamientos espaciales o fechas de estreno.

## Task
Cada mañana, dime qué series de mis favoritas tienen capítulo nuevo hoy y a qué hora se emite donde vivo. Pon primero la más temprana y envíalo todo en un solo mensaje.

## Bonus Task
Convierte cada capítulo de hoy en un archivo de calendario que puedas abrir, para que el capítulo entre en tu propio calendario con su hora real de inicio y de fin.

## Nodes
- Schedule Trigger
- Edit Fields (Set)
- Split Out
- HTTP Request
- Filter
- Sort
- Aggregate
- Convert to File

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta.
- Los datos vienen de la [API gratuita de TVmaze](https://www.tvmaze.com/api), que no necesita clave. Sus datos tienen licencia CC BY-SA y los resúmenes de las series contienen etiquetas HTML, así que no los pegues tal cual en un mensaje.
- Para recibir el mensaje usa [ntfy.sh](https://ntfy.sh/): elige un nombre de tema difícil de adivinar y abre https://ntfy.sh/tu-tema en el navegador o [instala la app de ntfy](https://docs.ntfy.sh/subscribe/phone/). No hace falta cuenta. Un bot de Telegram del reto 2 sirve igual de bien.
- Configura la zona horaria del workflow en sus Settings. Todo este reto depende de que sea la correcta.

## Requirements
- El mensaje incluye solo las series con capítulo nuevo hoy, cada una con su número de temporada y capítulo y la hora local de inicio, de la más temprana a la más tardía.
- Una serie cuyo próximo capítulo está a semanas vista, o que ya terminó, no aparece nunca en el mensaje.
- El workflow está publicado y se ejecuta solo cada mañana. Bonus: cada capítulo de hoy genera además un archivo de calendario con la hora de inicio y de fin correctas.

## Tips
- Empieza con Schedule Trigger cada día a las 08:00 y después Edit Fields (Set) con un único campo de tipo array llamado shows con tus títulos favoritos: así la lista está en un solo sitio y no repartida por el workflow.
- Añade Split Out sobre el campo shows para que cada título sea un ítem y luego HTTP Request a https://api.tvmaze.com/singlesearch/shows?q={{ encodeURIComponent($json.shows) }}&embed=nextepisode: la parte embed te ahorra una segunda petición por serie.
- La respuesta trae airstamp dentro de _embedded.nextepisode, y está en UTC. En Filter compara DateTime.fromISO($json._embedded?.nextepisode?.airstamp ?? '1970-01-01T00:00:00+00:00').setZone($now.zoneName).toFormat('yyyy-MM-dd') con $now.toFormat('yyyy-MM-dd'). La fecha de reserva evita que una serie sin próximo capítulo rompa la ejecución.
- Añade Edit Fields (Set) con show, episode y un campo time construido con .setZone($now.zoneName).toFormat('HH:mm'); después Sort por time ascendente y Aggregate (All Item Data) en un solo ítem para que un último Edit Fields (Set) escriba el mensaje completo con map() y join('\n').
- Termina con HTTP Request, POST a https://ntfy.sh/tu-tema con Body Content Type Raw. Para el bonus, saca una rama desde Sort hacia Convert to File con la operación Convert to ICS, start igual al airstamp y end igual a DateTime.fromISO(airstamp).plus({ minutes: runtime ?? 60 }).toISO(): algunas series no traen runtime, así que pon siempre un valor de reserva.

# Ukrainian

## Title
Не пропусти нову серію

## Summary
Щоранку отримуй одне повідомлення про те, які з улюблених серіалів виходять сьогодні та о котрій за твоїм часом.

## Concept
Робота з часовими поясами: перетворення позначки часу UTC на місцеву дату й час

## Glossary
- API: Вебадреса, яка повертає дані для програм замість сторінки для людей. Ця відповідає на запитання про телесеріали.
- UTC: Світовий еталонний час. Час виходу серій зазвичай надходить саме в UTC, тож його треба перевести, щоб він щось означав у твоєму місті.
- часовий пояс: Зсув твого міста відносно UTC. У n8n це налаштування воркфлоу, а вирази читають його як $now.zoneName.
- embed: Параметр запиту, який просить API додати у ту саму відповідь ще дані – тут наступну серію, тож на кожен серіал потрібен лише один запит.
- файл ICS: Стандартний файл календаря, який розуміють Apple Calendar, Google Calendar і Outlook. Відкриваєш його – і подія з'являється у твоєму календарі.
- ntfy.sh: Безкоштовний сервіс сповіщень. Надсилаєш повідомлення на назву теми – і його отримує кожен телефон чи браузер, підписаний на цю тему.

## Scenario
- Людина, яка стежить за чотирма серіалами на чотирьох різних каналах і постійно пропускає той, що змінив день виходу.
- Родина, якій зручніше одне ранкове повідомлення, ніж три застосунки, повні сповіщень.
- Будь-яке щоденне нагадування з публічного каталогу: матчі, концерти, запуски ракет чи дати релізів.

## Task
Щоранку повідомляй мені, у яких із моїх улюблених серіалів сьогодні виходить нова серія і о котрій годині її показують там, де я живу. Постав найранішу першою і надішли все одним повідомленням.

## Bonus Task
Перетвори кожну сьогоднішню серію на файл календаря, який можна відкрити, щоб серія потрапила до твого календаря зі справжнім часом початку та завершення.

## Nodes
- Schedule Trigger
- Edit Fields (Set)
- Split Out
- HTTP Request
- Filter
- Sort
- Aggregate
- Convert to File

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів не потрібно.
- Дані надходять із безкоштовного [API TVmaze](https://www.tvmaze.com/api), якому не потрібен ключ. Його дані мають ліцензію CC BY-SA, а описи серіалів містять теги HTML, тож не вставляй їх у повідомлення як є.
- Щоб отримувати повідомлення, скористайся [ntfy.sh](https://ntfy.sh/): вибери назву теми, яку важко вгадати, і відкрий https://ntfy.sh/твоя-тема у браузері або [встанови застосунок ntfy](https://docs.ntfy.sh/subscribe/phone/). Акаунт не потрібен. Telegram-бот із завдання 2 підійде так само добре.
- Налаштуй часовий пояс воркфлоу в його Settings. Усе це завдання залежить від того, щоб він був правильний.

## Requirements
- У повідомленні є лише серіали з новою серією сьогодні, кожен із номером сезону та серії й місцевим часом початку, від найранішої до найпізнішої.
- Серіал, наступна серія якого вийде через тижні, або який уже завершився, ніколи не потрапляє до повідомлення.
- Воркфлоу опубліковано, і він сам запускається щоранку. Бонус: кожна сьогоднішня серія додатково дає файл календаря з правильним часом початку та завершення.

## Tips
- Почни зі Schedule Trigger щодня о 08:00, а далі Edit Fields (Set) з одним полем типу array під назвою shows із твоїми улюбленими назвами: так список лежить в одному місці, а не розкиданий по воркфлоу.
- Додай Split Out для поля shows, щоб кожна назва стала окремим елементом, а потім HTTP Request на https://api.tvmaze.com/singlesearch/shows?q={{ encodeURIComponent($json.shows) }}&embed=nextepisode: частина embed економить другий запит на кожен серіал.
- Відповідь містить airstamp усередині _embedded.nextepisode, і він у UTC. У Filter порівняй DateTime.fromISO($json._embedded?.nextepisode?.airstamp ?? '1970-01-01T00:00:00+00:00').setZone($now.zoneName).toFormat('yyyy-MM-dd') із $now.toFormat('yyyy-MM-dd'). Запасна дата не дає серіалу без наступної серії зламати запуск.
- Додай Edit Fields (Set) із show, episode і полем time, побудованим через .setZone($now.zoneName).toFormat('HH:mm'); далі Sort за time за зростанням і Aggregate (All Item Data) в один елемент, щоб останній Edit Fields (Set) написав усе повідомлення через map() і join('\n').
- Заверши через HTTP Request, POST на https://ntfy.sh/твоя-тема з Body Content Type Raw. Для бонусу зроби відгалуження від Sort до Convert to File з операцією Convert to ICS, start дорівнює airstamp, а end – DateTime.fromISO(airstamp).plus({ minutes: runtime ?? 60 }).toISO(): у деяких серіалів немає runtime, тож завжди став запасне значення.
