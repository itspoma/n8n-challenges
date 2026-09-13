---
number: 3
slug: form-to-follow-up
difficulty: beginner
time: 20–30 min
complexity: 2
color: #8dcef0
ink: #1b2427
---

# English

## Title
Don’t Miss a New Contact

## Summary
Create a public n8n form and save contact submissions in an n8n Data Table.

## Concept
n8n Forms and Data Tables; Tally and validation for the bonus

## Glossary
- n8n form: A web page created by an n8n workflow to collect information from a visitor.
- validation: A check that submitted information follows the rules you expect before the workflow uses it.
- n8n Data Table: A table inside n8n that stores rows for later workflow runs.
- Data Table: The n8n node that reads or changes rows in an n8n Data Table.
- workflow: A connected sequence of nodes that n8n runs to automate a task.
- Form Trigger: The node that displays the first public form and starts the workflow when it is submitted.
- Edit Fields (Set): The node that creates or changes named data fields before later nodes use them.
- IF: The node that checks a condition and routes data down a true or false branch.
- Form Ending: The n8n Form setting that finishes the form journey with a result page.
- Resend: An email delivery service available in n8n through a verified partner node.
- expression: A small formula that calculates a value from workflow data.
- true output: The IF branch used when its condition passes.
- false output: The IF branch used when its condition does not pass.
- credential: A saved n8n connection that keeps an external service secret out of the workflow.

- Tally: An online form builder used for the bonus task.
- Tally Trigger: The n8n node that starts a workflow when a Tally form is submitted.

## Scenario
- An event team needs a simple form to collect contact messages for follow-up.
- A meetup organizer wants to store speaker proposals in one place.
- For the bonus, a volunteer group uses a Tally form to reject incomplete requests and notify an organizer about valid submissions.

## Task
Create a public n8n form with three fields: name, email and message. Save each submission in an n8n Data Table with those fields, status new and the submission time. Show the visitor a confirmation after saving.

## Bonus Task
Replace the n8n form with a form on tally.so using the same three fields. Make them required and validate the email format, showing the visitor what to fix before submission. Connect it to n8n with Tally Trigger, validate the received data before saving it, and notify the organizers through Resend after saving a valid submission. Use your own personal email address as the organizer recipient for testing.

