---
number: 11
slug: alien-translator
collection: more
difficulty: beginner
time: 15–25 min
complexity: 2
color: #9b83d7
ink: #ffffff
---

# Solution Data

Internal reference for the solution viewer. This section is not displayed on the challenge page.

## Core Workflow JSON (without bonus)

```json
{
  "name": "Challenge 7 – Alien Translator (Core)",
  "nodes": [
    {
      "parameters": {
        "public": false,
        "options": {
          "responseMode": "lastNode"
        }
      },
      "id": "9d43d33f-2f9f-49eb-9a75-ad1f8f68fa20",
      "name": "When chat message received",
      "type": "@n8n/n8n-nodes-langchain.chatTrigger",
      "typeVersion": 1.5,
      "position": [0, 0],
      "webhookId": "8c0e7a94-64bd-45ae-9554-8589839f0ed9",
      "notesInFlow": true,
      "notes": "Receives one space-separated alien message through n8n chat."
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.chatInput }}",
        "hasOutputParser": true,
        "messages": {
          "messageValues": [
            {
              "type": "SystemMessagePromptTemplate",
              "message": "You translate the event alien language into English. The dictionary is authoritative: mira=hello; sava=friend; nalo=from; vela=Valencia; tori=we; luma=arrive; piko=peacefully; nexa=today; doro=bring; fena=music. Match known words case-insensitively and keep their order. Capitalize the first English word and end with a period. Keep each unknown word unchanged inside square brackets. Put every unknown occurrence in unknownWords in its original spelling and order, including duplicates. Set confidence to 100 minus 30 for each unknown occurrence, with a minimum of 0. Return only translation, confidence, and unknownWords. Never invent a definition."
            },
            {
              "type": "HumanMessagePromptTemplate",
              "message": "mira sava nalo vela"
            },
            {
              "type": "AIMessagePromptTemplate",
              "message": "translation: Hello friend from Valencia. | confidence: 100 | unknownWords: empty array"
            }
          ]
        },
        "batching": {}
      },
      "id": "e8d68722-f19b-4242-9bcb-62a0d90ad08a",
      "name": "Translate alien message",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1.9,
      "position": [340, 0],
      "notesInFlow": true,
      "notes": "Uses the fixed dictionary and rules to produce the three-field result."
    },
    {
      "parameters": {
        "model": {
          "__rl": true,
          "value": "gpt-5-mini",
          "mode": "list",
          "cachedResultName": "gpt-5-mini"
        },
        "responsesApiEnabled": true,
        "options": {}
      },
      "id": "c176ba1c-023c-4e8d-8506-f9be70b127c3",
      "name": "OpenAI Chat Model – translation",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.3,
      "position": [260, 240],
      "notesInFlow": true,
      "notes": "Select Gateway credits or an OpenAI credential after import."
    },
    {
      "parameters": {
        "schemaType": "manual",
        "inputSchema": "{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"translation\",\"confidence\",\"unknownWords\"],\"properties\":{\"translation\":{\"type\":\"string\"},\"confidence\":{\"type\":\"integer\",\"minimum\":0,\"maximum\":100},\"unknownWords\":{\"type\":\"array\",\"items\":{\"type\":\"string\"}}}}",
        "autoFix": false
      },
      "id": "677f5cc3-8fa1-4306-856b-c35fe4bccd7e",
      "name": "Translation schema",
      "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
      "typeVersion": 1.3,
      "position": [500, 240],
      "notesInFlow": true,
      "notes": "Requires exactly the translation, confidence, and unknownWords fields."
    }
  ],
  "pinData": {},
  "connections": {
    "When chat message received": {
      "main": [
        [
          {
            "node": "Translate alien message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Chat Model – translation": {
      "ai_languageModel": [
        [
          {
            "node": "Translate alien message",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Translation schema": {
      "ai_outputParser": [
        [
          {
            "node": "Translate alien message",
            "type": "ai_outputParser",
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
  "versionId": "e98f82c0-e19b-4861-b12f-aaf153ee6651",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "tags": []
}
```

## Bonus Workflow JSON

