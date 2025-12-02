---
title: "2ª Via Boleto Asaas"
sidebarTitle: "Boleto Asaas"
icon: "barcode"
---

## Passo 1: Configurar Integração

1. Acesse **Integrações** > clique em **Adicionar** e preencha os dados conforme mostrado na imagem abaixo: <img src="/images/2viaboletoasaas-tela1.png" alt="print" />
2. Obtenha sua **Api Key** no site [Asaas](https://www.asaas.com/customerApiAccessToken/index).

## Passo 2: Configurar Filas

1. Acesse **Cadastros** > **Filas** > clique em **Adicionar** e preencha os dados conforme mostrado na imagem abaixo: <img src="/images/2viaboletoasaas-tela2.png" alt="print" />
2. Na integração, selecione a opção criada no passo anterior.

## Passo 3: Criar o Chatbot

1. Crie um chatbot. Verifique a documentação para exemplos de como criar um chatbot. <img src="/images/2viaboletoasaas-tela3.png" alt="print" />

## Passo 4: Configurar Condições

1. Nas **Condições**, configure para rotear para a fila criada anteriormente e adicione uma mensagem solicitando o CPF ou CNPJ do cliente.