'use client';

import React from 'react';
import { Plus, Building2 } from 'lucide-react';

const empresas = [
  { id: 1, razaoSocial: 'Empresa Alfa Ltda', cnpj: '12.345.678/0001-90', regime: 'Simples Nacional' },
  { id: 2, razaoSocial: 'Beta Tecnologia S.A.', cnpj: '98.765.432/0001-10', regime: 'Lucro Presumido' },
];

export default function EmpresasPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Empresas Cadastradas</h2>
          <p className="text-sm text-gray-500">Gerencie os dados fiscais das empresas dos clientes.</p>
        </div>
        <button className="flex items-center space-x-2 bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow">
          <Plus className="w-4 h-4" />
          <span>Cadastrar Empresa</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="p-4">Razão Social</th>
              <th className="p-4">CNPJ</th>
              <th className="p-4">Regime Tributário</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {empresas.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-900 flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span>{emp.razaoSocial}</span>
                </td>
                <td className="p-4 text-gray-600">{emp.cnpj}</td>
                <td className="p-4 text-gray-700">{emp.regime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}