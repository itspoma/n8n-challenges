/** Leave the blog's PNG originals out of the GitHub Pages artifact.
 * Pages, link previews and JSON-LD use the variants from scripts/blog-images.mjs, so the publisher
 * PNGs in out/blog only made the artifact slow to upload and bigger than Pages' 1 GB limit. A PNG
 * that an exported file still links stays. The deploy workflow runs this after `next build`; a
 * local out/ keeps every file.
 */
import { readdir, readFile, stat, unlink } from "node:fs/promises";
import path from "node:path";

const out = path.resolve(import.meta.dirname, "..", "out");
const files = (await readdir(out, { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => path.join(entry.parentPath, entry.name));
const originals = files.filter((file) => file.startsWith(path.join(out, "blog") + path.sep) && file.endsWith(".png"));

// Every /blog/….png that a page, page payload, feed or sitemap mentions, with or without the
// site's address and base path, and also as JSON's escaped `\/` or a percent-encoded URL.
const linked = new Set();
for (const file of files.filter((file) => /\.(html|txt|xml|json|js|css|svg|md|webmanifest)$/.test(file))) {
  const text = (await readFile(file, "utf8")).replaceAll("\\/", "/");
  for (const [match] of text.matchAll(/\/blog\/[^"'\s()<>\\]+?\.png/g)) {
    linked.add(match);
    try {
      linked.add(decodeURI(match));
    } catch {
      // Not valid percent-encoding, so the raw match is the only form.
    }
  }
}

let removed = 0;
let bytes = 0;
for (const file of originals) {
  const url = `/${path.relative(out, file).split(path.sep).join("/")}`;
  if (linked.has(url)) {
    console.log(`Kept ${url}: an exported file links it.`);
    continue;
  }
  bytes += (await stat(file)).size;
  await unlink(file);
  removed += 1;
}

console.log(
  `Blog PNG originals: ${removed} of ${originals.length} left out of the artifact (${Math.round(bytes / 1048576)} MB).`,
);
