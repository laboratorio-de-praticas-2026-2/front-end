'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import logo from './imgs/logo.svg';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, remember });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[520px] bg-[#F9F9F9] border border-gray-200 rounded-[24px] p-8 sm:p-12 shadow-sm relative">

        <div className="flex justify-end mb-6">
          <Link
                href="/register"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 inline-flex items-center gap-1 transition-colors"
>
             Register →
        </Link>
        </div>

        <div className="flex flex-col items-center mb-8">
          <Image
            src={logo} 
            alt="Bortone Logo"
            width={321}
            height={122}
            className="w-56 h-auto object-contain"
            priority
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
          <p className="text-sm text-gray-500">
            Acesse sua conta e acompanhe tudo de forma simples e segura.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemple.com"
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******************"
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6]"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#0077B6] focus:ring-[#0077B6]"
              />
              Lembrar Senha
            </label>
            <Link
              href="/recuperar-senha"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Esqueceu sua senha ?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#0077B6] hover:bg-[#005f92] text-white font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}