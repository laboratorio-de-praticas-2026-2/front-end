"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminGuard from "../../components/AdminGuard";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: "PF" | "PJ";
  documento: string;
  telefone: string;
  status: "ativo" | "inativo";
}

// 👇 MOCK: troque pela chamada real da API de listagem de usuários
async function listarUsuariosNaAPI(): Promise<Usuario[]> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return [
    {
      id: "1",
      nome: "Carlos Mendes",
      email: "carlos.mendes@exemplo.com",
      tipo: "PF",
      documento: "123.456.789-00",
      telefone: "(11) 98888-1111",
      status: "ativo",
    },
    {
      id: "2",
      nome: "Bortone Contabilidade LTDA",
      email: "contato@bortonecontabil.com",
      tipo: "PJ",
      documento: "12.345.678/0001-90",
      telefone: "(11) 3333-2222",
      status: "ativo",
    },
    {
      id: "3",
      nome: "Fernanda Rocha",
      email: "fernanda.rocha@exemplo.com",
      tipo: "PF",
      documento: "987.654.321-00",
      telefone: "(11) 97777-3333",
      status: "inativo",
    },
  ];
}

function ListagemUsuariosContent() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    listarUsuariosNaAPI().then((dados) => {
      setUsuarios(dados);
      setCarregando(false);
    });
  }, []);

  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nome.toLowerCase().includes(busca.toLowerCase()) ||
      u.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-zinc-900 mb-1">Gestão de Usuários</h1>
        <p className="text-sm text-zinc-500 mb-6">
          Visualize e gerencie os usuários cadastrados no sistema.
        </p>

        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome ou e-mail..."
          className="w-full max-w-md px-4 py-2.5 rounded-lg border border-zinc-300 text-sm mb-6 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          {carregando ? (
            <div className="flex items-center justify-center py-16">
              <span className="w-6 h-6 border-2 border-zinc-300 border-t-blue-950 rounded-full animate-spin" />
            </div>
          ) : usuariosFiltrados.length === 0 ? (
            <p className="text-center text-sm text-zinc-400 py-16">
              Nenhum usuário encontrado.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-left text-zinc-500">
                  <th className="px-5 py-3 font-medium">Nome</th>
                  <th className="px-5 py-3 font-medium">E-mail</th>
                  <th className="px-5 py-3 font-medium">Tipo</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id} className="border-b border-zinc-50 hover:bg-zinc-50">
                    <td className="px-5 py-3 font-medium text-zinc-800">{usuario.nome}</td>
                    <td className="px-5 py-3 text-zinc-500">{usuario.email}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          usuario.tipo === "PF"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-purple-50 text-purple-700"
                        }`}
                      >
                        {usuario.tipo === "PF" ? "Pessoa Física" : "Pessoa Jurídica"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          usuario.status === "ativo"
                            ? "bg-green-50 text-green-700"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {usuario.status === "ativo" ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/usuarios/${usuario.id}`}
                        className="text-blue-700 hover:underline font-medium"
                      >
                        Ver / Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ListagemUsuariosPage() {
  return (
    <AdminGuard>
      <ListagemUsuariosContent />
    </AdminGuard>
  );
}