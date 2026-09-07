import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { geomanist } from "@/app/fonts";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-metadata";

import "../globals.css";

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
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
