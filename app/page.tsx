import { Header } from './components/Header';
import Carrossel from './components/Carrossel'; 

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col items-center">
      <Header />

      <div className="w-full">
        <Carrossel />
      </div>

      <div className="max-w-[1440px] w-full px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900">
          Bem-vindo ao Portal Contábil
        </h1>
        <p className="text-gray-600 mt-2">
          Gerencie suas obrigações fiscais e serviços com facilidade.
        </p>
      </div>
    </main>
  );
}