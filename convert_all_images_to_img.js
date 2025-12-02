const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

// Função para extrair texto alternativo ou gerar um
function getAltText(match, altText, imagePath) {
  if (altText && altText.trim()) {
    return altText.trim();
  }
  // Extrair nome do arquivo sem extensão como fallback
  const fileName = path.basename(imagePath, path.extname(imagePath));
  return fileName.replace(/[()]/g, ' ').trim();
}

// Função para processar arquivo MDX
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Padrão 1: <figure>![](/images/...)</figure>
  content = content.replace(/<figure>!\[([^\]]*)\]\(([^)]+)\)<\/figure>/gi, (match, alt, imgPath) => {
    const altText = getAltText(match, alt, imgPath);
    return `<img src="${imgPath}" alt="${altText}" />`;
  });
  
  // Padrão 2: ![](/images/...) sem figure
  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/gi, (match, alt, imgPath) => {
    // Só processar se for uma imagem (termina com extensão de imagem)
    if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(imgPath)) {
      const altText = getAltText(match, alt, imgPath);
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

console.log('=== Convertendo todas as imagens para formato <img> ===\n');
console.log('Convertendo: <figure>![](/images/...)</figure> e ![](/images/...) → <img src="..." alt="..." />\n');

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
      // Verificar se ainda há imagens no formato antigo (mas ignorar links normais)
      if (content.match(/!\[.*\]\(\/images\/.*\.(png|jpg|jpeg|gif|svg|webp)\)/i) || 
          content.match(/<figure>!\[.*\]\(\/images\//i)) {
        remaining.push(path.relative(pagesDir, filePath));
      }
    }
  });
}

checkRemaining(pagesDir);

if (remaining.length === 0) {
  console.log('✅ Todas as imagens foram convertidas!');
} else {
  console.log(`⚠️  ${remaining.length} arquivo(s) ainda com formato antigo:`);
  remaining.forEach(file => console.log(`   - ${file}`));
}

