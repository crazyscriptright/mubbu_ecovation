import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/hero";
import { ClientsSection } from "@/components/sections/clients/ClientsSection";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { PurposeSection } from "@/components/sections/purpose/PurposeSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ClientsSection />
        <WhoWeAre />
        <PurposeSection />
      </main>
    </>
  );
}