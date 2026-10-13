
/** Contrato HTTP do módulo de relatórios do backend NestJS. */

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'
).replace(/\/$/, '');

const TIMEOUT_MS = 15000;

export type StatusRelatorio = 'PENDENTE' | 'GERADO' | 'FALHA';

export interface Relatorio {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  dataInicio: string;
  dataTermino: string;
  status: StatusRelatorio;
  arquivoUrl: string | null;
}

export interface PaginaRelatorios {
  dados: Relatorio[];
  total: number;
  pagina: number;
  limite: number;
  temProximaPagina: boolean;
}

export interface CriarRelatorio {
  nome: string;
  categoria: string;
  descricao: string;
  data_inicio: string;
  data_termino: string;
}

async function executarFetch(
  path: string,
  options?: RequestInit
): Promise<Response> {
  try {
    const resposta = await fetch(`${API_URL}${path}`, {
      ...options,
      signal: options?.signal
        ? AbortSignal.any([
            options.signal,
            AbortSignal.timeout(TIMEOUT_MS),
          ])
        : AbortSignal.timeout(TIMEOUT_MS),
      cache: 'no-store',
    });

    if (!resposta.ok) {
      const erro = (await resposta.json().catch(() => null)) as {
        message?: string | string[];
      } | null;

      const mensagem = Array.isArray(erro?.message)
        ? erro.message.join('; ')
        : erro?.message;

      throw new Error(
        mensagem || `Erro HTTP ${resposta.status}`
      );
    }

    return resposta;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'TimeoutError') {
        throw new Error(
          'A requisição demorou muito para responder. Tente novamente.'
        );
      }

      if (error.name === 'AbortError') {
        throw new Error('A requisição foi cancelada.');
      }

      if (error instanceof TypeError) {
        throw new Error(
          'Não foi possível conectar ao servidor. Verifique se o backend está funcionando.'
        );
      }

      throw error;
    }

    throw new Error(
      'Ocorreu um erro inesperado na comunicação com a API.'
    );
  }
}

async function requisicao<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const resposta = await executarFetch(path, {
    ...options,
    headers: {
      ...(options?.body
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...options?.headers,
    },
  });

  if (resposta.status === 204) {
    return undefined as T;
  }

  return resposta.json() as Promise<T>;
}

export const relatoriosApi = {
  listar: (pagina = 1, nome = '') =>
    requisicao<PaginaRelatorios>(
      `/relatorios?page=${pagina}&limit=5&nome=${encodeURIComponent(nome)}`
    ),

  criar: (dados: CriarRelatorio) =>
    requisicao<Relatorio>('/relatorios', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  gerar: (relatorioId: string) =>
    requisicao<{ status: string }>('/relatorios/generate', {
      method: 'POST',
      body: JSON.stringify({ relatorioId }),
    }),

  excluir: (id: string) =>
    requisicao<unknown>(
      `/relatorios/${encodeURIComponent(id)}`,
      {
        method: 'DELETE',
      }
    ),

  pdf: async (
    id: string,
    acao: 'preview' | 'download'
  ): Promise<Blob> => {
    const resposta = await executarFetch(
      `/relatorios/${encodeURIComponent(id)}/${acao}`
    );

    const tipo = resposta.headers.get('content-type') || '';

    if (!tipo.includes('application/pdf')) {
      throw new Error(
        'O servidor não retornou um PDF válido.'
      );
    }

    return resposta.blob();
  },
};
