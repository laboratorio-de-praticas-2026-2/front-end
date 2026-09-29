'use client';

import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function ContatoPage() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Mensagem enviada:', form);
    alert('Mensagem enviada com sucesso!');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="text-[#38BDF8] font-bold text-lg block mb-1">
              Fale conosco
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0C4A6E] mb-3 tracking-tight">
              Entre em contato
            </h1>
            <p className="text-[#1E293B] text-sm sm:text-base max-w-2xl leading-relaxed font-medium">
              Estamos prontos para te atender! Tire suas dúvidas, solicite um orçamento ou fale com a nossa equipe. Será um prazer ajudar!.
            </p>
          </div>
          <div className="bg-[#0E4A6F] rounded-xl p-6 sm:p-8 shadow-md text-white">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-normal text-blue-100 mb-1.5">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Digite seu nome"
                    className="w-full h-10 px-3 bg-white text-gray-800 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-normal text-blue-100 mb-1.5">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Digite seu E-mail"
                    className="w-full h-10 px-3 bg-white text-gray-800 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-normal text-blue-100 mb-1.5">
                    Telefone
                  </label>
                  <input
                    type="text"
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="(00) 0000-000"
                    className="w-full h-10 px-3 bg-white text-gray-800 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-normal text-blue-100 mb-1.5">
                    Assunto
                  </label>
                  <input
                    type="text"
                    name="assunto"
                    value={form.assunto}
                    onChange={handleChange}
                    placeholder="Selecione o assunto"
                    className="w-full h-10 px-3 bg-white text-gray-800 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-normal text-blue-100 mb-1.5">
                  Mensagem
                </label>
                <textarea
                  name="mensagem"
                  rows={4}
                  value={form.mensagem}
                  onChange={handleChange}
                  placeholder="Digite sua mensagem aqui"
                  className="w-full p-3 bg-white text-gray-800 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-white hover:bg-gray-100 text-[#0E4A6F] font-semibold px-5 py-2 rounded-full text-xs sm:text-sm transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <svg
                    className="w-4 h-4 fill-current -rotate-45"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                  Enviar mensagem
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}