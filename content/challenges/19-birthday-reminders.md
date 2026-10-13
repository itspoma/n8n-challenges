---
number: 19
slug: birthday-reminders
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
  "name": "Birthdays You'll Never Forget – Core",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "days",
              "triggerAtHour": 8,
              "triggerAtMinute": 0
            }
          ]
        }
      },
      "id": "aa3f1c58-2d47-4e90-b163-7c0a9e284d15",
      "name": "Every morning",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        0,
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
          "value": "birthdays",
          "cachedResultName": "birthdays"
        },
        "returnAll": true
      },
      "id": "c7d20b46-9153-4a82-8e07-1b65f3c904ae",
      "name": "Get the birthday list",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "Columns: name, birthday (YYYY-MM-DD as text) and note."
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
              "id": "f1950d73-6b28-4c15-9ae4-20d7c8b36019",
              "leftValue": "={{ $json.birthday.slice(5) === $now.toFormat('MM-dd') || ($json.birthday.slice(5) === '02-29' && $now.toFormat('MM-dd') === '02-28' && !$now.isInLeapYear) }}",
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
      "id": "1bb48782-bf31-4ec6-8786-1e494e83e68f",
      "name": "Celebrating today",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        480,
        0
      ],
      "notesInFlow": true,
      "notes": "Day and month only. In a non-leap year, 29 February is greeted on the 28th."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "9c04e8b1-7a35-4f62-8d19-3b50c7a2e648",
              "name": "message",
              "value": "={{ 'Happy birthday, ' + $json.name + '! Turning ' + ($now.year - Number($json.birthday.slice(0, 4))) + ' today.' + ($json.note ? '\\n\\n' + $json.note : '') }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "eecc6451-645e-47b9-aeb0-ff89f062c1e3",
      "name": "Write the greeting",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        720,
        0
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://ntfy.sh/n8n-birthdays-REPLACE-ME",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Title",
              "value": "Birthday today"
            },
            {
              "name": "Tags",
              "value": "birthday"
            }
          ]
        },
        "sendBody": true,
        "contentType": "raw",
        "rawContentType": "text/plain",
        "body": "={{ $json.message }}",
        "options": {}
      },
      "id": "283494b0-ef0f-44f2-8c1f-f54be35f4726",
      "name": "Send the reminder",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        960,
        0
      ],
      "notesInFlow": true,
      "notes": "Replace the topic with your own hard-to-guess name, then open https://ntfy.sh/<topic> in a browser or the ntfy app."
    }
  ],
  "connections": {
    "Every morning": {
      "main": [
        [
          {
            "node": "Get the birthday list",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the birthday list": {
      "main": [
        [
          {
            "node": "Celebrating today",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Celebrating today": {
      "main": [
        [
          {
            "node": "Write the greeting",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Write the greeting": {
      "main": [
        [
          {
            "node": "Send the reminder",
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
  "name": "Birthdays You'll Never Forget – Bonus",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "days",
              "triggerAtHour": 8,
              "triggerAtMinute": 0
            }
          ]
        }
      },
      "id": "aa3f1c58-2d47-4e90-b163-7c0a9e284d15",
      "name": "Every morning",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        0,
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
          "value": "birthdays",
          "cachedResultName": "birthdays"
        },
        "returnAll": true
      },
      "id": "c7d20b46-9153-4a82-8e07-1b65f3c904ae",
      "name": "Get the birthday list",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "Columns: name, birthday (YYYY-MM-DD as text) and note."
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
              "id": "f1950d73-6b28-4c15-9ae4-20d7c8b36019",
              "leftValue": "={{ $json.birthday.slice(5) === $now.toFormat('MM-dd') || ($json.birthday.slice(5) === '02-29' && $now.toFormat('MM-dd') === '02-28' && !$now.isInLeapYear) }}",
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
      "id": "5e8b07a2-4f61-4d39-b520-8a17e6c40d92",
      "name": "Celebrating today",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        480,
        -120
      ],
      "notesInFlow": true,
      "notes": "Day and month only. In a non-leap year, 29 February is greeted on the 28th."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "9c04e8b1-7a35-4f62-8d19-3b50c7a2e648",
              "name": "message",
              "value": "={{ 'Happy birthday, ' + $json.name + '! Turning ' + ($now.year - Number($json.birthday.slice(0, 4))) + ' today.' + ($json.note ? '\\n\\n' + $json.note : '') }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "2b61f094-8c03-4e57-a9d2-60f4b18e7c35",
      "name": "Write the greeting",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        720,
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
              "id": "801583ff-72c7-4bc5-b6b9-ced37c5ff2d5",
              "leftValue": "={{ $json.birthday.slice(5) === $now.plus({ days: 3 }).toFormat('MM-dd') }}",
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
      "id": "0a57e3d6-8142-4b95-9c70-e6381fa05b2c",
      "name": "Three days to go",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        480,
        140
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "7e15b0c8-3f49-4d26-ba07-51c9e2370f84",
              "name": "message",
              "value": "={{ $json.name + \"'s birthday is in three days – time to sort out a present.\" + ($json.note ? '\\n\\n' + $json.note : '') }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "916dc64d-6e3d-4347-8bdb-4691a3faff40",
      "name": "Write the gift reminder",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        720,
        140
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://ntfy.sh/n8n-birthdays-REPLACE-ME",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Title",
              "value": "Birthday today"
            },
            {
              "name": "Tags",
              "value": "birthday"
            }
          ]
        },
        "sendBody": true,
        "contentType": "raw",
        "rawContentType": "text/plain",
        "body": "={{ $json.message }}",
        "options": {}
      },
      "id": "81a7c396-5d02-4b48-9e61-7f3c05a9d2b4",
      "name": "Send the reminder",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        960,
        0
      ],
      "notesInFlow": true,
      "notes": "Replace the topic with your own hard-to-guess name, then open https://ntfy.sh/<topic> in a browser or the ntfy app."
    }
  ],
  "connections": {
    "Every morning": {
      "main": [
        [
          {
            "node": "Get the birthday list",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the birthday list": {
      "main": [
        [
          {
            "node": "Celebrating today",
            "type": "main",
            "index": 0
          },
          {
            "node": "Three days to go",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Celebrating today": {
      "main": [
        [
          {
            "node": "Write the greeting",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Three days to go": {
      "main": [
        [
          {
            "node": "Write the gift reminder",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Write the greeting": {
      "main": [
        [
          {
            "node": "Send the reminder",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Write the gift reminder": {
      "main": [
        [
          {
            "node": "Send the reminder",
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
Birthdays You'll Never Forget

## Summary
Keep a birthday list in n8n and get a warm message every morning for whoever is celebrating today.

## Concept
Comparing only the day and month of a date, including the 29 February edge case

## Glossary
- Data Table: A table that lives inside n8n and keeps its rows between runs, so your birthday list survives every execution.
- leap year: A year with 29 February in it, which happens roughly every four years. Someone born on that day has no birthday in the other three.
- expression: A small piece of code between double curly braces that n8n works out while the workflow runs, such as today's month and day.
- row: One entry in the Data Table. Here each row is one person, with a name, a birthday and an optional note.
- ntfy.sh: A free notification service. Send a message to a topic name, and every phone or browser subscribed to that topic gets it.

## Scenario
- A small team that wants to congratulate colleagues without one person having to remember every date.
- A family spread over three countries, where the cousins' birthdays quietly slip past.
- Any yearly reminder that repeats on the same day and month – anniversaries, renewals, inspections or vaccinations.

## Task
Each morning, check our birthday list and send a warm message to anyone celebrating today – and don't forget Lea, who was born on 29 February.

## Bonus Task
Send a second, earlier reminder three days before each birthday, so there is still time to organise a present.

## Nodes
- Schedule Trigger
- Data Table
- Filter
- Edit Fields (Set)
- HTTP Request

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account is needed, and no data leaves n8n except the message you send.
- Create a [Data Table](https://docs.n8n.io/data/data-tables/) called birthdays with three text columns: name, birthday and note. Store the birthday as YYYY-MM-DD, for example 1991-07-04.
- Add at least five rows, including someone born on a 29 February – 2016-02-29 works well – so you can test the edge case.
- To receive the message, use [ntfy.sh](https://ntfy.sh/): pick a hard-to-guess topic name and open https://ntfy.sh/your-topic in a browser or [install the ntfy app](https://docs.ntfy.sh/subscribe/phone/). No account is needed. A Telegram bot from challenge 2 works just as well.
- Set the workflow's time zone in its Settings, so that "today" changes at your midnight and not somewhere else.

## Requirements
- Running the workflow sends one message per person whose birthday is today, naming them and the age they turn, and sends nothing at all on a day when nobody is celebrating.
- The year in the stored date never affects the match: someone born in 1950 and someone born in 2015 are both found on their day.
- A person born on 29 February is greeted on 28 February in ordinary years and on 29 February in leap years, and never twice. Bonus: a separate reminder goes out three days before each birthday.

## Tips
- Start with Schedule Trigger at 08:00 every day, then Data Table with the Get Row(s) operation and Return All switched on – that hands the whole list to the next node, one item per person.
- Add Filter and switch the condition to Boolean, then is true. That lets one expression decide everything, instead of fighting with date formats.
- Compare day and month only: $json.birthday.slice(5) gives you MM-DD from the stored date, and $now.toFormat('MM-dd') gives today in the same shape.
- Handle 29 February in the same expression by adding an or: the row matches when $json.birthday.slice(5) === '02-29' and $now.toFormat('MM-dd') === '02-28' and !$now.isInLeapYear. Luxon's isInLeapYear is already available in n8n expressions.
- Build the text in Edit Fields (Set) – $now.year - Number($json.birthday.slice(0, 4)) gives the age – then send it with HTTP Request, POST to https://ntfy.sh/your-topic with Body Content Type Raw. For the bonus, add a second Filter off the Data Table node comparing with $now.plus({ days: 3 }).toFormat('MM-dd') and let it feed the same HTTP Request node.

# Spanish

## Title
Cumpleaños que nunca olvidarás

## Summary
Guarda la lista de cumpleaños en n8n y recibe cada mañana un mensaje cariñoso para quien los cumple hoy.

## Concept
Comparar solo el día y el mes de una fecha, incluido el caso especial del 29 de febrero

## Glossary
- Data Table: Una tabla que vive dentro de n8n y conserva sus filas entre ejecuciones, así que tu lista de cumpleaños sobrevive a cada ejecución.
- año bisiesto: Un año que tiene 29 de febrero, algo que pasa aproximadamente cada cuatro años. Quien nace ese día no tiene cumpleaños en los otros tres.
- expresión: Un trocito de código entre llaves dobles que n8n calcula mientras el workflow se ejecuta, como el mes y el día de hoy.
- fila: Una entrada de la Data Table. Aquí cada fila es una persona, con nombre, fecha de nacimiento y una nota opcional.
- ntfy.sh: Un servicio gratuito de notificaciones. Envías un mensaje a un nombre de tema y lo reciben todos los móviles o navegadores suscritos a ese tema.

## Scenario
- Un equipo pequeño que quiere felicitar a sus compañeros sin que una persona tenga que acordarse de todas las fechas.
- Una familia repartida por tres países, donde los cumpleaños de los primos pasan sin que nadie se entere.
- Cualquier recordatorio anual que se repite el mismo día y mes: aniversarios, renovaciones, revisiones o vacunas.

## Task
Cada mañana, revisa nuestra lista de cumpleaños y envía un mensaje cariñoso a quien los cumpla hoy, y no te olvides de Lea, que nació un 29 de febrero.

## Bonus Task
Envía un segundo aviso, tres días antes de cada cumpleaños, para que dé tiempo a preparar un regalo.

## Nodes
- Schedule Trigger
- Data Table
- Filter
- Edit Fields (Set)
- HTTP Request

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta, y de n8n no sale ningún dato salvo el mensaje que envías.
- Crea una [Data Table](https://docs.n8n.io/data/data-tables/) llamada birthdays con tres columnas de texto: name, birthday y note. Guarda la fecha como YYYY-MM-DD, por ejemplo 1991-07-04.
- Añade al menos cinco filas, incluida una persona nacida un 29 de febrero – 2016-02-29 va bien – para poder probar el caso especial.
- Para recibir el mensaje usa [ntfy.sh](https://ntfy.sh/): elige un nombre de tema difícil de adivinar y abre https://ntfy.sh/tu-tema en el navegador o [instala la app de ntfy](https://docs.ntfy.sh/subscribe/phone/). No hace falta cuenta. Un bot de Telegram del reto 2 sirve igual de bien.
- Configura la zona horaria del workflow en sus Settings para que «hoy» cambie a tu medianoche y no en otro sitio.

## Requirements
- Al ejecutar el workflow sale un mensaje por cada persona que cumple años hoy, con su nombre y la edad que cumple, y no sale nada los días en que no hay cumpleaños.
- El año de la fecha guardada nunca afecta a la coincidencia: alguien nacido en 1950 y alguien nacido en 2015 aparecen igual el día que les toca.
- Quien nació un 29 de febrero recibe la felicitación el 28 de febrero en los años normales y el 29 en los bisiestos, y nunca dos veces. Bonus: tres días antes de cada cumpleaños sale un aviso aparte.

## Tips
- Empieza con Schedule Trigger cada día a las 08:00 y después Data Table con la operación Get Row(s) y Return All activado: eso pasa la lista entera al siguiente nodo, un ítem por persona.
- Añade Filter y cambia la condición a Boolean y después is true. Así una sola expresión decide todo, en vez de pelearte con formatos de fecha.
- Compara solo día y mes: $json.birthday.slice(5) te da MM-DD de la fecha guardada y $now.toFormat('MM-dd') te da hoy con la misma forma.
- Resuelve el 29 de febrero en la misma expresión añadiendo un or: la fila coincide cuando $json.birthday.slice(5) === '02-29' y $now.toFormat('MM-dd') === '02-28' y !$now.isInLeapYear. El isInLeapYear de Luxon ya está disponible en las expresiones de n8n.
- Escribe el texto en Edit Fields (Set) – $now.year - Number($json.birthday.slice(0, 4)) da la edad – y envíalo con HTTP Request, POST a https://ntfy.sh/tu-tema con Body Content Type Raw. Para el bonus, añade un segundo Filter colgando del nodo Data Table que compare con $now.plus({ days: 3 }).toFormat('MM-dd') y que alimente el mismo nodo HTTP Request.

# Ukrainian

## Title
Дні народження, які не забудеш

## Summary
Тримай список днів народження в n8n і щоранку отримуй тепле повідомлення про того, хто святкує сьогодні.

## Concept
Порівняння лише дня та місяця дати, разом із особливим випадком 29 лютого

## Glossary
- Data Table: Таблиця, яка живе всередині n8n і зберігає рядки між запусками, тож твій список днів народження переживає кожне виконання.
- високосний рік: Рік, у якому є 29 лютого; так буває приблизно раз на чотири роки. У того, хто народився цього дня, в інші три роки дня народження немає.
- вираз: Невеликий шматочок коду у подвійних фігурних дужках, який n8n обчислює під час виконання, наприклад сьогоднішній місяць і день.
- рядок: Один запис у Data Table. Тут кожен рядок – це людина з іменем, датою народження та необов'язковою приміткою.
- ntfy.sh: Безкоштовний сервіс сповіщень. Надсилаєш повідомлення на назву теми – і його отримує кожен телефон чи браузер, підписаний на цю тему.

## Scenario
- Невелика команда, яка хоче вітати колег без того, щоб одна людина пам'ятала всі дати.
- Родина, розкидана по трьох країнах, де дні народження двоюрідних тихо проходять повз.
- Будь-яке щорічне нагадування, що повторюється того самого дня й місяця: річниці, продовження підписок, техогляди чи щеплення.

## Task
Щоранку переглядай наш список днів народження і надсилай тепле повідомлення кожному, хто святкує сьогодні, і не забудь про Лею, яка народилася 29 лютого.

## Bonus Task
Надсилай ще одне, раніше нагадування за три дні до кожного дня народження, щоб був час подбати про подарунок.

## Nodes
- Schedule Trigger
- Data Table
- Filter
- Edit Fields (Set)
- HTTP Request

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів не потрібно, і з n8n не виходить жодних даних, окрім повідомлення, яке ти надсилаєш.
- Створи [Data Table](https://docs.n8n.io/data/data-tables/) під назвою birthdays із трьома текстовими колонками: name, birthday і note. Зберігай дату як YYYY-MM-DD, наприклад 1991-07-04.
- Додай щонайменше п'ять рядків, зокрема людину, народжену 29 лютого – добре підійде 2016-02-29 – щоб перевірити особливий випадок.
- Щоб отримувати повідомлення, скористайся [ntfy.sh](https://ntfy.sh/): вибери назву теми, яку важко вгадати, і відкрий https://ntfy.sh/твоя-тема у браузері або [встанови застосунок ntfy](https://docs.ntfy.sh/subscribe/phone/). Акаунт не потрібен. Telegram-бот із завдання 2 підійде так само добре.
- Налаштуй часовий пояс воркфлоу в його Settings, щоб «сьогодні» змінювалося з твоєю північчю, а не десь інде.

## Requirements
- Запуск воркфлоу надсилає одне повідомлення на кожну людину, яка святкує сьогодні, з її іменем і віком, який вона відзначає, і не надсилає нічого в дні, коли іменинників немає.
- Рік у збереженій даті ніколи не впливає на збіг: і народжений 1950 року, і народжений 2015-го знаходяться у свій день.
- Людину, народжену 29 лютого, вітають 28 лютого у звичайні роки і 29 лютого у високосні, і ніколи двічі. Бонус: за три дні до кожного дня народження надходить окреме нагадування.

## Tips
- Почни зі Schedule Trigger щодня о 08:00, далі Data Table з операцією Get Row(s) і увімкненим Return All: так увесь список переходить до наступної ноди, по одному елементу на людину.
- Додай Filter і зміни умову на Boolean, а потім is true. Тоді все вирішує один вираз, і не доведеться воювати з форматами дат.
- Порівнюй лише день і місяць: $json.birthday.slice(5) дає MM-DD зі збереженої дати, а $now.toFormat('MM-dd') дає сьогоднішній день у такому самому вигляді.
- Розв'яжи 29 лютого в тому самому виразі через or: рядок збігається, коли $json.birthday.slice(5) === '02-29' і $now.toFormat('MM-dd') === '02-28' і !$now.isInLeapYear. Luxon-івський isInLeapYear уже доступний у виразах n8n.
- Напиши текст в Edit Fields (Set) – $now.year - Number($json.birthday.slice(0, 4)) дає вік – і надішли його через HTTP Request, POST на https://ntfy.sh/твоя-тема з Body Content Type Raw. Для бонусу додай другий Filter від ноди Data Table, що порівнює з $now.plus({ days: 3 }).toFormat('MM-dd'), і підключи його до тієї самої ноди HTTP Request.
