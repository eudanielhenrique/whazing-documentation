---
title: "API Oficial do WhatsApp (Meta)"
sidebarTitle: "API Oficial Meta"
icon: "code"
---

# API Oficial do WhatsApp (Meta)

Este guia explica como integrar a API Oficial do WhatsApp (WABA) ao sistema Whazing.

## ⚠️ Considerações Importantes

* A API oficial **não oferece suporte a grupos**.
* O envio de templates está configurado ➤ [Tabela oficial de preços da Meta](https://business.whatsapp.com/products/platform-pricing?lang=pt_BR&country=Brasil&currency=Dólar%20(USD)&category=Utilitários)
* A API oficial **não exibe a foto do contato**.
* Você tem **24 horas** para responder uma mensagem do cliente via Whazing. Após 24 horas somente via template pode ser iniciada uma conversa.
* API oficial **também pode ser banida**.

---

## ✅ Manual de Integração com a API Oficial do WhatsApp (Meta)

### 1️⃣ Acessar o Painel da Meta

1. Entre em: [https://developers.facebook.com/](https://developers.facebook.com/)
2. Faça login com sua conta do **Facebook**.
3. Clique em **Criar Aplicativo**.
4. Selecione **Outro > Empresa**.

---

### 2️⃣ Configurar o WhatsApp

* No painel de **Produtos**, localize **WhatsApp** e clique em **Configurar**.
* Escolha a empresa vinculada à sua conta.

> Se ainda não tiver uma empresa, será necessário criar uma.

* Clique em **Começar a usar a API**.

---

### 3️⃣ Ajustes Iniciais do Aplicativo

1. Acesse **Configurações do App > Básico**.
2. Preencha os campos obrigatórios:
   * **URL da Política de Privacidade**
   * **URL dos Termos de Serviço**
3. Clique em **Salvar Alterações**.
4. No topo da página, altere o status do app de **Em Desenvolvimento** para **Ativo**.

---

### 4️⃣ Configurar a API do WhatsApp

1. No menu lateral, vá em **WhatsApp > Configuração da API**.
2. Na etapa 5, clique em **Adicionar Número de Telefone**.
3. Informe os dados solicitados e conclua a validação.

---

### 5️⃣ Gerar Token Temporário

* Ainda na tela de configuração da API, clique em **Gerar Token de Acesso Temporário**.
* Copie o token gerado (ele será usado no Whazing).

---

### 6️⃣ Adicionar Canal no Whazing

<img src="../../images/whazing (5).png" alt="Adicionar Canal no Whazing" />

1. No Whazing, vá em **Adicionar Canal**.
2. Selecione a opção **WABA API Oficial**.
3. Cole o **Token de Acesso** gerado anteriormente.

<img src="../../images/configuracaoapi.png" alt="Configuração da API" />

📌 Também será necessário copiar do painel da Meta:

* **ID do Número de Telefone**
* **ID da Conta do WhatsApp Business**
* **Versão da API** (ex: `v22.0` ou a mais recente disponível).

<img src="../../images/whazing2.png" alt="IDs necessários" />

---

### 7️⃣ Configurar Webhook

1. No painel da Meta, acesse **WhatsApp > Configuração da API > Etapa 3: Configure Webhooks**.
2. No Whazing, clique em **Gerar Token de Webhook** e copie:
   * **Token de Verificação**
   * **URL de Callback**
3. Retorne ao painel da Meta, clique em **Configurar Webhook** e cole as informações.
4. Clique em **Verificar e Salvar**.
5. Role a página até encontrar a opção **messages** e altere para **Assinado**.

<img src="../../images/ativarmessages.png" alt="Ativar mensagens" />

---

### 8️⃣ Registrar Telefone no Whazing

1. Acesse **Ferramentas > Registrar Telefone**.
2. Digite um **PIN de 6 dígitos** (caso já tenha usado um PIN antes, utilize o mesmo).

<img src="../../images/registrartelefone.png" alt="Registrar Telefone" />

---

### 9️⃣ Gerar Token Permanente

⚠️ O token temporário expira em algumas horas.

Para garantir o funcionamento contínuo, gere um **Token Permanente**.

👉 Guia oficial: [Gerar Token Permanente – Meta](https://developers.facebook.com/docs/whatsapp/business-management-api/get-started#1--acquire-an-access-token-using-a-system-user-or-facebook-login)

---

### 🔟 Atualizar Token no Whazing

* No Whazing, edite o canal criado e substitua o **Token de Acesso** temporário pelo **Token Permanente**.

---

✅ **Pronto! Seu Whazing está integrado com a API Oficial do WhatsApp (Meta).**

---

## 📊 Limites da API Oficial

1. Para iniciar uma conversa, é necessário usar uma **mensagem de modelo**, que precisa de aprovação da Meta.
2. Imagens PNG com fundo transparente podem apresentar **alterações**, pois o WhatsApp converte para JPEG.
3. Mensagens fora do modelo só são entregues **dentro da janela de 24 horas** desde a última mensagem do cliente.

<img src="../../images/limites.png" alt="Limites da API Oficial" />

---

## ❌ Por que minha mensagem enviada tem um "X" vermelho?

* Isso ocorre quando:
  * A mensagem é enviada **fora da janela de 24 horas**, ou
  * O conteúdo está em **formato não aceito pela Meta**.

<img src="../../images/mensagemrejeitada.png" alt="Mensagem rejeitada" />

---

## ✉️ Envio de mensagens com API oficial via Whazing

* Funciona com envio de **mensagens e arquivos**, assim como na API não oficial.
* A API **não valida** se o número possui WhatsApp, então:
  * O número deve estar correto (DDD + 9º dígito, quando necessário).
  * Deve respeitar a **janela de 24 horas**.

---

## 📚 Recursos Adicionais

* [Criar Templates](/pages/channels/api-oficial-templates)
* [Configurar Fallback](/pages/channels/api-oficial-fallback)
* [Trabalhar com Grupos](/pages/channels/api-oficial-grupos)
