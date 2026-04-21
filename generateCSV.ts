import fs from 'fs';
import { categories, productsData } from './src/data';

// Categorias.csv
let catCsv = 'id,title,emoji\n';
categories.forEach(c => {
  catCsv += `${c.id},"${c.title}",${c.emoji || ''}\n`;
});
fs.writeFileSync('Categorias.csv', catCsv);
console.log('Created Categorias.csv');

// Productos.csv
let prodCsv = 'categoria,nombre,descripcion,imagen_url\n';
Object.entries(productsData).forEach(([catId, products]) => {
  products.forEach((p: any) => {
    const name = `"${p.name.replace(/"/g, '""')}"`;
    const desc = p.description ? `"${p.description.replace(/"/g, '""')}"` : '';
    prodCsv += `${catId},${name},${desc},\n`; // image_url empty for existing products
  });
});
fs.writeFileSync('Productos.csv', prodCsv);
console.log('Created Productos.csv');
