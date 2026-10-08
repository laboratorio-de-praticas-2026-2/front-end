'use client';

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-[#072d42]">Dashboard do Administrador</h1>
      <p className="text-gray-600 mb-6">Visão geral do sistema e gestão de clientes.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total de Clientes</h3>
          <p className="text-2xl font-bold text-[#072d42] mt-2">--</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Usuários PJ</h3>
          <p className="text-2xl font-bold text-[#072d42] mt-2">--</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Usuários PF</h3>
          <p className="text-2xl font-bold text-[#072d42] mt-2">--</p>
        </div>
      </div>
    </div>
  );
}
