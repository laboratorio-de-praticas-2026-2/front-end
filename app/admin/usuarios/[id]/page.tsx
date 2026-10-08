"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AdminGuard from "../../../components/AdminGuard";
import type { Usuario } from "../page";

// 👇 MOCK: troque pela chamada real da API para buscar um usuário por id
async function buscarUsuarioPorIdNaAPI(id: string): Promise<Usuario | null> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  const mockUsuarios: Usuario[] = [
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
  return mockUsuarios.find((u) => u.id === id) ?? null;
}

// 👇 MOCK: troque pela chamada real da API para salvar as edições
async function atualizarUsuarioNaAPI(
  id: string,
  dados: Partial<Usuario>
): Promise<{ sucesso: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Mock: atualizando usuário", id, dados);
  return { sucesso: true };
}

function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function DetalheUsuarioContent() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [naoEncontrado, setNaoEncontrado] = useState(false);
  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erros, setErros] = useState<{ nome?: string; email?: string; telefone?: string }>({});
  const [feedback, setFeedback] = useState<{ tipo: "sucesso" | "erro"; mensagem: string } | null>(
    null
  );

  useEffect(() => {
    buscarUsuarioPorIdNaAPI(id).then((dados) => {
      if (dados) {
        setUsuario(dados);
      } else {
        setNaoEncontrado(true);
      }
      setCarregando(false);
    });
  }, [id]);

  const handleChange = (campo: keyof Usuario, valor: string) => {
    if (!usuario) return;
    setUsuario({ ...usuario, [campo]: valor });
  };

  const handleSalvar = async () => {
    if (!usuario) return;

    const novosErros: typeof erros = {};
    if (!usuario.nome.trim()) novosErros.nome = "Nome é obrigatório.";
    if (!validarEmail(usuario.email)) novosErros.email = "E-mail inválido.";
    if (!usuario.telefone.trim()) novosErros.telefone = "Telefone é obrigatório.";

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setSalvando(true);
    setFeedback(null);
    try {
      const resposta = await atualizarUsuarioNaAPI(usuario.id, usuario);
      if (resposta.sucesso) {
        setFeedback({ tipo: "sucesso", mensagem: "Usuário atualizado com sucesso!" });
        setEditando(false);
      } else {
        setFeedback({ tipo: "erro", mensagem: "Não foi possível salvar as alterações." });
      }
    } catch {
      setFeedback({ tipo: "erro", mensagem: "Erro ao salvar. Tente novamente." });
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <span className="w-6 h-6 border-2 border-zinc-300 border-t-blue-950 rounded-full animate-spin" />
      </div>
    );
  }

  if (naoEncontrado || !usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 text-center">
          <h1 className="text-xl font-bold text-zinc-900 mb-2">Usuário não encontrado</h1>
          <Link
            href="/admin/usuarios"
            className="inline-block bg-blue-950 hover:bg-blue-900 text-white font-semibold py-2.5 px-6 rounded-full transition-colors mt-4"
          >
            Voltar para a lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin/usuarios" className="text-sm text-blue-700 hover:underline">
          ← Voltar para a lista
        </Link>

        <div className="bg-white rounded-2xl border border-zinc-200 p-8 mt-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-zinc-900">{usuario.nome}</h1>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                usuario.tipo === "PF"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-purple-50 text-purple-700"
              }`}
            >
              {usuario.tipo === "PF" ? "Pessoa Física" : "Pessoa Jurídica"}
            </span>
          </div>

          {feedback && (
            <div
              className={`text-sm px-4 py-3 rounded-lg mb-4 ${
                feedback.tipo === "sucesso"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {feedback.mensagem}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Campo
              label="Nome"
              valor={usuario.nome}
              editavel={editando}
              erro={erros.nome}
              onChange={(v) => handleChange("nome", v)}
            />
            <Campo
              label="E-mail"
              valor={usuario.email}
              editavel={editando}
              erro={erros.email}
              onChange={(v) => handleChange("email", v)}
            />
            <Campo
              label="Telefone"
              valor={usuario.telefone}
              editavel={editando}
              erro={erros.telefone}
              onChange={(v) => handleChange("telefone", v)}
            />
            <Campo
              label={usuario.tipo === "PF" ? "CPF" : "CNPJ"}
              valor={usuario.documento}
              editavel={false}
              onChange={() => {}}
            />
          </div>

          <div className="flex gap-3 mt-8">
            {editando ? (
              <>
                <button
                  onClick={handleSalvar}
                  disabled={salvando}
                  className="bg-blue-950 hover:bg-blue-900 disabled:opacity-60 text-white font-semibold py-2.5 px-6 rounded-full transition-colors flex items-center gap-2"
                >
                  {salvando && (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  )}
                  {salvando ? "Salvando..." : "Salvar alterações"}
                </button>
                <button
                  onClick={() => setEditando(false)}
                  disabled={salvando}
                  className="border border-zinc-300 text-zinc-700 font-semibold py-2.5 px-6 rounded-full hover:bg-zinc-50 transition-colors"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditando(true)}
                className="bg-blue-950 hover:bg-blue-900 text-white font-semibold py-2.5 px-6 rounded-full transition-colors"
              >
                Editar usuário
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Campo({
  label,
  valor,
  editavel,
  erro,
  onChange,
}: {
  label: string;
  valor: string;
  editavel: boolean;
  erro?: string;
  onChange: (valor: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-zinc-700">{label}</label>
      {editavel ? (
        <>
          <input
            type="text"
            value={valor}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-1 ${
              erro ? "border-red-400 focus:ring-red-400" : "border-zinc-300 focus:ring-blue-500"
            }`}
          />
          {erro && <span className="text-xs text-red-500">{erro}</span>}
        </>
      ) : (
        <span className="text-sm text-zinc-800 py-2.5">{valor}</span>
      )}
    </div>
  );
}

export default function DetalheUsuarioPage() {
  return (
    <AdminGuard>
      <DetalheUsuarioContent />
    </AdminGuard>
  );
}