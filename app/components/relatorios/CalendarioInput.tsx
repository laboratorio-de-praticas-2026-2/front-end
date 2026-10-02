"use client";

import { useState } from "react";

interface CalendarioInputProps {
  label: string;
  value: string; // formato ISO yyyy-mm-dd
  onChange: (valor: string) => void;
  erro?: string;
}

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const nomesMeses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function formatarExibicao(iso: string) {
  if (!iso) return "";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function gerarDiasDoMes(ano: number, mes: number) {
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const dias: (number | null)[] = [];

  for (let i = 0; i < primeiroDia; i++) dias.push(null);
  for (let d = 1; d <= totalDias; d++) dias.push(d);

  return dias;
}

export default function CalendarioInput({ label, value, onChange, erro }: CalendarioInputProps) {
  const hoje = new Date();
  const dataSelecionada = value ? new Date(value + "T00:00:00") : null;

  const [mesExibido, setMesExibido] = useState(dataSelecionada ?? hoje);

  const ano = mesExibido.getFullYear();
  const mes = mesExibido.getMonth();
  const dias = gerarDiasDoMes(ano, mes);

  const handleSelecionarDia = (dia: number) => {
    const novaData = new Date(ano, mes, dia);
    const iso = novaData.toISOString().slice(0, 10);
    onChange(iso);
  };

  const mudarMes = (delta: number) => {
    setMesExibido(new Date(ano, mes + delta, 1));
  };

  const ehDiaSelecionado = (dia: number) => {
    if (!dataSelecionada) return false;
    return (
      dataSelecionada.getFullYear() === ano &&
      dataSelecionada.getMonth() === mes &&
      dataSelecionada.getDate() === dia
    );
  };

  return (
    <div className="flex flex-col gap-1 flex-1">
      <label className="text-sm font-medium text-zinc-700">
        {label} <span className="text-red-500">*</span>
      </label>

      <div
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm ${
          erro ? "border-red-400" : "border-zinc-300"
        }`}
      >
        <span>📅</span>
        <span className={value ? "text-zinc-800" : "text-zinc-400"}>
          {value ? formatarExibicao(value) : "Pick a date"}
        </span>
      </div>
      {erro && <span className="text-xs text-red-500">{erro}</span>}

      <div className="border border-zinc-200 rounded-lg p-3 mt-1">
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={() => mudarMes(-1)}
            className="text-zinc-400 hover:text-zinc-700 px-1"
            aria-label="Mês anterior"
          >
            ‹
          </button>
          <span className="text-sm font-medium text-zinc-700">
            {nomesMeses[mes]} {ano}
          </span>
          <button
            type="button"
            onClick={() => mudarMes(1)}
            className="text-zinc-400 hover:text-zinc-700 px-1"
            aria-label="Próximo mês"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {diasSemana.map((d) => (
            <span key={d} className="text-[10px] text-zinc-400 font-medium py-1">
              {d}
            </span>
          ))}

          {dias.map((dia, index) =>
            dia === null ? (
              <span key={`vazio-${index}`} />
            ) : (
              <button
                type="button"
                key={dia}
                onClick={() => handleSelecionarDia(dia)}
                className={`text-xs py-1.5 rounded-md transition-colors ${
                  ehDiaSelecionado(dia)
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {dia}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
