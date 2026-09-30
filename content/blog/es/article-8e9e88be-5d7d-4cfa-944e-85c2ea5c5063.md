---
{
  "id": "opp_8e9e88be-5d7d-4cfa-944e-85c2ea5c5063",
  "locale": "es",
  "slug": "article-8e9e88be-5d7d-4cfa-944e-85c2ea5c5063",
  "urlSlug": "como-instalar-n8n-una-lista-de-verificacion-previa-al-compromiso-para-equipos",
  "publishedAt": "2026-09-30T12:57:46.485Z",
  "title": "Cómo instalar n8n: una lista de verificación previa al compromiso para equipos",
  "subtitle": "Lista práctica para instalar n8n en equipo: nube vs autoalojado, términos de licencia, npm vs Docker vs Compose y dimensionamiento de infraestructura.",
  "description": "Lista práctica para instalar n8n en equipo: nube vs autoalojado, términos de licencia, npm vs Docker vs Compose y dimensionamiento de infraestructura.",
  "date": "2026-09-30",
  "sourcesCheckedAt": "2026-09-30T12:12:00.692Z",
  "tags": [
    "n8n",
    "Autoalojamiento",
    "Preparación para producción",
    "Comparación de herramientas",
    "Lista de verificación"
  ],
  "coverImage": "/blog/es/article-8e9e88be-5d7d-4cfa-944e-85c2ea5c5063/3ae46f26b221be2f857ed909d4d9f570c07d82c6d2f15b0c5a33b056494466c0.png",
  "coverAlt": "Una persona en una bifurcación entre una puerta con forma de nube y un rack de servidores, que representa la decisión detrás de cómo instalar n8n.",
  "seo": {
    "title": "Cómo instalar n8n: una lista de verificación previa al compromiso para equipos",
    "description": "Lista práctica para instalar n8n en equipo: nube vs autoalojado, términos de licencia, npm vs Docker vs Compose y dimensionamiento de infraestructura.",
    "keywords": []
  },
  "revision": "49556723efe459d035b415a81695a363c82107ee27b7251d335a2423503a3a45"
}
---

## Cómo instalar n8n: comprobaciones para decidir entre nube y autoalojado

![Dos llaves con forma de nube y de torre de servidor junto a una lista de verificación, que simbolizan la decisión entre nube y autoalojado en n8n.](/blog/es/article-8e9e88be-5d7d-4cfa-944e-85c2ea5c5063/a12179610dfd42c997259f6faaffd28faafb7db953ab3572fa27f8d11cd7618a.png)

Una ilustración conceptual de la primera decisión que toma un equipo antes de instalar n8n.

Antes de que nadie abra una terminal o un formulario de registro, la verdadera pregunta detrás de cómo instalar n8n no es npm frente a Docker. Es nube frente a autoalojado, y la propia documentación de n8n lo plantea exactamente así: n8n Cloud como la opción totalmente gestionada, y el autoalojamiento como ejecutar la plataforma en tu propia infraestructura.

Ese planteamiento importa porque cada decisión posterior sobre herramientas de instalación solo tiene sentido una vez resuelta esta. Un equipo que elige autoalojarse hereda la responsabilidad continua de actualizaciones, disponibilidad y seguridad; un equipo que elige Cloud traspasa esa responsabilidad a n8n y se centra en construir workflows en su lugar.

- [ ] Quién es responsable de las actualizaciones, los parches y la disponibilidad si algo falla a las 2 de la madrugada
- [ ] Si aplican reglas de residencia de datos o de aislamiento de red a vuestros workflows
- [ ] Si el equipo ya cuenta con alguien cómodo gestionando una base de datos y un servidor web
- [ ] Si necesitáis que esta decisión sea reversible más adelante, o si estáis dispuestos a comprometeros

