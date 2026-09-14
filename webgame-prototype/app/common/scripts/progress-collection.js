(function () {
  "use strict";

  function findSlot(container, item) {
    return container && container.querySelector('[data-progress-item="' + item + '"]');
  }

  function reveal(slot, icon, label) {
    if (!slot) return;
    var image = slot.querySelector("img");
    if (image) {
      image.src = icon;
      image.alt = "";
    }
    slot.classList.add("solved", "is-complete", "is-collected", "is-receiving");
    slot.setAttribute("aria-label", (label || "안전 항목") + " 완료");
    window.setTimeout(function () { slot.classList.remove("is-receiving"); }, 520);
  }

  function collect(options) {
    var slot = findSlot(options.container, options.item);
    if (!slot || slot.classList.contains("is-collected")) return Promise.resolve();
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var source = options.sourceRect;
    var target = slot.getBoundingClientRect();
    if (reduced || !source || !target.width) {
      reveal(slot, options.icon, options.label);
      return Promise.resolve();
    }

    var token = document.createElement("img");
    token.className = "progress-fly-token";
    token.dataset.progressItem = options.item;
    token.src = options.icon;
    token.alt = "";
    token.style.left = source.left + "px";
    token.style.top = source.top + "px";
    token.style.width = source.width + "px";
    token.style.height = source.height + "px";
    document.body.appendChild(token);

    var dx = target.left + target.width / 2 - (source.left + source.width / 2);
    var dy = target.top + target.height / 2 - (source.top + source.height / 2);
    var duration = options.duration || (window.matchMedia("(orientation: landscape) and (pointer: coarse)").matches ? 520 : 680);
    var animation = token.animate([
      { transform:"translate(0,0) scale(1)", opacity:1, offset:0 },
      { transform:"translate(" + dx * .56 + "px," + (dy * .46 - 42) + "px) scale(.72) rotate(-8deg)", opacity:1, offset:.58 },
      { transform:"translate(" + dx + "px," + dy + "px) scale(.2) rotate(9deg)", opacity:.25, offset:1 }
    ], { duration:duration, easing:"cubic-bezier(.22,.72,.24,1)", fill:"forwards" });

    return animation.finished.catch(function () {}).then(function () {
      token.remove();
      reveal(slot, options.icon, options.label);
    });
  }

  function reset(container) {
    if (!container) return;
    container.querySelectorAll(".progress-slot").forEach(function (slot) {
      slot.classList.remove("solved", "is-complete", "is-collected", "is-receiving");
      slot.removeAttribute("aria-label");
      var image = slot.querySelector("img");
      if (image) image.removeAttribute("src");
    });
    document.querySelectorAll(".progress-fly-token").forEach(function (token) { token.remove(); });
  }

  window.ProgressCollection = { collect:collect, reset:reset };
}());
