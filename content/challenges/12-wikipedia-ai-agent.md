---
number: 12
slug: wikipedia-ai-agent
collection: more
difficulty: beginner
time: 15–25 min
complexity: 2
color: #fffdf6
ink: #1b2427
---

# Solution Data

## Core Workflow JSON (without bonus)

```json
{
  "name": "Your First Wikipedia Agent – Core",
  "nodes": [
    {
      "id": "88ea7a90-49f7-45dd-82ba-cdeeafde4700",
      "name": "Chat Trigger",
      "type": "@n8n/n8n-nodes-langchain.chatTrigger",
      "typeVersion": 1.5,
      "parameters": {
        "public": false,
        "options": {
          "responseMode": "lastNode"
        }
      },
      "position": [
        0,
        0
      ],
      "webhookId": "b5858999-9fbf-4f4b-afa5-ac264d090f0d"
    },
    {
      "id": "a102a0dd-78b0-4d24-b8bb-5e46759c2b36",
      "name": "AI Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3.1,
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.chatInput }}",
        "options": {
          "systemMessage": "You are a helpful Wikipedia research assistant. Use the Wikipedia tool to look up factual questions before answering. Reply briefly in the user’s language using the retrieved information. If results do not answer the question, say what is missing rather than inventing facts. Use available conversation context to resolve follow-up questions; if the topic is unclear, ask for clarification. Distinguish a city’s first documented mention from its founding when the evidence does not establish an exact founding date."
        }
      },
      "position": [
        300,
        0
      ]
    },
    {
      "id": "e1d64595-f8d5-46cc-ba5d-248c69b18938",
      "name": "OpenRouter Chat Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenRouter",
      "typeVersion": 1,
      "parameters": {
        "model": "openrouter/free",
        "options": {
          "temperature": 0.1
        }
      },
      "position": [
        200,
        240
      ]
    },
    {
      "id": "c37085dc-73ab-4603-8f13-0bc26027cd1d",
      "name": "Wikipedia",
      "type": "@n8n/n8n-nodes-langchain.toolWikipedia",
      "typeVersion": 1,
      "parameters": {},
      "position": [
        540,
        240
      ]
    }
  ],
  "connections": {
    "Chat Trigger": {
      "main": [
        [
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenRouter Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Wikipedia": {
      "ai_tool": [
        [
          {
            "node": "AI Agent",
            "type": "ai_tool",
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
  "pinData": {}
}
```

## Bonus Workflow JSON

```json
{
  "name": "Your First Wikipedia Agent – Bonus",
  "nodes": [
    {
      "id": "88ea7a90-49f7-45dd-82ba-cdeeafde4700",
      "name": "Chat Trigger",
      "type": "@n8n/n8n-nodes-langchain.chatTrigger",
      "typeVersion": 1.5,
      "parameters": {
        "public": false,
        "options": {
          "responseMode": "lastNode"
        }
      },
      "position": [
        0,
        0
      ],
      "webhookId": "b5858999-9fbf-4f4b-afa5-ac264d090f0d"
    },
    {
      "id": "a102a0dd-78b0-4d24-b8bb-5e46759c2b36",
      "name": "AI Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3.1,
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.chatInput }}",
        "options": {
          "systemMessage": "You are a helpful Wikipedia research assistant. Use the Wikipedia tool to look up factual questions before answering. Reply briefly in the user’s language using the retrieved information. If results do not answer the question, say what is missing rather than inventing facts. Use available conversation context to resolve follow-up questions; if the topic is unclear, ask for clarification. Distinguish a city’s first documented mention from its founding when the evidence does not establish an exact founding date."
        }
      },
      "position": [
        300,
        0
      ]
    },
    {
      "id": "e1d64595-f8d5-46cc-ba5d-248c69b18938",
      "name": "OpenRouter Chat Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenRouter",
      "typeVersion": 1,
      "parameters": {
        "model": "openrouter/free",
        "options": {
          "temperature": 0.1
        }
      },
      "position": [
        200,
        240
      ]
    },
    {
      "id": "c37085dc-73ab-4603-8f13-0bc26027cd1d",
      "name": "Wikipedia",
      "type": "@n8n/n8n-nodes-langchain.toolWikipedia",
      "typeVersion": 1,
      "parameters": {},
      "position": [
        540,
        240
      ]
    },
    {
      "id": "b2d962cd-9ad6-482e-9e3b-28810f73c792",
      "name": "Simple Memory",
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1.3,
      "parameters": {
        "sessionIdType": "customKey",
        "sessionKey": "={{ $json.sessionId }}",
        "contextWindowLength": 5
      },
      "position": [
        370,
        240
      ]
    }
  ],
  "connections": {
    "Chat Trigger": {
      "main": [
        [
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenRouter Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Wikipedia": {
      "ai_tool": [
        [
          {
            "node": "AI Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "Simple Memory": {
      "ai_memory": [
        [
          {
            "node": "AI Agent",
            "type": "ai_memory",
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
  "pinData": {}
}
```

