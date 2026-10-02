"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  listarRelatoriosNaAPI,
  excluirRelatorioNaAPI,
  type Relatorio,
  type CategoriaRelatorio,
} from "@/lib/relatorios/relatoriosApi";
import { baixarPdfRelatorio } from "@/lib/relatorios/gerarPdfRelatorio";
import RelatorioGeradoModal from "../components/relatorios/RelatorioGeradoModal";
import TopoAdmin from "../components/TopoAdmin";
import CardEstatistica from "../components/relatorios/CardEstatistica";
import GraficoDonut from "../components/relatorios/GraficoDonut";
import GraficoGauge from "../components/relatorios/GraficoGauge";

function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

const categoriasFiltro: ("Todas" | CategoriaRelatorio)[] = [
  "Todas",
  "Visão Geral",
  "Fiscal e Tributário",
  "Gráficos",
  "Performance",
];

const CORES_CATEGORIA: Record<CategoriaRelatorio, string> = {
  "Visão Geral": "#a855f7",
  "Fiscal e Tributário": "#3b82f6",
  "Gráficos": "#14b8a6",
  "Performance": "#f59e0b",
};

export default function RelatoriosPage() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState<"Todas" | CategoriaRelatorio>("Todas");
  const [relatorioSelecionado, setRelatorioSelecionado] = useState<Relatorio | null>(null);
  const [excluindoId, setExcluindoId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ tipo: "sucesso" | "erro"; mensagem: string } | null>(
    null
  );

  const carregarRelatorios = async () => {
    setCarregando(true);
    const dados = await listarRelatoriosNaAPI();
    setRelatorios(dados);
    setCarregando(false);
  };

  useEffect(() => {
    async function inicializar() {
      await carregarRelatorios();

      const recemGerado = sessionStorage.getItem("relatorioRecemGerado");
      if (recemGerado) {
        const relatorio: Relatorio = JSON.parse(recemGerado);
        setRelatorios((prev) => [relatorio, ...prev]);
        setRelatorioSelecionado(relatorio);
        setFeedback({ tipo: "sucesso", mensagem: "Relatório gerado com sucesso!" });
        sessionStorage.removeItem("relatorioRecemGerado");
      }
    }
    inicializar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const relatoriosFiltrados = relatorios.filter((r) => {
    const bateBusca = r.nome.toLowerCase().includes(busca.toLowerCase());
    const bateCategoria = filtroCategoria === "Todas" || r.categoria === filtroCategoria;
    return bateBusca && bateCategoria;
  });

  const handleExcluir = async (id: string) => {
    setExcluindoId(id);
    setFeedback(null);
    try {
      const resposta = await excluirRelatorioNaAPI(id);
      if (resposta.sucesso) {
        setRelatorios((prev) => prev.filter((r) => r.id !== id));
        setFeedback({ tipo: "sucesso", mensagem: "Relatório excluído com sucesso." });
      } else {
        setFeedback({ tipo: "erro", mensagem: "Não foi possível excluir o relatório." });
      }
    } catch {
      setFeedback({ tipo: "erro", mensagem: "Erro ao excluir. Tente novamente." });
    } finally {
      setExcluindoId(null);
    }
  };

  // Dados para os cards de estatística (calculados a partir da lista)
  const totalRelatorios = relatorios.length;
  const gerados = relatorios.filter((r) => r.status === "Gerado").length;
  const processando = relatorios.filter((r) => r.status === "Processando").length;
  const comErro = relatorios.filter((r) => r.status === "Erro").length;

  // Dados para o donut de categorias
  const categoriasUnicas = Array.from(new Set(relatorios.map((r) => r.categoria)));
  const segmentosCategoria = categoriasUnicas.map((cat) => ({
    label: cat,
    valor: relatorios.filter((r) => r.categoria === cat).length,
    cor: CORES_CATEGORIA[cat],
  }));

  const taxaSucesso =
    totalRelatorios > 0 ? Math.round((gerados / totalRelatorios) * 100) : 0;

  return (
    <div className="min-h-screen bg-zinc-50">
      <TopoAdmin nomeUsuario="Ryan" />

      <div className="px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Relatórios</h1>
            <p className="text-sm text-zinc-500">
              Gere e gerencie os relatórios do Portal Contábil.
            </p>
          </div>
          <Link
            href="/relatorios/novo"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-full transition-colors flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Novo relatório
          </Link>
        </div>

        {feedback && (
          <div
            className={`text-sm px-4 py-3 rounded-lg mb-4 ${
              feedback.tipo === "sucesso"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {feedback.mensagem}
          </div>
        )}

        {/* Cards de estatística */}
        <div className="flex flex-wrap gap-4 mb-5">
          <CardEstatistica
            titulo="Total de Relatórios"
            valor={totalRelatorios}
            variacaoTexto={`${totalRelatorios} Relatórios Criados`}
            variacaoTipo="alta"
          />
          <CardEstatistica
            titulo="Relatórios Gerados"
            valor={gerados}
            variacaoTexto={`${gerados} Concluídos`}
            variacaoTipo="alta"
          />
          <CardEstatistica
            titulo="Processando"
            valor={processando}
            variacaoTexto={`${processando} Em andamento`}
            variacaoTipo="alta"
          />
          <CardEstatistica
            titulo="Com Erro"
            valor={comErro}
            variacaoTexto={`${comErro} Falharam`}
            variacaoTipo="baixa"
          />
        </div>

        {/* Conteúdo principal: gráficos (esquerda) + tabela (direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
          {/* Coluna esquerda: gráficos */}
          <div className="flex flex-col gap-5">
            <GraficoDonut
              titulo="Relatórios por Categoria"
              ultimaAtualizacao={new Date().toLocaleDateString("pt-BR")}
              total={totalRelatorios}
              segmentos={segmentosCategoria}
            />
            <GraficoGauge
              titulo="Taxa de Sucesso"
              ultimaAtualizacao={new Date().toLocaleDateString("pt-BR")}
              valorExibido={`${taxaSucesso}%`}
              descricao="Relatórios gerados com sucesso."
              percentual={taxaSucesso}
              cor="#14b8a6"
            />
          </div>

          {/* Coluna direita: tabela de relatórios */}
          <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
              <div>
                <h3 className="font-semibold text-zinc-800">Relatórios Criados</h3>
                <p className="text-xs text-zinc-400">
                  Última atualização: {new Date().toLocaleDateString("pt-BR")}
                </p>
              </div>
              <Link
                href="/relatorios/novo"
                aria-label="Novo relatório"
                className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50"
              >
                +
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 px-5 py-3 border-b border-zinc-100">
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por nome do relatório..."
                className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <select
                value={filtroCategoria}
                onChange={(e) =>
                  setFiltroCategoria(e.target.value as "Todas" | CategoriaRelatorio)
                }
                className="px-4 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {categoriasFiltro.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {carregando ? (
              <div className="flex items-center justify-center py-16">
                <span className="w-6 h-6 border-2 border-zinc-300 border-t-blue-950 rounded-full animate-spin" />
              </div>
            ) : relatoriosFiltrados.length === 0 ? (
              <p className="text-center text-sm text-zinc-400 py-16">
                Nenhum relatório encontrado.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 text-left text-zinc-500">
                    <th className="px-5 py-3 font-medium">Nome</th>
                    <th className="px-5 py-3 font-medium">Categoria</th>
                    <th className="px-5 py-3 font-medium">Período</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {relatoriosFiltrados.map((relatorio) => (
                    <tr key={relatorio.id} className="border-b border-zinc-50 hover:bg-zinc-50">
                      <td className="px-5 py-3 font-medium text-zinc-800">{relatorio.nome}</td>
                      <td className="px-5 py-3 text-zinc-500">{relatorio.categoria}</td>
                      <td className="px-5 py-3 text-zinc-500">
                        {formatarData(relatorio.dataInicio)} — {formatarData(relatorio.dataTermino)}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            relatorio.status === "Gerado"
                              ? "bg-green-50 text-green-700"
                              : relatorio.status === "Processando"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {relatorio.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => setRelatorioSelecionado(relatorio)}
                            className="text-blue-700 hover:underline font-medium"
                          >
                            Ver
                          </button>
                          <button
                            onClick={() => baixarPdfRelatorio(relatorio)}
                            disabled={relatorio.status !== "Gerado"}
                            className="text-blue-700 hover:underline font-medium disabled:text-zinc-300 disabled:no-underline"
                          >
                            Baixar
                          </button>
                          <button
                            onClick={() => handleExcluir(relatorio.id)}
                            disabled={excluindoId === relatorio.id}
                            className="text-red-600 hover:underline font-medium disabled:opacity-50"
                          >
                            {excluindoId === relatorio.id ? "Excluindo..." : "Excluir"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {relatorioSelecionado && (
        <RelatorioGeradoModal
          relatorio={relatorioSelecionado}
          onClose={() => setRelatorioSelecionado(null)}
        />
      )}
    </div>
  );
}