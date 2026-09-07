---
number: 1
slug: webhook-welcome
difficulty: beginner
time: 10–15 min
complexity: 1
color: #fffdf6
ink: #1b2427
---

# English

## Title
Webhook Welcome

## Summary
Receive a request and return a personalized JSON response.

## Concept
Webhook triggers and expressions

## Scenario
A registration system needs to welcome each new participant in their preferred language.

## Task
Create a workflow that accepts a POST request containing a person's name and language, then returns a personalized JSON response.

## Requirements
- Start the workflow with a Webhook trigger.
- Read the name and language from the request body.
- Return valid JSON with message, language, and team fields.
- Make sure the response changes when the input changes.

## Tips
- Start with a Webhook node and set its HTTP method to POST.
- Send a test body containing name and language so n8n can expose those fields.
- Read incoming values from the webhook body with expressions instead of fixed text.
- Use an IF or Switch node if the welcome message changes by language.
- Finish with Respond to Webhook and return an object containing message, language, and team.

# Spanish

## Title
Webhook de bienvenida

## Summary
Recibe una petición y devuelve una respuesta JSON personalizada.

## Concept
Triggers Webhook y expresiones

## Scenario
Un sistema de registro necesita dar la bienvenida a cada participante en su idioma preferido.

## Task
Crea un workflow que acepte una petición POST con el nombre y el idioma de una persona y devuelva una respuesta JSON personalizada.

## Requirements
- Inicia el workflow con un trigger Webhook.
- Lee el nombre y el idioma desde el cuerpo de la petición.
- Devuelve JSON válido con los campos message, language y team.
- Comprueba que la respuesta cambia cuando cambia la entrada.

## Tips
- Empieza con un nodo Webhook y configura el método HTTP como POST.
- Envía un cuerpo de prueba con name y language para que n8n muestre esos campos.
- Lee los valores del cuerpo del webhook con expresiones, no con texto fijo.
- Usa un nodo IF o Switch si el mensaje de bienvenida cambia según el idioma.
- Termina con Respond to Webhook y devuelve message, language y team.
