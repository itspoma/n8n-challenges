"use client";

import { useEffect, useRef } from "react";

import type { Locale } from "@/lib/home-copy";

type Theme = "dark" | "light";

const labels = {
  en: {
    dark: "Switch to dark theme",
    light: "Switch to light theme",
  },
  es: {
    dark: "Cambiar al tema oscuro",
    light: "Cambiar al tema claro",
  },
  uk: {
    dark: "Увімкнути темну тему",
    light: "Увімкнути світлу тему",
  },
} satisfies Record<Locale, Record<Theme, string>>;

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function syncButton(button: HTMLButtonElement | null, locale: Locale, theme: Theme) {
  if (!button) {
    return;
  }

  const nextTheme = theme === "dark" ? "light" : "dark";
  button.setAttribute("aria-label", labels[locale][nextTheme]);
  button.setAttribute("title", labels[locale][nextTheme]);
  button.setAttribute("aria-pressed", String(theme === "light"));
}

export function ThemeToggle({ locale }: { locale: Locale }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    syncButton(buttonRef.current, locale, currentTheme());
  }, [locale]);

  function toggleTheme() {
    const nextTheme = currentTheme() === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem("n8n-challenges-theme", nextTheme);
    } catch {}
    syncButton(buttonRef.current, locale, nextTheme);
  }

  return (
    <button
      ref={buttonRef}
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={labels[locale].light}
      aria-pressed="false"
      title={labels[locale].light}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <svg className="theme-icon theme-icon-sun" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="3" />
          <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M15.7 4.3l-1.4 1.4M5.7 14.3l-1.4 1.4" />
        </svg>
        <svg className="theme-icon theme-icon-moon" viewBox="0 0 20 20">
          <path d="M15.9 12.8A6.4 6.4 0 0 1 7.2 4.1 6.5 6.5 0 1 0 15.9 12.8Z" />
        </svg>
        <span className="theme-toggle-thumb" />
      </span>
    </button>
  );
}
