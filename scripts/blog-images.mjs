/** Create lighter blog image variants before `next dev` and `next build`.
 * Publisher PNGs stay the committed originals. Git-ignored variants are written next to them:
 * `<name>.webp` for pages and, for covers, `<name>.og.jpg` cropped to 1200×630 for social previews.
 */
import { readdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const publicDirectory = path.join(root, "public");
const blogDirectory = path.join(publicDirectory, "blog");
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
    if (typeof coverImage === "string" && /^\/blog\/[a-zA-Z0-9_./-]+\.png$/.test(coverImage) && !coverImage.includes("..")) {
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

const covers = await coverImages();
const sources = new Set(await files(blogDirectory, ".png"));
// Publisher filenames are content hashes, so translations can share one encoding.
const encoded = new Map();
let created = 0;
let removed = 0;

for (const source of sources) {
  for (const variant of variants) {
    const target = source.replace(/\.png$/, variant.suffix);
    if ((variant.coversOnly && !covers.has(source)) || (await isFresh(source, target))) continue;
    const name = path.basename(source);
    const key = /^[a-f0-9]{64}\.png$/.test(name) ? `${name}${variant.suffix}` : target;
    if (!encoded.has(key)) encoded.set(key, await variant.render(sharp(source)).toBuffer());
    await writeFile(target, encoded.get(key));
    created += 1;
  }
}

// Remove variants whose original PNG or cover reference no longer exists.
for (const variant of variants) {
  for (const file of await files(blogDirectory, variant.suffix)) {
    const source = `${file.slice(0, -variant.suffix.length)}.png`;
    if (!sources.has(source) || (variant.coversOnly && !covers.has(source))) {
      await unlink(file);
      removed += 1;
    }
  }
}

console.log(`Blog image variants: ${created} created, ${removed} removed, ${sources.size} PNG originals.`);
