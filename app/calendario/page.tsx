"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  ANO,
  MESES,
  PRAZOS,
  TIPOS,
  calcularStatus,
  diasAte,
  formatarData,
  parseISO,
  type Prazo,
  type StatusPrazo,
  type TipoPrazo,
} from "./dados";

const STATUS_UI: Record<StatusPrazo, { label: string; badge: string; dot: string }> = {
  urgente: { label: "Urgente", badge: "bg-[#FDECEC] text-[#B42323]", dot: "bg-[#D64545]" },
  proximo: { label: "Próximo", badge: "bg-[#FFF4D6] text-[#8A5A00]", dot: "bg-[#E8A317]" },
  "em-dia": { label: "Em dia", badge: "bg-[#E3F5EA] text-[#16783F]", dot: "bg-[#1E9E5A]" },
  encerrado: { label: "Encerrado", badge: "bg-[#EEF1F5] text-[#5B6B7F]", dot: "bg-[#9AA7B8]" },
};

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

// Data de "hoje" só no navegador (no servidor retorna null), evitando divergência na hidratação.
let hojeCache: Date | null = null;
const semAssinatura = () => () => {};
const lerHoje = () => (hojeCache ??= new Date());
const lerHojeServidor = () => null;

export default function CalendarioFiscalPage() {
  const hoje = useSyncExternalStore(semAssinatura, lerHoje, lerHojeServidor);
  if (!hoje) return <main className="min-h-screen bg-[#F1F4F8]" />;
  return <CalendarioFiscal hoje={hoje} />;
}

