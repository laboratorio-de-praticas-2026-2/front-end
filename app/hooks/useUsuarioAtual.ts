"use client";

import { useState, useEffect } from "react";

export type TipoUsuario = "admin" | "usuario";

interface UsuarioAtual {
  nome: string;
  tipo: TipoUsuario;
}

async function buscarUsuarioAtualNaAPI(): Promise<UsuarioAtual> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { nome: "Admin de Teste", tipo: "admin" };
}

export function useUsuarioAtual() {
  const [usuario, setUsuario] = useState<UsuarioAtual | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarUsuarioAtualNaAPI().then((dados) => {
      setUsuario(dados);
      setCarregando(false);
    });
  }, []);

  return { usuario, carregando };
}