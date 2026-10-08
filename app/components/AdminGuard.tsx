"use client";

import Link from "next/link";
import { useUsuarioAtual } from "../hooks/useUsuarioAtual";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { usuario, carregando } = useUsuarioAtual();

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <span className="w-6 h-6 border-2 border-zinc-300 border-t-blue-950 rounded-full animate-spin" />
      </div>
    );
  }

  if (usuario?.tipo !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 text-center">
          <h1 className="text-xl font-bold text-zinc-900 mb-2">Acesso restrito</h1>
          <p className="text-sm text-zinc-500 mb-6">
            Esta página é exclusiva para administradores do sistema.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-950 hover:bg-blue-900 text-white font-semibold py-2.5 px-6 rounded-full transition-colors"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}