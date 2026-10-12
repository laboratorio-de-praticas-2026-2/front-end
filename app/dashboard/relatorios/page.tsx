'use client';

import React, { useState } from 'react';
import {
  Bell,
  Search,
  User,
  Lightbulb,
  Calendar,
  ChevronDown,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Eye,
  X,
  FileText,
  AlertTriangle
} from 'lucide-react';

import NovoRelatorio from './NovoRelatorio';

export default function RelatoriosPage() {
  const [currentView, setCurrentView] = useState('lista');

  // Estados dos Modais
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [relatorioSelecionado, setRelatorioSelecionado] = useState({
    titulo: 'Relatório de DAS',
    status: 'Gerado',
    categoria: 'Obrigações Fiscais',
    descricao: 'Resumo das obrigações do DAS para o período selecionado.',
    dataInicio: '07/04/2026',
    dataFim: '08/04/2026',
  });

  const relatorios = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    titulo: `Doc_${String(i + 1).padStart(2, '0')}`,
    descricao: 'Análises de empresas parceiras.',
    categoria: 'Empresarial',
    dataGeracao: '29/09/2026',
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(relatorios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = relatorios.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="-m-8 p-8 bg-[#f8f9fb] min-h-screen flex flex-col font-sans text-gray-800 relative">
      {/* Topo / Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-purple-100 mb-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-gray-900">Olá Ryan</h1>
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

      {currentView === 'lista' ? (
        <>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-[#243B53]">Relatórios</h2>
          </div>

          <div className="flex items-center justify-between bg-gray-50/50 border border-gray-100 p-3 rounded-2xl mb-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-2.5" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 w-64 bg-white focus:outline-none focus:border-gray-300"
                />
              </div>

              <button className="flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 transition">
                <User className="w-4 h-4" />
                <span>Categoria</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              <button className="flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 transition">
                <Lightbulb className="w-4 h-4" />
                <span>Status</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              <button className="flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 transition">
                <Calendar className="w-4 h-4" />
                <span>Data</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentView('novo')}
                className="flex items-center space-x-2 bg-[#203047] text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-[#1a2638] transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Relatório</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-12 flex-grow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-6 text-md font-semibold text-gray-600 w-48">Título</th>
                  <th className="py-4 px-6 text-md font-semibold text-gray-600">Descrição</th>
                  <th className="py-4 px-6 text-md font-semibold text-gray-600 w-48">Categoria</th>
                  <th className="py-4 px-6 text-md font-semibold text-gray-600 w-48">Data Geração</th>
                  <th className="py-4 px-6 text-md font-semibold text-gray-600 w-24 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((relatorio) => (
                  <tr key={relatorio.id} className="border-b border-gray-100 last:border-none group">
                    <td className="py-5 px-6 text-sm text-black">{relatorio.titulo}</td>
                    <td className="py-5 px-6 text-sm text-black font-medium">{relatorio.descricao}</td>
                    <td className="py-5 px-6 text-sm text-black font-medium">{relatorio.categoria}</td>
                    <td className="py-5 px-6 text-sm text-black font-medium">{relatorio.dataGeracao}</td>
                    <td className="py-5 px-6">
                      <div className="flex items-center justify-end space-x-4 opacity-80 group-hover:opacity-100 transition">
                        <button
                          onClick={() => {
                            setRelatorioSelecionado({
                              titulo: relatorio.titulo,
                              status: 'Gerado',
                              categoria: relatorio.categoria,
                              descricao: relatorio.descricao,
                              dataInicio: '07/04/2026',
                              dataFim: '08/04/2026',
                            });
                            setIsExportModalOpen(true);
                          }}
                          className="text-gray-400 hover:text-blue-600 transition"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setIsDeleteModalOpen(true)}
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 font-medium pb-8 mt-auto">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`flex items-center mr-4 transition ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Anterior
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-2 transition ${currentPage === pageNumber ? 'text-black font-bold' : 'hover:text-gray-700'}`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center ml-4 transition ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
            >
              Próximo
              <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          </div>
        </>
      ) : (
        <NovoRelatorio onVoltar={() => setCurrentView('lista')} />
      )
      }

      {/* ================= MODAL DE EXPORTAÇÃO ================= */}

      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">

            {/* Cabeçalho */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {relatorioSelecionado.titulo} — {relatorioSelecionado.dataInicio} a {relatorioSelecionado.dataFim}
                </h3>

                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="text-gray-400 hover:text-gray-700 transition"
                  aria-label="Fechar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Informações do relatório */}
            <div className="px-6 pb-4">
              <div className="border border-gray-200 rounded-xl p-5 space-y-4">

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {relatorioSelecionado.status}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">Tipo de relatório</span>
                  <span className="text-sm font-medium text-gray-800 text-right">
                    {relatorioSelecionado.categoria}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-sm text-gray-500">Descrição</span>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {relatorioSelecionado.descricao}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">Período</span>
                  <span className="text-sm font-medium text-gray-800 text-right">
                    {relatorioSelecionado.dataInicio} — {relatorioSelecionado.dataFim}
                  </span>
                </div>

              </div>
            </div>

            <div className="px-6 pb-4">
              <div className="border border-gray-200 rounded-xl min-h-36 flex flex-col items-center justify-center text-center p-6">
                <FileText className="w-11 h-11 text-gray-800 mb-4" />

                <p className="text-sm font-semibold text-gray-800">
                  Pré-visualização do PDF
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Baixe para visualizar o documento completo
                </p>
              </div>
            </div>

            {/* Rodapé */}
            <div className="px-6 pb-6 pt-1 flex justify-end gap-2">
              <button
                onClick={() => {
                }}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Abrir PDF
              </button>

              <button
                onClick={() => setIsExportModalOpen(false)}
                className="px-4 py-2.5 bg-[#0a84c5] hover:bg-[#086a9f] rounded-lg text-sm font-medium text-white transition"
              >
                Baixar PDF
              </button>
            </div>

          </div>
        </div>
      )}


      {/* ================= MODAL DE EXCLUSÃO ================= */}
      {
        isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">

              {/* Header do Modal */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-black">Excluir Relatório</h3>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="text-gray-400 hover:text-gray-700 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Corpo do Modal */}
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Tem certeza?</h4>
                <p className="text-sm text-gray-500">
                  Você está prestes a excluir este relatório. Esta ação não pode ser desfeita.
                </p>
              </div>

              {/* Rodapé do Modal com Botões */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3 bg-white rounded-b-lg">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                  }}
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium text-white transition"
                >
                  Excluir
                </button>
              </div>

            </div>
          </div>
        )
      }
    </div >
  );
}