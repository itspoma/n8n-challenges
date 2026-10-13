---
number: 25
slug: url-shortener
collection: more
difficulty: advanced
time: 30–40 min
complexity: 4
color: #fffdf6
ink: #1b2427
---

# Solution Data

Internal reference for the solution viewer. This section is not displayed on the challenge page.

## Core Workflow JSON (without bonus)

```json
{
  "name": "Your Own URL Shortener – Core",
  "nodes": [
    {
      "parameters": {
        "formTitle": "New short link",
        "formDescription": "Paste a long address and get a short one back.",
        "formFields": {
          "values": [
            {
              "fieldName": "target",
              "fieldLabel": "Long address",
              "fieldType": "text",
              "placeholder": "https://example.com/a/very/long/path",
              "requiredField": true
            }
          ]
        },
        "responseMode": "lastNode",
        "options": {
          "path": "new-link",
          "buttonLabel": "Shorten"
        }
      },
      "id": "8c1f5a30-6274-4e09-b8d5-13a7026ce94f",
      "name": "Ask for the long address",
      "type": "n8n-nodes-base.formTrigger",
      "typeVersion": 2.6,
      "position": [
        0,
        -200
      ]
    },
    {
      "parameters": {
        "action": "generate",
        "dataPropertyName": "code",
        "encodingType": "hex",
        "stringLength": 6
      },
      "id": "2f74e9b8-0c51-4a63-9e82-47d0b5916a3c",
      "name": "Make a random code",
      "type": "n8n-nodes-base.crypto",
      "typeVersion": 1,
      "position": [
        240,
        -200
      ],
      "notesInFlow": true,
      "notes": "Six hex characters. Long enough that nobody guesses someone else's link."
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "insert",
        "dataTableId": {
          "__rl": true,
          "mode": "list",
          "value": "short-links",
          "cachedResultName": "short-links"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "code": "={{ $json.code }}",
            "target": "={{ $('Ask for the long address').item.json.target }}",
            "clicks": 0
          }
        }
      },
      "id": "a90d3e16-5b47-4c28-81f0-6e2975c4bd03",
      "name": "Save the link",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        480,
        -200
      ]
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "text",
        "completionTitle": "Your short link",
        "completionMessage": "={{ 'Share this: ' + $json.code + '\\n\\nIt points at ' + $json.target }}"
      },
      "id": "c5802b4a-9376-4ed1-a06b-28f14e73905c",
      "name": "Show the short link",
      "type": "n8n-nodes-base.form",
      "typeVersion": 2.5,
      "position": [
        720,
        -200
      ]
    },
    {
      "parameters": {
        "httpMethod": "GET",
        "path": "s/:code",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "eb8d4ae9-6b40-4ae1-b9dc-aa7ce719e4aa",
      "name": "Open a short link",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [
        0,
        120
      ],
      "notesInFlow": true,
      "notes": "The colon makes :code a route parameter, readable as $json.params.code."
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "get",
        "dataTableId": {
          "__rl": true,
          "mode": "list",
          "value": "short-links",
          "cachedResultName": "short-links"
        },
        "filters": {
          "conditions": [
            {
              "keyName": "code",
              "condition": "eq",
              "keyValue": "={{ $json.params.code }}"
            }
          ]
        },
        "returnAll": false,
        "limit": 1
      },
      "id": "47b0c592-8163-4de7-9a40-05fc2e18763b",
      "name": "Find the code",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        240,
        120
      ],
      "alwaysOutputData": true,
      "notesInFlow": true,
      "notes": "Always Output Data is on, so an unknown code still produces an item to decide on."
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "loose",
            "version": 2
          },
          "conditions": [
            {
              "id": "d3185e06-9427-4c7b-8a15-62f0947be3c1",
              "leftValue": "={{ $json.target }}",
              "rightValue": "",
              "operator": {
                "type": "string",
                "operation": "exists",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "f7206b84-1e39-45ca-b0d7-9348e71c5260",
      "name": "Do we know this code?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        480,
        120
      ]
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "update",
        "dataTableId": {
          "__rl": true,
          "mode": "list",
          "value": "short-links",
          "cachedResultName": "short-links"
        },
        "filters": {
          "conditions": [
            {
              "keyName": "code",
              "condition": "eq",
              "keyValue": "={{ $json.code }}"
            }
          ]
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "clicks": "={{ $json.clicks + 1 }}"
          }
        }
      },
      "id": "ef67106e-fcd0-4929-b35f-86102de655b9",
      "name": "Count the click",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        720,
        20
      ]
    },
    {
      "parameters": {
        "respondWith": "redirect",
        "redirectURL": "={{ $json.target }}",
        "options": {
          "responseCode": 302
        }
      },
      "id": "eb411905-fd04-4e07-89d8-78cd21b2fe34",
      "name": "Send them on",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.5,
      "position": [
        960,
        20
      ],
      "notesInFlow": true,
      "notes": "Set 302. Adding the Response Code option pre-fills 200, which sends no redirect at all."
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "That short link does not exist.",
        "options": {
          "responseCode": 404
        }
      },
      "id": "cf585040-32ea-4106-b3f4-a5f207c41e99",
      "name": "Unknown code",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.5,
      "position": [
        720,
        240
      ]
    }
  ],
  "connections": {
    "Ask for the long address": {
      "main": [
        [
          {
            "node": "Make a random code",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Make a random code": {
      "main": [
        [
          {
            "node": "Save the link",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Save the link": {
      "main": [
        [
          {
            "node": "Show the short link",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Open a short link": {
      "main": [
        [
          {
            "node": "Find the code",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Find the code": {
      "main": [
        [
          {
            "node": "Do we know this code?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Do we know this code?": {
      "main": [
        [
          {
            "node": "Count the click",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Unknown code",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Count the click": {
      "main": [
        [
          {
            "node": "Send them on",
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
  "name": "Your Own URL Shortener – Bonus",
  "nodes": [
    {
      "parameters": {
        "authentication": "basicAuth",
        "formTitle": "New short link",
        "formDescription": "Paste a long address and get a short one back.",
        "formFields": {
          "values": [
            {
              "fieldName": "target",
              "fieldLabel": "Long address",
              "fieldType": "text",
              "placeholder": "https://example.com/a/very/long/path",
              "requiredField": true
            }
          ]
        },
        "responseMode": "lastNode",
        "options": {
          "path": "new-link",
          "buttonLabel": "Shorten"
        }
      },
      "id": "8c1f5a30-6274-4e09-b8d5-13a7026ce94f",
      "name": "Ask for the long address",
      "type": "n8n-nodes-base.formTrigger",
      "typeVersion": 2.6,
      "position": [
        0,
        -220
      ],
      "notesInFlow": true,
      "notes": "Basic auth: only your team can make links. Opening a link stays public."
    },
    {
      "parameters": {
        "action": "generate",
        "dataPropertyName": "code",
        "encodingType": "hex",
        "stringLength": 6
      },
      "id": "2f74e9b8-0c51-4a63-9e82-47d0b5916a3c",
      "name": "Make a random code",
      "type": "n8n-nodes-base.crypto",
      "typeVersion": 1,
      "position": [
        240,
        -220
      ],
      "notesInFlow": true,
      "notes": "Six hex characters. Long enough that nobody guesses someone else's link."
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "insert",
        "dataTableId": {
          "__rl": true,
          "mode": "list",
          "value": "short-links",
          "cachedResultName": "short-links"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "code": "={{ $json.code }}",
            "target": "={{ $('Ask for the long address').item.json.target }}",
            "clicks": 0
          }
        }
      },
      "id": "a90d3e16-5b47-4c28-81f0-6e2975c4bd03",
      "name": "Save the link",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        480,
        -220
      ]
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "text",
        "completionTitle": "Your short link",
        "completionMessage": "={{ 'Share this: ' + $json.code + '\\n\\nIt points at ' + $json.target }}"
      },
      "id": "c5802b4a-9376-4ed1-a06b-28f14e73905c",
      "name": "Show the short link",
      "type": "n8n-nodes-base.form",
      "typeVersion": 2.5,
      "position": [
        720,
        -220
      ]
    },
    {
      "parameters": {
        "httpMethod": "GET",
        "path": "s/:code",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "61e74a30-2d08-4b95-a7c3-f05916e24ab1",
      "name": "Open a short link",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [
        0,
        100
      ],
      "notesInFlow": true,
      "notes": "The colon makes :code a route parameter, readable as $json.params.code."
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "get",
        "dataTableId": {
          "__rl": true,
          "mode": "list",
          "value": "short-links",
          "cachedResultName": "short-links"
        },
        "filters": {
          "conditions": [
            {
              "keyName": "code",
              "condition": "eq",
              "keyValue": "={{ $json.params.code }}"
            }
          ]
        },
        "returnAll": false,
        "limit": 1
      },
      "id": "47b0c592-8163-4de7-9a40-05fc2e18763b",
      "name": "Find the code",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        240,
        100
      ],
      "alwaysOutputData": true,
      "notesInFlow": true,
      "notes": "Always Output Data is on, so an unknown code still produces an item to decide on."
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "loose",
            "version": 2
          },
          "conditions": [
            {
              "id": "d3185e06-9427-4c7b-8a15-62f0947be3c1",
              "leftValue": "={{ $json.target }}",
              "rightValue": "",
              "operator": {
                "type": "string",
                "operation": "exists",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "f7206b84-1e39-45ca-b0d7-9348e71c5260",
      "name": "Do we know this code?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        480,
        100
      ]
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "update",
        "dataTableId": {
          "__rl": true,
          "mode": "list",
          "value": "short-links",
          "cachedResultName": "short-links"
        },
        "filters": {
          "conditions": [
            {
              "keyName": "code",
              "condition": "eq",
              "keyValue": "={{ $json.code }}"
            }
          ]
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "clicks": "={{ $json.clicks + 1 }}"
          }
        }
      },
      "id": "0b63f7a2-4a71-4d85-9c20-e3716f0a845d",
      "name": "Count the click",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        720,
        0
      ]
    },
    {
      "parameters": {
        "respondWith": "redirect",
        "redirectURL": "={{ $json.target }}",
        "options": {
          "responseCode": 302
        }
      },
      "id": "85c20a7e-6d14-4932-b7f8-401e9c37b5ad",
      "name": "Send them on",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.5,
      "position": [
        960,
        0
      ],
      "notesInFlow": true,
      "notes": "Set 302. Adding the Response Code option pre-fills 200, which sends no redirect at all."
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "That short link does not exist.",
        "options": {
          "responseCode": 404
        }
      },
      "id": "1d9f4c80-3b26-4e57-a6b1-72056bc9e418",
      "name": "Unknown code",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.5,
      "position": [
        720,
        220
      ]
    },
    {
      "parameters": {
        "httpMethod": "GET",
        "path": "link-stats",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "30fa671c-8e45-4209-bd63-5107ae942f8b",
      "name": "Ask for the stats",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [
        0,
        420
      ]
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "get",
        "dataTableId": {
          "__rl": true,
          "mode": "list",
          "value": "short-links",
          "cachedResultName": "short-links"
        },
        "returnAll": true,
        "orderBy": true,
        "orderByColumn": "clicks",
        "orderByDirection": "DESC"
      },
      "id": "9e2ca40d-7351-4b86-82f9-6c05d13ba74e",
      "name": "Every link, most clicked first",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        240,
        420
      ]
    },
    {
      "parameters": {
        "respondWith": "allIncomingItems",
        "options": {}
      },
      "id": "5741be03-92d8-4c17-ae60-83f05291c64a",
      "name": "Return the stats",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.5,
      "position": [
        480,
        420
      ]
    }
  ],
  "connections": {
    "Ask for the long address": {
      "main": [
        [
          {
            "node": "Make a random code",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Make a random code": {
      "main": [
        [
          {
            "node": "Save the link",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Save the link": {
      "main": [
        [
          {
            "node": "Show the short link",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Open a short link": {
      "main": [
        [
          {
            "node": "Find the code",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Find the code": {
      "main": [
        [
          {
            "node": "Do we know this code?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Do we know this code?": {
      "main": [
        [
          {
            "node": "Count the click",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Unknown code",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Count the click": {
      "main": [
        [
          {
            "node": "Send them on",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Ask for the stats": {
      "main": [
        [
          {
            "node": "Every link, most clicked first",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Every link, most clicked first": {
      "main": [
        [
          {
            "node": "Return the stats",
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
Your Own URL Shortener

## Summary
Build a working link shortener in n8n: a form that makes short links, and a web address that redirects and counts every click.

## Concept
Serving real web requests with route parameters, a redirect and stored state

## Glossary
- route parameter: A changing piece of a web address. Writing the path as s/:code means anything after s/ arrives in the workflow as params.code.
- redirect: An answer that tells the browser "the thing you want is over there". The browser then loads the other address on its own.
- 302: The redirect code for a temporary move. 307 keeps the original request method, and 200 is not a redirect at all – it tells the browser the response is the page.
- Data Table: A table that lives inside n8n and keeps its rows between runs, so the links and their click counts survive every execution.
- Always Output Data: A node setting that produces an empty item when a lookup finds nothing, so the workflow can answer "unknown code" instead of stopping.

## Scenario
- A team printing posters with a QR code who want to know which poster actually got scanned.
- A newsletter with three links, where the only question that matters is which one people clicked.
- Any small service that has to answer a real web request rather than only process data in the background.

## Task
Make short links for our posters and count how many people click each one. An unknown link should say so politely rather than break.

## Bonus Task
Add a stats address that lists every link with its click count, most clicked first, and lock the link-making form so only your team can create new ones.

## Nodes
- n8n Form Trigger
- Crypto
- Data Table
- n8n Form
- Webhook
- IF
- Respond to Webhook

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account is needed, and nothing is sent anywhere.
- Create a [Data Table](https://docs.n8n.io/data/data-tables/) called short-links with three columns: code and target as text, and clicks as a number.
- This challenge only works once the workflow is published: test webhook URLs stop listening after one call, while the production URL stays up. Publish first, then try the links.
- Keep the n8n [Webhook node documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) open – the difference between the test and production URL trips up almost everyone the first time.

## Requirements
- Submitting a long address in the form returns a short code, and the link, the target and a click count of zero are stored in the Data Table.
- Opening the short address in a browser lands on the long address, and the click count for that code goes up by exactly one per visit.
- An address with a code nobody created answers "that short link does not exist" with a 404, and no row is touched. Bonus: the stats address lists every link, most clicked first, and the creation form asks for a username and password.

## Tips
- Build the making half first: n8n Form Trigger with one required field for the long address, then Crypto with the action Generate, writing six hex characters into a field called code – random enough that nobody guesses a colleague's link.
- Store it with Data Table using Insert: code, the target from $('Ask for the long address').item.json.target, and clicks set to 0. Finish that half with n8n Form in Completion mode showing the new code.
- Now the opening half. Add a Webhook node with the method GET and the path s/:code. The colon turns that part of the address into a route parameter, and the workflow reads it as $json.params.code. Set Respond to Using Respond to Webhook Node.
- Look the code up with Data Table Get Row(s) filtered on code, and switch on Always Output Data in that node's settings – without it an unknown code produces nothing at all and the workflow simply stops, instead of answering 404. Then IF on whether target exists.
- Count the click with Data Table Update before you answer, so the visitor is not waiting on a write, then Respond to Webhook with Redirect. Watch the trap: Redirect defaults to 307, and the moment you add the Response Code option it pre-fills 200, which sends no redirect at all – set it to 302. For the bonus, add a second Webhook on link-stats that reads every row sorted by clicks and answers with All Incoming Items, and set the form trigger's Authentication to Basic Auth.

# Spanish

## Title
Tu propio acortador de enlaces

## Summary
Monta un acortador de enlaces funcionando en n8n: un formulario que crea enlaces cortos y una dirección que redirige y cuenta cada clic.

## Concept
Atender peticiones web reales con parámetros de ruta, una redirección y estado guardado

## Glossary
- parámetro de ruta: Una parte variable de una dirección web. Si escribes la ruta como s/:code, lo que venga después de s/ llega al workflow como params.code.
- redirección: Una respuesta que le dice al navegador «lo que buscas está allí». El navegador carga entonces la otra dirección por su cuenta.
- 302: El código de redirección temporal. El 307 mantiene el método de la petición original y el 200 no es una redirección: le dice al navegador que la respuesta es la página.
- Data Table: Una tabla que vive dentro de n8n y conserva sus filas entre ejecuciones, así que los enlaces y sus clics sobreviven a cada ejecución.
- Always Output Data: Un ajuste del nodo que genera un ítem vacío cuando una búsqueda no encuentra nada, para que el workflow pueda responder «código desconocido» en vez de pararse.

## Scenario
- Un equipo que imprime carteles con código QR y quiere saber qué cartel se escaneó de verdad.
- Una newsletter con tres enlaces, donde la única pregunta que importa es en cuál hizo clic la gente.
- Cualquier servicio pequeño que tenga que responder a una petición web real y no solo procesar datos en segundo plano.

## Task
Crea enlaces cortos para nuestros carteles y cuenta cuánta gente hace clic en cada uno. Un enlace desconocido debe decirlo con educación en vez de romperse.

## Bonus Task
Añade una dirección de estadísticas que liste todos los enlaces con sus clics, de más a menos, y protege el formulario para que solo tu equipo pueda crear enlaces.

## Nodes
- n8n Form Trigger
- Crypto
- Data Table
- n8n Form
- Webhook
- IF
- Respond to Webhook

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta y no se envía nada a ningún sitio.
- Crea una [Data Table](https://docs.n8n.io/data/data-tables/) llamada short-links con tres columnas: code y target como texto y clicks como número.
- Este reto solo funciona con el workflow publicado: las URL de prueba del webhook dejan de escuchar tras una llamada, mientras que la de producción sigue activa. Publica primero y prueba después.
- Ten a mano la [documentación del nodo Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/): la diferencia entre la URL de prueba y la de producción hace tropezar a casi todo el mundo la primera vez.

## Requirements
- Al enviar una dirección larga en el formulario se devuelve un código corto, y el enlace, su destino y un contador de clics a cero quedan guardados en la Data Table.
- Al abrir la dirección corta en el navegador se llega a la dirección larga, y el contador de ese código sube exactamente uno por visita.
- Una dirección con un código que nadie creó responde «ese enlace corto no existe» con un 404 y no toca ninguna fila. Bonus: la dirección de estadísticas lista todos los enlaces de más a menos clics y el formulario pide usuario y contraseña.

## Tips
- Monta primero la mitad que crea enlaces: n8n Form Trigger con un campo obligatorio para la dirección larga y después Crypto con la acción Generate, escribiendo seis caracteres hexadecimales en un campo code, lo bastante aleatorios para que nadie adivine el enlace de otra persona.
- Guárdalo con Data Table en modo Insert: code, el target desde $('Ask for the long address').item.json.target y clicks a 0. Cierra esa mitad con n8n Form en modo Completion mostrando el código nuevo.
- Ahora la mitad que abre enlaces. Añade un nodo Webhook con método GET y ruta s/:code. Los dos puntos convierten esa parte de la dirección en un parámetro de ruta y el workflow lo lee como $json.params.code. Pon Respond en Using Respond to Webhook Node.
- Busca el código con Data Table Get Row(s) filtrando por code y activa Always Output Data en los ajustes de ese nodo: sin eso, un código desconocido no produce nada y el workflow simplemente se para en vez de responder 404. Después un IF sobre si target existe.
- Cuenta el clic con Data Table Update antes de responder, para que quien visita no espere a una escritura, y termina con Respond to Webhook en Redirect. Ojo con la trampa: Redirect usa 307 por defecto y, en cuanto añades la opción Response Code, se rellena con 200, que no redirige nada; ponlo en 302. Para el bonus, añade un segundo Webhook en link-stats que lea todas las filas ordenadas por clicks y responda con All Incoming Items, y pon Authentication del form trigger en Basic Auth.

# Ukrainian

## Title
Власний скорочувач посилань

## Summary
Побудуй у n8n робочий скорочувач посилань: форму, яка створює короткі лінки, і адресу, яка перенаправляє та рахує кожен клік.

## Concept
Обробка справжніх вебзапитів із параметрами маршруту, перенаправленням і збереженим станом

## Glossary
- параметр маршруту: Змінна частина вебадреси. Якщо записати шлях як s/:code, усе після s/ потрапляє у воркфлоу як params.code.
- перенаправлення: Відповідь, яка каже браузеру: «те, що ти шукаєш, он там». Далі браузер сам завантажує іншу адресу.
- 302: Код тимчасового перенаправлення. 307 зберігає метод початкового запиту, а 200 – це взагалі не перенаправлення: він каже браузеру, що відповідь і є сторінкою.
- Data Table: Таблиця, яка живе всередині n8n і зберігає рядки між запусками, тож посилання та їхні лічильники переживають кожне виконання.
- Always Output Data: Налаштування ноди, яке створює порожній елемент, коли пошук нічого не знайшов, щоб воркфлоу міг відповісти «невідомий код», а не спинитися.

## Scenario
- Команда, яка друкує плакати з QR-кодом і хоче знати, який плакат справді сканували.
- Розсилка з трьома посиланнями, де єдине важливе питання – на яке з них клікали.
- Будь-який невеликий сервіс, який має відповідати на справжній вебзапит, а не лише обробляти дані у фоні.

## Task
Створюй короткі посилання для наших плакатів і рахуй, скільки людей клікає на кожне. Невідоме посилання має про це ввічливо сказати, а не зламатися.

## Bonus Task
Додай адресу зі статистикою, яка перелічує всі посилання з кількістю кліків від найбільшої, і закрий форму створення, щоб нові лінки робила лише твоя команда.

## Nodes
- n8n Form Trigger
- Crypto
- Data Table
- n8n Form
- Webhook
- IF
- Respond to Webhook

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів не потрібно, і нікуди нічого не надсилається.
- Створи [Data Table](https://docs.n8n.io/data/data-tables/) під назвою short-links із трьома колонками: code і target як текст, clicks як число.
- Це завдання працює лише з опублікованим воркфлоу: тестові URL вебхука перестають слухати після одного виклику, а продакшн-адреса лишається доступною. Спершу опублікуй, потім перевіряй посилання.
- Тримай поруч [документацію ноди Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/): різниця між тестовою та продакшн-адресою першого разу збиває майже всіх.

## Requirements
- Після надсилання довгої адреси у формі повертається короткий код, а посилання, його ціль і лічильник кліків із нулем зберігаються в Data Table.
- Відкриття короткої адреси у браузері приводить на довгу адресу, а лічильник кліків цього коду зростає рівно на одиницю за відвідування.
- Адреса з кодом, якого ніхто не створював, відповідає «такого короткого посилання не існує» з кодом 404 і не чіпає жодного рядка. Бонус: адреса статистики перелічує всі посилання від найбільш клікнутих, а форма створення запитує імʼя користувача та пароль.

## Tips
- Спершу збери половину, яка створює посилання: n8n Form Trigger з одним обовʼязковим полем для довгої адреси, далі Crypto з дією Generate, що записує шість шістнадцяткових символів у поле code – достатньо випадкових, щоб ніхто не вгадав чуже посилання.
- Збережи це через Data Table в режимі Insert: code, target із $('Ask for the long address').item.json.target і clicks зі значенням 0. Заверши цю половину нодою n8n Form у режимі Completion, яка показує новий код.
- Тепер половина, яка відкриває посилання. Додай ноду Webhook із методом GET і шляхом s/:code. Двокрапка перетворює цю частину адреси на параметр маршруту, і воркфлоу читає його як $json.params.code. Постав Respond на Using Respond to Webhook Node.
- Знайди код через Data Table Get Row(s) із фільтром за code і увімкни Always Output Data в налаштуваннях цієї ноди: без цього невідомий код не дає нічого, і воркфлоу просто спиняється замість відповіді 404. Далі IF на те, чи існує target.
- Порахуй клік через Data Table Update ще до відповіді, щоб відвідувач не чекав на запис, і заверши нодою Respond to Webhook у режимі Redirect. Увага на пастку: Redirect типово використовує 307, а щойно додаєш опцію Response Code, вона підставляє 200, який не перенаправляє взагалі – постав 302. Для бонусу додай другий Webhook на link-stats, який читає всі рядки, відсортовані за clicks, і відповідає через All Incoming Items, а в form trigger постав Authentication на Basic Auth.
