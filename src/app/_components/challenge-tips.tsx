"use client";

import { useState } from "react";

import type { ChallengePageLabels } from "@/lib/challenges";

type ChallengeTipsProps = {
  labels: ChallengePageLabels;
  tips: string[];
};

export function ChallengeTips({ labels, tips }: ChallengeTipsProps) {
  const [visibleTips, setVisibleTips] = useState(0);
  const allTipsVisible = visibleTips === tips.length;

  function revealTip() {
    setVisibleTips((current) => Math.min(current + 1, tips.length));
  }

  return (
    <section className="challenge-actions" aria-label={labels.hintsTitle}>
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
    </section>
  );
}
