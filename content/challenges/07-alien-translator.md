---
number: 7
slug: alien-translator
difficulty: beginner
time: 15–25 min
complexity: 2
color: #9b83d7
ink: #ffffff
---

# English

## Title
Alien Translator

## Summary
Use AI and a fictional language guide to translate alien messages without hiding uncertain words.

## Concept
Prompt design and structured AI output

## Scenario
- Friendly visitors have arrived from another planet, but their pocket translator lost its language pack.
- A research team needs to decode field notes while clearly flagging unknown words.
- Event participants want to exchange alien messages without inventing meanings outside the supplied dictionary.

## Task
Create a chat workflow that translates messages according to the event-provided alien dictionary and grammar sheet. Return the translation, a confidence value, and any unknown words rather than inventing meanings.

## Nodes
- Chat Trigger
- Basic LLM Chain
- Structured Output Parser

## Preparation
- Ask a mentor for the alien dictionary, grammar sheet, and two official test messages.
- Add a credential for an AI chat model supported by your n8n workspace.

## Requirements
- Accept an alien message through Chat Trigger.
- Include the supplied dictionary and grammar rules in the model instructions.
- Return structured translation, confidence, and unknownWords fields.
- Translate the official known message to its expected English meaning.
- For the official mystery message, preserve every unknown word and lower the confidence instead of guessing.

## Tips
- Start by placing the supplied language rules in the system instructions.
- Tell the model that the dictionary is authoritative and that it must not invent definitions.
- Add one worked translation from the event sheet as an example in the prompt.
- Attach a Structured Output Parser so every response uses the same three fields.
- Compare the known and mystery test messages and check that unknownWords changes correctly.

# Spanish

## Title
Traductor alienígena

## Summary
Usa IA y una guía de idioma ficticio para traducir mensajes alienígenas sin ocultar las palabras dudosas.

## Concept
Diseño de prompts y salida estructurada de IA

## Scenario
- Unas visitas amistosas han llegado de otro planeta, pero su traductor ha perdido el paquete de idioma.
- Un equipo de investigación necesita descifrar notas de campo indicando claramente las palabras desconocidas.
- Las personas del evento quieren intercambiar mensajes alienígenas sin inventar significados fuera del diccionario.

## Task
Crea un workflow de chat que traduzca mensajes según el diccionario alienígena y la hoja de gramática proporcionados por el evento. Devuelve la traducción, un valor de confianza y las palabras desconocidas en lugar de inventar significados.

## Nodes
- Chat Trigger
- Basic LLM Chain
- Structured Output Parser

## Preparation
- Pide a un mentor el diccionario alienígena, la hoja de gramática y los dos mensajes oficiales de prueba.
- Añade una credencial para un modelo de chat con IA compatible con tu espacio de n8n.

## Requirements
- Acepta un mensaje alienígena mediante Chat Trigger.
- Incluye el diccionario y las reglas gramaticales suministradas en las instrucciones del modelo.
- Devuelve los campos estructurados translation, confidence y unknownWords.
- Traduce el mensaje oficial conocido a su significado esperado en inglés.
- En el mensaje oficial misterioso, conserva todas las palabras desconocidas y reduce la confianza en lugar de adivinar.

## Tips
- Empieza colocando las reglas de idioma suministradas en las instrucciones del sistema.
- Indica al modelo que el diccionario es la única referencia válida y que no debe inventar definiciones.
- Añade al prompt una traducción resuelta de la hoja del evento como ejemplo.
- Conecta un Structured Output Parser para que cada respuesta use los mismos tres campos.
- Compara los mensajes de prueba conocido y misterioso y comprueba que unknownWords cambie correctamente.
