import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import type { Locale } from "@/lib/home-copy";

export type EventListing = {
  slug: string;
  title: string;
  date: string;
  location: string;
  countryCode: string;
  language: string;
  organizer: string;
  eventUrl: string;
  description: string;
};

export type EventsPageCopy = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  date: string;
  location: string;
  language: string;
  organizer: string;
  viewEvent: string;
  openEventLabel: string;
  emptyTitle: string;
  emptyBody: string;
  contributeKicker: string;
  contributeTitle: string;
  contributeBody: string;
  contributeButton: string;
};

export const eventsPageCopy = {
  en: {
    metadataTitle: "Community events",
    metadataDescription: "Find community-run n8n Balloon Challenges events.",
    eyebrow: "Community events",
    title: "Build workflows together, in person.",
    intro:
      "Find an n8n Balloon Challenges event, meet other builders, and learn automation through practice.",
    date: "Date",
    location: "Location",
    language: "Language",
    organizer: "Organized by",
    viewEvent: "View event",
    openEventLabel: "Open event",
    emptyTitle: "No events are listed yet.",
    emptyBody: "Organizers can propose the first event through GitHub.",
    contributeKicker: "For n8n event organizers",
    contributeTitle: "Bring Balloon Challenges to your community.",
    contributeBody:
      "Copy the event template, add your public event details, and submit a pull request. No account or event-management backend is required.",
    contributeButton: "Add your event",
  },
  es: {
    metadataTitle: "Eventos de la comunidad",
    metadataDescription: "Encuentra eventos de n8n Balloon Challenges organizados por la comunidad.",
    eyebrow: "Eventos de la comunidad",
    title: "Crea workflows en compañía y en persona.",
    intro:
      "Encuentra un evento de n8n Balloon Challenges, conoce a otros builders y aprende automatización practicando.",
    date: "Fecha",
    location: "Lugar",
    language: "Idioma",
    organizer: "Organizado por",
    viewEvent: "Ver evento",
    openEventLabel: "Abrir evento",
    emptyTitle: "Todavía no hay eventos publicados.",
    emptyBody: "Los organizadores pueden proponer el primero a través de GitHub.",
    contributeKicker: "Para organizadores de eventos n8n",
    contributeTitle: "Lleva Balloon Challenges a tu comunidad.",
    contributeBody:
      "Copia la plantilla, añade los datos públicos de tu evento y envía un pull request. No necesitas una cuenta ni un backend de gestión.",
    contributeButton: "Añade tu evento",
  },
} satisfies Record<Locale, EventsPageCopy>;

const eventDirectory = join(process.cwd(), "content", "events");
const requiredMetadata = [
  "slug",
  "title",
  "date",
  "location",
  "countryCode",
  "language",
  "organizer",
  "eventUrl",
] as const;

function fail(fileName: string, message: string): never {
  throw new Error(`Invalid event content in ${fileName}: ${message}`);
}

function parseEvent(fileName: string): EventListing {
  const source = readFileSync(join(eventDirectory, fileName), "utf8");
  const documentMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!documentMatch) {
    fail(fileName, "expected a metadata block wrapped in --- markers");
  }

  const metadata: Record<string, string> = {};

  for (const sourceLine of documentMatch[1].split(/\r?\n/)) {
    const line = sourceLine.trim();
    if (!line) continue;

    const separator = line.indexOf(":");
    if (separator < 1) fail(fileName, `invalid metadata line "${line}"`);

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (!value) fail(fileName, `metadata field "${key}" cannot be empty`);
    metadata[key] = value;
  }

  for (const field of requiredMetadata) {
    if (!metadata[field]) fail(fileName, `metadata field "${field}" is required`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.slug)) {
    fail(fileName, "slug must use lowercase kebab-case");
  }

  if (fileName !== `${metadata.slug}.md`) {
    fail(fileName, `filename must be ${metadata.slug}.md`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.date)) {
    fail(fileName, "date must use YYYY-MM-DD format");
  }

  const parsedDate = new Date(`${metadata.date}T00:00:00Z`);
  if (Number.isNaN(parsedDate.valueOf()) || parsedDate.toISOString().slice(0, 10) !== metadata.date) {
    fail(fileName, "date must be a real calendar date");
  }

  if (!/^[A-Z]{2}$/.test(metadata.countryCode)) {
    fail(fileName, "countryCode must be a two-letter uppercase country code");
  }

  if (!/^https:\/\//.test(metadata.eventUrl)) {
    fail(fileName, "eventUrl must be a public HTTPS URL");
  }

  const description = documentMatch[2].trim();
  if (!description) fail(fileName, "a public description is required after the metadata block");

  return {
    slug: metadata.slug,
    title: metadata.title,
    date: metadata.date,
    location: metadata.location,
    countryCode: metadata.countryCode,
    language: metadata.language,
    organizer: metadata.organizer,
    eventUrl: metadata.eventUrl,
    description,
  };
}

function loadEvents() {
  const loaded = readdirSync(eventDirectory)
    .filter((fileName) => /^[a-z0-9][a-z0-9-]*\.md$/.test(fileName))
    .map(parseEvent)
    .sort((left, right) => left.date.localeCompare(right.date));

  const slugs = new Set(loaded.map((event) => event.slug));
  if (slugs.size !== loaded.length) throw new Error("Event slugs must be unique");

  return loaded;
}

export const events = loadEvents();

const millisecondsPerDay = 24 * 60 * 60 * 1000;

export function getEventsNearDate(referenceDate = new Date(), dayRange = 7, limit = 3) {
  const referenceDay = Date.UTC(
    referenceDate.getUTCFullYear(),
    referenceDate.getUTCMonth(),
    referenceDate.getUTCDate(),
  );
  const range = dayRange * millisecondsPerDay;

  return events
    .map((event) => ({
      event,
      timestamp: Date.parse(`${event.date}T00:00:00Z`),
    }))
    .filter(({ timestamp }) => Math.abs(timestamp - referenceDay) <= range)
    .sort(
      (left, right) =>
        Math.abs(left.timestamp - referenceDay) - Math.abs(right.timestamp - referenceDay) ||
        left.timestamp - right.timestamp,
    )
    .slice(0, limit)
    .map(({ event }) => event);
}

export function formatEventDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
