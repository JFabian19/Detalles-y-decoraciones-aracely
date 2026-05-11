const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data.ts');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tsCode = fileContent.replace('export const categories =', 'const categories =')
                          .replace('export const productsData =', 'const productsData =');

const evalScript = `
${tsCode}
module.exports = { categories, productsData };
`;
fs.writeFileSync(path.join(__dirname, 'temp_move.cjs'), evalScript);

const { categories, productsData } = require('./temp_move.cjs');

// Helper to move item
function moveProduct(name, toCat) {
  let found = false;
  for (const catId in productsData) {
    const idx = productsData[catId].findIndex(p => p.name === name || p.name.includes(name));
    if (idx !== -1) {
      if (catId === toCat) {
        console.log(`${name} is already in ${toCat}`);
        found = true;
        break;
      }
      const [product] = productsData[catId].splice(idx, 1);
      if (!productsData[toCat]) productsData[toCat] = [];
      productsData[toCat].push(product);
      console.log(`Moved ${name} from ${catId} to ${toCat}`);
      found = true;
      break;
    }
  }
  if (!found) console.log(`Not found: ${name}`);
}

// 1. To graduacion (Actually already done by generateData, but let's be sure)
moveProduct('Decoraciones Exclusivo - Modelo 114', 'graduacion');
moveProduct('Decoraciones Premium - Modelo 113', 'graduacion');
moveProduct('Decoraciones Personalizado - Modelo 40', 'graduacion');
moveProduct('Decoraciones Exclusivo - Modelo 9', 'graduacion');

// 2. To babyshower
moveProduct('Fiesta Infantil Exclusivo - Modelo 2', 'babyshower');

// 3. To muro-shimmer-con-arco-de-globos-y-mobiliario
moveProduct('Fiesta Infantil Hermoso - Modelo 3', 'muro-shimmer-con-arco-de-globos-y-mobiliario');

// 4. To box-de-regalo
moveProduct('Ramos Especial - Modelo 18', 'box-de-regalo');
moveProduct('Ramos Personalizado - Modelo 33', 'box-de-regalo');
moveProduct('Ramos Premium - Modelo 36', 'box-de-regalo');
moveProduct('Ramos Moderno - Modelo 55', 'box-de-regalo');
moveProduct('Ramos Exclusivo - Modelo 58', 'box-de-regalo');
moveProduct('Ramos Personalizado - Modelo 68', 'box-de-regalo');

// 5. Delete Ramos Premium - Modelo 15
for (const catId in productsData) {
  const idx = productsData[catId].findIndex(p => p.name === 'Ramos Premium - Modelo 15');
  if (idx !== -1) {
    productsData[catId].splice(idx, 1);
    console.log(`Deleted Ramos Premium - Modelo 15`);
    break;
  }
}

// 6. To detalles-personalizados
const ramosToMove = [7, 16, 23, 32, 37, 43, 44, 45, 47, 49, 59, 60, 65, 66, 74, 75, 76, 77, 78, 85, 88, 93];
ramosToMove.forEach(num => {
  // Try to find the exact name or something matching
  let found = false;
  for (const catId in productsData) {
    const idx = productsData[catId].findIndex(p => p.name.match(new RegExp(`Ramos .* - Modelo ${num}$`)));
    if (idx !== -1) {
      const [product] = productsData[catId].splice(idx, 1);
      if (!productsData['detalles-personalizados']) productsData['detalles-personalizados'] = [];
      productsData['detalles-personalizados'].push(product);
      console.log(`Moved Ramos Modelo ${num} from ${catId} to detalles-personalizados`);
      found = true;
      break;
    }
  }
  if (!found) console.log(`Not found: Ramos Modelo ${num}`);
});

const newContent = "export const categories = " + JSON.stringify(categories, null, 2) + ";\nexport const productsData = " + JSON.stringify(productsData, null, 2) + ";\n";

fs.writeFileSync(dataPath, newContent);
fs.unlinkSync(path.join(__dirname, 'temp_move.cjs'));
console.log('Finished moving products!');
