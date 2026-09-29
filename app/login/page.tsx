'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !senha.trim()) {
      setHasError(true);
      return;
    }

    setHasError(false);
    console.log('Tentativa de login:', { email, senha });
    router.push('/');
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

          <div className="w-full bg-[#F8FAFC] rounded-2xl p-8 sm:p-10 shadow-2xl text-gray-800">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#0C4A6E] mb-1.5">
                Login
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed max-w-[240px] mx-auto">
                Acesse sua conta para continuar com nossos serviços.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (hasError) setHasError(false);
                  }}
                  placeholder="Digite seu e-mail..."
                  className={`w-full h-10 px-3.5 border rounded-lg text-xs focus:outline-none transition-all placeholder:text-gray-300 bg-white ${
                    hasError
                      ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-2 focus:ring-[#0C4A6E] focus:border-transparent'
                  }`}
                />
                {hasError && (
                  <p className="text-[10px] text-red-500 mt-1 font-medium flex items-center gap-1">
                    <span>●</span> E-mail ou senha incorretos. Verifique e tente novamente.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    if (hasError) setHasError(false);
                  }}
                  placeholder="Digite sua senha..."
                  className={`w-full h-10 px-3.5 border rounded-lg text-xs focus:outline-none transition-all placeholder:text-gray-300 bg-white ${
                    hasError
                      ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-2 focus:ring-[#0C4A6E] focus:border-transparent'
                  }`}
                />
                {hasError && (
                  <p className="text-[10px] text-red-500 mt-1 font-medium flex items-center gap-1">
                    <span>●</span> E-mail ou senha incorretos. Verifique e tente novamente.
                  </p>
                )}
              </div>

              <div className="text-center pt-1">
                <Link
                  href="/recuperar-senha"
                  className="text-xs text-[#0284C7] hover:underline font-medium"
                >
                  Esqueci minha senha
                </Link>
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-gradient-to-r from-[#0C4A6E] via-[#0284C7] to-[#0284C7] hover:opacity-95 text-white font-semibold rounded-lg text-xs shadow-md transition-all mt-2 cursor-pointer"
              >
                Entrar
              </button>

              <div className="text-center pt-4 space-y-2">
                <p className="text-xs text-[#0284C7] font-medium cursor-pointer hover:underline">
                  Já tenho uma conta
                </p>
                <p className="text-xs text-gray-500">
                  Não tem conta?{' '}
                  <Link
                    href="/cadastro"
                    className="text-[#0284C7] font-semibold hover:underline"
                  >
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </form>
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