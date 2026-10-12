'use client';

import React, { useState } from 'react';
import {
  Bell,
  Search,
  DollarSign,
  FileSpreadsheet,
  TrendingUp,
  Receipt,
  AlertCircle,
  Building,
  ClipboardList,
  PieChart,
} from 'lucide-react';


export default function InicioPage() {

  return (
    <div className="-m-8 p-8 bg-[#f8f9fb] min-h-screen flex flex-col font-sans text-gray-800 relative">
      {/* Topo / Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-purple-100 mb-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-gray-900">Olá Ana Flávia</h1>
          <span className="text-gray-400 font-medium text-sm">»</span>
          <span className="text-sm font-medium text-gray-400">
              {new Date().toLocaleDateString('pt-BR')}
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <button className="relative text-gray-400 hover:text-gray-600 transition">
            <Bell className="w-6 h-6 fill-gray-300 stroke-gray-400 hover:fill-gray-400 transition" />
            <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#f4f5f7]">
              {3}
            </span>
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Busque aqui"
              className="w-80 bg-white border border-gray-100 rounded-full py-2 pl-4 pr-10 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-4 top-2.5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        
        {/* ================= COLUNA ESQUERDA ================= */}
        <div className="xl:col-span-9 space-y-8">
          
          {/* Card Principal: Impostos a Vencer */}
          <div className="border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
            
            <div className="flex items-center space-x-3 mb-2">
              <DollarSign className="w-6 h-6 text-[#022b49]" />
              <h2 className="text-xl font-bold text-gray-900">Impostos a Vencer</h2>
            </div>
            <p className="text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
              Guias já disponíveis para pagamento:
            </p>

            {/* Seção 1: Simples Nacional */}
            <div className="mb-8">
              <h3 className="font-extrabold text-gray-900 mb-4 text-lg">Simples Nacional (DAS)</h3>
              <div className="bg-[#f8fafc] rounded-xl p-5 flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-1">Competência 09/2026</p>
                  <p className="text-xs text-gray-500">
                    Vencimento <span className="text-[#1a85c2] font-semibold ml-1">20/10/2026</span>
                  </p>
                </div>
                <div className="mt-3 sm:mt-0 text-left sm:text-right">
                  <p className="text-lg font-bold text-[#022b49]">R$ 4.580,25</p>
                </div>
              </div>
            </div>

            {/* Seção 2: Encargos Trabalhistas */}
            <div className="mb-8">
              <h3 className="font-extrabold text-gray-900 mb-4 text-lg">Encargos Trabalhistas</h3>
              
              <div className="bg-[#f8fafc] rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                
                {/* INSS */}
                <div className="pt-4 sm:pt-0 sm:pr-6 first:pt-0">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-bold text-gray-800">Guia INSS</p>
                    <p className="text-lg font-bold text-[#022b49]">R$ 1.250,00</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Vencimento <span className="text-[#1a85c2] font-semibold ml-1">20/10/2026</span>
                  </p>
                </div>

                {/* FGTS */}
                <div className="pt-4 sm:pt-0 sm:pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-bold text-gray-800">Guia FGTS</p>
                    <p className="text-lg font-bold text-[#022b49]">R$ 890,50</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Vencimento <span className="text-[#1a85c2] font-semibold ml-1">07/10/2026</span>
                  </p>
                </div>

              </div>
            </div>

            {/* Totalizador Footer */}
            <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row md:items-end justify-between">
              <div className="space-y-3 mb-6 md:mb-0 w-full md:w-auto">
                <div className="flex justify-between w-full md:w-80 text-sm">
                  <span className="text-gray-600 font-medium">Simples Nacional:</span>
                  <span className="font-bold text-[#022b49]">R$ 4.580,25</span>
                </div>
                <div className="flex justify-between w-full md:w-80 text-sm">
                  <span className="text-gray-600 font-medium">Encargos (INSS + FGTS):</span>
                  <span className="font-bold text-[#022b49]">R$ 2.140,50</span>
                </div>
                <div className="flex justify-between w-full md:w-80 text-lg mt-2 pt-2">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-extrabold text-[#022b49]">R$ 6.720,75</span>
                </div>
              </div>
              
              <button className="bg-[#1a85c2] hover:bg-[#156e9f] text-white px-8 py-3 rounded-lg text-sm font-semibold transition shadow-md w-full md:w-auto">
                Ir para pagamento
              </button>
            </div>
          </div>

          {/* Serviços Recomendados */}
          <div className="pt-4 w-full">
            <h2 className="text-xl font-bold text-[#022b49] mb-6">Serviços recomendados para você:</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm bg-white hover:border-sky-300 transition">
                <div>
                  <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
                    <FileSpreadsheet className="w-5 h-5 text-[#1a85c2]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#022b49] mb-2">Emissão de Notas</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Emita suas notas fiscais de serviço de forma simplificada.</p>
                </div>
                <a href="#" className="text-xs text-[#1a85c2] font-semibold mt-6 inline-block">Veja mais</a>
              </div>

              <div className="border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm bg-white hover:border-sky-300 transition">
                <div>
                  <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-5 h-5 text-[#1a85c2]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#022b49] mb-2">Relatório DRE</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Acompanhe os resultados e o lucro real da sua empresa.</p>
                </div>
                <a href="#" className="text-xs text-[#1a85c2] font-semibold mt-6 inline-block">Veja mais</a>
              </div>

              <div className="border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm bg-white hover:border-sky-300 transition">
                <div>
                  <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
                    <Receipt className="w-5 h-5 text-[#1a85c2]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#022b49] mb-2">Certidões</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Retire suas CNDs federais, estaduais e municipais.</p>
                </div>
                <a href="#" className="text-xs text-[#1a85c2] font-semibold mt-6 inline-block">Veja mais</a>
              </div>

              <div className="border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm bg-white hover:border-sky-300 transition">
                <div>
                  <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
                    <AlertCircle className="w-5 h-5 text-[#1a85c2]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#022b49] mb-2">Alerta Pendências</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Saiba quando houver irregularidade no CNPJ.</p>
                </div>
                <a href="#" className="text-xs text-[#1a85c2] font-semibold mt-6 inline-block">Veja mais</a>
              </div>
            </div>
          </div>

        </div>

        {/* ================= COLUNA DIREITA ================= */}
        <div className="xl:col-span-3 space-y-4">
          
          {/* Card da Empresa */}
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
              <Building className="w-5 h-5 text-[#022b49]" />
              <h2 className="text-lg font-bold text-gray-900">Minha Empresa</h2>
            </div>
            
            <div className="mb-6">
              <p className="text-xs font-bold text-[#022b49]">12.345.678/0001-90</p>
              <p className="text-sm font-extrabold text-gray-900 mt-1">Empresa Exemplo S/A</p>
              <p className="text-xs text-gray-500 mt-1">Lucro Presumido</p>
              <a href="#" className="text-xs text-[#1a85c2] font-semibold mt-2 inline-block hover:underline">Trocar empresa</a>
            </div>

            <div className="bg-[#022b49] text-white rounded-lg p-3.5 text-center cursor-pointer shadow-md mb-6 hover:bg-[#031d33] transition">
              <p className="text-sm font-bold">Situação Cadastral: Regular</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-[11px] border-b border-gray-100 pb-2">
                <span className="text-gray-500 font-medium">Última declaração:</span>
                <span className="font-semibold text-gray-900">15/09/2026 - 14:30</span>
              </div>
              <div className="flex justify-between items-center text-[11px] border-b border-gray-100 pb-2">
                <span className="text-gray-500 font-medium">Próximo fechamento:</span>
                <span className="font-semibold text-gray-900">Out/2026</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-gray-500 font-medium">Certificado Digital:</span>
                <span className="font-semibold text-gray-900">Dez/2026</span>
              </div>
            </div>
          </div>

          {/* Atalhos Rápidos */}
          <a href="#" className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between hover:bg-gray-50 transition shadow-sm bg-white group">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center group-hover:bg-sky-100 transition">
                <ClipboardList className="w-5 h-5 text-[#1a85c2]" />
              </div>
              <span className="text-sm font-extrabold text-[#022b49]">Obrigações Acessórias</span>
            </div>
            <span className="text-[11px] text-[#1a85c2] font-semibold group-hover:underline">Veja mais</span>
          </a>

          <a href="#" className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between hover:bg-gray-50 transition shadow-sm bg-white group">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center group-hover:bg-sky-100 transition">
                <PieChart className="w-5 h-5 text-[#1a85c2]" />
              </div>
              <span className="text-sm font-extrabold text-[#022b49]">Painel Financeiro</span>
            </div>
            <span className="text-[11px] text-[#1a85c2] font-semibold group-hover:underline">Veja mais</span>
          </a>

        </div>

      </div>
    </div >
  );
}