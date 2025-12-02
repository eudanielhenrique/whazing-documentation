const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

// Função para processar arquivo MDX
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Substituir TODOS os caminhos relativos para absolutos
  // Padrão: ../images/ ou ../../images/ ou ../../../images/ → /images/
  content = content.replace(/(\.\.\/)+images\//g, '/images/');
  
  if (content !== originalContent) {
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

console.log('=== Convertendo TODOS os caminhos de imagens ===\n');
console.log('Convertendo: ../images/ → /images/\n');

const fixed = processDirectory(pagesDir);
console.log(`\n✅ ${fixed} arquivo(s) corrigido(s)`);

// Verificação final
console.log('\n=== Verificação ===\n');
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
      if (content.includes('../images/')) {
        remaining.push(path.relative(pagesDir, filePath));
      }
    }
  });
}

checkRemaining(pagesDir);

if (remaining.length === 0) {
  console.log('✅ Todos os caminhos foram convertidos!');
} else {
  console.log(`⚠️  ${remaining.length} arquivo(s) ainda com caminhos relativos:`);
  remaining.forEach(file => console.log(`   - ${file}`));
}

