"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const conversas = [
  {
    id: 1,
    nome: "Bela ADM",
    status: "Espera",
    hora: "00:31:00",
    verificado: false,
    badge: null,
    icone: "play",
    online: true,
    avatar: "/chat/1chatM.jpg",
  },
  {
    id: 2,
    nome: "Amanda Silva",
    status: "Atendimento",
    hora: "00:31:00",
    verificado: false,
    badge: 1,
    icone: null,
    online: false,
    avatar: "/chat/2chatM.jpg",
  },
  {
    id: 3,
    nome: "Pedro Alves",
    status: "Espera",
    hora: "00:31:00",
    verificado: false,
    badge: null,
    icone: "play",
    online: false,
    avatar: "/chat/5chatH.jpg",
  },
  {
    id: 4,
    nome: "Isabella Pedrosa",
    status: "Atendimento",
    hora: "00:31:00",
    verificado: false,
    badge: null,
    icone: "play",
    online: true,
    avatar: "/chat/3chatM.jpg",
  },
  {
    id: 5,
    nome: "Victoria Alves",
    status: "Espera",
    hora: "00:31:00",
    verificado: false,
    badge: null,
    icone: "play",
    online: false,
    avatar: "/chat/4chatM.jpg",
  },
];

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
    texto: "Olá, gostaria de tirar uma dúvida sobre a documentação da minha empresa.",
    proprio: true,
  },
  {
    id: 3,
    hora: "8:00 PM",
    texto: "Claro, João! Pode me informar qual documento você precisa consultar ou enviar?",
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
    <div className="min-h-screen flex flex-col bg-white overflow-x-auto">
      <div className="w-full min-w-[1024px]">
        <Header />
      </div>

      <div className="flex-1 flex w-full min-w-[1024px] max-w-[1440px] mx-auto my-6 px-4 gap-6">
        <aside className="w-[320px] shrink-0 border border-zinc-200 rounded-3xl flex flex-col bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-4">
            <h3 className="font-bold text-zinc-800 text-lg mb-3">Mensagens</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Pesquisar chat"
                  className="w-full text-xs px-3 py-2.5 rounded-md bg-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-400 pl-8 text-zinc-700 placeholder-zinc-400"
                />
                <svg className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/>
                </svg>
              </div>
              <button className="flex items-center gap-1 text-xs text-blue-600 font-semibold px-2 py-2 rounded-md hover:bg-blue-50 transition-colors">
                CHAT <span className="text-base leading-none font-bold">+</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
            {conversasFiltradas.map((conversa) => {
              const selecionada = conversaSelecionada === conversa.id;
              return (
                <button
                  key={conversa.id}
                  onClick={() => setConversaSelecionada(conversa.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all ${
                    selecionada
                      ? "bg-white border border-blue-200 rounded-2xl shadow-sm"
                      : "hover:bg-zinc-50 rounded-2xl"
                  }`}
                >
                  <div className="relative shrink-0 w-11 h-11">
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-zinc-300 relative">
                      <Image 
                        src={conversa.avatar} 
                        alt={conversa.nome} 
                        fill
                        sizes="44px"
                        className="object-cover" 
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-zinc-800 truncate">
                        {conversa.nome}
                      </span>
                      {conversa.verificado && (
                        <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.2l-3.5-3.5L4 14.1l5 5 12-12-1.4-1.4z"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400">{conversa.status}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-[10px] text-zinc-400">00:31:00</span>
                    {conversa.badge && (
                      <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {conversa.badge}
                      </span>
                    )}
                    {conversa.icone === "play" && (
                      <svg className="w-3.5 h-3.5 text-blue-500 fill-current" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 flex flex-col bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-200 shrink-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-300 shrink-0">
              <Image src="/chat/1chatM.jpg" alt="Suporte ADMIN" fill sizes="40px" className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-zinc-800">
                Suporte ADMIN
              </span>
              <span className="text-xs text-zinc-400">#CU6798H</span>
            </div>

            <div className="ml-auto flex items-center gap-5 text-blue-500">
              <button aria-label="Ligar" className="hover:opacity-80 transition-opacity">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.27c1.12.42 2.33.64 3.58.64a1 1 0 011 1v3.5a1 1 0 01-1 1C9.39 22 2 14.61 2 5.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.25.22 2.45.64 3.57a1.003 1.003 0 01-.27 1.11l-2.25 2.24z"/>
                </svg>
              </button>
              <button aria-label="Chamada de vídeo" className="hover:opacity-80 transition-opacity">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
              </button>
              <button aria-label="Informações" className="hover:opacity-80 transition-opacity">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
            {mensagens.map((mensagem) => (
              <div
                key={mensagem.id}
                className={`flex gap-3 items-end ${
                  mensagem.proprio ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-300 shrink-0">
                  <Image 
                    src={mensagem.proprio ? "/chat/6chatH.jpg" : "/chat/1chatM.jpg"} 
                    alt="Avatar" 
                    fill
                    sizes="36px"
                    className="object-cover" 
                  />
                </div>

                <div
                  className={`flex flex-col gap-1 max-w-[65%] ${
                    mensagem.proprio ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      mensagem.proprio
                        ? "bg-blue-500 text-white rounded-br-sm"
                        : "bg-blue-50/80 text-zinc-700 rounded-bl-sm"
                    }`}
                  >
                    {mensagem.texto}
                  </div>
                  <span className="text-[10px] text-zinc-400 px-1">{mensagem.hora}</span>
                </div>
              </div>
            ))}

            <div className="flex items-end gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-300 shrink-0">
                <Image src="/chat/1chatM.jpg" alt="Suporte" fill sizes="36px" className="object-cover" />
              </div>
              <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-blue-50/80 text-zinc-400 text-sm rounded-bl-sm">
                <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0.4s" }}></span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-zinc-200 shrink-0 bg-white">
            <div className="flex items-center pl-3 pr-1 py-1 rounded-full border border-zinc-200 bg-white shadow-sm">
              <button aria-label="Anexar ficheiro" className="text-zinc-400 hover:text-blue-500 transition-colors shrink-0 p-1">
                <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input
                type="text"
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite a mensagem..."
                className="flex-1 text-sm px-3 py-2.5 focus:outline-none bg-transparent text-zinc-700 placeholder-zinc-400"
              />
              <button
                onClick={handleEnviar}
                aria-label="Enviar mensagem"
                className="w-10 h-10 rounded-2xl bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white shrink-0 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>

      <div className="w-full min-w-[1024px]">
        <Footer />
      </div>
    </div>
  );
}