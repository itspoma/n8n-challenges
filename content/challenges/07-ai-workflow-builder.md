---
number: 7
slug: ai-workflow-builder
difficulty: intermediate
time: 30–45 min
complexity: 3
color: #244a9b
ink: #ffffff
---

# English

## Title
Generate an Article with AI — Without Opening n8n

## Summary
Connect ChatGPT or Claude to n8n through MCP, then create an article for your WordPress.com blog entirely from the chatbot.

## Concept
Build, inspect, and improve a complete publishing automation with an external AI assistant.

## Scenario
- Turn a topic into a ready-to-review article for your personal blog.
- Build workflows through conversation without opening n8n or learning individual nodes.
- Automate personal routines or team processes by describing the outcome, without going into node configuration details.

## Task
Use only ChatGPT or Claude to create and run a workflow that generates a short article from your topic and saves it as a WordPress.com draft. Do not open the n8n web app or manually create, edit, connect, or run nodes. Give every workflow instruction through the AI chatbot.

## Bonus Task
Ask your chatbot to generate a catchy headline and one image, add the image as the article header, and publish the finished article on your WordPress.com blog.

## Nodes
- Form Trigger
- Basic LLM Chain
- OpenAI Chat Model
- Structured Output Parser
- WordPress

## Preparation
- Start with an [n8n Cloud account](/n8n-sign-up) or instance with MCP workflow-building access already enabled.
- Connect [ChatGPT](https://chatgpt.com/) or [Claude](https://claude.ai/) using the [n8n MCP instructions](https://docs.n8n.io/connect/connect-to-n8n-mcp-server). Your connection must allow creating, changing, and executing workflows.
- Have a [WordPress.com](https://wordpress.com/start) blog connected through [OAuth2](https://docs.n8n.io/integrations/builtin/credentials/wordpress/#using-oauth2) before starting. Complete the account authorization during setup.
- Have text-generation credentials ready in the connected instance; for the bonus, also have access to an image-generation service. Account connections are prerequisites: all workflow building and execution during this challenge happens through the chatbot.

## Requirements
- Create and run the workflow entirely through the AI chatbot, with no manual actions in the n8n web app.
- Generate an article from a topic and verify the resulting draft on WordPress.com.
- Bonus: publish the article with its generated headline and AI-generated header image, and provide its public link.

## Tips
- Ask ChatGPT or Claude whether it can connect to your n8n instance and create data tables and workflows. Ask it to check its available tools and execution permissions before building anything.
- Give your chatbot a clear brief. Open and copy this prompt, then replace the topic and blog placeholders. ||PROMPT|| Check your connected n8n tools first. Build and run a simple workflow entirely through MCP, without asking me to open n8n or configure nodes. My article topic is [TOPIC], my audience is [AUDIENCE], and my WordPress.com blog is [BLOG]. Use the existing text-generation connection and WordPress.com OAuth2 connection. Generate a useful short article with a title and readable HTML body, and save it as a draft. Choose the necessary nodes yourself. If a required connection or tool is unavailable, explain exactly what is missing. Do not request secrets in chat. Return the execution result and a WordPress draft link.
- Ask the chatbot to execute the workflow or its generated script through its connected tools, report the result, and give you the WordPress draft link. Open WordPress and check that the article exists and reads correctly.
- Bonus: ask the chatbot to add a generated header image and publish the article. ||PROMPT|| Update the n8n workflow we just built using only your connected tools. Generate a catchy, accurate headline and one relevant header image using the available image-generation service. Upload the image to my WordPress.com media library, place it at the top of the article, and use it as the featured image if supported. Publish the finished article to [BLOG]. Run the updated workflow and return the public article URL plus the execution result. Verify that the published page contains both the article and the image. If a required tool or connection is missing, explain the blocker; do not ask me to manually edit n8n nodes.
- Open the final WordPress link and check the headline, text, image, and published status. If anything is missing, describe the problem to the chatbot and ask it to fix and rerun the workflow.

## Why n8n
Why build with n8n and an AI assistant?

n8n Cloud hosts your automation and connects your services. Your chatbot builds it for you, while n8n keeps a visual workflow and execution history you can inspect later.

## When to use n8n
When should you use it?

Use it for repeatable personal or team tasks that connect several services—like writing an article and sending it straight to your blog.

## Glossary
- ChatGPT: An AI chatbot from OpenAI. You describe what you want in a conversation; with connected tools, it can also take actions for you.
- Claude: An AI chatbot from Anthropic. It can help write, plan, and use connected tools to build workflows from your instructions.
- MCP: Model Context Protocol—a standard connection that lets an AI chatbot use tools in another app, such as n8n.

# Spanish

## Title
Genera un artículo con IA sin abrir n8n

## Summary
Conecta ChatGPT o Claude a n8n mediante MCP y crea un artículo para tu blog de WordPress.com desde el chatbot.

## Concept
Crear, revisar y mejorar una automatización completa de publicación con un asistente de IA externo.

## Scenario
- Convierte un tema en un artículo listo para revisar en tu blog.
- Crea workflows conversando, sin abrir n8n ni aprender sus nodos.
- Automatiza rutinas personales o procesos del equipo describiendo el resultado, sin entrar en detalles de configuración.

## Task
Usa solo ChatGPT o Claude para crear y ejecutar un workflow que genere un artículo corto a partir de tu tema y lo guarde como borrador en WordPress.com. No abras la aplicación web de n8n ni crees, edites, conectes o ejecutes nodos manualmente. Da todas las instrucciones a través del chatbot.

## Bonus Task
Pide al chatbot que genere un titular atractivo y una imagen, coloque la imagen como cabecera del artículo y publique el resultado en tu blog de WordPress.com.

## Nodes
- Form Trigger
- Basic LLM Chain
- OpenAI Chat Model
- Structured Output Parser
- WordPress

## Preparation
- Prepara una [cuenta n8n Cloud](/n8n-sign-up) o instancia con acceso MCP para crear workflows ya habilitado.
- Conecta [ChatGPT](https://chatgpt.com/) o [Claude](https://claude.ai/) siguiendo las [instrucciones MCP de n8n](https://docs.n8n.io/connect/connect-to-n8n-mcp-server). Necesitas permisos para crear, modificar y ejecutar workflows.
- Antes de empezar, conecta tu blog de [WordPress.com](https://wordpress.com/start) mediante [OAuth2](https://docs.n8n.io/integrations/builtin/credentials/wordpress/#using-oauth2) y completa la autorización.
- Prepara una conexión para generar texto y, para el extra, otra para generar imágenes. Las conexiones son requisitos previos: durante el reto, toda la creación y ejecución se hace desde el chatbot.

## Requirements
- Crea y ejecuta el workflow solo desde el chatbot, sin acciones manuales en la web de n8n.
- Genera un artículo a partir de un tema y comprueba el borrador en WordPress.com.
- Extra: publica el artículo con su titular e imagen de cabecera generados por IA y proporciona el enlace público.

## Tips
- Pregunta a ChatGPT o Claude si puede conectar con n8n y crear tablas de datos y workflows. Pídele que compruebe las herramientas y los permisos de ejecución.
- Dale instrucciones claras. Abre y copia este prompt y sustituye los campos. ||PROMPT|| Comprueba tus herramientas de n8n. Crea y ejecuta un workflow mediante MCP sin pedirme que abra n8n ni configure nodos. Tema: [TEMA]. Público: [PÚBLICO]. Blog WordPress.com: [BLOG]. Usa las conexiones existentes de generación de texto y WordPress.com OAuth2. Genera un artículo corto con título y HTML legible y guárdalo como borrador. Elige los nodos necesarios. Si falta alguna conexión o herramienta, explica cuál. No pidas secretos en el chat. Devuelve el resultado de ejecución y el enlace al borrador.
- Pide al chatbot que ejecute el workflow o script mediante sus herramientas y te dé el resultado y el enlace al borrador. Abre WordPress y comprueba el artículo.
- Extra: pide una imagen de cabecera y publica el artículo. ||PROMPT|| Actualiza el workflow usando solo tus herramientas conectadas. Genera un titular preciso y atractivo y una imagen de cabecera. Sube la imagen a la biblioteca de WordPress.com, insértala al principio del artículo y úsala como imagen destacada si es compatible. Publica el artículo en [BLOG]. Ejecuta el workflow y devuelve el enlace público y el resultado. Comprueba que la página contiene el artículo y la imagen. Si falta una conexión o herramienta, explica el bloqueo sin pedirme editar nodos manualmente.
- Abre el enlace final y revisa el titular, texto, imagen y estado publicado. Si falta algo, pide al chatbot que lo corrija y vuelva a ejecutar el workflow.

## Why n8n
¿Por qué crear con n8n y un asistente de IA?

n8n Cloud aloja la automatización y conecta tus servicios. El chatbot la construye y n8n conserva el workflow visual y el historial para consultarlos después.

## When to use n8n
¿Cuándo conviene utilizarlo?

Para tareas personales o de equipo repetibles que conectan servicios, como escribir un artículo y enviarlo directamente a tu blog.

## Glossary
- ChatGPT: Un chatbot de IA de OpenAI. Puedes pedirle cosas conversando y, con herramientas conectadas, también puede realizar acciones.
- Claude: Un chatbot de IA de Anthropic que ayuda a escribir, planificar y crear workflows mediante herramientas conectadas.
- MCP: Model Context Protocol, un estándar que permite a un chatbot utilizar herramientas de otra aplicación, como n8n.

# Ukrainian

## Title
Створи статтю з ШІ, не відкриваючи n8n

## Summary
Підключи ChatGPT або Claude до n8n через MCP та створи статтю для свого блогу WordPress.com просто в чаті.

## Concept
Створення, перевірка та вдосконалення повної автоматизації публікації із зовнішнім ШІ-асистентом.

## Scenario
- Перетворюй тему на статтю для свого блогу, готову до перевірки.
- Створюй воркфлоу в розмові, не відкриваючи n8n та не вивчаючи окремі ноди.
- Автоматизуй особисті справи чи процеси команди, описуючи результат без деталей налаштування нод.

## Task
Використовуй лише ChatGPT або Claude, щоб створити й запустити воркфлоу, який генерує коротку статтю за твоєю темою та зберігає чернетку у WordPress.com. Не відкривай вебзастосунок n8n і не створюй, не редагуй, не з’єднуй та не запускай ноди вручну. Усі інструкції давай через ШІ-чатбот.

## Bonus Task
Попроси чатбот згенерувати влучний заголовок та одне зображення, додати його на початок статті й опублікувати результат у блозі WordPress.com.

## Nodes
- Form Trigger
- Basic LLM Chain
- OpenAI Chat Model
- Structured Output Parser
- WordPress

## Preparation
- Підготуй [акаунт n8n Cloud](/n8n-sign-up) або інстанс з уже ввімкненим MCP-доступом для створення воркфлоу.
- Підключи [ChatGPT](https://chatgpt.com/) або [Claude](https://claude.ai/) за [інструкціями MCP](https://docs.n8n.io/connect/connect-to-n8n-mcp-server). Потрібні права створення, зміни та виконання воркфлоу.
- До початку підключи блог [WordPress.com](https://wordpress.com/start) через [OAuth2](https://docs.n8n.io/integrations/builtin/credentials/wordpress/#using-oauth2) та заверши авторизацію.
- Підготуй підключення для генерації тексту, а для бонусу — зображень. Підключення акаунтів є передумовою: під час завдання все створення й виконання відбувається через чатбот.

## Requirements
- Створи й запусти воркфлоу лише через чатбот без ручних дій у вебзастосунку n8n.
- Згенеруй статтю за темою та перевір чернетку у WordPress.com.
- Бонус: опублікуй статтю зі згенерованими заголовком і зображенням та надай публічне посилання.

## Tips
- Запитай ChatGPT або Claude, чи може він підключитися до n8n і створювати таблиці даних та воркфлоу. Попроси перевірити доступні інструменти й права виконання.
- Дай чітке завдання. Відкрий і скопіюй промпт та заміни поля. ||PROMPT|| Перевір свої інструменти n8n. Створи й запусти воркфлоу через MCP, не просячи мене відкривати n8n чи налаштовувати ноди. Тема: [ТЕМА]. Аудиторія: [АУДИТОРІЯ]. Блог WordPress.com: [БЛОГ]. Використай готові підключення генерації тексту та WordPress.com OAuth2. Згенеруй коротку статтю із заголовком і читабельним HTML та збережи чернетку. Обери ноди самостійно. Якщо бракує підключення чи інструмента, поясни якого саме. Не проси секрети в чаті. Поверни результат виконання та посилання на чернетку.
- Попроси чатбот запустити воркфлоу або скрипт через підключені інструменти й надати результат і посилання. Відкрий WordPress і перевір статтю.
- Бонус: попроси додати зображення на початку й опублікувати статтю. ||PROMPT|| Онови воркфлоу лише через підключені інструменти. Згенеруй влучний і точний заголовок та одне доречне зображення. Завантаж його до медіатеки WordPress.com, встав на початку статті та використай як головне зображення, якщо це підтримується. Опублікуй статтю у [БЛОГ]. Запусти воркфлоу та надай публічне посилання й результат виконання. Перевір наявність тексту та зображення на сторінці. Якщо бракує інструмента чи підключення, поясни проблему, не просячи редагувати ноди вручну.
- Відкрий фінальне посилання й перевір заголовок, текст, зображення та статус публікації. Якщо щось не так, попроси чатбот виправити й повторно запустити воркфлоу.

## Why n8n
Навіщо поєднувати n8n та ШІ-асистента?

n8n Cloud розміщує автоматизацію та з’єднує сервіси. Чатбот будує її, а n8n зберігає візуальну схему та історію виконань для подальшої перевірки.

## When to use n8n
Коли варто використовувати n8n?

Для повторюваних особистих чи командних завдань між сервісами — наприклад, написати статтю та відразу надіслати її до блогу.

## Glossary
- ChatGPT: ШІ-чатбот від OpenAI. Йому можна давати завдання в розмові, а з підключеними інструментами він може виконувати дії.
- Claude: ШІ-чатбот від Anthropic, який допомагає писати, планувати й створювати воркфлоу через підключені інструменти.
- MCP: Model Context Protocol — стандарт, який дозволяє ШІ-чатботу користуватися інструментами іншого застосунку, наприклад n8n.
