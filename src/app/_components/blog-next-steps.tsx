import Link from "next/link";

import { difficultyLabels, type Challenge } from "@/lib/challenges";
import type { Locale } from "@/lib/home-copy";

const nextStepsCopy = {
  en: {
    title: "Put this into practice",
    challengesTitle: "Hands-on n8n challenges",
    challengesBody:
      "Pick a challenge and build a working workflow in your own n8n environment, with five progressive tips per challenge.",
    challengeButton: "Try a hands-on challenge",
    teamTitle: "For your team",
    teamBody:
      "Custom n8n training programs for one team or department, run on your own n8n instance with your own tools and data.",
    teamButton: "Training for your team",
  },
  es: {
    title: "Ponlo en práctica",
    challengesTitle: "Retos prácticos de n8n",
    challengesBody:
      "Elige un reto y construye un workflow que funcione en tu propio entorno de n8n, con cinco pistas progresivas por reto.",
    challengeButton: "Prueba un reto práctico",
    teamTitle: "Para tu equipo",
    teamBody:
      "Programas de formación en n8n a medida para un equipo o departamento, en tu propia instancia de n8n y con tus herramientas y datos.",
    teamButton: "Formación para tu equipo",
  },
  uk: {
    title: "Спробуйте на практиці",
    challengesTitle: "Практичні завдання з n8n",
    challengesBody:
      "Оберіть завдання й створіть робочий воркфлоу у власному середовищі n8n – до кожного завдання є п’ять поступових підказок.",
    challengeButton: "Спробувати практичне завдання",
    teamTitle: "Для вашої команди",
    teamBody:
      "Програми навчання n8n для однієї команди чи відділу – на вашому власному екземплярі n8n, з вашими інструментами й даними.",
    teamButton: "Навчання для вашої команди",
  },
} satisfies Record<Locale, Record<string, string>>;

type BlogNextStepsProps = {
  locale: Locale;
  // The challenge closest to the article, or undefined to point at the whole catalog.
  challenge?: Challenge;
};

/** Closing card after every article: practise with a challenge, or train a team. */
export function BlogNextSteps({ locale, challenge }: BlogNextStepsProps) {
  const copy = nextStepsCopy[locale];
  const challengeCopy = challenge?.copy[locale];

  return (
    <section className="blog-next-steps" aria-labelledby="blog-next-steps-title">
      <h2 id="blog-next-steps-title" className="section-kicker">
        {copy.title}
      </h2>
      <div className="blog-next-steps-grid">
        <div className="blog-next-step">
          <h3>{challengeCopy?.title ?? copy.challengesTitle}</h3>
          <p>{challengeCopy?.summary ?? copy.challengesBody}</p>
          {challenge ? <p className="blog-next-step-meta">{difficultyLabels[locale][challenge.difficulty]}</p> : null}
          <Link
            className="button button-dark blog-cta-button"
            href={challenge ? `/${locale}/challenges/${challenge.slug}` : `/${locale}#challenge-map`}
          >
            {copy.challengeButton}
          </Link>
        </div>
        <div className="blog-next-step">
          <h3>{copy.teamTitle}</h3>
          <p>{copy.teamBody}</p>
          <Link className="button button-dark blog-cta-button" href={`/${locale}/companies`}>
            {copy.teamButton}
          </Link>
        </div>
      </div>
    </section>
  );
}
