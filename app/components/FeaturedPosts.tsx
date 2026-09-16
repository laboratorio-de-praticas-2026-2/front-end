'use client';

import Image from 'next/image';
import Link from 'next/link';

interface FeaturedPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  slug: string;
}

const featuredData: FeaturedPost[] = [
  {
    id: '1',
    category: 'Contabilidade',
    title: 'Planejamento tributário: sua empresa está pagando impostos corretamente?',
    excerpt: 'O planejamento tributário pode ajudar empresas a entender melhor suas obrigações e identificar oportunidades dentro da legislação. Veja por que essa estratégia é importante.',
    date: '07/06/2026',
    imageUrl: '/images/blog/post-1.svg',
    slug: 'planejamento-tributario'
  },
  {
    id: '2',
    category: 'Empresarial',
    title: 'Pequenas empresas também precisam de planejamento financeiro',
    excerpt: 'Independentemente do tamanho do negócio, controlar receitas, despesas e investimentos é fundamental para tomar decisões mais seguras e evitar problemas no futuro.',
    date: '12/10/2025',
    imageUrl: '/images/blog/post-2.svg',
    slug: 'planejamento-financeiro-pequenas-empresas'
  },
  {
    id: '3',
    category: 'Contabilidade Pessoal',
    title: 'Como separar as finanças pessoais das finanças da empresa',
    excerpt: 'Misturar despesas pessoais e empresariais pode dificultar a gestão e comprometer os resultados do negócio. Confira algumas dicas para manter as contas organizadas.',
    date: '08/05/2026',
    imageUrl: '/images/blog/post-3.svg',
    slug: 'separar-financas-pessoais-da-empresa'
  }
];

export function FeaturedPosts() {
  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredData.map((post) => (
          <article key={post.id} className="flex flex-col group cursor-pointer">
            <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-sky-400 font-semibold text-sm mb-2">
              {post.category}
            </span>
            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </Link>
            <p className="text-slate-500 text-sm mb-6 flex-grow line-clamp-3">
              {post.excerpt}
            </p>
            <span className="text-xs text-slate-400 font-medium">
              {post.date}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}