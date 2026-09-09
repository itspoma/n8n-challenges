import { withBasePath } from "@/lib/site-path";
import { challengeMetricValues } from "@/lib/challenge-metrics";
import Link from "next/link";

import { BalloonString } from "@/app/_components/balloon-string";
import { ChallengeLevelGrid } from "@/app/_components/challenge-level-grid";
import { EventPhotoStrip } from "@/app/_components/event-photo-strip";
import { FooterMeta } from "@/app/_components/footer-meta";
import { BrandLogo, SiteHeader } from "@/app/_components/site-header";
import { mainChallenges, moreChallenges, difficultyLabels } from "@/lib/challenges";
import { eventsPageCopy, formatEventDate, getEventsNearDate } from "@/lib/events";
import { homeCopy, type Locale } from "@/lib/home-copy";

const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
const balloonColorNames: Record<string, Record<Locale, string>> = {
  "#fffdf6": { en: "White", es: "Blanco", uk: "Білий" },
  "#e84d49": { en: "Red", es: "Rojo", uk: "Червоний" },
  "#f7cb55": { en: "Yellow", es: "Amarillo", uk: "Жовтий" },
  "#ff8a55": { en: "Orange", es: "Naranja", uk: "Помаранчевий" },
  "#244a9b": { en: "Dark blue", es: "Azul oscuro", uk: "Темно-синій" },
  "#8dcef0": { en: "Light blue", es: "Azul claro", uk: "Блакитний" },
  "#a9d96c": { en: "Green", es: "Verde", uk: "Зелений" },
  "#9b83d7": { en: "Purple", es: "Morado", uk: "Фіолетовий" },
  "#ea4b71": { en: "Pink", es: "Rosa", uk: "Рожевий" },
  "#040506": { en: "Black", es: "Negro", uk: "Чорний" },
  "#c6c9c7": { en: "Grey", es: "Gris", uk: "Сірий" },
};
const advancedOrder: Record<string, number> = {
  "mercadona-mcp-assistant": 0,
  "unstable-restaurant-orders": 1,
  "google-drive-rag": 2,
};
const orderedChallenges = [...mainChallenges].sort(
  (left, right) => difficultyOrder[left.difficulty] - difficultyOrder[right.difficulty]
    || (left.difficulty === "advanced"
      ? (advancedOrder[left.slug] ?? Infinity) - (advancedOrder[right.slug] ?? Infinity)
      : 0)
    || left.number - right.number,
);

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const eventCopy = eventsPageCopy[locale];
  const currentEvents = getEventsNearDate();

  return (
    <main lang={locale}>
      <SiteHeader locale={locale} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-balloon-sky" aria-hidden="true">
          {(["one", "two", "three"] as const).map((balloon) => (
            <span className={`hero-balloon-flight hero-balloon-flight-${balloon}`} key={balloon}>
              <span className="hero-floating-balloon">
                <span className="hero-floating-balloon-body" />
                <BalloonString className="hero-floating-balloon-string" />
              </span>
            </span>
          ))}
          {(["one", "two", "three"] as const).map((node) => (
            <span className={`hero-node-flight hero-node-flight-${node}`} key={node}>
              <span className="hero-floating-node">
                <span className="hero-floating-node-port hero-floating-node-port-input" />
                <span className="hero-node-balloon">
                  <span className="hero-node-balloon-body" />
                  <BalloonString className="hero-node-balloon-string" />
                </span>
                <span className="hero-floating-node-port hero-floating-node-port-output" />
              </span>
            </span>
          ))}
        </div>
        <div className="hero-copy shell">
          <p className="eyebrow">
            <span />
            {copy.eyebrow}
          </p>
          <h1 id="hero-title">
            <span>{copy.titleTop}</span>
            {" "}
            <em>{copy.titleBottom}</em>
          </h1>
          <p className="hero-intro">{copy.intro}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#challenge-map">
              {copy.primaryCta}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label={copy.accessibility.formatSummary}>
        <div className="shell stats-grid">
          {copy.stats.map((stat, index) => (
            <div className="stat" key={stat.label}>
              <strong>{challengeMetricValues[index]}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <EventPhotoStrip
        ariaLabel={copy.gallery.ariaLabel}
        kicker={copy.gallery.kicker}
        photoAlts={copy.gallery.photoAlts}
      />

      <section className="format-section shell" id="how-it-works" aria-labelledby="format-title">
        <div className="section-heading format-heading">
          <div>
            <p className="section-kicker">{copy.format.kicker}</p>
            <h2 id="format-title">{copy.format.title}</h2>
          </div>
          <p>{copy.format.body}</p>
        </div>

        <ol className="steps-grid">
          {copy.format.steps.map((step, index) => (
            <li className="step-card" key={step.number}>
              <div className="step-topline">
                <span>{step.number}</span>
                <i aria-hidden="true" />
              </div>
              <h3>
                {step.href ? (
                  <a
                    className="step-action-link"
                    href={withBasePath(step.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {step.title}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : step.title}
              </h3>
              <span className={`mini-balloon mini-balloon-${index + 1}`} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>

      <section
        className="collection-section shell"
        id="challenge-map"
        aria-labelledby="collection-title"
      >
        <div className="collection-copy">
          <div>
            <p className="section-kicker">{copy.collection.eyebrow}</p>
            <h2 id="collection-title">{copy.collection.title}</h2>
          </div>
          <p>{copy.collection.body}</p>
        </div>

        <ol className="balloon-collection" aria-label={copy.accessibility.balloonCollection}>
          {orderedChallenges.map((challenge) => (
            <li
              id={`challenge-${challenge.slug}`}
              key={challenge.slug}
              data-difficulty={challenge.difficulty}
            >
              <Link
                className="balloon-challenge-card"
                href={`/${locale}/challenges/${challenge.slug}`}
                aria-label={`${copy.collection.openLabel}: ${challenge.copy[locale].title}`}
              >
                <span
                  className="collection-balloon"
                  title={balloonColorNames[challenge.color.toLowerCase()]?.[locale] ?? challenge.color}
                  style={{ "--balloon": challenge.color, "--ink": challenge.ink } as React.CSSProperties}
                  aria-hidden="true"
                >
                  <strong>{String(challenge.number).padStart(2, "0")}</strong>
                  <BalloonString className="collection-balloon-string" />
                </span>
                <span className="balloon-card-copy">
                  <span className="balloon-card-meta">
                    <span>{difficultyLabels[locale][challenge.difficulty]}</span>
                  </span>
                  <strong>{challenge.copy[locale].title}</strong>
                </span>
                <span className="balloon-card-arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
        {moreChallenges.length > 0 ? (
          <details className="more-challenges" id="more-challenges">
            <summary><span>{copy.collection.moreTitle}</span><span className="more-challenges-toggle" aria-hidden="true">+</span></summary>
            <p>{copy.collection.moreBody}</p>
        <ol className="balloon-collection" aria-label={copy.collection.moreTitle}>
          {moreChallenges.map((challenge) => (
            <li
              id={`challenge-${challenge.slug}`}
              key={challenge.slug}
              data-difficulty={challenge.difficulty}
            >
              <Link
                className="balloon-challenge-card"
                href={`/${locale}/challenges/${challenge.slug}`}
                aria-label={`${copy.collection.openLabel}: ${challenge.copy[locale].title}`}
              >
                <span
                  className="collection-balloon"
                  title={balloonColorNames[challenge.color.toLowerCase()]?.[locale] ?? challenge.color}
                  style={{ "--balloon": challenge.color, "--ink": challenge.ink } as React.CSSProperties}
                  aria-hidden="true"
                >
                  <strong>{String(challenge.number).padStart(2, "0")}</strong>
                  <BalloonString className="collection-balloon-string" />
                </span>
                <span className="balloon-card-copy">
                  <span className="balloon-card-meta">
                    <span>{difficultyLabels[locale][challenge.difficulty]}</span>
                  </span>
                  <strong>{challenge.copy[locale].title}</strong>
                </span>
                <span className="balloon-card-arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
          </details>
        ) : null}
      </section>

      <section className="challenge-section" id="experience-levels" aria-labelledby="challenge-title">
        <div className="shell">
          <div className="section-heading challenge-heading">
            <div>
              <p className="section-kicker">{copy.challengeMap.kicker}</p>
              <h2 id="challenge-title">{copy.challengeMap.title}</h2>
            </div>
            <p>{copy.challengeMap.body}</p>
          </div>

          <ChallengeLevelGrid
            levels={copy.challengeMap.levels.map((level, index) => {
              const difficulty = (["beginner", "intermediate", "advanced"] as const)[index];

              return {
                ...level,
                difficulty,
                challenges: orderedChallenges
                  .filter((challenge) => challenge.difficulty === difficulty)
                  .map((challenge) => ({
                    color: challenge.color,
                    ink: challenge.ink,
                    number: challenge.number,
                    slug: challenge.slug,
                    title: challenge.copy[locale].title,
                  })),
              };
            })}
            openLabel={copy.collection.openLabel}
          />
        </div>
      </section>

      <section className="contribute-section shell" aria-labelledby="contribute-title">
        <div className="contribute-card">
          <div>
            <p className="section-kicker section-kicker-light">{copy.contribute.kicker}</p>
            <h2 id="contribute-title">{copy.contribute.title}</h2>
          </div>
          <div className="contribute-copy">
            <p>{copy.contribute.body}</p>
            <a
              className="contribute-button"
              href="https://github.com/itspoma/n8n-challenges/blob/main/CONTRIBUTING.md#add-an-event"
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.contribute.button}
              <ArrowIcon />
            </a>
          </div>

          {currentEvents.length > 0 ? (
            <div className="current-events-panel">
              <div className="current-events-heading">
                <div>
                  <p className="section-kicker section-kicker-light">
                    {copy.contribute.currentEventsKicker}
                  </p>
                </div>
                <Link className="current-events-all" href={`/${locale}/events`}>
                  {copy.contribute.allEvents} <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="current-events-grid">
                {currentEvents.map((event) => (
                  <a
                    className="current-event-card"
                    href={event.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${eventCopy.openEventLabel}: ${event.title}`}
                    key={event.slug}
                  >
                    <span className="current-event-card-top">
                      <time dateTime={event.date}>{formatEventDate(event.date, locale)}</time>
                      <i aria-hidden="true">↗</i>
                    </span>
                    <strong>{event.title}</strong>
                    <span>{event.location}</span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <footer className="site-footer shell">
        <Link className="brand brand-footer" href={`/${locale}`}>
          <BrandLogo themeAware />
          <span className="brand-divider" aria-hidden="true" />
          <strong className="event-name">Balloon Challenges</strong>
        </Link>
        <p>{copy.footer}</p>
        <div className="footer-links">
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
            {copy.footerContact} ↗
          </a>
          <a href="#hero-title" aria-label={copy.accessibility.backToTop}>
            ↑ Top
          </a>
        </div>
        <FooterMeta />
      </footer>
    </main>
  );
}
