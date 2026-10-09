---
{
  "id": "opp_18de42c2-df6b-41c1-b4a1-36f421e8b44d",
  "locale": "uk",
  "slug": "article-18de42c2-df6b-41c1-b4a1-36f421e8b44d",
  "urlSlug": "n8n-sso-dlya-self-hosted-chek-lyst-litsenzuvannya-ta-nalashtuvannya",
  "publishedAt": "2026-10-09T07:14:52.341Z",
  "title": "n8n SSO для self-hosted: чек-лист ліцензування та налаштування",
  "subtitle": "Практичний чек-лист n8n SSO для self-hosted: яка редакція та ліцензія потрібна, чим різниться вмикання SAML і OIDC, і де доречні community-рішення.",
  "description": "Практичний чек-лист n8n SSO для self-hosted: яка редакція та ліцензія потрібна, чим різниться вмикання SAML і OIDC, і де доречні community-рішення.",
  "date": "2026-10-09",
  "sourcesCheckedAt": "2026-10-09T06:45:42.561Z",
  "tags": [
    "n8n",
    "Самостійний хостинг",
    "Ліцензування SSO",
    "Чек-лист"
  ],
  "coverImage": "/blog/uk/article-18de42c2-df6b-41c1-b4a1-36f421e8b44d/5a0ced8ce52cf4ebc113f62c73590fb4858be549c057a06f9e0318ae7a2f1c90.png",
  "coverAlt": "Два ключі та замки різного розміру лежать поруч із невеликою серверною стійкою, символізуючи варіанти ліцензування n8n SSO для self-hosted.",
  "seo": {
    "title": "n8n SSO для self-hosted: чек-лист ліцензування та налаштування",
    "description": "Практичний чек-лист n8n SSO для self-hosted: яка редакція та ліцензія потрібна, чим різниться вмикання SAML і OIDC, і де доречні community-рішення.",
    "keywords": []
  },
  "revision": "ece46ab9459be2b90912bce365ef0cf140dd64f0628af3d8f7168d6d8877c804"
}
---

## Перевірте, яке розгортання та редакцію n8n ви використовуєте

Якщо ви ops- або IT-лід, який намагається увімкнути n8n SSO для self-hosted, розгалуження за ліцензією настає раніше за будь-яке розгалуження за налаштуваннями. Єдиний вхід (SSO) — це не те, що може увімкнути будь-який self-hosted інстанс. У власній документації n8n SSO, що охоплює як SAML, так і LDAP, зазначено серед функцій, яких немає у безкоштовній редакції Community. Якщо ваша команда досі на Community, це перша стіна, в яку ви впретесь ще до того, як матимуть значення будь-які налаштування SAML чи OIDC.

