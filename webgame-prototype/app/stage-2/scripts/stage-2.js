(function () {
  "use strict";

  var screen = document.getElementById("stage-two");
  var frame = document.getElementById("stage-two-frame");
  var livingBackground = frame.querySelector(".stage-two__background--living");
  var kitchenBackground = frame.querySelector(".stage-two__background--kitchen");
  var windowStack = document.getElementById("stage-two-window-stack");
  var windowArt = document.getElementById("stage-two-window-art");
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
  var windowHandleTarget = document.getElementById("stage-two-window-handle-target");
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
  var windowOpenTimer = 0;
  var closedLivingSource = "assets/stage-2/backgrounds/bg-stage2-living-sunset-windowless-v1.jpg";
  var closedWindowSource = "assets/common/props/prop-window-casement-wall-perspective-closed-v4.png";
  var openWindowSource = "assets/common/props/prop-window-casement-wall-perspective-open-v4.png";
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
    var windowLeft = offsetX + 38 * scale;
    var windowTop = offsetY + 50 * scale;
    var windowHeight = 290 * scale;
    var windowWidth = windowHeight * (solved.window ? 687 / 743 : 682 / 743);
    windowStack.style.left = windowLeft + "px";
    windowStack.style.top = windowTop + "px";
    windowStack.style.width = windowWidth + "px";
    windowStack.style.height = windowHeight + "px";
    windowHotspot.style.left = windowLeft + "px";
    windowHotspot.style.top = windowTop + "px";
    windowHotspot.style.width = windowWidth + "px";
    windowHotspot.style.height = windowHeight + "px";
  }

  function render() {
    var nextRoom = room === "living" ? "kitchen" : "living";
    frame.dataset.room = room;
    livingBackground.classList.toggle("is-active", room === "living");
    kitchenBackground.classList.toggle("is-active", room === "kitchen");
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
    window.clearTimeout(windowOpenTimer);
    windowOpenTimer = 0;
    if (windowDialog.open) windowDialog.close();
    room = "living";
    solved.window = false;
    solved.pipe = false;
    collected.window = false;
    collected.pipe = false;
    livingBackground.src = closedLivingSource;
    windowArt.src = closedWindowSource;
    frame.classList.remove("is-window-open");
    windowClosedImage.classList.add("is-active");
    windowOpenImage.classList.remove("is-active");
    windowDialog.classList.remove("is-success", "is-opening");
    windowHandleTarget.disabled = false;
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
    (solved.window ? windowBack : windowHandleTarget).focus();
  });

  function completeWindow() {
    if (solved.window) return;
    windowOpenTimer = 0;
    solved.window = true;
    windowArt.src = openWindowSource;
    frame.classList.add("is-window-open");
    windowClosedImage.classList.remove("is-active");
    windowOpenImage.classList.add("is-active");
    windowCopy.textContent = dialogue.windowSuccess;
    guide.textContent = dialogue.windowSuccess;
    windowHandleTarget.disabled = true;
    windowDialog.classList.remove("is-opening");
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

  function beginWindowOpen() {
    if (solved.window || windowDialog.classList.contains("is-opening")) return;
    windowDialog.classList.add("is-opening");
    windowHandleTarget.disabled = true;
    status.textContent = "창문 손잡이를 눌러 창문을 열고 있습니다.";
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    windowOpenTimer = window.setTimeout(completeWindow, reduceMotion ? 0 : 380);
  }

  windowAction.addEventListener("click", beginWindowOpen);
  windowHandleTarget.addEventListener("click", beginWindowOpen);
  function cancelWindowOpen() {
    if (!windowOpenTimer) return;
    window.clearTimeout(windowOpenTimer);
    windowOpenTimer = 0;
    windowDialog.classList.remove("is-opening");
    windowHandleTarget.disabled = false;
  }
  windowBack.addEventListener("click", function () { cancelWindowOpen(); windowDialog.close(); navigation.focus(); });
  windowClose.addEventListener("click", function () { cancelWindowOpen(); windowDialog.close(); });
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
