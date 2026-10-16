---
{
  "id": "opp_f49eff47-0ebd-48fa-928d-c611e6fdcfdc",
  "locale": "es",
  "slug": "article-f49eff47-0ebd-48fa-928d-c611e6fdcfdc",
  "urlSlug": "comprobacion-de-permisos-de-credenciales-en-n8n-aviso-del-14-de-octubre-y-proximos-pasos",
  "publishedAt": "2026-10-16T05:09:20.495Z",
  "title": "Comprobación de permisos de credenciales en n8n: aviso del 14 de octubre y próximos pasos",
  "subtitle": "El aviso de n8n del 14 de octubre de 2026 sobre permisos de credenciales indica versiones corregidas y medidas temporales. Qué deben hacer los equipos.",
  "description": "El aviso de n8n del 14 de octubre de 2026 sobre permisos de credenciales indica versiones corregidas y medidas temporales. Qué deben hacer los equipos.",
  "date": "2026-10-16",
  "sourcesCheckedAt": "2026-10-16T05:01:40.690Z",
  "tags": [
    "n8n",
    "Preparación para producción",
    "Actualizaciones"
  ],
  "coverImage": "/blog/es/article-f49eff47-0ebd-48fa-928d-c611e6fdcfdc/2ccbf0f8097e0b9dc99007ee5c4a40ee5a8d8b5b67a7df5fac054d7482a5f1a7.webp",
  "coverAlt": "Una mano repara una barrera junto a un flujo de trabajo que transporta una llave, representando la comprobación de permisos de credenciales en n8n.",
  "seo": {
    "title": "Comprobación de permisos de credenciales en n8n: aviso del 14 de octubre y próximos pasos",
    "description": "El aviso de n8n del 14 de octubre de 2026 sobre permisos de credenciales indica versiones corregidas y medidas temporales. Qué deben hacer los equipos.",
    "keywords": []
  },
  "revision": "d5d6cf287f61bf1639a294965cb7ae8fbe34e09bd1a5ead97f328dd868ffe1b5"
}
---

## Qué anunció n8n el 14 de octubre

El aviso GHSA-8vrr-mgc5-jg55 sobre la comprobación de permisos de credenciales en n8n, publicado el 14 de octubre de 2026, indica a los usuarios que actualicen a la versión 1.123.85, 2.43.5 o 2.44.1, o posteriores, para corregir una vulnerabilidad relacionada con los nodos de subflujos de trabajo en línea. El 14 de octubre es la fecha de publicación del aviso; no se indica que sea la fecha de lanzamiento del parche.

El anuncio enumera los umbrales de versiones afectadas por debajo de esas correcciones, sin nombrar canales de lanzamiento. Nuestra sugerencia editorial es comparar la versión desplegada con el aviso. En nuestra opinión, [asignar a una persona responsable de la actualización](<https://n8n-challenges.app/es/blog/noticias-de-seguridad-de-n8n-una-lista-de-verificacion-de-parches-recurrente>) es el primer paso más útil para un equipo.

Sources: [Credential Permission Check Skips Inline Sub-Workflow Nodes With a Non-Boolean Disabled Value · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-8vrr-mgc5-jg55>)

## Cómo la comprobación de permisos de credenciales en n8n podía pasar por alto un nodo

![Dos bandejas muestran un subflujo de trabajo en línea pasando bajo una plantilla de inspección y avanzando por una vía de ejecución.](/blog/es/article-f49eff47-0ebd-48fa-928d-c611e6fdcfdc/81b030757903d218c95a10758b605865acb110209085d7c6373ca8b9042aaa6e.webp)

Dos vistas del mismo flujo de trabajo anidado ilustran la diferencia entre la revisión de permisos y la ejecución.

Según el anuncio, la comprobación de permisos de credenciales y el motor de ejecución interpretaban de forma distinta los nodos deshabilitados. En los nodos de subflujos de trabajo en línea de n8n, esa discrepancia podía permitir que un nodo eludiera la comprobación de permisos y aun así se ejecutara. El aviso se refiere a un valor no booleano de disabled en n8n: un valor distinto de un booleano verdadero o falso.

El requisito previo indicado es relevante para los equipos que revisan los accesos: un miembro necesitaría conocer el ID de una credencial a la que no tiene acceso. El aviso señala que ese miembro podría aprovechar la vulnerabilidad para enviar el contenido descifrado de la credencial a un servidor bajo su control. No informa de casos observados de explotación, cifras de clientes afectados ni resultados medidos de incidentes.

Sources: [Credential Permission Check Skips Inline Sub-Workflow Nodes With a Non-Boolean Disabled Value · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-8vrr-mgc5-jg55>)

¿Diriges un equipo que revisa el acceso a flujos de trabajo y credenciales? Nuestro programa n8n Advanced / Developer Training ayuda a tu equipo a desarrollar esas habilidades con vuestras propias herramientas, datos e instancia de n8n. El enlace abre la página Para empresas de este sitio.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Qué hacer si la actualización debe esperar

Para los administradores que no puedan actualizar de inmediato, n8n recomienda las siguientes medidas temporales ante la vulnerabilidad de comprobación de permisos de credenciales en n8n:

- [ ] Restringir el acceso a la instancia a usuarios de plena confianza.
- [ ] Retirar el acceso como miembro a los usuarios que no sean de plena confianza.
- [ ] Auditar los registros de ejecución para detectar ejecuciones inesperadas y satisfactorias de Execute Workflow que utilicen el modo JSON en línea.

El anuncio advierte expresamente de que estas medidas no eliminan por completo el riesgo y deben utilizarse a corto plazo. Indica qué revisar, pero no proporciona consultas para los registros, un procedimiento forense ni garantías de detectar una explotación, y tampoco cuantifica la reducción del riesgo.

Creemos que las restricciones de acceso y la [revisión de registros](<https://n8n-challenges.app/es/blog/checklist-del-audit-log-de-n8n-como-comprobar-la-cobertura-de-tu-registro-de-auditoria>) deben acompañar a una actualización programada, en lugar de convertirse en un motivo para posponerla.

Sources: [Credential Permission Check Skips Inline Sub-Workflow Nodes With a Non-Boolean Disabled Value · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-8vrr-mgc5-jg55>)

## Qué deja sin especificar el anuncio

El anuncio no especifica qué ediciones están afectadas, cómo se gestionan los planes alojados ni si las instancias en la nube reciben el parche automáticamente. Tampoco describe la implementación de la corrección, los valores malformados exactos de disabled, los comandos de actualización ni los procedimientos de verificación posteriores.

Nuestra sugerencia editorial es registrar por separado esas preguntas sobre el despliegue al coordinar la actualización de la comprobación de permisos de credenciales en n8n, para que las suposiciones sobre quién se encarga de actualizar no se conviertan en el plan de acción del equipo.

Sources: [Credential Permission Check Skips Inline Sub-Workflow Nodes With a Non-Boolean Disabled Value · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-8vrr-mgc5-jg55>)

Recibe ayuda práctica para revisar la configuración de tu equipo con nuestro Workflow Audit, que revisa vuestra instancia de n8n y vuestros flujos de trabajo en cuanto a fiabilidad, seguridad y mantenibilidad. Para los equipos que evalúan el acceso a credenciales, el enlace abre la página Para empresas de este sitio.

**[Revisa los accesos de tu equipo](https://n8n-challenges.app/es/companies)**

Tags: n8n, Preparación para producción, Actualizaciones
