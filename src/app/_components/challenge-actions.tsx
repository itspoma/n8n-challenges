"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import type { ChallengePageLabels } from "@/lib/challenges";

type ChallengeActionsProps = {
  labels: ChallengePageLabels;
  tips: string[];
  nextChallengeHref: string;
};

export function ChallengeActions({ labels, tips, nextChallengeHref }: ChallengeActionsProps) {
  const [visibleTips, setVisibleTips] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const allTipsVisible = visibleTips === tips.length;

  function revealTip() {
    setVisibleTips((current) => Math.min(current + 1, tips.length));
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
