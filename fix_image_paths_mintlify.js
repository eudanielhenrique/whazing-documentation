const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

// Função para processar arquivo MDX
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Padrão 1: Caminhos relativos ../images/ ou ../../images/ ou ../../../images/
  const relativePattern = /!\[([^\]]*)\]\((\.\.\/)+images\/([^)]+)\)/gi;
  
  content = content.replace(relativePattern, (match, alt, dots, imageName) => {
    modified = true;
    // Converter para caminho absoluto do Mintlify
    return `![${alt}](/images/${imageName})`;
  });
  
  // Padrão 2: Em <figure>
  const figurePattern = /<figure>!\[([^\]]*)\]\((\.\.\/)+images\/([^)]+)\)<\/figure>/gi;
  
  content = content.replace(figurePattern, (match, alt, dots, imageName) => {
    modified = true;
    return `<figure>![${alt}](/images/${imageName})</figure>`;
  });
  
  // Padrão 3: Caminhos relativos sem ![] (só o caminho)
  const loosePattern = /\((\.\.\/)+images\/([^)]+)\)/gi;
  
  content = content.replace(loosePattern, (match, dots, imageName) => {
    // Verificar se não é parte de um markdown link já processado
    if (!match.includes('![')) {
      modified = true;
      return `(/images/${imageName})`;
    }
    return match;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    const relPath = path.relative(pagesDir, filePath);
    console.log(`✅ ${relPath}`);
    return true;
  }
  
  return false;
}

// Processar todos os arquivos
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
        count++;
      }
    }
  });
  
  return count;
}

console.log('=== Convertendo caminhos de imagens para formato Mintlify ===\n');
console.log('Convertendo caminhos relativos (../images/) para absolutos (/images/)\n');

const fixed = processDirectory(pagesDir);
console.log(`\n✅ ${fixed} arquivo(s) corrigido(s)`);

