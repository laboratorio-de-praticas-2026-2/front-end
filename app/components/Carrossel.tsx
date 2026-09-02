"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// 👇 Troque pelos nomes reais das imagens que você vai colocar em public/carrossel/
const slides = [
  {
    src: "/carrossel/slide-1.jpg",
    alt: "Aperto de mãos entre profissionais - fechamento de negócio",
  },
  {
    src: "/carrossel/slide-2.jpg",
    alt: "Descrição do slide 2",
  },
  {
    src: "/carrossel/slide-3.jpg",
    alt: "Descrição do slide 3",
  },
];

export default function Carrossel() {
  const [current, setCurrent] = useState(0);

  const goToPrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Troca automática de slides a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative w-full aspect-[1242/583] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Botão anterior */}
      <button
        onClick={goToPrev}
        aria-label="Slide anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white text-2xl transition"
      >
        ‹
      </button>

      {/* Botão próximo */}
      <button
        onClick={goToNext}
        aria-label="Próximo slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white text-2xl transition"
      >
        ›
      </button>

      {/* Indicadores (bolinhas) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Ir para o slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-slate-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}