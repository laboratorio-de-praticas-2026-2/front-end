import Carrossel from "./components/Carrossel";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="flex flex-col">
        <Carrossel />
      </main>
    </div>
  );
}