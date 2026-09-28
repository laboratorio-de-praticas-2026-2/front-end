# 📊 Portal Contábil

O **Portal Contábil** é uma plataforma digital voltada à gestão contábil, fiscal e tributária de pessoas físicas e jurídicas. A proposta é reunir, em um único ambiente, a consulta de obrigações, a solicitação de serviços e a comunicação entre clientes e o escritório de contabilidade.

Projeto acadêmico desenvolvido pelas turmas da **FATEC Registro**, no **Laboratório de Práticas 2026/2**.

> 🚧 **Projeto em desenvolvimento.** Os recursos apresentados abaixo descrevem o escopo da plataforma e estão sendo implementados gradualmente.

---

## ✨ Funcionalidades

### Catálogo de serviços
Vitrine pública com informações sobre os serviços oferecidos pelo escritório, como abertura de empresa, contabilidade mensal, folha de pagamento e declaração de Imposto de Renda.

### Portal do cliente
Cadastro de pessoas físicas e jurídicas, autenticação e acesso às solicitações, aos documentos e ao andamento dos serviços vinculados ao cliente.

### Obrigações fiscais
Consulta de guias, valores, vencimentos e situação das obrigações, incluindo DAS, DARF, INSS, FGTS e Imposto de Renda, conforme os dados disponibilizados no sistema.

### Atendimento
Agendamento de reuniões, informações de contato e chat para comunicação com o escritório.

### Painel administrativo
Gerenciamento de serviços, descrições, honorários, anúncios e perfis de usuários. Os serviços ativos cadastrados no painel alimentam a vitrine pública.

### Indicadores e relatórios
Dashboard com métricas da operação, geração de relatórios e recibos em PDF, simuladores de tributos e parcelamentos.

### Conteúdo e notificações
Blog, perguntas frequentes, mapa de parceiros, alertas de vencimentos e recomendações de serviços conforme o perfil do cliente.

---

## 🧱 Arquitetura

A aplicação é organizada em repositórios separados para manter o isolamento de responsabilidades, regras de negócio, padrões de código e o fluxo de trabalho da equipe:

