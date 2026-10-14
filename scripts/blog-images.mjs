/** Create lighter blog image variants before `next dev` and `next build`.
 * The publisher commits WebP originals, which pages show as they are; older articles have PNG
 * originals. Git-ignored variants are written next to an original: `<name>.webp` for a PNG's pages
 * and, for covers, `<name>.og.jpg` cropped to 1200×630 for social previews.
 * Every variant is also kept in .next/cache/blog-images, so a fresh checkout renders only new images.
 */
import { createHash } from "node:crypto";
import { copyFile, mkdir, readdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const publicDirectory = path.join(root, "public");
const blogDirectory = path.join(publicDirectory, "blog");
// The workflows restore .next/cache before each build, while public/ comes from a fresh checkout
// without variants, so without this cache every deploy rendered all of them again.
const cacheDirectory = path.join(root, ".next", "cache", "blog-images");
const variants = [
  { suffix: ".webp", render: (image) => image.webp({ quality: 80 }) },
  {
    suffix: ".og.jpg",
    coversOnly: true,
    // Saliency cropping keeps people and key objects inside the 1.91:1 frame.
    render: (image) => image.resize(1200, 630, { fit: "cover", position: sharp.strategy.attention }).jpeg({ quality: 82, mozjpeg: true }),
  },
];

async function files(directory, extension) {
  const entries = await readdir(directory, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => path.join(entry.parentPath, entry.name));
}

async function coverImages() {
  const covers = new Set();
  for (const file of await files(path.join(root, "content/blog"), ".md")) {
    const frontMatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(await readFile(file, "utf8"));
    // content/blog/README.md documents the format and has no front matter.
    if (!frontMatter) continue;
    const { coverImage } = JSON.parse(frontMatter[1]);
    if (typeof coverImage === "string" && /^\/blog\/[a-zA-Z0-9_./-]+\.(png|webp)$/.test(coverImage) && !coverImage.includes("..")) {
      covers.add(path.join(publicDirectory, coverImage));
    }
  }
  return covers;
}

async function isFresh(source, target) {
  try {
    return (await stat(target)).mtimeMs >= (await stat(source)).mtimeMs;
  } catch {
    return false;
  }
}

// Publisher PNGs are named by their own SHA-256, so they need no reading; other files are hashed.
async function contentHash(source) {
  const name = path.basename(source);
  return /^[a-f0-9]{64}\.png$/.test(name) ? name.slice(0, -".png".length) : createHash("sha256").update(await readFile(source)).digest("hex");
}

const covers = await coverImages();
const pngs = await files(blogDirectory, ".png");
// A .webp beside a PNG is that PNG's generated copy; any other .webp is a committed original.
const generated = new Set(pngs.map((png) => png.replace(/\.png$/, ".webp")));
const sources = new Set([...pngs, ...(await files(blogDirectory, ".webp")).filter((file) => !generated.has(file))]);
await mkdir(cacheDirectory, { recursive: true });
const cached = new Set(await readdir(cacheDirectory));
const used = new Set();
let created = 0;
let restored = 0;
let removed = 0;

for (const source of sources) {
  const hash = await contentHash(source);
  for (const variant of variants) {
    const target = source.replace(/\.(png|webp)$/, variant.suffix);
    // A WebP original is its own page copy.
    if (target === source || (variant.coversOnly && !covers.has(source))) continue;
    // Named by the image's content and the render code, so translations sharing an image encode it
    // once, and a changed image or setting renders again.
    const name = `${createHash("sha256").update(`${hash}\n${variant.render}`).digest("hex")}${variant.suffix}`;
    used.add(name);
    if (await isFresh(source, target)) continue;
    if (cached.has(name)) {
      await copyFile(path.join(cacheDirectory, name), target);
      restored += 1;
      continue;
    }
    const image = await variant.render(sharp(source)).toBuffer();
    await writeFile(target, image);
    // Written in full before it gets its name, so an interrupted run never leaves a cut-off variant to reuse.
    await writeFile(path.join(cacheDirectory, `${name}.tmp`), image);
    await rename(path.join(cacheDirectory, `${name}.tmp`), path.join(cacheDirectory, name));
    cached.add(name);
    created += 1;
  }
}

// Remove previews whose original or cover reference no longer exists. A .webp is never removed:
// without its PNG it may be a committed original.
for (const file of await files(blogDirectory, ".og.jpg")) {
  const base = file.slice(0, -".og.jpg".length);
  const source = [`${base}.png`, `${base}.webp`].find((candidate) => sources.has(candidate));
  if (!source || !covers.has(source)) {
    await unlink(file);
    removed += 1;
  }
}

// Drop cached variants that no current image uses, so the cache doesn't keep replaced ones forever.
for (const name of cached) {
  if (!used.has(name)) await unlink(path.join(cacheDirectory, name));
}

console.log(
  `Blog image variants: ${created} created, ${restored} from the cache, ${removed} removed, ${pngs.length} PNG and ${sources.size - pngs.length} WebP originals.`,
);
