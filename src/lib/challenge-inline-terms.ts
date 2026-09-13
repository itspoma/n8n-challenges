import type { Locale } from "@/lib/home-copy";

export const additionalInlineTerms: Partial<
  Record<string, Partial<Record<Locale, Array<{ term: string; definition: string }>>>>
> = {
  "telegram-photo-summary": {"en": [{"term": "AI Agent", "definition": "The node that uses an AI model to understand the photo and write a reply."}, {"term": "OpenRouter", "definition": "A service that connects n8n to AI models, including models that can read images."}, {"term": "nativeLanguage", "definition": "A field saved in this workflow that specifies the language you want translations in."}], "es": [{"term": "AI Agent", "definition": "El nodo que usa un modelo de IA para entender la foto y responder."}, {"term": "OpenRouter", "definition": "Un servicio que conecta n8n con modelos de IA, incluidos modelos que leen imágenes."}, {"term": "nativeLanguage", "definition": "Un campo guardado en el workflow que indica el idioma al que quieres traducir."}], "uk": [{"term": "AI Agent", "definition": "Нода, яка використовує модель ШІ, щоб зрозуміти фото й відповісти."}, {"term": "OpenRouter", "definition": "Сервіс, що з’єднує n8n з моделями ШІ, зокрема з моделями для зображень."}, {"term": "nativeLanguage", "definition": "Поле у воркфлоу, яке задає мову перекладу."}]},
  "wikipedia-ai-agent": {
    en: [{"term": "AI Agent", "definition": "The node that reads your question, chooses a tool, and writes the answer."}, {"term": "Wikipedia", "definition": "The agent’s tool for looking up information in the online encyclopedia."}, {"term": "Simple Memory", "definition": "A node that keeps recent messages from the same chat so the agent can understand follow-up questions."}, {"term": "session ID", "definition": "An identifier that keeps one chat’s history separate from other chats."}],
    es: [{"term": "AI Agent", "definition": "El nodo que lee tu pregunta, elige una herramienta y escribe la respuesta."}, {"term": "Wikipedia", "definition": "La herramienta del agente para buscar información en la enciclopedia en línea."}, {"term": "Simple Memory", "definition": "Un nodo que conserva mensajes recientes del mismo chat para entender preguntas de seguimiento."}, {"term": "ID de sesión", "definition": "Un identificador que separa el historial de un chat del de los demás."}],
    uk: [{"term": "AI Agent", "definition": "Нода, яка читає запитання, обирає інструмент і формує відповідь."}, {"term": "Wikipedia", "definition": "Інструмент агента для пошуку інформації в онлайн-енциклопедії."}, {"term": "Simple Memory", "definition": "Нода, яка зберігає останні повідомлення чату, щоб агент розумів уточнювальні запитання."}, {"term": "ID сесії", "definition": "Ідентифікатор, який відокремлює історію одного чату від інших."}],
  },
  "webhook-welcome": {
    en: [
      {
        term: "Webhook node",
        definition:
          "The Webhook node creates a URL that can receive requests and start your n8n workflow.",
      },
      {
        term: "GET requests",
        definition:
          "GET requests ask a URL to return information. A browser usually sends one when you open a normal web page.",
      },
      {
        term: "query parameter",
        definition:
          "A query parameter is extra information added after ? in a URL, such as ?name=Ana.",
      },
    ],
    es: [
      {
        term: "nodo Webhook",
        definition:
          "El nodo Webhook crea una URL que puede recibir peticiones e iniciar tu workflow de n8n.",
      },
      {
        term: "peticiones GET",
        definition:
          "Las peticiones GET solicitan información a una URL. El navegador suele enviar una al abrir una página web normal.",
      },
      {
        term: "parámetro de consulta",
        definition:
          "Un parámetro de consulta es información adicional que se añade después de ? en una URL, como ?name=Ana.",
      },
    ],
  },
  "valencia-telegram-bot": {
    en: [
      {
        term: "Telegram bot",
        definition:
          "A Telegram bot is an automated Telegram account that can receive messages and send replies.",
      },
      {
        term: "Telegram",
        definition:
          "Telegram is a messaging app that works on phones, computers, and the web.",
      },
      {
        term: "Valencia Open Data",
        definition:
          "Valencia Open Data is the website where Valencia City Council publishes public information for people and apps to reuse.",
      },
      {
        term: "air-quality status",
        definition:
          "The overall air-quality label reported by the station, such as Buena, Razonablemente Buena, Regular, or Desfavorable.",
      },
      {
        term: "NO₂",
        definition:
          "Nitrogen dioxide (NO₂) is a gas produced mainly by road traffic and other fuel combustion. This value is reported in micrograms per cubic metre (µg/m³).",
      },
      {
        term: "PM10",
        definition:
          "PM10 means airborne particles that are 10 micrometres wide or smaller. This value is reported in micrograms per cubic metre (µg/m³).",
      },
      {
        term: "PM2.5",
        definition:
          "PM2.5 means fine airborne particles that are 2.5 micrometres wide or smaller. They can travel deeper into the lungs than PM10 and are reported in µg/m³.",
      },
      {
        term: "calidad_ambiental status",
        definition:
          "The calidad_ambiental field is the station's overall air-quality category, such as Buena, Razonablemente Buena, Regular, or Desfavorable.",
      },
    ],
    es: [
      {
        term: "bot de Telegram",
        definition:
          "Un bot de Telegram es una cuenta automatizada de Telegram que puede recibir mensajes y enviar respuestas.",
      },
      {
        term: "Telegram",
        definition:
          "Telegram es una aplicación de mensajería que funciona en teléfonos, ordenadores y la web.",
      },
      {
        term: "Valencia Open Data",
        definition:
          "Valencia Open Data es el sitio donde el Ayuntamiento de Valencia publica información pública que las personas y las aplicaciones pueden reutilizar.",
      },
      {
        term: "estado de calidad del aire",
        definition:
          "La etiqueta general de calidad del aire que informa la estación, como Buena, Razonablemente Buena, Regular o Desfavorable.",
      },
      {
        term: "NO₂",
        definition:
          "El dióxido de nitrógeno (NO₂) es un gas producido principalmente por el tráfico y otras combustiones. Este valor se expresa en microgramos por metro cúbico (µg/m³).",
      },
      {
        term: "PM10",
        definition:
          "PM10 son partículas suspendidas en el aire de 10 micrómetros o menos. Este valor se expresa en microgramos por metro cúbico (µg/m³).",
      },
      {
        term: "PM2.5",
        definition:
          "PM2.5 son partículas finas suspendidas en el aire de 2,5 micrómetros o menos. Pueden penetrar más profundamente en los pulmones que PM10 y se expresan en µg/m³.",
      },
      {
        term: "estado calidad_ambiental",
        definition:
          "El campo calidad_ambiental es la categoría general de calidad del aire de la estación, como Buena, Razonablemente Buena, Regular o Desfavorable.",
      },
    ],
    uk: [
      {
        term: "Telegram-бот",
        definition:
          "Telegram-бот – це автоматизований обліковий запис Telegram, який може отримувати повідомлення та надсилати відповіді.",
      },
      {
        term: "Telegram",
        definition:
          "Telegram – це месенджер, який працює на телефонах, комп’ютерах і у веббраузері.",
      },
      {
        term: "Valencia Open Data",
        definition:
          "Valencia Open Data – це сайт, на якому міська рада Валенсії публікує відкриту інформацію для повторного використання людьми й застосунками.",
      },
      {
        term: "стан якості повітря",
        definition:
          "Загальна категорія якості повітря, яку повідомляє станція, наприклад Buena, Razonablemente Buena, Regular або Desfavorable.",
      },
      {
        term: "NO₂",
        definition:
          "Діоксид азоту (NO₂) – це газ, який утворюється переважно через дорожній рух та інше спалювання палива. Значення подається в мікрограмах на кубічний метр (мкг/м³).",
      },
      {
        term: "PM10",
        definition:
          "PM10 – це зважені в повітрі частинки діаметром не більше 10 мікрометрів. Значення подається в мікрограмах на кубічний метр (мкг/м³).",
      },
      {
        term: "PM2.5",
        definition:
          "PM2.5 – це дрібні зважені частинки діаметром не більше 2,5 мікрометра. Вони можуть проникати в легені глибше за PM10; значення подається в мкг/м³.",
      },
      {
        term: "статус calidad_ambiental",
        definition:
          "Поле calidad_ambiental містить загальну категорію якості повітря на станції, наприклад Buena, Razonablemente Buena, Regular або Desfavorable.",
      },
    ],
  },
  "trello-morning-brief": {
    en: [
      { term: "P0", definition: "P0 means the highest priority; P1 means high priority. Start the card title with the prefix, for example P0 Fix sign-in or P1: Prepare slides. A space, colon, or hyphen separates the prefix from the title. Both come before unprefixed cards in the bonus." },
      { term: "P1", definition: "P0 means the highest priority; P1 means high priority. Start the card title with the prefix, for example P0 Fix sign-in or P1: Prepare slides. A space, colon, or hyphen separates the prefix from the title. Both come before unprefixed cards in the bonus." },
    ],
    es: [
      { term: "P0", definition: "P0 indica la prioridad máxima; P1, una prioridad alta. Pon el prefijo al principio del título, por ejemplo P0 Arreglar el acceso o P1: Preparar diapositivas. Sepáralo con espacio, dos puntos o guion. Ambos van antes de las tarjetas sin prefijo en el bonus." },
      { term: "P1", definition: "P0 indica la prioridad máxima; P1, una prioridad alta. Pon el prefijo al principio del título, por ejemplo P0 Arreglar el acceso o P1: Preparar diapositivas. Sepáralo con espacio, dos puntos o guion. Ambos van antes de las tarjetas sin prefijo en el bonus." },
    ],
    uk: [
      { term: "P0", definition: "P0 означає найвищий пріоритет, P1 — високий. Почніть назву з префікса, наприклад P0 Виправити вхід або P1: Підготувати слайди. Відокремте його пробілом, двокрапкою чи дефісом. У додатковому завданні обидва мають перевагу над картками без префікса." },
      { term: "P1", definition: "P0 означає найвищий пріоритет, P1 — високий. Почніть назву з префікса, наприклад P0 Виправити вхід або P1: Підготувати слайди. Відокремте його пробілом, двокрапкою чи дефісом. У додатковому завданні обидва мають перевагу над картками без префікса." },
    ],
  },
  "valencia-citizen-request-classifier": {
    en: [
      {
        term: "responsible team",
        definition:
          "For this exercise, simulate three city service contacts: sanitation and parks for waste or green spaces; local police for noise; public works/service desk for roads and other or unclear requests. Use your own personal email addresses or aliases for all three.",
      },
      {
        term: "AI model",
        definition:
          "An AI model is software that interprets the request and returns the category, priority, and summary required by this workflow.",
      },
    ],
    es: [
      {
        term: "equipo responsable",
        definition:
          "Para este ejercicio, simula tres contactos municipales: limpieza y parques para residuos o zonas verdes; policía local para ruido; obras públicas/atención ciudadana para vías públicas y solicitudes de tipo other o poco claras. Usa tus propias direcciones de email o alias para los tres.",
      },
      {
        term: "modelo de IA",
        definition:
          "Un modelo de IA es un software que interpreta la solicitud y devuelve la categoría, la prioridad y el resumen requeridos por este workflow.",
      },
    ],
    uk: [
      {
        term: "відповідальній команді",
        definition:
          "Для цієї вправи змоделюйте три міські контакти: служба прибирання та парків для сміття й зелених зон; місцева поліція для шуму; служба благоустрою/підтримки для доріг та інших або неясних звернень. Для всіх трьох використайте власні електронні адреси або псевдоніми.",
      },
      {
        term: "модель ШІ",
        definition:
          "Модель ШІ – це програмне забезпечення, яке інтерпретує звернення й повертає потрібні воркфлоу категорію, пріоритет і короткий опис.",
      },
    ],
  },
  "alien-translator": {
    en: [
      {
        term: "AI Assistant",
        definition:
          "The n8n AI Assistant is a chat-based builder that creates and changes workflows from natural-language prompts.",
      },
      {
        term: "confidence score",
        definition:
          "A confidence score is a number from 0 to 100 showing how much of the message the supplied dictionary can explain.",
      },
      {
        term: "back-translation",
        definition:
          "A back-translation converts the English result into the alien language again so it can be compared with the original message.",
      },
      {
        term: "Chat Trigger",
        definition:
          "The Chat Trigger node starts the workflow whenever someone sends a message in the n8n chat.",
      },
      {
        term: "structured response",
        definition:
          "A structured response always returns the same named fields and data types so other workflow steps can use them reliably.",
      },
      {
        term: "unknownWords",
        definition:
          "unknownWords is the output list containing every input word that does not appear in the supplied dictionary.",
      },
    ],
    es: [
      {
        term: "AI Assistant",
        definition:
          "AI Assistant de n8n es un constructor por chat que crea y modifica workflows a partir de instrucciones en lenguaje natural.",
      },
      {
        term: "puntuación de confianza",
        definition:
          "La puntuación de confianza es un número de 0 a 100 que indica cuánto del mensaje puede explicar el diccionario suministrado.",
      },
      {
        term: "traducción inversa",
        definition:
          "Una traducción inversa convierte el resultado en inglés otra vez al idioma alienígena para compararlo con el mensaje original.",
      },
      {
        term: "Chat Trigger",
        definition:
          "El nodo Chat Trigger inicia el workflow cuando alguien envía un mensaje en el chat de n8n.",
      },
      {
        term: "respuesta estructurada",
        definition:
          "Una respuesta estructurada siempre devuelve los mismos campos y tipos de datos para que otros pasos puedan utilizarlos de forma fiable.",
      },
      {
        term: "unknownWords",
        definition:
          "unknownWords es la lista de salida que contiene cada palabra del mensaje que no aparece en el diccionario suministrado.",
      },
    ],
    uk: [
      {
        term: "AI Assistant",
        definition:
          "AI Assistant у n8n – це чат-конструктор, який створює та змінює воркфлоу за інструкціями природною мовою.",
      },
      {
        term: "оцінку впевненості",
        definition:
          "Оцінка впевненості – це число від 0 до 100, яке показує, яку частину повідомлення можна пояснити за допомогою наданого словника.",
      },
      {
        term: "зворотного перекладу",
        definition:
          "Зворотний переклад перетворює англійський результат назад на інопланетну мову, щоб порівняти його з оригіналом.",
      },
      {
        term: "Chat Trigger",
        definition:
          "Нода Chat Trigger запускає воркфлоу, коли хтось надсилає повідомлення в чаті n8n.",
      },
      {
        term: "структуровану відповідь",
        definition:
          "Структурована відповідь завжди повертає однакові іменовані поля й типи даних, щоб наступні кроки могли надійно їх використати.",
      },
      {
        term: "unknownWords",
        definition:
          "unknownWords – це список у результаті, що містить кожне слово повідомлення, якого немає в наданому словнику.",
      },
    ],
  },
  "idealista-morning-brief": {
    en: [
      {
        term: "Firecrawl",
        definition:
          "Firecrawl is a service that reads a permitted web page and returns its content in a format an n8n workflow can use.",
      },
      {
        term: "web scraping",
        definition:
          "Web scraping means reading information from a web page automatically. Use it only where the site owner allows it.",
      },
      {
        term: "structured data",
        definition:
          "Structured data uses predictable fields such as listingId, price, and bedrooms so later nodes can filter it reliably.",
      },
      {
        term: "listing ID",
        definition:
          "A listing ID is the stable unique value used to recognize the same apartment across different workflow runs.",
      },
      {
        term: "cross-run deduplication",
        definition:
          "Cross-run deduplication remembers values from earlier workflow executions so the same apartment is not sent again.",
      },
    ],
    es: [
      {
        term: "Firecrawl",
        definition:
          "Firecrawl es un servicio que lee una página web permitida y devuelve su contenido en un formato que un workflow de n8n puede utilizar.",
      },
      {
        term: "extracción web",
        definition:
          "La extracción web consiste en leer automáticamente la información de una página. Úsala solo cuando el propietario del sitio lo permita.",
      },
      {
        term: "datos estructurados",
        definition:
          "Los datos estructurados usan campos predecibles como listingId, price y bedrooms para que los siguientes nodos puedan filtrarlos de forma fiable.",
      },
      {
        term: "ID de anuncio",
        definition:
          "Un ID de anuncio es el valor único y estable que permite reconocer el mismo piso en distintas ejecuciones del workflow.",
      },
      {
        term: "eliminación de duplicados entre ejecuciones",
        definition:
          "La eliminación de duplicados entre ejecuciones recuerda valores anteriores para que el mismo piso no se envíe otra vez.",
      },
    ],
    uk: [
      {
        term: "Firecrawl",
        definition:
          "Firecrawl – це сервіс, який читає дозволену вебсторінку та повертає її вміст у форматі, придатному для воркфлоу n8n.",
      },
      {
        term: "вебзбирання",
        definition:
          "Вебзбирання означає автоматичне читання інформації з вебсторінки. Використовуйте його лише з дозволу власника сайту.",
      },
      {
        term: "структуровані дані",
        definition:
          "Структуровані дані мають передбачувані поля, як-от listingId, price і bedrooms, тому наступні ноди можуть надійно їх фільтрувати.",
      },
      {
        term: "ID оголошення",
        definition:
          "ID оголошення – це стабільне унікальне значення, за яким те саме помешкання розпізнається в різних запусках воркфлоу.",
      },
      {
        term: "усунення дублікатів між запусками",
        definition:
          "Усунення дублікатів між запусками запам’ятовує попередні значення, щоб не надсилати те саме помешкання повторно.",
      },
    ],
  },
  "google-drive-rag": {
    en: [
      {
        term: "RAG assistant",
        definition:
          "A RAG assistant searches a selected knowledge source for relevant passages before an AI model writes its answer.",
      },
      {
        term: "grounded chat assistant",
        definition:
          "A grounded assistant limits its factual claims to evidence found in the supplied documents instead of relying on general model knowledge.",
      },
      {
        term: "indexes their chunks",
        definition:
          "Indexing chunks means splitting documents into smaller passages and storing searchable meaning-based representations of them.",
      },
      {
        term: "metadata",
        definition:
          "Metadata is identifying information stored beside each passage, such as its source filename, Drive ID, and link.",
      },
      {
        term: "retrieval tool",
        definition:
          "The retrieval tool searches the stored document passages for the ones most closely related to the user's question.",
      },
    ],
    es: [
      {
        term: "asistente RAG",
        definition:
          "Un asistente RAG busca pasajes relevantes en una fuente de conocimiento seleccionada antes de que un modelo de IA redacte la respuesta.",
      },
      {
        term: "asistente fundamentado",
        definition:
          "Un asistente fundamentado limita sus afirmaciones a las pruebas encontradas en los documentos proporcionados, no al conocimiento general del modelo.",
      },
      {
        term: "indexa sus fragmentos",
        definition:
          "Indexar fragmentos significa dividir los documentos en pasajes más pequeños y guardar representaciones de su significado que se puedan buscar.",
      },
      {
        term: "metadatos",
        definition:
          "Los metadatos son datos de identificación guardados junto a cada pasaje, como el nombre del archivo, el ID de Drive y su enlace.",
      },
      {
        term: "herramienta de búsqueda",
        definition:
          "La herramienta de búsqueda encuentra en los pasajes almacenados los que más se relacionan con la pregunta de la persona usuaria.",
      },
    ],
    uk: [
      {
        term: "RAG-асистента",
        definition:
          "RAG-асистент шукає релевантні уривки у вибраному джерелі знань, перш ніж модель ШІ сформує відповідь.",
      },
      {
        term: "обґрунтованого асистента",
        definition:
          "Обґрунтований асистент обмежує фактичні твердження доказами з наданих документів і не покладається на загальні знання моделі.",
      },
      {
        term: "індексує їхні фрагменти",
        definition:
          "Індексування фрагментів означає поділ документів на менші уривки та збереження придатних до пошуку представлень їхнього змісту.",
      },
      {
        term: "метадані",
        definition:
          "Метадані – це ідентифікаційні відомості поряд з кожним уривком, наприклад назва файла, Drive ID і посилання.",
      },
      {
        term: "інструмент пошуку",
        definition:
          "Інструмент пошуку знаходить серед збережених уривків ті, що найбільше відповідають запитанню користувача.",
      },
    ],
  },
  "mercadona-mcp-assistant": {
    en: [
      {
        term: "MCP server",
        definition:
          "An MCP server publishes a named set of tools that an AI client can discover and call through one connection.",
      },
      {
        term: "external client",
        definition:
          "An external client is another AI application, such as ChatGPT or Claude, connected to the workflow's published MCP address.",
      },
      {
        term: "unit price",
        definition:
          "The unit price is the current catalog price for one package or sellable unit, not the comparison price per kilogram or litre.",
      },
      {
        term: "live catalog tools",
        definition:
          "These tools read the current category and product records directly from the catalog endpoints while the workflow runs.",
      },
    ],
    es: [
      {
        term: "servidor MCP",
        definition:
          "Un servidor MCP publica un conjunto de herramientas con nombre para que un cliente de IA pueda descubrirlas y utilizarlas mediante una sola conexión.",
      },
      {
        term: "cliente externo",
        definition:
          "Un cliente externo es otra aplicación de IA, como ChatGPT o Claude, conectada a la dirección MCP publicada por el workflow.",
      },
      {
        term: "precio unitario",
        definition:
          "El precio unitario es el precio actual de un envase o unidad vendible, no el precio comparativo por kilogramo o litro.",
      },
      {
        term: "herramientas del catálogo activo",
        definition:
          "Estas herramientas leen los registros actuales de categorías y productos directamente desde los endpoints mientras se ejecuta el workflow.",
      },
    ],
    uk: [
      {
        term: "MCP-сервер",
        definition:
          "MCP-сервер публікує набір іменованих інструментів, які ШІ-клієнт може знайти й викликати через одне з’єднання.",
      },
      {
        term: "зовнішній клієнт",
        definition:
          "Зовнішній клієнт – це інший ШІ-застосунок, наприклад ChatGPT або Claude, підключений до опублікованої MCP-адреси воркфлоу.",
      },
      {
        term: "цінами за одиницю",
        definition:
          "Ціна за одиницю – це актуальна ціна однієї упаковки або товарної одиниці, а не порівняльна ціна за кілограм чи літр.",
      },
      {
        term: "інструментами активного каталогу",
        definition:
          "Ці інструменти читають актуальні записи категорій і товарів безпосередньо з endpoints під час виконання воркфлоу.",
      },
    ],
  },
};

