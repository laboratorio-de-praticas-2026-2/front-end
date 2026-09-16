# Portal Contábil - Front-end

Este é o repositório do front-end do **Portal Contábil**, desenvolvido com [Next.js](https://nextjs.org), React e TypeScript.

---

## Como Rodar o Projeto

### Desenvolvimento com Docker

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

Acesse http://localhost:3000 no seu navegador.

O Hot Reloading está ativo: qualquer alteração feita no código atualizará a página automaticamente sem precisar reiniciar o container.

---

## Rodando Sem Docker (Opcional)

Se preferir rodar a aplicação diretamente na sua máquina com Node.js (v20+):

```bash
# 1. Instalar dependências
npm install

# 2. Executar o servidor de desenvolvimento
npm run dev
```

Acesse http://localhost:3000 no navegador.

---

## Fluxo de Trabalho (Git Workflow)

### `main`

Branch de produção, utilizada somente via PR aprovado.

### `develop`

Linha de base contínua para integração das funcionalidades.

### Feature Branches

Crie suas tarefas sempre a partir da `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nome-da-sua-feature
```

---

## Tecnologias Utilizadas

* **Framework:** Next.js (App Router)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Containerização:** Docker / Docker Compose
* **Biblioteca:** React

---

## Learn More

Para mais informações sobre Next.js:

* [Next.js Documentation](https://nextjs.org/docs)
* [Next.js Learn](https://nextjs.org/learn)

Você também pode consultar o [repositório do Next.js no GitHub](https://github.com/vercel/next.js).
