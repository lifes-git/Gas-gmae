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
  await page.evaluate(() => {
    window.__playedStageTwoSounds = [];
    document.addEventListener("game-sound-played", event => window.__playedStageTwoSounds.push(event.detail.id));
    document.getElementById("app").hidden = true;
    document.getElementById("intro-screen").hidden = true;
    window.StageTwo.reset();
    window.StageTwo.show();
  });

  await page.getByRole("button", { name:"주방으로 이동" }).click();
  await page.locator("#stage-two-pipe-hotspot").click({ force:true });
  assert((await page.locator("#stage-two-guide").textContent()).includes("창문을 먼저"), "pipe must remain locked before ventilation");

  await page.getByRole("button", { name:"거실로 이동" }).click();
  await page.locator("#stage-two-window-hotspot").click();
  await page.locator("#stage-two-window-target").click({ force:true });
  await page.getByRole("button", { name:"확인했어요" }).click();
  await page.locator('#stage-two [data-progress-item="window"].is-collected').waitFor();

  await page.getByRole("button", { name:"주방으로 이동" }).click();
  await page.waitForTimeout(420);
  assert((await page.locator(".stage-two__pipe-art").getAttribute("src")).includes("prop-stage2-gas-pipe-integrated-v2.png"), "Stage 2 must use the integrated pipe and locked valve artwork");
  if (process.env.QA_MAIN_SCREENSHOT) await page.screenshot({ path:process.env.QA_MAIN_SCREENSHOT });
  await page.locator("#stage-two-pipe-hotspot").click();
  assert(
    await page.locator(".stage-two__pipe-art").getAttribute("src") === await page.locator(".stage-two-pipe-view__art").getAttribute("src"),
    "Stage 2 kitchen and inspection modal must reuse the same baked pipe-and-handle PNG"
  );
  const pipeViewBackground = await page.locator(".stage-two-pipe-view").evaluate(node => getComputedStyle(node).backgroundImage);
  assert(pipeViewBackground.includes("bg-stage2-pipe-detail-tile-v1.jpg"), `pipe modal must use the dedicated tile background: ${pipeViewBackground}`);
  const pipeDialogBox = await page.locator("#stage-two-pipe-dialog").boundingBox();
  assert(pipeDialogBox && pipeDialogBox.x >= 0 && pipeDialogBox.y >= 0 && pipeDialogBox.x + pipeDialogBox.width <= 1280 && pipeDialogBox.y + pipeDialogBox.height <= 720, "pipe modal must fit the desktop viewport");
  if (process.env.QA_MODAL_SCREENSHOT) await page.screenshot({ path:process.env.QA_MODAL_SCREENSHOT });
  await page.locator('[data-pipe-tool="lighter"]').click();
  assert((await page.locator("#stage-two-pipe-copy").textContent()).includes("위험"), "lighter choice must be rejected without depicting ignition");
  await page.locator('[data-pipe-tool="soap"]').click();
  assert(await page.locator("#stage-two-pipe-kit").isVisible(), "soap and brush kit must move into the held-item area after the safe choice");
  assert(await page.locator("#stage-two-pipe-kit .stage-two-pipe-kit__solution").count() === 0, "held item must show only the soap-coated brush");
  await page.waitForTimeout(560);
  if (process.env.QA_KIT_SCREENSHOT) await page.screenshot({ path:process.env.QA_KIT_SCREENSHOT });
  if (process.env.QA_MOBILE_KIT_SCREENSHOT) {
    await page.setViewportSize({ width:844, height:390 });
    await page.screenshot({ path:process.env.QA_MOBILE_KIT_SCREENSHOT });
    await page.setViewportSize({ width:1280, height:720 });
  }
  await page.locator('[data-pipe-point="2"]').click();
  assert((await page.locator("#stage-two-pipe-copy").textContent()).includes("위쪽"), "out-of-order input must not advance the mission");

  await page.locator('[data-pipe-point="1"]').click();
  await page.locator(".stage-two-pipe-auto-brush").waitFor();
  if (process.env.QA_BRUSH_SCREENSHOT) await page.screenshot({ path:process.env.QA_BRUSH_SCREENSHOT });
  await page.locator('[data-pipe-point="2"].is-active').waitFor();
  await page.locator('[data-pipe-point="2"]').press("Space");
  await page.locator('[data-pipe-point="3"].is-active').waitFor();
  assert(await page.locator('#stage-two [data-progress-item="pipe"].is-collected').count() === 0, "pipe slot must be empty before all checks and confirmation");

  await page.locator('[data-pipe-point="3"]').click({ force:true });
  await page.locator('#safety-rule-dialog[data-hazard="pipe"][open]').waitFor();
  assert(await page.locator('#safety-rule-dialog[data-hazard="pipe"] .safety-rule-step').count() === 3, "pipe safety guidance must show three ordered action cards");
  const safetyStepsText = await page.locator('#safety-rule-dialog[data-hazard="pipe"] .safety-rule-steps').textContent();
  assert(safetyStepsText.includes("가스 사용 중단") && safetyStepsText.includes("밸브 잠금 확인") && safetyStepsText.includes("자연환기·점검 요청"), "pipe safety cards must preserve the approved action sequence");
  assert(!safetyStepsText.includes("119"), "routine supplier inspection guidance must not be replaced with a general 119 instruction");
  const leakEffectImage = await page.locator('.stage-two-pipe-point.is-leak .stage-two-pipe-soap-film').evaluate(node => getComputedStyle(node).backgroundImage);
  assert(leakEffectImage.includes("effect-soap-leak-v1.png"), "leak feedback must use the dedicated dense foam asset");
  assert(await page.locator('[data-pipe-point="3"].is-leak').count() === 1, "only point 3 must show the leak state");
  assert(await page.locator('[data-pipe-point="1"].is-leak, [data-pipe-point="2"].is-leak').count() === 0, "points 1 and 2 must remain normal");
  if (process.env.QA_LEAK_SCREENSHOT) {
    await page.locator("#safety-rule-dialog").evaluate(dialog => dialog.close());
    await page.screenshot({ path:process.env.QA_LEAK_SCREENSHOT });
    await page.locator("#safety-rule-dialog").evaluate(dialog => dialog.showModal());
  }
  assert(await page.locator('#stage-two [data-progress-item="pipe"].is-collected').count() === 0, "pipe slot must remain empty until safety confirmation");
  await page.setViewportSize({ width:844, height:390 });
  const mobileCardBox = await page.locator("#safety-rule-dialog .safety-rule-card").boundingBox();
  assert(mobileCardBox && mobileCardBox.x >= 0 && mobileCardBox.y >= 0 && mobileCardBox.x + mobileCardBox.width <= 844 && mobileCardBox.y + mobileCardBox.height <= 390, "pipe safety card must fit a mobile landscape viewport");
  if (process.env.QA_SCREENSHOT) await page.screenshot({ path:process.env.QA_SCREENSHOT, fullPage:true });

  await page.getByRole("button", { name:"확인했어요" }).click();
  await page.locator('#stage-two [data-progress-item="pipe"].is-collected').waitFor();
  await page.waitForTimeout(620);
  assert(await page.locator("#stage-two-pipe-hotspot").isVisible(), "completed pipe must remain visible in the Stage 2 kitchen");
  assert(await page.locator("#stage-two-pipe-hotspot").isDisabled(), "completed pipe must remain as a non-interactive scene object");
  assert((await page.locator("#stage-two-guide").textContent()).includes("모두 완료"), "stage 2 must complete after both items are collected");
  const playedSounds = await page.evaluate(() => window.__playedStageTwoSounds);
  ["windowLatch", "windowOpen", "toolWrong", "toolSelect", "brushScrub", "bubbleNormal", "bubbleWarning", "safetyCard", "collect", "stageComplete"].forEach(sound => {
    assert(playedSounds.includes(sound), `Stage 2 interaction must trigger ${sound}`);
  });

  const mutedSoundCount = await page.evaluate(() => {
    const setting = document.getElementById("sound-setting");
    const before = window.__playedStageTwoSounds.length;
    setting.checked = false;
    window.AudioManager.play("toolWrong");
    setting.checked = true;
    return window.__playedStageTwoSounds.length - before;
  });
  assert(mutedSoundCount === 0, "sound effects must respect the shared sound setting");

  await page.evaluate(() => window.StageTwo.reset());
  assert(await page.locator('#stage-two [data-progress-item].is-collected').count() === 0, "restart must clear every stage 2 progress slot");
  assert(await page.locator('.stage-two-pipe-point.is-done, .stage-two-pipe-point.is-leak').count() === 0, "restart must clear pipe check visuals");

  await browser.close();
  console.log("Stage 2 pipe mission flow passed.");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
