---
number: 7
slug: idealista-morning-brief
difficulty: intermediate
time: 45–60 min
complexity: 4
color: #ff8a55
ink: #1b2427
---

# Solution Data

## Core Workflow JSON (without bonus)

```json
{
  "name": "C9 – Valencia Apartment Brief – Core",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "days",
              "daysInterval": 1,
              "triggerAtHour": 8,
              "triggerAtMinute": 0
            }
          ]
        }
      },
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.3,
      "position": [0, 300],
      "id": "09000000-0000-4000-8000-000000000001",
      "name": "Every day at 08:00"
    },
    {
      "parameters": {
        "resource": "Scraping",
        "operation": "scrape",
        "url": "https://n8n-challenges.app/fixtures/valencia-apartments-day-1.html",
        "parsers": [],
        "scrapeOptions": {
          "options": {
            "formats": {
              "format": [
                {
                  "type": "json",
                  "prompt": "Extract every apartment card from the page. Return listingId and title as strings, neighborhood as the displayed neighborhood name, price and bedrooms as integers without symbols, and url as the full listing URL.",
                  "schema": "{\"type\":\"object\",\"properties\":{\"listings\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"listingId\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"neighborhood\":{\"type\":\"string\"},\"price\":{\"type\":\"integer\"},\"bedrooms\":{\"type\":\"integer\"},\"url\":{\"type\":\"string\"}},\"required\":[\"listingId\",\"title\",\"neighborhood\",\"price\",\"bedrooms\",\"url\"]}}},\"required\":[\"listings\"]}"
                }
              ]
            },
            "onlyMainContent": true,
            "storeInCache": false
          }
        }
      },
      "type": "@mendable/n8n-nodes-firecrawl.firecrawl",
      "typeVersion": 1,
      "position": [240, 300],
      "id": "09000000-0000-4000-8000-000000000002",
      "name": "Scrape permitted feed"
    },
    {
      "parameters": {
        "fieldToSplitOut": "data.json.listings",
        "include": "noOtherFields",
        "options": {}
      },
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [480, 300],
      "id": "09000000-0000-4000-8000-000000000003",
      "name": "Split listings"
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
              "id": "09000000-0000-4000-8000-000000000011",
              "leftValue": "={{ $json.price }}",
              "rightValue": 1200,
              "operator": {
                "type": "number",
                "operation": "lte"
              }
            },
            {
              "id": "09000000-0000-4000-8000-000000000012",
              "leftValue": "={{ $json.bedrooms }}",
              "rightValue": 2,
              "operator": {
                "type": "number",
                "operation": "gte"
              }
            },
            {
              "id": "09000000-0000-4000-8000-000000000013",
              "leftValue": "={{ ['Russafa', 'El Carme', 'Benimaclet'].includes($json.neighborhood) }}",
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
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [720, 300],
      "id": "09000000-0000-4000-8000-000000000004",
      "name": "Keep wanted homes"
    },
    {
      "parameters": {
        "operation": "removeItemsSeenInPreviousExecutions",
        "logic": "removeItemsWithAlreadySeenKeyValues",
        "dedupeValue": "={{ $json.listingId }}",
        "options": {
          "scope": "node",
          "historySize": 10000
        }
      },
      "type": "n8n-nodes-base.removeDuplicates",
      "typeVersion": 2,
      "position": [960, 300],
      "id": "09000000-0000-4000-8000-000000000005",
      "name": "Only unseen listing IDs"
    },
    {
      "parameters": {
        "type": "simple",
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "price",
              "order": "ascending"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [1200, 300],
      "id": "09000000-0000-4000-8000-000000000006",
      "name": "Sort by price"
    },
    {
      "parameters": {
        "maxItems": 5,
        "keep": "firstItems"
      },
      "type": "n8n-nodes-base.limit",
      "typeVersion": 1,
      "position": [1440, 300],
      "id": "09000000-0000-4000-8000-000000000007",
      "name": "Keep first five"
    },
    {
      "parameters": {
        "aggregate": "aggregateAllItemData",
        "destinationFieldName": "listings",
        "include": "allFields",
        "options": {}
      },
      "type": "n8n-nodes-base.aggregate",
      "typeVersion": 1,
      "position": [1680, 300],
      "id": "09000000-0000-4000-8000-000000000008",
      "name": "Build one brief"
    },
    {
      "parameters": {
        "chatId": "YOUR_TELEGRAM_CHAT_ID",
        "text": "={{ '🏠 New Valencia apartments\\n\\n' + $json.listings.map((item, index) => `${index + 1}. ${item.title}\\n${item.neighborhood} · €${item.price}/month · ${item.bedrooms} bedrooms\\n${item.url}`).join('\\n\\n') }}",
        "additionalFields": {
          "appendAttribution": false
        }
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [1920, 300],
      "id": "09000000-0000-4000-8000-000000000009",
      "name": "Send apartment brief"
    }
  ],
  "connections": {
    "Every day at 08:00": {
      "main": [[{"node": "Scrape permitted feed", "type": "main", "index": 0}]]
    },
    "Scrape permitted feed": {
      "main": [[{"node": "Split listings", "type": "main", "index": 0}]]
    },
    "Split listings": {
      "main": [[{"node": "Keep wanted homes", "type": "main", "index": 0}]]
    },
    "Keep wanted homes": {
      "main": [[{"node": "Only unseen listing IDs", "type": "main", "index": 0}]]
    },
    "Only unseen listing IDs": {
      "main": [[{"node": "Sort by price", "type": "main", "index": 0}], []]
    },
    "Sort by price": {
      "main": [[{"node": "Keep first five", "type": "main", "index": 0}]]
    },
    "Keep first five": {
      "main": [[{"node": "Build one brief", "type": "main", "index": 0}]]
    },
    "Build one brief": {
      "main": [[{"node": "Send apartment brief", "type": "main", "index": 0}]]
    }
  },
  "pinData": {},
  "active": false,
  "settings": {
    "executionOrder": "v1",
    "timezone": "Europe/Madrid"
  },
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "tags": []
}
```

