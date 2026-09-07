---
number: 1
slug: webhook-welcome
difficulty: beginner
time: 5–10 min
complexity: 1
color: #fffdf6
ink: #1b2427
---

# English

## Title
Webhook Welcome

## Summary
Publish a GET URL that greets its visitor from Valencia.

## Concept
Webhook triggers, query parameters, and browser responses

## Scenario
- An event landing page needs a friendly endpoint that anyone can test in a browser.
- A workshop facilitator wants a simple health-check link that can greet each participant by name.
- A QR code at the venue should open a personalized welcome without requiring an app.

## Task
Create a GET webhook at a path such as welcome. Opening it without parameters must show Hello world from Valencia! Opening it with ?name=Ana must show Hello Ana from Valencia!

## Nodes
- Webhook
- Respond to Webhook

## Preparation
- Open your n8n workspace and create a new workflow.
- No third-party account or API key is required.

## Requirements
- Configure the Webhook node to accept GET requests.
- Read the optional name query parameter dynamically.
- Use world when the name parameter is missing or empty.
- Return readable text or HTML that opens correctly in a browser.
- Demonstrate both the default URL and a URL containing ?name=Ana.

## Tips
- Begin with a Webhook node and choose the GET method.
- Use the test URL while listening for a test event; use the production URL after publishing the workflow.
- Look for the name value in the webhook query parameters.
- Build the greeting with an expression and a fallback value of world.
- Use Respond to Webhook to return text or HTML instead of JSON.

# Spanish

## Title
Webhook de bienvenida

## Summary
Publica una URL GET que salude a quien la visite desde Valencia.

## Concept
Triggers Webhook, parámetros de consulta y respuestas para el navegador

## Scenario
- La página de un evento necesita un endpoint sencillo que cualquiera pueda probar en el navegador.
- Una persona facilitadora quiere un enlace de comprobación que salude a cada participante por su nombre.
- Un código QR del evento debe abrir una bienvenida personalizada sin necesitar una aplicación.

## Task
Crea un webhook GET en una ruta como welcome. Al abrirlo sin parámetros debe mostrar Hello world from Valencia! Al abrirlo con ?name=Ana debe mostrar Hello Ana from Valencia!

## Nodes
- Webhook
- Respond to Webhook

## Preparation
- Abre tu espacio de trabajo de n8n y crea un workflow nuevo.
- No necesitas una cuenta de terceros ni una clave de API.

## Requirements
- Configura el nodo Webhook para aceptar peticiones GET.
- Lee dinámicamente el parámetro de consulta opcional name.
- Usa world cuando el parámetro name no exista o esté vacío.
- Devuelve texto o HTML legible que se abra correctamente en un navegador.
- Demuestra tanto la URL por defecto como una URL que contenga ?name=Ana.

## Tips
- Empieza con un nodo Webhook y elige el método GET.
- Usa la URL de prueba mientras esperas un evento de prueba y la URL de producción después de publicar el workflow.
- Busca el valor name en los parámetros de consulta del webhook.
- Construye el saludo con una expresión y usa world como valor alternativo.
- Usa Respond to Webhook para devolver texto o HTML en lugar de JSON.
