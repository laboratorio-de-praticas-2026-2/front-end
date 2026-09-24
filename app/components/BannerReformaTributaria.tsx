import Image from "next/image";

const noticia = {
  categoria: "Grupo Bortone",
  data: "01/12/2025",
  titulo: "Novas regras fiscais exigem atenção redobrada",
  descricao:
    "Mudanças na legislação tributária podem impactar a rotina financeira das empresas. Entenda os principais pontos e como preparar seu negócio para as novas exigências.",
};

export default function BannerReformaTributaria() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Banner gráfico - Reforma Tributária 2026 (imagem completa exportada do Figma) */}
        <div className="relative flex-1 rounded-xl overflow-hidden min-h-[220px]">
          <Image
            src="/reforma-tributaria/moedas.jpg"
            alt="Banner Reforma Tributária 2026"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Bloco de texto / notícia em destaque */}
        <div className="flex-1 flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-teal-600 font-semibold">
              {noticia.categoria}
            </span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-500">{noticia.data}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-zinc-900">
            {noticia.titulo}
          </h3>
          <p className="text-zinc-600 leading-relaxed">{noticia.descricao}</p>
        </div>
      </div>
    </section>
  );
}