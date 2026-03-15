"use client";

import { useState } from "react";
import type { App, AppCategory, Platform } from "@/types/app";
import { FilterSection } from "./FilterSection";
import { AppGrid } from "./AppGrid";

type CategoryFilter = "all" | AppCategory;
type PlatformFilter = "all" | Platform;

interface AppsContainerProps {
  apps: App[];
}

export function AppsContainer({ apps }: AppsContainerProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [activePlatform, setActivePlatform] = useState<PlatformFilter>("all");

  const filteredApps = apps.filter((app) => {
    const catMatch =
      activeCategory === "all" || app.category === activeCategory;
    const platMatch =
      activePlatform === "all" || app.platforms.includes(activePlatform);
    return catMatch && platMatch;
  });

  const showComingSoon =
    activeCategory === "all" && activePlatform === "all";

  return (
    <>
      <FilterSection
        activeCategory={activeCategory}
        activePlatform={activePlatform}
        onCategoryChange={setActiveCategory}
        onPlatformChange={setActivePlatform}
      />
      <AppGrid apps={filteredApps} showComingSoon={showComingSoon} />
    </>
  );
}
