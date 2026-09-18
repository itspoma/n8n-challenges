"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  eventParams?: Record<string, string | number | boolean>;
};

// Plain <a>, but reports a GA event on click before the browser navigates away.
export function TrackedLink({ event, eventParams, onClick, ...anchorProps }: TrackedLinkProps) {
  function handleClick(clickEvent: MouseEvent<HTMLAnchorElement>) {
    trackEvent(event, eventParams);
    onClick?.(clickEvent);
  }

  return <a {...anchorProps} onClick={handleClick} />;
}
