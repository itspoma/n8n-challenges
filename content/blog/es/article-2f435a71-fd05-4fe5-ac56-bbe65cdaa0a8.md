---
{
  "id": "opp_2f435a71-fd05-4fe5-ac56-bbe65cdaa0a8",
  "locale": "es",
  "slug": "article-2f435a71-fd05-4fe5-ac56-bbe65cdaa0a8",
  "urlSlug": "n8n-paginacion-con-loop-over-items-depurar-extracciones-paginadas-de-api",
  "publishedAt": "2026-09-27T09:05:15.791Z",
  "title": "n8n Paginación con Loop Over Items: depurar extracciones paginadas de API",
  "subtitle": "Tutorial práctico sobre paginación con Loop Over Items en n8n: revisa la paginación integrada, crea un patrón manual y depura páginas omitidas o bucles infinitos.",
  "description": "Tutorial práctico sobre paginación con Loop Over Items en n8n: revisa la paginación integrada, crea un patrón manual y depura páginas omitidas o bucles infinitos.",
  "date": "2026-09-27",
  "sourcesCheckedAt": "2026-09-27T08:38:36.333Z",
  "tags": [
    "n8n",
    "Integración de APIs",
    "Depuración de flujos de trabajo",
    "Tutorial"
  ],
  "coverImage": "/blog/es/article-2f435a71-fd05-4fe5-ac56-bbe65cdaa0a8/c481844ae0dcb33a13908d94c557d1270b9183f0f3f5d99a7a7e50a717c7043a.png",
  "coverAlt": "Una mano mueve fichas numeradas de páginas alrededor de una pista circular hacia una puerta de salida abierta.",
  "seo": {
    "title": "n8n Paginación con Loop Over Items: depurar extracciones paginadas de API",
    "description": "Tutorial práctico sobre paginación con Loop Over Items en n8n: revisa la paginación integrada, crea un patrón manual y depura páginas omitidas o bucles infinitos.",
    "keywords": []
  },
  "revision": "adb016a997faa857600ee0046b0ad0431eaef98b698784129053d6e2bf2ef7ac"
}
---

## Requisitos previos y el objetivo: paginación con Loop Over Items en n8n en la práctica

La paginación con Loop Over Items en n8n aparece como un problema recurrente para los desarrolladores que integran APIs que no devuelven todo en una sola respuesta. Este tutorial explica cómo construir una extracción paginada fiable, usando el nodo Loop Over Items de n8n cuando la paginación integrada del nodo HTTP Request no encaja, y explica por qué se omiten páginas o el bucle se queda atrapado para siempre.

Antes de empezar, deberías sentirte cómodo creando y ejecutando un flujo de trabajo en n8n, conectando nodos entre sí y leyendo sus datos de salida. También necesitas conocer el estilo de paginación de tu API objetivo: un cursor, una URL de la siguiente página o un simple número de página que incrementas tú mismo. La propia documentación de n8n señala que el nodo HTTP Request no pagina automáticamente; cuando una llamada devuelve resultados paginados, es el propio flujo de trabajo el que debe crear un bucle para recorrer cada página.

Sources: [Loop | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/loop>)

Si todavía no tienes un espacio de trabajo de n8n para probar este patrón de paginación, puedes registrarte en n8n Cloud a través de este enlace de socio, que abre la página de registro propia de n8n, y seguir el tutorial con tu propia API paginada.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Paso 1: comprueba si la paginación integrada ya cubre tu API

Antes de construir nada manual, abre las opciones de Pagination del nodo HTTP Request. n8n documenta dos modos integrados: Response Contains Next URL, que sigue un enlace a la siguiente página devuelto por la API, y Update a Parameter in Each Request, que te permite incrementar un número de página o un offset en cada llamada.

Para la paginación por número de página, n8n expone una variable de expresión, $pageCount, que empieza en cero y cuenta cuántas páginas ya ha obtenido el nodo, de modo que puedes usarla para calcular el siguiente número de página sin añadir ningún nodo de bucle adicional.

