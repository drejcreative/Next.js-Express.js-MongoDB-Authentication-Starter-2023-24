import { test, expect } from "@playwright/test";

test.describe("Auth page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/auth");
  });

  test("Login with non existing user", async ({ page }) => {
    await page.getByTestId("input-email").click();
    await page.getByTestId("input-email").fill("test@emai.com");
    await page.getByTestId("input-password").click();
    await page.getByTestId("input-password").fill("test12345");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(await page.getByText("Korisnik ne postoji")).toBeVisible();
  });
  test("Create user", async ({ page }) => {
    await page.getByText("Sign up").click();
    await page.getByTestId("input-email").click();
    await page.getByTestId("input-email").fill(`test${Date.now()}@emai.com`);
    await page
      .locator("div")
      .filter({ hasText: /^Your Name$/ })
      .nth(1)
      .click();
    await page.getByTestId("input-firstName").fill("Test");
    await page.getByTestId("input-lastName").click();
    await page.getByTestId("input-lastName").fill("Test");
    await page.getByTestId("input-password").click();
    await page.getByTestId("input-password").fill("test1234");
    await page.getByTestId("input-passwordRetype").click();
    await page.getByTestId("input-passwordRetype").fill("test123");
    await page.getByText("Sign inSign upEmailYour").click();
    await expect(await page.getByText("Passwords do not match")).toBeVisible();
    await page.getByTestId("input-passwordRetype").click();
    await page.getByTestId("input-passwordRetype").fill("test1234");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(
      await page.getByText("Email je poslat na vašu email")
    ).toBeVisible();
  });

  test("Reset password with not existing user", async ({ page }) => {
    await page.getByRole("link", { name: "Forgot password" }).click();
    await page.getByText("Enter your email and we will").waitFor();
    await page.getByTestId("input-email").click();
    await page.getByTestId("input-email").fill("test@test");
    await page
      .locator("div")
      .filter({ hasText: "Enter your email and we will" })
      .nth(2)
      .click();
    await page
      .getByRole("button", { name: "Send Reset password link test" })
      .click();
    await expect(await page.getByText("Invalid value")).toBeVisible();
    await page.getByTestId("input-email").click();
    await page.getByTestId("input-email").fill("test@test.com");
    await page
      .locator("div")
      .filter({ hasText: "Enter your email and we will" })
      .nth(2)
      .click();
    await page
      .getByRole("button", { name: "Send Reset password link test" })
      .click();
    await expect(
      await page.getByText("Korisnik sa ovom test@test.")
    ).toBeVisible();
  });
});
