const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

// Função para extrair texto alternativo ou gerar um
function getAltText(altText, imagePath) {
  if (altText && altText.trim() && altText.trim() !== 'print') {
    return altText.trim();
  }
  // Extrair nome do arquivo sem extensão como fallback
  const fileName = path.basename(imagePath, path.extname(imagePath));
  return fileName.replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Função para processar arquivo MDX
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Padrão 1: <figure>![](/images/...)</figure> ou <figure>![alt](/images/...)</figure>
  content = content.replace(/<figure>!\[([^\]]*)\]\(([^)]+)\)<\/figure>/gi, (match, alt, imgPath) => {
    const altText = getAltText(alt, imgPath);
    return `<img src="${imgPath}" alt="${altText}" />`;
  });
  
  // Padrão 2: ![](/images/...) ou ![alt](/images/...) sem figure (mas só se for imagem)
  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/gi, (match, alt, imgPath) => {
    // Só processar se for uma imagem (termina com extensão de imagem) e não for link normal
    if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(imgPath) && imgPath.startsWith('/images/')) {
      const altText = getAltText(alt, imgPath);
      return `<img src="${imgPath}" alt="${altText}" />`;
    }
    return match; // Manter links normais
  });
  
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

console.log('=== Convertendo TODAS as imagens para formato <img> ===\n');

const fixed = processDirectory(pagesDir);
console.log(`\n✅ ${fixed} arquivo(s) corrigido(s)`);

// Verificação final
console.log('\n=== Verificação Final ===\n');
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
      // Verificar se ainda há imagens no formato antigo
      if (content.match(/<figure>!\[.*\]\(\/images\//i) || 
          (content.match(/!\[.*\]\(\/images\/.*\.(png|jpg|jpeg|gif|svg|webp)\)/i) && 
           !content.match(/<img src="\/images\//i))) {
        remaining.push(path.relative(pagesDir, filePath));
      }
    }
  });
}

checkRemaining(pagesDir);

if (remaining.length === 0) {
  console.log('✅ Todas as imagens foram convertidas!');
} else {
  console.log(`⚠️  ${remaining.length} arquivo(s) ainda precisam de ajuste:`);
  remaining.forEach(file => console.log(`   - ${file}`));
}

