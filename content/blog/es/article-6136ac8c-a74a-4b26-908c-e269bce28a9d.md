---
{
  "id": "opp_6136ac8c-a74a-4b26-908c-e269bce28a9d",
  "locale": "es",
  "slug": "article-6136ac8c-a74a-4b26-908c-e269bce28a9d",
  "urlSlug": "restablecer-la-gestion-de-usuarios-de-n8n-una-lista-de-verificacion-para-solucionar-problemas",
  "publishedAt": "2026-10-01T18:23:46.318Z",
  "title": "Restablecer la gestión de usuarios de n8n: una lista de verificación para solucionar problemas",
  "subtitle": "Lista práctica para un restablecimiento de usuarios de n8n que bloquea el acceso o rompe cuentas: comprobaciones de SMTP, email del propietario, MFA y JWT_SECRET.",
  "description": "Lista práctica para un restablecimiento de usuarios de n8n que bloquea el acceso o rompe cuentas: comprobaciones de SMTP, email del propietario, MFA y JWT_SECRET.",
  "date": "2026-10-01",
  "sourcesCheckedAt": "2026-10-01T18:01:12.877Z",
  "tags": [
    "n8n",
    "Autoalojamiento",
    "Gestión de usuarios",
    "Lista de verificación"
  ],
  "coverImage": "/blog/es/article-6136ac8c-a74a-4b26-908c-e269bce28a9d/e6f13a691f6bcd022a85572fd6298a3037a21be896b6f674bea616b4ea62390c.png",
  "coverAlt": "Un globo atado a un rack de servidor bloqueado con una llave fuera de alcance, representando a un administrador de n8n bloqueado.",
  "seo": {
    "title": "Restablecer la gestión de usuarios de n8n: una lista de verificación para solucionar problemas",
    "description": "Lista práctica para un restablecimiento de usuarios de n8n que bloquea el acceso o rompe cuentas: comprobaciones de SMTP, email del propietario, MFA y JWT_SECRET.",
    "keywords": []
  },
  "revision": "9f76bd9a16cbfe254dfbf4caca191f503356b72a850399b34534e292f510ae88"
}
---

## Antes de tocar nada: confirma el síntoma y protege tus datos

Si un restablecimiento de la gestión de usuarios de n8n es lo que te ha traído hasta aquí, probablemente estés mirando una pantalla de inicio de sesión que no puedes superar en una instancia de n8n autoalojada, con un equipo que necesita recuperar el acceso hoy mismo. Antes de ejecutar cualquier comando, ayuda separar dos problemas distintos: no poder iniciar sesión en absoluto, y no poder restablecer una contraseña olvidada porque el restablecimiento autoservicio depende de que el envío de correo funcione. La siguiente lista recorre ambos casos, en el orden en que los comprobaríamos en una instancia compartida de la que también dependen otras personas.

El único paso que nunca nos saltaríamos es hacer una copia de seguridad antes de tocar las cuentas de usuario. La propia documentación de la CLI de n8n describe una exportación de copia de seguridad para flujos de trabajo y credenciales, y por separado describe lo que el comando de restablecimiento de gestión de usuarios hace a las cuentas; ejecutar el comando equivocado primero puede convertir un problema de inicio de sesión en un problema de datos. Creemos firmemente en hacer una copia de seguridad antes de cualquier restablecimiento: es el seguro más barato que comprarás nunca contra una sesión de resolución de problemas que se tuerce.

- [ ] Confirma si alguien puede iniciar sesión, o si solo está roto el restablecimiento autoservicio de contraseña
- [ ] Exporta una copia de seguridad actual de flujos de trabajo y credenciales con la opción de backup de la CLI de n8n
- [ ] Copia la carpeta .n8n o el volumen persistente si autoalojas la instancia
- [ ] Anota tu versión de n8n, el método de instalación (Docker, npm, Proxmox, etc.) y el tipo de base de datos
- [ ] Comprueba si alguien más ya cambió las credenciales del propietario en las últimas horas

Sources: [Use the command line | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/use-the-command-line>), [Back up and restore | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/backup-and-restore>)

## Pasos 1 y 2: comprueba si realmente se trata de un bloqueo de la gestión de usuarios

No todos los reportes de "bloqueo" son un fallo de gestión de usuarios. La documentación oficial de n8n indica que, si nunca se configura SMTP, los usuarios no pueden restablecer sus propias contraseñas, lo cual se ve idéntico a un bloqueo desde fuera. También indica que no existe ninguna forma soportada de desactivar la pantalla de inicio de sesión en versiones recientes de n8n, así que un valor residual de N8N_USER_MANAGEMENT_DISABLED que haya quedado de una guía antigua, una prueba local o un script de migración no hará lo que algunos administradores esperan. Confirma el estado del SMTP y cualquier intento de desactivar el inicio de sesión antes de asumir que la gestión de usuarios en sí se ha roto.

