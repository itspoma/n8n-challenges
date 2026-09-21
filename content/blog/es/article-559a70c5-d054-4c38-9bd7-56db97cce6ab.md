---
{
  "id": "opp_559a70c5-d054-4c38-9bd7-56db97cce6ab",
  "locale": "es",
  "slug": "article-559a70c5-d054-4c38-9bd7-56db97cce6ab",
  "urlSlug": "variables-de-entorno-y-credenciales-de-n8n-checklist-para-una-instancia-compartida",
  "title": "Variables de entorno y credenciales de n8n: checklist para una instancia compartida",
  "subtitle": "Checklist para llevar un workflow de práctica a una instancia compartida de n8n: clave de cifrado, credenciales, uso compartido, proyectos y variables de entorno.",
  "description": "Checklist para llevar un workflow de práctica a una instancia compartida de n8n: clave de cifrado, credenciales, uso compartido, proyectos y variables de entorno.",
  "date": "2026-09-21",
  "sourcesCheckedAt": "2026-09-21T16:28:33.708Z",
  "tags": [
    "n8n",
    "Autoalojamiento",
    "Preparación para producción",
    "Checklist"
  ],
  "coverImage": "/blog/es/article-559a70c5-d054-4c38-9bd7-56db97cce6ab/50a2f5f3a183b4fd6bbd2c16eed689418d45a532636a73f4e2a9e57826ecda98.png",
  "coverAlt": "Una llave que pasa de un portátil a un armario de servidor compartido, representando la clave de cifrado de n8n llevada a una instancia compartida",
  "seo": {
    "title": "Variables de entorno y credenciales de n8n: checklist para una instancia compartida",
    "description": "Checklist para llevar un workflow de práctica a una instancia compartida de n8n: clave de cifrado, credenciales, uso compartido, proyectos y variables de entorno.",
    "keywords": []
  },
  "revision": "97f6ebe92c786dd0abfb28e5b919d8bd0f7069f596b4f7ca3b0cd1ff6c346605"
}
---

## Antes de empezar: qué se mueve y qué no

