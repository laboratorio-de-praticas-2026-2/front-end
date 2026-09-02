# Portal Contábil - Front-end

Este é o repositório do front-end do **Portal Contábil**, desenvolvido com [Next.js](https://nextjs.org), React e TypeScript.

---

## Como Rodar o Projeto (Desenvolvimento com Docker)

Não é necessário ter o Node.js instalado na sua máquina local, apenas o **Docker** e o **Docker Desktop**.

### 1. Clonar o Repositório e Entrar na Branch de Desenvolvimento
```bash
git clone <URL_DO_REPOSITORIO>
cd front-end
git checkout develop
```

### 2. Iniciar o Container
Rode o comando abaixo na raiz do projeto para construir a imagem e subir a aplicação:

```bash
docker compose up --build
```
Acesse http://localhost:3000 no seu navegador. O Hot Reloading está ativo: qualquer alteração feita no código atualizará a página automaticamente sem precisar reiniciar o container.

## Rodando Sem Docker (Opcional)
Se preferir rodar a aplicação diretamente na sua máquina local com Node.js (v20+):

```bash
# 1. Instalar dependências
npm install

# 2. Executar o servidor de desenvolvimento
npm run dev
```

## Fluxo de Trabalho (Git Workflow)
`main`: Branch de produção (somente via PR aprovado).

`develop`: Linha de base contínua para integração das funcionalidades.

---

## Guia de Padronização de Branches
Este repositório possui regras automáticas de proteção ativas. Para garantir que as integrações sigam o fluxo de CI/CD e não quebrem o ambiente de produção ou desenvolvimento, todas as branches temporárias devem seguir o fluxo de duas etapas abaixo:

### 1. Branch de Entrega (Short-Release)
Representa um pacote de entregas para uma data específica. Toda branch desse tipo *precisa obrigatoriamente* conter a expressão short-release cercada por qualificadores (data e escopo).
* **Origem:** Deve ser criada obrigatoriamente a partir da branch `develop`.
* **Estrutura do Nome:** `DD-MM-short-release-NOME-DA-FEATURE`
  * *DD-MM*: Data de criação ou previsão de deploy (ex: 09-03, 15-10).
  * *short-release*: Termo fixo identificador.
  * *NOME-DA-FEATURE*: Descrição sucinta do escopo da release (ex: front, header, checkout).

**Exemplos Válidos (Proteção Ativa):**
* `09-03-short-release-front`
* `15-10-short-release-back`

> *Atenção:* Nomes como `09-03-short-release-` (terminados em hífen sem contexto) ou fora do padrão não acionam as regras de segurança do GitHub corretamente.

### 2. Branch de Release do Produto (Features)
É aqui onde o código real da funcionalidade será desenvolvido (ex: header, carrossel).
* **Estrutura:** `release/NOME-DA-FEATURE` (ex: `release/header`, `release/carrossel`)
* **Origem:** Deve ser criada obrigatoriamente a partir da sua respectiva branch de entrega (`DD-MM-short-release-...`).
* **Objetivo:** Facilitar a abertura dos Pull Requests (PRs) e minimizar erros de integração.

---

## Regras de Proteção Aplicadas

Assim que uma branch é enviada (push) com o padrão correto, o GitHub aplica automaticamente as seguintes travas:

1. **Bloqueio de Push Direto:** Não é permitido dar git push com alterações diretamente para a branch de release.
2. **Merge Apenas via PR:** Toda alteração deve ser enviada através de um *Pull Request*.
3. **Aprovação Obrigatória:** O PR exige a revisão e *aprovação de pelo menos 1 membro* da equipe para liberar o botão de merge.
4. **Validação Automática (CI/CD):** Os testes de lint e build devem passar 100% no GitHub Actions.

> ⚠️ **Atenção (Regra de Datas e PRs):** Os Pull Requests devem ser abertos da sua branch `release/...` apontando para a `short-release`. Nenhum PR será aceito ou mergeado na short-release antes das datas de fechamento estipuladas. Todas as aprovações de PR passarão pelo crivo do Tech Lead.

```bash
git checkout develop
git pull origin develop
git checkout -b 09-03-short-release-front
git checkout -b release/header
```

## Tecnologias Utilizadas
Framework: Next.js (App Router)

Linguagem: TypeScript

Estilização: Tailwind CSS

Containerização: Docker / Docker Compose


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