function CalendarioFiscal({ hoje }: { hoje: Date }) {
  const [calMes, setCalMes] = useState(() => (hoje.getFullYear() === ANO ? hoje.getMonth() : 0));
  const [filtroMes, setFiltroMes] = useState<number>(-1); // -1 = próximos vencimentos
  const [tipos, setTipos] = useState<TipoPrazo[]>([]); // vazio = todos
  const [diaSel, setDiaSel] = useState<string | null>(null);
  const [aberto, setAberto] = useState<Prazo | null>(null);

  const filtradosPorTipo = useMemo(
    () => PRAZOS.filter((p) => tipos.length === 0 || tipos.includes(p.tipo)),
    [tipos]
  );

  const lista = useMemo(() => {
    let r = filtradosPorTipo;
    if (diaSel) r = r.filter((p) => p.data === diaSel);
    else if (filtroMes >= 0) r = r.filter((p) => parseISO(p.data).getMonth() === filtroMes);
    else r = r.filter((p) => diasAte(p.data, hoje) >= 0);
    return r; // já ordenado por data
  }, [filtradosPorTipo, filtroMes, diaSel, hoje]);

  const contagem = useMemo(() => {
    const c = { urgente: 0, proximo: 0, "em-dia": 0 };
    PRAZOS.forEach((p) => {
      const s = calcularStatus(p.data, hoje);
      if (s !== "encerrado") c[s]++;
    });
    return c;
  }, [hoje]);

  // calendário
  const primeiroDia = new Date(ANO, calMes, 1).getDay();
  const diasNoMes = new Date(ANO, calMes + 1, 0).getDate();
  const celulas: (number | null)[] = [
    ...Array(primeiroDia).fill(null),
    ...Array.from({ length: diasNoMes }, (_, i) => i + 1),
  ];

  function irParaMes(m: number) {
    if (m < 0 || m > 11) return;
    setCalMes(m);
    setDiaSel(null);
    if (filtroMes >= 0) setFiltroMes(m);
  }

  function alternarTipo(t: TipoPrazo) {
    setTipos((atual) => (atual.includes(t) ? atual.filter((x) => x !== t) : [...atual, t]));
  }

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(null);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  const tituloLista = diaSel
    ? `Vencimentos de ${formatarData(diaSel)}`
    : filtroMes >= 0
      ? `Vencimentos de ${MESES[filtroMes]}`
      : "Próximos vencimentos";

  return (
    <main className="min-h-screen bg-[#F1F4F8] p-4 text-[#0B2A4A] sm:p-6">
      <header className="mb-5">
        <h1 className="text-2xl font-bold">Calendário fiscal</h1>
        <p className="text-sm text-[#5B6B7F]">
          Acompanhe vencimentos e obrigações fiscais de {ANO}.
        </p>
      </header>

      {/* Resumo */}
      <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {(["urgente", "proximo", "em-dia"] as const).map((s) => (
          <div key={s} className="flex items-center gap-3 rounded-xl border border-[#E3E8EF] bg-white p-4">
            <span className={`h-3 w-3 rounded-full ${STATUS_UI[s].dot}`} aria-hidden />
            <div>
              <p className="text-2xl font-bold leading-none">{contagem[s]}</p>
              <p className="mt-1 text-xs text-[#5B6B7F]">
                {s === "urgente" && "Urgentes (até 3 dias)"}
                {s === "proximo" && "Próximos (até 15 dias)"}
                {s === "em-dia" && "Em dia"}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Filtros */}
      <section className="mb-5 flex flex-col gap-3 rounded-xl border border-[#E3E8EF] bg-white p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
          <button
            type="button"
            onClick={() => setTipos([])}
            aria-pressed={tipos.length === 0}
            className={chip(tipos.length === 0)}
          >
            Todos
          </button>
          {(Object.keys(TIPOS) as TipoPrazo[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => alternarTipo(t)}
              aria-pressed={tipos.includes(t)}
              className={chip(tipos.includes(t))}
            >
              {TIPOS[t]}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm">
          <span className="text-[#5B6B7F]">Mês</span>
          <select
            value={filtroMes}
            onChange={(e) => {
              const v = Number(e.target.value);
              setFiltroMes(v);
              setDiaSel(null);
              if (v >= 0) setCalMes(v);
            }}
            className="rounded-lg border border-[#D5DCE6] bg-white px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6FB2]"
          >
            <option value={-1}>Próximos vencimentos</option>
            {MESES.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
        </label>
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        {/* Calendário */}
        <section className="rounded-xl border border-[#E3E8EF] bg-white p-4 sm:p-5" aria-label="Calendário mensal">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => irParaMes(calMes - 1)}
              disabled={calMes === 0}
              aria-label="Mês anterior"
              className="h-9 w-9 rounded-lg border border-[#D5DCE6] text-lg disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6FB2]"
            >
              ‹
            </button>
            <h2 className="text-lg font-semibold">{MESES[calMes]} de {ANO}</h2>
            <button
              type="button"
              onClick={() => irParaMes(calMes + 1)}
              disabled={calMes === 11}
              aria-label="Próximo mês"
              className="h-9 w-9 rounded-lg border border-[#D5DCE6] text-lg disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6FB2]"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#5B6B7F]">
            {DIAS_SEMANA.map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {celulas.map((dia, i) => {
              if (dia === null) return <div key={`v${i}`} />;
              const data = iso(ANO, calMes, dia);
              const doDia = filtradosPorTipo.filter((p) => p.data === data);
              const ehHoje = diasAte(data, hoje) === 0;
              const selecionado = diaSel === data;
              const temPrazo = doDia.length > 0;
              return (
                <button
                  key={data}
                  type="button"
                  disabled={!temPrazo}
                  onClick={() => setDiaSel(selecionado ? null : data)}
                  aria-pressed={selecionado}
                  aria-label={`${dia} de ${MESES[calMes]}${temPrazo ? `, ${doDia.length} vencimento(s)` : ""}`}
                  className={[
                    "flex aspect-square min-h-11 flex-col items-center justify-start gap-1 rounded-lg border p-1 text-sm",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6FB2]",
                    selecionado
                      ? "border-[#0B2A4A] bg-[#0B2A4A] text-white"
                      : ehHoje
                        ? "border-[#1F6FB2] bg-[#EAF3FB]"
                        : "border-transparent",
                    temPrazo && !selecionado ? "cursor-pointer hover:bg-[#F1F4F8]" : "",
                    !temPrazo ? "cursor-default text-[#5B6B7F]" : "font-medium",
                  ].join(" ")}
                >
                  <span>{dia}</span>
                  <span className="flex gap-0.5">
                    {doDia.slice(0, 3).map((p) => (
                      <span
                        key={p.id}
                        className={`h-1.5 w-1.5 rounded-full ${STATUS_UI[calcularStatus(p.data, hoje)].dot}`}
                      />
                    ))}
                  </span>
                </button>
              );
            })}
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5B6B7F]">
            {(Object.keys(STATUS_UI) as StatusPrazo[]).map((s) => (
              <li key={s} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${STATUS_UI[s].dot}`} aria-hidden />
                {STATUS_UI[s].label}
              </li>
            ))}
          </ul>
        </section>

        {/* Lista */}
        <section className="rounded-xl border border-[#E3E8EF] bg-white p-4 sm:p-5" aria-label="Lista de vencimentos">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">{tituloLista}</h2>
            {diaSel && (
              <button
                type="button"
                onClick={() => setDiaSel(null)}
                className="text-sm text-[#1F6FB2] underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6FB2]"
              >
                Limpar dia
              </button>
            )}
          </div>

          {lista.length === 0 ? (
            <p className="rounded-lg bg-[#F1F4F8] p-4 text-sm text-[#5B6B7F]">
              Nenhum vencimento encontrado para os filtros selecionados.
            </p>
          ) : (
            <ul className="flex max-h-[34rem] flex-col gap-2 overflow-y-auto pr-1">
              {lista.map((p) => {
                const status = calcularStatus(p.data, hoje);
                const dias = diasAte(p.data, hoje);
                const d = parseISO(p.data);
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => setAberto(p)}
                      className="flex w-full items-center gap-3 rounded-xl border border-[#E3E8EF] p-3 text-left hover:bg-[#F7F9FC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6FB2]"
                    >
                      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-[#0B2A4A] text-white">
                        <span className="text-base font-bold leading-none">{pad(d.getDate())}</span>
                        <span className="text-[10px]">
                          {MESES[d.getMonth()].slice(0, 3).toLowerCase()}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{p.titulo}</p>
                        <p className="text-xs text-[#5B6B7F]">
                          {TIPOS[p.tipo]}
                          {status !== "encerrado" && (dias === 0 ? " • vence hoje" : ` • em ${dias} dia${dias > 1 ? "s" : ""}`)}
                        </p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_UI[status].badge}`}>
                        {STATUS_UI[status].label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {/* Detalhe do prazo */}
      {aberto && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#0B2A4A]/50 p-0 sm:items-center sm:p-4"
          onClick={() => setAberto(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-prazo"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_UI[calcularStatus(aberto.data, hoje)].badge}`}
                >
                  {STATUS_UI[calcularStatus(aberto.data, hoje)].label}
                </span>
                <h3 id="titulo-prazo" className="mt-2 text-lg font-semibold">{aberto.titulo}</h3>
              </div>
              <button
                type="button"
                autoFocus
                onClick={() => setAberto(null)}
                aria-label="Fechar"
                className="h-9 w-9 shrink-0 rounded-lg border border-[#D5DCE6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6FB2]"
              >
                ✕
              </button>
            </div>

            <dl className="mb-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-[#5B6B7F]">Vencimento</dt>
                <dd className="font-medium">{formatarData(aberto.data)}</dd>
              </div>
              <div>
                <dt className="text-[#5B6B7F]">Tipo</dt>
                <dd className="font-medium">{TIPOS[aberto.tipo]}</dd>
              </div>
            </dl>

            <p className="mb-4 text-sm">{aberto.descricao}</p>

            <h4 className="mb-2 text-sm font-semibold">Orientações</h4>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              {aberto.orientacoes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}

function chip(ativo: boolean) {
  return [
    "rounded-full border px-3 py-1.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6FB2]",
    ativo
      ? "border-[#0B2A4A] bg-[#0B2A4A] text-white"
      : "border-[#D5DCE6] bg-white hover:bg-[#F1F4F8]",
  ].join(" ");
}