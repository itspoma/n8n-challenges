---
{
  "id": "opp_1bcc50d4-01fe-44dd-a5c0-9325c275c2ec",
  "locale": "es",
  "slug": "article-1bcc50d4-01fe-44dd-a5c0-9325c275c2ec",
  "urlSlug": "crea-un-webhook-idempotente-en-n8n-que-omita-las-solicitudes-reintentadas",
  "title": "Crea un webhook idempotente en n8n que omita las solicitudes reintentadas",
  "subtitle": "Guarda claves de idempotencia en una data table de n8n, omite reintentos consecutivos, prueba en Executions y conoce el límite de concurrencia.",
  "description": "Guarda claves de idempotencia en una data table de n8n, omite reintentos consecutivos, prueba en Executions y conoce el límite de concurrencia.",
  "date": "2026-09-15",
  "tags": [
    "n8n",
    "Webhooks",
    "Preparación para producción",
    "Tutorial"
  ],
  "coverImage": "/blog/es/article-1bcc50d4-01fe-44dd-a5c0-9325c275c2ec/188e3232f8b17b6e3b7684e2aa4b2444034a028207ef0deeb7c850000cda6a76.png",
  "coverAlt": "Dos sobres idénticos entran por una ranura de correo. Uno cae en una bandeja y el duplicado es detenido por un sello con una marca de verificación.",
  "seo": {
    "title": "Crea un webhook idempotente en n8n que omita las solicitudes reintentadas",
    "description": "Guarda claves de idempotencia en una data table de n8n, omite reintentos consecutivos, prueba en Executions y conoce el límite de concurrencia.",
    "keywords": [
      "n8n",
      "Webhooks",
      "Preparación para producción"
    ]
  },
  "revision": "44b95e2da055c75f95543f26ff41224d6cfb03d1a83184787fe1927618abe8db"
}
---

## Qué significa la idempotencia en un webhook y qué necesitas

Una definición sencilla, con nuestras propias palabras: un webhook es idempotente cuando recibir la misma solicitud por segunda vez no crea un segundo registro ni repite un efecto secundario. Esto importa porque muchos emisores reintentan cuando no reciben una respuesta limpia. Cómo y cuándo reintentan depende del emisor, y la documentación de n8n usada para este tutorial no lo cubre.

Antes de empezar necesitas tres cosas. Primero, tu propia instancia de n8n. Segundo, un workflow que empiece con un trigger Webhook. Tercero, acceso a data tables. También necesitas un emisor que incluya su propia clave de idempotencia en cada solicitud, por ejemplo en una cabecera o en un campo del cuerpo. Te sugerimos no generar la clave dentro de n8n. Una clave creada en cada ejecución es distinta cada vez, así que no puede indicarte que dos solicitudes son en realidad la misma.

El objetivo es un registro por clave de idempotencia, incluso cuando el emisor reintenta. Las claves nuevas ejecutan el efecto secundario, como crear un pedido o enviar un correo. Las claves repetidas reciben una respuesta clara y no ocurre nada más. Esta guía se basa en la documentación oficial. No la hemos probado de primera mano.

