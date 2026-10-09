interface GraficoGaugeProps {
  titulo: string;
  ultimaAtualizacao: string;
  valorExibido: string;
  descricao: string;
  percentual: number; // 0 a 100
  cor?: string;
}

const RAIO = 60;
const CIRCUNFERENCIA = 2 * Math.PI * RAIO;

export default function GraficoGauge({
  titulo,
  ultimaAtualizacao,
  valorExibido,
  descricao,
  percentual,
  cor = "#f59e0b",
}: GraficoGaugeProps) {
  const comprimento = (percentual / 100) * CIRCUNFERENCIA;

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
          <circle
            cx="80"
            cy="80"
            r={RAIO}
            fill="none"
            stroke={cor}
            strokeWidth="18"
            strokeDasharray={`${comprimento} ${CIRCUNFERENCIA - comprimento}`}
            transform="rotate(-90 80 80)"
            strokeLinecap="round"
          />
          <text x="80" y="87" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#18181b">
            {valorExibido}
          </text>
        </svg>
      </div>

      <p className="text-xs text-zinc-400 text-center mt-2">{descricao}</p>
    </div>
  );
}
