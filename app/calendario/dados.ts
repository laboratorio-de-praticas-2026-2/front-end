// Dados de prazos do ano corrente (mock estático).
// Quando o back-end estiver pronto, basta substituir PRAZOS por uma chamada à API
// mantendo o formato da interface `Prazo`.

export type TipoPrazo = "IR" | "DAS" | "INSS" | "ACESSORIA";
export type StatusPrazo = "em-dia" | "proximo" | "urgente" | "encerrado";

export interface Prazo {
  id: string;
  titulo: string;
  tipo: TipoPrazo;
  data: string; // YYYY-MM-DD
  descricao: string;
  orientacoes: string[];
}

export const ANO = 2026;

export const TIPOS: Record<TipoPrazo, string> = {
  IR: "Declaração IR",
  DAS: "Pagamento DAS",
  INSS: "Recolhimento INSS",
  ACESSORIA: "Obrigação acessória",
};

export const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Se cair em fim de semana, passa para o próximo dia útil (feriados não considerados). */
function diaUtil(ano: number, mes: number, dia: number): string {
  const d = new Date(ano, mes, dia);
  const sem = d.getDay();
  if (sem === 6) d.setDate(d.getDate() + 2);
  if (sem === 0) d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const mensais: Prazo[] = MESES.flatMap((_, m) => {
  const anterior = MESES[(m + 11) % 12];
  const anoComp = m === 0 ? ANO - 1 : ANO;
  return [
    {
      id: `das-${m}`,
      titulo: `DAS – competência ${anterior}/${anoComp}`,
      tipo: "DAS" as const,
      data: diaUtil(ANO, m, 20),
      descricao: "Guia única de pagamento dos tributos do Simples Nacional.",
      orientacoes: [
        "Emita a guia no PGDAS-D com a receita bruta do mês anterior.",
        "O pagamento deve ser feito até a data de vencimento para evitar multa e juros.",
        "Guarde o comprovante de pagamento junto aos documentos da empresa.",
      ],
    },
    {
      id: `inss-${m}`,
      titulo: `INSS – competência ${anterior}/${anoComp}`,
      tipo: "INSS" as const,
      data: diaUtil(ANO, m, 20),
      descricao: "Recolhimento das contribuições previdenciárias do mês anterior.",
      orientacoes: [
        "Confirme folha de pagamento e pró-labore da competência antes de gerar a guia.",
        "Pague até o vencimento; atrasos geram multa e juros sobre o valor devido.",
        "Envie o comprovante ao contador para conciliação.",
      ],
    },
  ];
});

const fixos: Prazo[] = [
  {
    id: "defis",
    titulo: "DEFIS – Declaração de Informações Socioeconômicas e Fiscais",
    tipo: "ACESSORIA",
    data: "2026-03-31",
    descricao: "Declaração anual das empresas optantes pelo Simples Nacional.",
    orientacoes: [
      "Reúna os dados de receitas, folha e lucros distribuídos do ano anterior.",
      "A entrega é feita pelo Portal do Simples Nacional.",
    ],
  },
  {
    id: "ir",
    titulo: "Declaração de Imposto de Renda – Pessoa Física",
    tipo: "IR",
    data: "2026-05-29",
    descricao: "Prazo final de entrega da declaração anual do IRPF.",
    orientacoes: [
      "Separe informes de rendimentos, recibos médicos e comprovantes de despesas dedutíveis.",
      "A entrega fora do prazo gera multa mínima e pendência no CPF.",
    ],
  },
  {
    id: "ecf",
    titulo: "ECF – Escrituração Contábil Fiscal",
    tipo: "ACESSORIA",
    data: "2026-07-31",
    descricao: "Escrituração anual para empresas fora do Simples Nacional.",
    orientacoes: [
      "A escrituração contábil do ano anterior precisa estar finalizada.",
      "A transmissão é feita via SPED, com assinatura digital.",
    ],
  },
];

export const PRAZOS: Prazo[] = [...mensais, ...fixos].sort((a, b) =>
  a.data.localeCompare(b.data)
);

/* ---------- helpers de data ---------- */

export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function diasAte(iso: string, hoje: Date): number {
  const alvo = parseISO(iso);
  const a = Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  const b = Date.UTC(alvo.getFullYear(), alvo.getMonth(), alvo.getDate());
  return Math.round((b - a) / 86_400_000);
}

/** urgente: até 3 dias | próximo: até 15 dias | em dia: depois disso | encerrado: já passou */
export function calcularStatus(iso: string, hoje: Date): StatusPrazo {
  const d = diasAte(iso, hoje);
  if (d < 0) return "encerrado";
  if (d <= 3) return "urgente";
  if (d <= 15) return "proximo";
  return "em-dia";
}

export function formatarData(iso: string): string {
  return parseISO(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}