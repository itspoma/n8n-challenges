---
{
  "id": "opp_18de42c2-df6b-41c1-b4a1-36f421e8b44d",
  "locale": "es",
  "slug": "article-18de42c2-df6b-41c1-b4a1-36f421e8b44d",
  "urlSlug": "n8n-sso-autoalojado-lista-de-verificacion-de-licencias-y-configuracion",
  "publishedAt": "2026-10-09T07:13:49.097Z",
  "title": "n8n SSO autoalojado: lista de verificación de licencias y configuración",
  "subtitle": "Lista práctica para n8n SSO autoalojado: qué edición y licencia necesitas, en qué se diferencian SAML y OIDC, y dónde encajan las soluciones de la comunidad.",
  "description": "Lista práctica para n8n SSO autoalojado: qué edición y licencia necesitas, en qué se diferencian SAML y OIDC, y dónde encajan las soluciones de la comunidad.",
  "date": "2026-10-09",
  "sourcesCheckedAt": "2026-10-09T06:45:42.561Z",
  "tags": [
    "n8n",
    "Autoalojamiento",
    "Licencias de SSO",
    "Lista de verificación"
  ],
  "coverImage": "/blog/es/article-18de42c2-df6b-41c1-b4a1-36f421e8b44d/5a0ced8ce52cf4ebc113f62c73590fb4858be549c057a06f9e0318ae7a2f1c90.png",
  "coverAlt": "Dos llaves y cerraduras de tamaños distintos junto a un pequeño rack de servidores, que representan las opciones de licencia de n8n SSO autoalojado.",
  "seo": {
    "title": "n8n SSO autoalojado: lista de verificación de licencias y configuración",
    "description": "Lista práctica para n8n SSO autoalojado: qué edición y licencia necesitas, en qué se diferencian SAML y OIDC, y dónde encajan las soluciones de la comunidad.",
    "keywords": []
  },
  "revision": "a0d19460cc95652db557ca6050b8ac801509446f28c8d031b53fc4e6b1ad5679"
}
---

## Confirma en qué implementación y edición de n8n estás

