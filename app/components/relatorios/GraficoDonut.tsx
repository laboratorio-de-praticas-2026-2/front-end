interface Segmento {
  label: string;
  valor: number;
  cor: string;
}

interface GraficoDonutProps {
  titulo: string;
  ultimaAtualizacao: string;
  total: number;
  segmentos: Segmento[];
}

const RAIO = 60;
const CIRCUNFERENCIA = 2 * Math.PI * RAIO;

export default function GraficoDonut({
  titulo,
  ultimaAtualizacao,
  total,
  segmentos,
}: GraficoDonutProps) {
  let acumulado = 0;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-zinc-800 text-sm">{titulo}</h3>
        <span className="text-zinc-300">⚙</span>
      </div>
      <p className="text-xs text-zinc-400 mb-4">Última atualização: {ultimaAtualizacao}</p>

      <div className="flex justify-center">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r={RAIO} fill="none" stroke="#f3f4f6" strokeWidth="18" />
          {segmentos.map((seg, index) => {
            const proporcao = total > 0 ? seg.valor / total : 0;
            const comprimento = proporcao * CIRCUNFERENCIA;
            const offset = CIRCUNFERENCIA - (acumulado / total) * CIRCUNFERENCIA;
            acumulado += seg.valor;

            return (
              <circle
                key={index}
                cx="80"
                cy="80"
                r={RAIO}
                fill="none"
                stroke={seg.cor}
                strokeWidth="18"
                strokeDasharray={`${comprimento} ${CIRCUNFERENCIA - comprimento}`}
                strokeDashoffset={offset}
                transform="rotate(-90 80 80)"
                strokeLinecap="round"
              />
            );
          })}
          <text x="80" y="87" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#18181b">
            {total}
          </text>
        </svg>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {segmentos.map((seg, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.cor }} />
              <span className="text-zinc-600">{seg.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-800 font-medium">{seg.valor}</span>
              <span className="text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">
                {total > 0 ? Math.round((seg.valor / total) * 100) : 0}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
