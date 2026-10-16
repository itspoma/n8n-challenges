---
{
  "id": "opp_df1658ad-6deb-432a-ad1d-e2dbea4685dc",
  "locale": "es",
  "slug": "article-df1658ad-6deb-432a-ad1d-e2dbea4685dc",
  "urlSlug": "pruebas-de-carga-en-n8n-un-ejercicio-editorial-para-determinar-la-capacidad-provisional",
  "publishedAt": "2026-10-16T14:32:22.722Z",
  "title": "Pruebas de carga en n8n: un ejercicio editorial para determinar la capacidad provisional",
  "subtitle": "Practica pruebas de carga en un flujo aislado de n8n autoalojado: aumenta el tráfico sintético, concilia el trabajo completado e identifica una tasa válida repetible.",
  "description": "Practica pruebas de carga en un flujo aislado de n8n autoalojado: aumenta el tráfico sintético, concilia el trabajo completado e identifica una tasa válida repetible.",
  "date": "2026-10-16",
  "sourcesCheckedAt": "2026-10-16T14:16:27.570Z",
  "tags": [
    "Autoalojamiento",
    "Preparación para producción",
    "Ejercicio"
  ],
  "coverImage": "/blog/es/article-df1658ad-6deb-432a-ad1d-e2dbea4685dc/bca5a452ec9b01b719dcc681f7e730f33dc4a9a70ff7271c31459dd6578892b2.webp",
  "coverAlt": "Paquetes rosas recorren una cinta con compuerta hacia una bandeja de pesaje junto a un cronómetro para representar las pruebas de carga en n8n.",
  "seo": {
    "title": "Pruebas de carga en n8n: un ejercicio editorial para determinar la capacidad provisional",
    "description": "Practica pruebas de carga en un flujo aislado de n8n autoalojado: aumenta el tráfico sintético, concilia el trabajo completado e identifica una tasa válida repetible.",
    "keywords": []
  },
  "revision": "1feb994a8a33134df949f78ecc20660757994cb769610c65d8a60c2ba8524ea8"
}
---

## Tu tarea de pruebas de carga en n8n

Este ejercicio editorial propone a tu equipo identificar la mayor tasa de llegada de solicitudes webhook probada que cumpla vuestros requisitos de latencia, fallos y trabajo completado. La práctica propuesta de pruebas de carga en n8n no se ha ejecutado ni validado. Su resultado es provisional: solo se aplica a la duración, la carga de trabajo, el despliegue, las dependencias y los criterios de finalización probados.

