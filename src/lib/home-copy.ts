export const locales = ["en", "es", "uk"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels = {
  en: "EN",
  es: "ES",
  uk: "UK",
} satisfies Record<Locale, string>;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type HomeCopy = {
  metadataTitle: string;
  accessibility: {
    primaryNavigation: string;
    formatSummary: string;
    balloonCollection: string;
    backToTop: string;
    home: string;
    languageSelector: string;
    challengeCount: string;
  };
  nav: {
    format: string;
    challenges: string;
    events: string;
  };
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  intro: string;
  primaryCta: string;
  stats: Array<{ label: string }>;
  gallery: {
    kicker: string;
    ariaLabel: string;
    photoAlts: string[];
  };
  format: {
    kicker: string;
    title: string;
    body: string;
    steps: Array<{ number: string; title: string; href?: string }>;
  };
  challengeMap: {
    kicker: string;
    title: string;
    body: string;
    levels: Array<{
      name: string;
      count: string;
      body: string;
    }>;
  };
  collection: {
    eyebrow: string;
    title: string;
    body: string;
    openLabel: string;
    complexityLabel: string;
    moreTitle: string;
    moreBody: string;
  };
  contribute: {
    kicker: string;
    title: string;
    body: string;
    button: string;
    currentEventsKicker: string;
    allEvents: string;
  };
  footer: string;
  footerContact: string;
};

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    metadataTitle: "Welcome",
    accessibility: {
      primaryNavigation: "Primary navigation",
      formatSummary: "Challenge format at a glance",
      balloonCollection: "The ten challenge balloons",
      backToTop: "Back to top",
      home: "n8n Balloon Challenges home",
      languageSelector: "Language selector",
      challengeCount: "10 challenges",
    },
    nav: {
      format: "How it works",
      challenges: "Challenges",
      events: "Events",
    },
    eyebrow: "An n8n Ambassador event format",
    titleTop: "Welcome to the",
    titleBottom: "n8n Balloon Challenges",
    intro:
      "Real learning comes through practice, and knowledge sticks when you share it with others.",
    primaryCta: "View challenges",
    stats: [
      { label: "hands-on challenges" },
      { label: "n8n nodes covered" },
      {
        label: "technical terms explained simply",
      },
      { label: "available languages" },
    ],
    gallery: {
      kicker: "Moments from previous events",
      ariaLabel: "Photos from previous n8n community events",
      photoAlts: [
        "Audience listening during a previous n8n community event",
        "Two attendees holding n8n stickers and giving thumbs up",
        "An n8n event attendee explaining an idea",
        "Attendees discussing a workflow around a laptop",
        "Audience seated during an n8n community presentation",
        "An n8n community speaker presenting to an audience",
        "Four n8n community organizers posing together after an event",
      ],
    },
    format: {
      kicker: "The format",
      title: "How it works",
      body:
        "Choose any challenge that fits your team. You do not need to complete them in order or finish all ten.",
      steps: [
        { number: "01", title: "Sign up for n8n Cloud", href: "/n8n-sign-up" },
        { number: "02", title: "Choose challenge" },
        { number: "03", title: "Build a workflow" },
        { number: "04", title: "Show a mentor" },
        { number: "05", title: "Collect a balloon" },
      ],
    },
    challengeMap: {
      kicker: "10 challenges",
      title: "Challenges for every experience level",
      body:
        "Every challenge teaches one practical n8n idea. The balloon color identifies the mission—not your score.",
      levels: [
        {
          name: "Beginner",
          count: "3 challenges",
          body: "Triggers, APIs, decisions, and clean data mapping.",
        },
        {
          name: "Intermediate",
          count: "4 challenges",
          body: "List processing, forms, storage, and structured AI output.",
        },
        {
          name: "Advanced",
          count: "3 challenges",
          body: "Tool-using agents, human approval, and resilient automation.",
        },
      ],
    },
    collection: {
      eyebrow: "Choose a challenge",
      title: "Choose your next challenge.",
      body: "Pick a balloon, build the workflow, and collect it after mentor approval.",
      openLabel: "Open challenge",
      moreTitle: "Need more challenges?",
      moreBody: "More ideas to try, including a little extraterrestrial fun. Open a challenge and build something new.",
      complexityLabel: "Complexity",
    },
    contribute: {
      kicker: "For n8n event organizers",
      title: "Bring Balloon Challenges to your community.",
      body:
        "Add your event through GitHub. The contribution guide walks you through every step, and a maintainer reviews the change before it is published.",
      button: "Add your event",
      currentEventsKicker: "Current events",
      allEvents: "All events",
    },
    footer: "Built for curious people who learn by making things work.",
    footerContact: "Contact",
  },
  es: {
    metadataTitle: "Bienvenidos",
    accessibility: {
      primaryNavigation: "Navegación principal",
      formatSummary: "El formato de los retos de un vistazo",
      balloonCollection: "Los diez globos de los retos",
      backToTop: "Volver arriba",
      home: "Inicio de n8n Balloon Challenges",
      languageSelector: "Selector de idioma",
      challengeCount: "10 retos",
    },
    nav: {
      format: "Cómo funciona",
      challenges: "Retos",
      events: "Eventos",
    },
    eyebrow: "Formato de evento creado por un n8n Ambassador",
    titleTop: "Bienvenidos al",
    titleBottom: "n8n Balloon Challenges",
    intro:
      "El aprendizaje real nace de la práctica, y el conocimiento perdura cuando lo compartes con los demás.",
    primaryCta: "Ver los retos",
    stats: [
      { label: "retos prácticos" },
      { label: "nodos de n8n que aprenderás" },
      { label: "términos técnicos explicados" },
      { label: "idiomas disponibles" },
    ],
    gallery: {
      kicker: "Momentos de eventos anteriores",
      ariaLabel: "Fotos de eventos anteriores de la comunidad n8n",
      photoAlts: [
        "Público escuchando durante un evento anterior de la comunidad n8n",
        "Dos asistentes con pegatinas de n8n levantando los pulgares",
        "Una asistente de un evento n8n explicando una idea",
        "Asistentes hablando sobre un workflow alrededor de un portátil",
        "Público sentado durante una presentación de la comunidad n8n",
        "Un ponente de la comunidad n8n haciendo una presentación ante el público",
        "Cuatro organizadores de la comunidad n8n posando juntos después de un evento",
      ],
    },
    format: {
      kicker: "El formato",
      title: "Cómo funciona",
      body:
        "Elige cualquier reto que encaje con tu equipo. No hace falta completarlos en orden ni terminar los diez.",
      steps: [
        { number: "01", title: "Regístrate en n8n Cloud", href: "/n8n-sign-up" },
        { number: "02", title: "Elige un reto" },
        { number: "03", title: "Crea un workflow" },
        { number: "04", title: "Muéstraselo a un mentor" },
        { number: "05", title: "Recoge un globo" },
      ],
    },
    challengeMap: {
      kicker: "10 retos",
      title: "Retos para cada nivel de experiencia",
      body:
        "Cada reto enseña una idea práctica de n8n. El color del globo identifica la misión, no tu puntuación.",
      levels: [
        {
          name: "Inicial",
          count: "3 retos",
          body: "Triggers, APIs, decisiones y mapeo de datos limpio.",
        },
        {
          name: "Intermedio",
          count: "4 retos",
          body: "Listas, formularios, almacenamiento y resultados estructurados con IA.",
        },
        {
          name: "Avanzado",
          count: "3 retos",
          body: "Agentes con herramientas, aprobación humana y automatizaciones resilientes.",
        },
      ],
    },
    collection: {
      eyebrow: "Elige un reto",
      title: "Elige tu próximo reto.",
      body: "Elige un globo, crea el workflow y recógelo cuando lo apruebe un mentor.",
      openLabel: "Abrir reto",
      moreTitle: "¿Quieres más retos?",
      moreBody: "Más ideas para probar, con un poco de diversión extraterrestre. Abre un reto y crea algo nuevo.",
      complexityLabel: "Complejidad",
    },
    contribute: {
      kicker: "Para organizadores de eventos n8n",
      title: "Lleva Balloon Challenges a tu comunidad.",
      body:
        "Añade tu evento a través de GitHub. La guía explica cada paso y una persona responsable revisará el cambio antes de publicarlo.",
      button: "Añade tu evento",
      currentEventsKicker: "Eventos actuales",
      allEvents: "Todos los eventos",
    },
    footer: "Creado para personas curiosas que aprenden haciendo que las cosas funcionen.",
    footerContact: "Contacto",
  },
  uk: {
    metadataTitle: "Ласкаво просимо",
    accessibility: {
      primaryNavigation: "Основна навігація",
      formatSummary: "Коротко про формат завдань",
      balloonCollection: "Десять кульок завдань",
      backToTop: "Повернутися нагору",
      home: "Головна сторінка n8n Balloon Challenges",
      languageSelector: "Вибір мови",
      challengeCount: "10 завдань",
    },
    nav: {
      format: "Як це працює",
      challenges: "Завдання",
      events: "Події",
    },
    eyebrow: "Формат події від амбасадора n8n",
    titleTop: "Ласкаво просимо до",
    titleBottom: "n8n Balloon Challenges",
    intro:
      "Справжнє навчання починається з практики, а знання закріплюються, коли ви ділитеся ними з іншими.",
    primaryCta: "Переглянути завдання",
    stats: [
      { label: "практичних завдань" },
      { label: "нод n8n, які ви опануєте" },
      { label: "технічних термінів простими словами" },
      { label: "доступні мови" },
    ],
    gallery: {
      kicker: "Моменти з попередніх подій",
      ariaLabel: "Фотографії з попередніх подій спільноти n8n",
      photoAlts: [
        "Аудиторія слухає виступ під час попередньої події спільноти n8n",
        "Двоє учасників тримають наліпки n8n і показують великі пальці",
        "Учасниця події n8n пояснює ідею",
        "Учасники обговорюють воркфлоу біля ноутбука",
        "Аудиторія під час презентації спільноти n8n",
        "Спікер спільноти n8n виступає перед аудиторією",
        "Четверо організаторів спільноти n8n позують разом після події",
      ],
    },
    format: {
      kicker: "Формат",
      title: "Як це працює",
      body:
        "Оберіть будь-яке завдання, що підходить вашій команді. Не обов’язково виконувати їх по черзі чи завершувати всі десять.",
      steps: [
        { number: "01", title: "Зареєструйтеся в n8n Cloud", href: "/n8n-sign-up" },
        { number: "02", title: "Оберіть завдання" },
        { number: "03", title: "Створіть воркфлоу" },
        { number: "04", title: "Покажіть його ментору" },
        { number: "05", title: "Отримайте кульку" },
      ],
    },
    challengeMap: {
      kicker: "10 завдань",
      title: "Завдання для кожного рівня досвіду",
      body:
        "Кожне завдання навчає однієї практичної ідеї n8n. Колір кульки позначає місію, а не вашу оцінку.",
      levels: [
        {
          name: "Початковий",
          count: "3 завдання",
          body: "Тригери, API, розгалуження та акуратне зіставлення даних.",
        },
        {
          name: "Середній",
          count: "4 завдання",
          body: "Обробка списків, форми, зберігання та структуровані результати ШІ.",
        },
        {
          name: "Просунутий",
          count: "3 завдання",
          body: "Агенти з інструментами, людське схвалення та надійні автоматизації.",
        },
      ],
    },
    collection: {
      eyebrow: "Оберіть завдання",
      title: "Оберіть наступне завдання.",
      body: "Оберіть кульку, створіть воркфлоу та отримайте її після схвалення ментора.",
      openLabel: "Відкрити завдання",
      moreTitle: "Хочеш більше завдань?",
      moreBody: "Ще більше ідей, зокрема трохи інопланетних розваг. Відкрийте завдання та створіть щось нове.",
      complexityLabel: "Складність",
    },
    contribute: {
      kicker: "Для організаторів подій n8n",
      title: "Проведіть Balloon Challenges у своїй спільноті.",
      body:
        "Додайте свою подію через GitHub. У посібнику для учасників описано кожен крок, а перед публікацією зміни перевірить мейнтейнер.",
      button: "Додати подію",
      currentEventsKicker: "Поточні події",
      allEvents: "Усі події",
    },
    footer: "Створено для допитливих людей, які навчаються, змушуючи речі працювати.",
    footerContact: "Зв’язатися",
  },
};
