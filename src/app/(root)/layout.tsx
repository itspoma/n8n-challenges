import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { geomanist } from "@/app/fonts";

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
