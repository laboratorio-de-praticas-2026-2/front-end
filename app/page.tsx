import Carrossel from "./components/Carrossel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">

      {/* <Header />                                      */}

      <main className="flex flex-1 flex-col">
        <Carrossel />

      </main>
    </div>
  );
}