## Bonus Workflow JSON

```json
{
  "name": "C9 – Valencia Apartment Brief – Bonus",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "days",
              "daysInterval": 1,
              "triggerAtHour": 8,
              "triggerAtMinute": 0
            }
          ]
        }
      },
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.3,
      "position": [0, 300],
      "id": "09000000-0000-4000-9000-000000000001",
      "name": "Every day at 08:00"
    },
    {
      "parameters": {
        "resource": "Scraping",
        "operation": "scrape",
        "url": "https://n8n-challenges.app/fixtures/valencia-apartments-day-1.html",
        "parsers": [],
        "scrapeOptions": {
          "options": {
            "formats": {
              "format": [
                {
                  "type": "json",
                  "prompt": "Extract every apartment card from the page. Return listingId and title as strings, neighborhood as the displayed neighborhood name, price and bedrooms as integers without symbols, and url as the full listing URL.",
                  "schema": "{\"type\":\"object\",\"properties\":{\"listings\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"listingId\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"neighborhood\":{\"type\":\"string\"},\"price\":{\"type\":\"integer\"},\"bedrooms\":{\"type\":\"integer\"},\"url\":{\"type\":\"string\"}},\"required\":[\"listingId\",\"title\",\"neighborhood\",\"price\",\"bedrooms\",\"url\"]}}},\"required\":[\"listings\"]}"
                }
              ]
            },
            "onlyMainContent": true,
            "storeInCache": false
          }
        }
      },
      "type": "@mendable/n8n-nodes-firecrawl.firecrawl",
      "typeVersion": 1,
      "position": [240, 300],
      "id": "09000000-0000-4000-9000-000000000002",
      "name": "Scrape permitted feed"
    },
    {
      "parameters": {
        "fieldToSplitOut": "data.json.listings",
        "include": "noOtherFields",
        "options": {}
      },
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [480, 300],
      "id": "09000000-0000-4000-9000-000000000003",
      "name": "Split listings"
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
              "id": "09000000-0000-4000-9000-000000000011",
              "leftValue": "={{ $json.price }}",
              "rightValue": 1200,
              "operator": {
                "type": "number",
                "operation": "lte"
              }
            },
            {
              "id": "09000000-0000-4000-9000-000000000012",
              "leftValue": "={{ $json.bedrooms }}",
              "rightValue": 2,
              "operator": {
                "type": "number",
                "operation": "gte"
              }
            },
            {
              "id": "09000000-0000-4000-9000-000000000013",
              "leftValue": "={{ ['Russafa', 'El Carme', 'Benimaclet'].includes($json.neighborhood) }}",
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
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [720, 300],
      "id": "09000000-0000-4000-9000-000000000004",
      "name": "Keep wanted homes",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "operation": "removeItemsSeenInPreviousExecutions",
        "logic": "removeItemsWithAlreadySeenKeyValues",
        "dedupeValue": "={{ $json.listingId }}",
        "options": {
          "scope": "node",
          "historySize": 10000
        }
      },
      "type": "n8n-nodes-base.removeDuplicates",
      "typeVersion": 2,
      "position": [960, 300],
      "id": "09000000-0000-4000-9000-000000000005",
      "name": "Only unseen listing IDs",
      "alwaysOutputData": true
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
              "id": "09000000-0000-4000-9000-000000000014",
              "leftValue": "={{ $json.listingId }}",
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
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [1200, 300],
      "id": "09000000-0000-4000-9000-000000000006",
      "name": "Any new listings?"
    },
    {
      "parameters": {
        "type": "simple",
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "price",
              "order": "ascending"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [1440, 220],
      "id": "09000000-0000-4000-9000-000000000007",
      "name": "Sort by price"
    },
    {
      "parameters": {
        "maxItems": 5,
        "keep": "firstItems"
      },
      "type": "n8n-nodes-base.limit",
      "typeVersion": 1,
      "position": [1680, 220],
      "id": "09000000-0000-4000-9000-000000000008",
      "name": "Keep first five"
    },
    {
      "parameters": {
        "aggregate": "aggregateAllItemData",
        "destinationFieldName": "listings",
        "include": "allFields",
        "options": {}
      },
      "type": "n8n-nodes-base.aggregate",
      "typeVersion": 1,
      "position": [1920, 220],
      "id": "09000000-0000-4000-9000-000000000009",
      "name": "Build one brief"
    },
    {
      "parameters": {
        "chatId": "YOUR_TELEGRAM_CHAT_ID",
        "text": "={{ '🏠 New Valencia apartments\\n\\n' + $json.listings.map((item, index) => `${index + 1}. ${item.title}\\n${item.neighborhood} · €${item.price}/month · ${item.bedrooms} bedrooms\\n${item.url}`).join('\\n\\n') }}",
        "additionalFields": {
          "appendAttribution": false
        }
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [2160, 220],
      "id": "09000000-0000-4000-9000-000000000010",
      "name": "Send apartment brief"
    },
    {
      "parameters": {
        "chatId": "YOUR_TELEGRAM_CHAT_ID",
        "text": "🏠 No new Valencia apartments matched your filters today.",
        "additionalFields": {
          "appendAttribution": false
        }
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [1440, 460],
      "id": "09000000-0000-4000-9000-000000000015",
      "name": "Send no-new update"
    }
  ],
  "connections": {
    "Every day at 08:00": {
      "main": [[{"node": "Scrape permitted feed", "type": "main", "index": 0}]]
    },
    "Scrape permitted feed": {
      "main": [[{"node": "Split listings", "type": "main", "index": 0}]]
    },
    "Split listings": {
      "main": [[{"node": "Keep wanted homes", "type": "main", "index": 0}]]
    },
    "Keep wanted homes": {
      "main": [[{"node": "Only unseen listing IDs", "type": "main", "index": 0}]]
    },
    "Only unseen listing IDs": {
      "main": [[{"node": "Any new listings?", "type": "main", "index": 0}], []]
    },
    "Any new listings?": {
      "main": [
        [{"node": "Sort by price", "type": "main", "index": 0}],
        [{"node": "Send no-new update", "type": "main", "index": 0}]
      ]
    },
    "Sort by price": {
      "main": [[{"node": "Keep first five", "type": "main", "index": 0}]]
    },
    "Keep first five": {
      "main": [[{"node": "Build one brief", "type": "main", "index": 0}]]
    },
    "Build one brief": {
      "main": [[{"node": "Send apartment brief", "type": "main", "index": 0}]]
    }
  },
  "pinData": {},
  "active": false,
  "settings": {
    "executionOrder": "v1",
    "timezone": "Europe/Madrid"
  },
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "tags": []
}
```