Parte de una [instancia de prueba autoalojada](<https://n8n-challenges.app/es/blog/configurar-un-entorno-de-staging-en-n8n>) que ya funcione, un flujo aislado, una instalación operativa de k6 y un servicio de destino controlado. La instalación queda fuera de este ejercicio. Usa registros sintéticos y sustituye los efectos externos por servicios simulados. WireMock admite respuestas basadas en coincidencias con las solicitudes y retardos fijos; estos no permiten establecer las cuotas, la disponibilidad, los efectos de negocio ni la distribución completa de la latencia de un servicio de destino real.

Creemos que un ejercicio útil de capacidad debe empezar por definir qué cuenta como trabajo terminado, porque una confirmación rápida de recepción es una base insuficiente para tomar una decisión operativa.

Sources: [Stubbing | WireMock](<https://wiremock.org/docs/stubbing/>), [Simulating Faults | WireMock](<https://wiremock.org/docs/simulating-faults/>)

## Define las entradas y las pruebas de finalización

![Fichas con formas estampadas se conectan mediante hilos rosas a través de tres capas de pruebas para comprobar la finalización de flujos de n8n.](/blog/es/article-df1658ad-6deb-432a-ad1d-e2dbea4685dc/3d65ab092b5e7179dd7c2f5b9e4ec28a80893d892899f64ac320642ebbfc43d9.webp)

Las fichas coincidentes y los hilos rosas entre tres capas ilustran cómo los identificadores vinculan envíos, comprobantes y salidas completadas.

Prepara las siguientes entradas del ejercicio antes de enviar tráfico. Registra las versiones instaladas de n8n, k6 y WireMock. Los límites son decisiones de tu equipo, no recomendaciones universales.

**Ficha sugerida de entradas del ejercicio**

| Entrada | Qué registrar antes de la prueba |
| --- | --- |
| Configuración | Versiones, modo de ejecución, concurrencia, hardware y revisión del flujo |
| Carga de trabajo | Estructura del contenido sintético, tasas y duración de cada etapa de carga constante |
| Aceptación HTTP | Límites de latencia de las solicitudes y de fallos de transporte |
| Trabajo completado | Salida esperada, proporción requerida de finalización y plazo |
| Límites de parada | Topes de recursos y condiciones de disponibilidad operativa |
| Pruebas | Registro de envíos, comprobantes y resultados de ejecución accesibles |

Publicar un flujo de n8n registra su [webhook de producción](<https://n8n-challenges.app/es/blog/publica-un-webhook-trigger-en-n8n-de-la-url-de-prueba-a-resolver-los-404>); utiliza esa URL dentro del despliegue aislado. Una respuesta inmediata confirma el inicio, mientras que el modo de respuesta del último nodo espera a que ese nodo termine. Ni la confirmación ni la respuesta del último nodo, por sí solas, demuestran todos los efectos de negocio previstos. Exige la salida esperada, un comprobante de la operación final y un resultado de ejecución correcto dentro del plazo para terminar el trabajo pendiente.

Diseña los identificadores de correlación a partir de un identificador de prueba, el nombre del escenario y scenario.iterationInTest de k6, que es único dentro de su escenario. Esta composición es una sugerencia editorial. Mantén un registro de los envíos reales en vez de deducir las cantidades a partir del identificador más alto, ya que las secuencias de iteraciones distribuidas pueden tener saltos.

Sources: [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.webhook/README.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.webhook/README.md>), [k6/execution](<https://grafana.com/docs/k6/latest/javascript-api/k6-execution/>)

## Ejecuta etapas de tráfico creciente

![Cuentas rosas avanzan por canales con compuertas hacia cuencos mientras una mano cierra la última compuerta, representando etapas de tráfico en n8n.](/blog/es/article-df1658ad-6deb-432a-ad1d-e2dbea4685dc/3d664153b4021b10e051d751e3b1c69a965155e6618fecefe987131a067c4fd2.webp)

Las cuentas que avanzan por canales con compuertas hacia cuencos ilustran etapas de tráfico independientes y la finalización del trabajo ya aceptado.

Para este ejercicio de pruebas de rendimiento en n8n, define un POST al webhook por iteración de k6. k6 admite contenido JSON con una cabecera Content-Type; controla explícitamente las redirecciones y comprueba la respuesta del endpoint previsto. Su ejecutor constant-arrival-rate inicia iteraciones con independencia del tiempo de respuesta mientras haya usuarios virtuales disponibles. Configura rate, timeUnit, duration, preAllocatedVUs y maxVUs para cada etapa independiente de carga constante.

Sigue esta secuencia sugerida, manteniendo el mismo contenido y los mismos supuestos sobre el servicio de destino entre etapas.

1. Haz una prueba básica con un envío y verifica la propagación del identificador, la salida esperada y el acceso a las pruebas de finalización.
2. Ejecuta una etapa con una tasa de llegada baja y registra los envíos configurados frente a los logrados, la latencia y los fallos HTTP.
3. Detén los envíos, deja que termine el trabajo pendiente y concilia los comprobantes con los resultados de ejecución.
4. Aumenta la tasa de llegada solo después de superar una etapa; registra cada vez la disponibilidad operativa, las observaciones sobre recursos y los estados de ejecución.
5. Repite la etapa de mayor carga que haya superado los criterios con la misma configuración para comprobar su repetibilidad.

En todas las ediciones autoalojadas de n8n, /metrics está desactivado por defecto y se activa con N8N_METRICS=true; no está disponible en n8n Cloud. Comprueba qué mediciones puedes recopilar en lugar de dar por hecho que existen métricas concretas de recursos o trabajo pendiente. /healthz/readiness devuelve HTTP 200 cuando la base de datos está conectada y migrada; no demuestra la capacidad para procesar la carga de trabajo. /healthz comprueba la accesibilidad sin informar del estado de la base de datos. Las comprobaciones de estado de los workers en modo cola requieren QUEUE_HEALTH_CHECK_ACTIVE=true.

Deja de aumentar la carga cuando se incumpla un límite de aceptación, se deteriore la disponibilidad operativa, se alcance un tope de recursos o el generador no pueda producir la carga prevista. k6 ofrece exec.test.abort(), tras el cual teardown sigue ejecutándose. Detener el generador no cancela el trabajo ya aceptado por n8n; obsérvalo hasta el plazo acordado para terminar el trabajo pendiente.

Sources: [n8n-docs/docs/deploy/host-n8n/keep-n8n-running/monitor-n8n.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/keep-n8n-running/monitor-n8n.md>), [Constant arrival rate](<https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/constant-arrival-rate/>), [k6/execution](<https://grafana.com/docs/k6/latest/javascript-api/k6-execution/>), [HTTP Requests](<https://grafana.com/docs/k6/latest/using-k6/http-requests/>)

¿Diriges un equipo que practica el diseño y la interpretación de pruebas de carga? Nuestro programa n8n Advanced / Developer Training ayuda a tu equipo a desarrollar esas habilidades con vuestras propias herramientas, datos e instancia de n8n. El enlace abre la página Para empresas de este sitio.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Concilia los envíos con el trabajo completado

![Bandejas de clasificación muestran un hueco vacío, formas duplicadas y un objeto colocado a medias para representar la conciliación de finalizaciones en n8n.](/blog/es/article-df1658ad-6deb-432a-ad1d-e2dbea4685dc/35282250c9a63e95df48a350cc49f7db2cb87880641f0a5bd0eac92846a94457.webp)

Las bandejas de clasificación con un hueco vacío, formas duplicadas y un objeto colocado a medias ilustran trabajo ausente, duplicado y sin terminar.

En las pruebas de carga en n8n, concilia los identificadores después de cada etapa. WireMock permite consultar las solicitudes recibidas mediante GET /__admin/requests y los recuentos de coincidencias mediante POST /__admin/requests/count. Mantén su registro en memoria activado e intacto hasta la conciliación; su consumo de memoria puede afectar a la prueba. Un comprobante en ese registro demuestra la llegada al servicio simulado, no la finalización correcta de la operación de negocio.

Usa los filtros de ejecuciones de n8n por flujo, estado y hora de inicio para investigar los resultados. La visibilidad depende del acceso al flujo, y eliminarlo también elimina su historial de ejecuciones. Prepara el proceso de conciliación antes de aplicar carga; no des por hecho que estas herramientas vinculan automáticamente los envíos con el trabajo completado. Elabora el siguiente registro sugerido a partir de tu registro de envíos, los comprobantes y las pruebas de ejecución.

- [ ] Cuenta los envíos reales y los identificadores únicos que cumplen todos los criterios de finalización.
- [ ] Enumera los identificadores ausentes y los comprobantes duplicados de la operación final.
- [ ] Separa los fallos HTTP de las ejecuciones fallidas del flujo y de las salidas incorrectas.
- [ ] Enumera las ejecuciones que siguen sin terminar al vencer el plazo para completar el trabajo pendiente.
- [ ] Señala explícitamente las pruebas no disponibles o ambiguas.

Sources: [View all executions | Build | n8n Docs](<https://docs.n8n.io/build/understand-workflows/understand-executions/view-all-executions>), [Verifying | WireMock](<https://wiremock.org/docs/verifying/>)

## Resuelve una decisión hipotética sobre capacidad

Este ejemplo resuelto de pruebas de carga en n8n utiliza entradas y resultados inventados para el ejercicio, no mediciones reales de n8n. Supongamos que un equipo elige etapas de cinco minutos, un p95 de respuesta HTTP igual o inferior a 500 milisegundos, fallos HTTP iguales o inferiores al 1 % y un 100 % de finalizaciones únicas correctas en los 60 segundos posteriores al fin de los envíos, sin salidas duplicadas. Son decisiones hipotéticas de un equipo, no límites recomendados.

Supón una configuración sin cambios, confirmaciones inmediatas del webhook, pruebas intactas, disponibilidad operativa estable y ningún incumplimiento de los límites de parada por recursos. Ejecuta las etapas en el orden de la tabla y deja que termine el trabajo pendiente entre ellas. Cuenta una finalización solo cuando su identificador tenga la salida esperada, el comprobante de la operación final y un resultado de ejecución correcto. La tabla separa la latencia de confirmación de esos criterios de finalización.

**Resultados inventados del ejercicio; cada etapa dura 300 segundos**

| Etapa | Tasa configurada / total | Envíos reales / tasa | p95 HTTP | Fallos HTTP | Finalizaciones dentro del plazo |
| --- | --- | --- | --- | --- | --- |
| A | 10/s / 3.000 | 3.000 / 10/s | 200 ms | 0 / 3.000 = 0 % | 3.000 / 3.000 = 100 % |
| B | 20/s / 6.000 | 6.000 / 20/s | 400 ms | 0 / 6.000 = 0 % | 6.000 / 6.000 = 100 % |
| Repetición de B | 20/s / 6.000 | 6.000 / 20/s | 420 ms | 0 / 6.000 = 0 % | 6.000 / 6.000 = 100 % |
| C | 30/s / 9.000 | 9.000 / 30/s | 700 ms | 180 / 9.000 = 2 % | 8.820 / 9.000 = 98 % |

Calcula la tasa lograda dividiendo los envíos reales entre 300 segundos. En la etapa B, 6.000 dividido entre 300 da 20 envíos por segundo; los fallos HTTP son 0 dividido entre 6.000, es decir, un 0 %, y las finalizaciones son 6.000 dividido entre 6.000, es decir, un 100 %. Su repetición también supera los criterios. En la etapa C, 180 dividido entre 9.000 da un 2 % de fallos HTTP, mientras que 8.820 dividido entre 9.000 da un 98 % de finalización. Su p95 de 700 milisegundos también supera el límite elegido.

La decisión sugerida es una tasa provisional máxima probada que cumple los criterios de 20 envíos por segundo, reproducida en la repetición de la etapa B. La etapa C no los cumple pese a alcanzar el tráfico configurado; deja de aumentar la carga. Sus 180 identificadores incompletos requieren investigación, aunque su cantidad coincida con el número de fallos HTTP: que los totales coincidan no demuestra que los identificadores sean los mismos ni establece una causa. Las tasas entre 20 y 30 siguen sin probarse, y este ejemplo no establece ningún límite operativo para producción.

## Termina con una decisión de alcance limitado

Completar el ejercicio significa documentar la etapa de mayor carga probada que cumpla los criterios de forma repetible, junto con su configuración y los supuestos sobre la carga de trabajo. Si todas las etapas superan los criterios, informa únicamente de la mayor tasa probada que los cumple; no has establecido un límite superior. Si el generador o la recopilación de pruebas limitan el ejercicio, informa de un resultado no concluyente.

Reflexión sugerida: revisa la disponibilidad de usuarios virtuales del generador, las coincidencias de solicitudes en el servicio simulado, la integridad del registro y los estados de ejecución de n8n. En n8n autoalojado en modo regular, el control de concurrencia de producción está desactivado por defecto; N8N_CONCURRENCY_PRODUCTION_LIMIT limita las ejecuciones de producción simultáneas y pone el trabajo excedente en cola en orden FIFO. Excluye las ejecuciones manuales, de subflujos, de error y por CLI. [El modo cola utiliza un mecanismo de concurrencia independiente](<https://n8n-challenges.app/es/blog/modo-queue-vs-modo-normal-en-n8n-cuando-cambiar>).

Nuestra recomendación práctica es cambiar una restricción sospechosa y repetir la misma carga de trabajo antes de atribuirle una mejora. Trata una cola o un pico de latencia como una pista que investigar, no como un diagnóstico causal.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/control-concurrency.md>), [View all executions | Build | n8n Docs](<https://docs.n8n.io/build/understand-workflows/understand-executions/view-all-executions>), [Constant arrival rate](<https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/constant-arrival-rate/>), [Verifying | WireMock](<https://wiremock.org/docs/verifying/>)

Recibe ayuda práctica para revisar los problemas de fiabilidad y mantenibilidad que revele vuestro ejercicio con nuestro Workflow Audit de la instancia y los flujos de n8n de tu equipo. El enlace abre la página Para empresas de este sitio; las consultas se envían mediante el enlace de LinkedIn de esa página.

**[Revisa la fiabilidad de vuestros flujos](https://n8n-challenges.app/es/companies)**

Tags: Autoalojamiento, Preparación para producción, Ejercicio
