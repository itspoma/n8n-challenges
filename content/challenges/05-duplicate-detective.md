---
number: 5
slug: duplicate-detective
difficulty: intermediate
time: 15–25 min
complexity: 2
color: #ff8a55
ink: #1b2427
---

# English

## Title
Duplicate Detective

## Summary
Merge, deduplicate, sort, and summarize two customer lists.

## Concept
List processing and aggregation

## Scenario
Two systems contain overlapping customer records and the combined export must be cleaned before it can be trusted.

## Task
Combine two customer lists, remove duplicates by normalized email, sort the result, and calculate a category summary.

## Requirements
- Keep one record for each normalized email address.
- Return both the cleaned list and the summary counts.
- Sort the final records consistently.
- Handle an empty input list without failing.

## Tips
- Normalize every email to lowercase and trim spaces before looking for duplicates.
- Append the two input lists before running the duplicate-removal step.
- Use Remove Duplicates with the normalized email as the comparison field.
- Branch or aggregate the cleaned list to produce the category counts.
- Test with one empty list and confirm the other list still reaches the output.

# Spanish

## Title
Detector de duplicados

## Summary
Combina, deduplica, ordena y resume dos listas de clientes.

## Concept
Procesamiento y agregación de listas

## Scenario
Dos sistemas contienen clientes repetidos y hay que limpiar la exportación combinada antes de poder confiar en ella.

## Task
Combina dos listas de clientes, elimina duplicados por email normalizado, ordena el resultado y calcula un resumen por categoría.

## Requirements
- Conserva un registro por cada dirección de email normalizada.
- Devuelve tanto la lista limpia como los totales del resumen.
- Ordena los registros finales de forma consistente.
- Gestiona una lista vacía sin que el workflow falle.

## Tips
- Convierte cada email a minúsculas y elimina espacios antes de deduplicar.
- Une las dos listas antes del paso de eliminación de duplicados.
- Usa Remove Duplicates comparando el campo de email normalizado.
- Crea una rama o agregación para calcular los totales por categoría.
- Prueba con una lista vacía y comprueba que la otra llega al resultado.