## Nodes
- Form Trigger
- Tally Trigger
- Edit Fields (Set)
- IF
- Data Table
- n8n Form
- Resend

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up), or use an existing n8n workspace, and create a new workflow.
- Create an [n8n Data Table](https://docs.n8n.io/build/work-with-data/data-tables) named event_leads with name, email, message, and status columns. n8n adds createdAt automatically.
- No third-party account is required for the core challenge.
- Bonus: install the [n8n-verified Resend node](https://n8n.io/integrations/resend/) and [sign up for Resend](https://resend.com/signup).
- Bonus: [create a Resend API key](https://resend.com/docs/dashboard/api-keys/introduction). This is the secret code Resend uses to authorize a connection. Save it in an n8n credential, [verify a sending domain](https://resend.com/docs/dashboard/domains/introduction), use your own personal email address as the organizer recipient for testing, and never paste the API key into the workflow.

- Bonus: [create a Tally form](https://tally.so) and connect the official [Tally Trigger](https://tally.so/help/n8n-integration) using a Tally API key saved as an n8n credential. Use labels Name, Email and Message, require all three fields and use Tally’s Email field type. Publish the form and the connected workflow.

## Requirements
- The core uses a public n8n form with name, email and message; no required-field checks or email validation are needed.
- Each core submission is saved with the entered values, status new and the automatic createdAt timestamp, then followed by a confirmation.
- Bonus: the form is hosted on Tally, with required fields and email validation. Tally Trigger sends submissions to n8n; only valid data is saved and followed by a Resend notification to your own email. Test missing fields, an invalid email and a valid submission.

## Tips
- Start with Form Trigger and add name, email and message. Use text fields for name and email and a textarea for message. Leave Required Field off for the core task.
- Use Edit Fields (Set) to copy those three values and set status to new. Map them into a Data Table insert for event_leads; n8n adds createdAt automatically.
- Finish the core with n8n Form set to Form Ending and show a confirmation after the row is saved. Test the public form and check the new row.
- For the bonus, create the form on Tally with labels Name, Email and Message. Require all three and use Tally’s Email field type. Connect the official Tally Trigger, select your form and submit a test. In version 2, each answer is an object with label and value; map the three values in Edit Fields (Set).
- Add IF before Data Table to check for missing values and an invalid email. End the false branch without storing or emailing; connect the true branch to Data Table, then Resend. Tally handles corrections and the received confirmation in its own form; n8n Form endings are only for the core.

# Spanish

## Title
No pierdas un nuevo contacto

## Summary
Crea un formulario público de n8n y guarda los contactos recibidos en una Data Table de n8n.

## Concept
Formularios de n8n y Data Tables; Tally y validación para la tarea extra

## Glossary
- formulario público de n8n: Una página web creada por un workflow de n8n para recoger información de una persona.
- validación: Una comprobación de que los datos enviados cumplen las reglas esperadas antes de usarlos.
- Data Table de n8n: Una tabla dentro de n8n que guarda filas para futuras ejecuciones del workflow.
- Data Table: El nodo de n8n que lee o modifica filas de una Data Table de n8n.
- workflow: Una secuencia conectada de nodos que n8n ejecuta para automatizar una tarea.
- Form Trigger: El nodo que muestra el primer formulario público e inicia el workflow cuando se envía.
- Edit Fields (Set): El nodo que crea o modifica campos de datos antes de que los usen los siguientes nodos.
- IF: El nodo que comprueba una condición y dirige los datos por una rama true o false.
- Form Ending: La opción de n8n Form que termina el recorrido del formulario con una página de resultado.
- Resend: Un servicio de envío de emails disponible en n8n mediante un nodo de partner verificado.
- expresión: Una pequeña fórmula que calcula un valor a partir de los datos del workflow.
- salida true: La rama de IF que se usa cuando su condición se cumple.
- salida false: La rama de IF que se usa cuando su condición no se cumple.
- credencial: Una conexión guardada en n8n que evita poner el secreto de un servicio externo dentro del workflow.

- Tally: Un creador de formularios online usado para la tarea extra.
- Tally Trigger: El nodo de n8n que inicia un workflow cuando se envía un formulario de Tally.

## Scenario
- El equipo de un evento necesita un formulario sencillo para recoger mensajes de contacto.
- La organización de un meetup quiere guardar propuestas de ponentes en un solo lugar.
- Para el bonus, un grupo de voluntariado usa Tally para rechazar solicitudes incompletas y avisar a la organización de los envíos válidos.

## Task
Crea un formulario público de n8n con tres campos: nombre, email y mensaje. Guarda cada envío en una Data Table de n8n con esos campos, el estado new y la fecha y hora del envío. Muestra una confirmación al visitante después de guardar.

## Bonus Task
Sustituye el formulario de n8n por uno en tally.so con los mismos tres campos. Hazlos obligatorios y valida el formato del email, indicando al visitante qué debe corregir antes del envío. Conéctalo a n8n mediante Tally Trigger, valida los datos recibidos antes de guardarlos y avisa al equipo organizador mediante Resend después de guardar un envío válido. Usa tu propia dirección de email personal como destinatario del equipo organizador para las pruebas.

## Nodes
- Form Trigger
- Tally Trigger
- Edit Fields (Set)
- IF
- Data Table
- n8n Form
- Resend

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up), o usa un espacio de n8n existente, y crea un workflow nuevo.
- Crea una [Data Table de n8n](https://docs.n8n.io/build/work-with-data/data-tables) llamada event_leads con las columnas name, email, message y status. n8n añade createdAt automáticamente.
- No necesitas una cuenta de terceros para el reto principal.
- Bonus: instala el [nodo Resend verificado por n8n](https://n8n.io/integrations/resend/) y [regístrate en Resend](https://resend.com/signup).
- Bonus: [crea una API key de Resend](https://resend.com/docs/dashboard/api-keys/introduction). Es el código secreto que Resend usa para autorizar una conexión. Guárdala en una credencial de n8n, [verifica un dominio de envío](https://resend.com/docs/dashboard/domains/introduction), usa tu propia dirección de email personal como destinatario del equipo organizador para las pruebas y no pegues nunca la API key en el workflow.

- Bonus: [crea un formulario de Tally](https://tally.so) y conecta el [Tally Trigger oficial](https://tally.so/help/n8n-integration) mediante una API key de Tally guardada como credencial de n8n. Usa las etiquetas Name, Email y Message, haz los tres campos obligatorios y usa el tipo Email de Tally. Publica el formulario y el workflow conectado.

## Requirements
- El reto principal usa un formulario público de n8n con nombre, email y mensaje; no necesita comprobar campos obligatorios ni validar el email.
- Cada envío principal se guarda con los valores introducidos, el estado new y el timestamp createdAt automático, seguido de una confirmación.
- Bonus: el formulario está en Tally, con campos obligatorios y validación de email. Tally Trigger envía los datos a n8n; solo se guardan los válidos y después se envía una notificación por Resend a tu propio email. Prueba campos vacíos, un email inválido y un envío válido.

## Tips
- Empieza con Form Trigger y añade name, email y message. Usa campos de texto para name y email y un textarea para message. Deja Required Field desactivado para el reto principal.
- Usa Edit Fields (Set) para copiar los tres valores y asignar new a status. Mapéalos a una inserción de Data Table en event_leads; n8n añade createdAt automáticamente.
- Termina el reto principal con n8n Form en Form Ending y muestra una confirmación después de guardar la fila. Prueba el formulario público y comprueba la nueva fila.
- Para el bonus, crea un formulario de Tally con las etiquetas Name, Email y Message. Haz los tres campos obligatorios y usa el tipo Email de Tally. Conecta el Tally Trigger oficial, selecciona el formulario y envía una prueba. En la versión 2, cada respuesta es un objeto con label y value; mapea los tres valores en Edit Fields (Set).
- Añade IF antes de Data Table para comprobar campos vacíos y un email inválido. Termina la rama false sin guardar ni enviar emails; conecta true a Data Table y después a Resend. Tally muestra las correcciones y la confirmación de recepción en su propio formulario; los finales de n8n Form son solo para el reto principal.

# Ukrainian

## Title
Не пропусти новий контакт

## Summary
Створіть публічну форму n8n та зберігайте контактні заявки в n8n Data Table.

## Concept
Форми n8n та Data Tables; Tally й валідація для бонусу

## Glossary
- форма n8n: Вебсторінка, яку створює воркфлоу n8n для збору інформації від відвідувача.
- валідація: Перевірка того, що надіслані дані відповідають очікуваним правилам до їх використання.
- n8n Data Table: Таблиця всередині n8n, яка зберігає рядки для наступних запусків воркфлоу.
- Data Table: Нода n8n, яка читає або змінює рядки в n8n Data Table.
- воркфлоу: З’єднана послідовність нод, яку n8n запускає для автоматизації завдання.
- Form Trigger: Нода, яка показує першу публічну форму та запускає воркфлоу після її надсилання.
- Edit Fields (Set): Нода, яка створює або змінює іменовані поля даних для наступних нод.
- IF: Нода, яка перевіряє умову та спрямовує дані в гілку true або false.
- Form Ending: Налаштування n8n Form, яке завершує роботу форми сторінкою з результатом.
- Resend: Сервіс доставлення електронних листів, доступний у n8n через перевірену партнерську ноду.
- вираз: Невелика формула, яка обчислює значення з даних воркфлоу.
- вихід true: Гілка IF, яка використовується, коли умова виконується.
- вихід false: Гілка IF, яка використовується, коли умова не виконується.
- облікові дані: Збережене в n8n підключення, яке не дає секрету зовнішнього сервісу потрапити у воркфлоу.

- Tally: Онлайн-конструктор форм для бонусного завдання.
- Tally Trigger: Нода n8n, яка запускає воркфлоу після надсилання форми Tally.

## Scenario
- Команді події потрібна проста форма для збору контактних повідомлень.
- Організатор зустрічі хоче зберігати пропозиції доповідачів в одному місці.
- Для бонусу волонтерська група використовує Tally, щоб відхиляти неповні заявки та повідомляти організатора про коректні.

## Task
Створіть публічну форму n8n із трьома полями: ім’я, електронна адреса та повідомлення. Зберігайте кожну заявку в n8n Data Table із цими полями, статусом new та часом надсилання. Після збереження покажіть відвідувачу підтвердження.

## Bonus Task
Замініть форму n8n формою на tally.so з тими самими трьома полями. Зробіть їх обов’язковими та перевіряйте формат електронної адреси, показуючи відвідувачу, що виправити перед надсиланням. Підключіть форму до n8n через Tally Trigger, перевіряйте отримані дані перед збереженням і після збереження коректної заявки повідомляйте організаторів через Resend. Для тестування використайте власну особисту електронну адресу як адресу організаторів.

## Nodes
- Form Trigger
- Tally Trigger
- Edit Fields (Set)
- IF
- Data Table
- n8n Form
- Resend

## Preparation
- [Зареєструйтеся в n8n Cloud](/n8n-sign-up) або використайте наявний простір n8n і створіть новий воркфлоу.
- Створіть [n8n Data Table](https://docs.n8n.io/build/work-with-data/data-tables) з назвою event_leads і стовпцями name, email, message та status. n8n додає createdAt автоматично.
- Для основного завдання сторонній обліковий запис не потрібен.
- Додатково: установіть [перевірену n8n ноду Resend](https://n8n.io/integrations/resend/) і [зареєструйтеся в Resend](https://resend.com/signup).
- Додатково: [створіть API-ключ Resend](https://resend.com/docs/dashboard/api-keys/introduction). Це секретний код, яким Resend авторизує підключення. Збережіть його як облікові дані n8n, [підтвердьте домен відправника](https://resend.com/docs/dashboard/domains/introduction), використайте власну особисту електронну адресу як адресу організаторів для тестування та ніколи не вставляйте API-ключ у воркфлоу.

- Бонус: [створіть форму Tally](https://tally.so) та підключіть офіційний [Tally Trigger](https://tally.so/help/n8n-integration) через API-ключ Tally, збережений як облікові дані n8n. Використайте підписи Name, Email і Message, зробіть усі поля обов’язковими та виберіть тип Email у Tally. Опублікуйте форму й підключений воркфлоу.

## Requirements
- Основне завдання використовує публічну форму n8n з ім’ям, електронною адресою та повідомленням; перевірки обов’язкових полів чи формату email не потрібні.
- Кожна основна заявка зберігається з уведеними значеннями, статусом new та автоматичною часовою міткою createdAt, після чого показується підтвердження.
- Бонус: форму розміщено на Tally, поля обов’язкові, формат email перевіряється. Tally Trigger передає дані в n8n; зберігаються лише коректні заявки, після чого Resend надсилає сповіщення на вашу власну адресу. Перевірте порожні поля, некоректний email та коректну заявку.

## Tips
- Почніть із Form Trigger та додайте name, email і message. Для name та email використайте текстові поля, а для message — textarea. Для основного завдання залиште Required Field вимкненим.
- Через Edit Fields (Set) скопіюйте три значення та задайте для status значення new. Передайте їх у вставлення Data Table до event_leads; n8n автоматично додає createdAt.
- Завершіть основне завдання нодою n8n Form із Form Ending та покажіть підтвердження після збереження рядка. Перевірте публічну форму й новий рядок у таблиці.
- Для бонусу створіть форму Tally з підписами Name, Email і Message. Зробіть усі три поля обов’язковими та використайте тип Email у Tally. Підключіть офіційний Tally Trigger, виберіть форму й надішліть тестову заявку. У версії 2 кожна відповідь — об’єкт із label та value; зіставте три значення в Edit Fields (Set).
- Додайте IF перед Data Table для перевірки порожніх значень і некоректного email. Завершіть гілку false без збереження та листів; з’єднайте true з Data Table, а далі з Resend. Tally показує виправлення та підтвердження отримання у власній формі; завершення n8n Form потрібні лише для основного завдання.

# Solution Data

## Core Workflow JSON (without bonus)

```json
{
  "name": "Challenge 3 – Form to Follow-up",
  "nodes": [
    {
      "parameters": {
        "authentication": "none",
        "formTitle": "Speaker proposal",
        "formDescription": "Tell the event organizers what you would like to share.",
        "formFields": {
          "values": [
            {
              "fieldLabel": "Name",
              "fieldName": "name",
              "fieldType": "text",
              "placeholder": "Ana García",
              "requiredField": false
            },
            {
              "fieldLabel": "Email",
              "fieldName": "email",
              "fieldType": "text",
              "placeholder": "ana@example.com",
              "requiredField": false
            },
            {
              "fieldLabel": "Message",
              "fieldName": "message",
              "fieldType": "textarea",
              "placeholder": "What would you like to speak about?",
              "requiredField": false
            }
          ]
        },
        "responseMode": "lastNode",
        "options": {
          "path": "speaker-proposal",
          "buttonLabel": "Send proposal"
        }
      },
      "id": "7cd53542-7d65-42ba-86c3-3616da9201d0",
      "name": "On form submission",
      "type": "n8n-nodes-base.formTrigger",
      "typeVersion": 2.5,
      "position": [
        0,
        0
      ],
      "webhookId": "ea55b844-237a-48f2-9533-662503438e29",
      "notesInFlow": true,
      "notes": "Creates the public form. Use the test URL while building, then publish the workflow to use its production URL."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "78310ba6-fc3c-4c60-a8ad-990b515b390c",
              "name": "name",
              "value": "={{ $json.name ?? '' }}",
              "type": "string"
            },
            {
              "id": "81646ad0-5a9f-40b1-b2fc-b5a73f1d258a",
              "name": "email",
              "value": "={{ $json.email ?? '' }}",
              "type": "string"
            },
            {
              "id": "6818a09f-7336-4bda-a7ee-c34fa7557cf0",
              "name": "message",
              "value": "={{ $json.message ?? '' }}",
              "type": "string"
            },
            {
              "id": "5b5da8bd-fcfd-4dfb-ab4a-7fb9b7fe7f1c",
              "name": "status",
              "value": "new",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "006a6b1b-83dc-4542-8162-16578ee56355",
      "name": "Prepare contact data",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        280,
        0
      ],
      "notesInFlow": true,
      "notes": "Copies name, email, and message as submitted and sets status to new. No validation or text changes are required for the core task."
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "insert",
        "dataTableId": {
          "__rl": true,
          "value": "event_leads",
          "mode": "name"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "name": "={{ $json.name }}",
            "email": "={{ $json.email }}",
            "message": "={{ $json.message }}",
            "status": "={{ $json.status }}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "name",
              "displayName": "name",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
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
              "id": "message",
              "displayName": "message",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "status",
              "displayName": "status",
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
      "id": "c0ead4ca-df05-4ed0-89a3-61060798169f",
      "name": "Save to event_leads",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        560,
        0
      ],
      "notesInFlow": true,
      "notes": "Requires an event_leads Data Table with name, email, message, and status columns. n8n adds createdAt automatically."
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "text",
        "completionTitle": "Thanks!",
        "completionMessage": "Your submission was saved.",
        "options": {}
      },
      "id": "9d55033a-a96f-4452-ae5a-03e4b08a31fb",
      "name": "Show success",
      "type": "n8n-nodes-base.form",
      "typeVersion": 2.5,
      "position": [
        840,
        0
      ],
      "notesInFlow": true,
      "notes": "Shows the confirmation page after the Data Table insert succeeds."
    }
  ],
  "pinData": {},
  "connections": {
    "On form submission": {
      "main": [
        [
          {
            "node": "Prepare contact data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prepare contact data": {
      "main": [
        [
          {
            "node": "Save to event_leads",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Save to event_leads": {
      "main": [
        [
          {
            "node": "Show success",
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
  "versionId": "83dd0646-91bf-4ca8-9aec-645923f1b14a",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "tags": []
}
```

## Bonus Workflow JSON

```json
{
  "name": "Challenge 3 – Tally Validation + Resend",
  "nodes": [
    {
      "parameters": {
        "formId": "REPLACE_WITH_YOUR_TALLY_FORM_ID"
      },
      "id": "7cd53542-7d65-42ba-86c3-3616da9201d0",
      "name": "On Tally submission",
      "type": "n8n-nodes-tallyforms.tallyTrigger",
      "typeVersion": 2,
      "position": [
        0,
        0
      ],
      "webhookId": "829f06c4-7174-48cc-a43b-6508047f452f",
      "notesInFlow": true,
      "notes": "Install the official Tally Trigger node, select your Tally API credential and form. Create fields labelled Name, Email, Message, require all three, and use the Email field type for inline validation. Tally displays its own received confirmation; it does not wait for downstream n8n processing."
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "78310ba6-fc3c-4c60-a8ad-990b515b390c",
              "name": "name",
              "value": "={{ Object.values($json).find(field => field && typeof field === 'object' && field.label === 'Name')?.value ?? '' }}",
              "type": "string"
            },
            {
              "id": "81646ad0-5a9f-40b1-b2fc-b5a73f1d258a",
              "name": "email",
              "value": "={{ Object.values($json).find(field => field && typeof field === 'object' && field.label === 'Email')?.value ?? '' }}",
              "type": "string"
            },
            {
              "id": "6818a09f-7336-4bda-a7ee-c34fa7557cf0",
              "name": "message",
              "value": "={{ Object.values($json).find(field => field && typeof field === 'object' && field.label === 'Message')?.value ?? '' }}",
              "type": "string"
            },
            {
              "id": "5b5da8bd-fcfd-4dfb-ab4a-7fb9b7fe7f1c",
              "name": "status",
              "value": "new",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "006a6b1b-83dc-4542-8162-16578ee56355",
      "name": "Prepare contact data",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        280,
        0
      ],
      "notesInFlow": true,
      "notes": "Maps the official Tally Trigger v2 structured fields labelled Name, Email, and Message without changing their values, then sets status to new."
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
              "id": "01583c14-0acf-45fe-857d-8a697c347aa3",
              "leftValue": "={{ typeof $json.name === 'string' && /\\S/.test($json.name) && typeof $json.message === 'string' && /\\S/.test($json.message) && typeof $json.email === 'string' && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test($json.email) }}",
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
      "id": "3489c783-53a7-409b-97bc-e915b9272436",
      "name": "Valid submission?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        560,
        0
      ],
      "notesInFlow": true,
      "notes": "Checks all three fields and email format before saving. The false branch ends without a Data Table write or email. Tally handles visitor-facing corrections before submission."
    },
    {
      "parameters": {
        "resource": "row",
        "operation": "insert",
        "dataTableId": {
          "__rl": true,
          "value": "event_leads",
          "mode": "name"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "name": "={{ $json.name }}",
            "email": "={{ $json.email }}",
            "message": "={{ $json.message }}",
            "status": "={{ $json.status }}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "name",
              "displayName": "name",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
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
              "id": "message",
              "displayName": "message",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "status",
              "displayName": "status",
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
      "id": "c0ead4ca-df05-4ed0-89a3-61060798169f",
      "name": "Save to event_leads",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1.1,
      "position": [
        840,
        0
      ],
      "notesInFlow": true,
      "notes": "Requires an event_leads Data Table with name, email, message, and status columns. n8n adds createdAt automatically."
    },
    {
      "parameters": {
        "authentication": "apiKey",
        "resource": "email",
        "operation": "send",
        "from": "Challenge 3 <replace-with-verified-sender@example.com>",
        "to": "replace-with-your-own-email@example.com",
        "subject": "New speaker proposal received",
        "useTemplate": false,
        "emailFormat": "text",
        "text": "={{ 'A new speaker proposal was saved.\\n\\nName: ' + $('Prepare contact data').item.json.name + '\\nEmail: ' + $('Prepare contact data').item.json.email + '\\nMessage: ' + $('Prepare contact data').item.json.message }}",
        "additionalOptions": {}
      },
      "id": "8bb19e37-2661-4c89-b447-54b914e26e84",
      "name": "Notify organizers",
      "type": "n8n-nodes-resend.resend",
      "typeVersion": 1,
      "position": [
        1120,
        0
      ],
      "notesInFlow": true,
      "notes": "Select your Resend credential and a verified sender. Replace the recipient with your own personal email address for the workshop."
    }
  ],
  "pinData": {},
  "connections": {
    "On Tally submission": {
      "main": [
        [
          {
            "node": "Prepare contact data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prepare contact data": {
      "main": [
        [
          {
            "node": "Valid submission?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Valid submission?": {
      "main": [
        [
          {
            "node": "Save to event_leads",
            "type": "main",
            "index": 0
          }
        ],
        []
      ]
    },
    "Save to event_leads": {
      "main": [
        [
          {
            "node": "Notify organizers",
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
  "versionId": "6833d83f-27a2-4ded-8938-00efb0ef2613",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "tags": []
}
```
