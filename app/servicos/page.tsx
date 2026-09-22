import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import ChatWidget from '../components/ChatWidget';

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col justify-between">
      <Header />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full flex-grow">
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0c4a6e] mb-6">Serviços</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-[#f1f5f9] p-6 rounded-lg border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-10 h-10 bg-[#0c4a6e] text-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0c4a6e] mb-2">Obrigações físicas</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consultar e acompanhamento de DAS, DARF, INSS, FGTS e outras obrigações.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="w-8 h-8 bg-[#0c4a6e] text-white rounded-full flex items-center justify-center shadow">
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="group bg-[#f1f5f9] p-6 rounded-lg border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-10 h-10 bg-[#0c4a6e] text-white rounded-lg flex items-center justify-center mb-4 font-bold text-lg">
                  %
                </div>
                <h3 className="font-bold text-[#0c4a6e] mb-2">Imposto de Renda</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Orientações e serviços relacionados ao IRPF e IRPJ.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="w-8 h-8 bg-[#0c4a6e] text-white rounded-full flex items-center justify-center shadow">
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="group bg-[#f1f5f9] p-6 rounded-lg border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-10 h-10 bg-[#0c4a6e] text-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0c4a6e] mb-2">Obrigações físicas</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Solicitação de serviços de forma rápida e organizada.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="w-8 h-8 bg-[#0c4a6e] text-white rounded-full flex items-center justify-center shadow">
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="group bg-[#f1f5f9] p-6 rounded-lg border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-10 h-10 bg-[#0c4a6e] text-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0c4a6e] mb-2">Obrigações físicas</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Agende um atendimento com seu contador responsável.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="w-8 h-8 bg-[#0c4a6e] text-white rounded-full flex items-center justify-center shadow">
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div id="solucoes" className="mb-12 scroll-mt-28">
          <h2 className="text-2xl font-bold text-[#0c4a6e] mb-6">Soluções</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-[#f1f5f9] p-6 rounded-lg border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-10 h-10 bg-[#0c4a6e] text-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0c4a6e] mb-2">Para Pessoa Físicas</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Organização de obrigações e documento pessoais.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="w-8 h-8 bg-[#0c4a6e] text-white rounded-full flex items-center justify-center shadow">
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="group bg-[#f1f5f9] p-6 rounded-lg border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-10 h-10 bg-[#0c4a6e] text-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0c4a6e] mb-2">Para Empresas</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Apoio na gestão contábil, fiscal e atributária do seu negócio.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="w-8 h-8 bg-[#0c4a6e] text-white rounded-full flex items-center justify-center shadow">
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="group bg-[#f1f5f9] p-6 rounded-lg border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-10 h-10 bg-[#0c4a6e] text-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0c4a6e] mb-2">Gestão Fiscal</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Centralização das principais informações e obrigações.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="w-8 h-8 bg-[#0c4a6e] text-white rounded-full flex items-center justify-center shadow">
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="group bg-[#f1f5f9] p-6 rounded-lg border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-10 h-10 bg-[#0c4a6e] text-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0c4a6e] mb-2">Atendimento Personalizado</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Contato facilitado com o profissional responsável.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="w-8 h-8 bg-[#0c4a6e] text-white rounded-full flex items-center justify-center shadow">
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0b3c5d] text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 my-12 shadow-md">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-semibold max-w-md leading-snug">
              Tudo o que precisa para cuidar da sua contabilidade em um só lugar.
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-200 max-w-lg leading-relaxed">
            O Portal Contábil reúne serviços e soluções para facilitar sua rotina fiscal, contábil e tributária, oferecendo praticidade, organização e acesso rápido às informações.
          </p>
        </div>

      </div>

      <Footer />
      <ChatWidget />
    </main>
  );
}