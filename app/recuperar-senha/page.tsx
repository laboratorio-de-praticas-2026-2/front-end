"use client";

import { useState } from "react";
import Link from "next/link";

// 👇 MOCK: troque pela chamada real da API quando o back-end estiver pronto.
// Deve retornar { sucesso: boolean } — sucesso=false representa "e-mail não encontrado".
async function solicitarRecuperacaoNaAPI(email: string): Promise<{ sucesso: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 1200)); // simula latência de rede
  // Mock simples: e-mails terminados em "@teste.com" simulam "não encontrado"
  const encontrado = !email.endsWith("@teste.com");
  return { sucesso: encontrado };
}

function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [erroCampo, setErroCampo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [feedback, setFeedback] = useState<{ tipo: "sucesso" | "erro"; mensagem: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!email.trim()) {
      setErroCampo("Informe seu e-mail.");
      return;
    }
    if (!validarEmail(email)) {
      setErroCampo("Informe um e-mail válido.");
      return;
    }
    setErroCampo("");

    setCarregando(true);
    try {
      const resposta = await solicitarRecuperacaoNaAPI(email);
      if (resposta.sucesso) {
        setFeedback({
          tipo: "sucesso",
          mensagem: "Enviamos um link de recuperação para o seu e-mail. Verifique sua caixa de entrada.",
        });
      } else {
        setFeedback({
          tipo: "erro",
          mensagem: "Não encontramos nenhuma conta com esse e-mail.",
        });
      }
    } catch {
      setFeedback({
        tipo: "erro",
        mensagem: "Ocorreu um erro ao tentar enviar o link. Tente novamente.",
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Recuperar senha</h1>
        <p className="text-sm text-zinc-500 mb-6">
          Informe o e-mail cadastrado para receber o link de redefinição de senha.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-1 ${
                erroCampo
                  ? "border-red-400 focus:ring-red-400"
                  : "border-zinc-300 focus:ring-blue-500"
              }`}
            />
            {erroCampo && <span className="text-xs text-red-500">{erroCampo}</span>}
          </div>

          {feedback && (
            <div
              className={`text-sm px-4 py-3 rounded-lg ${
                feedback.tipo === "sucesso"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {feedback.mensagem}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-blue-950 hover:bg-blue-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            {carregando ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar link de recuperação"
            )}
          </button>
        </form>

        <Link
          href="/login"
          className="block text-center text-sm text-blue-700 hover:underline mt-6"
        >
          Voltar para o login
        </Link>
      </div>
    </div>
  );
}