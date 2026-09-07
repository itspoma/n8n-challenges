---
number: 8
slug: valencia-contacts-mcp
difficulty: advanced
time: 45–60 min
complexity: 5
color: #e84d49
ink: #ffffff
---

# English

## Title
Valencia Helpful Contacts MCP Server

## Summary
Expose a searchable Valencia contacts spreadsheet as a safe MCP tool.

## Concept
MCP servers, workflow tools, search, and strict tool contracts

## Scenario
- Residents know what help they need but not which municipal or community service to contact.
- An event concierge needs to find relevant transport, health, or administrative contacts quickly.
- A community assistant should recommend a small set of services while preserving the source of every result.

## Task
Build an MCP server with a find_valencia_contacts tool. Given a natural-language question and language, it must search the event spreadsheet and return up to three relevant contacts with service, name, phone, URL, and sourceId.

## Bonus Task
When no relevant contact is found, return a helpful no-results response in the requested language instead of an empty list.

## Nodes
- MCP Server Trigger
- Call n8n Workflow Tool
- Execute Workflow Trigger
- HTTP Request
- Extract From File
- Basic LLM Chain

## Preparation
- Ask a mentor for the event contacts spreadsheet URL, its column guide, and the approved MCP test client.
- Add an AI model credential if you choose AI-assisted classification or ranking inside the tool workflow.

## Requirements
- Expose one MCP tool named find_valencia_contacts with question and language inputs.
- Load and search the supplied spreadsheet dynamically rather than copying contacts into the prompt.
- Return no more than three rows using service, name, phone, url, and sourceId fields from the source.
- Return a clear no-match result and never invent a phone number, URL, or contact.
- Publish the workflow and pass two known-contact tests plus one no-match test from the MCP client.

## Tips
- Inspect the spreadsheet columns and sample values before building the MCP layer.
- Build the contact-search logic as a sub-workflow that accepts question and language.
- Give the tool a precise description explaining when to call it and exactly what it returns.
- Connect the sub-workflow through Call n8n Workflow Tool to MCP Server Trigger.
- Test the published MCP URL with the supplied client and compare every returned field with its source row.

# Spanish

## Title
Servidor MCP de contactos útiles de Valencia

## Summary
Expone una hoja de contactos de Valencia como una herramienta MCP segura y consultable.

## Concept
Servidores MCP, herramientas de workflow, búsqueda y contratos estrictos

## Scenario
- Las personas residentes saben qué ayuda necesitan, pero no con qué servicio municipal o comunitario contactar.
- El equipo de atención de un evento necesita encontrar rápidamente contactos de transporte, salud o administración.
- Un asistente comunitario debe recomendar pocos servicios y conservar la fuente de cada resultado.

## Task
Crea un servidor MCP con una herramienta find_valencia_contacts. A partir de una pregunta en lenguaje natural y un idioma, debe buscar en la hoja del evento y devolver hasta tres contactos relevantes con service, name, phone, url y sourceId.

## Bonus Task
Cuando no se encuentre ningún contacto relevante, devuelve una respuesta útil sin resultados en el idioma solicitado en lugar de una lista vacía.

## Nodes
- MCP Server Trigger
- Call n8n Workflow Tool
- Execute Workflow Trigger
- HTTP Request
- Extract From File
- Basic LLM Chain

## Preparation
- Pide a un mentor la URL de la hoja de contactos del evento, la guía de sus columnas y el cliente MCP aprobado para las pruebas.
- Añade una credencial de modelo de IA si eliges clasificación o ranking asistido por IA dentro del workflow de la herramienta.

## Requirements
- Expone una herramienta MCP llamada find_valencia_contacts con las entradas question y language.
- Carga y busca dinámicamente en la hoja suministrada en lugar de copiar contactos dentro del prompt.
- Devuelve como máximo tres filas con los campos service, name, phone, url y sourceId tomados de la fuente.
- Devuelve un resultado claro cuando no haya coincidencias y nunca inventes un teléfono, una URL o un contacto.
- Publica el workflow y supera dos pruebas con contacto conocido y una prueba sin coincidencias desde el cliente MCP.

## Tips
- Inspecciona las columnas y los valores de ejemplo de la hoja antes de construir la capa MCP.
- Crea la lógica de búsqueda de contactos como un sub-workflow que acepte question y language.
- Da a la herramienta una descripción precisa que explique cuándo llamarla y qué devuelve exactamente.
- Conecta el sub-workflow mediante Call n8n Workflow Tool con MCP Server Trigger.
- Prueba la URL MCP publicada con el cliente suministrado y compara cada campo devuelto con su fila de origen.
