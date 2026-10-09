'use client';

import React from 'react';
import { Plus, Image as ImageIcon } from 'lucide-react';

export default function CarrosselPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Banners do Carrossel</h2>
          <p className="text-sm text-gray-500">Configure as imagens em destaque da página inicial.</p>
        </div>
        <button className="flex items-center space-x-2 bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow">
          <Plus className="w-4 h-4" />
          <span>Adicionar Banner</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
            <ImageIcon className="w-10 h-10 text-gray-400" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-800">Banner Principal - Declaração IR</span>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded font-medium">Ativo</span>
          </div>
        </div>
      </div>
    </div>
  );
}