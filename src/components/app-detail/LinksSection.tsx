import Link from "next/link";
import type { ExternalLink } from "@/types/app";

interface InternalLink {
  label: string;
  href: string;
}

interface LinksSectionProps {
  links?: ExternalLink[];
  documentLinks?: InternalLink[];
}

export function LinksSection({ links = [], documentLinks = [] }: LinksSectionProps) {
  const allItems = [
    ...documentLinks.map((l) => ({ ...l, external: false })),
    ...links.map((l) => ({ label: l.label, href: l.url, external: true })),
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
            {item.external ? (
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
            ) : (
              <Link
                href={item.href}
                className={`group flex justify-between items-center py-4 no-underline transition-all duration-150 border-b border-border border-b-thin ${
                  i === 0 ? "border-t border-t-thin" : ""
                }`}
              >
                <span className="text-sm text-text-secondary transition-colors duration-150 group-hover:text-text-primary">
                  {item.label}
                </span>
                <span className="font-mono text-sm text-text-tertiary transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-secondary">
                  →
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
