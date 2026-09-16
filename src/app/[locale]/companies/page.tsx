import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FooterMeta } from "@/app/_components/footer-meta";
import { BrandLogo, SiteHeader } from "@/app/_components/site-header";
import { companiesCopy } from "@/lib/companies";
import { homeCopy, isLocale, locales } from "@/lib/home-copy";
import { maintainer } from "@/lib/people";
import { speakerPhotos } from "@/lib/speaker-photos";
import { createLocalizedMetadata } from "@/lib/site-metadata";

type CompaniesPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: CompaniesPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const copy = companiesCopy[locale];

  return createLocalizedMetadata({
    locale,
    suffix: "/companies",
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    images: (await parent).openGraph?.images,
  });
}

export default async function CompaniesPage({ params }: CompaniesPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const copy = companiesCopy[locale];
  const photos = speakerPhotos();

  return (
    <main lang={locale} className="companies-page">
      <SiteHeader locale={locale} languagePath="/companies" activePage="companies" />

      <section className="events-hero companies-hero" aria-labelledby="companies-title">
        <div className="events-hero-inner companies-hero-inner shell">
          <div className="companies-hero-copy">
            <p className="eyebrow">
              <span />
              {copy.eyebrow}
            </p>
            <h1 id="companies-title">{copy.title}</h1>
            <p className="companies-hero-intro">{copy.intro}</p>
            <a
              className="contribute-button companies-hero-cta"
              href={maintainer.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.cta.button} <span aria-hidden="true">↗</span>
            </a>
            <p className="companies-speaker-caption">
              {copy.speaker.lead} <strong>{maintainer.name}</strong> – {copy.speaker.role}{" "}
              <a href={maintainer.experienceUrl} target="_blank" rel="noopener noreferrer">
                {copy.speaker.experienceLink} <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>

          {photos.length > 0 ? (
            <div className="companies-photo-mosaic" role="group" aria-label={copy.speaker.photoAlt}>
              {photos.map((photo, index) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 720px) 50vw, 260px"
                  alt={index === 0 ? copy.speaker.photoAlt : ""}
                  priority={index === 0}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <div className="about-content shell">
        <section className="about-section" aria-labelledby="companies-what-title">
          <p className="section-kicker">{copy.what.kicker}</p>
          <h2 id="companies-what-title">{copy.what.title}</h2>
          {copy.what.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      </div>

      <section className="companies-section shell" aria-labelledby="companies-programs-title">
        <div className="companies-section-heading">
          <h2 id="companies-programs-title">{copy.programs.title}</h2>
          <p>{copy.programs.body}</p>
        </div>

        <div className="companies-program-grid">
          {copy.programs.items.map((program) => (
            <article className="companies-program-card" key={program.title}>
              <h3>{program.title}</h3>
              <p className="companies-program-body">{program.body}</p>
              <p className="companies-program-duration">
                <span className="sr-only">{`${copy.programs.durationLabel}: `}</span>
                {program.duration}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="companies-section shell" aria-labelledby="companies-details-title">
        <div className="companies-section-heading">
          <h2 id="companies-details-title">{copy.details.title}</h2>
        </div>

        <dl className="companies-detail-grid">
          {copy.details.items.map((item) => (
            <div key={item.term}>
              <dt>{item.term}</dt>
              <dd>{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="host-event-section shell" aria-labelledby="companies-cta-title">
        <div className="host-event-card">
          <div>
            <p className="section-kicker section-kicker-light">{copy.cta.kicker}</p>
            <h2 id="companies-cta-title">{copy.cta.title}</h2>
          </div>
          <div className="host-event-copy">
            <p>{copy.cta.body}</p>
            <a
              className="contribute-button create-event-entry"
              href={maintainer.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.cta.button} <span aria-hidden="true">↗</span>
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
          <Link href={`/${locale}/blog`}>{locale === "uk" ? "Блог" : "Blog"}</Link>
          <Link href={`/${locale}/events`}>{homeCopy[locale].nav.events}</Link>
          <Link href={`/${locale}/about`}>{homeCopy[locale].nav.about}</Link>
          <a
            href="#companies-title"
            aria-label={homeCopy[locale].accessibility.backToTop}
          >
            ↑ Top
          </a>
        </div>
        <FooterMeta locale={locale} />
      </footer>
    </main>
  );
}
