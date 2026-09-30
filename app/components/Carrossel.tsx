'use client';

import Image from 'next/image';
import Link from 'next/link';

const slide = {
  src: '/carrossel/slide-1.svg',
  alt: 'Aperto de mãos - Gestão financeira e fiscal',
  title: 'Nossos Serviços',
  description:
    'Realizamos todo o trabalho necessário para a gestão financeira e fiscal da sua empresa, com competência e credibilidade.',
  buttonText: 'Contate-nos',
  buttonHref: '/contato',
};

export default function Carrossel() {
  return (
    <div className="relative w-full aspect-[16/8] md:aspect-[16/7] lg:aspect-[1242/560] overflow-hidden select-none">
      <div className="absolute inset-0 z-10">
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#072d42] via-[#072d42]/70 to-transparent w-full md:w-[75%] lg:w-[60%]" />

          <div className="absolute inset-0 z-10 flex flex-col justify-center pl-8 md:pl-16 lg:pl-20 pr-8 max-w-3xl text-white">
            <h2 className="text-4xl md:text-5xl lg:text-[48px] font-bold mb-4 tracking-tight leading-tight">
              {slide.title}
            </h2>
            <p className="text-base md:text-lg lg:text-[20px] leading-relaxed text-gray-100 mb-8 md:mb-10 font-normal max-w-xl">
              {slide.description}
            </p>
            <Link
              href={slide.buttonHref}
              className="inline-block w-fit bg-[#D96B00] hover:bg-[#b85b00] text-white text-base md:text-lg font-semibold py-3 px-8 rounded-full shadow-md transition-colors"
            >
              {slide.buttonText}
            </Link>
          </div>
      </div>
    </div>
  );
}