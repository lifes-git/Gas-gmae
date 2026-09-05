const { chromium } = require("playwright");
const { pathToFileURL } = require("node:url");
const path = require("node:path");
const fs = require("node:fs");

const root = path.resolve(__dirname, "..");
const target = pathToFileURL(path.join(root, "index.html")).href;
const screenshots = path.resolve(root, "../production/game/qa/screenshots");
const chromiumPath = [
  chromium.executablePath(),
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
].find(candidate => fs.existsSync(candidate));
fs.mkdirSync(screenshots, { recursive: true });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function captureScreenshot(page, filename) {
  let lastError;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      await page.screenshot({ path: path.join(screenshots, filename) });
      return;
    } catch (error) {
      lastError = error;
      if (!String(error.message).includes("unknown error, open")) throw error;
      await page.waitForTimeout(180 * (attempt + 1));
    }
  }
  throw lastError;
}

async function waitForMissionArt(page) {
  await page.locator(".mission-prop").first().waitFor();
  await page.waitForFunction(() => Array.from(document.querySelectorAll(".mission-prop")).every(image => image.complete && image.naturalWidth > 0));
  await page.waitForTimeout(150);
}

async function start(page, capture = false) {
  await page.goto(target, { waitUntil: "load" });
  if (capture) {
    const introUi = await page.evaluate(() => {
      const card = document.querySelector("#intro-screen .intro-card");
      const startButton = document.querySelector("#start-button");
      const cardBox = card.getBoundingClientRect();
      const buttonBox = startButton.getBoundingClientRect();
      const cardStyle = getComputedStyle(card);
      const titleStyle = getComputedStyle(document.querySelector("#intro-title"));
      return { cardWidth: cardBox.width, cardBorder: parseFloat(cardStyle.borderTopWidth), cardBackground: cardStyle.backgroundColor, titleShadow: titleStyle.textShadow, buttonHeight: buttonBox.height, actionsDirection: getComputedStyle(document.querySelector("#intro-screen .retro-actions")).flexDirection };
    });
    assert(introUi.cardWidth >= 800 && introUi.cardBorder === 0 && introUi.cardBackground === "rgba(0, 0, 0, 0)", "intro: free-floating showcase should not use a giant panel");
    assert(introUi.titleShadow !== "none" && introUi.actionsDirection === "column", "intro: illustrated title or stacked plaque controls are missing");
    assert(introUi.buttonHeight >= 54, "intro: primary controls should be visually prominent");
    await captureScreenshot(page, "intro.png");
    await page.locator("#intro-rules-button").click();
    await captureScreenshot(page, "rules.png");
    await page.locator("#rules-dialog .retro-close").click();
  }
  await page.getByRole("button", { name: "시작", exact: true }).click();
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
  const toKitchen = page.getByRole("button", { name: "주방으로 이동" });
  if (await toKitchen.isVisible()) keyboard ? await toKitchen.press("Enter") : await toKitchen.click();
  const open = page.locator('[data-hazard="valve"]');
  if (keyboard) await open.press("Enter");
  else await open.click();
  await page.locator(".kitchen-detail-dialog").waitFor({ state: "visible" });
  if (capture) {
    const dynamicComponents = await page.evaluate(() => ({
      modal: document.querySelector(".kitchen-detail-dialog").classList.contains("ui-modal"),
      speech: document.querySelector(".kitchen-detail-dialog .detail-guide-copy").classList.contains("ui-speech"),
      action: document.querySelector(".kitchen-detail-dialog .detail-action").classList.contains("ui-button"),
      close: document.querySelector(".kitchen-detail-dialog .detail-close").classList.contains("ui-icon-button"),
      back: document.querySelector(".kitchen-detail-dialog .detail-back").classList.contains("ui-icon-button")
    }));
    assert(Object.values(dynamicComponents).every(Boolean), `components: dynamic detail UI is not fully enhanced (${JSON.stringify(dynamicComponents)})`);
  }
  if (capture) {
    const modal = await page.locator(".kitchen-detail-dialog").boundingBox();
    const viewport = page.viewportSize();
    assert(modal && viewport && modal.height <= viewport.height * .74, "detail modal should leave breathing room around the centered scene");
    await captureScreenshot(page, "mission-valve.png");
  }
  const initialLeverTransform = await page.locator(".kitchen-detail-dialog .kitchen-lever").evaluate(node => getComputedStyle(node).transform);
  if (keyboard) {
    await page.keyboard.press("Tab");
    const action = page.locator(".kitchen-detail-dialog .detail-action");
    await action.waitFor({ state: "visible" });
    await action.focus();
    await page.keyboard.press("Space");
  } else {
    const target = await page.locator(".kitchen-detail-dialog .detail-target").boundingBox();
    assert(target, "valve: target geometry missing");
    await page.mouse.move(target.x + target.width * .72, target.y + target.height / 2);
    await page.mouse.down();
    await page.mouse.move(target.x + target.width * .1, target.y + target.height / 2, { steps: 12 });
    await page.mouse.up();
  }
  await page.getByText(`${before + 1} / 3`, { exact: true }).waitFor();
  const leverState = await page.locator(".kitchen-detail-dialog .kitchen-lever").evaluate(node => ({
    transform: getComputedStyle(node).transform,
    angle: node.style.getPropertyValue("--valve-angle"),
    visible: node.getBoundingClientRect().width > 0 && node.getBoundingClientRect().height > 0
  }));
  assert(leverState.visible && leverState.angle === "90deg" && (keyboard || leverState.transform !== initialLeverTransform), "valve: rotated handle must remain visibly rotated after completion");
  if (capture) await captureScreenshot(page, "mission-valve-complete.png");
  if (capture) {
    const detailUi = await page.evaluate(() => {
      const dialog = document.querySelector(".kitchen-detail-dialog").getBoundingClientRect();
      const guide = document.querySelector(".kitchen-detail-dialog .detail-guide").getBoundingClientRect();
      const back = document.querySelector(".kitchen-detail-dialog .detail-back");
      const backBox = back.getBoundingClientRect();
      return {
        guideInside: guide.left >= dialog.left && guide.top >= dialog.top && guide.bottom <= dialog.bottom,
        separated: guide.right < backBox.left,
        backWidth: backBox.width,
        backHeight: backBox.height,
        backFontSize: getComputedStyle(back).fontSize,
        label: back.getAttribute("aria-label")
      };
    });
    assert(detailUi.guideInside && detailUi.separated, "detail: Someongi guide and return control must stay separated inside the modal");
    assert(detailUi.backWidth >= 56 && detailUi.backHeight >= 56 && detailUi.backFontSize === "0px", "detail: return should be a large icon-only control");
    assert(detailUi.label === "주방으로 돌아가기", "detail: icon-only return needs an accessible name");
  }
  if (keyboard) await page.getByRole("button", { name: "주방으로 돌아가기" }).press("Enter");
  else await page.getByRole("button", { name: "주방으로 돌아가기" }).click();
  await page.locator(".kitchen-detail-dialog").waitFor({ state: "hidden" });
}

