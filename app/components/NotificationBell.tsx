'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, AlertCircle, CheckCircle2, Calendar } from 'lucide-react';
import { useNotificationSocket } from '../hooks/useNotificationSocket';

export default function NotificationBell() {
  const { notificacoes, isConnected } = useNotificationSocket();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Função auxiliar para formatar em Reais (R$)
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-gray-400 hover:text-gray-600 transition focus:outline-none p-1"
        title={isConnected ? 'Notificações ativas' : 'Desconectado do servidor de notificações'}
      >
        <Bell className="w-6 h-6 fill-gray-300 stroke-gray-400 hover:fill-gray-400 transition" />

        {notificacoes.length > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#f8f9fb] animate-pulse">
            {notificacoes.length}
          </span>
        )}

        <span
          className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${
            isConnected ? 'bg-green-500' : 'bg-gray-300'
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden text-gray-800">
          <div className="p-4 bg-sky-50 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-sm text-[#022b49]">Notificações</h3>
              <span className="text-[10px] bg-sky-200 text-[#022b49] font-bold px-2 py-0.5 rounded-full">
                {notificacoes.length}
              </span>
            </div>
            <span className="text-[11px] text-gray-500 flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-400'}`} />
              {isConnected ? 'Ao vivo' : 'Off-line'}
            </span>
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
            {notificacoes.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-xs font-medium">Nenhuma notificação pendente no momento.</p>
              </div>
            ) : (
              notificacoes.map((item, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      {item.titulo}
                    </h4>
                  </div>

                  <p className="text-[11px] text-gray-600 leading-relaxed pl-5">
                    {item.mensagem}
                  </p>

                  {item.obrigacoes && item.obrigacoes.length > 0 && (
                    <div className="mt-2 pl-5 space-y-1.5">
                      {item.obrigacoes.map((obrigacao, idx) => (
                        <div
                          key={idx}
                          className="bg-[#f8fafc] p-2 rounded-lg border border-gray-100 text-[11px] flex justify-between items-center"
                        >
                          <div>
                            <p className="font-semibold text-gray-800">{obrigacao.descricao}</p>
                            <p className="text-[10px] text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#1a85c2]" />
                              Vencimento: {obrigacao.vencimento}
                            </p>
                          </div>
                          <span className="font-bold text-[#022b49] shrink-0 ml-2">
                            {formatarMoeda(obrigacao.valor)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}