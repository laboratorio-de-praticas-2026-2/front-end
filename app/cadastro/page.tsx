'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CadastroPage() {
  const router = useRouter();
  const [tipoConta, setTipoConta] = useState<'fisica' | 'juridica' | null>(null);

  const handleSelectTipo = (tipo: 'fisica' | 'juridica') => {
    setTipoConta(tipo);
    router.push(`/cadastro/${tipo}`);
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#0C4A6E]">
      <div className="flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 text-white min-h-screen">
        <div className="w-full max-w-md flex flex-col items-center">
          
          <div className="mb-6 text-center flex justify-center w-full">
            <Link href="/" className="inline-block">
              <Image
                src="/images/login/logo1.svg"
                alt="Logo Portal Contábil - Grupo Bortone"
                width={260}
                height={90}
                priority
                className="h-auto w-auto max-w-[220px] sm:max-w-[250px] object-contain drop-shadow-none bg-transparent"
              />
            </Link>
          </div>

          <div className="w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl text-gray-800">
            <div className="text-left mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C4A6E] mb-3 tracking-tight">
                Criar sua conta
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-normal">
                Selecione o tipo de cadastro que deseja realizar
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              
              <div 
                onClick={() => setTipoConta('fisica')}
                className={`border border-[#0C4A6E]/40 rounded-2xl p-6 text-center flex flex-col items-center justify-between transition-all cursor-pointer bg-white hover:border-[#0284C7] hover:shadow-md ${
                  tipoConta === 'fisica' ? 'ring-2 ring-[#0284C7] border-transparent' : ''
                }`}
              >
                <div className="flex flex-col items-center w-full">
                  <div className="my-3 text-[#0C4A6E]">
                    <svg className="w-14 h-14 fill-current" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-[#0C4A6E] mb-2">
                    Pessoa Física
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-6 min-h-[32px] px-1">
                    Cadastro pessoal para acesso aos nossos serviços.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectTipo('fisica');
                  }}
                  className="w-full h-10 bg-gradient-to-b from-[#095788] via-[#0284C7] to-[#0284C7] hover:brightness-105 active:scale-[0.99] text-white font-medium rounded-xl text-xs shadow-sm transition-all cursor-pointer border border-[#0A4C75]"
                >
                  Continuar
                </button>
              </div>

              <div 
                onClick={() => setTipoConta('juridica')}
                className={`border border-[#0C4A6E]/40 rounded-2xl p-6 text-center flex flex-col items-center justify-between transition-all cursor-pointer bg-white hover:border-[#0284C7] hover:shadow-md ${
                  tipoConta === 'juridica' ? 'ring-2 ring-[#0284C7] border-transparent' : ''
                }`}
              >
                <div className="flex flex-col items-center w-full">
                  <div className="my-3 text-[#0C4A6E]">
                    <svg className="w-14 h-14 fill-current" viewBox="0 0 24 24">
                      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                    </svg>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-[#0C4A6E] mb-2">
                    Pessoa Jurídica
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-6 min-h-[32px] px-1">
                    Cadastro empresarial para acesso aos nossos serviços.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectTipo('juridica');
                  }}
                  className="w-full h-10 bg-gradient-to-b from-[#095788] via-[#0284C7] to-[#0284C7] hover:brightness-105 active:scale-[0.99] text-white font-medium rounded-xl text-xs shadow-sm transition-all cursor-pointer border border-[#0A4C75]"
                >
                  Continuar
                </button>
              </div>

            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#0284C7] hover:underline font-medium transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                Volta para o login
              </Link>
            </div>
          </div>

        </div>
      </div>

      <div className="hidden lg:block relative min-h-screen">
        <Image
          src="/images/login/img-login.svg"
          alt="Profissional Portal Contábil"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C4A6E] via-transparent to-transparent opacity-85 pointer-events-none" />
      </div>
    </div>
  );
}