---
{
  "id": "opp_2a67dfad-d284-4dff-9b3b-6bce3adb6c9f",
  "locale": "es",
  "slug": "article-2a67dfad-d284-4dff-9b3b-6bce3adb6c9f",
  "urlSlug": "copia-de-seguridad-y-restauracion-de-n8n-un-ejercicio-de-recuperacion-aislada",
  "publishedAt": "2026-10-16T08:57:41.855Z",
  "title": "Copia de seguridad y restauración de n8n: un ejercicio de recuperación aislada",
  "subtitle": "Practica la copia de seguridad y restauración de n8n con SQLite y la misma versión, comprobando inventario, credenciales y archivos en un destino aislado.",
  "description": "Practica la copia de seguridad y restauración de n8n con SQLite y la misma versión, comprobando inventario, credenciales y archivos en un destino aislado.",
  "date": "2026-10-16",
  "sourcesCheckedAt": "2026-10-16T08:46:15.946Z",
  "tags": [
    "Autoalojamiento",
    "Preparación para producción",
    "Ejercicio"
  ],
  "coverImage": "/blog/es/article-2a67dfad-d284-4dff-9b3b-6bce3adb6c9f/db5dde646a6e1f30fa3b0c3b32117383c8ffb713cd728169a85a59d8f270c961.webp",
  "coverAlt": "Un maletín de recuperación contiene piezas de automatización y una llave junto a un banco de trabajo aislado para la copia de seguridad y restauración de n8n.",
  "seo": {
    "title": "Copia de seguridad y restauración de n8n: un ejercicio de recuperación aislada",
    "description": "Practica la copia de seguridad y restauración de n8n con SQLite y la misma versión, comprobando inventario, credenciales y archivos en un destino aislado.",
    "keywords": []
  },
  "revision": "f2dfb194891dc74a5551d389bdb1a2b9a552b7c4dfd8e1e46d984679bfb59080"
}
---

## Tu tarea de copia de seguridad y restauración de n8n

![Un destino aislado de recuperación de n8n se conecta únicamente a un servicio de prueba, separado de producción por una barrera.](/blog/es/article-2a67dfad-d284-4dff-9b3b-6bce3adb6c9f/d5cbfec9891f8c898e69180a036dfb114c724f52459102b4e08fb4da445e3cec.webp)

El recinto ilustra el aislamiento requerido por el ejercicio y el acceso al servicio de prueba designado.

Este ejercicio editorial te propone ensayar la copia de seguridad y restauración de n8n: recuperar una instancia detenida en un destino independiente y comprobar después su inventario, una credencial de prueba almacenada y los archivos necesarios. El procedimiento propuesto no se ha ejecutado ni validado.

El procedimiento se limita a una única instancia autoalojada con SQLite y utiliza los controles de publicación y despublicación documentados para n8n 2.0. Los comandos de restauración de PostgreSQL, la recuperación de colas, la configuración de almacenamiento externo y las migraciones entre versiones quedan fuera de este ejercicio. n8n documenta que el arranque aplica las migraciones pendientes de la base de datos; usar versiones idénticas es una condición del ejercicio, no una garantía de compatibilidad. La documentación oficial citada no tiene fecha y refleja su estado en el momento de la consulta; las fechas de consulta que aparecen con las citas no son fechas de publicación.

Empieza únicamente con un destino preparado por un administrador que cumpla los requisitos siguientes. El aislamiento de red depende de tu infraestructura; su implementación queda fuera de la documentación proporcionada. Creemos que practicar la recuperación resulta más útil cuando el aislamiento es un requisito previo, en lugar de algo que los participantes deban improvisar.

- [ ] Utiliza almacenamiento independiente para el destino y la versión exacta de n8n de la instancia de origen.
- [ ] Impide el tráfico entrante desde producción y bloquea el acceso saliente a producción.
- [ ] Permite únicamente el servicio de prueba designado para la verificación de red.
- [ ] Prepara el acceso a la copia de seguridad, la configuración del despliegue y la clave de cifrado original.

Sources: [n8n-docs/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/use-the-command-line.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/use-the-command-line.md>), [n8n/.agents/skills/db-migrations/SKILL.md at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/.agents/skills/db-migrations/SKILL.md>)

