---
number: 14
slug: who-is-in-space
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
  "name": "Who's in Space Right Now? – Core",
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
      "id": "6b8173cc-5518-5356-9b35-7afe2b472548",
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
        "url": "https://ll.thespacedevs.com/2.3.0/astronauts/?in_space=true&mode=list&limit=100",
        "options": {}
      },
      "id": "4b17454c-5c61-5f37-8c8c-f7281c6b73fc",
      "name": "Get people in space",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "Launch Library 2 allows 15 requests an hour without a key. Pin this node's output while you build."
    },
    {
      "parameters": {
        "fieldToSplitOut": "results",
        "options": {}
      },
      "id": "7955c195-8dbe-5b2d-afdf-1f689bf256bc",
      "name": "One item per person",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        480,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "67f1274d-5813-5c82-a270-0fc29fc77fca",
              "name": "name",
              "value": "={{ $json.name }}",
              "type": "string"
            },
            {
              "id": "5a21c4d6-a7be-5932-a4b6-c3bf69df5a39",
              "name": "agency",
              "value": "={{ $json.agency.abbrev }}",
              "type": "string"
            },
            {
              "id": "2a58a4b5-8988-5745-ab7a-3e675c4819b1",
              "name": "kind",
              "value": "={{ $json.type.name }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "5df3fa9b-4222-5014-b237-637e7de46525",
      "name": "Keep what we need",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        720,
        0
      ]
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
              "id": "a3bb38a2-3eff-53d6-a2bb-f31989c0fb34",
              "leftValue": "={{ $json.kind }}",
              "rightValue": "Non-Human",
              "operator": {
                "type": "string",
                "operation": "notEquals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "f7d70a9d-78c7-5686-9665-6496857691e3",
      "name": "People only",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        960,
        0
      ]
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "concatenate",
              "field": "name",
              "separateBy": ", "
            },
            {
              "aggregation": "count",
              "field": "name"
            }
          ]
        },
        "fieldsToSplitBy": "agency",
        "options": {}
      },
      "id": "b40af23b-b28d-5abb-ac65-1747ecbf220d",
      "name": "Names by agency",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1.1,
      "position": [
        1200,
        0
      ]
    },
    {
      "parameters": {
        "aggregate": "aggregateAllItemData",
        "destinationFieldName": "groups",
        "options": {}
      },
      "id": "5de0457a-b550-5a54-8588-e1018f06f8f9",
      "name": "All in one item",
      "type": "n8n-nodes-base.aggregate",
      "typeVersion": 1,
      "position": [
        1440,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "edb23cae-40ad-558a-aa2c-69ae54a6830b",
              "name": "total",
              "value": "={{ $json.groups.reduce((sum, group) => sum + group.count_name, 0) }}",
              "type": "number"
            },
            {
              "id": "1e1f1939-7fd9-599f-aacd-eab97c801d15",
              "name": "message",
              "value": "={{ $json.groups.reduce((sum, group) => sum + group.count_name, 0) + ' people are in space right now\\n\\n' + $json.groups.map(group => group.agency + ' (' + group.count_name + '): ' + group.concatenated_name).join('\\n') }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "aa6f8f9f-4a75-5d83-99f0-785df4423201",
      "name": "Write the message",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1680,
        0
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://ntfy.sh/n8n-space-REPLACE-ME",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Title",
              "value": "Who is in space today"
            },
            {
              "name": "Tags",
              "value": "rocket"
            }
          ]
        },
        "sendBody": true,
        "contentType": "raw",
        "rawContentType": "text/plain",
        "body": "={{ $json.message }}",
        "options": {}
      },
      "id": "a4be9592-a196-5491-96ba-daac083b28be",
      "name": "Send to your phone",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        1920,
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
            "node": "Get people in space",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get people in space": {
      "main": [
        [
          {
            "node": "One item per person",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One item per person": {
      "main": [
        [
          {
            "node": "Keep what we need",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Keep what we need": {
      "main": [
        [
          {
            "node": "People only",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "People only": {
      "main": [
        [
          {
            "node": "Names by agency",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Names by agency": {
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
  "name": "Who's in Space Right Now? – Bonus",
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
      "id": "62c5fd4f-6167-50cb-a4a9-d84bb84e0ad5",
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
        "url": "https://ll.thespacedevs.com/2.3.0/astronauts/?in_space=true&mode=list&limit=100",
        "options": {}
      },
      "id": "e91f6570-c86c-5637-83a6-5e660abe5e3f",
      "name": "Get people in space",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "Launch Library 2 allows 15 requests an hour without a key. Pin this node's output while you build."
    },
    {
      "parameters": {
        "fieldToSplitOut": "results",
        "options": {}
      },
      "id": "63adb083-91b0-5d36-b8b5-326124dae36d",
      "name": "One item per person",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        480,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "4e1a5dba-abfd-59d4-bb57-5fc153606f89",
              "name": "name",
              "value": "={{ $json.name }}",
              "type": "string"
            },
            {
              "id": "d3df48b4-1c6f-5069-a2dc-79a0dc8fb231",
              "name": "agency",
              "value": "={{ $json.agency.abbrev }}",
              "type": "string"
            },
            {
              "id": "0555bf5b-b798-540d-bad2-267d2a19b0cd",
              "name": "kind",
              "value": "={{ $json.type.name }}",
              "type": "string"
            },
            {
              "id": "c7fdb868-d42c-58d1-ba3f-7935562c11e5",
              "name": "days",
              "value": "={{ Number((($json.time_in_space ?? '').match(/P(\\d+)D/) ?? ['', '0'])[1]) }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "3709d7bd-f27a-570e-a8ab-33d963481d8c",
      "name": "Keep what we need",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        720,
        0
      ]
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
              "id": "c07c9490-3dcc-5c8a-a49e-2ae75ad7f621",
              "leftValue": "={{ $json.kind }}",
              "rightValue": "Non-Human",
              "operator": {
                "type": "string",
                "operation": "notEquals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "1e4a7429-727b-5836-993d-088efdc8d7d3",
      "name": "People only",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        960,
        0
      ]
    },
    {
      "parameters": {
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "days",
              "order": "descending"
            }
          ]
        },
        "options": {}
      },
      "id": "1c7aa4e6-8e63-5677-96a6-f93f2b3b1719",
      "name": "Longest first",
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [
        1200,
        0
      ]
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "concatenate",
              "field": "name",
              "separateBy": ", "
            },
            {
              "aggregation": "count",
              "field": "name"
            }
          ]
        },
        "fieldsToSplitBy": "agency",
        "options": {}
      },
      "id": "f0b654ad-2744-5538-939c-c5fa6fd63cf9",
      "name": "Names by agency",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1.1,
      "position": [
        1440,
        0
      ]
    },
    {
      "parameters": {
        "aggregate": "aggregateAllItemData",
        "destinationFieldName": "groups",
        "options": {}
      },
      "id": "96c7173d-8a03-5dfd-bfb3-731d5d0d430b",
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
              "id": "d3c57be4-e248-59f2-9171-7605ba5075ee",
              "name": "total",
              "value": "={{ $json.groups.reduce((sum, group) => sum + group.count_name, 0) }}",
              "type": "number"
            },
            {
              "id": "ee4e74ce-6273-50fa-a370-a0fac7651c6e",
              "name": "message",
              "value": "={{ $json.groups.reduce((sum, group) => sum + group.count_name, 0) + ' people are in space right now\\n\\n' + $json.groups.map(group => group.agency + ' (' + group.count_name + '): ' + group.concatenated_name).join('\\n') + '\\n\\nLongest career in space: ' + $('Longest first').first().json.name + ' – ' + $('Longest first').first().json.days + ' days' }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "5a9b4eba-62ac-5785-a70b-d30a0944a3e8",
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
        "url": "https://ntfy.sh/n8n-space-REPLACE-ME",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Title",
              "value": "Who is in space today"
            },
            {
              "name": "Tags",
              "value": "rocket"
            }
          ]
        },
        "sendBody": true,
        "contentType": "raw",
        "rawContentType": "text/plain",
        "body": "={{ $json.message }}",
        "options": {}
      },
      "id": "664dfd95-90e8-5999-bc89-322d5b788079",
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
            "node": "Get people in space",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get people in space": {
      "main": [
        [
          {
            "node": "One item per person",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One item per person": {
      "main": [
        [
          {
            "node": "Keep what we need",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Keep what we need": {
      "main": [
        [
          {
            "node": "People only",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "People only": {
      "main": [
        [
          {
            "node": "Longest first",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Longest first": {
      "main": [
        [
          {
            "node": "Names by agency",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Names by agency": {
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

# English

## Title
Who's in Space Right Now?

## Summary
Send yourself a morning message naming everyone in orbit right now, grouped by space agency.

## Concept
Turning an API list into a grouped summary with Split Out, Filter and Summarize

## Glossary
- API: A web address that returns data for programs instead of a page for people. This one returns the list of people in space as JSON.
- JSON: The structured text format that APIs use. n8n shows it as fields you can map and filter.
- pin: The pin icon in a node's output panel saves that output, so later test runs reuse it instead of calling the API again.
- ISO 8601 duration: A standard way to write a length of time, such as P437DT5H for 437 days and 5 hours.
- ntfy.sh: A free notification service. Send a message to a topic name, and every phone or browser subscribed to that topic gets it.

## Scenario
- A classroom display that shows who is in orbit before the first lesson.
- A space fan who wants to notice the day a crew launches or comes home.
- Any daily digest built from a public API – people, products or events.

## Task
Every morning, send me one short message naming everyone who is in space right now, grouped by space agency and with a count for each agency. Make sure you only count people.

## Bonus Task
Work out how many days each person has spent in space over their whole career, list the names from most to least experienced, and end the message by naming the record holder with their number of days.

## Nodes
- Schedule Trigger
- HTTP Request
- Split Out
- Edit Fields (Set)
- Filter
- Sort
- Summarize
- Aggregate

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account is needed.
- The data comes from the free [Launch Library 2 API](https://thespacedevs.com/llapi) by The Space Devs. It needs no key but allows 15 requests an hour, so pin the HTTP Request output while you build. A practice copy with older data and no hourly limit answers at lldev.thespacedevs.com.
- To receive the message on your phone, use [ntfy.sh](https://ntfy.sh/): pick a hard-to-guess topic name, then open https://ntfy.sh/your-topic in a browser or [install the ntfy app](https://docs.ntfy.sh/subscribe/phone/). No account is needed. If you already have a Telegram bot from challenge 2, you can send the message there instead.
- Set the workflow's time zone in its Settings, so that "every morning" means your morning.

## Requirements
- Running the workflow produces one message with the total number of people and one line per space agency: its abbreviation, how many of its people are in space, and their names.
- Only people are counted: Starman – the mannequin SpaceX launched in 2018 – never appears, and the total equals the API's count minus every entry whose type is Non-Human.
- The workflow is published, runs by itself every morning, and the message reaches your phone or chosen channel. Bonus: the message ends with the person who has spent the most days in space.

## Tips
- Start with Schedule Trigger set to every day at 08:00 – it starts the workflow on its own. While you build, run it by hand with Execute workflow.
- Add HTTP Request with GET to https://ll.thespacedevs.com/2.3.0/astronauts/?in_space=true&mode=list&limit=100 and pin its output with the pin icon in the output panel – the free API allows 15 calls an hour.
- Add Split Out on the results field so each person becomes one item, then Edit Fields (Set) to keep only name, agency (from agency.abbrev) and kind (from type.name). Look at the kinds: one entry is Non-Human – that is Starman, the mannequin in SpaceX's Tesla.
- Add Filter with kind is not equal to Non-Human. Then Summarize: split by agency, concatenate name with ", " and count name. Aggregate (All Item Data) turns the groups into one item, so Edit Fields (Set) can write the whole message with map() and join('\n').
- Send it with HTTP Request: POST to https://ntfy.sh/your-topic, Body Content Type Raw with text/plain and your message as the body; add a Title header. For the bonus, add days in Edit Fields (Set) with Number(($json.time_in_space.match(/P(\d+)D/) ?? ['', '0'])[1]) – time_in_space is an ISO 8601 duration such as P437DT5H – add Sort by days descending before Summarize, and name $('Sort').first().json.name in the message.

# Spanish

## Title
¿Quién está en el espacio ahora mismo?

## Summary
Envíate cada mañana un mensaje con todas las personas que están en órbita, agrupadas por agencia espacial.

## Concept
Convertir la lista de una API en un resumen agrupado con Split Out, Filter y Summarize

## Glossary
- API: Una dirección web que devuelve datos para programas en lugar de una página para personas. Esta devuelve la lista de personas en el espacio en JSON.
- JSON: El formato de texto estructurado que usan las API. n8n lo muestra como campos que puedes mapear y filtrar.
- pin: El icono de pin del panel de salida de un nodo guarda esa salida, y las pruebas posteriores la reutilizan en vez de volver a llamar a la API.
- duración ISO 8601: Una forma estándar de escribir un periodo de tiempo, como P437DT5H para 437 días y 5 horas.
- ntfy.sh: Un servicio gratuito de notificaciones. Envías un mensaje a un nombre de tema y lo reciben todos los móviles o navegadores suscritos a ese tema.

## Scenario
- Una pantalla en clase que muestra quién está en órbita antes de la primera lección.
- Una persona aficionada al espacio que quiere enterarse del día en que una tripulación despega o vuelve a casa.
- Cualquier resumen diario creado a partir de una API pública: personas, productos o eventos.

## Task
Cada mañana, envíame un mensaje corto con todas las personas que están en el espacio ahora mismo, agrupadas por agencia espacial y con el número de cada agencia. Asegúrate de contar solo personas.

## Bonus Task
Calcula cuántos días ha pasado cada persona en el espacio a lo largo de toda su carrera, ordena los nombres de más a menos experiencia y termina el mensaje con quien tiene el récord y su número de días.

## Nodes
- Schedule Trigger
- HTTP Request
- Split Out
- Edit Fields (Set)
- Filter
- Sort
- Summarize
- Aggregate

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta.
- Los datos vienen de la [API Launch Library 2](https://thespacedevs.com/llapi) de The Space Devs. No necesita clave, pero permite 15 peticiones por hora, así que fija con pin la salida de HTTP Request mientras construyes. En lldev.thespacedevs.com responde una copia de práctica con datos antiguos y sin límite horario.
- Para recibir el mensaje en el móvil usa [ntfy.sh](https://ntfy.sh/): elige un nombre de tema difícil de adivinar y abre https://ntfy.sh/tu-tema en el navegador o [instala la app de ntfy](https://docs.ntfy.sh/subscribe/phone/). No hace falta cuenta. Si ya tienes un bot de Telegram del reto 2, puedes enviar el mensaje allí.
- Configura la zona horaria del workflow en sus Settings para que «cada mañana» sea tu mañana.

## Requirements
- Al ejecutar el workflow se genera un único mensaje con el total de personas y una línea por agencia espacial: su abreviatura, cuántas de sus personas están en el espacio y sus nombres.
- Solo se cuentan personas: Starman – el maniquí que SpaceX lanzó en 2018 – nunca aparece, y el total es el recuento de la API menos las entradas de tipo Non-Human.
- El workflow está publicado, se ejecuta solo cada mañana y el mensaje llega a tu móvil o al canal elegido. Bonus: el mensaje termina con la persona que más días ha pasado en el espacio.

## Tips
- Empieza con Schedule Trigger configurado cada día a las 08:00: inicia el workflow por sí solo. Mientras construyes, lánzalo a mano con Execute workflow.
- Añade HTTP Request con GET a https://ll.thespacedevs.com/2.3.0/astronauts/?in_space=true&mode=list&limit=100 y fija su salida con el icono de pin del panel de salida: la API gratuita permite 15 llamadas por hora.
- Añade Split Out sobre el campo results para que cada persona sea un ítem y después Edit Fields (Set) para quedarte solo con name, agency (de agency.abbrev) y kind (de type.name). Fíjate en los tipos: una entrada es Non-Human – es Starman, el maniquí del Tesla de SpaceX.
- Añade Filter con kind distinto de Non-Human. Después Summarize: divide por agency, concatena name con «, » y cuenta name. Aggregate (All Item Data) junta los grupos en un solo ítem para que Edit Fields (Set) escriba el mensaje completo con map() y join('\n').
- Envíalo con HTTP Request: POST a https://ntfy.sh/tu-tema, Body Content Type Raw con text/plain y el mensaje como cuerpo; añade una cabecera Title. Para el bonus, calcula days en Edit Fields (Set) con Number(($json.time_in_space.match(/P(\d+)D/) ?? ['', '0'])[1]) – time_in_space es una duración ISO 8601 como P437DT5H –, añade Sort por days descendente antes de Summarize y nombra a $('Sort').first().json.name en el mensaje.

# Ukrainian

## Title
Хто зараз у космосі?

## Summary
Щоранку надсилай собі повідомлення з усіма людьми, які зараз на орбіті, згрупованими за космічними агентствами.

## Concept
Перетворення списку з API на згрупований підсумок за допомогою Split Out, Filter і Summarize

## Glossary
- API: Вебадреса, яка повертає дані для програм замість сторінки для людей. Ця повертає список людей у космосі у форматі JSON.
- JSON: Структурований текстовий формат, який використовують API. n8n показує його як поля, що можна зіставляти й фільтрувати.
- pin: Іконка pin у панелі результату ноди зберігає цей результат, і наступні тестові запуски використовують його замість нового виклику API.
- тривалість ISO 8601: Стандартний спосіб записати проміжок часу, наприклад P437DT5H – 437 днів і 5 годин.
- ntfy.sh: Безкоштовний сервіс сповіщень. Надсилаєш повідомлення на назву теми – і його отримує кожен телефон чи браузер, підписаний на цю тему.

## Scenario
- Екран у класі, який перед першим уроком показує, хто зараз на орбіті.
- Шанувальник космосу, який хоче помітити день, коли екіпаж стартує або повертається додому.
- Будь-який щоденний дайджест із публічного API: люди, товари чи події.

## Task
Щоранку надсилай мені коротке повідомлення з усіма людьми, які зараз у космосі, згрупованими за космічними агентствами і з кількістю для кожного агентства. Рахуй лише людей.

## Bonus Task
Порахуй, скільки днів кожна людина провела в космосі за всю кар’єру, упорядкуй імена від найдосвідченіших до найменш досвідчених і заверши повідомлення рекордсменом та його кількістю днів.

## Nodes
- Schedule Trigger
- HTTP Request
- Split Out
- Edit Fields (Set)
- Filter
- Sort
- Summarize
- Aggregate

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів не потрібно.
- Дані надходять із безкоштовного [API Launch Library 2](https://thespacedevs.com/llapi) від The Space Devs. Ключ не потрібен, але дозволено 15 запитів на годину, тож закріпи через pin вихід HTTP Request, поки будуєш. На lldev.thespacedevs.com відповідає тренувальна копія зі старішими даними й без погодинного ліміту.
- Щоб отримувати повідомлення на телефон, скористайся [ntfy.sh](https://ntfy.sh/): вибери назву теми, яку важко вгадати, і відкрий https://ntfy.sh/твоя-тема у браузері або [встанови застосунок ntfy](https://docs.ntfy.sh/subscribe/phone/). Акаунт не потрібен. Якщо в тебе вже є Telegram-бот із завдання 2, можна надсилати повідомлення туди.
- Налаштуй часовий пояс воркфлоу в його Settings, щоб «щоранку» означало твій ранок.

## Requirements
- Запуск воркфлоу створює одне повідомлення із загальною кількістю людей і одним рядком на кожне космічне агентство: його абревіатура, скільки його людей у космосі та їхні імена.
- Рахуються лише люди: Starman – манекен, який SpaceX запустила 2018 року, – ніколи не з’являється, а загальна кількість дорівнює кількості з API мінус усі записи типу Non-Human.
- Воркфлоу опубліковано, він сам запускається щоранку, а повідомлення надходить на твій телефон чи в обраний канал. Бонус: повідомлення завершується людиною, яка провела в космосі найбільше днів.

## Tips
- Почни зі Schedule Trigger, налаштованого на щодня о 08:00: він запускає воркфлоу самостійно. Поки будуєш, запускай його вручну через Execute workflow.
- Додай HTTP Request із GET на https://ll.thespacedevs.com/2.3.0/astronauts/?in_space=true&mode=list&limit=100 і закріпи його вихід іконкою pin у панелі результату: безкоштовний API дозволяє 15 викликів на годину.
- Додай Split Out для поля results, щоб кожна людина стала окремим елементом, а потім Edit Fields (Set), щоб залишити лише name, agency (з agency.abbrev) і kind (з type.name). Придивися до типів: один запис має тип Non-Human – це Starman, манекен у Tesla від SpaceX.
- Додай Filter з умовою kind не дорівнює Non-Human. Далі Summarize: розділи за agency, об’єднай name через «, » і порахуй name. Aggregate (All Item Data) збирає групи в один елемент, щоб Edit Fields (Set) написав усе повідомлення через map() і join('\n').
- Надішли його через HTTP Request: POST на https://ntfy.sh/твоя-тема, Body Content Type Raw з text/plain і повідомленням у тілі; додай заголовок Title. Для бонусу обчисли days в Edit Fields (Set) через Number(($json.time_in_space.match(/P(\d+)D/) ?? ['', '0'])[1]) – time_in_space є тривалістю ISO 8601 на кшталт P437DT5H –, додай Sort за days за спаданням перед Summarize і назви $('Sort').first().json.name у повідомленні.
