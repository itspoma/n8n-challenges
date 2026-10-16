---
{
  "id": "opp_87bd8c80-96f7-49ac-aed4-a3e00882f2f5",
  "locale": "es",
  "slug": "article-87bd8c80-96f7-49ac-aed4-a3e00882f2f5",
  "urlSlug": "rbac-en-n8n-lista-de-comprobacion-para-revisar-los-accesos-periodicamente",
  "publishedAt": "2026-10-16T18:10:52.144Z",
  "title": "RBAC en n8n: lista de comprobación para revisar los accesos periódicamente",
  "subtitle": "Revisa el RBAC de n8n según las responsabilidades actuales, incluye el uso de credenciales mediante workflows y verifica los cambios de permisos hasta su cierre.",
  "description": "Revisa el RBAC de n8n según las responsabilidades actuales, incluye el uso de credenciales mediante workflows y verifica los cambios de permisos hasta su cierre.",
  "date": "2026-10-16",
  "sourcesCheckedAt": "2026-10-16T18:02:42.170Z",
  "tags": [
    "n8n",
    "Lista de comprobación"
  ],
  "coverImage": "/blog/es/article-87bd8c80-96f7-49ac-aed4-a3e00882f2f5/d3305cd308436ba865810898a02e82921918dd3900a67248d32d6b249eb702b3.webp",
  "coverAlt": "Unas llaves ordenadas en compartimentos de recursos representan una revisión de RBAC en n8n según las responsabilidades actuales del equipo.",
  "seo": {
    "title": "RBAC en n8n: lista de comprobación para revisar los accesos periódicamente",
    "description": "Revisa el RBAC de n8n según las responsabilidades actuales, incluye el uso de credenciales mediante workflows y verifica los cambios de permisos hasta su cierre.",
    "keywords": []
  },
  "revision": "7982a7bd5f9ea07e9035a4f9230bbdbb864ead63a2178a7e40294d3a238e548f"
}
---

## Define la revisión de RBAC en n8n

