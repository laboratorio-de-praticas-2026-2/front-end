export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  description: string;
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: "servicos",
    title: "Serviços",
    description: "Conheça nossas soluções contábeis.",
    items: [
      {
        id: 1,
        question: "Vocês cuidam das obrigações fiscais?",
        answer: ""
      },
      {
        id: 2,
        question: "A contabilidade também cuida da folha de pagamento?",
        answer: ""
      },
      {
        id: 3,
        question: "Vocês fazem planejamento tributário?",
        answer: ""
      },
      {
        id: 4,
        question: "Posso contratar apenas um serviço?",
        answer: ""
      }
    ]
  },
  {
    id: "empresas",
    title: "Empresas",
    description: "Dúvidas sobre seu negócio?",
    items: [
      { id: 5, question: "", answer: "" }
    ]
  },
  {
    id: "financeiro",
    title: "Financeiro e Tributário",
    description: "Informações sobre inteligência financeira.",
    items: [
      { id: 6, question: "", answer: "" }
    ]
  },
  {
    id: "atendimento",
    title: "Atendimento",
    description: "Saiba como funciona nosso atendimento.",
    items: [
      { id: 7, question: "", answer: "" }
    ]
  },
  {
    id: "seguranca",
    title: "Segurança e Documentos",
    description: "Proteção e organização dos seus documentos.",
    items: [
      { id: 8, question: "", answer: "" }
    ]
  },
  {
    id: "abertura",
    title: "Abertura e Regularização",
    description: "Para a abertura ou reforma legislativa.",
    items: [
      { id: 9, question: "", answer: "" }
    ]
  }
];