import type { StoreLink } from "@/types/app";
import { AppleIcon, GooglePlayIcon, WebIcon } from "./icons";

const ICON_MAP = {
  "app-store": AppleIcon,
  "google-play": GooglePlayIcon,
  web: WebIcon,
} as const;

interface StoreButtonProps {
  link: StoreLink;
  variant?: "card" | "detail";
}

export function StoreButton({ link, variant = "card" }: StoreButtonProps) {
  const Icon = ICON_MAP[link.type];

  if (variant === "detail") {
    const baseClass =
      "inline-flex items-center gap-1.5 font-mono text-xs text-text-secondary border border-border border-thin px-4 py-2 rounded-lg no-underline transition-all duration-150 bg-surface hover:border-border-hover hover:text-text-primary hover:bg-card-hover";

    if (link.disabled) {
      return (
        <span className={`${baseClass} opacity-40 cursor-default pointer-events-none`}>
          <Icon className="w-3.5 h-3.5 shrink-0" />
          {link.label}
        </span>
      );
    }

    return (
      <a href={link.url} className={baseClass} target="_blank" rel="noopener noreferrer">
        <Icon className="w-3.5 h-3.5 shrink-0" />
        {link.label}
      </a>
    );
  }

  // Card variant
  const cardBase =
    "flex items-center gap-1 font-mono text-[10px] text-text-secondary border border-border border-thin px-[9px] py-1 rounded-md no-underline transition-all duration-150 bg-bg hover:border-border-hover hover:text-text-primary";

  if (link.disabled) {
    return (
      <span className={`${cardBase} opacity-40 cursor-default pointer-events-none`}>
        <Icon className="w-2.5 h-2.5 shrink-0" />
        {link.label}
      </span>
    );
  }

  return (
    <a
      href={link.url}
      className={cardBase}
           target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      <Icon className="w-2.5 h-2.5 shrink-0" />
      {link.label}
    </a>
  );
}
