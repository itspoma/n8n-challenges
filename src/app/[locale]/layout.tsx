import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { geomanist } from "@/app/fonts";
import { isLocale, locales } from "@/lib/home-copy";

import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "n8n Balloon Challenges",
    template: "%s · n8n Balloon Challenges",
  },
  description:
    "Choose an n8n challenge, build a working automation, and collect a balloon with your team.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#EA4B71",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={geomanist.variable}
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{const theme=localStorage.getItem('n8n-challenges-theme');if(theme==='light'||theme==='dark'){document.documentElement.dataset.theme=theme}}catch{}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
