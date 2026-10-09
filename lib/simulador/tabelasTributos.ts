// ATENÇÃO: As alíquotas e faixas abaixo são baseadas em tabelas públicas de referência
// (ano-base ~2024/2025) e servem para fins de SIMULAÇÃO. Como essas tabelas mudam todo ano,
// confirme os valores atualizados com o time antes de considerar isso definitivo em produção.

export type TipoTributo = "IR" | "DAS" | "INSS";
export type PeriodoCalculo = "Mensal" | "Anual";

export interface ResultadoCalculo {
  aliquotaNominal: number; // em decimal (ex: 0.15 = 15%)
  aliquotaEfetiva: number;
  valorImposto: number;
  valorLiquido: number;
  detalhes: string;
}

// ===================== IMPOSTO DE RENDA (IR) =====================
// Regime: tipo de rendimento
export type RegimeIR = "Assalariado (CLT)" | "Autônomo / Pró-labore";

interface FaixaIR {
  ate: number;
  aliquota: number;
  deducao: number;
}

const FAIXAS_IR_MENSAL: FaixaIR[] = [
  { ate: 2259.2, aliquota: 0, deducao: 0 },
  { ate: 2826.65, aliquota: 0.075, deducao: 169.44 },
  { ate: 3751.05, aliquota: 0.15, deducao: 381.44 },
  { ate: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { ate: Infinity, aliquota: 0.275, deducao: 896.0 },
];

export function calcularIR(
  valorBase: number,
  periodo: PeriodoCalculo,
  regime: RegimeIR
): ResultadoCalculo {
  const valorMensal = periodo === "Anual" ? valorBase / 12 : valorBase;
  const faixa = FAIXAS_IR_MENSAL.find((f) => valorMensal <= f.ate) ?? FAIXAS_IR_MENSAL[FAIXAS_IR_MENSAL.length - 1];

  const impostoMensal = Math.max(0, valorMensal * faixa.aliquota - faixa.deducao);
  const valorImposto = periodo === "Anual" ? impostoMensal * 12 : impostoMensal;

  return {
    aliquotaNominal: faixa.aliquota,
    aliquotaEfetiva: valorBase > 0 ? valorImposto / valorBase : 0,
    valorImposto,
    valorLiquido: valorBase - valorImposto,
    detalhes: `Regime: ${regime}. Faixa aplicada: ${(faixa.aliquota * 100).toFixed(1)}% com dedução de ${faixa.deducao.toFixed(2)} (cálculo mensal).`,
  };
}

// ===================== DAS (SIMPLES NACIONAL) =====================
// Regime: Anexo do Simples Nacional
export type RegimeDAS = "Anexo I (Comércio)" | "Anexo III (Serviços)";

interface FaixaDAS {
  ate: number;
  aliquotaNominal: number;
  deducao: number;
}

const FAIXAS_DAS: Record<RegimeDAS, FaixaDAS[]> = {
  "Anexo I (Comércio)": [
    { ate: 180000, aliquotaNominal: 0.04, deducao: 0 },
    { ate: 360000, aliquotaNominal: 0.073, deducao: 5940 },
    { ate: 720000, aliquotaNominal: 0.095, deducao: 13860 },
    { ate: 1800000, aliquotaNominal: 0.107, deducao: 22500 },
    { ate: 3600000, aliquotaNominal: 0.143, deducao: 87300 },
    { ate: 4800000, aliquotaNominal: 0.19, deducao: 378000 },
  ],
  "Anexo III (Serviços)": [
    { ate: 180000, aliquotaNominal: 0.06, deducao: 0 },
    { ate: 360000, aliquotaNominal: 0.112, deducao: 9360 },
    { ate: 720000, aliquotaNominal: 0.135, deducao: 17640 },
    { ate: 1800000, aliquotaNominal: 0.16, deducao: 35640 },
    { ate: 3600000, aliquotaNominal: 0.21, deducao: 125640 },
    { ate: 4800000, aliquotaNominal: 0.33, deducao: 648000 },
  ],
};

// valorBase aqui representa o RBT12 (receita bruta dos últimos 12 meses)
export function calcularDAS(
  valorBase: number,
  periodo: PeriodoCalculo,
  regime: RegimeDAS
): ResultadoCalculo {
  const rbt12 = periodo === "Mensal" ? valorBase * 12 : valorBase;
  const tabela = FAIXAS_DAS[regime];
  const faixa = tabela.find((f) => rbt12 <= f.ate) ?? tabela[tabela.length - 1];

  const aliquotaEfetiva =
    rbt12 > 0 ? (rbt12 * faixa.aliquotaNominal - faixa.deducao) / rbt12 : 0;

  const baseCalculo = periodo === "Mensal" ? valorBase : valorBase / 12;
  const valorImposto = Math.max(0, baseCalculo * aliquotaEfetiva);

  return {
    aliquotaNominal: faixa.aliquotaNominal,
    aliquotaEfetiva,
    valorImposto,
    valorLiquido: baseCalculo - valorImposto,
    detalhes: `Regime: ${regime}. RBT12 considerado: ${rbt12.toFixed(2)}. Alíquota efetiva aplicada sobre o faturamento do período.`,
  };
}

// ===================== INSS =====================
export type RegimeINSS = "Empregado (CLT)" | "Autônomo / Contribuinte Individual";

interface FaixaINSS {
  ate: number;
  aliquota: number;
}

const FAIXAS_INSS_EMPREGADO: FaixaINSS[] = [
  { ate: 1412.0, aliquota: 0.075 },
  { ate: 2666.68, aliquota: 0.09 },
  { ate: 4000.03, aliquota: 0.12 },
  { ate: 7786.02, aliquota: 0.14 },
];

const TETO_INSS = 7786.02;
const CONTRIBUICAO_MAXIMA_EMPREGADO = 908.85; // valor de referência já consolidado no teto
const ALIQUOTA_AUTONOMO = 0.2;

export function calcularINSS(
  valorBase: number,
  periodo: PeriodoCalculo,
  regime: RegimeINSS
): ResultadoCalculo {
  const valorMensal = periodo === "Anual" ? valorBase / 12 : valorBase;

  let valorImpostoMensal: number;
  let aliquotaNominal: number;
  let detalhes: string;

  if (regime === "Empregado (CLT)") {
    if (valorMensal >= TETO_INSS) {
      valorImpostoMensal = CONTRIBUICAO_MAXIMA_EMPREGADO;
      aliquotaNominal = FAIXAS_INSS_EMPREGADO[FAIXAS_INSS_EMPREGADO.length - 1].aliquota;
      detalhes = "Valor base atingiu o teto do INSS; contribuição máxima aplicada.";
    } else {
      const faixa =
        FAIXAS_INSS_EMPREGADO.find((f) => valorMensal <= f.ate) ??
        FAIXAS_INSS_EMPREGADO[FAIXAS_INSS_EMPREGADO.length - 1];
      aliquotaNominal = faixa.aliquota;
      valorImpostoMensal = valorMensal * faixa.aliquota;
      detalhes = `Faixa progressiva aplicada: ${(faixa.aliquota * 100).toFixed(1)}%.`;
    }
  } else {
    const baseLimitada = Math.min(valorMensal, TETO_INSS);
    aliquotaNominal = ALIQUOTA_AUTONOMO;
    valorImpostoMensal = baseLimitada * ALIQUOTA_AUTONOMO;
    detalhes = `Alíquota fixa de 20% sobre a base, limitada ao teto de ${TETO_INSS.toFixed(2)}.`;
  }

  const valorImposto = periodo === "Anual" ? valorImpostoMensal * 12 : valorImpostoMensal;

  return {
    aliquotaNominal,
    aliquotaEfetiva: valorBase > 0 ? valorImposto / valorBase : 0,
    valorImposto,
    valorLiquido: valorBase - valorImposto,
    detalhes: `Regime: ${regime}. ${detalhes}`,
  };
}

export function formatarMoedaBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
