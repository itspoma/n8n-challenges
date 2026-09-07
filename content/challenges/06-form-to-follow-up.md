---
number: 6
slug: form-to-follow-up
difficulty: intermediate
time: 20–30 min
complexity: 3
color: #ea4b71
ink: #ffffff
---

# English

## Title
Form to Follow-up

## Summary
Validate a form submission and save the useful requests.

## Concept
Forms, validation, and persistent data

## Scenario
A team needs a simple intake form that rejects incomplete submissions and stores valid requests for follow-up.

## Task
Create a request form, validate its input, and save valid submissions to an n8n Data Table or the documented fallback.

## Requirements
- Make the essential form fields required.
- Return a useful message for invalid input.
- Store only valid submissions.
- Add a timestamp and generated status to each saved request.

## Tips
- Start with an n8n Form Trigger and mark essential fields as required.
- Add an IF node for validation that the form itself cannot express.
- Send invalid submissions to a clear response instead of the storage node.
- Add createdAt and status fields immediately before saving the record.
- Use a Data Table row operation for the valid branch and verify the stored row.

# Spanish

## Title
Del formulario al seguimiento

## Summary
Valida un formulario y guarda únicamente las solicitudes útiles.

## Concept
Formularios, validación y datos persistentes

## Scenario
Un equipo necesita un formulario sencillo que rechace envíos incompletos y guarde las solicitudes válidas.

## Task
Crea un formulario, valida la entrada y guarda los envíos válidos en una Data Table de n8n o en la alternativa indicada.

## Requirements
- Haz obligatorios los campos esenciales del formulario.
- Devuelve un mensaje útil cuando la entrada no sea válida.
- Guarda únicamente los envíos válidos.
- Añade una fecha y un estado generado a cada solicitud guardada.

## Tips
- Empieza con n8n Form Trigger y marca como obligatorios los campos esenciales.
- Añade un nodo IF para las validaciones que el formulario no pueda expresar.
- Envía las entradas no válidas a una respuesta clara, no al almacenamiento.
- Añade createdAt y status justo antes de guardar el registro.
- Usa una operación de Data Table en la rama válida y comprueba la fila guardada.
