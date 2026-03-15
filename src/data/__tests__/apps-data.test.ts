import { describe, it, expect } from "vitest";
import { getAllApps } from "@/lib/apps";

const apps = getAllApps();

describe("apps データ整合性", () => {
  it("全アプリの slug がユニークである", () => {
    const slugs = apps.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("全アプリが必須フィールドを持つ", () => {
    for (const app of apps) {
      expect(app.slug).toBeTruthy();
      expect(app.name).toBeTruthy();
      expect(app.category).toBeTruthy();
      expect(app.platforms.length).toBeGreaterThan(0);
    }
  });

  it("category は game または app のみ", () => {
    for (const app of apps) {
      expect(["game", "app"]).toContain(app.category);
    }
  });

  it("platforms の各値は web, ios, android のいずれか", () => {
    const validPlatforms = ["web", "ios", "android"];
    for (const app of apps) {
      for (const platform of app.platforms) {
        expect(validPlatforms).toContain(platform);
      }
    }
  });

  it("comingSoon: true のアプリが1件存在する", () => {
    const comingSoonApps = apps.filter((a) => a.comingSoon);
    expect(comingSoonApps).toHaveLength(1);
    expect(comingSoonApps[0].slug).toBe("memonow");
  });

  it("全アプリが storeLinksCard を持つ", () => {
    for (const app of apps) {
      expect(app.storeLinksCard.length).toBeGreaterThan(0);
    }
  });
});
