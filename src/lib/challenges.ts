import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import type { Locale } from "@/lib/home-copy";

export type ChallengeDifficulty = "beginner" | "intermediate" | "advanced";

type ChallengeTranslation = {
  title: string;
  summary: string;
  concept: string;
  scenario: string[];
  task: string;
  bonusTask: string;
  nodes: string[];
  preparation: string[];
  requirements: string[];
  tips: string[];
};

export type Challenge = {
  number: number;
  slug: string;
  difficulty: ChallengeDifficulty;
  time: string;
  complexity: 1 | 2 | 3 | 4 | 5;
  color: string;
  ink: string;
  copy: Record<Locale, ChallengeTranslation>;
};

export const difficultyLabels: Record<Locale, Record<ChallengeDifficulty, string>> = {
  en: {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  },
  es: {
    beginner: "Inicial",
    intermediate: "Intermedio",
    advanced: "Avanzado",
  },
};

export type ChallengePageLabels = {
  back: string;
  edit: string;
  challenge: string;
  complexity: string;
  scenario: string;
  task: string;
  bonusTask: string;
  nodes: string;
  preparation: string;
  requirements: string;
  next: string;
  hintsTitle: string;
  hintsBody: string;
  firstTip: string;
  nextTip: string;
  allTips: string;
  tip: string;
  reviewTitle: string;
  reviewBody: string;
  submit: string;
  modalEyebrow: string;
  modalTitle: string;
  modalBody: string;
  modalDismiss: string;
  modalClose: string;
  modalNext: string;
};

export const challengePageCopy = {
  en: {
    back: "All challenges",
    edit: "Edit this challenge",
    challenge: "Challenge",
    complexity: "Complexity",
    scenario: "Example use cases",
    task: "Your task",
    bonusTask: "Your bonus task",
    nodes: "Nodes you'll use",
    preparation: "Before you start",
    requirements: "What the workflow must do",
    next: "Next challenge",
    hintsTitle: "Need a tip?",
    hintsBody: "Reveal up to five tips, one at a time.",
    firstTip: "Show first tip",
    nextTip: "Show next tip",
    allTips: "All tips revealed",
    tip: "Tip",
    reviewTitle: "Ready to submit?",
    reviewBody: "Submit when your team has a working workflow to demonstrate.",
    submit: "Submit as solved",
    modalEyebrow: "Mentor review",
    modalTitle: "Find a mentor and ask them to review.",
    modalBody: "Show them your working workflow. Once they approve it, collect the balloon for this challenge.",
    modalDismiss: "Close dialog",
    modalClose: "Keep working",
    modalNext: "Start next challenge",
  },
  es: {
    back: "Todos los retos",
    edit: "Editar este reto",
    challenge: "Reto",
    complexity: "Complejidad",
    scenario: "Ejemplos de uso",
    task: "Tu tarea",
    bonusTask: "Tu tarea extra",
    nodes: "Nodos que usarás",
    preparation: "Antes de empezar",
    requirements: "Qué debe hacer el workflow",
    next: "Siguiente reto",
    hintsTitle: "¿Necesitas una pista?",
    hintsBody: "Descubre hasta cinco pistas, una cada vez.",
    firstTip: "Mostrar la primera pista",
    nextTip: "Mostrar la siguiente pista",
    allTips: "Todas las pistas mostradas",
    tip: "Pista",
    reviewTitle: "¿Listo para enviar?",
    reviewBody: "Envía el reto cuando el equipo tenga un workflow funcional que mostrar.",
    submit: "Enviar como resuelto",
    modalEyebrow: "Revisión del mentor",
    modalTitle: "Busca a un mentor y pídele que revise tu workflow.",
    modalBody: "Muéstrale el workflow funcionando. Cuando lo apruebe, recoge el globo de este reto.",
    modalDismiss: "Cerrar diálogo",
    modalClose: "Seguir trabajando",
    modalNext: "Empezar el siguiente reto",
  },
} satisfies Record<Locale, ChallengePageLabels>;

const challengeDirectory = join(process.cwd(), "content", "challenges");
const difficultyValues = new Set<ChallengeDifficulty>([
  "beginner",
  "intermediate",
  "advanced",
]);
const requiredTextSections = ["Title", "Summary", "Concept", "Task", "Bonus Task"] as const;

function fail(fileName: string, message: string): never {
  throw new Error(`Invalid challenge content in ${fileName}: ${message}`);
}

function splitDocument(source: string, fileName: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    fail(fileName, "expected a metadata block wrapped in --- markers");
  }

  return { metadataSource: match[1], body: match[2] };
}

function parseMetadata(source: string, fileName: string) {
  const metadata: Record<string, string> = {};

  for (const sourceLine of source.split(/\r?\n/)) {
    const line = sourceLine.trim();
    if (!line) continue;

    const separator = line.indexOf(":");
    if (separator < 1) fail(fileName, `invalid metadata line "${line}"`);

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (!value) fail(fileName, `metadata field "${key}" cannot be empty`);
    metadata[key] = value;
  }

  return metadata;
}

