---
{
  "id": "opp_ac9d26c4-8b42-4332-9b67-ffed8e320b2d",
  "locale": "es",
  "slug": "article-ac9d26c4-8b42-4332-9b67-ffed8e320b2d",
  "urlSlug": "nodo-merge-de-n8n-combina-dos-ramas-sin-duplicados",
  "publishedAt": "2026-09-28T21:18:17.009Z",
  "title": "Nodo Merge de n8n: combina dos ramas sin duplicados",
  "subtitle": "Un tutorial sobre el nodo Merge de n8n para combinar dos ramas sin elementos duplicados ni faltantes, cubriendo campos coincidentes y colisiones de campos.",
  "description": "Un tutorial sobre el nodo Merge de n8n para combinar dos ramas sin elementos duplicados ni faltantes, cubriendo campos coincidentes y colisiones de campos.",
  "date": "2026-09-28",
  "sourcesCheckedAt": "2026-09-28T21:02:23.217Z",
  "tags": [
    "n8n",
    "Transformación de datos",
    "Depuración de flujos de trabajo",
    "Tutorial"
  ],
  "coverImage": "/blog/es/article-ac9d26c4-8b42-4332-9b67-ffed8e320b2d/f1a8447071e83a6dfdbd57cb9e382ffdb54ae3e7b76ea2aa152b988cae493f22.png",
  "coverAlt": "Una mano alinea dos flujos de tarjetas de papel en un solo canal, representando el nodo Merge de n8n combinando ramas.",
  "seo": {
    "title": "Nodo Merge de n8n: combina dos ramas sin duplicados",
    "description": "Un tutorial sobre el nodo Merge de n8n para combinar dos ramas sin elementos duplicados ni faltantes, cubriendo campos coincidentes y colisiones de campos.",
    "keywords": []
  },
  "revision": "940870171708592a6940221f83feed07196c4ecdfa2e9e3acda3da68c50b31d4"
}
---

## Requisitos previos: qué necesitas antes de combinar dos ramas