Si eres un responsable de operaciones o TI que intenta habilitar [n8n SSO autoalojado](<https://n8n-challenges.app/es/blog/n8n-sso-lo-necesitas-o-basta-con-inicios-de-sesion-compartidos>), la bifurcación de licencias llega antes que cualquier bifurcación de configuración. El inicio de sesión único no es algo que toda instancia autoalojada pueda activar. La propia documentación de n8n incluye el SSO, tanto SAML como LDAP, entre las funciones que la edición Community gratuita no incluye. Si tu equipo todavía está en Community, ese es el primer muro con el que te topas antes de que importe cualquier ajuste de SAML u OIDC.

La guía de n8n sobre cómo elegir el uso del producto confirma el mismo patrón desde el otro lado: las organizaciones que necesitan funciones empresariales como SSO, entornos o proyectos las obtienen mediante un plan de pago, ya sea que ese plan funcione en n8n Cloud o en tu propia infraestructura autoalojada. Así que la pregunta real no es solo autoalojado frente a la nube; es si estás en una edición de pago con licencia.

Esta lista de verificación cubre solo SAML y OIDC, los dos protocolos que la documentación de n8n nombra como compatibles para el inicio de sesión único; no cubre los pasos de configuración específicos de LDAP, ya que no revisamos documentación de configuración de LDAP.

Sources: [Configure SSO | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/configure-sso>), [Compare editions | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/community-edition-features>), [Choose how to use n8n | n8n Docs](<https://docs.n8n.io/choose-how-to-use-n8n>)

## Licencia para n8n SSO autoalojado: Business vs Enterprise

![Una bóveda cerrada más pequeña junto a una bóveda más grande entreabierta, que representan los planes Business y Enterprise de n8n.](/blog/es/article-18de42c2-df6b-41c1-b4a1-36f421e8b44d/e9d5a090a0fe0832493ab7584991af1e7c5ea7da82fa26d8346df1f6a7c9305d.png)

Una bóveda más pequeña y otra más grande, una junto a la otra, muestran los dos planes autoalojados vinculados al inicio de sesión único con SAML y OIDC.

Activar n8n SSO autoalojado empieza por elegir un protocolo, porque eso decide qué plan necesitas realmente. La propia documentación de configuración de n8n indica que el SSO con SAML está disponible en los planes autoalojados Business y Enterprise, mientras que su documentación de OIDC limita este protocolo solo al plan Enterprise. Una publicación de 2025 en el foro de la comunidad de n8n resumía la misma división para otros usuarios autoalojados: SAML está en el plan Business, OIDC es exclusivo de Enterprise. Si OIDC es el protocolo preferido de tu proveedor de identidad, presupuesta para Enterprise, no para Business.

**SAML vs OIDC en n8n autoalojado**

| Protocolo | Plan mínimo | Fuente |
| --- | --- | --- |
| SAML | Business o Enterprise | Documentación de n8n sobre configuración de SAML |
| OIDC | Solo Enterprise | Documentación de n8n sobre configuración de OIDC |

La propia licencia es un paso corto y documentado. La documentación de gestión de licencias de n8n describe suscribirse a un plan de pago para recibir una clave de licencia y luego activarla dentro del producto a través de Settings, Usage and plan y Enter activation key.

Dos detalles operativos son fáciles de pasar por alto. La documentación de n8n señala que tu instancia necesita alcanzar el servidor de licencias de n8n, lo que implica poner en la lista blanca el rango de IPs de Cloudflare en tu firewall. Y si la renovación automática llega a desactivarse, alguien de tu equipo tiene que renovar manualmente la licencia cada 10 días, en Settings y Usage and plan, o cada función con licencia, incluido el SSO, se desactiva.

Una publicación de blog de diciembre de 2025 de un desarrollador independiente informó de una licencia 'Startup' desde 400 dólares al mes como el nivel que desbloquea el SSO, aunque ese nombre de plan no coincide con los términos Business y Enterprise usados en la documentación oficial de n8n, por lo que no pudo verificarse frente a precios oficiales. En nuestra opinión, es más útil presupuestar según la división documentada de Business frente a Enterprise que según una cifra que no pudo confirmarse, y conviene revisar la página de precios actual de n8n antes de comprometerse.

Sources: [Set up SAML | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-saml/set-up-saml>), [Set up OIDC | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-oidc/set-up-oidc>), [OIDC Auth with Self-hosted license Business - Questions - n8n Community](<https://community.n8n.io/t/oidc-auth-with-self-hosted-license-business/183933>), [Compare editions | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/community-edition-features>), [Manage your license | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/manage-your-license>), [License | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/license>), [Announcing n8n-oidc &bull; Cameron Eagans](<https://www.cweagans.net/2025/12/announcing-n8n-oidc/>)

## Elige tu protocolo: SAML vs OIDC, y qué necesita cada uno de tu IdP

La página de configuración de SSO de n8n indica claramente que SAML y OIDC son los dos protocolos que el producto admite para el inicio de sesión único; no hay nada más documentado como compatible.

Para [SAML](<https://n8n-challenges.app/es/blog/como-funciona-el-sso-con-saml-en-n8n-que-verificar-antes-del-despliegue>), la documentación de configuración de n8n recorre un flujo dentro de la aplicación: abre Settings, ve a SSO, anota la n8n Redirect URL y el Entity ID que genera la instancia, y luego entrega esos dos valores a tu proveedor de identidad mientras configuras los ajustes correspondientes en el lado de n8n.

![Habilitar SAML en n8n: 1. Abre los ajustes de SSO; 2. Anota los valores generados; 3. Configura el proveedor de identidad; 4. Prueba la conexión](/blog/es/article-18de42c2-df6b-41c1-b4a1-36f421e8b44d/962f33c5e68f58e5826fb3b428cf07b54c2d69d0dd1033ef214071f8298af254.png)

Para OIDC, la documentación de n8n es explícita en que solo un propietario o administrador de la instancia puede habilitarlo y configurarlo, algo relevante al decidir quién del equipo se encarga realmente de este trabajo.

Sources: [Configure SSO | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/configure-sso>), [Set up SAML | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-saml/set-up-saml>), [Set up OIDC | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-oidc/set-up-oidc>)

## Habilita el SSO mediante variables de entorno y aprovisionamiento de roles (según la versión)

Si prefieres gestionar el SSO como código en lugar de hacerlo a través de la interfaz, la documentación de variables de entorno de n8n indica que la gestión del SSO desde variables de entorno se volvió disponible a partir de la versión 2.18.0 de n8n. En versiones autoalojadas más antiguas, la configuración de SAML y OIDC debe hacerse a través de la interfaz de Settings.

El propio interruptor es una sola variable: la documentación de variables de entorno de SSO de n8n indica que al establecer N8N_SSO_MANAGED_BY_ENV en true se entrega la configuración del SSO a tus variables de entorno. La misma página advierte que la variable de metadatos XML de SAML y la variable de URL de metadatos de SAML son mutuamente excluyentes, por lo que hay que establecer una u otra, nunca ambas.

El aprovisionamiento de roles es una capacidad separada y más reciente. La documentación de n8n indica que el [aprovisionamiento automático de roles basado en SSO](<https://n8n-challenges.app/es/blog/que-significa-rbac-en-n8n-cuando-lo-necesita-un-equipo-pequeno>), que asigna roles de instancia y de proyecto desde tu proveedor de identidad, está disponible desde la versión 1.122.2 de n8n, con una opción instance_role que aprovisiona solo el rol a nivel de instancia y deja el acceso a proyectos para gestionarse manualmente. Nos parece prometedor que pasos sujetos a versión como este indiquen que n8n sigue invirtiendo en gestión de identidad, lo que debería facilitar los despliegues con el tiempo. Los equipos que aún ejecutan una versión autoalojada más antigua simplemente asignan los roles a mano.

Sources: [Manage settings using environment variables | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/manage-settings-using-environment-variables>), [SSO | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/sso>), [Set up OIDC | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-oidc/set-up-oidc>)

Configurar bien SAML u OIDC desde el principio depende menos de hacer clic en Settings y más de que un equipo entienda juntos los planes, las variables de entorno y el aprovisionamiento de roles. n8n Advanced / Developer Training es nuestro programa estructurado para dar a un equipo esa profundidad, impartido sobre tus propias herramientas e instancia de n8n, y las consultas se gestionan a través de nuestra página Para empresas.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Confirma que tu uso se mantiene dentro de la Sustainable Use License de n8n

La licencia no es solo un interruptor técnico; también es una cuestión de condiciones. Las preguntas frecuentes sobre la licencia Community de n8n indican que usar funciones empresariales que requieren una clave de licencia, como el SSO, sin tener una licencia Enterprise queda fuera de lo que permite la Sustainable Use License gratuita.

Las mismas preguntas frecuentes aclaran el alcance: la licencia Community gratuita se aplica solo a la versión autoalojada de n8n. n8n Cloud funciona bajo sus propios términos de pago separados, de modo que autoalojado y gratuito no son automáticamente el mismo cajón una vez que entran en juego el SSO u otras funciones con licencia.

Sources: [License FAQ | n8n Community license | n8n Docs](<https://docs.n8n.io/n8n-community-license/community-license/license-faq>)

## El panorama de soluciones alternativas no oficiales, y sus compromisos

Como OIDC está detrás de un plan Enterprise, algunos usuarios autoalojados buscan una forma de evitarlo antes de comprar. Una publicación de blog de diciembre de 2025 de un desarrollador independiente describe n8n-oidc, una herramienta creada por la comunidad que usa el sistema de hooks externos de n8n para añadir inicio de sesión con OpenID Connect a una instancia autoalojada sin una licencia empresarial.

Una publicación posterior, de marzo de 2026, del mismo desarrollador revisa esa configuración, construida contra Pocket ID, un proveedor de identidad autoalojado que él mismo creó, como la configuración personal de homelab contra la que la estaba probando.

Seríamos cautelosos a la hora de apoyarnos en una solución de la comunidad como esta para algo que vaya más allá de un entorno de laboratorio o evaluación. Queda fuera del modelo de licencias y soporte propio de n8n, así que un despliegue regulado o de producción es exactamente donde esa brecha más importa.

Sources: [Announcing n8n-oidc &bull; Cameron Eagans](<https://www.cweagans.net/2025/12/announcing-n8n-oidc/>), [Authentication with Pocket ID &bull; Cameron Eagans](<https://www.cweagans.net/2026/03/authentication-with-pocket-id/>)

## Lista de verificación previa al despliegue de SSO autoalojado en n8n

![Un portapapeles con una lista de verificación sostiene un pequeño servidor, una credencial y una llave que se van marcando para el despliegue de SSO autoalojado.](/blog/es/article-18de42c2-df6b-41c1-b4a1-36f421e8b44d/640a922c21cba454e9951fd716f535a1d435f64af580b309ce45e3dfe20aef08.png)

Un portapapeles con un pequeño servidor, una credencial y una llave muestra los pasos a confirmar antes de desplegar SSO autoalojado.

Usa esta lista de verificación como el último repaso antes de activar n8n SSO autoalojado para todos. Ninguno de estos pasos sustituye revisar directamente las páginas actuales de precios y documentación de n8n, ya que varias de las fuentes detrás de esta lista remiten precisamente allí como referencia definitiva.

- [ ] Confirma que estás en una edición autoalojada Business o Enterprise, no Community, antes de configurar SAML u OIDC.
- [ ] Elige SAML si una licencia de nivel Business te encaja; elige OIDC solo si estás dispuesto a licenciar Enterprise.
- [ ] Activa tu clave de licencia en Settings, Usage and plan, y confirma que la instancia puede alcanzar el servidor de licencias de n8n.
- [ ] Anota tu n8n Redirect URL y Entity ID para SAML, o confirma el acceso de propietario o administrador para OIDC, antes de contactar a tu proveedor de identidad.
- [ ] Decide si configurar el SSO a través de la interfaz o, desde n8n 2.18.0, mediante variables de entorno, comenzando por N8N_SSO_MANAGED_BY_ENV.
- [ ] Si usas metadatos de SAML, establece la variable de metadatos XML o la variable de URL de metadatos, nunca ambas.
- [ ] En n8n 1.122.2 o posterior, decide tu modo de aprovisionamiento de roles antes de la puesta en marcha.
- [ ] Incorpora la renovación de la licencia a tu manual de operaciones por si la renovación automática llegara a desactivarse.

Sources: [Set up SAML | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-saml/set-up-saml>), [Set up OIDC | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-oidc/set-up-oidc>), [Manage your license | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/manage-your-license>), [License | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/license>), [Manage settings using environment variables | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/manage-settings-using-environment-variables>), [License FAQ | n8n Community license | n8n Docs](<https://docs.n8n.io/n8n-community-license/community-license/license-faq>), [Announcing n8n-oidc &bull; Cameron Eagans](<https://www.cweagans.net/2025/12/announcing-n8n-oidc/>)

Si tu equipo está a punto de comprometer presupuesto en una licencia Enterprise, o ya ejecuta SSO y no está seguro de que la configuración, el aprovisionamiento de roles y el proceso de renovación de licencia sean sólidos, un Workflow Audit revisa una instancia autoalojada de n8n y sus flujos de trabajo en cuanto a fiabilidad, seguridad y mantenibilidad. Creemos que esa revisión es el siguiente paso más útil antes de escalar el SSO a todo el equipo, y las consultas se gestionan a través de nuestra página Para empresas.

**[Audita la configuración de SSO de tu equipo](https://n8n-challenges.app/es/companies)**

Tags: n8n, Autoalojamiento, Licencias de SSO, Lista de verificación
