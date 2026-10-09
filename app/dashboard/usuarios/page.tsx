'use client';

import React, { useState } from 'react';
import {
  Bell,
  Search,
  User,
  UserX,
  UserPlus,
  UserMinus,
  Calendar,
  ChevronDown,
} from 'lucide-react';

export default function UsuariosPage() {
  const [activeTab, setActiveTab] = useState('Todos');

  const stats = [
    {
      title: 'Total Usuários',
      count: '100',
      icon: User,
      bgColor: 'bg-sky-400',
    },
    {
      title: 'Usuários Deletados',
      count: '30',
      icon: UserX,
      bgColor: 'bg-red-500',
    },
    {
      title: 'Novos Usuários',
      count: '17',
      icon: UserPlus,
      bgColor: 'bg-emerald-500',
    },
    {
      title: 'Usuários Inativos',
      count: '53',
      icon: UserMinus,
      bgColor: 'bg-amber-400',
    },
  ];

  const users = [
    {
      name: 'Lucas Barros',
      email: 'lucasb@email.com',
      tipo: 'Cliente',
      empresa: 'BankFinance',
      valorAtraso: 'R$200,00',
      criado: '21.03.2021',
      editado: '14.07.2021',
    },
    {
      name: 'Amanda Oliveira',
      email: 'amandao@email.com',
      tipo: 'Cliente',
      empresa: 'BankFinance',
      valorAtraso: 'R$200,00',
      criado: '21.03.2021',
      editado: '14.07.2021',
    },
    {
      name: 'Victoria Silva',
      email: 'vick123@email.com',
      tipo: 'Cliente',
      empresa: 'BankFinance',
      valorAtraso: 'R$200,00',
      criado: '21.03.2021',
      editado: '14.07.2021',
    },
    {
      name: 'Thais Silveira',
      email: 'thaiss@email.com',
      tipo: 'Cliente',
      empresa: 'BankFinance',
      valorAtraso: 'R$200,00',
      criado: '21.03.2021',
      editado: '14.07.2021',
    },
    {
      name: 'Renata Junior',
      email: 'renatajj@email.com',
      tipo: 'Cliente',
      empresa: 'BankFinance',
      valorAtraso: 'R$200,00',
      criado: '21.03.2021',
      editado: '14.07.2021',
    },
    {
      name: 'Lucas Oliveira',
      email: 'lucasoliv@email.com',
      tipo: 'Cliente',
      empresa: 'BankFinance',
      valorAtraso: 'R$200,00',
      criado: '21.03.2021',
      editado: '14.07.2021',
    },
    {
      name: 'Bruno Silva',
      email: 'brunoss@email.com',
      tipo: 'Cliente',
      empresa: 'BankFinance',
      valorAtraso: 'R$200,00',
      criado: '21.03.2021',
      editado: '14.07.2021',
    },
    {
      name: 'Junior Roberto',
      email: 'juniorrobert@email.com',
      tipo: 'Cliente',
      empresa: 'BankFinance',
      valorAtraso: 'R$200,00',
      criado: '21.03.2021',
      editado: '14.07.2021',
    },
    {
      name: 'Carlos Costa',
      email: 'carloscc@email.com',
      tipo: 'Cliente',
      empresa: 'BankFinance',
      valorAtraso: 'R$200,00',
      criado: '21.03.2021',
      editado: '14.07.2021',
    },
  ];

  return (
    <div className="-m-8 p-8 bg-[#f4f5f7] min-h-screen font-sans text-gray-700">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-gray-900">Olá Ryan</h1>
          <span className="text-gray-400 font-medium">»</span>
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

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-44"
            >
              <div
                className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center text-white shadow-sm`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <span className="text-3xl font-extrabold text-gray-900 block mb-1">
                  {stat.count}
                </span>
                <span className="text-sm font-medium text-gray-400">
                  {stat.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controles de Filtro e Tabela */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          {/* Abas de Navegação */}
          <div className="inline-flex bg-white rounded-lg p-1 border border-gray-200 text-xs font-medium text-gray-500">
            {['Todos', 'Deletados', 'Recentes', 'Inativos'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md transition ${
                  activeTab === tab
                    ? 'bg-sky-200/60 text-sky-700 font-semibold'
                    : 'hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Selector de Categoria */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-1.5 pr-8 text-xs font-medium text-gray-500 focus:outline-none cursor-pointer">
              <option>Todos</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Filtro de Data */}
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 space-x-2 text-xs font-medium text-gray-500">
            <span>Criado</span>
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
          </div>

          {/* Ícone de Busca */}
          <button className="text-gray-400 hover:text-gray-600 transition">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Tabela de Usuários */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-800 font-bold">
                <th className="py-3.5 px-5">Name</th>
                <th className="py-3.5 px-5">Email</th>
                <th className="py-3.5 px-5">Tipo</th>
                <th className="py-3.5 px-5">Empresa</th>
                <th className="py-3.5 px-5">Valor Atraso</th>
                <th className="py-3.5 px-5 bg-sky-100/50 text-sky-800">
                  Criado
                </th>
                <th className="py-3.5 px-5">Editado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-400 font-medium">
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition">
                  <td className="py-3.5 px-5">{u.name}</td>
                  <td className="py-3.5 px-5">{u.email}</td>
                  <td className="py-3.5 px-5">{u.tipo}</td>
                  <td className="py-3.5 px-5">{u.empresa}</td>
                  <td className="py-3.5 px-5">{u.valorAtraso}</td>
                  <td className="py-3.5 px-5 bg-sky-50/20">{u.criado}</td>
                  <td className="py-3.5 px-5">{u.editado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-center space-x-2 pt-6 text-xs text-gray-400 font-medium">
          <button className="hover:text-gray-700 transition">
            ← Anterior 10
          </button>
          <span className="px-1">1</span>
          <span>...</span>
          <span className="px-1">11</span>
          <span className="px-2 py-1 bg-sky-50 text-sky-700 font-bold border-b-2 border-sky-400 rounded-sm">
            12
          </span>
          <span className="px-1">13</span>
          <span className="px-1">14</span>
          <span className="px-1">15</span>
          <span className="px-1">16</span>
          <span className="px-1">17</span>
          <span className="px-1">18</span>
          <span className="px-1">19</span>
          <span className="px-1">20</span>
          <span>...</span>
          <span className="px-1">78</span>
          <button className="hover:text-gray-700 transition">
            Próximo 10 →
          </button>
        </div>
      </div>
    </div>
  );
}