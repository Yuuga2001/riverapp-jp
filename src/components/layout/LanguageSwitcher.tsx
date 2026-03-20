"use client";

import { useLocale } from "@/i18n/context";
import { SUPPORTED_LOCALES, LOCALE_NAMES } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const toggle = () => {
    const next: Locale = locale === "ja" ? "en" : "ja";
    setLocale(next);
  };

  const nextLocale: Locale = locale === "ja" ? "en" : "ja";

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 font-mono text-[11px] text-text-secondary tracking-[0.3px] cursor-pointer transition-colors duration-150 hover:text-text-primary bg-transparent border border-border border-thin rounded-full px-3 py-[5px]"
      aria-label={`Switch to ${LOCALE_NAMES[nextLocale]}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span>
        {SUPPORTED_LOCALES.map((loc) => LOCALE_NAMES[loc]).join(" / ")}
      </span>
    </button>
  );
}
