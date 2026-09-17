/**
 * Brings calls to action in older articles in line with the current publisher settings,
 * without editing their Markdown (an edit would show as a content update).
 */
import { sitePath, type BlogBlock } from "./blog-markdown";
import type { Challenge } from "./challenges";
import type { Locale } from "./home-copy";
import { absoluteUrl, SITE_AUTHOR } from "./site-metadata";

const companiesCta = {
  en: {
    text: "If you're responsible for a team, the For companies page on this site describes custom n8n training and automation programs that run on your own n8n instance, tools and data.",
    label: "Training for your team",
  },
  es: {
    text: "Si eres responsable de un equipo, la página Para empresas de este sitio describe programas a medida de formación y automatización con n8n, en tu propia instancia de n8n y con tus herramientas y datos.",
    label: "Formación para tu equipo",
  },
  uk: {
    text: "Якщо ви відповідаєте за команду, сторінка «Компаніям» на цьому сайті описує програми навчання й автоматизації з n8n на вашому власному екземплярі n8n, з вашими інструментами й даними.",
    label: "Навчання для вашої команди",
  },
} satisfies Record<Locale, { text: string; label: string }>;

const withoutSlash = (url: string) => url.replace(/\/$/, "");

export function currentCtas(blocks: BlogBlock[], locale: Locale, challenge?: Challenge): BlogBlock[] {
  return blocks.map((block) => {
    if (block.type !== "cta") return block;
    // Early articles sent team enquiries straight to LinkedIn, and their text says so.
    if (withoutSlash(block.href) === withoutSlash(SITE_AUTHOR.url)) {
      return { type: "cta", ...companiesCta[locale], href: absoluteUrl(`/${locale}/companies`) };
    }
    // Early practice invitations pointed at the home page; send them to the article's challenge.
    if (challenge && sitePath(block.href) === `/${locale}`) {
      return { ...block, href: absoluteUrl(`/${locale}/challenges/${challenge.slug}`) };
    }
    return block;
  });
}
