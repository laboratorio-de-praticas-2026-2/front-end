import Image from "next/image";

const blocos = [
  {
    categoria: "Rotinas Administrativas",
    titulo: "A importância de manter os documentos contábeis organizados",
    descricao:
      "Notas fiscais, comprovantes e documentos financeiros fazem parte da rotina empresarial. Saiba como manter essas informações organizadas e facilitar os processos contábeis.",
    data: "10/10/2025",
    imagem: "/reforma-tributaria/card-documentos.jpg",
    imagemAlt: "Pessoa organizando documentos financeiros e gráficos",
  },
  {
    categoria: "Rotinas Administrativas",
    titulo: "Como manter uma boa saúde financeira",
    descricao:
      "Um bom planejamento financeiro é essencial para evitar imprevistos e garantir o crescimento sustentável. Confira práticas simples para melhorar o controle das finanças.",
    data: "08/11/2025",
    imagem: "/reforma-tributaria/card-saude-financeira.png",
    imagemAlt: "Estetoscópio ao redor de um símbolo de cifrão",
  },
];

export default function BlocosInformativos() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blocos.map((bloco, index) => (
          <article key={index} className="flex flex-col gap-3">
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
              <Image
                src={bloco.imagem}
                alt={bloco.imagemAlt}
                fill
                className="object-cover"
              />
            </div>

            <span className="text-teal-600 text-sm font-semibold">
              {bloco.categoria}
            </span>
            <h3 className="text-lg font-bold text-zinc-900 leading-snug">
              {bloco.titulo}
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              {bloco.descricao}
            </p>
            <span className="text-zinc-400 text-xs">{bloco.data}</span>
          </article>
        ))}
      </div>
    </section>
  );
}