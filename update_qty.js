const fs = require('fs');
const file = 'src/data/products.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/^(\s*)maxQty:\s*\d+,?\r?\n?/gm, '');
content = content.replace(/^(\s*)minQty:\s*\d+,?/gm, '$1minQty: 1,\n$1maxQty: 2000,');

fs.writeFileSync(file, content);
console.log('Done');
