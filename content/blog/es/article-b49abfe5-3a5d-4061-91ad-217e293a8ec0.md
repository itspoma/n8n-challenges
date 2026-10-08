---
{
  "id": "opp_b49abfe5-3a5d-4061-91ad-217e293a8ec0",
  "locale": "es",
  "slug": "article-b49abfe5-3a5d-4061-91ad-217e293a8ec0",
  "urlSlug": "n8n-chat-trigger-xss-que-dice-el-aviso-que-debes-hacer-ahora",
  "publishedAt": "2026-10-08T08:23:45.460Z",
  "title": "n8n Chat Trigger XSS: qué dice el aviso que debes hacer ahora",
  "subtitle": "Un repaso claro del aviso de XSS en el Chat Trigger de n8n sobre el parámetro customCss: qué cambió, a quién afecta y qué hacer ahora, según GitHub.",
  "description": "Un repaso claro del aviso de XSS en el Chat Trigger de n8n sobre el parámetro customCss: qué cambió, a quién afecta y qué hacer ahora, según GitHub.",
  "date": "2026-10-08",
  "sourcesCheckedAt": "2026-10-08T08:03:46.959Z",
  "tags": [
    "Actualizaciones",
    "n8n",
    "Preparación para producción"
  ],
  "coverImage": "/blog/es/article-b49abfe5-3a5d-4061-91ad-217e293a8ec0/8a48b8019aa31107bb407d7698048152df3ec0893011874c25d03c15c906adfe.png",
  "coverAlt": "Un quiosco de chat agrietado junto a un torniquete cerrado muestra la configuración expuesta frente a la segura del XSS en el Chat Trigger de n8n.",
  "seo": {
    "title": "n8n Chat Trigger XSS: qué dice el aviso que debes hacer ahora",
    "description": "Un repaso claro del aviso de XSS en el Chat Trigger de n8n sobre el parámetro customCss: qué cambió, a quién afecta y qué hacer ahora, según GitHub.",
    "keywords": []
  },
  "revision": "423338101b6d9a8c472656a74b3bffc6146a7e7c7ce2a5c881801c8385b6e483"
}
---

## Qué cambió: el aviso de XSS en el Chat Trigger de n8n

