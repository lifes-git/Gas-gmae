/* Isolated listening prototypes, no changes to production game audio. */
"use strict";
let context, output, active = [];
const volume = document.getElementById("volume");
function stop() {
  active.forEach(node => { try { node.stop(); } catch (_) {} });
  active = [];
}
function envelope(duration, peak, attack) {
  const gain = context.createGain(), now = context.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(peak, now + attack);
  gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
  gain.connect(output);
  return gain;
}
function tone(frequency, end, duration, peak, attack) {
  const source = context.createOscillator(), gain = envelope(duration, peak, attack);
  source.frequency.setValueAtTime(frequency, context.currentTime);
  source.frequency.exponentialRampToValueAtTime(end, context.currentTime + duration);
  source.connect(gain); source.start(); source.stop(context.currentTime + duration + .01);
  source.onended = () => { source.disconnect(); gain.disconnect(); };
  active.push(source);
}
function cloth(variant) {
  const duration = variant ? .42 : .65;
  const source = context.createBufferSource(), buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
  const data = buffer.getChannelData(0);
  let seed = 7241;
  for (let i = 0; i < data.length; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const t = i / data.length;
    data[i] = (seed / 2147483648 - 1) * Math.sin(Math.PI * t) ** 2 * (.7 + .3 * Math.sin(t * 24));
  }
  source.buffer = buffer;
  const filter = context.createBiquadFilter(), gain = context.createGain();
  filter.type = "bandpass"; filter.Q.value = .5; filter.frequency.value = variant ? 3500 : 1700;
  gain.gain.value = .32;
  source.connect(filter); filter.connect(gain); gain.connect(output); source.start();
  source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
  active.push(source);
}
async function play(kind, variant) {
  try {
    if (!context) {
      context = new (window.AudioContext || window.webkitAudioContext)();
      output = context.createGain(); output.connect(context.destination);
    }
    await context.resume(); stop(); output.gain.value = Number(volume.value);
    if (kind === "button") tone(variant ? 650 : 390, variant ? 260 : 220, .16, .25, .015);
    if (kind === "cloth") cloth(variant);
    if (kind === "can") {
      const base = variant ? 680 : 410;
      [1, 2.31, 3.87].forEach((ratio, i) => tone(base * ratio, base * ratio * .97, .22 + i * .035, .14 / (i + 1), .018));
    }
    document.getElementById("status").textContent = ({button:"버튼",cloth:"수건",can:"부탄캔"})[kind] + " " + (variant ? "B" : "A") + " 시안";
  } catch (_) { document.getElementById("status").textContent = "이 브라우저에서 소리를 재생할 수 없습니다."; }
}
document.querySelectorAll("[data-kind]").forEach(button => button.addEventListener("click", () => play(button.dataset.kind, Number(button.dataset.variant))));
document.getElementById("stop").addEventListener("click", stop);
volume.addEventListener("input", () => { if (output) output.gain.setTargetAtTime(Number(volume.value), context.currentTime, .015); });
document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });
