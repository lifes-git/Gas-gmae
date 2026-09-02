const { chromium } = require("playwright");
const { pathToFileURL } = require("node:url");
const path = require("node:path");
const fs = require("node:fs");

const root = path.resolve(__dirname, "..");
const target = pathToFileURL(path.join(root, "index.html")).href;
const screenshots = path.resolve(root, "../production/game/qa/screenshots");
const chromiumPath = "/Users/worldbeseto/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
fs.mkdirSync(screenshots, { recursive: true });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForMissionArt(page) {
  await page.locator(".mission-prop").first().waitFor();
  await page.waitForFunction(() => Array.from(document.querySelectorAll(".mission-prop")).every(image => image.complete && image.naturalWidth > 0));
  await page.waitForTimeout(150);
}

async function start(page) {
  await page.goto(target, { waitUntil: "load" });
  await page.getByRole("button", { name: "점검 시작" }).click();
  await page.getByText("0 / 3", { exact: true }).waitFor();
}

async function solvedCount(page) {
  const text = await page.locator("#progress-text").textContent();
  return Number(text.match(/\d+/)[0]);
}

async function dragCenterTo(page, sourceSelector, targetSelector) {
  const source = await page.locator(sourceSelector).boundingBox();
  const target = await page.locator(targetSelector).boundingBox();
  assert(source && target, `drag geometry missing: ${sourceSelector} -> ${targetSelector}`);
  await page.mouse.move(source.x + source.width / 2, source.y + source.height / 2);
  await page.mouse.down();
  await page.mouse.move(target.x + target.width / 2, target.y + target.height / 2, { steps: 12 });
  await page.mouse.up();
}

async function revealKeyboardFallback(page) {
  await page.keyboard.press("Tab");
  await page.locator("#mission-actions").waitFor({ state: "visible" });
}

async function solveValve(page, keyboard = false, capture = false) {
  const before = await solvedCount(page);
  const open = page.locator(keyboard ? '[data-open-hazard="valve"]' : '[data-hazard="valve"]');
  if (keyboard) await open.press("Enter");
  else await open.click();
  await page.locator(".visual-valve").waitFor();
  await page.locator("#mission-dialog").waitFor({ state: "visible" });
  if (capture) { await waitForMissionArt(page); await page.screenshot({ path: path.join(screenshots, "mission-valve.png") }); }
  const correct = page.getByRole("button", { name: "가스밸브 잠그기" });
  if (keyboard) {
    await revealKeyboardFallback(page);
    await correct.press("Enter");
  } else {
    const valve = await page.locator(".mission-prop-valve").boundingBox();
    assert(valve, "valve geometry missing");
    await page.mouse.move(valve.x + valve.width / 2, valve.y + valve.height / 2);
    await page.mouse.down();
    await page.mouse.move(valve.x + valve.width / 2 + 150, valve.y + valve.height / 2, { steps: 10 });
    await page.mouse.up();
  }
  await page.getByText(`${before + 1} / 3`, { exact: true }).waitFor();
  await page.getByRole("button", { name: "방으로 돌아가기" }).click();
  await page.locator("#mission-dialog").waitFor({ state: "hidden" });
}

async function solveTowel(page, keyboard = false, capture = false) {
  const before = await solvedCount(page);
  const open = page.locator(keyboard ? '[data-open-hazard="towel"]' : '[data-hazard="towel"]');
  if (keyboard) await open.press("Enter");
  else await open.click();
  await page.locator(".visual-towel").waitFor();
  await page.locator("#mission-dialog").waitFor({ state: "visible" });
  if (capture) { await waitForMissionArt(page); await page.screenshot({ path: path.join(screenshots, "mission-towel.png") }); }
  const correct = page.getByRole("button", { name: "화기와 떨어진 보관 바구니" });
  if (keyboard) {
    await revealKeyboardFallback(page);
    await correct.press("Enter");
  } else {
    await dragCenterTo(page, ".mission-prop-towel", ".drop-zone-towel");
  }
  await page.getByText(`${before + 1} / 3`, { exact: true }).waitFor();
  await page.getByRole("button", { name: "방으로 돌아가기" }).click();
  await page.locator("#mission-dialog").waitFor({ state: "hidden" });
}

