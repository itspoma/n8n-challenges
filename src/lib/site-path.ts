/** Resolve root-relative URLs used by plain anchors on static deployments. */
export function withBasePath(href: string): string {
  return href.startsWith("/") && !href.startsWith("//")
    ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${href}`
    : href;
}
