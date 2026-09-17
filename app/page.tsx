import { Header } from './components/Header';
import Carrossel from './components/Carrossel';
import BannerReformaTributaria from './components/BannerReformaTributaria';
import BlocosInformativos from './components/BlocosInformativos';
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
            Reforma Tributária 2026 + Blocos Informativos
           ======================================================== */}
        <section id="external-task-area" className="w-full py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
            <BannerReformaTributaria />
            <BlocosInformativos />
          </div>
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