Настанови n8n щодо вибору способу використання продукту підтверджують той самий паттерн з іншого боку: організації, яким потрібні корпоративні функції, як-от SSO, середовища (environments) або проєкти, отримують їх через платний план — незалежно від того, працює цей план на n8n Cloud чи на вашій власній self-hosted інфраструктурі. Тож справжнє питання не просто «self-hosted проти cloud»; воно в тому, чи перебуваєте ви взагалі на [платній, ліцензованій редакції](<https://n8n-challenges.app/uk/blog/n8n-sso-chy-vona-vam-potribna-chy-spilni-lohiny-tsilkom-pidiydut>).

Цей чек-лист охоплює лише SAML та OIDC — два протоколи, які документація n8n називає підтримуваними для єдиного входу; він не охоплює кроки налаштування, специфічні для LDAP, оскільки документація з налаштування LDAP не входила до того, що ми розглядали.

Sources: [Configure SSO | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/configure-sso>), [Compare editions | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/community-edition-features>), [Choose how to use n8n | n8n Docs](<https://docs.n8n.io/choose-how-to-use-n8n>)

## Ліцензування n8n SSO для self-hosted: Business проти Enterprise

![Менший закритий сейф стоїть поруч із більшим сейфом, прочиненим, що символізує плани n8n Business та Enterprise.](/blog/uk/article-18de42c2-df6b-41c1-b4a1-36f421e8b44d/e9d5a090a0fe0832493ab7584991af1e7c5ea7da82fa26d8346df1f6a7c9305d.png)

Менший і більший сейфи стоять поруч, показуючи два self-hosted плани, пов'язані з єдиним входом через SAML та OIDC.

Увімкнення n8n SSO для self-hosted починається з вибору протоколу, бо саме це визначає, який план вам насправді потрібен. Власна документація n8n із налаштування стверджує, що SAML SSO доступний на self-hosted планах Business та Enterprise, тоді як документація з OIDC обмежує OIDC лише планом Enterprise. Пост 2025 року на форумі ком'юніті n8n підсумував той самий розподіл для інших self-hosted користувачів: SAML входить до плану Business, OIDC — лише Enterprise. Якщо OIDC є пріоритетним протоколом вашого провайдера ідентифікації, закладайте бюджет на Enterprise, а не на Business.

**SAML проти OIDC у self-hosted n8n**

| Протокол | Мінімальний план | Джерело |
| --- | --- | --- |
| SAML | Business або Enterprise | Документація n8n «Set up SAML» |
| OIDC | Лише Enterprise | Документація n8n «Set up OIDC» |

Саме ліцензування — короткий, документований крок. Документація n8n з керування ліцензіями описує оформлення підписки на платний план для отримання ліцензійного ключа, а потім його активацію всередині продукту через Settings, Usage and plan, і Enter activation key.

Легко пропустити дві операційні деталі. У документації n8n зазначено, що ваш інстанс повинен мати доступ до сервера ліцензій n8n, тобто потрібно додати діапазон IP-адрес Cloudflare у білий список на вашому фаєрволі. А якщо автоматичне продовження колись вимкнене, хтось із вашої команди має вручну продовжувати ліцензію кожні 10 днів у Settings and Usage and plan — інакше кожна ліцензована функція, включно з SSO, вимикається.

У блог-пості одного незалежного розробника за грудень 2025 року вказано ліцензію 'Startup' від $400 на місяць як рівень, що відкриває SSO, хоча ця назва плану не збігається з термінами Business та Enterprise, які використовує власна документація n8n, тож її не вдалося перевірити за офіційними цінами. На нашу думку, доцільніше орієнтуватися на документований розподіл Business проти Enterprise, ніж на цифру, яку не вдалося підтвердити, і перевірити поточну [сторінку цін n8n](<https://n8n-challenges.app/uk/blog/vartist-n8n-taryfy-cloud-community-redaktsiya-ta-tsiny-enterprise>) перед тим, як брати на себе зобов'язання.

Sources: [Set up SAML | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-saml/set-up-saml>), [Set up OIDC | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-oidc/set-up-oidc>), [OIDC Auth with Self-hosted license Business - Questions - n8n Community](<https://community.n8n.io/t/oidc-auth-with-self-hosted-license-business/183933>), [Compare editions | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/community-edition-features>), [Manage your license | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/manage-your-license>), [License | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/license>), [Announcing n8n-oidc &bull; Cameron Eagans](<https://www.cweagans.net/2025/12/announcing-n8n-oidc/>)

## Виберіть протокол: SAML проти OIDC і що потрібно від вашого IdP для кожного

Сторінка n8n Configure SSO прямо зазначає, що SAML та OIDC — це два протоколи, які продукт підтримує для єдиного входу; жоден інший протокол не задокументовано як підтримуваний.

Для SAML документація з налаштування n8n описує процес усередині застосунку: відкрийте Settings, перейдіть до SSO, занотуйте n8n [Redirect URL та Entity ID](<https://n8n-challenges.app/uk/blog/yak-pratsyuye-sso-cherez-saml-u-n8n-shcho-pereviryty-pered-rozhortannyam>), які генерує інстанс, а потім передайте ці два значення вашому провайдеру ідентифікації, одночасно налаштовуючи відповідні параметри на стороні n8n.

![Увімкнення SAML в n8n: 1. Відкрийте налаштування SSO; 2. Занотуйте згенеровані значення; 3. Налаштуйте провайдера ідентифікації; 4. Перевірте з'єднання](/blog/uk/article-18de42c2-df6b-41c1-b4a1-36f421e8b44d/962f33c5e68f58e5826fb3b428cf07b54c2d69d0dd1033ef214071f8298af254.png)

Для OIDC документація n8n чітко зазначає, що увімкнути та налаштувати його може лише власник інстансу або адміністратор, що важливо враховувати, коли ви вирішуєте, хто в команді фактично виконуватиме цю роботу.

Sources: [Configure SSO | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/configure-sso>), [Set up SAML | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-saml/set-up-saml>), [Set up OIDC | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-oidc/set-up-oidc>)

## Увімкнення SSO через змінні середовища та надання ролей (залежить від версії)

Якщо ви радше керуватимете SSO як кодом, ніж клацатимете інтерфейсом, документація n8n зі змінних середовища стверджує, що керування SSO через змінні середовища стало доступним, починаючи з версії n8n 2.18.0. У старіших self-hosted версіях налаштування SAML та OIDC натомість має проходити через інтерфейс Settings.

Сам перемикач — це одна змінна: документація n8n зі змінних середовища для SSO каже, що встановлення N8N_SSO_MANAGED_BY_ENV у true передає налаштування SSO вашим змінним середовища. Та ж сторінка попереджає, що змінна SAML metadata XML та змінна SAML metadata URL є взаємовиключними, тож потрібно встановити лише одну з них, а не обидві.

Надання ролей (role provisioning) — це окрема, новіша можливість. Документація n8n стверджує, що автоматичне надання ролей на основі SSO, яке зіставляє [ролі інстансу та проєкту](<https://n8n-challenges.app/uk/blog/nalashtuvannya-keruvannya-korystuvachamy-n8n-do-toho-yak-komanda-pereroste-spilni-lohiny>) з вашого провайдера ідентифікації, доступне з версії n8n 1.122.2, з опцією instance_role, яка надає лише роль рівня інстансу, залишаючи доступ до проєктів для ручного керування. Ми з оптимізмом дивимося на те, що такі прив'язані до версії кроки свідчать про подальші інвестиції n8n в управління ідентифікацією, що з часом має полегшити розгортання. Команди, які досі працюють на старішій self-hosted версії, просто призначають ролі вручну.

Sources: [Manage settings using environment variables | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/manage-settings-using-environment-variables>), [SSO | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/sso>), [Set up OIDC | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-oidc/set-up-oidc>)

Правильно налаштувати SAML чи OIDC з першого разу — це не так про клацання в Settings, як про те, щоб команда разом розуміла плани, змінні середовища та надання ролей. n8n Advanced / Developer Training — це наша структурована програма, яка дає команді саме таку глибину знань, на ваших власних інструментах та інстансі n8n, а заявки надсилаються через нашу сторінку For companies.

**[Дізнатися про навчання n8n](https://n8n-challenges.app/uk/companies)**

## Переконайтеся, що ваше використання відповідає n8n Sustainable Use License

Ліцензування — це не лише технічний перемикач; це також питання умов використання. FAQ щодо ліцензії Community n8n стверджує, що використання корпоративних функцій, які потребують ліцензійного ключа, таких як SSO, без наявності ліцензії Enterprise виходить за межі того, що дозволяє безкоштовна Sustainable Use License.

Те саме FAQ уточнює область застосування: безкоштовна ліцензія Community стосується лише self-hosted версії n8n. n8n Cloud працює за власними окремими платними умовами, тож self-hosted і безкоштовне — не одне й те саме, щойно йдеться про SSO чи інші ліцензовані функції.

Sources: [License FAQ | n8n Community license | n8n Docs](<https://docs.n8n.io/n8n-community-license/community-license/license-faq>)

## Неофіційні рішення для обходу обмежень та їхні компроміси

Оскільки OIDC доступний лише в плані Enterprise, деякі self-hosted користувачі шукають спосіб обійти це ще до купівлі. У блог-пості незалежного розробника за грудень 2025 року описано n8n-oidc — інструмент, створений спільнотою, який використовує систему зовнішніх хуків n8n, щоб додати вхід через OpenID Connect до self-hosted інстансу без ліцензії Enterprise.

Пізніший пост того ж розробника за березень 2026 року повертається до цього налаштування, побудованого на основі Pocket ID — self-hosted провайдера ідентифікації, який він також створив, — як персональної домашньої лаб-конфігурації, на якій він це тестував.

Ми були б обережними, покладаючись на таке community-рішення для чогось більшого за лабораторне чи тестове середовище. Воно перебуває поза власною моделлю ліцензування та підтримки n8n, тож саме для регульованого або продакшн-розгортання цей розрив має найбільше значення.

Sources: [Announcing n8n-oidc &bull; Cameron Eagans](<https://www.cweagans.net/2025/12/announcing-n8n-oidc/>), [Authentication with Pocket ID &bull; Cameron Eagans](<https://www.cweagans.net/2026/03/authentication-with-pocket-id/>)

## Чек-лист перед запуском SSO для self-hosted n8n

![Чек-лист на планшеті з маленьким сервером, ідентифікаційним бейджем та ключем, які позначаються для розгортання self-hosted SSO.](/blog/uk/article-18de42c2-df6b-41c1-b4a1-36f421e8b44d/640a922c21cba454e9951fd716f535a1d435f64af580b309ce45e3dfe20aef08.png)

Чек-лист на планшеті з маленьким сервером, бейджем та ключем показує кроки, які потрібно підтвердити перед розгортанням self-hosted SSO.

Використовуйте цей чек-лист як останню перевірку перед тим, як увімкнути [n8n SSO для self-hosted](<https://n8n-challenges.app/uk/blog/pomylky-vkhodu-v-n8n-shcho-pereviryty-pered-sso-abo-ldap>) для всіх користувачів. Жоден із цих кроків не замінює безпосередньої перевірки поточних сторінок цін та документації n8n, оскільки кілька джерел цього чек-листа посилаються саме на них як на остаточний довідник.

- [ ] Переконайтеся, що ви використовуєте self-hosted редакцію Business або Enterprise, а не Community, перш ніж налаштовувати SAML чи OIDC.
- [ ] Виберіть SAML, якщо підходить ліцензування рівня Business; вибирайте OIDC лише якщо готові придбати ліцензію Enterprise.
- [ ] Активуйте ліцензійний ключ у Settings, Usage and plan, і переконайтеся, що інстанс може підключитися до сервера ліцензій n8n.
- [ ] Занотуйте ваш n8n Redirect URL та Entity ID для SAML, або переконайтеся, що маєте доступ власника чи адміністратора для OIDC, перш ніж звертатися до провайдера ідентифікації.
- [ ] Вирішіть, чи налаштовувати SSO через інтерфейс, чи, починаючи з n8n 2.18.0, через змінні середовища, почавши з N8N_SSO_MANAGED_BY_ENV.
- [ ] Якщо використовуєте метадані SAML, встановіть або змінну metadata XML, або змінну metadata URL, але ніколи обидві.
- [ ] На n8n 1.122.2 або новішій версії визначте режим надання ролей перед запуском у продакшн.
- [ ] Включіть продовження ліцензії до вашого операційного регламенту на випадок, якщо автоматичне продовження колись вимкнуть.

Sources: [Set up SAML | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-saml/set-up-saml>), [Set up OIDC | Administer | n8n Docs](<https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-oidc/set-up-oidc>), [Manage your license | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/manage-your-license>), [License | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/license>), [Manage settings using environment variables | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/manage-settings-using-environment-variables>), [License FAQ | n8n Community license | n8n Docs](<https://docs.n8n.io/n8n-community-license/community-license/license-faq>), [Announcing n8n-oidc &bull; Cameron Eagans](<https://www.cweagans.net/2025/12/announcing-n8n-oidc/>)

Якщо ваша команда готується виділити бюджет на ліцензію Enterprise, або вже використовує SSO і не має впевненості, що налаштування, надання ролей та процес продовження ліцензії надійні, Workflow Audit перевіряє self-hosted інстанс n8n та його workflow на надійність, безпеку та підтримуваність. Ми вважаємо, що такий огляд — більш корисний наступний крок перед масштабуванням SSO на всіх користувачів, а заявки надсилаються через нашу сторінку For companies.

**[Аудит налаштування SSO для self-hosted](https://n8n-challenges.app/uk/companies)**

Tags: n8n, Самостійний хостинг, Ліцензування SSO, Чек-лист
