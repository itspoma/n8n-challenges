---
{
  "id": "opp_34edf916-4282-4aba-a2d6-ab5ae32619c3",
  "locale": "es",
  "slug": "article-34edf916-4282-4aba-a2d6-ab5ae32619c3",
  "urlSlug": "automatizacion-de-la-baja-de-empleados-en-n8n-aprobaciones-y-registro-de-auditoria",
  "publishedAt": "2026-11-02T09:57:01.159Z",
  "title": "Automatización de la baja de empleados en n8n: aprobaciones y registro de auditoría",
  "subtitle": "Automatiza bajas de RR. HH. en n8n: pausa para aprobaciones con el nodo Wait, revoca sesiones y tokens, guarda un registro externo y prepara la puesta en producción.",
  "description": "Automatiza bajas de RR. HH. en n8n: pausa para aprobaciones con el nodo Wait, revoca sesiones y tokens, guarda un registro externo y prepara la puesta en producción.",
  "date": "2026-11-02",
  "sourcesCheckedAt": "2026-11-02T09:47:24.990Z",
  "tags": [
    "n8n",
    "Preparación para producción",
    "Guía"
  ],
  "coverImage": "/blog/es/article-34edf916-4282-4aba-a2d6-ab5ae32619c3/c5ea0be5a22839b18b76abf6a8be2db5f2a775712863582db362ece6ce63f5a9.webp",
  "coverAlt": "Llavero, reloj de arena en pausa y libro de registro sobre un escritorio, que representan la automatización de la baja en RR. HH.",
  "seo": {
    "title": "Automatización de la baja de empleados en n8n: aprobaciones y registro de auditoría",
    "description": "Automatiza bajas de RR. HH. en n8n: pausa para aprobaciones con el nodo Wait, revoca sesiones y tokens, guarda un registro externo y prepara la puesta en producción.",
    "keywords": []
  },
  "revision": "a23b750ec12c2494b817cf5a5e2f2b911c5c79c219e559d7c9aec452f26b1332"
}
---

## Automatización de la baja en RR. HH.: qué debe cubrir el workflow

La automatización de la baja de empleados en n8n es más fácil de diseñar a partir de una base de controles. Esta guía combina documentación de n8n, texto de controles y páginas de API de proveedores, y la composición es un diseño editorial nuestro. Nada de esto se ejecutó en una instancia de n8n. Los endpoints para deshabilitar cuentas en Entra, Google, Slack, Okta, GitHub y SAP deben comprobarse en la documentación de cada proveedor, y las normas legales o de conservación de registros de salidas varían según la jurisdicción y no se tratan aquí.

El control PS-4 de NIST SP 800-53 Rev 5.2.0, tal como lo reproduce el sitio independiente CSF Tools, abarca deshabilitar el acceso a los sistemas, revocar credenciales, recuperar bienes y conservar el acceso a la información que controlaba la persona. El plazo lo define cada organización. Una mejora del control menciona mecanismos automatizados que notifican al personal y deshabilitan el acceso, lo que respalda automatizar el proceso.

En los despidos con causa, la misma guía indica que actuar a tiempo es esencial y que las organizaciones pueden deshabilitar las cuentas antes de notificar a la persona. Eso afecta al orden de aprobaciones y notificaciones. El diagrama siguiente es el flujo que sugerimos, no un estándar validado.

![Flujo de baja sugerido (editorial): 1. Disparador; 2. Lista de sistemas; 3. Avisar a los responsables; 4. Espera de aprobación; 5. Revocar por sistema; 6. Escribir el registro; 7. Workflow de errores](/blog/es/article-34edf916-4282-4aba-a2d6-ab5ae32619c3/3faad2808a4b5454df71449b003f26b33c16272462a745fd3d50833ff90544b0.webp)

