"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PasswordInput from "../components/PasswordInput";

// 👇 MOCK: troque pela validação real do token com a API quando o back-end estiver pronto.
async function validarTokenNaAPI(token: string | null): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 800)); // simula latência
  // Mock simples: qualquer token com pelo menos 6 caracteres é considerado válido
  return !!token && token.length >= 6;
}

// 👇 MOCK: troque pela chamada real de redefinição de senha.
async function redefinirSenhaNaAPI(token: string, novaSenha: string): Promise<{ sucesso: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { sucesso: true };
}

function validarRequisitosSenha(senha: string): string[] {
  const problemas: string[] = [];
  if (senha.length < 8) problemas.push("Mínimo de 8 caracteres");
  if (!/[A-Z]/.test(senha)) problemas.push("Pelo menos 1 letra maiúscula");
  if (!/[0-9]/.test(senha)) problemas.push("Pelo menos 1 número");
  return problemas;
}

type EstadoToken = "verificando" | "valido" | "invalido";

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [estadoToken, setEstadoToken] = useState<EstadoToken>("verificando");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erros, setErros] = useState<{ senha?: string; confirmar?: string }>({});
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // Verifica se o link (token) ainda é válido ao carregar a página
  useEffect(() => {
    validarTokenNaAPI(token).then((valido) => {
      setEstadoToken(valido ? "valido" : "invalido");
    });
  }, [token]);

  // Redireciona para o login alguns segundos após o sucesso
  useEffect(() => {
    if (sucesso) {
      const timeout = setTimeout(() => {
        router.push("/login");
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [sucesso, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const problemasSenha = validarRequisitosSenha(senha);
    const novosErros: { senha?: string; confirmar?: string } = {};

    if (problemasSenha.length > 0) {
      novosErros.senha = `Requisitos faltando: ${problemasSenha.join(", ")}.`;
    }
    if (senha !== confirmarSenha) {
      novosErros.confirmar = "As senhas não coincidem.";
    }

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setCarregando(true);
    try {
      const resposta = await redefinirSenhaNaAPI(token!, senha);
      if (resposta.sucesso) {
        setSucesso(true);
      } else {
        setErros({ senha: "Não foi possível redefinir a senha. Tente novamente." });
      }
    } finally {
      setCarregando(false);
    }
  };

  // Estado: verificando token
  if (estadoToken === "verificando") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <span className="w-6 h-6 border-2 border-zinc-300 border-t-blue-950 rounded-full animate-spin" />
      </div>
    );
  }

  // Estado: token inválido ou expirado
  if (estadoToken === "invalido") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 text-center">
          <h1 className="text-xl font-bold text-zinc-900 mb-2">Link inválido ou expirado</h1>
          <p className="text-sm text-zinc-500 mb-6">
            Esse link de redefinição de senha não é mais válido. Solicite um novo link para continuar.
          </p>
          <Link
            href="/recuperar-senha"
            className="inline-block bg-blue-950 hover:bg-blue-900 text-white font-semibold py-2.5 px-6 rounded-full transition-colors"
          >
            Solicitar novo link
          </Link>
        </div>
      </div>
    );
  }

  // Estado: sucesso
  if (sucesso) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 text-center">
          <h1 className="text-xl font-bold text-zinc-900 mb-2">Senha redefinida!</h1>
          <p className="text-sm text-zinc-500">
            Você será redirecionado para o login em instantes...
          </p>
        </div>
      </div>
    );
  }

  // Estado: formulário de nova senha
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Redefinir senha</h1>
        <p className="text-sm text-zinc-500 mb-6">
          Escolha uma nova senha para acessar sua conta.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <PasswordInput
            id="senha"
            label="Nova senha"
            value={senha}
            onChange={setSenha}
            placeholder="Mínimo 8 caracteres, 1 maiúscula e 1 número"
            error={erros.senha}
          />

          <PasswordInput
            id="confirmarSenha"
            label="Confirmar nova senha"
            value={confirmarSenha}
            onChange={setConfirmarSenha}
            placeholder="Repita a nova senha"
            error={erros.confirmar}
          />

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-blue-950 hover:bg-blue-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            {carregando ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Salvando...
              </>
            ) : (
              "Redefinir senha"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}