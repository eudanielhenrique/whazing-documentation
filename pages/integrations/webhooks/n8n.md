---
title: "Webhooks e N8N"
sidebarTitle: "N8N"
icon: "bolt"
---

## 🌐 **WebHook - Visão Geral**

O sistema **Whazing** oferece suporte a **WebHooks** de duas maneiras principais:

### 🧩 **1. Pela Fila**

**Caminho:** `Cadastro → Filas/Integrações → Integrações`

1. Adicione um novo tipo de integração do tipo **N8N/Webhook**.
2. Preencha os campos:

   * **Nome** (para identificação)
   * **URL** (tipo `POST`)
   * **N8N API KEY** (opcional, mas recomendada)
3. Salve a integração.
4. Em seguida, acesse o menu **Filas**, edite uma fila existente ou crie uma nova.
5. No campo **Integração**, selecione a que você acabou de criar.
6. Se desejar que o WebHook seja acionado **imediatamente ao transferir** o ticket para essa fila (seja pelo bot ou atendimento manual), marque a opção **“Iniciar integração ao transferir”**.

   * Caso **não marque**, o evento será enviado somente na próxima mensagem recebida ou enviada enquanto o ticket fizer parte dessa fila.

---

### 🔧 **2. Pelo Canal**

**Caminho:** `Configurações → Canais/API → Configurações do canal`

1. Marque a opção **Ativar Webhook**.
2. Informe a **URL do N8N** (tipo `POST`).
3. Selecione os **tipos de eventos** que deseja enviar.

   * Caso nenhum seja marcado, **nenhum evento será enviado**.
4. (Opcional) Informe a **N8N API KEY**, que pode ser usada para **validar a origem do webhook**, evitando requisições falsas caso a URL seja descoberta publicamente.

---

### 🔔 **O que é um WebHook?**

Um **WebHook** é uma funcionalidade que permite que sistemas externos recebam **notificações automáticas em tempo real** sempre que determinados eventos acontecem no **Whazing** — como criação de tickets, envio ou recebimento de mensagens, transferências e muito mais.

Em vez de consultar periodicamente o Whazing para verificar mudanças, seu sistema é **notificado automaticamente** assim que algo ocorre.

**Exemplos de eventos enviados:**

* Nova mensagem recebida
* Nova mensagem enviada
* Criação de ticket
* Transferência de ticket
* Fechamento de ticket

---

### 🔄 **Diferença entre WebHook e API**

| Tipo        | Função principal                             | Exemplo de uso                                               |
| ----------- | -------------------------------------------- | ------------------------------------------------------------ |
| **WebHook** | Receber informações do Whazing em tempo real | Ser notificado sobre novas mensagens ou alterações           |
| **API**     | Enviar ou alterar informações no Whazing     | Enviar mensagens, atualizar contatos, mudar status de ticket |

**Resumo:**

* 🔔 **WebHook** → O Whazing envia informações para você.
* 🧭 **API** → Você envia informações para o Whazing.

---

> 📢 **Importante:**
> Para usar WebHooks e APIs corretamente, é essencial configurar os **endpoints** do seu sistema para receber os dados enviados pelo Whazing.

---

## 📚 **Modelos para Estudo**

* [Baixe e importe o exemplo de fluxo compatível com o Whazing](#) (Link original indisponível)
* [Baixe e importe o modelo com exemplos de endpoints adicionais](#) (Link original indisponível)

> 🙌 Agradecimento especial a **Elizeu Garcez** e **Ricardo Schonfelder Filho** por compartilharem os modelos.

---

## 🧠 **Node Whazing para N8N**

Recomenda-se sempre consultar a **documentação oficial da API**, pois o pacote pode não conter todos os endpoints disponíveis.

📦 [https://www.npmjs.com/package/n8n-nodes-whazing](https://www.npmjs.com/package/n8n-nodes-whazing)

---

[Assista ao vídeo tutorial](https://youtu.be/To1x6wZAI1s)

<img src="../../../images/image (1).png" alt="Exemplo de fluxo N8N integrado ao Whazing" />

<img src="../../../images/image (1).png" alt="Configuração de WebHook no Whazing" />

---

## 📦 Instalação do N8N na mesma VPS do Whazing

### CRIAR SUBDOMINIO E APONTAR PARA O IP DA SUA VPS

Exemplo: n8n.webconfiavel.com.br

### CHECAR PROPAGAÇÃO DO DOMÍNIO

https://dnschecker.org/

### Acesso Portainer

Acesse URL do Portainer: http://seuip:9000/

Caso seja primeira vez tem que gerar senha conforme instruções abaixo

### Acesso Portainer gerar senha

"Your Portainer instance timed out for security purposes. To re-enable your Portainer instance, you will need to restart Portainer."

Executar no terminal

```bash
docker container restart portainer
```

Depois acesse novamente url http://seuip:9000/

## Continuando

* Vai "Home" - "Live Connect" - "Stacks" - "Add Stack"
* Name - postgresql-n8n
* Web editor - Coloque conteudo abaixo

```bash
version: "3.7"

services:
  postgres:
    container_name: postgresqln8n
    image: postgres:latest
    restart: always
    environment:
      - POSTGRES_PASSWORD=Admin33Admin77
    networks:
      - n8n_rede
    #ports:
    #  - 5432:5432
    volumes:
      - postgres_n8n:/var/lib/postgresql/data
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.role == manager
      resources:
        limits:
          cpus: "0.5"
          memory: 1024M

volumes:
  postgres_n8n:
    external: false
    name: postgres_n8n

networks:
  n8n_rede:
    external: false
    name: n8n_rede
```

* Clique em Deploy the stack - Aguarde demora um pouco
* Vai "Home" - "Live Connect" - "Stacks" - "Add Stack"
* Name - n8n
* Web editor - Coloque conteudo abaixo

```bash
version: "3.7"

services:
  n8n:
    container_name: n8n
    image: n8nio/n8n
    restart: always
    networks:
      - n8n_rede
    ports:
      - 5678:5678
    volumes:
      - n8n_data:/data
    environment:
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_USER=postgres
      - DB_POSTGRESDB_PASSWORD=Admin33Admin77
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_DATABASE=postgres
      - DB_POSTGRESDB_HOST=postgres
      - PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
      - NODE_ENV=production
      - N8N_RELEASE_TYPE=stable
      - WEBHOOK_URL=https://n8n.webconfiavel.com.br
      - N8N_HOST=https://n8n.webconfiavel.com.br/
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.role == manager
volumes:
  n8n_data:
    external: false
    name: n8n_data

networks:
  n8n_rede:
    external: false
    name: n8n_rede
```

. Editar arquivo caddy

```bash
sudo nano /etc/caddy/Caddyfile
```

. Acrecentar a dados do N8N

```bash
n8n.webconfiavel.com.br {
    reverse_proxy 127.0.0.1:5678
    request_body {
        max_size 200MB
    }
}
```

. Reiniciar o caddy

```bash
sudo systemctl restart caddy
```

Adicionar N8N rede principal

```bash
docker network connect bridge n8n
```