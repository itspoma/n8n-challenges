import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "@/app/_components/theme-toggle";
import { homeCopy, type Locale } from "@/lib/home-copy";

type SiteHeaderProps = {
  locale: Locale;
  languagePath?: string;
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

export function SiteHeader({ locale, languagePath = "", activePage }: SiteHeaderProps) {
  const copy = homeCopy[locale];

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link className="brand" href={`/${locale}`} aria-label="n8n Balloon Challenges home">
          <BrandLogo tone="white" priority themeAware />
          <span className="brand-divider" aria-hidden="true" />
          <strong className="event-name">balloon challenges</strong>
        </Link>

        <nav className="desktop-nav" aria-label={copy.accessibility.primaryNavigation}>
          <Link className="nav-with-count" href={`/${locale}#challenge-map`}>
            {copy.nav.challenges}
            <span className="nav-count" aria-label="10 challenges">10</span>
          </Link>
          <Link className={activePage === "events" ? "active" : undefined} href={`/${locale}/events`}>
            {copy.nav.events}
          </Link>
          <Link href={`/${locale}#how-it-works`}>{copy.nav.format}</Link>
        </nav>

        <div className="header-actions">
          <div className="locale-switch" aria-label="Language selector">
            <Link
              aria-current={locale === "en" ? "page" : undefined}
              className={locale === "en" ? "active" : undefined}
              href={`/en${languagePath}`}
            >
              EN
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              aria-current={locale === "es" ? "page" : undefined}
              className={locale === "es" ? "active" : undefined}
              href={`/es${languagePath}`}
            >
              ES
            </Link>
          </div>
          <ThemeToggle locale={locale} />
        </div>
      </div>
    </header>
  );
}
