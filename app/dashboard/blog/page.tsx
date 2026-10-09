'use client';

import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const posts = [
  { id: 1, titulo: 'Mudanças no Imposto de Renda 2026', autor: 'Ryan Davies', data: '28/09/2026', status: 'Publicado' },
  { id: 2, titulo: 'Guia Completo para Abertura de MEI', autor: 'Ana Souza', data: '15/09/2026', status: 'Rascunho' },
];

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog & Artigos</h2>
          <p className="text-sm text-gray-500">Gerencie as publicações e conteúdos do portal.</p>
        </div>
        <button className="flex items-center space-x-2 bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow">
          <Plus className="w-4 h-4" />
          <span>Novo Artigo</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="p-4">Título</th>
              <th className="p-4">Autor</th>
              <th className="p-4">Data</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-900">{post.titulo}</td>
                <td className="p-4 text-gray-600">{post.autor}</td>
                <td className="p-4 text-gray-500">{post.data}</td>
                <td className="p-4">
                  <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                    post.status === 'Publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="p-1 text-gray-500 hover:text-blue-600"><Edit className="w-4 h-4 inline" /></button>
                  <button className="p-1 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4 inline" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}