```json
{
  "name": "Challenge 7 – Alien Translator (Bonus)",
  "nodes": [
    {
      "parameters": {
        "public": false,
        "options": {
          "responseMode": "lastNode"
        }
      },
      "id": "279050e3-a2f8-48aa-884d-b3d28791f81a",
      "name": "When chat message received",
      "type": "@n8n/n8n-nodes-langchain.chatTrigger",
      "typeVersion": 1.5,
      "position": [0, -120],
      "webhookId": "cb7ebbf2-a54e-4d89-9758-98080ad17abc",
      "notesInFlow": true,
      "notes": "Receives one space-separated alien message through n8n chat."
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.chatInput }}",
        "hasOutputParser": true,
        "messages": {
          "messageValues": [
            {
              "type": "SystemMessagePromptTemplate",
              "message": "You translate the event alien language into English. The dictionary is authoritative: mira=hello; sava=friend; nalo=from; vela=Valencia; tori=we; luma=arrive; piko=peacefully; nexa=today; doro=bring; fena=music. Match known words case-insensitively and keep their order. Capitalize the first English word and end with a period. Keep each unknown word unchanged inside square brackets. Put every unknown occurrence in unknownWords in its original spelling and order, including duplicates. Set confidence to 100 minus 30 for each unknown occurrence, with a minimum of 0. Return only translation, confidence, and unknownWords. Never invent a definition."
            },
            {
              "type": "HumanMessagePromptTemplate",
              "message": "mira sava nalo vela"
            },
            {
              "type": "AIMessagePromptTemplate",
              "message": "translation: Hello friend from Valencia. | confidence: 100 | unknownWords: empty array"
            }
          ]
        },
        "batching": {}
      },
      "id": "f70c9287-10d7-4867-99a1-d8f6716f90ee",
      "name": "Translate alien message",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1.9,
      "position": [300, -120],
      "notesInFlow": true,
      "notes": "Creates the preliminary translation and deterministic confidence score."
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ 'Original alien message: ' + $('When chat message received').item.json.chatInput + '\\nPreliminary result: ' + JSON.stringify($json) }}",
        "hasOutputParser": true,
        "messages": {
          "messageValues": [
            {
              "type": "SystemMessagePromptTemplate",
              "message": "You independently verify an alien translation. Reverse dictionary: hello=mira; friend=sava; from=nalo; Valencia=vela; we=tori; arrive=luma; peacefully=piko; today=nexa; bring=doro; music=fena. Back-translate the preliminary English translation word by word. Convert bracketed unknown words back to the same unbracketed alien word. Normalize both alien messages by lowercasing, removing punctuation, and collapsing spaces. If they match, keep confidence unchanged. If they differ, subtract exactly 20 from confidence with a minimum of 0. Keep translation and unknownWords unchanged. Return only translation, confidence, and unknownWords."
            }
          ]
        },
        "batching": {}
      },
      "id": "2e746975-af2a-4e17-823b-7b03012f16c6",
      "name": "Verify back-translation",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1.9,
      "position": [680, -120],
      "notesInFlow": true,
      "notes": "Back-translates and applies the fixed 20-point mismatch penalty."
    },
    {
      "parameters": {
        "model": {
          "__rl": true,
          "value": "gpt-5-mini",
          "mode": "list",
          "cachedResultName": "gpt-5-mini"
        },
        "responsesApiEnabled": true,
        "options": {}
      },
      "id": "10ce7eb7-eb86-47d0-8765-10e63e96636f",
      "name": "OpenAI Chat Model – translation",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.3,
      "position": [220, 180],
      "notesInFlow": true,
      "notes": "Select Gateway credits or an OpenAI credential after import."
    },
    {
      "parameters": {
        "model": {
          "__rl": true,
          "value": "gpt-5-mini",
          "mode": "list",
          "cachedResultName": "gpt-5-mini"
        },
        "responsesApiEnabled": true,
        "options": {}
      },
      "id": "e7818366-c466-47ee-91d9-cbceadfb703d",
      "name": "OpenAI Chat Model – verification",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.3,
      "position": [620, 180],
      "notesInFlow": true,
      "notes": "Runs the independent back-translation check."
    },
    {
      "parameters": {
        "schemaType": "manual",
        "inputSchema": "{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"translation\",\"confidence\",\"unknownWords\"],\"properties\":{\"translation\":{\"type\":\"string\"},\"confidence\":{\"type\":\"integer\",\"minimum\":0,\"maximum\":100},\"unknownWords\":{\"type\":\"array\",\"items\":{\"type\":\"string\"}}}}",
        "autoFix": false
      },
      "id": "6d27d340-e53b-4481-b94e-bf8f8cc267a6",
      "name": "Translation schema",
      "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
      "typeVersion": 1.3,
      "position": [420, 180],
      "notesInFlow": true,
      "notes": "Requires the preliminary result to use the three-field schema."
    },
    {
      "parameters": {
        "schemaType": "manual",
        "inputSchema": "{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"translation\",\"confidence\",\"unknownWords\"],\"properties\":{\"translation\":{\"type\":\"string\"},\"confidence\":{\"type\":\"integer\",\"minimum\":0,\"maximum\":100},\"unknownWords\":{\"type\":\"array\",\"items\":{\"type\":\"string\"}}}}",
        "autoFix": false
      },
      "id": "c5866bb5-f0ca-49d8-aaac-ecc89dc7d4d4",
      "name": "Verified translation schema",
      "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
      "typeVersion": 1.3,
      "position": [820, 180],
      "notesInFlow": true,
      "notes": "Keeps the final response in the same three-field schema."
    }
  ],
  "pinData": {},
  "connections": {
    "When chat message received": {
      "main": [
        [
          {
            "node": "Translate alien message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Translate alien message": {
      "main": [
        [
          {
            "node": "Verify back-translation",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Chat Model – translation": {
      "ai_languageModel": [
        [
          {
            "node": "Translate alien message",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Chat Model – verification": {
      "ai_languageModel": [
        [
          {
            "node": "Verify back-translation",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Translation schema": {
      "ai_outputParser": [
        [
          {
            "node": "Translate alien message",
            "type": "ai_outputParser",
            "index": 0
          }
        ]
      ]
    },
    "Verified translation schema": {
      "ai_outputParser": [
        [
          {
            "node": "Verify back-translation",
            "type": "ai_outputParser",
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
  "versionId": "443bc90c-f056-4dd2-bfd0-f33313dac338",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "tags": []
}
```

