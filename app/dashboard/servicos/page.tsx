'use client';

import React from 'react';
import {
  Bell,
  Search,
  Pencil,
  Trophy,
  Target,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Settings,
} from 'lucide-react';

export default function ServicosPage() {
  const chartData = [
    { month: 'Jan', value: 35 },
    { month: 'Feb', value: 45 },
    { month: 'Mar', value: 25 },
    { month: 'Apr', value: 55 },
    { month: 'May', value: 62 },
    { month: 'Jun', value: 18 },
    { month: 'Jul', value: 12 },
    { month: 'Aug', value: 78, active: true },
    { month: 'Sep', value: 48 },
    { month: 'Oct', value: 66 },
    { month: 'Nov', value: 18 },
    { month: 'Dec', value: 35 },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-400 mb-3">
            Rendimento Total
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 min-h-[220px] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  R$20,000
                </span>
                <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-200 transition">
                  <Pencil className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>
              <span className="text-xs text-gray-400 font-medium">
                Mai, 2023
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center mt-2">
              <div className="space-y-4">
                <div className="flex items-start space-x-2.5">
                  <Trophy className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium">
                      Rendimento Mensal
                    </p>
                    <p className="text-sm font-bold text-gray-900">R$12,500</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Target className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium">
                      Total Rendimento
                    </p>
                    <p className="text-sm font-bold text-gray-900">R$20,000</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-16 overflow-hidden">
                  <div className="w-32 h-32 rounded-full border-[12px] border-gray-200 border-t-emerald-500 border-r-emerald-500 transform -rotate-45" />
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-emerald-600 origin-bottom transform rotate-[25deg] rounded-full" />
                </div>
                <div className="flex justify-between w-28 text-[10px] text-gray-400 mt-1">
                  <span>$0</span>
                  <span className="font-bold text-gray-800">12K</span>
                  <span>$20k</span>
                </div>
                <span className="text-[10px] text-gray-800 font-bold mt-1">
                  Mensal X Total
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-400">
              Valor por Serviço
            </h2>
            <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center space-x-0.5">
              <span>Ver tudo</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 min-h-[220px] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-50">
              <div className="flex items-center space-x-3">
                <div className="bg-[#f4f5f7] text-gray-900 rounded-xl p-2 text-center w-12 h-12 flex flex-col justify-center shrink-0">
                  <span className="text-[9px] font-bold tracking-widest uppercase leading-none text-gray-400">
                    MAI
                  </span>
                  <span className="text-base font-bold leading-none mt-1">
                    15
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">
                    GUIA - DAS
                  </h4>
                  <p className="text-xs text-gray-400">
                    Vencimento - 20/05/2026
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] border border-gray-100 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-800">
                R$150
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-[#f4f5f7] text-gray-900 rounded-xl p-2 text-center w-12 h-12 flex flex-col justify-center shrink-0">
                  <span className="text-[9px] font-bold tracking-widest uppercase leading-none text-gray-400">
                    MAI
                  </span>
                  <span className="text-base font-bold leading-none mt-1">
                    15
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">
                    GUIA DARF
                  </h4>
                  <p className="text-xs text-gray-400">
                    Vencimento - 20/05/2026
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] border border-gray-100 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-800">
                R$150
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-400 mb-3">
            Débito Pendente
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 min-h-[220px] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-2xl font-bold text-gray-900">
                R$240,399
              </span>
              <span className="text-xs text-gray-400">Geral</span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-8">
              <button className="flex items-center space-x-1 hover:text-gray-600 transition">
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <div className="flex space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="w-2 h-2 rounded-full bg-gray-300" />
              </div>

              <button className="flex items-center space-x-1 text-gray-800 font-medium hover:text-gray-600 transition">
                <span>Próximo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-4 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-400">
              Solicitações Gerais
            </h2>
            <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center space-x-0.5">
              <span>Ver tudo</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 flex-1 flex flex-col justify-between space-y-6">
            <div className="flex space-x-6 border-b border-gray-100 pb-2 text-sm font-semibold">
              <button className="text-emerald-600 border-b-2 border-emerald-500 pb-2">
                Todos
              </button>
              <button className="text-gray-500 hover:text-gray-800 pb-2">
                Vencidos
              </button>
              <button className="text-gray-500 hover:text-gray-800 pb-2">
                Pendentes
              </button>
            </div>

            <div className="space-y-5">
              {[
                { title: 'GUIA - DARF', val: 'R$160.00' },
                { title: 'GUIA - DAR', val: 'R$160.00' },
                { title: 'GUIA - INSS', val: 'R$160.00' },
                { title: 'GUIA - INSS', val: 'R$160.00' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100/80 flex items-center justify-center shrink-0">
                      <Settings className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-400">Contabilidade</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-900">{item.val}</p>
                    <p className="text-[10px] text-gray-400">17 Mai 2023</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col">
          <div className="mb-3 h-7" />

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-base font-bold text-gray-800">
                Total Serviços
              </h3>
              <div className="flex items-center space-x-1 text-xs text-gray-400 cursor-pointer">
                <span>Anuais</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[11px] text-gray-400">
                <span>90</span>
                <span>80</span>
                <span>70</span>
                <span>60</span>
                <span>50</span>
                <span>40</span>
                <span>30</span>
                <span>20</span>
                <span>10</span>
                <span>00</span>
              </div>

              <div className="relative h-64 border-b border-gray-100 flex items-end justify-between px-2">
                <div className="absolute left-0 right-0 top-[18%] border-b border-dashed border-emerald-400 z-0" />

                {chartData.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center z-10 w-full"
                  >
                    <div
                      className={`w-5 rounded-md transition-all ${
                        item.active
                          ? 'bg-emerald-600 shadow-md shadow-emerald-200'
                          : 'bg-emerald-400/70 hover:bg-emerald-500/80'
                      }`}
                      style={{ height: `${(item.value / 90) * 100}%` }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between px-2 pt-3 text-[11px] text-gray-400">
                {chartData.map((item, idx) => (
                  <span
                    key={idx}
                    className={
                      item.active ? 'font-bold text-emerald-600' : ''
                    }
                  >
                    {item.month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}