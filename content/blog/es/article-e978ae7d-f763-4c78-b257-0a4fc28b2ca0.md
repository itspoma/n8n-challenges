---
{
  "id": "opp_e978ae7d-f763-4c78-b257-0a4fc28b2ca0",
  "locale": "es",
  "slug": "article-e978ae7d-f763-4c78-b257-0a4fc28b2ca0",
  "urlSlug": "notas-de-la-version-n8n-2-43-browser-use-ya-esta-activado-para-todos",
  "publishedAt": "2026-10-09T05:21:50.441Z",
  "title": "Notas de la versión n8n 2.43: Browser Use ya está activado para todos",
  "subtitle": "Las notas de la versión n8n 2.43 activan Browser Use para todos y cambian sus valores predeterminados: qué cambió, a quién afecta y qué no se indica.",
  "description": "Las notas de la versión n8n 2.43 activan Browser Use para todos y cambian sus valores predeterminados: qué cambió, a quién afecta y qué no se indica.",
  "date": "2026-10-09",
  "sourcesCheckedAt": "2026-10-09T05:02:31.778Z",
  "tags": [
    "Updates",
    "n8n",
    "Automatización con IA",
    "Preparación para producción"
  ],
  "coverImage": "/blog/es/article-e978ae7d-f763-4c78-b257-0a4fc28b2ca0/a4d6e783390b12dfce06a73d7c025be50b6f700bb3d7090f3ef98df495518630.png",
  "coverAlt": "Una ventana de navegador pasa junto a una barrera de cuerda hacia un escenario, ilustrando el cambio principal de las notas de la versión n8n 2.43.",
  "seo": {
    "title": "Notas de la versión n8n 2.43: Browser Use ya está activado para todos",
    "description": "Las notas de la versión n8n 2.43 activan Browser Use para todos y cambian sus valores predeterminados: qué cambió, a quién afecta y qué no se indica.",
    "keywords": []
  },
  "revision": "8a620ada180ca6ca7d8595bc82b3fafdc55098f29dff1d307ef3a8ce99128463"
}
---

## Qué cubren las notas de la versión n8n 2.43 y cuándo se lanzó

Las notas de la versión n8n 2.43 describen una única actualización fechada: el registro de cambios oficial de n8n incluye la versión 2.43, publicada el 6 de octubre de 2026, con la disponibilidad de Browser Use para todos los usuarios como elemento destacado entre un total de 14 cambios incluidos en esta actualización de n8n de octubre de 2026.

El propio listado de versiones de GitHub para el repositorio de n8n muestra la etiqueta 2.43.0 publicada el 6 de octubre, lo que coincide con la fecha del registro de cambios, y la marca como Pre-release en lugar de versión general.

Sources: [Release notes | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes>), [Releases · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/releases>)

Si todavía no tienes un espacio de trabajo de n8n donde probar Browser Use cuando llegue a tu instancia, este enlace de socio abre la propia página de registro de n8n para n8n Cloud, donde puedes crear un espacio de trabajo y estar atento a este ajuste mientras se despliega.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## El cambio principal: Browser Use pasa de experimento a activado por defecto

![Un interruptor en posición de activado se conecta a un icono de ventana de navegador mientras un teléfono y una tableta tachados aparecen a un lado.](/blog/es/article-e978ae7d-f763-4c78-b257-0a4fc28b2ca0/a0f644e3e52a5f9b9a6bf73b3c22b3514bfaca0268fe5e3946c7874e12927bae.png)

Un interruptor luminoso en posición de activado se encuentra junto a un icono de ventana de navegador, con un teléfono y una tableta tachados a un lado.

El elemento central de esta versión es la función Browser Use de n8n dentro del n8n Assistant. n8n 2.43 activa Browser Use para todos los usuarios en lugar de mantenerla detrás de una marca de experimento, y ahora se controla mediante un nuevo ajuste de administración de instancia, N8N_INSTANCE_AI_BROWSER_USE_ENABLED, que las notas de la versión describen como activado por defecto.

Junto a ese cambio hay dos detalles relacionados. La función aún no funciona en teléfonos ni tabletas, incluidos los iPads en modo escritorio, y la opción de configuración automática de credenciales que antes formaba parte del experimento ahora está desactivada por defecto para todos, aunque las notas de n8n indican que el código subyacente se mantiene por si regresa en el futuro.

En nuestra opinión, pasar una función de navegación con IA de experimento opcional a activada por defecto es la decisión correcta para un constructor de flujos de trabajo: la mayoría de los equipos nunca activa las marcas experimentales, así que dejar Browser Use oculta tras una de ellas habría significado que la mayoría de los usuarios nunca la vieran.