Una respuesta de la comunidad en el foro de n8n señaló que, una vez configurado correctamente este mecanismo de paginación integrado, puede eliminar por completo la necesidad de un bucle manual, así que vale la pena probarlo primero aunque la documentación de tu API parezca poco habitual.

Sources: [Pagination | Build | n8n Docs](<https://docs.n8n.io/build/code-in-n8n/cookbook/http-request-node/pagination>), [Loop Over Items Bug? - #4 by ihortom - Questions - n8n Community](<https://community.n8n.io/t/loop-over-items-bug/62982/4>)

## Pasos 2 y 3: construir un patrón manual con Loop Over Items

![Muestra el patrón de paginación con Loop Over Items en n8n moviendo una página a través de una comprobación de puerta de salida.](/blog/es/article-2f435a71-fd05-4fe5-ac56-bbe65cdaa0a8/cbab9be67cd95eeef13556cc3a0ae041ee581e4c3222116dd77d3943914b2a48.png)

Una secuencia ilustrativa de obtener una página, comprobar una condición de salida, y repetir el bucle o salir.

Algunas APIs paginan de una forma que no encaja en ninguno de los dos modos integrados, por ejemplo cuando el token de página tiene que vivir dentro de una estructura JSON concreta en el cuerpo, en lugar de en un parámetro de URL. Aquí es exactamente donde entra la paginación manual con Loop Over Items en n8n: la documentación de n8n describe cómo manejarla con un nodo Loop Over Items que tiene habilitada su opción Reset, junto con un nodo IF que evalúa una condición de salida clara en cada pasada.

El patrón general sigue una breve secuencia de pasos:

1. Obtener una página: llama a la API para la página actual dentro del cuerpo del bucle con un nodo HTTP Request.
2. Transportar el estado de la página: pasa el siguiente token de página o número de página como datos del elemento del bucle para que la siguiente iteración sepa dónde continuar.
3. Comprobar la condición de salida: usa un nodo IF para verificar si la API señaló una última página, como un array de resultados vacío o un token siguiente ausente.
4. Reiniciar y repetir, o salir: vuelve a dirigir hacia el bucle con reset habilitado mientras queden más páginas, o deja que la salida done del bucle se active una vez que la condición de salida sea verdadera.

Acertar con esa condición de salida importa más de lo que parece: consulta más abajo «Solución de problemas: bucles infinitos y finalización prematura» para ver qué ocurre cuando nunca se cumple.

Sources: [Loop Over Items (Split in Batches) | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches>)

Enseñar a todo un equipo a construir y depurar extracciones paginadas de forma consistente, en lugar de que cada desarrollador improvise su propio bucle, es justo para lo que está pensada una sesión de n8n Advanced / Developer Training en este sitio, impartida sobre vuestra propia instancia y datos de n8n. El enlace abre una página de este sitio que describe el programa.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Resultados esperados: cada página obtenida una vez, el bucle sale por done

Cuando el patrón está conectado correctamente, cada iteración debería obtener exactamente una página nueva, y el bucle debería seguir volviendo a entrar en su cuerpo hasta que se cumpla la condición de salida del nodo IF. En ese momento, la ejecución debería salir por la salida done del bucle exactamente una vez, habiendo tocado cada página una sola vez.

Si estás probando esto por primera vez, ejecutar el flujo de trabajo manualmente con un tamaño de página pequeño facilita observar cada iteración en [el registro de ejecución](<https://n8n-challenges.app/es/blog/lista-de-comprobacion-para-probar-workflows-de-n8n-que-verificar-antes-de-usarlos-de-verdad>) antes de apuntar el bucle a un conjunto de datos de producción completo.

Sources: [Loop Over Items (Split in Batches) | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches>)

## Solución de problemas: páginas omitidas o saltadas

![Páginas apiladas ordenadamente junto a páginas mezcladas y superpuestas ilustran un bucle reiniciado frente a uno con páginas omitidas.](/blog/es/article-2f435a71-fd05-4fe5-ac56-bbe65cdaa0a8/701415d212dbdff6bd2db41aec641353a31ad44abd69702c7de95d9bb5363eac.png)

Una comparación conceptual entre un bucle reiniciado correctamente y uno que pierde o mezcla páginas.

Las páginas omitidas suelen ser un problema de reset. Un miembro de la comunidad informó de que un segundo lote de elementos no iteraba correctamente hasta que se reiniciaba el nodo Loop Over Items, lo que significa que el ajuste de reset importaba tanto para la corrección como para el propio bucle.

En un flujo de trabajo real reportado que extraía datos de una API de viajes paginada, un nodo Loop Over Items interno que gestionaba la segunda página activó inmediatamente su rama done, por lo que los elementos de esa página nunca se procesaron, en la versión 1.107.4 de n8n.

Otro informe de error de la comunidad describía el síntoma opuesto: sin el reset configurado correctamente, los elementos de páginas anteriores y posteriores se emitían todos juntos a través de la rama done solo después de que terminara el primer lote, en lugar de página por página. Se trata de informes individuales del foro, no de una guía oficial de solución de problemas, así que hay que tratarlos como patrones a comprobar y no como causas garantizadas.

Sources: [Loop Over Items Bug? - #4 by ihortom - Questions - n8n Community](<https://community.n8n.io/t/loop-over-items-bug/62982/4>), [Loop Over Items : “done” branch triggered too early when iterating paginated API - Questions - n8n Community](<https://community.n8n.io/t/loop-over-items-done-branch-triggered-too-early-when-iterating-paginated-api/175436>), [Reset loop over items expression - Help me Build my Workflow - n8n Community](<https://community.n8n.io/t/reset-loop-over-items-expression/125742>)

## Solución de problemas: bucles infinitos y finalización prematura

La propia documentación de n8n advierte de que una condición de salida del nodo IF que nunca se cumple dejará el flujo de trabajo atrapado en un bucle para siempre, así que lo primero que hay que comprobar en un bucle descontrolado es si esa condición puede llegar a ser verdadera frente a las respuestas reales de la API.

Explicaciones más antiguas de la comunidad, de 2024 y señaladas aquí como de más de dos años de antigüedad, describían otras dos causas que vale la pena comprobar, aunque puede que no reflejen la implementación actual de Loop Over Items: un bucle que termina prematuramente porque el último nodo dentro de él devolvió un valor vacío o ausente en alguna iteración, y un bucle anidado que se rompe porque comparte el contador de índice de ejecución del flujo de trabajo con un bucle externo construido conectando manualmente un nodo de vuelta a uno anterior.

Como el comportamiento de Loop Over Items en n8n puede cambiar entre versiones, hacer bien la paginación con Loop Over Items en tu versión concreta significa confirmar cada uno de estos puntos en tu propia instalación antes de asumir que una solución del foro sigue siendo válida.

Sources: [Loop Over Items (Split in Batches) | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches>), [Challenge understanding the Loop Over Items and how it works - Questions - n8n Community](<https://community.n8n.io/t/challenge-understanding-the-loop-over-items-and-how-it-works/53712>), [Issue in API Pagination with Loops - #6 by barn4k - Questions - n8n Community](<https://community.n8n.io/t/issue-in-api-pagination-with-loops/45821/6>)

Si tu equipo ya tiene flujos de trabajo paginados en producción y no estás seguro de cuáles están omitiendo páginas en silencio o quedándose en bucle sin salida, una Workflow Audit en este sitio revisa la instancia y los flujos de n8n de vuestro equipo precisamente en busca de este tipo de riesgo de fiabilidad. El enlace abre una página de este sitio que describe el programa.

**[Audita la paginación de tus flujos](https://n8n-challenges.app/es/companies)**

Tags: n8n, Integración de APIs, Depuración de flujos de trabajo, Tutorial
