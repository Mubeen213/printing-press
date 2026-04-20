const fs = require('fs');
const path = require('path');
const dirs = ['backpacks','beach_bags','cotton_bags','jute_bags','non_woven_bags','recycled_cotton_bags','tote_bags'];
dirs.forEach(dir => {
  const p = path.join('src/assets/bags', dir);
  const files = fs.readdirSync(p).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
  let content = '';
  let exports = [];
  const baseName = dir;
  const prefix = baseName.replace(/_[a-z]/g, match => match[1].toUpperCase()).replace(/^[A-Z]/, match => match.toLowerCase());
  files.forEach((f, i) => {
    const varName = `${prefix}${i+1}`;
    content += `import ${varName} from './${f}';\n`;
    exports.push(varName);
  });
  content += `\nexport {\n  ${exports.join(',\\n  ')}\n};\n`;
  fs.writeFileSync(path.join(p, 'index.ts'), content);
});