n8n ha descrito el [n8n Assistant](<https://n8n-challenges.app/es/blog/n8n-ai-workflow-builder-beta-que-construia-y-por-que-n8n-dice-que-ha-sido-reemplazada>) en general, la superficie que ahora incorpora Browser Use para todos los usuarios, como una herramienta en la que alguien describe una automatización en lenguaje sencillo y el asistente la planifica, la construye en el lienzo, y ayuda a ejecutarla y depurarla; esa descripción es anterior a la versión 2.43 y no menciona Browser Use directamente, por lo que aquí se usa solo como contexto de lo que el Assistant ya hacía.

Sources: [Release notes | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes>), [Introducing n8n Assistant – n8n Blog](<https://blog.n8n.io/introducing-n8n-assistant/>)

## Qué más cambió junto a Browser Use

Browser Use es el elemento destacado, pero viene acompañada de otros 13 cambios en las notas de la versión n8n 2.43, que en conjunto forman los 14 elementos totales de esta actualización de nuevas funciones de n8n. Este artículo se centra en Browser Use, ya que es el único cambio que las notas de la versión mencionan explícitamente en el título de la versión; el resto aparece en el registro de cambios como una lista plana que n8n no agrupa por temas, y este artículo no intenta resumir cada uno.

Sources: [Release notes | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes>)

Mantener a un equipo al día de cambios tan rápidos como este, incluido un nuevo ajuste de administración que la mayoría de los equipos no notará hasta que les afecte, resulta más fácil con un recurso continuo que con lecturas puntuales. Nuestro programa n8n Office Hours / Coaching ofrece a tu equipo un espacio recurrente, construido alrededor de tu propia instancia de n8n, para trabajar exactamente este tipo de cambios de versión. Pregunta por él en nuestra página Para empresas, donde se enumeran nuestros programas de formación.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## ¿Es ya n8n 2.43 la versión estable?

![Un nivel de piedra reposa sobre suelo firme junto a un nivel de madera equilibrado sobre un andamio, mostrando lo estable frente a lo beta.](/blog/es/article-e978ae7d-f763-4c78-b257-0a4fc28b2ca0/9e852f189a8055e9824c679767010b53e4ba6a6ccf0181149b0694c43554b6c7.png)

Un robusto nivel de piedra reposa sobre suelo firme junto a un nivel de madera más ligero equilibrado sobre un andamio a medio construir.

En el momento en que se revisó esta página, el propio listado de notas de versión de n8n mostraba la 2.43 marcada como versión beta actual, mientras que la 2.42.5 seguía mostrándose como la versión estable actual. Esto significa que, en ese momento, la 2.43 aún no había sido promovida al canal estable.

El listado de versiones de GitHub para el repositorio de n8n respalda esto: la etiqueta 2.43.0 está marcada como Pre-release en lugar de versión general, lo cual es coherente con la designación beta que n8n da a esta línea de versión.

**Dónde se encontraba n8n 2.43 en sus canales de lanzamiento**

| Fuente | Qué mostraba | Etiqueta de estado |
| --- | --- | --- |
| Página de notas de versión de n8n | 2.43 indicada como beta actual; 2.42.5 mostrada como estable actual | Beta |
| Versiones de GitHub para el repositorio de n8n | Etiqueta 2.43.0 publicada el 6 de octubre | Pre-release |

Trataríamos una etiqueta Pre-release y una etiqueta beta igual que trataríamos cualquier compilación de staging: útil para explorar ahora, arriesgado suponer que se comportará igual una vez que llegue al canal estable.

Sources: [Release notes 2.x | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes-2.x>), [Releases · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/releases>)

## Qué no dice el anuncio de n8n 2.43

Las notas de la versión n8n 2.43 no indican si Browser Use, ni ninguno de los otros 13 cambios, se comporta de la misma manera en n8n Cloud, en una instancia autoalojada y en Enterprise, ni si llega a todos los planes alojados al mismo tiempo. Esto se deja sin especificar, en lugar de insinuarse de una manera u otra.

Las notas tampoco explican qué significa en la práctica una etiqueta Pre-release de GitHub o una etiqueta de canal beta para alguien que ejecuta n8n en producción frente a alguien que lo prueba por separado. Esto se señala como algo que el propio anuncio no cubre, no como un vacío que deba rellenarse con una suposición.

Sources: [Release notes | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes>), [Release notes 2.x | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes-2.x>), [Releases · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/releases>)

## Qué hacer ahora con n8n 2.43

Las notas de la versión 2.43 de n8n describen qué cambió; no indican a los lectores cómo implementarlo. La siguiente lista de verificación es una sugerencia editorial propia de este artículo, no un consejo expresado por n8n.

- [ ] Comprueba el ajuste N8N_INSTANCE_AI_BROWSER_USE_ENABLED antes de asumir que Browser Use es opcional en tu instancia.
- [ ] Revisa los otros 13 elementos de la misma entrada de notas de versión para detectar los que afecten a nodos o integraciones que tu equipo ya utiliza.
- [ ] Prueba primero Browser Use en una instancia que no sea de producción, ya que la propia página de notas de versión de n8n mostraba la 2.43 como beta y no como estable en el momento de escribir esto.
- [ ] Vigila la página de versiones de GitHub para saber cuándo se sustituye la etiqueta Pre-release por una versión general, si quieres confirmar que ha llegado al canal estable.

En nuestra opinión, probar una nueva función activada por defecto como esta en una instancia secundaria antes de depender de ella para trabajo de cara al cliente es el término medio razonable entre ignorarla y confiar a ciegas en una compilación beta.

Sources: [Release notes | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes>), [Release notes 2.x | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes-2.x>), [Releases · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/releases>)

Decidir si una función recién activada por defecto, pero todavía en beta, tiene cabida en tu instancia de producción es exactamente el tipo de pregunta que responde un Workflow Audit: una revisión de tu instancia y flujos de trabajo de n8n en cuanto a fiabilidad, seguridad y mantenibilidad antes de activar nuevos valores predeterminados. Nuestra página Para empresas describe este programa; las consultas se envían a través del enlace de LinkedIn que aparece allí.

**[Evalúa tu preparación para la actualización](https://n8n-challenges.app/es/companies)**

Tags: Updates, n8n, Automatización con IA, Preparación para producción
