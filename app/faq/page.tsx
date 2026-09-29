import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaqSection } from "./FaqSection";

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}