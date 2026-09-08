---
number: 1
slug: webhook-welcome
difficulty: beginner
time: 10–15 min
complexity: 1
color: #fffdf6
ink: #1b2427
---

# Solution Data

Internal reference for future solution features. This section is not displayed on the challenge page.

## Core Workflow JSON (without bonus)

```json
{
  "name": "Challenge 1 – Valencia Greeting Webhook (Core)",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "GET",
        "path": "welcome",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "3fe21232-2c51-4a44-bbdb-01168f8aa727",
      "name": "GET /welcome",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [
        0,
        0
      ],
      "webhookId": "b8badcee-9896-43a6-9cff-e0bc7925ec91",
      "notesInFlow": true,
      "notes": "Receives a browser request at the welcome path."
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "Hello world from Valencia!",
        "options": {}
      },
      "id": "13edabac-2027-4c93-9122-2e60aab43657",
      "name": "Return greeting",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.4,
      "position": [
        300,
        0
      ],
      "notesInFlow": true,
      "notes": "Returns the fixed core greeting directly to the browser."
    }
  ],
  "pinData": {},
  "connections": {
    "GET /welcome": {
      "main": [
        [
          {
            "node": "Return greeting",
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
  "versionId": "dc991dfd-6ee0-4530-823a-923005654d14",
  "meta": {
    "templateCredsSetupCompleted": true
  },
  "tags": []
}
```

## Bonus Workflow JSON

```json
{
  "name": "Challenge 1 – Valencia Greeting Webhook (Bonus)",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "GET",
        "path": "welcome",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "2ef53189-a521-47ce-8d5d-a8f8996be794",
      "name": "GET /welcome",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [
        0,
        0
      ],
      "webhookId": "bde464a1-f313-486a-aac9-d76029cf119b",
      "notesInFlow": true,
      "notes": "Receives a browser request. Try the URL with no query parameter, or add ?name=Ana for the bonus task."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "6be3d94b-0dc6-43aa-8d31-567d655953aa",
              "name": "greeting",
              "value": "={{ 'Hello ' + ($json.query.name || 'world') + ' from Valencia!' }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "105ae1c6-2f1f-4f84-9701-a08f3ac57937",
      "name": "Build greeting",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        280,
        0
      ],
      "notesInFlow": true,
      "notes": "Uses the optional name query parameter and falls back to world."
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "={{ $json.greeting }}",
        "options": {}
      },
      "id": "99349166-fe5b-4d37-8bfd-a7a33f82f858",
      "name": "Return greeting",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.4,
      "position": [
        560,
        0
      ],
      "notesInFlow": true,
      "notes": "Sends the greeting back to the browser as readable text."
    }
  ],
  "pinData": {},
  "connections": {
    "GET /welcome": {
      "main": [
        [
          {
            "node": "Build greeting",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Build greeting": {
      "main": [
        [
          {
            "node": "Return greeting",
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
  "versionId": "3da18f8d-93d6-45dc-a34c-5f1302ed5192",
  "meta": {
    "templateCredsSetupCompleted": true
  },
  "tags": []
}
```

# English

## Title
Valencia Greeting Webhook

## Summary
Create a web address that greets its visitor from Valencia.

## Concept
Webhook triggers, query parameters, and browser responses

## Glossary
- n8n: n8n is a tool for automating work. You connect steps called nodes so data can move and apps can work together.
- Webhook: A webhook is a special URL that can start an n8n workflow when a person or another app opens it or sends a request to it.
- GET method: GET asks a URL to send information back. Opening a normal web page in a browser usually sends a GET request.
- GET parameters: Parameters are extra values added to the end of a URL after ?. They give the workflow more detail, such as ?name=Ana.
- Other HTTP methods: POST sends data to a URL, usually to create or submit something. GET mainly asks for data; POST mainly sends data. PUT and PATCH update data, while DELETE removes it.
- JSON, text, and HTML: Text is plain words. HTML adds page structure and formatting for a browser. JSON organizes data with names and values so apps can read it.
- QR code: A QR code is a square image that stores information, often a URL. A phone camera can scan it and open that URL.

## Scenario
- An event landing page loads its event list from a web address, so newly published events appear automatically without editing the page.
- A workshop uses an attendee web address as its live source, so every new signup appears automatically as soon as the person registers.
- A venue QR code opens a web address that shows the current Wi-Fi password, so organizers can change the password without reprinting the QR code.
- A status page displays live workshop capacity or available seats.

## Task
The Valencia event team needs a web address that displays "Hello world from Valencia!" whenever someone opens it.

