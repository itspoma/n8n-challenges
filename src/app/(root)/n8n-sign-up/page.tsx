import type { Metadata } from "next";

const partnerUrl = "https://n8n.partnerlinks.io/ajjo654epkuj?sid=n8n-challenges";

export const metadata: Metadata = {
  title: "Sign up for n8n Cloud",
  robots: { index: false, follow: false },
};

export default function N8nSignUpPage() {
  return (
    <main className="root-language-redirect">
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(partnerUrl)});`,
        }}
      />
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=${partnerUrl}`} />
      </noscript>
      <p>
        <a href={partnerUrl} rel="sponsored">Continue to n8n</a>
      </p>
    </main>
  );
}
