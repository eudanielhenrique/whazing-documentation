# Como Subir este Repositório para seu GitHub

## Passo 1: Criar o Repositório no GitHub

1. Acesse [GitHub](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito → **"New repository"**
3. Preencha:
   - **Repository name**: `whazing-documentation` (ou o nome que preferir)
   - **Description**: "Documentação do Whazing SaaS"
   - **Visibility**: Escolha Public ou Private
   - **NÃO** marque "Initialize with README" (já temos arquivos)
4. Clique em **"Create repository"**

## Passo 2: Preparar o Repositório Local

Execute os seguintes comandos no terminal:

```bash
# 1. Adicionar todos os arquivos
git add .

# 2. Fazer commit das mudanças
git commit -m "Migração completa da documentação Whazing SaaS"

# 3. Verificar o remote atual (será removido)
git remote -v

# 4. Remover o remote antigo (AbacatePay)
git remote remove origin

# 5. Adicionar seu novo repositório GitHub
# SUBSTITUA 'seu-usuario' pelo seu username do GitHub
git remote add origin https://github.com/SEU-USUARIO/whazing-documentation.git

# 6. Verificar se foi adicionado corretamente
git remote -v

# 7. Fazer push para o novo repositório
git push -u origin main
```

## Passo 3: Se der erro de branch

Se o GitHub criar uma branch `master` ao invés de `main`, use:

```bash
git branch -M main
git push -u origin main
```

## Passo 4: Verificar

Acesse seu repositório no GitHub e verifique se todos os arquivos foram enviados corretamente.

---

**Nota:** Se preferir usar SSH ao invés de HTTPS, use:
```bash
git remote add origin git@github.com:SEU-USUARIO/whazing-documentation.git
```