# English

## Title
Your First AI Agent

## Summary
Build an AI Agent that looks up Wikipedia to answer your questions.

## Concept
AI agents, tools, and conversational memory

## Task
Create a chat workflow with AI Agent and connect Wikipedia as its tool. Ask a question such as “Tell me the history of Berlin.” The agent should look up Wikipedia and reply with a short, useful answer based on what it finds.

## Bonus Task
Connect Simple Memory so the agent remembers the conversation. Ask “Tell me the history of Berlin”, then “So when was it founded?” in the same chat. The agent should understand that “it” means Berlin without you repeating the city name.

## Scenario
- Explore the history of a city before a trip.
- Ask an assistant to explain a topic using Wikipedia.
- Learn how adding memory lets an agent understand follow-up questions.

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace and create a new workflow.
- [Sign up for OpenRouter](https://openrouter.ai/), [create an API key](https://openrouter.ai/settings/keys), and save it in an [n8n OpenRouter credential](https://docs.n8n.io/integrations/builtin/credentials/openrouter/). Choose a model that supports tool calling; you can try the free models available to your account.
- Wikipedia and Simple Memory need no separate account or API key. Use n8n’s built-in chat to test the workflow.

## Requirements
- A question sent in n8n chat receives a useful answer based on a Wikipedia lookup.
- The execution shows that AI Agent used the Wikipedia tool. If it cannot find an answer, it says so instead of inventing one.
- Bonus: the Berlin follow-up works in the same chat, while a new chat does not inherit the previous conversation.

## Tips
- Start with Chat Trigger, which opens a chat for testing and starts the workflow when you send a message.
- Add AI Agent after Chat Trigger and use the incoming chatInput as its prompt. This is the node that decides when to use Wikipedia.
- Attach OpenRouter Chat Model to the agent’s Chat Model connector, then attach Wikipedia to its Tool connector. Ask the agent to use Wikipedia for factual answers and keep its replies short.
- Open the chat, ask about Berlin, and inspect the execution to see the Wikipedia tool call. No separate parser or routing nodes are needed.
- For the bonus, attach Simple Memory to the agent’s Memory connector. Use the session ID from Chat Trigger and a context window of at least five interactions. Ask the two Berlin questions in the same chat, then start a new chat to check that the context stays separate.

## Nodes
- Chat Trigger
- AI Agent
- OpenRouter Chat Model
- Wikipedia
- Simple Memory

## Glossary
- AI Agent: The node that reads your question, chooses a tool, and writes the answer.
- Wikipedia: The agent’s tool for looking up information in the online encyclopedia.
- Simple Memory: A node that keeps recent messages from the same chat so the agent can understand follow-up questions.
- session ID: An identifier that keeps one chat’s history separate from other chats.

# Spanish

## Title
Tu primer agente de IA

## Summary
Crea un AI Agent que consulte Wikipedia para responder a tus preguntas.

## Concept
Agentes de IA, herramientas y memoria de conversación

## Task
Crea un workflow de chat con AI Agent y conecta Wikipedia como herramienta. Haz una pregunta como «Cuéntame la historia de Berlín». El agente debe consultar Wikipedia y responder de forma breve y útil basándose en lo que encuentre.

## Bonus Task
Conecta Simple Memory para que el agente recuerde la conversación. Pregunta «Cuéntame la historia de Berlín» y después «Entonces, ¿cuándo se fundó?» en el mismo chat. El agente debe entender que te refieres a Berlín sin repetir el nombre.

## Scenario
- Explora la historia de una ciudad antes de viajar.
- Pide a un asistente que explique un tema usando Wikipedia.
- Descubre cómo la memoria ayuda al agente a entender preguntas de seguimiento.

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio n8n y crea un workflow nuevo.
- [Regístrate en OpenRouter](https://openrouter.ai/), [crea una clave de API](https://openrouter.ai/settings/keys) y guárdala en una [credencial de OpenRouter de n8n](https://docs.n8n.io/integrations/builtin/credentials/openrouter/). Elige un modelo compatible con herramientas; puedes probar los modelos gratuitos disponibles en tu cuenta.
- Wikipedia y Simple Memory no necesitan cuentas ni claves de API adicionales. Usa el chat integrado de n8n para las pruebas.

## Requirements
- Una pregunta en el chat de n8n recibe una respuesta útil basada en una consulta a Wikipedia.
- La ejecución muestra que AI Agent usó Wikipedia. Si no encuentra la respuesta, lo indica en lugar de inventarla.
- Bonus: la segunda pregunta sobre Berlín funciona en el mismo chat y un chat nuevo no hereda la conversación anterior.

## Tips
- Empieza con Chat Trigger, que abre un chat de prueba e inicia el workflow al enviar un mensaje.
- Añade AI Agent después de Chat Trigger y usa chatInput como prompt. Este nodo decide cuándo consultar Wikipedia.
- Conecta OpenRouter Chat Model al conector Chat Model y Wikipedia al conector Tool del agente. Pídele que consulte Wikipedia para respuestas factuales y sea breve.
- Abre el chat, pregunta por Berlín y revisa la ejecución para ver la llamada a Wikipedia. No hacen falta parsers ni nodos de enrutamiento.
- Para el bonus, conecta Simple Memory al conector Memory del agente. Usa el ID de sesión de Chat Trigger y una ventana de al menos cinco interacciones. Haz las dos preguntas en el mismo chat y abre otro para comprobar que el contexto se mantiene separado.

## Nodes
- Chat Trigger
- AI Agent
- OpenRouter Chat Model
- Wikipedia
- Simple Memory

## Glossary
- AI Agent: El nodo que lee tu pregunta, elige una herramienta y escribe la respuesta.
- Wikipedia: La herramienta del agente para buscar información en la enciclopedia en línea.
- Simple Memory: Un nodo que conserva mensajes recientes del mismo chat para entender preguntas de seguimiento.
- ID de sesión: Un identificador que separa el historial de un chat del de los demás.

# Ukrainian

## Title
Твій перший ШІ-агент

## Summary
Створи AI Agent, який шукає відповіді на твої запитання у Вікіпедії.

## Concept
Агенти ШІ, інструменти й пам’ять розмови

## Task
Створи чат-воркфлоу з AI Agent і підключи Wikipedia як його інструмент. Постав запитання, наприклад «Розкажи історію Берліна». Агент має звернутися до Вікіпедії та дати коротку й корисну відповідь на основі знайденого.

## Bonus Task
Підключи Simple Memory, щоб агент пам’ятав розмову. Запитай «Розкажи історію Берліна», а потім «То коли його заснували?» у тому самому чаті. Агент має зрозуміти, що йдеться про Берлін, без повторення назви міста.

## Scenario
- Дізнайся історію міста перед подорожжю.
- Попроси асистента пояснити тему за матеріалами Вікіпедії.
- Зрозумій, як пам’ять допомагає агенту відповідати на уточнювальні запитання.

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n і створи новий воркфлоу.
- [Зареєструйся в OpenRouter](https://openrouter.ai/), [створи API-ключ](https://openrouter.ai/settings/keys) і збережи його в [облікових даних OpenRouter у n8n](https://docs.n8n.io/integrations/builtin/credentials/openrouter/). Вибери модель із підтримкою інструментів; можна спробувати безкоштовні моделі, доступні у твоєму акаунті.
- Wikipedia та Simple Memory не потребують окремих акаунтів чи API-ключів. Тестуй воркфлоу у вбудованому чаті n8n.

## Requirements
- Запитання в чаті n8n отримує корисну відповідь на основі пошуку у Вікіпедії.
- В історії виконання видно, що AI Agent використав Wikipedia. Якщо відповіді немає, агент повідомляє про це, а не вигадує її.
- Бонус: уточнення про Берлін працює в тому самому чаті, а новий чат не успадковує попередню розмову.

## Tips
- Почни з Chat Trigger: він відкриває тестовий чат і запускає воркфлоу після повідомлення.
- Додай AI Agent після Chat Trigger і використай chatInput як запит. Ця нода вирішує, коли звернутися до Wikipedia.
- Підключи OpenRouter Chat Model до роз’єму Chat Model, а Wikipedia — до Tool агента. Попроси агента шукати факти у Вікіпедії та відповідати стисло.
- Відкрий чат, запитай про Берлін і перевір виклик Wikipedia в історії виконання. Окремі парсери чи ноди маршрутизації не потрібні.
- Для бонусу підключи Simple Memory до роз’єму Memory агента. Використай ID сесії з Chat Trigger і вікно щонайменше п’яти взаємодій. Постав два запитання в одному чаті, а потім відкрий новий, щоб перевірити розділення контексту.

## Nodes
- Chat Trigger
- AI Agent
- OpenRouter Chat Model
- Wikipedia
- Simple Memory

## Glossary
- AI Agent: Нода, яка читає запитання, обирає інструмент і формує відповідь.
- Wikipedia: Інструмент агента для пошуку інформації в онлайн-енциклопедії.
- Simple Memory: Нода, яка зберігає останні повідомлення чату, щоб агент розумів уточнювальні запитання.
- ID сесії: Ідентифікатор, який відокремлює історію одного чату від інших.
