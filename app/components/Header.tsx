'use client';

import Link from 'next/link';

const navLinks = [
  { name: 'Início', href: '/' },
  { name: 'Sobre nós', href: '/sobrenos' },
  { name: 'Serviços', href: '/servicos' },
  { name: 'Soluções', href: '/servicos#solucoes' },
  { name: 'Blog', href: '/blog' },
  { name: 'Dúvidas', href: '/duvidas' },
];

export function Header() {
  return (
    <header className="relative w-full bg-[#0C4A6E] text-white shadow-md z-50 border-b-20 border-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 h-20 md:h-24 flex items-center justify-between">

        <Link
          href="/"
          aria-label="Portal Contábil - Grupo Bortone"
          className="relative inline-block self-end shrink-0 -mb-[4px]"
        >
          <svg
            viewBox="0 0 212 68"
            className="block h-16 md:h-[84px] w-auto"
            aria-hidden="true"
          >
            <path
              d="M 53,2 C 41,3 33,10 31,20 L 26,45 C 23,54 10,66 5,66
                 L 207,66 C 202,66 189,54 186,45 L 181,20 C 179,10 171,3 159,2 Z"
              fill="#ffffff"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-7 pb-1">
            <span className="text-[18px] md:text-2xl font-extrabold leading-[0.8] tracking-tight text-[#082f49]">
              PORTAL
            </span>
            <span className="text-[18px] md:text-2xl font-extrabold leading-[0.8] tracking-tight text-[#082f49]">
              CONTÁBIL
            </span>
            <span className="mt-1.5 flex items-center gap-1.5">
              <span className="h-px w-3.5 bg-[#082f49]/60" />
              <span className="text-[7px] md:text-[9px] font-semibold tracking-[0.22em] text-[#082f49]/75 whitespace-nowrap">
                GRUPO BORTONE
              </span>
              <span className="h-px w-3.5 bg-[#082f49]/60" />
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6 lg:gap-8 shrink-0">
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-blue-200 transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block w-[1px] h-12 bg-white/40" />

          <Link
            href="/login"
            className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-sm lg:text-base px-8 py-2.5 rounded-full shadow-md transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap"
          >
            Login
          </Link>
        </div>

      </div>
    </header>
  );
}