[Antes de conectar dos ramas en una sola](<https://n8n-challenges.app/es/blog/lista-de-comprobacion-para-probar-workflows-de-n8n-que-verificar-antes-de-usarlos-de-verdad>), asegúrate de que el nodo Merge de n8n tenga las entradas correctas para reconciliar. La documentación oficial de n8n describe el nodo Merge como la forma estándar de combinar datos de ramas o nodos separados de nuevo en un único flujo, ya sea que esa división haya ocurrido antes en el flujo de trabajo o que los dos nodos nunca hayan formado parte de la misma rama.

- [ ] Dos ramas, cada una terminando en un nodo cuya salida quieres reunir
- [ ] Acceso a los datos de elementos de ambas ramas para poder comparar nombres de campos y cantidades de elementos antes de combinar
- [ ] Un campo clave compartido, como un ID o un correo electrónico, si planeas reconciliar registros en lugar de solo añadirlos
- [ ] Ten en cuenta que combinar salidas de múltiples ejecuciones del mismo nodo, como dentro de un bucle, requiere el nodo Code en lugar de Merge

Sources: [Merge data | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/merge-data>)

Si todavía no tienes un espacio de trabajo de n8n donde probar esto, puedes registrarte en n8n Cloud a través de este enlace de partner, que abre la propia página de registro de n8n, y seguir los pasos del nodo Merge a continuación en un espacio de trabajo nuevo.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## El objetivo: reunir dos ramas en un único flujo preciso

El objetivo es fácil de enunciar y fácil de hacer mal: tomar dos ramas de un flujo de trabajo y producir un único flujo de elementos donde nada esté duplicado y nada de ninguna de las dos ramas desaparezca silenciosamente. El nodo Merge de n8n está construido exactamente para esta tarea, pero la configuración que elijas determina si obtienes una reunión limpia o un flujo lleno de elementos duplicados o faltantes.

Sources: [Merge data | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/merge-data>)

## Pasos: configurar el nodo Merge de n8n

![Cuatro estaciones de trabajo que muestran elementos de rama siendo alineados, emparejados y reunidos en un solo carril.](/blog/es/article-ac9d26c4-8b42-4332-9b67-ffed8e320b2d/6439406c4435d41f94f48fd63ea477e20c62c60b8ae80587e5b32ac68cb5aadc.png)

Una ilustración conceptual de los pasos para configurar el nodo Merge de n8n y combinar dos ramas.

Comienza decidiendo cómo deben relacionarse las dos ramas entre sí. El nodo Merge de n8n ofrece una configuración de Modo con varios comportamientos distintos, y el modo que elijas determina si obtienes elementos duplicados, elementos faltantes o una reunión limpia de las dos ramas.

**Modos del nodo Merge y cuándo usarlos**

| Modo | Qué hace | Mejor uso cuando |
| --- | --- | --- |
| Append | Coloca cada elemento de ambas ramas en una sola lista, uno tras otro | Solo quieres todo de ambas ramas, sin reconciliar por clave o posición |
| Combine by Matching Fields | Empareja elementos de cada rama que comparten el mismo valor en un campo elegido | Ambas ramas representan los mismos registros, por ejemplo por ID o correo electrónico, y quieres un registro combinado por coincidencia |
| Combine by Position | Empareja el primer elemento de la Entrada 1 con el primer elemento de la Entrada 2, el segundo con el segundo, y así sucesivamente | Ambas ramas emiten de forma confiable la misma cantidad de elementos en el mismo orden |

Una vez que hayas elegido Combine, configúralo de forma deliberada en lugar de aceptar la primera opción que veas.

**Cómo configurar el nodo Merge paso a paso**

1. **Elegir el modo**: Decide si necesitas Append, Combine by Matching Fields o Combine by Position según cómo se relacionen las dos ramas.
2. **Configurar campos coincidentes**: Para Combine by Matching Fields, elige el campo o campos que identifican el mismo registro en ambas ramas.
3. **Elegir la configuración de Multiple Matches**: Decide entre incluir todas las coincidencias o solo la primera coincidencia de cada par emparejado.
4. **Revisar colisiones de nombres de campos**: Busca campos con el mismo nombre en ambas ramas antes de combinar.

Sources: [Merge | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.merge>), [Merge data | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/merge-data>), [Merge Node Only Outputting 1 Instead of 2 Items - Questions - n8n Community](<https://community.n8n.io/t/merge-node-only-outputting-1-instead-of-2-items/30435>)

## Resultados esperados: cómo se ve una salida combinada correctamente

Cuando el nodo Merge de n8n está configurado correctamente, la cantidad de elementos de salida coincide con lo que esperarías del modo elegido: Append te da la suma de las cantidades de elementos de ambas ramas, Combine by Matching Fields te da un elemento por cada par emparejado, y Combine by Position te da un elemento por posición. Los valores de los campos deben provenir de la entrada que hayas previsto, y ningún registro debería aparecer más de una vez a menos que hayas elegido deliberadamente una configuración de todas las coincidencias.

Sources: [Merge | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.merge>), [Merge data | Build | n8n Docs](<https://docs.n8n.io/build/flow-logic/merge-data>), [Merge Node Only Outputting 1 Instead of 2 Items - Questions - n8n Community](<https://community.n8n.io/t/merge-node-only-outputting-1-instead-of-2-items/30435>)

Dominar los modos de Merge, los campos coincidentes y las colisiones de nombres de campos en todo un equipo es exactamente el tipo de brecha de habilidades que n8n Advanced / Developer Training está diseñado para cerrar. Este programa puede ser la mejor formación práctica en n8n para un equipo que necesita estandarizar cómo construye y depura la lógica de combinación de datos, ejecutado sobre tu propia instancia y datos de n8n. Puedes consultarlo en la página Para empresas de este sitio.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Solución de problemas: elementos duplicados

![Dos cestas, una con etiquetas duplicadas superpuestas y otra con etiquetas únicas ordenadamente espaciadas.](/blog/es/article-ac9d26c4-8b42-4332-9b67-ffed8e320b2d/0d14130ff098746cb1295f2ed584f679c8cb91c275d23ef78108c062c5e71290.png)

Una comparación ilustrativa entre una salida llena de duplicados y un resultado de combinación correctamente reconciliado.

Si tu salida combinada tiene más elementos de los esperados, revisa primero la configuración de Multiple Matches. Include All Matches está diseñado para generar un elemento separado por cada coincidencia encontrada, por lo que un valor de campo repetido en cualquiera de las ramas produce múltiples elementos de salida a propósito, no por accidente.

Los duplicados también aparecen cuando los propios datos de entrada ya contienen registros duplicados antes de llegar siquiera a Merge. En un caso reportado en un flujo de trabajo de n8n Cloud ejecutando la versión 1.67.1, un usuario combinó datos por Matching Fields después de un paso de Split Out y HTTP Request y encontró que salían más elementos de los que entraban; un moderador de la comunidad rastreó la causa hasta registros duplicados ya presentes en ambas ramas de entrada, ya que el nodo Merge no deduplica sus entradas por diseño. [Antes de asumir que el nodo tiene la culpa](<https://n8n-challenges.app/es/blog/depura-tus-workflows-de-n8n-antes-de-culpar-a-la-integracion>), inspecciona lo que cada rama está enviando realmente.

Sources: [Merge | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.merge>), [Merge node creating duplicate records - Questions - n8n Community](<https://community.n8n.io/t/merge-node-creating-duplicate-records/62031>)

## Solución de problemas: salida faltante o estancada

Los elementos faltantes generalmente se deben a cantidades de entrada desiguales. Cuando las dos ramas que alimentan Merge envían cantidades diferentes de elementos, n8n solo procesa elementos hasta la cantidad de la Entrada 1 en el modo Combine, por lo que cualquier elemento adicional en la Entrada 2 más allá de esa cantidad se descarta. Un hilo de la comunidad de 2023 señaló un riesgo relacionado: si cada rama solo tiene garantizado generar un elemento, Combine by Position los empareja de forma limpia, pero cualquier discrepancia en esa cantidad descarta un elemento silenciosamente.

Un fallo distinto se parece a un flujo de trabajo que nunca termina, en lugar de uno que pierde datos. El mismo hilo de 2023 describe un diseño donde dos disparadores separados activan cada uno su propia ejecución, de modo que una sola ejecución del flujo de trabajo solo llega a Merge con datos en una rama, dejando al nodo esperando una entrada que nunca recibirá.

Un blog técnico independiente informa, sin corroboración en la propia documentación de n8n, que por defecto el nodo Merge espera ambas entradas y puede quedarse colgado indefinidamente si una rama legítimamente produce cero elementos. Esa fuente describe una opción de estilo 'Only One Input' como una forma de permitir que la ejecución continúe con solo una entrada presente, aunque la etiqueta exacta de la opción no está confirmada en la documentación oficial proporcionada aquí.

Sources: [Merge | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.merge>), [Merge Node Only Outputting 1 Instead of 2 Items - Questions - n8n Community](<https://community.n8n.io/t/merge-node-only-outputting-1-instead-of-2-items/30435>), [n8n Merge Node: Combine, Multiplex, Pass-Through Explained | Emil Ingemar Karlsson](<https://www.emilingemarkarlsson.com/blog/n8n-merge-node-modes-explained>)

## Recomendaciones para flujos de trabajo gestionados por equipos

Algunos hábitos mantienen predecible al nodo Merge de n8n [una vez que más de una persona mantiene el flujo de trabajo](<https://n8n-challenges.app/es/blog/formacion-en-n8n-para-equipos-un-estandar-compartido-de-gestion-de-errores>).

- Comienza con Combine by Matching Fields cuando las ramas comparten una clave como un ID o correo electrónico; reserva Combine by Position para ramas que garantizan emitir la misma cantidad y orden de elementos
- Antes de asumir que el nodo tiene errores, revisa la cantidad y el contenido de los elementos de entrada de cada rama, ya que varios informes reales de duplicados y elementos faltantes se remontaron a los datos previos en lugar de al propio nodo
- Si una rama puede legítimamente devolver cero elementos, diséñalo explícitamente en lugar de dejar que Merge espere indefinidamente
- Renombra los nombres de campos en conflicto con un nodo Set o Edit Fields antes de combinar si necesitas conservar los valores de ambas ramas, ya que Merge sobrescribe por defecto los campos con el mismo nombre de la Entrada 1 con el valor de la Entrada 2
- Documenta qué modo y opciones de Merge usa un flujo de trabajo para que la siguiente persona entienda las cantidades de elementos esperadas

Un detalle que vale la pena confirmar por ti mismo: la referencia oficial del nodo Merge no indica, en el material revisado aquí, cuál configuración de Multiple Matches es la predeterminada, así que revisa tu propia instancia del nodo antes de confiar en ella.

Sources: [Merge | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.merge>), [Merge node creating duplicate records - Questions - n8n Community](<https://community.n8n.io/t/merge-node-creating-duplicate-records/62031>), [Merge Node Only Outputting 1 Instead of 2 Items - Questions - n8n Community](<https://community.n8n.io/t/merge-node-only-outputting-1-instead-of-2-items/30435>), [n8n Merge Node: Combine, Multiplex, Pass-Through Explained | Emil Ingemar Karlsson](<https://www.emilingemarkarlsson.com/blog/n8n-merge-node-modes-explained>)

Si tu equipo ya tiene flujos de trabajo que dependen del nodo Merge y no estás seguro de si elementos duplicados o faltantes se están filtrando silenciosamente, una Auditoría de Flujos de Trabajo puede revisar tu instancia y flujos de trabajo de n8n en cuanto a fiabilidad, seguridad y mantenibilidad. Es una forma práctica de que un equipo corrija su lógica de combinación de datos antes de que cause un incidente en producción. Puedes consultarlo en la página Para empresas de este sitio.

**[Audita la lógica de combinación de tu equipo](https://n8n-challenges.app/es/companies)**

Tags: n8n, Transformación de datos, Depuración de flujos de trabajo, Tutorial
