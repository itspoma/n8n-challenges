---
{
  "id": "opp_fec20a20-097e-462f-bbd5-1e4aa1c6f721",
  "locale": "es",
  "slug": "article-fec20a20-097e-462f-bbd5-1e4aa1c6f721",
  "urlSlug": "n8n-code-node-javascript-tutorial-de-depuracion",
  "publishedAt": "2026-09-27T20:10:28.152Z",
  "title": "n8n Code Node JavaScript: tutorial de depuración",
  "subtitle": "Tutorial de JavaScript en el nodo Code de n8n: modos de ejecución, acceso a datos, código async, depuración con console.log y errores de vinculación en producción.",
  "description": "Tutorial de JavaScript en el nodo Code de n8n: modos de ejecución, acceso a datos, código async, depuración con console.log y errores de vinculación en producción.",
  "date": "2026-09-27",
  "sourcesCheckedAt": "2026-09-27T15:15:57.545Z",
  "tags": [
    "n8n",
    "Depuración de flujos de trabajo",
    "Integración de APIs",
    "Tutorial"
  ],
  "coverImage": "/blog/es/article-fec20a20-097e-462f-bbd5-1e4aa1c6f721/3d51a5571b1a4e32d8b0d13826bc38f2d5e436a7bf456653f4a599723c997c1f.png",
  "coverAlt": "Un único globo de prueba bajo una lupa frente a un creciente racimo de globos de producción.",
  "seo": {
    "title": "n8n Code Node JavaScript: tutorial de depuración",
    "description": "Tutorial de JavaScript en el nodo Code de n8n: modos de ejecución, acceso a datos, código async, depuración con console.log y errores de vinculación en producción.",
    "keywords": []
  },
  "revision": "466310537e424e78f1e4c6cb6bb6883e0515c8ef4b04ab9d3444264638e2f9bc"
}
---

## Primeros pasos con JavaScript en el nodo Code de n8n

Un script bien construido en el entorno JavaScript del nodo Code de n8n puede sustituir a varios nodos habituales con unas pocas líneas de lógica, pero los pequeños errores en cómo se cuentan o se devuelven los ítems pueden pasar desapercibidos hasta que el flujo de trabajo se ejecuta con datos reales. Este tutorial cubre cómo configurar un nodo Code, elegir el modo de ejecución adecuado, leer los datos de los ítems de forma segura, manejar código asíncrono y depurar con console.log, y luego qué cambia cuando ese mismo script tiene que ejecutarse contra datos reales de una API en producción.

Para seguir este tutorial necesitas un flujo de trabajo de n8n existente con al menos un nodo que produzca datos de ejemplo, además de un nodo Code colocado después de él y configurado para ejecutarse en modo JavaScript en lugar de Python. Este tutorial asume una familiaridad básica con la adición de nodos al lienzo y la trata como una navegación habitual, no como un paso de depuración. El objetivo a continuación es un pequeño script que lee los datos de los ítems entrantes, los transforma y registra su propio progreso, primero con un ítem de ejemplo y después con una respuesta realista de varios ítems.

Si aún no tienes un espacio de trabajo en n8n, puedes seguir estos pasos del nodo Code en uno nuevo en lugar de una instancia compartida. Este es un enlace de socio que abre la propia página de registro de n8n, no una página de este sitio.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Elige un modo de ejecución y accede a los datos de los ítems

![Dos mesas de trabajo comparan JavaScript en el nodo Code de n8n ejecutándose una vez para todos los ítems frente a una vez por cada ítem.](/blog/es/article-fec20a20-097e-462f-bbd5-1e4aa1c6f721/2fe5b67a6fc81ec5344f285ebe2b51361ac3e4e79a4f4d48d1334400219edb24.png)

Una comparación ilustrativa de los dos modos de ejecución del nodo Code.

El nodo Code ofrece dos modos de ejecución. Run Once for All Items es el predeterminado: el script se ejecuta una sola vez sin importar cuántos ítems lleguen, por lo que debe recorrer la entrada por sí mismo. Run Once for Each Item, en cambio, ejecuta el script por separado para cada ítem, lo que resulta más fácil de razonar mientras el script sigue siendo pequeño.

1. Elige un modo de ejecución: Run Once for All Items o Run Once for Each Item.
2. Accede a los datos de los ítems con $json, $input.item, $input.all() o una referencia a un nodo anterior.
3. Maneja código síncrono o asíncrono, devolviendo una Promise cuando sea necesario.
4. Depura con console.log mientras el script todavía sea pequeño.

Dentro del script, $json es un atajo para los datos JSON del ítem de entrada actual, y $input.item devuelve ese mismo ítem actual de forma explícita. $input.all() devuelve todos los ítems de entrada como un array, que es sobre lo que recorre un script en modo Run Once for All Items. Cuando un script necesita un campo de un nodo anterior en lugar de su entrada inmediata, $('Node Name').item.json obtiene directamente los datos de ese ítem vinculado.

**Atajos para acceder a los datos de los ítems dentro del nodo Code**

| Atajo | Devuelve | Uso típico |
| --- | --- | --- |
| $json | JSON del ítem de entrada actual | Lecturas rápidas dentro de Run Once for Each Item |
| $input.item | El ítem que se está procesando actualmente | Equivalente explícito de $json |
| $input.all() | Array con todos los ítems de entrada | Recorrer ítems en Run Once for All Items |
| $('Node Name').item.json | JSON del ítem vinculado de un nodo anterior | Obtener un campo que no está en el ítem actual |

