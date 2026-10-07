---
{
  "id": "opp_60be50b2-bcb3-47f1-ac44-79a01d30cd2a",
  "locale": "es",
  "slug": "article-60be50b2-bcb3-47f1-ac44-79a01d30cd2a",
  "urlSlug": "n8n-google-calendar-comprueba-la-disponibilidad-antes-de-reservar-una-reunion",
  "publishedAt": "2026-10-07T07:05:01.841Z",
  "title": "n8n Google Calendar: comprueba la disponibilidad antes de reservar una reunión",
  "subtitle": "Crea un paso de comprobación de disponibilidad en n8n Google Calendar que bloquea horarios duplicados y solo crea eventos si el horario está libre.",
  "description": "Crea un paso de comprobación de disponibilidad en n8n Google Calendar que bloquea horarios duplicados y solo crea eventos si el horario está libre.",
  "date": "2026-10-07",
  "sourcesCheckedAt": "2026-10-07T06:49:23.558Z",
  "tags": [
    "Integración de APIs",
    "Depuración de workflows",
    "Google Calendar",
    "Ejercicio"
  ],
  "coverImage": "/blog/es/article-60be50b2-bcb3-47f1-ac44-79a01d30cd2a/1ab2a771dad1309c2b5336338a3dd7aeff1a4fa66c3838597436c94c94ba580d.png",
  "coverAlt": "Una agenda abierta muestra un horario ocupado y otro libre antes de un paso de comprobación de disponibilidad en n8n Google Calendar.",
  "seo": {
    "title": "n8n Google Calendar: comprueba la disponibilidad antes de reservar una reunión",
    "description": "Crea un paso de comprobación de disponibilidad en n8n Google Calendar que bloquea horarios duplicados y solo crea eventos si el horario está libre.",
    "keywords": []
  },
  "revision": "94fdbf78163e0909a89e10756f7be9f252778fc495956b1c495fee1c833a6500"
}
---

## Qué vas a construir: el ejercicio de comprobación de disponibilidad

Este es un ejercicio editorial, no un caso de estudio publicado: una construcción práctica que puedes probar tú mismo dentro de tu propia instancia de n8n. El objetivo es un paso pequeño pero real de comprobación de disponibilidad en n8n Google Calendar: un workflow que recibe una solicitud de reserva, confirma si el horario solicitado está realmente libre y solo crea un evento de calendario cuando lo está. El nodo de Google Calendar de n8n incluye una operación dedicada, Calendar Availability, creada específicamente para comprobar si un horario está libre antes de que se ejecute cualquier acción de reserva.

Antes de empezar, necesitas una instancia de n8n en funcionamiento, una credencial de Google Calendar ya conectada en n8n y un calendario real sobre el que tengas permiso para hacer pruebas, ya que la operación Availability requiere elegir el calendario concreto que se va a comprobar como parámetro de configuración. Nosotros trataríamos esto primero como un pequeño workflow independiente, separado de cualquier formulario de reserva o interfaz de chatbot, de modo que el resultado de la disponibilidad se pueda ver por sí solo antes de conectar nada más.

- [ ] Una instancia de n8n en funcionamiento, Cloud o autoalojada
- [ ] Una credencial de Google Calendar conectada en n8n
- [ ] Un calendario de prueba en el que puedas añadir y eliminar eventos
- [ ] Permiso para comprobar la disponibilidad de ese calendario

Tres entradas determinan cada ejecución: una hora de inicio solicitada, una hora de fin solicitada y el ID del calendario que se va a comprobar. Para este ejercicio, defínelas explícitamente en lugar de depender de lo que envíe el disparador, ya que unas entradas explícitas y fijas hacen que la prueba sea repetible sobre el mismo calendario cada vez.

- Hora de inicio solicitada
- Hora de fin solicitada
- ID del calendario a comprobar
- Una zona horaria para ambas horas

Sources: [Google Calendar | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar>), [Calendar operations | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/calendar-operations>)

Si todavía no tienes una cuenta de n8n para probar esto, n8n Balloon Challenges enlaza al registro de n8n Cloud mediante un enlace de partner que abre la propia página de registro de n8n; desde ahí puedes abrir un nuevo workflow y seguir paso a paso la comprobación de disponibilidad de Google Calendar descrita arriba.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Paso a paso: comprobación de disponibilidad en n8n Google Calendar

