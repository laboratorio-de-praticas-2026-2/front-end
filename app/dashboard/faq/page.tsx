'use client';

import React from 'react';
import { Plus, HelpCircle } from 'lucide-react';

const faqs = [
  { id: 1, pergunta: 'Quais documentos preciso para declaração do IR?', categoria: 'Pessoa Física' },
  { id: 2, pergunta: 'Como emitir nota fiscal de prestação de serviços?', categoria: 'Pessoa Jurídica' },
];

export default function FaqPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Perguntas Frequentes (FAQ)</h2>
          <p className="text-sm text-gray-500">Cadastre respostas para as dúvidas frequentes dos clientes.</p>
        </div>
        <button className="flex items-center space-x-2 bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow">
          <Plus className="w-4 h-4" />
          <span>Nova Pergunta</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
            <div className="flex items-start space-x-3">
              <HelpCircle className="w-5 h-5 text-[#0088cc] mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">{faq.pergunta}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">
                  {faq.categoria}
                </span>
              </div>
            </div>
            <button className="text-sm text-[#0088cc] hover:underline font-medium">Editar</button>
          </div>
        ))}
      </div>
    </div>
  );
}