import { test, expect } from "@playwright/test";
import { getAppSlugs } from "../src/lib/apps";

test.describe("ナビゲーション", () => {
  test("トップ → 詳細 → パンくずでトップに戻る", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/riverapp\.jp/);

    // 詳細ページに遷移
    await page.getByText("HEXLIDE").first().click();
    await expect(page).toHaveURL(/\/apps\/hexlide/);
    await expect(
      page.getByRole("heading", { name: "HEXLIDE" })
    ).toBeVisible();

    // パンくずでトップに戻る
    await page.getByText("トップ").click();
    await expect(page).toHaveURL("/");
  });

  test("全アプリ詳細ページが正常に表示される", async ({ page }) => {
    const slugs = getAppSlugs();
    for (const slug of slugs) {
      const response = await page.goto(`/apps/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
    }
  });

  test("モバイルビューポートでナビゲーションが正しく表示される", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.getByRole("link", { name: "apps" })).toBeVisible();
    await expect(page.getByRole("link", { name: "about" })).toBeVisible();
  });
});
