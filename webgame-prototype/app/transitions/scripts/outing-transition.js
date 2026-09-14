(function () {
  "use strict";

  var screen = document.getElementById("outing-transition");
  var skip = document.getElementById("outing-transition-skip");
  var title = document.getElementById("outing-transition-title");
  var timer = null;
  var finishTimer = null;
  var footstepsTimer = null;
  var returnRevealTimer = null;
  var completion = null;
  var returnReveal = null;
  var returnRevealStarted = false;

  function revealReturn() {
    if (returnRevealStarted) return;
    returnRevealStarted = true;
    if (returnRevealTimer !== null) window.clearTimeout(returnRevealTimer);
    returnRevealTimer = null;
    if (typeof returnReveal === "function") returnReveal();
  }

  function finish() {
    if (!screen || screen.hidden) return;
    if (timer !== null) window.clearTimeout(timer);
    if (footstepsTimer !== null) window.clearTimeout(footstepsTimer);
    revealReturn();
    timer = null;
    footstepsTimer = null;
    var callback = completion;
    completion = null;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Render the next stage underneath the sunset before fading this overlay.
    // This prevents the hidden Stage 1 room from flashing through the fade.
    if (typeof callback === "function") callback();
    void screen.offsetWidth;
    screen.classList.add("is-finishing");
    finishTimer = window.setTimeout(function () {
      finishTimer = null;
      screen.classList.remove("is-playing", "is-finishing");
      screen.hidden = true;
    }, reducedMotion ? 0 : 480);
  }

  function reset() {
    if (timer !== null) window.clearTimeout(timer);
    if (finishTimer !== null) window.clearTimeout(finishTimer);
    if (footstepsTimer !== null) window.clearTimeout(footstepsTimer);
    if (returnRevealTimer !== null) window.clearTimeout(returnRevealTimer);
    timer = null;
    finishTimer = null;
    footstepsTimer = null;
    returnRevealTimer = null;
    completion = null;
    returnReveal = null;
    returnRevealStarted = false;
    if (!screen) return;
    screen.classList.remove("is-playing", "is-finishing");
    screen.hidden = true;
  }

  function play(options) {
    if (!screen || !screen.hidden) return false;
    completion = options && options.onComplete;
    returnReveal = options && options.onReturnReveal;
    returnRevealStarted = false;
    screen.hidden = false;
    void screen.offsetWidth;
    screen.classList.add("is-playing");
    if (window.AudioManager) window.AudioManager.play("outingDoorShut");
    footstepsTimer = window.setTimeout(function () {
      footstepsTimer = null;
      if (window.AudioManager) window.AudioManager.play("outingFootsteps");
    }, 520);
    if (title) title.focus({ preventScroll: true });
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    returnRevealTimer = window.setTimeout(revealReturn, reducedMotion ? 0 : 3200);
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
