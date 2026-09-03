'use client';

import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { name: 'Início', href: '/' },
  { name: 'Sobre nós', href: '/sobre-nos' },
  { name: 'Serviços', href: '/servicos' },
  { name: 'Soluções', href: '/solucoes' },
  { name: 'Blog', href: '/blog' },
  { name: 'Dúvidas', href: '/duvidas' },
];

export function Header() {
  return (
    <header className="w-full bg-white flex items-center justify-between pl-6 md:pl-12 lg:pl-16 pr-0 pt-0 pb-3">
      {/* 1. Logo rebaixado com padding-top para alinhar perfeitamente ao centro visual */}
      <div className="flex items-center pt-2 md:pt-3">
        <Link href="/" className="inline-block">
          <Image
            src="/logo.svg"
            alt="Portal Contábil Grupo Bortone"
            width={220}
            height={65}
            priority
            className="h-11 md:h-13 lg:h-14 w-auto object-contain"
          />
        </Link>
      </div>

      {/* 2. Bloco Azul */}
      <div className="flex items-center bg-[#0C4A6E] h-16 md:h-[70px] pl-10 md:pl-12 lg:pl-14 pr-8 md:pr-12 rounded-bl-[45px] gap-6 md:gap-8 lg:gap-9 shadow-sm">
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white text-[15px] lg:text-base font-bold hover:text-cyan-200 transition-colors whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block h-7 w-[1.5px] bg-white/40" />

        <Link
          href="/login"
          className="bg-[#082E47] hover:bg-[#052033] text-white text-[15px] lg:text-base font-bold py-2.5 px-9 rounded-full transition-colors shadow-sm whitespace-nowrap"
        >
          Login
        </Link>
      </div>
    </header>
  );
}