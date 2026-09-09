---
number: 5
slug: google-drive-rag
difficulty: advanced
time: 45–60 min
complexity: 4
color: #040506
ink: #ffffff
---

# Solution Data

Internal reference for solution rendering and workflow comparison. This section is not displayed on the challenge page.

Replace `REPLACE_WITH_YOUR_FOLDER_ID` after importing either workflow. Credentials are intentionally omitted.

## Core Workflow JSON (without bonus)

```json
{
  "name": "Challenge 5 – Google Drive RAG",
  "nodes": [
    {"parameters": {}, "id": "0b0a8a46-2bdb-4f65-86c5-d04bde0f4e01", "name": "Run document ingestion", "type": "n8n-nodes-base.manualTrigger", "typeVersion": 1, "position": [-1260, -300], "notesInFlow": true, "notes": "Run once after uploading the three fixture files, and again after an n8n restart."},
    {"parameters": {"resource": "fileFolder", "operation": "search", "searchMethod": "name", "queryString": "", "returnAll": true, "filter": {"folderId": {"__rl": true, "value": "REPLACE_WITH_YOUR_FOLDER_ID", "mode": "id"}, "whatToSearch": "files", "fileTypes": ["text/plain"], "includeTrashed": false}, "options": {"fields": ["id", "name", "mimeType", "webViewLink"]}}, "id": "635e540b-bb13-4284-a3de-fb9d4fb963ba", "name": "Find event text files", "type": "n8n-nodes-base.googleDrive", "typeVersion": 3, "position": [-1040, -300], "notesInFlow": true, "notes": "Returns every direct-child plain-text file from the dedicated Drive folder."},
    {"parameters": {"batchSize": 1, "options": {}}, "id": "843766a7-15d8-4d71-bf8d-c9119070a040", "name": "Loop Over Items", "type": "n8n-nodes-base.splitInBatches", "typeVersion": 3, "position": [-820, -300], "notesInFlow": true, "notes": "Processes one file at a time so loader expressions use the current file's metadata."},
    {"parameters": {"resource": "file", "operation": "download", "fileId": {"__rl": true, "value": "={{ $json.id }}", "mode": "id"}, "options": {"binaryPropertyName": "data", "fileName": "={{ $json.name }}", "googleFileConversion": {"conversion": {"docsToFormat": "text/plain"}}}}, "id": "85e0eb87-fbbd-4cb6-bfac-96548053994c", "name": "Download current file", "type": "n8n-nodes-base.googleDrive", "typeVersion": 3, "position": [-600, -180], "notesInFlow": true, "notes": "Downloads the current file into the binary field named data."},
    {"parameters": {"mode": "insert", "memoryKey": {"__rl": true, "mode": "id", "value": "challenge_5_event_docs"}, "clearStore": "={{ $runIndex === 0 }}"}, "id": "34df91c5-8078-499c-ae07-fad21c4df8cf", "name": "Insert event documents", "type": "@n8n/n8n-nodes-langchain.vectorStoreInMemory", "typeVersion": 1.2, "position": [-360, -180], "notesInFlow": true, "notes": "Clears the demo store on the first loop run, then inserts every file into the same memory key."},
    {"parameters": {"model": "text-embedding-3-small", "options": {}}, "id": "65ad22cc-87f0-423e-882b-018827dcc5d1", "name": "Embeddings OpenAI", "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi", "typeVersion": 1.2, "position": [-360, 100]},
    {"parameters": {"dataType": "binary", "binaryMode": "specificField", "binaryDataKey": "data", "loader": "auto", "textSplittingMode": "custom", "options": {"metadata": {"metadataValues": [{"name": "file_name", "value": "={{ $json.name }}"}, {"name": "file_id", "value": "={{ $json.id }}"}, {"name": "source_url", "value": "={{ $json.webViewLink }}"}]}}}, "id": "e2ef5e05-b0ed-4411-9e61-3c61b87d91c5", "name": "Default Data Loader", "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader", "typeVersion": 1.1, "position": [-120, 80], "notesInFlow": true, "notes": "Loads the downloaded binary and adds file_name, file_id, and source_url to every document chunk."},
    {"parameters": {"chunkSize": 800, "chunkOverlap": 120, "options": {}}, "id": "4399a141-8da3-4107-b3eb-692e4e948b43", "name": "Recursive Character Text Splitter", "type": "@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter", "typeVersion": 1, "position": [-120, 260]},
    {"parameters": {"options": {}}, "id": "f6631009-dc21-4593-8752-9b2f467f31d7", "name": "When chat message received", "type": "@n8n/n8n-nodes-langchain.chatTrigger", "typeVersion": 1.1, "position": [80, -300], "webhookId": "25d8bd49-525e-4c56-8987-bb264c95afdc"},
    {"parameters": {"options": {"systemMessage": "You are the Valencia Event Knowledge Assistant. Reply in the same language as the user. For every question, always call the event_documents tool before answering. Use only facts supported by its returned pageContent. End every supported answer with a line formatted as Sources: <file_name[, file_name]>. Copy filenames only from returned metadata and list every file used. If a detail is not supported, say the event documents do not provide it. Never answer from general knowledge."}}, "id": "2a62e2dd-29ef-485d-9eb8-f79990f43f24", "name": "Answer with sources", "type": "@n8n/n8n-nodes-langchain.agent", "typeVersion": 2, "position": [340, -300], "notesInFlow": true, "notes": "The prompt requires retrieval before every answer and filenames copied from retrieved metadata."},
    {"parameters": {"model": {"__rl": true, "mode": "list", "value": "gpt-4o-mini"}, "options": {}}, "id": "84d0175f-13bc-4bea-a737-6336c5cc0cc3", "name": "OpenAI Chat Model", "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi", "typeVersion": 1.2, "position": [260, -40]},
    {"parameters": {"mode": "retrieve-as-tool", "toolName": "event_documents", "memoryKey": {"__rl": true, "mode": "id", "value": "challenge_5_event_docs"}, "toolDescription": "Search the indexed Valencia event documents. Returned chunks include file_name, file_id, and source_url metadata. Always use this tool before answering an event question.", "topK": 6, "includeDocumentMetadata": true}, "id": "ee591b7a-4642-4620-9e6e-c9fb883a76d1", "name": "Search event documents", "type": "@n8n/n8n-nodes-langchain.vectorStoreInMemory", "typeVersion": 1.2, "position": [520, -40], "notesInFlow": true, "notes": "Uses the same memory key and embedding model as ingestion and returns metadata with each result."}
  ],
  "connections": {
    "Run document ingestion": {"main": [[{"node": "Find event text files", "type": "main", "index": 0}]]},
    "Find event text files": {"main": [[{"node": "Loop Over Items", "type": "main", "index": 0}]]},
    "Loop Over Items": {"main": [[], [{"node": "Download current file", "type": "main", "index": 0}]]},
    "Download current file": {"main": [[{"node": "Insert event documents", "type": "main", "index": 0}]]},
    "Insert event documents": {"main": [[{"node": "Loop Over Items", "type": "main", "index": 0}]]},
    "Embeddings OpenAI": {"ai_embedding": [[{"node": "Insert event documents", "type": "ai_embedding", "index": 0}, {"node": "Search event documents", "type": "ai_embedding", "index": 0}]]},
    "Default Data Loader": {"ai_document": [[{"node": "Insert event documents", "type": "ai_document", "index": 0}]]},
    "Recursive Character Text Splitter": {"ai_textSplitter": [[{"node": "Default Data Loader", "type": "ai_textSplitter", "index": 0}]]},
    "When chat message received": {"main": [[{"node": "Answer with sources", "type": "main", "index": 0}]]},
    "OpenAI Chat Model": {"ai_languageModel": [[{"node": "Answer with sources", "type": "ai_languageModel", "index": 0}]]},
    "Search event documents": {"ai_tool": [[{"node": "Answer with sources", "type": "ai_tool", "index": 0}]]}
  },
  "pinData": {},
  "active": false,
  "settings": {"executionOrder": "v1"},
  "versionId": "d14ac4c3-6594-428f-acd2-08272b78cb79",
  "meta": {"templateCredsSetupCompleted": false},
  "tags": []
}
```

