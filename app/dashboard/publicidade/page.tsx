'use client';

import React from 'react';
import { Plus, Megaphone } from 'lucide-react';

export default function PublicidadePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Anúncios & Publicidade</h2>
          <p className="text-sm text-gray-500">Gerencie campanhas promocionais e banners laterais.</p>
        </div>
        <button className="flex items-center space-x-2 bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow">
          <Plus className="w-4 h-4" />
          <span>Criar Anúncio</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
        <Megaphone className="w-8 h-8 text-[#0088cc]" />
        <div>
          <h3 className="text-lg font-bold text-gray-900">Campanha de Abertura Grátis de MEI</h3>
          <p className="text-sm text-gray-500">Exibição: Barra superior da Home | Status: Ativa</p>
        </div>
      </div>
    </div>
  );
}