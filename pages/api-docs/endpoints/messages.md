---
title: "Mensagens"
sidebarTitle: "Mensagens"
icon: "message"
---

### Mensagens Interativas

#### 1. Mensagem com Botões

* **Método**: POST
* **Endpoint**: `/apioficial`

```json
{
    "number": "5511999999999",
    "contents": {
        "type": "button",
        "body": {
            "text": "Texto principal"
        },
        "action": {
            "buttons": [
                {
                    "type": "reply",
                    "reply": {
                        "id": "1",
                        "title": "Botão 1"
                    }
                }
            ]
        }
    }
}
```

#### 2. Mensagem com Lista

* **Método**: POST
* **Endpoint**: `/apioficial`

```json
{
  "number": "5511999999999",
  "contents": {
    "type": "list",
    "header": {
      "type": "text",
      "text": "Título"
    },
    "body": {
      "text": "Descrição"
    },
    "action": {
      "sections": [
        {
          "title": "Seção 1",
          "rows": [
            {
              "id": 1,
              "title": "Item 1",
              "description": "Descrição do item 1"
            }
          ]
        }
      ],
      "button": "Clique aqui"
    }
  }
}
```

#### 3. Mensagem com Link (CTA)

* **Método**: POST
* **Endpoint**: `/apioficial`

```json
{
    "number": "5511999999999",
    "contents": {
        "type": "cta_url",
        "header": {
            "type": "text",
            "text": "Título"
        },
        "body": {
            "text": "Descrição"
        },
        "footer": {
            "text": "Rodapé"
        },
        "action": {
            "name": "cta_url",
            "parameters": {
                "display_text": "Ver Mais",
                "url": "SEU_LINK"
            }
        }
    }
}
```

#### 4. Solicitar Localização

* **Método**: POST
* **Endpoint**: `/apioficial`

```json
{
    "number": "5511999999999",
    "contents": {
        "type": "location_request_message",
        "body": {
            "text": "Por favor compartilhe sua localização"
        },
        "action": {
            "name": "send_location"
        }
    }
}
```

