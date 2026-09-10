"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";

import type { ChallengePageLabels, ChallengeSolutions } from "@/lib/challenges";
import type { Locale } from "@/lib/home-copy";

type ChallengeActionsProps = {
  challengeSlug: string;
  challengeTitle: string;
  locale: Locale;
  glossary: Array<{ term: string; definition: string }>;
  labels: ChallengePageLabels;
  solutions: ChallengeSolutions | null;
  tips: string[];
  nextChallengeHref: string;
};

const TIP_PROGRESS_STORAGE_PREFIX = "n8n-balloon-challenges:revealed-tips:v1:";

function TipPrompt({ prompt, locale }: { prompt: string; locale: Locale }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const copy = {
    en: { open: "Open prompt", copy: "Copy prompt", copied: "Copied!", close: "Close", failed: "Could not copy. Select the prompt and copy it manually." },
    es: { open: "Abrir prompt", copy: "Copiar prompt", copied: "¡Copiado!", close: "Cerrar", failed: "No se pudo copiar. Selecciona el texto y cópialo manualmente." },
    uk: { open: "Відкрити промпт", copy: "Копіювати промпт", copied: "Скопійовано!", close: "Закрити", failed: "Не вдалося скопіювати. Виділи текст і скопіюй вручну." },
    id: { open: "Buka prompt", copy: "Salin prompt", copied: "Tersalin!", close: "Tutup", failed: "Gagal menyalin. Pilih teks prompt-nya dan salin manual." },
  }[locale];
  return (
    <>
      <button className="hint-button tip-prompt-button" type="button" onClick={() => { setCopyState("idle"); dialog.current?.showModal(); }}>{copy.open}</button>
      <dialog className="solution-confirm-dialog tip-prompt-dialog" ref={dialog} aria-label={copy.open}>
        <div className="solution-confirm-dialog-inner">
          <form method="dialog"><button className="solution-confirm-dialog-close" aria-label={copy.close}>×</button></form>
          <h2>{copy.open}</h2>
          <div className="tip-prompt-text" tabIndex={0}>{prompt}</div>
          <button className="hint-button" type="button" onClick={async () => {
            try { await navigator.clipboard.writeText(prompt); setCopyState("copied"); }
            catch { setCopyState("failed"); }
          }}>{copy.copy}</button>
          <p role="status">{copyState === "copied" ? copy.copied : copyState === "failed" ? copy.failed : ""}</p>
        </div>
      </dialog>
    </>
  );
}
const TIP_PROGRESS_EVENT = "n8n-balloon-challenges:tip-progress";
const fallbackTipProgress = new Map<string, number>();
const SOLUTION_REVEAL_STORAGE_PREFIX = "n8n-balloon-challenges:revealed-solution:v1:";
const SOLUTION_REVEAL_EVENT = "n8n-balloon-challenges:solution-reveal";
const fallbackSolutionReveal = new Set<string>();
const SOLUTION_VARIANTS = ["core", "bonus"] as const;
const CONFETTI_COLORS = [
  "var(--pink)",
  "var(--yellow)",
  "var(--blue)",
  "var(--green)",
  "var(--purple)",
  "var(--white)",
];
const CONFETTI_PIECES = Array.from({ length: 56 }, (_, index) => ({
  id: index,
  style: {
    "--confetti-color": CONFETTI_COLORS[index % CONFETTI_COLORS.length],
    "--confetti-delay": `${(index % 10) * 24}ms`,
    "--confetti-left": `${38 + ((index * 17) % 25)}%`,
    "--confetti-x": `${-260 + ((index * 89) % 520)}px`,
    "--confetti-y": `${150 + ((index * 47) % 250)}px`,
    "--confetti-rotation": `${-540 + ((index * 71) % 1080)}deg`,
    "--confetti-scale": `${0.7 + (index % 4) * 0.12}`,
  } as CSSProperties,
}));

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

function readSolutionReveal(storageKey: string) {
  try {
    if (window.localStorage.getItem(storageKey) === "true") {
      return true;
    }
  } catch {}

  return fallbackSolutionReveal.has(storageKey);
}

function writeSolutionReveal(storageKey: string) {
  fallbackSolutionReveal.add(storageKey);

  try {
    window.localStorage.setItem(storageKey, "true");
  } catch {}

  window.dispatchEvent(new Event(SOLUTION_REVEAL_EVENT));
}

function getServerSolutionReveal() {
  return false;
}

