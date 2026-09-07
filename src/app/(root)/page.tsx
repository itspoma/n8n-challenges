import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
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
