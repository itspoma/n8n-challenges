---
{
  "id": "opp_d5e2ea15-97c2-44e7-b3ee-98faea875a7c",
  "locale": "es",
  "slug": "article-d5e2ea15-97c2-44e7-b3ee-98faea875a7c",
  "urlSlug": "memoria-de-agentes-en-n8n-ejercicio-editorial-de-aislamiento-y-recuperacion",
  "publishedAt": "2026-10-22T15:01:30.544Z",
  "title": "Memoria de agentes en n8n: ejercicio editorial de aislamiento y recuperación",
  "subtitle": "Practica la memoria de agentes en n8n con sesiones en Postgres: comprueba la recuperación entre ejecuciones y qué documentación necesitas antes de borrar por sesión.",
  "description": "Practica la memoria de agentes en n8n con sesiones en Postgres: comprueba la recuperación entre ejecuciones y qué documentación necesitas antes de borrar por sesión.",
  "date": "2026-10-22",
  "sourcesCheckedAt": "2026-10-22T14:47:41.455Z",
  "tags": [
    "n8n",
    "Automatización con IA",
    "Aprendizaje práctico",
    "Ejercicio"
  ],
  "coverImage": "/blog/es/article-d5e2ea15-97c2-44e7-b3ee-98faea875a7c/bdc986957022bc1b64b80fa7a72c8d2d66a8257fd75e2d729fbad8bd7d705186.webp",
  "coverAlt": "Dos buzones separados contienen un zorro de cobre y una grulla violeta para representar sesiones de memoria de agentes en n8n.",
  "seo": {
    "title": "Memoria de agentes en n8n: ejercicio editorial de aislamiento y recuperación",
    "description": "Practica la memoria de agentes en n8n con sesiones en Postgres: comprueba la recuperación entre ejecuciones y qué documentación necesitas antes de borrar por sesión.",
    "keywords": []
  },
  "revision": "5eea800864bcfc50b9c8909993a65dd23827815b36c3c39fd43f215cbd074c34"
}
---

## Tu ejercicio de memoria de agentes en n8n

Este ejercicio editorial te propone comprobar la memoria de agentes en n8n entre ejecuciones independientes utilizando dos usuarios ficticios y Postgres Chat Memory. El objetivo es recuperar información dentro de la sesión correspondiente sin revelar el dato inventado de la otra sesión. El ejercicio no se ha ejecutado ni validado.

