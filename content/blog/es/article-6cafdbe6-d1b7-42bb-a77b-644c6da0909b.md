---
{
  "id": "opp_6cafdbe6-d1b7-42bb-a77b-644c6da0909b",
  "locale": "es",
  "slug": "article-6cafdbe6-d1b7-42bb-a77b-644c6da0909b",
  "urlSlug": "registro-de-gastos-en-n8n-ejercicio-editorial-de-captura-y-revision",
  "publishedAt": "2026-10-23T16:26:04.103Z",
  "title": "Registro de gastos en n8n: ejercicio editorial de captura y revisión",
  "subtitle": "Crea un registro de gastos en n8n en modo de prueba con un formulario, recibos en Google Drive, una hoja compartida y registros sintéticos.",
  "description": "Crea un registro de gastos en n8n en modo de prueba con un formulario, recibos en Google Drive, una hoja compartida y registros sintéticos.",
  "date": "2026-10-23",
  "sourcesCheckedAt": "2026-10-23T16:16:01.645Z",
  "tags": [
    "n8n",
    "Transformación de datos",
    "Aprendizaje práctico",
    "Ejercicio"
  ],
  "coverImage": "/blog/es/article-6cafdbe6-d1b7-42bb-a77b-644c6da0909b/1f1ebec369c593ac165f964ffde0989c3c3db51323b039eea5156fcbb9f8fb4c.webp",
  "coverAlt": "Una bandeja contiene recibos y fichas de monedas mientras una mano mueve un recibo hacia otra bandeja de revisión.",
  "seo": {
    "title": "Registro de gastos en n8n: ejercicio editorial de captura y revisión",
    "description": "Crea un registro de gastos en n8n en modo de prueba con un formulario, recibos en Google Drive, una hoja compartida y registros sintéticos.",
    "keywords": []
  },
  "revision": "0029b7edf6fc837b9955241b804812f91508af5c199a6386da4c9bd5b702e1e1"
}
---

## Ejercicio editorial: define tu registro de gastos en n8n

Crea un registro de gastos en n8n que capture gastos sintéticos, suba recibos ficticios a Google Drive y registre importes y monedas en una hoja de cálculo compartida de Google Sheets. Deriva las entradas marcadas explícitamente como dudosas a una persona responsable de revisarlas y compara después el registro con una pestaña de referencia independiente. Este es un ejercicio editorial: el flujo propuesto no se ha ejecutado ni validado.

Utiliza únicamente la Test URL de Form Trigger. La configuración de credenciales, el despliegue en producción, el OCR, la conversión de divisas, las aprobaciones automáticas y la conciliación bancaria quedan fuera del alcance. Este ejercicio no acredita el cumplimiento contable, fiscal o normativo, la seguridad de las transacciones, la prevención de duplicados ni una recuperación fiable ante fallos parciales.

Creemos que un proyecto práctico de finanzas útil debe hacer visible la incertidumbre antes de intentar automatizar más decisiones.

Sources: [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md>)

¿Necesitas un espacio de trabajo para este ejercicio? Nuestro enlace de partner abre la página de registro de n8n, donde puedes registrarte en n8n Cloud.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Prepara el espacio de trabajo y los datos sintéticos de entrada

Necesitas un espacio de trabajo de n8n existente, credenciales configuradas de Google Drive y Google Sheets, una carpeta de Drive exclusiva para prácticas y una hoja de cálculo compartida contigo y con la persona designada para revisar los gastos. Prepara archivos de recibos ficticios. La documentación suministrada no tiene fecha ni acredita la compatibilidad con todas las versiones instaladas; comprueba las operaciones disponibles antes de empezar.

Utiliza estas columnas sugeridas para el registro: expense_id, amount, currency, receipt_file_id, review_required, review_owner y review_status. Mantén separados los importes y las monedas, y nunca combines distintas monedas en un único total de gastos. Estos campos y la política de revisión son decisiones de diseño editoriales.

Crea una pestaña de referencia independiente que contenga únicamente expense_id, amount y currency. El siguiente conjunto de datos sintéticos incluye deliberadamente registros coincidentes, modificados, ausentes y adicionales. Todas las monedas son EUR; proporciona un recibo ficticio por cada gasto enviado.

**Conjunto de datos sintéticos sugerido; los importes son datos de entrada del ejercicio, no resultados medidos.**

| ID del gasto | Importe de referencia | Importe que enviar | ¿Dudoso? |
| --- | --- | --- | --- |
| EXP-01 | 12,50 | 12,50 | No |
| EXP-02 | 8,00 | 9,00 | Sí |
| EXP-03 | 5,00 | No enviar | No procede |
| EXP-04 | Ausente | 7,00 | No |

Sources: [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md>)

## Crea la ruta de captura y revisión manual

![Una ficha, una carpeta de recibos y un libro de registro con una marca representan la ruta de captura y revisión del registro de gastos en n8n.](/blog/es/article-6cafdbe6-d1b7-42bb-a77b-644c6da0909b/a3f70059934778ce574b8cc6d6dc95d80a70a8f5d5a39ab047c57ea60de78b28.webp)

Los objetos representan el envío, el almacenamiento del recibo y un registro revisable en una hoja de cálculo.

Form Trigger admite elementos File y Number y pasa los datos enviados al flujo. Google Drive documenta la subida de una entrada binaria a una carpeta elegida, mientras que Google Sheets admite Append Row con asignación manual de columnas. Sigue esta secuencia de creación sugerida.

