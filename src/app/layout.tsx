import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import "./globals.css";

const geomanist = localFont({
  src: [
    { path: "./fonts/geomanist-light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/geomanist-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/geomanist-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/geomanist-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-geomanist",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
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
