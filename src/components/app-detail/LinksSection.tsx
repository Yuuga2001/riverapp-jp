"use client";

import type { ExternalLink } from "@/types/app";
import { useTranslation } from "@/i18n/context";

interface DocumentLink {
  label: string;
  href: string;
  /** Translation key — if provided, label is used as fallback */
  translationKey?: string;
  /** Variables for translation interpolation */
  translationVars?: Record<string, string>;
}

interface LinksSectionProps {
  links?: ExternalLink[];
  documentLinks?: DocumentLink[];
}

export function LinksSection({ links = [], documentLinks = [] }: LinksSectionProps) {
  const t = useTranslation();

  const allItems = [
    ...documentLinks.map((l) => ({
      label: l.translationKey
        ? t(l.translationKey, l.translationVars)
        : l.label,
      href: l.href,
    })),
    ...links.map((l) => ({ label: l.label, href: l.url })),
  ];

  if (allItems.length === 0) return null;

  return (
    <section
      className="mx-auto max-w-[960px] px-8 pt-10 pb-16 max-sm:px-5 border-t border-border border-t-thin"
    >
      <h2 className="font-mono text-[11px] text-text-tertiary tracking-[1.5px] uppercase mb-5 font-normal">
        links
      </h2>
      <ul className="list-none">
        {allItems.map((item, i) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`group flex justify-between items-center py-4 no-underline transition-all duration-150 border-b border-border border-b-thin ${
                i === 0 ? "border-t border-t-thin" : ""
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-sm text-text-secondary transition-colors duration-150 group-hover:text-text-primary">
                {item.label}
              </span>
              <span className="font-mono text-sm text-text-tertiary transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-secondary">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