Sources: [S1](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook), [S3](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable), [S4](https://docs.n8n.io/build/work-with-data/data-tables)

¿Quieres practicar más con triggers de webhook y lógica de ramas? Prueba los retos prácticos de n8n y construye cada uno en tu propia instancia de n8n.

[Explora los retos de n8n](https://n8n-challenges.app/es)

## Pasos 1 y 2: protege el webhook y crea la tabla de claves

Añade un nodo Webhook. En la autenticación, exige que quienes lo llamen usen Basic, Header o JWT auth. Nuestro razonamiento es simple: limita quién puede llamar al webhook. La configuración de las credenciales se explica en otra página de la documentación. Después, configura la opción Respond para usar un nodo Respond to Webhook. Así eliges qué recibe el emisor, incluido un código de respuesta personalizado. Ten en cuenta que el nodo Respond to Webhook se ejecuta solo una vez y usa el primer elemento entrante.

Recuerda también que la URL de producción solo se activa después de publicar el workflow.

Ahora crea una data table para las claves procesadas. Una estructura sencilla tiene una columna para la clave y, si quieres, otra para el momento en que la recibiste. La documentación de n8n menciona expresamente guardar marcadores para evitar ejecuciones duplicadas como un uso de las data tables, así que encaja con su propósito.

Sources: [S1](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook), [S2](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook), [S4](https://docs.n8n.io/build/work-with-data/data-tables)

## Pasos 3 a 5: comprueba, registra, actúa y responde

![Diagrama de flujo en el que el webhook comprueba la clave; las claves nuevas se registran y procesan, y las ya vistas reciben una respuesta de ya procesada.](/blog/es/article-1bcc50d4-01fe-44dd-a5c0-9325c275c2ec/6f2d92f21af0d9250e5db7f19d2c6ea5e88b22f0a3c42a4bcb5754c996baf686.png)

Esquema editorial de las ramas del workflow, no una captura de n8n.

Paso 3: justo después del webhook, añade un nodo Data Table que separe los elementos entrantes según exista o no una fila coincidente. Compara la clave de la solicitud con la columna de claves. Ahora tienes dos ramas: claves nuevas y claves ya vistas.

Paso 4: en la rama de claves nuevas, inserta la clave con la operación Insert y luego ejecuta tu efecto secundario. Hay una concesión que debes decidir a propósito. Si registras la clave primero, un fallo durante el efecto secundario hace que un reintento se omita, así que el trabajo quizá nunca se haga. Si registras la clave después del efecto secundario, un fallo entre ambos puede permitir que un reintento lo ejecute de nuevo. También existe Upsert, que actualiza una fila ya existente. Sin embargo, la documentación no dice que sea seguro cuando las solicitudes llegan al mismo tiempo.

Paso 5: termina ambas ramas con un nodo Respond to Webhook. Como sugerencia editorial, devuelve también un estado de tipo éxito para los duplicados, con un mensaje que indique que la solicitud ya se procesó. Así los emisores no tienen motivo para seguir reintentando. n8n no exige ningún código de estado concreto. La elección es tuya y de tu emisor.

Sources: [S3](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable), [S2](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook)

## Paso 6: prueba enviando la misma solicitud dos veces

Publica el workflow y envía una solicitud con una clave inventada, usando el cliente HTTP que prefieras. Después envía exactamente la misma solicitud otra vez. Lo que deberías ver: la primera llamada ejecuta el efecto secundario y añade una fila, y la segunda recibe tu respuesta de duplicado sin añadir filas. Envía una tercera solicitud con otra clave para confirmar que las claves nuevas siguen pasando.

Las ejecuciones de producción no muestran sus datos en el editor, así que abre la pestaña Executions del workflow para ver qué rama siguió cada ejecución. Luego revisa la data table para confirmar que solo hay una fila para la clave repetida.

Sources: [S1](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook)

## Alternativa: el nodo Remove Duplicates

Si no necesitas una tabla que puedas consultar, el nodo Remove Duplicates puede descartar elementos cuyos valores aparecieron en ejecuciones anteriores. Está disponible en n8n 1.64.0 y posteriores. Por defecto almacena 10.000 elementos, y puedes cambiar ese tamaño. Las claves muy antiguas pueden acabar saliendo de ese historial. La documentación no explica qué ocurre con las entradas más antiguas, así que no confíes en él para claves que deban recordarse durante mucho tiempo. Tampoco está documentado su comportamiento cuando las solicitudes llegan al mismo tiempo.

Sources: [S5](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates)

## Solución de problemas y el límite de concurrencia conocido

![Comparación: los reintentos en secuencia se bloquean, mientras que dos solicitudes que llegan al mismo tiempo pueden pasar ambas.](/blog/es/article-1bcc50d4-01fe-44dd-a5c0-9325c275c2ec/24d075fa3ace8a48509fa46be79e2fe1aa64bb8eed0b8ca499c1276ae8abf6aa.png)

Comparación conceptual entre reintentos en secuencia y el caso concurrente no documentado.

El emisor recibe un error 500: [si el workflow falla antes de que se ejecute un nodo Respond to Webhook](<https://n8n-challenges.app/es/blog/el-webhook-de-n8n-no-funciona-lista-de-comprobacion-paso-a-paso-para-depurarlo>), n8n devuelve un 500. Algunos emisores reintentan después, así que un error aquí puede crear justo los reintentos que intentas gestionar. Abre Executions para encontrar el nodo que falló.

Las inserciones fallan de repente: las data tables están pensadas para un almacenamiento ligero o moderado. Por defecto, todas las tablas de una instancia comparten un límite de 200 MiB. Al alcanzarlo, las inserciones fallan y las ejecuciones dan error. Las instancias autoalojadas pueden aumentar el límite con N8N_DATA_TABLES_MAX_SIZE_BYTES.

No pasa nada en producción: comprueba que el workflow esté publicado.

El límite conocido: la documentación usada aquí no garantiza que la comprobación y la inserción ocurran como un único paso atómico, y no menciona restricciones de unicidad. Dos solicitudes idénticas que lleguen en el mismo instante podrían pasar ambas la comprobación y ejecutar ambas el efecto secundario. Esta configuración está pensada para detectar reintentos que llegan uno tras otro, pero no la hemos probado de primera mano y no garantiza protección frente a solicitudes simultáneas. Para pagos u otros efectos secundarios críticos, apóyate en [un sistema que imponga una restricción de unicidad a nivel de base de datos](<https://n8n-challenges.app/es/blog/prevenir-acciones-api-duplicadas-en-webhooks-de-n8n>).

Sources: [S2](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook), [S1](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook), [S4](https://docs.n8n.io/build/work-with-data/data-tables), [S3](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable)

¿Tu empresa depende de webhooks de n8n donde los duplicados o las condiciones de carrera importan de verdad? Escribe al autor en LinkedIn para preguntar por mantenimiento de n8n o por migrar automatizaciones críticas a software a medida. El enlace abre un perfil de LinkedIn.

[Pregunta por consultoría de n8n en LinkedIn](https://www.linkedin.com/in/rodomansky/)

Tags: n8n, Webhooks, Preparación para producción, Tutorial
