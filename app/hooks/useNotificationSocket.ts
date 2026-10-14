'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { NotificacaoObrigacoesPayload } from '@/app/types/notificacao';

// Ajustado para apontar por padrão para a porta 3333 do NestJS
const SOCKET_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3333';

// Alterado para corresponder exatamente ao evento emitido pelo NotificacaoSocketService
const EVENT_NAME = 'notification:new';

export function useNotificationSocket() {
  const [notificacoes, setNotificacoes] = useState<NotificacaoObrigacoesPayload[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      console.warn('[Socket] Token de autenticação não encontrado no localStorage.');
      return;
    }

    if (socketRef.current?.connected) {
      return;
    }

    const socket = io(SOCKET_URL, {
      auth: {
        token: token,
      },
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('[Socket] Conectado ao servidor de notificações.');
      socket.emit('join-user');
    });

    socket.on(EVENT_NAME, (payload: NotificacaoObrigacoesPayload) => {
      console.log('[Socket] Nova notificação recebida:', payload);
      setNotificacoes((prev) => [payload, ...prev]);
    });

    socket.on('disconnect', (reason) => {
      setIsConnected(false);
      console.log('[Socket] Desconectado:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('[Socket] Erro de conexão/autenticação:', error.message);
    });

    return () => {
      if (socket) {
        socket.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const clearNotificacoes = () => {
    setNotificacoes([]);
  };

  return {
    notificacoes,
    isConnected,
    clearNotificacoes,
  };
}