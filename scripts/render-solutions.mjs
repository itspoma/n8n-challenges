import { createHash } from "node:crypto";
import {
  access,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from "node:fs/promises";
import { constants } from "node:fs";
import { basename, join } from "node:path";

const projectDirectory = process.cwd();
const challengeDirectory = join(projectDirectory, "content", "challenges");
const workflowDirectory = join(projectDirectory, "workflows");
const outputDirectory = join(projectDirectory, "public", "solutions");
const manifestPath = join(outputDirectory, "pixtex-manifest.json");
const apiUrl = "https://api.pixtex.dev/v1/render";
const checkOnly = process.argv.includes("--check");

const sharedOptions = {
  format: "png",
  scale: 2,
  frame: "custom",
  customFrame: { w: 1200, h: 675 },
  padding: "roomy",
  iconPack: "n8n",
  outlineOpacity: 0.15,
  layout: "auto",
  layoutDirection: "LR",
  spacing: "normal",
  stickyMode: "n8n",
  gridStyle: "dots",
  gridOpacity: 0.45,
  showTitle: true,
  showLegend: false,
  showWatermark: false,
};

const headingPatterns = {
  core: [
    "Core Workflow JSON (without bonus)",
    "Core solution JSON",
  ],
  bonus: [
    "Bonus Workflow JSON",
    "Bonus solution JSON",
  ],
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractJsonBlock(source, headings) {
  for (const heading of headings) {
    const pattern = new RegExp(
      "^##\\s+" + escapeRegExp(heading) +
        "\\s*\\r?\\n+[\\s\\S]*?^```json\\s*\\r?\\n([\\s\\S]*?)^```\\s*$",
      "im",
    );
    const match = source.match(pattern);

    if (match) {
      return match[1].trim();
    }
  }

  return null;
}

function validateWorkflow(workflow, sourceName, variant) {
  if (!workflow || typeof workflow !== "object" || Array.isArray(workflow)) {
    throw new Error(`${sourceName}: ${variant} workflow must be a JSON object`);
  }

  if (!Array.isArray(workflow.nodes) || workflow.nodes.length === 0) {
    throw new Error(`${sourceName}: ${variant} workflow must contain at least one node`);
  }

  if (!workflow.connections || typeof workflow.connections !== "object") {
    throw new Error(`${sourceName}: ${variant} workflow must contain connections`);
  }
}

function parseSolutionPair(source, sourceName) {
  const coreSource = extractJsonBlock(source, headingPatterns.core);
  const bonusSource = extractJsonBlock(source, headingPatterns.bonus);

  if (!coreSource && !bonusSource) {
    return null;
  }

  if (!coreSource || !bonusSource) {
    throw new Error(`${sourceName}: solution data must contain both core and bonus workflow JSON`);
  }

  let core;
  let bonus;

  try {
    core = JSON.parse(coreSource);
  } catch (error) {
    throw new Error(`${sourceName}: core workflow contains invalid JSON`, { cause: error });
  }

  try {
    bonus = JSON.parse(bonusSource);
  } catch (error) {
    throw new Error(`${sourceName}: bonus workflow contains invalid JSON`, { cause: error });
  }

  validateWorkflow(core, sourceName, "core");
  validateWorkflow(bonus, sourceName, "bonus");

  return { core, bonus };
}

function sanitizeWorkflow(workflow) {
  const sanitized = structuredClone(workflow);

  sanitized.pinData = {};
  delete sanitized.staticData;

  for (const node of sanitized.nodes) {
    delete node.credentials;
  }

  return sanitized;
}

async function fileExists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function readManifest() {
  try {
    const source = await readFile(manifestPath, "utf8");
    const manifest = JSON.parse(source);

    if (manifest.version === 1 && manifest.assets && typeof manifest.assets === "object") {
      return manifest;
    }
  } catch {}

  return { version: 1, assets: {} };
}

function assetHash(workflow, options) {
  return createHash("sha256")
    .update(JSON.stringify({ workflow, options }))
    .digest("hex");
}

async function findSolutions(challengeFileName) {
  const challengePath = join(challengeDirectory, challengeFileName);
  const challengeSource = await readFile(challengePath, "utf8");
  const embedded = parseSolutionPair(challengeSource, challengeFileName);

  if (embedded) {
    return { pair: embedded, source: `content/challenges/${challengeFileName}` };
  }

  const legacyPath = join(workflowDirectory, `challenge-${challengeFileName}`);

  if (!(await fileExists(legacyPath))) {
    return null;
  }

  const legacySource = await readFile(legacyPath, "utf8");
  const legacy = parseSolutionPair(legacySource, basename(legacyPath));

  return legacy
    ? { pair: legacy, source: `workflows/${basename(legacyPath)}` }
    : null;
}

async function renderImage(workflow, options, outputPath) {
  const apiKey = process.env.PIXTEX_API_KEY;

  if (!apiKey) {
    throw new Error(
      "PIXTEX_API_KEY is required to render missing or outdated solution images",
    );
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ workflow, options }),
  });

  if (!response.ok) {
    const responseBody = (await response.text()).slice(0, 500);
    throw new Error(
      `Pixtex render failed (${response.status} ${response.statusText}): ${responseBody}`,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("image/png")) {
    throw new Error(`Pixtex returned ${contentType || "an unknown content type"}, expected image/png`);
  }

  await writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
}

async function main() {
  const challengeFiles = (await readdir(challengeDirectory))
    .filter((fileName) => /^\d{2}-[a-z0-9-]+\.md$/.test(fileName))
    .sort();
  const discovered = [];

  for (const challengeFileName of challengeFiles) {
    const solutions = await findSolutions(challengeFileName);

    if (!solutions) {
      continue;
    }

    const slug = challengeFileName.replace(/^\d{2}-/, "").replace(/\.md$/, "");
    discovered.push({ slug, ...solutions });
  }

  if (checkOnly) {
    console.log(
      `Validated ${discovered.length} challenge solution pair${discovered.length === 1 ? "" : "s"}: ${discovered.map(({ slug }) => slug).join(", ") || "none"}`,
    );
    return;
  }

  await mkdir(outputDirectory, { recursive: true });
  const previousManifest = await readManifest();
  const nextManifest = { version: 1, assets: {} };
  let renderedCount = 0;

  for (const { slug, pair, source } of discovered) {
    for (const variant of ["core", "bonus"]) {
      const workflow = sanitizeWorkflow(pair[variant]);

      for (const theme of ["dark", "light"]) {
        const fileName = `${slug}-${variant}-${theme}.png`;
        const outputPath = join(outputDirectory, fileName);
        const options = {
          ...sharedOptions,
          background: theme === "light" ? "white" : "dark",
        };
        const hash = assetHash(workflow, options);
        const previousAsset = previousManifest.assets[fileName];
        const isCurrent = previousAsset?.hash === hash && await fileExists(outputPath);

        if (!isCurrent) {
          console.log(`Rendering ${slug} / ${variant} / ${theme}`);
          await renderImage(workflow, options, outputPath);
          renderedCount += 1;
        }

        nextManifest.assets[fileName] = { hash, source };
      }
    }
  }

  await writeFile(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);
  console.log(
    `Prepared ${Object.keys(nextManifest.assets).length} solution images (${renderedCount} rendered, ${Object.keys(nextManifest.assets).length - renderedCount} unchanged).`,
  );
}

await main();
