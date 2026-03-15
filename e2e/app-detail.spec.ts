import { test, expect } from "@playwright/test";

test.describe("アプリ詳細ページ", () => {
  test("HEXLIDE の詳細が正しく表示される", async ({ page }) => {
    await page.goto("/apps/hexlide");
    await expect(page.getByRole("heading", { name: "HEXLIDE" })).toBeVisible();
    await expect(page.getByText("六角形グリッドの対戦ボードゲーム")).toBeVisible();
  });

  test("パンくずリストからホームに戻れる", async ({ page }) => {
    await page.goto("/apps/hexlide");
    await page.getByText("トップ").click();
    await expect(page).toHaveURL("/");
  });

  test("ストアリンクが表示される", async ({ page }) => {
    await page.goto("/apps/hexlide");
    await expect(page.getByText("App Store").first()).toBeVisible();
    await expect(page.getByText("Google Play").first()).toBeVisible();
    await expect(page.getByText("Webアプリ").first()).toBeVisible();
  });

  test("存在しない slug で 404 が表示される", async ({ page }) => {
    const response = await page.goto("/apps/nonexistent");
    expect(response?.status()).toBe(404);
  });
});
