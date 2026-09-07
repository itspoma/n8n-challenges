---
number: 5
slug: google-drive-rag
difficulty: advanced
time: 45–60 min
complexity: 4
color: #ff8a55
ink: #1b2427
---

# English

## Title
Google Drive RAG

## Summary
Answer questions from a Google Drive knowledge folder and show which document supports the answer.

## Concept
Document ingestion, embeddings, vector retrieval, and grounded answers

## Scenario
- An event team has policies and guides in Drive and needs answers grounded in those documents.
- New volunteers want setup answers that cite the correct handbook file.
- Attendees need to search logistics and sponsor documents without reading every file.

## Task
Build an ingestion path that loads the event documents from Google Drive into a vector store and a question-answering path that retrieves relevant passages, answers the question, and names the source document.

## Bonus Task
When retrieval finds no relevant passage, return a clear not-enough-information response instead of generating an unsupported answer.

## Nodes
- Google Drive
- Default Data Loader
- Embeddings
- Vector Store
- Chat Trigger
- AI Agent

## Preparation
- Connect a Google account that can read the event-provided Drive folder containing three to five documents.
- Add an AI model and embedding credential, and choose a vector store available in your n8n workspace.

## Requirements
- Load every file from the event folder without copying its text manually into the workflow.
- Split the documents into chunks, create embeddings, and store source metadata with each chunk.
- Retrieve relevant chunks dynamically for each incoming question.
- Return an answer together with at least one supporting source filename.
- For an unsupported question, say that the documents do not contain the answer instead of inventing one.

## Tips
- Prove that Google Drive can list and download one event document before adding AI nodes.
- Build and run the ingestion path separately from the question-answering path.
- Preserve the filename or Drive ID as metadata when loading each document.
- Use the same embedding model when inserting documents and retrieving them.
- Tell the agent to answer only from retrieved context and to include the source metadata.

# Spanish

## Title
RAG con Google Drive

## Summary
Responde preguntas a partir de una carpeta de conocimiento en Google Drive y muestra qué documento respalda la respuesta.

## Concept
Ingesta de documentos, embeddings, recuperación vectorial y respuestas fundamentadas

## Scenario
- El equipo de un evento tiene políticas y guías en Drive y necesita respuestas basadas en esos documentos.
- El nuevo voluntariado quiere respuestas de configuración que citen el archivo correcto del manual.
- Las personas asistentes necesitan buscar información logística y de patrocinio sin leer cada documento.

## Task
Crea una ruta de ingesta que cargue los documentos del evento desde Google Drive en un almacén vectorial y una ruta de preguntas que recupere fragmentos relevantes, responda y nombre el documento fuente.

## Bonus Task
Cuando la búsqueda no encuentre ningún fragmento relevante, devuelve una respuesta clara indicando que no hay información suficiente en lugar de inventar una respuesta.

## Nodes
- Google Drive
- Default Data Loader
- Embeddings
- Vector Store
- Chat Trigger
- AI Agent

## Preparation
- Conecta una cuenta de Google que pueda leer la carpeta de Drive proporcionada por el evento con entre tres y cinco documentos.
- Añade credenciales para un modelo de IA y embeddings y elige un almacén vectorial disponible en tu espacio de n8n.

## Requirements
- Carga todos los archivos de la carpeta del evento sin copiar manualmente su texto en el workflow.
- Divide los documentos en fragmentos, crea embeddings y guarda los metadatos de origen con cada fragmento.
- Recupera dinámicamente fragmentos relevantes para cada pregunta recibida.
- Devuelve una respuesta junto con al menos un nombre de archivo que la respalde.
- Ante una pregunta no cubierta, indica que los documentos no contienen la respuesta en lugar de inventarla.

## Tips
- Comprueba que Google Drive puede listar y descargar un documento del evento antes de añadir nodos de IA.
- Construye y ejecuta la ruta de ingesta separada de la ruta de preguntas y respuestas.
- Conserva el nombre del archivo o el ID de Drive como metadato al cargar cada documento.
- Usa el mismo modelo de embeddings al insertar documentos y al recuperarlos.
- Indica al agente que responda solo con el contexto recuperado y que incluya los metadatos de la fuente.
