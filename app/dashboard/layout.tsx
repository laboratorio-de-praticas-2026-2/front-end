'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  SlidersHorizontal,
  FileText,
  MessageSquare,
  UserSquare2,
  BookOpen,
  BarChart2,
  UserCheck,
  Building2,
  Settings,
  ChevronRight,
  ChevronUp,
  LogOut,
  MoreVertical,
  User,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { name: 'Solicitações', href: '/dashboard/solicitacoes', icon: SlidersHorizontal },
    { name: 'Serviços', href: '/dashboard/servicos', icon: FileText },
    { name: 'Blog', href: '/dashboard/blog', icon: FileText },
    { name: 'FAQ', href: '/dashboard/faq', icon: MessageSquare },
    { name: 'Carrossel', href: '/dashboard/carrossel', icon: UserSquare2 },
    { name: 'Relatórios', href: '/dashboard/relatorios', icon: BookOpen },
    { name: 'Publicidade', href: '/dashboard/publicidade', icon: BarChart2 },
    { name: 'Usuários', href: '/dashboard/usuarios', icon: UserCheck },
    { name: 'Empresas', href: '/dashboard/empresas', icon: Building2 },
    { name: 'Configurações', href: '/dashboard/configuracoes', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-[#08436c] text-white flex flex-col justify-between py-6 px-0 shadow-lg shrink-0">
        <div className="flex flex-col">
          <div className="px-6 mb-8 flex justify-center items-center">
            <Image
              src="/logo.svg"
              alt="Portal Contábil - Grupo Bortone"
              width={170}
              height={45}
              priority
              className="object-contain brightness-0 invert"
            />
          </div>

          {/* Menus Laterais */}
          <nav className="space-y-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-6 py-2.5 text-sm font-medium transition-all relative ${
                    isActive
                      ? 'bg-[#052d49] text-white font-semibold'
                      : 'text-gray-200 hover:bg-[#06385a] hover:text-white'
                  }`}
                >
                  {/* Borda indicadora branca à esquerda na aba ativa */}
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
                  )}

                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-200" />
                    <span>{item.name}</span>
                  </div>

                  {isActive ? (
                    <ChevronUp className="w-4 h-4 text-gray-200" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Seção Inferior: Botão Sair e Card do Usuário */}
        <div className="pt-4 space-y-4">
          {/* Botão Sair Perfeitamente Centralizado */}
          <div className="w-full flex justify-center px-6">
            <Link
              href="/login"
              className="flex items-center justify-center space-x-2.5 w-full bg-[#0088cc] hover:bg-[#0077b3] text-white py-2 px-3.5 rounded text-sm font-medium transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </Link>
          </div>

          <hr className="border-gray-500/30 my-2 mx-6" />

          {/* Card do Usuário com Ícone Padrão */}
          <div className="px-6 flex items-center justify-between pt-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-600 border border-gray-400 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-gray-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-tight text-white">
                  Ryan Davies
                </span>
                <span className="text-[11px] text-gray-300 hover:underline cursor-pointer">
                  Ver Perfil
                </span>
              </div>
            </div>
            <button className="text-gray-300 hover:text-white transition">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}