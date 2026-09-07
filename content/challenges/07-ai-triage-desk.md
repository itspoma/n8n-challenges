---
number: 7
slug: ai-triage-desk
difficulty: intermediate
time: 20–30 min
complexity: 3
color: #9b83d7
ink: #ffffff
---

# English

## Title
AI Triage Desk

## Summary
Classify support tickets into reliable structured categories.

## Concept
LLMs with structured output

## Scenario
A support queue needs consistent category and priority labels before tickets reach the right team.

## Task
Use an OpenAI-compatible model to classify tickets, return structured fields, and route critical results separately.

## Requirements
- Restrict categories to the supplied allowed list.
- Return parseable structured output instead of prose only.
- Route critical tickets through a separate branch.
- Return unknown safely when the input is ambiguous.

## Tips
- Define the allowed category and priority values before writing the prompt.
- Ask the model for a small schema rather than an open-ended explanation.
- Use a structured output parser so invalid prose cannot silently pass.
- Route the parsed priority field through an IF or Switch node.
- Include an unknown option in the schema and explicitly tell the model when to use it.

# Spanish

## Title
Mesa de triaje con IA

## Summary
Clasifica tickets de soporte en categorías estructuradas y fiables.

## Concept
LLMs con salida estructurada

## Scenario
Una cola de soporte necesita etiquetas consistentes de categoría y prioridad antes de enviar cada ticket al equipo correcto.

## Task
Usa un modelo compatible con OpenAI para clasificar tickets, devolver campos estructurados y separar los casos críticos.

## Requirements
- Limita las categorías a la lista permitida.
- Devuelve una salida estructurada y procesable, no solo texto libre.
- Envía los tickets críticos por una rama separada.
- Devuelve unknown de forma segura cuando la entrada sea ambigua.

## Tips
- Define las categorías y prioridades permitidas antes de escribir el prompt.
- Pide al modelo un esquema pequeño en lugar de una explicación abierta.
- Usa un structured output parser para evitar que pase texto no válido.
- Envía el campo priority analizado a un nodo IF o Switch.
- Incluye unknown en el esquema y explica al modelo cuándo debe usarlo.
