import type { Locale } from "@/lib/home-copy";

type CompaniesProgram = {
  title: string;
  body: string;
  duration: string;
};

type CompaniesCopy = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  speaker: {
    lead: string;
    role: string;
    experienceLink: string;
    photoAlt: string;
  };
  what: {
    kicker: string;
    title: string;
    body: string[];
  };
  programs: {
    title: string;
    body: string;
    durationLabel: string;
    items: CompaniesProgram[];
  };
  details: {
    title: string;
    items: Array<{ term: string; detail: string }>;
  };
  cta: {
    kicker: string;
    title: string;
    body: string;
    button: string;
  };
};

export const companiesCopy: Record<Locale, CompaniesCopy> = {
  en: {
    metadataTitle: "For companies",
    metadataDescription:
      "Custom, hands-on n8n training programs for company teams – built around your own tools, workflows, and use cases.",
    eyebrow: "For companies",
    title: "Custom n8n training for your teams.",
    intro:
      "The same hands-on balloon format, rebuilt around the tools, data, and real workflows of your company.",
    speaker: {
      lead: "Workshops and trainings are run by",
      role: "n8n community organizer, automation consultant, and creator of this project.",
      experienceLink: "See my full training and speaking experience",
      photoAlt: "Roman Rodomansky running an n8n workshop",
    },
    what: {
      kicker: "What it is",
      title: "A private workshop on your own use cases.",
      body: [
        "The public challenges teach n8n with generic examples. A company program does the same thing on your stack: your CRM, your ticketing system, your spreadsheets, your internal APIs. People leave with workflows they can put to work, not with demos.",
        "Every program is prepared for one team or department and runs on your own n8n instance – cloud or self-hosted – so nothing leaves your environment.",
      ],
    },
    programs: {
      title: "Program examples",
      body: "Each program runs on your own tools and data, and is adjusted to the level of your team.",
      durationLabel: "Duration",
      items: [
        {
          title: "n8n Corporate Fundamentals",
          body: "Your team learns n8n on the tools and processes they already use.",
          duration: "1 day",
        },
        {
          title: "n8n Advanced / Developer Training",
          body: "AI agents, company data, RAG, APIs, webhooks, JavaScript, sub-workflows, error handling, credentials, architecture.",
          duration: "1–2 days",
        },
        {
          title: "AI Agents with n8n",
          body: "RAG, agents, tools, memory, human approval, structured outputs, and practical AI workflows.",
          duration: "A few hours – 1 day",
        },
        {
          title: "Department Automation Bootcamp",
          body: "One department – sales, HR, finance, marketing, or ops – builds real automations.",
          duration: "1–3 days",
        },
        {
          title: "Build Your First 5 Automations",
          body: "We train your team while building five production workflows together.",
          duration: "1–2 weeks",
        },
        {
          title: "Automation Champions Program",
          body: "Three to ten people are trained to become internal automation champions.",
          duration: "4–8 weeks",
        },
        {
          title: "n8n Office Hours / Coaching",
          body: "Teams bring their workflows and problems; we build and debug them together.",
          duration: "Monthly retainer",
        },
        {
          title: "Workflow Audit",
          body: "A review of your n8n instance and workflows for reliability, security, and maintainability.",
          duration: "Fixed-price audit",
        },
        {
          title: "Automation-as-a-Service",
          body: "We build and maintain the workflows for you.",
          duration: "Ongoing retainer",
        },
      ],
    },
    details: {
      title: "Formats",
      items: [
        { term: "Group size", detail: "8–25 people" },
        { term: "Duration", detail: "1 day to 8 weeks" },
        { term: "Delivery", detail: "On-site or remote" },
        { term: "Languages", detail: "English, Spanish, Ukrainian" },
        { term: "Environment", detail: "Your own n8n instance" },
        { term: "Level", detail: "Beginner to advanced" },
      ],
    },
    cta: {
      kicker: "Get in touch",
      title: "Tell us what your team repeats every week.",
      body: "Programs are run by Roman Rodomansky, who maintains this project and builds n8n automations and community nodes. Send a short note about your team, your tools, and what you want to automate, and you will get a proposed program outline back.",
      button: "Message on LinkedIn",
    },
  },
  es: {
    metadataTitle: "Para empresas",
    metadataDescription:
      "Programas de formación en n8n a medida para equipos de empresa: creados sobre vuestras herramientas, vuestros flujos y vuestros casos de uso.",
    eyebrow: "Para empresas",
    title: "Formación en n8n a medida para tus equipos.",
    intro:
      "El mismo formato práctico de los globos, construido alrededor de las herramientas, los datos y los flujos reales de tu empresa.",
    speaker: {
      lead: "Los talleres y las formaciones los imparte",
      role: "organizador de la comunidad n8n, consultor de automatización y creador de este proyecto.",
      experienceLink: "Ver mi experiencia completa como formador y ponente",
      photoAlt: "Roman Rodomansky impartiendo un taller de n8n",
    },
    what: {
      kicker: "Qué es",
      title: "Un taller privado sobre vuestros propios casos de uso.",
      body: [
        "Los retos públicos enseñan n8n con ejemplos genéricos. Un programa de empresa hace lo mismo sobre vuestro stack: vuestro CRM, vuestro sistema de tickets, vuestras hojas de cálculo y vuestras APIs internas. La gente se va con workflows que puede poner a trabajar, no con demos.",
        "Cada programa se prepara para un equipo o departamento y se ejecuta en vuestra propia instancia de n8n – cloud o self-hosted – así que nada sale de vuestro entorno.",
      ],
    },
    programs: {
      title: "Ejemplos de programas",
      body: "Cada programa se ejecuta sobre vuestras herramientas y vuestros datos, y se ajusta al nivel del equipo.",
      durationLabel: "Duración",
      items: [
        {
          title: "Fundamentos de n8n para empresas",
          body: "Vuestro equipo aprende n8n con las herramientas y los procesos que ya usa.",
          duration: "1 día",
        },
        {
          title: "Formación avanzada / para desarrolladores",
          body: "Agentes de IA, datos de la empresa, RAG, APIs, webhooks, JavaScript, subworkflows, manejo de errores, credenciales y arquitectura.",
          duration: "1–2 días",
        },
        {
          title: "Agentes de IA con n8n",
          body: "RAG, agentes, herramientas, memoria, aprobación humana, salidas estructuradas y workflows de IA prácticos.",
          duration: "De unas horas a 1 día",
        },
        {
          title: "Bootcamp de automatización por departamento",
          body: "Un departamento – ventas, RR. HH., finanzas, marketing u operaciones – crea automatizaciones reales.",
          duration: "1–3 días",
        },
        {
          title: "Vuestras primeras 5 automatizaciones",
          body: "Formamos a tu equipo mientras construimos juntos cinco workflows de producción.",
          duration: "1–2 semanas",
        },
        {
          title: "Programa de campeones de automatización",
          body: "De tres a diez personas se forman como campeones internos de automatización.",
          duration: "4–8 semanas",
        },
        {
          title: "Office hours y coaching de n8n",
          body: "Los equipos traen sus workflows y sus problemas; los construimos y depuramos juntos.",
          duration: "Servicio mensual",
        },
        {
          title: "Auditoría de workflows",
          body: "Revisión de vuestra instancia de n8n y sus workflows: fiabilidad, seguridad y mantenibilidad.",
          duration: "Precio cerrado",
        },
        {
          title: "Automatización como servicio",
          body: "Construimos y mantenemos los workflows por vosotros.",
          duration: "Servicio continuo",
        },
      ],
    },
    details: {
      title: "Formatos",
      items: [
        { term: "Tamaño del grupo", detail: "8–25 personas" },
        { term: "Duración", detail: "De 1 día a 8 semanas" },
        { term: "Formato", detail: "Presencial o remoto" },
        { term: "Idiomas", detail: "Inglés, español, ucraniano" },
        { term: "Entorno", detail: "Vuestra propia instancia de n8n" },
        { term: "Nivel", detail: "De principiante a avanzado" },
      ],
    },
    cta: {
      kicker: "Hablemos",
      title: "Cuéntanos qué repite tu equipo cada semana.",
      body: "Los programas los imparte Roman Rodomansky, que mantiene este proyecto y desarrolla automatizaciones y nodos comunitarios de n8n. Escríbele una nota breve sobre tu equipo, vuestras herramientas y lo que queréis automatizar, y recibirás una propuesta de programa.",
      button: "Escribir por LinkedIn",
    },
  },
  uk: {
    metadataTitle: "Компаніям",
    metadataDescription:
      "Індивідуальні програми навчання n8n для команд компаній – на основі ваших інструментів, процесів і сценаріїв.",
    eyebrow: "Компаніям",
    title: "Навчання n8n під ваші команди.",
    intro:
      "Той самий практичний формат із кульками, побудований навколо інструментів, даних і реальних процесів вашої компанії.",
    speaker: {
      lead: "Воркшопи та навчання проводить",
      role: "організатор спільноти n8n, консультант з автоматизації та автор цього проєкту.",
      experienceLink: "Переглянути повний досвід навчання та виступів",
      photoAlt: "Роман Родоманський проводить воркшоп з n8n",
    },
    what: {
      kicker: "Що це",
      title: "Приватний воркшоп на ваших власних сценаріях.",
      body: [
        "Публічні завдання навчають n8n на загальних прикладах. Програма для компанії робить те саме на вашому стеку: ваша CRM, ваша тікет-система, ваші таблиці та внутрішні API. Люди йдуть із воркфлоу, які можна запускати в роботу, а не з демо.",
        "Кожна програма готується для однієї команди чи відділу й виконується на вашому власному екземплярі n8n – хмарному або self-hosted – тож нічого не виходить за межі вашого середовища.",
      ],
    },
    programs: {
      title: "Приклади програм",
      body: "Кожна програма працює на ваших інструментах і даних та підлаштовується під рівень команди.",
      durationLabel: "Тривалість",
      items: [
        {
          title: "Корпоративні основи n8n",
          body: "Команда вчить n8n на інструментах і процесах, якими вже користується.",
          duration: "1 день",
        },
        {
          title: "Просунуте навчання / для розробників",
          body: "ШІ-агенти, дані компанії, RAG, API, вебхуки, JavaScript, підворкфлоу, обробка помилок, доступи, архітектура.",
          duration: "1–2 дні",
        },
        {
          title: "ШІ-агенти в n8n",
          body: "RAG, агенти, інструменти, пам’ять, погодження людиною, структуровані відповіді та практичні ШІ-воркфлоу.",
          duration: "Від кількох годин до 1 дня",
        },
        {
          title: "Буткемп автоматизації для відділу",
          body: "Один відділ – продажі, HR, фінанси, маркетинг чи операції – створює реальні автоматизації.",
          duration: "1–3 дні",
        },
        {
          title: "Ваші перші 5 автоматизацій",
          body: "Навчаємо команду, поки разом будуємо п’ять продакшн-воркфлоу.",
          duration: "1–2 тижні",
        },
        {
          title: "Програма чемпіонів автоматизації",
          body: "Від трьох до десяти людей стають внутрішніми чемпіонами автоматизації.",
          duration: "4–8 тижнів",
        },
        {
          title: "Office hours і коучинг з n8n",
          body: "Команди приносять свої воркфлоу та проблеми – будуємо й дебажимо разом.",
          duration: "Щомісячна підтримка",
        },
        {
          title: "Аудит воркфлоу",
          body: "Огляд вашого n8n і воркфлоу: надійність, безпека та підтримуваність.",
          duration: "Фіксована ціна",
        },
        {
          title: "Автоматизація як сервіс",
          body: "Ми будуємо й підтримуємо воркфлоу замість вас.",
          duration: "Постійна підтримка",
        },
      ],
    },
    details: {
      title: "Формати",
      items: [
        { term: "Розмір групи", detail: "8–25 людей" },
        { term: "Тривалість", detail: "Від 1 дня до 8 тижнів" },
        { term: "Формат", detail: "Офлайн або онлайн" },
        { term: "Мови", detail: "Англійська, іспанська, українська" },
        { term: "Середовище", detail: "Ваш власний n8n" },
        { term: "Рівень", detail: "Від початківця до просунутого" },
      ],
    },
    cta: {
      kicker: "Зв’язатися",
      title: "Розкажіть, що ваша команда повторює щотижня.",
      body: "Програми проводить Роман Родоманський, який підтримує цей проєкт і розробляє автоматизації та ноди спільноти для n8n. Напишіть коротко про команду, ваші інструменти й те, що хочете автоматизувати – у відповідь отримаєте план програми.",
      button: "Написати в LinkedIn",
    },
  },
};
