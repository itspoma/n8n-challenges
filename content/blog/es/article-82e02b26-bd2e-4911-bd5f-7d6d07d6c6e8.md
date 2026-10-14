---
{
  "id": "opp_82e02b26-bd2e-4911-bd5f-7d6d07d6c6e8",
  "locale": "es",
  "slug": "article-82e02b26-bd2e-4911-bd5f-7d6d07d6c6e8",
  "urlSlug": "fallo-en-la-comprobacion-de-credenciales-de-workflows-compartidos-de-n8n-aviso-ghsa-r6g9-5cpp-ppwr",
  "publishedAt": "2026-10-14T05:02:14.200Z",
  "title": "Fallo en la comprobación de credenciales de workflows compartidos de n8n: aviso GHSA-r6g9-5cpp-ppwr",
  "subtitle": "Qué dice el aviso sobre la comprobación de credenciales en workflows compartidos de n8n con subworkflows anidados e inline de herramientas, a quién afecta y qué hacer.",
  "description": "Qué dice el aviso sobre la comprobación de credenciales en workflows compartidos de n8n con subworkflows anidados e inline de herramientas, a quién afecta y qué hacer.",
  "date": "2026-10-14",
  "sourcesCheckedAt": "2026-10-13T18:01:11.997Z",
  "tags": [
    "n8n",
    "Preparación para producción",
    "Novedades"
  ],
  "coverImage": "/blog/es/article-82e02b26-bd2e-4911-bd5f-7d6d07d6c6e8/7cdfe56e9b10d47269c230e431f55add85b0faa1333f02e15335e442882cbeee.png",
  "coverAlt": "Vista cenital de llaves, una bandeja poco profunda y cajas anidadas sobre un escritorio rosa con un globo.",
  "seo": {
    "title": "Fallo en la comprobación de credenciales de workflows compartidos de n8n: aviso GHSA-r6g9-5cpp-ppwr",
    "description": "Qué dice el aviso sobre la comprobación de credenciales en workflows compartidos de n8n con subworkflows anidados e inline de herramientas, a quién afecta y qué hacer.",
    "keywords": []
  },
  "revision": "38f52787fb6a689abf75316e539573682239aaeed7c3ac43a267ac38bbcce097"
}
---

## Qué anunció n8n el 30 de septiembre de 2026

Una comprobación de credenciales de workflows compartidos de n8n no cubría todos los casos, según el aviso GHSA-r6g9-5cpp-ppwr. n8n lo publicó en GitHub, en el repositorio n8n-io/n8n para el paquete npm n8n, el 30 de septiembre de 2026, y tiene una calificación Alta.

