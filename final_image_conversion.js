const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

function getAltText(altText, imagePath) {
  if (altText && altText.trim() && altText.trim() !== 'print') {
    return altText.trim();
  }
  const fileName = path.basename(imagePath, path.extname(imagePath));
  return fileName.replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim();
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Substituir <figure>![alt](/images/...)</figure>
  content = content.replace(/<figure>!\[([^\]]*)\]\(([^)]+)\)<\/figure>/g, (match, alt, imgPath) => {
    const altText = getAltText(alt, imgPath);
    return `<img src="${imgPath}" alt="${altText}" />`;
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let count = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      count += processDirectory(filePath);
    } else if (file.endsWith('.mdx')) {
      if (processFile(filePath)) {
        const relPath = path.relative(pagesDir, filePath);
        console.log(`✅ ${relPath}`);
        count++;
      }
    }
  });
  
  return count;
}

console.log('=== Conversão Final de Imagens ===\n');

const fixed = processDirectory(pagesDir);
console.log(`\n✅ ${fixed} arquivo(s) corrigido(s)`);

// Verificação
const remaining = [];
function checkRemaining(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      checkRemaining(filePath);
    } else if (file.endsWith('.mdx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('<figure>![')) {
        remaining.push(path.relative(pagesDir, filePath));
      }
    }
  });
}

checkRemaining(pagesDir);

if (remaining.length === 0) {
  console.log('\n✅ Todas as imagens foram convertidas!');
} else {
  console.log(`\n⚠️  ${remaining.length} arquivo(s) ainda com <figure>:`);
  remaining.forEach(file => console.log(`   - ${file}`));
}

