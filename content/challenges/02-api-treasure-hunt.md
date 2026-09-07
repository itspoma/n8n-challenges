---
number: 2
slug: api-treasure-hunt
difficulty: beginner
time: 10–20 min
complexity: 1
color: #f7cb55
ink: #1b2427
---

# English

## Title
API Treasure Hunt

## Summary
Find one record in a public API and return only what matters.

## Concept
HTTP Request and data mapping

## Scenario
Your team receives a record ID and needs to retrieve a clean, useful result from a much larger API response.

## Task
Request a list from the event fixture API, select the record matching a dynamic ID, and return only the requested fields.

## Requirements
- Fetch the data with an HTTP Request node.
- Use a dynamic input ID instead of a hard-coded record.
- Return a clean object rather than the complete API response.
- Demonstrate the workflow with at least two different IDs.

## Tips
- Create a small input containing the record ID before the HTTP Request node.
- Use HTTP Request to fetch the complete list from the fixture endpoint.
- Filter the returned items by comparing each record ID with the input ID.
- Use an Edit Fields node to keep only the fields requested by the challenge.
- Run the workflow twice with different IDs and confirm the output changes.

# Spanish

## Title
Búsqueda del tesoro API

## Summary
Encuentra un registro en una API pública y devuelve solo lo importante.

## Concept
HTTP Request y mapeo de datos

## Scenario
Tu equipo recibe un ID y necesita obtener un resultado limpio a partir de una respuesta de API mucho mayor.

## Task
Solicita una lista a la API de prueba del evento, selecciona el registro que coincida con un ID dinámico y devuelve solo los campos solicitados.

## Requirements
- Obtén los datos con un nodo HTTP Request.
- Usa un ID de entrada dinámico en lugar de un registro fijo.
- Devuelve un objeto limpio, no la respuesta completa de la API.
- Demuestra el workflow con al menos dos IDs diferentes.

## Tips
- Crea una entrada pequeña con el ID antes del nodo HTTP Request.
- Usa HTTP Request para obtener la lista completa del endpoint de prueba.
- Filtra los elementos comparando cada ID con el ID de entrada.
- Usa Edit Fields para conservar solo los campos solicitados.
- Ejecuta el workflow con dos IDs y confirma que cambia el resultado.
