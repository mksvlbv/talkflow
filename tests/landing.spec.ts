import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("renders hero section with title and CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Raw thought");
    await expect(page.locator("h1")).toContainText("Refined structure");
    await expect(page.getByRole("link", { name: /start flowing/i })).toBeVisible();
  });

  test("renders navigation with TalkFlow branding", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header")).toContainText("TALKFLOW");
    await expect(page.getByRole("link", { name: /pricing/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /engine/i }).first()).toBeVisible();
  });

  test("renders all major sections", async ({ page }) => {
    await page.goto("/");

    // Product demo section (3-col pipeline)
    await expect(page.getByText("Raw Audio Input")).toBeVisible();
    await expect(page.getByText("Structured Outputs").first()).toBeVisible();

    // Process pipeline
    await expect(page.getByText("Three steps. Zero friction.")).toBeVisible();
    await expect(page.getByText("01 / CAPTURE")).toBeVisible();
    await expect(page.getByText("02 / ANALYZE")).toBeVisible();
    await expect(page.getByText("03 / SYNTHESIZE")).toBeVisible();

    // Feature depth (transcription + gen preview)
    await expect(page.getByText("01 / Real-time Capture")).toBeVisible();
    await expect(page.getByText("02 / Generated Content")).toBeVisible();

    // Use case demo (2-col with connector)
    await expect(page.getByText("01 / Raw Audio Capture")).toBeVisible();
    await expect(page.getByText("02 / Structured Outputs")).toBeVisible();

    // Pricing
    await expect(page.getByText("Scale your output.").first()).toBeVisible();
    await expect(page.getByText("Starter")).toBeVisible();
    await expect(page.getByText("Pro Pipeline").first()).toBeVisible();

    // CTA
    await expect(page.getByText("Start creating content")).toBeVisible();

    // Footer
    await expect(page.locator("footer")).toContainText("TALKFLOW");
  });

  test("pricing section has correct tier details", async ({ page }) => {
    await page.goto("/#pricing");
    await expect(page.getByText("Free").first()).toBeVisible();
    await expect(page.getByText("$19")).toBeVisible();
    await expect(page.getByText("Unlimited Voice Capture")).toBeVisible();
    await expect(page.getByText("Priority Processing")).toBeVisible();
  });
});

test.describe("Demo Page", () => {
  test("renders demo interface with input and output panels", async ({ page }) => {
    await page.goto("/demo");
    await expect(page.locator("h1")).toContainText("engine");
    await expect(page.getByPlaceholder(/paste your raw/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /generate/i })).toBeVisible();
  });
});

test.describe("Responsive", () => {
  test("mobile: landing shows hamburger menu", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile only");
    await page.goto("/");
    await expect(page.getByLabel("Toggle menu")).toBeVisible();
  });

  test("mobile: hero section is readable", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile only");
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: /start flowing/i })).toBeVisible();
  });

  test("desktop: navigation links are visible", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop only");
    await page.goto("/");
    await expect(page.getByRole("link", { name: /pricing/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /engine/i }).first()).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("sign-in page loads", async ({ page }) => {
    await page.goto("/sign-in");
    await expect(page.getByText("Sign in to your")).toBeVisible();
  });

  test("sign-up page loads", async ({ page }) => {
    await page.goto("/sign-up");
    await expect(page.getByText("Create your")).toBeVisible();
  });

  test("pricing page loads", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.locator("h1")).toContainText("Scale your output");
  });

  test("404 page works", async ({ page }) => {
    await page.goto("/nonexistent-page-xyz");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("Page not found")).toBeVisible();
  });
});
