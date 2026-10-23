---
{
  "id": "opp_6cafdbe6-d1b7-42bb-a77b-644c6da0909b",
  "locale": "uk",
  "slug": "article-6cafdbe6-d1b7-42bb-a77b-644c6da0909b",
  "urlSlug": "treker-vytrat-u-n8n-redaktsiyna-vprava-zi-zboru-ta-perevirky-danykh",
  "publishedAt": "2026-10-23T16:27:27.454Z",
  "title": "Трекер витрат у n8n: редакційна вправа зі збору та перевірки даних",
  "subtitle": "Створіть тестовий трекер витрат у n8n із формою, чеками в Google Drive, спільною таблицею Google Sheets і синтетичними записами для порівняння.",
  "description": "Створіть тестовий трекер витрат у n8n із формою, чеками в Google Drive, спільною таблицею Google Sheets і синтетичними записами для порівняння.",
  "date": "2026-10-23",
  "sourcesCheckedAt": "2026-10-23T16:16:01.645Z",
  "tags": [
    "n8n",
    "Перетворення даних",
    "Практичне навчання",
    "Вправа"
  ],
  "coverImage": "/blog/uk/article-6cafdbe6-d1b7-42bb-a77b-644c6da0909b/1f1ebec369c593ac165f964ffde0989c3c3db51323b039eea5156fcbb9f8fb4c.webp",
  "coverAlt": "У лотку лежать чеки та жетони валют, а рука переносить один чек до окремого лотка для перевірки.",
  "seo": {
    "title": "Трекер витрат у n8n: редакційна вправа зі збору та перевірки даних",
    "description": "Створіть тестовий трекер витрат у n8n із формою, чеками в Google Drive, спільною таблицею Google Sheets і синтетичними записами для порівняння.",
    "keywords": []
  },
  "revision": "0416639f2a69c94da47b1340dce9ce6a5f79956c3a6c19a913250cfc6f9f0de3"
}
---

## Редакційна вправа: визначте вимоги до трекера витрат у n8n

Створіть трекер витрат у n8n, який збирає синтетичні витрати, завантажує навчальні чеки в Google Drive та записує суми й валюти у спільну таблицю Google Sheets. Надсилайте записи, явно позначені як сумнівні, призначеній відповідальній особі для перевірки, а потім порівнюйте журнал із незалежною еталонною вкладкою. Це редакційна вправа: запропонований робочий процес не запускали й не перевіряли.

Використовуйте лише Test URL вузла Form Trigger. Налаштування облікових даних, розгортання у виробничому середовищі, OCR, конвертація валют, автоматичне погодження та банківська звірка не входять до цієї вправи. Вона не підтверджує дотримання бухгалтерських, податкових чи регуляторних вимог, безпечність транзакцій, запобігання дублікатам або надійне відновлення після часткових збоїв.

На нашу думку, корисний навчальний проєкт із фінансів має робити невизначеність видимою, перш ніж автоматизувати більше рішень.

Sources: [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md>)

Потрібен робочий простір для цієї вправи? Наше партнерське посилання відкриває власну сторінку реєстрації n8n, де ви можете зареєструватися в n8n Cloud.

