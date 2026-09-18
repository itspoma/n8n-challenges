---
{
  "id": "opp_c06d02cf-b653-48a1-bb17-7e09c017b8bf",
  "locale": "es",
  "slug": "article-c06d02cf-b653-48a1-bb17-7e09c017b8bf",
  "urlSlug": "crea-un-workflow-de-errores-en-n8n-y-vinculalo-a-un-workflow-en-produccion",
  "title": "Crea un workflow de errores en n8n y vincúlalo a un workflow en producción",
  "subtitle": "Tutorial paso a paso para crear un workflow de errores en n8n con Error Trigger, vincularlo en los ajustes, probarlo y resolver campos ausentes.",
  "description": "Tutorial paso a paso para crear un workflow de errores en n8n con Error Trigger, vincularlo en los ajustes, probarlo y resolver campos ausentes.",
  "date": "2026-09-18",
  "sourcesCheckedAt": "2026-09-18T11:22:33.830Z",
  "tags": [
    "n8n",
    "Preparación para producción",
    "Depuración de workflows",
    "Tutorial"
  ],
  "coverImage": "/blog/es/article-c06d02cf-b653-48a1-bb17-7e09c017b8bf/345127eabe7c409b6bcba6ac9d53d72b24ca982ded4dd7d04077358d7ee1aa34.png",
  "coverAlt": "Cinta de paquetes detenida con un cordón de emergencia tirado que hace sonar una campana, representando la alerta de un workflow de errores de n8n",
  "seo": {
    "title": "Crea un workflow de errores en n8n y vincúlalo a un workflow en producción",
    "description": "Tutorial paso a paso para crear un workflow de errores en n8n con Error Trigger, vincularlo en los ajustes, probarlo y resolver campos ausentes.",
    "keywords": []
  },
  "revision": "e3aa85e3ff86a60cb3307042ad4125df3f32e0a1b8e9c2a813b55d2b53fa24cc"
}
---

## El objetivo y lo que necesitas antes de empezar

El objetivo de este tutorial es un único workflow de alertas compartido: cuando una automatización en producción falla, un workflow de errores de n8n se ejecuta automáticamente y avisa a tu equipo de qué se ha roto. Lo construyes una vez y lo vinculas a todos los workflows que te importan.

El nodo Error Trigger es el punto de entrada para esto. Cuando otro workflow vinculado falla, el Error Trigger recibe los detalles del fallo y ejecuta tu workflow de errores. La documentación de n8n es explícita: un workflow de errores debe empezar con ese nodo, y el mismo workflow de errores se puede reutilizar en muchos workflows.

Antes de empezar, ten tres cosas listas: una instancia de n8n que puedas editar, un workflow guardado que se ejecute automáticamente y que quieras proteger, y un canal de notificación con credenciales que funcionen, como un nodo de chat o de correo.

- [ ] Una instancia de n8n donde puedas crear y guardar workflows
- [ ] Un workflow de producción que se ejecute con un trigger, no solo a mano
- [ ] Un nodo de notificación con credenciales ya probadas
- [ ] Permiso para abrir los ajustes de ese workflow

Sources: [Error Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger>), [Handle errors gracefully | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/handle-errors-gracefully>)

## Crea y vincula el workflow de errores, paso a paso

![Cuatro objetos en secuencia que muestran crear, notificar, vincular y probar un workflow de errores](/blog/es/article-c06d02cf-b653-48a1-bb17-7e09c017b8bf/80ac1075741e6ad45f911262606889d40f00d41db25f3f6a683a1c9821ca1cf5.png)

Secuencia conceptual de los cuatro pasos del tutorial.

Cuatro pasos te llevan de un lienzo vacío a un sistema de alertas verificado. La lista ordenada de abajo es el núcleo de este tutorial; los párrafos posteriores explican los detalles que suelen hacer tropezar.

