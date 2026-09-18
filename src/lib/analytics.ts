declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Queues a GA4 event via the gtag loaded in the root layouts; a no-op before that script runs.
export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", name, params);
}