function escapeRegularExpression(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function TipWithGlossary({
  text,
  locale,
  glossary,
  idPrefix,
}: {
  text: string;
  locale: Locale;
  glossary: Array<{ term: string; definition: string }>;
  idPrefix: string;
}) {
  const terms = [...glossary].sort((left, right) => right.term.length - left.term.length);

  if (terms.length === 0) {
    return text;
  }

  const termPattern = new RegExp(
    `(?<![\\p{L}\\p{N}_])(?:${terms
      .map(({ term }) => escapeRegularExpression(term))
      .join("|")})(?![\\p{L}\\p{N}_])`,
    "giu",
  );
  const content: ReactNode[] = [];
  let previousIndex = 0;

  for (const match of text.matchAll(termPattern)) {
    const matchIndex = match.index ?? 0;
    const matchedText = match[0];
    const entry = terms.find(
      ({ term }) => term.localeCompare(matchedText, locale, { sensitivity: "accent" }) === 0,
    );

    if (!entry) continue;

    if (matchIndex > previousIndex) {
      content.push(text.slice(previousIndex, matchIndex));
    }

    const tooltipId = `${idPrefix}-definition-${matchIndex}`;
    content.push(
      <span className="glossary-term" tabIndex={0} aria-describedby={tooltipId} key={tooltipId}>
        {matchedText}
        <span className="glossary-tooltip" id={tooltipId} role="tooltip">
          {entry.definition}
        </span>
      </span>,
    );
    previousIndex = matchIndex + matchedText.length;
  }

  if (previousIndex < text.length) {
    content.push(text.slice(previousIndex));
  }

  return <>{content}</>;
}

export function ChallengeActions({
  challengeSlug,
  challengeTitle,
  locale,
  glossary,
  labels,
  solutions,
  tips,
  nextChallengeHref,
}: ChallengeActionsProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const storageKey = `${TIP_PROGRESS_STORAGE_PREFIX}${challengeSlug}`;
  const solutionStorageKey = `${SOLUTION_REVEAL_STORAGE_PREFIX}${challengeSlug}`;
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
  const subscribeToSolutionReveal = useCallback(
    (onStoreChange: () => void) => {
      function handleStorage(event: StorageEvent) {
        if (event.key === solutionStorageKey) {
          onStoreChange();
        }
      }

      window.addEventListener("storage", handleStorage);
      window.addEventListener(SOLUTION_REVEAL_EVENT, onStoreChange);

      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener(SOLUTION_REVEAL_EVENT, onStoreChange);
      };
    },
    [solutionStorageKey],
  );
  const getSolutionReveal = useCallback(
    () => readSolutionReveal(solutionStorageKey),
    [solutionStorageKey],
  );
  const isSolutionExpanded = useSyncExternalStore(
    subscribeToSolutionReveal,
    getSolutionReveal,
    getServerSolutionReveal,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const solutionDialogRef = useRef<HTMLDialogElement>(null);
  const solutionCardRef = useRef<HTMLElement>(null);
  const [selectedSolution, setSelectedSolution] = useState<"core" | "bonus">("core");
  const allTipsVisible = visibleTips >= tips.length;
  const hasSolution = solutions !== null;
  const activeSolution = solutions?.[selectedSolution] ?? null;
  const activeSolutionAlt =
    selectedSolution === "core"
      ? labels.solutionCoreImageAlt
      : labels.solutionBonusImageAlt;
  const solutionPanelId = `challenge-solution-${challengeSlug}`;

  function revealTip() {
    writeTipProgress(storageKey, Math.min(visibleTips + 1, tips.length));
  }

  function requestSolutionReveal() {
    solutionDialogRef.current?.showModal();
  }

  function showWorkflowAnswer() {
    solutionCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    if (!isSolutionExpanded) {
      requestSolutionReveal();
    }
  }

  function revealSolution() {
    writeSolutionReveal(solutionStorageKey);
    solutionDialogRef.current?.close();
  }

  return (
    <section id="challenge-actions" className="challenge-actions" aria-label={labels.hintsTitle}>
      <div className="challenge-actions-left">
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
                  <div>
                  <p>
                    <TipWithGlossary
                      text={tip.split(" ||PROMPT|| ")[0]}
                      locale={locale}
                      glossary={glossary}
                      idPrefix={`tip-${challengeSlug}-${index}`}
                    />
                  </p>
                  {tip.includes(" ||PROMPT|| ") ? <TipPrompt prompt={tip.split(" ||PROMPT|| ")[1]} locale={locale} /> : null}
                  </div>
                </li>
              ))}
            </ol>
          ) : null}

          <div className="challenge-hint-actions">
            <button className="hint-button" type="button" onClick={revealTip} disabled={allTipsVisible}>
              {allTipsVisible ? labels.allTips : visibleTips === 0 ? labels.firstTip : labels.nextTip}
              <span aria-hidden="true">{allTipsVisible ? "✓" : "+"}</span>
            </button>
            {allTipsVisible && hasSolution ? (
              <button
                className="challenge-solution-toggle challenge-answer-shortcut"
                type="button"
                onClick={showWorkflowAnswer}
              >
                {labels.showWorkflowAnswer}
                <span aria-hidden="true">↓</span>
              </button>
            ) : null}
          </div>
        </article>

        {hasSolution ? (
          <article
            ref={solutionCardRef}
            className={`challenge-solution-card${isSolutionExpanded ? " is-expanded" : ""}`}
          >
            <div className="challenge-solution-summary">
              <div>
                <p className="section-kicker">{labels.solution}</p>
                <h2>{labels.solutionTitle}</h2>
                <p>{labels.solutionBody}</p>
              </div>
              {!isSolutionExpanded ? (
                <button
                  className="challenge-solution-toggle"
                  type="button"
                  aria-expanded="false"
                  aria-controls={solutionPanelId}
                  onClick={requestSolutionReveal}
                >
                  {labels.solutionExpand}
                  <span aria-hidden="true">+</span>
                </button>
              ) : null}
            </div>

            {isSolutionExpanded && activeSolution ? (
              <div className="challenge-solution-content">
                <div
                  className="challenge-solution-tabs"
                  role="group"
                  aria-label={labels.solutionTitle}
                >
                  {SOLUTION_VARIANTS.map((variant) => (
                    <button
                      key={variant}
                      type="button"
                      aria-controls={solutionPanelId}
                      aria-pressed={selectedSolution === variant}
                      onClick={() => setSelectedSolution(variant)}
                    >
                      {variant === "core" ? labels.solutionCore : labels.solutionBonus}
                    </button>
                  ))}
                </div>
                <div
                  className="challenge-solution-figure"
                  id={solutionPanelId}
                >
                  {([
                    ["dark", activeSolution.dark],
                    ["light", activeSolution.light],
                  ] as const).map(([theme, imagePath]) => (
                    <a
                      key={theme}
                      className={`challenge-solution-image-link challenge-solution-image-${theme}`}
                      href={`${basePath}${imagePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${labels.solutionOpenImage}: ${activeSolutionAlt}`}
                      title={labels.solutionOpenImage}
                    >
                      <Image
                        className="challenge-solution-image"
                        src={`${basePath}${imagePath}`}
                        width={2400}
                        height={1350}
                        sizes="(max-width: 1280px) 100vw, 700px"
                        alt={`${challengeTitle}: ${activeSolutionAlt}`}
                        unoptimized
                      />
                      <span className="challenge-solution-zoom" aria-hidden="true">
                        <svg viewBox="0 0 24 24" role="presentation">
                          <circle cx="10.5" cy="10.5" r="6.5" />
                          <path d="m15.5 15.5 4.5 4.5M10.5 7.5v6M7.5 10.5h6" />
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </article>
        ) : null}
      </div>

      <article className="challenge-submit-card">
        <p className="section-kicker">{labels.submit}</p>
        <h2>{labels.reviewTitle}</h2>
        <p>{labels.reviewBody}</p>
        <button type="button" onClick={() => dialogRef.current?.showModal()}>
          {labels.submit}
          <span aria-hidden="true">→</span>
        </button>
      </article>

      {hasSolution ? (
        <dialog
          className="solution-confirm-dialog"
          ref={solutionDialogRef}
          aria-labelledby="solution-confirm-title"
          aria-describedby="solution-confirm-description"
        >
          <div className="solution-confirm-dialog-inner">
            <form method="dialog">
              <button
                className="solution-confirm-dialog-close"
                type="submit"
                aria-label={labels.solutionDialogDismiss}
              >
                ×
              </button>
            </form>
            <span className="solution-confirm-dialog-status" aria-hidden="true">?</span>
            <p className="section-kicker">{labels.solution}</p>
            <h2 id="solution-confirm-title">{labels.solutionConfirmTitle}</h2>
            <p id="solution-confirm-description">{labels.solutionConfirmBody}</p>
            <div className="solution-confirm-dialog-actions">
              <form method="dialog">
                <button className="solution-confirm-dialog-secondary" type="submit">
                  {labels.solutionConfirmCancel}
                </button>
              </form>
              <button type="button" onClick={revealSolution}>
                {labels.solutionConfirmReveal}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </dialog>
      ) : null}

      <dialog className="review-dialog" ref={dialogRef} aria-labelledby="review-dialog-title">
        <div className="review-dialog-inner">
          <div className="review-dialog-confetti" aria-hidden="true">
            {CONFETTI_PIECES.map(({ id, style }) => (
              <span className="review-dialog-confetti-piece" key={id} style={style} />
            ))}
          </div>
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
