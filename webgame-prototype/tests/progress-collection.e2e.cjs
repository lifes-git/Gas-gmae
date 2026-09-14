const { chromium } = require("playwright");
const { pathToFileURL } = require("node:url");
const path = require("node:path");

const target = pathToFileURL(path.resolve(__dirname, "../index.html")).href;
const executablePath = process.env.CHROME_PATH || (process.platform === "win32"
  ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function drag(page, selector, fromX, toX) {
  const box = await page.locator(selector).boundingBox();
  assert(box, `${selector}: geometry missing`);
  await page.mouse.move(box.x + box.width * fromX, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * toX, box.y + box.height / 2, { steps:12 });
  await page.mouse.up();
}

(async () => {
  const browser = await chromium.launch({ headless:true, executablePath });
  const page = await browser.newPage({ viewport:{ width:1280, height:720 } });
  await page.goto(target, { waitUntil:"load", timeout:15000 });
  await page.getByRole("button", { name:"시작", exact:true }).click();
  const desktopSlots = await page.locator("#progress-dots .progress-slot").evaluateAll(nodes => nodes.map(node => {
    const rect = node.getBoundingClientRect();
    return { width:rect.width, height:rect.height };
  }));
  assert(desktopSlots.every(slot => slot.width === 52 && slot.height === 52), `desktop slots must remain circular and uncompressed: ${JSON.stringify(desktopSlots)}`);
  const stageOneHeaderOrder = await page.evaluate(() => {
    const progress = document.querySelector("#app .progress-card").getBoundingClientRect();
    const settings = document.getElementById("settings-button").getBoundingClientRect();
    return { progressRight:progress.right, settingsLeft:settings.left, gap:settings.left - progress.right };
  });
  assert(stageOneHeaderOrder.progressRight < stageOneHeaderOrder.settingsLeft && stageOneHeaderOrder.gap >= 8, `stage 1 progress must sit left of settings: ${JSON.stringify(stageOneHeaderOrder)}`);
  const stageOneHeights = await page.evaluate(() => ({
    progress:document.querySelector("#app .progress-card").getBoundingClientRect().height,
    settings:document.getElementById("settings-button").getBoundingClientRect().height
  }));
  assert(Math.abs(stageOneHeights.progress - stageOneHeights.settings) < .5, `stage 1 progress and settings heights must match: ${JSON.stringify(stageOneHeights)}`);
  const cardFit = await page.evaluate(() => {
       const card = document.querySelector("#app .progress-card").getBoundingClientRect();
    const slots = Array.from(document.querySelectorAll("#progress-dots .progress-slot")).map(node => node.getBoundingClientRect());
    return { card, first:slots[0], last:slots[slots.length - 1] };
  });
  assert(cardFit.first.left >= cardFit.card.left && cardFit.last.right <= cardFit.card.right, `progress card must contain all slots: ${JSON.stringify(cardFit)}`);
  const progressBounds = await page.locator("#app .progress-card").evaluate(card => {
    const cardRect = card.getBoundingClientRect();
    const slotsRect = card.querySelector(".progress-collection").getBoundingClientRect();
    return { cardRight:cardRect.right, slotsRight:slotsRect.right, cardWidth:cardRect.width };
  });
  assert(progressBounds.cardRight >= progressBounds.slotsRight, `progress card must contain every slot: ${JSON.stringify(progressBounds)}`);
  const kitchen = page.getByRole("button", { name:"주방으로 이동" });
  if (await kitchen.isVisible()) await kitchen.click();
  await page.locator('[data-hazard="valve"]').click();
  await page.locator(".kitchen-detail-dialog[open]").waitFor({ state:"visible" });
  await drag(page, ".kitchen-detail-dialog[open] .detail-target", .72, .08);
  await page.getByRole("button", { name:"확인했어요" }).click();
  await page.locator('[data-progress-item="valve"].is-collected').waitFor();
  assert((await page.locator('[data-progress-item="valve"] img').getAttribute("src")).includes("result-valve-integrated-v1.png"), "stage 1 valve slot and result recap must use the same integrated valve asset");
  assert(await page.locator(".kitchen-detail-dialog[open]").count() === 0, "stage 1 interaction modal should close before collection");

  await page.evaluate(() => {
    document.getElementById("app").hidden = true;
    document.getElementById("intro-screen").hidden = true;
    window.StageTwo.reset();
    window.StageTwo.show();
  });
  await page.waitForTimeout(1000);
  const stageTwoHeaderOrder = await page.evaluate(() => {
    const progress = document.querySelector("#stage-two .progress-card").getBoundingClientRect();
    const settings = document.getElementById("stage-two-settings-button").getBoundingClientRect();
    return { progressRight:progress.right, settingsLeft:settings.left, gap:settings.left - progress.right, viewportWidth:innerWidth, settingsRight:settings.right };
  });
  assert(stageTwoHeaderOrder.progressRight < stageTwoHeaderOrder.settingsLeft && stageTwoHeaderOrder.gap >= 8, `stage 2 progress must sit left of settings: ${JSON.stringify(stageTwoHeaderOrder)}`);
  assert(stageTwoHeaderOrder.settingsRight <= stageTwoHeaderOrder.viewportWidth, `stage 2 header must stay inside viewport: ${JSON.stringify(stageTwoHeaderOrder)}`);
  const stageTwoHeights = await page.evaluate(() => ({
    progress:document.querySelector("#stage-two .progress-card").getBoundingClientRect().height,
    settings:document.getElementById("stage-two-settings-button").getBoundingClientRect().height
  }));
  assert(Math.abs(stageTwoHeights.progress - stageTwoHeights.settings) < .5, `stage 2 progress and settings heights must match: ${JSON.stringify(stageTwoHeights)}`);
  assert((await page.locator(".stage-two__background--living").getAttribute("src")).includes("bg-stage2-living-sunset-windowless-v1.jpg"), "stage 2 living room must use the windowless layered background");
  assert((await page.locator("#stage-two-window-art").getAttribute("src")).includes("prop-window-casement-wall-perspective-closed-v4.png"), "stage 2 must begin with the closed shared window layer");
  await page.locator("#stage-two-window-hotspot").click();
  assert((await page.locator("#stage-two-window-target").getAttribute("aria-label")) === "창문 중앙 손잡이를 눌러 열기", "window interaction must identify the handle action");
  assert(await page.locator("#stage-two-window-action").count() === 0, "window modal must not duplicate the interaction with a text action button");
  assert(await page.locator(".stage-two-window-handle-art").count() === 0, "window modal must not use a detached handle overlay");
  assert(await page.locator(".stage-two-window-handle-label").count() === 1, "window modal must show the approved handle cue");
  const windowBox = await page.locator("#stage-two-window-target").boundingBox();
  assert(windowBox && windowBox.width >= 44 && windowBox.height >= 44, `full window target must remain touch accessible: ${JSON.stringify(windowBox)}`);
  if (process.env.QA_SCREENSHOT) await page.screenshot({ path:process.env.QA_SCREENSHOT });
  await page.locator("#stage-two-window-target").click({ force:true });
  await page.locator("#stage-two-window-close").click();
  await page.waitForTimeout(450);
  assert((await page.locator("#stage-two-window-art").getAttribute("src")).includes("prop-window-casement-wall-perspective-closed-v4.png"), "closing during the handle response must keep the closed window layer");
  await page.locator("#stage-two-window-hotspot").click();
  await page.locator("#stage-two-window-target").click({ force:true });
  await page.waitForTimeout(450);
  assert((await page.locator("#stage-two-window-art").getAttribute("src")).includes("prop-window-casement-wall-perspective-open-v4.png"), "opening must switch to the shared open-window layer");
  await page.getByRole("button", { name:"확인했어요" }).click();
  await page.locator('#stage-two [data-progress-item="window"].is-collected').waitFor();
  assert((await page.locator('#stage-two [data-progress-item="window"] img').getAttribute("src")).includes("progress-window-open-v1.png"), "stage 2 progress slot must use the open-window PNG");
  assert(await page.locator("#stage-two-window-dialog").isHidden(), "stage 2 interaction modal should close before collection");
  if (process.env.QA_PROGRESS_SCREENSHOT) await page.screenshot({ path:process.env.QA_PROGRESS_SCREENSHOT });
  await browser.close();
  console.log("Progress collection flow passed.");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
