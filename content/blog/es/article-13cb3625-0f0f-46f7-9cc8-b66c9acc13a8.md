---
{
  "id": "opp_13cb3625-0f0f-46f7-9cc8-b66c9acc13a8",
  "locale": "es",
  "slug": "article-13cb3625-0f0f-46f7-9cc8-b66c9acc13a8",
  "urlSlug": "opciones-de-despliegue-de-n8n-autoalojamiento-y-modo-cola",
  "title": "Opciones de despliegue de n8n: autoalojamiento y modo cola",
  "subtitle": "Guía práctica de las opciones de despliegue de n8n: elegir método de instalación y base de datos, y cuándo pasar de modo main a modo cola.",
  "description": "Guía práctica de las opciones de despliegue de n8n: elegir método de instalación y base de datos, y cuándo pasar de modo main a modo cola.",
  "date": "2026-09-19",
  "sourcesCheckedAt": "2026-09-19T12:40:59.381Z",
  "tags": [
    "n8n",
    "Autoalojamiento",
    "Preparación para producción",
    "Guía extensa"
  ],
  "coverImage": "/blog/es/article-13cb3625-0f0f-46f7-9cc8-b66c9acc13a8/6799b2ec85db24ca57941a990a354d85d2a4152322824b6d8f92fa028e54a630.png",
  "coverAlt": "Ilustración de las opciones de despliegue de n8n: un contenedor principal que pasa trabajo a través de un concentrador a tres cajas de workers",
  "seo": {
    "title": "Opciones de despliegue de n8n: autoalojamiento y modo cola",
    "description": "Guía práctica de las opciones de despliegue de n8n: elegir método de instalación y base de datos, y cuándo pasar de modo main a modo cola.",
    "keywords": []
  },
  "revision": "98a6a56a3e8fc26d33d1b91681e8c9e8e8124dca972615f5ce5a2e89117bc3cc"
}
---

**Contenido**

