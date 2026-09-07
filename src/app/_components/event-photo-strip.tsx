"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const photos = [
  { src: "/events/previous-event-1.jpg", width: 750, height: 500 },
  { src: "/events/previous-event-2.jpg", width: 333, height: 500 },
  { src: "/events/previous-event-3.jpg", width: 333, height: 500 },
  { src: "/events/previous-event-4.jpg", width: 750, height: 500 },
  { src: "/events/previous-event-5.jpg", width: 750, height: 500 },
] as const;

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

    const interval = window.setInterval(() => {
      const paused = rail.matches(":hover") || rail.matches(":focus-within");

      if (paused) return;

      rail.scrollLeft += 0.6;

      if (rail.scrollLeft >= duplicateGroup.offsetLeft) {
        rail.scrollLeft -= duplicateGroup.offsetLeft;
      }
    }, 30);

    return () => window.clearInterval(interval);
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
