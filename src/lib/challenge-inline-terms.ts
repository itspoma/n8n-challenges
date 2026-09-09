import type { Locale } from "@/lib/home-copy";

export const additionalInlineTerms: Partial<
  Record<string, Partial<Record<Locale, Array<{ term: string; definition: string }>>>>
> = {
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
  "valencia-citizen-request-classifier": {
    en: [
      {
        term: "AI model",
        definition:
          "An AI model is software that interprets the request and returns the category, priority, and summary required by this workflow.",
      },
      {
        term: "request ID",
        definition:
          "A request ID is the unique n8n execution number used to match the support email with the sender's confirmation.",
      },
    ],
    es: [
      {
        term: "modelo de IA",
        definition:
          "Un modelo de IA es un software que interpreta la solicitud y devuelve la categoría, la prioridad y el resumen requeridos por este workflow.",
      },
      {
        term: "ID de solicitud",
        definition:
          "El ID de solicitud es el número único de ejecución de n8n que permite relacionar el email de soporte con la confirmación a la persona remitente.",
      },
    ],
    uk: [
      {
        term: "модель ШІ",
        definition:
          "Модель ШІ – це програмне забезпечення, яке інтерпретує звернення й повертає потрібні воркфлоу категорію, пріоритет і короткий опис.",
      },
      {
        term: "ID звернення",
        definition:
          "ID звернення – це унікальний номер виконання n8n, який пов’язує лист службі підтримки з підтвердженням для відправника.",
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

