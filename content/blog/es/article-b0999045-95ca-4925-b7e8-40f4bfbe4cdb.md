---
{
  "id": "opp_b0999045-95ca-4925-b7e8-40f4bfbe4cdb",
  "locale": "es",
  "slug": "article-b0999045-95ca-4925-b7e8-40f4bfbe4cdb",
  "title": "Transforma JSON anidado en registros simples en n8n",
  "subtitle": "Un tutorial práctico para convertir un array anidado de una API en un elemento limpio de n8n por registro mediante Split Out y Edit Fields, además de una alternativa con el nodo Code para datos irregulares.",
  "description": "Un tutorial práctico para convertir un array anidado de una API en un elemento limpio de n8n por registro mediante Split Out y Edit Fields, además de una alternativa con el nodo Code para datos irregulares.",
  "date": "2026-09-13",
  "tags": [
    "n8n",
    "Transformación de datos",
    "Depuración de flujos de trabajo",
    "Tutorial"
  ],
  "coverImage": "/blog/es/article-b0999045-95ca-4925-b7e8-40f4bfbe4cdb/9e8218ff2a5defdce969b76d6835a22318a51074b14d368f48248699cf3cf4f4.png",
  "coverAlt": "Unas manos organizan en una fila simple los registros extraídos de contenedores JSON anidados.",
  "seo": {
    "title": "Transforma JSON anidado en registros simples en n8n",
    "description": "Un tutorial práctico para convertir un array anidado de una API en un elemento limpio de n8n por registro mediante Split Out y Edit Fields, además de una alternativa con el nodo Code para datos irregulares.",
    "keywords": [
      "n8n",
      "Transformación de datos",
      "Depuración de flujos de trabajo",
      "Tutorial"
    ]
  },
  "revision": "724c3c8b325ec43d6758d67a67d39e4fb6643d0d98c34d8fb2fc3ea5f2f990b6"
}
---

## Objetivo y resultado esperado

El objetivo es tomar un elemento de n8n que contenga un array anidado y producir una lista simple de registros. Como ejemplo editorial, imagina que el elemento entrante contiene un array data.customers. Cada cliente tiene un id, profile.name, profile.email y quizá otros campos que no necesitas.

Después de la transformación, cada elemento del array debería convertirse en un elemento independiente de n8n. Un resultado deliberadamente sencillo podría contener solo customerId, name y email. Si el array de origen contiene cinco clientes, el resultado esperado son cinco elementos de salida. Esta estructura de ejemplo es ilustrativa, no un payload proporcionado por una API ni una receta documentada oficialmente.

La ruta principal utiliza Split Out para separar el array y Edit Fields para dar forma a cada elemento resultante. Split Out está diseñado para convertir una lista contenida en un elemento en varios elementos, mientras que Edit Fields puede crear o sobrescribir campos usando los datos entrantes. En este caso, es mejor reservar un nodo Code como alternativa cuando la estructura varía demasiado para un mapeo de campos sencillo.

Sources: [S1](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitout), [S2](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.set), [S5](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code)

Convierte este flujo de trabajo con JSON anidado en una práctica real con n8n Balloon Challenges: crea la automatización en tu propio entorno de n8n y utiliza los consejos progresivos disponibles cuando los necesites.

