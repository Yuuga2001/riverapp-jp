"use client";

import { useState, useMemo } from "react";
import type { App, AppCategory, Platform } from "@/types/app";
import { FilterSection } from "./FilterSection";
import { AppGrid } from "./AppGrid";

type CategoryFilter = "all" | AppCategory;
type PlatformFilter = "all" | Platform;
export type SortOrder = "oldest" | "newest";

interface AppsContainerProps {
  apps: App[];
}

export function AppsContainer({ apps }: AppsContainerProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [activePlatform, setActivePlatform] = useState<PlatformFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("oldest");

  const filteredAndSortedApps = useMemo(() => {
    const filtered = apps.filter((app) => {
      const catMatch =
        activeCategory === "all" || app.category === activeCategory;
      const platMatch =
        activePlatform === "all" || app.platforms.includes(activePlatform);
      return catMatch && platMatch;
    });

    return [...filtered].sort((a, b) => {
      const cmp = a.createdAt.localeCompare(b.createdAt);
      return sortOrder === "oldest" ? cmp : -cmp;
    });
  }, [apps, activeCategory, activePlatform, sortOrder]);

  const showComingSoon =
    activeCategory === "all" && activePlatform === "all";

  return (
    <>
      <FilterSection
        activeCategory={activeCategory}
        activePlatform={activePlatform}
        sortOrder={sortOrder}
        onCategoryChange={setActiveCategory}
        onPlatformChange={setActivePlatform}
        onSortChange={setSortOrder}
      />
      <AppGrid apps={filteredAndSortedApps} showComingSoon={showComingSoon} />
    </>
  );
}