Sources: [Using the Code node | Build | n8n Docs](<https://docs.n8n.io/build/code-in-n8n/using-the-code-node>), [Reference previous nodes | Build | n8n Docs](<https://docs.n8n.io/build/work-with-data/reference-data/reference-previous-nodes>), [Nodeinputdata | Build | n8n Docs](<https://docs.n8n.io/build/work-with-data/transform-data/expression-reference/nodeinputdata>)

## Maneja código asíncrono y depura con console.log

La mayoría de los scripts de transformación cortos son síncronos, pero el nodo Code también admite JavaScript asíncrono: en lugar de devolver los ítems directamente, un script puede devolver una Promise que n8n espera y resuelve antes de pasar los datos a los siguientes nodos. Esto importa cuando el JavaScript del nodo Code de n8n necesita esperar una operación en lugar de calcular un resultado de inmediato.

[Para depurar](<https://n8n-challenges.app/es/blog/depura-tus-workflows-de-n8n-antes-de-culpar-a-la-integracion>), la propia documentación de n8n menciona console.log como una forma admitida de escribir en la consola desde dentro del nodo Code, útil para comprobar un valor o confirmar que un paso de transformación se ejecutó. Anthony Sidashin, un desarrollador que escribió sobre el uso de n8n desde la perspectiva de un desarrollador, describió este comportamiento a partir de su propia experiencia práctica con el nodo Code.

> “Un console.log que funciona correctamente hace que depurar bloques de código sea aún más agradable.”
>
> — Anthony Sidashin, Developer and founder of ScrapeNinja, a bootstrapped SaaS API for web scraping, writing from a developer's perspective on using n8n (traducido)
>
> Original: “Properly working console.log makes debugging code blocks even more pleasant.” — Fuente: [My experience using n8n, from a developer perspective](<https://pixeljets.com/blog/n8n/>)

Sources: [Using the Code node | Build | n8n Docs](<https://docs.n8n.io/build/code-in-n8n/using-the-code-node>), [My experience using n8n, from a developer perspective](<https://pixeljets.com/blog/n8n/>)

Si tu equipo escribe habitualmente JavaScript personalizado en el nodo Code y necesita depurarlo de forma fiable en conjunto, la página Para empresas de este sitio describe n8n Advanced / Developer Training, un programa diseñado en torno a vuestra propia instancia y datos de n8n.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Resultados esperados y solución de errores comunes del nodo Code

Después de ejecutar el nodo con un ítem de ejemplo, el panel de salida debería mostrar uno o más ítems, cada uno con una clave json, tal como n8n pasa los datos entre nodos: como un array de objetos envueltos en json. Si el valor devuelto por el script no coincide con esa forma, o no devuelve nada, el nodo genera un error de 'no devuelve los ítems correctamente' en lugar de pasar datos incorrectos de forma silenciosa.

Hay algunos otros errores que aparecen repetidamente cuando un script crece más allá de un único ítem de prueba, resumidos a continuación.

**Errores comunes del nodo Code y sus causas**

| Error | Causa probable | Solución |
| --- | --- | --- |
| "No devuelve los ítems correctamente" | El valor devuelto no es un array de objetos envueltos en json | Devuelve un array donde cada ítem tenga una clave json |
| "Cannot find module" | El script importa un paquete npm externo no disponible en esa instancia | Instala y autoriza el módulo en un n8n autoalojado, o evita las importaciones externas en n8n Cloud |
| El nodo Code no puede leer una credencial | Por diseño, los nodos Code no pueden acceder a las credenciales guardadas | Obtén los datos autenticados con un nodo HTTP Request y pasa solo su JSON al nodo Code |

Sources: [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code/common-issues>), [Using the Code node | Build | n8n Docs](<https://docs.n8n.io/build/code-in-n8n/using-the-code-node>)

## De datos de prueba a datos reales de una API en producción

![Hilos conectan cada globo de producción con su ítem original, mostrando la vinculación pairedItem en el nodo Code.](/blog/es/article-fec20a20-097e-462f-bbd5-1e4aa1c6f721/703e5cd6b2039233e0af70a499ff9ec86880f35df3589390cb6594c6013a10ec.png)

Un diagrama conceptual de la vinculación de ítems cuando los datos de producción crean nuevos ítems.

Ejecutar el JavaScript del nodo Code de n8n contra datos reales de una API en producción cambia un supuesto que funcionaba bien con un único ítem de ejemplo: n8n solo gestiona la vinculación de ítems automáticamente cuando hay un único ítem de entrada. Cuando un script procesa una respuesta de la API con varios ítems, o crea ítems nuevos en lugar de pasar los mismos, esa vinculación automática deja de cubrir el resultado, y los nodos posteriores pueden perder el rastro de qué salida procede de qué entrada.

La solución es establecer [pairedItem](<https://n8n-challenges.app/es/blog/rastrear-errores-de-vinculacion-de-items-en-n8n-por-que-falla-item-y-como-solucionarlo>) de forma explícita en cada ítem que devuelve el script, para que los nodos posteriores puedan seguir rastreando un resultado hasta su origen. Los límites de credenciales y módulos mencionados antes importan aún más aquí, ya que los scripts en producción son precisamente donde un equipo recurre a un paquete externo u olvida que las llamadas autenticadas pertenecen al nodo HTTP Request, no al nodo Code.

Sources: [Preserving linking in the Code node | Build | n8n Docs](<https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/preserving-linking-in-the-code-node>)

Si tu equipo ya tiene scripts del nodo Code ejecutándose contra datos de producción y no estás seguro de cuántos dependen del manejo manual de pairedItem o de supuestos ocultos sobre módulos, la página Para empresas de este sitio describe una Workflow Audit, una revisión de vuestra instancia y flujos de trabajo de n8n para mejorar la fiabilidad y la mantenibilidad.

**[Audita tus scripts del nodo Code](https://n8n-challenges.app/es/companies)**

Tags: n8n, Depuración de flujos de trabajo, Integración de APIs, Tutorial
