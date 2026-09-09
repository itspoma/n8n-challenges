import { additionalInlineTerms } from "@/lib/challenge-inline-terms";
import { withBasePath } from "@/lib/site-path";
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
  mainChallenges,
  moreChallenges,
  difficultyLabels,
  getChallenge,
} from "@/lib/challenges";
import { homeCopy, isLocale, locales, type Locale } from "@/lib/home-copy";
import { createLocalizedMetadata } from "@/lib/site-metadata";

type ChallengePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const inlineLinkPattern = /\[([^\]]+)\]\(((?:https?:\/\/|\/(?!\/))[^)\s]+)\)/g;
const inlineGlossaryTerms: Partial<Record<string, Record<Locale, string[]>>> = {
  "ai-workflow-builder": {
    en: ["ChatGPT", "Claude", "MCP"],
    es: ["ChatGPT", "Claude", "MCP"],
    uk: ["ChatGPT", "Claude", "MCP"],
  },
  "webhook-welcome": {
    en: ["Webhook", "QR code"],
    es: ["Webhook", "Código QR"],
    uk: ["Webhook", "QR-код"],
  },
  "unstable-restaurant-orders": {
    en: [
      "paginated API",
      "rate limits",
      "retries",
      "controlled batches",
      "validation",
      "Retry-After",
      "Error Trigger",
    ],
    es: [
      "API paginada",
      "límites de frecuencia",
      "reintentos",
      "lotes controlados",
      "validación",
      "Retry-After",
      "Error Trigger",
    ],
    uk: [
      "API з пагінацією",
      "обмеження частоти",
      "повторні спроби",
      "контрольованими пакетами",
      "перевірки",
      "Retry-After",
      "Error Trigger",
    ],
  },
  "form-to-follow-up": {
    en: [
      "n8n form",
      "validation",
      "n8n Data Table",
      "Data Table",
      "normalized",
      "workflow",
      "Form Trigger",
      "Edit Fields (Set)",
      "IF",
      "Form Ending",
      "Resend",
      "expression",
      "true output",
      "false output",
      "credential",
    ],
    es: [
      "formulario público de n8n",
      "validación",
      "Data Table de n8n",
      "Data Table",
      "normaliza",
      "workflow",
      "Form Trigger",
      "Edit Fields (Set)",
      "IF",
      "Form Ending",
      "Resend",
      "expresión",
      "salida true",
      "salida false",
      "credencial",
    ],
    uk: [
      "форму n8n",
      "валідація",
      "n8n Data Table",
      "Data Table",
      "нормалізується",
      "воркфлоу",
      "Form Trigger",
      "Edit Fields (Set)",
      "IF",
      "Form Ending",
      "Resend",
      "вираз",
      "вихід true",
      "вихід false",
      "облікові дані",
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

  const termPattern = new RegExp(
    `(?<![\\p{L}\\p{N}_])(?:${terms
      .map(({ term }) => escapeRegularExpression(term))
      .join("|")})(?![\\p{L}\\p{N}_])`,
    "giu",
  );
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
      <a key={`${href}-${matchIndex}`} href={withBasePath(href)} target="_blank" rel="noopener noreferrer">
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
  const collection = challenge.collection === "main" ? mainChallenges : moreChallenges;
  const index = collection.findIndex((item) => item.slug === challenge.slug);
  const previousChallenge = collection.length > 1 ? collection[(index - 1 + collection.length) % collection.length] : mainChallenges[mainChallenges.length - 1];
  const nextChallenge = collection.length > 1 ? collection[(index + 1) % collection.length] : mainChallenges[0];

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

        {[...content.rationale].reverse().map((section) => (
          <article className="challenge-story-card challenge-rationale-card" key={section.title}>
            <h2
              className={challenge.slug === "ai-workflow-builder"
                ? "section-kicker challenge-rationale-title"
                : undefined}
            >
              {section.title}
            </h2>
            {section.body.split("\n\n").map((paragraph) => (
              <p key={paragraph}><InlineLinks text={paragraph} /></p>
            ))}
          </article>
        ))}

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
          locale={locale}
          glossary={content.glossary}
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
