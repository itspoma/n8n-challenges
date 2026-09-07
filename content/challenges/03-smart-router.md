---
number: 3
slug: smart-router
difficulty: beginner
time: 15–20 min
complexity: 2
color: #8dcef0
ink: #1b2427
---

# English

## Title
Smart Router

## Summary
Send requests down the right path using clear business rules.

## Concept
IF and Switch branching

## Scenario
Incoming requests need different handling depending on their priority and value.

## Task
Accept a request with priority and amount, then route it to standard, urgent, or manual review.

## Requirements
- Use real branching with an IF or Switch node.
- Send every high-value request to manual review.
- Return a normalized result from every branch.
- Include the selected route and original request ID in the result.

## Tips
- Begin with sample input fields for requestId, priority, and amount.
- Write down the three route conditions before configuring any branches.
- A Switch node is useful when one input can follow three named routes.
- Check the high-value rule before lower-priority rules so it always reaches manual review.
- Normalize every branch with the same output fields before merging the result.

# Spanish

## Title
Enrutador inteligente

## Summary
Envía cada petición por la ruta correcta usando reglas claras.

## Concept
Ramas con IF y Switch

## Scenario
Las peticiones entrantes necesitan un tratamiento diferente según su prioridad y valor.

## Task
Acepta una petición con priority y amount y envíala a standard, urgent o manual review.

## Requirements
- Usa ramas reales con un nodo IF o Switch.
- Envía todas las peticiones de alto valor a revisión manual.
- Devuelve un resultado normalizado desde cada rama.
- Incluye la ruta elegida y el ID original de la petición.

## Tips
- Empieza con campos de prueba para requestId, priority y amount.
- Escribe las tres condiciones de ruta antes de configurar las ramas.
- Un nodo Switch resulta útil cuando una entrada puede seguir tres rutas.
- Evalúa primero el alto valor para garantizar la revisión manual.
- Normaliza todas las ramas con los mismos campos antes de unir el resultado.
