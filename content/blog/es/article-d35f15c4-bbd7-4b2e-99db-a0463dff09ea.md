---
{
  "id": "opp_d35f15c4-bbd7-4b2e-99db-a0463dff09ea",
  "locale": "es",
  "slug": "article-d35f15c4-bbd7-4b2e-99db-a0463dff09ea",
  "urlSlug": "reanudacion-de-chat-de-agente-entre-usuarios-que-dice-el-aviso-de-septiembre-de-2026",
  "publishedAt": "2026-10-03T08:37:19.463Z",
  "title": "Reanudación de chat de agente entre usuarios: qué dice el aviso de septiembre de 2026",
  "subtitle": "Qué dice el aviso de GitHub del 30 de septiembre de 2026 sobre la vulnerabilidad de reanudación de chat de agente entre usuarios y qué hacer ahora.",
  "description": "Qué dice el aviso de GitHub del 30 de septiembre de 2026 sobre la vulnerabilidad de reanudación de chat de agente entre usuarios y qué hacer ahora.",
  "date": "2026-10-03",
  "sourcesCheckedAt": "2026-10-03T08:23:55.844Z",
  "tags": [
    "n8n",
    "Automatización con IA",
    "Updates"
  ],
  "coverImage": "/blog/es/article-d35f15c4-bbd7-4b2e-99db-a0463dff09ea/8b193cda7b3d9a5ae0bf27e1f7f96d96c840d60891e8d7c74b1026cc43e92b06.png",
  "coverAlt": "Una segunda mano sella la aprobación del ticket de chat en pausa de otra persona, ilustrando la vulnerabilidad de reanudación de chat de agente entre usuarios.",
  "seo": {
    "title": "Reanudación de chat de agente entre usuarios: qué dice el aviso de septiembre de 2026",
    "description": "Qué dice el aviso de GitHub del 30 de septiembre de 2026 sobre la vulnerabilidad de reanudación de chat de agente entre usuarios y qué hacer ahora.",
    "keywords": []
  },
  "revision": "bbdd1d9ed146c6fb2343bb43ac139cc317ba9037e72cb6edfc0cb5b5da14feeb"
}
---

## Actualizaciones

