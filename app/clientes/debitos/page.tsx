'use client';

import React, { useState } from 'react';
import {
    Bell,
    Search,
    ChevronDown,
    Clock,
    Send,
} from 'lucide-react';


export default function DebitosPage() {

    return (
        <div className="-m-8 p-8 bg-white min-h-screen flex flex-col font-sans text-gray-800 relative">
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
            {/* ================= HEADER ================= */}
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Simulador de Débitos</h1>
                    <p className="text-sm text-gray-500">Última Atualização: 08/10/2026</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                        <span>Mais Opções</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="px-5 py-2 border border-[#0ea5e9] text-[#0ea5e9] rounded-lg text-sm font-semibold hover:bg-sky-50 transition">
                        Conferir Serviços
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* ================= COLUNA ESQUERDA (PRINCIPAL) ================= */}
                <div className="lg:col-span-8">
                    <div className="border border-gray-200 rounded-2xl flex flex-col overflow-hidden shadow-sm bg-white">

                        {/* ================= PARTE SUPERIOR (Lado a Lado) ================= */}
                        <div className="flex flex-col md:flex-row border-b border-gray-100">

                            {/* Barra Lateral Esquerda (Fundo Cinza) */}
                            <div className="bg-[#fafafa] p-6 md:w-64 border-r border-gray-100 flex flex-col gap-6 min-w-[220px]">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-1 whitespace-nowrap">Total Serviços</p>
                                    <p className="text-sm font-bold text-gray-900 whitespace-nowrap">50</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-1 whitespace-nowrap">Última Simulação</p>
                                    <p className="text-sm font-bold text-gray-900 whitespace-nowrap">03/05/2026</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-1 whitespace-nowrap">Tempo de Confirmação</p>
                                    <p className="text-sm font-bold text-gray-900 whitespace-nowrap">07 Dias Úteis</p>
                                </div>
                            </div>

                            {/* Informações do Servidor e Nota (Lado Direito) */}
                            <div className="p-6 md:p-8 flex-1">
                                <div className="mb-6">
                                    <p className="text-xs text-gray-400 font-medium mb-1">Servidor Principal</p>
                                    <h2 className="text-base font-bold text-gray-900 mb-2">Grupo Bortone - Contabilidade</h2>
                                    <div className="text-xs text-gray-500 space-y-1">
                                        <p>R. Tamekishi Takano, 713 - Centro, Registro - SP, 11900-000</p>
                                        <p>Telefone: (13) 3822-3712</p>
                                        <p>Email: bortonecontabil@email.com</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400 font-medium mb-1">Nota</p>
                                    <p className="text-xs text-gray-900 font-medium leading-relaxed">
                                        Esta simulação apresenta uma estimativa dos valores dos débitos selecionados,
                                        considerando as condições disponíveis no momento da consulta. Os valores,
                                        descontos e opções de pagamento estão sujeitos à confirmação e podem sofrer
                                        alterações até a finalização da operação.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* ================= PARTE INFERIOR (Tabela Largura Total) ================= */}
                        <div className="p-6 md:p-8">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs mb-6">
                                    <thead className="bg-[#fafafa]">
                                        <tr className="border-b border-t border-gray-200">
                                            <th className="py-4 px-4 text-gray-500 font-medium w-12">NO.</th>
                                            <th className="py-4 px-4 text-gray-500 font-medium">SERVIÇO</th>
                                            <th className="py-4 px-4 text-gray-500 font-medium">CATEGORIA</th>
                                            <th className="py-4 px-4 text-gray-500 font-medium w-28">PRAZO ESTIMADO</th>
                                            <th className="py-4 px-4 text-gray-500 font-medium">COBRANÇA</th>
                                            <th className="py-4 px-4 text-gray-500 font-medium">RESPONSÁVEL</th>
                                            <th className="py-4 px-4 text-gray-500 font-medium text-right">TOTAL SERVIÇO</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr className="text-gray-900 font-medium">
                                            <td className="py-5 px-4 align-top">1</td>
                                            <td className="py-5 px-4">
                                                <span className="font-bold">Nome Serviço</span>
                                                <span className="block text-gray-400 font-normal mt-1">Descrição Serviço</span>
                                            </td>
                                            <td className="py-5 px-4 align-top font-bold">FINANCEIRO</td>
                                            <td className="py-5 px-4 align-top">07 DIAS<br />ÚTEIS</td>
                                            <td className="py-5 px-4 align-top">FIXA</td>
                                            <td className="py-5 px-4 align-top">Ana Ferreira</td>
                                            <td className="py-5 px-4 align-top text-right font-medium">R$ 10,000</td>
                                        </tr>
                                        <tr className="text-gray-900 font-medium">
                                            <td className="py-5 px-4 align-top">2</td>
                                            <td className="py-5 px-4">
                                                <span className="font-bold">Nome Serviço</span>
                                                <span className="block text-gray-400 font-normal mt-1">Descrição Serviço</span>
                                            </td>
                                            <td className="py-5 px-4 align-top font-bold">FINANCEIRO</td>
                                            <td className="py-5 px-4 align-top">07 DIAS<br />ÚTEIS</td>
                                            <td className="py-5 px-4 align-top">FIXA</td>
                                            <td className="py-5 px-4 align-top">Ana Ferreira</td>
                                            <td className="py-5 px-4 align-top text-right font-medium">R$ 10,000</td>
                                        </tr>
                                        <tr className="text-gray-900 font-medium">
                                            <td className="py-5 px-4 align-top">3</td>
                                            <td className="py-5 px-4">
                                                <span className="font-bold">Nome Serviço</span>
                                                <span className="block text-gray-400 font-normal mt-1">Descrição Serviço</span>
                                            </td>
                                            <td className="py-5 px-4 align-top font-bold">FINANCEIRO</td>
                                            <td className="py-5 px-4 align-top">07 DIAS<br />ÚTEIS</td>
                                            <td className="py-5 px-4 align-top">FIXA</td>
                                            <td className="py-5 px-4 align-top">Ana Ferreira</td>
                                            <td className="py-5 px-4 align-top text-right font-medium">R$ 10,000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Totais do Rodapé da Tabela */}
                            <div className="flex justify-end border-t border-gray-200 pt-6">
                                <div className="w-full md:w-80 space-y-4">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-400 font-medium">Valor Total</span>
                                        <span className="text-gray-900 font-bold">R$ 20,000</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-400 font-medium">Tipo Cobrança</span>
                                        <span className="text-gray-900 font-bold">FIXA</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-400 font-medium">Desconto Adicionado</span>
                                        <span className="text-gray-900 font-bold">R$0,0</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between text-sm">
                                        <span className="text-gray-900 font-bold">Valor Total</span>
                                        <span className="text-gray-900 font-bold">R$ 20,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ================= COLUNA DIREITA (SIDEBAR) ================= */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Badge Simulando */}
                    <div className="border border-orange-300 rounded-lg py-3 flex items-center justify-center space-x-2 text-orange-500 bg-white">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">Simulando...</span>
                    </div>

                    {/* Precisa de Ajuda */}
                    <div className="border border-gray-200 rounded-2xl p-6 bg-white text-center shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900 mb-4">Precisa de Ajuda?</h3>
                        <button className="w-full bg-[#0ea5e9] hover:bg-sky-600 text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center space-x-2 transition">
                            <Send className="w-4 h-4" />
                            <span>Entre em contato com a equipe!</span>
                        </button>
                    </div>

                    {/* Sumário */}
                    <div className="border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900">Sumário</h3>
                        </div>

                        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#fafafa]">
                            <span className="text-xs font-bold text-gray-900">Total</span>
                            <span className="text-sm font-bold text-gray-900">R$20,000</span>
                        </div>

                        <div className="p-6 relative">
                            {/* Linha vertical pontilhada da timeline */}
                            <div className="absolute left-[31px] top-8 bottom-8 w-px border-l-2 border-dashed border-gray-200"></div>

                            <div className="space-y-6">
                                {/* Item 1 da Timeline */}
                                <div className="relative pl-6">
                                    <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 bg-green-500 rounded-full ring-4 ring-white"></div>
                                    <h4 className="text-xs font-bold text-gray-900 mb-2">Serviço No. 2</h4>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">Data</span>
                                        <span className="font-medium text-gray-900">OUT 10,2026</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-400">Valor</span>
                                        <span className="font-medium text-gray-900">R$ 10,000</span>
                                    </div>
                                </div>

                                {/* Item 2 da Timeline */}
                                <div className="relative pl-6">
                                    <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 bg-green-500 rounded-full ring-4 ring-white"></div>
                                    <h4 className="text-xs font-bold text-gray-900 mb-2">Serviço No. 3</h4>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">Data</span>
                                        <span className="font-medium text-gray-900">OUT 10,2026</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-400">Valor</span>
                                        <span className="font-medium text-gray-900">R$ 10,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer do Sumário */}
                        <div className="p-5 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-900">Valor Total</span>
                            <span className="px-3 py-1 bg-red-300 text-gray-900 font-bold rounded-full text-xs">
                                R$ 20,000
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}