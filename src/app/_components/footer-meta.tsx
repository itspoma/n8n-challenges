import packageJson from "../../../package.json";
import { withBasePath } from "@/lib/site-path";

export function FooterMeta() {
  return (
    <p className="footer-meta">
      <span className="footer-version">v{packageJson.version}</span>
      <span aria-hidden="true">·</span>
      <span>© {new Date().getFullYear()} n8n Balloon Challenges</span>
      <span aria-hidden="true">·</span>
      <a href={withBasePath("/llms.txt")}>llms.txt</a>
    </p>
  );
}