## Bonus Workflow JSON

```json
{
  "name": "Challenge 5 – Google Drive RAG (Bonus)",
  "nodes": [
    {"parameters": {}, "id": "0b0a8a46-2bdb-4f65-86c5-d04bde0f4e01", "name": "Run document ingestion", "type": "n8n-nodes-base.manualTrigger", "typeVersion": 1, "position": [-1260, -300], "notesInFlow": true, "notes": "Run once after uploading the three fixture files, and again after an n8n restart."},
    {"parameters": {"resource": "fileFolder", "operation": "search", "searchMethod": "name", "queryString": "", "returnAll": true, "filter": {"folderId": {"__rl": true, "value": "REPLACE_WITH_YOUR_FOLDER_ID", "mode": "id"}, "whatToSearch": "files", "fileTypes": ["text/plain"], "includeTrashed": false}, "options": {"fields": ["id", "name", "mimeType", "webViewLink"]}}, "id": "635e540b-bb13-4284-a3de-fb9d4fb963ba", "name": "Find event text files", "type": "n8n-nodes-base.googleDrive", "typeVersion": 3, "position": [-1040, -300], "notesInFlow": true, "notes": "Returns every direct-child plain-text file from the dedicated Drive folder."},
    {"parameters": {"batchSize": 1, "options": {}}, "id": "843766a7-15d8-4d71-bf8d-c9119070a040", "name": "Loop Over Items", "type": "n8n-nodes-base.splitInBatches", "typeVersion": 3, "position": [-820, -300], "notesInFlow": true, "notes": "Processes one file at a time so loader expressions use the current file's metadata."},
    {"parameters": {"resource": "file", "operation": "download", "fileId": {"__rl": true, "value": "={{ $json.id }}", "mode": "id"}, "options": {"binaryPropertyName": "data", "fileName": "={{ $json.name }}", "googleFileConversion": {"conversion": {"docsToFormat": "text/plain"}}}}, "id": "85e0eb87-fbbd-4cb6-bfac-96548053994c", "name": "Download current file", "type": "n8n-nodes-base.googleDrive", "typeVersion": 3, "position": [-600, -180], "notesInFlow": true, "notes": "Downloads the current file into the binary field named data."},
    {"parameters": {"mode": "insert", "memoryKey": {"__rl": true, "mode": "id", "value": "challenge_5_event_docs"}, "clearStore": "={{ $runIndex === 0 }}"}, "id": "34df91c5-8078-499c-ae07-fad21c4df8cf", "name": "Insert event documents", "type": "@n8n/n8n-nodes-langchain.vectorStoreInMemory", "typeVersion": 1.2, "position": [-360, -180], "notesInFlow": true, "notes": "Clears the demo store on the first loop run, then inserts every file into the same memory key."},
    {"parameters": {"model": "text-embedding-3-small", "options": {}}, "id": "65ad22cc-87f0-423e-882b-018827dcc5d1", "name": "Embeddings OpenAI", "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi", "typeVersion": 1.2, "position": [-360, 100]},
    {"parameters": {"dataType": "binary", "binaryMode": "specificField", "binaryDataKey": "data", "loader": "auto", "textSplittingMode": "custom", "options": {"metadata": {"metadataValues": [{"name": "file_name", "value": "={{ $json.name }}"}, {"name": "file_id", "value": "={{ $json.id }}"}, {"name": "source_url", "value": "={{ $json.webViewLink }}"}]}}}, "id": "e2ef5e05-b0ed-4411-9e61-3c61b87d91c5", "name": "Default Data Loader", "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader", "typeVersion": 1.1, "position": [-120, 80], "notesInFlow": true, "notes": "Loads the downloaded binary and adds file_name, file_id, and source_url to every document chunk."},
    {"parameters": {"chunkSize": 800, "chunkOverlap": 120, "options": {}}, "id": "4399a141-8da3-4107-b3eb-692e4e948b43", "name": "Recursive Character Text Splitter", "type": "@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter", "typeVersion": 1, "position": [-120, 260]},
    {"parameters": {"options": {}}, "id": "f6631009-dc21-4593-8752-9b2f467f31d7", "name": "When chat message received", "type": "@n8n/n8n-nodes-langchain.chatTrigger", "typeVersion": 1.1, "position": [80, -300], "webhookId": "25d8bd49-525e-4c56-8987-bb264c95afdc"},
    {"parameters": {"options": {"systemMessage": "You are the Valencia Event Knowledge Assistant. Reply in the same language as the user. For every question, always call the event_documents tool before answering. Use only facts supported by its returned pageContent. End every supported answer with a line formatted as Sources: <file_name[, file_name]>. Copy filenames only from returned metadata and list every file used. Never answer from general knowledge. If the retrieved documents do not contain the answer, return exactly one matching sentence and nothing else: English: I could not find this in the event documents. Spanish: No pude encontrarlo en los documentos del evento. Ukrainian: У документах події немає цієї інформації. For any other language, use the English sentence. Do not add a Sources line to this fallback."}}, "id": "2a62e2dd-29ef-485d-9eb8-f79990f43f24", "name": "Answer or exact fallback", "type": "@n8n/n8n-nodes-langchain.agent", "typeVersion": 2, "position": [340, -300], "notesInFlow": true, "notes": "The bonus prompt adds deterministic localized fallbacks when retrieval cannot support an answer."},
    {"parameters": {"model": {"__rl": true, "mode": "list", "value": "gpt-4o-mini"}, "options": {}}, "id": "84d0175f-13bc-4bea-a737-6336c5cc0cc3", "name": "OpenAI Chat Model", "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi", "typeVersion": 1.2, "position": [260, -40]},
    {"parameters": {"mode": "retrieve-as-tool", "toolName": "event_documents", "memoryKey": {"__rl": true, "mode": "id", "value": "challenge_5_event_docs"}, "toolDescription": "Search the indexed Valencia event documents. Returned chunks include file_name, file_id, and source_url metadata. Always use this tool before answering an event question.", "topK": 6, "includeDocumentMetadata": true}, "id": "ee591b7a-4642-4620-9e6e-c9fb883a76d1", "name": "Search event documents", "type": "@n8n/n8n-nodes-langchain.vectorStoreInMemory", "typeVersion": 1.2, "position": [520, -40], "notesInFlow": true, "notes": "Uses the same memory key and embedding model as ingestion and returns metadata with each result."}
  ],
  "connections": {
    "Run document ingestion": {"main": [[{"node": "Find event text files", "type": "main", "index": 0}]]},
    "Find event text files": {"main": [[{"node": "Loop Over Items", "type": "main", "index": 0}]]},
    "Loop Over Items": {"main": [[], [{"node": "Download current file", "type": "main", "index": 0}]]},
    "Download current file": {"main": [[{"node": "Insert event documents", "type": "main", "index": 0}]]},
    "Insert event documents": {"main": [[{"node": "Loop Over Items", "type": "main", "index": 0}]]},
    "Embeddings OpenAI": {"ai_embedding": [[{"node": "Insert event documents", "type": "ai_embedding", "index": 0}, {"node": "Search event documents", "type": "ai_embedding", "index": 0}]]},
    "Default Data Loader": {"ai_document": [[{"node": "Insert event documents", "type": "ai_document", "index": 0}]]},
    "Recursive Character Text Splitter": {"ai_textSplitter": [[{"node": "Default Data Loader", "type": "ai_textSplitter", "index": 0}]]},
    "When chat message received": {"main": [[{"node": "Answer or exact fallback", "type": "main", "index": 0}]]},
    "OpenAI Chat Model": {"ai_languageModel": [[{"node": "Answer or exact fallback", "type": "ai_languageModel", "index": 0}]]},
    "Search event documents": {"ai_tool": [[{"node": "Answer or exact fallback", "type": "ai_tool", "index": 0}]]}
  },
  "pinData": {},
  "active": false,
  "settings": {"executionOrder": "v1"},
  "versionId": "6d299514-9819-48b3-b4f5-1d0080a87b5b",
  "meta": {"templateCredsSetupCompleted": false},
  "tags": []
}
```

