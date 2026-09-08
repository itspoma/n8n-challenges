---
number: 10
slug: mercadona-mcp-assistant
difficulty: advanced
time: 60–75 min
complexity: 5
color: #040506
ink: #ffffff
---

# Solution Data

Internal reference for future solution features. This section is not displayed on the challenge page.

## Core Workflow JSON (without bonus)

```json
{
  "name": "Challenge 10 – Mercadona MCP Shopping Assistant (Core)",
  "nodes": [
    {
      "parameters": {
        "updates": ["message"],
        "additionalFields": {}
      },
      "id": "a18b9f42-0348-42da-8bb5-b3ae88ea0994",
      "name": "Telegram Trigger",
      "type": "n8n-nodes-base.telegramTrigger",
      "typeVersion": 1.3,
      "position": [-760, 0],
      "webhookId": "2cd947a1-2699-4e78-87aa-09b9823fbf70",
      "notesInFlow": true,
      "notes": "Receives the name of a dish from Telegram."
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.message.text }}",
        "options": {
          "systemMessage": "You are a Mercadona dish-shopping assistant. Use only live data returned by the three Mercadona MCP tools; never invent a category, product, availability status, name, or price.\n\nFor every dish request, follow this sequence:\n1. Call get_categories first.\n2. Choose two or three relevant published category IDs from that response. Call get_category once for each chosen ID, one by one.\n3. From those category results, choose four to six essential, published, available, fixed-price products for the dish. Prefer one practical package of each ingredient and avoid duplicates.\n4. Call get_product once for every chosen product ID. Keep only products whose detail result confirms published availability, is_variable_weight is false, and a unit_price exists. Replace any invalid choice using the category results.\n5. Call Calculator exactly once to add the confirmed unit prices for one package of every selected product. Do not calculate the final total mentally.\n\nReturn plain text in the same language as the user. Start with the dish name, then one bullet per product in the format \"Product name – €0.00\", and finish with \"Total – €0.00\". Use two decimal places. Do not expose category IDs or product IDs in the final answer. The MCP tools may be prefixed with the MCP Client node name; identify them by the get_categories, get_category, and get_product suffixes.",
          "maxIterations": 20
        }
      },
      "id": "fb2a39b7-902b-42e7-9747-0d1e5de890c1",
      "name": "Build Mercadona Shopping List",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3.1,
      "position": [-400, 0],
      "notesInFlow": true,
      "notes": "Orchestrates the required catalog calls and formats the final shopping list."
    },
    {
      "parameters": {
        "chatId": "={{ $('Telegram Trigger').first().json.message.chat.id }}",
        "text": "={{ $json.output }}",
        "additionalFields": {"appendAttribution": false}
      },
      "id": "8cb615f8-46fc-4375-9aca-94cd5a55bb94",
      "name": "Reply with Shopping List",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [-40, 0],
      "notesInFlow": true,
      "notes": "Replies in the same Telegram chat with product names, unit prices, and the total."
    },
    {
      "parameters": {
        "model": "openai/gpt-4.1-mini",
        "options": {"temperature": 0.1, "maxTokens": 2000}
      },
      "id": "f056a355-4467-4746-92e3-b1ee86f345f9",
      "name": "OpenRouter Chat Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenRouter",
      "typeVersion": 1,
      "position": [-560, 260],
      "notesInFlow": true,
      "notes": "Uses a tool-capable model with low temperature for repeatable catalog selection."
    },
    {
      "parameters": {
        "endpointUrl": "https://YOUR_N8N_HOST/mcp/mercadona-catalog",
        "serverTransport": "httpStreamable",
        "authentication": "none",
        "include": "all",
        "options": {"timeout": 60000}
      },
      "id": "0650f262-06d2-453d-9a70-876152087f27",
      "name": "Mercadona MCP Client",
      "type": "@n8n/n8n-nodes-langchain.mcpClientTool",
      "typeVersion": 1.4,
      "position": [-340, 260],
      "notesInFlow": true,
      "notes": "Replace YOUR_N8N_HOST with this workflow's published MCP Server Trigger production host."
    },
    {
      "parameters": {},
      "id": "9eaf74a5-52d4-4705-b14c-fbd1e1403c15",
      "name": "Calculator",
      "type": "@n8n/n8n-nodes-langchain.toolCalculator",
      "typeVersion": 1,
      "position": [-100, 260],
      "notesInFlow": true,
      "notes": "Adds the confirmed unit prices without relying on model arithmetic."
    },
    {
      "parameters": {
        "authentication": "none",
        "path": "mercadona-catalog",
        "instructions": "This read-only catalog server exposes exactly three tools. Always call get_categories before get_category. Use an id returned by get_categories as the required get_category id. Use product ids returned by get_category as get_product ids. Treat get_product as authoritative for final names, availability, and prices."
      },
      "id": "43669c98-73a9-4d8c-83eb-810e30cfec61",
      "name": "MCP Server Trigger",
      "type": "@n8n/n8n-nodes-langchain.mcpTrigger",
      "typeVersion": 2.1,
      "position": [300, -120],
      "webhookId": "7aa8079d-17f5-4414-97c1-2c0d3ae85872",
      "notesInFlow": true,
      "notes": "Publishes the three read-only Mercadona catalog tools over Streamable HTTP."
    },
    {
      "parameters": {
        "toolDescription": "get_categories: Fetch the complete live Mercadona category tree. This tool has no input. Call it first for every dish and use only published category IDs from its response.",
        "url": "https://tienda.mercadona.es/api/categories/",
        "options": {},
        "optimizeResponse": true,
        "responseType": "json",
        "fieldsToInclude": "selected",
        "fields": "results.id,results.name,results.categories.id,results.categories.name,results.categories.published"
      },
      "id": "02d05b1e-21e3-4e58-8260-322ec95eec3c",
      "name": "get_categories",
      "type": "n8n-nodes-base.httpRequestTool",
      "typeVersion": 4.5,
      "position": [120, 180],
      "notesInFlow": true,
      "notes": "Fixed GET request. Returns only IDs and names needed for category selection."
    },
    {
      "parameters": {
        "toolDescription": "get_category: Fetch one live Mercadona category and its product summaries. Required input: id, a numeric published category ID returned by get_categories. Never reuse a product ID as this parameter.",
        "url": "=https://tienda.mercadona.es/api/categories/{{ $fromAI('id', 'Numeric category ID returned by get_categories', 'number') }}",
        "options": {},
        "optimizeResponse": true,
        "responseType": "json",
        "fieldsToInclude": "selected",
        "fields": "id,name,categories.id,categories.name,categories.published,categories.products.id,categories.products.display_name,categories.products.published,categories.products.unavailable_from,categories.products.price_instructions.unit_price,categories.products.price_instructions.approx_size"
      },
      "id": "53c00fba-781f-4634-99b7-40be957ae0ee",
      "name": "get_category",
      "type": "n8n-nodes-base.httpRequestTool",
      "typeVersion": 4.5,
      "position": [440, 180],
      "notesInFlow": true,
      "notes": "The AI supplies the required id parameter through $fromAI."
    },
    {
      "parameters": {
        "toolDescription": "get_product: Fetch authoritative details for one Mercadona product. Required input: id, a product ID returned by get_category. Use this result to verify display_name, publication, availability, fixed-weight status, and unit_price before answering.",
        "url": "=https://tienda.mercadona.es/api/products/{{ $fromAI('id', 'Product ID returned by get_category', 'string') }}",
        "options": {},
        "optimizeResponse": true,
        "responseType": "json",
        "fieldsToInclude": "selected",
        "fields": "id,display_name,published,unavailable_from,is_variable_weight,price_instructions.unit_price,price_instructions.approx_size,price_instructions.unit_name,price_instructions.unit_size,price_instructions.total_units"
      },
      "id": "c0e73a37-05a9-4440-8362-a3e009288148",
      "name": "get_product",
      "type": "n8n-nodes-base.httpRequestTool",
      "typeVersion": 4.5,
      "position": [760, 180],
      "notesInFlow": true,
      "notes": "Verifies every final product and price from the live product endpoint."
    }
  ],
  "pinData": {},
  "connections": {
    "Telegram Trigger": {"main": [[{"node": "Build Mercadona Shopping List", "type": "main", "index": 0}]]},
    "Build Mercadona Shopping List": {"main": [[{"node": "Reply with Shopping List", "type": "main", "index": 0}]]},
    "OpenRouter Chat Model": {"ai_languageModel": [[{"node": "Build Mercadona Shopping List", "type": "ai_languageModel", "index": 0}]]},
    "Mercadona MCP Client": {"ai_tool": [[{"node": "Build Mercadona Shopping List", "type": "ai_tool", "index": 0}]]},
    "Calculator": {"ai_tool": [[{"node": "Build Mercadona Shopping List", "type": "ai_tool", "index": 0}]]},
    "get_categories": {"ai_tool": [[{"node": "MCP Server Trigger", "type": "ai_tool", "index": 0}]]},
    "get_category": {"ai_tool": [[{"node": "MCP Server Trigger", "type": "ai_tool", "index": 0}]]},
    "get_product": {"ai_tool": [[{"node": "MCP Server Trigger", "type": "ai_tool", "index": 0}]]}
  },
  "active": false,
  "settings": {"executionOrder": "v1"},
  "versionId": "2a821946-f671-4c5c-856e-8fc337806ec4",
  "meta": {"templateCredsSetupCompleted": false},
  "tags": []
}
```

