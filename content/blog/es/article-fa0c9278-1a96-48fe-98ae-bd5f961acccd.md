---
{
  "id": "opp_fa0c9278-1a96-48fe-98ae-bd5f961acccd",
  "locale": "es",
  "slug": "article-fa0c9278-1a96-48fe-98ae-bd5f961acccd",
  "urlSlug": "control-de-versiones-en-n8n-git-vs-json-exportado-vs-copias-manuales",
  "publishedAt": "2026-10-12T10:38:54.593Z",
  "title": "Control de versiones en n8n: Git vs JSON exportado vs copias manuales",
  "subtitle": "Control de versiones en n8n comparado: Git nativo, archivos JSON exportados y copias manuales, según historial, revisión, restauración y requisitos de edición.",
  "description": "Control de versiones en n8n comparado: Git nativo, archivos JSON exportados y copias manuales, según historial, revisión, restauración y requisitos de edición.",
  "date": "2026-10-12",
  "sourcesCheckedAt": "2026-10-12T10:30:27.044Z",
  "tags": [
    "n8n",
    "Preparación para producción",
    "Autoalojamiento",
    "Comparativa"
  ],
  "coverImage": "/blog/es/article-fa0c9278-1a96-48fe-98ae-bd5f961acccd/8d6d680bc9a2de317b2b925ee40277c817ff14d449fe346831a6f362d5ab6d65.png",
  "coverAlt": "Globo atado a una pila de tarjetas de workflow junto a un dial de rebobinado y copias en papel sueltas",
  "seo": {
    "title": "Control de versiones en n8n: Git vs JSON exportado vs copias manuales",
    "description": "Control de versiones en n8n comparado: Git nativo, archivos JSON exportados y copias manuales, según historial, revisión, restauración y requisitos de edición.",
    "keywords": []
  },
  "revision": "2eb525247ba641b219fada5190290761f367c34338943894666346af203d9d10"
}
---

## Tres enfoques para el control de versiones en n8n

