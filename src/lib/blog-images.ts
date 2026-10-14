/** Blog image variants written by scripts/blog-images.mjs before `next dev` and `next build`. */
import fs from "node:fs";
import path from "node:path";

const publicFile = (src: string) => path.join(process.cwd(), "public", src);

// A build without generated variants still works with the original.
function variant(src: string, suffix: string) {
  const candidate = src.replace(/\.(png|webp)$/, suffix);
  return candidate !== src && fs.existsSync(publicFile(candidate)) ? candidate : undefined;
}

/** Lighter WebP copy for pages; a WebP original is shown as it is. */
export function displayImage(src: string) {
  return variant(src, ".webp") ?? src;
}

/** Pixel size from a PNG or WebP header, so browsers can reserve space before the image loads. */
export function imageSize(src: string) {
  if (!/\.(png|webp)$/.test(src) || !fs.existsSync(publicFile(src))) return undefined;
  const header = Buffer.alloc(30);
  const file = fs.openSync(publicFile(src), "r");
  try {
    fs.readSync(file, header, 0, header.length, 0);
  } finally {
    fs.closeSync(file);
  }
  return src.endsWith(".png") ? pngSize(header) : webpSize(header);
}

function pngSize(header: Buffer) {
  return header.toString("latin1", 12, 16) === "IHDR"
    ? { width: header.readUInt32BE(16), height: header.readUInt32BE(20) }
    : undefined;
}

// The first chunk of a WebP file is lossy (VP8), lossless (VP8L) or extended (VP8X):
// https://developers.google.com/speed/webp/docs/riff_container
function webpSize(header: Buffer) {
  if (header.toString("latin1", 0, 4) !== "RIFF" || header.toString("latin1", 8, 12) !== "WEBP") return undefined;
  switch (header.toString("latin1", 12, 16)) {
    case "VP8 ":
      return { width: header.readUInt16LE(26) & 0x3fff, height: header.readUInt16LE(28) & 0x3fff };
    case "VP8L": {
      const bits = header.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
    }
    case "VP8X":
      return { width: header.readUIntLE(24, 3) + 1, height: header.readUIntLE(27, 3) + 1 };
    default:
      return undefined;
  }
}

/** 1200×630 JPEG preview for Open Graph, X and JSON-LD, or the original when it is missing. */
export function socialImage(src: string) {
  const preview = variant(src, ".og.jpg");
  return preview
    ? { url: preview, width: 1200, height: 630, type: "image/jpeg" }
    : { url: src, ...imageSize(src) };
}
