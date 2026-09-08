(function () {
  "use strict";

  var screen = document.getElementById("outing-transition");
  var skip = document.getElementById("outing-transition-skip");
  var title = document.getElementById("outing-transition-title");
  var timer = null;
  var finishTimer = null;
  var completion = null;

  function finish() {
    if (!screen || screen.hidden) return;
    if (timer !== null) window.clearTimeout(timer);
    timer = null;
    var callback = completion;
    completion = null;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    screen.classList.remove("is-playing");
    screen.classList.add("is-finishing");
    finishTimer = window.setTimeout(function () {
      finishTimer = null;
      screen.classList.remove("is-finishing");
      screen.hidden = true;
      if (typeof callback === "function") callback();
    }, reducedMotion ? 0 : 480);
  }

  function reset() {
    if (timer !== null) window.clearTimeout(timer);
    if (finishTimer !== null) window.clearTimeout(finishTimer);
    timer = null;
    finishTimer = null;
    completion = null;
    if (!screen) return;
    screen.classList.remove("is-playing", "is-finishing");
    screen.hidden = true;
  }

  function play(options) {
    if (!screen || !screen.hidden) return false;
    completion = options && options.onComplete;
    screen.hidden = false;
    void screen.offsetWidth;
    screen.classList.add("is-playing");
    if (title) title.focus({ preventScroll: true });
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer = window.setTimeout(finish, reducedMotion ? 900 : 5500);
    return true;
  }

  if (skip) skip.addEventListener("click", finish);

  window.OutingTransition = {
    play: play,
    reset: reset,
    finish: finish
  };
}());
