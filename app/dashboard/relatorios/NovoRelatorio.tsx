'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface NovoRelatorioProps {
  onVoltar: () => void;
}

export default function NovoRelatorio({ onVoltar }: NovoRelatorioProps) {
  return (
    <div className="flex-grow flex flex-col w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#243B53]">Gerar Relatório</h2>
      </div>

      <div className="flex flex-col space-y-5 flex-grow">
        <div className="border border-[#4ba3e3] rounded-lg py-3 text-center text-[#4ba3e3] text-sm font-medium bg-white">
          Gere novos relatórios sempre que precisar
        </div>

        <input 
          type="text" 
          placeholder="Título Relatório" 
          className="w-full border border-gray-200 rounded-lg p-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-400 bg-white"
        />

        <div className="relative">
          <select className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-500 appearance-none focus:outline-none focus:ring-1 focus:ring-sky-400 bg-white">
            <option value="">Categoria</option>
            <option value="empresarial">Empresarial</option>
            <option value="financeiro">Financeiro</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
        </div>

        <textarea 
          placeholder="Descrição Relatório" 
          rows={6}
          className="w-full border border-gray-200 rounded-lg p-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-400 bg-white resize-none"
        ></textarea>

        {/* Inputs de Data atualizados para type="date" */}
        <div className="flex items-center space-x-4">
          <div className="w-1/2 flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-500 ml-1">Data de Início</label>
            <input 
              type="date" 
              className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-sky-400 bg-white cursor-pointer"
            />
          </div>
          <div className="w-1/2 flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-500 ml-1">Data de Término</label>
            <input 
              type="date" 
              className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-sky-400 bg-white cursor-pointer"
            />
          </div>
        </div>

        {/* Botões de Ação movidos para o fundo do formulário */}
        <div className="flex justify-end space-x-4 mt-8 pt-4">
          <button 
            onClick={onVoltar}
            className="px-8 py-2.5 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button 
            onClick={onVoltar}
            className="px-8 py-2.5 bg-[#0a84c5] hover:bg-[#086a9f] rounded-full text-sm font-medium text-white transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}