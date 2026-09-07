---
number: 9
slug: approval-gate
difficulty: advanced
time: 25–35 min
complexity: 4
color: #c6c9c7
ink: #1b2427
---

# English

## Title
Approval Gate

## Summary
Pause high-risk actions until a human makes the decision.

## Concept
Human-in-the-loop approval

## Scenario
Routine requests should move automatically, but risky actions need explicit human approval before anything happens.

## Task
Create a workflow where high-risk or high-value actions wait for a human decision before they continue.

## Requirements
- Let low-risk requests continue automatically.
- Pause high-risk requests for a real approval decision.
- Continue the action after approval.
- Stop rejected actions and record the reason.

## Tips
- Calculate a clear risk value before deciding whether approval is needed.
- Use an IF node so the low-risk path never waits for a reviewer.
- On the high-risk path, use a wait or approval mechanism that can resume the execution.
- Model approval and rejection as separate outcomes before the final action.
- Store the decision, reviewer response, and reason before ending either path.

# Spanish

## Title
Puerta de aprobación

## Summary
Pausa acciones de riesgo hasta que una persona tome la decisión.

## Concept
Aprobación human-in-the-loop

## Scenario
Las solicitudes rutinarias pueden avanzar solas, pero las acciones de riesgo necesitan aprobación humana explícita.

## Task
Crea un workflow en el que las acciones de alto riesgo o valor esperen una decisión humana antes de continuar.

## Requirements
- Permite que las solicitudes de bajo riesgo continúen automáticamente.
- Pausa las solicitudes de alto riesgo para una aprobación real.
- Continúa la acción cuando se apruebe.
- Detén las acciones rechazadas y registra el motivo.

## Tips
- Calcula un valor de riesgo claro antes de decidir si hace falta aprobación.
- Usa un nodo IF para que la ruta de bajo riesgo nunca espere a un revisor.
- En la ruta de riesgo usa un mecanismo de espera o aprobación que pueda reanudar la ejecución.
- Modela aprobación y rechazo como resultados separados antes de la acción final.
- Guarda la decisión, la respuesta y el motivo antes de terminar cada ruta.
