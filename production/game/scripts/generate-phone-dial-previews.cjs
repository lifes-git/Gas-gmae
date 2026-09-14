const fs = require("fs");
const path = require("path");

const rate = 44100;
const outDir = path.resolve(__dirname, "../audio-previews/phone-dial");
fs.mkdirSync(outDir, { recursive: true });

function envelope(t, duration, attack = 0.008, release = 0.045) {
  return Math.min(1, t / attack, (duration - t) / release);
}

function wav(name, duration, sampleAt) {
  const count = Math.ceil(duration * rate);
  const data = Buffer.alloc(count * 2);
  for (let i = 0; i < count; i += 1) {
    const value = Math.max(-1, Math.min(1, sampleAt(i / rate)));
    data.writeInt16LE(Math.round(value * 32767), i * 2);
  }
  const header = Buffer.alloc(44);
  header.write("RIFF", 0); header.writeUInt32LE(36 + data.length, 4);
  header.write("WAVEfmt ", 8); header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); header.writeUInt16LE(1, 22);
  header.writeUInt32LE(rate, 24); header.writeUInt32LE(rate * 2, 28);
  header.writeUInt16LE(2, 32); header.writeUInt16LE(16, 34);
  header.write("data", 36); header.writeUInt32LE(data.length, 40);
  fs.writeFileSync(path.join(outDir, name), Buffer.concat([header, data]));
}

function sequence(events, tail, voice) {
  const end = events.at(-1)[0] + events.at(-1)[1] + tail;
  return [end, (t) => events.reduce((sum, [start, duration, frequencies], index) => {
    const local = t - start;
    if (local < 0 || local >= duration) return sum;
    return sum + voice(local, duration, frequencies, index);
  }, 0)];
}

const dtmf = [[697, 1209], [697, 1336], [770, 1209], [770, 1336]];

let spec = sequence(dtmf.map((f, i) => [i * .24, .13, f]), .12,
  (t, d, f) => envelope(t, d) * .34 * (Math.sin(2 * Math.PI * f[0] * t) + Math.sin(2 * Math.PI * f[1] * t)));
wav("dial-01-real-dtmf.wav", spec[0], spec[1]);

spec = sequence([[0,.11,[660]],[.2,.11,[760]],[.4,.11,[880]],[.6,.15,[1040]]], .18,
  (t, d, f) => envelope(t, d, .006, .07) * .62 * (Math.sin(2*Math.PI*f[0]*t) + .22*Math.sin(2*Math.PI*f[0]*2*t)));
wav("dial-02-soft-game.wav", spec[0], spec[1]);

spec = sequence([[0,.08,[520]],[.17,.08,[590]],[.34,.08,[670]],[.51,.1,[760]]], .16,
  (t, d, f) => envelope(t, d, .002, .055) * .58 * (Math.sign(Math.sin(2*Math.PI*f[0]*t))*.18 + Math.sin(2*Math.PI*f[0]*t)*.82));
wav("dial-03-toon-keypad.wav", spec[0], spec[1]);

spec = sequence([[0,.095,[720]],[.19,.095,[810]],[.38,.095,[900]],[.57,.16,[1080]]], .22,
  (t, d, f, i) => envelope(t, d, .004, .09) * .55 * (Math.sin(2*Math.PI*(f[0] + 70*t)*t) + .3*Math.sin(2*Math.PI*(f[0]*1.5)*t)) / (i === 3 ? .9 : 1.15));
wav("dial-04-bright-confirm.wav", spec[0], spec[1]);

console.log(`Generated 4 previews in ${outDir}`);
