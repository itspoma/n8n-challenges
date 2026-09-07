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
Valencia Greeting Webhook

## Summary
Create a URL that greets its visitor from Valencia.

## Concept
Webhook triggers, query parameters, and browser responses

## Scenario
- An event landing page loads its event list from a URL, so newly published events appear automatically without editing the page.
- A workshop uses an attendee URL as its live source, so every new signup appears automatically as soon as the person registers.
- A venue QR code opens a URL that shows the current Wi-Fi password, so organizers can change the password without reprinting the QR code.
- A status page displays live workshop capacity or available seats.

## Task
Create a GET webhook at a path such as welcome. Opening it in your browser (e.g. Chrome) without parameters must show "Hello world from Valencia!"

## Bonus Task
Opening it with "?name=Ana" must show "Hello Ana from Valencia!"

## Nodes
- Webhook
- Edit Fields (Set)
- Respond to Webhook

## Preparation
- Open your [n8n workspace](https://app.n8n.cloud/) and create a new workflow.
- Have access to any modern web browser (e.g. [Google Chrome](https://www.google.com/chrome/) or [Edge](https://explore.microsoft.com/)) on a computer or mobile phone (e.g. [Safari](https://www.apple.com/safari/)).
- No third-party account or API key is required.

## Requirements
- Configure the Webhook node to accept GET requests.
- Return the exact default greeting "Hello world from Valencia!"
- For the bonus task, read the optional name query parameter and return the exact greeting "Hello Ana from Valencia!" when the URL contains "?name=Ana".
- Return readable text or HTML that opens correctly in a browser.

## Tips
- Begin with a Webhook node, choose the GET method, and select any option in "Response Data".
- Use the test URL while listening for a test event; use the production URL after publishing the workflow. Do not forget to publish the workflow—the production URL will not work until you do.
- Look for the name value in the webhook query parameters.
- Use "Edit Fields (Set)" to build the greeting with an expression and a fallback value of world.
- Use "Respond to Webhook" to return text or HTML instead of JSON.

# Spanish

## Title
Webhook de saludo desde Valencia

## Summary
Crea una URL que salude a quien la visite desde Valencia.

## Concept
Triggers Webhook, parámetros de consulta y respuestas para el navegador

## Scenario
- La página de un evento carga su lista de eventos desde una URL, para que los eventos recién publicados aparezcan automáticamente sin editar la página.
- Un workshop usa una URL de asistentes como fuente en vivo, para que cada nueva inscripción aparezca automáticamente en cuanto la persona se registre.
- Un código QR del espacio abre una URL que muestra la contraseña Wi-Fi actual, para que la organización pueda cambiarla sin volver a imprimir el código QR.
- Una página de estado muestra en directo el aforo del workshop o las plazas disponibles.

## Task
Crea un webhook GET en una ruta como welcome. Al abrirlo en tu navegador (por ejemplo, Chrome) sin parámetros, debe mostrar "Hello world from Valencia!"

## Bonus Task
Al abrirlo con "?name=Ana", debe mostrar "Hello Ana from Valencia!"

## Nodes
- Webhook
- Edit Fields (Set)
- Respond to Webhook

## Preparation
- Abre tu [espacio de trabajo de n8n](https://app.n8n.cloud/) y crea un workflow nuevo.
- Ten acceso a cualquier navegador web moderno (por ejemplo, [Google Chrome](https://www.google.com/chrome/) o [Edge](https://explore.microsoft.com/)) desde un ordenador o teléfono móvil (por ejemplo, [Safari](https://www.apple.com/safari/)).
- No necesitas una cuenta de terceros ni una clave de API.

## Requirements
- Configura el nodo Webhook para aceptar peticiones GET.
- Devuelve exactamente el saludo por defecto "Hello world from Valencia!"
- Para la tarea extra, lee el parámetro de consulta opcional name y devuelve exactamente "Hello Ana from Valencia!" cuando la URL contenga "?name=Ana".
- Devuelve texto o HTML legible que se abra correctamente en un navegador.

## Tips
- Empieza con un nodo Webhook, elige el método GET y selecciona cualquier opción en "Response Data".
- Usa la URL de prueba mientras esperas un evento de prueba y la URL de producción después de publicar el workflow. No olvides publicar el workflow: la URL de producción no funcionará hasta que lo hagas.
- Busca el valor name en los parámetros de consulta del webhook.
- Usa "Edit Fields (Set)" para construir el saludo con una expresión y usa world como valor alternativo.
- Usa "Respond to Webhook" para devolver texto o HTML en lugar de JSON.