1. Crea un workflow nuevo, añade el Error Trigger como su primer nodo y guárdalo con un nombre claro como Error Handler.
2. Añade tu nodo de notificación después del trigger y mapea los campos del error en el mensaje.
3. Abre el workflow de producción, ve a Options y luego a Settings, selecciona tu Error Handler en Error workflow y guarda.
4. Añade un nodo Stop And Error a una rama del workflow de producción, deja que se ejecute automáticamente y confirma que llega la alerta.

En el segundo paso, mapea los datos que te da el Error Trigger. El payload de ejemplo documentado incluye el id y la url de la ejecución, el mensaje y el stack del error, lastNodeExecuted, el modo de ejecución, y el id y el nombre del workflow. Como sugerencia editorial, pon el nombre del workflow, su id y lastNodeExecuted en la primera línea de tu alerta, para que quien esté de guardia pueda triar antes de abrir n8n.

El tercer paso es la vinculación en sí. En el workflow que quieres proteger, elige Options, luego Settings, después selecciona tu workflow de errores en el ajuste Error workflow y guarda. Ese ajuste se describe en la documentación de ajustes de workflow como la elección de un workflow que se dispara si el workflow actual falla. La documentación de n8n no indica números de versión para estas páginas, así que el texto de los menús puede variar según tu edición.

El cuarto paso es la verificación. El nodo Stop And Error fuerza que las ejecuciones fallen en las circunstancias que tú elijas y dispara el workflow de errores, lo que lo convierte en una forma limpia de probar el montaje sin esperar a una caída real.

Sources: [Error Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger>), [Handle errors gracefully | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/handle-errors-gracefully>), [Configure workflow settings | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/configure-workflow-settings>)

## Resultados esperados y cómo leerlos

![Paquete abierto con algunas ranuras llenas y dos vacías, mostrando campos del payload del Error Trigger que pueden faltar](/blog/es/article-c06d02cf-b653-48a1-bb17-7e09c017b8bf/61e6a5c15fe26d404c45af0213e6777ee5f3f45edf498f208b0afdf36d352cd7.png)

Vista conceptual de qué detalles del fallo llegan y cuáles pueden faltar.

Tras una ejecución automática fallida, tu workflow de errores de n8n se ejecuta solo y llega tu notificación. Abre Executions para confirmarlo: puedes revisar las ejecuciones de un único workflow o de todos los workflows a los que tienes acceso, y también puedes activar el log streaming.

No todos los campos están siempre presentes, y eso es un comportamiento documentado, no un fallo. El id y la url de la ejecución requieren que la ejecución se haya guardado en la base de datos, y no aparecen cuando el propio nodo trigger del workflow principal da error. El campo retryOf solo aparece en ejecuciones reintentadas.

La tabla de abajo resume qué esperar de cada parte del payload cuando diseñes tu mensaje de alerta.

**Campos que recibe el Error Trigger y cuándo son fiables**

| Campo | Qué te indica | Cuándo puede faltar |
| --- | --- | --- |
| execution.id | Qué ejecución ha fallado | La ejecución no se guardó en la base de datos |
| execution.url | Enlace directo a la ejecución | El nodo trigger del workflow principal dio error |
| execution.error | Mensaje y stack | Desconocido |
| execution.lastNodeExecuted | Dónde se detuvo | Desconocido |
| execution.retryOf | La ejecución original reintentada | Solo presente en reintentos |
| workflow.id y name | Qué automatización se ha roto | Desconocido |

Sources: [Error Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger>), [Handle errors gracefully | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/handle-errors-gracefully>)

¿Listo para practicarlo en un workflow que se resiste? En el reto avanzado Que los pedidos del restaurante sigan adelante recuperas todos los pedidos válidos de una API paginada que limita peticiones y falla de forma inesperada, con reintentos, validación y un workflow de errores, construido en tu propio entorno de n8n.

