---
{
  "id": "opp_f275ab72-42e3-40eb-8518-baee224cd01d",
  "locale": "es",
  "slug": "article-f275ab72-42e3-40eb-8518-baee224cd01d",
  "urlSlug": "anuncio-de-n8n-2-45-cambios-y-limites-para-los-equipos",
  "publishedAt": "2026-10-23T08:47:45.371Z",
  "title": "Anuncio de n8n 2.45: cambios y límites para los equipos",
  "subtitle": "Consulta el anuncio de n8n 2.45: cambios en integraciones, publicación de agentes y revisión en equipo, con límites claros sobre disponibilidad y fechas.",
  "description": "Consulta el anuncio de n8n 2.45: cambios en integraciones, publicación de agentes y revisión en equipo, con límites claros sobre disponibilidad y fechas.",
  "date": "2026-10-23",
  "sourcesCheckedAt": "2026-10-23T06:48:07.454Z",
  "tags": [
    "n8n",
    "Preparación para producción",
    "Novedades"
  ],
  "coverImage": "/blog/es/article-f275ab72-42e3-40eb-8518-baee224cd01d/687d985b1ba2fcb9baa65cba10917597ca5e9ac9bc34fd1878f31f1699c4351b.webp",
  "coverAlt": "Unas manos examinan bloques de un flujo de trabajo ramificado y un componente de repuesto para el anuncio de n8n 2.45.",
  "seo": {
    "title": "Anuncio de n8n 2.45: cambios y límites para los equipos",
    "description": "Consulta el anuncio de n8n 2.45: cambios en integraciones, publicación de agentes y revisión en equipo, con límites claros sobre disponibilidad y fechas.",
    "keywords": []
  },
  "revision": "0c8f7f606d572e230dab9920957dbfcf464e3a7d0f6064e491bd6f9df6f9da8d"
}
---

## El anuncio de n8n 2.45 y su fecha de lanzamiento

El anuncio de n8n 2.45 figura en las notas de la versión oficiales con fecha de lanzamiento del 20 de octubre de 2026. Abarca versiones de integraciones, publicación de agentes, visibilidad de las ejecuciones de IA y herramientas de revisión en equipo. La entrada no indica por separado la fecha de publicación del anuncio, por lo que el 20 de octubre debe describirse como la fecha de lanzamiento.

Los cambios afectan a quienes utilizan los nodos y las interfaces específicos que se describen a continuación. El anuncio no establece qué ediciones pueden acceder a ellos, qué planes alojados los incluyen ni si están disponibles de forma universal. Creemos que los equipos deben revisar cada función por separado, sin dar por hecho que todos los cambios se aplican a su configuración.

