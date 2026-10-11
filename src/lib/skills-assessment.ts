import type { Locale } from "@/lib/home-copy";

// The n8n Skills Assessment lives on AI Adoption Score, the author's other site, in English only.
// Every link goes to its product page; change the URL here if the entry point moves.
const skillsAssessmentPage = "https://ai-adoption-score.app/product/n8n-skills-assessment";

/** Where a link sits. Sent as the GA click location and as utm_campaign, so both sites count the same spots. */
export type SkillsAssessmentPlacement =
  | "home_levels"
  | "challenge_page"
  | "blog_next_steps"
  | "companies"
  | "header_menu";

/** The assessment URL, tagged the way AI Adoption Score tags its own outbound links. */
export function skillsAssessmentUrl(placement: SkillsAssessmentPlacement): string {
  const params = new URLSearchParams({
    utm_source: "n8n-challenges",
    utm_medium: "website",
    utm_campaign: placement,
  });

  return `${skillsAssessmentPage}?${params}`;
}

type SkillsAssessmentCopy = {
  menuLabel: string;
  // Shown as a pill next to the header menu item.
  menuBadge: string;
  button: string;
  // Says whose site the link opens, next to the learner-facing links.
  source: string;
  // Labels for the sample result card next to the call to action.
  preview: { label: string; sample: string; caption: string };
  levels: { title: string; body: string };
  challenge: { title: string; body: string };
  blog: { title: string; body: string };
  companies: { title: string; body: string; button: string };
};

export const skillsAssessmentCopy: Record<Locale, SkillsAssessmentCopy> = {
  en: {
    menuLabel: "Skills assessment",
    menuBadge: "Free",
    button: "Get your n8n level",
    source: "On AI Adoption Score, another project by the author of this site.",
    preview: {
      label: "Your n8n result",
      sample: "Example",
      caption: "30 questions · 10 skill areas · 20 min",
    },
    levels: {
      title: "Not sure which level you are?",
      body: "Take the free n8n skills assessment: 30 questions in 10 skill areas, about 20 minutes. You get a level from Beginner to Expert and a score for each area.",
    },
    challenge: {
      title: "How good are you at n8n overall?",
      body: "Each challenge works on a few skills. The free n8n skills assessment checks 10 skill areas, from flow logic to AI agents, in about 20 minutes and gives you a level from Beginner to Expert.",
    },
    blog: {
      title: "n8n skills assessment",
      body: "A free quiz of about 20 minutes: 30 questions in 10 skill areas and a level from Beginner to Expert.",
    },
    companies: {
      title: "Measure where your team starts.",
      body: "Before a program, your team can take the n8n Skills Assessment on AI Adoption Score, another project of ours: about 20 minutes per person, 30 questions in 10 skill areas, a level from Beginner to Expert, and the gaps by area and by team. The program can then start where the gaps are, and a second round afterwards shows what changed.",
      button: "How the assessment works",
    },
  },
  es: {
    menuLabel: "Evaluación de habilidades",
    menuBadge: "Gratis",
    button: "Descubre tu nivel de n8n",
    source: "En AI Adoption Score, otro proyecto del autor de este sitio.",
    preview: {
      label: "Tu resultado de n8n",
      sample: "Ejemplo",
      caption: "30 preguntas · 10 áreas · 20 min",
    },
    levels: {
      title: "¿No sabes qué nivel tienes?",
      body: "Haz la evaluación gratuita de habilidades de n8n, en inglés: 30 preguntas en 10 áreas, unos 20 minutos. Obtienes un nivel de principiante a experto y una puntuación por área.",
    },
    challenge: {
      title: "¿Qué tal se te da n8n en general?",
      body: "Cada reto trabaja unas pocas habilidades. La evaluación gratuita de n8n (en inglés) revisa 10 áreas, de la lógica de los flujos a los agentes de IA, en unos 20 minutos y te da un nivel de principiante a experto.",
    },
    blog: {
      title: "Evaluación de habilidades de n8n",
      body: "Un cuestionario gratuito de unos 20 minutos, en inglés: 30 preguntas en 10 áreas y un nivel de principiante a experto.",
    },
    companies: {
      title: "Mide desde dónde parte vuestro equipo.",
      body: "Antes de un programa, vuestro equipo puede hacer la n8n Skills Assessment en AI Adoption Score, otro proyecto nuestro (en inglés): unos 20 minutos por persona, 30 preguntas en 10 áreas, un nivel de principiante a experto y las carencias por área y por equipo. Así el programa puede empezar por esas carencias, y una segunda ronda al terminar muestra qué ha cambiado.",
      button: "Cómo funciona la evaluación",
    },
  },
  uk: {
    menuLabel: "Оцінка навичок",
    menuBadge: "Безкоштовно",
    button: "Дізнатися свій рівень n8n",
    source: "На AI Adoption Score – іншому проєкті автора цього сайту.",
    preview: {
      label: "Ваш результат n8n",
      sample: "Приклад",
      caption: "30 запитань · 10 напрямів · 20 хв",
    },
    levels: {
      title: "Не знаєте, який у вас рівень?",
      body: "Пройдіть безкоштовну оцінку навичок n8n англійською: 30 запитань у 10 напрямах, приблизно 20 хвилин. Ви отримаєте рівень від початківця до експерта й оцінку за кожним напрямом.",
    },
    challenge: {
      title: "Наскільки добре ви знаєте n8n загалом?",
      body: "Кожне завдання тренує кілька навичок. Безкоштовна оцінка навичок n8n англійською перевіряє 10 напрямів – від логіки воркфлоу до ШІ-агентів – приблизно за 20 хвилин і показує ваш рівень від початківця до експерта.",
    },
    blog: {
      title: "Оцінка навичок n8n",
      body: "Безкоштовний тест приблизно на 20 хвилин, англійською: 30 запитань у 10 напрямах і рівень від початківця до експерта.",
    },
    companies: {
      title: "Дізнайтеся, з якого рівня стартує команда.",
      body: "Перед програмою ваша команда може пройти n8n Skills Assessment на AI Adoption Score – іншому нашому проєкті (англійською): приблизно 20 хвилин на людину, 30 запитань у 10 напрямах, рівень від початківця до експерта та прогалини за напрямами й командами. Тоді програма може почати саме з цих прогалин, а другий раунд після неї покаже, що змінилося.",
      button: "Як працює оцінка",
    },
  },
};
