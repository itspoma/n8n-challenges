---
number: 8
slug: unstable-restaurant-orders
difficulty: advanced
time: 45–60 min
complexity: 5
color: #c6c9c7
ink: #1b2427
---

# Solution Data

Internal workflow data for Challenge 8. This section is not displayed on the challenge page.

## Organizer Provider Workflow JSON

```json
{
  "name": "Unstable Restaurant Orders – API Provider",
  "nodes": [
    {
      "parameters": {
        "content": "## Unstable Restaurant Orders API\n\nPublish this workflow, then give participants the production URL from **GET /flaky-orders**.\n\nNormal request:\n`?page=1&pageSize=5`\n\nRandom behavior per request:\n- 75% → `200` with one page of orders\n- 15% → `429` with `Retry-After: 2`\n- 10% → `500` with a retryable error\n\nThe dataset is stable across requests. `ORD-1013` is deliberately malformed.",
        "height": 430,
        "width": 430,
        "color": 5
      },
      "id": "de2dc57f-b716-4443-b633-c09dc5086242",
      "name": "API instructions",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -660,
        -340
      ]
    },
    {
      "parameters": {
        "content": "## Organizer test controls\n\nAdd a `scenario` query parameter to force a response while preparing or reviewing the challenge:\n\n- `scenario=success`\n- `scenario=rate_limit`\n- `scenario=server_error`\n\nAn unknown scenario, invalid page, or page size above 10 returns `400`. Omit `scenario` for the participant-facing random behavior.",
        "height": 370,
        "width": 410,
        "color": 3
      },
      "id": "5ac0824d-9cb0-4c4f-a5e9-812265039f23",
      "name": "Test controls",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -150,
        -340
      ]
    },
    {
      "parameters": {
        "httpMethod": "GET",
        "path": "flaky-orders",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "25ba0cf3-44d7-4f2a-ad9d-e7c399475ab7",
      "name": "GET /flaky-orders",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [
        -500,
        140
      ],
      "webhookId": "59694438-9d81-4393-9a8d-0fb2679f4491",
      "notesInFlow": true,
      "notes": "Public fake API endpoint. Publish the workflow and share its production URL without a scenario parameter."
    },
    {
      "parameters": {
        "jsCode": "const request = $input.first().json;\nconst query = request.query ?? {};\n\nconst requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;\nconst requestedScenario = String(query.scenario ?? 'random').toLowerCase();\nconst page = Number(query.page ?? 1);\nconst pageSize = Number(query.pageSize ?? query.limit ?? 5);\nconst allowedScenarios = ['random', 'success', 'rate_limit', 'server_error'];\n\nconst response = (statusCode, scenario, body, retryAfter = '') => [{\n  json: {\n    statusCode,\n    scenario,\n    retryAfter,\n    requestId,\n    body: { ...body, requestId },\n  },\n}];\n\nif (!allowedScenarios.includes(requestedScenario)) {\n  return response(400, 'bad_request', {\n    error: {\n      code: 'INVALID_SCENARIO',\n      message: `scenario must be one of: ${allowedScenarios.join(', ')}`,\n      retryable: false,\n    },\n  });\n}\n\nif (!Number.isInteger(page) || page < 1) {\n  return response(400, 'bad_request', {\n    error: {\n      code: 'INVALID_PAGE',\n      message: 'page must be a positive integer',\n      retryable: false,\n    },\n  });\n}\n\nif (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 10) {\n  return response(400, 'bad_request', {\n    error: {\n      code: 'INVALID_PAGE_SIZE',\n      message: 'pageSize must be an integer between 1 and 10',\n      retryable: false,\n    },\n  });\n}\n\nlet scenario = requestedScenario;\nif (scenario === 'random') {\n  const roll = Math.random();\n  scenario = roll < 0.15 ? 'rate_limit' : roll < 0.25 ? 'server_error' : 'success';\n}\n\nif (scenario === 'rate_limit') {\n  return response(429, scenario, {\n    error: {\n      code: 'RATE_LIMITED',\n      message: 'Too many order requests. The waiter needs a moment.',\n      retryable: true,\n      retryAfterSeconds: 2,\n    },\n  }, '2');\n}\n\nif (scenario === 'server_error') {\n  return response(500, scenario, {\n    error: {\n      code: 'UPSTREAM_TIMEOUT',\n      message: 'The kitchen printer caught fire. Please retry later.',\n      retryable: true,\n    },\n  });\n}\n\nconst restaurants = ['Paella Panic', 'Taco Tornado', 'The Moody Tomato', 'Sushi Siesta', 'Burger Balloon'];\nconst customers = [\n  ['Ana García', 'ana.garcia@example.test'],\n  ['Leo Martín', 'leo.martin@example.test'],\n  ['Marta Soler', 'marta.soler@example.test'],\n  ['Hugo Costa', 'hugo.costa@example.test'],\n  ['Sofía Ruiz', 'sofia.ruiz@example.test'],\n];\nconst meals = ['Paella', 'Tacos', 'Tomato pasta', 'Sushi box', 'Veggie burger'];\nconst statuses = ['ready', 'preparing', 'ready', 'cancelled', 'ready'];\n\nconst orders = Array.from({ length: 25 }, (_, index) => {\n  const number = index + 1001;\n  const restaurantIndex = index % restaurants.length;\n  const customerIndex = (index * 3) % customers.length;\n  const quantity = (index % 3) + 1;\n\n  return {\n    orderId: `ORD-${number}`,\n    restaurant: restaurants[restaurantIndex],\n    customer: {\n      name: customers[customerIndex][0],\n      email: customers[customerIndex][1],\n    },\n    items: [\n      {\n        name: meals[restaurantIndex],\n        quantity,\n        unitPriceCents: 650 + restaurantIndex * 125,\n      },\n    ],\n    totalCents: quantity * (650 + restaurantIndex * 125),\n    currency: 'EUR',\n    status: statuses[index % statuses.length],\n    createdAt: new Date(Date.UTC(2026, 8, 8, 10, index * 3)).toISOString(),\n  };\n});\n\n// This stable record is intentionally corrupt. Participants should validate it,\n// keep processing the other orders, and record why this one was rejected.\norders[12] = {\n  ...orders[12],\n  customer: { name: 'Captain Null', email: 'definitely-not-an-email' },\n  totalCents: 'twelve-ish euros',\n};\n\nconst totalItems = orders.length;\nconst totalPages = Math.ceil(totalItems / pageSize);\n\nif (page > totalPages) {\n  return response(400, 'bad_request', {\n    error: {\n      code: 'PAGE_OUT_OF_RANGE',\n      message: `page must be between 1 and ${totalPages}`,\n      retryable: false,\n    },\n  });\n}\n\nconst start = (page - 1) * pageSize;\nconst data = orders.slice(start, start + pageSize);\n\nreturn response(200, scenario, {\n  data,\n  pagination: {\n    page,\n    pageSize,\n    totalItems,\n    totalPages,\n    hasNext: page < totalPages,\n    nextPage: page < totalPages ? page + 1 : null,\n  },\n  meta: {\n    dataset: 'flaky-orders-v1',\n    generatedAt: new Date().toISOString(),\n  },\n});"
      },
      "id": "fb2f8726-9191-413b-b2a7-64576f5f98af",
      "name": "Simulate flaky paginated API",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -190,
        140
      ],
      "notesInFlow": true,
      "notes": "Creates the stable order dataset, validates pagination, randomly chooses success/429/500, and supports deterministic organizer test scenarios."
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ $json.body }}",
        "options": {
          "responseCode": "={{ $json.statusCode }}",
          "responseHeaders": {
            "entries": [
              {
                "name": "Content-Type",
                "value": "application/json; charset=utf-8"
              },
              {
                "name": "Cache-Control",
                "value": "no-store"
              },
              {
                "name": "Access-Control-Allow-Origin",
                "value": "*"
              },
              {
                "name": "X-Request-Id",
                "value": "={{ $json.requestId }}"
              },
              {
                "name": "X-Flaky-Scenario",
                "value": "={{ $json.scenario }}"
              },
              {
                "name": "Retry-After",
                "value": "={{ $json.retryAfter }}"
              }
            ]
          }
        }
      },
      "id": "82d592f8-d452-42c4-9137-66abcdfd58b0",
      "name": "Return simulated API response",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.4,
      "position": [
        140,
        140
      ],
      "notesInFlow": true,
      "notes": "Returns the generated JSON body with its dynamic HTTP status, request ID, scenario, and Retry-After header."
    }
  ],
  "pinData": {},
  "connections": {
    "GET /flaky-orders": {
      "main": [
        [
          {
            "node": "Simulate flaky paginated API",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Simulate flaky paginated API": {
      "main": [
        [
          {
            "node": "Return simulated API response",
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
  "versionId": "64565d76-f537-452a-b7af-df0cc47ea41b",
  "meta": {
    "templateCredsSetupCompleted": true
  },
  "tags": []
}
```

