"use client";

import ReactMarkdown from "react-markdown";
import type { App } from "@/types/app";
import { useLocalizedApp } from "@/i18n/context";

interface DescriptionSectionProps {
  app: App;
}

export function DescriptionSection({ app: rawApp }: DescriptionSectionProps) {
  const app = useLocalizedApp(rawApp);

  if (!app.description) {
    return null;
  }

  return (
    <section className="mx-auto max-w-[960px] px-8 pt-10 pb-12 max-sm:px-5 border-t border-border border-t-thin">
      <h2 className="font-mono text-[11px] text-text-tertiary tracking-[1.5px] uppercase mb-5 font-normal">
        description
      </h2>
      <div className="description-content text-sm text-text-secondary leading-[1.9] max-w-[640px]">
        <ReactMarkdown>{app.description}</ReactMarkdown>
      </div>
    </section>
  );
}