async function solveButane(page, keyboard = false, capture = false) {
  const before = await solvedCount(page);
  const open = page.locator(keyboard ? '[data-open-hazard="butane"]' : '[data-hazard="butane"]');
  if (keyboard) await open.press("Enter");
  else await open.click();
  await page.locator(".visual-butane").waitFor();
  await page.locator("#mission-dialog").waitFor({ state: "visible" });
  if (capture) { await waitForMissionArt(page); await page.screenshot({ path: path.join(screenshots, "mission-butane-indoor.png") }); }
  const outdoor = page.getByRole("button", { name: "통풍이 잘되는 실외 장소" });
  if (keyboard) {
    await revealKeyboardFallback(page);
    await outdoor.press("Enter");
  } else {
    await dragCenterTo(page, ".mission-prop-butane", ".drop-zone-butane");
  }
  await page.locator(".visual-butane-outdoor").waitFor();
  if (capture) {
    await page.locator(".visual-butane-outdoor").waitFor();
    await waitForMissionArt(page);
    await page.screenshot({ path: path.join(screenshots, "mission-butane-outdoor.png") });
  }
  const nozzle = page.getByRole("button", { name: "거꾸로 들고 노즐 눌러 제거하기" });
  if (keyboard) {
    await revealKeyboardFallback(page);
    await nozzle.press("Enter");
  } else {
    const focus = await page.locator(".nozzle-focus").boundingBox();
    assert(focus, "nozzle geometry missing");
    await page.mouse.move(focus.x + focus.width / 2, focus.y + focus.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(1000);
    await page.mouse.up();
  }
  await page.getByText(`${before + 1} / 3`, { exact: true }).waitFor();
  await page.getByRole("button", { name: "방으로 돌아가기" }).click();
  await page.locator("#mission-dialog").waitFor({ state: "hidden" });
}

async function fullFunctional(browserType, name) {
  const browser = await browserType.launch({ headless: true, executablePath: chromiumPath });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.setDefaultTimeout(5000);
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });

  await start(page);
  console.log(`${name}: started`);
  if (name === "chromium") {
    await page.screenshot({ path: path.join(screenshots, "desktop-initial.png") });
  }
  await solveValve(page, false, name === "chromium");
  console.log(`${name}: valve solved`);
  await solveTowel(page, false, name === "chromium");
  console.log(`${name}: towel solved`);
  await solveButane(page, false, name === "chromium");
  console.log(`${name}: butane solved`);
  const exit = page.locator("#exit-door");
  assert(await exit.isEnabled(), `${name}: exit should be enabled`);
  await page.screenshot({ path: path.join(screenshots, `${name}-complete.png`) });
  await exit.click();
  await page.getByRole("heading", { name: "외출 준비 완료!" }).waitFor();
  if (name === "chromium") await page.screenshot({ path: path.join(screenshots, "desktop-result.png") });
  assert(errors.length === 0, `${name}: browser errors: ${errors.join(" | ")}`);
  await browser.close();
}

async function keyboardFlow() {
  const browser = await chromium.launch({ headless: true, executablePath: chromiumPath });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.setDefaultTimeout(5000);
  page.on("pageerror", error => console.error("keyboard pageerror:", error.message));
  await start(page);
  await solveValve(page, true);
  await solveTowel(page, true);
  await solveButane(page, true);
  const exit = page.locator("#exit-door");
  await exit.focus();
  await page.keyboard.press("Enter");
  await page.getByRole("heading", { name: "외출 준비 완료!" }).waitFor();
  await browser.close();
}

async function mobileFlow() {
  const browser = await chromium.launch({ headless: true, executablePath: chromiumPath });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  page.setDefaultTimeout(5000);
  await page.goto(target, { waitUntil: "load" });
  await page.locator("#rotate-screen").waitFor({ state: "visible" });
  await page.screenshot({ path: path.join(screenshots, "mobile-portrait-rotate.png") });
  await page.setViewportSize({ width: 844, height: 390 });
  await page.locator("#rotate-screen").waitFor({ state: "hidden" });
  await page.getByRole("button", { name: "점검 시작" }).click();
  await page.getByText("0 / 3", { exact: true }).waitFor();
  await page.screenshot({ path: path.join(screenshots, "mobile-landscape-initial.png") });
  await solveTowel(page);
  await solveValve(page);
  await solveButane(page);
  await page.locator("#exit-door").click();
  await page.getByRole("heading", { name: "외출 준비 완료!" }).waitFor();
  await page.screenshot({ path: path.join(screenshots, "mobile-landscape-result.png") });
  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  assert(!horizontalOverflow, "mobile: horizontal overflow detected");
  await browser.close();
}

(async () => {
  await fullFunctional(chromium, "chromium");
  await keyboardFlow();
  await mobileFlow();
  console.log("E2E OK: Chromium desktop, keyboard-only, mobile touch profile");
})().catch(error => {
  console.error(error.stack || error);
  process.exit(1);
});
