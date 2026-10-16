---
{
  "id": "opp_7aa694ea-1bee-4bc2-afac-10dd1a56e749",
  "locale": "es",
  "slug": "article-7aa694ea-1bee-4bc2-afac-10dd1a56e749",
  "urlSlug": "retencion-de-datos-de-ejecucion-en-n8n-lista-de-comprobacion-para-operaciones-en-alojamiento-propio",
  "publishedAt": "2026-10-16T10:40:46.859Z",
  "title": "Retención de datos de ejecución en n8n: lista de comprobación para operaciones en alojamiento propio",
  "subtitle": "Configura la retención de datos de ejecución en n8n, verifica el guardado y la purga con datos sintéticos y asigna responsables a las excepciones.",
  "description": "Configura la retención de datos de ejecución en n8n, verifica el guardado y la purga con datos sintéticos y asigna responsables a las excepciones.",
  "date": "2026-10-16",
  "sourcesCheckedAt": "2026-10-16T10:30:58.253Z",
  "tags": [
    "Alojamiento propio",
    "Preparación para producción",
    "Lista de comprobación"
  ],
  "coverImage": "/blog/es/article-7aa694ea-1bee-4bc2-afac-10dd1a56e749/a271bb48f50f04f781b70c16b3a8c443e4ce343bc47bcfd2fb1ccfe850596687.webp",
  "coverAlt": "Un cajón de archivo, un reloj de arena y unas fichas apartadas representan las decisiones de retención de datos de ejecución en n8n.",
  "seo": {
    "title": "Retención de datos de ejecución en n8n: lista de comprobación para operaciones en alojamiento propio",
    "description": "Configura la retención de datos de ejecución en n8n, verifica el guardado y la purga con datos sintéticos y asigna responsables a las excepciones.",
    "keywords": []
  },
  "revision": "67628297f756a869609f0b16dd12df33f58ed66d3806021887ae161a23abd4f2"
}
---

## Define tu política de retención de datos de ejecución en n8n

Para un equipo con alojamiento propio, la retención de datos de ejecución en n8n empieza por decidir qué historial necesita para investigar y comprobar después qué sigue almacenado realmente. Esta lista de comprobación abarca los controles de guardado, la purga, la verificación con datos sintéticos y las excepciones de retención. No incluye la retención de los planes Cloud, la migración del almacenamiento ni un tutorial completo de despliegue.

La documentación de n8n utilizada como respaldo no tiene fecha y refleja lo consultado el 16/10/2026; no establece la compatibilidad con todas las versiones instaladas. Confirma que sea aplicable a tu instalación antes de cambiar los ajustes. Las comprobaciones y los criterios de finalización que aparecen a continuación son recomendaciones editoriales, no normas obligatorias ni resultados de pruebas realizadas.

Creemos que la retención debe partir de una necesidad de investigación concreta, en lugar de una duración copiada de otro despliegue. Utiliza estas comprobaciones iniciales; esta sección estará completa cuando cada categoría de workflows tenga un responsable y un motivo para su periodo de retención.

- [ ] Registra la versión instalada y las funciones de almacenamiento aplicables.
- [ ] Elige un periodo de investigación para cada categoría de workflows.
- [ ] Asigna un responsable a los ajustes y a cada ubicación de almacenamiento relevante.
- [ ] Documenta por qué es necesario conservar los fallos y quién aprueba las excepciones.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/manage-execution-data.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/manage-execution-data.md>)

## Elige qué datos de ejecución guardar

Para n8n con alojamiento propio, la referencia de variables de ejecución documenta cuatro controles de guardado independientes. Guardar los fallos no garantiza que se excluyan los datos sensibles. Utiliza la tabla para registrar una decisión explícita sobre cada control.

**Controles de guardado documentados y preguntas sugeridas para definir la política**

| Categoría de datos | Control | Pregunta sugerida |
| --- | --- | --- |
| Ejecuciones fallidas | EXECUTIONS_DATA_SAVE_ON_ERROR | ¿Qué evidencias de los fallos necesitamos? |
| Ejecuciones correctas | EXECUTIONS_DATA_SAVE_ON_SUCCESS | ¿Por qué conservar los datos de las ejecuciones correctas? |
| Ejecuciones manuales | EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS | ¿Deben persistir los datos de las pruebas manuales? |
| Progreso por nodo | EXECUTIONS_DATA_SAVE_ON_PROGRESS | ¿Necesitamos guardar el progreso? |