Parte de un flujo de chat de n8n que ya funcione y contenga un AI Agent y un modelo de chat configurado, además de credenciales de Postgres utilizables. n8n documenta Postgres Chat Memory como almacenamiento del historial de chat en una base de datos y remite a instrucciones de autenticación independientes. La configuración inicial de credenciales, [la creación del agente](<https://n8n-challenges.app/es/blog/tutorial-de-n8n-ai-agent-crea-tu-primer-agente>) y el despliegue en producción quedan fuera de este ejercicio.

La guía Production AI Playbook de n8n de 2026 recomienda identificadores de sesión por usuario para recordar interacciones entre ejecuciones. Creemos que merece la pena practicar la separación de sesiones antes de añadir comportamientos más elaborados al agente.

Sources: [n8n-docs/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat.md>), [Production AI Playbook: Complex Agent Patterns – n8n Blog](<https://blog.n8n.io/production-ai-playbook-complex-agent-patterns/>)

¿Necesitas un espacio de trabajo de n8n antes de empezar? Este enlace de afiliado abre la página de registro de n8n Cloud en el propio sitio de n8n.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Configura el nodo de memoria del agente en n8n y las entradas

![Dos llaves distintas y compartimentos de almacenamiento separados representan las entradas de sesión de Postgres Chat Memory.](/blog/es/article-d5e2ea15-97c2-44e7-b3ee-98faea875a7c/b224126ecdd0f646112049c88faa85540c96e5609ea4df35fedd4749d52337e9.webp)

Las llaves diferentes representan las sesiones ficticias configuradas en el almacenamiento de pruebas del ejercicio.

Para dotar de memoria con PostgreSQL a un agente de IA de n8n, utiliza Postgres Chat Memory. n8n documenta una clave de sesión configurable, una tabla de historial que se crea si no existe y una ventana de contexto medida en interacciones anteriores. Añade o revisa esa conexión de memoria, elige una tabla de pruebas exclusiva y desechable y registra la configuración.

Utiliza las siguientes entradas y restricciones propuestas para este ejercicio editorial. Procesa un solo elemento de entrada por ejecución, porque n8n documenta que las expresiones de los subnodos de memoria se resuelven con respecto al primer elemento de entrada. Mantén sin cambios la tabla, el modelo y la configuración de la ventana de contexto durante todo el ejercicio.

**Entradas ficticias sugeridas y ajustes fijos del ejercicio**

| Elemento | Valor sugerido | Propósito |
| --- | --- | --- |
| Clave de sesión de Alice | exercise-alice | Identificar la conversación de Alice |
| Clave de sesión de Bob | exercise-bob | Identificar la conversación de Bob |
| Dato inventado de Alice | La mascota de mi proyecto es un zorro de cobre. | Introducir el dato que Alice recuperará |
| Dato inventado de Bob | La mascota de mi proyecto es una grulla violeta. | Introducir el dato que Bob recuperará |
| Tabla de pruebas | Tabla exclusiva y desechable | Mantener separados los datos del ejercicio |
| Ventana de contexto | Registra el ajuste elegido | Mantener una comparación coherente |

Sources: [Postgres Chat Memory | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat>)

## Alterna sesiones entre ejecuciones independientes

![Sobres alternos de color cobre y violeta representan ejecuciones independientes para Alice y Bob.](/blog/es/article-d5e2ea15-97c2-44e7-b3ee-98faea875a7c/14e9036468cfee55760a134e404897aef9406d81a7ba3102c376d90b25843a16.webp)

Los sobres alternos muestran el patrón sugerido de volver a cada sesión en ejecuciones independientes.

Utiliza esta secuencia sugerida para examinar la memoria de agentes en n8n. Estos prompts y criterios de finalización son propuestas editoriales. Registra cada clave de sesión resuelta, identificador de ejecución, prompt y respuesta observada; no sustituyas una respuesta inesperada por la que esperabas ver.

1. Ejecuta el dato inventado de Alice con exercise-alice.
2. En una ejecución independiente, ejecuta el dato inventado de Bob con exercise-bob.
3. Vuelve a exercise-alice y pregunta: ¿Cuál es la mascota de mi proyecto?
4. Vuelve a exercise-bob en otra ejecución y haz la misma pregunta.
5. Pregunta en la sesión de Alice: ¿Cuál es la mascota del proyecto de Bob? Después pregunta en la sesión de Bob por la mascota de Alice, sin proporcionar ninguna de las respuestas.
6. Registra la recuperación del dato correspondiente, la falta de contexto y cualquier divulgación del dato de la otra sesión.

n8n advierte de que varios nodos Postgres Chat Memory comparten una instancia de memoria de forma predeterminada e indica que deben asignarse identificadores de sesión diferentes para tener instancias separadas. Las claves distintas son un mecanismo de configuración, no una autorización de usuarios autenticados ni una garantía contra la divulgación de información.

Sources: [n8n-docs/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat.md>), [Production AI Playbook: Complex Agent Patterns – n8n Blog](<https://blog.n8n.io/production-ai-playbook-complex-agent-patterns/>)

¿Diriges un equipo que está aprendiendo a configurar la memoria y comprobar la recuperación de información? Nuestro programa AI Agents with n8n lleva esa práctica a las herramientas, los datos y la instancia de n8n de tu equipo. El enlace abre la página Para empresas de este sitio.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Investiga por separado la recuperación y el historial visible

![Un marco expositor y un cajón de almacenamiento distinguen el historial visible del chat de la memoria del Agent.](/blog/es/article-d5e2ea15-97c2-44e7-b3ee-98faea875a7c/d08dcfefa75042d6da9eaf8b5a808397299418c22b8377626898815934332a40.webp)

El expositor y el cajón separan dos cuestiones: qué muestra el chat y qué contexto recibe el Agent.

Si las respuestas de la memoria del agente en n8n te sorprenden, utiliza estas comprobaciones de diagnóstico sugeridas antes de cambiar varios ajustes a la vez. A nuestro juicio, inspeccionar la clave de sesión resuelta es un primer paso mejor que reescribir el prompt.

**Comprobaciones sugeridas ante observaciones inesperadas**

| Observación | Qué inspeccionar primero | Qué registrar |
| --- | --- | --- |
| Aparece el dato de la otra sesión | Claves resueltas y reutilización accidental | Clave real en cada ejecución |
| Falta el dato de la propia sesión | Coherencia de la clave y ventana de contexto | Ajustes e interacciones intermedias |
| Se utilizó una entrada con varios elementos | Resolución de expresiones sobre el primer elemento | Repetición con un solo elemento de entrada |

El historial visible del chat requiere una comprobación aparte. En la instantánea de Chat Trigger de la rama master citada aquí, sin fijar a una revisión concreta y cuya versión predeterminada del nodo es 1.5, restaurar el historial del widget de chat es distinto de proporcionar memoria al Agent. La indicación de su editor también exige conectar memoria al disparador al restaurar el historial desde la memoria; esta instantánea no establece el comportamiento de todas las versiones publicadas.

Sources: [Postgres Chat Memory | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat>), [n8n-docs/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat.md>), [n8n/packages/@n8n/nodes-langchain/nodes/trigger/ChatTrigger/ChatTrigger.node.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/%40n8n/nodes-langchain/nodes/trigger/ChatTrigger/ChatTrigger.node.ts>)

## Documenta los requisitos previos al borrado y termina el ejercicio

![Una goma de borrar sin usar junto a un cajón cerrado representa la comprobación del alcance del borrado antes de modificar la memoria.](/blog/es/article-d5e2ea15-97c2-44e7-b3ee-98faea875a7c/47028680a9553ad716a43a54f48e38c357f3692de903abcbf04eda5a8c5c76fc.webp)

La goma sin usar mantiene el borrado en la fase de preparación documental mientras su alcance sigue sin resolverse.

Limita el borrado a una tarea de preparación documental. n8n documenta operaciones de Chat Memory Manager para recuperar, insertar y borrar mensajes, incluidos los últimos N mensajes o todos ellos. La documentación de Chat Memory Manager citada aquí no establece un procedimiento completo de borrado por sesión en Postgres, un límite de autorización ni un método de verificación. Por separado, la documentación general del nodo Postgres advierte de que Delete sin una condición de selección de filas elimina todas las filas; no es una receta para el esquema de memoria.

Antes de intentar borrar, obtén la documentación correspondiente a tu versión que se enumera a continuación. Mantendríamos el borrado bloqueado hasta que la selección de sesión y la verificación fueran explícitas.

- [ ] Busca instrucciones para conectar Chat Memory Manager a la memoria de Postgres prevista.
- [ ] Documenta cómo seleccionar y autorizar la sesión exacta.
- [ ] Confirma el alcance de la operación de borrado.
- [ ] Documenta cómo verificar el borrado y confirmar que la otra sesión permanece intacta.

Completa el ejercicio conservando los registros de ambos usuarios, marcando cada comportamiento objetivo como observado o fallido y anotando las preguntas sin resolver. Reflexiona sobre lo observado frente a lo que sigue sin demostrarse: este pequeño ejercicio no establece garantías de seguridad en producción, persistencia tras reinicios, duración de la retención, eliminación de copias de seguridad ni almacenamiento duradero.

Sources: [Chat Memory Manager | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md>)

Obtén ayuda práctica para revisar la configuración de memoria y los límites entre sesiones de tu equipo con nuestro Workflow Audit, que revisa vuestra instancia de n8n y vuestros flujos en cuanto a fiabilidad, seguridad y facilidad de mantenimiento. El enlace abre la página Para empresas de este sitio.

**[Revisa la memoria de tus flujos](https://n8n-challenges.app/es/companies)**

Tags: n8n, Automatización con IA, Aprendizaje práctico, Ejercicio