1. Crea campos de formulario para expense_id, un amount numérico, currency, la subida del recibo y una selección explícita de incertidumbre.
2. Selecciona Execute Workflow y envía los datos mediante la Test URL; inspecciona la salida para encontrar el campo binario real del recibo.
3. Configura Upload de Google Drive con tus credenciales, ese campo binario y la carpeta de prácticas.
4. Conserva los valores del gasto enviado junto con el identificador de archivo devuelto para las rutas que escriben las filas.
5. Asigna manualmente cada valor del gasto, receipt_file_id y los campos de revisión en Append Row de Google Sheets.

Utiliza comparaciones de If para la selección explícita de incertidumbre. En la rama de entradas dudosas, establece review_required en true, review_owner en el nombre de la persona designada y review_status en pending antes de añadir la fila. En la otra rama, utiliza false, un responsable en blanco y not_requested. Estas son etiquetas sugeridas, no una política financiera validada.

Pide a la persona revisora que inspeccione las entradas pendientes y actualice su estado manualmente en la hoja. Comprueba el acceso a los recibos por separado: compartir la hoja de cálculo no concede acceso a los recibos. Google Drive permite añadir permisos para usuarios o grupos específicos.

Sources: [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md>), [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.if.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.if.md>)

¿Diriges un equipo que está aprendiendo a crear flujos de captura, asignación de campos y revisión manual? Nuestro programa n8n Corporate Fundamentals ofrece formación personalizada con las herramientas, los datos y la instancia de n8n de tu equipo. Este enlace abre la página Para empresas de este sitio.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Compara tu registro de gastos en n8n con la referencia

![Dos pilas de fichas de gastos muestran registros coincidentes, modificados y sin correspondencia en el registro y la referencia.](/blog/es/article-6cafdbe6-d1b7-42bb-a77b-644c6da0909b/b4f367563eab31e9179d5d9375d99059c34873bfc74f885952edd8eface6e91d.webp)

Las fichas emparejadas y sin correspondencia ilustran los casos de comparación sintéticos.

Lee ambas pestañas mediante Get Row(s) de Google Sheets, sin filtros. Prepara las dos entradas de comparación con solo expense_id, amount y currency, utilizando tipos de campo coincidentes. Excluye los identificadores de recibos y los metadatos de revisión para que no generen diferencias irrelevantes.

La implementación del repositorio suministrado declara las versiones 1, 2, 2.1, 2.2 y 2.3 del nodo Compare Datasets, campos de coincidencia y cuatro salidas de comparación.

Para esta solución sugerida, conecta el registro de prácticas como entrada A y la referencia como entrada B, utilizando expense_id como campo de coincidencia. El conjunto de datos debería producir EXP-01 en Same, EXP-02 en Different, EXP-03 en In B only y EXP-04 en In A only. Explica cada discrepancia antes de corregirla y volver a ejecutar la comparación.

Sources: [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md>), [n8n/packages/nodes-base/nodes/CompareDatasets/CompareDatasets.node.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/CompareDatasets/CompareDatasets.node.ts>)

## Comprueba la finalización y diagnostica las discrepancias

Tu registro de gastos en n8n solo estará completo para este ejercicio cuando observes las comprobaciones siguientes. Vacía el registro de prácticas entre ejecuciones completas de captura.

- [ ] Los importes y las monedas enviados se conservan en el registro.
- [ ] La persona designada para la revisión puede abrir cada recibo subido.
- [ ] Las entradas dudosas tienen un responsable identificado y el estado pending antes de la revisión.
- [ ] Los registros sin cambios, modificados, ausentes y adicionales llegan a las salidas esperadas.

Si falla alguna comprobación, inspecciona primero el campo binario enviado y el destino de subida, y después las asignaciones manuales de columnas. Comprueba los permisos de los recibos como persona revisora. Para las discrepancias de comparación, inspecciona los identificadores de coincidencia y los tipos de campo de ambas entradas.

Sources: [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md>), [n8n/packages/nodes-base/nodes/CompareDatasets/CompareDatasets.node.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/CompareDatasets/CompareDatasets.node.ts>)

## Reflexiona antes de reutilizar una plantilla de registro de gastos en n8n

Trata este diseño como una especificación de práctica al evaluar una plantilla de registro de gastos en n8n. Preguntas de reflexión sugeridas: ¿quién asume la revisión cuando la persona responsable está ausente? ¿Quién debería acceder a los recibos? ¿Cómo se gestionarían los envíos duplicados y una subida seguida de un fallo al añadir la fila?

En nuestra opinión, un equipo debe acordar las [reglas de responsabilidad y recuperación](<https://n8n-challenges.app/es/blog/buenas-practicas-de-workflows-en-n8n-para-equipos-de-la-practica-a-produccion>) antes de conectar un flujo de prácticas con información financiera real.

Obtén ayuda práctica para revisar el acceso a los recibos, las responsabilidades de revisión y la mantenibilidad de los flujos de tu equipo con nuestro Workflow Audit. Revisamos vuestra instancia de n8n y vuestros flujos para evaluar su fiabilidad, seguridad y mantenibilidad; este enlace abre la página Para empresas de este sitio.

**[Audita vuestros flujos de gastos](https://n8n-challenges.app/es/companies)**

Tags: n8n, Transformación de datos, Aprendizaje práctico, Ejercicio
