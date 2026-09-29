---
{
  "id": "opp_7e9bd439-3d55-4404-bfdf-336a8c90bdfa",
  "locale": "es",
  "slug": "article-7e9bd439-3d55-4404-bfdf-336a8c90bdfa",
  "urlSlug": "vulnerabilidad-del-webflow-trigger-de-n8n-que-dice-el-aviso",
  "publishedAt": "2026-09-29T15:11:31.666Z",
  "title": "Vulnerabilidad del Webflow Trigger de n8n: qué dice el aviso",
  "subtitle": "Una explicación clara de la vulnerabilidad del Webflow Trigger de n8n revelada en GitHub el 16 de septiembre de 2026: qué cambió, a quién afecta y qué hacer ahora.",
  "description": "Una explicación clara de la vulnerabilidad del Webflow Trigger de n8n revelada en GitHub el 16 de septiembre de 2026: qué cambió, a quién afecta y qué hacer ahora.",
  "date": "2026-09-29",
  "sourcesCheckedAt": "2026-09-29T14:50:55.441Z",
  "tags": [
    "Actualizaciones",
    "n8n",
    "Webhooks",
    "Preparación para producción"
  ],
  "coverImage": "/blog/es/article-7e9bd439-3d55-4404-bfdf-336a8c90bdfa/de3069a3a6e8b49463526ff62bbbfedde93cd695206ceb4e4053abc536acc0e8.png",
  "coverAlt": "Una puerta que acepta una llave falsa representa la vulnerabilidad del Webflow Trigger de n8n por una firma no verificada.",
  "seo": {
    "title": "Vulnerabilidad del Webflow Trigger de n8n: qué dice el aviso",
    "description": "Una explicación clara de la vulnerabilidad del Webflow Trigger de n8n revelada en GitHub el 16 de septiembre de 2026: qué cambió, a quién afecta y qué hacer ahora.",
    "keywords": []
  },
  "revision": "340b30da55b674e52f24145f2d06c58fe6401e551d7e7ba91776195556adcbc3"
}
---

## Qué cambió: la vulnerabilidad del Webflow Trigger de n8n

La vulnerabilidad del Webflow Trigger de n8n, descrita en un aviso de seguridad de GitHub identificado como GHSA-hwv9-jhc7-f7c4, se refiere a una comprobación ausente en la forma en que el nodo Webflow Trigger validaba los eventos entrantes. Según el aviso, el nodo aceptaba solicitudes de webhook sin comprobar la firma HMAC x-webflow-signature que Webflow normalmente adjunta a las entregas de sus eventos. Esa brecha significaba que un atacante no autenticado podía enviar una solicitud falsificada con datos falsos controlados por el atacante y hacer que activara el flujo de trabajo como si realmente procediera de Webflow.

