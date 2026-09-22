'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#0d476d] text-white">
      {}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start relative">
          
          {}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="inline-block">
              {}
              <Image
                src="/logo.svg"
                alt="Portal Contábil - Grupo Bortone"
                width={180}
                height={50}
                className="brightness-0 invert object-contain"
              />
            </Link>
            <p className="text-slate-200 text-sm leading-snug max-w-xs pt-1">
              Soluções contábeis para facilitar a gestão da sua empresa
            </p>
            <div className="flex items-center gap-4 pt-2">
              {}
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Website">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </a>
              {}
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {}
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {}
          <div className="relative md:border-l md:border-sky-700/60 md:pl-8 flex flex-col space-y-3">
            <h3 className="text-base font-semibold border-b-2 border-sky-400 inline-block w-max pb-0.5 mb-1">
              Links rápidos
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              <li><Link href="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre nós</Link></li>
              <li><Link href="/servicos" className="hover:text-white transition-colors">Serviços</Link></li>
              <li><Link href="/solucoes" className="hover:text-white transition-colors">Soluções</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {}
          <div className="relative md:border-l md:border-sky-700/60 md:pl-8 flex flex-col space-y-3">
            <h3 className="text-base font-semibold border-b-2 border-sky-400 inline-block w-max pb-0.5 mb-1">
              Atendimento
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              <li><Link href="/duvidas" className="hover:text-white transition-colors">Dúvidas</Link></li>
              <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              <li><Link href="/suporte" className="hover:text-white transition-colors">Suporte</Link></li>
            </ul>
          </div>

          {}
          <div className="relative md:border-l md:border-sky-700/60 md:pl-8 flex flex-col space-y-3">
            <h3 className="text-base font-semibold mb-1">
              Fale conosco
            </h3>
            <div className="space-y-3 text-xs text-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-sky-400/80 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>(11) 0000-0000</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-sky-400/80 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>contato@portalcontabil.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-sky-400/80 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>São Paulo - SP</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {}
      <div className="w-full bg-[#0a3755] py-4 border-t border-sky-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-slate-300 gap-2">
          <p>@ 2026 Portal Contábil. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2 text-slate-200 font-medium">
            <span>Organização</span>
            <span>•</span>
            <span>Confiança</span>
            <span>•</span>
            <span>Crescimento</span>
          </div>
        </div>
      </div>
    </footer>
  );
}