function splitLanguageSections(body: string, fileName: string) {
  const parts = body.split(/^# (English|Spanish)\s*$/m);
  const languages: Partial<Record<"English" | "Spanish", string>> = {};

  for (let index = 1; index < parts.length; index += 2) {
    const language = parts[index] as "English" | "Spanish";
    languages[language] = parts[index + 1]?.trim() ?? "";
  }

  if (!languages.English || !languages.Spanish) {
    fail(fileName, "both # English and # Spanish sections are required");
  }

  return languages as Record<"English" | "Spanish", string>;
}

function parseSections(source: string, fileName: string, language: string) {
  const sections: Record<string, string> = {};

  for (const block of source.split(/^## /m).slice(1)) {
    const newline = block.indexOf("\n");
    if (newline < 1) fail(fileName, `${language} contains an empty section`);

    const heading = block.slice(0, newline).trim();
    const content = block.slice(newline + 1).trim();
    if (!content) fail(fileName, `${language} section "${heading}" cannot be empty`);
    sections[heading] = content;
  }

  return sections;
}

function readList(
  sections: Record<string, string>,
  section: "Scenario" | "Nodes" | "Preparation" | "Requirements" | "Tips",
  fileName: string,
  language: string,
) {
  const content = sections[section];
  if (!content) fail(fileName, `${language} is missing ## ${section}`);

  const items = content
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line) => {
      const match = line.match(/^\s*-\s+(.+)$/);
      if (!match) fail(fileName, `${language} ## ${section} must contain only bullet items`);
      return match[1].trim();
    });

  if (section === "Tips" && items.length !== 5) {
    fail(fileName, `${language} must contain exactly five tips`);
  }

  if (section === "Scenario" && items.length < 2) {
    fail(fileName, `${language} ## Scenario must contain at least two example use cases`);
  }

  if (section !== "Tips" && items.length === 0) {
    fail(fileName, `${language} ## ${section} must contain at least one item`);
  }

  return items;
}

function parseTranslation(source: string, fileName: string, language: string) {
  const sections = parseSections(source, fileName, language);

  for (const section of requiredTextSections) {
    if (!sections[section]) fail(fileName, `${language} is missing ## ${section}`);
  }

  return {
    title: sections.Title,
    summary: sections.Summary,
    concept: sections.Concept,
    scenario: readList(sections, "Scenario", fileName, language),
    task: sections.Task,
    bonusTask: sections["Bonus Task"],
    nodes: readList(sections, "Nodes", fileName, language),
    preparation: readList(sections, "Preparation", fileName, language),
    requirements: readList(sections, "Requirements", fileName, language),
    tips: readList(sections, "Tips", fileName, language),
  } satisfies ChallengeTranslation;
}

function parseInteger(value: string | undefined, field: string, fileName: string) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) fail(fileName, `metadata field "${field}" must be an integer`);
  return parsed;
}

function parseChallenge(fileName: string): Challenge {
  const source = readFileSync(join(challengeDirectory, fileName), "utf8");
  const { metadataSource, body } = splitDocument(source, fileName);
  const metadata = parseMetadata(metadataSource, fileName);
  const number = parseInteger(metadata.number, "number", fileName);
  const complexity = parseInteger(metadata.complexity, "complexity", fileName);
  const difficulty = metadata.difficulty as ChallengeDifficulty;

  if (number < 1 || number > 99) fail(fileName, "number must be between 1 and 99");
  if (complexity < 1 || complexity > 5) fail(fileName, "complexity must be between 1 and 5");
  if (!difficultyValues.has(difficulty)) fail(fileName, "difficulty must be beginner, intermediate, or advanced");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.slug ?? "")) fail(fileName, "slug must use lowercase kebab-case");
  if (!/^#[0-9a-f]{6}$/i.test(metadata.color ?? "")) fail(fileName, "color must be a six-digit hex value");
  if (!/^#[0-9a-f]{6}$/i.test(metadata.ink ?? "")) fail(fileName, "ink must be a six-digit hex value");
  if (!metadata.time) fail(fileName, "time is required");

  const expectedFileName = `${String(number).padStart(2, "0")}-${metadata.slug}.md`;
  if (fileName !== expectedFileName) fail(fileName, `filename must be ${expectedFileName}`);

  const languages = splitLanguageSections(body, fileName);

  return {
    number,
    slug: metadata.slug,
    difficulty,
    time: metadata.time,
    complexity: complexity as Challenge["complexity"],
    color: metadata.color,
    ink: metadata.ink,
    copy: {
      en: parseTranslation(languages.English, fileName, "English"),
      es: parseTranslation(languages.Spanish, fileName, "Spanish"),
    },
  };
}

function loadChallenges() {
  const loaded = readdirSync(challengeDirectory)
    .filter((fileName) => /^\d{2}-[a-z0-9-]+\.md$/.test(fileName))
    .map(parseChallenge)
    .sort((left, right) => left.number - right.number);

  if (loaded.length !== 10) {
    throw new Error(`Expected exactly 10 active challenge Markdown files, found ${loaded.length}`);
  }

  const numberSet = new Set(loaded.map((challenge) => challenge.number));
  const slugSet = new Set(loaded.map((challenge) => challenge.slug));
  if (numberSet.size !== loaded.length) throw new Error("Challenge numbers must be unique");
  if (slugSet.size !== loaded.length) throw new Error("Challenge slugs must be unique");

  loaded.forEach((challenge, index) => {
    if (challenge.number !== index + 1) {
      throw new Error("Challenge numbers must form a continuous sequence starting at 1");
    }
  });

  return loaded;
}

export const challenges = loadChallenges();

export function getChallenge(slug: string) {
  return challenges.find((challenge) => challenge.slug === slug);
}