[Explora los retos de n8n](https://n8n-challenges.app/es)

## Prepara el flujo de trabajo y los datos de ejemplo

Necesitas acceso a tu propio entorno de n8n y una respuesta JSON conocida. El sitio web de aprendizaje no proporciona un entorno alojado de ejecución de n8n, así que prepara un entorno donde puedas crear y ejecutar un flujo de trabajo. También necesitas conocer el endpoint de la API y cualquier autenticación que requiera si planeas obtener datos en tiempo real.

Un nodo HTTP Request puede recuperar información de una API REST. Configúralo para el servicio que estés utilizando y, a continuación, ejecútalo para obtener una respuesta representativa. Como los endpoints, las credenciales y las estructuras de respuesta varían según el servicio, sigue la documentación de esa API en lugar de copiar suposiciones de este tutorial.

Para [practicar con mayor seguridad](<https://n8n-challenges.app/es/blog/article-67deff63-e8cc-490c-8537-d1fa289cb76b>), considera usar una muestra pequeña fijada o recuperada previamente. Como ejemplo editorial sugerido, utiliza un objeto cuyo campo data contenga un array customers. Incluye dos o tres registros con campos como id, profile.name, profile.email y status. Esto facilita comparar la salida del flujo de trabajo en cada etapa sin depender de una respuesta en tiempo real que pueda cambiar.

Sources: [S4](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest)

## Inspecciona la respuesta en la vista JSON

Abre el nodo que proporciona la respuesta e inspecciona su salida. n8n ofrece las vistas Schema, Table y JSON para la entrada y la salida de los nodos. La vista JSON resulta especialmente útil para confirmar el anidamiento y copiar la ruta exacta del array que quieres dividir.

Busca el array en sí, no una propiedad individual dentro de sus registros. En la muestra sugerida, el objetivo es data.customers, no data.customers.profile ni data.customers.profile.name. Comprueba la ortografía, el uso de mayúsculas y minúsculas y cada objeto contenedor de la ruta.

No dependas únicamente de la vista Schema cuando los registros puedan ser diferentes. La documentación proporcionada señala que Schema representa el primer elemento, por lo que podría no mostrar las variaciones presentes en otros. Revisa el JSON y, cuando resulte útil, la vista Table antes de concluir que todos los registros tienen los mismos campos.

Sources: [S3](https://docs.n8n.io/build/work-with-data/overview)

## Divide el array anidado en elementos separados

![Un array customers anidado pasa por Split Out y se convierte en tres elementos separados.](/blog/es/article-b0999045-95ca-4925-b7e8-40f4bfbe4cdb/3b6e86032754367a8014d5b96a7bab1bf6159a18f7f9e8e30e00ad33be9cb090.png)

Proceso editorial que muestra la transformación de un array en varios elementos.

Añade un nodo Split Out después del nodo de origen. Configura el campo que se dividirá con la ruta exacta del array anidado, como data.customers en la muestra editorial. Si la interfaz ofrece una opción relacionada con la notación de puntos, asegúrate de que su comportamiento coincida con la forma en que introdujiste la ruta anidada.

Ejecuta el nodo Split Out e inspecciona su salida. El resultado previsto es un elemento de n8n por cada elemento del array de origen. Si el array contenía tres objetos de clientes, el nodo debería producir tres elementos. Esta comparación de cantidades es un paso práctico de verificación sugerido para este tutorial, no una prueba de calificación automatizada.

Decide de forma deliberada si conservarás los campos del elemento contenedor. Los datos del contenedor pueden ser útiles cuando incluyen contexto que necesita cada registro, pero también pueden recargar el resultado. Si la salida contiene campos de nivel superior inesperados, revisa la configuración de Split Out y la opción para conservar otros campos.

Sources: [S1](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitout), [S3](https://docs.n8n.io/build/work-with-data/overview)

## Mapea cada elemento a un registro simple

Añade Edit Fields después de Split Out y utiliza el modo Manual Mapping. Crea las claves que requiera el destino de tu flujo de trabajo. Para la muestra, podrías crear customerId a partir de id, name a partir de profile.name y email a partir de profile.email. Estos nombres y rutas son sugerencias para el payload ilustrativo, no campos universales de las API.

Mapea cada campo nuevo desde el elemento dividido actual. Edit Fields permite establecer datos nuevos y sobrescribir datos existentes con valores entrantes, por lo que resulta adecuado para cambiar nombres de propiedades y seleccionar una estructura de salida más reducida.

Cuando quieras un registro limpio que contenga únicamente las claves mapeadas, activa la opción que conserva solo los campos establecidos. Ejecuta el nodo e inspecciona varios elementos, no solo el primero. Confirma que cada elemento de salida contenga las claves esperadas y que los valores procedan del registro de origen correspondiente.

Sources: [S2](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.set), [S3](https://docs.n8n.io/build/work-with-data/overview)

## Verifica los registros transformados

Compara la cantidad de elementos después de Edit Fields con la longitud del array original. Deberían coincidir en esta transformación directa de un elemento del array a un elemento de n8n. Después, examina la salida en la vista JSON o Table para confirmar que los campos seleccionados tengan los nombres y valores esperados.

Comprueba más de un registro. Busca direcciones de correo electrónico ausentes, anidamiento adicional, valores null o campos cuyos tipos varíen entre registros. La vista Schema por sí sola puede ocultar estas diferencias porque refleja el primer elemento.

Un resultado correcto para la muestra sugerida es una secuencia de elementos separados, cada uno con customerId, name y email únicamente cuando está activada la opción que conserva solo los campos establecidos. Si mantuviste otros campos intencionadamente, documenta por qué permanecen para que el siguiente paso del flujo de trabajo tenga un contrato de entrada claro.

Sources: [S2](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.set), [S3](https://docs.n8n.io/build/work-with-data/overview)

## Usa un nodo Code para estructuras irregulares

![Comparación entre una ruta de nodos visuales para registros uniformes y una alternativa con Code para registros irregulares.](/blog/es/article-b0999045-95ca-4925-b7e8-40f4bfbe4cdb/e3b04ec85d3ae8a49b6f0a8188b93361442bd7cdef613ec8ee05b47fd47aece6.png)

Marco de decisión ilustrativo: utiliza el mapeo visual para estructuras estables y código personalizado cuando las variantes estructurales conocidas requieran normalización condicional.

Utiliza un nodo Code cuando la estructura entrante no pueda expresarse claramente mediante una única ruta estable de array seguida de mapeos coherentes. Algunos ejemplos podrían ser arrays que aparecen en rutas alternativas o registros que requieren una normalización condicional. Estos son escenarios sugeridos, no pruebas comparativas de que el código sea más rápido o fiable.

El nodo Code admite JavaScript o Python personalizados, pero la lógica personalizada debe respetar la estructura de entrada y salida esperada por n8n y tener en cuenta la vinculación de elementos. Crea la transformación más pequeña que gestione las variantes conocidas e inspecciona cuidadosamente su salida.

Una estrategia de implementación sugerida consiste en leer cada elemento entrante, seleccionar el primer array disponible de una lista explícita de rutas conocidas, normalizar cada registro con el mismo conjunto de claves y devolver un elemento de n8n por cada registro normalizado. Trátalo como un patrón de diseño editorial, no como una receta validada oficialmente. Si una configuración estable de Split Out y Edit Fields puede gestionar el payload, seguirá siendo más fácil inspeccionarla visualmente y evitará lógica personalizada innecesaria.

Sources: [S5](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code), [S3](https://docs.n8n.io/build/work-with-data/overview)

## Soluciona problemas comunes de la salida

Si Split Out no produce elementos útiles, vuelve a la vista JSON y [verifica la ruta completa del array](<https://n8n-challenges.app/es/blog/article-00b1ca23-6c47-4a3d-9aac-6a9ed116bcd0>). Una ruta que apunte a una propiedad del registro en lugar de al array, una clave contenedora mal escrita o un comportamiento de notación de puntos que no coincida pueden impedir la división prevista.

Si cada elemento de salida sigue conteniendo campos no deseados del contenedor, revisa si Split Out conservó los datos circundantes y si Edit Fields está configurado para mantener solo los campos que estableciste. Si los valores mapeados están vacíos, inspecciona un elemento ya dividido y ajusta las expresiones a su estructura posterior a la división, no a la estructura original del contenedor.

Si algunos registros funcionan y otros fallan, inspecciona todos los elementos en la vista JSON o Table. El primer elemento podría no revelar un anidamiento incoherente o propiedades ausentes. Decide si los valores opcionales pueden quedar vacíos, necesitan un mapeo alternativo o justifican una normalización condicional en un nodo Code. Por último, compara la longitud del array de origen con la cantidad de elementos de salida e inspecciona registros representativos antes de conectar acciones posteriores.

Sources: [S1](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitout), [S2](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.set), [S3](https://docs.n8n.io/build/work-with-data/overview), [S5](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code)

## Practica la transformación

Repite el ejercicio con una segunda muestra cuyo array utilice una ruta contenedora diferente. Primero identifica el array en la vista JSON; después, divídelo, mapea un registro mínimo y verifica tanto la cantidad de elementos de salida como la estructura de sus campos. Como ampliación opcional, introduce un registro incoherente y decide si resulta adecuada una expresión alternativa o un nodo Code.

Mantén clara la diferencia entre las herramientas: n8n es el entorno donde creas y ejecutas el flujo de trabajo, mientras que n8n Balloon Challenges es un sitio web de aprendizaje práctico y un formato de eventos. Ofrece retos prácticos de automatización con consejos progresivos, y los participantes trabajan en su propio entorno de n8n.

Sources: [S1](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitout), [S2](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.set), [S3](https://docs.n8n.io/build/work-with-data/overview), [S5](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code)

Tags: n8n, Transformación de datos, Depuración de flujos de trabajo, Tutorial
