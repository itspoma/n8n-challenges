export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type HomeCopy = {
  accessibility: {
    primaryNavigation: string;
    formatSummary: string;
    balloonCollection: string;
    backToTop: string;
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
  stats: Array<{ value: string; label: string }>;
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
  };
  contribute: {
    kicker: string;
    title: string;
    body: string;
    button: string;
  };
  footer: string;
  footerContact: string;
};

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    accessibility: {
      primaryNavigation: "Primary navigation",
      formatSummary: "Challenge format at a glance",
      balloonCollection: "The ten challenge balloons",
      backToTop: "Back to top",
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
      { value: "10", label: "hands-on challenges" },
      { value: "3", label: "experience levels" },
      { value: "5", label: "progressive hints per challenge" },
      { value: "2", label: "available languages" },
    ],
    format: {
      kicker: "The format",
      title: "How it works",
      body:
        "Choose any challenge that fits your team. You do not need to complete them in order or finish all ten.",
      steps: [
        { number: "01", title: "Sign up for n8n Cloud", href: "https://app.n8n.cloud/register" },
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
          count: "4 challenges",
          body: "Triggers, APIs, decisions, and clean data mapping.",
        },
        {
          name: "Intermediate",
          count: "3 challenges",
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
      complexityLabel: "Complexity",
    },
    contribute: {
      kicker: "For n8n event organizers",
      title: "Bring Balloon Challenges to your community.",
      body:
        "Add your event through GitHub. The contribution guide walks you through every step, and a maintainer reviews the change before it is published.",
      button: "Add your event",
    },
    footer: "Built for curious people who learn by making things work.",
    footerContact: "Contact",
  },
  es: {
    accessibility: {
      primaryNavigation: "Navegación principal",
      formatSummary: "El formato de los retos de un vistazo",
      balloonCollection: "Los diez globos de los retos",
      backToTop: "Volver arriba",
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
      { value: "10", label: "retos prácticos" },
      { value: "3", label: "niveles de experiencia" },
      { value: "5", label: "pistas progresivas por reto" },
      { value: "2", label: "idiomas disponibles" },
    ],
    format: {
      kicker: "El formato",
      title: "Cómo funciona",
      body:
        "Elige cualquier reto que encaje con tu equipo. No hace falta completarlos en orden ni terminar los diez.",
      steps: [
        { number: "01", title: "Regístrate en n8n Cloud", href: "https://app.n8n.cloud/register" },
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
          count: "4 retos",
          body: "Triggers, APIs, decisiones y mapeo de datos limpio.",
        },
        {
          name: "Intermedio",
          count: "3 retos",
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
      complexityLabel: "Complejidad",
    },
    contribute: {
      kicker: "Para organizadores de eventos n8n",
      title: "Lleva Balloon Challenges a tu comunidad.",
      body:
        "Añade tu evento a través de GitHub. La guía explica cada paso y una persona responsable revisará el cambio antes de publicarlo.",
      button: "Añade tu evento",
    },
    footer: "Creado para personas curiosas que aprenden haciendo que las cosas funcionen.",
    footerContact: "Contacto",
  },
};