Nuestra preferencia práctica es conservar los fallos cuando las necesidades de investigación lo justifiquen y desactivar el guardado innecesario de datos de ejecuciones correctas, manuales y de progreso. Esta sección estará completa cuando las cuatro decisiones estén documentadas y listas para verificarse.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md>)

## Registra los umbrales de purga y las excepciones

![Unas fichas de ejecución sueltas y otras sujetas con clips muestran los criterios de purga y las excepciones de retención en n8n con alojamiento propio.](/blog/es/article-7aa694ea-1bee-4bc2-afac-10dd1a56e749/690bedeae5ea17c0ccd83bab9f6e2dbe1d2e1c2d6d46fde638c2c9ae6cd241a2.webp)

Las fichas separadas ilustran por qué algunas ejecuciones quedan fuera de la purga programada.

Para n8n con alojamiento propio, EXECUTIONS_DATA_PRUNE controla la purga, junto con un umbral de antigüedad en horas, un número máximo de ejecuciones, un margen previo a la eliminación definitiva e intervalos separados para la eliminación lógica y la definitiva. Cumplir los criterios de purga y programar la eliminación son cuestiones distintas: estos ajustes no establecen un plazo exacto de eliminación para tu despliegue.

La guía de datos de ejecución describe una purga programada que marca las ejecuciones finalizadas que cumplen los criterios antes de eliminarlas definitivamente. Quedan excluidas las ejecuciones nuevas, en curso y en espera, y las ejecuciones anotadas, como las que tienen etiquetas o valoraciones, nunca se purgan. El umbral de cantidad no garantiza un número exacto de ejecuciones restantes; ten en cuenta que los criterios basados en la cantidad pueden acortar el historial disponible para investigar.

Utiliza estas comprobaciones para que la programación y las excepciones puedan revisarse. La sección estará completa cuando se hayan registrado los valores configurados y todas las excepciones identificadas.

- [ ] Registra si la purga está activada, el umbral de antigüedad y la cantidad máxima.
- [ ] Registra ambos intervalos de eliminación y el margen previo a la eliminación definitiva.
- [ ] Identifica las ejecuciones nuevas, en curso, en espera y anotadas.
- [ ] Asigna un responsable a cada excepción de retención.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/manage-execution-data.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/manage-execution-data.md>)

Forma a tu equipo para verificar la retención con nuestro programa n8n Advanced / Developer Training, utilizando vuestras propias herramientas, datos e instancia de n8n. El enlace abre la página Para empresas de este sitio.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Verifica el guardado y la limpieza con datos sintéticos

![Unas fichas ficticias, una lupa y un cajón bajo inspección representan las comprobaciones de retención de ejecuciones con datos sintéticos.](/blog/es/article-7aa694ea-1bee-4bc2-afac-10dd1a56e749/c8e4b8bc33c689fee0c06d570ece368e033a7e6d2c5804c30de9c2791cd629d9.webp)

Las fichas ficticias y la inspección del almacenamiento ilustran el ejercicio propuesto de verificación con datos sintéticos.

Verifica la retención de datos de ejecución en n8n en un [entorno de pruebas aislado](<https://n8n-challenges.app/es/blog/configurar-un-entorno-de-staging-en-n8n>) utilizando campos sensibles inventados, nunca datos personales reales ni secretos de la empresa. La sección estará completa cuando el guardado y la limpieza observados coincidan con la política registrada y las discrepancias estén documentadas para su revisión.

1. Crea ejecuciones sintéticas correctas, fallidas y manuales con campos ficticios reconocibles.
2. Registra los identificadores de las ejecuciones e inspecciona qué datos se guardan, comparándolos con tus cuatro decisiones de guardado.
3. Selecciona ejecuciones finalizadas y sin anotaciones que cumplan los criterios de purga configurados.
4. Obsérvalas durante los intervalos de eliminación y el margen previo, comprobando tanto el almacenamiento relevante como su visibilidad en el historial.
5. Si hay discrepancias, revisa los ajustes de guardado, el estado de las ejecuciones, las anotaciones y las políticas de almacenamiento externo aplicables.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/manage-execution-data.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/manage-execution-data.md>)

