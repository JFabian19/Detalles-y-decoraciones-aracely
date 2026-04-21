const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data.ts');
let fileContent = fs.readFileSync(dataPath, 'utf8');

// Extract categories and productsData using regex or naive eval?
// Since it's standard format, we can safely require it by removing exports if needed, 
// or just use regex to replace. A better way: eval the data!
const tsCode = fileContent.replace('export const categories =', 'const categories =')
                          .replace('export const productsData =', 'const productsData =');

const evalScript = `
${tsCode}
module.exports = { categories, productsData };
`;
fs.writeFileSync(path.join(__dirname, 'temp.cjs'), evalScript);

const { categories, productsData } = require('./temp.cjs');

// Helpers for string improvement
function toTitleCase(str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
  });
}

function improveExistingName(name) {
  if (name.includes('WhatsApp Image')) return name; // Will handle later
  
  let newName = name;
  // Replace + with " + "
  newName = newName.replace(/\+/g, ' + ');
  // Replace - between words with " y " or space depending. If it looks like colors:
  // AZUL-BLANCO -> Azul y Blanco
  // DORADO-ROSADO -> Dorado y Rosado
  newName = newName.replace(/([A-Z]+)-([A-Z]+)-([A-Z]+)/gi, '$1, $2 y $3');
  newName = newName.replace(/([A-Z]+)-([A-Z]+)/gi, '$1 y $2');
  
  // Condense spaces
  newName = newName.replace(/\s+/g, ' ').trim();
  
  // Title Case
  newName = toTitleCase(newName);
  
  // Small words in lowercase
  const lowerWords = ['Y', 'De', 'Con', 'La', 'El', 'En', 'Para', 'A', 'Sin'];
  lowerWords.forEach(word => {
    const rx = new RegExp(`\\b${word}\\b`, 'gi');
    newName = newName.replace(rx, word.toLowerCase());
  });
  
  // Initial caps fixing
  newName = newName.charAt(0).toUpperCase() + newName.slice(1);
  
  return newName;
}

function getCategorySingular(catTitle) {
  let title = toTitleCase(catTitle).replace(/s$/, ''); // Remove trailing S naively
  if (title.endsWith('o')) return title;
  if (title.endsWith('a')) return title;
  return toTitleCase(catTitle);
}

// Transform Names
Object.keys(productsData).forEach(catId => {
  const cat = categories.find(c => c.id === catId);
  const catTitle = cat ? cat.title : 'Diseño';
  
  let waCounter = 1;
  const products = productsData[catId];
  
  products.forEach(p => {
    if (p.name.includes('WhatsApp Image')) {
      const adjective = ['Elegante', 'Premium', 'Exclusivo', 'Hermoso', 'Especial', 'Personalizado', 'Moderno'][waCounter % 7];
      p.name = `${toTitleCase(catTitle)} ${adjective} - Modelo ${waCounter}`;
      waCounter++;
    } else {
      p.name = improveExistingName(p.name);
    }
  });
});

const newContent = `
export const categories = ${JSON.stringify(categories, null, 2)};
export const productsData = ${JSON.stringify(productsData, null, 2)};
`;

fs.writeFileSync(dataPath, newContent);
fs.unlinkSync(path.join(__dirname, 'temp.cjs'));
console.log('Names improved successfully!');