## Core Workflow JSON (without bonus)

```json
{
  "name": "C8 – Unstable Orders – Core",
  "nodes": [
    {
      "parameters": {},
      "id": "08000000-0000-4000-8000-000000000101",
      "name": "Run order rescue",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        -1080,
        -120
      ],
      "notesInFlow": true,
      "notes": "Starts a safe manual test run before the workflow is automated."
    },
    {
      "parameters": {
        "url": "https://ralabs.app.n8n.cloud/webhook/flaky-orders",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "pageSize",
              "value": "5"
            }
          ]
        },
        "options": {
          "pagination": {
            "pagination": {
              "paginationMode": "updateAParameterInEachRequest",
              "parameters": {
                "parameters": [
                  {
                    "type": "qs",
                    "name": "page",
                    "value": "={{ $pageCount + 1 }}"
                  }
                ]
              },
              "paginationCompleteWhen": "other",
              "completeExpression": "={{ !$response.body.pagination.hasNext }}",
              "limitPagesFetched": true,
              "maxRequests": 5,
              "requestInterval": 2000
            }
          },
          "timeout": 10000
        }
      },
      "id": "08000000-0000-4000-8000-000000000102",
      "name": "Fetch every order page",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        -840,
        -120
      ],
      "retryOnFail": true,
      "maxTries": 5,
      "waitBetweenTries": 2000,
      "notesInFlow": true,
      "notes": "Fetches pages 1–5, stops when pagination.hasNext is false, and retries temporary HTTP failures after two seconds."
    },
    {
      "parameters": {
        "fieldToSplitOut": "data",
        "include": "noOtherFields",
        "options": {}
      },
      "id": "08000000-0000-4000-8000-000000000103",
      "name": "Split orders",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        -590,
        -120
      ],
      "notesInFlow": true,
      "notes": "Turns every order in each page's data array into its own n8n item."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "08000000-0000-4000-8000-000000000201",
              "name": "customerName",
              "value": "={{ $json.customer?.name ?? '' }}",
              "type": "string"
            },
            {
              "id": "08000000-0000-4000-8000-000000000202",
              "name": "customerEmail",
              "value": "={{ $json.customer?.email ?? '' }}",
              "type": "string"
            },
            {
              "id": "08000000-0000-4000-8000-000000000203",
              "name": "rawTotalCents",
              "value": "={{ String($json.totalCents ?? '') }}",
              "type": "string"
            },
            {
              "id": "08000000-0000-4000-8000-000000000204",
              "name": "isValid",
              "value": "={{ typeof $json.orderId === 'string' && $json.orderId.length > 0 && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test($json.customer?.email ?? '') && typeof $json.totalCents === 'number' && Number.isFinite($json.totalCents) }}",
              "type": "boolean"
            },
            {
              "id": "08000000-0000-4000-8000-000000000205",
              "name": "rejectionReason",
              "value": "={{ [!$json.orderId ? 'missing orderId' : '', !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test($json.customer?.email ?? '') ? 'invalid customer.email' : '', !(typeof $json.totalCents === 'number' && Number.isFinite($json.totalCents)) ? 'totalCents must be numeric' : ''].filter(Boolean).join('; ') }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "08000000-0000-4000-8000-000000000104",
      "name": "Validate order fields",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -340,
        -120
      ],
      "notesInFlow": true,
      "notes": "Normalizes nested customer fields and calculates both a validity flag and a precise rejection reason."
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
              "id": "08000000-0000-4000-8000-000000000206",
              "leftValue": "={{ $json.isValid }}",
              "rightValue": "",
              "operator": {
                "type": "boolean",
                "operation": "true",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "08000000-0000-4000-8000-000000000105",
      "name": "Order is valid?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -90,
        -120
      ],
      "notesInFlow": true,
      "notes": "Routes valid orders through true and malformed orders through false."
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "insert",
        "dataTableId": {
          "__rl": true,
          "value": "rescued_orders",
          "mode": "name"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "orderId": "={{ $json.orderId }}",
            "restaurant": "={{ $json.restaurant }}",
            "customerName": "={{ $json.customerName }}",
            "customerEmail": "={{ $json.customerEmail }}",
            "totalCents": "={{ $json.totalCents }}",
            "currency": "={{ $json.currency }}",
            "status": "={{ $json.status }}",
            "createdAt": "={{ $json.createdAt }}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "orderId",
              "displayName": "orderId",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "restaurant",
              "displayName": "restaurant",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "customerName",
              "displayName": "customerName",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "customerEmail",
              "displayName": "customerEmail",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "totalCents",
              "displayName": "totalCents",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "number",
              "canBeUsedToMatch": true
            },
            {
              "id": "currency",
              "displayName": "currency",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "status",
              "displayName": "status",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "createdAt",
              "displayName": "createdAt",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "id": "08000000-0000-4000-8000-000000000106",
      "name": "Save rescued order",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        190,
        -240
      ],
      "notesInFlow": true,
      "notes": "Inserts each validated order into the rescued_orders Data Table."
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "insert",
        "dataTableId": {
          "__rl": true,
          "value": "rejected_orders",
          "mode": "name"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "orderId": "={{ $json.orderId ?? '' }}",
            "restaurant": "={{ $json.restaurant ?? '' }}",
            "customerEmail": "={{ $json.customerEmail }}",
            "rawTotalCents": "={{ $json.rawTotalCents }}",
            "rejectionReason": "={{ $json.rejectionReason }}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "orderId",
              "displayName": "orderId",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "restaurant",
              "displayName": "restaurant",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "customerEmail",
              "displayName": "customerEmail",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "rawTotalCents",
              "displayName": "rawTotalCents",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "rejectionReason",
              "displayName": "rejectionReason",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "id": "08000000-0000-4000-8000-000000000107",
      "name": "Save rejected order",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        190,
        20
      ],
      "notesInFlow": true,
      "notes": "Preserves malformed order data and the calculated rejection reason in rejected_orders."
    }
  ],
  "connections": {
    "Run order rescue": {
      "main": [
        [
          {
            "node": "Fetch every order page",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Fetch every order page": {
      "main": [
        [
          {
            "node": "Split orders",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Split orders": {
      "main": [
        [
          {
            "node": "Validate order fields",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Validate order fields": {
      "main": [
        [
          {
            "node": "Order is valid?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Order is valid?": {
      "main": [
        [
          {
            "node": "Save rescued order",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Save rejected order",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "08000000-0000-4000-8000-000000000301",
  "meta": {
    "templateCredsSetupCompleted": true
  },
  "tags": []
}
```