**[Prueba el reto de pedidos](https://n8n-challenges.app/es/challenges/unstable-restaurant-orders)**

## Solucionar un workflow de errores de n8n que no dice nada

La sorpresa más habitual es el silencio durante las pruebas. La documentación indica que [no puedes probar los workflows de errores ejecutando un workflow manualmente](<https://n8n-challenges.app/es/blog/probar-flujos-de-errores-de-n8n-de-forma-segura>): el Error Trigger se dispara cuando falla una ejecución automática. Deja que el schedule, el webhook u otro trigger hagan el trabajo en lugar de pulsar Execute.

Si llegan las alertas pero el enlace a la ejecución no funciona, revisa los ajustes de retención en el mismo modal de ajustes, que controlan si se guardan las ejecuciones fallidas de workflows publicados. En n8n autoalojado, el pruning a nivel de instancia también elimina los datos de ejecución tras una antigüedad configurable, con un valor por defecto documentado de 336 horas.

**Del fallo a una alerta triada**

1. **Falla una ejecución automática**: Una ejecución programada o lanzada por webhook da error en un nodo.
2. **Se dispara el Error Trigger**: El workflow de errores vinculado arranca y recibe los detalles del fallo.
3. **Se compone el mensaje**: El nombre del workflow, su id y el último nodo ejecutado entran en el texto de la alerta.
4. **Se avisa al equipo**: El nodo de notificación entrega la alerta al canal que hayas elegido.
5. **Se revisa la ejecución**: Alguien abre Executions para inspeccionar la ejecución fallida.

Decide también qué fallos merecen la atención de una persona. La documentación del nodo HTTP Request describe cómo [activar Retry on Fail con Max Tries y Wait Between Tries](<https://n8n-challenges.app/es/blog/reintentar-de-forma-segura-solicitudes-http-fallidas-en-n8n>) en milisegundos, algo útil frente a respuestas de límite de tasa; así los fallos pasajeros se recuperan sin avisar a nadie.

Un tutorial antiguo del blog de n8n escrito por Tanay Pant, publicado en 2020 y construido con n8n 0.111.0, combina un Error Trigger con nodos de notificación y un segundo workflow roto a propósito. Los nombres de nodos y la interfaz han cambiado desde entonces, así que trata ese artículo como un patrón ilustrativo y no como pasos actuales.

Sources: [Error Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger>), [Configure workflow settings | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/configure-workflow-settings>), [Executions | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions>), [Common Issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/common-issues>), [Creating error workflows in n8n – n8n Blog](<https://blog.n8n.io/creating-error-workflows-in-n8n/>)

## Prácticas de equipo y buenas prácticas de n8n en la gestión de errores

Cuando el patrón funcione, conviértelo en una convención y no en una costumbre personal. Como un mismo workflow de errores de n8n puede servir a muchos workflows, acordad en equipo que toda automatización que pase a producción lleve el Error Handler compartido vinculado antes de activarse, y añadid esa línea a vuestra [checklist de revisión](<https://n8n-challenges.app/es/blog/lista-de-comprobacion-para-probar-workflows-de-n8n-que-verificar-antes-de-usarlos-de-verdad>).

Esa única convención es el núcleo de las buenas prácticas de n8n en la gestión de fallos: un handler con dueño, vinculado de forma deliberada y probado antes del lanzamiento. La documentación de n8n no mide cuánto más rápido resuelven los incidentes los equipos después, así que trata el beneficio como claridad operativa y no como una métrica probada.

- [ ] Un workflow Error Handler con nombre y con dueño en el equipo
- [ ] Workflow de errores seleccionado en los ajustes antes del lanzamiento
- [ ] Una prueba deliberada con Stop And Error registrada para cada workflow crítico
- [ ] Retry on Fail revisado en las llamadas HTTP salientes

Sources: [Handle errors gracefully | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/handle-errors-gracefully>)

Si eres responsable de un equipo que ya opera automatizaciones de las que dependen otras personas, la página Para empresas de este sitio describe formación a medida en n8n impartida sobre vuestra propia instancia, herramientas y datos, incluida una n8n Advanced / Developer Training adecuada para estandarizar la gestión de fallos en todo un departamento.

**[Forma a tu equipo en gestión de errores](https://n8n-challenges.app/es/companies)**

Tags: n8n, Preparación para producción, Depuración de workflows, Tutorial