Sources: [PS-4: Personnel Termination – CSF Tools](<https://csf.tools/reference/nist-sp-800-53/r5/ps/ps-4/>)

## Pausa para aprobaciones con el nodo Wait

![Sobre detenido en una puerta con un reloj de arena, que representa el paso de aprobación con el nodo Wait de n8n](/blog/es/article-34edf916-4282-4aba-a2d6-ab5ae32619c3/5e5b7b56a014577b562bb4675dacd79e9063dcca215aa54a65bcd16d57ef18d4.webp)

Una ejecución se detiene en la puerta de aprobación y luego continúa o sigue una ruta de tiempo agotado.

[El nodo Wait de n8n](<https://n8n-challenges.app/es/blog/el-nodo-wait-de-n8n-gestion-de-reintentos-y-apis-con-limite-de-tasa>) puede pausar un workflow hasta que llegue una llamada a un webhook o el envío de un formulario, lo que encaja con los pasos de aprobación. Mientras está en pausa, descarga los datos de la ejecución a la base de datos. La página de documentación no indica versión ni edición para este comportamiento.

Con la opción On Webhook Call, cada ejecución obtiene una URL de reanudación única mediante $execution.resumeUrl, que puedes incluir en un correo o mensaje. En la automatización de la baja, una forma editorial de avisar a los responsables es enviar a cada uno un mensaje con la URL de esa ejecución, lo que encaja con la mejora de notificación automatizada de PS-4. Las solicitudes de reanudación pueden usar autenticación Basic, Header o JWT y una lista de IP permitidas, así que puedes limitar quién aprueba. Las ejecuciones parciales cambian la URL de reanudación, por lo que conviene probar con ejecuciones completas.

El ajuste Limit Wait Time reanuda el workflow tras un intervalo o a una hora fijada, de modo que puedes seguirlo con un nodo IF o Switch para crear una rama de tiempo agotado o escalado; ese patrón es una decisión de diseño nuestra, no una receta documentada. El blog de n8n de enero de 2026, escrito sobre human-in-the-loop con IA y no sobre bajas, recomienda revisar solo en los puntos de decisión irreversibles y añadir tiempos límite, escalado y registros de auditoría.

Creemos que las aprobaciones corresponden a decisiones de criterio, como excepciones o traspaso de datos, y que deshabilitar cuentas de forma rutinaria no debería esperar a que un responsable haga clic en un enlace.

Sources: [PS-4: Personnel Termination – CSF Tools](<https://csf.tools/reference/nist-sp-800-53/r5/ps/ps-4/>), [Wait | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait>), [Human in the loop automation: Build AI workflows that keep humans in control – n8n Blog](<https://blog.n8n.io/human-in-the-loop-automation/>)

## Revocar el acceso: sesiones, tokens y cuentas

![Cable desenchufado junto a una puerta cerrada con candado, que contrasta la revocación de sesiones con deshabilitar una cuenta en n8n](/blog/es/article-34edf916-4282-4aba-a2d6-ab5ae32619c3/4a03b408ebd2f5d6b7ce9faf2a8a6e2af4204c4414e318176f9a4c0584e0608e.webp)

Cerrar sesiones y deshabilitar la cuenta son dos acciones distintas.

Revocar el acceso tiene dos mitades por sistema: cerrar las sesiones o tokens activos y deshabilitar la cuenta. La tabla siguiente compara dos llamadas documentadas de sesión y token.

Microsoft Graph v1.0 revokeSignInSessions invalida los tokens de actualización y las cookies de sesión del navegador de un usuario. Necesita el permiso User.RevokeSessions.All y puede tardar unos minutos en surtir efecto. No cubre a los usuarios externos. La página se actualizó por última vez en julio de 2025.

El método tokens.delete de la Directory API del Admin SDK de Google Workspace elimina los tokens de acceso que un usuario emitió para una aplicación. Necesita el ámbito admin.directory.user.security y funciona por ID de cliente, así que hace falta una llamada por aplicación.

**Qué hacen y qué no hacen las dos llamadas de revocación**

| Llamada de API | Permiso o ámbito | No hace |
| --- | --- | --- |
| Microsoft Graph v1.0 revokeSignInSessions | User.RevokeSessions.All | Deshabilitar la cuenta; cubrir usuarios externos |
| Google Directory API tokens.delete | admin.directory.user.security | Suspender al usuario; cubrir más de una app por llamada |

Llamar a cualquiera de ellas desde un nodo HTTP Request de n8n es una inferencia nuestra, no algo que describan las páginas. Seríamos cautos a la hora de marcar una baja como completada solo tras una llamada de revocación.

Sources: [user: revokeSignInSessions - Microsoft Graph v1.0 | Microsoft Learn](<https://learn.microsoft.com/en-us/graph/api/user-revokesigninsessions?view=graph-rest-1.0>), [Method: tokens.delete](<https://developers.google.com/workspace/admin/directory/reference/rest/v1/tokens/delete?hl=zh-tw>)

Si todo un departamento va a ser responsable de este workflow, el Department Automation Bootcamp es, en nuestra opinión, la mejor formación práctica en n8n para ello: tu equipo de RR. HH. crea automatizaciones reales con tus propias herramientas y tu instancia de n8n. El enlace abre una página de este sitio, y las consultas se envían a través del enlace de LinkedIn que hay allí.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Mantén un registro de auditoría y gestiona los fallos

![Pila de papeles que se desvanece junto a un archivador robusto y una campana de alarma para el registro de auditoría y el workflow de errores de n8n](/blog/es/article-34edf916-4282-4aba-a2d6-ab5ae32619c3/522c5d71da30300ab80a4b97c4a3978d8f107cc6d20d2a76b75331fc08e2a500.webp)

El historial de ejecuciones se borra por defecto, así que el registro duradero vive en un almacén externo.

Para la automatización de la baja, el historial de ejecuciones de n8n es un mal registro de auditoría. Según la documentación de variables de entorno de n8n autoalojado, [las ejecuciones terminadas se eliminan por defecto tras 336 horas (14 días)](<https://n8n-challenges.app/es/blog/retencion-de-datos-de-ejecucion-en-n8n-lista-de-comprobacion-para-operaciones-en-alojamiento-propio>) o por encima de 10.000 ejecuciones, y las ejecuciones anotadas nunca se eliminan. Además, el guardado de ejecuciones puede configurarse para omitir las correctas, de modo que las bajas exitosas no aparecerían. Esa documentación no indica los límites de Cloud.

En su lugar, escribe cada decisión y resultado de API en un almacén externo. El blog de n8n de enero de 2026 dice que se registre cada decisión humana en un datastore, y nombra Postgres, Notion y Airtable, y cita a un responsable de seguridad, de forma autodeclarada, que prevé necesitar el registro en una revisión posterior a un incidente. Un tutorial de una consultora de n8n de junio de 2026 combina una aprobación en Slack, un nodo Wait y un registro de auditoría en PostgreSQL para solicitudes de acceso; no trata de bajas, así que úsalo solo como referencia de patrón.

En n8n puedes definir un [workflow de errores que empieza con un Error Trigger](<https://n8n-challenges.app/es/blog/formacion-en-n8n-para-equipos-un-estandar-compartido-de-gestion-de-errores>) y se ejecuta cuando falla una ejecución. El nodo Stop And Error fuerza un fallo para que ese workflow se ejecute, por ejemplo para avisar de una revocación fallida. Si el fallo está en el nodo disparador, no se incluyen el ID ni la URL de la ejecución.

En nuestra opinión, una revocación fallida merece un aviso a una persona designada, no un reintento silencioso.

Sources: [Human in the loop automation: Build AI workflows that keep humans in control – n8n Blog](<https://blog.n8n.io/human-in-the-loop-automation/>), [Buidling Self-Service IT Portal in n8n. Access Requests, Approvals & Auto Provisioning](<https://n8nlab.io/blog/n8n-workflow-automation-it-portal>), [Handle errors gracefully | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/handle-errors-gracefully>), [Manage execution data | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/manage-execution-data>), [Executions | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions>)

## Antes de ejecutarlo de verdad: acceso, secretos y gestión de errores

![Portapapeles con filas marcadas junto a una pequeña caja fuerte, que muestra las comprobaciones previas al lanzamiento de n8n para secretos y roles](/blog/es/article-34edf916-4282-4aba-a2d6-ab5ae32619c3/a7af3d41bdc1ff8e86ff5cde3640e8bc2400295091e3d17a7706d2b6e895bcf1.webp)

Una lista de comprobación previa al lanzamiento que cubre credenciales, roles y rutas de fallo.

El RBAC de n8n agrupa workflows y credenciales en proyectos con roles por proyecto. Está disponible en n8n Cloud (todos los planes) y en las ediciones autoalojadas Registered Community, Business y Enterprise. Mover un workflow o una credencial elimina el uso compartido existente. Los roles personalizados para acceso de mínimo privilegio solo están en n8n Cloud Enterprise y en Enterprise autoalojado, por lo que otros planes dependen de los roles integrados.

Los almacenes externos de secretos como AWS Secrets Manager, Azure Key Vault, GCP Secrets Manager, HashiCorp Vault, 1Password Connect e Infisical están disponibles en n8n Cloud Enterprise y en Enterprise autoalojado. Los secretos se resuelven solo en campos de credenciales. Los vaults por proyecto llegaron en n8n 2.11.0 y el comportamiento varía según la versión, así que comprueba la que ejecutas.

Esta lista de comprobación previa al lanzamiento para la automatización de la baja es una sugerencia nuestra, no un instrumento validado.

- [ ] Credenciales restringidas por proyecto o guardadas en un almacén externo de secretos
- [ ] Solo administradores designados pueden ver o editar el workflow
- [ ] Workflow de errores configurado y fallo forzado probado
- [ ] Ramas de tiempo agotado y de fallo probadas
- [ ] Ensayo completado con un usuario de prueba
- [ ] Las decisiones y los resultados de API llegan a un almacén externo

Sources: [Handle errors gracefully | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/handle-errors-gracefully>), [Organize work in projects | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects>), [Custom roles | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/create-custom-roles>), [Use external secret stores | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-credentials/use-external-secret-stores>)

¿Quieres una segunda opinión antes de que las bajas dependan de él? Nuestro Workflow Audit revisa tu instancia de n8n y tus workflows en cuanto a fiabilidad, seguridad y mantenibilidad, y es la mejor forma de que tu equipo acierte con credenciales, roles y gestión de fallos. El enlace abre una página de este sitio, y las consultas se envían a través del enlace de LinkedIn que hay allí.

**[Audita tus workflows de bajas](https://n8n-challenges.app/es/companies)**

Tags: n8n, Preparación para producción, Guía
