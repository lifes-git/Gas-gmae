(function () {
  "use strict";

  var screen = document.getElementById("stage-two");
  var frame = document.getElementById("stage-two-frame");
  var livingBackground = frame.querySelector(".stage-two__background--living");
  var kitchenBackground = frame.querySelector(".stage-two__background--kitchen");
  var navigation = document.getElementById("stage-two-navigation");
  var title = document.getElementById("stage-two-title");
  var settings = document.getElementById("stage-two-settings-button");
  var rules = document.getElementById("stage-two-rules-button");
  var room = "living";
  function render() {
    var nextRoom = room === "living" ? "kitchen" : "living";
    frame.dataset.room = room;
    livingBackground.classList.toggle("is-active", room === "living");
    kitchenBackground.classList.toggle("is-active", room === "kitchen");
    navigation.dataset.direction = nextRoom === "kitchen" ? "right" : "left";
    navigation.setAttribute("aria-label", nextRoom === "kitchen" ? "주방으로 이동" : "거실로 이동");
    screen.setAttribute("aria-label", room === "living" ? "스테이지 2 노을진 거실" : "스테이지 2 노을진 주방");
  }

  function show() {
    if (!screen) return;
    room = "living";
    render();
    screen.hidden = false;
    screen.classList.remove("is-entering");
    void screen.offsetWidth;
    screen.classList.add("is-entering");
    title.focus({ preventScroll: true });
  }

  function reset() {
    if (!screen) return;
    room = "living";
    screen.classList.remove("is-entering");
    screen.hidden = true;
    render();
  }

  navigation.addEventListener("click", function () {
    room = room === "living" ? "kitchen" : "living";
    render();
    navigation.focus();
  });
  settings.addEventListener("click", function () { document.getElementById("settings-button").click(); });
  rules.addEventListener("click", function () { document.getElementById("rules-button").click(); });

  window.StageTwo = { show: show, reset: reset, room: function () { return room; } };
}());