| Componente | Responsabilidade | Repositório |
| --- | --- | --- |
| Frontend | Interface web, navegação e consumo da API. | [front-end](https://github.com/laboratorio-de-praticas-2026-2/front-end) |
| Backend | API, regras de negócio e controle de acesso. | [back-end](https://github.com/laboratorio-de-praticas-2026-2/back-end) |
| Banco de dados | Estrutura e configuração da persistência. | [database](https://github.com/laboratorio-de-praticas-2026-2/database) |

O frontend se comunica com a API, que processa as requisições e realiza as operações no banco de dados. A vitrine apresenta o catálogo público; o portal do cliente reúne informações individuais; o painel administrativo permite gerenciar os dados da plataforma.

---

## 🛠️ Tecnologias

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

API desenvolvida em NestJS, utilizando o adaptador Express.

### Banco de dados e design
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-000000?style=for-the-badge&logo=figma&logoColor=F24E1E)

MySQL é o banco previsto no projeto. As instruções de configuração estão no repositório de banco de dados.

### Qualidade de código
- **Frontend:** ESLint.
- **Backend:** Oxlint, Prettier, Vitest e Supertest.

---

## 📦 Requisitos

- Git.
- Node.js e npm compatíveis com as dependências do projeto.
- Banco de dados configurado para executar os recursos que dependem de persistência.
- Docker e Docker Compose, caso a configuração de ambiente utilizada exija containers.

Consulte as configurações de cada repositório para a versão de Node.js adotada e os requisitos específicos do ambiente.

---

## ▶️ Como executar

### 1. Clonar os repositórios
Em uma pasta de sua preferência:

git clone https://github.com/laboratorio-de-praticas-2026-2/back-end.git
git clone https://github.com/laboratorio-de-praticas-2026-2/front-end.git
git clone https://github.com/laboratorio-de-praticas-2026-2/database.git

### 2. Configurar o ambiente
Configure o banco conforme as instruções do repositório `database`. Nos repositórios da aplicação, utilize o `.env.example`, quando disponível, como referência para criar os arquivos de ambiente esperados pelo código.

A execução de funcionalidades integradas depende da configuração da API, do banco e dos serviços externos utilizados por cada módulo.

### 3. Iniciar o backend
Em um terminal, a partir da pasta onde os repositórios foram clonados:

cd back-end
npm install
npm run start:dev

### 4. Iniciar o frontend
Em outro terminal, a partir da mesma pasta de trabalho:

cd front-end
npm install
npm run dev

Acesse o endereço informado pelo servidor do frontend no terminal.

> Configure os servidores em portas diferentes e ajuste o endereço da API consumida pelo frontend. Os comandos acima iniciam os servidores de desenvolvimento; a configuração do banco e das integrações deve estar concluída para os respectivos recursos funcionarem.

---

## 🔄 Fluxo de Trabalho e Padronização

Para manter o repositório organizado e garantir que as integrações sigam o fluxo de CI/CD sem quebrar o ambiente de desenvolvimento ou produção, seguimos padrões estritos para branches, commits e issues.

### 🌿 Guia de Nomenclatura de Branches (Fluxo em 2 Etapas)

O repositório possui regras automáticas de proteção ativas no GitHub. Todas as branches devem seguir a convenção:

#### 1. Branch de Entrega (`Short-Release`)
* **Padrão:** `DD-MM-short-release-Nome-Entrega-Exemplo`
* **Origem:** Obrigatoriamente criada a partir da branch `develop`.
* **Detalhamento:** `DD-MM` indica a data da criação/deploy (ex: `09-03`, `15-10`). `short-release` é um termo fixo.
* **Exemplos válidos:** `09-03-short-release-front`, `01-11-short-release-Front-Header-Teste`.
* ⚠️ **Atenção:** Nomes sem contexto final ou fora do padrão (ex: `09-03-short-release-`) **não acionam** as travas automáticas do GitHub.

**Exemplo prático de criação:**
git checkout develop
git pull origin develop
git checkout -b 09-03-short-release-front

#### 2. Branch de Release do Produto (Trabalho)
* **Padrão:** `release/Nome-Do-Teste`
* **Origem:** Obrigatoriamente criada a partir da branch `DD-MM-short-release` correspondente.
* **Objetivo:** Facilitar a abertura de Pull Requests (PRs) e mitigar conflitos.

#### 🔐 Regras de Proteção Aplicadas pelo GitHub
Ao dar `push` em uma branch com a convenção correta, o GitHub ativa automaticamente:
- **Bloqueio de Push Direto:** Não é permitido dar commit/push direto nas branches principais de release.
- **Merge Apenas via PR:** Toda alteração é submetida por Pull Request.
- **Aprovação Obrigatória:** O PR exige a revisão e aprovação de pelo menos **1 membro da equipe**.
- **Validação Automática (CI/CD):** Execução obrigatória de lint e build no GitHub Actions sem falhas.

---

### 📌 Padronização de Issues e Commits

#### 1. Nomeação de Issues
Tarefas no board devem iniciar com o número da issue, prefixo e a especificação da entrega.
* **Formato:** `[Número]) [prefixo]: [O que será feito]`
* **Exemplo:** `1.1) feat: Implementação do Header no Dashboard`

#### 2. Tabela de Prefixos
Use estes prefixos no título de issues e nas mensagens de commit:

| Prefixo | Descrição |
| --- | --- |
| `feat:` | Nova funcionalidade. |
| `fix:` | Correção de bug. |
| `chore:` | Ajustes técnicos, dependências ou configurações. |
| `docs:` | Alterações em documentação. |
| `refactor:` | Reestruturação ou limpeza de código sem alterar comportamento. |
| `test:` | Adição ou alteração de testes. |
| `ui:` | Alterações exclusivas no visual / estilização. |

#### 3. Padrão de Commits
Utilize o prefixo correspondente à task que você assumiu no board:
git commit -m "feat: cria estrutura inicial do header"
git commit -m "ui: ajusta alinhamento do carrossel"
git commit -m "chore: adiciona arquivo mock de dados"

---

## 🔐 Variáveis de Ambiente

As variáveis devem seguir os nomes definidos no código e nos arquivos de exemplo de cada repositório. Conforme as integrações implementadas, elas podem incluir conexão com o banco, porta do servidor, endereço da API e credenciais de serviços externos.

- Não versione senhas, tokens ou arquivos de ambiente com segredos.
- Mantenha credenciais de banco e autenticação no servidor.
- No Next.js, variáveis com prefixo `NEXT_PUBLIC_` ficam disponíveis no navegador; use-as apenas para informações públicas.

---

## 🧪 Testes e Verificação

### Backend
Dentro do repositório `back-end`:

npm run lint
npm test
npm run build

Para testes ponta a ponta, com o ambiente e a configuração de testes preparados:

npm run test:e2e

### Frontend
Dentro do repositório `front-end`:

npm run lint
npm run build

> **Nota:** O frontend ainda não possui um script `npm test` configurado no `package.json`. A validação da interface deve considerar aspectos visuais, responsividade, navegação e integração manual/mockada com a API.

---

## 📚 Links

- [Organização do projeto no GitHub](https://github.com/laboratorio-de-praticas-2026-2)
- [Protótipo no Figma](https://www.figma.com/design/h22dHpAlf32B7UjBpVEU3Z/Laborat%C3%B3rio-de-Pr%C3%A1ticas---UX?node-id=0-1)
- [Código do frontend](https://github.com/laboratorio-de-praticas-2026-2/front-end)
- [Código do backend](https://github.com/laboratorio-de-praticas-2026-2/back-end)
- [Banco de dados](https://github.com/laboratorio-de-praticas-2026-2/database)

---

## 📝 Licença

A licença de distribuição ainda precisa ser formalizada. Atualmente, o backend está identificado como `UNLICENSED` em seu `package.json`.