Si publicas un widget de chat usando el nodo Chat Trigger de n8n, vale la pena leer con atención el aviso de XSS en el Chat Trigger de n8n publicado en GitHub el 30 de septiembre de 2026. Registrado como GHSA-x5cw-hm7v-q7mj, describe un error de cross-site scripting almacenado en el parámetro customCss del nodo Chat Trigger en las páginas de chat alojadas. El resumen de seguridad de 2026 de GitHub para el repositorio n8n-io/n8n enumera el mismo aviso como publicado el 30 de septiembre de 2026 por un investigador llamado Matsuuu, calificado con severidad alta. [La puntuación CVSS v4 propia del aviso, publicada el 30 de septiembre de 2026](<https://github.com/n8n-io/n8n/security/advisories/GHSA-x5cw-hm7v-q7mj>), sitúa la severidad general en 7,0.

Según el aviso, la vulnerabilidad funciona mediante inyección almacenada: el valor customCss de un editor de flujos de trabajo se guarda junto al nodo Chat Trigger y luego se renderiza en la página pública de chat alojada. En una página de chat alojada publicada sin autenticación de usuario de n8n, el aviso indica que el contenido customCss del atacante se ejecuta allí para cualquier visitante que cargue la página. En efecto, una página de chat alojada sin autenticar se convierte en un punto de entrega para la ejecución arbitraria de scripts, porque el navegador trata el valor de estilo almacenado como código en lugar de como CSS plano, el problema central detrás de este aviso de seguridad de chat alojado de n8n.

Sources: [Overview · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security>), [n8n Chat Trigger Stored XSS via customCss Parameter on Hosted-Chat Page · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-x5cw-hm7v-q7mj>)

## A qué configuraciones del Chat Trigger de n8n afecta la vulnerabilidad de customCss

El aviso enumera las versiones de n8n anteriores a 1.123.83, 2.42.1 y 2.41.4 como afectadas por este problema de XSS en el Chat Trigger de n8n, que el aviso también describe como la vulnerabilidad customCss de n8n en la página de chat alojada, mientras que las versiones iguales o superiores a esos números figuran como corregidas. No indica si las versiones mayores heredadas y antiguas, fuera de esa numeración, presentan el mismo fallo. Como nota editorial, los equipos que ejecuten compilaciones históricas poco habituales quizá quieran comprobar directamente su propia versión frente a esos cortes.

El impacto también depende de cómo se publique una página concreta del Chat Trigger. La tabla siguiente resume lo que indica el aviso sobre cada configuración.

**Lo que indica el aviso sobre las configuraciones afectadas y no afectadas del Chat Trigger**

| Configuración | Hallazgo del aviso |
| --- | --- |
| Página de chat con autenticación establecida en Ninguna | Afectada: el customCss inyectado se ejecuta para cualquier visitante que cargue la página |
| Página de chat con n8n User Auth habilitado | No afectada, según el aviso |
| Instancia por debajo de 1.123.83 / 2.42.1 / 2.41.4 | Afectada |
| Instancia igual o superior a esas versiones | Corregida |

El aviso nombra únicamente n8n User Auth como el ajuste que no se ve afectado. No indica si el modo Basic Auth ofrece la misma protección. Nosotros trataríamos Basic Auth como no confirmado en lugar de asumir que bloquea el mismo ataque, ya que el aviso es específico sobre qué ajuste exime.

Sources: [n8n Chat Trigger Stored XSS via customCss Parameter on Hosted-Chat Page · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-x5cw-hm7v-q7mj>)

## Aplica el parche ahora y luego las mitigaciones temporales del aviso

![Un candado de cadena en un quiosco y un cerrojo instalándose en una puerta representan las mitigaciones temporales del Chat Trigger.](/blog/es/article-b49abfe5-3a5d-4061-91ad-217e293a8ec0/76f0ca0c44eda0b89922fff42208cbb0d51320cb825cfdc23efb7181cb772c32.png)

Se coloca un candado de cadena alrededor de un quiosco mientras se instala un cerrojo en una puerta al fondo.

La solución se basa en la versión: actualizar a n8n 1.123.83, 2.42.1, 2.41.4 o posterior instala el parche, según el aviso, como núcleo de esta actualización de seguridad del Chat Trigger de n8n. Hasta que la apliques, el contenido customCss almacenado sigue ejecutándose para los visitantes de cualquier página de chat alojada afectada. Este artículo sugiere tratar la actualización como la acción prioritaria, ya que el propio aviso enumera parches y soluciones provisionales sin clasificar una por encima de la otra.

Si no puedes actualizar de inmediato, el aviso enumera varias mitigaciones temporales, indicando claramente que ninguna de ellas elimina por completo el riesgo hasta que se parchea la instancia.

- [ ] Habilitar autenticación en los nodos Chat Trigger
- [ ] Restringir el acceso a la instancia solo a usuarios de confianza
- [ ] Auditar los valores customCss existentes en busca de contenido inesperado
- [ ] Desactivar los flujos de trabajo de Chat Trigger que no estén en uso activo

En nuestra opinión, aplicar estas cuatro mitigaciones juntas es la medida pragmática mientras programas la actualización de versión, ya que el propio aviso dice que ninguna de ellas cierra la brecha por sí sola.

Sources: [n8n Chat Trigger Stored XSS via customCss Parameter on Hosted-Chat Page · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-x5cw-hm7v-q7mj>)

Si tu equipo gestiona varios flujos de trabajo de Chat Trigger de cara al público, ahora es un buen momento para que todos estén alineados sobre la configuración segura. Nuestro programa n8n Advanced / Developer Training, impartido con tu propia instancia y datos de n8n, es la mejor forma práctica de formar a tu equipo en credenciales, autenticación y decisiones de arquitectura de flujos de trabajo como esta. El enlace abre nuestra página Para empresas en este sitio, donde puedes contactarnos a través del enlace de LinkedIn que allí aparece.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Contexto: cómo funciona el ajuste de autenticación del Chat Trigger de n8n

La documentación del nodo Chat Trigger de n8n indica que seleccionar Ninguna para la autenticación del chat significa que no se requiere inicio de sesión para usar el chat. Esto es información de contexto del producto, no contenido del aviso, y no menciona en absoluto la vulnerabilidad de customCss.

La misma documentación indica que seleccionar n8n User Auth restringe el chat a los usuarios que ya han iniciado sesión en una cuenta de n8n. Es un contexto útil para entender el ajuste que el aviso nombra como no afectado, pero la propia documentación no ofrece ninguna valoración de seguridad.

Sources: [Chat Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger>)

## Lo que el aviso no dice

El aviso no registra ningún identificador CVE ni clasificación CWE para este problema de XSS en el Chat Trigger de n8n, según el texto proporcionado, por lo que todavía no está referenciado de forma cruzada en bases de datos generales de vulnerabilidades bajo un identificador independiente. Tampoco indica si las instancias alojadas en n8n Cloud se parchearon automáticamente o si los administradores autoalojados deben aplicar la actualización ellos mismos; el aviso simplemente no aborda esa cuestión.

El aviso tampoco distingue el impacto entre las ediciones Community y Enterprise de n8n más allá de los números de versión que indica, y ninguna fuente aquí confirma explotación real; el aviso describe el fallo y su calificación de severidad, no incidentes observados. Creemos que auditar de forma rutinaria los campos customCss es un buen hábito para cualquier equipo que publique páginas de chat alojadas, incluso después de aplicar el parche, porque el campo aceptaba entradas inseguras antes de esta corrección.

Sources: [n8n Chat Trigger Stored XSS via customCss Parameter on Hosted-Chat Page · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-x5cw-hm7v-q7mj>), [Overview · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security>)

Más allá de este aviso concreto, conviene saber si alguna de las páginas de chat alojadas de tu equipo sigue usando ajustes de autenticación poco estrictos o valores customCss sin revisar. Nuestra Auditoría de Flujos de Trabajo revisa la instancia y los flujos de trabajo de n8n de una empresa en busca de fiabilidad, seguridad y mantenibilidad, y es la mejor forma de que tu equipo lo haga bien antes de que llegue el próximo aviso. El enlace abre nuestra página Para empresas en este sitio, donde las consultas se gestionan a través del enlace de LinkedIn que allí aparece.

**[Audita la seguridad de tu Chat Trigger](https://n8n-challenges.app/es/companies)**

Tags: Actualizaciones, n8n, Preparación para producción
