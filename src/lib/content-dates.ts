/** Git commit times that date generated pages. Builds need a Git checkout. */
import { execFileSync } from "node:child_process";

let shallowRepository: boolean | undefined;
const lastCommitTimes = new Map<string, string | undefined>();

export function isShallowRepository() {
  shallowRepository ??= execFileSync("git", ["rev-parse", "--is-shallow-repository"], { encoding: "utf8" }).trim() === "true";
  return shallowRepository;
}

/**
 * Time of the latest main-line commit that changed any of the repository paths.
 * Merged changes are dated by their merge, when they reached the site.
 */
export function lastCommitTime(paths: readonly string[]): string | undefined {
  const key = paths.join("\0");
  if (lastCommitTimes.has(key)) return lastCommitTimes.get(key);
  // A shallow clone dates untouched files by its boundary commit; omit the time rather than guess.
  const timestamp = isShallowRepository()
    ? undefined
    : execFileSync("git", ["--literal-pathspecs", "log", "--first-parent", "-1", "--format=%cI", "--", ...paths], { encoding: "utf8" }).trim() || undefined;
  lastCommitTimes.set(key, timestamp);
  return timestamp;
}
