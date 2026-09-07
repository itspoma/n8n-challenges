---
number: 6
slug: trello-morning-brief
difficulty: intermediate
time: 30–40 min
complexity: 3
color: #ea4b71
ink: #ffffff
---

# English

## Title
Trello Morning Brief

## Summary
Send the three most important open Trello cards to Telegram every morning.

## Concept
Schedules, deterministic ranking, list processing, and messaging

## Scenario
- A small team wants a predictable morning digest instead of checking every Trello card.
- Event organizers need the three most urgent tasks before their daily stand-up.
- A volunteer team wants overdue and red-labelled work surfaced automatically each morning.

## Task
At 09:00 Europe/Madrid each weekday, fetch the open cards from the event Trello board, rank red-labelled cards first and then by earliest due date, keep the top three, and send one Telegram digest.

## Bonus Task
When there are no red-labelled or overdue cards, add "No urgent cards today" to the digest while still listing the next three cards.

## Nodes
- Schedule Trigger
- Trello
- Sort
- Limit
- Telegram

## Preparation
- Connect a Trello account with access to the event-provided board and a Telegram bot with a test chat.
- Ask a mentor for the board ID and confirm that its sample cards include labels, due dates, and URLs.

## Requirements
- Configure the final schedule for weekdays at 09:00 in the Europe/Madrid timezone.
- Fetch open cards from the supplied Trello board dynamically.
- Rank red-labelled cards before other cards, then sort each group by the earliest due date.
- Send one Telegram message containing at most three cards with name, due date, and URL.
- Send a clear no-open-cards message when the list is empty.

## Tips
- Use a manual trigger while building and switch to Schedule Trigger after the output is correct.
- Inspect Trello's label and due-date fields before defining the ranking key.
- Create one sortable value for label priority and a second value for the due date.
- Sort first, then use Limit to keep only three items before formatting the digest.
- As an optional bonus, let AI prioritize the cards or send the digest through WhatsApp Business Cloud.

# Spanish

## Title
Resumen matinal de Trello

## Summary
Envía cada mañana a Telegram las tres tarjetas abiertas más importantes de Trello.

## Concept
Horarios, clasificación determinista, procesamiento de listas y mensajería

## Scenario
- Un equipo pequeño quiere un resumen matinal predecible en lugar de revisar todas las tarjetas de Trello.
- La organización de un evento necesita las tres tareas más urgentes antes de su reunión diaria.
- Un equipo de voluntariado quiere ver automáticamente cada mañana el trabajo vencido y con etiqueta roja.

## Task
A las 09:00 Europe/Madrid de cada día laborable, obtén las tarjetas abiertas del tablero de Trello del evento, coloca primero las que tengan etiqueta roja y después ordénalas por la fecha de vencimiento más próxima, conserva las tres primeras y envía un único resumen a Telegram.

## Bonus Task
Cuando no haya tarjetas con etiqueta roja ni vencidas, añade "No hay tarjetas urgentes hoy" al resumen y sigue mostrando las tres tarjetas siguientes.

## Nodes
- Schedule Trigger
- Trello
- Sort
- Limit
- Telegram

## Preparation
- Conecta una cuenta de Trello con acceso al tablero proporcionado por el evento y un bot de Telegram con un chat de prueba.
- Pide a un mentor el ID del tablero y confirma que sus tarjetas de ejemplo incluyan etiquetas, fechas de vencimiento y URLs.

## Requirements
- Configura el horario final para los días laborables a las 09:00 en la zona Europe/Madrid.
- Obtén dinámicamente las tarjetas abiertas del tablero de Trello suministrado.
- Coloca las tarjetas con etiqueta roja antes que las demás y después ordena cada grupo por la fecha de vencimiento más próxima.
- Envía un único mensaje de Telegram con un máximo de tres tarjetas e incluye nombre, fecha de vencimiento y URL.
- Envía un mensaje claro de que no hay tarjetas abiertas cuando la lista esté vacía.

## Tips
- Usa un trigger manual durante la construcción y cambia a Schedule Trigger cuando el resultado sea correcto.
- Inspecciona los campos de etiqueta y fecha de Trello antes de definir la clave de clasificación.
- Crea un valor ordenable para la prioridad de la etiqueta y otro para la fecha de vencimiento.
- Ordena primero y después usa Limit para conservar solo tres elementos antes de dar formato al resumen.
- Como bonus opcional, deja que la IA priorice las tarjetas o envía el resumen por WhatsApp Business Cloud.

# Ukrainian

## Title
Ранковий огляд Trello

## Summary
Щоранку надсилайте в Telegram три найважливіші відкриті картки Trello.

## Concept
Розклади, детерміноване ранжування, обробка списків і повідомлення

## Scenario
- Невелика команда хоче отримувати передбачуваний ранковий огляд замість перевірки кожної картки Trello.
- Організаторам події перед щоденною зустріччю потрібні три найтерміновіші завдання.
- Волонтерська команда хоче, щоб прострочена робота й картки з червоною міткою автоматично з’являлися в огляді щоранку.

## Task
О 09:00 за часовим поясом Europe/Madrid у кожен робочий день отримуйте відкриті картки з дошки Trello події, спочатку ранжуйте картки з червоною міткою, а потім — за найближчою датою виконання, залишайте три перші й надсилайте один огляд у Telegram.

## Bonus Task
Якщо немає карток із червоною міткою або прострочених карток, додайте до огляду "No urgent cards today", але все одно покажіть наступні три картки.

## Nodes
- Schedule Trigger
- Trello
- Sort
- Limit
- Telegram

## Preparation
- Підключіть обліковий запис Trello з доступом до наданої організаторами дошки та Telegram-бота з тестовим чатом.
- Попросіть у ментора ID дошки й переконайтеся, що тестові картки містять мітки, дати виконання та URL.

## Requirements
- Налаштуйте фінальний розклад на робочі дні о 09:00 у часовому поясі Europe/Madrid.
- Динамічно отримуйте відкриті картки з наданої дошки Trello.
- Розміщуйте картки з червоною міткою перед іншими, а всередині кожної групи сортуйте за найближчою датою виконання.
- Надсилайте одне повідомлення Telegram щонайбільше з трьома картками, указуючи назву, дату виконання та URL.
- Якщо список порожній, надсилайте зрозуміле повідомлення про відсутність відкритих карток.

## Tips
- Під час створення використовуйте ручний тригер, а після отримання правильного результату перейдіть на Schedule Trigger.
- Перегляньте поля міток і дат виконання Trello перед визначенням ключа ранжування.
- Створіть одне придатне для сортування значення для пріоритету мітки й друге — для дати виконання.
- Спочатку виконайте сортування, а потім за допомогою Limit залиште лише три елементи перед форматуванням огляду.
- Як необов’язкове доповнення дозвольте ШІ визначати пріоритет карток або надсилайте огляд через WhatsApp Business Cloud.
