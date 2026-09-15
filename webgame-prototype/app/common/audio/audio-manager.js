(function () {
  "use strict";
  var context = null;
  var lastPlayed = Object.create(null);
  var samples = Object.create(null);

  function enabled() {
    var setting = document.getElementById("sound-setting");
    return !setting || setting.checked;
  }
  function getContext() {
    var AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    context = context || new AudioContextClass();
    if (context.state === "suspended") context.resume().catch(function () {});
    return context;
  }
  function tone(ctx, start, frequency, duration, volume, endFrequency, wave) {
    var oscillator = ctx.createOscillator(), gain = ctx.createGain();
    oscillator.type = wave || "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(.0002, volume), start + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(gain); gain.connect(ctx.destination);
    oscillator.start(start); oscillator.stop(start + duration + .02);
  }
  function noise(ctx, start, duration, volume, frequency, q) {
    var frames = Math.ceil(ctx.sampleRate * duration);
    var buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    var data = buffer.getChannelData(0), seed = 9187;
    for (var i = 0; i < frames; i += 1) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      data[i] = (seed / 2147483648 - 1) * Math.sin(Math.PI * i / frames);
    }
    var source = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), gain = ctx.createGain();
    source.buffer = buffer; filter.type = "bandpass"; filter.frequency.value = frequency; filter.Q.value = q || .7; gain.gain.value = volume;
    source.connect(filter); filter.connect(gain); gain.connect(ctx.destination); source.start(start);
  }
  function synth(ctx, type, volume) {
    var now = ctx.currentTime + .005;
    if (type === "click") tone(ctx, now, 760, .075, volume, 420, "triangle");
    else if (type === "slide") { noise(ctx, now, .42, volume * .65, 1050, .55); tone(ctx, now + .24, 470, .18, volume * .55, 660); }
    else if (type === "drop") { tone(ctx, now, 520, .12, volume, 700); tone(ctx, now + .075, 820, .14, volume * .7, 920); }
    else if (type === "wrong") { tone(ctx, now, 330, .16, volume, 245, "square"); tone(ctx, now + .18, 260, .22, volume * .85, 185, "square"); }
    else if (type === "scrub") { noise(ctx, now, .48, volume, 1450, .8); noise(ctx, now + .18, .42, volume * .72, 1850, .7); }
    else if (type === "bubble") { tone(ctx, now, 520, .11, volume, 760); tone(ctx, now + .12, 690, .12, volume * .8, 980); }
    else if (type === "warningBubble") { tone(ctx, now, 420, .16, volume, 610); tone(ctx, now + .12, 350, .2, volume * .85, 510); tone(ctx, now + .34, 190, .34, volume * .72, 150, "triangle"); }
    else if (type === "paper") { noise(ctx, now, .3, volume, 2200, .45); tone(ctx, now + .18, 610, .18, volume * .55, 790); }
    else if (type === "collect") [590,740,940].forEach(function (f,i) { tone(ctx, now + i * .09, f, .17, volume * (.9 - i * .12), f * 1.04); });
    else if (type === "storyStep") {
      [0,.28,.56].forEach(function (offset, i) {
        noise(ctx, now + offset, .09, volume * (.9 - i * .12), 360, 1.2);
        tone(ctx, now + offset, 150, .08, volume * .45, 115, "triangle");
      });
    }
    else if (type === "phoneRing") {
      [0,.48].forEach(function (offset) {
        tone(ctx, now + offset, 440, .16, volume, 470, "sine");
        tone(ctx, now + offset + .16, 554, .2, volume * .92, 520, "sine");
      });
    }
    else if (type === "phoneDial") {
      [697,770,852].forEach(function (frequency, i) {
        tone(ctx, now + i * .24, frequency, .085, volume * (.94 - i * .08), frequency * .98, "sine");
      });
    }
    else if (type === "complete") [523,659,784,1047].forEach(function (f,i) { tone(ctx, now + i * .11, f, .28, volume * (.88 - i * .08), f * 1.03, "triangle"); });
  }
  function playSample(config) {
    var sample = samples[config.src] || (samples[config.src] = new Audio(config.src));
    sample.pause();
    sample.currentTime = 0;
    sample.volume = Math.max(0, Math.min(1, config.volume));
    sample.play().catch(function () {});
  }
  function play(id) {
    var config = window.GAME_SOUND_DATA && window.GAME_SOUND_DATA[id];
    if (!config || !enabled()) return false;
    var now = performance.now();
    if (now - (lastPlayed[id] || 0) < config.cooldown) return false;
    lastPlayed[id] = now;
    if (config.type === "sample") playSample(config);
    else {
      var ctx = getContext();
      if (!ctx) return false;
      synth(ctx, config.type, config.volume);
    }
    document.dispatchEvent(new CustomEvent("game-sound-played", {
      detail:{ id:id, duckDuration:config.duckDuration || (config.type === "sample" ? 1000 : 550) }
    }));
    return true;
  }
  window.AudioManager = Object.freeze({ play:play });
}());
