"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/i18n/context";
import { SUPPORTED_LOCALES, LOCALE_NAMES } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 font-mono text-[11px] text-text-secondary tracking-[0.3px] cursor-pointer transition-colors duration-150 hover:text-text-primary bg-transparent border border-border border-thin rounded-full px-3 py-[5px]"
        aria-expanded={open}
        aria-haspopup="listbox"
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
        <span>Language</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 bg-surface border border-border border-thin rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] py-2 z-50 min-w-[160px] max-h-[400px] overflow-y-auto"
          role="listbox"
          aria-activedescendant={`lang-${locale}`}
        >
          {SUPPORTED_LOCALES.map((loc) => (
            <button
              key={loc}
              id={`lang-${loc}`}
              role="option"
              aria-selected={locale === loc}
              onClick={() => {
                setLocale(loc as Locale);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 font-mono text-[12px] tracking-[0.2px] cursor-pointer transition-colors duration-100 flex items-center justify-between bg-transparent border-none ${
                locale === loc
                  ? "text-text-primary font-medium"
                  : "text-text-secondary hover:text-text-primary hover:bg-card-hover"
              }`}
            >
              <span>{LOCALE_NAMES[loc]}</span>
              {locale === loc && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
