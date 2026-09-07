import localFont from "next/font/local";

export const geomanist = localFont({
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