El 30 de septiembre de 2026, un [aviso de seguridad](<https://n8n-challenges.app/es/blog/lista-de-verificacion-ante-una-brecha-de-seguridad-en-n8n-que-comprobar-y-bloquear-primero>) de GitHub anunció una vulnerabilidad de reanudación de chat de agente entre usuarios que afecta al paquete npm de n8n. El aviso, titulado "Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval", es la fuente principal de todo lo que este artículo afirma sobre el problema.

Aquí cubrimos únicamente lo que el propio aviso dice sobre esta vulnerabilidad de seguridad del chat de agentes: qué cambió, a quién afecta según el número de versión, y qué establece el aviso como solución y como medidas temporales. Donde el aviso guarda silencio, por ejemplo sobre n8n Cloud u otros planes alojados, lo decimos claramente en lugar de suponerlo.

Sources: [Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-p3pg-xw4f-m72c>)

## Qué se anunció y cuándo

El aviso se publicó en github.com el 30 de septiembre de 2026, bajo un título que nombra directamente el problema de reanudación de chat de agente entre usuarios. Describe un fallo en la forma en que un proyecto compartido de n8n gestiona una conversación de agente en pausa que espera que una persona apruebe una llamada a una herramienta.

El aviso documenta este fallo de reanudación de chat de agente de IA como un vacío de autorización: el sistema no verifica que el usuario que reanuda un chat sea el mismo usuario que lo inició, en un [proyecto compartido por varias personas](<https://n8n-challenges.app/es/blog/lista-de-seguridad-de-n8n-para-una-instancia-compartida-y-autoalojada>).

Sources: [Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-p3pg-xw4f-m72c>)

## Cómo la vulnerabilidad permite secuestrar una aprobación de herramienta pendiente

![Una segunda mano alcanza una nota de chat en pausa que espera la aprobación de herramienta de otra persona.](/blog/es/article-d35f15c4-bbd7-4b2e-99db-a0463dff09ea/577e7d1b64c0336fb34485228357712e7154fecfd7c76403c5ac005eb887a2af.png)

Esta imagen muestra una nota de conversación compartida siendo recogida por alguien distinto de quien la inició.

Según el aviso, un atacante que tenga acceso a un proyecto compartido puede leer por completo la conversación privada de agente de otro usuario. Una vez dentro de esa conversación, el atacante puede responder a [una aprobación pendiente](<https://n8n-challenges.app/es/blog/n8n-human-in-the-loop-anadir-un-paso-de-aprobacion-a-un-ai-agent>) en nombre de la víctima, permitiendo que la herramienta se ejecute y escribiendo su resultado de vuelta en el propio hilo de conversación de la víctima.

Nos parece que esto es un recordatorio útil de que un paso de aprobación humana solo es tan sólido como la verificación de identidad que lo rodea; una puerta de aprobación que cualquiera en un espacio de trabajo compartido puede pulsar no es realmente una puerta. El propio aviso enmarca la exposición como el secuestro de una aprobación de herramienta pendiente que nunca debió poder responder nadie salvo quien la solicitó originalmente.

Sources: [Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-p3pg-xw4f-m72c>)

Si tu equipo está construyendo flujos de agentes con pasos de aprobación humana, nuestro programa AI Agents with n8n entrena a tu equipo, en vuestra propia instancia de n8n, para diseñar aprobaciones, acceso a herramientas y límites de proyectos compartidos, de forma que un fallo como este sea más fácil de detectar antes de publicarse.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## A quién y a qué versiones afecta

El aviso indica que el paquete npm de n8n se ve afectado en versiones anteriores a la 2.42.0 y anteriores a la 2.41.4. Este problema de reanudación de chat de agente entre usuarios se aplica, por tanto, a cualquiera que ejecute una de esas versiones anteriores con varios usuarios compartiendo acceso a nivel de proyecto a agentes que usan aprobación de herramientas.

**Versiones del paquete npm de n8n afectadas y corregidas, según el aviso**

| Estado | Rango de versiones | Qué dice el aviso |
| --- | --- | --- |
| Afectada | Anteriores a 2.42.0 y anteriores a 2.41.4 | Listadas como vulnerables al problema de reanudación de chat entre usuarios |
| Corregida | 2.42.0 y 2.41.4 | Listadas como las versiones en las que se corrige el problema |

Sources: [Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-p3pg-xw4f-m72c>)

## Qué hacer ahora: parche y medidas temporales

![Actualizar n8n y restringir el acceso compartido aparecen marcados como pasos frente a la vulnerabilidad.](/blog/es/article-d35f15c4-bbd7-4b2e-99db-a0463dff09ea/406a04b690aacf925802f3044050185aea5dcf4bee576b65ec4b55683682dada.png)

Esta imagen muestra los pasos de actualización y acceso que el aviso enumera como solución y mitigaciones temporales.

El aviso indica que el problema se ha corregido en las versiones 2.42.0 y 2.41.4 de n8n, y dice a los usuarios que actualicen a una de esas versiones o posterior. Esa actualización es la única solución que el aviso recomienda realmente.

Para los equipos que no puedan actualizar de inmediato, el aviso enumera varias mitigaciones temporales: desactivar el módulo de Agentes mediante el ajuste N8N_ENABLED_MODULES, restringir el acceso a la instancia a usuarios de confianza, limitar quién pertenece a un proyecto compartido, y evitar herramientas con "Require approval" activado en agentes a los que puedan acceder varias personas.

- [ ] Actualiza a n8n 2.42.0, 2.41.4 o una versión posterior
- [ ] Si aún no puedes actualizar, desactiva el módulo de Agentes mediante N8N_ENABLED_MODULES
- [ ] Restringe el acceso a la instancia solo a usuarios de confianza
- [ ] Limita quién pertenece a cada proyecto compartido
- [ ] Evita activar "Require approval" en agentes compartidos por varias personas

A nuestro juicio, aquí importa la propia advertencia del aviso: dice claramente que estas medidas no resuelven del todo el riesgo, por lo que no confiaríamos en ninguna de ellas por separado y trataríamos la actualización como la solución real, no como algo opcional.

Sources: [Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-p3pg-xw4f-m72c>)

## Lo que el anuncio no indica

El aviso no dice si n8n Cloud u otros planes alojados están afectados; esa cuestión simplemente no se aborda en el texto revisado. Tampoco explica cuánto tiempo existió el problema antes de ser descubierto, cuántas instancias quedaron expuestas, ni si alguien lo explotó antes de la corrección.

- Si n8n Cloud u otros planes alojados están afectados
- Si las ediciones Community y Enterprise difieren en su exposición
- Cuánto tiempo existió el fallo antes de ser descubierto
- Si fue explotado antes de que se publicara la corrección

El aviso no indica si se ha asignado un identificador CVE a este problema ni ofrece una puntuación numérica de gravedad; esos detalles no se abordan en los hallazgos revisados. A nuestro juicio, no disponer de un CVE a mano es un inconveniente menor para quienes rastrean vulnerabilidades más que una señal de que el problema sea menos grave, por lo que los equipos que dependen de feeds de CVE deberían seguir este caso por el título del aviso por ahora.

Sources: [Cross-User Agent Chat Resume Allows Hijacking Another User's Pending Tool Approval · Advisory · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/security/advisories/GHSA-p3pg-xw4f-m72c>)

Aplicar el parche es la solución que indica el propio aviso, pero saber si vuestros proyectos compartidos, ajustes de aprobación y configuración de módulos están seguros hoy es otra cuestión distinta. Nuestro Workflow Audit revisa la instancia de n8n y los flujos de un equipo buscando precisamente este tipo de fallos de fiabilidad y seguridad.

**[Audita tu configuración de agentes compartidos](https://n8n-challenges.app/es/companies)**

Tags: n8n, Automatización con IA, Updates
