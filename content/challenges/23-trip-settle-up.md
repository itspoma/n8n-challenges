---
number: 23
slug: trip-settle-up
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
  "name": "Who Owes Whom After the Trip? – Core",
  "nodes": [
    {
      "parameters": {},
      "id": "2c31edee-f6ca-4382-a83e-0cf20afedd4a",
      "name": "Settle up",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/trip-expenses.json",
        "options": {}
      },
      "id": "5b83d207-914c-4f6a-b028-7e3159c04da6",
      "name": "Get the trip expenses",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "One item with people and expenses."
    },
    {
      "parameters": {
        "fieldToSplitOut": "expenses",
        "options": {}
      },
      "id": "9d2706be-85f1-4c37-a94e-61b0c8537f2d",
      "name": "One item per expense",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        480,
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
              "id": "f4c70019-2e46-4b2c-b0c5-b421bf332be9",
              "leftValue": "={{ $json.currency }}",
              "rightValue": "EUR",
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
      "id": "e49a9bfc-daca-4374-8e8d-ef2fb96f7e12",
      "name": "Euro costs only",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        720,
        0
      ],
      "notesInFlow": true,
      "notes": "Three costs were paid in dollars or pounds. The bonus deals with those."
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "sum",
              "field": "amount"
            }
          ]
        },
        "fieldsToSplitBy": "paidBy",
        "options": {}
      },
      "id": "63b0948f-5d21-4e7c-8a16-72f0c9e5134b",
      "name": "What each person paid",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1.1,
      "position": [
        960,
        0
      ],
      "notesInFlow": true,
      "notes": "Only people who paid for something appear here."
    },
    {
      "parameters": {
        "mode": "runOnceForAllItems",
        "jsCode": "// Everyone on the trip, including anyone who never paid for anything.\nconst everyone = $('Get the trip expenses').first().json.people;\nconst round = (value) => Math.round(value * 100) / 100;\n\nconst paidByPerson = Object.fromEntries(\n  $input.all().map((item) => [item.json.paidBy, item.json.sum_amountEur ?? item.json.sum_amount]),\n);\nconst paid = everyone.map((person) => ({ person, paid: paidByPerson[person] ?? 0 }));\nconst total = paid.reduce((sum, entry) => sum + entry.paid, 0);\nconst share = total / everyone.length;\n\nconst balances = paid.map(({ person, paid: amount }) => ({ person, balance: round(amount - share) }));\nconst debtors = balances.filter((b) => b.balance < -0.005).sort((a, b) => a.balance - b.balance);\nconst creditors = balances.filter((b) => b.balance > 0.005).sort((a, b) => b.balance - a.balance);\n\n// Biggest debtor pays the biggest creditor, until everyone is square.\nconst transfers = [];\nlet debtor = 0;\nlet creditor = 0;\nwhile (debtor < debtors.length && creditor < creditors.length) {\n  const amount = round(Math.min(-debtors[debtor].balance, creditors[creditor].balance));\n  if (amount > 0) {\n    transfers.push({ json: { from: debtors[debtor].person, to: creditors[creditor].person, amount } });\n  }\n  debtors[debtor].balance += amount;\n  creditors[creditor].balance -= amount;\n  if (Math.abs(debtors[debtor].balance) < 0.005) debtor += 1;\n  if (Math.abs(creditors[creditor].balance) < 0.005) creditor += 1;\n}\n\nreturn transfers;"
      },
      "id": "a6604402-3488-4de0-afb5-508d44e16aa0",
      "name": "Work out the transfers",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1200,
        0
      ],
      "notesInFlow": true,
      "notes": "Fair share, then the fewest payments that settle it."
    }
  ],
  "connections": {
    "Settle up": {
      "main": [
        [
          {
            "node": "Get the trip expenses",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the trip expenses": {
      "main": [
        [
          {
            "node": "One item per expense",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One item per expense": {
      "main": [
        [
          {
            "node": "Euro costs only",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Euro costs only": {
      "main": [
        [
          {
            "node": "What each person paid",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "What each person paid": {
      "main": [
        [
          {
            "node": "Work out the transfers",
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
  "name": "Who Owes Whom After the Trip? – Bonus",
  "nodes": [
    {
      "parameters": {},
      "id": "c0f41a86-72b5-4e09-8d13-5a7e61f3b22b",
      "name": "Settle up",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/trip-expenses.json",
        "options": {}
      },
      "id": "5b83d207-914c-4f6a-b028-7e3159c04da6",
      "name": "Get the trip expenses",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "One item with people and expenses."
    },
    {
      "parameters": {
        "fieldToSplitOut": "expenses",
        "options": {}
      },
      "id": "9d2706be-85f1-4c37-a94e-61b0c8537f2d",
      "name": "One item per expense",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        480,
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
              "id": "2e17b940-6c85-4a03-bd71-80f5e2a94d17",
              "leftValue": "={{ $json.currency }}",
              "rightValue": "EUR",
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
      "id": "4f09b3c6-7d82-4e15-9b40-a3671e58c20d",
      "name": "Paid in euros?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
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
              "id": "a61305fd-29b4-4c08-be73-5041e9c2a87f",
              "name": "paidBy",
              "value": "={{ $json.paidBy }}",
              "type": "string"
            },
            {
              "id": "0c84b7e1-5396-4a2d-8f17-62b95d034ea8",
              "name": "amountEur",
              "value": "={{ $json.amount }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "68c6ec2c-1052-4257-9ac1-5a2c258fa767",
      "name": "Already in euros",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1000,
        -120
      ]
    },
    {
      "parameters": {
        "url": "=https://api.frankfurter.dev/v1/{{ $json.date }}?base={{ $json.currency }}&symbols=EUR",
        "options": {}
      },
      "id": "36ea9418-0c72-4b53-98d6-7f04e25b1a30",
      "name": "That day's ECB rate",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        1000,
        140
      ],
      "notesInFlow": true,
      "notes": "Frankfurter, no key. A past date always returns the same rate."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "b05c7124-8ae3-4906-bf51-27d0938ca64e",
              "name": "paidBy",
              "value": "={{ $('One item per expense').item.json.paidBy }}",
              "type": "string"
            },
            {
              "id": "e3187d60-4b95-42af-8d17-05c69b3e7a42",
              "name": "amountEur",
              "value": "={{ $('One item per expense').item.json.amount * $json.rates.EUR }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "9bcf7609-553b-4739-9c5c-9a3e0ec2e960",
      "name": "Convert to euros",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1240,
        140
      ],
      "notesInFlow": true,
      "notes": "$('One item per expense').item keeps each rate with the cost it belongs to."
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "sum",
              "field": "amountEur"
            }
          ]
        },
        "fieldsToSplitBy": "paidBy",
        "options": {}
      },
      "id": "63b0948f-5d21-4e7c-8a16-72f0c9e5134b",
      "name": "What each person paid",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1.1,
      "position": [
        1480,
        0
      ]
    },
    {
      "parameters": {
        "mode": "runOnceForAllItems",
        "jsCode": "// Everyone on the trip, including anyone who never paid for anything.\nconst everyone = $('Get the trip expenses').first().json.people;\nconst round = (value) => Math.round(value * 100) / 100;\n\nconst paidByPerson = Object.fromEntries(\n  $input.all().map((item) => [item.json.paidBy, item.json.sum_amountEur ?? item.json.sum_amount]),\n);\nconst paid = everyone.map((person) => ({ person, paid: paidByPerson[person] ?? 0 }));\nconst total = paid.reduce((sum, entry) => sum + entry.paid, 0);\nconst share = total / everyone.length;\n\nconst balances = paid.map(({ person, paid: amount }) => ({ person, balance: round(amount - share) }));\nconst debtors = balances.filter((b) => b.balance < -0.005).sort((a, b) => a.balance - b.balance);\nconst creditors = balances.filter((b) => b.balance > 0.005).sort((a, b) => b.balance - a.balance);\n\n// Biggest debtor pays the biggest creditor, until everyone is square.\nconst transfers = [];\nlet debtor = 0;\nlet creditor = 0;\nwhile (debtor < debtors.length && creditor < creditors.length) {\n  const amount = round(Math.min(-debtors[debtor].balance, creditors[creditor].balance));\n  if (amount > 0) {\n    transfers.push({ json: { from: debtors[debtor].person, to: creditors[creditor].person, amount } });\n  }\n  debtors[debtor].balance += amount;\n  creditors[creditor].balance -= amount;\n  if (Math.abs(debtors[debtor].balance) < 0.005) debtor += 1;\n  if (Math.abs(creditors[creditor].balance) < 0.005) creditor += 1;\n}\n\nreturn transfers;"
      },
      "id": "a7c35019-8264-4e7b-bf03-12d6940ae85c",
      "name": "Work out the transfers",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1720,
        0
      ],
      "notesInFlow": true,
      "notes": "Fair share, then the fewest payments that settle it."
    }
  ],
  "connections": {
    "Settle up": {
      "main": [
        [
          {
            "node": "Get the trip expenses",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the trip expenses": {
      "main": [
        [
          {
            "node": "One item per expense",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One item per expense": {
      "main": [
        [
          {
            "node": "Paid in euros?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Paid in euros?": {
      "main": [
        [
          {
            "node": "Already in euros",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "That day's ECB rate",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Already in euros": {
      "main": [
        [
          {
            "node": "What each person paid",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "That day's ECB rate": {
      "main": [
        [
          {
            "node": "Convert to euros",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Convert to euros": {
      "main": [
        [
          {
            "node": "What each person paid",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "What each person paid": {
      "main": [
        [
          {
            "node": "Work out the transfers",
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
Who Owes Whom After the Trip?

## Summary
Six friends paid for different things on a trip. Work out the fewest bank transfers that make everyone square again.

## Concept
Turning what each person paid into a fair share, and then into the fewest payments

## Glossary
- fair share: The total cost divided by the number of people. Everyone should end up having paid this much, no matter who held the card on the day.
- balance: What one person paid minus their fair share. A positive balance means money is owed to them, a negative one that they owe.
- settle up: Paying the balances off with as few transfers as possible, instead of everyone paying everyone.
- the Code node: An n8n node where you write a few lines of JavaScript, for the rare job no other node does – like matching debtors to creditors.
- ECB rate: The daily reference exchange rate published by the European Central Bank. Asking for a past date always gives the same answer.

## Scenario
- Six friends back from a week away, with ten receipts and nobody keen to do the maths.
- Flatmates splitting a month of shared shopping without an app that wants their bank details.
- Any job where a pile of numbers has to become a short list of actions – stock to reorder, invoices to chase, shifts to swap.

## Task
Six friends paid for different things on a trip. Work out who should pay whom, and keep it to the fewest transfers that settle everything.

## Bonus Task
Three of the costs were paid in dollars or pounds. Convert them at that day's ECB rate before settling, and show how the answer changes.

## Nodes
- Manual Trigger
- HTTP Request
- Split Out
- Filter
- IF
- Edit Fields (Set)
- Summarize
- Code

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account is needed.
- The receipts are a practice file: [trip-expenses.json](https://n8n-challenges.app/fixtures/trip-expenses.json) holds six people and ten costs, each with a date, who paid, an amount and a currency.
- Exchange rates for the bonus come from the free [Frankfurter API](https://frankfurter.dev/), which needs no key and serves the European Central Bank's daily rates. Because the trip is in the past, the rates never change.
- You will write a few lines of JavaScript in the Code node. The solution is about fifteen lines, and every other step is an ordinary node.

## Requirements
- The workflow prints a short list of transfers, each with who pays, who is paid and how much, and nobody both sends and receives money.
- For the euro costs the total is 2261.50 euros, a fair share of 376.92 each, and five transfers settle it, the largest being Chiara paying Bruno 376.92.
- Chiara paid for nothing in euros and is still included in the split – a person who never paid must not be left out of the share. Bonus: with the dollar and pound costs converted the total becomes 3226.98, and the largest transfer is Dmytro paying Bruno 353.43.

## Tips
- Start with Manual Trigger and HTTP Request to the expenses file, then Split Out on the expenses field so each cost becomes its own item.
- For the core answer add Filter where currency equals EUR, then Summarize split by paidBy with Sum on amount. That gives one item per person who paid, with sum_amount.
- Watch the trap before you write any code: Summarize only lists people who paid for something, and Chiara paid for nothing. Read the full list from the original file instead, with $('Get the trip expenses').first().json.people.
- In the Code node, set Mode to Run Once for All Items. Work out the total, divide by the number of people for the fair share, and give everyone a balance of what they paid minus that share.
- Then match them up: sort debtors most negative first and creditors most positive first, and repeatedly transfer the smaller of the two amounts, moving on whenever someone reaches zero. For the bonus, replace the Filter with an IF on currency, send the other branch to HTTP Request at https://api.frankfurter.dev/v1/{{ $json.date }}?base={{ $json.currency }}&symbols=EUR, and multiply by rates.EUR – use $('One item per expense').item to keep each rate with the cost it belongs to.

# Spanish

## Title
¿Quién debe qué después del viaje?

## Summary
Seis amigos pagaron cosas distintas en un viaje. Calcula las transferencias mínimas para que todos queden en paz.

## Concept
Convertir lo que pagó cada persona en una parte justa, y después en el menor número de pagos

## Glossary
- parte justa: El coste total dividido entre el número de personas. Al final todos deberían haber puesto esa cantidad, da igual quién sacara la tarjeta cada día.
- saldo: Lo que una persona pagó menos su parte justa. Un saldo positivo significa que le deben dinero; uno negativo, que lo debe.
- saldar cuentas: Pagar los saldos con las menos transferencias posibles, en vez de que todos paguen a todos.
- el nodo Code: Un nodo de n8n donde escribes unas líneas de JavaScript, para ese trabajo raro que no hace ningún otro nodo, como emparejar a quien debe con quien cobra.
- tipo del BCE: El tipo de cambio de referencia que publica cada día el Banco Central Europeo. Si pides una fecha pasada, siempre da el mismo resultado.

## Scenario
- Seis amigos de vuelta de una semana fuera, con diez tickets y ninguna gana de hacer cuentas.
- Compañeros de piso repartiendo un mes de compra común sin una app que les pida los datos del banco.
- Cualquier tarea en la que un montón de números tenga que convertirse en una lista corta de acciones: stock que reponer, facturas que reclamar, turnos que cambiar.

## Task
Seis amigos pagaron cosas distintas en un viaje. Calcula quién debe pagar a quién, con el menor número de transferencias que lo deje todo saldado.

## Bonus Task
Tres de los gastos se pagaron en dólares o en libras. Conviértelos al tipo del BCE de ese día antes de saldar y enseña cómo cambia el resultado.

## Nodes
- Manual Trigger
- HTTP Request
- Split Out
- Filter
- IF
- Edit Fields (Set)
- Summarize
- Code

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta.
- Los tickets son un archivo de práctica: [trip-expenses.json](https://n8n-challenges.app/fixtures/trip-expenses.json) tiene seis personas y diez gastos, cada uno con fecha, quién pagó, importe y moneda.
- Los tipos de cambio del bonus vienen de la [API Frankfurter](https://frankfurter.dev/), gratuita, sin clave y con los tipos diarios del Banco Central Europeo. Como el viaje ya pasó, los tipos no cambian nunca.
- Escribirás unas líneas de JavaScript en el nodo Code. La solución son unas quince líneas, y todos los demás pasos son nodos normales.

## Requirements
- El workflow muestra una lista corta de transferencias, cada una con quién paga, a quién y cuánto, y nadie envía y recibe dinero a la vez.
- Con los gastos en euros el total es de 2261,50 euros, una parte justa de 376,92 por persona, y cinco transferencias lo saldan; la mayor es Chiara pagando 376,92 a Bruno.
- Chiara no pagó nada en euros y aun así entra en el reparto: quien no pagó nada no puede quedarse fuera de la parte justa. Bonus: con los gastos en dólares y libras convertidos el total pasa a 3226,98 y la mayor transferencia es Dmytro pagando 353,43 a Bruno.

## Tips
- Empieza con Manual Trigger y HTTP Request al archivo de gastos, y después Split Out sobre el campo expenses para que cada gasto sea un ítem.
- Para la respuesta base añade Filter donde currency sea igual a EUR y luego Summarize dividido por paidBy con Sum sobre amount. Eso da un ítem por persona que pagó, con sum_amount.
- Fíjate en la trampa antes de escribir código: Summarize solo lista a quien pagó algo, y Chiara no pagó nada. Lee la lista completa del archivo original con $('Get the trip expenses').first().json.people.
- En el nodo Code pon Mode en Run Once for All Items. Calcula el total, divídelo entre el número de personas para la parte justa y da a cada una un saldo de lo que pagó menos esa parte.
- Después emparéjalos: ordena a quienes deben de más negativo a menos y a quienes cobran de más positivo a menos, y transfiere repetidamente el menor de los dos importes, pasando al siguiente cuando alguien llegue a cero. Para el bonus, cambia el Filter por un IF sobre currency, manda la otra rama a HTTP Request a https://api.frankfurter.dev/v1/{{ $json.date }}?base={{ $json.currency }}&symbols=EUR y multiplica por rates.EUR; usa $('One item per expense').item para que cada tipo se quede con el gasto que le toca.

# Ukrainian

## Title
Хто кому винен після подорожі?

## Summary
Шестеро друзів платили за різні речі в подорожі. Порахуй найменшу кількість переказів, щоб усі були квити.

## Concept
Перетворення сплаченого кожним на справедливу частку, а потім – на найменшу кількість платежів

## Glossary
- справедлива частка: Загальні витрати, поділені на кількість людей. Кожен зрештою має витратити саме стільки, хто б якого дня не діставав картку.
- баланс: Те, що людина заплатила, мінус її справедлива частка. Додатний баланс означає, що їй винні; від'ємний – що винна вона.
- розрахуватися: Погасити баланси якомога меншою кількістю переказів, замість того щоб усі платили всім.
- нода Code: Нода n8n, де пишеш кілька рядків JavaScript для рідкісної роботи, якої не робить жодна інша нода, – наприклад, звести боржників із тими, кому винні.
- курс ЄЦБ: Щоденний довідковий курс, який публікує Європейський центральний банк. Якщо запитати минулу дату, відповідь завжди однакова.

## Scenario
- Шестеро друзів повернулися з тижневої подорожі з десятком чеків, і рахувати не хоче ніхто.
- Сусіди по квартирі ділять місяць спільних покупок без застосунку, який просить банківські дані.
- Будь-яка робота, де купа чисел має перетворитися на короткий список дій: що дозамовити, за якими рахунками нагадати, якими змінами помінятися.

## Task
Шестеро друзів платили за різні речі в подорожі. Порахуй, хто кому має заплатити, і вклади це в найменшу кількість переказів, які все закривають.

## Bonus Task
Три витрати оплачено в доларах або фунтах. Переведи їх за курсом ЄЦБ того дня перед розрахунком і покажи, як зміниться відповідь.

## Nodes
- Manual Trigger
- HTTP Request
- Split Out
- Filter
- IF
- Edit Fields (Set)
- Summarize
- Code

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів не потрібно.
- Чеки – це тренувальний файл: [trip-expenses.json](https://n8n-challenges.app/fixtures/trip-expenses.json) містить шістьох людей і десять витрат, кожна з датою, тим, хто платив, сумою та валютою.
- Курси для бонусу надходять із безкоштовного [API Frankfurter](https://frankfurter.dev/), якому не потрібен ключ і який віддає щоденні курси Європейського центрального банку. Оскільки подорож у минулому, курси вже не змінюються.
- Ти напишеш кілька рядків JavaScript у ноді Code. Розв'язок – близько п'ятнадцяти рядків, а всі інші кроки – звичайні ноди.

## Requirements
- Воркфлоу друкує короткий список переказів, кожен із тим, хто платить, кому і скільки, і ніхто одночасно не надсилає й не отримує гроші.
- Для витрат у євро загальна сума – 2261,50 євро, справедлива частка – 376,92 на особу, і п'ять переказів це закривають; найбільший – Chiara платить Bruno 376,92.
- Chiara не платила нічого в євро, але все одно входить у поділ: того, хто не платив, не можна лишати поза часткою. Бонус: після переведення доларових і фунтових витрат сума стає 3226,98, а найбільший переказ – Dmytro платить Bruno 353,43.

## Tips
- Почни з Manual Trigger і HTTP Request до файлу витрат, а потім Split Out для поля expenses, щоб кожна витрата стала окремим елементом.
- Для базової відповіді додай Filter, де currency дорівнює EUR, а далі Summarize із розділенням за paidBy і Sum для amount. Це дає по одному елементу на кожного, хто платив, із sum_amount.
- Зверни увагу на пастку ще до написання коду: Summarize перелічує лише тих, хто за щось платив, а Chiara не платила нічого. Візьми повний список із початкового файлу через $('Get the trip expenses').first().json.people.
- У ноді Code постав Mode на Run Once for All Items. Порахуй загальну суму, поділи на кількість людей для справедливої частки й дай кожному баланс: сплачене мінус ця частка.
- Далі зведи їх: упорядкуй боржників від найбільш від'ємного, а отримувачів – від найбільш додатного, і щоразу переказуй меншу з двох сум, переходячи далі, щойно хтось дійде до нуля. Для бонусу заміни Filter на IF за currency, відправ другу гілку в HTTP Request на https://api.frankfurter.dev/v1/{{ $json.date }}?base={{ $json.currency }}&symbols=EUR і помнож на rates.EUR – використай $('One item per expense').item, щоб кожен курс лишився зі своєю витратою.
