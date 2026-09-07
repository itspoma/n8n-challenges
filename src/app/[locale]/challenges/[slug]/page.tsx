import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { BalloonString } from "@/app/_components/balloon-string";
import { ChallengeActions } from "@/app/_components/challenge-actions";
import { FooterMeta } from "@/app/_components/footer-meta";
import { BrandLogo, SiteHeader } from "@/app/_components/site-header";
import { WorkflowNodeTile } from "@/app/_components/workflow-node-tile";
import {
  challengePageCopy,
  challenges,
  difficultyLabels,
  getChallenge,
} from "@/lib/challenges";
import { homeCopy, isLocale, locales, type Locale } from "@/lib/home-copy";
import { createLocalizedMetadata } from "@/lib/site-metadata";

type ChallengePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const inlineLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
const inlineGlossaryTerms: Partial<Record<string, Record<Locale, string[]>>> = {
  "webhook-welcome": {
    en: ["Webhook", "QR code"],
    es: ["Webhook", "Código QR"],
    uk: ["Webhook", "QR-код"],
  },
  "valencia-telegram-bot": {
    en: ["Valencia Open Data", "Telegram"],
    es: ["Valencia Open Data", "Telegram"],
    uk: ["Valencia Open Data", "Telegram"],
  },
};

const additionalInlineTerms: Partial<
  Record<string, Partial<Record<Locale, Array<{ term: string; definition: string }>>>>