## Prepara el flujo de prueba y el inventario de la copia de seguridad

![Una bandeja contiene la carpeta, la clave de cifrado, la configuración y las dependencias de una copia de seguridad de n8n.](/blog/es/article-2a67dfad-d284-4dff-9b3b-6bce3adb6c9f/35322712a09acec4abb4034a05ef00df4020d3c8985e8dcba67491b0eec8b584.webp)

Los objetos separados ilustran los elementos que un administrador inventaría antes de realizar la copia.

Antes de detener el origen, prepara un flujo de trabajo inocuo que utilice un nodo HTTP Request con una credencial almacenada para un servicio de prueba proporcionado por un administrador. Selecciona explícitamente su modo de autenticación y su credencial. Define la respuesta esperada y comprueba que se rechacen las solicitudes sin autenticar. Estos son datos de entrada propuestos para el ejercicio, no un instrumento de prueba validado.

Registra los inventarios de flujos de trabajo y usuarios, la versión de n8n, las rutas de almacenamiento y la configuración del despliegue. Si el ejercicio incluye datos del sistema de archivos, elige un archivo conocido y registra su contenido esperado. Utiliza el inventario siguiente para distinguir la copia de seguridad de SQLite del procedimiento de los elementos adicionales que pueda necesitar tu despliegue.

**Inventario de la copia de seguridad basado en la documentación de n8n para instalaciones autoalojadas**

| Elemento | Qué conservar | Alcance del ejercicio |
| --- | --- | --- |
| .n8n folder | Carpeta completa, incluidos los datos de SQLite predeterminados | Incluido en el procedimiento |
| Clave de cifrado | Configuración original o N8N_ENCRYPTION_KEY con el mismo valor | Necesaria para las credenciales |
| Configuración del despliegue | Configuración necesaria para recrear el despliegue | Dato de entrada obligatorio |
| Almacenamiento adicional | Ubicaciones configuradas para almacenar datos binarios y ejecuciones | Incluir si está configurado |
| Nodos personalizados | Directorios necesarios de nodos personalizados | Incluir si están configurados |
| Base de datos PostgreSQL | Copia de seguridad de la base de datos junto con los demás elementos | Fuera del procedimiento |

n8n documenta que las exportaciones de flujos de trabajo y credenciales mediante la CLI omiten usuarios, roles, historial de ejecuciones, variables y ajustes de la instancia. Considera esas exportaciones un elemento parcial, no un sustituto de la copia de seguridad de la instancia.

Sources: [n8n-docs/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md>), [skills/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md>)

## Copia y restaura la instancia detenida

![Una máquina de n8n detenida, un maletín de archivo y un destino de recuperación dentro de un recinto muestran la secuencia de restauración.](/blog/es/article-2a67dfad-d284-4dff-9b3b-6bce3adb6c9f/bef2ad9040a58191bba5ad8942399288b255f1c5c5b324c4ee7f1a79ee34b1c8.webp)

La secuencia ilustra el traslado de los elementos de una instancia detenida al destino preparado para la recuperación.

Sigue esta secuencia propuesta para el ensayo de copia de seguridad y restauración de n8n.

1. Detén la instancia de n8n de origen antes de copiar SQLite y la carpeta .n8n.
2. Copia la carpeta de usuario completa y conserva las rutas adicionales inventariadas, los directorios de nodos personalizados, la configuración del despliegue y la clave de cifrado.
3. Restaura esos elementos en el destino detenido y previamente aislado, utilizando almacenamiento independiente para el destino.
4. Restaura la configuración del despliegue, adaptando las rutas y direcciones del destino y conservando la misma clave de cifrado.
5. Con la CLI configurada para utilizar la base de datos restaurada del destino, ejecuta n8n unpublish:workflow --all antes de iniciar el destino.
6. Inicia el destino aislado y realiza las comprobaciones de verificación seleccionadas.

En el modelo de publicación y despublicación de n8n 2.0, despublicar es un control adicional para el arranque: no proporciona aislamiento de red ni impide la ejecución manual deliberada. La documentación de la CLI también advierte de que importar flujos de trabajo que estaban activos en instancias sin configuración multi-main puede dejar los disparadores cron en ejecución hasta que se reinicie la instancia, por lo que desactivarlos durante la importación no sustituye al aislamiento.