[El listado del aviso de GitHub, publicado el 16 de septiembre de 2026](<https://github.com/n8n-io/n8n/security/advisories>), calificó el problema como de gravedad moderada, uno de varios avisos de n8n publicados ese mismo día.

Sources: [Missing Webhook Signature Verification in Webflow Trigger Node Allows Forged Event Injection · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-hwv9-jhc7-f7c4>), [Security Advisories · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories>)

## Quién se ve afectado: versiones anteriores al parche y el aviso de seguridad del Webflow Trigger de n8n

![Dos engranajes sobre una mesa de trabajo representan las versiones antigua y nueva del nodo Webflow Trigger de n8n.](/blog/es/article-7e9bd439-3d55-4404-bfdf-336a8c90bdfa/34d8b8151e4b8b92306f1ac01b3ce5e9145686fe67b88e1e9b1b0564f47678eb.png)

Comparación conceptual que contrasta las dos versiones del nodo Webflow Trigger mencionadas en el aviso.

Según el aviso, la corrección se aplica a las instancias de n8n que ejecutan versiones anteriores a 1.123.80, 2.39.6 y 2.40.1. n8n indica que el problema está corregido en estas versiones e instruye a los usuarios a actualizar a una de ellas o posterior para remediarlo. Cualquier instancia autoalojada en una versión anterior, y cualquier flujo de trabajo que use el nodo Webflow Trigger, entra dentro del alcance que describe el aviso.

**Versiones de n8n que el aviso indica como corregidas**

| Línea de versión de n8n | Versión corregida |
| --- | --- |
| Rama 1.x | 1.123.80 |
| Rama 2.x (serie 2.39) | 2.39.6 |
| Rama 2.x (serie 2.40) | 2.40.1 |

El aviso también indica que la corrección de verificación de firma se aplicó específicamente a la versión 2 del nodo Webflow Trigger. El propio código fuente de n8n confirma que el nodo está implementado como dos versiones separadas, una clase de versión 1 y una clase de versión 2, que coexisten en el mismo paquete de nodos.

Sources: [Missing Webhook Signature Verification in Webflow Trigger Node Allows Forged Event Injection · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-hwv9-jhc7-f7c4>), [n8n/packages/nodes-base/nodes/Webflow/WebflowTrigger.node.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Webflow/WebflowTrigger.node.ts>)

## Qué cubre la corrección y qué hacer ahora

Para la mayoría de los equipos, resolver la vulnerabilidad del Webflow Trigger de n8n se reduce a ejecutar una versión corregida elegida de la tabla de versiones anterior. El parche añade la verificación de firma de webhook que le faltaba al nodo, comprobando la cabecera x-webflow-signature antes de que se ejecute un flujo de trabajo. Comprobar tu versión actual frente a las versiones corregidas y actualizar es la forma más directa de obtener la verificación de firma de webhook que n8n añadió en este parche, y este artículo la prioriza en función de las versiones que nombra el aviso.

Si una actualización inmediata no es posible, el propio aviso recomienda medidas provisionales: desactivar los flujos de trabajo con Webflow Trigger que no se usen, restringir el acceso de red a los rangos de IP publicados por Webflow y [limitar el acceso a la instancia de n8n a usuarios totalmente de confianza](<https://n8n-challenges.app/es/blog/lista-de-seguridad-de-n8n-para-una-instancia-compartida-y-autoalojada>). El aviso indica que estas medidas no remedian completamente el riesgo y están pensadas solo como mitigación a corto plazo hasta que puedas actualizar.

Este artículo llama a esta actualización la corrección del bypass de firma de webhook de n8n, ya que cierra la brecha específica que reportó el aviso. La siguiente lista separa las instrucciones propias del aviso de las sugerencias que este artículo añade para los equipos que estandarizan cómo ejecutan n8n.

- [ ] Comprueba tu versión de n8n frente a 1.123.80, 2.39.6 y 2.40.1 y actualiza si estás por debajo de la versión corregida para tu línea
- [ ] Si no puedes actualizar de inmediato, aplica las medidas individuales del aviso: desactiva los flujos de trabajo con Webflow Trigger que no uses, restringe el acceso a los rangos de IP publicados por Webflow y limita el acceso a la instancia a usuarios de confianza; aplicar las tres juntas es la propuesta propia de este artículo, no una instrucción combinada del aviso
- [ ] Tras actualizar, audita los flujos de trabajo en busca de nodos Webflow Trigger que sigan configurados en la versión 1, ya que la corrección del aviso nombra la versión 2; esta comprobación es una sugerencia propia del artículo, no algo que indique el propio aviso
- [ ] Considera añadir validación en los nodos posteriores que actúan sobre los datos de eventos de Webflow como hábito general de defensa en profundidad, más allá de lo que cubre el propio aviso

Sources: [Missing Webhook Signature Verification in Webflow Trigger Node Allows Forged Event Injection · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-hwv9-jhc7-f7c4>)

Si tu equipo quiere adquirir el hábito de revisar avisos como este y mantener n8n actualizado, n8n Office Hours / Coaching en la página Para empresas ofrece a los equipos sesiones prácticas y recurrentes, diseñadas en torno a tu propia instancia de n8n, para revisar actualizaciones y riesgos de flujos de trabajo.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Lo que el aviso no dice

El aviso guarda silencio sobre varios puntos que los lectores pueden querer conocer. No indica si los usuarios de n8n Cloud necesitan realizar alguna acción por su cuenta, ni si las instancias en la nube ya se actualizaron automáticamente; esto simplemente no se aborda en el texto publicado. El aviso tampoco registra ningún ID de CVE conocido para esta vulnerabilidad del Webflow Trigger de n8n en el momento de su publicación.

Al margen de este aviso, Cornelius Suermann, VP de Ingeniería de n8n, ha escrito en el blog de n8n sobre cómo aborda la empresa la divulgación de vulnerabilidades en términos generales. Su publicación no describe este aviso en particular, pero explica por qué la ausencia de informes llamativos no es, por sí sola, tranquilizadora:

> “Una base de código que recibe pocos informes de vulnerabilidades no es señal de seguridad. Es, más a menudo, señal de que nadie está mirando.”
>
> — Cornelius Suermann, VP of Engineering at n8n (traducido)
>
> Original: “A codebase that receives few vulnerability reports is not a sign of security. It is more often a sign that nobody is looking.” — Fuente: [How n8n Handles Vulnerability Disclosure - and Why We Do It This Way – n8n Blog](<https://blog.n8n.io/how-n8n-handles-vulnerability-disclosure-and-why-we-do-it-this-way/>)

El aviso tampoco aclara si la versión 1 del nodo Webflow Trigger sigue siendo vulnerable tras actualizar una instancia, ni cómo migrar un flujo de trabajo existente de la versión 1 a la versión 2. Los lectores que dependan de este nodo deben tratar esa brecha como no resuelta en lugar de asumir cualquiera de las dos respuestas.

Sources: [Missing Webhook Signature Verification in Webflow Trigger Node Allows Forged Event Injection · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-hwv9-jhc7-f7c4>)

## Contexto: qué hace el nodo Webflow Trigger

Como contexto, la propia documentación de n8n describe Webflow como una plataforma de creación de sitios web basada en el navegador, y el nodo Webflow Trigger como la forma en que un flujo de trabajo de n8n escucha eventos de un sitio de Webflow conectado, como envíos de formularios o cambios de contenido. Esta descripción cubre el propósito general del nodo y no menciona la vulnerabilidad, las versiones afectadas ni la corrección; es solo contexto.

Sources: [Webflow Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.webflowtrigger>)

Para los equipos que quieran una revisión externa de si actualizaciones como esta se rastrean y aplican de forma consistente, el Workflow Audit en la página Para empresas revisa tu instancia y flujos de trabajo de n8n en cuanto a fiabilidad, seguridad y mantenibilidad, usando tus propias herramientas y datos.

**[Audita tu seguridad de Webflow Trigger](https://n8n-challenges.app/es/companies)**

Tags: Actualizaciones, n8n, Webhooks, Preparación para producción
