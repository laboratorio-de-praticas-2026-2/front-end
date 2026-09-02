// app/page.tsx
import { Header } from './components/Header'; // Importa o seu Header

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white">
      {/* 1. Renderiza o Header no topo */}
      <Header />
    </main>
  );
}