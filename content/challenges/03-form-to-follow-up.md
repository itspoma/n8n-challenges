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
- A meetup organizer wants to collect speaker proposals with consistent contact details.
- A volunteer group needs to save valid help requests while giving incomplete submissions clear feedback.

## Task
Create a public n8n form with name, email, and message fields. Validate and normalize the submission, save valid entries in an event_leads Data Table, and show a clear result for both valid and invalid input.

## Bonus Task
After saving a valid submission, send the organizers a thank-you email with Resend.

## Nodes
- Form Trigger
- Edit Fields (Set)
- IF
- Data Table
- Resend

## Preparation
- Create an [n8n Data Table](https://docs.n8n.io/build/work-with-data/data-tables) named event_leads with name, email, message, and status columns. n8n adds createdAt automatically.
- No third-party account is required for the core challenge.
- Bonus: [sign up for Resend](https://resend.com/) and connect your Resend account in n8n.

## Requirements
- Make name, email, and message required form fields.
- Trim the text fields, lowercase the email address, and validate its format in the workflow.
- Store only valid submissions with name, email, message, and status set to new; use the Data Table's automatic createdAt timestamp.
- Show a meaningful success result and a clear invalid-email result.
- Bonus: after saving the submission, send a thank-you email with Resend to an organizer-approved address.

## Tips
- Start with Form Trigger: create the public form, add the three required fields, and select the email field type for email.
- Add Edit Fields (Set) next: trim name and message, lowercase email, and set status to new.
- Add IF third: use an email-format expression to send valid submissions to the true output and invalid submissions to the false output.
- Connect Data Table to the IF node's true output and insert a row into event_leads; use the false output for the invalid-email result.
- For the bonus, connect Resend after Data Table and send a short thank-you email to the organizers.

# Spanish

## Title
Del formulario al seguimiento

## Summary
Valida el envío de un formulario y guarda datos de contacto limpios en una Data Table de n8n.

## Concept
Formularios de n8n, validación y Data Tables

## Scenario
- El equipo de un evento necesita un formulario fiable que mantenga los envíos inválidos fuera de su lista de seguimiento.
- La organización de un meetup quiere recopilar propuestas de ponentes con datos de contacto consistentes.
- Un grupo de voluntariado necesita guardar solicitudes válidas y explicar claramente qué falta en las incompletas.

## Task
Crea un formulario público de n8n con los campos nombre, email y mensaje. Valida y normaliza el envío, guarda las entradas válidas en una Data Table llamada event_leads y muestra un resultado claro tanto para datos válidos como inválidos.

## Bonus Task
Después de guardar un envío válido, manda al equipo organizador un email de agradecimiento con Resend.

## Nodes
- Form Trigger
- Edit Fields (Set)
- IF
- Data Table
- Resend

## Preparation
- Crea una [Data Table de n8n](https://docs.n8n.io/build/work-with-data/data-tables) llamada event_leads con las columnas name, email, message y status. n8n añade createdAt automáticamente.
- No necesitas una cuenta de terceros para el reto principal.
- Bonus: [regístrate en Resend](https://resend.com/) y conecta tu cuenta de Resend en n8n.

## Requirements
- Haz obligatorios los campos nombre, email y mensaje.
- Elimina espacios sobrantes de los textos, convierte el email a minúsculas y valida su formato en el workflow.
- Guarda solo los envíos válidos con name, email, message y status con el valor new; usa el timestamp createdAt automático de la Data Table.
- Muestra un resultado de éxito útil y un resultado claro para un email inválido.
- Bonus: después de guardar el envío, manda un email de agradecimiento con Resend a una dirección aprobada por el equipo organizador.

## Tips
- Empieza con Form Trigger: crea el formulario público, añade los tres campos obligatorios y selecciona el tipo email para el correo.
- Añade después Edit Fields (Set): elimina espacios de name y message, convierte email a minúsculas y asigna new a status.
- Añade IF en tercer lugar: usa una expresión de formato de email para enviar los datos válidos por la salida true y los inválidos por la salida false.
- Conecta Data Table a la salida true del nodo IF e inserta una fila en event_leads; usa la salida false para el resultado de email inválido.
- Para el bonus, conecta Resend después de Data Table y envía un breve email de agradecimiento al equipo organizador.

# Ukrainian

## Title
Від форми до подальшої комунікації

## Summary
Перевірте дані з форми та збережіть чисті контактні дані в n8n Data Table.

## Concept
Форми n8n, валідація та Data Tables

## Scenario
- Команді події потрібна надійна контактна форма, яка не додає некоректні заявки до списку для подальшої комунікації.
- Організатор зустрічі хоче збирати пропозиції доповідачів з узгодженими контактними даними.
- Волонтерській групі потрібно зберігати коректні запити про допомогу та надавати зрозумілий відгук для неповних заявок.

## Task
Створіть публічну форму n8n з полями імені, електронної пошти та повідомлення. Перевірте й нормалізуйте заявку, збережіть коректні записи в Data Table event_leads і покажіть зрозумілий результат як для коректних, так і для некоректних даних.

## Bonus Task
Після збереження коректної заявки надішліть організаторам лист-подяку через Resend.

## Nodes
- Form Trigger
- Edit Fields (Set)
- IF
- Data Table
- Resend

## Preparation
- Створіть [n8n Data Table](https://docs.n8n.io/build/work-with-data/data-tables) з назвою event_leads і стовпцями name, email, message та status. n8n додає createdAt автоматично.
- Для основного завдання сторонній обліковий запис не потрібен.
- Додатково: [зареєструйтеся в Resend](https://resend.com/) і підключіть свій обліковий запис Resend у n8n.

## Requirements
- Зробіть ім’я, електронну адресу та повідомлення обов’язковими полями форми.
- Видаліть зайві пробіли з текстових полів, переведіть електронну адресу в нижній регістр і перевірте її формат у воркфлоу.
- Зберігайте лише коректні заявки з полями name, email, message і status зі значенням new; використовуйте автоматичну часову мітку createdAt у Data Table.
- Показуйте змістовне повідомлення про успіх і зрозуміле повідомлення про некоректну електронну адресу.
- Додатково: після збереження заявки надішліть через Resend лист-подяку на адресу, схвалену організаторами.

## Tips
- Почніть із Form Trigger: створіть публічну форму, додайте три обов’язкові поля й оберіть тип email для електронної адреси.
- Далі додайте Edit Fields (Set): приберіть зайві пробіли з name і message, переведіть email у нижній регістр і задайте для status значення new.
- Третім додайте IF: використайте вираз для перевірки формату email, щоб спрямувати коректні дані на вихід true, а некоректні — на вихід false.
- Під’єднайте Data Table до виходу true ноди IF і додайте рядок до event_leads; використайте вихід false для повідомлення про некоректний email.
- Для додаткового завдання під’єднайте Resend після Data Table і надішліть організаторам короткий лист-подяку.
