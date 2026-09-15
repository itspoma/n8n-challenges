---
{
  "id": "opp_630cee15-f31a-4e34-be1c-fb4015601bd9",
  "locale": "es",
  "slug": "article-630cee15-f31a-4e34-be1c-fb4015601bd9",
  "urlSlug": "rastrear-errores-de-vinculacion-de-items-en-n8n-por-que-falla-item-y-como-solucionarlo",
  "title": "Rastrear errores de vinculación de ítems en n8n: por qué falla .item y cómo solucionarlo",
  "subtitle": "Tutorial para principiantes sobre errores de vinculación de ítems en n8n: identifica el error, encuentra el nodo que rompe el hilo y corrígelo con pairedItem.",
  "description": "Tutorial para principiantes sobre errores de vinculación de ítems en n8n: identifica el error, encuentra el nodo que rompe el hilo y corrígelo con pairedItem.",
  "date": "2026-09-15",
  "tags": [
    "n8n",
    "Depuración de flujos",
    "Transformación de datos",
    "Tutorial"
  ],
  "coverImage": "/blog/es/article-630cee15-f31a-4e34-be1c-fb4015601bd9/d5a81b6fdd4d2362525d5fa40bd4ef6ee1c59997958534f439db2788f58ca8f2.png",
  "coverAlt": "Un hilo rosa recorre una fila de carretes, se rompe y se divide en varias hebras, y una mano con pinzas vuelve a atarlo.",
  "seo": {
    "title": "Rastrear errores de vinculación de ítems en n8n: por qué falla .item y cómo solucionarlo",
    "description": "Tutorial para principiantes sobre errores de vinculación de ítems en n8n: identifica el error, encuentra el nodo que rompe el hilo y corrígelo con pairedItem.",
    "keywords": [
      "n8n",
      "Depuración de flujos",
      "Transformación de datos"
    ]
  },
  "revision": "ca121d1a45525ce6f979702b2b26f57cb66ce825ed1045ba7d9ab62ee9a9c2d0"
}
---

## Requisitos previos y objetivo

