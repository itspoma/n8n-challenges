import Image from "next/image";
import { challengeCountLabel } from "@/lib/challenge-metrics";
import Link from "next/link";

import { NavMenu } from "@/app/_components/nav-menu";
import { ThemeToggle } from "@/app/_components/theme-toggle";
import { homeCopy, localeLabels, locales, type Locale } from "@/lib/home-copy";

type SiteHeaderProps = {
  locale: Locale;
  languagePath?: string;
  languagePaths?: Partial<Record<Locale, string>>;
  activePage?: "events" | "organizers" | "about";
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
  const secondaryLinks = [
    {
      href: `/${locale}/events`,
      label: copy.nav.events,
      active: activePage === "events",
    },
    {
      href: `/${locale}/organizers`,
      label: copy.nav.organizers,
      active: activePage === "organizers",
    },
    {
      href: `/${locale}/about`,
      label: copy.nav.about,
      active: activePage === "about",
    },
  ];

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
          <strong className="event-name">{copy.headerTagline}</strong>
        </Link>

        <nav
          className="desktop-nav"
          aria-label={copy.accessibility.primaryNavigation}
        >
          <Link href={`/${locale}#how-it-works`}>{copy.nav.format}</Link>
          <Link className="nav-with-count" href={`/${locale}#challenge-map`}>
            {copy.nav.challenges}
            <span
              className="nav-count"
              aria-label={`${copy.nav.challenges}: ${challengeCountLabel}`}
            >
              {challengeCountLabel}
            </span>
          </Link>
          <NavMenu
            className="nav-menu-more"
            icon="chevron"
            label={copy.nav.more}
            active={secondaryLinks.some((link) => link.active)}
            items={secondaryLinks}
          />
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
          <NavMenu
            className="nav-menu-mobile"
            icon="bars"
            label={copy.nav.menu}
            items={[
              { href: `/${locale}#how-it-works`, label: copy.nav.format },
              {
                href: `/${locale}#challenge-map`,
                label: copy.nav.challenges,
                badge: challengeCountLabel,
              },
              ...secondaryLinks,
            ]}
          />
        </div>
      </div>
    </header>
  );
}
