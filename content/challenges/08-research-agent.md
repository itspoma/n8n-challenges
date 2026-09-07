---
number: 8
slug: research-agent
difficulty: advanced
time: 25–35 min
complexity: 4
color: #e84d49
ink: #ffffff
---

# English

## Title
Research Agent

## Summary
Build an agent that uses a tool instead of inventing answers.

## Concept
AI Agent with tools

## Scenario
Event attendees ask detailed workshop questions that the model cannot answer reliably from its own knowledge.

## Task
Build an agent that answers event questions by calling the workshop-information tool and cites the retrieved source ID.

## Requirements
- Use an AI Agent with at least one connected tool.
- Call the tool for event-specific facts.
- Return the answer and retrieved source identifier.
- Say when information is unavailable instead of fabricating it.

## Tips
- Build the information lookup as a separate workflow or callable tool first.
- Give the tool a precise description so the agent knows when it is required.
- Make the tool return both the relevant text and a sourceId field.
- Tell the agent that event facts must come from the tool and include sourceId in its answer.
- Test an answerable question and an unavailable one to check the fallback behavior.

# Spanish

## Title
Agente de investigación

## Summary
Crea un agente que use una herramienta en lugar de inventar respuestas.

## Concept
AI Agent con herramientas

## Scenario
Los asistentes hacen preguntas detalladas del evento que el modelo no puede responder de forma fiable con su propio conocimiento.

## Task
Crea un agente que responda preguntas del evento consultando la herramienta de información y cite el ID de la fuente recuperada.

## Requirements
- Usa un AI Agent con al menos una herramienta conectada.
- Consulta la herramienta para obtener datos específicos del evento.
- Devuelve la respuesta y el identificador de la fuente.
- Indica que la información no está disponible en lugar de inventarla.

## Tips
- Construye primero la consulta de información como workflow o herramienta independiente.
- Describe la herramienta con precisión para que el agente sepa cuándo usarla.
- Haz que la herramienta devuelva el texto relevante y un campo sourceId.
- Indica al agente que los datos del evento deben proceder de la herramienta e incluir sourceId.
- Prueba una pregunta disponible y otra sin respuesta para verificar el fallback.
