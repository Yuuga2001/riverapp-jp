"use client";

import type { AppCategory, Platform } from "@/types/app";

type CategoryFilter = "all" | AppCategory;
type PlatformFilter = "all" | Platform;

interface FilterSectionProps {
  activeCategory: CategoryFilter;
  activePlatform: PlatformFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onPlatformChange: (platform: PlatformFilter) => void;
}

const CATEGORIES: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "game", label: "ゲーム" },
  { value: "app", label: "アプリ" },
];

const PLATFORMS: { value: PlatformFilter; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "web", label: "Web" },
  { value: "ios", label: "iOS" },
  { value: "android", label: "Android" },
];

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`font-mono text-[11px] px-3.5 py-[5px] rounded-[20px] cursor-pointer transition-all duration-150 tracking-[0.2px] border border-solid border-thin ${
        active
          ? "bg-text-primary text-bg border-text-primary"
          : "bg-transparent text-text-secondary border-border hover:border-border-hover hover:text-text-primary"
      }`}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function FilterSection({
  activeCategory,
  activePlatform,
  onCategoryChange,
  onPlatformChange,
}: FilterSectionProps) {
  return (
    <div
      className="max-w-[960px] mx-auto flex flex-col gap-2.5 border-b border-border border-b-thin mb-12 max-sm:px-5"
      style={{ padding: "0 32px 24px" }}
      id="apps"
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-[11px] text-text-tertiary mr-1 tracking-[0.5px]">
          type /
        </span>
        {CATEGORIES.map((cat) => (
          <FilterButton
            key={cat.value}
            active={activeCategory === cat.value}
            onClick={() => onCategoryChange(cat.value)}
          >
            {cat.label}
          </FilterButton>
        ))}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-[11px] text-text-tertiary mr-1 tracking-[0.5px]">
          platform /
        </span>
        {PLATFORMS.map((plat) => (
          <FilterButton
            key={plat.value}
            active={activePlatform === plat.value}
            onClick={() => onPlatformChange(plat.value)}
          >
            {plat.label}
          </FilterButton>
        ))}
      </div>
    </div>
  );
}
