(function () {
  "use strict";

  var screen = document.getElementById("stage-two");
  var frame = document.getElementById("stage-two-frame");
  var livingBackground = frame.querySelector(".stage-two__background--living");
  var kitchenBackground = frame.querySelector(".stage-two__background--kitchen");
  var closedWindowLayer = document.getElementById("stage-two-window-layer");
  var navigation = document.getElementById("stage-two-navigation");
  var title = document.getElementById("stage-two-title");
  var settings = document.getElementById("stage-two-settings-button");
  var rules = document.getElementById("stage-two-rules-button");
  var guide = document.getElementById("stage-two-guide");
  var progress = screen.querySelector(".stage-two__progress-text");
  var progressCard = screen.querySelector(".progress-card");
  var progressDots = screen.querySelector(".progress-dots");
  var windowHotspot = document.getElementById("stage-two-window-hotspot");
  var windowDialog = document.getElementById("stage-two-window-dialog");
  var windowClose = document.getElementById("stage-two-window-close");
  var windowAction = document.getElementById("stage-two-window-action");
  var windowBack = document.getElementById("stage-two-window-back");
  var windowDragTarget = document.getElementById("stage-two-window-drag-target");
  var windowCopy = document.getElementById("stage-two-window-copy");
  var windowGuideCopy = document.getElementById("stage-two-window-guide-copy");
  var windowMascot = document.getElementById("stage-two-window-mascot");
  var windowClosedImage = document.getElementById("stage-two-window-closed-image");
  var windowOpenImage = document.getElementById("stage-two-window-open-image");
  var status = document.getElementById("stage-two-status");
  var safetyRuleDialog = document.getElementById("safety-rule-dialog");
  var safetyRuleIcon = document.getElementById("safety-rule-icon");
  var safetyRuleLead = document.getElementById("safety-rule-lead");
  var safetyRuleHighlight = document.getElementById("safety-rule-highlight");
  var safetyRuleConfirm = document.getElementById("safety-rule-confirm");
  var dialogue = window.SOMYEONGI_STAGE_2_DIALOGUE;
  var room = "living";
  var solved = { window: false, pipe: false };
  var collected = { window: false, pipe: false };
  var closedLivingSource = "assets/stage-2/backgrounds/bg-stage2-living-sunset-windowless-v1.png";
  var openLivingSource = "assets/stage-2/backgrounds/bg-stage2-living-window-open-v1.jpg";
  settings.innerHTML = document.getElementById("settings-button").innerHTML;
  guide.textContent = dialogue.intro;

  function renderProgress() {
    var count = Number(collected.window) + Number(collected.pipe);
    progress.textContent = count + " / 2";
    progressCard.setAttribute("aria-label", "안전점검 진행도 2개 중 " + count + "개 완료");
  }

  function showSafetyRuleCard(id) {
    var rule = window.SAFETY_RULE_CARDS[id];
    if (!rule || safetyRuleDialog.open) return;
    safetyRuleDialog.dataset.hazard = id;
    safetyRuleDialog.dataset.stage = "2";
    safetyRuleDialog.setAttribute("aria-label", rule.label);
    safetyRuleIcon.src = rule.icon;
    safetyRuleLead.textContent = rule.lead + " ";
    safetyRuleHighlight.textContent = rule.highlight;
    window.setTimeout(function () {
      if (!solved[id] || safetyRuleDialog.open) return;
      safetyRuleDialog.showModal();
      safetyRuleConfirm.focus();
    }, 0);
  }

  function updateSceneLayout() {
    var width = frame.clientWidth;
    var height = frame.clientHeight;
    if (!width || !height) return;
    var scale = width / 1672;
    var offsetX = 0;
    var offsetY = (height - 941 * scale) / 2;
    windowHotspot.style.left = offsetX + "px";
    windowHotspot.style.top = offsetY + 24 * scale + "px";
    windowHotspot.style.width = 310 * scale + "px";
    windowHotspot.style.height = 380 * scale + "px";
  }

  function render() {
    var nextRoom = room === "living" ? "kitchen" : "living";
    frame.dataset.room = room;
    livingBackground.classList.toggle("is-active", room === "living");
    kitchenBackground.classList.toggle("is-active", room === "kitchen");
    closedWindowLayer.classList.toggle("is-active", room === "living" && !solved.window);
    navigation.dataset.direction = nextRoom === "kitchen" ? "right" : "left";
    navigation.setAttribute("aria-label", nextRoom === "kitchen" ? "주방으로 이동" : "거실로 이동");
    windowHotspot.hidden = room !== "living" || solved.window;
    screen.setAttribute("aria-label", room === "living" ? "스테이지 2 노을진 거실" : "스테이지 2 노을진 주방");
    window.requestAnimationFrame(updateSceneLayout);
  }

  function show() {
    if (!screen) return;
    room = "living";
    guide.textContent = solved.window ? dialogue.windowSuccess : dialogue.intro;
    render();
    screen.hidden = false;
    screen.classList.remove("is-entering");
    void screen.offsetWidth;
    screen.classList.add("is-entering");
    title.focus({ preventScroll: true });
  }

  function reset() {
    if (!screen) return;
    if (windowDialog.open) windowDialog.close();
    room = "living";
    solved.window = false;
    solved.pipe = false;
    collected.window = false;
    collected.pipe = false;
    livingBackground.src = closedLivingSource;
    frame.classList.remove("is-window-open");
    windowClosedImage.classList.add("is-active");
    windowOpenImage.classList.remove("is-active");
    windowDialog.classList.remove("is-success", "show-fallback");
    windowDialog.dataset.failures = "0";
    windowDragTarget.disabled = false;
    windowDragTarget.style.removeProperty("--window-drag-x");
    windowMascot.src = "assets/common/mascots/mascot-somyeongi-question-logo-v1.svg";
    windowGuideCopy.classList.remove("is-success");
    windowCopy.textContent = dialogue.windowPrompt;
    if (window.ProgressCollection) window.ProgressCollection.reset(progressDots);
    renderProgress();
    screen.classList.remove("is-entering");
    screen.hidden = true;
    render();
  }

  navigation.addEventListener("click", function () {
    room = room === "living" ? "kitchen" : "living";
    render();
    navigation.focus();
  });
  windowHotspot.addEventListener("click", function () {
    windowCopy.textContent = solved.window ? dialogue.windowSuccess : dialogue.windowPrompt;
    windowDialog.classList.toggle("is-success", solved.window);
    windowDialog.showModal();
    (solved.window ? windowBack : windowDragTarget).focus();
  });

  function completeWindow() {
    if (solved.window) return;
    solved.window = true;
    livingBackground.src = openLivingSource;
    frame.classList.add("is-window-open");
    windowClosedImage.classList.remove("is-active");
    windowOpenImage.classList.add("is-active");
    windowCopy.textContent = dialogue.windowSuccess;
    guide.textContent = dialogue.windowSuccess;
    windowDragTarget.disabled = true;
    windowDialog.classList.remove("show-fallback");
    windowDialog.classList.add("is-success");
    windowGuideCopy.classList.add("is-success");
    windowMascot.src = "assets/common/mascots/mascot-somyeongi-success-logo-v1.svg";
    windowBack.focus();
    status.textContent = "창문 열어 자연환기하기를 완료했습니다.";
    renderProgress();
    render();
    showSafetyRuleCard("window");
  }

  var pendingCollection = null;
  safetyRuleConfirm.addEventListener("click", function () {
    if (safetyRuleDialog.dataset.stage !== "2") return;
    var item = safetyRuleDialog.dataset.hazard;
    var rule = window.SAFETY_RULE_CARDS[item];
    if (!rule || progressDots.querySelector('[data-progress-item="' + item + '"]').classList.contains("is-collected")) return;
    pendingCollection = { item:item, icon:rule.progressIcon || rule.icon, label:rule.label, sourceRect:safetyRuleIcon.getBoundingClientRect() };
  });
  safetyRuleDialog.addEventListener("close", function () {
    if (safetyRuleDialog.dataset.stage !== "2" || !pendingCollection || !window.ProgressCollection) return;
    var collection = pendingCollection;
    pendingCollection = null;
    if (windowDialog.open) windowDialog.close();
    window.ProgressCollection.collect({
      container:progressDots,
      item:collection.item,
      icon:collection.icon,
      label:collection.label,
      sourceRect:collection.sourceRect
    }).then(function () {
      collected[collection.item] = true;
      renderProgress();
      status.textContent = collection.label + "을 진행도에 기록했습니다.";
      navigation.focus();
    });
  });

  windowAction.addEventListener("click", completeWindow);
  windowBack.addEventListener("click", function () { windowDialog.close(); navigation.focus(); });
  windowClose.addEventListener("click", function () { windowDialog.close(); });

  var dragStart = null;
  var dragDistance = 0;
  windowDragTarget.addEventListener("pointerdown", function (event) {
    if (solved.window) return;
    event.preventDefault();
    dragStart = event.clientX;
    dragDistance = 0;
    windowDragTarget.setPointerCapture(event.pointerId);
    windowDragTarget.classList.add("is-dragging");
  });
  windowDragTarget.addEventListener("click", function (event) {
    if (event.detail !== 0 || solved.window) return;
    windowDialog.classList.add("show-fallback");
    windowAction.focus();
  });
  windowDragTarget.addEventListener("pointermove", function (event) {
    if (dragStart === null || solved.window) return;
    dragDistance = Math.max(0, Math.min(120, event.clientX - dragStart));
    windowDragTarget.style.setProperty("--window-drag-x", dragDistance + "px");
    if (dragDistance >= 92) {
      dragStart = null;
      windowDragTarget.classList.remove("is-dragging");
      completeWindow();
    }
  });
  function cancelWindowDrag(event) {
    if (event && windowDragTarget.hasPointerCapture(event.pointerId)) windowDragTarget.releasePointerCapture(event.pointerId);
    windowDragTarget.classList.remove("is-dragging");
    if (dragStart !== null && !solved.window) {
      windowDialog.dataset.failures = String(Number(windowDialog.dataset.failures || 0) + 1);
      if (Number(windowDialog.dataset.failures) >= 2) windowDialog.classList.add("show-fallback");
      windowDragTarget.style.setProperty("--window-drag-x", "0px");
    }
    dragStart = null;
  }
  windowDragTarget.addEventListener("pointerup", cancelWindowDrag);
  windowDragTarget.addEventListener("pointercancel", cancelWindowDrag);
  window.addEventListener("resize", updateSceneLayout);
  window.addEventListener("orientationchange", function () { window.requestAnimationFrame(updateSceneLayout); });
  settings.addEventListener("click", function () { document.getElementById("settings-button").click(); });
  rules.addEventListener("click", function () { document.getElementById("rules-button").click(); });

  renderProgress();
  updateSceneLayout();
  window.StageTwo = {
    show: show,
    reset: reset,
    room: function () { return room; },
    solved: function () { return Object.assign({}, solved); }
  };
}());
