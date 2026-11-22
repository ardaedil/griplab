import { defineConfig, devices } from "@playwright/test";

const appUrl = "http://localhost:3400";
const databaseFixture = "http://127.0.0.1:54331";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  workers: 2,
  reporter: "list",
  use: { baseURL: appUrl, trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: [
    { command: "node tests/support/supabase-fixture.mjs", url: `${databaseFixture}/health`, reuseExistingServer: false },
    {
      command: "node node_modules/next/dist/bin/next start --hostname localhost --port 3400",
      url: appUrl,
      reuseExistingServer: false,
      env: { SUPABASE_URL: databaseFixture, SUPABASE_SECRET_KEY: "sb_secret_playwright_fixture_only" },
    },
  ],
});