async function assertViewportFit(page, label) {
  const fit = await page.evaluate(() => ({
    width: innerWidth,
    height: innerHeight,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight
  }));
  assert(fit.scrollWidth <= fit.width + 1, `${label}: horizontal overflow`);
  assert(fit.scrollHeight <= fit.height + 1, `${label}: vertical overflow`);
}

async function assertCenteredScene(page, label) {
  const geometry = await page.evaluate(() => {
    const room = document.querySelector("#room").getBoundingClientRect();
    const world = document.querySelector("#scene-world").getBoundingClientRect();
    const backdrop = getComputedStyle(document.querySelector("#room"), "::before").backgroundImage;
    return { room, world, backdrop };
  });
  assert(Math.abs(geometry.world.left - geometry.room.left) < 2 && Math.abs(geometry.world.right - geometry.room.right) < 2, `${label}: scene must fill both side edges`);
  assert(Math.abs((geometry.world.left + geometry.world.right) - (geometry.room.left + geometry.room.right)) < 2, `${label}: scene is not horizontally centered`);
  assert(Math.abs((geometry.world.top + geometry.world.bottom) - (geometry.room.top + geometry.room.bottom)) < 2, `${label}: scene is not vertically centered`);
  assert(geometry.backdrop !== "none", `${label}: blurred scene backdrop is missing`);
}