Necesitarás un flujo de trabajo de varios pasos que se ejecute en tu propio entorno de n8n. Al menos uno de sus nodos debe devolver más de un ítem. También conviene que sepas [mapear datos con expresiones básicas](<https://n8n-challenges.app/es/blog/crea-y-depura-tu-primer-flujo-de-trabajo-de-activador-a-accion-en-n8n>). Una forma de crear una referencia es arrastrar un campo desde el panel INPUT hasta un parámetro del nodo, y n8n escribe la expresión por ti.

Este es el objetivo. Un nodo posterior usa una expresión como $("Some Node").item para leer datos de un nodo que no está justo antes que él, y esa expresión falla. Al terminar, sabrás por qué falló y cómo repararla. Una advertencia: los pasos siguientes se basan en la documentación oficial, no en pruebas propias, y no se indica ninguna versión de n8n. El texto de los mensajes de error y la interfaz pueden ser distintos en tu versión.

Sources: [S5](https://docs.n8n.io/build/work-with-data/reference-data/use-the-ui-mapper), [S1](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/item-linking-errors)

¿Quieres practicar cómo rastrear datos entre nodos? n8n Balloon Challenges ofrece retos prácticos de automatización que construyes en tu propio entorno de n8n, con pistas progresivas si te atascas.

[Explora los retos de n8n](https://n8n-challenges.app/es)

## Cómo vincula n8n los ítems a lo largo de un flujo

Cuando haces referencia a un nodo que no es el inmediatamente anterior al actual, n8n tiene un problema que resolver. Ese nodo anterior puede haber producido muchos ítems, así que n8n debe decidir cuál corresponde al ítem con el que estás trabajando ahora. Para ello sigue un hilo de ítems hacia atrás a través de cada nodo de la cadena.

Cuando un nodo no controla la vinculación por sí mismo, n8n intenta vincular los ítems automáticamente. Si un nodo recibe cierto número de ítems y devuelve el mismo número, n8n los vincula en orden: la primera salida va con la primera entrada, y así sucesivamente. La vinculación automática deja de funcionar en dos casos. El primero, cuando el número de entradas y salidas es diferente. El segundo, cuando un nodo crea ítems completamente nuevos. Un error de .item significa que el hilo está roto o que lleva a más de un ítem anterior.

Sources: [S1](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/item-linking-errors), [S2](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/how-items-link-through-workflows)

## Paso 1: Identifica qué mensaje de error ves

![Comparación de los dos errores de vinculación de ítems, con la causa y la solución sugerida para cada uno.](/blog/es/article-630cee15-f31a-4e34-be1c-fb4015601bd9/8c23bfe48e3a48fdf5013e3e1619f1ff0701de626217fc5345b94e1f27df9bd2.png)

Marco editorial ilustrativo que relaciona cada mensaje de error con su solución.

Antes de editar nada, lee con atención el mensaje de error. Los dos mensajes tienen causas y soluciones distintas. El primero indica que falta información para la expresión. Significa que algún nodo de la cadena no devolvió información de emparejamiento, así que el hilo está roto.

El segundo indica que hay varios ítems coincidentes. Significa que el hilo sigue existiendo, pero lleva a más de un ítem anterior, así que n8n no puede elegir uno. Averigua primero qué mensaje tienes y luego ve al Paso 3a o al Paso 3b. Este simple hábito puede ahorrarte reescribir código que nunca fue el problema.

Sources: [S1](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/item-linking-errors)

## Paso 2: Revisa qué nodos dividen, combinan o crean ítems

![Proceso de recorrer hacia atrás los nodos del flujo, comparando el número de ítems y marcando los nodos que crean o combinan ítems.](/blog/es/article-630cee15-f31a-4e34-be1c-fb4015601bd9/8b51b33c912f080c2d444eb760790c511ed514072786b6073f4cf9ddcd065096.png)

Método de rastreo editorial sugerido, no una función de n8n.

La documentación no describe ninguna herramienta visual para rastrear hilos de ítems, así que este paso es un método que sugerimos nosotros. Empieza en el nodo que muestra el error y avanza hacia atrás hasta el nodo al que hace referencia tu expresión. En cada nodo intermedio, ábrelo y compara cuántos ítems entran con cuántos salen.

Fíjate en tres patrones. El primero, un nodo que devuelve un número de ítems distinto del que recibió. El segundo, [un nodo Code que construye ítems nuevos desde cero](<https://n8n-challenges.app/es/blog/article-b0999045-95ca-4925-b7e8-40f4bfbe4cdb>). El tercero, un nodo de agregación como Summarize, Aggregate o Merge. Los recuentos que no coinciden y los ítems nuevos apuntan al error de información faltante. Los nodos de agregación suelen causar el error de varias coincidencias.

Sources: [S2](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/how-items-link-through-workflows), [S1](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/item-linking-errors)

## Paso 3a: Corrige la información faltante añadiendo pairedItem en nodos Code

Si la ruptura está en un nodo Code, define pairedItem en cada ítem que devuelvas. Su valor debe ser el índice del ítem de entrada que generó el nuevo ítem. Cuando un nodo Code crea ítems nuevos sin pairedItem, n8n no tiene forma de rastrearlos hasta sus ítems de origen.

Como sugerencia para aprender, prueba a crear una pequeña reproducción. Haz un nodo Code que devuelva ítems nuevos sin pairedItem y, más adelante en el flujo, haz referencia a un nodo anterior con .item. Cuando veas aparecer el error, añade pairedItem con el índice de entrada correcto y vuelve a ejecutar el flujo. Este ajuste solo importa cuando el nodo Code recibe más de un ítem, porque la documentación indica que los ítems únicos se vinculan automáticamente.

Si el nodo que rompe el hilo es un [nodo de la comunidad o personalizado](<https://n8n-challenges.app/es/blog/checklist-de-nodos-de-comunidad-de-n8n-evaluar-instalar-probar-y-monitorizar>), no puedes corregirlo desde tu flujo. Según la documentación, su creador tiene que actualizarlo para que devuelva información de emparejamiento.

Sources: [S3](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/preserving-linking-in-the-code-node), [S1](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/item-linking-errors)

## Paso 3b: Corrige las coincidencias múltiples con métodos posicionales

Cuando un nodo de agregación deja el hilo apuntando a varios ítems, tienes algunas opciones. Puedes usar .first() o .last(), o bien .all() con un índice para elegir un ítem concreto. También puedes hacer referencia a otro nodo cuyos ítems sigan correspondiéndose limpiamente con tu ítem actual.

Los métodos posicionales solo funcionan si sabes en qué posición de la lista está el ítem que quieres. Si el orden de los ítems puede cambiar entre ejecuciones, es más seguro corregir la causa raíz o hacer referencia a otro nodo que depender de un índice fijo. Es un consejo editorial nuestro, no una regla de la documentación.

Sources: [S1](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/item-linking-errors)

## Resultados esperados tras la corrección

Vuelve a ejecutar el flujo. La expresión debería resolverse sin ninguno de los dos errores. Abre la salida del nodo y comprueba cada ítem frente a su origen para asegurarte de que tomó los datos correctos. Obtener algún valor no basta, porque podría ser el ítem equivocado.

Si añadiste pairedItem, los nuevos ítems deberían poder rastrearse hasta sus entradas. Si usaste un método posicional, revisa una ejecución en la que cambie el orden, si tus datos lo permiten, para confirmar que sigue eligiendo el ítem que esperas.

Sources: [S3](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/preserving-linking-in-the-code-node), [S1](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/item-linking-errors)

## Solución de problemas

Si sigues viendo el error de información faltante y tus propios nodos parecen correctos, busca nodos de la comunidad o personalizados en la cadena. La corrección tiene que venir de sus creadores. Ten en cuenta también que pairedItem solo importa cuando un nodo Code recibe más de un ítem; n8n vincula automáticamente los ítems únicos.

Si estás escribiendo código y necesitas datos vinculados de un nodo anterior, puedes usar itemMatching dentro del nodo Code. Pásale el índice del ítem de entrada actual y devolverá el ítem correspondiente del nodo anterior. El ejemplo de la documentación usa un conjunto de datos de entrenamiento, así que adapta los nombres de los nodos a tu flujo.

Sources: [S1](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/item-linking-errors), [S3](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/preserving-linking-in-the-code-node), [S4](https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/accessing-linked-items-in-the-code-node)

¿Tu equipo tropieza una y otra vez con problemas de vinculación de ítems y depuración? Puedes contactar con el autor del sitio en LinkedIn para consultar sobre formación de n8n a medida para tu empresa. El enlace abre un perfil de LinkedIn.

[Pregunta por consultoría de n8n en LinkedIn](https://www.linkedin.com/in/rodomansky/)

Tags: n8n, Depuración de flujos, Transformación de datos, Tutorial
