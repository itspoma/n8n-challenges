---
{
  "id": "opp_ebfba396-a14b-4ad6-a8c6-ab0252a24439",
  "locale": "es",
  "slug": "article-ebfba396-a14b-4ad6-a8c6-ab0252a24439",
  "urlSlug": "usuarios-de-chat-hub-con-acceso-solo-al-chat-aviso-de-seguridad-de-n8n-del-14-de-octubre",
  "publishedAt": "2026-10-18T14:23:31.064Z",
  "title": "Usuarios de Chat Hub con acceso solo al chat: aviso de seguridad de n8n del 14 de octubre",
  "subtitle": "Qué dice el aviso de n8n del 14 de octubre de 2026 sobre usuarios de Chat Hub con acceso solo al chat, versiones afectadas, correcciones y mitigación.",
  "description": "Qué dice el aviso de n8n del 14 de octubre de 2026 sobre usuarios de Chat Hub con acceso solo al chat, versiones afectadas, correcciones y mitigación.",
  "date": "2026-10-18",
  "sourcesCheckedAt": "2026-10-18T14:16:20.098Z",
  "tags": [
    "n8n",
    "Preparación para producción",
    "Actualizaciones"
  ],
  "coverImage": "/blog/es/article-ebfba396-a14b-4ad6-a8c6-ab0252a24439/f65dce4f3b7859ffb4a0858f0056f07f096bf159bb7fd08308ce581110ae2560.webp",
  "coverAlt": "Una llave con forma de chat abre una puerta de herramientas y representa el problema de permisos que afecta a los usuarios de Chat Hub con acceso solo al chat.",
  "seo": {
    "title": "Usuarios de Chat Hub con acceso solo al chat: aviso de seguridad de n8n del 14 de octubre",
    "description": "Qué dice el aviso de n8n del 14 de octubre de 2026 sobre usuarios de Chat Hub con acceso solo al chat, versiones afectadas, correcciones y mitigación.",
    "keywords": []
  },
  "revision": "e55320f943725a93ed1ff13e0c187e0dbe849a7199901e70d499a1898108e06c"
}
---

## Qué reveló el anuncio sobre Chat Hub

Los usuarios de Chat Hub con acceso solo al chat son el objeto del aviso de seguridad GHSA-43v8-hjhm-chjp, publicado por n8n el 14 de octubre de 2026. El anuncio revela una vulnerabilidad de permisos y correcciones publicadas; no presenta una funcionalidad prevista para estos usuarios. El aviso no indica cuándo comenzó el comportamiento vulnerable.

El problema afecta a usuarios con el rol de usuario de chat, que no pueden crear ni editar flujos de trabajo, pero podían superar [los límites de su rol](<https://n8n-challenges.app/es/blog/que-significa-rbac-en-n8n-cuando-lo-necesita-un-equipo-pequeno>) mediante herramientas. Creemos que la distinción clave está en los permisos: un rol de chat restringido debe evaluarse tanto por lo que puede invocar como por lo que puede editar.

Sources: [Chat Hub: chat-only users can register tool types the product already tries to sandbox · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-43v8-hjhm-chjp>)

## Tipos de herramientas de Chat Hub y límites del sandbox

![Un cajón de herramientas abierto junto a una herramienta y una carpeta contenidas en una caja distingue los permisos de Chat Hub de los límites del sandbox.](/blog/es/article-ebfba396-a14b-4ad6-a8c6-ab0252a24439/421c2181bf031f70ff186633fe5d82ff621f8f09062bfec2e06ca8008f3010ca.webp)

Un cajón abierto y un recinto intacto distinguen el acceso a las herramientas de la contención de su ejecución.

Según el aviso, los usuarios de Chat Hub con acceso solo al chat podían añadir y ejecutar herramientas que ejecutan código en el sandbox del task runner, acceder a archivos dentro de los directorios permitidos por n8n o utilizar flujos de trabajo, Data Tables y agentes de la instancia. Estas son las capacidades descritas en la divulgación, no pruebas de que los clientes experimentaran esas acciones.

La divulgación sobre el sandbox de Chat Hub no demuestra que se pudiera escapar del sandbox ni indica la frecuencia de explotación.

Sources: [Chat Hub: chat-only users can register tool types the product already tries to sandbox · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-43v8-hjhm-chjp>)

¿Diriges un equipo que está revisando los permisos de agentes y herramientas? Nuestro programa AI Agents with n8n es la mejor formación práctica para desarrollar juntos esos conocimientos, utilizando las herramientas, los datos y la instancia de n8n de vuestro equipo. El enlace abre la página Para empresas de este sitio.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Correcciones publicadas y qué deben hacer ahora los administradores

Para los equipos que administran instancias con usuarios de chat, n8n recomienda [actualizar a una versión corregida o posterior](<https://n8n-challenges.app/es/blog/version-actual-de-n8n-cuando-y-como-deberia-actualizar-un-equipo-autoalojado>). Su aviso del 14 de octubre de 2026 enumera las siguientes expresiones de versiones afectadas y sus correcciones, sin asignarles etiquetas de canales de lanzamiento.

**Expresiones de versiones y correcciones correspondientes enumeradas en el aviso de n8n**

| Expresión de versiones afectadas | Corrección publicada |
| --- | --- |
| < 1.123.85 | 1.123.85 |
| < 2.43.5 | 2.43.5 |
| < 2.44.1 | 2.44.1 |

Si los administradores no pueden actualizar de inmediato, el aviso incluye desactivar temporalmente Chat Hub cuando no sea necesario. Advierte expresamente de que sus medidas provisionales no subsanan por completo el riesgo. Este artículo aborda esa única medida temporal, en lugar de la lista completa de medidas provisionales.

Nuestra recomendación práctica es asignar a un administrador la responsabilidad de comparar la versión desplegada con las correcciones publicadas y organizar la actualización. Como sugerencia editorial adicional, revisad [qué capacidades de las herramientas quiere el equipo que tengan los usuarios de chat](<https://n8n-challenges.app/es/blog/autorizacion-de-agentes-de-ia-en-n8n-que-revisar-primero>); esa revisión es independiente de la solución indicada en el aviso.

Sources: [Chat Hub: chat-only users can register tool types the product already tries to sandbox · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-43v8-hjhm-chjp>)

## Qué deja sin especificar el aviso

El anuncio no especifica qué ediciones están cubiertas, cómo se gestionan otras ediciones o planes alojados, el estado de los parches en n8n Cloud ni las medidas específicas para cada despliegue. Tampoco proporciona comandos de actualización, procedimientos de verificación ni un procedimiento para desactivar Chat Hub. Esos detalles no deben deducirse de la lista de versiones.

Como sugerencia editorial adicional, preguntad cómo se comprobará que la actualización se ha completado.

Sources: [Chat Hub: chat-only users can register tool types the product already tries to sandbox · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-43v8-hjhm-chjp>)

Para recibir ayuda práctica al revisar la configuración y los límites de permisos de vuestro equipo, elegid nuestro Workflow Audit: una revisión de vuestra instancia y vuestros flujos de trabajo de n8n centrada en la fiabilidad, la seguridad y la facilidad de mantenimiento. El enlace abre la página Para empresas de este sitio, que describe programas realizados con vuestras propias herramientas, datos e instancia de n8n.

**[Revisa los permisos de vuestro n8n](https://n8n-challenges.app/es/companies)**

Tags: n8n, Preparación para producción, Actualizaciones
