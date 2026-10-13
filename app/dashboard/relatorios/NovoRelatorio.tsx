'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { relatoriosApi } from './relatorios-api';

interface NovoRelatorioProps { onVoltar: () => void; onCriado: () => void; }
export default function NovoRelatorio({ onVoltar, onCriado }: NovoRelatorioProps) {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataTermino, setDataTermino] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  async function confirmar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (dataTermino < dataInicio) { setErro('A data de término deve ser igual ou posterior à inicial.'); return; }
    setSalvando(true); setErro('');
    try {
      const criado = await relatoriosApi.criar({ nome: nome.trim(), categoria, descricao: descricao.trim(), data_inicio: dataInicio, data_termino: dataTermino });
      try { await relatoriosApi.gerar(criado.id); }
      catch (e) { setErro(`Relatório cadastrado, mas não foi possível iniciar o PDF: ${e instanceof Error ? e.message : 'erro desconhecido'}`); onCriado(); return; }
      onCriado();
    } catch (e) { setErro(e instanceof Error ? e.message : 'Erro ao cadastrar relatório'); }
    finally { setSalvando(false); }
  }

  return (
    <form onSubmit={confirmar} className="flex-grow flex flex-col w-full">
      <div className="mb-8"><h2 className="text-3xl font-bold text-[#243B53]">Gerar Relatório</h2></div>
      <div className="flex flex-col space-y-5 flex-grow">
        <div className="border border-[#4ba3e3] rounded-lg py-3 text-center text-[#4ba3e3] text-sm font-medium bg-white">Gere novos relatórios sempre que precisar</div>
        {erro && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{erro}</p>}
        <input required maxLength={255} value={nome} onChange={e => setNome(e.target.value)} type="text" placeholder="Título Relatório" className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-white" />
        <div className="relative">
          <select required value={categoria} onChange={e => setCategoria(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-500 appearance-none bg-white">
            <option value="">Categoria</option><option value="Empresarial">Empresarial</option><option value="Financeiro">Financeiro</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
        </div>
        <textarea required value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição Relatório" rows={6} className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-white resize-none" />
        <div className="flex items-center space-x-4">
          <div className="w-1/2 flex flex-col space-y-1"><label className="text-xs font-medium text-gray-500 ml-1">Data de Início</label><input required type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-white" /></div>
          <div className="w-1/2 flex flex-col space-y-1"><label className="text-xs font-medium text-gray-500 ml-1">Data de Término</label><input required type="date" value={dataTermino} onChange={e => setDataTermino(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-white" /></div>
        </div>
        <div className="flex justify-end space-x-4 mt-8 pt-4">
          <button type="button" onClick={onVoltar} disabled={salvando} className="px-8 py-2.5 bg-white border border-gray-300 rounded-full text-sm text-gray-700">Cancelar</button>
          <button type="submit" disabled={salvando} className="px-8 py-2.5 bg-[#0a84c5] rounded-full text-sm font-medium text-white disabled:opacity-50">{salvando ? 'Gerando...' : 'Confirmar'}</button>
        </div>
      </div>
    </form>
  );
}
