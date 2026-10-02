interface TopoAdminProps {
  nomeUsuario: string;
}

function dataFormatadaHoje() {
  const hoje = new Date();
  return hoje.toLocaleDateString("pt-BR");
}

export default function TopoAdmin({ nomeUsuario }: TopoAdminProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-white">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-lg font-semibold text-zinc-900">Olá {nomeUsuario}</span>
        <span className="text-zinc-300">»</span>
        <span className="text-zinc-400">{dataFormatadaHoje()}</span>
      </div>

      <div className="flex items-center gap-4">
        <button aria-label="Notificações" className="relative text-zinc-500 hover:text-zinc-700">
          🔔
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500" />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-zinc-50 w-64">
          <input
            type="text"
            placeholder="Busque aqui"
            className="bg-transparent text-sm flex-1 focus:outline-none"
          />
          <span className="text-zinc-400">🔍</span>
        </div>
      </div>
    </div>
  );
}
