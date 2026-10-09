import type { TipoTributo, PeriodoCalculo } from "./tabelasTributos";

export interface SimulacaoSalva {
  id: string;
  tipoTributo: TipoTributo;
  regime: string;
  valorBase: number;
  periodo: PeriodoCalculo;
  valorImposto: number;
  valorLiquido: number;
  parcelas?: number;
  valorParcela?: number;
  criadoEm: string;
}

const CHAVE_STORAGE = "portal_contabil_simulacoes";

export function salvarSimulacao(simulacao: Omit<SimulacaoSalva, "id" | "criadoEm">): SimulacaoSalva {
  const novaSimulacao: SimulacaoSalva = {
    ...simulacao,
    id: Date.now().toString(),
    criadoEm: new Date().toISOString(),
  };

  const historico = listarSimulacoes();
  const atualizado = [novaSimulacao, ...historico].slice(0, 20); // mantém só as últimas 20

  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(atualizado));
  } catch {
    // Em caso de erro (ex: localStorage cheio ou bloqueado), falha silenciosamente
  }

  return novaSimulacao;
}

export function listarSimulacoes(): SimulacaoSalva[] {
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

export function excluirSimulacao(id: string): void {
  const historico = listarSimulacoes();
  const atualizado = historico.filter((s) => s.id !== id);
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(atualizado));
  } catch {
    // falha silenciosa
  }
}

export function limparHistorico(): void {
  try {
    localStorage.removeItem(CHAVE_STORAGE);
  } catch {
    // falha silenciosa
  }
}
