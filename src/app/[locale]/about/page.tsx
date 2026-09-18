import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FooterMeta } from "@/app/_components/footer-meta";
import { BrandLogo, SiteHeader } from "@/app/_components/site-header";
import { TrackedLink } from "@/app/_components/tracked-link";
import { aboutCopy } from "@/lib/about";
import { homeCopy, isLocale, locales } from "@/lib/home-copy";
import { maintainer } from "@/lib/people";
import { createLocalizedMetadata } from "@/lib/site-metadata";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

const repositoryUrl = "https://github.com/itspoma/n8n-challenges";
const contributingUrl = `${repositoryUrl}/blob/main/CONTRIBUTING.md`;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: AboutPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const copy = aboutCopy[locale];

  return createLocalizedMetadata({
    locale,
    suffix: "/about",
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    images: (await parent).openGraph?.images,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const copy = aboutCopy[locale];

  return (
    <main lang={locale} className="about-page">
      <SiteHeader locale={locale} languagePath="/about" activePage="about" />

      <section className="events-hero" aria-labelledby="about-title">
        <div className="events-hero-inner shell">
          <p className="eyebrow">
            <span />
            {copy.eyebrow}
          </p>
          <h1 id="about-title">{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>
      </section>

      <div className="about-content shell">
        <section className="about-section" aria-labelledby="about-why-title">
          <p className="section-kicker">{copy.why.kicker}</p>
          <h2 id="about-why-title">{copy.why.title}</h2>
          {copy.why.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="about-section" aria-labelledby="about-use-title">
          <p className="section-kicker">{copy.use.kicker}</p>
          <h2 id="about-use-title">{copy.use.title}</h2>
          {copy.use.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className="about-links">
            <li>
              <Link href={`/${locale}/organizers`}>
                {copy.use.organizersLink} <span aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/events`}>
                {copy.use.eventsLink} <span aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link href={`/${locale}#challenge-map`}>
                {copy.use.challengesLink} <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </section>

        <section className="about-section" aria-labelledby="about-contribute-title">
          <p className="section-kicker">{copy.contribute.kicker}</p>
          <h2 id="about-contribute-title">{copy.contribute.title}</h2>
          {copy.contribute.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className="about-links">
            <li>
              <a href={contributingUrl} target="_blank" rel="noopener noreferrer">
                {copy.contribute.guideLink} <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                {copy.contribute.repositoryLink} <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </section>
      </div>

      <section className="host-event-section shell" aria-labelledby="about-maintainer-title">
        <div className="host-event-card">
          <div>
            <p className="section-kicker section-kicker-light">{copy.maintainer.kicker}</p>
            <h2 id="about-maintainer-title">{copy.maintainer.title}</h2>
          </div>
          <div className="host-event-copy about-maintainer-copy">
            <p>
              <strong>{maintainer.name}</strong> – {maintainer.bio[locale]}
            </p>
            <p>{copy.maintainer.services}</p>
            <div className="organizers-finish-actions">
              <TrackedLink
                className="contribute-button"
                href={maintainer.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                event="linkedin_click"
                eventParams={{ location: "about_page" }}
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </TrackedLink>
              <a
                className="organizers-secondary-button"
                href={maintainer.gitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
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
          <a href="#about-title" aria-label={homeCopy[locale].accessibility.backToTop}>
            ↑ Top
          </a>
        </div>
        <FooterMeta locale={locale} />
      </footer>
    </main>
  );
}