## Bonus Workflow JSON

```json
{
  "name": "Challenge 10 – Mercadona MCP Shopping Assistant (Bonus)",
  "nodes": [
    {
      "parameters": {"updates": ["message"], "additionalFields": {}},
      "id": "a18b9f42-0348-42da-8bb5-b3ae88ea0994",
      "name": "Telegram Trigger",
      "type": "n8n-nodes-base.telegramTrigger",
      "typeVersion": 1.3,
      "position": [-760, 0],
      "webhookId": "2cd947a1-2699-4e78-87aa-09b9823fbf70",
      "notesInFlow": true,
      "notes": "Receives the name of a dish from Telegram."
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.message.text }}",
        "options": {
          "systemMessage": "You are a Mercadona dish-shopping assistant. Use only live data returned by the three Mercadona MCP tools; never invent a category, product, availability status, name, or price.\n\nFor every dish request, follow this sequence:\n1. Call get_categories first.\n2. Choose two or three relevant published category IDs from that response. Call get_category once for each chosen ID, one by one.\n3. From those category results, choose four to six essential, published, available, fixed-price products for the dish. Prefer one practical package of each ingredient and avoid duplicates.\n4. Call get_product once for every chosen product ID. Keep only products whose detail result confirms published availability, is_variable_weight is false, and a unit_price exists. Replace any invalid choice using the category results.\n5. Call Calculator exactly once to add the confirmed unit prices for one package of every selected product. Do not calculate the final total mentally.\n\nReturn plain text in the same language as the user. Start with the dish name, then one bullet per product in the format \"Product name – €0.00\", and finish with \"Total – €0.00\". Use two decimal places. Do not expose category IDs or product IDs in the final answer. The MCP tools may be prefixed with the MCP Client node name; identify them by the get_categories, get_category, and get_product suffixes.",
          "maxIterations": 20
        }
      },
      "id": "fb2a39b7-902b-42e7-9747-0d1e5de890c1",
      "name": "Build Mercadona Shopping List",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3.1,
      "position": [-400, 0],
      "notesInFlow": true,
      "notes": "Orchestrates the required catalog calls and formats the final shopping list."
    },
    {
      "parameters": {"chatId": "={{ $('Telegram Trigger').first().json.message.chat.id }}", "text": "={{ $json.output }}", "additionalFields": {"appendAttribution": false}},
      "id": "8cb615f8-46fc-4375-9aca-94cd5a55bb94",
      "name": "Reply with Shopping List",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [-40, 0],
      "notesInFlow": true,
      "notes": "Replies in the same Telegram chat with product names, unit prices, and the total."
    },
    {
      "parameters": {"model": "openai/gpt-4.1-mini", "options": {"temperature": 0.1, "maxTokens": 2000}},
      "id": "f056a355-4467-4746-92e3-b1ee86f345f9",
      "name": "OpenRouter Chat Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenRouter",
      "typeVersion": 1,
      "position": [-560, 260]
    },
    {
      "parameters": {"endpointUrl": "https://YOUR_N8N_HOST/mcp/mercadona-catalog", "serverTransport": "httpStreamable", "authentication": "none", "include": "all", "options": {"timeout": 60000}},
      "id": "0650f262-06d2-453d-9a70-876152087f27",
      "name": "Mercadona MCP Client",
      "type": "@n8n/n8n-nodes-langchain.mcpClientTool",
      "typeVersion": 1.4,
      "position": [-340, 260],
      "notesInFlow": true,
      "notes": "Replace YOUR_N8N_HOST with this workflow's published MCP Server Trigger production host."
    },
    {
      "parameters": {},
      "id": "9eaf74a5-52d4-4705-b14c-fbd1e1403c15",
      "name": "Calculator",
      "type": "@n8n/n8n-nodes-langchain.toolCalculator",
      "typeVersion": 1,
      "position": [-100, 260]
    },
    {
      "parameters": {"authentication": "none", "path": "mercadona-catalog", "instructions": "This read-only catalog server exposes exactly three tools. Always call get_categories before get_category. Use an id returned by get_categories as the required get_category id. Use product ids returned by get_category as get_product ids. Treat get_product as authoritative for final names, availability, and prices."},
      "id": "43669c98-73a9-4d8c-83eb-810e30cfec61",
      "name": "MCP Server Trigger",
      "type": "@n8n/n8n-nodes-langchain.mcpTrigger",
      "typeVersion": 2.1,
      "position": [300, -120],
      "webhookId": "7aa8079d-17f5-4414-97c1-2c0d3ae85872",
      "notesInFlow": true,
      "notes": "Publishes the three read-only Mercadona catalog tools over Streamable HTTP."
    },
    {
      "parameters": {"toolDescription": "get_categories: Fetch the complete live Mercadona category tree. This tool has no input. Call it first for every dish and use only published category IDs from its response.", "url": "https://tienda.mercadona.es/api/categories/", "options": {}, "optimizeResponse": true, "responseType": "json", "fieldsToInclude": "selected", "fields": "results.id,results.name,results.categories.id,results.categories.name,results.categories.published"},
      "id": "02d05b1e-21e3-4e58-8260-322ec95eec3c",
      "name": "get_categories",
      "type": "n8n-nodes-base.httpRequestTool",
      "typeVersion": 4.5,
      "position": [120, 180]
    },
    {
      "parameters": {"toolDescription": "get_category: Fetch one live Mercadona category and its product summaries. Required input: id, a numeric published category ID returned by get_categories. Never reuse a product ID as this parameter.", "url": "=https://tienda.mercadona.es/api/categories/{{ $fromAI('id', 'Numeric category ID returned by get_categories', 'number') }}", "options": {}, "optimizeResponse": true, "responseType": "json", "fieldsToInclude": "selected", "fields": "id,name,categories.id,categories.name,categories.published,categories.products.id,categories.products.display_name,categories.products.published,categories.products.unavailable_from,categories.products.price_instructions.unit_price,categories.products.price_instructions.approx_size"},
      "id": "53c00fba-781f-4634-99b7-40be957ae0ee",
      "name": "get_category",
      "type": "n8n-nodes-base.httpRequestTool",
      "typeVersion": 4.5,
      "position": [440, 180],
      "notesInFlow": true,
      "notes": "The AI supplies the required id parameter through $fromAI."
    },
    {
      "parameters": {"toolDescription": "get_product: Fetch authoritative details for one Mercadona product. Required input: id, a product ID returned by get_category. Use this result to verify display_name, publication, availability, fixed-weight status, and unit_price before answering.", "url": "=https://tienda.mercadona.es/api/products/{{ $fromAI('id', 'Product ID returned by get_category', 'string') }}", "options": {}, "optimizeResponse": true, "responseType": "json", "fieldsToInclude": "selected", "fields": "id,display_name,published,unavailable_from,is_variable_weight,price_instructions.unit_price,price_instructions.approx_size,price_instructions.unit_name,price_instructions.unit_size,price_instructions.total_units"},
      "id": "c0e73a37-05a9-4440-8362-a3e009288148",
      "name": "get_product",
      "type": "n8n-nodes-base.httpRequestTool",
      "typeVersion": 4.5,
      "position": [760, 180]
    },
    {
      "parameters": {"content": "## Bonus – external MCP client\nPublish this workflow, copy the MCP Server Trigger Production URL into ChatGPT or Claude, then ask for **paella de marisco** or **gazpacho**. Confirm the external client calls the same three tools.", "height": 220, "width": 500, "color": 6},
      "id": "f85418ce-1a93-4f34-a6a5-d4d185521fe4",
      "name": "Bonus External Client Test",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [260, -440]
    }
  ],
  "pinData": {},
  "connections": {
    "Telegram Trigger": {"main": [[{"node": "Build Mercadona Shopping List", "type": "main", "index": 0}]]},
    "Build Mercadona Shopping List": {"main": [[{"node": "Reply with Shopping List", "type": "main", "index": 0}]]},
    "OpenRouter Chat Model": {"ai_languageModel": [[{"node": "Build Mercadona Shopping List", "type": "ai_languageModel", "index": 0}]]},
    "Mercadona MCP Client": {"ai_tool": [[{"node": "Build Mercadona Shopping List", "type": "ai_tool", "index": 0}]]},
    "Calculator": {"ai_tool": [[{"node": "Build Mercadona Shopping List", "type": "ai_tool", "index": 0}]]},
    "get_categories": {"ai_tool": [[{"node": "MCP Server Trigger", "type": "ai_tool", "index": 0}]]},
    "get_category": {"ai_tool": [[{"node": "MCP Server Trigger", "type": "ai_tool", "index": 0}]]},
    "get_product": {"ai_tool": [[{"node": "MCP Server Trigger", "type": "ai_tool", "index": 0}]]}
  },
  "active": false,
  "settings": {"executionOrder": "v1"},
  "versionId": "48f490a2-dfb3-433e-a391-b78201746c5d",
  "meta": {"templateCredsSetupCompleted": false},
  "tags": []
}
```

