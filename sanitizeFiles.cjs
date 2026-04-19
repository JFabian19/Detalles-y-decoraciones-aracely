const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public/Decoraciones');

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const renames = [];

function collect(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const cleanName = removeAccents(file);
    if (file !== cleanName) {
      renames.push({ from: filePath, to: path.join(dir, cleanName) });
    }
    if (fs.statSync(filePath).isDirectory()) {
      collect(filePath);
    }
  });
}

collect(publicDir);

// Sort renames by length descending to rename files before parent folders
renames.sort((a, b) => b.from.length - a.from.length);

renames.forEach(r => {
  try {
    if (fs.existsSync(r.from)) {
      console.log(`Renaming: ${path.basename(r.from)} -> ${path.basename(r.to)}`);
      fs.renameSync(r.from, r.to);
    }
  } catch (e) {
    console.error(`Failed to rename ${r.from}: ${e.message}`);
  }
});

console.log('Sanitization complete!');
