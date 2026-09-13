const sharp = require("sharp");

const [, , input, output] = process.argv;
if (!input || !output) {
  throw new Error("Usage: node chroma-edge-to-alpha.cjs <input> <output>");
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

(async () => {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject:true });
  const pixelCount = info.width * info.height;
  const connected = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  let head = 0;
  let tail = 0;

  function keyStrength(index) {
    const offset = index * 4;
    const red = data[offset];
    const green = data[offset + 1];
    const blue = data[offset + 2];
    return clamp((green - Math.max(red, blue) - 16) / 150, 0, 1);
  }

  function enqueue(index) {
    if (connected[index] || keyStrength(index) < 0.08) return;
    connected[index] = 1;
    queue[tail++] = index;
  }

  for (let x = 0; x < info.width; x += 1) {
    enqueue(x);
    enqueue((info.height - 1) * info.width + x);
  }
  for (let y = 0; y < info.height; y += 1) {
    enqueue(y * info.width);
    enqueue(y * info.width + info.width - 1);
  }

  while (head < tail) {
    const index = queue[head++];
    const x = index % info.width;
    const y = Math.floor(index / info.width);
    if (x > 0) enqueue(index - 1);
    if (x + 1 < info.width) enqueue(index + 1);
    if (y > 0) enqueue(index - info.width);
    if (y + 1 < info.height) enqueue(index + info.width);
  }

  for (let index = 0; index < pixelCount; index += 1) {
    if (!connected[index]) continue;
    const offset = index * 4;
    const strength = keyStrength(index);
    const alpha = Math.round(255 * (1 - strength));
    if (alpha <= 10) {
      data[offset] = data[offset + 1] = data[offset + 2] = data[offset + 3] = 0;
      continue;
    }
    const opacity = alpha / 255;
    data[offset] = clamp(Math.round(data[offset] / opacity), 0, 255);
    data[offset + 1] = clamp(Math.round((data[offset + 1] - (1 - opacity) * 255) / opacity), 0, 255);
    data[offset + 2] = clamp(Math.round(data[offset + 2] / opacity), 0, 255);
    data[offset + 3] = alpha;
  }

  await sharp(data, { raw:info })
    .trim({ background:{ r:0, g:0, b:0, alpha:0 } })
    .png()
    .toFile(output);
})();
