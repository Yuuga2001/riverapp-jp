"use client";

import type { AppCategory, Platform } from "@/types/app";
import type { SortOrder } from "./AppsContainer";
import { useTranslation } from "@/i18n/context";

type CategoryFilter = "all" | AppCategory;
type PlatformFilter = "all" | Platform;

interface FilterSectionProps {
  activeCategory: CategoryFilter;
  activePlatform: PlatformFilter;
  sortOrder: SortOrder;
  onCategoryChange: (category: CategoryFilter) => void;
  onPlatformChange: (platform: PlatformFilter) => void;
  onSortChange: (sort: SortOrder) => void;
}

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
  sortOrder,
  onCategoryChange,
  onPlatformChange,
  onSortChange,
}: FilterSectionProps) {
  const t = useTranslation();

  const CATEGORIES: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: t("filter.all") },
    { value: "game", label: t("filter.game") },
    { value: "app", label: t("filter.app") },
  ];

  const PLATFORMS: { value: PlatformFilter; label: string }[] = [
    { value: "all", label: t("filter.all") },
    { value: "web", label: "Web" },
    { value: "ios", label: "iOS" },
    { value: "android", label: "Android" },
  ];

  const SORTS: { value: SortOrder; label: string }[] = [
    { value: "oldest", label: t("filter.oldest") },
    { value: "newest", label: t("filter.newest") },
  ];

  return (
    <div
      className="max-w-[960px] mx-auto flex flex-col gap-4 border-b border-border border-b-thin mb-14 max-sm:px-5"
      style={{ padding: "0 32px 28px" }}
      id="apps"
    >
      <div className="flex items-center gap-2.5 flex-wrap">
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
      <div className="flex items-center gap-2.5 flex-wrap">
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
      <div className="flex items-center gap-2.5 flex-wrap">
        {SORTS.map((s) => (
          <FilterButton
            key={s.value}
            active={sortOrder === s.value}
            onClick={() => onSortChange(s.value)}
          >
            {s.label}
          </FilterButton>
        ))}
      </div>
    </div>
  );
}