## Distingue la limpieza del almacenamiento externo de la ocultación de datos

![Una pantalla que oculta fichas almacenadas contrasta con un recipiente vacío para distinguir la ocultación de la eliminación.](/blog/es/article-7aa694ea-1bee-4bc2-afac-10dd1a56e749/0a5b762ff23f45e81a275ee056420495f948804f728e9146f9506f7c9203841a.webp)

Las fichas ocultas siguen presentes, lo que ilustra por qué la ocultación de datos no demuestra su eliminación.

Para n8n Business y Enterprise con alojamiento propio, la documentación de almacenamiento externo distingue entre datos binarios y datos de ejecución. Aplica el mecanismo de limpieza documentado a cada tipo de almacenamiento de la tabla; la sección estará completa cuando cada mecanismo aplicable tenga un responsable. La documentación citada sobre datos de ejecución en S3 no establece cómo funciona la limpieza de datos de ejecución en Azure.

**Diferencias en la limpieza del almacenamiento externo para Business y Enterprise con alojamiento propio**

| Datos almacenados | Limpieza documentada | Comprobación sugerida |
| --- | --- | --- |
| Datos binarios en S3 | Configuración del ciclo de vida del bucket | Identificar al responsable del ciclo de vida |
| Datos binarios en Azure | Política de ciclo de vida, salvo que se conserven indefinidamente | Registrar la política o la excepción deliberada |
| Datos de ejecución en S3 | Purga estándar de ejecuciones | Evitar reglas de ciclo de vida para los datos de ejecución |

Para Enterprise con alojamiento propio y Cloud Enterprise, n8n documenta la ocultación de datos como un control de visibilidad que deja intactos los datos de ejecución almacenados. Su disponibilidad depende de la versión. Esta lista no abarca la configuración de la ocultación de datos. A nuestro juicio, que los datos estén ocultos no es prueba suficiente para dar por completada una comprobación de eliminación.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/use-external-storage.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/use-external-storage.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/security/redact-execution-data.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/security/redact-execution-data.md>)

## Resuelve las discrepancias con un responsable asignado

Una regla de ciclo de vida para los datos de ejecución en S3 podría eliminar datos que n8n aún referencia, según su guía de almacenamiento externo para Business y Enterprise con alojamiento propio. Trata cualquier regla incompatible como una discrepancia que debes resolver antes de aprobar la revisión.

Cierra la revisión de la retención de datos de ejecución en n8n con las comprobaciones siguientes. Esta lista no acredita la eliminación de datos en [copias de seguridad](<https://n8n-challenges.app/es/blog/copia-de-seguridad-y-restauracion-de-n8n-un-ejercicio-de-recuperacion-aislada>), réplicas, destinatarios externos o sistemas de registro independientes, ni ofrece una garantía de borrado para toda la organización. La recuperación de espacio físico en disco y el mantenimiento de la base de datos quedan fuera de su alcance; una limpieza correcta no tiene por qué traducirse en un archivo de base de datos más pequeño.

- [ ] Adjunta los valores configurados, los identificadores de las pruebas y los resultados observados.
- [ ] Asigna un responsable y una próxima acción a cada discrepancia pendiente.
- [ ] Registra las excepciones aceptadas y quién las aprueba.
- [ ] Aprueba la finalización únicamente dentro de los límites de almacenamiento que se hayan comprobado realmente.

Sources: [n8n-docs/docs/deploy/host-n8n/configure-n8n/scaling/use-external-storage.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/scaling/use-external-storage.md>)

Obtén ayuda práctica para revisar la retención de ejecuciones con nuestro Workflow Audit, que revisa la fiabilidad, seguridad y mantenibilidad de la instancia de n8n y los workflows de tu equipo. El enlace abre la página Para empresas de este sitio.

**[Revisa la retención de tu equipo](https://n8n-challenges.app/es/companies)**

Tags: Alojamiento propio, Preparación para producción, Lista de comprobación
