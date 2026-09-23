'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulando perfis diferentes com base no e-mail digitado
    if (email.includes('admin')) {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard');
    } else {
      localStorage.setItem('userRole', 'client');
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/minha-conta');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-[#072d42] text-center">Tela de Login (Simulada)</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail (digite "admin@" para testar o painel)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex: cliente@email.com ou admin@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#072d42]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D96B00] hover:bg-[#b85b00] text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}