## Bonus Workflow JSON

The lower Error Trigger branch is a template for the required separate error workflow. After importing, move that three-node branch into a new workflow and select it in the main workflow's error-workflow setting.

```json
{
  "name": "C8 – Unstable Orders – Bonus",
  "nodes": [
    {
      "parameters": {},
      "id": "08000000-0000-4000-8000-000000000101",
      "name": "Run order rescue",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        -1080,
        -120
      ],
      "notesInFlow": true,
      "notes": "Starts a safe manual test run before the workflow is automated."
    },
    {
      "parameters": {
        "url": "https://ralabs.app.n8n.cloud/webhook/flaky-orders",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "pageSize",
              "value": "5"
            }
          ]
        },
        "options": {
          "pagination": {
            "pagination": {
              "paginationMode": "updateAParameterInEachRequest",
              "parameters": {
                "parameters": [
                  {
                    "type": "qs",
                    "name": "page",
                    "value": "={{ $pageCount + 1 }}"
                  }
                ]
              },
              "paginationCompleteWhen": "other",
              "completeExpression": "={{ !$response.body.pagination.hasNext }}",
              "limitPagesFetched": true,
              "maxRequests": 5,
              "requestInterval": 2000
            }
          },
          "timeout": 10000
        }
      },
      "id": "08000000-0000-4000-8000-000000000102",
      "name": "Fetch every order page",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        -840,
        -120
      ],
      "retryOnFail": true,
      "maxTries": 5,
      "waitBetweenTries": 2000,
      "notesInFlow": true,
      "notes": "Fetches pages 1–5, stops when pagination.hasNext is false, and retries temporary HTTP failures after two seconds."
    },
    {
      "parameters": {
        "fieldToSplitOut": "data",
        "include": "noOtherFields",
        "options": {}
      },
      "id": "08000000-0000-4000-8000-000000000103",
      "name": "Split orders",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        -590,
        -120
      ],
      "notesInFlow": true,
      "notes": "Turns every order in each page's data array into its own n8n item."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "08000000-0000-4000-8000-000000000201",
              "name": "customerName",
              "value": "={{ $json.customer?.name ?? '' }}",
              "type": "string"
            },
            {
              "id": "08000000-0000-4000-8000-000000000202",
              "name": "customerEmail",
              "value": "={{ $json.customer?.email ?? '' }}",
              "type": "string"
            },
            {
              "id": "08000000-0000-4000-8000-000000000203",
              "name": "rawTotalCents",
              "value": "={{ String($json.totalCents ?? '') }}",
              "type": "string"
            },
            {
              "id": "08000000-0000-4000-8000-000000000204",
              "name": "isValid",
              "value": "={{ typeof $json.orderId === 'string' && $json.orderId.length > 0 && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test($json.customer?.email ?? '') && typeof $json.totalCents === 'number' && Number.isFinite($json.totalCents) }}",
              "type": "boolean"
            },
            {
              "id": "08000000-0000-4000-8000-000000000205",
              "name": "rejectionReason",
              "value": "={{ [!$json.orderId ? 'missing orderId' : '', !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test($json.customer?.email ?? '') ? 'invalid customer.email' : '', !(typeof $json.totalCents === 'number' && Number.isFinite($json.totalCents)) ? 'totalCents must be numeric' : ''].filter(Boolean).join('; ') }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "08000000-0000-4000-8000-000000000104",
      "name": "Validate order fields",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -340,
        -120
      ],
      "notesInFlow": true,
      "notes": "Normalizes nested customer fields and calculates both a validity flag and a precise rejection reason."
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
              "id": "08000000-0000-4000-8000-000000000206",
              "leftValue": "={{ $json.isValid }}",
              "rightValue": "",
              "operator": {
                "type": "boolean",
                "operation": "true",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "08000000-0000-4000-8000-000000000105",
      "name": "Order is valid?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -90,
        -120
      ],
      "notesInFlow": true,
      "notes": "Routes valid orders through true and malformed orders through false."
    },
    {
      "parameters": {
        "batchSize": 5,
        "options": {}
      },
      "id": "08000000-0000-4000-8000-000000000108",
      "name": "Batch valid orders",
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 3,
      "position": [
        160,
        -300
      ],
      "notesInFlow": true,
      "notes": "Processes five valid orders at a time; the loop output continues through the write and wait nodes."
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "insert",
        "dataTableId": {
          "__rl": true,
          "value": "rescued_orders",
          "mode": "name"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "orderId": "={{ $json.orderId }}",
            "restaurant": "={{ $json.restaurant }}",
            "customerName": "={{ $json.customerName }}",
            "customerEmail": "={{ $json.customerEmail }}",
            "totalCents": "={{ $json.totalCents }}",
            "currency": "={{ $json.currency }}",
            "status": "={{ $json.status }}",
            "createdAt": "={{ $json.createdAt }}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "orderId",
              "displayName": "orderId",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "restaurant",
              "displayName": "restaurant",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "customerName",
              "displayName": "customerName",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "customerEmail",
              "displayName": "customerEmail",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "totalCents",
              "displayName": "totalCents",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "number",
              "canBeUsedToMatch": true
            },
            {
              "id": "currency",
              "displayName": "currency",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "status",
              "displayName": "status",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "createdAt",
              "displayName": "createdAt",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "id": "08000000-0000-4000-8000-000000000106",
      "name": "Save rescued batch",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        410,
        -300
      ],
      "notesInFlow": true,
      "notes": "Inserts the current batch into rescued_orders before the loop continues."
    },
    {
      "parameters": {
        "amount": 2,
        "unit": "seconds"
      },
      "id": "08000000-0000-4000-8000-000000000109",
      "name": "Wait between batches",
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [
        660,
        -300
      ],
      "webhookId": "08000000-0000-4000-8000-000000000401",
      "notesInFlow": true,
      "notes": "Waits two seconds before asking Loop Over Items for the next batch."
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "insert",
        "dataTableId": {
          "__rl": true,
          "value": "rejected_orders",
          "mode": "name"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "orderId": "={{ $json.orderId ?? '' }}",
            "restaurant": "={{ $json.restaurant ?? '' }}",
            "customerEmail": "={{ $json.customerEmail }}",
            "rawTotalCents": "={{ $json.rawTotalCents }}",
            "rejectionReason": "={{ $json.rejectionReason }}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "orderId",
              "displayName": "orderId",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "restaurant",
              "displayName": "restaurant",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "customerEmail",
              "displayName": "customerEmail",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "rawTotalCents",
              "displayName": "rawTotalCents",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "rejectionReason",
              "displayName": "rejectionReason",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "id": "08000000-0000-4000-8000-000000000107",
      "name": "Save rejected order",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        160,
        -60
      ],
      "notesInFlow": true,
      "notes": "Preserves malformed order data and its rejection reason without sending it through the valid-order batch."
    },
    {
      "parameters": {},
      "id": "08000000-0000-4000-8000-000000000110",
      "name": "Error Trigger – separate workflow",
      "type": "n8n-nodes-base.errorTrigger",
      "typeVersion": 1,
      "position": [
        -590,
        250
      ],
      "notesInFlow": true,
      "notes": "Copy this branch into a separate workflow, then select that workflow under the main workflow's Error workflow setting."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "08000000-0000-4000-8000-000000000211",
              "name": "workflowName",
              "value": "={{ $json.workflow?.name ?? 'Unknown workflow' }}",
              "type": "string"
            },
            {
              "id": "08000000-0000-4000-8000-000000000212",
              "name": "executionUrl",
              "value": "={{ $json.execution?.url ?? '' }}",
              "type": "string"
            },
            {
              "id": "08000000-0000-4000-8000-000000000213",
              "name": "failedNode",
              "value": "={{ $json.execution?.lastNodeExecuted ?? $json.trigger?.error?.node?.name ?? 'Unknown node' }}",
              "type": "string"
            },
            {
              "id": "08000000-0000-4000-8000-000000000214",
              "name": "errorMessage",
              "value": "={{ $json.execution?.error?.message ?? $json.trigger?.error?.message ?? 'Unknown error' }}",
              "type": "string"
            },
            {
              "id": "08000000-0000-4000-8000-000000000215",
              "name": "lastRequestDetails",
              "value": "={{ JSON.stringify({ executionId: $json.execution?.id ?? null, retryOf: $json.execution?.retryOf ?? null, lastNodeExecuted: $json.execution?.lastNodeExecuted ?? null }) }}",
              "type": "string"
            },
            {
              "id": "08000000-0000-4000-8000-000000000216",
              "name": "recordedAt",
              "value": "={{ $now.toISO() }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "08000000-0000-4000-8000-000000000111",
      "name": "Prepare retry diagnostic",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -340,
        250
      ],
      "notesInFlow": true,
      "notes": "Extracts the failed workflow, execution URL, final error, last node, and retry context supplied by Error Trigger."
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "insert",
        "dataTableId": {
          "__rl": true,
          "value": "api_failure_diagnostics",
          "mode": "name"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "workflowName": "={{ $json.workflowName }}",
            "executionUrl": "={{ $json.executionUrl }}",
            "failedNode": "={{ $json.failedNode }}",
            "errorMessage": "={{ $json.errorMessage }}",
            "lastRequestDetails": "={{ $json.lastRequestDetails }}",
            "recordedAt": "={{ $json.recordedAt }}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "workflowName",
              "displayName": "workflowName",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "executionUrl",
              "displayName": "executionUrl",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "failedNode",
              "displayName": "failedNode",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "errorMessage",
              "displayName": "errorMessage",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "lastRequestDetails",
              "displayName": "lastRequestDetails",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "recordedAt",
              "displayName": "recordedAt",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "id": "08000000-0000-4000-8000-000000000112",
      "name": "Save exhausted retry",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        -90,
        250
      ],
      "notesInFlow": true,
      "notes": "Stores one diagnostic row after the main workflow exhausts all request retries."
    }
  ],
  "connections": {
    "Run order rescue": {
      "main": [
        [
          {
            "node": "Fetch every order page",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Fetch every order page": {
      "main": [
        [
          {
            "node": "Split orders",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Split orders": {
      "main": [
        [
          {
            "node": "Validate order fields",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Validate order fields": {
      "main": [
        [
          {
            "node": "Order is valid?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Order is valid?": {
      "main": [
        [
          {
            "node": "Batch valid orders",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Save rejected order",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Batch valid orders": {
      "main": [
        [],
        [
          {
            "node": "Save rescued batch",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Save rescued batch": {
      "main": [
        [
          {
            "node": "Wait between batches",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Wait between batches": {
      "main": [
        [
          {
            "node": "Batch valid orders",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Error Trigger – separate workflow": {
      "main": [
        [
          {
            "node": "Prepare retry diagnostic",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prepare retry diagnostic": {
      "main": [
        [
          {
            "node": "Save exhausted retry",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "08000000-0000-4000-8000-000000000302",
  "meta": {
    "templateCredsSetupCompleted": true
  },
  "tags": []
}
```