async function assertStableArrowHitbox(page) {
  const arrow = page.locator(".scene-navigation");
  const before = await arrow.boundingBox();
  const glyphBefore = await arrow.locator("svg").evaluate(node => getComputedStyle(node).transform);
  await page.waitForTimeout(950);
  const after = await arrow.boundingBox();
  const glyphAfter = await arrow.locator("svg").evaluate(node => getComputedStyle(node).transform);
  assert(before && after && Math.abs(before.x - after.x) < .5 && Math.abs(before.y - after.y) < .5, "navigation: touch hitbox must stay fixed");
  assert(glyphBefore !== glyphAfter, "navigation: arrow glyph should animate inside its fixed hitbox");
  const arrowStyle = await arrow.locator(".nav-arrow").evaluate(node => getComputedStyle(node).fill);
  assert(arrowStyle !== "none" && arrowStyle !== "rgba(0, 0, 0, 0)", "navigation: chunky colored arrow must be visible");
}

async function assertComponentSystem(page) {
  const components = await page.evaluate(() => {
    const requiredButtons = ["start-button", "intro-rules-button", "settings-button", "restart-button", "result-rules-button"];
    const buttonState = requiredButtons.map(id => {
      const node = document.getElementById(id);
      return { id, component: node.dataset.uiComponent, variant: node.dataset.uiVariant, enhanced: node.classList.contains("ui-button") || node.classList.contains("ui-icon-button") };
    });
    const start = getComputedStyle(document.getElementById("start-button"));
    return {
      buttonState,
      progress: document.querySelector(".progress-card").classList.contains("ui-progress"),
      speech: document.querySelector(".speech-bubble").classList.contains("ui-speech"),
      panels: document.querySelectorAll(".ui-panel").length,
      modals: document.querySelectorAll("dialog.ui-modal").length,
      startColor: start.backgroundColor,
      token: getComputedStyle(document.documentElement).getPropertyValue("--ui-yellow").trim()
    };
  });
  assert(components.buttonState.every(item => item.component === "button" && item.variant && item.enhanced), `components: static button enhancement missing (${JSON.stringify(components.buttonState)})`);
  assert(components.progress && components.speech && components.panels === 2 && components.modals >= 3, "components: shared progress, speech, panel or modal classes missing");
  assert(components.token === "#ffd95a" && components.startColor === "rgb(255, 217, 90)", "components: shared primary token is not applied to Start");
}

async function assertExitDoorTarget(page) {
  await page.waitForTimeout(420);
  const geometry = await page.evaluate(() => {
    const world = document.querySelector("#scene-world").getBoundingClientRect();
    const door = document.querySelector("#exit-door").getBoundingClientRect();
    const cue = document.querySelector("#exit-door .exit-cue").getBoundingClientRect();
    const doorStyle = getComputedStyle(document.querySelector("#exit-door"));
    const cueStyle = getComputedStyle(document.querySelector("#exit-door .exit-cue"));
    return {
      x: (door.left - world.left) / world.width,
      y: (door.top - world.top) / world.height,
      width: door.width / world.width,
      height: door.height / world.height,
      targetWidth: door.width,
      targetHeight: door.height,
      cueWidth: cue.width,
      opacity: doorStyle.opacity,
      pointerEvents: doorStyle.pointerEvents,
      cueBackground: cueStyle.backgroundColor,
      className: document.querySelector("#exit-door").className,
      disabled: document.querySelector("#exit-door").disabled,
      text: document.querySelector("#exit-door").textContent.trim(),
      label: document.querySelector("#exit-door").getAttribute("aria-label")
    };
  });
  assert(Math.abs(geometry.x - 408 / 1672) < .008, "exit door: target must align with the door's left edge");
  assert(Math.abs(geometry.y - 67 / 941) < .008, "exit door: target must align with the door's top edge");
  assert(Math.abs(geometry.width - 230 / 1672) < .008, "exit door: target width must match the door");
  assert(Math.abs(geometry.height - 512 / 941) < .008, "exit door: target height must match the door");
  assert(geometry.targetWidth >= 44 && geometry.targetHeight >= 44, "exit door: target must remain touch-legible");
  assert(geometry.cueWidth >= 36, "exit door: visual cue must remain clearly legible");
  assert(Number(geometry.opacity) > .98 && geometry.pointerEvents === "auto", `exit door: ready state must be visible and interactive (${JSON.stringify(geometry)})`);
  assert(geometry.cueBackground === "rgb(85, 211, 239)", `exit door: cue color was overridden (${geometry.cueBackground})`);
  assert(geometry.text === "", "exit door: visible text should be removed");
  assert(geometry.label.includes("문밖의 통풍이 잘되는 곳"), "exit door: accessible instruction must be preserved");
}

