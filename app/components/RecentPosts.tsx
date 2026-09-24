'use client';

import Image from 'next/image';
import Link from 'next/link';

interface RecentPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  slug: string;
}

const recentData: RecentPost[] = [
  {
    id: '1',
    category: 'Empresarial',
    title: 'Os principais erros financeiros cometidos por empresários',
    excerpt: 'Conheça os erros financeiros mais comuns e saiba como evitá-los.',
    date: '08/07/2026',
    imageUrl: '/images/blog/recent-1.svg',
    slug: 'erros-financeiros-empresarios'
  },
  {
    id: '2',
    category: 'Empresarial',
    title: 'Quando é o momento certo para expandir sua empresa?',
    excerpt: 'Descubra os indicadores essenciais para dar o próximo passo.',
    date: '11/04/2026',
    imageUrl: '/images/blog/recent-2.svg',
    slug: 'momento-certo-expandir-empresa'
  },
  {
    id: '3',
    category: 'Contabilidade',
    title: 'Entenda como o controle do fluxo de caixa ajuda na gestão financeira.',
    excerpt: 'Veja como manter o fluxo atualizado garante estabilidade ao negócio.',
    date: '18/03/2026',
    imageUrl: '/images/blog/recent-3.svg',
    slug: 'controle-fluxo-de-caixa'
  },
  {
    id: '4',
    category: 'Rotinas Administrativas',
    title: 'Tecnologia transforma a rotina dos escritórios contábeis',
    excerpt: 'Descubra como a tecnologia pode tornar a gestão contábil mais eficiente.',
    date: '23/07/2026',
    imageUrl: '/images/blog/recent-4.svg',
    slug: 'tecnologia-rotina-escritorios-contabeis'
  }
];

export function RecentPosts() {
  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-12">
        {recentData.map((post) => (
          <article key={post.id} className="flex gap-5 items-start group cursor-pointer">
            {/* Container da imagem retangular (largura maior que a altura) */}
            <div className="relative w-44 h-32 sm:w-48 sm:h-56 shrink-0 overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 176px, 192px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Conteúdo do Card alinhado verticalmente */}
            <div className="flex flex-col justify-between self-stretch py-0.5">
              <div>
                <span className="text-sky-500 font-semibold text-xs mb-1.5 block uppercase tracking-wider">
                  {post.category}
                </span>
                <Link href={`/blog/${post.slug}`}>
                  <h4 className="text-base font-bold text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug mb-2">
                    {post.title}
                  </h4>
                </Link>
                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-3">
                  {post.excerpt}
                </p>
              </div>
              <span className="text-[12px] text-slate-400 font-medium">
                {post.date}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center my-8">
        <button className="border-2 border-slate-700 hover:border-sky-600 hover:text-sky-600 text-slate-700 font-semibold px-10 py-2.5 rounded-full transition-all duration-200">
          Veja Mais
        </button>
      </div>
    </section>
  );
}