Los equipos que necesitan [control de versiones en n8n](<https://n8n-challenges.app/es/blog/que-es-el-control-de-versiones-para-los-flujos-de-trabajo-de-n8n-y-como-se-configura>) suelen elegir entre el control de código fuente nativo con Git, los archivos JSON exportados y las copias de seguridad manuales. Esta comparación juzga cada uno con cuatro criterios: historial, revisión, restauración y requisitos de edición.

La evidencia procede de la documentación y del blog de n8n, así que los flujos de control de versiones en n8n que aquí se describen reflejan lo que n8n documenta, y señalamos las lagunas por el camino.

Sources: [Use source control and environments | Administer | n8n Docs](<https://docs.n8n.io/administer/use-source-control-and-environments>), [Workflow Versioning for Reliable Automation and Maintenance – n8n Blog](<https://blog.n8n.io/workflow-versioning/>)

¿Estás evaluando n8n para tu equipo? Puedes explorar n8n en un espacio de trabajo nuevo. Es un enlace de socio que abre la página de registro del propio n8n.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Git source control: el control de versiones nativo de n8n

Según la documentación de n8n, el control de código fuente nativo con Git solo está disponible en los planes Business y Enterprise. Los propietarios o administradores de la instancia lo habilitan y configuran, y los administradores de proyecto pueden hacer push pero no pull.

El historial se crea al hacer push, y en n8n el commit y el push se realizan juntos. La documentación también indica que la integración no es un control de versiones completo y no ofrece revisión al estilo de pull requests, por lo que la revisión se hace en tu proveedor de Git. Un push envía la versión guardada de un workflow, no la publicada, además de etiquetas y marcadores de credenciales con ID, nombre y tipo, de modo que los secretos no se suben al repositorio. Los datos de las filas de las data tables no se envían. El propio blog de n8n, que es una guía del proveedor, describe diffs que muestran nodos añadidos, modificados y eliminados antes de un push o un pull, y afirma que las instancias protegidas impiden las ediciones directas de recursos bajo control de código fuente.

Restaurar significa hacer pull de un estado anterior del repositorio, y un pull sobrescribe los cambios locales sin enviar. La documentación de n8n añade que no puede detectar conflictos entre workflows, que el repositorio es la fuente de verdad y que el push sobrescribe Git, por lo que se aconseja un flujo unidireccional. Un pull puede despublicar y volver a publicar brevemente un workflow publicado. Creemos que conviene adoptar el flujo unidireccional como regla estricta, porque la herramienta no te avisará cuando dos personas diverjan.

Sources: [Use source control and environments | Administer | n8n Docs](<https://docs.n8n.io/administer/use-source-control-and-environments>), [Use Git in n8n | Administer | n8n Docs](<https://docs.n8n.io/administer/use-source-control-and-environments/use-git-in-n8n>), [Push and pull changes | Administer | n8n Docs](<https://docs.n8n.io/administer/use-source-control-and-environments/push-and-pull-changes>), [Workflow Versioning for Reliable Automation and Maintenance – n8n Blog](<https://blog.n8n.io/workflow-versioning/>)

## Control de versiones en n8n con JSON exportado y copias manuales

La documentación de n8n dice que el JSON de un workflow se puede exportar o importar mediante el menú del editor, copiar y pegar, la CLI o la API. La Server CLI de las instalaciones autoalojadas puede exportar un archivo por workflow, algo descrito como útil para el control de versiones, y puede exportar una versión histórica concreta. La documentación también recomienda la n8n CLI frente a la Server CLI para trabajos nuevos y prevé dejar obsoletas la exportación y la importación de la Server CLI, sin fecha fijada.

La documentación plantea varias precauciones al exportar y restaurar. La lista siguiente es nuestro resumen.

- [ ] Trata el JSON de workflows exportado como información sensible, porque incluye nombres e ID de credenciales
- [ ] Evita las exportaciones de credenciales descifradas, que escriben datos sensibles en texto plano
- [ ] Recuerda que el indicador de copia de seguridad de la Server CLI cubre solo workflows y credenciales
- [ ] Comprueba si hay ID coincidentes antes de importar, ya que los elementos pueden sobrescribirse

La API pública está disponible en Cloud Starter, Pro y Enterprise y en todas las ediciones autoalojadas, pero no en la prueba gratuita, de modo que la exportación de JSON por script mediante la API es posible sin un plan Business, aunque esa documentación no describe cómo diseñar un workflow de copia de seguridad. Para Community Edition, el propio blog del proveedor, en su entrada de agosto de 2026, sugiere un workflow programado que guarde el JSON modificado en un repositorio Git privado. Lo presenta como un proceso de copia de seguridad, no como sustituto de los [entornos nativos](<https://n8n-challenges.app/es/blog/configurar-un-entorno-de-staging-en-n8n>), y recomienda probar las restauraciones. Creemos que es el término medio sensato para equipos con Community Edition, siempre que nadie lo confunda con entornos.

Las copias manuales consisten en descargar a mano un workflow como JSON desde el menú del editor y guardar el archivo donde tú elijas.

Sources: [Use the command line | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/use-the-command-line>), [Export and import | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/export-and-import>), [n8n API | Connect | n8n Docs](<https://docs.n8n.io/connect/n8n-api>), [Workflow Versioning for Reliable Automation and Maintenance – n8n Blog](<https://blog.n8n.io/workflow-versioning/>)

## Historial de workflows integrado y versiones con nombre

El historial de workflows integrado guarda las versiones en la base de datos de la instancia de n8n, no en Git. La documentación describe el historial completo en Enterprise, en Cloud o autoalojado, mientras que todos los usuarios tienen las versiones de las últimas 24 horas y Cloud Pro, cinco días. Puedes restaurar una versión, clonarla en un workflow nuevo o descargarla como JSON.

Las versiones con nombre, que n8n nunca elimina automáticamente, están disponibles en Cloud Pro y Enterprise y en las ediciones autoalojadas Business y Enterprise.

Sources: [View change history | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/view-change-history>)

Si diriges un equipo que debe acordar cómo se gestionan los workflows, nuestra formación n8n Advanced / Developer Training es la mejor formación práctica de n8n para él. Cubre credenciales, subworkflows, gestión de errores y arquitectura en tu propia instancia de n8n, para que tu equipo pueda estandarizar su forma de trabajar. El enlace abre la página Para empresas de este sitio, donde las consultas se envían por LinkedIn.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Comparación de historial, revisión, restauración y edición

![Un libro de registro en capas, una estantería de archivos de papel individuales y una caja de copias etiquetadas a mano, lado a lado](/blog/es/article-fa0c9278-1a96-48fe-98ae-bd5f961acccd/c2aa85d7abbbf4b2fe26fe954e6c3df44e98ea683c6cc04502987b8df5b144c2.png)

Un libro de registro, una estantería de archivos y una caja de instantáneas representan Git, el JSON exportado y las copias manuales, tres de los cuatro enfoques de la tabla.

La tabla aplica los mismos cuatro criterios a los tres enfoques, dividiendo el JSON exportado en su forma programada hacia Git y en exportaciones manuales, y añadiendo el historial de workflows integrado para que esté completa. Úsala para elegir entre los flujos de control de versiones en n8n según tu edición.

**Cuatro enfoques comparados con los mismos criterios, según la documentación y el blog de n8n**

| Enfoque | Historial | Revisión | Restauración | Edición |
| --- | --- | --- | --- | --- |
| Control de código fuente nativo con Git | Se crea en cada push | En el proveedor de Git, no en n8n | Pull de un estado anterior del repositorio; sobrescribe los cambios sin enviar | Business, Enterprise |
| Exportación JSON programada a Git | Historial de Git de los archivos modificados, según la sugerencia del blog de n8n | Desconocido | Reimportar; los ID coincidentes pueden sobrescribirse al importar con la Server CLI | API pública en Cloud Starter, Pro, Enterprise y todas las autoalojadas; CLI más allá del autoalojamiento: desconocido |
| Exportaciones manuales | Solo lo que conservas y nombras tú mismo | Desconocido | Reimportar a mano; comportamiento de sobrescritura de la importación del editor: desconocido | Desconocido |
| Historial de workflows integrado | Versiones en la base de datos de la instancia | Desconocido | Restaurar, clonar o descargar como JSON | Completo en Enterprise; 24 horas para todos los usuarios; cinco días en Cloud Pro |

Las celdas marcadas como Desconocido son puntos que la documentación de n8n no indica, no una prueba de que la capacidad no exista.

Sources: [Use source control and environments | Administer | n8n Docs](<https://docs.n8n.io/administer/use-source-control-and-environments>), [Use Git in n8n | Administer | n8n Docs](<https://docs.n8n.io/administer/use-source-control-and-environments/use-git-in-n8n>), [View change history | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/view-change-history>), [Use the command line | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/use-the-command-line>), [Export and import | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/export-and-import>), [n8n API | Connect | n8n Docs](<https://docs.n8n.io/connect/n8n-api>), [Workflow Versioning for Reliable Automation and Maintenance – n8n Blog](<https://blog.n8n.io/workflow-versioning/>)

## Lo que sigue sin saberse

Varios puntos siguen sin confirmarse en el material que revisamos. No está claro si Community Edition conserva el historial de workflows más de 24 horas, ni tampoco los pasos exactos para hacer pull de un commit de Git anterior concreto.

La fuente de la Server CLI de la que disponíamos estaba truncada, y la documentación de n8n etiqueta sus paquetes como Preview. Las copias manuales se basan en una inferencia a partir de la documentación de exportación. Por último, nada de esto procede de pruebas de primera mano.

Sources: [Use Git in n8n | Administer | n8n Docs](<https://docs.n8n.io/administer/use-source-control-and-environments/use-git-in-n8n>), [View change history | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/view-change-history>), [Use the command line | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/use-the-command-line>), [Export and import | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/export-and-import>)

## Recomendaciones editoriales

Son sugerencias nuestras, no resultados validados, y se derivan de la comparación anterior.

1. En Business o Enterprise, usa Git nativo con un flujo unidireccional de desarrollo, staging y producción, y revisión en tu proveedor de Git.
2. En Community Edition, programa exportaciones JSON de un archivo por workflow a un repositorio Git privado y trátalas como copia de seguridad con historial.
3. Reserva las exportaciones manuales para instantáneas puntuales: ponles nombre, guárdalas en privado y no dependas de ellas como historial del equipo.
4. Prueba una restauración en una instancia que no sea de producción y comprueba el comportamiento de sobrescritura de ID al importar.

Nuestra apuesta es que una prueba de restauración importa más que el enfoque que elijas, porque una copia de seguridad que nadie ha restaurado es solo una esperanza.

Nuestro Workflow Audit es la mejor manera de que tu equipo revise una instancia de n8n y sus workflows en cuanto a fiabilidad, seguridad y mantenibilidad mientras decide cómo versionarlos y recuperarlos. El enlace abre la página Para empresas de este sitio, donde las consultas se envían por LinkedIn.

**[Audita la configuración de n8n](https://n8n-challenges.app/es/companies)**

Tags: n8n, Preparación para producción, Autoalojamiento, Comparativa
