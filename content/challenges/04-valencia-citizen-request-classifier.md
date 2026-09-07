---
number: 4
slug: valencia-citizen-request-classifier
difficulty: intermediate
time: 30–40 min
complexity: 3
color: #a9d96c
ink: #1b2427
---

# English

## Title
Valencia Citizen Request Classifier

## Summary
Classify a citizen request with AI, route it to the right team, and acknowledge the sender.

## Concept
Structured AI output, branching, and email delivery

## Scenario
- A city support desk receives requests about different services and needs consistent triage before review.
- An event help desk wants to separate accessibility, venue, and schedule questions automatically.
- A community inbox needs to identify urgent requests before routine messages.

## Task
Create a form for a person's name, email, and request. Use AI to return category, priority, and summary, route the request to the matching support destination, and send a separate thank-you email to the person.

## Bonus Task
Add a short suggested reply in the requester's language to the structured AI output and include it in the thank-you email.

## Nodes
- Form Trigger
- Basic LLM Chain
- Structured Output Parser
- Switch
- Resend

## Preparation
- Add a credential for an AI chat model supported by your n8n workspace.
- Ask a mentor for the event Resend credential and approved test addresses; do not use real citizen data.

## Requirements
- Collect name, email, and request through an n8n form.
- Return structured category, priority, and summary fields from the AI step.
- Restrict category to waste, noise, roads, parks, or other and priority to low, medium, or high.
- Route each category to its configured support destination and include the original request plus the AI result.
- Send a separate thank-you email containing a request ID, then test a normal, urgent, and ambiguous request.

## Tips
- First capture one representative form submission so every downstream field is available.
- Tell the model exactly which category and priority values are allowed.
- Attach a Structured Output Parser with the three required fields instead of parsing free text.
- Use Switch on category and make other the fallback branch.
- Build and test the support email first, then add the separate acknowledgment email.

# Spanish

## Title
Clasificador de solicitudes ciudadanas de Valencia

## Summary
Clasifica una solicitud ciudadana con IA, envíala al equipo correcto y confirma su recepción.

## Concept
Salida estructurada de IA, ramificación y envío de emails

## Scenario
- Un servicio municipal recibe solicitudes sobre distintos temas y necesita clasificarlas antes de revisarlas.
- El equipo de ayuda de un evento quiere separar automáticamente preguntas de accesibilidad, espacio y horario.
- Un buzón comunitario necesita identificar solicitudes urgentes antes que los mensajes rutinarios.

## Task
Crea un formulario para el nombre, el email y la solicitud de una persona. Usa IA para devolver category, priority y summary, dirige la solicitud al destino de soporte correspondiente y envía un email de agradecimiento separado a la persona.

## Bonus Task
Añade una respuesta breve sugerida en el idioma de la persona a la salida estructurada de la IA e inclúyela en el email de agradecimiento.

## Nodes
- Form Trigger
- Basic LLM Chain
- Structured Output Parser
- Switch
- Resend

## Preparation
- Añade una credencial para un modelo de chat con IA compatible con tu espacio de n8n.
- Pide a un mentor la credencial de Resend del evento y las direcciones de prueba aprobadas; no uses datos reales de ciudadanos.

## Requirements
- Recoge nombre, email y solicitud mediante un formulario de n8n.
- Devuelve desde el paso de IA los campos estructurados category, priority y summary.
- Limita category a waste, noise, roads, parks u other y priority a low, medium o high.
- Dirige cada categoría a su destino de soporte configurado e incluye la solicitud original y el resultado de la IA.
- Envía un email de agradecimiento separado con un ID de solicitud y prueba una solicitud normal, una urgente y una ambigua.

## Tips
- Primero captura un envío representativo del formulario para disponer de todos los campos posteriores.
- Indica al modelo exactamente qué valores de categoría y prioridad están permitidos.
- Conecta un Structured Output Parser con los tres campos obligatorios en lugar de interpretar texto libre.
- Usa Switch con category y convierte other en la rama alternativa.
- Construye y prueba primero el email de soporte y después añade el email de confirmación separado.

# Ukrainian

## Title
Класифікатор звернень мешканців Валенсії

## Summary
Класифікуйте звернення мешканця за допомогою ШІ, спрямуйте його відповідній команді та підтвердьте отримання відправнику.

## Concept
Структурований результат ШІ, розгалуження та надсилання електронної пошти

## Scenario
- Міська служба підтримки отримує звернення щодо різних послуг і потребує послідовного сортування перед розглядом.
- Служба підтримки події хоче автоматично розділяти запитання про доступність, місце проведення та розклад.
- Скринька спільноти має визначати термінові звернення раніше за звичайні повідомлення.

## Task
Створіть форму для імені, електронної адреси та звернення людини. За допомогою ШІ поверніть категорію, пріоритет і короткий опис, спрямуйте звернення відповідній службі підтримки та надішліть людині окремий лист-подяку.

## Bonus Task
Додайте до структурованого результату ШІ коротку запропоновану відповідь мовою заявника та включіть її до листа-подяки.

## Nodes
- Form Trigger
- Basic LLM Chain
- Structured Output Parser
- Switch
- Resend

## Preparation
- Додайте облікові дані моделі ШІ для чату, яку підтримує ваш воркспейс n8n.
- Попросіть у ментора облікові дані Resend для події та схвалені тестові адреси; не використовуйте реальні дані мешканців.

## Requirements
- Збирайте ім’я, електронну адресу та звернення через форму n8n.
- Повертайте з кроку ШІ структуровані поля category, priority і summary.
- Обмежте category значеннями waste, noise, roads, parks або other, а priority — значеннями low, medium або high.
- Спрямовуйте кожну категорію до налаштованої служби підтримки та додавайте початкове звернення разом з результатом ШІ.
- Надішліть окремий лист-подяку з ID звернення, а потім протестуйте звичайне, термінове й неоднозначне звернення.

## Tips
- Спочатку отримайте одну репрезентативну заявку з форми, щоб усі наступні поля були доступні.
- Точно вкажіть моделі, які значення категорії та пріоритету дозволено.
- Підключіть Structured Output Parser із трьома обов’язковими полями замість розбору довільного тексту.
- Використайте Switch для category, а other зробіть резервною гілкою.
- Спочатку створіть і протестуйте лист до служби підтримки, а потім додайте окремий лист-підтвердження.
