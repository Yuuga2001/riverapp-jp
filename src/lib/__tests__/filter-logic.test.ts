import { describe, it, expect } from "vitest";
import { getAllApps } from "@/lib/apps";
import type { AppCategory, Platform } from "@/types/app";

// AppsContainer 内のフィルタロジックを再現
type CategoryFilter = "all" | AppCategory;
type PlatformFilter = "all" | Platform;

function filterApps(category: CategoryFilter, platform: PlatformFilter) {
  const apps = getAllApps();
  return apps.filter((app) => {
    const catMatch = category === "all" || app.category === category;
    const platMatch = platform === "all" || app.platforms.includes(platform);
    return catMatch && platMatch;
  });
}

function showComingSoon(category: CategoryFilter, platform: PlatformFilter) {
  return category === "all" && platform === "all";
}

describe("フィルタロジック", () => {
  it("all × all で全アプリが通過する", () => {
    const result = filterApps("all", "all");
    expect(result).toHaveLength(10);
  });

  it("game × all で game カテゴリのみ", () => {
    const result = filterApps("game", "all");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((a) => a.category === "game")).toBe(true);
  });

  it("app × all で app カテゴリのみ", () => {
    const result = filterApps("app", "all");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((a) => a.category === "app")).toBe(true);
  });

  it("all × ios で iOS 対応アプリのみ", () => {
    const result = filterApps("all", "ios");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((a) => a.platforms.includes("ios"))).toBe(true);
  });

  it("app × web で AND 条件成立", () => {
    const result = filterApps("app", "web");
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every(
        (a) => a.category === "app" && a.platforms.includes("web")
      )
    ).toBe(true);
  });

  it("game × android で HEXLIDE のみマッチ", () => {
    const result = filterApps("game", "android");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("hexlide");
  });

  it("comingSoon 表示は all × all の場合のみ", () => {
    expect(showComingSoon("all", "all")).toBe(true);
    expect(showComingSoon("game", "all")).toBe(false);
    expect(showComingSoon("all", "ios")).toBe(false);
    expect(showComingSoon("app", "web")).toBe(false);
  });
});
