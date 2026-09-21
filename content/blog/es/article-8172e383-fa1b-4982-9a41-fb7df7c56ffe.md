---
{
  "id": "opp_8172e383-fa1b-4982-9a41-fb7df7c56ffe",
  "locale": "es",
  "slug": "article-8172e383-fa1b-4982-9a41-fb7df7c56ffe",
  "urlSlug": "api-rate-limit-exceeded-en-n8n-corrige-los-429-sin-escrituras-duplicadas",
  "title": "API rate limit exceeded en n8n: corrige los 429 sin escrituras duplicadas",
  "subtitle": "Corrige el error API rate limit exceeded en n8n: lee el 429, agrupa peticiones, reintenta tras la ventana del límite y usa claves de idempotencia.",
  "description": "Corrige el error API rate limit exceeded en n8n: lee el 429, agrupa peticiones, reintenta tras la ventana del límite y usa claves de idempotencia.",
  "date": "2026-09-21",
  "sourcesCheckedAt": "2026-09-21T22:16:53.959Z",
  "tags": [
    "n8n",
    "Integración de APIs",
    "Depuración de flujos",
    "Tutorial"
  ],
  "coverImage": "/blog/es/article-8172e383-fa1b-4982-9a41-fb7df7c56ffe/89f9c55a9aa9c9f00d4e899fe615e5b8738a7af82bf176cd91455cce15c1f2be.png",
  "coverAlt": "Globos rosas esperando en grupos espaciados en un peaje con un reloj de arena sobre la barrera",
  "seo": {
    "title": "API rate limit exceeded en n8n: corrige los 429 sin escrituras duplicadas",
    "description": "Corrige el error API rate limit exceeded en n8n: lee el 429, agrupa peticiones, reintenta tras la ventana del límite y usa claves de idempotencia.",
    "keywords": []
  },
  "revision": "0412fc23e41d6ac98d2f6156c7e43d96a4c4c46e5ed86b3ea789e654a8d110cb"
}
---

## Requisitos previos y objetivo

Un error "API rate limit exceeded" significa que el servicio al que llamas quiere que envíes menos peticiones. En n8n puede aparecer como una respuesta HTTP 429 de un nodo HTTP Request. En este tutorial construirás un flujo de trabajo que gestiona esos 429 y no envía dos veces la misma escritura cuando reintenta.

Antes de empezar, ten esto preparado:

- [ ] Un espacio de trabajo de n8n
- [ ] Un flujo de trabajo con un nodo HTTP Request que llame a la API de destino
- [ ] La documentación de límites de peticiones de la API de destino
- [ ] Un endpoint de prueba o sandbox, para que las llamadas repetidas no toquen datos reales

Sources: [Handle rate limits | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/handle-rate-limits>), [429 Too Many Requests - HTTP | MDN](<https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429>)

¿Aún no tienes cuenta de n8n? Puedes seguir estos pasos en un nuevo espacio de trabajo de n8n Cloud. Es un enlace de partner que abre la propia página de registro de n8n.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Paso a paso: gestiona los errores API rate limit exceeded

![Cinco objetos en fila para los pasos que gestionan un error API rate limit exceeded en n8n, del 429 a la escritura sellada](/blog/es/article-8172e383-fa1b-4982-9a41-fb7df7c56ffe/9e8ac5ec8df11db919c1329a02e7d9cfedf1088916aafc76b137b4c7caa33f2f.png)

Secuencia ilustrativa de los cinco pasos del tutorial.

Sigue los pasos en orden. Después de cada uno, vuelve a ejecutar el flujo y comprueba el resultado antes de añadir el siguiente cambio. Así sabrás qué cambio marcó la diferencia.

**Corrige los 429 paso a paso**

1. **Reproducir**: Provoca el 429 y lee el error en el panel de salida del nodo.
2. **Inspeccionar**: Devuelve el código de estado y las cabeceras, y busca Retry-After.
3. **Agrupar**: Ajusta Items per Batch y Batch Interval a los límites de la API.
4. **Reintentar**: Activa Retry On Fail con una espera mayor que la ventana del límite.
5. **Proteger escrituras**: Añade una clave de idempotencia a las peticiones POST si la API la admite.

Primero, reproduce el error API rate limit exceeded. Según la documentación de n8n, cuando un servicio devuelve el error 429, el nodo falla con un mensaje que indica que el servicio está recibiendo demasiadas peticiones. Puedes leer ese mensaje en el panel de salida del nodo.

Después, activa la opción de respuesta Include Response Headers and Status del nodo HTTP Request. La documentación de n8n indica que devuelve el código de estado y las cabeceras junto con el cuerpo. MDN explica que una respuesta 429 puede incluir una cabecera Retry-After que indica al cliente cuánto esperar. Sin embargo, esa cabecera es opcional y cada servidor fija sus propias reglas. La documentación de n8n no explica cómo actuar automáticamente según Retry-After, así que, por ahora, trátala como información que lees tú mismo.

