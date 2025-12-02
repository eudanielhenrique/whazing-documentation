# Whazing SaaS - Documentação

Documentação oficial do **Whazing SaaS**, um sistema completo para gestão de atendimento multicanais centralizado.

## 🚀 Sobre o Whazing

O Whazing é a solução completa para gerenciar múltiplos canais de atendimento em um só lugar, incluindo:

- 📱 **WhatsApp** (Baileys)
- 📸 **Instagram**
- 👥 **Facebook**
- 💬 **Chat Interno**
- 🏢 **Sistema SaaS**
- 📋 **Kanban**
- E muito mais!

## 📚 Estrutura da Documentação

Esta documentação é construída com [Mintlify](https://mintlify.com) e inclui:

- **Instalação & VPS**: Guias completos de instalação Docker, configuração de banco de dados, backup, migração e muito mais
- **Funcionalidades**: Atendimento, automação, WhatsApp, gestão de usuários e contatos
- **Integrações**: IA (ChatGPT, Groq), CRM/ERP (HubSoft, IXC, Perfex, TSMX), Telefonia, Webhooks
- **Gateways de Pagamento**: Pushin Pay, Mercado Pago, Asaas, EFI Bank, InfinitePay
- **API Reference**: Documentação completa da API REST
- **Solução de Problemas**: Troubleshooting e resolução de problemas comuns

## 🛠️ Desenvolvimento Local

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. **Instalar Mintlify CLI globalmente:**
   ```bash
   npm i -g mintlify
   ```

2. **Iniciar servidor de desenvolvimento:**
   ```bash
   mintlify dev
   ```

3. **Acessar a documentação:**
   Abra seu navegador em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
.
├── pages/              # Conteúdo da documentação (arquivos MDX)
│   ├── infrastructure/ # Instalação, VPS, banco de dados
│   ├── features/       # Funcionalidades do sistema
│   ├── integrations/   # Integrações disponíveis
│   ├── api-docs/       # Documentação da API
│   └── troubleshooting/# Solução de problemas
├── images/             # Imagens e screenshots
├── logo/               # Logos e ícones
├── docs.json           # Configuração do Mintlify
└── README.md           # Este arquivo
```

## 🔗 Links Úteis

- **Demo do Produto**: https://teste.whazing.com.br/
  - Usuário: `admin@admin.com`
  - Senha: `123456`
- **Grupo do WhatsApp**: https://grupo.whazing.com.br
- **Repositório Principal**: https://github.com/cleitonme/Whazing-SaaS

## 📝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork deste repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença especificada no arquivo [LICENSE](LICENSE).

## 👥 Agradecimentos

Agradecimentos especiais a todos os colaboradores e parceiros que contribuíram para esta documentação.

---

**Desenvolvido com ❤️ para a comunidade Whazing**
