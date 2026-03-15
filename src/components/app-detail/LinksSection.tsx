import type { ExternalLink } from "@/types/app";

interface LinksSectionProps {
  links: ExternalLink[];
}

export function LinksSection({ links }: LinksSectionProps) {
  return (
    <section
      className="mx-auto max-w-[960px] px-8 pt-10 pb-16 max-sm:px-5 border-t border-border border-t-thin"
    >
      <h2 className="font-mono text-[11px] text-text-tertiary tracking-[1.5px] uppercase mb-5 font-normal">
        links
      </h2>
      <ul className="list-none">
        {links.map((link, i) => (
          <li key={link.url}>
            <a
              href={link.url}
              className={`group flex justify-between items-center py-4 no-underline transition-all duration-150 border-b border-border border-b-thin ${
                i === 0 ? "border-t border-t-thin" : ""
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-sm text-text-secondary transition-colors duration-150 group-hover:text-text-primary">
                {link.label}
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
