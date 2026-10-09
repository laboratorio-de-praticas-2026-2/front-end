'use client';

import React from 'react';
import {
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from 'lucide-react';

export default function RelatoriosPage() {
  const metrics = [
    {
      title: 'Total Documentos',
      value: '328',
      change: '10',
      changeLabel: 'Documentos Criados',
      isPositive: true,
    },
    {
      title: 'Documentos Aprovados',
      value: '108',
      change: '06',
      changeLabel: 'Documentos Aprovados',
      isPositive: true,
    },
    {
      title: 'Documentos Rejeitados',
      value: '80',
      change: '02',
      changeLabel: 'Documentos Rejeitados',
      isPositive: false,
    },
    {
      title: 'Pendentes Avaliação',
      value: '140',
      change: '51',
      changeLabel: 'Documentos Pendentes',
      isPositive: true,
    },
  ];

  const tableData = Array(11).fill({
    nome: 'Docs_Faturamento.pdf',
    tamanho: '56MB',
    debitos: 'R$5.600.000',
  });

  return (
    <div className="-m-8 p-8 bg-[#f4f5f7] min-h-screen font-sans text-gray-800">
      {/* Topo / Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200/80 mb-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-gray-900">Olá Ryan</h1>
          <span className="text-gray-400 font-medium text-sm">»</span>
          <span className="text-sm font-medium text-gray-400">19/05/2026</span>
        </div>

        <div className="flex items-center space-x-6">
          <button className="relative text-gray-400 hover:text-gray-600 transition">
            <Bell className="w-5 h-5 fill-gray-300 stroke-gray-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-sky-400 rounded-full border-2 border-[#f4f5f7]" />
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Busque aqui"
              className="w-80 bg-white border-0 rounded-2xl py-2.5 pl-5 pr-10 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-4 top-3.5" />
          </div>
        </div>
      </div>

      {/* Faixa Única de Métricas Superiores */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className={`${idx !== 0 ? 'md:pl-8' : ''} ${
                idx !== metrics.length - 1 ? 'md:pr-8' : ''
              } py-2 md:py-0`}
            >
              <p className="text-xs font-semibold text-gray-900 mb-2">
                {metric.title}
              </p>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-3">
                {metric.value}
              </h3>
              <div className="flex items-center space-x-1.5 text-xs font-medium">
                {metric.isPositive ? (
                  <ArrowUp className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                ) : (
                  <ArrowDown className="w-3.5 h-3.5 text-red-500 stroke-[3]" />
                )}
                <span
                  className={
                    metric.isPositive
                      ? 'text-emerald-500 font-bold'
                      : 'text-red-500 font-bold'
                  }
                >
                  {metric.change}
                </span>
                <span className="text-gray-400">{metric.changeLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Coluna Esquerda */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Assunto Documentos */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Assunto Documentos
                </h3>
                <p className="text-[11px] text-gray-400">
                  Última Atualização: 28/08/2026
                </p>
              </div>
              <button className="p-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition">
                <Filter className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Gráfico Donut de Rosca SVG Perfeitamente Ajustado */}
            <div className="flex justify-center my-6">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  {/* Sombra / fundo suave interno */}
                  <circle
                    cx="50"
                    cy="50"
                    r="34"
                    fill="#f8fafc"
                  />

                  {/* Arco Verde (Administração - 30%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="9"
                    strokeDasharray="68 183"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />

                  {/* Arco Azul (Financeiro - 70%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="9"
                    strokeDasharray="162 89"
                    strokeDashoffset="-78"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Círculo Central com Sombra Interna Suave */}
                <div className="absolute w-28 h-28 rounded-full bg-white shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100/80 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">500</span>
                </div>
              </div>
            </div>

            {/* Legenda do Gráfico */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  <span className="text-gray-400 font-medium">Financeiro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900">350</span>
                  <span className="bg-sky-100 text-sky-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    70%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-gray-400 font-medium">
                    Administração
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900">150</span>
                  <span className="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    30%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Valor Total (Semi-círculo em SVG com Pontas Arredondadas) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Valor Total</h3>
                <p className="text-[11px] text-gray-400">
                  Última Atualização: 26/09/2026
                </p>
              </div>
              <button className="p-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition">
                <Filter className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Gráfico Semi-Círculo SVG */}
            <div className="flex flex-col items-center justify-center pt-2 pb-2">
              <div className="relative w-52 h-28 flex items-end justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 55">
                  {/* Fundo do semi-círculo em cinza claro */}
                  <path
                    d="M 12,50 A 38,38 0 0,1 88,50"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  {/* Arco Amarelo preenchido com pontas bem arredondadas */}
                  <path
                    d="M 12,50 A 38,38 0 0,1 68,17"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute bottom-1 text-center">
                  <span className="text-2xl font-extrabold text-gray-900">
                    R$1.340
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 mt-4 text-center">
                Soma para os débitos dos documentos.
              </p>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Tabela Documentos Criados */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Documentos Criados
                </h3>
                <p className="text-[11px] text-gray-400">
                  Última Modificação: 26/09/2026
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition">
                  <Filter className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tabela de Documentos */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#f9fafb] text-gray-400 border-b border-gray-100 font-medium">
                    <th className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <span>Nome Arquivo</span>
                        <ArrowUpDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <span>Tamanho</span>
                        <ArrowUpDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <span>Débitos Documento</span>
                        <ArrowUpDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <span>Download</span>
                        <ArrowUpDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-gray-100">
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition">
                      <td className="py-3 px-4 font-bold text-gray-900">
                        {row.nome}
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-medium">
                        {row.tamanho}
                      </td>
                      <td className="py-3 px-4 font-bold text-gray-900">
                        {row.debitos}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-[11px] font-medium px-3 py-1 rounded-full transition">
                          Exportar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}