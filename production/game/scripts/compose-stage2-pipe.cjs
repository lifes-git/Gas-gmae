const sharp = require("sharp");

const [, , pipePath, handlePath, outputPath] = process.argv;
if (!pipePath || !handlePath || !outputPath) {
  throw new Error("Usage: node compose-stage2-pipe.cjs <pipe> <handle> <output>");
}

(async () => {
  const pipe = sharp(pipePath);
  const pipeBuffer = await pipe.png().toBuffer({ resolveWithObject:true });
  const metadata = pipeBuffer.info;
  const handle = await sharp(handlePath)
    .trim({ background:{ r:0, g:0, b:0, alpha:0 } })
    .rotate(90, { background:{ r:0, g:0, b:0, alpha:0 } })
    .resize({ width:320, fit:"inside" })
    .png()
    .toBuffer({ resolveWithObject:true });

  const canvasWidth = 560;
  const pipeLeft = Math.round((canvasWidth - metadata.width) / 2);
  const pivotX = Math.round(handle.info.width * .85);
  const pivotY = Math.round(metadata.height * 0.486);
  const handleLeft = Math.round(canvasWidth / 2 - pivotX);
  const handleTop = Math.round(pivotY - handle.info.height / 2 + 24);

  await sharp({ create:{ width:canvasWidth, height:metadata.height, channels:4, background:{ r:0, g:0, b:0, alpha:0 } } })
    .composite([
      { input:pipeBuffer.data, left:pipeLeft, top:0 },
      { input:handle.data, left:handleLeft, top:handleTop }
    ])
    .png()
    .toFile(outputPath);
})();
