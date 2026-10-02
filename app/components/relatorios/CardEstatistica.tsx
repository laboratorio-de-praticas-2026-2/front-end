interface CardEstatisticaProps {
  titulo: string;
  valor: number;
  variacaoTexto: string;
  variacaoTipo: "alta" | "baixa";
}

export default function CardEstatistica({
  titulo,
  valor,
  variacaoTexto,
  variacaoTipo,
}: CardEstatisticaProps) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 flex-1 min-w-[180px]">
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="text-3xl font-bold text-zinc-900 mt-1">{valor}</p>
      <p
        className={`text-xs mt-2 flex items-center gap-1 ${
          variacaoTipo === "alta" ? "text-green-600" : "text-red-500"
        }`}
      >
        {variacaoTipo === "alta" ? "↑" : "↓"} {variacaoTexto}
      </p>
    </div>
  );
}
