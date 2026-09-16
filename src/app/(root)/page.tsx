import type { Metadata } from "next";

import { absoluteUrl, localizedPath } from "@/lib/site-metadata";

// Google treats the instant refresh as a permanent redirect; the canonical agrees with it.
// Never add noindex here: www.n8n-challenges.app redirects to this page.
export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl(localizedPath("en")),
  },
};

export default function Page() {
  const target = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/en`;

  return (
    <main className="root-language-redirect">
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <p>
        <a href={target}>Continue to n8n Balloon Challenges</a>
      </p>
    </main>
  );
}
