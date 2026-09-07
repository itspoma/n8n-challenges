---
number: 10
slug: mercadona-mcp-assistant
difficulty: intermediate
time: 30–40 min
complexity: 3
color: #040506
ink: #ffffff
---

# English

## Title
Mercadona MCP Shopping Assistant

## Summary
Connect an AI agent to provided Mercadona catalog tools and build a priced shopping basket.

## Concept
MCP clients, AI agents, tool selection, and grounded calculations

## Scenario
- A shopper describes a meal and budget in plain language and wants a basket based on real catalog records.
- An event host needs affordable refreshments while keeping the calculated total within budget.
- A family wants to compare breakfast options using verified product IDs and prices rather than model guesses.

## Task
Connect an AI Agent to the event-provided Mercadona catalog MCP server. For the test request Plan a vegetarian breakfast for two under €10, use the catalog tools to return suitable products, product IDs, individual prices, and a verified total.

## Bonus Task
If the initial selection exceeds €10, replace the most expensive product and recalculate until the verified total fits the budget.

## Nodes
- Chat Trigger
- AI Agent
- Chat Model
- MCP Client Tool

## Preparation
- Ask a mentor for the event MCP server URL, authentication details, and catalog timestamp.
- Add a credential for an AI chat model; the event server uses a prepared catalog snapshot, so no live scraping is required.

## Requirements
- Connect MCP Client Tool to the supplied server and expose its product tools to the agent.
- Make the agent call search_products and at least one detail or comparison tool before answering.
- Return product names, product IDs, individual prices, quantities, and a calculated basket total.
- Keep the official breakfast test basket within €10 and do not invent unavailable products or prices.
- Handle a second request containing an unavailable product with a clear alternative or no-result response.

## Tips
- Connect the MCP server and inspect the available tool names and schemas before adding the agent prompt.
- Select only the product-search, detail, and comparison tools the shopping assistant needs.
- Tell the agent that catalog tool results are authoritative for names, IDs, availability, and prices.
- Require the agent to check quantities and add the prices before it claims the basket meets the budget.
- Review the execution log to confirm that the agent called multiple tools rather than answering from memory.

# Spanish

## Title
Asistente de compra MCP para Mercadona

## Summary
Conecta un agente de IA con las herramientas de catálogo de Mercadona proporcionadas y crea una cesta con precios.

## Concept
Clientes MCP, agentes de IA, selección de herramientas y cálculos fundamentados

## Scenario
- Una persona describe una comida y un presupuesto y quiere una cesta basada en registros reales del catálogo.
- La organización de un evento necesita aperitivos económicos manteniendo el total dentro del presupuesto.
- Una familia quiere comparar desayunos usando ID y precios verificados, no estimaciones del modelo.

## Task
Conecta un AI Agent al servidor MCP del catálogo de Mercadona proporcionado por el evento. Para la petición de prueba Plan a vegetarian breakfast for two under €10, usa las herramientas del catálogo y devuelve productos adecuados, sus ID, precios individuales y un total verificado.

## Bonus Task
Si la selección inicial supera los 10 €, sustituye el producto más caro y vuelve a calcular hasta que el total verificado se ajuste al presupuesto.

## Nodes
- Chat Trigger
- AI Agent
- Chat Model
- MCP Client Tool

## Preparation
- Pide a un mentor la URL del servidor MCP del evento, los datos de autenticación y la fecha del catálogo.
- Añade una credencial para un modelo de chat con IA; el servidor del evento usa un snapshot preparado del catálogo, por lo que no se necesita extracción en directo.

## Requirements
- Conecta MCP Client Tool al servidor suministrado y expone sus herramientas de producto al agente.
- Haz que el agente llame a search_products y al menos a una herramienta de detalle o comparación antes de responder.
- Devuelve nombres de producto, ID, precios individuales, cantidades y el total calculado de la cesta.
- Mantén la cesta de la prueba oficial de desayuno dentro de 10 € y no inventes productos o precios no disponibles.
- Gestiona una segunda petición con un producto no disponible mediante una alternativa clara o una respuesta sin resultados.

## Tips
- Conecta el servidor MCP e inspecciona los nombres y esquemas de las herramientas antes de añadir el prompt del agente.
- Selecciona solo las herramientas de búsqueda, detalle y comparación que necesite el asistente de compra.
- Indica al agente que los resultados de las herramientas del catálogo son la única referencia para nombres, ID, disponibilidad y precios.
- Exige al agente que compruebe cantidades y sume los precios antes de afirmar que la cesta cumple el presupuesto.
- Revisa el registro de ejecución para confirmar que el agente llamó a varias herramientas en lugar de responder de memoria.

# Ukrainian

## Title
MCP-помічник для покупок у Mercadona

## Summary
Підключіть ШІ-агента до наданих інструментів каталогу Mercadona та складіть кошик із розрахованою вартістю.

## Concept
MCP-клієнти, ШІ-агенти, вибір інструментів і розрахунки на основі перевірених даних

## Scenario
- Покупець описує страву й бюджет звичайною мовою та хоче отримати кошик на основі реальних записів каталогу.
- Організатору події потрібні доступні частування з розрахованою сумою в межах бюджету.
- Родина хоче порівняти варіанти сніданку за перевіреними ID і цінами продуктів, а не припущеннями моделі.

## Task
Підключіть AI Agent до наданого організаторами MCP-сервера каталогу Mercadona. Для тестового запиту Plan a vegetarian breakfast for two under €10 використайте інструменти каталогу, щоб повернути відповідні продукти, їхні ID, окремі ціни та перевірену загальну суму.

## Bonus Task
Якщо початковий вибір коштує більше €10, замініть найдорожчий продукт і перераховуйте суму, доки перевірена загальна вартість не вкладеться в бюджет.

## Nodes
- Chat Trigger
- AI Agent
- Chat Model
- MCP Client Tool

## Preparation
- Попросіть у ментора URL MCP-сервера події, дані автентифікації та часову мітку каталогу.
- Додайте облікові дані моделі ШІ; сервер події використовує підготовлений знімок каталогу, тому збирати актуальні дані із сайту не потрібно.

## Requirements
- Підключіть MCP Client Tool до наданого сервера та зробіть його інструменти продуктів доступними агенту.
- Змусьте агента перед відповіддю викликати search_products і щонайменше один інструмент деталізації або порівняння.
- Повертайте назви продуктів, їхні ID, окремі ціни, кількість і розраховану загальну вартість кошика.
- Укладіть офіційний тестовий кошик для сніданку в €10 і не вигадуйте недоступних продуктів чи цін.
- Для другого запиту з недоступним продуктом повертайте зрозумілу альтернативу або відповідь про відсутність результату.

## Tips
- Підключіть MCP-сервер і перегляньте назви та схеми доступних інструментів перед додаванням промпту агента.
- Виберіть лише інструменти пошуку продуктів, деталізації та порівняння, потрібні помічнику для покупок.
- Укажіть агенту, що результати інструментів каталогу є авторитетним джерелом назв, ID, наявності та цін.
- Вимагайте від агента перевіряти кількість і додавати ціни, перш ніж стверджувати, що кошик відповідає бюджету.
- Перегляньте журнал виконання, щоб підтвердити, що агент викликав кілька інструментів, а не відповів з пам’яті.
