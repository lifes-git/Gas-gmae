/* Approved art, one coordinate system for scenery, props and targets. Prototype. */
window.createKitchenScenes = function (options) {
  "use strict";
  var world = document.getElementById("scene-world");
  var room = "living", heldItem = null;
  var root = "assets/masters/";
  var background = root + "bg-stove-controls-v4.png";
  var towel = root + "prop-towel-draped-alpha-v1.png";
  var handle = root + "prop-valve-handle-alpha-v2.png";
  var ns = "http://www.w3.org/2000/svg";
  var artSequence = 0;
  function svgNode(tag, attrs) {
    var node = document.createElementNS(ns, tag);
    Object.keys(attrs).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    return node;
  }
  function art(viewBox) {
    var svg = svgNode("svg", { viewBox: viewBox, "aria-hidden": "true", class: "kitchen-art" });
    var outlineId = "prop-outline-" + (++artSequence);
    var outlineDefs = svgNode("defs", {});
    var outline = svgNode("filter", { id: outlineId, x: "-100%", y: "-100%", width: "300%", height: "300%", "color-interpolation-filters": "sRGB" });
    outline.appendChild(svgNode("feMorphology", { in: "SourceAlpha", operator: "dilate", radius: 1.5, result: "edge" }));
    outline.appendChild(svgNode("feFlood", { "flood-color": "#fff", result: "white" }));
    outline.appendChild(svgNode("feComposite", { in: "white", in2: "edge", operator: "in", result: "outline" }));
    outline.appendChild(svgNode("feGaussianBlur", { in: "outline", stdDeviation: 4, result: "glow" }));
    var merge = svgNode("feMerge", {});
    merge.appendChild(svgNode("feMergeNode", { in: "glow" }));
    merge.appendChild(svgNode("feMergeNode", { in: "glow" }));
    merge.appendChild(svgNode("feMergeNode", { in: "outline" }));
    merge.appendChild(svgNode("feMergeNode", { in: "SourceGraphic" }));
    outline.appendChild(merge); outlineDefs.appendChild(outline); svg.appendChild(outlineDefs);
    function outlined(node) {
      // Filter in scene units, outside the towel's high-resolution nested viewBox.
      node.style.setProperty("filter", "none", "important");
      var group = svgNode("g", { filter: "url(#" + outlineId + ")" });
      group.appendChild(node); svg.appendChild(group);
    }
    svg.appendChild(svgNode("image", { href: background, width: 1672, height: 941 }));
    if (heldItem !== "towel" && !options.solved("towel")) {
      var cloth = svgNode("svg", { x: 690, y: 462, width: 300, height: 162, viewBox: "107 184 1262 682", class: "kitchen-towel-prop" });
      cloth.appendChild(svgNode("image", { href: towel, width: 1536, height: 1024 }));
      outlined(cloth);
    } else if (options.solved("towel")) {
      var defs = svgNode("defs", {});
      var clip = svgNode("clipPath", { id: "stored-towel-clip" });
      clip.appendChild(svgNode("rect", { x: 430, y: 456, width: 162, height: 79, rx: 12 }));
      defs.appendChild(clip); svg.appendChild(defs);
      var storedCloth = svgNode("image", { href: towel, x: 420, y: 431, width: 176, height: 117, preserveAspectRatio: "xMidYMid meet", "clip-path": "url(#stored-towel-clip)", class: "kitchen-towel-stored" });
      svg.appendChild(storedCloth);
    }
    var lever = svgNode("image", { href: handle, x: 1398, y: 214, width: 224, height: 224, class: "kitchen-lever" });
    if (options.solved("valve")) lever.style.setProperty("--valve-angle", "90deg");
    outlined(lever);
    return svg;
  }
  function button(label, className, action, uiOptions) {
    if (uiOptions && window.GameUI) {
      return window.GameUI.createButton({
        label: label,
        className: className,
        onClick: action,
        variant: uiOptions.variant,
        iconOnly: uiOptions.iconOnly,
        ariaLabel: uiOptions.ariaLabel
      });
    }
    var node = document.createElement("button");
    node.type = "button"; node.className = className; node.textContent = label;
    node.addEventListener("click", action);
    return node;
  }
  var layer = document.createElement("div");
  layer.className = "new-scene-art";
  world.prepend(layer);
  var navigation = button("→", "scene-navigation", function () {
    if (heldItem) {
      options.announce(heldItem === "towel" ? "수건을 먼저 바구니에 넣어주세요." : "부탄캔을 먼저 문밖으로 옮겨주세요.");
      return;
    }
    room = room === "living" ? "kitchen" : "living";
    options.sound("door");
    render(); navigation.focus();
  });
  document.getElementById("room").appendChild(navigation);
  var inventory = document.createElement("div");
  inventory.className = "scene-held-item";
  inventory.setAttribute("role", "status");
  document.getElementById("room").appendChild(inventory);
  var basket = button("바구니에 수건 넣기", "kitchen-basket-target", function () {
    if (heldItem !== "towel") return;
    heldItem = null;
    options.hold(null);
    options.sound("basket");
    options.complete("towel");
    render();
    navigation.focus();
  });
  var basketLabel = document.createElement("span");
  basketLabel.className = "basket-target-label";
  basketLabel.textContent = "바구니에 수건 넣기";
  basket.replaceChildren(basketLabel);
  world.appendChild(basket);
  var modal = document.createElement("dialog");
  modal.className = "kitchen-detail-dialog ui-modal";
  modal.setAttribute("aria-labelledby", "kitchen-detail-title");
  document.body.appendChild(modal);
  var origin = null;
  modal.addEventListener("close", function () {
    if (modal.open) return;
    modal.classList.remove("show-fallback");
    if (origin && !origin.hidden) origin.focus();
  }, { variant: "info", iconOnly: true, ariaLabel: "주방으로 이동" });
  navigation.innerHTML = '<svg viewBox="0 0 72 54" aria-hidden="true" focusable="false"><path class="nav-arrow-shadow" d="M7 35C19 15 42 12 56 22L52 10L68 28L48 43L54 31C42 23 25 26 16 42Z"/><path class="nav-arrow" d="M7 35C19 15 42 12 56 22L52 10L68 28L48 43L54 31C42 23 25 26 16 42Z"/><path class="nav-arrow-highlight" d="M17 30C27 18 42 18 51 23"/></svg>';
  modal.addEventListener("keydown", function (event) {
    if (event.key === "Tab") modal.classList.add("show-fallback");
  });
  function render() {
    world.classList.add("approved-scenes");
    world.dataset.map = room;
    document.getElementById("room").dataset.map = room;
    layer.replaceChildren();
    if (room === "kitchen") layer.appendChild(art("0 0 1672 941"));
    else {
      var image = document.createElement("img");
      image.src = root + "bg-living-entry-no-towel-v2.png"; image.alt = "";
      layer.appendChild(image);
      if (!options.solved("butane") && heldItem !== "butane") {
        var can = document.createElement("img");
        can.src = "assets/runtime/props/prop-butane-red-v4.png";
        can.className = "living-butane-prop"; can.alt = "";
        layer.appendChild(can);
      }
    }
    ["valve", "towel", "butane"].forEach(function (id) {
      var target = world.querySelector('[data-hazard="' + id + '"]');
      target.hidden = (id === "butane" ? room !== "living" : room !== "kitchen") || options.solved(id) || Boolean(heldItem);
    });
    var exit = document.getElementById("exit-door");
    exit.hidden = room !== "living";
    if (heldItem === "butane" && room === "living") {
      exit.disabled = false;
      exit.classList.add("is-ready", "is-carry-destination");
      exit.setAttribute("aria-label", "들고 있는 부탄캔을 문밖의 통풍이 잘되는 곳으로 옮기기");
    } else {
      exit.classList.remove("is-carry-destination");
    }
    var nextRoom = room === "living" ? "kitchen" : "living";
    navigation.dataset.direction = nextRoom === "kitchen" ? "right" : "left";
    navigation.setAttribute("aria-label", nextRoom === "kitchen" ? "주방으로 이동" : "거실로 이동");
    navigation.title = nextRoom === "kitchen" ? "주방으로 이동" : "거실로 이동";
    var allSolved = ["valve", "towel", "butane"].every(function (id) { return options.solved(id); });
    navigation.disabled = Boolean(heldItem);
    navigation.hidden = allSolved && room === "living";
    basket.hidden = room !== "kitchen" || heldItem !== "towel";
    inventory.hidden = allSolved && !heldItem;
    inventory.dataset.item = heldItem || "empty";
    inventory.textContent = "";
    inventory.setAttribute("aria-label", heldItem === "towel"
      ? "현재 수건을 들고 있습니다. 왼쪽 바구니에 넣어주세요."
      : heldItem === "butane"
        ? "현재 다 쓴 부탄캔을 들고 있습니다. 현관문을 눌러주세요."
        : "현재 들고 있는 물건이 없습니다.");
    document.getElementById("game-scene").setAttribute("aria-label", room === "living" ? "거실 탐색" : "주방 탐색");
  }
  function open(id) {
    if (id !== "valve" && id !== "towel" && id !== "butane") return false;
    if (options.solved(id)) { options.announce("이미 해결한 위험요소입니다."); return true; }
    if (heldItem) {
      options.announce(heldItem === "towel" ? "수건을 먼저 바구니에 넣어주세요." : "부탄캔을 먼저 문밖으로 옮겨주세요.");
      return true;
    }
    room = id === "butane" ? "living" : "kitchen"; render();
    options.sound("open");
    origin = world.querySelector('[data-hazard="' + id + '"]');
    modal.replaceChildren();
    var header = document.createElement("header");
    var title = document.createElement("h2"); title.id = "kitchen-detail-title";
    title.textContent = id === "valve" ? "밸브 손잡이를 돌려요" : id === "towel" ? "수건을 집어주세요" : "다 쓴 부탄캔을 집어주세요";
    header.append(title, button("닫기 ×", "detail-close", function () { options.sound("tap"); modal.close(); }, { variant: "danger", iconOnly: true, ariaLabel: "확대 화면 닫기" }));
    var view = document.createElement("div"); view.className = "kitchen-detail-view detail-" + id;
    var svg = null;
    if (id === "butane") {
      svg = svgNode("svg", { viewBox: "467 286 1150 647", "aria-hidden": "true", class: "kitchen-art butane-detail-art" });
      svg.appendChild(svgNode("image", { href: root + "bg-living-entry-no-towel-v2.png", width: 1672, height: 941 }));
      view.appendChild(svg);
    } else {
      svg = art(id === "valve" ? "872 100 800 450" : "422 292 900 506");
      view.appendChild(svg);
    }
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    var guide = document.createElement("div"); guide.className = "detail-guide";
    var guideMascot = document.createElement("img");
    guideMascot.src = id === "towel"
      ? "assets/runtime/mascots/mascot-somyeongi-caution-logo-v1.svg"
      : "assets/runtime/mascots/mascot-somyeongi-question-logo-v1.svg";
    guideMascot.alt = ""; guideMascot.setAttribute("aria-hidden", "true");
    var guideCopy = document.createElement("div"); guideCopy.className = "detail-guide-copy ui-speech";
    var instruction = document.createElement("p"); instruction.className = "detail-instruction";
    instruction.textContent = id === "valve"
      ? "손잡이 끝을 왼쪽으로 밀어 돌려요."
      : id === "towel"
        ? "불은 꺼져있어요. 수건을 집어요."
        : "부탄캔을 집어 문밖으로 옮겨요.";
    guideCopy.appendChild(instruction); guide.append(guideMascot, guideCopy);
    var done = false;
    function act() {
      if (done) return;
      done = true;
      if (id === "towel") {
        heldItem = "towel"; options.hold("towel"); render(); modal.close(); basket.focus();
        options.guide("왼쪽 조리대 위 바구니에 수건을 넣어요.");
        options.announce("수건을 집었어요. 주방 왼쪽 조리대 위 바구니에 넣어주세요.");
      } else if (id === "butane") {
        heldItem = "butane"; options.hold("butane"); render(); modal.close();
        document.getElementById("exit-door").focus();
        options.guide("현관문을 눌러 문밖으로 옮겨요.");
        options.announce("부탄캔을 집었어요. 현관문을 눌러 문밖의 통풍이 잘되는 곳으로 옮겨주세요.");
      } else {
        options.sound("latch");
        svg.querySelector(".kitchen-lever").style.setProperty("--valve-angle", "90deg");
        var valveCue = view.querySelector(".rotation-cue-valve");
        if (valveCue) valveCue.hidden = true;
        options.complete("valve"); render();
        instruction.textContent = window.GAME_CONTENT.valve.success;
        guideCopy.classList.add("is-success");
        guideMascot.src = "assets/runtime/mascots/mascot-somyeongi-success-logo-v1.svg";
        modal.classList.add("is-success");
        action.disabled = true; target.disabled = true; close.focus();
      }
    }
    var target = button(id === "valve" ? "손잡이 돌리기" : id === "towel" ? "수건 집기" : "다 쓴 부탄캔 집기", "detail-target target-" + id, id === "valve" ? function () { } : act);
    if (id === "butane") {
      target.classList.add("butane-pickup-target");
      var can = document.createElement("img");
      can.src = "assets/runtime/props/prop-butane-red-v4.png";
      can.alt = "";
      target.appendChild(can);
    }
    view.appendChild(target);
    if (id === "valve") {
      var turnCue = document.createElement("span");
      turnCue.className = "rotation-cue rotation-cue-valve rotation-cue-reverse";
      turnCue.setAttribute("aria-hidden", "true");
      turnCue.innerHTML = '<svg viewBox="0 0 120 90"><path class="rotation-arrow-shadow" d="M22 62C35 20 84 12 104 42L108 26L116 54L88 59L100 49C84 25 48 30 38 64Z"/><path class="rotation-arrow" d="M22 62C35 20 84 12 104 42L108 26L116 54L88 59L100 49C84 25 48 30 38 64Z"/><path class="rotation-highlight" d="M35 48C49 25 77 22 94 36"/></svg>';
      view.appendChild(turnCue);
    }
    var action = button(id === "valve" ? "손잡이 90° 돌리기" : id === "towel" ? "수건 집기" : "부탄캔 집기", "detail-action", act, { variant: "primary" });
    var closeLabel = id === "butane" ? "거실로 돌아가기" : "주방으로 돌아가기";
    var close = button(closeLabel, "detail-back", function () { options.sound("tap"); modal.close(); }, { variant: "info", iconOnly: true, ariaLabel: closeLabel });
    close.setAttribute("aria-label", closeLabel);
    var controls = document.createElement("footer"); controls.append(action, close);
    modal.append(header, view, guide, controls);
    if (id === "valve") {
      var start = null;
      var angle = 0;
      var lastTurnSound = 0;
      var lever = svg.querySelector(".kitchen-lever");
      target.addEventListener("pointerdown", function (event) {
        if (done) return;
        event.preventDefault();
        start = event.clientX; target.setPointerCapture(event.pointerId);
        target.classList.add("is-dragging");
      });
      target.addEventListener("pointermove", function (event) {
        if (start === null || done) return;
        var nextAngle = Math.max(0, Math.min(90, (start - event.clientX) * 2));
        if (Math.abs(nextAngle - angle) > 1 && performance.now() - lastTurnSound > 140) {
          options.sound("turn"); lastTurnSound = performance.now();
        }
        angle = nextAngle;
        lever.style.setProperty("--valve-angle", angle + "deg");
        if (angle >= 80) { start = null; act(); }
      });
      target.addEventListener("pointercancel", function () {
        start = null;
        target.classList.remove("is-dragging");
        if (!done) { angle = 0; lever.style.setProperty("--valve-angle", "0deg"); }
      });
      target.addEventListener("pointerup", function (event) {
        if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
        target.classList.remove("is-dragging");
        if (start !== null && !done) {
          modal.dataset.failures = String(Number(modal.dataset.failures || 0) + 1);
          if (Number(modal.dataset.failures) >= 2) modal.classList.add("show-fallback");
          angle = 0;
          lever.style.setProperty("--valve-angle", "0deg");
        }
        start = null;
      });
    }
    modal.dataset.failures = "0";
    modal.classList.remove("show-fallback", "is-success");
    modal.showModal(); target.focus();
    return true;
  }
  return {
    render: render,
    open: open,
    heldItem: function () { return heldItem; },
    clearHeld: function () { heldItem = null; options.hold(null); render(); },
    reset: function () { heldItem = null; options.hold(null); room = "living"; if (modal.open) modal.close(); render(); }
  };
};
