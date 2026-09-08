const { chromium } = require("playwright");
const { pathToFileURL } = require("node:url");
const path = require("node:path");
const fs = require("node:fs");

const root = path.resolve(__dirname, "..");
const target = pathToFileURL(path.join(root, "index.html")).href;
const screenshots = path.resolve(root, "../production/game/qa/screenshots");
const executablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function openTransition(page) {
  await page.goto(target, { waitUntil: "load" });
  await page.getByRole("button", { name: "시작", exact: true }).click();
  await page.locator("#exit-door").evaluate(button => { button.disabled = false; });
  await page.locator("#exit-door").focus();
  await page.keyboard.press("Enter");
  await page.locator("#outing-transition").waitFor({ state: "visible" });
  await page.waitForTimeout(900);
}

async function inspectTransition(page, label) {
  const state = await page.evaluate(() => {
    const viewport = { width: innerWidth, height: innerHeight };
    const screen = document.getElementById("outing-transition").getBoundingClientRect();
    const skip = document.getElementById("outing-transition-skip").getBoundingClientRect();
    return {
      viewport,
      screen: { left: screen.left, top: screen.top, right: screen.right, bottom: screen.bottom },
      skip: { left: skip.left, top: skip.top, right: skip.right, bottom: skip.bottom },
      title: document.getElementById("outing-transition-title").textContent,
      hasStageMessage: Boolean(document.getElementById("outing-transition-message")),
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight
    };
  });
  assert(state.title === "며칠 후…", `${label}: title mismatch`);
  assert(!state.hasStageMessage, `${label}: stage-start message should be absent`);
  assert(state.screen.left === 0 && state.screen.top === 0 && state.screen.right === state.viewport.width && state.screen.bottom === state.viewport.height, `${label}: cinematic does not fill viewport`);
  assert(state.skip.left >= 0 && state.skip.top >= 0 && state.skip.right <= state.viewport.width && state.skip.bottom <= state.viewport.height, `${label}: skip button clipped`);
  assert(state.scrollWidth <= state.viewport.width + 1 && state.scrollHeight <= state.viewport.height + 1, `${label}: viewport overflow`);
}

(async () => {
  fs.mkdirSync(screenshots, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath });

  const desktop = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await openTransition(desktop);
  await inspectTransition(desktop, "desktop");
  await desktop.screenshot({ path: path.join(screenshots, "outing-transition-desktop-departure.png") });
  await desktop.waitForTimeout(1100);
  const timeCopyOpacity = await desktop.locator("#outing-transition-title").evaluate(node => Number(getComputedStyle(node).opacity));
  assert(timeCopyOpacity > .5, "desktop: elapsed-time title should be clearly visible");
  await desktop.screenshot({ path: path.join(screenshots, "outing-transition-desktop-time.png") });
  await desktop.waitForTimeout(2000);
  await desktop.screenshot({ path: path.join(screenshots, "outing-transition-desktop-return.png") });
  await desktop.getByRole("button", { name: "건너뛰기" }).click();
  await desktop.getByRole("heading", { name: "스테이지 2 안전한 귀가" }).waitFor();
  assert(await desktop.locator("#stage-two").isVisible(), "desktop: stage 2 must start after transition");
  await desktop.screenshot({ path: path.join(screenshots, "stage2-desktop-living.png") });
  await desktop.getByRole("button", { name: "주방으로 이동" }).click();
  assert(await desktop.locator("#stage-two-frame").getAttribute("data-room") === "kitchen", "desktop: stage 2 kitchen navigation failed");
  await desktop.waitForTimeout(380);
  await desktop.screenshot({ path: path.join(screenshots, "stage2-desktop-kitchen.png") });
  await desktop.getByRole("button", { name: "거실로 이동" }).click();
  assert(await desktop.locator("#stage-two-frame").getAttribute("data-room") === "living", "desktop: stage 2 living navigation failed");

  const mobile = await browser.newPage({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true });
  await openTransition(mobile);
  await inspectTransition(mobile, "mobile landscape");
  await mobile.screenshot({ path: path.join(screenshots, "outing-transition-mobile-departure.png") });
  await mobile.waitForTimeout(3600);
  await mobile.screenshot({ path: path.join(screenshots, "outing-transition-mobile-return.png") });
  await mobile.getByRole("heading", { name: "스테이지 2 안전한 귀가" }).waitFor({ timeout: 5000 });
  assert(await mobile.locator("#stage-two").isVisible(), "mobile: stage 2 must start after transition");
  await mobile.screenshot({ path: path.join(screenshots, "stage2-mobile-living.png") });

  await browser.close();
  console.log("Outing transition E2E OK: stage 2 starts and room navigation works on desktop/mobile");
})().catch(error => {
  console.error(error.stack || error);
  process.exit(1);
});
