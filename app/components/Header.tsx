'use client'; 

import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { name: 'Início', href: '/' },
  { name: 'Serviços', href: '/servicos' },
  { name: 'Soluções', href: '/solucoes' },
  { name: 'Sobre nós', href: '/sobre-nos' },
];

export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between py-5 px-6 md:px-12">
        
        <Link href="/" className="flex-shrink-0">
            <Image 
                src="/logo.svg"
                alt="Logo Bortone Portal Contábil"
                width={201}
                height={100}
                priority
                className="h-[100px] w-[201px] object-contain"
            />
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className="text-lg font-semibold text-zinc-900 hover:text-cyan-800 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex-shrink-0">
          <Link 
            href="/contato" 
            className="inline-block bg-[#0A324E] hover:bg-[#082a40] text-white font-semibold text-base py-3 px-7 rounded-full transition-colors duration-200"
          >
            Contate-nos
          </Link>
        </div>

      </div>
    </header>
  );
}