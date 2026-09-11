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
  page.setDefaultTimeout(15000);
  await page.goto(target, { waitUntil:"load", timeout:15000 });
  await page.getByRole("button", { name:"시작", exact:true }).click();
  await page.getByRole("button", { name:"주방으로 이동" }).click();
  await page.locator('button[data-hazard="valve"]').click();
  const dialog = page.locator(".kitchen-detail-dialog[open]");
  await dialog.waitFor();
  assert(await dialog.locator(".rotation-cue-valve").count() === 0, "valve modal must not use the oversized rotation arrow");
  const targetBox = await dialog.locator(".target-valve").boundingBox();
  const viewBox = await dialog.locator(".detail-valve").boundingBox();
  assert(targetBox && viewBox, "valve handle target must be visible");
  const centerX = (targetBox.x + targetBox.width / 2 - viewBox.x) / viewBox.width;
  const centerY = (targetBox.y + targetBox.height / 2 - viewBox.y) / viewBox.height;
  assert(Math.abs(centerX - .799) < .025 && Math.abs(centerY - .58) < .035, `valve target must align with the handle (${centerX}, ${centerY})`);
  if (process.env.QA_SCREENSHOT) await page.screenshot({ path:process.env.QA_SCREENSHOT });
  await browser.close();
  console.log("Stage 1 valve modal focus passed.");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
