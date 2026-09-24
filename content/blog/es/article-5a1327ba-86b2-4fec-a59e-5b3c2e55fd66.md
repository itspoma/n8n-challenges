---
{
  "id": "opp_5a1327ba-86b2-4fec-a59e-5b3c2e55fd66",
  "locale": "es",
  "slug": "article-5a1327ba-86b2-4fec-a59e-5b3c2e55fd66",
  "urlSlug": "que-significa-rbac-en-n8n-cuando-lo-necesita-un-equipo-pequeno",
  "publishedAt": "2026-09-24T20:33:43.669Z",
  "title": "Qué significa RBAC en n8n: cuándo lo necesita un equipo pequeño",
  "subtitle": "Una explicación clara del significado de RBAC en n8n: roles de instancia y proyecto, requisitos de plan y cuándo un equipo pequeño lo necesita.",
  "description": "Una explicación clara del significado de RBAC en n8n: roles de instancia y proyecto, requisitos de plan y cuándo un equipo pequeño lo necesita.",
  "date": "2026-09-24",
  "sourcesCheckedAt": "2026-09-24T20:17:44.602Z",
  "tags": [
    "Guía",
    "n8n",
    "Control de acceso",
    "Preparación para producción"
  ],
  "coverImage": "/blog/es/article-5a1327ba-86b2-4fec-a59e-5b3c2e55fd66/f1d63005354333bc80d2a4439087cb36976c8ab4e9a82504c49b65514b36a287.png",
  "coverAlt": "Ilustración que muestra el significado de RBAC como tres llaves distintas para una misma caja de herramientas compartida de n8n.",
  "seo": {
    "title": "Qué significa RBAC en n8n: cuándo lo necesita un equipo pequeño",
    "description": "Una explicación clara del significado de RBAC en n8n: roles de instancia y proyecto, requisitos de plan y cuándo un equipo pequeño lo necesita.",
    "keywords": []
  },
  "revision": "e80ed2d1353ca1ef00d38c5d6707318788a1089aed71298847c3136a84b193cf"
}
---

## Qué es el control de acceso RBAC, en términos generales

Si estás tratando de precisar el significado de RBAC antes de implementarlo en un equipo, el concepto no nace con n8n. El control de acceso basado en roles asigna a cada usuario uno o más roles, y cada rol conlleva un conjunto definido de privilegios, según el Computer Security Resource Center del NIST. En lugar de conceder acceso persona por persona, se asignan roles, y son los roles los que llevan los permisos.

El objetivo del RBAC, en general, es gestionar la seguridad a un nivel que refleje cómo está estructurada realmente la organización, en lugar de mantener una lista de acceso independiente para cada persona y recurso. Esta descripción procede de una página general del NIST, no específica de n8n, que la propia fuente señala como archivada y ya no actualizada, pero la lógica subyacente es exactamente la que sigue el propio sistema de permisos de n8n.