> = {
  "webhook-welcome": {
    en: [
      {
        term: "Webhook node",
        definition:
          "The Webhook node creates a URL that can receive requests and start your n8n workflow.",
      },
      {
        term: "GET requests",
        definition:
          "GET requests ask a URL to return information. A browser usually sends one when you open a normal web page.",
      },
      {
        term: "query parameter",
        definition:
          "A query parameter is extra information added after ? in a URL, such as ?name=Ana.",
      },
    ],
    es: [
      {
        term: "nodo Webhook",
        definition:
          "El nodo Webhook crea una URL que puede recibir peticiones e iniciar tu workflow de n8n.",
      },
      {
        term: "peticiones GET",
        definition:
          "Las peticiones GET solicitan información a una URL. El navegador suele enviar una al abrir una página web normal.",
      },
      {
        term: "parámetro de consulta",
        definition:
          "Un parámetro de consulta es información adicional que se añade después de ? en una URL, como ?name=Ana.",
      },
    ],
  },
  "valencia-telegram-bot": {
    en: [
      {
        term: "air-quality status",
        definition:
          "The overall air-quality label reported by the station, such as Buena, Razonablemente Buena, Regular, or Desfavorable.",
      },
      {
        term: "NO₂",
        definition:
          "Nitrogen dioxide (NO₂) is a gas produced mainly by road traffic and other fuel combustion. This value is reported in micrograms per cubic metre (µg/m³).",
      },
      {
        term: "PM10",
        definition:
          "PM10 means airborne particles that are 10 micrometres wide or smaller. This value is reported in micrograms per cubic metre (µg/m³).",
      },
      {
        term: "PM2.5",
        definition:
          "PM2.5 means fine airborne particles that are 2.5 micrometres wide or smaller. They can travel deeper into the lungs than PM10 and are reported in µg/m³.",
      },
      {
        term: "calidad_ambiental status",
        definition:
          "The calidad_ambiental field is the station's overall air-quality category, such as Buena, Razonablemente Buena, Regular, or Desfavorable.",
      },
    ],
    es: [
      {
        term: "estado de calidad del aire",
        definition:
          "La etiqueta general de calidad del aire que informa la estación, como Buena, Razonablemente Buena, Regular o Desfavorable.",
      },
      {
        term: "NO₂",
        definition:
          "El dióxido de nitrógeno (NO₂) es un gas producido principalmente por el tráfico y otras combustiones. Este valor se expresa en microgramos por metro cúbico (µg/m³).",
      },
      {
        term: "PM10",
        definition:
          "PM10 son partículas suspendidas en el aire de 10 micrómetros o menos. Este valor se expresa en microgramos por metro cúbico (µg/m³).",
      },
      {
        term: "PM2.5",
        definition:
          "PM2.5 son partículas finas suspendidas en el aire de 2,5 micrómetros o menos. Pueden penetrar más profundamente en los pulmones que PM10 y se expresan en µg/m³.",
      },
      {
        term: "estado calidad_ambiental",
        definition:
          "El campo calidad_ambiental es la categoría general de calidad del aire de la estación, como Buena, Razonablemente Buena, Regular o Desfavorable.",
      },
    ],
    uk: [
      {
        term: "стан якості повітря",
        definition:
          "Загальна категорія якості повітря, яку повідомляє станція, наприклад Buena, Razonablemente Buena, Regular або Desfavorable.",
      },
      {
        term: "NO₂",
        definition:
          "Діоксид азоту (NO₂) — це газ, який утворюється переважно через дорожній рух та інше спалювання палива. Значення подається в мікрограмах на кубічний метр (мкг/м³).",
      },
      {
        term: "PM10",
        definition:
          "PM10 — це зважені в повітрі частинки діаметром не більше 10 мікрометрів. Значення подається в мікрограмах на кубічний метр (мкг/м³).",
      },
      {
        term: "PM2.5",
        definition:
          "PM2.5 — це дрібні зважені частинки діаметром не більше 2,5 мікрометра. Вони можуть проникати в легені глибше за PM10; значення подається в мкг/м³.",
      },
      {
        term: "статус calidad_ambiental",
        definition:
          "Поле calidad_ambiental містить загальну категорію якості повітря на станції, наприклад Buena, Razonablemente Buena, Regular або Desfavorable.",
      },
    ],
  },
  "form-to-follow-up": {
    en: [
      {
        term: "n8n Forms",
        definition:
          "n8n Forms are web pages created by a workflow so people can enter information that starts the workflow.",
      },
      {
        term: "n8n form",
        definition:
          "An n8n form is a web page created by a workflow. Submitting it sends the entered information into the next node.",
      },
      {
        term: "n8n Data Table",
        definition:
          "An n8n Data Table stores rows of information inside n8n so other workflow steps can read or update them later.",
      },
      {
        term: "Data Tables",
        definition:
          "Data Tables store rows of information inside n8n so workflows can keep and reuse data between runs.",
      },
      {
        term: "Data Table",
        definition:
          "A Data Table stores rows of information inside n8n so a workflow can keep and reuse data between runs.",
      },
      {
        term: "normalize",
        definition:
          "To normalize data means to make its format consistent, such as trimming spaces and lowercasing an email address.",
      },
    ],
    es: [
      {
        term: "Formularios de n8n",
        definition:
          "Los formularios de n8n son páginas web creadas por un workflow para recoger información e iniciar sus siguientes pasos.",
      },
      {
        term: "formulario público de n8n",
        definition:
          "Un formulario de n8n es una página web creada por un workflow. Al enviarlo, los datos pasan al siguiente nodo.",
      },
      {
        term: "Data Table de n8n",
        definition:
          "Una Data Table de n8n guarda filas de información dentro de n8n para que otros pasos puedan leerlas o actualizarlas.",
      },
      {
        term: "Data Tables",
        definition:
          "Las Data Tables guardan filas de información dentro de n8n para reutilizarlas entre ejecuciones.",
      },
      {
        term: "Data Table",
        definition:
          "Una Data Table guarda filas de información dentro de n8n para que un workflow pueda reutilizarlas más adelante.",
      },
      {
        term: "normaliza",
        definition:
          "Normalizar datos significa darles un formato consistente, por ejemplo quitando espacios y convirtiendo un email a minúsculas.",
      },
    ],
    uk: [
      {
        term: "Форми n8n",
        definition:
          "Форми n8n — це вебсторінки, створені воркфлоу для збору інформації та запуску наступних кроків.",
      },
      {
        term: "форму n8n",
        definition:
          "Форма n8n — це вебсторінка, створена воркфлоу. Після надсилання введені дані переходять до наступної ноди.",
      },
      {
        term: "n8n Data Table",
        definition:
          "n8n Data Table зберігає рядки інформації всередині n8n, щоб інші кроки могли читати або оновлювати їх пізніше.",
      },
      {
        term: "Data Tables",
        definition:
          "Data Tables зберігають рядки інформації всередині n8n для повторного використання між запусками.",
      },
      {
        term: "Data Table",
        definition:
          "Data Table зберігає рядки інформації всередині n8n, щоб воркфлоу міг використати їх пізніше.",
      },
      {
        term: "нормалізуйте",
        definition:
          "Нормалізувати дані означає привести їх до узгодженого формату, наприклад прибрати пробіли та перевести email у нижній регістр.",
      },
    ],
  },
};

