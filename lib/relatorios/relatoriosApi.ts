export type CategoriaRelatorio =
  | "Visão Geral"
  | "Fiscal e Tributário"
  | "Gráficos"
  | "Performance";

export type StatusRelatorio = "Gerado" | "Processando" | "Erro";

export interface Relatorio {
  id: string;
  nome: string;
  categoria: CategoriaRelatorio;
  descricao: string;
  dataInicio: string; // formato ISO (yyyy-mm-dd)
  dataTermino: string;
  status: StatusRelatorio;
  criadoEm: string;
}

// 👇 MOCK: troque pela API real de listagem de relatórios
export async function listarRelatoriosNaAPI(): Promise<Relatorio[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    {
      id: "1",
      nome: "Relatório de DAS - Abril",
      categoria: "Fiscal e Tributário",
      descricao: "Resumo das obrigações do DAS para o período de 07/04/2026 a 07/05/2026.",
      dataInicio: "2026-04-07",
      dataTermino: "2026-05-07",
      status: "Gerado",
      criadoEm: "2026-05-08",
    },
    {
      id: "2",
      nome: "Performance Q1 2026",
      categoria: "Performance",
      descricao: "Análise de movimentação financeira do primeiro trimestre.",
      dataInicio: "2026-01-01",
      dataTermino: "2026-03-31",
      status: "Gerado",
      criadoEm: "2026-04-02",
    },
    {
      id: "3",
      nome: "Gráficos de Arrecadação",
      categoria: "Gráficos",
      descricao: "Evolução mensal do recolhimento de impostos.",
      dataInicio: "2026-01-01",
      dataTermino: "2026-06-30",
      status: "Processando",
      criadoEm: "2026-07-01",
    },
  ];
}

interface DadosNovoRelatorio {
  categoria: CategoriaRelatorio;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataTermino: string;
}

// 👇 MOCK: troque pela API real de geração de relatório
export async function gerarRelatorioNaAPI(
  dados: DadosNovoRelatorio
): Promise<{ sucesso: boolean; relatorio?: Relatorio; erro?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const novoRelatorio: Relatorio = {
    id: Date.now().toString(),
    ...dados,
    status: "Gerado",
    criadoEm: new Date().toISOString().slice(0, 10),
  };

  return { sucesso: true, relatorio: novoRelatorio };
}

// 👇 MOCK: troque pela API real de exclusão
export async function excluirRelatorioNaAPI(id: string): Promise<{ sucesso: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { sucesso: true };
}
