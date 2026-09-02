(function () {
  "use strict";

  var HAZARDS = ["valve", "towel", "butane"];
  var state = {
    solved: new Set(),
    activeHazard: null,
    activeContentKey: null,
    hintTimer: null,
    interactionFailures: 0,
    butaneCarried: false,
    butaneStep: 0
  };

  var elements = {
    intro: document.getElementById("intro-screen"),
    result: document.getElementById("result-screen"),
    app: document.getElementById("app"),
    dialog: document.getElementById("mission-dialog"),
    rulesDialog: document.getElementById("rules-dialog"),
    title: document.getElementById("mission-title"),
    step: document.getElementById("mission-step"),
    copy: document.getElementById("mission-copy"),
    visual: document.getElementById("mission-visual"),
    actions: document.getElementById("mission-actions"),
    feedback: document.getElementById("mission-feedback"),
    guide: document.getElementById("guide-message"),
    live: document.getElementById("live-region"),
    progressText: document.getElementById("progress-text"),
    progressDots: document.getElementById("progress-dots"),
    exitDoor: document.getElementById("exit-door"),
    roomComplete: document.getElementById("room-complete")
  };

  elements.room = document.getElementById("room");
  elements.world = document.getElementById("scene-world");
  elements.console = document.querySelector(".mission-console");
  elements.explanationToggle = document.getElementById("explanation-toggle");
  elements.explanation = document.getElementById("mission-explanation");
  elements.returnRoom = document.getElementById("return-room-button");
  elements.fullscreen = document.getElementById("fullscreen-button");
  elements.rotate = document.getElementById("rotate-screen");
  elements.sizeGate = document.getElementById("size-screen");
  elements.stateLayers = {
    valve: document.getElementById("state-valve"),
    towel: document.getElementById("state-towel"),
    butane: document.getElementById("state-butane")
  };

  var kitchenScenes = window.createKitchenScenes({
    solved: function (id) { return state.solved.has(id); },
    announce: announce,
    complete: function (id) {
      if (state.solved.has(id)) return;
      state.solved.add(id);
      elements.guide.textContent = window.GAME_CONTENT[id].success;
      announce(window.GAME_CONTENT[id].success);
      renderProgress();
    }
  });

  function updateSceneScale() {
    var bounds = elements.room.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    var scale = Math.min(bounds.width / 1672, bounds.height / 941);
    elements.world.style.setProperty("--scene-scale", String(scale));
  }

  function showFallback(reason) {
    if (elements.console.classList.contains("is-success")) return;
    elements.actions.hidden = false;
    if (reason) announce(reason + " 버튼 조작도 사용할 수 있습니다.");
  }

  function registerInteractionFailure(message) {
    state.interactionFailures += 1;
    elements.feedback.className = "mission-feedback is-error";
    elements.feedback.textContent = message;
    announce(message);
    if (state.interactionFailures >= 2) showFallback("두 번 조작이 어려웠어요.");
  }

  function correctAction() {
    return window.GAME_CONTENT[state.activeContentKey].actions.find(function (action) { return action.correct; });
  }

  function resetHintTimer() {
    window.clearTimeout(state.hintTimer);
    elements.room.classList.remove("show-hints");
    if (state.solved.size < HAZARDS.length) {
      state.hintTimer = window.setTimeout(function () {
        var nextHazard = HAZARDS.find(function (hazard) { return !state.solved.has(hazard); });
        var directions = {
          valve: "오른쪽 주방 수납장 쪽을 자세히 살펴보세요.",
          towel: "오른쪽 아래 가스레인지 주변을 살펴보세요.",
          butane: "방 중앙 아래쪽 바닥을 살펴보세요."
        };
        var message = directions[nextHazard] || "집 안을 천천히 둘러보세요.";
        elements.guide.textContent = message;
        announce("소멍이의 위치 힌트. " + message);
      }, 12000);
    }
  }

  function announce(message) {
    elements.live.textContent = "";
    window.setTimeout(function () { elements.live.textContent = message; }, 20);
  }

  function renderProgress() {
    var count = state.solved.size;
    elements.progressText.textContent = count + " / 3";
    Array.from(elements.progressDots.children).forEach(function (dot, index) {
      dot.classList.toggle("solved", index < count);
    });

    HAZARDS.forEach(function (hazard) {
      var solved = state.solved.has(hazard);
      elements.stateLayers[hazard].hidden = !solved;
      document.querySelectorAll('[data-hazard="' + hazard + '"], [data-open-hazard="' + hazard + '"]').forEach(function (button) {
        if (!button.dataset.baseLabel) {
          button.dataset.baseLabel = button.getAttribute("aria-label") || button.textContent.trim();
        }
        button.classList.toggle("is-solved", solved);
        button.setAttribute("aria-label", solved ? button.dataset.baseLabel + " 해결 완료" : button.dataset.baseLabel);
        if (button.matches("[data-open-hazard]")) {
          button.querySelector("span").textContent = solved ? "✓" : "○";
        }
      });
    });

    var complete = count === HAZARDS.length;
    elements.exitDoor.disabled = !complete;
    elements.exitDoor.classList.toggle("is-ready", complete);
    elements.exitDoor.setAttribute("aria-label", complete ? "외출하기" : "모든 위험요소를 해결하면 활성화되는 현관문");
    elements.roomComplete.hidden = !complete;
    if (complete) {
      elements.guide.textContent = "모든 위험요소를 해결했어요! 현관문을 눌러 안전하게 외출해요.";
      announce("3가지 위험요소를 모두 해결했습니다. 외출하기 버튼이 활성화되었습니다.");
    }
    if (kitchenScenes) kitchenScenes.render();
  }

  function makeActionButton(action) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = action.label;
    button.dataset.actionId = action.id;
    button.addEventListener("click", function () { handleChoice(action); });
    return button;
  }

  function addInstruction(text) {
    var instruction = document.createElement("span");
    instruction.className = "interaction-instruction";
    instruction.textContent = text;
    elements.visual.appendChild(instruction);
    return instruction;
  }

  function addButaneTracker() {
    var tracker = document.createElement("ol");
    tracker.className = "butane-step-tracker";
    ["발견", "집기", "실외 이동", "잔여가스 제거"].forEach(function (label) {
      var item = document.createElement("li");
      item.textContent = label;
      tracker.appendChild(item);
    });
    elements.visual.appendChild(tracker);
    renderButaneTracker();
  }

  function renderButaneTracker() {
    var complete = state.solved.has("butane");
    elements.visual.querySelectorAll(".butane-step-tracker li").forEach(function (item, index) {
      item.classList.toggle("is-complete", complete || index < state.butaneStep);
      item.classList.toggle("is-current", !complete && index === state.butaneStep);
      item.setAttribute("aria-current", !complete && index === state.butaneStep ? "step" : "false");
    });
  }

  function addDropZone(className, text) {
    var zone = document.createElement("div");
    zone.className = "interaction-hint " + className;
    zone.textContent = text;
    elements.visual.appendChild(zone);
    return zone;
  }

  function addOutdoorDoor() {
    var door = document.createElement("button");
    door.type = "button";
    door.className = "outdoor-door";
    door.setAttribute("aria-disabled", "true");
    door.innerHTML = '<span class="outdoor-door-view" aria-hidden="true"></span><strong>문밖의 통풍이 잘되는 곳</strong><span class="outdoor-door-guide">부탄캔을 먼저 집어주세요</span>';
    elements.visual.appendChild(door);
    return door;
  }

  function addInventoryTray(filled) {
    var tray = document.createElement("button");
    tray.type = "button";
    tray.className = "inventory-tray" + (filled ? " is-filled" : "");
    tray.setAttribute("aria-label", filled ? "현재 들고 있는 물건: 다 쓴 부탄캔" : "현재 들고 있는 물건 없음");
    tray.innerHTML = '<span class="inventory-hand" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M8 17V8.5a2 2 0 0 1 4 0V15 6.5a2 2 0 0 1 4 0V15 8a2 2 0 0 1 4 0v7-4a2 2 0 0 1 4 0v8c0 6-4 10-10 10h-1c-4 0-7-2-9-5l-3-5a2.3 2.3 0 0 1 4-2Z"/></svg></span><span class="inventory-copy"><small>현재 들고 있는 물건</small><strong>' + (filled ? '다 쓴 부탄캔' : '비어 있음') + '</strong></span><img src="assets/runtime/props/prop-butane-scene-v3.png" alt="">';
    elements.visual.appendChild(tray);
    return tray;
  }

  function fillInventory(tray) {
    tray.classList.add("is-filled");
    tray.setAttribute("aria-label", "현재 들고 있는 물건: 다 쓴 부탄캔");
    tray.querySelector(".inventory-copy strong").textContent = "다 쓴 부탄캔";
  }

  function enableButanePickup(prop, door, instruction, inventory) {
    var picked = state.butaneCarried;

    prop.classList.add("is-pickable");
    prop.tabIndex = 0;
    prop.setAttribute("role", "button");
    prop.setAttribute("aria-label", "다 쓴 부탄캔 집기");

    function showPickedState(moveFocus) {
      prop.classList.add("is-picked");
      prop.setAttribute("aria-pressed", "true");
      prop.hidden = true;
      var pickupRing = elements.visual.querySelector(".interaction-target-ring-butane");
      if (pickupRing) pickupRing.hidden = true;
      fillInventory(inventory);
      door.classList.add("is-ready");
      door.setAttribute("aria-disabled", "false");
      door.querySelector(".outdoor-door-guide").textContent = "이 문을 눌러 실외로 이동";
      instruction.textContent = "부탄캔을 집었어요. 이제 열린 문을 선택하세요";
      elements.copy.textContent = "부탄캔을 집었어요. 문밖의 통풍이 잘되는 곳으로 이동할까요?";
      if (moveFocus) {
        announce("부탄캔을 집어 현재 들고 있는 물건 칸에 넣었습니다. 오른쪽 열린 문을 선택하세요.");
        door.focus();
      }
    }

    function pickCan() {
      if (picked) return;
      picked = true;
      state.butaneCarried = true;
      state.butaneStep = 1;
      renderButaneTracker();
      showPickedState(true);
    }

    prop.addEventListener("click", pickCan);
    prop.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        pickCan();
      }
    });
    door.addEventListener("click", function () {
      if (!picked) {
        elements.feedback.className = "mission-feedback is-error";
        elements.feedback.textContent = "먼저 다 쓴 부탄캔을 클릭해 집어주세요.";
        announce("먼저 다 쓴 부탄캔을 클릭해 집어주세요.");
        prop.focus();
        return;
      }
      handleChoice(correctAction());
    });
    if (picked) showPickedState(false);
  }

  function enableOutdoorInventory(inventory, prop, nozzle, instruction) {
    prop.hidden = true;
    nozzle.hidden = true;
    inventory.classList.add("is-selectable");
    inventory.setAttribute("aria-label", "현재 들고 있는 다 쓴 부탄캔 선택하기");
    instruction.textContent = "현재 들고 있는 부탄캔을 선택하세요";
    elements.copy.textContent = "실외로 이동했어요. 현재 들고 있는 부탄캔을 선택해 안전 처리를 계속해요.";
    inventory.addEventListener("click", function () {
      if (inventory.classList.contains("is-selected")) return;
      inventory.classList.add("is-selected");
      inventory.setAttribute("aria-pressed", "true");
      prop.hidden = false;
      nozzle.hidden = false;
      instruction.textContent = "강조된 노즐을 원이 찰 때까지 눌러요";
      elements.copy.textContent = "통풍이 잘되는 실외예요. 부탄캔을 거꾸로 들고 노즐을 눌러요.";
      state.butaneStep = 3;
      renderButaneTracker();
      announce("현재 들고 있는 부탄캔을 선택했습니다. 강조된 노즐을 길게 누르세요.");
      nozzle.focus();
    });
  }

  function enableDrag(prop, zone, failureMessage) {
    var start = null;
    var origin = null;
    prop.classList.add("is-interactive");
    prop.addEventListener("pointerdown", function (event) {
      event.preventDefault();
      var propRect = prop.getBoundingClientRect();
      var visualRect = elements.visual.getBoundingClientRect();
      start = { x: event.clientX, y: event.clientY };
      origin = { left: propRect.left - visualRect.left, top: propRect.top - visualRect.top };
      prop.style.left = origin.left + "px";
      prop.style.top = origin.top + "px";
      prop.style.right = "auto";
      prop.style.bottom = "auto";
      prop.setPointerCapture(event.pointerId);
      prop.classList.add("is-dragging");
    });
    prop.addEventListener("pointermove", function (event) {
      if (!start) return;
      prop.style.left = origin.left + event.clientX - start.x + "px";
      prop.style.top = origin.top + event.clientY - start.y + "px";
    });
    prop.addEventListener("pointerup", function (event) {
      if (!start) return;
      prop.releasePointerCapture(event.pointerId);
      prop.classList.remove("is-dragging");
      var propRect = prop.getBoundingClientRect();
      var zoneRect = zone.getBoundingClientRect();
      var centerX = propRect.left + propRect.width / 2;
      var centerY = propRect.top + propRect.height / 2;
      var success = centerX >= zoneRect.left && centerX <= zoneRect.right && centerY >= zoneRect.top && centerY <= zoneRect.bottom;
      start = null;
      if (success) {
        prop.style.left = zoneRect.left - elements.visual.getBoundingClientRect().left + (zoneRect.width - propRect.width) / 2 + "px";
        prop.style.top = zoneRect.top - elements.visual.getBoundingClientRect().top + (zoneRect.height - propRect.height) / 2 + "px";
        handleChoice(correctAction());
      } else {
        prop.classList.add("is-snapping");
        prop.style.left = origin.left + "px";
        prop.style.top = origin.top + "px";
        window.setTimeout(function () { prop.classList.remove("is-snapping"); }, 200);
        registerInteractionFailure(failureMessage);
      }
    });
    prop.addEventListener("pointercancel", function () { start = null; prop.classList.remove("is-dragging"); });
  }

  function enableValveTurn(prop) {
    var startX = null;
    var angle = 0;
    prop.classList.add("is-interactive");
    var guide = document.createElement("span");
    guide.className = "valve-turn-guide";
    elements.visual.appendChild(guide);
    prop.addEventListener("pointerdown", function (event) {
      startX = event.clientX;
      prop.setPointerCapture(event.pointerId);
      prop.classList.add("is-dragging");
    });
    prop.addEventListener("pointermove", function (event) {
      if (startX === null) return;
      angle = Math.max(0, Math.min(90, (event.clientX - startX) * 5));
      prop.style.transform = "rotate(" + angle + "deg)";
      if (angle >= 70) {
        startX = null;
        prop.classList.remove("is-dragging");
        prop.style.transform = "rotate(90deg)";
        handleChoice(correctAction());
      }
    });
    function finishTurn(event) {
      if (startX === null) return;
      if (prop.hasPointerCapture && prop.hasPointerCapture(event.pointerId)) prop.releasePointerCapture(event.pointerId);
      prop.classList.remove("is-dragging");
      startX = null;
      if (angle >= 70) {
        prop.style.transform = "rotate(90deg)";
        handleChoice(correctAction());
      } else {
        angle = 0;
        prop.style.transform = "rotate(0deg)";
        registerInteractionFailure("손잡이를 오른쪽으로 90도 돌려 잠가요.");
      }
    }
    prop.addEventListener("pointerup", finishTurn);
    window.addEventListener("pointerup", finishTurn);
  }

  function enableNozzleHold(nozzle) {
    var timer = null;
    var started = 0;
    var frame = null;
    var ring = document.createElement("span");
    ring.className = "hold-progress";
    nozzle.appendChild(ring);
    nozzle.classList.add("is-interactive");
    function update() {
      var progress = Math.min(100, (performance.now() - started) / 9);
      ring.style.setProperty("--hold", progress + "%");
      if (progress < 100) frame = requestAnimationFrame(update);
    }
    function cancel() {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      timer = null;
      ring.style.setProperty("--hold", "0%");
    }
    nozzle.addEventListener("pointerdown", function (event) {
      event.preventDefault();
      nozzle.setPointerCapture(event.pointerId);
      started = performance.now();
      update();
      timer = window.setTimeout(function () { timer = null; handleChoice(correctAction()); }, 900);
    });
    nozzle.addEventListener("pointerup", function (event) {
      if (timer) {
        nozzle.releasePointerCapture(event.pointerId);
        cancel();
        registerInteractionFailure("노즐을 원이 가득 찰 때까지 잠시 눌러주세요.");
      }
    });
    nozzle.addEventListener("pointercancel", cancel);
  }

  function renderMissionVisual(visualName) {
    var propPaths = {
      valve: "assets/runtime/props/prop-valve-handle-scene-v3.png",
      towel: "assets/runtime/props/prop-towel-scene-v3.png",
      butane: "assets/runtime/props/prop-butane-scene-v3.png",
      "butane-outdoor": "assets/runtime/props/prop-butane-scene-v3.png"
    };
    elements.visual.className = "mission-visual visual-" + visualName;
    elements.visual.replaceChildren();

    var mascot = document.createElement("img");
    mascot.className = "mission-mascot mission-mascot-" + visualName;
    mascot.src = visualName === "towel"
      ? "assets/runtime/mascots/mascot-somyeongi-caution-v1.png"
      : visualName === "butane-outdoor"
        ? "assets/runtime/mascots/mascot-somyeongi-success-v1.png"
        : "assets/runtime/mascots/mascot-somyeongi-question-v1.png";
    mascot.alt = "";
    elements.visual.appendChild(mascot);

    if (visualName === "towel") {
      var basket = document.createElement("img");
      basket.className = "mission-prop mission-basket";
      basket.src = "assets/runtime/props/prop-basket-empty-v1.png";
      basket.alt = "";
      elements.visual.appendChild(basket);
    }

    var prop = document.createElement("img");
    prop.className = "mission-prop mission-prop-" + visualName;
    prop.src = propPaths[visualName];
    prop.alt = "";
    elements.visual.appendChild(prop);

    if (visualName === "butane" || visualName === "butane-outdoor") addButaneTracker();

    if (visualName === "towel" || visualName === "butane") {
      var targetRing = document.createElement("span");
      targetRing.className = "interaction-target-ring interaction-target-ring-" + visualName;
      targetRing.setAttribute("aria-hidden", "true");
      elements.visual.appendChild(targetRing);
    }

    var stateLabel = document.createElement("span");
    stateLabel.className = "mission-state-label";
    stateLabel.textContent = visualName === "valve" ? "열림" : visualName === "butane-outdoor" ? "통풍이 잘되는 실외" : "";
    if (stateLabel.textContent) elements.visual.appendChild(stateLabel);

    if (visualName === "butane-outdoor") {
      var nozzle = document.createElement("span");
      nozzle.className = "nozzle-focus";
      nozzle.setAttribute("role", "button");
      nozzle.setAttribute("aria-label", "부탄캔 노즐을 길게 누르기");
      nozzle.tabIndex = 0;
      elements.visual.appendChild(nozzle);
    }

    if (visualName === "valve") {
      addInstruction("밸브 손잡이를 잡고 오른쪽으로 돌려요");
      enableValveTurn(prop);
    } else if (visualName === "towel") {
      addInstruction("수건을 안전 보관 바구니로 옮겨요");
      enableDrag(prop, addDropZone("drop-zone-towel", "안전 보관 바구니"), "수건은 화기와 떨어진 보관 바구니로 옮겨요.");
    } else if (visualName === "butane") {
      var butaneInstruction = addInstruction("부탄캔을 클릭해 집어주세요");
      enableButanePickup(prop, addOutdoorDoor(), butaneInstruction, addInventoryTray(state.butaneCarried));
    } else if (visualName === "butane-outdoor") {
      var outdoorInstruction = addInstruction("현재 들고 있는 부탄캔을 선택하세요");
      enableOutdoorInventory(addInventoryTray(true), prop, nozzle, outdoorInstruction);
      enableNozzleHold(nozzle);
    }
  }

  function openMission(hazard, contentKey) {
    if (kitchenScenes.open(hazard)) { window.clearTimeout(state.hintTimer); return; }
    if (state.solved.has(hazard)) {
      announce("이미 해결한 위험요소입니다.");
      return;
    }
    window.clearTimeout(state.hintTimer);
    state.activeHazard = hazard;
    state.activeContentKey = contentKey || hazard;
    state.interactionFailures = 0;
    var content = window.GAME_CONTENT[state.activeContentKey];
    elements.title.textContent = content.title;
    elements.step.textContent = content.hud || "가스안전 미션";
    elements.copy.textContent = content.copy;
    renderMissionVisual(content.visual);
    elements.actions.replaceChildren();
    var fallbackLabel = document.createElement("p");
    fallbackLabel.className = "fallback-label";
    fallbackLabel.textContent = "조작이 어려운가요? 버튼으로 안전 행동을 실행할 수 있어요.";
    elements.actions.appendChild(fallbackLabel);
    content.actions.filter(function (action) { return action.correct; }).forEach(function (action) { elements.actions.appendChild(makeActionButton(action)); });
    elements.actions.hidden = true;
    elements.feedback.textContent = "";
    elements.console.classList.remove("is-success");
    elements.returnRoom.hidden = true;
    elements.explanationToggle.hidden = true;
    elements.explanation.hidden = true;
    elements.explanation.textContent = content.explanation || "";
    if (!elements.dialog.open) {
      var hotspot = document.querySelector('[data-hazard="' + hazard + '"]');
      var rect = hotspot.getBoundingClientRect();
      var roomRect = elements.room.getBoundingClientRect();
      elements.room.style.setProperty("--zoom-x", ((rect.left + rect.width / 2 - roomRect.left) / roomRect.width * 100) + "%");
      elements.room.style.setProperty("--zoom-y", ((rect.top + rect.height / 2 - roomRect.top) / roomRect.height * 100) + "%");
      elements.room.classList.add("is-zooming");
      window.setTimeout(function () {
        elements.room.classList.remove("is-zooming");
        elements.dialog.showModal();
        window.setTimeout(function () { elements.dialog.querySelector(".icon-button")?.focus(); }, 0);
      }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300);
      return;
    }
    window.setTimeout(function () { elements.dialog.querySelector(".icon-button")?.focus(); }, 0);
  }

  function handleChoice(action) {
    var content = window.GAME_CONTENT[state.activeContentKey];

    if (!action.correct) {
      elements.feedback.className = "mission-feedback is-error";
      elements.feedback.textContent = content.error;
      announce(content.error);
      return;
    }

    if (action.next) {
      state.butaneCarried = true;
      state.butaneStep = 2;
      openMission("butane", action.next);
      return;
    }

    var hazard = state.activeHazard;
    if (hazard === "butane") state.butaneCarried = false;
    if (hazard === "butane") state.butaneStep = 4;
    state.solved.add(hazard);
    if (hazard === "butane") renderButaneTracker();
    elements.visual.querySelectorAll(".interaction-target-ring, .valve-turn-guide, .nozzle-focus").forEach(function (target) {
      target.hidden = true;
    });
    elements.feedback.className = "mission-feedback is-success";
    elements.feedback.textContent = content.success;
    announce(content.success);
    renderProgress();
    elements.console.classList.add("is-success");
    elements.returnRoom.hidden = false;
    elements.explanationToggle.hidden = !content.explanation;
    elements.returnRoom.focus();
  }

  function resetGame() {
    state.solved.clear();
    state.activeHazard = null;
    state.activeContentKey = null;
    state.butaneCarried = false;
    state.butaneStep = 0;
    kitchenScenes.reset();
    elements.result.hidden = true;
    elements.app.hidden = false;
    elements.guide.textContent = "장기간 외출하기 전, 집 안의 3가지 위험요소를 안전하게 해결해요!";
    document.querySelectorAll(".is-solved").forEach(function (item) { item.classList.remove("is-solved"); });
    renderProgress();
    resetHintTimer();
  }

  let speechBubbleTimeout;
  function showSpeechBubbleTemporarily() {
    const speechBubble = document.getElementById("speech-bubble");
    if (!speechBubble) return;
    speechBubble.style.opacity = "1";
    speechBubble.style.pointerEvents = "auto";
    clearTimeout(speechBubbleTimeout);
    speechBubbleTimeout = setTimeout(() => {
      speechBubble.style.opacity = "0";
      speechBubble.style.pointerEvents = "none";
    }, 3000);
  }

  document.querySelectorAll("[data-hazard]").forEach(function (button) {
    button.addEventListener("click", function () { resetHintTimer(); openMission(button.dataset.hazard); });
  });
  document.querySelectorAll("[data-open-hazard]").forEach(function (button) {
    button.addEventListener("click", function () { openMission(button.dataset.openHazard); });
  });

  document.getElementById("start-button").addEventListener("click", function () {
    elements.intro.hidden = true;
    elements.app.hidden = false;
    document.querySelector('.scene-navigation').focus();
    announce("게임이 시작되었습니다. 위험요소 3개를 찾아보세요.");
    resetHintTimer();
    showSpeechBubbleTemporarily();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Tab" && elements.dialog.open) showFallback("키보드 입력을 감지했어요.");
  });

  elements.fullscreen.addEventListener("click", async function () {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        if (screen.orientation && screen.orientation.lock) {
          try { await screen.orientation.lock("landscape"); } catch (orientationError) { /* optional capability */ }
        }
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      announce("이 브라우저에서는 전체화면을 시작할 수 없어요.");
    }
  });

  document.addEventListener("fullscreenchange", function () {
    var active = Boolean(document.fullscreenElement);
    elements.fullscreen.innerHTML = active ? "↙ <span>전체화면 종료</span>" : "⛶ <span>전체화면</span>";
    elements.fullscreen.setAttribute("aria-label", active ? "전체화면 종료" : "전체화면으로 보기");
    window.requestAnimationFrame(updateSceneScale);
  });

  function updateOrientationGate() {
    var mobilePortrait = window.matchMedia("(pointer: coarse)").matches && window.matchMedia("(orientation: portrait)").matches;
    var viewport = window.visualViewport || window;
    var tooSmall = !mobilePortrait && (viewport.width < 568 || viewport.height < 300);
    elements.rotate.hidden = !mobilePortrait;
    elements.sizeGate.hidden = !tooSmall;
    document.body.classList.toggle("orientation-blocked", mobilePortrait);
    document.body.classList.toggle("size-blocked", tooSmall);
  }
  window.addEventListener("resize", function () {
    updateOrientationGate();
    updateSceneScale();
  });
  window.addEventListener("orientationchange", function () {
    updateOrientationGate();
    window.requestAnimationFrame(updateSceneScale);
  });
  updateOrientationGate();
  updateSceneScale();
  window.requestAnimationFrame(updateSceneScale);

  elements.returnRoom.addEventListener("click", function () {
    elements.dialog.close();
    state.activeHazard = null;
    elements.console.classList.remove("is-success");
    resetHintTimer();
    document.getElementById("game-scene").focus({ preventScroll: true });
  });

  elements.explanationToggle.addEventListener("click", function () {
    var willOpen = elements.explanation.hidden;
    elements.explanation.hidden = !willOpen;
    elements.explanationToggle.textContent = willOpen ? "설명 닫기" : "왜 안전한가요?";
    elements.explanationToggle.setAttribute("aria-expanded", String(willOpen));
  });

  elements.dialog.addEventListener("close", function () {
    if (state.activeHazard === "butane" && !state.solved.has("butane")) {
      state.butaneCarried = false;
      state.butaneStep = 0;
    }
    elements.console.classList.remove("is-success");
    resetHintTimer();
  });

  document.getElementById("rules-button").addEventListener("click", function () { elements.rulesDialog.showModal(); });
  var introRulesButton = document.getElementById("intro-rules-button");
  if (introRulesButton) {
    introRulesButton.addEventListener("click", function () { elements.rulesDialog.showModal(); });
  }
  document.getElementById("result-rules-button").addEventListener("click", function () { elements.rulesDialog.showModal(); });
  document.getElementById("restart-button").addEventListener("click", resetGame);
  document.getElementById("size-fullscreen-button").addEventListener("click", function () { elements.fullscreen.click(); });

  elements.exitDoor.addEventListener("click", function () {
    if (elements.exitDoor.disabled) return;
    elements.app.hidden = true;
    elements.result.hidden = false;
    document.getElementById("result-title").focus();
  });

  const mascotArt = document.getElementById("mascot-art");
  if (mascotArt) {
    mascotArt.addEventListener("click", function() {
      showSpeechBubbleTemporarily();
    });
  }

  renderProgress();
}());
