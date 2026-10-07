'use client';

import React from 'react';
import { BarChart3, Users, FileText, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Solicitações Abertas', value: '24', icon: FileText, color: 'text-blue-600' },
    { label: 'Usuários Ativos', value: '1,280', icon: Users, color: 'text-green-600' },
    { label: 'Relatórios Gerados', value: '452', icon: BarChart3, color: 'text-purple-600' },
    { label: 'Taxa de Crescimento', value: '+12.5%', icon: TrendingUp, color: 'text-emerald-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Visão Geral</h1>
        <p className="text-sm text-gray-500">Bem-vindo ao Painel do Administrator do Portal Contábil.</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Área Principal de Conteúdo / Gráficos */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[300px] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Selecione uma opção no menu lateral ou acompanhe os relatórios mais recentes por aqui.</p>
      </div>
    </div>
  );
}