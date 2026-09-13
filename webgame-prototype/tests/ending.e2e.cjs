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
  assert(await page.locator(".result-item-icon").count() === 5, "ending stage groups must recap all five completed items with PNG artwork");
  assert((await page.locator(".result-item-icon--valve").getAttribute("src")).includes("result-valve-integrated-v1.png"), "ending valve and expert-inspection pipe must share the integrated pipe art family");
  assert(await page.locator(".result-checklist li.is-caution").count() === 0, "all five ending items, including the expert inspection request, must be marked complete");
  assert(await page.locator(".result-kicker").count() === 0, "ending must not render a redundant five-of-five kicker");
  assert((await page.locator(".result-stage-group h3").first().evaluate(node => getComputedStyle(node).fontFamily)).includes("Jua Local"), "ending copy must use the bundled Korean display font");
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

  await page.getByRole("button", { name:"수칙 보기" }).click();
  assert(await page.locator("#rules-dialog").evaluate(dialog => dialog.open), "ending rules button must open the shared rules dialog");
  await page.locator("#rules-dialog button[value=cancel]").click();
  await page.getByRole("button", { name:"다시하기" }).click();
  assert(await page.locator("#intro-screen").isVisible(), "ending restart must return to the intro");

  await browser.close();
  console.log("Ending visual and controls passed.");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
