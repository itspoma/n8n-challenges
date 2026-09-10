import { ImageResponse } from "next/og";

import { isLocale, locales } from "@/lib/home-copy";

export const alt = "n8n Balloon Challenges";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const copy = {
  en: {
    eyebrow: "n8n community learning",
    title: "Build. Learn. Automate.",
    titleSize: 76,
    subtitle: "10 hands-on n8n challenges",
  },
  es: {
    eyebrow: "aprendizaje en la comunidad n8n",
    title: "Crea. Aprende. Automatiza.",
    titleSize: 68,
    subtitle: "10 retos prácticos de n8n",
  },
  uk: {
    eyebrow: "навчання у спільноті n8n",
    title: "Створюй. Навчайся. Автоматизуй.",
    titleSize: 62,
    subtitle: "10 практичних завдань n8n",
  },
  id: {
    eyebrow: "belajar bareng komunitas n8n",
    title: "Bangun. Belajar. Otomasi.",
    titleSize: 68,
    subtitle: "10 tantangan praktik n8n",
  },
} as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localizedCopy = isLocale(locale) ? copy[locale] : copy.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          background: "linear-gradient(135deg, #101617 0%, #1b2427 100%)",
          color: "#fffdf6",
          fontFamily: "Arial, sans-serif",
          padding: "72px 84px",
        }}
      >
        <div
          style={{
            width: 760,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#ff7695",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {localizedCopy.eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: localizedCopy.titleSize,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            {localizedCopy.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              color: "#c6c9c7",
              fontSize: 32,
            }}
          >
            {localizedCopy.subtitle}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 58,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            n8n Balloon Challenges
          </div>
        </div>

        <div
          style={{
            width: 260,
            height: 470,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: 72,
            right: 84,
          }}
        >
          <div
            style={{
              width: 236,
              height: 286,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50% 50% 48% 48%",
              background: "linear-gradient(145deg, #ff8aa3 0%, #ea4b71 75%)",
              boxShadow: "0 28px 70px rgba(234, 75, 113, 0.32)",
              color: "#fffdf6",
              fontSize: 88,
              fontWeight: 700,
            }}
          >
            10
          </div>
          <div
            style={{
              width: 22,
              height: 22,
              display: "flex",
              background: "#ea4b71",
              transform: "rotate(45deg)",
              marginTop: -10,
            }}
          />
          <div
            style={{
              width: 2,
              height: 150,
              display: "flex",
              background: "#c6c9c7",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
