"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface ScreenshotCarouselProps {
  paths: string[];
}

export function ScreenshotCarousel({ paths }: ScreenshotCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const duplicated = [...paths, ...paths];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let paused = false;
    let rafId = 0;
    let last = performance.now();
    let remainder = 0;
    const pxPerSec = 40;

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused) {
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
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
      remainder = 0;
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointercancel", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  return (
    <section className="mx-auto max-w-[960px] px-8 pb-12 max-sm:px-5 max-sm:pb-10">
      <div
        ref={trackRef}
        className="screenshots-track flex gap-3 overflow-x-auto"
      >
        {duplicated.map((src, i) => (
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