# English

## Title
Ask Your Google Drive

## Summary
Build a RAG assistant that searches a Google Drive knowledge folder before answering and names the files that support each answer.

## Concept
Document ingestion, semantic retrieval, and answers grounded in source files

## Scenario
- An event team keeps venue, volunteer, and sponsor facts in Drive and wants one grounded chat assistant for all three.
- New volunteers need reliable setup answers with the correct handbook filename.
- Organizers want unsupported questions to produce an honest fallback instead of a plausible guess.

## Task
The Valencia event team needs a chat assistant that answers questions using every supplied document in its Google Drive folder and names the files that support each answer.

## Bonus Task
For the question "Does the event provide an airport shuttle?", reply exactly "I could not find this in the event documents." and add nothing else.

## Nodes
- Manual Trigger
- Google Drive – two instances for Search files and folders and Download file
- Loop Over Items
- Default Data Loader
- Recursive Character Text Splitter
- Embeddings OpenAI
- Simple Vector Store – two instances for inserting and searching
- Chat Trigger
- OpenAI Chat Model
- AI Agent

## Preparation
- Sign up for [n8n Cloud](/n8n-sign-up) or open an up-to-date n8n workspace, then create a new workflow.
- Create or sign in to a [Google account](https://accounts.google.com/signup), then add a Google Drive connection by following the [n8n Google credential guide](https://docs.n8n.io/integrations/builtin/credentials/google/).
- Create an [OpenAI account](https://platform.openai.com/signup), create an [API key](https://platform.openai.com/api-keys), and store it in n8n using the [OpenAI credential guide](https://docs.n8n.io/integrations/builtin/credentials/openai/). API usage may incur a small charge.
- Download [the venue guide](https://raw.githubusercontent.com/itspoma/n8n-challenges/main/public/fixtures/google-drive-rag/valencia-event-venue-guide.txt), [the volunteer handbook](https://raw.githubusercontent.com/itspoma/n8n-challenges/main/public/fixtures/google-drive-rag/valencia-event-volunteer-handbook.txt), and [the sponsor logistics file](https://raw.githubusercontent.com/itspoma/n8n-challenges/main/public/fixtures/google-drive-rag/valencia-event-sponsor-logistics.txt). Upload only these three `.txt` files as direct children of a new Drive folder, then copy its folder ID.
- Use Simple Vector Store only for this workshop demo: it keeps its index in n8n memory, can expose it to other users of the same instance, and loses it after a restart or low-memory cleanup. Re-run ingestion before testing chat after either event, and do not use sensitive documents.

## Requirements
- One Manual Trigger run finds and downloads all three direct-child `.txt` files and indexes their chunks under `challenge_5_event_docs`, with `file_name`, `file_id`, and `source_url` metadata preserved on every chunk.
- After ingestion, "Where and when should volunteers check in?" returns the North Entrance at 08:00, and "When and where may sponsors deliver materials?" returns Loading Bay B from 07:00 to 08:00; each answer ends with a `Sources:` line containing the correct fixture filename.
- The AI Agent calls the `event_documents` retrieval tool before every answer and, for the bonus test question, returns the exact not-found sentence without a `Sources:` line.

## Tips
- Start with Manual Trigger and Google Drive: search the dedicated folder with Return All enabled, limit the result to files, and prove that all three IDs, names, and web links are returned before downloading anything.
- Add Loop Over Items with a batch size of 1, then a second Google Drive node set to Download file; one-at-a-time processing makes the current file's metadata unambiguous to AI sub-nodes.
- Connect Default Data Loader to the insert-mode Simple Vector Store, load the `data` binary field, and attach `file_name`, `file_id`, and `source_url` as metadata – labels stored beside every piece of document text.
- Add Recursive Character Text Splitter with chunk size 800 and overlap 120, then connect one Embeddings OpenAI node using `text-embedding-3-small` to both Simple Vector Store nodes; chunks are overlapping passages, and embeddings are numeric meaning signatures used for semantic search.
- Finish with Chat Trigger, OpenAI Chat Model, AI Agent, and the retrieve-as-tool Simple Vector Store; reuse `challenge_5_event_docs`, include document metadata, require the agent to call `event_documents`, and run both supported questions plus the exact airport-shuttle bonus test.

# Spanish

## Title
Pregúntale a tu Google Drive

## Summary
Crea un asistente RAG que busque en una carpeta de conocimiento de Google Drive antes de responder y nombre los archivos que respaldan cada respuesta.

## Concept
Ingesta de documentos, búsqueda semántica y respuestas fundamentadas en archivos fuente

## Scenario
- El equipo de un evento guarda información del espacio, del voluntariado y de patrocinadores en Drive y quiere un único asistente fundamentado para los tres ámbitos.
- El nuevo voluntariado necesita respuestas fiables sobre la preparación con el nombre correcto del manual.
- La organización quiere que las preguntas sin respaldo produzcan una respuesta honesta en lugar de una suposición convincente.

## Task
El equipo de eventos de Valencia necesita un asistente de chat que responda preguntas usando todos los documentos proporcionados en su carpeta de Google Drive y nombre los archivos que respaldan cada respuesta.

## Bonus Task
Para la pregunta "¿El evento ofrece un traslado desde el aeropuerto?", responde exactamente "No pude encontrarlo en los documentos del evento." y no añadas nada más.

## Nodes
- Manual Trigger
- Google Drive – dos instancias para Search files and folders y Download file
- Loop Over Items
- Default Data Loader
- Recursive Character Text Splitter
- Embeddings OpenAI
- Simple Vector Store – dos instancias para insertar y buscar
- Chat Trigger
- OpenAI Chat Model
- AI Agent

## Preparation
- Regístrate en [n8n Cloud](/n8n-sign-up) o abre un espacio de n8n actualizado y crea un workflow nuevo.
- Crea una [cuenta de Google](https://accounts.google.com/signup) o inicia sesión y añade una conexión de Google Drive siguiendo la [guía de credenciales de Google para n8n](https://docs.n8n.io/integrations/builtin/credentials/google/).
- Crea una [cuenta de OpenAI](https://platform.openai.com/signup), genera una [API key](https://platform.openai.com/api-keys) y guárdala en n8n con la [guía de credenciales de OpenAI](https://docs.n8n.io/integrations/builtin/credentials/openai/). El uso de la API puede generar un pequeño coste.
- Descarga [la guía del espacio](https://raw.githubusercontent.com/itspoma/n8n-challenges/main/public/fixtures/google-drive-rag/valencia-event-venue-guide.txt), [el manual de voluntariado](https://raw.githubusercontent.com/itspoma/n8n-challenges/main/public/fixtures/google-drive-rag/valencia-event-volunteer-handbook.txt) y [el archivo de logística para patrocinadores](https://raw.githubusercontent.com/itspoma/n8n-challenges/main/public/fixtures/google-drive-rag/valencia-event-sponsor-logistics.txt). Sube únicamente estos tres archivos `.txt` como hijos directos de una nueva carpeta de Drive y copia su ID.
- Usa Simple Vector Store solo para esta demostración: guarda el índice en la memoria de n8n, puede exponerlo a otras personas de la misma instancia y lo pierde tras un reinicio o una limpieza por poca memoria. Vuelve a ejecutar la ingesta antes de probar el chat después de cualquiera de esos eventos y no uses documentos sensibles.

## Requirements
- Una ejecución de Manual Trigger encuentra y descarga los tres archivos `.txt` que son hijos directos e indexa sus fragmentos bajo `challenge_5_event_docs`, conservando los metadatos `file_name`, `file_id` y `source_url` en cada fragmento.
- Después de la ingesta, "¿Dónde y cuándo debe registrarse el voluntariado?" devuelve North Entrance a las 08:00 y "¿Cuándo y dónde pueden entregar material los patrocinadores?" devuelve Loading Bay B de 07:00 a 08:00; cada respuesta termina con una línea `Sources:` que contiene el nombre correcto del archivo de prueba.
- AI Agent llama a la herramienta de búsqueda `event_documents` antes de cada respuesta y, para la pregunta de prueba extra, devuelve la frase exacta de no encontrado sin una línea `Sources:`.

## Tips
- Empieza con Manual Trigger y Google Drive: busca en la carpeta dedicada con Return All activado, limita el resultado a archivos y comprueba que aparecen los tres ID, nombres y enlaces web antes de descargar nada.
- Añade Loop Over Items con un tamaño de lote de 1 y después un segundo nodo Google Drive configurado como Download file; procesar de uno en uno deja claro a los subnodos de IA qué metadatos pertenecen al archivo actual.
- Conecta Default Data Loader al Simple Vector Store en modo insert, carga el campo binario `data` y añade `file_name`, `file_id` y `source_url` como metadatos – etiquetas guardadas junto a cada parte del texto del documento.
- Añade Recursive Character Text Splitter con un tamaño de fragmento de 800 y un solapamiento de 120; conecta después un nodo Embeddings OpenAI con `text-embedding-3-small` a los dos Simple Vector Store. Los fragmentos son pasajes que se solapan y los embeddings son firmas numéricas de significado para la búsqueda semántica.
- Termina con Chat Trigger, OpenAI Chat Model, AI Agent y Simple Vector Store en modo retrieve-as-tool; reutiliza `challenge_5_event_docs`, incluye los metadatos, exige que el agente llame a `event_documents` y ejecuta las dos preguntas cubiertas y la prueba extra exacta del traslado.

# Ukrainian

## Title
Запитай свій Google Drive

## Summary
Створіть RAG-асистента, який перед відповіддю шукає в папці знань Google Drive і називає файли, що підтверджують кожну відповідь.

## Concept
Завантаження документів, семантичний пошук і відповіді, обґрунтовані файлами-джерелами

## Scenario
- Команда події зберігає у Drive відомості про приміщення, волонтерів і спонсорів та хоче мати одного обґрунтованого асистента для всіх трьох тем.
- Новим волонтерам потрібні надійні відповіді щодо підготовки з правильною назвою файла посібника.
- Організатори хочуть, щоб на запитання без підтвердження система давала чесну відмову, а не правдоподібну здогадку.

## Task
Команді подій у Валенсії потрібен чат-асистент, який відповідає на запитання за всіма наданими документами з папки Google Drive і називає файли, що підтверджують кожну відповідь.

## Bonus Task
На запитання "Чи надає подія трансфер з аеропорту?" дайте точну відповідь "У документах події немає цієї інформації." і нічого більше не додавайте.

## Nodes
- Manual Trigger
- Google Drive – дві ноди для Search files and folders і Download file
- Loop Over Items
- Default Data Loader
- Recursive Character Text Splitter
- Embeddings OpenAI
- Simple Vector Store – дві ноди для додавання та пошуку
- Chat Trigger
- OpenAI Chat Model
- AI Agent

## Preparation
- Зареєструйтеся в [n8n Cloud](/n8n-sign-up) або відкрийте актуальний воркспейс n8n, а потім створіть новий воркфлоу.
- Створіть [обліковий запис Google](https://accounts.google.com/signup) або ввійдіть у нього та додайте підключення Google Drive за [інструкцією n8n для облікових даних Google](https://docs.n8n.io/integrations/builtin/credentials/google/).
- Створіть [обліковий запис OpenAI](https://platform.openai.com/signup), згенеруйте [API key](https://platform.openai.com/api-keys) і збережіть його в n8n за [інструкцією для облікових даних OpenAI](https://docs.n8n.io/integrations/builtin/credentials/openai/). Використання API може мати невелику вартість.
- Завантажте [посібник приміщення](https://raw.githubusercontent.com/itspoma/n8n-challenges/main/public/fixtures/google-drive-rag/valencia-event-venue-guide.txt), [довідник волонтера](https://raw.githubusercontent.com/itspoma/n8n-challenges/main/public/fixtures/google-drive-rag/valencia-event-volunteer-handbook.txt) і [файл логістики спонсорів](https://raw.githubusercontent.com/itspoma/n8n-challenges/main/public/fixtures/google-drive-rag/valencia-event-sponsor-logistics.txt). Додайте лише ці три файли `.txt` безпосередньо до нової папки Drive і скопіюйте її ID.
- Використовуйте Simple Vector Store лише для цієї демонстрації: він тримає індекс у пам’яті n8n, може відкривати його іншим користувачам того самого екземпляра та втрачає його після перезапуску або очищення через нестачу пам’яті. Після будь-якої з цих подій повторно запустіть завантаження перед перевіркою чату та не використовуйте конфіденційні документи.

## Requirements
- Один запуск Manual Trigger знаходить і завантажує всі три файли `.txt`, що є безпосередніми дочірніми файлами папки, та індексує їхні фрагменти під ключем `challenge_5_event_docs`, зберігаючи метадані `file_name`, `file_id` і `source_url` у кожному фрагменті.
- Після завантаження запитання "Де й коли мають зареєструватися волонтери?" повертає North Entrance о 08:00, а "Коли й куди спонсори можуть доставити матеріали?" повертає Loading Bay B з 07:00 до 08:00; кожна відповідь завершується рядком `Sources:` із правильною назвою файла-фікстури.
- AI Agent викликає інструмент пошуку `event_documents` перед кожною відповіддю, а для додаткового тестового запитання повертає точну фразу про відсутність інформації без рядка `Sources:`.

## Tips
- Почніть із Manual Trigger і Google Drive: виконайте пошук у спеціальній папці з увімкненим Return All, обмежте результат файлами та перевірте наявність усіх трьох ID, назв і вебпосилань до завантаження.
- Додайте Loop Over Items із розміром пакета 1, а потім другу ноду Google Drive з операцією Download file; послідовна обробка однозначно пов’язує метадані поточного файла із субнодами ШІ.
- Підключіть Default Data Loader до Simple Vector Store у режимі insert, завантажте бінарне поле `data` й додайте `file_name`, `file_id` і `source_url` як метадані – мітки, що зберігаються поряд із кожною частиною тексту документа.
- Додайте Recursive Character Text Splitter із розміром фрагмента 800 і перекриттям 120, а потім підключіть одну ноду Embeddings OpenAI з `text-embedding-3-small` до обох Simple Vector Store; фрагменти – це уривки тексту з перекриттям, а ембеддинги – числові відбитки змісту для семантичного пошуку.
- Завершіть нодами Chat Trigger, OpenAI Chat Model, AI Agent і Simple Vector Store у режимі retrieve-as-tool; повторно використайте `challenge_5_event_docs`, додайте метадані документів, вимагайте виклику `event_documents` і виконайте два підтверджені запитання та точний додатковий тест про трансфер.
