"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { 
  ChevronRight, 
  Plus, 
  Minus, 
  Search, 
  HelpCircle 
} from "lucide-react";

// Caso salve em app/faq/public/faq-bg.svg:
import bgHeroSvg from "./public/faq-bg.svg";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const categories = [
  { id: "servicos", label: "Serviços", desc: "Conheça nossas soluções contábeis." },
  { id: "empresas", label: "Empresas", desc: "Dúvidas sobre seu negócio." },
  { id: "financeiro", label: "Financeiro e Tributário", desc: "Informações sobre impostos e finanças." },
  { id: "atendimento", label: "Atendimento", desc: "Saiba como funciona nosso atendimento." },
  { id: "seguranca", label: "Segurança e Documentos", desc: "Proteção e organização dos seus documentos." },
  { id: "abertura", label: "Abertura e Regularização", desc: "Abra e mantenha sua empresa regularizada." },
];

const faqData: FAQItem[] = [
  {
    id: "1",
    category: "servicos",
    question: "Vocês cuidam das obrigações fiscais?",
    answer: "Sim! Gerenciamos todas as suas obrigações fiscais e tributárias principais e acessórias (como DAS, DARF, DEFIS, DCTF, SPED, etc.), garantindo o envio correto e dentro do prazo para os órgãos competentes."
  },
  {
    id: "2",
    category: "servicos",
    question: "A contabilidade também cuida da folha de pagamento?",
    answer: "Com certeza. Nosso serviço de departamento pessoal realiza o processamento completo da folha, emissão de holerites, cálculo de eSocial, FGTS, férias, rescisões e admissão de colaboradores."
  },
  {
    id: "3",
    category: "servicos",
    question: "Vocês fazem planejamento tributário?",
    answer: "Sim. Analisamos o perfil do seu negócio para identificar se o melhor enquadramento é Simples Nacional, Lucro Presumido ou Lucro Real, reduzindo custos tributários de forma totalmente legal."
  },
  {
    id: "4",
    category: "servicos",
    question: "Posso contratar apenas um serviço?",
    answer: "Sim, oferecemos tanto pacotes completos de assessoria mensal quanto serviços pontuais, como declaração de Imposto de Renda (IRPF), regularização de CPF/CNPJ ou alteração contratual."
  },
  {
    id: "5",
    category: "empresas",
    question: "Qual a diferença entre MEI e Microempresa (ME)?",
    answer: "O MEI tem faturamento anual limitado e regras específicas para contratação de funcionários. A ME permite faturar mais, ter mais funcionários e atuar em atividades não permitidas no MEI."
  },
  {
    id: "6",
    category: "financeiro",
    question: "Como funciona a emissão do DAS no Simples Nacional?",
    answer: "O DAS é emitido mensalmente com base no faturamento bruto da empresa. Nosso sistema apura as vendas/serviços e disponibiliza a guia até a data limite para pagamento sem juros."
  },
  {
    id: "7",
    category: "financeiro",
    question: "Como declarar o Imposto de Renda Pessoa Jurídica (IRPJ)?",
    answer: "A declaração do IRPJ varia conforme o regime tributário. Nossa equipe faz o levantamento de receitas e despesas para apurar o imposto devido e gerar as guias correspondentes."
  },
  {
    id: "8",
    category: "atendimento",
    question: "Como posso agendar uma reunião com o contador?",
    answer: "Você pode agendar reuniões presenciais ou online diretamente pelo Portal do Cliente ou através do chat de atendimento rápido."
  },
  {
    id: "9",
    category: "seguranca",
    question: "Meus documentos e guias fiscais ficam salvos com segurança?",
    answer: "Sim, todos os seus documentos, certidões e guias ficam armazenados em nuvem criptografada e podem ser acessados a qualquer momento pelo Portal do Cliente."
  },
  {
    id: "10",
    category: "abertura",
    question: "Quanto tempo leva para abrir uma empresa?",
    answer: "O processo costuma levar entre 5 e 15 dias úteis, dependendo do município e da agilidade dos órgãos públicos (Junta Comercial e Receita Federal)."
  }
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("servicos");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ "1": false });

  const toggleAccordion = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory = searchTerm !== "" || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Header />

      {/* Hero Banner idêntico ao layout Figma */}
      <section className="max-w-7xl mx-auto px-6 pt-8 w-full">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 min-h-[320px] md:min-h-[380px] flex flex-col items-center justify-center p-8 text-center">
          
          {/* Imagem de Fundo SVG */}
          <div className="absolute inset-0 z-0">
            <Image
              src={bgHeroSvg}
              alt="Background FAQ"
              fill
              priority
              className="object-cover object-center"
            />
            {/* Camada / Overlay Azul Translúcido */}
            <div className="absolute inset-0 bg-sky-900/70 backdrop-blur-[2px]"></div>
          </div>

          {/* Conteúdo do Banner */}
          <div className="relative z-10 space-y-5 max-w-3xl mx-auto flex flex-col items-center">
            
            {/* Badge FAQ Branca Arredondada */}
            <div className="inline-flex items-center gap-2 bg-white text-sky-600 px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
              <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-[11px] font-black">
                ?
              </span>
              <span className="tracking-wider">FAQ</span>
            </div>

            {/* Título Principal */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-sm">
              PERGUNTAS FREQUENTES
            </h1>

            {/* Subtítulo */}
            <p className="text-sky-100 text-xs md:text-sm font-medium max-w-xl mx-auto leading-relaxed">
              Encontre respostas para as principais dúvidas sobre nossos serviços, atendimento e soluções contábeis.
            </p>

            {/* Link Precisa de ajuda? */}
            <div className="pt-2">
              <a 
                href="#fale-conosco" 
                className="text-sky-200 hover:text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors underline-offset-4 hover:underline"
              >
                Precisa de ajuda? →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Conteúdo Principal (Categorias + Acordeão) */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        
        {/* Campo de Busca Rápida acima das listas se necessário */}
        <div className="max-w-md ml-auto mb-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar palavra-chave..."
              className="w-full pl-9 pr-4 py-2 bg-white text-slate-800 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Categorias Laterais */}
          <aside className="lg:col-span-4 space-y-3">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id && searchTerm === "";
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSearchTerm("");
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? "bg-sky-50 border-sky-200 shadow-sm"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="pr-3">
                    <h3 className={`font-bold text-sm ${isSelected ? "text-sky-600" : "text-slate-800 group-hover:text-slate-900"}`}>
                      {cat.label}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      {cat.desc}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${isSelected ? "text-sky-600 translate-x-1" : "text-slate-300 group-hover:text-slate-400"}`} />
                </button>
              );
            })}
          </aside>

          {/* Acordeão de Perguntas */}
          <section className="lg:col-span-8 space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = !!openItems[faq.id];
                return (
                  <div
                    key={faq.id}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-sm hover:border-slate-300"
                  >
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-800 text-base hover:text-sky-600 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <div className="p-1 rounded-full text-sky-500 bg-sky-50 shrink-0">
                        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-700">Nenhuma pergunta encontrada</h3>
                <p className="text-xs text-slate-400 mt-1">Tente pesquisar com outro termo ou selecione uma categoria na barra lateral.</p>
              </div>
            )}
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}