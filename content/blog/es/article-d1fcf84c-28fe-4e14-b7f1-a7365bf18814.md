---
{
  "id": "opp_d1fcf84c-28fe-4e14-b7f1-a7365bf18814",
  "locale": "es",
  "slug": "article-d1fcf84c-28fe-4e14-b7f1-a7365bf18814",
  "urlSlug": "como-usar-n8n-crea-prueba-y-publica-tu-primer-flujo-con-webhook",
  "title": "Cómo usar n8n: crea, prueba y publica tu primer flujo con Webhook",
  "subtitle": "Aprende a usar n8n creando un endpoint de saludo con Webhook, Edit Fields y Respond to Webhook: pruébalo, publícalo, depúralo y compártelo con tu equipo.",
  "description": "Aprende a usar n8n creando un endpoint de saludo con Webhook, Edit Fields y Respond to Webhook: pruébalo, publícalo, depúralo y compártelo con tu equipo.",
  "date": "2026-09-23",
  "sourcesCheckedAt": "2026-09-21T16:00:05.207Z",
  "tags": [
    "n8n",
    "Webhooks",
    "Tutorial"
  ],
  "coverImage": "/blog/es/article-d1fcf84c-28fe-4e14-b7f1-a7365bf18814/ebd905ab0b1deb39f0b9033632573e1314705c2d52e81a71f7d67e0e61deb7f8.png",
  "coverAlt": "Un buzón recibe una petición y devuelve un saludo, mostrando cómo usar n8n en un flujo con webhook",
  "seo": {
    "title": "Cómo usar n8n: crea, prueba y publica tu primer flujo con Webhook",
    "description": "Aprende a usar n8n creando un endpoint de saludo con Webhook, Edit Fields y Respond to Webhook: pruébalo, publícalo, depúralo y compártelo con tu equipo.",
    "keywords": []
  },
  "revision": "6c63e804d903f6b147e17647276ced25a4debd3bdf3b9229bde0fff4613162b0"
}
---

## Cómo usar n8n: qué vas a crear y qué necesitas

La forma más rápida de aprender a usar n8n es construir algo pequeño. En este tutorial crearás un endpoint similar a una API: alguien envía una petición a una dirección web y tu flujo devuelve un saludo corto. Usa tres nodos: Webhook, Edit Fields (Set) y Respond to Webhook. Después lo pruebas, lo publicas y lo preparas para un equipo.

Una duda habitual de quien empieza es qué es en la práctica un flujo de n8n, y el significado del término es sencillo. Es una cadena de nodos. Un disparador inicia una ejecución, los nodos intermedios dan forma a los datos y un nodo final hace algo con ellos. Aquí el disparador es una petición HTTP entrante y el resultado vuelve a quien la envió.

Necesitas una instancia de n8n, ya sea n8n Cloud o autoalojada. La documentación de n8n indica que, si te autoalojas en localhost, tienes que ejecutar n8n en modo túnel antes de que el nodo Webhook pueda recibir peticiones. Este tutorial no cubre los comandos del túnel; consúltalos en la documentación de autoalojamiento de n8n. También necesitarás un terminal con curl, u otro cliente HTTP, para enviar peticiones de prueba.

Un apunte antes de empezar: estos pasos proceden de la documentación oficial de n8n. No se han probado de primera mano para este artículo.

Sources: [Workflow development | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/workflow-development>), [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/common-issues>)

¿Quieres seguir el tutorial desde cero? Puedes construir este flujo en un nuevo espacio de trabajo de n8n Cloud. Es un enlace de afiliado que abre la página de registro de n8n.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Pasos 1-3: construye la cadena Webhook, Edit Fields y Respond to Webhook

Aprender a usar n8n empieza por construir el flujo en orden, desde el disparador, que aquí es el nodo Webhook que inicia el flujo. La configuración de credenciales para las opciones de autenticación del nodo Webhook se explica en otra página de la documentación.

El paso de Edit Fields viene con una advertencia. La receta documentada de Edit Fields para esto usa el modo de respuesta When Last Node Finishes, no Respond to Webhook. Los pasos siguientes aplican la misma configuración de campos a este flujo, así que trátalo como una sugerencia y comprueba el resultado al probar.

1. Añade un nodo Webhook y elige una opción de autenticación (Basic, Header, JWT o ninguna).
2. En el nodo Webhook, configura Respond como Using Respond to Webhook node.
3. Conecta un nodo Edit Fields (Set). Añade un campo String con un nombre y un valor de saludo, y activa Keep Only Set.
4. Conecta un nodo Respond to Webhook al final. Se ejecuta una vez, con el primer elemento entrante.

Sources: [Webhook | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook>), [Respond to Webhook | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook>), [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/common-issues>)

## Pasos 4-5: prueba con la URL de test y luego publica

![Una etiqueta con cronómetro, un sello estampando un lacre y un cajón con fichas de ejecuciones sobre un banco de trabajo.](/blog/es/article-d1fcf84c-28fe-4e14-b7f1-a7365bf18814/dc1af330ec2aa4460c83b30fa21662b5ea5d3fe798be0a8ac2a10c116a888d9c.png)

