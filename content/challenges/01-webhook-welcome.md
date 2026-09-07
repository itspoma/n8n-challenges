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
  "name": "Challenge 1 — Valencia Greeting Webhook (Core)",
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
  "name": "Challenge 1 — Valencia Greeting Webhook (Bonus)",
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
Create a URL that greets its visitor from Valencia.

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
- An event landing page loads its event list from a URL, so newly published events appear automatically without editing the page.
- A workshop uses an attendee URL as its live source, so every new signup appears automatically as soon as the person registers.
- A venue QR code opens a URL that shows the current Wi-Fi password, so organizers can change the password without reprinting the QR code.
- A status page displays live workshop capacity or available seats.

## Task
Create a GET webhook at a path such as welcome. Opening it in your browser (e.g. Chrome) without parameters must show "Hello world from Valencia!"

## Bonus Task
Opening it with "?name=Ana" must show "Hello Ana from Valencia!"

## Nodes
- Webhook
- Edit Fields (Set)
- Respond to Webhook

## Preparation
- Open your [n8n workspace](https://app.n8n.cloud/) and create a new workflow.
- Have access to any modern web browser (e.g. [Google Chrome](https://www.google.com/chrome/) or [Edge](https://explore.microsoft.com/)) on a computer or mobile phone (e.g. [Safari](https://www.apple.com/safari/)).
- No third-party account or API key is required.

## Requirements
- Configure the Webhook node to accept GET requests.
- Return the exact default greeting "Hello world from Valencia!"
- For the bonus task, read the optional name query parameter and return the exact greeting "Hello Ana from Valencia!" when the URL contains "?name=Ana".
- Return readable text or HTML that opens correctly in a browser.

## Tips
- Begin with a Webhook node, choose the GET method, and select any option in "Response Data".
- Use the test URL while listening for a test event; use the production URL after publishing the workflow. Do not forget to publish the workflow—the production URL will not work until you do.
- Look for the name value in the webhook query parameters.
- Use "Edit Fields (Set)" to build the greeting with an expression and a fallback value of world.
- Use "Respond to Webhook" to return text or HTML instead of JSON.

# Spanish

## Title
Webhook de saludo desde Valencia

## Summary
Crea una URL que salude a quien la visite desde Valencia.

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
- La página de un evento carga su lista de eventos desde una URL, para que los eventos recién publicados aparezcan automáticamente sin editar la página.
- Un workshop usa una URL de asistentes como fuente en vivo, para que cada nueva inscripción aparezca automáticamente en cuanto la persona se registre.
- Un código QR del espacio abre una URL que muestra la contraseña Wi-Fi actual, para que la organización pueda cambiarla sin volver a imprimir el código QR.
- Una página de estado muestra en directo el aforo del workshop o las plazas disponibles.

## Task
Crea un webhook GET en una ruta como welcome. Al abrirlo en tu navegador (por ejemplo, Chrome) sin parámetros, debe mostrar "Hello world from Valencia!"

## Bonus Task
Al abrirlo con "?name=Ana", debe mostrar "Hello Ana from Valencia!"

## Nodes
- Webhook
- Edit Fields (Set)
- Respond to Webhook

## Preparation
- Abre tu [espacio de trabajo de n8n](https://app.n8n.cloud/) y crea un workflow nuevo.
- Ten acceso a cualquier navegador web moderno (por ejemplo, [Google Chrome](https://www.google.com/chrome/) o [Edge](https://explore.microsoft.com/)) desde un ordenador o teléfono móvil (por ejemplo, [Safari](https://www.apple.com/safari/)).
- No necesitas una cuenta de terceros ni una clave de API.

## Requirements
- Configura el nodo Webhook para aceptar peticiones GET.
- Devuelve exactamente el saludo por defecto "Hello world from Valencia!"
- Para la tarea extra, lee el parámetro de consulta opcional name y devuelve exactamente "Hello Ana from Valencia!" cuando la URL contenga "?name=Ana".
- Devuelve texto o HTML legible que se abra correctamente en un navegador.

## Tips
- Empieza con un nodo Webhook, elige el método GET y selecciona cualquier opción en "Response Data".
- Usa la URL de prueba mientras esperas un evento de prueba y la URL de producción después de publicar el workflow. No olvides publicar el workflow: la URL de producción no funcionará hasta que lo hagas.
- Busca el valor name en los parámetros de consulta del webhook.
- Usa "Edit Fields (Set)" para construir el saludo con una expresión y usa world como valor alternativo.
- Usa "Respond to Webhook" para devolver texto o HTML en lugar de JSON.

# Ukrainian

## Title
Webhook-привітання з Валенсії

## Summary
Створіть URL, який вітає відвідувача з Валенсії.

## Concept
Webhook-тригери, параметри запиту та відповіді браузеру

## Glossary
- n8n: n8n — це інструмент для автоматизації роботи. Ви з’єднуєте кроки, які називаються нодами, щоб передавати дані та забезпечувати спільну роботу застосунків.
- Webhook: Webhook — це спеціальний URL, який може запустити воркфлоу n8n, коли людина чи інший застосунок відкриває його або надсилає на нього запит.
- Метод GET: GET просить URL повернути інформацію. Відкриття звичайної вебсторінки у браузері зазвичай надсилає GET-запит.
- Параметри GET: Параметри — це додаткові значення наприкінці URL після ?. Вони передають воркфлоу більше деталей, наприклад ?name=Ana.
- Інші методи HTTP: POST надсилає дані на URL, зазвичай щоб щось створити або подати. GET переважно запитує дані, а POST — надсилає їх. PUT і PATCH оновлюють дані, а DELETE видаляє їх.
- JSON, текст і HTML: Текст — це звичайні слова. HTML додає структуру сторінки та форматування для браузера. JSON упорядковує дані за назвами й значеннями, щоб застосунки могли їх читати.
- QR-код: QR-код — це квадратне зображення, у якому зберігається інформація, часто URL. Камера телефона може відсканувати його й відкрити цей URL.

## Scenario
- Сторінка події завантажує список подій з URL, тому щойно опубліковані події з’являються автоматично без редагування сторінки.
- Воркшоп використовує URL зі списком учасників як актуальне джерело, тому кожна нова реєстрація з’являється одразу.
- QR-код у приміщенні відкриває URL з актуальним паролем Wi-Fi, тож організатори можуть змінити пароль без повторного друку QR-коду.
- Сторінка стану показує поточну заповненість воркшопу або кількість вільних місць.

## Task
Створіть GET webhook за шляхом на кшталт welcome. Якщо відкрити його у браузері (наприклад, Chrome) без параметрів, він має показати "Hello world from Valencia!"

## Bonus Task
Якщо відкрити його з "?name=Ana", він має показати "Hello Ana from Valencia!"

## Nodes
- Webhook
- Edit Fields (Set)
- Respond to Webhook

## Preparation
- Відкрийте свій [воркспейс n8n](https://app.n8n.cloud/) і створіть новий воркфлоу.
- Підготуйте будь-який сучасний браузер (наприклад, [Google Chrome](https://www.google.com/chrome/) або [Edge](https://explore.microsoft.com/)) на комп’ютері чи телефоні (наприклад, [Safari](https://www.apple.com/safari/)).
- Сторонній обліковий запис або API-ключ не потрібні.

## Requirements
- Налаштуйте ноду Webhook для приймання GET-запитів.
- Повертайте точне стандартне привітання "Hello world from Valencia!"
- Для додаткового завдання прочитайте необов’язковий параметр запиту name і повертайте точне привітання "Hello Ana from Valencia!", коли URL містить "?name=Ana".
- Повертайте зрозумілий текст або HTML, який коректно відкривається у браузері.

## Tips
- Почніть з ноди Webhook, оберіть метод GET і будь-який варіант у полі "Response Data".
- Використовуйте тестовий URL, поки очікуєте на тестову подію, а після публікації воркфлоу — робочий URL. Не забудьте опублікувати воркфлоу: до цього робочий URL не запрацює.
- Знайдіть значення name у параметрах запиту webhook.
- Використайте "Edit Fields (Set)", щоб зібрати привітання за допомогою виразу та значення world за замовчуванням.
- Використайте "Respond to Webhook", щоб повернути текст або HTML замість JSON.
