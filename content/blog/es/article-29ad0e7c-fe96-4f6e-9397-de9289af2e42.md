---
{
  "id": "opp_29ad0e7c-fe96-4f6e-9397-de9289af2e42",
  "locale": "es",
  "slug": "article-29ad0e7c-fe96-4f6e-9397-de9289af2e42",
  "urlSlug": "integracion-de-idoc-de-sap-componentes-de-recepcion-y-conciliacion-en-n8n",
  "publishedAt": "2026-10-26T18:16:36.859Z",
  "title": "Integración de IDoc de SAP: componentes de recepción y conciliación en n8n",
  "subtitle": "Configura los componentes Webhook documentados de n8n para integrar IDoc de SAP y define cómo tu intermediario distinguirá la recepción del resultado del procesamiento en SAP.",
  "description": "Configura los componentes Webhook documentados de n8n para integrar IDoc de SAP y define cómo tu intermediario distinguirá la recepción del resultado del procesamiento en SAP.",
  "date": "2026-10-26",
  "sourcesCheckedAt": "2026-10-26T18:01:11.985Z",
  "tags": [
    "Integración con SAP",
    "Webhooks",
    "Tutorial"
  ],
  "coverImage": "/blog/es/article-29ad0e7c-fe96-4f6e-9397-de9289af2e42/966ec07a570c4ac43fe70fbc2d34b9d1d8c1dc2560c7474b3b9465f733ca1d72.webp",
  "coverAlt": "Un sobre y un comprobante de recepción en una bandeja rosa están separados de un sello y un documento terminado.",
  "seo": {
    "title": "Integración de IDoc de SAP: componentes de recepción y conciliación en n8n",
    "description": "Configura los componentes Webhook documentados de n8n para integrar IDoc de SAP y define cómo tu intermediario distinguirá la recepción del resultado del procesamiento en SAP.",
    "keywords": []
  },
  "revision": "c8feb2d3c693aceb37dc9be0165dfe5ecb52ac8b3924f4e2db111409835ec822"
}
---

## Define los límites de la integración de IDoc de SAP

Para integrar IDoc de SAP mediante un intermediario existente, la recepción HTTP y el resultado del procesamiento en SAP deben tratarse por separado. n8n documenta un modo de respuesta inmediata de Webhook que devuelve HTTP 200 mientras la ejecución continúa; esa respuesta por sí sola no acredita ni la persistencia ni la finalización de la operación de negocio en SAP.

El objetivo es configurar los componentes de recepción documentados de n8n y preparar un contrato de conciliación. Este tutorial aborda componentes, no una integración de SAP completa y ejecutable: la documentación proporcionada no define el puente con el intermediario, el endpoint de resultados, el esquema del registro, las garantías frente a duplicados ni la implementación de respuestas ante fallos.

Antes de seguir los pasos, identifica el producto SAP, la versión y el despliegue que utilizas, el intermediario ya configurado, su contrato de entrega HTTP autenticada y su interfaz de referencia para los resultados. También necesitas un espacio de trabajo de n8n y, si utilizas el registro propuesto, una conexión a Postgres configurada. Son requisitos previos que debes resolver con la persona responsable de la integración.

En nuestra opinión, acordar qué cuenta como recepción y qué cuenta como finalización de la operación de negocio es la primera decisión más útil.

Sources: [skills/skills/n8n-node-configuration-official/references/WEBHOOK_NODES.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-node-configuration-official/references/WEBHOOK_NODES.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md>), [skills/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md>)

## 1. Define el contrato del mensaje y del registro

![Un registro abierto separa fichas de sobres de fichas de documentos, con muescas coincidentes en una pareja.](/blog/es/article-29ad0e7c-fe96-4f6e-9397-de9289af2e42/311f68f39e2ba57968ca764afb825599522046ca122b3c0b466cf31ce986523a.webp)

El registro propuesto mantiene separadas las recepciones y los resultados de procesamiento, conservando su correlación.

