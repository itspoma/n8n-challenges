---
number: 2
slug: valencia-telegram-bot
difficulty: beginner
time: 20–30 min
complexity: 2
color: #f7cb55
ink: #1b2427
---

# English

## Title
Valencia Air Quality Telegram Bot

## Summary
Reply to a Telegram message with the latest air-quality reading for VALÈNCIA CENTRE.

## Concept
Chat triggers, HTTP requests, and data filtering

## Glossary
- Valencia Open Data: Valencia Open Data is a website where Valencia City Council publishes public information that people and apps can reuse.
- API: An API is a way for one app to ask another app for data or an action in a predictable format.
- Trigger: A trigger is the first node in an n8n workflow. It starts the workflow when a specific event happens.
- Telegram: Telegram is a free messaging app that works on phones, computers, and the web.
- Telegram bot: A Telegram bot is an automated Telegram account that can receive messages and send replies.
- BotFather: BotFather is Telegram's official bot for creating and managing Telegram bots.
- Token: A token is a private code that lets n8n connect to and act as your Telegram bot. Do not share it.
- n8n credential: An n8n credential securely stores the connection details that a node needs to access another service.

## Scenario
- A resident wants to check the latest air quality in central Valencia without searching it on Google.
- An event organizer wants to check local air quality before choosing an outdoor meetup spot.
- A neighborhood group wants a quick Telegram air-quality update it can share with community members.
- Residents could use the same workflow pattern to request information from Valencia Open Data's nearly 300 public datasets through a familiar messaging app such as Telegram or WhatsApp.

## Task
Build a Telegram bot that reacts to any text message, requests the live Valencia Open Data air-quality dataset, finds the record whose address is VALÈNCIA CENTRE, and replies with the address, observation date, air-quality status, and available NO₂, PM10, and PM2.5 values.

## Bonus Task
Add ✅ when the calidad_ambiental status is Buena or Razonablemente Buena; otherwise add ⚠️ so the result is easy to understand at a glance.

## Nodes
- Telegram Trigger
- HTTP Request
- Edit Fields (Set)
- Telegram