async function testSettings(page) {
  const musicState = await page.locator("#background-music").evaluate(audio => ({ paused: audio.paused, loop: audio.loop, volume: audio.volume, source: audio.getAttribute("src") }));
  assert(!musicState.paused && musicState.loop && musicState.volume <= .2 && musicState.source === "Suitcase_and_Sunlight.mp3", "settings: background music should loop quietly after Start");
  await page.getByRole("button", { name: "설정 열기" }).click();
  await page.getByRole("dialog", { name: "설정" }).waitFor();
  const sound = page.locator("#sound-setting");
  const vibration = page.locator("#vibration-setting");
  await sound.uncheck();
  assert(await page.locator("#background-music").evaluate(audio => audio.paused), "settings: audio toggle must pause background music");
  await sound.check();
  await page.waitForFunction(() => !document.querySelector("#background-music").paused);
  await vibration.uncheck(); await vibration.check();
  assert(await page.getByRole("button", { name: "전체화면으로 보기" }).isVisible(), "settings: fullscreen control missing");
  assert(await page.getByRole("button", { name: "처음부터 다시하기" }).isVisible(), "settings: restart control missing");
  await captureScreenshot(page, "settings.png");
  await page.getByRole("button", { name: "설정 닫기" }).click();
}

async function solveTowel(page, keyboard = false, capture = false) {
  const before = await solvedCount(page);
  const toKitchen = page.getByRole("button", { name: "주방으로 이동" });
  if (await toKitchen.isVisible()) keyboard ? await toKitchen.press("Enter") : await toKitchen.click();
  const open = page.locator('[data-hazard="towel"]');
  const outline = await page.locator(".new-scene-art .kitchen-towel-prop").evaluate(node => getComputedStyle(node).filter);
  assert(outline.includes("drop-shadow"), "towel: white silhouette outline must be visible");
  if (capture && !keyboard) {
    await open.hover();
    await page.waitForTimeout(100);
    const transform = await page.locator(".new-scene-art .kitchen-towel-prop").evaluate(node => getComputedStyle(node).transform);
    assert(transform !== "none", "towel: hover should tilt the prop");
    await captureScreenshot(page, "desktop-kitchen-towel-hover.png");
  }
  if (keyboard) await open.press("Enter");
  else await open.click();
  await page.locator(".kitchen-detail-dialog").waitFor({ state: "visible" });
  if (capture) await captureScreenshot(page, "mission-towel.png");
  if (keyboard) {
    await page.keyboard.press("Tab");
    const action = page.locator(".kitchen-detail-dialog .detail-action");
    await action.waitFor({ state: "visible" });
    await action.focus();
    await page.keyboard.press("Space");
  } else await page.locator(".kitchen-detail-dialog .detail-target").click();
  await page.locator('.scene-held-item[data-item="towel"]').waitFor();
  assert((await page.locator('.scene-held-item[data-item="towel"]').textContent()).trim() === "", "towel inventory should not render visible text");
  assert((await page.locator('.scene-held-item[data-item="towel"]').getAttribute("aria-label")).includes("수건"), "towel inventory needs an accessible label");
  if (capture) await captureScreenshot(page, "held-towel.png");
  assert(await page.locator('[data-hazard="butane"]').isHidden(), "butane must be locked while towel is held");
  if (keyboard) await page.getByRole("button", { name: "바구니에 수건 넣기" }).press("Enter");
  else await page.getByRole("button", { name: "바구니에 수건 넣기" }).click();
  await page.getByText(`${before + 1} / 3`, { exact: true }).waitFor();
  await page.locator(".new-scene-art .kitchen-towel-stored").waitFor({ state: "visible" });
  if (capture) await captureScreenshot(page, "kitchen-towel-stored.png");
}

