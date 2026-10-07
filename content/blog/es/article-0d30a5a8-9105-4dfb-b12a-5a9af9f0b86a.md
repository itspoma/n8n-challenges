---
{
  "id": "opp_0d30a5a8-9105-4dfb-b12a-5a9af9f0b86a",
  "locale": "es",
  "slug": "article-0d30a5a8-9105-4dfb-b12a-5a9af9f0b86a",
  "urlSlug": "tutorial-de-n8n-rag-construye-un-asistente-de-google-drive",
  "publishedAt": "2026-10-07T21:25:38.990Z",
  "title": "Tutorial de n8n RAG: construye un asistente de Google Drive",
  "subtitle": "Tutorial de n8n RAG: indexa una carpeta de Drive, consúltala con un Agente de IA que cita sus fuentes y revisa límites antes de indexar archivos confidenciales.",
  "description": "Tutorial de n8n RAG: indexa una carpeta de Drive, consúltala con un Agente de IA que cita sus fuentes y revisa límites antes de indexar archivos confidenciales.",
  "date": "2026-10-07",
  "sourcesCheckedAt": "2026-09-21T16:08:09.920Z",
  "tags": [
    "n8n",
    "Automatización con IA",
    "Preparación para producción",
    "Generación aumentada por recuperación",
    "Tutorial"
  ],
  "coverImage": "/blog/es/article-0d30a5a8-9105-4dfb-b12a-5a9af9f0b86a/62baf3b955fbd3d5a4bbf8c25abc14f94e9e70fd12dc28354dc9a3a3b6935eb1.png",
  "coverAlt": "Una carpeta de documentos etiquetada responde una pregunta mientras una pila de documentos bajo llave permanece aparte.",
  "seo": {
    "title": "Tutorial de n8n RAG: construye un asistente de Google Drive",
    "description": "Tutorial de n8n RAG: indexa una carpeta de Drive, consúltala con un Agente de IA que cita sus fuentes y revisa límites antes de indexar archivos confidenciales.",
    "keywords": []
  },
  "revision": "2159dc5922d341a0af92449151963a682f8d3d8179be1d41e6a4d23d8853b366"
}
---

## Objetivo: qué construye este tutorial de n8n RAG y qué necesitas

![Una carpeta de Drive, una llave de acceso y dos fichas de modelo se presentan como requisitos previos para un asistente de n8n RAG.](/blog/es/article-0d30a5a8-9105-4dfb-b12a-5a9af9f0b86a/96396aa9d39493465c081bdcabcea5b7e21814143b8d4c7d85b1006ba0a4ddac.png)

La carpeta, las credenciales y los modelos necesarios antes de construir se presentan juntos como requisitos previos.

Este tutorial de n8n RAG recorre un asistente de chat que busca en una carpeta de Google Drive antes de responder, y luego nombra los archivos detrás de cada respuesta. La generación aumentada por recuperación, RAG por sus siglas en inglés, permite que un agente base sus respuestas en tus propios documentos en lugar de adivinar. Al final tendrás un asistente de Drive funcional que podrás probar localmente, además de una idea clara de qué falta revisar antes de apuntarlo a algo confidencial.

