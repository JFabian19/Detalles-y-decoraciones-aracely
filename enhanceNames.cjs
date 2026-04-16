const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data.ts');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tsCode = fileContent.replace('export const categories =', 'const categories =')
                          .replace('export const productsData =', 'const productsData =');

const evalScript = `
${tsCode}
module.exports = { categories, productsData };
`;
fs.writeFileSync(path.join(__dirname, 'temp.cjs'), evalScript);

const { categories, productsData } = require('./temp.cjs');

function toTitleCase(str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
  });
}

function improveExistingName(name) {
  if (name.includes('WhatsApp Image')) return name;
  
  let newName = name;
  newName = newName.replace(/\+/g, ' + ');
  newName = newName.replace(/([A-Z]+)-([A-Z]+)-([A-Z]+)/gi, '$1, $2 y $3');
  newName = newName.replace(/([A-Z]+)-([A-Z]+)/gi, '$1 y $2');
  
  newName = newName.replace(/\s+/g, ' ').trim();
  newName = toTitleCase(newName);
  
  const lowerWords = ['Y', 'De', 'Con', 'La', 'El', 'En', 'Para', 'A', 'Sin'];
  lowerWords.forEach(word => {
    const rx = new RegExp(`\\b${word}\\b`, 'g');
    newName = newName.replace(rx, word.toLowerCase());
  });
  
  newName = newName.charAt(0).toUpperCase() + newName.slice(1);
  
  return newName;
}

Object.keys(productsData).forEach(catId => {
  const cat = categories.find(c => c.id === catId);
  const catTitle = cat ? cat.title : 'Diseño';
  
  let waCounter = 1;
  const products = productsData[catId];
  
  products.forEach(p => {
    if (p.name.includes('WhatsApp Image')) {
      const adj = ['Elegante', 'Premium', 'Exclusivo', 'Hermoso', 'Especial', 'Personalizado', 'Moderno'][waCounter % 7];
      p.name = `${toTitleCase(catTitle)} ${adj} - Modelo ${waCounter}`;
      waCounter++;
    } else {
      p.name = improveExistingName(p.name);
    }
  });
});

const newContent = "export const categories = " + JSON.stringify(categories, null, 2) + ";\nexport const productsData = " + JSON.stringify(productsData, null, 2) + ";\n";

fs.writeFileSync(dataPath, newContent);
fs.unlinkSync(path.join(__dirname, 'temp.cjs'));
console.log('Names improved successfully!');