async function solveButane(page, keyboard = false, capture = false, heldCaptureName = null) {
  const before = await solvedCount(page);
  const toLiving = page.getByRole("button", { name: "거실로 이동" });
  if (await toLiving.isVisible()) keyboard ? await toLiving.press("Enter") : await toLiving.click();
  const open = page.locator('[data-hazard="butane"]');
  if (keyboard) await open.press("Enter");
  else await open.click();
  await page.locator(".kitchen-detail-dialog").waitFor({ state: "visible" });
  if (capture) await captureScreenshot(page, "mission-butane-indoor.png");
  if (keyboard) {
    await page.keyboard.press("Tab");
    const action = page.locator(".kitchen-detail-dialog .detail-action");
    await action.waitFor({ state: "visible" });
    await action.focus();
    await page.keyboard.press("Space");
  } else await page.locator(".kitchen-detail-dialog .detail-target").click();
  await page.locator('.scene-held-item[data-item="butane"]').waitFor();
  assert((await page.locator('.scene-held-item[data-item="butane"]').textContent()).trim() === "", "butane inventory should not render visible text");
  assert((await page.locator('.scene-held-item[data-item="butane"]').getAttribute("aria-label")).includes("부탄캔"), "butane inventory needs an accessible label");
  await assertExitDoorTarget(page);
  assert((await page.locator("#guide-message").textContent()).includes("현관문"), "butane carry: Someongi should point to the door");
  if (capture || heldCaptureName) await captureScreenshot(page, heldCaptureName || "held-butane.png");
  assert(await page.locator('[data-hazard="towel"]').isHidden(), "towel must be locked while butane is held");
  if (keyboard) await page.locator("#exit-door").press("Enter");
  else await page.locator("#exit-door").click();
  await page.locator(".visual-butane-outdoor").waitFor();
  const recyclingBin = page.getByRole("button", { name: "캔 수거함: 잔여가스 제거 후 이용 가능" });
  assert(await recyclingBin.isDisabled(), "outdoor: recycling bin must stay disabled before residual gas removal");
  assert(await page.locator("#return-room-button").isHidden(), "outdoor: return button must stay hidden before completion");
  assert(await page.locator(".rotation-cue-butane").isVisible(), "outdoor: rotation direction cue must be visible");
  assert(await page.locator(".visual-butane-outdoor .butane-step-tracker").count() === 0, "outdoor: numbered step tracker should be removed");
  assert((await page.locator("#mission-copy").textContent()).includes("화살표 방향"), "outdoor: Someongi should give the next-action hint");
  if (capture) {
    await page.locator(".visual-butane-outdoor").waitFor();
    await waitForMissionArt(page);
    await captureScreenshot(page, "mission-butane-outdoor.png");
  }
  if (keyboard) {
    await page.getByRole("button", { name: "부탄캔을 돌려 거꾸로 세우기" }).press("Enter");
    await page.keyboard.press("Tab");
    await page.locator("#mission-actions").waitFor({ state: "visible" });
    await page.locator("#mission-actions .choice-button").press("Enter");
  } else {
    const can = await page.getByRole("button", { name: "부탄캔을 돌려 거꾸로 세우기" }).boundingBox();
    assert(can, "outdoor: butane geometry missing");
    await page.mouse.move(can.x + can.width * .3, can.y + can.height / 2);
    await page.mouse.down();
    await page.mouse.move(can.x + can.width * .9, can.y + can.height / 2, { steps: 12 });
    await page.mouse.up();
    assert(await page.locator(".rotation-cue-butane").isHidden(), "outdoor: rotation cue should clear after inversion");
    const focus = await page.locator(".nozzle-focus").boundingBox();
    assert(focus, "nozzle geometry missing");
    await page.mouse.move(focus.x + focus.width / 2, focus.y + focus.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(1000);
    await page.mouse.up();
  }
  const readyBin = page.getByRole("button", { name: "캔 수거함: 잔여가스 제거 후 이용 가능" });
  await readyBin.waitFor({ state: "visible" });
  assert(!(await readyBin.isDisabled()), "outdoor: recycling bin should unlock only after residual gas removal");
  assert(await solvedCount(page) === before, "outdoor: residual gas removal alone must not finish disposal");
  const binGeometry = await readyBin.evaluate(node => {
    const bin = node.getBoundingClientRect();
    const visual = document.querySelector(".visual-butane-outdoor").getBoundingClientRect();
    const can = document.querySelector(".mission-prop-butane-outdoor.is-ready-to-dispose").getBoundingClientRect();
    return {
      centerX: (bin.left + bin.width / 2 - visual.left) / visual.width,
      bottomY: (bin.bottom - visual.top) / visual.height,
      overlapsCan: !(bin.right < can.left || bin.left > can.right || bin.bottom < can.top || bin.top > can.bottom)
    };
  });
  assert(Math.abs(binGeometry.centerX - .32) < .015 && Math.abs(binGeometry.bottomY - .53) < .02, `outdoor: recycling bin coordinate mismatch (${JSON.stringify(binGeometry)})`);
  assert(!binGeometry.overlapsCan, "outdoor: recycling bin must not overlap the butane can");
  assert((await page.locator("#mission-copy").textContent()).includes("지역"), "outdoor: local disposal-standard reminder is missing");
  if (keyboard) await readyBin.press("Enter");
  else await readyBin.click();
  await page.getByText(`${before + 1} / 3`, { exact: true }).waitFor();
  assert(await page.locator(".can-recycling-bin.is-filled").isVisible(), "outdoor: recycling bin should remain visible after completion");
  assert(await page.locator(".can-bin-check").count() === 0, "outdoor: recycling bin should not show a completion check badge");
  const outdoorReturn = page.getByRole("button", { name: "현관문으로 방 안에 돌아가기" });
  const returnGeometry = await outdoorReturn.evaluate(node => {
    const button = node.getBoundingClientRect();
    const visual = document.querySelector(".visual-butane-outdoor").getBoundingClientRect();
    return { x: (button.left - visual.left) / visual.width, width: button.width / visual.width, visible: button.width > 0 && button.height > 0 };
  });
  assert(returnGeometry.visible && returnGeometry.x > .75 && returnGeometry.width < .22, "outdoor: return control should align with the drawn doorway");
  if (capture) await captureScreenshot(page, "mission-butane-outdoor-complete.png");
  if (keyboard) await outdoorReturn.press("Enter");
  else await outdoorReturn.click();
  await page.locator("#mission-dialog").waitFor({ state: "hidden" });
}

async function fullFunctional(browserType, name) {
  const browser = await browserType.launch({ headless: true, executablePath: chromiumPath });
  const context = await browser.newContext({ viewport: { width: 1920, height: 945 } });
  const page = await context.newPage();
  page.setDefaultTimeout(5000);
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });

  await start(page, name === "chromium");
  if (name === "chromium") await assertComponentSystem(page);
  if (name === "chromium") {
    const hud = await page.evaluate(() => {
      const progress = document.querySelector(".progress-card").getBoundingClientRect();
      const settings = document.querySelector(".settings-button").getBoundingClientRect();
      return { progressHeight: progress.height, settingsWidth: settings.width, settingsHeight: settings.height };
    });
    assert(hud.progressHeight >= 60 && hud.settingsWidth >= 50 && hud.settingsHeight >= 50, "HUD: progress and settings controls should use the enlarged size");
  }
  await assertViewportFit(page, `${name} initial`);
  await assertCenteredScene(page, `${name} initial`);
  await assertStableArrowHitbox(page);
  if (name === "chromium") await testSettings(page);
  console.log(`${name}: started`);
  if (name === "chromium") {
    await captureScreenshot(page, "desktop-initial.png");
  }
  await solveButane(page, false, name === "chromium");
  console.log(`${name}: butane solved`);
  await solveValve(page, false, name === "chromium");
  console.log(`${name}: valve solved`);
  await solveTowel(page, false, name === "chromium");
  console.log(`${name}: towel solved`);
  const exit = page.locator("#exit-door");
  assert(await exit.isHidden(), `${name}: exit door must not appear in the kitchen`);
  const toLiving = page.getByRole("button", { name: "거실로 이동" });
  assert(await toLiving.isVisible(), `${name}: kitchen must keep a route back to the living room after 3/3`);
  if (name === "chromium") await captureScreenshot(page, "kitchen-complete-no-exit.png");
  await toLiving.click();
  assert(await exit.isEnabled(), `${name}: exit should be enabled`);
  await captureScreenshot(page, `${name}-complete.png`);
  await exit.click();
  await page.getByRole("heading", { name: "안전점검 완료!" }).waitFor();
  if (name === "chromium") {
    const resultUi = await page.evaluate(() => {
      const card = document.querySelector("#result-screen .result-card");
      const tiles = Array.from(document.querySelectorAll("#result-screen .result-checklist li"));
      const style = getComputedStyle(card);
      const titleStyle = getComputedStyle(document.querySelector("#result-title"));
      return { border: parseFloat(style.borderTopWidth), background: style.backgroundColor, titleShadow: titleStyle.textShadow, columns: getComputedStyle(document.querySelector("#result-screen .result-checklist")).gridTemplateColumns.split(" ").length, tileBorders: tiles.every(tile => parseFloat(getComputedStyle(tile).borderTopWidth) >= 4) };
    });
    assert(resultUi.border === 0 && resultUi.background === "rgba(0, 0, 0, 0)" && resultUi.titleShadow !== "none", "result: free-floating illustrated completion showcase is missing");
    assert(resultUi.columns === 3 && resultUi.tileBorders, "result: three completion badges are missing");
  }
  if (name === "chromium") await captureScreenshot(page, "desktop-result.png");
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
  await page.getByRole("heading", { name: "안전점검 완료!" }).waitFor();
  await browser.close();
}

