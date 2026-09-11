import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "@/app/_components/theme-toggle";
import { homeCopy, localeLabels, locales, type Locale } from "@/lib/home-copy";

type SiteHeaderProps = {
  locale: Locale;
  languagePath?: string;
  languagePaths?: Partial<Record<Locale, string>>;
  activePage?: "events";
};

export function BrandLogo({
  tone = "dark",
  priority = false,
  themeAware = false,
}: {
  tone?: "dark" | "white";
  priority?: boolean;
  themeAware?: boolean;
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (themeAware) {
    return (
      <span className="brand-logo-pair">
        <Image
          className="brand-logo brand-logo-on-dark"
          src={`${basePath}/brand/n8n-logo-white.svg`}
          width={148}
          height={40}
          alt="n8n"
          priority={priority}
        />
        <Image
          className="brand-logo brand-logo-on-light"
          src={`${basePath}/brand/n8n-logo-dark.svg`}
          width={148}
          height={40}
          alt=""
          priority={priority}
        />
      </span>
    );
  }

  return (
    <Image
      className="brand-logo"
      src={`${basePath}/brand/n8n-logo-${tone}.svg`}
      width={148}
      height={40}
      alt="n8n"
      priority={priority}
    />
  );
}

export function SiteHeader({
  locale,
  languagePath = "",
  languagePaths,
  activePage,
}: SiteHeaderProps) {
  const copy = homeCopy[locale];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link
          className="brand"
          href={`/${locale}`}
          aria-label={copy.accessibility.home}
        >
          <BrandLogo tone="white" priority themeAware />
          <span className="brand-divider" aria-hidden="true" />
          <strong className="event-name">balloon challenges</strong>
        </Link>

        <nav
          className="desktop-nav"
          aria-label={copy.accessibility.primaryNavigation}
        >
          <Link className="nav-with-count" href={`/${locale}#challenge-map`}>
            {copy.nav.challenges}
            <span
              className="nav-count"
              aria-label={copy.accessibility.challengeCount}
            >
              10
            </span>
          </Link>
          <Link
            className={activePage === "events" ? "active" : undefined}
            href={`/${locale}/events`}
          >
            {copy.nav.events}
          </Link>
          <Link href={`/${locale}#how-it-works`}>{copy.nav.format}</Link>
        </nav>

        <div className="header-actions">
          <div
            className="locale-switch"
            aria-label={copy.accessibility.languageSelector}
          >
            {locales
              .filter(
                (targetLocale) => !languagePaths || languagePaths[targetLocale],
              )
              .map((targetLocale, index) => (
                <span className="locale-switch-option" key={targetLocale}>
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  <a
                    aria-current={locale === targetLocale ? "page" : undefined}
                    className={locale === targetLocale ? "active" : undefined}
                    href={`${basePath}/${targetLocale}${languagePaths?.[targetLocale] ?? languagePath}`}
                    hrefLang={targetLocale}
                  >
                    {localeLabels[targetLocale]}
                  </a>
                </span>
              ))}
          </div>
          <ThemeToggle locale={locale} />
        </div>
      </div>
    </header>
  );
}