[La puntuación global del aviso es 7,2 en la escala CVSS v4, según el aviso publicado el 30 de septiembre de 2026](<https://github.com/n8n-io/n8n/security/advisories/GHSA-r6g9-5cpp-ppwr>). Es una calificación de gravedad asignada por quien publica; no mide la explotación en el mundo real.

Una aclaración sobre los términos: este artículo trata de la plataforma n8n y su aviso de seguridad. El sitio de aprendizaje n8n Balloon Challenges es algo distinto y no está afectado ni involucrado en este aviso.

Sources: [Shared-Workflow Credential Check Misses Nested and Tool Inline Sub-Workflows · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-r6g9-5cpp-ppwr>)

## Comprobación de credenciales de workflows compartidos de n8n: qué cambió

En n8n 1.x, la comprobación de credenciales de workflows compartidos se ejecuta al guardar y busca impedir que quienes tienen acceso de edición a un workflow compartido añadan credenciales que no pueden usar. El aviso dice que esa comprobación examinaba un solo tipo de nodo, a un solo nivel de profundidad. No indica cuál es ese tipo de nodo.

Otros dos nodos también aceptan un workflow inline, y los workflows inline pueden anidarse. Eso convierte las credenciales de subworkflows anidados de n8n en la zona sin cubrir. El aviso dice que un editor podía guardar un workflow cuyos nodos incrustados hacen referencia a credenciales que el editor no puede usar. Al ejecutarse, esos nodos funcionan con los valores de credenciales del propietario.

![Cómo funciona el fallo, según describe el aviso: 1. El editor guarda; 2. Comprobación superficial; 3. Se cuelan credenciales; 4. Se ejecuta como propietario](/blog/es/article-82e02b26-bd2e-4911-bd5f-7d6d07d6c6e8/769ebcf8e1a8681151f415d0d68f63c994263bec91fe9409e5dc20ed3254b256.png)

El aviso describe este impacto en términos generales. No incluye ningún ID de CVE ni CWE. El caso del subworkflow inline de herramienta de n8n y el anidamiento son las dos vías que nombra su título.

Sources: [Shared-Workflow Credential Check Misses Nested and Tool Inline Sub-Workflows · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-r6g9-5cpp-ppwr>)

## A quién afecta: n8n 1.x anterior a 1.123.83

El aviso indica como versiones afectadas n8n anteriores a 1.123.83, y la corrección está en 1.123.83 o posterior. Pide a los usuarios que actualicen. Formula el alcance como la línea 1.x; la sección final recoge lo que deja sin decir.

Aquí importa el uso compartido de workflows, y también el [uso compartido de credenciales de n8n en subworkflows](<https://n8n-challenges.app/es/blog/variables-de-entorno-y-credenciales-de-n8n-checklist-para-una-instancia-compartida>). La documentación de n8n dice que compartir workflows está disponible en n8n Cloud en todos los planes y en self-hosted Business y Enterprise. La documentación también dice que los editores pueden usar todas las credenciales de un workflow compartido, incluso las que no se han compartido explícitamente con ellos. En nuestra lectura, eso encaja mal con la premisa del aviso, y la documentación no explica la diferencia. Lo tratamos solo como contexto, así que considera el aviso como la autoridad sobre este problema.

En nuestra opinión, los equipos que dependen de workflows compartidos no deberían esperar a que se aclare ese punto. Preferimos actualizar antes que adivinar quién puede acceder a las credenciales de quién.

Sources: [Shared-Workflow Credential Check Misses Nested and Tool Inline Sub-Workflows · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-r6g9-5cpp-ppwr>), [Share with others | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/share-with-others>)

Si tu equipo comparte workflows y credenciales, n8n Advanced / Developer Training es, en nuestra opinión, la mejor opción práctica: cubre subworkflows, credenciales y arquitectura. El enlace abre la página For companies de este sitio; las consultas se envían a través del enlace de LinkedIn que hay allí.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Qué hacer ahora

![Piedras de paso hacia una casilla marcada con un candado, para la comprobación de credenciales de workflows compartidos de n8n.](/blog/es/article-82e02b26-bd2e-4911-bd5f-7d6d07d6c6e8/f6c520f14ba77f8f2e18b4d4abdf6b153897a989f637718917393e1a4b72b78b.png)

Piedras de paso que llevan a una casilla marcada con un candado y un globo.

El aviso indica a los usuarios que actualicen a 1.123.83 o posterior. Todo lo que sigue es una sugerencia editorial nuestra, no la recomendación del anuncio.

Sugerimos que primero confirmes la versión de tu n8n self-hosted. Si es 1.x anterior a 1.123.83, planifica la actualización a 1.123.83 o posterior, la versión con la comprobación de credenciales de workflows compartidos de n8n corregida. El aviso también enumera mitigaciones temporales para administradores que no puedan actualizar de inmediato, así que léelas en la página del aviso.

- [ ] Comprueba la versión de tu n8n self-hosted
- [ ] Planifica la actualización a 1.123.83 o posterior si usas una 1.x anterior
- [ ] Lee las mitigaciones temporales del aviso si aún no puedes actualizar
- [ ] Revisa por separado los avisos de 2.x si usas 2.x
- [ ] Tras actualizar, revisa los workflows compartidos con subworkflows inline de herramienta

Si usas 2.x, revisa por separado los avisos y niveles de parche de 2.x. Tras actualizar, sugerimos revisar los workflows compartidos que usen un subworkflow inline de herramienta de n8n, que el título del aviso nombra.

Sources: [Shared-Workflow Credential Check Misses Nested and Tool Inline Sub-Workflows · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-r6g9-5cpp-ppwr>)

## Lo que el anuncio no dice

El aviso no indica si las versiones 2.x están afectadas, si lo están n8n Cloud u otros planes alojados, ni si el fallo fue explotado. Tampoco ofrece guía de detección ni consejo de rotación de credenciales para este aviso.

Seríamos cautos: si no puedes descartar que alguien con acceso de edición haya abusado del fallo, [trata la rotación de credenciales como una decisión de tu propia revisión de seguridad](<https://n8n-challenges.app/es/blog/lista-de-verificacion-ante-una-brecha-de-seguridad-en-n8n-que-comprobar-y-bloquear-primero>), ya que nada aquí te orienta en uno u otro sentido.

Sources: [Shared-Workflow Credential Check Misses Nested and Tool Inline Sub-Workflows · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-r6g9-5cpp-ppwr>)

Para una revisión práctica de quién puede editar qué y a qué credenciales acceden tus workflows compartidos, nuestro Workflow Audit es la mejor forma de hacerlo bien en tu equipo. El enlace abre la página For companies de este sitio; las consultas se envían a través del enlace de LinkedIn que hay allí.

**[Auditar acceso a credenciales compartidas](https://n8n-challenges.app/es/companies)**

Tags: n8n, Preparación para producción, Novedades
