'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import logo from '../login/imgs/logo.svg';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    documento: '',
    celular: '',
    email: '',
    senha: '',
    termos: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[520px] bg-[#F9F9F9] border border-gray-200 rounded-[24px] p-8 sm:p-12 shadow-sm relative">

        <div className="flex justify-start mb-6">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 inline-flex items-center gap-1 transition-colors"
          >
            ← Login
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cadastro</h1>
          <p className="text-sm text-gray-500">
            Crie sua conta e tenha acesso às nossas soluções contábeis.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="João Silva"
              className="w-full h-11 px-4 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              CPF ou CNP-J
            </label>
            <input
              type="text"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              placeholder="111.222.333-44"
              className="w-full h-11 px-4 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Celular
            </label>
            <input
              type="text"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              placeholder="(13)XXXXX-XXXX"
              className="w-full h-11 px-4 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@exemple.com"
              className="w-full h-11 px-4 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Senha
            </label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="********************"
              className="w-full h-11 px-4 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6]"
              required
            />
          </div>

          <div className="flex items-center text-sm pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600">
              <input
                type="checkbox"
                name="termos"
                checked={formData.termos}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-[#0077B6] focus:ring-[#0077B6]"
                required
              />
              Termos de Uso
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#0077B6] hover:bg-[#005f92] text-white font-semibold rounded-xl transition-colors shadow-sm cursor-pointer mt-2"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}