Secuencia ilustrativa: probar, publicar y luego revisar las ejecuciones.

[Empieza con la URL de prueba y publica solo cuando recibas la respuesta que esperas](<https://n8n-challenges.app/es/blog/publica-un-webhook-trigger-en-n8n-de-la-url-de-prueba-a-resolver-los-404>). El diagrama muestra el orden que debes seguir.

**De la petición de prueba al endpoint en vivo**

1. **Escuchar**: Selecciona Listen for test event en el nodo Webhook.
2. **Enviar**: Llama a la URL de prueba con curl dentro de la ventana de 120 segundos.
3. **Comprobar**: Confirma que vuelve el saludo y que los datos aparecen en el editor.
4. **Publicar**: Guarda y publica el flujo para que n8n registre el webhook de producción.
5. **Monitorizar**: Llama a la URL de producción y revisa las ejecuciones en la pestaña Executions.

Parte de aprender a usar n8n es saber que los datos de producción no aparecen en el editor, así que revisa la pestaña Executions para ver las ejecuciones en vivo. Si van a llamar al endpoint personas ajenas a tu equipo, sugerimos activar la opción de autenticación del paso 1 antes de publicar.

Sources: [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/common-issues>), [Webhook | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook>), [Workflow development | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/workflow-development>)

¿Estás incorporando a un equipo que necesita crear sus primeros endpoints como este? El programa Build Your First 5 Automations forma a un equipo en su propia instancia de n8n y con sus propias herramientas. El enlace abre una página de este sitio, donde las consultas se envían por LinkedIn.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Solución de problemas habituales con webhooks

[La mayoría de los problemas en esta fase se deben a tiempos, errores o tamaño de la petición](<https://n8n-challenges.app/es/blog/el-webhook-de-n8n-no-funciona-lista-de-comprobacion-paso-a-paso-para-depurarlo>). La tabla recoge las causas documentadas, con nuestras sugerencias de qué probar.

**Síntomas habituales de webhooks y causas documentadas**

| Síntoma | Causa probable | Qué probar |
| --- | --- | --- |
| La petición de prueba no se captura | Se cerró la ventana de escucha de 120 segundos | Selecciona Listen for test event de nuevo y reenvía |
| Respuesta HTTP 500 | El flujo falló antes de ejecutar Respond to Webhook | Abre la ejecución fallida y corrige el nodo que dio error |
| HTTP 524 en n8n Cloud | Sin respuesta en 100 segundos (timeout de Cloudflare) | Responde antes o acorta el trabajo previo a la respuesta |
| Petición grande rechazada | Carga útil por encima del límite predeterminado de 16MB | Autoalojado: sube el límite con N8N_PAYLOAD_SIZE_MAX |

Sources: [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/common-issues>), [Respond to Webhook | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook>), [Webhook | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook>)

## Cuando un equipo depende de ello: proyectos, roles y credenciales

![Caja de herramientas de proyecto compartido con flujos y llaves de credenciales a la que acceden compañeros con distintos roles de n8n](/blog/es/article-d1fcf84c-28fe-4e14-b7f1-a7365bf18814/9e1c8a2cb76f4791e0db128a6015f1fca4fc4d552321ff71640b18b2c0eafc16.png)

Ilustración conceptual de un proyecto compartido de n8n con roles y credenciales.

Según la documentación de n8n, el RBAC y los proyectos están disponibles en todos los planes de n8n Cloud y en las ediciones autoalojadas Registered Community, Business y Enterprise. Los proyectos agrupan flujos y credenciales y dan a cada usuario un rol en cada proyecto. El número de proyectos y roles depende de tu plan.

Sugerimos construir un flujo compartido dentro de un proyecto de equipo y no en un espacio personal. [Ten cuidado al mover flujos o credenciales entre proyectos](<https://n8n-challenges.app/es/blog/variables-de-entorno-y-credenciales-de-n8n-checklist-para-una-instancia-compartida>): el traslado elimina todo el uso compartido existente. Un flujo también puede dejar de funcionar si las credenciales que necesita no están disponibles en el nuevo proyecto.

- [ ] Crea o elige un proyecto compartido para el flujo
- [ ] Asigna a cada compañero un rol en ese proyecto
- [ ] Comprueba que las credenciales del flujo están disponibles en el proyecto antes de moverlo
- [ ] Vuelve a compartir todo lo que perdió acceso tras el traslado

Sources: [Organize work in projects | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects>)

¿Eres responsable de la configuración de n8n de un equipo? Un Workflow Audit revisa tu instancia y tus flujos en cuanto a fiabilidad, seguridad y mantenibilidad. El enlace abre una página de este sitio, donde las consultas se envían por LinkedIn.

**[Audita los webhooks de tu equipo](https://n8n-challenges.app/es/companies)**

Tags: n8n, Webhooks, Tutorial
