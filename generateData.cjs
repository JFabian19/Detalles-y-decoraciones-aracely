const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public/Decoraciones');

const categoriesMap = new Map();
let productId = 1;

function walk(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walk(filePath);
    } else {
      // It's a file
      if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
        const categoryName = path.basename(dir);
        const productName = path.basename(file, path.extname(file));
        const relativePath = '/' + path.relative(path.join(__dirname, 'public'), filePath).replace(/\\/g, '/');
        
        if (!categoriesMap.has(categoryName)) {
          categoriesMap.set(categoryName, {
            id: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
            title: categoryName,
            products: []
          });
        }
        
        categoriesMap.get(categoryName).products.push({
          id: productId++,
          name: productName,
          price: 'Desde S/ 0', // Placeholder
          image: relativePath
        });
      }
    }
  });
}

walk(publicDir);

const categories = [];
const productsData = {};

categoriesMap.forEach((value) => {
  categories.push({ id: value.id, title: value.title });
  productsData[value.id] = value.products;
});

const arrayToOutput = `
export const categories = ${JSON.stringify(categories, null, 2)};
export const productsData = ${JSON.stringify(productsData, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'src', 'data.ts'), arrayToOutput);
console.log('src/data.ts generated successfully!');