async function mobileFlow() {
  const browser = await chromium.launch({ headless: true, executablePath: chromiumPath });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  page.setDefaultTimeout(5000);
  await page.goto(target, { waitUntil: "load" });
  await page.locator("#rotate-screen").waitFor({ state: "visible" });
  await captureScreenshot(page, "mobile-portrait-rotate.png");
  await page.setViewportSize({ width: 844, height: 390 });
  await page.locator("#rotate-screen").waitFor({ state: "hidden" });
  await page.getByRole("button", { name: "시작", exact: true }).click();
  await page.getByText("0 / 3", { exact: true }).waitFor();
  await captureScreenshot(page, "mobile-landscape-initial.png");
  await solveTowel(page);
  await solveValve(page);
  await solveButane(page, false, false, "mobile-held-butane.png");
  await page.locator("#exit-door").click();
  await page.getByRole("heading", { name: "안전점검 완료!" }).waitFor();
  await captureScreenshot(page, "mobile-landscape-result.png");
  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  assert(!horizontalOverflow, "mobile: horizontal overflow detected");
  await browser.close();
}

async function cancelAndCarryFlow() {
  const browser = await chromium.launch({ headless: true, executablePath: chromiumPath });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.setDefaultTimeout(5000);
  await start(page);
  await page.locator('[data-hazard="butane"]').click();
  await page.locator(".kitchen-detail-dialog .detail-close").click();
  assert(await solvedCount(page) === 0, "cancel before pickup must not solve the item");
  await page.locator('[data-hazard="butane"]').click();
  await page.locator(".kitchen-detail-dialog .detail-target").click();
  await page.locator('.scene-held-item[data-item="butane"]').waitFor();
  await page.locator("#exit-door").click();
  await page.locator(".visual-butane-outdoor").waitFor();
  await page.getByRole("button", { name: "미션 닫기" }).click();
  await page.locator('.scene-held-item[data-item="butane"]').waitFor();
  assert(await page.locator("#exit-door").isEnabled(), "outdoor cancel must return with butane still held");
  await browser.close();
}

(async () => {
  await fullFunctional(chromium, "chromium");
  await keyboardFlow();
  await mobileFlow();
  await cancelAndCarryFlow();
  console.log("E2E OK: Chromium desktop, keyboard-only, mobile touch, cancel/carry recovery");
})().catch(error => {
  console.error(error.stack || error);
  process.exit(1);
});
