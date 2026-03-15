"use client";

interface ScreenshotCarouselProps {
  paths: string[];
}

export function ScreenshotCarousel({ paths }: ScreenshotCarouselProps) {
  // Duplicate for seamless infinite loop
  const duplicated = [...paths, ...paths];
  const scrollDuration = `${paths.length * 8}s`;

  return (
    <section className="mx-auto max-w-[960px] px-8 pb-12 overflow-hidden max-sm:px-5 max-sm:pb-10">
      <div
        className="screenshots-track"
        style={
          { "--scroll-duration": scrollDuration } as React.CSSProperties
        }
      >
        {duplicated.map((src, i) => (
          <div key={`${src}-${i}`} className="shrink-0">
            <img
              src={src}
              alt={`スクリーンショット ${(i % paths.length) + 1}`}
              className="h-[420px] w-auto rounded-2xl block max-sm:h-[320px] max-sm:rounded-xl"
              style={{ border: "0.5px solid var(--color-border)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
