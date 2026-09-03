import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const root = process.cwd();
const assetRoot = 'webgame-prototype/assets';
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => {
    const p = path.join(dir,e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
const code = [...walk('webgame-prototype'), ...walk('production/game/tools')].filter(p => /\.(js|css|html|cjs|mjs)$/.test(p))
  .map(p => fs.readFileSync(p,'utf8')).join('\n');
const bible = fs.readFileSync('production/game/art-bible.md','utf8');
const assets = walk(assetRoot);
// Match filenames too: kitchen scenes assemble URLs from a root + basename.
const used = assets.filter(p => code.includes(path.basename(p)));
const stem = p => path.basename(p).replace(/\.[^.]+$/, '');
const usedStems = new Set(used.map(stem));
const sourceMasters = new Set([
  'title-result-source-v1.png', 'title-start-source-v1.png',
  'prop-butane-red-alpha-v4.png', 'prop-butane-red-cutout-v4.png',
  'stove-front-props-preview-v1.png', 'towel-extraction-rejected-v1.png',
  'bg-room-layered-solved-master-v3.png', 'bg-room-layered-unsafe-master-v3.png'
]);
const remove = assets.filter(p => !used.includes(p) && !usedStems.has(stem(p)) && !bible.includes(p) && !sourceMasters.has(path.basename(p)));
remove.push('production/game/concepts/kitchen-fresh-controls-v1.png', 'production/game/concepts/kitchen-stove-knobs-v1.png');
const existing = remove.filter(p => fs.existsSync(p));
const bytes = existing.reduce((n,p) => n + fs.statSync(p).size,0);
console.log(JSON.stringify({count:existing.length,megabytes:(bytes/1048576).toFixed(1),files:existing},null,2));
if (process.argv.includes('--apply')) {
  const backup = fs.mkdtempSync(path.join(os.tmpdir(),'gas-game-unused-assets-'));
  for (const p of existing) {
    const dest = path.join(backup,p);
    fs.mkdirSync(path.dirname(dest),{recursive:true});
    fs.renameSync(path.resolve(root,p),dest);
  }
  fs.writeFileSync(path.join(backup,'inventory.json'),JSON.stringify({root,files:existing},null,2));
  console.log('BACKUP: '+backup);
}
