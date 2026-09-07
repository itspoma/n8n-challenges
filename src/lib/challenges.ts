import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import type { Locale } from "@/lib/home-copy";

export type ChallengeDifficulty = "beginner" | "intermediate" | "advanced";

type ChallengeTranslation = {
  title: string;
  summary: string;
  concept: string;
  glossary: Array<{
    term: string;
    definition: string;
  }>;
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
  solutions: ChallengeSolutions | null;
  copy: Record<Locale, ChallengeTranslation>;
};

export type ChallengeSolutions = {
  core: {
    dark: string;
    light: string;
  };
  bonus: {
    dark: string;
    light: string;
  };
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
  uk: {
    beginner: "Початковий",
    intermediate: "Середній",
    advanced: "Просунутий",
  },
};

export type ChallengePageLabels = {
  back: string;
  edit: string;
  challenge: string;
  complexity: string;
  complexityScale: string;
  time: string;
  scenario: string;
  task: string;
  bonusTask: string;
  glossary: string;
  glossaryBody: string;
  nodes: string;
  preparation: string;
  requirements: string;
  previous: string;
  next: string;
  hintsTitle: string;
  hintsBody: string;
  firstTip: string;
  nextTip: string;
  allTips: string;
  showWorkflowAnswer: string;
  tip: string;
  reviewTitle: string;
  reviewBody: string;
  submit: string;
  solution: string;
  solutionTitle: string;
  solutionBody: string;
  solutionExpand: string;
  solutionConfirmTitle: string;
  solutionConfirmBody: string;
  solutionConfirmCancel: string;
  solutionConfirmReveal: string;
  solutionDialogDismiss: string;
  solutionCore: string;
  solutionBonus: string;
  solutionCoreImageAlt: string;
  solutionBonusImageAlt: string;
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
    complexityScale: "out of 5 stars",
    time: "Time",
    scenario: "Example use cases",
    task: "Your task",
    bonusTask: "Your bonus task",
    glossary: "Glossary",
    glossaryBody: "Technical terms, explained simply",
    nodes: "Nodes you'll use",
    preparation: "Before you start",
    requirements: "What the workflow must do",
    previous: "Previous challenge",
    next: "Next challenge",
    hintsTitle: "Need a tip?",
    hintsBody: "Reveal up to five tips, one at a time.",
    firstTip: "Show first tip",
    nextTip: "Show next tip",
    allTips: "All tips revealed",
    showWorkflowAnswer: "Show workflow answer",
    tip: "Tip",
    reviewTitle: "Ready to submit?",
    reviewBody: "Submit when your team has a working workflow to demonstrate.",
    submit: "Submit as solved",
    solution: "Solution",
    solutionTitle: "See the workflow challenge answer",
    solutionBody: "Reveal the completed workflow only when you are ready to compare it with your own.",
    solutionExpand: "Expand solution",
    solutionConfirmTitle: "Reveal the workflow solution?",
    solutionConfirmBody:
      "This will show the completed workflow for this challenge. Are you sure you want to continue?",
    solutionConfirmCancel: "Not yet",
    solutionConfirmReveal: "Yes, show solution",
    solutionDialogDismiss: "Close confirmation",
    solutionCore: "Core workflow",
    solutionBonus: "With bonus",
    solutionCoreImageAlt: "Core workflow without the bonus task",
    solutionBonusImageAlt: "Completed workflow including the bonus task",
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
    complexityScale: "de 5 estrellas",
    time: "Tiempo",
    scenario: "Ejemplos de uso",
    task: "Tu tarea",
    bonusTask: "Tu tarea extra",
    glossary: "Glosario",
    glossaryBody: "Términos técnicos explicados de forma sencilla",
    nodes: "Nodos que usarás",
    preparation: "Antes de empezar",
    requirements: "Qué debe hacer el workflow",
    previous: "Reto anterior",
    next: "Siguiente reto",
    hintsTitle: "¿Necesitas una pista?",
    hintsBody: "Descubre hasta cinco pistas, una cada vez.",
    firstTip: "Mostrar la primera pista",
    nextTip: "Mostrar la siguiente pista",
    allTips: "Todas las pistas mostradas",
    showWorkflowAnswer: "Mostrar respuesta del workflow",
    tip: "Pista",
    reviewTitle: "¿Listo para enviar?",
    reviewBody: "Envía el reto cuando el equipo tenga un workflow funcional que mostrar.",
    submit: "Enviar como resuelto",
    solution: "Solución",
    solutionTitle: "Ver la respuesta del reto de workflow",
    solutionBody: "Muestra el workflow completo solo cuando quieras compararlo con el tuyo.",
    solutionExpand: "Mostrar solución",
    solutionConfirmTitle: "¿Mostrar la solución del workflow?",
    solutionConfirmBody:
      "Esto mostrará el workflow completo de este reto. ¿Seguro que quieres continuar?",
    solutionConfirmCancel: "Todavía no",
    solutionConfirmReveal: "Sí, mostrar solución",
    solutionDialogDismiss: "Cerrar confirmación",
    solutionCore: "Workflow principal",
    solutionBonus: "Con tarea extra",
    solutionCoreImageAlt: "Workflow principal sin la tarea extra",
    solutionBonusImageAlt: "Workflow completo con la tarea extra incluida",
    modalEyebrow: "Revisión del mentor",
    modalTitle: "Busca a un mentor y pídele que revise tu workflow.",
    modalBody: "Muéstrale el workflow funcionando. Cuando lo apruebe, recoge el globo de este reto.",
    modalDismiss: "Cerrar diálogo",
    modalClose: "Seguir trabajando",
    modalNext: "Empezar el siguiente reto",
  },
  uk: {
    back: "Усі завдання",
    edit: "Редагувати це завдання",
    challenge: "Завдання",
    complexity: "Складність",
    complexityScale: "із 5 зірок",
    time: "Час",
    scenario: "Приклади використання",
    task: "Ваше завдання",
    bonusTask: "Додаткове завдання",
    glossary: "Глосарій",
    glossaryBody: "Технічні терміни простими словами",
    nodes: "Необхідні ноди",
    preparation: "Перед початком",
    requirements: "Що має робити воркфлоу",
    previous: "Попереднє завдання",
    next: "Наступне завдання",
    hintsTitle: "Потрібна підказка?",
    hintsBody: "Відкривайте до п’яти підказок по одній.",
    firstTip: "Показати першу підказку",
    nextTip: "Показати наступну підказку",
    allTips: "Усі підказки відкрито",
    showWorkflowAnswer: "Показати відповідь воркфлоу",
    tip: "Підказка",
    reviewTitle: "Готові показати результат?",
    reviewBody: "Надсилайте завдання, коли ваша команда матиме робочий воркфлоу для демонстрації.",
    submit: "Позначити як виконане",
    solution: "Рішення",
    solutionTitle: "Переглянути відповідь до завдання з воркфлоу",
    solutionBody: "Відкривайте готовий воркфлоу лише тоді, коли захочете порівняти його зі своїм.",
    solutionExpand: "Показати рішення",
    solutionConfirmTitle: "Показати рішення воркфлоу?",
    solutionConfirmBody:
      "Це покаже готовий воркфлоу для цього завдання. Ви впевнені, що хочете продовжити?",
    solutionConfirmCancel: "Ще ні",
    solutionConfirmReveal: "Так, показати рішення",
    solutionDialogDismiss: "Закрити підтвердження",
    solutionCore: "Основний воркфлоу",
    solutionBonus: "З додатковим завданням",
    solutionCoreImageAlt: "Основний воркфлоу без додаткового завдання",
    solutionBonusImageAlt: "Завершений воркфлоу з додатковим завданням",
    modalEyebrow: "Перевірка ментором",
    modalTitle: "Знайдіть ментора й попросіть перевірити ваш воркфлоу.",
    modalBody: "Покажіть робочий воркфлоу. Після схвалення заберіть кульку за це завдання.",
    modalDismiss: "Закрити діалог",
    modalClose: "Продовжити роботу",
    modalNext: "Почати наступне завдання",
  },
} satisfies Record<Locale, ChallengePageLabels>;