No utilices exportaciones de credenciales descifradas en este ejercicio: exponen los secretos en texto plano.

Sources: [n8n-docs/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md>), [n8n-docs/docs/deploy/host-n8n/configure-n8n/use-the-command-line.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/configure-n8n/use-the-command-line.md>)

¿Diriges un equipo que practica procedimientos de recuperación? Nuestro programa n8n Advanced / Developer Training ayuda a los equipos a trabajar con credenciales y arquitectura utilizando sus propias herramientas, datos e instancia de n8n. El enlace abre la página Para empresas de este sitio.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Comprueba la recuperación y diagnostica los fallos

![Los elementos de referencia y los restaurados de n8n aparecen uno junto al otro mientras se comprueba una llave en una cerradura de prueba.](/blog/es/article-2a67dfad-d284-4dff-9b3b-6bce3adb6c9f/760d8afed2a1731519f04f2702af4710ae04e51ad54c6aa5a0418371a77f82bf.webp)

La comparación de los elementos y la comprobación de la llave de prueba ilustran las verificaciones de recuperación seleccionadas para el ejercicio.

Utiliza los siguientes criterios editoriales de finalización para evaluar la instancia recuperada. En nuestra opinión, ver el lienzo de un flujo de trabajo no basta para dar por terminado el ejercicio; este debería exigir pruebas de que los elementos restaurados se pueden utilizar realmente.

- [ ] Compara los flujos de trabajo y usuarios restaurados con el inventario registrado, teniendo en cuenta la despublicación deliberada.
- [ ] Ejecuta manualmente el flujo de prueba inocuo con su credencial de prueba restaurada, sin volver a introducir el secreto.
- [ ] Confirma que el servicio de prueba autentica la solicitud y devuelve la respuesta definida.
- [ ] Lee el archivo conocido y compara su contenido, si el ejercicio incluye datos del sistema de archivos.
- [ ] Registra por separado las pruebas de cada comprobación y cada fallo.

Si falla la autenticación, comprueba la [clave de cifrado original](<https://n8n-challenges.app/es/blog/variables-de-entorno-y-credenciales-de-n8n-checklist-para-una-instancia-compartida>), el modo de autenticación de HTTP Request, el tipo de credencial y la credencial seleccionada. n8n documenta que una credencial puede ignorarse cuando la autenticación no está habilitada. Si faltan archivos o nodos, compara las ubicaciones restauradas y los directorios de nodos personalizados con tu inventario antes de modificar el flujo de trabajo.

Sources: [n8n-docs/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/deploy/host-n8n/keep-n8n-running/backup-and-restore.md>), [skills/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md at main · n8n-io/skills · GitHub](<https://github.com/n8n-io/skills/blob/main/skills/n8n-credentials-and-security-official/references/HTTP_REQUEST_WITH_AUTH.md>)

## Registra qué demuestra el ensayo

Termina tu ejercicio de copia de seguridad y restauración de n8n con un registro de recuperación: identificación de la copia de seguridad, versión de origen, rutas restauradas, resultados de las comprobaciones y fallos pendientes de resolver. Completar el ejercicio demuestra únicamente las comprobaciones seleccionadas; no acredita la cobertura de todos los flujos de trabajo, credenciales o dependencias externas.

Reflexión propuesta: ¿qué elemento ausente impediría a otro administrador repetir la recuperación? Una respuesta útil identifica el elemento, dónde debe figurar en el procedimiento de copia de seguridad y cómo se comprobará en el próximo ensayo. Actualiza ese procedimiento antes de dar por terminado el ejercicio.

Obtén ayuda práctica para revisar la configuración de recuperación de tu equipo con nuestro programa Workflow Audit, que revisa vuestra instancia de n8n y vuestros flujos de trabajo en cuanto a fiabilidad, seguridad y mantenibilidad. El enlace abre la página Para empresas de este sitio, que describe programas realizados con vuestras propias herramientas, datos e instancia de n8n.

**[Evalúa vuestra capacidad de recuperación](https://n8n-challenges.app/es/companies)**

Tags: Autoalojamiento, Preparación para producción, Ejercicio
