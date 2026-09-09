import { challenges } from "@/lib/challenges";
import { additionalInlineTerms } from "@/lib/challenge-inline-terms";
import { locales } from "@/lib/home-copy";

// Count the full catalog, including extras, once in its canonical English form.
// Node descriptions may mention multiple instances of the same node type.
const normalize = (value: string) => value.trim().toLowerCase();
const nodes = new Set(challenges.flatMap(({ copy }) =>
  copy.en.nodes.map((name) => normalize(name.split(" – ")[0])),
));
const terms = new Set(challenges.flatMap(({ slug, copy }) => [
  ...copy.en.glossary,
  ...(additionalInlineTerms[slug]?.en ?? []),
].map(({ term }) => normalize(term))));

export const challengeMetricValues = [
  challenges.length,
  nodes.size,
  terms.size,
  locales.length,
].map(String);
