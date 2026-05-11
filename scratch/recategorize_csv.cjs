const fs = require('fs');
const path = require('path');

const csvPath = path.resolve(__dirname, '..', 'Productos.csv');

// Read CSV
const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split(/\r?\n/);
const header = lines[0];
let dataLines = lines.slice(1).filter(l => l.trim() !== '');

// Parse lines into objects
let products = dataLines.map(line => {
    // Simple CSV parser
    const parts = line.split(',');
    const cat = parts[0];
    const nameLine = line.substring(cat.length + 1);
    const nameMatch = nameLine.match(/^"([^"]+)",/);
    let name = "";
    let rest = "";
    if (nameMatch) {
        name = nameMatch[1];
        rest = nameLine.substring(nameMatch[0].length);
    } else {
        name = parts[1];
        rest = parts.slice(2).join(',');
    }
    const restParts = rest.split(',');
    const desc = restParts[0] || '';
    const img = restParts[1] || '';
    
    return { cat, name, desc, img };
});

// 1. Delete "Ramos Premium - Modelo 15"
products = products.filter(p => !(p.cat === 'ramos' && p.name === 'Ramos Premium - Modelo 15'));

// 2. Define moves
const moves = [
    // To Graduacion (Note: These might be already moved by generateData if in folder, but let's be sure)
    { name: 'Decoraciones Exclusivo - Modelo 114', to: 'graduacion' },
    { name: 'Decoraciones Premium - Modelo 113', to: 'graduacion' },
    { name: 'Decoraciones Personalizado - Modelo 40', to: 'graduacion' },
    { name: 'Decoraciones Exclusivo - Modelo 9', to: 'graduacion' },
    
    // To Babyshower
    { name: 'Fiesta Infantil Exclusivo - Modelo 2', to: 'babyshower' },
    
    // To Shimmer
    { name: 'Fiesta Infantil Hermoso - Modelo 3', to: 'muro-shimmer-con-arco-de-globos-y-mobiliario' },
    
    // To Box de Regalo
    { name: 'Ramos Especial - Modelo 18', to: 'box-de-regalo' },
    { name: 'Ramos Personalizado - Modelo 33', to: 'box-de-regalo' },
    { name: 'Ramos Premium - Modelo 36', to: 'box-de-regalo' },
    { name: 'Ramos Moderno - Modelo 55', to: 'box-de-regalo' },
    { name: 'Ramos Exclusivo - Modelo 58', to: 'box-de-regalo' },
    { name: 'Ramos Personalizado - Modelo 68', to: 'box-de-regalo' },
];

// Apply specific moves
moves.forEach(move => {
    const p = products.find(prod => prod.name === move.name);
    if (p) p.cat = move.to;
});

// To Detalles Personalizados (Ramos Modelos: 7, 16, 23, 32, 37, 43, 44, 45, 47, 49, 59, 60, 65, 66, 74, 75, 76, 77, 78, 85, 88 y 93)
const ramosToDetalles = [7, 16, 23, 32, 37, 43, 44, 45, 47, 49, 59, 60, 65, 66, 74, 75, 76, 77, 78, 85, 88, 93];
ramosToDetalles.forEach(num => {
    const p = products.find(prod => prod.cat === 'ramos' && prod.name.endsWith(`Modelo ${num}`));
    if (p) p.cat = 'detalles-personalizados';
});

// Group by category (for clean CSV)
products.sort((a, b) => a.cat.localeCompare(b.cat));

// Convert back to CSV
const updatedLines = products.map(p => `${p.cat},"${p.name}",${p.desc},${p.img}`);
fs.writeFileSync(csvPath, header + '\n' + updatedLines.join('\n') + '\n');

console.log('CSV Re-categorized and image URLs preserved.');