## Preparation
- Install [Telegram](https://telegram.org/). Telegram is free and secure, and connecting a Telegram bot to n8n is quick and simple. We use it here because connecting WhatsApp is more complex and requires additional business setup.
- Create a Telegram bot with [BotFather](https://t.me/botfather), then [add its token as an n8n credential](https://docs.n8n.io/integrations/builtin/credentials/telegram#using-api-bot-access-token).
- The [Valencia City Council air-quality endpoint](https://www.valencia.es/web/guest/valenciaalminut/calidadaire.cors) provides real-time data. Keep it ready to use in your HTTP Request node.

## Requirements
- Run the workflow when you send a text message to your Telegram bot.
- Fetch the live air-quality dataset from the provided Valencia City Council endpoint through HTTP Request.
- Select the resultset row whose address is exactly VALÈNCIA CENTRE instead of hard-coding a row number.
- Reply to the same chat with the address, dateobserved, calidad_ambiental, and available no2value, pm10value, and pm25value data.
- Demonstrate that two messages receive replies using fresh data from the endpoint.

## Tips
- After you create the bot, BotFather returns a new access token. Add this token to your Telegram credential in n8n.
- Send your new bot a message after activating Telegram Trigger so n8n receives sample data and you can verify that Telegram is connected correctly.
- Use the air-quality endpoint in an HTTP Request node and inspect both metadata and resultset in the response.
- Use the Edit Fields (Set) node to identify each column position from metadata, then find the resultset row whose address is exactly VALÈNCIA CENTRE.
- Map the chat ID from Telegram Trigger into the Telegram send-message operation and include the selected station's air-quality values.

# Spanish

## Title
Bot de Telegram sobre la calidad del aire en Valencia

## Summary
Responde a un mensaje de Telegram con la última medición de calidad del aire de VALÈNCIA CENTRE.

## Concept
Triggers de chat, peticiones HTTP y filtrado de datos

## Glossary
- Valencia Open Data: Valencia Open Data es el sitio donde el Ayuntamiento de Valencia publica información pública que las personas y las aplicaciones pueden reutilizar.
- API: Una API es una forma de que una aplicación pida datos o una acción a otra aplicación en un formato predecible.
- Trigger: Un trigger es el primer nodo de un workflow de n8n. Inicia el workflow cuando ocurre un evento concreto.
- Telegram: Telegram es una aplicación de mensajería gratuita que funciona en teléfonos, ordenadores y la web.
- Bot de Telegram: Un bot de Telegram es una cuenta automatizada de Telegram que puede recibir mensajes y enviar respuestas.
- BotFather: BotFather es el bot oficial de Telegram para crear y administrar bots de Telegram.
- Token: Un token es un código privado que permite a n8n conectarse a tu bot de Telegram y actuar en su nombre. No lo compartas.
- Credencial de n8n: Una credencial de n8n guarda de forma segura los datos de conexión que un nodo necesita para acceder a otro servicio.

## Scenario
- Una persona residente quiere consultar la última calidad del aire en el centro de Valencia sin buscarla en Google.
- La organización de un evento quiere revisar la calidad del aire antes de elegir un lugar de encuentro al aire libre.
- Un grupo vecinal quiere una actualización rápida de la calidad del aire por Telegram que pueda compartir con la comunidad.
- El mismo patrón de workflow puede ofrecer información de cualquiera de los casi 300 conjuntos de datos públicos adecuados de Valencia Open Data mediante una aplicación de mensajería conocida, como Telegram o WhatsApp.

## Task
Crea un bot de Telegram que reaccione a cualquier mensaje de texto, solicite el conjunto de datos en directo sobre la calidad del aire de Valencia Open Data, encuentre el registro cuya dirección sea VALÈNCIA CENTRE y responda con la dirección, la fecha de observación, el estado de calidad del aire y los valores disponibles de NO₂, PM10 y PM2.5.

## Bonus Task
Añade ✅ cuando el estado calidad_ambiental sea Buena o Razonablemente Buena; en caso contrario, añade ⚠️ para que el resultado se entienda de un vistazo.

## Nodes
- Telegram Trigger
- HTTP Request
- Edit Fields (Set)
- Telegram

## Preparation
- Instala [Telegram](https://telegram.org/). Telegram es gratuito y seguro, y conectar un bot de Telegram con n8n es rápido y sencillo. Lo usamos aquí porque conectar WhatsApp es más complejo y requiere una configuración empresarial adicional.
- Crea un bot de Telegram con [BotFather](https://t.me/botfather) y después [añade su token como credencial de n8n](https://docs.n8n.io/integrations/builtin/credentials/telegram#using-api-bot-access-token).
- El [endpoint de calidad del aire del Ayuntamiento de Valencia](https://www.valencia.es/web/guest/valenciaalminut/calidadaire.cors) proporciona datos en tiempo real. Tenlo preparado para usarlo en tu nodo HTTP Request.

## Requirements
- Ejecuta el workflow cuando envíes un mensaje de texto a tu bot de Telegram.
- Obtén el conjunto de datos en directo sobre la calidad del aire desde el endpoint proporcionado por el Ayuntamiento de Valencia mediante HTTP Request.
- Selecciona la fila de resultset cuya dirección sea exactamente VALÈNCIA CENTRE en lugar de fijar manualmente un número de fila.
- Responde al mismo chat con address, dateobserved, calidad_ambiental y los datos disponibles de no2value, pm10value y pm25value.
- Demuestra que dos mensajes reciben respuestas con datos nuevos del endpoint.

## Tips
- Después de crear el bot, BotFather devuelve un nuevo token de acceso. Añade este token a tu credencial de Telegram en n8n.
- Envía un mensaje a tu bot después de activar Telegram Trigger para que n8n reciba datos de ejemplo y puedas comprobar que Telegram está conectado correctamente.
- Usa el endpoint de calidad del aire en un nodo HTTP Request e inspecciona metadata y resultset en la respuesta.
- Usa el nodo Edit Fields (Set) para identificar la posición de cada columna a partir de metadata y después encontrar la fila de resultset cuya dirección sea exactamente VALÈNCIA CENTRE.
- Mapea el chat ID de Telegram Trigger en la operación de envío del nodo Telegram e incluye los valores de calidad del aire de la estación seleccionada.

# Ukrainian

## Title
Telegram-бот для перевірки якості повітря у Валенсії

## Summary
Відповідайте на повідомлення в Telegram найсвіжішими даними про якість повітря для станції VALÈNCIA CENTRE.

## Concept
Чат-тригери, HTTP-запити та фільтрування даних

## Glossary
- Valencia Open Data: Valencia Open Data — це сайт, на якому міська рада Валенсії публікує відкриту інформацію для повторного використання людьми й застосунками.
- API: API — це спосіб, за допомогою якого один застосунок може у передбачуваному форматі запросити в іншого дані або дію.
- Тригер: Тригер — це перша нода у воркфлоу n8n. Вона запускає воркфлоу, коли відбувається певна подія.
- Telegram: Telegram — це безплатний месенджер, який працює на телефонах, комп’ютерах і у веббраузері.
- Telegram-бот: Telegram-бот — це автоматизований обліковий запис Telegram, який може отримувати повідомлення та надсилати відповіді.
- BotFather: BotFather — офіційний бот Telegram для створення й керування Telegram-ботами.
- Токен: Токен — це приватний код, який дає n8n змогу підключатися до вашого Telegram-бота й діяти від його імені. Нікому його не передавайте.
- Облікові дані n8n: Облікові дані n8n безпечно зберігають параметри підключення, необхідні ноді для доступу до іншого сервісу.

## Scenario
- Мешканець хоче дізнатися про найсвіжішу якість повітря в центрі Валенсії без пошуку в Google.
- Організатор події хоче перевірити місцеву якість повітря перед вибором місця для зустрічі просто неба.
- Районна спільнота хоче швидко отримувати в Telegram оновлення про якість повітря й ділитися ним з учасниками.
- За тим самим шаблоном воркфлоу мешканці могли б запитувати інформацію з майже 300 відкритих наборів даних Valencia Open Data через знайомий месенджер, як-от Telegram або WhatsApp.

## Task
Створіть Telegram-бота, який реагує на будь-яке текстове повідомлення, запитує актуальний набір даних про якість повітря з Valencia Open Data, знаходить запис з адресою VALÈNCIA CENTRE та відповідає, указуючи адресу, дату спостереження, стан якості повітря й доступні значення NO₂, PM10 і PM2.5.

## Bonus Task
Додайте ✅, коли статус calidad_ambiental має значення Buena або Razonablemente Buena; в інших випадках додайте ⚠️, щоб результат було легко зрозуміти з першого погляду.

## Nodes
- Telegram Trigger
- HTTP Request
- Edit Fields (Set)
- Telegram

## Preparation
- Установіть [Telegram](https://telegram.org/). Telegram безплатний і безпечний, а підключити Telegram-бота до n8n можна швидко й просто. Ми використовуємо його, тому що підключення WhatsApp складніше й потребує додаткового налаштування бізнес-акаунта.
- Створіть Telegram-бота за допомогою [BotFather](https://t.me/botfather), а потім [додайте його токен до облікових даних n8n](https://docs.n8n.io/integrations/builtin/credentials/telegram#using-api-bot-access-token).
- [Ендпоінт міської ради Валенсії з даними про якість повітря](https://www.valencia.es/web/guest/valenciaalminut/calidadaire.cors) надає інформацію в реальному часі. Підготуйте його для використання в ноді HTTP Request.

## Requirements
- Запускайте воркфлоу, коли надсилаєте текстове повідомлення своєму Telegram-боту.
- Отримуйте актуальний набір даних про якість повітря з наданого ендпоінта міської ради Валенсії через HTTP Request.
- Вибирайте рядок resultset, у якому адреса точно дорівнює VALÈNCIA CENTRE, замість жорстко заданого номера рядка.
- Відповідайте в тому самому чаті, указуючи address, dateobserved, calidad_ambiental і доступні дані no2value, pm10value та pm25value.
- Продемонструйте, що два повідомлення отримують відповіді зі свіжими даними з ендпоінта.

## Tips
- Після створення бота BotFather повертає новий токен доступу. Додайте його до облікових даних Telegram у n8n.
- Після активації Telegram Trigger надішліть новому боту повідомлення, щоб n8n отримав тестові дані й ви могли перевірити правильність підключення Telegram.
- Використайте ендпоінт якості повітря в ноді HTTP Request і перегляньте у відповіді metadata та resultset.
- За допомогою ноди Edit Fields (Set) визначте позицію кожного стовпця з metadata, а потім знайдіть у resultset рядок, адреса якого точно дорівнює VALÈNCIA CENTRE.
- Передайте chat ID з Telegram Trigger в операцію надсилання повідомлення ноди Telegram і додайте значення якості повітря вибраної станції.
