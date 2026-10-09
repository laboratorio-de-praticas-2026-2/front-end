export interface ResultadoParcelamento {
  quantidadeParcelas: number;
  taxaJurosMensal: number;
  valorParcela: number;
  valorTotalComJuros: number;
  valorTotalJuros: number;
}

// Taxa padrão de referência para simulação (configurável pelo usuário no formulário)
export const TAXA_JUROS_PADRAO = 0.01; // 1% ao mês

export function calcularParcelamento(
  valorBase: number,
  quantidadeParcelas: number,
  taxaJurosMensal: number = TAXA_JUROS_PADRAO
): ResultadoParcelamento {
  if (quantidadeParcelas <= 0 || valorBase <= 0) {
    return {
      quantidadeParcelas: 0,
      taxaJurosMensal,
      valorParcela: 0,
      valorTotalComJuros: 0,
      valorTotalJuros: 0,
    };
  }

  // Juros compostos sobre o valor total
  const valorTotalComJuros = valorBase * Math.pow(1 + taxaJurosMensal, quantidadeParcelas);
  const valorParcela = valorTotalComJuros / quantidadeParcelas;
  const valorTotalJuros = valorTotalComJuros - valorBase;

  return {
    quantidadeParcelas,
    taxaJurosMensal,
    valorParcela,
    valorTotalComJuros,
    valorTotalJuros,
  };
}
