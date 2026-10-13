---
number: 20
slug: long-weekend-planner
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
  "name": "Plan Your Long Weekends – Core",
  "nodes": [
    {
      "parameters": {
        "formTitle": "Plan your long weekends",
        "formDescription": "Pick a country and a year, and get every long weekend as a calendar file.",
        "formFields": {
          "values": [
            {
              "fieldName": "country",
              "fieldLabel": "Country",
              "fieldType": "dropdown",
              "fieldOptions": {
                "values": [
                  {
                    "option": "US"
                  },
                  {
                    "option": "DE"
                  },
                  {
                    "option": "ES"
                  },
                  {
                    "option": "GB"
                  },
                  {
                    "option": "PL"
                  }
                ]
              },
              "requiredField": true
            },
            {
              "fieldName": "year",
              "fieldLabel": "Year",
              "fieldType": "number",
              "placeholder": "e.g. 2027",
              "requiredField": true
            }
          ]
        },
        "responseMode": "lastNode",
        "options": {
          "path": "long-weekends",
          "buttonLabel": "Show me"
        }
      },
      "id": "d0a62b41-7e35-4c89-9f20-6b17c5e384da",
      "name": "Ask for country and year",
      "type": "n8n-nodes-base.formTrigger",
      "typeVersion": 2.6,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "=https://date.nager.at/api/v3/LongWeekend/{{ $json.year }}/{{ $json.country }}",
        "options": {}
      },
      "id": "4f9c7013-28b6-4d5a-bf61-903e2c7a815b",
      "name": "Get the long weekends",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "Nager.Date, no key needed. One item per long weekend."
    },
    {
      "parameters": {
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "dayCount",
              "order": "descending"
            }
          ]
        },
        "options": {}
      },
      "id": "8b3e5d27-0491-4a76-85c3-21f7d0b649ec",
      "name": "Longest breaks first",
      "type": "n8n-nodes-base.sort",
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
              "id": "a7254e19-6c03-4b58-9d71-e508c3176b2f",
              "name": "title",
              "value": "={{ $json.dayCount + ' days off' + ($json.needBridgeDay ? ' (take ' + $json.bridgeDays.length + ' day off)' : ' (no day off needed)') }}",
              "type": "string"
            },
            {
              "id": "63f81b07-4d92-4e15-a860-7c2039ba5de4",
              "name": "start",
              "value": "={{ $json.startDate }}",
              "type": "string"
            },
            {
              "id": "1c90d4a6-5b38-4f70-92e1-806b7c45a3f9",
              "name": "end",
              "value": "={{ $json.endDate }}",
              "type": "string"
            },
            {
              "id": "bf10327b-7185-4594-b15c-194eeb5990e0",
              "name": "bridge",
              "value": "={{ $json.bridgeDays.join(', ') }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "97b1c5e0-3a86-4d24-8e59-f0273bc6a41d",
      "name": "Name each break",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        720,
        0
      ]
    },
    {
      "parameters": {
        "operation": "iCal",
        "title": "={{ $json.title }}",
        "start": "={{ $json.start }}",
        "end": "={{ $json.end }}",
        "allDay": true,
        "additionalFields": {
          "fileName": "long-weekends.ics",
          "description": "={{ $json.bridge ? 'Bridge day(s): ' + $json.bridge : 'A public holiday falls next to the weekend.' }}",
          "calName": "Long weekends"
        }
      },
      "id": "551ea188-5523-48f9-963e-52d3e1dace9a",
      "name": "Turn each break into a calendar event",
      "type": "n8n-nodes-base.convertToFile",
      "typeVersion": 1.1,
      "position": [
        960,
        0
      ]
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "returnBinary",
        "completionTitle": "Your long weekends",
        "completionMessage": "Open the file to add them to your calendar.",
        "inputDataFieldName": "data"
      },
      "id": "5a7036cb-18e4-42f9-b7d5-60c9e2418a37",
      "name": "Hand back the calendar file",
      "type": "n8n-nodes-base.form",
      "typeVersion": 2.5,
      "position": [
        1200,
        0
      ]
    }
  ],
  "connections": {
    "Ask for country and year": {
      "main": [
        [
          {
            "node": "Get the long weekends",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the long weekends": {
      "main": [
        [
          {
            "node": "Longest breaks first",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Longest breaks first": {
      "main": [
        [
          {
            "node": "Name each break",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Name each break": {
      "main": [
        [
          {
            "node": "Turn each break into a calendar event",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Turn each break into a calendar event": {
      "main": [
        [
          {
            "node": "Hand back the calendar file",
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
  "name": "Plan Your Long Weekends – Bonus",
  "nodes": [
    {
      "parameters": {
        "formTitle": "Plan your long weekends",
        "formDescription": "Pick a country and a year, and get every long weekend as a calendar file.",
        "formFields": {
          "values": [
            {
              "fieldName": "country",
              "fieldLabel": "Country",
              "fieldType": "dropdown",
              "fieldOptions": {
                "values": [
                  {
                    "option": "US"
                  },
                  {
                    "option": "DE"
                  },
                  {
                    "option": "ES"
                  },
                  {
                    "option": "GB"
                  },
                  {
                    "option": "PL"
                  }
                ]
              },
              "requiredField": true
            },
            {
              "fieldName": "year",
              "fieldLabel": "Year",
              "fieldType": "number",
              "placeholder": "e.g. 2027",
              "requiredField": true
            }
          ]
        },
        "responseMode": "lastNode",
        "options": {
          "path": "long-weekends",
          "buttonLabel": "Show me"
        }
      },
      "id": "d0a62b41-7e35-4c89-9f20-6b17c5e384da",
      "name": "Ask for country and year",
      "type": "n8n-nodes-base.formTrigger",
      "typeVersion": 2.6,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "=https://date.nager.at/api/v3/LongWeekend/{{ $json.year }}/{{ $json.country }}",
        "options": {}
      },
      "id": "4f9c7013-28b6-4d5a-bf61-903e2c7a815b",
      "name": "Get the long weekends",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        -120
      ],
      "notesInFlow": true,
      "notes": "Nager.Date, no key needed. One item per long weekend."
    },
    {
      "parameters": {
        "url": "=https://openholidaysapi.org/SchoolHolidays?countryIsoCode={{ $json.country }}&languageIsoCode=EN&validFrom={{ $json.year }}-01-01&validTo={{ $json.year }}-12-31",
        "options": {}
      },
      "id": "0c7a938e-5146-4b2d-83f7-e9105c62ad4b",
      "name": "Get the school holidays",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        140
      ],
      "notesInFlow": true,
      "notes": "OpenHolidays, no key needed, EU countries only."
    },
    {
      "parameters": {
        "aggregate": "aggregateAllItemData",
        "destinationFieldName": "schoolHolidays",
        "options": {}
      },
      "id": "c35fba25-0540-4bd5-b030-7f04d9483785",
      "name": "All school holidays in one item",
      "type": "n8n-nodes-base.aggregate",
      "typeVersion": 1,
      "position": [
        480,
        140
      ]
    },
    {
      "parameters": {
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "dayCount",
              "order": "descending"
            }
          ]
        },
        "options": {}
      },
      "id": "8b3e5d27-0491-4a76-85c3-21f7d0b649ec",
      "name": "Longest breaks first",
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [
        480,
        -120
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
              "id": "cb27e095-4318-4a6f-9b02-7e5d1c38a640",
              "leftValue": "={{ $('All school holidays in one item').first().json.schoolHolidays.some(holiday => holiday.startDate <= $json.endDate && holiday.endDate >= $json.startDate) }}",
              "rightValue": "",
              "operator": {
                "type": "boolean",
                "operation": "false",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "7d9150fc-6b24-4e07-a853-02c6b9e417d8",
      "name": "Not in the school holidays",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        720,
        -120
      ],
      "notesInFlow": true,
      "notes": "Two date ranges overlap when each one starts before the other ends."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "a7254e19-6c03-4b58-9d71-e508c3176b2f",
              "name": "title",
              "value": "={{ $json.dayCount + ' days off' + ($json.needBridgeDay ? ' (take ' + $json.bridgeDays.length + ' day off)' : ' (no day off needed)') }}",
              "type": "string"
            },
            {
              "id": "63f81b07-4d92-4e15-a860-7c2039ba5de4",
              "name": "start",
              "value": "={{ $json.startDate }}",
              "type": "string"
            },
            {
              "id": "1c90d4a6-5b38-4f70-92e1-806b7c45a3f9",
              "name": "end",
              "value": "={{ $json.endDate }}",
              "type": "string"
            },
            {
              "id": "f5602e8b-9314-4ca7-b0d6-27e1a9f36042",
              "name": "bridge",
              "value": "={{ $json.bridgeDays.join(', ') }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "97b1c5e0-3a86-4d24-8e59-f0273bc6a41d",
      "name": "Name each break",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        960,
        -120
      ]
    },
    {
      "parameters": {
        "operation": "iCal",
        "title": "={{ $json.title }}",
        "start": "={{ $json.start }}",
        "end": "={{ $json.end }}",
        "allDay": true,
        "additionalFields": {
          "fileName": "long-weekends.ics",
          "description": "={{ $json.bridge ? 'Bridge day(s): ' + $json.bridge : 'A public holiday falls next to the weekend.' }}",
          "calName": "Long weekends"
        }
      },
      "id": "2e48f605-61bd-4397-a7c0-5934be8012fa",
      "name": "Turn each break into a calendar event",
      "type": "n8n-nodes-base.convertToFile",
      "typeVersion": 1.1,
      "position": [
        1200,
        -120
      ]
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "returnBinary",
        "completionTitle": "Your long weekends",
        "completionMessage": "Open the file to add them to your calendar.",
        "inputDataFieldName": "data"
      },
      "id": "5a7036cb-18e4-42f9-b7d5-60c9e2418a37",
      "name": "Hand back the calendar file",
      "type": "n8n-nodes-base.form",
      "typeVersion": 2.5,
      "position": [
        1440,
        -120
      ]
    }
  ],
  "connections": {
    "Ask for country and year": {
      "main": [
        [
          {
            "node": "Get the long weekends",
            "type": "main",
            "index": 0
          },
          {
            "node": "Get the school holidays",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the school holidays": {
      "main": [
        [
          {
            "node": "All school holidays in one item",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the long weekends": {
      "main": [
        [
          {
            "node": "Longest breaks first",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Longest breaks first": {
      "main": [
        [
          {
            "node": "Not in the school holidays",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Not in the school holidays": {
      "main": [
        [
          {
            "node": "Name each break",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Name each break": {
      "main": [
        [
          {
            "node": "Turn each break into a calendar event",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Turn each break into a calendar event": {
      "main": [
        [
          {
            "node": "Hand back the calendar file",
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
Plan Your Long Weekends

## Summary
Fill in a country and a year, and get back a calendar file with every long weekend – and which single days off create them.

## Concept
Turning an API answer into a downloadable calendar file the form hands straight back

## Glossary
- API: A web address that returns data for programs instead of a page for people. This one knows the public holidays of about 110 countries.
- long weekend: A weekend made longer by a public holiday next to it, sometimes only if you take one day off in between.
- bridge day: The single working day between a public holiday and the weekend. Taking it off turns three days into four or five.
- ICS file: The standard calendar file that Apple Calendar, Google Calendar and Outlook all understand. Opening one adds the events to your calendar.
- n8n Form: A web form n8n hosts for you. The first node collects the answers, and a last node shows the result page – which can hand back a file.

## Scenario
- Anyone planning next year's days off in January, when the good dates are still free.
- A team lead who wants to see when half the office will obviously be away.
- Any form that answers with a file instead of a thank-you page – a ticket, a receipt or a report.

## Task
Show me next year's public holidays in my country and which single days off turn them into the longest breaks. Put them in my calendar.

## Bonus Task
Leave out the breaks that fall inside the school holidays, when everywhere is busy and prices go up.

## Nodes
- n8n Form Trigger
- HTTP Request
- Sort
- Filter
- Aggregate
- Edit Fields (Set)
- Convert to File
- n8n Form

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account is needed.
- Public holidays come from the free [Nager.Date API](https://date.nager.at/Api), which needs no key. Its LongWeekend endpoint does the hard part for you: give it a year and a two-letter country code and it returns each long weekend with the bridge days it needs.
- School holidays for the bonus come from the free [OpenHolidays API](https://www.openholidaysapi.org/), also without a key. It covers EU countries only, so pick one of those to test the bonus.
- A warning for Ukrainian examples: under martial law public holidays are not days off in Ukraine, so use another country when you demonstrate this one.
- Nothing is sent anywhere. The result comes back in the browser as a file you can open.

## Requirements
- Submitting the form with a country and a year returns a calendar file, not a plain thank-you page, and opening it adds the breaks to a calendar.
- Each event says how many days off it gives and whether a bridge day is needed, and the longest breaks come first.
- The same form works for several countries: 2027 gives 10 long weekends in the United States, 2 of which need a bridge day, and 4 in Germany, 1 of which needs one. Bonus: breaks overlapping the school holidays are gone.

## Tips
- Start with n8n Form Trigger with two fields – a dropdown called country holding two-letter codes such as US, DE or ES, and a number called year. Set Respond When to Using Last Node, so the final node decides what the visitor sees.
- Add HTTP Request to https://date.nager.at/api/v3/LongWeekend/{{ $json.year }}/{{ $json.country }}. The answer is a list, so n8n turns each long weekend into its own item – no Split Out needed.
- Each item carries startDate, endDate, dayCount, needBridgeDay and a bridgeDays list. Add Sort on dayCount descending, then Edit Fields (Set) to build a readable title such as "4 days off (take 1 day off)".
- Add Convert to File with the operation Convert to ICS: title from your new field, start from startDate, end from endDate, and All Day switched on, since a holiday has no clock time. Put a file name and a calendar name in Options.
- Finish with n8n Form in Completion mode and Respond With set to Return Binary File, using the same binary field name the Convert to File node wrote – data by default. For the bonus, branch a second HTTP Request to https://openholidaysapi.org/SchoolHolidays?countryIsoCode=…&languageIsoCode=EN&validFrom=…&validTo=…, collect it with Aggregate, and drop overlapping breaks with a Filter: two ranges overlap when one starts before the other ends.

# Spanish

## Title
Planifica tus puentes

## Summary
Indica un país y un año y recibe un archivo de calendario con todos los puentes, y con los días sueltos de vacaciones que los hacen posibles.

## Concept
Convertir la respuesta de una API en un archivo de calendario que el propio formulario te devuelve

## Glossary
- API: Una dirección web que devuelve datos para programas en lugar de una página para personas. Esta conoce los festivos de unos 110 países.
- puente: Un fin de semana alargado por un festivo contiguo, a veces solo si te tomas libre un día intermedio.
- día puente: El único día laborable entre un festivo y el fin de semana. Cogerlo libre convierte tres días en cuatro o cinco.
- archivo ICS: El archivo de calendario estándar que entienden Apple Calendar, Google Calendar y Outlook. Al abrirlo se añaden los eventos a tu calendario.
- n8n Form: Un formulario web que aloja n8n. El primer nodo recoge las respuestas y un último nodo muestra la página de resultado, que puede devolver un archivo.

## Scenario
- Cualquiera que planifique los días libres del año que viene en enero, cuando las buenas fechas siguen libres.
- Una persona que lidera un equipo y quiere ver cuándo faltará media oficina.
- Cualquier formulario que responda con un archivo en vez de con una página de agradecimiento: una entrada, un recibo o un informe.

## Task
Enséñame los festivos del año que viene en mi país y qué días sueltos de vacaciones los convierten en los descansos más largos. Mételos en mi calendario.

## Bonus Task
Deja fuera los puentes que caen dentro de las vacaciones escolares, cuando todo está lleno y los precios suben.

## Nodes
- n8n Form Trigger
- HTTP Request
- Sort
- Filter
- Aggregate
- Edit Fields (Set)
- Convert to File
- n8n Form

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta.
- Los festivos vienen de la [API gratuita Nager.Date](https://date.nager.at/Api), que no necesita clave. Su endpoint LongWeekend hace lo difícil por ti: le das un año y un código de país de dos letras y devuelve cada puente con los días puente que necesita.
- Las vacaciones escolares del bonus vienen de la [API gratuita OpenHolidays](https://www.openholidaysapi.org/), también sin clave. Solo cubre países de la UE, así que elige uno de ellos para probar el bonus.
- Un aviso para los ejemplos en ucraniano: bajo la ley marcial los festivos no son días libres en Ucrania, así que usa otro país para esta demostración.
- No se envía nada a ningún sitio. El resultado vuelve al navegador como un archivo que puedes abrir.

## Requirements
- Al enviar el formulario con un país y un año se devuelve un archivo de calendario, no una página de agradecimiento, y al abrirlo los descansos entran en un calendario.
- Cada evento dice cuántos días libres da y si hace falta un día puente, y los descansos más largos salen primero.
- El mismo formulario sirve para varios países: 2027 da 10 puentes en Estados Unidos, 2 de ellos con día puente, y 4 en Alemania, 1 de ellos con día puente. Bonus: los puentes que se solapan con las vacaciones escolares desaparecen.

## Tips
- Empieza con n8n Form Trigger con dos campos: un desplegable llamado country con códigos de dos letras como US, DE o ES, y un número llamado year. Pon Respond When en Using Last Node para que el último nodo decida lo que ve quien rellena el formulario.
- Añade HTTP Request a https://date.nager.at/api/v3/LongWeekend/{{ $json.year }}/{{ $json.country }}. La respuesta es una lista, así que n8n convierte cada puente en su propio ítem: no hace falta Split Out.
- Cada ítem trae startDate, endDate, dayCount, needBridgeDay y una lista bridgeDays. Añade Sort por dayCount descendente y después Edit Fields (Set) para construir un título legible como «4 días libres (coge 1 día)».
- Añade Convert to File con la operación Convert to ICS: title desde tu campo nuevo, start desde startDate, end desde endDate y All Day activado, porque un festivo no tiene hora. Pon un nombre de archivo y un nombre de calendario en Options.
- Termina con n8n Form en modo Completion y Respond With en Return Binary File, usando el mismo nombre de campo binario que escribió Convert to File – data por defecto. Para el bonus, saca un segundo HTTP Request a https://openholidaysapi.org/SchoolHolidays?countryIsoCode=…&languageIsoCode=EN&validFrom=…&validTo=…, recógelo con Aggregate y descarta los solapamientos con un Filter: dos rangos se solapan cuando uno empieza antes de que el otro termine.

# Ukrainian

## Title
Сплануй свої довгі вихідні

## Summary
Вкажи країну та рік – і отримай файл календаря з усіма довгими вихідними та з тими окремими днями відпустки, які їх створюють.

## Concept
Перетворення відповіді API на файл календаря, який форма віддає одразу назад

## Glossary
- API: Вебадреса, яка повертає дані для програм замість сторінки для людей. Ця знає державні свята приблизно 110 країн.
- довгі вихідні: Вихідні, подовжені державним святом поруч, інколи лише за умови, що візьмеш один день відпустки між ними.
- місток: Єдиний робочий день між святом і вихідними. Якщо взяти його, три дні перетворюються на чотири або п'ять.
- файл ICS: Стандартний файл календаря, який розуміють Apple Calendar, Google Calendar і Outlook. Відкриваєш його – і події потрапляють до твого календаря.
- n8n Form: Вебформа, яку розміщує n8n. Перша нода збирає відповіді, а остання показує сторінку результату – і може віддати файл.

## Scenario
- Будь-хто, хто планує наступний рік ще в січні, поки гарні дати вільні.
- Керівник команди, який хоче побачити, коли пів офісу точно буде відсутнє.
- Будь-яка форма, що відповідає файлом, а не сторінкою подяки: квиток, чек або звіт.

## Task
Покажи мені державні свята наступного року в моїй країні і те, які окремі дні відпустки перетворюють їх на найдовші канікули. Додай їх у мій календар.

## Bonus Task
Прибери ті проміжки, що припадають на шкільні канікули, коли всюди людно, а ціни зростають.

## Nodes
- n8n Form Trigger
- HTTP Request
- Sort
- Filter
- Aggregate
- Edit Fields (Set)
- Convert to File
- n8n Form

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів не потрібно.
- Державні свята надходять із безкоштовного [API Nager.Date](https://date.nager.at/Api), якому не потрібен ключ. Його точка LongWeekend робить найскладніше за тебе: даєш рік і дволітерний код країни, а вона повертає кожні довгі вихідні разом із потрібними містками.
- Шкільні канікули для бонусу надходять із безкоштовного [API OpenHolidays](https://www.openholidaysapi.org/), також без ключа. Він охоплює лише країни ЄС, тож для перевірки бонусу вибери одну з них.
- Застереження щодо українських прикладів: в умовах воєнного стану державні свята в Україні не є вихідними, тож для показу бери іншу країну.
- Нікуди нічого не надсилається. Результат повертається у браузер як файл, який можна відкрити.

## Requirements
- Після надсилання форми з країною та роком повертається файл календаря, а не сторінка подяки, і після відкриття проміжки потрапляють до календаря.
- Кожна подія каже, скільки вихідних днів вона дає і чи потрібен місток, а найдовші проміжки йдуть першими.
- Та сама форма працює для кількох країн: 2027 рік дає 10 довгих вихідних у Сполучених Штатах, 2 з яких потребують містка, і 4 у Німеччині, 1 з яких потребує. Бонус: проміжки, що перетинаються зі шкільними канікулами, зникають.

## Tips
- Почни з n8n Form Trigger із двома полями: випадний список country із дволітерними кодами на кшталт US, DE чи ES і число year. Постав Respond When на Using Last Node, щоб остання нода вирішувала, що побачить відвідувач.
- Додай HTTP Request на https://date.nager.at/api/v3/LongWeekend/{{ $json.year }}/{{ $json.country }}. Відповідь – це список, тож n8n робить із кожних довгих вихідних окремий елемент: Split Out не потрібен.
- Кожен елемент містить startDate, endDate, dayCount, needBridgeDay і список bridgeDays. Додай Sort за dayCount за спаданням, а потім Edit Fields (Set), щоб скласти зрозумілий заголовок на кшталт «4 вихідних дні (візьми 1 день відпустки)».
- Додай Convert to File з операцією Convert to ICS: title з твого нового поля, start із startDate, end із endDate і увімкнений All Day, бо у свята немає часу на годиннику. У Options впиши назву файлу та назву календаря.
- Заверши нодою n8n Form у режимі Completion із Respond With на Return Binary File, використавши ту саму назву бінарного поля, яку записала Convert to File – типово це data. Для бонусу зроби другий HTTP Request на https://openholidaysapi.org/SchoolHolidays?countryIsoCode=…&languageIsoCode=EN&validFrom=…&validTo=…, збери його через Aggregate і відкинь перетини за допомогою Filter: два проміжки перетинаються, коли один починається раніше, ніж закінчується інший.