**[Зареєструйтеся в n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Підготуйте робочий простір і синтетичні вхідні дані

Вам потрібні наявний робочий простір n8n, налаштовані облікові дані Google Drive і Google Sheets, папка Drive лише для практики та електронна таблиця зі спільним доступом для вас і призначеної відповідальної особи. Підготуйте файли навчальних чеків. Надана документація не має дати й не підтверджує сумісність з усіма встановленими версіями; перед початком перевірте доступні операції.

Використовуйте такі рекомендовані стовпці журналу: expense_id, amount, currency, receipt_file_id, review_required, review_owner і review_status. Зберігайте суми та валюти окремо й ніколи не об’єднуйте різні валюти в одну загальну суму витрат. Ці поля та правила перевірки — редакційні проєктні рішення.

Створіть незалежну еталонну вкладку лише з полями expense_id, amount і currency. Наведений нижче синтетичний тестовий набір навмисно містить однакові, змінені, відсутні та зайві записи. Усі валюти тут — EUR; додайте по одному навчальному чеку до кожної поданої витрати.

**Рекомендований синтетичний тестовий набір; суми є вхідними даними вправи, а не виміряними результатами.**

| ID витрати | Еталонна сума | Сума для подання | Є сумніви? |
| --- | --- | --- | --- |
| EXP-01 | 12,50 | 12,50 | Ні |
| EXP-02 | 8,00 | 9,00 | Так |
| EXP-03 | 5,00 | Не подавати | Не застосовується |
| EXP-04 | Відсутня | 7,00 | Ні |

Sources: [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md>)

## Побудуйте шлях збору даних і ручної перевірки

![Бланк, папка для чеків і журнал із прапорцем зображують шлях збору та перевірки даних у трекері витрат n8n.](/blog/uk/article-6cafdbe6-d1b7-42bb-a77b-644c6da0909b/a3f70059934778ce574b8cc6d6dc95d80a70a8f5d5a39ab047c57ea60de78b28.webp)

Предмети зображують подання даних, зберігання чека та запис у таблиці, доступний для перевірки.

Form Trigger підтримує елементи File і Number та передає подані дані в робочий процес. Документація Google Drive описує завантаження бінарних вхідних даних у вибрану папку, а Google Sheets підтримує Append Row із ручним зіставленням стовпців. Дотримуйтеся запропонованої послідовності побудови.

1. Створіть у формі поля для expense_id, числового amount, currency, завантаження чека та явного вибору щодо сумнівів.
2. Виберіть Execute Workflow і надішліть форму через Test URL; перегляньте вихідні дані, щоб знайти фактичне бінарне поле чека.
3. Налаштуйте Google Drive Upload, указавши свої облікові дані, це бінарне поле та навчальну папку.
4. Збережіть подані значення витрати разом з отриманим ідентифікатором файлу для гілок запису рядків.
5. Вручну зіставте кожне значення витрати, receipt_file_id і поля перевірки у Google Sheets Append Row.

Використовуйте порівняння у вузлі If для явного вибору щодо сумнівів. У гілці для сумнівних записів перед додаванням рядка встановіть review_required у true, review_owner — в ім’я призначеної відповідальної особи, а review_status — у pending. В іншій гілці використовуйте false, порожнє значення відповідальної особи та not_requested. Це рекомендовані позначення, а не перевірена фінансова політика.

Нехай відповідальна особа перегляне записи зі статусом pending і вручну оновить їхній статус у таблиці. Окремо перевірте доступ до чеків: спільний доступ до електронної таблиці не надає доступу до чеків. Google Drive підтримує надання дозволів окремим користувачам або групам.

Sources: [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md>), [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.if.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.if.md>)

Керуєте командою, яка вчиться збирати й зіставляти дані та будувати процеси ручної перевірки? Наша програма n8n Corporate Fundamentals пропонує індивідуально підготовлене навчання для команди на її власних інструментах, даних та інстансі n8n. Посилання відкриває сторінку «Для компаній» на цьому сайті.

**[Дізнатися про навчання n8n](https://n8n-challenges.app/uk/companies)**

## Порівняйте трекер витрат у n8n з еталоном

![Дві стопки бланків витрат показують однакові, змінені та непарні записи в журналі й еталоні.](/blog/uk/article-6cafdbe6-d1b7-42bb-a77b-644c6da0909b/b4f367563eab31e9179d5d9375d99059c34873bfc74f885952edd8eface6e91d.webp)

Парні та непарні бланки ілюструють синтетичні випадки для порівняння.

Прочитайте обидві вкладки за допомогою Google Sheets Get Row(s), без фільтрів. Підготуйте обидва входи порівняння лише з полями expense_id, amount і currency, використовуючи однакові типи полів. Виключіть ідентифікатори чеків і метадані перевірки, щоб вони не створювали несуттєвих відмінностей.

Надана реалізація в репозиторії оголошує версії вузла Compare Datasets 1, 2, 2.1, 2.2 і 2.3, поля зіставлення та чотири виходи порівняння.

Для цього запропонованого рішення під’єднайте навчальний журнал до входу A, а еталон — до входу B, зіставляючи записи за expense_id. Тестовий набір має дати EXP-01 на виході Same, EXP-02 — Different, EXP-03 — In B only, а EXP-04 — In A only. Поясніть кожну розбіжність, перш ніж виправляти її та повторювати порівняння.

Sources: [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md>), [n8n/packages/nodes-base/nodes/CompareDatasets/CompareDatasets.node.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/CompareDatasets/CompareDatasets.node.ts>)

## Перевірте завершення та знайдіть причини розбіжностей

Ваш трекер витрат у n8n завершений у межах цієї вправи лише тоді, коли ви спостерігаєте виконання наведених нижче умов. Очищуйте навчальний журнал між повними циклами збору даних.

- [ ] Подані суми та валюти збережені в журналі.
- [ ] Призначена відповідальна особа може відкрити кожен завантажений чек.
- [ ] Сумнівні записи мають призначену відповідальну особу та статус pending до перевірки.
- [ ] Незмінені, змінені, відсутні та зайві тестові записи потрапляють на очікувані виходи.

Якщо якась умова не виконується, спочатку перевірте подане бінарне поле та папку завантаження, а потім — ручне зіставлення стовпців. Перевірте дозволи на чеки від імені відповідальної особи. Якщо виникають розбіжності під час порівняння, перевірте [ідентифікатори зіставлення](<https://n8n-challenges.app/uk/blog/n8n-i-google-sheets-zistavlennya-id-ta-onovlennya-vyznachenykh-stovptsiv>) та типи полів на обох входах.

Sources: [n8n-docs/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-operations.md>), [n8n-docs/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md at main · n8n-io/n8n-docs · GitHub](<https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations.md>), [n8n/packages/nodes-base/nodes/CompareDatasets/CompareDatasets.node.ts at master · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/CompareDatasets/CompareDatasets.node.ts>)

## Поміркуйте перед повторним використанням шаблону трекера витрат у n8n

Оцінюючи шаблон трекера витрат у n8n, сприймайте цей проєкт як навчальну специфікацію. Рекомендовані запитання для роздумів: хто перебирає обов’язки, коли відповідальна за перевірку особа відсутня? Хто повинен мати доступ до чеків? Як обробляти повторні подання та ситуацію, коли після завантаження файлу не вдалося додати рядок?

На нашу думку, команда має узгодити [правила відповідальності та відновлення](<https://n8n-challenges.app/uk/blog/cheklist-dopusku-importovanykh-shabloniv-robochykh-protsesiv-n8n-do-prodakshenu>), перш ніж підключати навчальний робочий процес до реальних фінансових даних.

Отримайте практичну допомогу з перевіркою доступу до чеків, відповідальності за їхній перегляд і зручності супроводу робочих процесів вашої команди завдяки нашій програмі Workflow Audit. Вона передбачає перевірку вашого інстансу n8n і робочих процесів на надійність, безпеку та зручність супроводу; посилання відкриває сторінку «Для компаній» на цьому сайті.

**[Аудит командних процесів обліку витрат](https://n8n-challenges.app/uk/companies)**

Tags: n8n, Перетворення даних, Практичне навчання, Вправа
