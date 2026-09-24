'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    src: '/carrossel/slide-1.svg',
    alt: 'Aperto de mãos - Gestão financeira e fiscal',
    title: 'Nossos Serviços',
    description:
      'Realizamos todo o trabalho necessário para a gestão financeira e fiscal da sua empresa, com competência e credibilidade.',
    buttonText: 'Contate-nos',
    buttonHref: '/contato',
  },
  {
    src: '/carrossel/slide-1.svg',
    alt: 'Assessoria estratégica',
    title: 'Assessoria Completa',
    description:
      'Soluções contábeis estratégicas focadas no crescimento sustentável e na redução de custos da sua empresa.',
    buttonText: 'Contate-nos',
    buttonHref: '/contato',
  },
  {
    src: '/carrossel/slide-1.svg',
    alt: 'Planejamento Tributário empresarial',
    title: 'Planejamento Tributário',
    description:
      'Segurança jurídica e conformidade fiscal para você focar no que realmente importa: o seu negócio.',
    buttonText: 'Contate-nos',
    buttonHref: '/contato',
  },
];

export default function Carrossel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[16/8] md:aspect-[16/7] lg:aspect-[1242/560] overflow-hidden select-none">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          {/* Imagem de Fundo */}
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />

          {/* Gradiente sutil da esquerda para a direita (sem borda curva visível) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#072d42] via-[#072d42]/70 to-transparent w-full md:w-[75%] lg:w-[60%]" />

          {/* Textos e Botão Laranja alinhados à esquerda */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center pl-8 md:pl-16 lg:pl-20 pr-8 max-w-2xl text-white">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-4 tracking-tight leading-tight">
              {slide.title}
            </h2>
            <p className="text-sm md:text-base lg:text-[17px] leading-relaxed text-gray-100 mb-6 md:mb-8 font-normal max-w-lg">
              {slide.description}
            </p>
            <Link
              href={slide.buttonHref}
              className="inline-block w-fit bg-[#D96B00] hover:bg-[#b85b00] text-white text-sm md:text-base font-semibold py-2 px-6 rounded-full shadow-md transition-colors"
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}