## Solution Images

- Core dark: ![Alien Translator core workflow on the dark n8n canvas](/solutions/alien-translator-core-dark.png)
- Core light: ![Alien Translator core workflow on the light n8n canvas](/solutions/alien-translator-core-light.png)
- Bonus dark: ![Alien Translator workflow with back-translation verification on the dark n8n canvas](/solutions/alien-translator-bonus-dark.png)
- Bonus light: ![Alien Translator workflow with back-translation verification on the light n8n canvas](/solutions/alien-translator-bonus-light.png)

# English

## Title
Alien Translator

## Summary
Build an alien translator by prompting n8n's AI Assistant while exposing every word the language guide cannot explain.

## Concept
Prompt design, AI-assisted workflow building, and structured AI output

## Scenario
- Friendly visitors have arrived from another planet, but their pocket translator lost its language pack.
- A research team needs to decode field notes while clearly flagging unknown words.
- Event participants want to exchange alien messages without inventing meanings outside the supplied dictionary.

## Task
Help event visitors understand alien messages using the supplied language guide. Return an English translation, a confidence score, and every word the guide cannot explain.

## Bonus Task
Add an independent back-translation check. Translate the English result back into alien and subtract 20 confidence points when the normalized message changes.

## Nodes
- Chat Trigger
- Basic LLM Chain
- OpenAI Chat Model
- Structured Output Parser