Luego, espacia tus peticiones. En la opción Batching del nodo HTTP Request, Items per Batch define cuántos elementos se envían juntos y Batch Interval define la espera entre lotes en milisegundos. Elige valores que respeten los límites que documenta la API.

A continuación, abre la configuración (Settings) del nodo y [activa Retry On Fail](<https://n8n-challenges.app/es/blog/reintentar-de-forma-segura-solicitudes-http-fallidas-en-n8n>). La documentación de n8n recomienda que Wait Between Tries sea más largo que la ventana del límite de peticiones. Esa documentación no indica un número máximo de intentos ni esperas exponenciales.

Sources: [Handle rate limits | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/handle-rate-limits>), [HTTP Request | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest>), [429 Too Many Requests - HTTP | MDN](<https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429>)

Si tus desarrolladores chocan una y otra vez con límites de peticiones y problemas de reintentos, n8n Advanced / Developer Training es el programa de la lista más cercano a este tema. Se prepara para un equipo y se imparte en vuestra propia instancia de n8n. El enlace abre nuestra página Para empresas, desde donde puedes enviar una consulta a través de LinkedIn.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Protege las escrituras reintentadas con claves de idempotencia

Por último, protege tus escrituras. En la API de Stripe, todas las peticiones POST aceptan claves de idempotencia. Repetir una petición con la misma clave devuelve el primer resultado guardado en lugar de ejecutar de nuevo la operación. Este comportamiento es específico de Stripe. Nuestra sugerencia editorial: envía la clave como indique tu API, y solo si documenta que admite claves de idempotencia. Constrúyela a partir de un ID de negocio estable, como un número de pedido, y no de un valor aleatorio que cambie en cada reintento.

Sources: [Idempotent requests | Stripe API Reference](<https://docs.stripe.com/api/idempotent_requests>)

## Resultados esperados y solución de problemas

![Recibos duplicados junto a un único recibo sellado, que contrastan escrituras reintentadas con y sin clave de idempotencia](/blog/es/article-8172e383-fa1b-4982-9a41-fb7df7c56ffe/632bc0863955e4afac5f56a8c82e3f727ec9c494b9d58612cc2c413a9d40725b.png)

Comparación conceptual de reintentos con y sin claves de idempotencia.

Una vez configurados los lotes y los reintentos, deberías ver menos errores 429. Si el error API rate limit exceeded sigue apareciendo, los reintentos con una espera mayor que la ventana del límite dan a un intento posterior la oportunidad de funcionar, pero un 429 aún puede detener el nodo si el límite persiste. Si algo sigue fallando, busca el síntoma a continuación.

**Síntomas habituales y qué revisar**

| Síntoma | Causa probable | Qué revisar |
| --- | --- | --- |
| Los 429 continúan | Los lotes son demasiado grandes o están demasiado juntos | Reduce Items per Batch o aumenta Batch Interval |
| Los 429 continúan tras los reintentos | Wait Between Tries es más corto que la ventana | Pon una espera mayor que la ventana del límite |
| Registros duplicados | Las peticiones POST reintentadas no tienen clave de idempotencia | Comprueba si la API admite claves de idempotencia |
| Duplicados incluso con clave | La clave cambia en cada reintento | Construye la clave a partir de un ID de negocio estable |

Si los reintentos se disparan siempre en el mismo momento, revisa una recomendación general más antigua. En una publicación de 2017 en su blog de ingeniería, Stripe recomendaba el backoff exponencial, en el que la espera se duplica tras cada fallo, más un jitter aleatorio para que muchos clientes no reintenten a la vez. Esa publicación tiene varios años y nada de esto es una función integrada de n8n. Cualquier versión en n8n es un patrón que diseñas tú.

Sources: [Handle rate limits | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/handle-rate-limits>), [HTTP Request | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest>), [Idempotent requests | Stripe API Reference](<https://docs.stripe.com/api/idempotent_requests>), [Designing robust and predictable APIs with idempotency](<https://stripe.com/blog/idempotency>)

¿Te preocupa que los flujos de tu equipo generen registros duplicados al reintentar? Un Workflow Audit revisa vuestra instancia de n8n y vuestros flujos en cuanto a fiabilidad, seguridad y mantenibilidad. El enlace abre nuestra página Para empresas, desde donde puedes enviar una consulta a través de LinkedIn.

**[Audita los reintentos de tu equipo](https://n8n-challenges.app/es/companies)**

Tags: n8n, Integración de APIs, Depuración de flujos, Tutorial
