'use client';

import { useState, type FormEvent } from 'react';
import { Bell, Search, ChevronDown, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  relatoriosApi,
  type DadosSimulacao,
  type ResultadoSimulacao,
} from '../../relatorios/relatorios-api';

const moeda = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

const dataHora = (data: Date) =>
  data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

type CampoValor = 'impostos' | 'multas' | 'honorarios';

export default function DebitosPage() {
  const [valores, setValores] = useState<Record<CampoValor, string>>({
    impostos: '', multas: '', honorarios: '',
  });
  const [parcelas, setParcelas] = useState('1');
  const [taxaJurosMensal, setTaxaJurosMensal] = useState('0');
  const [resultado, setResultado] = useState<ResultadoSimulacao | null>(null);
  const [ultimaSimulacao, setUltimaSimulacao] = useState<Date | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const atualizarValor = (campo: CampoValor, valor: string) => {
    setValores((atual) => ({ ...atual, [campo]: valor }));
    setResultado(null);
    setErro(null);
  };

  async function simular(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (carregando) return;
    setErro(null);
    setResultado(null);

    const impostos = Number(valores.impostos.replace(',', '.'));
    const multas = Number(valores.multas.replace(',', '.'));
    const honorarios = Number(valores.honorarios.replace(',', '.'));
    const quantidadeParcelas = Number(parcelas);
    const taxa = Number(taxaJurosMensal.replace(',', '.'));
    const montantes = [impostos, multas, honorarios];

    if (
      montantes.some((valor) => !Number.isFinite(valor) || valor < 0 || !Number.isInteger(valor * 100)) ||
      !Number.isInteger(quantidadeParcelas) || quantidadeParcelas < 1 || quantidadeParcelas > 360 ||
      !Number.isFinite(taxa) || taxa < 0 || taxa > 100 || !Number.isInteger(taxa * 100)
    ) {
      setErro('Confira os valores: use atÃ© duas casas decimais, de 1 a 360 parcelas e juros entre 0% e 100%.');
      return;
    }

    const dados: DadosSimulacao = {
      impostos, multas, honorarios,
      parcelas: quantidadeParcelas,
      taxaJurosMensal: taxa,
    };

    setCarregando(true);
    try {
      const resposta = await relatoriosApi.simular(dados);
      setResultado(resposta);
      setUltimaSimulacao(new Date());
    } catch (falha) {
      setErro(falha instanceof Error ? falha.message : 'NÃ£o foi possÃ­vel realizar a simulaÃ§Ã£o.');
    } finally {
      setCarregando(false);
    }
  }

  const campos: { chave: CampoValor; titulo: string; descricao: string }[] = [
    { chave: 'impostos', titulo: 'Impostos', descricao: 'Valor dos tributos em aberto' },
    { chave: 'multas', titulo: 'Multas', descricao: 'Multas e penalidades' },
    { chave: 'honorarios', titulo: 'HonorÃ¡rios', descricao: 'Custos de honorÃ¡rios' },
  ];

  return (
    <div className="-m-8 p-8 bg-white min-h-screen flex flex-col font-sans text-gray-800 relative">
      {/* Topo / Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-purple-100 mb-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-gray-900">OlÃ¡ Ana FlÃ¡via</h1>
          <span className="text-gray-400 font-medium text-sm">Â»</span>
          <span className="text-sm font-medium text-gray-400" suppressHydrationWarning>
            {new Date().toLocaleDateString('pt-BR')}
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative text-gray-400" aria-label="NotificaÃ§Ãµes">
            <Bell className="w-6 h-6 fill-gray-300 stroke-gray-400" />
          </div>
          <div className="relative">
            <input type="search" placeholder="Busque aqui" aria-label="Buscar"
              className="w-80 max-w-full bg-white border border-gray-100 rounded-full py-2 pl-4 pr-10 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500" />
            <Search className="w-4 h-4 text-gray-400 absolute right-4 top-2.5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Simulador de DÃ©bitos</h1>
          <p className="text-sm text-gray-500">Calcule uma estimativa de pagamento e parcelamento.</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700">
            <span>SimulaÃ§Ã£o de dÃ©bitos</span><ChevronDown className="w-4 h-4" />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="border border-gray-200 rounded-2xl flex flex-col overflow-hidden shadow-sm bg-white">
            <div className="flex flex-col md:flex-row border-b border-gray-100">
              <div className="bg-[#fafafa] p-6 md:w-64 border-r border-gray-100 flex flex-col gap-6 min-w-[220px]">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Componentes do dÃ©bito</p>
                  <p className="text-sm font-bold text-gray-900">3</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Ãšltima SimulaÃ§Ã£o</p>
                  <p className="text-sm font-bold text-gray-900">{ultimaSimulacao ? dataHora(ultimaSimulacao) : 'Ainda nÃ£o realizada'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">SituaÃ§Ã£o</p>
                  <p className="text-sm font-bold text-gray-900">{carregando ? 'Calculando' : resultado ? 'Calculada' : 'Aguardando dados'}</p>
                </div>
              </div>
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
                    Esta simulaÃ§Ã£o apresenta uma estimativa dos dÃ©bitos informados, considerando as condiÃ§Ãµes
                    fornecidas. Os valores estÃ£o sujeitos Ã  confirmaÃ§Ã£o e podem sofrer alteraÃ§Ãµes.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={simular} className="p-6 md:p-8">
              <h2 className="text-base font-bold text-gray-900 mb-2">Dados para simulaÃ§Ã£o</h2>
              <p className="text-xs text-gray-500 mb-6">Informe os valores em reais. Use ponto ou vÃ­rgula como separador decimal.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs mb-6">
                  <thead className="bg-[#fafafa]">
                    <tr className="border-b border-t border-gray-200">
                      <th className="py-4 px-4 text-gray-500 font-medium w-12">NO.</th>
                      <th className="py-4 px-4 text-gray-500 font-medium">COMPONENTE</th>
                      <th className="py-4 px-4 text-gray-500 font-medium">CATEGORIA</th>
                      <th className="py-4 px-4 text-gray-500 font-medium text-right">VALOR (R$)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {campos.map((campo, indice) => (
                      <tr key={campo.chave} className="text-gray-900 font-medium">
                        <td className="py-5 px-4 align-top">{indice + 1}</td>
                        <td className="py-5 px-4">
                          <span className="font-bold">{campo.titulo}</span>
                          <span className="block text-gray-400 font-normal mt-1">{campo.descricao}</span>
                        </td>
                        <td className="py-5 px-4 align-top font-bold">FINANCEIRO</td>
                        <td className="py-3 px-4 text-right">
                          <input type="text" inputMode="decimal" required
                            aria-label={`Valor de ${campo.titulo.toLowerCase()}`}
                            placeholder="0,00" value={valores[campo.chave]}
                            onChange={(evento) => atualizarValor(campo.chave, evento.target.value)}
                            className="w-32 max-w-full border border-gray-300 rounded-lg px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-sky-500" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <label className="text-xs font-semibold text-gray-700">
                  Parcelas (1 a 360)
                  <input type="number" min="1" max="360" step="1" required value={parcelas}
                    onChange={(evento) => { setParcelas(evento.target.value); setResultado(null); setErro(null); }}
                    className="mt-2 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </label>
                <label className="text-xs font-semibold text-gray-700">
                  Taxa de juros mensal (%)
                  <input type="text" inputMode="decimal" required value={taxaJurosMensal}
                    onChange={(evento) => { setTaxaJurosMensal(evento.target.value); setResultado(null); setErro(null); }}
                    className="mt-2 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </label>
              </div>
              {erro && <p role="alert" className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{erro}</p>}
              <button type="submit" disabled={carregando}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#0ea5e9] hover:bg-sky-600 disabled:opacity-60 text-white rounded-lg text-sm font-semibold transition">
                {carregando ? 'Calculando...' : 'Simular dÃ©bitos'}
              </button>
              <div className="flex justify-end border-t border-gray-200 pt-6 mt-6">
                <div className="w-full md:w-80 space-y-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">Subtotal</span>
                    <span className="text-gray-900 font-bold">{resultado ? moeda(resultado.subtotal) : 'â€”'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">Parcelas</span>
                    <span className="text-gray-900 font-bold">{resultado ? resultado.parcelas : 'â€”'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">Valor por parcela</span>
                    <span className="text-gray-900 font-bold">{resultado ? moeda(resultado.valorParcela) : 'â€”'}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between text-sm">
                    <span className="text-gray-900 font-bold">Valor Total</span>
                    <span className="text-gray-900 font-bold">{resultado ? moeda(resultado.total) : 'â€”'}</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div aria-live="polite" className={`border rounded-lg py-3 flex items-center justify-center space-x-2 bg-white ${
            erro ? 'border-red-300 text-red-600' : resultado ? 'border-green-300 text-green-600' : 'border-orange-300 text-orange-500'
          }`}>
            {erro ? <AlertCircle className="w-4 h-4" /> : resultado ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            <span className="text-sm font-medium">{erro ? 'Falha na simulaÃ§Ã£o' : carregando ? 'Simulando...' : resultado ? 'SimulaÃ§Ã£o concluÃ­da' : 'Aguardando simulaÃ§Ã£o'}</span>
          </div>
          <div className="border border-gray-200 rounded-2xl p-6 bg-white text-center shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Precisa de Ajuda?</h3>
            <div className="w-full bg-[#0ea5e9] text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center space-x-2">
              <Send className="w-4 h-4" /><span>Entre em contato com a equipe!</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Consulte os canais oficiais de atendimento.</p>
          </div>
          <div className="border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">SumÃ¡rio</h3>
            </div>
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#fafafa]">
              <span className="text-xs font-bold text-gray-900">Total</span>
              <span className="text-sm font-bold text-gray-900">{resultado ? moeda(resultado.total) : 'â€”'}</span>
            </div>
            <div className="p-6 relative">
              {resultado ? (
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between"><span className="text-gray-400">Impostos</span><strong>{moeda(resultado.impostos)}</strong></div>
                  <div className="flex justify-between"><span className="text-gray-400">Multas</span><strong>{moeda(resultado.multas)}</strong></div>
                  <div className="flex justify-between"><span className="text-gray-400">HonorÃ¡rios</span><strong>{moeda(resultado.honorarios)}</strong></div>
                  <div className="flex justify-between"><span className="text-gray-400">Juros mensais</span><strong>{resultado.taxaJurosMensal}%</strong></div>
                  <div className="flex justify-between"><span className="text-gray-400">Parcelamento</span><strong>{resultado.parcelas}x de {moeda(resultado.valorParcela)}</strong></div>
                </div>
              ) : <p className="text-xs text-gray-500">Preencha os dados e clique em â€œSimular dÃ©bitosâ€ para visualizar o resultado.</p>}
            </div>
            <div className="p-5 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-900">Valor Total</span>
              <span className="px-3 py-1 bg-sky-100 text-gray-900 font-bold rounded-full text-xs">{resultado ? moeda(resultado.total) : 'â€”'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
