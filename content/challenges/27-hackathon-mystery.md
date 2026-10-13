---
number: 27
slug: hackathon-mystery
collection: more
difficulty: advanced
time: 30–45 min
complexity: 4
color: #fffdf6
ink: #1b2427
---

# Solution Data

Internal reference for the solution viewer. This section is not displayed on the challenge page.

## Core Workflow JSON (without bonus)

```json
{
  "name": "The n8n Murder Mystery – Core",
  "nodes": [
    {
      "parameters": {},
      "id": "16b0947c-5e38-4a21-9d07-82f4c6301bae",
      "name": "Open the case file",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/hackathon-case-badge-log.csv",
        "options": {
          "response": {
            "response": {
              "responseFormat": "file",
              "outputPropertyName": "data"
            }
          }
        }
      },
      "id": "a7250fe3-8146-4b09-bd52-c3071e9846fa",
      "name": "Get the badge log",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        -180
      ]
    },
    {
      "parameters": {
        "operation": "csv",
        "binaryPropertyName": "data",
        "options": {
          "headerRow": true
        }
      },
      "id": "5c93b0a7-2d64-4e18-85f1-70b2e9c4138d",
      "name": "Read the badge log",
      "type": "n8n-nodes-base.extractFromFile",
      "typeVersion": 1.1,
      "position": [
        480,
        -180
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
              "id": "c04a7b51-3692-4e8d-b075-2f618ca4903e",
              "leftValue": "={{ $json.door }}",
              "rightValue": "Store room",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            },
            {
              "id": "c1780f9b-edd3-4d6c-8ec3-4770fd3ae06c",
              "leftValue": "={{ $json.direction }}",
              "rightValue": "in",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            },
            {
              "id": "2b85e409-7fa1-4d36-9c20-83e4071bd5fc",
              "leftValue": "={{ $json.time }}",
              "rightValue": "2026-05-16T19:10:00",
              "operator": {
                "type": "dateTime",
                "operation": "afterOrEquals"
              }
            },
            {
              "id": "733dd2b1-627c-4b00-97e6-f8e0876d528b",
              "leftValue": "={{ $json.time }}",
              "rightValue": "2026-05-16T19:40:00",
              "operator": {
                "type": "dateTime",
                "operation": "beforeOrEquals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "e5107b3c-9426-48da-b0f5-371c8690e2b4",
      "name": "In the store room, in the window",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        720,
        -180
      ],
      "notesInFlow": true,
      "notes": "The rig was there at 19:10 and gone by 19:40."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "81c4360e-5b79-4f02-9ad6-24e7013c85bf",
              "name": "name",
              "value": "={{ $json.person }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "3fa0d781-6c25-4e93-8b40-15079ce62ad8",
      "name": "Name from the badge",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        960,
        -180
      ],
      "notesInFlow": true,
      "notes": "Merge matches on a shared field name, so call it name on both sides."
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/hackathon-case-witnesses.json",
        "options": {}
      },
      "id": "cb61047a-83e5-4d29-9f08-6512e703bc4d",
      "name": "Get the people and statements",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        40
      ]
    },
    {
      "parameters": {
        "fieldToSplitOut": "people",
        "options": {}
      },
      "id": "24a56bf2-2a3d-40b0-a4e8-e198045604b2",
      "name": "One item per person",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        480,
        40
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
              "id": "47e9b1c0-253a-4d68-bf71-90c6e8403b2d",
              "leftValue": "={{ $json.lanyard }}",
              "rightValue": "yellow",
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
      "id": "60b83e17-4c90-42d5-a768-c310e4985b7f",
      "name": "Yellow lanyards only",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        720,
        40
      ],
      "notesInFlow": true,
      "notes": "The volunteer saw a yellow lanyard. Three people wear one."
    },
    {
      "parameters": {
        "mode": "combine",
        "combineBy": "combineByFields",
        "fieldsToMatchString": "name",
        "options": {}
      },
      "id": "f4a60b53-9187-4e2c-b0d9-35e81c7a2046",
      "name": "Both at once",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        1200,
        -60
      ],
      "notesInFlow": true,
      "notes": "Only people who are in both lists survive."
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/hackathon-case-parking.csv",
        "options": {
          "response": {
            "response": {
              "responseFormat": "file",
              "outputPropertyName": "data"
            }
          }
        }
      },
      "id": "08db3ca9-61e7-4520-9143-b7c6e0f5a82d",
      "name": "Get the parking records",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        280
      ]
    },
    {
      "parameters": {
        "operation": "csv",
        "binaryPropertyName": "data",
        "options": {
          "headerRow": true
        }
      },
      "id": "b25e9410-7d36-4a08-85cf-612079be34a1",
      "name": "Read the parking records",
      "type": "n8n-nodes-base.extractFromFile",
      "typeVersion": 1.1,
      "position": [
        480,
        280
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
              "id": "3c7e0845-9b12-4de6-a037-58f1c2049b7e",
              "leftValue": "={{ $json.left }}",
              "rightValue": "2026-05-16T19:40:00",
              "operator": {
                "type": "dateTime",
                "operation": "afterOrEquals"
              }
            },
            {
              "id": "99de3fc4-cbf9-4aa9-b636-09bc91ce3e17",
              "leftValue": "={{ $json.left }}",
              "rightValue": "2026-05-16T19:45:00",
              "operator": {
                "type": "dateTime",
                "operation": "beforeOrEquals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "1ae71171-1087-42a2-86b9-fca25db7ad2c",
      "name": "Left in a hurry",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        720,
        280
      ],
      "notesInFlow": true,
      "notes": "The guard saw one car pull out just before quarter to eight."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "5e8724b0-1963-4cad-8f07-20d4e1c5a639",
              "name": "name",
              "value": "={{ $json.owner }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "4cd7f0c0-ce5a-44d1-bbf6-0bb1ffa03bfd",
      "name": "Name from the plate",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        960,
        280
      ]
    },
    {
      "parameters": {
        "mode": "combine",
        "combineBy": "combineByFields",
        "fieldsToMatchString": "name",
        "options": {}
      },
      "id": "d1e5096b-37c4-4218-ba60-849f07e2531c",
      "name": "And the car too",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        1440,
        60
      ],
      "notesInFlow": true,
      "notes": "One name should be left."
    }
  ],
  "connections": {
    "Open the case file": {
      "main": [
        [
          {
            "node": "Get the badge log",
            "type": "main",
            "index": 0
          },
          {
            "node": "Get the people and statements",
            "type": "main",
            "index": 0
          },
          {
            "node": "Get the parking records",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the badge log": {
      "main": [
        [
          {
            "node": "Read the badge log",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Read the badge log": {
      "main": [
        [
          {
            "node": "In the store room, in the window",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "In the store room, in the window": {
      "main": [
        [
          {
            "node": "Name from the badge",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Name from the badge": {
      "main": [
        [
          {
            "node": "Both at once",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the people and statements": {
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
            "node": "Yellow lanyards only",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Yellow lanyards only": {
      "main": [
        [
          {
            "node": "Both at once",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "Get the parking records": {
      "main": [
        [
          {
            "node": "Read the parking records",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Read the parking records": {
      "main": [
        [
          {
            "node": "Left in a hurry",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Left in a hurry": {
      "main": [
        [
          {
            "node": "Name from the plate",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Both at once": {
      "main": [
        [
          {
            "node": "And the car too",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Name from the plate": {
      "main": [
        [
          {
            "node": "And the car too",
            "type": "main",
            "index": 1
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
  "name": "The n8n Murder Mystery – Bonus",
  "nodes": [
    {
      "parameters": {},
      "id": "16b0947c-5e38-4a21-9d07-82f4c6301bae",
      "name": "Open the case file",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/hackathon-case-badge-log.csv",
        "options": {
          "response": {
            "response": {
              "responseFormat": "file",
              "outputPropertyName": "data"
            }
          }
        }
      },
      "id": "a7250fe3-8146-4b09-bd52-c3071e9846fa",
      "name": "Get the badge log",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        -180
      ]
    },
    {
      "parameters": {
        "operation": "csv",
        "binaryPropertyName": "data",
        "options": {
          "headerRow": true
        }
      },
      "id": "5c93b0a7-2d64-4e18-85f1-70b2e9c4138d",
      "name": "Read the badge log",
      "type": "n8n-nodes-base.extractFromFile",
      "typeVersion": 1.1,
      "position": [
        480,
        -180
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
              "id": "c04a7b51-3692-4e8d-b075-2f618ca4903e",
              "leftValue": "={{ $json.door }}",
              "rightValue": "Store room",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            },
            {
              "id": "9f1d8e52-6c03-4b72-a914-5d8017e42b96",
              "leftValue": "={{ $json.direction }}",
              "rightValue": "in",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            },
            {
              "id": "2b85e409-7fa1-4d36-9c20-83e4071bd5fc",
              "leftValue": "={{ $json.time }}",
              "rightValue": "2026-05-16T19:10:00",
              "operator": {
                "type": "dateTime",
                "operation": "afterOrEquals"
              }
            },
            {
              "id": "70d6b3a1-4825-4a93-bf17-c0e29536481a",
              "leftValue": "={{ $json.time }}",
              "rightValue": "2026-05-16T19:40:00",
              "operator": {
                "type": "dateTime",
                "operation": "beforeOrEquals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "e5107b3c-9426-48da-b0f5-371c8690e2b4",
      "name": "In the store room, in the window",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        720,
        -180
      ],
      "notesInFlow": true,
      "notes": "The rig was there at 19:10 and gone by 19:40."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "81c4360e-5b79-4f02-9ad6-24e7013c85bf",
              "name": "name",
              "value": "={{ $json.person }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "3fa0d781-6c25-4e93-8b40-15079ce62ad8",
      "name": "Name from the badge",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        960,
        -180
      ],
      "notesInFlow": true,
      "notes": "Merge matches on a shared field name, so call it name on both sides."
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/hackathon-case-witnesses.json",
        "options": {}
      },
      "id": "cb61047a-83e5-4d29-9f08-6512e703bc4d",
      "name": "Get the people and statements",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        40
      ]
    },
    {
      "parameters": {
        "fieldToSplitOut": "people",
        "options": {}
      },
      "id": "9d350c28-7416-4ba5-80e9-c71a3f0d4e26",
      "name": "One item per person",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        480,
        40
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
              "id": "47e9b1c0-253a-4d68-bf71-90c6e8403b2d",
              "leftValue": "={{ $json.lanyard }}",
              "rightValue": "yellow",
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
      "id": "60b83e17-4c90-42d5-a768-c310e4985b7f",
      "name": "Yellow lanyards only",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        720,
        40
      ],
      "notesInFlow": true,
      "notes": "The volunteer saw a yellow lanyard. Three people wear one."
    },
    {
      "parameters": {
        "mode": "combine",
        "combineBy": "combineByFields",
        "fieldsToMatchString": "name",
        "options": {}
      },
      "id": "f4a60b53-9187-4e2c-b0d9-35e81c7a2046",
      "name": "Both at once",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        1200,
        -60
      ],
      "notesInFlow": true,
      "notes": "Only people who are in both lists survive."
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/hackathon-case-parking.csv",
        "options": {
          "response": {
            "response": {
              "responseFormat": "file",
              "outputPropertyName": "data"
            }
          }
        }
      },
      "id": "08db3ca9-61e7-4520-9143-b7c6e0f5a82d",
      "name": "Get the parking records",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        280
      ]
    },
    {
      "parameters": {
        "operation": "csv",
        "binaryPropertyName": "data",
        "options": {
          "headerRow": true
        }
      },
      "id": "b25e9410-7d36-4a08-85cf-612079be34a1",
      "name": "Read the parking records",
      "type": "n8n-nodes-base.extractFromFile",
      "typeVersion": 1.1,
      "position": [
        480,
        280
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
              "id": "3c7e0845-9b12-4de6-a037-58f1c2049b7e",
              "leftValue": "={{ $json.left }}",
              "rightValue": "2026-05-16T19:40:00",
              "operator": {
                "type": "dateTime",
                "operation": "afterOrEquals"
              }
            },
            {
              "id": "d6f3a11b-0472-4859-b3ea-71c0582046df",
              "leftValue": "={{ $json.left }}",
              "rightValue": "2026-05-16T19:45:00",
              "operator": {
                "type": "dateTime",
                "operation": "beforeOrEquals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "7021ce5b-48a3-4976-80d1-e36b51c7904f",
      "name": "Left in a hurry",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        720,
        280
      ],
      "notesInFlow": true,
      "notes": "The guard saw one car pull out just before quarter to eight."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "5e8724b0-1963-4cad-8f07-20d4e1c5a639",
              "name": "name",
              "value": "={{ $json.owner }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "ac40b2e6-8b75-4310-92e8-07f6b5a31c4e",
      "name": "Name from the plate",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        960,
        280
      ]
    },
    {
      "parameters": {
        "mode": "combine",
        "combineBy": "combineByFields",
        "fieldsToMatchString": "name",
        "options": {}
      },
      "id": "d1e5096b-37c4-4218-ba60-849f07e2531c",
      "name": "And the car too",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        1440,
        60
      ],
      "notesInFlow": true,
      "notes": "One name should be left."
    },
    {
      "parameters": {
        "action": "hash",
        "type": "SHA256",
        "value": "={{ $json.name.toLowerCase() }}",
        "dataPropertyName": "answerHash"
      },
      "id": "2a7c9035-61b8-4ef4-90d2-5c38417b0ea6",
      "name": "Hash the name",
      "type": "n8n-nodes-base.crypto",
      "typeVersion": 1,
      "position": [
        1680,
        60
      ],
      "notesInFlow": true,
      "notes": "Lower case first, so the hash matches the published one."
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
              "id": "bb1997b3-7c95-44bd-b147-662129912b47",
              "leftValue": "={{ $json.answerHash }}",
              "rightValue": "7dbf8936cee769e6cec4d1e6a32dd64a164c184b49d301876a3b124b53e7059e",
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
      "id": "7dd7b818-78d6-4717-89fb-4a1c9ba6df9e",
      "name": "Case closed?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        1920,
        60
      ],
      "notesInFlow": true,
      "notes": "The page publishes the hash, not the name, so nothing is spoiled."
    }
  ],
  "connections": {
    "Open the case file": {
      "main": [
        [
          {
            "node": "Get the badge log",
            "type": "main",
            "index": 0
          },
          {
            "node": "Get the people and statements",
            "type": "main",
            "index": 0
          },
          {
            "node": "Get the parking records",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the badge log": {
      "main": [
        [
          {
            "node": "Read the badge log",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Read the badge log": {
      "main": [
        [
          {
            "node": "In the store room, in the window",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "In the store room, in the window": {
      "main": [
        [
          {
            "node": "Name from the badge",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Name from the badge": {
      "main": [
        [
          {
            "node": "Both at once",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the people and statements": {
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
            "node": "Yellow lanyards only",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Yellow lanyards only": {
      "main": [
        [
          {
            "node": "Both at once",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "Get the parking records": {
      "main": [
        [
          {
            "node": "Read the parking records",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Read the parking records": {
      "main": [
        [
          {
            "node": "Left in a hurry",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Left in a hurry": {
      "main": [
        [
          {
            "node": "Name from the plate",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Both at once": {
      "main": [
        [
          {
            "node": "And the car too",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Name from the plate": {
      "main": [
        [
          {
            "node": "And the car too",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "And the car too": {
      "main": [
        [
          {
            "node": "Hash the name",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Hash the name": {
      "main": [
        [
          {
            "node": "Case closed?",
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
The n8n Murder Mystery

## Summary
A prototype vanished from a hackathon store room. Use the badge log, the parking records and four witness statements to find who took it.

## Concept
Narrowing a list of suspects by matching three separate records on a shared field

## Glossary
- badge log: The record a door system keeps of who went through which door, in which direction, at what time.
- time window: The stretch of time in which something must have happened – here between the last sighting of the rig and the moment it was missed.
- Merge: The n8n node that keeps only the items that appear in both of its inputs, matched on a field they share.
- hash: A fingerprint of a piece of text. The same text always gives the same fingerprint, but the fingerprint cannot be turned back into the text.
- SHA-256: The hashing recipe used here. The page publishes the fingerprint of the answer, so you can check yourself without being told who did it.

## Scenario
- A puzzle evening at a hackathon, where the prize is bragging rights.
- Anyone learning to join data sets that share one field and nothing else.
- Any real investigation that works the same way – which account, which shipment, which build broke it.

## Task
Something went missing at a Lisbon hackathon. Use the witness statements, the door-badge log and the parking records to work out who took it, and have your workflow name a single person.

## Bonus Task
Prove you are right without anyone telling you the answer: hash the name you found and compare it with the fingerprint printed below.

## Nodes
- Manual Trigger
- HTTP Request
- Extract from File
- Filter
- Edit Fields (Set)
- Split Out
- Merge
- Crypto
- IF

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account is needed.
- Three case files, all invented for this challenge: the [badge log](https://n8n-challenges.app/fixtures/hackathon-case-badge-log.csv) and the [parking records](https://n8n-challenges.app/fixtures/hackathon-case-parking.csv) as CSV, and the [people and witness statements](https://n8n-challenges.app/fixtures/hackathon-case-witnesses.json) as JSON.
- Read the four statements before you build anything. They tell you the time window, the lanyard colour and the car – the three filters you are about to write.
- For the bonus, the SHA-256 fingerprint of the culprit's name in lower case is 7dbf8936cee769e6cec4d1e6a32dd64a164c184b49d301876a3b124b53e7059e. Hash your answer and compare.

## Requirements
- The workflow ends with exactly one person, found from the data rather than typed in by hand.
- Each step rules people out for a stated reason: two people were in the store room during the window, only one of those wears a yellow lanyard, and that person's car left the car park minutes later.
- Someone who was in the store room earlier that evening, before the rig went missing, is not accused. Bonus: hashing the name gives exactly the fingerprint printed above.

## Tips
- Start with Manual Trigger and three HTTP Request nodes, one per case file. The two CSV files need Options › Response › Response Format › File, then an Extract from File node each; the JSON one does not.
- Narrow the badge log first: Filter where door equals Store room, direction equals in, and time is at or after 2026-05-16T19:10:00 and at or before 19:40:00. Use the Date & Time comparison type for the two time conditions, not the string one.
- Merge matches on a field that both sides share, and your two lists call the person different things. Add an Edit Fields (Set) on each side that copies person, and later owner, into a field called name.
- Split Out the people list, Filter it down to yellow lanyards, then Merge in Combine mode, matching by the name field. Keep an eye on the item count after each node – that count is the number of suspects still standing.
- Do the same with the parking records, filtering for a car that left between 19:40 and 19:45, and Merge again. For the bonus, add Crypto with the action Hash, type SHA256, over $json.name.toLowerCase(), and compare with IF – lower case matters, because a capital letter produces a completely different fingerprint.

# Spanish

## Title
El misterio del hackathon

## Summary
Un prototipo desapareció del almacén de un hackathon. Usa el registro de accesos, los datos del aparcamiento y cuatro testimonios para descubrir quién se lo llevó.

## Concept
Reducir una lista de sospechosos cruzando tres registros distintos por un campo común

## Glossary
- registro de accesos: Lo que guarda un sistema de puertas sobre quién pasó por cuál, en qué sentido y a qué hora.
- ventana temporal: El tramo de tiempo en el que algo tuvo que ocurrir; aquí, entre la última vez que se vio el prototipo y el momento en que se echó en falta.
- Merge: El nodo de n8n que se queda solo con los ítems que aparecen en sus dos entradas, cruzados por un campo que comparten.
- hash: La huella de un texto. El mismo texto da siempre la misma huella, pero la huella no se puede convertir de vuelta en el texto.
- SHA-256: La receta de hash que se usa aquí. La página publica la huella de la respuesta, para que puedas comprobarla sin que nadie te diga quién fue.

## Scenario
- Una noche de puzles en un hackathon, donde el premio es poder presumir.
- Cualquiera que esté aprendiendo a cruzar conjuntos de datos que comparten un campo y nada más.
- Cualquier investigación real que funcione igual: qué cuenta, qué envío, qué compilación lo rompió.

## Task
Algo desapareció en un hackathon de Lisboa. Usa los testimonios, el registro de accesos y los datos del aparcamiento para averiguar quién se lo llevó, y haz que tu workflow señale a una sola persona.

## Bonus Task
Demuestra que aciertas sin que nadie te dé la respuesta: calcula el hash del nombre que encontraste y compáralo con la huella impresa más abajo.

## Nodes
- Manual Trigger
- HTTP Request
- Extract from File
- Filter
- Edit Fields (Set)
- Split Out
- Merge
- Crypto
- IF

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta.
- Tres archivos del caso, todos inventados para este reto: el [registro de accesos](https://n8n-challenges.app/fixtures/hackathon-case-badge-log.csv) y los [datos del aparcamiento](https://n8n-challenges.app/fixtures/hackathon-case-parking.csv) en CSV, y las [personas y los testimonios](https://n8n-challenges.app/fixtures/hackathon-case-witnesses.json) en JSON.
- Lee los cuatro testimonios antes de construir nada. Te dan la ventana temporal, el color del cordón y el coche: los tres filtros que vas a escribir.
- Para el bonus, la huella SHA-256 del nombre en minúsculas es 7dbf8936cee769e6cec4d1e6a32dd64a164c184b49d301876a3b124b53e7059e. Calcula el hash de tu respuesta y compara.

## Requirements
- El workflow termina con exactamente una persona, encontrada a partir de los datos y no escrita a mano.
- Cada paso descarta gente por un motivo explicable: dos personas estuvieron en el almacén durante la ventana, solo una de ellas lleva cordón amarillo, y su coche salió del aparcamiento minutos después.
- Quien estuvo en el almacén antes, esa misma tarde y antes de la desaparición, no queda acusado. Bonus: el hash del nombre da exactamente la huella impresa arriba.

## Tips
- Empieza con Manual Trigger y tres nodos HTTP Request, uno por archivo. Los dos CSV necesitan Options › Response › Response Format › File y después un Extract from File cada uno; el JSON no.
- Reduce primero el registro de accesos: Filter donde door sea igual a Store room, direction igual a in y time sea igual o posterior a 2026-05-16T19:10:00 e igual o anterior a 19:40:00. Usa el tipo de comparación Date & Time para las dos condiciones de hora, no el de texto.
- Merge cruza por un campo que compartan ambos lados, y tus dos listas llaman a la persona de formas distintas. Añade un Edit Fields (Set) en cada lado que copie person, y más tarde owner, a un campo llamado name.
- Haz Split Out de la lista de personas, fíltrala a cordones amarillos y después Merge en modo Combine, cruzando por el campo name. Vigila el número de ítems después de cada nodo: ese número son los sospechosos que siguen en pie.
- Haz lo mismo con el aparcamiento, filtrando un coche que salió entre las 19:40 y las 19:45, y vuelve a usar Merge. Para el bonus, añade Crypto con la acción Hash, tipo SHA256, sobre $json.name.toLowerCase() y compara con IF: las minúsculas importan, porque una mayúscula da una huella completamente distinta.

# Ukrainian

## Title
Детектив на хакатоні

## Summary
Зі складу на хакатоні зник прототип. Скористайся журналом перепусток, записами паркінгу та чотирма свідченнями, щоб зʼясувати, хто його взяв.

## Concept
Звуження кола підозрюваних через зіставлення трьох різних записів за спільним полем

## Glossary
- журнал перепусток: Те, що система дверей записує про те, хто через які двері, у якому напрямку і о котрій пройшов.
- часове вікно: Проміжок, у який щось мало статися, – тут між останнім разом, коли прототип бачили, і моментом, коли його не стало.
- Merge: Нода n8n, яка лишає тільки ті елементи, що є в обох її входах, зіставлені за спільним полем.
- хеш: Відбиток тексту. Той самий текст завжди дає той самий відбиток, але відбиток назад у текст не перетворити.
- SHA-256: Спосіб хешування, який тут використано. Сторінка публікує відбиток відповіді, щоб можна було перевірити себе, не дізнавшись імені заздалегідь.

## Scenario
- Вечір головоломок на хакатоні, де приз – право похвалитися.
- Будь-хто, хто вчиться зводити набори даних, у яких спільне лише одне поле.
- Будь-яке справжнє розслідування, що працює так само: який акаунт, яка відправка, яка збірка це зламала.

## Task
На хакатоні в Лісабоні дещо зникло. Скористайся свідченнями, журналом перепусток і записами паркінгу, щоб зʼясувати, хто це взяв, і зроби так, щоб воркфлоу назвав одну людину.

## Bonus Task
Доведи свою правоту без підказок: візьми хеш знайденого імені й порівняй його з відбитком, надрукованим нижче.

## Nodes
- Manual Trigger
- HTTP Request
- Extract from File
- Filter
- Edit Fields (Set)
- Split Out
- Merge
- Crypto
- IF

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів не потрібно.
- Три файли справи, усі вигадані для цього завдання: [журнал перепусток](https://n8n-challenges.app/fixtures/hackathon-case-badge-log.csv) і [записи паркінгу](https://n8n-challenges.app/fixtures/hackathon-case-parking.csv) у CSV та [люди і свідчення](https://n8n-challenges.app/fixtures/hackathon-case-witnesses.json) у JSON.
- Прочитай чотири свідчення, перш ніж щось будувати. Вони дають часове вікно, колір стрічки та автомобіль – три фільтри, які ти зараз напишеш.
- Для бонусу відбиток SHA-256 імені винуватця малими літерами – 7dbf8936cee769e6cec4d1e6a32dd64a164c184b49d301876a3b124b53e7059e. Візьми хеш своєї відповіді й порівняй.

## Requirements
- Воркфлоу завершується рівно однією людиною, знайденою з даних, а не вписаною вручну.
- Кожен крок відкидає людей із названої причини: двоє були на складі протягом вікна, лише одна з них носить жовту стрічку, а її автомобіль виїхав із паркінгу за кілька хвилин.
- Той, хто був на складі раніше того вечора, ще до зникнення, не потрапляє під звинувачення. Бонус: хеш імені дає рівно той відбиток, що надруковано вище.

## Tips
- Почни з Manual Trigger і трьох нод HTTP Request – по одній на файл. Двом CSV потрібні Options › Response › Response Format › File і далі по ноді Extract from File; файлу JSON – ні.
- Спершу звузь журнал перепусток: Filter, де door дорівнює Store room, direction дорівнює in, а time не раніше за 2026-05-16T19:10:00 і не пізніше за 19:40:00. Для двох умов із часом бери тип порівняння Date & Time, а не рядковий.
- Merge зіставляє за полем, спільним для обох боків, а твої два списки називають людину по-різному. Додай з кожного боку Edit Fields (Set), який копіює person, а пізніше owner, у поле name.
- Зроби Split Out списку людей, відфільтруй до жовтих стрічок, а потім Merge у режимі Combine із зіставленням за полем name. Слідкуй за кількістю елементів після кожної ноди: це число – скільки підозрюваних ще лишилося.
- Те саме зроби із записами паркінгу, відфільтрувавши авто, яке виїхало між 19:40 і 19:45, і знову застосуй Merge. Для бонусу додай Crypto з дією Hash, типом SHA256 над $json.name.toLowerCase() і порівняй через IF: малі літери мають значення, бо велика літера дає геть інший відбиток.
