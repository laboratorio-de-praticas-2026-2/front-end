'use client';

import React from 'react';
import {
  Bell,
  Search,
  Folder,
  Check,
  X,
  RefreshCw,
  ArrowUpRight,
  SlidersHorizontal,
  ArrowDown,
} from 'lucide-react';

export default function SolicitacoesPage() {
  const solicitacoes = [
    {
      cliente: 'Carla Silva',
      tipo: 'Consulta',
      data: '09/08/2026',
      status: 'Aprovada',
      anexo: 'index.pdf',
    },
    {
      cliente: 'Lucas Almeida',
      tipo: 'Consulta',
      data: '09/08/2026',
      status: 'Pendente',
      anexo: 'index.pdf',
    },
    {
      cliente: 'Carolina Pereira',
      tipo: 'Consulta',
      data: '09/08/2026',
      status: 'Cancelada',
      anexo: 'index.pdf',
    },
    {
      cliente: 'Ryan Mendes',
      tipo: 'Consulta',
      data: '09/08/2026',
      status: 'Aprovada',
      anexo: 'index.pdf',
    },
    {
      cliente: 'Paulo Diaz',
      tipo: 'Consulta',
      data: '09/08/2026',
      status: 'Aprovada',
      anexo: 'index.pdf',
    },
    {
      cliente: 'Matheus Silva',
      tipo: 'Consulta',
      data: '09/08/2026',
      status: 'Aprovada',
      anexo: 'index.pdf',
    },
  ];

  return (
    <div className="-m-8 p-8 bg-[#f4f5f7] min-h-screen font-sans text-gray-800">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-gray-900">Olá Ryan</h1>
          <span className="text-gray-400 font-medium">»</span>
          <span className="text-sm font-medium text-gray-500">19/05/2026</span>
        </div>

        <div className="flex items-center space-x-5">
          <button className="relative text-gray-400 hover:text-gray-600 transition">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-sky-400 rounded-full" />
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Busque aqui"
              className="w-80 bg-white border-0 rounded-xl py-2.5 pl-4 pr-10 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#eab308] text-white flex items-center justify-center shrink-0">
              <Folder className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900 block leading-none mb-1">
                24
              </span>
              <span className="text-xs text-gray-400 font-medium">
                Total Solicitações
              </span>
            </div>
          </div>
          <div className="flex items-center text-emerald-500 text-xs font-semibold self-start">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>10</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900 block leading-none mb-1">
                07
              </span>
              <span className="text-xs text-gray-400 font-medium">
                Total Finalizadas
              </span>
            </div>
          </div>
          <div className="flex items-center text-emerald-500 text-xs font-semibold self-start">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>2</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#dc2626] text-white flex items-center justify-center shrink-0">
              <X className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900 block leading-none mb-1">
                05
              </span>
              <span className="text-xs text-gray-400 font-medium">
                Total Rejeitadas
              </span>
            </div>
          </div>
          <div className="flex items-center text-emerald-500 text-xs font-semibold self-start">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>3</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#0284c7] text-white flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900 block leading-none mb-1">
                12
              </span>
              <span className="text-xs text-gray-400 font-medium">
                Em andamento
              </span>
            </div>
          </div>
          <div className="flex items-center text-emerald-500 text-xs font-semibold self-start">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>10</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-gray-50">
          <div>
            <h2 className="text-base font-bold text-gray-900">Solicitações</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Verifique as solicitações existentes
            </p>
          </div>
          <button className="flex items-center space-x-2 text-xs font-medium text-gray-500 hover:text-gray-700">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtros</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafb] text-[11px] font-semibold text-gray-400 border-b border-gray-100">
                <th className="py-3 px-6">
                  <div className="flex items-center space-x-1">
                    <span>Nome Cliente</span>
                    <ArrowDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="py-3 px-6">
                  <div className="flex items-center space-x-1">
                    <span>Tipo de Serviço</span>
                    <ArrowDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="py-3 px-6">
                  <div className="flex items-center space-x-1">
                    <span>Data Solicitação</span>
                    <ArrowDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="py-3 px-6">
                  <div className="flex items-center space-x-1">
                    <span>Status Solicitação</span>
                    <ArrowDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="py-3 px-6">
                  <div className="flex items-center space-x-1">
                    <span>Anexo Documento</span>
                    <ArrowDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {solicitacoes.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-800">
                    {item.cliente}
                  </td>
                  <td className="py-4 px-6 text-gray-400">{item.tipo}</td>
                  <td className="py-4 px-6 text-gray-400">{item.data}</td>
                  <td className="py-4 px-6 font-semibold">
                    <span
                      className={
                        item.status === 'Aprovada'
                          ? 'text-emerald-500'
                          : item.status === 'Pendente'
                          ? 'text-sky-500'
                          : 'text-red-500'
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <a
                      href="#"
                      className="text-sky-400 hover:underline font-medium"
                    >
                      {item.anexo}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}