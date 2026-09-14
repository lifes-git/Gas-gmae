(function () {
  "use strict";

  var overlay = document.getElementById("loading-overlay");
  var cache = new Map();
  var activeLoads = 0;
  var shownAt = 0;
  var groups = Object.freeze({
    stage1Living: [
      "assets/masters/stage-1/backgrounds/bg-living-entry-windowless-v1.png",
      "assets/common/backgrounds/bg-window-view-day-v1.jpg",
      "assets/common/props/prop-window-casement-wall-perspective-closed-v4.png",
      "assets/stage-1/props/prop-butane-red-v4.png"
    ],
    stage1Kitchen: [
      "assets/masters/stage-1/backgrounds/bg-stove-controls-v4.png",
      "assets/masters/stage-1/props/prop-towel-draped-alpha-v1.png",
      "assets/masters/stage-1/props/prop-valve-handle-alpha-v2.png",
      "assets/stage-1/props/prop-basket-empty-v1.png"
    ],
    transition: [
      "assets/transitions/backgrounds/bg-outdoor-open-walkway-v2.jpg",
      "assets/transitions/backgrounds/bg-outdoor-sunset-return-v1.jpg"
    ],
    stage2Living: [
      "assets/stage-2/backgrounds/bg-stage2-living-sunset-windowless-v1.jpg",
      "assets/common/backgrounds/bg-window-view-sunset-v1.jpg",
      "assets/common/props/prop-window-casement-wall-perspective-closed-v4.png",
      "assets/common/props/prop-window-casement-wall-perspective-open-v4.png"
    ],
    stage2Kitchen: [
      "assets/stage-2/backgrounds/bg-stage2-kitchen-sunset-clean-v2.jpg",
      "assets/stage-2/props/prop-stage2-gas-pipe-integrated-v2.png",
      "assets/stage-2/backgrounds/bg-stage2-pipe-detail-tile-v1.jpg",
      "assets/stage-2/tools/tool-lighter-v1.png",
      "assets/stage-2/tools/tool-soapy-solution-v1.png",
      "assets/stage-2/tools/tool-inspection-brush-v1.png",
      "assets/stage-2/effects/effect-soap-normal-v1.png",
      "assets/stage-2/effects/effect-soap-leak-v1.png"
    ]
  });

  function pathsFor(names) {
    var list = [];
    (Array.isArray(names) ? names : [names]).forEach(function (name) {
      (groups[name] || [name]).forEach(function (src) {
        if (!list.includes(src)) list.push(src);
      });
    });
    return list;
  }

  function loadImage(src) {
    if (cache.has(src)) return cache.get(src);
    var promise = new Promise(function (resolve, reject) {
      var image = new Image();
      image.onload = function () {
        if (image.decode) image.decode().catch(function () {}).then(function () { resolve(src); });
        else resolve(src);
      };
      image.onerror = function () { reject(new Error("Unable to prepare " + src)); };
      image.src = src;
    });
    cache.set(src, promise);
    return promise;
  }

  function prepare(names) {
    return Promise.allSettled(pathsFor(names).map(loadImage));
  }

  function setVisible(visible) {
    if (!overlay) return;
    overlay.hidden = !visible;
    document.body.setAttribute("aria-busy", visible ? "true" : "false");
    if (visible) shownAt = performance.now();
  }

  async function run(names, action) {
    activeLoads += 1;
    var visible = false;
    var delayedShow = window.setTimeout(function () {
      visible = true;
      setVisible(true);
    }, 150);
    await prepare(names);
    window.clearTimeout(delayedShow);
    if (typeof action === "function") await action();
    activeLoads -= 1;
    if (!activeLoads && visible) {
      var remaining = Math.max(0, 300 - (performance.now() - shownAt));
      window.setTimeout(function () { if (!activeLoads) setVisible(false); }, remaining);
    }
  }

  window.AssetLoader = Object.freeze({ prepare: prepare, run: run, groups: groups });
}());
