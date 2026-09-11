const sharp = require("sharp");

const [, , input, output] = process.argv;
if (!input || !output) {
  throw new Error("Usage: node chroma-key-to-alpha.cjs <input> <output>");
}

(async () => {
  const source = sharp(input).ensureAlpha();
  const { data, info } = await source.raw().toBuffer({ resolveWithObject:true });

  for (let offset = 0; offset < data.length; offset += 4) {
    const red = data[offset];
    const green = data[offset + 1];
    const blue = data[offset + 2];
    const distance = Math.sqrt(red * red + (255 - green) * (255 - green) + blue * blue);
    const alpha = Math.max(0, Math.min(255, Math.round((distance - 18) * 255 / 72)));
    const opacity = alpha / 255;
    if (opacity > 0 && opacity < 1) {
      data[offset] = Math.max(0, Math.min(255, Math.round(red / opacity)));
      data[offset + 1] = Math.max(0, Math.min(255, Math.round((green - (1 - opacity) * 255) / opacity)));
      data[offset + 2] = Math.max(0, Math.min(255, Math.round(blue / opacity)));
    }
    const greenDominant = green > red * 1.35 && green > blue * 1.35;
    data[offset + 3] = alpha < 64 || greenDominant ? 0 : alpha;
    if (alpha < 64 || greenDominant) data[offset] = data[offset + 1] = data[offset + 2] = 0;
  }

  await sharp(data, { raw:info }).trim({ background:{ r:0, g:0, b:0, alpha:0 } }).png().toFile(output);
})();
