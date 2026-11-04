/**
 * What the site added and when: each challenge and event, dated by the commit that added its file
 * (content/challenges, content/events). The What's new feed lists them; content-factory-app reads
 * the English one to write its monthly product update (Projects → Updates → Product updates).
 */
import { execFileSync } from "node:child_process";

import { challengeFileName, challenges, difficultyLabels } from "@/lib/challenges";
import { isShallowRepository } from "@/lib/content-dates";
import { events } from "@/lib/events";
import type { Locale } from "@/lib/home-copy";

export type WhatsNewEntry = {
  id: string;
  // ISO time of the commit that added the challenge or event.
  addedAt: string;
  title: string;
  text: string;
  // Site path without the language segment.
  path: string;
};

export const whatsNewCopy = {
  en: {
    title: "What's new",
    description: "New challenges and events on n8n Balloon Challenges, newest first.",
    challenge: "New challenge",
    event: "New event",
  },
  es: {
    title: "Novedades",
    description: "Nuevos retos y eventos de n8n Balloon Challenges, primero los más recientes.",
    challenge: "Nuevo reto",
    event: "Nuevo evento",
  },
  uk: {
    title: "Що нового",
    description: "Нові завдання та події n8n Balloon Challenges, спершу найновіші.",
    challenge: "Нове завдання",
    event: "Нова подія",
  },
} satisfies Record<Locale, { title: string; description: string; challenge: string; event: string }>;

const addedTimes = new Map<string, string | undefined>();

/**
 * When a challenge or event file reached the site: the commit that first added it, following
 * renames, so a challenge that was renumbered keeps the day it was added.
 */
function addedTime(file: string) {
  if (addedTimes.has(file)) return addedTimes.get(file);
  // A shallow clone dates every file by its boundary commit; leave it out rather than guess.
  const time = isShallowRepository()
    ? undefined
    : execFileSync("git", ["log", "--follow", "--diff-filter=A", "--format=%cI", "--", file], { encoding: "utf8" })
        .split("\n")
        .filter(Boolean)
        .at(-1);
  addedTimes.set(file, time);
  return time;
}

/** The first paragraph of an event's description, as plain text. */
function firstParagraph(markdown: string) {
  const [paragraph = ""] = markdown.split(/\n\s*\n/);
  return paragraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500);
}

/** Every challenge and event in `locale`, newest first. */
export function whatsNew(locale: Locale): WhatsNewEntry[] {
  const copy = whatsNewCopy[locale];
  const entries: WhatsNewEntry[] = [];
  for (const challenge of challenges) {
    const addedAt = addedTime(`content/challenges/${challengeFileName(challenge.number, challenge.slug)}`);
    if (!addedAt) continue;
    const text = challenge.copy[locale];
    entries.push({
      id: `challenge-${challenge.slug}`,
      addedAt,
      title: `${copy.challenge}: ${text.title}`,
      text: `${text.summary} ${difficultyLabels[locale][challenge.difficulty]}, ${challenge.time}.`,
      path: `/challenges/${challenge.slug}`,
    });
  }
  for (const event of events) {
    const addedAt = addedTime(`content/events/${event.slug}.md`);
    if (!addedAt) continue;
    entries.push({
      id: `event-${event.slug}`,
      addedAt,
      title: `${copy.event}: ${event.title}`,
      text: `${event.date}, ${event.location}. ${firstParagraph(event.description)}`,
      path: "/events",
    });
  }
  return entries.sort(
    (first, second) => Date.parse(second.addedAt) - Date.parse(first.addedAt) || first.id.localeCompare(second.id),
  );
}
