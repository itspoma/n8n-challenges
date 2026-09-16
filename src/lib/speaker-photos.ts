import { readdirSync } from "node:fs";
import { join } from "node:path";

const imageFile = /\.(avif|jpe?g|png|webp)$/i;

/**
 * Tile shapes of the hero mosaic, in order. Each photo in public/speaker is cropped
 * for the tile at its position, so filename order decides which tile it lands in;
 * the matching grid spans live in `.companies-photo-mosaic` in globals.css.
 */
const tiles = [
  { width: 600, height: 600 },
  { width: 600, height: 300 },
  { width: 300, height: 300 },
  { width: 300, height: 300 },
  { width: 300, height: 600 },
  { width: 600, height: 300 },
  { width: 300, height: 600 },
  { width: 600, height: 300 },
];

/**
 * Workshop photos of the maintainer: every image in public/speaker, in filename order.
 * The folder may be empty, and the hero then renders the credit line without photos.
 */
export function speakerPhotos() {
  try {
    return readdirSync(join(process.cwd(), "public", "speaker"))
      .filter((file) => imageFile.test(file))
      .sort((a, b) => a.localeCompare(b))
      .slice(0, tiles.length)
      .map((file, index) => ({ src: `/speaker/${file}`, ...tiles[index] }));
  } catch {
    return [];
  }
}
