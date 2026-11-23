import AxeBuilder from "@axe-core/playwright";
import { expect, test, type APIRequestContext, type Page } from "@playwright/test";
import { randomUUID } from "node:crypto";

const getEmail = (domain = "example.test") => `${randomUUID()}@${domain}`;
const emailInput = (page: Page) => page.getByRole("textbox", { name: "Email address" });
const modelInput = (page: Page) => page.getByRole("textbox", { name: /racket brand and model/i });
const priceSelect = (page: Page) => page.getByRole("combobox", { name: /how likely would you be to buy at \$49/i });
const pilotConsent = (page: Page) => page.getByRole("checkbox", { name: /email me about my pilot response/i });
const updatesConsent = (page: Page) => page.getByRole("checkbox", { name: /product updates/i });
const submit = (page: Page) => page.getByRole("button", { name: "Submit pilot interest" });

async function fillRequired(page: Page, email: string) {
  await emailInput(page).fill(email);
  await priceSelect(page).selectOption("maybe");
  await pilotConsent(page).check();
}

async function savedResponses(request: APIRequestContext, email: string) {
  const response = await request.get("http://127.0.0.1:54331/__test/responses", {
    headers: { apikey: "sb_secret_playwright_fixture_only" },
  });
  expect(response.ok()).toBeTruthy();
  const rows: { email: string }[] = await response.json();
  return rows.filter((row) => row.email === email.toLowerCase());
}

async function expectNoHorizontalOverflow(page: Page) {
  const actual = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(actual.content).toBeLessThanOrEqual(actual.viewport);
}

test("landing explains the concept and offers an accessible pilot path", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Your racket\.\s*Your grip\./);
  await expect(page.getByText("$49", { exact: true })).toBeVisible();
  await expect(page.getByText("Proposed starting price", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("Product concept illustration", { exact: true })).toBeVisible();
  const illustration = page.getByRole("img", { name: /exploded concept drawing/i });
  await expect(illustration).toBeVisible();
  await expect.poll(() => illustration.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBeTruthy();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath("landing.png"), fullPage: true });

  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();

  const fit = page.getByText("Will it fit my racket?", { exact: true });
  await fit.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText(/compatibility is unconfirmed until your specific racket-handle profile/i)).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);

  await page.getByRole("link", { name: "Join the pilot" }).first().click();
  await expect(page).toHaveURL(/\/pilot$/);
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath("pilot.png"), fullPage: true });
});

test("invalid answers produce focused, linked errors and preserve other fields", async ({ page, request }) => {
  const email = getEmail();
  await page.goto("/pilot");
  await emailInput(page).fill(email);
  await modelInput(page).fill("Demo racket");
  await updatesConsent(page).check();
  await submit(page).focus();
  await page.keyboard.press("Enter");

  const summary = page.getByRole("region", { name: "Check the highlighted fields and try again." });
  await expect(summary).toBeFocused();
  await expect(priceSelect(page)).toHaveAttribute("aria-invalid", "true");
  await expect(pilotConsent(page)).toHaveAccessibleDescription(/give permission/i);
  await expect(modelInput(page)).toHaveValue("Demo racket");
  await expect(updatesConsent(page)).toBeChecked();
  expect(await savedResponses(request, email)).toHaveLength(0);
  await page.keyboard.press("Tab");
  await expect(summary.getByRole("link", { name: "Interest at the proposed price" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(priceSelect(page)).toBeFocused();

  await emailInput(page).fill("not-an-email");
  await submit(page).click();
  await expect(emailInput(page)).toHaveAccessibleDescription("Enter a valid email address.");
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
});

test("success means a stored response and a duplicate cannot change consent", async ({ page, request, context }) => {
  const email = getEmail();
  await page.goto("/thank-you");
  await expect(page).toHaveURL(/\/pilot$/);
  await expect(updatesConsent(page)).not.toBeChecked();
  await fillRequired(page, email.toUpperCase());
  await modelInput(page).fill("  First racket  ");
  await submit(page).click();
  await expect(page).toHaveURL(/\/thank-you$/);
  await expect(page.getByRole("heading", { name: "Thanks for your interest." })).toBeVisible();
  const cookies = await context.cookies();
  expect(cookies).toEqual([expect.objectContaining({ name: "griplab_pilot_received", path: "/thank-you", secure: true, httpOnly: true })]);

  await page.goto("/pilot");
  await fillRequired(page, email);
  await updatesConsent(page).check();
  await modelInput(page).fill("Other racket");
  await submit(page).click();
  await expect(page).toHaveURL(/\/thank-you$/);
  expect(await savedResponses(request, email)).toEqual([expect.objectContaining({
    email, racket_model: "First racket", price_shown_cents: 4900, price_interest: "maybe",
    pilot_consent_version: "pilot-v1", pilot_consent_at: expect.any(String),
    updates_consent_version: null, updates_consent_at: null,
  })]);
});

test("a failed storage request keeps the response editable and permits retry", async ({ page, request }) => {
  const email = getEmail("retry.example.test");
  await page.goto("/pilot");
  await fillRequired(page, email);
  await updatesConsent(page).check();
  await submit(page).click();
  await expect(page.getByRole("region", { name: /we couldn’t save your response/i })).toBeFocused();
  await expect(page).toHaveURL(/\/pilot$/);
  await expect(emailInput(page)).toHaveValue(email);
  await expect(pilotConsent(page)).toBeChecked();
  await expect(updatesConsent(page)).toBeChecked();
  expect(await savedResponses(request, email)).toHaveLength(0);
  await submit(page).click();
  await expect(page).toHaveURL(/\/thank-you$/);
  expect(await savedResponses(request, email)).toEqual([expect.objectContaining({
    updates_consent_version: "updates-v1", updates_consent_at: expect.any(String),
  })]);
});

test("privacy and terms mark unresolved policy choices for founder review", async ({ page }) => {
  await page.goto("/pilot");
  await page.getByRole("link", { name: "pilot privacy notice" }).click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.getByRole("heading", { name: "GripLab pilot privacy notice" })).toBeVisible();
  await expect(page.getByText(/founder-review draft/i)).toBeVisible();
  await page.getByRole("navigation", { name: "Footer" }).getByRole("link", { name: "Terms" }).click();
  await expect(page).toHaveURL(/\/terms$/);
  await expect(page.getByText(/founder-review draft/i)).toBeVisible();
});

test.describe("with JavaScript disabled", () => {
  test.use({ javaScriptEnabled: false });

  test("can fix an invalid response and complete the form", async ({ page, request }) => {
    const email = getEmail();
    await page.goto("/pilot");
    await emailInput(page).fill(email);
    await submit(page).click();
    await expect(page.getByRole("region", { name: "Check the highlighted fields and try again." })).toBeVisible();
    await expect(emailInput(page)).toHaveValue(email);
    await priceSelect(page).selectOption("maybe");
    await pilotConsent(page).check();
    await submit(page).click();
    await expect(page).toHaveURL(/\/thank-you$/);
    expect(await savedResponses(request, email)).toHaveLength(1);
  });
});
