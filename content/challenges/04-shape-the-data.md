---
number: 4
slug: shape-the-data
difficulty: beginner
time: 15–20 min
complexity: 2
color: #a9d96c
ink: #1b2427
---

# English

## Title
Shape the Data

## Summary
Turn a messy payload into a clean application-ready structure.

## Concept
Expressions and field transformation

## Scenario
An external system sends inconsistent contact and order data that your next application cannot use directly.

## Task
Transform the provided payload into the exact clean schema without using a Code node.

## Requirements
- Rename the required fields and remove unnecessary ones.
- Combine the first and last name.
- Normalize the supplied date or currency value.
- Map every value dynamically into the requested structure.

## Tips
- Pin the messy example payload so you can rerun the transformation quickly.
- Use Edit Fields rather than Code to build the target schema.
- Combine name parts with one expression and handle missing values safely.
- Use n8n date or number expressions to normalize the requested value.
- Disable inclusion of unselected fields, then compare the output keys with the target schema.

# Spanish

## Title
Dale forma a los datos

## Summary
Convierte datos desordenados en una estructura limpia y lista para usar.

## Concept
Expresiones y transformación de campos

## Scenario
Un sistema externo envía datos inconsistentes de contactos y pedidos que la siguiente aplicación no puede usar directamente.

## Task
Transforma el payload proporcionado al esquema limpio exacto sin utilizar un nodo Code.

## Requirements
- Renombra los campos necesarios y elimina los innecesarios.
- Combina el nombre y los apellidos.
- Normaliza el valor de fecha o moneda indicado.
- Mapea todos los valores dinámicamente a la estructura solicitada.

## Tips
- Fija el payload de ejemplo para repetir la transformación rápidamente.
- Usa Edit Fields, no Code, para construir el esquema final.
- Combina las partes del nombre con una expresión y contempla valores vacíos.
- Usa expresiones de fecha o número de n8n para normalizar el valor.
- Excluye los campos no seleccionados y compara las claves con el esquema objetivo.
