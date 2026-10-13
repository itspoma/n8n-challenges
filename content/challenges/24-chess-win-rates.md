---
number: 24
slug: chess-win-rates
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
  "name": "Why Do I Keep Losing? – Core",
  "nodes": [
    {
      "parameters": {},
      "id": "e114ab32-01e8-4beb-bd7d-5eaf4b9e6b71",
      "name": "Check my last month",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/chess-games-2026-07.json",
        "options": {}
      },
      "id": "b2910d47-6c53-4a08-95e1-30f7b641ce28",
      "name": "Get the games",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "120 games for one player. Chess.com serves the same shape at /pub/player/<name>/games/<year>/<month>."
    },
    {
      "parameters": {
        "fieldToSplitOut": "games",
        "options": {}
      },
      "id": "7e52b806-9143-4f7a-ad20-6c81950e4b3f",
      "name": "One item per game",
      "type": "n8n-nodes-base.splitOut",
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
              "id": "0d36e5b1-8724-4c9f-b053-e14a79026d8c",
              "name": "opening",
              "value": "={{ $json.eco }}",
              "type": "string"
            },
            {
              "id": "92f4a0c7-5d61-4e38-8b27-c0374e9b15af",
              "name": "colour",
              "value": "={{ $json.white.username === $('Get the games').first().json.player ? 'white' : 'black' }}",
              "type": "string"
            },
            {
              "id": "c81750de-4a93-4267-9f08-25b6e03c7194",
              "name": "won",
              "value": "={{ ($json.white.username === $('Get the games').first().json.player ? $json.white.result : $json.black.result) === 'win' ? 1 : 0 }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "63c90a18-7f24-4b5d-ae61-840b72e5c93f",
      "name": "My colour and result",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        720,
        0
      ],
      "notesInFlow": true,
      "notes": "Each game lists both players, so first work out which side was yours."
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "count",
              "field": "won"
            },
            {
              "aggregation": "sum",
              "field": "won"
            }
          ]
        },
        "fieldsToSplitBy": "opening, colour",
        "options": {}
      },
      "id": "b02d99ff-d481-4e1f-942a-14249a9f1440",
      "name": "Group by opening and colour",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1.1,
      "position": [
        960,
        0
      ],
      "notesInFlow": true,
      "notes": "Two fields, separated by a comma: one row per opening and colour."
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
              "id": "5b7e21fa-9c04-4836-a71d-0e62583b94c7",
              "leftValue": "={{ $json.count_won }}",
              "rightValue": 8,
              "operator": {
                "type": "number",
                "operation": "gte"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "eadff0ea-ee7c-450c-8afb-8f7d2710e5c3",
      "name": "Enough games to mean something",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        1200,
        0
      ],
      "notesInFlow": true,
      "notes": "Two losses out of two is not a pattern."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "e2c85704-3b19-4a6d-9f82-d4e07631c05a",
              "name": "line",
              "value": "={{ $json.opening + ' as ' + $json.colour }}",
              "type": "string"
            },
            {
              "id": "7f91045c-8a62-4e37-b0d9-16c3a85e297b",
              "name": "games",
              "value": "={{ $json.count_won }}",
              "type": "number"
            },
            {
              "id": "36b4e1a9-0725-4c68-8d31-9f02b74ce583",
              "name": "wins",
              "value": "={{ $json.sum_won }}",
              "type": "number"
            },
            {
              "id": "d07c93f5-41e8-4b02-ae75-630c81947fb2",
              "name": "winRate",
              "value": "={{ Math.round(($json.sum_won / $json.count_won) * 100) }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "95ea7c06-1d34-48b9-a2f7-508ce63b14d0",
      "name": "Win rate per line",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1440,
        0
      ]
    },
    {
      "parameters": {
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "winRate",
              "order": "ascending"
            }
          ]
        },
        "options": {}
      },
      "id": "2b6908fd-7e45-4c13-96a0-81d5be7403c6",
      "name": "Worst first",
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [
        1680,
        0
      ]
    }
  ],
  "connections": {
    "Check my last month": {
      "main": [
        [
          {
            "node": "Get the games",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the games": {
      "main": [
        [
          {
            "node": "One item per game",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One item per game": {
      "main": [
        [
          {
            "node": "My colour and result",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "My colour and result": {
      "main": [
        [
          {
            "node": "Group by opening and colour",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Group by opening and colour": {
      "main": [
        [
          {
            "node": "Enough games to mean something",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Enough games to mean something": {
      "main": [
        [
          {
            "node": "Win rate per line",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Win rate per line": {
      "main": [
        [
          {
            "node": "Worst first",
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
  "name": "Why Do I Keep Losing? – Bonus",
  "nodes": [
    {
      "parameters": {},
      "id": "4a7c0e92-3b18-4d65-8a02-71e5c93a06bd",
      "name": "Check my last month",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/chess-games-2026-07.json",
        "options": {}
      },
      "id": "b2910d47-6c53-4a08-95e1-30f7b641ce28",
      "name": "Get the games",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "120 games for one player. Chess.com serves the same shape at /pub/player/<name>/games/<year>/<month>."
    },
    {
      "parameters": {
        "fieldToSplitOut": "games",
        "options": {}
      },
      "id": "7e52b806-9143-4f7a-ad20-6c81950e4b3f",
      "name": "One item per game",
      "type": "n8n-nodes-base.splitOut",
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
              "id": "0d36e5b1-8724-4c9f-b053-e14a79026d8c",
              "name": "opening",
              "value": "={{ $json.eco }}",
              "type": "string"
            },
            {
              "id": "92f4a0c7-5d61-4e38-8b27-c0374e9b15af",
              "name": "colour",
              "value": "={{ $json.white.username === $('Get the games').first().json.player ? 'white' : 'black' }}",
              "type": "string"
            },
            {
              "id": "c81750de-4a93-4267-9f08-25b6e03c7194",
              "name": "won",
              "value": "={{ ($json.white.username === $('Get the games').first().json.player ? $json.white.result : $json.black.result) === 'win' ? 1 : 0 }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "63c90a18-7f24-4b5d-ae61-840b72e5c93f",
      "name": "My colour and result",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        720,
        0
      ],
      "notesInFlow": true,
      "notes": "Each game lists both players, so first work out which side was yours."
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "count",
              "field": "won"
            },
            {
              "aggregation": "sum",
              "field": "won"
            }
          ]
        },
        "options": {}
      },
      "id": "8d14c05b-9372-4e6a-bf08-513ae9470c2d",
      "name": "My overall win rate",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1.1,
      "position": [
        960,
        -180
      ],
      "notesInFlow": true,
      "notes": "No field to split by: one row for all 120 games. This runs first, so the last node can read it."
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "count",
              "field": "won"
            },
            {
              "aggregation": "sum",
              "field": "won"
            }
          ]
        },
        "fieldsToSplitBy": "opening, colour",
        "options": {}
      },
      "id": "1f408b76-2ad5-4e09-b843-57c0d6912ae4",
      "name": "Group by opening and colour",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1.1,
      "position": [
        960,
        60
      ],
      "notesInFlow": true,
      "notes": "Two fields, separated by a comma: one row per opening and colour."
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
              "id": "5b7e21fa-9c04-4836-a71d-0e62583b94c7",
              "leftValue": "={{ $json.count_won }}",
              "rightValue": 8,
              "operator": {
                "type": "number",
                "operation": "gte"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "a05db3e7-6128-4f94-80c5-7b1e429d3c6f",
      "name": "Enough games to mean something",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        1200,
        60
      ],
      "notesInFlow": true,
      "notes": "Two losses out of two is not a pattern."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "e2c85704-3b19-4a6d-9f82-d4e07631c05a",
              "name": "line",
              "value": "={{ $json.opening + ' as ' + $json.colour }}",
              "type": "string"
            },
            {
              "id": "7f91045c-8a62-4e37-b0d9-16c3a85e297b",
              "name": "games",
              "value": "={{ $json.count_won }}",
              "type": "number"
            },
            {
              "id": "36b4e1a9-0725-4c68-8d31-9f02b74ce583",
              "name": "wins",
              "value": "={{ $json.sum_won }}",
              "type": "number"
            },
            {
              "id": "d07c93f5-41e8-4b02-ae75-630c81947fb2",
              "name": "winRate",
              "value": "={{ Math.round(($json.sum_won / $json.count_won) * 100) }}",
              "type": "number"
            },
            {
              "id": "4c3867b0-5e29-41da-9708-b6e1540fa392",
              "name": "verdict",
              "value": "={{ Math.round(($json.sum_won / $json.count_won) * 100) < Math.round(($('My overall win rate').first().json.sum_won / $('My overall win rate').first().json.count_won) * 100) ? 'below your average – work on this one' : 'above your average – keep playing it' }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "95ea7c06-1d34-48b9-a2f7-508ce63b14d0",
      "name": "Win rate per line",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1440,
        60
      ]
    },
    {
      "parameters": {
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "winRate",
              "order": "ascending"
            }
          ]
        },
        "options": {}
      },
      "id": "2b6908fd-7e45-4c13-96a0-81d5be7403c6",
      "name": "Worst first",
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [
        1680,
        60
      ]
    }
  ],
  "connections": {
    "Check my last month": {
      "main": [
        [
          {
            "node": "Get the games",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the games": {
      "main": [
        [
          {
            "node": "One item per game",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One item per game": {
      "main": [
        [
          {
            "node": "My colour and result",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "My colour and result": {
      "main": [
        [
          {
            "node": "My overall win rate",
            "type": "main",
            "index": 0
          },
          {
            "node": "Group by opening and colour",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Group by opening and colour": {
      "main": [
        [
          {
            "node": "Enough games to mean something",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Enough games to mean something": {
      "main": [
        [
          {
            "node": "Win rate per line",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Win rate per line": {
      "main": [
        [
          {
            "node": "Worst first",
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
Why Do I Keep Losing?

## Summary
Take a month of online chess games and find out which openings and which colour actually lose you the most.

## Concept
Grouping by two fields at once and turning counts into a rate

## Glossary
- opening: The first few moves of a chess game, which have names. Games are grouped by opening to see which ones go badly.
- win rate: Wins divided by games played, as a percentage. Three wins from four games is a better record than ten wins from forty.
- sample size: How many games a number is based on. One loss in one game says nothing; nine losses in nine games is a pattern.
- group by: Putting rows into buckets that share a value – here the opening and the colour together, so each line of play gets its own row.
- Summarize: The n8n node that does the bucketing and the counting, the way a pivot table does in a spreadsheet.

## Scenario
- A club player who senses one opening keeps going wrong but cannot prove which.
- A coach who wants the same breakdown for every student, without an evening of spreadsheets.
- Any "where are we actually losing" question – refunds by product, drop-offs by step, failures by node.

## Task
Look at my last month of online chess and tell me which openings and which colour lose me the most, ignoring any line I have barely played.

## Bonus Task
Compare each line against my overall win rate, so I can see which ones are genuinely dragging me down and which are better than my average.

## Nodes
- Manual Trigger
- HTTP Request
- Split Out
- Edit Fields (Set)
- Summarize
- Filter
- Sort

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account is needed.
- The games are a practice file so the answer is exact: [chess-games-2026-07.json](https://n8n-challenges.app/fixtures/chess-games-2026-07.json) holds 120 rated games for the player balloonplayer, each with an opening, both players and how the game ended.
- When it works, point it at yourself: [Chess.com's public API](https://www.chess.com/news/view/published-data-api) serves the same shape at https://api.chess.com/pub/player/your-name/games/2026/07, needs no key, and asks only that you send a normal User-Agent header.
- Read one game in the file first. Both players are listed, and only one of them is you – that is the detail the whole challenge turns on.

## Requirements
- The result is one row per opening and colour, with games played, wins and a win rate, worst first, and lines with fewer than eight games are left out.
- The worst line is the Sicilian Defense as black: 0 wins from 9 games, a 0 per cent win rate.
- Colour matters as much as the opening: the same player wins 54 per cent as white and 37 per cent as black. Bonus: each row says whether it is above or below the overall 47 per cent.

## Tips
- Start with Manual Trigger and HTTP Request to the games file, then Split Out on the games field so each game becomes its own item.
- Work out your side first. In Edit Fields (Set), set colour with $json.white.username === $('Get the games').first().json.player ? 'white' : 'black', and read the player name from the file rather than typing it twice.
- In the same node add a number field won, set to 1 when your side's result is the string win and 0 otherwise. A number you can add up is far easier to work with than a word like resigned or timeout.
- Add Summarize with Count and Sum, both on won, and put opening, colour in Fields to Split By – two field names separated by a comma give one row per combination. Count counts the games, Sum counts the wins.
- Filter where count_won is at least 8, then Edit Fields (Set) for the percentage with Math.round((sum_won / count_won) * 100), and Sort ascending so the worst line is at the top. For the bonus, run a second Summarize with no Fields to Split By for your overall rate, wire it as the first branch so it runs first, and compare against it with $('My overall win rate').first().json.

# Spanish

## Title
¿Por qué pierdo siempre?

## Summary
Coge un mes de partidas de ajedrez en línea y descubre qué aperturas y qué color te hacen perder de verdad.

## Concept
Agrupar por dos campos a la vez y convertir recuentos en un porcentaje

## Glossary
- apertura: Las primeras jugadas de una partida, que tienen nombre propio. Las partidas se agrupan por apertura para ver cuáles salen mal.
- porcentaje de victorias: Victorias divididas entre partidas jugadas. Tres de cuatro es mejor marca que diez de cuarenta.
- tamaño de muestra: Cuántas partidas respaldan un número. Una derrota en una partida no dice nada; nueve en nueve son un patrón.
- agrupar: Meter las filas en cubos que comparten un valor; aquí la apertura y el color juntos, para que cada línea de juego tenga su fila.
- Summarize: El nodo de n8n que hace esos cubos y las cuentas, como una tabla dinámica en una hoja de cálculo.

## Scenario
- Quien juega en un club y sospecha que una apertura le va mal, pero no puede demostrar cuál.
- Quien entrena a varias personas y quiere el mismo desglose para cada una sin pasarse la tarde con hojas de cálculo.
- Cualquier pregunta del tipo «¿dónde estamos perdiendo?»: devoluciones por producto, abandonos por paso, fallos por nodo.

## Task
Mira mi último mes de ajedrez en línea y dime qué aperturas y qué color me hacen perder más, sin contar las líneas que apenas he jugado.

## Bonus Task
Compara cada línea con mi porcentaje de victorias general, para ver cuáles me hunden de verdad y cuáles están por encima de mi media.

## Nodes
- Manual Trigger
- HTTP Request
- Split Out
- Edit Fields (Set)
- Summarize
- Filter
- Sort

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta.
- Las partidas son un archivo de práctica para que la respuesta sea exacta: [chess-games-2026-07.json](https://n8n-challenges.app/fixtures/chess-games-2026-07.json) tiene 120 partidas puntuadas del jugador balloonplayer, cada una con apertura, los dos jugadores y cómo terminó.
- Cuando funcione, apúntalo a ti: [la API pública de Chess.com](https://www.chess.com/news/view/published-data-api) sirve el mismo formato en https://api.chess.com/pub/player/tu-nombre/games/2026/07, no necesita clave y solo pide que envíes una cabecera User-Agent normal.
- Lee antes una partida del archivo. Aparecen los dos jugadores y solo uno eres tú: ese detalle es la clave de todo el reto.

## Requirements
- El resultado es una fila por apertura y color, con partidas jugadas, victorias y porcentaje, de peor a mejor, y quedan fuera las líneas con menos de ocho partidas.
- La peor línea es la Defensa Siciliana con negras: 0 victorias en 9 partidas, un 0 por ciento.
- El color pesa tanto como la apertura: el mismo jugador gana el 54 por ciento con blancas y el 37 por ciento con negras. Bonus: cada fila dice si está por encima o por debajo del 47 por ciento general.

## Tips
- Empieza con Manual Trigger y HTTP Request al archivo de partidas, y después Split Out sobre el campo games para que cada partida sea un ítem.
- Averigua primero de qué color jugaste. En Edit Fields (Set) pon colour con $json.white.username === $('Get the games').first().json.player ? 'white' : 'black', leyendo el nombre del archivo en vez de escribirlo dos veces.
- En el mismo nodo añade un campo numérico won, con valor 1 cuando el resultado de tu lado sea la palabra win y 0 en el resto de casos. Un número que se puede sumar es mucho más manejable que palabras como resigned o timeout.
- Añade Summarize con Count y Sum, ambos sobre won, y pon opening, colour en Fields to Split By: dos nombres separados por coma dan una fila por combinación. Count cuenta las partidas y Sum, las victorias.
- Filtra donde count_won sea al menos 8, calcula el porcentaje en Edit Fields (Set) con Math.round((sum_won / count_won) * 100) y ordena ascendente para que la peor línea quede arriba. Para el bonus, añade un segundo Summarize sin Fields to Split By con tu media general, conéctalo como primera rama para que se ejecute antes y compara con $('My overall win rate').first().json.

# Ukrainian

## Title
Чому я постійно програю?

## Summary
Візьми місяць онлайн-партій у шахи і дізнайся, які дебюти й який колір насправді коштують тобі найбільше поразок.

## Concept
Групування одразу за двома полями і перетворення підрахунків на відсоток

## Glossary
- дебют: Перші ходи партії, які мають власні назви. Партії групують за дебютом, щоб побачити, які з них ідуть погано.
- відсоток перемог: Перемоги, поділені на зіграні партії. Три з чотирьох – кращий результат, ніж десять із сорока.
- розмір вибірки: На скількох партіях побудоване число. Одна поразка в одній партії не означає нічого; дев'ять із дев'яти – це вже закономірність.
- групування: Розкладання рядків по кошиках зі спільним значенням – тут дебют і колір разом, щоб кожна лінія гри мала свій рядок.
- Summarize: Нода n8n, яка робить ці кошики й підрахунки, як зведена таблиця в електронних таблицях.

## Scenario
- Клубний гравець, який відчуває, що один дебют постійно не йде, але не може довести, який саме.
- Тренер, якому потрібен однаковий розбір для кожного учня без вечора з таблицями.
- Будь-яке питання «де ми насправді втрачаємо»: повернення за товарами, відмови за кроками, збої за нодами.

## Task
Подивися на мій останній місяць онлайн-шахів і скажи, які дебюти й який колір дають найбільше поразок, не рахуючи ліній, які я майже не грав.

## Bonus Task
Порівняй кожну лінію з моїм загальним відсотком перемог, щоб було видно, які справді тягнуть униз, а які кращі за мою середню.

## Nodes
- Manual Trigger
- HTTP Request
- Split Out
- Edit Fields (Set)
- Summarize
- Filter
- Sort

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів не потрібно.
- Партії – це тренувальний файл, щоб відповідь була точною: [chess-games-2026-07.json](https://n8n-challenges.app/fixtures/chess-games-2026-07.json) містить 120 рейтингових партій гравця balloonplayer, кожна з дебютом, обома гравцями і тим, як вона завершилася.
- Коли все запрацює, наведи воркфлоу на себе: [публічний API Chess.com](https://www.chess.com/news/view/published-data-api) віддає такий самий формат за адресою https://api.chess.com/pub/player/твоє-імʼя/games/2026/07, не потребує ключа і лише просить надсилати звичайний заголовок User-Agent.
- Спершу прочитай одну партію з файлу. Там вказані обидва гравці, і лише один із них – ти: саме на цій деталі тримається все завдання.

## Requirements
- Результат – по одному рядку на дебют і колір, із зіграними партіями, перемогами та відсотком, від найгіршого, а лінії з менш ніж вісьмома партіями відсіяно.
- Найгірша лінія – Сицилійський захист за чорних: 0 перемог у 9 партіях, 0 відсотків.
- Колір важить не менше за дебют: той самий гравець виграє 54 відсотки за білих і 37 відсотків за чорних. Бонус: кожен рядок каже, вище він чи нижче за загальні 47 відсотків.

## Tips
- Почни з Manual Trigger і HTTP Request до файлу партій, а далі Split Out для поля games, щоб кожна партія стала окремим елементом.
- Спершу визнач свій колір. В Edit Fields (Set) постав colour як $json.white.username === $('Get the games').first().json.player ? 'white' : 'black', читаючи імʼя гравця з файлу, а не вписуючи його двічі.
- У тій самій ноді додай числове поле won зі значенням 1, коли результат твого боку – слово win, і 0 в решті випадків. Число, яке можна додавати, значно зручніше за слова на кшталт resigned чи timeout.
- Додай Summarize з Count і Sum – обидва для won – і впиши opening, colour у Fields to Split By: дві назви через кому дають рядок на кожну комбінацію. Count рахує партії, Sum – перемоги.
- Відфільтруй там, де count_won не менше 8, порахуй відсоток в Edit Fields (Set) через Math.round((sum_won / count_won) * 100) і відсортуй за зростанням, щоб найгірша лінія була вгорі. Для бонусу додай другий Summarize без Fields to Split By для загальної середньої, підключи його першою гілкою, щоб він виконався раніше, і порівнюй через $('My overall win rate').first().json.
