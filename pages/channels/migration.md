---
title: "Migração entre APIs não oficiais"
sidebarTitle: "Migração"
icon: "exchange-alt"
---

# Migração entre apis não oficiais

## 🔄 Migração de Canal (Passo a passo detalhado e seguro)

> Use esta sequência para trocar entre **Plus** e **Baileys**, **Wuzapi** sem perder dados.

---

## Checklist rápido (faça antes)

* [ ] Avise a equipe/usuários do painel que haverá manutenção.
* [ ] Verifique se ninguém está usando ativamente chats importantes.

---

## Passos para migrar (detalhado)

1. **Desconectar o WhatsApp** atual (no painel).

   * Por que: evita que mensagens novas sejam vinculadas ao canal antigo.

2. **Editar o canal** no painel e **alterar o tipo** (plus, baileys ou wuzapi).
3. **Gerar novo QR Code**
4. **Conectar**: abra o WhatsApp no celular, escaneie o QR Code.
5. **Validar**: confirme que as mensagens chegam e que o perfil está correto.

---

## ⚠️ Considerações Importantes

### Perda de Histórico

* Conversas antigas podem não ser migradas
* Considere exportar conversas importantes antes
* Algumas APIs não suportam histórico completo

### Números de Telefone

* Você pode usar o mesmo número em diferentes APIs
* Algumas APIs requerem desconexão completa antes
* Verifique compatibilidade do número

### Configurações Específicas

* Chatbots podem precisar ser reconfigurados
* Integrações podem precisar de ajustes
* Webhooks podem precisar ser atualizados

---

## 🔍 Diferenças entre APIs

| Recurso | Wuzapi | API PLUS | Baileys |
|---------|--------|----------|---------|
| Custo | Gratuito | Pago | Gratuito |
| Estabilidade | Alta | Alta | Média |
| Consumo VPS | Baixo | Baixo | Médio |
| Recursos Avançados | Não | Sim | Não |

---

💡 **Dica:** Teste a nova API em um número de teste antes de migrar o número principal.
