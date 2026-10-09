const assert = require("node:assert/strict");
const { pathToFileURL } = require("node:url");
const path = require("node:path");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH });
  try {
    for (const locale of ["pt", "en"]) {
      const context = await browser.newContext({ colorScheme: "dark", locale });
      await context.addInitScript(() => localStorage.setItem("preferred-language", "pt"));
      const page = await context.newPage();
      const file = locale === "pt" ? "index.html" : "en-us/index.html";
      await page.goto(pathToFileURL(path.resolve(__dirname, "..", file)).href);
      await page.evaluate(() => document.fonts.ready);
      const toggle = page.locator("[data-theme-toggle]");
      assert.equal(await toggle.count(), 1, "Theme button must exist in both languages");
      assert.equal(await toggle.getAttribute("aria-pressed"), "true");
      await toggle.click();
      assert.equal(await toggle.getAttribute("aria-pressed"), "false");
      assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), "rgb(255, 255, 255)");
      await page.reload();
      assert.equal(await toggle.getAttribute("aria-pressed"), "false", "Explicit light theme must survive reload on a dark system");
      await toggle.click();
      assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), "rgb(16, 20, 22)");
      await page.reload();
      assert.equal(await toggle.getAttribute("aria-pressed"), "true");
      assert.deepEqual(await page.locator(".research-project-row").evaluateAll(rows => rows.map(row => row.href)), [
        "https://diegopn.github.io/ovenbird-site/",
        "https://diegopn.github.io/github-ai-ml-privacy-documentation-gdpr/",
        "https://diegopn.github.io/msr-oss-privacy-legislation-ai-ml-gh-hf/",
      ]);
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.waitForFunction(() => getComputedStyle(document.querySelector("#main-nav")).visibility === (innerWidth <= 1100 ? "hidden" : "visible"));
        assert.ok(await page.evaluate(() => {
          const header = document.querySelector("[data-header]");
          const children = [...header.children].filter(el => getComputedStyle(el).visibility !== "hidden");
          return children.every((el, i) => {
            const rect = el.getBoundingClientRect();
            return rect.left >= 0 && rect.right <= innerWidth && (!i || rect.left >= children[i - 1].getBoundingClientRect().right);
          });
        }), `Header must fit without overlap at ${width}px (${locale})`);
      }
      await page.setViewportSize({ width: 390, height: 900 });
      await page.locator("[data-menu-toggle]").click();
      assert.equal(await page.locator("[data-menu-toggle]").getAttribute("aria-expanded"), "true");
      await page.locator('[data-nav-link][href="#pesquisa"]').click();
      assert.equal(await page.locator("[data-menu-toggle]").getAttribute("aria-expanded"), "false");
      await context.close();
    }
    console.log("Theme persistence, project order, and responsive navigation passed in PT and EN.");
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
