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
Validate a form submission and save clean contact data in an n8n Data Table.

## Concept
n8n Forms, validation, and Data Tables

## Scenario
- An event team needs a reliable contact form that keeps invalid submissions out of its follow-up list.
- A meetup organizer wants to collect speaker proposals with normalized contact details.
- A volunteer group needs to save valid help requests while giving incomplete submissions clear feedback.

## Task
Create a public n8n form with name, email, and message fields. Validate and normalize the submission, save valid entries in an event_leads Data Table, and show a clear result for both valid and invalid input.

## Bonus Task
Detect an existing event_leads row with the same normalized email and update it instead of creating a duplicate.

## Nodes
- Form Trigger
- Edit Fields
- IF
- Data Table

## Preparation
- Create an n8n Data Table named event_leads.
- No third-party account is required for the core challenge; Resend is only used for the optional bonus.

## Requirements
- Make name, email, and message required form fields.
- Trim the text fields, lowercase the email address, and validate its format in the workflow.
- Store only valid submissions with name, email, message, createdAt, and status set to new.
- Show a meaningful success result and a clear invalid-email result.
- Bonus: send a confirmation with Resend to an event-approved test recipient.

## Tips
- Use Form Trigger to create the public form and select the email field type for email.
- Normalize the submitted values in Edit Fields before validating or storing them.
- Use an IF condition with an email-format expression to split valid and invalid submissions.
- Insert a new row into event_leads only from the valid branch.
- Configure the form completion response last, then add Resend only if the core flow is working.

# Spanish

## Title
Del formulario al seguimiento

## Summary
Valida el envío de un formulario y guarda datos de contacto limpios en una Data Table de n8n.

## Concept
Formularios de n8n, validación y Data Tables

## Scenario
- El equipo de un evento necesita un formulario fiable que mantenga los envíos inválidos fuera de su lista de seguimiento.
- La organización de un meetup quiere recopilar propuestas de ponentes con datos de contacto normalizados.
- Un grupo de voluntariado necesita guardar solicitudes válidas y explicar claramente qué falta en las incompletas.

## Task
Crea un formulario público de n8n con los campos nombre, email y mensaje. Valida y normaliza el envío, guarda las entradas válidas en una Data Table llamada event_leads y muestra un resultado claro tanto para datos válidos como inválidos.

## Bonus Task
Detecta una fila existente en event_leads con el mismo email normalizado y actualízala en lugar de crear un duplicado.

## Nodes
- Form Trigger
- Edit Fields
- IF
- Data Table

## Preparation
- Crea una Data Table de n8n llamada event_leads.
- No necesitas una cuenta de terceros para el reto principal; Resend se usa solo para el bonus opcional.

## Requirements
- Haz obligatorios los campos nombre, email y mensaje.
- Elimina espacios sobrantes de los textos, convierte el email a minúsculas y valida su formato en el workflow.
- Guarda solo los envíos válidos con name, email, message, createdAt y status con el valor new.
- Muestra un resultado de éxito útil y un resultado claro para un email inválido.
- Bonus: envía una confirmación con Resend a un destinatario de prueba aprobado por el evento.

## Tips
- Usa Form Trigger para crear el formulario público y selecciona el tipo email para ese campo.
- Normaliza los valores enviados en Edit Fields antes de validarlos o guardarlos.
- Usa una condición IF con una expresión de formato de email para separar los envíos válidos de los inválidos.
- Inserta una fila nueva en event_leads solo desde la rama válida.
- Configura al final la respuesta de finalización del formulario y añade Resend solo cuando funcione el flujo principal.

# Ukrainian

## Title
Від форми до подальшої комунікації

## Summary
Перевірте дані з форми та збережіть чисті контактні дані в n8n Data Table.

## Concept
Форми n8n, валідація та Data Tables

## Scenario
- Команді події потрібна надійна контактна форма, яка не додає некоректні заявки до списку для подальшої комунікації.
- Організатор зустрічі хоче збирати пропозиції доповідачів із нормалізованими контактними даними.
- Волонтерській групі потрібно зберігати коректні запити про допомогу та надавати зрозумілий відгук для неповних заявок.

## Task
Створіть публічну форму n8n з полями імені, електронної пошти та повідомлення. Перевірте й нормалізуйте заявку, збережіть коректні записи в Data Table event_leads і покажіть зрозумілий результат як для коректних, так і для некоректних даних.

## Bonus Task
Знайдіть наявний рядок event_leads із такою самою нормалізованою електронною адресою та оновіть його замість створення дубліката.

## Nodes
- Form Trigger
- Edit Fields
- IF
- Data Table

## Preparation
- Створіть n8n Data Table з назвою event_leads.
- Для основного завдання сторонній обліковий запис не потрібен; Resend використовується лише для необов’язкового додаткового завдання.

## Requirements
- Зробіть ім’я, електронну адресу та повідомлення обов’язковими полями форми.
- Видаліть зайві пробіли з текстових полів, переведіть електронну адресу в нижній регістр і перевірте її формат у воркфлоу.
- Зберігайте лише коректні заявки з полями name, email, message, createdAt і status зі значенням new.
- Показуйте змістовний результат успіху та зрозумілий результат для некоректної електронної адреси.
- Додатково: надішліть через Resend підтвердження тестовому отримувачу, схваленому організаторами події.

## Tips
- Використайте Form Trigger, щоб створити публічну форму, і виберіть тип email для поля електронної пошти.
- Нормалізуйте надіслані значення в Edit Fields перед перевіркою або збереженням.
- Використайте умову IF з виразом для формату email, щоб розділити коректні й некоректні заявки.
- Додавайте новий рядок до event_leads лише з гілки коректних даних.
- Налаштуйте відповідь після завершення форми наприкінці, а Resend додавайте лише після того, як основний воркфлоу запрацює.
