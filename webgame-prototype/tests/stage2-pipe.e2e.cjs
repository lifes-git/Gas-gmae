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
  assert(await page.locator('#stage-two [data-progress-item="pipe"].is-collected').count() === 0, "pipe slot must be empty before all checks and confirmation");

  await page.locator('[data-pipe-point="2"]').press("Space");
  await page.locator('#safety-rule-dialog[data-hazard="pipe"][open]').waitFor();
  assert(await page.locator('#safety-rule-dialog[data-hazard="pipe"] .safety-rule-step').count() === 3, "pipe safety guidance must show three ordered action cards");
  const safetyStepsText = await page.locator('#safety-rule-dialog[data-hazard="pipe"] .safety-rule-steps').textContent();
  assert(safetyStepsText.includes("가스 사용 중단") && safetyStepsText.includes("밸브 잠금 확인") && safetyStepsText.includes("자연환기·점검 요청"), "pipe safety cards must preserve the approved action sequence");
  assert(!safetyStepsText.includes("119"), "routine supplier inspection guidance must not be replaced with a general 119 instruction");
  const leakEffectImage = await page.locator('.stage-two-pipe-point.is-leak .stage-two-pipe-soap-film').evaluate(node => getComputedStyle(node).backgroundImage);
  assert(leakEffectImage.includes("effect-soap-leak-v1.png"), "leak feedback must use the dedicated dense foam asset");
  assert(await page.locator('[data-pipe-point="2"].is-leak').count() === 1, "point 2 must show the leak state");
  assert(await page.locator('[data-pipe-point="1"].is-leak').count() === 0, "point 1 must remain normal");
  assert(await page.locator('[data-pipe-point="3"]').count() === 0, "the occluded third point must not exist");
  if (process.env.QA_LEAK_SCREENSHOT) {
    await page.locator("#safety-rule-dialog").evaluate(dialog => dialog.close());
    await page.screenshot({ path:process.env.QA_LEAK_SCREENSHOT });
    await page.locator("#safety-rule-dialog").evaluate(dialog => dialog.showModal());
  }
  assert(await page.locator('#stage-two [data-progress-item="pipe"].is-collected').count() === 0, "pipe slot must remain empty until safety confirmation");
  await page.setViewportSize({ width:844, height:390 });
  const mobileCardBox = await page.locator("#safety-rule-dialog .safety-rule-card").boundingBox();
  assert(mobileCardBox && mobileCardBox.x >= 0 && mobileCardBox.y >= 0 && mobileCardBox.x + mobileCardBox.width <= 844 && mobileCardBox.y + mobileCardBox.height <= 390, "pipe safety card must fit a mobile landscape viewport");
  const flowArrowBoxes = await page.locator("#safety-rule-dialog .safety-rule-flow-arrow").evaluateAll(nodes => nodes.map(node => {
    const box = node.getBoundingClientRect();
    return { width:box.width, height:box.height };
  }));
  assert(flowArrowBoxes.length === 2, "pipe safety guidance must show two explicit flow arrows between three cards");
  assert(flowArrowBoxes.every(box => Math.abs(box.width - box.height) < 0.5), "pipe safety flow arrow containers must remain circular rather than becoming oval");
  if (process.env.QA_SCREENSHOT) await page.screenshot({ path:process.env.QA_SCREENSHOT, fullPage:true });

  await page.setViewportSize({ width:390, height:844 });
  const portraitFlow = await page.locator("#safety-rule-dialog .safety-rule-flow-arrow").evaluateAll(nodes => nodes.map(node => ({
    transform:getComputedStyle(node).transform,
    width:node.getBoundingClientRect().width,
    height:node.getBoundingClientRect().height,
  })));
  assert(portraitFlow.every(arrow => arrow.transform !== "none" && Math.abs(arrow.width - arrow.height) < 0.5), "portrait flow arrows must rotate downward without losing their circular shape");
  await page.setViewportSize({ width:844, height:390 });

  await page.getByRole("button", { name:"확인했어요" }).click();
  await page.locator('#stage-two [data-progress-item="pipe"].is-collected').waitFor();
  assert(await page.locator("#stage-two-pipe-hotspot").isVisible(), "completed pipe must remain visible in the Stage 2 kitchen");
  assert(await page.locator("#stage-two-pipe-hotspot").isDisabled(), "completed pipe must remain as a non-interactive scene object");
  assert((await page.locator("#stage-two-guide").textContent()).includes("거실로 돌아가 현관 밖"), "Somyeongi must direct the player through the living-room exit after a suspected leak");
  assert(await page.locator("#stage-two-call-scene").isHidden(), "the outdoor epilogue must not start before the player uses the front door");
  assert(await page.locator("#stage-two-exit-door").isHidden(), "the front-door exit must only appear in the living room");
  await page.getByRole("button", { name:"거실로 이동" }).click();
  await page.locator("#stage-two-exit-door").waitFor({ state:"visible" });
  assert(await page.locator("#stage-two-frame").getAttribute("data-room") === "living", "the player must return to the living room before exiting");
  await page.waitForTimeout(420);
  if (process.env.QA_DOOR_SCREENSHOT) await page.screenshot({ path:process.env.QA_DOOR_SCREENSHOT });
  await page.getByRole("button", { name:"안전한 실외로 이동" }).click();
  await page.locator("#stage-two-call-scene.is-active").waitFor({ state:"visible" });
  await page.waitForTimeout(360);
  if (process.env.QA_ARRIVAL_SCREENSHOT) await page.screenshot({ path:process.env.QA_ARRIVAL_SCREENSHOT });
  assert((await page.locator(".stage-two-call-scene__background").getAttribute("src")).includes("bg-outdoor-sunset-return-v1.jpg"), "the call interaction must take place in the safe outdoor scene");
  assert((await page.locator(".stage-two-call-beat--phone .stage-two-call-beat__art").getAttribute("src")).includes("ending-scene-call-v2.webp"), "Somyeongi must visibly make the expert-inspection call in the third standalone comic scene");
  await page.locator("#stage-two-call-scene.is-dialing").waitFor({ state:"visible" });
  assert((await page.locator(".stage-two-call-beat--dial .stage-two-call-beat__art").getAttribute("src")).includes("ending-scene-dial-v5.webp"), "the dialing cut must show the coherent full-scene phone keypad artwork");
  await page.waitForTimeout(240);
  if (process.env.QA_DIAL_SCREENSHOT) await page.screenshot({ path:process.env.QA_DIAL_SCREENSHOT });
  await page.locator("#stage-two-call-scene.is-calling").waitFor({ state:"visible" });
  assert((await page.locator("#stage-two-call-copy").textContent()).includes("소멍이가 가스 전문가에게 연결"), "the call feedback must explicitly place Somyeongi's phone action outside");
  assert(await page.locator("#stage-two-call-button").count() === 0, "the epilogue must not add a redundant player call button");
  assert(await page.locator("#result-screen").isHidden(), "the ending must wait for the automatic expert-inspection request");
  await page.waitForTimeout(420);
  if (process.env.QA_TRANSITION_SCREENSHOT) await page.screenshot({ path:process.env.QA_TRANSITION_SCREENSHOT });
  await page.locator("#stage-two-call-scene.is-complete").waitFor({ state:"visible" });
  assert((await page.locator("#stage-two-call-copy").textContent()).includes("전문가가 확인하기 전까지 가스를 사용하지 않아요"), "completion feedback must prevent reuse before expert inspection");
  await page.waitForTimeout(480);
  if (process.env.QA_EXPANDED_TRANSITION_SCREENSHOT) await page.screenshot({ path:process.env.QA_EXPANDED_TRANSITION_SCREENSHOT });
  const playedSounds = await page.evaluate(() => window.__playedStageTwoSounds);
  ["windowLatch", "windowOpen", "toolWrong", "toolSelect", "brushScrub", "bubbleNormal", "bubbleWarning", "safetyCard", "collect", "storyStep", "phoneDial", "phoneRing", "stageComplete"].forEach(sound => {
    assert(playedSounds.includes(sound), `Stage 2 interaction must trigger ${sound}`);
  });
  const endingSamples = await page.evaluate(() => ["storyStep", "phoneRing"].map(id => window.GAME_SOUND_DATA[id]));
  endingSamples.forEach(config => {
    assert(config.type === "sample" && config.src.endsWith(".mp3"), `Ending comic cue must use a real MP3 sample: ${JSON.stringify(config)}`);
  });
  assert(endingSamples[0].src.endsWith("sfx-ending-footsteps-v1.mp3"), "the first ending cut must use the approved three-step sample instead of the door-close sound");
  assert((await page.evaluate(() => window.GAME_SOUND_DATA.phoneDial.type)) === "phoneDial", "the dialing cut must use the short keypad-tone pattern instead of a vibration sample");
  await page.locator("#result-screen").waitFor({ state:"visible" });
  await page.waitForTimeout(900);
  assert(await page.locator("#stage-two").isHidden(), "Stage 2 must hide when the ending appears");
  assert((await page.locator("#result-title img").getAttribute("src")).includes("title-ending-mission-alpha-v1.png"), "ending must use the mission-complete PNG title");
  assert((await page.locator(".result-mascot-art").getAttribute("src")).includes("mascot-somyeongi-ending-logo-v1.png"), "ending must use the logo-bearing mascot PNG");
  assert(await page.locator(".result-kicker").count() === 0, "ending must not restore the removed five-of-five kicker");
  assert(await page.locator(".result-stage-group").count() === 2, "ending must separate departure and return missions");
  assert(await page.locator(".result-checklist li.is-caution").count() === 0, "all five ending items, including the expert inspection request, must be marked complete");
  assert((await page.locator(".result-checklist--return li:last-child strong").textContent()).includes("전문가 점검 요청"), "ending must preserve expert inspection as the final completed action");
  assert((await page.locator("#background-music").getAttribute("src")).includes("Walking_Toward_The_Sun.mp3"), "ending must switch to its dedicated music");
  if (process.env.QA_ENDING_SCREENSHOT) await page.screenshot({ path:process.env.QA_ENDING_SCREENSHOT });
  const endingBox = await page.locator("#result-screen .result-card").boundingBox();
  assert(endingBox && endingBox.x >= 0 && endingBox.y >= 0 && endingBox.x + endingBox.width <= 844 && endingBox.y + endingBox.height <= 390, `ending card must fit a mobile landscape viewport: ${JSON.stringify(endingBox)}`);

  const mutedSoundCount = await page.evaluate(() => {
    const setting = document.getElementById("sound-setting");
    const before = window.__playedStageTwoSounds.length;
    setting.checked = false;
    window.AudioManager.play("toolWrong");
    setting.checked = true;
    return window.__playedStageTwoSounds.length - before;
  });
  assert(mutedSoundCount === 0, "sound effects must respect the shared sound setting");

  await page.getByRole("button", { name:"다시하기" }).click();
  assert(await page.locator("#intro-screen").isVisible(), "restart must return to the intro screen");
  assert(await page.locator('#stage-two [data-progress-item].is-collected').count() === 0, "restart must clear every stage 2 progress slot");
  assert(await page.locator('.stage-two-pipe-point.is-done, .stage-two-pipe-point.is-leak').count() === 0, "restart must clear pipe check visuals");

  await browser.close();
  console.log("Stage 2 pipe mission flow passed.");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