function escapeRegularExpression(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function TextWithGlossary({
  text,
  locale,
  challengeSlug,
  glossary,
  idPrefix,
}: {
  text: string;
  locale: Locale;
  challengeSlug: string;
  glossary: Array<{ term: string; definition: string }>;
  idPrefix: string;
}) {
  const requestedTerms = inlineGlossaryTerms[challengeSlug]?.[locale] ?? [];
  const terms = [
    ...requestedTerms.flatMap((requestedTerm) => {
      const entry = glossary.find(
        ({ term }) => term.localeCompare(requestedTerm, locale, { sensitivity: "accent" }) === 0,
      );

      return entry ? [entry] : [];
    }),
    ...(additionalInlineTerms[challengeSlug]?.[locale] ?? []),
  ].sort((left, right) => right.term.length - left.term.length);

  if (terms.length === 0) {
    return text;
  }

  const termPattern = new RegExp(terms.map(({ term }) => escapeRegularExpression(term)).join("|"), "gi");
  const content: ReactNode[] = [];
  let previousIndex = 0;

  for (const match of text.matchAll(termPattern)) {
    const matchIndex = match.index ?? 0;
    const matchedText = match[0];
    const entry = terms.find(
      ({ term }) => term.localeCompare(matchedText, locale, { sensitivity: "accent" }) === 0,
    );

    if (!entry) continue;

    if (matchIndex > previousIndex) {
      content.push(text.slice(previousIndex, matchIndex));
    }

    const tooltipId = `${idPrefix}-definition-${challengeSlug}-${matchIndex}`;
    content.push(
      <span
        className="glossary-term"
        tabIndex={0}
        aria-describedby={tooltipId}
        key={tooltipId}
      >
        {matchedText}
        <span className="glossary-tooltip" id={tooltipId} role="tooltip">
          {entry.definition}
        </span>
      </span>,
    );
    previousIndex = matchIndex + matchedText.length;
  }

  if (previousIndex < text.length) {
    content.push(text.slice(previousIndex));
  }

  return <>{content}</>;
}

function InlineLinks({ text }: { text: string }) {
  const content: ReactNode[] = [];
  let previousIndex = 0;

  for (const match of text.matchAll(inlineLinkPattern)) {
    const matchIndex = match.index ?? 0;
    const [markdown, label, href] = match;

    if (matchIndex > previousIndex) {
      content.push(text.slice(previousIndex, matchIndex));
    }

    content.push(
      <a key={`${href}-${matchIndex}`} href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>,
    );
    previousIndex = matchIndex + markdown.length;
  }

  if (previousIndex < text.length) {
    content.push(text.slice(previousIndex));
  }

  return <>{content}</>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) => challenges.map((challenge) => ({ locale, slug: challenge.slug })));
}

