import packageJson from "../../../package.json";
import type { Locale } from "@/lib/home-copy";
import { creditCopy, maintainer } from "@/lib/people";
import { withBasePath } from "@/lib/site-path";

// Pages should pass their locale; English is the fallback so an unmigrated page still renders.
export function FooterMeta({ locale = "en" }: { locale?: Locale }) {
  return (
    <p className="footer-meta">
      <span className="footer-version">v{packageJson.version}</span>
      <span aria-hidden="true">·</span>
      <span>© {new Date().getFullYear()} n8n Balloon Challenges</span>
      <span aria-hidden="true">·</span>
      <span>
        {creditCopy[locale].maintainedBy}{" "}
        <a href={maintainer.linkedInUrl} target="_blank" rel="noopener noreferrer">
          {maintainer.name}
        </a>
      </span>
      <span aria-hidden="true">·</span>
      <a href={withBasePath("/llms.txt")}>llms.txt</a>
    </p>
  );
}
