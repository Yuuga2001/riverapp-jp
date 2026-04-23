"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ScreenshotCarouselProps {
  paths: string[];
}

export function ScreenshotCarousel({ paths }: ScreenshotCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  const displayPaths = userInteracted ? paths : [...paths, ...paths];

  useEffect(() => {
    if (userInteracted) return;
    const el = trackRef.current;
    if (!el) return;

    let rafId = 0;
    let last = performance.now();
    let remainder = 0;
    const pxPerSec = 40;

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      remainder += pxPerSec * dt;
      const advance = Math.floor(remainder);
      if (advance > 0) {
        el.scrollLeft += advance;
        remainder -= advance;
      }
      const halfWidth = el.scrollWidth / 2;
      if (halfWidth > 0 && el.scrollLeft >= halfWidth) {
        el.scrollLeft -= halfWidth;
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [userInteracted]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const takeOver = () => {
      const halfWidth = el.scrollWidth / 2;
      if (halfWidth > 0 && el.scrollLeft >= halfWidth) {
        el.scrollLeft -= halfWidth;
      }
      setUserInteracted(true);
    };
    const opts: AddEventListenerOptions = { passive: true, once: true };
    el.addEventListener("pointerdown", takeOver, opts);
    el.addEventListener("touchstart", takeOver, opts);
    el.addEventListener("wheel", takeOver, opts);
    return () => {
      el.removeEventListener("pointerdown", takeOver);
      el.removeEventListener("touchstart", takeOver);
      el.removeEventListener("wheel", takeOver);
    };
  }, []);

  return (
    <section className="mx-auto max-w-[960px] px-8 pb-12 max-sm:px-5 max-sm:pb-10">
      <div
        ref={trackRef}
        className="screenshots-track flex gap-3 overflow-x-auto"
      >
        {displayPaths.map((src, i) => (
          <div key={`${src}-${i}`} className="shrink-0">
            <Image
              src={src}
              alt={`スクリーンショット ${(i % paths.length) + 1}`}
              height={840}
              width={420}
              className="h-[420px] w-auto rounded-2xl block max-sm:h-[320px] max-sm:rounded-xl border border-border border-thin"
              style={{ width: "auto" }}
              quality={90}
              loading="lazy"
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}