- [A qué se compromete tu equipo al autoalojar n8n](#cf-section-1)
- [¿Qué opciones de despliegue de n8n encajan con tu equipo?](#cf-section-2)
  - [Instalación de una línea, Docker y Docker Compose](#cf-section-3)
  - [Proveedores cloud, Kubernetes y la vía npm obsoleta](#cf-section-4)
- [¿Qué base de datos debe sustentar una instancia de equipo?](#cf-section-5)
  - [En qué se diferencian SQLite y PostgreSQL para una instancia de equipo](#cf-section-6)
- [¿Cuándo importa el modo cola y cómo funciona?](#cf-section-7)
  - [Configurar la clave de cifrado, el modo de ejecuciones y Redis](#cf-section-8)
  - [Workers, concurrencia y límites de escalado](#cf-section-9)
  - [Qué cambia en el día a día tras el cambio](#cf-section-10)
- [Una vía por etapas del contenedor único al modo cola](#cf-section-11)

<a id="cf-section-1"></a>

## A qué se compromete tu equipo al autoalojar n8n

Comparar las opciones de despliegue de n8n empieza por una mirada honesta a lo que asumes. n8n documenta el autoalojamiento en tu propia infraestructura mediante Docker Compose, un script de instalación de una línea u otros métodos, y señala que toda instalación autoalojada ejecuta el mismo producto base. Sin clave de licencia funciona como edición Community gratuita; una clave desbloquea las [ediciones Business o Enterprise](<https://n8n-challenges.app/es/blog/precios-enterprise-de-n8n-vs-community-que-queda-restringido>).

La documentación es directa sobre el compromiso: Docker es lo recomendado para la mayoría de necesidades de autoalojamiento, pero [autoalojar exige conocimientos técnicos de servidores, contenedores, escalado y seguridad](<https://n8n-challenges.app/es/blog/lista-de-comprobacion-para-preparar-n8n-autoalojado-para-produccion>), y se recomienda n8n Cloud para quienes no tienen experiencia gestionando servidores. Trátalo como una cuestión de personal antes de que sea una cuestión de arquitectura.

La cadencia de versiones también importa. n8n publica una nueva versión menor casi cada semana, con la línea estable pensada para producción y la beta posiblemente inestable. Fija una versión estable en lugar de seguir la beta. Los números de versión cambian semanalmente, así que comprueba tú mismo la versión actual en vez de fiarte de un número escrito en un artículo.

Hay un detalle operativo fácil de pasar por alto y caro después: incluso usando PostgreSQL, n8n recomienda mantener persistente el directorio .n8n, porque contiene [claves de cifrado](<https://n8n-challenges.app/es/blog/lista-de-seguridad-de-n8n-para-una-instancia-compartida-y-autoalojada>), registros de la instancia y activos de control de versiones. Esa clave de cifrado es el valor que más adelante copiarás a cada worker.

- [ ] Decide quién del equipo se responsabiliza de servidores, contenedores y seguridad.
- [ ] Elige Community o una edición con licencia antes de dimensionar la infraestructura.
- [ ] Fija una versión estable de n8n para producción.
- [ ] Monta el directorio .n8n en almacenamiento persistente.
- [ ] Define la clave de cifrado explícitamente en la primera ejecución.

Sources: [Host n8n | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n>), [Install with Docker | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/install-options/install-with-docker>)

<a id="cf-section-2"></a>

## ¿Qué opciones de despliegue de n8n encajan con tu equipo?

![Comparación entre una instalación rápida ligera, una pila de producción con Compose y una vía de instalación obsoleta apartada](/blog/es/article-13cb3625-0f0f-46f7-9cc8-b66c9acc13a8/cea1e5d56a2e0d916b69141a98aedc098768604a9daa4eca49845b17214b024e.png)

Contraste ilustrativo de las rutas de instalación documentadas.

Los métodos de instalación documentados no son intercambiables; cada uno se plantea para una situación distinta, y elegir el equivocado suele manifestarse como una migración más adelante.

La tabla siguiente resume cómo la propia documentación de n8n posiciona las rutas principales.

**Cómo posiciona la documentación de n8n cada ruta de autoalojamiento**

| Método | Propósito documentado | Nota |
| --- | --- | --- |
| Docker Compose | Despliegues en producción con bases de datos y servicios adicionales | Ruta de producción recomendada |
| Script de instalación de una línea | Instalación rápida con mínima configuración en Linux o macOS | Configuración mínima |
| npm | Desarrollo local o pruebas | Obsoleto a partir de n8n 3.0 |
| Proveedores cloud | Desplegar en infraestructura gestionada | Los pasos por proveedor no se cubren aquí |

Sources: [Host n8n | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n>)

<a id="cf-section-3"></a>

### Instalación de una línea, Docker y Docker Compose

La instalación de una línea está pensada para una puesta en marcha rápida con mínima configuración en Linux o macOS. Es una forma estupenda de ver n8n funcionando, pero una instancia de equipo necesita base de datos, copias de seguridad y una vía de actualización definida, y justo para eso se posiciona Docker Compose: despliegues en producción con bases de datos y servicios adicionales.

En la práctica, a un equipo le conviene escribir un fichero Compose que pueda versionar y revisar, porque ese mismo fichero documenta la conexión a la base de datos, el volumen persistente y las variables de entorno que el modo cola necesitará después.

Sources: [Host n8n | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n>)

<a id="cf-section-4"></a>

### Proveedores cloud, Kubernetes y la vía npm obsoleta

n8n enumera destinos de despliegue en la nube que incluyen AWS, Azure, Google Cloud Run y Google Kubernetes Engine, DigitalOcean, Hetzner, Heroku y OpenShift. Son opciones, no equivalentes; los requisitos por proveedor quedan fuera de esta guía, así que consulta la página del proveedor de la plataforma que elijas.

Lo que sí revela esa lista es que las opciones de despliegue de n8n abarcan modelos operativos muy distintos. Un único droplet en DigitalOcean o un servidor en Hetzner te da una máquina que parcheas tú. Una plataforma de contenedores como Cloud Run, Kubernetes Engine u OpenShift te da planificación y reinicios, pero exige a tu equipo manifiestos, gestión de secretos y decisiones de almacenamiento que un único fichero Compose mantiene en un solo sitio.

Una forma útil de elegir es preguntarse en qué plataforma ya opera tu equipo en producción. Ejecutar n8n junto a sistemas que monitorizas y actualizas cada semana suele ser menos arriesgado que introducir una plataforma nueva para una sola carga de trabajo, porque el conocimiento que pide n8n (servidores, contenedores, escalado y seguridad) es el mismo que ya exige tu plataforma actual.

La vía npm merece un veredicto claro. Está documentada como la mejor para desarrollo local o pruebas y queda obsoleta a partir de n8n 3.0, recomendándose en su lugar Docker Compose o la instalación de una línea. Si hoy tienes una instancia de equipo sobre npm, planifica la migración en vez de esperar a que una actualización te obligue.

Sources: [Host n8n | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n>)

<a id="cf-section-5"></a>

## ¿Qué base de datos debe sustentar una instancia de equipo?

Por defecto, n8n autoalojado usa SQLite, almacenado como un fichero en ~/.n8n/database.sqlite. PostgreSQL es opcional y se configura con variables de entorno como DB_TYPE con valor postgresdb, DB_POSTGRESDB_HOST y DB_POSTGRESDB_PORT, cuyo valor por defecto es 5432. n8n necesita permiso para crear y modificar sus propios esquemas de tablas, así que concédelo al aprovisionar el usuario de la base de datos.

- SQLite es la opción por defecto y no necesita configuración.
- PostgreSQL se activa mediante DB_TYPE y las variables de entorno de conexión.
- El usuario de base de datos de n8n debe poder crear y modificar esquemas de tablas.

El soporte de versiones es un objetivo móvil. n8n admite las dos últimas versiones mayores de PostgreSQL con mantenimiento activo, que eran la 17 y la 18 en julio de 2026, más una mayor anterior, la 16. Amazon Aurora PostgreSQL es experimental, y derivados como AlloyDB o CockroachDB no están soportados. Las versiones mayores admitidas cambian cada noviembre, así que confirma la lista actual antes de aprovisionar.

La recomendación editorial es sencilla: empieza una instancia de equipo con PostgreSQL en lugar de SQLite. La siguiente sección explica por qué esa elección es en la práctica un requisito previo del modo cola, y empezar así evita una migración de base de datos bajo presión más adelante.

Sources: [Choose n8n's database | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/choose-n8ns-database>), [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-6"></a>

### En qué se diferencian SQLite y PostgreSQL para una instancia de equipo

La base de datos por defecto no es un sustituto provisional: SQLite guarda credenciales, ejecuciones pasadas y workflows igual que PostgreSQL, y una instancia de equipo pequeña puede funcionar con ella mucho tiempo. La diferencia aparece en lo que cada elección permite después, más que en cualquier cifra publicada en la documentación, ya que las páginas de n8n describen soporte y configuración, no rendimiento comparado.

La restricción decisiva es la distribución. n8n indica que el modo de ejecución en cola con SQLite no es recomendable y que una configuración distribuida sobre SQLite no está soportada, porque Redis gestiona los mensajes mientras la base de datos persiste los datos. Una base de datos basada en fichero dentro de un único contenedor no tiene papel alguno cuando varios procesos worker necesitan leer y escribir los mismos registros de ejecución.

PostgreSQL también trae obligaciones que un fichero no tiene. Eliges una versión mayor soportada, das al usuario de n8n permiso para crear y modificar sus esquemas de tablas, y decides cómo se configura TLS entre n8n y la base de datos. n8n admite las dos últimas mayores con mantenimiento activo, la 17 y la 18 en julio de 2026, más la 16, y pide que se vuelva a comprobar porque el rango cambia cada noviembre.

**Opciones de base de datos para una instancia de n8n autoalojada**

| Aspecto | SQLite | PostgreSQL |
| --- | --- | --- |
| Configuración | Por defecto, sin variables necesarias | DB_TYPE y variables de conexión |
| Ubicación | Fichero en ~/.n8n/database.sqlite | Servidor externo, puerto 5432 por defecto |
| Modo cola | No recomendado, configuración distribuida no soportada | Soportado |
| Política de versiones | No documentada aquí | Las dos últimas mayores más una anterior |

Hay dos puntos más fáciles de equivocar. Amazon Aurora PostgreSQL es experimental y el soporte de versiones de n8n no lo cubre, y los derivados compatibles con PostgreSQL como AlloyDB, CockroachDB o YugabyteDB no están soportados. Si quieres una base de datos gestionada, elige una que ofrezca PostgreSQL original en una versión mayor soportada.

Sources: [Choose n8n's database | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/choose-n8ns-database>), [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

Antes de operar una instancia en modo cola, practica la gestión de fallos que ese modo hace visible: en el reto «Que los pedidos del restaurante sigan adelante» recuperas todos los pedidos válidos de una API paginada que limita peticiones y falla de forma inesperada, con reintentos, validación y un workflow de errores, construido en tu propio entorno n8n.

**[Prueba el reto de pedidos](https://n8n-challenges.app/es/challenges/unstable-restaurant-orders)**

<a id="cf-section-7"></a>

## ¿Cuándo importa el modo cola y cómo funciona?

![Objetos en secuencia que muestran un disparador creando una ejecución, un concentrador de cola y workers escribiendo resultados](/blog/es/article-13cb3625-0f0f-46f7-9cc8-b66c9acc13a8/488d9670eed5cdb10ad7d4056385c62b73c33bed99bb48a42eeb2610ab1b6516.png)

Representación conceptual del recorrido de una ejecución en modo cola.

n8n documenta que funcionar a escala, con un gran número de usuarios, workflows o ejecuciones, requiere cambios de configuración, que [el modo cola ofrece la mejor escalabilidad](<https://n8n-challenges.app/es/blog/n8n-queue-mode-con-redis-cuando-dejar-el-modo-de-instancia-unica>), y que revisar el guardado y la poda de datos de ejecución puede mejorar el rendimiento de la base de datos. Merece la pena dedicar una hora a leer la documentación de modo cola de n8n junto a la página de escalado antes de cambiar nada.

No hay un umbral documentado que defina cuándo empieza «a escala», así que el cambio es un juicio propio. Las señales editoriales que sugerimos vigilar son un volumen de ejecuciones que se acumula, workflows de larga duración que bloquean a otros y una interfaz del editor lenta mientras se ejecutan procesos. Son sugerencias para encuadrar la decisión, no umbrales medidos.

La arquitectura en sí es sencilla. En modo cola, una instancia principal gestiona los temporizadores y las llamadas de webhook, genera una ejecución y pasa el ID de ejecución a Redis. Un worker lo recoge, lee los datos del workflow desde la base de datos, escribe los resultados y notifica a Redis. Escalas añadiendo o quitando workers.

**Cómo viaja una ejecución en modo cola**

1. **Disparador**: La instancia principal gestiona temporizadores y llamadas de webhook entrantes.
2. **Crear ejecución**: La instancia principal genera una ejecución para el workflow disparado.
3. **Encolar**: El ID de ejecución se pasa a Redis.
4. **Recoger**: Un worker toma el ID de ejecución desde Redis.
5. **Ejecutar**: El worker lee los datos del workflow desde la base de datos y lo ejecuta.
6. **Informar**: El worker escribe los resultados en la base de datos y notifica a Redis.

Entre las opciones de despliegue de n8n, esta es la que cambia tu modelo operativo y no solo tu comando de instalación, así que trátala como un paso por etapas y no como algo por defecto.

Sources: [Scaling | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling>), [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-8"></a>

### Configurar la clave de cifrado, el modo de ejecuciones y Redis

Tres requisitos previos concentran la mayor parte del riesgo, y la lista numerada siguiente los pone en el orden en que se aplican. El modo de ejecuciones debe coincidir entre procesos, la clave de cifrado debe compartirse para que los workers puedan leer credenciales, y Redis debe ser accesible en el host y puerto que configures; QUEUE_BULL_REDIS_HOST y QUEUE_BULL_REDIS_PORT tienen como valores por defecto localhost y 6379.

1. Configura EXECUTIONS_MODE con el valor queue en la instancia principal.
2. Pon el mismo valor en cada worker.
3. Copia la clave de cifrado de la instancia principal a cada worker y nodo procesador de webhooks.
4. Apunta QUEUE_BULL_REDIS_HOST y QUEUE_BULL_REDIS_PORT a tu instancia de Redis.
5. Confirma que la instancia funciona sobre PostgreSQL y no sobre SQLite.

Algunos subtemas del modo cola están documentados con más detalle del que cubre esta guía, incluidos los nodos procesadores de webhooks con enrutado de rutas en el balanceador de carga, las restricciones de almacenamiento de datos binarios y los límites de tamaño de respuesta de webhook. Si tus workflows mueven datos binarios o devuelven respuestas de webhook grandes, lee esas páginas directamente antes de cambiar.

Sources: [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-9"></a>

### Workers, concurrencia y límites de escalado

Los workers se inician con el comando n8n worker, o con la imagen n8nio/n8n y el argumento worker en Docker. Pueden exponer endpoints opcionales de salud y disponibilidad, incluido /healthz, cuando QUEUE_HEALTH_CHECK_ACTIVE está activado. La concurrencia por defecto es 10, y n8n recomienda 5 o más, porque una concurrencia baja repartida entre muchos workers puede agotar el pool de conexiones de la base de datos.

Ese pool es el techo práctico con el que topan primero la mayoría de equipos. Dimensiona las conexiones de PostgreSQL según workers multiplicado por concurrencia antes de añadir más workers, no después.

Merece la pena activar pronto los endpoints opcionales, y no durante un incidente. Un endpoint de disponibilidad que informe de si las conexiones a base de datos y Redis de un worker están activas convierte una ralentización difusa en una respuesta concreta, y da a un balanceador de carga u orquestador algo tangible sobre lo que actuar cuando un worker pierde Redis.

La alta disponibilidad con múltiples instancias principales está documentada como disponible en Enterprise autoalojado y no en n8n Cloud. Todas las instancias principales deben funcionar en modo cola sobre PostgreSQL y Redis, ejecutar la misma versión de n8n, establecer N8N_MULTI_MAIN_SETUP_ENABLED en true y situarse tras sesiones persistentes, con un líder que ejecute las tareas de como máximo una vez. Ver los workers en ejecución en Settings y luego Workers también es exclusivo de Enterprise. Reserva esto para equipos que realmente necesiten alta disponibilidad y tengan esa licencia; una instancia principal más varios workers es el modelo más simple.

Sources: [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-10"></a>

### Qué cambia en el día a día tras el cambio

El modo cola cambia cómo llega el trabajo a la base de datos y cómo razonas sobre un workflow lento. En un único proceso principal, un disparador, una ejecución y su resultado viven en el mismo sitio. En cuanto hay workers implicados, una ejecución toca la instancia principal, Redis y la base de datos antes de terminar, así que una investigación empieza preguntando cuál de esos tres está fallando.

Sources: [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

<a id="cf-section-11"></a>

## Una vía por etapas del contenedor único al modo cola

En conjunto, las opciones de despliegue de n8n forman una secuencia más que un menú. Empieza con Docker Compose y PostgreSQL en una versión mayor soportada, siguiendo la lista de verificación del principio de esta guía. Esa instancia ya cumple todos los requisitos del modo cola salvo Redis.

Cuando el proceso principal único se convierta en el cuello de botella, añade Redis, configura el modo de ejecuciones en la instancia principal y los workers, y empieza con un número reducido de workers con concurrencia de al menos 5. Añade workers solo tras revisar el pool de conexiones de la base de datos. Reserva los nodos procesadores de webhooks para el caso en que la restricción sea, concretamente, el volumen de webhooks entrantes.

**Despliegue por etapas sugerido para una instancia de equipo**

1. **Compose más Postgres**: Ejecuta Docker Compose con PostgreSQL en una versión mayor soportada.
2. **Añadir Redis**: Introduce Redis y configura las variables de conexión de la cola.
3. **Compartir la clave**: Copia la clave de cifrado de la instancia principal a cada worker.
4. **Cambiar de modo**: Configura el modo de ejecuciones a queue en la principal y los workers.
5. **Escalar workers**: Añade workers con concurrencia de al menos cinco, vigilando el pool de conexiones.

Una salvedad enmarca todo lo anterior: todo lo aquí expuesto procede de la documentación propia de n8n, que ofrece orientación de arquitectura y configuración en vez de benchmarks independientes, cifras de coste o datos de fiabilidad. Tus propias pruebas de carga siguen siendo la única manera de saber dónde se desborda tu instancia.

Sources: [Host n8n | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n>), [Choose n8n's database | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/choose-n8ns-database>), [Enable queue mode | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode>)

Si eres responsable del equipo que operará esta instancia, la página Para empresas de este sitio describe programas de n8n a medida impartidos sobre tu propia instancia, herramientas y datos; el programa n8n Advanced / Developer Training encaja con grupos que asumen el autoalojamiento y el modo cola.

**[Formación en n8n autoalojado](https://n8n-challenges.app/es/companies)**

Tags: n8n, Autoalojamiento, Preparación para producción, Guía extensa
