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
Form to Follow-up

## Summary
Validate a public n8n form and save clean contact data in an n8n Data Table.

## Concept
n8n Forms, validation, and Data Tables

## Glossary
- n8n form: A web page created by an n8n workflow to collect information from a visitor.
- validation: A check that submitted information follows the rules you expect before the workflow uses it.
- n8n Data Table: A table inside n8n that stores rows for later workflow runs.
- Data Table: The n8n node that reads or changes rows in an n8n Data Table.
- normalized: Made consistent, such as by removing extra spaces or lowercasing an email address.
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

## Scenario
- An event team needs a reliable contact form that keeps invalid submissions out of its follow-up list.
- A meetup organizer wants to collect speaker proposals with consistent contact details.
- A volunteer group needs to save valid help requests while giving invalid submissions clear feedback.

## Task
The event team needs a public contact form that saves only usable submissions and clearly tells each visitor whether their message was accepted.

## Bonus Task
After accepting a valid submission, notify the organizers by email through Resend.

## Nodes
- Form Trigger
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
- Bonus: [create a Resend API key](https://resend.com/docs/dashboard/api-keys/introduction). This is the secret code Resend uses to authorize a connection. Save it in an n8n credential, [verify a sending domain](https://resend.com/docs/dashboard/domains/introduction), choose an organizer-approved recipient for testing, and never paste the API key into the workflow.

## Requirements
- A visitor cannot submit missing fields, and an invalid email address produces a clear correction message.
- A valid submission is normalized, saved with name, email, message, status set to new, and the automatic createdAt timestamp, then followed by a clear success message.
- Bonus: a valid saved submission sends a text-only notification from a verified sender to an organizer-approved address; invalid submissions are neither stored nor emailed.

## Tips
- Start with Form Trigger: create the public form and make name, email, and message required. Keep email as a text field so the workflow can demonstrate its own validation message.
- Add Edit Fields (Set) next: trim name and message, lowercase email, set status to new, and calculate isValidEmail with an expression.
- Add IF third: check isValidEmail and send valid submissions to the true output and invalid submissions to the false output.
- Connect Data Table to IF's true output, insert the clean fields into event_leads, and finish each IF branch with its own n8n Form set to Form Ending.
- For the bonus, connect Resend after Data Table, select the saved credential, use a verified sender and organizer-approved recipient, send text only, then connect it to the success n8n Form.

# Spanish

## Title
Del formulario al seguimiento

## Summary
Valida un formulario público de n8n y guarda datos de contacto limpios en una Data Table de n8n.

## Concept
Formularios de n8n, validación y Data Tables

## Glossary
- formulario público de n8n: Una página web creada por un workflow de n8n para recoger información de una persona.
- validación: Una comprobación de que los datos enviados cumplen las reglas esperadas antes de usarlos.
- Data Table de n8n: Una tabla dentro de n8n que guarda filas para futuras ejecuciones del workflow.
- Data Table: El nodo de n8n que lee o modifica filas de una Data Table de n8n.
- normaliza: Da a los datos un formato consistente, por ejemplo quitando espacios o convirtiendo un email a minúsculas.
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

## Scenario
- El equipo de un evento necesita un formulario fiable que mantenga los envíos inválidos fuera de su lista de seguimiento.
- La organización de un meetup quiere recopilar propuestas de ponentes con datos de contacto consistentes.
- Un grupo de voluntariado necesita guardar solicitudes válidas y dar una respuesta clara a los envíos inválidos.

## Task
El equipo del evento necesita un formulario público que guarde solo los envíos útiles y explique claramente a cada persona si su mensaje ha sido aceptado.

## Bonus Task
Después de aceptar un envío válido, avisa por email al equipo organizador mediante Resend.

## Nodes
- Form Trigger
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
- Bonus: [crea una API key de Resend](https://resend.com/docs/dashboard/api-keys/introduction). Es el código secreto que Resend usa para autorizar una conexión. Guárdala en una credencial de n8n, [verifica un dominio de envío](https://resend.com/docs/dashboard/domains/introduction), elige una dirección aprobada por el equipo organizador para las pruebas y no pegues nunca la API key en el workflow.

## Requirements
- No se puede enviar el formulario con campos vacíos y un email inválido muestra un mensaje claro para corregirlo.
- Un envío válido se normaliza, se guarda con name, email, message, status con el valor new y el timestamp createdAt automático, y después muestra un mensaje claro de éxito.
- Bonus: un envío válido ya guardado manda una notificación de texto desde un remitente verificado a una dirección aprobada por el equipo; los envíos inválidos no se guardan ni envían emails.

## Tips
- Empieza con Form Trigger: crea el formulario público y haz obligatorios name, email y message. Mantén email como campo de texto para que el workflow pueda mostrar su propio mensaje de validación.
- Añade después Edit Fields (Set): elimina espacios de name y message, convierte email a minúsculas, asigna new a status y calcula isValidEmail con una expresión.
- Añade IF en tercer lugar: comprueba isValidEmail y envía los datos válidos por la salida true y los inválidos por la salida false.
- Conecta Data Table a la salida true de IF, inserta los campos limpios en event_leads y termina cada rama de IF con su propio n8n Form configurado como Form Ending.
- Para el bonus, conecta Resend después de Data Table, selecciona la credencial guardada, usa un remitente verificado y una dirección aprobada, envía solo texto y conéctalo después al n8n Form de éxito.

# Ukrainian

## Title
Від форми до подальшої комунікації

## Summary
Перевірте публічну форму n8n та збережіть чисті контактні дані в n8n Data Table.

## Concept
Форми n8n, валідація та Data Tables

## Glossary
- форма n8n: Вебсторінка, яку створює воркфлоу n8n для збору інформації від відвідувача.
- валідація: Перевірка того, що надіслані дані відповідають очікуваним правилам до їх використання.
- n8n Data Table: Таблиця всередині n8n, яка зберігає рядки для наступних запусків воркфлоу.
- Data Table: Нода n8n, яка читає або змінює рядки в n8n Data Table.
- нормалізується: Приводиться до узгодженого формату, наприклад без зайвих пробілів і з email у нижньому регістрі.
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

## Scenario
- Команді події потрібна надійна контактна форма, яка не додає некоректні заявки до списку для подальшої комунікації.
- Організатор зустрічі хоче збирати пропозиції доповідачів з узгодженими контактними даними.
- Волонтерській групі потрібно зберігати коректні запити та давати зрозумілу відповідь на некоректні заявки.

## Task
Команді події потрібна публічна контактна форма, яка зберігає лише придатні заявки та чітко повідомляє кожному відвідувачу, чи прийнято його повідомлення.

## Bonus Task
Після прийняття коректної заявки повідомте організаторів електронною поштою через Resend.

## Nodes
- Form Trigger
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
- Додатково: [створіть API-ключ Resend](https://resend.com/docs/dashboard/api-keys/introduction). Це секретний код, яким Resend авторизує підключення. Збережіть його як облікові дані n8n, [підтвердьте домен відправника](https://resend.com/docs/dashboard/domains/introduction), виберіть схвалену організаторами адресу для тестування та ніколи не вставляйте API-ключ у воркфлоу.

## Requirements
- Форму не можна надіслати з порожніми полями, а некоректна електронна адреса показує зрозуміле повідомлення для виправлення.
- Коректна заявка нормалізується, зберігається з полями name, email, message, status зі значенням new та автоматичною часовою міткою createdAt, після чого показується зрозуміле повідомлення про успіх.
- Додатково: збережена коректна заявка надсилає текстове сповіщення від підтвердженого відправника на схвалену організаторами адресу; некоректні заявки не зберігаються й не надсилаються електронною поштою.

## Tips
- Почніть із Form Trigger: створіть публічну форму та зробіть поля name, email і message обов’язковими. Залиште email текстовим полем, щоб воркфлоу міг показати власне повідомлення валідації.
- Далі додайте Edit Fields (Set): приберіть зайві пробіли з name і message, переведіть email у нижній регістр, задайте status значення new та обчисліть isValidEmail за допомогою виразу.
- Третім додайте IF: перевірте isValidEmail і спрямуйте коректні дані на вихід true, а некоректні на вихід false.
- Під’єднайте Data Table до виходу true ноди IF, додайте чисті поля до event_leads і завершіть кожну гілку IF окремою нодою n8n Form з налаштуванням Form Ending.
- Для додаткового завдання під’єднайте Resend після Data Table, виберіть збережені облікові дані, використайте підтвердженого відправника та схвалену адресу, надішліть лише текст і потім під’єднайте успішну n8n Form.

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
              "requiredField": true
            },
            {
              "fieldLabel": "Email",
              "fieldName": "email",
              "fieldType": "text",
              "placeholder": "ana@example.com",
              "requiredField": true
            },
            {
              "fieldLabel": "Message",
              "fieldName": "message",
              "fieldType": "textarea",
              "placeholder": "What would you like to speak about?",
              "requiredField": true
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
      "position": [-640, 0],
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
              "value": "={{ $json.name.trim() }}",
              "type": "string"
            },
            {
              "id": "81646ad0-5a9f-40b1-b2fc-b5a73f1d258a",
              "name": "email",
              "value": "={{ $json.email.trim().toLowerCase() }}",
              "type": "string"
            },
            {
              "id": "6818a09f-7336-4bda-a7ee-c34fa7557cf0",
              "name": "message",
              "value": "={{ $json.message.trim() }}",
              "type": "string"
            },
            {
              "id": "5b5da8bd-fcfd-4dfb-ab4a-7fb9b7fe7f1c",
              "name": "status",
              "value": "new",
              "type": "string"
            },
            {
              "id": "f185e736-1e4c-490f-a723-978aa9535227",
              "name": "isValidEmail",
              "value": "={{ /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test($json.email.trim().toLowerCase()) }}",
              "type": "boolean"
            }
          ]
        },
        "options": {}
      },
      "id": "006a6b1b-83dc-4542-8162-16578ee56355",
      "name": "Prepare contact data",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [-360, 0],
      "notesInFlow": true,
      "notes": "Trims text, lowercases the email, sets the status, and calculates the email check once."
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
              "leftValue": "={{ $json.isValidEmail }}",
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
      "name": "Valid email?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [-80, 0],
      "notesInFlow": true,
      "notes": "Routes valid submissions through true and invalid email addresses through false."
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
            { "id": "name", "displayName": "name", "required": false, "defaultMatch": false, "display": true, "type": "string", "canBeUsedToMatch": true },
            { "id": "email", "displayName": "email", "required": false, "defaultMatch": false, "display": true, "type": "string", "canBeUsedToMatch": true },
            { "id": "message", "displayName": "message", "required": false, "defaultMatch": false, "display": true, "type": "string", "canBeUsedToMatch": true },
            { "id": "status", "displayName": "status", "required": false, "defaultMatch": false, "display": true, "type": "string", "canBeUsedToMatch": true }
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
      "position": [220, -120],
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
      "position": [520, -120],
      "notesInFlow": true,
      "notes": "Ends the valid branch with a clear success page."
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "text",
        "completionTitle": "Check your email address",
        "completionMessage": "Enter a valid email address and submit the form again.",
        "options": {}
      },
      "id": "38cb95cd-5425-4e2b-9e6a-6b61212b0ca6",
      "name": "Show validation error",
      "type": "n8n-nodes-base.form",
      "typeVersion": 2.5,
      "position": [220, 140],
      "notesInFlow": true,
      "notes": "Ends the invalid branch without writing to the Data Table."
    }
  ],
  "pinData": {},
  "connections": {
    "On form submission": {
      "main": [[{ "node": "Prepare contact data", "type": "main", "index": 0 }]]
    },
    "Prepare contact data": {
      "main": [[{ "node": "Valid email?", "type": "main", "index": 0 }]]
    },
    "Valid email?": {
      "main": [
        [{ "node": "Save to event_leads", "type": "main", "index": 0 }],
        [{ "node": "Show validation error", "type": "main", "index": 0 }]
      ]
    },
    "Save to event_leads": {
      "main": [[{ "node": "Show success", "type": "main", "index": 0 }]]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "f7c23fd4-af55-44b4-acb0-5038db9d40c2",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "tags": []
}
```

## Bonus Workflow JSON

```json
{
  "name": "Challenge 3 – Form + Resend",
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
              "requiredField": true
            },
            {
              "fieldLabel": "Email",
              "fieldName": "email",
              "fieldType": "text",
              "placeholder": "ana@example.com",
              "requiredField": true
            },
            {
              "fieldLabel": "Message",
              "fieldName": "message",
              "fieldType": "textarea",
              "placeholder": "What would you like to speak about?",
              "requiredField": true
            }
          ]
        },
        "responseMode": "lastNode",
        "options": {
          "path": "speaker-proposal-with-notification",
          "buttonLabel": "Send proposal"
        }
      },
      "id": "7cd53542-7d65-42ba-86c3-3616da9201d0",
      "name": "On form submission",
      "type": "n8n-nodes-base.formTrigger",
      "typeVersion": 2.5,
      "position": [-640, 0],
      "webhookId": "5a58b7cb-1227-4cda-b5d7-6e074cde33f9",
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
              "value": "={{ $json.name.trim() }}",
              "type": "string"
            },
            {
              "id": "81646ad0-5a9f-40b1-b2fc-b5a73f1d258a",
              "name": "email",
              "value": "={{ $json.email.trim().toLowerCase() }}",
              "type": "string"
            },
            {
              "id": "6818a09f-7336-4bda-a7ee-c34fa7557cf0",
              "name": "message",
              "value": "={{ $json.message.trim() }}",
              "type": "string"
            },
            {
              "id": "5b5da8bd-fcfd-4dfb-ab4a-7fb9b7fe7f1c",
              "name": "status",
              "value": "new",
              "type": "string"
            },
            {
              "id": "f185e736-1e4c-490f-a723-978aa9535227",
              "name": "isValidEmail",
              "value": "={{ /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test($json.email.trim().toLowerCase()) }}",
              "type": "boolean"
            }
          ]
        },
        "options": {}
      },
      "id": "006a6b1b-83dc-4542-8162-16578ee56355",
      "name": "Prepare contact data",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [-360, 0],
      "notesInFlow": true,
      "notes": "Trims text, lowercases the email, sets the status, and calculates the email check once."
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
              "leftValue": "={{ $json.isValidEmail }}",
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
      "name": "Valid email?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [-80, 0],
      "notesInFlow": true,
      "notes": "Routes valid submissions through true and invalid email addresses through false."
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
            { "id": "name", "displayName": "name", "required": false, "defaultMatch": false, "display": true, "type": "string", "canBeUsedToMatch": true },
            { "id": "email", "displayName": "email", "required": false, "defaultMatch": false, "display": true, "type": "string", "canBeUsedToMatch": true },
            { "id": "message", "displayName": "message", "required": false, "defaultMatch": false, "display": true, "type": "string", "canBeUsedToMatch": true },
            { "id": "status", "displayName": "status", "required": false, "defaultMatch": false, "display": true, "type": "string", "canBeUsedToMatch": true }
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
      "position": [220, -120],
      "notesInFlow": true,
      "notes": "Requires an event_leads Data Table with name, email, message, and status columns. n8n adds createdAt automatically."
    },
    {
      "parameters": {
        "authentication": "apiKey",
        "resource": "email",
        "operation": "send",
        "from": "Challenge 3 <replace-with-verified-sender@example.com>",
        "to": "replace-with-organizer@example.com",
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
      "position": [520, -120],
      "notesInFlow": true,
      "notes": "Select your Resend credential, replace the sender with an address on your verified domain, and replace the recipient with an organizer-approved address."
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "text",
        "completionTitle": "Thanks!",
        "completionMessage": "Your submission was saved and the organizers were notified.",
        "options": {}
      },
      "id": "9d55033a-a96f-4452-ae5a-03e4b08a31fb",
      "name": "Show success",
      "type": "n8n-nodes-base.form",
      "typeVersion": 2.5,
      "position": [820, -120],
      "notesInFlow": true,
      "notes": "Ends the valid branch after the Data Table write and email both succeed."
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "text",
        "completionTitle": "Check your email address",
        "completionMessage": "Enter a valid email address and submit the form again.",
        "options": {}
      },
      "id": "38cb95cd-5425-4e2b-9e6a-6b61212b0ca6",
      "name": "Show validation error",
      "type": "n8n-nodes-base.form",
      "typeVersion": 2.5,
      "position": [220, 140],
      "notesInFlow": true,
      "notes": "Ends the invalid branch without writing to the Data Table or sending an email."
    }
  ],
  "pinData": {},
  "connections": {
    "On form submission": {
      "main": [[{ "node": "Prepare contact data", "type": "main", "index": 0 }]]
    },
    "Prepare contact data": {
      "main": [[{ "node": "Valid email?", "type": "main", "index": 0 }]]
    },
    "Valid email?": {
      "main": [
        [{ "node": "Save to event_leads", "type": "main", "index": 0 }],
        [{ "node": "Show validation error", "type": "main", "index": 0 }]
      ]
    },
    "Save to event_leads": {
      "main": [[{ "node": "Notify organizers", "type": "main", "index": 0 }]]
    },
    "Notify organizers": {
      "main": [[{ "node": "Show success", "type": "main", "index": 0 }]]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "9cabdc2a-594d-49e2-8ef1-466f5b2fd70b",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "tags": []
}
```
