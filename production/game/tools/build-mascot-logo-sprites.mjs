// Compose original PNG bytes with the official vector symbol; never repaint.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root = 'webgame-prototype/assets';
const official = fs.readFileSync(`${root}/masters/kgs-official-signature.svg`, 'utf8');
const defs = official.match(/<defs>[\s\S]*?<\/defs>/)[0];
// Original first six paths are the symbol. cls-7 paths are the wordmark.
const paths = [...official.matchAll(/<path class="cls-[1-6]"[^>]*\/>/g)].map(m=>m[0]).join('');
if ((paths.match(/<path/g)||[]).length !== 6) throw new Error('Official symbol structure changed');
const poses = [
  ['guide','runtime/mascot-somyeongi-guide-v1.png',.53,.548,.079,0],
  ['question','runtime/mascots/mascot-somyeongi-question-v1.png',.558,.533,.062,-8],
  ['caution','runtime/mascots/mascot-somyeongi-caution-v1.png',.545,.52,.083,0],
  ['success','runtime/mascots/mascot-somyeongi-success-v1.png',.568,.522,.084,0],
  ['exit','runtime/mascots/mascot-somyeongi-exit-v1.png',.574,.524,.067,-10],
  ['title','runtime/mascot-somyeongi-title-v2.png',.563,.519,.08,-8]
];
const out = `${root}/runtime/mascots`;
const records=[];
for (const [pose,input,cx,cy,ratio,angle] of poses) {
  const png=fs.readFileSync(`${root}/${input}`);
  const w=png.readUInt32BE(16),h=png.readUInt32BE(20);
  const lw=w*ratio,lh=lw*60.68/66.5,x=cx*w,y=cy*h;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><image width="${w}" height="${h}" href="data:image/png;base64,${png.toString('base64')}"/><g transform="rotate(${angle} ${x} ${y})"><svg x="${x-lw/2}" y="${y-lh/2}" width="${lw}" height="${lh}" viewBox="0 0 66.5 60.68">${defs}${paths}</svg></g></svg>`;
  const dest=`${out}/mascot-somyeongi-${pose}-logo-v1.svg`;
  fs.writeFileSync(dest,svg);
  records.push({pose,input,dest,width:w,height:h,bytes:Buffer.byteLength(svg),sha256:crypto.createHash('sha256').update(svg).digest('hex')});
}
console.log(JSON.stringify(records,null,2));