Si el problema es en realidad que la dirección de correo del propietario de la instancia es incorrecta, está desactualizada o es inaccesible, n8n documenta una solución integrada: el propietario puede cambiarse desde Ajustes > Personal, o preconfigurarse mediante variables de entorno, una capacidad disponible desde la versión 2.17.0 de n8n. Aquí importa un límite: el correo del propietario debe ser único, y cambiarlo nunca transfiere la propiedad a otra cuenta existente ni fusiona dos cuentas. Intentar crear un segundo propietario para sortear uno bloqueado no ayudará.

**Situaciones que parecen un bloqueo sin serlo**

| Síntoma | Causa probable | Qué dice la documentación de n8n que hay que comprobar |
| --- | --- | --- |
| Los usuarios no pueden restablecer su propia contraseña | Nunca se configuró el SMTP | El restablecimiento autoservicio de contraseña depende de que el SMTP esté configurado |
| La pantalla de inicio de sesión nunca se comporta como se espera | Se intentó desactivar la pantalla de inicio de sesión | No existe ninguna forma soportada de desactivar la pantalla de inicio de sesión en versiones recientes |
| La cuenta del propietario es inaccesible | Correo del propietario desactualizado o incorrecto | Cámbialo desde Ajustes > Personal o mediante variables de correo del propietario; la propiedad no se puede transferir a otra cuenta existente |

Sources: [User management | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/user-management>), [Change instance owner email | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/change-instance-owner-email>)

## Pasos 3 y 4: ejecutar el comando de restablecimiento de la gestión de usuarios de n8n, y qué hacer si informa de éxito pero sigues bloqueado

![Una secuencia de resolución de problemas para un restablecimiento de la gestión de usuarios de n8n que informa de éxito sin restaurar el acceso.](/blog/es/article-6136ac8c-a74a-4b26-908c-e269bce28a9d/45f30cdce0c409cc2335cec133af4718f3a178d2e77171bf31752c7e061e6730.png)

La secuencia de reinicio y comprobación que suelen seguir los administradores después de que un comando de restablecimiento de la gestión de usuarios de n8n informe de éxito pero el acceso no se restaure.

Cuando nadie puede iniciar sesión y el SMTP no es una opción, la documentación de la CLI de n8n describe un comando dedicado para un restablecimiento de la gestión de usuarios de n8n, user-management:reset, creado exactamente para esto: credenciales olvidadas sin SMTP configurado. Devuelve la gestión de usuarios a su estado previo a la configuración y elimina todas las cuentas de usuario existentes, tras lo cual la instancia debería mostrar de nuevo la pantalla inicial de registro del propietario en la siguiente carga.

En la práctica, varios administradores de instancias autoalojadas han reportado una variante frustrante: el comando muestra un mensaje de éxito, pero la pantalla de inicio de sesión nunca cambia. En un hilo del foro de la comunidad de enero de 2025, dos usuarios de Docker describieron exactamente este patrón tras ejecutar un restablecimiento de la gestión de usuarios de n8n, y uno de ellos, Eric_Shieh, informó de que reiniciar el servidor o el contenedor después hizo que el restablecimiento surtiera efecto. Una entrada de blog personal de abril de 2025 describe el mismo patrón en un servidor de Hetzner: reiniciar lo resolvió, dejando intactos los flujos de trabajo existentes. En nuestra opinión, reiniciar el proceso de n8n antes de seguir investigando vale la pena hacerlo siempre, aunque la propia documentación de n8n no lo incluya como un paso oficial.

![Solucionar un restablecimiento que no responde: 1. Ejecuta el comando de restablecimiento; 2. Reinicia el proceso o el contenedor; 3. Comprueba las advertencias de permisos de archivos; 4. Escala con los detalles completos del entorno](/blog/es/article-6136ac8c-a74a-4b26-908c-e269bce28a9d/d229dfc4211f53f92606e91bbff7eed648ca3efe375cd34e0fc915d383fd3446.png)

Reiniciar no siempre lo soluciona. Un hilo de la comunidad de noviembre de 2025 sobre una instalación alojada en Proxmox describe el mismo mensaje de éxito sin ningún cambio, incluso después de un reinicio y de probar en una ventana privada del navegador; el mismo hilo muestra que la CLI imprime una advertencia de que los permisos del archivo de configuración eran demasiado amplios (0644) antes de terminar. Esa advertencia de permisos no está confirmada como la causa, pero vale la pena comprobarla antes de escalar.

