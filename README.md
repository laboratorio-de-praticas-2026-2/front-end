Markdown
# Portal Contábil - Front-end

Este é o repositório do front-end do **Portal Contábil**, desenvolvido com [Next.js](https://nextjs.org), React e TypeScript.

---

##  Como Rodar o Projeto (Desenvolvimento com Docker)

Não é necessário ter o Node.js instalado na sua máquina local, apenas o **Docker** e o **Docker Desktop**.

### 1. Clonar o Repositório e Entrar na Branch de Desenvolvimento
```bash
git clone <URL_DO_REPOSITORIO>
cd front-end
git checkout develop
2. Iniciar o Container
Rode o comando abaixo na raiz do projeto para construir a imagem e subir a aplicação:

Bash
docker compose up --build
Acesse http://localhost:3000 no seu navegador. O Hot Reloading está ativo: qualquer alteração feita no código atualizará a página automaticamente sem precisar reiniciar o container.

 Rodando Sem Docker (Opcional)
Se preferir rodar a aplicação diretamente na sua máquina local com Node.js (v20+):

Bash
# 1. Instalar dependências
npm install

# 2. Executar o servidor de desenvolvimento
npm run dev
 Fluxo de Trabalho (Git Workflow)
main: Branch de produção (somente via PR aprovado).

develop: Linha de base contínua para integração das funcionalidades.

Feature Branches: Crie suas tarefas sempre a partir da develop:

Bash
git checkout develop
git pull origin develop
git checkout -b feature/nome-da-sua-feature
 Tecnologias Utilizadas
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
