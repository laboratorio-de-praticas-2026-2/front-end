'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function maskDocument(doc: string) {
  const clean = doc.replace(/\D/g, '');
  if (clean.length === 11) {
    return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (clean.length === 14) {
    return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  return doc;
}

export default function MinhaContaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; type: 'PF' | 'PJ'; document: string } | null>(null);

  // Função para carregar os dados (permite alternar entre sucesso e erro para testes)
  const loadUserData = (simulateError = false) => {
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (simulateError) {
        setError(true);
        setLoading(false);
        return;
      }

      setUser({
        name: 'Empresa Exemplo LTDA',
        email: 'contato@exemplo.com',
        type: 'PJ', // Mude para 'PF' se quiser testar Pessoa Física
        document: '12345678000199', // Se for PF, use 11 dígitos ex: '12345678909'
      });
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      router.push('/login');
      return;
    }

    loadUserData(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center text-gray-600 font-medium">A carregar dados do utilizador...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Erro de Carregamento</h2>
          <p className="text-gray-600 mb-6">Não foi possível carregar os dados da sua conta no momento.</p>
          <button
            onClick={() => loadUserData(false)}
            className="w-full bg-[#072d42] hover:bg-[#051f2e] text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow rounded-lg mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#072d42]">Minha Conta</h1>
        
        {/* Identificação Visual do Tipo de Usuário (PF / PJ) */}
        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
          user?.type === 'PJ' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
        }`}>
          {user?.type === 'PJ' ? '🏢 Pessoa Jurídica (PJ)' : '👤 Pessoa Física (PF)'}
        </span>
      </div>
      
      <div className="space-y-3 mb-6 text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-100">
        <p><strong>Nome:</strong> {user?.name}</p>
        <p><strong>E-mail:</strong> {user?.email}</p>
        <p><strong>Documento ({user?.type}):</strong> {user?.document ? maskDocument(user.document) : ''}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Logout
        </button>

        {/* Botão de utilidade para testar a tela de erro */}
        <button
          onClick={() => loadUserData(true)}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Simular Erro de Rede
        </button>
      </div>
    </div>
  );
}