En n8n Balloon Challenges, por ejemplo, todo el formato práctico asume que esta decisión ya está tomada antes de empezar una sesión: [regístrate en n8n Cloud, elige un reto, construye un workflow, envíalo a revisión y consigue un globo](<https://n8n-challenges.app/es>). Esa secuencia también es un modelo útil para el propio despliegue de un equipo: resolver primero la cuestión del despliegue y luego dejar que la gente practique.

El volumen de ejecuciones es una forma concreta de poner a prueba esa decisión. Un equipo cuyos workflows se ejecutarán solo unos pocos miles de veces al mes puede encontrar más sencillo razonar sobre un plan inicial gestionado que levantar y mantener su propia infraestructura.

> “Si estás por debajo de aproximadamente 2.500 ejecuciones al mes y no te importa dónde residen los datos, n8n Cloud Starter es realmente más sencillo”
>
> — Dmitry Chervonyi, Self-described as a 'CMO who learned to ship,' co-founder of livemy.app, a managed hosting platform for n8n and similar tools; writes about deployment and self-hosting on DEV Community (traducido)
>
> Original: “If you are under ~2,500 executions a month and do not care where the data sits, n8n Cloud Starter is genuinely simpler” — Fuente: [Self-hosting n8n in 2026: three paths, the env vars that matter, and 5 things that quietly break - DEV Community](<https://dev.to/dmytro_chervonyi/self-hosting-n8n-in-2026-three-paths-the-env-vars-that-matter-and-5-things-that-quietly-break-47m1>)

Sources: [Choose how to use n8n | n8n Docs](<https://docs.n8n.io/choose-how-to-use-n8n>)

Si tu equipo se inclina por n8n Cloud en lugar de autoalojarlo, puedes seguir las comprobaciones de este artículo dentro de un espacio de trabajo de n8n nuevo. El enlace de registro es un enlace de afiliado que abre la propia página de registro de n8n Cloud.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Comprueba tu plan o edición y sus términos de licencia

Una vez resuelta la elección entre nube y autoalojado, comprueba qué ofrece realmente el camino elegido. La documentación de n8n indica que Community es el nivel gratuito autoalojado, y lo describe como portador de casi el conjunto completo de funciones de la plataforma; conviene verificarlo frente a las necesidades específicas de tu equipo en lugar de asumir una paridad total con los planes de pago.

**Ediciones y planes citados en la propia documentación de n8n**

| Edición/plan | Alojamiento | Notas de licencia o acceso |
| --- | --- | --- |
| Community | Autoalojado | Gratuita; solo para uso empresarial interno, no comercial o personal, según los términos de licencia |
| Cloud (Starter y superiores) | Totalmente gestionado por n8n | Planes gestionados; los detalles de funciones y precios están en la página de precios de n8n |
| Business | Solo autoalojado (según lo documentado) | Añade SSO, entornos y control de versiones con Git; no se ofrece en Cloud según esa página |

La licencia de la edición Community no es ilimitada. Los términos de licencia de n8n establecen que el software solo puede usarse o modificarse para los propios fines empresariales internos, o para uso no comercial o personal. Un equipo que planee revender funcionalidad basada en n8n a sus propios clientes debería leer las preguntas frecuentes completas sobre la licencia antes de construir sobre Community, en lugar de asumir que cubre ese caso.

La página de precios de n8n confirma que Community se distribuye a través de GitHub como la versión estándar autoalojada, y señala por separado que el plan Business —que añade SSO, entornos y control de versiones basado en Git— está actualmente disponible solo para despliegues autoalojados, no en Cloud. Como esa página no incluye fecha de publicación, conviene reconfirmar la disponibilidad actual del plan antes de finalizar una compra.

Sources: [Choose how to use n8n | n8n Docs](<https://docs.n8n.io/choose-how-to-use-n8n>), [Community license | n8n Community license | n8n Docs](<https://docs.n8n.io/n8n-community-license>), [n8n Plans and Pricing - n8n.io](<https://n8n.io/pricing/>)

## Comprueba qué método de instalación autoalojada te conviene (npm vs Docker vs Docker Compose) — y por qué Desktop queda descartado

![Cuatro objetos que representan npm, un único contenedor Docker, Docker Compose y una aplicación Desktop descontinuada para instalar n8n.](/blog/es/article-8e9e88be-5d7d-4cfa-944e-85c2ea5c5063/2f11c5bbe8d513a73fd2cf5378ce93089206036650c51e94221829ba1a7d85e6.png)

Una comparación conceptual de los métodos de instalación autoalojada de n8n y su estado documentado.

Si el autoalojamiento es el camino elegido, cómo instalar n8n en tus propias máquinas se reduce a tres opciones realistas: npm, un único contenedor Docker o [Docker Compose](<https://n8n-challenges.app/es/blog/opciones-de-despliegue-de-n8n-autoalojamiento-y-modo-cola>), más una opción que hay que descartar.

**Comparación de métodos de instalación autoalojada**

| Método | Estado documentado | Mejor uso |
| --- | --- | --- |
| npm | Obsoleto desde n8n 3.0; no seguro para producción según la documentación de n8n | Un vistazo de cinco minutos a la interfaz, no uso en equipo |
| Docker de contenedor único | La documentación de n8n marca la página como desactualizada | Un paso hacia Compose, no un estado final |
| Docker Compose | Método autoalojado actualmente recomendado por n8n | Uso continuo en equipo autoalojado |
| Desktop | Desarrollo detenido según un anuncio de 2023 | No recomendado para configuraciones nuevas de equipo |

Empecemos por lo que dice la propia documentación de n8n. La instalación basada en npm ya está marcada como obsoleta a partir de n8n 3.0, y la configuración de tipo local/npm se describe explícitamente como insegura para uso en producción; se plantea únicamente para desarrollo y pruebas locales. Una guía comunitaria de 2026 refleja el mismo límite en la práctica, sugiriendo npm solo cuando alguien quiere ver la interfaz en cinco minutos, no para el uso diario de un equipo.

La página del contenedor único de Docker tiene su propia advertencia: la documentación de n8n marca esa página como desactualizada y remite a los lectores a Docker Compose como método de instalación recomendado en su lugar. Autoalojar por cualquiera de las dos vías sigue exigiendo conocimientos técnicos reales, algo que la documentación de n8n señala directamente como requisito previo antes de que un equipo se comprometa.

Desktop merece un no rotundo para configuraciones nuevas de equipo. n8n anunció en una publicación de 2023 en el foro de la comunidad que detenía el desarrollo de la versión Desktop; ninguna declaración oficial más reciente entre las fuentes revisadas aquí revierte eso, así que Desktop debe tratarse como descontinuado desde ese anuncio de 2023, y no como una opción vigente.

Sources: [Install with npm | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/install-options/install-with-npm>), [Install with Docker | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/install-options/install-with-docker>), [Sunsetting Self-hosted Team Plan + Desktop Version - Announcements - n8n Community](<https://community.n8n.io/t/sunsetting-self-hosted-team-plan-desktop-version/25830>), [Install n8n Locally: Step-by-Step Guide 2026 - Alex Harte](<https://www.alexanderharte.com/install-n8n-locally/>)

Llevar a todo un equipo desde 'qué método de instalación elegir' hasta construir y revisar workflows con confianza es exactamente para lo que está pensado n8n Corporate Fundamentals. Se imparte sobre vuestras propias herramientas, datos e instancia de n8n, y es el punto de partida práctico una vez que el equipo ha decidido entre nube y autoalojado.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Comprueba los requisitos previos de infraestructura y preparación para producción

![Una caja de servidor conectada a una caja de base de datos y a una señal HTTPS, que muestra los requisitos de infraestructura de n8n autoalojado.](/blog/es/article-8e9e88be-5d7d-4cfa-944e-85c2ea5c5063/13a4703666f31f4b64c4a5685b547cd2906a1543a48b88294cf704744ffbb853.png)

Un diagrama conceptual de las piezas de infraestructura que un equipo comprueba antes de ejecutar n8n en producción.

Antes de que una instancia autoalojada entre en producción, parte de cómo instalar n8n bien consiste en dimensionar la infraestructura en lugar de improvisar. Las propias [directrices de dimensionamiento de n8n](<https://n8n-challenges.app/es/blog/n8n-queue-mode-con-redis-cuando-dejar-el-modo-de-instancia-unica>), construidas como un ejemplo ilustrativo basado en n8n Cloud, recomiendan una base de datos dedicada por instancia de n8n en lugar de compartir una entre varias instancias.

Las mismas directrices señalan que una instancia típica no requiere grandes cantidades de memoria disponible en reposo, pero es un ejemplo, no un mínimo garantizado para autoalojamiento, y las necesidades reales de memoria dependen del volumen de datos de los workflows, que puede dispararse con nodos intensivos en datos como Code. Vuelve a comprobar el dimensionamiento frente a tus workflows reales, no solo frente a las cifras en reposo.

- [ ] Una base de datos dedicada y aprovisionada para esta instancia de n8n, no compartida con otra instancia
- [ ] Una estimación realista del volumen de datos de los workflows, especialmente de nodos Code o de carga útil grande
- [ ] Una dirección HTTPS pública si algún workflow va a recibir webhooks
- [ ] Un proceso documentado de copia de seguridad y restauración de la base de datos

Sources: [Prerequisites | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/deploy-as-an-oem-integration/prerequisites>)

## Comprueba el panorama de costes antes de comprometerte

El coste no es solo una línea de un plan de Cloud. Un artículo de 2026 escrito por un profesional sobre el autoalojamiento describe la edición Community gratuita y autoalojada como algo que ofrece ejecuciones ilimitadas, un planteamiento a tener en cuenta, aunque proviene de un blog comunitario cuyo autor declara ser cofundador de un producto competidor de alojamiento gestionado, así que hay que tratarlo como la perspectiva de un profesional, no como un análisis independiente.

Compara eso con lo que confirma la propia [página de precios de n8n](<https://n8n-challenges.app/es/blog/coste-de-n8n-planes-cloud-edicion-community-y-precios-enterprise>) sobre el estatus gratuito y distribuido por GitHub de la edición Community, junto con la disponibilidad exclusivamente autoalojada del plan Business ya mencionada. El coste real del autoalojamiento también incluye la infraestructura y las habilidades técnicas previas ya cubiertas antes: tiempo y esfuerzo que un plan de Cloud gestionado absorbe en tu nombre.

Sources: [Choose how to use n8n | n8n Docs](<https://docs.n8n.io/choose-how-to-use-n8n>), [Self-hosting n8n in 2026: three paths, the env vars that matter, and 5 things that quietly break - DEV Community](<https://dev.to/dmytro_chervonyi/self-hosting-n8n-in-2026-three-paths-the-env-vars-that-matter-and-5-things-that-quietly-break-47m1>), [n8n Plans and Pricing - n8n.io](<https://n8n.io/pricing/>)

## Recomendaciones editoriales

![Una mano marcando casillas en una lista de verificación con un objeto de nube y un objeto de servidor cerca, que representan las recomendaciones finales de instalación.](/blog/es/article-8e9e88be-5d7d-4cfa-944e-85c2ea5c5063/69fa576a0454ef88831ca3c777314c0107a3573db3a2089cd892b84c0d83bdef.png)

Una lista de verificación conceptual que ilustra las recomendaciones editoriales para decidir cómo instalar n8n.

Estas son sugerencias editoriales basadas en las comprobaciones anteriores, no un estándar obligatorio: sopésalas frente a las restricciones de tu propio equipo.

Una vez resueltas la decisión entre nube y autoalojado y las comprobaciones del método de instalación autoalojada anteriores, trata lo siguiente como una breve revisión final en lugar de un nuevo conjunto de criterios:

- [ ] Confirma que la decisión final y el método de instalación quedan escritos en algún lugar que todo el equipo pueda consultar
- [ ] Asigna a una persona del equipo la responsabilidad de esta decisión y que registre por qué se tomó

Si tu equipo ya ha autoalojado n8n y quiere una segunda opinión sobre si la configuración está lista para producción, un Workflow Audit revisa vuestra instancia y vuestros workflows en cuanto a fiabilidad, seguridad y mantenibilidad antes de que algo falle en producción.

**[Audita tu instalación autoalojada](https://n8n-challenges.app/es/companies)**

Tags: n8n, Autoalojamiento, Preparación para producción, Comparación de herramientas, Lista de verificación
