
'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  relatoriosApi,
  type Relatorio,
  type StatusRelatorio,
} from './relatorios-api';

import {
  Bell,
  Search,
  FolderOpen,
  Lightbulb,
  Calendar,
  ChevronDown,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Eye,
  X,
  FileText,
  AlertTriangle,
} from 'lucide-react';

import NovoRelatorio from './NovoRelatorio';

type MenuFiltro = 'categoria' | 'status' | 'data' | null;
type AtalhoData = '' | 'hoje' | '7' | '30' | 'mes';

const TAMANHO_PAGINA = 5;

const STATUS: StatusRelatorio[] = [
  'PENDENTE',
  'GERADO',
  'FALHA',
];

const ATALHOS: {
  valor: AtalhoData;
  titulo: string;
}[] = [
  { valor: 'hoje', titulo: 'Hoje' },
  { valor: '7', titulo: 'Últimos 7 dias' },
  { valor: '30', titulo: 'Últimos 30 dias' },
  { valor: 'mes', titulo: 'Este mês' },
];

function dataLocal(data: Date): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

function formatarData(valor?: string | null): string {
  if (!valor) return '—';

  const partes = valor.slice(0, 10).split('-');

  if (partes.length !== 3) return valor;

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function estiloStatus(status: StatusRelatorio): string {
  switch (status) {
    case 'GERADO':
      return 'bg-green-500 text-white';

    case 'PENDENTE':
      return 'bg-yellow-500 text-white';

    case 'FALHA':
      return 'bg-red-500 text-white';
  }
}

export default function RelatoriosPage() {
  // Navegação
  const [currentView, setCurrentView] = useState<
    'lista' | 'novo'
  >('lista');

  // Dados
  const [todosRelatorios, setTodosRelatorios] = useState<
    Relatorio[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [busca, setBusca] = useState('');

  // Estados de requisição
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [processando, setProcessando] = useState(false);

  // Filtros
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('');
  const [dataInicioFiltro, setDataInicioFiltro] = useState('');
  const [dataFimFiltro, setDataFimFiltro] = useState('');
  const [atalhoData, setAtalhoData] = useState<AtalhoData>('');
  const [menuAberto, setMenuAberto] = useState<MenuFiltro>(null);

  // Modais
  const [isExportModalOpen, setIsExportModalOpen] =
    useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [relatorioSelecionado, setRelatorioSelecionado] =
    useState<Relatorio | null>(null);

  const [relatorioParaExcluir, setRelatorioParaExcluir] =
    useState<Relatorio | null>(null);

  // PDF
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<
    string | null
  >(null);

  const [carregandoPreview, setCarregandoPreview] =
    useState(false);

  const [erroPreview, setErroPreview] = useState(false);

  // Impede respostas antigas de sobrescreverem dados novos.
  const ultimaRequisicao = useRef(0);

  // Evita atualizações após desmontar o componente.
  const montado = useRef(false);

  // Referência para fechar os menus ao clicar fora.
  const filtrosRef = useRef<HTMLDivElement>(null);

  // =====================================================
  // CARREGAMENTO
  // =====================================================

  const carregarTodos = useCallback(async (): Promise<
    Relatorio[]
  > => {
    const primeira = await relatoriosApi.listar(1, '');

    const limite = Math.max(1, primeira.limite);

    const paginas = Math.max(
      1,
      Math.ceil(primeira.total / limite)
    );

    const registros: Relatorio[] = [...primeira.dados];

    for (let pagina = 2; pagina <= paginas; pagina++) {
      const resposta = await relatoriosApi.listar(
        pagina,
        ''
      );

      registros.push(...resposta.dados);
    }

    // Remove registros com o mesmo ID.
    // Mantém a primeira ocorrência encontrada.
    const registrosUnicos = Array.from(
      new Map(
        [...registros]
          .reverse()
          .map((relatorio) => [
            relatorio.id,
            relatorio,
          ])
      ).values()
    ).reverse();

    return registrosUnicos;
  }, []);

  const carregar = useCallback(
    async (mostrarCarregamento = true) => {
      const numeroRequisicao = ++ultimaRequisicao.current;

      if (mostrarCarregamento) {
        setCarregando(true);
      }

      try {
        const dados = await carregarTodos();

        if (
          !montado.current ||
          numeroRequisicao !== ultimaRequisicao.current
        ) {
          return;
        }

        setTodosRelatorios(dados);
        setErro('');
      } catch (e) {
        if (
          !montado.current ||
          numeroRequisicao !== ultimaRequisicao.current
        ) {
          return;
        }

        setErro(
          e instanceof Error
            ? e.message
            : 'Erro ao listar relatórios'
        );
      } finally {
        if (
          montado.current &&
          numeroRequisicao === ultimaRequisicao.current
        ) {
          setCarregando(false);
        }
      }
    },
    [carregarTodos]
  );

  useEffect(() => {
    montado.current = true;
    void carregar();

    return () => {
      montado.current = false;
      ultimaRequisicao.current++;
    };
  }, [carregar]);

  // =====================================================
  // CATEGORIAS
  // =====================================================

  const categorias = useMemo(() => {
    return Array.from(
      new Set(
        todosRelatorios
          .map((relatorio) => relatorio.categoria)
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [todosRelatorios]);

  // =====================================================
  // FILTROS
  // =====================================================

  const filtrosAtivos = Boolean(
    categoriaFiltro ||
      statusFiltro ||
      dataInicioFiltro ||
      dataFimFiltro
  );

  const relatoriosFiltrados = useMemo(() => {
    const pesquisa = busca
      .trim()
      .toLocaleLowerCase('pt-BR');

    return todosRelatorios.filter((relatorio) => {
      const nome = relatorio.nome
        .toLocaleLowerCase('pt-BR');

      const correspondeBusca =
        !pesquisa || nome.includes(pesquisa);

      const correspondeCategoria =
        !categoriaFiltro ||
        relatorio.categoria === categoriaFiltro;

      const correspondeStatus =
        !statusFiltro ||
        relatorio.status === statusFiltro;

      // O contrato atual fornece o início do período,
      // não a data em que o PDF foi gerado.
      const data = relatorio.dataInicio?.slice(0, 10) ?? '';

      const correspondeInicio =
        !dataInicioFiltro ||
        (data !== '' && data >= dataInicioFiltro);

      const correspondeFim =
        !dataFimFiltro ||
        (data !== '' && data <= dataFimFiltro);

      return (
        correspondeBusca &&
        correspondeCategoria &&
        correspondeStatus &&
        correspondeInicio &&
        correspondeFim
      );
    });
  }, [
    todosRelatorios,
    busca,
    categoriaFiltro,
    statusFiltro,
    dataInicioFiltro,
    dataFimFiltro,
  ]);

  // =====================================================
  // PAGINAÇÃO
  // =====================================================

  const paginasVisiveis = Math.max(
    1,
    Math.ceil(
      relatoriosFiltrados.length / TAMANHO_PAGINA
    )
  );

  const paginaAtual = Math.min(
    currentPage,
    paginasVisiveis
  );

  const relatoriosVisiveis = useMemo(() => {
    const inicio = (paginaAtual - 1) * TAMANHO_PAGINA;
    const fim = inicio + TAMANHO_PAGINA;

    return relatoriosFiltrados.slice(inicio, fim);
  }, [relatoriosFiltrados, paginaAtual]);

  useEffect(() => {
    if (currentPage > paginasVisiveis) {
      setCurrentPage(paginasVisiveis);
    }
  }, [currentPage, paginasVisiveis]);

  function handlePrevPage() {
    setCurrentPage((pagina) =>
      Math.max(1, pagina - 1)
    );
  }

  function handleNextPage() {
    setCurrentPage((pagina) =>
      Math.min(paginasVisiveis, pagina + 1)
    );
  }

  // =====================================================
  // FILTRO DE DATAS
  // =====================================================

  function selecionarAtalho(valor: AtalhoData) {
    setAtalhoData(valor);

    if (!valor) {
      setDataInicioFiltro('');
      setDataFimFiltro('');
      setCurrentPage(1);
      return;
    }

    const hoje = new Date();

    const inicio = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    );

    if (valor === '7') {
      inicio.setDate(inicio.getDate() - 6);
    }

    if (valor === '30') {
      inicio.setDate(inicio.getDate() - 29);
    }

    if (valor === 'mes') {
      inicio.setDate(1);
    }

    setDataInicioFiltro(dataLocal(inicio));
    setDataFimFiltro(dataLocal(hoje));
    setCurrentPage(1);
  }

  function alterarDataInicio(valor: string) {
    setAtalhoData('');
    setDataInicioFiltro(valor);

    if (
      valor &&
      dataFimFiltro &&
      valor > dataFimFiltro
    ) {
      setDataFimFiltro('');
    }

    setCurrentPage(1);
  }

  function alterarDataFim(valor: string) {
    setAtalhoData('');
    setDataFimFiltro(valor);

    if (
      valor &&
      dataInicioFiltro &&
      valor < dataInicioFiltro
    ) {
      setDataInicioFiltro('');
    }

    setCurrentPage(1);
  }

  function limparFiltros() {
    setCategoriaFiltro('');
    setStatusFiltro('');
    setDataInicioFiltro('');
    setDataFimFiltro('');
    setAtalhoData('');
    setMenuAberto(null);
    setCurrentPage(1);
  }

  const textoFiltroData = useMemo(() => {
    if (atalhoData) {
      const nomes: Record<string, string> = {
        hoje: 'Hoje',
        '7': '7 dias',
        '30': '30 dias',
        mes: 'Este mês',
      };

      return nomes[atalhoData];
    }

    if (dataInicioFiltro || dataFimFiltro) {
      return 'Período personalizado';
    }

    return 'Período';
  }, [atalhoData, dataInicioFiltro, dataFimFiltro]);

  // Fecha menus ao clicar fora.
  useEffect(() => {
    function fecharAoClicarFora(evento: MouseEvent) {
      if (
        filtrosRef.current &&
        !filtrosRef.current.contains(
          evento.target as Node
        )
      ) {
        setMenuAberto(null);
      }
    }

    document.addEventListener(
      'mousedown',
      fecharAoClicarFora
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        fecharAoClicarFora
      );
    };
  }, []);

  // =====================================================
  // ATUALIZAÇÃO AUTOMÁTICA
  // =====================================================

  const possuiPendentes = todosRelatorios.some(
    (relatorio) => relatorio.status === 'PENDENTE'
  );

  useEffect(() => {
    if (!possuiPendentes || currentView !== 'lista') {
      return;
    }

    const intervalo = setInterval(() => {
      void carregar(false);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [possuiPendentes, currentView, carregar]);

  // =====================================================
  // PRÉ-VISUALIZAÇÃO DO PDF
  // =====================================================

  useEffect(() => {
    if (
      !isExportModalOpen ||
      !relatorioSelecionado ||
      relatorioSelecionado.status !== 'GERADO'
    ) {
      return;
    }

    let cancelado = false;
    let objectUrl: string | null = null;

    const id = relatorioSelecionado.id;

    async function buscarPreview() {
      try {
        const blob = await relatoriosApi.pdf(
          id,
          'preview'
        );

        if (cancelado) return;

        objectUrl = URL.createObjectURL(blob);
        setPdfPreviewUrl(objectUrl);
      } catch (e) {
        if (!cancelado) {
          console.error(
            'Falha ao carregar pré-visualização:',
            e
          );

          setErroPreview(true);
        }
      } finally {
        if (!cancelado) {
          setCarregandoPreview(false);
        }
      }
    }

    void buscarPreview();

    return () => {
      cancelado = true;

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [isExportModalOpen, relatorioSelecionado]);

  function abrirModal(relatorio: Relatorio) {
    setPdfPreviewUrl(null);
    setErroPreview(false);

    setCarregandoPreview(
      relatorio.status === 'GERADO'
    );

    setRelatorioSelecionado(relatorio);
    setIsExportModalOpen(true);
  }

  function fecharModal() {
    setIsExportModalOpen(false);
    setRelatorioSelecionado(null);
    setPdfPreviewUrl(null);
    setCarregandoPreview(false);
  }

  async function abrirPdf(
    acao: 'preview' | 'download'
  ) {
    if (
      !relatorioSelecionado ||
      relatorioSelecionado.status !== 'GERADO'
    ) {
      return;
    }

    setProcessando(true);

    try {
      const blob = await relatoriosApi.pdf(
        relatorioSelecionado.id,
        acao
      );

      const url = URL.createObjectURL(blob);

      if (acao === 'preview') {
        const aba = window.open(
          url,
          '_blank'
        );

        if (!aba) {
          URL.revokeObjectURL(url);

          throw new Error(
            'Permita pop-ups para abrir o PDF.'
          );
        }

        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 60000);
      } else {
        const link = document.createElement('a');

        link.href = url;

        link.download = `${relatorioSelecionado.nome.replace(
          /[^a-zA-Z0-9_-]/g,
          '_'
        )}.pdf`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1000);
      }
    } catch (e) {
      setErro(
        e instanceof Error
          ? e.message
          : 'Erro ao obter PDF'
      );

      fecharModal();
    } finally {
      setProcessando(false);
    }
  }

  // =====================================================
  // EXCLUSÃO
  // =====================================================

  async function excluir() {
    if (!relatorioParaExcluir || processando) {
      return;
    }

    setProcessando(true);

    try {
      await relatoriosApi.excluir(
        relatorioParaExcluir.id
      );

      // Atualiza imediatamente os dados locais.
      setTodosRelatorios((anteriores) =>
        anteriores.filter(
          (relatorio) =>
            relatorio.id !== relatorioParaExcluir.id
        )
      );

      setIsDeleteModalOpen(false);
      setRelatorioParaExcluir(null);

      // Busca novamente para sincronizar com o backend.
      await carregar(false);
    } catch (e) {
      setErro(
        e instanceof Error
          ? e.message
          : 'Erro ao excluir relatório'
      );

      setIsDeleteModalOpen(false);
    } finally {
      setProcessando(false);
    }
  }

  // =====================================================
  // RENDERIZAÇÃO
  // =====================================================

  return (
    <div className="-m-8 p-8 bg-[#f8f9fb] min-h-screen flex flex-col font-sans text-gray-800 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-purple-100 mb-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-gray-900">
            Olá Ryan
          </h1>

          <span className="text-gray-400 font-medium text-sm">
            »
          </span>

          <span className="text-sm font-medium text-gray-400">
            {new Date().toLocaleDateString('pt-BR')}
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <button
            type="button"
            className="relative text-gray-400 hover:text-gray-600 transition"
            aria-label="Notificações"
          >
            <Bell className="w-6 h-6 fill-gray-300 stroke-gray-400 hover:fill-gray-400 transition" />

            <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#f4f5f7]">
              3
            </span>
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Busque aqui"
              className="w-80 bg-white border border-gray-100 rounded-full py-2 pl-4 pr-10 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <Search className="w-4 h-4 text-gray-400 absolute right-4 top-2.5" />
          </div>
        </div>
      </div>

      {currentView === 'lista' ? (
        <>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-[#243B53]">
              Relatórios
            </h2>
          </div>

          {/* Barra de pesquisa e filtros */}
          <div
            ref={filtrosRef}
            className="flex flex-wrap items-center justify-between gap-3 bg-gray-50/50 border border-gray-100 p-3 rounded-2xl mb-6 relative z-10"
          >
            <div className="flex flex-wrap items-center gap-3">
              {/* Pesquisa */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-2.5" />

                <input
                  type="text"
                  value={busca}
                  onChange={(e) => {
                    setBusca(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Pesquisar..."
                  aria-label="Pesquisar relatórios"
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 w-64 bg-white focus:outline-none focus:border-gray-300"
                />
              </div>

              {/* Categoria */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setMenuAberto((anterior) =>
                      anterior === 'categoria'
                        ? null
                        : 'categoria'
                    )
                  }
                  aria-expanded={
                    menuAberto === 'categoria'
                  }
                  className="flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 transition"
                >
                  <FolderOpen className="w-4 h-4" />

                  <span>
                    {categoriaFiltro || 'Categoria'}
                  </span>

                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {menuAberto === 'categoria' && (
                  <div className="absolute left-0 top-full mt-2 z-30 w-60 max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg p-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCategoriaFiltro('');
                        setCurrentPage(1);
                        setMenuAberto(null);
                      }}
                      className="block w-full text-left rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      Todas as categorias
                    </button>

                    {categorias.map((categoria) => (
                      <button
                        type="button"
                        key={categoria}
                        onClick={() => {
                          setCategoriaFiltro(categoria);
                          setCurrentPage(1);
                          setMenuAberto(null);
                        }}
                        className={`block w-full text-left rounded-lg px-3 py-2 text-sm hover:bg-gray-100 ${
                          categoriaFiltro === categoria
                            ? 'bg-blue-50 text-blue-700'
                            : ''
                        }`}
                      >
                        {categoria}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setMenuAberto((anterior) =>
                      anterior === 'status'
                        ? null
                        : 'status'
                    )
                  }
                  aria-expanded={
                    menuAberto === 'status'
                  }
                  className="flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 transition"
                >
                  <Lightbulb className="w-4 h-4" />

                  <span>
                    {statusFiltro || 'Status'}
                  </span>

                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {menuAberto === 'status' && (
                  <div className="absolute left-0 top-full mt-2 z-30 w-44 bg-white border border-gray-200 rounded-xl shadow-lg p-2">
                    <button
                      type="button"
                      onClick={() => {
                        setStatusFiltro('');
                        setCurrentPage(1);
                        setMenuAberto(null);
                      }}
                      className="block w-full text-left rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      Todos os status
                    </button>

                    {STATUS.map((status) => (
                      <button
                        type="button"
                        key={status}
                        onClick={() => {
                          setStatusFiltro(status);
                          setCurrentPage(1);
                          setMenuAberto(null);
                        }}
                        className={`block w-full text-left rounded-lg px-3 py-2 text-sm hover:bg-gray-100 ${
                          statusFiltro === status
                            ? 'bg-blue-50 text-blue-700'
                            : ''
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Período */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setMenuAberto((anterior) =>
                      anterior === 'data'
                        ? null
                        : 'data'
                    )
                  }
                  aria-expanded={menuAberto === 'data'}
                  className="flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 transition"
                >
                  <Calendar className="w-4 h-4" />

                  <span>{textoFiltroData}</span>

                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {menuAberto === 'data' && (
                  <div className="absolute left-0 top-full mt-2 z-30 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-4 space-y-3">
                    <p className="text-xs text-gray-500">
                      Filtrar pela data de início do período
                      do relatório.
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      {ATALHOS.map((opcao) => (
                        <button
                          type="button"
                          key={opcao.valor}
                          onClick={() =>
                            selecionarAtalho(
                              opcao.valor
                            )
                          }
                          className={`rounded-lg border px-2 py-2 text-xs ${
                            atalhoData === opcao.valor
                              ? 'bg-blue-50 border-blue-400 text-blue-700'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {opcao.titulo}
                        </button>
                      ))}
                    </div>

                    <label className="block text-xs text-gray-600">
                      Data inicial

                      <input
                        type="date"
                        value={dataInicioFiltro}
                        max={
                          dataFimFiltro || undefined
                        }
                        onChange={(e) =>
                          alterarDataInicio(
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-lg border border-gray-200 p-2 text-sm"
                      />
                    </label>

                    <label className="block text-xs text-gray-600">
                      Data final

                      <input
                        type="date"
                        value={dataFimFiltro}
                        min={
                          dataInicioFiltro || undefined
                        }
                        onChange={(e) =>
                          alterarDataFim(
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-lg border border-gray-200 p-2 text-sm"
                      />
                    </label>

                    <div className="flex justify-between gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          selecionarAtalho('')
                        }
                        className="text-xs text-gray-500 hover:underline"
                      >
                        Limpar datas
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setMenuAberto(null)
                        }
                        className="rounded-lg bg-[#203047] text-white text-xs px-4 py-2"
                      >
                        Concluir
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Limpar filtros */}
              {(filtrosAtivos || busca) && (
                <button
                  type="button"
                  onClick={() => {
                    limparFiltros();
                    setBusca('');
                  }}
                  className="text-xs text-blue-700 hover:underline"
                >
                  Limpar filtros
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                setCurrentView('novo')
              }
              className="flex items-center space-x-2 bg-[#203047] text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-[#1a2638] transition shadow-sm"
            >
              <Plus className="w-4 h-4" />

              <span>Novo Relatório</span>
            </button>
          </div>

          {erro && (
            <div
              role="alert"
              className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {erro}

              <button
                type="button"
                onClick={() =>
                  void carregar()
                }
                className="ml-3 underline"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* Tabela */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-8 flex-grow relative z-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-48">
                      Título
                    </th>

                    <th className="py-4 px-6 text-sm font-semibold text-gray-600">
                      Descrição
                    </th>

                    <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-48">
                      Categoria
                    </th>

                    <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-48">
                      Início do Período
                    </th>

                    <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-24 text-right">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!carregando &&
                    relatoriosVisiveis.map(
                      (relatorio) => (
                        <tr
                          key={relatorio.id}
                          className="border-b border-gray-100 last:border-none group"
                        >
                          <td className="py-5 px-6 text-sm text-black">
                            {relatorio.nome}
                          </td>

                          <td className="py-5 px-6 text-sm text-black font-medium">
                            {relatorio.descricao}
                          </td>

                          <td className="py-5 px-6 text-sm text-black font-medium">
                            {relatorio.categoria}
                          </td>

                          <td className="py-5 px-6 text-sm text-black font-medium">
                            {formatarData(
                              relatorio.dataInicio
                            )}
                          </td>

                          <td className="py-5 px-6">
                            <div className="flex items-center justify-end space-x-4 opacity-80 group-hover:opacity-100 transition">
                              <button
                                type="button"
                                onClick={() =>
                                  abrirModal(
                                    relatorio
                                  )
                                }
                                title="Ver relatório"
                                aria-label={`Ver ${relatorio.nome}`}
                                className="text-gray-400 hover:text-blue-600 transition"
                              >
                                <Eye className="w-5 h-5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setRelatorioParaExcluir(
                                    relatorio
                                  );

                                  setIsDeleteModalOpen(
                                    true
                                  );
                                }}
                                title="Excluir relatório"
                                aria-label={`Excluir ${relatorio.nome}`}
                                className="text-gray-400 hover:text-red-500 transition"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}

                  {carregando && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-sm text-gray-500"
                      >
                        Carregando relatórios...
                      </td>
                    </tr>
                  )}

                  {!carregando &&
                    relatoriosVisiveis.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-sm text-gray-500"
                        >
                          Nenhum relatório encontrado.
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paginação */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-400 font-medium pb-8 mt-auto">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={paginaAtual === 1}
              className={`flex items-center mr-4 transition ${
                paginaAtual === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:text-gray-700'
              }`}
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Anterior
            </button>

            {Array.from({
              length: paginasVisiveis,
            }).map((_, index) => {
              const numeroPagina = index + 1;

              return (
                <button
                  type="button"
                  key={numeroPagina}
                  onClick={() =>
                    setCurrentPage(
                      numeroPagina
                    )
                  }
                  aria-current={
                    paginaAtual === numeroPagina
                      ? 'page'
                      : undefined
                  }
                  className={`px-2 transition ${
                    paginaAtual === numeroPagina
                      ? 'text-black font-bold'
                      : 'hover:text-gray-700'
                  }`}
                >
                  {numeroPagina}
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleNextPage}
              disabled={
                paginaAtual >= paginasVisiveis
              }
              className={`flex items-center ml-4 transition ${
                paginaAtual >= paginasVisiveis
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:text-gray-700'
              }`}
            >
              Próximo
              <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 pb-4">
            {relatoriosFiltrados.length} relatório(s)
            encontrado(s)
          </p>
        </>
      ) : (
        <NovoRelatorio
          onVoltar={() =>
            setCurrentView('lista')
          }
          onCriado={() => {
            setCurrentView('lista');
            setCurrentPage(1);
            void carregar();
          }}
        />
      )}

      {/* Modal de exportação */}
      {isExportModalOpen &&
        relatorioSelecionado && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden max-h-[95vh] overflow-y-auto">
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {relatorioSelecionado.nome} —{' '}
                    {formatarData(
                      relatorioSelecionado.dataInicio
                    )}{' '}
                    a{' '}
                    {formatarData(
                      relatorioSelecionado.dataTermino
                    )}
                  </h3>

                  <button
                    type="button"
                    onClick={fecharModal}
                    className="text-gray-400 hover:text-gray-700 transition"
                    aria-label="Fechar modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="px-6 pb-4">
                <div className="border border-gray-200 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-gray-500">
                      Status
                    </span>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${estiloStatus(
                        relatorioSelecionado.status
                      )}`}
                    >
                      {relatorioSelecionado.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-gray-500">
                      Tipo de relatório
                    </span>

                    <span className="text-sm font-medium text-gray-800 text-right">
                      {relatorioSelecionado.categoria}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm text-gray-500">
                      Descrição
                    </span>

                    <p className="text-sm leading-relaxed text-gray-700">
                      {relatorioSelecionado.descricao}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-gray-500">
                      Período
                    </span>

                    <span className="text-sm font-medium text-gray-800 text-right">
                      {formatarData(
                        relatorioSelecionado.dataInicio
                      )}{' '}
                      —{' '}
                      {formatarData(
                        relatorioSelecionado.dataTermino
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pré-visualização */}
              <div className="px-6 pb-4">
                <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  {carregandoPreview ? (
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-sm text-gray-500">
                        Carregando pré-visualização...
                      </p>
                    </div>
                  ) : pdfPreviewUrl ? (
                    <iframe
                      src={`${pdfPreviewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                      title="Pré-visualização do PDF"
                      className="w-full h-64 border-0"
                    />
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-center p-6">
                      <FileText className="w-10 h-10 text-gray-400 mb-3" />

                      <p className="text-sm font-medium text-gray-600">
                        Pré-visualização indisponível
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {erroPreview
                          ? 'Não foi possível carregar a prévia do documento.'
                          : 'O PDF ainda não está disponível para prévia.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-1 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    void abrirPdf('preview')
                  }
                  disabled={
                    processando ||
                    relatorioSelecionado.status !==
                      'GERADO'
                  }
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Abrir PDF
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void abrirPdf('download')
                  }
                  disabled={
                    processando ||
                    relatorioSelecionado.status !==
                      'GERADO'
                  }
                  className="px-4 py-2.5 bg-[#0a84c5] hover:bg-[#086a9f] rounded-lg text-sm font-medium text-white disabled:opacity-50"
                >
                  Baixar PDF
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Modal de exclusão */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-black">
                Excluir Relatório
              </h3>

              <button
                type="button"
                onClick={() =>
                  setIsDeleteModalOpen(false)
                }
                disabled={processando}
                className="text-gray-400 hover:text-gray-700 transition disabled:opacity-50"
                aria-label="Fechar confirmação"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Tem certeza?
              </h4>

              <p className="text-sm text-gray-500">
                Você está prestes a excluir este
                relatório. Esta ação não pode ser
                desfeita.
              </p>

              {relatorioParaExcluir && (
                <p className="mt-3 text-sm font-semibold text-gray-800">
                  {relatorioParaExcluir.nome}
                </p>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3 bg-white rounded-b-lg">
              <button
                type="button"
                onClick={() =>
                  setIsDeleteModalOpen(false)
                }
                disabled={processando}
                className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={() => void excluir()}
                disabled={processando}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium text-white transition disabled:opacity-50"
              >
                {processando
                  ? 'Excluindo...'
                  : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