## Preparation
- Sign up for [n8n Cloud](/n8n-sign-up) or open an n8n workspace where the preview [AI Assistant](https://docs.n8n.io/build/ways-of-building-workflows/ai-assistant) is enabled.
- Use only AI Assistant prompts to create, add, connect, configure, and revise every node. Do not make those changes manually. You may inspect and test the generated workflow and select credentials when the Assistant asks. Keep the Assistant conversation open for mentor review.
- Use OpenAI Chat Model. On n8n Cloud, select Gateway credits if they are available; otherwise [sign up for OpenAI](https://platform.openai.com/signup) and follow the official [n8n OpenAI credential instructions](https://docs.n8n.io/integrations/builtin/credentials/openai/). Never paste a key or other secret into the Assistant chat.
- Open the event's [alien language guide](https://github.com/itspoma/n8n-challenges/blob/main/public/fixtures/alien-language-guide.md), which contains the authoritative dictionary, grammar rules, confidence formula, and official test messages.

## Requirements
- Every Chat Trigger message returns a structured response containing only translation as an English string, confidence as an integer from 0 to 100, and unknownWords as an array of strings.
- For "mira sava nalo vela", return translation "Hello friend from Valencia.", confidence 100, and an empty unknownWords array.
- For "mira zorb nalo vela", return translation "Hello [zorb] from Valencia.", confidence 70, and unknownWords containing exactly "zorb".

## Tips
- Chat Trigger – ask AI Assistant to start the workflow when a chat message arrives and return the final node's result. This gives the translator its incoming message.
- Basic LLM Chain – ask AI Assistant to connect the incoming chatInput, put the complete dictionary and translation rules in the system instructions, and treat the dictionary as authoritative.
- OpenAI Chat Model – ask AI Assistant to connect it to the translation chain, then select Gateway credits or your credential through the credential card instead of pasting a secret into chat.
- Structured Output Parser – ask AI Assistant to require translation as a string, confidence as an integer from 0 to 100, and unknownWords as an array of strings, with no extra fields.
- Basic LLM Chain – for the bonus, ask AI Assistant to add a second chain with its own OpenAI Chat Model and Structured Output Parser, apply the 20-point back-translation penalty, and test both official messages. If a test fails, ask the Assistant to fix it without manually editing nodes.

# Spanish

## Title
Traductor alienígena

## Summary
Construye un traductor alienígena mediante prompts para AI Assistant de n8n y muestra cada palabra que la guía no puede explicar.

## Concept
Diseño de prompts, construcción de workflows asistida por IA y salida estructurada de IA

## Scenario
- Unas visitas amistosas han llegado de otro planeta, pero su traductor ha perdido el paquete de idioma.
- Un equipo de investigación necesita descifrar notas de campo indicando claramente las palabras desconocidas.
- Las personas del evento quieren intercambiar mensajes alienígenas sin inventar significados fuera del diccionario suministrado.

## Task
Ayuda a las personas del evento a entender mensajes alienígenas con la guía de idioma suministrada. Devuelve una traducción al inglés, una puntuación de confianza y cada palabra que la guía no puede explicar.

## Bonus Task
Añade una comprobación independiente de traducción inversa. Traduce el resultado en inglés de nuevo al idioma alienígena y resta 20 puntos de confianza cuando cambie el mensaje normalizado.

## Nodes
- Chat Trigger
- Basic LLM Chain
- OpenAI Chat Model
- Structured Output Parser

## Preparation
- Regístrate en [n8n Cloud](/n8n-sign-up) o abre un espacio de trabajo de n8n donde esté habilitado [AI Assistant](https://docs.n8n.io/build/ways-of-building-workflows/ai-assistant), que actualmente es una función en preview.
- Usa únicamente prompts para AI Assistant al crear, añadir, conectar, configurar y modificar cada nodo. No hagas esos cambios manualmente. Puedes inspeccionar y probar el workflow generado y seleccionar credenciales cuando el Assistant las solicite. Mantén abierta la conversación para que pueda revisarla un mentor.
- Usa OpenAI Chat Model. En n8n Cloud, selecciona los créditos de Gateway si están disponibles; de lo contrario, [regístrate en OpenAI](https://platform.openai.com/signup) y sigue las [instrucciones oficiales de n8n para las credenciales de OpenAI](https://docs.n8n.io/integrations/builtin/credentials/openai/). Nunca pegues una clave ni otro secreto en el chat del Assistant.
- Abre la [guía del idioma alienígena](https://github.com/itspoma/n8n-challenges/blob/main/public/fixtures/alien-language-guide.md) del evento, que contiene el diccionario oficial, las reglas gramaticales, la fórmula de confianza y los mensajes de prueba.

## Requirements
- Cada mensaje recibido por Chat Trigger devuelve una respuesta estructurada que solo contiene translation como texto en inglés, confidence como entero de 0 a 100 y unknownWords como lista de textos.
- Para "mira sava nalo vela", devuelve translation "Hello friend from Valencia.", confidence 100 y una lista unknownWords vacía.
- Para "mira zorb nalo vela", devuelve translation "Hello [zorb] from Valencia.", confidence 70 y unknownWords con exactamente "zorb".

## Tips
- Chat Trigger – pide a AI Assistant que inicie el workflow cuando llegue un mensaje de chat y devuelva el resultado del último nodo. Así el traductor recibe el mensaje.
- Basic LLM Chain – pide a AI Assistant que conecte el chatInput entrante, coloque el diccionario completo y las reglas de traducción en las instrucciones del sistema y trate el diccionario como la única referencia válida.
- OpenAI Chat Model – pide a AI Assistant que lo conecte a la cadena de traducción y selecciona después los créditos de Gateway o tu credencial mediante la tarjeta de credenciales, sin pegar secretos en el chat.
- Structured Output Parser – pide a AI Assistant que exija translation como texto, confidence como entero de 0 a 100 y unknownWords como lista de textos, sin campos adicionales.
- Basic LLM Chain – para la tarea extra, pide a AI Assistant que añada una segunda cadena con su propio OpenAI Chat Model y Structured Output Parser, aplique la penalización de 20 puntos y pruebe los dos mensajes oficiales. Si falla una prueba, pide al Assistant que lo corrija sin editar los nodos manualmente.

# Ukrainian

## Title
Перекладач з інопланетної

## Summary
Створіть інопланетний перекладач за допомогою промптів для AI Assistant у n8n і показуйте кожне слово, якого немає в мовному посібнику.

## Concept
Проєктування промптів, створення воркфлоу за допомогою ШІ та структурований результат ШІ

## Scenario
- Дружні гості прибули з іншої планети, але їхній кишеньковий перекладач втратив мовний пакет.
- Дослідницькій команді потрібно розшифровувати польові нотатки, чітко позначаючи невідомі слова.
- Учасники події хочуть обмінюватися інопланетними повідомленнями, не вигадуючи значень поза наданим словником.

## Task
Допоможіть учасникам події зрозуміти інопланетні повідомлення за допомогою наданого мовного посібника. Повертайте англійський переклад, оцінку впевненості та кожне слово, якого посібник не пояснює.

## Bonus Task
Додайте незалежну перевірку зворотного перекладу. Перекладіть англійський результат назад на інопланетну мову та відніміть 20 балів упевненості, якщо нормалізоване повідомлення змінилося.

## Nodes
- Chat Trigger
- Basic LLM Chain
- OpenAI Chat Model
- Structured Output Parser

## Preparation
- Зареєструйтеся в [n8n Cloud](/n8n-sign-up) або відкрийте воркспейс n8n, у якому ввімкнено preview-функцію [AI Assistant](https://docs.n8n.io/build/ways-of-building-workflows/ai-assistant).
- Використовуйте лише промпти для AI Assistant, щоб створювати, додавати, з'єднувати, налаштовувати та змінювати кожну ноду. Не робіть ці зміни вручну. Ви можете переглядати й тестувати створений воркфлоу та вибирати облікові дані, коли Assistant запропонує це. Залиште розмову відкритою для перевірки ментором.
- Використовуйте OpenAI Chat Model. У n8n Cloud виберіть кредити Gateway, якщо вони доступні; інакше [зареєструйтеся в OpenAI](https://platform.openai.com/signup) і виконайте офіційні [інструкції n8n для облікових даних OpenAI](https://docs.n8n.io/integrations/builtin/credentials/openai/). Ніколи не вставляйте ключ або інший секрет у чат Assistant.
- Відкрийте наданий для події [посібник з інопланетної мови](https://github.com/itspoma/n8n-challenges/blob/main/public/fixtures/alien-language-guide.md), який містить офіційний словник, граматичні правила, формулу впевненості й тестові повідомлення.

## Requirements
- Кожне повідомлення, отримане через Chat Trigger, повертає структуровану відповідь лише з полями translation як англійським текстом, confidence як цілим числом від 0 до 100 та unknownWords як списком текстових значень.
- Для "mira sava nalo vela" повертайте translation "Hello friend from Valencia.", confidence 100 і порожній список unknownWords.
- Для "mira zorb nalo vela" повертайте translation "Hello [zorb] from Valencia.", confidence 70 і unknownWords, що містить рівно "zorb".

## Tips
- Chat Trigger – попросіть AI Assistant запускати воркфлоу після надходження повідомлення в чаті та повертати результат останньої ноди. Так перекладач отримує вхідне повідомлення.
- Basic LLM Chain – попросіть AI Assistant підключити вхідне значення chatInput, додати повний словник і правила перекладу до системних інструкцій та вважати словник єдиним авторитетним джерелом.
- OpenAI Chat Model – попросіть AI Assistant підключити її до ланцюжка перекладу, а потім виберіть кредити Gateway або свої облікові дані через картку облікових даних, не вставляючи секрет у чат.
- Structured Output Parser – попросіть AI Assistant вимагати translation як текст, confidence як ціле число від 0 до 100 та unknownWords як список текстових значень без додаткових полів.
- Basic LLM Chain – для додаткового завдання попросіть AI Assistant додати другий ланцюжок із власними OpenAI Chat Model і Structured Output Parser, застосувати штраф 20 балів за зміну зворотного перекладу й перевірити обидва офіційні повідомлення. Якщо тест не пройдено, попросіть Assistant виправити це без ручного редагування нод.

# Indonesian

## Title
Penerjemah Bahasa Alien

## Summary
Bangun penerjemah bahasa alien hanya dengan memberi prompt ke AI Assistant n8n, sambil menandai setiap kata yang tidak ada di panduan bahasanya.

## Concept
Merancang prompt, membangun workflow dibantu AI, dan output AI yang terstruktur

## Scenario
- Ada tamu ramah yang datang dari planet lain, tapi penerjemah saku mereka kehilangan paket bahasanya.
- Tim peneliti perlu memecahkan catatan lapangan sambil menandai dengan jelas kata-kata yang tidak dikenal.
- Peserta acara ingin saling berkirim pesan alien tanpa mengarang arti di luar kamus yang disediakan.

## Task
Bantu tamu acara memahami pesan alien memakai panduan bahasa yang disediakan. Hasilkan terjemahan dalam bahasa Inggris, skor keyakinan, dan setiap kata yang tidak bisa dijelaskan panduan itu.

## Bonus Task
Tambahkan pengecekan terjemahan balik yang berdiri sendiri. Terjemahkan hasil bahasa Inggrisnya kembali ke bahasa alien, lalu kurangi 20 poin keyakinan kalau pesannya berubah setelah dinormalisasi.

## Nodes
- Chat Trigger
- Basic LLM Chain
- OpenAI Chat Model
- Structured Output Parser

## Preparation
- Daftar [n8n Cloud](/n8n-sign-up) atau buka workspace n8n yang sudah mengaktifkan [AI Assistant](https://docs.n8n.io/build/ways-of-building-workflows/ai-assistant) versi preview.
- Pakai prompt ke AI Assistant saja untuk membuat, menambah, menyambungkan, mengatur, dan merevisi setiap node. Jangan lakukan perubahan itu secara manual. Kamu boleh memeriksa dan mencoba workflow hasilnya, serta memilih credential saat Assistant memintanya. Biarkan percakapan dengan Assistant tetap terbuka untuk dicek mentor.
- Pakai OpenAI Chat Model. Di n8n Cloud, pilih Gateway credits kalau tersedia; kalau tidak, [daftar OpenAI](https://platform.openai.com/signup) dan ikuti [petunjuk resmi credential OpenAI di n8n](https://docs.n8n.io/integrations/builtin/credentials/openai/). Jangan pernah menempelkan key atau rahasia lain ke chat Assistant.
- Buka [panduan bahasa alien](https://github.com/itspoma/n8n-challenges/blob/main/public/fixtures/alien-language-guide.md) milik acara ini. Di situ ada kamus resmi, aturan tata bahasa, rumus skor keyakinan, dan pesan uji resminya.

## Requirements
- Setiap pesan dari Chat Trigger mengembalikan respons terstruktur yang hanya berisi translation berupa string bahasa Inggris, confidence berupa bilangan bulat 0 sampai 100, dan unknownWords berupa array string.
- Untuk "mira sava nalo vela", kembalikan translation "Hello friend from Valencia.", confidence 100, dan unknownWords berupa array kosong.
- Untuk "mira zorb nalo vela", kembalikan translation "Hello [zorb] from Valencia.", confidence 70, dan unknownWords yang isinya persis "zorb".

## Tips
- Chat Trigger – minta AI Assistant memulai workflow saat ada pesan chat masuk dan mengembalikan hasil dari node terakhir. Dari sinilah penerjemah menerima pesannya.
- Basic LLM Chain – minta AI Assistant menyambungkan chatInput yang masuk, menaruh kamus lengkap dan aturan penerjemahan di system instructions, dan memperlakukan kamus itu sebagai satu-satunya acuan.
- OpenAI Chat Model – minta AI Assistant menyambungkannya ke chain penerjemah, lalu pilih Gateway credits atau credential-mu lewat kartu credential, bukan dengan menempelkan rahasia ke chat.
- Structured Output Parser – minta AI Assistant mewajibkan translation berupa string, confidence berupa bilangan bulat 0 sampai 100, dan unknownWords berupa array string, tanpa field tambahan.
- Basic LLM Chain – untuk bonus, minta AI Assistant menambahkan chain kedua dengan OpenAI Chat Model dan Structured Output Parser-nya sendiri, menerapkan penalti 20 poin untuk terjemahan balik, dan mencoba kedua pesan resmi. Kalau ada uji yang gagal, minta Assistant memperbaikinya tanpa mengedit node secara manual.
