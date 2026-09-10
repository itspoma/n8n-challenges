---
number: 4
slug: valencia-citizen-request-classifier
difficulty: intermediate
time: 30–40 min
complexity: 3
color: #a9d96c
ink: #1b2427
---

# Solution Data

Internal reference for solution rendering and workflow comparison. This section is not displayed on the challenge page.

## Core Workflow JSON (without bonus)

```json
{
  "name": "Challenge 4 – Valencia Citizen Request Classifier",
  "nodes": [
    {
      "parameters": {
        "authentication": "none",
        "formTitle": "Valencia citizen request",
        "formDescription": "Tell the Valencia service desk what needs attention.",
        "formFields": {
          "values": [
            {
              "fieldLabel": "Name",
              "fieldName": "name",
              "fieldType": "text",
              "placeholder": "Ana García",
              "requiredField": true
            },
            {
              "fieldLabel": "Email",
              "fieldName": "email",
              "fieldType": "email",
              "placeholder": "ana@example.com",
              "requiredField": true
            },
            {
              "fieldLabel": "Request",
              "fieldName": "request",
              "fieldType": "textarea",
              "placeholder": "Describe the issue and where it is happening.",
              "requiredField": true
            }
          ]
        },
        "responseMode": "lastNode",
        "options": {
          "path": "valencia-citizen-request",
          "buttonLabel": "Send request"
        }
      },
      "id": "40000000-0000-4000-8000-000000000001",
      "name": "Collect citizen request",
      "type": "n8n-nodes-base.formTrigger",
      "typeVersion": 2.5,
      "position": [
        -900,
        0
      ],
      "webhookId": "40000000-0000-4000-8000-000000000002",
      "notesInFlow": true,
      "notes": "Collects the required name, email, and request fields. Use only fictional test data."
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ \"Classify the citizen request for Valencia.\\n\\nCATEGORY POLICY\\n- waste: rubbish, recycling, bins, or collection.\\n- noise: noise or another sound disturbance.\\n- roads: roads, pavements, traffic, potholes, or access.\\n- parks: parks, public green spaces, or public trees.\\n- other: use when no category is clear.\\n- If more than one category appears, choose the main reported issue.\\n\\nPRIORITY POLICY\\n- high: an explicit immediate danger, blocked access, or serious active risk.\\n- medium: a service problem that needs timely action but is not an immediate danger.\\n- low: a general, informational, or non-urgent request.\\n- An unclear request must be other/low unless it explicitly states an immediate risk; then use other/high.\\n\\nWrite summary as one concise sentence.\\n\\nREFERENCE FIXTURES\\n- The rubbish bin on Calle de la Paz was not collected this morning. => waste/medium\\n- A deep sinkhole has opened in the road and cars are swerving into oncoming traffic. => roads/high\\n- Something near my street needs attention. => other/low\\n\\nReturn only the fields required by the connected output parser.\" + '\\n\\nCITIZEN NAME: ' + $json.name + '\\nCITIZEN REQUEST: ' + $json.request }}",
        "hasOutputParser": true,
        "needsFallback": false
      },
      "id": "40000000-0000-4000-8000-000000000003",
      "name": "Classify request",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1.9,
      "position": [
        -620,
        0
      ],
      "notesInFlow": true,
      "notes": "Applies the documented category, priority, ambiguity, and fixture rules."
    },
    {
      "parameters": {
        "model": {
          "__rl": true,
          "value": "gpt-5-mini",
          "mode": "list",
          "cachedResultName": "gpt-5-mini"
        },
        "responsesApiEnabled": true,
        "builtInTools": {},
        "options": {
          "reasoningEffort": "low"
        }
      },
      "id": "40000000-0000-4000-8000-000000000004",
      "name": "OpenAI Chat Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.3,
      "position": [
        -690,
        260
      ],
      "notesInFlow": true,
      "notes": "Select an OpenAI credential after importing. No API key is stored in this workflow."
    },
    {
      "parameters": {
        "schemaType": "manual",
        "inputSchema": "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"category\": {\n      \"type\": \"string\",\n      \"enum\": [\n        \"waste\",\n        \"noise\",\n        \"roads\",\n        \"parks\",\n        \"other\"\n      ],\n      \"description\": \"The single team category selected by the category policy.\"\n    },\n    \"priority\": {\n      \"type\": \"string\",\n      \"enum\": [\n        \"low\",\n        \"medium\",\n        \"high\"\n      ],\n      \"description\": \"The urgency selected by the priority policy.\"\n    },\n    \"summary\": {\n      \"type\": \"string\",\n      \"description\": \"One concise sentence summarizing the request.\"\n    }\n  },\n  \"required\": [\n    \"category\",\n    \"priority\",\n    \"summary\"\n  ],\n  \"additionalProperties\": false\n}",
        "autoFix": false
      },
      "id": "40000000-0000-4000-8000-000000000005",
      "name": "Structured Output Parser",
      "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
      "typeVersion": 1.3,
      "position": [
        -420,
        260
      ],
      "notesInFlow": true,
      "notes": "Requires category, priority, and summary."
    },
    {
      "parameters": {
        "mode": "rules",
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "40100000-0000-4000-8000-000000000001",
                    "leftValue": "={{ $json.category }}",
                    "rightValue": "waste",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "waste"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "40100000-0000-4000-8000-000000000002",
                    "leftValue": "={{ $json.category }}",
                    "rightValue": "noise",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "noise"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "40100000-0000-4000-8000-000000000003",
                    "leftValue": "={{ $json.category }}",
                    "rightValue": "roads",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "roads"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "40100000-0000-4000-8000-000000000004",
                    "leftValue": "={{ $json.category }}",
                    "rightValue": "parks",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "parks"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "40100000-0000-4000-8000-000000000005",
                    "leftValue": "={{ $json.category }}",
                    "rightValue": "other",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "other"
            }
          ]
        },
        "options": {
          "fallbackOutput": "none",
          "allMatchingOutputs": false
        }
      },
      "id": "40000000-0000-4000-8000-000000000006",
      "name": "Route by category",
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3.4,
      "position": [
        -300,
        0
      ],
      "notesInFlow": true,
      "notes": "Routes the parser's category to exactly one of the five approved support destinations."
    },
    {
      "parameters": {
        "resource": "email",
        "operation": "send",
        "fromEmail": "Challenge 4 <replace-with-verified-sender@example.com>",
        "toEmail": "replace+waste@example.com",
        "subject": "={{ '[Request ' + $execution.id + '] ' + $json.category + ' / ' + $json.priority }}",
        "emailFormat": "text",
        "text": "={{ 'Request ID: ' + $execution.id + '\\nCategory: ' + $json.category + '\\nPriority: ' + $json.priority + '\\nSummary: ' + $json.summary + '\\n\\nName: ' + $('Collect citizen request').item.json.name + '\\nEmail: ' + $('Collect citizen request').item.json.email + '\\nOriginal request:\\n' + $('Collect citizen request').item.json.request }}",
        "options": {
          "appendAttribution": false
        }
      },
      "id": "40400000-0000-4000-8000-000000000001",
      "name": "Email waste team",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2.1,
      "position": [
        100,
        -320
      ],
      "notesInFlow": true,
      "notes": "Select the Resend SMTP credential and replace replace+waste@example.com with the approved waste test address."
    },
    {
      "parameters": {
        "resource": "email",
        "operation": "send",
        "fromEmail": "Challenge 4 <replace-with-verified-sender@example.com>",
        "toEmail": "replace+noise@example.com",
        "subject": "={{ '[Request ' + $execution.id + '] ' + $json.category + ' / ' + $json.priority }}",
        "emailFormat": "text",
        "text": "={{ 'Request ID: ' + $execution.id + '\\nCategory: ' + $json.category + '\\nPriority: ' + $json.priority + '\\nSummary: ' + $json.summary + '\\n\\nName: ' + $('Collect citizen request').item.json.name + '\\nEmail: ' + $('Collect citizen request').item.json.email + '\\nOriginal request:\\n' + $('Collect citizen request').item.json.request }}",
        "options": {
          "appendAttribution": false
        }
      },
      "id": "40400000-0000-4000-8000-000000000002",
      "name": "Email noise team",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2.1,
      "position": [
        100,
        -160
      ],
      "notesInFlow": true,
      "notes": "Select the Resend SMTP credential and replace replace+noise@example.com with the approved noise test address."
    },
    {
      "parameters": {
        "resource": "email",
        "operation": "send",
        "fromEmail": "Challenge 4 <replace-with-verified-sender@example.com>",
        "toEmail": "replace+roads@example.com",
        "subject": "={{ '[Request ' + $execution.id + '] ' + $json.category + ' / ' + $json.priority }}",
        "emailFormat": "text",
        "text": "={{ 'Request ID: ' + $execution.id + '\\nCategory: ' + $json.category + '\\nPriority: ' + $json.priority + '\\nSummary: ' + $json.summary + '\\n\\nName: ' + $('Collect citizen request').item.json.name + '\\nEmail: ' + $('Collect citizen request').item.json.email + '\\nOriginal request:\\n' + $('Collect citizen request').item.json.request }}",
        "options": {
          "appendAttribution": false
        }
      },
      "id": "40400000-0000-4000-8000-000000000003",
      "name": "Email roads team",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2.1,
      "position": [
        100,
        0
      ],
      "notesInFlow": true,
      "notes": "Select the Resend SMTP credential and replace replace+roads@example.com with the approved roads test address."
    },
    {
      "parameters": {
        "resource": "email",
        "operation": "send",
        "fromEmail": "Challenge 4 <replace-with-verified-sender@example.com>",
        "toEmail": "replace+parks@example.com",
        "subject": "={{ '[Request ' + $execution.id + '] ' + $json.category + ' / ' + $json.priority }}",
        "emailFormat": "text",
        "text": "={{ 'Request ID: ' + $execution.id + '\\nCategory: ' + $json.category + '\\nPriority: ' + $json.priority + '\\nSummary: ' + $json.summary + '\\n\\nName: ' + $('Collect citizen request').item.json.name + '\\nEmail: ' + $('Collect citizen request').item.json.email + '\\nOriginal request:\\n' + $('Collect citizen request').item.json.request }}",
        "options": {
          "appendAttribution": false
        }
      },
      "id": "40400000-0000-4000-8000-000000000004",
      "name": "Email parks team",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2.1,
      "position": [
        100,
        160
      ],
      "notesInFlow": true,
      "notes": "Select the Resend SMTP credential and replace replace+parks@example.com with the approved parks test address."
    },
    {
      "parameters": {
        "resource": "email",
        "operation": "send",
        "fromEmail": "Challenge 4 <replace-with-verified-sender@example.com>",
        "toEmail": "replace+other@example.com",
        "subject": "={{ '[Request ' + $execution.id + '] ' + $json.category + ' / ' + $json.priority }}",
        "emailFormat": "text",
        "text": "={{ 'Request ID: ' + $execution.id + '\\nCategory: ' + $json.category + '\\nPriority: ' + $json.priority + '\\nSummary: ' + $json.summary + '\\n\\nName: ' + $('Collect citizen request').item.json.name + '\\nEmail: ' + $('Collect citizen request').item.json.email + '\\nOriginal request:\\n' + $('Collect citizen request').item.json.request }}",
        "options": {
          "appendAttribution": false
        }
      },
      "id": "40400000-0000-4000-8000-000000000005",
      "name": "Email other team",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2.1,
      "position": [
        100,
        320
      ],
      "notesInFlow": true,
      "notes": "Select the Resend SMTP credential and replace replace+other@example.com with the approved other test address."
    },
    {
      "parameters": {
        "resource": "email",
        "operation": "send",
        "fromEmail": "Challenge 4 <replace-with-verified-sender@example.com>",
        "toEmail": "={{ $('Collect citizen request').item.json.email }}",
        "subject": "={{ 'We received request ' + $execution.id }}",
        "emailFormat": "text",
        "text": "={{ 'Hello ' + $('Collect citizen request').item.json.name + ',\\n\\nWe received your request.\\nRequest ID: ' + $execution.id + '\\nCategory: ' + $('Classify request').item.json.category + '\\nPriority: ' + $('Classify request').item.json.priority + '\\nSummary: ' + $('Classify request').item.json.summary + '\\n\\n' + 'Valencia service desk' }}",
        "options": {
          "appendAttribution": false
        }
      },
      "id": "40000000-0000-4000-8000-000000000007",
      "name": "Confirm receipt",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2.1,
      "position": [
        430,
        0
      ],
      "notesInFlow": true,
      "notes": "Uses the same execution ID as the support email so the two messages can be matched."
    }
  ],
  "pinData": {},
  "connections": {
    "Collect citizen request": {
      "main": [
        [
          {
            "node": "Classify request",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "Classify request",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Structured Output Parser": {
      "ai_outputParser": [
        [
          {
            "node": "Classify request",
            "type": "ai_outputParser",
            "index": 0
          }
        ]
      ]
    },
    "Classify request": {
      "main": [
        [
          {
            "node": "Route by category",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Route by category": {
      "main": [
        [
          {
            "node": "Email waste team",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Email noise team",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Email roads team",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Email parks team",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Email other team",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Email waste team": {
      "main": [
        [
          {
            "node": "Confirm receipt",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Email noise team": {
      "main": [
        [
          {
            "node": "Confirm receipt",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Email roads team": {
      "main": [
        [
          {
            "node": "Confirm receipt",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Email parks team": {
      "main": [
        [
          {
            "node": "Confirm receipt",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Email other team": {
      "main": [
        [
          {
            "node": "Confirm receipt",
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
  "versionId": "40c00000-0000-4000-8000-000000000001",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "tags": []
}
```