Sources: [Use the command line | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/use-the-command-line>), [CLI command "n8n user-management:reset" - Questions - n8n Community](<https://community.n8n.io/t/cli-command-n8n-user-management-reset/70330>), [Self-hosted n8n password reset | DeepakNess](<https://deepakness.com/raw/n8n-password-reset/>), [N8n user-management:reset not working - Questions - n8n Community](<https://community.n8n.io/t/n8n-user-management-reset-not-working/220112>)

Si tu equipo sigue heredando problemas de acceso como este junto con el resto de una configuración de n8n ya existente, n8n Office Hours / Coaching, uno de los programas de formación impartidos sobre tus propias herramientas, datos e instancia de n8n descritos en nuestra página Para empresas, es la formación práctica en n8n que recomendaríamos a un equipo para resolver juntos problemas reales de administración como los bloqueos. La página se abre en este sitio; las consultas se gestionan a través del enlace de LinkedIn que allí aparece.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Pasos 5 y 6: bloqueos por MFA y la trampa del JWT_SECRET en la gestión de usuarios de n8n

Un restablecimiento completo es la herramienta equivocada para un bloqueo por MFA, ya que elimina todas las cuentas. La documentación de la CLI de n8n describe un comando más limitado, mfa:disable, para un usuario que haya perdido sus códigos de recuperación: desactiva el MFA solo para esa cuenta, tras lo cual puede volver a iniciar sesión y configurar el MFA de nuevo. Úsalo en lugar del restablecimiento completo siempre que el bloqueo se deba específicamente a la pérdida de un dispositivo o códigos de MFA.

Las variables de entorno provocan una clase distinta de bloqueo. La documentación de n8n indica que N8N_INSTANCE_OWNER_PASSWORD_HASH debe ser un hash bcrypt genuino; poner ahí una contraseña en texto plano rompe el inicio de sesión por completo. También documenta [N8N_USER_MANAGEMENT_JWT_SECRET](<https://n8n-challenges.app/es/blog/variables-de-entorno-y-credenciales-de-n8n-checklist-para-una-instancia-compartida>), que permite a un administrador establecer un secreto JWT específico en lugar de dejar que n8n genere uno automáticamente al arrancar. Trataríamos con verdadera precaución el cambiar ese secreto en una instancia en producción: la documentación no indica qué ocurre con las sesiones existentes cuando cambia, así que probarlo primero en un entorno de pruebas es la opción más segura.

**Variables de entorno que pueden romper el inicio de sesión silenciosamente**

| Variable | Requisito | Riesgo si se configura mal |
| --- | --- | --- |
| N8N_INSTANCE_OWNER_PASSWORD_HASH | Debe ser un hash bcrypt genuino | Un valor en texto plano rompe el inicio de sesión por completo |
| N8N_USER_MANAGEMENT_JWT_SECRET | Opcional; n8n genera uno al arrancar si no se define | La documentación no indica el efecto sobre las sesiones existentes cuando cambia |

Sources: [Use the command line | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/use-the-command-line>), [User management and 2FA | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/user-management-and-2fa>)

## Paso 7 y cuándo escalar: restaurar desde una copia de seguridad sin recrear el bloqueo

[Restaurar desde una copia de seguridad](<https://n8n-challenges.app/es/blog/lista-de-comprobacion-para-preparar-n8n-autoalojado-para-produccion>) tiene su propia trampa. La documentación de n8n indica que una exportación de backup de la CLI no incluye a los usuarios ni sus roles, así que importar ese backup en una instancia nueva vuelve a mostrar la pantalla de configuración del propietario en lugar de cualquier cuenta anterior; quien complete esa pantalla primero se convierte en el nuevo propietario. Planifica esto antes de restaurar en una instancia compartida; si varias personas pueden acceder a la instancia restaurada justo después de la importación, decide de antemano quién debe reclamar la propiedad.

La resolución de problemas por cuenta propia tiene un límite razonable. El caso no resuelto de Proxmox descrito antes muestra que algunos métodos de instalación pueden dejar un restablecimiento sin funcionar, sin que exista todavía una solución documentada. Si ya has confirmado el SMTP, probado el restablecimiento, reiniciado y comprobado los permisos, y sigues bloqueado, el siguiente paso es abrir un ticket de soporte o de la comunidad con tu versión exacta, el método de instalación y el tipo de base de datos adjuntos, en lugar de repetir los mismos pasos.

Sources: [Back up and restore | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/backup-and-restore>), [N8n user-management:reset not working - Questions - n8n Community](<https://community.n8n.io/t/n8n-user-management-reset-not-working/220112>)

Solucionar un bloqueo después de que ocurra es mucho más estresante que detectar a tiempo los problemas de configuración que lo provocan. El Workflow Audit, descrito en nuestra página Para empresas, es la forma en que recomendaríamos a un equipo revisar su instancia de n8n, incluida la configuración de la gestión de usuarios y de las variables de entorno, en busca de fiabilidad y seguridad antes de que ocurra el próximo bloqueo, en vez de después. La página se abre en este sitio; las consultas se gestionan a través del enlace de LinkedIn que allí aparece.

**[Audita la configuración de acceso de n8n de tu equipo](https://n8n-challenges.app/es/companies)**

Tags: n8n, Autoalojamiento, Gestión de usuarios, Lista de verificación
