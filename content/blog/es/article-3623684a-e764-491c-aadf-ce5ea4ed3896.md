---
{
  "id": "opp_3623684a-e764-491c-aadf-ce5ea4ed3896",
  "locale": "es",
  "slug": "article-3623684a-e764-491c-aadf-ce5ea4ed3896",
  "urlSlug": "concurrencia-de-workers-en-n8n-guia-de-ajuste-y-reversion-reproducible",
  "publishedAt": "2026-10-19T10:46:30.415Z",
  "title": "Concurrencia de workers en n8n: guía de ajuste y reversión reproducible",
  "subtitle": "Compara ajustes de concurrencia de workers en n8n con una carga webhook controlada, mide la presión sobre colas y dependencias y define criterios de aceptación y reversión.",
  "description": "Compara ajustes de concurrencia de workers en n8n con una carga webhook controlada, mide la presión sobre colas y dependencias y define criterios de aceptación y reversión.",
  "date": "2026-10-19",
  "sourcesCheckedAt": "2026-10-19T10:30:56.396Z",
  "tags": [
    "Autoalojamiento",
    "Preparación para producción",
    "Guía extensa"
  ],
  "coverImage": "/blog/es/article-3623684a-e764-491c-aadf-ce5ea4ed3896/a4c76dd55ee0d7de23ffd372bfca85110d3bfd13064f0509c6b60b1b9f8df2d5.webp",
  "coverAlt": "Compartimentos ajustables de workers pasan paquetes de trabajos hacia un conducto estrecho que representa la concurrencia de workers de n8n y la capacidad de las dependencias.",
  "seo": {
    "title": "Concurrencia de workers en n8n: guía de ajuste y reversión reproducible",
    "description": "Compara ajustes de concurrencia de workers en n8n con una carga webhook controlada, mide la presión sobre colas y dependencias y define criterios de aceptación y reversión.",
    "keywords": []
  },
  "revision": "d0f5454e5f5b3026b75786bb276c5c4d983ee3e6a3a1535a48d4cf90f7a5a231"
}
---

**Contenido**

