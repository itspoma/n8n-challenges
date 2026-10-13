---
number: 26
slug: uptime-alerts
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
  "name": "Uptime Alerts That Don't Cry Wolf – Core",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "minutes",
              "minutesInterval": 5
            }
          ]
        }
      },
      "id": "b6301f84-5c29-4e07-a8d1-740e392cb65a",
      "name": "Every five minutes",
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
              "id": "99f74cde-e697-4f70-b6e6-127d776d173e",
              "name": "sites",
              "value": "={{ [\"https://n8n-challenges.app\", \"https://httpbin.org/status/200\", \"https://the-internet.herokuapp.com/status_codes/500\"] }}",
              "type": "array"
            }
          ]
        },
        "options": {}
      },
      "id": "7c0948da-2e16-4b53-9f87-e0315a6bc24d",
      "name": "The sites I watch",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "The last one always answers 500, so you can see a real failure without breaking anything."
    },
    {
      "parameters": {
        "fieldToSplitOut": "sites",
        "options": {}
      },
      "id": "07d8d20d-d817-4539-bb5d-2cf17cc636a2",
      "name": "One item per site",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        480,
        0
      ]
    },
    {
      "parameters": {
        "url": "={{ $json.sites }}",
        "options": {
          "response": {
            "response": {
              "fullResponse": true,
              "neverError": true
            }
          },
          "timeout": 10000
        }
      },
      "id": "35fb0e97-184a-42dc-b603-9e71c250843f",
      "name": "Check the site",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        720,
        0
      ],
      "notesInFlow": true,
      "notes": "Never Error plus Full Response: a 500 is an answer to read, not a failure to throw."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "90c7a4e2-5183-4f06-be94-2d7105836bca",
              "name": "url",
              "value": "={{ $('One item per site').item.json.sites }}",
              "type": "string"
            },
            {
              "id": "dc5f3d9f-cbfc-4fc2-b920-687f8b6bd40a",
              "name": "up",
              "value": "={{ $json.statusCode < 400 }}",
              "type": "boolean"
            },
            {
              "id": "c604379b-8e21-4d5a-97f0-41a8c2e6035d",
              "name": "statusCode",
              "value": "={{ $json.statusCode }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "aa719c46-0d83-4b27-85e1-6029f4c37b18",
      "name": "Up or down",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        960,
        0
      ]
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "get",
        "dataTableId": {
          "__rl": true,
          "mode": "list",
          "value": "site-status",
          "cachedResultName": "site-status"
        },
        "filters": {
          "conditions": [
            {
              "keyName": "url",
              "condition": "eq",
              "keyValue": "={{ $json.url }}"
            }
          ]
        },
        "returnAll": false,
        "limit": 1
      },
      "id": "edc9de89-6323-4317-8351-b9dedf76c3f9",
      "name": "What we saw last time",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        1200,
        0
      ],
      "alwaysOutputData": true,
      "notesInFlow": true,
      "notes": "Always Output Data: the very first run has nothing stored yet."
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
              "id": "4080436d-95a2-4c5c-9f92-a1a1a407cceb",
              "leftValue": "={{ $('Up or down').item.json.up !== ($json.up ?? $('Up or down').item.json.up) }}",
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
      "id": "cb28047e-9f51-4a63-8720-d6e4019b53ca",
      "name": "Did it change?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        1440,
        -120
      ],
      "notesInFlow": true,
      "notes": "Nothing stored yet counts as no change, so the first run stays quiet."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "de5106a8-4b37-49c2-8e05-72f3c1a9684b",
              "name": "message",
              "value": "={{ $('Up or down').item.json.up ? $('Up or down').item.json.url + ' is back up.' : $('Up or down').item.json.url + ' is DOWN (' + $('Up or down').item.json.statusCode + ').' }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "04a7e362-1c89-4d50-b7f4-98360be5c127",
      "name": "Write the alert",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1680,
        -120
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://ntfy.sh/n8n-uptime-REPLACE-ME",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Title",
              "value": "Uptime"
            },
            {
              "name": "Tags",
              "value": "warning"
            }
          ]
        },
        "sendBody": true,
        "contentType": "raw",
        "rawContentType": "text/plain",
        "body": "={{ $json.message }}",
        "options": {}
      },
      "id": "7b94c518-306e-42af-9d17-5c208be41963",
      "name": "Send the alert",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        1920,
        -120
      ],
      "notesInFlow": true,
      "notes": "Replace the topic with your own hard-to-guess name."
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "upsert",
        "dataTableId": {
          "__rl": true,
          "mode": "list",
          "value": "site-status",
          "cachedResultName": "site-status"
        },
        "filters": {
          "conditions": [
            {
              "keyName": "url",
              "condition": "eq",
              "keyValue": "={{ $('Up or down').item.json.url }}"
            }
          ]
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "url": "={{ $('Up or down').item.json.url }}",
            "up": "={{ $('Up or down').item.json.up }}"
          }
        }
      },
      "id": "93e72bf5-c07e-4b3a-81fb-14762983357a",
      "name": "Remember this state",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        1440,
        120
      ],
      "notesInFlow": true,
      "notes": "Upsert: insert the first time, update every time after."
    }
  ],
  "connections": {
    "Every five minutes": {
      "main": [
        [
          {
            "node": "The sites I watch",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "The sites I watch": {
      "main": [
        [
          {
            "node": "One item per site",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One item per site": {
      "main": [
        [
          {
            "node": "Check the site",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Check the site": {
      "main": [
        [
          {
            "node": "Up or down",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Up or down": {
      "main": [
        [
          {
            "node": "What we saw last time",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "What we saw last time": {
      "main": [
        [
          {
            "node": "Did it change?",
            "type": "main",
            "index": 0
          },
          {
            "node": "Remember this state",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Did it change?": {
      "main": [
        [
          {
            "node": "Write the alert",
            "type": "main",
            "index": 0
          }
        ],
        []
      ]
    },
    "Write the alert": {
      "main": [
        [
          {
            "node": "Send the alert",
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
  "name": "Uptime Alerts That Don't Cry Wolf – Bonus",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "minutes",
              "minutesInterval": 5
            }
          ]
        }
      },
      "id": "b6301f84-5c29-4e07-a8d1-740e392cb65a",
      "name": "Every five minutes",
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
              "id": "48e5b012-93c7-4a6f-bd80-15c2e740a3b9",
              "name": "sites",
              "value": "={{ [\"https://n8n-challenges.app\", \"https://httpbin.org/status/200\", \"https://the-internet.herokuapp.com/status_codes/500\"] }}",
              "type": "array"
            }
          ]
        },
        "options": {}
      },
      "id": "7c0948da-2e16-4b53-9f87-e0315a6bc24d",
      "name": "The sites I watch",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "The last one always answers 500, so you can see a real failure without breaking anything."
    },
    {
      "parameters": {
        "fieldToSplitOut": "sites",
        "options": {}
      },
      "id": "e2847c61-6b35-4109-ad72-5f0c8b31e964",
      "name": "One item per site",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        480,
        0
      ]
    },
    {
      "parameters": {
        "url": "={{ $json.sites }}",
        "options": {
          "response": {
            "response": {
              "fullResponse": true,
              "neverError": true
            }
          },
          "timeout": 10000
        }
      },
      "id": "35fb0e97-184a-42dc-b603-9e71c250843f",
      "name": "Check the site",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        720,
        0
      ],
      "notesInFlow": true,
      "notes": "Never Error plus Full Response: a 500 is an answer to read, not a failure to throw."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "90c7a4e2-5183-4f06-be94-2d7105836bca",
              "name": "url",
              "value": "={{ $('One item per site').item.json.sites }}",
              "type": "string"
            },
            {
              "id": "3553fe92-11a6-4847-b873-b5b0c44c4c36",
              "name": "up",
              "value": "={{ $json.statusCode < 400 }}",
              "type": "boolean"
            },
            {
              "id": "c604379b-8e21-4d5a-97f0-41a8c2e6035d",
              "name": "statusCode",
              "value": "={{ $json.statusCode }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "aa719c46-0d83-4b27-85e1-6029f4c37b18",
      "name": "Up or down",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        960,
        0
      ]
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "get",
        "dataTableId": {
          "__rl": true,
          "mode": "list",
          "value": "site-status",
          "cachedResultName": "site-status"
        },
        "filters": {
          "conditions": [
            {
              "keyName": "url",
              "condition": "eq",
              "keyValue": "={{ $json.url }}"
            }
          ]
        },
        "returnAll": false,
        "limit": 1
      },
      "id": "5d9e13f0-7246-4c85-b93a-08e15724c6bd",
      "name": "What we saw last time",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        1200,
        0
      ],
      "alwaysOutputData": true,
      "notesInFlow": true,
      "notes": "Always Output Data: the very first run has nothing stored yet."
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
              "id": "6f3b8051-29ce-4a74-b0d6-8135e02ac947",
              "leftValue": "={{ $('Up or down').item.json.up !== ($json.up ?? $('Up or down').item.json.up) }}",
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
      "id": "cb28047e-9f51-4a63-8720-d6e4019b53ca",
      "name": "Did it change?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        1440,
        -120
      ],
      "notesInFlow": true,
      "notes": "Nothing stored yet counts as no change, so the first run stays quiet."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "de5106a8-4b37-49c2-8e05-72f3c1a9684b",
              "name": "message",
              "value": "={{ $('Up or down').item.json.up ? $('Up or down').item.json.url + ' is back up.' : $('Up or down').item.json.url + ' is DOWN (' + $('Up or down').item.json.statusCode + ').' }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "04a7e362-1c89-4d50-b7f4-98360be5c127",
      "name": "Write the alert",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1680,
        -120
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://ntfy.sh/n8n-uptime-REPLACE-ME",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Title",
              "value": "Uptime"
            },
            {
              "name": "Tags",
              "value": "warning"
            }
          ]
        },
        "sendBody": true,
        "contentType": "raw",
        "rawContentType": "text/plain",
        "body": "={{ $json.message }}",
        "options": {}
      },
      "id": "7b94c518-306e-42af-9d17-5c208be41963",
      "name": "Send the alert",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        2160,
        0
      ],
      "notesInFlow": true,
      "notes": "Replace the topic with your own hard-to-guess name."
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "upsert",
        "dataTableId": {
          "__rl": true,
          "mode": "list",
          "value": "site-status",
          "cachedResultName": "site-status"
        },
        "filters": {
          "conditions": [
            {
              "keyName": "url",
              "condition": "eq",
              "keyValue": "={{ $('Up or down').item.json.url }}"
            }
          ]
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "url": "={{ $('Up or down').item.json.url }}",
            "up": "={{ $('Up or down').item.json.up }}"
          }
        }
      },
      "id": "f30a6b12-5d72-4e18-b046-91c57e3d820a",
      "name": "Remember this state",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        1440,
        120
      ],
      "notesInFlow": true,
      "notes": "Upsert: insert the first time, update every time after."
    },
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "days",
              "triggerAtHour": 7,
              "triggerAtMinute": 0
            }
          ]
        }
      },
      "id": "afdbb5a5-1acb-4ede-bc5f-0a2faff57053",
      "name": "Once a day",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        0,
        380
      ]
    },
    {
      "parameters": {
        "url": "https://crt.sh/?q=n8n-challenges.app&output=json",
        "options": {
          "timeout": 60000
        }
      },
      "id": "3fa20393-c544-4bdf-b15c-baa21493574f",
      "name": "Certificates on record",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        380
      ],
      "notesInFlow": true,
      "notes": "crt.sh is public but slow: give it a long timeout."
    },
    {
      "parameters": {
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "not_after",
              "order": "descending"
            }
          ]
        },
        "options": {}
      },
      "id": "6a07de23-91c5-4fb8-8e40-7d13520ac96f",
      "name": "Newest certificate first",
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [
        480,
        380
      ]
    },
    {
      "parameters": {
        "maxItems": 1
      },
      "id": "5cdcb237-fd77-4d4f-9e4f-5c03d5e6cffb",
      "name": "Just the current one",
      "type": "n8n-nodes-base.limit",
      "typeVersion": 1,
      "position": [
        720,
        380
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "262a5578-83c2-4554-834f-0844d9adeb9f",
              "name": "daysLeft",
              "value": "={{ Math.floor(DateTime.fromISO($json.not_after).diff($now, 'days').days) }}",
              "type": "number"
            },
            {
              "id": "b7e4051f-23a8-4c69-8d70-15902fb3ce84",
              "name": "message",
              "value": "={{ 'The certificate expires in ' + Math.floor(DateTime.fromISO($json.not_after).diff($now, 'days').days) + ' days, on ' + $json.not_after.slice(0, 10) + '.' }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "cd70924e-3b16-48f5-a0c7-6e2581b9403d",
      "name": "How long is left",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        960,
        380
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
              "id": "827739ee-bbd9-4d4a-965e-2d1ddf6d34ad",
              "leftValue": "={{ $json.daysLeft }}",
              "rightValue": 21,
              "operator": {
                "type": "number",
                "operation": "lte"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "40be9517-8c23-4d06-91fa-57e306c84b2d",
      "name": "Three weeks or less?",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        1200,
        380
      ],
      "notesInFlow": true,
      "notes": "Let's Encrypt stopped emailing expiry warnings in 2025."
    }
  ],
  "connections": {
    "Every five minutes": {
      "main": [
        [
          {
            "node": "The sites I watch",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "The sites I watch": {
      "main": [
        [
          {
            "node": "One item per site",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One item per site": {
      "main": [
        [
          {
            "node": "Check the site",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Check the site": {
      "main": [
        [
          {
            "node": "Up or down",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Up or down": {
      "main": [
        [
          {
            "node": "What we saw last time",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "What we saw last time": {
      "main": [
        [
          {
            "node": "Did it change?",
            "type": "main",
            "index": 0
          },
          {
            "node": "Remember this state",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Did it change?": {
      "main": [
        [
          {
            "node": "Write the alert",
            "type": "main",
            "index": 0
          }
        ],
        []
      ]
    },
    "Write the alert": {
      "main": [
        [
          {
            "node": "Send the alert",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Once a day": {
      "main": [
        [
          {
            "node": "Certificates on record",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Certificates on record": {
      "main": [
        [
          {
            "node": "Newest certificate first",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Newest certificate first": {
      "main": [
        [
          {
            "node": "Just the current one",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Just the current one": {
      "main": [
        [
          {
            "node": "How long is left",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "How long is left": {
      "main": [
        [
          {
            "node": "Three weeks or less?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Three weeks or less?": {
      "main": [
        [
          {
            "node": "Send the alert",
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
Uptime Alerts That Don't Cry Wolf

## Summary
Check your sites every five minutes and get one message when a site goes down and one when it comes back – never the same warning again and again.

## Concept
Keeping state between runs so an alert fires on the change, not on the condition

## Glossary
- status code: The number a web server answers with. Anything under 400 means it worked; 500 and 503 mean the server is in trouble.
- Never Error: An HTTP Request option that lets the node report a bad answer instead of failing the workflow, which is exactly what a monitor needs.
- Full Response: An HTTP Request option that returns the status code and headers, not just the body.
- state: What the workflow remembers between runs. Without it, every check looks like the first one and the alert repeats forever.
- alert fatigue: What happens when a monitor cries wolf every five minutes: people stop reading it, and the real outage is missed.

## Scenario
- A small team running three sites with no budget for a monitoring service.
- An agency that wants to notice a client's site is down before the client phones.
- Any check where only the moment of change matters – a price crossing a threshold, a queue filling up, a door left open.

## Task
Check our websites every five minutes. Alert us once when a site goes down and once when it is back – not every five minutes in between.

## Bonus Task
Warn us three weeks before a site's security certificate expires, so it never lapses unnoticed.

## Nodes
- Schedule Trigger
- Edit Fields (Set)
- Split Out
- HTTP Request
- Data Table
- IF
- Sort
- Limit
- Filter

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account is needed.
- Create a [Data Table](https://docs.n8n.io/data/data-tables/) called site-status with two columns: url as text and up as a boolean. This is where the workflow remembers what it saw last time.
- Test with endpoints built for it: https://httpbin.org/status/200 always answers 200 and https://the-internet.herokuapp.com/status_codes/500 always answers 500, so you can watch both paths without taking anything down.
- To receive the message, use [ntfy.sh](https://ntfy.sh/): pick a hard-to-guess topic name and open https://ntfy.sh/your-topic in a browser or [install the ntfy app](https://docs.ntfy.sh/subscribe/phone/). No account is needed.
- For the bonus, certificate history comes from [crt.sh](https://crt.sh/), which is public, free and slow – it often takes half a minute to answer.

## Requirements
- A site that answers 500 produces exactly one alert, and running the workflow again five minutes later while it is still broken produces none.
- When that site starts answering normally again, one "back up" message arrives, and the stored state matches what was last seen for every site.
- The first ever run sends nothing at all, even though nothing is stored yet, and a site that times out is treated as down rather than crashing the run. Bonus: a certificate with 21 days or fewer left produces a warning naming the expiry date.

## Tips
- Start with Schedule Trigger on a five-minute interval, then Edit Fields (Set) with an array field holding your URLs, then Split Out so each site is its own item.
- In HTTP Request open Options and switch on both Response › Never Error and Response › Full Response, and set a timeout of about 10 seconds. Without Never Error the first 500 stops the whole run; with Full Response you get the statusCode to judge.
- Add Edit Fields (Set) with url, a boolean up set to $json.statusCode < 400, and the statusCode itself. From here on the workflow deals in "up or down", not in HTTP detail.
- Read the last state with Data Table Get Row(s) filtered on url, and turn on Always Output Data in that node – on the very first run there is no row, and without it the item vanishes. Then IF on $('Up or down').item.json.up !== ($json.up ?? $('Up or down').item.json.up): treating "nothing stored" as "no change" is what keeps the first run quiet.
- Write the state back with Data Table Upsert for every site, not only the changed ones, and wire it as a second branch off the lookup so it runs either way. For the bonus, add a daily Schedule Trigger, HTTP Request to https://crt.sh/?q=your-domain&output=json with a 60-second timeout, Sort by not_after descending, Limit to 1, and work out the days left with DateTime.fromISO($json.not_after).diff($now, 'days').days.

# Spanish

## Title
Avisos de caída que no son lobo que viene

## Summary
Comprueba tus sitios cada cinco minutos y recibe un mensaje cuando uno se cae y otro cuando vuelve, sin repetir el mismo aviso una y otra vez.

## Concept
Guardar estado entre ejecuciones para avisar del cambio, no de la condición

## Glossary
- código de estado: El número con el que responde un servidor web. Por debajo de 400 significa que funcionó; 500 y 503 significan que el servidor tiene problemas.
- Never Error: Una opción de HTTP Request que deja al nodo informar de una respuesta mala en vez de tumbar el workflow, que es justo lo que necesita un monitor.
- Full Response: Una opción de HTTP Request que devuelve el código de estado y las cabeceras, no solo el cuerpo.
- estado: Lo que el workflow recuerda entre ejecuciones. Sin eso, cada comprobación parece la primera y el aviso se repite para siempre.
- fatiga de alertas: Lo que pasa cuando un monitor avisa cada cinco minutos: la gente deja de leerlo y se pierde la caída de verdad.

## Scenario
- Un equipo pequeño con tres sitios y sin presupuesto para un servicio de monitorización.
- Una agencia que quiere enterarse de que el sitio de un cliente está caído antes de que llame el cliente.
- Cualquier comprobación en la que solo importa el momento del cambio: un precio que cruza un umbral, una cola que se llena, una puerta que queda abierta.

## Task
Comprueba nuestros sitios web cada cinco minutos. Avísanos una vez cuando uno se caiga y una vez cuando vuelva, no cada cinco minutos mientras tanto.

## Bonus Task
Avísanos tres semanas antes de que caduque el certificado de seguridad de un sitio, para que no expire sin que nadie se dé cuenta.

## Nodes
- Schedule Trigger
- Edit Fields (Set)
- Split Out
- HTTP Request
- Data Table
- IF
- Sort
- Limit
- Filter

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta.
- Crea una [Data Table](https://docs.n8n.io/data/data-tables/) llamada site-status con dos columnas: url como texto y up como booleano. Ahí es donde el workflow recuerda lo que vio la última vez.
- Prueba con endpoints hechos para eso: https://httpbin.org/status/200 responde siempre 200 y https://the-internet.herokuapp.com/status_codes/500 responde siempre 500, así puedes ver los dos caminos sin tirar nada.
- Para recibir el mensaje usa [ntfy.sh](https://ntfy.sh/): elige un nombre de tema difícil de adivinar y abre https://ntfy.sh/tu-tema en el navegador o [instala la app de ntfy](https://docs.ntfy.sh/subscribe/phone/). No hace falta cuenta.
- Para el bonus, el historial de certificados viene de [crt.sh](https://crt.sh/), que es público, gratuito y lento: suele tardar medio minuto en responder.

## Requirements
- Un sitio que responde 500 genera exactamente un aviso, y volver a ejecutar el workflow cinco minutos después, con el sitio aún roto, no genera ninguno.
- Cuando ese sitio vuelve a responder con normalidad llega un mensaje de «vuelve a estar en pie», y el estado guardado coincide con lo último visto para cada sitio.
- La primerísima ejecución no envía nada, aunque todavía no haya nada guardado, y un sitio que agota el tiempo de espera cuenta como caído en vez de romper la ejecución. Bonus: un certificado al que le quedan 21 días o menos genera un aviso con la fecha de caducidad.

## Tips
- Empieza con Schedule Trigger cada cinco minutos, después Edit Fields (Set) con un campo de tipo array con tus URL y luego Split Out para que cada sitio sea un ítem.
- En HTTP Request abre Options y activa Response › Never Error y Response › Full Response, y pon un timeout de unos 10 segundos. Sin Never Error el primer 500 detiene toda la ejecución; con Full Response obtienes el statusCode con el que decidir.
- Añade Edit Fields (Set) con url, un booleano up igual a $json.statusCode < 400 y el propio statusCode. A partir de ahí el workflow habla de «en pie o caído», no de detalles HTTP.
- Lee el estado anterior con Data Table Get Row(s) filtrando por url y activa Always Output Data en ese nodo: en la primerísima ejecución no hay fila y, sin eso, el ítem desaparece. Después un IF sobre $('Up or down').item.json.up !== ($json.up ?? $('Up or down').item.json.up): tratar «nada guardado» como «sin cambios» es lo que mantiene callada la primera ejecución.
- Guarda el estado con Data Table Upsert para todos los sitios, no solo los que cambian, y conéctalo como segunda rama desde la búsqueda para que se ejecute igualmente. Para el bonus, añade un Schedule Trigger diario, HTTP Request a https://crt.sh/?q=tu-dominio&output=json con 60 segundos de timeout, Sort por not_after descendente, Limit a 1 y calcula los días con DateTime.fromISO($json.not_after).diff($now, 'days').days.

# Ukrainian

## Title
Сповіщення про збої, які не кричать «вовк»

## Summary
Перевіряй свої сайти кожні пʼять хвилин і отримуй одне повідомлення, коли сайт падає, і одне, коли він повертається, – без того самого попередження знову й знову.

## Concept
Збереження стану між запусками, щоб сповіщення спрацьовувало на зміну, а не на умову

## Glossary
- код стану: Число, яким відповідає вебсервер. Усе нижче за 400 означає, що все спрацювало; 500 і 503 – що сервер у біді.
- Never Error: Опція HTTP Request, яка дозволяє ноді повідомити про погану відповідь, а не завалити воркфлоу, – саме те, що потрібно монітору.
- Full Response: Опція HTTP Request, яка повертає код стану й заголовки, а не лише тіло відповіді.
- стан: Те, що воркфлоу памʼятає між запусками. Без нього кожна перевірка виглядає як перша, і сповіщення повторюється вічно.
- втома від сповіщень: Те, що стається, коли монітор кричить кожні пʼять хвилин: люди перестають читати – і пропускають справжній збій.

## Scenario
- Невелика команда з трьома сайтами і без бюджету на сервіс моніторингу.
- Агенція, яка хоче дізнатися про падіння сайту клієнта раніше, ніж подзвонить клієнт.
- Будь-яка перевірка, де важливий лише момент зміни: ціна перетнула поріг, черга переповнилася, двері лишилися відчиненими.

## Task
Перевіряй наші сайти кожні пʼять хвилин. Сповісти один раз, коли сайт падає, і один раз, коли він повертається, – а не кожні пʼять хвилин між цим.

## Bonus Task
Попереджай за три тижні до того, як спливе сертифікат безпеки сайту, щоб він ніколи не протермінувався непомітно.

## Nodes
- Schedule Trigger
- Edit Fields (Set)
- Split Out
- HTTP Request
- Data Table
- IF
- Sort
- Limit
- Filter

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів не потрібно.
- Створи [Data Table](https://docs.n8n.io/data/data-tables/) під назвою site-status із двома колонками: url як текст і up як булеве значення. Саме тут воркфлоу памʼятає, що бачив минулого разу.
- Перевіряй на адресах, зроблених для цього: https://httpbin.org/status/200 завжди відповідає 200, а https://the-internet.herokuapp.com/status_codes/500 завжди 500, тож можна побачити обидва шляхи, нічого не ламаючи.
- Щоб отримувати повідомлення, скористайся [ntfy.sh](https://ntfy.sh/): вибери назву теми, яку важко вгадати, і відкрий https://ntfy.sh/твоя-тема у браузері або [встанови застосунок ntfy](https://docs.ntfy.sh/subscribe/phone/). Акаунт не потрібен.
- Для бонусу історія сертифікатів надходить із [crt.sh](https://crt.sh/) – публічного, безкоштовного й повільного: часто він відповідає пів хвилини.

## Requirements
- Сайт, який відповідає 500, дає рівно одне сповіщення, а повторний запуск через пʼять хвилин, поки він усе ще зламаний, не дає жодного.
- Коли цей сайт знову починає відповідати нормально, надходить одне повідомлення «повернувся», а збережений стан збігається з останнім побаченим для кожного сайту.
- Найперший запуск не надсилає нічого, хоча ще нічого не збережено, а сайт, який не вкладається в тайм-аут, вважається недоступним, а не ламає запуск. Бонус: сертифікат, якому лишився 21 день або менше, дає попередження з датою завершення.

## Tips
- Почни зі Schedule Trigger з інтервалом у пʼять хвилин, далі Edit Fields (Set) із полем-масивом твоїх адрес, а потім Split Out, щоб кожен сайт став окремим елементом.
- У HTTP Request відкрий Options і ввімкни Response › Never Error і Response › Full Response, а також постав тайм-аут близько 10 секунд. Без Never Error перша ж 500 спиняє весь запуск; із Full Response ти отримуєш statusCode, за яким приймати рішення.
- Додай Edit Fields (Set) із url, булевим up, що дорівнює $json.statusCode < 400, і самим statusCode. Далі воркфлоу оперує поняттями «працює чи ні», а не подробицями HTTP.
- Прочитай попередній стан через Data Table Get Row(s) із фільтром за url і ввімкни Always Output Data у цій ноді: під час найпершого запуску рядка немає, і без цього елемент просто зникає. Далі IF на $('Up or down').item.json.up !== ($json.up ?? $('Up or down').item.json.up): саме трактування «нічого не збережено» як «змін немає» тримає перший запуск тихим.
- Записуй стан назад через Data Table Upsert для всіх сайтів, а не лише для змінених, і підключи це другою гілкою від пошуку, щоб воно виконувалося у будь-якому разі. Для бонусу додай щоденний Schedule Trigger, HTTP Request на https://crt.sh/?q=твій-домен&output=json із тайм-аутом 60 секунд, Sort за not_after за спаданням, Limit до 1 і порахуй дні через DateTime.fromISO($json.not_after).diff($now, 'days').days.
