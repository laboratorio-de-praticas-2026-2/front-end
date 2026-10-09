'use client';

import React from 'react';
import { Save } from 'lucide-react';

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Configurações do Sistema</h2>
        <p className="text-sm text-gray-500">Ajuste as preferências gerais do portal contábil.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Portal</label>
          <input
            type="text"
            defaultValue="Portal Contábil - Grupo Bortone"
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0088cc] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail de Suporte</label>
          <input
            type="email"
            defaultValue="suporte@grupobortone.com.br"
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0088cc] focus:outline-none"
          />
        </div>

        <button className="flex items-center space-x-2 bg-[#0088cc] hover:bg-[#0077b3] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow">
          <Save className="w-4 h-4" />
          <span>Salvar Alterações</span>
        </button>
      </div>
    </div>
  );
}