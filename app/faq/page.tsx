'use client';

import React, { useState } from 'react';
import { faqCategories } from './faqData';

function FaqBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-full shadow-md border border-gray-100">
      <div className="flex items-center justify-center bg-[#00BFA5] w-6 h-6 rounded-full">
        <span className="text-white font-bold text-sm leading-none">?</span>
      </div>
      <span className="text-[#00BFA5] font-semibold text-xs tracking-wide">FAQ</span>
    </div>
  );
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>("servicos");
  
  // Define o ID do primeiro item como aberto por padrão (atende o checklist)
  const [openId, setOpenId] = useState<number | null>(1);

  const currentCategoryData = faqCategories.find(cat => cat.id === activeCategory) || faqCategories[0];

  const toggleAccordion = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Ao trocar a categoria, descobre o ID do primeiro item da nova categoria e abre ele por padrão
    const selected = faqCategories.find(cat => cat.id === categoryId);
    if (selected && selected.items.length > 0) {
      setOpenId(selected.items[0].id);
    } else {
      setOpenId(null);
    }
  };

  return (
    <div className="w-full bg-gray-50/50 min-h-screen pb-16">
      <div className="relative w-full text-white py-12 md:py-16 px-4 overflow-hidden bg-[#0C4A6E]/60 flex flex-col items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none"
          style={{ backgroundImage: `url('/bg-faq.svg')` }}
        />
        
        <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto text-center">
          <div className="mb-4">
            <FaqBadge />
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide mb-3">
            PERGUNTAS FREQUENTES
          </h1>

          <p className="text-gray-200 text-xs md:text-base max-w-2xl mx-auto px-2">
            Encontre respostas para as principais dúvidas sobre nossos serviços, atendimento e soluções contábeis.
          </p>

          <a href="#ajuda" className="inline-block mt-4 text-xs text-sky-300 hover:underline">
            Precisa de ajuda?
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Menu de Categorias (Responsivo: em telas menores vira rolagem horizontal ou lista empilhada) */}
        <aside className="md:col-span-4 space-y-2">
          {faqCategories.map(category => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
                className={`w-full text-left p-3.5 md:p-4 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 border border-sky-100 shadow-sm'
                    : 'bg-white md:bg-transparent hover:bg-gray-100 border border-gray-100 md:border-none'
                }`}
              >
                <div>
                  <h3 className={`font-semibold text-sm ${isActive ? 'text-sky-700' : 'text-gray-800'}`}>
                    {category.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">{category.description}</p>
                </div>
                <span className={`text-lg font-bold ${isActive ? 'text-sky-600' : 'text-gray-400'}`}>
                  ›
                </span>
              </button>
            );
          })}
        </aside>

        {/* Acordeão com perguntas e respostas */}
        <main className="md:col-span-8 space-y-3 md:space-y-4">
          {currentCategoryData.items.map(item => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="border border-gray-200/80 rounded-lg bg-white shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex justify-between items-center p-4 md:p-5 text-left font-medium text-gray-800 hover:bg-gray-50 focus:outline-none cursor-pointer"
                >
                  <span className="text-sm md:text-base font-semibold pr-2">{item.question}</span>
                  <span className="text-sky-600 font-bold text-xl ml-2 shrink-0 select-none">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="p-4 md:p-5 pt-0 text-gray-600 text-xs md:text-sm border-t border-gray-100">
                    <p className="mt-3 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}