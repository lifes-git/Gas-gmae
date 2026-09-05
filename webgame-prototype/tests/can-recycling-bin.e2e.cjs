const { chromium } = require("playwright");
const { pathToFileURL } = require("node:url");
const path = require("node:path");
const fs = require("node:fs");

const root = path.resolve(__dirname, "..");
const target = pathToFileURL(path.join(root, "index.html")).href;
const chromiumPath = [
  chromium.executablePath(),
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
].find(candidate => fs.existsSync(candidate));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: chromiumPath });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  page.setDefaultTimeout(7000);
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });

  await page.goto(target, { waitUntil: "load" });
  await page.getByRole("button", { name: "시작", exact: true }).click();
  await page.locator('[data-hazard="butane"]').click();
  await page.locator(".kitchen-detail-dialog .detail-target").click();
  await page.locator("#exit-door").click();
  await page.locator(".visual-butane-outdoor").waitFor();

  const bin = page.getByRole("button", { name: "캔 수거함: 잔여가스 제거 후 이용 가능" });
  assert(await bin.isDisabled(), "수거함은 잔여가스 제거 전에 잠겨 있어야 합니다.");

  const can = page.getByRole("button", { name: "부탄캔을 돌려 거꾸로 세우기" });
  await can.press("Enter");
  const nozzle = page.getByRole("button", { name: "부탄캔 노즐을 길게 누르기" });
  const nozzleBox = await nozzle.boundingBox();
  assert(nozzleBox, "노즐 조작 영역이 없습니다.");
  await page.mouse.move(nozzleBox.x + nozzleBox.width / 2, nozzleBox.y + nozzleBox.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(1000);
  await page.mouse.up();

  assert(!(await bin.isDisabled()), "잔여가스 제거 뒤 수거함이 활성화되지 않았습니다.");
  assert((await page.locator("#progress-text").textContent()).trim() === "0 / 3", "수거함 투입 전에 완료 처리되었습니다.");
  const geometry = await bin.evaluate(node => {
    const rect = node.getBoundingClientRect();
    const visual = document.querySelector(".visual-butane-outdoor").getBoundingClientRect();
    const can = document.querySelector(".mission-prop-butane-outdoor.is-ready-to-dispose").getBoundingClientRect();
    return {
      x: (rect.left + rect.width / 2 - visual.left) / visual.width,
      bottom: (rect.bottom - visual.top) / visual.height,
      overlapsCan: !(rect.right < can.left || rect.left > can.right || rect.bottom < can.top || rect.top > can.bottom)
    };
  });
  assert(Math.abs(geometry.x - .32) < .015, `수거함 x 좌표가 다릅니다: ${geometry.x}`);
  assert(Math.abs(geometry.bottom - .53) < .02, `수거함 하단 y 좌표가 다릅니다: ${geometry.bottom}`);
  assert(!geometry.overlapsCan, "수거함과 부탄캔이 겹칩니다.");
  assert((await page.locator("#mission-copy").textContent()).includes("지역"), "지역 분리배출 기준 안내가 없습니다.");
  await page.screenshot({ path: path.resolve(root, "../production/game/qa/screenshots/mission-butane-bin-ready.png") });

  await bin.click();
  assert(await page.locator(".mission-prop-butane-outdoor.is-disposing").isVisible(), "수거함 클릭 후 부탄캔 이동 애니메이션이 시작되지 않았습니다.");

  await page.getByText("1 / 3", { exact: true }).waitFor();
  assert(await page.locator(".can-recycling-bin.is-filled").isVisible(), "완료 뒤 수거함이 유지되지 않습니다.");
  assert(await page.locator(".can-bin-check").count() === 0, "완료 체크 표시는 생성하지 않아야 합니다.");
  assert(errors.length === 0, `브라우저 오류: ${errors.join(" | ")}`);
  await page.screenshot({ path: path.resolve(root, "../production/game/qa/screenshots/mission-butane-bin-complete.png") });

  const keyboardPage = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  keyboardPage.setDefaultTimeout(7000);
  await keyboardPage.goto(target, { waitUntil: "load" });
  await keyboardPage.getByRole("button", { name: "시작", exact: true }).press("Enter");
  await keyboardPage.locator('[data-hazard="butane"]').press("Enter");
  await keyboardPage.keyboard.press("Tab");
  const detailAction = keyboardPage.locator(".kitchen-detail-dialog .detail-action");
  await detailAction.waitFor({ state: "visible" });
  await detailAction.focus();
  await detailAction.press("Space");
  await keyboardPage.locator("#exit-door").press("Enter");
  await keyboardPage.getByRole("button", { name: "부탄캔을 돌려 거꾸로 세우기" }).press("Enter");
  await keyboardPage.keyboard.press("Tab");
  const fallback = keyboardPage.locator("#mission-actions .choice-button");
  await fallback.waitFor({ state: "visible" });
  await fallback.press("Enter");
  const keyboardBin = keyboardPage.getByRole("button", { name: "캔 수거함: 잔여가스 제거 후 이용 가능" });
  assert(!(await keyboardBin.isDisabled()), "키보드 대체 조작 뒤 수거함이 활성화되지 않았습니다.");
  await keyboardBin.press("Enter");
  await keyboardPage.getByText("1 / 3", { exact: true }).waitFor();
  await keyboardPage.close();

  await browser.close();
  console.log("E2E OK: can recycling bin lock, bottom anchor, no overlap, click, keyboard and completion");
})().catch(error => {
  console.error(error.stack || error);
  process.exit(1);
});
