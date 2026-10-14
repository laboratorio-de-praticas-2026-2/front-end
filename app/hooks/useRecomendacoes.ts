'use client';

import { useEffect, useState } from 'react';

export interface Recomendacao {
  id: number;
  nome: string;
  descricao: string;
}

export function useRecomendacoes(usuarioId: number) {
  const [recomendacoes, setRecomendacoes] = useState<Recomendacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuarioId) return;

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3333';
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    fetch(`${API_URL}/recomendacao/${usuarioId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar recomendações');
        return res.json();
      })
      .then((data) => setRecomendacoes(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [usuarioId]);

  return { recomendacoes, loading };
}