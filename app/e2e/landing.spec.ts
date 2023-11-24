import { test, expect } from "@playwright/test";

test.describe("Laning page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:3000");
  });
  test("Protected page redirect", async ({ page }) => {
    await page.getByRole("link", { name: "Protected" }).click();
    await expect(
      await page.getByRole("heading", { name: "Sign in" })
    ).toBeVisible();
  });

  test("Go to Login page", async ({ page }) => {
    await page.getByRole("link", { name: "Sign in" }).click();
    await expect(
      await page.getByRole("heading", { name: "Sign in" })
    ).toBeVisible();
  });
});