Si prefieres construir esto de forma práctica con un mentor cerca, nuestro propio reto [Pregúntale a tu Google Drive](<https://n8n-challenges.app/es/challenges/google-drive-rag>) recorre el mismo patrón de principio a fin, usando el mismo tipo de nodos descritos a continuación.

Antes de empezar, necesitarás tener cuatro cosas listas:

- [ ] Una instancia de n8n, en la nube o autoalojada, con acceso para crear workflows
- [ ] Credenciales OAuth de Google Drive conectadas en n8n
- [ ] Un modelo de embeddings y un modelo de chat conectados a n8n
- [ ] Una carpeta dedicada de Drive que contenga solo los documentos que quieres indexar

Sources: [RAG chatbot for company documents using Google Drive and Gemini | n8n workflow template](<https://n8n.io/workflows/2753-rag-chatbot-for-company-documents-using-google-drive-and-gemini/>), [Retrieve relevant context | Build | n8n Docs](<https://docs.n8n.io/build/integrate-ai/understand-ai-components/retrieve-relevant-context>), [Google Drive | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googledrive>)

Si todavía no tienes un espacio de trabajo de n8n donde construir esto, puedes seguir estos pasos en uno completamente nuevo. Este es un enlace de partner que abre la página de registro propia de n8n, no una página de este sitio.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Paso a paso: obtener, insertar, consultar y citar

![Muestra cuatro etapas de construir un asistente de n8n RAG: obtener, insertar, consultar y citar fuentes.](/blog/es/article-0d30a5a8-9105-4dfb-b12a-5a9af9f0b86a/b2cc2c0d4fabb2dbaf3f2263a49852303fad16750058a9c40847c85797aceb8a.png)

Las cuatro etapas de construcción descritas en esta sección, obtener, insertar, consultar y citar, aparecen en secuencia.

Construir este asistente se reduce a cuatro pasos, cada uno correspondiente a una breve secuencia de nodos en tu workflow.

![Construyendo el asistente RAG de Drive: 1. Obtener de Drive; 2. Insertar en el almacén vectorial; 3. Consultar mediante un agente; 4. Citar las fuentes](/blog/es/article-0d30a5a8-9105-4dfb-b12a-5a9af9f0b86a/20b1eef71750d6943ae666b3d7a682a1218781f8a5186f20d078649da9537c49.png)

El nodo de Google Drive admite buscar archivos y carpetas, y cuenta con una operación de descarga independiente, que es el paso que necesita un data loader antes de poder leer el contenido de un archivo.

Para el paso de inserción, añade un nodo de almacén vectorial, como Simple Vector Store, y configúralo en la operación Insert Documents. Pásalo por un Default Data Loader; la documentación de n8n recomienda el Recursive Character Text Splitter para la mayoría de los casos, aunque el tamaño real de los fragmentos depende de tus datos. Guarda el nombre y el ID del archivo como metadatos del fragmento para que las respuestas puedan señalar al documento correcto. Nuestra recomendación práctica: empieza con el splitter sugerido por n8n y su configuración por defecto, y ajusta el tamaño del fragmento solo cuando veas fallos reales de recuperación en las pruebas.

En el lado de la consulta, añade el mismo almacén vectorial como herramienta a un [AI Agent](<https://n8n-challenges.app/es/blog/tutorial-de-n8n-ai-agent-crea-tu-primer-agente>), y usa el mismo modelo de embeddings que usaste al insertar los datos. Activa Include Metadata para que los fragmentos recuperados lleven el nombre y el ID del archivo de vuelta al agente.

Nombrar las fuentes no es una función integrada de n8n; es diseño de prompt construido sobre esos metadatos. Indica al agente, en su prompt de sistema, que termine cada respuesta con una breve línea de Fuentes que liste los nombres de los archivos en los que se basó, y que diga claramente cuando no encontró nada relevante en lugar de inventar una.

Sources: [Retrieve relevant context | Build | n8n Docs](<https://docs.n8n.io/build/integrate-ai/understand-ai-components/retrieve-relevant-context>), [Google Drive | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googledrive>)

## Resultados esperados

Una vez que todo está conectado, una prueba exitosa se ve así: le haces una pregunta al asistente sobre algo cubierto por tu carpeta de Drive, y responde con una respuesta más una breve línea de Fuentes que nombra el archivo correcto. Pregunta algo fuera del contenido de la carpeta, y un agente bien configurado debería decir que no encontró nada en lugar de fabricar una línea de Fuentes. Somos optimistas de que este pequeño hábito de citación detecta más respuestas sin fundamento de lo que la mayoría de los equipos espera, simplemente porque obliga al agente a señalar algo verificable.

Trata un primer intento como un borrador: abre el archivo que nombra y comprueba que la respuesta realmente coincide. Nada en la documentación de n8n garantiza la precisión de las citas, ya que depende por completo de los metadatos de tus fragmentos y del prompt.

Sources: [Retrieve relevant context | Build | n8n Docs](<https://docs.n8n.io/build/integrate-ai/understand-ai-components/retrieve-relevant-context>)

Enseñar a todo un equipo a construir y revisar workflows RAG como este de forma segura es exactamente para lo que sirve nuestro programa AI Agents with n8n, impartido sobre tu propia instancia y datos de n8n. Esto abre una página de este sitio; las consultas se gestionan a través del enlace de LinkedIn que allí aparece, no mediante un formulario de reserva.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Antes de indexar archivos confidenciales

![Compara una bandeja de papeles sueltos y frágil con un archivador cerrado con llave para mostrar el riesgo del almacén vectorial.](/blog/es/article-0d30a5a8-9105-4dfb-b12a-5a9af9f0b86a/ee1e5ec954eaa59ea598c21faf43545a07f49266ae1f8a299b4a66bedcbe1fca.png)

Un índice temporal y compartido se sitúa junto a uno persistente y bloqueado, contrastando su seguridad.

Simple Vector Store es el nodo más fácil para empezar un workflow de n8n RAG, pero la propia documentación de n8n lo describe como adecuado solo para uso en desarrollo, no en producción. Su índice vive en memoria, y todos los datos se pierden cuando n8n se reinicia. En n8n Cloud también está limitado, por defecto, a 100MB y una ventana de retención de 7 días; las instancias autoalojadas no tienen ese límite de fábrica.

**Simple Vector Store frente a un almacén vectorial persistente**

| Almacén | Persistencia | Quién puede acceder | Uso documentado |
| --- | --- | --- | --- |
| Simple Vector Store | En la memoria de n8n; se pierde al reiniciar (Cloud: limitado a 100MB, retención de 7 días) | Cualquier usuario de la misma instancia de n8n | Solo uso en desarrollo, según la documentación de n8n |
| Almacén persistente (p. ej. Pinecone, PGVector, Qdrant) | No documentado en la fuente proporcionada | No documentado en la fuente proporcionada | Nombrados como alternativas en la documentación de n8n; controles de acceso no cubiertos |

Más importante aún para archivos confidenciales, las claves de memoria de Simple Vector Store son globales: cualquier usuario de la misma instancia de n8n puede acceder a ese índice, sin importar los controles de acceso que tenga el propio workflow. Nunca dejaríamos que este nodo guarde algo sensible en una [instancia compartida](<https://n8n-challenges.app/es/blog/lista-de-seguridad-de-n8n-para-una-instancia-compartida-y-autoalojada>), ni siquiera brevemente.

Antes de apuntar esta construcción a documentos reales de la empresa, pasa a un almacén vectorial persistente, mantén la indexación restringida a una sola carpeta dedicada, y revisa por separado quién puede acceder tanto a ese almacén como a las credenciales de Drive detrás de él. La documentación proporcionada nombra alternativas como Pinecone, PGVector y Qdrant pero no describe sus controles de acceso, así que esa revisión, junto con los permisos de Drive que se trasladan al índice, sigue siendo tarea tuya; trátalo como una pregunta abierta y no como algo resuelto.

Sources: [Simple Vector Store | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory>)

## Mantener el índice actualizado y resolución de problemas

![Muestra una mano marcando tareas de OAuth, caducidad de tokens, metadatos y reindexación para el mantenimiento.](/blog/es/article-0d30a5a8-9105-4dfb-b12a-5a9af9f0b86a/dc6171d45df65ac6ce04659586a551ed1f2de364bb419c487398b93500253fa7.png)

Las comprobaciones de mantenimiento cubiertas en esta sección, acceso, caducidad de tokens, metadatos y reindexación, se van marcando una por una.

Los documentos cambian, así que un índice único para un asistente de n8n RAG se vuelve obsoleto. Una plantilla de n8n creada por la comunidad para un chatbot RAG de documentos empresariales usa dos nodos Google Drive Trigger, uno vigilando archivos nuevos y otro archivos actualizados en una sola carpeta, enviando los cambios a un almacén persistente. Es una plantilla de workflow y no documentación oficial, y se construyó sobre un modelo de chat más antiguo, así que trata sus elecciones de nodos como un patrón de partida, no como una receta fija.

El hábito de la carpeta dedicada de esa plantilla vale la pena mantenerlo sin importar en qué almacén vectorial termines: limita desde el principio qué llega a indexarse.

Dos errores de OAuth de Google Drive aparecen con frecuencia. Si la conexión falla por completo, la causa habitual es un desajuste entre la URL de redirección registrada en la configuración de OAuth de Google y la que está usando n8n; los usuarios autoalojados deben revisar sus ajustes N8N_EDITOR_BASE_URL y WEBHOOK_URL.

Si una conexión que funcionaba deja de hacerlo de repente tras aproximadamente una semana, revisa el estado de publicación de tu app de Google Cloud: las apps dejadas en modo de prueba (Testing) con usuarios externos tienen consentimientos y tokens que caducan a los siete días, y la solución es reconectar la credencial en el modal de credenciales de n8n.

Si las respuestas nunca llevan una línea de Fuentes, el fallo casi siempre está más arriba en el proceso: confirma que Include Metadata esté activado en la configuración de recuperación del almacén vectorial, y confirma que el nombre y el ID del archivo se escribieron realmente en los metadatos del fragmento al momento de insertar.

Sources: [RAG chatbot for company documents using Google Drive and Gemini | n8n workflow template](<https://n8n.io/workflows/2753-rag-chatbot-for-company-documents-using-google-drive-and-gemini/>), [Common issues | Nodes | n8n Docs](<https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/common-issues>), [Retrieve relevant context | Build | n8n Docs](<https://docs.n8n.io/build/integrate-ai/understand-ai-components/retrieve-relevant-context>)

Antes de que un asistente de Drive como este toque archivos reales de la empresa, conviene que alguien revise quién puede acceder al índice y a las credenciales detrás de él en tu propia instancia; eso es exactamente lo que examina nuestra Auditoría de Workflows. Esto abre una página de este sitio, y las consultas se gestionan a través de su enlace de LinkedIn.

**[Audita los riesgos de acceso de tu RAG](https://n8n-challenges.app/es/companies)**

Tags: n8n, Automatización con IA, Preparación para producción, Generación aumentada por recuperación, Tutorial
