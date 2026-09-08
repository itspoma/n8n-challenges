"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const photos = [
  { src: "/events/previous-event-1.jpg", width: 750, height: 500 },
  { src: "/events/previous-event-2.jpg", width: 333, height: 500 },
  { src: "/events/previous-event-3.jpg", width: 333, height: 500 },
  { src: "/events/previous-event-4.jpg", width: 750, height: 500 },
  { src: "/events/previous-event-5.jpg", width: 750, height: 500 },
  { src: "/events/previous-event-6.jpg", width: 333, height: 500 },
  { src: "/events/previous-event-7.jpg", width: 662, height: 500 },
] as const;

const autoScrollSpeed = 20;
const rewindDuration = 800;

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

type EventPhotoStripProps = {
  ariaLabel: string;
  kicker: string;
  photoAlts: string[];
};

export function EventPhotoStrip({ ariaLabel, kicker, photoAlts }: EventPhotoStripProps) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const duplicateGroup = rail?.querySelector<HTMLElement>("[data-duplicate-group]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!rail || !duplicateGroup || reducedMotion.matches) return;

    let animationFrame = 0;
    let lastTimestamp: number | null = null;
    let scrollPosition = rail.scrollLeft;
    let rewindFrom: number | null = null;
    let rewindElapsed = 0;

    const animate = (timestamp: number) => {
      const elapsed = lastTimestamp === null ? 0 : Math.min(timestamp - lastTimestamp, 100);
      lastTimestamp = timestamp;
      const paused = rail.matches(":hover") || rail.matches(":focus-within");

      if (paused) {
        scrollPosition = rail.scrollLeft;

        if (rewindFrom !== null) {
          rewindFrom = scrollPosition;
          rewindElapsed = 0;
        }
      } else if (rewindFrom !== null) {
        rewindElapsed += elapsed;

        const progress = Math.min(rewindElapsed / rewindDuration, 1);
        scrollPosition = rewindFrom * (1 - easeInOutCubic(progress));
        rail.scrollLeft = scrollPosition;

        if (progress === 1) {
          scrollPosition = 0;
          rail.scrollLeft = 0;
          rewindFrom = null;
          rewindElapsed = 0;
        }
      } else {
        scrollPosition += (autoScrollSpeed * elapsed) / 1000;
        rail.scrollLeft = scrollPosition;

        if (scrollPosition >= duplicateGroup.offsetLeft) {
          rewindFrom = scrollPosition;
          rewindElapsed = 0;
        }
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="previous-events" aria-label={ariaLabel}>
      <div className="shell">
        <p className="section-kicker">{kicker}</p>
      </div>
      <div className="event-photo-rail" ref={railRef} tabIndex={0}>
        <div className="event-photo-track">
          {[false, true].map((isDuplicate) => (
            <div
              className="event-photo-group"
              data-duplicate-group={isDuplicate ? "" : undefined}
              aria-hidden={isDuplicate || undefined}
              key={String(isDuplicate)}
            >
              {photos.map((photo, index) => (
                <figure className="event-photo-card" key={`${photo.src}-${isDuplicate}`}>
                  <Image
                    className="event-photo-image"
                    src={photo.src}
                    width={photo.width}
                    height={photo.height}
                    sizes={photo.width > photo.height ? "375px" : "167px"}
                    alt={isDuplicate ? "" : photoAlts[index]}
                    draggable={false}
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
