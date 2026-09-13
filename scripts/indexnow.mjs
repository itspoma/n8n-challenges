import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const site = "https://n8n-challenges.app";

export function sitemapUrls(xml) {
  const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
  const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => {
    const url = new URL(match[1].replace(/&(amp|lt|gt|quot|apos);/g, (_, name) => entities[name]));
    if (url.origin !== site) throw new Error(`Unexpected sitemap origin: ${url.origin}`);
    return url.href;
  });
  if (!urls.length) throw new Error("Sitemap contains no URLs");
  return [...new Set(urls)];
}

export async function submit({ fetcher = fetch, dryRun = false } = {}) {
  const key = (await readFile(new URL("../public/indexnow-key.txt", import.meta.url), "utf8")).trim();
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error("Invalid IndexNow key");
  const keyLocation = `${site}/indexnow-key.txt`;
  const get = async (url) => {
    const response = await fetcher(url, { signal: AbortSignal.timeout(30_000), cache: "no-store" });
    if (!response.ok) throw new Error(`Fetching ${url} failed: HTTP ${response.status}`);
    return response.text();
  };
  const xml = dryRun
    ? await readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8")
    : await get(`${site}/sitemap.xml`);
  const urls = sitemapUrls(xml);
  if (dryRun) {
    console.log(`Dry run: ${urls.length} URLs for ${site}; no requests sent.`);
    return;
  }
  if ((await get(keyLocation)).trim() !== key) throw new Error("Deployed IndexNow key does not match; retry after deployment propagates");
  for (let offset = 0; offset < urls.length; offset += 10_000) {
    const urlList = urls.slice(offset, offset + 10_000);
    const response = await fetcher("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: new URL(site).host, key, keyLocation, urlList }),
      signal: AbortSignal.timeout(30_000),
    });
    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`IndexNow submission failed: HTTP ${response.status}`);
    }
    console.log(`IndexNow received ${urlList.length} URLs (HTTP ${response.status}${response.status === 202 ? "; key validation pending" : ""}).`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await submit({ dryRun: process.argv.includes("--dry-run") });
}
