/** Blog image variants written by scripts/blog-images.mjs before `next dev` and `next build`. */
import fs from "node:fs";
import path from "node:path";

const publicFile = (src: string) => path.join(process.cwd(), "public", src);

// A build without generated variants still works with the original PNG.
function variant(src: string, suffix: string) {
  const candidate = src.replace(/\.png$/, suffix);
  return candidate !== src && fs.existsSync(publicFile(candidate)) ? candidate : undefined;
}

/** Lighter WebP copy for pages. */
export function displayImage(src: string) {
  return variant(src, ".webp") ?? src;
}

/** Pixel size from a PNG header, so browsers can reserve space before the image loads. */
export function imageSize(src: string) {
  if (!src.endsWith(".png") || !fs.existsSync(publicFile(src))) return undefined;
  const header = Buffer.alloc(24);
  const file = fs.openSync(publicFile(src), "r");
  try {
    fs.readSync(file, header, 0, header.length, 0);
  } finally {
    fs.closeSync(file);
  }
  return header.toString("latin1", 12, 16) === "IHDR"
    ? { width: header.readUInt32BE(16), height: header.readUInt32BE(20) }
    : undefined;
}

/** 1200×630 JPEG preview for Open Graph, X and JSON-LD, or the original when it is missing. */
export function socialImage(src: string) {
  const preview = variant(src, ".og.jpg");
  return preview
    ? { url: preview, width: 1200, height: 630, type: "image/jpeg" }
    : { url: src, ...imageSize(src) };
}
