const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const csvPath = path.join(projectRoot, 'Productos.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split(/\r?\n/);
const header = lines[0];
const dataLines = lines.slice(1).filter(line => line.trim() !== '');

const updatedLines = [];

dataLines.forEach(line => {
    // Parser to handle quotes
    let cat, name, desc, img;
    // Regex matches: category,"Name",description,image_url
    const parts = line.match(/^([^,]+),"([^"]+)",([^,]*),(.*)$/);
    
    if (parts) {
        cat = parts[1];
        name = parts[2];
        desc = parts[3];
        img = parts[4];
    } else {
        const simpleParts = line.split(',');
        cat = simpleParts[0];
        name = simpleParts[1];
        desc = simpleParts[2];
        img = simpleParts[3];
    }

    if (cat === 'ramos') {
        if (name === 'Ramos Premium - Modelo 15') return;

        const modelMatch = name.match(/Modelo (\d+)/);
        if (modelMatch) {
            const modelNum = parseInt(modelMatch[1]);
            if (modelNum >= 1 && modelNum <= 14) {
                cat = 'detalles-personalizados';
            } else if (modelNum >= 16) {
                cat = 'box-de-regalo';
            }
        } else {
            cat = 'detalles-personalizados';
        }
    }

    updatedLines.push({ cat, name, desc, img });
});

updatedLines.sort((a, b) => a.cat.localeCompare(b.cat));

const output = [header];
updatedLines.forEach(item => {
    output.push(`${item.cat},"${item.name}",${item.desc},${item.img}`);
});

fs.writeFileSync(csvPath, output.join('\n') + '\n');
console.log('Final reorganization complete with image URLs preserved.');
