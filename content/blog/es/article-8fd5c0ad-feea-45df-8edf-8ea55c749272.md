---
{
  "id": "opp_8fd5c0ad-feea-45df-8edf-8ea55c749272",
  "locale": "es",
  "slug": "article-8fd5c0ad-feea-45df-8edf-8ea55c749272",
  "urlSlug": "el-schedule-trigger-de-n8n-se-ejecuta-a-la-hora-equivocada-corrige-la-zona-horaria-y-el-horario-de-v",
  "title": "¿El Schedule Trigger de n8n se ejecuta a la hora equivocada? Corrige la zona horaria y el horario de verano",
  "subtitle": "¿El Schedule Trigger de n8n se ejecuta a deshora? Qué zona horaria usa n8n, cómo fijar GENERIC_TIMEZONE o el ajuste de Cloud y el horario de verano.",
  "description": "¿El Schedule Trigger de n8n se ejecuta a deshora? Qué zona horaria usa n8n, cómo fijar GENERIC_TIMEZONE o el ajuste de Cloud y el horario de verano.",
  "date": "2026-09-22",
  "sourcesCheckedAt": "2026-09-21T21:28:03.483Z",
  "tags": [
    "n8n",
    "Depuración de workflows",
    "Preparación para producción",
    "Tutorial"
  ],
  "coverImage": "/blog/es/article-8fd5c0ad-feea-45df-8edf-8ea55c749272/ebfd3aabe41f6bb28d5225312009a5cba3ad17b9d370a508aba70dd291b6bec0.png",
  "coverAlt": "Dos relojes con una hora de diferencia siendo ajustados, como corrección de un Schedule Trigger de n8n a la hora equivocada",
  "seo": {
    "title": "¿El Schedule Trigger de n8n se ejecuta a la hora equivocada? Corrige la zona horaria y el horario de verano",
    "description": "¿El Schedule Trigger de n8n se ejecuta a deshora? Qué zona horaria usa n8n, cómo fijar GENERIC_TIMEZONE o el ajuste de Cloud y el horario de verano.",
    "keywords": []
  },
  "revision": "2969940b434facd478349ea239c1c5ab60c5ff73d4ab2da56ad60262b5505829"
}
---

## Objetivo, requisitos previos y cómo elige n8n una zona horaria

![Zona horaria del workflow superpuesta a la zona horaria de la instancia para el Schedule Trigger de n8n](/blog/es/article-8fd5c0ad-feea-45df-8edf-8ea55c749272/fba4cd71faf376697963b8d2bfee6145a9cf15b7432653dc1b25ac01236a193a.png)

Una vista ilustrativa de cómo la configuración del workflow prevalece sobre la de la instancia.

¿Tu Schedule Trigger de n8n se ejecuta a la hora equivocada, con ejecuciones que se disparan varias horas antes o después de lo que configuraste? Según la documentación de n8n, una causa habitual es el ajuste de zona horaria que usa n8n. Al terminar este tutorial, tu workflow programado debería ejecutarse a la hora local que querías, y sabrás qué revisar cuando cambia el horario de verano.

