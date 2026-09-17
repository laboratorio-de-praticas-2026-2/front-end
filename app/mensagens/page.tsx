"use client";

import { useState } from "react";
import { Header } from "../components/Header";

// 👇 Lista de conversas (sidebar esquerda) - ajuste conforme dados reais da API
const conversas = [
  {
    id: 1,
    nome: "Bela ADM",
    status: "Espera",
    hora: "09:39:00",
    verificado: false,
  },
  {
    id: 2,
    nome: "Amanda Silva",
    status: "Atendimento",
    hora: "09:39:00",
    verificado: true,
  },
  {
    id: 3,
    nome: "Pedro Alves",
    status: "Espera",
    hora: "09:39:00",
    verificado: false,
  },
  {
    id: 4,
    nome: "Isabella Pedrosa",
    status: "Atendimento",
    hora: "09:39:00",
    verificado: false,
  },
  {
    id: 5,
    nome: "Victoria Alves",
    status: "Espera",
    hora: "09:39:00",
    verificado: false,
  },
];

// 👇 Mensagens da conversa selecionada - ajuste conforme dados reais
const mensagensIniciais = [
  {
    id: 1,
    hora: "8:00 PM",
    texto: "Olá! Seja bem-vindo ao Portal Contábil Bortone. Como podemos ajudar você hoje?",
    proprio: false,
  },
  {
    id: 2,
    hora: "8:00 PM",
    texto: "Oi, gostaria de tirar uma dúvida sobre a documentação da minha empresa.",
    proprio: true,
  },
  {
    id: 3,
    hora: "8:00 PM",
    texto: "Claro, pode me informar qual documento você precisa consultar ou enviar?",
    proprio: false,
  },
  {
    id: 4,
    hora: "8:00 PM",
    texto: "Preciso saber quais documentos são necessários para a declaração mensal.",
    proprio: true,
  },
];

export default function MensagensPage() {
  const [conversaSelecionada, setConversaSelecionada] = useState(conversas[0].id);
  const [mensagens, setMensagens] = useState(mensagensIniciais);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [busca, setBusca] = useState("");

  const conversasFiltradas = conversas.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleEnviar = () => {
    const texto = novaMensagem.trim();
    if (!texto) return;

    setMensagens((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        hora: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        texto,
        proprio: true,
      },
    ]);
    setNovaMensagem("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEnviar();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Cabeçalho padrão do site */}
      <Header />

      {/* Corpo da página de mensagens: ocupa a largura toda, abaixo do header */}
      <div className="flex-1 flex w-full">
        {/* ============ SIDEBAR: lista de conversas ============ */}
        <aside className="w-[280px] shrink-0 border-r border-zinc-200 flex flex-col bg-white">
          <div className="px-4 py-3 flex items-center justify-between border-b border-zinc-100">
            <h3 className="font-semibold text-zinc-800">Mensagens</h3>
            <button className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline">
              CHAT <span className="text-base leading-none">+</span>
            </button>
          </div>

          <div className="px-3 py-2">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar chat..."
              className="w-full text-xs px-3 py-2 rounded-md bg-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversasFiltradas.map((conversa) => (
              <button
                key={conversa.id}
                onClick={() => setConversaSelecionada(conversa.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${
                  conversaSelecionada === conversa.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-zinc-300 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-zinc-800 truncate">
                      {conversa.nome}
                    </span>
                    {conversa.verificado && (
                      <span className="text-blue-500 text-[10px]">✓</span>
                    )}
                  </div>
                  <span className="text-xs text-zinc-400">{conversa.status}</span>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] text-zinc-400">{conversa.hora}</span>
                  <span className="text-blue-400 text-xs">➤</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* ============ ÁREA DE CHAT ============ */}
        <main className="flex-1 flex flex-col bg-white">
          {/* Cabeçalho do chat */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-200 shrink-0">
            <div className="w-9 h-9 rounded-full bg-zinc-300" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-zinc-800">
                Suporte ADMIN
              </span>
              <span className="text-xs text-zinc-400">#CU87881</span>
            </div>

            <div className="ml-auto flex items-center gap-4 text-zinc-400">
              <button aria-label="Ligar" className="hover:text-blue-600">
                📞
              </button>
              <button aria-label="Chamada de vídeo" className="hover:text-blue-600">
                🎥
              </button>
              <button aria-label="Informações" className="hover:text-blue-600">
                ℹ️
              </button>
            </div>
          </div>

          {/* Lista de mensagens (com rolagem interna) */}
          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
            {mensagens.map((mensagem) => (
              <div
                key={mensagem.id}
                className={`flex gap-2 items-end ${
                  mensagem.proprio ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-zinc-300 shrink-0" />

                <div
                  className={`flex flex-col gap-1 max-w-[60%] ${
                    mensagem.proprio ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                      mensagem.proprio
                        ? "bg-blue-500 text-white rounded-br-sm"
                        : "bg-blue-50 text-zinc-700 rounded-bl-sm"
                    }`}
                  >
                    {mensagem.texto}
                  </div>
                  <span className="text-[10px] text-zinc-400">{mensagem.hora}</span>
                </div>
              </div>
            ))}

            {/* Indicador de "digitando..." */}
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-300 shrink-0" />
              <div className="px-4 py-2 rounded-2xl bg-blue-50 text-zinc-400 text-sm">
                ...
              </div>
            </div>
          </div>

          {/* Campo de resposta */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-zinc-200 shrink-0">
            <button aria-label="Anexar arquivo" className="text-zinc-400 hover:text-blue-600">
              📎
            </button>
            <input
              type="text"
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite a mensagem..."
              className="flex-1 text-sm px-4 py-2.5 rounded-full border border-zinc-300 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleEnviar}
              aria-label="Enviar mensagem"
              className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white shrink-0 transition-colors"
            >
              ➤
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}