![Cuatro objetos en secuencia muestran la captura de una solicitud, la comprobación de disponibilidad del calendario, la ramificación y la creación o notificación.](/blog/es/article-60be50b2-bcb3-47f1-ac44-79a01d30cd2a/f6ec9f944bd6fc8a2984329bdd6b388068b38449d47749c688a41b0e12f4b60a.png)

Cuatro objetos muestran las etapas del workflow de comprobación de disponibilidad: capturar, comprobar, ramificar y actuar.

Una vez que las entradas están listas, el propio workflow sigue cuatro etapas, que se muestran a continuación.

![Las cuatro etapas de un workflow de comprobación de disponibilidad: 1. Capturar la solicitud; 2. Comprobar disponibilidad; 3. Ramificar según el resultado; 4. Crear o notificar](/blog/es/article-60be50b2-bcb3-47f1-ac44-79a01d30cd2a/132a03acf524c46e93b205a9191b4b306320ee4eb13952247c515aefda3e69ff.png)

La etapa uno es un disparador que captura la solicitud de reserva: un nodo Webhook o Form que recibe la hora de inicio, la hora de fin y el ID del calendario, seguido de un nodo Edit Fields para normalizarlos en un formato coherente para el siguiente paso.

La etapa dos ejecuta el propio paso de comprobación de disponibilidad en n8n Google Calendar: la operación Calendar Availability, dirigida al calendario elegido, con Output Format configurado como Availability. Con esa configuración, el nodo devuelve si algún evento existente ya se superpone con el horario solicitado, que es, en la práctica, la forma de comprobar la disponibilidad de alguien en Google Calendar desde dentro de un flujo automatizado en lugar de abrir la aplicación de calendario a mano. Por debajo, la documentación de n8n describe esta operación como una llamada a la propia consulta free/busy de Google, que informa de los datos de disponibilidad para un conjunto de calendarios.

