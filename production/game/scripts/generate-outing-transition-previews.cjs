const fs = require("fs");
const path = require("path");

const sampleRate = 44100;
const duration = 5.5;
const outDir = path.resolve(__dirname, "../audio-previews/outing-transition");
fs.mkdirSync(outDir, { recursive: true });

function envelope(t, attack, decay) {
  if (t < 0) return 0;
  if (t < attack) return t / attack;
  return Math.exp(-(t - attack) / decay);
}

function addTone(buffer, start, length, frequency, gain, options = {}) {
  const begin = Math.floor(start * sampleRate);
  const end = Math.min(buffer.length, begin + Math.floor(length * sampleRate));
  const attack = options.attack || 0.004;
  const decay = options.decay || Math.max(0.04, length * 0.24);
  const bend = options.bend || 0;
  const harmonics = options.harmonics || [[1, 1]];
  for (let i = begin; i < end; i += 1) {
    const t = (i - begin) / sampleRate;
    const f = frequency * (1 + bend * (t / length));
    let value = 0;
    for (const [ratio, level] of harmonics) {
      value += Math.sin(2 * Math.PI * f * ratio * t) * level;
    }
    buffer[i] += value * gain * envelope(t, attack, decay);
  }
}

function addKnock(buffer, at, frequency, gain, bright = false) {
  addTone(buffer, at, 0.28, frequency, gain, {
    decay: 0.055,
    bend: -0.18,
    harmonics: bright ? [[1, 1], [2.02, 0.32], [3.1, 0.14]] : [[1, 1], [1.5, 0.26], [2.4, 0.1]]
  });
}

function normalize(buffer, peak = 0.82) {
  let max = 0;
  for (const value of buffer) max = Math.max(max, Math.abs(value));
  if (!max) return;
  const scale = peak / max;
  for (let i = 0; i < buffer.length; i += 1) buffer[i] *= scale;
}

function writeWav(file, samples) {
  const dataBytes = samples.length * 2;
  const wav = Buffer.alloc(44 + dataBytes);
  wav.write("RIFF", 0); wav.writeUInt32LE(36 + dataBytes, 4); wav.write("WAVE", 8);
  wav.write("fmt ", 12); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(1, 22); wav.writeUInt32LE(sampleRate, 24);
  wav.writeUInt32LE(sampleRate * 2, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34);
  wav.write("data", 36); wav.writeUInt32LE(dataBytes, 40);
  for (let i = 0; i < samples.length; i += 1) {
    wav.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(samples[i] * 32767))), 44 + i * 2);
  }
  fs.writeFileSync(file, wav);
}

const variants = [
  {
    name: "01-soft-wood",
    build(b) {
      addKnock(b, 0.08, 145, 0.55); addKnock(b, 0.23, 460, 0.28, true);
      [0.72, 1.04, 1.38].forEach((t, i) => addKnock(b, t, 215 - i * 12, 0.26 - i * 0.025));
      addKnock(b, 2.48, 960, 0.18, true); addKnock(b, 2.92, 720, 0.18, true);
      [392, 523, 659].forEach((f, i) => addTone(b, 4.18 + i * 0.1, 0.8, f, 0.105, { decay: 0.32 }));
    }
  },
  {
    name: "02-round-toy",
    build(b) {
      addKnock(b, 0.08, 190, 0.48); addKnock(b, 0.2, 610, 0.24, true);
      [0.7, 1.0, 1.32].forEach((t, i) => addTone(b, t, 0.2, 280 + i * 18, 0.22, { decay: 0.045, bend: -0.24, harmonics: [[1, 1], [2, 0.18]] }));
      addKnock(b, 2.5, 1180, 0.15, true); addKnock(b, 2.88, 880, 0.15, true);
      [440, 554, 698].forEach((f, i) => addTone(b, 4.12 + i * 0.09, 0.72, f, 0.095, { decay: 0.28, harmonics: [[1, 1], [2, 0.08]] }));
    }
  },
  {
    name: "03-retro-flash",
    build(b) {
      addKnock(b, 0.07, 120, 0.5); addKnock(b, 0.19, 760, 0.22, true);
      [0.72, 1.0, 1.28].forEach((t, i) => addKnock(b, t, 250 + (i % 2) * 35, 0.22, true));
      addKnock(b, 2.42, 1320, 0.14, true); addKnock(b, 2.82, 980, 0.14, true);
      [330, 440, 660, 880].forEach((f, i) => addTone(b, 4.08 + i * 0.075, 0.62, f, 0.075, { decay: 0.24, harmonics: [[1, 1], [2, 0.14]] }));
    }
  }
];

for (const variant of variants) {
  const buffer = new Float64Array(Math.floor(sampleRate * duration));
  variant.build(buffer);
  normalize(buffer);
  writeWav(path.join(outDir, `${variant.name}.wav`), buffer);
}

console.log(`Created ${variants.length} previews in ${outDir}`);