## Bonus Task
Make the same address greet a visitor by name when their name is added to it – for example, "Hello Ana from Valencia!"

## Nodes
- Webhook
- Edit Fields (Set)
- Respond to Webhook

## Preparation
- Sign up for [n8n Cloud](/n8n-sign-up) or open an existing n8n workspace, then create a new workflow.
- Use a modern web browser on a computer or phone to build and test the result.
- You do not need another service or any secret access code for this challenge.

## Requirements
- The same web address works every time it is opened in a browser.
- Without a name, the browser displays exactly "Hello world from Valencia!"
- When the address ends with "?name=Ana", the browser displays exactly "Hello Ana from Valencia!"

## Tips
- Start with the Webhook node, which creates the web address that starts the workflow. Choose GET – the option a browser uses to ask an address for information – and set Path, the final part of the address, to welcome.
- Add Edit Fields (Set), which creates the greeting text that the workflow will pass to the final step.
- In the Webhook node, set Respond to "Using Respond to Webhook Node" so the final node can control what the browser receives.
- In Edit Fields (Set), create a field named greeting. For the bonus, use an expression – a small formula – to read name from the query parameters, the extra values after ? in the address, and use world when no name was given.
- Finish with Respond to Webhook, which sends the result back to the browser. Choose Text and return the greeting field. The Test URL works while n8n is listening; after publishing, use the Production URL.

# Spanish

## Title
Webhook de saludo desde Valencia

## Summary
Crea una dirección web que salude a quien la visite desde Valencia.

## Concept
Triggers Webhook, parámetros de consulta y respuestas para el navegador

## Glossary
- n8n: n8n es una herramienta para automatizar tareas. Conectas pasos llamados nodos para mover datos y hacer que las aplicaciones trabajen juntas.
- Webhook: Un webhook es una URL especial que puede iniciar un workflow de n8n cuando una persona u otra aplicación la abre o le envía una petición.
- Método GET: GET pide a una URL que devuelva información. Al abrir una página normal en el navegador, normalmente se envía una petición GET.
- Parámetros de GET: Los parámetros son valores extra que se añaden al final de una URL después de ?. Dan más detalles al workflow; por ejemplo, ?name=Ana.
- Otros métodos HTTP: POST envía datos a una URL, normalmente para crear o enviar algo. GET pide datos; POST envía datos. PUT y PATCH actualizan datos, y DELETE los elimina.
- JSON, texto y HTML: El texto son palabras sin estructura especial. HTML añade estructura y formato para que el navegador muestre una página. JSON organiza datos con nombres y valores para que las aplicaciones puedan leerlos.
- Código QR: Un código QR es una imagen cuadrada que guarda información, a menudo una URL. La cámara de un teléfono puede escanearlo y abrir esa URL.

## Scenario
- La página de un evento carga su lista de eventos desde una dirección web, para que los eventos recién publicados aparezcan automáticamente sin editar la página.
- Un workshop usa una dirección web de asistentes como fuente en vivo, para que cada nueva inscripción aparezca automáticamente en cuanto la persona se registre.
- Un código QR del espacio abre una dirección web que muestra la contraseña Wi-Fi actual, para que la organización pueda cambiarla sin volver a imprimir el código QR.
- Una página de estado muestra en directo el aforo del workshop o las plazas disponibles.

## Task
El equipo de eventos de Valencia necesita una dirección web que muestre "Hello world from Valencia!" cada vez que alguien la abra.

## Bonus Task
Haz que esa misma dirección salude a cada visitante por su nombre cuando se añada el nombre; por ejemplo, "Hello Ana from Valencia!"

## Nodes
- Webhook
- Edit Fields (Set)
- Respond to Webhook

## Preparation
- Regístrate en [n8n Cloud](/n8n-sign-up) o abre un espacio de trabajo de n8n existente y crea un workflow nuevo.
- Usa un navegador web moderno en un ordenador o teléfono para construir y probar el resultado.
- No necesitas otro servicio ni ningún código de acceso secreto para este reto.

## Requirements
- La misma dirección web funciona cada vez que se abre en un navegador.
- Sin un nombre, el navegador muestra exactamente "Hello world from Valencia!"
- Cuando la dirección termina en "?name=Ana", el navegador muestra exactamente "Hello Ana from Valencia!"

## Tips
- Empieza con el nodo Webhook, que crea la dirección web que inicia el workflow. Elige GET – la opción que usa el navegador para pedir información a una dirección – y establece Path, la parte final de la dirección, en welcome.
- Añade Edit Fields (Set), que crea el texto del saludo que el workflow pasará al último paso.
- En el nodo Webhook, configura Respond como "Using Respond to Webhook Node" para que el nodo final controle lo que recibe el navegador.
- En Edit Fields (Set), crea un campo llamado greeting. Para la tarea extra, usa una expresión – una pequeña fórmula – para leer name de los parámetros de consulta, los valores adicionales que aparecen después de ? en la dirección, y usa world cuando no se proporcione ningún nombre.
- Termina con Respond to Webhook, que envía el resultado al navegador. Elige Text y devuelve el campo greeting. Test URL funciona mientras n8n está escuchando; después de publicar, usa Production URL.

# Ukrainian

## Title
Webhook-привітання з Валенсії

## Summary
Створіть вебадресу, яка вітає відвідувача з Валенсії.

## Concept
Webhook-тригери, параметри запиту та відповіді браузеру

## Glossary
- n8n: n8n – це інструмент для автоматизації роботи. Ви з’єднуєте кроки, які називаються нодами, щоб передавати дані та забезпечувати спільну роботу застосунків.
- Webhook: Webhook – це спеціальний URL, який може запустити воркфлоу n8n, коли людина чи інший застосунок відкриває його або надсилає на нього запит.
- Метод GET: GET просить URL повернути інформацію. Відкриття звичайної вебсторінки у браузері зазвичай надсилає GET-запит.
- Параметри GET: Параметри – це додаткові значення наприкінці URL після ?. Вони передають воркфлоу більше деталей, наприклад ?name=Ana.
- Інші методи HTTP: POST надсилає дані на URL, зазвичай щоб щось створити або подати. GET переважно запитує дані, а POST – надсилає їх. PUT і PATCH оновлюють дані, а DELETE видаляє їх.
- JSON, текст і HTML: Текст – це звичайні слова. HTML додає структуру сторінки та форматування для браузера. JSON упорядковує дані за назвами й значеннями, щоб застосунки могли їх читати.
- QR-код: QR-код – це квадратне зображення, у якому зберігається інформація, часто URL. Камера телефона може відсканувати його й відкрити цей URL.

## Scenario
- Сторінка події завантажує список подій з вебадреси, тому щойно опубліковані події з’являються автоматично без редагування сторінки.
- Воркшоп використовує вебадресу зі списком учасників як актуальне джерело, тому кожна нова реєстрація з’являється одразу.
- QR-код у приміщенні відкриває вебадресу з актуальним паролем Wi-Fi, тож організатори можуть змінити пароль без повторного друку QR-коду.
- Сторінка стану показує поточну заповненість воркшопу або кількість вільних місць.

## Task
Команді подій у Валенсії потрібна вебадреса, яка показує "Hello world from Valencia!" щоразу, коли хтось її відкриває.

## Bonus Task
Зробіть так, щоб ця сама адреса вітала відвідувача на ім’я, коли до неї додано ім’я, наприклад "Hello Ana from Valencia!"

## Nodes
- Webhook
- Edit Fields (Set)
- Respond to Webhook

## Preparation
- Зареєструйтеся в [n8n Cloud](/n8n-sign-up) або відкрийте наявний воркспейс n8n, а потім створіть новий воркфлоу.
- Використовуйте сучасний веббраузер на комп’ютері чи телефоні, щоб створити й перевірити результат.
- Для цього завдання не потрібні інші сервіси чи секретні коди доступу.

## Requirements
- Та сама вебадреса працює щоразу, коли її відкривають у браузері.
- Без імені браузер показує точно "Hello world from Valencia!"
- Коли адреса закінчується на "?name=Ana", браузер показує точно "Hello Ana from Valencia!"

## Tips
- Почніть із ноди Webhook, яка створює вебадресу для запуску воркфлоу. Виберіть GET – цей варіант браузер використовує, щоб попросити адресу повернути інформацію – і вкажіть welcome у полі Path, тобто в останній частині адреси.
- Додайте Edit Fields (Set), яка створює текст привітання, що воркфлоу передасть до останнього кроку.
- У ноді Webhook встановіть для Respond значення "Using Respond to Webhook Node", щоб остання нода керувала тим, що отримає браузер.
- У Edit Fields (Set) створіть поле greeting. Для додаткового завдання використайте вираз – коротку формулу – щоб прочитати name з параметрів запиту, тобто додаткових значень після ? в адресі, і використовуйте world, якщо ім’я не вказано.
- Завершіть нодою Respond to Webhook, яка надсилає результат назад у браузер. Виберіть Text і поверніть поле greeting. Test URL працює, поки n8n очікує на запит; після публікації використовуйте Production URL.