## Solution Images

- Core dark: ![Unstable Restaurant Orders core workflow on the dark n8n canvas](/solutions/unstable-restaurant-orders-core-dark.png)
- Core light: ![Unstable Restaurant Orders core workflow on the light n8n canvas](/solutions/unstable-restaurant-orders-core-light.png)
- Bonus dark: ![Unstable Restaurant Orders workflow with batching and exhausted-retry diagnostics on the dark n8n canvas](/solutions/unstable-restaurant-orders-bonus-dark.png)
- Bonus light: ![Unstable Restaurant Orders workflow with batching and exhausted-retry diagnostics on the light n8n canvas](/solutions/unstable-restaurant-orders-bonus-light.png)

# English

## Title
Keep Restaurant Orders Moving

## Summary
Recover every valid restaurant order from a paginated API – a service that returns a large result in numbered pages – even when it rate-limits requests or fails unexpectedly.

## Concept
Pagination, retries, batching, validation, rejected records, and resilient error handling

## Glossary
- paginated API: A service that divides a large result into numbered pages and tells the workflow whether another page exists.
- rate limits: Temporary refusals sent when a service receives too many requests; this fixture uses HTTP status 429.
- retries: New attempts made after a temporary request failure.
- controlled batches: Small groups of items processed one group at a time.
- validation: Checks that required fields exist and use safe data types before a record is saved.
- Retry-After: A response header that tells the caller how many seconds to wait before trying again.
- Error Trigger: An n8n node that starts a separate error workflow after another workflow fails.

