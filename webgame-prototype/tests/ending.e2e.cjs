const { chromium } = require("playwright");
const { pathToFileURL } = require("node:url");
const path = require("node:path");

const target = pathToFileURL(path.resolve(__dirname, "../index.html")).href;
const executablePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await chromium.launch({ headless:true, executablePath });
  const page = await browser.newPage({ viewport:{ width:1280, height:720 } });
  await page.goto(target, { waitUntil:"load" });
  await page.evaluate(() => window.GameEnding.show());
  await page.waitForTimeout(1700);
  assert(await page.locator(".result-stage-group").count() === 0, "ending must omit the duplicated stage summary cards");
  assert(await page.locator(".result-kicker").count() === 0, "ending must not render a redundant five-of-five kicker");
  assert((await page.locator(".result-message").textContent()).includes("귀가 후 안전 대응"), "ending must retain the concise completion message");
  const resultBackground = await page.locator("#result-screen").evaluate(node => getComputedStyle(node).backgroundImage);
  assert(resultBackground.includes("bg-outdoor-sunset-return-v1.jpg"), `ending must retain the sunset epilogue background: ${resultBackground}`);

  for (const viewport of [{ width:1280, height:720, name:"desktop" }, { width:844, height:390, name:"mobile" }]) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(120);
    const card = await page.locator("#result-screen .result-card").boundingBox();
    const mascot = await page.locator(".result-mascot-art").evaluate(node => ({
      naturalWidth:node.naturalWidth,
      naturalHeight:node.naturalHeight,
      opacity:getComputedStyle(node).opacity,
      display:getComputedStyle(node).display,
      rect:node.getBoundingClientRect().toJSON()
    }));
    assert(card && card.x >= -0.5 && card.y >= -0.5 && card.x + card.width <= viewport.width + .5 && card.y + card.height <= viewport.height + .5, `${viewport.name} ending must fit: ${JSON.stringify(card)}`);
    assert(mascot.naturalWidth === 612 && mascot.naturalHeight === 720 && mascot.display !== "none" && Number(mascot.opacity) > .9, `${viewport.name} mascot PNG must render: ${JSON.stringify(mascot)}`);
    if (process.env.QA_ENDING_DIR) await page.screenshot({ path:path.join(process.env.QA_ENDING_DIR, `ending-${viewport.name}.png`) });
  }

  await page.getByRole("button", { name:"안전수칙", exact:true }).click();
  assert(await page.locator("#rules-dialog").evaluate(dialog => dialog.open), "ending rules button must open the shared rules dialog");
  assert((await page.locator("#rules-dialog .rules-guidebook-art").getAttribute("src")).includes("rules-guidebook-summary-v1.png"), "shared rules dialog must use the transparent summary-guidebook artwork");
  assert(await page.locator("#rules-dialog .rules-guidebook-item").count() === 5, "shared rules dialog must present all five safety rules");
  const rulesFrame = await page.locator("#rules-dialog .rules-guidebook-frame").boundingBox();
  const rulesViewport = page.viewportSize();
  assert(rulesFrame && rulesFrame.x >= -.5 && rulesFrame.y >= -.5 && rulesFrame.x + rulesFrame.width <= rulesViewport.width + .5 && rulesFrame.y + rulesFrame.height <= rulesViewport.height + .5, `shared rules dialog must fit the viewport: ${JSON.stringify(rulesFrame)}`);
  await page.locator("#rules-dialog button[value=cancel]").click();
  await page.locator("#rules-dialog").waitFor({ state:"hidden" });
  await page.getByRole("button", { name:"다시하기" }).click();
  assert(await page.locator("#intro-screen").isVisible(), "ending restart must return to the intro");

  await browser.close();
  console.log("Ending visual and controls passed.");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