## Bonus Workflow JSON

```json
{
  "name": "Challenge 4 – Valencia Citizen Request Classifier (Bonus)",
  "nodes": [
    {
      "parameters": {
        "authentication": "none",
        "formTitle": "Valencia citizen request",
        "formDescription": "Tell the Valencia service desk what needs attention.",
        "formFields": {
          "values": [
            {
              "fieldLabel": "Name",
              "fieldName": "name",
              "fieldType": "text",
              "placeholder": "Ana García",
              "requiredField": true
            },
            {
              "fieldLabel": "Email",
              "fieldName": "email",
              "fieldType": "email",
              "placeholder": "ana@example.com",
              "requiredField": true
            },
            {
              "fieldLabel": "Request",
              "fieldName": "request",
              "fieldType": "textarea",
              "placeholder": "Describe the issue and where it is happening.",
              "requiredField": true
            }
          ]
        },
        "responseMode": "lastNode",
        "options": {
          "path": "valencia-citizen-request",
          "buttonLabel": "Send request"
        }
      },
      "id": "40000000-0000-4000-8000-000000000001",
      "name": "Collect citizen request",
      "type": "n8n-nodes-base.formTrigger",
      "typeVersion": 2.5,
      "position": [
        -900,
        0
      ],
      "webhookId": "40000000-0000-4000-8000-000000000002",
      "notesInFlow": true,
      "notes": "Collects the required name, email, and request fields. Use only fictional test data."
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ \"Classify the citizen request for Valencia.\\n\\nCATEGORY POLICY\\n- waste: rubbish, recycling, bins, or collection.\\n- noise: noise or another sound disturbance.\\n- roads: roads, pavements, traffic, potholes, or access.\\n- parks: parks, public green spaces, or public trees.\\n- other: use when no category is clear.\\n- If more than one category appears, choose the main reported issue.\\n\\nPRIORITY POLICY\\n- high: an explicit immediate danger, blocked access, or serious active risk.\\n- medium: a service problem that needs timely action but is not an immediate danger.\\n- low: a general, informational, or non-urgent request.\\n- An unclear request must be other/low unless it explicitly states an immediate risk; then use other/high.\\n\\nWrite summary as one concise sentence.\\n\\nREFERENCE FIXTURES\\n- The rubbish bin on Calle de la Paz was not collected this morning. => waste/medium\\n- A deep sinkhole has opened in the road and cars are swerving into oncoming traffic. => roads/high\\n- Something near my street needs attention. => other/low\\n\\nReturn only the fields required by the connected output parser.\\n\\nAlso write suggestedReply as one or two helpful sentences that acknowledge receipt without promising a resolution date. Use the dominant language of the citizen's request. If the language is unclear, use English.\" + '\\n\\nCITIZEN NAME: ' + $json.name + '\\nCITIZEN REQUEST: ' + $json.request }}",
        "hasOutputParser": true,
        "needsFallback": false
      },
      "id": "40000000-0000-4000-8000-000000000003",
      "name": "Classify request",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1.9,
      "position": [
        -620,
        0
      ],
      "notesInFlow": true,
      "notes": "Applies the documented category, priority, ambiguity, and fixture rules."
    },
    {
      "parameters": {
        "model": {
          "__rl": true,
          "value": "gpt-5-mini",
          "mode": "list",
          "cachedResultName": "gpt-5-mini"
        },
        "responsesApiEnabled": true,
        "builtInTools": {},
        "options": {
          "reasoningEffort": "low"
        }
      },
      "id": "40000000-0000-4000-8000-000000000004",
      "name": "OpenAI Chat Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.3,
      "position": [
        -690,
        260
      ],
      "notesInFlow": true,
      "notes": "Select an OpenAI credential after importing. No API key is stored in this workflow."
    },
    {
      "parameters": {
        "schemaType": "manual",
        "inputSchema": "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"category\": {\n      \"type\": \"string\",\n      \"enum\": [\n        \"waste\",\n        \"noise\",\n        \"roads\",\n        \"parks\",\n        \"other\"\n      ],\n      \"description\": \"The single team category selected by the category policy.\"\n    },\n    \"priority\": {\n      \"type\": \"string\",\n      \"enum\": [\n        \"low\",\n        \"medium\",\n        \"high\"\n      ],\n      \"description\": \"The urgency selected by the priority policy.\"\n    },\n    \"summary\": {\n      \"type\": \"string\",\n      \"description\": \"One concise sentence summarizing the request.\"\n    },\n    \"suggestedReply\": {\n      \"type\": \"string\",\n      \"description\": \"A short acknowledgement in the request language, or English if unclear.\"\n    }\n  },\n  \"required\": [\n    \"category\",\n    \"priority\",\n    \"summary\",\n    \"suggestedReply\"\n  ],\n  \"additionalProperties\": false\n}",
        "autoFix": false
      },
      "id": "40000000-0000-4000-8000-000000000005",
      "name": "Structured Output Parser",
      "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
      "typeVersion": 1.3,
      "position": [
        -420,
        260
      ],
      "notesInFlow": true,
      "notes": "Requires category, priority, summary, and suggestedReply."
    },
    {
      "parameters": {
        "mode": "rules",
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "40100000-0000-4000-8000-000000000001",
                    "leftValue": "={{ $json.category }}",
                    "rightValue": "waste",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "waste"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "40100000-0000-4000-8000-000000000002",
                    "leftValue": "={{ $json.category }}",
                    "rightValue": "noise",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "noise"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "40100000-0000-4000-8000-000000000003",
                    "leftValue": "={{ $json.category }}",
                    "rightValue": "roads",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "roads"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "40100000-0000-4000-8000-000000000004",
                    "leftValue": "={{ $json.category }}",
                    "rightValue": "parks",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "parks"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "40100000-0000-4000-8000-000000000005",
                    "leftValue": "={{ $json.category }}",
                    "rightValue": "other",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "other"
            }
          ]
        },
        "options": {
          "fallbackOutput": "none",
          "allMatchingOutputs": false
        }
      },
      "id": "40000000-0000-4000-8000-000000000006",
      "name": "Route by category",
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3.4,
      "position": [
        -300,
        0
      ],
      "notesInFlow": true,
      "notes": "Routes the parser's category to exactly one of the five approved support destinations."
    },
    {
      "parameters": {
        "resource": "email",
        "operation": "send",
        "fromEmail": "Challenge 4 <replace-with-verified-sender@example.com>",
        "toEmail": "replace+waste@example.com",
        "subject": "={{ '[Request ' + $execution.id + '] ' + $json.category + ' / ' + $json.priority }}",
        "emailFormat": "text",
        "text": "={{ 'Request ID: ' + $execution.id + '\\nCategory: ' + $json.category + '\\nPriority: ' + $json.priority + '\\nSummary: ' + $json.summary + '\\n\\nName: ' + $('Collect citizen request').item.json.name + '\\nEmail: ' + $('Collect citizen request').item.json.email + '\\nOriginal request:\\n' + $('Collect citizen request').item.json.request }}",
        "options": {
          "appendAttribution": false
        }
      },
      "id": "40400000-0000-4000-8000-000000000001",
      "name": "Email waste team",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2.1,
      "position": [
        100,
        -320
      ],
      "notesInFlow": true,
      "notes": "Select the Resend SMTP credential and replace replace+waste@example.com with the approved waste test address."
    },
    {
      "parameters": {
        "resource": "email",
        "operation": "send",
        "fromEmail": "Challenge 4 <replace-with-verified-sender@example.com>",
        "toEmail": "replace+noise@example.com",
        "subject": "={{ '[Request ' + $execution.id + '] ' + $json.category + ' / ' + $json.priority }}",
        "emailFormat": "text",
        "text": "={{ 'Request ID: ' + $execution.id + '\\nCategory: ' + $json.category + '\\nPriority: ' + $json.priority + '\\nSummary: ' + $json.summary + '\\n\\nName: ' + $('Collect citizen request').item.json.name + '\\nEmail: ' + $('Collect citizen request').item.json.email + '\\nOriginal request:\\n' + $('Collect citizen request').item.json.request }}",
        "options": {
          "appendAttribution": false
        }
      },
      "id": "40400000-0000-4000-8000-000000000002",
      "name": "Email noise team",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2.1,
      "position": [
        100,
        -160
      ],
      "notesInFlow": true,
      "notes": "Select the Resend SMTP credential and replace replace+noise@example.com with the approved noise test address."
    },
    {
      "parameters": {
        "resource": "email",
        "operation": "send",
        "fromEmail": "Challenge 4 <replace-with-verified-sender@example.com>",
        "toEmail": "replace+roads@example.com",
        "subject": "={{ '[Request ' + $execution.id + '] ' + $json.category + ' / ' + $json.priority }}",
        "emailFormat": "text",
        "text": "={{ 'Request ID: ' + $execution.id + '\\nCategory: ' + $json.category + '\\nPriority: ' + $json.priority + '\\nSummary: ' + $json.summary + '\\n\\nName: ' + $('Collect citizen request').item.json.name + '\\nEmail: ' + $('Collect citizen request').item.json.email + '\\nOriginal request:\\n' + $('Collect citizen request').item.json.request }}",
        "options": {
          "appendAttribution": false
        }
      },
      "id": "40400000-0000-4000-8000-000000000003",
      "name": "Email roads team",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2.1,
      "position": [
        100,
        0
      ],
      "notesInFlow": true,
      "notes": "Select the Resend SMTP credential and replace replace+roads@example.com with the approved roads test address."
    },
    {
      "parameters": {
        "resource": "email",
        "operation": "send",
        "fromEmail": "Challenge 4 <replace-with-verified-sender@example.com>",
        "toEmail": "replace+parks@example.com",
        "subject": "={{ '[Request ' + $execution.id + '] ' + $json.category + ' / ' + $json.priority }}",
        "emailFormat": "text",
        "text": "={{ 'Request ID: ' + $execution.id + '\\nCategory: ' + $json.category + '\\nPriority: ' + $json.priority + '\\nSummary: ' + $json.summary + '\\n\\nName: ' + $('Collect citizen request').item.json.name + '\\nEmail: ' + $('Collect citizen request').item.json.email + '\\nOriginal request:\\n' + $('Collect citizen request').item.json.request }}",
        "options": {
          "appendAttribution": false
        }
      },
      "id": "40400000-0000-4000-8000-000000000004",
      "name": "Email parks team",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2.1,
      "position": [
        100,
        160
      ],
      "notesInFlow": true,
      "notes": "Select the Resend SMTP credential and replace replace+parks@example.com with the approved parks test address."
    },
    {
      "parameters": {
        "resource": "email",
        "operation": "send",
        "fromEmail": "Challenge 4 <replace-with-verified-sender@example.com>",
        "toEmail": "replace+other@example.com",
        "subject": "={{ '[Request ' + $execution.id + '] ' + $json.category + ' / ' + $json.priority }}",
        "emailFormat": "text",
        "text": "={{ 'Request ID: ' + $execution.id + '\\nCategory: ' + $json.category + '\\nPriority: ' + $json.priority + '\\nSummary: ' + $json.summary + '\\n\\nName: ' + $('Collect citizen request').item.json.name + '\\nEmail: ' + $('Collect citizen request').item.json.email + '\\nOriginal request:\\n' + $('Collect citizen request').item.json.request }}",
        "options": {
          "appendAttribution": false
        }
      },
      "id": "40400000-0000-4000-8000-000000000005",
      "name": "Email other team",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2.1,
      "position": [
        100,
        320
      ],
      "notesInFlow": true,
      "notes": "Select the Resend SMTP credential and replace replace+other@example.com with the approved other test address."
    },
    {
      "parameters": {
        "resource": "email",
        "operation": "send",
        "fromEmail": "Challenge 4 <replace-with-verified-sender@example.com>",
        "toEmail": "={{ $('Collect citizen request').item.json.email }}",
        "subject": "={{ 'We received request ' + $execution.id }}",
        "emailFormat": "text",
        "text": "={{ 'Hello ' + $('Collect citizen request').item.json.name + ',\\n\\nWe received your request.\\nRequest ID: ' + $execution.id + '\\nCategory: ' + $('Classify request').item.json.category + '\\nPriority: ' + $('Classify request').item.json.priority + '\\nSummary: ' + $('Classify request').item.json.summary + '\\n\\nSuggested reply:\\n' + $('Classify request').item.json.suggestedReply + '\\n\\nValencia service desk' }}",
        "options": {
          "appendAttribution": false
        }
      },
      "id": "40000000-0000-4000-8000-000000000007",
      "name": "Confirm with suggested reply",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2.1,
      "position": [
        430,
        0
      ],
      "notesInFlow": true,
      "notes": "Uses the same execution ID as the support email and includes the language-aware suggested reply."
    }
  ],
  "pinData": {},
  "connections": {
    "Collect citizen request": {
      "main": [
        [
          {
            "node": "Classify request",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "Classify request",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Structured Output Parser": {
      "ai_outputParser": [
        [
          {
            "node": "Classify request",
            "type": "ai_outputParser",
            "index": 0
          }
        ]
      ]
    },
    "Classify request": {
      "main": [
        [
          {
            "node": "Route by category",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Route by category": {
      "main": [
        [
          {
            "node": "Email waste team",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Email noise team",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Email roads team",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Email parks team",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Email other team",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Email waste team": {
      "main": [
        [
          {
            "node": "Confirm with suggested reply",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Email noise team": {
      "main": [
        [
          {
            "node": "Confirm with suggested reply",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Email roads team": {
      "main": [
        [
          {
            "node": "Confirm with suggested reply",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Email parks team": {
      "main": [
        [
          {
            "node": "Confirm with suggested reply",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Email other team": {
      "main": [
        [
          {
            "node": "Confirm with suggested reply",
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
  "versionId": "40b00000-0000-4000-8000-000000000001",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "tags": []
}
```

