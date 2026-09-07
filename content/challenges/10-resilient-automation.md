---
number: 10
slug: resilient-automation
difficulty: advanced
time: 30–40 min
complexity: 5
color: #040506
ink: #ffffff
---

# English

## Title
Resilient Automation

## Summary
Process unreliable work safely without losing or duplicating items.

## Concept
Retries, errors, and idempotency

## Scenario
A batch endpoint sometimes fails, but successful work must be preserved and repeated requests must never create duplicates.

## Task
Process a batch through the unreliable event endpoint with bounded retries, visible failures, and duplicate protection.

## Requirements
- Retry transient failures with a bounded policy.
- Capture unrecoverable failures in an error or log path.
- Continue processing valid items after a failure.
- Prevent duplicate results and return a final success/failure summary.

## Tips
- Split the batch into individual items so one failure does not stop every record.
- Enable retry behavior only for transient errors and set a maximum attempt count.
- Continue on handled failures and send their details to a dedicated error branch.
- Create a stable idempotency key from each item's identifying fields before processing it.
- Aggregate successful and failed items at the end and test by submitting the same batch twice.

# Spanish

## Title
Automatización resiliente

## Summary
Procesa trabajo poco fiable sin perder ni duplicar elementos.

## Concept
Reintentos, errores e idempotencia

## Scenario
Un endpoint de lotes falla a veces, pero hay que conservar el trabajo correcto y evitar duplicados al repetir una petición.

## Task
Procesa un lote con el endpoint inestable del evento usando reintentos limitados, fallos visibles y protección contra duplicados.

## Requirements
- Reintenta los fallos transitorios con una política limitada.
- Registra los fallos irrecuperables en una ruta de error o log.
- Continúa procesando los elementos válidos después de un fallo.
- Evita resultados duplicados y devuelve un resumen final de éxitos y fallos.

## Tips
- Divide el lote en elementos individuales para que un fallo no detenga todos los registros.
- Activa reintentos solo para errores transitorios y limita el número de intentos.
- Continúa tras fallos controlados y envía sus datos a una rama de error.
- Crea una clave de idempotencia estable con los campos identificadores de cada elemento.
- Agrega éxitos y fallos al final y prueba enviando dos veces el mismo lote.
