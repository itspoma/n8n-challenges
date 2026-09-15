import type { Locale } from "@/lib/home-copy";
import { SITE_AUTHOR } from "@/lib/site-metadata";

type Maintainer = {
  name: string;
  linkedInUrl: string;
  gitHubUrl: string;
  bio: Record<Locale, string>;
};

// Name and profile come from SITE_AUTHOR so credits, bylines and structured data stay in sync.
export const maintainer: Maintainer = {
  name: SITE_AUTHOR.name,
  linkedInUrl: SITE_AUTHOR.url,
  gitHubUrl: "https://github.com/itspoma",
  bio: {
    en: "Creator and maintainer of n8n Balloon Challenges. Organizes hands-on n8n community events and builds n8n automations and community nodes.",
    es: "Crea y mantiene n8n Balloon Challenges. Organiza eventos prácticos de la comunidad n8n y desarrolla automatizaciones y nodos comunitarios para n8n.",
    uk: "Створює та підтримує n8n Balloon Challenges. Організовує практичні події спільноти n8n і розробляє автоматизації та ноди спільноти для n8n.",
  },
};

type CreditLabels = {
  maintainedBy: string;
  aboutAuthor: string;
  challengeBy: string;
};

export const creditCopy: Record<Locale, CreditLabels> = {
  en: {
    maintainedBy: "Created and maintained by",
    aboutAuthor: "About the author",
    challengeBy: "Challenge by",
  },
  es: {
    maintainedBy: "Creado y mantenido por",
    aboutAuthor: "Autoría",
    challengeBy: "Reto creado por",
  },
  uk: {
    maintainedBy: "Створення та підтримка:",
    aboutAuthor: "Авторство",
    challengeBy: "Авторство:",
  },
};

export function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}
