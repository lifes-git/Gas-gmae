(function () {
  "use strict";

  var activeRoom = null;
  var completionTimer = null;

  function reset() {
    if (completionTimer !== null) {
      window.clearTimeout(completionTimer);
      completionTimer = null;
    }
    if (activeRoom) activeRoom.classList.remove("is-exiting");
    activeRoom = null;
  }

  function play(options) {
    var room = options && options.room;
    var target = options && options.target;
    var onComplete = options && options.onComplete;
    if (!room || !target || activeRoom) return false;

    var targetRect = target.getBoundingClientRect();
    var roomRect = room.getBoundingClientRect();
    if (!roomRect.width || !roomRect.height) return false;

    activeRoom = room;
    room.style.setProperty("--zoom-x", ((targetRect.left + targetRect.width / 2 - roomRect.left) / roomRect.width * 100) + "%");
    room.style.setProperty("--zoom-y", ((targetRect.top + targetRect.height / 2 - roomRect.top) / roomRect.height * 100) + "%");
    room.classList.add("is-exiting");

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    completionTimer = window.setTimeout(function () {
      completionTimer = null;
      room.classList.remove("is-exiting");
      activeRoom = null;
      if (typeof onComplete === "function") onComplete();
    }, reducedMotion ? 0 : 900);
    return true;
  }

  window.ExitTransition = {
    play: play,
    reset: reset
  };
}());
