"use client";

import Link from "next/link";
import { useCallback, useRef, useSyncExternalStore } from "react";

import type { ChallengePageLabels } from "@/lib/challenges";

type ChallengeActionsProps = {
  challengeSlug: string;
  labels: ChallengePageLabels;
  tips: string[];
  nextChallengeHref: string;
};

const TIP_PROGRESS_STORAGE_PREFIX = "n8n-balloon-challenges:revealed-tips:v1:";
const TIP_PROGRESS_EVENT = "n8n-balloon-challenges:tip-progress";
const fallbackTipProgress = new Map<string, number>();

function clampTipCount(value: number, totalTips: number) {
  return Math.min(Math.max(value, 0), totalTips);
}

function readTipProgress(storageKey: string, totalTips: number) {
  try {
    const storedValue = window.localStorage.getItem(storageKey);

    if (storedValue !== null) {
      const parsedValue = Number(storedValue);

      if (Number.isInteger(parsedValue)) {
        return clampTipCount(parsedValue, totalTips);
      }
    }
  } catch {}

  return clampTipCount(fallbackTipProgress.get(storageKey) ?? 0, totalTips);
}

function writeTipProgress(storageKey: string, visibleTips: number) {
  fallbackTipProgress.set(storageKey, visibleTips);

  try {
    window.localStorage.setItem(storageKey, String(visibleTips));
  } catch {}

  window.dispatchEvent(new Event(TIP_PROGRESS_EVENT));
}

function getServerTipProgress() {
  return 0;
}

export function ChallengeActions({
  challengeSlug,
  labels,
  tips,
  nextChallengeHref,
}: ChallengeActionsProps) {
  const storageKey = `${TIP_PROGRESS_STORAGE_PREFIX}${challengeSlug}`;
  const subscribeToTipProgress = useCallback(
    (onStoreChange: () => void) => {
      function handleStorage(event: StorageEvent) {
        if (event.key === storageKey) {
          onStoreChange();
        }
      }

      window.addEventListener("storage", handleStorage);
      window.addEventListener(TIP_PROGRESS_EVENT, onStoreChange);

      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener(TIP_PROGRESS_EVENT, onStoreChange);
      };
    },
    [storageKey],
  );
  const getTipProgress = useCallback(
    () => readTipProgress(storageKey, tips.length),
    [storageKey, tips.length],
  );
  const visibleTips = useSyncExternalStore(
    subscribeToTipProgress,
    getTipProgress,
    getServerTipProgress,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const allTipsVisible = visibleTips >= tips.length;

  function revealTip() {
    writeTipProgress(storageKey, Math.min(visibleTips + 1, tips.length));
  }

  return (
    <section id="challenge-actions" className="challenge-actions" aria-label={labels.hintsTitle}>
      <article className="challenge-hints-card">
        <div className="challenge-action-heading">
          <div>
            <p className="section-kicker">{labels.tip}</p>
            <h2>{labels.hintsTitle}</h2>
          </div>
          <span>{visibleTips}/{tips.length}</span>
        </div>
        <p>{labels.hintsBody}</p>

        {visibleTips > 0 ? (
          <ol className="challenge-tips" aria-live="polite">
            {tips.slice(0, visibleTips).map((tip, index) => (
              <li key={tip}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{tip}</p>
              </li>
            ))}
          </ol>
        ) : null}

        <button className="hint-button" type="button" onClick={revealTip} disabled={allTipsVisible}>
          {allTipsVisible ? labels.allTips : visibleTips === 0 ? labels.firstTip : labels.nextTip}
          <span aria-hidden="true">{allTipsVisible ? "✓" : "+"}</span>
        </button>
      </article>

      <article className="challenge-submit-card">
        <p className="section-kicker">{labels.submit}</p>
        <h2>{labels.reviewTitle}</h2>
        <p>{labels.reviewBody}</p>
        <button type="button" onClick={() => dialogRef.current?.showModal()}>
          {labels.submit}
          <span aria-hidden="true">→</span>
        </button>
      </article>

      <dialog className="review-dialog" ref={dialogRef} aria-labelledby="review-dialog-title">
        <div className="review-dialog-inner">
          <form method="dialog">
            <button className="review-dialog-close" type="submit" aria-label={labels.modalDismiss}>
              ×
            </button>
          </form>
          <span className="review-dialog-status" aria-hidden="true">✓</span>
          <p className="section-kicker">{labels.modalEyebrow}</p>
          <h2 id="review-dialog-title">{labels.modalTitle}</h2>
          <p>{labels.modalBody}</p>
          <div className="review-dialog-actions">
            <form method="dialog">
              <button className="review-dialog-secondary" type="submit">{labels.modalClose}</button>
            </form>
            <Link href={nextChallengeHref} onClick={() => dialogRef.current?.close()}>
              {labels.modalNext}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </dialog>
    </section>
  );
}
