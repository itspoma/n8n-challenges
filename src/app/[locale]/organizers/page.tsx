import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FooterMeta } from "@/app/_components/footer-meta";
import { BrandLogo, SiteHeader } from "@/app/_components/site-header";
import { homeCopy, isLocale, locales } from "@/lib/home-copy";
import { organizersCopy } from "@/lib/organizers";
import { createLocalizedMetadata } from "@/lib/site-metadata";

type OrganizersPageProps = {
  params: Promise<{ locale: string }>;
};

const phaseIds = ["before", "during", "after"] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: OrganizersPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const copy = organizersCopy[locale];

  return createLocalizedMetadata({
    locale,
    suffix: "/organizers",
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    images: (await parent).openGraph?.images,
  });
}

export default async function OrganizersPage({ params }: OrganizersPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const copy = organizersCopy[locale];
  const scoreLabel =
    locale === "es"
      ? "20 globos para ganar"
      : locale === "uk"
        ? "20 кульок до перемоги"
        : "20 balloons to win";

  return (
    <main lang={locale} className="organizers-page">
      <SiteHeader
        locale={locale}
        languagePath="/organizers"
        activePage="organizers"
      />

      <section className="organizers-hero" aria-labelledby="organizers-title">
        <div className="organizers-hero-inner shell">
          <div className="organizers-hero-copy">
            <p className="eyebrow">
              <span />
              {copy.eyebrow}
            </p>
            <h1 id="organizers-title">{copy.title}</h1>
            <p>{copy.intro}</p>
            <nav className="organizers-phase-nav" aria-label={copy.overviewLabel}>
              {copy.phases.map((phase, index) => (
                <a href={`#${phaseIds[index]}`} key={phase.label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {phase.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="organizers-score-card" aria-label={scoreLabel}>
            <span className="organizers-score-kicker">10 × 2</span>
            <strong>20</strong>
            <span className="organizers-score-label">
              {scoreLabel.replace("20 ", "")}
            </span>
            <div className="organizers-mini-balloons" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </section>

      <section className="organizers-guide shell" aria-label={copy.overviewLabel}>
        {copy.phases.map((phase, index) => (
          <article className="organizer-phase" id={phaseIds[index]} key={phase.label}>
            <header className="organizer-phase-heading">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{phase.label}</p>
              <h2>{phase.title}</h2>
            </header>

            <div className="organizer-phase-content">
              <p className="organizer-phase-intro">{phase.intro}</p>

              {index === 0 ? (
                <>
                  <dl className="organizer-supply-grid" aria-label={copy.supplies.label}>
                    <div>
                      <dt>{copy.supplies.balloons}</dt>
                      <dd>{copy.supplies.balloonsDetail}</dd>
                    </div>
                    <div>
                      <dt>{copy.supplies.helium}</dt>
                      <dd>{copy.supplies.heliumDetail}</dd>
                    </div>
                    <div>
                      <dt>{copy.supplies.fasteners}</dt>
                      <dd>{copy.supplies.fastenersDetail}</dd>
                    </div>
                  </dl>
                  <aside className="organizer-presentation-card">
                    <div className="organizer-presentation-icon" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div>
                      <p>{copy.presentation.label}</p>
                      <h3>{copy.presentation.title}</h3>
                      <p>{copy.presentation.body}</p>
                    </div>
                    <a
                      href="https://docs.google.com/presentation/d/1sOe56_3olN13qTL90saaHUnesEP7s4y_0u-69MxvTNA/edit"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {copy.presentation.button}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </aside>
                </>
              ) : null}

              <ol className="organizer-checklist">
                {phase.items.map((item, itemIndex) => (
                  <li key={item}>
                    <span>{String(itemIndex + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>

              {index === 1 ? (
                <div className="organizer-callouts">
                  <aside className="organizer-callout organizer-callout-tip">
                    <p>{copy.tipLabel}</p>
                    <h3>{copy.tipTitle}</h3>
                    <p>{copy.tipBody}</p>
                    <Link href={`/${locale}/challenges/ai-workflow-builder`}>
                      {locale === "es" ? "Abrir el reto n.º 6" : locale === "uk" ? "Відкрити завдання № 6" : "Open challenge #6"}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </aside>
                  <aside className="organizer-callout">
                    <p>{copy.noHeliumLabel}</p>
                    <h3>{copy.noHeliumTitle}</h3>
                    <p>{copy.noHeliumBody}</p>
                  </aside>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      <section className="organizers-finish shell" aria-labelledby="organizers-finish-title">
        <div>
          <p className="section-kicker section-kicker-light">{copy.eyebrow}</p>
          <h2 id="organizers-finish-title">{copy.finishTitle}</h2>
        </div>
        <div>
          <p>{copy.finishBody}</p>
          <div className="organizers-finish-actions">
            <Link className="contribute-button" href={`/${locale}#challenge-map`}>
              {copy.challengesButton} <span aria-hidden="true">→</span>
            </Link>
            <Link className="organizers-secondary-button" href={`/${locale}/events`}>
              {copy.eventsButton}
            </Link>
          </div>
        </div>
      </section>

      <footer className="site-footer shell">
        <Link className="brand brand-footer" href={`/${locale}`}>
          <BrandLogo themeAware />
          <span className="brand-divider" aria-hidden="true" />
          <strong className="event-name">Balloon Challenges</strong>
        </Link>
        <p>{homeCopy[locale].footer}</p>
        <div className="footer-links">
          <Link href={`/${locale}/blog`}>{locale === "uk" ? "Блог" : "Blog"}</Link>
          <Link href={`/${locale}/events`}>{homeCopy[locale].nav.events}</Link>
          <a href="#organizers-title" aria-label={copy.top}>↑ Top</a>
        </div>
        <FooterMeta />
      </footer>
    </main>
  );
}
