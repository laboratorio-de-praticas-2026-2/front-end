# Portal Contábil

O **Portal Contábil** é uma plataforma digital voltada à gestão contábil, fiscal e tributária de pessoas físicas e jurídicas.

A proposta é reunir, em um único ambiente, a consulta de obrigações, a solicitação de serviços e a comunicação entre clientes e o escritório de contabilidade.

Projeto acadêmico desenvolvido pelas turmas da **FATEC Registro**, no **Laboratório de Práticas 2026/2**.

> **Projeto em desenvolvimento.** Os recursos apresentados abaixo descrevem o escopo da plataforma e estão sendo implementados gradualmente.

---

## Funcionalidades

### Catálogo de serviços

Vitrine pública com informações sobre os serviços oferecidos pelo escritório, como:

* Abertura de empresa;
* Contabilidade mensal;
* Folha de pagamento;
* Declaração de Imposto de Renda.

### Portal do cliente

Cadastro de pessoas físicas e jurídicas, autenticação e acesso às solicitações, aos documentos e ao andamento dos serviços vinculados ao cliente.

### Obrigações fiscais

Consulta de guias, valores, vencimentos e situação das obrigações, incluindo:

* DAS;
* DARF;
* INSS;
* FGTS;
* Imposto de Renda.

As informações são apresentadas conforme os dados disponibilizados no sistema.

### Atendimento

Recursos destinados à comunicação entre clientes e o escritório, incluindo:

* Agendamento de reuniões;
* Informações de contato;
* Chat para atendimento.

### Painel administrativo

Gerenciamento de:

* Serviços;
* Descrições;
* Honorários;
* Anúncios;
* Perfis de usuários.

Os serviços ativos cadastrados no painel administrativo alimentam a vitrine pública da plataforma.

### Indicadores e relatórios

Dashboard com métricas relacionadas à operação, além de recursos como:

* Geração de relatórios;
* Geração de recibos em PDF;
* Simuladores de tributos;
* Simuladores de parcelamentos.

### Conteúdo e notificações

A plataforma também poderá disponibilizar:

* Blog;
* Perguntas frequentes;
* Mapa de parceiros;
* Alertas de vencimentos;
* Recomendações de serviços conforme o perfil do cliente.

---

## Arquitetura

A aplicação é organizada em repositórios separados:

| Componente     | Responsabilidade                             | Repositório |
| -------------- | -------------------------------------------- | ----------- |
| Frontend       | Interface web, navegação e consumo da API.   | `front-end` |
| Backend        | API, regras de negócio e controle de acesso. | `back-end`  |
| Banco de dados | Estrutura e configuração da persistência.    | `database`  |

O frontend se comunica com a API, que processa as requisições e realiza as operações no banco de dados.

A aplicação é dividida em três áreas principais:

* **Vitrine pública:** apresenta o catálogo de serviços;
* **Portal do cliente:** reúne informações individuais de cada cliente;
* **Painel administrativo:** permite gerenciar os dados e recursos da plataforma.

---

## Tecnologias

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4)
\

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

API desenvolvida em NestJS, utilizando o adaptador Express.

### Banco de dados e design

![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

![Figma](https://img.shields.io/badge/Figma-000000?style=for-the-badge&logo=figma&logoColor=F24E1E)

MySQL é o banco previsto no projeto. As instruções de configuração estão no repositório de banco de dados.


Qualidade de código

**Frontend**

* ESLint.

**Backend**

* Oxlint;
* Prettier;
* Vitest;
* Supertest.

---

## Requisitos

Para executar o projeto, é necessário possuir:

* Git;
* Node.js;
* npm;
* Banco de dados configurado para os recursos que dependem de persistência;
* Docker e Docker Compose, caso a configuração de ambiente utilizada exija containers.

Consulte as configurações de cada repositório para verificar a versão do Node.js adotada e os requisitos específicos de cada ambiente.

---

## Como executar

### 1. Clonar os repositórios

Em uma pasta de sua preferência, execute:

```bash
git clone https://github.com/laboratorio-de-praticas-2026-2/back-end.git
git clone https://github.com/laboratorio-de-praticas-2026-2/front-end.git
git clone https://github.com/laboratorio-de-praticas-2026-2/database.git
```

### 2. Configurar o ambiente

Configure o banco de dados conforme as instruções disponíveis no repositório `database`.

Nos repositórios da aplicação, utilize o arquivo `.env.example`, quando disponível, como referência para criar os arquivos de ambiente esperados pelo código.

A execução de funcionalidades integradas depende da configuração correta:

* Da API;
* Do banco de dados;
* Dos serviços externos utilizados por cada módulo.

### 3. Iniciar o backend

Em um terminal, acesse o repositório do backend:

```bash
cd back-end
npm install
npm run start:dev
```

### 4. Iniciar o frontend

Em outro terminal, acesse o repositório do frontend:

```bash
cd front-end
npm install
npm run dev
```

Acesse no navegador o endereço informado pelo servidor do frontend no terminal.

> Configure o frontend e o backend para utilizarem portas diferentes e ajuste o endereço da API consumida pelo frontend.
>
> Os comandos apresentados iniciam os servidores de desenvolvimento. A configuração do banco de dados e das integrações deve estar concluída para que os respectivos recursos funcionem corretamente.

---

## Variáveis de ambiente

As variáveis de ambiente devem seguir os nomes definidos no código e nos arquivos de exemplo de cada repositório.

Conforme as integrações implementadas, elas podem incluir:

* Conexão com o banco de dados;
* Porta do servidor;
* Endereço da API;
* Credenciais de serviços externos;
* Configurações de autenticação.

### Boas práticas

* Não versione senhas, tokens ou arquivos de ambiente que contenham segredos;
* Mantenha credenciais de banco de dados e autenticação no servidor;
* Utilize arquivos como `.env.example` apenas para documentar os nomes das variáveis necessárias;
* No Next.js, variáveis com o prefixo `NEXT_PUBLIC_` ficam disponíveis no navegador e devem ser utilizadas apenas para informações públicas.

---

## Testes e verificação

### Backend

Dentro do repositório `back-end`:

```bash
npm run lint
npm test
npm run build
```

Para executar os testes ponta a ponta, com o ambiente e a configuração de testes preparados:

```bash
npm run test:e2e
```

### Frontend

Dentro do repositório `front-end`:

```bash
npm run lint
npm run build
```

O frontend ainda não possui um script `test` definido no `package.json` consultado.

A validação da interface deve contemplar:

* Navegação;
* Responsividade;
* Integração com a API;
* Comportamento dos componentes;
* Tratamento de erros nas requisições.

---

## Links

* [Organização do projeto no GitHub](#)
* [Protótipo no Figma](#)
* [Código do frontend](https://github.com/laboratorio-de-praticas-2026-2/front-end)
* [Código do backend](https://github.com/laboratorio-de-praticas-2026-2/back-end)
* [Banco de dados](https://github.com/laboratorio-de-praticas-2026-2/database)

---

## Licença

A licença de distribuição do projeto ainda precisa ser formalizada.

Atualmente, o backend está identificado como `UNLICENSED` em seu arquivo `package.json`.

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
