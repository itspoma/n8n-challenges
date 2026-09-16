/**
 * IndexNow notifications for the deployed site. Deployments submit only URLs that are new,
 * removed or have a new <lastmod> compared with the live sitemap, never the whole site.
 */
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

const site = "https://n8n-challenges.app";
const usage = `Usage:
  npm run indexnow -- changes [--previous <sitemap.xml>]
    Print a JSON array of the URLs in out/sitemap.xml that are new, removed or have a new
    <lastmod> compared with the live sitemap, or with the given file. Sends nothing.
  npm run indexnow -- submit [<url> ...]
    Submit the given URLs, or the JSON array in INDEXNOW_URLS, after checking the deployed key.`;

const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

function unescapeXml(text) {
  return text.replace(/&(amp|lt|gt|quot|apos);/g, (_, name) => entities[name]);
}

function siteUrl(value) {
  const url = new URL(value);
  if (url.origin !== site) throw new Error(`Unexpected URL origin: ${url.origin}`);
  return url.href;
}

// A unique query string bypasses the CDN copy, which can lag a deployment by several minutes.
function uncached(url) {
  return `${url}?nocache=${Date.now()}`;
}

async function fetchText(url, fetcher) {
  const response = await fetcher(url, { signal: AbortSignal.timeout(30_000), cache: "no-store" });
  if (!response.ok) throw new Error(`Fetching ${url} failed: HTTP ${response.status}`);
  return response.text();
}

/** Sitemap URLs mapped to their <lastmod> text, or undefined when a URL has none. */
export function sitemapEntries(xml) {
  const entries = new Map();
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = /<loc>\s*([^<]+?)\s*<\/loc>/.exec(block);
    if (!loc) throw new Error("Sitemap entry has no <loc>");
    const lastmod = /<lastmod>\s*([^<]+?)\s*<\/lastmod>/.exec(block);
    entries.set(siteUrl(unescapeXml(loc[1])), lastmod ? unescapeXml(lastmod[1]) : undefined);
  }
  if (!entries.size) throw new Error("Sitemap contains no URLs");
  return entries;
}

/**
 * URLs added, removed or re-dated between two sitemaps. A URL without a previous <lastmod>
 * counts as unchanged, so giving more pages a date does not resubmit them.
 */
export function changedUrls(previousXml, currentXml) {
  const previous = sitemapEntries(previousXml);
  const current = sitemapEntries(currentXml);
  const updated = [...current]
    .filter(([url, lastmod]) => {
      if (!previous.has(url)) return true;
      const before = previous.get(url);
      return Boolean(before && lastmod) && Date.parse(before) !== Date.parse(lastmod);
    })
    .map(([url]) => url);
  const removed = [...previous.keys()].filter((url) => !current.has(url));
  return [...updated, ...removed];
}

/** Submit site URLs after confirming that the deployed key file matches the local key. */
export async function submit(urls, { fetcher = fetch } = {}) {
  const urlList = [...new Set(urls.map(siteUrl))];
  if (!urlList.length) {
    console.log("No URLs to submit to IndexNow.");
    return;
  }
  const key = (await readFile(new URL("../public/indexnow-key.txt", import.meta.url), "utf8")).trim();
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error("Invalid IndexNow key");
  const keyLocation = `${site}/indexnow-key.txt`;
  if ((await fetchText(uncached(keyLocation), fetcher)).trim() !== key) {
    throw new Error("Deployed IndexNow key does not match; retry after deployment propagates");
  }
  for (let offset = 0; offset < urlList.length; offset += 10_000) {
    const batch = urlList.slice(offset, offset + 10_000);
    const response = await fetcher("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: new URL(site).host, key, keyLocation, urlList: batch }),
      signal: AbortSignal.timeout(30_000),
    });
    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`IndexNow submission failed: HTTP ${response.status}`);
    }
    console.log(`IndexNow received ${batch.length} URLs (HTTP ${response.status}${response.status === 202 ? "; key validation pending" : ""}):`);
    for (const url of batch) console.log(`  ${url}`);
  }
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: { previous: { type: "string" }, help: { type: "boolean" } },
  });
  const [command, ...urls] = positionals;
  if (values.help) {
    console.log(usage);
  } else if (command === "changes" && !urls.length) {
    const previous = values.previous
      ? await readFile(values.previous, "utf8")
      : await fetchText(uncached(`${site}/sitemap.xml`), fetch);
    const current = await readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8");
    const changed = changedUrls(previous, current);
    // Details go to stderr so stdout stays a JSON array for the deployment workflow.
    console.error(`${changed.length} changed URLs compared with ${values.previous ?? "the live sitemap"}.`);
    for (const url of changed) console.error(`  ${url}`);
    console.log(JSON.stringify(changed));
  } else if (command === "submit" && values.previous === undefined) {
    const list = urls.length ? urls : JSON.parse(process.env.INDEXNOW_URLS || "[]");
    if (!Array.isArray(list) || !list.every((url) => typeof url === "string")) {
      throw new Error("INDEXNOW_URLS must be a JSON array of URLs");
    }
    await submit(list);
  } else {
    throw new Error(usage);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
