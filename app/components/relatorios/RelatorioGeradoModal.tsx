"use client";

import { useState } from "react";
import type { Relatorio } from "@/lib/relatorios/relatoriosApi";
import { abrirPdfRelatorio, baixarPdfRelatorio } from "@/lib/relatorios/gerarPdfRelatorio";

interface RelatorioGeradoModalProps {
  relatorio: Relatorio;
  onClose: () => void;
}

function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

export default function RelatorioGeradoModal({
  relatorio,
  onClose,
}: RelatorioGeradoModalProps) {
  const [processando, setProcessando] = useState<"abrir" | "baixar" | null>(null);
  const [erro, setErro] = useState("");

  const handleAbrir = async () => {
    setErro("");
    setProcessando("abrir");
    try {
      abrirPdfRelatorio(relatorio);
    } catch {
      setErro("Não foi possível abrir o PDF. Tente novamente.");
    } finally {
      setProcessando(null);
    }
  };

  const handleBaixar = async () => {
    setErro("");
    setProcessando("baixar");
    try {
      baixarPdfRelatorio(relatorio);
    } catch {
      setErro("Não foi possível baixar o PDF. Tente novamente.");
    } finally {
      setProcessando(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-zinc-900 mb-1">
          Relatório de {relatorio.categoria} — {formatarData(relatorio.dataInicio)} a{" "}
          {formatarData(relatorio.dataTermino)}
        </h2>

        <div className="flex flex-col gap-3 mt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Status</span>
            <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              {relatorio.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Tipo de relatório</span>
            <span className="font-medium text-zinc-800">{relatorio.categoria}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1">Descrição</span>
            <p className="text-zinc-700">{relatorio.descricao}</p>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Período</span>
            <span className="font-medium text-zinc-800">
              {formatarData(relatorio.dataInicio)} — {formatarData(relatorio.dataTermino)}
            </span>
          </div>
        </div>

        {erro && (
          <div className="text-sm px-4 py-3 rounded-lg mt-4 bg-red-50 text-red-700 border border-red-200">
            {erro}
          </div>
        )}

        <div className="border border-dashed border-zinc-300 rounded-xl flex flex-col items-center justify-center py-8 mt-5">
          <span className="text-3xl">📄</span>
          <p className="text-sm font-medium text-zinc-700 mt-2">Pré-visualização do PDF</p>
          <p className="text-xs text-zinc-400">Baixe para visualizar o documento completo</p>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="border border-zinc-300 text-zinc-700 font-semibold py-2.5 px-6 rounded-full hover:bg-zinc-50 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={handleAbrir}
            disabled={processando !== null}
            className="border border-zinc-300 text-zinc-700 font-semibold py-2.5 px-6 rounded-full hover:bg-zinc-50 transition-colors disabled:opacity-60"
          >
            {processando === "abrir" ? "Abrindo..." : "Abrir PDF"}
          </button>
          <button
            onClick={handleBaixar}
            disabled={processando !== null}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 px-6 rounded-full transition-colors"
          >
            {processando === "baixar" ? "Baixando..." : "Baixar PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
