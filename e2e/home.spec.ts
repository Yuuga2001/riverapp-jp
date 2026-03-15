import { test, expect } from "@playwright/test";

test.describe("トップページ", () => {
  test("ページが表示され、Hero セクションが見える", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/riverapp\.jp/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("アプリ一覧に10件のカードが表示される", async ({ page }) => {
    await page.goto("/");
    // 各カードにはアプリ名のテキストが含まれる
    const cards = page.locator('[class*="animate-fade-up-card"]');
    // comingSoon プレースホルダーを含めて11件
    await expect(cards).toHaveCount(11);
  });

  test("カテゴリフィルタ「ゲーム」でフィルタリングされる", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByText("ゲーム", { exact: true }).click();

    // game カテゴリのアプリは表示される
    await expect(page.getByText("HEXLIDE", { exact: true })).toBeVisible();
    // app カテゴリのアプリは非表示
    await expect(page.getByText("SakaMap", { exact: true })).not.toBeVisible();
  });

  test("プラットフォームフィルタ「iOS」でフィルタリングされる", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByText("iOS", { exact: true }).click();

    await expect(page.getByText("HEXLIDE", { exact: true })).toBeVisible();
    await expect(page.getByText("SakaMap", { exact: true })).toBeVisible();
    await expect(page.getByText("TileOut", { exact: true })).not.toBeVisible();
  });

  test("アプリカードクリックで詳細ページに遷移する", async ({ page }) => {
    await page.goto("/");
    // HEXLIDE カードをクリック（ストアリンク以外の部分）
    await page.getByText("HEXLIDE").first().click();
    await expect(page).toHaveURL(/\/apps\/hexlide/);
  });

  test("ナビゲーションバーとフッターが表示される", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});
