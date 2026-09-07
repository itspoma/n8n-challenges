import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FooterMeta } from "@/app/_components/footer-meta";
import { BrandLogo, SiteHeader } from "@/app/_components/site-header";
import { events, eventsPageCopy, formatEventDate } from "@/lib/events";
import { homeCopy, isLocale, locales } from "@/lib/home-copy";

type EventsPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: EventsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (!isLocale(locale)) return {};

  const copy = eventsPageCopy[locale];

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: {
      languages: {
        en: `${basePath}/en/events`,
        es: `${basePath}/es/events`,
      },
    },
  };
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const copy = eventsPageCopy[locale];
  const contributionUrl =
    "https://github.com/itspoma/n8n-challenges/blob/main/CONTRIBUTING.md#add-an-event";

  return (
    <main lang={locale} className="events-page">
      <SiteHeader locale={locale} languagePath="/events" activePage="events" />

      <section className="events-hero" aria-labelledby="events-title">
        <div className="events-hero-inner shell">
          <p className="eyebrow">
            <span />
            {copy.eyebrow}
          </p>
          <h1 id="events-title">{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>
      </section>

      <section className="events-list-section shell" aria-label={copy.eyebrow}>
        {events.length > 0 ? (
          <div className="events-grid">
            {events.map((event) => (
              <article className="event-card" key={event.slug}>
                <div className="event-card-copy">
                  <h2>{event.title}</h2>
                  <p className="event-card-description">{event.description}</p>
                </div>

                <dl className="event-card-stats">
                  <div className="event-date-stat">
                    <dt>{copy.date}</dt>
                    <dd>{formatEventDate(event.date, locale)}</dd>
                  </div>
                  <div className="event-location-stat">
                    <dt>{copy.location}</dt>
                    <dd>{event.location}</dd>
                  </div>
                  <div className="event-language-stat">
                    <dt>{copy.language}</dt>
                    <dd>{event.language}</dd>
                  </div>
                  <div className="event-organizer-stat">
                    <dt>{copy.organizer}</dt>
                    <dd>{event.organizer}</dd>
                  </div>
                </dl>

                <div className="event-card-actions event-card-actions-single">
                  <a
                    className="event-team-action event-team-action-primary"
                    href={event.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${copy.openEventLabel}: ${event.title}`}
                  >
                    {copy.viewEvent} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="events-empty-state">
            <h2>{copy.emptyTitle}</h2>
            <p>{copy.emptyBody}</p>
          </div>
        )}
      </section>

      <section className="host-event-section shell" aria-labelledby="host-event-title">
        <div className="host-event-card">
          <div>
            <p className="section-kicker section-kicker-light">{copy.contributeKicker}</p>
            <h2 id="host-event-title">{copy.contributeTitle}</h2>
          </div>
          <div className="host-event-copy">
            <p>{copy.contributeBody}</p>
            <a
              className="contribute-button create-event-entry"
              href={contributionUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.contributeButton}
              <span aria-hidden="true">↗</span>
            </a>
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
          <a
            href="https://github.com/itspoma/n8n-challenges"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a href="https://github.com/itspoma" target="_blank" rel="noopener noreferrer">
            {homeCopy[locale].footerContact} ↗
          </a>
          <a href="#events-title" aria-label={homeCopy[locale].accessibility.backToTop}>
            ↑ Top
          </a>
        </div>
        <FooterMeta />
      </footer>
    </main>
  );
}