Necesitas un workflow programado que puedas editar y acceso a su configuración. Para cambiar el valor predeterminado de toda la instancia, también necesitas el panel de n8n Cloud o acceso a las [variables de entorno de una instancia autoalojada](<https://n8n-challenges.app/es/blog/variables-de-entorno-y-credenciales-de-n8n-checklist-para-una-instancia-compartida>).

Según la documentación de n8n, el Schedule Trigger toma su zona horaria de los ajustes de la tabla siguiente, y los valores predeterminados pueden no coincidir con tu ubicación, así que un workflow sin un ajuste explícito puede ejecutarse varias horas desfasado respecto a lo que esperas.

**De dónde obtiene el Schedule Trigger su zona horaria**

| Ajuste | Dónde cambiarlo | Valor predeterminado |
| --- | --- | --- |
| Timezone del workflow | Configuración del workflow | Sin definir: se usa la zona horaria de la instancia |
| Zona horaria de la instancia (Cloud) | Panel, Manage, Timezone | Detectada al registrarse; si no, GMT |
| Zona horaria de la instancia (autoalojada) | Variable GENERIC_TIMEZONE | America/New_York |

Sources: [Schedule Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger>), [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/common-issues>)

¿Empiezas desde cero? Puedes probar estos pasos en un nuevo espacio de trabajo de n8n Cloud. Es un enlace de partner que abre la propia página de registro de n8n.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Pasos para corregir la zona horaria en n8n

Para corregir un Schedule Trigger de n8n que se ejecuta a la hora equivocada, la documentación de n8n indica que puedes cambiar la zona horaria de un solo workflow o de toda la instancia. Sigue los pasos en orden. Tiene sentido definir primero la zona horaria del workflow, porque prevalece sobre el valor predeterminado de la instancia (consulta la tabla anterior).

**Cómo corregir la zona horaria de la programación**

1. **Abre la configuración**: Abre el workflow en el lienzo, selecciona el icono de tres puntos arriba a la derecha y luego Settings.
2. **Define Timezone**: Elige una zona con nombre, como Europe/London, y selecciona Save.
3. **Define el valor de la instancia**: En Cloud, selecciona Manage en el panel y cambia Timezone; en autoalojado, define GENERIC_TIMEZONE.
4. **Vuelve a publicar**: Despublica el workflow y publícalo de nuevo para que la programación use los nuevos ajustes.
5. **Comprueba**: Verifica que la siguiente ejecución ocurre a la hora local que pretendías.

En n8n Cloud, la documentación indica que el ajuste Timezone del panel afecta tanto al Schedule Trigger como al nodo Date & Time. La documentación de Cloud no dice a qué planes se aplica. En n8n autoalojado, la documentación muestra un ejemplo que exporta la variable de entorno GENERIC_TIMEZONE con el valor Europe/Berlin. No dice si hace falta reiniciar después. Como consejo editorial nuestro, planifica un reinicio por seguridad.

La documentación indica que un cambio en el intervalo del trigger solo surte efecto después de despublicar el workflow y publicar una nueva versión. La nueva programación cuenta entonces desde el momento de la publicación. La documentación no dice si un cambio de zona horaria también requiere volver a publicar. Volver a publicar de todos modos es un consejo editorial nuestro, no un comportamiento documentado. Las etiquetas de la interfaz también pueden variar entre versiones.

Sources: [Schedule Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger>), [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/common-issues>), [Set the timezone | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-the-timezone>), [Set your timezone | Deploy | n8n Docs](<https://docs.n8n.io/deploy/use-n8n-cloud/configure-cloud/set-your-timezone>)

Si tu equipo tropieza una y otra vez con problemas de programación y configuración como este, n8n Corporate Fundamentals es un programa de formación para equipos que se imparte en vuestra propia instancia de n8n. El enlace abre nuestra página Para empresas, desde donde puedes enviar una consulta a través de LinkedIn.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Horario de verano en n8n: elige el tipo de zona adecuado

![Reloj de zona horaria regional que cambia con el horario de verano junto a un reloj UTC fijo](/blog/es/article-8fd5c0ad-feea-45df-8edf-8ea55c749272/ea425c090248dcd9782a1daf4da7d321b80b83ff451566d22f1cd5cdbe959d4b.png)

Una comparación conceptual entre zonas horarias regionales y fijas.

Elige tu zona según lo que deba permanecer constante: la hora del reloj local o la hora UTC. Como orientación editorial, una zona con nombre basada en una región, como Europe/London, es la opción natural si te importa la hora del reloj local, y una opción GMT fija sin horario de verano si quieres que la ejecución esté ligada a UTC.

La documentación de n8n no describe esto; sí lo hace un hilo del foro de la comunidad de 2024 sobre n8n 1.38.2 en Docker, así que tómalo como una anécdota, no como comportamiento documentado. En ese hilo, un usuario configuró un workflow con la hora de Londres pero esperaba GMT. Durante el horario de verano británico, el trigger se ejecutó con una hora de diferencia respecto a GMT. Quien respondió dijo que había seguido correctamente la hora de Londres y sugirió la opción GMT sin horario de verano si la ejecución debía mantenerse alineada con un servidor en UTC.

La documentación de n8n no explica qué ocurre con las ejecuciones programadas dentro de la hora que se salta o se repite cuando cambian los relojes. Nuestra sugerencia editorial: evita programar tareas importantes en esa franja.

Sources: [Schedule Trigger and Confusion Over Time Zone Settings in n8n Workflow - Questions - n8n Community](<https://community.n8n.io/t/schedule-trigger-and-confusion-over-time-zone-settings-in-n8n-workflow/45401>)

## Resultados esperados y solución de problemas

Después de volver a publicar y de que pase la siguiente hora programada, comprueba que la ejecución ocurrió a la hora local que definiste en el Timezone del workflow. Si el Schedule Trigger de n8n sigue ejecutándose a la hora equivocada, revisa estos puntos.

- [ ] El workflow se ha guardado y publicado; la documentación indica que el trigger solo se ejecuta después de ambas cosas.
- [ ] Las variables de una expresión cron solo se evalúan al publicar, así que vuelve a publicar cuando cambien.
- [ ] El Timezone del workflow está definido, de modo que no se aplica el valor predeterminado de la instancia.
- [ ] Ejecuciones perdidas: con el programador en memoria predeterminado, las ejecuciones perdidas nunca se ejecutan. Existen opciones de recuperación desde n8n 2.36, solo en nodos Schedule Trigger añadidos a partir de esa versión y solo cuando la instancia usa el programador duradero.

Como recomendación editorial, los equipos pueden adoptar una regla común: cada workflow programado recibe una zona horaria con nombre explícita, y vuestros [estándares de workflows](<https://n8n-challenges.app/es/blog/checklist-de-revision-de-workflows-en-n8n-que-comprobar-antes-de-pasar-a-produccion>) registran la zona horaria de la instancia, ya sea GENERIC_TIMEZONE o el ajuste del panel de Cloud.

Sources: [Schedule Trigger | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger>), [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/common-issues>), [Set the timezone | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-the-timezone>), [Set your timezone | Deploy | n8n Docs](<https://docs.n8n.io/deploy/use-n8n-cloud/configure-cloud/set-your-timezone>)

¿No sabes cuáles de los workflows programados de tu equipo dependen del valor predeterminado de la instancia? Un Workflow Audit revisa tu instancia de n8n y tus workflows en cuanto a fiabilidad, seguridad y mantenibilidad. El enlace abre nuestra página Para empresas, donde las consultas se envían a través de LinkedIn.

**[Audita tus programaciones de workflows](https://n8n-challenges.app/es/companies)**

Tags: n8n, Depuración de workflows, Preparación para producción, Tutorial
