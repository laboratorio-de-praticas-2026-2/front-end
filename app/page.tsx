import { Header } from './components/Header';
import  Carrossel  from './components/Carrossel';
import { FeaturedPosts } from './components/FeaturedPosts';
import { RecentPosts } from './components/RecentPosts';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header com a borda e selo alinhados */}
      <Header />

      <main className="flex-grow">
        {/* Componente de Carrossel */}
        <Carrossel />

        {/* ========================================================
            ESPAÇO RESERVADO PARA OUTRA TASK
            Deixe esta área livre para o colega adicionar o componente
           ======================================================== */}
        <section id="external-task-area" className="w-full min-h-[300px] bg-slate-50 flex items-center justify-center border-b border-dashed border-slate-200 py-12">
          <p className="text-slate-400 text-sm font-medium">
            [Espaço reservado para inclusão de componente externo]
          </p>
        </section>

        {/* Seções de Artigos e Notícias do Blog */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-12">
          <FeaturedPosts />
          <RecentPosts />
        </div>
      </main>

      {/* Rodapé da Aplicação */}
      <Footer />
    </div>
  );
}