## Scenario
- A delivery platform must import orders even when its restaurant API is temporarily unreliable.
- An operations team needs valid orders to continue processing without losing rejected records.
- A nightly synchronization must recover from rate limits – temporary refusals caused by too many requests – without creating incomplete results.

## Task
Retrieve every order from the supplied API, survive temporary failures, and separate valid orders from data that cannot be safely processed.

## Bonus Task
Process valid orders in controlled batches – small groups handled one at a time – and record useful diagnostics when the API still fails after every retry.

## Nodes
- Manual Trigger
- HTTP Request
- Split Out
- IF
- Edit Fields (Set)
- Loop Over Items
- Wait
- Data Table
- Error Trigger

## Preparation
- Sign up for [n8n Cloud](/n8n-sign-up) or open an existing n8n workspace, then create a new workflow.
- Use the event’s [Unstable Restaurant Orders API](https://ralabs.app.n8n.cloud/webhook/flaky-orders?page=1&pageSize=5). This normal URL randomly returns a successful page, a 429 rate-limit response, or a retryable 500 server error; do not add a scenario parameter while building.
- Create a Data Table named rescued_orders for valid orders, another named rejected_orders for rejected data together with its rejection reason, and – for the bonus – api_failure_diagnostics for exhausted-retry details.
- No external account, API key, or other credential is required. During review, the mentor may use the provider’s deterministic test controls to reproduce success, rate-limit, and server-error responses.

## Requirements
- Follow the API’s pagination information and retrieve all 25 orders without manually creating a separate request for each page.
- Retry temporary 429 and 500 responses, save all 24 valid orders, and do not lose orders that succeeded before another request failed.
- Reject ORD-1013, record a clear validation reason, and demonstrate the workflow against successful, rate-limited, and exhausted-retry responses.

## Tips
- Start with Manual Trigger so you can run the rescue safely while building and inspect each execution before automating it.
- Add HTTP Request and inspect its response body, status code, headers, and pagination object; configure pagination so pagination.nextPage supplies the next page while pagination.hasNext is true.
- In HTTP Request, enable Retry On Fail for temporary 429 and 500 responses, allow enough attempts for random failures, and wait at least the Retry-After value of two seconds before another attempt.
- Connect Split Out to turn the data array into individual orders, then use IF to validate orderId, customer.email, and numeric totalCents; use Edit Fields (Set) for a rejection reason and write the two branches to their matching Data Table.
- For the bonus, place Loop Over Items and Wait around valid-order writes to control batch size, then use a separate Error Trigger workflow to store the failed workflow name, execution URL, error message, and last request details when retries are exhausted.

# Spanish

## Title
Que los pedidos del restaurante sigan adelante

## Summary
Recupera todos los pedidos válidos de restaurantes desde una API paginada – un servicio que divide un resultado grande en páginas numeradas – incluso cuando limita las peticiones o falla de forma inesperada.

## Concept
Paginación, reintentos, procesamiento por lotes, validación, registros rechazados y gestión de errores resistente

## Glossary
- API paginada: Un servicio que divide un resultado grande en páginas numeradas e indica al workflow si existe otra página.
- límites de frecuencia: Rechazos temporales cuando un servicio recibe demasiadas peticiones; este recurso usa el estado HTTP 429.
- reintentos: Nuevos intentos realizados después de un fallo temporal de una petición.
- lotes controlados: Grupos pequeños de elementos que se procesan uno por uno.
- validación: Comprobaciones de que los campos obligatorios existen y usan tipos de datos seguros antes de guardar un registro.
- Retry-After: Un encabezado de respuesta que indica cuántos segundos debe esperar quien llama antes de volver a intentarlo.
- Error Trigger: Un nodo de n8n que inicia un workflow de errores separado cuando falla otro workflow.

## Scenario
- Una plataforma de reparto debe importar pedidos aunque la API de sus restaurantes no sea fiable temporalmente.
- Un equipo de operaciones necesita seguir procesando los pedidos válidos sin perder los registros rechazados.
- Una sincronización nocturna debe recuperarse de los límites de frecuencia – rechazos temporales por demasiadas peticiones – sin producir resultados incompletos.

## Task
Recupera todos los pedidos de la API suministrada, supera los fallos temporales y separa los pedidos válidos de los datos que no se pueden procesar con seguridad.

## Bonus Task
Procesa los pedidos válidos en lotes controlados – grupos pequeños atendidos uno por uno – y registra diagnósticos útiles cuando la API sigue fallando después de todos los reintentos.

## Nodes
- Manual Trigger
- HTTP Request
- Split Out
- IF
- Edit Fields (Set)
- Loop Over Items
- Wait
- Data Table
- Error Trigger

## Preparation
- Regístrate en [n8n Cloud](/n8n-sign-up) o abre un espacio de trabajo de n8n existente y crea un workflow nuevo.
- Usa la [API de pedidos inestable](https://ralabs.app.n8n.cloud/webhook/flaky-orders?page=1&pageSize=5) del evento. Esta URL normal devuelve al azar una página correcta, una respuesta 429 por límite de frecuencia o un error 500 de servidor que admite reintento; no añadas un parámetro scenario mientras construyes.
- Crea una Data Table llamada rescued_orders para los pedidos válidos, otra llamada rejected_orders para los datos rechazados junto con el motivo del rechazo y – para la tarea extra – api_failure_diagnostics para los detalles de reintentos agotados.
- No se necesita ninguna cuenta externa, clave API ni otra credencial. Durante la revisión, el mentor puede usar los controles de prueba deterministas del proveedor para reproducir respuestas correctas, límites de frecuencia y errores de servidor.

## Requirements
- Sigue la información de paginación de la API y recupera los 25 pedidos sin crear manualmente una petición separada para cada página.
- Reintenta las respuestas temporales 429 y 500, guarda los 24 pedidos válidos y no pierde los pedidos que tuvieron éxito antes de que fallara otra petición.
- Rechaza ORD-1013, registra un motivo de validación claro y demuestra el workflow frente a respuestas correctas, limitadas por frecuencia y con los reintentos agotados.

## Tips
- Empieza con Manual Trigger para ejecutar el rescate de forma segura mientras lo construyes y revisar cada ejecución antes de automatizarla.
- Añade HTTP Request y revisa el cuerpo, el código de estado, los encabezados y el objeto pagination de la respuesta; configura la paginación para que pagination.nextPage indique la página siguiente mientras pagination.hasNext sea true.
- En HTTP Request, activa Retry On Fail para las respuestas temporales 429 y 500, permite suficientes intentos para superar fallos aleatorios y espera como mínimo los dos segundos indicados por Retry-After antes de volver a intentarlo.
- Conecta Split Out para convertir el array data en pedidos individuales y después usa IF para validar orderId, customer.email y que totalCents sea numérico; usa Edit Fields (Set) para el motivo de rechazo y escribe cada rama en su Data Table correspondiente.
- Para la tarea extra, coloca Loop Over Items y Wait alrededor de las escrituras de pedidos válidos para controlar el tamaño del lote y usa un workflow separado con Error Trigger para guardar el nombre del workflow fallido, la URL de ejecución, el mensaje de error y los datos de la última petición cuando se agoten los reintentos.

# Ukrainian

## Title
Нехай ресторанні замовлення рухаються далі

## Summary
Отримайте всі коректні ресторанні замовлення з API з пагінацією – сервісу, що ділить великий результат на пронумеровані сторінки, – навіть коли він обмежує частоту запитів або несподівано відмовляє.

## Concept
Пагінація, повторні спроби, пакетне опрацювання, перевірка, відхилені записи й стійка обробка помилок

## Glossary
- API з пагінацією: Сервіс, який ділить великий результат на пронумеровані сторінки й повідомляє воркфлоу, чи є наступна сторінка.
- обмеження частоти: Тимчасова відмова, коли сервіс отримує забагато запитів; цей ресурс використовує HTTP-статус 429.
- повторні спроби: Нові спроби після тимчасового збою запиту.
- контрольованими пакетами: Невеликі групи елементів, які опрацьовуються по черзі.
- перевірки: Перевірка наявності обов’язкових полів і безпечних типів даних перед збереженням запису.
- Retry-After: Заголовок відповіді, який повідомляє, скільки секунд треба зачекати перед новою спробою.
- Error Trigger: Нода n8n, яка запускає окремий воркфлоу обробки помилок після збою іншого воркфлоу.

## Scenario
- Платформа доставки має імпортувати замовлення, навіть коли API ресторану тимчасово працює нестабільно.
- Операційній команді потрібно продовжувати опрацювання коректних замовлень і не втрачати відхилені записи.
- Нічна синхронізація має відновлюватися після обмеження частоти – тимчасової відмови через надмірну кількість запитів – і не створювати неповні результати.

## Task
Отримайте всі замовлення з наданого API, витримайте тимчасові збої та відокремте коректні замовлення від даних, які не можна безпечно опрацювати.

## Bonus Task
Опрацьовуйте коректні замовлення контрольованими пакетами – невеликими групами по черзі – і записуйте корисні діагностичні дані, якщо API продовжує відмовляти після всіх повторних спроб.

## Nodes
- Manual Trigger
- HTTP Request
- Split Out
- IF
- Edit Fields (Set)
- Loop Over Items
- Wait
- Data Table
- Error Trigger

## Preparation
- Зареєструйтеся в [n8n Cloud](/n8n-sign-up) або відкрийте наявний робочий простір n8n і створіть новий воркфлоу.
- Використовуйте наданий для події [нестабільний API замовлень](https://ralabs.app.n8n.cloud/webhook/flaky-orders?page=1&pageSize=5). Ця звичайна URL-адреса випадково повертає успішну сторінку, відповідь 429 про обмеження частоти або серверну помилку 500, яку можна повторити; не додавайте параметр scenario під час побудови.
- Створіть Data Table з назвою rescued_orders для коректних замовлень, ще одну з назвою rejected_orders для відхилених даних разом із причиною відхилення та – для додаткового завдання – api_failure_diagnostics для даних про вичерпані повторні спроби.
- Зовнішній обліковий запис, API-ключ або інші облікові дані не потрібні. Під час перевірки ментор може скористатися детермінованими тестовими параметрами провайдера, щоб відтворити успішні відповіді, обмеження частоти й серверні помилки.

## Requirements
- Дотримуйтеся інформації про пагінацію API та отримайте всі 25 замовлень, не створюючи вручну окремий запит для кожної сторінки.
- Повторюйте тимчасові відповіді 429 і 500, збережіть усі 24 коректні замовлення та не втрачайте замовлення, успішно отримані до збою іншого запиту.
- Відхиліть ORD-1013, запишіть зрозумілу причину невдалої перевірки та продемонструйте роботу воркфлоу з успішними відповідями, обмеженням частоти й вичерпаними повторними спробами.

## Tips
- Почніть із Manual Trigger, щоб безпечно запускати порятунок під час побудови й перевіряти кожне виконання до автоматизації.
- Додайте HTTP Request і перегляньте тіло відповіді, код стану, заголовки та об’єкт pagination; налаштуйте пагінацію так, щоб pagination.nextPage задавав наступну сторінку, поки pagination.hasNext дорівнює true.
- У HTTP Request увімкніть Retry On Fail для тимчасових відповідей 429 і 500, дозвольте достатньо спроб для подолання випадкових збоїв і зачекайте щонайменше дві секунди з Retry-After перед новою спробою.
- Під’єднайте Split Out, щоб перетворити масив data на окремі замовлення, а потім використайте IF для перевірки orderId, customer.email і числового totalCents; за допомогою Edit Fields (Set) сформуйте причину відхилення та запишіть обидві гілки до відповідних Data Table.
- Для додаткового завдання розмістіть Loop Over Items і Wait навколо запису коректних замовлень, щоб контролювати розмір пакета, а потім використайте окремий воркфлоу з Error Trigger для збереження назви невдалого воркфлоу, URL виконання, повідомлення про помилку та даних останнього запиту після вичерпання повторних спроб.

# Indonesian

## Title
Jaga Pesanan Restoran Tetap Jalan

## Summary
Selamatkan setiap pesanan restoran yang valid dari sebuah API dengan pagination – layanan yang mengembalikan hasil besar dalam halaman-halaman bernomor – meskipun API-nya membatasi request lewat rate limit atau tiba-tiba gagal.

## Concept
Pagination, retry, batching, validasi, data yang ditolak, dan penanganan error yang tahan banting

## Glossary
- API dengan pagination: Layanan yang memecah hasil besar menjadi halaman-halaman bernomor dan memberi tahu workflow apakah masih ada halaman berikutnya.
- rate limit: Penolakan sementara yang dikirim layanan saat menerima terlalu banyak request; fixture ini memakai status HTTP 429.
- retry: Percobaan ulang setelah sebuah request gagal untuk sementara.
- batch terkontrol: Kelompok-kelompok kecil item yang diproses satu kelompok dalam satu waktu.
- validasi: Pengecekan bahwa field yang wajib ada memang ada dan memakai tipe data yang aman sebelum sebuah record disimpan.
- Retry-After: Header respons yang memberi tahu pemanggil harus menunggu berapa detik sebelum mencoba lagi.
- Error Trigger: Node n8n yang menjalankan workflow error terpisah setelah workflow lain gagal.

## Scenario
- Platform pengantaran harus tetap bisa mengimpor pesanan meskipun API restorannya sedang tidak stabil.
- Tim operasional butuh pesanan yang valid terus diproses tanpa kehilangan record yang ditolak.
- Sinkronisasi tiap malam harus bisa pulih dari rate limit – penolakan sementara karena terlalu banyak request – tanpa menghasilkan data yang setengah jadi.

## Task
Ambil semua pesanan dari API yang disediakan, tetap bertahan saat ada gangguan sementara, lalu pisahkan pesanan yang valid dari data yang tidak aman untuk diproses.

## Bonus Task
Proses pesanan yang valid dalam batch terkontrol – kelompok kecil yang ditangani satu per satu – dan catat informasi diagnostik yang berguna kalau API masih gagal setelah semua retry habis.

## Nodes
- Manual Trigger
- HTTP Request
- Split Out
- IF
- Edit Fields (Set)
- Loop Over Items
- Wait
- Data Table
- Error Trigger

## Preparation
- Daftar [n8n Cloud](/n8n-sign-up) atau buka workspace n8n yang sudah ada, lalu buat workflow baru.
- Pakai [Unstable Restaurant Orders API](https://ralabs.app.n8n.cloud/webhook/flaky-orders?page=1&pageSize=5) milik acara ini. URL normal ini secara acak mengembalikan halaman yang sukses, respons rate limit 429, atau error server 500 yang bisa di-retry; jangan tambahkan parameter scenario selama membangun.
- Buat Data Table bernama rescued_orders untuk pesanan valid, satu lagi bernama rejected_orders untuk data yang ditolak beserta alasan penolakannya, dan – untuk bonus – api_failure_diagnostics untuk detail saat retry sudah habis.
- Tidak butuh akun eksternal, API key, atau credential lain. Saat review, mentor mungkin memakai kontrol tes deterministik dari penyedia API untuk memunculkan respons sukses, rate limit, dan error server.

## Requirements
- Ikuti informasi pagination dari API dan ambil semua 25 pesanan tanpa membuat request terpisah secara manual untuk tiap halaman.
- Retry respons 429 dan 500 yang sifatnya sementara, simpan semua 24 pesanan valid, dan jangan sampai kehilangan pesanan yang sudah sukses sebelum request lain gagal.
- Tolak ORD-1013, catat alasan validasi yang jelas, dan tunjukkan workflow-nya bekerja untuk respons sukses, rate limit, dan retry yang habis.

## Tips
- Mulai dari Manual Trigger supaya kamu bisa menjalankan proses penyelamatan ini dengan aman sambil membangun, dan memeriksa tiap eksekusi sebelum diotomatiskan.
- Tambahkan HTTP Request dan periksa body respons, status code, header, dan objek pagination-nya; atur pagination supaya pagination.nextPage memberikan halaman berikutnya selama pagination.hasNext bernilai true.
- Di HTTP Request, aktifkan Retry On Fail untuk respons 429 dan 500 yang sementara, beri cukup percobaan untuk gagal acak, dan tunggu minimal sesuai nilai Retry-After, yaitu dua detik, sebelum mencoba lagi.
- Sambungkan Split Out untuk memecah array data menjadi pesanan satu per satu, lalu pakai IF untuk validasi orderId, customer.email, dan totalCents yang harus berupa angka; pakai Edit Fields (Set) untuk alasan penolakan dan tulis kedua cabangnya ke Data Table masing-masing.
- Untuk bonus, apit penulisan pesanan valid dengan Loop Over Items dan Wait supaya ukuran batch terkendali, lalu pakai workflow Error Trigger terpisah untuk menyimpan nama workflow yang gagal, URL eksekusi, pesan error, dan detail request terakhir saat retry sudah habis.
