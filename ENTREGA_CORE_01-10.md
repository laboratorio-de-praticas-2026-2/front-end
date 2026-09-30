# Entrega Core de 01/10

## Execução local

1. Suba o MySQL e aplique as migrations existentes do repositório `database` conforme o README dele. Para ver um catálogo preenchido imediatamente, execute também o seed desse repositório; sem dados, o CMS permite cadastrar os primeiros serviços e anúncios.
2. No `back-end`, copie `.env.example` para `.env`, preencha a conexão com o banco e defina um `JWT_SECRET` longo. Execute `npm ci`, `npm run build` e `npm run start:prod` (porta padrão 3333).
3. No `front-end`, copie `.env.example` para `.env.local` e ajuste `CORE_API_URL` caso a API não esteja em `http://127.0.0.1:3333`. Execute `npm ci` e `npm run dev` (porta padrão 3000).

## Fluxos entregues

- Vitrine pública de serviços com honorários, filtro por nome e valor máximo; anúncios ativos aparecem na página inicial.
- Cadastro PF e PJ, login e logout reais. O login redireciona clientes para `/minha-conta` e administradores para `/admin/servicos`.
- Busca simples por CPF/CNPJ e busca avançada de cadastros, com acesso limitado ao próprio cadastro para clientes.
- CMS de serviços e publicidade: criar, editar, pausar, reativar e excluir.
- Painel administrativo de perfis PF/PJ, incluindo edição da empresa selecionada.

O painel administrativo exige uma conta com nível `administrador` no banco. O cadastro público sempre cria uma conta de cliente. Nenhuma conta ou senha de demonstração é incluída no código.

Em hospedagem, configure `CORE_API_URL` no servidor do front com a URL pública da API. O valor local do `.env.example` não alcança a API a partir de um servidor remoto. A API também precisa das variáveis do banco e do segredo JWT no ambiente de hospedagem.