const challengeDirectory = join(process.cwd(), "content", "challenges");
const workflowDirectory = join(process.cwd(), "workflows");
const difficultyValues = new Set<ChallengeDifficulty>([
  "beginner",
  "intermediate",
  "advanced",
]);
const requiredTextSections = ["Title", "Summary", "Concept", "Task", "Bonus Task"] as const;
const solutionHeadings = {
  core: ["Core Workflow JSON (without bonus)", "Core solution JSON"],
  bonus: ["Bonus Workflow JSON", "Bonus solution JSON"],
};

function fail(fileName: string, message: string): never {
  throw new Error(`Invalid challenge content in ${fileName}: ${message}`);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readSolutionJsonBlock(source: string, headings: string[]) {
  for (const heading of headings) {
    const pattern = new RegExp(
      "^##\\s+" + escapeRegExp(heading) +
        "\\s*\\r?\\n+[\\s\\S]*?^```json\\s*\\r?\\n([\\s\\S]*?)^```\\s*$",
      "im",
    );
    const match = source.match(pattern);

    if (match) return match[1].trim();
  }

  return null;
}

function containsCompleteSolutionPair(source: string, fileName: string) {
  const core = readSolutionJsonBlock(source, solutionHeadings.core);
  const bonus = readSolutionJsonBlock(source, solutionHeadings.bonus);

  if (!core && !bonus) return false;
  if (!core || !bonus) {
    fail(fileName, "solution data must contain both core and bonus workflow JSON");
  }

  for (const [variant, json] of [["core", core], ["bonus", bonus]] as const) {
    try {
      const workflow = JSON.parse(json) as { nodes?: unknown; connections?: unknown };

      if (!Array.isArray(workflow.nodes) || workflow.nodes.length === 0) {
        fail(fileName, `${variant} solution workflow must contain at least one node`);
      }
      if (!workflow.connections || typeof workflow.connections !== "object") {
        fail(fileName, `${variant} solution workflow must contain connections`);
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        fail(fileName, `${variant} solution workflow contains invalid JSON`);
      }
      throw error;
    }
  }

  return true;
}

function hasSolutionWorkflows(fileName: string, challengeSource: string) {
  if (containsCompleteSolutionPair(challengeSource, fileName)) return true;

  const legacyFileName = `challenge-${fileName}`;
  const legacyPath = join(workflowDirectory, legacyFileName);

  if (!existsSync(legacyPath)) return false;

  return containsCompleteSolutionPair(
    readFileSync(legacyPath, "utf8"),
    legacyFileName,
  );
}

function solutionImages(slug: string): ChallengeSolutions {
  return {
    core: {
      dark: `/solutions/${slug}-core-dark.png`,
      light: `/solutions/${slug}-core-light.png`,
    },
    bonus: {
      dark: `/solutions/${slug}-bonus-dark.png`,
      light: `/solutions/${slug}-bonus-light.png`,
    },
  };
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
  const parts = body.split(/^# (English|Spanish|Ukrainian)\s*$/m);
  const languages: Partial<Record<"English" | "Spanish" | "Ukrainian", string>> = {};

  for (let index = 1; index < parts.length; index += 2) {
    const language = parts[index] as "English" | "Spanish" | "Ukrainian";
    languages[language] = parts[index + 1]?.trim() ?? "";
  }

  if (!languages.English || !languages.Spanish || !languages.Ukrainian) {
    fail(fileName, "# English, # Spanish, and # Ukrainian sections are required");
  }

  return languages as Record<"English" | "Spanish" | "Ukrainian", string>;
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

function readGlossary(
  sections: Record<string, string>,
  fileName: string,
  language: string,
) {
  const content = sections.Glossary;
  if (!content) return [];

  return content
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line) => {
      const match = line.match(/^\s*-\s+([^:]+):\s+(.+)$/);
      if (!match) {
        fail(fileName, `${language} ## Glossary must use "- Term: Simple explanation" items`);
      }

      return {
        term: match[1].trim(),
        definition: match[2].trim(),
      };
    });
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
    glossary: readGlossary(sections, fileName, language),
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
    solutions: hasSolutionWorkflows(fileName, source)
      ? solutionImages(metadata.slug)
      : null,
    copy: {
      en: parseTranslation(languages.English, fileName, "English"),
      es: parseTranslation(languages.Spanish, fileName, "Spanish"),
      uk: parseTranslation(languages.Ukrainian, fileName, "Ukrainian"),
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