Una revisión periódica de [RBAC en n8n](<https://n8n-challenges.app/es/blog/gobernanza-de-n8n-lo-que-necesita-una-instancia-en-crecimiento>) debe responder quién tiene acceso, por qué sigue necesitándolo y si los cambios aprobados se han aplicado realmente. Esta lista propone un proceso de revisión manual para responsables de ingeniería y de TI; su periodicidad y sus criterios de finalización son recomendaciones editoriales, no normas obligatorias ni pruebas de cumplimiento.

Empieza por registrar el contexto de la revisión indicado a continuación. n8n distingue entre permisos de toda la instancia y permisos de proyecto, así que revisa ambos. La disponibilidad de las funciones depende de la suscripción y de la versión instalada; aplica únicamente las comprobaciones compatibles con tu configuración.

- [ ] Registra el tipo de despliegue, la suscripción y la versión de n8n instalada.
- [ ] Identifica al responsable de la revisión, a los revisores y los recursos incluidos.
- [ ] Fija la próxima fecha de revisión y los cambios de responsabilidades que darán lugar a una revisión.
- [ ] Acuerda dónde se conservarán las decisiones y las pruebas de verificación.

Sources: [n8n-docs/docs/administer/manage-users-and-access/understand-instance-roles.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-users-and-access/understand-instance-roles.md>)

## Inventaría todas las vías de acceso

Utiliza una fila de revisión por usuario, recurso y vía de acceso. La pertenencia a proyectos importa: n8n documenta que los workflows de un proyecto se comparten con sus miembros y que los roles de proyecto controlan las acciones permitidas. Este comportamiento al compartir workflows se aplica a todos los planes de n8n Cloud y a las ediciones Business y Enterprise autoalojadas.

Los siguientes campos son nuestra propuesta de registro de revisión. Esta parte se considera completada cuando cada fila incluida tiene un revisor responsable. Creemos que revisar las vías de acceso resulta más útil que limitarse a aprobar una lista de nombres de usuario: permite concretar cada decisión sobre permisos.

**Campos sugeridos para una revisión manual de accesos**

| Campo | Qué registrar |
| --- | --- |
| Identidad y recurso | Usuario y proyecto, workflow o credencial afectados |
| Vía de acceso | Rol de instancia, pertenencia a un proyecto o acceso compartido |
| Responsabilidad | Tarea actual que requiere el acceso |
| Revisor | Persona responsable de la decisión |
| Decisión y motivo | Mantener, modificar o revocar, con justificación |
| Corrección | Responsable de aplicar el cambio, fecha límite y resultado de la verificación |

Sources: [Share with others | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/share-with-others>)

## Justifica los privilegios de toda la instancia

n8n documenta que los propietarios de la instancia pueden ver y editar todos los workflows, credenciales y proyectos. Su rol de instancia Admin está disponible en Cloud Pro y Enterprise y en Enterprise autoalojado. Revisa el acceso con privilegios elevados por separado de las asignaciones a proyectos, en lugar de considerar la pertenencia a un proyecto como el límite completo del acceso.

Utiliza estas comprobaciones sugeridas para terminar esta parte de la revisión. Se considera completada cuando cada asignación con privilegios elevados tiene una justificación de negocio registrada o un cambio asignado.

- [ ] Identifica a todos los propietarios y administradores de instancia incluidos en la revisión.
- [ ] Confirma que la responsabilidad actual de la persona requiere acceso a toda la instancia.
- [ ] Registra si se mantiene, modifica o revoca el acceso y el motivo de negocio.
- [ ] Asigna un responsable de ejecución y una fecha límite a cada cambio aprobado.

Sources: [n8n-docs/docs/administer/manage-users-and-access/understand-instance-roles.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-users-and-access/understand-instance-roles.md>)

## Ajusta los permisos de proyecto al trabajo actual

Comprueba las acciones que necesita cada persona, incluidas la visualización, la ejecución manual y la edición. El rol Project Viewer de n8n es de solo lectura y no permite ejecutar workflows manualmente, pero incluye acceso a los workflows, credenciales y ejecuciones del proyecto; está disponible en Cloud Enterprise y Enterprise autoalojado. Los usuarios con el rol Project Editor pueden ver, crear, actualizar y eliminar workflows, credenciales y ejecuciones del proyecto; n8n documenta la disponibilidad de Editor en Cloud Pro y Enterprise autoalojado.

Para Cloud Enterprise y Enterprise autoalojado, los roles de proyecto personalizados están documentados a partir de n8n 1.122.0; algunos permisos específicos pueden requerir versiones posteriores. Editar un rol personalizado compartido afecta a los usuarios que lo tienen asignado en distintos proyectos. Inspecciona tanto sus permisos como sus asignaciones antes de aprobar un cambio en su definición.

Nuestra comprobación sugerida para completar esta parte de la revisión de RBAC en n8n consiste en comparar cada asignación con las tareas actuales de la persona, registrar los desajustes e identificar a todos los afectados por una modificación propuesta de un rol personalizado.

Sources: [n8n-docs/docs/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md>), [n8n-docs/docs/administer/manage-users-and-access/set-permissions-and-roles-rbac/create-custom-project-roles.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-users-and-access/set-permissions-and-roles-rbac/create-custom-project-roles.md>)

Guía a tu equipo en las decisiones sobre permisos con nuestro programa n8n Office Hours / Coaching, utilizando vuestras propias herramientas, datos e instancia de n8n. Este enlace abre la página Para empresas de este sitio, donde describimos el programa.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Incluye el uso de credenciales a través de workflows

![Dos caminos llegan a un armario de credenciales y muestran el acceso compartido directo y el uso de credenciales a través de workflows en n8n.](/blog/es/article-87bd8c80-96f7-49ac-aed4-a3e00882f2f5/6c456eb6a9819be744f28fed5f96ef7661a64e0b8a45a6917aab37eb0f3f7dd1.webp)

El camino directo y la ruta por el taller representan el acceso compartido directo y el uso de credenciales a través de workflows.

Al compartir workflows en todos los planes de n8n Cloud y en Business y Enterprise autoalojados, los editores pueden utilizar las credenciales incorporadas en los workflows compartidos aunque esas credenciales no se hayan compartido explícitamente con ellos. n8n también restringe la edición de nodos que utilizan credenciales no compartidas. Utilizar una credencial es distinto de ver sus valores secretos.

Al [compartir credenciales](<https://n8n-challenges.app/es/blog/variables-de-entorno-y-credenciales-de-n8n-checklist-para-una-instancia-compartida>) en esos mismos planes y ediciones, los usuarios que utilizan una credencial compartida no pueden ver ni editar sus detalles por esa vía de acceso compartido; los permisos elevados y los de roles de proyecto deben considerarse por separado. Eliminar una entrada de acceso compartido a una credencial requiere guardar el cambio.

Utiliza las siguientes comprobaciones sugeridas antes de dar por revisado el acceso a las credenciales. En nuestra opinión, eliminar una entrada de acceso compartido debe dar inicio a la verificación, en lugar de servir como prueba de que la retirada del acceso se ha completado.

- [ ] Identifica los workflows compartidos que utilizan cada credencial incluida en la revisión.
- [ ] Revisa quién puede acceder a esos workflows mediante acceso compartido o pertenencia a un proyecto.
- [ ] Registra si el uso de la credencial sigue estando justificado para cada vía de acceso.
- [ ] Incluye todas las vías pertinentes en cualquier decisión de retirada de acceso.

Sources: [n8n-docs/docs/administer/manage-credentials/share-credentials-securely.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-credentials/share-credentials-securely.md>), [Share with others | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/share-with-others>)

## Verifica las decisiones con comprobaciones seguras de permisos

Para verificar el RBAC en n8n, sugerimos utilizar cuentas de prueba autorizadas y comprobaciones no destructivas basadas en una matriz de acceso aprobada. Compara la visibilidad esperada y las acciones denegadas, incluido el uso de credenciales a través de workflows. No reveles valores secretos ni ejecutes workflows de producción solo para demostrar que existe acceso.

Esta parte se considera completada cuando los permisos observados coinciden con la decisión aprobada. Si el acceso persiste de forma inesperada, vuelve a revisar los privilegios de instancia, la pertenencia a proyectos, el acceso compartido directo y el uso de credenciales incorporadas antes de cerrar el cambio.

Sources: [n8n-docs/docs/administer/manage-users-and-access/understand-instance-roles.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-users-and-access/understand-instance-roles.md>), [n8n-docs/docs/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md>), [n8n-docs/docs/administer/manage-credentials/share-credentials-securely.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/administer/manage-credentials/share-credentials-securely.md>), [Share with others | Build | n8n Docs](<https://docs.n8n.io/build/manage-workflows/share-with-others>)

## Cierra los cambios con pruebas

El artículo de IDPro de 2025 escrito por Vatsal Gupta, Optimizing Access Certifications, describe cómo registrar los resultados de las revisiones y comprobar que las acciones correctivas se realizaron a tiempo. Es orientación profesional, no una prueba de que esta lista reduzca los incidentes.

Las comprobaciones de cierre que sugerimos a continuación convierten las decisiones en un registro que se puede revisar. Esta parte se considera completada cuando los cambios verificados están cerrados y el trabajo pendiente sigue siendo visible.

- [ ] Conserva la decisión, la justificación y las pruebas del cambio.
- [ ] Registra el resultado de la verificación y la fecha de cierre.
- [ ] Mantén abiertas las correcciones pendientes con un responsable y una fecha límite.
- [ ] Registra las excepciones aprobadas con la persona que las aprueba y una fecha de caducidad.

Sources: [Optimizing Access Certifications](<https://bok.idpro.org/article/119/galley/270/download/>)

Obtén ayuda práctica para examinar los límites de acceso de tu equipo con nuestro Workflow Audit, una revisión de vuestra instancia de n8n y vuestros workflows para evaluar su fiabilidad, seguridad y mantenibilidad. Este enlace abre la página Para empresas de este sitio.

**[Revisa los accesos de tu equipo](https://n8n-challenges.app/es/companies)**

Tags: n8n, Lista de comprobación
