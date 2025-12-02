const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

// Lista de arquivos que precisam ser corrigidos
const filesToFix = [
  'features/attendance/closing-reasons.mdx',
  'features/attendance/farewell.mdx',
  'features/attendance/follow-up.mdx',
  'features/automation/campaigns.mdx',
  'features/automation/chatbot.mdx',
  'features/automation/keyword-flows.mdx',
  'features/management/users.mdx',
  'features/whatsapp/pwa.mdx',
  'infrastructure/backup.mdx',
  'integrations/crm/hubsoft.mdx',
  'integrations/crm/ixc.mdx',
  'integrations/crm/perfex.mdx',
  'integrations/voice/sip-dialer.mdx',
  'integrations/webhooks/n8n.mdx'
];

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
  
  // Remover blocos de código que contêm figure (problema no ixc.mdx)
  content = content.replace(/```\s*\n<figure>!\[([^\]]*)\]\(([^)]+)\)<\/figure>\s*\n```/gi, (match, alt, imgPath) => {
    const altText = getAltText(alt, imgPath);
    return `<img src="${imgPath}" alt="${altText}" />`;
  });
  
  // Padrão 1: <figure>![](/images/...)</figure> com ou sem espaços
  content = content.replace(/<figure>!\[([^\]]*)\]\(([^)]+)\)<\/figure>/gi, (match, alt, imgPath) => {
    const altText = getAltText(alt, imgPath);
    return `<img src="${imgPath}" alt="${altText}" />`;
  });
  
  // Padrão 2: ![](/images/...) sem figure
  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/gi, (match, alt, imgPath) => {
    if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(imgPath) && imgPath.startsWith('/images/')) {
      const altText = getAltText(alt, imgPath);
      return `<img src="${imgPath}" alt="${altText}" />`;
    }
    return match;
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

console.log('=== Corrigindo arquivos restantes ===\n');

let fixed = 0;
filesToFix.forEach(relPath => {
  const filePath = path.join(pagesDir, relPath);
  if (fs.existsSync(filePath)) {
    if (processFile(filePath)) {
      console.log(`✅ ${relPath}`);
      fixed++;
    } else {
      console.log(`⚠️  ${relPath} - Nenhuma alteração necessária`);
    }
  } else {
    console.log(`❌ ${relPath} - Arquivo não encontrado`);
  }
});

console.log(`\n✅ ${fixed} arquivo(s) corrigido(s)`);

