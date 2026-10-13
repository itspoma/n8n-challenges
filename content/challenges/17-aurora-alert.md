---
number: 17
slug: aurora-alert
collection: more
difficulty: beginner
time: 25–35 min
complexity: 2
color: #fffdf6
ink: #1b2427
---

# Solution Data

Internal reference for the solution viewer. This section is not displayed on the challenge page.

## Core Workflow JSON (without bonus)

```json
{
  "name": "Northern Lights Tonight? – Core",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "days",
              "triggerAtHour": 18,
              "triggerAtMinute": 0
            }
          ]
        }
      },
      "id": "0a1f3c6e-5b44-5c2a-9d71-2f0c6e8a4b11",
      "name": "Every evening",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json",
        "options": {}
      },
      "id": "3d52b7a1-8c90-5f43-ae26-71b0d4c9e832",
      "name": "Get the Kp forecast",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        -120
      ],
      "notesInFlow": true,
      "notes": "NOAA SWPC, no key needed. Each row covers three hours and says observed, estimated or predicted."
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
              "id": "c4a81b22-7f36-5ab1-9e05-6d2c18f7a940",
              "leftValue": "={{ $json.observed }}",
              "rightValue": "predicted",
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
      "id": "9b6e0f74-2d18-5c67-b3aa-85f1e4c0d726",
      "name": "Only the forecast rows",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        480,
        -120
      ]
    },
    {
      "parameters": {
        "maxItems": 4
      },
      "id": "5f3c8d19-6a25-54be-8c71-0e9b2a6f4d53",
      "name": "Next 12 hours",
      "type": "n8n-nodes-base.limit",
      "typeVersion": 1,
      "position": [
        720,
        -120
      ],
      "notesInFlow": true,
      "notes": "Four rows of three hours each."
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "max",
              "field": "kp"
            }
          ]
        },
        "options": {}
      },
      "id": "7e21a4c8-9b53-5f80-a16d-4c7e08b5f291",
      "name": "Strongest Kp tonight",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1.1,
      "position": [
        960,
        -120
      ]
    },
    {
      "parameters": {
        "url": "https://api.open-meteo.com/v1/forecast?latitude=60.17&longitude=24.94&hourly=cloud_cover&forecast_days=1&timezone=auto",
        "options": {}
      },
      "id": "2c8f5b06-4e71-5a39-9d84-b3610af7c2e5",
      "name": "Get tonight's cloud cover",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        120
      ],
      "notesInFlow": true,
      "notes": "Open-Meteo, no key needed. Replace the latitude and longitude with your own city."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "8a40c7e3-1b96-5d24-ae57-92f0b6c84d1a",
              "name": "cloud",
              "value": "={{ Math.min(...$json.hourly.cloud_cover.slice(21, 24)) }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "6d09e3b5-7c42-5918-b06f-15a8d2e47c63",
      "name": "Cloud cover after dark",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        480,
        120
      ],
      "notesInFlow": true,
      "notes": "The clearest hour between 21:00 and midnight, local time."
    },
    {
      "parameters": {
        "mode": "combine",
        "combineBy": "combineByPosition",
        "options": {}
      },
      "id": "4b7d2a90-5e83-5c16-9f40-6b1c70e38fa2",
      "name": "Sky and storm together",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        1200,
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
              "id": "1f6b83d4-0a57-52e9-8c31-7d940b2fa6e8",
              "leftValue": "={{ $json.max_kp }}",
              "rightValue": 5,
              "operator": {
                "type": "number",
                "operation": "gte"
              }
            },
            {
              "id": "e307c51b-96d2-5748-ba60-28f4c1e09d7b",
              "leftValue": "={{ $json.cloud }}",
              "rightValue": 40,
              "operator": {
                "type": "number",
                "operation": "lt"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "b5842e17-3c60-59da-8e92-04f7a6b1c3d9",
      "name": "Worth going outside?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        1440,
        0
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://ntfy.sh/n8n-aurora-REPLACE-ME",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Title",
              "value": "Northern lights tonight"
            },
            {
              "name": "Tags",
              "value": "milky_way"
            }
          ]
        },
        "sendBody": true,
        "contentType": "raw",
        "rawContentType": "text/plain",
        "body": "={{ 'Kp ' + $json.max_kp + ' forecast tonight and only ' + $json.cloud + '% cloud. Look north once it is properly dark.' }}",
        "options": {}
      },
      "id": "a91c6f28-4d37-5b05-9124-e8f3b70d5a6c",
      "name": "Send the alert",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        1680,
        -80
      ],
      "notesInFlow": true,
      "notes": "Replace the topic with your own hard-to-guess name, then open https://ntfy.sh/<topic> in a browser or the ntfy app."
    }
  ],
  "connections": {
    "Every evening": {
      "main": [
        [
          {
            "node": "Get the Kp forecast",
            "type": "main",
            "index": 0
          },
          {
            "node": "Get tonight's cloud cover",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the Kp forecast": {
      "main": [
        [
          {
            "node": "Only the forecast rows",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Only the forecast rows": {
      "main": [
        [
          {
            "node": "Next 12 hours",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Next 12 hours": {
      "main": [
        [
          {
            "node": "Strongest Kp tonight",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Strongest Kp tonight": {
      "main": [
        [
          {
            "node": "Sky and storm together",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get tonight's cloud cover": {
      "main": [
        [
          {
            "node": "Cloud cover after dark",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Cloud cover after dark": {
      "main": [
        [
          {
            "node": "Sky and storm together",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "Sky and storm together": {
      "main": [
        [
          {
            "node": "Worth going outside?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Worth going outside?": {
      "main": [
        [
          {
            "node": "Send the alert",
            "type": "main",
            "index": 0
          }
        ],
        []
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
  "name": "Northern Lights Tonight? – Bonus",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "days",
              "triggerAtHour": 18,
              "triggerAtMinute": 0
            }
          ]
        }
      },
      "id": "0a1f3c6e-5b44-5c2a-9d71-2f0c6e8a4b11",
      "name": "Every evening",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json",
        "options": {}
      },
      "id": "3d52b7a1-8c90-5f43-ae26-71b0d4c9e832",
      "name": "Get the Kp forecast",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        -120
      ],
      "notesInFlow": true,
      "notes": "NOAA SWPC, no key needed. Each row covers three hours and says observed, estimated or predicted."
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
              "id": "c4a81b22-7f36-5ab1-9e05-6d2c18f7a940",
              "leftValue": "={{ $json.observed }}",
              "rightValue": "predicted",
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
      "id": "9b6e0f74-2d18-5c67-b3aa-85f1e4c0d726",
      "name": "Only the forecast rows",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        480,
        -120
      ]
    },
    {
      "parameters": {
        "maxItems": 4
      },
      "id": "5f3c8d19-6a25-54be-8c71-0e9b2a6f4d53",
      "name": "Next 12 hours",
      "type": "n8n-nodes-base.limit",
      "typeVersion": 1,
      "position": [
        720,
        -120
      ],
      "notesInFlow": true,
      "notes": "Four rows of three hours each."
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "max",
              "field": "kp"
            }
          ]
        },
        "options": {}
      },
      "id": "7e21a4c8-9b53-5f80-a16d-4c7e08b5f291",
      "name": "Strongest Kp tonight",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1.1,
      "position": [
        960,
        -120
      ]
    },
    {
      "parameters": {
        "url": "https://api.open-meteo.com/v1/forecast?latitude=60.17&longitude=24.94&hourly=cloud_cover&forecast_days=1&timezone=auto",
        "options": {}
      },
      "id": "2c8f5b06-4e71-5a39-9d84-b3610af7c2e5",
      "name": "Get tonight's cloud cover",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        120
      ],
      "notesInFlow": true,
      "notes": "Open-Meteo, no key needed. Replace the latitude and longitude with your own city."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "8a40c7e3-1b96-5d24-ae57-92f0b6c84d1a",
              "name": "cloud",
              "value": "={{ Math.min(...$json.hourly.cloud_cover.slice(21, 24)) }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "6d09e3b5-7c42-5918-b06f-15a8d2e47c63",
      "name": "Cloud cover after dark",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        480,
        120
      ],
      "notesInFlow": true,
      "notes": "The clearest hour between 21:00 and midnight, local time."
    },
    {
      "parameters": {
        "mode": "combine",
        "combineBy": "combineByPosition",
        "options": {}
      },
      "id": "4b7d2a90-5e83-5c16-9f40-6b1c70e38fa2",
      "name": "Sky and storm together",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        1200,
        0
      ]
    },
    {
      "parameters": {},
      "id": "f28b5c71-6039-54ae-b8d2-317c9e0a4b65",
      "name": "Replay the May 2024 storm",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        240,
        380
      ]
    },
    {
      "parameters": {
        "url": "https://kp.gfz.de/app/json/?start=2024-05-10T00:00:00Z&end=2024-05-11T23:59:59Z&index=Kp",
        "options": {}
      },
      "id": "c70e1a46-8b25-5d93-a0f7-4e6b2c81f039",
      "name": "Get that night's real Kp",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        600,
        380
      ],
      "notesInFlow": true,
      "notes": "GFZ Potsdam, no key needed. One item with parallel Kp and datetime arrays."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "d4916b82-5a07-53fc-9e41-6b80c25d7a3f",
              "name": "max_kp",
              "value": "={{ Math.max(...$json.Kp) }}",
              "type": "number"
            },
            {
              "id": "3a85f0c6-7d14-5b29-8046-e91c37b5ad02",
              "name": "cloud",
              "value": "0",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "81d5a3e0-2c69-5471-b9f8-5a0e46c71b28",
      "name": "Strongest Kp that night",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        960,
        380
      ],
      "notesInFlow": true,
      "notes": "Pretend the sky was clear, so only the storm decides."
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
              "id": "1f6b83d4-0a57-52e9-8c31-7d940b2fa6e8",
              "leftValue": "={{ $json.max_kp }}",
              "rightValue": 5,
              "operator": {
                "type": "number",
                "operation": "gte"
              }
            },
            {
              "id": "e307c51b-96d2-5748-ba60-28f4c1e09d7b",
              "leftValue": "={{ $json.cloud }}",
              "rightValue": 40,
              "operator": {
                "type": "number",
                "operation": "lt"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "b5842e17-3c60-59da-8e92-04f7a6b1c3d9",
      "name": "Worth going outside?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        1440,
        0
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://ntfy.sh/n8n-aurora-REPLACE-ME",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Title",
              "value": "Northern lights tonight"
            },
            {
              "name": "Tags",
              "value": "milky_way"
            }
          ]
        },
        "sendBody": true,
        "contentType": "raw",
        "rawContentType": "text/plain",
        "body": "={{ 'Kp ' + $json.max_kp + ' forecast tonight and only ' + $json.cloud + '% cloud. Look north once it is properly dark.' }}",
        "options": {}
      },
      "id": "a91c6f28-4d37-5b05-9124-e8f3b70d5a6c",
      "name": "Send the alert",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        1680,
        -80
      ],
      "notesInFlow": true,
      "notes": "Replace the topic with your own hard-to-guess name, then open https://ntfy.sh/<topic> in a browser or the ntfy app."
    }
  ],
  "connections": {
    "Every evening": {
      "main": [
        [
          {
            "node": "Get the Kp forecast",
            "type": "main",
            "index": 0
          },
          {
            "node": "Get tonight's cloud cover",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the Kp forecast": {
      "main": [
        [
          {
            "node": "Only the forecast rows",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Only the forecast rows": {
      "main": [
        [
          {
            "node": "Next 12 hours",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Next 12 hours": {
      "main": [
        [
          {
            "node": "Strongest Kp tonight",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Strongest Kp tonight": {
      "main": [
        [
          {
            "node": "Sky and storm together",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get tonight's cloud cover": {
      "main": [
        [
          {
            "node": "Cloud cover after dark",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Cloud cover after dark": {
      "main": [
        [
          {
            "node": "Sky and storm together",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "Sky and storm together": {
      "main": [
        [
          {
            "node": "Worth going outside?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Replay the May 2024 storm": {
      "main": [
        [
          {
            "node": "Get that night's real Kp",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get that night's real Kp": {
      "main": [
        [
          {
            "node": "Strongest Kp that night",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Strongest Kp that night": {
      "main": [
        [
          {
            "node": "Worth going outside?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Worth going outside?": {
      "main": [
        [
          {
            "node": "Send the alert",
            "type": "main",
            "index": 0
          }
        ],
        []
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
Northern Lights Tonight?

## Summary
Get a message only on the evenings when the aurora could reach your city and the sky is clear enough to see it.

## Concept
Turning two separate forecasts into one decision with Merge and If

## Glossary
- API: A web address that returns data for programs instead of a page for people. One here returns the space-weather forecast, another the cloud cover.
- Kp index: A 0 to 9 scale for how strongly Earth's magnetic field is being shaken. From about 5 the aurora reaches far enough south to be seen from cities like Edinburgh, Hamburg or Kyiv.
- geomagnetic storm: A few hours when the solar wind hits Earth hard enough to light up the sky far from the poles.
- cloud cover: The share of the sky covered by cloud, from 0 to 100 per cent. Under about 40 per cent there are enough gaps to see through.
- forecast row: Each row of the NOAA file covers three hours and is marked observed, estimated or predicted. Only predicted rows are still ahead of you.
- ntfy.sh: A free notification service. Send a message to a topic name, and every phone or browser subscribed to that topic gets it.

## Scenario
- A photographer who would rather get one message than watch three aurora dashboards every night.
- A family far enough north that the sky is worth checking between October and March.
- Any alert that should fire only when two unrelated conditions are true at the same time – price and stock, wind and tide, pollen and an open window.

## Task
Message me only on the evenings when the northern lights could be visible from my city and the sky is clear enough to actually see them. On quiet nights, and on nights when it is clouded over, stay silent.

## Bonus Task
Prove the alert really works by replaying the great geomagnetic storm of 10 and 11 May 2024: fetch what was actually measured that night and show that the same decision would have sent the message.

## Nodes
- Schedule Trigger
- HTTP Request
- Filter
- Limit
- Summarize
- Edit Fields (Set)
- Merge
- IF
- Manual Trigger

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account is needed.
- Space weather comes from the [NOAA Space Weather Prediction Center](https://www.swpc.noaa.gov/products/planetary-k-index) three-day forecast, and the history from [GFZ Potsdam](https://kp.gfz.de/en/data) (CC BY 4.0). Neither needs a key. NOAA changed the shape of this file in March 2026, so older tutorials show different field names.
- Cloud cover comes from the [Open-Meteo forecast API](https://open-meteo.com/en/docs), free for non-commercial use and with no key. Look up your city's latitude and longitude once and put them in the URL.
- To receive the message, use [ntfy.sh](https://ntfy.sh/): pick a hard-to-guess topic name and open https://ntfy.sh/your-topic in a browser or [install the ntfy app](https://docs.ntfy.sh/subscribe/phone/). No account is needed. A Telegram bot from challenge 2 works just as well.
- Set the workflow's time zone in its Settings, so that "this evening" means your evening.

## Requirements
- On a quiet or cloudy evening the workflow sends nothing, and the execution shows which of the two conditions failed.
- When the forecast reaches Kp 5 or higher and cloud cover stays below 40 per cent, exactly one message arrives, naming tonight's strongest Kp and the cloud cover it found.
- The workflow is published and runs by itself every evening. Bonus: replaying 10 and 11 May 2024 finds Kp 9.0 and shows the alert would have fired.

## Tips
- Start with Schedule Trigger at 18:00 every day – it starts the workflow on its own, and both halves of the workflow hang off it. While you build, run it by hand with Execute workflow.
- Add HTTP Request with GET to https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json. Open its output and look at the observed field: rows are marked observed, estimated or predicted.
- Keep only what is still ahead. Filter where observed equals predicted, then Limit to 4 items – each row covers three hours, so four rows are the next twelve. Summarize with Max on the kp field then gives you one item with max_kp.
- For the sky, add a second HTTP Request to https://api.open-meteo.com/v1/forecast?latitude=…&longitude=…&hourly=cloud_cover&forecast_days=1&timezone=auto, then Edit Fields (Set) with a number field cloud set to Math.min(...$json.hourly.cloud_cover.slice(21, 24)) – the clearest hour late in the evening. Bring both halves back together with Merge in Combine by position mode.
- Add If with two conditions – max_kp greater than or equal to 5, and cloud less than 40 – and wire only its true output to HTTP Request, POST to https://ntfy.sh/your-topic with Body Content Type Raw. For the bonus, add Manual Trigger, then HTTP Request to https://kp.gfz.de/app/json/?start=2024-05-10T00:00:00Z&end=2024-05-11T23:59:59Z&index=Kp, then Edit Fields (Set) with max_kp set to Math.max(...$json.Kp) and cloud set to 0, and connect that into the same If node.

# Spanish

## Title
¿Hay auroras boreales esta noche?

## Summary
Recibe un mensaje solo las noches en que la aurora podría llegar a tu ciudad y el cielo está lo bastante despejado para verla.

## Concept
Convertir dos previsiones distintas en una sola decisión con Merge e If

## Glossary
- API: Una dirección web que devuelve datos para programas en lugar de una página para personas. Aquí una devuelve la previsión meteorológica espacial y otra la nubosidad.
- índice Kp: Una escala de 0 a 9 que mide cuánto se agita el campo magnético de la Tierra. A partir de 5 la aurora baja lo suficiente como para verse desde ciudades como Edimburgo, Hamburgo o Kyiv.
- tormenta geomagnética: Unas horas en las que el viento solar golpea la Tierra con fuerza suficiente para iluminar el cielo lejos de los polos.
- nubosidad: La parte del cielo cubierta por nubes, de 0 a 100 por ciento. Por debajo del 40 por ciento quedan claros suficientes para ver a través.
- fila de previsión: Cada fila del archivo de la NOAA cubre tres horas y lleva la marca observed, estimated o predicted. Solo las filas predicted están todavía por venir.
- ntfy.sh: Un servicio gratuito de notificaciones. Envías un mensaje a un nombre de tema y lo reciben todos los móviles o navegadores suscritos a ese tema.

## Scenario
- Una persona aficionada a la fotografía que prefiere un mensaje a vigilar tres paneles de auroras cada noche.
- Una familia que vive lo bastante al norte como para que merezca la pena mirar el cielo entre octubre y marzo.
- Cualquier aviso que deba saltar solo cuando dos condiciones sin relación se cumplen a la vez: precio y stock, viento y marea, polen y una ventana abierta.

## Task
Avísame solo las noches en que las auroras boreales podrían verse desde mi ciudad y el cielo está lo bastante despejado para verlas de verdad. Las noches tranquilas, y las noches nubladas, no digas nada.

## Bonus Task
Demuestra que el aviso funciona repitiendo la gran tormenta geomagnética del 10 y 11 de mayo de 2024: recupera lo que se midió realmente esa noche y comprueba que la misma decisión habría enviado el mensaje.

## Nodes
- Schedule Trigger
- HTTP Request
- Filter
- Limit
- Summarize
- Edit Fields (Set)
- Merge
- IF
- Manual Trigger

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta.
- La meteorología espacial viene de la previsión a tres días del [Space Weather Prediction Center de la NOAA](https://www.swpc.noaa.gov/products/planetary-k-index), y el histórico de [GFZ Potsdam](https://kp.gfz.de/en/data) (CC BY 4.0). Ninguna necesita clave. La NOAA cambió la forma de este archivo en marzo de 2026, así que los tutoriales antiguos muestran otros nombres de campo.
- La nubosidad viene de la [API de previsión de Open-Meteo](https://open-meteo.com/en/docs), gratuita para uso no comercial y sin clave. Busca una vez la latitud y la longitud de tu ciudad y ponlas en la URL.
- Para recibir el mensaje usa [ntfy.sh](https://ntfy.sh/): elige un nombre de tema difícil de adivinar y abre https://ntfy.sh/tu-tema en el navegador o [instala la app de ntfy](https://docs.ntfy.sh/subscribe/phone/). No hace falta cuenta. Un bot de Telegram del reto 2 sirve igual de bien.
- Configura la zona horaria del workflow en sus Settings para que «esta noche» sea tu noche.

## Requirements
- En una noche tranquila o nublada el workflow no envía nada, y la ejecución muestra cuál de las dos condiciones falló.
- Cuando la previsión llega a Kp 5 o más y la nubosidad se queda por debajo del 40 por ciento, llega exactamente un mensaje con el Kp más alto de la noche y la nubosidad encontrada.
- El workflow está publicado y se ejecuta solo cada tarde. Bonus: al repetir el 10 y 11 de mayo de 2024 aparece Kp 9.0 y se ve que el aviso habría saltado.

## Tips
- Empieza con Schedule Trigger cada día a las 18:00: inicia el workflow por sí solo y de él cuelgan las dos mitades. Mientras construyes, lánzalo a mano con Execute workflow.
- Añade HTTP Request con GET a https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json. Abre su salida y fíjate en el campo observed: las filas están marcadas como observed, estimated o predicted.
- Quédate solo con lo que aún está por venir. Filter con observed igual a predicted, luego Limit a 4 ítems: cada fila cubre tres horas, así que cuatro filas son las doce próximas. Summarize con Max sobre el campo kp te deja un único ítem con max_kp.
- Para el cielo, añade un segundo HTTP Request a https://api.open-meteo.com/v1/forecast?latitude=…&longitude=…&hourly=cloud_cover&forecast_days=1&timezone=auto y después Edit Fields (Set) con un campo numérico cloud igual a Math.min(...$json.hourly.cloud_cover.slice(21, 24)): la hora más despejada de la noche. Vuelve a unir las dos mitades con Merge en modo Combine by position.
- Añade If con dos condiciones – max_kp mayor o igual que 5 y cloud menor que 40 – y conecta solo su salida true a HTTP Request, POST a https://ntfy.sh/tu-tema con Body Content Type Raw. Para el bonus, añade Manual Trigger, después HTTP Request a https://kp.gfz.de/app/json/?start=2024-05-10T00:00:00Z&end=2024-05-11T23:59:59Z&index=Kp y después Edit Fields (Set) con max_kp igual a Math.max(...$json.Kp) y cloud igual a 0, y conéctalo al mismo nodo If.

# Ukrainian

## Title
Чи буде сьогодні полярне сяйво?

## Summary
Отримуй повідомлення лише тими вечорами, коли сяйво може дістатися твого міста, а небо достатньо чисте, щоб його побачити.

## Concept
Перетворення двох окремих прогнозів на одне рішення за допомогою Merge та If

## Glossary
- API: Вебадреса, яка повертає дані для програм замість сторінки для людей. Тут одна повертає прогноз космічної погоди, інша – хмарність.
- індекс Kp: Шкала від 0 до 9, яка показує, наскільки сильно збурене магнітне поле Землі. Приблизно від 5 сяйво опускається так далеко на південь, що його видно з таких міст, як Единбург, Гамбург чи Київ.
- геомагнітна буря: Кілька годин, коли сонячний вітер б'є по Землі достатньо сильно, щоб запалити небо далеко від полюсів.
- хмарність: Частка неба, закрита хмарами, від 0 до 100 відсотків. Нижче приблизно 40 відсотків залишається достатньо просвітів.
- рядок прогнозу: Кожен рядок файлу NOAA охоплює три години й позначений як observed, estimated або predicted. Лише рядки predicted ще попереду.
- ntfy.sh: Безкоштовний сервіс сповіщень. Надсилаєш повідомлення на назву теми – і його отримує кожен телефон чи браузер, підписаний на цю тему.

## Scenario
- Фотограф, якому зручніше отримати одне повідомлення, ніж щовечора стежити за трьома панелями про сяйво.
- Родина, яка живе достатньо на півночі, щоб із жовтня до березня вартувало поглядати на небо.
- Будь-яке сповіщення, яке має спрацьовувати лише тоді, коли дві незалежні умови виконуються одночасно: ціна й наявність, вітер і приплив, пилок і відчинене вікно.

## Task
Пиши мені лише тими вечорами, коли полярне сяйво може бути видно з мого міста, а небо достатньо чисте, щоб його справді побачити. У спокійні та захмарені ночі мовчи.

## Bonus Task
Доведи, що сповіщення працює: відтвори велику геомагнітну бурю 10 та 11 травня 2024 року, візьми те, що насправді виміряли тієї ночі, і покажи, що те саме рішення надіслало б повідомлення.

## Nodes
- Schedule Trigger
- HTTP Request
- Filter
- Limit
- Summarize
- Edit Fields (Set)
- Merge
- IF
- Manual Trigger

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів не потрібно.
- Космічна погода надходить із тридобового прогнозу [Центру прогнозування космічної погоди NOAA](https://www.swpc.noaa.gov/products/planetary-k-index), а історія – від [GFZ Potsdam](https://kp.gfz.de/en/data) (CC BY 4.0). Ключ не потрібен для жодного з них. У березні 2026 року NOAA змінила формат цього файлу, тож старі посібники показують інші назви полів.
- Хмарність надходить із [API прогнозу Open-Meteo](https://open-meteo.com/en/docs), безкоштовного для некомерційного використання й без ключа. Знайди один раз широту й довготу свого міста та встав їх в URL.
- Щоб отримувати повідомлення, скористайся [ntfy.sh](https://ntfy.sh/): вибери назву теми, яку важко вгадати, і відкрий https://ntfy.sh/твоя-тема у браузері або [встанови застосунок ntfy](https://docs.ntfy.sh/subscribe/phone/). Акаунт не потрібен. Telegram-бот із завдання 2 підійде так само добре.
- Налаштуй часовий пояс воркфлоу в його Settings, щоб «сьогодні ввечері» означало твій вечір.

## Requirements
- Спокійного або захмареного вечора воркфлоу не надсилає нічого, а в журналі виконання видно, яка з двох умов не справдилася.
- Коли прогноз сягає Kp 5 або вище, а хмарність лишається нижче 40 відсотків, надходить рівно одне повідомлення з найвищим Kp цієї ночі та знайденою хмарністю.
- Воркфлоу опубліковано, і він сам запускається щовечора. Бонус: відтворення 10 та 11 травня 2024 року дає Kp 9.0 і показує, що сповіщення спрацювало б.

## Tips
- Почни зі Schedule Trigger щодня о 18:00: він запускає воркфлоу самостійно, і від нього відходять обидві половини. Поки будуєш, запускай його вручну через Execute workflow.
- Додай HTTP Request із GET на https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json. Відкрий його результат і подивися на поле observed: рядки позначені як observed, estimated або predicted.
- Залиш лише те, що попереду. Filter з умовою observed дорівнює predicted, далі Limit до 4 елементів: кожен рядок охоплює три години, тож чотири рядки – це найближчі дванадцять. Summarize з Max для поля kp дає один елемент із max_kp.
- Для неба додай другий HTTP Request на https://api.open-meteo.com/v1/forecast?latitude=…&longitude=…&hourly=cloud_cover&forecast_days=1&timezone=auto, а потім Edit Fields (Set) із числовим полем cloud, що дорівнює Math.min(...$json.hourly.cloud_cover.slice(21, 24)) – найчистіша година пізнього вечора. Знову з'єднай обидві половини через Merge у режимі Combine by position.
- Додай If із двома умовами – max_kp більше або дорівнює 5 і cloud менше ніж 40 – і підключи лише вихід true до HTTP Request, POST на https://ntfy.sh/твоя-тема з Body Content Type Raw. Для бонусу додай Manual Trigger, далі HTTP Request на https://kp.gfz.de/app/json/?start=2024-05-10T00:00:00Z&end=2024-05-11T23:59:59Z&index=Kp, далі Edit Fields (Set) із max_kp, що дорівнює Math.max(...$json.Kp), і cloud, що дорівнює 0, та підключи його до того самого вузла If.