# English

## Title
Find Your Valencia Apartment

## Summary
Use Firecrawl for permitted web scraping and send only new matching apartments in a concise morning brief.

## Concept
Scheduled structured web extraction, filtering, and cross-run deduplication

## Scenario
- An apartment seeker wants only genuinely new Valencia listings that match a fixed budget and preferred neighborhoods.
- A relocation volunteer group wants to send a curated daily brief without repeating yesterday’s apartments.
- A student household needs a short morning update instead of manually checking a large property page.

## Task
Every morning at 08:00, send a Telegram brief with up to five newly discovered Valencia apartments from the organizers’ permitted rental page. Include only homes costing no more than €1,200, with at least two bedrooms, in Russafa, El Carme, or Benimaclet.

## Bonus Task
When no new apartments match, send a short Telegram update instead.

## Nodes
- Schedule Trigger
- Firecrawl
- Split Out
- Filter
- Remove Duplicates
- If
- Sort
- Limit
- Aggregate
- Telegram

## Preparation
- Create an [n8n Cloud account](/n8n-sign-up) or use a self-hosted n8n instance.
- Create a [Firecrawl account](https://www.firecrawl.dev/app), use its free starter credits, and follow the [official n8n setup guide](https://docs.firecrawl.dev/integrations/n8n) to add the verified node and create a key – the secret value that lets n8n use your credits.
- Create a bot with [Telegram’s BotFather instructions](https://core.telegram.org/bots/features#botfather), then follow the [n8n Telegram credential guide](https://docs.n8n.io/integrations/builtin/credentials/telegram/) and obtain the test chat ID.
- Use only the event-owned [day 1](https://n8n-challenges.app/fixtures/valencia-apartments-day-1.html) and [day 2](https://n8n-challenges.app/fixtures/valencia-apartments-day-2.html) pages. This exercise does not use an Idealista API – a machine-readable listing service from Idealista is not in scope – and [Idealista’s legal terms](https://www.idealista.com/ayuda/articulos/legal-statement/?lang=en) do not permit automated scraping without express authorization.

## Requirements
- At 08:00 Europe/Madrid, the permitted page becomes structured data containing listingId, title, neighborhood, price, bedrooms, and URL for every apartment card.
- Each listing ID is checked with cross-run deduplication; only unseen homes matching all three preferences remain, sorted by lowest price and limited to five.
- Telegram receives one readable brief with every selected home; the bonus workflow sends one clear no-new message when the same day 2 page is run again.

## Tips
- Start with Firecrawl while running the workflow manually; choose Scrape and JSON output so the page becomes the six predictable fields used later.
- Continue with Split Out on data.json.listings so each apartment becomes one separate record for the following nodes.
- Add Filter with three checks: price no more than 1200, bedrooms at least 2, and neighborhood equal to Russafa, El Carme, or Benimaclet.
- Configure Remove Duplicates to remove items processed in previous executions, keep values that are new, and use listingId as the value to compare.
- Finish with Sort, Limit, Aggregate, and Telegram, then add Schedule Trigger. For the bonus, enable Always Output Data on Filter and Remove Duplicates so an empty result still reaches If, check whether listingId exists, and test day 1, day 2, then day 2 again; clear the Remove Duplicates history before a fresh demo.

# Spanish

## Title
Encuentra tu piso en Valencia

## Summary
Usa Firecrawl para una extracción web permitida y envía solo pisos nuevos que coincidan en un resumen matinal breve.

## Concept
Extracción web estructurada y programada, filtrado y eliminación de duplicados entre ejecuciones

## Scenario
- Una persona que busca piso solo quiere anuncios realmente nuevos en Valencia que encajen con su presupuesto y barrios preferidos.
- Un grupo de apoyo a la reubicación quiere enviar un resumen diario seleccionado sin repetir los pisos de ayer.
- Un grupo de estudiantes necesita una actualización matinal breve en lugar de revisar manualmente una gran página inmobiliaria.

## Task
Cada mañana a las 08:00, envía por Telegram un resumen con hasta cinco pisos recién descubiertos en la página de alquiler permitida de los organizadores. Incluye solo viviendas de hasta 1.200 €, con al menos dos habitaciones, en Russafa, El Carme o Benimaclet.

## Bonus Task
Cuando no haya pisos nuevos que coincidan, envía en su lugar un aviso breve por Telegram.

## Nodes
- Schedule Trigger
- Firecrawl
- Split Out
- Filter
- Remove Duplicates
- If
- Sort
- Limit
- Aggregate
- Telegram

## Preparation
- Crea una [cuenta de n8n Cloud](/n8n-sign-up) o usa una instancia propia de n8n.
- Crea una [cuenta de Firecrawl](https://www.firecrawl.dev/app), usa sus créditos iniciales gratuitos y sigue la [guía oficial para n8n](https://docs.firecrawl.dev/integrations/n8n) para añadir el nodo verificado y crear una clave – el valor secreto que permite a n8n usar tus créditos.
- Crea un bot con las [instrucciones de BotFather de Telegram](https://core.telegram.org/bots/features#botfather), sigue la [guía de credenciales de Telegram en n8n](https://docs.n8n.io/integrations/builtin/credentials/telegram/) y obtén el ID del chat de prueba.
- Usa solo las páginas del evento del [día 1](https://n8n-challenges.app/fixtures/valencia-apartments-day-1.html) y [día 2](https://n8n-challenges.app/fixtures/valencia-apartments-day-2.html). Este ejercicio no utiliza una API de Idealista – no forma parte del reto ningún servicio de anuncios legible por máquinas de Idealista – y los [términos legales de Idealista](https://www.idealista.com/ayuda/articulos/legal-statement/?lang=es) no permiten la extracción automatizada sin autorización expresa.

## Requirements
- A las 08:00 Europe/Madrid, la página permitida se convierte en datos estructurados con listingId, título, barrio, precio, habitaciones y URL para cada piso.
- Cada ID de anuncio se comprueba mediante la eliminación de duplicados entre ejecuciones; solo quedan viviendas no vistas que cumplen las tres preferencias, ordenadas por menor precio y limitadas a cinco.
- Telegram recibe un único resumen legible con cada vivienda seleccionada; el workflow extra envía un único aviso claro cuando se ejecuta de nuevo la página del día 2 y no hay novedades.

## Tips
- Empieza con Firecrawl mientras ejecutas el workflow manualmente; elige Scrape y salida JSON para convertir la página en los seis campos predecibles que usarás después.
- Continúa con Split Out sobre data.json.listings para convertir cada piso en un registro separado para los siguientes nodos.
- Añade Filter con tres comprobaciones: precio máximo de 1200, al menos 2 habitaciones y barrio igual a Russafa, El Carme o Benimaclet.
- Configura Remove Duplicates para eliminar elementos procesados en ejecuciones anteriores, conservar los valores nuevos y usar listingId como valor de comparación.
- Termina con Sort, Limit, Aggregate y Telegram, y después añade Schedule Trigger. Para la tarea extra, activa Always Output Data en Filter y Remove Duplicates para que un resultado vacío llegue a If, comprueba si existe listingId y prueba día 1, día 2 y de nuevo día 2; borra el historial de Remove Duplicates antes de una demostración nueva.

# Ukrainian

## Title
Знайди свою квартиру у Валенсії

## Summary
Використовуйте Firecrawl для дозволеного вебзбирання та надсилайте стислий ранковий огляд лише з новими відповідними квартирами.

## Concept
Заплановане структуроване вебзбирання, фільтрування й усунення дублікатів між запусками

## Scenario
- Людина, яка шукає квартиру, хоче бачити лише справді нові оголошення у Валенсії, що відповідають бюджету та бажаним районам.
- Волонтерська група з релокації хоче щодня надсилати дібраний огляд, не повторюючи вчорашні квартири.
- Студентському домогосподарству потрібне коротке ранкове оновлення замість ручної перевірки великої сторінки нерухомості.

## Task
Щоранку о 08:00 надсилайте в Telegram огляд із щонайбільше п’ятьма новими квартирами зі сторінки оренди, дозволеної організаторами. Додавайте лише житло ціною до €1 200, щонайменше з двома спальнями, у районах Russafa, El Carme або Benimaclet.

## Bonus Task
Якщо нових відповідних квартир немає, натомість надішліть коротке повідомлення в Telegram.

## Nodes
- Schedule Trigger
- Firecrawl
- Split Out
- Filter
- Remove Duplicates
- If
- Sort
- Limit
- Aggregate
- Telegram

## Preparation
- Створіть [обліковий запис n8n Cloud](/n8n-sign-up) або скористайтеся власним сервером n8n.
- Створіть [обліковий запис Firecrawl](https://www.firecrawl.dev/app), скористайтеся безкоштовними стартовими кредитами й виконайте [офіційну інструкцію для n8n](https://docs.firecrawl.dev/integrations/n8n), щоб додати перевірену ноду та створити ключ – секретне значення, яке дає n8n доступ до ваших кредитів.
- Створіть бота за [інструкцією Telegram BotFather](https://core.telegram.org/bots/features#botfather), виконайте [інструкцію n8n щодо облікових даних Telegram](https://docs.n8n.io/integrations/builtin/credentials/telegram/) й отримайте ID тестового чату.
- Використовуйте лише сторінки події для [дня 1](https://n8n-challenges.app/fixtures/valencia-apartments-day-1.html) і [дня 2](https://n8n-challenges.app/fixtures/valencia-apartments-day-2.html). Ця вправа не використовує API Idealista – машинозчитуваний сервіс оголошень Idealista не входить до завдання – а [юридичні умови Idealista](https://www.idealista.com/ayuda/articulos/legal-statement/?lang=en) не дозволяють автоматизоване збирання без прямого дозволу.

## Requirements
- О 08:00 за часовим поясом Europe/Madrid дозволена сторінка перетворюється на структуровані дані з полями listingId, назва, район, ціна, кількість спалень і URL для кожної квартири.
- Кожен ID оголошення перевіряється через усунення дублікатів між запусками; залишаються лише нові квартири, що відповідають усім трьом умовам, відсортовані за найнижчою ціною й обмежені п’ятьма.
- Telegram отримує один читабельний огляд з усіма вибраними квартирами; додатковий воркфлоу надсилає одне чітке повідомлення без новинок після повторного запуску сторінки дня 2.

## Tips
- Почніть із Firecrawl і запускайте воркфлоу вручну; виберіть Scrape та результат JSON, щоб перетворити сторінку на шість передбачуваних полів для наступних кроків.
- Продовжте зі Split Out для data.json.listings, щоб кожна квартира стала окремим записом для наступних нод.
- Додайте Filter із трьома перевірками: ціна не більше 1200, щонайменше 2 спальні й район Russafa, El Carme або Benimaclet.
- Налаштуйте Remove Duplicates на видалення елементів, оброблених у попередніх запусках, збереження нових значень і використання listingId як значення для порівняння.
- Завершіть за допомогою Sort, Limit, Aggregate і Telegram, а потім додайте Schedule Trigger. Для додаткового завдання ввімкніть Always Output Data у Filter і Remove Duplicates, щоб порожній результат усе одно дійшов до If, перевірте наявність listingId і протестуйте день 1, день 2 та ще раз день 2; перед новою демонстрацією очистьте історію Remove Duplicates.
