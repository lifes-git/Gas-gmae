/* Approved art, one coordinate system for scenery, props and targets. Prototype. */
window.createKitchenScenes = function (options) {
  "use strict";
  var world = document.getElementById("scene-world");
  var room = "living", held = false;
  var root = "assets/masters/";
  var background = root + "bg-stove-front-interaction-v1.png";
  var towel = root + "prop-towel-draped-alpha-v1.png";
  var handle = root + "prop-valve-handle-alpha-v2.png";
  var ns = "http://www.w3.org/2000/svg";
  function svgNode(tag, attrs) {
    var node = document.createElementNS(ns, tag);
    Object.keys(attrs).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    return node;
  }
  function art(viewBox) {
    var svg = svgNode("svg", {viewBox: viewBox, "aria-hidden": "true", class: "kitchen-art"});
    svg.appendChild(svgNode("image", {href: background, width: 1672, height: 941}));
    if (!held && !options.solved("towel")) {
      var cloth = svgNode("svg", {x:618, y:470, width:300, height:162, viewBox:"107 184 1262 682"});
      cloth.appendChild(svgNode("image", {href:towel, width:1536, height:1024}));
      svg.appendChild(cloth);
    }
    var lever = svgNode("image", {href:handle, x:1323, y:214, width:224, height:224, class:"kitchen-lever"});
    if (options.solved("valve")) lever.setAttribute("transform", "rotate(90 1435 326)");
    svg.appendChild(lever);
    return svg;
  }
  function button(label, className, action) {
    var node = document.createElement("button");
    node.type = "button"; node.className = className; node.textContent = label;
    node.addEventListener("click", action);
    return node;
  }
  var layer = document.createElement("div");
  layer.className = "new-scene-art";
  world.prepend(layer);
  var navigation = button("주방으로 →", "scene-navigation", function () {
    room = room === "living" ? "kitchen" : "living";
    render(); navigation.focus();
  });
  document.getElementById("room").appendChild(navigation);
  var inventory = document.createElement("div");
  inventory.className = "scene-held-item";
  inventory.setAttribute("role", "status");
  document.getElementById("room").appendChild(inventory);
  var basket = button("바구니에 수건 넣기", "kitchen-basket-target", function () {
    if (!held) return;
    held = false;
    options.complete("towel");
    render();
    navigation.focus();
  });
  world.appendChild(basket);
  var modal = document.createElement("dialog");
  modal.className = "kitchen-detail-dialog";
  modal.setAttribute("aria-labelledby", "kitchen-detail-title");
  document.body.appendChild(modal);
  var origin = null;
  modal.addEventListener("close", function () {
    if (origin && !origin.hidden) origin.focus();
  });
  function render() {
    world.classList.add("approved-scenes");
    world.dataset.map = room;
    layer.replaceChildren();
    if (room === "kitchen") layer.appendChild(art("0 0 1672 941"));
    else {
      var image = document.createElement("img");
      image.src = root + "bg-living-entry-map-v1.png"; image.alt = "";
      layer.appendChild(image);
      if (!options.solved("butane")) {
        var can = document.createElement("img");
        can.src = "assets/runtime/props/prop-butane-scene-v3.png";
        can.className = "living-butane-prop"; can.alt = "";
        layer.appendChild(can);
      }
    }
    ["valve", "towel", "butane"].forEach(function (id) {
      var target = world.querySelector('[data-hazard="' + id + '"]');
      target.hidden = (id === "butane" ? room !== "living" : room !== "kitchen") || options.solved(id) || (id === "towel" && held);
    });
    document.getElementById("exit-door").hidden = room !== "living";
    navigation.textContent = room === "living" ? "주방으로 →" : "← 거실로";
    basket.hidden = room !== "kitchen" || !held;
    inventory.hidden = !held && !options.solved("towel");
    inventory.textContent = held ? "들고 있는 물건: 수건 · 주방 왼쪽 바구니에 넣어주세요" : "✓ 수건을 바구니에 보관했어요";
    document.getElementById("game-scene").setAttribute("aria-label", room === "living" ? "거실 탐색" : "주방 탐색");
  }
  function open(id) {
    if (id !== "valve" && id !== "towel") return false;
    if (options.solved(id)) { options.announce("이미 해결한 위험요소입니다."); return true; }
    room = "kitchen"; render();
    if (id === "towel" && held) { basket.focus(); return true; }
    origin = world.querySelector('[data-hazard="' + id + '"]');
    modal.replaceChildren();
    var header = document.createElement("header");
    var title = document.createElement("h2"); title.id = "kitchen-detail-title";
    title.textContent = id === "valve" ? "밸브 손잡이를 돌려요" : "수건을 집어주세요";
    header.append(title, button("닫기 ×", "detail-close", function () { modal.close(); }));
    var view = document.createElement("div"); view.className = "kitchen-detail-view detail-" + id;
    var svg = art(id === "valve" ? "1260 210 370 350" : "500 380 600 350");
    view.appendChild(svg);
    var instruction = document.createElement("p"); instruction.className = "detail-instruction";
    instruction.textContent = id === "valve" ? "손잡이를 잡고 오른쪽으로 돌리거나, 아래 버튼을 눌러요." : "불이 꺼진 상태예요. 수건을 집고 주방의 바구니로 옮겨요.";
    var done = false;
    function act() {
      if (done) return;
      done = true;
      if (id === "towel") {
        held = true; render(); modal.close(); basket.focus();
        options.announce("수건을 집었어요. 주방 왼쪽 바구니에 넣어주세요.");
      } else {
        svg.querySelector(".kitchen-lever").setAttribute("transform", "rotate(90 1435 326)");
        options.complete("valve"); render();
        instruction.textContent = window.GAME_CONTENT.valve.success;
        action.disabled = true; target.disabled = true; close.focus();
      }
    }
    var target = button(id === "valve" ? "손잡이 돌리기" : "수건 집기", "detail-target target-" + id, act);
    view.appendChild(target);
    var action = button(id === "valve" ? "손잡이 90° 돌리기" : "수건 집기", "detail-action", act);
    var close = button("주방으로 돌아가기", "detail-back", function () { modal.close(); });
    var controls = document.createElement("footer"); controls.append(action, close);
    modal.append(header, view, instruction, controls);
    if (id === "valve") {
      var start = null;
      target.addEventListener("pointerdown", function (event) {
        if (done) return;
        start = event.clientX; target.setPointerCapture(event.pointerId);
      });
      target.addEventListener("pointermove", function (event) {
        if (start === null || done) return;
        var angle = Math.max(0, Math.min(90, (event.clientX-start) * 2));
        svg.querySelector(".kitchen-lever").setAttribute("transform", "rotate(" + angle + " 1435 326)");
        if (angle >= 80) { start = null; act(); }
      });
      target.addEventListener("pointercancel", function () {
        start = null;
        if (!done) svg.querySelector(".kitchen-lever").removeAttribute("transform");
      });
      target.addEventListener("pointerup", function () { start = null; });
    }
    modal.showModal(); target.focus();
    return true;
  }
  return {render:render, open:open, reset:function () {held=false; room="living"; if(modal.open) modal.close(); render();}};
};
