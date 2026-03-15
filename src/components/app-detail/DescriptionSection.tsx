import { type ComponentType } from "react";

interface DescriptionSectionProps {
  slug: string;
}

export async function DescriptionSection({ slug }: DescriptionSectionProps) {
  let Content: ComponentType | null = null;
  try {
    const mod = await import(`@/data/content/${slug}`);
    if (mod.default) {
      Content = mod.default;
    }
  } catch {
    // Content module not found — render nothing
  }

  if (!Content) {
    return null;
  }

  return (
    <section
      className="mx-auto max-w-[960px] px-8 pt-10 pb-12 max-sm:px-5"
      style={{ borderTop: "0.5px solid var(--color-border)" }}
    >
      <h2 className="font-mono text-[11px] text-text-tertiary tracking-[1.5px] uppercase mb-5 font-normal">
        description
      </h2>
      <div className="description-content text-sm text-text-secondary leading-[1.9] max-w-[640px]">
        <Content />
      </div>
    </section>
  );
}
