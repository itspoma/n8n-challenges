---
number: 21
slug: recall-check
collection: more
difficulty: beginner
time: 15–25 min
complexity: 2
color: #fffdf6
ink: #1b2427
---

# Solution Data

Internal reference for the solution viewer. This section is not displayed on the challenge page.

## Core Workflow JSON (without bonus)

```json
{
  "name": "Is It Recalled? – Core",
  "nodes": [
    {
      "parameters": {
        "formTitle": "Is it recalled?",
        "formDescription": "Enter the VIN from the windscreen or the registration document.",
        "formFields": {
          "values": [
            {
              "fieldName": "vin",
              "fieldLabel": "VIN",
              "fieldType": "text",
              "placeholder": "e.g. 1HGCM82633A004352",
              "requiredField": true
            }
          ]
        },
        "responseMode": "lastNode",
        "options": {
          "path": "recall-check",
          "buttonLabel": "Check"
        }
      },
      "id": "fafafee1-2274-4b70-8699-2009ea3edb7c",
      "name": "Ask for the VIN",
      "type": "n8n-nodes-base.formTrigger",
      "typeVersion": 2.6,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "=https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/{{ $json.vin.trim() }}?format=json",
        "options": {}
      },
      "id": "7b2d4f80-51ae-4c63-9208-d3e71a95b6cf",
      "name": "Decode the VIN",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "NHTSA vPIC, no key needed. A VIN holds the make, model and year of the car."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "e2a7c650-9418-4b7d-8f03-1c6b5d294e87",
              "name": "make",
              "value": "={{ $json.Results[0].Make }}",
              "type": "string"
            },
            {
              "id": "bbc99c18-27f2-4ba2-b1a9-5757ca943a57",
              "name": "model",
              "value": "={{ $json.Results[0].Model }}",
              "type": "string"
            },
            {
              "id": "41c83e97-6b05-4d12-a7f8-29e04b6c7d35",
              "name": "year",
              "value": "={{ $json.Results[0].ModelYear }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "88d5107b-3a64-4e29-95c0-7b6e1f08a24d",
      "name": "Keep make, model and year",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        480,
        0
      ]
    },
    {
      "parameters": {
        "url": "=https://api.nhtsa.gov/recalls/recallsByVehicle?make={{ $json.make }}&model={{ $json.model }}&modelYear={{ $json.year }}",
        "options": {}
      },
      "id": "ecddd9cc-faac-4f67-ab0f-63d25adc35a8",
      "name": "Look up the recalls",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        720,
        0
      ],
      "notesInFlow": true,
      "notes": "NHTSA recalls, no key needed. Count tells you how many campaigns there are."
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
              "id": "b7149e52-8c30-4f6a-9d81-05e2c7b3a468",
              "leftValue": "={{ $json.Count }}",
              "rightValue": 0,
              "operator": {
                "type": "number",
                "operation": "gt"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "674a9f83-823e-47d9-9a45-4c2d8b2b5be9",
      "name": "Any open recalls?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        960,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "5d06f3b8-7e14-4902-a6c5-38b71e9d04fa",
              "name": "summary",
              "value": "={{ $json.Count + ' recall campaign(s) found for your ' + $('Keep make, model and year').first().json.year + ' ' + $('Keep make, model and year').first().json.make + ' ' + $('Keep make, model and year').first().json.model + ':\\n\\n' + $json.results.map(recall => recall.NHTSACampaignNumber + ' – ' + recall.Component).join('\\n') + '\\n\\nTake the VIN to any franchised dealer: recall work is free.' }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "19b7c0e4-6d52-4a38-bf91-70c2e5438d16",
      "name": "List the campaigns",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1200,
        -120
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "7a4e2c91-0b68-4d53-98f2-6c0b14e7a53d",
              "name": "summary",
              "value": "={{ 'No open recall campaigns for your ' + $('Keep make, model and year').first().json.year + ' ' + $('Keep make, model and year').first().json.make + ' ' + $('Keep make, model and year').first().json.model + '.' }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "cf9305a7-18b2-4e64-a0d7-5926b4c8137e",
      "name": "Say all clear",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1200,
        120
      ]
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "text",
        "completionTitle": "Recall check",
        "completionMessage": "={{ $json.summary }}"
      },
      "id": "2f81d46c-9507-4a3b-86e1-c40792b5e3a8",
      "name": "Show the answer",
      "type": "n8n-nodes-base.form",
      "typeVersion": 2.5,
      "position": [
        1440,
        0
      ]
    }
  ],
  "connections": {
    "Ask for the VIN": {
      "main": [
        [
          {
            "node": "Decode the VIN",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Decode the VIN": {
      "main": [
        [
          {
            "node": "Keep make, model and year",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Keep make, model and year": {
      "main": [
        [
          {
            "node": "Look up the recalls",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Look up the recalls": {
      "main": [
        [
          {
            "node": "Any open recalls?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Any open recalls?": {
      "main": [
        [
          {
            "node": "List the campaigns",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Say all clear",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "List the campaigns": {
      "main": [
        [
          {
            "node": "Show the answer",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Say all clear": {
      "main": [
        [
          {
            "node": "Show the answer",
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
  "name": "Is It Recalled? – Bonus",
  "nodes": [
    {
      "parameters": {
        "formTitle": "Is it recalled?",
        "formDescription": "Enter the VIN from the windscreen or the registration document.",
        "formFields": {
          "values": [
            {
              "fieldName": "vin",
              "fieldLabel": "VIN",
              "fieldType": "text",
              "placeholder": "e.g. 1HGCM82633A004352",
              "requiredField": true
            }
          ]
        },
        "responseMode": "lastNode",
        "options": {
          "path": "recall-check",
          "buttonLabel": "Check"
        }
      },
      "id": "3c91e7d0-0000-4000-8000-000000000001",
      "name": "Ask for the VIN",
      "type": "n8n-nodes-base.formTrigger",
      "typeVersion": 2.6,
      "position": [
        0,
        -120
      ]
    },
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "weeks",
              "triggerAtDay": 1,
              "triggerAtHour": 7,
              "triggerAtMinute": 0
            }
          ]
        }
      },
      "id": "da8a3663-e4a3-46fd-8291-c1de0f14a14a",
      "name": "Every Monday",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        0,
        160
      ]
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "get",
        "dataTableId": {
          "__rl": true,
          "mode": "list",
          "value": "family-cars",
          "cachedResultName": "family-cars"
        },
        "returnAll": true
      },
      "id": "47e9152b-8c06-4a3d-91f7-b5d0e28c6413",
      "name": "Get the family cars",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        240,
        160
      ],
      "notesInFlow": true,
      "notes": "One row per car, with a vin column."
    },
    {
      "parameters": {
        "url": "=https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/{{ $json.vin.trim() }}?format=json",
        "options": {}
      },
      "id": "7b2d4f80-51ae-4c63-9208-d3e71a95b6cf",
      "name": "Decode the VIN",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        480,
        0
      ],
      "notesInFlow": true,
      "notes": "NHTSA vPIC, no key needed. A VIN holds the make, model and year of the car."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "e2a7c650-9418-4b7d-8f03-1c6b5d294e87",
              "name": "make",
              "value": "={{ $json.Results[0].Make }}",
              "type": "string"
            },
            {
              "id": "95f0b6d3-7c21-4a58-be49-0e7a51a36c84",
              "name": "model",
              "value": "={{ $json.Results[0].Model }}",
              "type": "string"
            },
            {
              "id": "41c83e97-6b05-4d12-a7f8-29e04b6c7d35",
              "name": "year",
              "value": "={{ $json.Results[0].ModelYear }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "88d5107b-3a64-4e29-95c0-7b6e1f08a24d",
      "name": "Keep make, model and year",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        720,
        0
      ]
    },
    {
      "parameters": {
        "url": "=https://api.nhtsa.gov/recalls/recallsByVehicle?make={{ $json.make }}&model={{ $json.model }}&modelYear={{ $json.year }}",
        "options": {}
      },
      "id": "06f7b4e9-2d35-4810-ba67-c519e38b0a4b",
      "name": "Look up the recalls",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        960,
        0
      ],
      "notesInFlow": true,
      "notes": "NHTSA recalls, no key needed. Count tells you how many campaigns there are."
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
              "id": "b7149e52-8c30-4f6a-9d81-05e2c7b3a468",
              "leftValue": "={{ $json.Count }}",
              "rightValue": 0,
              "operator": {
                "type": "number",
                "operation": "gt"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "ca380b7e-4196-4b25-8f07-d6e3091a5247",
      "name": "Any open recalls?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        1200,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "5d06f3b8-7e14-4902-a6c5-38b71e9d04fa",
              "name": "summary",
              "value": "={{ $json.Count + ' recall campaign(s) found for your ' + $('Keep make, model and year').first().json.year + ' ' + $('Keep make, model and year').first().json.make + ' ' + $('Keep make, model and year').first().json.model + ':\\n\\n' + $json.results.map(recall => recall.NHTSACampaignNumber + ' – ' + recall.Component).join('\\n') + '\\n\\nTake the VIN to any franchised dealer: recall work is free.' }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "19b7c0e4-6d52-4a38-bf91-70c2e5438d16",
      "name": "List the campaigns",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1440,
        -120
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "7a4e2c91-0b68-4d53-98f2-6c0b14e7a53d",
              "name": "summary",
              "value": "={{ 'No open recall campaigns for your ' + $('Keep make, model and year').first().json.year + ' ' + $('Keep make, model and year').first().json.make + ' ' + $('Keep make, model and year').first().json.model + '.' }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "cf9305a7-18b2-4e64-a0d7-5926b4c8137e",
      "name": "Say all clear",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1440,
        120
      ]
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "text",
        "completionTitle": "Recall check",
        "completionMessage": "={{ $json.summary }}"
      },
      "id": "2f81d46c-9507-4a3b-86e1-c40792b5e3a8",
      "name": "Show the answer",
      "type": "n8n-nodes-base.form",
      "typeVersion": 2.5,
      "position": [
        1680,
        -120
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://ntfy.sh/n8n-recalls-REPLACE-ME",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Title",
              "value": "Recall check"
            },
            {
              "name": "Tags",
              "value": "car"
            }
          ]
        },
        "sendBody": true,
        "contentType": "raw",
        "rawContentType": "text/plain",
        "body": "={{ $json.summary }}",
        "options": {}
      },
      "id": "d86f9523-1a28-4072-b3fe-080808c040a7",
      "name": "Send the weekly result",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        1680,
        140
      ],
      "notesInFlow": true,
      "notes": "Replace the topic with your own hard-to-guess name, then open https://ntfy.sh/<topic> in a browser or the ntfy app."
    }
  ],
  "connections": {
    "Ask for the VIN": {
      "main": [
        [
          {
            "node": "Decode the VIN",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Every Monday": {
      "main": [
        [
          {
            "node": "Get the family cars",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the family cars": {
      "main": [
        [
          {
            "node": "Decode the VIN",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Decode the VIN": {
      "main": [
        [
          {
            "node": "Keep make, model and year",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Keep make, model and year": {
      "main": [
        [
          {
            "node": "Look up the recalls",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Look up the recalls": {
      "main": [
        [
          {
            "node": "Any open recalls?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Any open recalls?": {
      "main": [
        [
          {
            "node": "List the campaigns",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Say all clear",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "List the campaigns": {
      "main": [
        [
          {
            "node": "Show the answer",
            "type": "main",
            "index": 0
          },
          {
            "node": "Send the weekly result",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Say all clear": {
      "main": [
        [
          {
            "node": "Show the answer",
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
Is It Recalled?

## Summary
Type in a car's VIN and find out in seconds whether the manufacturer has open safety recalls on it.

## Concept
Chaining two API calls, where the answer from the first one builds the second

## Glossary
- VIN: The 17-character serial number of a car, printed at the bottom of the windscreen and in the registration document. It encodes the make, model and year.
- safety recall: A free repair a manufacturer must offer when a fault could hurt someone. In the United States it never expires and any franchised dealer must do it.
- API: A web address that returns data for programs instead of a page for people. Here one decodes the VIN and another lists the recalls.
- campaign number: The reference a recall is filed under, such as 19V182000. Quote it at the dealer and they know exactly which repair you mean.
- n8n Form: A web form n8n hosts for you. The first node collects the answers and a last node shows the result page.

## Scenario
- A workshop that wants to check a car before it goes on the ramp, without logging into three portals.
- Anyone buying a used car who would rather find out about an unfixed airbag before paying.
- Any lookup where one answer has to be taken apart before the next question can be asked.

## Task
Let someone enter a car's VIN and tell them whether it has open safety recalls, with enough detail to take to a garage.

## Bonus Task
Check the whole family's cars once a week without anyone filling in the form, and send the result as a message.

## Nodes
- n8n Form Trigger
- Schedule Trigger
- Data Table
- HTTP Request
- Edit Fields (Set)
- IF
- n8n Form

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account is needed.
- Both services come from the US road safety regulator and need no key: the [vPIC VIN decoder](https://vpic.nhtsa.dot.gov/api/) and the [NHTSA recalls API](https://www.nhtsa.gov/nhtsa-datasets-and-apis). They cover cars sold in the United States, so use a US VIN to test.
- Try it with 1HGCM82633A004352, a 2003 Honda Accord. On 9 October 2026 it returned 24 recall campaigns, most of them Takata airbag inflators.
- For the bonus, create a [Data Table](https://docs.n8n.io/data/data-tables/) called family-cars with a text column vin and one row per car, and set up [ntfy.sh](https://ntfy.sh/) with a hard-to-guess topic name to receive the weekly message. No account is needed.

## Requirements
- Entering a VIN in the form shows an answer in the browser naming the year, make and model that the VIN decoded to.
- When the car has open recalls, the answer lists each campaign number with the affected component; when it has none, it says so plainly instead of showing an empty list.
- The VIN 1HGCM82633A004352 is recognised as a 2003 Honda Accord and reports its recall campaigns. Bonus: the same checks run weekly for every car in the Data Table and arrive as a message.

## Tips
- Start with n8n Form Trigger with a single required text field called vin, and set Respond When to Using Last Node so the last node can show the result.
- Add HTTP Request to https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/{{ $json.vin.trim() }}?format=json. DecodeVinValues returns one flat row in Results[0], which is much easier to read than the plain DecodeVin variant.
- Add Edit Fields (Set) to keep only Make, Model and ModelYear from Results[0]. The recalls API is picky: it wants exactly these three values, so look at what the decoder returned before moving on.
- Add the second HTTP Request to https://api.nhtsa.gov/recalls/recallsByVehicle?make={{ $json.make }}&model={{ $json.model }}&modelYear={{ $json.year }}, then IF on Count greater than 0 – a car with no recalls returns Count 0 and an empty results list, which would otherwise produce a confusing empty answer.
- Build the text on both branches with Edit Fields (Set), using $json.results.map(recall => recall.NHTSACampaignNumber + ' – ' + recall.Component).join('\n') on the true side, and finish with n8n Form in Completion mode. For the bonus, add Schedule Trigger every Monday and Data Table with Get Row(s) in front of the same Decode the VIN node, and send the summary with HTTP Request.

# Spanish

## Title
¿Está llamado a revisión?

## Summary
Escribe el VIN de un coche y averigua en segundos si el fabricante tiene revisiones de seguridad abiertas sobre él.

## Concept
Encadenar dos llamadas a API, donde la respuesta de la primera construye la segunda

## Glossary
- VIN: El número de bastidor de 17 caracteres de un coche, impreso en la parte baja del parabrisas y en el permiso de circulación. Codifica la marca, el modelo y el año.
- revisión de seguridad: Una reparación gratuita que el fabricante debe ofrecer cuando un fallo puede hacer daño. En Estados Unidos no caduca y cualquier concesionario oficial está obligado a hacerla.
- API: Una dirección web que devuelve datos para programas en lugar de una página para personas. Aquí una descodifica el VIN y otra lista las revisiones.
- número de campaña: La referencia con la que se registra una revisión, como 19V182000. Dásela al taller y sabrán exactamente de qué reparación hablas.
- n8n Form: Un formulario web que aloja n8n. El primer nodo recoge las respuestas y un último nodo muestra la página de resultado.

## Scenario
- Un taller que quiere comprobar un coche antes de subirlo al elevador, sin entrar en tres portales.
- Cualquiera que compre un coche de segunda mano y prefiera enterarse de un airbag sin reparar antes de pagar.
- Cualquier consulta en la que haya que desmontar una respuesta antes de poder hacer la siguiente pregunta.

## Task
Deja que alguien introduzca el VIN de un coche y dile si tiene revisiones de seguridad abiertas, con detalle suficiente para llevarlo al taller.

## Bonus Task
Revisa los coches de toda la familia una vez por semana sin que nadie rellene el formulario, y envía el resultado como mensaje.

## Nodes
- n8n Form Trigger
- Schedule Trigger
- Data Table
- HTTP Request
- Edit Fields (Set)
- IF
- n8n Form

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta.
- Los dos servicios son del regulador de seguridad vial de Estados Unidos y no necesitan clave: el [descodificador de VIN vPIC](https://vpic.nhtsa.dot.gov/api/) y la [API de revisiones de la NHTSA](https://www.nhtsa.gov/nhtsa-datasets-and-apis). Cubren coches vendidos en Estados Unidos, así que prueba con un VIN estadounidense.
- Pruébalo con 1HGCM82633A004352, un Honda Accord de 2003. El 9 de octubre de 2026 devolvía 24 campañas de revisión, casi todas de infladores de airbag Takata.
- Para el bonus, crea una [Data Table](https://docs.n8n.io/data/data-tables/) llamada family-cars con una columna de texto vin y una fila por coche, y configura [ntfy.sh](https://ntfy.sh/) con un nombre de tema difícil de adivinar para recibir el mensaje semanal. No hace falta cuenta.

## Requirements
- Al introducir un VIN en el formulario aparece en el navegador una respuesta con el año, la marca y el modelo a los que corresponde ese VIN.
- Si el coche tiene revisiones abiertas, la respuesta lista cada número de campaña con el componente afectado; si no tiene ninguna, lo dice con claridad en vez de mostrar una lista vacía.
- El VIN 1HGCM82633A004352 se reconoce como un Honda Accord de 2003 y muestra sus campañas de revisión. Bonus: las mismas comprobaciones se ejecutan cada semana para todos los coches de la Data Table y llegan como mensaje.

## Tips
- Empieza con n8n Form Trigger con un único campo de texto obligatorio llamado vin y pon Respond When en Using Last Node para que el último nodo pueda mostrar el resultado.
- Añade HTTP Request a https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/{{ $json.vin.trim() }}?format=json. DecodeVinValues devuelve una única fila plana en Results[0], mucho más fácil de leer que la variante DecodeVin.
- Añade Edit Fields (Set) para quedarte solo con Make, Model y ModelYear de Results[0]. La API de revisiones es quisquillosa: quiere exactamente esos tres valores, así que mira lo que devolvió el descodificador antes de seguir.
- Añade el segundo HTTP Request a https://api.nhtsa.gov/recalls/recallsByVehicle?make={{ $json.make }}&model={{ $json.model }}&modelYear={{ $json.year }} y después IF con Count mayor que 0: un coche sin revisiones devuelve Count 0 y una lista results vacía, que si no daría una respuesta confusa.
- Escribe el texto en las dos ramas con Edit Fields (Set), usando $json.results.map(recall => recall.NHTSACampaignNumber + ' – ' + recall.Component).join('\n') en la rama true, y termina con n8n Form en modo Completion. Para el bonus, añade Schedule Trigger cada lunes y Data Table con Get Row(s) delante del mismo nodo Decode the VIN, y envía el resumen con HTTP Request.

# Ukrainian

## Title
Чи є відкликання?

## Summary
Введи VIN автомобіля і за кілька секунд дізнайся, чи має виробник відкриті кампанії з безпеки саме для нього.

## Concept
Ланцюжок із двох викликів API, де відповідь першого будує другий

## Glossary
- VIN: 17-символьний номер кузова автомобіля, нанесений унизу лобового скла та вказаний у техпаспорті. У ньому закодовані марка, модель і рік.
- відкликання з міркувань безпеки: Безкоштовний ремонт, який виробник зобов'язаний запропонувати, коли несправність може нашкодити людям. У США воно не має терміну давності, і будь-який офіційний дилер мусить його виконати.
- API: Вебадреса, яка повертає дані для програм замість сторінки для людей. Тут одна розшифровує VIN, а інша перелічує відкликання.
- номер кампанії: Позначення, під яким зареєстровано відкликання, наприклад 19V182000. Назви його на сервісі – і там точно зрозуміють, про який ремонт ідеться.
- n8n Form: Вебформа, яку розміщує n8n. Перша нода збирає відповіді, а остання показує сторінку результату.

## Scenario
- Майстерня, яка хоче перевірити авто ще до підйомника, не заходячи на три різні портали.
- Той, хто купує вживане авто і хоче дізнатися про невідремонтовану подушку безпеки до того, як заплатить.
- Будь-який пошук, де одну відповідь треба розібрати, перш ніж поставити наступне запитання.

## Task
Дай людині ввести VIN автомобіля і скажи, чи є для нього відкриті відкликання з міркувань безпеки, з достатніми подробицями, щоб поїхати з ними на сервіс.

## Bonus Task
Перевіряй усі родинні автомобілі раз на тиждень без того, щоб хтось заповнював форму, і надсилай результат повідомленням.

## Nodes
- n8n Form Trigger
- Schedule Trigger
- Data Table
- HTTP Request
- Edit Fields (Set)
- IF
- n8n Form

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів не потрібно.
- Обидва сервіси належать американському регулятору безпеки доріг і не потребують ключа: [декодер VIN vPIC](https://vpic.nhtsa.dot.gov/api/) та [API відкликань NHTSA](https://www.nhtsa.gov/nhtsa-datasets-and-apis). Вони охоплюють автомобілі, продані у США, тож для перевірки бери американський VIN.
- Спробуй із 1HGCM82633A004352 – це Honda Accord 2003 року. 9 жовтня 2026 року запит повертав 24 кампанії відкликання, здебільшого через газогенератори подушок Takata.
- Для бонусу створи [Data Table](https://docs.n8n.io/data/data-tables/) під назвою family-cars із текстовою колонкою vin і одним рядком на авто, а також налаштуй [ntfy.sh](https://ntfy.sh/) з назвою теми, яку важко вгадати, щоб отримувати щотижневе повідомлення. Акаунт не потрібен.

## Requirements
- Після введення VIN у форму в браузері з'являється відповідь із роком, маркою та моделлю, які розшифрував цей VIN.
- Якщо в авто є відкриті відкликання, у відповіді перелічено кожен номер кампанії з несправним вузлом; якщо їх немає, про це сказано прямо, а не показано порожній список.
- VIN 1HGCM82633A004352 розпізнається як Honda Accord 2003 року й показує свої кампанії відкликання. Бонус: ті самі перевірки щотижня відбуваються для кожного авто з Data Table і надходять повідомленням.

## Tips
- Почни з n8n Form Trigger з одним обов'язковим текстовим полем vin і постав Respond When на Using Last Node, щоб остання нода могла показати результат.
- Додай HTTP Request на https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/{{ $json.vin.trim() }}?format=json. DecodeVinValues повертає один плаский рядок у Results[0], що читати значно простіше, ніж варіант DecodeVin.
- Додай Edit Fields (Set), щоб залишити лише Make, Model і ModelYear із Results[0]. API відкликань прискіпливий: йому потрібні саме ці три значення, тож спершу подивися, що повернув декодер.
- Додай другий HTTP Request на https://api.nhtsa.gov/recalls/recallsByVehicle?make={{ $json.make }}&model={{ $json.model }}&modelYear={{ $json.year }}, а потім IF з умовою Count більше за 0: авто без відкликань повертає Count 0 і порожній список results, який інакше дав би незрозумілу відповідь.
- Склади текст на обох гілках через Edit Fields (Set), використавши $json.results.map(recall => recall.NHTSACampaignNumber + ' – ' + recall.Component).join('\n') на гілці true, і заверши нодою n8n Form у режимі Completion. Для бонусу додай Schedule Trigger щопонеділка і Data Table з Get Row(s) перед тією самою нодою Decode the VIN, а підсумок надішли через HTTP Request.
