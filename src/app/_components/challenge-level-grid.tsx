"use client";

import { useState, type CSSProperties } from "react";

import { BalloonString } from "@/app/_components/balloon-string";

type Difficulty = "beginner" | "intermediate" | "advanced";

type LevelChallenge = {
  color: string;
  ink: string;
  number: number;
  slug: string;
  title: string;
};

type ChallengeLevel = {
  body: string;
  challenges: LevelChallenge[];
  count: string;
  difficulty: Difficulty;
  name: string;
};

type ChallengeLevelGridProps = {
  levels: ChallengeLevel[];
  openLabel: string;
};

export function ChallengeLevelGrid({ levels, openLabel }: ChallengeLevelGridProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  function selectDifficulty(difficulty: Difficulty) {
    setSelectedDifficulty(difficulty);

    const challengeMap = document.getElementById("challenge-map");
    if (!challengeMap) return;

    challengeMap.dataset.highlightLevel = difficulty;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    challengeMap.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <div className="level-grid">
      {levels.map((level, index) => {
        const isSelected = selectedDifficulty === level.difficulty;

        return (
          <article
            className={`level-card level-${index + 1}${isSelected ? " is-selected" : ""}`}
            key={level.difficulty}
          >
            <button
              className="level-card-select"
              type="button"
              aria-controls="challenge-map"
              aria-pressed={isSelected}
              onClick={() => selectDifficulty(level.difficulty)}
            >
              <span className="sr-only">{`${level.name}: ${level.count}`}</span>
            </button>
            <div className="level-card-top">
              <span className="level-number">0{index + 1}</span>
            </div>
            <h3>{level.name}</h3>
            <p>{level.body}</p>
            <div className="level-meta">
              <strong>{level.count}</strong>
            </div>
            <div className="level-balloons">
              {level.challenges.map((challenge) => (
                <a
                  className="level-balloon-link"
                  href={`#challenge-${challenge.slug}`}
                  key={challenge.slug}
                  aria-label={`${openLabel}: ${challenge.title}`}
                  title={challenge.title}
                >
                  <span
                    className="level-balloon"
                    style={
                      {
                        "--balloon": challenge.color,
                        "--ink": challenge.ink,
                      } as CSSProperties
                    }
                    aria-hidden="true"
                  >
                    <strong>{String(challenge.number).padStart(2, "0")}</strong>
                    <BalloonString className="level-balloon-string" />
                  </span>
                </a>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