Utiliza lo siguiente como ejemplo de contrato propuesto para este artículo, no como un payload estándar de SAP ni como un esquema de base de datos listo para usar. Pide a la persona responsable del intermediario que confirme qué identificadores permanecen estables entre intentos de entrega y cómo se correlacionan los resultados con las recepciones.

**Campos sugeridos para acordar con la persona responsable del intermediario**

| Campo | Propósito propuesto |
| --- | --- |
| source_system | Identificar el sistema de origen |
| idoc_number | Incluir la referencia del IDoc de origen |
| business_reference | Identificar el pedido relacionado |
| correlation_id | Vincular la recepción con el resultado |
| receipt_state | Registrar la recepción local por separado |
| processing_outcome | Almacenar el resultado de referencia |
| outcome_timestamp | Registrar cuándo se aplica ese resultado |

El nodo Postgres de n8n documenta operaciones de selección, inserción y actualización. Recomendamos mantener separados el estado de recepción y el de procesamiento para que una entrega aceptada no se convierta silenciosamente en una operación de negocio completada.

Sources: [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md>)

## 2. Configura los componentes Webhook de n8n

Sigue estos pasos documentados para los componentes una vez acordado el contrato de entrega del intermediario. La estructura exacta de los [parámetros de autenticación](<https://n8n-challenges.app/es/blog/autenticacion-de-webhooks-en-n8n-header-basic-o-jwt>) depende de la versión de n8n; las referencias proporcionadas no especifican una versión ni un plan aplicables.

1. Añade un disparador Webhook y selecciona la autenticación integrada Basic o Header con credenciales que coincidan con las del emisor.
2. Configura el modo de respuesta de Webhook para utilizar el nodo Respond to Webhook.
3. Añade un nodo Respond to Webhook después de los nodos que proporcionan los datos de su respuesta.
4. Registra el webhook de prueba mediante Listen for Test Event o Execute workflow y envía después el mensaje de prueba acordado desde el intermediario.
5. Publica el flujo de trabajo para registrar su webhook de producción cuando la implementación esté lista.

Para integrar IDoc de SAP, recomendamos un diseño que sitúe la persistencia de la recepción antes de la respuesta explícita. Implementa y verifica la validación, el [comportamiento ante duplicados](<https://n8n-challenges.app/es/blog/prevenir-acciones-api-duplicadas-en-webhooks-de-n8n>) y la gestión de fallos de persistencia antes de confiar en él.

Por ejemplo, un mensaje propuesto de estado de pedido podría incluir correlation_id con el valor order-example-A. La evidencia de aceptación prevista es una recepción almacenada con ese identificador, seguida de la respuesta de recepción acordada; su resultado de procesamiento permanece pendiente hasta que llegue evidencia de la fuente de referencia.

Sources: [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.webhook/README.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.webhook/README.md>), [skills/skills/n8n-node-configuration-official/references/WEBHOOK_NODES.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-node-configuration-official/references/WEBHOOK_NODES.md>), [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.postgres/README.md>)

¿Diriges un equipo que implementa la recepción autenticada y la correlación de mensajes? Nuestro programa n8n Advanced / Developer Training trabaja con las herramientas, los datos y la instancia de n8n de tu equipo. Este enlace abre la página Para empresas de este sitio.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## 3. Define el resultado de referencia y la conciliación

No sustituyas el contrato de resultados de tu despliegue por una definición de estado de versiones antiguas de SAP. La documentación antigua de ALE/IDoc situada en la ruta de ayuda de SAP SNC 7.0 EHP4 describe confirmaciones periódicas del sistema receptor que requieren un flujo de mensajes ALEAUD. Se trata de comunicación entre sistemas SAP, no de un callback HTTP a n8n; no se especifica a qué versiones del ERP subyacente se aplica.

Para SAP NetWeaver 7.0 EHP2 SPS25, la documentación antigua de auditoría de IDoc Interface/ALE asigna el estado 41 al procesamiento completado con un documento de aplicación creado en el sistema receptor. Esa documentación indica expresamente que ya no se actualiza.

Utiliza la siguiente secuencia propuesta para este artículo para especificar la conciliación con la persona responsable del intermediario. Si su interfaz de resultados utiliza HTTP, n8n documenta la creación de una credencial adecuada y la configuración de Authentication en HTTP Request, con preferencia por un tipo de credencial predefinido cuando esté disponible. El endpoint real y los permisos deben proceder de tu contrato.

![Secuencia de conciliación propuesta: 1. Selecciona las recepciones pendientes; 2. Obtén evidencia de la fuente de referencia; 3. Relaciona los identificadores; 4. Registra o escala](/blog/es/article-29ad0e7c-fe96-4f6e-9397-de9289af2e42/306b90f2fae9f86ddd0b0c660ec139cf4f6cb60820a8c1a240e759a46bc1494a.webp)

Sources: [skills/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md>), [Monitoring the Status of Inbound IDocs Using ALE Audit](<https://help.sap.com/saphelp_snc700_ehp04/helpdata/en/4a/b4abcc85376d61e10000000a42189c/content.htm?no_cache=true>), [Evaluating the Audit Database | SAP Help Portal](<https://help.sap.com/docs/SAP_NETWEAVER_702/8f3819b0c24149b5959ab31070b64058/4aa93def05e24458e10000000a42189b.html?version=7.02.25>)

## 4. Comprueba las respuestas e investiga los fallos

Para validar la aceptación en la integración de IDoc de SAP, distingue el comportamiento HTTP documentado de la evidencia adicional que debe producir tu implementación. Utiliza esta lista de pruebas sugerida antes de considerar operativo el flujo de trabajo.

- [ ] Envía credenciales incorrectas: espera HTTP 401 antes de que se ejecute el flujo de trabajo.
- [ ] Envía un mensaje válido: exige evidencia en el registro y la respuesta explícita de recepción acordada.
- [ ] Simula un fallo de persistencia: verifica la respuesta ante fallos acordada en lugar de darla por supuesta.
- [ ] Repite una entrega: verifica el comportamiento ante duplicados definido en el contrato.
- [ ] Retrasa o provoca el fallo de un resultado de procesamiento: verifica la gestión del estado pendiente y su escalado.

Otra trampa: n8n documenta que un flujo de trabajo que termina sin ejecutar [Respond to Webhook](<https://n8n-challenges.app/es/blog/n8n-respond-to-webhook-ejercicio-de-respuestas-json-predecibles>) también devuelve HTTP 200. Inspecciona la evidencia de ejecución y recepción en lugar de aceptar el código de estado como prueba de que se ejecutó la ruta de respuesta prevista.

Para los fallos del lado de SAP, la documentación antigua del monitor de estados situada en la ruta de ayuda de SAP SNC 7.0 EHP4 indica a los operadores que examinen el texto detallado del estado y corrijan la causa antes de volver a procesar. No se especifica a qué versiones del ERP subyacente se aplica y ese procedimiento excluye los errores de comunicación.

Sources: [skills/skills/n8n-node-configuration-official/references/WEBHOOK_NODES.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-node-configuration-official/references/WEBHOOK_NODES.md>), [Respond to Webhook | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook>), [Status Monitor for ALE Messages](<https://help.sap.com/saphelp_snc700_ehp04/helpdata/en/4a/b7c1736dbe6d8be10000000a42189c/content.htm?no_cache=true>)

Obtén ayuda práctica para revisar la gestión de recepciones y la conciliación de tu equipo con nuestro Workflow Audit, que revisa vuestra instancia y vuestros flujos de n8n para evaluar su fiabilidad, seguridad y mantenibilidad. Este enlace abre la página Para empresas de este sitio.

**[Revisa las recepciones SAP del equipo](https://n8n-challenges.app/es/companies)**

Tags: Integración con SAP, Webhooks, Tutorial