export async function generateMetadata(
  { params }: ChallengePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale, slug } = await params;
  const challenge = getChallenge(slug);

  if (!isLocale(locale) || !challenge) {
    return {};
  }

  const content = challenge.copy[locale];

  return createLocalizedMetadata({
    locale,
    suffix: `/challenges/${slug}`,
    title: content.title,
    description: content.summary,
    images: (await parent).openGraph?.images,
  });
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const { locale, slug } = await params;
  const challenge = getChallenge(slug);

  if (!isLocale(locale) || !challenge) {
    notFound();
  }

  const content = challenge.copy[locale];
  const labels = challengePageCopy[locale];
  const previousChallenge = challenges[(challenge.number - 2 + challenges.length) % challenges.length];
  const nextChallenge = challenges[challenge.number % challenges.length];

  return (
    <main lang={locale} className="challenge-detail-page">
      <SiteHeader locale={locale} languagePath={`/challenges/${challenge.slug}`} />

      <section className="challenge-detail-hero">
        <div className="shell challenge-detail-hero-inner">
          <div className="challenge-detail-copy">
            <Link className="challenge-back-link" href={`/${locale}#challenge-map`}>
              <span aria-hidden="true">←</span> {labels.back}
            </Link>
            <p className="section-kicker">
              {labels.challenge} {String(challenge.number).padStart(2, "0")}
            </p>
            <h1>{content.title}</h1>
            <p className="challenge-detail-summary">
              <TextWithGlossary
                text={content.summary}
                locale={locale}
                challengeSlug={challenge.slug}
                glossary={content.glossary}
                idPrefix="summary"
              />
            </p>
            <div className="challenge-detail-meta">
              <span>{difficultyLabels[locale][challenge.difficulty]}</span>
              <span
                className="challenge-complexity"
                aria-label={`${labels.complexity}: ${challenge.complexity} ${labels.complexityScale}`}
              >
                <span>{labels.complexity}:</span>
                <span className="challenge-complexity-stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      className={index < challenge.complexity ? "is-filled" : undefined}
                      key={index}
                    >
                      {index < challenge.complexity ? "★" : "☆"}
                    </span>
                  ))}
                </span>
              </span>
              <span>{labels.time}: {challenge.time}</span>
            </div>
          </div>

          <div className="challenge-detail-balloon-wrap" aria-hidden="true">
            <span
              className="challenge-detail-balloon"
              style={{ "--balloon": challenge.color, "--ink": challenge.ink } as React.CSSProperties}
            >
              <strong>{String(challenge.number).padStart(2, "0")}</strong>
              <BalloonString className="challenge-detail-balloon-string" />
            </span>
          </div>
        </div>
      </section>

      <section className="challenge-detail-content shell">
        {challenge.slug !== "webhook-welcome" && content.glossary.length > 0 ? (
          <details className="challenge-glossary-card">
            <summary>
              <span className="challenge-glossary-heading">
                <span className="section-kicker">{labels.glossary}</span>
                <span className="challenge-glossary-description">{labels.glossaryBody}</span>
              </span>
              <span className="challenge-glossary-icon" aria-hidden="true">+</span>
            </summary>
            <dl className="challenge-glossary-list">
              {content.glossary.map((entry) => (
                <div key={entry.term}>
                  <dt>{entry.term}</dt>
                  <dd>{entry.definition}</dd>
                </div>
              ))}
            </dl>
          </details>
        ) : null}

        <div className="challenge-task-stack">
          <article className="challenge-task-card">
            <p className="section-kicker">{labels.task}</p>
            <h2>
              <TextWithGlossary
                text={content.task}
                locale={locale}
                challengeSlug={challenge.slug}
                glossary={content.glossary}
                idPrefix="task"
              />
            </h2>
          </article>

          <article className="challenge-bonus-card">
            <p className="section-kicker">{labels.bonusTask}</p>
            <h2>
              <TextWithGlossary
                text={content.bonusTask}
                locale={locale}
                challengeSlug={challenge.slug}
                glossary={content.glossary}
                idPrefix="bonus"
              />
            </h2>
          </article>
        </div>

        <article className="challenge-story-card">
          <p className="section-kicker">{labels.scenario}</p>
          <ul className="challenge-example-list">
            {content.scenario.map((example, index) => (
              <li key={example}>
                <TextWithGlossary
                  text={example}
                  locale={locale}
                  challengeSlug={challenge.slug}
                  glossary={content.glossary}
                  idPrefix={`scenario-${index}`}
                />
              </li>
            ))}
          </ul>
        </article>

        <article className="challenge-support-card challenge-preparation-card">
          <p className="section-kicker">{labels.preparation}</p>
          <ol className="challenge-preparation-list">
            {content.preparation.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p><InlineLinks text={item} /></p>
              </li>
            ))}
          </ol>
        </article>

        <article className="challenge-support-card challenge-nodes-card">
          <p className="section-kicker">{labels.nodes}</p>
          <ul className="challenge-node-list">
            {content.nodes.map((node) => (
              <WorkflowNodeTile key={node} name={node} />
            ))}
          </ul>
        </article>

        <article className="challenge-requirements-card">
          <p className="section-kicker">{labels.requirements}</p>
          <ol>
            {content.requirements.map((requirement, index) => (
              <li key={requirement}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>
                  <TextWithGlossary
                    text={requirement}
                    locale={locale}
                    challengeSlug={challenge.slug}
                    glossary={content.glossary}
                    idPrefix={`requirement-${index}`}
                  />
                </p>
              </li>
            ))}
          </ol>
        </article>

        <ChallengeActions
          challengeSlug={challenge.slug}
          challengeTitle={content.title}
          labels={labels}
          solutions={challenge.solutions}
          tips={content.tips}
          nextChallengeHref={`/${locale}/challenges/${nextChallenge.slug}`}
        />

        <nav className="challenge-navigation" aria-label={`${labels.previous} / ${labels.next}`}>
          <Link
            className="challenge-navigation-link challenge-navigation-previous"
            href={`/${locale}/challenges/${previousChallenge.slug}`}
          >
            <i aria-hidden="true">←</i>
            <span className="challenge-navigation-copy">
              <span>{labels.previous}</span>
              <strong>{previousChallenge.copy[locale].title}</strong>
            </span>
          </Link>

          <Link
            className="challenge-navigation-link challenge-navigation-next"
            href={`/${locale}/challenges/${nextChallenge.slug}`}
          >
            <span className="challenge-navigation-copy">
              <span>{labels.next}</span>
              <strong>{nextChallenge.copy[locale].title}</strong>
            </span>
            <i aria-hidden="true">→</i>
          </Link>
        </nav>
      </section>

      <footer className="site-footer challenge-footer shell">
        <Link className="brand brand-footer" href={`/${locale}`}>
          <BrandLogo themeAware />
          <span className="brand-divider" aria-hidden="true" />
          <strong className="event-name">Balloon Challenges</strong>
        </Link>
        <div className="footer-links">
          <Link href={`/${locale}#challenge-map`}>{labels.back}</Link>
          <a
            href={`https://github.com/itspoma/n8n-challenges/edit/main/content/challenges/${String(challenge.number).padStart(2, "0")}-${challenge.slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels.edit} ↗
          </a>
          <a
            href="https://github.com/itspoma/n8n-challenges"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://github.com/itspoma"
            target="_blank"
            rel="noopener noreferrer"
          >
            {homeCopy[locale].footerContact} ↗
          </a>
        </div>
        <FooterMeta />
      </footer>
    </main>
  );
}
