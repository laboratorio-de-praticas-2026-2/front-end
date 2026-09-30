"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./FaqSection.module.css";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  description: string;
  items: FaqItem[];
}

const CATEGORIES: FaqCategory[] = [
  {
    title: "Serviços",
    description: "Conheça nossas soluções contábeis.",
    items: [
      {
        question: "Vocês cuidam das obrigações fiscais?",
        answer:
          "Sim, cuidamos de todas as obrigações fiscais da sua empresa, incluindo apuração e envio de impostos dentro do prazo.",
      },
      {
        question: "A contabilidade também cuida da folha de pagamento?",
        answer:
          "Sim, nosso serviço inclui o processamento completo da folha de pagamento, incluindo férias, 13º e encargos.",
      },
      {
        question: "Vocês fazem planejamento tributário?",
        answer:
          "Sim, oferecemos planejamento tributário para ajudar sua empresa a reduzir a carga de impostos de forma legal.",
      },
      {
        question: "Posso contratar apenas um serviço?",
        answer:
          "Sim, os serviços podem ser contratados individualmente, conforme a necessidade da sua empresa.",
      },
    ],
  },
  {
    title: "Empresas",
    description: "Dúvidas sobre seu negócio?",
    items: [
      {
        question: "Lorem ipsum dolor sit amet?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        question: "Ut enim ad minim veniam?",
        answer:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
  },
  {
    title: "Financeiro e Tributário",
    description: "Informações sobre impostos e finanças.",
    items: [
      {
        question: "Duis aute irure dolor in reprehenderit?",
        answer:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        question: "Excepteur sint occaecat cupidatat?",
        answer:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
  },
  {
    title: "Atendimento",
    description: "Saiba como funciona nosso atendimento.",
    items: [
      {
        question: "Sed ut perspiciatis unde omnis?",
        answer:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      },
      {
        question: "Nemo enim ipsam voluptatem?",
        answer:
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
      },
    ],
  },
  {
    title: "Segurança e Documentos",
    description: "Proteção e organização dos seus documentos.",
    items: [
      {
        question: "At vero eos et accusamus?",
        answer:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.",
      },
    ],
  },
  {
    title: "Abertura e Regularização",
    description: "Abra e mantenha sua empresa regularizada.",
    items: [
      {
        question: "Et harum quidem rerum facilis?",
        answer:
          "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi.",
      },
    ],
  },
];

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const currentItems = CATEGORIES[activeCategory].items;

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
    setOpenIndex(0); // reabre o primeiro item da nova categoria, igual ao padrão inicial
  };

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <>
      <section className={styles.hero}>
        <Image
          src="/faq-hero.svg"
          alt=""
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.badge}>
            <QuestionIcon />
            FAQ
          </span>
          <h1 className={styles.heroTitle}>PERGUNTAS FREQUENTES</h1>
          <p className={styles.heroDescription}>
            Encontre respostas para as principais dúvidas sobre nossos
            serviços, atendimento e soluções contábeis.
          </p>
          <a href="#faq" className={styles.heroLink}>
            Precisa de ajuda? →
          </a>
        </div>
      </section>

      <section className={styles.section} id="faq">
        <div className={styles.layout}>
          <nav className={styles.sidebar} aria-label="Categorias de dúvidas">
            {CATEGORIES.map((category, index) => (
              <button
                key={category.title}
                type="button"
                className={`${styles.categoryButton} ${
                  index === activeCategory ? styles.categoryButtonActive : ""
                }`}
                onClick={() => handleCategoryChange(index)}
              >
                <span>
                  <span className={styles.categoryTitle}>{category.title}</span>
                  <span className={styles.categoryDescription}>
                    {category.description}
                  </span>
                </span>
                <ChevronIcon />
              </button>
            ))}
          </nav>

          <div className={styles.accordion}>
            {currentItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.question} className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionHeader}
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.question}>{item.question}</span>
                    <PlusIcon open={isOpen} />
                  </button>

                  {isOpen && (
                    <div className={styles.answer}>{item.answer}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className={`${styles.plusIcon} ${open ? styles.plusIconOpen : ""}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 2v12M2 8h12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <span className={styles.badgeIcon}>
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
        <path
          d="M6 6.2c0-1 .9-1.7 2-1.7s2 .6 2 1.6c0 1.3-2 1.3-2 2.6"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="8" cy="11.3" r="0.8" fill="#ffffff" />
      </svg>
    </span>
  );
}