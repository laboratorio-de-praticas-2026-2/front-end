import {Publicidade} from './components/CoreCatalog';
import Link from 'next/link';
import { Header } from './components/Header';
import Carrossel from './components/Carrossel';
import BannerReformaTributaria from './components/BannerReformaTributaria';
import BlocosInformativos from './components/BlocosInformativos';
import { Footer } from './components/Footer';
import ChatWidget from './components/ChatWidget';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {}
      <Header />

      <main className="flex-grow">
        {}
        <Carrossel />
        <section className="core-public w-full"><div className="core-heading"><div><h2>O que você precisa resolver hoje?</h2><p>Consulte seu cadastro ou encontre um serviço contábil.</p></div></div><div className="core-actions"><Link href="/busca" className="core-button">Buscar CPF / CNPJ</Link><Link href="/servicos" className="core-button secondary">Ver serviços e honorários</Link></div><Publicidade/></section>

        {}
        <section id="external-task-area" className="w-full py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
            <BannerReformaTributaria />
            <BlocosInformativos />
          </div>
        </section>

        {}
      </main>

      {}
      <Footer />

      {}
      <ChatWidget />
    </div>
  );
}