# English

## Title
Get City Problems to the Right People

## Summary
Use an AI model to sort a citizen request by topic and urgency, send it to the responsible team, and confirm receipt.

## Concept
Structured AI output, branching, and email delivery

## Scenario
- A city support desk receives requests about different services and needs consistent triage before review.
- An event help desk wants to separate accessibility, venue, and schedule questions automatically.
- A community inbox needs to identify urgent requests before routine messages.

## Task
Valencia's service desk needs every submitted request categorized by topic and priority, summarized for staff, sent to the responsible team, and acknowledged with a reference number.

## Bonus Task
Include a suggested reply, written in the same language as the request, in the confirmation email. If the language is unclear, use English.

## Nodes
- Form Trigger
- Basic LLM Chain
- OpenAI Chat Model
- Structured Output Parser
- Switch
- Send Email

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open an existing n8n workspace, then create a new workflow.
- [Create an OpenAI account](https://platform.openai.com/signup), [create an API key](https://platform.openai.com/api-keys), and follow the [n8n OpenAI credential instructions](https://docs.n8n.io/integrations/builtin/credentials/openai/). Store the key only in an n8n credential.
- [Sign up for Resend](https://resend.com/signup), then follow Resend's [SMTP instructions](https://resend.com/docs/send-with-smtp) and the [n8n Send Email credential instructions](https://docs.n8n.io/integrations/builtin/credentials/send-email/). Store the Resend API key as the SMTP password, never in the workflow.
- Prepare five mentor-approved test inboxes or aliases and map them as waste → `replace+waste@example.com`, noise → `replace+noise@example.com`, roads → `replace+roads@example.com`, parks → `replace+parks@example.com`, and other → `replace+other@example.com`. Replace every placeholder before testing and use only approved addresses.
- Prepare these test requests: normal – “The rubbish bin on Calle de la Paz was not collected this morning.” should produce waste/medium; urgent – “A deep sinkhole has opened in the road and cars are swerving into oncoming traffic.” should produce roads/high; ambiguous – “Something near my street needs attention.” should produce other/low. Do not use real citizen data.

## Requirements
- Every complete name, email, and request submission produces category, priority, and summary; category is only waste, noise, roads, parks, or other, and priority is only low, medium, or high. An unclear request uses other and low unless it states an immediate risk.
- Each category sends a support email to its mapped test destination containing the original submission, the AI result, and a request ID.
- The sender receives a separate confirmation email with the same request ID, and the normal, urgent, and ambiguous fixtures produce their specified results.

## Tips
- Start with Form Trigger – the node that creates the public form – and add required name, email, and request fields. Submit one test entry so later nodes can see the sample data.
- Add Basic LLM Chain next and attach OpenAI Chat Model – the node that reads the request. In the prompt, define the allowed values, the ambiguous-request rule, and the three test fixtures.
- Connect Structured Output Parser – the node that forces named fields – and define category, priority, and summary. For the bonus workflow, also require suggestedReply in the request's language with English as the fallback.
- Add Switch – the node that sends data down a matching branch – with outputs for waste, noise, roads, parks, and other. Connect each output to its matching test address.
- Finish with Send Email nodes: send the original request and AI result to the support alias, converge the five branches on a separate confirmation email to the sender, use the n8n execution ID as the request ID, and run all three fixtures.

# Spanish

## Title
Lleva los problemas de la ciudad a quien pueda resolverlos

## Summary
Usa un modelo de IA para ordenar una solicitud ciudadana por tema y urgencia, enviarla al equipo responsable y confirmar su recepción.

## Concept
Salida estructurada de IA, ramificación y envío de emails

## Scenario
- Un servicio municipal recibe solicitudes sobre distintos temas y necesita clasificarlas antes de revisarlas.
- El equipo de ayuda de un evento quiere separar automáticamente preguntas de accesibilidad, espacio y horario.
- Un buzón comunitario necesita identificar solicitudes urgentes antes que los mensajes rutinarios.

## Task
El servicio de atención de Valencia necesita que cada solicitud recibida se clasifique por tema y prioridad, se resuma para el personal, se envíe al equipo responsable y se confirme con un número de referencia.

## Bonus Task
Incluye en el email de confirmación una respuesta sugerida escrita en el mismo idioma que la solicitud. Si el idioma no está claro, usa inglés.

## Nodes
- Form Trigger
- Basic LLM Chain
- OpenAI Chat Model
- Structured Output Parser
- Switch
- Send Email

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre un espacio de n8n existente y crea un workflow nuevo.
- [Crea una cuenta de OpenAI](https://platform.openai.com/signup), [crea una clave de API](https://platform.openai.com/api-keys) y sigue las [instrucciones de credenciales de OpenAI para n8n](https://docs.n8n.io/integrations/builtin/credentials/openai/). Guarda la clave únicamente en una credencial de n8n.
- [Regístrate en Resend](https://resend.com/signup), sigue las [instrucciones SMTP de Resend](https://resend.com/docs/send-with-smtp) y las [instrucciones de credenciales de Send Email para n8n](https://docs.n8n.io/integrations/builtin/credentials/send-email/). Guarda la clave de API de Resend como contraseña SMTP, nunca en el workflow.
- Prepara cinco buzones o alias de prueba aprobados por un mentor y asígnalos como waste → `replace+waste@example.com`, noise → `replace+noise@example.com`, roads → `replace+roads@example.com`, parks → `replace+parks@example.com` y other → `replace+other@example.com`. Sustituye todos los marcadores antes de probar y usa solo direcciones aprobadas.
- Prepara estas solicitudes: normal – «No han recogido el contenedor de la calle de la Paz esta mañana.» debe producir waste/medium; urgente – «Se ha abierto un socavón profundo en la calzada y los coches invaden el carril contrario.» debe producir roads/high; ambigua – «Hay algo cerca de mi calle que necesita atención.» debe producir other/low. No uses datos reales de ciudadanos.

## Requirements
- Cada envío completo de nombre, email y solicitud produce category, priority y summary; category solo puede ser waste, noise, roads, parks u other, y priority solo puede ser low, medium o high. Una solicitud poco clara usa other y low, salvo que indique un riesgo inmediato.
- Cada categoría envía un email de soporte a su destino de prueba asignado con el envío original, el resultado de la IA y un ID de solicitud.
- La persona remitente recibe un email de confirmación separado con el mismo ID de solicitud, y los casos normal, urgente y ambiguo producen los resultados especificados.

## Tips
- Empieza con Form Trigger – el nodo que crea el formulario público – y añade los campos obligatorios name, email y request. Envía una prueba para que los nodos posteriores puedan ver los datos de ejemplo.
- Añade después Basic LLM Chain y conecta OpenAI Chat Model – el nodo que lee la solicitud. Define en el prompt los valores permitidos, la regla para solicitudes ambiguas y los tres casos de prueba.
- Conecta Structured Output Parser – el nodo que obliga a devolver campos con nombre – y define category, priority y summary. Para el workflow extra, exige también suggestedReply en el idioma de la solicitud, con inglés como alternativa.
- Añade Switch – el nodo que envía los datos por la rama correspondiente – con salidas para waste, noise, roads, parks y other. Conecta cada salida a su dirección de prueba.
- Termina con nodos Send Email: envía la solicitud original y el resultado de la IA al alias de soporte, une las cinco ramas en un email de confirmación separado para la persona remitente, usa el ID de ejecución de n8n como ID de solicitud y ejecuta los tres casos.

# Ukrainian

## Title
Передай міські проблеми тим, хто їх вирішить

## Summary
Використайте модель ШІ, щоб упорядкувати звернення мешканця за темою й терміновістю, надіслати його відповідальній команді та підтвердити отримання.

## Concept
Структурований результат ШІ, розгалуження та надсилання електронної пошти

## Scenario
- Міська служба підтримки отримує звернення щодо різних послуг і потребує послідовного сортування перед розглядом.
- Служба підтримки події хоче автоматично розділяти запитання про доступність, місце проведення та розклад.
- Скринька спільноти має визначати термінові звернення раніше за звичайні повідомлення.

## Task
Службі підтримки Валенсії потрібно, щоб кожне отримане звернення було класифіковане за темою та пріоритетом, стисло описане для працівників, надіслане відповідальній команді й підтверджене довідковим номером.

## Bonus Task
Додайте до листа-підтвердження запропоновану відповідь тією самою мовою, якою написано звернення. Якщо мову визначити неможливо, використайте англійську.

## Nodes
- Form Trigger
- Basic LLM Chain
- OpenAI Chat Model
- Structured Output Parser
- Switch
- Send Email

## Preparation
- [Зареєструйтеся в n8n Cloud](/n8n-sign-up) або відкрийте наявний воркспейс n8n, а потім створіть новий воркфлоу.
- [Створіть обліковий запис OpenAI](https://platform.openai.com/signup), [створіть API-ключ](https://platform.openai.com/api-keys) і виконайте [інструкції n8n щодо облікових даних OpenAI](https://docs.n8n.io/integrations/builtin/credentials/openai/). Зберігайте ключ лише в облікових даних n8n.
- [Зареєструйтеся в Resend](https://resend.com/signup), виконайте [інструкції Resend для SMTP](https://resend.com/docs/send-with-smtp) та [інструкції n8n для облікових даних Send Email](https://docs.n8n.io/integrations/builtin/credentials/send-email/). Зберігайте API-ключ Resend як пароль SMTP, а не у воркфлоу.
- Підготуйте п’ять тестових скриньок або псевдонімів, схвалених ментором, і зіставте їх так: waste → `replace+waste@example.com`, noise → `replace+noise@example.com`, roads → `replace+roads@example.com`, parks → `replace+parks@example.com`, other → `replace+other@example.com`. Перед тестуванням замініть усі заповнювачі й використовуйте лише схвалені адреси.
- Підготуйте такі звернення: звичайне – «Сьогодні вранці не вивезли сміття з контейнера на вулиці де ла Пас.» має дати waste/medium; термінове – «На дорозі утворилося глибоке провалля, і автомобілі виїжджають на зустрічну смугу.» має дати roads/high; неоднозначне – «Щось біля моєї вулиці потребує уваги.» має дати other/low. Не використовуйте справжні дані мешканців.

## Requirements
- Кожне повне подання імені, електронної адреси та звернення створює category, priority і summary; category може бути лише waste, noise, roads, parks або other, а priority – лише low, medium або high. Для неясного звернення використовується other і low, якщо в ньому не вказано безпосередню небезпеку.
- Кожна категорія надсилає лист службі підтримки на відповідну тестову адресу з початковим поданням, результатом ШІ та ID звернення.
- Відправник отримує окремий лист-підтвердження з тим самим ID звернення, а звичайний, терміновий і неоднозначний тестові випадки дають указані результати.

## Tips
- Почніть із Form Trigger – ноди, яка створює публічну форму – і додайте обов’язкові поля name, email та request. Надішліть тестову заявку, щоб наступні ноди побачили приклад даних.
- Далі додайте Basic LLM Chain і підключіть OpenAI Chat Model – ноду, яка читає звернення. У запиті вкажіть дозволені значення, правило для неоднозначних звернень і три тестові випадки.
- Підключіть Structured Output Parser – ноду, яка вимагає іменовані поля – і визначте category, priority та summary. Для додаткового воркфлоу також вимагайте suggestedReply мовою звернення з англійською як запасним варіантом.
- Додайте Switch – ноду, яка надсилає дані відповідною гілкою – з виходами waste, noise, roads, parks і other. Підключіть кожен вихід до відповідної тестової адреси.
- Завершіть нодами Send Email: надішліть початкове звернення й результат ШІ на адресу служби підтримки, об’єднайте п’ять гілок в окремому листі-підтвердженні відправнику, використайте ID виконання n8n як ID звернення та запустіть усі три тестові випадки.

# Indonesian

## Title
Sampaikan Masalah Kota ke Orang yang Tepat

## Summary
Pakai model AI untuk memilah laporan warga berdasarkan topik dan urgensi, kirim ke tim yang bertanggung jawab, dan konfirmasi penerimaannya.

## Concept
Output AI terstruktur, percabangan, dan pengiriman email

## Scenario
- Meja layanan kota menerima laporan tentang berbagai layanan dan butuh pemilahan yang konsisten sebelum ditinjau.
- Help desk acara ingin memisahkan pertanyaan soal aksesibilitas, venue, dan jadwal secara otomatis.
- Inbox komunitas perlu mengenali laporan mendesak sebelum pesan-pesan rutin.

## Task
Meja layanan Valencia butuh setiap laporan yang masuk dikategorikan berdasarkan topik dan prioritas, diringkas untuk petugas, dikirim ke tim yang bertanggung jawab, dan dikonfirmasi dengan nomor referensi.

## Bonus Task
Sertakan usulan balasan, ditulis dalam bahasa yang sama dengan laporannya, di email konfirmasi. Kalau bahasanya tidak jelas, pakai bahasa Inggris.

## Nodes
- Form Trigger
- Basic LLM Chain
- OpenAI Chat Model
- Structured Output Parser
- Switch
- Send Email

## Preparation
- [Daftar n8n Cloud](/n8n-sign-up) atau buka workspace n8n yang sudah ada, lalu buat workflow baru.
- [Buat akun OpenAI](https://platform.openai.com/signup), [buat API key](https://platform.openai.com/api-keys), dan ikuti [petunjuk credential OpenAI di n8n](https://docs.n8n.io/integrations/builtin/credentials/openai/). Simpan key-nya hanya di credential n8n.
- [Daftar Resend](https://resend.com/signup), lalu ikuti [petunjuk SMTP Resend](https://resend.com/docs/send-with-smtp) dan [petunjuk credential Send Email di n8n](https://docs.n8n.io/integrations/builtin/credentials/send-email/). Simpan API key Resend sebagai password SMTP, jangan pernah di dalam workflow.
- Siapkan lima inbox atau alias uji yang sudah disetujui mentor dan petakan seperti ini: waste → `replace+waste@example.com`, noise → `replace+noise@example.com`, roads → `replace+roads@example.com`, parks → `replace+parks@example.com`, dan other → `replace+other@example.com`. Ganti semua placeholder sebelum uji coba dan pakai hanya alamat yang disetujui.
- Siapkan laporan uji berikut: normal – “The rubbish bin on Calle de la Paz was not collected this morning.” harus menghasilkan waste/medium; mendesak – “A deep sinkhole has opened in the road and cars are swerving into oncoming traffic.” harus menghasilkan roads/high; ambigu – “Something near my street needs attention.” harus menghasilkan other/low. Jangan pakai data warga sungguhan.

## Requirements
- Setiap kiriman lengkap dengan name, email, dan request menghasilkan category, priority, dan summary; category hanya boleh waste, noise, roads, parks, atau other, dan priority hanya boleh low, medium, atau high. Laporan yang tidak jelas memakai other dan low, kecuali menyebutkan risiko yang mendesak.
- Setiap category mengirim email dukungan ke alamat uji yang dipetakan untuknya, berisi kiriman asli, hasil AI, dan request ID.
- Pengirim menerima email konfirmasi terpisah dengan request ID yang sama, dan ketiga laporan uji (normal, mendesak, ambigu) menghasilkan hasil yang sudah ditentukan.

## Tips
- Mulai dari Form Trigger – node yang membuat form publik – dan tambahkan field wajib name, email, dan request. Kirim satu entri uji supaya node berikutnya bisa melihat contoh datanya.
- Lanjutkan dengan Basic LLM Chain dan pasang OpenAI Chat Model – node yang membaca laporannya. Di prompt, tentukan nilai yang diizinkan, aturan untuk laporan ambigu, dan tiga laporan uji tadi.
- Sambungkan Structured Output Parser – node yang memaksa output punya field bernama – dan definisikan category, priority, dan summary. Untuk workflow bonus, wajibkan juga suggestedReply dalam bahasa laporannya dengan bahasa Inggris sebagai cadangan.
- Tambahkan Switch – node yang mengarahkan data ke cabang yang cocok – dengan output untuk waste, noise, roads, parks, dan other. Sambungkan tiap output ke alamat uji yang sesuai.
- Tutup dengan node Send Email: kirim laporan asli dan hasil AI ke alias dukungan, satukan kelima cabang ke satu email konfirmasi terpisah untuk pengirim, pakai execution ID n8n sebagai request ID, lalu jalankan ketiga laporan uji.
