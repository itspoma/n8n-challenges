---
number: 16
slug: password-leak-check
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
  "name": "Has My Password Leaked? – Core",
  "nodes": [
    {
      "parameters": {
        "authentication": "none",
        "formTitle": "Has this password leaked?",
        "formDescription": "Only the first five characters of the password's hash are sent to Have I Been Pwned. The password itself never leaves this n8n.",
        "formFields": {
          "values": [
            {
              "fieldLabel": "Password",
              "fieldName": "password",
              "fieldType": "password",
              "requiredField": true
            }
          ]
        },
        "responseMode": "lastNode",
        "options": {
          "path": "password-check",
          "buttonLabel": "Check"
        }
      },
      "id": "75e8eb94-a9f7-533c-b275-4799e33eccaa",
      "name": "Password check",
      "type": "n8n-nodes-base.formTrigger",
      "typeVersion": 2.5,
      "position": [
        0,
        0
      ],
      "webhookId": "b7895228-4a8a-5221-a23e-47200429a0ce"
    },
    {
      "parameters": {
        "action": "hash",
        "type": "SHA1",
        "value": "={{ $json.password }}",
        "dataPropertyName": "sha1",
        "encoding": "hex"
      },
      "id": "ca61843d-76be-594c-a125-c29fe07f59b7",
      "name": "Hash the password",
      "type": "n8n-nodes-base.crypto",
      "typeVersion": 2,
      "position": [
        240,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "6fcdb5e8-f4cc-5820-875a-d0abc996847d",
              "name": "prefix",
              "value": "={{ $json.sha1.toUpperCase().slice(0, 5) }}",
              "type": "string"
            },
            {
              "id": "c7532e9b-4f3a-51bd-8065-2c4607ab5792",
              "name": "suffix",
              "value": "={{ $json.sha1.toUpperCase().slice(5) }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "6883a59b-8d39-5924-bf10-6ec166358023",
      "name": "Split the hash",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        480,
        0
      ],
      "notesInFlow": true,
      "notes": "Keeps only the two hash parts, so the password and the full hash stop here."
    },
    {
      "parameters": {
        "url": "=https://api.pwnedpasswords.com/range/{{ $json.prefix }}",
        "options": {
          "response": {
            "response": {
              "responseFormat": "text",
              "outputPropertyName": "data"
            }
          }
        }
      },
      "id": "fb55316d-3f00-54f3-851e-2341011f10f1",
      "name": "Ask Have I Been Pwned",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        720,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "b9652dce-56a2-5692-a942-72fe2599943a",
              "name": "lines",
              "value": "={{ $json.data.split('\\n') }}",
              "type": "array"
            }
          ]
        },
        "options": {}
      },
      "id": "fb0a220c-7050-59e1-806e-1ead68380362",
      "name": "Split into lines",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        960,
        0
      ]
    },
    {
      "parameters": {
        "fieldToSplitOut": "lines",
        "options": {
          "destinationFieldName": "line"
        }
      },
      "id": "5e504a89-1ce6-5204-b6ef-f92461b09925",
      "name": "One line per item",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
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
              "id": "d0d8b886-6574-5e6d-a8a1-72306e783bbe",
              "leftValue": "={{ $json.line }}",
              "rightValue": "={{ $('Split the hash').first().json.suffix }}",
              "operator": {
                "type": "string",
                "operation": "startsWith"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "77587e5c-655e-5ec2-addf-7dd5ba1c9b6d",
      "name": "Only our suffix",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        1440,
        0
      ],
      "alwaysOutputData": true,
      "notesInFlow": true,
      "notes": "Always Output Data is on, so an empty item continues when nothing matches."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "d9da8d9a-6e92-5856-893f-41e526bbd2be",
              "name": "count",
              "value": "={{ $json.line ? Number($json.line.split(':')[1].trim()) : 0 }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "c23f02f8-370a-58fe-a542-f9c01fe24457",
      "name": "Count the breaches",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1680,
        0
      ]
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "text",
        "completionTitle": "={{ $json.count > 0 ? 'Change this password' : 'No leak found' }}",
        "completionMessage": "={{ $json.count > 0 ? 'This password has appeared ' + $json.count.toLocaleString('en-US') + ' times in known data breaches. Never use it again.' : 'This password does not appear in any known breach. Keep it unique and keep it secret.' }}",
        "options": {}
      },
      "id": "4cdf8cbe-8160-5afa-82fe-37f756355ee2",
      "name": "Show the result",
      "type": "n8n-nodes-base.form",
      "typeVersion": 2.5,
      "position": [
        1920,
        0
      ]
    }
  ],
  "connections": {
    "Password check": {
      "main": [
        [
          {
            "node": "Hash the password",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Hash the password": {
      "main": [
        [
          {
            "node": "Split the hash",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Split the hash": {
      "main": [
        [
          {
            "node": "Ask Have I Been Pwned",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Ask Have I Been Pwned": {
      "main": [
        [
          {
            "node": "Split into lines",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Split into lines": {
      "main": [
        [
          {
            "node": "One line per item",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One line per item": {
      "main": [
        [
          {
            "node": "Only our suffix",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Only our suffix": {
      "main": [
        [
          {
            "node": "Count the breaches",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Count the breaches": {
      "main": [
        [
          {
            "node": "Show the result",
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
  "name": "Has My Password Leaked? – Bonus",
  "nodes": [
    {
      "parameters": {
        "authentication": "none",
        "formTitle": "Create your account",
        "formDescription": "Only the first five characters of the password's hash are sent to Have I Been Pwned. The password itself never leaves this n8n.",
        "formFields": {
          "values": [
            {
              "fieldLabel": "Email",
              "fieldName": "email",
              "fieldType": "email",
              "placeholder": "ana@example.com",
              "requiredField": true
            },
            {
              "fieldLabel": "Password",
              "fieldName": "password",
              "fieldType": "password",
              "requiredField": true
            }
          ]
        },
        "responseMode": "lastNode",
        "options": {
          "path": "sign-up",
          "buttonLabel": "Create account"
        }
      },
      "id": "cb7af666-d9d2-55f2-ba74-4bde00cb41ac",
      "name": "Sign-up form",
      "type": "n8n-nodes-base.formTrigger",
      "typeVersion": 2.5,
      "position": [
        0,
        0
      ],
      "webhookId": "894fff08-c893-5969-8a07-505a179d296f"
    },
    {
      "parameters": {
        "action": "hash",
        "type": "SHA1",
        "value": "={{ $json.password }}",
        "dataPropertyName": "sha1",
        "encoding": "hex"
      },
      "id": "bf282868-a10c-585c-ba93-71a88cf493d7",
      "name": "Hash the password",
      "type": "n8n-nodes-base.crypto",
      "typeVersion": 2,
      "position": [
        240,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "05fd30b2-0151-5686-9114-6088a585d3ed",
              "name": "prefix",
              "value": "={{ $json.sha1.toUpperCase().slice(0, 5) }}",
              "type": "string"
            },
            {
              "id": "f8060be1-ec6c-5850-a918-cffa5b7add5e",
              "name": "suffix",
              "value": "={{ $json.sha1.toUpperCase().slice(5) }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "03b79b56-78c6-590b-92d8-efdbdacb4b21",
      "name": "Split the hash",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        480,
        0
      ],
      "notesInFlow": true,
      "notes": "Keeps only the two hash parts, so the password and the full hash stop here."
    },
    {
      "parameters": {
        "url": "=https://api.pwnedpasswords.com/range/{{ $json.prefix }}",
        "options": {
          "response": {
            "response": {
              "responseFormat": "text",
              "outputPropertyName": "data"
            }
          }
        }
      },
      "id": "e94a1d77-81fa-5d0d-b68b-c51370f9b558",
      "name": "Ask Have I Been Pwned",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        720,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "c5dc2d57-235a-5ad4-b4ac-01b65f240e18",
              "name": "lines",
              "value": "={{ $json.data.split('\\n') }}",
              "type": "array"
            }
          ]
        },
        "options": {}
      },
      "id": "6717a429-1981-5f2d-a802-8217cc270140",
      "name": "Split into lines",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        960,
        0
      ]
    },
    {
      "parameters": {
        "fieldToSplitOut": "lines",
        "options": {
          "destinationFieldName": "line"
        }
      },
      "id": "8269eb86-0157-5bec-af12-b28c041a0762",
      "name": "One line per item",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
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
              "id": "b13f3e9e-050d-5ed1-b683-075415be0dee",
              "leftValue": "={{ $json.line }}",
              "rightValue": "={{ $('Split the hash').first().json.suffix }}",
              "operator": {
                "type": "string",
                "operation": "startsWith"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "615e9ba2-75e4-5209-8a7e-803915896ab0",
      "name": "Only our suffix",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        1440,
        0
      ],
      "alwaysOutputData": true,
      "notesInFlow": true,
      "notes": "Always Output Data is on, so an empty item continues when nothing matches."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "2d54b735-4c9c-55fe-bea9-8cd8d0c0547b",
              "name": "count",
              "value": "={{ $json.line ? Number($json.line.split(':')[1].trim()) : 0 }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "19f5e341-7edc-5d0f-b559-8c5ca3290822",
      "name": "Count the breaches",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1680,
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
              "id": "58368403-e7de-55ff-8ebf-1fec306aca61",
              "leftValue": "={{ $json.count }}",
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
      "id": "28eaa47b-2ab0-5cfd-80bf-84b7d2c56b82",
      "name": "Leaked?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        1920,
        0
      ]
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "text",
        "completionTitle": "Change this password",
        "completionMessage": "={{ 'This password has appeared ' + $json.count.toLocaleString('en-US') + ' times in known data breaches. Never use it again.' }}",
        "options": {}
      },
      "id": "f92b8a37-0e1c-5783-961b-1452645c8cf7",
      "name": "Choose another password",
      "type": "n8n-nodes-base.form",
      "typeVersion": 2.5,
      "position": [
        2160,
        -140
      ]
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "insert",
        "dataTableId": {
          "__rl": true,
          "value": "accounts",
          "mode": "name"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "email": "={{ $('Sign-up form').first().json.email }}",
            "password_hash": "={{ $('Sign-up form').first().json.password.hash('sha256') }}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "email",
              "displayName": "email",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "password_hash",
              "displayName": "password_hash",
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
      "id": "b0877519-491d-5e78-93b2-3c8827e4c9d8",
      "name": "Save the account",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        2160,
        140
      ],
      "notesInFlow": true,
      "notes": "Requires an accounts Data Table with email and password_hash columns. The password itself is never stored."
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "text",
        "completionTitle": "Account created",
        "completionMessage": "={{ 'Welcome, ' + $('Sign-up form').first().json.email + '. Your password has not appeared in any known breach.' }}",
        "options": {}
      },
      "id": "d433863f-74b9-55d2-869e-21991aa77a47",
      "name": "Account created",
      "type": "n8n-nodes-base.form",
      "typeVersion": 2.5,
      "position": [
        2400,
        140
      ]
    }
  ],
  "connections": {
    "Sign-up form": {
      "main": [
        [
          {
            "node": "Hash the password",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Hash the password": {
      "main": [
        [
          {
            "node": "Split the hash",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Split the hash": {
      "main": [
        [
          {
            "node": "Ask Have I Been Pwned",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Ask Have I Been Pwned": {
      "main": [
        [
          {
            "node": "Split into lines",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Split into lines": {
      "main": [
        [
          {
            "node": "One line per item",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One line per item": {
      "main": [
        [
          {
            "node": "Only our suffix",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Only our suffix": {
      "main": [
        [
          {
            "node": "Count the breaches",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Count the breaches": {
      "main": [
        [
          {
            "node": "Leaked?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Leaked?": {
      "main": [
        [
          {
            "node": "Choose another password",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Save the account",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Save the account": {
      "main": [
        [
          {
            "node": "Account created",
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
Has My Password Leaked?

## Summary
Build a form that tells you whether a password has appeared in a known data breach – without the password ever leaving your n8n.

## Concept
Hashing with the Crypto node and privacy by design: send a service only what it needs

## Glossary
- data breach: A leak of a website's user database, often including passwords, which attackers then try on other sites.
- hash: A fixed-length fingerprint computed from text. The same input always gives the same hash, but the hash cannot be turned back into the text.
- SHA-1: A widely used hashing algorithm. Have I Been Pwned indexes its leaked passwords by their SHA-1 hash.
- k-anonymity: A privacy technique: you send only a short prefix shared by hundreds of hashes, so the service cannot tell which one you were checking.
- SHA-256: A stronger hashing algorithm, used in the bonus for the stored fingerprint.
- Data Table: n8n's built-in table for storing rows inside your workspace, without an external database.

## Scenario
- An IT team that lets colleagues check a password before they use it anywhere.
- A sign-up form that refuses passwords already found in data breaches.
- Any check against an external service where the raw data must stay private.

## Task
Give people a simple form where they type a password and learn whether it has shown up in a known data breach, and how many times. Never send the password itself anywhere, and never save it.

## Bonus Task
Turn the form into a sign-up form with an email address. If the password has leaked, say how many times and ask for another one. If it is clean, save the email and a hash of the password – never the password – in a Data Table and confirm the account.

## Nodes
- n8n Form Trigger
- Crypto
- Edit Fields (Set)
- HTTP Request
- Split Out
- Filter
- IF
- Data Table
- n8n Form

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account or key is needed.
- The check uses the [Pwned Passwords API](https://haveibeenpwned.com/API/v3#PwnedPasswords) from Have I Been Pwned. It is free, needs no key and works by k-anonymity: you send only the first five characters of the password's SHA-1 hash to https://api.pwnedpasswords.com/range/XXXXX and get back every matching hash suffix with its count. Test with the password `password` – seen tens of millions of times – and with a long random string, which should return no match.
- For the bonus, create a [Data Table](https://docs.n8n.io/build/work-with-data/data-tables) named accounts with the columns email and password_hash (both text).
- In the workflow's Settings, set Save successful production executions to Do not save, so the form input is not kept in your execution history.

## Requirements
- Typing a leaked password such as `password` shows a result page saying it has appeared in breaches, with the number of times (more than 50 million); a long random password shows that no breach contains it.
- The execution shows that the request to Have I Been Pwned contains only the first five characters of the hash, and no node after the hashing step still carries the password.
- Bonus: with a clean password, the accounts Data Table gets a new row with the email and a SHA-256 hash, never the password; with a leaked password, nothing is saved and the form asks for another one.

## Tips
- Start with n8n Form Trigger: one field with the label Password and the type Password. Set Respond When to Workflow Finishes, so a later n8n Form node can show the result.
- Add Crypto with Action Hash, Type SHA1, Value {{ $json.Password }} (or the label you used) and a property name such as sha1. Hashing turns the password into a fixed 40-character fingerprint that cannot be turned back.
- Add Edit Fields (Set) with prefix = {{ $json.sha1.toUpperCase().slice(0, 5) }} and suffix = {{ $json.sha1.toUpperCase().slice(5) }}, and leave Include Other Input Fields off – from here on, the password and the full hash are gone. Then HTTP Request: GET https://api.pwnedpasswords.com/range/{{ $json.prefix }} with Response Format set to Text.
- The response is one text block with lines like SUFFIX:COUNT. Use Edit Fields (Set) to make an array field lines = {{ $json.data.split('\n') }}, Split Out on lines, then Filter where the line starts with {{ $('Edit Fields').first().json.suffix }}. Turn on Always Output Data in the Filter's settings, so an empty item continues when nothing matches.
- Add Edit Fields (Set) with count = {{ $json.line ? Number($json.line.split(':')[1].trim()) : 0 }} and finish with n8n Form (Form Ending) whose title and text use {{ $json.count }}. For the bonus, add IF with count > 0: the true branch shows a Form Ending asking for another password; the false branch inserts into Data Table (the email and {{ $('n8n Form Trigger').first().json.Password.hash('sha256') }}) and then shows Account created.

# Spanish

## Title
¿Se ha filtrado mi contraseña?

## Summary
Crea un formulario que te diga si una contraseña ha aparecido en una filtración de datos conocida, sin que la contraseña salga nunca de tu n8n.

## Concept
Hashing con el nodo Crypto y privacidad desde el diseño: envía a un servicio solo lo que necesita

## Glossary
- filtración de datos: Una fuga de la base de datos de usuarios de un sitio web, a menudo con contraseñas, que los atacantes prueban después en otros sitios.
- hash: Una huella de longitud fija calculada a partir de un texto. La misma entrada siempre da el mismo hash, pero el hash no se puede convertir de nuevo en el texto.
- SHA-1: Un algoritmo de hashing muy usado. Have I Been Pwned indexa sus contraseñas filtradas por su hash SHA-1.
- k-anonimato: Una técnica de privacidad: envías solo un prefijo corto que comparten cientos de hashes, así el servicio no puede saber cuál estabas comprobando.
- SHA-256: Un algoritmo de hashing más fuerte, usado en el bonus para la huella que se guarda.
- Data Table: La tabla integrada de n8n para guardar filas dentro de tu espacio de trabajo, sin una base de datos externa.

## Scenario
- Un equipo de IT que permite a los compañeros comprobar una contraseña antes de usarla en cualquier sitio.
- Un formulario de registro que rechaza contraseñas ya encontradas en filtraciones de datos.
- Cualquier comprobación contra un servicio externo en la que los datos originales deben seguir siendo privados.

## Task
Ofrece a las personas un formulario sencillo donde escriban una contraseña y sepan si ha aparecido en alguna filtración de datos conocida y cuántas veces. Nunca envíes la contraseña a ningún sitio y nunca la guardes.

## Bonus Task
Convierte el formulario en un registro con dirección de correo. Si la contraseña se ha filtrado, indica cuántas veces y pide otra. Si está limpia, guarda el correo y un hash de la contraseña – nunca la contraseña – en una Data Table y confirma la cuenta.

## Nodes
- n8n Form Trigger
- Crypto
- Edit Fields (Set)
- HTTP Request
- Split Out
- Filter
- IF
- Data Table
- n8n Form

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta ni clave.
- La comprobación usa la [API Pwned Passwords](https://haveibeenpwned.com/API/v3#PwnedPasswords) de Have I Been Pwned. Es gratuita, no necesita clave y funciona por k-anonimato: envías solo los cinco primeros caracteres del hash SHA-1 de la contraseña a https://api.pwnedpasswords.com/range/XXXXX y recibes todos los sufijos de hash coincidentes con su recuento. Prueba con la contraseña `password` – vista decenas de millones de veces – y con una cadena larga aleatoria, que no debería devolver coincidencias.
- Para el bonus, crea una [Data Table](https://docs.n8n.io/build/work-with-data/data-tables) llamada accounts con las columnas email y password_hash (ambas de texto).
- En los Settings del workflow, pon Save successful production executions en Do not save para que lo que se escribe en el formulario no quede en tu historial de ejecuciones.

## Requirements
- Al escribir una contraseña filtrada como `password`, la página de resultado dice que ha aparecido en filtraciones y cuántas veces (más de 50 millones); una contraseña larga y aleatoria muestra que ninguna filtración la contiene.
- La ejecución muestra que la petición a Have I Been Pwned solo contiene los cinco primeros caracteres del hash y que ningún nodo posterior al hashing sigue llevando la contraseña.
- Bonus: con una contraseña limpia, la Data Table accounts recibe una fila nueva con el correo y un hash SHA-256, nunca la contraseña; con una contraseña filtrada no se guarda nada y el formulario pide otra.

## Tips
- Empieza con n8n Form Trigger: un campo con la etiqueta Password y el tipo Password. Pon Respond When en Workflow Finishes para que un nodo n8n Form posterior pueda mostrar el resultado.
- Añade Crypto con Action Hash, Type SHA1, Value {{ $json.Password }} (o la etiqueta que hayas usado) y un nombre de propiedad como sha1. El hashing convierte la contraseña en una huella fija de 40 caracteres que no se puede revertir.
- Añade Edit Fields (Set) con prefix = {{ $json.sha1.toUpperCase().slice(0, 5) }} y suffix = {{ $json.sha1.toUpperCase().slice(5) }}, y deja desactivado Include Other Input Fields: a partir de aquí, la contraseña y el hash completo desaparecen. Después HTTP Request: GET https://api.pwnedpasswords.com/range/{{ $json.prefix }} con Response Format en Text.
- La respuesta es un bloque de texto con líneas tipo SUFIJO:RECUENTO. Usa Edit Fields (Set) para crear un campo de tipo array lines = {{ $json.data.split('\n') }}, Split Out sobre lines y después Filter donde la línea empieza por {{ $('Edit Fields').first().json.suffix }}. Activa Always Output Data en los ajustes del Filter para que un ítem vacío continúe cuando no hay coincidencias.
- Añade Edit Fields (Set) con count = {{ $json.line ? Number($json.line.split(':')[1].trim()) : 0 }} y termina con n8n Form (Form Ending) cuyo título y texto usen {{ $json.count }}. Para el bonus, añade IF con count > 0: la rama true muestra un Form Ending que pide otra contraseña; la rama false inserta en Data Table (el correo y {{ $('n8n Form Trigger').first().json.Password.hash('sha256') }}) y luego muestra «Cuenta creada».

# Ukrainian

## Title
Чи витік мій пароль?

## Summary
Створи форму, яка каже, чи з’являвся пароль у відомому витоку даних, – і пароль ніколи не залишає твій n8n.

## Concept
Хешування нодою Crypto і приватність за задумом: надсилай сервісу лише те, що йому потрібно

## Glossary
- витік даних: Витік бази користувачів якогось сайту, часто разом із паролями, які зловмисники потім пробують на інших сайтах.
- хеш: Відбиток сталої довжини, обчислений із тексту. Однаковий вхід завжди дає однаковий хеш, але з хешу не можна відновити текст.
- SHA-1: Поширений алгоритм хешування. Have I Been Pwned індексує паролі з витоків за їхнім SHA-1-хешем.
- k-анонімність: Техніка приватності: ти надсилаєш лише короткий префікс, спільний для сотень хешів, тож сервіс не може знати, який саме ти перевіряєш.
- SHA-256: Сильніший алгоритм хешування, який у бонусі використовується для збереженого відбитка.
- Data Table: Вбудована таблиця n8n для зберігання рядків у твоєму робочому просторі без зовнішньої бази даних.

## Scenario
- IT-команда, яка дає колегам перевірити пароль, перш ніж десь його використати.
- Форма реєстрації, що відхиляє паролі, які вже знайдено у витоках даних.
- Будь-яка перевірка через зовнішній сервіс, коли вихідні дані мають залишатися приватними.

## Task
Дай людям просту форму, у якій вони вводять пароль і дізнаються, чи з’являвся він у відомому витоку даних і скільки разів. Ніколи нікуди не надсилай сам пароль і ніколи його не зберігай.

## Bonus Task
Перетвори форму на реєстраційну з адресою електронної пошти. Якщо пароль витік, повідом, скільки разів, і попроси інший. Якщо він чистий, збережи email і хеш пароля – ніколи не сам пароль – у Data Table і підтверди створення акаунта.

## Nodes
- n8n Form Trigger
- Crypto
- Edit Fields (Set)
- HTTP Request
- Split Out
- Filter
- IF
- Data Table
- n8n Form

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів чи ключів не потрібно.
- Перевірка використовує [API Pwned Passwords](https://haveibeenpwned.com/API/v3#PwnedPasswords) від Have I Been Pwned. Він безкоштовний, не потребує ключа і працює за принципом k-анонімності: ти надсилаєш лише перші п’ять символів SHA-1-хешу пароля на https://api.pwnedpasswords.com/range/XXXXX і отримуєш усі відповідні суфікси хешів з їхньою кількістю. Перевір пароль `password` – його бачили десятки мільйонів разів – і довгий випадковий рядок, який не повинен дати збігів.
- Для бонусу створи [Data Table](https://docs.n8n.io/build/work-with-data/data-tables) з назвою accounts і стовпцями email та password_hash (обидва текстові).
- У Settings воркфлоу постав Save successful production executions на Do not save, щоб введене у форму не залишалося в історії виконань.

## Requirements
- Після введення пароля з витоку, наприклад `password`, сторінка результату повідомляє, що він з’являвся у витоках, і скільки разів (понад 50 мільйонів); довгий випадковий пароль показує, що його немає в жодному витоку.
- В історії виконання видно, що запит до Have I Been Pwned містить лише перші п’ять символів хешу, а жодна нода після хешування вже не несе пароль.
- Бонус: із чистим паролем Data Table accounts отримує новий рядок з email і SHA-256-хешем, але ніколи не паролем; з паролем із витоку нічого не зберігається, а форма просить інший.

## Tips
- Почни з n8n Form Trigger: одне поле з міткою Password і типом Password. Постав Respond When на Workflow Finishes, щоб пізніша нода n8n Form могла показати результат.
- Додай Crypto з Action Hash, Type SHA1, Value {{ $json.Password }} (або мітку свого поля) і назвою властивості на кшталт sha1. Хешування перетворює пароль на сталий відбиток із 40 символів, який не можна повернути назад.
- Додай Edit Fields (Set) з prefix = {{ $json.sha1.toUpperCase().slice(0, 5) }} і suffix = {{ $json.sha1.toUpperCase().slice(5) }}, а Include Other Input Fields залиш вимкненим: відтепер пароля й повного хешу більше немає. Потім HTTP Request: GET https://api.pwnedpasswords.com/range/{{ $json.prefix }} із Response Format у значенні Text.
- Відповідь – один текстовий блок із рядками виду СУФІКС:КІЛЬКІСТЬ. Через Edit Fields (Set) створи поле-масив lines = {{ $json.data.split('\n') }}, додай Split Out для lines, а потім Filter, де рядок починається з {{ $('Edit Fields').first().json.suffix }}. Увімкни Always Output Data у налаштуваннях Filter, щоб порожній елемент ішов далі, коли збігів немає.
- Додай Edit Fields (Set) з count = {{ $json.line ? Number($json.line.split(':')[1].trim()) : 0 }} і заверши нодою n8n Form (Form Ending), заголовок і текст якої використовують {{ $json.count }}. Для бонусу додай IF з умовою count > 0: гілка true показує Form Ending із проханням про інший пароль; гілка false вставляє рядок у Data Table (email і {{ $('n8n Form Trigger').first().json.Password.hash('sha256') }}) і показує «Акаунт створено».
