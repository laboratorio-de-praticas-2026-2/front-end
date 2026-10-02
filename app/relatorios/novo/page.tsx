"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gerarRelatorioNaAPI, type CategoriaRelatorio } from "@/lib/relatorios/relatoriosApi";
import CalendarioInput from "../../components/relatorios/CalendarioInput";

const categorias: CategoriaRelatorio[] = [
  "Visão Geral",
  "Fiscal e Tributário",
  "Gráficos",
  "Performance",
];

export default function NovoRelatorioPage() {
  const router = useRouter();

  const [categoria, setCategoria] = useState<CategoriaRelatorio>("Visão Geral");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [gerando, setGerando] = useState(false);
  const [erroGeral, setErroGeral] = useState("");

  const validar = () => {
    const novosErros: Record<string, string> = {};
    if (!nome.trim()) novosErros.nome = "Informe um nome para o relatório.";
    if (!descricao.trim()) novosErros.descricao = "Informe uma descrição.";
    if (!dataInicio) novosErros.dataInicio = "Selecione a data de início.";
    if (!dataTermino) novosErros.dataTermino = "Selecione a data de término.";
    if (dataInicio && dataTermino && dataTermino < dataInicio) {
      novosErros.dataTermino = "A data de término deve ser depois da data de início.";
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroGeral("");
    if (!validar()) return;

    setGerando(true);
    try {
      const resposta = await gerarRelatorioNaAPI({
        categoria,
        nome,
        descricao,
        dataInicio,
        dataTermino,
      });

      if (resposta.sucesso && resposta.relatorio) {
        // Guarda o relatório recém-gerado para a listagem mostrar o modal de sucesso
        sessionStorage.setItem("relatorioRecemGerado", JSON.stringify(resposta.relatorio));
        router.push("/relatorios");
      } else {
        setErroGeral(resposta.erro ?? "Não foi possível gerar o relatório. Tente novamente.");
      }
    } catch {
      setErroGeral("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setGerando(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-zinc-900">Gerar relatório</h1>
        <p className="text-sm text-zinc-500 mb-6">Gere novos relatórios sempre que precisar</p>

        <div className="border border-zinc-200 rounded-xl overflow-hidden">
          <div className="bg-zinc-50 px-5 py-3 border-b border-zinc-200 flex items-center gap-2 text-sm font-medium text-zinc-700">
            <span>📄</span> Gerar novo relatório
          </div>

          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
            {erroGeral && (
              <div className="text-sm px-4 py-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
                {erroGeral}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700">
                Categoria <span className="text-red-500">*</span>
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as CategoriaRelatorio)}
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {categorias.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700">
                Nome <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-1 ${
                  erros.nome
                    ? "border-red-400 focus:ring-red-400"
                    : "border-zinc-300 focus:ring-blue-500"
                }`}
              />
              {erros.nome && <span className="text-xs text-red-500">{erros.nome}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700">
                Descrição <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-1 ${
                  erros.descricao
                    ? "border-red-400 focus:ring-red-400"
                    : "border-zinc-300 focus:ring-blue-500"
                }`}
              />
              {erros.descricao && <span className="text-xs text-red-500">{erros.descricao}</span>}
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <CalendarioInput
                label="Data de início"
                value={dataInicio}
                onChange={setDataInicio}
                erro={erros.dataInicio}
              />
              <CalendarioInput
                label="Data de término"
                value={dataTermino}
                onChange={setDataTermino}
                erro={erros.dataTermino}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => router.push("/relatorios")}
                disabled={gerando}
                className="border border-zinc-300 text-zinc-700 font-semibold py-2.5 px-6 rounded-full hover:bg-zinc-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={gerando}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 px-6 rounded-full transition-colors flex items-center gap-2"
              >
                {gerando && (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {gerando ? "Gerando..." : "Gerar novo relatório"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
