import type { Locale } from "@/lib/home-copy";
import { SITE_AUTHOR } from "@/lib/site-metadata";

type Maintainer = {
  name: string;
  linkedInUrl: string;
  gitHubUrl: string;
  experienceUrl: string;
  // Square head-and-shoulders crop of public/speaker/roman-1.jpg for the article author box.
  photo: { src: string; width: number; height: number };
  jobTitle: Record<Locale, string>;
  bio: Record<Locale, string>;
  expertise: Record<Locale, string[]>;
};

// Name and profile come from SITE_AUTHOR so credits, bylines and structured data stay in sync.
export const maintainer: Maintainer = {
  name: SITE_AUTHOR.name,
  linkedInUrl: SITE_AUTHOR.url,
  gitHubUrl: "https://github.com/itspoma",
  experienceUrl:
    "https://romanrodomansky.notion.site/Hi-I-m-Roman-Rodomansky-Engineering-AI-Entrepreneurship-experience-31147b0744ee808982eddcda542d2e06",
  photo: { src: "/people/roman-rodomansky.jpg", width: 250, height: 250 },
  jobTitle: {
    en: "n8n community organizer and automation consultant",
    es: "Organizador de la comunidad n8n y consultor de automatización",
    uk: "Організатор спільноти n8n і консультант з автоматизації",
  },
  bio: {
    en: "Creator and maintainer of n8n Balloon Challenges. Organizes hands-on n8n community events and builds n8n automations and community nodes.",
    es: "Crea y mantiene n8n Balloon Challenges. Organiza eventos prácticos de la comunidad n8n y desarrolla automatizaciones y nodos comunitarios para n8n.",
    uk: "Створює та підтримує n8n Balloon Challenges. Організовує практичні події спільноти n8n і розробляє автоматизації та ноди спільноти для n8n.",
  },
  expertise: {
    en: ["n8n", "Workflow automation", "AI agents", "Model Context Protocol (MCP)", "n8n community nodes"],
    es: ["n8n", "Automatización de workflows", "Agentes de IA", "Model Context Protocol (MCP)", "Nodos comunitarios de n8n"],
    uk: ["n8n", "Автоматизація воркфлоу", "ШІ-агенти", "Model Context Protocol (MCP)", "Ноди спільноти n8n"],
  },
};

type CreditLabels = {
  maintainedBy: string;
  aboutAuthor: string;
  expertise: string;
  challengeBy: string;
};

export const creditCopy: Record<Locale, CreditLabels> = {
  en: {
    maintainedBy: "Created and maintained by",
    aboutAuthor: "About the author",
    expertise: "Expertise",
    challengeBy: "Challenge by",
  },
  es: {
    maintainedBy: "Creado y mantenido por",
    aboutAuthor: "Autoría",
    expertise: "Especialidad",
    challengeBy: "Reto creado por",
  },
  uk: {
    maintainedBy: "Створення та підтримка:",
    aboutAuthor: "Авторство",
    expertise: "Експертиза",
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
