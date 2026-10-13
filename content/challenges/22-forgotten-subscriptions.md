---
number: 22
slug: forgotten-subscriptions
collection: more
difficulty: intermediate
time: 30–40 min
complexity: 3
color: #fffdf6
ink: #1b2427
---

# Solution Data

Internal reference for the solution viewer. This section is not displayed on the challenge page.

## Core Workflow JSON (without bonus)

```json
{
  "name": "Find the Subscriptions You Forgot – Core",
  "nodes": [
    {
      "parameters": {},
      "id": "7f2a6c14-8b03-4e59-9d27-05c61b84a3e7",
      "name": "Run the check",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/bank-transactions-2026.csv",
        "options": {
          "response": {
            "response": {
              "responseFormat": "file",
              "outputPropertyName": "data"
            }
          }
        }
      },
      "id": "1c94e5b7-6d20-4a38-bf51-82e740c9a16d",
      "name": "Download the statement",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "A CSV is a file, so set Response Format to File. Without it the node tries to read JSON."
    },
    {
      "parameters": {
        "operation": "csv",
        "binaryPropertyName": "data",
        "options": {
          "headerRow": true
        }
      },
      "id": "a3e18d50-2c76-4b91-8e04-69f3b5c072a8",
      "name": "Read the CSV",
      "type": "n8n-nodes-base.extractFromFile",
      "typeVersion": 1.1,
      "position": [
        480,
        0
      ],
      "notesInFlow": true,
      "notes": "One item per row: date, merchant and amount."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "2d7b0963-5e84-4c12-a79f-3b06e5148c2d",
              "name": "merchant",
              "value": "={{ $json.merchant }}",
              "type": "string"
            },
            {
              "id": "b5491c08-7a36-4de2-9140-c8f27b6035ae",
              "name": "month",
              "value": "={{ $json.date.slice(0, 7) }}",
              "type": "string"
            },
            {
              "id": "6e05f382-9b41-4a7d-85c3-10d9a74e2b6f",
              "name": "amount",
              "value": "={{ Number($json.amount) }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "cf38a627-04b5-4390-be71-2a85d1c76049",
      "name": "Merchant, month and amount",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        720,
        0
      ],
      "notesInFlow": true,
      "notes": "2026-03-17 becomes 2026-03, so charges can be counted per month."
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "countUnique",
              "field": "month"
            },
            {
              "aggregation": "sum",
              "field": "amount"
            }
          ]
        },
        "fieldsToSplitBy": "merchant",
        "options": {}
      },
      "id": "41ef933c-4f68-4425-a145-e807451a53d1",
      "name": "Months and total per merchant",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1.1,
      "position": [
        960,
        0
      ],
      "notesInFlow": true,
      "notes": "Count Unique gives unique_count_month; Sum gives sum_amount."
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
              "id": "999159c1-a7b1-4d27-991a-3fb5c980f4bc",
              "leftValue": "={{ $json.unique_count_month }}",
              "rightValue": 12,
              "operator": {
                "type": "number",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "92af471c-9708-4254-b424-a5a98c4c5590",
      "name": "Charged every month",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        1200,
        0
      ],
      "notesInFlow": true,
      "notes": "Twelve different months, not twelve charges: two coffees in one month must not count."
    },
    {
      "parameters": {
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "sum_amount",
              "order": "descending"
            }
          ]
        },
        "options": {}
      },
      "id": "3b60c89e-5724-4a01-b9d6-8e02f417c53a",
      "name": "Most expensive first",
      "type": "n8n-nodes-base.sort",
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
              "id": "7c1e59a4-0d83-4b67-9af2-36e8c40b1572",
              "name": "merchant",
              "value": "={{ $json.merchant }}",
              "type": "string"
            },
            {
              "id": "d2089fb5-6e14-4379-8c05-91a37e6b40dc",
              "name": "months",
              "value": "={{ $json.unique_count_month }}",
              "type": "number"
            },
            {
              "id": "5a473e02-9c68-4d15-be80-24f1c0a9736b",
              "name": "costPerYear",
              "value": "={{ Math.round($json.sum_amount * 100) / 100 }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "81f30c6d-4b29-4e58-a073-6d5942e1b8ca",
      "name": "What it costs a year",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1680,
        0
      ]
    }
  ],
  "connections": {
    "Run the check": {
      "main": [
        [
          {
            "node": "Download the statement",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Download the statement": {
      "main": [
        [
          {
            "node": "Read the CSV",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Read the CSV": {
      "main": [
        [
          {
            "node": "Merchant, month and amount",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Merchant, month and amount": {
      "main": [
        [
          {
            "node": "Months and total per merchant",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Months and total per merchant": {
      "main": [
        [
          {
            "node": "Charged every month",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Charged every month": {
      "main": [
        [
          {
            "node": "Most expensive first",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Most expensive first": {
      "main": [
        [
          {
            "node": "What it costs a year",
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
  "name": "Find the Subscriptions You Forgot – Bonus",
  "nodes": [
    {
      "parameters": {},
      "id": "7f2a6c14-8b03-4e59-9d27-05c61b84a3e7",
      "name": "Run the check",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/bank-transactions-2026.csv",
        "options": {
          "response": {
            "response": {
              "responseFormat": "file",
              "outputPropertyName": "data"
            }
          }
        }
      },
      "id": "1c94e5b7-6d20-4a38-bf51-82e740c9a16d",
      "name": "Download the statement",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "A CSV is a file, so set Response Format to File. Without it the node tries to read JSON."
    },
    {
      "parameters": {
        "operation": "csv",
        "binaryPropertyName": "data",
        "options": {
          "headerRow": true
        }
      },
      "id": "a3e18d50-2c76-4b91-8e04-69f3b5c072a8",
      "name": "Read the CSV",
      "type": "n8n-nodes-base.extractFromFile",
      "typeVersion": 1.1,
      "position": [
        480,
        0
      ],
      "notesInFlow": true,
      "notes": "One item per row: date, merchant and amount."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "2d7b0963-5e84-4c12-a79f-3b06e5148c2d",
              "name": "merchant",
              "value": "={{ $json.merchant }}",
              "type": "string"
            },
            {
              "id": "b5491c08-7a36-4de2-9140-c8f27b6035ae",
              "name": "month",
              "value": "={{ $json.date.slice(0, 7) }}",
              "type": "string"
            },
            {
              "id": "6e05f382-9b41-4a7d-85c3-10d9a74e2b6f",
              "name": "amount",
              "value": "={{ Number($json.amount) }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "cf38a627-04b5-4390-be71-2a85d1c76049",
      "name": "Merchant, month and amount",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        720,
        0
      ],
      "notesInFlow": true,
      "notes": "2026-03-17 becomes 2026-03, so charges can be counted per month."
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "countUnique",
              "field": "month"
            },
            {
              "aggregation": "sum",
              "field": "amount"
            },
            {
              "aggregation": "countUnique",
              "field": "amount"
            },
            {
              "aggregation": "min",
              "field": "amount"
            },
            {
              "aggregation": "max",
              "field": "amount"
            }
          ]
        },
        "fieldsToSplitBy": "merchant",
        "options": {}
      },
      "id": "95c2e740-8136-4b5a-9e08-47f1d6b0a2c3",
      "name": "Months and total per merchant",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1.1,
      "position": [
        960,
        0
      ],
      "notesInFlow": true,
      "notes": "unique_count_amount above 1 means the price was not always the same."
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
              "id": "40a7c3e9-1b58-4f26-9d70-73e5b14c8a9f",
              "leftValue": "={{ $json.unique_count_month }}",
              "rightValue": 12,
              "operator": {
                "type": "number",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "e81d4ab2-6039-4c47-85af-120e7c6935bd",
      "name": "Charged every month",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        1200,
        0
      ],
      "notesInFlow": true,
      "notes": "Twelve different months, not twelve charges: two coffees in one month must not count."
    },
    {
      "parameters": {
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "sum_amount",
              "order": "descending"
            }
          ]
        },
        "options": {}
      },
      "id": "3b60c89e-5724-4a01-b9d6-8e02f417c53a",
      "name": "Most expensive first",
      "type": "n8n-nodes-base.sort",
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
              "id": "7c1e59a4-0d83-4b67-9af2-36e8c40b1572",
              "name": "merchant",
              "value": "={{ $json.merchant }}",
              "type": "string"
            },
            {
              "id": "d2089fb5-6e14-4379-8c05-91a37e6b40dc",
              "name": "months",
              "value": "={{ $json.unique_count_month }}",
              "type": "number"
            },
            {
              "id": "5a473e02-9c68-4d15-be80-24f1c0a9736b",
              "name": "costPerYear",
              "value": "={{ Math.round($json.sum_amount * 100) / 100 }}",
              "type": "number"
            },
            {
              "id": "9e6701fc-3a82-4b54-8d19-07c2b6a45e38",
              "name": "priceChange",
              "value": "={{ $json.unique_count_amount > 1 ? 'went up from ' + $json.min_amount + ' to ' + $json.max_amount : 'same price all year' }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "81f30c6d-4b29-4e58-a073-6d5942e1b8ca",
      "name": "What it costs a year",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1680,
        0
      ]
    }
  ],
  "connections": {
    "Run the check": {
      "main": [
        [
          {
            "node": "Download the statement",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Download the statement": {
      "main": [
        [
          {
            "node": "Read the CSV",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Read the CSV": {
      "main": [
        [
          {
            "node": "Merchant, month and amount",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Merchant, month and amount": {
      "main": [
        [
          {
            "node": "Months and total per merchant",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Months and total per merchant": {
      "main": [
        [
          {
            "node": "Charged every month",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Charged every month": {
      "main": [
        [
          {
            "node": "Most expensive first",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Most expensive first": {
      "main": [
        [
          {
            "node": "What it costs a year",
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
Find the Subscriptions You Forgot

## Summary
Take a year of bank transactions and find every charge that quietly repeats each month, with what it really costs you per year.

## Concept
Grouping rows with Summarize and counting distinct months rather than charges

## Glossary
- CSV: A text file where each line is a row and commas separate the columns. Banks and spreadsheets export this format.
- binary data: A file as n8n holds it, before anything can read inside it. The HTTP Request node must be told to return a file, not JSON.
- distinct count: How many different values there are, not how many rows. Twelve charges in one month are twelve rows but one distinct month.
- subscription: A charge that repeats on its own until someone cancels it. The point of this challenge is finding the ones nobody remembers.
- expression: A small piece of code between double curly braces that n8n works out while the workflow runs.

## Scenario
- Anyone who suspects they are still paying for an app they stopped using two years ago.
- A small business owner going through the company card before the accountant does.
- Any search for a pattern hidden in a long list – repeat customers, recurring errors, weekly deliveries.

## Task
Here is a year of bank transactions. Find every charge that repeats each month and tell me what each one costs per year, most expensive first.

## Bonus Task
Point out the subscriptions whose price went up during the year, and by how much.

## Nodes
- Manual Trigger
- HTTP Request
- Extract from File
- Edit Fields (Set)
- Summarize
- Filter
- Sort

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account is needed.
- The statement is a practice file, not real data: [bank-transactions-2026.csv](https://n8n-challenges.app/fixtures/bank-transactions-2026.csv) holds 150 transactions across all twelve months of 2026, with the columns date, merchant and amount in euros.
- Nothing leaves n8n. The file is public, and the whole challenge runs inside your own workspace.
- Open the file in a browser first and read a few lines, so you know what the columns look like before you build.

## Requirements
- The workflow finds exactly five merchants that were charged in all twelve months, listed most expensive first.
- Each line says what that merchant costs for the year: FitPass Gym 388.80, NewsDaily 144.00, Streamly Music 119.88, Nimbus Hosting 90.00 and CloudBox Storage 59.88 – 802.56 euros together.
- Merchants that only look regular never appear, including Vinyl Club, which is charged four times in the year. Bonus: FitPass Gym is flagged as having gone up from 29.90 to 34.90.

## Tips
- Start with Manual Trigger and HTTP Request to the statement URL, then open Options and add Response › Response Format › File. A CSV is a file, and without that setting the node tries to read it as JSON and fails.
- Add Extract from File with the operation Extract From CSV, reading the binary field data. Each row becomes an item with date, merchant and amount – but amount arrives as text.
- Add Edit Fields (Set) with three fields: merchant, a month built from $json.date.slice(0, 7) – so 2026-03-17 becomes 2026-03 – and amount as a Number, so it can be added up later.
- Add Summarize, split by merchant, with two aggregations: Count Unique on month and Sum on amount. The output fields are unique_count_month and sum_amount. Counting unique months is the whole trick: someone who bought coffee twice in March has two rows but one month.
- Filter where unique_count_month equals 12, Sort by sum_amount descending, and finish with Edit Fields (Set) to round the yearly cost. For the bonus, add Count Unique, Min and Max on amount in the same Summarize: when unique_count_amount is above 1 the price moved, and min_amount and max_amount say from what to what.

# Spanish

## Title
Encuentra las suscripciones que olvidaste

## Summary
Coge un año de movimientos bancarios y encuentra cada cargo que se repite en silencio cada mes, con lo que te cuesta de verdad al año.

## Concept
Agrupar filas con Summarize y contar meses distintos en vez de cargos

## Glossary
- CSV: Un archivo de texto en el que cada línea es una fila y las comas separan las columnas. Bancos y hojas de cálculo exportan en este formato.
- datos binarios: Un archivo tal y como lo guarda n8n, antes de que nada pueda leer su interior. Hay que decirle al nodo HTTP Request que devuelva un archivo y no JSON.
- recuento distinto: Cuántos valores diferentes hay, no cuántas filas. Doce cargos en un mismo mes son doce filas pero un solo mes distinto.
- suscripción: Un cargo que se repite solo hasta que alguien lo cancela. De eso va este reto: encontrar los que nadie recuerda.
- expresión: Un trocito de código entre llaves dobles que n8n calcula mientras el workflow se ejecuta.

## Scenario
- Cualquiera que sospeche que sigue pagando una app que dejó de usar hace dos años.
- Quien lleva un negocio pequeño y revisa la tarjeta de empresa antes de que lo haga la gestoría.
- Cualquier búsqueda de un patrón escondido en una lista larga: clientes que repiten, errores recurrentes, entregas semanales.

## Task
Aquí tienes un año de movimientos bancarios. Encuentra cada cargo que se repite todos los meses y dime cuánto cuesta cada uno al año, del más caro al más barato.

## Bonus Task
Señala las suscripciones cuyo precio subió durante el año, y cuánto subió.

## Nodes
- Manual Trigger
- HTTP Request
- Extract from File
- Edit Fields (Set)
- Summarize
- Filter
- Sort

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta.
- El extracto es un archivo de práctica, no datos reales: [bank-transactions-2026.csv](https://n8n-challenges.app/fixtures/bank-transactions-2026.csv) tiene 150 movimientos repartidos por los doce meses de 2026, con las columnas date, merchant y amount en euros.
- De n8n no sale nada. El archivo es público y todo el reto se ejecuta dentro de tu propio espacio.
- Abre antes el archivo en el navegador y lee unas líneas, para saber cómo son las columnas antes de construir.

## Requirements
- El workflow encuentra exactamente cinco comercios con cargos en los doce meses, ordenados del más caro al más barato.
- Cada línea dice lo que cuesta ese comercio al año: FitPass Gym 388,80; NewsDaily 144,00; Streamly Music 119,88; Nimbus Hosting 90,00 y CloudBox Storage 59,88: 802,56 euros entre todos.
- Los comercios que solo lo parecen no aparecen nunca, incluido Vinyl Club, con cuatro cargos en el año. Bonus: FitPass Gym aparece marcado por haber subido de 29,90 a 34,90.

## Tips
- Empieza con Manual Trigger y HTTP Request a la URL del extracto; después abre Options y añade Response › Response Format › File. Un CSV es un archivo y, sin ese ajuste, el nodo intenta leerlo como JSON y falla.
- Añade Extract from File con la operación Extract From CSV, leyendo el campo binario data. Cada fila se convierte en un ítem con date, merchant y amount, pero amount llega como texto.
- Añade Edit Fields (Set) con tres campos: merchant, un month construido con $json.date.slice(0, 7) – así 2026-03-17 pasa a ser 2026-03 – y amount como Number, para poder sumarlo después.
- Añade Summarize, divide por merchant y pon dos agregaciones: Count Unique sobre month y Sum sobre amount. Los campos de salida son unique_count_month y sum_amount. Contar meses únicos es todo el truco: quien compró café dos veces en marzo tiene dos filas pero un solo mes.
- Filtra donde unique_count_month sea igual a 12, ordena con Sort por sum_amount descendente y termina con Edit Fields (Set) para redondear el coste anual. Para el bonus, añade Count Unique, Min y Max sobre amount en el mismo Summarize: si unique_count_amount es mayor que 1 el precio cambió, y min_amount y max_amount dicen de cuánto a cuánto.

# Ukrainian

## Title
Знайди передплати, про які забув

## Summary
Візьми рік банківських операцій і знайди кожен платіж, який тихо повторюється щомісяця, разом із тим, скільки він коштує за рік.

## Concept
Групування рядків через Summarize і підрахунок різних місяців замість платежів

## Glossary
- CSV: Текстовий файл, у якому кожен рядок – це запис, а коми розділяють колонки. Банки та електронні таблиці експортують саме так.
- бінарні дані: Файл у тому вигляді, в якому його тримає n8n, доки ніхто не зазирнув усередину. Ноді HTTP Request треба сказати, щоб вона повернула файл, а не JSON.
- підрахунок різних значень: Скільки є різних значень, а не скільки рядків. Дванадцять платежів в одному місяці – це дванадцять рядків, але один місяць.
- передплата: Платіж, який повторюється сам, доки його не скасують. Саме в цьому суть завдання: знайти ті, про які ніхто не пам'ятає.
- вираз: Невеликий шматочок коду у подвійних фігурних дужках, який n8n обчислює під час виконання.

## Scenario
- Той, хто підозрює, що досі платить за застосунок, яким перестав користуватися два роки тому.
- Власник невеликого бізнесу, який переглядає корпоративну картку раніше за бухгалтера.
- Будь-який пошук прихованої закономірності у довгому списку: клієнти, які повертаються, повторювані помилки, щотижневі доставки.

## Task
Ось рік банківських операцій. Знайди кожен платіж, який повторюється щомісяця, і скажи, скільки кожен коштує за рік, від найдорожчого до найдешевшого.

## Bonus Task
Познач ті передплати, ціна яких зросла протягом року, і на скільки.

## Nodes
- Manual Trigger
- HTTP Request
- Extract from File
- Edit Fields (Set)
- Summarize
- Filter
- Sort

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів не потрібно.
- Виписка – це тренувальний файл, а не справжні дані: [bank-transactions-2026.csv](https://n8n-challenges.app/fixtures/bank-transactions-2026.csv) містить 150 операцій за всі дванадцять місяців 2026 року з колонками date, merchant і amount у євро.
- З n8n нічого не виходить назовні. Файл публічний, а все завдання виконується у твоєму власному просторі.
- Спершу відкрий файл у браузері й прочитай кілька рядків, щоб знати вигляд колонок ще до побудови.

## Requirements
- Воркфлоу знаходить рівно п'ять продавців із платежами в усі дванадцять місяців, від найдорожчого до найдешевшого.
- Кожен рядок каже, скільки цей продавець коштує за рік: FitPass Gym 388,80; NewsDaily 144,00; Streamly Music 119,88; Nimbus Hosting 90,00 і CloudBox Storage 59,88 – разом 802,56 євро.
- Продавці, які лише здаються регулярними, не з'являються ніколи, зокрема Vinyl Club із чотирма платежами за рік. Бонус: FitPass Gym позначено як такий, що подорожчав з 29,90 до 34,90.

## Tips
- Почни з Manual Trigger і HTTP Request на адресу виписки, потім відкрий Options і додай Response › Response Format › File. CSV – це файл, і без цього налаштування нода намагається прочитати його як JSON і падає.
- Додай Extract from File з операцією Extract From CSV, яка читає бінарне поле data. Кожен рядок стає елементом із date, merchant і amount, але amount надходить як текст.
- Додай Edit Fields (Set) із трьома полями: merchant, month, побудований через $json.date.slice(0, 7) – так 2026-03-17 стає 2026-03 – і amount як Number, щоб його потім можна було додавати.
- Додай Summarize, розділи за merchant і постав дві агрегації: Count Unique для month і Sum для amount. Вихідні поля – unique_count_month і sum_amount. Підрахунок саме різних місяців і є весь трюк: хто двічі купив каву в березні, має два рядки, але один місяць.
- Відфільтруй там, де unique_count_month дорівнює 12, застосуй Sort за sum_amount за спаданням і заверши через Edit Fields (Set), щоб округлити річну вартість. Для бонусу додай у той самий Summarize Count Unique, Min і Max для amount: якщо unique_count_amount більше за 1, ціна змінювалася, а min_amount і max_amount кажуть, з якої на яку.
