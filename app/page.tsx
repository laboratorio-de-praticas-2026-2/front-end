
import { Header } from './components/Header';
import Carrossel from './components/Carrossel';
import BannerReformaTributaria from './components/BannerReformaTributaria';
import BlocosInformativos from './components/BlocosInformativos';
import { FeaturedPosts } from './components/FeaturedPosts';
import { RecentPosts } from './components/RecentPosts';
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

      
      <div className="w-full max-w-[1440px] px-6 lg:px-12 py-16 flex-1">
       
      </div>
    </main>
  );
}