Seguramente creaste un workflow de práctica en tu portátil y ahora tu equipo lo quiere en una [instancia de n8n compartida o autoalojada](<https://n8n-challenges.app/es/blog/lista-de-seguridad-de-n8n-para-una-instancia-compartida-y-autoalojada>). Este checklist cubre las comprobaciones más importantes para ese traslado: la clave de cifrado, las credenciales de n8n, el uso compartido y los traslados entre proyectos, y las variables de entorno de n8n que controlan el acceso. Está pensado para responsables técnicos y para equipos que usan n8n en una empresa.

El alcance es limitado. Este checklist no trata la función Variables de n8n, los almacenes de secretos externos ni la exportación e importación entre instancias. Trata la configuración de la instancia y los traslados entre proyectos dentro de una misma instancia. Las páginas de la documentación de n8n en las que se basa no indican números de versión, así que comprueba los valores por defecto y la disponibilidad por plan en la versión que uses.

Como sugerencia editorial, haz una lista de todas las credenciales que usa el workflow antes de mover nada.

- [ ] Enumera todas las credenciales que usa el workflow
- [ ] Anota qué nodos o expresiones leen variables de entorno
- [ ] Decide qué proyecto de la instancia compartida será el propietario del workflow
- [ ] Planea recrear las credenciales en lugar de copiar el archivo de configuración

La mayoría de los puntos siguientes son sugerencias editoriales. La documentación solo presenta dos de ellos como requisitos, y las secciones de clave de cifrado y de credenciales los marcan donde corresponde.

Sources: [Set a custom encryption key | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key>), [Credentials | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/credentials>)

## Comprobaciones de la clave de cifrado

La documentación de n8n indica que n8n crea una clave de cifrado aleatoria la primera vez que se inicia. Guarda la clave en la carpeta ~/.n8n y la usa para cifrar las credenciales antes de almacenarlas. Puedes proporcionar tu propia clave con la variable de entorno N8N_ENCRYPTION_KEY, pero solo si todavía no hay ninguna clave en el archivo de configuración. [En modo cola](<https://n8n-challenges.app/es/blog/n8n-queue-mode-con-redis-cuando-dejar-el-modo-de-instancia-unica>), todos los workers deben tener esa variable definida.

La documentación no describe la rotación de la clave, la recuperación si se pierde ni cómo migrar a una clave nueva. Por eso conviene decidir la clave antes del primer arranque.

Los ajustes de seguridad incluyen N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS, que por defecto es false. Si lo pones en true, n8n intenta aplicar permisos 0600 al archivo de configuración que contiene la clave. La documentación dice que lo intenta, así que el resultado no está garantizado. Este ajuste solo se aplica a instancias autoalojadas.

Las variables sensibles admiten el sufijo _FILE, que hace que n8n lea el valor desde un archivo aparte. La documentación no enumera todas las variables que admiten este sufijo, así que revisa la tabla de la documentación para la variable de la clave antes de depender de ello.

- [ ] Define N8N_ENCRYPTION_KEY antes del primer arranque de la instancia (sugerencia)
- [ ] Guarda la clave en un almacén de secretos o en una configuración basada en _FILE (sugerencia)
- [ ] Da el mismo valor de clave a todos los workers en modo cola (obligatorio)
- [ ] Pon N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS en true y confirma los permisos del archivo (sugerencia)

Sources: [Set a custom encryption key | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key>), [Credentials | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/credentials>), [Security | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/security>)

## Comprobaciones de las credenciales de n8n

Si usas sobrescrituras de credenciales, revisa CREDENTIALS_OVERWRITE_PERSISTENCE. Por defecto es false. Según la documentación de n8n, lo necesitas en modo multiinstancia o en modo cola para que las sobrescrituras lleguen a los workers. Si no usas sobrescrituras, puedes omitirlo.

Una vez que el workflow esté en la instancia compartida, te sugerimos recrear allí cada credencial. Ponle a cada una un nombre claro para que tus compañeros sepan a qué servicio y a qué cuenta conecta. La convención de nombres es una sugerencia editorial, no algo que exija la documentación.

- [ ] Activa la persistencia de sobrescrituras si las usas en modo cola
- [ ] Recrea en la instancia compartida todas las credenciales de la lista
- [ ] Nombra cada credencial por servicio y cuenta
- [ ] Elimina las credenciales de prueba que queden

Sources: [Credentials | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/credentials>)

¿Tu equipo está pasando de workflows de práctica a una instancia compartida? La n8n Advanced / Developer Training es una opción a considerar. Los programas para empresas se preparan para un equipo y se imparten en tu propia instancia de n8n, así que la formación puede adaptarse a temas como estos. El enlace abre nuestra página Para empresas, donde las consultas se envían a través de LinkedIn.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Comprobaciones de uso compartido y proyectos

![Tarjetas de credenciales que se mueven entre carpetas de proyectos con los hilos de uso compartido cortados, representando un traslado de proyecto en n8n](/blog/es/article-559a70c5-d054-4c38-9bd7-56db97cce6ab/c7b2e1b20db34dbde3bd666600ec42f8defa8ac8623efa4a7cff4c836e66612a.png)

Diagrama conceptual: credenciales que se mueven entre carpetas de proyectos.

Antes de depender del uso compartido, [confirma que tu plan lo admite](<https://n8n-challenges.app/es/blog/precios-enterprise-de-n8n-vs-community-que-queda-restringido>). La disponibilidad por plan puede cambiar, así que compruébala para tu propia edición.

**Disponibilidad de funciones por edición, según la documentación de n8n**

| Función | n8n Cloud | Autoalojado |
| --- | --- | --- |
| Compartir credenciales | Todos los planes | Business, Enterprise |
| Proyectos y RBAC | Todos los planes | Registered Community, Business, Enterprise |
| Límites de proyectos y roles | Varían según el plan; cifras no documentadas | Varían según el plan; cifras no documentadas |

Aquí importan algunas reglas de la documentación de n8n. Los usuarios pueden compartir las credenciales de las que son propietarios. Si una credencial pertenece a un proyecto, solo los administradores del proyecto pueden compartirla. Los propietarios y administradores de la instancia pueden ver y compartir todas las credenciales. Un usuario que recibe una credencial compartida no puede ver ni editar sus detalles. Como sugerencia editorial, haz que las credenciales pertenezcan a un proyecto y no a una persona.

Mover un workflow o una credencial elimina todo su uso compartido existente. Además, un workflow puede dejar de funcionar si las credenciales que necesita no están disponibles en el proyecto de destino.

**Un orden sugerido para mover un proyecto**

1. **Revisa el plan**: Confirma que tu edición admite proyectos y uso compartido.
2. **Ubica las credenciales**: Asegúrate de que el proyecto de destino puede usar las credenciales que necesita el workflow.
3. **Mueve**: Mueve el workflow al proyecto de destino.
4. **Vuelve a compartir**: Comparte de nuevo el workflow y las credenciales.
5. **Vuelve a ejecutar**: Ejecuta el workflow una vez para confirmar que sigue funcionando.

Sources: [Share credentials securely | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-credentials/share-credentials-securely>), [Organize work in projects | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects>)

## Refuerzo del acceso a variables de entorno y archivos

![Un portapapeles junto a un armario cerrado con llave, representando el refuerzo del acceso a las variables de entorno de n8n](/blog/es/article-559a70c5-d054-4c38-9bd7-56db97cce6ab/911b4e12de7d513404d3d958c185cebb955d30a0e2a28ccccd1bfa2ad9bff801.png)

Ilustración conceptual de las comprobaciones de refuerzo.

En la documentación actual de n8n, N8N_BLOCK_ENV_ACCESS_IN_NODE es false por defecto. Con ese valor, los usuarios pueden leer las variables de entorno de n8n en expresiones y en el nodo Code. En una instancia compartida, podrías ponerlo en true para que los usuarios no puedan leerlas. Bloquear o no este acceso es una decisión editorial.

Si bloqueas el acceso, prueba todos los workflows que usan $env antes de anunciar que están en producción. Cualquier workflow que lea variables de entorno de n8n mediante $env deja de recibir esos valores cuando se bloquea el acceso.

- [ ] Decide si pones N8N_BLOCK_ENV_ACCESS_IN_NODE en true
- [ ] Busca referencias a $env en los workflows
- [ ] Vuelve a probar cada workflow que lea $env

Sources: [Security | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/security>)

## Cómo saber que has terminado, y solución de problemas

Una sección está terminada cuando has marcado todos los puntos de su checklist y el workflow se ejecuta en la instancia compartida dentro del proyecto previsto. Si un workflow deja de funcionar tras un traslado, revisa las causas de esta tabla. Son sugerencias sobre dónde mirar primero, no un diagnóstico completo.

**Dónde mirar primero cuando un workflow falla tras un traslado**

| Síntoma | Checklist que revisar |
| --- | --- |
| El workflow deja de funcionar tras mover el proyecto | Uso compartido y proyectos: ubicar las credenciales |
| Los compañeros perdieron el acceso | Uso compartido y proyectos: paso de volver a compartir |
| Los workers no pueden usar credenciales en modo cola | Clave de cifrado: la clave en cada worker |
| Los workers ignoran las sobrescrituras | Credenciales de n8n: persistencia de sobrescrituras |
| Las expresiones o nodos Code no pueden leer valores de entorno | Refuerzo del acceso a variables de entorno y archivos |

Sources: [Set a custom encryption key | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key>), [Credentials | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/credentials>), [Security | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/security>), [Organize work in projects | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects>)

Si eres responsable de una instancia compartida de n8n, un Workflow Audit revisa tu instancia y tus workflows en cuanto a fiabilidad, seguridad y mantenibilidad. Esa revisión puede incluir cómo gestiona tu equipo las credenciales y la clave de cifrado. El enlace abre nuestra página Para empresas, donde las consultas se envían a través de LinkedIn.

**[Audita tu configuración de credenciales](https://n8n-challenges.app/es/companies)**

Tags: n8n, Autoalojamiento, Preparación para producción, Checklist