- [¿Qué controla la concurrencia de workers en n8n?](#cf-section-1)
  - [¿Qué ajuste determina realmente la concurrencia de workers?](#cf-section-2)
  - [¿Qué requisitos previos deberían estar funcionando?](#cf-section-3)
- [¿Cómo se construye una carga reproducible para la comparación?](#cf-section-4)
  - [¿Qué debe permanecer constante entre candidatos?](#cf-section-5)
  - [¿Cómo se verifica que realmente llegó la carga prevista?](#cf-section-6)
- [¿Qué debes medir durante cada ejecución?](#cf-section-7)
  - [¿Cómo se separan la espera en cola, el procesamiento del worker y el tiempo de respuesta HTTP?](#cf-section-8)
  - [¿Cómo se recopilan de forma segura las señales de cola y recursos?](#cf-section-9)
- [¿Cómo se identifica la presión sobre las dependencias antes de aumentar la concurrencia?](#cf-section-10)
  - [¿Qué debes hacer cuando se limitan las solicitudes a servicios posteriores?](#cf-section-11)
  - [¿Qué debes inspeccionar cuando PostgreSQL se convierte en la limitación?](#cf-section-12)
- [¿Cómo se comparan los candidatos y se definen los criterios de aceptación?](#cf-section-13)
  - [¿Cómo llevaría una comparación hipotética a la aceptación y la reversión?](#cf-section-14)
  - [¿Qué hace que una ejecución sea aprobada, fallida o no concluyente?](#cf-section-15)
- [¿Cómo se revierte el cambio y se confirma la recuperación?](#cf-section-16)
  - [¿Qué debe incluir el registro operativo final?](#cf-section-17)

<a id="cf-section-1"></a>

## ¿Qué controla la concurrencia de workers en n8n?

La concurrencia de workers en n8n controla cuántos trabajos puede procesar simultáneamente un worker en modo cola. Para los equipos que operan un despliegue autoalojado existente, la pregunta útil es qué ajuste satisface los requisitos de su carga de trabajo y mantiene las colas, los recursos y las dependencias dentro de los límites acordados. Esta guía propone un experimento operativo reproducible para responderla.

n8n documenta una concurrencia predeterminada de 10 por worker y recomienda 5 o más. Estos valores son orientaciones de configuración, no pruebas de un ajuste óptimo para tus flujos de trabajo. Los trabajos en paralelo y la tasa de solicitudes son magnitudes distintas: un ajuste de worker no especifica cuántas solicitudes a API harán tus flujos a lo largo del tiempo.

El método siguiente compara configuraciones con la misma carga ofrecida, separa el comportamiento de las respuestas de la finalización del proceso de negocio y conserva una configuración que se pueda restaurar. Presupone que [el modo cola](<https://n8n-challenges.app/es/blog/n8n-queue-mode-con-redis-cuando-dejar-el-modo-de-instancia-unica>) ya funciona; la instalación, el despliegue de la infraestructura de monitorización y los comandos de despliegue específicos de cada plataforma quedan fuera de su alcance.

En nuestra opinión, un experimento de concurrencia solo merece la pena si otro operador puede explicarlo y repetirlo. Definir claramente los límites de las mediciones importa tanto como el ajuste que se compara.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md>), [API load testing](<https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/?pg=dash5309>)

<a id="cf-section-2"></a>

### ¿Qué ajuste determina realmente la concurrencia de workers?

En el modo cola de n8n autoalojado, N8N_CONCURRENCY_PRODUCTION_LIMIT proporciona la concurrencia del worker cuando su valor es distinto de -1. En caso contrario, n8n recurre a la opción --concurrency o a su valor predeterminado. No interpretes la variable de entorno como un límite adicional para todo el conjunto de workers superpuesto a la opción de cada worker.

Antes de cambiar nada, registra la versión instalada de n8n, el número de workers, el comando de inicio, la variable de entorno que prevalece y los límites de recursos. Conserva la última configuración aceptable como una revisión completa del despliegue. Un registro que solo contenga la opción puede omitir el valor de entorno que determina realmente la concurrencia.

La implementación inspeccionada en la rama master registra la concurrencia resuelta durante el inicio del worker. Esa evidencia procede de una rama master mutable, sin un identificador de versión publicada, así que contrasta la implementación con tu versión instalada antes de confiar en su salida. La misma limitación de correspondencia entre versiones se aplica a las observaciones de implementación y esquema utilizadas más adelante en esta guía.

Como práctica editorial recomendada, verifica cada worker después del despliegue y conserva la salida de inicio pertinente junto con el registro de la ejecución. Si tu versión no ofrece una salida equivalente, establece otro método de verificación adecuado para esa versión antes de interpretar una comparación.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md>), [n8n/packages/cli/src/commands/worker.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/cli/src/commands/worker.ts>)

<a id="cf-section-3"></a>

### ¿Qué requisitos previos deberían estar funcionando?

n8n documenta que los workers en modo cola necesitan acceso a Redis y a la base de datos de n8n, y que sus claves de cifrado deben coincidir con la de la instancia principal. Establece esos requisitos previos antes de tratar una ejecución bloqueada como un problema de concurrencia.

Para este experimento, utiliza un despliegue que ya complete ejecuciones representativas. Como preparación sugerida, conserva una solicitud que sepas que funciona y su resultado de negocio esperado, confirma el acceso a las observaciones operativas e identifica quién puede detener la prueba y restaurar la configuración anterior.

Sources: [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-4"></a>

## ¿Cómo se construye una carga reproducible para la comparación?

![Dos bancos de prueba contienen payloads webhook y temporizadores de llegada idénticos junto a bandejas de workers con distintas divisiones.](/blog/es/article-3623684a-e764-491c-aadf-ce5ea4ed3896/e4db5efd1bab48af374d6f80b7fec7b6f79710cb83102f393884627805462791.webp)

Utilizar los mismos payloads y programaciones de llegadas centra la comparación en el ajuste del worker que se modifica.

Utiliza una carga representativa de webhooks de producción con entradas controladas y una programación de llegadas fija. La documentación de k6 de Grafana describe los escenarios constant-arrival-rate como escenarios que inician iteraciones a una tasa constante, lo que respalda este diseño de comparación. Una iteración puede contener varias solicitudes, así que registra por separado la tasa de iteraciones y el número de solicitudes.

Define el [contrato de respuesta del webhook](<https://n8n-challenges.app/es/blog/n8n-respond-to-webhook-ejercicio-de-respuestas-json-predecibles>) antes de escribir las aserciones. Grafana recomienda comprobaciones de respuesta y umbrales de rendimiento, pero la aceptación de una solicitud webhook puede no demostrar la finalización del proceso de negocio. Decide qué resultado observable demuestra que el flujo realizó el trabajo previsto.

Como diseño de carga sugerido, prepara un conjunto reproducible de payloads que cubra las formas de solicitud importantes, junto con un resultado esperado para cada caso. Utiliza un destino aislado u otro enfoque aprobado internamente para las escrituras y especifica cómo se identificarán y conciliarán los registros de prueba.

Sources: [Scenarios](<https://grafana.com/docs/k6/latest/using-k6/scenarios/>), [API load testing](<https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/?pg=dash5309>)

<a id="cf-section-5"></a>

### ¿Qué debe permanecer constante entre candidatos?

Cambia únicamente la concurrencia de workers de n8n en la comparación inicial. La guía operativa de proveedor de Alex Cinovoj de 2026 recomienda probar un cambio de dimensionamiento con la misma carga de trabajo; aporta consejos operativos, no un resultado comparativo controlado. El registro del experimento que aparece a continuación es nuestra propuesta para que ese consejo se pueda revisar.

Completa este registro antes de ejecutar la prueba de referencia.

**Controles sugeridos para un experimento que solo cambia la concurrencia**

| Control | Qué registrar y mantener constante |
| --- | --- |
| Flujo de trabajo | Revisión y configuración pertinente |
| Payloads | Casos, proporciones y resultados esperados |
| Workers | Cantidad y límites de recursos |
| Dependencias | Entorno y destinos de prueba |
| Solicitudes | Programación de llegadas y solicitudes por iteración |
| Reintentos | Intentos, pausas y procesamiento por lotes |
| Observación | Duración de la carga y ventana de recuperación |
| Preparación | Condiciones iniciales de la cola y las dependencias |

Sources: [Self-Hosting n8n at Scale, A Real Runbook | Alex Cinovoj](<https://alexcinovoj.com/blog/self-hosting-n8n-at-scale>)

<a id="cf-section-6"></a>

### ¿Cómo se verifica que realmente llegó la carga prevista?

Inspecciona el generador antes de atribuir un resultado a n8n. Grafana define dropped_iterations de k6 como las iteraciones que no se iniciaron porque los ejecutores basados en tasa de llegada no disponían de usuarios virtuales suficientes o porque los ejecutores basados en iteraciones agotaron el tiempo permitido. Es una señal del generador de carga.

Como regla de decisión editorial, marca una ejecución como no concluyente cuando la programación de llegadas prevista no se haya cumplido con suficiente precisión para la comparación planificada. Conserva las iteraciones programadas, las iniciadas, las solicitudes reales y las iteraciones descartadas, y compáralas con las observaciones de entrada cuando estén disponibles.

k6 admite variables de entorno y etiquetas de métricas específicas de cada escenario. Úsalas para identificar las ejecuciones de los candidatos y los grupos de payloads, recordando que una etiqueta no demuestra que los entornos sean equivalentes. Entre los identificadores sugeridos están el nombre de la ejecución y la revisión del flujo; mantén una interpretación coherente entre registros.

Sources: [Scenarios](<https://grafana.com/docs/k6/latest/using-k6/scenarios/>), [Built-in metrics](<https://grafana.com/docs/k6/latest/using-k6/metrics/reference/>)

<a id="cf-section-7"></a>

## ¿Qué debes medir durante cada ejecución?

Para comparar la concurrencia de workers en n8n, combina las observaciones de la cola con los resultados de las ejecuciones, los recursos de los contenedores y la evidencia de las dependencias. n8n expone recuentos de trabajos en espera y activos, además de contadores de trabajos completados y fallidos del conjunto de workers. Los contadores de completados y fallidos se acumulan desde el inicio de la instancia, así que compara las variaciones de cada intervalo y ten en cuenta los reinicios.

Lo siguiente es un contrato de medición sugerido, no un informe nativo de n8n.

**Contrato de medición sugerido**

| Dimensión | Observación | Límite de interpretación |
| --- | --- | --- |
| Corrección | Resultado de negocio esperado | No queda demostrada por los recuentos de finalización |
| HTTP | Comprobaciones de respuesta y latencia | Depende del contrato de respuesta |
| Cola | Trabajos en espera y activos | Los recuentos no son el retraso por trabajo |
| Finalización | Variaciones de completados y fallidos | Ten en cuenta los reinicios |
| Recursos | CPU y memoria a lo largo del tiempo | No se limita a un único flujo |
| Dependencias | Errores de API y actividad de la base de datos | Correlaciona antes de diagnosticar |

Captura tanto el periodo de carga como la recuperación después de que cesen las llegadas.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md>), [Enable Prometheus metrics | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics>), [Runtime metrics](<https://docs.docker.com/engine/containers/runmetrics/>), [API load testing](<https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/?pg=dash5309>)

<a id="cf-section-8"></a>

### ¿Cómo se separan la espera en cola, el procesamiento del worker y el tiempo de respuesta HTTP?

![Un paquete webhook marcado con una cinta conecta las estaciones de entrada, inicio del worker y finalización del worker, cada una con su propio reloj.](/blog/es/article-3623684a-e764-491c-aadf-ce5ea4ed3896/909a3b6645360fe3c7a89e779530778bc25fcb4464b781eba9cbf4e5f8cedfef.webp)

Las observaciones correlacionadas separan el retraso desde el envío hasta el inicio, el tiempo transcurrido del worker y la ruta de respuesta HTTP.

Utiliza instrumentación personalizada si necesitas tiempos por ejecución. Como método editorial, adjunta un identificador de correlación y una marca temporal de entrada a cada solicitud de prueba, asocia ese identificador con su ejecución y correlaciona las observaciones con marcas temporales de inicio y finalización del worker. Utiliza una base temporal coherente entre componentes e informa de las observaciones sin correspondencia.

La implementación del worker inspeccionada en la rama master emite mensajes de inicio y finalización que contienen los identificadores de ejecución y de trabajo. Su mensaje de inicio se produce después de recuperar los datos iniciales de ejecución. Por tanto, denomina al tiempo transcurrido entre la entrada y el inicio «retraso desde el envío hasta el inicio»: incluye la sobrecarga de envío y las comprobaciones previas, y no es el tiempo exacto de permanencia en la cola de Redis.

Trata el tiempo transcurrido entre los mensajes de inicio y finalización como una aproximación al tiempo de procesamiento del worker, no como una métrica universal de duración de la ejecución. Mide por separado el tiempo de respuesta HTTP en el generador. El esquema de ejecución generado incluye createdAt, startedAt y stoppedAt, pero la mera presencia de esos campos no establece su semántica ni un cálculo admitido del retraso en cola.

La documentación citada no describe un histograma nativo del retraso en cola por ejecución. Si la cobertura de correlación o la coherencia de los relojes es insuficiente, conserva las mediciones que puedas justificar y marca la comparación de tiempos afectada como no concluyente.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md>), [n8n/packages/cli/src/scaling/job-processor.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/cli/src/scaling/job-processor.ts>), [n8n/docs/generated/postgres-schema/public.execution_data.md at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/docs/generated/postgres-schema/public.execution_data.md>)

<a id="cf-section-9"></a>

### ¿Cómo se recopilan de forma segura las señales de cola y recursos?

En n8n autoalojado, habilita las métricas con N8N_METRICS=true y las métricas de cola con N8N_METRICS_INCLUDE_QUEUE_METRICS=true. n8n expone las métricas de cola en las instancias principales e indica a los operadores que expongan el endpoint de métricas únicamente a los servicios internos que consumen datos de Prometheus.

Para despliegues en contenedores, Docker documenta docker stats como fuente de observaciones de CPU, uso de memoria, límite de memoria y E/S de red. Mantén el mismo método de recopilación: en Linux, la CLI de Docker resta la caché del uso de memoria, mientras que la API informa por separado de la memoria total y la caché.

Como práctica de recopilación sugerida, alinea las observaciones de cola y recursos en la cronología de la ejecución y conserva la información de reinicios de las instancias. Las observaciones de los contenedores no identifican qué dependencia causó una ralentización.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md>), [Enable Prometheus metrics | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics>), [Runtime metrics](<https://docs.docker.com/engine/containers/runmetrics/>), [docker container stats](<https://docs.docker.com/reference/cli/docker/container/stats/>)

Ayuda a tu equipo a diseñar e interpretar experimentos de concurrencia con nuestro programa n8n Advanced / Developer Training. Este enlace abre la página Para empresas de este sitio, que describe programas a medida con las herramientas, los datos y la instancia de n8n de tu equipo.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

<a id="cf-section-10"></a>

## ¿Cómo se identifica la presión sobre las dependencias antes de aumentar la concurrencia?

Inspecciona los errores de servicios externos y las observaciones de la base de datos junto con el comportamiento de la cola. n8n documenta las respuestas de limitación de solicitudes de los servicios y advierte de que un exceso de conexiones a PostgreSQL puede degradar el rendimiento. Una cola que crece es motivo para investigar estas señales antes de elegir un ajuste más alto.

Como consejo de diagnóstico editorial, compara cuándo empieza a crecer la cola con los cambios en errores de API, actividad de la base de datos y uso de recursos. Busca patrones repetidos entre ejecuciones comparables en lugar de atribuir una causa a partir de un único pico coincidente.

Creemos que un aumento de concurrencia que solo traslada la presión a una dependencia es una mala decisión operativa. La decisión debe favorecer un comportamiento aceptable de principio a fin, incluida la recuperación, en lugar de una cola más corta en un momento concreto.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/database.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/database.md>), [PostgreSQL: Documentation: 18: 27.2. The Cumulative Statistics System](<https://www.postgresql.org/docs/current/monitoring-stats.htm>), [PostgreSQL: Documentation: 18: 27.3. Viewing Locks](<https://www.postgresql.org/docs/current/monitoring-locks.html>), [n8n-docs/docs/integrations/builtin/handle-rate-limits.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/handle-rate-limits.md>)

<a id="cf-section-11"></a>

### ¿Qué debes hacer cuando se limitan las solicitudes a servicios posteriores?

n8n identifica HTTP 429 en los errores de los nodos como una respuesta de limitación de solicitudes del servicio. Inspecciona esos errores y consulta las cuotas aplicables en la documentación del propio proveedor.

n8n documenta Retry On Fail como una función que añade una pausa entre intentos, y Loop Over Items con Wait como una forma de agrupar solicitudes en lotes e introducir pausas. Estos controles no establecen un límite de solicitudes coordinado entre todos los workers.

Si la evidencia apunta a cambiar los reintentos o el procesamiento por lotes, crea un experimento independiente de política de reintentos con su propia referencia inicial. De lo contrario, cualquier diferencia observada combinaría un cambio de concurrencia con un patrón de solicitudes distinto.

Sources: [n8n-docs/docs/integrations/builtin/handle-rate-limits.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/handle-rate-limits.md>)

<a id="cf-section-12"></a>

### ¿Qué debes inspeccionar cuando PostgreSQL se convierte en la limitación?

Para las conexiones PostgreSQL de n8n autoalojado, DB_POSTGRESDB_POOL_SIZE controla las conexiones abiertas en paralelo. n8n advierte de que un exceso de conexiones puede degradar el rendimiento; la documentación no proporciona una fórmula de dimensionamiento específica para cada carga.

PostgreSQL 18 documenta pg_stat_activity para observar la actividad actual de los procesos del servidor, incluidos su estado y consulta, y pg_locks para examinar los bloqueos existentes e investigar la contención. Utiliza esas observaciones para investigar la base de datos durante la misma ventana de ejecución que las mediciones de la cola.

La observación en PostgreSQL 18 tiene límites: las estadísticas acumulativas pueden retrasarse o permanecer en caché dentro de una transacción, y la visibilidad de otras sesiones depende de los privilegios. Los bloqueos existentes, por sí solos, no demuestran que la concurrencia haya causado una regresión. Como consejo editorial, implica al responsable de la base de datos en la interpretación de la actividad y la contención antes de cambiar el pool.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/database.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/database.md>), [PostgreSQL: Documentation: 18: 27.2. The Cumulative Statistics System](<https://www.postgresql.org/docs/current/monitoring-stats.htm>), [PostgreSQL: Documentation: 18: 27.3. Viewing Locks](<https://www.postgresql.org/docs/current/monitoring-locks.html>)

<a id="cf-section-13"></a>

## ¿Cómo se comparan los candidatos y se definen los criterios de aceptación?

Define los criterios de aceptación antes de ejecutar los candidatos. Las recomendaciones de k6 de Grafana proponen criterios de aprobado o fallido vinculados a objetivos de nivel de servicio u otras métricas importantes. Tu equipo debe aportar el requisito de carga, los objetivos de latencia, el margen de recuperación y los presupuestos de recursos; esta guía no propone umbrales universales.

Utiliza la tabla de resultados vacía que aparece a continuación como plantilla editorial de comparación. Introduce observaciones en lugar de una impresión general y conserva las series temporales subyacentes cuando un resumen pueda ocultar una acumulación creciente de trabajo o un breve pico de recursos.

**Plantilla vacía de comparación de candidatos**

| Observación | Referencia | Candidato A | Candidato B |
| --- | --- | --- | --- |
| Concurrencia efectiva por worker | Sin registrar | Sin registrar | Sin registrar |
| Carga entregada | Sin registrar | Sin registrar | Sin registrar |
| Resultados de negocio correctos | Sin registrar | Sin registrar | Sin registrar |
| Latencia de respuesta HTTP | Sin registrar | Sin registrar | Sin registrar |
| Retraso desde el envío hasta el inicio | Sin registrar | Sin registrar | Sin registrar |
| Aproximación al tiempo del worker | Sin registrar | Sin registrar | Sin registrar |
| Recuperación de la cola | Sin registrar | Sin registrar | Sin registrar |
| CPU | Sin registrar | Sin registrar | Sin registrar |
| Memoria | Sin registrar | Sin registrar | Sin registrar |
| Errores de servicios posteriores | Sin registrar | Sin registrar | Sin registrar |
| Observaciones de la base de datos | Sin registrar | Sin registrar | Sin registrar |

Recomendamos elegir el candidato menos agresivo que cumpla todos los criterios obligatorios. Si la configuración de referencia ya satisface la necesidad acordada, conservarla es un resultado válido; ajustar no obliga a aceptar un cambio.

Sources: [API load testing](<https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/?pg=dash5309>)

<a id="cf-section-14"></a>

### ¿Cómo llevaría una comparación hipotética a la aceptación y la reversión?

El siguiente ejemplo desarrollado es una orientación editorial hipotética. Todas las cargas, los umbrales y las observaciones que aparecen aquí son inventados para demostrar el proceso de decisión; no son resultados medidos ni objetivos recomendados. Supongamos que un equipo compara dos workers con una concurrencia efectiva de 5 frente a esos mismos dos workers con 10, manteniendo sin cambios la versión instalada, la revisión del flujo, los límites de recursos, el pool de la base de datos, la mezcla de payloads, los reintentos y el entorno de dependencias.

Para cada ejecución, programa una solicitud webhook por iteración a dos iteraciones por segundo durante cinco minutos: 600 solicitudes. Deja otros 60 segundos para la recuperación y concilia todos los registros de destino esperados. Antes de probar, establece criterios locales: los 600 resultados correctos, ninguna iteración descartada, p95 de respuesta HTTP inferior a 500 milisegundos, p95 desde el envío hasta el inicio inferior a dos segundos, recuperación de la cola en 60 segundos, pico de memoria del worker inferior al 75 % de su límite, ningún error de API y ningún bloqueo observado en la base de datos. La tabla muestra observaciones ficticias.

**Ejemplo editorial hipotético: observaciones inventadas, no resultados de rendimiento medidos ni objetivos universales**

| Dimensión | Referencia: 5 | Candidato: 10 |
| --- | --- | --- |
| Solicitudes entregadas / iteraciones descartadas | 600 / 0 | 600 / 0 |
| Resultados correctos en el destino | 600 | 596 |
| p95 de respuesta HTTP | 300 ms | 280 ms |
| p95 desde el envío hasta el inicio | 1,5 s | 0,8 s |
| Recuperación de la cola | 30 s | 45 s |
| Pico de memoria del worker / límite | 55 % | 70 % |
| Errores de API | 0 | 4 respuestas HTTP 429 |
| Bloqueos observados en la base de datos | Ninguno | Ninguno |
| Decisión | Aprobado | Fallido |

Con estos criterios inventados, la referencia aprueba y el candidato falla a pesar de su menor retraso desde el envío hasta el inicio. Conserva la referencia. Antes de ejecutar el candidato, guarda la revisión completa del despliegue de referencia como configuración A: dos workers, --concurrency=5 y N8N_CONCURRENCY_PRODUCTION_LIMIT=-1, junto con todos los ajustes que no cambian. La configuración candidata B utiliza --concurrency=10 con ese mismo valor de entorno.

Para este ejemplo, declara de antemano cualquier respuesta HTTP 429 como desencadenante de reversión inmediata. Cuando aparezca el primer 429 ficticio, detén las llegadas y sigue el procedimiento de apagado planificado. Restaura la configuración A mediante el mecanismo de despliegue del equipo, verifica la concurrencia efectiva de 5 en ambos workers y concilia las escrituras inciertas. Repite la carga de referencia; unas observaciones ficticias de recuperación de 600 resultados correctos, cero errores de API y una recuperación de cola de 30 segundos cumplirían estos criterios de recuperación de ejemplo. Conserva tanto el registro del candidato fallido como la evidencia de recuperación.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md>), [n8n/packages/cli/src/commands/worker.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/cli/src/commands/worker.ts>), [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-15"></a>

### ¿Qué hace que una ejecución sea aprobada, fallida o no concluyente?

Separa las comprobaciones de corrección de los umbrales de la prueba. Grafana señala que las comprobaciones fallidas de k6 no hacen que una prueba falle o se interrumpa de forma predeterminada. Configura explícitamente el comportamiento previsto de aprobado o fallido.

Como regla de decisión sugerida, aprueba solo cuando la carga entregada, la corrección del proceso de negocio, la latencia, la recuperación de la cola, los recursos y los fallos de dependencias cumplan todos los criterios declarados previamente. Marca como fallida una comparación válida que incumpla un criterio obligatorio. Marca el resultado como no concluyente cuando las cargas difieran, las observaciones sean insuficientes o el generador no cumpla la programación requerida.

Mantén las condiciones de parada separadas de la aceptación final. Entre las condiciones de parada sugeridas están un límite de errores acordado, un impacto inaceptable sobre las dependencias o la imposibilidad de observar el sistema adecuadamente. Asigna un operador que pueda actuar ante esas condiciones mientras la ejecución está en curso.

Sources: [Built-in metrics](<https://grafana.com/docs/k6/latest/using-k6/metrics/reference/>), [API load testing](<https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/?pg=dash5309>)

<a id="cf-section-16"></a>

## ¿Cómo se revierte el cambio y se confirma la recuperación?

![Una puerta de llegadas cerrada, una bandeja de worker terminando su trabajo, un separador restaurado y paquetes de referencia muestran la secuencia de reversión de concurrencia.](/blog/es/article-3623684a-e764-491c-aadf-ce5ea4ed3896/3e0c9327f9c1c70a40894d32fd1bca46c2731fc6838c5b06f61f5b69c2dcf287.webp)

La reversión incluye un apagado controlado, la restauración de la configuración y la repetición de la carga de referencia.

Restaura la configuración efectiva anterior completa, incluida cualquier variable de entorno que prevalezca, mediante tu mecanismo habitual de despliegue. n8n documenta N8N_GRACEFUL_SHUTDOWN_TIMEOUT como el tiempo permitido para que los trabajos en ejecución de los workers terminen antes de su finalización forzada. Coordina el margen de apagado del entorno con esa ventana.

Docker Compose documenta la detención de servicios sin eliminar sus contenedores y proporciona una opción de tiempo de espera de apagado. Ese comportamiento de detención no constituye un procedimiento completo de actualización de configuración: iniciar un contenedor existente que estaba detenido no demuestra que se haya aplicado la configuración modificada.

Un margen de apagado no garantiza que todas las ejecuciones terminen ni que las escrituras externas se realicen exactamente una vez. Incluye la conciliación de resultados en tu plan de recuperación. La secuencia siguiente es una práctica editorial sugerida que debe adaptarse a tu despliegue.

1. Detén las llegadas de prueba cuando se alcance un desencadenante de reversión.
2. Utiliza el procedimiento de apagado planificado y observa el trabajo en ejecución.
3. Restaura la revisión del despliegue conservada y el valor efectivo que prevalece.
4. Verifica la configuración aplicada de cada worker.
5. Concilia los resultados de negocio sin terminar o inciertos.
6. Repite la carga de referencia y evalúa los criterios de recuperación.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md>), [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>), [docker compose stop](<https://docs.docker.com/reference/cli/docker/compose/stop/>)

<a id="cf-section-17"></a>

### ¿Qué debe incluir el registro operativo final?

Conserva juntos la configuración aceptada, la definición de la carga, la evidencia de la carga entregada, la cobertura de medición, la decisión de aceptación, el desencadenante de reversión y las observaciones de recuperación. Como práctica sugerida para el traspaso, incluye al responsable y las circunstancias que deberían motivar otra comparación, como un cambio en la combinación de flujos de trabajo.

El resultado respalda una elección operativa para la carga y el entorno probados. Conserva suficientes detalles para que otro operador pueda repetir la comparación y evaluar si la decisión sigue siendo adecuada.

Obtén ayuda práctica para revisar el comportamiento de las colas, la presión sobre las dependencias y la preparación para revertir cambios con nuestro Workflow Audit, que revisa la fiabilidad, la seguridad y la mantenibilidad de la instancia de n8n y los flujos de tu equipo. Este enlace abre la página Para empresas de este sitio.

**[Audita los workers de tu equipo](https://n8n-challenges.app/es/companies)**

Tags: Autoalojamiento, Preparación para producción, Guía extensa
