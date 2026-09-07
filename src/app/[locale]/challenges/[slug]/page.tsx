import type { Metadata } from "next";
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

type ChallengePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const inlineLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
const webhookPattern = /\bwebhook\b/i;

const webhookDefinitions: Record<Locale, string> = {
  en: "A webhook is a URL that starts a workflow when another app or browser sends data to it.",
  es: "Un webhook es una URL que inicia un workflow cuando otra aplicación o navegador le envía datos.",
};

function TaskWithGlossary({ text, locale }: { text: string; locale: Locale }) {
  const match = webhookPattern.exec(text);

  if (!match || match.index === undefined) {
    return text;
  }

  const term = match[0];
  const termEnd = match.index + term.length;
  const tooltipId = `webhook-definition-${locale}`;

  return (
    <>
      {text.slice(0, match.index)}
      <span className="glossary-term" tabIndex={0} aria-describedby={tooltipId}>
        {term}
        <span className="glossary-tooltip" id={tooltipId} role="tooltip">
          {webhookDefinitions[locale]}
        </span>
      </span>
      {text.slice(termEnd)}
    </>
  );
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

export async function generateMetadata({ params }: ChallengePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const challenge = getChallenge(slug);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (!isLocale(locale) || !challenge) {
    return {};
  }

  const content = challenge.copy[locale];

  return {
    title: content.title,
    description: content.summary,
    alternates: {
      languages: {
        en: `${basePath}/en/challenges/${slug}`,
        es: `${basePath}/es/challenges/${slug}`,
      },
    },
  };
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const { locale, slug } = await params;
  const challenge = getChallenge(slug);

  if (!isLocale(locale) || !challenge) {
    notFound();
  }

  const content = challenge.copy[locale];
  const labels = challengePageCopy[locale];
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
            <p className="challenge-detail-summary">{content.summary}</p>
            <div className="challenge-detail-meta">
              <span>{difficultyLabels[locale][challenge.difficulty]}</span>
              <span>{labels.complexity}: {challenge.complexity}/5</span>
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
            <h2><TaskWithGlossary text={content.task} locale={locale} /></h2>
          </article>

          <article className="challenge-bonus-card">
            <p className="section-kicker">{labels.bonusTask}</p>
            <h2>{content.bonusTask}</h2>
          </article>
        </div>

        <article className="challenge-story-card">
          <p className="section-kicker">{labels.scenario}</p>
          <ul className="challenge-example-list">
            {content.scenario.map((example) => (
              <li key={example}>{example}</li>
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
                <p>{requirement}</p>
              </li>
            ))}
          </ol>
        </article>

        <ChallengeActions
          challengeSlug={challenge.slug}
          labels={labels}
          tips={content.tips}
          nextChallengeHref={`/${locale}/challenges/${nextChallenge.slug}`}
        />

        {nextChallenge ? (
          <Link className="next-challenge-link" href={`/${locale}/challenges/${nextChallenge.slug}`}>
            <span>{labels.next}</span>
            <strong>{nextChallenge.copy[locale].title}</strong>
            <i aria-hidden="true">→</i>
          </Link>
        ) : null}
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
