"use client";

import { useTranslation } from "@/i18n/context";
import { TAG_TRANSLATION_MAP } from "@/i18n/config";

interface TagProps {
  label: string;
  compact?: boolean;
}

export function Tag({ label, compact }: TagProps) {
  const t = useTranslation();

  // Translate tag label if mapping exists, otherwise use original
  const translationKey = TAG_TRANSLATION_MAP[label];
  const displayLabel = translationKey ? t(translationKey) : label;

  return (
    <span
      className={`font-sans font-normal border border-border border-thin bg-transparent text-text-secondary tracking-[0.2px] whitespace-nowrap rounded-xl ${
        compact
          ? "text-[10px] px-2 py-[2px]"
          : "text-[11px] px-[10px] py-[3px]"
      }`}
    >
      {displayLabel}
    </span>
  );
}