Sources: [Release notes](<https://docs.n8n.io/changelog/release-notes.md>)

## Cambios de n8n 2.45 en las integraciones

![Dos conjuntos de piezas de flujos de trabajo están uno junto al otro mientras una mano encaja un componente nuevo en uno de ellos.](/blog/es/article-f275ab72-42e3-40eb-8518-baee224cd01d/81e7a9f57cd1573643ed632e0b977b1c3781d743c42189938400a13e5312c516.webp)

Los conjuntos separados ilustran la distinción entre los flujos de trabajo existentes y los nodos de integración recién añadidos.

Los cambios en las integraciones distinguen entre los nodos recién añadidos y los flujos de trabajo existentes. Esta tabla resume el comportamiento que describen las notas de la versión de n8n 2.45.

**Comportamiento de las integraciones descrito en la entrada oficial de n8n 2.45**

| Área | Nuevo comportamiento | Flujos de trabajo existentes |
| --- | --- | --- |
| Monday.com | Los nodos nuevos utilizan V2 de forma predeterminada con localizadores de recursos | Permanecen en V1 |
| Recursos de Monday.com | V2 ofrece los mismos recursos que V1 y corrige la creación de Column con Column ID vacío | Permanecen en V1 |
| Versión de Kafka | Los nodos y disparadores nuevos utilizan V2 con librdkafka de forma predeterminada | Conservan las versiones guardadas |
| Compresión de Kafka | V2 añade compatibilidad con Snappy, LZ4 y Zstd | Conservan las versiones guardadas |
| Salida de Kafka V2 | Los productores emiten un elemento por cada registro de entrada | Conservan las versiones guardadas |
| Acks de Kafka V2 | Se corresponde con todas las réplicas sincronizadas | Conservan las versiones guardadas |

Para quienes utilizan Azure OpenAI Chat Model en n8n 2.45, las credenciales Microsoft Foundry API Key y Entra ID incorporan un campo Project opcional cuando Endpoint Type es Microsoft Foundry. La lista de despliegues utiliza el proyecto de las credenciales cuando el campo Project del nodo está vacío; si el campo Project del nodo tiene un valor, este tiene prioridad.

Nuestra sugerencia es revisar cómo se procesa la salida de Kafka en los pasos posteriores y qué Project de Foundry se pretende seleccionar antes de adoptar esos cambios. El anuncio no proporciona un procedimiento de migración para los flujos de trabajo de Kafka existentes.

Sources: [Release notes](<https://docs.n8n.io/changelog/release-notes.md>)

## Publicación de agentes e información sobre la IA

![Un mecanismo que representa a un agente espera detrás de una barrera mientras se fija una herramienta de flujo de trabajo.](/blog/es/article-f275ab72-42e3-40eb-8518-baee224cd01d/8bd3cf35cd97477570aa56ac578fa06eec19581a6572512ea43f3b6b4b9baccb.webp)

Una barrera cerrada se sitúa junto a un mecanismo que representa a un agente mientras una mano fija la conexión de una herramienta más pequeña.

Para los equipos que publican agentes, n8n 2.45 añade una confirmación que explica que los cambios posteriores requieren volver a publicar. Las herramientas de flujo de trabajo sin publicar aparecen con enlaces de publicación e impiden publicar el agente. El anuncio no proporciona un procedimiento más amplio para desplegar agentes o revertir sus despliegues.

Para quienes examinan ejecuciones de IA, el encabezado del registro de IA muestra el modelo que responde en las vistas Rendered y JSON cuando los datos de ejecución contienen un nombre de modelo. Ese modelo puede diferir del configurado en el nodo. En Agent builder, Settings actualiza el uso del presupuesto mensual cuando termina un turno; si la actualización falla, conserva el último valor conocido. El selector de subagentes también incorpora el icono y el degradado personalizados de cada agente.

Quienes utilizan Text Classifier pueden incluir de forma opcional la categoría, la puntuación de confianza del modelo para ella y un mapa de categorías y puntuaciones. En n8n 2.45, la opción está desactivada de forma predeterminada y conserva la salida existente mientras permanece desactivada, sin incrementar la versión del nodo. Estas puntuaciones no demuestran la precisión de la clasificación ni representan probabilidades calibradas.

En nuestra opinión, el estado de publicación merece un lugar en la [revisión de cambios del equipo](<https://n8n-challenges.app/es/blog/gobernanza-de-n8n-lo-que-necesita-una-instancia-en-crecimiento>), mientras que la salida de confianza exige cautela antes de que alguien la interprete como un veredicto sobre la calidad.

Sources: [Release notes](<https://docs.n8n.io/changelog/release-notes.md>)

¿Diriges un equipo que está revisando cambios en el comportamiento de los nodos? Nuestro programa n8n Advanced / Developer Training ayuda a tu equipo a trabajar con APIs, gestión de errores y arquitectura utilizando vuestras propias herramientas, datos e instancia de n8n. El enlace abre la página Para empresas de este sitio.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Notificaciones de migración y revisiones de flujos de trabajo

Para los administradores que revisan las reglas de migración, el anuncio de n8n 2.45 añade notificaciones individuales y masivas por correo electrónico a los propietarios. Las notificaciones individuales requieren SMTP configurado y un correo electrónico del propietario. Las notificaciones masivas requieren SMTP y el permiso breakingChanges:migrate. Los problemas notificados siguen pendientes de resolución; las filas omitidas en las notificaciones masivas generan una advertencia que explica por qué se han omitido.

Para los equipos que revisan varios flujos de trabajo en Inbox, n8n 2.45 muestra el nombre y la versión fijada de cada flujo en un elemento desplegable. Solo se abre un elemento y se muestran sus diferencias a la vez, y la selección se mantiene al cambiar entre Activity y Changes. El anuncio no aporta ninguna prueba comparativa de rendimiento.

Sources: [Release notes](<https://docs.n8n.io/changelog/release-notes.md>)

## Qué revisar antes de usar la actualización

El anuncio de n8n 2.45 describe cambios de comportamiento, no un procedimiento completo de actualización. Aquí no se proporcionan comandos de despliegue ni instrucciones para resolver problemas. La siguiente lista de comprobación es nuestra sugerencia editorial para revisar la actualización de n8n 2.45, no un plan de acción emitido por n8n.

- [ ] Identifica qué nodos e interfaces del anuncio utiliza tu equipo.
- [ ] Asigna a una persona responsable de coordinar la revisión del equipo.
- [ ] Registra las preguntas que necesitan respuesta antes de adoptar los cambios.
- [ ] Documenta la decisión del equipo sobre la adopción y sus motivos.

Sources: [Release notes](<https://docs.n8n.io/changelog/release-notes.md>)

¿Necesitas ayuda práctica para evaluar los flujos de trabajo afectados de tu equipo? Nuestro programa Workflow Audit revisa vuestra instancia de n8n y vuestros flujos de trabajo para evaluar su fiabilidad, seguridad y facilidad de mantenimiento. El enlace abre la página Para empresas de este sitio, que describe nuestros programas personalizados de formación y automatización.

**[Audita flujos afectados por 2.45](https://n8n-challenges.app/es/companies)**

Tags: n8n, Preparación para producción, Novedades
