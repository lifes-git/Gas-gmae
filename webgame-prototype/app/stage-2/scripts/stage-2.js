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
  var windowBack = document.getElementById("stage-two-window-back");
  var windowTarget = document.getElementById("stage-two-window-target");
  var windowCopy = document.getElementById("stage-two-window-copy");
  var windowGuideCopy = document.getElementById("stage-two-window-guide-copy");
  var windowMascot = document.getElementById("stage-two-window-mascot");
  var windowClosedImage = document.getElementById("stage-two-window-closed-image");
  var windowOpenImage = document.getElementById("stage-two-window-open-image");
  var pipeHotspot = document.getElementById("stage-two-pipe-hotspot");
  var exitDoor = document.getElementById("stage-two-exit-door");
  var pipeDialog = document.getElementById("stage-two-pipe-dialog");
  var pipeClose = document.getElementById("stage-two-pipe-close");
  var pipeBack = document.getElementById("stage-two-pipe-back");
  var pipeCopy = document.getElementById("stage-two-pipe-copy");
  var pipeGuideCopy = document.getElementById("stage-two-pipe-guide-copy");
  var pipeMascot = document.getElementById("stage-two-pipe-mascot");
  var pipeToolChoice = pipeDialog.querySelector(".stage-two-pipe-tool-choice");
  var pipeView = pipeDialog.querySelector(".stage-two-pipe-view");
  var pipeToolButtons = Array.from(pipeDialog.querySelectorAll("[data-pipe-tool]"));
  var pipeKit = document.getElementById("stage-two-pipe-kit");
  var pipeBrush = document.getElementById("stage-two-pipe-brush");
  var pipePoints = Array.from(pipeDialog.querySelectorAll("[data-pipe-point]"));
  var status = document.getElementById("stage-two-status");
  var safetyRuleDialog = document.getElementById("safety-rule-dialog");
  var safetyRuleIcon = document.getElementById("safety-rule-icon");
  var safetyRuleLead = document.getElementById("safety-rule-lead");
  var safetyRuleHighlight = document.getElementById("safety-rule-highlight");
  var safetyRuleConfirm = document.getElementById("safety-rule-confirm");
  var callScene = document.getElementById("stage-two-call-scene");
  var callCopy = document.getElementById("stage-two-call-copy");
  var dialogue = window.SOMYEONGI_STAGE_2_DIALOGUE;
  var room = "living";
  var solved = { window: false, pipe: false };
  var collected = { window: false, pipe: false };
  var windowOpenTimer = 0;
  var pipeCheckTimer = 0;
  var pipeSafetyTimer = 0;
  var endingTimer = 0;
  var endingReady = false;
  var pipeStep = "locked";
  var pipeTool = "none";
  var closedLivingSource = "assets/stage-2/backgrounds/bg-stage2-living-sunset-windowless-v1.jpg";
  var closedWindowSource = "assets/common/props/prop-window-casement-wall-perspective-closed-v4.png";
  var openWindowSource = "assets/common/props/prop-window-casement-wall-perspective-open-v4.png";
  settings.innerHTML = document.getElementById("settings-button").innerHTML;
  guide.textContent = dialogue.intro;

  function playSound(id) {
    if (window.AudioManager) window.AudioManager.play(id);
  }

  function renderProgress() {
    var count = Number(collected.window) + Number(collected.pipe);
    progress.textContent = count + " / 2";
    progressCard.setAttribute("aria-label", "안전점검 진행도 2개 중 " + count + "개 완료");
  }

  function resetEndingSequence() {
    callScene.hidden = true;
    callScene.classList.remove("is-active", "is-dialing", "is-calling", "is-complete");
    callCopy.textContent = dialogue.callPrompt;
    exitDoor.hidden = true;
    exitDoor.disabled = true;
  }

  function startEndingSequence() {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    screen.classList.add("is-call-transition");
    endingTimer = window.setTimeout(function () {
      endingTimer = 0;
      callScene.hidden = false;
      void callScene.offsetWidth;
      callScene.classList.add("is-active");
      callCopy.textContent = dialogue.callPrompt;
      status.textContent = "안전한 실외로 이동했습니다.";
      playSound("storyStep");
      endingTimer = window.setTimeout(beginPhoneDialing, reduceMotion ? 80 : 2800);
    }, reduceMotion ? 80 : 520);
  }

  function beginPhoneDialing() {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    callScene.classList.add("is-dialing");
    status.textContent = "실외에서 가스 전문가의 번호를 누릅니다.";
    playSound("phoneDial");
    endingTimer = window.setTimeout(requestExpertInspection, reduceMotion ? 80 : 2200);
  }

  function requestExpertInspection() {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    callScene.classList.add("is-calling");
    callCopy.textContent = dialogue.callConnecting;
    status.textContent = "안전한 실외에서 소멍이가 가스 전문가에게 점검을 요청하고 있습니다.";
    playSound("phoneRing");
    endingTimer = window.setTimeout(function () {
      callScene.classList.add("is-complete");
      callCopy.textContent = dialogue.callComplete;
      status.textContent = "가스 전문가 점검 요청을 완료했습니다. 점검 전까지 가스를 사용하지 않습니다.";
      playSound("stageComplete");
      endingTimer = window.setTimeout(function () {
        endingTimer = 0;
        if (window.GameEnding) window.GameEnding.show();
      }, reduceMotion ? 120 : 5000);
    }, reduceMotion ? 120 : 4200);
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
    var windowTop = offsetY + 90 * scale;
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
    pipeHotspot.style.left = offsetX + 1436 * scale + "px";
    pipeHotspot.style.top = offsetY + 154 * scale + "px";
    pipeHotspot.style.width = 144 * scale + "px";
    pipeHotspot.style.height = 344 * scale + "px";
    exitDoor.style.left = offsetX + 405 * scale + "px";
    exitDoor.style.top = offsetY + 70 * scale + "px";
    exitDoor.style.width = 230 * scale + "px";
    exitDoor.style.height = 508 * scale + "px";
  }

  function render() {
    var nextRoom = room === "living" ? "kitchen" : "living";
    frame.dataset.room = room;
    livingBackground.classList.toggle("is-active", room === "living");
    kitchenBackground.classList.toggle("is-active", room === "kitchen");
    navigation.dataset.direction = nextRoom === "kitchen" ? "right" : "left";
    navigation.setAttribute("aria-label", nextRoom === "kitchen" ? "주방으로 이동" : "거실로 이동");
    navigation.hidden = endingReady && room === "living";
    windowHotspot.hidden = room !== "living" || solved.window;
    pipeHotspot.hidden = room !== "kitchen";
    pipeHotspot.disabled = solved.pipe;
    pipeHotspot.classList.toggle("is-unlocked", solved.window && !solved.pipe);
    pipeHotspot.classList.toggle("is-locked", !solved.window);
    pipeHotspot.classList.toggle("is-complete", solved.pipe);
    exitDoor.hidden = room !== "living" || !endingReady;
    exitDoor.disabled = room !== "living" || !endingReady;
    pipeHotspot.setAttribute("aria-label", solved.pipe ? "점검을 완료한 주방 가스배관" : solved.window ? "주방 가스배관 연결부 점검" : "환기 후 점검할 주방 가스배관");
    screen.setAttribute("aria-label", room === "living" ? "스테이지 2 노을진 거실" : "스테이지 2 노을진 주방");
    window.requestAnimationFrame(updateSceneLayout);
  }

  function show() {
    if (!screen) return;
    room = "living";
    guide.textContent = collected.pipe
      ? dialogue.allComplete
      : collected.window
        ? dialogue.pipeReady
        : solved.window
          ? dialogue.windowSuccess
          : dialogue.intro;
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
    window.clearTimeout(pipeCheckTimer);
    pipeCheckTimer = 0;
    window.clearTimeout(pipeSafetyTimer);
    pipeSafetyTimer = 0;
    window.clearTimeout(endingTimer);
    endingTimer = 0;
    if (windowDialog.open) windowDialog.close();
    if (pipeDialog.open) pipeDialog.close();
    room = "living";
    endingReady = false;
    solved.window = false;
    solved.pipe = false;
    collected.window = false;
    collected.pipe = false;
    pendingCollection = null;
    resetEndingSequence();
    pipeStep = "locked";
    pipeTool = "none";
    livingBackground.src = closedLivingSource;
    windowArt.src = closedWindowSource;
    frame.classList.remove("is-window-open");
    windowClosedImage.classList.add("is-active");
    windowOpenImage.classList.remove("is-active");
    windowDialog.classList.remove("is-success", "is-opening");
    windowTarget.disabled = false;
    windowMascot.src = "assets/common/mascots/mascot-somyeongi-question-logo-v1.svg";
    windowGuideCopy.classList.remove("is-success");
    windowCopy.textContent = dialogue.windowPrompt;
    pipeCopy.textContent = dialogue.pipeToolPrompt;
    pipeDialog.classList.remove("is-success", "is-checking", "is-tool-ready");
    pipeToolChoice.hidden = false;
    pipeKit.hidden = true;
    pipeKit.classList.remove("is-receiving");
    pipeToolButtons.forEach(function (button) { button.classList.remove("is-wrong"); });
    pipeView.querySelectorAll(".stage-two-pipe-auto-brush").forEach(function (brush) { brush.remove(); });
    pipeGuideCopy.classList.remove("is-success", "is-error");
    pipeMascot.src = "assets/common/mascots/mascot-somyeongi-question-logo-v1.svg";
    pipePoints.forEach(function (point, index) {
      point.classList.toggle("is-active", index === 0);
      point.classList.remove("is-checking", "is-done", "is-leak");
      point.disabled = false;
    });
    pipeHotspot.disabled = false;
    if (window.ProgressCollection) window.ProgressCollection.reset(progressDots);
    renderProgress();
    screen.classList.remove("is-entering", "is-call-transition");
    screen.hidden = true;
    render();
  }

  function hide() {
    window.clearTimeout(endingTimer);
    endingTimer = 0;
    screen.classList.remove("is-entering", "is-call-transition");
    resetEndingSequence();
    screen.hidden = true;
  }

  navigation.addEventListener("click", function () {
    var nextRoom = room === "living" ? "kitchen" : "living";
    navigation.disabled = true;
    var move = function () {
      room = nextRoom;
      render();
      navigation.disabled = false;
      (endingReady && room === "living" ? exitDoor : navigation).focus();
    };
    if (window.AssetLoader) window.AssetLoader.run(nextRoom === "kitchen" ? "stage2Kitchen" : "stage2Living", move);
    else move();
  });
  exitDoor.addEventListener("click", function () {
    if (!endingReady || room !== "living") return;
    exitDoor.disabled = true;
    guide.textContent = dialogue.callPrompt;
    status.textContent = "현관문을 통해 안전한 실외로 이동합니다.";
    playSound("tap");
    startEndingSequence();
  });
  windowHotspot.addEventListener("click", function () {
    windowCopy.textContent = solved.window ? dialogue.windowSuccess : dialogue.windowPrompt;
    windowDialog.classList.toggle("is-success", solved.window);
    windowDialog.showModal();
    (solved.window ? windowBack : windowTarget).focus();
  });

  pipeHotspot.addEventListener("click", function () {
    if (!solved.window) {
      guide.textContent = dialogue.pipeLocked;
      status.textContent = "배관 점검 전에 창문을 열어 자연환기해야 합니다.";
      pipeHotspot.classList.remove("is-denied");
      void pipeHotspot.offsetWidth;
      pipeHotspot.classList.add("is-denied");
      pipeHotspot.focus();
      return;
    }
    var expected = expectedPipePoint();
    pipeCopy.textContent = pipeTool === "soap"
      ? expected === 2 ? dialogue.pipePoint1Success : dialogue.pipeIntro
      : dialogue.pipeToolPrompt;
    pipeDialog.showModal();
    (pipeTool === "soap" && expected ? pipePoints[expected - 1] : pipeToolButtons[0]).focus();
  });
  pipeHotspot.addEventListener("animationend", function () {
    pipeHotspot.classList.remove("is-denied");
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
    windowTarget.disabled = true;
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

  function expectedPipePoint() {
    if (pipeStep === "point1") return 1;
    if (pipeStep === "point2") return 2;
    return 0;
  }

  function pipePointName(number) {
    return number === 1 ? "위쪽" : "가운데";
  }

  function cancelPipeCheck() {
    if (pipeCheckTimer) window.clearTimeout(pipeCheckTimer);
    pipeCheckTimer = 0;
    pipeDialog.classList.remove("is-checking");
    pipeView.querySelectorAll(".stage-two-pipe-auto-brush").forEach(function (brush) { brush.remove(); });
    pipePoints.forEach(function (point) {
      point.classList.remove("is-checking");
      point.disabled = point.classList.contains("is-done");
    });
  }

  function animateBrushToPoint(point, reduced) {
    if (reduced) return;
    var viewRect = pipeView.getBoundingClientRect();
    var startRect = pipeBrush.getBoundingClientRect();
    var pointRect = point.getBoundingClientRect();
    var brush = document.createElement("img");
    brush.className = "stage-two-pipe-auto-brush";
    brush.src = "assets/stage-2/tools/tool-inspection-brush-v1.png";
    brush.alt = "";
    brush.setAttribute("aria-hidden", "true");
    brush.style.left = startRect.left - viewRect.left + "px";
    brush.style.top = startRect.top - viewRect.top + "px";
    brush.style.setProperty("--brush-x", pointRect.left + pointRect.width / 2 - startRect.left - startRect.width * .72 + "px");
    brush.style.setProperty("--brush-y", pointRect.top + pointRect.height / 2 - startRect.top - startRect.height * .5 + "px");
    brush.addEventListener("animationend", function () { brush.remove(); }, { once:true });
    pipeView.appendChild(brush);
  }

  function checkPipePoint(point) {
    var number = Number(point.dataset.pipePoint);
    var expected = expectedPipePoint();
    if (pipeTool !== "soap" || !expected || pipeCheckTimer) return;
    if (number !== expected) {
      pipeCopy.textContent = pipePointName(expected) + " 연결부부터 순서대로 확인하자 멍!";
      status.textContent = pipePointName(expected) + " 배관 연결부를 먼저 점검해야 합니다.";
      return;
    }
    pipeDialog.classList.add("is-checking");
    point.classList.add("is-checking");
    pipePoints.forEach(function (item) { item.disabled = true; });
    status.textContent = pipePointName(number) + " 배관 연결부를 점검하고 있습니다.";
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    playSound("brushScrub");
    animateBrushToPoint(point, reduced);
    pipeCheckTimer = window.setTimeout(function () {
      pipeCheckTimer = 0;
      pipeDialog.classList.remove("is-checking");
      point.classList.remove("is-checking", "is-active");
      point.classList.add("is-done");
      pipePoints.forEach(function (item) { item.disabled = item.classList.contains("is-done"); });
      if (number === 1) {
        playSound("bubbleNormal");
        pipeStep = "point2";
        pipeCopy.textContent = dialogue.pipePoint1Success;
        pipePoints[1].classList.add("is-active");
        pipePoints[1].focus();
      } else {
        playSound("bubbleWarning");
        pipeStep = "leakFound";
        solved.pipe = true;
        point.classList.add("is-leak");
        pipeDialog.classList.add("is-success");
        pipeGuideCopy.classList.add("is-error");
        pipeMascot.src = "assets/common/mascots/mascot-somyeongi-question-logo-v1.svg";
        pipeCopy.textContent = dialogue.pipeLeakFound;
        guide.textContent = dialogue.pipeLeakFound;
        status.textContent = "큰 거품이 확인되어 가스 누출이 의심됩니다.";
        render();
        pipeSafetyTimer = window.setTimeout(function () {
          pipeSafetyTimer = 0;
          showSafetyRuleCard("pipe");
        }, reduced ? 0 : 1100);
      }
    }, reduced ? 0 : 680);
  }

  pipePoints.forEach(function (point) {
    point.addEventListener("click", function () { checkPipePoint(point); });
  });

  function choosePipeTool(tool, button) {
    if (tool === "lighter") {
      playSound("toolWrong");
      button.classList.remove("is-wrong");
      void button.offsetWidth;
      button.classList.add("is-wrong");
      pipeCopy.textContent = dialogue.pipeLighterWrong;
      status.textContent = "불꽃으로 가스 누출을 확인하면 위험합니다.";
      return;
    }
    playSound("toolSelect");
    pipeTool = "soap";
    pipeToolChoice.hidden = true;
    pipeKit.hidden = false;
    pipeKit.classList.remove("is-receiving");
    void pipeKit.offsetWidth;
    pipeKit.classList.add("is-receiving");
    pipeDialog.classList.add("is-tool-ready");
    pipeCopy.textContent = dialogue.pipeIntro;
    status.textContent = "비눗물이 묻은 점검용 붓을 손에 들었습니다.";
    window.setTimeout(function () {
      var expected = expectedPipePoint();
      if (pipeDialog.open && expected) pipePoints[expected - 1].focus();
    }, 520);
  }

  pipeToolButtons.forEach(function (button) {
    button.addEventListener("click", function () { choosePipeTool(button.dataset.pipeTool, button); });
    button.addEventListener("animationend", function () { button.classList.remove("is-wrong"); });
  });

  var pendingCollection = null;
  safetyRuleConfirm.addEventListener("click", function () {
    if (safetyRuleDialog.dataset.stage !== "2") return;
    var item = safetyRuleDialog.dataset.hazard;
    var rule = window.SAFETY_RULE_CARDS[item];
    if (!rule || progressDots.querySelector('[data-progress-item="' + item + '"]').classList.contains("is-collected")) return;
    var collectionSource = item === "pipe"
      ? safetyRuleDialog.querySelector(".safety-rule-step--valve .safety-rule-step__visual")
      : safetyRuleIcon;
    pendingCollection = { item:item, icon:rule.progressIcon || rule.icon, label:rule.label, sourceRect:collectionSource.getBoundingClientRect() };
  });
  safetyRuleDialog.addEventListener("close", function () {
    if (safetyRuleDialog.dataset.stage !== "2" || !pendingCollection || !window.ProgressCollection) return;
    var collection = pendingCollection;
    pendingCollection = null;
    if (windowDialog.open) windowDialog.close();
    if (pipeDialog.open) pipeDialog.close();
    window.ProgressCollection.collect({
      container:progressDots,
      item:collection.item,
      icon:collection.icon,
      label:collection.label,
      sourceRect:collection.sourceRect,
      duration:360
    }).then(function () {
      collected[collection.item] = true;
      playSound("collect");
      if (collection.item === "window" && !solved.pipe) {
        pipeStep = "point1";
        guide.textContent = dialogue.pipeReady;
      }
      if (collection.item === "pipe") {
        pipeStep = "completed";
        endingReady = true;
        guide.textContent = dialogue.allComplete;
      }
      renderProgress();
      status.textContent = collection.label + "을 진행도에 기록했습니다.";
      navigation.focus();
    });
  });

  function beginWindowOpen() {
    if (solved.window || windowDialog.classList.contains("is-opening")) return;
    windowDialog.classList.add("is-opening");
    playSound("windowLatch");
    playSound("windowOpen");
    windowTarget.disabled = true;
    status.textContent = "창문을 열고 있습니다.";
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    windowOpenTimer = window.setTimeout(completeWindow, reduceMotion ? 0 : 380);
  }

  windowTarget.addEventListener("click", beginWindowOpen);
  function cancelWindowOpen() {
    if (!windowOpenTimer) return;
    window.clearTimeout(windowOpenTimer);
    windowOpenTimer = 0;
    windowDialog.classList.remove("is-opening");
    windowTarget.disabled = false;
  }
  windowBack.addEventListener("click", function () { cancelWindowOpen(); windowDialog.close(); navigation.focus(); });
  windowClose.addEventListener("click", function () { cancelWindowOpen(); windowDialog.close(); });
  pipeBack.addEventListener("click", function () { cancelPipeCheck(); pipeDialog.close(); pipeHotspot.focus(); });
  pipeClose.addEventListener("click", function () { cancelPipeCheck(); pipeDialog.close(); pipeHotspot.focus(); });
  window.addEventListener("resize", updateSceneLayout);
  window.addEventListener("orientationchange", function () { window.requestAnimationFrame(updateSceneLayout); });
  settings.addEventListener("click", function () { document.getElementById("settings-button").click(); });
  rules.addEventListener("click", function () { document.getElementById("rules-button").click(); });

  renderProgress();
  updateSceneLayout();
  window.StageTwo = {
    show: show,
    hide: hide,
    reset: reset,
    room: function () { return room; },
    solved: function () { return Object.assign({}, solved); }
  };
}());
