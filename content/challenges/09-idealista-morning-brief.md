---
number: 9
slug: idealista-morning-brief
difficulty: advanced
time: 45–60 min
complexity: 4
color: #c6c9c7
ink: #1b2427
---

# English

## Title
Idealista Morning Apartment Brief

## Summary
Detect newly listed matching apartments from event data and deliver a deduplicated morning brief.

## Concept
Scheduled ingestion, persistent state, filtering, and deduplication

## Scenario
- An apartment seeker wants only genuinely new Valencia listings matching a fixed budget and preferred areas.
- A relocation volunteer group wants to send curated daily matches without repeating yesterday's listings.
- A student household needs a short morning digest instead of manually checking a large property feed.

## Task
At 08:00 Europe/Madrid, read the event-provided Idealista-style listing snapshot, keep apartments at or below €1,200 with at least two bedrooms in Russafa, El Carme, or Benimaclet, exclude listing IDs already stored in a Data Table, and send up to five new matches to Telegram.

## Bonus Task
When there are no new matches, send a Telegram update saying so and do not write anything to the Data Table.

## Nodes
- Schedule Trigger
- HTTP Request
- Filter
- Sort
- Limit
- Data Table
- Telegram

## Preparation
- Ask a mentor for the event-owned yesterday and today listing snapshots; do not scrape or call the live Idealista website.
- Create a seen_listings Data Table and connect a Telegram bot with a test chat.

## Requirements
- Configure the final schedule for 08:00 in the Europe/Madrid timezone.
- Read the supplied snapshot dynamically and filter by price, bedrooms, and allowed neighborhood.
- Treat listingId as the stable identity and exclude every ID already present in seen_listings.
- Sort new matches by lowest monthly price and send at most five with title, neighborhood, price, bedrooms, and URL.
- Store delivered IDs, then prove that running the same snapshot again sends no duplicate listings.

## Tips
- Develop with the two supplied snapshots and add Schedule Trigger only after manual tests pass.
- Seed seen_listings with the matching IDs from yesterday before processing today's snapshot.
- Apply the preference filters before checking each remaining listing ID against the Data Table.
- Sort and limit only the unseen matches, then format them into one Telegram digest.
- Write delivered IDs after a successful send so a failed delivery does not hide listings permanently.

# Spanish

## Title
Resumen matinal de apartamentos de Idealista

## Summary
Detecta apartamentos nuevos que coincidan en los datos del evento y entrega un resumen matinal sin duplicados.

## Concept
Ingesta programada, estado persistente, filtrado y deduplicación

## Scenario
- Una persona que busca piso solo quiere anuncios nuevos en Valencia que encajen con su presupuesto y zonas preferidas.
- Un grupo de apoyo a la reubicación quiere enviar coincidencias diarias sin repetir los anuncios de ayer.
- Un grupo de estudiantes necesita un resumen matinal breve en lugar de revisar manualmente un gran feed inmobiliario.

## Task
A las 08:00 Europe/Madrid, lee el snapshot de anuncios tipo Idealista proporcionado por el evento, conserva pisos de hasta 1.200 € con al menos dos habitaciones en Russafa, El Carme o Benimaclet, excluye los listingId ya guardados en una Data Table y envía hasta cinco coincidencias nuevas a Telegram.

## Bonus Task
Cuando no haya coincidencias nuevas, envía un aviso por Telegram y no escribas nada en la Data Table.

## Nodes
- Schedule Trigger
- HTTP Request
- Filter
- Sort
- Limit
- Data Table
- Telegram

## Preparation
- Pide a un mentor los snapshots de ayer y hoy, propiedad del evento; no extraigas datos ni llames al sitio web de Idealista en directo.
- Crea una Data Table llamada seen_listings y conecta un bot de Telegram con un chat de prueba.

## Requirements
- Configura el horario final para las 08:00 en la zona Europe/Madrid.
- Lee dinámicamente el snapshot suministrado y filtra por precio, habitaciones y barrio permitido.
- Usa listingId como identidad estable y excluye cada ID que ya exista en seen_listings.
- Ordena las coincidencias nuevas por el alquiler mensual más bajo y envía como máximo cinco con título, barrio, precio, habitaciones y URL.
- Guarda los ID enviados y demuestra que ejecutar de nuevo el mismo snapshot no envía anuncios duplicados.

## Tips
- Desarrolla con los dos snapshots suministrados y añade Schedule Trigger solo cuando pasen las pruebas manuales.
- Rellena inicialmente seen_listings con los ID coincidentes de ayer antes de procesar el snapshot de hoy.
- Aplica los filtros de preferencias antes de comprobar cada listingId restante en la Data Table.
- Ordena y limita solo las coincidencias no vistas y después dales formato en un único resumen de Telegram.
- Escribe los ID entregados después de un envío correcto para que un fallo de entrega no oculte anuncios permanentemente.

# Ukrainian

## Title
Ранковий огляд квартир Idealista

## Summary
Знаходьте нові відповідні квартири в даних події та надсилайте ранковий огляд без дублікатів.

## Concept
Завантаження за розкладом, постійний стан, фільтрування та усунення дублікатів

## Scenario
- Людина, яка шукає квартиру, хоче бачити лише справді нові оголошення у Валенсії, що відповідають фіксованому бюджету та бажаним районам.
- Волонтерська група з релокації хоче щодня надсилати дібрані варіанти, не повторюючи вчорашні оголошення.
- Студентській родині потрібен короткий ранковий огляд замість ручної перевірки великої стрічки нерухомості.

## Task
О 08:00 за часовим поясом Europe/Madrid прочитайте наданий організаторами знімок оголошень у стилі Idealista, залиште квартири ціною не більше €1 200, щонайменше з двома спальнями в Russafa, El Carme або Benimaclet, виключіть listing ID, які вже збережені в Data Table, і надішліть до п’яти нових варіантів у Telegram.

## Bonus Task
Якщо нових варіантів немає, надішліть про це повідомлення в Telegram і нічого не записуйте до Data Table.

## Nodes
- Schedule Trigger
- HTTP Request
- Filter
- Sort
- Limit
- Data Table
- Telegram

## Preparation
- Попросіть у ментора вчорашній і сьогоднішній знімки оголошень, що належать організаторам події; не збирайте дані з реального сайту Idealista й не звертайтеся до нього напряму.
- Створіть Data Table seen_listings і підключіть Telegram-бота з тестовим чатом.

## Requirements
- Налаштуйте фінальний розклад на 08:00 у часовому поясі Europe/Madrid.
- Динамічно читайте наданий знімок і фільтруйте за ціною, кількістю спалень і дозволеним районом.
- Використовуйте listingId як стабільний ідентифікатор і виключайте кожен ID, який уже є в seen_listings.
- Сортуйте нові варіанти за найнижчою місячною ціною та надсилайте не більше п’яти, указуючи назву, район, ціну, кількість спалень і URL.
- Зберігайте ID надісланих оголошень, а потім доведіть, що повторний запуск з тим самим знімком не надсилає дублікатів.

## Tips
- Розробляйте з двома наданими знімками й додавайте Schedule Trigger лише після успішних ручних тестів.
- Перед обробкою сьогоднішнього знімка початково заповніть seen_listings відповідними ID із вчорашнього.
- Застосуйте фільтри вподобань перед перевіркою кожного listingId, що залишився, у Data Table.
- Сортуйте й обмежуйте лише ще не переглянуті варіанти, а потім сформатуйте їх в один огляд Telegram.
- Записуйте надіслані ID після успішного надсилання, щоб помилка доставки не приховала оголошення назавжди.