Sources: [Role Based Access Control | CSRC](<https://csrc.nist.gov/projects/role-based-access-control>)

## Cómo implementa n8n el RBAC: roles de instancia frente a roles de proyecto

n8n aplica el RBAC en dos niveles distintos. Los roles de instancia determinan lo que un usuario puede hacer en toda la instancia de n8n, cosas como invitar personas o gestionar la configuración global. Los roles de proyecto determinan lo que esa misma persona puede hacer dentro de un proyecto concreto, que es donde realmente ocurre la construcción diaria de flujos de trabajo.

De forma predeterminada, los roles de instancia de n8n son Owner (propietario), Admin y Member. Los roles de instancia y de proyecto totalmente personalizados, en los que se definen permisos más allá de esos valores predeterminados, son una función exclusiva de Enterprise tanto en n8n Cloud como en n8n autoalojado; los roles integrados son con los que trabaja el resto.

Sources: [Set permissions and roles (RBAC) | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac>)

## Roles de proyecto en la práctica: Admin, Editor y Viewer

![Comparación de los tres roles de proyecto de n8n representados como una llave maestra, una llave en forma de llave inglesa y una llave con lupa junto a una carpeta de proyecto.](/blog/es/article-5a1327ba-86b2-4fec-a59e-5b3c2e55fd66/0e71339bb256f0af0a3a5c5ded74dabcffe28ff28130128eeda2f9f21f8aa96b.png)

Comparación ilustrativa de los roles de proyecto Admin, Editor y Viewer.

Dentro de un proyecto, n8n ofrece tres roles: Admin, Editor y Viewer. Estos determinan quién puede editar, ejecutar o simplemente ver los flujos de trabajo de ese proyecto.

**Roles de proyecto de n8n y qué puede tocar cada uno**

| Rol | Puede hacer | No puede hacer |
| --- | --- | --- |
| Admin | Gestionar la configuración y los miembros del proyecto, además de editar y ejecutar flujos de trabajo | Nada está restringido dentro del proyecto |
| Editor | Crear, editar y ejecutar flujos de trabajo en el proyecto | Gestionar la configuración o los miembros del proyecto |
| Viewer | Abrir y leer flujos de trabajo con fines de visibilidad o auditoría | Ejecutar manualmente cualquier flujo de trabajo del proyecto |

El rol Viewer es más estricto de lo que podría parecer: quienes lo tienen pueden abrir y leer los flujos de trabajo de un proyecto, pero no pueden ejecutar manualmente ni siquiera aquellos que tienen permiso para ver.

Sources: [See available roles | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles>)

## Qué plan o edición requiere cada nivel de rol

Nada de esto está disponible en todas partes de forma predeterminada. La [edición Community autoalojada y gratuita](<https://n8n-challenges.app/es/blog/precios-enterprise-de-n8n-vs-community-que-queda-restringido>) no tiene ningún sistema de proyectos ni de compartición: solo el propietario de la instancia y quien haya creado un flujo de trabajo o credencial concretos puede acceder a ellos, por lo que ni siquiera existe un rol que asignar.

Los proyectos y la compartición —el mecanismo del que depende el RBAC— se desbloquean en los planes autoalojados Business y Enterprise, y en n8n Cloud, según su propia tabla de funciones. La página de precios de n8n presenta esto como un control de acceso basado en roles que garantiza «el nivel adecuado de permisos» para cada miembro del equipo. Incluso el plan de nivel inicial Cloud Starter incluye un proyecto compartido, y Cloud Pro añade un tercer proyecto compartido junto con una función denominada roles de Admin.

El rol Editor en concreto —que permite a alguien editar y ejecutar flujos de trabajo sin gestionar el proyecto— solo está disponible en n8n Cloud Pro o en la edición Enterprise autoalojada. Ten en cuenta que [la página de precios de n8n](<https://n8n-challenges.app/es/blog/planes-de-precios-de-n8n-para-equipos-cloud-o-self-hosted>) no lleva ninguna fecha de publicación explícita en lo documentado aquí, así que considera los nombres de los planes y sus inclusiones como exactos solo a fecha de esta consulta, y confírmalos en la página de precios en vivo antes de comprometer presupuesto.

**Disponibilidad de RBAC según la edición y el plan de n8n**

| Edición o plan | Proyectos y compartición | Roles disponibles |
| --- | --- | --- |
| Community autoalojado | No disponible — solo el propietario de la instancia y el creador de cada flujo de trabajo tienen acceso | Sin sistema de roles |
| Business autoalojado | Habilitado | Admin (Editor y Viewer requieren Enterprise) |
| Enterprise autoalojado | Habilitado | Admin, Editor, Viewer, además de roles de instancia y proyecto personalizados |
| n8n Cloud Starter | 1 proyecto compartido incluido | Roles de proyecto básicos |
| n8n Cloud Pro | 3 proyectos compartidos, función denominada roles de Admin | Rol de Editor de proyecto incluido |

Sources: [See available roles | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles>), [Compare editions | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/community-edition-features>), [n8n Plans and Pricing - n8n.io](<https://n8n.io/pricing/>)

Si tu equipo todavía está decidiendo quién debe editar, ejecutar o solo ver vuestros flujos de trabajo compartidos, esa es exactamente el tipo de norma básica que n8n Corporate Fundamentals, disponible en la página Para empresas, está pensado para cubrir con todo un equipo en vuestra propia instancia de n8n.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Qué no cubre el RBAC en n8n

Los roles no llegan a todos los rincones de una instancia de n8n. [Las variables y las etiquetas](<https://n8n-challenges.app/es/blog/variables-de-entorno-y-credenciales-de-n8n-checklist-para-una-instancia-compartida>) no están delimitadas por el RBAC en absoluto: permanecen globales y visibles en toda la instancia sin importar qué roles de proyecto hayas asignado. Mantén convenciones de nomenclatura y disciplina de revisión para ellas por separado, en lugar de suponer que los roles también las restringen.

Sources: [See available roles | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles>)

## Escenario: un flujo de trabajo compartido, distintos derechos según el rol

![Tres manos que representan a Admin, Editor y Viewer alcanzando un tablero de flujo de trabajo compartido de n8n con herramientas distintas.](/blog/es/article-5a1327ba-86b2-4fec-a59e-5b3c2e55fd66/343bd82d6366b9baae4da59e1654d5c62c3ebeb03c6ab9a123d9db7d9411be83.png)

Escenario conceptual de tres roles interactuando con un mismo flujo de trabajo compartido de n8n.

Imagina un flujo de trabajo de producción que tres personas tocan de forma distinta: se trata de un escenario propuesto para razonar sobre el tema, no de un caso documentado de n8n. Un responsable de ingeniería necesita ver que se mantuvo en verde durante la noche, un desarrollador necesita arreglar un nodo roto, y una parte interesada solo quiere confirmar que se ejecutó.

**Un flujo de trabajo compartido, tres conjuntos de derechos**

1. **Admin**: Gestiona quién tiene acceso al proyecto y puede editar o ejecutar el flujo de trabajo a voluntad.
2. **Editor**: Abre el flujo de trabajo, arregla el nodo roto y lo vuelve a ejecutar, sin tocar la membresía del proyecto.
3. **Viewer**: Comprueba el historial de ejecuciones para confirmar que la ejecución fue correcta, pero no puede activarla manualmente.

Sources: [See available roles | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles>)

## Cuándo un equipo pequeño realmente necesita RBAC

Entonces, ¿cuándo se traduce realmente el significado de RBAC en una decisión de compra? Ninguna fuente oficial de n8n indica un umbral específico de tamaño de equipo: lo que sigue es un juicio editorial basado en la disponibilidad documentada de funciones, no una recomendación del proveedor.

- [ ] Si tu equipo tiene aproximadamente entre 1 y 3 personas que comparten el inicio de sesión del propietario de la instancia, o si cada persona solo toca siempre sus propios flujos de trabajo, el acceso predeterminado de la edición Community (propietario más creador) puede ser ya suficiente.
- [ ] Si más de una persona necesita derechos distintos sobre el mismo flujo de trabajo compartido —una edita y despliega, otra solo activa ejecuciones, una tercera solo necesita visibilidad—, esa es la señal práctica para pasar a los roles de proyecto.
- [ ] Haz coincidir cada rol con el trabajo real: Viewer para quienes solo necesitan el estado, Editor para quienes construyen y mantienen flujos de trabajo, y Admin con moderación para quien tenga la decisión sobre el acceso y la estructura.
- [ ] Recuerda que el rol Editor ya requiere n8n Cloud Pro o Enterprise autoalojado, así que presupuesta el plan junto con la decisión sobre el número de personas.

Sources: [See available roles | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles>), [Compare editions | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/community-edition-features>)

## Próximos pasos prácticos para estandarizar los permisos en un equipo en crecimiento

Antes de implementar roles en un equipo en crecimiento, plasma en papel el mapa de quién necesita qué. Eso es lo que convierte el significado de RBAC comentado anteriormente en una configuración real en lugar de una conjetura.

- [ ] Enumera todos los flujos de trabajo de producción compartidos y quién los toca actualmente.
- [ ] Marca a cada persona según si necesita editar, solo ejecutar o solo ver ese flujo de trabajo.
- [ ] Comprueba cuáles de los planes o ediciones de tu equipo ya admiten proyectos y compartición.
- [ ] Confirma si el acceso de nivel Editor requiere una actualización antes de prometérselo a nadie.
- [ ] Revisa por separado quién puede ver las variables y etiquetas compartidas, ya que los roles no las restringen.

Sources: [See available roles | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles>)

Si no estás seguro de que vuestros roles, proyectos y credenciales compartidas actuales aguanten realmente el uso real, una Auditoría de Flujos de Trabajo en la página Para empresas revisa la instancia de n8n de tu equipo en cuanto a fiabilidad, seguridad y mantenibilidad.

**[Audita el acceso de tu equipo](https://n8n-challenges.app/es/companies)**

Tags: Guía, n8n, Control de acceso, Preparación para producción
