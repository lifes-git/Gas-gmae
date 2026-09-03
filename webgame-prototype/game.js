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
    started: false
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
  elements.missionSpeech = document.querySelector(".mission-speech");
  elements.missionMascot = document.querySelector(".mission-dialogue > img");
  elements.guideMascot = document.getElementById("mascot-art");
  elements.fullscreen = document.getElementById("fullscreen-button");
  elements.settings = document.getElementById("settings-dialog");
  elements.soundSetting = document.getElementById("sound-setting");
  elements.music = document.getElementById("background-music");
  elements.vibrationSetting = document.getElementById("vibration-setting");
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
    sound: playFeedback,
    guide: function (message) { elements.guide.textContent = message; },
    hold: function (item) {
      state.butaneCarried = item === "butane";
      if (item) playFeedback(item === "towel" ? "cloth" : "can");
    },
    complete: function (id) {
      if (state.solved.has(id)) return;
      state.solved.add(id);
      elements.guide.textContent = id === "valve" ? "밸브 잠금 완료!" : "수건 이동 완료!";
      elements.guideMascot.src = "assets/runtime/mascots/mascot-somyeongi-success-v1.png";
      playFeedback("success");
      announce(window.GAME_CONTENT[id].success);
      renderProgress();
    }
  });

  var effectContext;
  var itemSoundEndsAt = 0;
  function playFeedback(kind) {
    if ((kind === "success" || kind === "error") && elements.vibrationSetting.checked && navigator.vibrate) navigator.vibrate(kind === "success" ? 45 : [25, 35, 25]);
    if (!elements.soundSetting.checked) return;
    try {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      var context = effectContext || (effectContext = new AudioContextClass());
      if (context.state === "suspended") context.resume().catch(function () {});
      // Approved preview: button B, cloth A (-25%), can A; preview master was 0.6.
      if (kind === "tap" || kind === "open" || kind === "can") {
        var partials = kind === "can" ? [1, 2.31, 3.87] : [1];
        partials.forEach(function (ratio, index) {
          var tone = context.createOscillator(), level = context.createGain();
          var begin = context.currentTime;
          var length = kind === "can" ? .22 + index * .035 : .16;
          var frequency = kind === "can" ? 410 * ratio : 650;
          tone.frequency.setValueAtTime(frequency, begin);
          tone.frequency.exponentialRampToValueAtTime(kind === "can" ? frequency * .97 : 260, begin + length);
          level.gain.setValueAtTime(0, begin);
          level.gain.linearRampToValueAtTime((kind === "can" ? .14 / (index + 1) : .25) * .6, begin + (kind === "can" ? .018 : .015));
          level.gain.exponentialRampToValueAtTime(.00006, begin + length);
          tone.connect(level); level.connect(context.destination);
          tone.start(); tone.stop(begin + length + .01);
          tone.onended = function () { tone.disconnect(); level.disconnect(); };
          if (kind === "can") itemSoundEndsAt = Math.max(itemSoundEndsAt, begin + length + .01);
        });
        return;
      }
      if (kind === "cloth" || kind === "basket") {
        var length = kind === "cloth" ? .65 : .42;
        var rustle = context.createBufferSource();
        var clothBuffer = context.createBuffer(1, Math.ceil(context.sampleRate * length), context.sampleRate);
        var data = clothBuffer.getChannelData(0), seed = 7241;
        for (var j = 0; j < data.length; j++) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          var t = j / data.length;
          data[j] = (seed / 2147483648 - 1) * Math.pow(Math.sin(Math.PI * t), 2) * (.7 + .3 * Math.sin(t * 24));
        }
        rustle.buffer = clothBuffer;
        var clothFilter = context.createBiquadFilter(), clothGain = context.createGain();
        clothFilter.type = "bandpass"; clothFilter.Q.value = .5; clothFilter.frequency.value = 1700;
        clothGain.gain.value = .32 * .6 * .75;
        rustle.connect(clothFilter); clothFilter.connect(clothGain); clothGain.connect(context.destination);
        rustle.start(); itemSoundEndsAt = context.currentTime + length;
        rustle.onended = function () { rustle.disconnect(); clothFilter.disconnect(); clothGain.disconnect(); };
        return;
      }
      var materials = {
        hiss:[.95,4200,.12]
      };
      if (materials[kind]) {
        var spec = materials[kind];
        var source = context.createBufferSource();
        var buffer = context.createBuffer(1, Math.ceil(context.sampleRate * spec[0]), context.sampleRate);
        var samples = buffer.getChannelData(0);
        for (var i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
        source.buffer = buffer;
        var filter = context.createBiquadFilter();
        filter.type = "bandpass"; filter.frequency.value = spec[1];
        filter.Q.value = .55;
        filter.frequency.exponentialRampToValueAtTime(spec[1] * .65, context.currentTime + spec[0]);
        var envelope = context.createGain();
        var now = context.currentTime;
        envelope.gain.setValueAtTime(0, now);
        // A soft attack and sustained rustle, rather than an impact-shaped click.
        envelope.gain.linearRampToValueAtTime(spec[2], now + .09);
        envelope.gain.linearRampToValueAtTime(spec[2] * .65, now + spec[0] * .65);
        envelope.gain.exponentialRampToValueAtTime(.001, now + spec[0]);
        source.connect(filter); filter.connect(envelope); envelope.connect(context.destination);
        source.start();
        source.onended = function () { source.disconnect(); filter.disconnect(); envelope.disconnect(); };
        var stopped = false;
        return function () {
          if (!stopped) {
            stopped = true;
            envelope.gain.cancelScheduledValues(context.currentTime);
            envelope.gain.setTargetAtTime(.0001, context.currentTime, .008);
            source.stop(context.currentTime + .035);
          }
        };
      }
      var notes = ({success:[523,659,784], finish:[523,659,784,1047], pickup:[660,880], move:[659,988], door:[659,988], open:[880,1320], error:[220,196], tap:[1047,1568], can:[1175,1810], latch:[1397,2095], turn:[480]})[kind] || [880];
      var travel = kind === "move" || kind === "door";
      var metallic = kind === "can" || kind === "latch";
      var duration = travel ? .42 : metallic ? .36 : .28;
      notes.forEach(function (frequency, index) {
        var oscillator = context.createOscillator();
        var gain = context.createGain();
        var at = (kind === "success" ? Math.max(context.currentTime + .32, itemSoundEndsAt + .06) : context.currentTime) + index * (metallic ? .025 : .085);
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        if (travel || kind === "turn") oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.18, at + duration);
        gain.gain.setValueAtTime(0, at);
        gain.gain.linearRampToValueAtTime(kind === "turn" ? .035 : kind === "success" ? .045 : .065, at + (travel ? .07 : .025));
        gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
        oscillator.connect(gain); gain.connect(context.destination);
        oscillator.start(at); oscillator.stop(at + duration + .025);
        oscillator.onended = function () { oscillator.disconnect(); gain.disconnect(); };
      });
    } catch (error) { /* visual feedback remains available */ }
  }

  function syncBackgroundMusic() {
    if (!elements.music) return;
    // A single audio element owns both tracks: two songs can never overlap.
    var completion = !elements.result.hidden;
    var track = completion ? "Walking_Toward_The_Sun.mp3" : "Suitcase_and_Sunlight.mp3";
    if (elements.music.getAttribute("src") !== track) {
      elements.music.pause();
      elements.music.setAttribute("src", track);
      elements.music.load();
    }
    elements.music.loop = !completion;
    elements.music.volume = .16;
    if (!elements.soundSetting.checked || document.hidden) {
      elements.music.pause();
      return;
    }
    if (!elements.music.paused || (completion && elements.music.ended)) return;
    var playback = elements.music.play();
    if (playback && playback.catch) playback.catch(function () { /* a later user gesture can retry */ });
  }

  function setMissionStatus(kind, message) {
    elements.missionSpeech.classList.remove("is-error", "is-success");
    // All instructional feedback belongs to the mascot, not a second banner.
    elements.feedback.hidden = true;
    elements.feedback.textContent = "";
    if (message) elements.copy.textContent = message;
    if (!kind) {
      elements.missionMascot.src = "assets/runtime/mascots/mascot-somyeongi-question-v1.png";
      return;
    }
    elements.missionSpeech.classList.add("is-" + kind);
    elements.missionMascot.src = kind === "success"
      ? "assets/runtime/mascots/mascot-somyeongi-success-v1.png"
      : "assets/runtime/mascots/mascot-somyeongi-caution-v1.png";
    playFeedback(kind);
  }

  function updateSceneScale() {
    var bounds = elements.room.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    var scale = bounds.width / 1672;
    elements.world.style.setProperty("--scene-scale", String(scale));
  }

  function showFallback(reason) {
    if (elements.console.classList.contains("is-success")) return;
    elements.actions.hidden = false;
    if (reason) announce(reason + " 버튼 조작도 사용할 수 있습니다.");
  }

  function registerInteractionFailure(message) {
    state.interactionFailures += 1;
    setMissionStatus("error", message);
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
      elements.guide.textContent = "점검 완료! 현관문으로 나가요.";
      announce("3가지 위험요소를 모두 해결했습니다. 외출하기 버튼이 활성화되었습니다.");
    }
    if (kitchenScenes) kitchenScenes.render();
  }

  function makeActionButton(action) {
    var button = window.GameUI
      ? window.GameUI.createButton({label:action.label, className:"choice-button", variant:"primary"})
      : document.createElement("button");
    if (!window.GameUI) {
      button.type = "button";
      button.className = "choice-button";
      button.textContent = action.label;
    }
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
    tray.innerHTML = '<span class="inventory-hand" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M8 17V8.5a2 2 0 0 1 4 0V15 6.5a2 2 0 0 1 4 0V15 8a2 2 0 0 1 4 0v7-4a2 2 0 0 1 4 0v8c0 6-4 10-10 10h-1c-4 0-7-2-9-5l-3-5a2.3 2.3 0 0 1 4-2Z"/></svg></span><span class="inventory-copy"><small>현재 들고 있는 물건</small><strong>' + (filled ? '다 쓴 부탄캔' : '비어 있음') + '</strong></span><img src="assets/runtime/props/prop-butane-red-v4.png" alt="">';
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
        setMissionStatus("error", "먼저 다 쓴 부탄캔을 클릭해 집어주세요.");
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
      angle = Math.max(0, Math.min(90, (startX - event.clientX) * 5));
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
        registerInteractionFailure("손잡이 끝을 왼쪽으로 밀어 90도 돌려요.");
      }
    }
    prop.addEventListener("pointerup", finishTurn);
    window.addEventListener("pointerup", finishTurn);
  }

  function enableNozzleHold(nozzle) {
    var stopHiss = function () {};
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
      stopHiss();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      timer = null;
      ring.style.setProperty("--hold", "0%");
    }
    nozzle.addEventListener("pointerdown", function (event) {
      if (timer || state.solved.has("butane")) return;
      event.preventDefault();
      nozzle.setPointerCapture(event.pointerId);
      started = performance.now();
      stopHiss = playFeedback("hiss") || function () {};
      update();
      timer = window.setTimeout(function () { timer = null; stopHiss(); handleChoice(correctAction()); }, 900);
    });
    nozzle.addEventListener("pointerup", function (event) {
      if (timer) {
        nozzle.releasePointerCapture(event.pointerId);
        cancel();
        registerInteractionFailure("노즐을 원이 가득 찰 때까지 잠시 눌러주세요.");
      }
    });
    nozzle.addEventListener("pointercancel", cancel);
    nozzle.addEventListener("lostpointercapture", cancel);
    function pauseHidden() { if (document.hidden) cancel(); }
    elements.dialog.addEventListener("close", function () {
      cancel();
      elements.soundSetting.removeEventListener("change", cancel);
      document.removeEventListener("visibilitychange", pauseHidden);
    }, {once:true});
    elements.soundSetting.addEventListener("change", cancel);
    document.addEventListener("visibilitychange", pauseHidden);
  }

  function enableButaneTurn(prop, nozzle, instruction) {
    var startX = null;
    var angle = 0;

    function completeTurn() {
      playFeedback("can");
      angle = 96;
      prop.style.transform = "rotate(96deg)";
      prop.classList.remove("is-turnable");
      prop.classList.add("is-inverted");
      var turnCue = elements.visual.querySelector(".rotation-cue-butane");
      if (turnCue) turnCue.hidden = true;
      nozzle.hidden = false;
      instruction.textContent = "거꾸로 세웠어요. 강조된 노즐을 원이 찰 때까지 눌러요";
      elements.copy.textContent = "좋아요! 이제 위쪽 노즐을 길게 눌러요.";
      announce("부탄캔을 거꾸로 세웠습니다. 강조된 노즐을 길게 누르세요.");
      nozzle.focus();
    }

    prop.tabIndex = 0;
    prop.setAttribute("role", "button");
    prop.setAttribute("aria-label", "부탄캔을 돌려 거꾸로 세우기");
    prop.addEventListener("pointerdown", function (event) {
      if (angle >= 96) return;
      event.preventDefault();
      startX = event.clientX;
      prop.setPointerCapture(event.pointerId);
      prop.classList.add("is-dragging");
    });
    prop.addEventListener("pointermove", function (event) {
      if (startX === null || angle >= 96) return;
      angle = Math.max(0, Math.min(96, (event.clientX - startX) * 1.2));
      prop.style.transform = "rotate(" + angle + "deg)";
      if (angle >= 86) completeTurn();
    });
    function cancelTurn(event) {
      if (startX === null || angle >= 96) return;
      if (prop.hasPointerCapture && prop.hasPointerCapture(event.pointerId)) prop.releasePointerCapture(event.pointerId);
      startX = null;
      prop.classList.remove("is-dragging");
      angle = 0;
      prop.style.transform = "rotate(0deg)";
      registerInteractionFailure("부탄캔을 오른쪽으로 돌려 거꾸로 세워요.");
    }
    prop.addEventListener("pointerup", cancelTurn);
    prop.addEventListener("pointercancel", cancelTurn);
    prop.addEventListener("keydown", function (event) {
      if ((event.key === "Enter" || event.key === " ") && angle < 96) {
        event.preventDefault();
        completeTurn();
      }
    });
  }

  function renderMissionVisual(visualName) {
    var propPaths = {
      valve: "assets/runtime/props/prop-valve-handle-scene-v3.png",
      towel: "assets/runtime/props/prop-towel-scene-v3.png",
      butane: "assets/runtime/props/prop-butane-red-v4.png",
      "butane-outdoor": "assets/runtime/props/prop-butane-red-v4.png"
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

    if (visualName === "towel" || visualName === "butane") {
      var targetRing = document.createElement("span");
      targetRing.className = "interaction-target-ring interaction-target-ring-" + visualName;
      targetRing.setAttribute("aria-hidden", "true");
      elements.visual.appendChild(targetRing);
    }

    var stateLabel = document.createElement("span");
    stateLabel.className = "mission-state-label";
    stateLabel.textContent = visualName === "valve" ? "열림" : "";
    if (stateLabel.textContent) elements.visual.appendChild(stateLabel);

    if (visualName === "butane-outdoor") {
      var turnCue = document.createElement("span");
      turnCue.className = "rotation-cue rotation-cue-butane";
      turnCue.setAttribute("aria-hidden", "true");
      turnCue.innerHTML = '<svg viewBox="0 0 120 90"><path class="rotation-arrow-shadow" d="M22 62C35 20 84 12 104 42L108 26L116 54L88 59L100 49C84 25 48 30 38 64Z"/><path class="rotation-arrow" d="M22 62C35 20 84 12 104 42L108 26L116 54L88 59L100 49C84 25 48 30 38 64Z"/><path class="rotation-highlight" d="M35 48C49 25 77 22 94 36"/></svg>';
      elements.visual.appendChild(turnCue);
      var nozzle = document.createElement("span");
      nozzle.className = "nozzle-focus";
      nozzle.setAttribute("role", "button");
      nozzle.setAttribute("aria-label", "부탄캔 노즐을 길게 누르기");
      nozzle.tabIndex = 0;
      elements.visual.appendChild(nozzle);
      var outdoorReturn = document.createElement("button");
      outdoorReturn.type = "button";
      outdoorReturn.className = "outdoor-return-door";
      outdoorReturn.setAttribute("aria-label", "현관문으로 방 안에 돌아가기");
      // The doorway is a transparent scene hit area, not a filled UI button.
      outdoorReturn.hidden = true;
      outdoorReturn.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 48 48" focusable="false"><path d="M7 24h32M29 14l10 10-10 10"/></svg></span>';
      outdoorReturn.addEventListener("click", returnToRoom);
      elements.visual.appendChild(outdoorReturn);
    }

    if (visualName === "valve") {
      addInstruction("밸브 손잡이 끝을 왼쪽으로 밀어 돌려요");
      enableValveTurn(prop);
    } else if (visualName === "towel") {
      addInstruction("수건을 안전 보관 바구니로 옮겨요");
      enableDrag(prop, addDropZone("drop-zone-towel", "안전 보관 바구니"), "수건은 화기와 떨어진 보관 바구니로 옮겨요.");
    } else if (visualName === "butane") {
      var butaneInstruction = addInstruction("부탄캔을 클릭해 집어주세요");
      enableButanePickup(prop, addOutdoorDoor(), butaneInstruction, addInventoryTray(state.butaneCarried));
    } else if (visualName === "butane-outdoor") {
      var outdoorInstruction = addInstruction("부탄캔을 잡고 돌려 거꾸로 세워요");
      elements.copy.textContent = "화살표 방향으로 캔을 돌려 거꾸로 세워요.";
      nozzle.hidden = true;
      prop.classList.add("is-turnable");
      enableButaneTurn(prop, nozzle, outdoorInstruction);
      enableNozzleHold(nozzle);
    }
  }

  function openMission(hazard, contentKey) {
    if (!contentKey && kitchenScenes.open(hazard)) { window.clearTimeout(state.hintTimer); return; }
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
    setMissionStatus(null, "");
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
      setMissionStatus("error", content.error);
      announce(content.error);
      return;
    }

    if (action.next) {
      state.butaneCarried = true;
      openMission("butane", action.next);
      return;
    }

    var hazard = state.activeHazard;
    if (hazard === "butane") state.butaneCarried = false;
    if (hazard === "butane") kitchenScenes.clearHeld();
    state.solved.add(hazard);
    elements.visual.querySelectorAll(".interaction-target-ring, .valve-turn-guide, .rotation-cue, .nozzle-focus").forEach(function (target) {
      target.hidden = true;
    });
    setMissionStatus("success", content.success);
    if (hazard === "butane") {
      elements.copy.textContent = content.success;
      elements.feedback.textContent = "";
    }
    announce(content.success);
    renderProgress();
    elements.console.classList.add("is-success");
    var outdoorReturn = elements.visual.querySelector(".outdoor-return-door");
    elements.returnRoom.hidden = Boolean(outdoorReturn);
    if (outdoorReturn) outdoorReturn.hidden = false;
    elements.explanationToggle.hidden = hazard === "butane" || !content.explanation;
    (outdoorReturn || elements.returnRoom).focus();
  }

  function resetGame() {
    state.solved.clear();
    state.activeHazard = null;
    state.activeContentKey = null;
    state.butaneCarried = false;
    kitchenScenes.reset();
    elements.result.hidden = true;
    elements.app.hidden = true;
    elements.intro.hidden = false;
    state.started = false;
    if (elements.dialog.open) elements.dialog.close();
    elements.guide.textContent = "반짝이는 물건 3개를 찾아요!";
    elements.guideMascot.src = "assets/runtime/mascot-somyeongi-guide-v1.png";
    document.querySelectorAll(".is-solved").forEach(function (item) { item.classList.remove("is-solved"); });
    renderProgress();
    window.clearTimeout(state.hintTimer);
    document.getElementById("start-button").focus();
    syncBackgroundMusic();
  }

  function showSpeechBubbleTemporarily() {
    const speechBubble = document.getElementById("speech-bubble");
    if (!speechBubble) return;
    speechBubble.style.opacity = "1";
    speechBubble.style.pointerEvents = "auto";
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
    state.started = true;
    playFeedback("move");
    syncBackgroundMusic(false);
    document.querySelector('.scene-navigation').focus();
    announce("게임이 시작되었습니다. 위험요소 3개를 찾아보세요.");
    resetHintTimer();
    showSpeechBubbleTemporarily();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Tab" && elements.dialog.open) showFallback("키보드 입력을 감지했어요.");
  });

  elements.fullscreen.addEventListener("click", async function () {
    // Close the modal before fullscreen changes top-layer ordering. Otherwise
    // the hidden modal can leave the visible game inert and block all input.
    if (elements.settings.open) elements.settings.close();
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
    updateOrientationGate();
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

  function returnToRoom() {
    playFeedback("door");
    elements.dialog.close();
    state.activeHazard = null;
    elements.console.classList.remove("is-success");
    resetHintTimer();
    document.getElementById("game-scene").focus({ preventScroll: true });
  }

  elements.returnRoom.addEventListener("click", returnToRoom);
  elements.soundSetting.addEventListener("change", function () { syncBackgroundMusic(false); });
  document.addEventListener("visibilitychange", function () { syncBackgroundMusic(false); });
  // Autoplay may be blocked; retry from the first trusted title-screen gesture.
  document.addEventListener("pointerdown", function () { syncBackgroundMusic(false); });
  document.addEventListener("keydown", function () { syncBackgroundMusic(false); });
  syncBackgroundMusic(false);

  elements.explanationToggle.addEventListener("click", function () {
    var willOpen = elements.explanation.hidden;
    elements.explanation.hidden = !willOpen;
    elements.explanationToggle.textContent = willOpen ? "설명 닫기" : "왜 안전한가요?";
    elements.explanationToggle.setAttribute("aria-expanded", String(willOpen));
  });

  elements.dialog.addEventListener("close", function () {
    elements.console.classList.remove("is-success");
    resetHintTimer();
  });

  var introSettings = document.getElementById("settings-button").cloneNode(true);
  introSettings.id = "intro-settings-button";
  introSettings.className = "retro-button ui-button ui-button--neutral";
  introSettings.removeAttribute("data-ui-icon");
  var settingsLabel = document.createElement("span");
  settingsLabel.textContent = "설정";
  introSettings.appendChild(settingsLabel);
  elements.intro.querySelector(".retro-actions").appendChild(introSettings);
  function openSettings() {
    playFeedback("tap");
    document.getElementById("restart-game-button").hidden = !elements.intro.hidden;
    elements.settings.showModal();
  }
  document.getElementById("settings-button").addEventListener("click", openSettings);
  introSettings.addEventListener("click", openSettings);

  // Only explicit close controls: automatic closes after pickup keep their item sound.
  document.querySelectorAll('dialog button[value="cancel"]').forEach(function (button) {
    button.addEventListener("click", function () { playFeedback("tap"); });
  });

  document.getElementById("restart-game-button").addEventListener("click", function () {
    playFeedback("tap");
    elements.settings.close();
    resetGame();
  });

  document.getElementById("rules-button").addEventListener("click", function () { playFeedback("tap"); elements.rulesDialog.showModal(); });
  var introRulesButton = document.getElementById("intro-rules-button");
  if (introRulesButton) {
    introRulesButton.addEventListener("click", function () { playFeedback("tap"); elements.rulesDialog.showModal(); });
  }
  document.getElementById("result-rules-button").addEventListener("click", function () { playFeedback("tap"); elements.rulesDialog.showModal(); });
  document.getElementById("restart-button").addEventListener("click", function () { playFeedback("tap"); resetGame(); });
  document.getElementById("size-fullscreen-button").addEventListener("click", function () { elements.fullscreen.click(); });

  elements.exitDoor.addEventListener("click", function () {
    if (kitchenScenes.heldItem() === "butane") {
      playFeedback("door");
      state.butaneCarried = true;
      openMission("butane", "butane-step-2");
      return;
    }
    if (elements.exitDoor.disabled) return;
    elements.app.hidden = true;
    elements.result.hidden = false;
    syncBackgroundMusic();
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