# English

## Title
Mercadona MCP Shopping Assistant

## Summary
Build a read-only Mercadona MCP server and let a Telegram shopping assistant turn any dish into a live, priced product list.

## Concept
Custom MCP servers, agent tool orchestration, live catalog grounding, and verified calculations

## Scenario
- A shopper sends "paella de marisco" and receives a compact list of available Mercadona products with current unit prices.
- A family names "gazpacho" and gets one practical package of each essential ingredient plus the basket total.
- A cooking workshop can reuse the same catalog tools from Telegram, ChatGPT, or Claude without giving the model permission to change data.

## Task
A shopper needs a Telegram assistant: when they send the name of a dish, reply in the same chat with four to six relevant Mercadona products, each current unit price, and the correctly calculated total for one unit of every product.

## Bonus Task
Connect the published catalog MCP server to an eligible ChatGPT or Claude account, request "paella de marisco" or "gazpacho", and show that the external client can use the same three tools.

## Nodes
- Telegram Trigger
- AI Agent
- OpenRouter Chat Model
- MCP Client Tool
- Calculator
- Telegram
- MCP Server Trigger
- HTTP Request Tool – three instances

## Preparation
- Sign up for [n8n Cloud](https://app.n8n.cloud/register) or use an updated n8n instance with a public HTTPS address; read the [MCP Server Trigger guide](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger/) and use its Production URL after publishing.
- Create a Telegram account, make a bot with [BotFather](https://t.me/botfather), and add the token by following the [n8n Telegram credentials guide](https://docs.n8n.io/integrations/builtin/credentials/telegram/).
- Create an [OpenRouter](https://openrouter.ai/) account, generate an [API key](https://openrouter.ai/keys), and store it in an n8n OpenRouter credential.
- Keep the three read-only catalog endpoints ready: [all categories](https://tienda.mercadona.es/api/categories/), [one category example](https://tienda.mercadona.es/api/categories/115), and [one product example](https://tienda.mercadona.es/api/products/5598). These are live third-party endpoints and may change; ask the event mentor for the fallback catalog snapshot if they are unavailable.
- For the bonus, confirm that your account supports remote custom connectors and follow either the [ChatGPT MCP connector guide](https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt) or the [Claude custom connector guide](https://support.anthropic.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp). The server is intentionally read-only; deactivate the workflow after testing if you leave authentication set to None.

## Requirements
- Every text message containing a dish name receives one Telegram reply with four to six relevant, available Mercadona product names and current unit prices, with no internal IDs in the response.
- Execution evidence shows that the agent calls get_categories first, then get_category with its required id for each selected category, and finally get_product for every product it includes.
- The reply ends with a two-decimal euro total calculated for one unit or package of every listed fixed-price product, and two different dish tests use only values returned by the live catalog tools.

## Tips
- Start with MCP Server Trigger, give it the path mercadona-catalog, and connect three HTTP Request Tool nodes named get_categories, get_category, and get_product to its Tool input.
- Add Telegram Trigger and Telegram next, so you can map the incoming message text to the agent and return the agent output to the same message.chat.id.
- Connect OpenRouter Chat Model, MCP Client Tool, and Calculator to AI Agent; point MCP Client Tool at the published MCP Server Trigger Production URL, use Streamable HTTP, and allow all three tools.
- In get_category, build the URL with `$fromAI('id', 'Numeric category ID returned by get_categories', 'number')`; use the same pattern for the product id in get_product, and turn on Optimize Response so only IDs, names, availability, and price fields reach the model.
- In AI Agent, require the exact categories → categories one by one → product details → Calculator sequence, limit the result to four to six fixed-price products, set Max Iterations to 20, and test both "paella de marisco" and "gazpacho" before publishing.

# Spanish

## Title
Asistente de compra MCP para Mercadona

## Summary
Crea un servidor MCP de Mercadona de solo lectura y permite que un asistente de Telegram convierta cualquier plato en una lista de productos con precios actuales.

## Concept
Servidores MCP personalizados, orquestación de herramientas por un agente, datos actuales del catálogo y cálculos verificados

## Scenario
- Una persona envía "paella de marisco" y recibe una lista breve de productos disponibles de Mercadona con sus precios unitarios actuales.
- Una familia escribe "gazpacho" y obtiene un envase práctico de cada ingrediente esencial más el total de la cesta.
- Un taller de cocina puede reutilizar las mismas herramientas del catálogo desde Telegram, ChatGPT o Claude sin dar al modelo permiso para modificar datos.

## Task
Una persona necesita un asistente de Telegram: cuando envíe el nombre de un plato, responde en el mismo chat con entre cuatro y seis productos relevantes de Mercadona, su precio unitario actual y el total correcto de una unidad de cada producto.

## Bonus Task
Conecta el servidor MCP del catálogo publicado con una cuenta compatible de ChatGPT o Claude, solicita "paella de marisco" o "gazpacho" y demuestra que el cliente externo puede usar las mismas tres herramientas.

## Nodes
- Telegram Trigger
- AI Agent
- OpenRouter Chat Model
- MCP Client Tool
- Calculator
- Telegram
- MCP Server Trigger
- HTTP Request Tool – tres instancias

## Preparation
- Regístrate en [n8n Cloud](https://app.n8n.cloud/register) o usa una instancia actualizada de n8n con una dirección HTTPS pública; consulta la [guía de MCP Server Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger/) y utiliza su Production URL después de publicar.
- Crea una cuenta de Telegram, configura un bot con [BotFather](https://t.me/botfather) y añade el token siguiendo la [guía de credenciales de Telegram para n8n](https://docs.n8n.io/integrations/builtin/credentials/telegram/).
- Crea una cuenta de [OpenRouter](https://openrouter.ai/), genera una [API key](https://openrouter.ai/keys) y guárdala en una credencial de OpenRouter en n8n.
- Ten preparados los tres endpoints de catálogo de solo lectura: [todas las categorías](https://tienda.mercadona.es/api/categories/), [ejemplo de una categoría](https://tienda.mercadona.es/api/categories/115) y [ejemplo de un producto](https://tienda.mercadona.es/api/products/5598). Son endpoints activos de un tercero y pueden cambiar; pide al mentor del evento el snapshot alternativo del catálogo si no están disponibles.
- Para la tarea extra, confirma que tu cuenta admite conectores personalizados remotos y sigue la [guía de conectores MCP de ChatGPT](https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt) o la [guía de conectores personalizados de Claude](https://support.anthropic.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp). El servidor es deliberadamente de solo lectura; desactiva el workflow después de probarlo si mantienes la autenticación en None.

## Requirements
- Cada mensaje de texto con el nombre de un plato recibe una respuesta en Telegram con entre cuatro y seis nombres de productos relevantes y disponibles de Mercadona y sus precios unitarios actuales, sin ID internos.
- La evidencia de ejecución muestra que el agente llama primero a get_categories, después a get_category con su id obligatorio para cada categoría seleccionada y finalmente a get_product para cada producto incluido.
- La respuesta termina con un total en euros con dos decimales para una unidad o envase de cada producto de precio fijo, y dos pruebas con platos diferentes usan solo valores devueltos por las herramientas del catálogo activo.

## Tips
- Empieza con MCP Server Trigger, asigna la ruta mercadona-catalog y conecta a su entrada Tool tres nodos HTTP Request Tool llamados get_categories, get_category y get_product.
- Añade después Telegram Trigger y Telegram para pasar el texto del mensaje entrante al agente y devolver su salida al mismo message.chat.id.
- Conecta OpenRouter Chat Model, MCP Client Tool y Calculator a AI Agent; apunta MCP Client Tool a la Production URL publicada de MCP Server Trigger, usa Streamable HTTP y permite las tres herramientas.
- En get_category, construye la URL con `$fromAI('id', 'Numeric category ID returned by get_categories', 'number')`; usa el mismo patrón para el id de producto en get_product y activa Optimize Response para que solo lleguen al modelo los ID, nombres, disponibilidad y precios.
- En AI Agent, exige la secuencia exacta categorías → categorías una por una → detalles de producto → Calculator, limita el resultado a entre cuatro y seis productos de precio fijo, establece Max Iterations en 20 y prueba "paella de marisco" y "gazpacho" antes de publicar.

# Ukrainian

## Title
MCP-помічник для покупок у Mercadona

## Summary
Створіть MCP-сервер Mercadona лише для читання, щоб Telegram-помічник перетворював назву будь-якої страви на актуальний список продуктів із цінами.

## Concept
Власні MCP-сервери, керування інструментами через агента, актуальні дані каталогу та перевірені обчислення

## Scenario
- Покупець надсилає "paella de marisco" й отримує стислий список доступних товарів Mercadona з актуальними цінами за одиницю.
- Родина пише "gazpacho" й отримує по одній практичній упаковці кожного основного інгредієнта та загальну вартість кошика.
- Кулінарний воркшоп може повторно використовувати ті самі інструменти каталогу в Telegram, ChatGPT або Claude, не надаючи моделі права змінювати дані.

## Task
Покупцеві потрібен Telegram-помічник: коли він надсилає назву страви, дайте відповідь у тому самому чаті з чотирма-шістьма відповідними товарами Mercadona, актуальною ціною кожного та правильною загальною вартістю по одній одиниці кожного товару.

## Bonus Task
Підключіть опублікований MCP-сервер каталогу до сумісного облікового запису ChatGPT або Claude, надішліть запит "paella de marisco" чи "gazpacho" та покажіть, що зовнішній клієнт може використати ті самі три інструменти.

## Nodes
- Telegram Trigger
- AI Agent
- OpenRouter Chat Model
- MCP Client Tool
- Calculator
- Telegram
- MCP Server Trigger
- HTTP Request Tool – три екземпляри

## Preparation
- Зареєструйтеся в [n8n Cloud](https://app.n8n.cloud/register) або використайте оновлений екземпляр n8n із публічною HTTPS-адресою; прочитайте [посібник MCP Server Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger/) і після публікації використовуйте його Production URL.
- Створіть обліковий запис Telegram, налаштуйте бота через [BotFather](https://t.me/botfather) і додайте токен за [інструкцією n8n для облікових даних Telegram](https://docs.n8n.io/integrations/builtin/credentials/telegram/).
- Створіть обліковий запис [OpenRouter](https://openrouter.ai/), згенеруйте [API key](https://openrouter.ai/keys) і збережіть його в облікових даних OpenRouter у n8n.
- Підготуйте три доступні лише для читання endpoints каталогу: [усі категорії](https://tienda.mercadona.es/api/categories/), [приклад однієї категорії](https://tienda.mercadona.es/api/categories/115) і [приклад одного товару](https://tienda.mercadona.es/api/products/5598). Це активні endpoints стороннього сервісу, тому вони можуть змінитися; якщо вони недоступні, попросіть у ментора резервний snapshot каталогу.
- Для додаткового завдання перевірте, чи ваш обліковий запис підтримує віддалені власні connectors, і скористайтеся [посібником MCP-конекторів ChatGPT](https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt) або [посібником власних конекторів Claude](https://support.anthropic.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp). Сервер навмисно доступний лише для читання; після тестування деактивуйте workflow, якщо для автентифікації залишено None.

## Requirements
- Кожне текстове повідомлення з назвою страви отримує одну відповідь у Telegram із чотирма-шістьма назвами відповідних доступних товарів Mercadona та їх актуальними цінами за одиницю без внутрішніх ID.
- Дані виконання показують, що агент спочатку викликає get_categories, потім get_category з обов’язковим id для кожної вибраної категорії, а насамкінець get_product для кожного доданого товару.
- Відповідь завершується загальною сумою в євро з двома десятковими знаками за одну одиницю або упаковку кожного товару з фіксованою ціною, а два тести з різними стравами використовують лише значення, повернуті інструментами активного каталогу.

## Tips
- Почніть із MCP Server Trigger, задайте шлях mercadona-catalog і підключіть до його входу Tool три вузли HTTP Request Tool із назвами get_categories, get_category та get_product.
- Далі додайте Telegram Trigger і Telegram, щоб передати текст вхідного повідомлення агенту та повернути його результат у той самий message.chat.id.
- Підключіть OpenRouter Chat Model, MCP Client Tool і Calculator до AI Agent; у MCP Client Tool укажіть опубліковану Production URL від MCP Server Trigger, виберіть Streamable HTTP і дозвольте всі три інструменти.
- У get_category побудуйте URL за допомогою `$fromAI('id', 'Numeric category ID returned by get_categories', 'number')`; застосуйте той самий шаблон до id товару в get_product і ввімкніть Optimize Response, щоб модель отримувала лише ID, назви, доступність і ціни.
- В AI Agent вимагайте точну послідовність категорії → категорії по одній → деталі товарів → Calculator, обмежте результат чотирма-шістьма товарами з фіксованою ціною, установіть Max Iterations на 20 і перевірте "paella de marisco" та "gazpacho" перед публікацією.
