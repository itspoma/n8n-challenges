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
const forceRender = process.argv.includes("--force");
const requiredSolutionSlugs = new Set([
  "valencia-citizen-request-classifier",
  "trello-morning-brief",
]);
const requestedSlug = process.argv
  .find((argument) => argument.startsWith("--slug="))
  ?.slice("--slug=".length);
const renderStyle = "canvas";

if (requestedSlug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(requestedSlug)) {
  throw new Error("--slug must use lowercase kebab-case");
}

if (checkOnly && forceRender) {
  throw new Error("--check and --force cannot be used together");
}

const sharedOptions = {
  format: "png",
  scale: 2,
  frame: "custom",
  customFrame: { w: 1200, h: 675 },
  padding: "normal",
  iconPack: "n8n",
  cardGeometry: "v2",
  nodeDetail: "detailed",
  iconShape: "rounded",
  outlineOpacity: 0.2,
  nodeTint: "match",
  layout: "original",
  layoutDirection: "LR",
  spacing: "normal",
  stickyMode: "n8n",
  gridStyle: "dots",
  gridOpacity: 0.45,
  showTitle: true,
  showLegend: true,
  showGroupBorders: true,
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
    .update(JSON.stringify({ workflow, style: renderStyle, options }))
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
    body: JSON.stringify({ workflow, style: renderStyle, options }),
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

function expectedAssetsFor(discovered) {
  const assets = {};

  for (const { slug, pair, source } of discovered) {
    for (const variant of ["core", "bonus"]) {
      const workflow = sanitizeWorkflow(pair[variant]);

      for (const theme of ["dark", "light"]) {
        const fileName = `${slug}-${variant}-${theme}.png`;
        const options = {
          ...sharedOptions,
          background: theme === "light" ? "white" : "dark",
        };
        assets[fileName] = {
          hash: assetHash(workflow, options),
          source,
        };
      }
    }
  }

  return assets;
}

async function main() {
  const standaloneWorkflowFiles = (await readdir(workflowDirectory))
    .filter((fileName) => /^challenge-\d{2}-.*\.json$/.test(fileName));

  if (standaloneWorkflowFiles.length > 0) {
    throw new Error(
      `Move standalone challenge workflow JSON into its challenge Markdown: ${standaloneWorkflowFiles.join(", ")}`,
    );
  }

  const challengeFiles = (await readdir(challengeDirectory))
    .filter((fileName) => /^\d{2}-[a-z0-9-]+\.md$/.test(fileName))
    .filter(
      (fileName) =>
        !requestedSlug ||
        fileName.replace(/^\d{2}-/, "").replace(/\.md$/, "") === requestedSlug,
    )
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

  if (requestedSlug && discovered.length === 0) {
    throw new Error(`No embedded solution pair found for challenge slug: ${requestedSlug}`);
  }

  if (checkOnly) {
    const discoveredSlugs = new Set(discovered.map(({ slug }) => slug));
    const missingRequiredSlugs = [...requiredSolutionSlugs].filter(
      (slug) =>
        (!requestedSlug || requestedSlug === slug) && !discoveredSlugs.has(slug),
    );

    if (missingRequiredSlugs.length > 0) {
      throw new Error(
        `Missing required solution data for: ${missingRequiredSlugs.join(", ")}`,
      );
    }

    const manifest = await readManifest();
    const expectedAssets = expectedAssetsFor(discovered);
    const problems = [];

    for (const [fileName, expectedAsset] of Object.entries(expectedAssets)) {
      const manifestAsset = manifest.assets[fileName];

      if (!(await fileExists(join(outputDirectory, fileName)))) {
        problems.push(`${fileName}: image is missing`);
      } else if (
        manifestAsset?.hash !== expectedAsset.hash ||
        manifestAsset?.source !== expectedAsset.source
      ) {
        problems.push(`${fileName}: manifest is outdated`);
      }
    }

    if (!requestedSlug) {
      for (const fileName of Object.keys(manifest.assets)) {
        if (!expectedAssets[fileName]) {
          problems.push(`${fileName}: stale manifest entry`);
        }
      }
    }

    if (problems.length > 0) {
      throw new Error(
        `Solution images are not synchronized:\n- ${problems.join("\n- ")}`,
      );
    }

    console.log(
      `Validated ${discovered.length} synchronized challenge solution pair${discovered.length === 1 ? "" : "s"}: ${discovered.map(({ slug }) => slug).join(", ") || "none"}`,
    );
    return;
  }

  await mkdir(outputDirectory, { recursive: true });
  const previousManifest = await readManifest();
  const nextManifest = requestedSlug
    ? structuredClone(previousManifest)
    : { version: 1, assets: {} };
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
        const isCurrent = !forceRender && previousAsset?.hash === hash && await fileExists(outputPath);

        if (!isCurrent) {
          console.log(`Rendering ${slug} / ${variant} / ${theme}`);
          await renderImage(workflow, options, outputPath);
          renderedCount += 1;
        }

        nextManifest.assets[fileName] = { hash, source };

        if (requestedSlug && !isCurrent) {
          await writeFile(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);
        }
      }
    }
  }

  await writeFile(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);
  console.log(
    `Prepared ${Object.keys(nextManifest.assets).length} solution images (${renderedCount} rendered, ${Object.keys(nextManifest.assets).length - renderedCount} unchanged).`,
  );
}

await main();
