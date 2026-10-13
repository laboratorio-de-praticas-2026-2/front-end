"use client";

import { useState, useEffect } from "react";
import {
  calcularIR,
  calcularDAS,
  calcularINSS,
  formatarMoedaBRL,
  type TipoTributo,
  type PeriodoCalculo,
  type RegimeIR,
  type RegimeDAS,
  type RegimeINSS,
  type ResultadoCalculo,
} from "@/lib/simulador/tabelasTributos";
import { calcularParcelamento, TAXA_JUROS_PADRAO } from "@/lib/simulador/parcelamento";
import {
  salvarSimulacao,
  listarSimulacoes,
  excluirSimulacao,
  type SimulacaoSalva,
} from "@/lib/simulador/historicoStorage";

const regimesPorTributo: Record<TipoTributo, string[]> = {
  IR: ["Assalariado (CLT)", "Autônomo / Pró-labore"],
  DAS: ["Anexo I (Comércio)", "Anexo III (Serviços)"],
  INSS: ["Empregado (CLT)", "Autônomo / Contribuinte Individual"],
};

export default function SimuladorPage() {
  const [tipoTributo, setTipoTributo] = useState<TipoTributo>("IR");
  const [valorBase, setValorBase] = useState("");
  const [periodo, setPeriodo] = useState<PeriodoCalculo>("Mensal");
  const [regime, setRegime] = useState<string>(regimesPorTributo.IR[0]);

  const [quantidadeParcelas, setQuantidadeParcelas] = useState("1");
  const [taxaJuros, setTaxaJuros] = useState((TAXA_JUROS_PADRAO * 100).toString());

  const [erros, setErros] = useState<Record<string, string>>({});
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  const [calculando, setCalculando] = useState(false);
  const [historico, setHistorico] = useState<SimulacaoSalva[]>([]);
  //const historico = listarSimulacoes();

  useEffect(() => {
    const carregarHistorico = () => {
      const dados = listarSimulacoes();
      setHistorico(dados);
    };
    carregarHistorico();
}, []);

  // Reseta o regime quando o tipo de tributo muda, para sempre ter uma opção válida
  //useEffect(() => {
   // setRegime(regimesPorTributo[tipoTributo][0]);
  //}, [tipoTributo]);

  //useEffect(() => {
  //const novoRegime = regimesPorTributo[tipoTributo]?.[0];
  //if (novoRegime && regime !== novoRegime) {
    //setRegime(novoRegime);
  //}
//}, [tipoTributo, regime]);


  const novoRegime = regimesPorTributo[tipoTributo]?.[0];
  const regimeAtual = novoRegime ?? regime;

  const validar = () => {
    const novosErros: Record<string, string> = {};
    const valorNumerico = Number(valorBase.replace(",", "."));

    if (!valorBase || isNaN(valorNumerico) || valorNumerico <= 0) {
      novosErros.valorBase = "Informe um valor base válido maior que zero.";
    }

    const parcelasNumero = Number(quantidadeParcelas);
    if (!quantidadeParcelas || isNaN(parcelasNumero) || parcelasNumero < 1 || parcelasNumero > 60) {
      novosErros.quantidadeParcelas = "Informe de 1 a 60 parcelas.";
    }

    const taxaNumero = Number(taxaJuros.replace(",", "."));
    if (taxaJuros === "" || isNaN(taxaNumero) || taxaNumero < 0) {
      novosErros.taxaJuros = "Informe uma taxa de juros válida.";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) {
      setResultado(null);
      return;
    }

    setCalculando(true);

    const valorNumerico = Number(valorBase.replace(",", "."));
    let resultadoCalculo: ResultadoCalculo;

    if (tipoTributo === "IR") {
      resultadoCalculo = calcularIR(valorNumerico, periodo, regimeAtual as RegimeIR);
    } else if (tipoTributo === "DAS") {
      resultadoCalculo = calcularDAS(valorNumerico, periodo, regimeAtual as RegimeDAS);
    } else {
      resultadoCalculo = calcularINSS(valorNumerico, periodo, regimeAtual as RegimeINSS);
    }

    setResultado(resultadoCalculo);

    const parcelasNumero = Number(quantidadeParcelas);
    const taxaDecimal = Number(taxaJuros.replace(",", ".")) / 100;
    const parcelamento = calcularParcelamento(
      resultadoCalculo.valorImposto,
      parcelasNumero,
      taxaDecimal
    );

    const salva = salvarSimulacao({
      tipoTributo,
      regime,
      valorBase: valorNumerico,
      periodo,
      valorImposto: resultadoCalculo.valorImposto,
      valorLiquido: resultadoCalculo.valorLiquido,
      parcelas: parcelasNumero,
      valorParcela: parcelamento.valorParcela,
    });

    setHistorico((prev) => [salva, ...prev]);
    setCalculando(false);
  };

  const handleExcluirHistorico = (id: string) => {
    excluirSimulacao(id);
    setHistorico((prev) => prev.filter((s) => s.id !== id));
  };

  const parcelasNumero = Number(quantidadeParcelas) || 0;
  const taxaDecimal = Number(taxaJuros.replace(",", ".")) / 100 || 0;
  const parcelamento = resultado
    ? calcularParcelamento(resultado.valorImposto, parcelasNumero, taxaDecimal)
    : null;

  return (
    <div className="min-h-screen bg-zinc-50 px-4 sm:px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-zinc-900">Simulador de Tributos</h1>
        <p className="text-sm text-zinc-500 mb-6">
          Simule IR, DAS e INSS, e veja a opção de parcelamento.
        </p>

        <form
          onSubmit={handleCalcular}
          className="bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700">Tipo de tributo</label>
              <select
                value={tipoTributo}
                onChange={(e) => setTipoTributo(e.target.value as TipoTributo)}
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="IR">Imposto de Renda (IR)</option>
                <option value="DAS">DAS (Simples Nacional)</option>
                <option value="INSS">INSS</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700">Regime</label>
              <select
                value={regimeAtual}
                onChange={(e) => setRegime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {regimesPorTributo[tipoTributo].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700">
                Valor base (R$) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={valorBase}
                onChange={(e) => setValorBase(e.target.value)}
                placeholder="Ex: 5000"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-1 ${
                  erros.valorBase
                    ? "border-red-400 focus:ring-red-400"
                    : "border-zinc-300 focus:ring-blue-500"
                }`}
              />
              {erros.valorBase && <span className="text-xs text-red-500">{erros.valorBase}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700">Período</label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value as PeriodoCalculo)}
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Mensal">Mensal</option>
                <option value="Anual">Anual</option>
              </select>
            </div>
          </div>

          <div className="border-t border-zinc-100 pt-4">
            <p className="text-sm font-semibold text-zinc-700 mb-3">Simulação de parcelamento</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700">Quantidade de parcelas</label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={quantidadeParcelas}
                  onChange={(e) => setQuantidadeParcelas(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-1 ${
                    erros.quantidadeParcelas
                      ? "border-red-400 focus:ring-red-400"
                      : "border-zinc-300 focus:ring-blue-500"
                  }`}
                />
                {erros.quantidadeParcelas && (
                  <span className="text-xs text-red-500">{erros.quantidadeParcelas}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700">Juros ao mês (%)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={taxaJuros}
                  onChange={(e) => setTaxaJuros(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-1 ${
                    erros.taxaJuros
                      ? "border-red-400 focus:ring-red-400"
                      : "border-zinc-300 focus:ring-blue-500"
                  }`}
                />
                {erros.taxaJuros && <span className="text-xs text-red-500">{erros.taxaJuros}</span>}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={calculando}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 mt-2"
          >
            {calculando && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {calculando ? "Calculando..." : "Calcular"}
          </button>
        </form>

        {resultado && parcelamento && (
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 mt-5">
            <h2 className="font-semibold text-zinc-800 mb-4">Resultado da simulação</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-zinc-50 rounded-xl p-4">
                <p className="text-zinc-500">Alíquota efetiva</p>
                <p className="text-xl font-bold text-zinc-900">
                  {(resultado.aliquotaEfetiva * 100).toFixed(2)}%
                </p>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4">
                <p className="text-zinc-500">Valor do imposto</p>
                <p className="text-xl font-bold text-red-600">
                  {formatarMoedaBRL(resultado.valorImposto)}
                </p>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4">
                <p className="text-zinc-500">Valor líquido</p>
                <p className="text-xl font-bold text-green-700">
                  {formatarMoedaBRL(resultado.valorLiquido)}
                </p>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4">
                <p className="text-zinc-500">Valor por parcela</p>
                <p className="text-xl font-bold text-zinc-900">
                  {formatarMoedaBRL(parcelamento.valorParcela)}
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 mt-4">{resultado.detalhes}</p>

            <div className="border-t border-zinc-100 mt-4 pt-4 text-sm flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-zinc-500">
                  Total em {parcelamento.quantidadeParcelas}x
                </span>
                <span className="font-medium text-zinc-800">
                  {formatarMoedaBRL(parcelamento.valorTotalComJuros)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Total de juros</span>
                <span className="font-medium text-zinc-800">
                  {formatarMoedaBRL(parcelamento.valorTotalJuros)}
                </span>
              </div>
            </div>
          </div>
        )}

        {historico.length > 0 && (
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 mt-5">
            <h2 className="font-semibold text-zinc-800 mb-4">Histórico de simulações</h2>
            <div className="flex flex-col gap-2">
              {historico.map((sim) => (
                <div
                  key={sim.id}
                  className="flex items-center justify-between text-sm border-b border-zinc-50 pb-2"
                >
                  <div>
                    <span className="font-medium text-zinc-800">{sim.tipoTributo}</span>
                    <span className="text-zinc-400"> — {sim.regime}</span>
                    <p className="text-xs text-zinc-400">
                      Base: {formatarMoedaBRL(sim.valorBase)} • Imposto:{" "}
                      {formatarMoedaBRL(sim.valorImposto)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleExcluirHistorico(sim.id)}
                    className="text-red-500 hover:underline text-xs font-medium"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
