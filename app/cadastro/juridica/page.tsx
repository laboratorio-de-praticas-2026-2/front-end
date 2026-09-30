'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CadastroPessoaJuridicaPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nomeResponsavel: '',
    email: '',
    celular: '',
    cnpj: '',
    senha: '',
    confirmarSenha: '',
  });

  const [hasError, setHasError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (hasError) setHasError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { nomeResponsavel, email, celular, cnpj, senha, confirmarSenha } = formData;

    if (
      !nomeResponsavel.trim() ||
      !email.trim() ||
      !celular.trim() ||
      !cnpj.trim() ||
      !senha.trim() ||
      !confirmarSenha.trim() ||
      senha !== confirmarSenha
    ) {
      setHasError(true);
      return;
    }

    setHasError(false);
    console.log('Cadastro Pessoa Jurídica efetuado:', formData);
    router.push('/login');
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#0C4A6E]">
      <div className="flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 text-white min-h-screen">
        <div className="w-full max-w-md flex flex-col items-center">
          
          {/* Logo */}
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

          {/* Card do Formulário */}
          <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-800 relative">
            
            {/* Seta Voltar */}
            <Link href="/cadastro" className="inline-block text-[#0C4A6E] hover:opacity-80 transition-opacity mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </Link>

            <h2 className="text-sm font-bold text-[#0C4A6E] mb-5 text-center">
              Criar sua conta Pessoa Jurídica
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              
              {/* Seção 1: Dados Pessoais */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#0C4A6E]">Dados Pessoais</h3>

                {/* Nome do Responsável */}
                <div>
                  <input
                    type="text"
                    name="nomeResponsavel"
                    value={formData.nomeResponsavel}
                    onChange={handleChange}
                    placeholder="Nome do Responsável"
                    className={`w-full h-8 px-3 border rounded-md text-[11px] focus:outline-none transition-all placeholder:text-gray-300 bg-white ${
                      hasError
                        ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                        : 'border-gray-300 focus:ring-1 focus:ring-[#0C4A6E]'
                    }`}
                  />
                  {hasError && (
                    <p className="text-[9px] text-red-500 mt-0.5 flex items-center gap-1">
                      <span>●</span> Escreva o nome do responsável.
                    </p>
                  )}
                </div>

                {/* E-mail */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    className={`w-full h-8 px-3 border rounded-md text-[11px] focus:outline-none transition-all placeholder:text-gray-300 bg-white ${
                      hasError
                        ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                        : 'border-gray-300 focus:ring-1 focus:ring-[#0C4A6E]'
                    }`}
                  />
                  {hasError && (
                    <p className="text-[9px] text-red-500 mt-0.5 flex items-center gap-1">
                      <span>●</span> E-mail inválido.
                    </p>
                  )}
                </div>

                {/* Celular */}
                <div>
                  <input
                    type="text"
                    name="celular"
                    value={formData.celular}
                    onChange={handleChange}
                    placeholder="Celular"
                    className={`w-full h-8 px-3 border rounded-md text-[11px] focus:outline-none transition-all placeholder:text-gray-300 bg-white ${
                      hasError
                        ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                        : 'border-gray-300 focus:ring-1 focus:ring-[#0C4A6E]'
                    }`}
                  />
                  {hasError && (
                    <p className="text-[9px] text-red-500 mt-0.5 flex items-center gap-1">
                      <span>●</span> Celular é obrigatório.
                    </p>
                  )}
                </div>

                {/* CNPJ */}
                <div>
                  <input
                    type="text"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleChange}
                    placeholder="CNPJ"
                    className={`w-full h-8 px-3 border rounded-md text-[11px] focus:outline-none transition-all placeholder:text-gray-300 bg-white ${
                      hasError
                        ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                        : 'border-gray-300 focus:ring-1 focus:ring-[#0C4A6E]'
                    }`}
                  />
                  {hasError && (
                    <p className="text-[9px] text-red-500 mt-0.5 flex items-center gap-1">
                      <span>●</span> CNPJ inválido.
                    </p>
                  )}
                </div>
              </div>

              {/* Seção 2: Segurança */}
              <div className="space-y-3 pt-1">
                <h3 className="text-xs font-bold text-[#0C4A6E]">Segurança</h3>

                {/* Senha */}
                <div>
                  <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Senha"
                    className={`w-full h-8 px-3 border rounded-md text-[11px] focus:outline-none transition-all placeholder:text-gray-300 bg-white ${
                      hasError
                        ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                        : 'border-gray-300 focus:ring-1 focus:ring-[#0C4A6E]'
                    }`}
                  />
                  {hasError && (
                    <p className="text-[9px] text-red-500 mt-0.5 flex items-center gap-1">
                      <span>●</span> A senha precisa ter no mínimo 8 caracteres.
                    </p>
                  )}
                </div>

                {/* Confirmar Senha */}
                <div>
                  <input
                    type="password"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    placeholder="Confirmar Senha"
                    className={`w-full h-8 px-3 border rounded-md text-[11px] focus:outline-none transition-all placeholder:text-gray-300 bg-white ${
                      hasError
                        ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                        : 'border-gray-300 focus:ring-1 focus:ring-[#0C4A6E]'
                    }`}
                  />
                  {hasError && (
                    <p className="text-[9px] text-red-500 mt-0.5 flex items-center gap-1">
                      <span>●</span> As senhas não coincidem.
                    </p>
                  )}
                </div>
              </div>

              {/* Botão Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-9 bg-gradient-to-r from-[#0C4A6E] via-[#0284C7] to-[#0284C7] hover:opacity-95 text-white font-semibold rounded-full text-xs shadow-md transition-all cursor-pointer"
                >
                  Criar conta
                </button>
              </div>

              {/* Rodapé do Form */}
              <div className="text-center pt-1">
                <p className="text-[10px] text-gray-500">
                  Já possui uma conta?{' '}
                  <Link
                    href="/login"
                    className="text-[#0284C7] font-semibold hover:underline"
                  >
                    Entrar
                  </Link>
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Imagem Lateral Direita */}
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