La etapa tres se ramifica en función de ese resultado mediante [un nodo IF o Switch](<https://n8n-challenges.app/es/blog/documentacion-del-nodo-switch-de-n8n-enrutar-elementos-correctamente>), la forma estándar en que n8n divide un camino de workflow en varios según una condición.

La etapa cuatro actúa según la rama: en el camino libre, una operación Event Create añade la reserva, de nuevo después de elegir el calendario de destino como parámetro. En el camino ocupado, resiste la tentación de simplemente terminar el workflow; envía al solicitante un mensaje o una hora alternativa en lugar de dejar que la solicitud desaparezca en silencio.

Sources: [Google Calendar | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar>), [Calendar operations | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/calendar-operations>), [Event operations | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations>), [API Reference | Google Calendar | Google for Developers](<https://developers.google.com/workspace/calendar/api/v3/reference?hl=fa>), [Split with conditionals | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/split-with-conditionals>)

Si tu equipo necesita construir automatizaciones fiables y con ramificaciones como esta comprobación de disponibilidad, en lugar de demos puntuales, nuestra formación Advanced / Developer Training en la página Para empresas forma a todo un equipo en lógica de ramificación, llamadas a API y gestión de errores usando vuestra propia instancia y datos de n8n.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Restricciones: zonas horarias, formato de salida y condiciones de carrera

Unas pocas restricciones determinan si este ejercicio se comporta de forma predecible. En primer lugar, las zonas horarias: configura [una zona horaria explícita](<https://n8n-challenges.app/es/blog/el-schedule-trigger-de-n8n-se-ejecuta-a-la-hora-equivocada-corrige-la-zona-horaria-y-el-horario-de-v>) tanto en la hora de inicio como en la de fin solicitadas, en lugar de depender de las expresiones predeterminadas del nodo basadas en $now, de modo que la misma prueba produzca el mismo resultado cada vez que la ejecutes.

En segundo lugar, importa el formato de salida que elijas en la operación Availability. Con Output Format configurado como Availability, el nodo informa de un simple resultado de superposición en lugar de la lista de eventos subyacente, lo que responde a cómo mostrar la disponibilidad en los datos de Google Calendar sin exponer los detalles completos del evento a lo que haya disparado la comprobación. Para este ejercicio, ese simple resultado de sí o no es suficiente, ya que el siguiente paso solo necesita decidir qué rama tomar.

En tercer lugar, las condiciones de carrera: un tutorial de la comunidad de n8n sobre la creación de flujos de reserva recomienda comprobar la disponibilidad justo antes de crear el evento, manteniendo ambos pasos lo más próximos posible, para reducir la ventana en la que dos solicitudes podrían ver el mismo horario como libre a la vez. Nosotros trataríamos un resultado 'libre' de esta comprobación como una respuesta puntual en el tiempo, no como un bloqueo del horario, de modo que una versión en producción de este workflow sigue necesitando su propia [protección contra reservas duplicadas](<https://n8n-challenges.app/es/blog/prevenir-acciones-api-duplicadas-en-webhooks-de-n8n>); esa recomendación procede del diseño de workflow propuesto en un blog de proveedor, no de un resultado probado o medido.

- Zona horaria explícita en las horas de inicio y fin
- Output Format configurado como Availability para una ramificación simple de sí/no
- Comprobación de disponibilidad ejecutada justo antes del paso de creación del evento

Sources: [Calendar operations | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/calendar-operations>), [Publish technical n8n tutorial with full code examples and screenshots - DEV Community](<https://dev.to/hashim_khan_cb87a5b9a3613/publish-technical-n8n-tutorial-with-full-code-examples-and-screenshots-1f01>)

## Criterios de finalización, solución de problemas y una solución sugerida

![Un portapapeles muestra una tarjeta de calendario ocupada rechazada y una tarjeta de calendario libre marcada como reservada.](/blog/es/article-60be50b2-bcb3-47f1-ac44-79a01d30cd2a/7879f33a1efb6b52c2e1a093c158e88cfc02064af8320ac988951f385984a445.png)

Un portapapeles muestra los dos casos de prueba que confirman que la comprobación funciona: ocupado bloqueado, libre reservado.

La finalización de este ejercicio tiene dos pruebas: una solicitud para un horario que ya está ocupado debe bloquearse en lugar de reservarse, y una solicitud para un horario realmente libre debe terminar con la cita reservada. Esa segunda expectativa coincide con el plan de pruebas que se plantea un tutorial de la comunidad sobre workflows de reserva en n8n, aunque describe una prueba propuesta, no un resultado que alguien haya verificado de forma independiente.

- [ ] El horario ocupado se rechaza o se dirige a la rama ocupada
- [ ] El horario libre crea un evento de calendario en el calendario correcto
- [ ] Ambas ramas envían alguna respuesta al solicitante
- [ ] Una entrada malformada o ausente se detecta antes de llegar al nodo Calendar

Fallos comunes que vale la pena comprobar: un ID de calendario ausente o incorrecto en la operación Availability o en Event Create, ya que ambas requieren ese parámetro explícitamente; un error de la API de Google Calendar que no se capture en absoluto; y una rama ocupada que se salte el paso de enviar alguna respuesta al solicitante. El mismo tutorial de la comunidad sugiere crear [un workflow de errores independiente en n8n](<https://n8n-challenges.app/es/blog/crea-un-workflow-de-errores-en-n8n-y-vinculalo-a-un-workflow-en-produccion>) para capturar fallos como una llamada fallida a la API del calendario. Creemos que merece la pena hacerlo incluso en un ejercicio de aprendizaje, ya que es la diferencia entre un workflow que falla de forma ruidosa y uno que falla de forma invisible.

Una solución sugerida, a grandes rasgos: un nodo disparador que captura la hora de inicio, la hora de fin, el ID del calendario y la zona horaria; una operación Calendar Availability con Output Format configurado como Availability; un nodo IF que ramifica según el resultado; una operación Event Create en el camino libre; y un paso de notificación en el camino ocupado, respaldado por un workflow de errores para todo lo que el nodo Calendar no pueda manejar. Constrúyelo, ejecuta ambos casos de prueba contra tu propio calendario, y habrás cubierto el núcleo de un verdadero paso de comprobación de disponibilidad en n8n Google Calendar en lugar de una simple demo de disparador a acción.

Sources: [Publish technical n8n tutorial with full code examples and screenshots - DEV Community](<https://dev.to/hashim_khan_cb87a5b9a3613/publish-technical-n8n-tutorial-with-full-code-examples-and-screenshots-1f01>), [Calendar operations | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/calendar-operations>), [Event operations | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations>)

Si tu equipo ya tiene un workflow de reservas o programación en producción, un Workflow Audit en nuestra página Para empresas revisa tu instancia y workflows de n8n exactamente para estos riesgos de fiabilidad, incluidas las ventanas de doble reserva y los errores no gestionados de la API del calendario.

**[Auditoría de tu workflow de reservas](https://n8n-challenges.app/es/companies)**

Tags: Integración de APIs, Depuración de workflows, Google Calendar, Ejercicio
